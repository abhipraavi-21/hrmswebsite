import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_MEASUREMENT_ID = "G-ZH16SDBMDP";

declare global {
  interface Window {
    gtag?: (...args: [command: string, ...params: unknown[]]) => void;
  }
}

export default function GoogleAnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (!import.meta.env.PROD || typeof window.gtag !== "function") {
      return;
    }

    const pagePath = `${location.pathname}${location.search}`;
    const timeoutId = window.setTimeout(() => {
      window.gtag?.("event", "page_view", {
        page_path: pagePath,
        page_location: window.location.href,
        page_title: document.title,
        send_to: GA_MEASUREMENT_ID,
      });
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [location.pathname, location.search]);

  return null;
}
