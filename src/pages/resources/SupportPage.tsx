import { Headphones } from "lucide-react";
import ResourceDetailPage from "@/components/site/ResourceDetailPage";

export default function SupportPage() {
  return (
    <ResourceDetailPage
      eyebrow="Support"
      title="Support resources for fast, reliable help"
      description="Create a dedicated support destination for product help, issue handling, and customer assistance workflows."
      icon={<Headphones className="h-6 w-6" />}
      highlights={[
        "Help for setup and everyday usage",
        "Guidance for common product questions",
        "Clear paths for issue resolution",
      ]}
      cards={[
        {
          title: "Help center",
          desc: "Organize common answers and support material in one place.",
        },
        {
          title: "Customer assistance",
          desc: "Guide users toward the right next action when they need help.",
        },
        {
          title: "Issue tracking",
          desc: "Keep support requests easy to explain, route, and resolve.",
        },
      ]}
      primaryAction={{ label: "Start learning", href: "/learn" }}
      secondaryAction={{ label: "Back to home", href: "/" }}
    />
  );
}
