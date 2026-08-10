import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";

type Props = {
  href?: string | null;
  children?: ReactNode;
  className?: string;
};

export function LivePageButton({
  href,
  children = "View Live Page",
  className = "btn-secondary",
}: Props) {
  if (!href) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
      title="Open this page on the public site"
    >
      {children}
      <ExternalLink className="h-4 w-4" />
    </a>
  );
}
