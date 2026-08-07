import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminLayout } from "./layouts/AdminLayout";
import { ChangePasswordPage } from "./pages/ChangePasswordPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { BlogPostsManagerPage } from "./pages/cms/BlogPostsManagerPage";
import { PageEditorPage } from "./pages/cms/PageEditorPage";
import { PagesOverviewPage } from "./pages/cms/PagesOverviewPage";
import { ProfilePage } from "./pages/ProfilePage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/pages" element={<PagesOverviewPage />} />
          <Route path="/pages/:pageKey" element={<PageEditorPage />} />
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
