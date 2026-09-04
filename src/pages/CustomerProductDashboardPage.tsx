import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
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
import { fetchCustomerProductDashboard, type BillingSubscription } from "@/services/billingService";
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

export default function CustomerProductDashboardPage() {
  const { productSlug = "hrms" } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const productContent = getBillingProductContent(productSlug);
  const [subscription, setSubscription] = useState<BillingSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const customerSession = loadCustomerSession();
  const upgradeCheckoutHref =
    productSlug === "hrms" && subscription
      ? `/checkout/${productSlug}?plan=${subscription.plan?.id ?? ""}&billing=${subscription.billingCycle}&mode=login&lifecycle=addon&employees=${subscription.company?.employeeCount ?? 0}`
      : null;

  useEffect(() => {
    if (!customerSession?.token) {
      navigate(`${ROUTES.customerAccess}?redirect=${encodeURIComponent(location.pathname)}`, {
        replace: true,
      });
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    void fetchCustomerProductDashboard(productSlug, customerSession.token)
      .then((nextSubscription) => {
        if (isMounted) {
          setSubscription(nextSubscription);
        }
      })
      .catch(() => {
        if (isMounted) {
          toast.error("The product subscription could not be loaded.");
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
  }, [customerSession?.token, location.pathname, navigate, productSlug]);

  const logout = () => {
    clearCustomerSession();
    navigate(ROUTES.customerAccess, { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={`${productContent.productLabel} Dashboard | Altroz`}
        description={`Manage the ${productContent.productLabel} subscription, entitlements, add-ons and renewal date from the shared Altroz customer dashboard.`}
        canonicalPath={`/dashboard/${productSlug}`}
      />
      <TopNavbar />
      <MainNavbar />

      <main className="hero-gradient min-h-[calc(100vh-160px)] py-14 sm:py-16 lg:py-20">
        <div className="container-x space-y-6">
          <Card className="border-border/80 bg-white shadow-float">
            <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <Badge className="border-primary/20 bg-primary-soft text-primary">{productContent.productLabel}</Badge>
                <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                  {productContent.productLabel} subscription details
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-ink-soft">
                  Product-specific usage, add-ons, pricing and renewal details flow from the shared billing engine into this dashboard.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to={ROUTES.dashboard} className="btn-outline">
                  Back to dashboard
                </Link>
                {upgradeCheckoutHref ? (
                  <Link to={upgradeCheckoutHref} className="btn-primary">
                    Upgrade Employees / Add-ons
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
                <Button type="button" variant="outline" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>

          {isLoading ? (
            <Card className="border-border/80 bg-white shadow-float">
              <CardContent className="p-6 text-sm text-ink-soft">Loading product subscription...</CardContent>
            </Card>
          ) : subscription ? (
            <div className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
              <Card className="border-border/80 bg-white shadow-float">
                <CardHeader>
                  <CardTitle className="text-2xl font-black text-ink">Subscription overview</CardTitle>
                  <CardDescription className="mt-1 text-sm text-ink-soft">
                    Plan, billing cycle, add-ons and entitlements for this product subscription.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="rounded-[1.5rem] border border-border bg-surface/30 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Current plan</div>
                        <div className="mt-2 text-2xl font-black text-ink">{subscription.plan?.name}</div>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-700">{subscription.status}</Badge>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-ink-soft">{subscription.plan?.description}</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Billing cycle</div>
                      <div className="mt-2 text-lg font-black text-ink">{subscription.billingCycleLabel}</div>
                    </div>
                    <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Next renewal</div>
                      <div className="mt-2 text-lg font-black text-ink">{formatDate(subscription.renewalDate)}</div>
                    </div>
                    <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Total paid</div>
                      <div className="mt-2 text-lg font-black text-ink">{formatCurrency(subscription.amounts.totalAmount)}</div>
                    </div>
                    <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Subscription period</div>
                      <div className="mt-2 text-lg font-black text-ink">
                        {formatDate(subscription.startDate)} - {formatDate(subscription.endDate)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Active add-ons</div>
                    {subscription.addons.length ? (
                      subscription.addons.map((addonEntry) => (
                        <div key={addonEntry.id} className="flex items-center justify-between gap-3 rounded-2xl bg-surface/40 p-3">
                          <div>
                            <div className="text-sm font-semibold text-ink">{addonEntry.addon?.name}</div>
                            <div className="mt-1 text-xs text-ink-soft">Quantity: {addonEntry.quantity}</div>
                          </div>
                          <div className="text-sm font-semibold text-ink">{formatCurrency(addonEntry.totalPrice)}</div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-2xl bg-surface/40 p-3 text-sm text-ink-soft">No add-ons selected.</div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Usage metrics</div>
                    {subscription.usage.length ? (
                      subscription.usage.map((usageEntry) => (
                        <div key={usageEntry.id} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-sm font-semibold text-ink">{usageEntry.metricCode}</div>
                            <div className="text-sm text-ink-soft">
                              {usageEntry.usedValue} / {usageEntry.limitValue}
                            </div>
                          </div>
                          <div className="mt-3 h-2 rounded-full bg-slate-100">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{
                                width: `${Math.min(
                                  100,
                                  usageEntry.limitValue > 0 ? (usageEntry.usedValue / usageEntry.limitValue) * 100 : 0,
                                )}%`,
                              }}
                            />
                          </div>
                          <div className="mt-2 text-xs text-ink-soft">
                            Remaining: {usageEntry.remainingValue} • Period ends {formatDate(usageEntry.periodEnd)}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-2xl bg-surface/40 p-3 text-sm text-ink-soft">No tracked usage yet.</div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/80 bg-white shadow-float">
                <CardHeader>
                  <CardTitle className="text-2xl font-black text-ink">Entitlements</CardTitle>
                  <CardDescription className="mt-1 text-sm text-ink-soft">
                    Features and limits merged from the selected plan and purchased add-ons.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Features</div>
                    <div className="mt-3 space-y-3">
                      {subscription.entitlements.features.map((feature) => (
                        <div key={feature.code} className="flex items-start gap-3 rounded-2xl bg-surface/40 p-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                          <div>
                            <div className="text-sm font-semibold text-ink">{feature.name}</div>
                            <div className="mt-1 text-xs text-ink-soft">Source: {feature.source}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Limits</div>
                    <div className="mt-3 space-y-3">
                      {subscription.entitlements.limits.map((limit) => (
                        <div key={limit.code} className="flex items-center justify-between gap-3 rounded-2xl bg-surface/40 p-3">
                          <div>
                            <div className="text-sm font-semibold text-ink">{limit.name}</div>
                            <div className="mt-1 text-xs text-ink-soft">Source: {limit.source}</div>
                          </div>
                          <div className="text-sm font-semibold text-ink">
                            {limit.isUnlimited ? "Unlimited" : `${limit.value}${limit.unit ? ` ${limit.unit}` : ""}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-dashed border-primary/25 bg-primary-soft/20 p-4 text-sm leading-7 text-ink-soft">
                    Want to change this subscription later? The shared billing system already supports renewal, upgrades and add-on adjustments without touching your other product subscriptions.
                  </div>

                  {upgradeCheckoutHref ? (
                    <Link to={upgradeCheckoutHref} className="btn-primary">
                      Upgrade Employees / Add-ons
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : null}

                  <a href={productContent.openProductHref} className="btn-primary">
                    Open {productContent.shortLabel}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            </div>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
}
