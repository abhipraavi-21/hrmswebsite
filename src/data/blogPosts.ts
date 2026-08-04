import { ROUTES } from "@/routes/routeConfig.js";

const ADMIN_STORE_KEY = "altroz-admin-store";

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

export type BlogLink = {
  label: string;
  href: string;
  description: string;
};

export type BlogPost = {
  slug: string;
  href: string;
  title: string;
  category: string;
  author: string;
  description: string;
  featuredImage: string;
  featuredImageAlt: string;
  publishDate: string;
  updatedDate: string;
  readingTime: string;
  tags: string[];
  heroSummary: string;
  heroPoints: string[];
  quickAnswer: string;
  keyTakeaways: string[];
  sections: BlogSection[];
  faqs: BlogFaq[];
  relatedLinks: BlogLink[];
  seoTitle?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
};

type AdminContentSnapshot = {
  slug: string;
  type: string;
  title: string;
  summary: string;
  category?: string;
  author?: string;
  status: string;
  publishedAt?: string;
  updatedAt: string;
  readingTime?: string;
  tags?: string[];
  featuredImage?: string;
  featuredImageAlt?: string;
  heroDescription?: string;
};

type AdminSeoSnapshot = {
  entityType: string;
  slug: string;
  seoTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
};

type AdminStoreSnapshot = {
  content?: AdminContentSnapshot[];
  seo?: AdminSeoSnapshot[];
};

