import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import AdminBlogManagementPage from "@/admin/BlogManagementPage";
import { canAccessModule } from "@/admin/config";
import { AccessDeniedState, AdminShell } from "@/admin/components/AdminShell";
import {
  AdminActivityPage,
  AdminAnalyticsPage,
  AdminBulkEmailPage,
  AdminContentWorkspacePage,
  AdminDashboardPage,
  AdminInboxPage,
  AdminIntegrationsPage,
  AdminLoginPage,
  AdminMediaPage,
  AdminSeoPage,
  AdminSettingsPage,
  AdminTechnicalSeoPage,
  AdminUsersPage,
  AdminWebsiteContentPage,
} from "@/admin/pages";
import { AdminProvider, useAdminStore } from "@/admin/store";
import type { AdminModuleId, ContentType } from "@/admin/types";
import { Toaster } from "@/components/ui/sonner";
import { ROUTES } from "@/routes/routeConfig.js";

function toAdminChildPath(path: string) {
  return path.replace(`${ROUTES.admin}/`, "");
}

function RequireAdminSession({ children }: { children: React.ReactNode }) {
  const { sessionUser } = useAdminStore();
  return sessionUser ? <>{children}</> : <Navigate to={ROUTES.adminLogin} replace />;
}

function AdminLandingRedirect() {
  const { sessionUser } = useAdminStore();
  return <Navigate to={sessionUser ? ROUTES.adminDashboard : ROUTES.adminLogin} replace />;
}

function ProtectedModule({
  children,
  moduleId,
}: {
  children: React.ReactNode;
  moduleId: AdminModuleId;
}) {
  const { sessionUser } = useAdminStore();

  if (!sessionUser) {
    return <Navigate to={ROUTES.adminLogin} replace />;
  }

  if (!canAccessModule(sessionUser.role, moduleId)) {
    return <AccessDeniedState moduleId={moduleId} />;
  }

  return <>{children}</>;
}

function ContentModuleRoute({ type, moduleId }: { type: ContentType; moduleId: AdminModuleId }) {
  return (
    <ProtectedModule moduleId={moduleId}>
      <AdminContentWorkspacePage type={type} />
    </ProtectedModule>
  );
}

function ProtectedShell() {
  return (
    <RequireAdminSession>
      <AdminShell>
        <Outlet />
      </AdminShell>
    </RequireAdminSession>
  );
}

export default function AdminApp() {
  return (
    <AdminProvider>
      <Toaster position="top-right" />
      <Routes>
        <Route index element={<AdminLandingRedirect />} />
        <Route
          path={toAdminChildPath(ROUTES.adminLogin)}
          element={
            <AdminSessionRedirect>
              <AdminLoginPage />
            </AdminSessionRedirect>
          }
        />
        <Route element={<ProtectedShell />}>
          <Route
            path={toAdminChildPath(ROUTES.adminDashboard)}
            element={
              <ProtectedModule moduleId="dashboard">
                <AdminDashboardPage />
              </ProtectedModule>
            }
          />
          <Route
            path={toAdminChildPath(ROUTES.adminWebsiteContent)}
            element={
              <ProtectedModule moduleId="website-content">
                <AdminWebsiteContentPage />
              </ProtectedModule>
            }
          />
          <Route
            path={toAdminChildPath(ROUTES.adminPages)}
            element={<ContentModuleRoute type="Page" moduleId="pages" />}
          />
          <Route
            path={toAdminChildPath(ROUTES.adminSeo)}
            element={
              <ProtectedModule moduleId="seo">
                <AdminSeoPage />
              </ProtectedModule>
            }
          />
          <Route
            path={toAdminChildPath(ROUTES.adminBlogs)}
            element={
              <ProtectedModule moduleId="blogs">
                <AdminBlogManagementPage />
              </ProtectedModule>
            }
          />
          <Route
            path={toAdminChildPath(ROUTES.adminLearn)}
            element={<ContentModuleRoute type="Learn Resource" moduleId="learn" />}
          />
          <Route
            path={toAdminChildPath(ROUTES.adminCompliance)}
            element={<ContentModuleRoute type="Compliance Guide" moduleId="compliance" />}
          />
          <Route
            path={toAdminChildPath(ROUTES.adminFaqs)}
            element={<ContentModuleRoute type="FAQ" moduleId="faqs" />}
          />
          <Route
            path={toAdminChildPath(ROUTES.adminMedia)}
            element={
              <ProtectedModule moduleId="media">
                <AdminMediaPage />
              </ProtectedModule>
            }
          />
          <Route
            path={toAdminChildPath(ROUTES.adminDemoRequests)}
            element={
              <ProtectedModule moduleId="demo-requests">
                <AdminInboxPage mode="demo" />
              </ProtectedModule>
            }
          />
          <Route
            path={toAdminChildPath(ROUTES.adminContactEnquiries)}
            element={
              <ProtectedModule moduleId="contact-enquiries">
                <AdminInboxPage mode="contact" />
              </ProtectedModule>
            }
          />
          <Route
            path={toAdminChildPath(ROUTES.adminNewsletter)}
            element={
              <ProtectedModule moduleId="newsletter">
                <AdminInboxPage mode="newsletter" />
              </ProtectedModule>
            }
          />
          <Route
            path={toAdminChildPath(ROUTES.adminBulkEmail)}
            element={
              <ProtectedModule moduleId="bulk-email">
                <AdminBulkEmailPage />
              </ProtectedModule>
            }
          />
          <Route
            path={toAdminChildPath(ROUTES.adminRedirects)}
            element={
              <ProtectedModule moduleId="redirects">
                <AdminTechnicalSeoPage defaultTab="redirects" />
              </ProtectedModule>
            }
          />
          <Route
            path={toAdminChildPath(ROUTES.adminSitemap)}
            element={
              <ProtectedModule moduleId="sitemap">
                <AdminTechnicalSeoPage defaultTab="sitemap" />
              </ProtectedModule>
            }
          />
          <Route
            path={toAdminChildPath(ROUTES.adminAnalytics)}
            element={
              <ProtectedModule moduleId="analytics">
                <AdminAnalyticsPage />
              </ProtectedModule>
            }
          />
          <Route
            path={toAdminChildPath(ROUTES.adminIntegrations)}
            element={
              <ProtectedModule moduleId="integrations">
                <AdminIntegrationsPage />
              </ProtectedModule>
            }
          />
          <Route
            path={toAdminChildPath(ROUTES.adminUsers)}
            element={
              <ProtectedModule moduleId="users">
                <AdminUsersPage />
              </ProtectedModule>
            }
          />
          <Route
            path={toAdminChildPath(ROUTES.adminActivity)}
            element={
              <ProtectedModule moduleId="activity">
                <AdminActivityPage />
              </ProtectedModule>
            }
          />
          <Route
            path={toAdminChildPath(ROUTES.adminSettings)}
            element={
              <ProtectedModule moduleId="settings">
                <AdminSettingsPage />
              </ProtectedModule>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to={ROUTES.adminLogin} replace />} />
      </Routes>
    </AdminProvider>
  );
}

function AdminSessionRedirect({ children }: { children: React.ReactNode }) {
  const { sessionUser } = useAdminStore();
  if (sessionUser) {
    return <Navigate to={ROUTES.adminDashboard} replace />;
  }

  return <>{children}</>;
}
