import { useLocation } from "react-router-dom";
import ManagedCmsShowcasePage from "@/components/site/ManagedCmsShowcasePage";

export default function ComplianceGuidesPage() {
  const location = useLocation();

  return (
    <ManagedCmsShowcasePage
      pageKey="hrms-resource-compliance-guides"
      canonicalPath={location.pathname}
      navbarVariant="default"
      fallbackTitle="HR Compliance Guides for Payroll, PF and ESIC | Altroz HR"
      fallbackDescription="Explore simple compliance guides covering payroll records, PF, ESIC, attendance inputs, employee documents and day-to-day HR process control."
    />
  );
}
