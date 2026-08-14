import { useEffect, useMemo, useState } from "react";
import { CalendarDays, CreditCard, ReceiptText, Users } from "lucide-react";
import { subscriptionService } from "../services/cmsService";
import type { SubscriptionPurchase } from "../types/cms";

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

function StatusPill({
  value,
  tone,
}: {
  value: string;
  tone: "emerald" | "amber" | "rose" | "slate";
}) {
  const tones = {
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    rose: "border-rose-200 bg-rose-50 text-rose-700",
    slate: "border-slate-200 bg-slate-100 text-slate-700",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]}`}
    >
      {value}
    </span>
  );
}

function getPaymentTone(status: SubscriptionPurchase["paymentStatus"]) {
  if (status === "paid") {
    return "emerald" as const;
  }

  if (status === "pending") {
    return "amber" as const;
  }

  return "rose" as const;
}

function getSubscriptionTone(status: SubscriptionPurchase["subscriptionStatus"]) {
  if (status === "active") {
    return "emerald" as const;
  }

  if (status === "pending") {
    return "amber" as const;
  }

  if (status === "cancelled") {
    return "rose" as const;
  }

  return "slate" as const;
}

function getSelectedAddOns(purchase: SubscriptionPurchase) {
  const selectedAddOns = purchase.extraData?.selectedAddOns;
  const setupCharge = purchase.extraData?.setupCharge;
  const charges: Array<{ id: string; name: string; total: number }> = [];

  if (setupCharge && typeof setupCharge === "object") {
    const charge = setupCharge as {
      label?: string;
      ratePerEmployee?: number;
      employeeCount?: number;
      total?: number;
    };

    if (typeof charge.total === "number" && charge.total > 0) {
      charges.push({
        id: "setup-charge",
        name:
          charge.label && typeof charge.employeeCount === "number"
            ? `${charge.label} (${charge.employeeCount} employees)`
            : (charge.label ?? "Setup charges"),
        total: charge.total,
      });
    }
  }

  const coupon = purchase.extraData?.coupon;

  if (coupon && typeof coupon === "object") {
    const appliedCoupon = coupon as { code?: string; discountAmount?: number };

    if (appliedCoupon.code && typeof appliedCoupon.discountAmount === "number") {
      charges.push({
        id: "coupon-discount",
        name: `Coupon ${appliedCoupon.code}`,
        total: -appliedCoupon.discountAmount,
      });
    }
  }

  if (!Array.isArray(selectedAddOns)) {
    return charges;
  }

  const addOns = selectedAddOns
    .map((selectedAddon) => {
      if (!selectedAddon || typeof selectedAddon !== "object") {
        return null;
      }

      const addon = selectedAddon as { id?: string; name?: string; total?: number };

      if (!addon.id || !addon.name) {
        return null;
      }

      return {
        id: addon.id,
        name: addon.name,
        total: typeof addon.total === "number" ? addon.total : 0,
      };
    })
    .filter((addon): addon is { id: string; name: string; total: number } => addon !== null);

  return [...charges, ...addOns];
}

export function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionPurchase[]>([]);

  useEffect(() => {
    void subscriptionService.list().then(setSubscriptions);
  }, []);

  const summary = useMemo(() => {
    const totalRevenue = subscriptions.reduce((sum, purchase) => sum + purchase.totalAmount, 0);
    const activeSubscriptions = subscriptions.filter(
      (purchase) => purchase.subscriptionStatus === "active",
    ).length;
    const renewalsDueSoon = subscriptions.filter(
      (purchase) => purchase.subscriptionStatus === "active" && purchase.daysUntilRenewal <= 30,
    ).length;

    return {
      totalOrders: subscriptions.length,
      totalRevenue,
      activeSubscriptions,
      renewalsDueSoon,
    };
  }, [subscriptions]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
          Billing
        </div>
        <h1 className="mt-2 text-3xl font-semibold">Subscription purchases</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
          Every completed purchase from the public checkout appears here with the selected plan,
          billing cycle, GST, total and renewal date.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total Orders",
            value: summary.totalOrders,
            icon: ReceiptText,
          },
          {
            label: "Revenue Booked",
            value: formatCurrency(summary.totalRevenue),
            icon: CreditCard,
          },
          {
            label: "Active Subscriptions",
            value: summary.activeSubscriptions,
            icon: Users,
          },
          {
            label: "Renewals Due Soon",
            value: summary.renewalsDueSoon,
            icon: CalendarDays,
          },
        ].map((card) => (
          <article
            key={card.label}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm text-slate-500">{card.label}</div>
              <card.icon className="h-5 w-5 text-sky-500" />
            </div>
            <div className="mt-4 text-3xl font-semibold">{card.value}</div>
          </article>
        ))}
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold">Incoming subscription orders</h2>
        </div>

        {subscriptions.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-slate-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Reference</th>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Plan</th>
                  <th className="px-6 py-3 font-medium">Add-ons</th>
                  <th className="px-6 py-3 font-medium">Employees</th>
                  <th className="px-6 py-3 font-medium">Billing</th>
                  <th className="px-6 py-3 font-medium">Subtotal</th>
                  <th className="px-6 py-3 font-medium">GST</th>
                  <th className="px-6 py-3 font-medium">Total</th>
                  <th className="px-6 py-3 font-medium">Purchased</th>
                  <th className="px-6 py-3 font-medium">Renewal</th>
                  <th className="px-6 py-3 font-medium">Payment</th>
                  <th className="px-6 py-3 font-medium">Subscription</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subscriptions.map((purchase) => {
                  const addOns = getSelectedAddOns(purchase);

                  return (
                    <tr key={purchase.id} className="align-top">
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {purchase.referenceCode}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{purchase.companyName}</div>
                        <div className="mt-1 text-slate-500">{purchase.contactName}</div>
                        <div className="mt-1 text-slate-500">{purchase.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{purchase.planName}</div>
                        <div className="mt-1 text-slate-500">
                          {purchase.paymentMethod ?? "manual"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {addOns.length ? (
                          <div className="space-y-2">
                            {addOns.map((addon) => (
                              <div
                                key={addon.id}
                                className="rounded-2xl bg-slate-50 px-3 py-2 text-xs"
                              >
                                <div className="font-semibold text-slate-900">{addon.name}</div>
                                <div className="mt-1 text-slate-500">
                                  {addon.total < 0
                                    ? `-${formatCurrency(Math.abs(addon.total))}`
                                    : formatCurrency(addon.total)}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-400">None</span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {purchase.employeeCount}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">
                          {purchase.billingCycleLabel}
                        </div>
                        <div className="mt-1 text-slate-500">
                          {purchase.billingCycleMonths} month cycle
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-900">
                        {formatCurrency(purchase.subtotalAmount)}
                      </td>
                      <td className="px-6 py-4 text-slate-900">
                        {formatCurrency(purchase.gstAmount)}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {formatCurrency(purchase.totalAmount)}
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {formatDate(purchase.purchasedAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">
                          {formatDate(purchase.renewalDueAt)}
                        </div>
                        <div className="mt-1 text-slate-500">
                          {purchase.daysUntilRenewal} days left
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusPill
                          value={purchase.paymentStatus}
                          tone={getPaymentTone(purchase.paymentStatus)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <StatusPill
                          value={purchase.subscriptionStatus}
                          tone={getSubscriptionTone(purchase.subscriptionStatus)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-10 text-sm text-slate-500">
            No subscription purchases yet. Orders from the public pricing checkout will appear here.
          </div>
        )}
      </section>
    </div>
  );
}
