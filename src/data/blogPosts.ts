import { ROUTES } from "@/routes/routeConfig.js";

export type BlogTable = {
  headers: string[];
  rows: string[][];
};

export type BlogSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  table?: BlogTable;
};

export type BlogFaq = {
  q: string;
  a: string;
};

export type BlogPost = {
  slug: string;
  href: string;
  title: string;
  category: string;
  description: string;
  meta: string;
  heroSummary: string;
  heroPoints: string[];
  quickAnswer: string;
  keyTakeaways: string[];
  sections: BlogSection[];
  faqs: BlogFaq[];
  relatedLinks: {
    label: string;
    href: string;
    description: string;
  }[];
};

const whatIsHrmsSlug = "what-is-hrms";

export const blogPosts: BlogPost[] = [
  {
    slug: whatIsHrmsSlug,
    href: `${ROUTES.blog}/${whatIsHrmsSlug}`,
    title: "What is HRMS? The Complete Guide for Indian Businesses (2026)",
    category: "HR Software",
    description:
      "A practical guide to HRMS, how it works, and why Indian businesses use it to manage employees, payroll, attendance, leave, performance, and compliance in one place.",
    meta: "By the Altroz HR Editorial Team | Reading time: ~24 minutes | Updated 2026",
    heroSummary:
      "HRMS centralises the employee lifecycle so HR teams can work from one source of truth instead of juggling spreadsheets, biometric exports, emails, and paper files.",
    heroPoints: [
      "Manage the full employee lifecycle in one system",
      "Automate attendance, leave, payroll, and documents",
      "Reduce compliance risk and manual data entry",
      "Give employees self-service access to their own data",
    ],
    quickAnswer:
      "HRMS (Human Resource Management System) is software that helps businesses manage employee records, attendance, leave, payroll, recruitment, performance, and reporting in one place. It replaces disconnected spreadsheets and paperwork with a single workflow.",
    keyTakeaways: [
      "HRMS stands for Human Resource Management System and centralises employee data and HR workflows.",
      "Cloud-based HRMS is the preferred choice for Indian businesses because it works from anywhere and avoids local server management.",
      "Small and mid-sized companies often see the fastest return on investment because manual processes break first as headcount grows.",
      "HRMS helps reduce compliance risk by keeping the data HR needs for PF, ESI, professional tax, and TDS organised and up to date.",
      "Choosing the right HRMS depends on business size, industry, integrations, and ease of use, not just the feature checklist.",
    ],
    sections: [
      {
        id: "why-hrms-matters",
        title: "Why HR Management Is Getting Harder",
        paragraphs: [
          "Ask an HR manager in India what their week looks like, and the answer is often about approvals, attendance mismatches, payroll corrections, and answering the same employee questions again and again.",
          "That does not mean the team is inefficient. It means HR has become one of the most operationally complex functions in a business, but many companies are still trying to run it on tools that were never designed for that level of complexity.",
        ],
        bullets: [
          "Leave approvals get trapped in email threads or chat messages.",
          "Attendance exports do not always match payroll sheets.",
          "Employee documents live in shared drives, inboxes, and paper files.",
          "Founders and managers do not get a real-time view of headcount or attrition.",
        ],
      },
      {
        id: "what-is-hrms",
        title: "What Is HRMS?",
        paragraphs: [
          "HRMS stands for Human Resource Management System. It is usually a cloud-based software application that brings together core HR functions into one digital system.",
          "Instead of storing employee data in one spreadsheet, attendance in another tool, leave requests over email, and payroll in a separate system, HRMS connects those steps into one workflow.",
          "The purpose is simple: reduce manual work, minimise errors, and give both HR teams and employees a faster, more transparent way to handle everyday HR tasks.",
        ],
      },
      {
        id: "how-hrms-works",
        title: "How HRMS Works in Daily HR Operations",
        paragraphs: [
          "A modern HRMS works like the operating system for people processes. When an employee applies for leave, the approval updates the same record used for attendance and payroll. When a new joiner enters their own bank details and PAN, the information flows into the employee profile without retyping.",
          "The result is a single source of truth. HR does not have to reconcile multiple versions of the same data before a payroll run or a management report.",
        ],
        bullets: [
          "Employee applies for leave from a phone or portal.",
          "Manager approves or rejects the request in the same system.",
          "Attendance, leave, and shift data update automatically.",
          "Payroll uses the verified data to calculate salary and deductions.",
        ],
      },
      {
        id: "core-modules",
        title: "Core Modules Inside HRMS",
        paragraphs: [
          "Most HRMS platforms cover more than one HR process. The exact feature list varies by product, but the foundation is usually the same.",
        ],
        bullets: [
          "Employee management and employee records",
          "Attendance and time tracking",
          "Leave management",
          "Payroll processing",
          "Recruitment and onboarding",
          "Performance management",
          "Employee self-service",
          "Reporting and HR analytics",
        ],
      },
      {
        id: "manual-vs-hrms",
        title: "Manual HR vs HRMS",
        paragraphs: [
          "Manual HR can work for a tiny team, but once headcount grows, the gaps become obvious. HRMS removes many of the repetitive handoffs that cause delays and errors.",
        ],
        table: {
          headers: ["Aspect", "Manual HR", "HRMS"],
          rows: [
            ["Employee data", "Scattered across spreadsheets and files", "Stored in one central profile"],
            ["Attendance and leave", "Tracked in separate tools or registers", "Connected to the same employee record"],
            ["Payroll", "Requires manual export and correction", "Uses verified attendance and salary data"],
            ["Approvals", "Email, chat, and paper trails", "Structured workflow in one system"],
          ],
        },
      },
      {
        id: "why-indian-businesses-need-it",
        title: "Why Indian Businesses Need HRMS",
        paragraphs: [
          "Indian businesses often deal with multi-state compliance, location-based attendance, contract workers, and fast team growth. That makes manual HR especially fragile.",
          "HRMS helps structure the data HR needs for statutory work such as PF, ESI, professional tax, and TDS, and it gives leaders better visibility into workforce costs and headcount trends.",
        ],
        bullets: [
          "Useful for small, mid-sized, and growing businesses",
          "Supports cloud access without local server maintenance",
          "Improves employee experience through self-service",
          "Reduces admin workload so HR can focus on strategy",
        ],
      },
      {
        id: "hrms-vs-related-tools",
        title: "HRMS vs HRIS vs HCM",
        paragraphs: [
          "These terms are related, but they are not identical.",
          "HRIS usually focuses more on information storage and core HR records. HCM is a broader concept that includes the strategic side of managing people. HRMS usually sits in the middle, covering operational HR processes and the systems that support them.",
        ],
      },
      {
        id: "how-to-choose",
        title: "How to Choose the Right HRMS",
        paragraphs: [
          "The right HRMS depends on more than the feature checklist. A business should look at how well the software matches its size, industry, implementation plan, integrations, and support needs.",
        ],
        bullets: [
          "Check whether the system is easy for HR and employees to use.",
          "Confirm it supports your attendance, payroll, and compliance needs.",
          "Review integrations with devices and other business apps.",
          "Ask how onboarding, training, and support will work after go-live.",
        ],
      },
      {
        id: "implementation-guide",
        title: "Implementation Matters More Than the Software Name",
        paragraphs: [
          "Poor implementation planning is one of the biggest reasons HRMS projects fail to deliver value. The rollout should be treated as a process change, not just a software install.",
        ],
        bullets: [
          "Plan before you migrate data.",
          "Clean employee records before import.",
          "Configure approval flows and roles carefully.",
          "Train managers and employees before go-live.",
          "Test attendance, leave, and payroll together.",
          "Keep support active after launch.",
        ],
      },
      {
        id: "future-of-hrms",
        title: "The Future of HRMS in India",
        paragraphs: [
          "The next wave of HRMS is shaped by AI-assisted HR, predictive analytics, mobile-first design, and stronger employee experience tools.",
          "As businesses expect faster decisions and more self-service, the HRMS becomes not just a back-office tool, but a daily work platform for managers and employees.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the full form of HRMS?",
        a: "HRMS stands for Human Resource Management System.",
      },
      {
        q: "Is HRMS only for large enterprises?",
        a: "No. Small and mid-sized businesses often benefit the most because manual work becomes harder as headcount grows.",
      },
      {
        q: "How is HRMS different from payroll software?",
        a: "Payroll software mainly handles salary calculations, while HRMS covers payroll plus employee data, attendance, leave, recruitment, performance, and reporting.",
      },
      {
        q: "Is HRMS safe for employee data?",
        a: "A well-built HRMS is safer than scattered spreadsheets because it centralises access controls, roles, and records in one place.",
      },
      {
        q: "What should companies check before buying HRMS?",
        a: "Businesses should review ease of use, integrations, compliance support, implementation help, reporting, and mobile access.",
      },
    ],
    relatedLinks: [
      {
        label: "Employee Management",
        href: ROUTES.coreHR,
        description: "See how employee profiles, documents, and records are managed in Altroz HR.",
      },
      {
        label: "Attendance Management",
        href: ROUTES.attendanceManagement,
        description: "Explore attendance tracking, shifts, and approvals connected to HRMS workflows.",
      },
      {
        label: "Payroll",
        href: ROUTES.payroll,
        description: "See how payroll fits into the broader HRMS workflow.",
      },
      {
        label: "Compliance Guides",
        href: ROUTES.complianceGuides,
        description: "Read more about statutory HR topics that an HRMS helps support.",
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}
