import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminLayout } from "./layouts/AdminLayout";
import { ChangePasswordPage } from "./pages/ChangePasswordPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { MediaPage } from "./pages/cms/MediaPage";
import { PageEditorPage } from "./pages/cms/PageEditorPage";
import { PricingManagerPage } from "./pages/cms/PricingManagerPage";
import { ResourcesPage } from "./pages/cms/ResourcesPage";
import { ProfilePage } from "./pages/ProfilePage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/pages/:pageKey" element={<PageEditorPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/pricing" element={<PricingManagerPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
