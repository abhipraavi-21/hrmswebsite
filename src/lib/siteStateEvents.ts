export const PUBLIC_SITE_STATE_UPDATED_EVENT = "altroz:public-site-state-updated";
export const PUBLIC_SITE_STATE_VERSION_KEY = "altroz:public-site-state-version";

export function announcePublicSiteStateUpdated(version = String(Date.now())) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(PUBLIC_SITE_STATE_UPDATED_EVENT, {
      detail: { version },
    }),
  );

  try {
    localStorage.setItem(PUBLIC_SITE_STATE_VERSION_KEY, version);
  } catch {
    // Ignore storage write failures in private browsers.
  }
}
