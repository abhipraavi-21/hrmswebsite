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
  imageAlt?: string | null;
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
  imageAlt?: string | null;
  backgroundImageUrl?: string | null;
  backgroundImageAlt?: string | null;
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
  ogImageAlt?: string | null;
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
  totalSubscriptionPurchases: number;
  activeSubscriptions: number;
  renewalsDueSoon: number;
  recentlyUpdatedContent: Array<{
    id: number;
    page_name: string;
    page_key: string;
    updatedAt: string;
  }>;
  recentSubscriptions: SubscriptionPurchase[];
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

export type BlogTable = {
  headers: string[];
  rows: string[][];
};

export type BlogSection = {
  id: string;
  title: string;
  bodyHtml?: string | null;
  bullets: string[];
  table?: BlogTable | null;
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogRelatedLink = {
  label: string;
  href: string;
  description?: string | null;
};

export type BlogGroup = "hrms" | "bulk-email" | "asset-management";

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  href: string;
  publicUrl?: string;
  blogGroup: BlogGroup;
  category: string;
  readingTimeLabel?: string | null;
  descriptionHtml?: string | null;
  metaTitle: string;
  metaDescription: string;
  heroSummaryHtml?: string | null;
  quickAnswerHtml?: string | null;
  heroPoints: string[];
  keyTakeaways: string[];
  sections: BlogSection[];
  faqs: BlogFaq[];
  relatedLinks: BlogRelatedLink[];
  coverImageUrl?: string | null;
  coverImageAlt?: string | null;
  status: "draft" | "published";
  displayOrder: number;
  publishedAt?: string | null;
};

export type SubscriptionPurchase = {
  id: number;
  referenceCode: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string | null;
  planSlug: string;
  planName: string;
  employeeCount: number;
  billingCycle: "monthly" | "half-yearly" | "yearly";
  billingCycleLabel: string;
  billingCycleMonths: number;
  paymentMethod?: string | null;
  pricePerEmployee: number;
  subtotalAmount: number;
  gstRate: number;
  gstAmount: number;
  totalAmount: number;
  currency: string;
  paymentStatus: "paid" | "pending" | "failed" | "refunded";
  subscriptionStatus: "active" | "pending" | "expired" | "cancelled";
  sourcePage?: string | null;
  notes?: string | null;
  purchasedAt: string;
  renewalDueAt: string;
  daysUntilRenewal: number;
  extraData?: Record<string, unknown>;
};

export type BillingOverview = {
  totalCustomers: number;
  activeSubscriptions: number;
  mrr: number;
  arr: number;
  revenueToday: number;
  revenueThisMonth: number;
  renewalsDueSoon: number;
  failedPayments: number;
  revenueByProduct: Array<{
    product: {
      id: number;
      name: string;
      slug: string;
    };
    revenue: number;
  }>;
};

export type BillingAdminCustomer = {
  id: number;
  username: string;
  contactName: string;
  email: string;
  phone?: string | null;
  lastLoginAt?: string | null;
  createdAt: string;
  company?: {
    id: number;
    name: string;
    gstin?: string | null;
    addressLine1?: string | null;
    addressLine2?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    postalCode?: string | null;
    employeeCount?: number | null;
  } | null;
  products: Array<{
    productName: string;
    productSlug: string;
    planName: string;
    status: string;
    renewalDate: string;
  }>;
  mrr: number;
  status: string;
  lastPaymentAt?: string | null;
};

export type BillingCatalogFeature = {
  id: number;
  code: string;
  name: string;
  description?: string | null;
  enabled: boolean;
  displayOrder: number;
};

export type BillingCatalogLimit = {
  id: number;
  code: string;
  name: string;
  value: number;
  unit?: string | null;
  isUnlimited: boolean;
};

export type BillingCatalogPlan = {
  id: number;
  productId: number;
  name: string;
  code: string;
  slug: string;
  description?: string | null;
  currency: string;
  isPopular: boolean;
  status: string;
  displayOrder: number;
  monthlyPrice: number;
  semiannualPrice: number;
  annualPrice: number;
  features: BillingCatalogFeature[];
  limits: BillingCatalogLimit[];
};

export type BillingCatalogAddon = {
  id: number;
  productId: number;
  name: string;
  code: string;
  description?: string | null;
  pricingType: string;
  currency: string;
  status: string;
  displayOrder: number;
  monthlyPrice?: number | null;
  semiannualPrice?: number | null;
  annualPrice?: number | null;
  unitPrice?: number | null;
  metadata?: Record<string, unknown>;
};

export type BillingAdminProduct = {
  id: number;
  name: string;
  code: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  status: string;
  displayOrder: number;
  plans: BillingCatalogPlan[];
  addons: BillingCatalogAddon[];
};

export type BillingAdminSubscription = {
  id: number;
  subscriptionNumber: string;
  customer?: {
    id: number;
    username: string;
    contactName: string;
    email: string;
  } | null;
  company?: {
    id: number;
    name: string;
  } | null;
  product?: {
    id: number;
    name: string;
    slug: string;
  } | null;
  plan?: {
    id: number;
    name: string;
    slug: string;
  } | null;
  billingCycle: "monthly" | "semiannual" | "annual";
  billingCycleLabel: string;
  addOns: Array<{
    id: number;
    name: string;
    quantity: number;
    totalPrice: number;
  }>;
  amount: number;
  status: string;
  startDate: string;
  endDate: string;
  renewalDate: string;
};

export type BillingAdminPayment = {
  id: number;
  paymentNumber: string;
  orderNumber?: string | null;
  customer?: {
    id: number;
    username: string;
    contactName: string;
  } | null;
  product?: {
    id: number;
    name: string;
    slug: string;
  } | null;
  plan?: {
    id: number;
    name: string;
    slug: string;
  } | null;
  amount: number;
  currency: string;
  gatewayProvider: string;
  gatewayTransactionId?: string | null;
  status: string;
  paidAt?: string | null;
  createdAt: string;
};

export type BillingAdminInvoice = {
  id: number;
  invoiceNumber: string;
  customer?: {
    id: number;
    username: string;
    contactName: string;
  } | null;
  product?: {
    id: number;
    name: string;
    slug: string;
  } | null;
  plan?: {
    id: number;
    name: string;
    slug: string;
  } | null;
  billingPeriodStart: string;
  billingPeriodEnd: string;
  subtotalAmount: number;
  addonAmount: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  status: string;
  issuedAt: string;
};

export type BillingTaxSetting = {
  id: number;
  taxName: string;
  taxRate: number;
  gstin?: string | null;
  sac?: string | null;
  isEnabled: boolean;
  isInclusive: boolean;
};
