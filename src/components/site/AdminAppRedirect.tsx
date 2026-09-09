import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_ADMIN_DEV_PORT = "8081";

function getAdminAppBaseUrl() {
  const configuredUrl = import.meta.env.VITE_ADMIN_APP_URL?.trim();

  if (configuredUrl) {
    return configuredUrl.replace(/\/+$/, "");
  }

  const { protocol, hostname, port } = window.location;

  if (port === DEFAULT_ADMIN_DEV_PORT) {
    return window.location.origin;
  }

  if (import.meta.env.DEV) {
    return `${protocol}//${hostname}:${DEFAULT_ADMIN_DEV_PORT}`;
  }

  return `${window.location.origin}/admin`;
}

function getAdminTargetUrl(pathname: string, search: string, hash: string) {
  const adminPath = pathname.replace(/^\/admin(?=\/|$)/, "") || "/";

  return `${getAdminAppBaseUrl()}${adminPath}${search}${hash}`;
}

export default function AdminAppRedirect() {
  const location = useLocation();
  const targetUrl = getAdminTargetUrl(location.pathname, location.search, location.hash);

  useEffect(() => {
    window.location.replace(targetUrl);
  }, [targetUrl]);

  return (
    <div className="grid min-h-screen place-items-center bg-background px-4 text-center text-sm text-ink-soft">
      Redirecting to the admin portal...
    </div>
  );
}
