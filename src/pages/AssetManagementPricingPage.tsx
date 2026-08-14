import ManagedCmsShowcasePage from "@/components/site/ManagedCmsShowcasePage";
import { ROUTES } from "@/routes/routeConfig.js";

export default function AssetManagementPricingPage() {
  return (
    <ManagedCmsShowcasePage
      pageKey="asset-management-pricing"
      canonicalPath={ROUTES.assetManagementPricing}
      fallbackTitle="Asset Management Pricing | Altroz"
      fallbackDescription="Explore Altroz Asset Management annual plans by asset capacity, compare pricing and book a demo."
    />
  );
}
