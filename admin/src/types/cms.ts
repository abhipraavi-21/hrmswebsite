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
  totalContactEnquiries: number;
  newEnquiries: number;
  readEnquiries: number;
  publishedSections: number;
  draftSections: number;
  recentlyUpdatedContent: Array<{
    id: number;
    page_name: string;
    page_key: string;
    updatedAt: string;
  }>;
  recentEnquiries: Array<{
    id: number;
    full_name: string;
    status: string;
    submitted_at: string;
  }>;
};

export type ContactSettings = {
  page_title?: string | null;
  page_subtitle?: string | null;
  description?: string | null;
  address?: string | null;
  phone_primary?: string | null;
  phone_secondary?: string | null;
  email_primary?: string | null;
  email_secondary?: string | null;
  business_hours?: string | null;
  map_embed_url?: string | null;
  form_heading?: string | null;
  form_description?: string | null;
  submit_button_text?: string | null;
  success_message?: string | null;
  error_message?: string | null;
  social_links_json?: unknown;
  settings_json?: unknown;
};

export type ContactEnquiry = {
  id: number;
  fullName: string;
  email: string;
  phone?: string | null;
  companyName?: string | null;
  subject?: string | null;
  message: string;
  sourcePage?: string | null;
  ipAddress?: string | null;
  status: "new" | "read" | "in_progress" | "replied" | "closed" | "spam";
  adminNotes?: string | null;
  submittedAt: string;
};

export type PaginatedEnquiries = {
  items: ContactEnquiry[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
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
