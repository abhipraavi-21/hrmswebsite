import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { LivePageButton } from "../components/LivePageButton";
import { getManagedPagePresentation } from "../data/managedCmsPages";
import { dashboardService } from "../services/cmsService";
import type { DashboardSummary } from "../types/cms";
import { getPublicSitePageUrl } from "../utils/publicSite";

const featuredPricingPages = [
  {
    pageKey: "pricing",
    label: "HRMS Pricing",
    description: "Edit the live HRMS pricing structure and section content.",
  },
  {
    pageKey: "bulk-email-pricing",
    label: "Bulk Email Pricing",
    description: "Manage the pricing content shown on the bulk email frontend page.",
  },
  {
    pageKey: "asset-management-pricing",
    label: "Asset Management Pricing",
    description: "Manage the asset-based pricing page that is live on the frontend today.",
  },
] as const;

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
        <p className="mt-2 max-w-3xl text-sm text-slate-500">
          Start with the pricing pages below if you need to update live product pricing content,
          including the asset management pricing page.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value]) => (
          <article key={label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">{label}</div>
            <div className="mt-3 text-4xl font-semibold">{value}</div>
          </article>
        ))}
      </section>

      <section className="space-y-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
            Pricing Pages
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            Open pricing editors directly
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-500">
            These shortcuts jump straight into the live-connected pricing pages so you can edit
            content and compare it against the public site quickly.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {featuredPricingPages.map((page) => {
            const presentation = getManagedPagePresentation(page.pageKey);
            const liveUrl = getPublicSitePageUrl(page.pageKey, presentation?.slug ?? null);

            return (
              <article
                key={page.pageKey}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Live CMS Page
                </div>
                <h3 className="mt-2 text-xl font-semibold text-slate-950">{page.label}</h3>
                <p className="mt-2 text-sm text-slate-500">{page.description}</p>
                <p className="mt-4 text-sm text-slate-400">
                  /{presentation?.slug ?? page.pageKey}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link to={`/pages/${page.pageKey}`} className="btn-primary">
                    Open Editor
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <LivePageButton href={liveUrl} />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
