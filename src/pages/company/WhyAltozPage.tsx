"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  BadgeCheck,
  Building2,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Factory,
  FileBarChart2,
  LayoutDashboard,
  Layers3,
  MessageSquare,
  Package,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
  Target,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import TopNavbar from "@/components/site/TopNavbar";
import { ROUTES } from "@/routes/routeConfig.js";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type MetaItem = {
  label: string;
  value: string;
};

type StripItem = {
  label: string;
  icon: ReactNode;
};

type ReasonCard = {
  icon: ReactNode;
  title: string;
  desc: string;
};

type ModuleOption = {
  id: string;
  label: string;
  icon: ReactNode;
  title: string;
  summary: string;
  bullets: string[];
  note: string;
};

type IndustryOption = {
  id: string;
  label: string;
  icon: ReactNode;
  title: string;
  summary: string;
  bullets: string[];
};

type LifecycleStep = {
  title: string;
  icon: ReactNode;
  desc: string;
};

type SupportStep = {
  title: string;
  icon: ReactNode;
  desc: string;
};

type FaqItem = {
  q: string;
  a: string;
};

const pageTitle = "Why Choose Altroz HRMS | Centralized HR Software";
const pageDescription =
  "See why businesses choose Altroz HRMS to centralize employee management, attendance, payroll, leave, recruitment, performance, assets, reports, analytics, approvals, and employee self-service.";

const capabilityStrip: StripItem[] = [
  { label: "Core HR", icon: <Users className="h-4 w-4" /> },
  { label: "Attendance", icon: <Clock3 className="h-4 w-4" /> },
  { label: "Payroll", icon: <Wallet className="h-4 w-4" /> },
  { label: "Leave", icon: <CalendarDays className="h-4 w-4" /> },
  { label: "Recruitment", icon: <BriefcaseBusiness className="h-4 w-4" /> },
  { label: "Performance", icon: <Target className="h-4 w-4" /> },
  { label: "Assets", icon: <Package className="h-4 w-4" /> },
  { label: "Reports and Analytics", icon: <FileBarChart2 className="h-4 w-4" /> },
];

const reasonCards: ReasonCard[] = [
  {
    icon: <LayoutDashboard className="h-5 w-5" />,
    title: "Centralized HR visibility",
    desc: "Bring employee records, attendance, leave, payroll, and reports into one organized view instead of scattered tools.",
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: "Cleaner approval flow",
    desc: "Structure requests and approvals so managers, HR, and employees can follow the same process with less chasing.",
  },
  {
    icon: <RefreshCw className="h-5 w-5" />,
    title: "Less repetitive manual work",
    desc: "Reduce duplicate entry, spreadsheet maintenance, and routine follow-ups across daily HR operations.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Better reporting and review",
    desc: "Use dashboards and reports to review workforce activity, trends, and records more clearly across teams.",
  },
];

