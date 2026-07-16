import { Mail } from "lucide-react";
import CompanyDetailPage from "@/components/site/CompanyDetailPage";

export default function ContactUsPage() {
  return (
    <CompanyDetailPage
      eyebrow="Contact us"
      title="Talk to the Altoz team"
      description="Give visitors a clear path to reach sales, support, or the right team for their question."
      icon={<Mail className="h-6 w-6" />}
      highlights={["Sales questions", "Product inquiries", "General company contact"]}
      sections={[
        { title: "Sales", desc: "Help buyers ask about pricing, features, and demos." },
        { title: "Support", desc: "Route existing customers toward help and issue resolution." },
        {
          title: "General inquiries",
          desc: "Provide a place for partnerships, media, and company questions.",
        },
      ]}
    />
  );
}
