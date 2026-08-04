import { ROUTES } from "@/routes/routeConfig.js";

export type ManagedSectionCopy = {
  eyebrow: string;
  title: string;
  description: string;
};

export type ManagedCardItem = {
  id: string;
  title: string;
  description: string;
  href?: string;
  ctaLabel?: string;
  note?: string;
  value?: string;
  bullets?: string[];
};

export type ManagedWorkflowItem = {
  id: string;
  title: string;
  steps: string[];
};

export type ManagedFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type ManagedPlanCard = {
  id: string;
  name: string;
  price: number;
  summary: string;
  bullets: string[];
};

export type ManagedPricingState = "included" | "notIncluded" | "limited" | "optional" | "addon";

export type ManagedFeatureRow = {
  id: string;
  label: string;
  basic: ManagedPricingState;
  professional: ManagedPricingState;
  premium: ManagedPricingState;
  note?: string;
};

export type ManagedFeatureGroup = {
  id: string;
  title: string;
  description: string;
  rows: ManagedFeatureRow[];
};

export type HomePageData = {
  heroBadge: string;
  heroSubtitle: string;
  overviewTitle: string;
  overviewDescription: string;
  productsSection: ManagedSectionCopy;
  strengthsSection: ManagedSectionCopy;
  ecosystemSection: ManagedSectionCopy;
  industriesSection: ManagedSectionCopy;
  workflowsSection: ManagedSectionCopy;
  benefitsSection: ManagedSectionCopy;
  faqSection: ManagedSectionCopy;
  ctaEyebrow: string;
  productCards: ManagedCardItem[];
  strengths: ManagedCardItem[];
  ecosystemCards: ManagedCardItem[];
  industries: ManagedCardItem[];
  workflows: ManagedWorkflowItem[];
  benefits: ManagedCardItem[];
  faqs: ManagedFaqItem[];
};

export type PricingPageData = {
  heroBadge: string;
  highlights: ManagedCardItem[];
  comparisonFocusTitle: string;
  comparisonFocusDescription: string;
  comparisonFocusItems: string[];
  calculatorSection: ManagedSectionCopy;
  planCardsSection: ManagedSectionCopy;
  featureComparisonSection: ManagedSectionCopy;
  addOnsSection: ManagedSectionCopy;
  ctaEyebrow: string;
  planCards: ManagedPlanCard[];
  featureGroups: ManagedFeatureGroup[];
  addOns: ManagedCardItem[];
};

export type ContactPageData = {
  heroBadge: string;
  quickContactSection: ManagedSectionCopy;
  formSection: ManagedSectionCopy;
  ctaEyebrow: string;
  heroPaths: ManagedCardItem[];
  quickContactMethods: ManagedCardItem[];
};

export type ManagedPageData = {
  home?: HomePageData;
  pricing?: PricingPageData;
  contact?: ContactPageData;
};