const moduleOptions: ModuleOption[] = [
  {
    id: "core-hr",
    label: "Core HR",
    icon: <Users className="h-5 w-5" />,
    title: "A cleaner home for employee records",
    summary:
      "Centralize employee profiles, documents, reporting structure, and daily updates so HR teams can keep information organized as teams grow.",
    bullets: [
      "Employee records and profile information",
      "Department and role-based organization",
      "Documents and approval-linked updates",
      "Structured data for everyday HR operations",
    ],
    note: "Useful when you want one place for essential employee information and related HR activity.",
  },
  {
    id: "attendance",
    label: "Attendance",
    icon: <Clock3 className="h-5 w-5" />,
    title: "Track attendance with better control",
    summary:
      "Keep attendance information, exceptions, and workforce visibility in one place so managers do not need to rely on disconnected records.",
    bullets: [
      "Centralized attendance records",
      "Status review for teams and locations",
      "Support for attendance-related approvals",
      "Easy handoff into payroll and reporting",
    ],
    note: "Ideal for organizations that need more clarity around daily attendance tracking.",
  },
  {
    id: "payroll",
    label: "Payroll",
    icon: <Wallet className="h-5 w-5" />,
    title: "Support payroll with organized data",
    summary:
      "Use structured employee and attendance data to support salary processing, deductions, approvals, and payroll reports in a more consistent way.",
    bullets: [
      "Earnings and deduction tracking",
      "Payroll-ready employee data",
      "Salary and pay-related records",
      "Reports for internal review",
    ],
    note: "Helpful when payroll teams want fewer manual corrections and better data flow.",
  },
  {
    id: "leave",
    label: "Leave",
    icon: <CalendarDays className="h-5 w-5" />,
    title: "Make leave requests easier to follow",
    summary:
      "Keep leave balances, policies, requests, and approvals in one organized workflow so employees and managers have clearer visibility.",
    bullets: [
      "Leave balances and policies",
      "Request and approval flow",
      "Holiday-aware planning",
      "Record keeping for review",
    ],
    note: "Works well when leave tracking needs to stay visible across teams and shifts.",
  },
  {
    id: "recruitment",
    label: "Recruitment",
    icon: <Search className="h-5 w-5" />,
    title: "Organize hiring activity from one place",
    summary:
      "Track recruitment activity, candidate progress, interview status, and handoffs more consistently as roles move through the hiring process.",
    bullets: [
      "Candidate and hiring workflow support",
      "Role and interview visibility",
      "Recruitment records and updates",
      "Cleaner handoff into onboarding",
    ],
    note: "Useful for teams that want hiring data to stay easier to review and manage.",
  },
  {
    id: "performance",
    label: "Performance",
    icon: <Target className="h-5 w-5" />,
    title: "Review performance in a structured way",
    summary:
      "Use a centralized view for performance-related records and review activity so managers can follow progress without losing context.",
    bullets: [
      "Performance review records",
      "Manager and team visibility",
      "Progress tracking across cycles",
      "Reporting-ready review history",
    ],
    note: "A practical fit for teams that want performance to stay tied to the same HR system.",
  },
  {
    id: "assets",
    label: "Assets",
    icon: <Package className="h-5 w-5" />,
    title: "Keep asset allocation organized",
    summary:
      "Track company assets, allocation records, and return history where enabled so handovers stay easier to follow.",
    bullets: [
      "Asset assignment records",
      "Return and history tracking",
      "Approval-linked record keeping",
      "Useful alongside exit workflows",
    ],
    note: "Best when asset management needs to stay connected to employee lifecycle records.",
  },
  {
    id: "reports",
    label: "Reports and Analytics",
    icon: <FileBarChart2 className="h-5 w-5" />,
    title: "Use reports to guide decisions",
    summary:
      "Surface dashboards and reports for attendance, payroll, leave, recruitment, performance, and other enabled modules from one place.",
    bullets: [
      "Dashboards and summary views",
      "Branch and department visibility",
      "Export-ready reporting workflows",
      "Better planning across HR teams",
    ],
    note: "Supports leaders who want clearer reporting without stitching together multiple files.",
  },
];

const lifecycleSteps: LifecycleStep[] = [
  {
    title: "Attract",
    icon: <BriefcaseBusiness className="h-5 w-5" />,
    desc: "Use recruitment records to manage candidates, interviews, and hiring progress.",
  },
  {
    title: "Onboard",
    icon: <Users className="h-5 w-5" />,
    desc: "Add employee details, documents, and role information into one structured system.",
  },
  {
    title: "Manage",
    icon: <Clock3 className="h-5 w-5" />,
    desc: "Handle attendance, leave, payroll, and approvals with less manual follow-up.",
  },
  {
    title: "Review",
    icon: <BarChart3 className="h-5 w-5" />,
    desc: "Use reports and dashboards to understand workforce activity and trends.",
  },
  {
    title: "Grow",
    icon: <Target className="h-5 w-5" />,
    desc: "Support performance, assets, and record keeping as operations become more complex.",
  },
];

