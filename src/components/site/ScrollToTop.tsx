import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const hash = decodeURIComponent(location.hash.slice(1));

      window.requestAnimationFrame(() => {
        const target = document.getElementById(hash);

        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }

        window.scrollTo(0, 0);
      });

      return;
    }

    window.scrollTo(0, 0);
  }, [location.hash, location.pathname]);

  return null;
}

