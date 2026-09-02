"use client";

import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileText,
  Gauge,
  LayoutDashboard,
  Layers3,
  Mail,
  MailCheck,
  Megaphone,
  PenLine,
  Send,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Target,
  TimerReset,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Footer from "@/components/site/Footer";
import BulkEmailNavbar from "@/components/site/BulkEmailNavbar";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import PageSEO from "@/components/site/PageSEO";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/routes/routeConfig.js";

type ActionCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
};

type StepItem = {
  step: string;
  title: string;
  description: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type AudienceItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type ComparisonRow = {
  area: string;
  manual: string;
  altroz: string;
};

type UseCaseItem = {
  title: string;
  examples: string[];
  icon: LucideIcon;
};

const quickFlow = [
  {
    step: "Create",
    description: "Prepare email content or reuse a template so you do not start from scratch every time.",
    icon: PenLine,
  },
  {
    step: "Broadcast",
    description: "Send a managed campaign to the intended recipient list from one place.",
    icon: Megaphone,
  },
  {
    step: "Schedule",
    description: "Plan campaigns in advance and let them go out at the right time.",
    icon: CalendarClock,
  },
  {
    step: "Monitor",
    description: "Keep track of ongoing, sent, scheduled and cancelled jobs.",
    icon: LayoutDashboard,
  },
  {
    step: "Analyse",
    description: "Review delivery status, history and reports after the send.",
    icon: BarChart3,
  },
];

const featureCards: ActionCard[] = [
  {
    title: "Email Broadcast",
    description:
      "Create and manage business email broadcasts from one central platform with a clear campaign workflow.",
    icon: Megaphone,
    href: ROUTES.bulkEmailBroadcast,
  },
  {
    title: "Email Templates",
    description:
      "Build reusable email templates for announcements, updates and recurring communication.",
    icon: Layers3,
    href: ROUTES.bulkEmailTemplates,
  },
  {
    title: "Email Analytics",
    description:
      "Review campaign activity, delivery information, reports and email status in one dashboard.",
    icon: BarChart3,
    href: ROUTES.bulkEmailAnalytics,
  },
  {
    title: "Email Scheduling",
    description:
      "Plan email campaigns in advance and manage scheduled jobs from a single workspace.",
    icon: CalendarClock,
    href: ROUTES.bulkEmailScheduling,
  },
  {
    title: "SMTP",
    description:
      "Configure SMTP settings for business email sending and keep delivery infrastructure under control.",
    icon: ServerCog,
    href: ROUTES.bulkEmailSmtp,
  },
];

const whyBusinessUses: ActionCard[] = [
  {
    title: "Centralised Email Management",
    description:
      "Broadcasts, templates, schedules and reports all live in one place instead of being spread across inboxes.",
    icon: LayoutDashboard,
  },
  {
    title: "Organised Campaign Workflow",
    description:
      "Every campaign follows a clear structure: create, broadcast or schedule, monitor, and review.",
    icon: Workflow,
  },
  {
    title: "Reusable Email Templates",
    description:
      "Recurring HR notices, business updates and internal messages can be built once and reused.",
    icon: Layers3,
  },
  {
    title: "Scheduled Communication",
    description:
      "Plan campaigns ahead of time and let them send automatically at the right moment.",
    icon: TimerReset,
  },
  {
    title: "Campaign Visibility",
    description:
      "Track scheduled, ongoing, sent and cancelled jobs from one dashboard.",
    icon: ClipboardList,
  },
  {
    title: "Email Reporting",
    description:
      "Campaign history, delivery status and reports are available for every broadcast.",
    icon: FileText,
  },
  {
    title: "SMTP Configuration",
    description:
      "Configure your own SMTP settings so sending fits the way your business already works.",
    icon: ServerCog,
  },
  {
    title: "Simplified Business Communication",
    description:
      "Bringing broadcast, templates, scheduling and analytics together removes the need for disconnected tools.",
    icon: Sparkles,
  },
];

const dashboardAreas = [
  "Recent Broadcasts",
  "Scheduled Jobs",
  "Ongoing Jobs",
  "Sent Jobs",
  "Cancelled Jobs",
  "Campaign History",
  "Subscription Usage",
  "Email Status",
];

const howItWorks: StepItem[] = [
  {
    step: "Step 1",
    title: "Create your campaign",
    description:
      "Start a new campaign from the dashboard and give it a clear name your team will recognise later.",
  },
  {
    step: "Step 2",
    title: "Prepare or select email content",
    description:
      "Write the content directly or choose an existing template for recurring communication.",
  },
  {
    step: "Step 3",
    title: "Choose broadcast or schedule",
    description:
      "Decide whether the campaign should go out immediately or at a later date and time.",
  },
  {
    step: "Step 4",
    title: "Manage and monitor activity",
    description:
      "Track the campaign as it moves between scheduled, ongoing, sent and cancelled jobs.",
  },
  {
    step: "Step 5",
    title: "Review reports and status",
    description:
      "Check delivery status, campaign history and reports to understand what happened after send.",
  },
];

const useCases: UseCaseItem[] = [
  {
    title: "HR Communication",
    examples: ["Employee announcements", "Policy communication", "Internal notices"],
    icon: Users,
  },
  {
    title: "Marketing Communication",
    examples: ["Campaigns", "Promotions", "Business updates"],
    icon: Megaphone,
  },
  {
    title: "Education",
    examples: ["Student communication", "Announcements", "Institution updates"],
    icon: Building2,
  },
  {
    title: "Healthcare",
    examples: ["Internal communication", "Administrative notices"],
    icon: ShieldCheck,
  },
  {
    title: "Manufacturing",
    examples: ["Employee communication", "Operational announcements"],
    icon: Workflow,
  },
  {
    title: "Corporate Communication",
    examples: ["Company announcements", "Internal updates"],
    icon: MailCheck,
  },
];

const audienceCards: AudienceItem[] = [
  {
    title: "Small Businesses",
    description:
      "Get a structured way to manage business email communication without a large team or many tools.",
    icon: Target,
  },
  {
    title: "Growing Businesses",
    description:
      "Keep campaigns organised as recipient lists and communication needs grow.",
    icon: TrendingUpIcon,
  },
  {
    title: "Enterprise Teams",
    description:
      "Manage email communication across departments from one centralised platform.",
    icon: LayoutDashboard,
  },
  {
    title: "HR Teams",
    description:
      "Send announcements, policy updates and internal notices using templates and scheduling.",
    icon: Users,
  },
  {
    title: "Marketing Teams",
    description:
      "Plan and broadcast campaigns with visibility into what was sent and when.",
    icon: Megaphone,
  },
  {
    title: "IT Teams",
    description:
      "Configure SMTP settings and maintain the technical setup behind sending.",
    icon: ServerCog,
  },
  {
    title: "Operations Teams",
    description:
      "Keep operational announcements organised and track delivery across the business.",
    icon: ClipboardList,
  },
  {
    title: "Communication Teams",
    description:
      "Manage outgoing business communication from a shared platform.",
    icon: Mail,
  },
];

const comparisonRows: ComparisonRow[] = [
  {
    area: "Campaign Management",
    manual: "Tracked informally across inboxes or spreadsheets",
    altroz: "Managed centrally as structured campaigns",
  },
  {
    area: "Scheduling",
    manual: "Depends on someone sending at the right time",
    altroz: "Campaigns can be scheduled in advance",
  },
  {
    area: "Templates",
    manual: "Content rewritten or copy-pasted each time",
    altroz: "Reusable templates for recurring communication",
  },
  {
    area: "Tracking",
    manual: "Difficult to track once lists grow",
    altroz: "Broadcasts tracked from one dashboard",
  },
  {
    area: "Reporting",
    manual: "Little to no structured reporting",
    altroz: "Reports and delivery status available",
  },
  {
    area: "Campaign History",
    manual: "Scattered across emails and files",
    altroz: "Maintained centrally on the platform",
  },
  {
    area: "SMTP Configuration",
    manual: "Set up separately, often per tool",
    altroz: "Configured and managed within the platform",
  },
];

const businessBenefits: ActionCard[] = [
  {
    title: "Save Administrative Time",
    description:
      "Less time spent manually sending emails or hunting for past communication.",
    icon: Clock3,
  },
  {
    title: "Organise Communication",
    description:
      "Campaigns, templates and schedules are structured, not scattered across tools.",
    icon: ClipboardList,
  },
  {
    title: "Plan Campaigns",
    description:
      "Prepare communication ahead of time instead of reacting at the last minute.",
    icon: CalendarClock,
  },
  {
    title: "Improve Visibility",
    description:
      "See scheduled, ongoing, sent and cancelled jobs at a glance.",
    icon: Gauge,
  },
  {
    title: "Reuse Content",
    description:
      "Build templates once for communication that repeats.",
    icon: Layers3,
  },
  {
    title: "Centralise Email Activity",
    description:
      "Bring broadcast, templates, scheduling and analytics onto one platform.",
    icon: LayoutDashboard,
  },
  {
    title: "Manage Campaign History",
    description:
      "Keep a searchable record of what was sent and when.",
    icon: FileText,
  },
  {
    title: "Support Business Communication",
    description:
      "Give every team a consistent way to send email.",
    icon: CheckCircle2,
  },
];

const faqItems: FaqItem[] = [
  {
    question: "What is bulk email software?",
    answer:
      "Bulk email software lets businesses send, schedule and track email communication to a list of recipients from one place instead of sending emails manually one by one.",
  },
  {
    question: "What is Altroz Bulk Email?",
    answer:
      "Altroz Bulk Email is a business email broadcasting and campaign management platform that lets organisations create, send, schedule, monitor and analyse their email communication from a central dashboard.",
  },
  {
    question: "Who can use Altroz Bulk Email?",
    answer:
      "Business owners, marketing teams, HR teams, sales teams, operations teams, IT teams and communication teams across small businesses, growing companies and enterprises can use it.",
  },
  {
    question: "How does email broadcasting work?",
    answer:
      "You create a campaign, prepare your content and recipient list, and send it out as a managed broadcast. The platform then tracks the campaign activity.",
  },
  {
    question: "Can I schedule email campaigns?",
    answer:
      "Yes. Campaigns can be scheduled to go out at a future date and time, and tracked as scheduled, ongoing or sent jobs.",
  },
  {
    question: "Can I use email templates?",
    answer:
      "Yes. You can create and reuse email templates for recurring communication such as HR announcements or business updates.",
  },
  {
    question: "What is email analytics?",
    answer:
      "Email analytics in Altroz Bulk Email refers to visibility into campaign activity, delivery status, reports, email status and campaign history.",
  },
  {
    question: "What is SMTP?",
    answer:
      "SMTP, or Simple Mail Transfer Protocol, is the standard protocol used to send email from a sending platform to a recipient mail server.",
  },
  {
    question: "Can I configure my SMTP server?",
    answer:
      "Yes. Businesses can configure their own SMTP settings within Altroz Bulk Email for sending campaigns.",
  },
  {
    question: "Can businesses use Altroz Bulk Email for internal communication?",
    answer:
      "Yes. Many businesses use it for internal notices, HR announcements and company updates, alongside external communication.",
  },
  {
    question: "Can HR teams use bulk email software?",
    answer:
      "Yes. HR teams commonly use Altroz Bulk Email for employee announcements, policy communication and internal notices.",
  },
  {
    question: "Can small businesses use Altroz Bulk Email?",
    answer:
      "Yes. Small businesses can use it to organise and manage email communication without needing a large team or multiple tools.",
  },
  {
    question: "Does Altroz Bulk Email guarantee inbox delivery?",
    answer:
      "No. Altroz Bulk Email does not make guaranteed inbox placement or delivery percentage claims. It provides delivery status and reporting so businesses can review what happened after sending.",
  },
  {
    question: "Can I track sent and scheduled campaigns separately?",
    answer:
      "Yes. The dashboard separates campaigns into categories such as scheduled jobs, ongoing jobs, sent jobs and cancelled jobs.",
  },
  {
    question: "Is campaign history available?",
    answer:
      "Yes. Campaign history is maintained on the platform so businesses can review past broadcasts.",
  },
  {
    question: "Can I manage recipient lists within a broadcast?",
    answer:
      "Yes. Recipient lists are managed as part of setting up an Email Broadcast campaign.",
  },
  {
    question: "Can I attach files to a campaign?",
    answer:
      "Attachments can be uploaded where supported as part of preparing an Email Broadcast.",
  },
  {
    question: "How is Altroz Bulk Email different from sending emails manually?",
    answer:
      "It centralises campaign creation, scheduling, tracking and reporting on one platform instead of relying on manual sending and informal tracking.",
  },
  {
    question: "How can I get started?",
    answer:
      "You can book a free demo to see how Altroz Bulk Email fits your business communication needs.",
  },
  {
    question: "How can I request a demo?",
    answer:
      "Use the Book a Free Demo button on this page or the Talk to Our Team option to arrange a walkthrough.",
  },
];

const routeLinks = [
  { label: "Explore Email Broadcast", href: ROUTES.bulkEmailBroadcast },
  { label: "Explore Email Templates", href: ROUTES.bulkEmailTemplates },
  { label: "Explore Email Analytics", href: ROUTES.bulkEmailAnalytics },
  { label: "Explore Email Scheduling", href: ROUTES.bulkEmailScheduling },
  { label: "Explore SMTP Configuration", href: ROUTES.bulkEmailSmtp },
  { label: "View Pricing Plans", href: ROUTES.bulkEmailPricing },
  { label: "Learn About Altroz", href: ROUTES.bulkEmailAbout },
  { label: "Contact Our Team", href: ROUTES.bulkEmailContact },
  { label: "Visit the Help Center", href: ROUTES.bulkEmailFaq },
  { label: "Read the Altroz Blog", href: ROUTES.bulkEmailBlog },
  { label: "Read Frequently Asked Questions", href: ROUTES.bulkEmailFaq },
  { label: "Book a Free Demo", href: ROUTES.bookDemo },
];

function TrendingUpIcon({ className }: { className?: string }) {
  return <BarChart3 className={className} />;
}

function ActionLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className: string;
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
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center")}>
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-soft px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-primary">
        {eyebrow}
      </div>
      <h2 className="mt-4 text-3xl font-black tracking-tight text-ink sm:text-4xl">{title}</h2>
      <p className={cn("mt-3 text-base leading-7 text-ink-soft", centered && "mx-auto max-w-2xl")}>
        {description}
      </p>
    </div>
  );
}

