import { Bell, MessagesSquare, ShieldCheck, Workflow } from "lucide-react";
import IntegrationDetailPage from "@/components/site/IntegrationDetailPage";
import { ROUTES } from "@/routes/routeConfig.js";

export default function BusinessAppsPage() {
  return (
    <IntegrationDetailPage
      eyebrow="Business apps"
      title="Bring HRMS into the business apps your teams already open every day"
      description="Use app connections to send alerts, approvals, and reminders into collaboration tools instead of forcing everyone back into another dashboard."
      summaryTitle="Connected workspace"
      summaryBody="Keep approvals, notifications, and task updates flowing where work already happens."
      stats={[
        { label: "Focus", value: "Communication and approvals" },
        { label: "Outcome", value: "Faster responses" },
        { label: "Fit", value: "Teams, chat, and email" },
      ]}
      capabilities={[
        {
          title: "Instant notifications",
          desc: "Trigger reminders for approvals, policy changes, and task status updates.",
          icon: <Bell className="h-5 w-5" />,
        },
        {
          title: "Team collaboration",
          desc: "Surface HR tasks and requests in the chat tools people already check.",
          icon: <MessagesSquare className="h-5 w-5" />,
        },
        {
          title: "Controlled workflows",
          desc: "Keep the right people in the loop without opening extra manual follow-ups.",
          icon: <Workflow className="h-5 w-5" />,
        },
        {
          title: "Safer handoffs",
          desc: "Limit access to only the updates that belong in each connected app.",
          icon: <ShieldCheck className="h-5 w-5" />,
        },
      ]}
      points={[
        "Push approval reminders into collaboration channels automatically",
        "Send onboarding and task updates without extra manual chasing",
        "Share status changes in the apps managers already monitor",
        "Keep sensitive HR data inside the correct permission boundaries",
      ]}
      backHref={ROUTES.integrations}
      primaryAction={{ label: "View accounting", href: ROUTES.accounting }}
      secondaryAction={{
        label: "View asset management",
        href: `${ROUTES.assetManagement}#asset-management`,
      }}
      footerTitle="A cleaner collaboration layer for people operations"
      footerBody="This page is a good fit if you want to show how HRMS supports notifications, approvals, and daily teamwork without making the UI feel crowded."
    />
  );
}
