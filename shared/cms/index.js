import { ROUTES } from "../../src/routes/routeConfig.js";

export const seedVersion = "2026-08-04";

const createMeta = ({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage = null,
  indexable = true,
}) => ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage,
  indexable,
});

export const cmsSeedPages = [
  {
    pageKey: "hrms",
    pageName: "HRMS",
    slug: "hrms",
    status: "published",
    meta: createMeta({
      title: "Altroz HRMS | HR, Payroll and Attendance Platform",
      description:
        "Altroz HRMS helps businesses manage employees, attendance, payroll, leave, recruitment, and analytics from one modern platform.",
      keywords: ["hrms", "payroll", "attendance", "leave management", "employee management"],
      canonicalUrl: ROUTES.hrmsHome,
      ogTitle: "Altroz HRMS | HR, Payroll and Attendance Platform",
      ogDescription:
        "Altroz HRMS helps businesses manage employees, attendance, payroll, leave, recruitment, and analytics from one modern platform.",
    }),
    sections: [
      {
        sectionKey: "hero",
        sectionType: "hero",
        internalName: "Hero",
        description:
          "Manage employees, attendance, payroll and leaves from one powerful cloud platform.",
        buttonText: "Book Free Demo",
        buttonLink: ROUTES.bookDemo,
        isRequired: true,
        settings: {
          badgeText: "All-in-one cloud platform",
          titlePrefix: "Complete",
          titleHighlight: "HRMS",
          titleSuffix: ", Payroll & Attendance",
          titleLineTwo: "Platform for Growing Teams",
          secondaryButtonText: "Explore Features",
          secondaryButtonLink: "/#features",
          trustItems: [
            "Free 7-day trial",
            "No credit card",
            "4.8 / 5 by Google Reviews",
          ],
          floatingBadge: "Payroll run complete",
        },
        items: [
          {
            itemType: "dashboard_card",
            title: "Attendance",
            subtitle: "248 / 312",
            description: "+4.2%",
            icon: "Clock",
            buttonLink: ROUTES.attendanceManagement,
          },
          {
            itemType: "dashboard_card",
            title: "Payroll",
            subtitle: "₹18.4L",
            description: "processed",
            icon: "Wallet",
            buttonLink: ROUTES.payroll,
          },
          {
            itemType: "dashboard_card",
            title: "Employees",
            subtitle: "312",
            description: "+8",
            icon: "Users",
            buttonLink: ROUTES.coreHR,
          },
          {
            itemType: "dashboard_card",
            title: "Campaign",
            subtitle: "42.3K",
            description: "38% open rate",
            icon: "Mail",
            buttonLink: ROUTES.automation,
          },
        ],
      },
      {
        sectionKey: "platform-cards",
        sectionType: "icon_cards",
        internalName: "Platform Cards",
        heading: "One unified platform for all HR needs",
        description:
          "Built to work seamlessly together - manage your people and your communication from a single dashboard.",
        isRequired: true,
        items: [
          {
            itemType: "card",
            title: "Run your entire people operations",
            subtitle: "HRMS Platform",
            description:
              "From attendance to payroll, everything your HR team needs in one place.",
            icon: "Users",
            buttonText: "Learn more",
            buttonLink: ROUTES.coreHR,
            extraData: {
              accent: "primary",
              features: [
                "Attendance tracking with GPS & biometric",
                "Payroll automation (PF, ESI, TDS ready)",
                "Leave management & approvals",
                "Employee self-service portal",
                "Real-time reports & analytics",
              ],
            },
          },
          {
            itemType: "card",
            title: "See workforce trends at a glance",
            subtitle: "HR Insights",
            description:
              "Track attendance, payroll, and approvals with reporting that keeps leaders informed.",
            icon: "Mail",
            buttonText: "Learn more",
            buttonLink: ROUTES.analytics,
            extraData: {
              accent: "success",
              features: [
                "Workforce dashboards and summaries",
                "Attendance and payroll visibility",
                "Department and branch trends",
                "Export-ready reporting views",
                "Automated insights and alerts",
              ],
            },
          },
        ],
      },
      {
        sectionKey: "feature-grid",
        sectionType: "feature_grid",
        internalName: "Feature Grid",
        heading: "Powerful features, beautifully simple",
        subheading: "Everything you need",
        description:
          "Explore each capability as a dedicated section, so the feature menu can jump straight to the right area.",
        isRequired: true,
        items: [
          { itemType: "feature", title: "Core HR", description: "Keep employee records, roles and org structure in one place.", icon: "Building2", buttonLink: ROUTES.coreHR },
          { itemType: "feature", title: "Attendance", description: "Track shifts, check-ins and time logs accurately in one dedicated module.", icon: "Clock3", buttonLink: ROUTES.attendanceManagement },
          { itemType: "feature", title: "Payroll", description: "Run salaries, deductions and approvals without manual work.", icon: "Wallet", buttonLink: ROUTES.payroll },
          { itemType: "feature", title: "Leave Management", description: "Handle leave rules, balances and approvals with ease.", icon: "CalendarDays", buttonLink: ROUTES.leaveManagement },
          { itemType: "feature", title: "Recruitment (ATS)", description: "Track candidates from sourcing to offer acceptance.", icon: "BriefcaseBusiness", buttonLink: ROUTES.recruitment },
          { itemType: "feature", title: "Performance Management", description: "Plan reviews, goals and feedback in one workflow.", icon: "Users", buttonLink: ROUTES.performance },
          { itemType: "feature", title: "Asset Management", description: "Assign, track and recover company assets confidently.", icon: "Package", buttonLink: `${ROUTES.assetManagement}#asset-management` },
          { itemType: "feature", title: "Expense Management", description: "Submit, review and reimburse business expenses smoothly.", icon: "ReceiptText", buttonLink: ROUTES.expenseManagement },
        ],
      },
      {
        sectionKey: "roi",
        sectionType: "statistics",
        internalName: "ROI Calculator",
        heading: "See how much your HR team can save",
        subheading: "ROI calculator",
        description:
          "Estimate the time, operational cost and administrative effort your organisation can save by automating attendance, payroll, leave, employee management and reporting.",
        buttonText: "Calculate My Savings",
        buttonLink: ROUTES.roiCalculator,
        settings: {
          secondaryButtonText: "Book a demo",
          secondaryButtonLink: ROUTES.bookDemo,
          chips: ["Instant results", "No signup required", "Indian Rupee estimates"],
        },
        items: [
          { itemType: "stat_card", title: "Monthly hours saved", subtitle: "Live estimate", icon: "Clock3" },
          { itemType: "stat_card", title: "Annual savings", subtitle: "Net Year 1 view", icon: "TrendingUp" },
          { itemType: "stat_card", title: "Payback period", subtitle: "Months to recover", icon: "Calculator" },
          { itemType: "stat_card", title: "FTE recovered", subtitle: "Capacity equivalent", icon: "Users" },
        ],
      },
      {
        sectionKey: "dashboard-showcase",
        sectionType: "custom",
        internalName: "Dashboard Showcase",
        heading: "One dashboard. Total clarity.",
        subheading: "Live Dashboard",
        description:
          "Click any module to drill into attendance, payroll, reports, or campaigns in real time.",
        items: [
          { itemType: "nav_link", title: "Overview", buttonLink: ROUTES.analytics },
          { itemType: "nav_link", title: "Attendance", buttonLink: ROUTES.attendanceManagement },
          { itemType: "nav_link", title: "Payroll", buttonLink: ROUTES.payroll },
          { itemType: "nav_link", title: "Employees", buttonLink: ROUTES.coreHR },
          { itemType: "nav_link", title: "Leaves", buttonLink: ROUTES.leaveManagement },
          { itemType: "nav_link", title: "Bulk Email", buttonLink: ROUTES.bulkEmail },
          { itemType: "nav_link", title: "Reports", buttonLink: ROUTES.reports },
        ],
      },
      {
        sectionKey: "why-switch",
        sectionType: "benefits",
        internalName: "Why Teams Switch",
        heading: "Designed for outcomes, not just features",
        subheading: "Why teams switch to us",
        items: [
          { itemType: "benefit", title: "Save HR time", description: "Automate repetitive tasks and free your team for what matters.", icon: "Timer" },
          { itemType: "benefit", title: "Reduce payroll errors", description: "Pre-built compliance rules eliminate manual mistakes.", icon: "ShieldCheck" },
          { itemType: "benefit", title: "Improve transparency", description: "Employees see attendance, leaves and payslips in real time.", icon: "Eye" },
          { itemType: "benefit", title: "Track field staff easily", description: "Live GPS check-ins keep your distributed team accountable.", icon: "MapPin" },
        ],
      },
      {
        sectionKey: "final-cta",
        sectionType: "cta_banner",
        internalName: "Final CTA",
        heading: "Ready to simplify HR and business communication?",
        description:
          "Join thousands of growing businesses already running their teams and campaigns on one platform.",
        buttonText: "Book Free Demo",
        buttonLink: ROUTES.bookDemo,
        settings: {
          secondaryButtonText: "View Pricing",
          secondaryButtonLink: ROUTES.pricing,
        },
      },
    ],
  },
  {
    pageKey: "pricing",
    pageName: "Pricing",
    slug: "pricing",
    status: "published",
    meta: createMeta({
      title: "Pricing Plans | Altroz HRMS",
      description:
        "Compare the Altroz HRMS pricing plans in detail. See Basic, Professional and Premium pricing, feature coverage, and optional add-ons.",
      keywords: ["pricing", "hrms pricing", "payroll pricing", "attendance pricing"],
      canonicalUrl: ROUTES.pricing,
      ogTitle: "Pricing Plans | Altroz HRMS",
      ogDescription:
        "Compare the Altroz HRMS pricing plans in detail. See Basic, Professional and Premium pricing, feature coverage, and optional add-ons.",
    }),
    sections: [
      {
        sectionKey: "pricing-hero",
        sectionType: "hero",
        internalName: "Pricing Hero",
        heading: "Altroz HRMS Pricing Plans",
        subheading: "Pricing sheet",
        description:
          "Feature comparison for Basic (₹21), Professional (₹36), Premium (₹53) and add-ons, rebuilt as a clear pricing page with plan cards and sectioned feature comparisons.",
        buttonText: "Request a demo",
        buttonLink: ROUTES.bookDemo,
        settings: {
          secondaryButtonText: "Talk to sales",
          secondaryButtonLink: ROUTES.contact,
        },
        items: [
          { itemType: "highlight", title: "Basic", subtitle: "₹21 / employee / month", description: "Entry pricing for core HR, attendance and leave.", icon: "BadgeCheck" },
          { itemType: "highlight", title: "Professional", subtitle: "₹36 / employee / month", description: "Expanded coverage for recruiting, payroll and compliance.", icon: "ShieldCheck" },
          { itemType: "highlight", title: "Premium", subtitle: "₹53 / employee / month", description: "Full-suite coverage for the broadest rollout.", icon: "Crown" },
          { itemType: "highlight", title: "Optional add-ons", subtitle: "Geo tracking, integrations and custom work", description: "Extra capabilities can be layered on as needed.", icon: "Coins" },
        ],
      },
      {
        sectionKey: "calculator",
        sectionType: "custom",
        internalName: "Pricing Calculator",
        heading: "Estimate pricing by team size",
        subheading: "Instant estimate",
        description:
          "Slide the employee count to see how Basic, Professional and Premium scale on your pricing page using the same plan prices from Altroz HRMS.",
        settings: {
          calculatorMin: 0,
          calculatorMax: 3000,
          calculatorTicks: [0, 500, 1000, 2000, 3000],
          defaultEmployeeCount: 100,
        },
      },
      {
        sectionKey: "feature-groups",
        sectionType: "pricing_plans",
        internalName: "Feature Comparison Intro",
        heading: "Section cards for the pricing features",
        subheading: "Feature comparison",
        description:
          "Every major module from the sheet is grouped into a dedicated card so the plan differences are easy to scan, compare and present on desktop or mobile.",
      },
      {
        sectionKey: "pricing-faq",
        sectionType: "faq",
        internalName: "Pricing CTA",
        heading: "Want a tailored walkthrough of your pricing and ROI numbers?",
        subheading: "Next step",
        description:
          "The page now includes the pricing table and add-ons, giving a clear view of the plan structure before you request a tailored walkthrough.",
        buttonText: "Request a demo",
        buttonLink: ROUTES.bookDemo,
        settings: {
          secondaryButtonText: "Contact us",
          secondaryButtonLink: ROUTES.contact,
        },
      },
    ],
  },
  {
    pageKey: "contact-us",
    pageName: "Contact Us",
    slug: "company/contact-us",
    status: "published",
    meta: createMeta({
      title: "Contact Altroz HRMS | Book a Demo or Sales Consultation",
      description:
        "Contact Altroz HRMS for product demonstrations, HRMS consultation, attendance, payroll, employee management, implementation support, and customer enquiries.",
      keywords: ["contact", "book demo", "sales enquiry", "support"],
      canonicalUrl: ROUTES.contact,
      ogTitle: "Contact Altroz HRMS | Book a Demo or Sales Consultation",
      ogDescription:
        "Contact Altroz HRMS for product demonstrations, HRMS consultation, attendance, payroll, employee management, implementation support, and customer enquiries.",
    }),
    sections: [
      {
        sectionKey: "contact-hero",
        sectionType: "hero",
        internalName: "Hero",
        heading: "Get in Touch with Altroz HRMS",
        subheading: "Contact Us",
        description:
          "We are here to help you simplify your HR operations. Whether you are evaluating HRMS software, requesting a product demonstration, planning implementation, or looking for product support, the Altroz Technologies team can help you identify the right next step.",
        buttonText: "Send an Enquiry",
        buttonLink: "#contact-form",
        settings: {
          secondaryButtonText: "Book Free Demo",
          secondaryButtonLink: ROUTES.bookDemo,
          secondaryDescription:
            "Use the verified WhatsApp route or the enquiry form below. Our team will review your enquiry and contact you using the details provided.",
        },
        items: [
          { itemType: "hero_path", title: "Product Enquiry", description: "Ask about product fit, pricing, or the right starting point.", icon: "messageSquare", buttonLink: "#contact-form" },
          { itemType: "hero_path", title: "Book a Demo", description: "Open the demo workflow for a guided product walkthrough.", icon: "calendarDays", buttonLink: ROUTES.bookDemo },
          { itemType: "hero_path", title: "Support", description: "Use the support route for customer help and product questions.", icon: "headphones", buttonLink: ROUTES.support },
        ],
      },
      {
        sectionKey: "quick-contact",
        sectionType: "contact_information",
        internalName: "Quick Contact",
        heading: "Choose the Best Way to Reach Us",
        subheading: "Quick Contact",
        description: "Use one of the verified paths below to reach the Altroz HRMS team.",
        items: [
          { itemType: "contact_card", title: "WhatsApp", description: "Start a chat with the verified WhatsApp channel.", icon: "messageSquare", buttonLink: "https://wa.me/918446337392" },
          { itemType: "contact_card", title: "Book a Demo", description: "Open the product demo workflow for a guided walkthrough.", icon: "calendarDays", buttonLink: ROUTES.bookDemo },
          { itemType: "contact_card", title: "Support", description: "Use the support page for customer help and product guidance.", icon: "headphones", buttonLink: ROUTES.support },
        ],
      },
      {
        sectionKey: "contact-form",
        sectionType: "custom",
        internalName: "Enquiry Form",
        heading: "Share your enquiry with the Altroz HRMS team",
        subheading: "Send a Message",
        description:
          "Fill in the details below and the form will prepare a WhatsApp enquiry draft using the verified channel.",
      },
      {
        sectionKey: "contact-cta",
        sectionType: "cta_banner",
        internalName: "Final CTA",
        heading: "Ready to Simplify Your HR Operations?",
        subheading: "Ready to Start",
        description:
          "Connect with Altroz HRMS to explore attendance, payroll, leave, employee management, recruitment, reporting, and HR automation from one centralized platform.",
        buttonText: "Send an Enquiry",
        buttonLink: "#contact-form",
        settings: {
          secondaryButtonText: "Book Free Demo",
          secondaryButtonLink: ROUTES.bookDemo,
        },
      },
    ],
  },
  {
    pageKey: "resource-learn",
    pageName: "Learn",
    slug: "resources/learn",
    status: "published",
    resource: {
      resourceName: "Learn",
      slug: "learn",
      shortDescription:
        "A free learning hub for business email communication, bulk email, campaign planning, SMTP, templates, scheduling and analytics.",
      displayOrder: 1,
      status: "published",
    },
    meta: createMeta({
      title: "Email Communication Guide | Learn Bulk Email, Campaigns & SMTP | Altroz Bulk Email",
      description:
        "Explore a free learning hub for business email communication, bulk email, campaign planning, SMTP, templates, scheduling and analytics.",
      keywords: ["bulk email", "smtp", "campaign management", "email analytics"],
      canonicalUrl: ROUTES.learn,
      ogTitle: "Email Communication Guide | Learn Bulk Email, Campaigns & SMTP | Altroz Bulk Email",
      ogDescription:
        "Explore a free learning hub for business email communication, bulk email, campaign planning, SMTP, templates, scheduling and analytics.",
    }),
    sections: [
      {
        sectionKey: "learn-hero",
        sectionType: "hero",
        internalName: "Learn Hero",
        heading: "Learn Business Email Communication, Bulk Email & Campaign Management",
        subheading: "Free Learning Hub",
        description:
          "Whether you are sending your first email campaign or managing communication for an entire organisation, this learning hub helps you understand business email the simple way. Explore practical guides on email broadcasting, campaign planning, SMTP, templates, scheduling and analytics.",
        buttonText: "Start Learning",
        buttonLink: ROUTES.bulkEmailBroadcast,
        settings: {
          secondaryButtonText: "Explore Articles",
          secondaryButtonLink: "#featured-guides",
          secondaryHeading: "Everything You Need to Master Professional Email Communication",
          heroBullets: [
            "Explore practical guides on bulk email, SMTP, templates, scheduling and analytics.",
            "Learn in plain language with real business examples and clear next steps.",
            "Move from beginner concepts to confident campaign management at your own pace.",
          ],
        },
        items: [
          { itemType: "hero_highlight", title: "Free Learning Hub", description: "Everything on this page is free to read and built for practical use.", icon: "Sparkles", buttonLink: "#featured-guides" },
          { itemType: "hero_highlight", title: "Plain Language", description: "Email communication concepts are explained simply, without heavy jargon.", icon: "Lightbulb", buttonLink: "#why-learn" },
          { itemType: "hero_highlight", title: "Built for Growth", description: "Start with the basics and move up to analytics, scheduling and SMTP.", icon: "Workflow", buttonLink: "#learning-path" },
        ],
      },
      {
        sectionKey: "featured-guides",
        sectionType: "icon_cards",
        internalName: "Featured Guides",
        heading: "Start with the guides most people need first",
        subheading: "Featured Learning Guides",
        description:
          "These are the easiest entry points for someone new to business email communication or bulk email workflows.",
        items: [
          { itemType: "guide_card", title: "What is Bulk Email?", description: "Learn how bulk email works, why it matters and where it fits in a business communication strategy.", buttonLink: ROUTES.bulkEmail, extraData: { readingTime: "5 min", category: "Getting Started", difficulty: "Beginner" } },
          { itemType: "guide_card", title: "Campaign Planning", description: "Understand how to define a goal, choose an audience and prepare a campaign before sending.", buttonLink: ROUTES.bulkEmailBroadcast, extraData: { readingTime: "6 min", category: "Campaigns", difficulty: "Beginner" } },
          { itemType: "guide_card", title: "Email Templates", description: "See how reusable layouts help you maintain a professional look across every message.", buttonLink: ROUTES.bulkEmailTemplates, extraData: { readingTime: "7 min", category: "Templates", difficulty: "Beginner" } },
          { itemType: "guide_card", title: "SMTP Configuration", description: "Get a simple grounding in SMTP, the delivery technology behind every outgoing email.", buttonLink: ROUTES.bulkEmailSmtp, extraData: { readingTime: "6 min", category: "Delivery", difficulty: "Intermediate" } },
        ],
      },
      {
        sectionKey: "learn-cta",
        sectionType: "cta_banner",
        internalName: "Learn CTA",
        heading: "Start Learning Business Email Communication Today",
        description:
          "Explore expert guides, practical tutorials and best practices to improve business communication with Altroz Bulk Email.",
        buttonText: "Explore Articles",
        buttonLink: ROUTES.bulkEmailBroadcast,
        settings: {
          secondaryButtonText: "Book Free Demo",
          secondaryButtonLink: ROUTES.bookDemo,
        },
      },
    ],
  },
  {
    pageKey: "resource-compliance-guides",
    pageName: "Compliance Guides",
    slug: "resources/compliance-guides",
    status: "published",
    resource: {
      resourceName: "Compliance Guides",
      slug: "compliance-guides",
      shortDescription:
        "Simple, practical HR compliance knowledge hub covering PF, ESIC, payroll, gratuity, bonus and labour law basics by Altroz HR.",
      displayOrder: 2,
      status: "published",
    },
    meta: createMeta({
      title: "HR Compliance Guide India | PF, ESIC, Payroll & Labour Law | Altroz HR",
      description:
        "Learn HR compliance in India with Altroz HR's compliance guides. Explore PF, ESIC, professional tax, gratuity, payroll and labour law basics in simple language.",
      keywords: ["hr compliance", "pf", "esic", "professional tax", "payroll compliance"],
      canonicalUrl: ROUTES.complianceGuides,
      ogTitle: "HR Compliance Guide for Indian Businesses | Altroz HR",
      ogDescription:
        "A simple, practical HR compliance knowledge hub covering PF, ESIC, payroll, gratuity, bonus and labour law basics by Altroz HR.",
    }),
    sections: [
      {
        sectionKey: "compliance-hero",
        sectionType: "hero",
        internalName: "Compliance Hero",
        heading: "HR Compliance Guide for Indian Businesses",
        subheading: "HR Compliance Made Simple",
        description:
          "Understanding HR compliance in India does not have to be complicated. From Provident Fund and ESIC to payroll compliance and employee documentation, Altroz HR brings together simple, practical guides that help HR teams, payroll executives and business owners manage everyday HR work with more confidence.",
        buttonText: "Explore Compliance Guides",
        buttonLink: "#compliance-categories",
        settings: {
          secondaryButtonText: "Book a Free Demo",
          secondaryButtonLink: ROUTES.bookDemo,
        },
        items: [
          { itemType: "hero_highlight", title: "PF & ESIC", description: "Understand the common statutory deductions and related record keeping.", icon: "ShieldCheck" },
          { itemType: "hero_highlight", title: "Payroll Compliance", description: "See how attendance, deductions and payroll records stay aligned.", icon: "Wallet" },
          { itemType: "hero_highlight", title: "Employee Documents", description: "Keep forms, letters and records organized across the employee lifecycle.", icon: "FileText" },
        ],
      },
      {
        sectionKey: "compliance-categories",
        sectionType: "icon_cards",
        internalName: "Compliance Categories",
        heading: "Browse the compliance topics Indian HR and payroll teams commonly encounter",
        subheading: "Explore Compliance Categories",
        description:
          "Each card opens a related Altroz HR page so visitors can move from compliance concepts into the workflows that support them.",
        items: [
          { itemType: "category_card", title: "PF & ESIC", description: "Learn the basics of employee contribution records and benefit-related tracking.", icon: "ShieldCheck", buttonLink: ROUTES.payroll, buttonText: "Open payroll guide" },
          { itemType: "category_card", title: "Professional Tax", description: "See how state-linked tax records and deductions fit into payroll work.", icon: "Wallet", buttonLink: ROUTES.payroll, buttonText: "Open payroll guide" },
          { itemType: "category_card", title: "Employee Records", description: "Store profiles, letters and job details in a central place that is easy to review.", icon: "Users", buttonLink: ROUTES.coreHR, buttonText: "Open employee guide" },
          { itemType: "category_card", title: "Attendance & Leave", description: "Keep time tracking, leave policies and approvals aligned with payroll data.", icon: "CalendarDays", buttonLink: ROUTES.attendanceManagement, buttonText: "Open attendance guide" },
        ],
      },
    ],
  },
  {
    pageKey: "resource-blog",
    pageName: "Blog",
    slug: "resources/blog",
    status: "published",
    resource: {
      resourceName: "Blog",
      slug: "blog",
      shortDescription:
        "Practical HR articles, software insights and workforce management best practices from Altroz HR.",
      displayOrder: 3,
      status: "published",
    },
    meta: createMeta({
      title: "HR Blog | Practical HR Articles & Software Insights - Altroz HR",
      description:
        "Read practical HR articles on attendance, payroll, leave, recruitment and performance management. Simple, actionable HR insights from Altroz HR.",
      keywords: ["hr blog", "attendance", "payroll", "leave", "recruitment"],
      canonicalUrl: ROUTES.blog,
      ogTitle: "HR Blog - Practical Insights & Software Guides | Altroz HR",
      ogDescription:
        "Read practical HR articles on attendance, payroll, leave, recruitment and performance management. Simple, actionable HR insights from Altroz HR.",
    }),
    sections: [
      {
        sectionKey: "blog-hero",
        sectionType: "hero",
        internalName: "Blog Hero",
        heading: "HR Blog - Practical Insights, Software Guides & Workforce Best Practices",
        subheading: "HR Blog by Altroz HR",
        description:
          "Explore simple, practical articles on attendance, payroll, leave, recruitment, performance, and HR automation. Written for Indian businesses, startups, and growing teams who want to build better workplaces with the right HR knowledge and the right HR software.",
        buttonText: "Browse Articles",
        buttonLink: "#categories",
        settings: {
          secondaryButtonText: "Book Free Demo",
          secondaryButtonLink: ROUTES.bookDemo,
        },
      },
      {
        sectionKey: "blog-highlights",
        sectionType: "icon_cards",
        internalName: "Blog Highlights",
        heading: "Latest articles and practical guides",
        subheading: "Highlight Cards",
        description:
          "Fresh HR insights, product updates and business-friendly guidance, organised so readers can quickly find the right topic and move naturally to the right Altroz HR solution.",
        items: [
          { itemType: "highlight_card", title: "Latest Articles", description: "Fresh HR insights, product updates and workforce trends, published regularly for Indian businesses.", icon: "CalendarDays", extraData: { tag: "Fresh updates" } },
          { itemType: "highlight_card", title: "Expert HR Insights", description: "Practical knowledge on compliance, payroll, attendance and performance management, written in simple language.", icon: "Sparkles", extraData: { tag: "Simple guidance" } },
          { itemType: "highlight_card", title: "Practical Business Guides", description: "Step-by-step guides that help HR teams and founders solve everyday people-management challenges.", icon: "TrendingUp", extraData: { tag: "Actionable advice" } },
        ],
      },
      {
        sectionKey: "blog-categories",
        sectionType: "icon_cards",
        internalName: "Browse Topics",
        heading: "Featured article and category cards built for easy blog navigation",
        subheading: "Browse by Topics",
        description:
          "The first card spotlights the new HRMS guide, and the remaining cards help readers jump into related HR topics quickly.",
        items: [
          { itemType: "category_card", title: "What is HRMS?", description: "A complete guide to HRMS for Indian businesses, with clear explanations of the core modules, benefits, implementation steps, and the difference between manual HR and software-driven HR.", icon: "BookOpen", buttonLink: `${ROUTES.blog}/what-is-hrms` },
          { itemType: "category_card", title: "Attendance Management", description: "Guides on attendance tracking, GPS attendance, geo-fencing and shift management.", icon: "CalendarDays", buttonLink: ROUTES.attendanceManagement },
          { itemType: "category_card", title: "Payroll", description: "Practical articles on payroll processing, salary structuring and payroll compliance.", icon: "Wallet", buttonLink: ROUTES.payroll },
          { itemType: "category_card", title: "Leave Management", description: "Insights on leave policies, approvals and leave tracking for growing teams.", icon: "ClipboardList", buttonLink: ROUTES.leaveManagement },
        ],
      },
    ],
  },
  {
    pageKey: "resource-faq",
    pageName: "FAQ",
    slug: "resources/faq",
    status: "published",
    resource: {
      resourceName: "FAQ",
      slug: "faq",
      shortDescription:
        "Everything HR Managers, Business Owners, Startups, SMEs, Enterprises, Payroll Executives, Recruiters, and Operations Teams need to know about Altroz HR.",
      displayOrder: 4,
      status: "published",
    },
    meta: createMeta({
      title: "Altroz HR FAQs | Knowledge Base and Frequently Asked Questions",
      description:
        "Everything HR Managers, Business Owners, Startups, SMEs, Enterprises, Payroll Executives, Recruiters, and Operations Teams need to know about Altroz HR - the complete HR software for modern businesses.",
      keywords: ["faq", "knowledge base", "hr software faq", "payroll faq"],
      canonicalUrl: ROUTES.faq,
      ogTitle: "Altroz HR FAQs | Knowledge Base and Frequently Asked Questions",
      ogDescription:
        "Everything HR Managers, Business Owners, Startups, SMEs, Enterprises, Payroll Executives, Recruiters, and Operations Teams need to know about Altroz HR - the complete HR software for modern businesses.",
    }),
    sections: [
      {
        sectionKey: "faq-hero",
        sectionType: "hero",
        internalName: "FAQ Hero",
        heading: "How can we help you today?",
        subheading: "Knowledge Base",
        description:
          "Search our knowledge base or browse FAQs by category to get quick, clear answers about Altroz HR.",
        buttonText: "Browse Categories",
        buttonLink: "#faq-sections",
        settings: {
          popularSearches: [
            "What is HR software?",
            "How does payroll work?",
            "What is GPS attendance?",
            "Employee Self Service",
            "HR compliance",
          ],
        },
      },
      {
        sectionKey: "faq-general",
        sectionType: "faq",
        internalName: "General HR Software",
        heading: "General HR Software",
        description: "Core questions about HR software and HRMS.",
        items: [
          { itemType: "faq", title: "What is HR software?", description: "HR software is a digital system that helps businesses manage day-to-day human resource tasks like employee records, attendance, leave, payroll, and recruitment from one place." },
          { itemType: "faq", title: "What is HRMS?", description: "HRMS stands for Human Resource Management System. It is a broader term used for software that manages the complete employee lifecycle, from onboarding to exit, including attendance, leave, payroll, performance, and employee records." },
          { itemType: "faq", title: "Why do businesses need HR software?", description: "Businesses need HR software because manual HR processes are slow, error-prone, and hard to scale as the team grows." },
        ],
      },
      {
        sectionKey: "faq-quick-links",
        sectionType: "cta_banner",
        internalName: "Still Have Questions",
        heading: "Our HR experts are here to help you choose the right modules for your business.",
        description:
          "Explore the right resources, compare topics, and jump into the pages that fit your next step best.",
        buttonText: "Book a Free Demo",
        buttonLink: ROUTES.bookDemo,
        items: [
          { itemType: "quick_link", title: "Learn", buttonLink: ROUTES.learn },
          { itemType: "quick_link", title: "Compliance Guides", buttonLink: ROUTES.complianceGuides },
          { itemType: "quick_link", title: "Blog", buttonLink: ROUTES.blog },
          { itemType: "quick_link", title: "Support", buttonLink: ROUTES.support },
        ],
      },
    ],
  },
];