const industryOptions: IndustryOption[] = [
  {
    id: "growth",
    label: "Startups and SMEs",
    icon: <Building2 className="h-5 w-5" />,
    title: "Built for growing teams that need structure",
    summary:
      "Smaller and growing organizations can use Altroz HRMS to bring attendance, leave, payroll, employee records, and reports into a more organized workflow.",
    bullets: [
      "Keep work centralized as the team expands",
      "Reduce spreadsheet dependence",
      "Make daily HR work easier to review",
    ],
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    icon: <Factory className="h-5 w-5" />,
    title: "Useful for shift-driven operations",
    summary:
      "Manufacturing teams often need a stronger grip on attendance, payroll, approvals, assets, and workforce records. Altroz HRMS helps keep those activities together.",
    bullets: [
      "Handle shift-heavy workforce records",
      "Keep approvals visible for supervisors",
      "Review reports across departments or sites",
    ],
  },
  {
    id: "corporate",
    label: "Corporate offices",
    icon: <Building2 className="h-5 w-5" />,
    title: "A cleaner fit for organized office operations",
    summary:
      "Corporate teams can use one platform for employee data, leave, payroll, performance, and reporting instead of switching between separate tools.",
    bullets: [
      "Keep approvals and records organized",
      "Support different teams and departments",
      "Review reports from one centralized view",
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Structured HR support for people-first operations",
    summary:
      "Healthcare organizations can use the platform to organize employee records, attendance, leave, and reports while keeping day-to-day work easier to manage.",
    bullets: [
      "Support busy shift-based teams",
      "Keep employee records organized",
      "Review attendance and leave data clearly",
    ],
  },
  {
    id: "multi-location",
    label: "Multi-location",
    icon: <Workflow className="h-5 w-5" />,
    title: "Better visibility across branches and sites",
    summary:
      "Multi-location teams can use centralized HR data and reporting to stay aligned across offices, branches, and distributed work environments.",
    bullets: [
      "Keep branch records in one system",
      "Review reports by location or team",
      "Support consistent HR workflows across sites",
    ],
  },
];

const supportSteps: SupportStep[] = [
  {
    title: "Talk through the use case",
    icon: <MessageSquare className="h-5 w-5" />,
    desc: "Share your current HR process, the modules you need, and the challenges you want to simplify.",
  },
  {
    title: "Review the right modules",
    icon: <SlidersHorizontal className="h-5 w-5" />,
    desc: "Choose the enabled modules that fit your organization instead of forcing a one-size-fits-all setup.",
  },
  {
    title: "Set up the workflow",
    icon: <Workflow className="h-5 w-5" />,
    desc: "Align employee records, attendance, payroll, leave, reports, and approvals with your structure.",
  },
  {
    title: "Keep improving",
    icon: <BarChart3 className="h-5 w-5" />,
    desc: "Use reports and feedback from HR and managers to keep the process easier to manage over time.",
  },
];

const faqs: FaqItem[] = [
  {
    q: "What makes Altroz HRMS a better choice than disconnected HR tools?",
    a: "Altroz HRMS helps centralize HR work so employee records, attendance, payroll, leave, recruitment, performance, assets, and reports can live in one organized platform instead of separate spreadsheets and apps.",
  },
  {
    q: "Which organizations is Altroz HRMS suitable for?",
    a: "Altroz HRMS is designed for growing teams and can suit startups, SMEs, corporate offices, manufacturing companies, healthcare organizations, retail businesses, and multi-location organizations depending on the enabled modules.",
  },
  {
    q: "Can Altroz HRMS support approvals and record keeping?",
    a: "Yes. The platform can help structure approvals and keep related HR records organized so teams can review work more easily.",
  },
  {
    q: "Which modules can be centralized in one place?",
    a: "Depending on configuration, Altroz HRMS can help manage core HR, attendance, payroll, leave, recruitment, performance, assets, reports, analytics, and employee self-service.",
  },
  {
    q: "Does the platform support reports and analytics?",
    a: "Yes. Altroz HRMS includes reporting and analytics capabilities that help teams review workforce data, branch summaries, and module-level insights from one place.",
  },
  {
    q: "How do we get started?",
    a: "You can book a demo or contact the team to discuss your current workflow, the modules you need, and the best way to configure the platform for your organization.",
  },
];

function usePageMeta(title: string, description: string, canonicalPath: string) {
  useEffect(() => {
    const previousTitle = document.title;
    const existingMeta = document.querySelector('meta[name="description"]');
    const previousDescription = existingMeta?.getAttribute("content");
    let metaTag = existingMeta as HTMLMetaElement | null;
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    const previousCanonical = existingCanonical?.getAttribute("href");
    let canonicalTag = existingCanonical as HTMLLinkElement | null;

    document.title = title;

    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.name = "description";
      document.head.appendChild(metaTag);
    }

    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.rel = "canonical";
      document.head.appendChild(canonicalTag);
    }

    metaTag.content = description;
    canonicalTag.href = `${window.location.origin}${canonicalPath}`;

    return () => {
      document.title = previousTitle;

      if (metaTag) {
        if (previousDescription !== null && previousDescription !== undefined) {
          metaTag.content = previousDescription;
        } else {
          metaTag.remove();
        }
      }

      if (canonicalTag) {
        if (previousCanonical) {
          canonicalTag.href = previousCanonical;
        } else {
          canonicalTag.remove();
        }
      }
    };
  }, [canonicalPath, description, title]);
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">{eyebrow}</div>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      <p className="mt-3 text-ink-soft">{description}</p>
    </div>
  );
}

