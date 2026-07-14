"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  CircleDot,
  Clock3,
  Construction,
  Code2,
  DoorOpen,
  Factory,
  FileBarChart2,
  FileText,
  Fingerprint,
  Globe2,
  GraduationCap,
  Handshake,
  IdCard,
  Hotel,
  LayoutDashboard,
  Lightbulb,
  LockKeyhole,
  MessageSquare,
  PackageCheck,
  MapPin,
  QrCode,
  RefreshCw,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Stethoscope,
  Target,
  Truck,
  UserCog,
  Users,
  Wallet,
  Workflow,
  ShoppingCart,
} from "lucide-react";
import Footer from "@/components/site/Footer";
import BrandMark from "@/components/site/BrandMark";
import MainNavbar from "@/components/site/MainNavbar";
import TopNavbar from "@/components/site/TopNavbar";
import { modelScreenshots } from "@/lib/modelScreenshots";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

type Capability = {
  title: string;
  description: string;
  icon: ReactNode;
};

type LifecycleStage = {
  id: string;
  title: string;
  icon: ReactNode;
  description: string;
  features: string[];
  focus: string;
};

type Industry = {
  id: string;
  title: string;
  icon: ReactNode;
  useCase: string;
  details: string[];
};

const pageTitle = "About Altroz Technologies | HRMS Software Company in Pune";
const pageDescription =
  "Learn about Altroz Technologies Pvt. Ltd., our mission, vision, values, and HRMS solutions for attendance, payroll, leave, employee management, recruitment, reporting, and HR automation.";

