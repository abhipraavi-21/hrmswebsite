import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function getAdminAppBaseUrl() {
  const configuredUrl = import.meta.env.VITE_ADMIN_APP_URL?.trim();

  if (configuredUrl) {
    return configuredUrl.replace(/\/+$/, "");
  }

  const { protocol, hostname, port } = window.location;

  if (port === "5173") {
    return `${protocol}//${hostname}:5174`;
  }

  return window.location.origin;
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
