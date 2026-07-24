import { ROUTES } from "@/routes/routeConfig.js";

function normalizeWhatsAppNumber(rawNumber: string) {
  const digits = rawNumber.replace(/\D/g, "");

  if (digits.startsWith("91") && digits.length === 12) {
    return digits;
  }

  if (digits.startsWith("0") && digits.length === 11) {
    return `91${digits.slice(1)}`;
  }

  if (digits.length === 10) {
    return `91${digits}`;
  }

  return digits;
}

export const contactConfig = {
  companyName: "Altroz Technologies Pvt. Ltd.",
  whatsappNumber: normalizeWhatsAppNumber(import.meta.env.VITE_WHATSAPP_NUMBER ?? "08446337392"),
  whatsappMessage: "Hi, I'd like to know more about Altroz HRMS.",
  routes: {
    contact: ROUTES.contact,
    bookDemo: ROUTES.bookDemo,
    support: ROUTES.support,
    partner: ROUTES.partner,
    careers: ROUTES.careers,
    privacyPolicy: ROUTES.privacyPolicy,
  },
  missingVerifiedDetailsNote:
    "Direct phone, email, office address, and business hours are not published in the repository, so they are intentionally omitted here.",
} as const;

export function buildWhatsAppHref(message: string) {
  return `https://wa.me/${contactConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const whatsappHref = buildWhatsAppHref(contactConfig.whatsappMessage);

export const contactMethods = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    description: "Start a chat with the verified WhatsApp channel.",
    href: whatsappHref,
    icon: "messageSquare",
  },
  {
    id: "book-demo",
    label: "Book a Demo",
    description: "Open the product demo workflow for a guided walkthrough.",
    href: contactConfig.routes.bookDemo,
    icon: "calendarDays",
  },
  {
    id: "support",
    label: "Support",
    description: "Use the support page for customer help and product guidance.",
    href: contactConfig.routes.support,
    icon: "headphones",
  },
  {
    id: "partner",
    label: "Partner Enquiry",
    description: "Explore partnership, referral, and consulting conversations.",
    href: contactConfig.routes.partner,
    icon: "handshake",
  },
  {
    id: "careers",
    label: "Careers",
    description: "Visit the careers page for hiring and recruitment questions.",
    href: contactConfig.routes.careers,
    icon: "briefcase",
  },
];

export const serviceOptions = [
  {
    id: "product-demo",
    label: "Product Demonstration",
    enquiryType: "Demo request",
    description: "See the platform in action and choose the modules you want to explore.",
    modules: ["Complete HRMS", "Attendance", "Payroll Management", "Leave Management"],
  },
  {
    id: "consultation",
    label: "HRMS Consultation",
    enquiryType: "Consultation",
    description: "Discuss current HR challenges, process gaps, and the best next step.",
    modules: ["Employee Management", "HR Automation", "HR Analytics and Reports"],
  },
  {
    id: "attendance",
    label: "Attendance",
    enquiryType: "Attendance enquiry",
    description: "Talk about attendance rules, shifts, and capture workflows.",
    modules: ["Attendance", "Employee Self-Service"],
  },
  {
    id: "payroll",
    label: "Payroll Management",
    enquiryType: "Payroll enquiry",
    description: "Review salary processing, payslips, and payroll reporting needs.",
    modules: ["Payroll Management", "HR Analytics and Reports"],
  },
  {
    id: "employee",
    label: "Employee Management",
    enquiryType: "Employee enquiry",
    description: "Organize employee records, lifecycle information, and approvals.",
    modules: ["Employee Management", "Employee Self-Service"],
  },
  {
    id: "leave",
    label: "Leave Management",
    enquiryType: "Leave enquiry",
    description: "Explore leave requests, balances, policies, and approval flow.",
    modules: ["Leave Management", "Employee Self-Service"],
  },
  {
    id: "implementation",
    label: "HRMS Implementation",
    enquiryType: "Implementation enquiry",
    description: "Plan rollout, setup, and adoption across teams and locations.",
    modules: ["Complete HRMS", "HR Automation", "HR Analytics and Reports"],
  },
  {
    id: "support",
    label: "Technical Support",
    enquiryType: "Technical support",
    description: "Report an issue or ask for help with an existing product setup.",
    modules: ["Support route", "Customer support"],
  },
  {
    id: "customer-support",
    label: "Customer Support",
    enquiryType: "Customer support",
    description: "Ask about existing usage, access, or account coordination.",
    modules: ["Support route", "Employee Self-Service"],
  },
  {
    id: "partner",
    label: "Partner Enquiry",
    enquiryType: "Partner enquiry",
    description: "Explore referral, reseller, consulting, or agency partnership options.",
    modules: ["Partner route", "Complete HRMS"],
  },
  {
    id: "careers",
    label: "Recruitment or Careers",
    enquiryType: "Careers enquiry",
    description: "Send recruitment-related questions or a job application follow-up.",
    modules: ["Careers route"],
  },
  {
    id: "billing",
    label: "Billing or Commercial Enquiry",
    enquiryType: "Commercial enquiry",
    description: "Discuss pricing, commercial terms, or procurement-related questions.",
    modules: ["Complete HRMS"],
  },
  {
    id: "other",
    label: "Other",
    enquiryType: "General enquiry",
    description: "Use this when your question does not fit the categories above.",
    modules: ["General enquiry"],
  },
] as const;

export const industryOptions = [
  "Manufacturing",
  "IT and Software",
  "Healthcare",
  "Construction",
  "Education",
  "Retail",
  "Logistics and Transport",
  "Facility Management",
  "Hospitality",
  "Professional Services",
  "Pharmaceutical",
  "Automobile",
  "Corporate Office",
  "Startup",
  "Other",
] as const;

export const employeeRangeOptions = [
  "1-20",
  "21-50",
  "51-100",
  "101-250",
  "251-500",
  "501-1,000",
  "More than 1,000",
  "Not sure",
] as const;

export const moduleOptions = [
  "Complete HRMS",
  "Employee Management",
  "Attendance",
  "Payroll Management",
  "Leave Management",
  "Recruitment Management",
  "Performance Management",
  "Asset Management",
  "Employee Self-Service",
  "HR Analytics and Reports",
  "HR Automation",
  "Other",
] as const;

export const preferredContactMethods = [
  "Phone Call",
  "Email",
  "WhatsApp",
  "Online Meeting",
] as const;

export const roleOptions = [
  {
    id: "hr-manager",
    label: "HR Managers",
    topics: ["Product fit", "Approval flow", "Attendance and leave"],
  },
  {
    id: "owner",
    label: "Business Owners",
    topics: ["Pricing", "Implementation", "Platform overview"],
  },
  {
    id: "operations",
    label: "Operations Managers",
    topics: ["Shifts", "Attendance", "Team visibility"],
  },
  {
    id: "payroll",
    label: "Payroll Teams",
    topics: ["Salary cycles", "Payslips", "Reports"],
  },
  {
    id: "it",
    label: "IT Teams",
    topics: ["Setup", "Integrations", "Access and security"],
  },
  {
    id: "consultant",
    label: "Consultants",
    topics: ["Partnering", "Client demos", "Support routes"],
  },
] as const;

export const demoModules = [
  {
    id: "employee-management",
    label: "Employee Management",
    description:
      "Explore employee records, departments, reporting structures, and lifecycle information.",
  },
  {
    id: "attendance-management",
    label: "Attendance",
    description:
      "Review attendance capture, shifts, regularization, and attendance reporting workflows.",
  },
  {
    id: "payroll-management",
    label: "Payroll Management",
    description: "See salary processing, earnings and deductions, payslips, and payroll reports.",
  },
  {
    id: "leave-management",
    label: "Leave Management",
    description: "Understand leave balances, request approvals, policies, and holiday calendars.",
  },
  {
    id: "self-service",
    label: "Employee Self-Service",
    description:
      "Show employees their attendance, leave, documents, payslips, and request tracking.",
  },
  {
    id: "analytics",
    label: "HR Analytics and Reports",
    description: "Walk through dashboards and reports that help HR teams make faster decisions.",
  },
] as const;

export const supportRoutes = [
  {
    id: "sales",
    label: "Sales and Product Enquiries",
    description: "For demos, pricing, evaluation, and module questions.",
    href: contactConfig.routes.bookDemo,
  },
  {
    id: "support",
    label: "Existing Customer Support",
    description: "For help with product usage, issues, or implementation coordination.",
    href: contactConfig.routes.support,
  },
  {
    id: "partner",
    label: "Partner Enquiries",
    description: "For consultants, agencies, resellers, and business partners.",
    href: contactConfig.routes.partner,
  },
  {
    id: "careers",
    label: "Careers",
    description: "For job applications and recruitment-related questions.",
    href: contactConfig.routes.careers,
  },
  {
    id: "general",
    label: "General Enquiries",
    description: "For company information and other questions.",
    href: contactConfig.routes.contact,
  },
] as const;

export const faqItems = [
  {
    q: "How can I contact Altroz HRMS?",
    a: "You can use the enquiry form on this page or the verified WhatsApp, demo, support, partner, or careers routes shown above.",
  },
  {
    q: "How do I book a product demo?",
    a: "Use the Book Free Demo button and the existing demo workflow to send your details.",
  },
  {
    q: "What information should I share?",
    a: "Share your company name, industry, team size, required modules, current HR challenges, and preferred contact method.",
  },
  {
    q: "Can I request a demo for specific modules?",
    a: "Yes. You can select the modules you want to explore and the team can shape the discussion around them.",
  },
  {
    q: "Can existing customers use this page for support?",
    a: "Yes. Select Technical Support or Customer Support so the enquiry is routed appropriately.",
  },
  {
    q: "Can I submit a partnership enquiry?",
    a: "Yes. Choose Partner Enquiry or visit the Partner With Us page.",
  },
  {
    q: "Can I contact Altroz HRMS through WhatsApp?",
    a: "Yes. The verified WhatsApp channel is available through the floating button and the WhatsApp contact card.",
  },
  {
    q: "Where is Altroz Technologies located?",
    a: "A complete verified office address is not published in the repository, so the office section is intentionally omitted.",
  },
  {
    q: "When will I receive a response?",
    a: "Our team will review your enquiry and contact you using the details provided.",
  },
] as const;

export type ContactMethod = (typeof contactMethods)[number];
export type ServiceOption = (typeof serviceOptions)[number];
export type RoleOption = (typeof roleOptions)[number];
export type DemoModule = (typeof demoModules)[number];
export type SupportRoute = (typeof supportRoutes)[number];
