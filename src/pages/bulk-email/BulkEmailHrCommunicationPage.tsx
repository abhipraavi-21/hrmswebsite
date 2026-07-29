import { ROUTES } from "@/routes/routeConfig.js";
import BulkEmailSolutionPage from "./BulkEmailSolutionPage";
import { FileText, LayoutDashboard, MailCheck, Megaphone, MessageSquareMore, ShieldCheck, Sparkles, Users, Workflow, CalendarClock, Clock3, CheckCircle2, BarChart3 } from "lucide-react";

export default function BulkEmailHrCommunicationPage() {
  return (
    <BulkEmailSolutionPage
      pageTitle="Bulk Email HR Communication | Altroz"
      canonicalPath={ROUTES.bulkEmailHrCommunication}
      eyebrow="HR Communication Hub"
      title="HR Communication Software for Policy Updates, Team Notices and Internal Announcements"
      lead="Give HR teams one organised place to send policy updates, onboarding emails, internal notices and recurring employee communication with clear delivery visibility."
      heroCtaLabel="View HR Use Cases"
      heroSummaryLabel="HR Communication"
      heroSummaryTitle="Send timely internal messages without losing control of the workflow"
      heroSummaryDescription="Altroz Bulk Email helps HR teams prepare, schedule and track employee communication in one dashboard."
      heroStats={[
        { label: "Policies Sent", value: "128", note: "Internal updates delivered with confidence", icon: FileText },
        { label: "Teams Covered", value: "24", note: "Departments aligned in one workflow", icon: Users },
        { label: "Delivery Tracking", value: "Live", note: "Monitor employee communication status", icon: MailCheck },
        { label: "Scheduled Updates", value: "36", note: "Announcements prepared in advance", icon: CalendarClock },
      ]}
      introCards={[
        {
          title: "Policy Updates",
          description: "Send policy changes, reminders and handbook updates to employees in a structured flow.",
          icon: FileText,
        },
        {
          title: "Onboarding Communication",
          description: "Keep joining checklists, welcome notes and first-week guidance in one consistent journey.",
          icon: Users,
        },
        {
          title: "Internal Announcements",
          description: "Broadcast company notices, leadership updates and department-wide messages on time.",
          icon: Megaphone,
        },
      ]}
      featuresEyebrow="HR Communication Features"
      featuresTitle="The controls HR teams need for clear internal messaging"
      featuresDescription="These feature cards keep the page dense and explain how the platform supports employee communication."
      featureCards={[
        { title: "Employee Broadcasts", description: "Send announcements to the whole team or chosen groups when the message matters.", icon: Megaphone },
        { title: "Scheduled Notices", description: "Prepare recurring reminders and future communication without last-minute follow-up.", icon: CalendarClock },
        { title: "Policy Distribution", description: "Share updates and keep a record of what was sent to employees.", icon: FileText },
        { title: "Delivery Visibility", description: "Track whether internal communication was sent and monitor status from one dashboard.", icon: MailCheck },
        { title: "Queue Control", description: "Keep HR communication lined up and ready before it goes live.", icon: Workflow },
        { title: "Team Reporting", description: "Review communication history, delivery status and current campaign state.", icon: BarChart3 },
        { title: "Simple Review Flow", description: "Use a clean process for creating, checking and releasing employee emails.", icon: CheckCircle2 },
        { title: "Trusted Internal Messaging", description: "Keep sensitive communication organised, professional and easy to manage.", icon: ShieldCheck },
      ]}
      stepsEyebrow="How HR Communication Works"
      stepsTitle="A simple workflow for employee updates and internal emails"
      stepsDescription="The steps keep HR communication easy to follow from creation to delivery."
      workflowSteps={[
        { step: "Step 1", title: "Draft the HR message", description: "Prepare the policy, notice or announcement for employees." },
        { step: "Step 2", title: "Choose the audience", description: "Target the entire company, a department or a smaller employee group." },
        { step: "Step 3", title: "Set the timing", description: "Schedule the email for the right date and time when needed." },
        { step: "Step 4", title: "Review and approve", description: "Check the content before it is released to the intended recipients." },
        { step: "Step 5", title: "Send from the queue", description: "Move the communication into the broadcast queue and send it reliably." },
        { step: "Step 6", title: "Track delivery status", description: "Use reporting to confirm the email was delivered and review the result." },
      ]}
      useCasesEyebrow="Common HR Use Cases"
      useCasesTitle="How HR teams use bulk email every day"
      useCasesDescription="These examples show where the page adds real business value for employee communication."
      useCaseCards={[
        { title: "Policy Changes", description: "Share updated policies so employees always have the latest information.", icon: FileText },
        { title: "Onboarding", description: "Guide new joiners through their first days with a consistent welcome flow.", icon: Users },
        { title: "Holiday Notices", description: "Send holiday schedules, office closures and important reminders in advance.", icon: CalendarClock },
        { title: "Payroll Alerts", description: "Notify teams about pay dates, document updates and required actions.", icon: Clock3 },
        { title: "Town Hall Updates", description: "Broadcast leadership communication before and after company meetings.", icon: Megaphone },
        { title: "Acknowledgement Tracking", description: "Keep an eye on which employee messages were sent and reviewed.", icon: MailCheck },
      ]}
      faqEyebrow="HR Communication FAQs"
      faqTitle="Clear answers for HR teams planning internal emails"
      faqDescription="Helpful answers that keep the page practical while still feeling complete."
      faqs={[
        { q: "What is HR communication in bulk email?", a: "It is the use of bulk email to send policies, notices, onboarding messages and internal updates to employees or departments." },
        { q: "Can HR teams schedule communication in advance?", a: "Yes. HR communication can be prepared early and scheduled for the day and time you want it sent." },
        { q: "Can I send to selected employee groups?", a: "Yes. The workflow can be organised around a company-wide send or a smaller targeted audience." },
        { q: "Why is delivery tracking useful for HR?", a: "It helps HR teams confirm that important internal messages moved through the system properly." },
        { q: "Can policy updates be reused later?", a: "Yes. Policy messages can be revisited, updated and reused for future communication cycles." },
        { q: "Is this useful for onboarding?", a: "Yes. Onboarding emails, welcome notes and joining checklists all fit naturally into the workflow." },
        { q: "Can I keep HR messages organised?", a: "Yes. The platform keeps campaign history and delivery visibility together so communication stays structured." },
        { q: "Does this support recurring notices?", a: "Yes. Recurring HR reminders and planned announcements can be scheduled ahead of time." },
      ]}
      ctaTitle="Give HR teams one reliable place to manage internal communication"
      ctaDescription="Bring policy updates, onboarding emails, announcements and employee reminders into one clean workflow."
      visualLabel="HR Communication"
      visualTitle="Keep employee communication structured and visible"
      visualDescription="Use one dashboard to prepare HR emails, organise them by audience and monitor delivery status."
      visualMetrics={[
        { label: "Messages", value: "128" },
        { label: "Groups", value: "24" },
        { label: "Live", value: "Yes" },
      ]}
      queueTitle="Internal Queue"
      queueItems={[
        { title: "Policy Update", status: "Live" },
        { title: "Onboarding Email", status: "Ready" },
        { title: "Holiday Notice", status: "Queued" },
      ]}
    />
  );
}
