import { useEffect } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  Globe,
  LineChart,
  PieChart,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import TopNavbar from "@/components/site/TopNavbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { modelScreenshots } from "@/lib/modelScreenshots";

type FeatureCard = {
  title: string;
  desc: string;
  icon: ReactNode;
  bullets: string[];
};

type IconCard = {
  title: string;
  desc: string;
  icon: ReactNode;
};

type ReportCard = {
  title: string;
  desc: string;
};

const heroStats = [
  { label: "Workforce view", value: "One live dashboard" },
  { label: "Report coverage", value: "Attendance to compliance" },
  { label: "Exports", value: "Excel and PDF ready" },
];

const matterCards = [
  {
    icon: <Users className="h-5 w-5" />,
    title: "Improve employee productivity",
    desc: "See how attendance, leave, and performance patterns influence daily output.",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Reduce absenteeism",
    desc: "Spot recurring absence trends early and act before they affect operations.",
  },
  {
    icon: <Wallet className="h-5 w-5" />,
    title: "Monitor payroll expenses",
    desc: "Track salary cost, allowances, deductions, and overtime from one place.",
  },
  {
    icon: <Search className="h-5 w-5" />,
    title: "Track recruitment performance",
    desc: "Measure open roles, source quality, pipeline health, and hiring speed.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Analyze workforce trends",
    desc: "Follow headcount, department growth, attrition, and utilization over time.",
  },
  {
    icon: <Target className="h-5 w-5" />,
    title: "Improve employee retention",
    desc: "Identify patterns that point to engagement, workload, or turnover concerns.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Ensure HR compliance",
    desc: "Keep PF, ESI, PT, and other statutory information visible and organized.",
  },
  {
    icon: <Clock3 className="h-5 w-5" />,
    title: "Make faster decisions",
    desc: "Turn raw HR data into action without waiting on manual spreadsheet reports.",
  },
];

const analyticsFeatures: FeatureCard[] = [
  {
    title: "Real-Time HR Dashboard",
    desc: "Get a live overview of your workforce from one centralized dashboard.",
    icon: <BarChart3 className="h-5 w-5" />,
    bullets: [
      "Attendance",
      "Leave",
      "Payroll",
      "Recruitment",
      "Employee strength",
      "Department statistics",
    ],
  },
  {
    title: "Attendance Analytics",
    desc: "Understand attendance behavior with clear, useful workforce patterns.",
    icon: <Clock3 className="h-5 w-5" />,
    bullets: [
      "Present and absent employees",
      "Late arrivals",
      "Overtime analysis",
      "Shift performance",
      "Attendance percentage",
      "Monthly trends",
    ],
  },
  {
    title: "Payroll Analytics",
    desc: "Review salary cost and pay patterns without chasing separate reports.",
    icon: <Wallet className="h-5 w-5" />,
    bullets: [
      "Salary cost analysis",
      "Department-wise payroll",
      "Allowances and deductions",
      "Payroll comparison",
      "Monthly reports",
      "Cost optimization insights",
    ],
  },
  {
    title: "Leave Analytics",
    desc: "Keep leave usage visible across the organization and each department.",
    icon: <CalendarDays className="h-5 w-5" />,
    bullets: [
      "Leave balance reports",
      "Leave utilization",
      "Department trends",
      "Approval statistics",
      "Holiday analysis",
      "Absenteeism reports",
    ],
  },
  {
    title: "Recruitment Analytics",
    desc: "Track the hiring pipeline from open roles to successful closures.",
    icon: <Search className="h-5 w-5" />,
    bullets: [
      "Open positions",
      "Candidate pipeline",
      "Interview status",
      "Hiring success rate",
      "Source analysis",
      "Time-to-hire reports",
    ],
  },
  {
    title: "Performance Analytics",
    desc: "See how teams and individuals are performing over time.",
    icon: <TrendingUp className="h-5 w-5" />,
    bullets: [
      "Performance ratings",
      "Goal completion",
      "Department comparison",
      "Individual performance",
      "Productivity insights",
      "Trend analysis",
    ],
  },
  {
    title: "Workforce Analytics",
    desc: "Understand the shape of your organization at a glance.",
    icon: <Users className="h-5 w-5" />,
    bullets: [
      "Employee demographics",
      "Department strength",
      "Gender diversity",
      "Employee growth",
      "Attrition rate",
      "Workforce distribution",
    ],
  },
  {
    title: "Compliance Analytics",
    desc: "Keep statutory reporting organized and ready when it matters.",
    icon: <FileCheck2 className="h-5 w-5" />,
    bullets: [
      "PF reports",
      "ESIC reports",
      "Professional Tax",
      "TDS reports",
      "Compliance tracking",
      "Audit-ready reports",
    ],
  },
];

