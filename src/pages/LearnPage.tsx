import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  GraduationCap,
  Layers3,
  Lightbulb,
  LockKeyhole,
  NotebookPen,
  PanelLeft,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
  Workflow,
  X,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { modelScreenshots } from "@/lib/modelScreenshots";

type LearnArea = {
  id: string;
  navLabel: string;
  title: string;
  icon: typeof GraduationCap;
  description: string;
  topics: string[];
  relatedLabel: string;
  relatedHref: string;
  pathTitle: string;
  resources: string[];
  visual:
    | "hub"
    | "attendance"
    | "payroll"
    | "leave"
    | "employee"
    | "recruitment"
    | "compliance"
    | "reports"
    | "automation"
    | "security";
  note?: string;
};

type LearningResource = {
  id: string;
  type: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  cta: string;
  href?: string;
  comingSoon?: boolean;
};

type LearningPath = {
  id: string;
  title: string;
  description: string;
  steps: string[];
};

type AudienceGroup = {
  id: string;
  name: string;
  description: string;
  focus: string;
  areaIds: string[];
  pathIds: string[];
};

type PopularTopic = {
  label: string;
  areaId: string;
};

type FormatCard = {
  title: string;
  desc: string;
  icon: typeof BookOpen;
};

type FaqItem = {
  question: string;
  answer: string;
};

const seoTitle = "HRMS Learning Center | Payroll, Attendance and HR Guides";
const seoDescription =
  "Explore HRMS guides, payroll tutorials, attendance resources, HR best practices, compliance information, and product learning materials from Altroz HRMS.";

const learningAreas: LearnArea[] = [
  {
    id: "hrms-fundamentals",
    navLabel: "HRMS Fundamentals",
    title: "HRMS Fundamentals",
    icon: GraduationCap,
    description:
      "Understand what HRMS software does, how it centralizes HR work, and how teams can build a strong foundation before adding more modules.",
    topics: [
      "What is HRMS?",
      "How HRMS works",
      "HRMS versus manual HR",
      "Common HRMS modules",
      "Choosing HRMS software",
      "HRMS implementation basics",
    ],
    relatedLabel: "Explore Core HR",
    relatedHref: "/products/core-hr",
    pathTitle: "HRMS Basics for Beginners",
    resources: ["hrms-basics", "implementation-checklist"],
    visual: "hub",
  },
  {
    id: "attendance-management",
    navLabel: "Attendance Management",
    title: "Attendance Management Guides",
    icon: CalendarDays,
    description:
      "Learn how businesses can track attendance, manage shifts, handle missing punches, and keep overtime and attendance corrections organized.",
    topics: [
      "Biometric attendance",
      "GPS attendance",
      "Geolocation attendance",
      "QR code attendance",
      "Mobile attendance",
      "Shift management",
    ],
    relatedLabel: "Open Attendance",
    relatedHref: "/attendance-management",
    pathTitle: "Attendance and Shift Management",
    resources: ["attendance-guide"],
    visual: "attendance",
  },
  {
    id: "payroll-management",
    navLabel: "Payroll Management",
    title: "Payroll Management Tutorials",
    icon: Wallet,
    description:
      "Review salary structures, deductions, attendance inputs, payslips, and payroll reports so payroll teams can work more confidently.",
    topics: [
      "Payroll processing steps",
      "Gross and net salary",
      "Earnings and deductions",
      "Overtime calculation",
      "Payslip generation",
      "Payroll verification",
    ],
    relatedLabel: "Explore Payroll",
    relatedHref: "/products/payroll",
    pathTitle: "Payroll Learning Path",
    resources: ["payroll-guide"],
    visual: "payroll",
  },
  {
    id: "leave-management",
    navLabel: "Leave Management",
    title: "Leave Management Resources",
    icon: Layers3,
    description:
      "See how leave balances, policies, approval flows, holiday calendars, and leave reports support better workforce planning.",
    topics: [
      "Types of employee leave",
      "Leave policies",
      "Leave balances",
      "Approval workflows",
      "Holiday calendars",
      "Leave reports",
    ],
    relatedLabel: "Explore Leave",
    relatedHref: "/products/leave-management",
    pathTitle: "Leave Management Essentials",
    resources: ["leave-guide"],
    visual: "leave",
  },
  {
    id: "employee-management",
    navLabel: "Employee Management",
    title: "Employee Management Guides",
    icon: Users,
    description:
      "Learn how to manage employee profiles, documents, status changes, transfers, and the lifecycle of a centralized employee record.",
    topics: [
      "Digital employee records",
      "Department setup",
      "Document management",
      "Employment history",
      "Transfers and role changes",
      "Exit records",
    ],
    relatedLabel: "Explore Core HR",
    relatedHref: "/products/core-hr",
    pathTitle: "Employee Management Guide",
    resources: ["employee-service"],
    visual: "employee",
  },
  {
    id: "recruitment-performance",
    navLabel: "Recruitment + Performance",
    title: "Recruitment and Performance Learning",
    icon: ClipboardList,
    description:
      "Recruitment and performance work best when hiring, onboarding, reviews, and development steps stay structured and easy to follow.",
    topics: [
      "Recruitment workflow",
      "Candidate tracking",
      "Interview scheduling",
      "Offer management",
      "Goal setting",
      "Employee reviews",
      "Appraisal cycles",
      "Performance reports",
    ],
    relatedLabel: "Explore Hiring",
    relatedHref: "/products/recruitment-ats",
    pathTitle: "Recruitment and Performance",
    resources: ["recruitment-guide", "performance-guide"],
    visual: "recruitment",
  },
  {
    id: "hr-compliance",
    navLabel: "HR Compliance",
    title: "HR Compliance Learning Resources",
    icon: ShieldCheck,
    description:
      "Use this section for general educational guidance about payroll records, contributions, audits, and compliance-related reporting.",
    topics: [
      "HR compliance basics",
      "Provident Fund",
      "ESIC",
      "Professional Tax",
      "TDS",
      "Payroll compliance records",
      "Audit preparation",
      "Contribution records",
    ],
    relatedLabel: "Explore HR Security",
    relatedHref: "/hrms-security",
    pathTitle: "Compliance Basics",
    resources: ["compliance-guide"],
    visual: "compliance",
    note: "Compliance resources are provided for general educational purposes and do not replace professional legal, tax, payroll, or regulatory advice.",
  },
  {
    id: "reports-analytics",
    navLabel: "Reports and Analytics",
    title: "HR Reports and Analytics Guides",
    icon: BarChart3,
    description:
      "Learn how employee, attendance, payroll, leave, recruitment, performance, and branch reports help teams make better HR decisions.",
    topics: [
      "Employee reports",
      "Attendance reports",
      "Payroll reports",
      "Leave reports",
      "Branch-wise reports",
      "HR dashboards",
      "Workforce analytics",
      "Report filters",
    ],
    relatedLabel: "Explore Reports",
    relatedHref: "/hr-reports",
    pathTitle: "HR Reporting and Decision-Making",
    resources: ["reports-guide"],
    visual: "reports",
  },
  {
    id: "hr-automation",
    navLabel: "HR Automation",
    title: "HR Automation Guides",
    icon: Workflow,
    description:
      "See how attendance, payroll, leave approvals, onboarding, notifications, and report flows can be organized with automation.",
    topics: [
      "Attendance automation",
      "Payroll automation",
      "Leave approval automation",
      "Onboarding automation",
      "Notification automation",
      "Approval workflows",
      "Employee self-service",
      "Report automation",
    ],
    relatedLabel: "Explore Automation",
    relatedHref: "/hr-automation",
    pathTitle: "HR Automation for Growing Businesses",
    resources: ["automation-guide"],
    visual: "automation",
  },
  {
    id: "hrms-security",
    navLabel: "HRMS Security",
    title: "HRMS Security Resources",
    icon: LockKeyhole,
    description:
      "Understand role-based access, user accounts, payroll data protection, document access, and HR security best practices.",
    topics: [
      "Role-based access control",
      "Secure user accounts",
      "Payroll data protection",
      "Employee document security",
      "Report permissions",
      "User access management",
      "HR security best practices",
    ],
    relatedLabel: "Explore Security",
    relatedHref: "/hrms-security",
    pathTitle: "Security and Access Control",
    resources: ["security-guide"],
    visual: "security",
  },
];

