import { useEffect, useState } from "react";
import { dashboardService } from "../services/cmsService";
import type { DashboardSummary } from "../types/cms";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

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
        ["Subscription Orders", summary.totalSubscriptionPurchases],
        ["Active Subscriptions", summary.activeSubscriptions],
        ["Renewals Due Soon", summary.renewalsDueSoon],
      ]
    : [];

  const recentRevenue = summary
    ? summary.recentSubscriptions.reduce((total, item) => total + item.totalAmount, 0)
    : 0;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Dashboard</div>
        <h1 className="mt-2 text-3xl font-semibold">Content operations at a glance</h1>
        {summary ? (
          <p className="mt-3 text-sm text-slate-500">
            Recent subscription revenue captured from checkout: {formatCurrency(recentRevenue)}
          </p>
        ) : null}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value]) => (
          <article key={label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">{label}</div>
            <div className="mt-3 text-4xl font-semibold">{value}</div>
          </article>
        ))}
      </section>

      {summary?.recentSubscriptions?.length ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
              Billing activity
            </div>
            <h2 className="mt-2 text-2xl font-semibold">Recent subscription purchases</h2>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {summary.recentSubscriptions.map((purchase) => (
              <article key={purchase.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600">
                      {purchase.referenceCode}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold">{purchase.companyName}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {purchase.planName} • {purchase.employeeCount} employees • {purchase.billingCycleLabel}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{formatCurrency(purchase.totalAmount)}</div>
                    <div className="mt-1 text-xs text-slate-500">{purchase.paymentStatus}</div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white p-3 text-sm text-slate-600">
                    Purchased: <span className="font-medium text-slate-900">{formatDate(purchase.purchasedAt)}</span>
                  </div>
                  <div className="rounded-2xl bg-white p-3 text-sm text-slate-600">
                    Renewal: <span className="font-medium text-slate-900">{formatDate(purchase.renewalDueAt)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
