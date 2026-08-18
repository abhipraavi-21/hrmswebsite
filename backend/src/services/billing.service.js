import crypto from "crypto";
import { Op } from "sequelize";
import { models, sequelize } from "../config/database.js";
import {
  createRazorpayOrder,
  getRazorpayKeyId,
  verifyRazorpaySignature,
} from "./razorpay.service.js";
import { AppError } from "../utils/AppError.js";

export const BILLING_CYCLE_META = {
  monthly: {
    label: "Monthly",
    months: 1,
    discountPercent: 0,
  },
  semiannual: {
    label: "6 Months",
    months: 6,
    discountPercent: 0,
  },
  annual: {
    label: "1 Year",
    months: 12,
    discountPercent: 0,
  },
  biennial: {
    label: "2 Years",
    months: 24,
    discountPercent: 10,
  },
  triennial: {
    label: "3 Years",
    months: 36,
    discountPercent: 20,
  },
};

const ACTIVE_STATUS = "active";
const HRMS_PRODUCT_SLUG = "hrms";
const HRMS_SETUP_CHARGE_PER_EMPLOYEE = 150;
const HRMS_PLAN_META = {
  starter: {
    name: "Basic",
    description: "Core HR workflows for smaller teams that want a compact digital starting point.",
    monthlyRate: 21,
  },
  professional: {
    name: "Professional",
    description:
      "Broader HR operations with payroll, documents, compliance, assets and richer workflows.",
    monthlyRate: 36,
  },
  enterprise: {
    name: "Premium",
    description: "Full HR coverage for larger rollouts that need the broadest operational depth.",
    monthlyRate: 53,
  },
};
const HRMS_VISIBLE_ADDON_CODES = new Set([
  "GEO_ATTENDANCE",
  "WHATSAPP_ALERTS",
  "BIOMETRIC_MACHINE_SETUP",
  "ASSET_MANAGEMENT_ADDON",
  "RECRUITMENT_MODULE",
]);
const HRMS_ADDON_META = {
  GEO_ATTENDANCE: {
    name: "Geo Tracking",
    description: "Track attendance and location activity for each employee across the full subscription term.",
    pricingType: "PER_EMPLOYEE",
    unitPrice: 50,
    metadata: {
      featureCode: "GEO_ATTENDANCE",
      pricingSummary: "₹50 per user / month",
      minimumLabel: "Minimum 5 users required",
      details: [
        "Billing starts from a minimum of 5 users.",
        "Best fit for field teams, site teams and mobile attendance flows.",
      ],
      quantityLabel: "Users",
      minimumQuantity: 5,
      minimumChargeQuantity: 5,
      usesEmployeeCount: true,
      showQuantityInput: false,
      calculationMode: "per_employee_minimum",
    },
  },
  WHATSAPP_ALERTS: {
    name: "WhatsApp Alerts",
    description: "Send attendance, leave, payroll and HR notifications on WhatsApp.",
    pricingType: "PER_USER",
    unitPrice: 70,
    metadata: {
      featureCode: "WHATSAPP_ALERTS",
      pricingSummary: "₹70 per user / month",
      minimumLabel: "Based on selected users",
      details: [
        "Charges scale according to the number of users selected.",
        "Useful for attendance, leave, payroll and HR notification updates.",
      ],
      quantityLabel: "Users",
      minimumQuantity: 1,
      defaultToEmployeeCount: true,
      showQuantityInput: true,
      calculationMode: "per_selected_quantity",
    },
  },
  BIOMETRIC_MACHINE_SETUP: {
    name: "Biometric Machine Setup",
    description: "Connect biometric machines and sync attendance setup across sites.",
    pricingType: "ONE_TIME",
    unitPrice: 2000,
    metadata: {
      featureCode: "BIOMETRIC_MACHINE_SETUP",
      pricingSummary: "₹2,000 per machine",
      minimumLabel: "First machine included",
      details: [
        "Setup charges apply from the 2nd biometric machine onward.",
        "A clean option when attendance hardware needs to be rolled out gradually.",
      ],
      quantityLabel: "Machines",
      minimumQuantity: 1,
      defaultQuantity: 2,
      includedQuantity: 1,
      showQuantityInput: true,
      calculationMode: "one_time_after_included",
    },
  },
  ASSET_MANAGEMENT_ADDON: {
    name: "Asset Management",
    description: "Extend HRMS with asset workflows, handovers and tracking visibility.",
    pricingType: "PER_EMPLOYEE",
    unitPrice: 1.5,
    metadata: {
      featureCode: "ASSET_MANAGEMENT",
      pricingSummary: "₹1.50 per employee / month",
      minimumLabel: "50 assets included",
      details: [
        "Asset Management starts with a minimum of 100 assets.",
        "Additional assets are charged at ₹50 per asset.",
      ],
      quantityLabel: "Assets",
      minimumQuantity: 100,
      defaultQuantity: 100,
      includedQuantity: 50,
      extraUnitPrice: 50,
      showQuantityInput: true,
      calculationMode: "asset_management_combo",
      limitCode: "ASSETS",
      limitMultiplier: 1,
    },
  },
  RECRUITMENT_MODULE: {
    name: "Recruitment Module",
    description: "Manage hiring activity and recruitment demand from the same checkout flow.",
    pricingType: "ONE_TIME",
    unitPrice: 1000,
    metadata: {
      featureCode: "RECRUITMENT_MODULE",
      pricingSummary: "₹1,000 per 100 applicants",
      minimumLabel: "10 applicants included",
      details: [
        "The first 10 applicants are included.",
        "After that, every additional 100 applicants is charged at ₹1,000.",
      ],
      quantityLabel: "Applicants",
      minimumQuantity: 10,
      defaultQuantity: 110,
      includedQuantity: 10,
      stepQuantity: 100,
      showQuantityInput: true,
      calculationMode: "recruitment_blocks",
      limitCode: "APPLICANTS",
      limitMultiplier: 1,
    },
  },
};

function roundCurrency(value) {
  return Number(Number(value ?? 0).toFixed(2));
}

function toNumber(value) {
  return value === null || value === undefined ? 0 : Number(value);
}

function toCurrencySubunits(value) {
  return Math.round(toNumber(value) * 100);
}

function normalizeAddonMetadata(metadata) {
  if (!metadata) {
    return {};
  }

  if (typeof metadata === "string") {
    try {
      const parsed = JSON.parse(metadata);
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    } catch {
      return {};
    }
  }

  return typeof metadata === "object" && !Array.isArray(metadata) ? metadata : {};
}

