import { models } from "../config/database.js";
import { getSubscriptionPurchaseStats } from "./subscriptionPurchase.service.js";

export async function getDashboardSummary() {
  const [
    totalPages,
    totalResources,
    totalPricingPlans,
    publishedSections,
    draftPages,
    recentlyUpdatedContent,
    subscriptionStats,
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
    getSubscriptionPurchaseStats(),
  ]);

  return {
    totalManagedPages: totalPages,
    totalResourcePages: totalResources,
    totalPricingPlans,
    publishedSections,
    draftSections: draftPages,
    recentlyUpdatedContent,
    totalSubscriptionPurchases: subscriptionStats.totalSubscriptionPurchases,
    activeSubscriptions: subscriptionStats.activeSubscriptions,
    renewalsDueSoon: subscriptionStats.renewalsDueSoon,
    recentSubscriptions: subscriptionStats.recentSubscriptions,
  };
}
