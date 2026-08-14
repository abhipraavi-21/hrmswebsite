import ManagedCmsShowcasePage from "@/components/site/ManagedCmsShowcasePage";
import { ROUTES } from "@/routes/routeConfig.js";

export default function BulkEmailPricingPage() {
  return (
    <ManagedCmsShowcasePage
      pageKey="bulk-email-pricing"
      canonicalPath={ROUTES.bulkEmailPricing}
      fallbackTitle="Bulk Email Pricing | Altroz"
      fallbackDescription="Compare Altroz Bulk Email pricing plans, campaign coverage and onboarding options."
    />
  );
}
