import { ROUTES } from "@/routes/routeConfig.js";

export type BulkEmailTabId = "campaigns" | "templates" | "contacts" | "analytics" | "automation";

export type BulkEmailPageConfig = {
  id: BulkEmailTabId;
  pageTitle: string;
  canonicalPath: string;
  eyebrow: string;
  title: string;
  description: string;
};

export const bulkEmailTabs = [
  { id: "campaigns", label: "Campaigns", href: ROUTES.bulkEmailCampaigns },
  { id: "templates", label: "Templates", href: ROUTES.bulkEmailTemplates },
  { id: "contacts", label: "Contacts", href: ROUTES.bulkEmailContacts },
  { id: "analytics", label: "Analytics", href: ROUTES.bulkEmailAnalytics },
  { id: "automation", label: "Automation", href: ROUTES.bulkEmailAutomation },
] as const;

export const bulkEmailPages: Record<BulkEmailTabId, BulkEmailPageConfig> = {
  campaigns: {
    id: "campaigns",
    pageTitle: "Bulk Email Campaigns | Altroz HRMS",
    canonicalPath: ROUTES.bulkEmailCampaigns,
    eyebrow: "Bulk Email",
    title: "Bulk Email content removed",
    description:
      "This route now shows a cleared workspace placeholder while the top navigation entry remains available.",
  },
  templates: {
    id: "templates",
    pageTitle: "Bulk Email Templates | Altroz HRMS",
    canonicalPath: ROUTES.bulkEmailTemplates,
    eyebrow: "Bulk Email",
    title: "Bulk Email Templates Built for Faster Brand-Consistent Campaigns",
    description:
      "Reusable email layouts, HTML upload support and clean campaign structure for business teams.",
  },
  contacts: {
    id: "contacts",
    pageTitle: "Bulk Email Contacts | Altroz HRMS",
    canonicalPath: ROUTES.bulkEmailContacts,
    eyebrow: "Bulk Email",
    title: "Bulk Email content removed",
    description:
      "This route now shows a cleared workspace placeholder while the top navigation entry remains available.",
  },
  analytics: {
    id: "analytics",
    pageTitle: "Bulk Email Analytics | Altroz HRMS",
    canonicalPath: ROUTES.bulkEmailAnalytics,
    eyebrow: "Bulk Email",
    title: "Bulk Email content removed",
    description:
      "This route now shows a cleared workspace placeholder while the top navigation entry remains available.",
  },
  automation: {
    id: "automation",
    pageTitle: "Bulk Email Automation | Altroz HRMS",
    canonicalPath: ROUTES.bulkEmailAutomation,
    eyebrow: "Bulk Email",
    title: "Bulk Email content removed",
    description:
      "This route now shows a cleared workspace placeholder while the top navigation entry remains available.",
  },
};

export function getBulkEmailPage(id: BulkEmailTabId) {
  return bulkEmailPages[id];
}