function IconCard({
  title,
  description,
  icon: Icon,
  href,
}: ActionCard) {
  const inner = (
    <article className="soft-card group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 whitespace-nowrap text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{description}</p>
      {href ? (
        <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
          Learn more <ArrowRight className="h-4 w-4" />
        </div>
      ) : null}
    </article>
  );

  if (!href) return inner;

  return (
    <ActionLink href={href} className="block h-full">
      {inner}
    </ActionLink>
  );
}

function ScreenshotMock({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#F87171]" />
          <span className="h-3 w-3 rounded-full bg-[#FBBF24]" />
          <span className="h-3 w-3 rounded-full bg-[#34D399]" />
        </div>
        <div className="text-xs font-semibold text-ink-soft">{title}</div>
      </div>
      <div className={cn("p-5", accent)}>{children}</div>
    </div>
  );
}

function BulkEmailHeroVisual() {
  return (
    <div className="relative mx-auto max-w-[42rem]">
      <FloatingSummaryCard
        className="absolute -left-4 top-6 hidden md:block"
        title="Email Broadcast"
        note="Launch campaigns from one dashboard"
        icon={Megaphone}
      />
      <FloatingSummaryCard
        className="absolute -right-4 top-20 hidden md:block"
        title="Scheduled Campaigns"
        note="Plan messages for later delivery"
        icon={CalendarClock}
      />
      <FloatingSummaryCard
        className="absolute -left-10 bottom-24 hidden md:block"
        title="Email Analytics"
        note="Review delivery status and history"
        icon={BarChart3}
      />
      <FloatingSummaryCard
        className="absolute -right-8 bottom-10 hidden md:block"
        title="SMTP"
        note="Control your sending setup"
        icon={ServerCog}
      />

      <div className="relative overflow-hidden rounded-[2.25rem] border border-border bg-white p-4 shadow-[0_36px_100px_rgba(15,23,42,0.12)]">
        <div className="pointer-events-none absolute inset-0 opacity-100">
          <div className="absolute -left-24 top-8 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#EE6801]/25 blur-3xl" />
          <div className="absolute bottom-0 left-24 h-56 w-56 rounded-full bg-primary-soft/70 blur-3xl" />
        </div>

        <div className="relative flex items-center justify-between border-b border-border px-2 pb-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                Altroz Bulk Email
              </p>
              <p className="text-sm text-ink-soft">Business Email Dashboard</p>
            </div>
          </div>
          <div className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-soft">
            Live workspace
          </div>
        </div>

        <div className="relative mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.5rem] border border-border bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Create campaign
                </p>
                <h3 className="mt-1 text-xl font-bold text-ink">Plan, write and broadcast</h3>
              </div>
              <button className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                Draft ready
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-border bg-surface p-3">
                <div className="flex items-center justify-between text-xs text-ink-soft">
                  <span>Subject</span>
                  <span>HR Announcement</span>
                </div>
                <div className="mt-2 h-3 w-3/4 rounded-full bg-slate-200" />
                <div className="mt-2 h-3 w-1/2 rounded-full bg-slate-100" />
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  "Recipient list",
                  "Reusable template",
                  "Send or schedule",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-border bg-white p-3 text-xs font-medium text-ink-soft shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-primary/10 bg-primary-soft/40 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary">Broadcast</p>
                  <p className="mt-2 text-sm text-ink">
                    Send immediately to the selected audience.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-[#FFF1E6] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#C95100]">Schedule</p>
                  <p className="mt-2 text-sm text-ink">
                    Queue the message for later delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.5rem] border border-border bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Dashboard summary
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  ["Broadcasts", "Ready to send"],
                  ["Scheduled Jobs", "Queued safely"],
                  ["Analytics", "Delivery review"],
                  ["SMTP", "Configured"],
                ].map(([label, note]) => (
                  <div key={label} className="rounded-2xl border border-border bg-surface p-3">
                    <p className="text-sm font-semibold text-ink">{label}</p>
                    <p className="mt-1 text-xs text-ink-soft">{note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-border bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Campaign activity
              </p>
              <div className="mt-4 space-y-3">
                {[
                  ["Recent broadcast", "Employee policy update", "Sent"],
                  ["Scheduled campaign", "Quarterly reminder", "Queued"],
                  ["Delivery status", "Campaign report", "Review"],
                ].map(([label, name, status]) => (
                  <div key={name} className="flex items-center justify-between rounded-2xl border border-border bg-surface px-3 py-3">
                    <div>
                      <p className="text-sm font-medium text-ink">{label}</p>
                      <p className="text-xs text-ink-soft">{name}</p>
                    </div>
                    <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-semibold text-primary">
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

function FloatingSummaryCard({
  className,
  title,
  note,
  icon: Icon,
}: {
  className?: string;
  title: string;
  note: string;
  icon: LucideIcon;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-white px-4 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.16)]",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#FFF1E8] text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{title}</p>
          <p className="text-xs text-ink-soft">{note}</p>
        </div>
      </div>
    </div>
  );
}

function ProductPreviewCard({
  title,
  subtitle,
  lines,
        accent = "bg-gradient-to-br from-[#FFF1E8] to-white",
}: {
  title: string;
  subtitle: string;
  lines: string[];
  accent?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-[1.75rem] border border-border p-4", accent)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">{title}</p>
          <p className="text-xs text-ink-soft">{subtitle}</p>
        </div>
        <div className="rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold text-primary">
          Demo view
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {lines.map((line, index) => (
          <div
            key={line}
            className={cn(
              "rounded-2xl border border-border bg-white px-3 py-3 text-sm text-ink",
              index === 0 && "shadow-sm",
            )}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BulkEmailHomePage() {
  const location = useLocation();

  return (
    <div className="bulk-email-home-theme min-h-screen">
      <PageSEO
        title="Bulk Email Software for Business Campaigns | Altroz"
        description="Altroz Bulk Email is a bulk email software to broadcast, schedule, template and analyse business email campaigns from one dashboard. Book a demo."
        canonicalPath={location.pathname}
      />
      <BulkEmailNavbar />

      <main className="pb-32">
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(238,104,1,0.16),_transparent_36%),radial-gradient(circle_at_top_right,_rgba(238,104,1,0.14),_transparent_30%),linear-gradient(180deg,#0247A5_0%,#0247A5_72%)] pt-8">
          <div className="site-container py-6 pb-14 lg:py-10 lg:pb-20">
            <div className="grid items-center gap-12 lg:grid-cols-[0.96fr_1.04fr]">
              <ScrollReveal>
                <div className="max-w-2xl text-center text-ink">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-soft px-4 py-2 text-xs font-bold uppercase tracking-[0.26em] text-primary">
                    <Mail className="h-4 w-4" />
                    Business Email Communication Platform
                  </div>
                  <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl xl:text-6xl">
                    Business Email Broadcasting, Scheduling and Analytics from one platform
                  </h1>
                  <p className="mx-auto mt-5 max-w-xl text-justify hyphens-auto text-base leading-8 text-ink-soft sm:text-lg">
                    Altroz Bulk Email helps businesses create, send, schedule, manage and analyse
                    email campaigns from a single centralised platform. Whether it is an HR
                    announcement, a customer update or a scheduled business communication, your
                    team can plan it, send it and track it without juggling multiple tools.
                  </p>

                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <ActionLink
                      href={ROUTES.bookDemo}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
                    >
                      Book a Free Demo <ArrowRight className="h-4 w-4" />
                    </ActionLink>
                    <ActionLink
                      href="#features"
                    className="inline-flex items-center gap-2 rounded-full border border-[#EE6801] bg-white px-5 py-3 text-sm font-bold text-[#EE6801] transition-transform hover:-translate-y-0.5 hover:bg-[#FFF1E6]"
                    >
                      Explore Features
                    </ActionLink>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {[
                      "Broadcast",
                      "Schedule",
                      "Analyse",
                      "SMTP",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-border bg-white px-4 py-3 text-sm font-semibold text-ink shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" delay={100}>
                <BulkEmailHeroVisual />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="site-container">
            <SectionHeading
              eyebrow="Quick Value Proposition"
              title="Everything you need to manage business email campaigns"
              description="Running business email communication usually means switching between spreadsheets, personal inboxes and separate tools. Altroz Bulk Email brings the entire workflow onto one platform."
              centered
            />

            <div className="mt-10 grid gap-4 xl:grid-cols-5">
              {quickFlow.map((item, index) => (
                <div key={item.step} className="soft-card p-5">
                  <div className="flex items-center justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{item.step}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="what-is" className="section bg-surface/40">
          <div className="site-container">
            <SectionHeading
              eyebrow="What is Altroz Bulk Email?"
              title="A central platform for business email broadcasting and campaign management"
              description="Altroz Bulk Email is built for organisations that need a structured way to create, send, schedule, monitor and analyse email communication from one dashboard."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <div className="soft-card p-6">
                <h3 className="text-xl font-bold text-ink">What problem does it solve?</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  Sending business emails manually is slow and hard to track once recipient lists
                  grow. Recurring communication needs reusable templates instead of being written
                  from scratch each time. And once emails are sent, businesses need a clear record
                  of what was sent, to whom and what happened next.
                </p>
                <div className="mt-5 rounded-[1.5rem] border border-primary/10 bg-primary-soft/30 p-5 text-sm leading-7 text-ink">
                  Altroz Bulk Email addresses all of those needs from a single platform.
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  {
                    title: "Who can use it?",
                    icon: Users,
                    text:
                      "Business owners, marketing teams, HR teams, sales teams, operations teams, IT teams and communication teams can all use it. It also fits education, healthcare, manufacturing, corporate offices, professional services and retail businesses.",
                  },
                  {
                    title: "What can businesses do with it?",
                    icon: ClipboardList,
                    text:
                      "Broadcast emails, create reusable templates, schedule campaigns, track ongoing and sent jobs, review delivery reports, configure SMTP settings and monitor subscription usage from the dashboard.",
                  },
                ].map((item) => (
                  <div key={item.title} className="soft-card p-6">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 whitespace-nowrap text-lg font-bold text-ink">{item.title}</h3>
                    <p className="mt-2 text-justify hyphens-auto text-sm leading-7 text-ink-soft">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="section bg-white">
          <div className="site-container">
            <SectionHeading
              eyebrow="Core Product Features"
              title="Five core product areas power Altroz Bulk Email"
              description="Each feature has a dedicated page for teams that want to go deeper."
            />

            <StaggerReveal step={45} className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featureCards.map((card) => (
                <IconCard key={card.title} {...card} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-surface/35">
          <div className="site-container">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <ScrollReveal>
                <div className="soft-card p-6">
                  <SectionHeading
                    eyebrow="How Altroz Bulk Email Works"
                    title="A simple five-step workflow"
                    description="The process is laid out so a non-technical business owner can run a campaign without help from IT."
                  />

                  <div className="mt-6 space-y-4">
                    {howItWorks.map((step, index) => (
                      <div key={step.step} className="flex gap-4 rounded-2xl border border-border bg-white p-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-sm font-black text-primary">
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                            {step.step}
                          </div>
                          <h3 className="mt-1 text-base font-bold text-ink">{step.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-ink-soft">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <div className="grid gap-5 sm:grid-cols-2">
                {whyBusinessUses.map((card) => (
                  <IconCard key={card.title} {...card} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="site-container">
            <SectionHeading
              eyebrow="Dashboard Experience"
              title="Manage your email activity from one dashboard"
              description="The Altroz Bulk Email dashboard gives your team a single view of everything happening with business email communication."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
              <ScrollReveal>
                <div className="soft-card p-5">
                  <div className="grid gap-4 lg:grid-cols-[0.42fr_1fr]">
                    <div className="rounded-[1.5rem] border border-border bg-white p-4 text-ink">
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        Dashboard areas
                      </div>
                      <div className="mt-4 space-y-2">
                        {dashboardAreas.map((area) => (
                          <div
                            key={area}
                            className="rounded-2xl border border-border bg-surface px-3 py-2 text-sm text-ink"
                          >
                            {area}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-[1.5rem] border border-border bg-[linear-gradient(180deg,#FFF1E8_0%,#FFFFFF_100%)] p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                              Summary
                            </p>
                            <h3 className="mt-1 text-lg font-bold text-ink">
                              A clean view of campaign activity
                            </h3>
                          </div>
                          <div className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                            Recent activity
                          </div>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          {[
                            ["Recent Broadcasts", "Latest sent campaigns"],
                            ["Scheduled Jobs", "Messages queued ahead"],
                            ["Ongoing Jobs", "Jobs currently running"],
                            ["Email Status", "Track the state of each send"],
                          ].map(([title, note]) => (
                            <div key={title} className="rounded-2xl border border-border bg-white p-3">
                              <p className="text-sm font-semibold text-ink">{title}</p>
                              <p className="mt-1 text-xs leading-5 text-ink-soft">{note}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-[1.5rem] border border-border bg-white p-4">
                          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                            Campaign history
                          </div>
                          <p className="mt-2 text-sm leading-6 text-ink-soft">
                            See what was sent, when it was sent and what stage each job reached.
                          </p>
                        </div>
                        <div className="rounded-[1.5rem] border border-border bg-white p-4">
                          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                            Subscription usage
                          </div>
                          <p className="mt-2 text-sm leading-6 text-ink-soft">
                            Keep an eye on usage so the team knows where the current account stands.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <div className="grid gap-5">
                <div className="soft-card p-5">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Available dashboard areas
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {dashboardAreas.map((area) => (
                      <span
                        key={area}
                        className="rounded-full border border-border bg-surface px-3 py-2 text-sm font-medium text-ink"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="soft-card p-5">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Important note
                  </div>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">
                    Use actual product screenshots here when available. The page should show real
                    platform data, not fabricated metrics, so the preview remains honest and useful
                    during demos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-surface/35">
          <div className="site-container">
            <SectionHeading
              eyebrow="Product Screenshots"
              title="Suggested product screenshots that mirror the live experience"
              description="These mock screenshots keep the layout grounded while the product-specific pages show the deeper screens."
            />

            <StaggerReveal step={40} className="mt-10 grid gap-5 lg:grid-cols-3">
              <ScreenshotMock
                title="Broadcast screen"
                accent="bg-gradient-to-br from-[#FFF1E8] via-white to-white"
              >
                <div className="space-y-3">
                  <div className="rounded-2xl border border-border bg-white p-3">
                    <div className="h-3 w-3/4 rounded-full bg-slate-200" />
                    <div className="mt-3 h-3 w-1/2 rounded-full bg-slate-100" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-primary-soft p-4 text-primary">
                      Recipient list
                    </div>
                    <div className="rounded-2xl bg-surface p-4 text-ink">Send now / schedule</div>
                  </div>
                </div>
              </ScreenshotMock>

              <ScreenshotMock
                title="Scheduling screen"
                accent="bg-gradient-to-br from-[#FFF1E6] via-white to-white"
              >
                <div className="space-y-3">
                  <div className="rounded-2xl border border-border bg-white p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-ink">Campaign timeline</span>
                      <span className="rounded-full bg-[#FFF1E6] px-2 py-1 text-[11px] font-semibold text-[#C95100]">
                        Queue
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-2 flex-1 rounded-full bg-[#EEF1F4]" />
                      <div className="h-2 flex-1 rounded-full bg-primary" />
                      <div className="h-2 flex-1 rounded-full bg-[#EEF1F4]" />
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white p-4 text-sm text-ink-soft">
                    Planned release time and queue control
                  </div>
                </div>
              </ScreenshotMock>

              <ScreenshotMock
                title="Analytics screen"
                accent="bg-gradient-to-br from-[#FFF1E8] via-white to-white"
              >
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-border bg-white p-3">
                    <div className="flex items-end gap-2">
                      {[38, 54, 28, 66, 44].map((height, index) => (
                        <div
                          key={height}
                          className={cn(
                            "flex-1 rounded-t-xl",
                            index === 3 ? "bg-primary" : "bg-[#EEF1F4]",
                          )}
                          style={{ height: `${height}px` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white p-4 text-sm text-ink-soft">
                    Delivery status and campaign history summary
                  </div>
                </div>
              </ScreenshotMock>
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-white">
          <div className="site-container">
            <SectionHeading
              eyebrow="Email Broadcast"
              title="Send business emails as managed broadcasts"
              description="The Email Broadcast feature lets your team create a campaign, manage the recipient list, prepare the content and send it as a single trackable broadcast."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_0.95fr]">
              <div className="soft-card p-6">
                <h3 className="text-xl font-bold text-ink">With Email Broadcast, businesses can:</h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    "Create campaigns from the dashboard",
                    "Manage recipient lists for the broadcast",
                    "Prepare email content before sending",
                    "Upload attachments where supported",
                    "Send campaigns to the intended audience",
                    "Track campaign activity after sending",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                      <span className="text-sm leading-6 text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Broadcast workflow
                </div>
                <div className="mt-5 space-y-4">
                  {[
                    ["Audience", "Choose the intended list"],
                    ["Content", "Write or reuse your message"],
                    ["Delivery", "Send as a managed broadcast"],
                    ["Review", "Check history and reports"],
                  ].map(([title, note], index) => (
                    <div key={title} className="flex items-center gap-4 rounded-2xl bg-surface p-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-sm font-black text-primary">
                        0{index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-ink">{title}</div>
                        <div className="text-sm text-ink-soft">{note}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <ActionLink
                  href={ROUTES.bulkEmailBroadcast}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-3"
                >
                  Explore Email Broadcast <ArrowRight className="h-4 w-4" />
                </ActionLink>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-surface/35">
          <div className="site-container">
            <SectionHeading
              eyebrow="Email Templates"
              title="Reuse templates instead of writing every email from scratch"
              description="Many business emails repeat in structure. Email Templates let you build that structure once and reuse it when the same communication comes up again."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="soft-card p-6">
                <h3 className="text-xl font-bold text-ink">Common use cases for templates</h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    "HR announcements",
                    "Business updates",
                    "Customer communication",
                    "Internal communication",
                    "Event communication",
                    "Marketing communication",
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-border bg-white px-4 py-3 text-sm font-medium text-ink">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Template library view
                </div>
                <div className="mt-4 grid gap-3">
                  {[
                    ["Policy update template", "Ready to reuse for HR"],
                    ["Quarterly reminder template", "Useful for recurring schedules"],
                    ["Announcement template", "Quick structure for business updates"],
                  ].map(([title, note]) => (
                    <div key={title} className="rounded-2xl border border-border bg-white p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-ink">{title}</div>
                          <div className="text-sm text-ink-soft">{note}</div>
                        </div>
                        <Layers3 className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  ))}
                </div>
                <ActionLink
                  href={ROUTES.bulkEmailTemplates}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-3"
                >
                  Explore Email Templates <ArrowRight className="h-4 w-4" />
                </ActionLink>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="site-container">
            <SectionHeading
              eyebrow="Email Scheduling"
              title="Plan campaigns in advance"
              description="Email Scheduling lets you prepare a campaign ahead of time and set it to send at a chosen date and time."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="soft-card p-6">
                <h3 className="text-xl font-bold text-ink">Why businesses schedule emails</h3>
                <div className="mt-5 space-y-3">
                  {[
                    "To plan communication around business events or deadlines",
                    "To avoid depending on someone being available to press send",
                    "To keep a predictable, organised communication calendar",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4">
                      <CalendarClock className="mt-0.5 h-4 w-4 text-primary" />
                      <span className="text-sm leading-6 text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Campaign timeline
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {["Campaign Created", "Scheduled", "Ongoing", "Sent"].map((item, index) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="rounded-full bg-primary-soft px-4 py-2 text-sm font-semibold text-primary">
                        {item}
                      </div>
                      {index < 3 ? <ArrowRight className="h-4 w-4 text-ink-soft" /> : null}
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-[1.5rem] bg-surface p-4 text-sm leading-7 text-ink-soft">
                  Scheduled jobs are visible on the dashboard at every stage, so your team can
                  review or cancel a campaign before it goes out if needed.
                </div>
                <ActionLink
                  href={ROUTES.bulkEmailScheduling}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-3"
                >
                  Explore Email Scheduling <ArrowRight className="h-4 w-4" />
                </ActionLink>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-surface/35">
          <div className="site-container">
            <SectionHeading
              eyebrow="Email Analytics"
              title="See what happened after you hit send"
              description="Email Analytics brings together campaign activity, delivery status, reports, email status and campaign history so businesses can review communication without separate records."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="soft-card p-6">
                <h3 className="text-xl font-bold text-ink">With Email Analytics, businesses can review:</h3>
                <div className="mt-5 space-y-3">
                  {[
                    "Campaign activity across all broadcasts",
                    "Delivery status for sent emails",
                    "Detailed email reports",
                    "Current email status",
                    "Full campaign history",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4">
                      <BarChart3 className="mt-0.5 h-4 w-4 text-primary" />
                      <span className="text-sm leading-6 text-ink">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-[1.5rem] border border-border bg-[#FFF1E6] p-4 text-sm leading-7 text-ink">
                  Note: Altroz Bulk Email does not promise specific open rates or delivery
                  percentages. Reporting reflects actual platform data for your campaigns.
                </div>
              </div>

              <div className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Analytics dashboard view
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-sm font-semibold text-ink">Campaign history</p>
                    <div className="mt-3 flex items-end gap-2">
                      {[28, 46, 34, 58, 42].map((height, index) => (
                        <div
                          key={height}
                          className={cn("flex-1 rounded-t-xl", index === 3 ? "bg-primary" : "bg-[#EEF1F4]")}
                          style={{ height: `${height}px` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-sm font-semibold text-ink">Email status</p>
                    <div className="mt-3 space-y-2 text-sm text-ink-soft">
                      <div>Scheduled jobs</div>
                      <div>Ongoing jobs</div>
                      <div>Sent jobs</div>
                      <div>Cancelled jobs</div>
                    </div>
                  </div>
                </div>
                <ActionLink
                  href={ROUTES.bulkEmailAnalytics}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-3"
                >
                  Explore Email Analytics <ArrowRight className="h-4 w-4" />
                </ActionLink>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="site-container">
            <SectionHeading
              eyebrow="SMTP"
              title="Configure SMTP for business email sending"
              description="SMTP is the standard protocol that moves email from a sender system to the recipient mail server. Altroz Bulk Email uses it so outgoing email follows a controlled sending path."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="soft-card p-6">
                <h3 className="text-xl font-bold text-ink">Why businesses use SMTP</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  Businesses configure their own SMTP settings so outgoing email is sent through
                  infrastructure they control or trust, keeping business email sending consistent
                  with their existing setup.
                </p>
                <div className="mt-5 rounded-[1.5rem] border border-border bg-surface p-4 text-sm leading-7 text-ink">
                  Business → Altroz Bulk Email → SMTP Server → Recipient Mail Server
                </div>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  Correct SMTP configuration affects how reliably campaigns are sent. Altroz Bulk
                  Email gives businesses a straightforward way to configure and manage these
                  settings from the platform.
                </p>
                <ActionLink
                  href={ROUTES.bulkEmailSmtp}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-3"
                >
                  Explore SMTP <ArrowRight className="h-4 w-4" />
                </ActionLink>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  {
                    title: "What is SMTP?",
                    description:
                      "The standard email delivery protocol used to relay messages between servers.",
                    icon: ServerCog,
                  },
                  {
                    title: "Why configuration matters",
                    description:
                      "Reliable campaign delivery depends on correct sender and server settings.",
                    icon: ShieldCheck,
                  },
                  {
                    title: "Sending control",
                    description:
                      "Keep outgoing email under your business setup rather than a disconnected tool.",
                    icon: Gauge,
                  },
                  {
                    title: "Operational fit",
                    description:
                      "Fit your business email workflow into infrastructure that already exists.",
                    icon: LayoutDashboard,
                  },
                ].map((item) => (
                  <IconCard
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-surface/35">
          <div className="site-container">
            <SectionHeading
              eyebrow="Use Cases"
              title="Altroz Bulk Email fits many communication needs"
              description="The platform supports practical business communication across teams and industries."
            />

            <StaggerReveal step={45} className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {useCases.map((item) => (
                <article key={item.title} className="soft-card h-full p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3
                    className={cn(
                      "mt-4 text-lg font-bold text-ink",
                      item.title === "HR Communication" && "text-[0.95rem]",
                    )}
                    style={item.title === "HR Communication" ? { whiteSpace: "nowrap" } : undefined}
                  >
                    {item.title}
                  </h3>
                  <div className="mt-3 space-y-2">
                    {item.examples.map((example) => (
                      <div key={example} className="rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink">
                        {example}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </StaggerReveal>

            <div className="mt-6 rounded-[1.5rem] border border-border bg-white p-5 text-sm leading-7 text-ink-soft">
              Altroz Bulk Email does not claim industry-specific regulatory compliance for these
              use cases unless it has been separately verified for that industry.
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="site-container">
            <SectionHeading
              eyebrow="Who is Altroz Bulk Email for?"
              title="Built for teams that need structure, speed and visibility"
              description="From small businesses to enterprise teams, the platform gives each group a practical way to manage communication."
            />

            <StaggerReveal step={40} className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {audienceCards.map((item) => (
                <article key={item.title} className="soft-card h-full p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-surface/35">
          <div className="site-container">
            <SectionHeading
              eyebrow="Altroz Bulk Email vs Manual Email Management"
              title="A straightforward comparison"
              description="This reflects the difference between a centralised platform and a manual workflow."
            />

            <div className="mt-10 overflow-hidden rounded-[2rem] border border-border bg-white">
              <div className="grid grid-cols-[1.15fr_1fr_1fr] bg-surface text-sm font-bold text-ink">
                <div className="border-r border-border px-5 py-4">Area</div>
                <div className="border-r border-border px-5 py-4">Manual Email Workflow</div>
                <div className="px-5 py-4">Altroz Bulk Email</div>
              </div>
              {comparisonRows.map((row) => (
                <div key={row.area} className="grid grid-cols-[1.15fr_1fr_1fr]">
                  <div className="border-t border-r border-border px-5 py-4 text-sm font-semibold text-ink">
                    {row.area}
                  </div>
                  <div className="border-t border-r border-border px-5 py-4 text-sm leading-7 text-ink-soft">
                    {row.manual}
                  </div>
                  <div className="border-t border-border px-5 py-4 text-sm leading-7 text-ink-soft">
                    {row.altroz}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-sm leading-7 text-ink-soft">
              This comparison reflects typical manual workflows and is not a claim about any
              specific competing product.
            </p>
          </div>
        </section>

        <section className="section bg-white">
          <div className="site-container">
            <SectionHeading
              eyebrow="Business Benefits"
              title="Practical outcomes teams get from using the platform"
              description="These benefits are the day-to-day wins businesses should feel when communication is managed from one place."
            />

            <StaggerReveal step={45} className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {businessBenefits.map((card) => (
                <IconCard key={card.title} {...card} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-surface/35">
          <div className="site-container">
            <SectionHeading
              eyebrow="Sending Business Email Responsibly"
              title="Communicate clearly, consistently and with control"
              description="The best bulk email systems are the ones that help teams stay organised without creating noise for recipients."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-4">
              {[
                ["Use clean recipient lists", "Keep audience lists current and intentional."],
                ["Reuse structured templates", "Make recurring messages easier to manage."],
                ["Schedule with purpose", "Choose send times that fit the communication need."],
                ["Review the outcome", "Check delivery status and campaign history after sending."],
              ].map(([title, description]) => (
                <div key={title} className="soft-card p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section bg-white">
          <div className="site-container">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="Clear answers for teams reviewing the platform"
              description="These answers help visitors understand how the product works, what it includes and how businesses can use it."
            />

            <div className="mt-10">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item) => (
                  <AccordionItem
                    key={item.question}
                    value={item.question}
                    className="overflow-hidden rounded-[1.5rem] border border-border bg-white px-5"
                  >
                    <AccordionTrigger className="py-5 text-left text-base font-semibold text-ink hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-7 text-ink-soft">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="section relative overflow-hidden bg-[#0247A5] text-white">
          <div className="pointer-events-none absolute -top-28 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(238,104,1,0.28),transparent_70%)] blur-3xl" />
          <div className="site-container">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.26em] text-primary">
                <Sparkles className="h-4 w-4" />
                Final CTA
              </div>
              <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                Manage business email communication from one platform
              </h2>
              <p className="mt-4 text-base leading-8 text-white/70">
                Broadcast, templates, scheduling, analytics and SMTP come together in Altroz Bulk
                Email so your team can spend less time managing tools and more time communicating.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <ActionLink
                  href={ROUTES.bookDemo}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-primary transition-transform hover:-translate-y-0.5 hover:bg-white/90"
                >
                  Book a Free Demo <ArrowRight className="h-4 w-4" />
                </ActionLink>
                <ActionLink
                  href={ROUTES.bulkEmailContact}
                  className="inline-flex items-center gap-2 rounded-full bg-[#EE6801] px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#C95100]"
                >
                  Talk to Our Team <ArrowRight className="h-4 w-4" />
                </ActionLink>
              </div>
            </div>

            <div className="mt-12 grid gap-3 md:grid-cols-3">
              {routeLinks.map((item) => (
                <ActionLink
                  key={item.label}
                  href={item.href}
                  className="rounded-[1.25rem] border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  {item.label}
                </ActionLink>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
