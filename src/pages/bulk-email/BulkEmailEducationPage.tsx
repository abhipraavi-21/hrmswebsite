import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Factory,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Laptop,
  Layers3,
  Lightbulb,
  MailCheck,
  Megaphone,
  NotebookPen,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Users,
  Workflow,
  Wallet,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Footer from "@/components/site/Footer";
import BulkEmailNavbar from "@/components/site/BulkEmailNavbar";
import PageSEO from "@/components/site/PageSEO";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { ROUTES } from "@/routes/routeConfig.js";
import { cn } from "@/lib/utils";

type Card = {
  title: string;
  description: string;
  icon: ReactNode;
};

type LinkCard = Card & {
  href: string;
  linkLabel?: string;
};

type Step = {
  step: string;
  title: string;
  description: string;
};

type Faq = {
  q: string;
  a: string;
};

function MaybeLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  center?: boolean;
}) {
  return (
    <ScrollReveal
      variant="fade-up"
      className={cn(center ? "mx-auto max-w-4xl text-center" : "max-w-4xl")}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-[#1d4ed8]/20 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-[#1d4ed8] shadow-sm">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-base leading-7 text-ink-soft">{description}</p>
    </ScrollReveal>
  );
}

function AnimatedTitle({
  as = "h2",
  className,
  children,
}: {
  as?: "h1" | "h2";
  className?: string;
  children: string;
}) {
  const Component = as;
  const words = children.split(/\s+/).filter(Boolean);

  return (
    <Component
      className={cn("bulk-email-animated-title font-black leading-[1.02] tracking-[-0.04em]", className)}
      aria-label={children}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={cn("inline-block", index % 2 === 0 ? "text-[#1d4ed8]" : "text-[#b45309]")}
          style={{
            animation: "educationWordRise 0.55s ease-out both",
            animationDelay: `${index * 55}ms`,
            marginRight: index < words.length - 1 ? "0.3em" : 0,
          }}
        >
          {word}
        </span>
      ))}
    </Component>
  );
}

