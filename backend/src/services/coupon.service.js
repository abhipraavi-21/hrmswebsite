import { Op } from "sequelize";
import { models, sequelize } from "../config/database.js";
import { AppError } from "../utils/AppError.js";

const ACTIVE_STATUS = "active";
const REDEEMED_STATUS = "redeemed";

function toNumber(value) {
  if (value === null || value === undefined) {
    return 0;
  }

  return Number(value);
}

function roundCurrency(value) {
  return Number(Number(value).toFixed(2));
}

function normalizeCouponCode(code) {
  return code.trim().toUpperCase();
}

function normalizeBillingCycle(billingCycle) {
  if (billingCycle === "yearly") {
    return "annual";
  }

  if (billingCycle === "half-yearly") {
    return "semiannual";
  }

  return billingCycle;
}

function getPlanAliases(planSlug) {
  const slug = String(planSlug ?? "").toLowerCase();
  const aliases = new Set([slug]);

  if (slug === "basic") {
    aliases.add("starter");
  }

  if (slug === "starter") {
    aliases.add("basic");
  }

  if (slug === "premium") {
    aliases.add("enterprise");
  }

  if (slug === "enterprise") {
    aliases.add("premium");
  }

  return aliases;
}

function getCouponStatus(coupon) {
  if (coupon.status !== ACTIVE_STATUS) {
    return "inactive";
  }

  if (coupon.ends_at && new Date(coupon.ends_at) < new Date()) {
    return "expired";
  }

  return "active";
}

function buildCouponInclude() {
  return [
    { model: models.Product, as: "product", required: false },
    { model: models.Plan, as: "plan", required: false },
    {
      model: models.Product,
      as: "applicableProducts",
      through: { attributes: [] },
      required: false,
    },
    { model: models.Plan, as: "applicablePlans", through: { attributes: [] }, required: false },
    {
      model: models.CouponUsage,
      as: "usages",
      required: false,
      separate: true,
      limit: 10,
      order: [["used_at", "DESC"]],
    },
  ];
}

function serializeCoupon(coupon) {
  const usages = coupon.usages ?? [];
  const totalDiscountGiven = usages
    .filter((usage) => usage.status === REDEEMED_STATUS)
    .reduce((sum, usage) => sum + toNumber(usage.discount_amount), 0);

  return {
    id: coupon.id,
    code: coupon.code,
    name: coupon.name || coupon.code,
    description: coupon.description,
    discountType: coupon.discount_type,
    discountValue: toNumber(coupon.discount_value),
    maximumDiscount: coupon.maximum_discount === null ? null : toNumber(coupon.maximum_discount),
    minimumOrderAmount:
      coupon.minimum_order_amount === null ? null : toNumber(coupon.minimum_order_amount),
    appliesToAmount: coupon.applies_to_amount,
    status: coupon.status,
    computedStatus: getCouponStatus(coupon),
    startsAt: coupon.starts_at,
    endsAt: coupon.ends_at,
    totalUsageLimit: coupon.max_redemptions,
    usageLimitPerCustomer: coupon.usage_limit_per_customer,
    usageCount: coupon.redeemed_count,
    newCustomersOnly: Boolean(coupon.new_customers_only),
    monthlyAllowed: Boolean(coupon.monthly_allowed),
    semiannualAllowed: Boolean(coupon.semiannual_allowed),
    annualAllowed: Boolean(coupon.annual_allowed),
    newSubscriptionAllowed: Boolean(coupon.new_subscription_allowed),
    renewalAllowed: Boolean(coupon.renewal_allowed),
    upgradeAllowed: Boolean(coupon.upgrade_allowed),
    products: (coupon.applicableProducts ?? []).map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
    })),
    plans: (coupon.applicablePlans ?? []).map((plan) => ({
      id: plan.id,
      name: plan.name,
      slug: plan.slug,
      productId: plan.product_id,
    })),
    analytics: {
      totalUses: coupon.redeemed_count,
      totalDiscountGiven: roundCurrency(totalDiscountGiven),
      successfulRedemptions: usages.filter((usage) => usage.status === REDEEMED_STATUS).length,
      remainingUses:
        coupon.max_redemptions === null || coupon.max_redemptions === undefined
          ? null
          : Math.max(0, coupon.max_redemptions - coupon.redeemed_count),
    },
    recentUsage: usages.map((usage) => ({
      id: usage.id,
      customerAccountId: usage.customer_account_id,
      companyId: usage.company_id,
      subscriptionPurchaseId: usage.subscription_purchase_id,
      orderId: usage.order_id,
      paymentId: usage.payment_id,
      productSlug: usage.product_slug,
      planSlug: usage.plan_slug,
      discountAmount: toNumber(usage.discount_amount),
      finalAmount: toNumber(usage.final_amount),
      status: usage.status,
      usedAt: usage.used_at,
    })),
  };
}

