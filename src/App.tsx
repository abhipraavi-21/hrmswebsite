import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import FreeDemoPopup from "./components/site/FreeDemoPopup";
import ScrollRevealManager from "./components/site/ScrollRevealManager";
import ScrollToTop from "./components/site/ScrollToTop";
import WhatsAppFloatingButton from "./components/site/WhatsAppFloatingButton";
import {
  companyMenuColumns,
  emailLinks,
  featureMenuColumns,
  hrmsLinks,
  navItems,
  resourcesMenuItems,
  solutionMenuItems,
} from "./components/site/nav-data";
import { ROUTES } from "@/routes/routeConfig.js";
import { logRouteValidation, validateRouteReferences } from "@/utils/routeValidator.js";

const HomePage = lazy(() => import("./pages/HomePage"));
const CoreHrPage = lazy(() => import("./pages/CoreHrPage"));
const WorkforceManagementPage = lazy(() => import("./pages/WorkforceManagementPage"));
const AttendancePage = lazy(() => import("./pages/AttendancePage"));
const AttendanceManagementPage = lazy(() => import("./pages/AttendanceManagementPage"));
const PayrollPage = lazy(() => import("./pages/PayrollPage"));
const LeaveManagementPage = lazy(() => import("./pages/LeaveManagementPage"));
const PerformanceManagementPage = lazy(() => import("./pages/PerformanceManagementPage"));
const IndustrySolutionsPage = lazy(() => import("./pages/IndustrySolutionsPage"));
const HrAnalyticsPage = lazy(() => import("./pages/HrAnalyticsPage"));
const HrAutomationPage = lazy(() => import("./pages/HrAutomationPage"));
const HrReportsPage = lazy(() => import("./pages/HrReportsPage"));
const HrSecurityPage = lazy(() => import("./pages/HrSecurityPage"));
const ExpenseManagementPage = lazy(() => import("./pages/ExpenseManagementPage"));
const RecruitmentPage = lazy(() => import("./pages/RecruitmentPage"));
const VisitorManagementPage = lazy(() => import("./pages/VisitorManagementPage"));
const ExitManagementPage = lazy(() => import("./pages/ExitManagementPage"));
const EmployeeSelfServicePage = lazy(() => import("./pages/EmployeeSelfServicePage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const BulkEmailPage = lazy(() => import("./pages/BulkEmailPage"));
const BulkEmailCampaignsPage = lazy(() => import("./pages/bulk-email/BulkEmailCampaignsPage"));
const BulkEmailTemplatesPage = lazy(() => import("./pages/bulk-email/BulkEmailTemplatesPage"));
const BulkEmailContactsPage = lazy(() => import("./pages/bulk-email/BulkEmailContactsPage"));
const BulkEmailAnalyticsPage = lazy(() => import("./pages/bulk-email/BulkEmailAnalyticsPage"));
const BulkEmailAutomationPage = lazy(() => import("./pages/bulk-email/BulkEmailAutomationPage"));
const IntegrationsPage = lazy(() => import("./pages/integrations/IntegrationsPage"));
const BusinessAppsPage = lazy(() => import("./pages/integrations/BusinessAppsPage"));
const AccountingPage = lazy(() => import("./pages/integrations/AccountingPage"));
const AssetManagementPage = lazy(() => import("./pages/integrations/AssetManagementPage"));
const DevicesApiPage = lazy(() => import("./pages/integrations/DevicesApiPage"));
const LearnPage = lazy(() => import("./pages/LearnPage"));
const SupportPage = lazy(() => import("./pages/resources/SupportPage"));
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
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

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
  const isHomePage = location.pathname === ROUTES.home;

  useEffect(() => {
    if (!import.meta.env.DEV) {
      return;
    }

    const report = validateRouteReferences(routeReferences);
    logRouteValidation(report, "Altroz HRMS route audit");
  }, []);

  return (
    <>
      {isHomePage ? <FreeDemoPopup /> : null}
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
          <Route path={ROUTES.coreHR} element={<CoreHrPage />} />
          <Route path={ROUTES.attendance} element={<AttendancePage />} />
          <Route path={ROUTES.attendanceManagement} element={<AttendanceManagementPage />} />
          <Route path={ROUTES.payroll} element={<PayrollPage />} />
          <Route path={ROUTES.leaveManagement} element={<LeaveManagementPage />} />
          <Route path={ROUTES.performance} element={<PerformanceManagementPage />} />
          <Route path={ROUTES.industrySolutions} element={<IndustrySolutionsPage />} />
          <Route path={ROUTES.analytics} element={<HrAnalyticsPage />} />
          <Route path={ROUTES.automation} element={<HrAutomationPage />} />
          <Route path={ROUTES.reports} element={<HrReportsPage />} />
          <Route path={ROUTES.security} element={<HrSecurityPage />} />
          <Route path={ROUTES.expenseManagement} element={<ExpenseManagementPage />} />
          <Route path={ROUTES.recruitment} element={<RecruitmentPage />} />
          <Route path={ROUTES.visitorManagement} element={<VisitorManagementPage />} />
          <Route path={ROUTES.exitManagement} element={<ExitManagementPage />} />
          <Route path={ROUTES.employeeSelfService} element={<EmployeeSelfServicePage />} />
          <Route path={ROUTES.pricing} element={<PricingPage />} />
          <Route path={ROUTES.bulkEmail} element={<BulkEmailPage />} />
          <Route path={ROUTES.bulkEmailCampaigns} element={<BulkEmailCampaignsPage />} />
          <Route path={ROUTES.bulkEmailTemplates} element={<BulkEmailTemplatesPage />} />
          <Route path={ROUTES.bulkEmailContacts} element={<BulkEmailContactsPage />} />
          <Route path={ROUTES.bulkEmailAnalytics} element={<BulkEmailAnalyticsPage />} />
          <Route path={ROUTES.bulkEmailAutomation} element={<BulkEmailAutomationPage />} />
          <Route path={ROUTES.integrations} element={<IntegrationsPage />} />
          <Route path={ROUTES.businessApps} element={<BusinessAppsPage />} />
          <Route path={ROUTES.accounting} element={<AccountingPage />} />
          <Route path={ROUTES.assetManagement} element={<AssetManagementPage />} />
          <Route path={ROUTES.devicesApi} element={<DevicesApiPage />} />
          <Route path={ROUTES.learn} element={<LearnPage />} />
          <Route path={ROUTES.supportResources} element={<SupportPage />} />
          <Route path={ROUTES.about} element={<AboutUsPage />} />
          <Route path={ROUTES.whyAltroz} element={<WhyAltrozPage />} />
          <Route path={ROUTES.customers} element={<CustomersPage />} />
          <Route path={ROUTES.testimonials} element={<TestimonialsPage />} />
          <Route path={ROUTES.partner} element={<PartnerWithUsPage />} />
          <Route path={ROUTES.careers} element={<CareersPage />} />
          <Route path={ROUTES.contact} element={<ContactUsPage />} />
          <Route path={ROUTES.support} element={<CompanySupportPage />} />
          <Route path={ROUTES.bookDemo} element={<BookDemoPage />} />

          <Route path="/about-us" element={<Navigate to={ROUTES.about} replace />} />
          <Route
            path="/attendance-management"
            element={<Navigate to={ROUTES.attendanceManagement} replace />}
          />
          <Route path="/careers" element={<Navigate to={ROUTES.careers} replace />} />
          <Route path="/company/why-altoz" element={<Navigate to={ROUTES.whyAltroz} replace />} />
          <Route path="/customers" element={<Navigate to={ROUTES.customers} replace />} />
          <Route
            path="/integrations/asset-management"
            element={<Navigate to={ROUTES.assetManagement} replace />}
          />
          <Route path="/learn" element={<Navigate to={ROUTES.learn} replace />} />
          <Route path="/partner-with-us" element={<Navigate to={ROUTES.partner} replace />} />
          <Route
            path="/products/recruitment"
            element={<Navigate to={ROUTES.recruitment} replace />}
          />
          <Route path="/resources/learning" element={<Navigate to={ROUTES.learn} replace />} />
          <Route
            path="/solutions/industry"
            element={<Navigate to={ROUTES.industrySolutions} replace />}
          />
          <Route
            path="/solutions/workforce-management"
            element={<Navigate to={ROUTES.workforce} replace />}
          />
          <Route path="/why-altroz" element={<Navigate to={ROUTES.whyAltroz} replace />} />

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
