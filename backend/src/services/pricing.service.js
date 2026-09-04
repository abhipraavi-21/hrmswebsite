import { models } from "../config/database.js";
import { AppError } from "../utils/AppError.js";
import { slugify } from "../utils/slugify.js";

export function serializePlan(plan) {
  return {
    id: plan.id,
    name: plan.name,
    slug: plan.slug,
    shortDescription: plan.short_description,
    currency: plan.currency,
    monthlyPrice: Number(plan.monthly_price),
    yearlyPrice: plan.yearly_price === null ? null : Number(plan.yearly_price),
    originalPrice: plan.original_price === null ? null : Number(plan.original_price),
    billingLabel: plan.billing_label,
    badgeText: plan.badge_text,
    buttonText: plan.button_text,
    buttonLink: plan.button_link,
    isPopular: plan.is_popular,
    isActive: plan.is_active,
    displayOrder: plan.display_order,
    settings: plan.settings_json ?? {},
    features: (plan.features ?? [])
      .slice()
      .sort((a, b) => a.display_order - b.display_order)
      .map((feature) => ({
        id: feature.id,
        featureText: feature.feature_text,
        isIncluded: feature.is_included,
        displayOrder: feature.display_order,
        category: feature.category,
      })),
  };
}

export async function listPricingPlans({ activeOnly = false } = {}) {
  const plans = await models.PricingPlan.findAll({
    where: activeOnly ? { is_active: true } : {},
    include: [{ model: models.PricingFeature, as: "features" }],
    order: [["display_order", "ASC"]],
  });

  return plans.map(serializePlan);
}

export async function getPricingPlan(id) {
  const plan = await models.PricingPlan.findByPk(id, {
    include: [{ model: models.PricingFeature, as: "features" }],
  });

  if (!plan) {
    throw new AppError("Pricing plan not found", 404);
  }

  return plan;
}

export async function createPricingPlan(payload) {
  const plan = await models.PricingPlan.create({
    name: payload.name,
    slug: payload.slug ?? slugify(payload.name),
    short_description: payload.shortDescription ?? null,
    currency: payload.currency ?? "INR",
    monthly_price: payload.monthlyPrice ?? 0,
    yearly_price: payload.yearlyPrice ?? null,
    original_price: payload.originalPrice ?? null,
    billing_label: payload.billingLabel ?? null,
    badge_text: payload.badgeText ?? null,
    button_text: payload.buttonText ?? null,
    button_link: payload.buttonLink ?? null,
    is_popular: payload.isPopular ?? false,
    is_active: payload.isActive ?? true,
    display_order: payload.displayOrder ?? 0,
    settings_json: payload.settings ?? {},
  });

  return serializePlan(await getPricingPlan(plan.id));
}

export async function updatePricingPlan(id, payload) {
  const plan = await getPricingPlan(id);

  await plan.update({
    name: payload.name,
    slug: payload.slug ?? plan.slug,
    short_description: payload.shortDescription ?? null,
    currency: payload.currency ?? plan.currency,
    monthly_price: payload.monthlyPrice ?? plan.monthly_price,
    yearly_price: payload.yearlyPrice ?? null,
    original_price: payload.originalPrice ?? null,
    billing_label: payload.billingLabel ?? null,
    badge_text: payload.badgeText ?? null,
    button_text: payload.buttonText ?? null,
    button_link: payload.buttonLink ?? null,
    is_popular: payload.isPopular ?? false,
    is_active: payload.isActive ?? true,
    display_order: payload.displayOrder ?? 0,
    settings_json: payload.settings ?? {},
  });

  return serializePlan(await getPricingPlan(id));
}

export async function deletePricingPlan(id) {
  const plan = await getPricingPlan(id);
  await plan.destroy();
}

export async function duplicatePricingPlan(id) {
  const plan = await getPricingPlan(id);
  const copy = await models.PricingPlan.create({
    name: `${plan.name} Copy`,
    slug: `${plan.slug}-copy-${Date.now()}`,
    short_description: plan.short_description,
    currency: plan.currency,
    monthly_price: plan.monthly_price,
    yearly_price: plan.yearly_price,
    original_price: plan.original_price,
    billing_label: plan.billing_label,
    badge_text: plan.badge_text,
    button_text: plan.button_text,
    button_link: plan.button_link,
    is_popular: false,
    is_active: plan.is_active,
    display_order: plan.display_order,
    settings_json: plan.settings_json,
  });

  for (const feature of plan.features ?? []) {
    await models.PricingFeature.create({
      pricing_plan_id: copy.id,
      feature_text: feature.feature_text,
      is_included: feature.is_included,
      display_order: feature.display_order,
      category: feature.category,
    });
  }

  return serializePlan(await getPricingPlan(copy.id));
}

export async function reorderPricingPlans(items) {
  await Promise.all(
    items.map((entry, index) =>
      models.PricingPlan.update(
        { display_order: entry.displayOrder ?? index },
        { where: { id: entry.id } },
      ),
    ),
  );
}

export async function createPricingFeature(planId, payload) {
  const plan = await getPricingPlan(planId);

  const feature = await models.PricingFeature.create({
    pricing_plan_id: plan.id,
    feature_text: payload.featureText,
    is_included: payload.isIncluded ?? true,
    display_order: payload.displayOrder ?? 0,
    category: payload.category ?? null,
  });

  return {
    id: feature.id,
    featureText: feature.feature_text,
    isIncluded: feature.is_included,
    displayOrder: feature.display_order,
    category: feature.category,
  };
}

export async function updatePricingFeature(id, payload) {
  const feature = await models.PricingFeature.findByPk(id);

  if (!feature) {
    throw new AppError("Pricing feature not found", 404);
  }

  await feature.update({
    feature_text: payload.featureText,
    is_included: payload.isIncluded ?? true,
    display_order: payload.displayOrder ?? 0,
    category: payload.category ?? null,
  });

  return {
    id: feature.id,
    featureText: feature.feature_text,
    isIncluded: feature.is_included,
    displayOrder: feature.display_order,
    category: feature.category,
  };
}

export async function deletePricingFeature(id) {
  const feature = await models.PricingFeature.findByPk(id);

  if (!feature) {
    throw new AppError("Pricing feature not found", 404);
  }

  await feature.destroy();
}

export async function reorderPricingFeatures(items) {
  await Promise.all(
    items.map((entry, index) =>
      models.PricingFeature.update(
        { display_order: entry.displayOrder ?? index },
        { where: { id: entry.id } },
      ),
    ),
  );
}
