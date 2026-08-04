import type { LucideIcon } from "lucide-react";

export type AdminRole =
  | "Super Admin"
  | "Admin"
  | "Client Admin"
  | "SEO Manager"
  | "Content Writer"
  | "Editor";

export type AdminModuleId =
  | "dashboard"
  | "website-content"
  | "pages"
  | "seo"
  | "blogs"
  | "learn"
  | "compliance"
  | "faqs"
  | "media"
  | "demo-requests"
  | "contact-enquiries"
  | "newsletter"
  | "bulk-email"
  | "redirects"
  | "sitemap"
  | "analytics"
  | "integrations"
  | "users"
  | "activity"
  | "settings";

export type WorkflowStatus =
  | "Draft"
  | "In Review"
  | "Approved"
  | "Published"
  | "Scheduled"
  | "Archived";

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Demo scheduled"
  | "Converted"
  | "Not interested"
  | "Closed";

export type SubscriberStatus = "Active" | "Unsubscribed" | "Bounced" | "Blocked";

export type IntegrationStatus = "Connected" | "Not configured" | "Error";

export type ContentType = "Page" | "Blog" | "Learn Resource" | "Compliance Guide" | "FAQ";

export type ContentRecord = {
  id: string;
  type: ContentType;
  title: string;
  slug: string;
  category?: string;
  author?: string;
  status: WorkflowStatus;
  owner: string;
  updatedAt: string;
  publishedAt?: string;
  summary: string;
  focusKeyword: string;
  seoScore: number;
  trafficShare: number;
  readingTime: string;
  sections: number;
  tags: string[];
  featuredImage?: string;
  featuredImageAlt?: string;
  heroTitle?: string;
  heroDescription?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonUrl?: string;
};

export type SeoRecord = {
  id: string;
  entityId: string;
  entityType: ContentType;
  seoTitle: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  canonicalUrl: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  semanticKeywords?: string[];
  longTailKeywords?: string[];
  lsiKeywords?: string[];
  nlpKeywords?: string[];
  relatedEntities?: string[];
  peopleAlsoAsk?: string[];
  relatedSearches?: string[];
  searchIntent?: string;
  contentIntent?: string;
  primaryEntity?: string;
  aiSummary?: string;
  aiOverview?: string;
  chatgptSummary?: string;
  geminiSummary?: string;
  author?: string;
  publishDate?: string;
  readingTime?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  linkedInTitle?: string;
  linkedInDescription?: string;
  linkedInImage?: string;
  whatsAppTitle?: string;
  whatsAppDescription?: string;
  whatsAppImage?: string;
  ogImage?: string;
  robots: "index, follow" | "noindex, follow" | "index, nofollow" | "noindex, nofollow";
  ogTitle: string;
  ogDescription: string;
  schemaTypes: string[];
  schemaJson?: string;
  schemaEnabled?: boolean;
  topicClusters?: string[];
  difficultyLevel?: "Beginner" | "Intermediate" | "Advanced";
  relatedLearn?: string[];
  relatedBlog?: string[];
  relatedFaq?: string[];
  relatedProduct?: string[];
  internalLinks?: string[];
  downloadAssetUrl?: string;
  downloadPdfUrl?: string;
  videoSupportUrl?: string;
  applicableRegion?: string;
  lawType?: string;
  versionLabel?: string;
  faqCategory?: string;
  faqTags?: string[];
  searchOptionEnabled?: boolean;
  accordionEnabled?: boolean;
  heroSeoNotes?: string;
  featureSectionSeo?: string;
  bookDemoCtaLabel?: string;
  performanceNotes?: string;
  pricingKeywords?: string[];
  comparisonTableHighlights?: string;
  conversionTrackingNotes?: string;
  readabilityScore?: number;
  keywordDensity?: string;
  headingOutline?: string;
  tocEnabled?: boolean;
  wordCount?: number;
  imageCount?: number;
  videoCount?: number;
  tableCount?: number;
  faqCount?: number;
  internalLinkCount?: number;
  externalLinkCount?: number;
  brokenLinkCount?: number;
  webpReady?: boolean;
  ctaModes?: string[];
  views?: number;
  ctr?: string;
  avgTimeOnPage?: string;
  scrollDepth?: string;
  demoConversions?: number;
  overallScore: number;
  technicalScore: number;
  contentScore: number;
  aiScore: number;
  warnings: string[];
  lastUpdated: string;
};

