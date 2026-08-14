import crypto from "crypto";
import { Op } from "sequelize";
import { pricingPlansSeed } from "../../../shared/cms/index.js";
import { models, sequelize } from "../config/database.js";
import { recordCouponRedemption, validateCouponForCheckout } from "./coupon.service.js";
import { sendSubscriptionPaymentEmail } from "./mail.service.js";
import { AppError } from "../utils/AppError.js";

export const GST_RATE_PERCENT = 18;
export const BASIC_SETUP_CHARGE_PER_EMPLOYEE = 150;

export const BILLING_CYCLE_META = {
  monthly: {
    label: "Monthly",
    months: 1,
  },
  "half-yearly": {
    label: "6 Months",
    months: 6,
  },
  yearly: {
    label: "1 Year",
    months: 12,
  },
};

const CHECKOUT_ADDONS = new Map([
  [
    "geo-tracking",
    {
      id: "geo-tracking",
      name: "Geo Tracking",
      description: "Location-aware attendance tracking for field and branch teams.",
      price: 5,
      pricingType: "per-employee-month",
    },
  ],
  [
    "mobile-app",
    {
      id: "mobile-app",
      name: "Mobile App Access",
      description: "Employee self-service, attendance, leave and profile access on mobile.",
      price: 7,
      pricingType: "per-employee-month",
    },
  ],
  [
    "whatsapp-integration",
    {
      id: "whatsapp-integration",
      name: "WhatsApp Integration",
      description: "Send attendance, leave, payroll and HR notifications on WhatsApp.",
      price: 1499,
      pricingType: "per-cycle",
    },
  ],
  [
    "biometric-device",
    {
      id: "biometric-device",
      name: "Biometric Device Setup",
      description: "Device integration and attendance sync setup for biometric machines.",
      price: 2499,
      pricingType: "per-cycle",
    },
  ],
  [
    "custom-development",
    {
      id: "custom-development",
      name: "Custom Development",
      description: "Custom workflow, report or approval logic for your HR process.",
      price: 4999,
      pricingType: "per-cycle",
    },
  ],
]);

function roundCurrency(value) {
  return Number(Number(value).toFixed(2));
}

function buildReferenceCode() {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = crypto.randomUUID().slice(0, 8).toUpperCase();
  return `ALT-SUB-${datePart}-${randomPart}`;
}

function addMonths(date, months) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