function MetricCard({ label, value }: MetaItem) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4 shadow-card">
      <div className="text-xs font-semibold uppercase tracking-wider text-primary">{label}</div>
      <div className="mt-2 text-sm font-semibold text-ink">{value}</div>
    </div>
  );
}

export default function WhyAltozPage() {
  usePageMeta(pageTitle, pageDescription, ROUTES.whyAltroz);

  const [selectedModule, setSelectedModule] = useState(moduleOptions[0].id);
  const [selectedIndustry, setSelectedIndustry] = useState(industryOptions[0].id);

  const currentModule =
    moduleOptions.find((item) => item.id === selectedModule) ?? moduleOptions[0];
  const currentIndustry =
    industryOptions.find((item) => item.id === selectedIndustry) ?? industryOptions[0];

  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-4 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x grid gap-10 py-12 lg:grid-cols-12 lg:items-center lg:py-16">
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Why Businesses Choose Altroz HRMS
              </span>
              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                A Complete HRMS Platform Built for Smarter Business Growth
              </h1>
              <p className="mt-4 max-w-xl text-base text-ink-soft">
                Businesses need more than basic HR software. They need a complete HR solution that
                saves time, reduces manual work, improves workforce visibility, and supports
                business growth.
              </p>
              <p className="mt-3 max-w-xl text-base text-ink-soft">
                Altroz HRMS is designed to simplify HR operations for startups, SMEs, manufacturing
                companies, corporate offices, healthcare organizations, retail businesses,
                multi-location teams, and growing enterprises.
              </p>
              <p className="mt-3 max-w-xl text-base text-ink-soft">
                Manage employee records, attendance, payroll, leave, recruitment, performance,
                assets, reports, and HR workflows from one centralized platform.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/company/book-demo" className="btn-primary">
                  Book Free Demo
                </a>
                <a href="/company/contact-us" className="btn-outline">
                  Talk to Our Team
                </a>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <MetricCard label="Central value" value="One organized HR system" />
                <MetricCard label="Workflow focus" value="Less manual work" />
                <MetricCard label="Reporting fit" value="Dashboards and insights" />
              </div>
            </div>

            <div className="lg:col-span-6 lg:pl-2">
              <div className="relative mx-auto max-w-3xl">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-4 shadow-float sm:p-5">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 popup-blue-band" />

                  <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                    <div className="rounded-[1.7rem] border border-border bg-surface p-4 sm:p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-primary">
                            Central platform
                          </div>
                          <div className="mt-1 text-lg font-bold text-ink">
                            Altroz HRMS command center
                          </div>
                        </div>
                        <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                          Depending on enabled modules
                        </div>
                      </div>

                      <div className="mt-4 rounded-[1.5rem] border border-border bg-white p-4 shadow-card">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white shadow-sm">
                              <LayoutDashboard className="h-6 w-6" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-ink">Altroz HRMS</div>
                              <div className="text-xs text-ink-soft">
                                Centralized HR workflow view
                              </div>
                            </div>
                          </div>
                          <div className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                            Ready for review
                          </div>
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          {[
                            { label: "Employee Management", icon: <Users className="h-4 w-4" /> },
                            { label: "Attendance", icon: <Clock3 className="h-4 w-4" /> },
                            { label: "Payroll", icon: <Wallet className="h-4 w-4" /> },
                            {
                              label: "Reports and Analytics",
                              icon: <FileBarChart2 className="h-4 w-4" />,
                            },
                          ].map((item, index) => (
                            <div
                              key={item.label}
                              style={{ animationDelay: `${index * 100}ms` }}
                              className={cn(
                                "rounded-[1.25rem] border border-border p-4 transition-transform duration-300 hover:-translate-y-1",
                                index % 2 === 0 ? "bg-primary-soft/35" : "bg-white",
                              )}
                            >
                              <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                                <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-primary shadow-sm">
                                  {item.icon}
                                </span>
                                {item.label}
                              </div>
                              <div className="mt-3 h-1.5 rounded-full bg-surface">
                                <div
                                  className="h-full rounded-full bg-primary"
                                  style={{ width: "78%" }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                      {[
                        {
                          title: "Centralized HR",
                          desc: "Keep records and workflows in one organized platform.",
                          icon: <BadgeCheck className="h-5 w-5" />,
                        },
                        {
                          title: "Faster Approvals",
                          desc: "Route requests through a clearer approval flow.",
                          icon: <Workflow className="h-5 w-5" />,
                        },
                        {
                          title: "Payroll Ready",
                          desc: "Keep salary-related data easier to review.",
                          icon: <Wallet className="h-5 w-5" />,
                        },
                        {
                          title: "Attendance Visibility",
                          desc: "Monitor attendance activity from one view.",
                          icon: <Clock3 className="h-5 w-5" />,
                        },
                        {
                          title: "Employee Self-Service",
                          desc: "Give people a cleaner way to handle requests.",
                          icon: <Users className="h-5 w-5" />,
                        },
                        {
                          title: "Reports and Insights",
                          desc: "Review workforce data without scattered files.",
                          icon: <BarChart3 className="h-5 w-5" />,
                        },
                      ].map((item, index) => (
                        <div
                          key={item.title}
                          style={{ animationDelay: `${index * 70}ms` }}
                          className={cn(
                            "soft-card flex items-start gap-3 p-4 transition-transform duration-300 hover:-translate-y-1",
                            index === 1 || index === 4 ? "float-slow" : "",
                          )}
                        >
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-ink">{item.title}</div>
                            <p className="mt-1 text-xs leading-5 text-ink-soft">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-5 sm:py-6">
          <div className="container-x">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {capabilityStrip.map((item, index) => (
                <div
                  key={item.label}
                  style={{ animationDelay: `${index * 65}ms` }}
                  className="soft-card flex items-center gap-3 px-4 py-3 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary-soft text-primary">
                    {item.icon}
                  </div>
                  <div className="text-sm font-semibold text-ink">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="why" className="bg-surface py-16 sm:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Business value"
              title="Why teams choose Altroz HRMS for day-to-day operations"
              description="Altroz HRMS is a practical fit when businesses want a simpler way to manage workforce data, approvals, reports, and routine HR tasks without stitching together disconnected tools."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
              {reasonCards.map((card, index) => (
                <article
                  key={card.title}
                  style={{ animationDelay: `${index * 70}ms` }}
                  className="soft-card relative overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/55 via-primary/20 to-success/40" />
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                    {card.icon}
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="comparison" className="py-16 sm:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Before and after"
              title="Move from scattered HR work to a centralized operating model"
              description="A comparison like this makes it easier for business owners and HR leaders to see where the platform adds practical day-to-day value."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto_1fr]">
              <div className="soft-card h-full p-6">
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
                  Before
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">Fragmented HR setup</h3>
                <div className="mt-5 space-y-3">
                  {[
                    "Employee details live in separate files and folders.",
                    "Attendance, leave, payroll, and reports are not always connected.",
                    "Approvals move through email, chat, or manual follow-up.",
                    "Managers spend extra time checking different sources for the same data.",
                  ].map((item) => (
                    <div key={item} className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-destructive" />
                      <p className="text-sm leading-6 text-ink-soft">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-primary text-white shadow-pop">
                  <ArrowRight className="h-6 w-6" />
                </div>
              </div>

              <div className="soft-card h-full p-6">
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  With Altroz HRMS
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">One organized HR platform</h3>
                <div className="mt-5 space-y-3">
                  {[
                    "Employee records, attendance, leave, payroll, and reports stay connected.",
                    "Approvals and record updates are easier to follow in one workflow.",
                    "Departments and branches can review information from the same system.",
                    "HR teams spend less time chasing data and more time using it.",
                  ].map((item) => (
                    <div key={item} className="flex gap-3 rounded-2xl bg-primary-soft/35 p-3">
                      <span className="mt-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-white">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                      <p className="text-sm leading-6 text-ink">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="modules" className="bg-surface py-16 sm:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Interactive modules"
              title="See how the core HR modules come together"
              description="Pick a module to see how Altroz HRMS keeps the workflow focused, organized, and easy to explain across HR, managers, and employees."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
              <div className="soft-card p-3">
                <div className="space-y-2">
                  {moduleOptions.map((module, index) => {
                    const active = module.id === selectedModule;
                    return (
                      <button
                        key={module.id}
                        type="button"
                        onClick={() => setSelectedModule(module.id)}
                        style={{ animationDelay: `${index * 35}ms` }}
                        className={cn(
                          "w-full rounded-2xl p-3 text-left transition-all duration-300",
                          active
                            ? "bg-primary text-white shadow-pop"
                            : "bg-white/70 text-ink hover:-translate-y-0.5 hover:bg-white",
                        )}
                        aria-pressed={active}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={cn(
                              "grid h-10 w-10 shrink-0 place-items-center rounded-2xl",
                              active ? "bg-white/15 text-white" : "bg-primary-soft text-primary",
                            )}
                          >
                            {module.icon}
                          </span>
                          <span className="block">
                            <span className="block text-sm font-semibold">{module.label}</span>
                            <span
                              className={cn(
                                "mt-1 block text-xs leading-5",
                                active ? "text-white/80" : "text-ink-soft",
                              )}
                            >
                              {module.note}
                            </span>
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="soft-card p-6 md:p-8">
                <div className="grid gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-primary-soft text-primary">
                        {currentModule.icon}
                      </span>
                      {currentModule.label}
                    </div>
                    <h3 className="mt-4 text-3xl font-bold tracking-tight text-ink">
                      {currentModule.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-soft">
                      {currentModule.summary}
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {currentModule.bullets.map((bullet, index) => (
                        <div
                          key={bullet}
                          style={{ animationDelay: `${index * 60}ms` }}
                          className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <p className="text-sm leading-6 text-ink">{bullet}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      {[
                        {
                          title: "Centralized records",
                          desc: "Keep employee information in one place.",
                          icon: <LayoutDashboard className="h-4 w-4" />,
                        },
                        {
                          title: "Cleaner approvals",
                          desc: "Make requests easier to review and follow.",
                          icon: <Workflow className="h-4 w-4" />,
                        },
                        {
                          title: "Reporting ready",
                          desc: "Use the same data for dashboards and reviews.",
                          icon: <BarChart3 className="h-4 w-4" />,
                        },
                        {
                          title: "Employee self-service",
                          desc: "Reduce repeated manual follow-ups.",
                          icon: <Users className="h-4 w-4" />,
                        },
                      ].map((item, index) => (
                        <div
                          key={item.title}
                          style={{ animationDelay: `${index * 60}ms` }}
                          className="rounded-2xl border border-border bg-white p-4 shadow-sm"
                        >
                          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                            <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary-soft text-primary">
                              {item.icon}
                            </span>
                            {item.title}
                          </div>
                          <p className="mt-2 text-xs leading-5 text-ink-soft">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-border bg-surface p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                          Workflow view
                        </div>
                        <div className="mt-1 text-lg font-bold text-ink">What this helps with</div>
                      </div>
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                        <Layers3 className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-3">
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <div className="text-sm font-semibold text-ink">Organized data</div>
                        <p className="mt-1 text-xs leading-5 text-ink-soft">
                          Keep related records closer together so review is faster and cleaner.
                        </p>
                      </div>
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <div className="text-sm font-semibold text-ink">Clearer process</div>
                        <p className="mt-1 text-xs leading-5 text-ink-soft">
                          Make handoffs, approvals, and record updates easier to follow.
                        </p>
                      </div>
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <div className="text-sm font-semibold text-ink">Better reviews</div>
                        <p className="mt-1 text-xs leading-5 text-ink-soft">
                          Use reports and dashboards to understand what is happening across teams.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="lifecycle" className="py-16 sm:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Employee lifecycle"
              title="A simple view of the employee journey"
              description="Altroz HRMS can support each stage of the employee lifecycle, helping teams keep records, approvals, and reporting connected as work moves forward."
            />

            <div className="relative mt-10">
              <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-border lg:block" />
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {lifecycleSteps.map((step, index) => (
                  <div
                    key={step.title}
                    style={{ animationDelay: `${index * 70}ms` }}
                    className="soft-card relative p-5 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                        {step.icon}
                      </div>
                      <div className="hidden h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-primary xl:flex">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="industry" className="bg-surface py-16 sm:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Industry selector"
              title="A flexible fit for different operating models"
              description="Different organizations need different workforce structures. Select an industry to see the kind of value Altroz HRMS can support without changing the visual style of your existing website."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
              <div className="soft-card p-3">
                <div className="space-y-2">
                  {industryOptions.map((industry, index) => {
                    const active = industry.id === selectedIndustry;
                    return (
                      <button
                        key={industry.id}
                        type="button"
                        onClick={() => setSelectedIndustry(industry.id)}
                        style={{ animationDelay: `${index * 40}ms` }}
                        className={cn(
                          "w-full rounded-2xl p-3 text-left transition-all duration-300",
                          active
                            ? "bg-primary text-white shadow-pop"
                            : "bg-white/70 text-ink hover:-translate-y-0.5 hover:bg-white",
                        )}
                        aria-pressed={active}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={cn(
                              "grid h-10 w-10 shrink-0 place-items-center rounded-2xl",
                              active ? "bg-white/15 text-white" : "bg-primary-soft text-primary",
                            )}
                          >
                            {industry.icon}
                          </span>
                          <span className="block">
                            <span className="block text-sm font-semibold">{industry.label}</span>
                            <span
                              className={cn(
                                "mt-1 block text-xs leading-5",
                                active ? "text-white/80" : "text-ink-soft",
                              )}
                            >
                              Click to preview the fit
                            </span>
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="soft-card p-6 md:p-8">
                <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-primary-soft text-primary">
                        {currentIndustry.icon}
                      </span>
                      {currentIndustry.label}
                    </div>
                    <h3 className="mt-4 text-3xl font-bold tracking-tight text-ink">
                      {currentIndustry.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-soft">
                      {currentIndustry.summary}
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {currentIndustry.bullets.map((bullet) => (
                        <div
                          key={bullet}
                          className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                          <p className="text-sm leading-6 text-ink">{bullet}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                      Centralized platform view
                    </div>
                    <div className="mt-2 text-lg font-bold text-ink">
                      Useful across branches and departments
                    </div>
                    <div className="mt-4 grid gap-3">
                      {[
                        "Attendance and leave records stay organized in one place.",
                        "Payroll and reports can use the same underlying HR data.",
                        "Approvals and visibility improve across the workflow.",
                        "Employee self-service can reduce repeated manual queries.",
                      ].map((item, index) => (
                        <div
                          key={item}
                          style={{ animationDelay: `${index * 50}ms` }}
                          className={cn(
                            "flex items-start gap-3 rounded-2xl p-4",
                            index % 2 === 0 ? "bg-primary-soft/35" : "bg-surface",
                          )}
                        >
                          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-sm">
                            <BadgeCheck className="h-4 w-4" />
                          </div>
                          <p className="text-sm leading-6 text-ink">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="support" className="py-16 sm:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Support journey"
              title="A practical path from first conversation to steady use"
              description="A buyer page works best when it reduces friction. This section shows how a simple conversation can turn into a structured rollout without making unsupported promises."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-8">
                <div className="grid gap-4 md:grid-cols-2">
                  {supportSteps.map((step, index) => (
                    <div
                      key={step.title}
                      style={{ animationDelay: `${index * 70}ms` }}
                      className="soft-card relative overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1"
                    >
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/55 via-primary/20 to-success/40" />
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                        {step.icon}
                      </div>
                      <div className="mt-4 text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
                        Step {index + 1}
                      </div>
                      <h3 className="mt-2 text-xl font-bold text-ink">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="soft-card lg:col-span-4">
                <div className="p-6">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    What buyers usually want
                  </div>
                  <h3 className="mt-2 text-2xl font-bold text-ink">
                    A clearer HR system, not more complexity
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">
                    The goal is to help your team keep daily HR work easier to manage, easier to
                    review, and easier to scale according to workforce requirements.
                  </p>

                  <div className="mt-6 space-y-3">
                    {[
                      "One place for records, requests, and reports",
                      "Cleaner workflows for approvals and reviews",
                      "More visibility for HR and management",
                      "A better fit for evolving business needs",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-2xl bg-surface p-4"
                      >
                        <div className="grid h-8 w-8 place-items-center rounded-xl bg-white text-primary shadow-sm">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium text-ink">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-3">
                    <a href="/company/book-demo" className="btn-primary justify-center">
                      Book Free Demo
                    </a>
                    <a href="/company/contact-us" className="btn-outline justify-center">
                      Talk to Our Team
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-surface py-16 sm:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="FAQ"
              title="Questions teams ask before choosing Altroz HRMS"
              description="This FAQ keeps the page conversion-focused while staying grounded in the product content already present in the repository."
              align="center"
            />

            <div className="mx-auto mt-10 max-w-4xl">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((item, index) => (
                  <AccordionItem
                    key={item.q}
                    value={`faq-${index}`}
                    className="soft-card overflow-hidden border-0 px-5"
                  >
                    <AccordionTrigger className="py-5 text-left text-base font-semibold text-ink hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-6 text-ink-soft">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container-x">
            <div className="relative overflow-hidden rounded-[2.25rem] border border-border bg-white p-8 shadow-float md:p-10">
              <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 left-0 h-56 w-56 rounded-full bg-success/10 blur-3xl" />

              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    Final CTA
                  </div>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                    Build Smarter HR Processes with Altroz HRMS
                  </h2>
                  <p className="mt-4 max-w-2xl text-ink-soft">
                    Simplify attendance, payroll, leave, employee records, recruitment, reporting,
                    and other HR activities through one centralized platform.
                  </p>
                  <p className="mt-3 max-w-2xl text-ink-soft">
                    Reduce manual work, improve workforce visibility, and create more efficient HR
                    experiences with Altroz HRMS.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href="/company/book-demo" className="btn-primary">
                      Book Your Free Demo Today
                    </a>
                    <a href="/company/contact-us" className="btn-outline">
                      Contact Our Team
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Attendance",
                      "Payroll",
                      "Leave",
                      "Reports",
                      "Employee Self-Service",
                      "Recruitment",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className={cn(
                          "rounded-[1.5rem] border border-border p-4 shadow-card",
                          index % 3 === 0 ? "bg-primary-soft/35" : "bg-white",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-primary shadow-sm">
                            <BadgeCheck className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-ink">{item}</div>
                            <div className="text-xs text-ink-soft">Connected HR module</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
