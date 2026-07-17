import { useEffect, useState, type ReactNode } from "react";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Database,
  DoorOpen,
  Eye,
  FileBarChart2,
  FileCheck2,
  FileText,
  Fingerprint,
  Globe2,
  KeyRound,
  Landmark,
  LayoutDashboard,
  Lock,
  MapPin,
  QrCode,
  ReceiptText,
  Settings2,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserCog,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import TopNavbar from "@/components/site/TopNavbar";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { modelScreenshots } from "@/lib/modelScreenshots";

type AccessState = "Full Access" | "Team Access" | "Own Records" | "View Only" | "No Access";

type SecurityModule = {
  id: string;
  title: string;
  icon: ReactNode;
  summary: string;
  bullets: string[];
  image?: string;
  alt?: string;
};

const pageTitle = "Secure HRMS Software in Pune | Altroz HRMS Security";
const pageDescription =
  "Protect employee records, payroll data, attendance, documents, compliance information, and HR reports with secure role-based access from Altroz HRMS.";

const capabilityStrip = [
  { label: "Role-Based Access", icon: <UserCog className="h-4 w-4" /> },
  { label: "Secure Login", icon: <Lock className="h-4 w-4" /> },
  { label: "Employee Data Protection", icon: <ShieldCheck className="h-4 w-4" /> },
  { label: "Payroll Access Control", icon: <Landmark className="h-4 w-4" /> },
  { label: "Document Management", icon: <FileText className="h-4 w-4" /> },
  { label: "Centralized HR Records", icon: <Database className="h-4 w-4" /> },
];

const scatteredData = [
  "Excel sheets",
  "Email attachments",
  "Local files",
  "Physical documents",
  "Inconsistent permissions",
  "Duplicate records",
];

const centralizedData = [
  "Controlled access",
  "Centralized records",
  "Role-based permissions",
  "Structured workflows",
  "Organized documents",
  "Improved visibility",
];

const architectureLayers = [
  {
    title: "Access Layer",
    icon: <Lock className="h-5 w-5" />,
    items: [
      "Individual user accounts",
      "Configured sign-in access",
      "Role-based permissions",
      "Access can be updated or removed by administrators",
    ],
  },
  {
    title: "Data Control Layer",
    icon: <Database className="h-5 w-5" />,
    items: [
      "Centralized employee records",
      "Payroll access control",
      "Attendance access control",
      "Document permissions",
      "Report permissions",
    ],
  },
  {
    title: "Operational Layer",
    icon: <Workflow className="h-5 w-5" />,
    items: [
      "Structured approval workflows",
      "Centralized administration",
      "Multi-branch access control",
      "Role-aware module visibility",
    ],
  },
];

const roles = [
  "HR Administrator",
  "Business Owner",
  "Payroll User",
  "Department Manager",
  "Team Leader",
  "Recruiter",
  "Employee",
] as const;

const permissionAreas = [
  "Employee Profiles",
  "Attendance",
  "Leave",
  "Payroll",
  "Documents",
  "Recruitment",
  "Performance",
  "Reports",
  "Settings",
] as const;

const roleMatrix: Record<(typeof roles)[number], AccessState[]> = {
  "HR Administrator": [
    "Full Access",
    "Full Access",
    "Full Access",
    "Full Access",
    "Full Access",
    "Full Access",
    "Full Access",
    "Full Access",
    "Full Access",
  ],
  "Business Owner": [
    "View Only",
    "View Only",
    "View Only",
    "View Only",
    "View Only",
    "View Only",
    "View Only",
    "View Only",
    "View Only",
  ],
  "Payroll User": [
    "View Only",
    "View Only",
    "View Only",
    "Full Access",
    "View Only",
    "No Access",
    "No Access",
    "View Only",
    "View Only",
  ],
  "Department Manager": [
    "Team Access",
    "Team Access",
    "Team Access",
    "View Only",
    "View Only",
    "No Access",
    "View Only",
    "Team Access",
    "No Access",
  ],
  "Team Leader": [
    "Own Records",
    "Team Access",
    "Own Records",
    "No Access",
    "Own Records",
    "No Access",
    "No Access",
    "Team Access",
    "No Access",
  ],
  Recruiter: [
    "View Only",
    "No Access",
    "No Access",
    "No Access",
    "View Only",
    "Full Access",
    "No Access",
    "View Only",
    "No Access",
  ],
  Employee: [
    "Own Records",
    "Own Records",
    "Own Records",
    "No Access",
    "Own Records",
    "No Access",
    "No Access",
    "Own Records",
    "No Access",
  ],
};

const loginSteps = [
  "User signs in with an assigned account",
  "Access is validated against configured permissions",
  "The user sees only approved modules and records",
  "Administrators can update or remove access when roles change",
  "Controlled access keeps sensitive data separated by responsibility",
];

const employeeDataGroups = [
  "Personal details",
  "Contact information",
  "Employment information",
  "Department and designation",
  "Reporting structure",
  "Bank information",
  "Tax details",
  "Emergency contacts",
  "Employment history",
  "Employee status",
  "Uploaded documents",
];

const documentVault = [
  {
    category: "Offer letters",
    employee: "Aarav Shah",
    uploaded: "12 Jul 2025",
    access: "HR + Manager",
    status: "Approved",
  },
  {
    category: "Joining documents",
    employee: "Riya Patel",
    uploaded: "18 Aug 2025",
    access: "HR only",
    status: "Verified",
  },
  {
    category: "Identity documents",
    employee: "Sahil Khan",
    uploaded: "04 Feb 2025",
    access: "HR + Payroll",
    status: "Protected",
  },
  {
    category: "Salary revision letters",
    employee: "Meera Joshi",
    uploaded: "21 Sep 2025",
    access: "HR only",
    status: "Stored",
  },
  {
    category: "Exit documents",
    employee: "Kabir Mehta",
    uploaded: "06 Oct 2025",
    access: "HR + Admin",
    status: "Closed",
  },
];