const overviewStrip = [
  { label: "HR Technology", icon: <Sparkles className="h-4 w-4" /> },
  { label: "Centralized HR Platform", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Attendance and Payroll", icon: <Clock3 className="h-4 w-4" /> },
  { label: "Employee Management", icon: <Users className="h-4 w-4" /> },
  { label: "Reports and Analytics", icon: <BarChart3 className="h-4 w-4" /> },
  { label: "Multi-Industry Support", icon: <Building2 className="h-4 w-4" /> },
];

const whoWeAreBullets = [
  "Managing attendance, payroll, leave, approvals, employee records, and reports through spreadsheets can become difficult to maintain as teams grow.",
  "Altroz HRMS helps organizations replace fragmented HR work with one centralized system that is easier to organize and scale.",
  "The platform is designed to support practical HR operations across offices, branches, and distributed teams, depending on enabled modules.",
];

const supportedOrganizations = [
  "Startups",
  "Small and medium-sized businesses",
  "Enterprises",
  "Manufacturing companies",
  "Corporate offices",
  "Healthcare organizations",
  "Educational institutions",
  "Retail businesses",
  "Construction companies",
  "Logistics and transport companies",
  "Hospitality businesses",
  "Facility management companies",
  "Multi-branch organizations",
];

const manualHr = [
  "Spreadsheets",
  "Registers",
  "Physical documents",
  "Email approvals",
  "Disconnected systems",
];

const digitalHr = [
  "Centralized employee records",
  "Structured workflows",
  "Attendance and payroll",
  "Digital approvals",
  "Reports and dashboards",
];

const storySteps = [
  {
    title: "Manual HR becomes difficult",
    description:
      "As teams and responsibilities grow, spreadsheets, registers, and repeated follow-ups become harder to manage.",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    title: "Centralized workforce management is needed",
    description:
      "Businesses need a single place for employee data, attendance, leave, approvals, payroll, and reports.",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "Altroz HRMS is created",
    description:
      "Altroz Technologies builds an HRMS focused on practical workflows, clarity, and easy day-to-day use.",
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    title: "Core HR moves into one platform",
    description:
      "Employee records, attendance, payroll, leave, recruitment, performance, assets, expenses, and exits become easier to organize.",
    icon: <Workflow className="h-4 w-4" />,
  },
  {
    title: "Workflows are continuously improved",
    description:
      "The platform keeps evolving through usability refinements, practical updates, and feedback from real HR needs.",
    icon: <RefreshCw className="h-4 w-4" />,
  },
];

const missionPanels = [
  {
    title: "Our Mission",
    icon: <Target className="h-5 w-5" />,
    tone: "from-primary-soft to-white",
    description:
      "Our mission is to simplify HR operations through reliable, practical, and easy-to-use HRMS solutions.",
    points: [
      "Reduce manual HR work",
      "Improve process accuracy",
      "Save administrative time",
      "Organize employee information",
      "Simplify payroll and attendance",
      "Improve approval workflows",
      "Improve employee experience",
      "Support better workforce decisions",
    ],
  },
  {
    title: "Our Vision",
    icon: <Sparkles className="h-5 w-5" />,
    tone: "from-[#f0f7ff] to-white",
    description:
      "Our vision is to become a trusted HRMS solution provider in India by delivering flexible, secure, scalable, and user-friendly HR technology.",
    points: [
      "Support organizations across industries",
      "Help teams modernize HR operations",
      "Adapt to growing workforce needs",
      "Improve employee experiences",
    ],
  },
  {
    title: "Our Purpose",
    icon: <Handshake className="h-5 w-5" />,
    tone: "from-[#ecfdf3] to-white",
    description:
      "Our purpose is to make workforce management simpler by replacing disconnected spreadsheets, manual registers, repeated data entry, and delayed approvals.",
    points: [
      "Bring HR work into one place",
      "Reduce repeated data entry",
      "Make approvals easier to follow",
      "Help teams work with more clarity",
    ],
  },
];

const coreValues = [
  {
    title: "Customer First",
    description:
      "We focus on understanding real business challenges and creating practical solutions that support daily HR operations.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Innovation",
    description:
      "We look for better ways to simplify attendance, payroll, leave, employee management, reporting, and approvals.",
    icon: <Lightbulb className="h-5 w-5" />,
  },
  {
    title: "Trust",
    description:
      "Successful business relationships are built through transparency, accountability, clear communication, and reliable service.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Simplicity",
    description: "Technology should make work easier, not more complicated.",
    icon: <CircleDot className="h-5 w-5" />,
  },
  {
    title: "Security",
    description:
      "Employee and business information should be handled responsibly through controlled access and centralized data management.",
    icon: <LockKeyhole className="h-5 w-5" />,
  },
  {
    title: "Continuous Improvement",
    description:
      "We refine the platform based on practical requirements, user feedback, and changing HR processes.",
    icon: <RefreshCw className="h-5 w-5" />,
  },
  {
    title: "Accountability",
    description: "We take ownership of our work, communication, and customer experience.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Collaboration",
    description:
      "We value communication between HR teams, managers, employees, and business leaders.",
    icon: <Handshake className="h-5 w-5" />,
  },
];

const differenceManual = [
  "Multiple spreadsheets",
  "Separate attendance records",
  "Manual payroll inputs",
  "Email-based approvals",
  "Disconnected employee documents",
  "Limited workforce visibility",
];

const differenceAltroz = [
  "Centralized employee information",
  "Attendance and shift management",
  "Payroll and leave workflows",
  "Structured approvals",
  "Employee self-service",
  "Reports and dashboards",
  "Role-based access",
  "Multi-branch support",
];

const lifecycleStages: LifecycleStage[] = [
  {
    id: "recruitment",
    title: "Recruitment",
    icon: <Search className="h-4 w-4" />,
    description:
      "Organize openings, candidate records, interviews, offers, and the first steps of hiring within one structured flow.",
    features: ["Job openings", "Candidate records", "Interview tracking", "Offer coordination"],
    focus: "Hiring starts with clarity and less manual follow-up.",
  },
  {
    id: "onboarding",
    title: "Onboarding",
    icon: <UserCog className="h-4 w-4" />,
    description:
      "Bring new employees into the platform with clear records, documents, and role-specific setup.",
    features: ["Joining documents", "Employee profiles", "Initial setup", "Structured handover"],
    focus: "Start employees with organized records from day one.",
  },
  {
    id: "employee-records",
    title: "Employee Records",
    icon: <IdCard className="h-4 w-4" />,
    description:
      "Maintain centralized employee profiles, department data, designation details, and employment history.",
    features: ["Profiles", "Departments", "Designations", "Document history"],
    focus: "One place for the employee record.",
  },
  {
    id: "attendance",
    title: "Attendance and Shifts",
    icon: <Fingerprint className="h-4 w-4" />,
    description:
      "Capture attendance through supported methods and keep shifts, late marks, overtime, and missing punches organized.",
    features: ["Attendance methods", "Shift rules", "Late marks", "Missing punches"],
    focus: "Track time with the right level of structure.",
  },
  {
    id: "leave",
    title: "Leave Management",
    icon: <CalendarDays className="h-4 w-4" />,
    description:
      "Manage leave balances, applications, policies, holidays, and approvals depending on enabled modules.",
    features: ["Leave balances", "Policies", "Holiday calendars", "Approvals"],
    focus: "Make leave requests and approvals easier to follow.",
  },
  {
    id: "payroll",
    title: "Payroll",
    icon: <Wallet className="h-4 w-4" />,
    description:
      "Use approved employee and attendance data to support salary processing, payslips, and payroll reporting.",
    features: ["Earnings", "Deductions", "Payslips", "Payroll reports"],
    focus: "Connect attendance and payroll more cleanly.",
  },
  {
    id: "performance",
    title: "Performance",
    icon: <BarChart3 className="h-4 w-4" />,
    description:
      "Support goals, reviews, ratings, feedback, and appraisal discussions through a structured flow.",
    features: ["Goals", "Reviews", "Ratings", "Appraisal history"],
    focus: "Review performance in a more structured way.",
  },
  {
    id: "assets",
    title: "Assets and Expenses",
    icon: <PackageCheck className="h-4 w-4" />,
    description:
      "Track company assets, allocations, returns, expense claims, and approval records where enabled.",
    features: ["Asset allocation", "Returns", "Claims", "Approvals"],
    focus: "Keep operational handoffs documented.",
  },
  {
    id: "reports",
    title: "Reports and Analytics",
    icon: <FileBarChart2 className="h-4 w-4" />,
    description:
      "Provide dashboards and reports for attendance, payroll, leave, recruitment, performance, and more.",
    features: ["Dashboards", "Branch summaries", "Department views", "Trend reporting"],
    focus: "Give management a clearer view of the workforce.",
  },
  {
    id: "exit",
    title: "Exit Management",
    icon: <DoorOpen className="h-4 w-4" />,
    description:
      "Manage resignations, notice periods, clearances, asset returns, exit interviews, and closing records.",
    features: ["Resignations", "Clearances", "Asset returns", "Exit records"],
    focus: "Close the employee lifecycle with less friction.",
  },
];

const capabilityGroups: {
  id: string;
  title: string;
  description: string;
  modules: Capability[];
}[] = [
  {
    id: "core-hr",
    title: "Core HR and Time",
    description:
      "The foundational modules that help teams organize employee data and daily workforce operations.",
    modules: [
      {
        title: "Employee Management",
        description:
          "Maintain centralized employee profiles, departments, designations, reporting structures, documents, and employment history.",
        icon: <Users className="h-5 w-5" />,
      },
      {
        title: "Attendance Management",
        description:
          "Manage check-ins, check-outs, working hours, shifts, late marks, missing punches, overtime, and regularization.",
        icon: <Fingerprint className="h-5 w-5" />,
      },
      {
        title: "Payroll Management",
        description:
          "Support salary processing, earnings, deductions, payslips, overtime, statutory records, and payroll reports.",
        icon: <Wallet className="h-5 w-5" />,
      },
      {
        title: "Leave Management",
        description:
          "Manage leave applications, balances, policies, holidays, approvals, and reports.",
        icon: <CalendarDays className="h-5 w-5" />,
      },
    ],
  },
  {
    id: "talent-ops",
    title: "Talent and Operations",
    description:
      "Modules that support hiring, performance, asset control, expenses, visitors, and exits.",
    modules: [
      {
        title: "Recruitment Management",
        description:
          "Organize job openings, candidates, interviews, feedback, offers, and onboarding.",
        icon: <Search className="h-5 w-5" />,
      },
      {
        title: "Performance Management",
        description: "Manage goals, reviews, ratings, appraisals, and feedback.",
        icon: <BarChart3 className="h-5 w-5" />,
      },
      {
        title: "Asset Management",
        description:
          "Track company assets, allocations, returns, transfers, maintenance, and history.",
        icon: <PackageCheck className="h-5 w-5" />,
      },
      {
        title: "Expense Management",
        description: "Manage expense claims, approvals, reimbursements, receipts, and reports.",
        icon: <BadgeCheck className="h-5 w-5" />,
      },
      {
        title: "Visitor Management",
        description: "Maintain visitor records, check-ins, check-outs, hosts, and visitor history.",
        icon: <MessageSquare className="h-5 w-5" />,
      },
      {
        title: "Exit Management",
        description:
          "Manage resignations, notice periods, clearances, asset returns, interviews, and exit records.",
        icon: <DoorOpen className="h-5 w-5" />,
      },
    ],
  },
  {
    id: "insights-access",
    title: "Insights and Self-Service",
    description:
      "Modules that help people view the right information and keep decisions grounded in organized data.",
    modules: [
      {
        title: "HR Analytics and Reports",
        description:
          "View available workforce dashboards, reports, trends, and department or branch summaries.",
        icon: <FileBarChart2 className="h-5 w-5" />,
      },
      {
        title: "Employee Self-Service",
        description:
          "Allow employees to access relevant attendance, leave, payslips, profile information, documents, and request status.",
        icon: <Smartphone className="h-5 w-5" />,
      },
      {
        title: "Security and Access Control",
        description:
          "Use role-based access, controlled permissions, and user activation or deactivation where configured.",
        icon: <ShieldCheck className="h-5 w-5" />,
      },
      {
        title: "Reports by Module",
        description:
          "Surface employee, attendance, payroll, leave, recruitment, performance, asset, expense, visitor, and exit reporting where enabled.",
        icon: <BarChart3 className="h-5 w-5" />,
      },
    ],
  },
];

const attendanceMethods = [
  {
    id: "biometric",
    title: "Biometric",
    icon: <Fingerprint className="h-4 w-4" />,
    description:
      "Connect supported biometric devices to automatically capture check-in and check-out records.",
  },
  {
    id: "gps",
    title: "GPS",
    icon: <MapPin className="h-4 w-4" />,
    description: "Use GPS-aware attendance for approved field or distributed work patterns.",
  },
  {
    id: "geolocation",
    title: "Geolocation",
    icon: <Globe2 className="h-4 w-4" />,
    description: "Capture attendance with location-aware checks when that workflow is enabled.",
  },
  {
    id: "geofencing",
    title: "Geofencing",
    icon: <ShieldCheck className="h-4 w-4" />,
    description: "Allow attendance only within approved geographic boundaries.",
  },
  {
    id: "qr",
    title: "QR Code",
    icon: <QrCode className="h-4 w-4" />,
    description: "Allow employees to mark attendance by scanning an approved QR code.",
  },
  {
    id: "mobile",
    title: "Mobile",
    icon: <Smartphone className="h-4 w-4" />,
    description: "Support attendance from mobile workflows depending on the configured deployment.",
  },
];

const attendanceControls = [
  "Shift-based attendance",
  "Attendance regularization",
  "Overtime tracking",
  "Missing punch management",
  "Late mark management",
];

const audienceGroups = [
  {
    id: "startups",
    title: "Startups",
    icon: <Rocket className="h-4 w-4" />,
    description:
      "A practical way to bring structure to attendance, employee records, and approvals as the team grows.",
  },
  {
    id: "smes",
    title: "SMEs",
    icon: <Users className="h-4 w-4" />,
    description:
      "Useful for businesses that need better visibility across departments, payroll, and daily HR work.",
  },
  {
    id: "enterprises",
    title: "Enterprises",
    icon: <Building2 className="h-4 w-4" />,
    description:
      "Helpful for larger teams that need organized access, reporting, and more structured HR workflows.",
  },
  {
    id: "multi-branch",
    title: "Multi-branch organizations",
    icon: <Workflow className="h-4 w-4" />,
    description:
      "Designed to help centralize employee information, attendance, and reporting across locations.",
  },
];

const industries: Industry[] = [
  {
    id: "manufacturing",
    title: "Manufacturing",
    icon: <Factory className="h-4 w-4" />,
    useCase: "Shifts, biometric attendance, overtime, payroll, and department reporting.",
    details: [
      "Shift-oriented attendance can help plant and factory teams stay organized.",
      "Payroll and overtime inputs can be reviewed from the same HR record set.",
      "Branch or department summaries can support day-to-day supervision.",
    ],
  },
  {
    id: "it",
    title: "IT and Software",
    icon: <Code2 className="h-4 w-4" />,
    useCase: "Remote attendance, leave, employee self-service, performance, and reports.",
    details: [
      "Distributed teams can use the same system for attendance and leave workflows.",
      "Employee self-service can reduce repetitive HR follow-ups.",
      "Performance and reporting views can help managers stay organized.",
    ],
  },
  {
    id: "healthcare",
    title: "Healthcare",
    icon: <Stethoscope className="h-4 w-4" />,
    useCase: "Round-the-clock shifts, department staffing, attendance, leave, and payroll.",
    details: [
      "Shift planning and attendance can support time-sensitive staffing needs.",
      "Department-wise visibility can help with workforce planning.",
      "Payroll inputs can stay connected to approved attendance data.",
    ],
  },
  {
    id: "education",
    title: "Education",
    icon: <GraduationCap className="h-4 w-4" />,
    useCase: "Staff attendance, leave approvals, payroll, reports, and employee records.",
    details: [
      "Faculty and staff records can stay centralized and easier to manage.",
      "Leave approvals and attendance views can support administrative teams.",
      "Reports can help leadership keep a closer view of the workforce.",
    ],
  },
  {
    id: "retail",
    title: "Retail",
    icon: <ShoppingCart className="h-4 w-4" />,
    useCase: "Store-wise attendance, branch management, shifts, employee records, and payroll.",
    details: [
      "Branch-level teams can work with clearer attendance and shift structures.",
      "Payroll and employee records can remain organized across stores.",
      "Role-based access can help keep store and head-office views separated.",
    ],
  },
  {
    id: "construction",
    title: "Construction",
    icon: <Construction className="h-4 w-4" />,
    useCase: "Site attendance, approvals, overtime, payroll, and workforce tracking.",
    details: [
      "Site-based teams can use supported attendance methods and shift structures.",
      "Overtime and approval workflows can keep project work more organized.",
      "Reports can help teams review workforce movement across sites.",
    ],
  },
  {
    id: "logistics",
    title: "Logistics",
    icon: <Truck className="h-4 w-4" />,
    useCase: "Multi-location teams, attendance, leave, payroll, and reporting.",
    details: [
      "Centralized records can help coordinate teams that move across locations.",
      "Attendance and payroll can stay linked to the same employee data.",
      "Reports can help operations teams see workforce patterns more clearly.",
    ],
  },
  {
    id: "hospitality",
    title: "Hospitality",
    icon: <Hotel className="h-4 w-4" />,
    useCase: "Shift coordination, attendance, leave, employee records, and payroll.",
    details: [
      "Shift-based work can be managed through structured attendance workflows.",
      "Leave planning can be easier when balances and approvals are centralized.",
      "Employee records and reporting can stay accessible to the right users.",
    ],
  },
  {
    id: "facility",
    title: "Facility Management",
    icon: <Building2 className="h-4 w-4" />,
    useCase: "Distributed staff, attendance, leave, payroll, and branch visibility.",
    details: [
      "Teams spread across sites can work from a more consistent process.",
      "Attendance and approvals can be managed in a more organized way.",
      "Branch summaries can help supervisors review operations at a glance.",
    ],
  },
];

const approachSteps = [
  {
    title: "Understand the Business",
    description:
      "Understand workforce structure, HR processes, departments, branches, shifts, policies, and reporting requirements.",
    icon: <Search className="h-4 w-4" />,
  },
  {
    title: "Configure Relevant Modules",
    description:
      "Use the modules and workflows required for the organization based on its current setup.",
    icon: <Workflow className="h-4 w-4" />,
  },
  {
    title: "Organize Employee Data",
    description:
      "Bring employee records, documents, and organizational structures into one centralized system.",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Simplify Daily HR Work",
    description:
      "Manage attendance, payroll, leave, approvals, reports, and employee requests through structured workflows.",
    icon: <CalendarDays className="h-4 w-4" />,
  },
  {
    title: "Support Employees and Managers",
    description: "Provide suitable access based on configured roles and responsibilities.",
    icon: <Handshake className="h-4 w-4" />,
  },
  {
    title: "Improve Through Feedback",
    description:
      "Use practical customer feedback to identify opportunities for product and workflow improvements.",
    icon: <RefreshCw className="h-4 w-4" />,
  },
];

const employeeExperiencePoints = [
  "View attendance records",
  "Apply for leave",
  "Check leave balances",
  "Download payslips",
  "View personal information",
  "Submit attendance corrections",
  "Track request status",
  "Access documents",
  "Receive HR notifications",
  "Use available self-service features",
];

const choiceBenefits = [
  "Centralized employee information",
  "Attendance and shift management",
  "Payroll processing",
  "Leave management",
  "Employee self-service",
  "Recruitment workflows",
  "Performance management",
  "Asset and expense management",
  "HR reports and analytics",
  "Branch-wise and department-wise visibility",
  "Configurable roles and permissions",
  "Cloud-based access",
  "Mobile-friendly access",
  "Practical approval workflows",
  "Scalable HR operations",
  "Multi-industry support",
];

const commitmentPoints = [
  "Understanding business requirements",
  "Supporting product configuration",
  "Helping organizations adopt structured HR processes",
  "Providing practical assistance",
  "Improving through customer feedback",
  "Maintaining transparent communication",
  "Building long-term relationships",
  "Developing features that solve real HR challenges",
];

const securityPoints = [
  "Role-based access",
  "Controlled user permissions",
  "Centralized employee data",
  "Payroll access control",
  "Document access control",
  "Secure report access",
  "User activation and deactivation",
];

const faqItems = [
  {
    q: "What Is Altroz Technologies Pvt. Ltd.?",
    a: "Altroz Technologies Pvt. Ltd. is an HR technology company that develops HRMS solutions to help organizations manage employee records, attendance, payroll, leave, recruitment, performance, reports, and other HR activities.",
  },
  {
    q: "What Is Altroz HRMS?",
    a: "Altroz HRMS is a centralized human resource management platform designed to help businesses organize and streamline daily HR operations.",
  },
  {
    q: "Which Businesses Can Use Altroz HRMS?",
    a: "Altroz HRMS can support startups, SMEs, enterprises, manufacturing companies, IT businesses, healthcare organizations, educational institutions, retail companies, construction businesses, logistics companies, hospitality businesses, facility management companies, and multi-branch organizations.",
  },
  {
    q: "Which HR Processes Can Altroz HRMS Manage?",
    a: "Depending on enabled modules, Altroz HRMS can help manage employee records, attendance, shifts, payroll, leave, recruitment, performance, assets, expenses, visitors, exits, reports, compliance records, and employee self-service.",
  },
  {
    q: "Is Altroz HRMS Suitable for Small Businesses?",
    a: "Yes. Altroz HRMS can help small and growing organizations replace manual processes with structured HR workflows and centralized records.",
  },
  {
    q: "Can Altroz HRMS Support Multiple Branches?",
    a: "Altroz HRMS can help organizations centralize employee information, attendance, leave, payroll, and reports across multiple business locations.",
  },
  {
    q: "Does Altroz HRMS Support Employee Self-Service?",
    a: "Available self-service capabilities can allow employees to access relevant attendance, leave, payslip, profile, document, and request information.",
  },
  {
    q: "Does Altroz HRMS Provide Customer Support?",
    a: "Altroz Technologies aims to provide practical support for product usage, configuration, and HRMS adoption according to the available support plan.",
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

function Reveal({ children, className = "", delay = 0 }: RevealProps) {
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
  }, [reduceMotion, ref]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
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
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "")}>
      <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">{eyebrow}</div>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      <p className="mt-3 text-ink-soft">{description}</p>
    </div>
  );
}

