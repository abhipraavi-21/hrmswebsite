import { models } from "../config/database.js";

export async function getDashboardSummary() {
  const [
    totalPages,
    totalResources,
    totalPricingPlans,
    totalEnquiries,
    newEnquiries,
    readEnquiries,
    publishedSections,
    draftPages,
    recentlyUpdatedContent,
    recentEnquiries,
  ] = await Promise.all([
    models.Page.count(),
    models.ResourcePage.count(),
    models.PricingPlan.count(),
    models.ContactEnquiry.count(),
    models.ContactEnquiry.count({ where: { status: "new" } }),
    models.ContactEnquiry.count({ where: { status: "read" } }),
    models.PageSection.count({ where: { is_active: true } }),
    models.Page.count({ where: { status: "draft" } }),
    models.Page.findAll({
      limit: 5,
      order: [["updatedAt", "DESC"]],
      attributes: ["id", "page_name", "page_key", "updatedAt"],
    }),
    models.ContactEnquiry.findAll({
      limit: 5,
      order: [["submitted_at", "DESC"]],
      attributes: ["id", "full_name", "status", "submitted_at"],
    }),
  ]);

  return {
    totalManagedPages: totalPages,
    totalResourcePages: totalResources,
    totalPricingPlans,
    totalContactEnquiries: totalEnquiries,
    newEnquiries,
    readEnquiries,
    publishedSections,
    draftSections: draftPages,
    recentlyUpdatedContent,
    recentEnquiries,
  };
}
