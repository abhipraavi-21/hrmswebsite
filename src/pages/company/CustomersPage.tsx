"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Construction,
  Factory,
  FileBarChart2,
  GraduationCap,
  Hotel,
  LayoutDashboard,
  Rocket,
  ShoppingCart,
  Sparkles,
  Stethoscope,
  Truck,
  UserCog,
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
import { cn } from "@/lib/utils";
import { modelScreenshots } from "@/lib/modelScreenshots";

type IconBullet = {
  label: string;
  value: string;
};

type SelectOption = {
  id: string;
  label: string;
  title: string;
  summary: string;
  bullets: string[];
  note: string;
  icon: ReactNode;
  visualImage: string;
  visualAlt: string;
  visualLabel: string;
  visualStats: IconBullet[];
  modules?: string[];
  benefits?: string[];
};

type StorySection = {
  eyebrow: string;
  title: string;
  description: string;
  challengeTitle: string;
  challengeBullets: string[];
  solutionTitle: string;
  solutionBullets: string[];
  modulesTitle: string;
  modules: string[];
  benefitsTitle: string;
  benefits: string[];
  visualImage: string;
  visualAlt: string;
  visualLabel: string;
  visualStats: IconBullet[];
  reverse?: boolean;
};

type FaqItem = {
  q: string;
  a: string;
};

const pageTitle = "Altroz HRMS Customers | HRMS Solutions for Growing Businesses";
const pageDescription =
  "See how Altroz HRMS helps businesses simplify attendance, payroll, leave, employee records, approvals, reporting, and workforce management.";

const approvedCustomerLogos = [
  { name: "Ordinet Solutions Pvt. Ltd.", src: "/customer-logos/image1.png" },
  { name: "PANGEA HR Services Pvt. Ltd.", src: "/customer-logos/image2.png" },
  { name: "Ulka Projects", src: "/customer-logos/image3.png" },
  { name: "Globular Tech Services Pvt. Ltd.", src: "/customer-logos/image4.png" },
  { name: "Financial Services", src: "/customer-logos/image5.jpeg" },
  { name: "BSJ Jewellers", src: "/customer-logos/image6.png" },
  { name: "Anushka", src: "/customer-logos/image7.jpeg" },
  { name: "Rajneer Exim Production", src: "/customer-logos/image8.png" },
  { name: "Enterprise", src: "/customer-logos/image9.png" },
  { name: "Global Envirotech", src: "/customer-logos/image10.png" },
  { name: "Gasoline Fuel Systems India", src: "/customer-logos/image11.png" },
];

const customerValueCards = [
  { label: "Reduced Manual Work", value: "Fewer repeated HR tasks" },
  { label: "Centralized HR", value: "One system of record" },
  { label: "Faster Approvals", value: "Clear request flows" },
  { label: "Better Visibility", value: "Branch and team views" },
  { label: "Structured Reporting", value: "Cleaner summaries" },
];

