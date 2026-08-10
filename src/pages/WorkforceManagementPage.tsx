import { useEffect } from "react";
import {
  ArrowRight,
  BarChart3,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Construction,
  DoorOpen,
  Factory,
  FileText,
  Globe2,
  GraduationCap,
  HeartPulse,
  Hotel,
  Laptop,
  Landmark,
  MapPin,
  Bell,
  Menu,
  Search,
  Shield,
  Smartphone,
  Sparkles,
  ShoppingBag,
  SlidersHorizontal,
  Truck,
  Users,
  Wallet,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import { resolveSiteUrl } from "@/lib/siteUrl";
import TopNavbar from "@/components/site/TopNavbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FeatureCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type IndustryModule = {
  title: string;
  icon: LucideIcon;
  overview: string;
  features: string[];
  howItHelps: string;
  cta: string;
};

const pageTitle = "Workforce Management Software | Altroz HR";
const pageDescription =
  "Altroz HR workforce management software helps you manage employees, shifts, attendance, leave, payroll and field staff with geo tracking, across multiple branches. Book a free demo today.";

const heroHighlights: FeatureCard[] = [
  {
    title: "Shift planning",
    description: "Plan schedules with enough structure to keep operations moving.",
    icon: Clock3,
  },
  {
    title: "Attendance and leave",
    description: "Bring attendance, time-off and approvals together in one place.",
    icon: CalendarDays,
  },
  {
    title: "Multi-location support",
    description: "Handle distributed, shift-based and frontline teams with clarity.",
    icon: MapPin,
  },
];

const capabilityCards: FeatureCard[] = [
  {
    title: "Shift planning",
    description:
      "Plan schedules with enough structure to keep operations moving without overcomplicating the workflow.",
    icon: Clock3,
  },
  {
    title: "Attendance and leave",
    description:
      "Bring attendance, time-off and approvals together so data stays consistent across the workforce flow.",
    icon: CalendarDays,
  },
  {
    title: "Multi-location support",
    description:
      "Handle distributed, shift-based and frontline teams while keeping policies centered and visible.",
    icon: MapPin,
  },
  {
    title: "Policy automation",
    description:
      "Apply location-specific rules for working hours, overtime thresholds, rest periods and leave policies.",
    icon: Shield,
  },
];

const featureList: FeatureCard[] = [
  {
    title: "Employee Management",
    description:
      "A single organised record for every employee, whether they work in offices, factories or on the field.",
    icon: Users,
  },
  {
    title: "Shift Management",
    description:
      "Create and assign shifts based on department, branch or role so working hours are planned in advance.",
    icon: Clock3,
  },
  {
    title: "Attendance Management",
    description:
      "Record daily attendance digitally against the assigned shift to reduce manual tracking effort.",
    icon: CalendarDays,
  },
  {
    title: "Geo Tracking",
    description:
      "Capture check-in location for field or multi-site employees to confirm where attendance was marked.",
    icon: MapPin,
  },
  {
    title: "Leave Management",
    description:
      "Submit and track leave applications against attendance and shift records without scattered follow-ups.",
    icon: Workflow,
  },
  {
    title: "Payroll Management",
    description:
      "Feed attendance and leave data into payroll so pay records stay accurate and up to date.",
    icon: Wallet,
  },
];

