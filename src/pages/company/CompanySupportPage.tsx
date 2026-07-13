import { Headphones } from "lucide-react";
import CompanyDetailPage from "@/components/site/CompanyDetailPage";

export default function CompanySupportPage() {
  return (
    <CompanyDetailPage
      eyebrow="Support"
      title="Support for Altoz customers"
      description="Create a dedicated company support page for help, product questions, and customer assistance."
      icon={<Headphones className="h-6 w-6" />}
      highlights={["Customer help", "Product guidance", "Issue resolution"]}
      sections={[
        { title: "Help requests", desc: "Give customers a clear place to start when they need assistance." },
        { title: "Product guidance", desc: "Support teams with answers for common workflows and setup questions." },
        { title: "Escalations", desc: "Make urgent issues easier to explain, route, and follow up." },
      ]}
    />
  );
}