function normalizeLookupValue(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function normalizeEmployeeCount(value) {
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? Math.max(0, Math.round(parsedValue)) : 0;
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

function isHrmsProduct(productOrSlug) {
  if (!productOrSlug) {
    return false;
  }

  if (typeof productOrSlug === "string") {
    return normalizeLookupValue(productOrSlug) === HRMS_PRODUCT_SLUG;
  }

  return normalizeLookupValue(productOrSlug.slug ?? productOrSlug.code ?? productOrSlug.name) === HRMS_PRODUCT_SLUG;
}

function getHrmsPlanMeta(plan) {
  const planKey = normalizeLookupValue(plan?.slug ?? plan?.name ?? plan?.code);

  return HRMS_PLAN_META[planKey] ?? HRMS_PLAN_META.starter;
}

function getHrmsAddonMeta(addon) {
  return HRMS_ADDON_META[addon?.code] ?? null;
}

function getAddonMetadata(addon, product = null) {
  const baseMetadata = normalizeAddonMetadata(addon?.metadata_json);
  const hrmsAddonMeta = isHrmsProduct(product) ? getHrmsAddonMeta(addon) : null;

  if (!hrmsAddonMeta?.metadata) {
    return baseMetadata;
  }

  return {
    ...baseMetadata,
    ...hrmsAddonMeta.metadata,
  };
}

function getVisibleProductAddons(product) {
  const addons = product?.addons ?? [];

  if (!isHrmsProduct(product)) {
    return addons;
  }

  return addons.filter((addon) => HRMS_VISIBLE_ADDON_CODES.has(addon.code));
}

function getAddonPricingConfig(addon, product = null) {
  const hrmsAddonMeta = isHrmsProduct(product) ? getHrmsAddonMeta(addon) : null;
  const metadata = getAddonMetadata(addon, product);

  if (hrmsAddonMeta) {
    return {
      name: hrmsAddonMeta.name,
      description: hrmsAddonMeta.description,
      pricingType: hrmsAddonMeta.pricingType,
      unitPrice: hrmsAddonMeta.unitPrice,
      monthlyPrice: null,
      annualPrice: null,
      metadata,
    };
  }

  return {
    name: addon.name,
    description: addon.description,
    pricingType: addon.pricing_type,
    unitPrice:
      addon.unit_price === null || addon.unit_price === undefined ? null : Number(addon.unit_price),
    monthlyPrice:
      addon.monthly_price === null || addon.monthly_price === undefined
        ? null
        : Number(addon.monthly_price),
    annualPrice:
      addon.annual_price === null || addon.annual_price === undefined
        ? null
        : Number(addon.annual_price),
    metadata,
  };
}

function getAddonConfigNumber(metadata, key, fallback = 0) {
  const parsedValue = Number(metadata?.[key]);
  return Number.isFinite(parsedValue) ? parsedValue : fallback;
}

function normalizeAddonQuantity(quantity, metadata = {}) {
  const parsedValue = Number(quantity);
  const defaultQuantity = Math.max(1, Math.round(getAddonConfigNumber(metadata, "defaultQuantity", 1)));
  const minimumQuantity = Math.max(1, Math.round(getAddonConfigNumber(metadata, "minimumQuantity", 1)));
  const normalizedQuantity = Number.isFinite(parsedValue) ? Math.max(0, Math.round(parsedValue)) : 0;

  return Math.max(minimumQuantity, normalizedQuantity || defaultQuantity);
}

function buildHrmsAddonCalculation(addon, pricingConfig, quantity, billingCycleMeta, employeeCount) {
  const metadata = pricingConfig.metadata ?? {};
  const calculationMode = metadata.calculationMode;

  if (!calculationMode) {
    return null;
  }

  const normalizedEmployeeCount = normalizeEmployeeCount(employeeCount);
  const selectedQuantity = normalizeAddonQuantity(quantity, metadata);
  const unitPrice = roundCurrency(toNumber(pricingConfig.unitPrice));
  const discountPercent = (billingCycleMeta.discountPercent ?? 0) / 100;

  if (calculationMode === "per_employee_minimum") {
    const minimumChargeQuantity = Math.max(
      1,
      Math.round(getAddonConfigNumber(metadata, "minimumChargeQuantity", 1)),
    );
    const effectiveQuantity = Math.max(normalizedEmployeeCount, minimumChargeQuantity);
    const rawTotalPrice = roundCurrency(unitPrice * effectiveQuantity * billingCycleMeta.months);
    const billingCycleDiscountAmount = roundCurrency(rawTotalPrice * discountPercent);

    return {
      quantity: effectiveQuantity,
      unitPrice,
      rawTotalPrice,
      billingCycleDiscountAmount,
      metadata: {
        ...metadata,
        selectedQuantity,
        chargeableQuantity: effectiveQuantity,
      },
    };
  }

  if (calculationMode === "per_selected_quantity") {
    const rawTotalPrice = roundCurrency(unitPrice * selectedQuantity * billingCycleMeta.months);
    const billingCycleDiscountAmount = roundCurrency(rawTotalPrice * discountPercent);

    return {
      quantity: selectedQuantity,
      unitPrice,
      rawTotalPrice,
      billingCycleDiscountAmount,
      metadata: {
        ...metadata,
        selectedQuantity,
        chargeableQuantity: selectedQuantity,
      },
    };
  }

  if (calculationMode === "one_time_after_included") {
    const includedQuantity = Math.max(0, Math.round(getAddonConfigNumber(metadata, "includedQuantity", 0)));
    const chargeableQuantity = Math.max(0, selectedQuantity - includedQuantity);
    const rawTotalPrice = roundCurrency(unitPrice * chargeableQuantity);

    return {
      quantity: selectedQuantity,
      unitPrice,
      rawTotalPrice,
      billingCycleDiscountAmount: 0,
      metadata: {
        ...metadata,
        selectedQuantity,
        includedQuantity,
        chargeableQuantity,
      },
    };
  }

  if (calculationMode === "asset_management_combo") {
    const includedQuantity = Math.max(0, Math.round(getAddonConfigNumber(metadata, "includedQuantity", 50)));
    const extraUnitPrice = roundCurrency(getAddonConfigNumber(metadata, "extraUnitPrice", 0));
    const recurringRawTotal = roundCurrency(unitPrice * normalizedEmployeeCount * billingCycleMeta.months);
    const chargeableQuantity = Math.max(0, selectedQuantity - includedQuantity);
    const extraAssetCharge = roundCurrency(extraUnitPrice * chargeableQuantity);
    const rawTotalPrice = roundCurrency(recurringRawTotal + extraAssetCharge);
    const billingCycleDiscountAmount = roundCurrency(recurringRawTotal * discountPercent);

    return {
      quantity: selectedQuantity,
      unitPrice,
      rawTotalPrice,
      billingCycleDiscountAmount,
      metadata: {
        ...metadata,
        selectedQuantity,
        includedQuantity,
        chargeableQuantity,
        extraAssetCharge,
        recurringRawTotal,
      },
    };
  }

  if (calculationMode === "recruitment_blocks") {
    const includedQuantity = Math.max(0, Math.round(getAddonConfigNumber(metadata, "includedQuantity", 10)));
    const stepQuantity = Math.max(1, Math.round(getAddonConfigNumber(metadata, "stepQuantity", 100)));
    const extraApplicants = Math.max(0, selectedQuantity - includedQuantity);
    const chargeableQuantity = Math.ceil(extraApplicants / stepQuantity);
    const rawTotalPrice = roundCurrency(unitPrice * chargeableQuantity);

    return {
      quantity: selectedQuantity,
      unitPrice,
      rawTotalPrice,
      billingCycleDiscountAmount: 0,
      metadata: {
        ...metadata,
        selectedQuantity,
        includedQuantity,
        chargeableQuantity,
        extraApplicants,
        stepQuantity,
      },
    };
  }

  return null;
}

function getCyclePrice(monthlyPrice, annualPrice, billingCycle) {
  const monthly = toNumber(monthlyPrice);
  const annual = annualPrice === null || annualPrice === undefined ? null : toNumber(annualPrice);

  if (billingCycle === "annual") {
    return roundCurrency(annual ?? monthly * 12);
  }

  if (billingCycle === "biennial") {
    return roundCurrency((annual ?? monthly * 12) * 2);
  }

  if (billingCycle === "triennial") {
    return roundCurrency((annual ?? monthly * 12) * 3);
  }

  if (billingCycle === "semiannual") {
    return roundCurrency(monthly * 6);
  }

  return roundCurrency(monthly);
}

function calculatePlanPricing(product, plan, billingCycle, employeeCount) {
  if (!isHrmsProduct(product)) {
    const baseAmount = getCyclePrice(plan.monthly_price, plan.annual_price, billingCycle);

    return {
      pricingModel: "flat",
      employeeCount: null,
      ratePerEmployee: null,
      baseAmountBeforeCycleDiscount: baseAmount,
      billingCycleDiscountPercent: 0,
      billingCycleDiscountAmount: 0,
      baseAmount,
    };
  }

  const cycleMeta = resolveBillingCycle(billingCycle);
  const hrmsPlanMeta = getHrmsPlanMeta(plan);
  const normalizedCount = normalizeEmployeeCount(employeeCount);
  const baseAmountBeforeCycleDiscount = roundCurrency(
    hrmsPlanMeta.monthlyRate * normalizedCount * cycleMeta.months,
  );
  const billingCycleDiscountPercent = cycleMeta.discountPercent ?? 0;
  const billingCycleDiscountAmount = roundCurrency(
    baseAmountBeforeCycleDiscount * (billingCycleDiscountPercent / 100),
  );

  return {
    pricingModel: "per_employee",
    employeeCount: normalizedCount,
    ratePerEmployee: hrmsPlanMeta.monthlyRate,
    baseAmountBeforeCycleDiscount,
    billingCycleDiscountPercent,
    billingCycleDiscountAmount,
    baseAmount: roundCurrency(baseAmountBeforeCycleDiscount - billingCycleDiscountAmount),
  };
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

function serializeCatalogPlan(plan, product = null) {
  const hrmsPlanMeta =
    isHrmsProduct(product) || String(plan?.code ?? "").toUpperCase().startsWith("HRMS_")
      ? getHrmsPlanMeta(plan)
      : null;

  return {
    id: plan.id,
    productId: plan.product_id,
    name: hrmsPlanMeta?.name ?? plan.name,
    code: plan.code,
    slug: plan.slug,
    description: hrmsPlanMeta?.description ?? plan.description,
    currency: plan.currency,
    isPopular: Boolean(plan.is_popular),
    status: plan.status,
    displayOrder: plan.display_order,
    pricingModel: hrmsPlanMeta ? "per_employee" : "flat",
    monthlyRate: hrmsPlanMeta?.monthlyRate ?? null,
    cycleDiscounts: hrmsPlanMeta
      ? {
          annual: BILLING_CYCLE_META.annual.discountPercent,
          biennial: BILLING_CYCLE_META.biennial.discountPercent,
          triennial: BILLING_CYCLE_META.triennial.discountPercent,
        }
      : {},
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

function serializeCatalogAddon(addon, product = null) {
  const pricingConfig = getAddonPricingConfig(addon, product);

  return {
    id: addon.id,
    productId: addon.product_id,
    name: pricingConfig.name,
    code: addon.code,
    description: pricingConfig.description,
    pricingType: pricingConfig.pricingType,
    currency: addon.currency,
    status: addon.status,
    displayOrder: addon.display_order,
    monthlyPrice:
      pricingConfig.monthlyPrice === null || pricingConfig.monthlyPrice === undefined
        ? null
        : getCyclePrice(pricingConfig.monthlyPrice, pricingConfig.annualPrice, "monthly"),
    semiannualPrice:
      pricingConfig.pricingType === "ONE_TIME"
        ? null
        : pricingConfig.monthlyPrice === null || pricingConfig.monthlyPrice === undefined
          ? null
          : getCyclePrice(pricingConfig.monthlyPrice, pricingConfig.annualPrice, "semiannual"),
    annualPrice:
      pricingConfig.pricingType === "ONE_TIME"
        ? null
        : pricingConfig.monthlyPrice === null || pricingConfig.monthlyPrice === undefined
          ? pricingConfig.annualPrice === null || pricingConfig.annualPrice === undefined
            ? null
            : getCyclePrice(pricingConfig.monthlyPrice, pricingConfig.annualPrice, "annual")
          : getCyclePrice(pricingConfig.monthlyPrice, pricingConfig.annualPrice, "annual"),
    unitPrice: pricingConfig.unitPrice,
    metadata: pricingConfig.metadata ?? {},
  };
}

function serializeProduct(product) {
  const visibleAddons = getVisibleProductAddons(product);

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
      .map((plan) => serializeCatalogPlan(plan, product)),
    addons: visibleAddons
      .slice()
      .sort((left, right) => left.display_order - right.display_order)
      .map((addon) => serializeCatalogAddon(addon, product)),
  };
}

function buildEntitlements(plan, subscriptionAddons, product = null) {
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
    const metadata = getAddonMetadata(addon, product);
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
  const entitlements = buildEntitlements(subscription.plan, subscription.addons ?? [], subscription.product);

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
    plan: subscription.plan ? serializeCatalogPlan(subscription.plan, subscription.product) : null,
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
      setupChargeAmount: toNumber(subscription.setup_charge_amount),
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
      addon: subscriptionAddon.addon
        ? serializeCatalogAddon(subscriptionAddon.addon, subscription.product)
        : null,
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
    setupChargeAmount: toNumber(invoice.setup_charge_amount),
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
          name: serializeCatalogPlan(order.plan, order.product).name,
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
    setupChargeAmount: toNumber(order.setup_charge_amount),
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

function calculateAddonLine(addon, quantity, billingCycle, { product = null, employeeCount = 0 } = {}) {
  const pricingConfig = getAddonPricingConfig(addon, product);
  const billingCycleMeta = resolveBillingCycle(billingCycle);
  const pricingType = pricingConfig.pricingType;
  const hrmsAddonCalculation = isHrmsProduct(product)
    ? buildHrmsAddonCalculation(addon, pricingConfig, quantity, billingCycleMeta, employeeCount)
    : null;

  if (hrmsAddonCalculation) {
    return {
      addonId: addon.id,
      code: addon.code,
      name: pricingConfig.name,
      pricingType,
      quantity: hrmsAddonCalculation.quantity,
      unitPrice: roundCurrency(hrmsAddonCalculation.unitPrice),
      rawTotalPrice: roundCurrency(hrmsAddonCalculation.rawTotalPrice),
      billingCycleDiscountAmount: roundCurrency(hrmsAddonCalculation.billingCycleDiscountAmount),
      totalPrice: roundCurrency(
        hrmsAddonCalculation.rawTotalPrice - hrmsAddonCalculation.billingCycleDiscountAmount,
      ),
      metadata: hrmsAddonCalculation.metadata,
    };
  }

  const normalizedQuantity =
    isHrmsProduct(product) && pricingType === "PER_EMPLOYEE"
      ? normalizeEmployeeCount(employeeCount)
      : normalizeAddonQuantity(quantity, pricingConfig.metadata ?? {});
  let unitPrice = 0;
  let rawTotalPrice = 0;
  let billingCycleDiscountAmount = 0;

  if (pricingType === "FLAT_MONTHLY" || pricingType === "FLAT_YEARLY") {
    unitPrice = getCyclePrice(pricingConfig.monthlyPrice, pricingConfig.annualPrice, billingCycle);
    rawTotalPrice = unitPrice;
  } else if (pricingType === "ONE_TIME") {
    unitPrice = toNumber(pricingConfig.unitPrice);
    rawTotalPrice = roundCurrency(unitPrice * normalizedQuantity);
  } else {
    unitPrice = toNumber(pricingConfig.unitPrice);
    rawTotalPrice = roundCurrency(
      unitPrice * normalizedQuantity * getQuantityMultiplier(addon, billingCycleMeta),
    );
  }

  if (pricingType !== "ONE_TIME" && isHrmsProduct(product)) {
    billingCycleDiscountAmount = roundCurrency(
      rawTotalPrice * ((billingCycleMeta.discountPercent ?? 0) / 100),
    );
  }

  return {
    addonId: addon.id,
    code: addon.code,
    name: pricingConfig.name,
    pricingType,
    quantity: normalizedQuantity,
    unitPrice: roundCurrency(unitPrice),
    rawTotalPrice: roundCurrency(rawTotalPrice),
    billingCycleDiscountAmount,
    totalPrice: roundCurrency(rawTotalPrice - billingCycleDiscountAmount),
    metadata: pricingConfig.metadata ?? {},
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

function getSubscriptionEmployeeCount(subscription) {
  return normalizeEmployeeCount(
    subscription?.company?.employee_count ?? subscription?.metadata_json?.employeeCount ?? 0,
  );
}

function getActiveSubscriptionAddonEntry(subscription, addonCode) {
  return (
    (subscription?.addons ?? []).find(
      (subscriptionAddon) =>
        subscriptionAddon.status === ACTIVE_STATUS && subscriptionAddon.addon?.code === addonCode,
    ) ?? null
  );
}

function buildSubscriptionProrationContext(subscription) {
  const dayMs = 1000 * 60 * 60 * 24;
  const now = new Date();
  const startDate = new Date(subscription.start_date ?? now);
  const endDate = new Date(subscription.end_date ?? now);
  const totalMs = Math.max(dayMs, endDate.getTime() - startDate.getTime());
  const remainingMs = Math.max(0, endDate.getTime() - now.getTime());

  if (remainingMs <= 0) {
    throw new AppError("The active subscription has already ended. Start a fresh checkout instead.", 400);
  }

  return {
    now,
    startDate,
    endDate,
    totalDays: Math.max(1, Math.ceil(totalMs / dayMs)),
    remainingDays: Math.max(1, Math.ceil(remainingMs / dayMs)),
    remainingRatio: Number(Math.min(1, Math.max(0, remainingMs / totalMs)).toFixed(6)),
  };
}

async function getCustomerProductSubscription(customerAccount, productId, transaction) {
  if (!customerAccount?.id) {
    return null;
  }

  return models.Subscription.findOne({
    where: {
      customer_account_id: customerAccount.id,
      product_id: productId,
      status: ACTIVE_STATUS,
    },
    include: buildSubscriptionInclude(),
    transaction,
  });
}

function buildEmptyAddonLine(addon, pricingConfig, quantity = 0) {
  return {
    addonId: addon.id,
    code: addon.code,
    name: pricingConfig.name,
    pricingType: pricingConfig.pricingType,
    quantity,
    unitPrice: roundCurrency(toNumber(pricingConfig.unitPrice)),
    rawTotalPrice: 0,
    billingCycleDiscountAmount: 0,
    totalPrice: 0,
    metadata: pricingConfig.metadata ?? {},
  };
}

function buildHrmsAddonUpgradeLines(
  addon,
  targetQuantity,
  billingCycle,
  { product, existingSubscription, currentEmployeeCount, targetEmployeeCount, prorationContext },
) {
  const billingCycleMeta = resolveBillingCycle(billingCycle);
  const pricingConfig = getAddonPricingConfig(addon, product);
  const metadata = pricingConfig.metadata ?? {};
  const currentSubscriptionAddon = getActiveSubscriptionAddonEntry(existingSubscription, addon.code);
  const currentQuantity = currentSubscriptionAddon
    ? normalizeAddonQuantity(currentSubscriptionAddon.quantity, metadata)
    : 0;
  const resolvedTargetQuantity = normalizeAddonQuantity(
    targetQuantity ??
      currentQuantity ??
      Math.max(1, Math.round(getAddonConfigNumber(metadata, "defaultQuantity", 1))),
    metadata,
  );

  if (currentQuantity > 0 && resolvedTargetQuantity < currentQuantity) {
    throw new AppError(
      `${pricingConfig.name} can only be increased through the add-on upgrade flow.`,
      400,
    );
  }

  const targetLine = calculateAddonLine(addon, resolvedTargetQuantity, billingCycle, {
    product,
    employeeCount: targetEmployeeCount,
  });
  const currentLine = currentSubscriptionAddon
    ? calculateAddonLine(addon, currentQuantity, billingCycle, {
        product,
        employeeCount: currentEmployeeCount,
      })
    : buildEmptyAddonLine(addon, pricingConfig, 0);
  const discountPercent = (billingCycleMeta.discountPercent ?? 0) / 100;
  const fullRawDifference = roundCurrency(
    Math.max(0, targetLine.rawTotalPrice - currentLine.rawTotalPrice),
  );
  let rawTotalPrice = 0;
  let billingCycleDiscountAmount = 0;
  let recurringChargeRawTotal = 0;
  let oneTimeChargeRawTotal = 0;

  switch (metadata.calculationMode) {
    case "one_time_after_included":
    case "recruitment_blocks":
      rawTotalPrice = fullRawDifference;
      oneTimeChargeRawTotal = rawTotalPrice;
      break;
    case "asset_management_combo": {
      const targetRecurringRawTotal = toNumber(targetLine.metadata?.recurringRawTotal);
      const currentRecurringRawTotal = toNumber(currentLine.metadata?.recurringRawTotal);
      const recurringFullDifference = roundCurrency(
        Math.max(0, targetRecurringRawTotal - currentRecurringRawTotal),
      );
      recurringChargeRawTotal = roundCurrency(
        recurringFullDifference * prorationContext.remainingRatio,
      );
      billingCycleDiscountAmount = roundCurrency(recurringChargeRawTotal * discountPercent);
      const targetExtraAssetCharge = toNumber(targetLine.metadata?.extraAssetCharge);
      const currentExtraAssetCharge = toNumber(currentLine.metadata?.extraAssetCharge);
      oneTimeChargeRawTotal = roundCurrency(
        Math.max(0, targetExtraAssetCharge - currentExtraAssetCharge),
      );
      rawTotalPrice = roundCurrency(recurringChargeRawTotal + oneTimeChargeRawTotal);
      break;
    }
    default:
      recurringChargeRawTotal = roundCurrency(
        fullRawDifference * prorationContext.remainingRatio,
      );
      rawTotalPrice = recurringChargeRawTotal;
      billingCycleDiscountAmount = roundCurrency(rawTotalPrice * discountPercent);
      break;
  }

  const billedQuantity = Math.max(0, targetLine.quantity - currentLine.quantity);
  const billedLine = {
    addonId: addon.id,
    code: addon.code,
    name: pricingConfig.name,
    pricingType: pricingConfig.pricingType,
    quantity: targetLine.quantity,
    unitPrice: targetLine.unitPrice,
    rawTotalPrice: roundCurrency(rawTotalPrice),
    billingCycleDiscountAmount: roundCurrency(billingCycleDiscountAmount),
    totalPrice: roundCurrency(rawTotalPrice - billingCycleDiscountAmount),
    metadata: {
      ...targetLine.metadata,
      currentQuantity,
      targetQuantity: targetLine.quantity,
      billedQuantity,
      currentEmployeeCount,
      targetEmployeeCount,
      remainingDays: prorationContext.remainingDays,
      remainingRatio: prorationContext.remainingRatio,
      recurringChargeRawTotal: roundCurrency(recurringChargeRawTotal),
      oneTimeChargeRawTotal: roundCurrency(oneTimeChargeRawTotal),
      currentLineTotalPrice: currentLine.totalPrice,
      targetLineTotalPrice: targetLine.totalPrice,
    },
  };

  return {
    billedLine,
    targetLine,
  };
}

function buildHrmsAddonUpgradePreview({
  product,
  plan,
  billingCycle,
  employeeCount,
  addonSelections,
  existingSubscription,
}) {
  if (!existingSubscription) {
    throw new AppError("Login to a customer account with an active subscription to upgrade add-ons.", 401);
  }

  if (existingSubscription.plan_id !== plan.id) {
    throw new AppError("Add-on upgrades must use the current active plan.", 400);
  }

  if (existingSubscription.billing_cycle !== billingCycle) {
    throw new AppError("Add-on upgrades must use the current subscription billing cycle.", 400);
  }

  const currentEmployeeCount = getSubscriptionEmployeeCount(existingSubscription);
  const targetEmployeeCount = normalizeEmployeeCount(employeeCount ?? currentEmployeeCount);

  if (targetEmployeeCount < currentEmployeeCount) {
    throw new AppError("Employee count can only be increased through the add-on upgrade flow.", 400);
  }

  const cycleMeta = resolveBillingCycle(billingCycle);
  const prorationContext = buildSubscriptionProrationContext(existingSubscription);
  const currentPlanPricing = calculatePlanPricing(product, plan, billingCycle, currentEmployeeCount);
  const targetPlanPricing = calculatePlanPricing(product, plan, billingCycle, targetEmployeeCount);
  const baseAmountBeforeCycleDiscount = roundCurrency(
    Math.max(
      0,
      targetPlanPricing.baseAmountBeforeCycleDiscount -
        currentPlanPricing.baseAmountBeforeCycleDiscount,
    ) * prorationContext.remainingRatio,
  );
  const baseBillingCycleDiscountAmount = roundCurrency(
    Math.max(
      0,
      targetPlanPricing.billingCycleDiscountAmount - currentPlanPricing.billingCycleDiscountAmount,
    ) * prorationContext.remainingRatio,
  );
  const baseAmount = roundCurrency(baseAmountBeforeCycleDiscount - baseBillingCycleDiscountAmount);
  const selectedAddonMap = new Map(
    (Array.isArray(addonSelections) ? addonSelections : []).map((selection) => [
      selection.addonId,
      selection.quantity,
    ]),
  );
  const visibleAddons = getVisibleProductAddons(product);
  const targetAddonLines = [];
  const billedAddonLines = [];

  for (const addon of visibleAddons) {
    const currentSubscriptionAddon = getActiveSubscriptionAddonEntry(existingSubscription, addon.code);
    const hasCurrentAddon = Boolean(currentSubscriptionAddon);
    const hasSelection = selectedAddonMap.has(addon.id);

    if (!hasCurrentAddon && !hasSelection) {
      continue;
    }

    const requestedQuantity = hasSelection
      ? selectedAddonMap.get(addon.id)
      : currentSubscriptionAddon?.quantity;
    const { billedLine, targetLine } = buildHrmsAddonUpgradeLines(addon, requestedQuantity, billingCycle, {
      product,
      existingSubscription,
      currentEmployeeCount,
      targetEmployeeCount,
      prorationContext,
    });

    targetAddonLines.push(targetLine);

    if (billedLine.totalPrice > 0 || billedLine.rawTotalPrice > 0) {
      billedAddonLines.push(billedLine);
    }
  }

  const recurringAddonAmountBeforeCycleDiscount = roundCurrency(
    billedAddonLines.reduce(
      (sum, addonLine) => sum + toNumber(addonLine.metadata?.recurringChargeRawTotal ?? 0),
      0,
    ),
  );
  const addonAmountBeforeCycleDiscount = roundCurrency(
    billedAddonLines.reduce((sum, addonLine) => sum + addonLine.rawTotalPrice, 0),
  );
  const addonBillingCycleDiscountAmount = roundCurrency(
    billedAddonLines.reduce(
      (sum, addonLine) => sum + (addonLine.billingCycleDiscountAmount ?? 0),
      0,
    ),
  );
  const addonAmount = roundCurrency(
    billedAddonLines.reduce((sum, addonLine) => sum + addonLine.totalPrice, 0),
  );

  return {
    existingSubscription,
    targetAddonLines,
    billedAddonLines,
    pricing: {
      billingCycle,
      billingCycleLabel: cycleMeta.label,
      billingCycleMonths: cycleMeta.months,
      currency: plan.currency,
      pricingModel: "per_employee",
      employeeCount: targetEmployeeCount,
      currentEmployeeCount,
      targetEmployeeCount,
      additionalEmployeeCount: Math.max(0, targetEmployeeCount - currentEmployeeCount),
      ratePerEmployee: targetPlanPricing.ratePerEmployee,
      baseAmountBeforeCycleDiscount,
      billingCycleDiscountPercent: cycleMeta.discountPercent ?? 0,
      billingCycleDiscountAmount: roundCurrency(
        baseBillingCycleDiscountAmount + addonBillingCycleDiscountAmount,
      ),
      addonAmountBeforeCycleDiscount,
      recurringAddonAmountBeforeCycleDiscount,
      subscriptionAmountBeforeCycleDiscount: roundCurrency(
        baseAmountBeforeCycleDiscount + recurringAddonAmountBeforeCycleDiscount,
      ),
      setupChargeAmount: 0,
      baseAmount,
      addonAmount,
      subtotalAmount: 0,
      discountAmount: 0,
      taxAmount: 0,
      totalAmount: 0,
      taxRate: 0,
      taxName: "Tax",
      isTaxInclusive: false,
      nextRenewalDate: existingSubscription.renewal_date,
      upgradeContext: {
        mode: "addon",
        remainingDays: prorationContext.remainingDays,
        remainingRatio: prorationContext.remainingRatio,
        currentSubscriptionStart: existingSubscription.start_date,
        currentSubscriptionEnd: existingSubscription.end_date,
        currentEmployeeCount,
        targetEmployeeCount,
        additionalEmployeeCount: Math.max(0, targetEmployeeCount - currentEmployeeCount),
      },
    },
  };
}

async function calculateCheckoutPreviewInternal(payload, transaction, customerAccount = null) {
  const product = await getProductBySlug(payload.productSlug, { transaction });
  const plan = await getPlanForProduct(product, payload.planId, transaction);
  const coupon = await getCouponForScope(payload.couponCode, product.id, plan.id, transaction);
  const taxSetting = await getTaxSetting(transaction);
  const cycleMeta = resolveBillingCycle(payload.billingCycle);
  const lifecycleType = payload.lifecycleType ?? null;
  const existingSubscription =
    lifecycleType === "addon"
      ? await getCustomerProductSubscription(customerAccount, product.id, transaction)
      : null;

  const addonSelections = Array.isArray(payload.addonSelections) ? payload.addonSelections : [];
  let addonLines = [];
  let targetAddonLines = [];
  let pricingSnapshot = null;

  if (lifecycleType === "addon" && isHrmsProduct(product)) {
    const upgradePreview = buildHrmsAddonUpgradePreview({
      product,
      plan,
      billingCycle: payload.billingCycle,
      employeeCount: payload.employeeCount,
      addonSelections,
      existingSubscription,
    });

    addonLines = upgradePreview.billedAddonLines;
    targetAddonLines = upgradePreview.targetAddonLines;
    pricingSnapshot = upgradePreview.pricing;
  } else {
    const visibleAddons = getVisibleProductAddons(product);
    const addonMap = new Map(visibleAddons.map((addon) => [addon.id, addon]));
    addonLines = addonSelections.map((selection) => {
      const addon = addonMap.get(selection.addonId);

      if (!addon) {
        throw new AppError("Selected add-on was not found for this product", 404);
      }

      if (addon.status !== ACTIVE_STATUS) {
        throw new AppError("Selected add-on is currently inactive", 400);
      }

      return calculateAddonLine(addon, selection.quantity, payload.billingCycle, {
        product,
        employeeCount: payload.employeeCount,
      });
    });

    const planPricing = calculatePlanPricing(
      product,
      plan,
      payload.billingCycle,
      payload.employeeCount,
    );
    const recurringAddonAmountBeforeCycleDiscount = roundCurrency(
      addonLines
        .filter((addonLine) => addonLine.pricingType !== "ONE_TIME")
        .reduce((sum, addonLine) => sum + addonLine.rawTotalPrice, 0),
    );
    const addonAmountBeforeCycleDiscount = roundCurrency(
      addonLines.reduce((sum, addonLine) => sum + addonLine.rawTotalPrice, 0),
    );
    const addonBillingCycleDiscountAmount = roundCurrency(
      addonLines.reduce((sum, addonLine) => sum + (addonLine.billingCycleDiscountAmount ?? 0), 0),
    );
    const addonAmount = roundCurrency(
      addonLines.reduce((sum, addonLine) => sum + addonLine.totalPrice, 0),
    );
    const setupChargeAmount = isHrmsProduct(product)
      ? roundCurrency(normalizeEmployeeCount(payload.employeeCount) * HRMS_SETUP_CHARGE_PER_EMPLOYEE)
      : 0;

    targetAddonLines = addonLines;
    pricingSnapshot = {
      billingCycle: payload.billingCycle,
      billingCycleLabel: cycleMeta.label,
      billingCycleMonths: cycleMeta.months,
      currency: plan.currency,
      pricingModel: planPricing.pricingModel,
      employeeCount: planPricing.employeeCount,
      ratePerEmployee: planPricing.ratePerEmployee,
      baseAmountBeforeCycleDiscount: planPricing.baseAmountBeforeCycleDiscount,
      billingCycleDiscountPercent: planPricing.billingCycleDiscountPercent,
      billingCycleDiscountAmount: roundCurrency(
        planPricing.billingCycleDiscountAmount + addonBillingCycleDiscountAmount,
      ),
      addonAmountBeforeCycleDiscount,
      recurringAddonAmountBeforeCycleDiscount,
      subscriptionAmountBeforeCycleDiscount: roundCurrency(
        planPricing.baseAmountBeforeCycleDiscount + recurringAddonAmountBeforeCycleDiscount,
      ),
      setupChargeAmount,
      baseAmount: planPricing.baseAmount,
      addonAmount,
      subtotalAmount: 0,
      discountAmount: 0,
      taxAmount: 0,
      totalAmount: 0,
      taxRate: 0,
      taxName: taxSetting?.tax_name ?? "Tax",
      isTaxInclusive: false,
      nextRenewalDate: addMonths(new Date(), cycleMeta.months),
    };
  }

  const subtotalAmount = roundCurrency(
    toNumber(pricingSnapshot.baseAmount) +
      toNumber(pricingSnapshot.addonAmount) +
      toNumber(pricingSnapshot.setupChargeAmount),
  );
  const discountAmount = applyCouponAmount(subtotalAmount, coupon);
  const taxableAmount = roundCurrency(Math.max(0, subtotalAmount - discountAmount));
  const shouldApplyTax = !isHrmsProduct(product) && Boolean(taxSetting?.is_enabled);
  const taxRate = shouldApplyTax ? toNumber(taxSetting.tax_rate) : 0;
  const isTaxInclusive = shouldApplyTax ? Boolean(taxSetting?.is_inclusive) : false;
  const taxAmount = shouldApplyTax
    ? isTaxInclusive
      ? roundCurrency(taxableAmount - taxableAmount / (1 + taxRate / 100))
      : roundCurrency(taxableAmount * (taxRate / 100))
    : 0;
  const totalAmount = isTaxInclusive ? taxableAmount : roundCurrency(taxableAmount + taxAmount);

  return {
    product,
    plan,
    coupon,
    taxSetting,
    pricing: {
      ...pricingSnapshot,
      subtotalAmount,
      discountAmount,
      taxAmount,
      totalAmount,
      taxRate,
      taxName: taxSetting?.tax_name ?? "Tax",
      isTaxInclusive,
    },
    addonLines,
    targetAddonLines,
    existingSubscription,
  };
}

async function syncBillingDetails(customerAccount, billingDetails, transaction, { skipEmployeeCount = false } = {}) {
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

  if (
    !skipEmployeeCount &&
    billingDetails.employeeCount !== null &&
    billingDetails.employeeCount !== undefined
  ) {
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

async function updateCompanyEmployeeCount(companyId, employeeCount, transaction) {
  if (!companyId || employeeCount === null || employeeCount === undefined) {
    return;
  }

  await models.Company.update(
    {
      employee_count: normalizeEmployeeCount(employeeCount),
    },
    {
      where: { id: companyId },
      transaction,
    },
  );
}

async function createOrRefreshUsage(subscription, transaction, { preserveExisting = false } = {}) {
  const entitlements = buildEntitlements(subscription.plan, subscription.addons ?? [], subscription.product);
  const periodStart = new Date();

  if (!preserveExisting) {
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

    return;
  }

  const existingUsageEntries = await models.SubscriptionUsage.findAll({
    where: {
      subscription_id: subscription.id,
    },
    transaction,
  });
  const existingUsageMap = new Map(
    existingUsageEntries.map((usageEntry) => [usageEntry.metric_code, usageEntry]),
  );

  for (const limit of entitlements.limits) {
    if (limit.isUnlimited) {
      continue;
    }

    const existingUsage = existingUsageMap.get(limit.code);

    if (existingUsage) {
      await existingUsage.update(
        {
          limit_value: limit.value,
          period_end:
            limit.code === "MONTHLY_EMAILS"
              ? getUsagePeriodEnd(limit.code, new Date(existingUsage.period_start), subscription.billing_cycle)
              : subscription.end_date,
        },
        { transaction },
      );
      continue;
    }

    await models.SubscriptionUsage.create(
      {
        subscription_id: subscription.id,
        metric_code: limit.code,
        used_value: 0,
        limit_value: limit.value,
        period_start: periodStart,
        period_end:
          limit.code === "MONTHLY_EMAILS"
            ? getUsagePeriodEnd(limit.code, periodStart, subscription.billing_cycle)
            : subscription.end_date,
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

async function mergeSubscriptionAddons(subscription, addonLines, transaction) {
  const existingAddonEntries = await models.SubscriptionAddon.findAll({
    where: {
      subscription_id: subscription.id,
    },
    transaction,
  });
  const existingAddonMap = new Map(
    existingAddonEntries.map((subscriptionAddon) => [subscriptionAddon.addon_id, subscriptionAddon]),
  );

  for (const addonLine of addonLines) {
    const existingAddon = existingAddonMap.get(addonLine.addonId);

    if (existingAddon) {
      await existingAddon.update(
        {
          quantity: addonLine.quantity,
          unit_price: addonLine.unitPrice,
          total_price: addonLine.totalPrice,
          end_date: subscription.end_date,
          status: ACTIVE_STATUS,
        },
        { transaction },
      );
      continue;
    }

    await models.SubscriptionAddon.create(
      {
        subscription_id: subscription.id,
        addon_id: addonLine.addonId,
        quantity: addonLine.quantity,
        unit_price: addonLine.unitPrice,
        total_price: addonLine.totalPrice,
        start_date: new Date(),
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
    setup_charge_amount: order.setup_charge_amount,
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
  await updateCompanyEmployeeCount(
    order.company_id,
    order.metadata_json?.targetEmployeeCount ?? order.metadata_json?.employeeCount ?? null,
    transaction,
  );

  const detailedSubscription = await loadSubscriptionDetail(subscription.id, transaction);
  await createOrRefreshUsage(detailedSubscription, transaction);

  return loadSubscriptionDetail(subscription.id, transaction);
}

async function activateAddonUpgradeFromOrder(order, transaction) {
  const subscription =
    (order.subscription_id
      ? await models.Subscription.findByPk(order.subscription_id, { transaction })
      : null) ??
    (await models.Subscription.findOne({
      where: {
        customer_account_id: order.customer_account_id,
        product_id: order.product_id,
        status: ACTIVE_STATUS,
      },
      transaction,
    }));

  if (!subscription) {
    throw new AppError("The active subscription for this upgrade was not found.", 404);
  }

  const targetEmployeeCount =
    order.metadata_json?.targetEmployeeCount ?? order.metadata_json?.employeeCount ?? null;
  const targetAddonLines = Array.isArray(order.metadata_json?.targetAddonLines)
    ? order.metadata_json.targetAddonLines
    : [];

  await subscription.update(
    {
      plan_id: order.plan_id,
      billing_cycle: order.billing_cycle,
      status: ACTIVE_STATUS,
      base_price: roundCurrency(toNumber(subscription.base_price) + toNumber(order.base_amount)),
      addon_total: roundCurrency(toNumber(subscription.addon_total) + toNumber(order.addon_amount)),
      setup_charge_amount: roundCurrency(
        toNumber(subscription.setup_charge_amount) + toNumber(order.setup_charge_amount),
      ),
      discount_amount: roundCurrency(
        toNumber(subscription.discount_amount) + toNumber(order.discount_amount),
      ),
      tax_amount: roundCurrency(toNumber(subscription.tax_amount) + toNumber(order.tax_amount)),
      total_amount: roundCurrency(toNumber(subscription.total_amount) + toNumber(order.total_amount)),
    },
    { transaction },
  );

  if (targetAddonLines.length > 0) {
    await mergeSubscriptionAddons(subscription, targetAddonLines, transaction);
  }

  await updateCompanyEmployeeCount(order.company_id, targetEmployeeCount, transaction);

  const detailedSubscription = await loadSubscriptionDetail(subscription.id, transaction);
  await createOrRefreshUsage(detailedSubscription, transaction, { preserveExisting: true });

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
      subtotal_amount: roundCurrency(
        toNumber(order.base_amount) +
          toNumber(order.addon_amount) +
          toNumber(order.setup_charge_amount),
      ),
      addon_amount: order.addon_amount,
      setup_charge_amount: order.setup_charge_amount,
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
          quantity: toNumber(addonLine.metadata?.billedQuantity ?? addonLine.quantity),
          currentQuantity: toNumber(addonLine.metadata?.currentQuantity ?? 0),
          targetQuantity: toNumber(addonLine.metadata?.targetQuantity ?? addonLine.quantity),
          amount: addonLine.totalPrice,
        })),
        ...(toNumber(order.setup_charge_amount) > 0
          ? [
              {
                type: "setup",
                name: "One-time setup charges",
                amount: toNumber(order.setup_charge_amount),
              },
            ]
          : []),
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

function buildPaymentGatewaySession({ order, preview }) {
  if (order.gateway_provider !== "razorpay" || !order.gateway_order_id) {
    return null;
  }

  return {
    provider: "razorpay",
    keyId: getRazorpayKeyId(),
    orderId: order.gateway_order_id,
    amount: toCurrencySubunits(order.total_amount),
    currency: order.currency,
    name: "Altroz",
    description: `${preview.product.name} - ${preview.plan.name}`,
  };
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

export async function previewCheckout(payload, customerAccount = null) {
  const preview = await calculateCheckoutPreviewInternal(payload, undefined, customerAccount);

  return {
    product: serializeProduct(preview.product),
    selectedPlan: serializeCatalogPlan(preview.plan, preview.product),
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
  const preview = await calculateCheckoutPreviewInternal(payload, undefined, customerAccount);

  if (payload.lifecycleType === "addon" && preview.pricing.totalAmount <= 0) {
    throw new AppError(
      "Increase employees or add-on quantities to create an upgrade payment.",
      400,
    );
  }

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
      selectedPlan: serializeCatalogPlan(preview.plan, preview.product),
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

    let couponCode = payload.couponCode ?? null;

    if (!couponCode && checkoutIntent.coupon_id) {
      const intentCoupon = await models.Coupon.findByPk(checkoutIntent.coupon_id, { transaction });
      couponCode = intentCoupon?.code ?? null;
    }

    const preview = await calculateCheckoutPreviewInternal(
      {
        productSlug: payload.productSlug,
        planId: checkoutIntent.plan_id,
        billingCycle: checkoutIntent.billing_cycle,
        employeeCount: payload.billingDetails?.employeeCount ?? null,
        addonSelections: (checkoutIntent.selected_addons_json ?? []).map((addonLine) => ({
          addonId: addonLine.addonId,
          quantity: addonLine.quantity,
        })),
        couponCode,
        lifecycleType: payload.lifecycleType ?? null,
      },
      transaction,
      customerAccount,
    );

    if (payload.lifecycleType === "addon" && preview.pricing.totalAmount <= 0) {
      throw new AppError(
        "Increase employees or add-on quantities to create an upgrade payment.",
        400,
      );
    }

    await syncBillingDetails(customerAccount, payload.billingDetails ?? {}, transaction, {
      skipEmployeeCount: true,
    });

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
    const gatewayProvider = payload.gatewayProvider ?? "sandbox";

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
        setup_charge_amount: preview.pricing.setupChargeAmount ?? 0,
        discount_amount: preview.pricing.discountAmount,
        tax_amount: preview.pricing.taxAmount,
        total_amount: preview.pricing.totalAmount,
        gateway_provider: gatewayProvider,
        status: "pending_payment",
        selected_addons_json: preview.addonLines,
        coupon_code: preview.coupon?.code ?? null,
        metadata_json: {
          intentToken: checkoutIntent.intent_token,
          sourceRoute: payload.sourceRoute ?? checkoutIntent.source_route ?? null,
          notes: payload.notes ?? null,
          employeeCount: preview.pricing.employeeCount,
          pricingModel: preview.pricing.pricingModel,
          ratePerEmployee: preview.pricing.ratePerEmployee,
          billingCycleDiscountPercent: preview.pricing.billingCycleDiscountPercent,
          billingCycleDiscountAmount: preview.pricing.billingCycleDiscountAmount,
          setupChargeAmount: preview.pricing.setupChargeAmount ?? 0,
          currentEmployeeCount: preview.pricing.currentEmployeeCount ?? null,
          targetEmployeeCount: preview.pricing.targetEmployeeCount ?? preview.pricing.employeeCount ?? null,
          targetAddonLines: preview.targetAddonLines ?? [],
          upgradeContext: preview.pricing.upgradeContext ?? null,
        },
      },
      { transaction },
    );

    if (gatewayProvider === "razorpay") {
      const razorpayOrder = await createRazorpayOrder({
        amount: toCurrencySubunits(preview.pricing.totalAmount),
        currency: preview.plan.currency,
        receipt: order.order_number,
        notes: {
          orderNumber: order.order_number,
          productSlug: preview.product.slug,
          planSlug: preview.plan.slug,
          customerAccountId: String(customerAccount.id),
        },
      });

      await order.update(
        {
          gateway_order_id: razorpayOrder.id,
          metadata_json: {
            ...(order.metadata_json ?? {}),
            razorpayOrderId: razorpayOrder.id,
          },
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
      preview: {
        product: serializeProduct(preview.product),
        selectedPlan: serializeCatalogPlan(preview.plan, preview.product),
        selectedAddons: preview.addonLines,
        pricing: preview.pricing,
      },
      paymentGateway: buildPaymentGatewaySession({ order: detailedOrder, preview }),
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

    const existingSuccessfulPayment = await models.Payment.findOne({
      where: {
        order_id: order.id,
        status: "success",
      },
      order: [["createdAt", "DESC"]],
      transaction,
    });

    if (existingSuccessfulPayment) {
      const detailedOrder = await models.Order.findByPk(order.id, {
        include: buildOrderInclude(),
        transaction,
      });

      return {
        order: serializeOrder(detailedOrder),
        payment: serializePayment(existingSuccessfulPayment),
        subscription: detailedOrder?.subscription ? serializeSubscription(detailedOrder.subscription) : null,
        invoice: detailedOrder?.invoice ? serializeInvoice(detailedOrder.invoice) : null,
      };
    }

    const gatewayProvider = payload.gatewayProvider ?? order.gateway_provider ?? "sandbox";

    if (gatewayProvider === "razorpay" && payload.outcome === "success") {
      if (!payload.gatewayOrderId || !payload.gatewayPaymentId || !payload.gatewaySignature) {
        throw new AppError("Razorpay payment details are missing", 400);
      }

      if (!order.gateway_order_id || payload.gatewayOrderId !== order.gateway_order_id) {
        throw new AppError("Razorpay order verification failed", 400);
      }

      if (
        !verifyRazorpaySignature({
          orderId: payload.gatewayOrderId,
          paymentId: payload.gatewayPaymentId,
          signature: payload.gatewaySignature,
        })
      ) {
        throw new AppError("Razorpay payment signature could not be verified", 400);
      }
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
        gateway_provider: gatewayProvider,
        gateway_transaction_id:
          payload.gatewayTransactionId ??
          payload.gatewayPaymentId ??
          (paymentStatus === "success" ? buildNumber("TXN") : null),
        gateway_payment_id: payload.gatewayPaymentId ?? null,
        amount: order.total_amount,
        currency: order.currency,
        status: paymentStatus,
        failure_reason: paymentStatus === "failed" ? payload.failureReason ?? "Payment was not completed." : null,
        paid_at: paymentStatus === "success" ? new Date() : null,
        raw_response_json: {
          paymentMethod: payload.paymentMethod ?? null,
          outcome: payload.outcome,
          gatewayOrderId: payload.gatewayOrderId ?? order.gateway_order_id ?? null,
          gatewaySignature: payload.gatewaySignature ?? null,
        },
      },
      { transaction },
    );

    let subscription = null;
    let invoice = null;

    if (paymentStatus === "success") {
      subscription =
        order.lifecycle_type === "addon"
          ? await activateAddonUpgradeFromOrder(order, transaction)
          : await activateSubscriptionFromOrder(order, transaction);
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
      name:
        subscriptionAddon.addon?.name
          ? getAddonPricingConfig(subscriptionAddon.addon, subscription.product).name
          : "Unknown",
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
    setupChargeAmount: toNumber(invoice.setup_charge_amount),
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
