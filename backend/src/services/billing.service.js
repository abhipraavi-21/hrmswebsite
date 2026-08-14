import crypto from "crypto";
import { Op } from "sequelize";
import { models, sequelize } from "../config/database.js";
import { AppError } from "../utils/AppError.js";

export const BILLING_CYCLE_META = {
  monthly: {
    label: "Monthly",
    months: 1,
  },
  semiannual: {
    label: "6 Months",
    months: 6,
  },
  annual: {
    label: "1 Year",
    months: 12,
  },
};

const ACTIVE_STATUS = "active";

function roundCurrency(value) {
  return Number(Number(value ?? 0).toFixed(2));
}

function toNumber(value) {
  return value === null || value === undefined ? 0 : Number(value);
}

function addMonths(date, months) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

function startOfDay(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function endOfDay(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}

function startOfMonth(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

function buildToken() {
  return crypto.randomUUID().replace(/-/g, "");
}

function buildNumber(prefix) {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = crypto.randomUUID().slice(0, 8).toUpperCase();
  return `${prefix}-${datePart}-${randomPart}`;
}

function resolveBillingCycle(billingCycle) {
  const meta = BILLING_CYCLE_META[billingCycle];

  if (!meta) {
    throw new AppError("Unsupported billing cycle", 400);
  }

  return meta;
}

function getCyclePrice(monthlyPrice, annualPrice, billingCycle) {
  const monthly = toNumber(monthlyPrice);
  const annual = annualPrice === null || annualPrice === undefined ? null : toNumber(annualPrice);

  if (billingCycle === "annual") {
    return roundCurrency(annual ?? monthly * 12);
  }

  if (billingCycle === "semiannual") {
    return roundCurrency(monthly * 6);
  }

  return roundCurrency(monthly);
}

function getQuantityMultiplier(addon, billingCycleMeta) {
  if (addon.pricing_type === "ONE_TIME") {
    return 1;
  }

  return billingCycleMeta.months;
}

function buildProductInclude({ activeOnly = true } = {}) {
  return [
    {
      model: models.Plan,
      as: "plans",
      required: false,
      where: activeOnly ? { status: ACTIVE_STATUS } : undefined,
      include: [
        {
          model: models.PlanFeature,
          as: "features",
          required: false,
        },
        {
          model: models.PlanLimit,
          as: "limits",
          required: false,
        },
      ],
    },
    {
      model: models.Addon,
      as: "addons",
      required: false,
      where: activeOnly ? { status: ACTIVE_STATUS } : undefined,
    },
  ];
}

function buildSubscriptionInclude() {
  return [
    {
      model: models.Company,
      as: "company",
    },
    {
      model: models.Product,
      as: "product",
    },
    {
      model: models.Plan,
      as: "plan",
      include: [
        { model: models.PlanFeature, as: "features", required: false },
        { model: models.PlanLimit, as: "limits", required: false },
      ],
    },
    {
      model: models.SubscriptionAddon,
      as: "addons",
      required: false,
      include: [
        {
          model: models.Addon,
          as: "addon",
        },
      ],
    },
    {
      model: models.SubscriptionUsage,
      as: "usage",
      required: false,
    },
  ];
}

function buildOrderInclude() {
  return [
    {
      model: models.Company,
      as: "company",
    },
    {
      model: models.Product,
      as: "product",
    },
    {
      model: models.Plan,
      as: "plan",
    },
    {
      model: models.Subscription,
      as: "subscription",
      required: false,
      include: buildSubscriptionInclude(),
    },
    {
      model: models.Payment,
      as: "payments",
      required: false,
    },
    {
      model: models.Invoice,
      as: "invoice",
      required: false,
    },
  ];
}

function serializeFeature(feature) {
  return {
    id: feature.id,
    code: feature.feature_code,
    name: feature.feature_name,
    description: feature.description,
    value: feature.value,
    enabled: feature.enabled,
    displayOrder: feature.display_order,
  };
}

function serializeLimit(limit) {
  return {
    id: limit.id,
    code: limit.limit_code,
    name: limit.limit_name,
    value: toNumber(limit.limit_value),
    unit: limit.unit,
    isUnlimited: Boolean(limit.is_unlimited),
  };
}

function serializeCatalogPlan(plan) {
  return {
    id: plan.id,
    productId: plan.product_id,
    name: plan.name,
    code: plan.code,
    slug: plan.slug,
    description: plan.description,
    currency: plan.currency,
    isPopular: Boolean(plan.is_popular),
    status: plan.status,
    displayOrder: plan.display_order,
    monthlyPrice: getCyclePrice(plan.monthly_price, plan.annual_price, "monthly"),
    semiannualPrice: getCyclePrice(plan.monthly_price, plan.annual_price, "semiannual"),
    annualPrice: getCyclePrice(plan.monthly_price, plan.annual_price, "annual"),
    features: (plan.features ?? [])
      .slice()
      .sort((left, right) => left.display_order - right.display_order)
      .map(serializeFeature),
    limits: (plan.limits ?? [])
      .slice()
      .sort((left, right) => left.id - right.id)
      .map(serializeLimit),
  };
}

function serializeCatalogAddon(addon) {
  return {
    id: addon.id,
    productId: addon.product_id,
    name: addon.name,
    code: addon.code,
    description: addon.description,
    pricingType: addon.pricing_type,
    currency: addon.currency,
    status: addon.status,
    displayOrder: addon.display_order,
    monthlyPrice:
      addon.monthly_price === null || addon.monthly_price === undefined
        ? null
        : getCyclePrice(addon.monthly_price, addon.annual_price, "monthly"),
    semiannualPrice:
      addon.pricing_type === "ONE_TIME"
        ? null
        : addon.monthly_price === null || addon.monthly_price === undefined
          ? null
          : getCyclePrice(addon.monthly_price, addon.annual_price, "semiannual"),
    annualPrice:
      addon.pricing_type === "ONE_TIME"
        ? null
        : addon.monthly_price === null || addon.monthly_price === undefined
          ? addon.annual_price === null || addon.annual_price === undefined
            ? null
            : getCyclePrice(addon.monthly_price, addon.annual_price, "annual")
          : getCyclePrice(addon.monthly_price, addon.annual_price, "annual"),
    unitPrice:
      addon.unit_price === null || addon.unit_price === undefined ? null : Number(addon.unit_price),
    metadata: addon.metadata_json ?? {},
  };
}

function serializeProduct(product) {
  return {
    id: product.id,
    name: product.name,
    code: product.code,
    slug: product.slug,
    description: product.description,
    icon: product.icon,
    status: product.status,
    displayOrder: product.display_order,
    plans: (product.plans ?? [])
      .slice()
      .sort((left, right) => left.display_order - right.display_order)
      .map(serializeCatalogPlan),
    addons: (product.addons ?? [])
      .slice()
      .sort((left, right) => left.display_order - right.display_order)
      .map(serializeCatalogAddon),
  };
}

function buildEntitlements(plan, subscriptionAddons) {
  const featureMap = new Map();
  const limitMap = new Map();

  for (const feature of plan?.features ?? []) {
    if (!feature.enabled) {
      continue;
    }

    featureMap.set(feature.feature_code, {
      code: feature.feature_code,
      name: feature.feature_name,
      description: feature.description,
      value: feature.value,
      source: "plan",
    });
  }

  for (const limit of plan?.limits ?? []) {
    limitMap.set(limit.limit_code, {
      code: limit.limit_code,
      name: limit.limit_name,
      value: toNumber(limit.limit_value),
      unit: limit.unit,
      isUnlimited: Boolean(limit.is_unlimited),
      source: "plan",
    });
  }

  for (const subscriptionAddon of subscriptionAddons ?? []) {
    const addon = subscriptionAddon.addon;
    const metadata = addon?.metadata_json ?? {};
    const quantity = toNumber(subscriptionAddon.quantity);

    if (metadata.featureCode) {
      featureMap.set(metadata.featureCode, {
        code: metadata.featureCode,
        name: addon?.name ?? metadata.featureCode,
        description: addon?.description ?? null,
        value: true,
        source: "addon",
      });
    }

    if (metadata.limitCode) {
      const current = limitMap.get(metadata.limitCode) ?? {
        code: metadata.limitCode,
        name: addon?.name ?? metadata.limitCode,
        value: 0,
        unit: null,
        isUnlimited: false,
        source: "addon",
      };
      const limitMultiplier = toNumber(metadata.limitMultiplier ?? 1);
      const nextValue = current.isUnlimited ? current.value : current.value + quantity * limitMultiplier;

      limitMap.set(metadata.limitCode, {
        ...current,
        value: nextValue,
      });
    }
  }

  return {
    features: [...featureMap.values()],
    limits: [...limitMap.values()],
  };
}

function getUsagePeriodEnd(metricCode, periodStart, billingCycle) {
  if (metricCode === "MONTHLY_EMAILS") {
    return addMonths(periodStart, 1);
  }

  return addMonths(periodStart, resolveBillingCycle(billingCycle).months);
}

function serializeUsageItem(usage) {
  const limitValue = toNumber(usage.limit_value);
  const usedValue = toNumber(usage.used_value);

  return {
    id: usage.id,
    metricCode: usage.metric_code,
    usedValue,
    limitValue,
    remainingValue: Math.max(0, roundCurrency(limitValue - usedValue)),
    periodStart: usage.period_start,
    periodEnd: usage.period_end,
  };
}

function serializeSubscription(subscription) {
  const entitlements = buildEntitlements(subscription.plan, subscription.addons ?? []);

  return {
    id: subscription.id,
    subscriptionNumber: subscription.subscription_number,
    customerAccountId: subscription.customer_account_id,
    companyId: subscription.company_id,
    product: subscription.product
      ? {
          id: subscription.product.id,
          name: subscription.product.name,
          code: subscription.product.code,
          slug: subscription.product.slug,
          icon: subscription.product.icon,
        }
      : null,
    plan: subscription.plan ? serializeCatalogPlan(subscription.plan) : null,
    billingCycle: subscription.billing_cycle,
    billingCycleLabel: resolveBillingCycle(subscription.billing_cycle).label,
    billingCycleMonths: resolveBillingCycle(subscription.billing_cycle).months,
    startDate: subscription.start_date,
    endDate: subscription.end_date,
    renewalDate: subscription.renewal_date,
    status: subscription.status,
    autoRenew: Boolean(subscription.auto_renew),
    company: subscription.company
      ? {
          id: subscription.company.id,
          name: subscription.company.name,
          gstin: subscription.company.gstin,
          city: subscription.company.city,
          state: subscription.company.state,
          country: subscription.company.country,
          postalCode: subscription.company.postal_code,
          employeeCount: subscription.company.employee_count,
        }
      : null,
    amounts: {
      basePrice: toNumber(subscription.base_price),
      addonTotal: toNumber(subscription.addon_total),
      discountAmount: toNumber(subscription.discount_amount),
      taxAmount: toNumber(subscription.tax_amount),
      totalAmount: toNumber(subscription.total_amount),
    },
    addons: (subscription.addons ?? []).map((subscriptionAddon) => ({
      id: subscriptionAddon.id,
      quantity: toNumber(subscriptionAddon.quantity),
      unitPrice: toNumber(subscriptionAddon.unit_price),
      totalPrice: toNumber(subscriptionAddon.total_price),
      startDate: subscriptionAddon.start_date,
      endDate: subscriptionAddon.end_date,
      status: subscriptionAddon.status,
      addon: subscriptionAddon.addon ? serializeCatalogAddon(subscriptionAddon.addon) : null,
    })),
    usage: (subscription.usage ?? []).map(serializeUsageItem),
    entitlements,
  };
}

function serializePayment(payment) {
  if (!payment) {
    return null;
  }

  return {
    id: payment.id,
    paymentNumber: payment.payment_number,
    orderId: payment.order_id,
    customerAccountId: payment.customer_account_id,
    companyId: payment.company_id,
    productId: payment.product_id,
    subscriptionId: payment.subscription_id,
    gatewayProvider: payment.gateway_provider,
    gatewayTransactionId: payment.gateway_transaction_id,
    gatewayPaymentId: payment.gateway_payment_id,
    amount: toNumber(payment.amount),
    currency: payment.currency,
    status: payment.status,
    failureReason: payment.failure_reason,
    paidAt: payment.paid_at,
    rawResponse: payment.raw_response_json ?? null,
    createdAt: payment.createdAt,
  };
}

function serializeInvoice(invoice) {
  if (!invoice) {
    return null;
  }

  return {
    id: invoice.id,
    invoiceNumber: invoice.invoice_number,
    orderId: invoice.order_id,
    subscriptionId: invoice.subscription_id,
    customerAccountId: invoice.customer_account_id,
    companyId: invoice.company_id,
    productId: invoice.product_id,
    planId: invoice.plan_id,
    billingPeriodStart: invoice.billing_period_start,
    billingPeriodEnd: invoice.billing_period_end,
    subtotalAmount: toNumber(invoice.subtotal_amount),
    addonAmount: toNumber(invoice.addon_amount),
    discountAmount: toNumber(invoice.discount_amount),
    taxAmount: toNumber(invoice.tax_amount),
    totalAmount: toNumber(invoice.total_amount),
    currency: invoice.currency,
    status: invoice.status,
    lineItems: invoice.line_items_json ?? [],
    issuedAt: invoice.issued_at,
  };
}

function serializeOrder(order) {
  const latestPayment =
    (order.payments ?? [])
      .slice()
      .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt))[0] ?? null;

  return {
    id: order.id,
    orderNumber: order.order_number,
    customerAccountId: order.customer_account_id,
    companyId: order.company_id,
    product: order.product
      ? {
          id: order.product.id,
          name: order.product.name,
          code: order.product.code,
          slug: order.product.slug,
        }
      : null,
    plan: order.plan
      ? {
          id: order.plan.id,
          name: order.plan.name,
          code: order.plan.code,
          slug: order.plan.slug,
        }
      : null,
    company: order.company
      ? {
          id: order.company.id,
          name: order.company.name,
          gstin: order.company.gstin,
        }
      : null,
    subscriptionId: order.subscription_id,
    lifecycleType: order.lifecycle_type,
    billingCycle: order.billing_cycle,
    billingCycleLabel: resolveBillingCycle(order.billing_cycle).label,
    billingCycleMonths: resolveBillingCycle(order.billing_cycle).months,
    currency: order.currency,
    baseAmount: toNumber(order.base_amount),
    addonAmount: toNumber(order.addon_amount),
    discountAmount: toNumber(order.discount_amount),
    taxAmount: toNumber(order.tax_amount),
    totalAmount: toNumber(order.total_amount),
    gatewayProvider: order.gateway_provider,
    gatewayOrderId: order.gateway_order_id,
    status: order.status,
    couponCode: order.coupon_code,
    selectedAddons: order.selected_addons_json ?? [],
    metadata: order.metadata_json ?? {},
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    payment: serializePayment(latestPayment),
    invoice: serializeInvoice(order.invoice),
    subscription: order.subscription ? serializeSubscription(order.subscription) : null,
  };
}

