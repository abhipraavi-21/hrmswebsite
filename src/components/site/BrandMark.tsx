import { useLocation } from "react-router-dom";
import { ROUTES } from "@/routes/routeConfig.js";

type BrandMarkProps = {
  mode?: "auto" | "compact" | "wordmark";
  label?: string;
  className?: string;
};

export default function BrandMark({
  mode = "auto",
  label = "Altroz HR",
  className = "",
}: BrandMarkProps) {
  const location = useLocation();
  const isAltrozHome = location.pathname === ROUTES.home;
  const shouldUseWordmark =
    mode === "wordmark" || (mode === "auto" && isAltrozHome);
  const src = shouldUseWordmark
    ? "/brand/altroz-logo-wordmark.png"
    : "/brand/altroz-logo-small.png";
  const sizeClass = shouldUseWordmark ? "h-10 sm:h-11" : "h-8 sm:h-9";
  const altText = shouldUseWordmark ? "Altroz" : label;

  return (
    <span className={`inline-flex items-center ${className}`.trim()}>
      <img
        src={src}
        alt={altText}
        width={480}
        height={104}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className={`block ${sizeClass} w-auto max-w-none select-none`}
      />
    </span>
  );
}