const featuredResources: LearningResource[] = [
  {
    id: "hrms-basics",
    type: "Beginner Guide",
    title: "What Is HRMS Software?",
    description:
      "A beginner-friendly overview of how HRMS centralizes employee records, attendance, leave, payroll, recruitment, and reporting.",
    category: "HRMS Fundamentals",
    difficulty: "Beginner",
    cta: "Explore Guide",
    href: "/products/core-hr",
  },
  {
    id: "attendance-guide",
    type: "Step-by-Step Tutorial",
    title: "How Attendance Management Works",
    description:
      "Learn about attendance methods, shifts, missing punches, overtime, and attendance corrections in a structured way.",
    category: "Attendance Management",
    difficulty: "Beginner",
    cta: "View Topic",
    href: "/attendance-management",
  },
  {
    id: "payroll-guide",
    type: "Product Guide",
    title: "Payroll Processing Explained",
    description:
      "Understand salary structures, deductions, attendance inputs, payslips, and payroll reporting from one simple guide.",
    category: "Payroll Management",
    difficulty: "Intermediate",
    cta: "Explore Guide",
    href: "/products/payroll",
  },
  {
    id: "leave-guide",
    type: "HR Checklist",
    title: "Leave Management Best Practices",
    description:
      "Practical ideas for leave policies, balances, approvals, holiday calendars, and reporting for HR teams.",
    category: "Leave Management",
    difficulty: "Beginner",
    cta: "View Topic",
    href: "/products/leave-management",
  },
  {
    id: "employee-service",
    type: "FAQ Resource",
    title: "Employee Self-Service Guide",
    description:
      "See how employee self-service can reduce repetitive follow-ups and make common HR requests easier to manage.",
    category: "Employee Management",
    difficulty: "Beginner",
    cta: "Explore Guide",
    href: "/products/employee-self-service",
  },
  {
    id: "automation-guide",
    type: "HR Best Practice",
    title: "HR Automation for Growing Businesses",
    description:
      "Learn how structured workflows can reduce manual follow-up and help teams move work forward with less effort.",
    category: "HR Automation",
    difficulty: "Intermediate",
    cta: "Explore Guide",
    href: "/hr-automation",
  },
  {
    id: "reports-guide",
    type: "Product Guide",
    title: "HR Reporting and Analytics Guide",
    description:
      "See how employee, attendance, payroll, leave, branch, and department reports support better HR decisions.",
    category: "Reports and Analytics",
    difficulty: "Intermediate",
    cta: "View Topic",
    href: "/hr-reports",
  },
  {
    id: "security-guide",
    type: "Glossary Entry",
    title: "HRMS Security Basics",
    description:
      "Understand role-based access, permissions, and secure handling of HR data at a high level.",
    category: "HRMS Security",
    difficulty: "Beginner",
    cta: "View Topic",
    href: "/hrms-security",
  },
  {
    id: "coming-soon",
    type: "HR Checklist",
    title: "Implementation Readiness Checklist",
    description:
      "A practical checklist for teams preparing data, approvals, and rollout steps before they get started.",
    category: "HRMS Fundamentals",
    difficulty: "Intermediate",
    cta: "Coming Soon",
    comingSoon: true,
  },
];

