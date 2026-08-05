import { Link } from "react-router-dom";
import BrandMark from "./BrandMark";
import { ROUTES } from "@/routes/routeConfig.js";
import { cn } from "@/lib/utils";

type ProductBrandLineProps = {
  badgeLabel?: string;
  badgeClassName?: string;
  className?: string;
  compact?: boolean;
  brandSrc?: string;
  brandAlt?: string;
};

export default function ProductBrandLine({
  badgeLabel = "HRMS",
  badgeClassName = "bg-[#1f9d55] text-white",
  className = "",
  compact = false,
  brandSrc,
  brandAlt,
}: ProductBrandLineProps) {
  const badge = (
    <span
      className={cn(
        "inline-flex items-center rounded-[0.6rem] px-2.5 py-1 text-[0.72rem] font-extrabold uppercase tracking-[0.12em] leading-none sm:text-[0.76rem]",
        badgeClassName,
      )}
    >
      {badgeLabel}
    </span>
  );

  return (
    <Link
      to={ROUTES.home}
      aria-label="Altroz home"
      className={cn("inline-flex shrink-0 items-center gap-2.5 leading-none -ml-3", className)}
    >
      {brandSrc ? (
        <img
          src={brandSrc}
          alt={brandAlt ?? "Altroz product logo"}
          width={1322}
          height={277}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className={compact ? "block h-8 w-auto select-none sm:h-10" : "block h-7 w-auto select-none sm:h-8"}
        />
      ) : (
        <>
          <BrandMark
            mode="wordmark"
            className={compact ? "scale-[0.88] origin-left" : "scale-[0.95] origin-left"}
          />
          {badge}
        </>
      )}
    </Link>
  );
}
