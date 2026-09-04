import { ROUTES } from "@/routes/routeConfig.js";
import type { PublicBlogGroup } from "@/services/cmsTypes";

export const FALLBACK_BLOG_IMAGE =
  "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000";

type BlogGroupPageContent = {
  pageKey: string;
  storySectionKeys: string[];
  badge: string;
  pageTitle: string;
  pageDescription: string;
  heroTitle: string;
  heroDescription: string;
  searchPlaceholder: string;
  summaryLabel: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  emptyTitle: string;
  emptyDescription: string;
  relatedHeading: string;
  relatedDescription: string;
};

export const BLOG_GROUP_PAGE_CONTENT: Record<PublicBlogGroup, BlogGroupPageContent> = {
  hrms: {
    pageKey: "hrms-resource-blog",
    storySectionKeys: ["latest-stories"],
    badge: "HRMS Blog",
    pageTitle: "HRMS Blog | Altroz HR",
    pageDescription:
      "Browse HRMS guides, payroll explainers, attendance workflows, and HR operations content from Altroz HR.",
    heroTitle: "Learn everything about HR operations, attendance, payroll, and automation",
    heroDescription:
      "Browse practical HRMS guides, product explainers, and operational playbooks written for growing teams.",
    searchPlaceholder: "Search HRMS guides, payroll, attendance, leave, reports...",
    summaryLabel: "HR workflows",
    primaryCtaLabel: "Explore HRMS",
    primaryCtaHref: ROUTES.hrmsHome,
    secondaryCtaLabel: "Book a demo",
    secondaryCtaHref: ROUTES.bookDemo,
    emptyTitle: "No published HRMS articles yet",
    emptyDescription:
      "Create a post in the admin panel, switch its status to Published, save it, and it will appear here.",
    relatedHeading: "Related HR topics connected to this blog",
    relatedDescription:
      "These links connect blog readers back to the HRMS product areas that support daily people operations.",
  },
  "bulk-email": {
    pageKey: "bulk-email-resource-blog",
    storySectionKeys: ["latest-stories", "blog-topics"],
    badge: "Bulk Email Blog",
    pageTitle: "Bulk Email Blog | Altroz HR",
    pageDescription:
      "Browse bulk email guides, SMTP setup explainers, campaign workflows, and business communication tips from Altroz HR.",
    heroTitle: "Learn campaigns, SMTP, templates, scheduling, analytics, and business communication",
    heroDescription:
      "Browse practical bulk email guides, product explainers, and campaign playbooks written for modern teams.",
    searchPlaceholder: "Search bulk email guides, SMTP, templates, analytics, campaigns...",
    summaryLabel: "Email workflows",
    primaryCtaLabel: "Explore Bulk Email",
    primaryCtaHref: ROUTES.bulkEmail,
    secondaryCtaLabel: "View pricing",
    secondaryCtaHref: ROUTES.bulkEmailPricing,
    emptyTitle: "No published bulk email articles yet",
    emptyDescription:
      "Create a post in the admin panel, switch its status to Published, save it, and it will appear here.",
    relatedHeading: "Related bulk email topics connected to this blog",
    relatedDescription:
      "These links connect blog readers back to the bulk email product areas that support campaigns and outreach.",
  },
  "asset-management": {
    pageKey: "asset-management-resource-blog",
    storySectionKeys: ["latest-stories", "asset-blog-topics"],
    badge: "Asset Management Blog",
    pageTitle: "Asset Management Blog | Altroz HR",
    pageDescription:
      "Browse asset tracking guides, inventory workflows, maintenance playbooks, and operational best practices from Altroz HR.",
    heroTitle: "Learn asset tracking, inventory workflows, maintenance, audits, and operations",
    heroDescription:
      "Browse practical asset management guides, product explainers, and operational playbooks written for growing teams.",
    searchPlaceholder: "Search asset guides, maintenance, inventory, audits, tracking...",
    summaryLabel: "Ops workflows",
    primaryCtaLabel: "Explore Asset Management",
    primaryCtaHref: ROUTES.assetManagement,
    secondaryCtaLabel: "Book a demo",
    secondaryCtaHref: ROUTES.assetManagementBookDemo,
    emptyTitle: "No published asset management articles yet",
    emptyDescription:
      "Create a post in the admin panel, switch its status to Published, save it, and it will appear here.",
    relatedHeading: "Related asset topics connected to this blog",
    relatedDescription:
      "These links connect blog readers back to the asset workflows that support tracking, maintenance, and reporting.",
  },
};

export function resolveBlogGroupFromPath(pathname = "/"): PublicBlogGroup {
  if (pathname.startsWith(ROUTES.bulkEmailBlog)) {
    return "bulk-email";
  }

  if (pathname.startsWith(ROUTES.assetManagementBlog)) {
    return "asset-management";
  }

  return "hrms";
}

export function resolveBlogListingPath(blogGroup: PublicBlogGroup, pathname = "") {
  if (blogGroup === "bulk-email") {
    return ROUTES.bulkEmailBlog;
  }

  if (blogGroup === "asset-management") {
    return ROUTES.assetManagementBlog;
  }

  return ROUTES.hrmsBlog;
}

export function resolveBlogPostPath(
  blogGroup: PublicBlogGroup,
  slug: string,
  pathname = "",
) {
  return `${resolveBlogListingPath(blogGroup, pathname)}/${slug}`;
}

export function stripHtmlToText(value?: string | null) {
  return (value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function formatBlogDate(value?: string | null) {
  if (!value) {
    return "Recently updated";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently updated";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatBlogYear(value?: string | null) {
  if (!value) {
    return "2026";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "2026";
  }

  return `${date.getFullYear()}`;
}
