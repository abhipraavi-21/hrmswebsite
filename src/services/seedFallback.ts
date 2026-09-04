import axios from "axios";
import { blogSeedPosts } from "../../shared/blog/index.js";
import {
  cmsSeedPages,
  contactSettingsSeed,
  getSeedPageByKey,
  getSeedResourceBySlug,
  pricingPlansSeed,
} from "../../shared/cms/index.js";
import type {
  PublicBlogGroup,
  PublicBlogPost,
  PublicCmsItem,
  PublicCmsPage,
  PublicCmsSection,
  PublicContactPage,
  PublicPricingPage,
  PublicPricingPlan,
  PublicResourceSummary,
} from "./cmsTypes";

function isOfflineError(error: unknown) {
  return axios.isAxiosError(error) && !error.response;
}

export async function withSeedFallback<T>(
  request: () => Promise<T>,
  fallback: () => T | null,
) {
  try {
    return await request();
  } catch (error) {
    if (isOfflineError(error)) {
      return fallback();
    }

    throw error;
  }
}

function normalizeText(value: unknown) {
  return typeof value === "string" ? value : null;
}

function normalizeHtmlFromParagraphs(paragraphs: unknown) {
  if (!Array.isArray(paragraphs)) {
    return null;
  }

  const html = paragraphs
    .map((paragraph) => normalizeText(paragraph))
    .filter((paragraph): paragraph is string => Boolean(paragraph))
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");

  return html || null;
}

function normalizeCmsItem(item: any, index: number): PublicCmsItem {
  return {
    id: typeof item?.id === "number" ? item.id : index + 1,
    itemType: normalizeText(item?.itemType) ?? "content",
    title: normalizeText(item?.title),
    subtitle: normalizeText(item?.subtitle),
    description: normalizeText(item?.description),
    icon: normalizeText(item?.icon),
    imageUrl: normalizeText(item?.imageUrl),
    imageAlt: normalizeText(item?.imageAlt),
    buttonText: normalizeText(item?.buttonText),
    buttonLink: normalizeText(item?.buttonLink),
    extraData: item?.extraData && typeof item.extraData === "object" ? item.extraData : {},
    displayOrder: typeof item?.displayOrder === "number" ? item.displayOrder : index,
    isActive: typeof item?.isActive === "boolean" ? item.isActive : true,
  };
}

function normalizeCmsSection(section: any, index: number): PublicCmsSection {
  const items = Array.isArray(section?.items)
    ? section.items
        .map((item: any, itemIndex: number) => normalizeCmsItem(item, itemIndex))
        .sort((a, b) => a.displayOrder - b.displayOrder)
    : [];

  return {
    id: typeof section?.id === "number" ? section.id : index + 1,
    sectionKey: normalizeText(section?.sectionKey) ?? `section-${index + 1}`,
    sectionType: normalizeText(section?.sectionType) ?? "content",
    internalName:
      normalizeText(section?.internalName) ??
      normalizeText(section?.heading) ??
      normalizeText(section?.sectionKey) ??
      `Section ${index + 1}`,
    heading: normalizeText(section?.heading),
    subheading: normalizeText(section?.subheading),
    description: normalizeText(section?.description),
    imageUrl: normalizeText(section?.imageUrl),
    imageAlt: normalizeText(section?.imageAlt),
    backgroundImageUrl: normalizeText(section?.backgroundImageUrl),
    backgroundImageAlt: normalizeText(section?.backgroundImageAlt),
    buttonText: normalizeText(section?.buttonText),
    buttonLink: normalizeText(section?.buttonLink),
    settings:
      section?.settings && typeof section.settings === "object" ? section.settings : {},
    displayOrder: typeof section?.displayOrder === "number" ? section.displayOrder : index,
    isActive: typeof section?.isActive === "boolean" ? section.isActive : true,
    items,
  };
}

function normalizeCmsPage(page: any): PublicCmsPage {
  const sections = Array.isArray(page?.sections)
    ? page.sections
        .map((section: any, index: number) => normalizeCmsSection(section, index))
        .sort((a, b) => a.displayOrder - b.displayOrder)
    : [];

  const meta = page?.meta && typeof page.meta === "object" ? page.meta : {};

  return {
    id: typeof page?.id === "number" ? page.id : 0,
    pageKey: normalizeText(page?.pageKey) ?? "",
    pageName:
      normalizeText(page?.pageName) ??
      normalizeText(page?.pageKey) ??
      normalizeText(page?.slug) ??
      "Page",
    slug: normalizeText(page?.slug) ?? "",
    metaTitle:
      normalizeText(page?.metaTitle) ??
      normalizeText(meta.title) ??
      normalizeText(page?.pageName) ??
      "Altroz",
    metaDescription:
      normalizeText(page?.metaDescription) ??
      normalizeText(meta.description) ??
      "",
    metaKeywords:
      normalizeText(page?.metaKeywords) ??
      (Array.isArray(meta.keywords) ? meta.keywords.join(", ") : null),
    canonicalUrl:
      normalizeText(page?.canonicalUrl) ?? normalizeText(meta.canonicalUrl) ?? null,
    ogTitle: normalizeText(page?.ogTitle) ?? normalizeText(meta.ogTitle) ?? null,
    ogDescription:
      normalizeText(page?.ogDescription) ?? normalizeText(meta.ogDescription) ?? null,
    ogImage: normalizeText(page?.ogImage) ?? normalizeText(meta.ogImage) ?? null,
    ogImageAlt: normalizeText(page?.ogImageAlt) ?? normalizeText(meta.ogImageAlt) ?? null,
    indexable: typeof page?.indexable === "boolean" ? page.indexable : true,
    status: page?.status === "draft" ? "draft" : "published",
    sections,
  };
}

