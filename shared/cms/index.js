import { ROUTES } from "../../src/routes/routeConfig.js";
import { assetManagementFaqSeedCategories } from "../assetManagementFaqSections.js";
import { blogSeedPosts } from "../blog/index.js";
import { hrmsPricingFeatureSections } from "../pricingFeatureSections.js";

export const seedVersion = "2026-08-05";

const createMeta = ({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage = null,
  ogImageAlt = null,
  indexable = true,
}) => ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage,
  ogImageAlt,
  indexable,
});

const pricingPlanColumns = ["Basic", "Professional", "Premium"];

const createPricingFeatureComparisonSections = (startOrder = 0) =>
  hrmsPricingFeatureSections.map((section, sectionIndex) => ({
    sectionKey: section.sectionKey,
    sectionType: "pricing_feature_comparison",
    internalName: section.heading,
    heading: section.heading,
    subheading: section.eyebrow ?? "Feature Section",
    description: section.description,
    settings: {
      planColumns: pricingPlanColumns,
    },
    displayOrder: startOrder + sectionIndex,
    items: section.rows.map((feature, featureIndex) => ({
      itemType: "pricing_feature_row",
      title: feature.title,
      description: feature.note ?? null,
      displayOrder: featureIndex,
      extraData: {
        basic: feature.basic,
        professional: feature.professional,
        premium: feature.premium,
      },
    })),
  }));

const createManagedCmsPage = ({
  pageKey,
  pageName,
  route,
  title,
  description,
  keywords,
  canonicalUrl,
  ogTitle,
  ogDescription,
  heroEyebrow,
  heroTitle,
  heroDescription,
  buttonText = "Book Free Demo",
  buttonLink = ROUTES.bookDemo,
  secondaryButtonText = "Explore Features",
  secondaryButtonLink,
  sections,
}) => ({
  pageKey,
  pageName,
  slug: route.replace(/^\/+/, ""),
  status: "published",
  meta: createMeta({
    title,
    description,
    keywords,
    canonicalUrl: canonicalUrl ?? route,
    ogTitle: ogTitle ?? title,
    ogDescription: ogDescription ?? description,
  }),
  sections: sections ?? [
    {
      sectionKey: "hero",
      sectionType: "hero",
      internalName: "Hero",
      heading: heroTitle,
      subheading: heroEyebrow,
      description: heroDescription,
      buttonText,
      buttonLink,
      isRequired: true,
      settings: {
        secondaryButtonText,
        secondaryButtonLink: secondaryButtonLink ?? route,
      },
    },
  ],
});

const createHeroSection = ({
  sectionKey = "hero",
  internalName = "Hero",
  heading,
  subheading,
  description,
  buttonText = "Book Free Demo",
  buttonLink = ROUTES.bookDemo,
  settings = {},
  items = [],
}) => ({
  sectionKey,
  sectionType: "hero",
  internalName,
  heading,
  subheading,
  description,
  buttonText,
  buttonLink,
  settings,
  items,
});

const createIconCardsSection = ({
  sectionKey,
  internalName,
  heading,
  subheading,
  description,
  buttonText,
  buttonLink,
  settings = {},
  items = [],
}) => ({
  sectionKey,
  sectionType: "icon_cards",
  internalName,
  heading,
  subheading,
  description,
  buttonText,
  buttonLink,
  settings,
  items,
});

const createContentSplitSection = ({
  sectionKey,
  internalName,
  heading,
  subheading,
  description,
  buttonText,
  buttonLink,
  settings = {},
  items = [],
}) => ({
  sectionKey,
  sectionType: "content_split",
  internalName,
  heading,
  subheading,
  description,
  buttonText,
  buttonLink,
  settings,
  items,
});

const createTimelineSection = ({
  sectionKey,
  internalName,
  heading,
  subheading,
  description,
  settings = {},
  items = [],
}) => ({
  sectionKey,
  sectionType: "timeline",
  internalName,
  heading,
  subheading,
  description,
  settings,
  items,
});

const createComparisonTableSection = ({
  sectionKey,
  internalName,
  heading,
  subheading,
  description,
  settings = {},
  items = [],
}) => ({
  sectionKey,
  sectionType: "comparison_table",
  internalName,
  heading,
  subheading,
  description,
  settings,
  items,
});

const createChecklistSection = ({
  sectionKey,
  internalName,
  heading,
  subheading,
  description,
  settings = {},
  items = [],
}) => ({
  sectionKey,
  sectionType: "checklist",
  internalName,
  heading,
  subheading,
  description,
  settings,
  items,
});

const createFaqSection = ({
  sectionKey = "faq",
  internalName = "FAQ",
  heading,
  subheading,
  description,
  buttonText = "Book Free Demo",
  buttonLink = ROUTES.bookDemo,
  settings = {},
  items = [],
}) => ({
  sectionKey,
  sectionType: "faq",
  internalName,
  heading,
  subheading,
  description,
  buttonText,
  buttonLink,
  settings,
  items,
});

const createCtaSection = ({
  sectionKey = "cta",
  internalName = "Final CTA",
  heading,
  description,
  buttonText = "Book Free Demo",
  buttonLink = ROUTES.bookDemo,
  settings = {},
}) => ({
  sectionKey,
  sectionType: "cta_banner",
  internalName,
  heading,
  description,
  buttonText,
  buttonLink,
  settings,
});

const assetManagementFaqRelatedRoutes = {
  "Read the Asset Management Guide": ROUTES.assetManagementGuide,
  "Explore Altroz Asset Management": ROUTES.assetManagementHome,
  "Explore Asset Tracking": ROUTES.bulkEmailAssetTracking,
  "Explore QR Code Asset Management": ROUTES.bulkEmailAssetQrCode,
  "Explore Asset Maintenance": ROUTES.bulkEmailAssetMaintenance,
  "Explore Asset Reports": ROUTES.bulkEmailAssetReports,
  "Explore the Asset Dashboard": ROUTES.bulkEmailAssetDashboard,
  "Explore IT Asset Management": ROUTES.bulkEmailAssetDashboard,
  "Explore Manufacturing Asset Management": ROUTES.bulkEmailAssetTracking,
  "Contact Us": ROUTES.assetManagementContact,
  "Book a Demo": ROUTES.bookDemo,
};

const createAssetManagementFaqSections = () =>
  assetManagementFaqSeedCategories.map((category) =>
    createFaqSection({
      sectionKey: `asset-faq-${category.slug}`,
      internalName: category.title,
      heading: category.title,
      subheading: "Asset Management FAQs",
      description: category.description,
      buttonText: category.relatedLabel || "Book a Demo",
      buttonLink: assetManagementFaqRelatedRoutes[category.relatedLabel] ?? ROUTES.bookDemo,
      items: category.items.map((item) => ({
        itemType: "faq",
        title: item.question,
        description: item.answer,
      })),
    }),
  );

const featuredHrmsBlogPost =
  blogSeedPosts.find((post) => post.blogGroup === "hrms") ?? blogSeedPosts[0] ?? null;

const fallbackHrmsBlogCoverImage =
  "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000";

function getBlogPostPath(basePath, slug) {
  return `${basePath.replace(/\/+$/, "")}/${slug.replace(/^\/+/, "")}`;
}

function getHrmsRelatedLinkIcon(label) {
  switch (label) {
    case "Employee Management":
      return "Users";
    case "Attendance Management":
      return "CalendarDays";
    case "Payroll":
      return "Wallet";
    case "Compliance Guides":
      return "ShieldCheck";
    default:
      return "ArrowRight";
  }
}