export const pricingPlansSeed = [
  {
    name: "Basic",
    slug: "basic",
    shortDescription:
      "Core employee records, attendance, leave, team actions, reporting and admin controls for teams that want a compact starting point.",
    currency: "INR",
    monthlyPrice: 21,
    billingLabel: "per employee / month",
    badgeText: "",
    buttonText: "Know more",
    buttonLink: "#feature-comparison",
    isPopular: false,
    isActive: true,
    displayOrder: 0,
    settings: {
      accent: "bg-primary-soft text-primary",
      icon: "BadgeCheck",
      audience: "Smaller teams",
    },
    features: [
      { featureText: "Employee management and directory tools", isIncluded: true },
      { featureText: "Attendance, leave and reporting essentials", isIncluded: true },
      { featureText: "Administration and organization setup", isIncluded: true },
    ],
  },
  {
    name: "Professional",
    slug: "professional",
    shortDescription:
      "A broader operational plan with recruitment, documents, payroll, compliance, assets and performance modules.",
    currency: "INR",
    monthlyPrice: 36,
    billingLabel: "per employee / month",
    buttonText: "Know more",
    buttonLink: "#feature-comparison",
    isPopular: true,
    isActive: true,
    displayOrder: 1,
    settings: {
      accent: "bg-[#ecfdf3] text-success",
      icon: "ShieldCheck",
      audience: "Growing teams",
    },
    features: [
      { featureText: "Everything in Basic plus deeper workflows", isIncluded: true },
      { featureText: "Recruitment, documents and payroll coverage", isIncluded: true },
      { featureText: "Compliance, assets and performance features", isIncluded: true },
    ],
  },
  {
    name: "Premium",
    slug: "premium",
    shortDescription:
      "The widest coverage in the sheet, including premium attendance, extra reporting depth and the fullest feature set.",
    currency: "INR",
    monthlyPrice: 53,
    billingLabel: "per employee / month",
    buttonText: "Know more",
    buttonLink: "#feature-comparison",
    isPopular: false,
    isActive: true,
    displayOrder: 2,
    settings: {
      accent: "bg-surface text-ink",
      icon: "Crown",
      audience: "Larger rollouts",
    },
    features: [
      { featureText: "Everything in Professional", isIncluded: true },
      { featureText: "Shift management and salary history", isIncluded: true },
      { featureText: "Broader reporting and advanced coverage", isIncluded: true },
    ],
  },
];

