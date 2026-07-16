import { Handshake } from "lucide-react";
import CompanyDetailPage from "@/components/site/CompanyDetailPage";

export default function PartnerProgramPage() {
  return (
    <CompanyDetailPage
      eyebrow="Partner program"
      title="Partner with Altoz"
      description="Create a clear destination for consultants, implementation partners, and referral partners."
      icon={<Handshake className="h-6 w-6" />}
      highlights={[
        "Partner opportunities",
        "Referral and implementation support",
        "Shared growth with HR-focused teams",
      ]}
      sections={[
        { title: "Referral partners", desc: "Support partners who introduce businesses to Altoz." },
        {
          title: "Implementation partners",
          desc: "Work with teams that help customers launch HRMS successfully.",
        },
        {
          title: "Growth support",
          desc: "Give partners clear next steps for collaboration and enablement.",
        },
      ]}
    />
  );
}