const payrollAccessCards = [
  { label: "Payroll Admin", value: "Full payroll control" },
  { label: "HR Authorized", value: "Reviewed payroll records" },
  { label: "Manager Restricted", value: "Summary visibility only" },
  { label: "Employee Own Payslip", value: "Own records only" },
];

const attendanceMethods = [
  { label: "GPS", icon: <MapPin className="h-4 w-4" /> },
  { label: "Geolocation", icon: <Globe2 className="h-4 w-4" /> },
  { label: "Geofencing", icon: <Shield className="h-4 w-4" /> },
  { label: "QR Code", icon: <QrCode className="h-4 w-4" /> },
  { label: "Mobile Attendance", icon: <Smartphone className="h-4 w-4" /> },
];

const leavePoints = [
  "Leave balances",
  "Leave applications",
  "Approval history",
  "Leave types",
  "Leave policies",
  "Supporting documents",
  "Manager comments",
];

const compliancePoints = [
  "PF",
  "ESIC",
  "Professional Tax",
  "TDS",
  "Labour Welfare Fund",
  "Employee contributions",
  "Employer contributions",
  "Compliance reports",
];

const moduleCards: SecurityModule[] = [
  {
    id: "core-hr",
    title: "Core HR",
    icon: <Users className="h-4 w-4" />,
    summary: "Employee profiles, employment information, documents, and organizational records.",
    bullets: [
      "Controlled employee records",
      "Protected profile information",
      "Centralized documents",
    ],
    image: modelScreenshots.coreHrTable,
    alt: "Core HR employee records preview",
  },
  {
    id: "attendance",
    title: "Attendance",
    icon: <Clock3 className="h-4 w-4" />,
    summary: "Attendance records, shifts, location information, overtime, and regularization.",
    bullets: ["Attendance visibility", "Location-aware methods", "Correction workflows"],
    image: modelScreenshots.attendanceDashboard,
    alt: "Attendance dashboard preview",
  },
  {
    id: "payroll",
    title: "Payroll",
    icon: <Wallet className="h-4 w-4" />,
    summary: "Salary structures, payslips, deductions, taxes, and payroll reports.",
    bullets: ["Restricted payroll access", "Masked values in previews", "Statutory reports"],
    image: modelScreenshots.payrollDashboard,
    alt: "Payroll dashboard preview",
  },
  {
    id: "leave",
    title: "Leave Management",
    icon: <CalendarDays className="h-4 w-4" />,
    summary: "Leave balances, applications, approvals, policies, and history.",
    bullets: ["Role-aware leave views", "Approval tracking", "Policy-based flows"],
    image: modelScreenshots.leaveDashboard,
    alt: "Leave management dashboard preview",
  },
  {
    id: "recruitment",
    title: "Recruitment",
    icon: <FileText className="h-4 w-4" />,
    summary: "Candidate details, resumes, interviews, feedback, and offers.",
    bullets: ["Candidate information", "Hiring workflows", "Role-based access"],
  },
  {
    id: "performance",
    title: "Performance Management",
    icon: <BarChart3 className="h-4 w-4" />,
    summary: "Goals, ratings, reviews, feedback, and appraisals.",
    bullets: ["Confidential review cycles", "Manager visibility", "Structured evaluations"],
  },
  {
    id: "assets",
    title: "Asset Management",
    icon: <BadgeCheck className="h-4 w-4" />,
    summary: "Asset inventory, allocation history, returns, and employee responsibility.",
    bullets: ["Issue and return tracking", "Ownership visibility", "Controlled records"],
    image: modelScreenshots.assetsDashboard,
    alt: "Asset management dashboard preview",
  },
  {
    id: "expenses",
    title: "Expense Management",
    icon: <ReceiptText className="h-4 w-4" />,
    summary: "Claims, receipts, approvals, reimbursements, and expense reports.",
    bullets: ["Expense approvals", "Receipt review", "Report access controls"],
  },
  {
    id: "visitor",
    title: "Visitor Management",
    icon: <DoorOpen className="h-4 w-4" />,
    summary: "Visitor information and entry records.",
    bullets: ["Front-desk visibility", "Visitor logs", "Controlled records"],
  },
  {
    id: "exit",
    title: "Exit Management",
    icon: <FileCheck2 className="h-4 w-4" />,
    summary: "Resignation details, clearance, asset returns, interviews, and settlement status.",
    bullets: ["Offboarding control", "Clearance tracking", "Separation records"],
    image: modelScreenshots.resignations,
    alt: "Exit management dashboard preview",
  },
];

const reportRoleOptions = [
  {
    label: "Employee",
    summary: "Own reports only",
    categories: ["Own attendance", "Own leave", "Own payslips", "Own documents"],
  },
  {
    label: "Manager",
    summary: "Assigned team reports",
    categories: ["Team attendance", "Team leave", "Team performance", "Team summaries"],
  },
  {
    label: "Payroll User",
    summary: "Payroll-related reports",
    categories: ["Payroll reports", "Salary summaries", "Deductions", "Statutory reports"],
  },
  {
    label: "HR Admin",
    summary: "Authorized organization reports",
    categories: ["Employee reports", "Attendance reports", "Leave reports", "Compliance reports"],
  },
  {
    label: "Management",
    summary: "Selected summaries and dashboards",
    categories: ["Dashboards", "Branch summaries", "Department trends", "Status overviews"],
  },
];