const staticPosts: BlogPost[] = [
  {
    slug: "what-is-hrms",
    href: `${ROUTES.blog}/what-is-hrms`,
    title: "What is HRMS? The Complete Guide for Indian Businesses (2026)",
    category: "HR Software",
    author: "Altroz HR Editorial Team",
    description:
      "A practical guide to HRMS, how it works, and why Indian businesses use it to manage employees, payroll, attendance, leave, performance, and compliance in one place.",
    featuredImage: "/blog/what-is-hrms.svg",
    featuredImageAlt: "Abstract HRMS dashboard cover artwork",
    publishDate: "2026-08-04",
    updatedDate: "2026-08-04",
    readingTime: "24 min read",
    tags: ["HRMS", "Core HR", "Guide"],
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
  {
    slug: "ai-seo-checklist-hrms",
    href: `${ROUTES.blog}/ai-seo-checklist-hrms`,
    title: "AI SEO Checklist for HRMS Websites",
    category: "SEO",
    author: "Avni Mehra",
    description:
      "Use this checklist to improve metadata, schema, and AI summary readiness for HRMS content.",
    featuredImage: "/blog/ai-seo-checklist.svg",
    featuredImageAlt: "AI SEO checklist illustration for HRMS content teams",
    publishDate: "2026-08-04",
    updatedDate: "2026-08-04",
    readingTime: "10 min read",
    tags: ["SEO", "AI Search", "Schema"],
    heroSummary:
      "AI search surfaces reward content that is easy to identify, summarize, and trust. HRMS teams need clearer metadata, stronger entity coverage, and cleaner answer-ready copy.",
    heroPoints: [
      "Sharpen metadata for both humans and AI systems",
      "Use schema to clarify page type and primary entity",
      "Write answer-first sections that are easy to extract",
      "Keep authorship and freshness signals visible",
    ],
    quickAnswer:
      "An AI SEO checklist helps HRMS websites improve how their pages are interpreted by search engines, AI overviews, and answer engines by tightening metadata, schema, structure, and trust signals.",
    keyTakeaways: [
      "Metadata still matters because AI systems often rely on strong page titles and descriptions to understand intent.",
      "Schema does not replace content quality, but it improves machine readability and entity clarity.",
      "Answer-first intros, FAQs, and clean headings increase the chances of being summarized accurately.",
      "Authorship, update dates, and linked proof points help strengthen trust signals around B2B content.",
    ],
    sections: [
      {
        id: "why-ai-seo",
        title: "Why AI SEO Is Different From Traditional On-Page SEO",
        paragraphs: [
          "Traditional SEO often focused on ranking signals and keyword placement. AI SEO still cares about relevance, but it also rewards clarity. If your article is difficult to interpret or summarize, it becomes harder for answer engines to use confidently.",
          "For HRMS brands, that means content teams should write for machine understanding and human confidence at the same time.",
        ],
      },
      {
        id: "metadata",
        title: "Start With Metadata That Matches Search Intent",
        paragraphs: [
          "Metadata should clearly communicate what the page is, who it is for, and why it matters. Vague titles weaken topical focus and make summaries less reliable.",
        ],
        bullets: [
          "Use a clear primary keyword in the title.",
          "Keep meta descriptions concise but specific.",
          "Match page intent to the search journey stage.",
          "Avoid clickbait phrasing that the body cannot support.",
        ],
      },
      {
        id: "schema",
        title: "Use Schema to Clarify the Entity and Content Type",
        paragraphs: [
          "Schema helps search systems understand whether a page is a blog post, guide, FAQ, product page, or something else. That makes it easier to interpret your content in context.",
          "The most useful schema types for HRMS content usually include BlogPosting, FAQPage, BreadcrumbList, and organization-level data where appropriate.",
        ],
      },
      {
        id: "answer-ready",
        title: "Make the Page Easy to Quote and Summarize",
        paragraphs: [
          "AI systems often favor pages with a strong direct answer near the top, followed by supporting detail. Dense introductions and buried definitions reduce extractability.",
        ],
        bullets: [
          "Open with a concise answer block.",
          "Use descriptive H2s that map to common questions.",
          "Break complex topics into short sections.",
          "Add FAQ entries for recurring comparison queries.",
        ],
      },
      {
        id: "trust-signals",
        title: "Strengthen Freshness and Trust Signals",
        paragraphs: [
          "Pages about HR operations and compliance are more credible when authorship, update dates, and supporting links are visible. These signals also help internal reviewers keep content current.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is AI SEO?",
        a: "AI SEO is the practice of improving content so it is easier for search engines and AI answer systems to interpret, trust, and summarize accurately.",
      },
      {
        q: "Does schema guarantee AI overview visibility?",
        a: "No. Schema helps with clarity, but content quality, relevance, and authority still matter.",
      },
      {
        q: "What pages should HRMS teams optimize first?",
        a: "High-intent blog posts, core solution pages, comparisons, and FAQ-rich pages usually offer the fastest value.",
      },
    ],
    relatedLinks: [
      {
        label: "HR Blog",
        href: ROUTES.blog,
        description: "Browse more search-led HR and HRMS content ideas.",
      },
      {
        label: "Learn Resources",
        href: ROUTES.learn,
        description: "See how evergreen educational resources can support organic growth.",
      },
      {
        label: "Book a Demo",
        href: ROUTES.bookDemo,
        description: "Talk to the team if you want help connecting content and product positioning.",
      },
      {
        label: "Pricing",
        href: ROUTES.pricing,
        description: "Move from research intent to solution comparison when readers are ready.",
      },
    ],
  },
  {
    slug: "payroll-errors-growing-teams",
    href: `${ROUTES.blog}/payroll-errors-growing-teams`,
    title: "7 Payroll Errors Growing Teams Should Fix",
    category: "Payroll",
    author: "Nisha Verma",
    description:
      "A practical breakdown of the payroll mistakes that create rework, delays, and compliance risk for growing teams.",
    featuredImage: "/blog/payroll-errors.svg",
    featuredImageAlt: "Payroll operations illustration with warning markers",
    publishDate: "2026-07-21",
    updatedDate: "2026-08-01",
    readingTime: "9 min read",
    tags: ["Payroll", "Compliance", "Operations"],
    heroSummary:
      "Payroll problems rarely come from one dramatic failure. More often, they come from repeated process gaps that multiply as headcount grows, approvals get slower, and data starts moving across too many spreadsheets.",
    heroPoints: [
      "Spot the payroll mistakes that create repeat rework",
      "Reduce payroll delays caused by attendance mismatches",
      "Clean up approvals before they become salary issues",
      "Lower compliance risk with better records and controls",
    ],
    quickAnswer:
      "Growing teams usually struggle with payroll because attendance, leave, approvals, and employee records are not fully connected. The most common errors involve missing data, manual corrections, late cutoffs, and poor compliance tracking.",
    keyTakeaways: [
      "Payroll errors compound as headcount and exception handling grow.",
      "Manual attendance corrections often flow directly into salary mistakes.",
      "Clear cutoffs, approval discipline, and cleaner records reduce payroll stress quickly.",
      "The right system reduces error-handling, but process ownership still matters.",
    ],
    sections: [
      {
        id: "why-errors-grow",
        title: "Why Payroll Errors Multiply in Growing Teams",
        paragraphs: [
          "A small team can sometimes spot-check payroll manually. A growing team cannot. More employees mean more leave requests, more attendance exceptions, more reimbursement questions, and more compliance deadlines.",
          "Without stronger workflows, payroll becomes a monthly reconciliation project instead of a repeatable process.",
        ],
      },
      {
        id: "error-list",
        title: "The Seven Payroll Errors to Watch",
        paragraphs: [
          "The most common issues are not mysterious. They tend to repeat across industries whenever HR, payroll, and attendance operate in silos.",
        ],
        bullets: [
          "Using incomplete attendance data during payroll lock.",
          "Missing leave adjustments before salary calculation.",
          "Manual salary edits without approval trails.",
          "Incorrect employee records for bank, tax, or statutory details.",
          "Late cutoff communication to managers and HR teams.",
          "Weak handling of overtime, arrears, and recoveries.",
          "Poor recordkeeping for compliance reviews and disputes.",
        ],
      },
      {
        id: "attendance-link",
        title: "Attendance and Leave Errors Cause the Most Rework",
        paragraphs: [
          "Payroll teams often inherit problems created upstream. If attendance is incomplete or leave balances are still being debated at cutoff time, payroll accuracy becomes harder no matter how strong the salary engine is.",
        ],
      },
      {
        id: "controls",
        title: "Build Controls Before the Month-End Rush",
        paragraphs: [
          "The best payroll teams do not rely on heroics at the end of the month. They use cutoffs, clear owners, and exception tracking earlier in the cycle.",
        ],
        bullets: [
          "Publish the monthly cutoff calendar in advance.",
          "Lock manager approvals before payroll export.",
          "Track every manual correction with a reason.",
          "Review recurring exception patterns after each cycle.",
        ],
      },
      {
        id: "when-software-helps",
        title: "Where HRMS and Payroll Software Help Most",
        paragraphs: [
          "Software helps most when it connects upstream workflows to payroll input quality. Attendance, leave, employee master data, and approvals should move into the same process lane instead of being stitched together late.",
        ],
      },
    ],
    faqs: [
      {
        q: "What causes most payroll mistakes?",
        a: "Most payroll mistakes come from poor input quality, especially incomplete attendance data, unresolved leave changes, and manual corrections without strong controls.",
      },
      {
        q: "How can small teams reduce payroll errors quickly?",
        a: "Set clear cutoffs, clean up employee master data, and make attendance and leave approvals happen before payroll processing starts.",
      },
      {
        q: "Will software eliminate all payroll errors?",
        a: "No. Software reduces manual effort and improves consistency, but teams still need ownership, timely approvals, and review discipline.",
      },
    ],
    relatedLinks: [
      {
        label: "Payroll",
        href: ROUTES.payroll,
        description: "See how Altroz HR connects payroll with upstream HR workflows.",
      },
      {
        label: "Attendance Management",
        href: ROUTES.attendanceManagement,
        description: "Explore the attendance controls that protect payroll accuracy.",
      },
      {
        label: "Leave Management",
        href: ROUTES.leaveManagement,
        description: "Review leave workflows that reduce late-cycle payroll corrections.",
      },
      {
        label: "Book a Demo",
        href: ROUTES.bookDemo,
        description: "Talk to the team about payroll automation and process cleanup.",
      },
    ],
  },
];

function readAdminStore(): AdminStoreSnapshot | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(ADMIN_STORE_KEY);
    return raw ? (JSON.parse(raw) as AdminStoreSnapshot) : null;
  } catch {
    return null;
  }
}