const reportCategories: ReportCard[] = [
  { title: "Attendance Reports", desc: "Track punctuality, absence, and shift behavior." },
  { title: "Payroll Reports", desc: "Review cost, salary, allowances, and deductions." },
  { title: "Leave Reports", desc: "See balances, utilization, approvals, and holiday patterns." },
  {
    title: "Recruitment Reports",
    desc: "Monitor pipeline health, hiring speed, and source quality.",
  },
  { title: "Employee Reports", desc: "Work with employee profiles, changes, and activity data." },
  { title: "Department Reports", desc: "Compare team performance, headcount, and capacity." },
  { title: "Performance Reports", desc: "Follow goal progress, ratings, and productivity trends." },
  { title: "Compliance Reports", desc: "Keep statutory information organized and audit-friendly." },
  {
    title: "Custom HR Reports",
    desc: "Create views tailored to leadership and operational needs.",
  },
];

const benefitCards: IconCard[] = [
  {
    icon: <Target className="h-5 w-5" />,
    title: "Data-Driven Decision Making",
    desc: "Use real-time workforce data to make informed business decisions instead of relying on assumptions.",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Increase Productivity",
    desc: "Identify performance trends, attendance patterns, and workforce efficiency quickly.",
  },
  {
    icon: <Wallet className="h-5 w-5" />,
    title: "Reduce HR Costs",
    desc: "Monitor payroll expenses, overtime, and workforce utilization with less manual effort.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Improve Employee Retention",
    desc: "Spot turnover signals and engagement concerns before they become larger issues.",
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: "Better Workforce Planning",
    desc: "Plan hiring, staffing, and resource allocation using accurate HR insights.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Enhanced Compliance",
    desc: "Generate audit-ready reports and monitor statutory compliance efficiently.",
  },
];

const whyChoosePoints = [
  "Real-Time HR Dashboard",
  "Smart Workforce Insights",
  "Easy-to-Understand Visual Reports",
  "Customizable Analytics",
  "Role-Based Dashboard Access",
  "Secure Cloud-Based Platform",
  "Mobile-Friendly Dashboard",
  "Automated Report Generation",
  "Advanced Filters and Search",
  "Export Reports in Excel and PDF",
];

const industries = [
  "Information Technology",
  "Manufacturing",
  "Healthcare",
  "Education",
  "Retail",
  "Hospitality",
  "Logistics",
  "Construction",
  "Banking and Finance",
  "Startups and SMEs",
];

const faqItems = [
  {
    q: "What is HR Analytics?",
    a: "HR Analytics is the process of collecting, analyzing, and interpreting employee data to improve HR operations, workforce planning, and business decision-making.",
  },
  {
    q: "What reports are available in Altroz HRMS?",
    a: "Altroz HRMS provides attendance, payroll, leave, recruitment, performance, compliance, employee, department, and custom HR reports.",
  },
  {
    q: "Can I export reports?",
    a: "Yes. Reports can be exported in Excel and PDF formats for easy sharing and record keeping.",
  },
  {
    q: "Is the dashboard updated in real time?",
    a: "Yes. HR dashboards and analytics are updated using the latest available workforce data.",
  },
  {
    q: "Is HR Analytics suitable for small businesses?",
    a: "Yes. Altroz HRMS is suitable for startups, SMEs, and large enterprises and can scale according to organizational requirements.",
  },
];

const dashboardPulse = [
  { label: "Attendance health", value: 92 },
  { label: "Payroll coverage", value: 88 },
  { label: "Leave visibility", value: 84 },
  { label: "Recruitment speed", value: 76 },
];

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const previousTitle = document.title;
    const existingMeta = document.querySelector('meta[name="description"]');
    const previousDescription = existingMeta?.getAttribute("content");
    let metaTag = existingMeta as HTMLMetaElement | null;

    document.title = title;

    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.name = "description";
      document.head.appendChild(metaTag);
    }

    metaTag.content = description;

    return () => {
      document.title = previousTitle;

      if (metaTag) {
        if (previousDescription !== null && previousDescription !== undefined) {
          metaTag.content = previousDescription;
        } else {
          metaTag.remove();
        }
      }
    };
  }, [title, description]);
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <span className="text-xs font-bold uppercase tracking-wider text-primary">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
      <p className="mt-3 text-ink-soft">{description}</p>
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="soft-card p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-primary">{label}</div>
      <div className="mt-1 text-sm font-semibold text-ink">{value}</div>
    </div>
  );
}

function GridCard({ title, desc, icon }: { title: string; desc: string; icon: ReactNode }) {
  return (
    <article className="soft-card p-6">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-ink-soft">{desc}</p>
    </article>
  );
}

