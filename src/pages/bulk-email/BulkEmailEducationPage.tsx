import { ROUTES } from "@/routes/routeConfig.js";
import BulkEmailSolutionPage from "./BulkEmailSolutionPage";
import { BarChart3, CalendarClock, CheckCircle2, FileText, GraduationCap, LayoutDashboard, MailCheck, Megaphone, ShieldCheck, Sparkles, Users, Workflow, Clock3 } from "lucide-react";

export default function BulkEmailEducationPage() {
  return (
    <BulkEmailSolutionPage
      pageTitle="Bulk Email Education | Altroz"
      canonicalPath={ROUTES.bulkEmailEducation}
      eyebrow="Education Communication Hub"
      title="Education Email Communication for Notices, Circulars and Student Updates"
      lead="Give educational institutes one organised place to send admission updates, exam notices, timetable reminders and parent communication."
      heroCtaLabel="View Education Use Cases"
      heroSummaryLabel="Education Communication"
      heroSummaryTitle="Keep student, parent and staff updates easy to manage"
      heroSummaryDescription="Altroz Bulk Email helps institutes send important notices on time and keep everything organised."
      heroStats={[
        { label: "Notices Sent", value: "312", note: "Student and parent updates delivered clearly", icon: FileText },
        { label: "Groups", value: "42", note: "Classes, departments and audiences organised", icon: Users },
        { label: "Scheduled", value: "58", note: "Exam and event reminders planned ahead", icon: CalendarClock },
        { label: "Visibility", value: "Live", note: "Track communication and delivery status", icon: MailCheck },
      ]}
      introCards={[
        {
          title: "Admission Updates",
          description: "Share admissions notices, application reminders and important student guidance.",
          icon: GraduationCap,
        },
        {
          title: "Parent Notices",
          description: "Send timetable changes, event updates and school communication with clarity.",
          icon: Users,
        },
        {
          title: "Staff Circulars",
          description: "Keep teacher and staff communication structured, timely and easy to review.",
          icon: FileText,
        },
      ]}
      featuresEyebrow="Education Features"
      featuresTitle="The communication tools educational institutes need every day"
      featuresDescription="These cards show how the platform supports student, parent and staff communication."
      featureCards={[
        { title: "Notice Broadcasts", description: "Send circulars and announcements to students, parents and staff.", icon: Megaphone },
        { title: "Timetable Reminders", description: "Prepare schedule updates and send them at the right time.", icon: CalendarClock },
        { title: "Exam Communication", description: "Share exam dates, instructions and reminders with the right audience.", icon: FileText },
        { title: "Delivery Visibility", description: "Keep track of what has been sent and what is still queued.", icon: MailCheck },
        { title: "Queue Management", description: "Organise future notices before they are released.", icon: Workflow },
        { title: "Academic Reporting", description: "Review delivery status and communication history when needed.", icon: BarChart3 },
        { title: "Simple Coordination", description: "Keep staff communication structured across different departments.", icon: ShieldCheck },
        { title: "Reliable Timing", description: "Use scheduling so important notices go out when they should.", icon: Sparkles },
      ]}
      stepsEyebrow="How Education Communication Works"
      stepsTitle="A clean workflow for institutes and schools"
      stepsDescription="The process keeps communication organised from creation through delivery."
      workflowSteps={[
        { step: "Step 1", title: "Prepare the notice", description: "Draft the student, parent or staff update that needs to be sent." },
        { step: "Step 2", title: "Select the audience", description: "Choose classes, parents, staff groups or entire departments." },
        { step: "Step 3", title: "Set the schedule", description: "Plan the send around exams, events or timetable changes." },
        { step: "Step 4", title: "Review the content", description: "Check the notice before it goes into the broadcast queue." },
        { step: "Step 5", title: "Send automatically", description: "Let the system release the email at the planned time." },
        { step: "Step 6", title: "Track communication", description: "Confirm delivery and review the communication history later." },
      ]}
      useCasesEyebrow="Education Use Cases"
      useCasesTitle="Where schools, colleges and institutes use bulk email"
      useCasesDescription="These examples help show the page as a practical education communication solution."
      useCaseCards={[
        { title: "Admission Notices", description: "Send reminders and updates during the admission process.", icon: GraduationCap },
        { title: "Exam Timetables", description: "Share important exam dates and schedule changes clearly.", icon: CalendarClock },
        { title: "Parent Communication", description: "Keep parents informed about events, closures and student updates.", icon: Users },
        { title: "Staff Circulars", description: "Send internal staff communication in a structured way.", icon: FileText },
        { title: "Event Reminders", description: "Promote school events, meetings and activities on time.", icon: Megaphone },
        { title: "Tracking & History", description: "Review what was sent and when for administrative clarity.", icon: MailCheck },
      ]}
      faqEyebrow="Education FAQs"
      faqTitle="Answers for schools and institutes planning communication"
      faqDescription="These questions help the page feel complete and easy to understand."
      faqs={[
        { q: "What is education communication in bulk email?", a: "It is the use of bulk email to send notices, circulars, reminders and updates to students, parents and staff." },
        { q: "Can institutes schedule messages in advance?", a: "Yes. Important notices can be prepared early and sent at the exact time needed." },
        { q: "Can communication be sent to different groups?", a: "Yes. The workflow can target classes, departments, parents or other relevant audiences." },
        { q: "Is this useful for exam notices?", a: "Yes. Exam schedules, reminders and instructions are a very common use case." },
        { q: "Can I keep staff and parent communication separate?", a: "Yes. You can organise messages by audience so each group receives the right information." },
        { q: "Does the platform help with delivery visibility?", a: "Yes. You can review sent, queued and scheduled communication from one place." },
        { q: "Can this help with admissions?", a: "Yes. Admission updates, reminders and notices fit well into this communication flow." },
        { q: "Does it support recurring notices?", a: "Yes. Repeated reminders and planned updates can be scheduled in advance." },
      ]}
      ctaTitle="Keep school and institute communication organised, timely and clear"
      ctaDescription="Bring notices, reminders, staff circulars and parent updates into one simple bulk email workflow."
      visualLabel="Education Communication"
      visualTitle="Manage notices and updates across the institute"
      visualDescription="Use one dashboard to plan communication, organise audiences and track delivery status."
      visualMetrics={[
        { label: "Notices", value: "312" },
        { label: "Groups", value: "42" },
        { label: "Queued", value: "58" },
      ]}
      queueTitle="Institute Queue"
      queueItems={[
        { title: "Exam Notice", status: "Live" },
        { title: "Parent Update", status: "Ready" },
        { title: "Holiday Circular", status: "Queued" },
      ]}
    />
  );
}
