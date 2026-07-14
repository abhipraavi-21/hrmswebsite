import { lazy, Suspense } from "react";
import FreeDemoPopup from "./components/site/FreeDemoPopup";
import WhatsAppFloatingButton from "./components/site/WhatsAppFloatingButton";

const HomePage = lazy(() => import("./pages/HomePage"));
const CoreHrPage = lazy(() => import("./pages/CoreHrPage"));
const WorkforceManagementPage = lazy(() => import("./pages/WorkforceManagementPage"));
const AttendancePage = lazy(() => import("./pages/AttendancePage"));
const PayrollPage = lazy(() => import("./pages/PayrollPage"));
const LeaveManagementPage = lazy(() => import("./pages/LeaveManagementPage"));
const PerformanceManagementPage = lazy(() => import("./pages/PerformanceManagementPage"));
const IndustrySolutionsPage = lazy(() => import("./pages/IndustrySolutionsPage"));
const HrAnalyticsPage = lazy(() => import("./pages/HrAnalyticsPage"));
const HrAutomationPage = lazy(() => import("./pages/HrAutomationPage"));
const AttendanceManagementPage = lazy(() => import("./pages/AttendanceManagementPage"));
const ExpenseManagementPage = lazy(() => import("./pages/ExpenseManagementPage"));
const RecruitmentPage = lazy(() => import("./pages/RecruitmentPage"));
const VisitorManagementPage = lazy(() => import("./pages/VisitorManagementPage"));
const ExitManagementPage = lazy(() => import("./pages/ExitManagementPage"));
const EmployeeSelfServicePage = lazy(() => import("./pages/EmployeeSelfServicePage"));
const HrReportsPage = lazy(() => import("./pages/HrReportsPage"));
const HrSecurityPage = lazy(() => import("./pages/HrSecurityPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const BusinessAppsPage = lazy(() => import("./pages/integrations/BusinessAppsPage"));
const AccountingPage = lazy(() => import("./pages/integrations/AccountingPage"));
const AssetManagementPage = lazy(() => import("./pages/integrations/AssetManagementPage"));
const DevicesApiPage = lazy(() => import("./pages/integrations/DevicesApiPage"));
const LearnPage = lazy(() => import("./pages/LearnPage"));
const SupportPage = lazy(() => import("./pages/resources/SupportPage"));
const AboutUsPage = lazy(() => import("./pages/company/AboutUsPage"));
const WhyAltozPage = lazy(() => import("./pages/company/WhyAltozPage"));
const CustomersPage = lazy(() => import("./pages/company/CustomersPage"));
const TestimonialsPage = lazy(() => import("./pages/company/TestimonialsPage"));
const PartnerProgramPage = lazy(() => import("./pages/company/PartnerProgramPage"));
const PartnerWithUsPage = lazy(() => import("./pages/company/PartnerWithUsPage"));
const CareersPage = lazy(() => import("./pages/company/CareersPage"));
const ContactUsPage = lazy(() => import("./pages/company/ContactUsPage"));
const CompanySupportPage = lazy(() => import("./pages/company/CompanySupportPage"));
const BookDemoPage = lazy(() => import("./pages/company/BookDemoPage"));

function normalizePath(pathname: string) {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export default function App() {
  const pathname = normalizePath(window.location.pathname);
  const isHomePage = pathname === "/";
  let page = <HomePage />;

  if (pathname === "/products/core-hr") {
    page = <CoreHrPage />;
  } else if (pathname === "/products/attendance") {
    page = <AttendancePage />;
  } else if (pathname === "/products/workforce-management") {
    page = <WorkforceManagementPage />;
  } else if (pathname === "/products/payroll") {
    page = <PayrollPage />;
  } else if (pathname === "/products/leave-management") {
    page = <LeaveManagementPage />;
  } else if (pathname === "/products/performance-management") {
    page = <PerformanceManagementPage />;
  } else if (pathname === "/industry-solutions") {
    page = <IndustrySolutionsPage />;
  } else if (pathname === "/attendance-management") {
    page = <AttendanceManagementPage />;
  } else if (pathname === "/hr-analytics") {
    page = <HrAnalyticsPage />;
  } else if (pathname === "/hr-automation") {
    page = <HrAutomationPage />;
  } else if (pathname === "/hr-reports") {
    page = <HrReportsPage />;
  } else if (pathname === "/hrms-security") {
    page = <HrSecurityPage />;
  } else if (pathname === "/products/expense-management") {
    page = <ExpenseManagementPage />;
  } else if (pathname === "/products/recruitment-ats") {
    page = <RecruitmentPage />;
  } else if (pathname === "/products/visitor-management") {
    page = <VisitorManagementPage />;
  } else if (pathname === "/products/exit-management") {
    page = <ExitManagementPage />;
  } else if (pathname === "/products/employee-self-service") {
    page = <EmployeeSelfServicePage />;
  } else if (pathname === "/pricing" || pathname === "/integrations") {
    page = <PricingPage />;
  } else if (pathname === "/integrations/business-apps") {
    page = <BusinessAppsPage />;
  } else if (pathname === "/integrations/accounting") {
    page = <AccountingPage />;
  } else if (pathname === "/integrations/asset-management") {
    page = <AssetManagementPage />;
  } else if (pathname === "/integrations/devices-api") {
    page = <DevicesApiPage />;
  } else if (pathname === "/learn" || pathname === "/resources/learning") {
    page = <LearnPage />;
  } else if (pathname === "/resources/support") {
    page = <SupportPage />;
  } else if (pathname === "/about-us" || pathname === "/company/about-us") {
    page = <AboutUsPage />;
  } else if (pathname === "/why-altroz" || pathname === "/company/why-altoz") {
    page = <WhyAltozPage />;
  } else if (pathname === "/customers" || pathname === "/company/customers") {
    page = <CustomersPage />;
  } else if (pathname === "/company/testimonials") {
    page = <TestimonialsPage />;
  } else if (pathname === "/company/partner-program") {
    page = <PartnerProgramPage />;
  } else if (pathname === "/partner-with-us" || pathname === "/company/partner-with-us") {
    page = <PartnerWithUsPage />;
  } else if (pathname === "/careers" || pathname === "/company/careers") {
    page = <CareersPage />;
  } else if (pathname === "/company/contact-us") {
    page = <ContactUsPage />;
  } else if (pathname === "/company/support") {
    page = <CompanySupportPage />;
  } else if (pathname === "/company/book-demo") {
    page = <BookDemoPage />;
  }

  return (
    <>
      {isHomePage ? <FreeDemoPopup /> : null}
      <WhatsAppFloatingButton />
      <Suspense
        fallback={
          <div className="grid min-h-screen place-items-center bg-background text-sm text-ink-soft">
            Loading page...
          </div>
        }
      >
        {page}
      </Suspense>
    </>
  );
}