function HeroVisual() {
  const floatingCards = [
    "Centralized HR",
    "Faster Approvals",
    "Better Workforce Visibility",
    "Employee Self-Service",
  ];

  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="pointer-events-none absolute -inset-8 rounded-[2.5rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-white p-5 shadow-float">
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="h-fit self-start rounded-[1.75rem] border border-border bg-surface p-3 sm:p-4">
            <div className="flex items-center justify-between gap-3">
              <BrandMark className="scale-[0.8] origin-left sm:scale-[0.88]" />
              <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-semibold text-primary sm:px-3 sm:text-xs">
                Altroz HRMS
              </span>
            </div>

            <div className="mt-3 h-[180px] overflow-hidden rounded-[1.5rem] border border-white bg-white shadow-card sm:mt-4 sm:h-[220px]">
              <img
                src={modelScreenshots.attendanceDashboard}
                alt="Altroz HRMS attendance dashboard preview"
                className="block h-full w-full object-contain bg-white p-2"
                loading="eager"
              />
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2 sm:mt-4 sm:grid-cols-2">
              {floatingCards.map((item, index) => (
                <div
                  key={item}
                  className={cn(
                    "rounded-2xl border border-border bg-white px-3 py-2 text-center text-xs font-medium leading-4 text-ink shadow-sm sm:text-sm sm:leading-5",
                    index % 2 === 0 ? "translate-y-0" : "sm:translate-y-1",
                  )}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-fit self-start overflow-hidden rounded-[1.75rem] border border-border bg-[radial-gradient(circle_at_top,_rgba(11,92,255,0.12),_transparent_55%),linear-gradient(180deg,_#f8fbff_0%,_#eef5ff_100%)] p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Central platform
            </div>
            <div className="mt-2 text-2xl font-bold text-ink">Connected HR modules</div>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              Employee management, attendance, payroll, leave, recruitment, performance, reports,
              and employee self-service can work from one organized platform depending on enabled
              modules.
            </p>

            <div className="mt-4 rounded-[1.5rem] border border-white/70 bg-white p-3.5 shadow-card">
              <div className="grid place-items-center rounded-[1.25rem] border border-primary/15 bg-primary-soft/35 p-4">
                <LayoutDashboard className="h-8 w-8 text-primary" />
                <div className="mt-2 text-sm font-semibold text-ink">Altroz HRMS</div>
                <div className="text-xs text-ink-soft">Centralized workforce hub</div>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-2">
                {[
                  "Employee Management",
                  "Attendance",
                  "Payroll",
                  "Leave",
                  "Recruitment",
                  "Performance",
                  "Reports",
                  "Employee Self-Service",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-border bg-surface px-3 py-1.5 text-center text-[11px] font-semibold leading-4 text-ink sm:text-xs"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 grid gap-2 sm:mt-4 sm:grid-cols-2">
              {[
                "Centralized HR",
                "Faster Approvals",
                "Better Visibility",
                "Multi-Branch Support",
              ].map((item, index) => (
                <div
                  key={item}
                  className={cn(
                    "rounded-2xl border border-border bg-white px-3 py-2 text-center text-xs font-semibold leading-4 text-ink shadow-sm sm:text-sm sm:leading-5",
                    index === 0 || index === 3 ? "bg-primary-soft/35" : "",
                  )}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutUsPage() {
  usePageMeta(pageTitle, pageDescription, "/about-us");

  const [selectedStageId, setSelectedStageId] = useState(lifecycleStages[0].id);
  const [selectedMethodId, setSelectedMethodId] = useState(attendanceMethods[0].id);
  const [selectedAudienceId, setSelectedAudienceId] = useState(audienceGroups[0].id);
  const [selectedIndustryId, setSelectedIndustryId] = useState(industries[0].id);

  const selectedStage =
    lifecycleStages.find((stage) => stage.id === selectedStageId) ?? lifecycleStages[0];
  const selectedMethod =
    attendanceMethods.find((method) => method.id === selectedMethodId) ?? attendanceMethods[0];
  const selectedAudience =
    audienceGroups.find((audience) => audience.id === selectedAudienceId) ?? audienceGroups[0];
  const selectedIndustry =
    industries.find((industry) => industry.id === selectedIndustryId) ?? industries[0];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <TopNavbar />
      <MainNavbar />

      <main className="overflow-x-hidden">
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-primary/12 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/12 blur-3xl" />
          <div className="container-x grid gap-10 py-12 lg:grid-cols-12 lg:items-start lg:py-14">
            <Reveal className="lg:col-span-6 lg:pt-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Empowering Businesses with Smart HR Technology
              </span>
              <h1 className="mt-4 max-w-xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Simplifying HR Management for Modern Businesses
              </h1>
              <p className="mt-4 max-w-lg text-base leading-7 text-ink-soft">
                At Altroz Technologies Pvt. Ltd., we believe HR management should be simple,
                efficient, accurate, and technology-driven.
              </p>
              <p className="mt-4 max-w-lg text-base leading-7 text-ink-soft">
                Our mission is to help businesses streamline attendance, payroll, leave management,
                employee records, recruitment, performance, reporting, compliance records, and other
                HR operations through one centralized HRMS platform.
              </p>
              <p className="mt-4 max-w-lg text-base leading-7 text-ink-soft">
                Altroz HRMS is designed to reduce repetitive manual work, improve workforce
                visibility, simplify daily HR activities, and help organizations manage employees
                more effectively.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/company/book-demo" className="btn-primary">
                  Book Free Demo
                </a>
                <a href="/company/contact-us" className="btn-outline">
                  Contact Our Team
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Cloud-based HRMS", "Role-based access", "Multi-branch support"].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-xs font-medium text-ink shadow-sm"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal className="lg:col-span-6" delay={120}>
              <HeroVisual />
            </Reveal>
          </div>
        </section>

        <section className="border-y border-border bg-white py-8 sm:py-10">
          <div className="container-x">
            <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
              {overviewStrip.map((item, index) => (
                <Reveal key={item.label} delay={index * 50}>
                  <div className="soft-card flex items-center gap-3 p-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                      {item.icon}
                    </div>
                    <div className="text-sm font-semibold text-ink">{item.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <Reveal className="lg:col-span-6">
              <SectionHeading
                eyebrow="Who We Are"
                title="An HR technology company focused on practical everyday workflows"
                description="Altroz Technologies Pvt. Ltd. is focused on helping organizations simplify and digitize their HR operations with a centralized platform that feels easier to use and easier to manage."
              />

              <div className="mt-6 space-y-3">
                {whoWeAreBullets.map((item, index) => (
                  <div key={item} className="soft-card flex gap-3 p-4">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-6 text-ink">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[1.75rem] border border-border bg-surface p-5 shadow-card">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Organizations the platform can support
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {supportedOrganizations.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-white px-3 py-2 text-sm font-medium text-ink shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-6" delay={120}>
              <div className="grid gap-5 lg:grid-cols-[1fr_auto_1fr]">
                <div className="soft-card p-5">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Manual HR
                  </div>
                  <div className="mt-4 space-y-2">
                    {manualHr.map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl bg-surface p-3">
                        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-ink-soft" />
                        <span className="text-sm text-ink">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hidden items-center justify-center lg:flex">
                  <div className="grid h-14 w-14 place-items-center rounded-full border border-primary/15 bg-white shadow-card">
                    <ArrowRight className="h-5 w-5 text-primary" />
                  </div>
                </div>

                <div className="soft-card p-5">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Altroz HRMS
                  </div>
                  <div className="mt-4 space-y-2">
                    {digitalHr.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl bg-primary-soft/35 p-3"
                      >
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-sm text-ink">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Our Story"
              title="A product built for the realities of growing businesses"
              description="Altroz HRMS was created with a clear purpose: to help organizations manage workforce information and HR workflows more efficiently through practical software."
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {storySteps.map((step, index) => (
                <Reveal key={step.title} delay={index * 45}>
                  <div className="soft-card h-full p-5">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                        {index + 1}
                      </div>
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-primary shadow-sm">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Mission, Vision, Purpose"
              title="Three connected ideas that guide the company"
              description="The company story stays grounded in practical HR outcomes, not broad promises that are hard to verify."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {missionPanels.map((panel, index) => (
                <Reveal key={panel.title} delay={index * 60}>
                  <article
                    className={cn(
                      "rounded-[1.75rem] border border-border bg-gradient-to-b p-6 shadow-card",
                      panel.tone,
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                        {panel.icon}
                      </div>
                      <div className="rounded-full border border-primary/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        {panel.title}
                      </div>
                    </div>
                    <p className="mt-5 text-sm leading-6 text-ink-soft">{panel.description}</p>
                    <div className="mt-5 space-y-2">
                      {panel.points.map((point) => (
                        <div
                          key={point}
                          className="flex items-start gap-3 rounded-2xl bg-white/80 p-3"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                          <span className="text-sm text-ink">{point}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Our Core Values"
              title="A practical value system that shapes how the company builds"
              description="These values help keep the product centered on real problems, clear communication, and useful software."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {coreValues.map((value, index) => (
                <Reveal key={value.title} delay={index * 35}>
                  <article
                    className={cn(
                      "soft-card h-full p-5 transition-transform duration-300 hover:-translate-y-1",
                      index === 0 ? "xl:col-span-2 xl:row-span-2" : "",
                    )}
                  >
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                      {value.icon}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{value.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{value.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="What Makes Altroz HRMS Different?"
              title="A simpler structure for teams that need everyday HR software"
              description="Many HR systems are either too complex for daily use or too limited for growing organizations. Altroz HRMS aims to balance both."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_auto_1fr]">
              <Reveal>
                <div className="soft-card h-full p-6">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Fragmented HR Management
                  </div>
                  <div className="mt-4 space-y-2">
                    {differenceManual.map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl bg-surface p-3">
                        <CircleDot className="mt-0.5 h-4 w-4 shrink-0 text-ink-soft" />
                        <span className="text-sm text-ink">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <div className="hidden items-center justify-center lg:flex">
                <div className="grid place-items-center">
                  <div className="rounded-full border border-border bg-white p-4 shadow-card">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    Transition
                  </div>
                </div>
              </div>

              <Reveal delay={100}>
                <div className="soft-card h-full p-6">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Altroz HRMS
                  </div>
                  <div className="mt-4 space-y-2">
                    {differenceAltroz.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl bg-primary-soft/35 p-3"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-sm text-ink">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Centralized HR Platform"
                title="Manage the complete employee lifecycle from one platform"
                description="Choose a stage below to see how Altroz HRMS can support the workflow at that point in the employee lifecycle."
              />

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {lifecycleStages.map((stage) => (
                  <button
                    key={stage.id}
                    type="button"
                    aria-pressed={selectedStageId === stage.id}
                    onClick={() => setSelectedStageId(stage.id)}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                      selectedStageId === stage.id
                        ? "border-primary bg-primary-soft text-primary"
                        : "border-border bg-white text-ink hover:bg-surface hover:text-primary",
                    )}
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-primary shadow-sm">
                        {stage.icon}
                      </span>
                      <span>{stage.title}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 opacity-60" />
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[2rem] border border-border bg-white p-5 shadow-float">
                <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="rounded-[1.5rem] border border-border bg-surface p-5">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                      Selected stage
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                        {selectedStage.icon}
                      </div>
                      <div>
                        <div className="text-xl font-bold text-ink">{selectedStage.title}</div>
                        <div className="text-sm text-ink-soft">{selectedStage.focus}</div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-ink-soft">
                      {selectedStage.description}
                    </p>

                    <div className="mt-5 grid gap-2">
                      {selectedStage.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-start gap-3 rounded-2xl bg-white p-3"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                          <span className="text-sm text-ink">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-[radial-gradient(circle_at_top,_rgba(11,92,255,0.12),_transparent_50%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_100%)] p-5">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                      Lifecycle visual
                    </div>
                    <div className="mt-3 grid place-items-center rounded-[1.5rem] border border-white bg-white p-5 shadow-card">
                      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
                        {selectedStage.icon}
                      </div>
                      <div className="mt-3 text-center">
                        <div className="text-lg font-bold text-ink">{selectedStage.title}</div>
                        <p className="mt-2 text-sm leading-6 text-ink-soft">
                          {selectedStage.focus}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedStage.features.map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full border border-border bg-white px-3 py-2 text-xs font-medium text-ink shadow-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-2">
                      {[
                        "Recruitment",
                        "Onboarding",
                        "Records",
                        "Attendance",
                        "Leave",
                        "Payroll",
                        "Performance",
                        "Exit",
                      ].map((item) => (
                        <div
                          key={item}
                          className="rounded-xl border border-border bg-white px-3 py-2 text-xs font-semibold text-ink"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="HRMS Capabilities"
              title="HRMS capabilities built for daily HR operations"
              description="The platform supports the main modules that appear throughout the existing repository, grouped into a few easy-to-scan categories."
            />

            <Tabs defaultValue={capabilityGroups[0].id} className="mt-8 space-y-6">
              <TabsList className="flex w-full gap-2 overflow-x-auto rounded-[1.25rem] bg-white p-2 shadow-card">
                {capabilityGroups.map((group) => (
                  <TabsTrigger
                    key={group.id}
                    value={group.id}
                    className="min-w-max rounded-full px-4 py-2 text-sm font-semibold text-ink data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    {group.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {capabilityGroups.map((group) => (
                <TabsContent key={group.id} value={group.id}>
                  <div className="grid gap-6 rounded-[2rem] border border-border bg-white p-5 shadow-float lg:grid-cols-[0.95fr_1.05fr]">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        {group.title}
                      </div>
                      <h3 className="mt-3 text-2xl font-bold text-ink">{group.description}</h3>
                      <div className="mt-4 rounded-2xl bg-surface p-4 text-sm leading-6 text-ink-soft">
                        Each module can be shown or configured depending on the product setup and
                        enabled features.
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {group.modules.map((module, index) => (
                        <div
                          key={module.title}
                          className="soft-card p-4 transition-transform duration-300 hover:-translate-y-1"
                          style={{ transitionDelay: `${index * 30}ms` }}
                        >
                          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                            {module.icon}
                          </div>
                          <h4 className="mt-4 text-lg font-bold text-ink">{module.title}</h4>
                          <p className="mt-2 text-sm leading-6 text-ink-soft">
                            {module.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Attendance Capabilities"
                title="Flexible attendance for different workforce models"
                description="Only the methods already shown in the repository are included here. Select a method to see a short explanation."
              />

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {attendanceMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    aria-pressed={selectedMethodId === method.id}
                    onClick={() => setSelectedMethodId(method.id)}
                    className={cn(
                      "rounded-2xl border px-4 py-3 text-left shadow-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                      selectedMethodId === method.id
                        ? "border-primary bg-primary-soft"
                        : "border-border bg-white hover:bg-surface",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-xl bg-white text-primary shadow-sm">
                        {method.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-ink">{method.title}</div>
                        <div className="mt-1 text-xs leading-5 text-ink-soft">
                          {method.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Related attendance controls
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {attendanceControls.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-surface px-3 py-2 text-sm font-medium text-ink"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-[2rem] border border-border bg-white p-5 shadow-float">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                      Selected method
                    </div>
                    <div className="mt-2 text-2xl font-bold text-ink">{selectedMethod.title}</div>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">
                      {selectedMethod.description}
                    </p>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                    {selectedMethod.icon}
                  </div>
                </div>

                <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-border bg-surface p-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Biometric devices",
                      "GPS-aware workflows",
                      "Geolocation checks",
                      "Geofencing boundaries",
                      "QR code scans",
                      "Mobile attendance",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                        <span className="text-sm text-ink">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-[1.5rem] border border-primary/10 bg-primary-soft/35 p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Operational support
                  </div>
                  <div className="mt-2 text-sm leading-6 text-ink-soft">
                    Shift-based attendance, attendance regularization, overtime tracking, missing
                    punch management, and late mark management can help keep attendance records
                    payroll-ready.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Who We Help"
                title="HRMS solutions for growing businesses and industries"
                description="The platform is designed to help a wide range of organizations depending on their structure, pace of growth, and enabled modules."
              />

              <div className="mt-6 grid gap-3">
                {audienceGroups.map((audience) => (
                  <button
                    key={audience.id}
                    type="button"
                    aria-pressed={selectedAudienceId === audience.id}
                    onClick={() => setSelectedAudienceId(audience.id)}
                    className={cn(
                      "rounded-2xl border px-4 py-4 text-left shadow-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                      selectedAudienceId === audience.id
                        ? "border-primary bg-primary-soft"
                        : "border-border bg-white hover:bg-surface",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-sm">
                        {audience.icon}
                      </div>
                      <div>
                        <div className="text-base font-bold text-ink">{audience.title}</div>
                        <p className="mt-2 text-sm leading-6 text-ink-soft">
                          {audience.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[2rem] border border-border bg-white p-5 shadow-float">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Audience focus
                </div>
                <div className="mt-2 text-2xl font-bold text-ink">{selectedAudience.title}</div>
                <p className="mt-2 text-sm leading-6 text-ink-soft">
                  {selectedAudience.description}
                </p>

                <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                  {["Startups", "SMEs", "Enterprises", "Multi-branch organizations"].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl bg-surface p-3 text-sm font-semibold text-ink"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-border pt-6">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Industry use cases
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {industries.map((industry) => (
                      <button
                        key={industry.id}
                        type="button"
                        onClick={() => setSelectedIndustryId(industry.id)}
                        aria-pressed={selectedIndustryId === industry.id}
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                          selectedIndustryId === industry.id
                            ? "border-primary bg-primary text-white"
                            : "border-border bg-surface text-ink hover:bg-white hover:text-primary",
                        )}
                      >
                        {industry.icon}
                        {industry.title}
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                    <div className="rounded-[1.5rem] border border-border bg-surface p-5">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-primary shadow-sm">
                          {selectedIndustry.icon}
                        </div>
                        <div>
                          <div className="text-lg font-bold text-ink">{selectedIndustry.title}</div>
                          <div className="text-sm text-ink-soft">{selectedIndustry.useCase}</div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[1.5rem] border border-border bg-white p-5 shadow-card">
                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        Relevant use cases
                      </div>
                      <div className="mt-4 space-y-2">
                        {selectedIndustry.details.map((item) => (
                          <div
                            key={item}
                            className="flex items-start gap-3 rounded-2xl bg-surface p-3"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                            <span className="text-sm leading-6 text-ink">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Our Approach"
              title="How we approach HR digital transformation"
              description="A connected process keeps the page grounded in how the product is used rather than in abstract brand language."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
              {approachSteps.map((step, index) => (
                <Reveal key={step.title} delay={index * 45}>
                  <div className="soft-card h-full p-5">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                        {index + 1}
                      </div>
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-primary shadow-sm">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="mt-4 text-base font-bold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Employee Experience"
                title="Building better employee experiences"
                description="HR technology should reduce administrative work and also make everyday employee interactions more straightforward."
              />

              <div className="mt-6 space-y-3">
                {employeeExperiencePoints.map((item) => (
                  <div key={item} className="soft-card flex items-start gap-3 p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span className="text-sm leading-6 text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-md">
                <div className="pointer-events-none absolute -inset-5 rounded-[2rem] bg-gradient-to-tr from-primary/12 via-transparent to-success/12 blur-3xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-4 shadow-float">
                  <div className="mx-auto flex w-full max-w-[18rem] flex-col overflow-hidden rounded-[2.4rem] border border-border bg-[linear-gradient(180deg,_#0f172a_0%,_#111827_100%)] p-3 shadow-[0_24px_50px_rgba(15,23,42,0.18)]">
                    <div className="mx-auto mb-3 h-1.5 w-20 rounded-full bg-white/20" />
                    <div className="rounded-[1.8rem] bg-white p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                            Employee Self-Service
                          </div>
                          <div className="mt-1 text-lg font-bold text-ink">My HR overview</div>
                        </div>
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary">
                          <Smartphone className="h-4 w-4" />
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3">
                        <div className="rounded-2xl bg-surface p-3">
                          <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                            Attendance card
                          </div>
                          <div className="mt-2 flex items-center justify-between text-sm text-ink">
                            <span>Present this week</span>
                            <span className="font-semibold">04 / 05</span>
                          </div>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-2xl bg-primary-soft/35 p-3">
                            <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                              Leave balance
                            </div>
                            <div className="mt-2 text-lg font-bold text-ink">8 days</div>
                          </div>
                          <div className="rounded-2xl bg-surface p-3">
                            <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                              Payslip shortcut
                            </div>
                            <div className="mt-2 text-sm font-semibold text-ink">
                              Open latest payslip
                            </div>
                          </div>
                        </div>
                        <div className="rounded-2xl bg-surface p-3">
                          <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                            Request status
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-sm text-ink">Leave request</span>
                            <span className="rounded-full bg-[#ecfdf3] px-3 py-1 text-xs font-semibold text-success">
                              Approved
                            </span>
                          </div>
                        </div>
                        <div className="rounded-2xl border border-border bg-white p-3 shadow-sm">
                          <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                            Notification panel
                          </div>
                          <div className="mt-2 text-sm leading-6 text-ink-soft">
                            Your attendance correction was reviewed and approved by HR.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Why Businesses Choose Altroz HRMS"
              title="A benefit layout that puts the most important item first"
              description="This section stays focused on practical HR capabilities and avoids unsupported trust claims or fake statistics."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-12 lg:items-start">
              <div className="rounded-[2rem] border border-border bg-white p-6 shadow-float lg:col-span-7">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Featured benefit
                </div>
                <h3 className="mt-3 text-2xl font-bold text-ink">
                  Centralized employee information with clearer day-to-day visibility
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  Altroz HRMS is designed to help businesses keep employee records, attendance,
                  payroll, leave, and related HR information in one place so teams can work with
                  more clarity.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {choiceBenefits.slice(0, 4).map((item) => (
                    <div key={item} className="rounded-2xl bg-primary-soft/35 p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span className="text-sm font-medium text-ink">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5">
                {choiceBenefits.slice(4).map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.5rem] border border-border bg-white p-5 shadow-card transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                        <BadgeCheck className="h-4 w-4" />
                      </div>
                      <div className="text-sm font-semibold text-ink">{item}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Commitment to Customers"
                title="A relationship built around practical support"
                description="Altroz Technologies aims to support businesses throughout their HR digital-transformation journey."
              />

              <div className="mt-6 space-y-3">
                {commitmentPoints.map((item) => (
                  <div key={item} className="soft-card flex items-start gap-3 p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span className="text-sm leading-6 text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-[2rem] border border-border bg-white p-6 shadow-float">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Relationship timeline
                </div>
                <div className="mt-4 grid gap-3">
                  {[
                    "Understand the business need",
                    "Configure the required modules",
                    "Support adoption and usage",
                    "Listen to feedback and improve",
                  ].map((item, index) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-surface p-4">
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-primary shadow-sm">
                        {index + 1}
                      </div>
                      <span className="text-sm leading-6 text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Responsible Data Management"
                title="Security and responsible HR data management"
                description="Only verified security-related areas are described here, with careful language about what the platform is designed to help with."
              />

              <div className="mt-6 space-y-3">
                {securityPoints.map((item) => (
                  <div key={item} className="soft-card flex items-start gap-3 p-4">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span className="text-sm leading-6 text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-5 md:grid-cols-2">
                {[
                  {
                    title: "Role-based access",
                    desc: "Access can be assigned according to role and responsibility.",
                    icon: <UserCog className="h-5 w-5" />,
                  },
                  {
                    title: "Controlled permissions",
                    desc: "Sensitive records should only be visible to authorized users.",
                    icon: <LockKeyhole className="h-5 w-5" />,
                  },
                  {
                    title: "Centralized records",
                    desc: "Employee data can stay organized in one digital system.",
                    icon: <LayoutDashboard className="h-5 w-5" />,
                  },
                  {
                    title: "Payroll and report access control",
                    desc: "Payroll and reports can be restricted to approved users.",
                    icon: <FileBarChart2 className="h-5 w-5" />,
                  },
                ].map((card, index) => (
                  <Reveal key={card.title} delay={index * 45}>
                    <article className="soft-card h-full p-5">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                        {card.icon}
                      </div>
                      <h3 className="mt-4 text-lg font-bold text-ink">{card.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{card.desc}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="Frequently Asked Questions"
              description="The accordion stays accessible and keeps common company questions easy to scan."
              align="center"
            />

            <div className="mt-8">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item) => (
                  <AccordionItem
                    key={item.q}
                    value={item.q}
                    className="overflow-hidden rounded-2xl border border-border bg-white px-5 shadow-card"
                  >
                    <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink no-underline hover:no-underline [&>svg]:text-primary">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-sm leading-7 text-ink-soft">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-20">
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