async function getProductBySlug(productSlug, { activeOnly = true, transaction } = {}) {
  const product = await models.Product.findOne({
    where: {
      slug: productSlug,
      ...(activeOnly ? { status: ACTIVE_STATUS } : {}),
    },
    include: buildProductInclude({ activeOnly }),
    transaction,
  });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return product;
}

async function getPlanForProduct(product, planId, transaction) {
  const plan = (product.plans ?? []).find((entry) => entry.id === planId);

  if (!plan) {
    throw new AppError("Selected plan was not found for this product", 404);
  }

  if (plan.status !== ACTIVE_STATUS) {
    throw new AppError("Selected plan is currently inactive", 400);
  }

  if (!plan.features || !plan.limits) {
    await plan.reload({
      include: [
        { model: models.PlanFeature, as: "features", required: false },
        { model: models.PlanLimit, as: "limits", required: false },
      ],
      transaction,
    });
  }

  return plan;
}

async function getCouponForScope(code, productId, planId, transaction) {
  if (!code) {
    return null;
  }

  const coupon = await models.Coupon.findOne({
    where: {
      code: code.trim().toUpperCase(),
      status: ACTIVE_STATUS,
    },
    transaction,
  });

  if (!coupon) {
    throw new AppError("Coupon code not found", 404);
  }

  const now = new Date();

  if (coupon.starts_at && new Date(coupon.starts_at) > now) {
    throw new AppError("Coupon is not active yet", 400);
  }

  if (coupon.ends_at && new Date(coupon.ends_at) < now) {
    throw new AppError("Coupon has expired", 400);
  }

  if (
    coupon.max_redemptions !== null &&
    coupon.max_redemptions !== undefined &&
    coupon.redeemed_count >= coupon.max_redemptions
  ) {
    throw new AppError("Coupon redemption limit has been reached", 400);
  }

  if (coupon.applies_to_scope === "product" && coupon.product_id !== productId) {
    throw new AppError("Coupon is not valid for this product", 400);
  }

  if (coupon.applies_to_scope === "plan" && coupon.plan_id !== planId) {
    throw new AppError("Coupon is not valid for this plan", 400);
  }

  return coupon;
}

