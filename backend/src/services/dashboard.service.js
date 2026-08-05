import { models } from "../config/database.js";

export async function getDashboardSummary() {
  const [
    totalPages,
    totalResources,
    totalPricingPlans,
    publishedSections,
    draftPages,
    recentlyUpdatedContent,
  ] = await Promise.all([
    models.Page.count(),
    models.ResourcePage.count(),
    models.PricingPlan.count(),
    models.PageSection.count({ where: { is_active: true } }),
    models.Page.count({ where: { status: "draft" } }),
    models.Page.findAll({
      limit: 5,
      order: [["updatedAt", "DESC"]],
      attributes: ["id", "page_name", "page_key", "updatedAt"],
    }),
  ]);

  return {
    totalManagedPages: totalPages,
    totalResourcePages: totalResources,
    totalPricingPlans,
    publishedSections,
    draftSections: draftPages,
    recentlyUpdatedContent,
  };
}
