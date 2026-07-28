import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  CircleX,
  Coins,
  Crown,
  Info,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { ROUTES } from "@/routes/routeConfig.js";

type FeatureState = "included" | "notIncluded" | "limited" | "optional";

type FeatureRow = {
  label: string;
  basic: FeatureState;
  professional: FeatureState;
  premium: FeatureState;
  note?: string;
};

type FeatureGroup = {
  title: string;
  description: string;
  rows: FeatureRow[];
};

type PlanCard = {
  name: string;
  price: number;
  accent: string;
  icon: ReactNode;
  summary: string;
  bullets: string[];
};

type AddOnCard = {
  title: string;
  description: string;
  note: string;
  accent: string;
};

const included = "included" as const;
const notIncluded = "notIncluded" as const;
const limited = "limited" as const;
const optional = "optional" as const;

const row = (
  label: string,
  basic: FeatureState,
  professional: FeatureState,
  premium: FeatureState,
  note?: string,
): FeatureRow => ({ label, basic, professional, premium, note });

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(value);

const statusMeta: Record<
  FeatureState,
  { label: string; className: string; icon: ReactNode }
> = {
  included: {
    label: "Included",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  notIncluded: {
    label: "Not included",
    className: "border-slate-200 bg-slate-100 text-slate-500",
    icon: <CircleX className="h-4 w-4" />,
  },
  limited: {
    label: "Limited",
    className: "border-amber-200 bg-amber-50 text-amber-700",
    icon: <Info className="h-4 w-4" />,
  },
  optional: {
    label: "Optional",
    className: "border-violet-200 bg-violet-50 text-violet-700",
    icon: <Sparkles className="h-4 w-4" />,
  },
};

const planCards: PlanCard[] = [
  {
    name: "Basic",
    price: 21,
    accent: "bg-primary-soft text-primary",
    icon: <BadgeCheck className="h-5 w-5" />,
    summary:
      "Core employee records, attendance, leave, team actions, reporting and admin controls for teams that want a compact starting point.",
    bullets: [
      "Employee management and directory tools",
      "Attendance, leave and reporting essentials",
      "Administration and organization setup",
    ],
  },
  {
    name: "Professional",
    price: 36,
    accent: "bg-[#ecfdf3] text-success",
    icon: <ShieldCheck className="h-5 w-5" />,
    summary:
      "A broader operational plan with recruitment, documents, payroll, compliance, assets and performance modules.",
    bullets: [
      "Everything in Basic plus deeper workflows",
      "Recruitment, documents and payroll coverage",
      "Compliance, assets and performance features",
    ],
  },
  {
    name: "Premium",
    price: 53,
    accent: "bg-surface text-ink",
    icon: <Crown className="h-5 w-5" />,
    summary:
      "The widest coverage in the sheet, including premium attendance, extra reporting depth and the fullest feature set.",
    bullets: [
      "Everything in Professional",
      "Shift management and salary history",
      "Broader reporting and advanced coverage",
    ],
  },
];

const pricingHighlights = [
  {
    title: "Basic",
    value: "₹21 / employee / month",
    desc: "Entry pricing for core HR, attendance and leave.",
    icon: <BadgeCheck className="h-4 w-4" />,
  },
  {
    title: "Professional",
    value: "₹36 / employee / month",
    desc: "Expanded coverage for recruiting, payroll and compliance.",
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  {
    title: "Premium",
    value: "₹53 / employee / month",
    desc: "Full-suite coverage for the broadest rollout.",
    icon: <Crown className="h-4 w-4" />,
  },
  {
    title: "Optional add-ons",
    value: "Geo tracking, integrations and custom work",
    desc: "Extra capabilities can be layered on as needed.",
    icon: <Coins className="h-4 w-4" />,
  },
];

const featureGroups: FeatureGroup[] = [
  {
    title: "Employee Management",
    description: "Core employee records, profile tools and organization setup.",
    rows: [
      row("Employee Database", included, included, included),
      row("Employee Profile Management", included, included, included),
      row("Employee Master Records", included, included, included),
      row("Employee Directory", included, included, included),
      row("Department Management", included, included, included),
      row("Designation Management", included, included, included),
      row("Branch Management", included, included, included),
      row("Employee Category Management", included, included, included),
      row("Employee Lifecycle Tracking", notIncluded, included, included),
      row("Employee History", included, included, included),
      row("Employee Document Management", included, included, included),
      row("Employee Search", included, included, included),
      row("Employee Status Management", included, included, included),
      row("Employee Information Dashboard", included, notIncluded, included),
    ],
  },
  {
    title: "Attendance",
    description: "Attendance capture, shift control and attendance reporting.",
    rows: [
      row("Biometric Attendance Integration", included, included, included),
      row("GPS Based Attendance", notIncluded, included, included),
      row("Geo Location Attendance", included, included, included),
      row("Geo Fencing", optional, included, included, "Add-on on Basic"),
      row("Shift Management", notIncluded, notIncluded, included),
      row("Attendance Dashboard", included, included, included),
      row("Attendance Regularization", notIncluded, included, included),
      row("Missing Punch Management", notIncluded, included, included),
      row("Late Mark Management", included, included, included),
      row("Overtime Tracking", included, included, included),
      row("Attendance Summary", included, included, included),
      row("Daily Attendance Report", included, included, included),
      row("Monthly Attendance Report", included, included, included),
      row("Branch Wise Attendance", included, included, included),
      row("Department Wise Attendance", included, included, included),
    ],
  },
  {
    title: "Leave",
    description: "Leave workflows, calendar visibility and leave analytics.",
    rows: [
      row("Leave Dashboard", included, included, included),
      row("Leave Request", included, included, included),
      row("Leave Approval Workflow", included, included, included),
      row("Multi-Level Approval", notIncluded, included, included),
      row("Leave Balance Tracking", included, included, included),
      row("Leave Transaction History", included, included, included),
      row("Leave Calendar", included, included, included),
      row("Leave Types Configuration", included, included, included),
      row("Holiday Management", included, included, included),
      row("Pending Leave Tracking", included, included, included),
      row("Leave Reports", included, included, included),
      row("Department Wise Leave Reports", included, included, included),
      row("Leave Analytics", included, included, included),
    ],
  },
  {
    title: "Recruitment",
    description: "Applicant flow and recruiting coverage for the Premium plan.",
    rows: [
      row("Position Management", notIncluded, notIncluded, included),
      row("Vacancy Management", notIncluded, notIncluded, included),
      row("Job Requisition", notIncluded, notIncluded, included),
      row("Applicant Management", notIncluded, notIncluded, included),
      row("Applicant Applications", notIncluded, notIncluded, included),
      row("Interview Scheduling", notIncluded, notIncluded, included),
      row("Interview Tracking", notIncluded, notIncluded, included),
      row("Offer Management", notIncluded, notIncluded, included),
      row("Recruitment Dashboard", notIncluded, notIncluded, included),
      row("Recruitment Reports", notIncluded, notIncluded, included),
    ],
  },
  {
    title: "Documents",
    description: "Offer letters, templates, employee documents and document control.",
    rows: [
      row("Appointment Letter", notIncluded, included, included),
      row("Offer Letter", notIncluded, included, included),
      row("Joining Letter", notIncluded, included, included),
      row("PDF Document Generation", notIncluded, included, included),
      row("Document Templates", notIncluded, included, included),
      row("Employee Document Storage", notIncluded, included, included),
      row("Document Version Control", notIncluded, notIncluded, included),
      row("Document Download", notIncluded, included, included),
    ],
  },
  {
    title: "Payroll",
    description: "Payroll processing, salary rules, reports and payroll analytics.",
    rows: [
      row("Payroll Dashboard", notIncluded, included, included),
      row("Payroll Processing", notIncluded, included, included),
      row("Salary Computation", notIncluded, included, included),
      row("Salary Processing", notIncluded, included, included),
      row("Payroll Settings", notIncluded, included, included),
      row("Compensation Templates", notIncluded, limited, included),
      row("Advance Salary Management", notIncluded, included, included),
      row("Salary Slip Generation", notIncluded, included, included),
      row("Salary History", notIncluded, notIncluded, included),
      row("Payroll Reports", notIncluded, included, included),
      row("Salary Reports", notIncluded, included, included),
      row("Payroll Summary", notIncluded, included, included),
      row("Payroll Analytics", notIncluded, included, included),
      row("Salary Advance Summary", notIncluded, included, included),
    ],
  },
  {
    title: "Compliance",
    description: "Statutory settings and compliance reporting.",
    rows: [
      row("PF", notIncluded, included, included),
      row("ESI", notIncluded, included, included),
      row("PT", notIncluded, included, included),
      row("LWF", notIncluded, included, included),
      row("Tax Configuration", notIncluded, included, included),
      row("UAN Management", notIncluded, included, included),
      row("PF Reports", notIncluded, included, included),
      row("ESI Reports", notIncluded, included, included),
      row("PT Reports", notIncluded, included, included),
      row("Compliance Reports", notIncluded, notIncluded, included),
    ],
  },
  {
    title: "Asset Management",
    description: "Asset allocation, tracking, maintenance and reporting.",
    rows: [
      row("Asset Dashboard", notIncluded, included, included),
      row("Asset Registration", notIncluded, included, included),
      row("Asset Allocation", notIncluded, included, included),
      row("Asset Hand Over", notIncluded, included, included),
      row("Asset Status Management", notIncluded, included, included),
      row("Asset Category Management", notIncluded, included, included),
      row("Asset Type Management", notIncluded, included, included),
      row("Asset Maintenance", notIncluded, included, included),
      row("Warranty Tracking", notIncluded, included, included),
      row("Asset Depreciation", notIncluded, included, included),
      row("Asset Utilization Tracking", notIncluded, included, included),
      row("Asset Reports", notIncluded, included, included),
      row("Asset History", notIncluded, included, included),
    ],
  },
  {
    title: "Performance",
    description: "Performance dashboards and employee performance tracking.",
    rows: [
      row("Performance Dashboard", notIncluded, included, included),
      row("Employee Performance Tracking", notIncluded, included, included),
      row("Performance Reports", notIncluded, included, included),
    ],
  },
  {
    title: "Team Actions",
    description: "Operational employee actions and engagement-related workflows.",
    rows: [
      row("Company Announcements", included, included, included),
      row("Employee Notifications", included, included, included),
      row("Employee Transfer", included, included, included),
      row("Employee Promotion", included, included, included),
      row("Employee Resignation", included, included, included),
      row("Employee Termination", included, included, included),
      row("Employee Reimbursement", included, notIncluded, included),
      row("Event Management", included, included, included),
      row("Holiday Management", included, included, included),
      row("Awards & Recognition", notIncluded, notIncluded, included),
    ],
  },
  {
    title: "Reports",
    description: "Export-ready reports for people, payroll, attendance and assets.",
    rows: [
      row("Employee Reports", included, included, included),
      row("Employee Salary Reports", notIncluded, included, included),
      row("Attendance Reports", included, included, included),
      row("Leave Reports", included, included, included),
      row("Payroll Reports", notIncluded, included, included),
      row("PF Reports", notIncluded, included, included),
      row("ESI Reports", notIncluded, included, included),
      row("Professional Tax Reports", notIncluded, included, included),
      row("LWF Reports", notIncluded, included, included),
      row("Asset Reports", notIncluded, notIncluded, included),
      row("Excel Export", included, included, included),
      row("PDF Export", included, included, included),
    ],
  },
  {
    title: "Administration",
    description: "Organization setup, access control and system governance.",
    rows: [
      row("Role Management", included, included, included),
      row("User Management", included, included, included),
      row("User Employee Mapping", included, included, included),
      row("Multi-Level Approval", included, included, included),
      row("Organization Management", included, included, included),
      row("Company Configuration", included, included, included),
      row("Branch Configuration", included, included, included),
      row("Department Configuration", included, included, included),
      row("Notification Settings", included, included, included),
      row("Leave Type Configuration", included, included, included),
      row("Rule Engine", included, included, included),
    ],
  },
];

const addOnCards: AddOnCard[] = [
  {
    title: "Geo Tracking",
    description: "Optional add-on from the sheet.",
    note: "+ ₹70 / employee / month",
    accent: "bg-primary-soft text-primary",
  },
  {
    title: "Mobile App",
    description: "Listed as an optional extra in the sheet.",
    note: "Plan entitlement should be confirmed during quote finalization.",
    accent: "bg-[#ecfdf3] text-success",
  },
  {
    title: "API Integration",
    description: "Optional integration item from the sheet.",
    note: "Best suited for teams with custom workflows.",
    accent: "bg-surface text-ink",
  },
  {
    title: "WhatsApp Integration",
    description: "Optional communication add-on.",
    note: "Useful for alerts and operational messaging.",
    accent: "bg-[#fff7ed] text-[#c2410c]",
  },
  {
    title: "Biometric Device",
    description: "Optional hardware integration.",
    note: "Can support attendance workflows where needed.",
    accent: "bg-[#eff6ff] text-[#2563eb]",
  },
  {
    title: "Custom Development",
    description: "Optional implementation work.",
    note: "For org-specific enhancements or workflows.",
    accent: "bg-[#f5f3ff] text-[#6d28d9]",
  },
];

function StatusChip({ state }: { state: FeatureState }) {
  const meta = statusMeta[state];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${meta.className}`}
    >
      {meta.icon}
      {meta.label}
    </span>
  );
}

function PlanCardView({ plan }: { plan: PlanCard }) {
  return (
    <article className="soft-card relative flex h-full min-h-[420px] flex-col overflow-hidden p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">{plan.name}</div>
          <h3 className="mt-2 text-4xl font-black tracking-tight text-ink">
            ₹{formatPrice(plan.price)}
          </h3>
          <p className="mt-1 text-sm text-ink-soft">/ employee / month</p>
        </div>

        <div className={`grid h-11 w-11 place-items-center rounded-2xl ${plan.accent}`}>
          {plan.icon}
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-ink-soft">{plan.summary}</p>

      <div className="mt-5 space-y-2">
        {plan.bullets.map((bullet) => (
          <div key={bullet} className="flex items-start gap-3 rounded-2xl bg-surface/45 p-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span className="text-sm leading-6 text-ink">{bullet}</span>
          </div>
        ))}
      </div>

      <a href="#feature-comparison" className="btn-outline mt-auto w-full justify-center">
        Know more
      </a>
    </article>
  );
}

function FeatureGroupCard({ group }: { group: FeatureGroup }) {
  return (
    <section className="soft-card overflow-hidden p-5 sm:p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Feature section</div>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-ink">{group.title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">{group.description}</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-ink-soft">
          <Info className="h-4 w-4 text-primary" />
          {group.rows.length} features
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <div className="min-w-[820px] overflow-hidden rounded-[1.35rem] border border-border bg-white">
          <div className="grid grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))] bg-surface/70">
            <div className="px-4 py-3 text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
              Feature
            </div>
            <div className="px-4 py-3 text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
              Basic
            </div>
            <div className="px-4 py-3 text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
              Professional
            </div>
            <div className="px-4 py-3 text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
              Premium
            </div>
          </div>

          <div className="divide-y divide-border">
            {group.rows.map((feature) => (
              <div
                key={feature.label}
                className="grid grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))] items-center"
              >
                <div className="px-4 py-4">
                  <div className="text-sm font-semibold text-ink">{feature.label}</div>
                  {feature.note ? (
                    <div className="mt-1 text-xs leading-6 text-ink-soft">{feature.note}</div>
                  ) : null}
                </div>
                <div className="px-4 py-4">
                  <StatusChip state={feature.basic} />
                </div>
                <div className="px-4 py-4">
                  <StatusChip state={feature.professional} />
                </div>
                <div className="px-4 py-4">
                  <StatusChip state={feature.premium} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AddOnCardView({ card }: { card: AddOnCard }) {
  return (
    <article className="soft-card flex h-full flex-col p-5 sm:p-6">
      <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${card.accent}`}>
        <Coins className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-xl font-bold text-ink">{card.title}</h3>
      <p className="mt-2 text-sm leading-7 text-ink-soft">{card.description}</p>
      <div className="mt-4 rounded-2xl border border-border bg-white p-4">
        <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Note</div>
        <p className="mt-2 text-sm leading-7 text-ink">{card.note}</p>
      </div>
    </article>
  );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Pricing Plans | Altroz HRMS"
        description="Compare the Altroz HRMS pricing plans in detail. See Basic, Professional and Premium pricing, feature coverage, and optional add-ons."
        canonicalPath={ROUTES.pricing}
      />
      <TopNavbar />
      <MainNavbar />

      <main className="overflow-x-hidden">
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 top-12 h-72 w-72 rounded-full bg-success/10 blur-3xl" />

          <div className="container-x grid gap-10 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-18">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary shadow-sm">
                <Sparkles className="h-4 w-4" />
                Pricing sheet
              </div>

              <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Altroz HRMS Pricing Plans
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
                Feature comparison for Basic (₹21), Professional (₹36), Premium (₹53) and add-ons,
                rebuilt as a clear pricing page with plan cards and sectioned feature comparisons.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={ROUTES.bookDemo} className="btn-primary">
                  Request a demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to={ROUTES.contact} className="btn-outline">
                  Talk to sales
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {pricingHighlights.map((item) => (
                  <div key={item.title} className="soft-card p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                      {item.icon}
                      {item.title}
                    </div>
                    <div className="mt-2 text-base font-bold text-ink">{item.value}</div>
                    <p className="mt-1 text-sm leading-6 text-ink-soft">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/10 via-transparent to-success/10 blur-2xl" />
              <div className="relative rounded-[2rem] border border-border bg-white p-5 shadow-float">
                <div className="grid gap-4 md:grid-cols-3">
                  {planCards.map((plan) => (
                    <div key={plan.name} className="soft-card p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                        {plan.name}
                      </div>
                      <div className="mt-2 text-2xl font-black text-ink">₹{formatPrice(plan.price)}</div>
                      <div className="mt-1 text-sm text-ink-soft">per employee / month</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-[1.5rem] border border-border bg-surface/40 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                        Comparison focus
                      </div>
                      <h2 className="mt-2 text-2xl font-black tracking-tight text-ink">
                        Section cards for each pricing feature group
                      </h2>
                    </div>
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white">
                      <Users className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      "Employee management",
                      "Attendance and leave",
                      "Recruitment and documents",
                      "Payroll, compliance and reports",
                      "Assets, performance and administration",
                      "Optional add-ons and integrations",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl bg-white p-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                        <span className="text-sm leading-6 text-ink">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <div className="container-x">
            <div className="max-w-3xl">
              <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                Plan cards
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Three pricing plans, presented clearly
              </h2>
              <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">
                The plans below summarize the pricing sheet before the feature sections break the
                coverage down module by module.
              </p>
            </div>

            <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
              {planCards.map((plan) => (
                <PlanCardView key={plan.name} plan={plan} />
              ))}
            </div>
          </div>
        </section>

        <section id="feature-comparison" className="bg-surface py-14 sm:py-16 lg:py-20">
          <div className="container-x">
            <div className="max-w-3xl">
              <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                Feature comparison
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Section cards for the pricing features
              </h2>
              <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">
                Every major module from the sheet is grouped into a dedicated card so the plan
                differences are easy to scan, compare and present on desktop or mobile.
              </p>
            </div>

            <div className="mt-10 space-y-5">
              {featureGroups.map((group) => (
                <FeatureGroupCard key={group.title} group={group} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <div className="container-x">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                Optional add-ons
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Extend your plan with the extras your team needs
              </h2>
              <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">
                Choose optional capabilities for geofencing, app access, integrations, alerts and
                custom development when you need to go beyond the core plans.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {addOnCards.map((card) => (
                <AddOnCardView key={card.title} card={card} />
              ))}
            </div>
          </div>
        </section>

        <section className="hero-gradient py-14 sm:py-16 lg:py-20">
          <div className="container-x">
            <div className="rounded-[2rem] border border-border bg-white p-8 shadow-float md:p-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                    Next step
                  </div>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                    Want this turned into a live pricing section or page block?
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-ink-soft">
                    The page now reflects the pricing sheet with clean cards and sectioned feature
                    groups. If you want, I can also turn the add-ons into a separate comparison
                    table or adjust the layout to match a specific visual reference.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Link to={ROUTES.bookDemo} className="btn-primary">
                    Request a demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to={ROUTES.contact} className="btn-outline">
                    Contact us
                  </Link>
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
