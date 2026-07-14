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
  return (
    <span className={`inline-flex items-center ${className}`.trim()}>
      <img
        src="/brand/altroz-logo.png"
        alt={label}
        className="block h-8 w-auto max-w-none select-none sm:h-9"
      />
    </span>
  );
}
