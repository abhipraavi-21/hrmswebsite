import { GraduationCap } from "lucide-react";
import ResourceDetailPage from "@/components/site/ResourceDetailPage";

export default function LearningPage() {
  return (
    <ResourceDetailPage
      eyebrow="Learning"
      title="Learning resources for better HRMS adoption"
      description="Give teams a clear place to explore product guides, workflow ideas, and practical HR operations content."
      icon={<GraduationCap className="h-6 w-6" />}
      highlights={[
        "Guides for admins and managers",
        "Workflow tips for daily HR operations",
        "Helpful content for onboarding new users",
      ]}
      cards={[
        {
          title: "Product guides",
          desc: "Step-by-step learning content for core HRMS workflows.",
        },
        {
          title: "Best practices",
          desc: "Practical ideas for attendance, payroll, leave, and reporting processes.",
        },
        {
          title: "Team enablement",
          desc: "Resources that help new users understand the platform faster.",
        },
      ]}
      primaryAction={{ label: "Contact support", href: "/resources/support" }}
      secondaryAction={{ label: "Back to home", href: "/" }}
    />
  );
}
