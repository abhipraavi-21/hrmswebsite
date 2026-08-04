import {
  Activity,
  BarChart3,
  BookOpen,
  BookText,
  Boxes,
  Bug,
  FileText,
  Globe,
  Images,
  LayoutDashboard,
  LifeBuoy,
  Mail,
  Mailbox,
  Megaphone,
  Network,
  NotepadText,
  RefreshCw,
  Route,
  ScrollText,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { ROUTES } from "@/routes/routeConfig.js";
import type { AdminModuleId, AdminNavGroup, AdminRole } from "./types";

export const adminDemoPassword = "Altroz@123";

export const adminRoleDescriptions: Record<AdminRole, string> = {
  "Super Admin": "Owns platform configuration, user access, and technical SEO controls.",
  Admin: "Runs day-to-day content, lead management, and publishing operations.",
  "Client Admin":
    "Manages the approved client-side content modules: blogs, FAQs, learn resources, compliance guides, media, and SEO fields.",
  "SEO Manager": "Owns metadata, schema, redirects, sitemap, and reporting quality.",
  "Content Writer": "Creates draft content for blogs, guides, and learn resources.",
  Editor: "Reviews, approves, and publishes content revisions.",
};

export const adminNavGroups: AdminNavGroup[] = [
  {
    label: "Overview",
    items: [
      { id: "dashboard", label: "Dashboard", to: ROUTES.adminDashboard, icon: LayoutDashboard },
      {
        id: "website-content",
        label: "Website Content",
        to: ROUTES.adminWebsiteContent,
        icon: Globe,
      },
    ],
  },
  {
    label: "Content",
    items: [
      { id: "pages", label: "Pages", to: ROUTES.adminPages, icon: FileText },
      { id: "seo", label: "SEO Management", to: ROUTES.adminSeo, icon: Sparkles },
      { id: "blogs", label: "Blog Management", to: ROUTES.adminBlogs, icon: BookText },
      { id: "learn", label: "Learn Resources", to: ROUTES.adminLearn, icon: BookOpen },
      {
        id: "compliance",
        label: "Compliance Guides",
        to: ROUTES.adminCompliance,
        icon: ScrollText,
      },
      { id: "faqs", label: "FAQ Management", to: ROUTES.adminFaqs, icon: LifeBuoy },
      { id: "media", label: "Media Library", to: ROUTES.adminMedia, icon: Images },
    ],
  },
  {
    label: "Growth",
    items: [
      {
        id: "demo-requests",
        label: "Demo Requests",
        to: ROUTES.adminDemoRequests,
        icon: Mailbox,
      },
      {
        id: "contact-enquiries",
        label: "Contact Enquiries",
        to: ROUTES.adminContactEnquiries,
        icon: Mail,
      },
      {
        id: "newsletter",
        label: "Newsletter Subscribers",
        to: ROUTES.adminNewsletter,
        icon: Megaphone,
      },
      { id: "bulk-email", label: "Bulk Email", to: ROUTES.adminBulkEmail, icon: Boxes },
      { id: "redirects", label: "Redirect Manager", to: ROUTES.adminRedirects, icon: Route },
      { id: "sitemap", label: "Sitemap Manager", to: ROUTES.adminSitemap, icon: RefreshCw },
      { id: "analytics", label: "Analytics", to: ROUTES.adminAnalytics, icon: BarChart3 },
      {
        id: "integrations",
        label: "Integrations",
        to: ROUTES.adminIntegrations,
        icon: Network,
      },
    ],
  },
  {
    label: "Administration",
    items: [
      { id: "users", label: "User Management", to: ROUTES.adminUsers, icon: Users },
      { id: "activity", label: "Activity Logs", to: ROUTES.adminActivity, icon: Activity },
      { id: "settings", label: "Settings", to: ROUTES.adminSettings, icon: Settings },
    ],
  },
];

export const adminModulePermissions: Record<AdminModuleId, AdminRole[]> = {
  dashboard: ["Super Admin", "Admin", "Client Admin", "SEO Manager", "Content Writer", "Editor"],
  "website-content": ["Super Admin", "Admin", "SEO Manager", "Content Writer", "Editor"],
  pages: ["Super Admin", "Admin", "Content Writer", "Editor"],
  seo: ["Super Admin", "Admin", "Client Admin", "SEO Manager", "Editor"],
  blogs: ["Super Admin", "Admin", "Client Admin", "Content Writer", "Editor"],
  learn: ["Super Admin", "Admin", "Client Admin", "Content Writer", "Editor"],
  compliance: ["Super Admin", "Admin", "Client Admin", "Content Writer", "Editor"],
  faqs: ["Super Admin", "Admin", "Client Admin", "SEO Manager", "Editor"],
  media: ["Super Admin", "Admin", "Client Admin", "Content Writer", "Editor"],
  "demo-requests": ["Super Admin", "Admin"],
  "contact-enquiries": ["Super Admin", "Admin"],
  newsletter: ["Super Admin", "Admin", "SEO Manager"],
  "bulk-email": ["Super Admin", "Admin", "SEO Manager"],
  redirects: ["Super Admin", "Admin", "SEO Manager"],
  sitemap: ["Super Admin", "Admin", "SEO Manager"],
  analytics: ["Super Admin", "Admin", "SEO Manager"],
  integrations: ["Super Admin", "SEO Manager"],
  users: ["Super Admin"],
  activity: ["Super Admin", "Admin"],
  settings: ["Super Admin", "Admin"],
};

export const adminRouteLabels: Record<string, string> = {
  [ROUTES.adminDashboard]: "Dashboard",
  [ROUTES.adminWebsiteContent]: "Website Content",
  [ROUTES.adminPages]: "Pages",
  [ROUTES.adminSeo]: "SEO Management",
  [ROUTES.adminBlogs]: "Blog Management",
  [ROUTES.adminLearn]: "Learn Resources",
  [ROUTES.adminCompliance]: "Compliance Guides",
  [ROUTES.adminFaqs]: "FAQ Management",
  [ROUTES.adminMedia]: "Media Library",
  [ROUTES.adminDemoRequests]: "Demo Requests",
  [ROUTES.adminContactEnquiries]: "Contact Enquiries",
  [ROUTES.adminNewsletter]: "Newsletter Subscribers",
  [ROUTES.adminBulkEmail]: "Bulk Email",
  [ROUTES.adminRedirects]: "Redirect Manager",
  [ROUTES.adminSitemap]: "Sitemap Manager",
  [ROUTES.adminAnalytics]: "Analytics",
  [ROUTES.adminIntegrations]: "Integrations",
  [ROUTES.adminUsers]: "User Management",
  [ROUTES.adminActivity]: "Activity Logs",
  [ROUTES.adminSettings]: "Settings",
  [ROUTES.adminLogin]: "Admin Login",
};

export function findModuleIdByPath(pathname: string): AdminModuleId | null {
  const item = adminNavGroups
    .flatMap((group) => group.items)
    .find((navItem) => pathname === navItem.to || pathname.startsWith(`${navItem.to}/`));

  return item?.id ?? null;
}

export function canAccessModule(role: AdminRole, moduleId: AdminModuleId) {
  return adminModulePermissions[moduleId].includes(role);
}

export function getModuleLabel(moduleId: AdminModuleId) {
  const item = adminNavGroups.flatMap((group) => group.items).find((navItem) => navItem.id === moduleId);
  return item?.label ?? moduleId;
}

export function getQuickStatsBadge(moduleId: AdminModuleId, counts: Record<string, number>) {
  switch (moduleId) {
    case "pages":
      return counts.pages ?? 0;
    case "blogs":
      return counts.blogs ?? 0;
    case "demo-requests":
      return counts.demoRequests ?? 0;
    case "contact-enquiries":
      return counts.contactEnquiries ?? 0;
    case "newsletter":
      return counts.newsletter ?? 0;
    case "activity":
      return counts.activities ?? 0;
    default:
      return null;
  }
}

export const adminHeroChecklist = [
  "Role-aware navigation and access-aware route surfaces",
  "Dashboard metrics, publishing workflow, and SEO health views",
  "Content operations for pages, blogs, learn resources, guides, and FAQs",
  "Lead inbox, media library, email campaigns, redirects, sitemap, and settings",
];

export const adminAccessDeniedIcon = ShieldCheck;
export const adminSearchEmptyIcon = Bug;
export const adminHintIcon = NotepadText;
