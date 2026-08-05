import { ROUTES } from "@/routes/routeConfig.js";
import BulkEmailSolutionPage from "./BulkEmailSolutionPage";
import { ArrowRight, BarChart3, CalendarClock, CheckCircle2, FileText, Gauge, LayoutDashboard, MailCheck, Megaphone, ShieldCheck, Sparkles, TrendingUp, Users, Workflow } from "lucide-react";

export default function BulkEmailMarketingPage() {
  return (
    <BulkEmailSolutionPage
      pageTitle="Bulk Email Marketing | Altroz"
      canonicalPath={ROUTES.bulkEmailMarketing}
      eyebrow="Marketing Campaign Center"
      title="Marketing Email Campaigns Built for Planning, Scheduling and Growth"
      lead="Help marketing teams plan launches, send promotional emails and review performance from one organised bulk email workspace."
      heroCtaLabel="View Marketing Use Cases"
      heroSummaryLabel="Marketing Campaigns"
      heroSummaryTitle="Plan promotions, launch campaigns and track results in one place"
      heroSummaryDescription="Altroz Bulk Email keeps marketing teams organised from campaign creation to delivery review."
      heroStats={[
        { label: "Campaigns", value: "248", note: "Promotional sends organised in one place", icon: Megaphone },
        { label: "Templates", value: "18", note: "Reusable layouts for faster launches", icon: FileText },
        { label: "Scheduled", value: "42", note: "Future campaigns queued ahead of time", icon: CalendarClock },
        { label: "Performance", value: "Live", note: "Review delivery and campaign progress", icon: TrendingUp },
      ]}
      introCards={[
        {
          title: "Promotional Campaigns",
          description: "Launch offers, product updates and seasonal messages without losing visibility.",
          icon: Megaphone,
        },
        {
          title: "Reusable Templates",
          description: "Keep brand design consistent by reusing email layouts across campaigns.",
          icon: FileText,
        },
        {
          title: "Campaign Planning",
          description: "Organise future releases and marketing moments in advance.",
          icon: CalendarClock,
        },
      ]}
      featuresEyebrow="Marketing Features"
      featuresTitle="A compact toolkit for promotional emails and campaign planning"
      featuresDescription="These cards show how marketing teams can keep their sends structured and easy to review."
      featureCards={[
        { title: "Campaign Setup", description: "Create marketing broadcasts quickly and prepare them for launch.", icon: LayoutDashboard },
        { title: "Promo Scheduling", description: "Set the delivery time for offers, event invites and product announcements.", icon: CalendarClock },
        { title: "Template Reuse", description: "Reuse branded templates so every campaign stays on message.", icon: FileText },
        { title: "Broadcast Queue", description: "Line up campaigns in a clean queue before they go live.", icon: Workflow },
        { title: "Delivery Tracking", description: "Monitor delivery status after the campaign is sent.", icon: MailCheck },
        { title: "Performance Review", description: "Look back at campaign activity and delivery results.", icon: BarChart3 },
        { title: "Team Visibility", description: "Give the whole team a clean view of what is live and what is next.", icon: Users },
        { title: "Growth Mindset", description: "Use structured email workflows to support ongoing marketing growth.", icon: Sparkles },
      ]}
      stepsEyebrow="How Marketing Campaigns Work"
      stepsTitle="A straightforward workflow from idea to delivery"
      stepsDescription="The steps keep the marketing flow practical, visible and easy to manage."
      workflowSteps={[
        { step: "Step 1", title: "Plan the campaign", description: "Define the offer, objective and audience before building the email." },
        { step: "Step 2", title: "Create the message", description: "Use a template or upload branded content for the promotion." },
        { step: "Step 3", title: "Choose the schedule", description: "Set the best date and time for your campaign launch." },
        { step: "Step 4", title: "Review the queue", description: "Check what is waiting and what is already scheduled." },
        { step: "Step 5", title: "Send the campaign", description: "Release the email and let the platform handle delivery." },
        { step: "Step 6", title: "Review the outcome", description: "Use analytics and delivery tracking to learn from the send." },
      ]}
      useCasesEyebrow="Marketing Use Cases"
      useCasesTitle="Typical marketing scenarios this page supports"
      useCasesDescription="The examples stay practical so visitors can imagine how the platform fits their workflow."
      useCaseCards={[
        { title: "Product Launches", description: "Announce a new product or feature with a structured campaign.", icon: Megaphone },
        { title: "Seasonal Offers", description: "Schedule festival, holiday and limited-time promotions ahead of time.", icon: CalendarClock },
        { title: "Email Newsletters", description: "Keep your audience updated with regular branded communication.", icon: FileText },
        { title: "Lead Nurture", description: "Send follow-up communication that supports buyer journeys.", icon: Workflow },
        { title: "Event Invites", description: "Promote webinars, demos and launch events clearly.", icon: CheckCircle2 },
        { title: "Campaign Review", description: "Track what was sent and how each campaign performed.", icon: TrendingUp },
      ]}
      faqEyebrow="Marketing FAQs"
      faqTitle="Answers marketing teams usually want before starting"
      faqDescription="Clear answers help the page feel complete without adding clutter."
      faqs={[
        { q: "Can I use Altroz Bulk Email for marketing promotions?", a: "Yes. It is suitable for product launches, offers, newsletters and other promotional communication." },
        { q: "Can campaigns be scheduled in advance?", a: "Yes. Marketing campaigns can be prepared early and scheduled for a future send time." },
        { q: "Are reusable templates supported?", a: "Yes. Templates help teams keep brand look and message consistent across campaigns." },
        { q: "Can I review delivery after the campaign is sent?", a: "Yes. Delivery tracking and reports help you review the result of each send." },
        { q: "Is it useful for newsletters?", a: "Yes. Newsletters fit naturally into a structured email workflow with repeated sends.", },
        { q: "Can I manage multiple campaigns together?", a: "Yes. Campaigns can be organised in the queue and reviewed as part of a broader workflow." },
        { q: "Does it help with campaign planning?", a: "Yes. Marketing teams can plan, prepare and release communication without last-minute pressure." },
        { q: "Can I keep campaign history?", a: "Yes. Keeping history helps teams compare launches and improve the next send.", },
      ]}
      ctaTitle="Turn marketing emails into a clean, organised campaign workflow"
      ctaDescription="Plan promotional sends, launch on schedule and review delivery results with a premium, simple experience."
      visualLabel="Marketing Campaigns"
      visualTitle="Plan launches and keep promotional activity visible"
      visualDescription="Use the dashboard to prepare offers, monitor queue state and review delivery after the campaign goes out."
      visualMetrics={[
        { label: "Campaigns", value: "248" },
        { label: "Templates", value: "18" },
        { label: "Scheduled", value: "42" },
      ]}
      queueTitle="Marketing Queue"
      queueItems={[
        { title: "Spring Offer", status: "Live" },
        { title: "Launch Invite", status: "Ready" },
        { title: "Newsletter", status: "Queued" },
      ]}
    />
  );
}