function createHrmsBlogLandingSections({ blogPath = ROUTES.blog } = {}) {
  const featuredPost = featuredHrmsBlogPost ?? {
    slug: "what-is-hrms",
    title: "What is HRMS? The Complete Guide for Indian Businesses (2026)",
    description:
      "A practical, in-depth resource on Human Resource Management Systems - what they are, how they work, why Indian businesses need them, and how to choose one.",
    heroSummary:
      "HRMS centralises the employee lifecycle from hiring to exit, giving HR teams one source of truth instead of juggling spreadsheets, biometric exports, emails, and paper files.",
    quickAnswer:
      "HRMS is software that helps businesses manage employee records, attendance, leave, payroll, recruitment, performance, and reporting in one place.",
    heroPoints: [
      "Manage the full employee lifecycle from hire to exit in one system",
      "Automate attendance, leave, payroll, and document workflows",
      "Reduce compliance risk and manual re-entry as headcount grows",
      "Give employees self-service access to their own records and payslips",
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
        description:
          "Explore attendance tracking, shifts, and approvals connected to HRMS workflows.",
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
    coverImage: fallbackHrmsBlogCoverImage,
    readingTimeLabel: "~24 min read",
  };

  const featuredPostPath = getBlogPostPath(blogPath, featuredPost.slug);

  return [
    createHeroSection({
      heading: "Learn everything about HR operations, attendance, payroll, and automation",
      subheading: "HRMS Blog",
      description:
        "A clean editorial layout for your HRMS content, with practical guides, product links, and the same blue-green colour theme used across the rest of the site.",
      buttonText: "Explore HRMS",
      buttonLink: ROUTES.hrmsHome,
      settings: {
        badgeText: "HRMS Blog",
        secondaryButtonText: "Book Free Demo",
        secondaryButtonLink: ROUTES.bookDemo,
      },
    }),
    createIconCardsSection({
      sectionKey: "story-stats",
      internalName: "Story Stats",
      heading: "Quick stat cards used in the hero layout",
      subheading: "Stat Cards",
      description:
        "These four cards summarise the current editorial setup and can be updated directly from the admin panel.",
      items: [
        {
          itemType: "stat_card",
          title: "1 article",
          subtitle: "Featured guide",
          description: "Current spotlight article shown in the large editorial panel.",
          icon: "Target",
        },
        {
          itemType: "stat_card",
          title: "3 stories",
          subtitle: "Topic cards",
          description: "A compact way to highlight the main story areas at the top of the page.",
          icon: "Sparkles",
        },
        {
          itemType: "stat_card",
          title: "Blue + green",
          subtitle: "HR theme",
          description: "Keeps the blog page aligned with the wider Altroz HR visual language.",
          icon: "ShieldCheck",
        },
        {
          itemType: "stat_card",
          title: "2026",
          subtitle: "Updated",
          description: "Shows that the editorial layout is current and ready for active content.",
          icon: "CalendarDays",
        },
      ],
    }),
    {
      sectionKey: "story-search",
      sectionType: "custom",
      internalName: "Story Search",
      heading: "Search bar placeholder",
      subheading: "Search",
      description:
        "Use this field to control the helper text shown inside the topic search box at the top of the blog landing page.",
      settings: {
        placeholderText: "Search HRMS guides, payroll, attendance, leave, reports...",
      },
      items: [],
    },
    {
      sectionKey: "featured-guide",
      sectionType: "icon_cards",
      internalName: "Featured Guide",
      heading: featuredPost.title,
      subheading: "Featured article",
      description: featuredPost.heroSummary,
      imageUrl: featuredPost.coverImage ?? fallbackHrmsBlogCoverImage,
      buttonText: "Read full guide",
      buttonLink: featuredPostPath,
      settings: {
        badgeText: "Featured article",
        readingTime: featuredPost.readingTimeLabel ?? "~24 min read",
        secondaryButtonText: "Explore attendance",
        secondaryButtonLink: ROUTES.attendanceManagement,
        tertiaryButtonText: "Compliance guides",
        tertiaryButtonLink: ROUTES.complianceGuides,
      },
      items: (featuredPost.heroPoints ?? []).slice(0, 4).map((point, index) => ({
        itemType: "highlight_card",
        title: `Key point ${index + 1}`,
        description: point,
        icon: "ChevronRight",
      })),
    },
    {
      sectionKey: "learning-dashboard",
      sectionType: "icon_cards",
      internalName: "Learning Dashboard",
      heading: "Structured learning, simple navigation",
      subheading: "Learning dashboard",
      description:
        "A visual panel that connects the main guide with related attendance and payroll workflows for faster discovery.",
      imageUrl: featuredPost.coverImage ?? fallbackHrmsBlogCoverImage,
      settings: {
        badgeText: "HRMS",
        caption:
          "Use this block for a dashboard image, two quick feature cards, and one fast answer panel.",
      },
      items: [
        {
          itemType: "feature_card",
          title: "Attendance",
          description: "Track time, shifts, and approvals",
          icon: "CalendarDays",
        },
        {
          itemType: "feature_card",
          title: "Payroll",
          description: "Connect clean inputs to salary runs",
          icon: "Wallet",
        },
        {
          itemType: "text_card",
          title: "Quick answer",
          description: featuredPost.quickAnswer,
          icon: "Sparkles",
        },
      ],
    },
    createIconCardsSection({
      sectionKey: "latest-stories",
      internalName: "Latest Stories",
      heading: "Browse the HRMS story feed",
      subheading: "Latest stories",
      description:
        "A stacked card layout keeps the page easy to scan on mobile while still giving each topic enough space to feel like a proper editorial feature.",
      items: [
        {
          itemType: "story_card",
          title: featuredPost.title,
          subtitle: "Featured guide",
          description: featuredPost.description,
          icon: "BookOpen",
          imageUrl: featuredPost.coverImage ?? fallbackHrmsBlogCoverImage,
          buttonText: "Read guide",
          buttonLink: featuredPostPath,
          extraData: {
            readingTime: featuredPost.readingTimeLabel ?? "~24 min read",
            category: featuredPost.category ?? "HR Software",
          },
        },
      ],
    }),
    {
      sectionKey: "related-topics",
      sectionType: "icon_cards",
      internalName: "Related Topics",
      heading: "Related HR topics connected to this blog",
      subheading: "Continue exploring",
      description:
        "These links keep the blog landing page useful and connect readers back to the product areas that support the HRMS workflow.",
      buttonText: "Explore HRMS",
      buttonLink: ROUTES.hrmsHome,
      settings: {
        secondaryButtonText: "Book a demo",
        secondaryButtonLink: ROUTES.bookDemo,
      },
      items: (featuredPost.relatedLinks ?? []).slice(0, 4).map((link) => ({
        itemType: "related_link",
        title: link.label,
        description: link.description,
        icon: getHrmsRelatedLinkIcon(link.label),
        buttonText: "Open topic",
        buttonLink: link.href,
      })),
    },
  ];
}

const bulkEmailManagedSections = [
  {
    sectionKey: "hero",
    sectionType: "hero",
    internalName: "Hero",
    heading: "Bulk Email Software Built for Reliable Business Communication",
    subheading: "Bulk Email",
    description:
      "Send, schedule and track every business email from one simple dashboard. Altroz Bulk Email is an enterprise bulk email broadcasting platform that helps businesses send large volumes of email campaigns without losing control or visibility.",
    buttonText: "Book Free Demo",
    buttonLink: ROUTES.bookDemo,
    isRequired: true,
    settings: {
      badgeText: "Trusted Business Email Broadcasting Platform",
      secondaryButtonText: "View Features",
      secondaryButtonLink: "#features",
    },
    items: [
      {
        itemType: "value_card",
        title: "What it does",
        subtitle: "Bulk email broadcasting, scheduling and delivery tracking from one dashboard",
        description: "One workspace for campaigns, queue visibility and campaign history.",
      },
      {
        itemType: "value_card",
        title: "Who it is for",
        subtitle:
          "Business owners, SMEs, enterprises, HR and marketing teams, institutes and organisations",
        description: "Built for teams that need structured communication at scale.",
      },
      {
        itemType: "value_card",
        title: "Business value",
        subtitle: "Centralized control, better visibility and organized business communication",
        description: "Keep every broadcast easy to manage, monitor and review.",
      },
    ],
  },
  {
    sectionKey: "trusted-toolkit",
    sectionType: "icon_cards",
    internalName: "Trusted Toolkit",
    heading: "A premium snapshot of what businesses get with Altroz Bulk Email",
    subheading: "Trusted Business Communication Platform",
    description:
      "A clean, organized toolkit for campaigns, scheduling, templates, delivery and reporting.",
    items: [
      {
        itemType: "feature_card",
        title: "Bulk Email Campaigns",
        description:
          "Create and send bulk email campaigns to your entire contact base in a single, organized broadcast.",
        icon: "Send",
      },
      {
        itemType: "feature_card",
        title: "Campaign Scheduling",
        description:
          "Plan campaigns in advance and let Altroz Bulk Email send them automatically at the scheduled time.",
        icon: "CalendarClock",
      },
      {
        itemType: "feature_card",
        title: "Delivery Tracking",
        description:
          "Follow every broadcast from queue to inbox with real-time email status and delivery tracking.",
        icon: "MailCheck",
      },
      {
        itemType: "feature_card",
        title: "Email Templates",
        description:
          "Use ready email templates or upload your own HTML email design for a consistent brand look.",
        icon: "FileText",
      },
      {
        itemType: "feature_card",
        title: "SMTP Support",
        description:
          "Connect your own SMTP through simple sender email configuration for dependable email delivery.",
        icon: "ServerCog",
      },
      {
        itemType: "feature_card",
        title: "Analytics",
        description:
          "Understand how each campaign performed with clear, easy-to-read email analytics and reports.",
        icon: "BarChart3",
      },
    ],
  },
  {
    sectionKey: "why-choose",
    sectionType: "icon_cards",
    internalName: "Why Choose",
    heading: "The platform teams choose when they need clarity, control and scale",
    subheading: "Why Choose Altroz Bulk Email",
    description: "Eight practical reasons businesses keep their communication in one place.",
    items: [
      {
        itemType: "feature_card",
        title: "Easy Campaign Management",
        description:
          "Manage every bulk email campaign - draft, scheduled or sent - from one organized screen.",
        icon: "Layers3",
      },
      {
        itemType: "feature_card",
        title: "Centralized Dashboard",
        description:
          "View campaign activity, subscription usage and recent broadcasts together in one place.",
        icon: "LayoutDashboard",
      },
      {
        itemType: "feature_card",
        title: "Fast Bulk Email Broadcasting",
        description:
          "Broadcast emails to large contact lists efficiently through a structured broadcast queue.",
        icon: "Send",
      },
      {
        itemType: "feature_card",
        title: "Schedule Campaigns",
        description:
          "Set the exact date and time for a campaign so messages reach the inbox at the right moment.",
        icon: "CalendarClock",
      },
      {
        itemType: "feature_card",
        title: "Delivery Tracking",
        description:
          "Know exactly what happened to every email with status and delivery reports when needed.",
        icon: "MailCheck",
      },
      {
        itemType: "feature_card",
        title: "Simple User Interface",
        description:
          "A clean, uncluttered interface that business users can learn quickly without technical training.",
        icon: "Sparkles",
      },
      {
        itemType: "feature_card",
        title: "Reusable Email Templates",
        description:
          "Save time on every campaign by reusing email templates or uploading your own HTML content.",
        icon: "FileText",
      },
      {
        itemType: "feature_card",
        title: "Business-Focused Platform",
        description:
          "Built around HR updates, marketing broadcasts and institutional notices - not just marketing-only use cases.",
        icon: "BadgeCheck",
      },
    ],
  },
  {
    sectionKey: "product-overview",
    sectionType: "icon_cards",
    internalName: "Product Overview",
    heading: "A closer look at the platform workspaces inside Altroz Bulk Email",
    subheading: "Product Overview",
    description: "The product is organised around the major workflows users touch every day.",
    items: [
      {
        itemType: "overview_card",
        title: "Dashboard",
        description:
          "The dashboard gives you a single view of recent broadcasts, subscription usage and campaign activity.",
        icon: "LayoutDashboard",
      },
      {
        itemType: "overview_card",
        title: "Campaigns",
        description:
          "The campaigns workspace is where every bulk email broadcast is created, organized and reviewed.",
        icon: "Layers3",
      },
      {
        itemType: "overview_card",
        title: "Scheduling",
        description:
          "Email scheduling lets you decide exactly when a campaign should go out for your audience.",
        icon: "CalendarClock",
      },
      {
        itemType: "overview_card",
        title: "Reports",
        description:
          "Delivery reports and email status give a clear picture of how each broadcast performed.",
        icon: "BarChart3",
      },
      {
        itemType: "overview_card",
        title: "Templates",
        description:
          "Choose from email templates or upload your own HTML email so every campaign stays on brand.",
        icon: "FileText",
      },
      {
        itemType: "overview_card",
        title: "SMTP",
        description:
          "SMTP configuration and sender email configuration connect the outgoing mail server you control.",
        icon: "ServerCog",
      },
    ],
  },
  {
    sectionKey: "workflow",
    sectionType: "timeline",
    internalName: "How It Works",
    heading: "From idea to delivery in five clear steps",
    subheading: "How It Works",
    description: "A simple workflow that keeps every broadcast easy to create, send and review.",
    items: [
      {
        itemType: "step",
        title: "Create Campaign",
        subtitle: "Step 1",
        description:
          "Start a new bulk email campaign from the dashboard and give it a name your team will recognize later.",
      },
      {
        itemType: "step",
        title: "Upload Email Content",
        subtitle: "Step 2",
        description:
          "Add your message using a ready email template, or upload your own HTML email design and attachments.",
      },
      {
        itemType: "step",
        title: "Schedule or Send",
        subtitle: "Step 3",
        description:
          "Choose to broadcast the campaign immediately or queue it for a future date and time.",
      },
      {
        itemType: "step",
        title: "Track Delivery",
        subtitle: "Step 4",
        description:
          "Follow the broadcast queue and monitor email status as the campaign moves toward delivery.",
      },
      {
        itemType: "step",
        title: "Review Reports",
        subtitle: "Step 5",
        description:
          "Check delivery reports and email analytics to understand how the campaign performed.",
      },
    ],
  },
  {
    sectionKey: "core-features",
    sectionType: "icon_cards",
    internalName: "Core Features",
    heading: "The complete feature set of Altroz Bulk Email",
    subheading: "Core Features",
    description:
      "Premium feature cards that explain what each part of the product does and why it matters.",
    items: [
      {
        itemType: "feature_card",
        title: "Bulk Email Broadcasting",
        description:
          "Send a single email out to a large list of recipients in one organized broadcast.",
        icon: "Send",
      },
      {
        itemType: "feature_card",
        title: "Campaign Management",
        description:
          "Create, organize and review every campaign, with full campaign history available for reference.",
        icon: "Layers3",
      },
      {
        itemType: "feature_card",
        title: "Email Scheduling",
        description: "Set a future date and time for a campaign to be sent automatically.",
        icon: "CalendarClock",
      },
      {
        itemType: "feature_card",
        title: "Templates",
        description: "Use built-in email templates or upload your own HTML email design.",
        icon: "FileText",
      },
      {
        itemType: "feature_card",
        title: "Dashboard",
        description:
          "A central screen summarising campaign activity, recent broadcasts and subscription usage.",
        icon: "LayoutDashboard",
      },
      {
        itemType: "feature_card",
        title: "Analytics",
        description:
          "Review email analytics for each campaign you have sent and improve future campaigns.",
        icon: "BarChart3",
      },
      {
        itemType: "feature_card",
        title: "SMTP Configuration",
        description: "Configure your own SMTP and sender email settings for outgoing campaigns.",
        icon: "ServerCog",
      },
      {
        itemType: "feature_card",
        title: "Delivery Reports",
        description: "Detailed reports on email status and delivery outcomes for every broadcast.",
        icon: "MailCheck",
      },
    ],
  },
  {
    sectionKey: "business-use-cases",
    sectionType: "icon_cards",
    internalName: "Business Use Cases",
    heading: "How different industries use Altroz Bulk Email every day",
    subheading: "Business Use Cases",
    description:
      "Purpose-built examples for teams that need organized communication across multiple workflows.",
    items: [
      {
        itemType: "use_case",
        title: "HR Communication",
        description:
          "HR teams use Altroz Bulk Email to send policy updates, onboarding information and company-wide announcements.",
        icon: "Users",
      },
      {
        itemType: "use_case",
        title: "Marketing Campaigns",
        description:
          "Marketing teams plan and schedule campaigns, use templates and review analytics to see how each broadcast performed.",
        icon: "Megaphone",
      },
      {
        itemType: "use_case",
        title: "Education",
        description:
          "Educational institutes broadcast circulars, admission updates and event notices to students, parents and staff.",
        icon: "GraduationCap",
      },
      {
        itemType: "use_case",
        title: "Healthcare",
        description:
          "Healthcare organizations send appointment reminders, health advisories and administrative updates with confidence.",
        icon: "HeartPulse",
      },
      {
        itemType: "use_case",
        title: "Manufacturing",
        description:
          "Manufacturing companies use scheduled campaigns to share supplier updates, internal bulletins and business notices.",
        icon: "Factory",
      },
      {
        itemType: "use_case",
        title: "Retail",
        description:
          "Retail businesses broadcast offers, updates and customer communication using reusable templates and scheduling.",
        icon: "ShoppingBag",
      },
    ],
  },
  {
    sectionKey: "business-benefits",
    sectionType: "icon_cards",
    internalName: "Why Businesses Love It",
    heading: "Everyday benefits that make the platform easy to keep using",
    subheading: "Why Businesses Love It",
    description: "The value cards reinforce the practical experience of using the platform.",
    items: [
      {
        itemType: "benefit_card",
        title: "Easy Setup",
        description:
          "Get started quickly with straightforward sender email and SMTP configuration.",
        icon: "Clock3",
      },
      {
        itemType: "benefit_card",
        title: "Simple Navigation",
        description: "Find campaigns, templates and reports without a learning curve.",
        icon: "Workflow",
      },
      {
        itemType: "benefit_card",
        title: "Campaign Visibility",
        description: "See the status of every campaign from draft to delivery in one place.",
        icon: "CheckCircle2",
      },
      {
        itemType: "benefit_card",
        title: "Better Communication",
        description: "Keep business messaging organized, timely and consistent.",
        icon: "MessageSquareMore",
      },
      {
        itemType: "benefit_card",
        title: "Organized Broadcasts",
        description: "Manage the broadcast queue clearly, so nothing is sent by mistake or missed.",
        icon: "Send",
      },
      {
        itemType: "benefit_card",
        title: "Delivery Monitoring",
        description: "Stay informed with real-time email status and delivery reports.",
        icon: "MailCheck",
      },
      {
        itemType: "benefit_card",
        title: "Business Ready",
        description: "Built for real business communication needs, not just marketing sends.",
        icon: "ShieldCheck",
      },
      {
        itemType: "benefit_card",
        title: "Scalable Platform",
        description: "Supports growing communication needs as campaign volume increases.",
        icon: "TrendingUp",
      },
    ],
  },
  {
    sectionKey: "faq",
    sectionType: "faq",
    internalName: "FAQ",
    heading: "Answers to the most common bulk email questions",
    subheading: "Frequently Asked Questions",
    description: "Clear, direct answers that help visitors understand how the platform works.",
    settings: {
      secondaryHeading: "Let us show you the right bulk email workflow",
      secondaryDescription:
        "Bring your sender setup, SMTP flow, templates and campaign goals to a live demo.",
      features: [
        "Campaign scheduling",
        "Template uploads",
        "Delivery tracking",
        "Subscription usage",
      ],
      secondaryButtonText: "Contact Sales",
      secondaryButtonLink: ROUTES.contact,
    },
    buttonText: "Book Free Demo",
    buttonLink: ROUTES.bookDemo,
    items: [
      {
        itemType: "faq",
        title: "What is bulk email software?",
        description:
          "Bulk email software is a platform that lets a business create, send and manage email campaigns to a large group of recipients at once, instead of sending messages individually.",
      },
      {
        itemType: "faq",
        title: "How does Altroz Bulk Email work?",
        description:
          "You create a campaign, add your content using a template or your own HTML email, then send it immediately or schedule it. Altroz Bulk Email then broadcasts the email and lets you track delivery through reports.",
      },
      {
        itemType: "faq",
        title: "Can I schedule campaigns in advance?",
        description:
          "Yes. Email scheduling lets you set a future date and time, and the campaign is sent automatically through the broadcast queue.",
      },
      {
        itemType: "faq",
        title: "Can I upload my own HTML email templates?",
        description:
          "Yes. You can upload your own HTML email design or use the ready templates available on the platform.",
      },
      {
        itemType: "faq",
        title: "Can I attach files to a campaign?",
        description:
          "Yes. Altroz Bulk Email supports uploading attachments as part of your email campaign.",
      },
      {
        itemType: "faq",
        title: "How does SMTP configuration work in Altroz Bulk Email?",
        description:
          "You connect your outgoing mail server through SMTP configuration and set up your sender email so campaigns are sent through a setup your business controls.",
      },
      {
        itemType: "faq",
        title: "How do I track email delivery?",
        description:
          "Every campaign includes delivery tracking, so you can view email status and delivery reports for each broadcast.",
      },
      {
        itemType: "faq",
        title: "Can businesses manage multiple campaigns at once?",
        description:
          "Yes. The campaign management workspace lets you organise multiple campaigns and review complete campaign history.",
      },
    ],
  },
  {
    sectionKey: "cta",
    sectionType: "cta_banner",
    internalName: "Final CTA",
    heading: "Ready to Simplify Your Business Email Communication?",
    description:
      "Bring every bulk email campaign, schedule and delivery report into one centralised dashboard. See how Altroz Bulk Email fits your business communication needs.",
    buttonText: "Book Free Demo",
    buttonLink: ROUTES.bookDemo,
    settings: {
      secondaryButtonText: "View Features",
      secondaryButtonLink: "#trusted",
    },
  },
];

const assetManagementSuiteSections = [
  {
    sectionKey: "hero",
    sectionType: "hero",
    internalName: "Hero",
    heading: "Asset Management Software to Track, Organise and Monitor Every Business Asset",
    subheading: "Asset Management",
    description:
      "Manage every business asset from one centralised platform. Altroz Asset Management helps businesses register, organise, assign, monitor and maintain physical assets across branches and departments with accurate, real-time data.",
    buttonText: "Book Free Demo",
    buttonLink: ROUTES.bookDemo,
    isRequired: true,
    settings: {
      badgeText: "Enterprise Asset Management Software",
      secondaryButtonText: "Explore Features",
      secondaryButtonLink: "#features",
      secondaryHeading: "Complete visibility for assets, maintenance, branches and departments",
      secondaryDescription:
        "Use a dashboard that keeps ownership, service status and distribution clear at a glance. Instead of waiting on manual reports, managers can review live asset data, compare locations and act on issues faster.",
      secondaryDescriptionTwo:
        "Whether you are tracking office equipment, field tools or specialized machinery, the platform helps your team stay organised, reduce manual work and make more confident decisions.",
      features: [
        "Reduce loss with visible ownership",
        "Cut manual follow-up during employee exits",
        "Spot maintenance and warranty issues earlier",
      ],
    },
    items: [
      { itemType: "metric", title: "Asset visibility", subtitle: "Real-time view" },
      { itemType: "metric", title: "Maintenance control", subtitle: "Faster follow-up" },
      { itemType: "metric", title: "Branch coverage", subtitle: "Multi-location tracking" },
      { itemType: "metric", title: "Audit readiness", subtitle: "Clear records" },
    ],
  },
  {
    sectionKey: "what-is-asset-management",
    sectionType: "content_split",
    internalName: "What Is Asset Management",
    heading: "Understanding the process behind better visibility and control",
    subheading: "What is Asset Management?",
    description:
      "Asset management helps businesses register, organise, assign, monitor and maintain physical assets throughout their useful life.",
    items: [
      {
        itemType: "content_card",
        title: "A structured way to track the physical assets your business owns",
        subtitle: "Understanding Asset Management",
        description:
          "Asset management is the structured process of registering, organising, tracking and maintaining the physical assets a business owns, such as laptops, machinery, tools, furniture, vehicles and equipment, throughout their working life.",
        extraData: {
          secondaryDescription:
            "It ensures every asset is accounted for, correctly assigned, properly maintained and easy to locate whenever it is needed.",
          features: [
            "Outdated records kept in scattered spreadsheets that are rarely updated on time.",
            "Unclear ownership with no clear record of which employee or department holds an asset.",
            "Duplicate purchases when one branch already has assets another branch needs.",
            "Missed maintenance because warranty and service dates are not tracked well.",
            "Difficult audits when physical verification becomes time-consuming and error-prone.",
          ],
        },
      },
      {
        itemType: "content_card",
        title: "One central system improves visibility, accountability and efficiency",
        subtitle: "Cloud-Based Visibility",
        description:
          "A cloud-based asset management platform like Altroz Asset Management centralises all asset information in one place. Every asset is registered once, categorised correctly and made searchable across branches and departments.",
        extraData: {
          features: [
            "Teams can see asset status, assignment history, maintenance records and documents instantly.",
            "Management no longer depends on outdated spreadsheets or manual follow-ups.",
            "The platform improves accountability and reduces the risk of asset loss.",
            "Real-time visibility makes it easier to understand how organisational resources are used.",
          ],
        },
      },
    ],
  },
  {
    sectionKey: "asset-lifecycle",
    sectionType: "timeline",
    internalName: "Asset Lifecycle",
    heading: "Every business asset moves through a defined lifecycle",
    subheading: "Complete Asset Lifecycle",
    description:
      "Understanding the lifecycle helps businesses plan better, control costs and extend the useful life of their assets.",
    items: [
      {
        itemType: "step",
        title: "Register Asset",
        subtitle: "Step 1",
        description: "Add the asset with category, type, branch, and location details.",
      },
      {
        itemType: "step",
        title: "Assign Asset",
        subtitle: "Step 2",
        description: "Allocate the asset to an employee and update the status to In Use.",
      },
      {
        itemType: "step",
        title: "Track Usage",
        subtitle: "Step 3",
        description: "Keep the owner, location, and status visible on the dashboard.",
      },
      {
        itemType: "step",
        title: "Maintenance",
        subtitle: "Step 4",
        description: "Mark the asset under maintenance and raise due alerts in advance.",
      },
      {
        itemType: "step",
        title: "Issue / Return",
        subtitle: "Step 5",
        description: "Move assets between Available and In Use as they are issued or returned.",
      },
      {
        itemType: "step",
        title: "Transfer",
        subtitle: "Step 6",
        description: "Record handovers so ownership history stays complete.",
      },
    ],
  },
  {
    sectionKey: "core-features",
    sectionType: "icon_cards",
    internalName: "Core Features",
    heading: "The platform includes the practical tools teams use every day",
    subheading: "Core Asset Management Features",
    description:
      "Every feature below is part of the Altroz Asset Management module and is organised to mirror the way teams actually work.",
    items: [
      {
        itemType: "feature_card",
        title: "Asset Registration, Categories and Types",
        description:
          "Create a structured asset register with clear metadata so records stay searchable as the asset base grows.",
        icon: "Tag",
        subtitle: "Add asset name, category, type, branch, location, and current status",
      },
      {
        itemType: "feature_card",
        title: "Assignment, Ownership and Location",
        description:
          "Give every asset a visible owner and deployment location so handoffs stay traceable.",
        icon: "Laptop",
        subtitle: "Assign assets directly to employees with a traceable ownership history",
      },
      {
        itemType: "feature_card",
        title: "Issue, Return, Handover and Recovery",
        description:
          "Use a clear workflow for moving assets in and out of employee possession without losing the trail.",
        icon: "RotateCcw",
        subtitle: "Log issue and return actions digitally instead of using paper slips",
      },
      {
        itemType: "feature_card",
        title: "Maintenance and Alerts",
        description:
          "Stay ahead of servicing and warranty timelines so assets do not quietly fall out of service.",
        icon: "Wrench",
        subtitle: "Mark assets under maintenance and log servicing events",
      },
      {
        itemType: "feature_card",
        title: "QR Codes and Bulk Import",
        description:
          "Speed up onboarding and asset identification with QR codes and migration tools.",
        icon: "QrCode",
        subtitle: "Generate a unique QR code for each registered asset",
      },
      {
        itemType: "feature_card",
        title: "Search, Reports and Access Control",
        description:
          "Find records quickly, report on the asset base, and keep sensitive data limited to the right roles.",
        icon: "BarChart3",
        subtitle: "Search and filter by branch, owner, category, type, or status",
      },
    ],
  },
  {
    sectionKey: "why-businesses-need-it",
    sectionType: "icon_cards",
    internalName: "Why Businesses Need It",
    heading: "The most common asset tracking problems all point back to visibility",
    subheading: "Why Businesses Need Asset Management Software",
    description:
      "These outcomes explain why businesses move away from spreadsheets and choose a centralized system.",
    items: [
      {
        itemType: "benefit_card",
        title: "One register for everything",
        description:
          "Record laptops, desktops, furniture, tools, vehicles, and field equipment in a single searchable system.",
        icon: "Package",
      },
      {
        itemType: "benefit_card",
        title: "Replace scattered manual tracking",
        description:
          "Move away from Excel sheets, WhatsApp messages, and paper handover forms that are easy to lose.",
        icon: "ClipboardCheck",
      },
      {
        itemType: "benefit_card",
        title: "Keep ownership visible",
        description:
          "See who has what, where it is located, and which department or branch it belongs to.",
        icon: "ShieldCheck",
      },
      {
        itemType: "benefit_card",
        title: "Plan maintenance earlier",
        description:
          "Use due-date and warranty alerts to keep assets in service and avoid last-minute breakdowns.",
        icon: "Wrench",
      },
    ],
  },
  {
    sectionKey: "workflow",
    sectionType: "timeline",
    internalName: "How It Works",
    heading: "A simple workflow keeps asset information accurate and up to date",
    subheading: "How Altroz Asset Management Works",
    description:
      "From registration to reporting, the system follows a clear sequence that keeps every change visible.",
    items: [
      {
        itemType: "step",
        title: "Register",
        subtitle: "Step 1",
        description:
          "Add the asset into the central register with its category, branch and asset details.",
      },
      {
        itemType: "step",
        title: "Assign",
        subtitle: "Step 2",
        description:
          "Allocate the asset to an employee, team or branch with a visible ownership trail.",
      },
      {
        itemType: "step",
        title: "Monitor",
        subtitle: "Step 3",
        description:
          "Track the asset status, location, maintenance and movement from the dashboard.",
      },
      {
        itemType: "step",
        title: "Maintain",
        subtitle: "Step 4",
        description: "Keep service records, due dates and warranty activity visible in one place.",
      },
      {
        itemType: "step",
        title: "Report",
        subtitle: "Step 5",
        description:
          "Generate audit-ready reports on asset usage, movement, maintenance and ownership.",
      },
    ],
  },
  {
    sectionKey: "business-benefits",
    sectionType: "icon_cards",
    internalName: "Business Benefits",
    heading: "The platform improves visibility, speed and day-to-day control",
    subheading: "Business Benefits",
    description:
      "These outcomes are the practical reasons teams adopt a centralized asset platform.",
    items: [
      {
        itemType: "benefit_card",
        title: "Reduce asset loss with clearer ownership records",
        description:
          "This outcome follows naturally when the dashboard is used as the single source of truth.",
        icon: "CheckCircle2",
      },
      {
        itemType: "benefit_card",
        title: "See every asset, owner, and location from one dashboard",
        description:
          "This outcome follows naturally when the dashboard is used as the single source of truth.",
        icon: "CheckCircle2",
      },
      {
        itemType: "benefit_card",
        title: "Assign equipment in minutes instead of using manual paperwork",
        description:
          "This outcome follows naturally when the dashboard is used as the single source of truth.",
        icon: "CheckCircle2",
      },
      {
        itemType: "benefit_card",
        title: "Track pending recoveries during transfers and exits",
        description:
          "This outcome follows naturally when the dashboard is used as the single source of truth.",
        icon: "CheckCircle2",
      },
      {
        itemType: "benefit_card",
        title: "Improve accountability with named issue, return, and handover events",
        description:
          "This outcome follows naturally when the dashboard is used as the single source of truth.",
        icon: "CheckCircle2",
      },
      {
        itemType: "benefit_card",
        title: "Plan servicing before assets go out of service",
        description:
          "This outcome follows naturally when the dashboard is used as the single source of truth.",
        icon: "CheckCircle2",
      },
      {
        itemType: "benefit_card",
        title: "Keep audit-ready records whenever they are needed",
        description:
          "This outcome follows naturally when the dashboard is used as the single source of truth.",
        icon: "CheckCircle2",
      },
      {
        itemType: "benefit_card",
        title: "Spend less time searching spreadsheets and more time working",
        description:
          "This outcome follows naturally when the dashboard is used as the single source of truth.",
        icon: "CheckCircle2",
      },
    ],
  },
  {
    sectionKey: "industries",
    sectionType: "icon_cards",
    internalName: "Industry Solutions",
    heading: "The platform is useful across many industries",
    subheading: "Industry Solutions",
    description:
      "Each industry has different asset-management needs, but the need for visibility and control is the same.",
    items: [
      {
        itemType: "industry_card",
        title: "Manufacturing",
        description: "Track tools, machinery accessories, and equipment across shop floors.",
        icon: "Factory",
      },
      {
        itemType: "industry_card",
        title: "IT Companies",
        description: "Manage laptops, monitors, and peripherals across employees and teams.",
        icon: "Laptop",
      },
      {
        itemType: "industry_card",
        title: "Healthcare",
        description: "Keep track of equipment and devices across departments and facilities.",
        icon: "HeartPulse",
      },
      {
        itemType: "industry_card",
        title: "Education",
        description: "Manage lab equipment, computers, and furniture across campuses.",
        icon: "GraduationCap",
      },
      {
        itemType: "industry_card",
        title: "Retail",
        description: "Track POS devices, furniture, and store equipment across outlets.",
        icon: "ShoppingBag",
      },
      {
        itemType: "industry_card",
        title: "Logistics",
        description: "Track handheld devices, vehicles-related equipment, and warehouse assets.",
        icon: "Truck",
      },
    ],
  },
  {
    sectionKey: "asset-screens",
    sectionType: "icon_cards",
    internalName: "Asset Screens",
    heading: "The screen set covers registration, tracking, maintenance and reporting",
    subheading: "Asset Screens",
    description:
      "Each screen helps a different kind of manager review the same asset data with the right emphasis.",
    items: [
      {
        itemType: "screen_card",
        title: "Dashboard",
        description:
          "A central summary of total assets, in-use items, maintenance alerts and recent movement.",
        icon: "LayoutDashboard",
        subtitle: "Business value: Fast overview for managers and admins.",
      },
      {
        itemType: "screen_card",
        title: "Asset Register",
        description:
          "A searchable register for all assets with ownership, branch and category details.",
        icon: "Package",
        subtitle: "Business value: Cleaner record management and faster lookups.",
      },
      {
        itemType: "screen_card",
        title: "Tracking View",
        description:
          "Visibility into where the asset is, who has it and what status it is currently in.",
        icon: "MapPin",
        subtitle: "Business value: Less confusion around asset movement.",
      },
      {
        itemType: "screen_card",
        title: "Maintenance View",
        description:
          "Maintenance schedules, repair notes and warranty-related information in one place.",
        icon: "Wrench",
        subtitle: "Business value: Better control over servicing and uptime.",
      },
      {
        itemType: "screen_card",
        title: "Reports",
        description: "Status, branch, category and owner reports that support planning and audits.",
        icon: "BarChart3",
        subtitle: "Business value: Audit-ready reporting from one platform.",
      },
      {
        itemType: "screen_card",
        title: "QR Code Management",
        description:
          "Generate and use QR labels so assets can be identified faster in the field or office.",
        icon: "QrCode",
        subtitle: "Business value: Faster verification and fewer manual mistakes.",
      },
    ],
  },
  {
    sectionKey: "faq",
    sectionType: "faq",
    internalName: "FAQ",
    heading: "Common questions about Altroz Asset Management",
    subheading: "Frequently Asked Questions",
    description: "A concise answer set for the questions businesses ask most often.",
    items: [
      {
        itemType: "faq",
        title: "What is Asset Management Software?",
        description:
          "It is a system used to register, assign, track, and maintain company assets from one central platform instead of using manual spreadsheets and paper records.",
      },
      {
        itemType: "faq",
        title: "How is Altroz HR different from tracking assets on Excel?",
        description:
          "Altroz HR gives you a live asset register, defined workflows, alerts, and an audit trail that spreadsheets cannot maintain reliably as the asset count grows.",
      },
      {
        itemType: "faq",
        title: "Can I assign assets directly to employees?",
        description:
          "Yes. Employee Asset Allocation lets you assign an asset to a specific employee and track ownership until it is returned, transferred, or retired.",
      },
      {
        itemType: "faq",
        title: "Does the software track asset location and branch?",
        description:
          "Yes. Every asset can be mapped to a branch, department, and location so teams know where each item is placed.",
      },
      {
        itemType: "faq",
        title: "What happens when an employee is transferred or exits?",
        description:
          "Asset Handover and Asset Recovery features let you transfer assets or flag pending recoveries so nothing is missed during exits.",
      },
      {
        itemType: "faq",
        title: "How does maintenance tracking work?",
        description:
          "You can mark an asset under maintenance, and the system raises maintenance due alerts so servicing can be planned in advance.",
      },
    ],
  },
  {
    sectionKey: "cta",
    sectionType: "cta_banner",
    internalName: "Final CTA",
    heading: "Take Complete Control of Your Business Assets",
    description:
      "Manage your organisation's assets from procurement to retirement using one centralised platform. Improve visibility, simplify operations and make informed decisions with Altroz Asset Management.",
    buttonText: "Book Free Demo",
    buttonLink: ROUTES.bookDemo,
    settings: {
      secondaryButtonText: "Talk to Our Experts",
      secondaryButtonLink: ROUTES.contact,
    },
  },
];

const managedSolutionPages = [
  createManagedCmsPage({
    pageKey: "core-hr",
    pageName: "Core HR",
    route: ROUTES.coreHR,
    title: "Core HR Software for Employee Records & Organisation Structure | Altroz HR",
    description:
      "Manage employee records, departments, documents and organisation structure from one centralised Core HR platform with Altroz HR.",
    keywords: ["core hr software", "employee records", "organisation structure", "hr platform"],
    heroEyebrow: "Core HR",
    heroTitle: "Core HR Software for Employee Records and Organisation Structure",
    heroDescription:
      "Manage employee profiles, departments, designations and essential HR records from one centralised Core HR platform.",
    secondaryButtonLink: `${ROUTES.coreHR}#features`,
  }),
  createManagedCmsPage({
    pageKey: "attendance-management",
    pageName: "Attendance Management",
    route: ROUTES.attendanceManagement,
    title: "Attendance Management Software with GPS & Shift Tracking | Altroz HR",
    description:
      "Track employee attendance, shifts, GPS check-ins, overtime and approvals from one centralised dashboard with Altroz HR.",
    keywords: ["attendance software", "gps attendance", "shift tracking", "time tracking"],
    heroEyebrow: "Attendance",
    heroTitle: "Attendance Management Software with GPS, Shift and Time Tracking",
    heroDescription:
      "Track check-ins, shifts, overtime and approvals with one attendance workflow built for growing teams.",
    secondaryButtonLink: `${ROUTES.attendanceManagement}#features`,
  }),
  createManagedCmsPage({
    pageKey: "payroll",
    pageName: "Payroll",
    route: ROUTES.payroll,
    title: "Payroll Software for Salary Processing & Compliance | Altroz HR",
    description:
      "Run payroll, salary structures, deductions, PF, ESI and payslips from one centralised payroll platform with Altroz HR.",
    keywords: ["payroll software", "salary processing", "payslips", "payroll compliance"],
    heroEyebrow: "Payroll",
    heroTitle: "Payroll Software for Salary Processing and Compliance",
    heroDescription:
      "Process salaries, deductions and statutory compliance from one payroll workflow that reduces manual work.",
    secondaryButtonLink: `${ROUTES.payroll}#features`,
  }),
  createManagedCmsPage({
    pageKey: "leave-management",
    pageName: "Leave Management",
    route: ROUTES.leaveManagement,
    title: "Leave Management Software for Requests, Balances & Approvals | Altroz HR",
    description:
      "Manage leave requests, policies, balances and approvals in one auditable workflow with Altroz HR leave management software.",
    keywords: ["leave management", "leave approval", "leave balance", "absence management"],
    heroEyebrow: "Leave Management",
    heroTitle: "Leave Management Software for Requests, Balances and Approvals",
    heroDescription:
      "Keep leave policies, requests, balances and approvals in one auditable workflow instead of using scattered manual records.",
    secondaryButtonLink: `${ROUTES.leaveManagement}#features`,
  }),
  createManagedCmsPage({
    pageKey: "recruitment-ats",
    pageName: "Recruitment ATS",
    route: ROUTES.recruitment,
    title: "Recruitment ATS Software for Hiring & Candidate Tracking | Altroz HR",
    description:
      "Track candidates from sourcing to offer with Altroz HR recruitment software built for hiring teams and growing businesses.",
    keywords: ["recruitment software", "ats software", "candidate tracking", "hiring software"],
    heroEyebrow: "Recruitment",
    heroTitle: "Recruitment ATS Software for Hiring and Candidate Tracking",
    heroDescription:
      "Manage sourcing, screening, interview coordination and offer movement from one recruitment workflow.",
    secondaryButtonLink: `${ROUTES.recruitment}#features`,
  }),
  createManagedCmsPage({
    pageKey: "performance-management",
    pageName: "Performance Management",
    route: ROUTES.performance,
    title: "Performance Management Software for Reviews, Goals & Feedback | Altroz HR",
    description:
      "Manage employee goals, appraisals, reviews and feedback cycles from one centralised performance management platform with Altroz HR.",
    keywords: [
      "performance management",
      "employee appraisals",
      "goals and feedback",
      "review software",
    ],
    heroEyebrow: "Performance",
    heroTitle: "Performance Management Software for Reviews, Goals and Feedback",
    heroDescription:
      "Run structured reviews, goals and feedback cycles from one platform designed to keep performance conversations organised.",
    secondaryButtonLink: `${ROUTES.performance}#features`,
  }),
  createManagedCmsPage({
    pageKey: "bulk-email",
    pageName: "Bulk Email",
    route: ROUTES.bulkEmail,
    title: "Bulk Email Software for Business Campaigns | Altroz",
    description:
      "Altroz Bulk Email helps businesses send, schedule and track email campaigns from one dashboard. Book a free demo to see it in action.",
    keywords: ["bulk email software", "email campaigns", "email scheduling", "email broadcasting"],
    heroEyebrow: "Bulk Email",
    heroTitle: "Bulk Email Software Built for Reliable Business Communication",
    heroDescription:
      "Send, schedule and track business email campaigns from one dashboard built for organised communication at scale.",
    secondaryButtonLink: `${ROUTES.bulkEmail}#features`,
    sections: bulkEmailManagedSections,
  }),
  createManagedCmsPage({
    pageKey: "bulk-email-broadcast",
    pageName: "Bulk Email Broadcast",
    route: ROUTES.bulkEmailBroadcast,
    title: "Bulk Email Broadcast Software | Altroz Bulk Email",
    description:
      "Altroz Bulk Email offers bulk email broadcast software to create, schedule and track business email campaigns. Book a free demo today.",
    keywords: [
      "email broadcast",
      "bulk email broadcast",
      "campaign delivery",
      "business email software",
    ],
    heroEyebrow: "Broadcast",
    heroTitle: "Bulk Email Broadcast Software for Planned Business Communication",
    heroDescription:
      "Create, schedule and track one-to-many business email campaigns without losing control or visibility.",
    secondaryButtonLink: `${ROUTES.bulkEmailBroadcast}#features`,
  }),
  createManagedCmsPage({
    pageKey: "bulk-email-templates",
    pageName: "Bulk Email Templates",
    route: ROUTES.bulkEmailTemplates,
    title: "Bulk Email Templates | Altroz",
    description:
      "Altroz Bulk Email templates help businesses create branded email campaigns faster with reusable layouts, HTML upload support and clean campaign structure.",
    keywords: [
      "email templates",
      "html email templates",
      "bulk email design",
      "campaign templates",
    ],
    heroEyebrow: "Templates",
    heroTitle: "Bulk Email Templates for Faster Brand-Consistent Campaigns",
    heroDescription:
      "Use reusable layouts and HTML upload support to keep every business email on brand and easy to launch.",
    secondaryButtonLink: `${ROUTES.bulkEmailTemplates}#features`,
  }),
  createManagedCmsPage({
    pageKey: "bulk-email-analytics",
    pageName: "Bulk Email Analytics",
    route: ROUTES.bulkEmailAnalytics,
    title: "Email Analytics Software | Altroz Bulk Email",
    description:
      "Track email campaign performance with Altroz Bulk Email Analytics. Monitor delivery status, broadcast activity and reports on one dashboard.",
    keywords: ["email analytics", "campaign reports", "delivery tracking", "email performance"],
    heroEyebrow: "Analytics",
    heroTitle: "Email Analytics Software for Delivery, Status and Campaign Visibility",
    heroDescription:
      "Monitor delivery status, campaign activity and report history from one organised analytics view.",
    secondaryButtonLink: `${ROUTES.bulkEmailAnalytics}#features`,
  }),
  createManagedCmsPage({
    pageKey: "bulk-email-scheduling",
    pageName: "Bulk Email Scheduling",
    route: ROUTES.bulkEmailScheduling,
    title: "Email Scheduling Software | Altroz Bulk Email",
    description:
      "Schedule email campaigns in advance with Altroz Bulk Email. Plan delivery time, manage the queue and track delivery from one dashboard.",
    keywords: [
      "email scheduling",
      "scheduled email campaigns",
      "broadcast queue",
      "planned email sends",
    ],
    heroEyebrow: "Scheduling",
    heroTitle: "Email Scheduling Software for Planned Campaign Delivery",
    heroDescription:
      "Create campaigns in advance, choose the delivery time and keep scheduled communication organised from one dashboard.",
    secondaryButtonLink: `${ROUTES.bulkEmailScheduling}#features`,
  }),
  createManagedCmsPage({
    pageKey: "bulk-email-smtp",
    pageName: "Bulk Email SMTP",
    route: ROUTES.bulkEmailSmtp,
    title: "SMTP Configuration Software for Secure Business Email Delivery | Altroz Bulk Email",
    description:
      "Altroz Bulk Email lets businesses connect their own SMTP server, configure sender identity, secure delivery and monitor email activity from one dashboard.",
    keywords: [
      "smtp configuration",
      "sender email setup",
      "secure email delivery",
      "smtp software",
    ],
    heroEyebrow: "SMTP",
    heroTitle: "SMTP Configuration Software for Secure Business Email Delivery",
    heroDescription:
      "Connect your own SMTP server, manage sender identity and monitor delivery using one centralised workflow.",
    secondaryButtonLink: `${ROUTES.bulkEmailSmtp}#features`,
  }),
  createManagedCmsPage({
    pageKey: "bulk-email-hr-communication",
    pageName: "Bulk Email HR Communication",
    route: ROUTES.bulkEmailHrCommunication,
    title: "HR Communication Software for Centralised Employee Communication | Altroz Bulk Email",
    description:
      "Altroz Bulk Email helps HR teams send company announcements, policy updates, onboarding emails and internal circulars from one centralised dashboard.",
    keywords: [
      "hr communication",
      "employee communication",
      "internal announcements",
      "policy emails",
    ],
    heroEyebrow: "HR Communication",
    heroTitle: "HR Communication Software for Centralised Employee Communication",
    heroDescription:
      "Send employee announcements, policy updates, onboarding emails and internal circulars from one clear communication workflow.",
    secondaryButtonLink: `${ROUTES.bulkEmailHrCommunication}#features`,
  }),
  createManagedCmsPage({
    pageKey: "asset-management-product",
    pageName: "Asset Management Product",
    route: ROUTES.assetManagement,
    title: "Asset Management Software for Businesses | Altroz HR",
    description:
      "Manage company assets with Altroz HR Asset Management Software. Track allocation, issue-return, maintenance, warranty, reports, QR codes, and audit-ready records.",
    keywords: ["asset management software", "asset register", "asset allocation", "asset audits"],
    heroEyebrow: "Asset Management",
    heroTitle: "Asset Management Software to Track, Allocate and Manage Company Assets",
    heroDescription:
      "Register, assign, track and maintain company assets from one central dashboard built for HR, Admin and IT teams.",
    secondaryButtonLink: `${ROUTES.assetManagement}#features`,
  }),
  createManagedCmsPage({
    pageKey: "asset-management-suite",
    pageName: "Asset Management Suite",
    route: ROUTES.assetManagementHome,
    title: "Asset Management Software | Altroz Asset Management",
    description:
      "Register, assign, track and maintain business assets from one platform. Altroz Asset Management gives complete visibility across branches and departments.",
    keywords: ["asset management", "asset tracking", "asset maintenance", "branch asset control"],
    heroEyebrow: "Asset Management",
    heroTitle: "Asset Management Software for Complete Visibility and Control",
    heroDescription:
      "Manage business assets across branches and departments using one structured platform for registration, tracking and maintenance.",
    secondaryButtonLink: `${ROUTES.assetManagementHome}#features`,
    sections: assetManagementSuiteSections,
  }),
  createManagedCmsPage({
    pageKey: "asset-management-dashboard",
    pageName: "Asset Dashboard",
    route: ROUTES.bulkEmailAssetDashboard,
    title: "IT Asset Management Dashboard | Altroz Asset Management",
    description:
      "Track, assign, maintain and monitor IT equipment from one centralized dashboard with QR code tracking, warranty records and reports.",
    keywords: ["it asset dashboard", "asset monitoring", "hardware tracking", "asset visibility"],
    heroEyebrow: "Asset Dashboard",
    heroTitle: "IT Asset Management Dashboard for Real-Time Asset Visibility",
    heroDescription:
      "Track ownership, maintenance and lifecycle data for IT equipment from one centralised dashboard.",
    secondaryButtonLink: `${ROUTES.bulkEmailAssetDashboard}#features`,
  }),
  createManagedCmsPage({
    pageKey: "asset-management-tracking",
    pageName: "Asset Tracking",
    route: ROUTES.bulkEmailAssetTracking,
    title: "Asset Tracking Software | Altroz Asset Management",
    description:
      "Track business assets in real time with Altroz Asset Management. Assign, transfer and monitor assets by employee, department and branch using QR codes.",
    keywords: [
      "asset tracking software",
      "qr asset tracking",
      "asset transfer",
      "branch asset tracking",
    ],
    heroEyebrow: "Asset Tracking",
    heroTitle: "Asset Tracking Software for Real-Time Ownership and Location Visibility",
    heroDescription:
      "Track what the business owns, where assets are and who is responsible for them using one centralised system.",
    secondaryButtonLink: `${ROUTES.bulkEmailAssetTracking}#features`,
  }),
  createManagedCmsPage({
    pageKey: "asset-management-qr-code",
    pageName: "QR Asset Management",
    route: ROUTES.bulkEmailAssetQrCode,
    title: "QR Code Asset Management Software | Altroz Asset Mgmt",
    description:
      "Identify, assign and track every business asset using QR Codes. Generate, print and scan QR labels with Altroz Asset Management.",
    keywords: [
      "qr code asset management",
      "qr asset labels",
      "asset scanning",
      "asset identification",
    ],
    heroEyebrow: "QR Asset Management",
    heroTitle: "QR Code Asset Management Software for Faster Identification and Tracking",
    heroDescription:
      "Generate, print and scan QR labels so each physical asset stays connected to one live digital record.",
    secondaryButtonLink: `${ROUTES.bulkEmailAssetQrCode}#features`,
  }),
  createManagedCmsPage({
    pageKey: "asset-management-maintenance",
    pageName: "Asset Maintenance",
    route: ROUTES.bulkEmailAssetMaintenance,
    title: "Asset Maintenance Software | Altroz Asset Management",
    description:
      "Manage preventive maintenance, repair history, warranty tracking and service records from one platform. Reduce downtime with Altroz Asset Management.",
    keywords: [
      "asset maintenance software",
      "preventive maintenance",
      "repair history",
      "warranty tracking",
    ],
    heroEyebrow: "Asset Maintenance",
    heroTitle: "Asset Maintenance Software for Preventive Service and Downtime Reduction",
    heroDescription:
      "Manage maintenance schedules, repairs, service history and warranty timelines from one structured workflow.",
    secondaryButtonLink: `${ROUTES.bulkEmailAssetMaintenance}#features`,
  }),
  createManagedCmsPage({
    pageKey: "asset-management-reports",
    pageName: "Asset Reports",
    route: ROUTES.bulkEmailAssetReports,
    title: "Asset Reporting & Analytics Software | Altroz Asset Management",
    description:
      "Turn asset data into real-time dashboards, maintenance KPIs and audit-ready reports. See how Altroz Asset Management gives you total operational visibility.",
    keywords: ["asset reporting", "asset analytics", "asset dashboards", "audit reports"],
    heroEyebrow: "Asset Reports",
    heroTitle: "Asset Reporting and Analytics Software for Operational Visibility",
    heroDescription:
      "Turn asset data into dashboards, KPIs and audit-ready reports that help leadership review operations with confidence.",
    secondaryButtonLink: `${ROUTES.bulkEmailAssetReports}#features`,
  }),
];

const managedAdminPages = [
  createManagedCmsPage({
    pageKey: "hrms-resource-learn",
    pageName: "HRMS Learn",
    route: ROUTES.hrmsLearn,
    title: "Learn HRMS, Payroll & Attendance Workflows | Altroz HR",
    description:
      "Learn the core HRMS workflows your team uses every day, including employee records, attendance, payroll, leave and recruitment.",
    keywords: ["hrms learn", "attendance guide", "payroll guide", "hr workflows"],
    heroEyebrow: "HRMS Learning Hub",
    heroTitle: "Learn HRMS, Attendance, Payroll and Everyday People Operations",
    heroDescription:
      "A simple learning hub for HR teams, founders and operations managers who want to understand the workflows behind modern HRMS software.",
    sections: [
      createHeroSection({
        heading: "Learn HRMS, Attendance, Payroll and Everyday People Operations",
        subheading: "HRMS Learning Hub",
        description:
          "A simple learning hub for HR teams, founders and operations managers who want to understand the workflows behind modern HRMS software.",
        buttonText: "Explore Core HR",
        buttonLink: ROUTES.coreHR,
        settings: {
          badgeText: "Practical HRMS learning",
          heroBullets: [
            "Understand the main HRMS modules in plain business language.",
            "See how attendance, payroll and leave connect inside one workflow.",
            "Move from basic concepts to implementation-ready understanding.",
          ],
          secondaryButtonText: "Open HRMS",
          secondaryButtonLink: ROUTES.hrmsHome,
        },
      }),
      createIconCardsSection({
        sectionKey: "learning-topics",
        internalName: "Learning Topics",
        heading: "Start with the topics HR and operations teams ask about most",
        subheading: "Learning Topics",
        description:
          "Each topic card opens the matching product page so the learning path and the product journey stay connected.",
        items: [
          {
            itemType: "guide_card",
            title: "Core HR",
            subtitle: "Employee records",
            description:
              "Learn how central employee records, departments and designations fit together inside a modern HRMS.",
            icon: "Users",
            buttonText: "Open Core HR",
            buttonLink: ROUTES.coreHR,
          },
          {
            itemType: "guide_card",
            title: "Attendance",
            subtitle: "Time and shifts",
            description:
              "Understand biometric attendance, GPS check-ins, shifts and everyday attendance visibility.",
            icon: "CalendarDays",
            buttonText: "Open Attendance",
            buttonLink: ROUTES.attendanceManagement,
          },
          {
            itemType: "guide_card",
            title: "Payroll",
            subtitle: "Salary processing",
            description:
              "See how attendance data, deductions and salary approvals connect inside payroll workflows.",
            icon: "Wallet",
            buttonText: "Open Payroll",
            buttonLink: ROUTES.payroll,
          },
          {
            itemType: "guide_card",
            title: "Leave Management",
            subtitle: "Policies and approvals",
            description:
              "Learn how leave balances, requests and approvals work together without manual follow-up.",
            icon: "ClipboardList",
            buttonText: "Open Leave",
            buttonLink: ROUTES.leaveManagement,
          },
          {
            itemType: "guide_card",
            title: "Recruitment",
            subtitle: "Hiring process",
            description:
              "Follow the hiring flow from vacancies to candidate tracking and structured recruitment records.",
            icon: "BriefcaseBusiness",
            buttonText: "Open Recruitment",
            buttonLink: ROUTES.recruitment,
          },
          {
            itemType: "guide_card",
            title: "Performance",
            subtitle: "Goals and reviews",
            description:
              "Understand review cycles, feedback and goal-setting processes in one structured workflow.",
            icon: "Target",
            buttonText: "Open Performance",
            buttonLink: ROUTES.performance,
          },
        ],
      }),
      createCtaSection({
        heading: "Ready to see these HRMS workflows in one live platform?",
        description:
          "Open the HRMS page or book a guided walkthrough to see how the modules fit together in practice.",
        settings: {
          secondaryButtonText: "Book Free Demo",
          secondaryButtonLink: ROUTES.bookDemo,
        },
      }),
    ],
  }),
  createManagedCmsPage({
    pageKey: "hrms-resource-blog",
    pageName: "HRMS Blog",
    route: ROUTES.hrmsBlog,
    title: "HRMS Blog | Altroz HR",
    description:
      featuredHrmsBlogPost?.description ??
      "A practical, in-depth resource on Human Resource Management Systems - what they are, how they work, why Indian businesses need them, and how to choose one.",
    keywords: ["hr blog", "attendance articles", "payroll articles", "hr operations blog"],
    heroEyebrow: "HRMS Blog",
    heroTitle: "Learn everything about HR operations, attendance, payroll, and automation",
    heroDescription:
      "A clean editorial layout for your HRMS content, with practical guides, product links, and the same blue-green colour theme used across the rest of the site.",
    sections: createHrmsBlogLandingSections({ blogPath: ROUTES.hrmsBlog }),
  }),
  createManagedCmsPage({
    pageKey: "hrms-resource-faq",
    pageName: "HRMS FAQs",
    route: ROUTES.hrmsFaq,
    title: "HRMS FAQs for Payroll, Attendance and Employee Management | Altroz HR",
    description:
      "Find quick answers to common HRMS questions covering employee records, attendance, leave, payroll, compliance and onboarding workflows.",
    keywords: ["hrms faq", "payroll faq", "attendance faq", "employee management faq"],
    heroEyebrow: "HRMS FAQ",
    heroTitle: "Quick Answers to Common HRMS, Payroll and Attendance Questions",
    heroDescription:
      "A simple question-and-answer hub for teams evaluating employee management, attendance, payroll and compliance workflows.",
    sections: [
      createHeroSection({
        heading: "Quick Answers to Common HRMS, Payroll and Attendance Questions",
        subheading: "HRMS FAQ",
        description:
          "A simple question-and-answer hub for teams evaluating employee management, attendance, payroll and compliance workflows.",
        buttonText: "Browse HRMS",
        buttonLink: ROUTES.hrmsHome,
        settings: {
          badgeText: "Knowledge base",
          popularSearches: ["What is HRMS?", "How does payroll work?", "What is GPS attendance?"],
          secondaryButtonText: "Book Free Demo",
          secondaryButtonLink: ROUTES.bookDemo,
        },
      }),
      createFaqSection({
        heading: "The questions HR and operations teams usually ask first",
        subheading: "Frequently Asked Questions",
        description:
          "These answers keep the buying and learning process simple for business users.",
        buttonText: "Book Free Demo",
        buttonLink: ROUTES.bookDemo,
        settings: {
          secondaryHeading: "Need a guided explanation for your team?",
          secondaryDescription:
            "Use a live walkthrough if your team wants help connecting the FAQs to your actual workflows.",
          features: [
            "Attendance and leave",
            "Payroll and deductions",
            "Employee records",
            "Compliance workflows",
          ],
          secondaryButtonText: "Open HRMS",
          secondaryButtonLink: ROUTES.hrmsHome,
        },
        items: [
          {
            itemType: "faq",
            title: "What is HRMS?",
            description:
              "HRMS is software that helps manage the employee lifecycle, including records, attendance, leave, payroll and related workflows from one place.",
          },
          {
            itemType: "faq",
            title: "Why do businesses move away from spreadsheets?",
            description:
              "As teams grow, spreadsheets make approvals, payroll, attendance and records harder to control, review and audit consistently.",
          },
          {
            itemType: "faq",
            title: "How does payroll connect with attendance and leave?",
            description:
              "Payroll becomes more reliable when attendance, leave balances and employee records are already structured in the same system.",
          },
          {
            itemType: "faq",
            title: "Can HRMS help with employee self-service?",
            description:
              "Yes. Employees can usually view attendance, requests, documents and HR information without depending on manual HR follow-up.",
          },
          {
            itemType: "faq",
            title: "Is HRMS useful only for large companies?",
            description:
              "No. Smaller and growing teams often benefit the most because structured workflows reduce confusion early.",
          },
        ],
      }),
    ],
  }),
  createManagedCmsPage({
    pageKey: "hrms-resource-compliance-guides",
    pageName: "HRMS Compliance Guides",
    route: ROUTES.hrmsComplianceGuides,
    title: "HR Compliance Guides for Payroll, PF and ESIC | Altroz HR",
    description:
      "Explore simple compliance guides covering payroll records, PF, ESIC, attendance inputs, employee documents and day-to-day HR process control.",
    keywords: ["hr compliance guides", "pf", "esic", "payroll compliance", "employee records"],
    heroEyebrow: "Compliance Guides",
    heroTitle: "Simple Compliance Guides for Payroll, Records and Everyday HR Operations",
    heroDescription:
      "A practical compliance knowledge hub that keeps payroll, attendance, employee records and documentation connected in one learning flow.",
    sections: [
      createHeroSection({
        heading: "Simple Compliance Guides for Payroll, Records and Everyday HR Operations",
        subheading: "Compliance Guides",
        description:
          "A practical compliance knowledge hub that keeps payroll, attendance, employee records and documentation connected in one learning flow.",
        buttonText: "Open Payroll",
        buttonLink: ROUTES.payroll,
        settings: {
          badgeText: "Educational compliance content",
          heroBullets: [
            "Understand the common topics HR and payroll teams handle repeatedly.",
            "Keep compliance concepts linked to day-to-day process design.",
            "Use the guides as a starting point before workflow discussions.",
          ],
          secondaryButtonText: "Book Free Demo",
          secondaryButtonLink: ROUTES.bookDemo,
        },
      }),
      createIconCardsSection({
        sectionKey: "compliance-topics",
        internalName: "Compliance Topics",
        heading: "Common compliance topics Indian teams need to review clearly",
        subheading: "Compliance Topics",
        description: "These cards keep the focus on practical understanding, not legal complexity.",
        items: [
          {
            itemType: "category_card",
            title: "PF and ESIC",
            subtitle: "Statutory deductions",
            description:
              "Understand the record-keeping and payroll impact behind PF and ESIC workflows.",
            icon: "ShieldCheck",
            buttonText: "Open Payroll",
            buttonLink: ROUTES.payroll,
          },
          {
            itemType: "category_card",
            title: "Payroll Records",
            subtitle: "Salary workflows",
            description:
              "See how attendance, deductions and records connect to clean payroll operations.",
            icon: "Wallet",
            buttonText: "Open Payroll",
            buttonLink: ROUTES.payroll,
          },
          {
            itemType: "category_card",
            title: "Employee Documents",
            subtitle: "Record control",
            description:
              "Keep letters, acknowledgements and employee records easier to retrieve and review.",
            icon: "FileText",
            buttonText: "Open Core HR",
            buttonLink: ROUTES.coreHR,
          },
          {
            itemType: "category_card",
            title: "Attendance and Leave",
            subtitle: "Input quality",
            description:
              "Strong attendance and leave inputs make payroll and compliance reviews more reliable.",
            icon: "CalendarDays",
            buttonText: "Open Attendance",
            buttonLink: ROUTES.attendanceManagement,
          },
        ],
      }),
      createCtaSection({
        heading: "Need help connecting compliance topics to live HR workflows?",
        description: "See how attendance, payroll and records stay aligned inside Altroz HR.",
        settings: {
          secondaryButtonText: "Open HRMS",
          secondaryButtonLink: ROUTES.hrmsHome,
        },
      }),
    ],
  }),
  createManagedCmsPage({
    pageKey: "bulk-email-pricing",
    pageName: "Bulk Email Pricing",
    route: ROUTES.bulkEmailPricing,
    title: "Bulk Email Pricing Page | Altroz Bulk Email",
    description:
      "Present your bulk email pricing structure clearly with editable plans, delivery coverage, scheduling, templates, analytics and onboarding information.",
    keywords: ["bulk email pricing", "email platform pricing", "campaign pricing", "smtp pricing"],
    heroEyebrow: "Bulk Email Pricing",
    heroTitle: "Present Your Bulk Email Pricing, Setup and Coverage Clearly",
    heroDescription:
      "An editable pricing page for campaign sending, scheduling, templates, delivery visibility and onboarding coverage.",
    sections: [
      createHeroSection({
        heading: "Present Your Bulk Email Pricing, Setup and Coverage Clearly",
        subheading: "Bulk Email Pricing",
        description:
          "An editable pricing page for campaign sending, scheduling, templates, delivery visibility and onboarding coverage.",
        buttonText: "Book Free Demo",
        buttonLink: ROUTES.bookDemo,
        settings: {
          badgeText: "Editable pricing page",
          heroBullets: [
            "Show plans, inclusions and setup details without a complex admin.",
            "Edit headings, descriptions and pricing cards in one place.",
            "Keep your commercial page simple for non-technical users.",
          ],
          secondaryButtonText: "Contact Sales",
          secondaryButtonLink: ROUTES.bulkEmailContacts,
        },
        items: [
          {
            itemType: "pricing_highlight",
            title: "Campaign sending",
            subtitle: "Editable plan card",
            description: "Describe volume, sending model or plan notes in simple language.",
            icon: "Send",
          },
          {
            itemType: "pricing_highlight",
            title: "Templates",
            subtitle: "Editable inclusion",
            description: "Show whether templates, HTML uploads or branded layouts are included.",
            icon: "FileText",
          },
          {
            itemType: "pricing_highlight",
            title: "Analytics",
            subtitle: "Editable feature",
            description:
              "Explain what delivery visibility, reports or status tracking are included.",
            icon: "BarChart3",
          },
          {
            itemType: "pricing_highlight",
            title: "Onboarding",
            subtitle: "Editable support",
            description: "Add setup, training or sender-configuration details for new customers.",
            icon: "Users",
          },
        ],
      }),
      createIconCardsSection({
        sectionKey: "pricing-cards",
        internalName: "Pricing Cards",
        heading: "Use simple plan cards instead of an overcomplicated pricing table",
        subheading: "Pricing Cards",
        description:
          "Each card can be edited directly from admin so your client can maintain the page easily.",
        items: [
          {
            itemType: "plan_card",
            title: "Starter",
            subtitle: "Editable price",
            description: "Position this plan for smaller teams and low-volume campaign needs.",
            icon: "Sparkles",
            extraData: {
              features: ["Basic campaign sending", "Simple templates", "Email scheduling"],
            },
          },
          {
            itemType: "plan_card",
            title: "Growth",
            subtitle: "Editable price",
            description:
              "Use this plan for teams that want stronger delivery visibility and reusable workflows.",
            icon: "TrendingUp",
            extraData: {
              features: ["Delivery visibility", "Reusable templates", "Scheduled campaigns"],
            },
          },
          {
            itemType: "plan_card",
            title: "Enterprise",
            subtitle: "Editable price",
            description:
              "Present higher-volume communication, controls and onboarding support here.",
            icon: "ShieldCheck",
            extraData: {
              features: [
                "Advanced delivery tracking",
                "Sender setup guidance",
                "Business-ready support",
              ],
            },
          },
        ],
      }),
      createFaqSection({
        heading: "A few helpful questions to keep the commercial discussion simple",
        subheading: "Pricing FAQ",
        description: "Use this section to explain how pricing, setup and support are presented.",
        buttonText: "Contact Sales",
        buttonLink: ROUTES.bulkEmailContacts,
        settings: {
          secondaryHeading: "Need a tailored quote instead of fixed public pricing?",
          secondaryDescription:
            "Use the contact path for custom volume, onboarding or sender-configuration discussions.",
          secondaryButtonText: "Book Free Demo",
          secondaryButtonLink: ROUTES.bookDemo,
        },
        items: [
          {
            itemType: "faq",
            title: "Can pricing cards be edited from admin?",
            description:
              "Yes. Titles, subtitles, descriptions and feature bullets can be updated in the page editor.",
          },
          {
            itemType: "faq",
            title: "Can I show custom or contact-sales pricing instead of fixed rates?",
            description:
              "Yes. Replace numeric pricing with custom-quote language if that suits your sales process better.",
          },
          {
            itemType: "faq",
            title: "Can I explain setup and onboarding separately?",
            description:
              "Yes. Use the card descriptions and FAQ content to present setup, training and sender-configuration details clearly.",
          },
        ],
      }),
    ],
  }),
  createManagedCmsPage({
    pageKey: "bulk-email-resource-learn",
    pageName: "Bulk Email Learn",
    route: ROUTES.bulkEmailLearn,
    title: "Learn Bulk Email, Campaigns and SMTP | Altroz Bulk Email",
    description:
      "Explore practical bulk email learning content covering broadcasts, scheduling, templates, SMTP and delivery visibility.",
    keywords: ["bulk email learn", "smtp guide", "campaign guide", "email scheduling"],
    heroEyebrow: "Bulk Email Learning Hub",
    heroTitle: "Learn Bulk Email, Templates, Scheduling and Business Email Delivery",
    heroDescription:
      "A simple learning hub for teams that want to understand broadcast email workflows before or during product evaluation.",
    sections: [
      createHeroSection({
        heading: "Learn Bulk Email, Templates, Scheduling and Business Email Delivery",
        subheading: "Bulk Email Learning Hub",
        description:
          "A simple learning hub for teams that want to understand broadcast email workflows before or during product evaluation.",
        buttonText: "Open Bulk Email",
        buttonLink: ROUTES.bulkEmail,
        settings: {
          badgeText: "Plain-language learning",
          heroBullets: [
            "Understand campaigns, templates and delivery steps clearly.",
            "Learn the workflow before diving into the product interface.",
            "Keep the path simple for business users and non-technical teams.",
          ],
          secondaryButtonText: "Book Free Demo",
          secondaryButtonLink: ROUTES.bookDemo,
        },
      }),
      createIconCardsSection({
        sectionKey: "bulk-learning-topics",
        internalName: "Learning Topics",
        heading: "Start with the bulk-email topics most teams need first",
        subheading: "Learning Topics",
        description:
          "These cards mirror the main product workspaces so learning and product exploration stay aligned.",
        items: [
          {
            itemType: "guide_card",
            title: "Email Broadcasts",
            subtitle: "Campaign sending",
            description:
              "Learn how businesses create and send one-to-many email broadcasts in a controlled workflow.",
            icon: "Send",
            buttonText: "Open Broadcast",
            buttonLink: ROUTES.bulkEmailBroadcast,
          },
          {
            itemType: "guide_card",
            title: "Templates",
            subtitle: "Reusable layouts",
            description:
              "Understand branded layouts, HTML uploads and how templates reduce repeated work.",
            icon: "FileText",
            buttonText: "Open Templates",
            buttonLink: ROUTES.bulkEmailTemplates,
          },
          {
            itemType: "guide_card",
            title: "Scheduling",
            subtitle: "Planned delivery",
            description:
              "See how scheduled sending helps businesses time communication more reliably.",
            icon: "CalendarClock",
            buttonText: "Open Scheduling",
            buttonLink: ROUTES.bulkEmailScheduling,
          },
          {
            itemType: "guide_card",
            title: "SMTP",
            subtitle: "Sender setup",
            description:
              "Get a clear introduction to sender identity, SMTP setup and controlled outbound delivery.",
            icon: "ServerCog",
            buttonText: "Open SMTP",
            buttonLink: ROUTES.bulkEmailSmtp,
          },
        ],
      }),
      createCtaSection({
        heading: "Ready to move from learning to a live bulk-email walkthrough?",
        description:
          "See how campaigns, scheduling, templates and delivery visibility work inside the product.",
        settings: {
          secondaryButtonText: "Open Bulk Email",
          secondaryButtonLink: ROUTES.bulkEmail,
        },
      }),
    ],
  }),
  createManagedCmsPage({
    pageKey: "bulk-email-resource-blog",
    pageName: "Bulk Email Blog",
    route: ROUTES.bulkEmailBlog,
    title: "Bulk Email Blog for Campaigns, SMTP and Delivery Visibility | Altroz",
    description:
      "Read practical bulk email articles covering broadcasts, scheduling, templates, SMTP setup and delivery visibility for business teams.",
    keywords: [
      "bulk email blog",
      "email campaigns blog",
      "smtp articles",
      "delivery tracking articles",
    ],
    heroEyebrow: "Bulk Email Blog",
    heroTitle: "Practical Bulk Email Articles for Campaigns, Scheduling and SMTP Workflows",
    heroDescription:
      "A simple content hub for business communication teams that need clear, useful guidance on campaign operations.",
    sections: [
      createHeroSection({
        heading: "Practical Bulk Email Articles for Campaigns, Scheduling and SMTP Workflows",
        subheading: "Bulk Email Blog",
        description:
          "A simple content hub for business communication teams that need clear, useful guidance on campaign operations.",
        buttonText: "Open Bulk Email",
        buttonLink: ROUTES.bulkEmail,
        settings: {
          badgeText: "Business communication insights",
          secondaryButtonText: "Book Free Demo",
          secondaryButtonLink: ROUTES.bookDemo,
        },
      }),
      createIconCardsSection({
        sectionKey: "blog-topics",
        internalName: "Blog Topics",
        heading: "Featured article topics for bulk email and sender operations",
        subheading: "Blog Topics",
        description:
          "Use these cards to highlight the email topics your prospects search for most often.",
        items: [
          {
            itemType: "topic_card",
            title: "Broadcast Planning",
            subtitle: "Campaign strategy",
            description:
              "Explain how teams plan campaigns, timing and internal review before sending.",
            icon: "Send",
            buttonText: "Open Broadcast",
            buttonLink: ROUTES.bulkEmailBroadcast,
          },
          {
            itemType: "topic_card",
            title: "Reusable Templates",
            subtitle: "Brand consistency",
            description:
              "Show how templates improve consistency and speed across repeated campaigns.",
            icon: "FileText",
            buttonText: "Open Templates",
            buttonLink: ROUTES.bulkEmailTemplates,
          },
          {
            itemType: "topic_card",
            title: "SMTP Setup",
            subtitle: "Controlled delivery",
            description:
              "Cover sender setup, SMTP basics and why controlled delivery matters to businesses.",
            icon: "ServerCog",
            buttonText: "Open SMTP",
            buttonLink: ROUTES.bulkEmailSmtp,
          },
          {
            itemType: "topic_card",
            title: "Delivery Visibility",
            subtitle: "Reports and status",
            description:
              "Help teams understand delivery status, analytics and review workflows after a send.",
            icon: "BarChart3",
            buttonText: "Open Analytics",
            buttonLink: ROUTES.bulkEmailAnalytics,
          },
          {
            itemType: "topic_card",
            title: "HR Communication",
            subtitle: "Internal messaging",
            description:
              "Discuss how HR teams use bulk email for updates, policies and employee communication.",
            icon: "Users",
            buttonText: "Open HR Communication",
            buttonLink: ROUTES.bulkEmailHrCommunication,
          },
          {
            itemType: "topic_card",
            title: "Education Broadcasts",
            subtitle: "Institution communication",
            description:
              "Show how institutions use scheduling and templates for announcements and notices.",
            icon: "GraduationCap",
            buttonText: "Open Education",
            buttonLink: ROUTES.bulkEmailEducation,
          },
        ],
      }),
      createCtaSection({
        heading: "Need help turning these ideas into a working campaign setup?",
        description:
          "Use a live walkthrough to connect the articles to your real campaign process.",
        settings: {
          secondaryButtonText: "Contact Sales",
          secondaryButtonLink: ROUTES.bulkEmailContacts,
        },
      }),
    ],
  }),
  createManagedCmsPage({
    pageKey: "bulk-email-resource-faq",
    pageName: "Bulk Email FAQs",
    route: ROUTES.bulkEmailFaq,
    title: "Bulk Email FAQs for Campaigns, Templates and SMTP | Altroz",
    description:
      "Find simple answers about bulk email campaigns, templates, scheduling, SMTP configuration and delivery visibility.",
    keywords: ["bulk email faq", "smtp faq", "campaign faq", "email templates faq"],
    heroEyebrow: "Bulk Email FAQ",
    heroTitle: "Simple Answers for Bulk Email Campaigns, Templates and SMTP Questions",
    heroDescription:
      "A clear FAQ page for teams that want straightforward answers before they evaluate or launch a platform.",
    sections: [
      createHeroSection({
        heading: "Simple Answers for Bulk Email Campaigns, Templates and SMTP Questions",
        subheading: "Bulk Email FAQ",
        description:
          "A clear FAQ page for teams that want straightforward answers before they evaluate or launch a platform.",
        buttonText: "Open Bulk Email",
        buttonLink: ROUTES.bulkEmail,
        settings: {
          badgeText: "Knowledge base",
          popularSearches: [
            "What is bulk email?",
            "How does SMTP work?",
            "Can I schedule campaigns?",
          ],
          secondaryButtonText: "Book Free Demo",
          secondaryButtonLink: ROUTES.bookDemo,
        },
      }),
      createFaqSection({
        heading: "The questions business teams usually ask before sending at scale",
        subheading: "Frequently Asked Questions",
        description: "Keep the answers short, clear and easy to update from admin.",
        buttonText: "Contact Sales",
        buttonLink: ROUTES.bulkEmailContacts,
        settings: {
          secondaryHeading: "Need help with sender setup, campaigns or templates?",
          secondaryDescription:
            "Use a live conversation when the question is more practical than technical.",
          features: [
            "Campaign workflows",
            "Scheduling",
            "Templates and HTML",
            "SMTP configuration",
          ],
          secondaryButtonText: "Book Free Demo",
          secondaryButtonLink: ROUTES.bookDemo,
        },
        items: [
          {
            itemType: "faq",
            title: "What is bulk email software?",
            description:
              "Bulk email software helps businesses create, schedule, send and review email campaigns from one platform instead of manual one-by-one sending.",
          },
          {
            itemType: "faq",
            title: "Can I schedule campaigns in advance?",
            description:
              "Yes. Scheduled sending lets teams prepare campaigns earlier and release them at a planned time.",
          },
          {
            itemType: "faq",
            title: "Can I use templates or my own HTML?",
            description:
              "Yes. Businesses can usually use reusable templates or upload their own HTML layout for brand consistency.",
          },
          {
            itemType: "faq",
            title: "Why does SMTP matter?",
            description:
              "SMTP setup matters because it controls how your outgoing mail is sent and how the sender identity is configured.",
          },
          {
            itemType: "faq",
            title: "Can I review delivery status after a campaign?",
            description:
              "Yes. Delivery visibility and reporting help teams understand what happened after a broadcast is sent.",
          },
        ],
      }),
    ],
  }),
  createManagedCmsPage({
    pageKey: "asset-management-resource-learn",
    pageName: "Asset Management Learn",
    route: ROUTES.assetManagementLearn,
    title: "Learn Asset Management, Tracking and Maintenance Workflows | Altroz",
    description:
      "Learn the basics of asset registers, assignment, lifecycle tracking, maintenance and reporting in simple business language.",
    keywords: [
      "asset management learn",
      "asset tracking guide",
      "maintenance guide",
      "asset register",
    ],
    heroEyebrow: "Asset Management Learning Hub",
    heroTitle: "Learn Asset Registers, Tracking, Maintenance and Everyday Control Workflows",
    heroDescription:
      "A simple learning hub for teams that want to understand asset management before introducing a structured platform.",
    sections: [
      createHeroSection({
        heading: "Learn Asset Registers, Tracking, Maintenance and Everyday Control Workflows",
        subheading: "Asset Management Learning Hub",
        description:
          "A simple learning hub for teams that want to understand asset management before introducing a structured platform.",
        buttonText: "Open Asset Management",
        buttonLink: ROUTES.assetManagementHome,
        settings: {
          badgeText: "Practical asset learning",
          heroBullets: [
            "Understand asset registration, ownership and transfer basics.",
            "Learn how maintenance and warranty visibility reduce surprises.",
            "Keep audits, branch control and reporting in one simple learning path.",
          ],
          secondaryButtonText: "Book Free Demo",
          secondaryButtonLink: ROUTES.bookDemo,
        },
      }),
      createIconCardsSection({
        sectionKey: "asset-learning-topics",
        internalName: "Learning Topics",
        heading: "Start with the asset-management topics operational teams ask about most",
        subheading: "Learning Topics",
        description:
          "These cards are designed for admin, IT, HR and operations teams that need a shared understanding.",
        items: [
          {
            itemType: "guide_card",
            title: "Asset Register",
            subtitle: "Source of truth",
            description:
              "Learn how a structured asset register keeps ownership, status and location visible in one place.",
            icon: "Package",
            buttonText: "Open Asset Management",
            buttonLink: ROUTES.assetManagementHome,
          },
          {
            itemType: "guide_card",
            title: "Assignment and Handover",
            subtitle: "Ownership flow",
            description:
              "Understand how issue, return and handover records reduce confusion across teams.",
            icon: "RotateCcw",
            buttonText: "Open Asset Tracking",
            buttonLink: ROUTES.bulkEmailAssetTracking,
          },
          {
            itemType: "guide_card",
            title: "Maintenance and Warranty",
            subtitle: "Service visibility",
            description:
              "See how service events, due dates and warranty tracking support better upkeep.",
            icon: "Wrench",
            buttonText: "Open Asset Maintenance",
            buttonLink: ROUTES.bulkEmailAssetMaintenance,
          },
          {
            itemType: "guide_card",
            title: "Reports and Audits",
            subtitle: "Operational review",
            description: "Learn how reports support planning, branch review and audit-readiness.",
            icon: "BarChart3",
            buttonText: "Open Asset Reports",
            buttonLink: ROUTES.bulkEmailAssetReports,
          },
        ],
      }),
      createCtaSection({
        heading: "Ready to see asset workflows inside one live platform?",
        description: "Open the main Asset Management page or book a walkthrough for your team.",
        settings: {
          secondaryButtonText: "Open Asset Management",
          secondaryButtonLink: ROUTES.assetManagementHome,
        },
      }),
    ],
  }),
  createManagedCmsPage({
    pageKey: "asset-management-guide",
    pageName: "Asset Management Guide",
    route: ROUTES.assetManagementGuide,
    title: "Asset Management Guide | Complete Business Guide 2026",
    description:
      "Learn asset management, tracking, maintenance, QR Codes, lifecycle management, reporting, audits, and best practices for modern businesses.",
    ogTitle: "Asset Management Guide: Everything Businesses Need to Know",
    ogDescription:
      "A complete, practical guide to asset management covering tracking, QR codes, maintenance, audits, reporting, and best practices for businesses of every size.",
    keywords: [
      "asset management guide",
      "asset management",
      "asset management software guide",
      "asset tracking guide",
      "asset lifecycle management",
      "asset inventory management",
      "asset maintenance management",
      "asset management best practices",
      "business asset management",
      "digital asset management for businesses",
      "asset tracking software guide",
      "enterprise asset management guide",
      "asset audit guide",
      "qr code asset management guide",
    ],
    heroEyebrow: "Asset Management Guide",
    heroTitle: "Asset Management Guide: Everything Businesses Need to Know",
    heroDescription:
      "This guide helps businesses understand how to organise, track, maintain, and manage physical assets throughout their lifecycle.",
    sections: [
      createHeroSection({
        heading: "Asset Management Guide: Everything Businesses Need to Know",
        subheading: "Asset Management Guide",
        description:
          "This guide helps businesses understand how to organise, track, maintain, and manage physical assets throughout their lifecycle - from the day an asset is purchased to the day it is retired. Whether you are just starting to think about asset management or looking to move from spreadsheets to a digital system, this page brings together the concepts, workflows, and best practices you need in one place.",
        buttonText: "Explore the Guide",
        buttonLink: "#what-is-asset-management",
        settings: {
          badgeText: "Asset Management Guide",
          heroBullets: [
            "Learn asset management, tracking, maintenance, QR codes, lifecycle management, reporting and audits.",
            "Understand manual vs digital asset management with a practical business comparison.",
            "Use the checklist and FAQs as a quick reference for implementation planning.",
          ],
          secondaryButtonText: "Book Free Demo",
          secondaryButtonLink: ROUTES.bookDemo,
        },
        items: [
          {
            itemType: "hero_highlight",
            title: "22-25 min",
            subtitle: "Reading time",
            description: "A complete educational resource for business teams.",
            icon: "BookOpen",
          },
          {
            itemType: "hero_highlight",
            title: "2026",
            subtitle: "Guide edition",
            description: "Built around modern tracking, QR, reporting and audit practices.",
            icon: "Sparkles",
          },
          {
            itemType: "hero_highlight",
            title: "Asset lifecycle",
            subtitle: "End-to-end",
            description: "From procurement and registration through retirement and disposal.",
            icon: "Workflow",
          },
          {
            itemType: "hero_highlight",
            title: "QR + reports",
            subtitle: "Operational control",
            description: "Covers identification, maintenance, audit and reporting workflows.",
            icon: "QrCode",
          },
        ],
      }),
      createContentSplitSection({
        sectionKey: "what-is-asset-management",
        internalName: "What Is Asset Management",
        heading: "What Is Asset Management?",
        subheading: "Asset Management Basics",
        description:
          "Asset management is the process of organising, tracking, maintaining, and reviewing the physical items that a business owns and uses to run its operations.",
        items: [
          {
            itemType: "content_card",
            title: "What is asset management?",
            subtitle: "Definition",
            description:
              "Asset management is the process of organising, tracking, maintaining, and reviewing the physical items - or assets - that a business owns and uses to run its operations. It covers everything from knowing what assets exist, to knowing where they are, who is using them, and what condition they are in.",
          },
          {
            itemType: "content_card",
            title: "What counts as a business asset?",
            subtitle: "Common examples",
            description:
              "A business asset is any physical item of value that an organisation owns and uses for its work.",
            extraData: {
              features: [
                "Laptops and computers",
                "Machines and production equipment",
                "Printers and office devices",
                "Vehicles",
                "Tools and equipment used on-site",
                "Medical equipment",
                "General office equipment such as furniture and projectors",
              ],
            },
          },
          {
            itemType: "content_card",
            title: "Why do organisations manage assets?",
            subtitle: "Visibility and control",
            description:
              "Businesses manage assets so they always know what they own, where it is, who is responsible for it, and when it needs attention. Without this visibility, organisations risk losing track of expensive equipment, missing maintenance, buying duplicate items, and struggling during audits or financial reporting.",
          },
          {
            itemType: "content_card",
            title: "How does asset management work?",
            subtitle: "Basic workflow",
            description:
              "At a basic level, asset management works by recording every asset in a central register, assigning it to a person, department, or location, tracking its movement and condition over time, and reviewing that information through reports. This can be done manually or through dedicated software.",
          },
          {
            itemType: "content_card",
            title: "Manual vs digital asset management",
            subtitle: "Two approaches",
            description:
              "Manual asset management typically relies on spreadsheets, paper registers, or informal records maintained by individual departments. Digital asset management uses dedicated software to centralise records, automate tracking, and make reporting easier. Both approaches answer the same core questions - what do we own, where is it, and what condition is it in - but a digital platform makes those answers easier to keep accurate as a business grows.",
          },
        ],
      }),
      createIconCardsSection({
        sectionKey: "why-asset-management-matters",
        internalName: "Why Asset Management Matters",
        heading: "Why Asset Management Matters",
        subheading: "Business Problems",
        description:
          "Poor asset management creates real, everyday problems for businesses. These are the most common issues organisations face and how better practices help.",
        items: [
          {
            itemType: "problem_card",
            title: "Lost Assets",
            subtitle: "Inconsistent tracking",
            description: "Why it happens: Assets are not tracked or labelled consistently.",
            icon: "Package",
            extraData: {
              features: [
                "Business impact: Wasted spend on replacement items and reduced trust in asset records.",
                "How better asset management helps: A central register with clear identification helps teams always know what exists and where it should be.",
              ],
            },
          },
          {
            itemType: "problem_card",
            title: "Unknown Asset Ownership",
            subtitle: "No formal assignment",
            description:
              "Why it happens: Assets are not formally assigned to a person or department.",
            icon: "Users",
            extraData: {
              features: [
                "Business impact: No accountability when equipment goes missing or is misused.",
                "How better asset management helps: Recording asset assignment makes it clear who is responsible for each item.",
              ],
            },
          },
          {
            itemType: "problem_card",
            title: "Manual Registers",
            subtitle: "Scattered records",
            description:
              "Why it happens: Asset details are kept in scattered spreadsheets or paper logs.",
            icon: "FileText",
            extraData: {
              features: [
                "Business impact: Records become outdated, duplicated, or inconsistent across teams.",
                "How better asset management helps: A single digital record reduces duplication and keeps information current.",
              ],
            },
          },
          {
            itemType: "problem_card",
            title: "Duplicate Purchases",
            subtitle: "Low inventory visibility",
            description: "Why it happens: Teams cannot see what assets are already available.",
            icon: "ShoppingBag",
            extraData: {
              features: [
                "Business impact: Unnecessary spending on equipment the business already owns.",
                "How better asset management helps: Clear visibility into existing inventory prevents avoidable repurchasing.",
              ],
            },
          },
          {
            itemType: "problem_card",
            title: "Missed Maintenance",
            subtitle: "No reminder system",
            description: "Why it happens: There is no reminder system for scheduled servicing.",
            icon: "Wrench",
            extraData: {
              features: [
                "Business impact: Equipment breaks down or fails earlier than expected.",
                "How better asset management helps: Maintenance records and schedules help teams service assets on time.",
              ],
            },
          },
          {
            itemType: "problem_card",
            title: "Expired Warranties",
            subtitle: "Dates not tracked",
            description: "Why it happens: Warranty dates are not recorded or tracked.",
            icon: "ShieldCheck",
            extraData: {
              features: [
                "Business impact: Businesses pay for repairs that could have been covered under warranty.",
                "How better asset management helps: Recording warranty information helps teams claim coverage before it lapses.",
              ],
            },
          },
          {
            itemType: "problem_card",
            title: "Poor Asset Visibility",
            subtitle: "Fragmented information",
            description:
              "Why it happens: Information about assets is fragmented across departments.",
            icon: "LayoutDashboard",
            extraData: {
              features: [
                "Business impact: Slower decision-making and difficulty planning purchases or budgets.",
                "How better asset management helps: Centralised records give managers a clear, current view of all assets.",
              ],
            },
          },
          {
            itemType: "problem_card",
            title: "Difficult Audits",
            subtitle: "Incomplete data",
            description: "Why it happens: Asset data is incomplete, outdated, or hard to locate.",
            icon: "ClipboardCheck",
            extraData: {
              features: [
                "Business impact: Audits take longer and are more likely to surface discrepancies.",
                "How better asset management helps: Up-to-date, centralised records make audits faster and more accurate.",
              ],
            },
          },
          {
            itemType: "problem_card",
            title: "Scattered Records",
            subtitle: "No single source of truth",
            description: "Why it happens: Different teams keep their own separate lists.",
            icon: "Layers3",
            extraData: {
              features: [
                "Business impact: No single source of truth for asset information.",
                "How better asset management helps: A shared system consolidates records so everyone works from the same data.",
              ],
            },
          },
          {
            itemType: "problem_card",
            title: "Limited Reporting",
            subtitle: "Hard to convert data",
            description:
              "Why it happens: There is no easy way to pull asset data into a usable report.",
            icon: "BarChart3",
            extraData: {
              features: [
                "Business impact: Leadership lacks the information needed for planning and budgeting.",
                "How better asset management helps: Built-in reporting turns raw asset data into insights for decision-making.",
              ],
            },
          },
        ],
      }),
      createTimelineSection({
        sectionKey: "complete-asset-management-lifecycle",
        internalName: "Complete Asset Management Lifecycle",
        heading: "The Complete Asset Management Lifecycle",
        subheading: "Lifecycle",
        description:
          "Every asset moves through a predictable set of stages from the day it is bought to the day it is retired. Understanding this lifecycle helps businesses manage assets more consistently.",
        items: [
          {
            itemType: "lifecycle_step",
            title: "Procurement",
            subtitle: "Step 1",
            description:
              "The business identifies a need and purchases an asset - for example, buying new laptops for a growing team.",
          },
          {
            itemType: "lifecycle_step",
            title: "Asset Registration",
            subtitle: "Step 2",
            description:
              "The new asset is recorded in the asset register with details such as purchase date, cost, and vendor.",
          },
          {
            itemType: "lifecycle_step",
            title: "Categorisation",
            subtitle: "Step 3",
            description:
              "The asset is grouped into a category such as IT equipment, furniture, or machinery so it is easier to organise and search.",
          },
          {
            itemType: "lifecycle_step",
            title: "QR Code / Identification",
            subtitle: "Step 4",
            description:
              "A unique identifier, such as a QR code or asset tag, is attached so the asset can be recognised quickly.",
          },
          {
            itemType: "lifecycle_step",
            title: "Assignment",
            subtitle: "Step 5",
            description:
              "The asset is assigned to a person, department, or location responsible for it, such as a laptop assigned to a new employee.",
          },
          {
            itemType: "lifecycle_step",
            title: "Usage",
            subtitle: "Step 6",
            description: "The asset is put to work in daily operations.",
          },
          {
            itemType: "lifecycle_step",
            title: "Tracking",
            subtitle: "Step 7",
            description:
              "The business keeps a record of the asset's location, condition, and movement over time.",
          },
          {
            itemType: "lifecycle_step",
            title: "Maintenance",
            subtitle: "Step 8",
            description:
              "Scheduled or as-needed servicing keeps the asset in good working condition.",
          },
          {
            itemType: "lifecycle_step",
            title: "Warranty",
            subtitle: "Step 9",
            description:
              "Warranty details are tracked so repairs can be claimed while coverage is valid.",
          },
          {
            itemType: "lifecycle_step",
            title: "Transfer",
            subtitle: "Step 10",
            description:
              "When an asset moves between employees, departments, or branches, the transfer is recorded to keep ownership accurate.",
          },
          {
            itemType: "lifecycle_step",
            title: "Reporting",
            subtitle: "Step 11",
            description:
              "Asset data is reviewed through reports to support decisions on budgeting, replacement, and utilisation.",
          },
          {
            itemType: "lifecycle_step",
            title: "Retirement / Disposal",
            subtitle: "Step 12",
            description:
              "When an asset reaches the end of its useful life, it is formally retired or disposed of and removed from active records.",
          },
        ],
      }),
      createIconCardsSection({
        sectionKey: "asset-management-topic-hub",
        internalName: "Asset Management Topic Hub",
        heading: "Asset Management Topic Hub",
        subheading: "Explore Topics",
        description:
          "Explore each part of asset management in more depth through the topic cards below.",
        items: [
          {
            itemType: "topic_card",
            title: "Asset Management Basics",
            subtitle: "Foundations",
            description:
              "Understand the fundamental concepts of asset management - what it is, why it matters, and how it works in practice.",
            icon: "BookOpen",
            buttonText: "Learn More",
            buttonLink: "#what-is-asset-management",
          },
          {
            itemType: "topic_card",
            title: "Asset Tracking",
            subtitle: "Visibility",
            description:
              "Learn how businesses track assets, maintain visibility, and stay accountable for equipment across teams and locations.",
            icon: "MapPin",
            buttonText: "Read Asset Tracking Guide",
            buttonLink: "#asset-tracking-guide",
          },
          {
            itemType: "topic_card",
            title: "QR Code Asset Management",
            subtitle: "Identification",
            description:
              "See how QR codes are used to identify assets quickly and accurately, including during audits and maintenance.",
            icon: "QrCode",
            buttonText: "Learn About QR Asset Management",
            buttonLink: "#qr-code-asset-management-guide",
          },
          {
            itemType: "topic_card",
            title: "Asset Maintenance",
            subtitle: "Reliability",
            description:
              "Explore maintenance planning, service records, and how to keep equipment reliable over its lifetime.",
            icon: "Wrench",
            buttonText: "Read Maintenance Guide",
            buttonLink: "#asset-maintenance-guide",
          },
          {
            itemType: "topic_card",
            title: "Asset Reports",
            subtitle: "Decision-making",
            description:
              "Understand how asset reporting supports smarter, faster business decisions.",
            icon: "BarChart3",
            buttonText: "Explore Asset Reports",
            buttonLink: "#asset-reporting-guide",
          },
          {
            itemType: "topic_card",
            title: "Asset Lifecycle Management",
            subtitle: "End-to-end control",
            description:
              "Learn how to manage assets from procurement through to retirement in a structured way.",
            icon: "Workflow",
            buttonText: "Learn Lifecycle Management",
            buttonLink: "#complete-asset-management-lifecycle",
          },
        ],
      }),
      createContentSplitSection({
        sectionKey: "asset-tracking-guide",
        internalName: "Asset Tracking Guide",
        heading: "Asset Tracking Guide",
        subheading: "Tracking",
        description:
          "Asset tracking gives businesses an ongoing, accurate picture of equipment instead of relying on memory or scattered notes.",
        buttonText: "Open Asset Tracking",
        buttonLink: ROUTES.bulkEmailAssetTracking,
        items: [
          {
            itemType: "content_card",
            title: "What is asset tracking?",
            subtitle: "Definition",
            description:
              "Asset tracking is the process of recording and monitoring where an asset is, who is using it, and how its status changes over time.",
          },
          {
            itemType: "content_card",
            title: "Why do businesses track assets?",
            subtitle: "Purpose",
            description:
              "Businesses track assets to reduce loss, improve accountability, plan purchases more accurately, and prepare for audits without last-minute scrambling.",
          },
          {
            itemType: "content_card",
            title: "How does asset assignment work?",
            subtitle: "Accountability",
            description:
              "Asset assignment links a specific asset to the person, team, or department using it. This record makes it clear who is responsible for the item and makes handovers, returns, and transfers easier to manage.",
          },
          {
            itemType: "content_card",
            title: "How does branch and department tracking work?",
            subtitle: "Locations",
            description:
              "For businesses with multiple locations, assets can be organised and tracked by branch or department. This makes it possible to see how many assets exist at each site and how they are distributed across teams.",
          },
          {
            itemType: "content_card",
            title: "How can QR codes help identify assets?",
            subtitle: "Fast lookup",
            description:
              "A QR code attached to an asset allows staff to scan and instantly pull up its record - including assignment, category, and history - instead of manually searching a register.",
          },
          {
            itemType: "content_card",
            title: "How does asset history improve accountability?",
            subtitle: "History",
            description:
              "A recorded history of assignments, transfers, and maintenance activity creates a clear trail for every asset, making it easier to answer questions about who used it, when, and what happened to it.",
          },
        ],
      }),
      createContentSplitSection({
        sectionKey: "qr-code-asset-management-guide",
        internalName: "QR Code Asset Management Guide",
        heading: "QR Code Asset Management Guide",
        subheading: "QR Codes",
        description:
          "QR code asset management uses unique labels to make each physical asset faster to identify, look up, and verify.",
        buttonText: "Open QR Code Asset Management",
        buttonLink: ROUTES.bulkEmailAssetQrCode,
        items: [
          {
            itemType: "content_card",
            title: "What does QR code asset management mean?",
            subtitle: "Definition",
            description:
              "QR code asset management is the practice of attaching a unique QR code to each physical asset so it can be quickly identified, looked up, and tracked using a scanner or smartphone camera.",
          },
          {
            itemType: "content_card",
            title: "How do QR codes identify assets?",
            subtitle: "Unique record",
            description:
              "Each QR code is linked to a specific asset record. Scanning the code opens that record, showing details such as the asset's category, assignment, and status without needing to search manually.",
          },
          {
            itemType: "content_card",
            title: "How do QR labels work?",
            subtitle: "Labeling",
            description:
              "A QR label is a small, durable sticker or tag printed with the asset's unique QR code and attached directly to the item, making it identifiable at a glance.",
          },
          {
            itemType: "content_card",
            title: "What information can scanning provide?",
            subtitle: "Record lookup",
            description:
              "Scanning an asset's QR code can surface information already stored in its record, such as category, current assignment, and status. The exact details available depend on what has been recorded for that asset.",
          },
          {
            itemType: "content_card",
            title: "How do QR codes help during audits?",
            subtitle: "Audit speed",
            description:
              "During an audit, staff can scan each asset's QR code to quickly confirm it matches the register, which speeds up verification and reduces manual cross-checking.",
          },
          {
            itemType: "content_card",
            title: "How can QR codes support maintenance workflows?",
            subtitle: "Service records",
            description:
              "QR codes make it faster to pull up an asset's record before logging a service or repair, helping maintenance teams keep accurate, asset-specific records.",
          },
        ],
      }),
      createContentSplitSection({
        sectionKey: "asset-maintenance-guide",
        internalName: "Asset Maintenance Guide",
        heading: "Asset Maintenance Guide",
        subheading: "Maintenance",
        description:
          "Asset maintenance keeps equipment in good working condition through servicing, repair records, scheduling, and warranty visibility.",
        buttonText: "Open Asset Maintenance",
        buttonLink: ROUTES.bulkEmailAssetMaintenance,
        items: [
          {
            itemType: "content_card",
            title: "What does asset maintenance mean?",
            subtitle: "Definition",
            description:
              "Asset maintenance is the ongoing process of servicing, repairing, and monitoring assets so they stay in good working condition throughout their useful life.",
          },
          {
            itemType: "content_card",
            title: "Preventive Maintenance",
            subtitle: "Planned service",
            description:
              "Preventive maintenance means servicing an asset on a planned schedule to reduce the chance of unexpected breakdowns, rather than waiting for something to go wrong.",
          },
          {
            itemType: "content_card",
            title: "Repair Records",
            subtitle: "Repair log",
            description:
              "Keeping a record of every repair - what was fixed, when, and by whom - helps businesses understand an asset's reliability over time.",
          },
          {
            itemType: "content_card",
            title: "Service History",
            subtitle: "Complete log",
            description:
              "An asset's service history is the complete log of maintenance and repair activity carried out on it, useful for planning replacements and evaluating performance.",
          },
          {
            itemType: "content_card",
            title: "Warranty Management",
            subtitle: "Coverage",
            description:
              "Warranty management involves recording warranty start and end dates so repairs can be claimed under coverage before it expires.",
          },
          {
            itemType: "content_card",
            title: "Maintenance Scheduling",
            subtitle: "Planning",
            description:
              "Maintenance scheduling means planning service dates in advance so upkeep happens consistently rather than being missed or forgotten.",
          },
          {
            itemType: "content_card",
            title: "Why Maintenance Records Matter",
            subtitle: "Better decisions",
            description:
              "Accurate maintenance records help businesses extend asset lifespan, budget for repairs, and make informed decisions about when to repair versus replace equipment.",
          },
        ],
      }),
      createContentSplitSection({
        sectionKey: "asset-reporting-guide",
        internalName: "Asset Reporting Guide",
        heading: "Asset Reporting Guide",
        subheading: "Reports",
        description:
          "Asset reports turn raw records into information leadership can act on - helping businesses plan budgets, spot underused equipment, and prepare for audits.",
        buttonText: "Open Asset Reports",
        buttonLink: ROUTES.bulkEmailAssetReports,
        items: [
          {
            itemType: "content_card",
            title: "Why asset reports matter",
            subtitle: "Decision support",
            description:
              "Asset reports help businesses plan budgets, spot underused equipment, and prepare for audits with clearer data.",
          },
          {
            itemType: "content_card",
            title: "Asset Inventory Reports",
            subtitle: "Inventory",
            description: "Show a complete list of assets owned, including category and status.",
          },
          {
            itemType: "content_card",
            title: "Department Reports",
            subtitle: "Departments",
            description:
              "Break down asset ownership by department, useful for internal cost allocation.",
          },
          {
            itemType: "content_card",
            title: "Branch Reports",
            subtitle: "Branches",
            description: "Show how assets are distributed across different business locations.",
          },
          {
            itemType: "content_card",
            title: "Maintenance Reports",
            subtitle: "Service activity",
            description: "Summarise servicing and repair activity across all assets.",
          },
          {
            itemType: "content_card",
            title: "Warranty Reports",
            subtitle: "Coverage",
            description: "Highlight which assets have active, expiring, or expired warranties.",
          },
          {
            itemType: "content_card",
            title: "Asset Status Reports",
            subtitle: "Current status",
            description:
              "Show the current condition or usage status of each asset, such as in use, idle, under repair, or retired.",
          },
          {
            itemType: "content_card",
            title: "How reporting supports decision-making",
            subtitle: "Planning",
            description:
              "With clear, current reports, businesses can decide when to replace ageing equipment, where to reduce unnecessary purchases, and how to allocate budgets more effectively.",
          },
        ],
      }),
      createIconCardsSection({
        sectionKey: "asset-management-best-practices",
        internalName: "Asset Management Best Practices",
        heading: "Asset Management Best Practices",
        subheading: "Best Practices",
        description:
          "Use these practices to keep asset records reliable, searchable, and useful for everyday business decisions.",
        items: [
          {
            itemType: "best_practice",
            title: "Maintain a Centralised Asset Register",
            description:
              "Keep all asset information in one place so it stays consistent and easy to find.",
            icon: "Package",
          },
          {
            itemType: "best_practice",
            title: "Use Consistent Asset Categories",
            description:
              "Group similar assets together to make searching, reporting, and audits easier.",
            icon: "Layers3",
          },
          {
            itemType: "best_practice",
            title: "Assign Assets Clearly",
            description: "Record exactly who or which department is responsible for each asset.",
            icon: "Users",
          },
          {
            itemType: "best_practice",
            title: "Use Asset Identification Labels",
            description: "Attach tags or QR codes so assets can be quickly recognised.",
            icon: "QrCode",
          },
          {
            itemType: "best_practice",
            title: "Keep Asset Records Updated",
            description:
              "Update records whenever an asset's status, location, or condition changes.",
            icon: "RotateCcw",
          },
          {
            itemType: "best_practice",
            title: "Track Transfers",
            description: "Log every time an asset moves between people, departments, or branches.",
            icon: "Truck",
          },
          {
            itemType: "best_practice",
            title: "Record Maintenance",
            description: "Document every service and repair to build a reliable history.",
            icon: "Wrench",
          },
          {
            itemType: "best_practice",
            title: "Monitor Warranties",
            description: "Track warranty periods so coverage is not missed.",
            icon: "ShieldCheck",
          },
          {
            itemType: "best_practice",
            title: "Conduct Regular Audits",
            description: "Periodically verify that physical assets match your records.",
            icon: "ClipboardCheck",
          },
          {
            itemType: "best_practice",
            title: "Review Asset Reports",
            description: "Use reports regularly to guide budgeting and replacement decisions.",
            icon: "BarChart3",
          },
          {
            itemType: "best_practice",
            title: "Document Asset History",
            description:
              "Maintain a full timeline of each asset's assignments, transfers, and servicing.",
            icon: "FileText",
          },
        ],
      }),
      createComparisonTableSection({
        sectionKey: "manual-vs-digital-asset-management",
        internalName: "Manual vs Digital Asset Management",
        heading: "Manual vs Digital Asset Management",
        subheading: "Comparison",
        description:
          "Both approaches aim to help businesses keep track of what they own. Many small businesses start with spreadsheets and grow into digital systems as their asset base expands.",
        settings: {
          headers: ["Manual Spreadsheet", "Digital Asset Management Platform"],
        },
        items: [
          {
            itemType: "comparison_row",
            title: "Asset records kept in individual files",
            description: "Centralised, shared asset records",
          },
          {
            itemType: "comparison_row",
            title: "Tracking updated manually, often inconsistently",
            description: "Tracking updated as part of the regular workflow",
          },
          {
            itemType: "comparison_row",
            title: "Assignments noted informally",
            description: "Assignments recorded systematically against each asset",
          },
          {
            itemType: "comparison_row",
            title: "Maintenance reminders set manually or missed",
            description: "Maintenance details recorded and organised in one place",
          },
          {
            itemType: "comparison_row",
            title: "No built-in QR code support",
            description: "QR codes can be generated and linked to asset records",
          },
          {
            itemType: "comparison_row",
            title: "Reports built manually by compiling data",
            description: "Reports generated directly from existing asset data",
          },
          {
            itemType: "comparison_row",
            title: "Search limited to spreadsheet filters",
            description: "Structured search and filters across the full asset database",
          },
          {
            itemType: "comparison_row",
            title: "Audit preparation is time-consuming",
            description: "Audit preparation is faster with organised, current records",
          },
          {
            itemType: "comparison_row",
            title: "Harder to scale as asset count grows",
            description: "Designed to scale with growing asset volumes",
          },
          {
            itemType: "comparison_row",
            title: "Data organisation depends on the individual maintaining it",
            description: "Data organisation is structured and consistent by design",
          },
        ],
      }),
      createIconCardsSection({
        sectionKey: "who-needs-asset-management",
        internalName: "Who Needs Asset Management",
        heading: "Who Needs Asset Management?",
        subheading: "Industries",
        description:
          "Asset management is useful for any organisation that owns, issues, moves, services, or audits physical assets.",
        items: [
          {
            itemType: "industry_card",
            title: "Manufacturing",
            subtitle: "Machinery and tools",
            description: "Common assets: Machinery, production tools, safety equipment.",
            icon: "Factory",
            extraData: {
              features: [
                "Main challenge: Keeping heavy equipment running without unplanned downtime.",
                "How asset management helps: Maintenance tracking and reporting help plan servicing before failures occur.",
              ],
            },
          },
          {
            itemType: "industry_card",
            title: "IT Companies",
            subtitle: "Devices and servers",
            description: "Common assets: Laptops, servers, networking equipment.",
            icon: "Laptop",
            extraData: {
              features: [
                "Main challenge: Knowing which employee has which device at any time.",
                "How asset management helps: Asset assignment and tracking keep hardware accountable across teams.",
              ],
            },
          },
          {
            itemType: "industry_card",
            title: "Healthcare",
            subtitle: "Medical equipment",
            description: "Common assets: Medical equipment, diagnostic devices, facility assets.",
            icon: "HeartPulse",
            extraData: {
              features: [
                "Main challenge: Ensuring equipment is available, working, and accounted for.",
                "How asset management helps: Centralised records and maintenance history support reliable equipment upkeep.",
              ],
            },
          },
          {
            itemType: "industry_card",
            title: "Education",
            subtitle: "Campuses and labs",
            description: "Common assets: Computers, lab equipment, furniture.",
            icon: "GraduationCap",
            extraData: {
              features: [
                "Main challenge: Managing assets across classrooms, labs, and campuses.",
                "How asset management helps: Categorisation and location tracking simplify oversight across departments.",
              ],
            },
          },
          {
            itemType: "industry_card",
            title: "Retail",
            subtitle: "Stores and POS",
            description: "Common assets: POS systems, display equipment, store fixtures.",
            icon: "ShoppingBag",
            extraData: {
              features: [
                "Main challenge: Tracking assets across multiple store locations.",
                "How asset management helps: Branch-level tracking gives visibility into assets at every outlet.",
              ],
            },
          },
          {
            itemType: "industry_card",
            title: "Warehousing",
            subtitle: "Shared equipment",
            description: "Common assets: Material handling equipment, racking, tools.",
            icon: "Truck",
            extraData: {
              features: [
                "Main challenge: Keeping track of shared equipment used by multiple staff.",
                "How asset management helps: Assignment and usage tracking clarify accountability on the floor.",
              ],
            },
          },
          {
            itemType: "industry_card",
            title: "Construction",
            subtitle: "Sites and machinery",
            description: "Common assets: Tools, heavy machinery, site equipment.",
            icon: "Wrench",
            extraData: {
              features: [
                "Main challenge: Assets frequently move between sites and teams.",
                "How asset management helps: Transfer tracking keeps records accurate as equipment relocates.",
              ],
            },
          },
          {
            itemType: "industry_card",
            title: "Corporate Offices",
            subtitle: "Employee-issued assets",
            description: "Common assets: Laptops, furniture, office equipment.",
            icon: "BriefcaseBusiness",
            extraData: {
              features: [
                "Main challenge: Managing assets issued to a growing employee base.",
                "How asset management helps: A central register simplifies onboarding, offboarding, and audits.",
              ],
            },
          },
          {
            itemType: "industry_card",
            title: "Hospitality",
            subtitle: "Properties and outlets",
            description: "Common assets: Kitchen equipment, furniture, guest-facing devices.",
            icon: "MapPin",
            extraData: {
              features: [
                "Main challenge: Coordinating assets across multiple properties or outlets.",
                "How asset management helps: Branch reporting supports consistent management across locations.",
              ],
            },
          },
          {
            itemType: "industry_card",
            title: "Government Organisations",
            subtitle: "Public accountability",
            description: "Common assets: Office equipment, vehicles, public infrastructure assets.",
            icon: "ShieldCheck",
            extraData: {
              features: [
                "Main challenge: Maintaining transparent, auditable records of public assets.",
                "How asset management helps: Structured records and reports support compliance and accountability.",
              ],
            },
          },
        ],
      }),
      createIconCardsSection({
        sectionKey: "choose-asset-management-software",
        internalName: "How to Choose Asset Management Software",
        heading: "How to Choose Asset Management Software",
        subheading: "Buyer Guide",
        description:
          "When evaluating asset management software, assess these factors against your business's actual needs.",
        buttonText: "Explore Altroz Asset Management",
        buttonLink: ROUTES.assetManagementHome,
        settings: {
          secondaryButtonText: "Compare Pricing",
          secondaryButtonLink: ROUTES.assetManagementPricing,
        },
        items: [
          {
            itemType: "selection_factor",
            title: "Asset Registration",
            description: "Determines how easily new assets can be added and documented.",
            icon: "Package",
          },
          {
            itemType: "selection_factor",
            title: "Asset Tracking",
            description: "Affects how well you can monitor location, status, and movement.",
            icon: "MapPin",
          },
          {
            itemType: "selection_factor",
            title: "QR Code Support",
            description: "Makes identification and lookup faster in daily operations.",
            icon: "QrCode",
          },
          {
            itemType: "selection_factor",
            title: "Asset Assignment",
            description: "Ensures clear accountability for every asset.",
            icon: "Users",
          },
          {
            itemType: "selection_factor",
            title: "Maintenance",
            description: "Supports scheduling and recording of service activity.",
            icon: "Wrench",
          },
          {
            itemType: "selection_factor",
            title: "Warranty Tracking",
            description: "Helps avoid missed warranty claims.",
            icon: "ShieldCheck",
          },
          {
            itemType: "selection_factor",
            title: "Reports",
            description: "Determines how easily you can turn data into decisions.",
            icon: "BarChart3",
          },
          {
            itemType: "selection_factor",
            title: "Dashboard",
            description: "Affects how quickly your team can see the overall asset picture.",
            icon: "LayoutDashboard",
          },
          {
            itemType: "selection_factor",
            title: "Search and Filters",
            description: "Impacts how easy it is to find specific assets.",
            icon: "Target",
          },
          {
            itemType: "selection_factor",
            title: "Multi-Branch Support",
            description: "Important if your business operates across multiple locations.",
            icon: "MapPin",
          },
          {
            itemType: "selection_factor",
            title: "User Access",
            description: "Controls who can view or edit asset records.",
            icon: "ShieldCheck",
          },
          {
            itemType: "selection_factor",
            title: "Ease of Use",
            description: "Affects how quickly your team can adopt the system.",
            icon: "Sparkles",
          },
          {
            itemType: "selection_factor",
            title: "Scalability",
            description: "Determines whether the platform can grow with your asset base.",
            icon: "TrendingUp",
          },
          {
            itemType: "selection_factor",
            title: "Support",
            description: "Affects how quickly issues are resolved when they arise.",
            icon: "MailCheck",
          },
          {
            itemType: "selection_factor",
            title: "Pricing",
            description:
              "Should align with the value the platform delivers for your business size.",
            icon: "Wallet",
          },
        ],
      }),
      createChecklistSection({
        sectionKey: "asset-management-checklist",
        internalName: "Asset Management Checklist",
        heading: "Asset Management Checklist for Businesses",
        subheading: "Checklist",
        description:
          "Use this checklist as a quick reference when setting up or reviewing your asset management process.",
        items: [
          { itemType: "checklist_item", title: "Maintain asset register" },
          { itemType: "checklist_item", title: "Categorise assets" },
          { itemType: "checklist_item", title: "Assign unique identification" },
          { itemType: "checklist_item", title: "Record purchase information" },
          { itemType: "checklist_item", title: "Record vendor information" },
          { itemType: "checklist_item", title: "Assign assets" },
          { itemType: "checklist_item", title: "Track transfers" },
          { itemType: "checklist_item", title: "Maintain service history" },
          { itemType: "checklist_item", title: "Monitor warranties" },
          { itemType: "checklist_item", title: "Conduct regular audits" },
          { itemType: "checklist_item", title: "Review asset reports" },
          { itemType: "checklist_item", title: "Update asset status" },
        ],
      }),
      createFaqSection({
        sectionKey: "asset-management-guide-faq",
        internalName: "Popular Questions",
        heading: "Popular Questions",
        subheading: "FAQs",
        description:
          "Answers below are written to be clear and useful for both readers and AI-powered search summaries.",
        buttonText: "Book a Demo",
        buttonLink: ROUTES.bookDemo,
        settings: {
          secondaryHeading: "Need help applying this guide to your assets?",
          secondaryDescription:
            "A guided walkthrough can connect these concepts to your real asset register, branches, maintenance process and reports.",
          secondaryButtonText: "Explore Asset Management",
          secondaryButtonLink: ROUTES.assetManagementHome,
        },
        items: [
          {
            itemType: "faq",
            title: "What is asset management?",
            description:
              "Asset management is the process of organising, tracking, maintaining, and reviewing the physical assets a business owns, from purchase through to retirement.",
          },
          {
            itemType: "faq",
            title: "Why is asset management important?",
            description:
              "It helps businesses avoid lost equipment, missed maintenance, duplicate purchases, and difficult audits by keeping accurate, centralised records.",
          },
          {
            itemType: "faq",
            title: "What is asset tracking?",
            description:
              "Asset tracking is the process of recording where an asset is, who is using it, and how its status changes over time.",
          },
          {
            itemType: "faq",
            title: "What is asset lifecycle management?",
            description:
              "Asset lifecycle management is the practice of managing an asset through every stage of its life - procurement, use, maintenance, and eventual retirement.",
          },
          {
            itemType: "faq",
            title: "What is an asset register?",
            description:
              "An asset register is a central record that lists all the assets a business owns, along with details like category, assignment, and status.",
          },
          {
            itemType: "faq",
            title: "How do companies track assets?",
            description:
              "Companies track assets by recording details in a register, assigning ownership, monitoring status and location, and reviewing this information regularly through reports.",
          },
          {
            itemType: "faq",
            title: "What is QR Code asset management?",
            description:
              "QR Code asset management is the practice of attaching a unique QR code to each asset so it can be identified and looked up quickly by scanning.",
          },
          {
            itemType: "faq",
            title: "What is asset maintenance?",
            description:
              "Asset maintenance is the ongoing process of servicing and repairing assets to keep them in good working condition.",
          },
          {
            itemType: "faq",
            title: "What is an asset audit?",
            description:
              "An asset audit is the process of physically verifying that assets match what is recorded in the asset register.",
          },
          {
            itemType: "faq",
            title: "What is asset management software?",
            description:
              "Asset management software is a digital platform that helps businesses register, track, maintain, and report on their assets in one centralised system.",
          },
          {
            itemType: "faq",
            title: "How does asset management software work?",
            description:
              "It works by centralising asset records and making it easier to assign, track, maintain, and report on assets compared to manual methods like spreadsheets.",
          },
          {
            itemType: "faq",
            title: "What assets can businesses track?",
            description:
              "Businesses commonly track laptops, machinery, vehicles, tools, medical equipment, furniture, and other physical items used in operations.",
          },
          {
            itemType: "faq",
            title: "How often should assets be audited?",
            description:
              "This depends on the business, but many organisations conduct audits periodically - such as quarterly or annually - to keep records accurate.",
          },
          {
            itemType: "faq",
            title: "How can businesses reduce asset loss?",
            description:
              "Assigning clear ownership, labelling assets for identification, and reviewing records regularly all help reduce the risk of lost assets.",
          },
          {
            itemType: "faq",
            title: "How do QR Codes help track assets?",
            description:
              "QR Codes let staff scan an asset to instantly view its record, which speeds up identification during daily use, maintenance, and audits.",
          },
          {
            itemType: "faq",
            title: "What is the difference between asset tracking and inventory management?",
            description:
              "Asset tracking focuses on monitoring individual assets over time, such as location, assignment and condition, while inventory management typically focuses on stock levels and quantities of items.",
          },
          {
            itemType: "faq",
            title: "What should an asset register contain?",
            description:
              "A good asset register typically includes asset name, category, purchase details, assigned owner, location, status, and maintenance history.",
          },
          {
            itemType: "faq",
            title: "How can businesses manage assets across multiple branches?",
            description:
              "By organising asset records with branch or location tags, businesses can see how assets are distributed and track movement between sites.",
          },
          {
            itemType: "faq",
            title: "What are the benefits of digital asset management?",
            description:
              "Digital asset management centralises records, speeds up tracking and reporting, and makes audits and maintenance easier to manage as a business grows.",
          },
          {
            itemType: "faq",
            title: "How should businesses choose asset management software?",
            description:
              "Businesses should evaluate features like tracking, QR code support, maintenance, reporting, ease of use, scalability, and pricing against their specific needs.",
          },
          {
            itemType: "faq",
            title: "What is asset categorisation?",
            description:
              "Asset categorisation is the process of grouping similar assets together, such as IT equipment or furniture, to make records easier to organise and search.",
          },
          {
            itemType: "faq",
            title: "What is asset assignment?",
            description:
              "Asset assignment is the process of recording which person, department, or location is responsible for a specific asset.",
          },
          {
            itemType: "faq",
            title: "What is a warranty tracking record?",
            description:
              "A warranty tracking record notes the start and end dates of an asset's warranty so repairs can be claimed before coverage expires.",
          },
          {
            itemType: "faq",
            title: "What happens during asset retirement?",
            description:
              "During retirement, an asset is formally removed from active use and records, often after it is no longer functional or cost-effective to maintain.",
          },
          {
            itemType: "faq",
            title: "Can small businesses benefit from asset management?",
            description:
              "Yes. Even small businesses with a modest number of assets benefit from having a clear, organised record to prevent loss and support planning as they grow.",
          },
        ],
      }),
      createIconCardsSection({
        sectionKey: "asset-guide-related-resources",
        internalName: "Related Resources",
        heading: "Related Resources",
        subheading: "Next Steps",
        description:
          "Continue from the guide into the product pages and practical workflows most relevant to asset operations.",
        items: [
          {
            itemType: "related_resource",
            title: "Altroz Asset Management",
            description:
              "Explore the main product page for asset registers, tracking, QR workflows, maintenance and reporting.",
            icon: "Package",
            buttonText: "Open Product Page",
            buttonLink: ROUTES.assetManagementHome,
          },
          {
            itemType: "related_resource",
            title: "Asset Tracking",
            description:
              "See tracking and ownership workflows for assets across teams and locations.",
            icon: "MapPin",
            buttonText: "Open Tracking",
            buttonLink: ROUTES.bulkEmailAssetTracking,
          },
          {
            itemType: "related_resource",
            title: "QR Code Assets",
            description: "Learn how QR labels help identify, verify and update assets faster.",
            icon: "QrCode",
            buttonText: "Open QR Page",
            buttonLink: ROUTES.bulkEmailAssetQrCode,
          },
          {
            itemType: "related_resource",
            title: "Asset Maintenance",
            description:
              "Review service, repair and warranty workflows for better equipment upkeep.",
            icon: "Wrench",
            buttonText: "Open Maintenance",
            buttonLink: ROUTES.bulkEmailAssetMaintenance,
          },
          {
            itemType: "related_resource",
            title: "Asset Reports",
            description:
              "Explore reporting workflows for audits, planning, warranties and status visibility.",
            icon: "BarChart3",
            buttonText: "Open Reports",
            buttonLink: ROUTES.bulkEmailAssetReports,
          },
          {
            itemType: "related_resource",
            title: "Asset Pricing",
            description:
              "Compare plan coverage and understand the commercial fit for your business.",
            icon: "Wallet",
            buttonText: "Compare Pricing",
            buttonLink: ROUTES.assetManagementPricing,
          },
        ],
      }),
      createCtaSection({
        sectionKey: "altroz-asset-management-cta",
        internalName: "Altroz Asset Management CTA",
        heading: "Ready to Move from Manual Asset Management to a Digital Platform?",
        description:
          "If your business currently manages assets through spreadsheets or paper records, Altroz Asset Management can help you bring everything into one place - centralising asset records, tracking, QR code identification, maintenance, and reporting, so your team always has an accurate, up-to-date view of what you own.",
        buttonText: "Book a Demo",
        buttonLink: ROUTES.bookDemo,
        settings: {
          secondaryButtonText: "Explore Asset Management",
          secondaryButtonLink: ROUTES.assetManagementHome,
        },
      }),
      createCtaSection({
        sectionKey: "asset-guide-final-cta",
        internalName: "Final CTA",
        heading: "Build a Smarter Asset Management Process",
        description:
          "Learn how modern asset management can help your organisation improve visibility, accountability, maintenance, and reporting.",
        buttonText: "Explore Altroz Asset Management",
        buttonLink: ROUTES.assetManagementHome,
        settings: {
          secondaryButtonText: "Book Free Demo",
          secondaryButtonLink: ROUTES.bookDemo,
        },
      }),
    ],
  }),
  createManagedCmsPage({
    pageKey: "asset-management-resource-blog",
    pageName: "Asset Management Blog",
    route: ROUTES.assetManagementBlog,
    title: "Asset Management Blog for Tracking, Maintenance and Audits | Altroz",
    description:
      "Read practical asset-management articles covering registers, ownership, maintenance, branch visibility, QR workflows and audit readiness.",
    keywords: [
      "asset management blog",
      "asset tracking blog",
      "maintenance blog",
      "asset audits blog",
    ],
    heroEyebrow: "Asset Management Blog",
    heroTitle: "Practical Asset Articles for Tracking, Maintenance, Ownership and Audit Readiness",
    heroDescription:
      "A content hub for admin, HR, IT and operations teams managing business assets across locations and departments.",
    sections: [
      createHeroSection({
        heading:
          "Practical Asset Articles for Tracking, Maintenance, Ownership and Audit Readiness",
        subheading: "Asset Management Blog",
        description:
          "A content hub for admin, HR, IT and operations teams managing business assets across locations and departments.",
        buttonText: "Open Asset Management",
        buttonLink: ROUTES.assetManagementHome,
        settings: {
          badgeText: "Operational asset insights",
          secondaryButtonText: "Book Free Demo",
          secondaryButtonLink: ROUTES.bookDemo,
        },
      }),
      createIconCardsSection({
        sectionKey: "asset-blog-topics",
        internalName: "Asset Blog Topics",
        heading: "Featured asset-management topics for teams that want cleaner control",
        subheading: "Blog Topics",
        description:
          "Use these topic cards to surface the asset questions prospects usually research first.",
        items: [
          {
            itemType: "topic_card",
            title: "Asset Register Basics",
            subtitle: "One source of truth",
            description:
              "Explain why a searchable asset register matters more than scattered manual lists.",
            icon: "Package",
            buttonText: "Open Main Page",
            buttonLink: ROUTES.assetManagementHome,
          },
          {
            itemType: "topic_card",
            title: "Ownership Tracking",
            subtitle: "Employee and branch control",
            description:
              "Show how asset ownership, assignment and location visibility reduce confusion.",
            icon: "Users",
            buttonText: "Open Tracking",
            buttonLink: ROUTES.bulkEmailAssetTracking,
          },
          {
            itemType: "topic_card",
            title: "Maintenance Planning",
            subtitle: "Uptime and service",
            description:
              "Discuss service records, warranty tracking and maintenance reminders for better control.",
            icon: "Wrench",
            buttonText: "Open Maintenance",
            buttonLink: ROUTES.bulkEmailAssetMaintenance,
          },
          {
            itemType: "topic_card",
            title: "QR Code Workflows",
            subtitle: "Faster verification",
            description:
              "Cover how QR labels support quick verification, movement checks and record accuracy.",
            icon: "QrCode",
            buttonText: "Open QR Code Page",
            buttonLink: ROUTES.bulkEmailAssetQrCode,
          },
          {
            itemType: "topic_card",
            title: "Audit Readiness",
            subtitle: "Review and reporting",
            description:
              "Explain how reports and movement history help teams prepare for reviews more confidently.",
            icon: "BarChart3",
            buttonText: "Open Reports",
            buttonLink: ROUTES.bulkEmailAssetReports,
          },
          {
            itemType: "topic_card",
            title: "Branch Visibility",
            subtitle: "Multi-location control",
            description:
              "Discuss how centralized records help branches avoid duplicate buying and lost visibility.",
            icon: "MapPin",
            buttonText: "Open Dashboard",
            buttonLink: ROUTES.bulkEmailAssetDashboard,
          },
        ],
      }),
      createCtaSection({
        heading: "Want to move from asset articles to a live product walkthrough?",
        description: "See how the asset-management workflows look in the actual system.",
        settings: {
          secondaryButtonText: "Open Asset Management",
          secondaryButtonLink: ROUTES.assetManagementHome,
        },
      }),
    ],
  }),
  createManagedCmsPage({
    pageKey: "asset-management-resource-faq",
    pageName: "Asset Management FAQs",
    route: ROUTES.assetManagementFaq,
    title: "Asset Management Software FAQs | Altroz Technologies",
    description:
      "Find answers to common questions on asset management, asset tracking, QR code asset management, maintenance, reports and Altroz Asset Management. Explore FAQs before booking a demo.",
    keywords: [
      "asset management faqs",
      "asset management software faqs",
      "asset tracking faqs",
      "qr code asset management faqs",
      "asset maintenance faqs",
      "asset reports faqs",
      "altroz asset management",
    ],
    ogTitle: "Asset Management Software FAQs - Altroz Asset Management",
    ogDescription:
      "Everything businesses ask about asset management, tracking, QR codes, maintenance and reporting - answered in one place by Altroz Technologies.",
    heroEyebrow: "Asset Management FAQs",
    heroTitle: "Asset Management Software FAQs",
    heroDescription:
      "Answers to the questions businesses ask most about asset management, asset tracking, QR code asset management, maintenance, reports and Altroz Asset Management - in one place, so you can evaluate the platform before booking a demo.",
    sections: [
      createHeroSection({
        heading: "Asset Management Software FAQs",
        subheading: "Asset Management FAQs",
        description:
          "Answers to the questions businesses ask most about asset management, asset tracking, QR code asset management, maintenance, reports and Altroz Asset Management - in one place, so you can evaluate the platform before booking a demo.",
        buttonText: "Book a Demo",
        buttonLink: ROUTES.bookDemo,
        settings: {
          badgeText: "Asset Management FAQs",
          placeholderText: "Search your question...",
          popularSearches: ["Asset tracking", "QR Codes", "Maintenance", "Reports", "Pricing"],
          secondaryButtonText: "Explore Asset Management",
          secondaryButtonLink: ROUTES.assetManagementHome,
        },
      }),
      ...createAssetManagementFaqSections(),
      {
        sectionKey: "faq-quick-links",
        sectionType: "quick_links",
        internalName: "Still Have Questions CTA",
        heading: "Still Have Questions About Asset Management?",
        subheading: "Need more help?",
        description:
          "If you couldn't find what you were looking for, the Altroz Technologies team is happy to help. Reach out for product information, or book a personalized demonstration to see how Altroz Asset Management fits your business.",
        buttonText: "Book a Demo",
        buttonLink: ROUTES.bookDemo,
        items: [
          {
            itemType: "quick_link",
            title: "Contact Us",
            buttonLink: ROUTES.assetManagementContact,
          },
          { itemType: "quick_link", title: "Explore Help Center", buttonLink: ROUTES.support },
          {
            itemType: "quick_link",
            title: "Explore Asset Management",
            buttonLink: ROUTES.assetManagementHome,
          },
        ],
      },
      createCtaSection({
        sectionKey: "faq-final-cta",
        internalName: "Final FAQ CTA",
        heading: "Ready to Simplify Your Asset Management?",
        description:
          "See how Altroz Asset Management can help your business centralize, track, and maintain its assets from one platform, through a personalized product demonstration.",
        buttonText: "Book a Demo",
        buttonLink: ROUTES.bookDemo,
        settings: {
          secondaryButtonText: "Contact Us",
          secondaryButtonLink: ROUTES.assetManagementContact,
        },
      }),
    ],
  }),
  createManagedCmsPage({
    pageKey: "asset-management-pricing",
    pageName: "Asset Management Pricing",
    route: ROUTES.assetManagementPricing,
    title: "Altroz Asset Management Pricing - Plans for Up to 2,000 Assets",
    description:
      "Explore Altroz Asset Management pricing plans for businesses managing up to 2,000 assets. Compare annual plans and book a demo.",
    keywords: [
      "asset management software pricing",
      "asset management pricing",
      "asset tracking pricing",
      "qr code asset management pricing",
      "asset maintenance pricing",
      "asset management plans",
    ],
    ogTitle: "Asset Management Software Pricing | Altroz",
    ogDescription:
      "Explore Altroz Asset Management annual plans by asset capacity, compare pricing, and book a demo.",
    heroEyebrow: "Simple, Transparent Asset Management Pricing",
    heroTitle: "Choose the Right Asset Management Plan for Your Business",
    heroDescription:
      "Altroz Asset Management offers plans based on the number of assets your organization needs to manage. Whether you are tracking a small office inventory or a large, multi-location asset base, there is a plan built around your asset capacity. All plans are billed annually.",
    sections: [
      createHeroSection({
        heading: "Choose the Right Asset Management Plan for Your Business",
        subheading: "Simple, Transparent Asset Management Pricing",
        description:
          "Altroz Asset Management offers plans based on the number of assets your organization needs to manage. Whether you are tracking a small office inventory or a large, multi-location asset base, there is a plan built around your asset capacity. All plans are billed annually.",
        buttonText: "Book a Free Demo",
        buttonLink: ROUTES.bookDemo,
        settings: {
          badgeText: "Asset Management Pricing",
          heroBullets: [
            "Choose a plan based on the number of assets you need to manage.",
            "Our team can help you select the right option based on your organization and workflow.",
            "Taxes and setup charges are extra.",
          ],
          secondaryButtonText: "Talk to Sales",
          secondaryButtonLink: ROUTES.assetManagementContact,
          secondaryHeading: "Annual plans by asset capacity",
          secondaryDescription:
            "Compare Starter, Growth, Business and Enterprise plans for up to 2,000 assets.",
        },
        items: [
          {
            itemType: "pricing_highlight",
            title: "Starter",
            subtitle: "Up to 200 Assets",
            description: "₹9,999 / year",
            icon: "Package",
          },
          {
            itemType: "pricing_highlight",
            title: "Growth",
            subtitle: "Up to 500 Assets",
            description: "₹24,999 / year",
            icon: "TrendingUp",
          },
          {
            itemType: "pricing_highlight",
            title: "Business",
            subtitle: "Up to 1,000 Assets",
            description: "₹39,999 / year",
            icon: "BriefcaseBusiness",
          },
          {
            itemType: "pricing_highlight",
            title: "Enterprise",
            subtitle: "Up to 2,000 Assets",
            description: "₹59,999 / year",
            icon: "Crown",
          },
        ],
      }),
      createIconCardsSection({
        sectionKey: "asset-pricing-cards",
        internalName: "Pricing Cards",
        heading: "Four annual plans, differentiated by asset capacity",
        subheading: "Pricing Plans",
        description:
          "Choose the plan that matches the number of assets your organization needs to manage. Contact our sales team for complete pricing and implementation details.",
        items: [
          {
            itemType: "plan_card",
            title: "Starter",
            subtitle: "₹9,999 / year",
            description: "Best for small businesses and teams starting digital asset management.",
            icon: "Package",
            buttonText: "Get Started",
            buttonLink: ROUTES.bookDemo,
            extraData: {
              features: [
                "Up to 200 Assets",
                "Billed annually",
                "Taxes and setup charges are extra",
              ],
            },
          },
          {
            itemType: "plan_card",
            title: "Growth",
            subtitle: "Popular - ₹24,999 / year",
            description: "Best for growing businesses managing a larger asset inventory.",
            icon: "TrendingUp",
            buttonText: "Choose Growth",
            buttonLink: ROUTES.bookDemo,
            extraData: {
              features: [
                "Up to 500 Assets",
                "Billed annually",
                "Taxes and setup charges are extra",
              ],
            },
          },
          {
            itemType: "plan_card",
            title: "Business",
            subtitle: "₹39,999 / year",
            description:
              "Best for organizations managing multiple departments, locations, or larger asset inventories.",
            icon: "BriefcaseBusiness",
            buttonText: "Choose Business",
            buttonLink: ROUTES.bookDemo,
            extraData: {
              features: [
                "Up to 1,000 Assets",
                "Billed annually",
                "Taxes and setup charges are extra",
              ],
            },
          },
          {
            itemType: "plan_card",
            title: "Enterprise",
            subtitle: "₹59,999 / year",
            description:
              "Best for larger organizations with extensive asset inventories and more complex operational requirements.",
            icon: "ShieldCheck",
            buttonText: "Contact Sales",
            buttonLink: ROUTES.assetManagementContact,
            extraData: {
              features: [
                "Up to 2,000 Assets",
                "Billed annually",
                "Taxes and setup charges are extra",
              ],
            },
          },
        ],
      }),
      createComparisonTableSection({
        sectionKey: "asset-pricing-plan-comparison",
        internalName: "Plan Comparison",
        heading: "Compare plans by verified pricing information",
        subheading: "Plan Comparison",
        description:
          "The table below compares only verified information. Feature availability by plan has not been officially confirmed at this time - please contact sales for exact implementation requirements.",
        settings: {
          headers: ["Feature / Plan", "Starter", "Growth", "Business", "Enterprise"],
        },
        items: [
          {
            itemType: "comparison_row",
            title: "Asset Capacity",
            extraData: { values: ["200", "500", "1,000", "2,000"] },
          },
          {
            itemType: "comparison_row",
            title: "Billing Cycle",
            extraData: { values: ["Annual", "Annual", "Annual", "Annual"] },
          },
          {
            itemType: "comparison_row",
            title: "Price",
            extraData: {
              values: ["₹9,999", "₹24,999", "₹39,999", "₹59,999"],
            },
          },
          {
            itemType: "comparison_row",
            title: "Feature Set",
            extraData: {
              values: ["Contact Sales", "Contact Sales", "Contact Sales", "Contact Sales"],
            },
          },
          {
            itemType: "comparison_row",
            title: "Implementation Support",
            extraData: {
              values: ["Contact Sales", "Contact Sales", "Contact Sales", "Contact Sales"],
            },
          },
        ],
      }),
      createIconCardsSection({
        sectionKey: "asset-pricing-plan-guide",
        internalName: "Which Plan Is Right for You",
        heading: "Which plan is right for you?",
        subheading: "Plan Selection",
        description:
          "Start by estimating how many assets you need to manage. If you are unsure about your asset count or implementation requirements, talk to our team.",
        buttonText: "Help Me Choose",
        buttonLink: ROUTES.bookDemo,
        items: [
          {
            itemType: "plan_guide_card",
            title: "Up to 200 assets",
            subtitle: "Starter",
            description: "For small businesses and teams starting digital asset management.",
            icon: "Package",
          },
          {
            itemType: "plan_guide_card",
            title: "Up to 500 assets",
            subtitle: "Growth",
            description: "For growing businesses managing a larger asset inventory.",
            icon: "TrendingUp",
          },
          {
            itemType: "plan_guide_card",
            title: "Up to 1,000 assets",
            subtitle: "Business",
            description: "For multiple departments, locations, or larger asset inventories.",
            icon: "BriefcaseBusiness",
          },
          {
            itemType: "plan_guide_card",
            title: "Up to 2,000 assets",
            subtitle: "Enterprise",
            description:
              "For extensive asset inventories and more complex operational requirements.",
            icon: "ShieldCheck",
          },
        ],
      }),
      createChecklistSection({
        sectionKey: "asset-pricing-asset-examples",
        internalName: "What Counts as an Asset",
        heading: "What counts as an asset?",
        subheading: "Asset Count",
        description:
          "An asset is any business-owned item that is registered and managed within the Altroz Asset Management system.",
        items: [
          "Laptop",
          "Desktop",
          "Mobile Phone",
          "Printer",
          "Scanner",
          "Biometric Device",
          "Networking Equipment",
          "Office Equipment",
          "Electrical Equipment",
          "Machinery",
          "Production Equipment",
          "Tools",
          "Other business-owned physical assets",
        ].map((title, index) => ({ itemType: "checklist_item", title, displayOrder: index })),
      }),
      createIconCardsSection({
        sectionKey: "asset-pricing-manage-features",
        internalName: "What You Can Manage",
        heading: "What you can manage with Altroz Asset Management",
        subheading: "Feature Ecosystem",
        description:
          "Altroz Asset Management supports a full ecosystem of asset-related workflows, from registration and assignment to maintenance, warranty, reports and dashboard analytics.",
        buttonText: "Explore Asset Management Features",
        buttonLink: ROUTES.assetManagementHome,
        items: [
          {
            title: "Asset Registration",
            description:
              "Add and register business assets within the system for centralized tracking.",
            icon: "FileText",
          },
          {
            title: "Asset Tracking",
            description: "Track the location and status of assets across your organization.",
            icon: "MapPin",
          },
          {
            title: "Asset Assignment",
            description: "Assign assets to employees, departments, or branches.",
            icon: "Users",
          },
          {
            title: "Employee Ownership",
            description: "Maintain a record of which employee is responsible for which asset.",
            icon: "Users",
          },
          {
            title: "Department Assignment",
            description: "Organize assets by department for easier accountability.",
            icon: "Building2",
          },
          {
            title: "Branch / Site Assignment",
            description: "Manage assets across multiple branches or sites from one system.",
            icon: "MapPin",
          },
          {
            title: "QR Code Generation",
            description: "Generate QR codes for individual assets for quick identification.",
            icon: "QrCode",
          },
          {
            title: "QR Code Printing",
            description: "Print QR code labels for physical tagging of assets.",
            icon: "Tag",
          },
          {
            title: "Asset Maintenance",
            description: "Record and track maintenance activities for registered assets.",
            icon: "Wrench",
          },
          {
            title: "Warranty Information",
            description: "Store warranty details associated with each asset.",
            icon: "ShieldCheck",
          },
          {
            title: "Purchase Information",
            description: "Maintain purchase records linked to each asset.",
            icon: "Coins",
          },
          {
            title: "Vendor Information",
            description: "Keep vendor details associated with asset procurement.",
            icon: "BriefcaseBusiness",
          },
          {
            title: "Asset History",
            description: "View a historical record of activity for each asset.",
            icon: "Workflow",
          },
          {
            title: "Asset Reports",
            description: "Generate reports on asset inventory and status.",
            icon: "BarChart3",
          },
          {
            title: "Dashboard & Analytics",
            description: "Get an overview of your asset inventory through a central dashboard.",
            icon: "LayoutDashboard",
          },
        ].map((item, index) => ({ itemType: "feature_card", displayOrder: index, ...item })),
      }),
      createComparisonTableSection({
        sectionKey: "asset-pricing-business-size",
        internalName: "Pricing by Business Size",
        heading: "Pricing by business size",
        subheading: "Business Size Guide",
        description:
          "Pricing is based on asset capacity, not employee count. The table below gives a general guide to typical asset requirements by organization size.",
        settings: {
          headers: [
            "Business Size",
            "Small Business",
            "Growing Business",
            "Mid-Size Organization",
            "Large Organization",
          ],
        },
        items: [
          {
            itemType: "comparison_row",
            title: "Typical requirement",
            extraData: {
              values: [
                "Up to 200 assets",
                "Up to 500 assets",
                "Up to 1,000 assets",
                "Up to 2,000 assets",
              ],
            },
          },
          {
            itemType: "comparison_row",
            title: "Recommended plan",
            extraData: { values: ["Starter", "Growth", "Business", "Enterprise"] },
          },
        ],
      }),
      createChecklistSection({
        sectionKey: "asset-pricing-inventory-benefits",
        internalName: "Pricing Designed Around Asset Inventory",
        heading: "Pricing designed around your asset inventory",
        subheading: "Asset-Based Pricing",
        description:
          "Every business manages a different number of assets. Plans are structured around asset capacity so businesses of different sizes can find a plan that fits their inventory.",
        items: [
          "Easier plan selection",
          "More predictable budgeting",
          "Suitable for different business sizes",
          "Scalable asset management",
          "Clear asset capacity",
        ].map((title, index) => ({ itemType: "checklist_item", title, displayOrder: index })),
      }),
      createChecklistSection({
        sectionKey: "asset-pricing-before-subscribe",
        internalName: "Before You Subscribe",
        heading: "Before you subscribe",
        subheading: "Important Notes",
        description: "Review these pricing notes before choosing an Altroz Asset Management plan.",
        items: [
          "Prices shown are annual prices.",
          "Taxes are extra.",
          "Setup charges are extra.",
          "Plan capacity is based on asset count.",
          "Exact implementation requirements should be confirmed with Altroz.",
          "Businesses can contact sales before purchasing.",
          "Need clarification? Talk to our team before choosing a plan.",
        ].map((title, index) => ({ itemType: "checklist_item", title, displayOrder: index })),
      }),
      createCtaSection({
        sectionKey: "asset-pricing-scale-cta",
        internalName: "Scale as Inventory Grows CTA",
        heading: "Start small. Scale as your asset inventory grows.",
        description:
          "Businesses may begin with a smaller asset inventory and later require a higher-capacity plan as operations grow. If your asset inventory grows beyond your current plan, contact the Altroz team to discuss the appropriate plan.",
        buttonText: "Talk to Sales",
        buttonLink: ROUTES.assetManagementContact,
      }),
      createCtaSection({
        sectionKey: "asset-pricing-help-cta",
        internalName: "Not Sure Which Plan CTA",
        heading: "Not sure which plan you need?",
        description:
          "Our team can understand your asset inventory and business requirements and help you identify the most suitable Altroz Asset Management plan.",
        buttonText: "Book a Free Demo",
        buttonLink: ROUTES.bookDemo,
        settings: {
          secondaryButtonText: "Talk to Sales",
          secondaryButtonLink: ROUTES.assetManagementContact,
        },
      }),
      createFaqSection({
        sectionKey: "asset-pricing-faq",
        internalName: "Pricing FAQ",
        heading: "Frequently asked questions",
        subheading: "Pricing FAQ",
        description:
          "Answers to common pricing questions about annual plans, asset capacity, taxes, setup charges and choosing the right plan.",
        buttonText: "Contact Sales",
        buttonLink: ROUTES.assetManagementContact,
        settings: {
          secondaryHeading: "Need help choosing a plan?",
          secondaryDescription:
            "Book a free demo or contact sales if you are unsure about asset count, implementation requirements or the right plan.",
          secondaryButtonText: "Book a Free Demo",
          secondaryButtonLink: ROUTES.bookDemo,
        },
        items: [
          {
            itemType: "faq",
            title: "How much does Altroz Asset Management cost?",
            description:
              "Altroz Asset Management is available on four annual plans based on asset capacity: Starter (₹9,999/year, up to 200 assets), Growth (₹24,999/year, up to 500 assets), Business (₹39,999/year, up to 1,000 assets), and Enterprise (₹59,999/year, up to 2,000 assets). Taxes and setup charges are extra.",
          },
          {
            itemType: "faq",
            title: "What is the Starter plan price?",
            description: "The Starter plan is priced at ₹9,999 per year.",
          },
          {
            itemType: "faq",
            title: "How many assets can I manage in the Starter plan?",
            description: "The Starter plan allows you to manage up to 200 assets.",
          },
          {
            itemType: "faq",
            title: "What is the Growth plan price?",
            description: "The Growth plan is priced at ₹24,999 per year.",
          },
          {
            itemType: "faq",
            title: "How many assets can I manage in the Growth plan?",
            description: "The Growth plan allows you to manage up to 500 assets.",
          },
          {
            itemType: "faq",
            title: "What is the Business plan price?",
            description: "The Business plan is priced at ₹39,999 per year.",
          },
          {
            itemType: "faq",
            title: "How many assets can I manage in the Business plan?",
            description: "The Business plan allows you to manage up to 1,000 assets.",
          },
          {
            itemType: "faq",
            title: "What is the Enterprise plan price?",
            description: "The Enterprise plan is priced at ₹59,999 per year.",
          },
          {
            itemType: "faq",
            title: "How many assets can I manage in the Enterprise plan?",
            description: "The Enterprise plan allows you to manage up to 2,000 assets.",
          },
          {
            itemType: "faq",
            title: "Are these monthly or annual prices?",
            description:
              "All listed prices are annual prices. Altroz Asset Management does not currently publish monthly pricing.",
          },
          {
            itemType: "faq",
            title: "Are taxes included in the price?",
            description: "No. Taxes are extra and are not included in the listed annual price.",
          },
          {
            itemType: "faq",
            title: "Are setup charges included?",
            description:
              "No. Setup charges are extra and are not included in the listed annual price.",
          },
          {
            itemType: "faq",
            title: "What happens if I have more than 2,000 assets?",
            description:
              "Please contact the Altroz team for the latest plan and implementation details.",
          },
          {
            itemType: "faq",
            title: "Which plan is suitable for a small business?",
            description:
              "Businesses managing up to 200 assets typically choose the Starter plan. Our team can help confirm the right fit for your organization.",
          },
          {
            itemType: "faq",
            title: "Which plan is suitable for a growing company?",
            description:
              "Businesses managing up to 500 assets typically choose the Growth plan. Our team can help confirm the right fit for your organization.",
          },
          {
            itemType: "faq",
            title: "Can I change my plan later?",
            description:
              "If your asset inventory grows beyond your current plan, contact the Altroz team to discuss the appropriate plan.",
          },
          {
            itemType: "faq",
            title: "How do I choose the right asset management plan?",
            description:
              "Start by estimating the number of assets your organization needs to manage, then match that number to the closest plan capacity. If you are unsure about your asset count or implementation requirements, talk to our team.",
          },
          {
            itemType: "faq",
            title: "What counts as an asset?",
            description:
              "An asset is any business-owned item - such as a laptop, printer, machinery, or equipment - that is registered and managed within the Altroz Asset Management system. Your exact asset counting and subscription requirements can be confirmed with our sales team.",
          },
          {
            itemType: "faq",
            title: "Can I book a demo before purchasing?",
            description:
              "Yes. You can book a free demo with the Altroz team before choosing a plan.",
          },
          {
            itemType: "faq",
            title: "How can I contact Altroz sales?",
            description:
              "You can contact Altroz sales directly through the Contact Sales button on this page or by booking a free demo.",
          },
        ],
      }),
      createCtaSection({
        sectionKey: "asset-pricing-final-cta",
        internalName: "Final Pricing CTA",
        heading: "Ready to take control of your business assets?",
        description:
          "Choose the plan that matches your asset inventory and discover how Altroz Asset Management can help you organize, track, maintain, and report on your business assets.",
        buttonText: "Book a Free Demo",
        buttonLink: ROUTES.bookDemo,
        settings: {
          secondaryButtonText: "Contact Sales",
          secondaryButtonLink: ROUTES.assetManagementContact,
        },
      }),
    ],
  }),
];

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
          trustItems: ["Free 7-day trial", "No credit card", "4.8 / 5 by Google Reviews"],
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
        sectionKey: "customer-logos",
        sectionType: "logo_strip",
        internalName: "Customer Logos",
        heading: "Trusted by teams we've partnered with",
        isRequired: true,
        items: [
          {
            itemType: "logo",
            title: "Ordinet Solutions Pvt. Ltd.",
            imageUrl: "/customer-logos/image1.png",
          },
          {
            itemType: "logo",
            title: "PANGEA HR Services Pvt. Ltd.",
            imageUrl: "/customer-logos/image2.png",
          },
          {
            itemType: "logo",
            title: "Ulka Projects",
            imageUrl: "/customer-logos/image3.png",
          },
          {
            itemType: "logo",
            title: "Globular Tech Services Pvt. Ltd.",
            imageUrl: "/customer-logos/image4.png",
          },
          {
            itemType: "logo",
            title: "Financial Services",
            imageUrl: "/customer-logos/image5.jpeg",
          },
          {
            itemType: "logo",
            title: "BSJ Jewellers",
            imageUrl: "/customer-logos/image6.png",
          },
          {
            itemType: "logo",
            title: "Anushka",
            imageUrl: "/customer-logos/image7.jpeg",
          },
          {
            itemType: "logo",
            title: "Rajneer Exim Production",
            imageUrl: "/customer-logos/image8.png",
          },
          {
            itemType: "logo",
            title: "Enterprise",
            imageUrl: "/customer-logos/image9.png",
          },
          {
            itemType: "logo",
            title: "Global Envirotech",
            imageUrl: "/customer-logos/image10.png",
          },
          {
            itemType: "logo",
            title: "Gasoline Fuel Systems India",
            imageUrl: "/customer-logos/image11.png",
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
            description: "From attendance to payroll, everything your HR team needs in one place.",
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
          {
            itemType: "feature",
            title: "Core HR",
            description: "Keep employee records, roles and org structure in one place.",
            icon: "Building2",
            buttonLink: ROUTES.coreHR,
          },
          {
            itemType: "feature",
            title: "Attendance",
            description:
              "Track shifts, check-ins and time logs accurately in one dedicated module.",
            icon: "Clock3",
            buttonLink: ROUTES.attendanceManagement,
          },
          {
            itemType: "feature",
            title: "Payroll",
            description: "Run salaries, deductions and approvals without manual work.",
            icon: "Wallet",
            buttonLink: ROUTES.payroll,
          },
          {
            itemType: "feature",
            title: "Leave Management",
            description: "Handle leave rules, balances and approvals with ease.",
            icon: "CalendarDays",
            buttonLink: ROUTES.leaveManagement,
          },
          {
            itemType: "feature",
            title: "Recruitment (ATS)",
            description: "Track candidates from sourcing to offer acceptance.",
            icon: "BriefcaseBusiness",
            buttonLink: ROUTES.recruitment,
          },
          {
            itemType: "feature",
            title: "Performance Management",
            description: "Plan reviews, goals and feedback in one workflow.",
            icon: "Users",
            buttonLink: ROUTES.performance,
          },
          {
            itemType: "feature",
            title: "Asset Management",
            description: "Assign, track and recover company assets confidently.",
            icon: "Package",
            buttonLink: `${ROUTES.assetManagement}#asset-management`,
          },
          {
            itemType: "feature",
            title: "Expense Management",
            description: "Submit, review and reimburse business expenses smoothly.",
            icon: "ReceiptText",
            buttonLink: ROUTES.expenseManagement,
          },
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
          {
            itemType: "stat_card",
            title: "Monthly hours saved",
            subtitle: "Live estimate",
            icon: "Clock3",
          },
          {
            itemType: "stat_card",
            title: "Annual savings",
            subtitle: "Net Year 1 view",
            icon: "TrendingUp",
          },
          {
            itemType: "stat_card",
            title: "Payback period",
            subtitle: "Months to recover",
            icon: "Calculator",
          },
          {
            itemType: "stat_card",
            title: "FTE recovered",
            subtitle: "Capacity equivalent",
            icon: "Users",
          },
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
          {
            itemType: "benefit",
            title: "Save HR time",
            description: "Automate repetitive tasks and free your team for what matters.",
            icon: "Timer",
          },
          {
            itemType: "benefit",
            title: "Reduce payroll errors",
            description: "Pre-built compliance rules eliminate manual mistakes.",
            icon: "ShieldCheck",
          },
          {
            itemType: "benefit",
            title: "Improve transparency",
            description: "Employees see attendance, leaves and payslips in real time.",
            icon: "Eye",
          },
          {
            itemType: "benefit",
            title: "Track field staff easily",
            description: "Live GPS check-ins keep your distributed team accountable.",
            icon: "MapPin",
          },
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
  ...managedSolutionPages,
  ...managedAdminPages,
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
          {
            itemType: "highlight",
            title: "Basic",
            subtitle: "₹21 / employee / month",
            description: "Entry pricing for core HR, attendance and leave.",
            icon: "BadgeCheck",
          },
          {
            itemType: "highlight",
            title: "Professional",
            subtitle: "₹36 / employee / month",
            description: "Expanded coverage for recruiting, payroll and compliance.",
            icon: "ShieldCheck",
          },
          {
            itemType: "highlight",
            title: "Premium",
            subtitle: "₹53 / employee / month",
            description: "Full-suite coverage for the broadest rollout.",
            icon: "Crown",
          },
          {
            itemType: "highlight",
            title: "Optional add-ons",
            subtitle: "Geo tracking, integrations and custom work",
            description: "Extra capabilities can be layered on as needed.",
            icon: "Coins",
          },
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
      ...createPricingFeatureComparisonSections(3),
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
          {
            itemType: "hero_path",
            title: "Product Enquiry",
            description: "Ask about product fit, pricing, or the right starting point.",
            icon: "messageSquare",
            buttonLink: "#contact-form",
          },
          {
            itemType: "hero_path",
            title: "Book a Demo",
            description: "Open the demo workflow for a guided product walkthrough.",
            icon: "calendarDays",
            buttonLink: ROUTES.bookDemo,
          },
          {
            itemType: "hero_path",
            title: "Support",
            description: "Use the support route for customer help and product questions.",
            icon: "headphones",
            buttonLink: ROUTES.support,
          },
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
          {
            itemType: "contact_card",
            title: "WhatsApp",
            description: "Start a chat with the verified WhatsApp channel.",
            icon: "messageSquare",
            buttonLink: "https://wa.me/918446337392",
          },
          {
            itemType: "contact_card",
            title: "Book a Demo",
            description: "Open the product demo workflow for a guided walkthrough.",
            icon: "calendarDays",
            buttonLink: ROUTES.bookDemo,
          },
          {
            itemType: "contact_card",
            title: "Support",
            description: "Use the support page for customer help and product guidance.",
            icon: "headphones",
            buttonLink: ROUTES.support,
          },
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
    pageKey: "bulk-email-contact-us",
    pageName: "Bulk Email Contact Us",
    slug: "bulk-email/contact-us",
    status: "published",
    meta: createMeta({
      title: "Contact Altroz Bulk Email | Book a Demo or Sales Consultation",
      description:
        "Contact Altroz Bulk Email for product demonstrations, campaign consultation, broadcast setup, scheduling, SMTP, and customer enquiries.",
      keywords: [
        "bulk email contact",
        "campaign consultation",
        "email platform enquiry",
        "book bulk email demo",
      ],
      canonicalUrl: ROUTES.bulkEmailContact,
      ogTitle: "Contact Altroz Bulk Email | Book a Demo or Sales Consultation",
      ogDescription:
        "Contact Altroz Bulk Email for product demonstrations, campaign consultation, broadcast setup, scheduling, SMTP, and customer enquiries.",
    }),
    sections: [
      {
        sectionKey: "contact-hero",
        sectionType: "hero",
        internalName: "Hero",
        heading: "Get in Touch with Altroz Bulk Email",
        subheading: "Contact Us",
        description:
          "We are here to help you simplify your email communication. Whether you are evaluating bulk email software, requesting a product demonstration, planning your campaign workflow, or looking for product support, the Altroz Technologies team can help you identify the right next step.",
        buttonText: "Send an Enquiry",
        buttonLink: "#contact-form",
        settings: {
          secondaryButtonText: "Book Free Demo",
          secondaryButtonLink: ROUTES.bookDemo,
          secondaryDescription:
            "Use the verified WhatsApp route or the enquiry form below. Our team will review your enquiry and contact you using the details provided.",
        },
        items: [
          {
            itemType: "hero_path",
            title: "Product Enquiry",
            description: "Ask about product fit, pricing, or the right starting point.",
            icon: "messageSquare",
            buttonLink: "#contact-form",
          },
          {
            itemType: "hero_path",
            title: "Book a Demo",
            description: "Open the demo workflow for a guided product walkthrough.",
            icon: "calendarDays",
            buttonLink: ROUTES.bookDemo,
          },
          {
            itemType: "hero_path",
            title: "Support",
            description: "Use the support route for customer help and product questions.",
            icon: "headphones",
            buttonLink: ROUTES.support,
          },
        ],
      },
      {
        sectionKey: "quick-contact",
        sectionType: "contact_information",
        internalName: "Quick Contact",
        heading: "Choose the best way to reach the Altroz Bulk Email team",
        subheading: "Quick Contact",
        description: "Use one of the verified paths below to reach the Altroz Bulk Email team.",
        items: [
          {
            itemType: "contact_card",
            title: "WhatsApp",
            description: "Start a chat with the verified WhatsApp channel.",
            icon: "messageSquare",
            buttonLink: "https://wa.me/918446337392",
          },
          {
            itemType: "contact_card",
            title: "Book a Demo",
            description: "Open the product demo workflow for a guided walkthrough.",
            icon: "calendarDays",
            buttonLink: ROUTES.bookDemo,
          },
          {
            itemType: "contact_card",
            title: "Support",
            description: "Use the support page for customer help and product guidance.",
            icon: "headphones",
            buttonLink: ROUTES.support,
          },
        ],
      },
      {
        sectionKey: "contact-form",
        sectionType: "custom",
        internalName: "Enquiry Form",
        heading: "Share your enquiry with the Altroz Bulk Email team",
        subheading: "Send a Message",
        description:
          "Fill in the details below and the form will prepare a WhatsApp enquiry draft using the verified channel.",
      },
      {
        sectionKey: "contact-cta",
        sectionType: "cta_banner",
        internalName: "Final CTA",
        heading: "Ready to Simplify Your Bulk Email Operations?",
        subheading: "Ready to Start",
        description:
          "Connect with Altroz Bulk Email to explore broadcasting, templates, analytics, scheduling, SMTP configuration, and campaign support from one centralized platform.",
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
    pageKey: "asset-management-contact-us",
    pageName: "Asset Management Contact Us",
    slug: "asset-management/contact-us",
    status: "published",
    meta: createMeta({
      title: "Contact Altroz Asset Management | Book a Demo or Sales Consultation",
      description:
        "Contact Altroz Asset Management for product demonstrations, asset tracking consultation, QR workflows, maintenance planning, reporting, and customer enquiries.",
      keywords: [
        "asset management contact",
        "asset tracking consultation",
        "qr workflow enquiry",
        "asset demo",
      ],
      canonicalUrl: ROUTES.assetManagementContact,
      ogTitle: "Contact Altroz Asset Management | Book a Demo or Sales Consultation",
      ogDescription:
        "Contact Altroz Asset Management for product demonstrations, asset tracking consultation, QR workflows, maintenance planning, reporting, and customer enquiries.",
    }),
    sections: [
      {
        sectionKey: "contact-hero",
        sectionType: "hero",
        internalName: "Hero",
        heading: "Get in Touch with Altroz Asset Management",
        subheading: "Contact Us",
        description:
          "We are here to help you simplify your asset operations. Whether you are evaluating asset management software, requesting a product demonstration, planning your tracking workflow, or looking for product support, the Altroz Technologies team can help you identify the right next step.",
        buttonText: "Send an Enquiry",
        buttonLink: "#contact-form",
        settings: {
          secondaryButtonText: "Book Free Demo",
          secondaryButtonLink: ROUTES.bookDemo,
          secondaryDescription:
            "Use the verified WhatsApp route or the enquiry form below. Our team will review your enquiry and contact you using the details provided.",
        },
        items: [
          {
            itemType: "hero_path",
            title: "Product Enquiry",
            description: "Ask about product fit, pricing, or the right starting point.",
            icon: "messageSquare",
            buttonLink: "#contact-form",
          },
          {
            itemType: "hero_path",
            title: "Book a Demo",
            description: "Open the demo workflow for a guided product walkthrough.",
            icon: "calendarDays",
            buttonLink: ROUTES.bookDemo,
          },
          {
            itemType: "hero_path",
            title: "Support",
            description: "Use the support route for customer help and product questions.",
            icon: "headphones",
            buttonLink: ROUTES.support,
          },
        ],
      },
      {
        sectionKey: "quick-contact",
        sectionType: "contact_information",
        internalName: "Quick Contact",
        heading: "Choose the best way to reach the Altroz Asset Management team",
        subheading: "Quick Contact",
        description:
          "Use one of the verified paths below to reach the Altroz Asset Management team.",
        items: [
          {
            itemType: "contact_card",
            title: "WhatsApp",
            description: "Start a chat with the verified WhatsApp channel.",
            icon: "messageSquare",
            buttonLink: "https://wa.me/918446337392",
          },
          {
            itemType: "contact_card",
            title: "Book a Demo",
            description: "Open the product demo workflow for a guided walkthrough.",
            icon: "calendarDays",
            buttonLink: ROUTES.bookDemo,
          },
          {
            itemType: "contact_card",
            title: "Support",
            description: "Use the support page for customer help and product guidance.",
            icon: "headphones",
            buttonLink: ROUTES.support,
          },
        ],
      },
      {
        sectionKey: "contact-form",
        sectionType: "custom",
        internalName: "Enquiry Form",
        heading: "Share your enquiry with the Altroz Asset Management team",
        subheading: "Send a Message",
        description:
          "Fill in the details below and the form will prepare a WhatsApp enquiry draft using the verified channel.",
      },
      {
        sectionKey: "contact-cta",
        sectionType: "cta_banner",
        internalName: "Final CTA",
        heading: "Ready to Simplify Your Asset Management Operations?",
        subheading: "Ready to Start",
        description:
          "Connect with Altroz Asset Management to explore asset registration, tracking, assignment, maintenance, QR workflows and reporting from one centralized platform.",
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
          {
            itemType: "hero_highlight",
            title: "Free Learning Hub",
            description: "Everything on this page is free to read and built for practical use.",
            icon: "Sparkles",
            buttonLink: "#featured-guides",
          },
          {
            itemType: "hero_highlight",
            title: "Plain Language",
            description: "Email communication concepts are explained simply, without heavy jargon.",
            icon: "Lightbulb",
            buttonLink: "#why-learn",
          },
          {
            itemType: "hero_highlight",
            title: "Built for Growth",
            description: "Start with the basics and move up to analytics, scheduling and SMTP.",
            icon: "Workflow",
            buttonLink: "#learning-path",
          },
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
          {
            itemType: "guide_card",
            title: "What is Bulk Email?",
            description:
              "Learn how bulk email works, why it matters and where it fits in a business communication strategy.",
            buttonLink: ROUTES.bulkEmail,
            extraData: {
              readingTime: "5 min",
              category: "Getting Started",
              difficulty: "Beginner",
            },
          },
          {
            itemType: "guide_card",
            title: "Campaign Planning",
            description:
              "Understand how to define a goal, choose an audience and prepare a campaign before sending.",
            buttonLink: ROUTES.bulkEmailBroadcast,
            extraData: { readingTime: "6 min", category: "Campaigns", difficulty: "Beginner" },
          },
          {
            itemType: "guide_card",
            title: "Email Templates",
            description:
              "See how reusable layouts help you maintain a professional look across every message.",
            buttonLink: ROUTES.bulkEmailTemplates,
            extraData: { readingTime: "7 min", category: "Templates", difficulty: "Beginner" },
          },
          {
            itemType: "guide_card",
            title: "SMTP Configuration",
            description:
              "Get a simple grounding in SMTP, the delivery technology behind every outgoing email.",
            buttonLink: ROUTES.bulkEmailSmtp,
            extraData: { readingTime: "6 min", category: "Delivery", difficulty: "Intermediate" },
          },
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
          {
            itemType: "hero_highlight",
            title: "PF & ESIC",
            description: "Understand the common statutory deductions and related record keeping.",
            icon: "ShieldCheck",
          },
          {
            itemType: "hero_highlight",
            title: "Payroll Compliance",
            description: "See how attendance, deductions and payroll records stay aligned.",
            icon: "Wallet",
          },
          {
            itemType: "hero_highlight",
            title: "Employee Documents",
            description: "Keep forms, letters and records organized across the employee lifecycle.",
            icon: "FileText",
          },
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
          {
            itemType: "category_card",
            title: "PF & ESIC",
            description:
              "Learn the basics of employee contribution records and benefit-related tracking.",
            icon: "ShieldCheck",
            buttonLink: ROUTES.payroll,
            buttonText: "Open payroll guide",
          },
          {
            itemType: "category_card",
            title: "Professional Tax",
            description: "See how state-linked tax records and deductions fit into payroll work.",
            icon: "Wallet",
            buttonLink: ROUTES.payroll,
            buttonText: "Open payroll guide",
          },
          {
            itemType: "category_card",
            title: "Employee Records",
            description:
              "Store profiles, letters and job details in a central place that is easy to review.",
            icon: "Users",
            buttonLink: ROUTES.coreHR,
            buttonText: "Open employee guide",
          },
          {
            itemType: "category_card",
            title: "Attendance & Leave",
            description:
              "Keep time tracking, leave policies and approvals aligned with payroll data.",
            icon: "CalendarDays",
            buttonLink: ROUTES.attendanceManagement,
            buttonText: "Open attendance guide",
          },
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
      title: "HRMS Blog | Altroz HR",
      description:
        featuredHrmsBlogPost?.description ??
        "A practical, in-depth resource on Human Resource Management Systems - what they are, how they work, why Indian businesses need them, and how to choose one.",
      keywords: ["hr blog", "attendance", "payroll", "leave", "recruitment"],
      canonicalUrl: ROUTES.blog,
      ogTitle: "HRMS Blog | Altroz HR",
      ogDescription:
        featuredHrmsBlogPost?.description ??
        "A practical, in-depth resource on Human Resource Management Systems - what they are, how they work, why Indian businesses need them, and how to choose one.",
    }),
    sections: createHrmsBlogLandingSections({ blogPath: ROUTES.blog }),
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
          {
            itemType: "faq",
            title: "What is HR software?",
            description:
              "HR software is a digital system that helps businesses manage day-to-day human resource tasks like employee records, attendance, leave, payroll, and recruitment from one place.",
          },
          {
            itemType: "faq",
            title: "What is HRMS?",
            description:
              "HRMS stands for Human Resource Management System. It is a broader term used for software that manages the complete employee lifecycle, from onboarding to exit, including attendance, leave, payroll, performance, and employee records.",
          },
          {
            itemType: "faq",
            title: "Why do businesses need HR software?",
            description:
              "Businesses need HR software because manual HR processes are slow, error-prone, and hard to scale as the team grows.",
          },
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
          {
            itemType: "quick_link",
            title: "Compliance Guides",
            buttonLink: ROUTES.complianceGuides,
          },
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
  successMessage: "Your enquiry draft opened in WhatsApp. Send it there to complete submission.",
  errorMessage: "Your browser blocked the WhatsApp window. Please allow popups and try again.",
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
