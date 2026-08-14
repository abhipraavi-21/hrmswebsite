import { useMemo, useState, type ReactNode } from "react";
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
import { Link, createSearchParams, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import Footer from "@/components/site/Footer";
import ManagedCmsShowcasePage from "@/components/site/ManagedCmsShowcasePage";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import {
  PricingFeatureComparisonSection,
  PRICING_FEATURE_SECTION_TYPE,
} from "@/components/site/PricingFeatureComparisonSection";
import TopNavbar from "@/components/site/TopNavbar";
import { usePublicContent } from "@/hooks/usePublicContent";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/routes/routeConfig.js";
import { getSection } from "@/services/cmsHelpers";
import { fetchPricingPage } from "@/services/pricingService";
import { getSeedPricingPageFallback } from "@/services/seedFallback";

type FeatureState = "included" | "notIncluded" | "limited" | "optional" | "addon";

type FeatureRow = {
  label: string;
  basic: FeatureState;
  professional: FeatureState;
  premium: FeatureState;
  note?: string;
};

type FeatureGroup = {
  eyebrow?: string;
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
const addOn = "addon" as const;

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

const calculatorTicks = [0, 500, 1000, 2000, 3000];
const calculatorMin = 0;
const calculatorMax = 3000;

const clampValue = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const normalizeEmployeeCount = (value: number) =>
  clampValue(
    Number.isFinite(value) ? Math.round(value) : calculatorMin,
    calculatorMin,
    calculatorMax,
  );

const getRecommendedPlan = (employeeCount: number) =>
  employeeCount < 75 ? "Basic" : employeeCount < 250 ? "Professional" : "Premium";

const statusMeta: Record<FeatureState, { label: string; className: string; icon: ReactNode }> = {
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
  addon: {
    label: "Add On",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: <CheckCircle2 className="h-4 w-4" />,
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

const addOnGroup: FeatureGroup = {
  eyebrow: "Add On",
  title: "Add On",
  description:
    "Optional capabilities that can be attached to any of the three plans when your team needs extra coverage.",
  rows: [
    row("Geo Tracking", addOn, addOn, addOn),
    row("Mobile App", addOn, addOn, addOn),
    row("API Integration", addOn, addOn, addOn),
    row("WhatsApp Integration", addOn, addOn, addOn),
    row("Biometric Device", addOn, addOn, addOn),
    row("Custom Development", addOn, addOn, addOn),
  ],
};

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

function PlanCardView({ plan, employeeCount }: { plan: PlanCard; employeeCount: number }) {
  const monthlyTotal = plan.price * employeeCount;

  return (
    <article className="soft-card relative flex h-full min-h-[420px] flex-col overflow-hidden p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
            {plan.name}
          </div>
          <h3 className="mt-2 text-4xl font-black tracking-tight text-ink">
            ₹{formatPrice(monthlyTotal)}
          </h3>
          <p className="mt-1 text-sm text-ink-soft">for {employeeCount} employees / month</p>
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
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
            {group.eyebrow ?? "Feature section"}
          </div>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-ink">{group.title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">{group.description}</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-ink-soft">
          <Info className="h-4 w-4 text-primary" />
          {group.rows.length} features
        </div>
      </div>

      <div className="mt-5 md:hidden">
        <div className="space-y-3">
          {group.rows.map((feature) => (
            <div key={feature.label} className="rounded-[1.35rem] border border-border bg-white p-4">
              <div className="text-sm font-semibold text-ink">{feature.label}</div>
              {feature.note ? (
                <div className="mt-1 text-xs leading-6 text-ink-soft">{feature.note}</div>
              ) : null}

              <div className="mt-4 grid gap-2">
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface/50 px-3 py-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
                    Basic
                  </span>
                  <StatusChip state={feature.basic} />
                </div>
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface/50 px-3 py-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
                    Professional
                  </span>
                  <StatusChip state={feature.professional} />
                </div>
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface/50 px-3 py-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
                    Premium
                  </span>
                  <StatusChip state={feature.premium} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 hidden overflow-x-auto md:block">
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
      <div
        className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${card.accent}`}
      >
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

function PricingCalculatorSection({
  employeeCount,
  onEmployeeCountChange,
  plans,
}: {
  employeeCount: number;
  onEmployeeCountChange: (nextValue: number) => void;
  plans: PlanCard[];
}) {
  const recommendedPlan = getRecommendedPlan(employeeCount);
  const planTotals = useMemo(
    () =>
      plans.map((plan) => ({
        ...plan,
        total: plan.price * employeeCount,
      })),
    [employeeCount, plans],
  );

  const handleEmployeeChange = (nextValue: number) => {
    onEmployeeCountChange(normalizeEmployeeCount(nextValue));
  };

  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-primary shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Instant estimate
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-ink sm:text-4xl">
            Estimate pricing by team size
          </h2>
          <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">
            Slide the employee count to see how Basic, Professional and Premium scale on your
            pricing page using the same plan prices from Altroz HRMS.
          </p>
        </div>

        <div className="mt-10 rounded-[2rem] border border-primary/15 bg-white p-4 shadow-float sm:p-6">
          <div className="rounded-[1.65rem] border border-primary/15 bg-gradient-to-br from-[#eff6ff] via-white to-[#f8fbff] p-5 sm:p-6">
            <div className="grid gap-5 lg:grid-cols-[auto_1fr_auto] lg:items-center">
              <div className="hidden rounded-2xl border border-primary/20 bg-white px-4 py-3 text-sm font-semibold text-ink-soft shadow-sm lg:inline-flex lg:items-center lg:gap-2">
                Slide
                <ArrowRight className="h-4 w-4 text-primary" />
              </div>

              <div className="space-y-5">
                <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:flex-wrap">
                  <span className="text-lg font-medium text-ink-soft sm:text-2xl">
                    Get instant estimate for
                  </span>
                  <Input
                    type="number"
                    min={calculatorMin}
                    max={calculatorMax}
                    inputMode="numeric"
                    value={Number.isFinite(employeeCount) ? employeeCount : calculatorMin}
                    onChange={(event) =>
                      handleEmployeeChange(Number.parseInt(event.currentTarget.value || "0", 10))
                    }
                    className="h-12 w-28 border-primary/20 bg-white text-center text-2xl font-black text-ink shadow-sm focus-visible:ring-primary"
                  />
                  <span className="text-lg font-medium text-ink-soft sm:text-2xl">employees</span>
                </div>

                <div className="mx-auto w-full max-w-5xl">
                  <Slider
                    value={[employeeCount]}
                    min={calculatorMin}
                    max={calculatorMax}
                    step={1}
                    onValueChange={([value]) => handleEmployeeChange(value)}
                    className="[&_[role=slider]]:border-primary [&_[role=slider]]:bg-white [&_[role=slider]]:shadow-sm"
                  />
                  <div className="mt-3 grid grid-cols-5 text-xs font-semibold text-primary/80">
                    {calculatorTicks.map((tick) => (
                      <span
                        key={tick}
                        className={cn(
                          "text-left",
                          tick === 3000
                            ? "text-right"
                            : tick === 1000 || tick === 2000
                              ? "text-center"
                              : "",
                        )}
                      >
                        {tick === 3000 ? "3000+" : tick}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Badge className="justify-self-center border-primary/20 bg-primary text-white shadow-sm lg:justify-self-end">
                Recommended: {recommendedPlan}
              </Badge>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3 lg:gap-5">
            {planTotals.map((plan) => {
              const isRecommended = plan.name === recommendedPlan;

              return (
                <article
                  key={plan.name}
                  className={cn(
                    "relative flex h-full min-h-[270px] flex-col rounded-[1.5rem] border p-5 shadow-sm transition-all lg:p-6",
                    isRecommended
                      ? "border-primary bg-primary-soft/40 ring-1 ring-primary/10"
                      : "border-border bg-white",
                  )}
                >
                  {isRecommended ? (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 border-primary/20 bg-primary text-white shadow-sm">
                      Recommended
                    </Badge>
                  ) : null}

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                        {plan.name}
                      </div>
                      <div className="mt-2 text-4xl font-black tracking-tight text-ink">
                        ₹{formatPrice(plan.price)}
                      </div>
                      <div className="mt-1 text-sm text-ink-soft">per employee / month</div>
                    </div>

                    <div className={`grid h-11 w-11 place-items-center rounded-2xl ${plan.accent}`}>
                      {plan.icon}
                    </div>
                  </div>

                  <div className="mt-5 border-t border-border pt-4 text-sm leading-6 text-ink-soft">
                    <div className="flex items-center justify-between gap-3 py-1">
                      <span>Rate / employee</span>
                      <span className="font-semibold text-ink">₹{formatPrice(plan.price)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3 py-1">
                      <span>Employees</span>
                      <span className="font-semibold text-ink">{employeeCount}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3 py-1">
                      <span>Estimated total</span>
                      <span className="font-semibold text-ink">₹{formatPrice(plan.total)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3 py-1">
                      <span>Best for</span>
                      <span className="font-semibold text-ink">
                        {plan.name === "Basic"
                          ? "Smaller teams"
                          : plan.name === "Professional"
                            ? "Growing teams"
                            : "Larger rollouts"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex justify-center">
                    <Link
                      to={`${ROUTES.hrmsPricingPurchase}?${createSearchParams({
                        plan: plan.name.toLowerCase(),
                        employees: String(employeeCount),
                        billing: "monthly",
                      })}`}
                      className="inline-flex min-w-40 items-center justify-center rounded-full border border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                    >
                      Purchase Now
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PricingPage() {
  const location = useLocation();

  if (location.pathname.startsWith(ROUTES.bulkEmailPricing)) {
    return (
      <ManagedCmsShowcasePage
        pageKey="bulk-email-pricing"
        canonicalPath={location.pathname}
        navbarVariant="bulkEmail"
        fallbackTitle="Bulk Email Pricing Page | Altroz Bulk Email"
        fallbackDescription="Present your bulk email pricing structure clearly with editable plans, delivery coverage, scheduling, templates, analytics and onboarding information."
      />
    );
  }

  if (location.pathname.startsWith(ROUTES.assetManagementPricing)) {
    return (
      <ManagedCmsShowcasePage
        pageKey="asset-management-pricing"
        canonicalPath={location.pathname}
        navbarVariant="assetManagement"
        fallbackTitle="Altroz Asset Management Pricing - Plans for Up to 2,000 Assets"
        fallbackDescription="Explore Altroz Asset Management pricing plans for businesses managing up to 2,000 assets. Compare annual plans and book a demo."
      />
    );
  }

  return <HrmsPricingPage />;
}

function HrmsPricingPage() {
  const [employeeCount, setEmployeeCount] = useState(100);
  const seedPricingPage = useMemo(() => getSeedPricingPageFallback(), []);
  const { data: remoteContent } = usePublicContent(
    fetchPricingPage,
    [],
    seedPricingPage,
  );
  const heroSection = getSection(remoteContent, "pricing-hero");
  const activePlanCards = useMemo<PlanCard[]>(() => {
    if (!remoteContent?.plans?.length) {
      return planCards;
    }

    return remoteContent.plans.map((plan) => ({
      name: plan.name,
      price: plan.monthlyPrice,
      accent: (plan.settings?.accent as string | undefined) ?? "bg-primary-soft text-primary",
      icon:
        plan.name === "Basic" ? (
          <BadgeCheck className="h-5 w-5" />
        ) : plan.name === "Professional" ? (
          <ShieldCheck className="h-5 w-5" />
        ) : (
          <Crown className="h-5 w-5" />
        ),
      summary: plan.shortDescription ?? "",
      bullets:
        plan.features
          ?.slice()
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((feature) => feature.featureText) ?? [],
    }));
  }, [remoteContent?.plans]);
  const activeHighlights = useMemo(() => {
    if (!heroSection?.items?.length) {
      return pricingHighlights;
    }

    return heroSection.items.map((item) => ({
      title: item.title ?? "",
      value: item.subtitle ?? "",
      desc: item.description ?? "",
      icon:
        item.title === "Basic" ? (
          <BadgeCheck className="h-4 w-4" />
        ) : item.title === "Professional" ? (
          <ShieldCheck className="h-4 w-4" />
        ) : item.title === "Premium" ? (
          <Crown className="h-4 w-4" />
        ) : (
          <Coins className="h-4 w-4" />
        ),
    }));
  }, [heroSection?.items]);
  const customFeatureSections = useMemo(
    () =>
      (remoteContent?.sections ?? [])
        .filter((section) => section.sectionType === PRICING_FEATURE_SECTION_TYPE)
        .sort((a, b) => a.displayOrder - b.displayOrder),
    [remoteContent?.sections],
  );

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={remoteContent?.metaTitle ?? "Pricing Plans | Altroz HRMS"}
        description={
          remoteContent?.metaDescription ??
          "Compare the Altroz HRMS pricing plans in detail. See Basic, Professional and Premium pricing, feature coverage, and optional add-ons."
        }
        canonicalPath={ROUTES.hrmsPricing}
        image={remoteContent?.ogImage ?? undefined}
        imageAlt={remoteContent?.ogImageAlt ?? undefined}
        ogTitle={
          remoteContent?.ogTitle ?? remoteContent?.metaTitle ?? "Pricing Plans | Altroz HRMS"
        }
        ogDescription={
          remoteContent?.ogDescription ??
          remoteContent?.metaDescription ??
          "Compare the Altroz HRMS pricing plans in detail. See Basic, Professional and Premium pricing, feature coverage, and optional add-ons."
        }
      />
      <TopNavbar />
      <MainNavbar />

      <main className="overflow-x-hidden">
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 top-12 h-72 w-72 rounded-full bg-success/10 blur-3xl" />

          <div className="container-x grid gap-10 py-5 sm:py-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-extrabold tracking-normal text-primary shadow-sm">
                <Sparkles className="h-4 w-4" />
                {heroSection?.subheading ?? "Pricing sheet"}
              </div>

              <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                {heroSection?.heading ?? "Altroz HRMS Pricing Plans"}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
                {heroSection?.description ??
                  "Feature comparison for Basic (₹21), Professional (₹36), Premium (₹53) and add-ons, rebuilt as a clear pricing page with plan cards and sectioned feature comparisons."}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={heroSection?.buttonLink ?? ROUTES.bookDemo} className="btn-primary">
                  {heroSection?.buttonText ?? "Request a demo"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to={
                    (heroSection?.settings?.secondaryButtonLink as string | undefined) ??
                    ROUTES.hrmsContact
                  }
                  className="btn-outline"
                >
                  {(heroSection?.settings?.secondaryButtonText as string | undefined) ??
                    "Talk to sales"}
                </Link>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {activeHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="soft-card flex h-full flex-col gap-2 p-3.5 sm:p-4"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                      {item.icon}
                      {item.title}
                    </div>
                    <div className="text-base font-bold text-ink">{item.value}</div>
                    <p className="text-sm leading-5 text-ink-soft">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/10 via-transparent to-success/10 blur-2xl" />
              <div className="relative rounded-xl border border-border bg-white p-5 shadow-float">
                <div className="grid gap-4 md:grid-cols-3">
                  {activePlanCards.map((plan) => (
                    <div
                      key={plan.name}
                      className="rounded-xl border border-border bg-white p-4 shadow-sm"
                    >
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                        {plan.name}
                      </div>
                      <div className="mt-2 text-2xl font-black text-ink">
                        ₹{formatPrice(plan.price)}
                      </div>
                      <div className="mt-1 text-sm text-ink-soft">per employee / month</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-border bg-surface/40 p-5">
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

        <PricingCalculatorSection
          employeeCount={employeeCount}
          onEmployeeCountChange={setEmployeeCount}
          plans={activePlanCards}
        />

        <section className="py-14 sm:py-16 lg:py-20">
          <div className="container-x">
            <div className="mx-auto max-w-3xl text-center">
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
              {activePlanCards.map((plan) => (
                <PlanCardView key={plan.name} plan={plan} employeeCount={employeeCount} />
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
              {customFeatureSections.length
                ? customFeatureSections.map((section) => (
                    <PricingFeatureComparisonSection key={section.id} section={section} />
                  ))
                : featureGroups.map((group) => (
                    <FeatureGroupCard key={group.title} group={group} />
                  ))}
            </div>
          </div>
        </section>

        {!customFeatureSections.length ? (
          <section className="py-14 sm:py-16 lg:py-20">
            <div className="container-x">
              <div>
                <FeatureGroupCard group={addOnGroup} />
              </div>
            </div>
          </section>
        ) : null}

        <section className="hero-gradient py-14 sm:py-16 lg:py-20">
          <div className="container-x">
            <div className="rounded-[2rem] border border-border bg-white p-8 shadow-float md:p-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                    Next step
                  </div>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                    Want a tailored walkthrough of your pricing and ROI numbers?
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-ink-soft">
                    The page now includes the pricing table and add-ons, giving a clear view of the
                    plan structure before you request a tailored walkthrough.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Link to={ROUTES.bookDemo} className="btn-primary">
                    Request a demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to={ROUTES.hrmsContact} className="btn-outline">
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
