import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Banknote,
  BriefcaseBusiness,
  Calculator,
  ChartColumn,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Copy,
  Download,
  Eye,
  Gauge,
  Info,
  LineChart as LineChartIcon,
  Percent,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Link } from "react-router-dom";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ROUTES } from "@/routes/routeConfig.js";
import { cn } from "@/lib/utils";
import {
  calculateHrmsRoi,
  clampNumber,
  formatCompactINR,
  formatINR,
  getDefaultAttendanceHours,
  getDefaultEmployeeQueryHours,
  getDefaultHrTeamMembers,
  getDefaultLeaveHours,
  getDefaultPayrollDays,
  getDefaultReportingHours,
  getDefaultRecruitmentHours,
  recommendPlan,
  safeNumber,
  type RoiCalculatorInput,
  type RoiModuleBreakdown,
  type RoiModuleId,
} from "@/utils/hrmsRoiCalculator";
import { roiCalculatorConfig, type RoiAdoptionKey, type RoiPlanKey, type RoiSetupKey } from "@/config/roiCalculatorConfig";

const STORAGE_KEY = "peoplepulse:roi-calculator";

const moduleIconMap: Record<RoiModuleId, typeof Users> = {
  coreHr: Users,
  attendance: Target,
  leave: CheckCircle2,
  payroll: Banknote,
  selfService: Users,
  recruitment: BriefcaseBusiness,
  performance: Gauge,
  expense: Wallet,
  reports: ChartColumn,
};

const setupOptions: Array<{ key: RoiSetupKey; label: string; helper: string }> = [
  { key: "fullyManual", label: "Fully manual", helper: "Highest manual overhead" },
  { key: "spreadsheets", label: "Spreadsheets", helper: "Typical pre-software setup" },
  { key: "basicSoftware", label: "Basic HR software", helper: "Some automation already present" },
  { key: "disconnectedTools", label: "Multiple disconnected tools", helper: "Workflows split across apps" },
  { key: "integratedHRMS", label: "Existing integrated HRMS", helper: "Already partially automated" },
];

const adoptionOptions: Array<{ key: RoiAdoptionKey; label: string; value: number }> = [
  { key: "conservative", label: "Conservative", value: 0.65 },
  { key: "expected", label: "Expected", value: 0.85 },
  { key: "high", label: "High adoption", value: 0.95 },
];

const planOrder: RoiPlanKey[] = ["Starter", "Growth", "Professional", "Enterprise"];

const faqItems = [
  {
    q: "What does HRMS ROI mean?",
    a: "It is an estimate of the value PeoplePulse could generate by reducing repetitive HR work, payroll corrections, compliance exposure and software costs compared with the subscription and implementation cost.",
  },
  {
    q: "How are HR hours saved calculated?",
    a: "The calculator estimates current monthly effort for payroll, attendance, leave, employee queries, recruitment, reporting and selected modules, then applies the selected automation efficiency and adoption assumptions.",
  },
  {
    q: "Is productivity value the same as cash savings?",
    a: "No. Productivity value is the estimated value of HR time that can be redirected to higher-value work. It is shown separately from direct cost savings.",
  },
  {
    q: "How accurate is this calculator?",
    a: "It is an indicative planning tool. Results are conservative and depend on the inputs, the selected modules and how quickly the team adopts the platform.",
  },
  {
    q: "Does the estimate include GST?",
    a: "No. The estimate is shown before GST and any final commercial terms unless your internal assumptions add those values separately.",
  },
  {
    q: "Are implementation and biometric-device costs included?",
    a: "Implementation cost can be added in the calculator. Hardware, custom work and other project expenses should be added through the optional fields or a final quotation.",
  },
  {
    q: "Can I calculate savings for multiple locations?",
    a: "Yes. You can enter the number of office locations and use the company profile fields to reflect a distributed workforce.",
  },
  {
    q: "Can I change the default assumptions?",
    a: "Yes. Every operational and pricing assumption is editable, including adoption level, setup, pricing, current effort and error rates.",
  },
  {
    q: "Does PeoplePulse replace the HR team?",
    a: "No. The calculator uses FTE capacity recovered as an effort-equivalent measure. PeoplePulse is meant to reduce repetitive admin work so the HR team can focus on strategic work.",
  },
  {
    q: "How can I receive an exact quotation?",
    a: "Use the Book a Demo button or contact the team. The calculator is an estimate and the final quote can reflect your rollout scope, integrations and services needs.",
  },
];

function buildDefaults(employeeCount: number): RoiCalculatorInput {
  const modules = roiCalculatorConfig.modules.reduce((acc, module) => {
    acc[module.id] = module.defaultSelected;
    return acc;
  }, {} as Record<RoiModuleId, boolean>);

  const setup = roiCalculatorConfig.defaults.currentSetup;

  return {
    companyName: "",
    employeeCount,
    hrTeamMembers: getDefaultHrTeamMembers(employeeCount),
    industry: "Information Technology",
    officeLocations: 1,
    currentSetup: setup,
    hourlyHrCost: roiCalculatorConfig.hourlyHrCost.defaultValue,
    payrollDaysPerMonth: getDefaultPayrollDays(employeeCount),
    attendanceHours: getDefaultAttendanceHours(employeeCount),
    leaveHours: getDefaultLeaveHours(employeeCount),
    employeeQueryHours: getDefaultEmployeeQueryHours(employeeCount),
    reportingHours: getDefaultReportingHours(employeeCount),
    recruitmentHours: getDefaultRecruitmentHours(employeeCount),
    payrollErrorRate: roiCalculatorConfig.setups[setup].payrollErrorRate,
    payrollErrorCorrectionCost: 800,
    annualComplianceExposure: roiCalculatorConfig.annualComplianceExposure.defaultValue,
    currentMonthlyToolCost: 0,
    implementationCost: 0,
    selectedModules: modules,
    adoptionLevel: roiCalculatorConfig.defaults.adoptionLevel,
    selectedPlan: roiCalculatorConfig.defaults.selectedPlan,
    enterpriseMonthlyEstimate: employeeCount * 45,
  };
}

