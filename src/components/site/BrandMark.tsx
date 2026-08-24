import { useLocation } from "react-router-dom";
import { ROUTES } from "@/routes/routeConfig.js";

type BrandMarkProps = {
  mode?: "auto" | "compact" | "wordmark";
  label?: string;
  className?: string;
  src?: string;
  alt?: string;
};

export default function BrandMark({
  mode = "auto",
  label = "Altroz HR",
  className = "",
  src: customSrc,
  alt,
}: BrandMarkProps) {
  const { pathname } = useLocation();
  const isAltrozHome = pathname === ROUTES.home;
  const isBulkEmailPage = pathname.startsWith(ROUTES.bulkEmail);
  const isAssetManagementPage =
    pathname.startsWith(ROUTES.assetManagementHome) ||
    pathname.startsWith(ROUTES.assetManagement) ||
    pathname.startsWith(ROUTES.bulkEmailAssetManagement);
  const isHrmsBrand = !isBulkEmailPage && !isAssetManagementPage;
  const shouldUseWordmark = mode === "wordmark" || (mode === "auto" && isAltrozHome);
  const src =
    customSrc ??
    (isAltrozHome
      ? "/brand/altroz-blue-wordmark.png"
      : isHrmsBrand
        ? "/brand/altroz-hr-logo.png"
        : shouldUseWordmark
          ? "/brand/altroz-logo-wordmark.png"
          : "/brand/altroz-logo-small.png");
  const sizeClass = shouldUseWordmark ? "h-10 sm:h-11" : "h-8 sm:h-9";
  const altText =
    alt ??
    (isAltrozHome
      ? "Altroz"
      : isHrmsBrand && !customSrc
        ? "Altroz HR"
        : shouldUseWordmark
          ? "Altroz"
          : label);

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
