import { useLocation } from "react-router-dom";
import ManagedCmsShowcasePage from "@/components/site/ManagedCmsShowcasePage";
import { ROUTES } from "@/routes/routeConfig.js";

function resolveLearnPage(pathname: string) {
  if (pathname.startsWith(ROUTES.bulkEmailLearn)) {
    return {
      pageKey: "bulk-email-resource-learn",
      navbarVariant: "bulkEmail" as const,
      fallbackTitle: "Learn Bulk Email, Campaigns and SMTP | Altroz Bulk Email",
      fallbackDescription:
        "Explore practical bulk email learning content covering broadcasts, scheduling, templates, SMTP and delivery visibility.",
    };
  }

  if (pathname.startsWith(ROUTES.assetManagementLearn)) {
    return {
      pageKey: "asset-management-resource-learn",
      navbarVariant: "assetManagement" as const,
      fallbackTitle:
        "Learn Asset Management, Tracking and Maintenance Workflows | Altroz",
      fallbackDescription:
        "Learn the basics of asset registers, assignment, lifecycle tracking, maintenance and reporting in simple business language.",
    };
  }

  return {
    pageKey: "hrms-resource-learn",
    navbarVariant: "default" as const,
    fallbackTitle: "Learn HRMS, Payroll & Attendance Workflows | Altroz HR",
    fallbackDescription:
      "Learn the core HRMS workflows your team uses every day, including employee records, attendance, payroll, leave and recruitment.",
  };
}

export default function LearnPage() {
  const location = useLocation();
  const page = resolveLearnPage(location.pathname);

  return (
    <ManagedCmsShowcasePage
      pageKey={page.pageKey}
      canonicalPath={location.pathname}
      navbarVariant={page.navbarVariant}
      fallbackTitle={page.fallbackTitle}
      fallbackDescription={page.fallbackDescription}
    />
  );
}
