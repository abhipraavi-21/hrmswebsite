import { useLocation } from "react-router-dom";
import ManagedCmsShowcasePage from "@/components/site/ManagedCmsShowcasePage";

export default function AssetManagementGuidePage() {
  const location = useLocation();

  return (
    <ManagedCmsShowcasePage
      pageKey="asset-management-guide"
      canonicalPath={location.pathname}
      navbarVariant="assetManagement"
      fallbackTitle="Asset Management Guide for Registers, Tracking and Maintenance | Altroz"
      fallbackDescription="Explore a practical asset management guide covering registration, assignment, movement, maintenance, QR workflows and reporting."
    />
  );
}
