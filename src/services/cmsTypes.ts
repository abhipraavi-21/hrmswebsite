export type PublicApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type PublicCmsItem = {
  id: number;
  itemType: string;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  icon?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
  extraData?: Record<string, unknown>;
  displayOrder: number;
  isActive: boolean;
};

export type PublicCmsSection = {
  id: number;
  sectionKey: string;
  sectionType: string;
  internalName: string;
  heading?: string | null;
  subheading?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  backgroundImageUrl?: string | null;
  backgroundImageAlt?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
  settings?: Record<string, unknown>;
  displayOrder: number;
  isActive: boolean;
  items: PublicCmsItem[];
};

export type PublicCmsPage = {
  id: number;
  pageKey: string;
  pageName: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords?: string | null;
  canonicalUrl?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  ogImageAlt?: string | null;
  indexable: boolean;
  status: "draft" | "published";
  sections: PublicCmsSection[];
};

export type PublicResourceSummary = {
  id: number;
  resourceName: string;
  slug: string;
  shortDescription?: string | null;
  featuredImage?: string | null;
  featuredImageAlt?: string | null;
  status: "draft" | "published";
  displayOrder: number;
  page: {
    id: number;
    pageKey: string;
    pageName: string;
    metaTitle: string;
  } | null;
};

export type PublicPricingPlan = {
  id: number;
  name: string;
  slug: string;
  shortDescription?: string | null;
  currency: string;
  monthlyPrice: number;
  yearlyPrice?: number | null;
  originalPrice?: number | null;
  billingLabel?: string | null;
  badgeText?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
  isPopular: boolean;
  isActive: boolean;
  displayOrder: number;
  settings?: Record<string, unknown>;
  features: Array<{
    id: number;
    featureText: string;
    isIncluded: boolean;
    displayOrder: number;
    category?: string | null;
  }>;
};

export type PublicPricingPage = PublicCmsPage & {
  plans: PublicPricingPlan[];
};

export type PublicContactPage = PublicCmsPage & {
  settings: Record<string, unknown>;
};

export type PublicBlogGroup = "hrms" | "bulk-email" | "asset-management";

export type PublicBlogTable = {
  headers: string[];
  rows: string[][];
};

export type PublicBlogSection = {
  id: string;
  title: string;
  bodyHtml?: string | null;
  bullets: string[];
  table?: PublicBlogTable | null;
};

export type PublicBlogFaq = {
  question: string;
  answer: string;
};

export type PublicBlogRelatedLink = {
  label: string;
  href: string;
  description?: string | null;
};

export type PublicBlogPost = {
  id: number;
  title: string;
  slug: string;
  href: string;
  blogGroup: PublicBlogGroup;
  category: string;
  readingTimeLabel?: string | null;
  descriptionHtml?: string | null;
  metaTitle: string;
  metaDescription: string;
  heroSummaryHtml?: string | null;
  quickAnswerHtml?: string | null;
  heroPoints: string[];
  keyTakeaways: string[];
  sections: PublicBlogSection[];
  faqs: PublicBlogFaq[];
  relatedLinks: PublicBlogRelatedLink[];
  coverImageUrl?: string | null;
  coverImageAlt?: string | null;
  status: "draft" | "published";
  displayOrder: number;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type PublicResourceVideo = {
  id: number;
  title: string;
  label?: string | null;
  description?: string | null;
  videoSource: "youtube" | "upload" | "external";
  videoUrl: string;
  videoId?: string | null;
  thumbnailUrl?: string | null;
  thumbnailAlt?: string | null;
  status: "draft" | "published";
  displayOrder: number;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};
