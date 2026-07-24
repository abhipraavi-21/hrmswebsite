import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  CalendarRange,
  CheckCircle2,
  ChevronDown,
  Clock3,
  DoorOpen,
  Download,
  FileBarChart2,
  FileCheck2,
  FileSpreadsheet,
  Filter,
  Globe,
  LayoutDashboard,
  LogOut,
  Package,
  PieChart,
  ReceiptText,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Metric = {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
};

type TableRow = string[];

type ReportCategory = {
  id: string;
  label: string;
  icon: ReactNode;
  summary: string;
  reports: string[];
  filters: string[];
  metrics: Metric[];
  tableHeaders: string[];
  tableRows: TableRow[];
  benefits: string[];
  note: string;
};

type SpotlightProps = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  visual: ReactNode;
  reverse?: boolean;
  sectionClassName?: string;
};

const reportFormats = ["Excel", "PDF"];

const capabilityItems = [
  { label: "Employee Reports", icon: <Users className="h-4 w-4" /> },
  { label: "Attendance Reports", icon: <Clock3 className="h-4 w-4" /> },
  { label: "Payroll Reports", icon: <Wallet className="h-4 w-4" /> },
  { label: "Leave Reports", icon: <CalendarDays className="h-4 w-4" /> },
  { label: "Compliance Reports", icon: <ShieldCheck className="h-4 w-4" /> },
  { label: "Asset Reports", icon: <Package className="h-4 w-4" /> },
  { label: "Real-Time Analytics", icon: <BarChart3 className="h-4 w-4" /> },
];

const manualVsHrms = [
  {
    title: "Manual Reporting",
    points: [
      "Multiple Excel sheets",
      "Repeated data entry",
      "Delayed reports",
      "Inconsistent formats",
      "Higher error risk",
    ],
  },
  {
    title: "Altroz HRMS Reporting",
    points: [
      "Centralized data",
      "Automated report generation",
      "Standardized formats",
      "Real-time visibility",
      "Faster decisions",
    ],
  },
];

const importanceBenefits = [
  "Save time with automated reports",
  "Reduce manual errors",
  "Improve payroll accuracy",
  "Track employee attendance",
  "Monitor leave balances",
  "Maintain compliance records",
  "Improve HR productivity",
  "Support workforce planning",
  "Make better business decisions",
];

const workflowSteps = [
  "Select a report category",
  "Choose the required report",
  "Apply filters",
  "Review the report preview",
  "Generate the final report",
  "Export or share if supported",
];

const filterFields = [
  "Employee name",
  "Employee ID",
  "Department",
  "Designation",
  "Branch",
  "Reporting manager",
  "Employment status",
  "Date range",
  "Attendance status",
  "Leave type",
  "Shift",
  "Payroll month",
  "Candidate status",
  "Asset status",
];