async function getTaxSetting(transaction) {
  const taxSetting = await models.TaxSetting.findOne({
    where: {
      is_enabled: true,
    },
    order: [["id", "ASC"]],
    transaction,
  });

  return taxSetting;
}

function calculateAddonLine(addon, quantity, billingCycle) {
  const billingCycleMeta = resolveBillingCycle(billingCycle);
  const normalizedQuantity = Math.max(1, roundCurrency(quantity ?? 1));
  let unitPrice = 0;
  let totalPrice = 0;

  if (addon.pricing_type === "FLAT_MONTHLY" || addon.pricing_type === "FLAT_YEARLY") {
    unitPrice = getCyclePrice(addon.monthly_price, addon.annual_price, billingCycle);
    totalPrice = unitPrice;
  } else if (addon.pricing_type === "ONE_TIME") {
    unitPrice = toNumber(addon.unit_price);
    totalPrice = roundCurrency(unitPrice * normalizedQuantity);
  } else {
    unitPrice = toNumber(addon.unit_price);
    totalPrice = roundCurrency(unitPrice * normalizedQuantity * getQuantityMultiplier(addon, billingCycleMeta));
  }

  return {
    addonId: addon.id,
    code: addon.code,
    name: addon.name,
    pricingType: addon.pricing_type,
    quantity: normalizedQuantity,
    unitPrice: roundCurrency(unitPrice),
    totalPrice: roundCurrency(totalPrice),
    metadata: addon.metadata_json ?? {},
  };
}

function applyCouponAmount(amount, coupon) {
  if (!coupon) {
    return 0;
  }

  if (coupon.discount_type === "percent") {
    return roundCurrency(amount * (toNumber(coupon.discount_value) / 100));
  }

  return roundCurrency(Math.min(amount, toNumber(coupon.discount_value)));
}

