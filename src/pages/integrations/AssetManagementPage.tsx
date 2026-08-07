import { useLocation } from "react-router-dom";
import ManagedCmsShowcasePage from "@/components/site/ManagedCmsShowcasePage";

export default function AssetManagementPage() {
  const location = useLocation();

  return (
    <ManagedCmsShowcasePage
      pageKey="asset-management-suite"
      canonicalPath={location.pathname}
      navbarVariant="assetManagement"
      fallbackTitle="Asset Management Software | Altroz Asset Management"
      fallbackDescription="Register, assign, track and maintain business assets from one platform. Altroz Asset Management gives complete visibility across branches and departments."
    />
  );
}
