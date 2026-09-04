import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import ScrollRevealManager from "./components/site/ScrollRevealManager";
import ScrollToTop from "./components/site/ScrollToTop";
import WhatsAppFloatingButton from "./components/site/WhatsAppFloatingButton";
import AdminAppRedirect from "./components/site/AdminAppRedirect";
import GoogleAnalyticsTracker from "./components/site/GoogleAnalyticsTracker";
import {
  companyMenuColumns,
  emailLinks,
  featureMenuColumns,
  hrmsLinks,
  navItems,
  resourcesMenuItems,
  solutionMenuItems,
} from "./components/site/nav-data";
import { ROUTE_ALIASES, ROUTES } from "@/routes/routeConfig.js";
import { logRouteValidation, validateRouteReferences } from "@/utils/routeValidator.js";
import BlogPage from "./pages/resources/BlogPage";
import BlogArticlePage from "./pages/resources/BlogArticlePage";

const HomePage = lazy(() => import("./pages/HomePage"));
const HrmsHomePage = lazy(() => import("./pages/HrmsHomePage"));
const CoreHrPage = lazy(() => import("./pages/CoreHrPage"));
const WorkforceManagementPage = lazy(() => import("./pages/WorkforceManagementPage"));
const AttendanceManagementPage = lazy(() => import("./pages/AttendanceManagementPage"));
const PayrollPage = lazy(() => import("./pages/PayrollPage"));
const LeaveManagementPage = lazy(() => import("./pages/LeaveManagementPage"));
const MobileAppLandingPage = lazy(() => import("./pages/MobileAppLandingPage"));
const PerformanceManagementPage = lazy(() => import("./pages/PerformanceManagementPage"));
const IndustrySolutionsPage = lazy(() => import("./pages/IndustrySolutionsPage"));
const HrAnalyticsPage = lazy(() => import("./pages/HrAnalyticsPage"));
const HrAutomationPage = lazy(() => import("./pages/HrAutomationPage"));
const HrReportsPage = lazy(() => import("./pages/HrReportsPage"));
const HrSecurityPage = lazy(() => import("./pages/HrSecurityPage"));
const ExpenseManagementPage = lazy(() => import("./pages/ExpenseManagementPage"));
const RecruitmentPage = lazy(() => import("./pages/RecruitmentPage"));
const DocumentGenerationPage = lazy(() => import("./pages/DocumentGenerationPage"));
const ExitManagementPage = lazy(() => import("./pages/ExitManagementPage"));
const EmployeeSelfServicePage = lazy(() => import("./pages/EmployeeSelfServicePage"));
const RoiCalculatorPage = lazy(() => import("./pages/RoiCalculatorPage"));
const HrmsPricingPage = lazy(() => import("./pages/HrmsPricingPage"));
const HrmsPricingPurchasePage = lazy(() => import("./pages/HrmsPricingPurchasePage"));
const BulkEmailPricingPage = lazy(() => import("./pages/BulkEmailPricingPage"));
const AssetManagementPricingPage = lazy(() => import("./pages/AssetManagementPricingPage"));
const UnifiedCheckoutPage = lazy(() => import("./pages/UnifiedCheckoutPage"));
const CustomerAccessPage = lazy(() => import("./pages/CustomerAccessPage"));
const CustomerDashboardPage = lazy(() => import("./pages/CustomerDashboardPage"));
const CustomerProductDashboardPage = lazy(() => import("./pages/CustomerProductDashboardPage"));
const CustomerBillingHistoryPage = lazy(() => import("./pages/CustomerBillingHistoryPage"));
const PaymentStatusPage = lazy(() => import("./pages/PaymentStatusPage"));
const BulkEmailPage = lazy(() => import("./pages/BulkEmailPage"));
const BulkEmailAboutUsPage = lazy(() => import("./pages/bulk-email/BulkEmailAboutUsPage"));
const AssetManagementAboutUsPage = lazy(
  () => import("./pages/asset-management/AssetManagementAboutUsPage"),
);
const BulkEmailBroadcastPage = lazy(() => import("./pages/bulk-email/BulkEmailBroadcastPage"));
const BulkEmailAssetManagementPage = lazy(
  () => import("./pages/bulk-email/BulkEmailAssetManagementPage"),
);
const BulkEmailAssetDashboardPage = lazy(
  () => import("./pages/bulk-email/asset-management/BulkEmailAssetDashboardPage"),
);
const BulkEmailAssetTrackingPage = lazy(
  () => import("./pages/bulk-email/asset-management/BulkEmailAssetTrackingPage"),
);
const BulkEmailAssetQrCodePage = lazy(
  () => import("./pages/bulk-email/asset-management/BulkEmailAssetQrCodePage"),
);
const BulkEmailAssetMaintenancePage = lazy(
  () => import("./pages/bulk-email/asset-management/BulkEmailAssetMaintenancePage"),
);
const BulkEmailAssetReportsPage = lazy(
  () => import("./pages/bulk-email/asset-management/BulkEmailAssetReportsPage"),
);
const BulkEmailTemplatesPage = lazy(() => import("./pages/bulk-email/BulkEmailTemplatesPage"));
const BulkEmailContactsPage = lazy(() => import("./pages/bulk-email/BulkEmailContactsPage"));
const BulkEmailAnalyticsPage = lazy(() => import("./pages/bulk-email/BulkEmailAnalyticsPage"));
const BulkEmailAutomationPage = lazy(() => import("./pages/bulk-email/BulkEmailAutomationPage"));
const BulkEmailSchedulingPage = lazy(() => import("./pages/bulk-email/BulkEmailSchedulingPage"));
const BulkEmailSmtpPage = lazy(() => import("./pages/bulk-email/BulkEmailSmtpPage"));
const BulkEmailHrCommunicationPage = lazy(
  () => import("./pages/bulk-email/BulkEmailHrCommunicationPage"),
);
const BulkEmailMarketingPage = lazy(() => import("./pages/bulk-email/BulkEmailMarketingPage"));
const BulkEmailEducationPage = lazy(() => import("./pages/bulk-email/BulkEmailEducationPage"));
const AssetManagementContactPage = lazy(() => import("./pages/AssetManagementContactPage"));
const IntegrationsPage = lazy(() => import("./pages/integrations/IntegrationsPage"));
const BusinessAppsPage = lazy(() => import("./pages/integrations/BusinessAppsPage"));
const AccountingPage = lazy(() => import("./pages/integrations/AccountingPage"));
const AssetManagementPage = lazy(() => import("./pages/integrations/AssetManagementPage"));
const DevicesApiPage = lazy(() => import("./pages/integrations/DevicesApiPage"));
const LearnPage = lazy(() => import("./pages/LearnPage"));
const AssetManagementGuidePage = lazy(() => import("./pages/AssetManagementGuidePage"));
const FaqPage = lazy(() => import("./pages/resources/FaqPage"));
const SupportPage = lazy(() => import("./pages/resources/SupportPage"));
const ComplianceGuidesPage = lazy(() => import("./pages/resources/ComplianceGuidesPage"));
const VideoPage = lazy(() => import("./pages/resources/VideoPage"));
const AboutUsPage = lazy(() => import("./pages/company/AboutUsPage"));
const WhyAltrozPage = lazy(() => import("./pages/company/WhyAltozPage"));
const CustomersPage = lazy(() => import("./pages/company/CustomersPage"));
const TestimonialsPage = lazy(() => import("./pages/company/TestimonialsPage"));
const PartnerProgramPage = lazy(() => import("./pages/company/PartnerProgramPage"));
const PartnerWithUsPage = lazy(() => import("./pages/company/PartnerWithUsPage"));
const CareersPage = lazy(() => import("./pages/company/CareersPage"));
const ContactUsPage = lazy(() => import("./pages/company/ContactUsPage"));
const CompanySupportPage = lazy(() => import("./pages/company/CompanySupportPage"));
const BookDemoPage = lazy(() => import("./pages/company/BookDemoPage"));
const HrmsBookDemoPage = lazy(() => import("./pages/company/HrmsBookDemoPage"));
const BulkEmailBookDemoPage = lazy(
  () => import("./pages/bulk-email/BulkEmailBookDemoPage"),
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

function LegacyHrmsBlogPostRedirect() {
  const { slug } = useParams();

  return <Navigate to={`${ROUTES.hrmsBlog}/${slug ?? ""}`} replace />;
}

const routeReferences = [
  ...featureMenuColumns.flatMap((column) =>
    column.links.map((link) => ({
      label: link.label,
      href: link.href,
      source: `Feature menu > ${column.title}`,
    })),
  ),
  ...solutionMenuItems.map((link) => ({
    label: link.label,
    href: link.href,
    source: "Solutions menu",
  })),
  ...resourcesMenuItems.map((link) => ({
    label: link.label,
    href: link.href,
    source: "Resources menu",
  })),
  ...companyMenuColumns.flatMap((column) =>
    column.links.map((link) => ({
      label: link.label,
      href: link.href,
      source: `Company menu > ${column.title}`,
    })),
  ),
  ...navItems.map((link) => ({
    label: link.label,
    href: link.href,
    source: "Top nav",
  })),
  ...hrmsLinks.map((link) => ({
    label: link.label,
    href: link.href,
    source: "HRMS menu",
  })),
  ...emailLinks.map((link) => ({
    label: link.label,
    href: link.href,
    source: "Email menu",
  })),
];

function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === ROUTES.home;

  useEffect(() => {
    if (!import.meta.env.DEV) {
      return;
    }

    const report = validateRouteReferences(routeReferences);
    logRouteValidation(report, "Altroz HRMS route audit");
  }, []);

  useEffect(() => {
    sessionStorage.setItem("altroz:last-path", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const lastPath = sessionStorage.getItem("altroz:last-path");

    if (isHomePage && lastPath && lastPath !== ROUTES.home) {
      navigate(lastPath, { replace: true });
    }
  }, [isHomePage, navigate]);

  return (
    <>
      <GoogleAnalyticsTracker />
      <WhatsAppFloatingButton />
      <ScrollRevealManager />
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="grid min-h-screen place-items-center bg-background text-sm text-ink-soft">
            Loading page...
          </div>
        }
      >
        <Routes>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.hrmsHome} element={<HrmsHomePage />} />
          <Route path={ROUTES.coreHR} element={<CoreHrPage />} />
          <Route
            path={ROUTES.attendance}
            element={<Navigate to={ROUTES.attendanceManagement} replace />}
          />
          <Route path={ROUTES.attendanceManagement} element={<AttendanceManagementPage />} />
          <Route path={ROUTES.workforce} element={<WorkforceManagementPage />} />
          <Route path={ROUTES.payroll} element={<PayrollPage />} />
          <Route path={ROUTES.leaveManagement} element={<LeaveManagementPage />} />
          <Route path={ROUTES.mobileAppLanding} element={<MobileAppLandingPage />} />
          <Route path={ROUTES.performance} element={<PerformanceManagementPage />} />
          <Route path={ROUTES.industrySolutions} element={<IndustrySolutionsPage />} />
          <Route path={ROUTES.analytics} element={<HrAnalyticsPage />} />
          <Route path={ROUTES.automation} element={<HrAutomationPage />} />
          <Route path={ROUTES.reports} element={<HrReportsPage />} />
          <Route path={ROUTES.security} element={<HrSecurityPage />} />
          <Route path={ROUTES.expenseManagement} element={<ExpenseManagementPage />} />
          <Route path={ROUTES.recruitment} element={<RecruitmentPage />} />
          <Route path={ROUTES.documentGeneration} element={<DocumentGenerationPage />} />
          <Route path={ROUTES.exitManagement} element={<ExitManagementPage />} />
          <Route path={ROUTES.employeeSelfService} element={<EmployeeSelfServicePage />} />
          <Route path={ROUTES.roiCalculator} element={<RoiCalculatorPage />} />
          <Route path={ROUTES.hrmsPricing} element={<HrmsPricingPage />} />
          <Route path={ROUTES.hrmsPricingPurchase} element={<HrmsPricingPurchasePage />} />
          <Route path={`${ROUTES.checkoutBase}/:productSlug`} element={<UnifiedCheckoutPage />} />
          <Route path={ROUTES.customerAccess} element={<CustomerAccessPage />} />
          <Route path={ROUTES.dashboard} element={<CustomerDashboardPage />} />
          <Route path={ROUTES.dashboardBilling} element={<CustomerBillingHistoryPage />} />
          <Route
            path={`${ROUTES.dashboard}/:productSlug`}
            element={<CustomerProductDashboardPage />}
          />
          <Route path={ROUTES.paymentSuccess} element={<PaymentStatusPage />} />
          <Route path={ROUTES.paymentFailed} element={<PaymentStatusPage />} />
          <Route path={ROUTES.pricing} element={<Navigate to={ROUTES.hrmsPricing} replace />} />
          <Route path={ROUTES.bulkEmailBroadcast} element={<BulkEmailBroadcastPage />} />
          <Route path={ROUTES.bulkEmail} element={<BulkEmailPage />} />
          <Route path={ROUTES.bulkEmailAbout} element={<BulkEmailAboutUsPage />} />
          <Route path={ROUTES.bulkEmailPricing} element={<BulkEmailPricingPage />} />
          <Route
            path={ROUTES.bulkEmailCampaigns}
            element={<Navigate to={ROUTES.bulkEmail} replace />}
          />
          <Route
            path={ROUTES.bulkEmailAssetManagement}
            element={<BulkEmailAssetManagementPage />}
          />
          <Route path={ROUTES.bulkEmailAssetDashboard} element={<BulkEmailAssetDashboardPage />} />
          <Route path={ROUTES.bulkEmailAssetTracking} element={<BulkEmailAssetTrackingPage />} />
          <Route path={ROUTES.bulkEmailAssetQrCode} element={<BulkEmailAssetQrCodePage />} />
          <Route
            path={ROUTES.bulkEmailAssetMaintenance}
            element={<BulkEmailAssetMaintenancePage />}
          />
          <Route path={ROUTES.bulkEmailAssetReports} element={<BulkEmailAssetReportsPage />} />
          <Route path={ROUTES.bulkEmailTemplates} element={<BulkEmailTemplatesPage />} />
          <Route path={ROUTES.bulkEmailContact} element={<BulkEmailContactsPage />} />
          <Route
            path={ROUTES.bulkEmailContacts}
            element={<Navigate to={ROUTES.bulkEmailContact} replace />}
          />
          <Route path={ROUTES.bulkEmailAnalytics} element={<BulkEmailAnalyticsPage />} />
          <Route path={ROUTES.bulkEmailAutomation} element={<BulkEmailAutomationPage />} />
          <Route path={ROUTES.bulkEmailScheduling} element={<BulkEmailSchedulingPage />} />
          <Route path={ROUTES.bulkEmailSmtp} element={<BulkEmailSmtpPage />} />
          <Route
            path={ROUTES.bulkEmailHrCommunication}
            element={<BulkEmailHrCommunicationPage />}
          />
          <Route path={ROUTES.bulkEmailBookDemo} element={<BulkEmailBookDemoPage />} />
          <Route path={ROUTES.bulkEmailMarketing} element={<BulkEmailMarketingPage />} />
          <Route path={ROUTES.bulkEmailEducation} element={<BulkEmailEducationPage />} />
          <Route path={ROUTES.integrations} element={<IntegrationsPage />} />
          <Route path={ROUTES.businessApps} element={<BusinessAppsPage />} />
          <Route path={ROUTES.accounting} element={<AccountingPage />} />
          <Route path={ROUTES.assetManagementHome} element={<AssetManagementPage />} />
          <Route path={ROUTES.assetManagementAbout} element={<AssetManagementAboutUsPage />} />
          <Route path={ROUTES.devicesApi} element={<DevicesApiPage />} />
          <Route path={ROUTES.learn} element={<Navigate to={ROUTES.hrmsLearn} replace />} />
          <Route path={ROUTES.hrmsLearn} element={<LearnPage />} />
          <Route path={ROUTES.video} element={<Navigate to={ROUTES.hrmsVideo} replace />} />
          <Route path={ROUTES.hrmsVideo} element={<VideoPage />} />
          <Route path={ROUTES.bulkEmailLearn} element={<LearnPage />} />
          <Route path={ROUTES.assetManagementLearn} element={<LearnPage />} />
          <Route path={ROUTES.blog} element={<Navigate to={ROUTES.hrmsBlog} replace />} />
          <Route
            path={`${ROUTES.blog}/:slug`}
            element={<LegacyHrmsBlogPostRedirect />}
          />
          <Route path={ROUTES.hrmsBlog} element={<BlogPage />} />
          <Route path={ROUTES.bulkEmailBlog} element={<BlogPage />} />
          <Route path={ROUTES.assetManagementBlog} element={<BlogPage />} />
          <Route path={ROUTES.hrmsBlogPost} element={<BlogArticlePage />} />
          <Route path={ROUTES.bulkEmailBlogPost} element={<BlogArticlePage />} />
          <Route path={ROUTES.assetManagementBlogPost} element={<BlogArticlePage />} />
          <Route path={ROUTES.faq} element={<Navigate to={ROUTES.hrmsFaq} replace />} />
          <Route path={ROUTES.hrmsFaq} element={<FaqPage />} />
          <Route path={ROUTES.bulkEmailFaq} element={<FaqPage />} />
          <Route path={ROUTES.assetManagementFaq} element={<FaqPage />} />
          <Route
            path={ROUTES.complianceGuides}
            element={<Navigate to={ROUTES.hrmsComplianceGuides} replace />}
          />
          <Route path={ROUTES.hrmsComplianceGuides} element={<ComplianceGuidesPage />} />
          <Route path={ROUTES.supportResources} element={<SupportPage />} />
          <Route path={ROUTES.assetManagementGuide} element={<AssetManagementGuidePage />} />
          <Route path={ROUTES.assetManagementPricing} element={<AssetManagementPricingPage />} />
          <Route path={ROUTES.about} element={<AboutUsPage />} />
          <Route path={ROUTES.whyAltroz} element={<WhyAltrozPage />} />
          <Route path={ROUTES.customers} element={<CustomersPage />} />
          <Route path={ROUTES.testimonials} element={<TestimonialsPage />} />
          <Route path={ROUTES.partner} element={<PartnerWithUsPage />} />
          <Route path={ROUTES.careers} element={<CareersPage />} />
          <Route path={ROUTES.hrmsContact} element={<ContactUsPage />} />
          <Route path={ROUTES.assetManagementContact} element={<AssetManagementContactPage />} />
          <Route path={ROUTES.support} element={<CompanySupportPage />} />
          <Route path={ROUTES.assetManagementBookDemo} element={<BookDemoPage />} />
          <Route path={ROUTES.bookDemo} element={<HrmsBookDemoPage />} />

          {Object.entries(ROUTE_ALIASES)
            .filter(([legacyPath, targetPath]) => legacyPath !== targetPath && !legacyPath.includes(":"))
            .map(([legacyPath, targetPath]) => (
              <Route
                key={`legacy-${legacyPath}`}
                path={legacyPath}
                element={<Navigate to={targetPath} replace />}
              />
            ))}
          <Route path={`${ROUTES.blog}/:slug`} element={<LegacyHrmsBlogPostRedirect />} />
          <Route path="/blog/:slug" element={<LegacyHrmsBlogPostRedirect />} />
          <Route path="/admin/*" element={<AdminAppRedirect />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