async function calculateCheckoutPreviewInternal(payload, transaction) {
  const product = await getProductBySlug(payload.productSlug, { transaction });
  const plan = await getPlanForProduct(product, payload.planId, transaction);
  const coupon = await getCouponForScope(payload.couponCode, product.id, plan.id, transaction);
  const taxSetting = await getTaxSetting(transaction);

  const addonSelections = Array.isArray(payload.addonSelections) ? payload.addonSelections : [];
  const addonMap = new Map((product.addons ?? []).map((addon) => [addon.id, addon]));
  const addonLines = addonSelections.map((selection) => {
    const addon = addonMap.get(selection.addonId);

    if (!addon) {
      throw new AppError("Selected add-on was not found for this product", 404);
    }

    if (addon.status !== ACTIVE_STATUS) {
      throw new AppError("Selected add-on is currently inactive", 400);
    }

    return calculateAddonLine(addon, selection.quantity, payload.billingCycle);
  });

  const baseAmount = getCyclePrice(plan.monthly_price, plan.annual_price, payload.billingCycle);
  const addonAmount = roundCurrency(addonLines.reduce((sum, addonLine) => sum + addonLine.totalPrice, 0));
  const subtotalAmount = roundCurrency(baseAmount + addonAmount);
  const discountAmount = applyCouponAmount(subtotalAmount, coupon);
  const taxableAmount = roundCurrency(Math.max(0, subtotalAmount - discountAmount));
  const taxRate = taxSetting?.is_enabled ? toNumber(taxSetting.tax_rate) : 0;
  const isTaxInclusive = Boolean(taxSetting?.is_inclusive);
  const taxAmount = taxSetting?.is_enabled
    ? isTaxInclusive
      ? roundCurrency(taxableAmount - taxableAmount / (1 + taxRate / 100))
      : roundCurrency(taxableAmount * (taxRate / 100))
    : 0;
  const totalAmount = isTaxInclusive ? taxableAmount : roundCurrency(taxableAmount + taxAmount);
  const cycleMeta = resolveBillingCycle(payload.billingCycle);

  return {
    product,
    plan,
    coupon,
    taxSetting,
    pricing: {
      billingCycle: payload.billingCycle,
      billingCycleLabel: cycleMeta.label,
      billingCycleMonths: cycleMeta.months,
      currency: plan.currency,
      baseAmount,
      addonAmount,
      subtotalAmount,
      discountAmount,
      taxAmount,
      totalAmount,
      taxRate,
      taxName: taxSetting?.tax_name ?? "Tax",
      isTaxInclusive,
      nextRenewalDate: addMonths(new Date(), cycleMeta.months),
    },
    addonLines,
  };
}

async function syncBillingDetails(customerAccount, billingDetails, transaction) {
  const updates = {};
  const companyUpdates = {};

  if (billingDetails.contactName?.trim()) {
    updates.contact_name = billingDetails.contactName.trim();
  }

  if (billingDetails.email?.trim()) {
    updates.email = billingDetails.email.trim().toLowerCase();
  }

  if (typeof billingDetails.phone === "string") {
    updates.phone = billingDetails.phone.trim() || null;
  }

  if (billingDetails.companyName?.trim()) {
    updates.company_name = billingDetails.companyName.trim();
    companyUpdates.name = billingDetails.companyName.trim();
  }

  if (billingDetails.gstin?.trim()) {
    companyUpdates.gstin = billingDetails.gstin.trim();
  }

  if (billingDetails.addressLine1?.trim()) {
    companyUpdates.address_line_1 = billingDetails.addressLine1.trim();
  }

  if (typeof billingDetails.addressLine2 === "string") {
    companyUpdates.address_line_2 = billingDetails.addressLine2.trim() || null;
  }

  if (billingDetails.city?.trim()) {
    companyUpdates.city = billingDetails.city.trim();
  }

  if (billingDetails.state?.trim()) {
    companyUpdates.state = billingDetails.state.trim();
  }

  if (billingDetails.country?.trim()) {
    companyUpdates.country = billingDetails.country.trim();
  }

  if (billingDetails.postalCode?.trim()) {
    companyUpdates.postal_code = billingDetails.postalCode.trim();
  }

  if (billingDetails.employeeCount !== null && billingDetails.employeeCount !== undefined) {
    companyUpdates.employee_count = Number(billingDetails.employeeCount);
  }

  if (Object.keys(updates).length > 0) {
    await customerAccount.update(updates, { transaction });
  }

  if (customerAccount.company_id && Object.keys(companyUpdates).length > 0) {
    await models.Company.update(companyUpdates, {
      where: { id: customerAccount.company_id },
      transaction,
    });
  }
}

async function createOrRefreshUsage(subscription, transaction) {
  const entitlements = buildEntitlements(subscription.plan, subscription.addons ?? []);
  const periodStart = new Date();

  await models.SubscriptionUsage.destroy({
    where: {
      subscription_id: subscription.id,
    },
    transaction,
  });

  for (const limit of entitlements.limits) {
    if (limit.isUnlimited) {
      continue;
    }

    await models.SubscriptionUsage.create(
      {
        subscription_id: subscription.id,
        metric_code: limit.code,
        used_value: 0,
        limit_value: limit.value,
        period_start: periodStart,
        period_end: getUsagePeriodEnd(limit.code, periodStart, subscription.billing_cycle),
      },
      { transaction },
    );
  }
}

async function saveSubscriptionAddons(subscription, addonLines, transaction) {
  await models.SubscriptionAddon.destroy({
    where: {
      subscription_id: subscription.id,
    },
    transaction,
  });

  for (const addonLine of addonLines) {
    await models.SubscriptionAddon.create(
      {
        subscription_id: subscription.id,
        addon_id: addonLine.addonId,
        quantity: addonLine.quantity,
        unit_price: addonLine.unitPrice,
        total_price: addonLine.totalPrice,
        start_date: subscription.start_date,
        end_date: subscription.end_date,
        status: ACTIVE_STATUS,
      },
      { transaction },
    );
  }
}

async function loadSubscriptionDetail(subscriptionId, transaction) {
  return models.Subscription.findByPk(subscriptionId, {
    include: buildSubscriptionInclude(),
    transaction,
  });
}

async function activateSubscriptionFromOrder(order, transaction) {
  const now = new Date();
  const cycleMeta = resolveBillingCycle(order.billing_cycle);
  const existingSubscription = await models.Subscription.findOne({
    where: {
      customer_account_id: order.customer_account_id,
      product_id: order.product_id,
    },
    transaction,
  });

  const subscriptionPayload = {
    customer_account_id: order.customer_account_id,
    company_id: order.company_id,
    product_id: order.product_id,
    plan_id: order.plan_id,
    billing_cycle: order.billing_cycle,
    start_date: now,
    end_date: addMonths(now, cycleMeta.months),
    renewal_date: addMonths(now, cycleMeta.months),
    status: ACTIVE_STATUS,
    base_price: order.base_amount,
    addon_total: order.addon_amount,
    discount_amount: order.discount_amount,
    tax_amount: order.tax_amount,
    total_amount: order.total_amount,
    auto_renew: true,
  };

  const subscription = existingSubscription
    ? await existingSubscription.update(subscriptionPayload, { transaction })
    : await models.Subscription.create(
        {
          subscription_number: buildNumber("ALT-SUB"),
          ...subscriptionPayload,
        },
        { transaction },
      );

  await saveSubscriptionAddons(subscription, order.selected_addons_json ?? [], transaction);

  const detailedSubscription = await loadSubscriptionDetail(subscription.id, transaction);
  await createOrRefreshUsage(detailedSubscription, transaction);

  return loadSubscriptionDetail(subscription.id, transaction);
}

