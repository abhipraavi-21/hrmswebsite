import { BookOpenCheck, FileBarChart2, Landmark, Repeat } from "lucide-react";
import IntegrationDetailPage from "@/components/site/IntegrationDetailPage";
import { ROUTES } from "@/routes/routeConfig.js";

export default function AccountingPage() {
  return (
    <IntegrationDetailPage
      eyebrow="Accounting"
      title="Move payroll and finance data into accounting with less manual cleanup"
      description="Use the accounting integration page to explain how payroll exports, journal entries, and cost center mappings stay structured from HRMS to finance."
      summaryTitle="Finance handoff"
      summaryBody="Turn payroll and reimbursement data into a cleaner accounting flow."
      stats={[
        { label: "Focus", value: "Payroll and finance sync" },
        { label: "Outcome", value: "Fewer re-entries" },
        { label: "Fit", value: "Books and journals" },
      ]}
      capabilities={[
        {
          title: "Payroll exports",
          desc: "Move salary totals and deductions into finance-ready formats.",
          icon: <FileBarChart2 className="h-5 w-5" />,
        },
        {
          title: "Account mapping",
          desc: "Map payroll lines to the right ledger accounts and cost centers.",
          icon: <Landmark className="h-5 w-5" />,
        },
        {
          title: "Repeatable syncs",
          desc: "Keep recurring transfers consistent instead of rebuilding them each month.",
          icon: <Repeat className="h-5 w-5" />,
        },
        {
          title: "Audit-friendly records",
          desc: "Preserve the trail between HR actions and accounting output.",
          icon: <BookOpenCheck className="h-5 w-5" />,
        },
      ]}
      points={[
        "Export payroll summaries into the format finance needs",
        "Keep ledger mappings and cost centers aligned across runs",
        "Reduce month-end follow-up between HR and accounts teams",
        "Support a cleaner audit trail for salary and reimbursement data",
      ]}
      backHref={ROUTES.integrations}
      primaryAction={{ label: "View business apps", href: ROUTES.businessApps }}
      secondaryAction={{
        label: "View asset management",
        href: `${ROUTES.assetManagement}#asset-management`,
      }}
      footerTitle="Finance connections that stay practical"
      footerBody="This page can describe the exact data handoff story without turning the integrations section into a generic feature list."
    />
  );
}
