import { CalendarCheck } from "lucide-react";
import CompanyDetailPage from "@/components/site/CompanyDetailPage";

export default function BookDemoPage() {
  return (
    <CompanyDetailPage
      eyebrow="Book demo"
      title="Book an Altoz demo"
      description="Give prospects a focused page to request a walkthrough and understand what the demo can cover."
      icon={<CalendarCheck className="h-6 w-6" />}
      highlights={["Product walkthrough", "HRMS fit discussion", "Clear next steps for buyers"]}
      sections={[
        {
          title: "What you will see",
          desc: "Walk through HR, attendance, payroll, reports, and employee workflows.",
        },
        {
          title: "Who should join",
          desc: "Invite HR, finance, operations, or leadership stakeholders.",
        },
        {
          title: "After the demo",
          desc: "Define next steps for setup, pricing, and implementation planning.",
        },
      ]}
      primaryAction={{ label: "Contact us", href: "/company/contact-us" }}
    />
  );
}