async function createInvoiceForOrder(order, subscription, transaction) {
  const existingInvoice = await models.Invoice.findOne({
    where: {
      order_id: order.id,
    },
    transaction,
  });

  if (existingInvoice) {
    return existingInvoice;
  }

  return models.Invoice.create(
    {
      invoice_number: buildNumber("ALT-INV"),
      order_id: order.id,
      subscription_id: subscription?.id ?? null,
      customer_account_id: order.customer_account_id,
      company_id: order.company_id,
      product_id: order.product_id,
      plan_id: order.plan_id,
      billing_period_start: subscription?.start_date ?? new Date(),
      billing_period_end: subscription?.end_date ?? new Date(),
      subtotal_amount: order.base_amount,
      addon_amount: order.addon_amount,
      discount_amount: order.discount_amount,
      tax_amount: order.tax_amount,
      total_amount: order.total_amount,
      currency: order.currency,
      status: "paid",
      line_items_json: [
        {
          type: "plan",
          amount: toNumber(order.base_amount),
        },
        ...(order.selected_addons_json ?? []).map((addonLine) => ({
          type: "addon",
          code: addonLine.code,
          name: addonLine.name,
          quantity: addonLine.quantity,
          amount: addonLine.totalPrice,
        })),
      ],
      issued_at: new Date(),
    },
    { transaction },
  );
}

function calculateMonthlyEquivalent(totalAmount, billingCycle) {
  const months = resolveBillingCycle(billingCycle).months;
  return roundCurrency(toNumber(totalAmount) / months);
}

export async function listBillingProducts() {
  const products = await models.Product.findAll({
    where: {
      status: ACTIVE_STATUS,
    },
    include: buildProductInclude(),
  });

  return products
    .slice()
    .sort((left, right) => left.display_order - right.display_order)
    .map(serializeProduct);
}

export async function getBillingProductCatalog(productSlug) {
  return serializeProduct(await getProductBySlug(productSlug));
}

export async function previewCheckout(payload) {
  const preview = await calculateCheckoutPreviewInternal(payload);

  return {
    product: serializeProduct(preview.product),
    selectedPlan: serializeCatalogPlan(preview.plan),
    selectedAddons: preview.addonLines,
    pricing: preview.pricing,
    coupon: preview.coupon
      ? {
          code: preview.coupon.code,
          description: preview.coupon.description,
          discountType: preview.coupon.discount_type,
          discountValue: toNumber(preview.coupon.discount_value),
        }
      : null,
  };
}

export async function createCheckoutIntent(payload, customerAccount = null) {
  const preview = await calculateCheckoutPreviewInternal(payload);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 120);

  const checkoutIntent = await models.CheckoutIntent.create({
    intent_token: buildToken(),
    customer_account_id: customerAccount?.id ?? null,
    company_id: customerAccount?.company_id ?? null,
    product_id: preview.product.id,
    plan_id: preview.plan.id,
    billing_cycle: payload.billingCycle,
    coupon_id: preview.coupon?.id ?? null,
    status: ACTIVE_STATUS,
    source_route: payload.sourceRoute ?? null,
    selected_addons_json: preview.addonLines,
    expires_at: expiresAt,
  });

  return {
    intentToken: checkoutIntent.intent_token,
    expiresAt,
    preview: {
      product: serializeProduct(preview.product),
      selectedPlan: serializeCatalogPlan(preview.plan),
      selectedAddons: preview.addonLines,
      pricing: preview.pricing,
      coupon: preview.coupon
        ? {
            code: preview.coupon.code,
            description: preview.coupon.description,
            discountType: preview.coupon.discount_type,
            discountValue: toNumber(preview.coupon.discount_value),
          }
        : null,
    },
  };
}

export async function createCheckoutOrder(payload, customerAccount) {
  return sequelize.transaction(async (transaction) => {
    const checkoutIntent = await models.CheckoutIntent.findOne({
      where: {
        intent_token: payload.intentToken,
        status: ACTIVE_STATUS,
      },
      transaction,
    });

    if (!checkoutIntent) {
      throw new AppError("Checkout intent was not found", 404);
    }

    if (new Date(checkoutIntent.expires_at) < new Date()) {
      throw new AppError("Checkout intent has expired", 400);
    }

    const preview = await calculateCheckoutPreviewInternal(
      {
        productSlug: payload.productSlug,
        planId: checkoutIntent.plan_id,
        billingCycle: checkoutIntent.billing_cycle,
        addonSelections: (checkoutIntent.selected_addons_json ?? []).map((addonLine) => ({
          addonId: addonLine.addonId,
          quantity: addonLine.quantity,
        })),
        couponCode: payload.couponCode ?? null,
      },
      transaction,
    );

    await syncBillingDetails(customerAccount, payload.billingDetails ?? {}, transaction);

    const existingSubscription = await models.Subscription.findOne({
      where: {
        customer_account_id: customerAccount.id,
        product_id: preview.product.id,
      },
      transaction,
    });

    const lifecycleType =
      payload.lifecycleType ??
      (existingSubscription ? (existingSubscription.plan_id === preview.plan.id ? "renewal" : "upgrade") : "new");

    const order = await models.Order.create(
      {
        order_number: buildNumber("ALT-ORD"),
        customer_account_id: customerAccount.id,
        company_id: customerAccount.company_id,
        product_id: preview.product.id,
        plan_id: preview.plan.id,
        subscription_id: existingSubscription?.id ?? null,
        lifecycle_type: lifecycleType,
        billing_cycle: checkoutIntent.billing_cycle,
        currency: preview.plan.currency,
        base_amount: preview.pricing.baseAmount,
        addon_amount: preview.pricing.addonAmount,
        discount_amount: preview.pricing.discountAmount,
        tax_amount: preview.pricing.taxAmount,
        total_amount: preview.pricing.totalAmount,
        gateway_provider: payload.gatewayProvider ?? "sandbox",
        status: "pending_payment",
        selected_addons_json: preview.addonLines,
        coupon_code: preview.coupon?.code ?? null,
        metadata_json: {
          intentToken: checkoutIntent.intent_token,
          sourceRoute: payload.sourceRoute ?? checkoutIntent.source_route ?? null,
          notes: payload.notes ?? null,
        },
      },
      { transaction },
    );

    const detailedOrder = await models.Order.findByPk(order.id, {
      include: buildOrderInclude(),
      transaction,
    });

    return {
      order: serializeOrder(detailedOrder),
      preview: {
        product: serializeProduct(preview.product),
        selectedPlan: serializeCatalogPlan(preview.plan),
        selectedAddons: preview.addonLines,
        pricing: preview.pricing,
      },
    };
  });
}