function readInitialState(): RoiCalculatorInput {
  const base = buildDefaults(roiCalculatorConfig.employeeCount.defaultValue);

  if (typeof window === "undefined") {
    return base;
  }

  const sessionRaw = window.sessionStorage.getItem(STORAGE_KEY);
  if (sessionRaw) {
    try {
      const parsed = JSON.parse(sessionRaw) as Partial<RoiCalculatorInput>;
      return {
        ...base,
        ...parsed,
        employeeCount: clampNumber(
          safeNumber(parsed.employeeCount, base.employeeCount),
          roiCalculatorConfig.employeeCount.min,
          roiCalculatorConfig.employeeCount.max,
        ),
      };
    } catch {
      // fall through to query params
    }
  }

  const params = new URLSearchParams(window.location.search);
  const employeeCount = clampNumber(
    safeNumber(params.get("employees"), base.employeeCount),
    roiCalculatorConfig.employeeCount.min,
    roiCalculatorConfig.employeeCount.max,
  );
  const setup = params.get("setup") as RoiSetupKey | null;
  const plan = params.get("plan") as RoiPlanKey | "Recommended" | null;
  const industry = params.get("industry") ?? base.industry;
  const adoption = params.get("adoption") as RoiAdoptionKey | null;

  return {
    ...buildDefaults(employeeCount),
    companyName: params.get("company") ?? "",
    employeeCount,
    hrTeamMembers: clampNumber(
      safeNumber(params.get("hrTeamMembers"), getDefaultHrTeamMembers(employeeCount)),
      roiCalculatorConfig.hrTeamMembers.min,
      roiCalculatorConfig.hrTeamMembers.max,
    ),
    industry,
    officeLocations: clampNumber(
      safeNumber(params.get("locations"), 1),
      roiCalculatorConfig.officeLocations.min,
      roiCalculatorConfig.officeLocations.max,
    ),
    currentSetup: setup && setup in roiCalculatorConfig.setups ? setup : base.currentSetup,
    payrollDaysPerMonth: clampNumber(
      safeNumber(params.get("payrollDays"), getDefaultPayrollDays(employeeCount)),
      roiCalculatorConfig.payrollDaysPerMonth.min,
      roiCalculatorConfig.payrollDaysPerMonth.max,
    ),
    attendanceHours: clampNumber(
      safeNumber(params.get("attendanceHours"), getDefaultAttendanceHours(employeeCount)),
      roiCalculatorConfig.attendanceHours.min,
      roiCalculatorConfig.attendanceHours.max,
    ),
    leaveHours: Math.max(0, safeNumber(params.get("leaveHours"), getDefaultLeaveHours(employeeCount))),
    employeeQueryHours: Math.max(0, safeNumber(params.get("queryHours"), getDefaultEmployeeQueryHours(employeeCount))),
    reportingHours: Math.max(0, safeNumber(params.get("reportingHours"), getDefaultReportingHours(employeeCount))),
    recruitmentHours: Math.max(0, safeNumber(params.get("recruitmentHours"), getDefaultRecruitmentHours(employeeCount))),
    payrollErrorRate: clampNumber(
      safeNumber(params.get("errorRate"), roiCalculatorConfig.setups[base.currentSetup].payrollErrorRate),
      roiCalculatorConfig.payrollErrorRate.min,
      roiCalculatorConfig.payrollErrorRate.max,
    ),
    payrollErrorCorrectionCost: Math.max(0, safeNumber(params.get("errorCost"), 800)),
    annualComplianceExposure: Math.max(
      0,
      safeNumber(params.get("compliance"), roiCalculatorConfig.annualComplianceExposure.defaultValue),
    ),
    currentMonthlyToolCost: Math.max(0, safeNumber(params.get("toolCost"), 0)),
    implementationCost: Math.max(0, safeNumber(params.get("implementation"), 0)),
    adoptionLevel: adoption && adoption in roiCalculatorConfig.adoptionLevels ? adoption : base.adoptionLevel,
    selectedPlan: plan && plan in roiCalculatorConfig.plans ? plan : base.selectedPlan,
    enterpriseMonthlyEstimate: Math.max(0, safeNumber(params.get("enterpriseEstimate"), employeeCount * 45)),
  };
}

function SectionHeader({
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
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center")}>
      <div className="text-xs font-bold uppercase tracking-[0.28em] text-primary">{eyebrow}</div>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">{description}</p>
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
  icon,
  tooltip,
}: {
  label: string;
  value: string;
  detail?: string;
  icon: React.ReactNode;
  tooltip: string;
}) {
  return (
    <div className="soft-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary-soft text-primary">
          {icon}
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-surface hover:text-primary"
              aria-label={`More information about ${label}`}
            >
              <Info className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs text-pretty bg-ink px-3 py-2 text-xs leading-5 text-white">
            {tooltip}
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="mt-3 text-sm font-semibold text-ink-soft">{label}</div>
      <div className="mt-1 text-xl font-black tracking-tight text-ink">{value}</div>
      {detail ? <p className="mt-1 text-xs leading-6 text-ink-soft">{detail}</p> : null}
    </div>
  );
}