const industryModules: IndustryModule[] = [
  {
    title: "Manufacturing",
    icon: Factory,
    overview:
      "Manufacturing units run on shift-based production, machine timings and factory floor discipline. Workforce planning has to match production targets, not office hours.",
    features: [
      "Multiple rotating shifts across production lines",
      "Overtime tracking for factory workers",
      "Attendance discipline at shop floor level",
      "Payroll linked to shift and overtime data",
    ],
    howItHelps:
      "Altroz HR maps shift patterns to production schedules, captures overtime automatically from attendance data and pushes verified hours into payroll.",
    cta: "Get an HR Solution Built for Manufacturing",
  },
  {
    title: "IT and Software",
    icon: Laptop,
    overview:
      "IT teams work in flexible hours, hybrid setups and project-based structures. HR here needs to be self-service first and low on paperwork.",
    features: [
      "Flexible working hours and remote check-ins",
      "Frequent leave and comp-off requests",
      "Continuous performance review cycles",
      "High dependency on employees managing their own HR tasks",
    ],
    howItHelps:
      "Altroz HR gives IT employees self-service access to leave, payslips and performance, while HR teams manage the lifecycle from one dashboard.",
    cta: "Get an HR Solution Built for IT and Software",
  },
  {
    title: "Healthcare and Hospitals",
    icon: HeartPulse,
    overview:
      "Hospitals run round the clock. Doctors, nurses and support staff work in overlapping shifts where even a small scheduling gap affects patient care.",
    features: [
      "24x7 shift rotation across departments",
      "Accurate attendance for critical care staff",
      "Payroll complexity with shift allowances",
      "Leave planning without affecting patient coverage",
    ],
    howItHelps:
      "Altroz HR builds shift rosters department-wise, tracks attendance in real time and calculates payroll with shift-linked components.",
    cta: "Get an HR Solution Built for Healthcare and Hospitals",
  },
  {
    title: "Construction",
    icon: Construction,
    overview:
      "Construction workforce operates across scattered project sites, often far from any central office, making manual attendance almost impossible to verify.",
    features: [
      "Workers spread across multiple project sites",
      "No fixed office for attendance marking",
      "Risk of proxy or unverified attendance",
      "Site-wise employee records and documentation",
    ],
    howItHelps:
      "Altroz HR uses Geo Tracking, Geo Fencing Attendance and Mobile Attendance so workers can check in only from the assigned site.",
    cta: "Get an HR Solution Built for Construction",
  },
  {
    title: "Retail",
    icon: ShoppingBag,
    overview:
      "Retail businesses run multiple outlets, each with its own staff, shift timing and footfall pattern that changes through the day and across seasons.",
    features: [
      "Attendance tracking across many branches",
      "Different shift timings per outlet",
      "Store-wise payroll processing",
      "Leave approvals across locations",
    ],
    howItHelps:
      "Altroz HR consolidates attendance and shift data from every branch into one system so retail HR teams can plan staffing outlet by outlet.",
    cta: "Get an HR Solution Built for Retail",
  },
  {
    title: "Education",
    icon: GraduationCap,
    overview:
      "Schools and colleges manage two very different workforce groups - teaching staff with academic schedules and non-teaching staff with fixed shifts.",
    features: [
      "Separate attendance rules for teaching and non-teaching staff",
      "Academic calendar linked leave planning",
      "Payroll structures that differ by staff category",
      "Manual record keeping for large staff strength",
    ],
    howItHelps:
      "Altroz HR lets institutions manage teaching and non-teaching staff separately and run payroll accurately for every staff category.",
    cta: "Get an HR Solution Built for Education",
  },
  {
    title: "Logistics and Transport",
    icon: Truck,
    overview:
      "Logistics teams work on the move - drivers, delivery staff and field executives rarely sit at a desk, which makes conventional attendance systems irrelevant.",
    features: [
      "Constantly moving field staff",
      "No central location for attendance",
      "Verifying genuine field visits and check-ins",
      "Payroll dependent on field attendance data",
    ],
    howItHelps:
      "Altroz HR tracks field employees through Geo Tracking and Mobile Attendance, confirms location-based check-ins with Geo Fencing and feeds data directly into payroll.",
    cta: "Get an HR Solution Built for Logistics and Transport",
  },
  {
    title: "Hospitality",
    icon: Hotel,
    overview:
      "Hotels and hospitality businesses run on round-the-clock shifts with front office, housekeeping, kitchen and service teams all working different hours.",
    features: [
      "Multiple overlapping shift patterns",
      "High staff turnover and quick onboarding needs",
      "Attendance accuracy across departments",
      "Payroll linked to shift allowances",
    ],
    howItHelps:
      "Altroz HR manages department-wise shift planning, captures accurate attendance for every shift and gives staff self-service access to payslips and leave.",
    cta: "Get an HR Solution Built for Hospitality",
  },
  {
    title: "Facility Management",
    icon: Building2,
    overview:
      "Facility management companies deploy staff across client sites and locations, often with little direct supervision, making workforce visibility a real challenge.",
    features: [
      "Staff deployed across multiple client locations",
      "Limited visibility of on-site attendance",
      "Verifying attendance at the correct client site",
      "Centralised payroll across scattered teams",
    ],
    howItHelps:
      "Altroz HR combines Geo Tracking, Mobile Attendance and multi-location workforce visibility so companies always know which employee is present at which client site.",
    cta: "Get an HR Solution Built for Facility Management",
  },
];