export async function completeOrderPayment(payload, customerAccount) {
  return sequelize.transaction(async (transaction) => {
    const order = await models.Order.findOne({
      where: {
        order_number: payload.orderNumber,
        customer_account_id: customerAccount.id,
      },
      transaction,
    });

    if (!order) {
      throw new AppError("Order was not found", 404);
    }

    const paymentStatus = payload.outcome === "failed" ? "failed" : "success";
    const payment = await models.Payment.create(
      {
        payment_number: buildNumber("ALT-PAY"),
        order_id: order.id,
        customer_account_id: order.customer_account_id,
        company_id: order.company_id,
        product_id: order.product_id,
        subscription_id: order.subscription_id,
        gateway_provider: payload.gatewayProvider ?? order.gateway_provider ?? "sandbox",
        gateway_transaction_id: payload.gatewayTransactionId ?? buildNumber("TXN"),
        gateway_payment_id: payload.gatewayPaymentId ?? buildToken().slice(0, 20).toUpperCase(),
        amount: order.total_amount,
        currency: order.currency,
        status: paymentStatus,
        failure_reason: paymentStatus === "failed" ? payload.failureReason ?? "Payment was not completed." : null,
        paid_at: paymentStatus === "success" ? new Date() : null,
        raw_response_json: {
          paymentMethod: payload.paymentMethod ?? null,
          outcome: payload.outcome,
        },
      },
      { transaction },
    );

    let subscription = null;
    let invoice = null;

    if (paymentStatus === "success") {
      subscription = await activateSubscriptionFromOrder(order, transaction);
      invoice = await createInvoiceForOrder(order, subscription, transaction);

      await order.update(
        {
          subscription_id: subscription.id,
          status: "paid",
        },
        { transaction },
      );

      await payment.update(
        {
          subscription_id: subscription.id,
        },
        { transaction },
      );

      const intentToken = order.metadata_json?.intentToken;

      if (intentToken) {
        await models.CheckoutIntent.update(
          {
            status: "completed",
          },
          {
            where: {
              intent_token: intentToken,
            },
            transaction,
          },
        );
      }

      if (order.coupon_code) {
        await models.Coupon.increment(
          {
            redeemed_count: 1,
          },
          {
            where: {
              code: order.coupon_code,
            },
            transaction,
          },
        );
      }
    } else {
      await order.update(
        {
          status: "failed",
        },
        { transaction },
      );
    }

    const detailedOrder = await models.Order.findByPk(order.id, {
      include: buildOrderInclude(),
      transaction,
    });

    return {
      order: serializeOrder(detailedOrder),
      payment: serializePayment(payment),
      subscription: subscription ? serializeSubscription(subscription) : null,
      invoice: invoice ? serializeInvoice(invoice) : null,
    };
  });
}

export async function getOrderForCustomer(orderNumber, customerAccount) {
  const order = await models.Order.findOne({
    where: {
      order_number: orderNumber,
      customer_account_id: customerAccount.id,
    },
    include: buildOrderInclude(),
  });

  if (!order) {
    throw new AppError("Order was not found", 404);
  }

  return serializeOrder(order);
}

export async function getCustomerBillingDashboard(customerAccount) {
  const subscriptions = await models.Subscription.findAll({
    where: {
      customer_account_id: customerAccount.id,
    },
    include: buildSubscriptionInclude(),
  });
  const payments = await models.Payment.findAll({
    where: {
      customer_account_id: customerAccount.id,
    },
    include: [
      { model: models.Product, as: "product" },
      { model: models.Order, as: "order", required: false },
    ],
    order: [["createdAt", "DESC"]],
  });
  const invoices = await models.Invoice.findAll({
    where: {
      customer_account_id: customerAccount.id,
    },
    include: [{ model: models.Product, as: "product" }, { model: models.Plan, as: "plan" }],
    order: [["issued_at", "DESC"]],
  });

  const serializedSubscriptions = subscriptions
    .slice()
    .sort((left, right) => left.product.display_order - right.product.display_order)
    .map(serializeSubscription);
  const totalSpent = payments
    .filter((payment) => payment.status === "success")
    .reduce((sum, payment) => sum + toNumber(payment.amount), 0);
  const renewalsDueSoon = serializedSubscriptions.filter((subscription) => {
    return (
      subscription.status === ACTIVE_STATUS &&
      new Date(subscription.renewalDate).getTime() <= addMonths(new Date(), 1).getTime()
    );
  }).length;

  return {
    account: {
      id: customerAccount.id,
      username: customerAccount.username,
      companyId: customerAccount.company_id,
      companyName: customerAccount.company?.name ?? customerAccount.company_name,
      contactName: customerAccount.contact_name,
      email: customerAccount.email,
      phone: customerAccount.phone,
    },
    summary: {
      activeSubscriptions: serializedSubscriptions.filter((subscription) => subscription.status === ACTIVE_STATUS).length,
      totalSpent: roundCurrency(totalSpent),
      renewalsDueSoon,
      invoiceCount: invoices.length,
    },
    products: serializedSubscriptions,
    payments: payments.map((payment) => ({
      id: payment.id,
      paymentNumber: payment.payment_number,
      orderNumber: payment.order?.order_number ?? null,
      product: payment.product
        ? {
            id: payment.product.id,
            name: payment.product.name,
            slug: payment.product.slug,
          }
        : null,
      amount: toNumber(payment.amount),
      currency: payment.currency,
      status: payment.status,
      paidAt: payment.paid_at,
      createdAt: payment.createdAt,
    })),
    invoices: invoices.map((invoice) => ({
      id: invoice.id,
      invoiceNumber: invoice.invoice_number,
      product: invoice.product
        ? {
            id: invoice.product.id,
            name: invoice.product.name,
            slug: invoice.product.slug,
          }
        : null,
      plan: invoice.plan
        ? {
            id: invoice.plan.id,
            name: invoice.plan.name,
            slug: invoice.plan.slug,
          }
        : null,
      totalAmount: toNumber(invoice.total_amount),
      currency: invoice.currency,
      status: invoice.status,
      issuedAt: invoice.issued_at,
    })),
  };
}

export async function getCustomerProductDashboard(customerAccount, productSlug) {
  const subscriptions = await models.Subscription.findAll({
    where: {
      customer_account_id: customerAccount.id,
    },
    include: buildSubscriptionInclude(),
  });

  const resolvedSubscription = subscriptions.find(
    (subscription) => subscription.product?.slug === productSlug,
  );

  if (!resolvedSubscription) {
    throw new AppError("No subscription found for this product", 404);
  }

  return serializeSubscription(resolvedSubscription);
}

export async function listCustomerPayments(customerAccount, productSlug = null) {
  const where = {
    customer_account_id: customerAccount.id,
  };

  const include = [
    { model: models.Product, as: "product" },
    { model: models.Order, as: "order", required: false },
  ];

  const payments = await models.Payment.findAll({
    where,
    include,
    order: [["createdAt", "DESC"]],
  });

  return payments
    .filter((payment) => !productSlug || payment.product?.slug === productSlug)
    .map((payment) => ({
      id: payment.id,
      paymentNumber: payment.payment_number,
      orderNumber: payment.order?.order_number ?? null,
      product: payment.product
        ? {
            id: payment.product.id,
            name: payment.product.name,
            slug: payment.product.slug,
          }
        : null,
      amount: toNumber(payment.amount),
      currency: payment.currency,
      status: payment.status,
      paidAt: payment.paid_at,
      createdAt: payment.createdAt,
    }));
}

