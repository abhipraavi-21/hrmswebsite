export const ROUTES = {
  home: "/",
  hrmsHome: "/hrms",
  hrmsPricing: "/hrms/pricing",
  hrmsPricingPurchase: "/hrms/pricing/purchase",
  checkoutBase: "/checkout",
  customerAccess: "/account/access",
  dashboard: "/dashboard",
  dashboardBilling: "/dashboard/billing",
  paymentSuccess: "/payment/success",
  paymentFailed: "/payment/failed",
  hrmsContact: "/hrms/contact-us",
  roiCalculator: "/hrms/roi-calculator",
  coreHR: "/products/core-hr",
  attendance: "/products/attendance",
  attendanceManagement: "/products/attendance-management",
  payroll: "/products/payroll",
  leaveManagement: "/products/leave-management",
  mobileAppLanding: "/products/mobile-app-landing",
  recruitment: "/products/recruitment-ats",
  performance: "/products/performance-management",
  assetManagement: "/products/asset-management",
  assetManagementHome: "/asset-management",
  assetManagementAbout: "/asset-management/about-us",
  expenseManagement: "/products/expense-management",
  documentGeneration: "/products/document-generation",
  visitorManagement: "/products/document-generation",
  exitManagement: "/products/exit-management",
  employeeSelfService: "/products/employee-self-service",
  analytics: "/hr-analytics",
  automation: "/hr-automation",
  reports: "/hr-reports",
  security: "/hrms-security",
  workforce: "/products/workforce-management",
  industrySolutions: "/industry-solutions",
  integrations: "/integrations",
  businessApps: "/integrations/hr-business-applications",
  accounting: "/integrations/accounting",
  devicesApi: "/integrations/devices-api",
  bulkEmail: "/bulk-email",
  bulkEmailAbout: "/bulk-email/about-us",
  bulkEmailCampaigns: "/bulk-email/campaigns",
  bulkEmailTemplates: "/bulk-email/templates",
  bulkEmailContacts: "/bulk-email/contacts",
  bulkEmailAnalytics: "/bulk-email/analytics",
  bulkEmailAutomation: "/bulk-email/automation",
  bulkEmailScheduling: "/bulk-email/scheduling",
  bulkEmailSmtp: "/bulk-email/smtp",
  bulkEmailHrCommunication: "/bulk-email/hr-communication",
  bulkEmailMarketing: "/bulk-email/marketing",
  bulkEmailEducation: "/bulk-email/education",
  bulkEmailContact: "/bulk-email/contact-us",
  bulkEmailPricing: "/bulk-email/pricing",
  bulkEmailLearn: "/bulk-email/resources/learn",
  bulkEmailBlog: "/bulk-email/resources/blog",
  bulkEmailFaq: "/bulk-email/resources/faq",
  bulkEmailAssetManagement: "/bulk-email/asset-management",
  bulkEmailAssetDashboard: "/bulk-email/asset-management/dashboard",
  bulkEmailAssetTracking: "/bulk-email/asset-management/tracking",
  bulkEmailAssetQrCode: "/bulk-email/asset-management/qr-code",
  bulkEmailAssetMaintenance: "/bulk-email/asset-management/maintenance",
  bulkEmailAssetReports: "/bulk-email/asset-management/reports",
  learn: "/resources/learn",
  hrmsLearn: "/hrms/resources/learn",
  complianceGuides: "/resources/compliance-guides",
  hrmsComplianceGuides: "/hrms/resources/compliance-guides",
  blog: "/resources/blog",
  hrmsBlog: "/hrms/resources/blog",
  bulkEmailBlogPost: "/bulk-email/resources/blog/:slug",
  hrmsBlogPost: "/hrms/resources/blog/:slug",
  assetManagementBlogPost: "/asset-management/resources/blog/:slug",
  blogPost: "/resources/blog/:slug",
  faq: "/resources/faq",
  hrmsFaq: "/hrms/resources/faq",
  bulkEmailFaq: "/bulk-email/resources/faq",
  supportResources: "/resources/support",
  pricing: "/pricing",
  assetManagementLearn: "/asset-management/resources/learn",
  assetManagementGuide: "/asset-management/asset-management-guide",
  assetManagementBlog: "/asset-management/resources/blog",
  assetManagementFaq: "/asset-management/resources/faq",
  assetManagementContact: "/asset-management/contact-us",
  assetManagementPricing: "/asset-management/pricing",
  about: "/company/about-us",
  whyAltroz: "/company/why-altroz",
  customers: "/company/customers",
  testimonials: "/company/testimonials",
  partner: "/company/partner-with-us",
  careers: "/company/careers",
  contact: "/company/contact-us",
  support: "/company/help-center",
  bookDemo: "/company/book-demo",
  bulkEmailBroadcast: "/bulk-email/broadcast",
  privacyPolicy: "/legal/privacy-policy",
  termsAndConditions: "/legal/terms-and-conditions",
  cookiePolicy: "/legal/cookie-policy",
  sitemap: "/sitemap",
};

