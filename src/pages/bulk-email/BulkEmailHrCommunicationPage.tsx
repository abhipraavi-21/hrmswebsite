import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Banknote,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Factory,
  FileText,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  Laptop,
  MailCheck,
  Megaphone,
  MessageSquareMore,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingUp,
  Truck,
  Users,
  Workflow,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Footer from "@/components/site/Footer";
import BulkEmailNavbar from "@/components/site/BulkEmailNavbar";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import PageSEO from "@/components/site/PageSEO";
import { ROUTES } from "@/routes/routeConfig.js";
import { cn } from "@/lib/utils";

type Stat = {
  label: string;
  value: string;
  note: string;
  icon: LucideIcon;
};

type Card = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type LinkCard = Card & {
  benefit: string;
  href: string;
  linkLabel: string;
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
      className={cn(
        "bulk-email-animated-title mx-auto font-black leading-[1.03] tracking-[-0.04em] text-ink",
        className,
      )}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block text-ink"
          style={{
            animation: "bulkEmailHrWordRise 0.55s ease-out both",
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

function SectionHeading({
  eyebrow,
  title,
  summary,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  summary: string;
  align?: "center" | "left";
}) {
  return (
    <ScrollReveal
      variant="fade-up"
      className={cn(
        "space-y-3",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-4xl text-left",
      )}
    >
      <span className="eyebrow text-xs font-bold uppercase tracking-[0.28em] text-[#b45309]">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">{title}</h2>
      <p className="text-ink-soft sm:text-lg">{summary}</p>
    </ScrollReveal>
  );
}

const heroStats: Stat[] = [
  {
    label: "Policies Sent",
    value: "128",
    note: "Internal updates delivered with confidence",
    icon: FileText,
  },
  {
    label: "Teams Covered",
    value: "24",
    note: "Departments aligned in one workflow",
    icon: Users,
  },
  {
    label: "Delivery Tracking",
    value: "Live",
    note: "Monitor employee communication status",
    icon: MailCheck,
  },
  {
    label: "Scheduled Updates",
    value: "36",
    note: "Announcements prepared in advance",
    icon: CalendarClock,
  },
];

const whatIsCards: Card[] = [
  {
    title: "What HR Communication Means",
    description:
      "HR communication is the way an organisation shares information with its employees, including announcements, policy updates, onboarding, notices and day-to-day operational updates.",
    icon: MessageSquareMore,
  },
  {
    title: "Why It Matters",
    description:
      "Employees who receive timely, clear and consistent communication tend to feel more engaged and better connected to the organisation.",
    icon: CheckCircle2,
  },
  {
    title: "Why Manual Email Falls Short",
    description:
      "Many organisations still depend on scattered personal inboxes and informal channels, which becomes hard to manage as the business grows.",
    icon: Workflow,
  },
  {
    title: "Why Centralised Email Helps",
    description:
      "A centralised email communication approach makes it easier to reach the right employees at the right time with a consistent and professional message.",
    icon: LayoutDashboard,
  },
];

const challengeCards: Card[] = [
  {
    title: "Scattered Communication",
    description:
      "Important messages get spread across personal inboxes, chat threads and ad hoc follow-ups.",
    icon: MessageSquareMore,
  },
  {
    title: "Inconsistent Messaging",
    description:
      "Different people may send slightly different versions of the same HR update or notice.",
    icon: FileText,
  },
  {
    title: "Hard to Schedule",
    description:
      "Planned communication such as holidays or policy updates is easy to miss without a workflow.",
    icon: CalendarClock,
  },
  {
    title: "No Clear Visibility",
    description:
      "Without tracking, HR teams cannot easily see what was sent, when it was sent or to whom.",
    icon: BarChart3,
  },
  {
    title: "Branch Complexity",
    description:
      "Multiple departments, shifts and office locations make manual coordination even harder.",
    icon: Building2,
  },
  {
    title: "Manual Follow-Up",
    description:
      "Teams spend extra time repeating information, checking replies and chasing acknowledgements.",
    icon: Clock3,
  },
];

const helpCards: LinkCard[] = [
  {
    title: "Centralised Broadcasts",
    description:
      "Altroz Bulk Email brings HR communication into one organised dashboard so messages are easier to plan and release.",
    benefit: "Move away from scattered personal inboxes.",
    href: ROUTES.bulkEmailBroadcast,
    linkLabel: "Email Broadcast",
    icon: Megaphone,
  },
  {
    title: "Professional Templates",
    description:
      "Use reusable templates so policy updates, onboarding notes and internal circulars stay consistent.",
    benefit: "Keep every HR message professional and on brand.",
    href: ROUTES.bulkEmailTemplates,
    linkLabel: "Email Templates",
    icon: Sparkles,
  },
  {
    title: "Scheduling and Planning",
    description:
      "Prepare messages early and send them at the right date and time for planned communication.",
    benefit: "Perfect for holiday notices and recurring reminders.",
    href: ROUTES.bulkEmailScheduling,
    linkLabel: "Email Scheduling",
    icon: CalendarClock,
  },
  {
    title: "Delivery Visibility",
    description:
      "Track whether internal communication was sent and monitor status from one dashboard.",
    benefit: "See what was delivered without manual follow-up.",
    href: ROUTES.bulkEmailAnalytics,
    linkLabel: "Email Analytics",
    icon: MailCheck,
  },
  {
    title: "Secure Sending",
    description:
      "Connect your server settings so internal communication uses a controlled and trusted sending path.",
    benefit: "Support sender trust and delivery reliability.",
    href: ROUTES.bulkEmailSmtp,
    linkLabel: "SMTP Configuration",
    icon: ShieldCheck,
  },
  {
    title: "One Place to Work",
    description:
      "HR teams can prepare, schedule, send and track communication without switching tools.",
    benefit: "Keep the whole workflow simple and visible.",
    href: ROUTES.bulkEmailBroadcast,
    linkLabel: "Email Broadcast",
    icon: LayoutDashboard,
  },
];

const workflowSteps: Step[] = [
  {
    step: "Step 1",
    title: "Create HR Announcement",
    description:
      "Prepare the policy update, holiday notice or onboarding email using a professional template.",
  },
  {
    step: "Step 2",
    title: "Choose Employee Group",
    description:
      "Select the right audience, such as the entire organisation, a department or a branch location.",
  },
  {
    step: "Step 3",
    title: "Schedule or Send Immediately",
    description:
      "Choose immediate delivery or schedule the message for a specific time when the audience needs it.",
  },
  {
    step: "Step 4",
    title: "Track Delivery",
    description:
      "After sending, review delivery reports to see how the campaign performed.",
  },
  {
    step: "Step 5",
    title: "Review Reports",
    description:
      "Check campaign history and analytics at any time for a central record of employee communication.",
  },
];

const useCases: Card[] = [
  {
    title: "Policy Changes",
    description: "Share updated policies so employees always have the latest information.",
    icon: FileText,
  },
  {
    title: "Onboarding",
    description: "Guide new joiners through their first days with a consistent welcome flow.",
    icon: Users,
  },
  {
    title: "Holiday Notices",
    description: "Send holiday schedules, office closures and reminders in advance.",
    icon: CalendarClock,
  },
  {
    title: "Payroll Alerts",
    description: "Notify teams about pay dates, document updates and required actions.",
    icon: Clock3,
  },
  {
    title: "Town Hall Updates",
    description: "Broadcast leadership communication before and after company meetings.",
    icon: Megaphone,
  },
  {
    title: "Training Invitations",
    description: "Invite employees to workshops, sessions and internal learning programmes.",
    icon: GraduationCap,
  },
  {
    title: "Acknowledgement Tracking",
    description: "Keep an eye on which employee messages were sent and reviewed.",
    icon: MailCheck,
  },
  {
    title: "Employee Engagement",
    description: "Send appreciation messages, festival wishes and birthday or anniversary greetings.",
    icon: Sparkles,
  },
];

const benefitCards: Card[] = [
  {
    title: "Save Time",
    description:
      "Reduce manual effort by planning and sending communication from one organised workflow.",
    icon: TrendingUp,
  },
  {
    title: "Maintain Consistency",
    description:
      "Keep employee messages aligned with templates, scheduling and centralised delivery control.",
    icon: FileText,
  },
  {
    title: "Reach the Right People",
    description:
      "Send company-wide messages or target specific employee groups when the update is selective.",
    icon: Users,
  },
  {
    title: "Improve Visibility",
    description:
      "Know what went out, when it went out and how it performed using delivery reports and history.",
    icon: BarChart3,
  },
  {
    title: "Improve Engagement",
    description:
      "Communicate more clearly and more often without losing control of the process.",
    icon: Megaphone,
  },
  {
    title: "Support Branches",
    description:
      "Keep multi-location updates coordinated across departments, shifts and office branches.",
    icon: Building2,
  },
  {
    title: "Protect Professionalism",
    description:
      "Send employee communication through a polished, centralised platform instead of ad hoc messages.",
    icon: ShieldCheck,
  },
  {
    title: "Scale Confidently",
    description:
      "Use the same communication flow as your organisation grows in size or complexity.",
    icon: LayoutDashboard,
  },
];

const audienceCards: Card[] = [
  {
    title: "SMEs",
    description:
      "Growing businesses that need a practical, easy way to keep every employee informed.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Enterprises",
    description:
      "Large organisations that need structured communication across multiple teams and branches.",
    icon: Building2,
  },
  {
    title: "Manufacturing",
    description:
      "Use scheduled notices and internal updates for plant locations, shifts and supplier-related communication.",
    icon: Factory,
  },
  {
    title: "Healthcare",
    description:
      "Keep staff informed with reminders, policy updates and operational notices.",
    icon: HeartPulse,
  },
  {
    title: "Education",
    description:
      "Share circulars, faculty notices and internal information with school or college teams.",
    icon: GraduationCap,
  },
  {
    title: "Retail",
    description:
      "Coordinate store teams, holiday schedules and business updates across locations.",
    icon: Store,
  },
  {
    title: "Logistics",
    description:
      "Keep distributed teams aligned with route updates, notices and shift communication.",
    icon: Truck,
  },
  {
    title: "IT & Offices",
    description:
      "Send operational updates, onboarding notes and company-wide announcements from one place.",
    icon: Laptop,
  },
  {
    title: "Finance",
    description:
      "Maintain consistent communication for policy changes, payroll updates and internal notices.",
    icon: Banknote,
  },
];

const whyCards: Card[] = [
  {
    title: "One Centralised Dashboard",
    description:
      "Plan, send and track employee communication from one clean bulk email platform.",
    icon: LayoutDashboard,
  },
  {
    title: "Professional Communication",
    description:
      "Keep employee messages clear, timely and consistent across the organisation.",
    icon: MailCheck,
  },
  {
    title: "Scheduling and Tracking",
    description:
      "Prepare messages ahead of time and monitor delivery after they go out.",
    icon: CalendarClock,
  },
  {
    title: "Templates and Organisation",
    description:
      "Use reusable templates so HR announcements stay structured and easy to send again.",
    icon: Sparkles,
  },
  {
    title: "Secure Sending Path",
    description:
      "Use SMTP configuration so the sending path stays controlled and trusted.",
    icon: ShieldCheck,
  },
  {
    title: "Built for Scale",
    description:
      "Support SMEs and enterprises with the same communication system as they grow.",
    icon: TrendingUp,
  },
];

const faqs: Faq[] = [
  {
    q: "What is HR communication software?",
    a: "HR communication software is a platform that lets HR teams plan, send, schedule and track communication with employees from one centralised system.",
  },
  {
    q: "Why do businesses need HR communication software?",
    a: "As organisations grow, manual email becomes time-consuming and inconsistent. HR communication software keeps messaging organised and easier to manage.",
  },
  {
    q: "How can HR communicate with employees using Altroz Bulk Email?",
    a: "HR can create an announcement, choose the employee group and send it immediately or schedule it for later.",
  },
  {
    q: "Can HR send company-wide announcements through Altroz Bulk Email?",
    a: "Yes. HR teams can broadcast announcements to the entire organisation at once.",
  },
  {
    q: "Can I schedule HR announcements in advance?",
    a: "Yes. Altroz Bulk Email allows you to schedule announcements for a future date and time.",
  },
  {
    q: "Can I send policy updates to employees?",
    a: "Yes. Policy updates can be shared using structured email templates so the message stays consistent.",
  },
  {
    q: "Can I send onboarding emails to new employees?",
    a: "Yes. HR can use Altroz Bulk Email to send welcome emails and onboarding information to new joiners.",
  },
  {
    q: "How do delivery reports work in Altroz Bulk Email?",
    a: "After a campaign is sent, HR can view delivery reports inside the dashboard to understand the communication activity.",
  },
  {
    q: "Can I send department-wise emails?",
    a: "Yes. You can choose specific employee groups, such as a department, instead of sending to the entire organisation every time.",
  },
  {
    q: "Is HR communication software suitable for businesses with multiple branches?",
    a: "Yes. Organisations with multiple offices or branches can use Altroz Bulk Email for location-specific or company-wide communication.",
  },
  {
    q: "Can Altroz Bulk Email be used for holiday and leave notifications?",
    a: "Yes. HR teams commonly use it to inform employees about holidays, office closures and changes to working days.",
  },
  {
    q: "Does Altroz Bulk Email support email templates for HR use?",
    a: "Yes. The platform provides reusable templates that HR teams can customise for announcements, circulars and onboarding emails.",
  },
  {
    q: "Can I track how many employees received an HR announcement?",
    a: "Yes. Delivery reports and campaign history provide a clear view of communication activity.",
  },
  {
    q: "Is Altroz Bulk Email suitable for small and medium businesses?",
    a: "Yes. It is designed for both growing SMEs and larger enterprises.",
  },
  {
    q: "Can HR use Altroz Bulk Email for training invitations?",
    a: "Yes. HR teams can send invitations for training sessions, workshops and internal learning programmes.",
  },
  {
    q: "What kind of businesses can use Altroz Bulk Email for HR communication?",
    a: "Industries like manufacturing, healthcare, education, retail, logistics, IT and corporate offices can all use it.",
  },
  {
    q: "Can I review past HR communication sent to employees?",
    a: "Yes. Campaign history provides a centralised record of past communication.",
  },
  {
    q: "Does Altroz Bulk Email require technical knowledge to use?",
    a: "No. It is designed with a simple dashboard so HR professionals can create and send communication without technical support.",
  },
  {
    q: "Can Altroz Bulk Email help with employee engagement communication?",
    a: "Yes. HR teams can send appreciation messages, festival wishes and similar engagement-focused communication.",
  },
  {
    q: "How do I get started with Altroz Bulk Email for HR communication?",
    a: "You can book a free demo to see how the platform works and discuss setup for your organisation's HR communication needs.",
  },
];

export default function BulkEmailHrCommunicationPage() {
  return (
    <div className="bulk-email-theme min-h-screen bg-gradient-to-b from-white via-[#f6faff] to-[#fff7ef]">
      <PageSEO
        title="HR Communication Software for Centralised Employee Communication | Altroz Bulk Email"
        description="Altroz Bulk Email helps HR teams send company announcements, policy updates, onboarding emails and internal circulars from one centralised dashboard."
        canonicalPath={ROUTES.bulkEmailHrCommunication}
      />
      <style>{`
        @keyframes bulkEmailHrWordRise {
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
        <section className="hero-gradient hr-communication-hero relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-[#1d4ed8]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-[#d97706]/10 blur-3xl" />

          <div className="site-container">
            <div className="mx-auto max-w-7xl">
              <ScrollReveal variant="fade-up" className="mx-auto max-w-5xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#1d4ed8]/20 bg-gradient-to-r from-white via-[#eff6ff] to-[#fff7ef] px-4 py-2 text-xs font-extrabold tracking-normal text-[#1d4ed8] shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  HR Communication Software
                </div>

                <AnimatedTitle
                  as="h1"
                  className="mx-auto mt-4 max-w-6xl text-4xl sm:text-5xl lg:text-[4.15rem]"
                >
                  HR Communication Software for Centralised Employee Communication
                </AnimatedTitle>

                <h2 className="mx-auto mt-4 max-w-4xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  Simplify HR Communication. Keep Every Employee Informed.
                </h2>

                <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg">
                  Altroz Bulk Email helps HR teams and business owners send company announcements,
                  policy updates, onboarding emails, holiday notices and internal circulars from one
                  centralised dashboard.
                </p>
              </ScrollReveal>

              <div className="mt-10 grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
                <ScrollReveal variant="fade-up" className="text-center lg:text-left">
                  <p className="mx-auto max-w-3xl text-base leading-7 text-ink-soft sm:text-lg lg:mx-0">
                    Instead of managing employee communication through scattered personal inboxes, HR
                    teams can plan, schedule, send and track every message from a single professional
                    platform. Whether you are a growing SME or a large enterprise with multiple branches,
                    Altroz Bulk Email gives your HR department a reliable way to reach every employee
                    group with consistent, timely and well-organised communication.
                  </p>

                  <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                    <Link to={ROUTES.bulkEmailBookDemo} className="btn-primary">
                      Book Free Demo
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a href="#features" className="btn-outline">
                      Explore Features
                    </a>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-ink-soft lg:justify-start">
                    <span className="font-semibold text-ink">Home</span>
                    <span>/</span>
                    <Link to={ROUTES.bulkEmail} className="font-semibold text-[#1d4ed8] hover:underline">
                      Bulk Email
                    </Link>
                    <span>/</span>
                    <span className="font-semibold text-[#b45309]">HR Communication</span>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {heroStats.map((stat, index) => (
                      <ScrollReveal key={stat.label} variant="fade-up" delay={80 + index * 45}>
                        <article className="soft-card h-full p-4 text-left">
                          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                            <stat.icon className="h-5 w-5" />
                          </span>
                          <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#b45309]">
                            {stat.label}
                          </div>
                          <div className="mt-2 text-2xl font-black tracking-tight text-ink">
                            {stat.value}
                          </div>
                          <p className="mt-1 text-sm leading-6 text-ink-soft">{stat.note}</p>
                        </article>
                      </ScrollReveal>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[1.5rem] border border-[#1d4ed8]/10 bg-white/90 p-4 shadow-card">
                    <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#b45309]">
                      Related Tools
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        ["Email Broadcast", ROUTES.bulkEmailBroadcast],
                        ["Email Templates", ROUTES.bulkEmailTemplates],
                        ["Email Analytics", ROUTES.bulkEmailAnalytics],
                        ["Email Scheduling", ROUTES.bulkEmailScheduling],
                        ["SMTP Configuration", ROUTES.bulkEmailSmtp],
                        ["Pricing", ROUTES.bulkEmailPricing],
                        ["About Us", ROUTES.bulkEmailAbout],
                        ["Contact Us", ROUTES.bulkEmailContact],
                      ].map(([label, href]) => (
                        <Link
                          key={label}
                          to={href as string}
                          className="rounded-full border border-[#1d4ed8]/15 bg-[#1d4ed8]/5 px-3 py-1.5 text-xs font-semibold text-[#1d4ed8] transition-colors hover:bg-[#1d4ed8]/10"
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal variant="scale" className="relative">
                  <div className="dashboard-glow left-1/2 top-10 -translate-x-1/2" />
                  <div className="soft-card relative overflow-hidden rounded-[2rem] border border-border bg-white/95 p-5 shadow-float">
                    <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#b45309]">
                          HR Communication Dashboard
                        </div>
                        <div className="mt-1 text-lg font-semibold text-ink">
                          Employee group selection and delivery reports
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-end gap-2">
                        {["Company-wide", "Department", "Branch location"].map((chip) => (
                          <span
                            key={chip}
                            className="rounded-full bg-[#1d4ed8]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1d4ed8]"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 grid gap-4 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
                      <div className="h-fit self-start rounded-[1.5rem] bg-gradient-to-br from-[#1d4ed8]/6 via-white to-[#d97706]/6 p-5">
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#1d4ed8]">
                          Announcement Composer
                        </div>
                        <div className="mt-3 rounded-2xl bg-white p-4 shadow-sm">
                          <div className="text-sm font-semibold text-ink">
                            Policy Update: Work-from-home policy changes
                          </div>
                          <p className="mt-2 text-sm leading-6 text-ink-soft">
                            Share the latest policy update with all employees across selected branches.
                          </p>
                        </div>

                        <div className="mt-4 space-y-3">
                          {[
                            ["Audience", "All Employees"],
                            ["Schedule", "Tomorrow 9:00 AM"],
                            ["Template", "Policy Update"],
                            ["Status", "Ready to send"],
                          ].map(([label, value]) => (
                            <div
                              key={label}
                              className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm"
                            >
                              <span className="text-sm text-ink-soft">{label}</span>
                              <span className="font-semibold text-ink">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="rounded-[1.5rem] border border-border bg-white p-4 shadow-sm">
                          <div className="text-sm font-semibold text-ink">Delivery Reports</div>
                          <div className="mt-3 space-y-2">
                            {[
                              "Messages delivered",
                              "Open visibility",
                              "Department-level tracking",
                            ].map((item, index) => (
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

                        <div className="rounded-[1.5rem] border border-border bg-white p-4 shadow-sm">
                          <div className="text-sm font-semibold text-ink">Live Queue</div>
                          <div className="mt-3 space-y-2">
                            {[
                              ["Policy Update", "Live"],
                              ["Onboarding Welcome", "Ready"],
                              ["Holiday Notice", "Queued"],
                            ].map(([title, status]) => (
                              <div
                                key={title}
                                className="flex items-center justify-between rounded-xl bg-white p-3 text-sm shadow-sm"
                              >
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
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        <section id="what-is" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="What is HR Communication?"
              title="HR communication is how organisations share information with employees"
              summary="Good HR communication keeps employees informed, aligned with company goals and connected to what is happening across the organisation."
            />

            <StaggerReveal step={60} className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {whatIsCards.map((card) => (
                <article
                  key={card.title}
                  className="soft-card h-full bg-gradient-to-br from-white via-white to-[#fff7ef] p-5"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/10 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="challenges" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Challenges Businesses Face"
              title="The everyday communication problems HR teams run into"
              summary="Before adopting a centralised system, most HR teams face similar day-to-day communication challenges."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {challengeCards.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 35}>
                  <article className="soft-card h-full p-5">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                      <card.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="helps" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="How Altroz Bulk Email Helps"
              title="Altroz Bulk Email gives HR teams the structure and visibility they need"
              summary="Centralise HR communication, keep it professional and make it easier to plan, send and review every employee message."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {helpCards.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 40}>
                  <article className="soft-card group h-full p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <card.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                    <div className="mt-4 rounded-2xl bg-[#1d4ed8]/5 p-3 text-sm text-ink-soft">
                      <span className="font-semibold text-ink">Business Benefit: </span>
                      {card.benefit}
                    </div>
                    <Link
                      to={card.href}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1d4ed8] transition-colors hover:text-[#0f3fd1]"
                    >
                      Learn more: {card.linkLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="How Altroz Bulk Email Works"
              title="A simple process for sending HR announcements"
              summary="The workflow keeps HR communication easy to follow from creation to delivery."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {workflowSteps.map((step, index) => (
                <ScrollReveal key={step.step} variant="fade-up" delay={index * 40}>
                  <article className="soft-card relative h-full p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-gradient-to-r from-[#1d4ed8]/12 via-white to-[#d97706]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1d4ed8]">
                        {step.step}
                      </span>
                      <span className="rounded-full bg-surface px-2 py-1 text-[10px] font-semibold text-ink-soft">
                        {index + 1}/5
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{step.description}</p>
                    {index < workflowSteps.length - 1 ? (
                      <ArrowRight className="mt-4 hidden h-4 w-4 text-[#b45309] lg:block" />
                    ) : null}
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="benefits" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Business Benefits"
              title="Why centralised HR communication improves the day-to-day workflow"
              summary="These benefits explain why a structured communication system saves time, improves clarity and keeps employees connected."
            />

            <StaggerReveal step={55} className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {benefitCards.map((card) => (
                <article key={card.title} className="soft-card h-full p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="audience" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Who Can Use It?"
              title="Built for businesses and teams that need dependable employee communication"
              summary="Altroz Bulk Email supports HR communication needs across different teams and industries."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {audienceCards.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 30}>
                  <article className="soft-card group h-full p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] transition-transform duration-300 group-hover:scale-105">
                      <card.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="why-choose" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Why Choose Altroz Bulk Email?"
              title="A reliable platform for centralised employee communication"
              summary="Altroz Bulk Email makes HR messaging easier to manage, easier to track and easier to scale."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
              <div className="grid gap-4 md:grid-cols-2">
                {whyCards.map((card, index) => (
                  <ScrollReveal key={card.title} variant="fade-up" delay={index * 35}>
                    <article className="soft-card h-full p-5">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                        <card.icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                    </article>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal variant="fade-left" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#b45309]">
                  Trusted Internal Communication
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  Built for teams that need one reliable place to manage internal communication
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  Altroz Bulk Email brings policy updates, onboarding emails, announcements and
                  employee reminders into one clean workflow.
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    "Home",
                    "Email Broadcast",
                    "Email Templates",
                    "Email Analytics",
                    "Email Scheduling",
                    "SMTP Configuration",
                    "Pricing",
                    "Book Demo",
                    "About Us",
                    "Contact Us",
                  ].map((item) => {
                    const hrefMap: Record<string, string> = {
                      Home: ROUTES.home,
                      "Email Broadcast": ROUTES.bulkEmailBroadcast,
                      "Email Templates": ROUTES.bulkEmailTemplates,
                      "Email Analytics": ROUTES.bulkEmailAnalytics,
                      "Email Scheduling": ROUTES.bulkEmailScheduling,
                      "SMTP Configuration": ROUTES.bulkEmailSmtp,
                      Pricing: ROUTES.bulkEmailPricing,
                      "Book Demo": ROUTES.bulkEmailBookDemo,
                      "About Us": ROUTES.bulkEmailAbout,
                      "Contact Us": ROUTES.bulkEmailContact,
                    };

                    return (
                      <Link
                        key={item}
                        to={hrefMap[item]}
                        className="flex items-center justify-between rounded-xl bg-white p-3 text-sm font-medium text-ink shadow-sm transition-colors hover:bg-primary-soft hover:text-primary"
                      >
                        <span>{item}</span>
                        <ArrowRight className="h-4 w-4 opacity-60" />
                      </Link>
                    );
                  })}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="faq" className="section bg-white scroll-mt-24">
          <div className="site-container grid gap-6 lg:grid-cols-12 lg:items-start">
            <ScrollReveal variant="fade-up" className="lg:col-span-4">
              <SectionHeading
                eyebrow="Frequently Asked Questions"
                title="Clear answers for HR teams planning internal emails"
                summary="Helpful answers that keep the page practical while still feeling complete."
                align="left"
              />

              <div className="soft-card mt-5 p-5">
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#b45309]">
                  Need a tailored setup?
                </div>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  Bring policy updates, onboarding emails, announcements and employee reminders into
                  one clean workflow.
                </p>
                <div className="button-group mt-5">
                  <Link to={ROUTES.bulkEmailBookDemo} className="btn-primary">
                    Book Free Demo
                  </Link>
                  <Link to={ROUTES.bulkEmailContact} className="btn-ghost">
                    Contact Sales
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={80} className="lg:col-span-8">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={faq.q}
                    value={`faq-${index}`}
                    className="overflow-hidden rounded-[1.25rem] border border-border bg-white px-4 shadow-card"
                  >
                    <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink no-underline hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pt-0 text-sm leading-6 text-ink-soft">
                      {faq.a}
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
                  Transform the Way You Communicate with Employees
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-white/80">
                  Keep every employee informed with timely announcements, policy updates, onboarding
                  emails, event invitations and important business communication using Altroz Bulk
                  Email.
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
                    Contact Sales
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