export const managedResourcePageSeeds = [
  {
    id: "page-learn",
    slug: ROUTES.learn,
    title: "Learn",
    summary:
      "Learning hub for business email communication, campaign planning, SMTP, templates, scheduling, and analytics.",
    focusKeyword: "bulk email learning resources",
    owner: "Avni Mehra",
    heroTitle: "Learn Business Email Communication, Bulk Email & Campaign Management",
    heroDescription:
      "Explore practical learning content on business email communication, broadcasting, SMTP, templates, scheduling and analytics.",
    ctaTitle: "Keep learning with guided email communication resources",
    ctaDescription:
      "Review published learning resources from the admin workspace and continue exploring bulk email education content.",
    ctaButtonText: "Start learning",
    ctaButtonUrl: ROUTES.bulkEmailBroadcast,
    seoScore: 86,
    trafficShare: 9,
    readingTime: "8 min",
    sections: 8,
    tags: ["Learn", "Bulk Email", "Education"],
    publishedAt: "2026-08-04",
    status: "Published" as const,
  },
  {
    id: "page-compliance-guides",
    slug: ROUTES.complianceGuides,
    title: "Compliance Guides",
    summary:
      "Guide library for PF, ESIC, payroll compliance, employee records, and HR process alignment for Indian businesses.",
    focusKeyword: "HR compliance guide India",
    owner: "Nisha Verma",
    heroTitle: "HR Compliance Guide for Indian Businesses",
    heroDescription:
      "Explore practical HR compliance guidance across PF, ESIC, payroll, employee records and workplace processes.",
    ctaTitle: "Build a stronger compliance workflow",
    ctaDescription:
      "Browse published compliance guides and connect the content to your payroll, attendance, and employee records workflows.",
    ctaButtonText: "Explore Compliance Guides",
    ctaButtonUrl: "#compliance-categories",
    seoScore: 84,
    trafficShare: 8,
    readingTime: "9 min",
    sections: 7,
    tags: ["Compliance", "PF", "Payroll"],
    publishedAt: "2026-08-04",
    status: "Published" as const,
  },
  {
    id: "page-blog-hub",
    slug: ROUTES.blog,
    title: "Blog",
    summary:
      "Practical HR, payroll, SEO, and compliance articles for growing teams, delivered through the admin-managed blog feed.",
    focusKeyword: "HR blog",
    owner: "Sara Khan",
    heroTitle: "Practical HR, payroll, SEO, and compliance articles for growing teams",
    heroDescription:
      "Review admin-managed blog articles with featured images, author details, publish dates, reading time, and SEO metadata.",
    ctaTitle: "Keep your content engine moving",
    ctaDescription:
      "The public blog feed reads from the admin-managed blog workspace, so approved articles can be published without manual code changes.",
    ctaButtonText: "Book Free Demo",
    ctaButtonUrl: ROUTES.bookDemo,
    seoScore: 88,
    trafficShare: 10,
    readingTime: "7 min",
    sections: 5,
    tags: ["Blog", "SEO", "Content"],
    publishedAt: "2026-08-04",
    status: "Published" as const,
  },
  {
    id: "page-faq-hub",
    slug: ROUTES.faq,
    title: "FAQ",
    summary:
      "Knowledge base for Altroz HR covering HR software, payroll, attendance, compliance, and operations topics.",
    focusKeyword: "HRMS FAQ",
    owner: "Ria Das",
    heroTitle: "How can we help you today?",
    heroDescription:
      "Search the knowledge base or browse FAQs by category to find clear answers about Altroz HR.",
    ctaTitle: "Need answers fast?",
    ctaDescription:
      "Use the public FAQ hub together with admin-managed FAQ collections to keep product information current and easy to find.",
    ctaButtonText: "Browse Categories",
    ctaButtonUrl: "#faq-sections",
    seoScore: 83,
    trafficShare: 7,
    readingTime: "6 min",
    sections: 6,
    tags: ["FAQ", "Knowledge Base", "Support"],
    publishedAt: "2026-08-04",
    status: "Published" as const,
  },
];