function FeatureModuleCard({ feature }: { feature: FeatureCard }) {
  return (
    <article className="soft-card p-6">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
        {feature.icon}
      </div>
      <h3 className="mt-4 text-lg font-bold text-ink">{feature.title}</h3>
      <p className="mt-2 text-sm text-ink-soft">{feature.desc}</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {feature.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 rounded-xl bg-surface p-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
            <span className="text-sm text-ink">{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function ReportTile({ title, desc }: ReportCard) {
  return (
    <article className="rounded-2xl border border-border bg-white p-5 shadow-card transition-transform duration-300 hover:-translate-y-0.5">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-ink">{title}</div>
        <FileText className="h-4 w-4 text-primary" />
      </div>
      <p className="mt-2 text-sm text-ink-soft">{desc}</p>
    </article>
  );
}

export default function HrAnalyticsPage() {
  usePageMeta(
    "HR Analytics Software in Pune | Altroz HRMS",
    "Make smarter HR decisions with Altroz HRMS HR Analytics. Monitor attendance, payroll, leave, recruitment, performance, compliance, and workforce trends from one real-time dashboard.",
  );

  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />
          <div className="pointer-events-none absolute right-1/3 top-1/4 h-28 w-28 rounded-full bg-primary/10 blur-2xl" />

          <div className="container-x py-8 lg:py-10">
            <div className="mx-auto max-w-3xl text-center fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                HR Analytics Dashboard
              </span>
              <h1 className="mt-3 text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Make Better HR Decisions with Smart HR Analytics
              </h1>
              <p className="mt-3 text-base text-ink-soft">
                Transform your workforce data into actionable insights with Altroz HRMS HR
                Analytics. Track attendance, payroll, leave, recruitment, employee performance,
                compliance, and workforce trends from one centralized dashboard.
              </p>
              <p className="mt-3 text-base text-ink-soft">
                Whether you are a growing business or a large enterprise, Altroz HRMS helps you make
                data-driven decisions, improve operational efficiency, and optimize workforce
                productivity.
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <a href="/company/book-demo" className="btn-primary">
                  Book Free Demo
                </a>
                <a href="/company/contact-us" className="btn-outline">
                  Talk to an Expert
                </a>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <StatPill key={stat.label} label={stat.label} value={stat.value} />
              ))}
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["Attendance", "Payroll", "Leave", "Recruitment", "Performance", "Compliance"].map(
                (item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-3 py-2 text-sm font-medium text-ink shadow-sm"
                  >
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    {item}
                  </span>
                ),
              )}
            </div>

            <div className="relative mt-10 overflow-hidden lg:left-1/2 lg:right-1/2 lg:w-screen lg:-ml-[50vw] lg:-mr-[50vw]">
              <div className="absolute -inset-x-8 -top-4 h-72 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
              <div className="relative overflow-hidden border-y border-border bg-white shadow-float">
                <div className="overflow-hidden bg-surface">
                  <img
                    src={modelScreenshots.employeeReport}
                    alt="HR analytics dashboard preview"
                    className="block h-auto w-full object-contain bg-white"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="HR analytics basics"
                title="What is HR Analytics?"
                description="HR Analytics helps organizations monitor, measure, and analyze workforce data from one centralized platform. Instead of managing multiple reports and Excel sheets, Altroz HRMS provides real-time dashboards that help HR teams and management make faster and smarter decisions."
              />
              <p className="mt-4 max-w-2xl text-ink-soft">
                Convert complex employee data into clear reports, visual dashboards, and meaningful
                workforce insights.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "See trends without switching tools",
                  "Keep reports consistent across teams",
                  "Spot issues earlier with live data",
                  "Simplify review and decision-making",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                    <BadgeCheck className="mt-0.5 h-4 w-4 text-primary" />
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="soft-card overflow-hidden p-0">
                <div className="grid gap-0 md:grid-cols-2">
                  <div className="p-6 md:p-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-primary">
                      Centralized data
                    </div>
                    <h3 className="mt-2 text-2xl font-bold text-ink">
                      Clear reports instead of scattered spreadsheets
                    </h3>
                    <p className="mt-3 text-sm text-ink-soft">
                      A focused analytics layer helps HR, finance, and leadership read the same
                      numbers without rebuilding them for every meeting.
                    </p>

                    <div className="mt-6 space-y-3">
                      {[
                        { label: "Attendance", value: "92%" },
                        { label: "Payroll accuracy", value: "99.3%" },
                        { label: "Leave visibility", value: "88%" },
                      ].map((item) => (
                        <div key={item.label} className="rounded-xl border border-border p-3">
                          <div className="flex items-center justify-between gap-3 text-sm font-medium text-ink">
                            <span>{item.label}</span>
                            <span className="text-primary">{item.value}</span>
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-surface">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{ width: item.value }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-surface p-4 md:p-6">
                    <div className="rounded-[1.5rem] border border-border bg-white p-5 shadow-card">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-primary">
                            Analytics snapshot
                          </div>
                          <div className="mt-1 text-lg font-bold text-ink">
                            Workforce health score
                          </div>
                        </div>
                        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white">
                          <PieChart className="h-6 w-6" />
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-3">
                        {[
                          ["Attendance", "High visibility"],
                          ["Payroll", "Ready to review"],
                          ["Leave", "Balanced trend"],
                          ["Compliance", "Audit friendly"],
                        ].map(([label, value]) => (
                          <div key={label} className="rounded-2xl bg-surface p-4">
                            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                              {label}
                            </div>
                            <div className="mt-1 text-sm font-semibold text-ink">{value}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 rounded-2xl border border-dashed border-primary/25 bg-primary-soft/40 p-4 text-sm text-ink-soft">
                        Turn complex employee data into clear reports, visual dashboards, and
                        meaningful workforce insights.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Why it matters"
              title="Why HR Analytics Matters"
              description="Modern businesses generate large amounts of HR data every month. Managing this information manually makes it difficult to identify workforce trends, monitor performance, control costs, and make timely decisions."
            />

            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {matterCards.map((card) => (
                <GridCard key={card.title} title={card.title} desc={card.desc} icon={card.icon} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Module coverage"
              title="Powerful HR Analytics Features"
              description="Create visually consistent feature cards for the core HR modules leaders and managers use most often."
            />

            <div className="mt-10 grid gap-5 xl:grid-cols-2">
              {analyticsFeatures.map((feature) => (
                <FeatureModuleCard key={feature.title} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Interactive reporting"
                title="Interactive Reports and Dashboards"
                description="Altroz HRMS provides customizable dashboards designed for HR managers, business owners, and management teams."
              />

              <div className="mt-6 rounded-3xl border border-primary/20 bg-white p-6 shadow-float">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Export note
                </div>
                <p className="mt-2 text-lg font-semibold text-ink">
                  Export reports in Excel and PDF formats for easy sharing and analysis.
                </p>
                <div className="mt-5 flex items-center gap-3 rounded-2xl bg-primary-soft/50 p-4 text-sm text-ink">
                  <Download className="h-5 w-5 text-primary" />
                  Built for quick reviews, team updates, and leadership presentations.
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {reportCategories.map((report) => (
                  <ReportTile key={report.title} title={report.title} desc={report.desc} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Business value"
              title="Benefits of HR Analytics"
              description="A strong analytics layer helps people teams move from reporting to action with less friction."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {benefitCards.map((card) => (
                <GridCard key={card.title} title={card.title} desc={card.desc} icon={card.icon} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Why Altroz"
                title="Why Choose Altroz HRMS HR Analytics?"
                description="Use smart workforce insights, visual reporting, and role-based controls to help managers make better decisions without unnecessary complexity."
              />

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {whyChoosePoints.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border bg-white p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm font-medium text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Smart workforce insights
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">
                  Built to make HR reporting easier to understand and act on
                </h3>
                <p className="mt-3 text-sm text-ink-soft">
                  The page avoids inflated claims and stays grounded in practical reporting,
                  visibility, and dashboard usability.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "Role-based dashboard access for different teams",
                    "Quick filters and search for faster analysis",
                    "Simple report views that are easy to share",
                    "Export-ready outputs for leadership and audits",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-xl bg-surface p-3">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      <span className="text-sm text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Industries"
              title="Industries We Serve"
              description="The same analytics platform can support a wide range of teams and operating models."
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
              {industries.map((industry) => (
                <div
                  key={industry}
                  className="soft-card flex items-center justify-between gap-3 px-4 py-4"
                >
                  <div className="text-sm font-semibold text-ink">{industry}</div>
                  <Globe className="h-4 w-4 text-primary" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20" id="faq">
          <div className="container-x grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Questions"
                title="Frequently Asked Questions"
                description="An accessible accordion keeps the most common questions easy to scan and expand."
              />
            </div>

            <div className="lg:col-span-7">
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
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">
                    Final step
                  </div>
                  <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                    Transform Your HR Data into Business Intelligence
                  </h2>
                  <p className="mt-3 max-w-2xl text-ink-soft">
                    Unlock the full potential of your workforce with powerful HR Analytics from
                    Altroz HRMS. Gain real-time insights, simplify reporting, and make smarter HR
                    decisions that support business growth.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                  <a href="/company/book-demo" className="btn-primary">
                    Book Your Free Demo Today
                  </a>
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
