import { MessageSquareQuote } from "lucide-react";
import CompanyDetailPage from "@/components/site/CompanyDetailPage";

export default function TestimonialsPage() {
  return (
    <CompanyDetailPage
      eyebrow="Testimonials"
      title="What customers say about Altoz"
      description="Use this page for customer quotes, success stories, and short proof points from HR teams."
      icon={<MessageSquareQuote className="h-6 w-6" />}
      highlights={["Customer quotes", "HR team feedback", "Proof points for product trust"]}
      sections={[
        {
          title: "Customer voice",
          desc: "Add quotes from teams that use Altoz in real operations.",
        },
        {
          title: "Use cases",
          desc: "Group testimonials by payroll, attendance, onboarding, or reporting.",
        },
        { title: "Trust signals", desc: "Turn positive feedback into clear proof for new buyers." },
      ]}
    />
  );
}