async function loadCoupon(code, transaction, lock = false) {
  const coupon = await models.Coupon.findOne({
    where: { code: normalizeCouponCode(code) },
    include: buildCouponInclude(),
    transaction,
    lock: lock && transaction ? transaction.LOCK.UPDATE : undefined,
  });

  if (!coupon) {
    throw new AppError("Coupon code not found.", 404);
  }

  return coupon;
}

function assertCouponDatesAndStatus(coupon) {
  if (coupon.status !== ACTIVE_STATUS) {
    throw new AppError("This coupon is currently inactive.", 400);
  }

  const now = new Date();

  if (coupon.starts_at && new Date(coupon.starts_at) > now) {
    throw new AppError("This coupon is not active yet.", 400);
  }

  if (coupon.ends_at && new Date(coupon.ends_at) < now) {
    throw new AppError("This coupon has expired.", 400);
  }

  if (
    coupon.max_redemptions !== null &&
    coupon.max_redemptions !== undefined &&
    coupon.redeemed_count >= coupon.max_redemptions
  ) {
    throw new AppError("This coupon has reached its maximum usage limit.", 400);
  }
}

function assertCouponApplicability(coupon, productSlug, planSlug, billingCycle, lifecycleType) {
  const productSlugLower = String(productSlug ?? "").toLowerCase();
  const productSlugs = (coupon.applicableProducts ?? []).map((product) =>
    product.slug.toLowerCase(),
  );

  if (productSlugs.length > 0 && !productSlugs.includes(productSlugLower)) {
    throw new AppError("This coupon is not applicable to this product.", 400);
  }

  if (
    productSlugs.length === 0 &&
    coupon.product?.slug &&
    coupon.product.slug !== productSlugLower
  ) {
    throw new AppError("This coupon is not applicable to this product.", 400);
  }

  const planAliases = getPlanAliases(planSlug);
  const planMatches = (coupon.applicablePlans ?? []).some((plan) => {
    const values = [plan.slug, plan.name, plan.code]
      .filter(Boolean)
      .map((value) => value.toLowerCase());
    return values.some((value) => planAliases.has(value));
  });

  if ((coupon.applicablePlans ?? []).length > 0 && !planMatches) {
    throw new AppError("This coupon is not applicable to this plan.", 400);
  }

  const normalizedCycle = normalizeBillingCycle(billingCycle);

  if (normalizedCycle === "monthly" && !coupon.monthly_allowed) {
    throw new AppError("This coupon is valid only for selected billing cycles.", 400);
  }

  if (normalizedCycle === "semiannual" && !coupon.semiannual_allowed) {
    throw new AppError("This coupon is valid only for selected billing cycles.", 400);
  }

  if (normalizedCycle === "annual" && !coupon.annual_allowed) {
    throw new AppError("This coupon is valid only for annual subscriptions.", 400);
  }

  if (lifecycleType === "new" && !coupon.new_subscription_allowed) {
    throw new AppError("This coupon is not available for new subscriptions.", 400);
  }

  if (lifecycleType === "renewal" && !coupon.renewal_allowed) {
    throw new AppError("This coupon is not available for renewals.", 400);
  }

  if (lifecycleType === "upgrade" && !coupon.upgrade_allowed) {
    throw new AppError("This coupon is not available for upgrades.", 400);
  }
}