const homePageDataDefaults: HomePageData = {
  heroBadge: "Trusted Enterprise Business Software",
  heroSubtitle: "One Platform. Three Enterprise Solutions. A Single Trusted Brand.",
  overviewTitle: "One brand. Three product experiences.",
  overviewDescription:
    "Choose HR, Asset Management, or Bulk Email as a standalone product or use them together in one Altroz ecosystem.",
  productsSection: {
    eyebrow: "Our Products",
    title: "One Company. Three Powerful Business Solutions.",
    description:
      "Altroz Technologies brings together enterprise-grade software products that solve everyday business challenges. Explore the solution that fits your team, or use them together for a fully connected way of working.",
  },
  strengthsSection: {
    eyebrow: "Why Businesses Choose Altroz",
    title: "Reliable software built for day-to-day business work",
    description:
      "Altroz combines practical product design, cloud access, and business-grade control so teams can move faster without losing visibility.",
  },
  ecosystemSection: {
    eyebrow: "Altroz Ecosystem",
    title: "One brand at the top, three connected product nodes underneath",
    description:
      "Altroz Technologies is the parent brand, and each product can work on its own or together as a connected ecosystem. Businesses can adopt only the product they need, or combine them as they grow.",
  },
  industriesSection: {
    eyebrow: "Industries We Serve",
    title: "Built for businesses across many sectors",
    description:
      "From manufacturing plants to corporate offices, Altroz gives each team a clearer way to manage people, assets, and communication.",
  },
  workflowsSection: {
    eyebrow: "Why Our Products Work Better Together",
    title: "Connected workflows that keep business moments moving",
    description:
      "Altroz HR, Altroz Asset Management, and Altroz Bulk Email can be used together to support complete business workflows with less manual effort.",
  },
  benefitsSection: {
    eyebrow: "Business Benefits",
    title: "A clearer way to run the business every day",
    description:
      "These benefits are what teams feel after adopting Altroz across HR, assets, and email.",
  },
  faqSection: {
    eyebrow: "Frequently Asked Questions",
    title: "Clear answers for teams reviewing Altroz",
    description: "Common product, ecosystem, and company questions answered in one place.",
  },
  ctaEyebrow: "Final CTA",
  productCards: [
    {
      id: "home-product-hr",
      title: "Altroz HR",
      description:
        "Manage attendance, payroll, leave, recruitment, performance, and workforce management in one connected platform.",
      href: ROUTES.hrmsHome,
      note: "HR management software",
      bullets: ["Attendance", "Payroll", "Recruitment", "Leave", "Performance", "HR Analytics"],
    },
    {
      id: "home-product-asset",
      title: "Altroz Asset Management",
      description:
        "Manage, track, assign, maintain, and monitor business assets from one central platform.",
      href: ROUTES.assetManagement,
      note: "Asset tracking software",
      bullets: ["Asset Dashboard", "Asset Tracking", "QR Code", "Maintenance", "Reports", "Warranty Tracking"],
    },
    {
      id: "home-product-email",
      title: "Altroz Bulk Email",
      description:
        "Enterprise bulk email broadcasting platform for business communication and campaign management.",
      href: ROUTES.bulkEmail,
      note: "Email broadcasting platform",
      bullets: ["Broadcast", "Scheduling", "Templates", "Analytics", "SMTP", "Reports"],
    },
  ],
  strengths: [
    {
      id: "home-strength-1",
      title: "Enterprise software",
      description:
        "Built for the real needs of growing businesses, with the depth and reliability that enterprise teams expect from their software.",
    },
    {
      id: "home-strength-2",
      title: "Cloud based platform",
      description:
        "Access your HR, asset, and communication data securely from anywhere, on any device, without depending on local infrastructure.",
    },
    {
      id: "home-strength-3",
      title: "Easy to use",
      description:
        "A clean, intuitive interface means teams can start using Altroz products with minimal training and no steep learning curve.",
    },
    {
      id: "home-strength-4",
      title: "Scalable solutions",
      description:
        "Altroz products are designed to grow with your organisation, from a small team to a multi-location enterprise.",
    },
    {
      id: "home-strength-5",
      title: "Business automation",
      description:
        "Automate repetitive HR, asset, and communication tasks so your teams can focus on work that truly needs their attention.",
    },
    {
      id: "home-strength-6",
      title: "Secure platform",
      description:
        "Business data is handled with strong access controls and security practices built into every Altroz product.",
    },
  ],
  ecosystemCards: [
    {
      id: "home-ecosystem-1",
      title: "Altroz HR",
      description: "Employee onboarding, attendance, payroll, and exit workflows.",
    },
    {
      id: "home-ecosystem-2",
      title: "Altroz Asset Management",
      description: "QR asset tagging, allocation, maintenance, and recovery tracking.",
    },
    {
      id: "home-ecosystem-3",
      title: "Altroz Bulk Email",
      description: "Broadcast communication, campaigns, and open-rate reporting.",
    },
  ],
  industries: [
    {
      id: "home-industry-1",
      title: "Manufacturing",
      description:
        "Track machinery and equipment, manage shift-based workforces, and keep suppliers and staff informed through one connected software ecosystem.",
    },
    {
      id: "home-industry-2",
      title: "IT & Software",
      description:
        "Manage devices, licences, payroll, performance reviews, and distributed team communication in one place.",
    },
    {
      id: "home-industry-3",
      title: "Healthcare",
      description:
        "Track medical equipment, manage staff attendance and shift schedules, and communicate securely across departments.",
    },
    {
      id: "home-industry-4",
      title: "Education",
      description:
        "Manage faculty records, track institutional assets, and broadcast circulars or updates to staff and students.",
    },
    {
      id: "home-industry-5",
      title: "Retail",
      description:
        "Handle multi-location attendance and payroll, track store assets, and run promotional or operational email campaigns.",
    },
    {
      id: "home-industry-6",
      title: "Corporate Offices",
      description:
        "Simplify employee management and leave approvals, track office assets, and keep internal communication organized.",
    },
    {
      id: "home-industry-7",
      title: "Finance",
      description:
        "Maintain accurate payroll and compliance-ready records, track physical and IT assets, and send secure business communication.",
    },
    {
      id: "home-industry-8",
      title: "Logistics",
      description:
        "Manage a distributed workforce, track vehicles and equipment, and keep drivers, warehouses, and offices connected through timely updates.",
    },
  ],
  workflows: [
    {
      id: "home-workflow-1",
      title: "Employee Onboarding",
      steps: [
        "Employee joins",
        "HR creates employee profile in Altroz HR",
        "Laptop assigned using Altroz Asset Management",
        "Welcome email sent through Altroz Bulk Email",
      ],
    },
    {
      id: "home-workflow-2",
      title: "Employee Exit",
      steps: [
        "Employee resigns",
        "Exit recorded in Altroz HR",
        "Assigned laptop and equipment returned in Asset Management",
        "Exit confirmation and handover email sent through Bulk Email",
      ],
    },
    {
      id: "home-workflow-3",
      title: "Asset Maintenance Update",
      steps: [
        "Asset due for maintenance",
        "Maintenance scheduled in Asset Management",
        "Concerned employee or department notified in advance",
        "Attendance and downtime tracked in Altroz HR",
      ],
    },
    {
      id: "home-workflow-4",
      title: "Company-Wide Announcement",
      steps: [
        "New policy created by HR team in Altroz HR",
        "Policy document broadcast through Altroz Bulk Email",
        "Relevant equipment or facility changes updated in Asset Management",
      ],
    },
  ],
  benefits: [
    { id: "home-benefit-1", title: "Reduce Manual Work", description: "Automate routine HR, asset, and communication tasks so teams spend less time on repetitive paperwork." },
    { id: "home-benefit-2", title: "Improve Productivity", description: "Give employees and managers the tools to complete tasks faster, with fewer delays and errors." },
    { id: "home-benefit-3", title: "Centralise Business Operations", description: "Bring people, asset, and communication data into one connected ecosystem instead of scattered spreadsheets and tools." },
    { id: "home-benefit-4", title: "Improve Visibility", description: "Get a clear, real-time view of attendance, assets, and communication performance across the business." },
    { id: "home-benefit-5", title: "Manage Employees", description: "Handle the full employee lifecycle, from recruitment to exit, with Altroz HR." },
    { id: "home-benefit-6", title: "Manage Assets", description: "Track, assign, and maintain every business asset with Altroz Asset Management." },
    { id: "home-benefit-7", title: "Business Communication", description: "Reach employees, customers, or stakeholders reliably through Altroz Bulk Email." },
    { id: "home-benefit-8", title: "Business Growth", description: "Free up time and resources so your team can focus on growing the business, not managing paperwork." },
  ],
  faqs: [
    { id: "home-faq-1", question: "What is Altroz Technologies?", answer: "Altroz Technologies Pvt. Ltd. is an enterprise business software company that builds cloud-based solutions for HR management, asset management, and bulk email communication." },
    { id: "home-faq-2", question: "Which software products does Altroz offer?", answer: "Altroz Technologies offers Altroz HR, Altroz Asset Management, and Altroz Bulk Email as its three core business software products." },
    { id: "home-faq-3", question: "Can I use only one Altroz product?", answer: "Yes. Each Altroz product is built to work as a complete stand-alone solution for your business." },
    { id: "home-faq-4", question: "Can all Altroz products work together?", answer: "Yes. Altroz HR, Altroz Asset Management, and Altroz Bulk Email are designed to work smoothly together as one connected ecosystem." },
    { id: "home-faq-5", question: "Who should use Altroz software?", answer: "Altroz software is designed for business owners, HR teams, IT managers, operations teams, and finance teams across SMEs and enterprises." },
  ],
};

