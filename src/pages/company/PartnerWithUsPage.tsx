"use client";

import { useEffect, useState, type ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Factory,
  FileBarChart2,
  GraduationCap,
  Handshake,
  LayoutDashboard,
  Mail,
  Megaphone,
  Layers3,
  Package,
  Search,
  ShoppingCart,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
  Target,
  Truck,
  UserCog,
  Users,
  Wallet,
  Workflow,
  MessageSquare,
  Construction,
  Hotel,
  Stethoscope,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import TopNavbar from "@/components/site/TopNavbar";
import { cn } from "@/lib/utils";
import { modelScreenshots } from "@/lib/modelScreenshots";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type IconCard = {
  label: string;
  icon: ReactNode;
};

type OpportunityCard = {
  id: string;
  label: string;
  eyebrow: string;
  summary: string;
  modules: string[];
  conversation: string;
  opportunity: string;
  visual: string;
  visualAlt: string;
};

type BenefitCard = {
  title: string;
  description: string;
  icon: ReactNode;
};

type PartnerType = {
  id: string;
  label: string;
  summary: string;
  relevance: string;
  needs: string[];
  modules: string[];
  activities: string[];
  nextStep: string;
  icon: ReactNode;
};

type PartnerModel = {
  title: string;
  description: string;
  activities: string[];
  icon: ReactNode;
};

type SupportCategory = {
  id: string;
  label: string;
  title: string;
  intro: string;
  items: string[];
  note: string;
};

type TrainingStream = {
  title: string;
  icon: ReactNode;
  intro: string;
  topics: string[];
};

type Industry = {
  id: string;
  label: string;
  title: string;
  challenge: string;
  modules: string[];
  conversation: string;
  opportunity: string;
  icon: ReactNode;
};

type FaqItem = {
  q: string;
  a: string;
};

const pageTitle = "Partner with Altroz HRMS | HRMS Partner Program in Pune";
const pageDescription =
  "Join the Altroz HRMS Partner Program for consultants, IT companies, software providers, agencies, freelancers, and business professionals. Explore referral, sales, training, and partnership opportunities.";

const capabilityStrip: IconCard[] = [
  { label: "Referral opportunities", icon: <Users className="h-4 w-4" /> },
  { label: "Sales assistance", icon: <BarChart3 className="h-4 w-4" /> },
  { label: "Product training", icon: <GraduationCap className="h-4 w-4" /> },
  { label: "Demo support", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Marketing resources", icon: <Megaphone className="h-4 w-4" /> },
  { label: "Customer onboarding", icon: <Workflow className="h-4 w-4" /> },
  { label: "Long-term collaboration", icon: <Handshake className="h-4 w-4" /> },
];

const businessOpportunityCards: OpportunityCard[] = [
  {
    id: "attendance",
    label: "Attendance workflows",
    eyebrow: "Attendance challenge",
    summary:
      "Many businesses still manage attendance through registers, spreadsheets, or disconnected devices.",
    modules: [
      "Biometric attendance integration",
      "GPS attendance",
      "Geolocation attendance",
      "Geofencing",
      "Mobile attendance",
      "QR code attendance",
      "Shift management",
      "Attendance regularization",
    ],
    conversation:
      "A partner can help a client understand how centralized attendance tracking can reduce manual review and improve daily visibility.",
    opportunity:
      "This can open room for attendance projects, device discussions, implementation coordination, and ongoing HR process support.",
    visual: modelScreenshots.attendanceDashboard,
    visualAlt: "Altroz HRMS attendance dashboard illustration",
  },
  {
    id: "payroll",
    label: "Payroll processing",
    eyebrow: "Payroll challenge",
    summary:
      "Payroll teams often need cleaner inputs, clearer deductions, and easier review before salary runs.",
    modules: [
      "Payroll processing",
      "Salary computation",
      "Earnings and deductions",
      "Payslip generation",
      "Overtime inputs",
      "Bonus and arrears",
      "Payroll summaries",
      "Payroll reports",
    ],
    conversation:
      "Partners can show how organized HR data helps payroll teams work with fewer manual checks and better record flow.",
    opportunity:
      "This creates opportunities for payroll software partner conversations and related consulting services.",
    visual: modelScreenshots.salaryReport,
    visualAlt: "Altroz HRMS payroll summary illustration",
  },
  {
    id: "leave",
    label: "Leave and approvals",
    eyebrow: "Leave challenge",
    summary:
      "Leave requests, balances, and approvals can become difficult to manage when they move across email or chat.",
    modules: [
      "Online leave requests",
      "Leave balance visibility",
      "Manager approval workflows",
      "Holiday calendar",
      "Leave policies",
      "Pending approval tracking",
      "Employee self-service",
    ],
    conversation:
      "A partner can connect the discussion to approval workflows and employee self-service, especially for growing teams.",
    opportunity:
      "This can support recurring HRMS referral partner opportunities across departments and branches.",
    visual: modelScreenshots.leaveDashboard,
    visualAlt: "Altroz HRMS leave dashboard illustration",
  },
  {
    id: "records",
    label: "Employee records",
    eyebrow: "Records challenge",
    summary:
      "Scattered employee data makes it harder for HR teams to keep profiles, documents, and updates organized.",
    modules: [
      "Employee profiles",
      "Employment information",
      "Department and designation",
      "Employee documents",
      "Reporting structure",
      "Employment history",
      "Joining and exit records",
    ],
    conversation:
      "Partners can position Altroz HRMS as a centralized place for employee records and related workflow visibility.",
    opportunity:
      "This is useful when a customer wants a cleaner employee management foundation before adding more modules.",
    visual: modelScreenshots.coreHrTable,
    visualAlt: "Altroz HRMS employee records illustration",
  },
  {
    id: "recruitment",
    label: "Recruitment",
    eyebrow: "Hiring challenge",
    summary:
      "Recruitment teams often need a cleaner way to move from candidate review to onboarding and employee records.",
    modules: ["Recruitment", "Employee records", "Employee self-service", "Reports and analytics"],
    conversation:
      "A partner can show how hiring activity, onboarding, and employee data can stay connected in one system.",
    opportunity:
      "This helps agencies and consultants open broader HRMS software partner discussions beyond hiring alone.",
    visual: modelScreenshots.positions,
    visualAlt: "Altroz HRMS recruitment illustration",
  },
  {
    id: "multi-branch",
    label: "Multi-branch visibility",
    eyebrow: "Branch challenge",
    summary:
      "Businesses with multiple locations need a clearer view of attendance, payroll inputs, and workforce records.",
    modules: [
      "Multi-branch employee records",
      "Attendance management",
      "Shift management",
      "Leave workflows",
      "Payroll summaries",
      "Reports and analytics",
      "Employee self-service",
    ],
    conversation:
      "Partners can help customers see how a centralized system supports managers across branches and departments.",
    opportunity:
      "This often creates longer-term service conversations with growing organizations and distributed teams.",
    visual: modelScreenshots.workforceDashboard,
    visualAlt: "Altroz HRMS workforce dashboard illustration",
  },
];

const partnerBenefits: BenefitCard[] = [
  {
    title: "New business opportunities",
    description:
      "Add HRMS referrals, consulting, product demonstrations, onboarding coordination, or related services to your existing portfolio.",
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
  {
    title: "Partner commission opportunities",
    description:
      "Eligible partners may receive commission or referral benefits for approved opportunities, subject to the applicable agreement.",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    title: "Product training",
    description:
      "Learn about supported modules, workflows, target industries, and demonstration processes according to the current program.",
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    title: "Sales and pre-sales assistance",
    description:
      "Receive available support during requirement discussions, demonstrations, proposals, and evaluations.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Marketing resources",
    description:
      "Access approved brochures, presentations, product materials, and selected campaign resources where available.",
    icon: <Megaphone className="h-5 w-5" />,
  },
  {
    title: "Customer onboarding assistance",
    description:
      "Coordinate setup and adoption with the relevant teams according to the agreed partner responsibilities.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Long-term collaboration",
    description:
      "Build ongoing business relationships as your customers expand their HR processes and workforce needs.",
    icon: <Handshake className="h-5 w-5" />,
  },
  {
    title: "Product updates",
    description:
      "Stay informed about verified product improvements and partner materials that are officially shared by Altroz.",
    icon: <Sparkles className="h-5 w-5" />,
  },
];

const partnerTypes: PartnerType[] = [
  {
    id: "hr-consultants",
    label: "HR Consultants",
    summary:
      "Help clients structure attendance, payroll, employee management, approvals, and reports.",
    relevance:
      "A partner motion can fit naturally when you already advise clients on HR process design, workforce workflows, or operational structure.",
    needs: [
      "Attendance and leave visibility",
      "Employee records and approvals",
      "Payroll coordination",
    ],
    modules: ["Core HR", "Attendance", "Leave management", "Payroll", "Reports"],
    activities: [
      "Process assessment",
      "Solution introduction",
      "Requirement discussion",
      "Demo coordination",
    ],
    nextStep: "Review the partner models and submit the enquiry form if the fit looks relevant.",
    icon: <UserCog className="h-5 w-5" />,
  },
  {
    id: "it-companies",
    label: "IT Companies",
    summary: "Add HRMS software to an existing business-technology portfolio.",
    relevance:
      "IT providers can extend their service stack with practical HR software for clients that need workplace automation.",
    needs: ["Software integration conversations", "Department visibility", "Reporting"],
    modules: ["Attendance", "Payroll", "Employee self-service", "Reports", "Security"],
    activities: [
      "Solution bundling",
      "Technical discussions",
      "Demo support",
      "Implementation coordination",
    ],
    nextStep: "Explore whether a referral, sales, or technology-oriented motion is a better fit.",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    id: "payroll-consultants",
    label: "Payroll Consultants",
    summary: "Use Altroz HRMS to support payroll conversations, salary inputs, and payroll review.",
    relevance:
      "This can work well if you already assist businesses with compensation structure, salary checks, or payroll process review.",
    needs: ["Clean payroll inputs", "Attendance-linked salary data", "Payslip visibility"],
    modules: ["Payroll", "Attendance", "Reports", "Employee records"],
    activities: [
      "Payroll review",
      "Module explanation",
      "Customer demo support",
      "Proposal coordination",
    ],
    nextStep: "Share your client profile through the partner enquiry form.",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    id: "ca-financial",
    label: "Chartered Accountants",
    summary: "Support clients with payroll, records, and HR technology conversations.",
    relevance:
      "CA and financial practices may find value when clients ask for cleaner employee records, payroll support, and HR process structure.",
    needs: ["Records", "Payroll review", "Approval visibility"],
    modules: ["Core HR", "Payroll", "Reports", "Attendance"],
    activities: ["Client introductions", "Commercial discussion support", "Documentation review"],
    nextStep: "Discuss the most suitable partner model with the partnership team.",
    icon: <FileBarChart2 className="h-5 w-5" />,
  },
  {
    id: "recruitment-agencies",
    label: "Recruitment Agencies",
    summary:
      "Support clients with recruitment, onboarding, employee records, and broader HR processes.",
    relevance:
      "Recruitment businesses can extend the conversation from hiring into employee lifecycle management and HR operations.",
    needs: ["Hiring flow", "Onboarding", "Employee records", "Self-service"],
    modules: ["Recruitment", "Core HR", "Employee self-service", "Reports"],
    activities: ["Lead introduction", "Hiring-to-HR transition discussion", "Customer meetings"],
    nextStep: "Show how recruitment-related needs can connect to a wider HRMS opportunity.",
    icon: <Search className="h-5 w-5" />,
  },
  {
    id: "freelancers",
    label: "Freelancers",
    summary: "Create referral or consulting opportunities through relevant business networks.",
    relevance:
      "Freelancers with strong client relationships, HR knowledge, or B2B networks may fit a referral-oriented motion.",
    needs: ["Business networks", "Industry conversations", "Referral coordination"],
    modules: ["Attendance", "Payroll", "Leave", "Employee records", "Reports"],
    activities: ["Qualified introductions", "Initial discovery support", "Follow-up coordination"],
    nextStep: "Use the enquiry form to share your background and target market.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: "system-integrators",
    label: "System Integrators",
    summary:
      "Coordinate technical delivery, configuration, data preparation, or onboarding where authorized.",
    relevance:
      "Partners with delivery capability can help customers align software, data, and workflow requirements more closely.",
    needs: ["Technical coordination", "Data preparation", "Implementation planning"],
    modules: ["Attendance", "Payroll", "Core HR", "Reports", "Security"],
    activities: ["Technical scoping", "Implementation coordination", "Process alignment"],
    nextStep: "Ask the partnership team which model best matches your delivery scope.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    id: "software-companies",
    label: "Software Companies",
    summary: "Expand your product portfolio with HR technology for growing customers.",
    relevance:
      "This can fit businesses that already sell business software and want to add HR software partner opportunities.",
    needs: ["Portfolio expansion", "Client retention", "Cross-sell conversations"],
    modules: ["Core HR", "Attendance", "Leave management", "Payroll", "Employee self-service"],
    activities: ["Solution packaging", "Account expansion", "Commercial discussion"],
    nextStep: "Review the available partner models and support categories below.",
    icon: <Package className="h-5 w-5" />,
  },
  {
    id: "erp-consultants",
    label: "ERP Consultants",
    summary: "Add HR workflows to broader ERP and business transformation projects.",
    relevance:
      "ERP consultants can often identify where workforce records, attendance, payroll, and reports need a more focused HRMS layer.",
    needs: ["Workflow integration", "Department alignment", "Better HR visibility"],
    modules: ["Core HR", "Attendance", "Payroll", "Reports", "Security"],
    activities: ["Discovery discussions", "Solution fit review", "Commercial alignment"],
    nextStep: "Position the HRMS conversation alongside existing business systems.",
    icon: <Layers3 className="h-5 w-5" />,
  },
  {
    id: "marketing-agencies",
    label: "Digital Marketing Agencies",
    summary:
      "Use your client network to create qualified introductions and demand generation opportunities.",
    relevance:
      "Agencies already speaking to growing businesses may find referral opportunities where HR operations need structure.",
    needs: ["Qualified business leads", "Solution positioning", "Campaign support"],
    modules: ["Attendance", "Payroll", "Employee self-service", "Reports"],
    activities: ["Demand generation", "Lead qualification", "Intro meetings"],
    nextStep: "Discuss how partner marketing support is handled under the current agreement.",
    icon: <Megaphone className="h-5 w-5" />,
  },
  {
    id: "business-consultants",
    label: "Business Consultants",
    summary: "Advise growing businesses that need a structured HR technology foundation.",
    relevance:
      "Consultants can help clients align operations, reporting, and approvals with a practical HRMS setup.",
    needs: ["Process clarity", "Records", "Approvals", "Workforce visibility"],
    modules: ["Core HR", "Attendance", "Leave", "Payroll", "Reports"],
    activities: ["Discovery", "Solution introduction", "Ongoing client guidance"],
    nextStep: "Review the support tabs to see how Altroz can assist the partner journey.",
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
  {
    id: "startup-consultants",
    label: "Startup Consultants",
    summary:
      "Help early-stage teams adopt structure before manual processes become harder to manage.",
    relevance:
      "Startup advisors can position HRMS early so attendance, employee records, and approvals stay organized as the team grows.",
    needs: ["Scalable foundation", "Records", "Attendance", "Leave"],
    modules: ["Core HR", "Attendance", "Leave", "Employee self-service"],
    activities: ["Foundational HR guidance", "Referral support", "Process discussion"],
    nextStep: "Share how many clients in your network need workforce software support.",
    icon: <Target className="h-5 w-5" />,
  },
  {
    id: "bd-professionals",
    label: "Business Development Pros",
    summary:
      "Open HR technology conversations with organizations that need practical workflow support.",
    relevance:
      "BD professionals can add a relevant software conversation to their broader business-development motion.",
    needs: ["Opportunity creation", "Customer introductions", "Solution explanation"],
    modules: ["Attendance", "Payroll", "Leave", "Reports"],
    activities: ["Lead generation", "Meeting coordination", "Opportunity follow-up"],
    nextStep: "Use the enquiry form to describe your network and opportunity profile.",
    icon: <Handshake className="h-5 w-5" />,
  },
];

const partnerModels: PartnerModel[] = [
  {
    title: "Referral Partner",
    description:
      "Introduce qualified businesses to Altroz HRMS and coordinate initial discussions.",
    activities: [
      "Identifying prospects",
      "Sharing approved information",
      "Making introductions",
      "Supporting initial meetings",
    ],
    icon: <Megaphone className="h-5 w-5" />,
  },
  {
    title: "Sales Partner",
    description: "Support lead generation, customer meetings, demonstrations, and follow-up.",
    activities: [
      "Lead generation",
      "Requirement gathering",
      "Product presentations",
      "Commercial coordination",
    ],
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Consulting Partner",
    description: "Help organizations assess HR processes and identify suitable product modules.",
    activities: [
      "Process review",
      "Module mapping",
      "Use-case discussion",
      "Solution fit analysis",
    ],
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
  {
    title: "Technology or Implementation Partner",
    description:
      "Support technical coordination, configuration, data preparation, or onboarding where authorized.",
    activities: [
      "Technical scoping",
      "Data preparation",
      "Configuration guidance",
      "Onboarding coordination",
    ],
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Strategic Business Partner",
    description:
      "Work on selected industries or business-development opportunities subject to agreement.",
    activities: [
      "Segment focus",
      "Joint opportunity review",
      "Commercial alignment",
      "Long-term relationship building",
    ],
    icon: <Handshake className="h-5 w-5" />,
  },
];

const supportCategories: SupportCategory[] = [
  {
    id: "sales",
    label: "Sales Support",
    title: "Support Designed to Help Partners Succeed",
    intro:
      "Sales support may be available to help partners discuss the product accurately and move opportunities forward.",
    items: [
      "Product overview sessions",
      "Customer requirement discussions",
      "Product demonstrations",
      "Pre-sales consultation",
      "Proposal assistance",
      "Commercial coordination",
      "Pricing guidance",
      "Technical discussions",
      "Follow-up assistance",
    ],
    note: "Availability depends on the current partner plan and the approved opportunity.",
  },
  {
    id: "marketing",
    label: "Marketing Support",
    title: "Approved Marketing Resources",
    intro:
      "Marketing support may include partner-approved resources that are officially shared by the Altroz team.",
    items: [
      "Product brochures where available",
      "Sales presentations",
      "Feature summaries",
      "Product documentation",
      "Industry use cases",
      "Proposal templates",
      "Approved email content",
      "Selected campaign resources",
    ],
    note: "Only approved or officially planned resources should be used for partner promotion.",
  },
  {
    id: "technical",
    label: "Technical Support",
    title: "Technical Guidance for Product Understanding",
    intro:
      "Technical support may help partners understand modules, workflows, and implementation coordination more clearly.",
    items: [
      "Product training",
      "Module explanations",
      "Configuration guidance",
      "Customer requirement review",
      "Implementation coordination",
      "Data-preparation guidance",
      "Issue escalation",
      "Product documentation",
    ],
    note: "Support availability may vary according to the partner arrangement and product scope.",
  },
  {
    id: "onboarding",
    label: "Onboarding Support",
    title: "Partner and Customer Onboarding Guidance",
    intro:
      "Onboarding support may help approved partners coordinate the first stages of customer adoption.",
    items: [
      "Customer setup coordination",
      "User-training coordination",
      "Product adoption guidance",
      "Role and module explanations",
      "Handover support",
    ],
    note: "The exact onboarding workflow may vary by partner model and implementation scope.",
  },
];

const commissionPoints = [
  "Commission or referral opportunities may be available for approved and successful business.",
  "Eligible partners can expand into consulting and HR technology conversations.",
  "Business opportunities may include demonstrations, requirement analysis, and onboarding coordination.",
  "Long-term client relationships can create additional service conversations over time.",
  "Cross-selling opportunities may grow as the customer adopts more HR modules.",
  "Commercial terms, payout conditions, taxes, and lead ownership must be confirmed by the partnership team.",
];

const supportAndSales = [
  "Product demonstrations",
  "Customer presentations",
  "Requirement discussions",
  "Proposal assistance",
  "Pricing coordination",
  "Product feature explanations",
  "Technical discussions",
  "Product brochures",
  "Industry use cases",
  "Sales consultation",
  "Follow-up coordination",
];

const trainingStreams: TrainingStream[] = [
  {
    title: "Product training topics",
    icon: <GraduationCap className="h-5 w-5" />,
    intro:
      "Product knowledge helps partners recommend the right modules and represent Altroz HRMS accurately.",
    topics: [
      "Altroz HRMS overview",
      "Employee management",
      "Attendance management",
      "Shift management",
      "Payroll management",
      "Leave management",
      "Recruitment",
      "Performance management",
      "Asset management",
      "Reports and analytics",
      "Employee self-service",
      "Industry-specific use cases",
      "Product demonstration process",
    ],
  },
  {
    title: "Sales training topics",
    icon: <BarChart3 className="h-5 w-5" />,
    intro:
      "Sales guidance can help partners position the solution and manage opportunity conversations more confidently.",
    topics: [
      "Identifying suitable prospects",
      "Understanding business challenges",
      "Explaining product value",
      "Conducting discovery discussions",
      "Coordinating demonstrations",
      "Handling common objections",
      "Supporting proposals",
      "Professional follow-up",
      "Maintaining opportunity information",
    ],
  },
  {
    title: "Demonstration training topics",
    icon: <LayoutDashboard className="h-5 w-5" />,
    intro:
      "Demo training can help partners show relevant workflows without making unsupported claims.",
    topics: [
      "Introducing the platform",
      "Showing relevant modules",
      "Presenting business workflows",
      "Using industry examples",
      "Avoiding unsupported claims",
      "Capturing requirements",
      "Coordinating technical follow-ups",
    ],
  },
];

const industries: Industry[] = [
  {
    id: "manufacturing",
    label: "Manufacturing",
    title: "Manufacturing teams often need stronger shift and attendance visibility.",
    challenge:
      "Shifts, biometric attendance, overtime, payroll inputs, and employee records can become difficult to review manually.",
    modules: ["Attendance", "Shift management", "Payroll", "Core HR", "Reports"],
    conversation:
      "Partners can position Altroz HRMS as a practical way to keep attendance, overtime, and payroll inputs connected.",
    opportunity:
      "This can create valuable HRMS partner opportunities with plant operations, factories, and manufacturing groups.",
    icon: <Factory className="h-5 w-5" />,
  },
  {
    id: "it-software",
    label: "IT and Software",
    title: "IT and software companies often want flexible workforce visibility.",
    challenge:
      "Flexible attendance, leave, employee self-service, performance, and reports can all matter in the same conversation.",
    modules: ["Attendance", "Leave", "Employee self-service", "Performance management", "Reports"],
    conversation:
      "Partners can explain how Altroz HRMS supports more structured HR technology for modern service and software teams.",
    opportunity:
      "This is a natural fit for software partner program conversations and service-led referrals.",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    id: "healthcare",
    label: "Healthcare",
    title: "Healthcare organizations may need round-the-clock workforce structure.",
    challenge:
      "Shift-heavy teams often need attendance, overtime, leave, payroll, and department records in one place.",
    modules: ["Attendance", "Shift management", "Overtime tracking", "Leave", "Payroll", "Reports"],
    conversation:
      "Partners can focus on how a central platform can support busy schedules and clearer workforce review.",
    opportunity:
      "Healthcare discussions can open consulting, referral, and sales-partner opportunities.",
    icon: <Stethoscope className="h-5 w-5" />,
  },
  {
    id: "construction",
    label: "Construction",
    title: "Construction teams often work across projects, sites, and shifts.",
    challenge:
      "Distributed teams can make attendance and approvals harder to review when data lives in separate files.",
    modules: ["Attendance", "Shift management", "Core HR", "Reports", "Approvals"],
    conversation:
      "Partners can show how a centralized system helps site-based teams keep records, attendance, and approvals visible.",
    opportunity:
      "This can support project-based implementation conversations and longer-term account growth.",
    icon: <Construction className="h-5 w-5" />,
  },
  {
    id: "education",
    label: "Education",
    title: "Educational institutions often need tidy staff records and attendance.",
    challenge:
      "Faculty and support teams may need leave, employee records, and payroll support in one structure.",
    modules: ["Core HR", "Attendance", "Leave", "Payroll", "Reports"],
    conversation:
      "Partners can help educational institutions organize employee records and related HR workflows more clearly.",
    opportunity: "Education can be a strong segment for consultant, sales, and referral motions.",
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    id: "retail",
    label: "Retail",
    title: "Retail businesses often need branch-wise attendance and shift control.",
    challenge:
      "Store teams, branches, and payroll inputs need to stay connected even when operations are spread out.",
    modules: ["Attendance", "Shift management", "Leave", "Payroll", "Reports"],
    conversation:
      "Partners can show how branch-wise visibility helps retail operations stay more organized.",
    opportunity:
      "Retail can create useful opportunities for attendance, payroll, and branch management discussions.",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    id: "logistics",
    label: "Logistics",
    title: "Logistics and transport teams often work across multiple locations.",
    challenge:
      "Field staff and multi-location teams need a more centralized way to review workforce records.",
    modules: ["Attendance", "Leave", "Reports", "Core HR"],
    conversation:
      "Partners can focus on location visibility, field staff coordination, and cleaner workforce reporting.",
    opportunity: "This segment often benefits from practical referral or consulting conversations.",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    id: "facility-management",
    label: "Facility Management",
    title: "Facility management teams need coordination across client sites.",
    challenge:
      "Dispersed teams can make shift, attendance, and approval workflows harder to manage.",
    modules: ["Attendance", "Shift management", "Leave", "Reports"],
    conversation:
      "Partners can show how Altroz HRMS supports cleaner reviews for teams that move across sites.",
    opportunity:
      "This creates room for service-led business opportunities and ongoing support conversations.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    id: "hospitality",
    label: "Hospitality",
    title: "Hospitality operations often rely on rotating schedules and branch visibility.",
    challenge:
      "Hotels and service teams need attendance, leave, payroll, and branch records to stay aligned.",
    modules: ["Attendance", "Shift management", "Leave", "Payroll", "Reports"],
    conversation:
      "Partners can position the platform as a way to organize roster-driven workforce processes more clearly.",
    opportunity:
      "Hospitality often creates practical HRMS business opportunities for consultants and referrals.",
    icon: <Hotel className="h-5 w-5" />,
  },
  {
    id: "security-services",
    label: "Security Services",
    title: "Security services teams often need shift-based workforce control.",
    challenge:
      "Multiple locations and rotating staff can make attendance and payroll coordination more complex.",
    modules: ["Attendance", "Shift management", "Payroll", "Reports"],
    conversation:
      "Partners can explain how Altroz HRMS helps keep distributed workforce data easier to review.",
    opportunity:
      "Security service firms can benefit from recurring workforce technology conversations.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    id: "pharmaceutical",
    label: "Pharmaceutical",
    title: "Pharmaceutical businesses often need clear department and shift records.",
    challenge:
      "Attendance, payroll, leave, and employee records need to stay organized across sites and functions.",
    modules: ["Attendance", "Payroll", "Leave", "Core HR", "Reports"],
    conversation:
      "Partners can show how centralized HR operations support workforce visibility for regulated environments.",
    opportunity: "This segment may create both consulting and sales-partner opportunities.",
    icon: <Package className="h-5 w-5" />,
  },
  {
    id: "automobile",
    label: "Automobile",
    title: "Automobile businesses often need coordinated shift and payroll inputs.",
    challenge: "Departments, shifts, and attendance records need to stay aligned as teams grow.",
    modules: ["Attendance", "Shift management", "Payroll", "Reports"],
    conversation:
      "Partners can focus on how the platform reduces manual coordination across teams and locations.",
    opportunity:
      "Automobile groups may open opportunities for employee management and workforce reporting projects.",
    icon: <Factory className="h-5 w-5" />,
  },
  {
    id: "professional-services",
    label: "Professional Services",
    title: "Professional service firms often need clearer internal HR workflows.",
    challenge:
      "Consulting, advisory, and service teams can benefit from cleaner employee records and approvals.",
    modules: ["Core HR", "Attendance", "Leave", "Reports"],
    conversation:
      "Partners can connect the conversation to a more structured HR and operations experience.",
    opportunity: "This can support referral and business-development partner activity.",
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
  {
    id: "corporate-offices",
    label: "Corporate Offices",
    title: "Corporate teams often want central employee and reporting visibility.",
    challenge:
      "Departments, approvals, records, and reporting may all need to stay connected in one platform.",
    modules: ["Core HR", "Attendance", "Leave", "Payroll", "Reports"],
    conversation: "Partners can position Altroz HRMS as a practical HR backbone for office teams.",
    opportunity:
      "Corporate offices can create broader partner opportunities across HR, payroll, and employee services.",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    id: "startups-smes",
    label: "Startups and SMEs",
    title: "Startups and SMEs often need structure before processes become messy.",
    challenge:
      "Small teams often start with spreadsheets and then need a more organized HRMS path as they grow.",
    modules: ["Core HR", "Attendance", "Leave", "Employee self-service", "Reports"],
    conversation:
      "Partners can show how early adoption supports cleaner records, approvals, and workforce visibility.",
    opportunity:
      "This segment can be strong for HR consultant partner program conversations and referrals.",
    icon: <Target className="h-5 w-5" />,
  },
  {
    id: "multi-branch-organizations",
    label: "Multi-Branch Organizations",
    title: "Multi-branch organizations often need one consistent view across locations.",
    challenge:
      "Centralized HR data helps teams compare attendance, payroll inputs, and records across branches.",
    modules: ["Attendance", "Leave", "Payroll", "Reports", "Employee self-service"],
    conversation:
      "Partners can explain how Altroz HRMS supports connected workforce management across locations.",
    opportunity: "This can open long-term HRMS business opportunities as the customer expands.",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
];

const processSteps = [
  "Submit your partnership enquiry",
  "Connect with the partnership team",
  "Understand the partner program",
  "Complete product orientation",
  "Identify qualified opportunities",
  "Coordinate customer discussions",
  "Support customer onboarding",
  "Grow the partnership",
];

const responsibilities = [
  "Represent the product accurately",
  "Avoid unsupported claims",
  "Protect confidential information",
  "Share accurate customer requirements",
  "Follow approved pricing processes",
  "Use approved marketing materials",
  "Avoid promising unsupported customizations",
  "Maintain professional communication",
  "Respect customer privacy",
  "Follow applicable laws and business practices",
  "Coordinate before final commitments",
  "Build long-term customer relationships",
];

const faqItems: FaqItem[] = [
  {
    q: "Who can become an Altroz HRMS partner?",
    a: "HR consultants, payroll professionals, chartered accountants, business consultants, IT companies, software companies, system integrators, ERP consultants, recruitment agencies, marketing agencies, freelancers, startup consultants, and business-development professionals may apply.",
  },
  {
    q: "Is there a fee to join the partner program?",
    a: "Partner fees, deposits, onboarding costs, or minimum commitments depend on the current program. Please contact the partnership team for confirmed terms.",
  },
  {
    q: "How do partners earn commission?",
    a: "Eligible partners may receive commission or referral opportunities for approved customer business according to the applicable partner agreement.",
  },
  {
    q: "What is the commission percentage?",
    a: "Commission structures vary by partner type, product scope, commercial agreement, and customer opportunity. Exact terms must be shared by the partnership team.",
  },
  {
    q: "Does Altroz provide product training?",
    a: "Product and sales training may be available to approved partners according to the selected partner model.",
  },
  {
    q: "Will Altroz support customer demonstrations?",
    a: "Demo support may be available for qualified opportunities based on the partner arrangement and sales process.",
  },
  {
    q: "Can freelancers become partners?",
    a: "Yes. Freelancers with relevant business networks, HR experience, technology knowledge, consulting experience, or sales capability may apply.",
  },
  {
    q: "Can I become a partner from any city?",
    a: "Partnership availability depends on current markets, service capacity, business requirements, and approval.",
  },
  {
    q: "Can partners implement Altroz HRMS?",
    a: "Implementation responsibilities depend on the partner model, training, authorization, technical capability, and formal agreement.",
  },
  {
    q: "Can partners use the Altroz brand?",
    a: "Partners may use only approved brand assets and marketing materials according to applicable branding guidelines and agreements.",
  },
  {
    q: "Does Altroz provide leads to partners?",
    a: "Lead sharing should not be assumed. Lead allocation, ownership, territory, and opportunity registration depend on current partner policies.",
  },
];

const businessTypeOptions = [
  "HR Consulting",
  "Payroll Consulting",
  "IT Services",
  "Software Company",
  "System Integration",
  "Recruitment",
  "Digital Marketing",
  "Financial Services",
  "Business Consulting",
  "Freelance / Independent",
  "Other",
];

const partnerTypeOptions = [
  "Referral Partner",
  "Sales Partner",
  "HR Consultant",
  "Payroll Consultant",
  "Technology Partner",
  "Implementation Partner",
  "Recruitment Partner",
  "Marketing Partner",
  "Strategic Partner",
  "Other",
];

const stateOptions = [
  "Maharashtra",
  "Gujarat",
  "Karnataka",
  "Tamil Nadu",
  "Telangana",
  "Delhi NCR",
  "Rajasthan",
  "Madhya Pradesh",
  "Other",
];

const enquirySchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  businessEmail: z.string().email("Please enter a valid business email."),
  mobileNumber: z.string().min(7, "Please enter a valid mobile number."),
  companyName: z.string().min(2, "Please enter your company name."),
  website: z.string().optional().or(z.literal("")),
  city: z.string().min(2, "Please enter your city."),
  state: z.string().min(1, "Please select your state."),
  businessType: z.string().min(1, "Please select your business type."),
  currentServices: z.string().min(8, "Please briefly describe your current services."),
  yearsOfExperience: z
    .preprocess((value) => {
      if (value === "" || value === null || value === undefined) {
        return undefined;
      }
      const parsed = Number(value);
      return Number.isNaN(parsed) ? value : parsed;
    }, z.number().int("Please enter a whole number.").min(0, "Please enter 0 or more years.").max(60, "Please enter a realistic experience value.").optional())
    .optional(),
  industriesServed: z.string().min(3, "Please tell us which industries you serve."),
  customerNetwork: z.string().min(3, "Please describe your customer network or target market."),
  preferredPartnerType: z.string().min(1, "Please select a preferred partner type."),
  expectedOpportunity: z.string().min(3, "Please tell us what kind of opportunity you expect."),
  message: z.string().optional().or(z.literal("")),
  consent: z
    .boolean()
    .refine((value) => value === true, "Please agree so Altroz Technologies can contact you."),
});

type EnquiryValues = z.infer<typeof enquirySchema>;

const defaultEnquiryValues: EnquiryValues = {
  fullName: "",
  businessEmail: "",
  mobileNumber: "",
  companyName: "",
  website: "",
  city: "",
  state: "",
  businessType: "",
  currentServices: "",
  yearsOfExperience: undefined,
  industriesServed: "",
  customerNetwork: "",
  preferredPartnerType: "",
  expectedOpportunity: "",
  message: "",
  consent: false,
};

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
      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">{eyebrow}</div>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-7 text-ink-soft">{description}</p>
    </div>
  );
}

function PseudoCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4 shadow-card">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
          {icon}
        </div>
        <div>
          <div className="text-sm font-semibold text-ink">{title}</div>
          <p className="mt-1 text-sm leading-6 text-ink-soft">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function PartnerWithUsPage() {
  usePageMeta(pageTitle, pageDescription, "/partner-with-us");

  const [selectedOpportunity, setSelectedOpportunity] = useState(businessOpportunityCards[0].id);
  const [selectedPartnerType, setSelectedPartnerType] = useState(partnerTypes[0].id);
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0].id);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: defaultEnquiryValues,
    mode: "onSubmit",
  });

  const currentOpportunity =
    businessOpportunityCards.find((item) => item.id === selectedOpportunity) ??
    businessOpportunityCards[0];
  const currentPartnerType =
    partnerTypes.find((item) => item.id === selectedPartnerType) ?? partnerTypes[0];
  const currentIndustry = industries.find((item) => item.id === selectedIndustry) ?? industries[0];

  useEffect(() => {
    const draft = window.sessionStorage.getItem("partner-enquiry-draft");
    if (!draft) {
      return;
    }

    try {
      const parsed = JSON.parse(draft) as Partial<EnquiryValues>;
      form.reset({ ...defaultEnquiryValues, ...parsed });
    } catch {
      window.sessionStorage.removeItem("partner-enquiry-draft");
    }
  }, [form]);

  const onSubmit = (values: EnquiryValues) => {
    window.sessionStorage.setItem("partner-enquiry-draft", JSON.stringify(values));
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-4 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x grid gap-10 py-12 lg:grid-cols-12 lg:items-center lg:py-16">
            <div className="lg:col-span-6 fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Grow Your Business with Altroz HRMS
              </span>
              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Become an Altroz HRMS Partner and Build New Business Opportunities
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft">
                Partner with Altroz HRMS and expand your service portfolio by offering modern HR
                technology to your clients.
              </p>
              <p className="mt-3 max-w-xl text-base leading-7 text-ink-soft">
                The Altroz HRMS Partner Program is designed for HR consultants, payroll
                professionals, IT companies, software providers, business consultants, recruitment
                agencies, digital marketing agencies, freelancers, system integrators, and other
                professionals who work with growing businesses.
              </p>
              <p className="mt-3 max-w-xl text-base leading-7 text-ink-soft">
                As an Altroz HRMS Partner, you can introduce clients to a centralized platform for
                attendance, payroll, leave management, employee records, recruitment, reporting, and
                other HR operations while building long-term business opportunities.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#partner-enquiry" className="btn-primary">
                  Become a Partner
                </a>
                <a href="/company/contact-us" className="btn-outline">
                  Talk to Our Partnership Team
                </a>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-white p-4 shadow-card">
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Canonical route
                  </div>
                  <div className="mt-1 text-sm font-semibold text-ink">/partner-with-us</div>
                </div>
                <div className="rounded-2xl border border-border bg-white p-4 shadow-card">
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Program focus
                  </div>
                  <div className="mt-1 text-sm font-semibold text-ink">
                    Referral and sales partner motion
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-white p-4 shadow-card">
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Location
                  </div>
                  <div className="mt-1 text-sm font-semibold text-ink">HRMS Partner in Pune</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-3xl">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/10 via-transparent to-success/10 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-4 md:p-5 shadow-float">
                  <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                    <div className="self-start rounded-[1.5rem] border border-border bg-surface p-4 md:p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                            Partnership network
                          </div>
                          <h2 className="mt-2 text-2xl font-bold text-ink">
                            A practical way to grow alongside Altroz HRMS
                          </h2>
                        </div>
                        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white shadow-sm">
                          <Handshake className="h-6 w-6" />
                        </div>
                      </div>

                      <div className="relative mt-5 rounded-[1.5rem] border border-border bg-white p-4">
                        <div className="grid gap-3 sm:grid-cols-2">
                          {[
                            { label: "HR Consultant", icon: <UserCog className="h-4 w-4" /> },
                            { label: "IT Company", icon: <LayoutDashboard className="h-4 w-4" /> },
                            { label: "Software Partner", icon: <Package className="h-4 w-4" /> },
                            { label: "Payroll Consultant", icon: <Wallet className="h-4 w-4" /> },
                            {
                              label: "Business Consultant",
                              icon: <BriefcaseBusiness className="h-4 w-4" />,
                            },
                            { label: "Recruitment Agency", icon: <Search className="h-4 w-4" /> },
                            { label: "Freelancer", icon: <Users className="h-4 w-4" /> },
                            { label: "System Integrator", icon: <Workflow className="h-4 w-4" /> },
                          ].map((item, index) => (
                            <div
                              key={item.label}
                              style={{ animationDelay: `${index * 40}ms` }}
                              className="fade-up rounded-2xl border border-border bg-surface p-3.5"
                            >
                              <div className="flex min-h-[5.5rem] flex-col items-center justify-center gap-2.5 text-center text-sm font-semibold text-ink">
                                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                                  {item.icon}
                                </span>
                                <span className="max-w-[10rem] whitespace-normal leading-5 break-normal">
                                  {item.label}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 content-start">
                      <div className="rounded-[1.5rem] border border-border bg-surface p-4">
                        <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                          Sample visual
                        </div>
                        <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-white">
                          <img
                            src={modelScreenshots.workforceDashboard}
                            alt="Altroz HRMS workforce dashboard illustration"
                            className="w-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                        {[
                          {
                            title: "Referral Opportunities",
                            description:
                              "Introduce qualified businesses to the right HRMS conversation.",
                            icon: <ArrowRight className="h-4 w-4" />,
                          },
                          {
                            title: "Sales Assistance",
                            description: "Coordinate meetings, demos, and requirement discussions.",
                            icon: <BarChart3 className="h-4 w-4" />,
                          },
                          {
                            title: "Customer Onboarding",
                            description:
                              "Support adoption according to the approved partner arrangement.",
                            icon: <Workflow className="h-4 w-4" />,
                          },
                        ].map((item, index) => (
                          <div
                            key={item.title}
                            style={{ animationDelay: `${index * 45}ms` }}
                            className="fade-up rounded-2xl border border-border bg-white p-4 shadow-card"
                          >
                            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                              {item.icon}
                              {item.title}
                            </div>
                            <p className="mt-2 text-sm leading-6 text-ink-soft">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-[1.5rem] border border-border bg-white p-4 shadow-card">
                        <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                          Partner support
                        </div>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          {[
                            "Product Training",
                            "Demo Assistance",
                            "Sales Support",
                            "Marketing Resources",
                            "Business Opportunities",
                            "Customer Onboarding",
                          ].map((item, index) => (
                            <div
                              key={item}
                              style={{ animationDelay: `${index * 50}ms` }}
                              className="fade-up rounded-2xl bg-primary-soft/40 p-3"
                            >
                              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                                <BadgeCheck className="h-4 w-4" />
                                <span className="min-w-0 leading-5">{item}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container-x">
            <div className="overflow-hidden rounded-2xl border border-border bg-white px-4 py-4 shadow-card md:px-5">
              <div className="flex gap-3 overflow-x-auto pb-1">
                {capabilityStrip.map((item, index) => (
                  <div
                    key={item.label}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className="fade-up inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/15 bg-primary-soft px-4 py-2 text-sm font-semibold text-primary"
                  >
                    {item.icon}
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Grow together"
                title="Grow Together with Altroz HRMS"
                description="At Altroz HRMS, we believe successful partnerships are built on trust, transparency, collaboration, and long-term value."
              />

              <div className="mt-6 rounded-[1.75rem] border border-border bg-white p-6 shadow-card">
                <p className="text-sm leading-7 text-ink-soft">
                  The Partner Program is designed to help consultants, agencies, service providers,
                  and technology companies expand their business by introducing a practical HRMS
                  solution to organizations across different industries.
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  As a partner, you do more than introduce software. You help clients understand
                  their HR challenges, identify suitable modules, improve workforce processes, and
                  adopt structured HR technology.
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  Altroz Technologies aims to support approved partners with product knowledge,
                  demonstrations, sales assistance, marketing resources, and onboarding guidance
                  according to the applicable partner plan.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  "Identify a business need",
                  "Introduce Altroz HRMS",
                  "Understand customer requirements",
                  "Coordinate a product demonstration",
                  "Support proposal and commercial discussion",
                  "Assist with onboarding",
                  "Build a long-term customer relationship",
                ].map((step, index) => (
                  <article
                    key={step}
                    style={{ animationDelay: `${index * 60}ms` }}
                    className="fade-up soft-card p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary">
                        {index + 1}
                      </div>
                      {index < 6 ? (
                        <ChevronRight className="hidden h-4 w-4 text-primary md:block" />
                      ) : null}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{step}</h3>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-14 md:py-16">
          <div className="container-x">
            <SectionHeading
              eyebrow="Opportunity map"
              title="Why Partner with Altroz HRMS?"
              description="Businesses are moving away from manual attendance registers, scattered employee records, spreadsheet-based payroll, and email-driven approvals."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-4">
                <div className="space-y-3">
                  {businessOpportunityCards.map((item, index) => {
                    const active = selectedOpportunity === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedOpportunity(item.id)}
                        aria-pressed={active}
                        className={cn(
                          "w-full rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                          active
                            ? "border-primary bg-primary text-white shadow-pop"
                            : "border-border bg-white text-ink hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary-soft/40",
                        )}
                        style={{ animationDelay: `${index * 40}ms` }}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={cn(
                              "grid h-10 w-10 shrink-0 place-items-center rounded-2xl",
                              active ? "bg-white/15 text-white" : "bg-primary-soft text-primary",
                            )}
                          >
                            <BadgeCheck className="h-5 w-5" />
                          </span>
                          <span className="block">
                            <span className="block text-sm font-semibold">{item.label}</span>
                            <span
                              className={cn(
                                "mt-1 block text-xs leading-5",
                                active ? "text-white/75" : "text-ink-soft",
                              )}
                            >
                              {item.eyebrow}
                            </span>
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="soft-card p-6 md:p-8" aria-live="polite">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                      <Sparkles className="h-3.5 w-3.5" />
                      {currentOpportunity.eyebrow}
                    </div>
                    <h3 className="mt-4 text-3xl font-bold tracking-tight text-ink">
                      {currentOpportunity.summary}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-ink-soft">
                      {currentOpportunity.conversation}
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {currentOpportunity.modules.map((module) => (
                        <div
                          key={module}
                          className="flex items-start gap-3 rounded-2xl bg-surface p-4"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                          <span className="text-sm leading-6 text-ink">{module}</span>
                        </div>
                      ))}
                    </div>

                    <p className="mt-5 text-sm leading-7 text-ink-soft">
                      {currentOpportunity.opportunity}
                    </p>
                  </div>

                  <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                    <div className="overflow-hidden rounded-[1.4rem] border border-border bg-surface">
                      <img
                        src={currentOpportunity.visual}
                        alt={currentOpportunity.visualAlt}
                        className="w-full object-contain bg-white"
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-4 text-xs font-bold uppercase tracking-[0.24em] text-primary">
                      Business opportunity view
                    </div>
                    <div className="mt-3 grid gap-3">
                      {[
                        "Employee management",
                        "Attendance management",
                        "Payroll processing",
                        "Leave workflows",
                        "Recruitment",
                        "Reports and analytics",
                        "Multi-branch workforce management",
                        "Approval workflows",
                      ].map((item, index) => (
                        <div
                          key={item}
                          style={{ animationDelay: `${index * 30}ms` }}
                          className={cn(
                            "fade-up rounded-2xl p-3",
                            index % 2 === 0 ? "bg-primary-soft/35" : "bg-surface",
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-sm">
                              <BadgeCheck className="h-4 w-4" />
                            </div>
                            <span className="text-sm leading-6 text-ink">{item}</span>
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

        <section className="py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Benefits"
                title="Benefits of Becoming an Altroz HRMS Partner"
                description="The layout below keeps the partner story flexible instead of forcing every benefit into the same card grid."
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {partnerBenefits.slice(0, 4).map((item, index) => (
                  <PseudoCard
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[1.75rem] border border-border bg-primary-soft/30 p-6 shadow-card">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Asymmetrical overview
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">
                  A flexible partner path with room to grow
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  Altroz HRMS can support product training, demo support, sales coordination,
                  onboarding assistance, and relationship-building opportunities depending on the
                  selected partner model.
                </p>

                <div className="mt-5 grid gap-3">
                  {partnerBenefits.slice(4).map((item, index) => (
                    <div key={item.title} className="rounded-2xl border border-border bg-white p-4">
                      <div className="flex items-start gap-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-ink">{item.title}</div>
                          <p className="mt-1 text-sm leading-6 text-ink-soft">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-sm leading-6 text-ink-soft">
                  Commission terms depend on the applicable agreement and should be confirmed
                  directly by the partnership team.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Partner fit"
              title="Who Can Become an Altroz HRMS Partner?"
              description="Select a partner type to see why the partnership may be relevant, the likely customer needs, and the next step."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-4">
                <div className="max-h-[34rem] space-y-2 overflow-y-auto pr-1">
                  {partnerTypes.map((item, index) => {
                    const active = item.id === selectedPartnerType;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedPartnerType(item.id)}
                        aria-pressed={active}
                        className={cn(
                          "w-full rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                          active
                            ? "border-primary bg-primary text-white shadow-pop"
                            : "border-border bg-white text-ink hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white",
                        )}
                        style={{ animationDelay: `${index * 35}ms` }}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={cn(
                              "grid h-10 w-10 shrink-0 place-items-center rounded-2xl",
                              active ? "bg-white/15 text-white" : "bg-primary-soft text-primary",
                            )}
                          >
                            {item.icon}
                          </span>
                          <span className="block">
                            <span className="block text-sm font-semibold">{item.label}</span>
                            <span
                              className={cn(
                                "mt-1 block text-xs leading-5",
                                active ? "text-white/75" : "text-ink-soft",
                              )}
                            >
                              {item.summary}
                            </span>
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="soft-card p-6 md:p-8" aria-live="polite">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-primary-soft text-primary">
                        {currentPartnerType.icon}
                      </span>
                      {currentPartnerType.label}
                    </div>
                    <h3 className="mt-4 text-3xl font-bold tracking-tight text-ink">
                      {currentPartnerType.summary}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-ink-soft">
                      {currentPartnerType.relevance}
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl bg-surface p-4">
                        <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                          Typical customer needs
                        </div>
                        <div className="mt-3 space-y-2">
                          {currentPartnerType.needs.map((item) => (
                            <div key={item} className="flex items-start gap-3">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                              <span className="text-sm leading-6 text-ink">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-2xl bg-primary-soft/50 p-4">
                        <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                          Suitable Altroz HRMS modules
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {currentPartnerType.modules.map((item) => (
                            <span
                              key={item}
                              className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-border bg-white p-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Potential partner activities
                      </div>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {currentPartnerType.activities.map((item) => (
                          <div
                            key={item}
                            className="flex items-start gap-3 rounded-xl bg-surface p-3"
                          >
                            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span className="text-sm leading-6 text-ink">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="mt-5 text-sm leading-7 text-ink-soft">
                      {currentPartnerType.nextStep}
                    </p>
                  </div>

                  <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                    <div className="overflow-hidden rounded-[1.4rem] border border-border bg-surface">
                      <img
                        src={modelScreenshots.employeeReport}
                        alt="Altroz HRMS employee report illustration"
                        className="w-full object-contain bg-white"
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-4 text-xs font-bold uppercase tracking-[0.24em] text-primary">
                      Partner types
                    </div>
                    <div className="mt-3 grid gap-3">
                      {[
                        "Referral Partner",
                        "Sales Partner",
                        "HR Consultant",
                        "Payroll Consultant",
                        "Technology Partner",
                        "Implementation Partner",
                        "Recruitment Partner",
                        "Marketing Partner",
                        "Strategic Partner",
                        "Other",
                      ].map((item, index) => (
                        <div
                          key={item}
                          style={{ animationDelay: `${index * 30}ms` }}
                          className={cn(
                            "fade-up rounded-2xl p-3",
                            index % 2 === 0 ? "bg-primary-soft/35" : "bg-surface",
                          )}
                        >
                          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                            <CheckCircle2 className="h-4 w-4 text-success" />
                            {item}
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

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Partner models"
              title="Explore Available Partnership Models"
              description="Available partnership models, responsibilities, territories, and commercial terms are subject to approval and formal agreement."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {partnerModels.map((item, index) => (
                <article key={item.title} className="soft-card p-5">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
                  <div className="mt-4 space-y-2">
                    {item.activities.map((activity) => (
                      <div
                        key={activity}
                        className="flex items-start gap-3 rounded-xl bg-surface p-3"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span className="text-sm leading-6 text-ink">{activity}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-primary/20 bg-primary-soft/40 p-4 text-sm leading-7 text-ink">
              Available partnership models, responsibilities, territories, and commercial terms are
              subject to approval and formal agreement.
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Support"
              title="Support Designed to Help Partners Succeed"
              description="Use the tabs to review the support categories. Smooth tab transitions keep the layout compact on every screen size."
            />

            <div className="mt-10">
              <Tabs defaultValue="sales" className="w-full">
                <TabsList className="flex h-auto w-full flex-wrap gap-2 rounded-[1.25rem] bg-transparent p-0">
                  {supportCategories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-pop"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {supportCategories.map((category) => (
                  <TabsContent key={category.id} value={category.id} className="mt-6">
                    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                      <div className="soft-card p-6 md:p-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                          {category.label}
                        </div>
                        <h3 className="mt-4 text-3xl font-bold tracking-tight text-ink">
                          {category.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-ink-soft">{category.intro}</p>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                          {category.items.map((item) => (
                            <div
                              key={item}
                              className="flex items-start gap-3 rounded-2xl bg-surface p-4"
                            >
                              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <span className="text-sm leading-6 text-ink">{item}</span>
                            </div>
                          ))}
                        </div>

                        <p className="mt-5 text-sm leading-7 text-ink-soft">{category.note}</p>
                      </div>

                      <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                          Support snapshot
                        </div>
                        <div className="mt-3 space-y-3">
                          {[
                            "May include partner enablement sessions",
                            "May include approved collateral where available",
                            "May include requirement and demo coordination",
                            "May include onboarding guidance according to the agreement",
                          ].map((item, index) => (
                            <div key={item} className="rounded-2xl bg-primary-soft/35 p-4">
                              <div className="flex items-start gap-3">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                                <span className="text-sm leading-6 text-ink">{item}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-surface">
                          <img
                            src={modelScreenshots.payrollDashboard}
                            alt="Altroz HRMS payroll dashboard illustration"
                            className="w-full object-contain bg-white"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Opportunities"
                title="Commission and Business Opportunities"
                description="Eligible and approved partners may receive referral or commission opportunities for successful customer business according to the applicable partner agreement."
              />
              <div className="mt-6 rounded-[1.75rem] border border-border bg-white p-6 shadow-card">
                <div className="flex items-start gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                    <Wallet className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-ink">
                      Commission and business growth can vary
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-ink-soft">
                      Use the form below if you want to discuss the Altroz HRMS Partner Program,
                      HRMS Referral Partner opportunities, HRMS Sales Partner opportunities, or
                      other partnership models.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {commissionPoints.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-surface p-4">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span className="text-sm leading-6 text-ink">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-primary/20 bg-primary-soft/40 p-4 text-sm leading-7 text-ink">
                  Commission percentages, payment conditions, renewal benefits, lead ownership,
                  taxes, and payout timelines are shared directly by the partnership team and depend
                  on the official agreement.
                </div>

                <div className="mt-5">
                  <a href="#partner-enquiry" className="btn-primary">
                    Discuss Partner Terms
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[1.75rem] border border-border bg-surface p-6 shadow-card">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Sales and marketing support
                </div>
                <h3 className="mt-2 text-3xl font-bold text-ink">
                  You Build the Relationship. We Help You Present the Solution.
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  Partners can focus on understanding client needs and building relationships while
                  coordinating with the Altroz team for available product and sales assistance.
                </p>

                <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                    <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Typical collaboration points
                    </div>
                    <div className="mt-4 grid gap-3">
                      {supportAndSales.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-2xl bg-surface p-3"
                        >
                          <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span className="text-sm leading-6 text-ink">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                    <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Collaboration visual
                    </div>
                    <div className="mt-4 grid gap-3">
                      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                        <div className="rounded-2xl bg-primary-soft/35 p-4">
                          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                            <Users className="h-4 w-4" />
                            Partner
                          </div>
                          <p className="mt-2 text-sm leading-6 text-ink-soft">
                            Leads the customer relationship and opportunity discovery.
                          </p>
                        </div>
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-white">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                        <div className="rounded-2xl bg-surface p-4">
                          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                            <Handshake className="h-4 w-4 text-primary" />
                            Altroz HRMS
                          </div>
                          <p className="mt-2 text-sm leading-6 text-ink-soft">
                            Supports product discussions, demos, and approved assistance.
                          </p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-border bg-primary-soft/30 p-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                          <Building2 className="h-4 w-4" />
                          Customer opportunity
                        </div>
                        <p className="mt-2 text-sm leading-6 text-ink-soft">
                          All pricing, discounts, product scope, implementation commitments, and
                          custom requirements must be approved through the Altroz process.
                        </p>
                      </div>

                      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                        <img
                          src={modelScreenshots.employeeReport}
                          alt="Altroz HRMS employee report collaboration illustration"
                          className="w-full object-contain bg-white"
                          loading="lazy"
                        />
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
              eyebrow="Training"
              title="Build Product Knowledge and Sales Confidence"
              description="Product knowledge helps partners recommend relevant modules and represent Altroz HRMS accurately."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {trainingStreams.map((stream, index) => (
                <article key={stream.title} className="soft-card p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                    {stream.icon}
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-ink">{stream.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">{stream.intro}</p>

                  <div className="mt-5 space-y-2">
                    {stream.topics.map((topic) => (
                      <div
                        key={topic}
                        className="flex items-start gap-3 rounded-2xl bg-surface p-3"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span className="text-sm leading-6 text-ink">{topic}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7 rounded-[1.75rem] border border-border bg-white p-6 shadow-card">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Partner product training
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">
                  Approved partners may receive product orientation and sales guidance
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  Training may cover product overview, HRMS modules, attendance workflows, payroll
                  workflows, employee management, recruitment, reports and analytics, customer
                  demonstrations, sales positioning, and partner responsibilities.
                </p>
                <div className="mt-5 rounded-2xl border border-primary/20 bg-primary-soft/40 p-4 text-sm leading-7 text-ink">
                  Formal partner certification should only be displayed if an approved certification
                  process, assessment, certificate, and validity policy exist.
                </div>
              </div>

              <div className="lg:col-span-5 rounded-[1.75rem] border border-border bg-white p-6 shadow-card">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Training visual
                </div>
                <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-surface">
                  <img
                    src={modelScreenshots.coreHrTable}
                    alt="Altroz HRMS training and product overview illustration"
                    className="w-full object-contain bg-white"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Industries"
              title="Create Opportunities Across Multiple Industries"
              description="Select an industry to see the common challenge, relevant modules, and a potential customer conversation."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-4">
                <div className="flex gap-2 overflow-x-auto pb-2 lg:max-h-[34rem] lg:flex-wrap lg:overflow-visible">
                  {industries.map((industry, index) => {
                    const active = selectedIndustry === industry.id;
                    return (
                      <button
                        key={industry.id}
                        type="button"
                        onClick={() => setSelectedIndustry(industry.id)}
                        aria-pressed={active}
                        className={cn(
                          "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                          active
                            ? "border-primary bg-primary text-white shadow-pop"
                            : "border-border bg-white text-ink hover:border-primary/30 hover:text-primary",
                        )}
                        style={{ animationDelay: `${index * 25}ms` }}
                      >
                        {industry.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="soft-card p-6 md:p-8" aria-live="polite">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-primary-soft text-primary">
                        {currentIndustry.icon}
                      </span>
                      {currentIndustry.label}
                    </div>
                    <h3 className="mt-4 text-3xl font-bold tracking-tight text-ink">
                      {currentIndustry.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-ink-soft">
                      {currentIndustry.challenge}
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {currentIndustry.modules.map((module) => (
                        <div
                          key={module}
                          className="flex items-start gap-3 rounded-2xl bg-surface p-4"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                          <span className="text-sm leading-6 text-ink">{module}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-2xl border border-border bg-white p-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Potential customer conversation
                      </div>
                      <p className="mt-2 text-sm leading-7 text-ink-soft">
                        {currentIndustry.conversation}
                      </p>
                    </div>

                    <p className="mt-5 text-sm leading-7 text-ink-soft">
                      {currentIndustry.opportunity}
                    </p>
                  </div>

                  <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                    <div className="overflow-hidden rounded-[1.4rem] border border-border bg-surface">
                      <img
                        src={modelScreenshots.workforceDashboard}
                        alt="Altroz HRMS workforce dashboard industry illustration"
                        className="w-full object-contain bg-white"
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-4 text-xs font-bold uppercase tracking-[0.24em] text-primary">
                      Industry opportunity
                    </div>
                    <div className="mt-3 grid gap-3">
                      {[
                        "Manufacturing",
                        "IT and Software",
                        "Healthcare",
                        "Construction",
                        "Education",
                        "Retail",
                        "Logistics and Transport",
                        "Facility Management",
                        "Hospitality",
                        "Security Services",
                        "Pharmaceutical",
                        "Automobile",
                        "Professional Services",
                        "Corporate Offices",
                        "Startups and SMEs",
                        "Multi-Branch Organizations",
                      ].map((item, index) => (
                        <div
                          key={item}
                          style={{ animationDelay: `${index * 25}ms` }}
                          className={cn(
                            "fade-up rounded-2xl p-3",
                            index % 2 === 0 ? "bg-primary-soft/35" : "bg-surface",
                          )}
                        >
                          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                            <BadgeCheck className="h-4 w-4 text-success" />
                            {item}
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

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Process"
              title="How to Become an Altroz HRMS Partner"
              description="The exact process may vary based on the selected partner model and business requirements."
              align="center"
            />

            <ol className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map((step, index) => (
                <li key={step} className="soft-card relative p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-primary-soft text-primary">
                      {index + 1}
                    </div>
                    {index < processSteps.length - 1 ? (
                      <ChevronRight className="hidden h-4 w-4 text-primary xl:block" />
                    ) : null}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{step}</h3>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Expectations"
                title="What We Expect from Our Partners"
                description="Partner conduct, confidentiality, lead ownership, branding, and customer responsibilities should be governed by a formal agreement."
              />
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-3 sm:grid-cols-2">
                {responsibilities.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 shadow-card"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span className="text-sm leading-6 text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="partner-enquiry" className="bg-surface py-20">
          <div className="container-x">
            <div className="rounded-[2.25rem] border border-border bg-white p-6 shadow-float md:p-8">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-4">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Partner enquiry
                  </div>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                    Become an Altroz HRMS Partner
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-ink-soft">
                    Share your background, target market, and preferred partner type so the team can
                    review whether the opportunity is a fit.
                  </p>
                  <div className="mt-6 rounded-2xl border border-primary/20 bg-primary-soft/40 p-4 text-sm leading-7 text-ink">
                    Live submission workflows are not configured in this repository. The form below
                    validates locally, stores a draft in the browser, and gives you a direct handoff
                    to the existing contact flow while backend integration is set up.
                  </div>

                  <div className="mt-6 grid gap-3">
                    <a href="/company/contact-us" className="btn-primary">
                      Talk to Our Partnership Team
                    </a>
                    <a href="/company/book-demo" className="btn-outline">
                      Book a Partnership Meeting
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  {submitted ? (
                    <div className="rounded-[1.75rem] border border-success/30 bg-[#ecfdf3] p-6">
                      <div className="flex items-start gap-3">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-success text-white">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-ink">
                            Your enquiry draft has been saved
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-ink-soft">
                            This repository does not include a live partner submission endpoint yet.
                            Your details have been validated and saved locally in this browser so
                            you can continue through the existing contact flow.
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <Button
                          type="button"
                          className="h-11 rounded-md bg-primary px-5 text-white hover:bg-primary/90"
                          onClick={() => {
                            form.reset(defaultEnquiryValues);
                            setSubmitted(false);
                          }}
                        >
                          Submit another enquiry
                        </Button>
                        <a href="/company/contact-us" className="btn-outline">
                          Continue to Contact Us
                        </a>
                      </div>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <div className="grid gap-5 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input
                                    autoComplete="name"
                                    placeholder="Your full name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="businessEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Business Email</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                      autoComplete="email"
                                      className="pl-9"
                                      placeholder="name@company.com"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="mobileNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Mobile Number</FormLabel>
                                <FormControl>
                                  <Input
                                    autoComplete="tel"
                                    inputMode="tel"
                                    placeholder="Enter mobile number"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                  <Input
                                    autoComplete="organization"
                                    placeholder="Company name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                  <Input
                                    autoComplete="url"
                                    placeholder="https://example.com"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid gap-5 md:grid-cols-2">
                            <FormField
                              control={form.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>City</FormLabel>
                                  <FormControl>
                                    <Input
                                      autoComplete="address-level2"
                                      placeholder="City"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="state"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>State</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select state" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {stateOptions.map((option) => (
                                        <SelectItem key={option} value={option}>
                                          {option}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="businessType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Business Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select business type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {businessTypeOptions.map((option) => (
                                      <SelectItem key={option} value={option}>
                                        {option}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="preferredPartnerType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preferred Partner Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select partner type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {partnerTypeOptions.map((option) => (
                                      <SelectItem key={option} value={option}>
                                        {option}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="yearsOfExperience"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Years of Experience</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min={0}
                                    max={60}
                                    placeholder="e.g. 5"
                                    {...field}
                                    value={field.value ?? ""}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="customerNetwork"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Customer Network or Target Market</FormLabel>
                                <FormControl>
                                  <Textarea
                                    rows={3}
                                    placeholder="Who do you usually work with?"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="currentServices"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Current Services</FormLabel>
                                <FormControl>
                                  <Textarea
                                    rows={4}
                                    placeholder="Describe your current services."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="industriesServed"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Industries Served</FormLabel>
                                <FormControl>
                                  <Textarea
                                    rows={4}
                                    placeholder="Manufacturing, IT, healthcare, retail..."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="expectedOpportunity"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expected Business Opportunity</FormLabel>
                                <FormControl>
                                  <Textarea
                                    rows={4}
                                    placeholder="Tell us about the opportunity you expect."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                  <Textarea
                                    rows={4}
                                    placeholder="Share any additional context."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="consent"
                          render={({ field }) => (
                            <FormItem className="rounded-2xl border border-border bg-surface p-4">
                              <div className="flex items-start gap-3">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                                  />
                                </FormControl>
                                <div>
                                  <FormLabel className="text-sm font-medium text-ink">
                                    I agree that Altroz Technologies may contact me regarding the
                                    Partner Program and related business opportunities.
                                  </FormLabel>
                                  <p className="mt-1 text-xs leading-5 text-ink-soft">
                                    By submitting the form, you consent to be contacted by the
                                    partnership team. Please only share details you are comfortable
                                    providing.
                                  </p>
                                </div>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="text-xs leading-5 text-ink-soft">
                            Live submission is not configured in this repository yet. The current
                            flow validates your details locally and keeps the contact handoff
                            visible.
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <Button
                              type="submit"
                              className="h-11 rounded-md bg-primary px-5 text-white hover:bg-primary/90"
                              disabled={form.formState.isSubmitting}
                            >
                              {form.formState.isSubmitting ? "Saving..." : "Submit Enquiry"}
                            </Button>
                            <a href="/company/contact-us" className="btn-outline">
                              Contact Flow
                            </a>
                          </div>
                        </div>
                      </form>
                    </Form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Advisor value"
                title="Help Clients Make Better HR Technology Decisions"
                description="Businesses often need guidance when evaluating HRMS software. A knowledgeable partner can help clients make better decisions without acting as a legal or compliance authority."
              />
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Understand HR challenges",
                  "Identify important modules",
                  "Review attendance requirements",
                  "Understand payroll workflows",
                  "Organize employee data",
                  "Evaluate approval processes",
                  "Plan branch and shift requirements",
                  "Identify reporting needs",
                  "Prepare for implementation",
                  "Support user adoption",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 shadow-card"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span className="text-sm leading-6 text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Business growth"
                title="Expand Your Services into HR Technology"
                description="Business results depend on partner activity, customer demand, market conditions, program eligibility, and successful sales."
              />
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Add HRMS to your service portfolio",
                  "Strengthen existing client relationships",
                  "Generate new business conversations",
                  "Serve multiple industries",
                  "Support growing organizations",
                  "Build recurring client relationships",
                  "Develop HR technology expertise",
                  "Offer complementary consulting services",
                  "Expand into workforce automation",
                  "Create long-term business opportunities",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-border bg-white p-4 shadow-card"
                  >
                    <div className="flex items-start gap-3">
                      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span className="text-sm leading-6 text-ink">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently Asked Questions"
              description="This accordion keeps common questions accessible and easy to scan."
              align="center"
            />

            <div className="mx-auto mt-10 max-w-4xl">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={item.q}
                    value={`faq-${index}`}
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
              <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl float-slow" />
              <div className="pointer-events-none absolute -bottom-16 left-0 h-56 w-56 rounded-full bg-success/10 blur-3xl float-slow" />

              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Final CTA
                  </div>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                    Let&apos;s Grow Together
                  </h2>
                  <p className="mt-4 max-w-2xl text-ink-soft">
                    Become part of the Altroz HRMS Partner Network and help businesses simplify
                    attendance, payroll, leave, employee management, reporting, and HR operations.
                  </p>
                  <p className="mt-3 max-w-2xl text-ink-soft">
                    Build new business opportunities by offering practical HR technology supported
                    by product knowledge, available sales assistance, and long-term collaboration.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href="#partner-enquiry" className="btn-primary">
                      Become an Altroz HRMS Partner Today
                    </a>
                    <a href="/company/book-demo" className="btn-outline">
                      Book a Partnership Meeting
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Referral Partner",
                      "Sales Partner",
                      "Consulting Partner",
                      "Technology Partner",
                      "Implementation Partner",
                      "Strategic Partner",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className={cn(
                          "rounded-[1.5rem] border border-border p-4 shadow-card",
                          index % 3 === 0 ? "bg-primary-soft/35" : "bg-white",
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-sm">
                            <BadgeCheck className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold leading-5 text-ink break-normal">
                              {item}
                            </div>
                            <div className="text-xs text-ink-soft">Partner network node</div>
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