export function getSeedPageFallback(pageKey: string): PublicCmsPage | null {
  const page = getSeedPageByKey(pageKey);
  return page ? normalizeCmsPage(page) : null;
}

export function getSeedResourcePageFallback(slug: string): PublicCmsPage | null {
  const page = getSeedResourceBySlug(slug);
  return page ? normalizeCmsPage(page) : null;
}

function normalizePricingPlan(plan: any, index: number): PublicPricingPlan {
  const features = Array.isArray(plan?.features)
    ? plan.features
        .map((feature: any, featureIndex: number) => ({
          id: typeof feature?.id === "number" ? feature.id : featureIndex + 1,
          featureText: normalizeText(feature?.featureText) ?? "",
          isIncluded: typeof feature?.isIncluded === "boolean" ? feature.isIncluded : true,
          displayOrder:
            typeof feature?.displayOrder === "number" ? feature.displayOrder : featureIndex,
          category: normalizeText(feature?.category),
        }))
        .filter((feature) => feature.featureText.length > 0)
        .sort((a, b) => a.displayOrder - b.displayOrder)
    : [];

  return {
    id: typeof plan?.id === "number" ? plan.id : index + 1,
    name: normalizeText(plan?.name) ?? `Plan ${index + 1}`,
    slug: normalizeText(plan?.slug) ?? `plan-${index + 1}`,
    shortDescription: normalizeText(plan?.shortDescription),
    currency: normalizeText(plan?.currency) ?? "INR",
    monthlyPrice: typeof plan?.monthlyPrice === "number" ? plan.monthlyPrice : 0,
    yearlyPrice: typeof plan?.yearlyPrice === "number" ? plan.yearlyPrice : null,
    originalPrice: typeof plan?.originalPrice === "number" ? plan.originalPrice : null,
    billingLabel: normalizeText(plan?.billingLabel),
    badgeText: normalizeText(plan?.badgeText),
    buttonText: normalizeText(plan?.buttonText),
    buttonLink: normalizeText(plan?.buttonLink),
    isPopular: typeof plan?.isPopular === "boolean" ? plan.isPopular : false,
    isActive: typeof plan?.isActive === "boolean" ? plan.isActive : true,
    displayOrder: typeof plan?.displayOrder === "number" ? plan.displayOrder : index,
    settings: plan?.settings && typeof plan.settings === "object" ? plan.settings : {},
    features,
  };
}

export function getSeedPricingPageFallback(): PublicPricingPage | null {
  const page = getSeedPageByKey("pricing");

  if (!page) {
    return null;
  }

  return {
    ...normalizeCmsPage(page),
    plans: pricingPlansSeed.map((plan, index) => normalizePricingPlan(plan, index)),
  };
}

export function getSeedContactPageFallback(): PublicContactPage | null {
  const page = getSeedPageByKey("contact-us");

  if (!page) {
    return null;
  }

  return {
    ...normalizeCmsPage(page),
    settings: { ...contactSettingsSeed },
  };
}

function normalizeResourceSummary(page: any, index: number): PublicResourceSummary {
  const resource = page?.resource ?? page?.resourcePage ?? null;

  return {
    id: typeof resource?.id === "number" ? resource.id : index + 1,
    resourceName:
      normalizeText(resource?.resourceName) ??
      normalizeText(page?.pageName) ??
      normalizeText(page?.slug) ??
      `Resource ${index + 1}`,
    slug: normalizeText(resource?.slug) ?? normalizeText(page?.slug) ?? "",
    shortDescription: normalizeText(resource?.shortDescription),
    featuredImage: normalizeText(resource?.featuredImage),
    featuredImageAlt: normalizeText(resource?.featuredImageAlt),
    status:
      resource?.status === "draft" || resource?.status === "published"
        ? resource.status
        : "published",
    displayOrder:
      typeof resource?.displayOrder === "number" ? resource.displayOrder : index,
    page: {
      id: typeof page?.id === "number" ? page.id : index + 1,
      pageKey: normalizeText(page?.pageKey) ?? "",
      pageName:
        normalizeText(page?.pageName) ?? normalizeText(page?.pageKey) ?? "Resource Page",
      metaTitle:
        normalizeText(page?.meta?.title) ??
        normalizeText(page?.metaTitle) ??
        normalizeText(page?.pageName) ??
        "Altroz",
    },
  };
}

