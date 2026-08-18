import { useEffect, useState } from "react";
import { billingAdminService } from "../../services/cmsService";
import type { BillingAdminSubscription } from "../../types/cms";

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

export function BillingSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<BillingAdminSubscription[]>([]);

  useEffect(() => {
    void billingAdminService.listSubscriptions().then(setSubscriptions);
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
          Subscriptions
        </div>
        <h1 className="mt-2 text-3xl font-semibold">Active and pending product subscriptions</h1>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Subscription</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Plan</th>
                <th className="px-6 py-4 font-medium">Billing</th>
                <th className="px-6 py-4 font-medium">Add-ons</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Start</th>
                <th className="px-6 py-4 font-medium">Expiry</th>
                <th className="px-6 py-4 font-medium">Renewal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subscriptions.map((subscription) => (
                <tr key={subscription.id} className="align-top">
                  <td className="px-6 py-4 font-semibold text-slate-900">{subscription.subscriptionNumber}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{subscription.customer?.contactName ?? "—"}</div>
                    <div className="mt-1 text-slate-500">{subscription.company?.name ?? "—"}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-900">{subscription.product?.name ?? "—"}</td>
                  <td className="px-6 py-4 text-slate-900">{subscription.plan?.name ?? "—"}</td>
                  <td className="px-6 py-4 text-slate-500">{subscription.billingCycleLabel}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {subscription.addOns.length ? (
                        subscription.addOns.map((addon) => (
                          <span
                            key={addon.id}
                            className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700"
                          >
                            {addon.name} x {addon.quantity}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-500">None</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{formatCurrency(subscription.amount)}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {subscription.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{formatDate(subscription.startDate)}</td>
                  <td className="px-6 py-4 text-slate-500">{formatDate(subscription.endDate)}</td>
                  <td className="px-6 py-4 text-slate-500">{formatDate(subscription.renewalDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
