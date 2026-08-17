import { useEffect, useState } from "react";
import { billingAdminService } from "../../services/cmsService";
import type { BillingAdminPayment } from "../../types/cms";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value?: string | null) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function BillingPaymentsPage() {
  const [payments, setPayments] = useState<BillingAdminPayment[]>([]);

  useEffect(() => {
    void billingAdminService.listPayments().then(setPayments);
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
          Payments
        </div>
        <h1 className="mt-2 text-3xl font-semibold">Gateway and transaction history</h1>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Payment</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Plan</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Gateway</th>
                <th className="px-6 py-4 font-medium">Transaction</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 font-semibold text-slate-900">{payment.paymentNumber}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{payment.customer?.contactName ?? "—"}</div>
                    <div className="mt-1 text-slate-500">@{payment.customer?.username ?? "—"}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-900">{payment.product?.name ?? "—"}</td>
                  <td className="px-6 py-4 text-slate-900">{payment.plan?.name ?? "—"}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{formatCurrency(payment.amount)}</td>
                  <td className="px-6 py-4 text-slate-500">{payment.gatewayProvider}</td>
                  <td className="px-6 py-4 text-slate-500">{payment.gatewayTransactionId ?? "—"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        payment.status === "success"
                          ? "bg-emerald-100 text-emerald-700"
                          : payment.status === "failed"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{formatDate(payment.paidAt ?? payment.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