async function assertCustomerLimits(coupon, customerAccount, productSlug, transaction) {
  if (!customerAccount?.id) {
    return;
  }

  if (coupon.usage_limit_per_customer !== null && coupon.usage_limit_per_customer !== undefined) {
    const usageCount = await models.CouponUsage.count({
      where: {
        coupon_id: coupon.id,
        customer_account_id: customerAccount.id,
        status: REDEEMED_STATUS,
      },
      transaction,
    });

    if (usageCount >= coupon.usage_limit_per_customer) {
      throw new AppError("You have already used this coupon.", 400);
    }
  }

  if (coupon.new_customers_only) {
    const [subscriptionPurchases, subscriptions] = await Promise.all([
      models.SubscriptionPurchase.count({
        where: {
          payment_status: "paid",
          email: customerAccount.email,
        },
        transaction,
      }).catch(() => 0),
      models.Subscription.count({
        include: [
          {
            model: models.Product,
            as: "product",
            required: false,
            where: productSlug ? { slug: productSlug } : undefined,
          },
        ],
        where: {
          customer_account_id: customerAccount.id,
        },
        transaction,
      }).catch(() => 0),
    ]);

    if (subscriptionPurchases > 0 || subscriptions > 0) {
      throw new AppError("This coupon is only for new customers.", 400);
    }
  }
}

function calculateDiscount({ coupon, planAmount, addonAmount, totalAmount }) {
  let discountBase = totalAmount;

  if (coupon.applies_to_amount === "plan_only") {
    discountBase = planAmount;
  } else if (coupon.applies_to_amount === "addons_only") {
    discountBase = addonAmount;
  }

  discountBase = roundCurrency(Math.max(0, discountBase));

  if (coupon.minimum_order_amount !== null && coupon.minimum_order_amount !== undefined) {
    const minimum = toNumber(coupon.minimum_order_amount);

    if (totalAmount < minimum) {
      throw new AppError(
        `This coupon requires a minimum order value of ₹${minimum.toLocaleString("en-IN")}.`,
        400,
      );
    }
  }

  let discountAmount =
    coupon.discount_type === "percent"
      ? roundCurrency(discountBase * (toNumber(coupon.discount_value) / 100))
      : roundCurrency(Math.min(discountBase, toNumber(coupon.discount_value)));

  if (coupon.maximum_discount !== null && coupon.maximum_discount !== undefined) {
    discountAmount = Math.min(discountAmount, toNumber(coupon.maximum_discount));
  }

  return roundCurrency(Math.min(discountAmount, totalAmount));
}

export async function validateCouponForCheckout(payload, options = {}) {
  if (!payload.couponCode?.trim()) {
    return null;
  }

  const coupon = await loadCoupon(payload.couponCode, options.transaction, options.lock);
  assertCouponDatesAndStatus(coupon);
  assertCouponApplicability(
    coupon,
    payload.productSlug,
    payload.planSlug,
    payload.billingCycle,
    payload.lifecycleType ?? "new",
  );
  await assertCustomerLimits(
    coupon,
    payload.customerAccount,
    payload.productSlug,
    options.transaction,
  );

  const planAmount = roundCurrency(payload.planAmount ?? 0);
  const addonAmount = roundCurrency(payload.addonAmount ?? 0);
  const subtotalAmount = roundCurrency(payload.subtotalAmount ?? planAmount + addonAmount);
  const discountAmount = calculateDiscount({
    coupon,
    planAmount,
    addonAmount,
    totalAmount: subtotalAmount,
  });
  const taxableAmount = roundCurrency(Math.max(0, subtotalAmount - discountAmount));

  return {
    coupon,
    code: coupon.code,
    name: coupon.name || coupon.code,
    description: coupon.description,
    discountType: coupon.discount_type,
    discountValue: toNumber(coupon.discount_value),
    maximumDiscount: coupon.maximum_discount === null ? null : toNumber(coupon.maximum_discount),
    appliesToAmount: coupon.applies_to_amount,
    discountBase:
      coupon.applies_to_amount === "addons_only"
        ? addonAmount
        : coupon.applies_to_amount === "plan_only"
          ? planAmount
          : subtotalAmount,
    discountAmount,
    taxableAmount,
  };
}