function getDaysUntil(date) {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function resolveBillingCycle(billingCycle) {
  const resolved = BILLING_CYCLE_META[billingCycle];

  if (!resolved) {
    throw new AppError("Unsupported billing cycle", 400);
  }

  return resolved;
}

function normalizeSelectedAddOns(selectedAddOns, employeeCount, billingCycleMonths) {
  if (!Array.isArray(selectedAddOns)) {
    return [];
  }

  const selectedIds = new Set();

  return selectedAddOns.reduce((addons, selectedAddon) => {
    const addonId = selectedAddon?.id;
    const addon = CHECKOUT_ADDONS.get(addonId);

    if (!addon || selectedIds.has(addon.id)) {
      return addons;
    }

    selectedIds.add(addon.id);

    const total =
      addon.pricingType === "per-employee-month"
        ? addon.price * employeeCount * billingCycleMonths
        : addon.price;

    addons.push({
      ...addon,
      total: roundCurrency(total),
    });

    return addons;
  }, []);
}

function calculateSetupCharge(planSlug, employeeCount) {
  if (planSlug !== "basic") {
    return {
      label: "Setup charges",
      ratePerEmployee: BASIC_SETUP_CHARGE_PER_EMPLOYEE,
      employeeCount,
      total: 0,
    };
  }

  return {
    label: "Basic setup charges",
    ratePerEmployee: BASIC_SETUP_CHARGE_PER_EMPLOYEE,
    employeeCount,
    total: roundCurrency(employeeCount * BASIC_SETUP_CHARGE_PER_EMPLOYEE),
  };
}

function serializeFallbackPlan(plan) {
  return {
    slug: plan.slug,
    name: plan.name,
    currency: plan.currency ?? "INR",
    monthlyPrice: Number(plan.monthlyPrice ?? 0),
    yearlyPrice:
      plan.yearlyPrice === null || plan.yearlyPrice === undefined ? null : Number(plan.yearlyPrice),
  };
}

async function resolvePlan(planSlug, transaction = null) {
  const dbPlan = await models.PricingPlan.findOne({
    where: {
      slug: planSlug,
      is_active: true,
    },
    transaction,
  });

  if (dbPlan) {
    return {
      slug: dbPlan.slug,
      name: dbPlan.name,
      currency: dbPlan.currency ?? "INR",
      monthlyPrice: Number(dbPlan.monthly_price ?? 0),
      yearlyPrice: dbPlan.yearly_price === null ? null : Number(dbPlan.yearly_price),
    };
  }

  const seedPlan = pricingPlansSeed.find((entry) => entry.slug === planSlug);

  if (seedPlan) {
    return serializeFallbackPlan(seedPlan);
  }

  throw new AppError("Selected pricing plan was not found", 404);
}

export function calculateSubscriptionAmounts({
  monthlyPrice,
  yearlyPrice,
  employeeCount,
  billingCycle,
  selectedAddOns = [],
  planSlug,
  couponDiscountAmount = 0,
  coupon = null,
}) {
  const cycle = resolveBillingCycle(billingCycle);
  const planSubtotal =
    billingCycle === "yearly" && yearlyPrice !== null
      ? roundCurrency(yearlyPrice * employeeCount)
      : roundCurrency(monthlyPrice * employeeCount * cycle.months);
  const selectedAddonDetails = normalizeSelectedAddOns(selectedAddOns, employeeCount, cycle.months);
  const addonSubtotal = roundCurrency(
    selectedAddonDetails.reduce((sum, addon) => sum + addon.total, 0),
  );
  const setupCharge = calculateSetupCharge(planSlug, employeeCount);
  const subtotal = roundCurrency(planSubtotal + addonSubtotal + setupCharge.total);
  const discountAmount = roundCurrency(Math.min(Math.max(0, couponDiscountAmount), subtotal));
  const taxableAmount = roundCurrency(Math.max(0, subtotal - discountAmount));
  const gstAmount = roundCurrency(taxableAmount * (GST_RATE_PERCENT / 100));
  const totalAmount = roundCurrency(taxableAmount + gstAmount);

  return {
    billingCycleLabel: cycle.label,
    billingCycleMonths: cycle.months,
    pricePerEmployee: roundCurrency(monthlyPrice),
    planSubtotalAmount: planSubtotal,
    addOnSubtotalAmount: addonSubtotal,
    setupCharge,
    subtotalAmount: subtotal,
    discountAmount,
    taxableAmount,
    gstRate: GST_RATE_PERCENT,
    gstAmount,
    totalAmount,
    selectedAddOns: selectedAddonDetails,
    coupon,
  };
}

async function buildSubscriptionPurchasePricing(
  payload,
  customerAccount = null,
  transaction = null,
  lockCoupon = false,
) {
  const plan = await resolvePlan(payload.planSlug, transaction);
  const baseAmounts = calculateSubscriptionAmounts({
    monthlyPrice: plan.monthlyPrice,
    yearlyPrice: plan.yearlyPrice,
    employeeCount: payload.employeeCount,
    billingCycle: payload.billingCycle,
    selectedAddOns: payload.extraData?.selectedAddOns ?? payload.selectedAddOns,
    planSlug: plan.slug,
  });
  const coupon = await validateCouponForCheckout(
    {
      couponCode: payload.couponCode,
      productSlug: "hrms",
      planSlug: plan.slug,
      billingCycle: payload.billingCycle,
      lifecycleType: "new",
      planAmount: baseAmounts.planSubtotalAmount + baseAmounts.setupCharge.total,
      addonAmount: baseAmounts.addOnSubtotalAmount,
      subtotalAmount: baseAmounts.subtotalAmount,
      customerAccount,
    },
    { transaction, lock: lockCoupon },
  );
  const amounts = calculateSubscriptionAmounts({
    monthlyPrice: plan.monthlyPrice,
    yearlyPrice: plan.yearlyPrice,
    employeeCount: payload.employeeCount,
    billingCycle: payload.billingCycle,
    selectedAddOns: payload.extraData?.selectedAddOns ?? payload.selectedAddOns,
    planSlug: plan.slug,
    couponDiscountAmount: coupon?.discountAmount ?? 0,
    coupon,
  });

  return { plan, amounts };
}

export async function previewSubscriptionPurchaseCoupon(payload, customerAccount = null) {
  const { amounts } = await buildSubscriptionPurchasePricing(
    {
      ...payload,
      extraData: {
        selectedAddOns: payload.selectedAddOns ?? [],
      },
    },
    customerAccount,
  );

  if (!amounts.coupon) {
    throw new AppError("Coupon code not found.", 404);
  }

  return {
    code: amounts.coupon.code,
    name: amounts.coupon.name,
    description: amounts.coupon.description,
    discountType: amounts.coupon.discountType,
    discountValue: amounts.coupon.discountValue,
    maximumDiscount: amounts.coupon.maximumDiscount,
    appliesToAmount: amounts.coupon.appliesToAmount,
    discountAmount: amounts.discountAmount,
    taxableAmount: amounts.taxableAmount,
    gstAmount: amounts.gstAmount,
    totalAmount: amounts.totalAmount,
  };
}

export function serializeSubscriptionPurchase(record) {
  const billingCycle = resolveBillingCycle(record.billing_cycle);
  const renewalDate = new Date(record.renewal_due_at);

  return {
    id: record.id,
    referenceCode: record.reference_code,
    companyName: record.company_name,
    contactName: record.contact_name,
    email: record.email,
    phone: record.phone,
    planSlug: record.plan_slug,
    planName: record.plan_name,
    employeeCount: record.employee_count,
    billingCycle: record.billing_cycle,
    billingCycleLabel: billingCycle.label,
    billingCycleMonths: record.billing_cycle_months,
    paymentMethod: record.payment_method,
    pricePerEmployee: Number(record.price_per_employee),
    subtotalAmount: Number(record.subtotal_amount),
    gstRate: Number(record.gst_rate),
    gstAmount: Number(record.gst_amount),
    totalAmount: Number(record.total_amount),
    currency: record.currency,
    paymentStatus: record.payment_status,
    subscriptionStatus: record.subscription_status,
    sourcePage: record.source_page,
    notes: record.notes,
    purchasedAt: record.purchased_at,
    renewalDueAt: record.renewal_due_at,
    daysUntilRenewal: getDaysUntil(renewalDate),
    extraData: record.extra_data_json ?? {},
  };
}

export async function createSubscriptionPurchase(payload, customerAccount = null) {
  return sequelize.transaction(async (transaction) => {
    const { plan, amounts } = await buildSubscriptionPurchasePricing(
      payload,
      customerAccount,
      transaction,
      true,
    );
    const purchasedAt = new Date();
    const renewalDueAt = addMonths(purchasedAt, amounts.billingCycleMonths);
    const extraData = {
      ...(payload.extraData ?? {}),
      selectedAddOns: amounts.selectedAddOns,
      planSubtotal: amounts.planSubtotalAmount,
      addOnSubtotal: amounts.addOnSubtotalAmount,
      setupCharge: amounts.setupCharge,
      coupon: amounts.coupon
        ? {
            code: amounts.coupon.code,
            name: amounts.coupon.name,
            discountType: amounts.coupon.discountType,
            discountValue: amounts.coupon.discountValue,
            discountAmount: amounts.discountAmount,
            taxableAmount: amounts.taxableAmount,
          }
        : null,
      originalSubtotal: amounts.subtotalAmount,
      discountAmount: amounts.discountAmount,
      taxableAmount: amounts.taxableAmount,
      ...(customerAccount
        ? {
            customerAccountId: customerAccount.id,
            customerUsername: customerAccount.username,
          }
        : {}),
    };

    const purchase = await models.SubscriptionPurchase.create(
      {
        reference_code: buildReferenceCode(),
        company_name: payload.companyName ?? customerAccount?.company_name,
        contact_name: payload.contactName ?? customerAccount?.contact_name,
        email: payload.email ?? customerAccount?.email,
        phone: payload.phone ?? customerAccount?.phone ?? null,
        plan_slug: plan.slug,
        plan_name: plan.name,
        employee_count: payload.employeeCount,
        billing_cycle: payload.billingCycle,
        billing_cycle_months: amounts.billingCycleMonths,
        payment_method: payload.paymentMethod ?? "manual",
        price_per_employee: amounts.pricePerEmployee,
        subtotal_amount: amounts.subtotalAmount,
        gst_rate: amounts.gstRate,
        gst_amount: amounts.gstAmount,
        total_amount: amounts.totalAmount,
        currency: plan.currency ?? "INR",
        payment_status: "paid",
        subscription_status: "active",
        source_page: payload.sourcePage ?? null,
        notes: payload.notes ?? null,
        purchased_at: purchasedAt,
        renewal_due_at: renewalDueAt,
        extra_data_json: extraData,
      },
      { transaction },
    );

    if (amounts.coupon) {
      await recordCouponRedemption({
        coupon: amounts.coupon.coupon,
        customerAccount,
        subscriptionPurchaseId: purchase.id,
        productSlug: "hrms",
        planSlug: plan.slug,
        originalAmount: amounts.subtotalAmount,
        discountAmount: amounts.discountAmount,
        finalAmount: amounts.totalAmount,
        transaction,
      });
    }

    const serializedPurchase = serializeSubscriptionPurchase(purchase);

    void sendSubscriptionPaymentEmail({
      email: serializedPurchase.email,
      contactName: serializedPurchase.contactName,
      companyName: serializedPurchase.companyName,
      productName: "HRMS",
      referenceCode: serializedPurchase.referenceCode,
      planName: serializedPurchase.planName,
      billingCycleLabel: serializedPurchase.billingCycleLabel,
      employeeCount: serializedPurchase.employeeCount,
      subtotalAmount: serializedPurchase.subtotalAmount,
      discountAmount: serializedPurchase.extraData?.discountAmount ?? 0,
      couponCode: serializedPurchase.extraData?.coupon?.code ?? null,
      taxAmount: serializedPurchase.gstAmount,
      totalAmount: serializedPurchase.totalAmount,
      renewalDate: serializedPurchase.renewalDueAt,
    }).catch((error) => {
      console.error("Failed to send subscription email", error);
    });

    return serializedPurchase;
  });
}

export async function listSubscriptionPurchases() {
  const purchases = await models.SubscriptionPurchase.findAll({
    order: [["purchased_at", "DESC"]],
  });

  return purchases.map(serializeSubscriptionPurchase);
}

export async function getSubscriptionPurchaseById(id) {
  const purchase = await models.SubscriptionPurchase.findByPk(id);

  if (!purchase) {
    throw new AppError("Subscription purchase not found", 404);
  }

  return serializeSubscriptionPurchase(purchase);
}

export async function getSubscriptionPurchaseStats() {
  const now = new Date();
  const inThirtyDays = addMonths(now, 1);
  const [totalSubscriptionPurchases, activeSubscriptions, renewalsDueSoon, recentSubscriptions] =
    await Promise.all([
      models.SubscriptionPurchase.count(),
      models.SubscriptionPurchase.count({
        where: {
          subscription_status: "active",
        },
      }),
      models.SubscriptionPurchase.count({
        where: {
          subscription_status: "active",
          renewal_due_at: {
            [Op.between]: [now, inThirtyDays],
          },
        },
      }),
      models.SubscriptionPurchase.findAll({
        limit: 5,
        order: [["purchased_at", "DESC"]],
      }),
    ]);

  return {
    totalSubscriptionPurchases,
    activeSubscriptions,
    renewalsDueSoon,
    recentSubscriptions: recentSubscriptions.map(serializeSubscriptionPurchase),
  };
}
