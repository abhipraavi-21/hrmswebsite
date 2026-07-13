type BrandMarkProps = {
  variant?: "light" | "dark";
  label?: string;
  className?: string;
};

export default function BrandMark({
  variant = "light",
  label = "Altroz HR",
  className = "",
}: BrandMarkProps) {
  const frameClassName =
    variant === "dark"
      ? "bg-white/10 ring-white/15 shadow-[0_10px_30px_rgba(15,23,42,0.22)]"
      : "bg-white/90 ring-border shadow-sm";

  return (
    <span className={`inline-flex items-center ${className}`.trim()}>
      <span
        className={`inline-flex items-center rounded-2xl px-2 py-1 ring-1 backdrop-blur ${frameClassName}`}
      >
        <img
          src="/brand/altroz-logo.png"
          alt={label}
          className="block h-8 w-auto max-w-none select-none sm:h-9"
        />
      </span>
    </span>
  );
}