const learningPaths: LearningPath[] = [
  {
    id: "basics",
    title: "HRMS Basics for Beginners",
    description:
      "Start with the core concepts so your team understands the platform before moving into workflows.",
    steps: [
      "Understanding HRMS",
      "Employee database setup",
      "Attendance management",
      "Leave management",
      "Payroll basics",
      "Employee self-service",
      "HR reports",
      "HR automation",
    ],
  },
  {
    id: "attendance",
    title: "Attendance and Shift Management",
    description:
      "Build confidence in how attendance methods, shift rules, and overtime fit together.",
    steps: [
      "Attendance methods",
      "Shift creation",
      "Weekly-off management",
      "Late mark rules",
      "Missing punches",
      "Attendance regularization",
      "Overtime",
      "Attendance reports",
    ],
  },
  {
    id: "payroll",
    title: "Payroll Learning Path",
    description:
      "Learn how attendance, salary structures, deductions, and payroll review work together.",
    steps: [
      "Payroll fundamentals",
      "Salary structures",
      "Earnings and deductions",
      "Attendance inputs",
      "Overtime and bonuses",
      "Statutory deductions",
      "Payslips",
      "Payroll reports",
      "Payroll verification",
    ],
  },
  {
    id: "ops",
    title: "HR Operations for Growing Businesses",
    description:
      "A practical sequence for teams that want to organize records, approvals, and reporting.",
    steps: [
      "Centralized employee records",
      "Onboarding",
      "Attendance and shifts",
      "Leave workflows",
      "Payroll",
      "Employee documents",
      "Approvals",
      "Reports",
      "Role-based access",
      "Multi-branch management",
    ],
  },
  {
    id: "reporting",
    title: "HR Reporting and Decision-Making",
    description:
      "Use reports and dashboards to compare branches, teams, attendance, and payroll trends.",
    steps: [
      "Employee reports",
      "Attendance analysis",
      "Payroll reports",
      "Leave trends",
      "Department comparisons",
      "Branch comparisons",
      "Dashboards",
      "HR analytics",
      "Management reporting",
    ],
  },
];

const formatCards: FormatCard[] = [
  {
    title: "Step-by-Step Guides",
    desc: "Practical guides explaining HR processes in a structured way.",
    icon: NotebookPen,
  },
  {
    title: "Product Tutorials",
    desc: "Instructions for using available Altroz HRMS features.",
    icon: BookOpen,
  },
  {
    title: "HR Best Practices",
    desc: "Ideas for improving accuracy, productivity, and employee experience.",
    icon: Lightbulb,
  },
  {
    title: "HR Checklists",
    desc: "Useful checklists for payroll review, onboarding, attendance, and compliance.",
    icon: ClipboardList,
  },
  {
    title: "HR Glossary",
    desc: "Definitions of common HRMS, payroll, attendance, and compliance terms.",
    icon: Layers3,
  },
  {
    title: "Frequently Asked Questions",
    desc: "Clear answers to common HR and HRMS questions.",
    icon: CheckCircle2,
  },
];

const audienceGroups: AudienceGroup[] = [
  {
    id: "hr-managers",
    name: "HR Managers",
    description:
      "Focus on approvals, reporting, policies, attendance, workforce planning, and process improvement.",
    focus: "Approvals, reporting, policies, and planning",
    areaIds: ["hrms-fundamentals", "attendance-management", "reports-analytics"],
    pathIds: ["basics", "reporting"],
  },
  {
    id: "hr-executives",
    name: "HR Executives",
    description:
      "Focus on attendance, payroll, leave, employee records, recruitment, and documentation.",
    focus: "Records, payroll, leave, and recruitment",
    areaIds: ["attendance-management", "payroll-management", "employee-management"],
    pathIds: ["attendance", "payroll"],
  },
  {
    id: "business-owners",
    name: "Business Owners",
    description:
      "Focus on workforce visibility, reporting, automation, costs, and business decisions.",
    focus: "Visibility, automation, and decision-making",
    areaIds: ["reports-analytics", "hr-automation", "hrms-fundamentals"],
    pathIds: ["ops", "reporting"],
  },
  {
    id: "payroll-teams",
    name: "Payroll Teams",
    description:
      "Focus on salary inputs, deductions, attendance data, statutory records, and verification.",
    focus: "Inputs, deductions, and verification",
    areaIds: ["payroll-management", "hr-compliance", "reports-analytics"],
    pathIds: ["payroll"],
  },
  {
    id: "department-managers",
    name: "Department Managers",
    description: "Focus on team attendance, leave requests, approvals, and workforce reports.",
    focus: "Team attendance and approvals",
    areaIds: ["attendance-management", "leave-management", "reports-analytics"],
    pathIds: ["attendance", "reporting"],
  },
  {
    id: "startups-smes",
    name: "Startups and SMEs",
    description:
      "Focus on building structured HR processes as the team grows and roles become more defined.",
    focus: "Build structure as you grow",
    areaIds: ["hrms-fundamentals", "hr-automation", "employee-management"],
    pathIds: ["basics", "ops"],
  },
  {
    id: "enterprises",
    name: "Enterprises and Multi-Branch Organizations",
    description:
      "Focus on branches, departments, permissions, large workforces, and centralized reporting.",
    focus: "Branches, permissions, and centralized reporting",
    areaIds: ["attendance-management", "reports-analytics", "hrms-security"],
    pathIds: ["reporting", "ops"],
  },
];

const popularTopics: PopularTopic[] = [
  { label: "What is HRMS Software?", areaId: "hrms-fundamentals" },
  { label: "What is Attendance Management?", areaId: "attendance-management" },
  { label: "What is Payroll Management?", areaId: "payroll-management" },
  { label: "How Employee Self-Service Works", areaId: "employee-management" },
  { label: "What Is HR Automation?", areaId: "hr-automation" },
  { label: "What Are HR Reports?", areaId: "reports-analytics" },
  { label: "How to Protect Employee Data", areaId: "hrms-security" },
  { label: "How to Manage Multiple Branches", areaId: "reports-analytics" },
];