const reportCategories: ReportCategory[] = [
  {
    id: "employee",
    label: "Employee Reports",
    icon: <Users className="h-4 w-4" />,
    summary:
      "Access employee records, joining history, documents, and organizational distribution from one central view.",
    reports: [
      "Employee Details Report",
      "Employee Profile Report",
      "Department-Wise Employee Report",
      "Branch-Wise Employee Report",
      "Designation-Wise Employee Report",
      "Employee Status Report",
      "Active and Inactive Employee Report",
      "New Employee Report",
      "Employee Joining Report",
      "Employee Exit Report",
      "Employee History Report",
      "Employee Document Report",
      "Reporting Manager-Wise Employee Report",
    ],
    filters: ["Department", "Branch", "Status", "Joining date"],
    metrics: [
      { label: "Employee records", value: 312 },
      { label: "Active team", value: 286 },
      { label: "New joiners", value: 8 },
      { label: "Exits", value: 2 },
    ],
    tableHeaders: ["Employee", "Branch", "Status", "Joined"],
    tableRows: [
      ["Aarav Shah", "HQ", "Active", "18 Jul 2025"],
      ["Riya Patel", "Branch A", "Active", "05 Aug 2025"],
      ["Sahil Khan", "Plant 2", "Inactive", "22 Jan 2024"],
      ["Meera Joshi", "HQ", "Active", "09 Nov 2025"],
    ],
    benefits: [
      "Maintain organized employee records",
      "View complete employee information",
      "Track joiners and exits",
      "Compare workforce distribution",
    ],
    note: "Employee reports pull from centralized employee data and structured profile records.",
  },
  {
    id: "attendance",
    label: "Attendance Reports",
    icon: <Clock3 className="h-4 w-4" />,
    summary:
      "Monitor presence, absences, working hours, missing punches, overtime, and shift-wise attendance.",
    reports: [
      "Daily Attendance Report",
      "Monthly Attendance Report",
      "Employee-Wise Attendance Report",
      "Department-Wise Attendance Report",
      "Branch-Wise Attendance Report",
      "Present Employee Report",
      "Absent Employee Report",
      "Late Mark Report",
      "Early Exit Report",
      "Missing Punch Report",
      "Overtime Report",
      "Working Hours Report",
      "Shift-Wise Attendance Report",
      "Attendance Regularization Report",
      "Attendance Summary Report",
    ],
    filters: ["Date", "Branch", "Department", "Shift"],
    metrics: [
      { label: "Attendance", value: 94, suffix: "%" },
      { label: "Late marks", value: 22 },
      { label: "Missing punches", value: 19 },
      { label: "Overtime hours", value: 412 },
    ],
    tableHeaders: ["Employee", "Branch", "Status", "Hours"],
    tableRows: [
      ["Aarav Shah", "HQ", "Present", "08:12"],
      ["Riya Patel", "Branch A", "Late", "07:40"],
      ["Sahil Khan", "Plant 2", "Absent", "00:00"],
      ["Meera Joshi", "HQ", "On leave", "00:00"],
    ],
    benefits: [
      "Monitor daily workforce availability",
      "Identify attendance patterns",
      "Track absenteeism and late arrivals",
      "Support payroll processing",
    ],
    note: "Attendance reporting mirrors the live attendance workflows already present in Altroz HRMS.",
  },
  {
    id: "payroll",
    label: "Payroll Reports",
    icon: <Wallet className="h-4 w-4" />,
    summary:
      "Review salaries, deductions, earnings, reimbursements, arrears, and payroll summaries with less manual cleanup.",
    reports: [
      "Monthly Payroll Report",
      "Employee Salary Report",
      "Department-Wise Payroll Report",
      "Branch-Wise Payroll Report",
      "Salary Register",
      "Payslip Report",
      "Earnings Report",
      "Deduction Report",
      "Allowance Report",
      "Overtime Payment Report",
      "Bonus Report",
      "Arrears Report",
      "Loan Deduction Report",
      "Reimbursement Report",
      "Payroll Summary Report",
    ],
    filters: ["Payroll month", "Department", "Branch", "Employee"],
    metrics: [
      { label: "Gross payroll", value: 1840 },
      { label: "Deductions", value: 236 },
      { label: "Net payroll", value: 1604 },
      { label: "Pending checks", value: 6 },
    ],
    tableHeaders: ["Employee", "Month", "Gross", "Net"],
    tableRows: [
      ["Aarav Shah", "Jul 2026", "48,000", "42,300"],
      ["Riya Patel", "Jul 2026", "54,500", "46,900"],
      ["Sahil Khan", "Jul 2026", "39,000", "35,650"],
      ["Meera Joshi", "Jul 2026", "61,000", "53,200"],
    ],
    benefits: [
      "Improve payroll accuracy",
      "Review earnings and deductions",
      "Track payroll expenses",
      "Simplify payroll verification",
    ],
    note: "Payroll reporting stays aligned with salary, deduction, and statutory flows already in the product.",
  },
  {
    id: "leave",
    label: "Leave Reports",
    icon: <CalendarDays className="h-4 w-4" />,
    summary:
      "Monitor leave requests, approvals, balances, utilization, holidays, and leave type trends.",
    reports: [
      "Employee Leave Report",
      "Leave Balance Report",
      "Leave Application Report",
      "Approved Leave Report",
      "Rejected Leave Report",
      "Pending Leave Report",
      "Leave Type-Wise Report",
      "Department-Wise Leave Report",
      "Branch-Wise Leave Report",
      "Monthly Leave Report",
      "Leave Utilization Report",
      "Leave Encashment Report",
      "Holiday Report",
    ],
    filters: ["Employee", "Leave type", "Department", "Month"],
    metrics: [
      { label: "Leave balance", value: 127 },
      { label: "Pending", value: 16 },
      { label: "Approved", value: 112 },
      { label: "Utilization", value: 68, suffix: "%" },
    ],
    tableHeaders: ["Employee", "Leave Type", "Status", "Balance"],
    tableRows: [
      ["Aarav Shah", "Annual Leave", "Approved", "11 days"],
      ["Riya Patel", "Sick Leave", "Pending", "8 days"],
      ["Sahil Khan", "Casual Leave", "Rejected", "4 days"],
      ["Meera Joshi", "Annual Leave", "Approved", "14 days"],
    ],
    benefits: [
      "Track available leave balances",
      "Monitor pending approvals",
      "Analyze leave patterns",
      "Improve workforce planning",
    ],
    note: "Leave reporting connects to leave balances, approvals, and holiday structures managed in the product.",
  },
  {
    id: "recruitment",
    label: "Recruitment Reports",
    icon: <BriefcaseBusiness className="h-4 w-4" />,
    summary:
      "Track open jobs, applications, interviews, offers, and pipeline health without leaving the ATS workflow.",
    reports: [
      "Job Opening Report",
      "Candidate Application Report",
      "Candidate Status Report",
      "Interview Schedule Report",
      "Interview Feedback Report",
      "Selected Candidate Report",
      "Rejected Candidate Report",
      "Offer Status Report",
      "Source-Wise Candidate Report",
      "Recruitment Pipeline Report",
      "Time-to-Hire Report",
    ],
    filters: ["Job opening", "Candidate status", "Source", "Date range"],
    metrics: [
      { label: "Open roles", value: 11 },
      { label: "Active candidates", value: 84 },
      { label: "Interviews", value: 27 },
      { label: "Time-to-hire", value: 18 },
    ],
    tableHeaders: ["Candidate", "Stage", "Source", "Status"],
    tableRows: [
      ["Nikhil Sharma", "Interview", "Referral", "Shortlisted"],
      ["Ananya Roy", "Assessment", "Portal", "In review"],
      ["Vikram Mehta", "Offer", "Agency", "Selected"],
      ["Priya Iyer", "Screening", "LinkedIn", "Rejected"],
    ],
    benefits: [
      "See hiring pipeline health",
      "Measure candidate movement",
      "Track source performance",
      "Spot delays early",
    ],
    note: "Recruitment reporting reflects the ATS and reporting story already present in the product site.",
  },
  {
    id: "performance",
    label: "Performance Reports",
    icon: <TrendingUp className="h-4 w-4" />,
    summary:
      "Review goal progress, ratings, appraisal cycles, manager views, and development outcomes.",
    reports: [
      "Employee Performance Report",
      "Goal Progress Report",
      "Appraisal Report",
      "Rating Report",
      "Department-Wise Performance Report",
      "Manager-Wise Performance Report",
      "Review Status Report",
      "Performance Summary Report",
      "Employee Development Report",
    ],
    filters: ["Cycle", "Department", "Manager", "Rating"],
    metrics: [
      { label: "Avg rating", value: 4.2, decimals: 1 },
      { label: "Goals on track", value: 76, suffix: "%" },
      { label: "Reviews complete", value: 89, suffix: "%" },
      { label: "Development plans", value: 34 },
    ],
    tableHeaders: ["Employee", "Cycle", "Rating", "Goal"],
    tableRows: [
      ["Aarav Shah", "FY 25-26", "4.5", "92%"],
      ["Riya Patel", "FY 25-26", "4.1", "84%"],
      ["Sahil Khan", "FY 25-26", "3.8", "71%"],
      ["Meera Joshi", "FY 25-26", "4.6", "95%"],
    ],
    benefits: [
      "Track review completion",
      "Compare ratings consistently",
      "Spot growth needs",
      "Support talent decisions",
    ],
    note: "Performance reports align with the review and development workflows already in the product.",
  },
  {
    id: "compliance",
    label: "Compliance Reports",
    icon: <ShieldCheck className="h-4 w-4" />,
    summary:
      "Keep PF, ESIC, professional tax, TDS, contributions, audit data, and compliance status organized.",
    reports: [
      "Provident Fund Report",
      "ESIC Report",
      "Professional Tax Report",
      "TDS Report",
      "Labour Welfare Fund Report",
      "Statutory Deduction Report",
      "Compliance Summary Report",
      "Employee Contribution Report",
      "Employer Contribution Report",
      "Audit Report",
      "Compliance Status Report",
    ],
    filters: ["Month", "Statutory type", "Location", "Department"],
    metrics: [
      { label: "Completed", value: 18 },
      { label: "Pending", value: 4 },
      { label: "Attention", value: 2 },
      { label: "Audit ready", value: 96, suffix: "%" },
    ],
    tableHeaders: ["Statutory item", "Period", "Status", "Due"],
    tableRows: [
      ["Provident Fund", "Jul 2026", "Filed", "14 Jul"],
      ["ESIC", "Jul 2026", "Filed", "15 Jul"],
      ["TDS", "Q1 2026", "Pending", "20 Jul"],
      ["Audit", "FY 25-26", "Ready", "31 Jul"],
    ],
    benefits: [
      "Maintain structured statutory records",
      "Support audit preparation",
      "Track employee and employer contributions",
      "Improve compliance monitoring",
    ],
    note: "Compliance reporting is limited to the statutory items surfaced by the current Altroz HRMS product pages.",
  },
  {
    id: "asset",
    label: "Asset Reports",
    icon: <Package className="h-4 w-4" />,
    summary:
      "Track inventory, assignment, transfers, returns, maintenance, and loss or damage cases across locations.",
    reports: [
      "Asset Inventory Report",
      "Employee-Wise Asset Report",
      "Department-Wise Asset Report",
      "Branch-Wise Asset Report",
      "Assigned Asset Report",
      "Available Asset Report",
      "Returned Asset Report",
      "Damaged Asset Report",
      "Lost Asset Report",
      "Asset History Report",
      "Asset Transfer Report",
      "Asset Maintenance Report",
    ],
    filters: ["Asset status", "Department", "Branch", "Employee"],
    metrics: [
      { label: "Assigned", value: 228 },
      { label: "Available", value: 84 },
      { label: "Maintenance", value: 12 },
      { label: "Lost / damaged", value: 5 },
    ],
    tableHeaders: ["Asset", "Owner", "Status", "Last update"],
    tableRows: [
      ["Laptop 014", "Aarav Shah", "Assigned", "12 Jul 2026"],
      ["Phone 022", "Riya Patel", "Assigned", "10 Jul 2026"],
      ["Monitor 08", "HQ Store", "Available", "09 Jul 2026"],
      ["ID Badge 31", "HR Team", "Returned", "08 Jul 2026"],
    ],
    benefits: [
      "Keep inventory visible",
      "Track issue and return cycles",
      "Spot damaged or missing assets",
      "Support handover audits",
    ],
    note: "Asset reporting reflects the asset-management coverage already present in the repository.",
  },
  {
    id: "expense",
    label: "Expense Reports",
    icon: <ReceiptText className="h-4 w-4" />,
    summary:
      "Review employee expenses, approval states, reimbursements, and category-wise or monthly summaries.",
    reports: [
      "Employee Expense Report",
      "Department-Wise Expense Report",
      "Branch-Wise Expense Report",
      "Pending Expense Report",
      "Approved Expense Report",
      "Rejected Expense Report",
      "Reimbursement Report",
      "Category-Wise Expense Report",
      "Monthly Expense Summary",
      "Expense Approval Report",
    ],
    filters: ["Employee", "Category", "Branch", "Approval status"],
    metrics: [
      { label: "Submitted", value: 148 },
      { label: "Approved", value: 126 },
      { label: "Pending", value: 18 },
      { label: "Reimbursements", value: 104 },
    ],
    tableHeaders: ["Employee", "Category", "Status", "Amount"],
    tableRows: [
      ["Aarav Shah", "Travel", "Approved", "12,400"],
      ["Riya Patel", "Meals", "Pending", "2,180"],
      ["Sahil Khan", "Fuel", "Rejected", "1,050"],
      ["Meera Joshi", "Accommodation", "Approved", "18,600"],
    ],
    benefits: [
      "Track approval status",
      "Monitor monthly spend",
      "Keep reimbursements visible",
      "Reduce manual finance work",
    ],
    note: "Expense reporting matches the expense-management module already shipped in the product site.",
  },
  {
    id: "visitor",
    label: "Visitor Reports",
    icon: <DoorOpen className="h-4 w-4" />,
    summary: "Review visitor history, check-ins, host-wise entries, and purpose-wise visit trends.",
    reports: [
      "Daily Visitor Report",
      "Monthly Visitor Report",
      "Visitor Check-In Report",
      "Visitor Check-Out Report",
      "Host-Wise Visitor Report",
      "Department-Wise Visitor Report",
      "Purpose-Wise Visitor Report",
      "Visitor History Report",
    ],
    filters: ["Date", "Host", "Purpose", "Department"],
    metrics: [
      { label: "Visitors today", value: 18 },
      { label: "Check-ins", value: 14 },
      { label: "Check-outs", value: 13 },
      { label: "Hosts notified", value: 100, suffix: "%" },
    ],
    tableHeaders: ["Visitor", "Host", "Status", "Time"],
    tableRows: [
      ["Nandini Pvt Ltd", "HR Team", "Checked in", "10:14"],
      ["Anurag Rao", "Sales", "Checked out", "11:22"],
      ["BlueSky Design", "Operations", "Waiting", "12:05"],
      ["Rhea Kapoor", "Finance", "Checked in", "12:42"],
    ],
    benefits: [
      "Keep visitor logs easy to review",
      "Track host-wise entry patterns",
      "Support security reviews",
      "Maintain a clear front-desk trail",
    ],
    note: "Visitor reports map to the visitor-management workflow already available in the product.",
  },
  {
    id: "exit",
    label: "Exit Management Reports",
    icon: <LogOut className="h-4 w-4" />,
    summary:
      "Track resignations, clearance, asset return, notice periods, settlement status, and exit interviews.",
    reports: [
      "Employee Resignation Report",
      "Pending Exit Request Report",
      "Exit Clearance Report",
      "Department Clearance Report",
      "Asset Return Report",
      "Notice Period Report",
      "Final Settlement Status Report",
      "Exit Interview Report",
      "Employee Exit History Report",
    ],
    filters: ["Employee", "Department", "Notice period", "Exit status"],
    metrics: [
      { label: "Open exits", value: 7 },
      { label: "Clearance complete", value: 14 },
      { label: "Asset returns", value: 11 },
      { label: "Settlement ready", value: 86, suffix: "%" },
    ],
    tableHeaders: ["Employee", "Team", "Status", "Date"],
    tableRows: [
      ["Vikram Mehta", "Finance", "Pending", "19 Jul 2026"],
      ["Neha Verma", "Sales", "Clearance complete", "17 Jul 2026"],
      ["Aditi Rao", "Operations", "Asset return pending", "15 Jul 2026"],
      ["Rahul Nair", "HR", "Settlement ready", "14 Jul 2026"],
    ],
    benefits: [
      "Track resignation to closure",
      "Keep clearance visible",
      "Recover assets cleanly",
      "Maintain complete exit records",
    ],
    note: "Exit reporting fits the existing exit-management module and offboarding workflow on the site.",
  },
];