export const contactSettingsSeed = {
  pageTitle: "Get in Touch with Altroz HRMS",
  pageSubtitle: "Contact Us",
  description:
    "We are here to help you simplify your HR operations. Whether you are evaluating HRMS software, requesting a product demonstration, planning implementation, or looking for product support, the Altroz Technologies team can help you identify the right next step.",
  address: "",
  phonePrimary: "",
  phoneSecondary: "",
  emailPrimary: "",
  emailSecondary: "",
  businessHours: "",
  mapEmbedUrl: "",
  formHeading: "Share your enquiry with the Altroz HRMS team",
  formDescription:
    "Fill in the details below and the form will prepare a WhatsApp enquiry draft using the verified channel.",
  submitButtonText: "Send Enquiry",
  successMessage:
    "Your enquiry draft opened in WhatsApp. Send it there to complete submission.",
  errorMessage:
    "Your browser blocked the WhatsApp window. Please allow popups and try again.",
  socialLinks: [],
  settings: {
    whatsappNumber: "918446337392",
    preferredContactMethods: ["Phone Call", "Email", "WhatsApp", "Online Meeting"],
    employeeRangeOptions: [
      "1-20",
      "21-50",
      "51-100",
      "101-250",
      "251-500",
      "501-1,000",
      "More than 1,000",
      "Not sure",
    ],
  },
};

export function getSeedPageByKey(pageKey) {
  return cmsSeedPages.find((page) => page.pageKey === pageKey) ?? null;
}

export function getSeedResourceBySlug(slug) {
  return cmsSeedPages.find((page) => page.resource?.slug === slug) ?? null;
}