const glanceCards = industryModules.map((industry) => ({
  title: industry.title,
  icon: industry.icon,
  modules: industry.features,
}));

const fieldCards: FeatureCard[] = [
  {
    title: "Geo Tracking",
    description:
      "Know the real-time location of field employees while they are on duty, without manual check-ins or phone calls.",
    icon: MapPin,
  },
  {
    title: "Geo Fencing",
    description:
      "Set virtual boundaries so attendance can only be marked when the employee is within the defined zone.",
    icon: BadgeCheck,
  },
  {
    title: "GPS Attendance",
    description:
      "Capture attendance with GPS coordinates, giving HR teams accurate, location-verified records.",
    icon: Globe2,
  },
  {
    title: "Mobile Attendance",
    description:
      "Let employees mark attendance directly from their mobile phones, wherever their work takes them.",
    icon: Smartphone,
  },
  {
    title: "Client Site Attendance",
    description:
      "Verify that employees are marking attendance from the correct client site for field and service teams.",
    icon: Building2,
  },
  {
    title: "Field Workforce Visibility",
    description:
      "Get a clear, centralised view of where every field employee is working without manual reporting.",
    icon: Users,
  },
  {
    title: "Location Based Attendance",
    description:
      "Tie attendance records to actual work locations so HR always has a verified audit trail.",
    icon: Landmark,
  },
  {
    title: "Multi Site Workforce",
    description:
      "Manage employees working across several project sites or branches from a single HR system.",
    icon: Workflow,
  },
];

const workflowSteps = [
  "Employee Onboarding",
  "Department Assignment",
  "Shift Assignment",
  "Attendance Tracking",
  "Geo Tracking",
  "Leave Management",
  "Payroll Processing",
  "ESS Access",
  "HR Reports",
];

const benefits: FeatureCard[] = [
  {
    title: "Easy to Use",
    description: "A simple interface that HR teams and employees can use without training.",
    icon: Sparkles,
  },
  {
    title: "Geo Tracking",
    description: "Know where employees check in from, especially useful for field teams.",
    icon: MapPin,
  },
  {
    title: "Geo Fencing",
    description: "Restrict attendance to approved work locations.",
    icon: BadgeCheck,
  },
  {
    title: "Mobile Attendance",
    description: "Let employees mark attendance from their phone, anywhere.",
    icon: Smartphone,
  },
  {
    title: "Secure Employee Information",
    description: "Workforce data is stored and handled securely.",
    icon: Shield,
  },
  {
    title: "Role Based Access",
    description: "Control who can view or edit workforce information.",
    icon: CheckCircle2,
  },
  {
    title: "Multi Branch Workforce",
    description: "Manage employees across several branches from one system.",
    icon: Building2,
  },
  {
    title: "Scalable Platform",
    description: "Altroz HR grows with your workforce as your company expands.",
    icon: Workflow,
  },
  {
    title: "Reliable Support",
    description: "Get support whenever you need help managing your workforce.",
    icon: ArrowRight,
  },
];

