import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminLayout } from "./layouts/AdminLayout";
import { ChangePasswordPage } from "./pages/ChangePasswordPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { BillingCatalogPage } from "./pages/billing/BillingCatalogPage";
import { BillingCustomersPage } from "./pages/billing/BillingCustomersPage";
import { BillingDashboardPage } from "./pages/billing/BillingDashboardPage";
import { BillingInvoicesPage } from "./pages/billing/BillingInvoicesPage";
import { BillingPaymentsPage } from "./pages/billing/BillingPaymentsPage";
import { BillingSubscriptionsPage } from "./pages/billing/BillingSubscriptionsPage";
import { BlogPostsManagerPage } from "./pages/cms/BlogPostsManagerPage";
import { PageEditorPage } from "./pages/cms/PageEditorPage";
import { PagesOverviewPage } from "./pages/cms/PagesOverviewPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SubscriptionsPage } from "./pages/SubscriptionsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<BillingDashboardPage />} />
          <Route path="/billing" element={<BillingDashboardPage />} />
          <Route path="/billing/customers" element={<BillingCustomersPage />} />
          <Route path="/billing/catalog" element={<BillingCatalogPage />} />
          <Route path="/billing/subscriptions" element={<BillingSubscriptionsPage />} />
          <Route path="/billing/payments" element={<BillingPaymentsPage />} />
          <Route path="/billing/invoices" element={<BillingInvoicesPage />} />
          <Route path="/billing/purchase-orders" element={<SubscriptionsPage />} />
          <Route path="/pages" element={<PagesOverviewPage />} />
          <Route path="/pages/:pageKey" element={<PageEditorPage />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/blog-posts" element={<BlogPostsManagerPage />} />
          <Route path="/blog-posts/:blogGroup" element={<BlogPostsManagerPage />} />
          <Route path="/resources" element={<Navigate to="/pages" replace />} />
          <Route path="/pricing" element={<Navigate to="/pages/pricing" replace />} />
          <Route path="/media" element={<Navigate to="/pages" replace />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