const pricingPageDataDefaults: PricingPageData = {
  heroBadge: "Pricing sheet",
  highlights: [
    { id: "pricing-highlight-1", title: "Basic", value: "₹21 / employee / month", description: "Entry pricing for core HR, attendance and leave." },
    { id: "pricing-highlight-2", title: "Professional", value: "₹36 / employee / month", description: "Expanded coverage for recruiting, payroll and compliance." },
    { id: "pricing-highlight-3", title: "Premium", value: "₹53 / employee / month", description: "Full-suite coverage for the broadest rollout." },
    { id: "pricing-highlight-4", title: "Optional add-ons", value: "Geo tracking, integrations and custom work", description: "Extra capabilities can be layered on as needed." },
  ],
  comparisonFocusTitle: "Section cards for each pricing feature group",
  comparisonFocusDescription:
    "The pricing page groups every major module into a clear comparison block so plan differences are easy to scan and present.",
  comparisonFocusItems: [
    "Employee management",
    "Attendance and leave",
    "Recruitment and documents",
    "Payroll, compliance and reports",
    "Assets, performance and administration",
    "Optional add-ons and integrations",
  ],
  calculatorSection: {
    eyebrow: "Instant estimate",
    title: "Estimate pricing by team size",
    description:
      "Slide the employee count to see how Basic, Professional and Premium scale on your pricing page using the same plan prices from Altroz HRMS.",
  },
  planCardsSection: {
    eyebrow: "Plan cards",
    title: "Three pricing plans, presented clearly",
    description:
      "The plans below summarize the pricing sheet before the feature sections break the coverage down module by module.",
  },
  featureComparisonSection: {
    eyebrow: "Feature comparison",
    title: "Section cards for the pricing features",
    description:
      "Every major module from the sheet is grouped into a dedicated card so the plan differences are easy to scan, compare and present on desktop or mobile.",
  },
  addOnsSection: {
    eyebrow: "Add On",
    title: "Optional capabilities for any plan",
    description:
      "Optional capabilities that can be attached to any of the three plans when your team needs extra coverage.",
  },
  ctaEyebrow: "Next step",
  planCards: [
    {
      id: "pricing-plan-basic",
      name: "Basic",
      price: 21,
      summary:
        "Core employee records, attendance, leave, team actions, reporting and admin controls for teams that want a compact starting point.",
      bullets: [
        "Employee management and directory tools",
        "Attendance, leave and reporting essentials",
        "Administration and organization setup",
      ],
    },
    {
      id: "pricing-plan-professional",
      name: "Professional",
      price: 36,
      summary:
        "A broader operational plan with recruitment, documents, payroll, compliance, assets and performance modules.",
      bullets: [
        "Everything in Basic plus deeper workflows",
        "Recruitment, documents and payroll coverage",
        "Compliance, assets and performance features",
      ],
    },
    {
      id: "pricing-plan-premium",
      name: "Premium",
      price: 53,
      summary:
        "The widest coverage in the sheet, including premium attendance, extra reporting depth and the fullest feature set.",
      bullets: [
        "Everything in Professional",
        "Shift management and salary history",
        "Broader reporting and advanced coverage",
      ],
    },
  ],
  featureGroups: [
    {
      id: "pricing-group-employee",
      title: "Employee Management",
      description: "Core employee records, profile tools and organization setup.",
      rows: [
        { id: "employee-database", label: "Employee Database", basic: "included", professional: "included", premium: "included" },
        { id: "employee-profile-management", label: "Employee Profile Management", basic: "included", professional: "included", premium: "included" },
        { id: "employee-lifecycle-tracking", label: "Employee Lifecycle Tracking", basic: "notIncluded", professional: "included", premium: "included" },
        { id: "employee-document-management", label: "Employee Document Management", basic: "included", professional: "included", premium: "included" },
      ],
    },
    {
      id: "pricing-group-attendance",
      title: "Attendance",
      description: "Attendance capture, shift control and attendance reporting.",
      rows: [
        { id: "biometric-attendance", label: "Biometric Attendance Integration", basic: "included", professional: "included", premium: "included" },
        { id: "gps-attendance", label: "GPS Based Attendance", basic: "notIncluded", professional: "included", premium: "included" },
        { id: "geo-fencing", label: "Geo Fencing", basic: "optional", professional: "included", premium: "included", note: "Add-on on Basic" },
        { id: "shift-management", label: "Shift Management", basic: "notIncluded", professional: "notIncluded", premium: "included" },
      ],
    },
    {
      id: "pricing-group-leave",
      title: "Leave",
      description: "Leave workflows, calendar visibility and leave analytics.",
      rows: [
        { id: "leave-dashboard", label: "Leave Dashboard", basic: "included", professional: "included", premium: "included" },
        { id: "leave-approval-workflow", label: "Leave Approval Workflow", basic: "included", professional: "included", premium: "included" },
        { id: "multi-level-approval", label: "Multi-Level Approval", basic: "notIncluded", professional: "included", premium: "included" },
        { id: "leave-analytics", label: "Leave Analytics", basic: "included", professional: "included", premium: "included" },
      ],
    },
    {
      id: "pricing-group-recruitment",
      title: "Recruitment",
      description: "Applicant flow and recruiting coverage for advanced plans.",
      rows: [
        { id: "position-management", label: "Position Management", basic: "notIncluded", professional: "notIncluded", premium: "included" },
        { id: "applicant-management", label: "Applicant Management", basic: "notIncluded", professional: "notIncluded", premium: "included" },
        { id: "interview-scheduling", label: "Interview Scheduling", basic: "notIncluded", professional: "notIncluded", premium: "included" },
      ],
    },
    {
      id: "pricing-group-documents",
      title: "Documents",
      description: "Offer letters, templates, employee documents and document control.",
      rows: [
        { id: "appointment-letter", label: "Appointment Letter", basic: "notIncluded", professional: "included", premium: "included" },
        { id: "pdf-document-generation", label: "PDF Document Generation", basic: "notIncluded", professional: "included", premium: "included" },
        { id: "document-version-control", label: "Document Version Control", basic: "notIncluded", professional: "notIncluded", premium: "included" },
      ],
    },
    {
      id: "pricing-group-payroll",
      title: "Payroll",
      description: "Payroll processing, salary rules, reports and payroll analytics.",
      rows: [
        { id: "payroll-dashboard", label: "Payroll Dashboard", basic: "notIncluded", professional: "included", premium: "included" },
        { id: "salary-processing", label: "Salary Processing", basic: "notIncluded", professional: "included", premium: "included" },
        { id: "salary-history", label: "Salary History", basic: "notIncluded", professional: "notIncluded", premium: "included" },
      ],
    },
    {
      id: "pricing-group-compliance",
      title: "Compliance",
      description: "Statutory settings and compliance reporting.",
      rows: [
        { id: "pf", label: "PF", basic: "notIncluded", professional: "included", premium: "included" },
        { id: "esi", label: "ESI", basic: "notIncluded", professional: "included", premium: "included" },
        { id: "compliance-reports", label: "Compliance Reports", basic: "notIncluded", professional: "notIncluded", premium: "included" },
      ],
    },
    {
      id: "pricing-group-assets",
      title: "Asset Management",
      description: "Asset allocation, tracking, maintenance and reporting.",
      rows: [
        { id: "asset-dashboard", label: "Asset Dashboard", basic: "notIncluded", professional: "included", premium: "included" },
        { id: "asset-maintenance", label: "Asset Maintenance", basic: "notIncluded", professional: "included", premium: "included" },
        { id: "asset-reports", label: "Asset Reports", basic: "notIncluded", professional: "included", premium: "included" },
      ],
    },
    {
      id: "pricing-group-performance",
      title: "Performance",
      description: "Performance dashboards and employee performance tracking.",
      rows: [
        { id: "performance-dashboard", label: "Performance Dashboard", basic: "notIncluded", professional: "included", premium: "included" },
        { id: "employee-performance-tracking", label: "Employee Performance Tracking", basic: "notIncluded", professional: "included", premium: "included" },
      ],
    },
    {
      id: "pricing-group-reports",
      title: "Reports",
      description: "Export-ready reports for people, payroll, attendance and assets.",
      rows: [
        { id: "employee-reports", label: "Employee Reports", basic: "included", professional: "included", premium: "included" },
        { id: "payroll-reports", label: "Payroll Reports", basic: "notIncluded", professional: "included", premium: "included" },
        { id: "asset-reporting", label: "Asset Reports", basic: "notIncluded", professional: "notIncluded", premium: "included" },
      ],
    },
    {
      id: "pricing-group-administration",
      title: "Administration",
      description: "Organization setup, access control and system governance.",
      rows: [
        { id: "role-management", label: "Role Management", basic: "included", professional: "included", premium: "included" },
        { id: "user-management", label: "User Management", basic: "included", professional: "included", premium: "included" },
        { id: "rule-engine", label: "Rule Engine", basic: "included", professional: "included", premium: "included" },
      ],
    },
  ],
  addOns: [
    { id: "pricing-addon-1", title: "Geo Tracking", description: "Optional add-on from the pricing sheet.", note: "+ ₹70 / employee / month" },
    { id: "pricing-addon-2", title: "Mobile App", description: "Listed as an optional extra in the sheet.", note: "Plan entitlement should be confirmed during quote finalization." },
    { id: "pricing-addon-3", title: "API Integration", description: "Optional integration item from the sheet.", note: "Best suited for teams with custom workflows." },
    { id: "pricing-addon-4", title: "WhatsApp Integration", description: "Optional communication add-on.", note: "Useful for alerts and operational messaging." },
    { id: "pricing-addon-5", title: "Biometric Device", description: "Optional hardware integration.", note: "Can support attendance workflows where needed." },
    { id: "pricing-addon-6", title: "Custom Development", description: "Optional implementation work.", note: "For org-specific enhancements or workflows." },
  ],
};

