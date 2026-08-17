import { useEffect, useMemo, useState } from "react";
import { LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/routes/routeConfig.js";
import { fetchCustomerBillingDashboard, type CustomerBillingDashboard } from "@/services/billingService";
import { clearCustomerSession, loadCustomerSession } from "@/services/customerSessionStorage";

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

export default function CustomerBillingHistoryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<CustomerBillingDashboard | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const customerSession = loadCustomerSession();

  useEffect(() => {
    if (!customerSession?.token) {
      navigate(`${ROUTES.customerAccess}?redirect=${encodeURIComponent(location.pathname)}`, {
        replace: true,
      });
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    void fetchCustomerBillingDashboard(customerSession.token)
      .then((nextDashboard) => {
        if (isMounted) {
          setDashboard(nextDashboard);
        }
      })
      .catch(() => {
        if (isMounted) {
          toast.error("Billing history could not be loaded.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [customerSession?.token, location.pathname, navigate]);

  const filteredPayments = useMemo(() => {
    return (dashboard?.payments ?? []).filter((payment) => {
      if (filter === "all") {
        return true;
      }

      return payment.product?.slug === filter;
    });
  }, [dashboard?.payments, filter]);

  const invoiceByProduct = useMemo(() => {
    const map = new Map<string, string>();

    for (const invoice of dashboard?.invoices ?? []) {
      if (invoice.product?.slug && !map.has(invoice.product.slug)) {
        map.set(invoice.product.slug, invoice.invoiceNumber);
      }
    }

    return map;
  }, [dashboard?.invoices]);

  const logout = () => {
    clearCustomerSession();
    navigate(ROUTES.customerAccess, { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Billing History | Altroz"
        description="Review Altroz product payments, statuses and invoice references from the shared customer billing dashboard."
        canonicalPath={ROUTES.dashboardBilling}
      />
      <TopNavbar />
      <MainNavbar />

      <main className="hero-gradient min-h-[calc(100vh-160px)] py-14 sm:py-16 lg:py-20">
        <div className="container-x space-y-6">
          <Card className="border-border/80 bg-white shadow-float">
            <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <Badge className="border-primary/20 bg-primary-soft text-primary">Billing history</Badge>
                <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                  Payment and invoice history across products
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-ink-soft">
                  Filter by product and review successful, failed or pending customer billing records from one shared ledger.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to={ROUTES.dashboard} className="btn-outline">
                  Back to dashboard
                </Link>
                <Button type="button" variant="outline" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-white shadow-float">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-ink">Filter payments</CardTitle>
              <CardDescription className="mt-1 text-sm text-ink-soft">
                View all products together or focus on one billing stream.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {[
                  { value: "all", label: "All" },
                  { value: "hrms", label: "HRMS" },
                  { value: "bulk-email", label: "Bulk Email" },
                  { value: "asset-management", label: "Asset Management" },
                ].map((option) => {
                  const isSelected = filter === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFilter(option.value)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                        isSelected
                          ? "border-primary bg-primary text-white"
                          : "border-border bg-white text-ink hover:border-primary/30"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-white shadow-float">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-ink">Transactions</CardTitle>
              <CardDescription className="mt-1 text-sm text-ink-soft">
                Date, product, invoice reference, amount and status for every payment event.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="rounded-2xl border border-border bg-surface/40 p-6 text-sm text-ink-soft">
                  Loading billing history...
                </div>
              ) : filteredPayments.length ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-slate-950 text-left text-white">
                      <tr>
                        <th className="px-5 py-4 font-black uppercase tracking-[0.14em]">Date</th>
                        <th className="px-5 py-4 font-black uppercase tracking-[0.14em]">Product</th>
                        <th className="px-5 py-4 font-black uppercase tracking-[0.14em]">Payment</th>
                        <th className="px-5 py-4 font-black uppercase tracking-[0.14em]">Invoice</th>
                        <th className="px-5 py-4 font-black uppercase tracking-[0.14em]">Amount</th>
                        <th className="px-5 py-4 font-black uppercase tracking-[0.14em]">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredPayments.map((payment) => (
                        <tr key={payment.id}>
                          <td className="px-5 py-4 text-ink-soft">{formatDate(payment.paidAt ?? payment.createdAt)}</td>
                          <td className="px-5 py-4 font-semibold text-ink">{payment.product?.name ?? "Product"}</td>
                          <td className="px-5 py-4 text-ink-soft">{payment.paymentNumber}</td>
                          <td className="px-5 py-4 text-ink-soft">{invoiceByProduct.get(payment.product?.slug ?? "") ?? "—"}</td>
                          <td className="px-5 py-4 font-semibold text-ink">{formatCurrency(payment.amount)}</td>
                          <td className="px-5 py-4">
                            <Badge className={payment.status === "success" ? "bg-emerald-100 text-emerald-700" : payment.status === "failed" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}>
                              {payment.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-surface/40 p-6 text-sm text-ink-soft">
                  No transactions match the current filter.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