export async function getAdminBillingOverview() {
  const [customers, subscriptions, payments, products] = await Promise.all([
    models.CustomerAccount.findAll({
      include: [{ model: models.Company, as: "company", required: false }],
    }),
    models.Subscription.findAll({
      include: [{ model: models.Product, as: "product" }, { model: models.Plan, as: "plan" }],
    }),
    models.Payment.findAll({
      include: [{ model: models.Product, as: "product" }],
    }),
    models.Product.findAll(),
  ]);

  const activeSubscriptions = subscriptions.filter((subscription) => subscription.status === ACTIVE_STATUS);
  const successfulPayments = payments.filter((payment) => payment.status === "success");
  const todayStart = startOfDay();
  const todayEnd = endOfDay();
  const monthStart = startOfMonth();
  const monthEnd = endOfMonth();

  const mrr = activeSubscriptions.reduce(
    (sum, subscription) => sum + calculateMonthlyEquivalent(subscription.total_amount, subscription.billing_cycle),
    0,
  );
  const revenueToday = successfulPayments
    .filter((payment) => payment.paid_at && new Date(payment.paid_at) >= todayStart && new Date(payment.paid_at) <= todayEnd)
    .reduce((sum, payment) => sum + toNumber(payment.amount), 0);
  const revenueThisMonth = successfulPayments
    .filter((payment) => payment.paid_at && new Date(payment.paid_at) >= monthStart && new Date(payment.paid_at) <= monthEnd)
    .reduce((sum, payment) => sum + toNumber(payment.amount), 0);

  return {
    totalCustomers: customers.length,
    activeSubscriptions: activeSubscriptions.length,
    mrr: roundCurrency(mrr),
    arr: roundCurrency(mrr * 12),
    revenueToday: roundCurrency(revenueToday),
    revenueThisMonth: roundCurrency(revenueThisMonth),
    renewalsDueSoon: activeSubscriptions.filter((subscription) => {
      return new Date(subscription.renewal_date).getTime() <= addMonths(new Date(), 1).getTime();
    }).length,
    failedPayments: payments.filter((payment) => payment.status === "failed").length,
    revenueByProduct: products
      .map((product) => ({
        product: {
          id: product.id,
          name: product.name,
          slug: product.slug,
        },
        revenue: roundCurrency(
          successfulPayments
            .filter((payment) => payment.product_id === product.id)
            .reduce((sum, payment) => sum + toNumber(payment.amount), 0),
        ),
      }))
      .sort((left, right) => right.revenue - left.revenue),
  };
}

export async function listAdminCustomers() {
  const customers = await models.CustomerAccount.findAll({
    include: [
      { model: models.Company, as: "company", required: false },
      {
        model: models.Subscription,
        as: "subscriptions",
        required: false,
        include: [{ model: models.Product, as: "product" }, { model: models.Plan, as: "plan" }],
      },
      {
        model: models.Payment,
        as: "payments",
        required: false,
      },
    ],
  });

  return customers.map((customer) => {
    const activeSubscriptions = (customer.subscriptions ?? []).filter(
      (subscription) => subscription.status === ACTIVE_STATUS,
    );
    const successfulPayments = (customer.payments ?? [])
      .filter((payment) => payment.status === "success")
      .sort((left, right) => new Date(right.paid_at ?? right.createdAt) - new Date(left.paid_at ?? left.createdAt));

    return {
      id: customer.id,
      username: customer.username,
      contactName: customer.contact_name,
      email: customer.email,
      phone: customer.phone,
      lastLoginAt: customer.last_login_at,
      createdAt: customer.createdAt,
      company: customer.company
        ? {
            id: customer.company.id,
            name: customer.company.name,
            gstin: customer.company.gstin,
            addressLine1: customer.company.address_line_1,
            addressLine2: customer.company.address_line_2,
            city: customer.company.city,
            state: customer.company.state,
            country: customer.company.country,
            postalCode: customer.company.postal_code,
            employeeCount: customer.company.employee_count,
          }
        : null,
      products: activeSubscriptions.map((subscription) => ({
        productName: subscription.product?.name ?? "Unknown",
        productSlug: subscription.product?.slug ?? "",
        planName: subscription.plan?.name ?? "Unknown",
        status: subscription.status,
        renewalDate: subscription.renewal_date,
      })),
      mrr: roundCurrency(
        activeSubscriptions.reduce(
          (sum, subscription) =>
            sum + calculateMonthlyEquivalent(subscription.total_amount, subscription.billing_cycle),
          0,
        ),
      ),
      status: activeSubscriptions.length ? "active" : "inactive",
      lastPaymentAt: successfulPayments[0]?.paid_at ?? null,
    };
  });
}

export async function listAdminProducts() {
  const products = await models.Product.findAll({
    include: buildProductInclude({ activeOnly: false }),
  });

  return products
    .slice()
    .sort((left, right) => left.display_order - right.display_order)
    .map(serializeProduct);
}