export function getSeedResourcesFallback(): PublicResourceSummary[] {
  return cmsSeedPages
    .filter((page: any) => Boolean(page?.resource))
    .map((page: any, index: number) => normalizeResourceSummary(page, index))
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

function normalizeBlogPost(post: any, index: number): PublicBlogPost {
  const blogGroup = (["hrms", "bulk-email", "asset-management"] as PublicBlogGroup[]).includes(
    post?.blogGroup,
  )
    ? post.blogGroup
    : "hrms";

  const sections = Array.isArray(post?.sections)
    ? post.sections.map((section: any, sectionIndex: number) => ({
        id: normalizeText(section?.id) ?? `section-${sectionIndex + 1}`,
        title: normalizeText(section?.title) ?? `Section ${sectionIndex + 1}`,
        bodyHtml:
          normalizeText(section?.bodyHtml) ??
          normalizeHtmlFromParagraphs(section?.paragraphs),
        bullets: Array.isArray(section?.bullets)
          ? section.bullets
              .map((bullet: unknown) => normalizeText(bullet))
              .filter((bullet): bullet is string => Boolean(bullet))
          : [],
        table:
          section?.table && typeof section.table === "object" ? section.table : null,
      }))
    : [];

  return {
    id: typeof post?.id === "number" ? post.id : index + 1,
    title: normalizeText(post?.title) ?? `Blog Post ${index + 1}`,
    slug: normalizeText(post?.slug) ?? `blog-post-${index + 1}`,
    href:
      normalizeText(post?.href) ??
      `/${blogGroup === "hrms" ? "hrms" : blogGroup}/resources/blog/${
        normalizeText(post?.slug) ?? `blog-post-${index + 1}`
      }`,
    blogGroup,
    category: normalizeText(post?.category) ?? "General",
    readingTimeLabel: normalizeText(post?.readingTimeLabel),
    descriptionHtml:
      normalizeText(post?.descriptionHtml) ??
      normalizeHtmlFromParagraphs([post?.description]),
    metaTitle:
      normalizeText(post?.metaTitle) ??
      normalizeText(post?.title) ??
      "Altroz Blog",
    metaDescription:
      normalizeText(post?.metaDescription) ??
      normalizeText(post?.description) ??
      "",
    heroSummaryHtml:
      normalizeText(post?.heroSummaryHtml) ??
      normalizeHtmlFromParagraphs([post?.heroSummary]),
    quickAnswerHtml:
      normalizeText(post?.quickAnswerHtml) ??
      normalizeHtmlFromParagraphs([post?.quickAnswer]),
    heroPoints: Array.isArray(post?.heroPoints)
      ? post.heroPoints
          .map((point: unknown) => normalizeText(point))
          .filter((point): point is string => Boolean(point))
      : [],
    keyTakeaways: Array.isArray(post?.keyTakeaways)
      ? post.keyTakeaways
          .map((point: unknown) => normalizeText(point))
          .filter((point): point is string => Boolean(point))
      : [],
    sections,
    faqs: Array.isArray(post?.faqs)
      ? post.faqs
          .map((faq: any) => ({
            question: normalizeText(faq?.question) ?? normalizeText(faq?.q) ?? "",
            answer: normalizeText(faq?.answer) ?? normalizeText(faq?.a) ?? "",
          }))
          .filter((faq) => faq.question && faq.answer)
      : [],
    relatedLinks: Array.isArray(post?.relatedLinks)
      ? post.relatedLinks
          .map((link: any) => ({
            label: normalizeText(link?.label) ?? "",
            href: normalizeText(link?.href) ?? "",
            description: normalizeText(link?.description),
          }))
          .filter((link) => link.label && link.href)
      : [],
    coverImageUrl:
      normalizeText(post?.coverImageUrl) ?? normalizeText(post?.coverImage) ?? null,
    coverImageAlt: normalizeText(post?.coverImageAlt),
    status: post?.status === "draft" ? "draft" : "published",
    displayOrder: typeof post?.displayOrder === "number" ? post.displayOrder : index,
    publishedAt: normalizeText(post?.publishedAt),
    createdAt: normalizeText(post?.createdAt) ?? undefined,
    updatedAt: normalizeText(post?.updatedAt) ?? undefined,
  };
}

export function getSeedBlogPostsFallback(blogGroup?: PublicBlogGroup) {
  const requestedGroup = blogGroup ?? "hrms";

  return blogSeedPosts
    .filter((post) => post.blogGroup === requestedGroup)
    .map((post, index) => normalizeBlogPost(post, index))
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getSeedBlogPostFallback(slug: string) {
  const post = blogSeedPosts.find((entry) => entry.slug === slug);
  return post ? normalizeBlogPost(post, blogSeedPosts.indexOf(post)) : null;
}
