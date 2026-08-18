import { getManagedPagePresentation } from "../data/managedCmsPages";

const DEFAULT_PUBLIC_SITE_URL = "http://localhost:8080";

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function normalizePath(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export const PUBLIC_SITE_URL = trimTrailingSlash(
  import.meta.env.VITE_PUBLIC_SITE_URL ?? DEFAULT_PUBLIC_SITE_URL,
);

export function getPublicSitePageUrl(pageKey?: string | null, fallbackSlug?: string | null) {
  const managedPage = pageKey ? getManagedPagePresentation(pageKey) : null;
  const path = managedPage?.slug ?? fallbackSlug ?? "";

  if (!path) {
    return null;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${PUBLIC_SITE_URL}${normalizePath(path)}`;
}