const faqItems = [
  {
    q: "What is workforce management software?",
    a: "Workforce management software is a digital system that helps businesses manage employees, attendance, shifts, leave and payroll from one platform instead of manual registers and spreadsheets.",
  },
  {
    q: "Why is workforce management important?",
    a: "Workforce management helps businesses plan shifts, track attendance accurately, reduce manual work and get better visibility over employees across departments and branches.",
  },
  {
    q: "How does shift management work in Altroz HR?",
    a: "HR teams or managers can create shifts and assign them to employees based on department, branch or role so working hours are planned and tracked accurately.",
  },
  {
    q: "What is geo tracking?",
    a: "Geo tracking captures the location from which an employee marks attendance, giving HR visibility into where field or on-site employees are checking in from.",
  },
  {
    q: "What is geo fencing?",
    a: "Geo fencing sets a defined location boundary so attendance can only be marked when the employee is within the approved work site or client location.",
  },
  {
    q: "Can I manage multiple branches with Altroz HR?",
    a: "Yes. Altroz HR supports multi branch workforce management, allowing you to manage employees, attendance and shifts across several locations from one platform.",
  },
  {
    q: "Can employees mark attendance using mobile?",
    a: "Yes. Employees can mark attendance directly from their mobile phone using Altroz HR's mobile attendance feature, including geo tracked check-ins for field staff.",
  },
  {
    q: "Can managers approve leave online?",
    a: "Yes. Leave requests move through Altroz HR's approval workflow, so managers can review and approve them online without paperwork or delays.",
  },
  {
    q: "Does workforce management connect with payroll?",
    a: "Yes. Attendance and leave data recorded through workforce management directly supports payroll processing, keeping pay records accurate and up to date.",
  },
  {
    q: "Why choose Altroz HR for workforce management?",
    a: "Altroz HR brings employee management, attendance, shifts, leave, payroll and geo tracking into one easy to use, centralised platform built for multi branch and field based teams.",
  },
];

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const previousTitle = document.title;
    const head = document.head;
    const previousDescription = head.querySelector<HTMLMetaElement>('meta[name="description"]')?.content;
    const previousCanonical = head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href;

    document.title = title;

    let meta = head.querySelector<HTMLMetaElement>('meta[name="description"]');
    const createdMeta = !meta;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      head.appendChild(meta);
    }
    meta.content = description;

    let canonical = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const createdCanonical = !canonical;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      head.appendChild(canonical);
    }
    canonical.href = resolveSiteUrl("/products/workforce-management");

    return () => {
      document.title = previousTitle;
      if (createdMeta) {
        meta?.remove();
      } else if (meta && previousDescription !== undefined) {
        meta.content = previousDescription;
      }
      if (createdCanonical) {
        canonical?.remove();
      } else if (canonical && previousCanonical) {
        canonical.href = previousCanonical;
      }
    };
  }, [title, description]);
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
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-bold leading-tight text-ink sm:text-4xl">{title}</h2>
      <p
        className={
          center
            ? "mx-auto mt-4 max-w-2xl text-sm leading-7 text-justify hyphens-auto text-ink-soft sm:text-base"
            : "mt-4 max-w-2xl text-sm leading-7 text-justify hyphens-auto text-ink-soft sm:text-base"
        }
      >
        {description}
      </p>
    </div>
  );
}

function Card({ item }: { item: FeatureCard }) {
  const Icon = item.icon;

  return (
    <article className="soft-card flex h-full flex-col p-5">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-base font-bold leading-6 text-ink">{item.title}</h3>
      </div>
      <p className="mt-3 text-sm leading-6 text-ink-soft">{item.description}</p>
    </article>
  );
}

function FieldCard({ item }: { item: FeatureCard }) {
  const Icon = item.icon;

  return (
    <article className="soft-card flex h-full min-h-[290px] flex-col items-center p-6 text-center">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 min-h-[3.5rem] text-base font-bold leading-6 text-ink">
        {item.title}
      </h3>
      <p className="mt-3 min-h-[7rem] text-sm leading-6 text-ink-soft">{item.description}</p>
    </article>
  );
}