export async function recordCouponRedemption({
  coupon,
  customerAccount,
  subscriptionPurchaseId = null,
  orderId = null,
  paymentId = null,
  subscriptionId = null,
  productSlug,
  planSlug,
  originalAmount,
  discountAmount,
  finalAmount,
  transaction,
}) {
  if (!coupon || !discountAmount) {
    return null;
  }

  const usage = await models.CouponUsage.create(
    {
      coupon_id: coupon.id,
      customer_account_id: customerAccount?.id ?? null,
      company_id: customerAccount?.company_id ?? null,
      subscription_purchase_id: subscriptionPurchaseId,
      subscription_id: subscriptionId,
      order_id: orderId,
      payment_id: paymentId,
      product_slug: productSlug,
      plan_slug: planSlug,
      coupon_code: coupon.code,
      original_amount: originalAmount,
      discount_amount: discountAmount,
      final_amount: finalAmount,
      status: REDEEMED_STATUS,
      used_at: new Date(),
    },
    { transaction },
  );

  await coupon.increment("redeemed_count", { by: 1, transaction });

  return usage;
}

export async function listAdminCoupons(filters = {}) {
  const where = {};

  if (filters.search) {
    where[Op.or] = [
      { code: { [Op.like]: `%${filters.search}%` } },
      { name: { [Op.like]: `%${filters.search}%` } },
    ];
  }

  if (filters.status === "active" || filters.status === "inactive") {
    where.status = filters.status;
  }

  const coupons = await models.Coupon.findAll({
    where,
    include: buildCouponInclude(),
    order: [["created_at", "DESC"]],
  });

  return coupons
    .map(serializeCoupon)
    .filter((coupon) =>
      filters.status === "expired" ? coupon.computedStatus === "expired" : true,
    );
}

export async function getAdminCoupon(couponId) {
  const coupon = await models.Coupon.findByPk(couponId, {
    include: buildCouponInclude(),
  });

  if (!coupon) {
    throw new AppError("Coupon not found", 404);
  }

  return serializeCoupon(coupon);
}

async function syncCouponRelations(coupon, payload, transaction) {
  if (Array.isArray(payload.productIds)) {
    await models.CouponProduct.destroy({ where: { coupon_id: coupon.id }, transaction });
    for (const productId of payload.productIds) {
      await models.CouponProduct.create(
        { coupon_id: coupon.id, product_id: productId },
        { transaction },
      );
    }
  }

  if (Array.isArray(payload.planIds)) {
    await models.CouponPlan.destroy({ where: { coupon_id: coupon.id }, transaction });
    for (const planId of payload.planIds) {
      await models.CouponPlan.create({ coupon_id: coupon.id, plan_id: planId }, { transaction });
    }
  }
}

function getExistingBillingCycles(coupon) {
  if (!coupon) {
    return ["monthly", "semiannual", "annual"];
  }

  return [
    coupon.monthly_allowed ? "monthly" : null,
    coupon.semiannual_allowed ? "semiannual" : null,
    coupon.annual_allowed ? "annual" : null,
  ].filter(Boolean);
}

function getExistingLifecycleTypes(coupon) {
  if (!coupon) {
    return ["new", "renewal", "upgrade"];
  }

  return [
    coupon.new_subscription_allowed ? "new" : null,
    coupon.renewal_allowed ? "renewal" : null,
    coupon.upgrade_allowed ? "upgrade" : null,
  ].filter(Boolean);
}

