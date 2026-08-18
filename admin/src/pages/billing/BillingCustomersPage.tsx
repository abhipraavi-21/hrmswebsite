import { useEffect, useState } from "react";
import { billingAdminService } from "../../services/cmsService";
import type { BillingAdminCustomer } from "../../types/cms";

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

export function BillingCustomersPage() {
  const [customers, setCustomers] = useState<BillingAdminCustomer[]>([]);

  useEffect(() => {
    void billingAdminService.listCustomers().then(setCustomers);
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
          Customers
        </div>
        <h1 className="mt-2 text-3xl font-semibold">Shared SaaS customers</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
          One customer account can subscribe to one, two or all three products, and the shared admin panel keeps every subscription tied back to the same company record.
        </p>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Products</th>
                <th className="px-6 py-4 font-medium">MRR</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Last Payment</th>
                <th className="px-6 py-4 font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((customer) => (
                <tr key={customer.id} className="align-top">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{customer.contactName}</div>
                    <div className="mt-1 text-slate-500">{customer.email}</div>
                    <div className="mt-1 text-slate-500">@{customer.username}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{customer.company?.name ?? "—"}</div>
                    <div className="mt-1 text-slate-500">{customer.company?.gstin ?? "No GSTIN"}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {customer.products.length ? (
                        customer.products.map((product) => (
                          <span
                            key={`${customer.id}-${product.productSlug}`}
                            className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700"
                          >
                            {product.productName} • {product.planName}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-500">No active products</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{formatCurrency(customer.mrr)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        customer.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{formatDate(customer.lastPaymentAt)}</td>
                  <td className="px-6 py-4 text-slate-500">{formatDate(customer.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