function EducationDashboardMock() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="dashboard-glow left-1/2 top-10 -translate-x-1/2" />
      <div className="soft-card relative overflow-hidden rounded-[2rem] border border-border bg-white/95 p-5 shadow-float">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#b45309]">
              Education Communication Dashboard
            </div>
            <div className="mt-1 text-lg font-semibold text-ink">
              Students, parents and faculty in one workflow
            </div>
          </div>
          <div className="ml-auto rounded-full bg-[#1d4ed8]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1d4ed8]">
            Live
          </div>
        </div>

        <div className="mt-5 grid gap-4">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-[#1d4ed8]/6 via-white to-[#d97706]/6 p-5">
            <div className="flex flex-wrap gap-2">
              {["Students", "Parents", "Faculty", "Staff"].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1d4ed8] shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#b45309]">
                Upcoming Communication
              </div>
              <div className="mt-2 text-sm font-semibold text-ink">
                Exam timetable, admission update and fee reminder
              </div>
              <p className="mt-2 text-sm leading-6 text-ink-soft">
                Plan notices for classes, departments and parent groups with clear delivery tracking.
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                ["Notices", "312"],
                ["Groups", "42"],
                ["Scheduled", "58"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#b45309]">
                    {label}
                  </div>
                  <div className="mt-1 text-lg font-black text-ink">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.25rem] border border-border bg-white p-4 shadow-sm">
              <div className="text-sm font-semibold text-ink">Delivery Report</div>
              <div className="mt-3 space-y-2">
                {["Exam notice delivered", "Parent update opened", "Faculty circular queued"].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-surface/70 p-3 text-sm text-ink"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#1d4ed8]/10 text-xs font-bold text-[#1d4ed8]">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.25rem] border border-border bg-white p-4 shadow-sm">
              <div className="text-sm font-semibold text-ink">Queue Summary</div>
              <div className="mt-3 space-y-2">
                {[
                  ["Admission update", "Live"],
                  ["Parent meeting notice", "Ready"],
                  ["Holiday circular", "Queued"],
                ].map(([title, status]) => (
                  <div key={title} className="flex items-center justify-between rounded-xl bg-white p-3 text-sm shadow-sm">
                    <span className="font-medium text-ink">{title}</span>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em]",
                        status === "Live"
                          ? "bg-[#1d4ed8]/10 text-[#1d4ed8]"
                          : status === "Ready"
                            ? "bg-[#d97706]/10 text-[#b45309]"
                            : "bg-surface text-ink-soft",
                      )}
                    >
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const heroCards: Card[] = [
  {
    title: "Admission Updates",
    description: "Keep applicants informed about status, deadlines and next steps.",
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    title: "Parent Notices",
    description: "Send timetable changes, event updates and school communication clearly.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Staff Circulars",
    description: "Keep teacher and staff communication structured and easy to review.",
    icon: <FileText className="h-5 w-5" />,
  },
];

const learnCards: LinkCard[] = [
  {
    title: "Notice Broadcasts",
    description: "Send circulars and announcements to students, parents and staff.",
    icon: <Megaphone className="h-5 w-5" />,
    href: ROUTES.bulkEmailBroadcast,
  },
  {
    title: "Timetable Reminders",
    description: "Prepare schedule updates and send them at the right time.",
    icon: <CalendarClock className="h-5 w-5" />,
    href: ROUTES.bulkEmailScheduling,
  },
  {
    title: "Exam Communication",
    description: "Share exam dates, instructions and reminders with the right audience.",
    icon: <FileText className="h-5 w-5" />,
    href: ROUTES.bulkEmailBroadcast,
  },
  {
    title: "Delivery Visibility",
    description: "Keep track of what has been sent and what is still queued.",
    icon: <MailCheck className="h-5 w-5" />,
    href: ROUTES.bulkEmailAnalytics,
  },
  {
    title: "Queue Management",
    description: "Organise future notices before they are released.",
    icon: <Workflow className="h-5 w-5" />,
    href: ROUTES.bulkEmailScheduling,
  },
  {
    title: "Academic Reporting",
    description: "Review delivery status and communication history when needed.",
    icon: <BarChart3 className="h-5 w-5" />,
    href: ROUTES.bulkEmailAnalytics,
  },
  {
    title: "Simple Coordination",
    description: "Keep staff communication structured across different departments.",
    icon: <ShieldCheck className="h-5 w-5" />,
    href: ROUTES.bulkEmailHrCommunication,
  },
  {
    title: "Reliable Timing",
    description: "Use scheduling so important notices go out when they should.",
    icon: <Sparkles className="h-5 w-5" />,
    href: ROUTES.bulkEmailScheduling,
  },
];

const whyCommunicationCards: Card[] = [
  {
    title: "Delayed Communication Costs Time",
    description:
      "When exam updates or admissions notices arrive late, staff spend more time answering repeated questions.",
    icon: <ClockIcon className="h-5 w-5" />,
  },
  {
    title: "Centralised Messaging Improves Trust",
    description:
      "A single dashboard makes communication more consistent and easier for recipients to follow.",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Written Records Reduce Confusion",
    description:
      "Email creates a useful record that can be referred to later instead of relying on memory or notice boards.",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Multiple Audiences Need Clear Targeting",
    description:
      "Students, parents, faculty and staff often need different information at different times.",
    icon: <Users className="h-5 w-5" />,
  },
];

const challengeCards: Card[] = [
  {
    title: "Scattered Communication",
    description: "Manual emails, notice boards and verbal updates make it hard to keep everyone aligned.",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "Time-Consuming Follow-Up",
    description: "Staff spend too much time repeating the same information to different groups.",
    icon: <ClockIcon className="h-5 w-5" />,
  },
  {
    title: "Audience Confusion",
    description: "When groups are mixed, students, parents and faculty can receive the wrong message.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Hard to Schedule",
    description: "Timed communication such as exam updates and fee reminders needs a reliable send plan.",
    icon: <CalendarClock className="h-5 w-5" />,
  },
  {
    title: "Low Visibility",
    description: "Without reports, administrators cannot easily know what was sent or what still needs follow-up.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Scaling Across Campuses",
    description: "Multi-campus institutions need a structured way to coordinate communication at scale.",
    icon: <Building2 className="h-5 w-5" />,
  },
];

const helpCards: LinkCard[] = [
  {
    title: "Centralised Dashboard",
    description: "Plan, send and track institutional communication from one organised platform.",
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: ROUTES.bulkEmailBroadcast,
  },
  {
    title: "Professional Templates",
    description: "Use reusable templates for notices, reminders and communication that stays on brand.",
    icon: <NotebookPen className="h-5 w-5" />,
    href: ROUTES.bulkEmailTemplates,
  },
  {
    title: "Audience Groups",
    description: "Send to students, parents, faculty or staff without mixing the recipient lists.",
    icon: <Users className="h-5 w-5" />,
    href: ROUTES.bulkEmailBroadcast,
  },
  {
    title: "Scheduling",
    description: "Prepare notices in advance and release them at the right time.",
    icon: <CalendarClock className="h-5 w-5" />,
    href: ROUTES.bulkEmailScheduling,
  },
  {
    title: "Delivery Reports",
    description: "See what was sent, what is queued and how communication performed.",
    icon: <MailCheck className="h-5 w-5" />,
    href: ROUTES.bulkEmailAnalytics,
  },
  {
    title: "SMTP Support",
    description: "Connect your own sending setup and keep the communication path controlled.",
    icon: <Workflow className="h-5 w-5" />,
    href: ROUTES.bulkEmailSmtp,
  },
];

const useCases: Card[] = [
  { title: "Admission Notices", description: "Send reminders and updates during the admission process.", icon: <GraduationCap className="h-5 w-5" /> },
  { title: "Exam Timetables", description: "Share important exam dates and schedule changes clearly.", icon: <CalendarClock className="h-5 w-5" /> },
  { title: "Parent Communication", description: "Keep parents informed about events, closures and student updates.", icon: <Users className="h-5 w-5" /> },
  { title: "Staff Circulars", description: "Send internal staff communication in a structured way.", icon: <FileText className="h-5 w-5" /> },
  { title: "Event Reminders", description: "Promote school events, meetings and activities on time.", icon: <Megaphone className="h-5 w-5" /> },
  { title: "Tracking & History", description: "Review what was sent and when for administrative clarity.", icon: <MailCheck className="h-5 w-5" /> },
  { title: "Workshop Invitations", description: "Invite students and faculty to workshops or skill sessions.", icon: <Sparkles className="h-5 w-5" /> },
  { title: "Scholarship Updates", description: "Inform eligible students about scholarship opportunities and deadlines.", icon: <Wallet className="h-5 w-5" /> },
  { title: "Library Notices", description: "Share due dates, new resources and policy changes.", icon: <BookOpen className="h-5 w-5" /> },
  { title: "Placement Drives", description: "Notify final-year students about upcoming placement drives.", icon: <BriefcaseBusiness className="h-5 w-5" /> },
  { title: "Faculty Meetings", description: "Send meeting invitations and agendas to faculty and coordinators.", icon: <Laptop className="h-5 w-5" /> },
  { title: "Parent-Teacher Communication", description: "Share meeting schedules and academic progress updates with parents.", icon: <Users className="h-5 w-5" /> },
];

const howItWorks: Step[] = [
  {
    step: "Step 1",
    title: "Create Communication Campaign",
    description: "Start a new campaign for the notice, reminder or invitation you want to send.",
  },
  {
    step: "Step 2",
    title: "Select the Audience",
    description: "Choose students, parents, faculty or staff groups so the right people receive the message.",
  },
  {
    step: "Step 3",
    title: "Choose Email Template",
    description: "Pick a professional email template suited to the communication type.",
  },
  {
    step: "Step 4",
    title: "Schedule or Send Instantly",
    description: "Send immediately or schedule for a specific date and time.",
  },
  {
    step: "Step 5",
    title: "Track Delivery",
    description: "Monitor delivery reports to see how many emails were successfully delivered.",
  },
  {
    step: "Step 6",
    title: "Review Analytics",
    description: "Use the analytics dashboard to review performance and improve future communication.",
  },
];

const benefitCards: Card[] = [
  { title: "Centralised Control", description: "Manage all institutional email communication from one place.", icon: <LayoutDashboard className="h-5 w-5" /> },
  { title: "Timely Delivery", description: "Schedule notices so students and parents get the message at the right time.", icon: <CalendarClock className="h-5 w-5" /> },
  { title: "Professional Messaging", description: "Maintain a credible institutional image across every email.", icon: <ShieldCheck className="h-5 w-5" /> },
  { title: "Audience Accuracy", description: "Send the right message to the right group without mixing lists.", icon: <Users className="h-5 w-5" /> },
  { title: "Reduced Manual Work", description: "Save staff time by eliminating repetitive, one-by-one emailing.", icon: <ClockIcon className="h-5 w-5" /> },
  { title: "Visible Reporting", description: "Review delivery reports and campaign history whenever needed.", icon: <BarChart3 className="h-5 w-5" /> },
  { title: "Scalable Process", description: "Support a single campus or a multi-campus institution with the same workflow.", icon: <Workflow className="h-5 w-5" /> },
  { title: "Better Coordination", description: "Keep academic and administrative communication aligned across departments.", icon: <Building2 className="h-5 w-5" /> },
];

const audienceCards: Card[] = [
  { title: "Schools", description: "Share notices, timetable changes and parent updates.", icon: <GraduationCap className="h-5 w-5" /> },
  { title: "Colleges", description: "Manage admissions, exam schedules and departmental notices.", icon: <Building2 className="h-5 w-5" /> },
  { title: "Universities", description: "Coordinate communication across departments and campuses.", icon: <Layers3 className="h-5 w-5" /> },
  { title: "Coaching Centres", description: "Send class schedules, test dates and result updates.", icon: <NotebookPen className="h-5 w-5" /> },
  { title: "Training Institutes", description: "Keep batches informed about schedules and certification updates.", icon: <Smartphone className="h-5 w-5" /> },
  { title: "Admissions Teams", description: "Inform applicants about steps, deadlines and confirmations.", icon: <ClipboardList className="h-5 w-5" /> },
  { title: "Faculty Coordinators", description: "Send academic circulars and meeting notices.", icon: <Laptop className="h-5 w-5" /> },
  { title: "Administration Teams", description: "Manage campus-wide notices and internal coordination.", icon: <BriefcaseBusiness className="h-5 w-5" /> },
];

const whyCards: Card[] = [
  { title: "Simple To Use", description: "Academic and admin staff can manage campaigns without technical assistance.", icon: <Lightbulb className="h-5 w-5" /> },
  { title: "Built For Education", description: "The workflow matches the way schools, colleges and institutes communicate.", icon: <GraduationCap className="h-5 w-5" /> },
  { title: "Scheduling Support", description: "Prepare communication in advance for exams, admissions and events.", icon: <CalendarClock className="h-5 w-5" /> },
  { title: "Delivery Reports", description: "See how campaigns performed and what needs follow-up.", icon: <BarChart3 className="h-5 w-5" /> },
  { title: "Reusable Templates", description: "Keep communication consistent and professional across every department.", icon: <NotebookPen className="h-5 w-5" /> },
  { title: "SMTP Ready", description: "Use your institution’s own SMTP settings for controlled sending.", icon: <Workflow className="h-5 w-5" /> },
  { title: "Multi-Campus Friendly", description: "Coordinate updates across campuses, branches and departments.", icon: <Building2 className="h-5 w-5" /> },
  { title: "Works At Scale", description: "Handle both day-to-day notices and larger institution-wide campaigns.", icon: <Sparkles className="h-5 w-5" /> },
];

const bestPractices: Card[] = [
  { title: "Use Clear Subject Lines", description: "Write subject lines that immediately tell recipients what the email is about.", icon: <FileText className="h-5 w-5" /> },
  { title: "Organise Recipient Lists", description: "Keep separate lists for students, parents, faculty and alumni.", icon: <Users className="h-5 w-5" /> },
  { title: "Schedule Important Notices", description: "Plan time-sensitive notices well in advance instead of sending last-minute messages.", icon: <CalendarClock className="h-5 w-5" /> },
  { title: "Use Professional Templates", description: "Rely on consistent templates for a credible and organised image.", icon: <NotebookPen className="h-5 w-5" /> },
  { title: "Review Campaign Reports", description: "Check reports and analytics to understand performance and improve future communication.", icon: <BarChart3 className="h-5 w-5" /> },
  { title: "Communicate Consistently", description: "Keep a regular rhythm so students, parents and staff know what to expect.", icon: <Workflow className="h-5 w-5" /> },
  { title: "Protect Student Information", description: "Limit access to contact data and keep it handled responsibly.", icon: <ShieldCheck className="h-5 w-5" /> },
  { title: "Maintain Accurate Records", description: "Update contact lists regularly so important communication reaches the right people.", icon: <ClipboardList className="h-5 w-5" /> },
];

const faqItems: Faq[] = [
  {
    q: "What is education email communication software?",
    a: "It is a platform that allows schools, colleges and universities to send organised, professional emails to students, parents, faculty and staff from one central system.",
  },
  {
    q: "Can schools send announcements to all students?",
    a: "Yes. Schools can broadcast announcements such as holidays, events or important notices to all students or to selected groups.",
  },
  {
    q: "Can colleges schedule admission updates?",
    a: "Yes. Colleges can schedule admission-related updates in advance so applicants receive information on time.",
  },
  {
    q: "Can universities send department-wise emails?",
    a: "Yes. Universities can organise recipients by department so academic circulars or exam notifications reach the right people.",
  },
  {
    q: "How do delivery reports help administrators?",
    a: "Delivery reports show whether a campaign reached recipients and help administrators know if a message needs follow-up.",
  },
  {
    q: "Can institutions create reusable templates?",
    a: "Yes. Institutions can create and reuse professional templates for recurring communication like fee reminders or event invitations.",
  },
  {
    q: "Can I communicate with parents and faculty separately?",
    a: "Yes. Recipient groups can be organised separately so each audience receives only the relevant communication.",
  },
  {
    q: "Is this suitable for multi-campus institutions?",
    a: "Yes. Multi-campus institutions can coordinate communication across all locations from a single dashboard.",
  },
  {
    q: "Can coaching centres use Altroz Bulk Email?",
    a: "Yes. Coaching centres can use it to inform students and parents about class schedules, test dates and results.",
  },
  {
    q: "How does campaign scheduling work?",
    a: "You prepare a campaign in advance and set a date and time for it to be sent automatically.",
  },
  {
    q: "Can training institutes send batch-wise communication?",
    a: "Yes. Training institutes can organise learners into batches and send targeted schedules or updates to each group.",
  },
  {
    q: "Can Altroz Bulk Email be used for alumni communication?",
    a: "Yes. Institutions can send newsletters and updates to alumni to maintain long-term engagement.",
  },
  {
    q: "Does the platform support academic calendar announcements?",
    a: "Yes. Institutions can share academic calendars, semester start dates and other important timelines.",
  },
  {
    q: "Can placement cells use this platform for recruitment updates?",
    a: "Yes. Placement cells can notify students about placement drives, company visits and schedules.",
  },
  {
    q: "Is technical knowledge required to use Altroz Bulk Email?",
    a: "No. The platform is designed with a simple interface so staff can create and manage campaigns without technical expertise.",
  },
  {
    q: "Can institutions track past communication history?",
    a: "Yes. Campaign history lets administrators review what was communicated and when it was sent.",
  },
  {
    q: "Can emergency notifications be sent through this platform?",
    a: "Yes. Time-sensitive or emergency notifications can be sent to the whole institution or selected groups.",
  },
  {
    q: "Does Altroz Bulk Email support SMTP configuration?",
    a: "Yes. Institutions can configure their own SMTP settings and send email through their existing infrastructure.",
  },
  {
    q: "Can this platform help reduce administrative workload?",
    a: "Yes. By centralising communication, the platform helps staff save time on repetitive manual emailing.",
  },
  {
    q: "How can our institution get started with Altroz Bulk Email?",
    a: "Book a free demo to see how the platform works and how it can be configured for your institution’s communication needs.",
  },
];

export default function BulkEmailEducationPage() {
  return (
    <div className="bulk-email-theme min-h-screen bg-gradient-to-b from-white via-[#f6faff] to-[#fff7ef]">
      <PageSEO
        title="Education Email Communication Software for Schools, Colleges, and Universities | Altroz Bulk Email"
        description="Altroz Bulk Email helps schools, colleges, universities and training institutes send notices, exam updates and parent communication from one centralised platform."
        canonicalPath={ROUTES.bulkEmailEducation}
      />
      <style>{`
        @keyframes educationWordRise {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bulk-email-animated-title span {
            animation: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
      <BulkEmailNavbar />

      <main className="overflow-hidden">
        <section className="hero-gradient education-hero relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-[#1d4ed8]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-[#d97706]/10 blur-3xl" />

          <div className="site-container">
            <div className="mx-auto max-w-7xl">
              <ScrollReveal variant="fade-up" className="mx-auto max-w-5xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#1d4ed8]/20 bg-gradient-to-r from-white via-[#eff6ff] to-[#fff7ef] px-4 py-2 text-xs font-extrabold tracking-normal text-[#1d4ed8] shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  Education Communication Platform
                </div>

                <AnimatedTitle
                  as="h1"
                  className="mx-auto mt-4 max-w-6xl text-4xl sm:text-5xl lg:text-[4.15rem]"
                >
                  Education Email Communication Software for Schools, Colleges, and Universities
                </AnimatedTitle>

                <p className="mx-auto mt-5 max-w-4xl text-base leading-7 text-ink-soft sm:text-lg">
                  Give educational institutes one organised place to send admission updates, exam
                  notices, timetable reminders and parent communication.
                </p>
              </ScrollReveal>

              <div className="mt-10 grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
                <ScrollReveal variant="fade-up" className="text-center lg:text-left">
                  <h2 className="mx-auto max-w-4xl text-2xl font-semibold tracking-tight text-[#1d4ed8] sm:text-3xl lg:mx-0">
                    Simplify Communication Across Your Institution
                  </h2>

                  <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg lg:mx-0">
                    Altroz Bulk Email helps schools, colleges, universities, coaching centres and training
                    institutes reach students, parents, faculty and staff through one centralised,
                    professional email communication platform. From admission updates to exam
                    notifications, fee reminders and campus announcements, communication stays organised,
                    timely and easy to manage.
                  </p>

                  <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg lg:mx-0">
                    Whether you are running a single campus or coordinating communication across multiple
                    departments and locations, Altroz Bulk Email gives your administration team a simple
                    way to plan, schedule, send and track every email that goes out to your institution's
                    community.
                  </p>

                  <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                    <Link to={ROUTES.bulkEmailBookDemo} className="btn-primary">
                      Book Free Demo
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a href="#what-you-can-learn" className="btn-outline">
                      Explore Features
                    </a>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-ink-soft lg:justify-start">
                    <Link to={ROUTES.home} className="font-semibold text-[#1d4ed8] hover:underline">
                      Home
                    </Link>
                    <span>/</span>
                    <Link to={ROUTES.bulkEmail} className="font-semibold text-[#1d4ed8] hover:underline">
                      Bulk Email
                    </Link>
                    <span>/</span>
                    <span className="font-semibold text-[#b45309]">Education</span>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {heroCards.map((card, index) => (
                      <ScrollReveal key={card.title} variant="fade-up" delay={70 + index * 40}>
                        <article className="soft-card flex h-full flex-col p-4 text-left transition-transform duration-300 hover:-translate-y-1">
                          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                            {card.icon}
                          </span>
                          <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                        </article>
                      </ScrollReveal>
                    ))}
                  </div>
                </ScrollReveal>

                <ScrollReveal variant="scale" className="relative">
                  <EducationDashboardMock />
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        <section id="why-communication-matters" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Why Communication Matters in Education"
              title="Good communication is the backbone of every educational institution"
              description="Admissions, academics, administration, parents and students all depend on timely and clear communication to keep the institution running smoothly."
              center
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1fr] lg:items-start">
              <div className="grid gap-4">
                {whyCommunicationCards.map((card, index) => (
                  <ScrollReveal key={card.title} variant="fade-up" delay={index * 40}>
                    <article className="soft-card h-full p-5">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                        {card.icon}
                      </span>
                      <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                    </article>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal variant="fade-left" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#b45309]">
                  The Cost of Delayed Communication
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  One missed notice can create confusion across thousands of people
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  A college change in exam schedule shared only through notice boards or word of mouth
                  can easily be missed. That leads to complaints, repeated questions and extra workload
                  for staff who have to answer the same query again and again.
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    "Admission offices need to inform applicants quickly.",
                    "Academic teams need to share timetables and exam schedules.",
                    "Administrators need to send fee reminders and circulars.",
                    "Parents need updates on attendance, results and school events.",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-xl bg-white p-3 text-sm font-medium text-ink shadow-sm">
                      <CheckCircle2 className="h-4 w-4 text-[#d97706]" />
                      {item}
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="challenges" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Communication Challenges"
              title="The communication problems educational institutions face every day"
              description="Manual and disconnected methods make it harder to keep notices timely, accurate and easy to track."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {challengeCards.map((card) => (
                <article key={card.title} className="soft-card h-full p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                    {card.icon}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="how-it-helps" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="How Altroz Bulk Email Helps"
              title="Altroz Bulk Email brings all institutional communication into one platform"
              description="This section shows how the platform simplifies planning, sending and tracking communication for education teams."
              center
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {helpCards.map((card) => (
                <MaybeLink
                  key={card.title}
                  href={card.href}
                  className="soft-card group flex h-full flex-col p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm transition-transform duration-300 group-hover:scale-105">
                    {card.icon}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                  {card.linkLabel ? (
                    <div className="mt-auto pt-5 text-sm font-semibold text-[#1d4ed8]">
                      Learn more: {card.linkLabel}
                      <ArrowRight className="ml-1 inline-block h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  ) : null}
                </MaybeLink>
              ))}
            </div>
          </div>
        </section>

        <section id="education-use-cases" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Education Use Cases"
              title="Common ways schools, colleges and institutes use bulk email"
              description="These scenarios show how the platform fits into daily academic and administrative life."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {useCases.map((card) => (
                <article key={card.title} className="soft-card group h-full p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] transition-transform duration-300 group-hover:scale-105">
                    {card.icon}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="how-it-works" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="How It Works"
              title="A clean workflow for institutes and schools"
              description="The process keeps communication organised from creation through delivery."
              center
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {howItWorks.map((step, index) => (
                <ScrollReveal key={step.step} variant="fade-up" delay={index * 40}>
                  <article className="soft-card relative h-full p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-gradient-to-r from-[#1d4ed8]/12 via-white to-[#d97706]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1d4ed8]">
                        {step.step}
                      </span>
                      <span className="rounded-full bg-surface px-2 py-1 text-[10px] font-semibold text-ink-soft">
                        {index + 1}/6
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{step.description}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="benefits" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Benefits"
              title="Benefits for educational institutions"
              description="A centralised communication flow helps institutions save time, improve clarity and communicate with confidence."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {benefitCards.map((card) => (
                <article key={card.title} className="soft-card h-full p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                    {card.icon}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="who-can-use" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Who Can Use This Solution"
              title="Designed for the teams that manage education communication"
              description="From admissions to administration, these teams can all benefit from a more structured sending workflow."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {audienceCards.map((card) => (
                <article key={card.title} className="soft-card group h-full p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] transition-transform duration-300 group-hover:scale-105">
                    {card.icon}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="why-choose" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Why Choose Altroz Bulk Email"
              title="Why educational institutions choose a centralised solution"
              description="The platform combines simplicity, reporting and scheduling so education teams can communicate with confidence."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {whyCards.map((card) => (
                <article key={card.title} className="soft-card h-full p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                    {card.icon}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="best-practices" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Best Practices"
              title="Simple recommendations for better educational email communication"
              description="These practical tips help institutions keep messages useful, consistent and easy to act on."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {bestPractices.map((card) => (
                <article key={card.title} className="soft-card h-full p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                    {card.icon}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="faq" className="section bg-white scroll-mt-24">
          <div className="site-container grid gap-6 lg:grid-cols-12 lg:items-start">
            <ScrollReveal variant="fade-up" className="lg:col-span-4">
              <SectionHeading
                eyebrow="Frequently Asked Questions"
                title="Answers for schools and institutes planning communication"
                description="These questions help the page feel complete and easy to understand."
              />

              <div className="soft-card mt-5 p-5">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#b45309]">
                  Ready to begin?
                </div>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  Bring notices, reminders, staff circulars and parent updates into one simple bulk email workflow.
                </p>
                <div className="button-group mt-5">
                  <Link to={ROUTES.bulkEmailBookDemo} className="btn-primary">
                    Book Free Demo
                  </Link>
                  <Link to={ROUTES.bulkEmailContact} className="btn-ghost">
                    Talk to Our Experts
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={80} className="lg:col-span-8">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={item.q}
                    value={`faq-${index}`}
                    className="overflow-hidden rounded-[1.25rem] border border-border bg-white px-4 shadow-card"
                  >
                    <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink no-underline hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pt-0 text-sm leading-6 text-ink-soft">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          </div>
        </section>

        <section className="cta-section bg-white scroll-mt-24">
          <div className="site-container">
            <ScrollReveal
              variant="scale"
              className="cta-box relative overflow-hidden bg-gradient-to-br from-[#1d4ed8] to-[#d97706] text-center"
            >
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#d97706]/18 blur-3xl" />
              <div className="relative">
                <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white md:text-5xl">
                  Transform Educational Communication with Altroz Bulk Email
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-white/80">
                  Keep students, parents, faculty and staff informed with professional, organised and timely email communication through one centralised platform.
                </p>
                <div className="button-group mt-7 justify-center">
                  <Link
                    to={ROUTES.bulkEmailBookDemo}
                    className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-[#1d4ed8] transition-colors hover:bg-[#fffbf4]"
                  >
                    Book Free Demo
                  </Link>
                  <Link
                    to={ROUTES.bulkEmailContact}
                    className="inline-flex items-center rounded-lg border border-white/25 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    Talk to Our Experts
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 8v4l2.5 1.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