function buildCouponPayload(payload, adminId, existingCoupon = null) {
  const code = normalizeCouponCode(payload.code ?? existingCoupon?.code);
  const billingCycles = payload.billingCycles ?? getExistingBillingCycles(existingCoupon);
  const lifecycleTypes = payload.lifecycleTypes ?? getExistingLifecycleTypes(existingCoupon);

  return {
    code,
    name: payload.name?.trim() || existingCoupon?.name || code,
    description:
      payload.description !== undefined
        ? payload.description?.trim() || null
        : (existingCoupon?.description ?? null),
    discount_type: payload.discountType ?? existingCoupon?.discount_type,
    discount_value: payload.discountValue ?? existingCoupon?.discount_value,
    maximum_discount:
      payload.maximumDiscount !== undefined
        ? payload.maximumDiscount
        : (existingCoupon?.maximum_discount ?? null),
    minimum_order_amount:
      payload.minimumOrderAmount !== undefined
        ? payload.minimumOrderAmount
        : (existingCoupon?.minimum_order_amount ?? null),
    max_redemptions:
      payload.totalUsageLimit !== undefined
        ? payload.totalUsageLimit
        : (existingCoupon?.max_redemptions ?? null),
    usage_limit_per_customer:
      payload.usageLimitPerCustomer !== undefined
        ? payload.usageLimitPerCustomer
        : (existingCoupon?.usage_limit_per_customer ?? null),
    new_customers_only:
      payload.newCustomersOnly !== undefined
        ? Boolean(payload.newCustomersOnly)
        : Boolean(existingCoupon?.new_customers_only),
    applies_to_amount:
      payload.appliesToAmount ?? existingCoupon?.applies_to_amount ?? "plan_and_addons",
    monthly_allowed: billingCycles.includes("monthly"),
    semiannual_allowed: billingCycles.includes("semiannual"),
    annual_allowed: billingCycles.includes("annual"),
    new_subscription_allowed: lifecycleTypes.includes("new"),
    renewal_allowed: lifecycleTypes.includes("renewal"),
    upgrade_allowed: lifecycleTypes.includes("upgrade"),
    status: payload.status ?? existingCoupon?.status ?? ACTIVE_STATUS,
    starts_at:
      payload.startsAt !== undefined ? payload.startsAt : (existingCoupon?.starts_at ?? null),
    ends_at: payload.endsAt !== undefined ? payload.endsAt : (existingCoupon?.ends_at ?? null),
    applies_to_scope:
      Array.isArray(payload.planIds) && payload.planIds.length
        ? "plan"
        : Array.isArray(payload.productIds) && payload.productIds.length
          ? "product"
          : "all_products",
    product_id: null,
    plan_id: null,
    created_by: adminId ?? existingCoupon?.created_by ?? null,
  };
}

export async function createAdminCoupon(payload, admin = null) {
  const existingCoupon = await models.Coupon.findOne({
    where: { code: normalizeCouponCode(payload.code) },
  });

  if (existingCoupon) {
    throw new AppError("A coupon with this code already exists.", 409);
  }

  const coupon = await sequelize.transaction(async (transaction) => {
    const createdCoupon = await models.Coupon.create(buildCouponPayload(payload, admin?.id), {
      transaction,
    });
    await syncCouponRelations(createdCoupon, payload, transaction);
    return createdCoupon;
  });

  return getAdminCoupon(coupon.id);
}

export async function updateAdminCoupon(couponId, payload) {
  const coupon = await models.Coupon.findByPk(couponId);

  if (!coupon) {
    throw new AppError("Coupon not found", 404);
  }

  if (payload.code) {
    const code = normalizeCouponCode(payload.code);
    const duplicate = await models.Coupon.findOne({
      where: {
        code,
        id: { [Op.ne]: coupon.id },
      },
    });

    if (duplicate) {
      throw new AppError("A coupon with this code already exists.", 409);
    }
  }

  await sequelize.transaction(async (transaction) => {
    await coupon.update(buildCouponPayload(payload, coupon.created_by, coupon), { transaction });
    await syncCouponRelations(coupon, payload, transaction);
  });

  return getAdminCoupon(coupon.id);
}

export async function deleteAdminCoupon(couponId) {
  const usageCount = await models.CouponUsage.count({ where: { coupon_id: couponId } });

  if (usageCount > 0) {
    throw new AppError(
      "This coupon has usage history and cannot be deleted. Deactivate it instead.",
      400,
    );
  }

  const deleted = await models.Coupon.destroy({ where: { id: couponId } });

  if (!deleted) {
    throw new AppError("Coupon not found", 404);
  }

  return { id: Number(couponId), deleted: true };
}