const contactPageDataDefaults: ContactPageData = {
  heroBadge: "Contact Us",
  quickContactSection: {
    eyebrow: "Quick Contact",
    title: "Choose the Best Way to Reach Us",
    description: "Use one of the verified paths below to reach the Altroz HRMS team.",
  },
  formSection: {
    eyebrow: "Send a Message",
    title: "Share your enquiry with the Altroz HRMS team",
    description: "Fill in the details below and the form will prepare a WhatsApp enquiry draft using the verified channel.",
  },
  ctaEyebrow: "Ready to Start",
  heroPaths: [
    { id: "contact-path-enquiry", title: "Product Enquiry", description: "Ask about product fit, pricing, or the right starting point.", href: "#contact-form" },
    { id: "contact-path-demo", title: "Book a Demo", description: "Open the demo workflow for a guided product walkthrough.", href: ROUTES.bookDemo },
    { id: "contact-path-support", title: "Support", description: "Use the support route for customer help and product questions.", href: ROUTES.support },
  ],
  quickContactMethods: [
    { id: "contact-method-whatsapp", title: "WhatsApp", description: "Send a fast product or sales enquiry using the verified WhatsApp route.", href: "https://wa.me/919876543210" },
    { id: "contact-method-demo", title: "Book Demo", description: "Open the guided demo booking route and request a walkthrough.", href: ROUTES.bookDemo },
    { id: "contact-method-support", title: "Support", description: "Use the support route for customer help and product questions.", href: ROUTES.support },
  ],
};

export function getDefaultManagedPageData(slug: string): ManagedPageData | undefined {
  switch (slug) {
    case ROUTES.home:
      return { home: homePageDataDefaults };
    case ROUTES.pricing:
      return { pricing: pricingPageDataDefaults };
    case ROUTES.contact:
      return { contact: contactPageDataDefaults };
    default:
      return undefined;
  }
}

export function cloneManagedPageData<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