const businessTypes: SelectOption[] = [
  {
    id: "startups",
    label: "Startups",
    title: "Startups",
    summary: "Build structured HR processes and reduce dependency on spreadsheets.",
    bullets: [
      "Keep employee records in one place",
      "Track attendance and leave without scattered files",
      "Set up repeatable approval flows early",
    ],
    note: "Useful when the team wants a practical foundation that can grow with the business.",
    icon: <Rocket className="h-5 w-5" />,
    visualImage: modelScreenshots.coreHrTable,
    visualAlt: "Altroz HRMS core HR preview for startups",
    visualLabel: "Sample startup HR setup",
    visualStats: [
      { label: "Core HR", value: "Centralized" },
      { label: "Approvals", value: "Structured" },
      { label: "Growth", value: "Ready to scale" },
    ],
  },
  {
    id: "smes",
    label: "SMEs",
    title: "Small and Medium-Sized Businesses",
    summary: "Organize day-to-day HR work across teams, branches, and routine processes.",
    bullets: [
      "Reduce manual follow-ups across HR tasks",
      "Keep records easier to review and update",
      "Support attendance, leave, payroll, and reporting in one platform",
    ],
    note: "A good fit for businesses that need more structure without adding unnecessary complexity.",
    icon: <Building2 className="h-5 w-5" />,
    visualImage: modelScreenshots.workforceDashboard,
    visualAlt: "Altroz HRMS workforce dashboard for SMEs",
    visualLabel: "Sample SME workforce view",
    visualStats: [
      { label: "Workforce", value: "Organized" },
      { label: "Workflows", value: "Clear" },
      { label: "Records", value: "Centralized" },
    ],
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    title: "Manufacturing Companies",
    summary:
      "Manage shifts, attendance, overtime, payroll, and department-level workforce records.",
    bullets: [
      "Keep shift-based attendance structured",
      "Review overtime and attendance together",
      "Support plant, site, and department visibility",
    ],
    note: "Helpful for operations where attendance and payroll need to stay closely connected.",
    icon: <Factory className="h-5 w-5" />,
    visualImage: modelScreenshots.attendanceDashboard,
    visualAlt: "Altroz HRMS attendance dashboard for manufacturing teams",
    visualLabel: "Sample shift-based attendance",
    visualStats: [
      { label: "Shifts", value: "Coordinated" },
      { label: "Overtime", value: "Tracked" },
      { label: "Branch view", value: "Available" },
    ],
  },
  {
    id: "it",
    label: "IT and Software",
    title: "IT and Software Companies",
    summary: "Support flexible attendance, approvals, self-service, and reporting.",
    bullets: [
      "Keep remote and hybrid workforce data easier to manage",
      "Reduce repeated employee queries through self-service",
      "Use dashboards and reports for clearer visibility",
    ],
    note: "A practical fit for teams that want organized HR processes without heavy manual coordination.",
    icon: <LayoutDashboard className="h-5 w-5" />,
    visualImage: modelScreenshots.employeeReport,
    visualAlt: "Altroz HRMS employee report preview for IT teams",
    visualLabel: "Sample employee insights",
    visualStats: [
      { label: "Self-service", value: "Enabled" },
      { label: "Reports", value: "Visible" },
      { label: "Approvals", value: "Digital" },
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    title: "Healthcare Organizations",
    summary: "Organize shift-based teams, leave, employee records, and reporting visibility.",
    bullets: [
      "Keep workforce records easier to maintain",
      "Support rotating schedules and leave workflows",
      "Give managers clearer workforce visibility",
    ],
    note: "Useful when people management needs to stay structured across busy schedules and locations.",
    icon: <Stethoscope className="h-5 w-5" />,
    visualImage: modelScreenshots.leaveDashboard,
    visualAlt: "Altroz HRMS leave dashboard for healthcare teams",
    visualLabel: "Sample scheduling view",
    visualStats: [
      { label: "Schedules", value: "Organized" },
      { label: "Leave", value: "Visible" },
      { label: "Records", value: "Centralized" },
    ],
  },
  {
    id: "education",
    label: "Education",
    title: "Educational Institutions",
    summary: "Keep faculty and staff records, leave, attendance, and payroll organized.",
    bullets: [
      "Track staff attendance and leave in one place",
      "Maintain teacher and staff profiles cleanly",
      "Support branch or campus-level visibility",
    ],
    note: "Helpful when administrative teams need fewer spreadsheets and clearer day-to-day records.",
    icon: <GraduationCap className="h-5 w-5" />,
    visualImage: modelScreenshots.coreHrTable,
    visualAlt: "Altroz HRMS employee table for educational institutions",
    visualLabel: "Sample campus records",
    visualStats: [
      { label: "Staff", value: "Centralized" },
      { label: "Attendance", value: "Structured" },
      { label: "Campus view", value: "Ready" },
    ],
  },
  {
    id: "retail",
    label: "Retail",
    title: "Retail Businesses",
    summary: "Manage stores, branches, shifts, attendance, leave, and payroll.",
    bullets: [
      "Handle branch-wise workforce records",
      "Track store staff attendance and leaves",
      "Keep payroll inputs connected to attendance",
    ],
    note: "Useful for multi-store teams that need daily visibility across branches and shifts.",
    icon: <ShoppingCart className="h-5 w-5" />,
    visualImage: modelScreenshots.workforceDashboard,
    visualAlt: "Altroz HRMS workforce dashboard for retail businesses",
    visualLabel: "Sample retail workforce view",
    visualStats: [
      { label: "Stores", value: "Connected" },
      { label: "Shifts", value: "Tracked" },
      { label: "Branches", value: "Visible" },
    ],
  },
  {
    id: "construction",
    label: "Construction",
    title: "Construction Companies",
    summary: "Track site teams, shift-based attendance, approvals, and branch records.",
    bullets: [
      "Support project and site-level workforce tracking",
      "Keep attendance and approvals easier to review",
      "Maintain records across multiple worksites",
    ],
    note: "A practical fit for distributed workforces that move between sites and projects.",
    icon: <Construction className="h-5 w-5" />,
    visualImage: modelScreenshots.attendanceDashboard,
    visualAlt: "Altroz HRMS attendance dashboard for construction teams",
    visualLabel: "Sample site attendance",
    visualStats: [
      { label: "Sites", value: "Organized" },
      { label: "Approvals", value: "Visible" },
      { label: "Attendance", value: "Structured" },
    ],
  },
  {
    id: "logistics",
    label: "Logistics",
    title: "Logistics and Transport Companies",
    summary: "Handle field teams, attendance, leave, and multi-location visibility.",
    bullets: [
      "Keep branch and field workforce records organized",
      "Support attendance across multiple locations",
      "Review workforce activity more clearly",
    ],
    note: "Useful for teams that work across depots, routes, yards, and field locations.",
    icon: <Truck className="h-5 w-5" />,
    visualImage: modelScreenshots.workforceDashboard,
    visualAlt: "Altroz HRMS workforce dashboard for logistics teams",
    visualLabel: "Sample multi-location view",
    visualStats: [
      { label: "Routes", value: "Visible" },
      { label: "Locations", value: "Connected" },
      { label: "Attendance", value: "Managed" },
    ],
  },
  {
    id: "facility",
    label: "Facility Mgmt.",
    title: "Facility Management Businesses",
    summary: "Coordinate distributed staff, shifts, attendance, and approvals.",
    bullets: [
      "Keep shift-based teams easier to coordinate",
      "Review attendance and leave in one flow",
      "Maintain records across client sites and locations",
    ],
    note: "Useful where service teams move between multiple managed properties or sites.",
    icon: <Workflow className="h-5 w-5" />,
    visualImage: modelScreenshots.attendanceDashboard,
    visualAlt: "Altroz HRMS attendance dashboard for facility management teams",
    visualLabel: "Sample service-team view",
    visualStats: [
      { label: "Teams", value: "Coordinated" },
      { label: "Sites", value: "Tracked" },
      { label: "Approvals", value: "Simple" },
    ],
  },
  {
    id: "hospitality",
    label: "Hospitality",
    title: "Hospitality Organizations",
    summary: "Organize rosters, attendance, leave, payroll, and branch visibility.",
    bullets: [
      "Support rotating schedules and seasonal teams",
      "Keep branch workforce information tidy",
      "Connect attendance and payroll workflows",
    ],
    note: "Useful for hotels, resorts, and service teams that need dependable roster management.",
    icon: <Hotel className="h-5 w-5" />,
    visualImage: modelScreenshots.leaveDashboard,
    visualAlt: "Altroz HRMS leave dashboard for hospitality teams",
    visualLabel: "Sample roster planning",
    visualStats: [
      { label: "Rosters", value: "Visible" },
      { label: "Payroll", value: "Connected" },
      { label: "Branches", value: "Aligned" },
    ],
  },
  {
    id: "corporate",
    label: "Corporate Offices",
    title: "Corporate Offices",
    summary: "Centralize employee data, workflows, and reporting for office teams.",
    bullets: [
      "Keep records, approvals, and reports connected",
      "Give managers clearer branch and department visibility",
      "Support consistent HR processes across office teams",
    ],
    note: "A clean fit for structured office operations that need a more organized HR backbone.",
    icon: <Building2 className="h-5 w-5" />,
    visualImage: modelScreenshots.employeeReport,
    visualAlt: "Altroz HRMS employee report preview for corporate offices",
    visualLabel: "Sample office reporting",
    visualStats: [
      { label: "Departments", value: "Visible" },
      { label: "Approvals", value: "Structured" },
      { label: "Reports", value: "Ready" },
    ],
  },
  {
    id: "multi-branch",
    label: "Multi-Branch",
    title: "Multi-Branch Businesses",
    summary:
      "Centralize workforce information across offices, stores, factories, sites, or locations.",
    bullets: [
      "View employee data across locations from one platform",
      "Keep attendance, leave, and reporting connected",
      "Support a consistent workflow across branches",
    ],
    note: "Useful when a business needs to compare and manage workforce activity across multiple sites.",
    icon: <LayoutDashboard className="h-5 w-5" />,
    visualImage: modelScreenshots.workforceDashboard,
    visualAlt: "Altroz HRMS workforce dashboard for multi-branch businesses",
    visualLabel: "Sample branch visibility",
    visualStats: [
      { label: "Branches", value: "Connected" },
      { label: "Teams", value: "Visible" },
      { label: "Records", value: "Centralized" },
    ],
  },
];

const customerChallenges: SelectOption[] = [
  {
    id: "attendance",
    label: "Manual Attendance",
    title: "Manual attendance can slow daily HR work",
    summary:
      "Registers and spreadsheets make attendance harder to verify when teams grow or work across locations.",
    bullets: [
      "Repetitive manual entries",
      "Missing or delayed records",
      "Branch-wise visibility gaps",
    ],
    modules: [
      "Biometric attendance integration",
      "GPS attendance",
      "Geolocation attendance",
      "Geofencing",
      "Mobile attendance",
      "QR code attendance",
      "Shift management",
      "Attendance regularization",
      "Missing punch management",
      "Overtime tracking",
      "Attendance reports",
    ],
    benefits: [
      "Reduced manual attendance work",
      "Better attendance visibility",
      "More organized working-hour records",
      "Faster attendance corrections",
      "Better support for payroll processing",
      "Centralized branch and department attendance",
    ],
    note: "Altroz HRMS can support structured attendance capture and reporting depending on the enabled methods.",
    icon: <Clock3 className="h-5 w-5" />,
    visualImage: modelScreenshots.attendanceDashboard,
    visualAlt: "Altroz HRMS attendance dashboard illustration",
    visualLabel: "Illustrative attendance dashboard",
    visualStats: [
      { label: "Present", value: "286" },
      { label: "Missing punches", value: "12" },
      { label: "Overtime", value: "04:12" },
    ],
  },
  {
    id: "payroll",
    label: "Payroll Errors",
    title: "Payroll work becomes harder as pay inputs grow",
    summary:
      "Repeated calculations, deductions, and attendance inputs can make salary processing difficult to keep consistent.",
    bullets: [
      "Repeated payroll calculations",
      "Scattered salary records",
      "Time-consuming payroll checks",
    ],
    modules: [
      "Payroll processing",
      "Salary computation",
      "Earnings and deductions",
      "Payslip generation",
      "Overtime inputs",
      "Bonus and arrears",
      "Payroll summaries",
      "Payroll reports",
      "Compliance-related payroll records",
    ],
    benefits: [
      "Reduced manual payroll work",
      "More consistent salary processing",
      "Easier payroll verification",
      "Centralized salary records",
      "Better payroll visibility",
      "Faster report preparation",
    ],
    note: "Altroz HRMS can support payroll processing, salary calculations, payslips, earnings, deductions, payroll reports, and related records based on enabled features.",
    icon: <Wallet className="h-5 w-5" />,
    visualImage: modelScreenshots.salaryReport,
    visualAlt: "Altroz HRMS payroll summary illustration",
    visualLabel: "Illustrative payroll summary",
    visualStats: [
      { label: "Gross", value: "INR 12.4L" },
      { label: "Deductions", value: "INR 1.8L" },
      { label: "Net", value: "INR 10.6L" },
    ],
  },
  {
    id: "leave",
    label: "Manual Leave",
    title: "Manual leave requests can be hard to track",
    summary:
      "Email, paper, or chat-based leave requests can make approvals and balance tracking difficult to follow.",
    bullets: ["Delayed approvals", "Unclear leave balances", "Repeated employee follow-ups"],
    modules: [
      "Online leave requests",
      "Leave balance visibility",
      "Manager approval workflows",
      "Holiday calendar",
      "Leave policies",
      "Pending approval tracking",
      "Leave reports",
      "Employee self-service",
    ],
    benefits: [
      "Faster leave approvals",
      "Clearer leave balances",
      "Reduced paperwork and email",
      "Better employee transparency",
      "Improved workforce planning",
      "More accurate leave records",
    ],
    note: "Available employee self-service features can allow employees to submit leave requests, view balances, and track approval status.",
    icon: <CalendarDays className="h-5 w-5" />,
    visualImage: modelScreenshots.leaveDashboard,
    visualAlt: "Altroz HRMS leave dashboard illustration",
    visualLabel: "Illustrative leave workflow",
    visualStats: [
      { label: "Requests", value: "Open" },
      { label: "Balances", value: "Visible" },
      { label: "Approvals", value: "Pending" },
    ],
  },
  {
    id: "records",
    label: "Scattered Records",
    title: "Employee information gets harder to maintain when it is scattered",
    summary:
      "Spreadsheets, emails, and paper files can make employee details difficult to update and retrieve.",
    bullets: [
      "Duplicate employee records",
      "Slow document retrieval",
      "Inconsistent employee details",
    ],
    modules: [
      "Employee profiles",
      "Personal information",
      "Employment information",
      "Department and designation",
      "Reporting structure",
      "Employee documents",
      "Employment history",
      "Branch information",
      "Employee status",
      "Joining and exit records",
    ],
    benefits: [
      "Centralized employee information",
      "Reduced duplicate records",
      "Faster information access",
      "Better document organization",
      "Improved data accuracy",
      "Easier workforce reporting",
    ],
    note: "Altroz HRMS can centralize employee profiles, documents, reporting structure, status, and joining or exit records.",
    icon: <Users className="h-5 w-5" />,
    visualImage: modelScreenshots.coreHrTable,
    visualAlt: "Altroz HRMS employee directory illustration",
    visualLabel: "Illustrative employee directory",
    visualStats: [
      { label: "Profiles", value: "Centralized" },
      { label: "Documents", value: "Organized" },
      { label: "History", value: "Tracked" },
    ],
  },
  {
    id: "reports",
    label: "Reporting",
    title: "Reports can take too long when data lives in many places",
    summary:
      "Attendance, payroll, leave, and compliance reporting can become slow when the underlying records are split across tools.",
    bullets: [
      "Multiple spreadsheet versions",
      "Inconsistent report formats",
      "Delayed management review",
    ],
    modules: [
      "Employee reports",
      "Attendance reports",
      "Payroll reports",
      "Leave reports",
      "Recruitment reports",
      "Performance reports",
      "Compliance reports",
      "Asset reports",
      "Branch-wise reports",
      "Department-wise reports",
      "HR dashboards",
      "Workforce analytics",
    ],
    benefits: [
      "Faster report generation",
      "Reduced manual reporting work",
      "More consistent report formats",
      "Better management visibility",
      "Improved workforce planning",
      "More organized compliance records",
    ],
    note: "Altroz HRMS can support structured employee, attendance, payroll, leave, recruitment, performance, compliance, asset, branch, department, dashboard, and analytics reporting depending on the enabled modules.",
    icon: <FileBarChart2 className="h-5 w-5" />,
    visualImage: modelScreenshots.employeeReport,
    visualAlt: "Altroz HRMS reporting illustration",
    visualLabel: "Illustrative reporting view",
    visualStats: [
      { label: "Reports", value: "Structured" },
      { label: "Branches", value: "Compared" },
      { label: "Dashboards", value: "Visible" },
    ],
  },
  {
    id: "visibility",
    label: "Visibility",
    title: "Workforce visibility can stay limited without a central view",
    summary:
      "When attendance, leave, and reports are split, it becomes harder for managers to see what is happening across teams.",
    bullets: [
      "Limited branch visibility",
      "Delayed action on approvals",
      "Harder workforce planning",
    ],
    modules: [
      "Dashboards",
      "Branch-wise summaries",
      "Department-wise views",
      "Approval queues",
      "Attendance visibility",
      "Leave visibility",
      "Workforce analytics",
    ],
    benefits: [
      "Better visibility into the selected workflow",
      "Less repetitive manual work",
      "More structured HR operations",
    ],
    note: "Altroz HRMS helps bring dashboards, reports, and workflow status into one place for easier review.",
    icon: <LayoutDashboard className="h-5 w-5" />,
    visualImage: modelScreenshots.workforceDashboard,
    visualAlt: "Altroz HRMS workforce visibility illustration",
    visualLabel: "Illustrative workforce view",
    visualStats: [
      { label: "Teams", value: "Visible" },
      { label: "Approvals", value: "Clear" },
      { label: "Planning", value: "Simpler" },
    ],
  },
  {
    id: "branches",
    label: "Multi-Branch",
    title: "Multiple branches can make HR coordination harder",
    summary:
      "Different branches and sites need a shared way to track records, attendance, leave, and reporting.",
    bullets: ["Separate branch records", "Different local workflows", "Harder consolidated review"],
    modules: [
      "Branch-wise employee records",
      "Attendance across locations",
      "Payroll and leave records",
      "Branch-wise reporting",
      "Centralized review",
    ],
    benefits: [
      "Centralized workforce visibility",
      "Consistent branch records",
      "Simpler cross-location review",
      "Better regional oversight",
    ],
    note: "Altroz HRMS can centralize employee information, attendance, payroll, leave, and reports across multiple branches and locations.",
    icon: <Building2 className="h-5 w-5" />,
    visualImage: modelScreenshots.workforceDashboard,
    visualAlt: "Altroz HRMS multi-branch illustration",
    visualLabel: "Illustrative branch summary",
    visualStats: [
      { label: "Branches", value: "Linked" },
      { label: "Locations", value: "Visible" },
      { label: "Records", value: "Centralized" },
    ],
  },
  {
    id: "queries",
    label: "Queries",
    title: "Repeated employee questions can interrupt HR teams",
    summary:
      "Simple questions about balances, requests, documents, and status checks can turn into repetitive manual work.",
    bullets: [
      "Repeated status follow-ups",
      "Unclear request visibility",
      "Extra manual HR support",
    ],
    modules: [
      "Employee self-service",
      "Document access",
      "Request tracking",
      "Notifications",
      "Approval status visibility",
    ],
    benefits: [
      "Reduced employee follow-ups",
      "Clearer request visibility",
      "Less manual HR support",
      "Improved self-service experience",
    ],
    note: "Employee self-service features can reduce routine follow-ups by making approved information easier to access.",
    icon: <BadgeCheck className="h-5 w-5" />,
    visualImage: modelScreenshots.generatedDocuments,
    visualAlt: "Altroz HRMS employee self-service illustration",
    visualLabel: "Illustrative self-service view",
    visualStats: [
      { label: "Requests", value: "Tracked" },
      { label: "Documents", value: "Accessible" },
      { label: "Support", value: "Reduced" },
    ],
  },
];

const attendanceStory: StorySection = {
  eyebrow: "Attendance",
  title: "Replace Manual Attendance with Structured Tracking",
  description:
    "Attendance becomes easier to manage when check-ins, shift rules, corrections, and reports all sit inside one system.",
  challengeTitle: "The Challenge",
  challengeBullets: [
    "Manual registers and Excel sheets can make working hours harder to track accurately.",
    "Missing attendance records and delayed corrections create extra follow-up work.",
    "Multiple shifts and branch-wise teams are harder to review in disconnected files.",
  ],
  solutionTitle: "How Altroz HRMS Helps",
  solutionBullets: [
    "Biometric attendance integration",
    "GPS attendance",
    "Geolocation attendance",
    "Geofencing",
    "Mobile attendance",
    "QR code attendance",
    "Shift management",
    "Attendance regularization",
    "Missing punch management",
    "Overtime tracking",
    "Attendance reports",
  ],
  modulesTitle: "Business Benefits",
  modules: [
    "Reduced manual attendance work",
    "Better attendance visibility",
    "More organized working-hour records",
    "Faster attendance corrections",
    "Better support for payroll processing",
    "Centralized branch and department attendance",
  ],
  benefitsTitle: "Sample Attendance View",
  benefits: [
    "Illustrative data only, not customer data",
    "Supports attendance review and payroll preparation",
    "Useful for managers, HR teams, and branch leaders",
  ],
  visualImage: modelScreenshots.attendanceDashboard,
  visualAlt: "Illustrative Altroz HRMS attendance dashboard",
  visualLabel: "Attendance dashboard mockup",
  visualStats: [
    { label: "Present", value: "286" },
    { label: "Late marks", value: "19" },
    { label: "Missing punches", value: "12" },
  ],
};

const payrollStory: StorySection = {
  eyebrow: "Payroll",
  title: "Simplify Payroll Processing and Verification",
  description:
    "Payroll works better when salary inputs, attendance data, deductions, and payslips stay aligned in one place.",
  challengeTitle: "The Challenge",
  challengeBullets: [
    "Repeated calculations can become difficult as employee counts and salary structures grow.",
    "Scattered salary records make it harder to review deductions and payroll inputs.",
    "Time-consuming verification can slow monthly payroll work.",
  ],
  solutionTitle: "How Altroz HRMS Helps",
  solutionBullets: [
    "Payroll processing",
    "Salary computation",
    "Earnings and deductions",
    "Payslip generation",
    "Overtime inputs",
    "Bonus and arrears",
    "Payroll summaries",
    "Payroll reports",
    "Compliance-related payroll records",
  ],
  modulesTitle: "Business Benefits",
  modules: [
    "Reduced manual payroll work",
    "More consistent salary processing",
    "Easier payroll verification",
    "Centralized salary records",
    "Better payroll visibility",
    "Faster report preparation",
  ],
  benefitsTitle: "Sample Payroll Summary",
  benefits: [
    "Masked values shown for illustration only",
    "Use the same HR record base for review and reporting",
    "Helpful for payroll teams and finance reviewers",
  ],
  visualImage: modelScreenshots.salaryReport,
  visualAlt: "Illustrative Altroz HRMS payroll summary",
  visualLabel: "Payroll summary mockup",
  visualStats: [
    { label: "Gross", value: "INR 12.4L" },
    { label: "Deductions", value: "INR 1.8L" },
    { label: "Net", value: "INR 10.6L" },
  ],
};

const leaveStory: StorySection = {
  eyebrow: "Leave",
  title: "Move from Manual Leave Requests to Online Workflows",
  description:
    "Leave becomes easier to follow when requests, balances, approvals, and holiday context are visible in the same system.",
  challengeTitle: "The Challenge",
  challengeBullets: [
    "Email, paper, and chat-based requests can make approvals difficult to track.",
    "Employees may need repeated follow-ups to understand their leave balance or request status.",
    "Planning team availability is harder when leave records are spread across tools.",
  ],
  solutionTitle: "How Altroz HRMS Helps",
  solutionBullets: [
    "Online leave requests",
    "Leave balance visibility",
    "Manager approval workflows",
    "Holiday calendar",
    "Leave policies",
    "Pending approval tracking",
    "Leave reports",
    "Employee self-service",
  ],
  modulesTitle: "Business Benefits",
  modules: [
    "Faster leave approvals",
    "Clearer leave balances",
    "Reduced paperwork and email",
    "Better employee transparency",
    "Improved workforce planning",
    "More accurate leave records",
  ],
  benefitsTitle: "Sample Leave Workflow",
  benefits: [
    "Illustrative data only, not customer data",
    "Shows request status, balance visibility, and manager review",
    "Useful for teams that need a cleaner approval path",
  ],
  visualImage: modelScreenshots.leaveDashboard,
  visualAlt: "Illustrative Altroz HRMS leave dashboard",
  visualLabel: "Leave workflow mockup",
  visualStats: [
    { label: "Requests", value: "08 open" },
    { label: "Balances", value: "Visible" },
    { label: "Approvals", value: "Pending" },
  ],
  reverse: true,
};

const employeeRecordsStory: StorySection = {
  eyebrow: "Employee Records",
  title: "Centralize Employee Records",
  description:
    "Employee information is easier to maintain when profiles, documents, and employment history stay in one digital place.",
  challengeTitle: "The Challenge",
  challengeBullets: [
    "Duplicate records and missing documents can make administration harder.",
    "Information stored across spreadsheets, emails, and paper files is slower to retrieve.",
    "Access control becomes harder to maintain when records are distributed everywhere.",
  ],
  solutionTitle: "How Altroz HRMS Helps",
  solutionBullets: [
    "Employee profiles",
    "Personal information",
    "Employment information",
    "Department and designation",
    "Reporting structure",
    "Employee documents",
    "Employment history",
    "Branch information",
    "Employee status",
    "Joining and exit records",
  ],
  modulesTitle: "Business Benefits",
  modules: [
    "Centralized employee information",
    "Reduced duplicate records",
    "Faster information access",
    "Better document organization",
    "Improved data accuracy",
    "Easier workforce reporting",
  ],
  benefitsTitle: "Sample Employee Directory",
  benefits: [
    "Illustrative directory and profile data only",
    "Shows how employee records can stay organized",
    "Useful for HR teams and managers reviewing profile history",
  ],
  visualImage: modelScreenshots.coreHrTable,
  visualAlt: "Illustrative Altroz HRMS employee directory",
  visualLabel: "Employee directory mockup",
  visualStats: [
    { label: "Profiles", value: "312" },
    { label: "Documents", value: "Organized" },
    { label: "Exit records", value: "Tracked" },
  ],
};

const reportingStory: StorySection = {
  eyebrow: "Reporting",
  title: "Generate Structured HR Reports More Efficiently",
  description:
    "Reporting is easier when employee, attendance, payroll, leave, and compliance records all come from one platform.",
  challengeTitle: "The Challenge",
  challengeBullets: [
    "Multiple Excel sheets can lead to inconsistent report formats.",
    "Management reporting can be delayed when data has to be assembled manually.",
    "Branch and department comparison is harder when records stay fragmented.",
  ],
  solutionTitle: "How Altroz HRMS Helps",
  solutionBullets: [
    "Employee reports",
    "Attendance reports",
    "Payroll reports",
    "Leave reports",
    "Recruitment reports",
    "Performance reports",
    "Compliance reports",
    "Asset reports",
    "Branch-wise reports",
    "Department-wise reports",
    "HR dashboards",
    "Workforce analytics",
  ],
  modulesTitle: "Business Benefits",
  modules: [
    "Faster report generation",
    "Reduced manual reporting work",
    "More consistent report formats",
    "Better management visibility",
    "Improved workforce planning",
    "More organized compliance records",
  ],
  benefitsTitle: "Sample Reporting View",
  benefits: [
    "Illustrative reporting data only",
    "Shows a structured view for employee, branch, and compliance information",
    "Useful for HR, finance, and leadership review",
  ],
  visualImage: modelScreenshots.employeeReport,
  visualAlt: "Illustrative Altroz HRMS reporting dashboard",
  visualLabel: "Reporting mockup",
  visualStats: [
    { label: "Reports", value: "24" },
    { label: "Branches", value: "8" },
    { label: "Dashboards", value: "Ready" },
  ],
  reverse: true,
};

const challengeComparison = [
  {
    challenge: "Manual attendance records",
    solution: "Supported biometric, GPS, mobile, or other configured attendance methods",
  },
  {
    challenge: "Payroll calculation errors",
    solution: "Structured payroll processing and automated calculations",
  },
  {
    challenge: "Paper-based leave requests",
    solution: "Online leave applications and approval workflows",
  },
  {
    challenge: "Scattered employee information",
    solution: "Centralized digital employee database",
  },
  {
    challenge: "Delayed HR reports",
    solution: "Structured employee, attendance, payroll, and leave reports",
  },
  {
    challenge: "Limited workforce visibility",
    solution: "HR dashboards and analytics",
  },
  {
    challenge: "Multiple branches and locations",
    solution: "Centralized branch-wise workforce management",
  },
  {
    challenge: "Repeated employee queries",
    solution: "Employee self-service features",
  },
  {
    challenge: "Slow approvals",
    solution: "Configured approval workflows",
  },
  {
    challenge: "Manual compliance records",
    solution: "Structured statutory and compliance-related records",
  },
];

const beforePoints = [
  "Attendance registers",
  "Multiple spreadsheets",
  "Manual payroll checking",
  "Email-based leave approvals",
  "Physical employee files",
  "Repeated employee queries",
  "Manual reports",
  "Disconnected branches",
];

const afterPoints = [
  "Centralized employee data",
  "Structured attendance records",
  "Payroll workflows",
  "Online leave approvals",
  "Digital employee documents",
  "Employee self-service",
  "Reports and dashboards",
  "Multi-location workforce visibility",
];

const roles: SelectOption[] = [
  {
    id: "hr",
    label: "HR Teams",
    title: "HR Teams",
    summary:
      "May use available modules to manage employees, review attendance, approve requests, prepare payroll, generate reports, maintain documents, track recruitment, and manage exits.",
    bullets: [
      "Manage employees and documents",
      "Review attendance and leave activity",
      "Prepare payroll and reports",
    ],
    note: "Access depends on the configured permissions and enabled modules.",
    icon: <Users className="h-5 w-5" />,
    visualImage: modelScreenshots.coreHrTable,
    visualAlt: "Altroz HRMS role view for HR teams",
    visualLabel: "HR team workspace",
    visualStats: [
      { label: "Records", value: "Managed" },
      { label: "Approvals", value: "Reviewed" },
      { label: "Reports", value: "Prepared" },
    ],
  },
  {
    id: "managers",
    label: "Managers",
    title: "Managers",
    summary:
      "Depending on permissions, may view team attendance, review leave requests, approve corrections, monitor workforce availability, access department reports, and review team performance.",
    bullets: ["View team attendance", "Review leave requests", "Monitor workforce availability"],
    note: "Exact access depends on the configured role model and business policies.",
    icon: <UserCog className="h-5 w-5" />,
    visualImage: modelScreenshots.workforceDashboard,
    visualAlt: "Altroz HRMS role view for managers",
    visualLabel: "Manager visibility view",
    visualStats: [
      { label: "Team view", value: "Visible" },
      { label: "Requests", value: "Reviewed" },
      { label: "Departments", value: "Accessible" },
    ],
  },
  {
    id: "employees",
    label: "Employees",
    title: "Employees",
    summary:
      "Depending on enabled self-service features, may view attendance, apply for leave, check balances, download payslips, submit corrections, track request status, access documents, and receive notifications.",
    bullets: [
      "View attendance and leave balances",
      "Submit and track requests",
      "Access documents and payslips where enabled",
    ],
    note: "Availability depends on the employee self-service configuration.",
    icon: <BadgeCheck className="h-5 w-5" />,
    visualImage: modelScreenshots.generatedDocuments,
    visualAlt: "Altroz HRMS role view for employees",
    visualLabel: "Employee self-service view",
    visualStats: [
      { label: "Balances", value: "Visible" },
      { label: "Payslips", value: "Accessible" },
      { label: "Requests", value: "Tracked" },
    ],
  },
  {
    id: "payroll",
    label: "Payroll Teams",
    title: "Payroll Teams",
    summary:
      "May access authorized salary, attendance, deduction, payslip, and payroll-report information.",
    bullets: [
      "Use approved attendance inputs",
      "Review salary calculations and deductions",
      "Generate payroll reports",
    ],
    note: "Payroll access should stay limited to authorized users.",
    icon: <Wallet className="h-5 w-5" />,
    visualImage: modelScreenshots.salaryReport,
    visualAlt: "Altroz HRMS role view for payroll teams",
    visualLabel: "Payroll workspace",
    visualStats: [
      { label: "Payroll", value: "Authorized" },
      { label: "Deductions", value: "Visible" },
      { label: "Payslips", value: "Ready" },
    ],
  },
  {
    id: "owners",
    label: "Business Owners",
    title: "Business Owners",
    summary:
      "May view selected dashboards, summaries, reports, workforce trends, and pending actions.",
    bullets: [
      "Review summaries and dashboards",
      "Track pending actions",
      "Monitor workforce trends",
    ],
    note: "Useful for leaders who want a concise, high-level operational view.",
    icon: <Building2 className="h-5 w-5" />,
    visualImage: modelScreenshots.workforceDashboard,
    visualAlt: "Altroz HRMS role view for business owners",
    visualLabel: "Leadership summary view",
    visualStats: [
      { label: "Summaries", value: "Visible" },
      { label: "Trends", value: "Tracked" },
      { label: "Actions", value: "Prioritized" },
    ],
  },
];

const outcomeCards = [
  "Reduced repetitive HR work",
  "Better attendance visibility",
  "Simplified payroll processing",
  "Faster leave workflows",
  "Centralized employee records",
  "Improved employee self-service",
  "Faster HR report preparation",
  "Better multi-branch visibility",
  "Improved workforce planning",
  "Reduced spreadsheet dependency",
  "More structured HR documentation",
  "Better communication between HR, managers, and employees",
];

const industries: SelectOption[] = [
  {
    id: "manufacturing",
    label: "Manufacturing",
    title: "Manufacturing",
    summary:
      "Shifts, attendance, overtime, payroll, and department visibility are often the biggest workforce concerns.",
    bullets: [
      "Challenge: shift-heavy attendance and workforce coordination",
      "Modules: attendance, payroll, leave, reports, employee records",
      "Workflow: track shift activity, review corrections, and support payroll inputs",
      "Benefit: clearer supervision across plants, lines, and departments",
    ],
    note: "A practical fit for plant teams that need attendance and payroll to stay connected.",
    icon: <Factory className="h-5 w-5" />,
    visualImage: modelScreenshots.attendanceDashboard,
    visualAlt: "Altroz HRMS manufacturing industry preview",
    visualLabel: "Manufacturing workflow",
    visualStats: [
      { label: "Challenge", value: "Shift control" },
      { label: "Modules", value: "Attendance + payroll" },
      { label: "Benefit", value: "Branch visibility" },
    ],
  },
  {
    id: "it",
    label: "IT and Software",
    title: "IT and Software",
    summary:
      "Hybrid work, self-service, and structured reporting are common concerns for technology teams.",
    bullets: [
      "Challenge: distributed teams and repeated HR follow-ups",
      "Modules: employee self-service, leave, attendance, reports",
      "Workflow: employees submit requests and track status online",
      "Benefit: fewer manual HR interruptions",
    ],
    note: "Useful for teams that want clear processes without adding more manual coordination.",
    icon: <Workflow className="h-5 w-5" />,
    visualImage: modelScreenshots.employeeReport,
    visualAlt: "Altroz HRMS IT and software industry preview",
    visualLabel: "Technology team workflow",
    visualStats: [
      { label: "Challenge", value: "Hybrid work" },
      { label: "Modules", value: "Self-service + reports" },
      { label: "Benefit", value: "Less HR dependency" },
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    title: "Healthcare",
    summary:
      "Shift-based workforce management and clear scheduling are critical in healthcare environments.",
    bullets: [
      "Challenge: rotating schedules and fast-changing availability",
      "Modules: attendance, leave, employee records, reporting",
      "Workflow: coordinate attendance, leave, and manager review",
      "Benefit: more organized workforce visibility",
    ],
    note: "A fit for people-focused operations that need practical scheduling and visibility.",
    icon: <Stethoscope className="h-5 w-5" />,
    visualImage: modelScreenshots.leaveDashboard,
    visualAlt: "Altroz HRMS healthcare industry preview",
    visualLabel: "Healthcare scheduling workflow",
    visualStats: [
      { label: "Challenge", value: "Rotating shifts" },
      { label: "Modules", value: "Attendance + leave" },
      { label: "Benefit", value: "Visibility" },
    ],
  },
  {
    id: "education",
    label: "Education",
    title: "Education",
    summary: "Campuses need structured attendance, leave, staff records, and payroll coordination.",
    bullets: [
      "Challenge: staff records spread across campuses or departments",
      "Modules: core HR, attendance, leave, payroll, reports",
      "Workflow: keep staff data and approvals organized by role",
      "Benefit: cleaner administrative coordination",
    ],
    note: "Useful for institutions that want a dependable HR backbone for teaching and support staff.",
    icon: <GraduationCap className="h-5 w-5" />,
    visualImage: modelScreenshots.coreHrTable,
    visualAlt: "Altroz HRMS education industry preview",
    visualLabel: "Campus workforce workflow",
    visualStats: [
      { label: "Challenge", value: "Campus records" },
      { label: "Modules", value: "Core HR + reports" },
      { label: "Benefit", value: "Organized admin" },
    ],
  },
  {
    id: "retail",
    label: "Retail",
    title: "Retail",
    summary:
      "Retail teams often need branch-wise workforce records, shifts, leave, and payroll support.",
    bullets: [
      "Challenge: stores and branches operate on different schedules",
      "Modules: attendance, leave, payroll, employee records, reports",
      "Workflow: manage rosters and approvals across store locations",
      "Benefit: better branch-level consistency",
    ],
    note: "A strong fit for multi-store teams that need simpler day-to-day workforce oversight.",
    icon: <ShoppingCart className="h-5 w-5" />,
    visualImage: modelScreenshots.workforceDashboard,
    visualAlt: "Altroz HRMS retail industry preview",
    visualLabel: "Retail branch workflow",
    visualStats: [
      { label: "Challenge", value: "Store rosters" },
      { label: "Modules", value: "Attendance + payroll" },
      { label: "Benefit", value: "Branch clarity" },
    ],
  },
  {
    id: "construction",
    label: "Construction",
    title: "Construction",
    summary:
      "Construction teams often need site-level attendance and workforce records across project locations.",
    bullets: [
      "Challenge: distributed site teams and changing project locations",
      "Modules: attendance, employee records, leave, reports",
      "Workflow: coordinate project or site-level reviews",
      "Benefit: easier visibility across worksites",
    ],
    note: "Useful for project-based workforces that move between multiple sites.",
    icon: <Construction className="h-5 w-5" />,
    visualImage: modelScreenshots.attendanceDashboard,
    visualAlt: "Altroz HRMS construction industry preview",
    visualLabel: "Construction site workflow",
    visualStats: [
      { label: "Challenge", value: "Site tracking" },
      { label: "Modules", value: "Attendance + records" },
      { label: "Benefit", value: "Site visibility" },
    ],
  },
  {
    id: "logistics",
    label: "Logistics",
    title: "Logistics",
    summary:
      "Depots, routes, and field teams benefit from clear attendance and location-based visibility.",
    bullets: [
      "Challenge: workforce activity across depots and routes",
      "Modules: attendance, leave, employee records, reports",
      "Workflow: review updates and records across locations",
      "Benefit: more consistent location-based oversight",
    ],
    note: "Useful for teams that work across many moving locations.",
    icon: <Truck className="h-5 w-5" />,
    visualImage: modelScreenshots.workforceDashboard,
    visualAlt: "Altroz HRMS logistics industry preview",
    visualLabel: "Logistics workforce workflow",
    visualStats: [
      { label: "Challenge", value: "Route teams" },
      { label: "Modules", value: "Attendance + reports" },
      { label: "Benefit", value: "Location visibility" },
    ],
  },
  {
    id: "facility",
    label: "Facility Management",
    title: "Facility Management",
    summary:
      "Distributed service teams need coordinated shifts, attendance, and approvals across client sites.",
    bullets: [
      "Challenge: service teams move between multiple sites",
      "Modules: attendance, leave, workflow approvals, reports",
      "Workflow: align site-level activity with centralized HR records",
      "Benefit: smoother daily coordination",
    ],
    note: "Useful when staff need to stay organized across client locations or managed properties.",
    icon: <Workflow className="h-5 w-5" />,
    visualImage: modelScreenshots.attendanceDashboard,
    visualAlt: "Altroz HRMS facility management industry preview",
    visualLabel: "Facility workflow",
    visualStats: [
      { label: "Challenge", value: "Site movement" },
      { label: "Modules", value: "Attendance + approvals" },
      { label: "Benefit", value: "Simple coordination" },
    ],
  },
  {
    id: "hospitality",
    label: "Hospitality",
    title: "Hospitality",
    summary:
      "Hotels, resorts, and service teams need roster planning, attendance, leave, and payroll support.",
    bullets: [
      "Challenge: seasonal teams and rotating rosters",
      "Modules: attendance, leave, payroll, employee records, reports",
      "Workflow: keep branch-wise operations aligned with central HR",
      "Benefit: clearer roster planning",
    ],
    note: "A practical fit for guest-facing operations where staffing plans change often.",
    icon: <Hotel className="h-5 w-5" />,
    visualImage: modelScreenshots.leaveDashboard,
    visualAlt: "Altroz HRMS hospitality industry preview",
    visualLabel: "Hospitality roster workflow",
    visualStats: [
      { label: "Challenge", value: "Rosters" },
      { label: "Modules", value: "Leave + payroll" },
      { label: "Benefit", value: "Branch alignment" },
    ],
  },
  {
    id: "corporate",
    label: "Corporate Offices",
    title: "Corporate Offices",
    summary:
      "Office teams benefit from centralized employee data, approvals, and reporting workflows.",
    bullets: [
      "Challenge: multiple teams and departments need a common process",
      "Modules: core HR, attendance, payroll, leave, reports",
      "Workflow: keep approvals and reports organized across departments",
      "Benefit: cleaner administrative oversight",
    ],
    note: "A good fit for structured office operations that need to stay organized.",
    icon: <Building2 className="h-5 w-5" />,
    visualImage: modelScreenshots.employeeReport,
    visualAlt: "Altroz HRMS corporate office industry preview",
    visualLabel: "Corporate reporting workflow",
    visualStats: [
      { label: "Challenge", value: "Departments" },
      { label: "Modules", value: "Core HR + reports" },
      { label: "Benefit", value: "Clear oversight" },
    ],
  },
  {
    id: "smes",
    label: "Startups and SMEs",
    title: "Startups and SMEs",
    summary:
      "Smaller growing businesses need a practical way to centralize HR work as the team expands.",
    bullets: [
      "Challenge: spreadsheets are hard to maintain as operations grow",
      "Modules: employee records, attendance, leave, payroll, reports",
      "Workflow: create a simple, repeatable HR process",
      "Benefit: less spreadsheet dependency",
    ],
    note: "Useful for organizations building a stronger operational foundation.",
    icon: <Rocket className="h-5 w-5" />,
    visualImage: modelScreenshots.coreHrTable,
    visualAlt: "Altroz HRMS startup and SME industry preview",
    visualLabel: "Startup and SME workflow",
    visualStats: [
      { label: "Challenge", value: "Manual work" },
      { label: "Modules", value: "Core HR + attendance" },
      { label: "Benefit", value: "Structured growth" },
    ],
  },
  {
    id: "multi-branch",
    label: "Multi-Branch",
    title: "Multi-Branch Businesses",
    summary:
      "Organizations with offices, stores, factories, or sites need consolidated workforce visibility.",
    bullets: [
      "Challenge: data is spread across branches and locations",
      "Modules: attendance, payroll, leave, employee records, reports",
      "Workflow: review branch-wise information in one place",
      "Benefit: central control with local visibility",
    ],
    note: "Useful when one HR platform needs to support many connected locations.",
    icon: <LayoutDashboard className="h-5 w-5" />,
    visualImage: modelScreenshots.workforceDashboard,
    visualAlt: "Altroz HRMS multi-branch industry preview",
    visualLabel: "Multi-branch workflow",
    visualStats: [
      { label: "Challenge", value: "Disconnected sites" },
      { label: "Modules", value: "Branch view + reports" },
      { label: "Benefit", value: "Central visibility" },
    ],
  },
];

const customerJourneySteps = [
  "Understand business requirements",
  "Identify relevant HR modules",
  "Review workforce structure, branches, shifts, and policies",
  "Configure available workflows",
  "Organize employee data",
  "Support users during adoption",
  "Review reports and improve processes",
];

const whyBusinessesChoose = [
  "Centralized employee records",
  "Attendance and shift management",
  "Payroll processing",
  "Leave workflows",
  "Employee self-service",
  "Recruitment management",
  "Performance management",
  "Asset management",
  "Reports and analytics",
  "Branch-wise and department-wise visibility",
  "Configurable roles and permissions",
  "Mobile-friendly access",
  "Cloud-based access",
  "Practical approval workflows",
  "Scalable HR operations",
  "Multi-industry support",
];

const faqItems: FaqItem[] = [
  {
    q: "Which Businesses Can Use Altroz HRMS?",
    a: "Altroz HRMS can support startups, SMEs, manufacturing companies, IT businesses, healthcare organizations, educational institutions, retail companies, construction businesses, logistics companies, hospitality businesses, and multi-branch organizations.",
  },
  {
    q: "How Does Altroz HRMS Help Reduce Manual Work?",
    a: "Altroz HRMS centralizes employee records and supports structured attendance, payroll, leave, approval, reporting, recruitment, and other HR processes depending on enabled modules.",
  },
  {
    q: "Can Altroz HRMS Manage Employee Attendance?",
    a: "Altroz HRMS can support biometric, GPS, geolocation, geofencing, mobile, and QR code attendance based on the configured setup.",
  },
  {
    q: "Can Altroz HRMS Manage Payroll?",
    a: "Altroz HRMS can support payroll processing, salary calculations, payslips, earnings, deductions, payroll reports, and related records based on enabled features.",
  },
  {
    q: "Can Employees Apply for Leave Online?",
    a: "Available employee self-service features can allow employees to submit leave requests, view balances, and track approval status.",
  },
  {
    q: "Can Altroz HRMS Manage Multiple Branches?",
    a: "Altroz HRMS can help organizations centralize employee records, attendance, payroll, leave, and reports across multiple branches and locations.",
  },
  {
    q: "Does Altroz HRMS Provide Reports?",
    a: "Available reports may include employee, attendance, payroll, leave, recruitment, performance, asset, compliance, department, and branch reports depending on enabled modules.",
  },
  {
    q: "Can Customer Logos Be Displayed on This Page?",
    a: "Customer logos should only be displayed after receiving official approval from the customer.",
  },
  {
    q: "Is Altroz HRMS Suitable for Growing Businesses?",
    a: "Altroz HRMS is designed to support startups, SMEs, and growing organizations by centralizing important HR processes.",
  },
];

const approvedCaseStudies: never[] = [];

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

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);

    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
    } else {
      media.addListener(update);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", update);
      } else {
        media.removeListener(update);
      }
    };
  }, []);

  return reducedMotion;
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
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
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
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      style={reducedMotion ? undefined : { transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        className,
      )}
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
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">{eyebrow}</div>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      <p className="mt-3 text-ink-soft">{description}</p>
    </div>
  );
}

function DetailCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="soft-card p-6">
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{title}</div>
      <div className="mt-4 space-y-2.5">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 rounded-2xl bg-white p-3">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span className="text-sm leading-6 text-ink">{item}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function ChoiceSection({
  eyebrow,
  title,
  description,
  options,
  selectedId,
  onSelect,
}: {
  eyebrow: string;
  title: string;
  description: string;
  options: SelectOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const current = options.find((item) => item.id === selectedId) ?? options[0];

  return (
    <section className="py-20">
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-10 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="soft-card p-3">
            <div className="max-h-[520px] space-y-2 overflow-y-auto pr-1">
              {options.map((option, index) => {
                const active = option.id === current.id;

                return (
                  <Reveal key={option.id} delay={index * 35}>
                    <button
                      type="button"
                      onClick={() => onSelect(option.id)}
                      className={cn(
                        "w-full rounded-2xl p-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                        active
                          ? "bg-primary text-white shadow-pop"
                          : "bg-white/80 text-ink hover:-translate-y-0.5 hover:bg-white",
                      )}
                      aria-pressed={active}
                      aria-label={option.label}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={cn(
                            "grid h-10 w-10 shrink-0 place-items-center rounded-2xl",
                            active ? "bg-white/15 text-white" : "bg-primary-soft text-primary",
                          )}
                        >
                          {option.icon}
                        </span>
                        <span className="block min-w-0">
                          <span className="block text-sm font-semibold">{option.label}</span>
                          <span
                            className={cn(
                              "mt-1 block text-xs leading-5",
                              active ? "text-white/80" : "text-ink-soft",
                            )}
                          >
                            {option.summary}
                          </span>
                        </span>
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal className="min-w-0">
            <div
              className="soft-card grid gap-6 p-6 md:p-8"
              role="region"
              aria-live="polite"
              aria-label={`${eyebrow} details`}
            >
              <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-primary-soft text-primary">
                      {current.icon}
                    </span>
                    {current.label}
                  </div>
                  <h3 className="mt-4 text-3xl font-bold tracking-tight text-ink">
                    {current.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">{current.summary}</p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {current.bullets.map((bullet) => (
                      <div
                        key={bullet}
                        className="flex items-start gap-3 rounded-2xl bg-surface p-4"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <p className="text-sm leading-6 text-ink">{bullet}</p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-5 text-sm leading-6 text-ink-soft">{current.note}</p>
                </div>

                <div className="rounded-[1.75rem] border border-border bg-white p-4 shadow-card">
                  <div className="overflow-hidden rounded-[1.4rem] border border-border bg-surface">
                    <img
                      src={current.visualImage}
                      alt={current.visualAlt}
                      className="h-full w-full object-contain bg-white"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-4 text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    {current.visualLabel}
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {current.visualStats.map((stat) => (
                      <div key={stat.label} className="rounded-2xl bg-surface p-3">
                        <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                          {stat.label}
                        </div>
                        <div className="mt-1 text-sm font-semibold text-ink">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StorySectionBlock({ section }: { section: StorySection }) {
  return (
    <section className="py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
          <div className={cn("lg:col-span-7", section.reverse && "lg:order-2")}>
            <div className="grid gap-5 md:grid-cols-2 md:items-start">
              <Reveal>
                <DetailCard title={section.challengeTitle} items={section.challengeBullets} />
              </Reveal>
              <Reveal delay={60}>
                <DetailCard title={section.solutionTitle} items={section.solutionBullets} />
              </Reveal>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2 md:items-start">
              <Reveal delay={90}>
                <DetailCard title={section.modulesTitle} items={section.modules} />
              </Reveal>
              <Reveal delay={120}>
                <DetailCard title={section.benefitsTitle} items={section.benefits} />
              </Reveal>
            </div>
          </div>

          <div className={cn("lg:col-span-5", section.reverse && "lg:order-1")}>
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-5 shadow-float">
                <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface">
                  <img
                    src={section.visualImage}
                    alt={section.visualAlt}
                    className="h-auto w-full object-contain bg-white"
                    loading="lazy"
                  />
                </div>

                <div className="mt-4 text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  {section.visualLabel}
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {section.visualStats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl bg-surface p-3">
                      <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {stat.label}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-ink">{stat.value}</div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-sm leading-6 text-ink-soft">
                  Customer outcomes may vary. This visual uses sample data only and is not a
                  customer record.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CustomersPage() {
  usePageMeta(pageTitle, pageDescription, "/customers");

  const [selectedBusinessType, setSelectedBusinessType] = useState(businessTypes[0].id);
  const [selectedChallenge, setSelectedChallenge] = useState(customerChallenges[0].id);
  const [selectedRole, setSelectedRole] = useState(roles[0].id);
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0].id);

  const currentChallenge =
    customerChallenges.find((item) => item.id === selectedChallenge) ?? customerChallenges[0];
  const currentRole = roles.find((item) => item.id === selectedRole) ?? roles[0];
  const currentIndustry = industries.find((item) => item.id === selectedIndustry) ?? industries[0];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <TopNavbar />
      <MainNavbar />

      <main className="overflow-x-clip">
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x grid gap-10 py-12 lg:grid-cols-12 lg:items-center lg:py-16">
            <div className="lg:col-span-6 fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Trusted by Growing Businesses
              </span>
              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Businesses That Choose Altroz HRMS
              </h1>
              <p className="mt-4 max-w-xl text-base text-ink-soft">
                Altroz HRMS helps growing businesses simplify attendance, payroll, leave management,
                employee records, reporting, and daily HR operations through one centralized
                platform.
              </p>
              <p className="mt-3 max-w-xl text-base text-ink-soft">
                The platform is designed to support startups, SMEs, multi-branch businesses,
                manufacturing companies, healthcare organizations, retail teams, educational
                institutions, logistics companies, corporate offices, and other organizations
                looking to reduce manual HR work.
              </p>
              <p className="mt-3 max-w-xl text-base text-ink-soft">
                From attendance tracking and salary processing to employee self-service and
                workforce reporting, Altroz HRMS helps businesses create more structured, efficient,
                and transparent HR processes.
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
                {[
                  { label: "Centralized HR", value: "One place for records" },
                  { label: "Reduced Manual Work", value: "Fewer routine tasks" },
                  { label: "Structured Reporting", value: "Clearer review flows" },
                ].map((item, index) => (
                  <Reveal key={item.label} delay={index * 45}>
                    <div className="soft-card p-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {item.label}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-ink">{item.value}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <Reveal>
                <div className="relative mx-auto max-w-2xl">
                  <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
                  <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-5 shadow-float">
                    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                      <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface">
                        <img
                          src={modelScreenshots.workforceDashboard}
                          alt="Altroz HRMS workforce dashboard visual"
                          className="block h-auto w-full object-contain bg-white"
                          loading="eager"
                        />
                      </div>

                      <div className="grid gap-3">
                        {customerValueCards.map((card, index) => (
                          <div
                            key={card.label}
                            className={cn(
                              "rounded-2xl border border-border bg-surface p-4 shadow-card",
                              index % 2 === 0 && "float-slow",
                            )}
                          >
                            <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                              {card.label}
                            </div>
                            <p className="mt-2 text-sm leading-6 text-ink-soft">{card.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <Reveal delay={40}>
                        <div className="rounded-2xl bg-primary/5 p-4">
                          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                            <Clock3 className="h-4 w-4" />
                            Attendance
                          </div>
                          <p className="mt-2 text-sm text-ink-soft">
                            Visible, structured, and easier to review.
                          </p>
                        </div>
                      </Reveal>
                      <Reveal delay={80}>
                        <div className="rounded-2xl bg-[#ecfdf3] p-4">
                          <div className="flex items-center gap-2 text-sm font-semibold text-success">
                            <Wallet className="h-4 w-4" />
                            Payroll
                          </div>
                          <p className="mt-2 text-sm text-ink-soft">
                            Connected to salary inputs and reports.
                          </p>
                        </div>
                      </Reveal>
                      <Reveal delay={120}>
                        <div className="rounded-2xl bg-primary-soft p-4">
                          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                            <LayoutDashboard className="h-4 w-4" />
                            Visibility
                          </div>
                          <p className="mt-2 text-sm text-ink-soft">
                            Dashboards and summaries in one view.
                          </p>
                        </div>
                      </Reveal>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="customer-logos" className="bg-surface py-20 scroll-mt-24">
          <div className="container-x">
            <SectionHeading
              eyebrow="Our Customers"
              title="Verified customer logos"
              description="Altroz HRMS is built to support organizations with different workforce structures, business models, locations, and HR requirements."
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {approvedCustomerLogos.map((logo, index) => (
                <Reveal key={logo.name} delay={index * 30}>
                  <figure className="soft-card flex h-36 items-center justify-center rounded-[1.4rem] px-5 py-4">
                    <img
                      src={logo.src}
                      alt={logo.name}
                      loading="lazy"
                      decoding="async"
                      className="max-h-20 w-full max-w-full object-contain"
                    />
                  </figure>
                </Reveal>
              ))}
            </div>

            <p className="mt-6 max-w-3xl text-sm leading-6 text-ink-soft">
              Customer names, logos, testimonials, and case studies are published only after
              receiving permission.
            </p>
          </div>
        </section>

        <ChoiceSection
          eyebrow="Business Types We Support"
          title="Supporting Different Types of Businesses"
          description="Select a business type to see the kind of HR workflow Altroz HRMS can help support."
          options={businessTypes}
          selectedId={selectedBusinessType}
          onSelect={setSelectedBusinessType}
        />

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Customer Challenges"
              title="How Altroz HRMS Helps Businesses"
              description="Every growing organization faces different HR challenges. Altroz HRMS helps move scattered manual work into one centralized platform."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <div
                  className="flex flex-wrap gap-2"
                  role="tablist"
                  aria-label="Customer challenges"
                >
                  {customerChallenges.map((challenge) => {
                    const active = challenge.id === currentChallenge.id;

                    return (
                      <button
                        key={challenge.id}
                        type="button"
                        onClick={() => setSelectedChallenge(challenge.id)}
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                          active
                            ? "border-primary bg-primary text-white shadow-pop"
                            : "border-border bg-white text-ink hover:-translate-y-0.5 hover:text-primary",
                        )}
                        aria-pressed={active}
                      >
                        {challenge.icon}
                        {challenge.label}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <Reveal>
                    <DetailCard
                      title="Challenge description"
                      items={[currentChallenge.summary, ...currentChallenge.bullets]}
                    />
                  </Reveal>
                  <Reveal delay={60}>
                    <DetailCard
                      title="Altroz HRMS solution"
                      items={[
                        currentChallenge.note,
                        "Depending on enabled modules, Altroz HRMS can help centralize the workflow and reduce manual follow-up.",
                      ]}
                    />
                  </Reveal>
                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <Reveal delay={90}>
                    <DetailCard
                      title="Relevant modules"
                      items={
                        currentChallenge.modules ?? [
                          "Structured workflow support",
                          "Centralized record keeping",
                          "Role-based access",
                        ]
                      }
                    />
                  </Reveal>
                  <Reveal delay={120}>
                    <DetailCard
                      title="Business benefits"
                      items={
                        currentChallenge.benefits ?? [
                          "Better visibility into the selected workflow",
                          "Less repetitive manual work",
                          "More structured HR operations",
                        ]
                      }
                    />
                  </Reveal>
                </div>
              </div>

              <div className="lg:col-span-5">
                <Reveal>
                  <div className="relative rounded-[2rem] border border-border bg-white p-4 shadow-float sm:p-5">
                    <div className="border border-border bg-surface">
                      <img
                        src={currentChallenge.visualImage}
                        alt={currentChallenge.visualAlt}
                        className="block h-auto w-full bg-white object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-4 text-xs font-bold uppercase tracking-[0.22em] text-primary">
                      {currentChallenge.visualLabel}
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                      {currentChallenge.visualStats.map((stat) => (
                        <div key={stat.label} className="rounded-2xl bg-surface p-3">
                          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                            {stat.label}
                          </div>
                          <div className="mt-1 text-sm font-semibold text-ink">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <StorySectionBlock section={attendanceStory} />
        <StorySectionBlock section={payrollStory} />
        <StorySectionBlock section={leaveStory} />
        <StorySectionBlock section={employeeRecordsStory} />
        <StorySectionBlock section={reportingStory} />

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Comparison"
              title="Common HR Challenges and Altroz HRMS Solutions"
              description="This view keeps the page practical and easy to scan on desktop and mobile."
            />

            <Reveal className="mt-10">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-float">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-border">
                    <thead className="bg-surface">
                      <tr>
                        <th
                          scope="col"
                          className="px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.2em] text-primary"
                        >
                          Business Challenge
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.2em] text-primary"
                        >
                          Altroz HRMS Solution
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {challengeComparison.map((row, index) => (
                        <tr
                          key={row.challenge}
                          className={index % 2 === 0 ? "bg-white" : "bg-surface/60"}
                        >
                          <td className="px-5 py-4 align-top">
                            <div className="flex items-start gap-3">
                              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                                <ArrowRight className="h-4 w-4" />
                              </span>
                              <span className="text-sm font-medium text-ink">{row.challenge}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 align-top">
                            <div className="flex items-start gap-3">
                              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#ecfdf3] text-success">
                                <CheckCircle2 className="h-4 w-4" />
                              </span>
                              <span className="text-sm font-medium leading-6 text-ink">
                                {row.solution}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Before and After"
              title="From Manual HR Processes to Centralized Workforce Management"
              description="A side-by-side view helps teams see how Altroz HRMS can replace scattered manual work with a more connected workflow."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Reveal>
                <div className="soft-card p-6">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    Before
                  </div>
                  <div className="mt-4 space-y-2.5">
                    {beforePoints.map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl bg-surface p-3">
                        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white text-ink-soft shadow-sm">
                          <Clock3 className="h-4 w-4" />
                        </span>
                        <span className="text-sm leading-6 text-ink">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div className="soft-card p-6">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    With Altroz HRMS
                  </div>
                  <div className="mt-4 space-y-2.5">
                    {afterPoints.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl bg-[#ecfdf3]/70 p-3"
                      >
                        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white text-success shadow-sm">
                          <CheckCircle2 className="h-4 w-4" />
                        </span>
                        <span className="text-sm leading-6 text-ink">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="By Role"
              title="A Better Experience for Every User"
              description="Select a role to preview how the same platform can feel different depending on permissions and responsibilities."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
              <div className="soft-card p-3">
                <div className="space-y-2">
                  {roles.map((role, index) => {
                    const active = role.id === currentRole.id;

                    return (
                      <Reveal key={role.id} delay={index * 35}>
                        <button
                          type="button"
                          onClick={() => setSelectedRole(role.id)}
                          className={cn(
                            "w-full rounded-2xl p-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                            active
                              ? "bg-primary text-white shadow-pop"
                              : "bg-white/80 text-ink hover:-translate-y-0.5 hover:bg-white",
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
                              {role.icon}
                            </span>
                            <span className="block min-w-0">
                              <span className="block text-sm font-semibold">{role.label}</span>
                              <span
                                className={cn(
                                  "mt-1 block text-xs leading-5",
                                  active ? "text-white/80" : "text-ink-soft",
                                )}
                              >
                                {role.summary}
                              </span>
                            </span>
                          </div>
                        </button>
                      </Reveal>
                    );
                  })}
                </div>
              </div>

              <Reveal className="min-w-0">
                <div className="soft-card p-6 md:p-8" aria-live="polite">
                  <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-primary-soft text-primary">
                          {currentRole.icon}
                        </span>
                        {currentRole.label}
                      </div>
                      <h3 className="mt-4 text-3xl font-bold tracking-tight text-ink">
                        {currentRole.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-ink-soft">{currentRole.summary}</p>

                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        {currentRole.bullets.map((bullet) => (
                          <div key={bullet} className="rounded-2xl bg-surface p-4">
                            <div className="flex items-start gap-3">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                              <p className="text-sm leading-6 text-ink">{bullet}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <p className="mt-5 text-sm leading-6 text-ink-soft">{currentRole.note}</p>
                    </div>

                    <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                      <div className="overflow-hidden rounded-[1.4rem] border border-border bg-surface">
                        <img
                          src={currentRole.visualImage}
                          alt={currentRole.visualAlt}
                          className="h-full w-full object-contain bg-white"
                          loading="lazy"
                        />
                      </div>
                      <div className="mt-4 text-xs font-bold uppercase tracking-[0.22em] text-primary">
                        {currentRole.visualLabel}
                      </div>
                      <div className="mt-3 grid gap-3 sm:grid-cols-3">
                        {currentRole.visualStats.map((stat) => (
                          <div key={stat.label} className="rounded-2xl bg-surface p-3">
                            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                              {stat.label}
                            </div>
                            <div className="mt-1 text-sm font-semibold text-ink">{stat.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Customer Outcomes"
              title="Customer Outcomes Altroz HRMS Is Designed to Support"
              description="The page stays focused on practical outcomes without making guarantees or percentage claims."
              align="center"
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {outcomeCards.map((item, index) => (
                <Reveal key={item} delay={index * 35}>
                  <article className="soft-card h-full p-5">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                      <BadgeCheck className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{item}</h3>
                  </article>
                </Reveal>
              ))}
            </div>

            <p className="mt-6 text-sm font-medium text-ink-soft">
              Actual outcomes depend on product configuration, implementation, internal processes,
              and usage.
            </p>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Industry Coverage"
              title="Helping Businesses Across Different Industries"
              description="Choose an industry to see the kind of challenge Altroz HRMS can help support."
            />

            <div
              className="mt-10 flex gap-2 overflow-x-auto pb-2"
              role="tablist"
              aria-label="Industry selector"
            >
              {industries.map((industry) => {
                const active = industry.id === currentIndustry.id;

                return (
                  <button
                    key={industry.id}
                    type="button"
                    onClick={() => setSelectedIndustry(industry.id)}
                    className={cn(
                      "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      active
                        ? "border-primary bg-primary text-white shadow-pop"
                        : "border-border bg-white text-ink hover:text-primary",
                    )}
                    aria-pressed={active}
                  >
                    {industry.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <Reveal>
                  <div className="soft-card p-6 md:p-8" aria-live="polite">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-primary-soft text-primary">
                        {currentIndustry.icon}
                      </span>
                      {currentIndustry.title}
                    </div>
                    <h3 className="mt-4 text-3xl font-bold tracking-tight text-ink">
                      {currentIndustry.summary}
                    </h3>

                    <div className="mt-6 grid gap-3">
                      {currentIndustry.bullets.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-2xl bg-surface p-4"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                          <p className="text-sm leading-6 text-ink">{item}</p>
                        </div>
                      ))}
                    </div>

                    <p className="mt-5 text-sm leading-6 text-ink-soft">{currentIndustry.note}</p>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-5">
                <Reveal>
                  <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-5 shadow-float">
                    <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface">
                      <img
                        src={currentIndustry.visualImage}
                        alt={currentIndustry.visualAlt}
                        className="h-full w-full object-contain bg-white"
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-4 text-xs font-bold uppercase tracking-[0.22em] text-primary">
                      {currentIndustry.visualLabel}
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                      {currentIndustry.visualStats.map((stat) => (
                        <div key={stat.label} className="rounded-2xl bg-surface p-3">
                          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                            {stat.label}
                          </div>
                          <div className="mt-1 text-sm font-semibold text-ink">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Customer Journey"
              title="How Businesses Can Get Started with Altroz HRMS"
              description="The exact process depends on business requirements and selected modules."
              align="center"
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-7">
              {customerJourneySteps.map((step, index) => (
                <Reveal key={step} delay={index * 45}>
                  <article className="soft-card relative h-full p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary">
                        {index + 1}
                      </div>
                      {index < customerJourneySteps.length - 1 ? (
                        <ChevronRight className="hidden h-4 w-4 text-primary xl:block" />
                      ) : null}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{step}</h3>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Customer Stories"
              title="Customer Stories"
              description="Approved customer case studies are added only after official review and permission."
            />

            <div className="mt-10">
              {approvedCaseStudies.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {/* Approved case studies will be rendered here once they are available. */}
                </div>
              ) : (
                <Reveal>
                  <div className="rounded-[2rem] border border-border bg-white p-8 shadow-float">
                    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                      <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                          <BadgeCheck className="h-3.5 w-3.5" />
                          Empty state
                        </div>
                        <h3 className="text-2xl font-bold text-ink">
                          Customer case studies will be added after official approval.
                        </h3>
                        <p className="text-sm leading-6 text-ink-soft">
                          Each published story will include verified business challenges,
                          implemented modules, and approved customer outcomes.
                        </p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          "Verified challenge summary",
                          "Approved module list",
                          "Customer quote or narrative",
                          "Outcome notes after approval",
                        ].map((item) => (
                          <div key={item} className="rounded-2xl bg-surface p-4">
                            <div className="flex items-start gap-3">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                              <span className="text-sm leading-6 text-ink">{item}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Why Choose Altroz"
              title="Why Businesses Choose Altroz HRMS"
              description="This checklist stays limited to supported capabilities already confirmed in the repository."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {whyBusinessesChoose.map((item, index) => (
                    <Reveal key={item} delay={index * 25}>
                      <article className="soft-card h-full p-5">
                        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                          <BadgeCheck className="h-5 w-5" />
                        </div>
                        <h3 className="mt-4 text-base font-bold text-ink">{item}</h3>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <Reveal>
                  <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-5 shadow-float">
                    <div className="pointer-events-none absolute -right-10 top-10 h-28 w-28 rounded-full bg-primary/10 blur-3xl" />
                    <div className="pointer-events-none absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-success/10 blur-3xl" />

                    <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-surface">
                      <img
                        src={modelScreenshots.workforceDashboard}
                        alt="Altroz HRMS platform overview"
                        className="h-full w-full object-contain bg-white"
                        loading="lazy"
                      />
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl bg-primary/5 p-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                          <FileBarChart2 className="h-4 w-4" />
                          Reports and analytics
                        </div>
                        <p className="mt-2 text-sm text-ink-soft">
                          Useful for teams that want clearer reporting and workforce review.
                        </p>
                      </div>
                      <div className="rounded-2xl bg-[#ecfdf3] p-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-success">
                          <Workflow className="h-4 w-4" />
                          Practical workflows
                        </div>
                        <p className="mt-2 text-sm text-ink-soft">
                          Helps align approvals, records, and routine HR operations.
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently Asked Questions"
              description="This accordion keeps common customer questions easy to scan and accessible by keyboard."
              align="center"
            />

            <div className="mx-auto mt-8 max-w-4xl">
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

        <section className="py-20">
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
                    Simplify Your HR Operations with Altroz HRMS
                  </h2>
                  <p className="mt-4 max-w-2xl text-ink-soft">
                    Move from manual attendance, payroll, leave, employee records, and reporting to
                    one centralized HRMS platform.
                  </p>
                  <p className="mt-3 max-w-2xl text-ink-soft">
                    Discover how Altroz HRMS can help your business reduce administrative work,
                    improve workforce visibility, and create more efficient HR processes.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href="/company/book-demo" className="btn-primary">
                      Book Your Free Demo Today
                    </a>
                    <a href="/company/contact-us" className="btn-outline">
                      Talk to Our Team
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
