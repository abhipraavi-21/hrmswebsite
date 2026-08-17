import type { BlogGroup } from "../types/cms";

export type BlogGroupConfig = {
  key: BlogGroup;
  label: string;
  shortLabel: string;
  pageLabel: string;
  description: string;
  defaultCategory: string;
  pageKey: string;
  blogPath: string;
  landingStorySectionKey: string;
};

export const BLOG_GROUPS: BlogGroupConfig[] = [
  {
    key: "hrms",
    label: "HRMS Blog Page",
    shortLabel: "HRMS",
    pageLabel: "HRMS Blog",
    description:
      "Manage HRMS articles, software explainers, compliance content, and operational guides for the main HRMS learning area.",
    defaultCategory: "HR Blog",
    pageKey: "hrms-resource-blog",
    blogPath: "/hrms/resources/blog",
    landingStorySectionKey: "latest-stories",
  },
  {
    key: "bulk-email",
    label: "Bulk Email Blog Page",
    shortLabel: "Bulk Email",
    pageLabel: "Bulk Email Blog",
    description:
      "Manage blog posts for bulk email campaigns, SMTP setup, templates, scheduling, and business communication workflows.",
    defaultCategory: "Bulk Email Blog",
    pageKey: "bulk-email-resource-blog",
    blogPath: "/bulk-email/resources/blog",
    landingStorySectionKey: "blog-topics",
  },
  {
    key: "asset-management",
    label: "Asset Management Blog Page",
    shortLabel: "Asset Management",
    pageLabel: "Asset Management Blog",
    description:
      "Manage articles for asset tracking, QR workflows, maintenance, reports, and asset-management operations.",
    defaultCategory: "Asset Management Blog",
    pageKey: "asset-management-resource-blog",
    blogPath: "/asset-management/resources/blog",
    landingStorySectionKey: "asset-blog-topics",
  },
];

const BLOG_GROUP_CONFIG_MAP = new Map(BLOG_GROUPS.map((group) => [group.key, group]));

export function isBlogGroup(value: string): value is BlogGroup {
  return BLOG_GROUP_CONFIG_MAP.has(value as BlogGroup);
}

export function getBlogGroupConfig(blogGroup: BlogGroup) {
  return BLOG_GROUP_CONFIG_MAP.get(blogGroup) ?? BLOG_GROUPS[0];
}

export function getBlogAdminRoute(blogGroup?: BlogGroup | null) {
  return blogGroup ? `/blog-posts/${blogGroup}` : "/blog-posts";
}

export function getBlogGroupFromPageKey(pageKey?: string | null): BlogGroup | null {
  switch (pageKey) {
    case "resource-blog":
    case "hrms-resource-blog":
      return "hrms";
    case "bulk-email-resource-blog":
      return "bulk-email";
    case "asset-management-resource-blog":
      return "asset-management";
    default:
      return null;
  }
}
