import { useEffect, useState } from "react";
import {
  BarChart3,
  CreditCard,
  RefreshCcw,
  ReceiptText,
  Users,
  type LucideIcon,
} from "lucide-react";
import { billingAdminService } from "../../services/cmsService";
import type { BillingOverview } from "../../types/cms";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function BillingDashboardPage() {
  const [overview, setOverview] = useState<BillingOverview | null>(null);

  useEffect(() => {
    void billingAdminService.getOverview().then(setOverview);
  }, []);

  const cards: Array<{ label: string; value: string | number; icon: LucideIcon }> = overview
    ? [
        { label: "Total SaaS Customers", value: overview.totalCustomers, icon: Users },
        { label: "Active Subscriptions", value: overview.activeSubscriptions, icon: ReceiptText },
        { label: "MRR", value: formatCurrency(overview.mrr), icon: CreditCard },
        { label: "ARR", value: formatCurrency(overview.arr), icon: BarChart3 },
        { label: "Revenue Today", value: formatCurrency(overview.revenueToday), icon: CreditCard },
        { label: "Revenue This Month", value: formatCurrency(overview.revenueThisMonth), icon: CreditCard },
        { label: "Renewals Due Soon", value: overview.renewalsDueSoon, icon: RefreshCcw },
        { label: "Failed Payments", value: overview.failedPayments, icon: ReceiptText },
      ]
    : [];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
          Billing & Subscriptions
        </div>
        <h1 className="mt-2 text-3xl font-semibold">Unified SaaS billing overview</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
          Manage HRMS, Bulk Email and Asset Management billing from one shared admin layer with reusable subscriptions, invoices, payments and renewals.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article key={card.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm text-slate-500">{card.label}</div>
              <card.icon className="h-5 w-5 text-sky-500" />
            </div>
            <div className="mt-4 text-3xl font-semibold">{card.value}</div>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Revenue by Product
            </div>
            <h2 className="mt-2 text-2xl font-semibold">Product revenue breakdown</h2>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {(overview?.revenueByProduct ?? []).map((entry) => (
            <article key={entry.product.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm text-slate-500">{entry.product.name}</div>
              <div className="mt-3 text-3xl font-semibold">{formatCurrency(entry.revenue)}</div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
