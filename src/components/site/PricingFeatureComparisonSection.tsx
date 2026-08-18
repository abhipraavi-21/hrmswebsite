import { CheckCircle2, CircleX, Info, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { getSectionItems } from "@/services/cmsHelpers";
import type { PublicCmsSection } from "@/services/cmsTypes";

export const PRICING_FEATURE_SECTION_TYPE = "pricing_feature_comparison";

type FeatureState = "included" | "notIncluded" | "limited" | "optional" | "addon";

const defaultColumns = ["Basic", "Professional", "Premium"];

const statusMeta: Record<FeatureState, { label: string; className: string; icon: ReactNode }> = {
  included: {
    label: "Included",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  notIncluded: {
    label: "Not included",
    className: "border-slate-200 bg-slate-100 text-slate-500",
    icon: <CircleX className="h-4 w-4" />,
  },
  limited: {
    label: "Limited",
    className: "border-amber-200 bg-amber-50 text-amber-700",
    icon: <Info className="h-4 w-4" />,
  },
  optional: {
    label: "Optional",
    className: "border-violet-200 bg-violet-50 text-violet-700",
    icon: <Sparkles className="h-4 w-4" />,
  },
  addon: {
    label: "Add On",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
};

function normalizePricingColumnKey(value: string) {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "column"
  );
}

function getPricingColumns(section: PublicCmsSection) {
  const columns = section.settings?.planColumns;

  if (!Array.isArray(columns)) {
    return defaultColumns;
  }

  const normalizedColumns = columns.filter(
    (column): column is string => typeof column === "string" && column.trim().length > 0,
  );

  return normalizedColumns.length ? normalizedColumns : defaultColumns;
}

function getFeatureState(value: unknown): FeatureState {
  if (
    value === "included" ||
    value === "notIncluded" ||
    value === "limited" ||
    value === "optional" ||
    value === "addon"
  ) {
    return value;
  }

  return "included";
}

function StatusChip({ state }: { state: FeatureState }) {
  const meta = statusMeta[state];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
        meta.className,
      )}
    >
      {meta.icon}
      {meta.label}
    </span>
  );
}

export function PricingFeatureComparisonSection({
  section,
  className,
}: {
  section: PublicCmsSection;
  className?: string;
}) {
  const columns = getPricingColumns(section);
  const rows = getSectionItems(section, "pricing_feature_row");

  if (!rows.length) {
    return null;
  }

  const gridTemplateColumns = `minmax(220px, 1.6fr) repeat(${columns.length}, minmax(150px, 1fr))`;
  const minWidth = Math.max(640, 260 + columns.length * 170);

  return (
    <section className={cn("soft-card overflow-hidden p-5 sm:p-6", className)}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-xs font-bold uppercase text-primary">
            {section.subheading ?? "Feature section"}
          </div>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-ink">
            {section.heading ?? section.internalName}
          </h3>
          {section.description ? (
            <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">{section.description}</p>
          ) : null}
        </div>

        <div className="flex items-center gap-2 text-sm text-ink-soft">
          <Info className="h-4 w-4 text-primary" />
          {rows.length} features
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <div
          className="overflow-hidden rounded-[1.35rem] border border-border bg-white"
          style={{ minWidth }}
        >
          <div className="grid bg-surface/70" style={{ gridTemplateColumns }}>
            <div className="px-4 py-3 text-xs font-bold uppercase text-ink-soft">Feature</div>
            {columns.map((column) => (
              <div key={column} className="px-4 py-3 text-xs font-bold uppercase text-ink-soft">
                {column}
              </div>
            ))}
          </div>

          <div className="divide-y divide-border">
            {rows.map((feature) => (
              <div key={feature.id} className="grid items-center" style={{ gridTemplateColumns }}>
                <div className="px-4 py-4">
                  <div className="text-sm font-semibold text-ink">{feature.title}</div>
                  {feature.description ? (
                    <div className="mt-1 text-xs leading-6 text-ink-soft">
                      {feature.description}
                    </div>
                  ) : null}
                </div>
                {columns.map((column) => (
                  <div key={`${feature.id}-${column}`} className="px-4 py-4">
                    <StatusChip
                      state={getFeatureState(
                        feature.extraData?.[normalizePricingColumnKey(column)],
                      )}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
