import { useLocation } from "react-router-dom";
import ManagedCmsShowcasePage from "@/components/site/ManagedCmsShowcasePage";

export default function AssetManagementGuidePage() {
  const location = useLocation();

  return (
    <ManagedCmsShowcasePage
      pageKey="asset-management-guide"
      canonicalPath={location.pathname}
      navbarVariant="assetManagement"
      fallbackTitle="Asset Management Guide | Complete Business Guide 2026"
      fallbackDescription="Learn asset management, tracking, maintenance, QR Codes, lifecycle management, reporting, audits, and best practices for modern businesses."
    />
  );
}
