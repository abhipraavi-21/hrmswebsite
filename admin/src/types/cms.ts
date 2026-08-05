export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  errors?: Array<{ path?: string; message?: string }>;
};

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt?: string | null;
};

export type CmsItem = {
  id: number;
  itemType: string;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  icon?: string | null;
  imageUrl?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
  extraData?: Record<string, unknown>;
  displayOrder: number;
  isActive: boolean;
};

export type CmsSection = {
  id: number;
  sectionKey: string;
  sectionType: string;
  internalName: string;
  heading?: string | null;
  subheading?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  backgroundImageUrl?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
  settings?: Record<string, unknown>;
  displayOrder: number;
  isActive: boolean;
  isRequired: boolean;
  items: CmsItem[];
};

export type CmsPageSummary = {
  id: number;
  pageKey: string;
  pageName: string;
  slug: string;
  metaTitle: string;
  status: "draft" | "published";
  resourcePage?: {
    id: number;
    resourceName: string;
    slug: string;
    status: "draft" | "published";
    displayOrder: number;
  } | null;
};

export type CmsPage = {
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
  indexable: boolean;
  status: "draft" | "published";
  sections: CmsSection[];
};

export type ResourceSummary = {
  id: number;
  resourceName: string;
  slug: string;
  shortDescription?: string | null;
  featuredImage?: string | null;
  status: "draft" | "published";
  displayOrder: number;
  page: {
    id: number;
    pageKey: string;
    pageName: string;
    metaTitle: string;
  } | null;
};

export type PricingFeature = {
  id: number;
  featureText: string;
  isIncluded: boolean;
  displayOrder: number;
  category?: string | null;
};

export type PricingPlan = {
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
  features: PricingFeature[];
};

export type DashboardSummary = {
  totalManagedPages: number;
  totalResourcePages: number;
  totalPricingPlans: number;
  publishedSections: number;
  draftSections: number;
  recentlyUpdatedContent: Array<{
    id: number;
    page_name: string;
    page_key: string;
    updatedAt: string;
  }>;
};

export type MediaItem = {
  id: number;
  fileName: string;
  originalName: string;
  fileUrl: string;
  fileType: string;
  mimeType: string;
  fileSize: number;
  altText?: string | null;
  createdAt: string;
};