function hydrateBlogPost(post: BlogPost): BlogPost | null {
  const adminStore = readAdminStore();
  const contentRecord = adminStore?.content?.find(
    (item) => item.type === "Blog" && item.slug === post.href,
  );
  const seoRecord = adminStore?.seo?.find(
    (item) => item.entityType === "Blog" && item.slug === post.href,
  );

  if (contentRecord && contentRecord.status !== "Published") {
    return null;
  }

  return {
    ...post,
    title: contentRecord?.title ?? post.title,
    category: contentRecord?.category ?? post.category,
    author: contentRecord?.author ?? post.author,
    description: seoRecord?.metaDescription ?? contentRecord?.summary ?? post.description,
    featuredImage: contentRecord?.featuredImage ?? post.featuredImage,
    featuredImageAlt: contentRecord?.featuredImageAlt ?? post.featuredImageAlt,
    publishDate: contentRecord?.publishedAt ?? post.publishDate,
    updatedDate: contentRecord?.updatedAt?.slice(0, 10) ?? post.updatedDate,
    readingTime: contentRecord?.readingTime
      ? contentRecord.readingTime.includes("read")
        ? contentRecord.readingTime
        : `${contentRecord.readingTime} read`
      : post.readingTime,
    tags: contentRecord?.tags?.length ? contentRecord.tags : post.tags,
    heroSummary: contentRecord?.heroDescription ?? post.heroSummary,
    seoTitle: seoRecord?.seoTitle ?? post.seoTitle ?? post.title,
    canonicalUrl: seoRecord?.canonicalUrl ?? post.canonicalUrl,
    ogTitle: seoRecord?.ogTitle ?? post.ogTitle ?? post.title,
    ogDescription: seoRecord?.ogDescription ?? post.ogDescription ?? post.description,
  };
}

export function getBlogPosts() {
  return staticPosts
    .map(hydrateBlogPost)
    .filter((post): post is BlogPost => post !== null)
    .sort((left, right) => right.publishDate.localeCompare(left.publishDate));
}

export function getBlogPostBySlug(slug: string) {
  return getBlogPosts().find((post) => post.slug === slug) ?? null;
}

export function getAdjacentBlogPosts(slug: string) {
  const posts = getBlogPosts();
  const currentIndex = posts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: posts[currentIndex + 1] ?? null,
    next: posts[currentIndex - 1] ?? null,
  };
}