const faqItems: FaqItem[] = [
  {
    question: "What Is the Altroz HRMS Learning Center?",
    answer:
      "The Learning Center is an educational hub for guides, tutorials, best practices, FAQs, and product learning materials about HRMS, attendance, payroll, leave, employee management, reporting, compliance, automation, and security.",
  },
  {
    question: "Who Can Use the Learning Center?",
    answer:
      "It is useful for HR managers, HR executives, payroll teams, department managers, business owners, startups, SMEs, and organizations exploring HRMS software.",
  },
  {
    question: "Do I Need HR Experience to Use These Resources?",
    answer:
      "No. The content is designed to be easy to understand for beginners as well as experienced HR professionals.",
  },
  {
    question: "What Topics Are Covered?",
    answer:
      "The Learning Center covers HRMS basics, attendance, payroll, leave, employee records, recruitment, performance, compliance, reporting, analytics, automation, and security.",
  },
  {
    question: "Are the Resources Specific to Altroz HRMS?",
    answer:
      "Some resources explain general HR concepts, while product guides focus on available Altroz HRMS features and workflows.",
  },
  {
    question: "Can I Learn How to Use Altroz HRMS?",
    answer:
      "Product tutorials and process guides can explain how to use supported Altroz HRMS modules and features.",
  },
  {
    question: "Is Compliance Information Legal Advice?",
    answer:
      "No. Compliance content is provided for general informational purposes and does not replace professional legal, tax, payroll, or regulatory advice.",
  },
  {
    question: "Are New Resources Added Regularly?",
    answer:
      "New guides, tutorials, FAQs, and verified product resources may be added as the Learning Center grows.",
  },
];

function usePageSeo(title: string, description: string, canonicalPath: string) {
  useEffect(() => {
    const previousTitle = document.title;
    const head = document.head;

    let meta = head.querySelector<HTMLMetaElement>('meta[name="description"]');
    const createdMeta = !meta;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      head.appendChild(meta);
    }

    let canonical = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const createdCanonical = !canonical;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      head.appendChild(canonical);
    }

    document.title = title;
    meta.content = description;
    canonical.href = new URL(canonicalPath, window.location.origin).href;

    return () => {
      document.title = previousTitle;
      if (createdMeta) meta?.remove();
      if (createdCanonical) canonical?.remove();
    };
  }, [canonicalPath, description, title]);
}

function useReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return reduceMotion;
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className,
      )}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
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
    <div className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl")}>
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-ink-soft">{description}</p>
    </div>
  );
}