export async function updateAdminProduct(productId, payload) {
  const product = await models.Product.findByPk(productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  await product.update({
    name: payload.name ?? product.name,
    description: payload.description ?? product.description,
    icon: payload.icon ?? product.icon,
    status: payload.status ?? product.status,
    display_order: payload.displayOrder ?? product.display_order,
  });

  return serializeProduct(await getProductBySlug(product.slug, { activeOnly: false }));
}

export async function updateAdminPlan(planId, payload) {
  const plan = await models.Plan.findByPk(planId, {
    include: [
      { model: models.PlanFeature, as: "features", required: false },
      { model: models.PlanLimit, as: "limits", required: false },
    ],
  });

  if (!plan) {
    throw new AppError("Plan not found", 404);
  }

  await plan.update({
    name: payload.name ?? plan.name,
    description: payload.description ?? plan.description,
    monthly_price: payload.monthlyPrice ?? plan.monthly_price,
    annual_price: payload.annualPrice ?? plan.annual_price,
    currency: payload.currency ?? plan.currency,
    status: payload.status ?? plan.status,
    is_popular: payload.isPopular ?? plan.is_popular,
    display_order: payload.displayOrder ?? plan.display_order,
  });

  return serializeCatalogPlan(plan);
}

export async function updateAdminAddon(addonId, payload) {
  const addon = await models.Addon.findByPk(addonId);

  if (!addon) {
    throw new AppError("Add-on not found", 404);
  }

  await addon.update({
    name: payload.name ?? addon.name,
    description: payload.description ?? addon.description,
    pricing_type: payload.pricingType ?? addon.pricing_type,
    monthly_price: payload.monthlyPrice ?? addon.monthly_price,
    annual_price: payload.annualPrice ?? addon.annual_price,
    unit_price: payload.unitPrice ?? addon.unit_price,
    currency: payload.currency ?? addon.currency,
    status: payload.status ?? addon.status,
    display_order: payload.displayOrder ?? addon.display_order,
    metadata_json: payload.metadata ?? addon.metadata_json,
  });

  return serializeCatalogAddon(addon);
}

export async function listAdminSubscriptions() {
  const subscriptions = await models.Subscription.findAll({
    include: [
      { model: models.Product, as: "product" },
      { model: models.Plan, as: "plan" },
      { model: models.Company, as: "company" },
      { model: models.CustomerAccount, as: "customerAccount" },
      {
        model: models.SubscriptionAddon,
        as: "addons",
        required: false,
        include: [{ model: models.Addon, as: "addon" }],
      },
    ],
    order: [["renewal_date", "ASC"]],
  });

  return subscriptions.map((subscription) => ({
    id: subscription.id,
    subscriptionNumber: subscription.subscription_number,
    customer: subscription.customerAccount
      ? {
          id: subscription.customerAccount.id,
          username: subscription.customerAccount.username,
          contactName: subscription.customerAccount.contact_name,
          email: subscription.customerAccount.email,
        }
      : null,
    company: subscription.company
      ? {
          id: subscription.company.id,
          name: subscription.company.name,
        }
      : null,
    product: subscription.product
      ? {
          id: subscription.product.id,
          name: subscription.product.name,
          slug: subscription.product.slug,
        }
      : null,
    plan: subscription.plan
      ? {
          id: subscription.plan.id,
          name: subscription.plan.name,
          slug: subscription.plan.slug,
        }
      : null,
    billingCycle: subscription.billing_cycle,
    billingCycleLabel: resolveBillingCycle(subscription.billing_cycle).label,
    addOns: (subscription.addons ?? []).map((subscriptionAddon) => ({
      id: subscriptionAddon.id,
      name: subscriptionAddon.addon?.name ?? "Unknown",
      quantity: toNumber(subscriptionAddon.quantity),
      totalPrice: toNumber(subscriptionAddon.total_price),
    })),
    amount: toNumber(subscription.total_amount),
    status: subscription.status,
    startDate: subscription.start_date,
    endDate: subscription.end_date,
    renewalDate: subscription.renewal_date,
  }));
}

export async function listAdminPayments() {
  const payments = await models.Payment.findAll({
    include: [
      { model: models.CustomerAccount, as: "customerAccount" },
      { model: models.Product, as: "product" },
      { model: models.Subscription, as: "subscription", required: false, include: [{ model: models.Plan, as: "plan" }] },
      { model: models.Order, as: "order", required: false },
    ],
    order: [["createdAt", "DESC"]],
  });

  return payments.map((payment) => ({
    id: payment.id,
    paymentNumber: payment.payment_number,
    orderNumber: payment.order?.order_number ?? null,
    customer: payment.customerAccount
      ? {
          id: payment.customerAccount.id,
          username: payment.customerAccount.username,
          contactName: payment.customerAccount.contact_name,
        }
      : null,
    product: payment.product
      ? {
          id: payment.product.id,
          name: payment.product.name,
          slug: payment.product.slug,
        }
      : null,
    plan: payment.subscription?.plan
      ? {
          id: payment.subscription.plan.id,
          name: payment.subscription.plan.name,
          slug: payment.subscription.plan.slug,
        }
      : null,
    amount: toNumber(payment.amount),
    currency: payment.currency,
    gatewayProvider: payment.gateway_provider,
    gatewayTransactionId: payment.gateway_transaction_id,
    status: payment.status,
    paidAt: payment.paid_at,
    createdAt: payment.createdAt,
  }));
}

export async function listAdminInvoices() {
  const invoices = await models.Invoice.findAll({
    include: [
      { model: models.CustomerAccount, as: "customerAccount" },
      { model: models.Product, as: "product" },
      { model: models.Plan, as: "plan" },
    ],
    order: [["issued_at", "DESC"]],
  });

  return invoices.map((invoice) => ({
    id: invoice.id,
    invoiceNumber: invoice.invoice_number,
    customer: invoice.customerAccount
      ? {
          id: invoice.customerAccount.id,
          username: invoice.customerAccount.username,
          contactName: invoice.customerAccount.contact_name,
        }
      : null,
    product: invoice.product
      ? {
          id: invoice.product.id,
          name: invoice.product.name,
          slug: invoice.product.slug,
        }
      : null,
    plan: invoice.plan
      ? {
          id: invoice.plan.id,
          name: invoice.plan.name,
          slug: invoice.plan.slug,
        }
      : null,
    billingPeriodStart: invoice.billing_period_start,
    billingPeriodEnd: invoice.billing_period_end,
    subtotalAmount: toNumber(invoice.subtotal_amount),
    addonAmount: toNumber(invoice.addon_amount),
    discountAmount: toNumber(invoice.discount_amount),
    taxAmount: toNumber(invoice.tax_amount),
    totalAmount: toNumber(invoice.total_amount),
    currency: invoice.currency,
    status: invoice.status,
    issuedAt: invoice.issued_at,
  }));
}

export async function listAdminTaxSettings() {
  const taxSettings = await models.TaxSetting.findAll({
    order: [["id", "ASC"]],
  });

  return taxSettings.map((taxSetting) => ({
    id: taxSetting.id,
    taxName: taxSetting.tax_name,
    taxRate: toNumber(taxSetting.tax_rate),
    gstin: taxSetting.gstin,
    sac: taxSetting.sac,
    isEnabled: Boolean(taxSetting.is_enabled),
    isInclusive: Boolean(taxSetting.is_inclusive),
  }));
}

export async function updateAdminTaxSetting(taxSettingId, payload) {
  const taxSetting = await models.TaxSetting.findByPk(taxSettingId);

  if (!taxSetting) {
    throw new AppError("Tax setting not found", 404);
  }

  await taxSetting.update({
    tax_name: payload.taxName ?? taxSetting.tax_name,
    tax_rate: payload.taxRate ?? taxSetting.tax_rate,
    gstin: payload.gstin ?? taxSetting.gstin,
    sac: payload.sac ?? taxSetting.sac,
    is_enabled: payload.isEnabled ?? taxSetting.is_enabled,
    is_inclusive: payload.isInclusive ?? taxSetting.is_inclusive,
  });

  return {
    id: taxSetting.id,
    taxName: taxSetting.tax_name,
    taxRate: toNumber(taxSetting.tax_rate),
    gstin: taxSetting.gstin,
    sac: taxSetting.sac,
    isEnabled: Boolean(taxSetting.is_enabled),
    isInclusive: Boolean(taxSetting.is_inclusive),
  };
}