function ModuleCard({
  module,
  selected,
  onToggle,
}: {
  module: (typeof roiCalculatorConfig.modules)[number];
  selected: boolean;
  onToggle: (value: boolean) => void;
}) {
  const Icon = moduleIconMap[module.id];

  return (
    <button
      type="button"
      onClick={() => onToggle(!selected)}
      className={cn(
        "soft-card flex h-full flex-col gap-4 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-float",
        selected ? "border-primary/30 bg-primary/5" : "border-border",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-ink">{module.label}</h3>
            <p className="mt-1 text-xs leading-5 text-ink-soft">{module.description}</p>
          </div>
        </div>
        <Switch checked={selected} onCheckedChange={onToggle} aria-label={module.label} />
      </div>
      <div className="mt-auto flex items-center justify-between gap-3 rounded-2xl bg-white p-3">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Estimated benefit
        </span>
        <span className="text-sm font-bold text-ink">Up to {Math.round(module.efficiency * 100)}% less manual effort</span>
      </div>
    </button>
  );
}

function PlanCard({
  plan,
  selected,
  recommended,
  onSelect,
}: {
  plan: RoiPlanKey;
  selected: boolean;
  recommended: boolean;
  onSelect: (plan: RoiPlanKey) => void;
}) {
  const planConfig = roiCalculatorConfig.plans[plan];
  return (
    <button
      type="button"
      onClick={() => onSelect(plan)}
      className={cn(
        "soft-card h-full text-left transition-all duration-200 hover:-translate-y-0.5",
        selected ? "border-primary/40 bg-primary/5 shadow-float" : "border-border",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">{planConfig.label}</div>
          <h3 className="mt-2 text-2xl font-black text-ink">
            {plan === "Enterprise" ? "Custom quote" : formatINR(planConfig.basePrice ?? 0)}
          </h3>
          <p className="mt-1 text-sm leading-6 text-ink-soft">{planConfig.note}</p>
        </div>
        {recommended ? <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">Recommended</Badge> : null}
      </div>
      <div className="mt-4 grid gap-3 text-sm text-ink-soft">
        <div className="flex items-center justify-between rounded-2xl bg-surface/50 p-3">
          <span>Included employees</span>
          <span className="font-semibold text-ink">
            {plan === "Enterprise" ? "Custom" : planConfig.includedEmployees}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-surface/50 p-3">
          <span>Extra employee price</span>
          <span className="font-semibold text-ink">
            {plan === "Enterprise" ? "Quoted separately" : formatINR(planConfig.extraEmployeePrice ?? 0)}
          </span>
        </div>
      </div>
    </button>
  );
}

function ProgressRow({ label, current, saved, reduction }: { label: string; current: number; saved: number; reduction: number }) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-ink">{label}</div>
          <div className="text-xs text-ink-soft">
            Current: {current.toFixed(1)} hrs | Saved: {saved.toFixed(1)} hrs
          </div>
        </div>
        <div className="text-sm font-bold text-primary">{Math.round(reduction)}%</div>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-primary/10">
        <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, Math.max(0, reduction))}%` }} />
      </div>
    </div>
  );
}

function currencyTooltip(text: string) {
  return text;
}

export default function RoiCalculatorPage() {
  const location = useLocation();
  const reportRef = useRef<HTMLDivElement | null>(null);
  const [form, setForm] = useState<RoiCalculatorInput>(() => readInitialState());
  const result = useMemo(() => calculateHrmsRoi(form), [form]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    const params = new URLSearchParams();
    params.set("employees", String(form.employeeCount));
    params.set("industry", form.industry);
    params.set("setup", form.currentSetup);
    params.set("adoption", form.adoptionLevel);
    params.set("plan", form.selectedPlan);
    const next = `${ROUTES.roiCalculator}?${params.toString()}`;
    if (window.location.pathname + window.location.search !== next) {
      window.history.replaceState({}, "", next);
    }
  }, [form]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Track the first page open in a safe, non-sensitive way.
    window.dispatchEvent(
      new CustomEvent("roi_calculator_opened", {
        detail: {
          employeeRange:
            form.employeeCount <= 50
              ? "10-50"
              : form.employeeCount <= 250
                ? "51-250"
                : form.employeeCount <= 1000
                  ? "251-1000"
                  : "1001+",
          plan: result.recommendedPlan,
          selectedModuleCount: result.selectedModuleCount,
        },
      }),
    );
  }, []);

  const setField = <K extends keyof RoiCalculatorInput>(key: K, value: RoiCalculatorInput[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const toggleModule = (id: RoiModuleId, value: boolean) => {
    setForm((current) => ({
      ...current,
      selectedModules: { ...current.selectedModules, [id]: value },
    }));
  };

  const handleEmployeeCountChange = (nextValue: number) => {
    const employeeCount = clampNumber(
      Math.round(nextValue),
      roiCalculatorConfig.employeeCount.min,
      roiCalculatorConfig.employeeCount.max,
    );

    setForm((current) => ({
      ...current,
      employeeCount,
      hrTeamMembers: current.hrTeamMembers || getDefaultHrTeamMembers(employeeCount),
      payrollDaysPerMonth: current.payrollDaysPerMonth || getDefaultPayrollDays(employeeCount),
      attendanceHours: current.attendanceHours || getDefaultAttendanceHours(employeeCount),
      leaveHours: current.leaveHours || getDefaultLeaveHours(employeeCount),
      employeeQueryHours: current.employeeQueryHours || getDefaultEmployeeQueryHours(employeeCount),
      reportingHours: current.reportingHours || getDefaultReportingHours(employeeCount),
      recruitmentHours: current.recruitmentHours || getDefaultRecruitmentHours(employeeCount),
      enterpriseMonthlyEstimate: employeeCount * 45,
    }));
  };

  const exportLink = typeof window === "undefined" ? "" : window.location.href;

  const copyEstimateLink = async () => {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(exportLink);
  };

  const downloadPdf = async () => {
    if (!reportRef.current) return;
    const [html2canvas, { jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);
    const canvas = await html2canvas.default(reportRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF.jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * pageWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const safeName = (form.companyName || "PeoplePulse").replace(/[^a-z0-9-_]+/gi, "-").replace(/^-+|-+$/g, "") || "PeoplePulse";
    const date = new Date().toISOString().slice(0, 10);
    pdf.save(`PeoplePulse-HRMS-ROI-Estimate-${safeName}-${date}.pdf`);
  };

  const printResults = () => window.print();

  const selectedPlan = result.selectedPlan;
  const selectedPlanConfig = roiCalculatorConfig.plans[selectedPlan];
  const comparisonBenefit = result.yearOneBenefit - result.totalYearOneCost;
  const projectionData = result.projection.map((row) => ({
    ...row,
    annualBenefit: row.annualBenefit,
    annualCost: row.annualCost,
    netSavings: row.netSavings,
  }));

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="PeoplePulse HRMS ROI Calculator"
        description="Estimate monthly HR hours saved, annual savings, payback period and ROI for PeoplePulse."
        canonicalPath={ROUTES.roiCalculator}
      />
      <TooltipProvider>
        <TopNavbar />
        <MainNavbar />

        <main className="overflow-x-hidden">
          <section className="hero-gradient relative overflow-hidden">
            <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 top-16 h-72 w-72 rounded-full bg-success/10 blur-3xl" />

            <div className="container-x grid gap-10 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-18">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-extrabold text-primary shadow-sm">
                  <Calculator className="h-4 w-4" />
                  PeoplePulse HRMS ROI Calculator
                </div>
                <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                  Calculate the real value of HR automation
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
                  Discover how much time, effort and operational cost your organisation could save by automating attendance, payroll, leave, employee records and HR reporting with PeoplePulse.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {["Instant live calculation", "No signup required", "Results in Indian Rupees"].map((item) => (
                    <div
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm"
                    >
                      <Sparkles className="h-4 w-4 text-primary" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to={ROUTES.bookDemo} className="btn-primary">
                    Book a Free Demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a href="#calculator-form" className="btn-outline">
                    Start calculating
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/10 via-transparent to-success/10 blur-2xl" />
                <div className="relative rounded-[2rem] border border-border bg-white p-5 shadow-float">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="soft-card p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Recommended plan</div>
                      <div className="mt-2 text-2xl font-black text-ink">{result.recommendedPlan}</div>
                      <p className="mt-1 text-sm leading-6 text-ink-soft">{result.recommendedPlanReason}</p>
                    </div>
                    <div className="soft-card p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Estimated net Year 1 savings</div>
                      <div className="mt-2 text-2xl font-black text-ink">{formatCompactINR(result.netYearOneSavings)}</div>
                      <p className="mt-1 text-sm leading-6 text-ink-soft">
                        {formatCompactINR(result.yearOneBenefit)} benefit - {formatCompactINR(result.totalYearOneCost)} cost
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-[1.5rem] border border-border bg-surface/50 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Live summary</div>
                        <h2 className="mt-2 text-2xl font-black tracking-tight text-ink">
                          {form.companyName || "Your organisation"} at a glance
                        </h2>
                      </div>
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white">
                        <Users className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {[
                        { label: "Monthly hours saved", value: `${result.monthlyHoursSaved.toFixed(0)} hrs` },
                        { label: "Annual hours saved", value: `${result.annualHoursSaved.toFixed(0)} hrs` },
                        { label: "Working days saved", value: `${result.monthlyWorkingDaysSaved.toFixed(1)} days` },
                        { label: "FTE recovered", value: `${result.fteCapacityRecovered.toFixed(2)} FTE` },
                      ].map((item) => (
                        <div key={item.label} className="rounded-2xl bg-white p-3">
                          <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">{item.label}</div>
                          <div className="mt-1 text-sm font-semibold text-ink">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-14 sm:py-16 lg:py-20" id="calculator-form">
            <div className="container-x grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
              <div className="space-y-8">
                <div className="soft-card p-6">
                  <SectionHeader
                    eyebrow="Configuration form"
                    title="Shape the calculator to match your HR setup"
                    description="Adjust company profile, current effort, selected modules and provisional pricing to see a realistic savings estimate."
                  />
                </div>

                <div className="soft-card p-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="companyName">Company name</Label>
                      <Input
                        id="companyName"
                        value={form.companyName ?? ""}
                        onChange={(event) => setField("companyName", event.target.value)}
                        placeholder="Enter your company name"
                      />
                    </div>

                    <div className="space-y-3 md:col-span-2">
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <Label htmlFor="employeeCount">Number of employees</Label>
                          <p className="mt-1 text-xs text-ink-soft">Use the slider or enter a number between {roiCalculatorConfig.employeeCount.min} and {roiCalculatorConfig.employeeCount.max}.</p>
                        </div>
                        <Input
                          id="employeeCount"
                          type="number"
                          min={roiCalculatorConfig.employeeCount.min}
                          max={roiCalculatorConfig.employeeCount.max}
                          value={form.employeeCount}
                          onChange={(event) => handleEmployeeCountChange(safeNumber(event.target.value, form.employeeCount))}
                          className="w-28"
                        />
                      </div>
                      <Slider
                        value={[form.employeeCount]}
                        min={roiCalculatorConfig.employeeCount.min}
                        max={roiCalculatorConfig.employeeCount.max}
                        step={1}
                        onValueChange={([value]) => handleEmployeeCountChange(value)}
                      />
                      <div className="flex flex-wrap gap-2">
                        {roiCalculatorConfig.employeeCount.quickSelect.map((count) => (
                          <button
                            key={count}
                            type="button"
                            onClick={() => handleEmployeeCountChange(count)}
                            className={cn(
                              "rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
                              form.employeeCount === count
                                ? "border-primary bg-primary text-white"
                                : "border-border bg-white text-ink hover:bg-primary-soft hover:text-primary",
                            )}
                          >
                            {count === 2500 ? "2500+" : count}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Field label="HR team members" helper="Default formula: max(1, ceil(employees / 100))">
                      <Input
                        type="number"
                        min={roiCalculatorConfig.hrTeamMembers.min}
                        max={roiCalculatorConfig.hrTeamMembers.max}
                        value={form.hrTeamMembers}
                        onChange={(event) =>
                          setField(
                            "hrTeamMembers",
                            clampNumber(
                              safeNumber(event.target.value, form.hrTeamMembers),
                              roiCalculatorConfig.hrTeamMembers.min,
                              roiCalculatorConfig.hrTeamMembers.max,
                            ),
                          )
                        }
                      />
                    </Field>

                    <Field label="Industry" helper="Default: Information Technology">
                      <select
                        value={form.industry}
                        onChange={(event) => setField("industry", event.target.value)}
                        className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        {[
                          "Information Technology",
                          "Manufacturing",
                          "Healthcare",
                          "Education",
                          "Retail",
                          "Hospitality",
                          "Construction",
                          "Logistics",
                          "Financial Services",
                          "Professional Services",
                          "Real Estate",
                          "Pharmaceutical",
                          "Other",
                        ].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Number of office locations" helper="Minimum 1">
                      <Input
                        type="number"
                        min={roiCalculatorConfig.officeLocations.min}
                        max={roiCalculatorConfig.officeLocations.max}
                        value={form.officeLocations}
                        onChange={(event) =>
                          setField(
                            "officeLocations",
                            clampNumber(
                              safeNumber(event.target.value, form.officeLocations),
                              roiCalculatorConfig.officeLocations.min,
                              roiCalculatorConfig.officeLocations.max,
                            ),
                          )
                        }
                      />
                    </Field>

                    <div className="md:col-span-2">
                      <div className="text-sm font-semibold text-ink">Current HR setup</div>
                      <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {setupOptions.map((option) => (
                          <button
                            key={option.key}
                            type="button"
                            onClick={() => {
                              setField("currentSetup", option.key);
                              setField("payrollErrorRate", roiCalculatorConfig.setups[option.key].payrollErrorRate);
                            }}
                            className={cn(
                              "rounded-2xl border p-4 text-left transition-colors",
                              form.currentSetup === option.key
                                ? "border-primary bg-primary-soft/40"
                                : "border-border bg-white hover:bg-surface",
                            )}
                          >
                            <div className="text-sm font-bold text-ink">{option.label}</div>
                            <div className="mt-1 text-xs leading-5 text-ink-soft">{option.helper}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="soft-card p-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Field label="Average HR cost per hour" helper="Includes salary, employer contribution and office cost.">
                      <Input
                        type="number"
                        min={roiCalculatorConfig.hourlyHrCost.min}
                        max={roiCalculatorConfig.hourlyHrCost.max}
                        value={form.hourlyHrCost}
                        onChange={(event) =>
                          setField(
                            "hourlyHrCost",
                            clampNumber(
                              safeNumber(event.target.value, form.hourlyHrCost),
                              roiCalculatorConfig.hourlyHrCost.min,
                              roiCalculatorConfig.hourlyHrCost.max,
                            ),
                          )
                        }
                      />
                    </Field>

                    <Field label="Payroll days per month" helper="Default based on employee count.">
                      <Input
                        type="number"
                        step={0.5}
                        min={roiCalculatorConfig.payrollDaysPerMonth.min}
                        max={roiCalculatorConfig.payrollDaysPerMonth.max}
                        value={form.payrollDaysPerMonth}
                        onChange={(event) =>
                          setField(
                            "payrollDaysPerMonth",
                            clampNumber(
                              safeNumber(event.target.value, form.payrollDaysPerMonth),
                              roiCalculatorConfig.payrollDaysPerMonth.min,
                              roiCalculatorConfig.payrollDaysPerMonth.max,
                            ),
                          )
                        }
                      />
                    </Field>

                    <Field label="Monthly attendance processing hours" helper="Hours spent on attendance capture and reconciliation.">
                      <Input
                        type="number"
                        min={roiCalculatorConfig.attendanceHours.min}
                        max={roiCalculatorConfig.attendanceHours.max}
                        value={form.attendanceHours}
                        onChange={(event) =>
                          setField(
                            "attendanceHours",
                            clampNumber(
                              safeNumber(event.target.value, form.attendanceHours),
                              roiCalculatorConfig.attendanceHours.min,
                              roiCalculatorConfig.attendanceHours.max,
                            ),
                          )
                        }
                      />
                    </Field>

                    <Field label="Monthly leave administration hours" helper="Hours spent on leave workflows and approvals.">
                      <Input
                        type="number"
                        min={0}
                        value={form.leaveHours}
                        onChange={(event) => setField("leaveHours", Math.max(0, safeNumber(event.target.value, form.leaveHours)))}
                      />
                    </Field>

                    <Field label="Monthly employee query hours" helper="Hours spent answering common employee questions.">
                      <Input
                        type="number"
                        min={0}
                        value={form.employeeQueryHours}
                        onChange={(event) => setField("employeeQueryHours", Math.max(0, safeNumber(event.target.value, form.employeeQueryHours)))}
                      />
                    </Field>

                    <Field label="Monthly reporting and MIS hours" helper="Hours spent preparing recurring reports.">
                      <Input
                        type="number"
                        min={0}
                        value={form.reportingHours}
                        onChange={(event) => setField("reportingHours", Math.max(0, safeNumber(event.target.value, form.reportingHours)))}
                      />
                    </Field>

                    <Field label="Monthly recruitment and onboarding hours" helper="Hours spent on hiring and onboarding admin.">
                      <Input
                        type="number"
                        min={0}
                        value={form.recruitmentHours}
                        onChange={(event) => setField("recruitmentHours", Math.max(0, safeNumber(event.target.value, form.recruitmentHours)))}
                      />
                    </Field>

                    <div className="space-y-3 md:col-span-2">
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <Label>Payroll error rate</Label>
                          <p className="mt-1 text-xs text-ink-soft">Use the slider or type a value between 0% and 20%.</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min={0}
                            max={20}
                            value={form.payrollErrorRate}
                            onChange={(event) =>
                              setField(
                                "payrollErrorRate",
                                clampNumber(safeNumber(event.target.value, form.payrollErrorRate), 0, 20),
                              )
                            }
                            className="w-28"
                          />
                          <span className="text-sm font-semibold text-ink-soft">%</span>
                        </div>
                      </div>
                      <Slider
                        value={[form.payrollErrorRate]}
                        min={0}
                        max={20}
                        step={0.5}
                        onValueChange={([value]) => setField("payrollErrorRate", value)}
                      />
                    </div>

                    <Field label="Average cost to correct one payroll error" helper="Includes HR time, payroll time and employee communication.">
                      <Input
                        type="number"
                        min={0}
                        value={form.payrollErrorCorrectionCost}
                        onChange={(event) => setField("payrollErrorCorrectionCost", Math.max(0, safeNumber(event.target.value, form.payrollErrorCorrectionCost)))}
                      />
                    </Field>

                    <Field label="Estimated annual compliance exposure" helper="Indicative risk-adjusted exposure, not legal advice.">
                      <Input
                        type="number"
                        min={0}
                        value={form.annualComplianceExposure}
                        onChange={(event) => setField("annualComplianceExposure", Math.max(0, safeNumber(event.target.value, form.annualComplianceExposure)))}
                      />
                    </Field>

                    <Field label="Current monthly HR software and tool cost" helper="Any current tools you expect to replace or reduce.">
                      <Input
                        type="number"
                        min={0}
                        value={form.currentMonthlyToolCost}
                        onChange={(event) => setField("currentMonthlyToolCost", Math.max(0, safeNumber(event.target.value, form.currentMonthlyToolCost)))}
                      />
                    </Field>

                    <Field label="Implementation cost" helper="One-time rollout or change-management estimate.">
                      <Input
                        type="number"
                        min={0}
                        value={form.implementationCost}
                        onChange={(event) => setField("implementationCost", Math.max(0, safeNumber(event.target.value, form.implementationCost)))}
                      />
                    </Field>
                  </div>
                </div>

                <div className="soft-card p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.28em] text-primary">Modules required</div>
                      <h3 className="mt-2 text-2xl font-black tracking-tight text-ink">Choose the modules you plan to use</h3>
                    </div>
                    <div className="rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-ink-soft">
                      {result.selectedModuleCount} selected
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {roiCalculatorConfig.modules.map((module) => (
                      <ModuleCard
                        key={module.id}
                        module={module}
                        selected={Boolean(form.selectedModules[module.id])}
                        onToggle={(value) => toggleModule(module.id, value)}
                      />
                    ))}
                  </div>
                </div>

                <div className="soft-card p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.28em] text-primary">Estimated pricing</div>
                      <h3 className="mt-2 text-2xl font-black tracking-tight text-ink">Select a PeoplePulse plan</h3>
                    </div>
                    <div className="text-sm text-ink-soft">
                      Recommended: <span className="font-semibold text-ink">{result.recommendedPlan}</span>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 lg:grid-cols-4">
                    {planOrder.map((plan) => (
                      <PlanCard
                        key={plan}
                        plan={plan}
                        selected={form.selectedPlan === plan}
                        recommended={result.recommendedPlan === plan}
                        onSelect={(value) => setField("selectedPlan", value)}
                      />
                    ))}
                  </div>

                  {form.selectedPlan === "Enterprise" ? (
                    <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                      <Field label="Enterprise monthly estimate" helper="Default = employee count × ₹45.">
                        <Input
                          type="number"
                          min={0}
                          value={form.enterpriseMonthlyEstimate ?? form.employeeCount * 45}
                          onChange={(event) => setField("enterpriseMonthlyEstimate", Math.max(0, safeNumber(event.target.value, form.employeeCount * 45)))}
                        />
                      </Field>
                      <button
                        type="button"
                        className="btn-outline justify-center sm:h-10"
                        onClick={() => setField("enterpriseMonthlyEstimate", form.employeeCount * 45)}
                      >
                        Reset estimate
                      </button>
                    </div>
                  ) : null}

                  <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl bg-surface/60 p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Monthly cost</div>
                      <div className="mt-2 text-xl font-black text-ink">{formatINR(result.monthlyPeoplePulseCost)}</div>
                      <p className="mt-1 text-xs text-ink-soft">Indicative estimate</p>
                    </div>
                    <div className="rounded-2xl bg-surface/60 p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Annual cost</div>
                      <div className="mt-2 text-xl font-black text-ink">{formatINR(result.annualPeoplePulseCost)}</div>
                      <p className="mt-1 text-xs text-ink-soft">Before implementation cost</p>
                    </div>
                    <div className="rounded-2xl bg-surface/60 p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Per employee</div>
                      <div className="mt-2 text-xl font-black text-ink">{formatINR(result.effectiveMonthlyCostPerEmployee)}</div>
                      <p className="mt-1 text-xs text-ink-soft">Monthly estimate</p>
                    </div>
                    <div className="rounded-2xl bg-surface/60 p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Current annual operating cost</div>
                      <div className="mt-2 text-xl font-black text-ink">{formatINR(result.currentAnnualHrOperatingCost)}</div>
                      <p className="mt-1 text-xs text-ink-soft">Adjusted manual effort × cost</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="xl:sticky xl:top-24 xl:self-start">
                <div className="soft-card p-6 shadow-float">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.28em] text-primary">Live results</div>
                      <h3 className="mt-2 text-2xl font-black tracking-tight text-ink">Recommended plan and savings summary</h3>
                    </div>
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="mt-5 rounded-[1.5rem] bg-gradient-to-br from-primary to-[#2d5bff] p-6 text-white">
                    <div className="text-xs font-bold uppercase tracking-[0.28em] text-white/80">
                      Estimated net Year 1 savings
                    </div>
                    <div className="mt-3 text-4xl font-black tracking-tight">{formatCompactINR(result.netYearOneSavings)}</div>
                    <div className="mt-2 text-sm leading-6 text-white/85">
                      {formatCompactINR(result.yearOneBenefit)} estimated benefit - {formatCompactINR(result.totalYearOneCost)} Year 1 cost
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    <MetricCard
                      label="ROI"
                      value={`${Math.round(result.roiPercentage)}%`}
                      icon={<Percent className="h-5 w-5" />}
                      detail="Return on Year 1 cost."
                      tooltip={currencyTooltip("ROI compares net Year 1 benefit against the total Year 1 cost, including implementation.")}
                    />
                    <MetricCard
                      label="Monthly hours saved"
                      value={`${result.monthlyHoursSaved.toFixed(0)} hrs`}
                      icon={<Clock3 className="h-5 w-5" />}
                      tooltip={currencyTooltip("Monthly hours saved is the conservative, adoption-adjusted manual effort removed by the selected modules.")}
                    />
                    <MetricCard
                      label="Working days saved"
                      value={`${result.monthlyWorkingDaysSaved.toFixed(1)} days`}
                      icon={<CalendarDays className="h-5 w-5" />}
                      tooltip={currencyTooltip("Working days saved uses 8 productive hours per day as the conversion factor.")}
                    />
                    <MetricCard
                      label="FTE capacity recovered"
                      value={`${result.fteCapacityRecovered.toFixed(2)} FTE`}
                      icon={<Users className="h-5 w-5" />}
                      tooltip={currencyTooltip("Equivalent HR capacity recovered is based on 160 productive hours per month.")}
                    />
                    <MetricCard
                      label="Value multiple"
                      value={`${result.valueMultiple.toFixed(2)}×`}
                      icon={<CircleDollarSign className="h-5 w-5" />}
                      tooltip={currencyTooltip("Value multiple shows how many rupees of benefit are generated for each rupee of Year 1 cost.")}
                    />
                    <MetricCard
                      label="Payback period"
                      value={result.paybackMonths === null ? "Not recovered" : `${result.paybackMonths.toFixed(1)} months`}
                      icon={<RefreshCcw className="h-5 w-5" />}
                      tooltip={currencyTooltip("Payback period shows how many months it takes for the Year 1 benefit to cover Year 1 cost.")}
                    />
                  </div>

                  <div className="mt-5 rounded-[1.5rem] border border-border bg-white p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Selected modules</div>
                        <div className="mt-1 text-sm text-ink-soft">Currently using {result.selectedModuleCount} modules.</div>
                      </div>
                      <Badge variant="outline" className="border-primary/20 text-primary">
                        {selectedPlan}
                      </Badge>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {result.selectedModules.length ? (
                        result.selectedModules.map((module) => (
                          <span
                            key={module.id}
                            className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                          >
                            {module.label}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-ink-soft">No modules selected.</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button type="button" className="btn-outline flex-1 justify-center" onClick={downloadPdf}>
                      <Download className="h-4 w-4" />
                      Download PDF
                    </button>
                    <button type="button" className="btn-outline flex-1 justify-center" onClick={printResults}>
                      <Eye className="h-4 w-4" />
                      Print results
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-3">
                    <button type="button" className="btn-ghost flex-1 justify-center" onClick={copyEstimateLink}>
                      <Copy className="h-4 w-4" />
                      Copy Estimate Link
                    </button>
                    <button type="button" className="btn-ghost flex-1 justify-center" onClick={() => setForm(buildDefaults(roiCalculatorConfig.employeeCount.defaultValue))}>
                      <RefreshCcw className="h-4 w-4" />
                      Reset calculator
                    </button>
                  </div>

                  <div className="mt-5 rounded-[1.25rem] border border-border bg-surface/50 p-4">
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Recommendation</div>
                    <p className="mt-2 text-sm leading-7 text-ink-soft">{result.recommendedPlanReason}</p>
                    <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white p-3">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-sm font-semibold text-ink">Recommended: {result.recommendedPlan}</div>
                        <div className="text-xs text-ink-soft">{selectedPlanConfig.note}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-14 sm:py-16 lg:py-20">
            <div className="container-x">
              <SectionHeader
                eyebrow="Where your savings come from"
                title="Module-wise savings breakdown"
                description="Each selected module contributes a different share of time saved, productivity value and direct operational savings."
                align="center"
              />

              <div className="mt-10 grid gap-5">
                {result.moduleBreakdown
                  .filter((module) => module.selected)
                  .map((module) => (
                    <div key={module.id} className="soft-card p-5">
                      <div className="grid gap-4 lg:grid-cols-[1fr_180px] lg:items-center">
                        <div>
                          <div className="flex items-center gap-3">
                            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                              {(() => {
                                const Icon = moduleIconMap[module.id];
                                return <Icon className="h-5 w-5" />;
                              })()}
                            </div>
                            <div>
                              <h3 className="text-lg font-black text-ink">{module.label}</h3>
                              <p className="text-sm leading-6 text-ink-soft">{module.details}</p>
                            </div>
                          </div>
                          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                            <div className="rounded-2xl bg-surface/50 p-3">
                              <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Current effort</div>
                              <div className="mt-1 text-sm font-semibold text-ink">{module.currentHours.toFixed(1)} hrs/month</div>
                            </div>
                            <div className="rounded-2xl bg-surface/50 p-3">
                              <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Saved effort</div>
                              <div className="mt-1 text-sm font-semibold text-ink">{module.savedHours.toFixed(1)} hrs/month</div>
                            </div>
                            <div className="rounded-2xl bg-surface/50 p-3">
                              <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Reduction</div>
                              <div className="mt-1 text-sm font-semibold text-ink">{Math.round(module.reduction)}%</div>
                            </div>
                            <div className="rounded-2xl bg-surface/50 p-3">
                              <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Monthly value</div>
                              <div className="mt-1 text-sm font-semibold text-ink">{formatINR(module.monthlyValue)}</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <ProgressRow
                            label="Effort reduction"
                            current={module.currentHours}
                            saved={module.savedHours}
                            reduction={module.reduction}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>

          <section className="py-14 sm:py-16 lg:py-20 hero-gradient">
            <div className="container-x">
              <SectionHeader
                eyebrow="Current vs PeoplePulse"
                title="Compare the operating model side by side"
                description="The table below shows where manual effort reduces and where PeoplePulse adds subscription cost in place of fragmented tools."
                align="center"
              />

              <div className="mt-10 hidden overflow-hidden rounded-[1.5rem] border border-border bg-white md:block">
                <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] bg-surface/60 px-4 py-3 text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
                  <div>Metric</div>
                  <div>Current process</div>
                  <div>With PeoplePulse</div>
                  <div>Improvement</div>
                </div>
                <div className="divide-y divide-border">
                  {result.comparisonRows.map((row) => (
                    <div key={row.metric} className="grid grid-cols-[1.5fr_1fr_1fr_1fr] px-4 py-4 text-sm">
                      <div className="font-semibold text-ink">{row.metric}</div>
                      <div className="text-ink-soft">{row.currentProcess}</div>
                      <div className="text-ink-soft">{row.withPeoplePulse}</div>
                      <div className="font-semibold text-primary">{row.improvement}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 grid gap-4 md:hidden">
                {result.comparisonRows.map((row) => (
                  <div key={row.metric} className="soft-card p-4">
                    <div className="text-base font-black text-ink">{row.metric}</div>
                    <div className="mt-3 grid gap-2 text-sm">
                      <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface/50 p-3">
                        <span className="text-ink-soft">Current</span>
                        <span className="font-semibold text-ink">{row.currentProcess}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface/50 p-3">
                        <span className="text-ink-soft">With PeoplePulse</span>
                        <span className="font-semibold text-ink">{row.withPeoplePulse}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 rounded-2xl bg-primary-soft p-3">
                        <span className="text-primary">Improvement</span>
                        <span className="font-semibold text-primary">{row.improvement}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-14 sm:py-16 lg:py-20">
            <div className="container-x">
              <SectionHeader
                eyebrow="Three-year projection"
                title="Benefit, cost and cumulative savings over time"
                description="Year 1 includes phased adoption and implementation cost. Years 2 and 3 apply steady-state assumptions and inflation."
                align="center"
              />

              <div className="mt-10 grid gap-5 xl:grid-cols-2">
                <div className="soft-card p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <TrendingUp className="h-4 w-4" />
                    Annual Benefit vs Annual Cost
                  </div>
                  <div className="mt-4 h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={projectionData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                        <YAxis tickFormatter={(value) => formatCompactINR(Number(value))} tick={{ fontSize: 12 }} />
                        <RechartsTooltip formatter={(value: number) => formatINR(Number(value))} />
                        <Legend />
                        <Bar dataKey="annualBenefit" name="Annual benefit" fill="#155EEF" radius={[10, 10, 0, 0]}>
                          {projectionData.map((entry, index) => (
                            <Cell key={`benefit-${entry.year}`} fill={index === 0 ? "#155EEF" : index === 1 ? "#2958ff" : "#4470ff"} />
                          ))}
                          <LabelList dataKey="annualBenefit" position="top" formatter={(value: number) => formatCompactINR(value)} />
                        </Bar>
                        <Bar dataKey="annualCost" name="Annual cost" fill="#9ca3af" radius={[10, 10, 0, 0]}>
                          {projectionData.map((entry, index) => (
                            <Cell key={`cost-${entry.year}`} fill={index === 0 ? "#9ca3af" : index === 1 ? "#7b8794" : "#667085"} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="soft-card p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <LineChartIcon className="h-4 w-4" />
                    Cumulative Savings
                  </div>
                  <div className="mt-4 h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={projectionData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                        <YAxis tickFormatter={(value) => formatCompactINR(Number(value))} tick={{ fontSize: 12 }} />
                        <RechartsTooltip formatter={(value: number) => formatINR(Number(value))} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="cumulativeSavings"
                          name="Cumulative savings"
                          stroke="#155EEF"
                          strokeWidth={3}
                          dot={{ r: 4, fill: "#155EEF" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {result.projection.map((row) => (
                  <div key={row.year} className="soft-card p-4">
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">{row.year}</div>
                    <div className="mt-3 grid gap-2 text-sm">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-ink-soft">Annual benefit</span>
                        <span className="font-semibold text-ink">{formatINR(row.annualBenefit)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-ink-soft">Annual cost</span>
                        <span className="font-semibold text-ink">{formatINR(row.annualCost)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-ink-soft">Net savings</span>
                        <span className="font-semibold text-primary">{formatINR(row.netSavings)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-ink-soft">Cumulative</span>
                        <span className="font-semibold text-primary">{formatINR(row.cumulativeSavings)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-14 sm:py-16 lg:py-20 hero-gradient">
            <div className="container-x">
              <SectionHeader
                eyebrow="How PeoplePulse ROI works"
                title="Methodology, assumptions and phased adoption"
                description="The calculator keeps productivity value separate from direct operational savings and applies a realistic rollout curve in Year 1."
                align="center"
              />

              <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    title: "Time saved",
                    desc: "The calculator estimates the gap between current HR processing effort and effort after automation.",
                    icon: <Clock3 className="h-5 w-5" />,
                  },
                  {
                    title: "Productivity value",
                    desc: "Saved HR hours are multiplied by the loaded hourly HR cost and shown separately from direct savings.",
                    icon: <Banknote className="h-5 w-5" />,
                  },
                  {
                    title: "Direct operational savings",
                    desc: "Payroll corrections, tool costs and compliance-risk savings are treated as separate cash benefits.",
                    icon: <ShieldCheck className="h-5 w-5" />,
                  },
                  {
                    title: "Phased adoption",
                    desc: "Year 1 assumes a gradual rollout instead of maximum benefit from day one.",
                    icon: <TrendingUp className="h-5 w-5" />,
                  },
                ].map((card) => (
                  <div key={card.title} className="soft-card p-5">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">{card.icon}</div>
                    <h3 className="mt-4 text-xl font-bold text-ink">{card.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink-soft">{card.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {result.phaseCards.map((phase) => (
                  <div key={phase.label} className="soft-card p-5">
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">{phase.months}</div>
                    <h3 className="mt-2 text-xl font-black text-ink">{phase.label}</h3>
                    <div className="mt-4 grid gap-3 text-sm">
                      <div className="flex items-center justify-between rounded-2xl bg-surface/50 p-3">
                        <span className="text-ink-soft">Adoption</span>
                        <span className="font-semibold text-ink">{phase.adoption}%</span>
                      </div>
                      <div className="flex items-center justify-between rounded-2xl bg-surface/50 p-3">
                        <span className="text-ink-soft">Monthly hours saved</span>
                        <span className="font-semibold text-ink">{phase.monthlyHoursSaved.toFixed(1)} hrs</span>
                      </div>
                      <div className="flex items-center justify-between rounded-2xl bg-surface/50 p-3">
                        <span className="text-ink-soft">Monthly productivity value</span>
                        <span className="font-semibold text-ink">{formatINR(phase.monthlyProductivityValue)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-14 sm:py-16 lg:py-20">
            <div className="container-x">
              <SectionHeader
                eyebrow="Frequently asked questions"
                title="Common questions about the ROI calculator"
                description="These answers are concise and honest so the calculator remains useful for early planning and internal discussions."
                align="center"
              />

              <div className="mx-auto mt-10 max-w-4xl">
                <Accordion type="single" collapsible className="rounded-[1.5rem] border border-border bg-white px-4">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={item.q} value={`item-${index}`}>
                      <AccordionTrigger>{item.q}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm leading-7 text-ink-soft">{item.a}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>

          <section className="py-14 sm:py-16 lg:py-20 hero-gradient">
            <div className="container-x">
              <div className="rounded-[2rem] border border-border bg-white p-8 shadow-float md:p-10">
                <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.28em] text-primary">Ready to simplify your HR operations?</div>
                    <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                      See how PeoplePulse can automate attendance, payroll, leave and reporting
                    </h2>
                    <p className="mt-4 max-w-3xl text-base leading-7 text-ink-soft">
                      Use the calculator to frame your internal business case, then talk to the PeoplePulse team for a tailored rollout plan.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 lg:justify-end">
                    <Link to={ROUTES.bookDemo} className="btn-primary">
                      Book a Free Demo
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link to={ROUTES.contact} className="btn-outline">
                      Contact Our HRMS Team
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-10">
            <div className="container-x">
              <div className="rounded-[1.5rem] border border-dashed border-border bg-white/80 p-5 text-sm leading-7 text-ink-soft">
                <strong className="text-ink">Disclaimer:</strong> This calculator provides an indicative estimate based on the information entered and general HR process assumptions. Actual savings, productivity improvements, implementation costs, subscription pricing and ROI may vary based on organisation size, internal processes, selected modules, adoption levels, statutory requirements and commercial terms. This estimate is not a binding quotation, legal opinion, tax recommendation or compliance guarantee.
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </TooltipProvider>

      <div ref={reportRef} className="fixed left-[-10000px] top-0 w-[900px] bg-white p-8 text-black">
        <div className="border-b border-slate-200 pb-4">
          <div className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">PeoplePulse HRMS ROI Calculator</div>
          <h1 className="mt-2 text-3xl font-black">ROI Estimate Report</h1>
          <div className="mt-2 text-sm text-slate-600">
            {form.companyName || "Organisation"} | Generated {new Date().toLocaleDateString()}
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-slate-200 p-3">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Recommended plan</div>
            <div className="mt-1 text-lg font-bold">{result.recommendedPlan}</div>
          </div>
          <div className="rounded-xl border border-slate-200 p-3">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Net Year 1 savings</div>
            <div className="mt-1 text-lg font-bold">{formatINR(result.netYearOneSavings)}</div>
          </div>
          <div className="rounded-xl border border-slate-200 p-3">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">ROI</div>
            <div className="mt-1 text-lg font-bold">{Math.round(result.roiPercentage)}%</div>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-bold">Selected modules</h2>
          <div className="mt-2 space-y-2">
            {result.moduleBreakdown.filter((module) => module.selected).map((module) => (
              <div key={module.id} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <span>{module.label}</span>
                <span>{formatINR(module.monthlyValue)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-bold">Three-year projection</h2>
          <table className="mt-2 w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="py-2">Year</th>
                <th className="py-2">Benefit</th>
                <th className="py-2">Cost</th>
                <th className="py-2">Net</th>
              </tr>
            </thead>
            <tbody>
              {result.projection.map((row) => (
                <tr key={row.year} className="border-b border-slate-100">
                  <td className="py-2">{row.year}</td>
                  <td className="py-2">{formatINR(row.annualBenefit)}</td>
                  <td className="py-2">{formatINR(row.annualCost)}</td>
                  <td className="py-2">{formatINR(row.netSavings)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 text-xs leading-5 text-slate-500">
          This calculator provides an indicative estimate only and should not be treated as a binding quote or compliance guarantee.
        </div>
      </div>
    </div>
  );
}

function Field({ label, helper, children }: { label: string; helper: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      <p className="text-xs leading-5 text-ink-soft">{helper}</p>
    </div>
  );
}
