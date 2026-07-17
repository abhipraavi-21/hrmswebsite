export const ROUTES = {
  home: "/",
  coreHR: "/products/core-hr",
  attendance: "/products/attendance",
  attendanceManagement: "/products/attendance-management",
  payroll: "/products/payroll",
  leaveManagement: "/products/leave-management",
  recruitment: "/products/recruitment-ats",
  performance: "/products/performance-management",
  assetManagement: "/products/asset-management",
  expenseManagement: "/products/expense-management",
  visitorManagement: "/products/visitor-management",
  exitManagement: "/products/exit-management",
  employeeSelfService: "/products/employee-self-service",
  analytics: "/hr-analytics",
  automation: "/hr-automation",
  reports: "/hr-reports",
  security: "/hrms-security",
  workforce: "/products/workforce-management",
  industrySolutions: "/industry-solutions",
  integrations: "/integrations",
  businessApps: "/integrations/business-apps",
  accounting: "/integrations/accounting",
  devicesApi: "/integrations/devices-api",
  learn: "/resources/learn",
  supportResources: "/resources/support",
  pricing: "/pricing",
  about: "/company/about-us",
  whyAltroz: "/company/why-altroz",
  customers: "/company/customers",
  testimonials: "/company/testimonials",
  partner: "/company/partner-with-us",
  careers: "/company/careers",
  contact: "/company/contact-us",
  support: "/company/support",
  bookDemo: "/company/book-demo",
  privacyPolicy: "/legal/privacy-policy",
  termsAndConditions: "/legal/terms-and-conditions",
  cookiePolicy: "/legal/cookie-policy",
  sitemap: "/sitemap",
};

export const ROUTE_ALIASES = {
  "/about-us": ROUTES.about,
  "/attendance-management": ROUTES.attendanceManagement,
  "/customers": ROUTES.customers,
  "/company/why-altoz": ROUTES.whyAltroz,
  "/careers": ROUTES.careers,
  "/integrations/asset-management": ROUTES.assetManagement,
  "/learn": ROUTES.learn,
  "/partner-with-us": ROUTES.partner,
  "/products/recruitment": ROUTES.recruitment,
  "/resources/learning": ROUTES.learn,
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
