import HomePage from "./pages/HomePage";
import CoreHrPage from "./pages/CoreHrPage";
import WorkforceManagementPage from "./pages/WorkforceManagementPage";
import AttendancePage from "./pages/AttendancePage";
import PayrollPage from "./pages/PayrollPage";
import LeaveManagementPage from "./pages/LeaveManagementPage";
import PerformanceManagementPage from "./pages/PerformanceManagementPage";
import IndustrySolutionsPage from "./pages/IndustrySolutionsPage";
import HrAnalyticsPage from "./pages/HrAnalyticsPage";
import HrAutomationPage from "./pages/HrAutomationPage";
import AttendanceManagementPage from "./pages/AttendanceManagementPage";
import ExpenseManagementPage from "./pages/ExpenseManagementPage";
import RecruitmentPage from "./pages/RecruitmentPage";
import VisitorManagementPage from "./pages/VisitorManagementPage";
import ExitManagementPage from "./pages/ExitManagementPage";
import EmployeeSelfServicePage from "./pages/EmployeeSelfServicePage";
import HrReportsPage from "./pages/HrReportsPage";
import HrSecurityPage from "./pages/HrSecurityPage";
import PricingPage from "./pages/PricingPage";
import BusinessAppsPage from "./pages/integrations/BusinessAppsPage";
import AccountingPage from "./pages/integrations/AccountingPage";
import AssetManagementPage from "./pages/integrations/AssetManagementPage";
import DevicesApiPage from "./pages/integrations/DevicesApiPage";
import LearnPage from "./pages/LearnPage";
import SupportPage from "./pages/resources/SupportPage";
import AboutUsPage from "./pages/company/AboutUsPage";
import WhyAltozPage from "./pages/company/WhyAltozPage";
import CustomersPage from "./pages/company/CustomersPage";
import TestimonialsPage from "./pages/company/TestimonialsPage";
import PartnerProgramPage from "./pages/company/PartnerProgramPage";
import PartnerWithUsPage from "./pages/company/PartnerWithUsPage";
import CareersPage from "./pages/company/CareersPage";
import ContactUsPage from "./pages/company/ContactUsPage";
import CompanySupportPage from "./pages/company/CompanySupportPage";
import BookDemoPage from "./pages/company/BookDemoPage";
import FreeDemoPopup from "./components/site/FreeDemoPopup";
import WhatsAppFloatingButton from "./components/site/WhatsAppFloatingButton";

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
      {page}
    </>
  );
}