export type MediaAsset = {
  id: string;
  name: string;
  type: "Image" | "PDF" | "Document" | "Video";
  mimeType: string;
  sizeLabel: string;
  dimensions: string;
  altText: string;
  title: string;
  caption: string;
  description: string;
  uploadedBy: string;
  uploadedAt: string;
  usage: string;
  url: string;
};

export type LeadRecord = {
  id: string;
  kind: "Demo Request" | "Contact Enquiry";
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  status: LeadStatus;
  assignedTo: string;
  submittedAt: string;
  message: string;
  internalNotes: string[];
  product: string;
  utmSource: string;
  utmCampaign: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  name: string;
  source: string;
  status: SubscriberStatus;
  subscribedAt: string;
  lastCampaign: string;
};

export type EmailCampaign = {
  id: string;
  name: string;
  subject: string;
  audience: string;
  scheduledFor: string;
  status: "Draft" | "Scheduled" | "Sending" | "Sent";
  sentCount: number;
  openCount: number;
  clickCount: number;
};

export type RedirectRecord = {
  id: string;
  sourceUrl: string;
  destinationUrl: string;
  type: 301 | 302;
  active: boolean;
  hits: number;
  createdAt: string;
  lastAccessed: string;
};

export type BrokenLink = {
  id: string;
  sourcePage: string;
  brokenUrl: string;
  linkType: "Internal" | "External";
  httpStatus: number;
  lastChecked: string;
  fixStatus: "Open" | "In progress" | "Resolved";
};

export type AnalyticsPoint = {
  month: string;
  demoRequests: number;
  organicTraffic: number;
  pagesPublished: number;
};

export type DeviceMetric = {
  name: string;
  value: number;
};

export type SeoDistribution = {
  label: string;
  count: number;
};

export type TopPageMetric = {
  title: string;
  visits: number;
  conversions: number;
};

export type ActivityLog = {
  id: string;
  user: string;
  action: string;
  module: string;
  description: string;
  ipAddress: string;
  userAgent: string;
  dateTime: string;
};

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: "Active" | "Pending" | "Disabled";
  lastLogin: string;
  avatar: string;
};

export type NotificationRecord = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  priority: "High" | "Medium" | "Low";
  unread: boolean;
};

export type IntegrationSetting = {
  id: string;
  label: string;
  value: string;
  helper: string;
  status: IntegrationStatus;
  enabled: boolean;
  lastSync: string;
};

export type SiteSettings = {
  companyName: string;
  supportEmail: string;
  salesEmail: string;
  defaultMetaDescription: string;
  canonicalBaseUrl: string;
  autoSave: boolean;
  darkModeDefault: boolean;
};

export type SitemapState = {
  status: "Healthy" | "Needs review";
  lastGenerated: string;
  includedPages: number;
  includedBlogs: number;
  includedResources: number;
  priorityMode: "Balanced" | "Conversion-first";
  changeFrequency: "Daily" | "Weekly";
};

export type AdminSessionUser = Pick<UserRecord, "name" | "email" | "role" | "avatar">;

export type AdminStore = {
  content: ContentRecord[];
  seo: SeoRecord[];
  media: MediaAsset[];
  leads: LeadRecord[];
  newsletterSubscribers: NewsletterSubscriber[];
  emailCampaigns: EmailCampaign[];
  redirects: RedirectRecord[];
  brokenLinks: BrokenLink[];
  analytics: AnalyticsPoint[];
  devices: DeviceMetric[];
  seoDistribution: SeoDistribution[];
  topPages: TopPageMetric[];
  users: UserRecord[];
  activities: ActivityLog[];
  notifications: NotificationRecord[];
  integrations: IntegrationSetting[];
  siteSettings: SiteSettings;
  robotsTxt: string;
  sitemap: SitemapState;
};

export type AdminNavItem = {
  id: AdminModuleId;
  label: string;
  to: string;
  icon: LucideIcon;
  roles?: AdminRole[];
  children?: AdminNavItem[];
};

export type AdminNavGroup = {
  label: string;
  items: AdminNavItem[];
};