export const ROUTE_ALIASES = {
  "/about-us": ROUTES.about,
  "/altroz-hr": ROUTES.hrmsHome,
  "/hrms-home": ROUTES.hrmsHome,
  "/pricing": ROUTES.hrmsPricing,
  "/pricing/purchase": ROUTES.hrmsPricingPurchase,
  "/login": ROUTES.customerAccess,
  "/register": ROUTES.customerAccess,
  "/company/contact-us": ROUTES.hrmsContact,
  "/roi-calculator": ROUTES.roiCalculator,
  "/products/attendance": ROUTES.attendanceManagement,
  "/attendance-management": ROUTES.attendanceManagement,
  "/attendance": ROUTES.attendanceManagement,
  "/customers": ROUTES.customers,
  "/company/why-altoz": ROUTES.whyAltroz,
  "/careers": ROUTES.careers,
  "/integrations/asset-management": ROUTES.assetManagement,
  "/asset-management": ROUTES.assetManagement,
  "/asset-management/about-us": ROUTES.assetManagementAbout,
  "/about-asset-management": ROUTES.assetManagementAbout,
  "/asset-management/resources/learn": ROUTES.assetManagementLearn,
  "/asset-management/asset-management-guide": ROUTES.assetManagementGuide,
  "/asset-management/resources/blog": ROUTES.assetManagementBlog,
  "/asset-management/resources/faq": ROUTES.assetManagementFaq,
  "/asset-management/contact-us": ROUTES.assetManagementContact,
  "/asset-management/pricing": ROUTES.assetManagementPricing,
  "/integrations/business-apps": ROUTES.businessApps,
  "/integrations/hr-business-applications": ROUTES.businessApps,
  "/learn": ROUTES.learn,
  "/hrms/resources/learn": ROUTES.hrmsLearn,
  "/hrms/resources/blog": ROUTES.hrmsBlog,
  "/hrms/resources/faq": ROUTES.hrmsFaq,
  "/hrms/resources/compliance-guides": ROUTES.hrmsComplianceGuides,
  "/partner-with-us": ROUTES.partner,
  "/email-broadcast": ROUTES.bulkEmailBroadcast,
  "/bulk-email/about-us": ROUTES.bulkEmailAbout,
  "/about-bulk-email": ROUTES.bulkEmailAbout,
  "/bulk-email/email-broadcast": ROUTES.bulkEmailBroadcast,
  "/bulk-email/contacts": ROUTES.bulkEmailContact,
  "/bulk-email/campaigns": ROUTES.bulkEmail,
  "/bulk-email/pricing": ROUTES.bulkEmailPricing,
  "/bulk-email/resources/learn": ROUTES.bulkEmailLearn,
  "/bulk-email/resources/blog": ROUTES.bulkEmailBlog,
  "/bulk-email/resources/faq": ROUTES.bulkEmailFaq,
  "/bulk-email/asset-management": ROUTES.bulkEmailAssetManagement,
  "/bulk-email/asset-management/dashboard": ROUTES.bulkEmailAssetDashboard,
  "/bulk-email/asset-management/tracking": ROUTES.bulkEmailAssetTracking,
  "/bulk-email/asset-management/qr-code": ROUTES.bulkEmailAssetQrCode,
  "/bulk-email/asset-management/maintenance": ROUTES.bulkEmailAssetMaintenance,
  "/bulk-email/asset-management/reports": ROUTES.bulkEmailAssetReports,
  "/products/recruitment": ROUTES.recruitment,
  "/products/mobile-app-landing": ROUTES.mobileAppLanding,
  "/mobile-app-landing": ROUTES.mobileAppLanding,
  "/mobile-app": ROUTES.mobileAppLanding,
  "/products/visitor-management": ROUTES.documentGeneration,
  "/resources/learning": ROUTES.learn,
  "/resources/compliance-guides": ROUTES.complianceGuides,
  "/compliance-guides": ROUTES.complianceGuides,
  "/resources/blog": ROUTES.blog,
  "/blog": ROUTES.blog,
  "/resources/blog/what-is-hrms": `${ROUTES.blog}/what-is-hrms`,
  "/resources/faq": ROUTES.faq,
  "/faq": ROUTES.faq,
  "/company/support": ROUTES.support,
  "/help-center": ROUTES.support,
  "/solutions/industry": ROUTES.industrySolutions,
  "/solutions/workforce-management": ROUTES.workforce,
  "/why-altroz": ROUTES.whyAltroz,
};

export const INTERNAL_ROUTE_SET = new Set([
  ...Object.values(ROUTES),
  ...Object.keys(ROUTE_ALIASES),
]);

export function normalizePath(pathname = "/") {
  const withoutQuery = pathname.split("?")[0] ?? "/";
  const withoutHash = withoutQuery.split("#")[0] ?? "/";
  const trimmed = withoutHash.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export function normalizeHref(href = "") {
  if (!href) {
    return "";
  }

  if (href.startsWith("#")) {
    return "";
  }

  return normalizePath(href);
}

export function isExternalHref(href = "") {
  return /^(https?:|mailto:|tel:|whatsapp:)/i.test(href);
}

export function isInternalHref(href = "") {
  if (!href || isExternalHref(href)) {
    return false;
  }

  return href.startsWith("/") || href.startsWith("#");
}

export function getRedirectTarget(pathname = "/") {
  const normalized = normalizePath(pathname);
  return ROUTE_ALIASES[normalized] ?? null;
}
