import { useEffect, useState } from "react";
import { billingAdminService } from "../../services/cmsService";
import type { BillingAdminInvoice } from "../../types/cms";

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

export function BillingInvoicesPage() {
  const [invoices, setInvoices] = useState<BillingAdminInvoice[]>([]);

  useEffect(() => {
    void billingAdminService.listInvoices().then(setInvoices);
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
          Invoices
        </div>
        <h1 className="mt-2 text-3xl font-semibold">Shared invoice ledger</h1>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Invoice</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Plan</th>
                <th className="px-6 py-4 font-medium">Period</th>
                <th className="px-6 py-4 font-medium">Subtotal</th>
                <th className="px-6 py-4 font-medium">Tax</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Issued</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 font-semibold text-slate-900">{invoice.invoiceNumber}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{invoice.customer?.contactName ?? "—"}</div>
                    <div className="mt-1 text-slate-500">@{invoice.customer?.username ?? "—"}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-900">{invoice.product?.name ?? "—"}</td>
                  <td className="px-6 py-4 text-slate-900">{invoice.plan?.name ?? "—"}</td>
                  <td className="px-6 py-4 text-slate-500">
                    {formatDate(invoice.billingPeriodStart)} - {formatDate(invoice.billingPeriodEnd)}
                  </td>
                  <td className="px-6 py-4 text-slate-900">{formatCurrency(invoice.subtotalAmount)}</td>
                  <td className="px-6 py-4 text-slate-900">{formatCurrency(invoice.taxAmount)}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{formatCurrency(invoice.totalAmount)}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{formatDate(invoice.issuedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