const accessBenefits = [
  "Protect confidential employee information",
  "Reduce unnecessary data exposure",
  "Improve data accuracy",
  "Reduce manual record handling",
  "Improve accountability where activity visibility is enabled",
  "Support remote and multi-branch teams",
  "Simplify compliance record management",
  "Improve business continuity with centralized storage",
];

const whyChooseItems = [
  "Secure cloud-based HR management",
  "Role-based user permissions",
  "Controlled employee data access",
  "Secure payroll management",
  "Centralized attendance records",
  "Protected employee documents",
  "Structured compliance records",
  "Secure report access",
  "Centralized HR database",
  "Multi-branch accessibility",
  "Employee self-service access",
  "Scalable permission management",
  "Controlled HR operations",
];

const bestPracticeSections = [
  {
    title: "Product controls",
    items: [
      "Give users only the access they require",
      "Limit payroll and administrator access",
      "Keep employee documents organized",
      "Limit unnecessary report downloads",
      "Review important user activities where visibility is enabled",
      "Protect sensitive modules with role-based permissions",
    ],
  },
  {
    title: "Customer responsibilities",
    items: [
      "Deactivate accounts when employees leave",
      "Review permissions regularly",
      "Use strong and unique passwords",
      "Avoid sharing login credentials",
      "Keep devices and browsers updated",
      "Follow internal data-handling policies",
    ],
  },
];

const faqItems = [
  {
    q: "Is Altroz HRMS secure?",
    a: "Altroz HRMS is designed to help organizations manage employee and HR information through centralized storage, controlled user access, and role-based permissions. Exact security capabilities depend on the deployed configuration, hosting environment, and enabled features.",
  },
  {
    q: "What is role-based access control?",
    a: "Role-based access control allows organizations to assign permissions according to a user’s role. Employees may access their own information, managers may view relevant team records, and HR administrators may manage broader workforce information.",
  },
  {
    q: "Can employees view other employees’ salary information?",
    a: "Employee access should be restricted according to configured permissions. Salary and payroll records should only be available to authorized users.",
  },
  {
    q: "How is payroll information protected?",
    a: "Payroll information is managed through controlled access. Authorized payroll, HR, finance, or management users can access relevant salary and statutory information according to their permissions.",
  },
  {
    q: "Are employee documents stored securely?",
    a: "Employee documents can be stored in a centralized digital system with access limited according to user roles and permissions.",
  },
  {
    q: "Can access be removed when an employee leaves?",
    a: "Authorized administrators can update or remove access according to the account-management features available in the system.",
  },
  {
    q: "Can managers access all employee information?",
    a: "Managers should only access information permitted for their role, department, or assigned team.",
  },
  {
    q: "Are HR reports secure?",
    a: "Access to HR reports can be restricted based on user roles and permissions. Sensitive payroll and compliance reports should be available only to authorized users.",
  },
  {
    q: "Is Altroz HRMS suitable for multi-branch organizations?",
    a: "A centralized HRMS can help authorized users manage employee information across multiple branches while applying structured access permissions.",
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
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">{eyebrow}</div>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      <p className="mt-3 text-ink-soft">{description}</p>
    </div>
  );
}

function StatusChip({ label, icon }: { label: string; icon: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm font-medium text-ink shadow-sm">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-primary-soft text-primary">
        {icon}
      </span>
      {label}
    </span>
  );
}

