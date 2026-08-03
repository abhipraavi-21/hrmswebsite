export const ROUTES = {
  home: "/",
  hrmsHome: "/hrms",
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
  bulkEmailAssetManagement: "/bulk-email/asset-management",
  bulkEmailAssetDashboard: "/bulk-email/asset-management/dashboard",
  bulkEmailAssetTracking: "/bulk-email/asset-management/tracking",
  bulkEmailAssetQrCode: "/bulk-email/asset-management/qr-code",
  bulkEmailAssetMaintenance: "/bulk-email/asset-management/maintenance",
  bulkEmailAssetReports: "/bulk-email/asset-management/reports",
  learn: "/resources/learn",
  complianceGuides: "/resources/compliance-guides",
  blog: "/resources/blog",
  blogPost: "/resources/blog/:slug",
  faq: "/resources/faq",
  supportResources: "/resources/support",
  pricing: "/pricing",
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
  "/roi-calculator": ROUTES.roiCalculator,
  "/products/attendance": ROUTES.attendanceManagement,
  "/attendance-management": ROUTES.attendanceManagement,
  "/attendance": ROUTES.attendanceManagement,
  "/customers": ROUTES.customers,
  "/company/why-altoz": ROUTES.whyAltroz,
  "/careers": ROUTES.careers,
  "/integrations/asset-management": ROUTES.assetManagement,
  "/asset-management": ROUTES.assetManagement,
  "/integrations/business-apps": ROUTES.businessApps,
  "/integrations/hr-business-applications": ROUTES.businessApps,
  "/learn": ROUTES.learn,
  "/partner-with-us": ROUTES.partner,
  "/email-broadcast": ROUTES.bulkEmailBroadcast,
  "/bulk-email/email-broadcast": ROUTES.bulkEmailBroadcast,
  "/bulk-email/campaigns": ROUTES.bulkEmail,
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