function ResourceCard({ resource }: { resource: LearningResource }) {
  const shared =
    "soft-card flex h-full flex-col p-5 transition-transform duration-300 hover:-translate-y-1";

  return (
    <article className={shared}>
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-primary-soft px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
          {resource.type}
        </span>
        <span className="rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-semibold text-ink-soft">
          {resource.difficulty}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-bold text-ink">{resource.title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{resource.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-ink">
          {resource.category}
        </span>
      </div>

      <div className="mt-5">
        {resource.comingSoon ? (
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-ink-soft opacity-70"
          >
            {resource.cta}
          </button>
        ) : (
          <a
            href={resource.href}
            className="inline-flex items-center gap-1 rounded-lg border border-primary/20 bg-primary-soft px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            {resource.cta}
            <ArrowRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </article>
  );
}

function SectionVisual({ area }: { area: LearnArea }) {
  switch (area.visual) {
    case "hub":
      return (
        <div className="rounded-[2rem] border border-border bg-white p-5 shadow-float">
          <div className="grid gap-4 sm:grid-cols-2">
            {["Employee records", "Attendance", "Leave", "Payroll", "Recruitment", "Reports"].map(
              (item) => (
                <div key={item} className="rounded-2xl border border-border bg-surface p-4">
                  <div className="text-sm font-semibold text-ink">{item}</div>
                </div>
              ),
            )}
          </div>
          <div className="mt-4 rounded-2xl border border-border bg-primary-soft p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Central HRMS hub
            </div>
            <div className="mt-2 text-sm text-ink-soft">
              Learn how the modules connect to support daily HR work.
            </div>
          </div>
        </div>
      );
    case "attendance":
      return (
        <div className="rounded-[2rem] border border-border bg-white p-5 shadow-float">
          <img
            src={modelScreenshots.attendanceDashboard}
            alt="Attendance dashboard preview"
            className="h-56 w-full rounded-[1.5rem] object-contain bg-white p-2"
            loading="lazy"
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ["Methods", "Biometric, GPS, QR"],
              ["Shifts", "Managed by rules"],
              ["Output", "Attendance reports"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-border bg-surface p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
                  {label}
                </div>
                <div className="mt-1 text-sm font-bold text-ink">{value}</div>
              </div>
            ))}
          </div>
        </div>
      );
    case "payroll":
      return (
        <div className="rounded-[2rem] border border-border bg-white p-5 shadow-float">
          <div className="grid gap-3">
            {[
              "Attendance and leave inputs",
              "Salary structure",
              "Earnings and deductions",
              "Statutory calculations",
              "Payroll review",
              "Payslip generation",
              "Reports",
            ].map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4"
              >
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-white">
                  {index + 1}
                </div>
                <div className="text-sm font-semibold text-ink">{step}</div>
              </div>
            ))}
          </div>
        </div>
      );
    case "leave":
      return (
        <div className="rounded-[2rem] border border-border bg-white p-5 shadow-float">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-4">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Calendar
              </div>
              <div className="mt-3 grid grid-cols-7 gap-1">
                {Array.from({ length: 28 }).map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "grid aspect-square place-items-center rounded-lg text-xs font-semibold",
                      index % 6 === 0 ? "bg-primary-soft text-primary" : "bg-white text-ink-soft",
                    )}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-white p-4">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Approvals
              </div>
              <div className="mt-3 space-y-3">
                {["Manager review", "Balance check", "Holiday calendar", "Leave report"].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl bg-surface p-3 text-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      );
    case "employee":
      return (
        <div className="rounded-[2rem] border border-border bg-white p-5 shadow-float">
          <div className="grid gap-3">
            {[
              "Recruitment",
              "Onboarding",
              "Active employment",
              "Development",
              "Transfers",
              "Exit",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4"
              >
                <div className="grid h-8 w-8 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                  {index + 1}
                </div>
                <div className="text-sm font-semibold text-ink">{item}</div>
              </div>
            ))}
          </div>
        </div>
      );
    case "recruitment":
      return (
        <div className="rounded-[2rem] border border-border bg-white p-5 shadow-float">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-4">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Recruitment
              </div>
              <div className="mt-3 space-y-2">
                {[
                  "Job openings",
                  "Candidate tracking",
                  "Interview scheduling",
                  "Offer management",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl bg-white p-3 text-sm font-semibold text-ink shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Performance
              </div>
              <div className="mt-3 space-y-2">
                {[
                  "Goal setting",
                  "Employee reviews",
                  "Appraisal cycles",
                  "Performance reports",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl bg-white p-3 text-sm font-semibold text-ink shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    case "compliance":
      return (
        <div className="rounded-[2rem] border border-border bg-white p-5 shadow-float">
          <div className="rounded-2xl border border-primary/20 bg-primary-soft p-4 text-sm text-ink-soft">
            Compliance resources are for general educational purposes only.
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {["PF", "ESIC", "Professional Tax", "TDS", "Contribution records", "Audit prep"].map(
              (item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4"
                >
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-sm font-semibold text-ink">{item}</span>
                </div>
              ),
            )}
          </div>
        </div>
      );
    case "reports":
      return (
        <div className="rounded-[2rem] border border-border bg-white p-5 shadow-float">
          <img
            src={modelScreenshots.employeeReport}
            alt="Report preview"
            className="h-52 w-full rounded-[1.5rem] object-contain bg-white p-2"
            loading="lazy"
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ["Filters", "Branch, dept, date"],
              ["Metrics", "Attendance, payroll"],
              ["Use", "Decision support"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-border bg-surface p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
                  {label}
                </div>
                <div className="mt-1 text-sm font-bold text-ink">{value}</div>
              </div>
            ))}
          </div>
        </div>
      );
    case "automation":
      return (
        <div className="rounded-[2rem] border border-border bg-white p-5 shadow-float">
          <div className="grid gap-3">
            {[
              "Manual follow-up",
              "Structured workflow",
              "Approval routing",
              "Notifications",
              "Reports",
            ].map((item, index) => (
              <div key={item} className="flex items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                  {index + 1}
                </div>
                <div className="flex-1 rounded-2xl border border-border bg-surface p-4 text-sm font-semibold text-ink">
                  {item}
                </div>
                {index < 4 ? (
                  <ArrowRight className="hidden h-4 w-4 shrink-0 text-primary md:block" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      );
    case "security":
      return (
        <div className="rounded-[2rem] border border-border bg-white p-5 shadow-float">
          <div className="grid gap-3">
            {[
              ["HR Admin", "Profiles, policies, reports"],
              ["Manager", "Team approvals, team reports"],
              ["Payroll", "Salary data, payroll reports"],
              ["Employee", "Own profile and requests"],
            ].map(([role, access]) => (
              <div
                key={role}
                className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-4"
              >
                <div className="text-sm font-semibold text-ink">{role}</div>
                <div className="text-xs text-ink-soft">{access}</div>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}

function LearningAreaSection({ area, reverse = false }: { area: LearnArea; reverse?: boolean }) {
  const Icon = area.icon;
  const isRecruitmentPerformance = area.id === "recruitment-performance";

  return (
    <section id={area.id} className="scroll-mt-28 py-8 lg:py-10">
      <div className="container-x">
        <div className="rounded-[2rem] border border-border bg-white p-5 shadow-float lg:p-6">
          <div
            className={cn(
              "grid gap-8 lg:grid-cols-12 lg:items-start",
              reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : "",
            )}
          >
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary">
                <Icon className="h-4 w-4" />
                {area.navLabel}
              </div>
              <h3 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">{area.title}</h3>
              <p className="mt-4 text-sm leading-7 text-ink-soft">{area.description}</p>

              {area.note ? (
                <div className="mt-5 rounded-2xl border border-primary/20 bg-primary-soft p-4 text-sm text-ink-soft">
                  {area.note}
                </div>
              ) : null}

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {area.topics.map((topic) => (
                  <div
                    key={topic}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span className="text-sm text-ink">{topic}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href={area.relatedHref} className="btn-primary">
                  {area.relatedLabel}
                </a>
                <a href="#resource-categories" className="btn-outline">
                  Back to categories
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              {isRecruitmentPerformance ? (
                <SectionVisual area={area} />
              ) : (
                <SectionVisual area={area} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LearnPage() {
  usePageSeo(seoTitle, seoDescription, "/learn");

  const [query, setQuery] = useState("");
  const [selectedAreaId, setSelectedAreaId] = useState(learningAreas[0].id);
  const [selectedAudienceId, setSelectedAudienceId] = useState(audienceGroups[0].id);
  const [selectedPathId, setSelectedPathId] = useState(learningPaths[0].id);

  const normalizedQuery = query.trim().toLowerCase();

  const matchedResources = useMemo(() => {
    if (!normalizedQuery) return featuredResources;
    return featuredResources.filter((resource) => {
      const haystack = [
        resource.type,
        resource.title,
        resource.description,
        resource.category,
        resource.difficulty,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  const matchedAreas = useMemo(() => {
    if (!normalizedQuery) return learningAreas;
    return learningAreas.filter((area) => {
      const haystack = [area.navLabel, area.title, area.description, ...area.topics]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  const selectedArea = learningAreas.find((area) => area.id === selectedAreaId) ?? learningAreas[0];
  const selectedAudience =
    audienceGroups.find((audience) => audience.id === selectedAudienceId) ?? audienceGroups[0];
  const selectedPath = learningPaths.find((path) => path.id === selectedPathId) ?? learningPaths[0];

  const selectedAudienceAreas = selectedAudience.areaIds
    .map((id) => learningAreas.find((area) => area.id === id))
    .filter(Boolean) as LearnArea[];
  const selectedAudiencePaths = selectedAudience.pathIds
    .map((id) => learningPaths.find((path) => path.id === id))
    .filter(Boolean) as LearningPath[];

  const clearSearch = () => setQuery("");
  const choosePopularTopic = (topic: PopularTopic) => {
    setQuery(topic.label);
    setSelectedAreaId(topic.areaId);
    document
      .getElementById("resource-categories")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <TopNavbar />
      <MainNavbar />

      <main className="overflow-x-clip">
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 top-16 h-56 w-56 rounded-full bg-success/10 blur-3xl" />

          <div className="container-x grid gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:py-12">
            <Reveal className="lg:pt-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Altroz HRMS Learning Center
              </span>
              <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
                Learn HRMS, Payroll, Attendance, and Modern HR Processes
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
                Welcome to the Altroz HRMS Learning Center. Explore easy-to-understand guides,
                tutorials, HR best practices, and product resources designed to simplify attendance,
                payroll, leave management, employee management, compliance, reporting, and HR
                automation.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-ink-soft">
                Whether you are new to HRMS software or looking to improve existing HR operations,
                these learning resources can help you understand modern HR processes and make better
                workforce decisions.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#resource-categories" className="btn-primary">
                  Explore Learning Resources
                </a>
                <a href="/company/book-demo" className="btn-outline">
                  Book Free Demo
                </a>
              </div>
            </Reveal>

            <Reveal className="lg:pt-2" delay={120}>
              <div className="soft-card relative overflow-hidden p-5">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 popup-blue-band" />
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    "HRMS Basics",
                    "Attendance Guides",
                    "Payroll Tutorials",
                    "Leave Management",
                    "HR Automation",
                    "Reports and Analytics",
                  ].map((label) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-border bg-white p-4 shadow-card transition-transform duration-300 hover:-translate-y-1"
                    >
                      <div className="text-sm font-semibold text-ink">{label}</div>
                    </div>
                  ))}
                  <div className="rounded-2xl border border-border bg-surface p-4 sm:col-span-2">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                      Learning dashboard
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {[
                        ["Guides", "Step-by-step"],
                        ["Topics", "Searchable"],
                        ["Paths", "Structured"],
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-xl bg-white p-3 shadow-sm">
                          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                            {label}
                          </div>
                          <div className="mt-1 text-sm font-bold text-ink">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-border bg-white">
          <div className="container-x py-5">
            <div className="flex gap-3 overflow-x-auto pb-1">
              {[
                "HRMS Basics",
                "Attendance",
                "Payroll",
                "Leave",
                "Employee Management",
                "Reports",
                "HR Automation",
                "Security",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setQuery(item)}
                  className="shrink-0 rounded-full border border-border bg-white px-3 py-2 text-sm font-medium text-ink shadow-sm transition-colors hover:bg-primary-soft hover:text-primary"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 lg:py-12">
          <div className="container-x grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Search"
                title="Search HRMS, payroll, attendance, leave, reports, or compliance"
                description="Search the learning center content on this page. Use the quick chips if you want to jump straight into a topic."
              />

              <div className="mt-6 rounded-[1.5rem] border border-border bg-white p-4 shadow-card">
                <label className="sr-only" htmlFor="learn-search">
                  Search learning resources
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 focus-within:ring-2 focus-within:ring-primary/40">
                  <Search className="h-4 w-4 shrink-0 text-primary" />
                  <input
                    id="learn-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search HRMS, payroll, attendance, leave, reports, or compliance"
                    className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft"
                  />
                  {query ? (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-white hover:text-primary"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : null}
                </div>

                <div
                  className="mt-3 text-xs font-medium text-ink-soft"
                  role="status"
                  aria-live="polite"
                >
                  {matchedResources.length} resource
                  {matchedResources.length === 1 ? "" : "s"} and {matchedAreas.length} topic
                  {matchedAreas.length === 1 ? "" : "s"} match your search.
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {matchedResources.slice(0, 4).map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>

              {matchedResources.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-border bg-surface p-5 text-sm text-ink-soft">
                  No resources matched your search. Try another topic or explore the category
                  browser below.
                </div>
              ) : null}
            </div>

            <Reveal className="lg:sticky lg:top-28">
              <div className="soft-card p-5">
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  Quick search chips
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {popularTopics.map((topic) => (
                    <button
                      key={topic.label}
                      type="button"
                      onClick={() => choosePopularTopic(topic)}
                      className="rounded-full border border-border bg-white px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-primary-soft hover:text-primary"
                    >
                      {topic.label}
                    </button>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-border bg-surface p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Coming soon note
                  </div>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">
                    More learning resources will be added as verified guides and tutorials become
                    available.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-10 lg:py-12">
          <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-6">
              <SectionHeading
                eyebrow="Welcome"
                title="Welcome to the Altroz HRMS Learning Center"
                description="Learning is the first step toward building smarter and more efficient HR processes. This center is designed for HR teams, business owners, and growing organizations."
              />
            </Reveal>
            <Reveal className="lg:col-span-6" delay={100}>
              <div className="rounded-[2rem] border border-border bg-white p-5 shadow-float">
                <div className="space-y-3">
                  {[
                    "1. Understand the process",
                    "2. Explore practical guides",
                    "3. Apply HR best practices",
                    "4. Learn Altroz HRMS features",
                    "5. Improve HR operations",
                  ].map((step, index) => (
                    <div
                      key={step}
                      className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4"
                    >
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-white">
                        {index + 1}
                      </div>
                      <div className="text-sm font-semibold text-ink">{step}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="resource-categories" className="scroll-mt-28 py-10 lg:py-12">
          <div className="container-x">
            <SectionHeading
              eyebrow="Categories"
              title="What Would You Like to Learn?"
              description="Choose a category to preview suggested topics, a related product page, a learning path, and matching resources."
              align="center"
            />

            <div className="mt-8 grid gap-6 lg:grid-cols-[300px_1fr]">
              <Reveal className="lg:sticky lg:top-28">
                <div className="hidden rounded-[1.5rem] border border-border bg-white p-3 shadow-card lg:block">
                  <div className="space-y-2">
                    {learningAreas.map((area) => {
                      const Icon = area.icon;
                      const active = area.id === selectedAreaId;
                      return (
                        <button
                          key={area.id}
                          type="button"
                          onClick={() => setSelectedAreaId(area.id)}
                          aria-pressed={active}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors",
                            active
                              ? "border-primary/20 bg-primary-soft text-primary"
                              : "border-transparent bg-white text-ink hover:bg-surface",
                          )}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          <span className="text-sm font-semibold">{area.navLabel}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
                  {learningAreas.map((area) => {
                    const Icon = area.icon;
                    const active = area.id === selectedAreaId;
                    return (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => setSelectedAreaId(area.id)}
                        aria-pressed={active}
                        className={cn(
                          "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                          active
                            ? "border-primary/20 bg-primary-soft text-primary"
                            : "border-border bg-white text-ink",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {area.navLabel}
                      </button>
                    );
                  })}
                </div>
              </Reveal>

              <Reveal>
                <div className="rounded-[2rem] border border-border bg-white p-5 shadow-float">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                        <selectedArea.icon className="h-4 w-4" />
                        {selectedArea.navLabel}
                      </div>
                      <h3 className="mt-4 text-2xl font-bold text-ink">{selectedArea.title}</h3>
                      <p className="mt-3 max-w-3xl text-sm leading-7 text-ink-soft">
                        {selectedArea.description}
                      </p>
                    </div>
                    <a
                      href={selectedArea.relatedHref}
                      className="inline-flex items-center gap-1 rounded-lg border border-primary/20 bg-primary-soft px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                    >
                      {selectedArea.relatedLabel}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.1fr]">
                    <div className="rounded-2xl border border-border bg-surface p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        Suggested topics
                      </div>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {selectedArea.topics.map((topic) => (
                          <div
                            key={topic}
                            className="flex items-start gap-3 rounded-xl bg-white p-3 text-sm"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                            <span className="text-ink">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <div className="rounded-2xl border border-border bg-white p-4 shadow-card">
                        <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                          Suggested learning path
                        </div>
                        <div className="mt-2 text-sm font-semibold text-ink">
                          {selectedArea.pathTitle}
                        </div>
                      </div>
                      <div className="rounded-2xl border border-border bg-white p-4 shadow-card">
                        <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                          Matching resources
                        </div>
                        <div className="mt-3 grid gap-3">
                          {featuredResources
                            .filter((resource) => selectedArea.resources.includes(resource.id))
                            .slice(0, 2)
                            .map((resource) => (
                              <div key={resource.id} className="rounded-xl bg-surface p-3">
                                <div className="text-sm font-semibold text-ink">
                                  {resource.title}
                                </div>
                                <div className="mt-1 text-xs text-ink-soft">{resource.type}</div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {learningAreas.map((area, index) => (
          <Reveal key={area.id} delay={index * 40}>
            <LearningAreaSection area={area} reverse={index % 2 === 1} />
          </Reveal>
        ))}

        <section className="py-10 lg:py-12 bg-surface/40">
          <div className="container-x">
            <SectionHeading
              eyebrow="Featured resources"
              title="Featured Learning Resources"
              description="Use these resource cards as practical starting points. Some are linked to existing product pages, while others are marked coming soon until verified content is available."
              align="center"
            />

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {matchedResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-white p-4 text-sm text-ink-soft shadow-card">
              More resources coming soon.
            </div>
          </div>
        </section>

        <section className="py-10 lg:py-12">
          <div className="container-x">
            <SectionHeading
              eyebrow="Paths"
              title="Follow a Structured Learning Path"
              description="Each path is a static educational sequence that helps visitors move from basics to more advanced topics."
              align="center"
            />

            <Tabs defaultValue={selectedPath.id} className="mt-8 space-y-6">
              <TabsList className="flex w-full gap-2 overflow-x-auto rounded-[1.25rem] bg-white p-2 shadow-card">
                {learningPaths.map((path) => (
                  <TabsTrigger
                    key={path.id}
                    value={path.id}
                    className="min-w-max rounded-full px-4 py-2 text-sm font-semibold text-ink data-[state=active]:bg-primary data-[state=active]:text-white"
                    onClick={() => setSelectedPathId(path.id)}
                  >
                    {path.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {learningPaths.map((path) => (
                <TabsContent key={path.id} value={path.id}>
                  <div className="grid gap-6 rounded-[2rem] border border-border bg-white p-5 shadow-float lg:grid-cols-[0.95fr_1.05fr]">
                    <div>
                      <h3 className="text-2xl font-bold text-ink">{path.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-ink-soft">{path.description}</p>
                    </div>
                    <ol className="grid gap-3">
                      {path.steps.map((step, stepIndex) => (
                        <li
                          key={step}
                          className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4"
                        >
                          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-soft text-sm font-bold text-primary">
                            {stepIndex + 1}
                          </div>
                          <span className="text-sm font-medium text-ink">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        <section className="py-10 lg:py-12 bg-surface/40">
          <div className="container-x">
            <SectionHeading
              eyebrow="Formats"
              title="Choose the Learning Format That Works for You"
              description="Use guides, tutorials, best practices, checklists, glossary entries, and FAQs to learn at your own pace."
              align="center"
            />

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {formatCards.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="soft-card p-5">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{item.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-10 lg:py-12">
          <div className="container-x">
            <SectionHeading
              eyebrow="Topics"
              title="Popular HR Learning Topics"
              description="Click a topic to jump back to the relevant category and refresh the page search results."
              align="center"
            />

            <div className="mt-6 flex flex-wrap gap-2">
              {popularTopics.map((topic) => (
                <button
                  key={topic.label}
                  type="button"
                  onClick={() => choosePopularTopic(topic)}
                  className="rounded-full border border-border bg-white px-3 py-2 text-sm font-medium text-ink shadow-sm transition-colors hover:bg-primary-soft hover:text-primary"
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 lg:py-12 bg-surface/40">
          <div className="container-x">
            <SectionHeading
              eyebrow="Audience"
              title="Learning Resources for Every HR Role"
              description="Choose the audience that best matches your role to see recommended categories and learning paths."
              align="center"
            />

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.05fr]">
              <div className="grid gap-3 sm:grid-cols-2">
                {audienceGroups.map((group) => {
                  const active = group.id === selectedAudienceId;
                  return (
                    <button
                      key={group.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => {
                        setSelectedAudienceId(group.id);
                        setSelectedAreaId(group.areaIds[0]);
                        setSelectedPathId(group.pathIds[0]);
                      }}
                      className={cn(
                        "rounded-2xl border p-4 text-left shadow-card transition-colors",
                        active
                          ? "border-primary/20 bg-primary-soft"
                          : "border-border bg-white hover:bg-surface",
                      )}
                    >
                      <div className="text-base font-bold text-ink">{group.name}</div>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{group.description}</p>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-[2rem] border border-border bg-white p-5 shadow-float">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Selected audience
                </div>
                <h3 className="mt-3 text-2xl font-bold text-ink">{selectedAudience.name}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{selectedAudience.focus}</p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-surface p-4">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                      Recommended categories
                    </div>
                    <div className="mt-3 space-y-2">
                      {selectedAudienceAreas.map((area) => (
                        <button
                          key={area.id}
                          type="button"
                          onClick={() => setSelectedAreaId(area.id)}
                          className="block w-full rounded-xl bg-white px-3 py-2 text-left text-sm font-semibold text-ink shadow-sm"
                        >
                          {area.navLabel}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border bg-surface p-4">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                      Recommended paths
                    </div>
                    <div className="mt-3 space-y-2">
                      {selectedAudiencePaths.map((path) => (
                        <button
                          key={path.id}
                          type="button"
                          onClick={() => setSelectedPathId(path.id)}
                          className="block w-full rounded-xl bg-white px-3 py-2 text-left text-sm font-semibold text-ink shadow-sm"
                        >
                          {path.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 lg:py-12">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <Reveal className="lg:col-span-7">
              <div className="rounded-[2rem] border border-border bg-white p-6 shadow-float">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Learning benefits
                </div>
                <h2 className="mt-3 text-3xl font-bold text-ink">
                  Why Use the Altroz HRMS Learning Center?
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "Understand HR processes easily",
                    "Reduce process errors",
                    "Improve HR productivity",
                    "Make better decisions",
                    "Improve employee experience",
                    "Prepare for HRMS implementation",
                    "Train HR teams",
                    "Stay informed",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span className="text-sm text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={120}>
              <div className="rounded-[2rem] border border-border bg-white p-6 shadow-float">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Learning center summary
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    "Guides for HR managers, executives, payroll teams, and owners",
                    "Practical resources for attendance, payroll, leave, reporting, automation, and security",
                    "Verified product links where available, with coming-soon labels where not",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-surface p-4">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm leading-6 text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-10 lg:py-12 bg-surface/40">
          <div className="container-x">
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently Asked Questions"
              description="A few quick answers about the learning center and the content it contains."
              align="center"
            />

            <div className="mt-8">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={item.question}
                    value={String(index)}
                    className="overflow-hidden rounded-2xl border border-border bg-white px-5 shadow-card"
                  >
                    <AccordionTrigger className="py-4 text-left text-sm font-semibold text-ink no-underline hover:no-underline">
                      <span>{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pt-1">
                      <p className="text-sm leading-7 text-ink-soft">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-10 lg:py-12">
          <div className="container-x">
            <div className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-primary to-[#0a4fda] p-8 text-center text-white md:p-12">
              <div className="absolute -right-16 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-16 left-0 h-56 w-56 rounded-full bg-success/20 blur-3xl" />
              <div className="relative">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Start Building Smarter HR Processes Today
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
                  Explore practical guides, HR best practices, tutorials, and product resources
                  designed to help you understand attendance, payroll, leave, employee management,
                  reporting, compliance, and HR automation.
                </p>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/75">
                  Learn how Altroz HRMS can help your organization reduce manual work, improve HR
                  accuracy, and manage workforce processes from one centralized platform.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <a
                    href="#resource-categories"
                    className="btn-primary bg-white text-primary hover:bg-primary-soft"
                  >
                    Explore Learning Resources
                  </a>
                  <a
                    href="/company/book-demo"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    Book Your Free Demo
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