function SecurityCard({ title, items, icon }: { title: string; items: string[]; icon: ReactNode }) {
  return (
    <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{title}</div>
          <div className="mt-2 space-y-2">
            {items.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-surface p-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span className="text-sm text-ink">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
}

function AccessStateBadge({ state }: { state: AccessState }) {
  const tone =
    state === "Full Access"
      ? "bg-[#ecfdf3] text-success"
      : state === "Team Access"
        ? "bg-primary-soft text-primary"
        : state === "Own Records"
          ? "bg-[#eef6ff] text-primary"
          : state === "View Only"
            ? "bg-surface text-ink"
            : "bg-rose-50 text-rose-600";

  return <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${tone}`}>{state}</span>;
}

function RoleAccessCard({
  role,
  states,
  isSelected,
  onSelect,
}: {
  role: (typeof roles)[number];
  states: AccessState[];
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`w-full rounded-[1.75rem] border p-5 text-left shadow-card transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
        isSelected
          ? "border-primary bg-primary-soft/20 shadow-md"
          : "border-border bg-white hover:-translate-y-0.5 hover:border-primary/30"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
            <UserCog className="h-4 w-4" />
          </span>
          <span>
            <span className="block text-base font-semibold text-ink">{role}</span>
            <span className="block text-xs text-ink-soft">Example interface, not real user data</span>
          </span>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isSelected ? "bg-primary text-white" : "bg-surface text-ink-soft"
          }`}
        >
          {isSelected ? "Selected" : "Tap to view"}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {permissionAreas.map((area, index) => (
          <div key={area} className="rounded-2xl border border-border bg-surface p-3">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
              {area}
            </div>
            <div className="mt-2">
              <AccessStateBadge state={states[index]} />
            </div>
          </div>
        ))}
      </div>
    </button>
  );
}

function HeroSecurityVisual() {
  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-white p-5 shadow-float">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">
            Enterprise-grade HRMS security
          </div>
          <div className="rounded-full bg-success px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
            Centralized control
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.75rem] border border-border bg-surface p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  Security control center
                </div>
                <div className="mt-1 text-2xl font-bold text-ink">
                  Controlled access for HR data
                </div>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
            </div>

            <div className="relative mt-5 overflow-hidden rounded-[1.75rem] border border-dashed border-primary/25 bg-white p-5">
              <div className="pointer-events-none absolute inset-x-6 top-8 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
              <div className="pointer-events-none absolute left-8 top-8 h-36 w-36 rounded-full border border-primary/20" />
              <div className="pointer-events-none absolute left-16 top-16 h-20 w-20 rounded-full border border-success/20" />
              <div className="relative grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                <div className="grid gap-3">
                  <div className="soft-card px-4 py-3">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Employee records
                    </div>
                    <div className="mt-1 text-sm font-semibold text-ink">Controlled access</div>
                  </div>
                  <div className="soft-card px-4 py-3">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Attendance data
                    </div>
                    <div className="mt-1 text-sm font-semibold text-ink">Role-limited views</div>
                  </div>
                </div>

                <div className="relative flex items-center justify-center py-4 lg:py-0">
                  <div className="absolute inset-0 mx-auto h-44 w-44 rounded-full border border-primary/15" />
                  <div className="absolute inset-0 mx-auto h-32 w-32 rounded-full border border-success/15" />
                  <div className="grid h-28 w-28 place-items-center rounded-full bg-primary text-white shadow-float">
                    <div className="text-center">
                      <Shield className="mx-auto h-7 w-7" />
                      <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em]">
                        HRMS
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="soft-card px-4 py-3">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Payroll data
                    </div>
                    <div className="mt-1 text-sm font-semibold text-ink">Restricted visibility</div>
                  </div>
                  <div className="soft-card px-4 py-3">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      HR documents
                    </div>
                    <div className="mt-1 text-sm font-semibold text-ink">Protected storage</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {["Authorized users", "Centralized records", "Secure reports"].map((item) => (
                  <div key={item} className="rounded-2xl bg-primary-soft/40 px-3 py-2 text-center">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Access indicators
                  </div>
                  <div className="mt-1 text-lg font-bold text-ink">Protection layers in view</div>
                </div>
                <KeyRound className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  "Access controlled",
                  "Payroll restricted",
                  "Documents protected",
                  "Authorized users only",
                ].map((item) => (
                  <div key={item} className="soft-card p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Recent protections
                  </div>
                  <div className="mt-1 text-lg font-bold text-ink">
                    Role-aware module visibility
                  </div>
                </div>
                <LayoutDashboard className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-5 grid gap-3">
                {[
                  ["Core HR", "HR Admin"],
                  ["Payroll", "Payroll User"],
                  ["Attendance", "Manager"],
                  ["Reports", "Management"],
                ].map(([label, role]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-surface px-4 py-3"
                  >
                    <div>
                      <div className="text-sm font-semibold text-ink">{label}</div>
                      <div className="text-xs text-ink-soft">{role}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="soft-card p-4">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Account status
              </div>
              <div className="mt-2 text-sm font-semibold text-ink">
                Access can be updated or removed
              </div>
            </div>
            <div className="soft-card p-4">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Central control
              </div>
              <div className="mt-2 text-sm font-semibold text-ink">
                One place for HR data governance
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModuleVisual({ module }: { module: SecurityModule }) {
  if (module.image) {
    return (
      <div className="rounded-[1.75rem] border border-border bg-white p-4 shadow-card">
        <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface">
          <img
            src={module.image}
            alt={module.alt ?? `${module.title} preview`}
            className="block h-auto w-full object-contain bg-white"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
      <div className="rounded-[1.5rem] bg-primary-soft/40 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Module protection
            </div>
            <div className="mt-1 text-lg font-bold text-ink">{module.title}</div>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-primary shadow-sm">
            {module.icon}
          </div>
        </div>
        <p className="mt-4 text-sm text-ink-soft">{module.summary}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {module.bullets.map((bullet) => (
          <div key={bullet} className="soft-card flex items-start gap-3 p-4">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
            <span className="text-sm text-ink">{bullet}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroStrip() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {capabilityStrip.map((item, index) => (
        <div key={item.label} className="fade-up" style={{ animationDelay: `${index * 60}ms` }}>
          <StatusChip label={item.label} icon={item.icon} />
        </div>
      ))}
    </div>
  );
}

export default function HrSecurityPage() {
  usePageMeta(pageTitle, pageDescription, "/hrms-security");

  const [selectedRole, setSelectedRole] = useState<(typeof roles)[number]>("HR Administrator");
  const [selectedModuleId, setSelectedModuleId] = useState(moduleCards[0].id);
  const [selectedReportRole, setSelectedReportRole] = useState(reportRoleOptions[3].label);

  const selectedModule =
    moduleCards.find((module) => module.id === selectedModuleId) ?? moduleCards[0];
  const selectedReportRoleData =
    reportRoleOptions.find((item) => item.label === selectedReportRole) ?? reportRoleOptions[3];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />
          <div className="pointer-events-none absolute right-1/3 top-1/4 h-28 w-28 rounded-full bg-primary/10 blur-2xl" />

          <div className="container-x grid gap-10 py-12 lg:grid-cols-12 lg:items-start lg:py-16">
            <div className="lg:col-span-6 fade-up motion-reduce:animate-none">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Enterprise-Grade HRMS Security
              </span>
              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Protect Your Employee Data with Altroz HRMS
              </h1>
              <p className="mt-4 max-w-xl text-base text-ink-soft">
                Employee information is one of your organization&apos;s most valuable and
                confidential business assets. Altroz HRMS helps protect employee records, payroll
                information, attendance data, HR documents, compliance records, and other workforce
                information through controlled access and centralized data management.
              </p>
              <p className="mt-4 max-w-xl text-base text-ink-soft">
                Manage HR operations confidently with a secure cloud-based HRMS designed to help
                authorized users access the information they need while protecting confidential
                business data.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/company/book-demo" className="btn-primary">
                  Book Free Demo
                </a>
                <a href="/company/contact-us" className="btn-outline">
                  Talk to Our Expert
                </a>
              </div>

              <div className="mt-6">
                <HeroStrip />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    label: "Controlled by role",
                    value: "Only approved users see sensitive data.",
                  },
                  {
                    label: "Centralized records",
                    value: "Keep HR information in one system.",
                  },
                  {
                    label: "Protected modules",
                    value: "Separate payroll, documents, and reports.",
                  },
                ].map((item) => (
                  <div key={item.label} className="soft-card p-4">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      {item.label}
                    </div>
                    <div className="mt-1 text-sm font-medium text-ink-soft">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <HeroSecurityVisual />
            </div>
          </div>
        </section>

        <section className="border-y border-border/50 bg-white py-6">
          <div className="container-x">
            <div className="flex flex-wrap items-center gap-3">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                Security capability strip
              </div>
              <div className="flex flex-1 flex-wrap gap-3">
                {capabilityStrip.map((item) => (
                  <StatusChip key={item.label} label={item.label} icon={item.icon} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Why HRMS security matters"
                title="Why HRMS security matters"
                description="HR departments manage confidential employee information such as salary details, personal information, attendance history, tax records, bank information, official documents, compliance records, and company asset details."
              />
              <div className="mt-6 space-y-3 text-sm text-ink-soft">
                <p>
                  Managing this information through unsecured spreadsheets, emails, local computers,
                  physical files, or disconnected systems can increase the risk of unauthorized
                  access, accidental changes, duplicate records, and data loss.
                </p>
                <p>
                  A secure HRMS helps organizations centralize workforce information, control user
                  access, maintain accurate records, and reduce unnecessary exposure of confidential
                  data.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Scattered HR data
                  </div>
                  <div className="mt-4 grid gap-3">
                    {scatteredData.map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between rounded-2xl bg-surface px-4 py-3"
                      >
                        <span className="text-sm font-medium text-ink">{item}</span>
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-rose-50 text-rose-600">
                          <ShieldCheck className="h-4 w-4" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-border bg-primary-soft/30 p-5 shadow-card">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Centralized Altroz HRMS
                  </div>
                  <div className="mt-4 grid gap-3">
                    {centralizedData.map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm"
                      >
                        <span className="text-sm font-medium text-ink">{item}</span>
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Security architecture"
              title="Security built across your HR operations"
              description="A practical security model starts with access rules, continues with data controls, and carries through to everyday HR workflows."
            />

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {architectureLayers.map((layer) => (
                <SecurityCard
                  key={layer.title}
                  title={layer.title}
                  items={layer.items}
                  icon={layer.icon}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Role-based access control"
              title="Give every user the right level of access"
              description="Role-based access helps organizations control which information each user can view, update, approve, or manage based on their responsibilities."
            />

            <div className="mt-6 flex flex-wrap gap-2">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  aria-pressed={selectedRole === role}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                    selectedRole === role
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-white text-ink hover:bg-surface hover:text-primary"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
              {roles.map((role) => {
                const isSelected = role === selectedRole;
                const states = roleMatrix[role];

                return (
                  <RoleAccessCard
                    key={role}
                    role={role}
                    states={states}
                    isSelected={isSelected}
                    onSelect={() => setSelectedRole(role)}
                  />
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Controlled login"
                title="Controlled login and user account management"
                description="Protect access to the HRMS through individual user accounts and configured permissions."
              />

              <div className="mt-6 grid gap-3">
                {[
                  "Individual login accounts",
                  "Role-based access",
                  "Controlled access by responsibility",
                  "Access can be updated or removed by administrators",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 shadow-card"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Login sequence
                    </div>
                    <div className="mt-1 text-lg font-bold text-ink">A simple access flow</div>
                  </div>
                  <Lock className="h-5 w-5 text-primary" />
                </div>

                <div className="mt-5 grid gap-3">
                  {loginSteps.map((step, index) => (
                    <div key={step} className="flex items-start gap-3 rounded-2xl bg-surface p-4">
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-soft text-sm font-bold text-primary">
                        0{index + 1}
                      </div>
                      <span className="text-sm text-ink">{step}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-dashed border-primary/20 bg-primary-soft/30 p-4 text-sm text-ink-soft">
                  Session management, password reset flow, and other account controls can be used if
                  they are enabled in the deployed configuration.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Employee data protection"
                title="Protect employee information in one centralized system"
                description="Store employee profiles and workforce records in one centralized HR platform instead of managing confidential information across multiple spreadsheets and files."
              />

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {employeeDataGroups.map((item) => (
                  <div key={item} className="soft-card flex items-center gap-3 p-4">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-success" />
                    <span className="text-sm font-medium text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                <div className="absolute -right-10 top-6 h-28 w-28 rounded-full bg-primary/10 blur-3xl" />
                <div className="relative grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="rounded-[1.5rem] bg-primary-soft/35 p-5">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Central profile hub
                    </div>
                    <div className="mt-4 flex min-h-[18rem] items-center justify-center">
                      <div className="grid h-28 w-28 place-items-center rounded-full bg-primary text-white shadow-float">
                        <div className="text-center">
                          <Users className="mx-auto h-7 w-7" />
                          <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em]">
                            Employee profile
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Personal details",
                      "Contact information",
                      "Department and designation",
                      "Reporting structure",
                      "Bank information",
                      "Tax details",
                      "Emergency contacts",
                      "Uploaded documents",
                    ].map((item) => (
                      <div key={item} className="soft-card p-4">
                        <div className="text-sm font-semibold text-ink">{item}</div>
                        <div className="mt-1 text-xs text-ink-soft">Access differs by role</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-surface p-4 text-sm text-ink-soft">
                  Reduced duplicate records, improved data accuracy, better access control, easier
                  employee record management, and lower dependency on local files.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Document security"
                title="Organize HR documents with controlled access"
                description="Maintain employee and HR documents digitally and make them available only to authorized users."
              />

              <div className="mt-6 rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                <div className="space-y-3">
                  {documentVault.map((doc) => (
                    <div
                      key={`${doc.category}-${doc.employee}`}
                      className="grid gap-3 rounded-2xl bg-surface p-4 md:grid-cols-[1.35fr_1fr_0.85fr_0.85fr_0.75fr]"
                    >
                      <div>
                        <div className="text-sm font-semibold text-ink">{doc.category}</div>
                        <div className="text-xs text-ink-soft">{doc.employee}</div>
                      </div>
                      <div className="text-sm text-ink">{doc.uploaded}</div>
                      <div className="text-sm text-ink">{doc.access}</div>
                      <div className="text-sm text-ink">{doc.status}</div>
                      <div className="flex items-center justify-end">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-card">
                <div className="overflow-hidden border-b border-border bg-surface">
                  <div className="aspect-[18/7] w-full bg-white">
                    <img
                      src={modelScreenshots.generatedDocuments}
                      alt="Generated HR documents preview"
                      className="h-full w-full object-contain object-top bg-white lg:object-cover lg:object-top"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="grid gap-3 p-5 sm:grid-cols-2">
                  {[
                    "Offer letters",
                    "Appointment letters",
                    "Joining documents",
                    "Identity documents",
                    "Educational certificates",
                    "Experience letters",
                    "Salary revision letters",
                    "Exit documents",
                  ].map((item) => (
                    <div key={item} className="soft-card p-4 text-sm font-medium text-ink">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Payroll data security"
                title="Control access to confidential payroll information"
                description="Payroll records contain sensitive employee and financial information. Altroz HRMS helps organizations limit payroll access to authorized HR, payroll, finance, and management users."
              />

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {payrollAccessCards.map((item) => (
                  <div key={item.label} className="soft-card p-4">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      {item.label}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-ink">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Salary structures",
                  "Monthly payroll records",
                  "Earnings and allowances",
                  "Deductions",
                  "Payslips",
                  "Bonuses and arrears",
                  "Reimbursements",
                  "PF, ESIC, Professional Tax, and TDS information",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 shadow-card"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Payroll preview
                    </div>
                    <div className="mt-1 text-lg font-bold text-ink">Masked example values</div>
                  </div>
                  <Landmark className="h-5 w-5 text-primary" />
                </div>

                <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-border bg-surface p-5">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      ["Gross payroll", "₹ ***,***"],
                      ["Net payroll", "₹ ***,***"],
                      ["Statutory deductions", "Protected"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl bg-white p-4 shadow-sm">
                        <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                          {label}
                        </div>
                        <div className="mt-2 text-xl font-bold text-ink">{value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        Access labels
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {[
                          "Payroll Admin",
                          "HR Authorized",
                          "Manager Restricted",
                          "Employee Own Payslip",
                        ].map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-surface px-3 py-1.5 text-xs font-semibold text-ink"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        Confirmed value
                      </div>
                      <div className="mt-2 text-sm text-ink-soft">
                        Payroll data is displayed only through controlled views and authorized
                        record access.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-sm text-ink-soft">
                  The page uses masked example figures only and does not expose real employee or
                  salary data.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Attendance data security"
                title="Maintain controlled access to attendance records"
                description="Centralize attendance information and allow employees, managers, and HR teams to access relevant records according to assigned permissions."
              />

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {attendanceMethods.map((method, index) => {
                  const isLastOddCard =
                    attendanceMethods.length % 2 === 1 && index === attendanceMethods.length - 1;
                  const cardClassName = isLastOddCard
                    ? "soft-card flex items-center gap-3 p-4 sm:col-span-2 sm:w-[calc(50%-0.375rem)] sm:justify-self-center"
                    : "soft-card flex items-center gap-3 p-4";

                  return (
                    <div key={method.label} className={cardClassName}>
                      <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary-soft text-primary">
                        {method.icon}
                      </span>
                      <span className="text-sm font-medium text-ink">{method.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface">
                  <img
                    src={modelScreenshots.attendanceDashboard}
                    alt="Attendance dashboard preview"
                    className="block h-auto w-full object-contain bg-white"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {[
                    ["Employee", "Own attendance, leave, and correction requests"],
                    ["Manager", "Assigned team attendance and exception visibility"],
                    ["HR", "Organization-wide attendance records"],
                  ].map(([label, desc]) => (
                    <div key={label} className="rounded-2xl bg-surface p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        {label}
                      </div>
                      <div className="mt-2 text-sm text-ink">{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-6">
                <SectionHeading
                  eyebrow="Leave protection"
                  title="Leave and compliance data protection"
                  description="Keep leave records and compliance records organized while limiting access according to role."
                />

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Leave data protection
                    </div>
                    <div className="mt-4 grid gap-3">
                      {leavePoints.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-2xl bg-surface p-4"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                          <span className="text-sm text-ink">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["Employee", "Manager", "HR"].map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Compliance data protection
                    </div>
                    <div className="mt-4 grid gap-3">
                      {compliancePoints.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-2xl bg-surface p-4"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                          <span className="text-sm text-ink">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="grid gap-4">
                  <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                          Leave and compliance snapshot
                        </div>
                        <div className="mt-1 text-lg font-bold text-ink">Controlled records view</div>
                      </div>
                      <FileBarChart2 className="h-5 w-5 text-primary" />
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[1.5rem] bg-primary-soft/35 p-5">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                              Leave status
                            </div>
                            <div className="mt-1 text-lg font-bold text-ink">Role-aware access</div>
                          </div>
                          <CalendarDays className="h-5 w-5 text-primary" />
                        </div>
                        <div className="mt-4 space-y-2 text-sm text-ink-soft">
                          <div>Employees see their own balances and requests.</div>
                          <div>Managers see team leave and approval history.</div>
                          <div>HR sees organization-wide leave records.</div>
                        </div>
                      </div>

                      <div className="rounded-[1.5rem] bg-white p-5 shadow-sm">
                        <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                          Compliance status
                        </div>
                        <div className="mt-4 grid gap-3">
                          {[
                            ["PF", "Organized"],
                            ["ESIC", "Organized"],
                            ["TDS", "Organized"],
                            ["Compliance reports", "Available"],
                          ].map(([label, value]) => (
                            <div
                              key={label}
                              className="flex items-center justify-between gap-3 rounded-2xl bg-surface px-4 py-3"
                            >
                              <span className="text-sm font-medium text-ink">{label}</span>
                              <span className="text-sm font-bold text-primary">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[2.25rem] border border-border bg-white p-4 shadow-float md:p-5">
                    <div className="overflow-hidden rounded-[1.75rem] border border-border bg-surface">
                      <img
                        src={modelScreenshots.salaryReport}
                        alt="Compliance report preview"
                        className="block h-auto w-full object-contain bg-white"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Central database"
                title="Replace scattered records with one centralized HR database"
                description="A centralized HR database reduces the need to store employee information across spreadsheets, emails, devices, and physical documents."
              />

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Core HR",
                  "Attendance",
                  "Payroll",
                  "Leave",
                  "Recruitment",
                  "Performance",
                  "Assets",
                  "Expenses",
                  "Reports",
                ].map((item) => (
                  <div key={item} className="soft-card flex items-center gap-3 p-4">
                    <Database className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm font-medium text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-surface p-5">
                  <div className="absolute inset-x-0 top-0 h-[3px] popup-blue-band" />
                  <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
                    <div className="grid gap-3">
                      {["Core HR", "Attendance", "Payroll", "Leave"].map((item) => (
                        <div key={item} className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                          <div className="text-sm font-semibold text-ink">{item}</div>
                        </div>
                      ))}
                    </div>

                    <div className="grid gap-3">
                      {["Recruitment", "Performance", "Assets", "Reports"].map((item) => (
                        <div key={item} className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                          <div className="text-sm font-semibold text-ink">{item}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-sm text-ink-soft">
                  Consistent records, fewer duplicates, better permission control, faster updates,
                  more reliable reporting, and centralized multi-branch management.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Module protection"
              title="Structured access across every HRMS module"
              description="Choose a module to see how the supporting controls and data protections can be presented in the product."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr] lg:items-start">
              <div className="rounded-[1.75rem] border border-border bg-white p-4 shadow-card">
                <div className="space-y-2">
                  {moduleCards.map((module) => (
                    <button
                      key={module.id}
                      type="button"
                      onClick={() => setSelectedModuleId(module.id)}
                      aria-pressed={selectedModuleId === module.id}
                      className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                        selectedModuleId === module.id
                          ? "border-primary bg-primary-soft text-primary"
                          : "border-border bg-surface text-ink hover:bg-white hover:text-primary"
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-primary shadow-sm">
                          {module.icon}
                        </span>
                        <span className="text-sm font-semibold">{module.title}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                <ModuleVisual module={selectedModule} />
                <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Selected module
                  </div>
                  <div className="mt-1 text-xl font-bold text-ink">{selectedModule.title}</div>
                  <p className="mt-2 text-sm text-ink-soft">{selectedModule.summary}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="How access works"
                title="How role-based access can be assigned by responsibility"
                description="Use a straightforward, role-aware structure so users can access the functions they need without exposing everything to everyone."
              />

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "HR Administrators",
                    desc: "May manage employee profiles, attendance, leave, documents, policies, and HR reports.",
                  },
                  {
                    title: "Payroll Users",
                    desc: "May access salary structures, payroll calculations, deductions, statutory records, and payslips.",
                  },
                  {
                    title: "Managers",
                    desc: "May review attendance, leave, performance information, and reports for assigned team members.",
                  },
                  {
                    title: "Employees",
                    desc: "May view their own attendance, leave, payslips, documents, profile information, and request status.",
                  },
                ].map((item) => (
                  <div key={item.title} className="soft-card p-5">
                    <div className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                      {item.title}
                    </div>
                    <div className="mt-2 text-sm text-ink-soft">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid gap-4">
                {[
                  "Team leaders may access limited workforce information for employees who report to them.",
                  "Business owners and management may access selected dashboards, workforce summaries, reports, and business insights.",
                  "Exact permissions depend on configuration and enabled features.",
                ].map((item, index) => (
                  <div
                    key={item}
                    className={`rounded-[1.75rem] border border-border bg-white p-5 shadow-card ${
                      index === 0 ? "sm:ml-8" : index === 2 ? "sm:mr-8" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                        <BadgeCheck className="h-4 w-4" />
                      </div>
                      <span className="text-sm text-ink">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Report access"
                title="Control access to sensitive HR reports"
                description="Restrict HR report access according to user roles and responsibilities."
              />

              <div className="mt-6 flex flex-wrap gap-2">
                {reportRoleOptions.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setSelectedReportRole(option.label)}
                    aria-pressed={selectedReportRole === option.label}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                      selectedReportRole === option.label
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-white text-ink hover:bg-surface hover:text-primary"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  {selectedReportRoleData.label}
                </div>
                <div className="mt-1 text-xl font-bold text-ink">
                  {selectedReportRoleData.summary}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedReportRoleData.categories.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-surface px-3 py-1.5 text-sm font-medium text-ink"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Secure report preview
                    </div>
                    <div className="mt-1 text-lg font-bold text-ink">
                      Role-based report categories
                    </div>
                  </div>
                  <FileBarChart2 className="h-5 w-5 text-primary" />
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
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
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl bg-surface px-4 py-3 text-sm font-medium text-ink"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] border border-border bg-white p-4 shadow-float md:p-5">
                <div className="overflow-hidden rounded-[1.75rem] border border-border bg-surface">
                  <img
                    src={modelScreenshots.employeeReport}
                    alt="HR report preview"
                    className="block h-auto w-full object-contain bg-white"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Security benefits"
              title="Benefits of secure HR data management"
              description="Strong access controls and centralized records help HR teams work with less friction and less unnecessary exposure."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-[1.75rem] border border-border bg-primary/5 p-6 md:col-span-2 xl:row-span-2">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Featured benefit
                    </div>
                    <div className="mt-1 text-2xl font-bold text-ink">
                      Protect confidential employee information
                    </div>
                  </div>
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {accessBenefits.slice(0, 4).map((benefit) => (
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

              {accessBenefits.slice(4).map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-[1.75rem] border border-border bg-white p-6 shadow-card"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                    <BadgeCheck className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-lg font-bold text-ink">{benefit}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Why choose Altroz"
                title="Why choose Altroz HRMS for secure HR management?"
                description="Display only confirmed features and keep the messaging centered on control, centralization, and role-based access."
              />

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {whyChooseItems.map((item) => (
                  <div key={item} className="soft-card flex items-center gap-3 p-4">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                    <span className="text-sm font-medium text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4">
                <div className="overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-card">
                  <div className="overflow-hidden border-b border-border bg-surface">
                    <div className="aspect-[18/7] w-full bg-white">
                      <img
                        src={modelScreenshots.generatedDocuments}
                        alt="Protected HR documents dashboard preview"
                        className="h-full w-full object-contain object-top bg-white lg:object-cover lg:object-top"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <div className="grid gap-3 p-5 sm:grid-cols-3">
                    {[
                      "Controlled employee data access",
                      "Secure report access",
                      "Centralized HR database",
                    ].map((item) => (
                      <div key={item} className="rounded-2xl bg-primary-soft/35 p-4">
                        <div className="text-sm font-semibold text-primary">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        Supporting controls
                      </div>
                      <div className="mt-1 text-lg font-bold text-ink">More reasons to choose Altroz</div>
                    </div>
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {whyChooseItems.slice(3).map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl bg-surface p-4">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span className="text-sm text-ink">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Best practices"
              title="Security best practices for HR teams"
              description="Separate the platform controls from the customer responsibilities so the page stays practical and easy to follow."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {bestPracticeSections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card"
                >
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    {section.title}
                  </div>
                  <div className="mt-4 grid gap-3">
                    {section.items.map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl bg-surface p-4">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span className="text-sm text-ink">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently asked questions"
              description="A concise accordion keeps common questions easy to scan while maintaining accessible keyboard behavior."
            />

            <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <Accordion type="single" collapsible className="space-y-3">
                  {faqItems.map((item) => (
                    <AccordionItem
                      key={item.q}
                      value={item.q}
                      className="w-full rounded-2xl border border-border bg-white px-4 shadow-sm"
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
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Quick answers
                  </div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-ink">
                    Security details in one place
                  </div>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">
                    Use this panel to highlight the most important security points while the FAQ
                    list stays easy to scan on the left.
                  </p>

                  <div className="mt-5 grid gap-3">
                    {[
                      "Role-based access limits visibility to approved users.",
                      "Payroll and document data stay restricted to authorized teams.",
                      "Employee and manager views can be separated by responsibility.",
                      "Reports can stay available only to selected roles.",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl bg-surface p-4">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span className="text-sm text-ink">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl bg-primary-soft/35 p-4">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Need more help?
                    </div>
                    <p className="mt-2 text-sm text-ink-soft">
                      Book a demo or talk to our team for a walkthrough of security and access
                      controls.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white px-6 py-10 shadow-float md:px-10">
              <div className="pointer-events-none absolute -right-10 top-8 h-36 w-36 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -left-10 bottom-8 h-36 w-36 rounded-full bg-success/10 blur-3xl" />

              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    Final CTA
                  </div>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                    Protect Your HR Data with Altroz HRMS
                  </h2>
                  <p className="mt-4 max-w-2xl text-ink-soft">
                    Manage employee records, attendance, payroll, documents, leave, reports, and
                    compliance information from one centralized HR platform.
                  </p>
                  <p className="mt-3 max-w-2xl text-ink-soft">
                    Give authorized users the access they need while maintaining better control over
                    confidential employee and business information.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href="/company/book-demo" className="btn-primary">
                      Book Your Free Demo Today
                    </a>
                    <a href="/company/contact-us" className="btn-outline">
                      Talk to Our Security Expert
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Protected employee records",
                      "Role-aware permissions",
                      "Controlled payroll access",
                      "Secure document handling",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className={`rounded-[1.5rem] border border-border p-4 shadow-card ${
                          index === 0 || index === 3 ? "bg-primary-soft/35" : "bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-primary shadow-sm">
                            <ShieldCheck className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-ink">{item}</div>
                            <div className="text-xs text-ink-soft">
                              Designed to help protect data
                            </div>
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
