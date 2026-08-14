import type { CmsPageSummary } from "../types/cms";

type ManagedGroup = {
  title: string;
  description: string;
  pages: CmsPageSummary[];
};

let placeholderId = -1;

function createPlaceholderPage(
  pageKey: string,
  pageName: string,
  slug: string,
): CmsPageSummary {
  return {
    id: placeholderId--,
    pageKey,
    pageName,
    slug,
    metaTitle: pageName,
    status: "published",
    resourcePage: null,
  };
}

export const MANAGED_PAGE_GROUPS: ManagedGroup[] = [
  {
    title: "HRMS Pages",
    description: "Pinned HRMS pages that should stay easy to find in the admin panel.",
    pages: [
      createPlaceholderPage("hrms", "HRMS", "hrms"),
      createPlaceholderPage("pricing", "Pricing", "hrms/pricing"),
      createPlaceholderPage("contact-us", "Contact Us", "hrms/contact-us"),
      createPlaceholderPage("hrms-resource-learn", "Learn", "hrms/resources/learn"),
      createPlaceholderPage("hrms-resource-blog", "Blog", "hrms/resources/blog"),
      createPlaceholderPage("hrms-resource-faq", "FAQs", "hrms/resources/faq"),
      createPlaceholderPage(
        "hrms-resource-compliance-guides",
        "Compliance Guides",
        "hrms/resources/compliance-guides",
      ),
    ],
  },
  {
    title: "Bulk Email Pages",
    description: "Pinned Bulk Email pages that should stay easy to find in the admin panel.",
    pages: [
      createPlaceholderPage("bulk-email", "Bulk Email", "bulk-email"),
      createPlaceholderPage("bulk-email-pricing", "Pricing", "bulk-email/pricing"),
      createPlaceholderPage("bulk-email-contact-us", "Contact Us", "bulk-email/contact-us"),
      createPlaceholderPage("bulk-email-resource-learn", "Learn", "bulk-email/resources/learn"),
      createPlaceholderPage("bulk-email-resource-blog", "Blog", "bulk-email/resources/blog"),
      createPlaceholderPage("bulk-email-resource-faq", "FAQs", "bulk-email/resources/faq"),
    ],
  },
  {
    title: "Asset Management Pages",
    description:
      "Pinned Asset Management pages that should stay easy to find in the admin panel.",
    pages: [
      createPlaceholderPage(
        "asset-management-suite",
        "Asset Management",
        "asset-management",
      ),
      createPlaceholderPage(
        "asset-management-resource-learn",
        "Learn",
        "asset-management/resources/learn",
      ),
      createPlaceholderPage(
        "asset-management-guide",
        "Asset Management Guide",
        "asset-management/asset-management-guide",
      ),
      createPlaceholderPage(
        "asset-management-contact-us",
        "Contact Us",
        "asset-management/contact-us",
      ),
      createPlaceholderPage(
        "asset-management-resource-blog",
        "Blog",
        "asset-management/resources/blog",
      ),
      createPlaceholderPage(
        "asset-management-resource-faq",
        "FAQs",
        "asset-management/resources/faq",
      ),
      createPlaceholderPage("asset-management-pricing", "Pricing", "asset-management/pricing"),
    ],
  },
];

export const MANAGED_PAGE_KEYS = new Set(
  MANAGED_PAGE_GROUPS.flatMap((group) => group.pages.map((page) => page.pageKey)),
);

export const LIVE_FRONTEND_CMS_PAGE_KEYS = new Set([
  "hrms",
  "bulk-email",
  "asset-management-suite",
  "pricing",
  "bulk-email-pricing",
  "asset-management-pricing",
  "contact-us",
  "bulk-email-contact-us",
  "asset-management-contact-us",
  "hrms-resource-learn",
  "bulk-email-resource-learn",
  "asset-management-resource-learn",
  "hrms-resource-faq",
  "bulk-email-resource-faq",
  "asset-management-resource-faq",
  "hrms-resource-compliance-guides",
  "asset-management-guide",
]);

const MANAGED_PAGE_PRESENTATION = new Map(
  MANAGED_PAGE_GROUPS.flatMap((group) =>
    group.pages.map((page) => [
      page.pageKey,
      {
        pageName: page.pageName,
        slug: page.slug,
      },
    ]),
  ),
);

export function getManagedPagePresentation(pageKey: string) {
  return MANAGED_PAGE_PRESENTATION.get(pageKey) ?? null;
}

export function isLiveFrontendCmsPage(pageKey?: string | null) {
  return !!pageKey && LIVE_FRONTEND_CMS_PAGE_KEYS.has(pageKey);
}

export function mergeManagedPages(pages: CmsPageSummary[]) {
  const livePageMap = new Map(pages.map((page) => [page.pageKey, page]));
  const mergedManagedPages = MANAGED_PAGE_GROUPS.map((group) => ({
    ...group,
    pages: group.pages.map((page) => {
      const livePage = livePageMap.get(page.pageKey);

      if (!livePage) {
        return page;
      }

      return {
        ...livePage,
        pageName: page.pageName || livePage.pageName,
        slug: page.slug || livePage.slug,
      };
    }),
  }));

  const otherPages = [...pages]
    .filter((page) => !MANAGED_PAGE_KEYS.has(page.pageKey))
    .sort((firstPage, secondPage) => firstPage.slug.localeCompare(secondPage.slug));

  return {
    groups: mergedManagedPages,
    otherPages,
  };
}
