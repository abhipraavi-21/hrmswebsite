const FALLBACK_SITE_ORIGIN = "https://www.altrozhr.com";

export function getSiteOrigin() {
  const configuredOrigin = import.meta.env.VITE_SITE_URL?.trim();

  if (configuredOrigin) {
    try {
      return new URL(configuredOrigin).origin;
    } catch {
      // Fall back to the runtime origin if the configured value is invalid.
    }
  }

  if (typeof window !== "undefined" && window.location.origin) {
    return window.location.origin;
  }

  return FALLBACK_SITE_ORIGIN;
}

export function resolveSiteUrl(pathname: string) {
  return new URL(pathname, getSiteOrigin()).href;
}
