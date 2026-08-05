import { useEffect, useState } from "react";
import { dashboardService } from "../services/cmsService";
import type { DashboardSummary } from "../types/cms";

export function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    void dashboardService.getSummary().then(setSummary);
  }, []);

  const cards = summary
    ? [
        ["Managed Pages", summary.totalManagedPages],
        ["Resource Pages", summary.totalResourcePages],
        ["Pricing Plans", summary.totalPricingPlans],
        ["Published Sections", summary.publishedSections],
        ["Draft Sections", summary.draftSections],
      ]
    : [];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Dashboard</div>
        <h1 className="mt-2 text-3xl font-semibold">Content operations at a glance</h1>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value]) => (
          <article key={label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">{label}</div>
            <div className="mt-3 text-4xl font-semibold">{value}</div>
          </article>
        ))}
      </section>
    </div>
  );
}