function WorkforceDashboardPreview() {
  const sidebarItems = [
    { label: "Leave", icon: CalendarDays, active: false },
    { label: "Team Action", icon: Users, active: false },
    { label: "Recruitment", icon: Building2, active: true },
    { label: "Document", icon: FileText, active: false },
    { label: "Payrolls", icon: Wallet, active: false },
  ];

  const metrics = [
    {
      label: "Active Employees",
      value: "22",
      helper: "+3 from last month",
      icon: Users,
      tone: "primary" as const,
    },
    {
      label: "Present Today",
      value: "0",
      helper: "0% attendance rate",
      icon: CheckCircle2,
      tone: "success" as const,
    },
    {
      label: "On Leave Today",
      value: "0",
      helper: "0% of total employees",
      icon: CalendarDays,
      tone: "amber" as const,
    },
    {
      label: "Open Positions",
      value: "2",
      helper: "View all jobs",
      icon: Building2,
      tone: "violet" as const,
    },
  ];

  const recruitmentItems = [
    ["Open Positions", "2", "text-primary"],
    ["Applications", "2", "text-[#8b5cf6]"],
    ["Interviews", "1", "text-[#f59e0b]"],
    ["Offers", "1", "text-[#10b981]"],
  ] as const;

  const leaveItems = [
    ["Pending Approval", "3", "bg-[#f59e0b]/10 text-[#b45309]"],
    ["Approved Today", "0", "bg-[#10b981]/10 text-success"],
    ["Rejected Today", "0", "bg-rose-50 text-rose-600"],
  ] as const;

  const departmentBars = [
    { label: "IT", value: 92, color: "bg-primary" },
    { label: "OPS", value: 14, color: "bg-primary/80" },
    { label: "HR", value: 8, color: "bg-primary/60" },
    { label: "Sales", value: 24, color: "bg-success" },
  ];

  const attendanceTrend = [34, 46, 40, 58, 66, 61, 74];
  const approvalQueue = [
    { title: "Shift swap", meta: "2 pending", tone: "primary" },
    { title: "Leave request", meta: "4 pending", tone: "amber" },
    { title: "Late check-in review", meta: "1 pending", tone: "success" },
  ] as const;
  const activityFeed = [
    { name: "Anika", action: "approved leave request", time: "2m ago" },
    { name: "Rahul", action: "checked in from field site", time: "8m ago" },
    { name: "Meera", action: "submitted shift update", time: "14m ago" },
  ] as const;

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#07111f] text-white shadow-[0_34px_100px_rgba(2,8,23,0.38)] ring-1 ring-white/5">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#0a1729] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <div className="text-xl font-black tracking-tight text-white">
            <span className="text-cyan-300">Altroz</span> HRM
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-cyan-400/20 bg-white/5 px-3 py-2 text-sm text-slate-300 md:flex">
            <Search className="h-4 w-4" />
            <span>Search employee...</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 shadow-sm"
            aria-label="Open notifications"
          >
            <Bell className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 shadow-sm lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 lg:flex">
            <div className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-[10px] font-bold text-white shadow-lg shadow-cyan-500/25">
              A
            </div>
            <span className="font-medium text-white">HRMSDemo Admin</span>
            <SlidersHorizontal className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="grid min-h-[560px] lg:grid-cols-[220px_1fr]">
        <aside className="border-b border-white/10 bg-[#091522] p-4 lg:border-b-0 lg:border-r lg:border-r-white/10">
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
            search...
          </div>

          <div className="mt-4 space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                    item.active
                      ? "bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-400/20"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </div>
              );
            })}
          </div>
        </aside>

        <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.10),_transparent_32%),linear-gradient(180deg,#0b1320_0%,#08111d_30%,#09111b_100%)] p-4 sm:p-5">
          <div className="pointer-events-none absolute -right-12 top-6 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
                Live dashboard
              </div>
              <h3 className="mt-1 text-2xl font-black tracking-tight text-white">Executive</h3>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 shadow-sm backdrop-blur">
              Today, 7 Jul 2026
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => {
              const Icon = metric.icon;

              return (
                <article
                  key={metric.label}
                  className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4 shadow-[0_18px_50px_rgba(2,8,23,0.22)] backdrop-blur-md"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className={`grid h-10 w-10 place-items-center rounded-2xl ${
                        metric.tone === "primary"
                          ? "bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                          : metric.tone === "success"
                            ? "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                            : metric.tone === "amber"
                              ? "bg-gradient-to-br from-amber-300 to-orange-500 text-white shadow-lg shadow-orange-500/20"
                              : "bg-gradient-to-br from-violet-400 to-fuchsia-500 text-white shadow-lg shadow-violet-500/20"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-400">{metric.helper}</span>
                  </div>
                  <div className="mt-4 text-sm text-slate-400">{metric.label}</div>
                  <div className="text-3xl font-black tracking-tight text-white">{metric.value}</div>
                </article>
              );
            })}
          </div>

          <div className="mt-4 grid gap-3 xl:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4 shadow-[0_18px_50px_rgba(2,8,23,0.18)] backdrop-blur-md">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-lg font-bold text-white">Department Headcount</h4>
                  <p className="text-sm text-slate-400">Live workforce distribution by department</p>
                </div>
                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                  View all
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {departmentBars.map((item) => (
                  <div key={item.label} className="grid grid-cols-[42px_1fr_36px] items-center gap-3">
                    <div className="text-xs font-semibold text-slate-400">{item.label}</div>
                    <div className="h-3 rounded-full bg-white/10">
                      <div
                        className={`h-3 rounded-full ${item.color} shadow-[0_0_14px_rgba(59,130,246,0.28)]`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                    <div className="text-right text-xs font-semibold text-slate-300">{item.value}</div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4 shadow-[0_18px_50px_rgba(2,8,23,0.18)] backdrop-blur-md">
              <h4 className="text-lg font-bold text-white">Gender Diversity</h4>
              <p className="text-sm text-slate-400">A live snapshot of the current workforce mix</p>
              <div className="mt-5 flex items-center justify-center">
                <div className="relative h-40 w-40 rounded-full bg-[conic-gradient(#22d3ee_0deg_164deg,#a855f7_164deg_360deg)] shadow-[0_0_36px_rgba(34,211,238,0.18)]">
                  <div className="absolute inset-8 rounded-full border border-white/10 bg-[#08111d] shadow-inner" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#a855f7]" />
                  Female
                </span>
                <span className="font-semibold text-white">54.5%</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                  Male
                </span>
                <span className="font-semibold text-white">45.5%</span>
              </div>
            </article>
          </div>

          <div className="mt-4 grid gap-3 xl:grid-cols-2">
            <article className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4 shadow-[0_18px_50px_rgba(2,8,23,0.18)] backdrop-blur-md">
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-lg font-bold text-white">Recruitment Summary</h4>
                <span className="text-xs font-semibold text-cyan-200">Live updates</span>
              </div>
              <div className="mt-4 space-y-3">
                {recruitmentItems.map(([label, value, tone]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                  >
                    <span className="text-sm text-slate-300">{label}</span>
                    <span className={`text-sm font-bold ${tone}`}>{value}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4 shadow-[0_18px_50px_rgba(2,8,23,0.18)] backdrop-blur-md">
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-lg font-bold text-white">Leave Status</h4>
                <span className="text-xs font-semibold text-cyan-200">Today</span>
              </div>
              <div className="mt-4 space-y-3">
                {leaveItems.map(([label, value, tone]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                  >
                    <span className={`rounded-full px-3 py-1 text-sm font-semibold ${tone}`}>
                      {label}
                    </span>
                    <span className="text-lg font-black text-white">{value}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            <article className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4 shadow-[0_18px_50px_rgba(2,8,23,0.18)] backdrop-blur-md">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-lg font-bold text-white">Attendance Trend</h4>
                  <p className="text-sm text-slate-400">Last 7 days live activity</p>
                </div>
                <BarChart3 className="h-4 w-4 text-cyan-300" />
              </div>

              <div className="mt-5 flex h-32 items-end gap-2">
                {attendanceTrend.map((value, index) => (
                  <div key={index} className="flex-1">
                    <div
                      className="rounded-t-2xl bg-gradient-to-t from-cyan-400/70 via-cyan-300 to-blue-500 shadow-[0_10px_24px_rgba(34,211,238,0.18)]"
                      style={{ height: `${value}%` }}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>Mon</span>
                <span>Sun</span>
              </div>
            </article>

            <article className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4 shadow-[0_18px_50px_rgba(2,8,23,0.18)] backdrop-blur-md">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-lg font-bold text-white">Approval Queue</h4>
                  <p className="text-sm text-slate-400">Work waiting for review</p>
                </div>
                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                  Live
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {approvalQueue.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white">{item.title}</div>
                      <div className="text-xs text-slate-400">{item.meta}</div>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.tone === "primary"
                          ? "bg-cyan-400/10 text-cyan-200"
                          : item.tone === "amber"
                            ? "bg-amber-400/10 text-amber-200"
                            : "bg-emerald-400/10 text-emerald-200"
                      }`}
                    >
                      Review
                    </span>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4 shadow-[0_18px_50px_rgba(2,8,23,0.18)] backdrop-blur-md">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-lg font-bold text-white">Recent Activity</h4>
                  <p className="text-sm text-slate-400">What changed most recently</p>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-success" />
              </div>

              <div className="mt-4 space-y-3">
                {activityFeed.map((item) => (
                  <div key={item.name} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-xs font-bold text-white shadow-lg shadow-cyan-500/20">
                      {item.name[0]}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-slate-100">
                        <span className="font-semibold">{item.name}</span> {item.action}
                      </div>
                      <div className="text-xs text-slate-400">{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WorkforceManagementPage() {
  usePageMeta(pageTitle, pageDescription);

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x py-12 lg:py-16">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-extrabold tracking-normal text-primary shadow-sm">
                <Sparkles className="h-4 w-4" />
                Complete Workforce Management Platform
              </span>

              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl lg:text-[4.75rem] lg:leading-[0.96]">
                <span className="block">Workforce Management Software</span>
                <span className="block">Built for Every Team, Every Location</span>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-justify hyphens-auto text-ink-soft sm:text-lg">
                Altroz HR is a complete workforce management software that helps you manage
                employees, shifts, attendance, leave, payroll and field staff from one simple
                platform. Built for growing companies with multiple branches and on-field teams,
                Altroz HR gives you complete visibility and control over your workforce, without
                the manual paperwork.
              </p>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-6">
                <div className="flex flex-wrap gap-3">
                  <a href="/company/book-demo" className="btn-primary">
                    Book Free Demo
                  </a>
                  <a href="/company/contact-us" className="btn-outline">
                    Request Demo
                  </a>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {heroHighlights.map((item) => (
                    <div key={item.title} className="soft-card p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        {item.title}
                      </div>
                      <div className="mt-1 text-sm leading-6 text-ink-soft">{item.description}</div>
                    </div>
                  ))}
                </div>
              </div>

            <div className="lg:col-span-6">
              <div className="soft-card overflow-hidden p-4 sm:p-5">
                <WorkforceDashboardPreview />

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Plan", value: "smarter shifts" },
                  { label: "Track", value: "real-time attendance" },
                  { label: "Approve", value: "with less manual work" },
                  ].map((item) => (
                    <div key={item.label} className="soft-card p-4 text-center">
                      <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {item.label}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-ink">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Workforce value"
              title="Designed to reduce clutter, complexity and confusion"
              description="This page keeps the same major ideas as the source: easier scheduling, stronger employee experience, better compliance and smoother decisions for managers."
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {capabilityCards.map((card) => (
                <Card key={card.title} item={card} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 lg:py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="What is workforce management software?"
                title="Plan, track and manage your workforce from one platform"
                description="Workforce management software is a system that helps businesses plan, track and manage employees across attendance, shifts, leave, payroll and daily operations."
              />

              <div className="mt-6 space-y-4 text-sm leading-7 text-justify text-ink-soft">
                <p>
                  Instead of handling these tasks through registers, spreadsheets and phone calls,
                  workforce management software brings everything onto one digital platform.
                </p>
                <p>
                  Most companies still manage their workforce manually. HR teams track attendance
                  through paper registers or basic biometric machines. Shift schedules are shared
                  over WhatsApp or printed notice boards. Leave requests move through emails, and
                  approvals get delayed because managers are not available on time.
                </p>
                <p>
                  Altroz HR simplifies all of this. It brings employee management, shift
                  management, attendance management, geo tracking, leave management and payroll
                  management onto one connected platform.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="soft-card h-full p-6">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Why this matters
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">A well-managed workforce runs smoother</h3>
                <p className="mt-3 text-sm leading-6 text-justify hyphens-auto text-ink-soft">
                  HR teams get a clear, centralised view of the entire workforce. Managers can
                  assign shifts, approve leave and track attendance from their phone. Employees get
                  self-service access to mark attendance, apply for leave and check their records
                  without depending on HR for every small task.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "Stronger visibility across shifts and locations",
                    "Less manual paperwork and follow-up",
                    "More accurate attendance and payroll inputs",
                    "Faster approval and reporting cycles",
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-border bg-white p-4">
                      <div className="flex items-start gap-3 text-sm leading-6 text-ink">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span>{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Complete workforce management features"
              title="Everything you need to manage your workforce in one platform"
              description="A compact feature set keeps the page easy to scan while still covering the core workforce workflows from the document."
              center
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {featureList.map((item) => (
                <Card key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 lg:py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Field workforce management"
                title="HR software for employees who do not work from an office"
                description="Construction workers, logistics staff, facility management teams and field executives do not sit behind a desk, so their attendance and workforce management cannot either."
              />

              <div className="mt-6 space-y-4 text-sm leading-7 text-justify text-ink-soft">
                <p>
                  Altroz HR brings genuine field workforce visibility through Geo Tracking, Geo
                  Fencing and Mobile Attendance, giving you verified, location-based data instead
                  of guesswork.
                </p>
                <p>
                  This makes it easier to see who is on site, where they are working and whether
                  attendance records match the actual work location.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {fieldCards.map((item) => (
                  <FieldCard key={item.title} item={item} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="How Altroz HR manages your workforce"
              title="A simple connected workflow from onboarding to reporting"
              description="The workflow below follows the structure in the source sheet and keeps the steps clear, compact and sequential."
              center
            />

            <div className="mx-auto mt-8 max-w-4xl">
              <div className="grid gap-3 sm:grid-cols-2">
                {workflowSteps.map((step, index) => (
                  <div
                    key={step}
                    className={`soft-card flex items-center gap-3 p-4 ${
                      index === workflowSteps.length - 1
                        ? "sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-md"
                        : ""
                    }`}
                  >
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-ink">{step}</div>
                      <div className="text-xs leading-5 text-ink-soft">
                        {index < workflowSteps.length - 1
                          ? "Keeps the workforce flow connected."
                          : "Helps HR turn workforce data into decisions."}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 lg:py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Centralized workforce dashboard"
                title="One dashboard for employee records, attendance, leave and reports"
                description="Altroz HR gives managers and HR teams a centralised dashboard to monitor the entire workforce without switching between different tools or files."
              />

              <div className="mt-6 space-y-4 text-sm leading-7 text-justify text-ink-soft">
                <p>
                  From a single screen, you can view employee records, daily attendance, leave
                  status, shift schedules, payroll data, asset allotments, department structure,
                  branch wise workforce, HR reports, notifications and pending approval status.
                </p>
                <p>
                  This centralised view means HR managers do not have to chase individual updates
                  from different departments or branches. Every workforce related detail is
                  available in one place, updated as employees check in, apply for leave or
                  complete their tasks.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="soft-card overflow-hidden p-4 sm:p-5">
                <WorkforceDashboardPreview />

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Attendance", value: "Updated live" },
                    { label: "Leave", value: "Visible instantly" },
                    { label: "Reports", value: "Ready to review" },
                  ].map((item) => (
                  <div key={item.label} className="soft-card p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        {item.label}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-ink">{item.value}</div>
                  </div>
                ))}
              </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Industry solutions at a glance"
              title="Modules recommended for each industry"
              description="A quick reference to the Altroz HR modules best suited to your industry."
              center
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {glanceCards.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="soft-card flex h-full flex-col p-5">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="text-base font-bold text-ink">{item.title}</h3>
                    </div>
                    <div className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Recommended features
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.modules.map((module) => (
                        <span
                          key={module}
                          className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-ink-soft shadow-sm"
                        >
                          {module}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 lg:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Benefits of using Altroz HR for workforce management"
              title="Why choose Altroz HR?"
              description="Altroz HR is built to make workforce management simple, reliable and accurate for growing businesses."
              center
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {benefits.map((item) => (
                <Card key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Frequently asked questions"
              title="Common questions about workforce management"
              description="Quick answers to the most common questions about scheduling, tracking, approvals and field workforce management."
              center
            />

            <div className="mx-auto mt-8 max-w-4xl">
              <div className="soft-card overflow-hidden rounded-[1.5rem] border border-border bg-white p-4 sm:p-5">
                <Accordion type="single" collapsible className="space-y-3">
                  {faqItems.map((item) => (
                    <AccordionItem
                      key={item.q}
                      value={item.q}
                      className="rounded-2xl border border-border bg-white px-4"
                    >
                      <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink no-underline hover:no-underline">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-sm leading-6 text-ink-soft">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x">
            <div className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-success/10 blur-3xl" />

              <div className="relative grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    Final CTA section
                  </div>
                  <h2 className="mt-2 text-3xl font-bold leading-tight text-ink sm:text-4xl">
                    Manage your entire workforce from one platform
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-justify hyphens-auto text-ink-soft sm:text-base">
                    See how Altroz HR brings employees, shifts, attendance, leave, payroll and geo
                    tracking together into one simple workforce management system.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                  <a href="/company/book-demo" className="btn-primary">
                    Book Free Demo
                  </a>
                  <a href="/company/contact-us" className="btn-outline">
                    Request Demo
                  </a>
                </div>
              </div>

              <p className="relative mt-5 text-sm leading-6 text-justify hyphens-auto text-ink-soft">
                No paperwork. No spreadsheets. Just one connected workforce management platform.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
