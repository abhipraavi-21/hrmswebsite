import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CalendarDays, CreditCard, FileText, LogOut, Package2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getBillingProductContent } from "@/data/billingContent";
import { ROUTES } from "@/routes/routeConfig.js";
import {
  fetchBillingProducts,
  fetchCustomerBillingDashboard,
  type BillingProduct,
  type BillingSubscription,
  type CustomerBillingDashboard,
} from "@/services/billingService";
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

export default function CustomerDashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<CustomerBillingDashboard | null>(null);
  const [products, setProducts] = useState<BillingProduct[]>([]);
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

    void Promise.all([
      fetchCustomerBillingDashboard(customerSession.token),
      fetchBillingProducts(),
    ])
      .then(([nextDashboard, nextProducts]) => {
        if (!isMounted) {
          return;
        }

        setDashboard(nextDashboard);
        setProducts(nextProducts);
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        toast.error("The customer dashboard could not be loaded.");
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

  const subscriptionByProduct = useMemo(() => {
    const map = new Map<string, BillingSubscription>();

    for (const subscription of dashboard?.products ?? []) {
      if (subscription.product?.slug) {
        map.set(subscription.product.slug, subscription);
      }
    }

    return map;
  }, [dashboard?.products]);

  const logout = () => {
    clearCustomerSession();
    toast.success("Customer session cleared.");
    navigate(ROUTES.customerAccess, { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Customer Dashboard | Altroz"
        description="View active Altroz product subscriptions, renewal dates, payment records and invoices in one shared dashboard."
        canonicalPath={ROUTES.dashboard}
      />
      <TopNavbar />
      <MainNavbar />

      <main className="hero-gradient min-h-[calc(100vh-160px)] py-14 sm:py-16 lg:py-20">
        <div className="container-x space-y-6">
          <Card className="border-border/80 bg-white shadow-float">
            <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <Badge className="border-primary/20 bg-primary-soft text-primary">Customer dashboard</Badge>
                <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                  Manage every product subscription from one place
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-ink-soft">
                  The shared Altroz billing engine keeps product subscriptions, payments, invoices and renewal dates aligned under one customer account.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to={ROUTES.dashboardBilling} className="btn-outline">
                  Billing history
                </Link>
                <Button type="button" variant="outline" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Active subscriptions",
                value: dashboard?.summary.activeSubscriptions ?? 0,
                icon: Package2,
              },
              {
                label: "Total spent",
                value: formatCurrency(dashboard?.summary.totalSpent ?? 0),
                icon: CreditCard,
              },
              {
                label: "Renewals due soon",
                value: dashboard?.summary.renewalsDueSoon ?? 0,
                icon: CalendarDays,
              },
              {
                label: "Invoices",
                value: dashboard?.summary.invoiceCount ?? 0,
                icon: FileText,
              },
            ].map((card) => (
              <article key={card.label} className="rounded-3xl border border-border bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm text-ink-soft">{card.label}</div>
                  <card.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="mt-4 text-3xl font-black text-ink">{card.value}</div>
              </article>
            ))}
          </section>

          <Card className="border-border/80 bg-white shadow-float">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-ink">My products</CardTitle>
              <CardDescription className="mt-1 text-sm text-ink-soft">
                Subscribe to one, two or all three products without needing separate accounts.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {isLoading ? (
                <div className="rounded-2xl border border-border bg-surface/40 p-6 text-sm text-ink-soft">
                  Loading subscriptions...
                </div>
              ) : (
                <div className="grid gap-4 lg:grid-cols-3">
                  {products.map((product) => {
                    const subscription = subscriptionByProduct.get(product.slug);
                    const productContent = getBillingProductContent(product.slug);

                    return (
                      <article key={product.id} className="rounded-[1.75rem] border border-border bg-surface/30 p-5 shadow-sm">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                              {product.name}
                            </div>
                            <div className="mt-2 text-2xl font-black text-ink">
                              {subscription?.plan?.name ?? "No Active Subscription"}
                            </div>
                          </div>
                          <Badge className={subscription ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}>
                            {subscription?.status ?? "Not subscribed"}
                          </Badge>
                        </div>

                        {subscription ? (
                          <>
                            <div className="mt-4 space-y-3 text-sm text-ink-soft">
                              <div className="flex items-center justify-between gap-3">
                                <span>Billing cycle</span>
                                <span className="font-semibold text-ink">{subscription.billingCycleLabel}</span>
                              </div>
                              <div className="flex items-center justify-between gap-3">
                                <span>Total amount</span>
                                <span className="font-semibold text-ink">{formatCurrency(subscription.amounts.totalAmount)}</span>
                              </div>
                              <div className="flex items-center justify-between gap-3">
                                <span>Renews</span>
                                <span className="font-semibold text-ink">{formatDate(subscription.renewalDate)}</span>
                              </div>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-3">
                              <Link to={`/dashboard/${product.slug}`} className="btn-primary">
                                Manage
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                              <a href={productContent.openProductHref} className="btn-outline">
                                Open {productContent.shortLabel}
                              </a>
                            </div>
                          </>
                        ) : (
                          <div className="mt-5">
                            <Link
                              to={
                                product.slug === "bulk-email"
                                  ? ROUTES.bulkEmailPricing
                                  : product.slug === "asset-management"
                                    ? ROUTES.assetManagementPricing
                                    : ROUTES.hrmsPricing
                              }
                              className="btn-primary"
                            >
                              View plans
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {dashboard?.payments.length ? (
            <Card className="border-border/80 bg-white shadow-float">
              <CardHeader>
                <CardTitle className="text-2xl font-black text-ink">Recent payment activity</CardTitle>
                <CardDescription className="mt-1 text-sm text-ink-soft">
                  Every product payment lives in the same shared billing history.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                {dashboard.payments.slice(0, 5).map((payment) => (
                  <div key={payment.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-surface/30 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-sm font-semibold text-ink">{payment.product?.name ?? "Product payment"}</div>
                      <div className="mt-1 text-xs text-ink-soft">
                        {payment.paymentNumber} • {payment.status}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-ink">{formatCurrency(payment.amount)}</div>
                      <div className="mt-1 text-xs text-ink-soft">{formatDate(payment.paidAt ?? payment.createdAt)}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
}