const whyChooseItems = [
  "Centralized HR reports",
  "Employee reports",
  "Attendance reports",
  "Payroll reports",
  "Leave reports",
  "Recruitment reports",
  "Performance reports",
  "Compliance reports",
  "Asset reports",
  "Expense reports",
  "Visitor reports",
  "Exit management reports",
  "Branch-wise reports",
  "Department-wise reports",
  "Custom report filters",
  "Real-time dashboard",
  "Automated report generation",
  "Secure role-based access",
  "Scalable reporting for growing businesses",
];

const faqItems = [
  {
    q: "What is HR Reporting?",
    a: "HR Reporting is the process of collecting, organizing, and presenting workforce information through employee, attendance, payroll, leave, compliance, recruitment, performance, and asset reports.",
  },
  {
    q: "Which HR Reports are available in Altroz HRMS?",
    a: "Altroz HRMS can provide employee, attendance, payroll, leave, recruitment, performance, compliance, asset, expense, visitor, and exit management reports depending on the modules enabled for the organization.",
  },
  {
    q: "Can reports be generated department-wise?",
    a: "Available reports can be generated or filtered according to departments, branches, employees, date ranges, and other supported criteria.",
  },
  {
    q: "Can attendance reports be used for payroll?",
    a: "Approved attendance, working hours, overtime, absences, late marks, and leave information can support payroll processing and verification.",
  },
  {
    q: "Can I export HR reports?",
    a: "Reports may be exported in supported formats such as Excel or PDF depending on the product configuration. CSV is not shown because it is not exposed in the current product pages.",
  },
  {
    q: "Are reports updated in real time?",
    a: "Reports use the latest information available in the HRMS database. Update frequency may depend on approvals, integrations, synchronization, and enabled modules.",
  },
  {
    q: "Can managers access reports?",
    a: "Managers can access reports according to their configured role-based permissions.",
  },
  {
    q: "Is HR Reporting suitable for small businesses?",
    a: "Yes. Centralized HR reporting can help startups, SMEs, and large organizations reduce manual work and maintain accurate workforce records.",
  },
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

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setInView(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return [ref, inView] as const;
}

function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [ref, inView] = useInView<HTMLSpanElement>();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 750;
    const precisionFactor = 10 ** decimals;

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * precisionFactor * eased) / precisionFactor);

      if (progress < 1) {
        frame = window.requestAnimationFrame(step);
      }
    };

    frame = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(frame);
  }, [decimals, inView, prefersReducedMotion, value]);

  return (
    <span ref={ref}>
      {prefix}
      {displayValue.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
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

function DataTable({ headers, rows }: { headers: string[]; rows: TableRow[] }) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface/80 px-4 py-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Digital data grid
          </div>
          <div className="mt-1 text-sm font-semibold text-ink">Live employee records</div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#ecfdf3] px-3 py-1.5 text-xs font-semibold text-success">
            <span className="h-2 w-2 rounded-full bg-success" />
            Live sync
          </span>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft shadow-sm transition-colors hover:bg-surface"
          >
            <Search className="h-3.5 w-3.5" />
            Search
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft shadow-sm transition-colors hover:bg-surface"
          >
            <Filter className="h-3.5 w-3.5" />
            Filter
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft shadow-sm transition-colors hover:bg-surface"
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[680px]">
          <div
            className="grid border-b border-border bg-surface/70 text-[11px] font-bold uppercase tracking-[0.18em] text-primary"
            style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}
          >
            {headers.map((header) => (
              <div key={header} className="px-4 py-3">
                {header}
              </div>
            ))}
          </div>

          <div>
            {rows.map((row, rowIndex) => (
              <div
                key={row.join("-")}
                className={`grid items-center transition-colors ${
                  rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfdff]"
                } hover:bg-primary-soft/40`}
                style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}
              >
                {row.map((cell, cellIndex) => (
                  <div key={`${rowIndex}-${cellIndex}`} className="px-4 py-3 align-middle">
                    {renderDigitalCell(cell, cellIndex)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-white px-4 py-3 text-xs text-ink-soft">
        <span>
          Showing {rows.length} records with {headers.length} columns
        </span>
        <div className="flex flex-wrap gap-2">
          {headers.slice(0, 3).map((header) => (
            <span key={header} className="rounded-full bg-surface px-3 py-1.5">
              {header}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function renderDigitalCell(cell: string, columnIndex: number) {
  const statusTone = getStatusTone(cell);

  if (columnIndex === 0) {
    return (
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary">
          {cell.slice(0, 1).toUpperCase()}
        </span>
        <span className="min-w-0 truncate font-semibold text-ink">{cell}</span>
      </div>
    );
  }

  if (statusTone) {
    return (
      <span
        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
          statusTone === "success"
            ? "bg-[#ecfdf3] text-success"
            : statusTone === "warning"
              ? "bg-amber-100 text-amber-700"
              : statusTone === "destructive"
                ? "bg-rose-100 text-rose-700"
                : "bg-primary-soft text-primary"
        }`}
      >
        {cell}
      </span>
    );
  }

  if (isDateLike(cell)) {
    return (
      <span className="inline-flex rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-ink-soft">
        {cell}
      </span>
    );
  }

  return <span className="text-ink">{cell}</span>;
}

function getStatusTone(value: string) {
  const normalized = value.trim().toLowerCase();

  if (["active", "present", "approved", "completed", "shortlisted", "processed"].includes(normalized)) {
    return "success" as const;
  }

  if (["late", "pending", "on leave", "draft", "review"].includes(normalized)) {
    return "warning" as const;
  }

  if (["inactive", "absent", "rejected", "declined", "blocked"].includes(normalized)) {
    return "destructive" as const;
  }

  if (["new", "open", "live"].includes(normalized)) {
    return "primary" as const;
  }

  return null;
}

function isDateLike(value: string) {
  return /\b\d{1,2}\s+[A-Za-z]{3}\s+\d{4}\b/.test(value) || /\b\d{4}-\d{2}-\d{2}\b/.test(value);
}

function MetricGrid({ metrics }: { metrics: Metric[] }) {
  const max = Math.max(...metrics.map((metric) => metric.value), 1);

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="rounded-2xl border border-border bg-surface p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {metric.label}
          </div>
          <div className="mt-2 text-2xl font-bold text-ink">
            <AnimatedNumber
              value={metric.value}
              suffix={metric.suffix}
              decimals={metric.decimals}
            />
          </div>
          <div className="mt-3 h-2 rounded-full bg-white">
            <div
              className="h-2 rounded-full bg-primary transition-[width] duration-700 ease-out motion-reduce:transition-none"
              style={{ width: `${Math.max(18, (metric.value / max) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function MiniBarChart({
  values,
  labels,
  tone = "bg-primary",
}: {
  values: number[];
  labels: string[];
  tone?: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const max = Math.max(...values, 1);

  return (
    <div ref={ref} className="rounded-[1.5rem] border border-border bg-white p-5 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Trend</div>
          <div className="mt-1 text-lg font-bold text-ink">Snapshot chart</div>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
          <BarChart3 className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-5 flex h-32 items-end gap-3">
        {values.map((value, index) => (
          <div key={labels[index] ?? index} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-24 w-full items-end">
              <div
                className={`w-full rounded-t-2xl ${tone} transition-[height,opacity] duration-700 ease-out motion-reduce:transition-none`}
                style={{
                  height: inView ? `${Math.max(12, (value / max) * 100)}%` : "0%",
                  opacity: inView ? 1 : 0.35,
                }}
              />
            </div>
            <div className="text-[11px] font-medium text-ink-soft">{labels[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusDot({ tone = "bg-success" }: { tone?: string }) {
  return <span className={`mt-1.5 h-2.5 w-2.5 rounded-full ${tone}`} />;
}

function ReportPreviewPanel({ category }: { category: ReportCategory }) {
  if (category.id === "employee") {
    return <EmployeeDashboardPreview category={category} />;
  }

  return (
    <div key={category.id} className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
      <div className="space-y-5">
        <div className="rounded-[1.75rem] border border-border bg-surface p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                {category.icon}
                {category.label}
              </div>
              <h3 className="mt-4 text-2xl font-bold text-ink">{category.label}</h3>
              <p className="mt-2 text-sm text-ink-soft">{category.summary}</p>
            </div>
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-white">
              <FileBarChart2 className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {category.filters.map((filter) => (
              <span
                key={filter}
                className="rounded-full border border-primary/15 bg-white px-3 py-1.5 text-xs font-semibold text-ink"
              >
                {filter}
              </span>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-dashed border-primary/20 bg-white p-4 text-sm text-ink-soft">
            {category.note}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-border bg-white p-5">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Available reports
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {category.reports.map((report) => (
              <span
                key={report}
                className="rounded-full bg-surface px-3 py-1.5 text-sm font-medium text-ink"
              >
                {report}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <MetricGrid metrics={category.metrics} />

        <DataTable headers={category.tableHeaders} rows={category.tableRows} />

        <div className="grid gap-3 sm:grid-cols-2">
          {category.benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <span className="text-sm text-ink">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmployeeDashboardPreview({ category }: { category: ReportCategory }) {
  const [records, active, joiners, exits] = category.metrics;
  const activityRows = category.tableRows.slice(0, 4);
  const trendBars = [36, 44, 41, 53, 48, 60, 56, 67, 62, 72, 68, 75];

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-float">
      <div className="flex items-center gap-2 border-b border-border bg-surface/80 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-3 text-xs font-semibold text-ink-soft">employee.digital.dashboard</div>
        <div className="ml-auto inline-flex items-center gap-2 rounded-full bg-[#ecfdf3] px-3 py-1.5 text-xs font-semibold text-success">
          <span className="h-2 w-2 rounded-full bg-success" />
          Live sync
        </div>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <DashboardMetricCard
              label={records.label}
              value={records.value}
              icon={<Users className="h-4 w-4" />}
            />
            <DashboardMetricCard
              label={active.label}
              value={active.value}
              icon={<CheckCircle2 className="h-4 w-4" />}
              tone="success"
            />
            <DashboardMetricCard
              label={joiners.label}
              value={joiners.value}
              icon={<Sparkles className="h-4 w-4" />}
            />
            <DashboardMetricCard
              label={exits.label}
              value={exits.value}
              icon={<DoorOpen className="h-4 w-4" />}
              tone="success"
            />
          </div>

          <div className="rounded-[1.5rem] border border-border bg-surface/70 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Workforce trend
                </div>
                <div className="mt-1 text-lg font-bold text-ink">Employee strength overview</div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#ecfdf3] px-3 py-1.5 text-xs font-semibold text-success">
                <TrendingUp className="h-3.5 w-3.5" /> +4.2%
              </span>
            </div>

            <div className="mt-4 flex h-32 items-end gap-1.5 sm:h-36 lg:h-40">
              {trendBars.map((height, index) => (
                <div key={index} className="flex-1">
                  <div
                    className="rounded-t-lg bg-gradient-to-t from-primary/60 to-primary transition-all duration-700"
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {category.filters.map((filter) => (
                <span
                  key={filter}
                  className="rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-ink-soft"
                >
                  {filter}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.5rem] border border-border bg-white p-4 shadow-card">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Digital snapshot
                </div>
                <div className="mt-1 text-lg font-bold text-ink">Live employee records</div>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary-soft text-primary">
                <LayoutDashboard className="h-4 w-4" />
              </div>
            </div>

            <p className="mt-3 text-sm leading-6 text-ink-soft">{category.summary}</p>

            <div className="mt-4 grid gap-2.5">
              {category.reports.slice(0, 5).map((report) => (
                <div
                  key={report}
                  className="flex items-center justify-between rounded-2xl bg-surface/80 px-3 py-2.5"
                >
                  <span className="text-sm font-medium text-ink">{report}</span>
                  <CheckCircle2 className="h-4 w-4 text-success" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-border bg-white p-4 shadow-card">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Recent activity
                </div>
                <div className="mt-1 text-lg font-bold text-ink">Employee pulse</div>
              </div>
              <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-ink-soft">
                {activityRows.length} updates
              </span>
            </div>

            <div className="mt-4 grid gap-2.5">
              {activityRows.map((row) => (
                <div
                  key={row.join("-")}
                  className="flex items-center justify-between rounded-2xl border border-border/80 bg-surface/60 px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-ink">{row[0]}</div>
                    <div className="text-xs text-ink-soft">{row[1]}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge value={row[2]} />
                    <span className="text-xs text-ink-soft">{row[3]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.25rem] border border-border bg-white p-4 shadow-card">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Note
              </div>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{category.note}</p>
            </div>
            <div className="rounded-[1.25rem] border border-border bg-white p-4 shadow-card">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Status
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Active", "Onboarding", "Inactive"].map((status) => (
                  <span
                    key={status}
                    className="rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary"
                  >
                    {status}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardMetricCard({
  label,
  value,
  icon,
  tone = "primary",
}: {
  label: string;
  value: number;
  icon: ReactNode;
  tone?: "primary" | "success";
}) {
  return (
    <div className="rounded-[1.25rem] border border-border bg-white p-4 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <div
          className={`grid h-10 w-10 place-items-center rounded-xl ${
            tone === "success" ? "bg-[#dcfce7] text-success" : "bg-primary-soft text-primary"
          }`}
        >
          {icon}
        </div>
        <span className={`text-xs font-semibold uppercase tracking-[0.18em] ${tone === "success" ? "text-success" : "text-primary"}`}>
          Live
        </span>
      </div>
      <div className="mt-4 text-sm font-semibold uppercase tracking-wide text-ink-soft">{label}</div>
      <div className="mt-1 text-2xl font-bold text-ink">
        <AnimatedNumber value={value} />
      </div>
    </div>
  );
}

function StatusBadge({ value }: { value: string }) {
  const tone = getStatusTone(value);
  const toneClass =
    tone === "success"
      ? "bg-[#ecfdf3] text-success"
      : tone === "warning"
        ? "bg-amber-100 text-amber-700"
        : tone === "destructive"
          ? "bg-rose-100 text-rose-700"
          : "bg-primary-soft text-primary";

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${toneClass}`}>
      {value}
    </span>
  );
}

function SpotlightSection({
  eyebrow,
  title,
  description,
  bullets,
  visual,
  reverse = false,
  sectionClassName = "",
}: SpotlightProps) {
  return (
    <section className={`py-20 ${sectionClassName}`.trim()}>
      <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
        <div className={`lg:col-span-5 ${reverse ? "lg:order-2" : ""}`}>
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <div className="mt-6 grid gap-3">
            {bullets.map((bullet) => (
              <div
                key={bullet}
                className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 shadow-card"
              >
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span className="text-sm text-ink">{bullet}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`lg:col-span-7 ${reverse ? "lg:order-1" : ""}`}>{visual}</div>
      </div>
    </section>
  );
}

function WorkflowStepper() {
  return (
    <ol className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
      {workflowSteps.map((step, index) => (
        <li
          key={step}
          className="relative rounded-[1.5rem] border border-border bg-white p-5 shadow-card"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-base font-bold text-primary">
              0{index + 1}
            </div>
            {index < workflowSteps.length - 1 ? (
              <ArrowRight className="hidden h-4 w-4 text-ink-soft md:block" />
            ) : null}
          </div>
          <div className="mt-4 text-base font-bold text-ink">{step}</div>
          <p className="mt-2 text-sm text-ink-soft">
            {index === 0
              ? "Start with the report family you need."
              : index === 1
                ? "Pick the exact report and its scope."
                : index === 2
                  ? "Use smart filters to narrow the dataset."
                  : index === 3
                    ? "Verify the preview before finalizing."
                    : index === 4
                      ? "Generate the final report output."
                      : "Use the supported export or share path."}
          </p>
        </li>
      ))}
    </ol>
  );
}

function ComparisonCard({
  title,
  points,
  tone,
}: {
  title: string;
  points: string[];
  tone: "manual" | "hrms";
}) {
  return (
    <article
      className={`rounded-[1.75rem] border p-6 shadow-card ${tone === "manual" ? "border-rose-200 bg-rose-50/60" : "border-emerald-200 bg-[#f0fdf4]"}`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-ink">{title}</h3>
        <div
          className={`rounded-full px-3 py-1 text-xs font-semibold ${tone === "manual" ? "bg-white text-rose-700" : "bg-white text-success"}`}
        >
          {tone === "manual" ? "Slower" : "Better"}
        </div>
      </div>
      <ul className="mt-4 space-y-3">
        {points.map((point) => (
          <li
            key={point}
            className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm"
          >
            <CheckCircle2
              className={`mt-0.5 h-4 w-4 shrink-0 ${tone === "manual" ? "text-rose-500" : "text-success"}`}
            />
            <span className="text-sm text-ink">{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function DashboardMetric({
  label,
  value,
  suffix,
  icon,
}: {
  label: string;
  value: number;
  suffix?: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
          {icon}
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Live</span>
      </div>
      <div className="mt-4 text-sm font-semibold uppercase tracking-wide text-ink-soft">
        {label}
      </div>
      <div className="mt-1 text-2xl font-bold text-ink">
        <AnimatedNumber value={value} suffix={suffix} />
      </div>
    </div>
  );
}

function HeroDashboard() {
  return (
    <div className="relative mx-auto max-w-lg">
      <div className="absolute -inset-5 rounded-[2.25rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
      <div className="relative overflow-visible rounded-[2.25rem] border border-border bg-white p-3 shadow-float">
        <div className="grid gap-2.5 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[1.75rem] border border-border bg-surface p-3.5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  Dashboard mockup
                </div>
                <div className="mt-1 text-lg font-bold text-ink">HR reports command center</div>
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-2xl bg-primary text-white">
                <LayoutDashboard className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="mt-3.5 grid gap-2.5 sm:grid-cols-2">
              <DashboardMetric
                label="Total employees"
                value={312}
                icon={<Users className="h-4 w-4" />}
              />
              <DashboardMetric
                label="Attendance"
                value={94}
                suffix="%"
                icon={<Clock3 className="h-4 w-4" />}
              />
              <DashboardMetric
                label="Monthly payroll"
                value={1840}
                icon={<Wallet className="h-4 w-4" />}
              />
              <DashboardMetric
                label="Pending approvals"
                value={18}
                icon={<CheckCircle2 className="h-4 w-4" />}
              />
            </div>
          </div>

          <div className="grid gap-2.5">
            <MiniBarChart
              values={[34, 42, 38, 52, 61, 58, 66]}
              labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
            />

            <div className="rounded-[1.5rem] border border-border bg-white p-3.5 shadow-card">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Department distribution
                  </div>
                  <div className="mt-1 text-sm font-bold text-ink">Headcount by team</div>
                </div>
                <div className="grid h-9 w-9 place-items-center rounded-2xl bg-[#ecfdf3] text-success">
                  <PieChart className="h-3.5 w-3.5" />
                </div>
              </div>

              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {[
                  ["Operations", "112"],
                  ["Sales", "64"],
                  ["Finance", "38"],
                  ["People Ops", "26"],
                ].map(([label, value], index) => (
                  <div key={label} className="rounded-2xl bg-surface p-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-ink">{label}</span>
                      <span className="text-sm font-bold text-primary">{value}</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white">
                      <div
                        className="h-2 rounded-full bg-primary transition-[width] duration-700 ease-out motion-reduce:transition-none"
                        style={{ width: `${78 - index * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3.5 grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.5rem] border border-dashed border-primary/20 bg-primary-soft/35 p-3">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Recent reports
            </div>
            <div className="mt-2.5 space-y-2">
              {[
                "Monthly Attendance Summary",
                "Payroll Register - July",
                "Leave Balance Snapshot",
                "Compliance Status Review",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-white px-3 py-2 shadow-sm"
                >
                  <div className="text-sm font-medium text-ink">{item}</div>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-border bg-white p-3 shadow-card">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Exports
                </div>
                <div className="mt-1 text-xs font-bold text-ink">Supported formats</div>
              </div>
              <Download className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {reportFormats.map((format) => (
                <span
                  key={format}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-ink"
                >
                  {format}
                </span>
              ))}
            </div>
            <p className="mt-2.5 text-sm text-ink-soft">
              The current product pages surface Excel and PDF exports, so only those formats are
              shown here.
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute -left-3 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-primary shadow-pop float-slow motion-reduce:animate-none">
          286 present today
        </div>
        <div className="pointer-events-none absolute -right-3 -bottom-3 rounded-full bg-success px-3 py-1.5 text-xs font-semibold text-white shadow-pop float-slow motion-reduce:animate-none">
          Excel and PDF ready
        </div>
      </div>
    </div>
  );
}

function ManualComparisonVisual() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ComparisonCard title={manualVsHrms[0].title} points={manualVsHrms[0].points} tone="manual" />
      <ComparisonCard title={manualVsHrms[1].title} points={manualVsHrms[1].points} tone="hrms" />
    </div>
  );
}

function WhyImportantVisual() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-[1.75rem] border border-border bg-primary/5 p-6 md:col-span-2">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Automated reports
            </div>
            <div className="mt-1 text-2xl font-bold text-ink">One large feature panel</div>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-primary shadow-sm">
            <FileCheck2 className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {importanceBenefits.slice(0, 4).map((benefit) => (
            <div
              key={benefit}
              className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <span className="text-sm text-ink">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {importanceBenefits.slice(4).map((benefit) => (
          <div
            key={benefit}
            className="rounded-[1.5rem] border border-border bg-white p-5 shadow-card"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                <BadgeCheck className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold text-ink">{benefit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PayrollLeaveVisual() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Payroll summary
            </div>
            <div className="mt-1 text-lg font-bold text-ink">Earnings, deductions, net salary</div>
          </div>
          <Wallet className="h-5 w-5 text-primary" />
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            ["Earnings", "1,840"],
            ["Deductions", "236"],
            ["Net salary", "1,604"],
          ].map(([label, value], index) => (
            <div
              key={label}
              className={`rounded-2xl p-4 ${index === 2 ? "bg-[#ecfdf3]" : "bg-surface"}`}
            >
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {label}
              </div>
              <div className="mt-1 text-xl font-bold text-ink">{value}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl bg-surface p-4">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Department-wise payroll
          </div>
          <div className="mt-4 space-y-3">
            {[
              ["Operations", 82],
              ["Sales", 71],
              ["Finance", 58],
              ["Support", 49],
            ].map(([label, value]) => (
              <div key={label as string} className="flex items-center gap-3">
                <span className="w-24 text-sm font-medium text-ink">{label as string}</span>
                <div className="h-2 flex-1 rounded-full bg-white">
                  <div
                    className="h-2 rounded-full bg-primary transition-[width] duration-700 ease-out motion-reduce:transition-none"
                    style={{ width: `${value}%` }}
                  />
                </div>
                <span className="w-8 text-right text-xs font-semibold text-primary">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Leave calendar
            </div>
            <div className="mt-1 text-lg font-bold text-ink">Balances and approvals</div>
          </div>
          <CalendarRange className="h-5 w-5 text-success" />
        </div>
        <div className="mt-5 grid grid-cols-7 gap-2">
          {["M", "T", "W", "T", "F", "S", "S"].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-bold uppercase tracking-[0.16em] text-ink-soft"
            >
              {day}
            </div>
          ))}
          {Array.from({ length: 21 }, (_, index) => (
            <div
              key={index}
              className={`grid h-10 place-items-center rounded-xl text-sm font-medium ${
                index % 6 === 0
                  ? "bg-[#ecfdf3] text-success"
                  : index % 5 === 0
                    ? "bg-primary-soft text-primary"
                    : "bg-surface text-ink"
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            ["Approved", "12"],
            ["Pending", "4"],
            ["Balance left", "127"],
            ["Utilization", "68%"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-surface p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {label}
              </div>
              <div className="mt-1 text-xl font-bold text-ink">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RecruitmentPerformanceVisual() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Recruitment funnel
            </div>
            <div className="mt-1 text-lg font-bold text-ink">Pipeline movement</div>
          </div>
          <BriefcaseBusiness className="h-5 w-5 text-primary" />
        </div>
        <div className="mt-5 space-y-3">
          {[
            ["Job opening", 100],
            ["Applications", 84],
            ["Interviews", 52],
            ["Offers", 18],
          ].map(([label, value]) => (
            <div key={label as string} className="flex items-center gap-3">
              <span className="w-28 text-sm font-medium text-ink">{label as string}</span>
              <div className="h-3 flex-1 rounded-full bg-surface">
                <div
                  className="h-3 rounded-full bg-primary transition-[width] duration-700 ease-out motion-reduce:transition-none"
                  style={{ width: `${value}%` }}
                />
              </div>
              <span className="w-8 text-right text-xs font-semibold text-primary">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Performance ratings
            </div>
            <div className="mt-1 text-lg font-bold text-ink">Goal progress and reviews</div>
          </div>
          <TrendingUp className="h-5 w-5 text-success" />
        </div>
        <div className="mt-5 space-y-4">
          {[
            ["Goal progress", 92],
            ["Review completion", 84],
            ["Development plans", 71],
            ["Average rating", 86],
          ].map(([label, value]) => (
            <div key={label as string} className="rounded-2xl bg-surface p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-ink">{label as string}</span>
                <span className="text-sm font-bold text-primary">{value}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-white">
                <div
                  className="h-2 rounded-full bg-success transition-[width] duration-700 ease-out motion-reduce:transition-none"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ComplianceVisual() {
  return (
    <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Compliance status
          </div>
          <div className="mt-1 text-lg font-bold text-ink">
            Completed, pending, attention required
          </div>
        </div>
        <ShieldCheck className="h-5 w-5 text-primary" />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {[
          ["Completed", "18", "bg-[#ecfdf3]", "text-success"],
          ["Pending", "4", "bg-primary-soft", "text-primary"],
          ["Attention", "2", "bg-rose-50", "text-rose-600"],
        ].map(([label, value, bg, tone]) => (
          <div key={label as string} className={`rounded-2xl p-4 ${bg as string}`}>
            <div className={`text-xs font-semibold uppercase tracking-[0.18em] ${tone as string}`}>
              {label as string}
            </div>
            <div className="mt-1 text-3xl font-bold text-ink">{value as string}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3">
        {[
          "PF and ESIC records are organized for review",
          "TDS and statutory deduction data stay visible",
          "Audit trail is ready when leadership needs it",
        ].map((item) => (
          <div key={item} className="flex items-start gap-3 rounded-2xl bg-surface p-4">
            <StatusDot />
            <span className="text-sm text-ink">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AssetExpenseVisual() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Asset inventory
            </div>
            <div className="mt-1 text-lg font-bold text-ink">Issue, return, and maintenance</div>
          </div>
          <Package className="h-5 w-5 text-primary" />
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            ["Laptop 014", "Assigned"],
            ["Monitor 08", "Available"],
            ["Badge 31", "Returned"],
            ["Phone 022", "Maintenance"],
          ].map(([label, status]) => (
            <div key={label as string} className="rounded-2xl bg-surface p-4">
              <div className="text-sm font-semibold text-ink">{label as string}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {status as string}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Expense status
            </div>
            <div className="mt-1 text-lg font-bold text-ink">Submitted, approved, pending</div>
          </div>
          <ReceiptText className="h-5 w-5 text-primary" />
        </div>
        <div className="mt-5 space-y-3">
          {[
            ["Submitted", 148],
            ["Approved", 126],
            ["Pending", 18],
            ["Rejected", 4],
          ].map(([label, value], index) => (
            <div key={label as string} className="rounded-2xl bg-surface p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-ink">{label as string}</span>
                <span
                  className={`text-sm font-bold ${index === 1 ? "text-success" : "text-primary"}`}
                >
                  {value as number}
                </span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-white">
                <div
                  className={`h-2 rounded-full transition-[width] duration-700 ease-out motion-reduce:transition-none ${
                    index === 1 ? "bg-success" : "bg-primary"
                  }`}
                  style={{ width: `${Math.max(20, ((value as number) / 148) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VisitorExitVisual() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Visitor timeline
            </div>
            <div className="mt-1 text-lg font-bold text-ink">Check-in to check-out</div>
          </div>
          <DoorOpen className="h-5 w-5 text-primary" />
        </div>
        <div className="mt-5 space-y-3">
          {["Pre-register", "Approve", "Check in", "Notify host", "Check out"].map(
            (step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-2xl bg-surface p-4">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                  0{index + 1}
                </div>
                <span className="text-sm font-medium text-ink">{step}</span>
              </div>
            ),
          )}
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Exit management
            </div>
            <div className="mt-1 text-lg font-bold text-ink">Clearance and final settlement</div>
          </div>
          <LogOut className="h-5 w-5 text-primary" />
        </div>
        <div className="mt-5 space-y-3">
          {[
            "Resignation captured",
            "Clearance tasks assigned",
            "Assets and access tracked",
            "Final settlement status ready",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-2xl bg-surface p-4">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <span className="text-sm text-ink">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BranchDepartmentVisual() {
  const [view, setView] = useState<"branch" | "department">("branch");
  const branchValues = view === "branch" ? [72, 64, 81, 58] : [84, 76, 69, 88];
  const labels =
    view === "branch"
      ? ["HQ", "Branch A", "Plant 2", "Field"]
      : ["Sales", "Ops", "Finance", "Support"];

  return (
    <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Comparison dashboard
          </div>
          <div className="mt-1 text-lg font-bold text-ink">Branch and department view</div>
        </div>
        <div className="inline-flex rounded-full bg-surface p-1">
          {(["branch", "department"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setView(item)}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
                view === item ? "bg-primary text-white" : "text-ink hover:text-primary"
              }`}
            >
              {item === "branch" ? "Branch" : "Department"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {[
          ["Employee count", view === "branch" ? "312" : "312"],
          ["Attendance", view === "branch" ? "94%" : "95%"],
          ["Payroll cost", view === "branch" ? "1,840" : "1,840"],
          ["Leave utilization", view === "branch" ? "68%" : "71%"],
          ["Overtime", view === "branch" ? "412" : "384"],
          ["New joiners", view === "branch" ? "8" : "8"],
          ["Employee exits", view === "branch" ? "2" : "2"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-surface p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {label}
            </div>
            <div className="mt-1 text-xl font-bold text-ink">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {labels.map((label, index) => (
          <div key={label} className="flex items-center gap-3">
            <span className="w-24 text-sm font-medium text-ink">{label}</span>
            <div className="h-2 flex-1 rounded-full bg-surface">
              <div
                className="h-2 rounded-full bg-primary transition-[width] duration-700 ease-out motion-reduce:transition-none"
                style={{ width: `${branchValues[index]}%` }}
              />
            </div>
            <span className="w-8 text-right text-xs font-semibold text-primary">
              {branchValues[index]}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FilterPanel() {
  const [activeFilter, setActiveFilter] = useState("Department");

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Filter panel
            </div>
            <div className="mt-1 text-lg font-bold text-ink">Smart filters and chips</div>
          </div>
          <Filter className="h-5 w-5 text-primary" />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {filterFields.slice(0, 8).map((field) => (
            <button
              key={field}
              type="button"
              onClick={() => setActiveFilter(field)}
              className={`rounded-2xl border px-4 py-3 text-left transition-colors ${
                activeFilter === field
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-border bg-surface text-ink hover:bg-white"
              }`}
            >
              <div className="text-sm font-semibold">{field}</div>
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {["Approved", "Pending", "Active", "Last 30 days"].map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-surface px-3 py-1.5 text-sm font-medium text-ink"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-border bg-surface p-5 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Preview note
            </div>
            <div className="mt-1 text-lg font-bold text-ink">
              Filter availability depends on the selected report
            </div>
          </div>
          <CalendarRange className="h-5 w-5 text-success" />
        </div>

        <div className="mt-4 rounded-2xl border border-dashed border-primary/20 bg-white p-4 text-sm text-ink-soft">
          Active filter: <span className="font-semibold text-ink">{activeFilter}</span>
          <br />
          Filter availability depends on the selected report and the modules enabled for the
          organization.
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-border bg-white p-4">
          <DataTable
            headers={["Employee", "Department", "Status", "Updated"]}
            rows={[
              ["Aarav Shah", "Sales", "Active", "Today"],
              ["Riya Patel", "HR", "Active", "Today"],
              ["Sahil Khan", "Operations", "Inactive", "Yesterday"],
              ["Meera Joshi", "Finance", "Active", "Today"],
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function RealtimeDashboard() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Real-time dashboard
            </div>
            <div className="mt-1 text-lg font-bold text-ink">Important HR metrics in one place</div>
          </div>
          <LayoutDashboard className="h-5 w-5 text-primary" />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Total employees", value: 312, icon: <Users className="h-4 w-4" /> },
            { label: "Present employees", value: 286, icon: <CheckCircle2 className="h-4 w-4" /> },
            { label: "Employees on leave", value: 31, icon: <CalendarDays className="h-4 w-4" /> },
            { label: "Late arrivals", value: 22, icon: <Clock3 className="h-4 w-4" /> },
            { label: "New joiners", value: 8, icon: <BadgeCheck className="h-4 w-4" /> },
            { label: "Employee exits", value: 2, icon: <LogOut className="h-4 w-4" /> },
            {
              label: "Recruitment activity",
              value: 27,
              icon: <BriefcaseBusiness className="h-4 w-4" />,
            },
            {
              label: "Compliance status",
              value: 96,
              suffix: "%",
              icon: <ShieldCheck className="h-4 w-4" />,
            },
          ].map((metric) => (
            <DashboardMetric
              key={metric.label}
              label={metric.label}
              value={metric.value}
              suffix={metric.suffix}
              icon={metric.icon}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        <MiniBarChart
          values={[24, 28, 32, 36, 44, 41, 49, 52]}
          labels={["1", "2", "3", "4", "5", "6", "7", "8"]}
          tone="bg-success"
        />
        <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Hovered widgets
              </div>
              <div className="mt-1 text-lg font-bold text-ink">Lightweight interactions</div>
            </div>
            <BarChart3 className="h-5 w-5 text-success" />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Cards lift slightly on hover",
              "Charts animate when visible",
              "Counters count upward",
              "Layout stacks cleanly on mobile",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-surface p-4">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span className="text-sm text-ink">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WhyChooseGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {whyChooseItems.map((item) => (
        <div key={item} className="rounded-[1.5rem] border border-border bg-white p-5 shadow-card">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="mt-4 text-lg font-bold text-ink">{item}</div>
        </div>
      ))}
    </div>
  );
}

function FAQAccordion() {
  return (
    <Accordion type="single" collapsible className="space-y-3">
      {faqItems.map((item) => (
        <AccordionItem
          key={item.q}
          value={item.q}
          className="rounded-2xl border border-border bg-white px-4 shadow-sm"
        >
          <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink no-underline hover:no-underline [&>svg]:text-primary">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="pb-4 text-sm leading-6 text-ink-soft">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default function HrReportsPage() {
  usePageMeta(
    "HR Reports and Analytics Software in Pune | Altroz HRMS",
    "Generate employee, attendance, payroll, leave, compliance, recruitment, performance, expense, and asset reports with Altroz HRMS HR Reporting Software.",
  );

  const [activeCategoryId, setActiveCategoryId] = useState(reportCategories[0].id);
  const currentCategory =
    reportCategories.find((category) => category.id === activeCategoryId) ?? reportCategories[0];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />
          <div className="pointer-events-none absolute right-1/3 top-1/4 h-28 w-28 rounded-full bg-primary/10 blur-2xl" />

          <div className="container-x grid gap-10 py-10 lg:grid-cols-12 lg:items-start lg:py-12">
            <div className="lg:col-span-6 fade-up motion-reduce:animate-none">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Smart HR Reports and Analytics
              </span>
              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Generate Accurate HR Reports with Altroz HRMS
              </h1>
              <p className="mt-4 max-w-xl text-base text-ink-soft">
                Make faster and more informed business decisions with powerful HR reports and
                real-time workforce analytics.
              </p>
              <p className="mt-4 max-w-xl text-base text-ink-soft">
                Altroz HRMS helps you generate employee, attendance, payroll, leave, compliance,
                recruitment, performance, expense, and asset reports from one centralized platform.
              </p>
              <p className="mt-4 max-w-xl text-base text-ink-soft">
                Replace scattered Excel sheets and manual reporting with accurate, structured, and
                easy-to-understand HR reports.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/company/book-demo" className="btn-primary">
                  Book Free Demo
                </a>
                <a href="/company/contact-us" className="btn-outline">
                  Request a Live Demo
                </a>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "HR Reports Software", value: "Built for real teams" },
                  { label: "Automated HR Reports", value: "Less spreadsheet work" },
                  { label: "HRMS Reporting", value: "One central system" },
                ].map((item) => (
                  <div key={item.label} className="soft-card p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {item.label}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-ink">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 lg:justify-self-end">
              <HeroDashboard />
            </div>
          </div>
        </section>

        <section className="border-y border-border/50 bg-white py-6">
          <div className="container-x">
            <div className="flex flex-wrap items-center gap-3">
              {capabilityItems.map((item, index) => (
                <div
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-ink shadow-sm transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none"
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-primary-soft text-primary">
                    {item.icon}
                  </span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="What Is HR Reporting?"
                title="What is HR reporting and how does it help teams?"
                description="HR Reporting is the process of collecting, organizing, and presenting employee and workforce information through structured reports."
              />
              <div className="mt-4 space-y-4 text-ink-soft">
                <p>
                  These reports help HR teams, managers, and business leaders monitor employee
                  records, attendance, payroll, leave, compliance, recruitment, performance, assets,
                  and other workforce activities.
                </p>
                <p>
                  Altroz HRMS replaces manual reporting processes and scattered Excel sheets with
                  one centralized reporting system. With Altroz HRMS, organizations can access
                  workforce information, apply filters, review employee records, monitor attendance
                  and payroll, track leave balances, maintain compliance records, and make faster
                  data-driven decisions.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <ManualComparisonVisual />
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Why it matters"
              title="Why HR Reports are important"
              description="Accurate HR reports help organizations understand their workforce, improve operational efficiency, maintain compliance, and make informed business decisions."
            />

            <div className="mt-10">
              <WhyImportantVisual />
            </div>
          </div>
        </section>

        <section id="report-categories" className="py-20 scroll-mt-24">
          <div className="container-x">
            <SectionHeading
              eyebrow="Category browser"
              title="Explore HR Reports by Category"
              description="Use the sidebar on desktop or the dropdown on mobile to switch between report families. The preview updates smoothly when the category changes."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-[290px_1fr] lg:items-start">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-[1.75rem] border border-border bg-white p-4 shadow-card">
                  <div className="lg:hidden">
                    <label className="sr-only" htmlFor="report-category-select">
                      Select report category
                    </label>
                    <select
                      id="report-category-select"
                      value={activeCategoryId}
                      onChange={(event) => setActiveCategoryId(event.target.value)}
                      className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-medium text-ink focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      {reportCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Tabs
                    value={activeCategoryId}
                    onValueChange={setActiveCategoryId}
                    className="hidden lg:block"
                  >
                    <TabsList className="flex h-auto w-full flex-col gap-2 bg-transparent p-0">
                      {reportCategories.map((category) => (
                        <TabsTrigger
                          key={category.id}
                          value={category.id}
                          className="flex w-full items-center justify-between gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-left text-sm font-semibold text-ink shadow-sm transition-colors data-[state=active]:border-primary data-[state=active]:bg-primary-soft data-[state=active]:text-primary"
                        >
                          <span className="inline-flex items-center gap-2">
                            <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-primary shadow-sm">
                              {category.icon}
                            </span>
                            {category.label}
                          </span>
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-border bg-surface p-5 shadow-card">
                <Tabs value={activeCategoryId} onValueChange={setActiveCategoryId}>
                  <div className="hidden lg:block">
                    {/* The trigger list above controls the active state. */}
                  </div>
                  <div className="rounded-[1.5rem] bg-white p-5 shadow-card">
                    <ReportPreviewPanel category={currentCategory} />
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        <SpotlightSection
          eyebrow="Employee Reports"
          title="Access complete employee information from one centralized platform"
          description="Employee reports help HR and managers keep records organized, compare workforce distribution, and track hiring movement."
          bullets={[
            "Maintain organized employee records",
            "View complete employee information",
            "Monitor employee strength",
            "Track new joiners and exits",
          ]}
          visual={<ReportPreviewPanel category={reportCategories[0]} />}
        />

        <section className="bg-surface py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5 lg:order-2">
              <SectionHeading
                eyebrow="Attendance Reports"
                title="Monitor attendance, working hours, late arrivals, and absences"
                description="Attendance reports support payroll, shift visibility, and exception tracking across the workforce."
              />
              <div className="mt-6 grid gap-3">
                {[
                  "Monitor daily workforce availability",
                  "Identify attendance patterns",
                  "Track absenteeism and late arrivals",
                  "Calculate overtime accurately",
                ].map((bullet) => (
                  <div
                    key={bullet}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 shadow-card"
                  >
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span className="text-sm text-ink">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7 lg:order-1">
              <div className="grid gap-4">
                <MiniBarChart
                  values={[26, 32, 29, 37, 41, 44, 46, 51]}
                  labels={["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"]}
                />
                <ReportPreviewPanel category={reportCategories[1]} />
              </div>
            </div>
          </div>
        </section>

        <SpotlightSection
          eyebrow="Payroll Reports"
          title="Generate accurate payroll reports for salaries, deductions, allowances, and taxes"
          description="Payroll reports help HR and finance review salary records, overtime, deductions, and monthly payroll summaries."
          bullets={[
            "Improve payroll accuracy",
            "Maintain salary records",
            "Review earnings and deductions",
            "Simplify payroll verification",
          ]}
          visual={<PayrollLeaveVisual />}
        />

        <SpotlightSection
          eyebrow="Leave Reports"
          title="Monitor leave applications, approvals, balances, and utilization"
          description="Leave reports help teams plan better and keep the workforce available with fewer surprises."
          bullets={[
            "Track available leave balances",
            "Monitor pending approvals",
            "Analyze leave patterns",
            "Improve workforce planning",
          ]}
          visual={<PayrollLeaveVisual />}
          reverse
          sectionClassName="bg-surface"
        />

        <section className="py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Recruitment and Performance Reports"
                title="Bring hiring and performance visibility into one reporting story"
                description="Recruitment reports help track hiring pipelines, while performance reports help review goals, ratings, and development planning."
              />
              <div className="mt-6 grid gap-4">
                <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Recruitment reports
                  </div>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {reportCategories[4].reports.slice(0, 6).map((item) => (
                      <li key={item} className="flex items-start gap-3 rounded-2xl bg-surface p-4">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span className="text-sm text-ink">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Performance reports
                  </div>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {reportCategories[5].reports.slice(0, 6).map((item) => (
                      <li key={item} className="flex items-start gap-3 rounded-2xl bg-surface p-4">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span className="text-sm text-ink">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6">
              <RecruitmentPerformanceVisual />
            </div>
          </div>
        </section>

        <SpotlightSection
          eyebrow="Compliance Reports"
          title="Maintain organized statutory and compliance-related records"
          description="Compliance reports help keep PF, ESIC, tax, audit, and contribution information clear for review."
          bullets={[
            "Maintain structured statutory records",
            "Reduce compliance-related errors",
            "Support audit preparation",
            "Track employee and employer contributions",
          ]}
          visual={<ComplianceVisual />}
        />

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Asset and Expense Reports"
              title="Track assets, expenses, reimbursements, and approvals without extra spreadsheets"
              description="Asset and expense reporting gives operations and finance a cleaner way to review ownership, spend, and status."
            />

            <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-6">
                <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Asset reports
                  </div>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {reportCategories[7].reports.slice(0, 6).map((item) => (
                      <li key={item} className="flex items-start gap-3 rounded-2xl bg-surface p-4">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span className="text-sm text-ink">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Expense reports
                  </div>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {reportCategories[8].reports.slice(0, 6).map((item) => (
                      <li key={item} className="flex items-start gap-3 rounded-2xl bg-surface p-4">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span className="text-sm text-ink">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <AssetExpenseVisual />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Visitor and Exit Reports"
              title="Use expandable panels for visitor logs and exit management reports"
              description="Visitor and exit reporting is included because both modules exist in the current product structure."
            />

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              <Accordion type="single" collapsible className="space-y-3">
                <AccordionItem
                  value="visitor"
                  className="rounded-2xl border border-border bg-white px-4 shadow-card"
                >
                  <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink no-underline hover:no-underline">
                    Visitor Reports
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <div className="grid gap-4">
                      <div className="text-sm text-ink-soft">
                        Daily and monthly visitor reports help reception and security teams review
                        entries, check-ins, host-wise traffic, and purpose-wise patterns.
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {reportCategories[9].reports.map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-surface px-3 py-1.5 text-sm font-medium text-ink"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="exit"
                  className="rounded-2xl border border-border bg-white px-4 shadow-card"
                >
                  <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink no-underline hover:no-underline">
                    Exit Management Reports
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <div className="grid gap-4">
                      <div className="text-sm text-ink-soft">
                        Exit management reports help HR keep resignations, clearance, asset return,
                        and final settlement status organized.
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {reportCategories[10].reports.map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-surface px-3 py-1.5 text-sm font-medium text-ink"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <VisitorExitVisual />
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Branch-wise and Department-wise Reporting"
                title="Compare workforce data across branches and departments"
                description="Altroz HRMS allows organizations to view reports based on branches, departments, teams, and business locations."
              />
              <div className="mt-6 rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                <div className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
                  <Globe className="h-4 w-4 text-primary" />
                  Switch between branches and departments to see the comparison update.
                </div>
                <div className="mt-5">
                  <BranchDepartmentVisual />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <MiniBarChart
                values={[64, 72, 58, 81, 69, 77]}
                labels={["Emp", "Attend", "Payroll", "Leave", "Overtime", "Exits"]}
                tone="bg-primary"
              />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Custom filters"
                title="Find the information you need with smart filters"
                description="Filter availability depends on the selected report and enabled modules."
              />
            </div>
            <div className="lg:col-span-7">
              <FilterPanel />
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Real-Time HR Dashboard"
              title="Monitor important HR metrics in real time"
              description="This section uses mock data only for visual presentation and keeps the demo separate from any real backend data."
            />
            <div className="mt-10">
              <RealtimeDashboard />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Workflow"
              title="Generate reports in a few simple steps"
              description="Use a horizontal stepper on desktop and a vertical timeline on mobile."
            />
            <div className="mt-10">
              <WorkflowStepper />
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Export and Share"
                title="Export and share reports easily"
                description="Export available reports for management review, audits, internal records, and workforce analysis."
              />
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {reportFormats.map((format) => (
                  <div
                    key={format}
                    className="flex items-center justify-between rounded-2xl border border-border bg-white p-4 shadow-card"
                  >
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                        {format}
                      </div>
                      <div className="mt-1 text-sm text-ink-soft">Supported export format</div>
                    </div>
                    <FileSpreadsheet className="h-5 w-5 text-primary" />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      No fake downloads
                    </div>
                    <div className="mt-1 text-lg font-bold text-ink">
                      Only supported formats are shown
                    </div>
                  </div>
                  <Download className="h-5 w-5 text-primary" />
                </div>
                <p className="mt-4 text-sm text-ink-soft">
                  CSV is not displayed because the current repository only surfaces Excel and PDF
                  export support.
                </p>
                <div className="mt-5 grid gap-3">
                  <a href="/company/book-demo" className="btn-primary justify-center">
                    Discuss reporting exports
                  </a>
                  <a href="/company/contact-us" className="btn-outline justify-center">
                    Request export guidance
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Benefits"
              title="Benefits of Altroz HRMS reports"
              description="A strong reporting layer helps people teams move from reporting to action with less friction."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {[
                "Save HR time",
                "Improve data accuracy",
                "Make faster decisions",
                "Simplify payroll review",
                "Improve workforce planning",
                "Support compliance",
                "Improve management visibility",
                "Increase HR productivity",
              ].map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-[1.75rem] border border-border bg-white p-6 shadow-card"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                    <BadgeCheck className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-lg font-bold text-ink">{benefit}</div>
                  <p className="mt-2 text-sm text-ink-soft">
                    {index === 0 &&
                      "Generate structured reports without collecting data manually from multiple Excel sheets."}
                    {index === 1 &&
                      "Use centralized HR information to reduce duplicate entries and reporting errors."}
                    {index === 2 &&
                      "Access important workforce information when management decisions are required."}
                    {index === 3 &&
                      "Review attendance, salary, deductions, overtime, and leave data from one platform."}
                    {index === 4 &&
                      "Understand employee strength, attendance, leave, recruitment, and employee movement."}
                    {index === 5 && "Maintain organized statutory and audit-related records."}
                    {index === 6 &&
                      "Provide managers with clear reports across branches, departments, and teams."}
                    {index === 7 &&
                      "Reduce repetitive reporting tasks and allow HR teams to focus on strategic work."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Why Choose Altroz HRMS?"
              title="Why choose Altroz HRMS for HR reporting?"
              description="Only features supported by the current product are included here."
            />
            <div className="mt-10">
              <WhyChooseGrid />
            </div>
          </div>
        </section>

        <section className="py-20" id="faq">
          <div className="container-x grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Questions"
                title="Frequently Asked Questions"
                description="An accessible accordion keeps the most common questions easy to scan and expand."
              />
            </div>
            <div className="lg:col-span-7">
              <FAQAccordion />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 left-0 h-48 w-48 rounded-full bg-success/10 blur-3xl" />
              <div className="relative grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">
                    Final CTA
                  </div>
                  <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                    Turn Your HR Data into Meaningful Business Insights
                  </h2>
                  <p className="mt-3 max-w-2xl text-ink-soft">
                    Generate accurate employee, attendance, payroll, leave, compliance, recruitment,
                    performance, expense, and asset reports from one centralized platform.
                  </p>
                  <p className="mt-3 max-w-2xl text-ink-soft">
                    Reduce manual reporting, improve HR accuracy, and make faster business decisions
                    with Altroz HRMS.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                  <a href="/company/book-demo" className="btn-primary">
                    Book Your Free Demo Today
                  </a>
                  <a href="/company/contact-us" className="btn-outline">
                    Request a Live Demo
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
