import { useLocation } from "react-router-dom";
import ManagedCmsShowcasePage from "@/components/site/ManagedCmsShowcasePage";

export default function BulkEmailPage() {
  const location = useLocation();

  return (
    <ManagedCmsShowcasePage
      pageKey="bulk-email"
      canonicalPath={location.pathname}
      navbarVariant="bulkEmail"
      fallbackTitle="Bulk Email Software for Business Campaigns | Altroz"
      fallbackDescription="Altroz Bulk Email helps businesses send, schedule and track email campaigns from one dashboard. Book a free demo to see it in action."
    />
  );
}
