import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Download, RefreshCcw, XCircle } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
import { fetchBillingOrder, type BillingOrder } from "@/services/billingService";
import { loadCustomerSession } from "@/services/customerSessionStorage";

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

function downloadInvoice(order: BillingOrder) {
  const invoice = order.invoice;

  if (!invoice) {
    toast.error("No invoice was generated for this order.");
    return;
  }

  const content = [
    `Invoice: ${invoice.invoiceNumber}`,
    `Order: ${order.orderNumber}`,
    `Product: ${order.product?.name ?? "Product"}`,
    `Plan: ${order.plan?.name ?? "Plan"}`,
    `Billing Period: ${formatDate(invoice.billingPeriodStart)} - ${formatDate(invoice.billingPeriodEnd)}`,
    `Subtotal: ${formatCurrency(invoice.subtotalAmount)}`,
    `Add-ons: ${formatCurrency(invoice.addonAmount)}`,
    `Discount: ${formatCurrency(invoice.discountAmount)}`,
    `Tax: ${formatCurrency(invoice.taxAmount)}`,
    `Total: ${formatCurrency(invoice.totalAmount)}`,
  ].join("\n");

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = `${invoice.invoiceNumber}.txt`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function PaymentStatusPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("order") ?? "";
  const isSuccess = location.pathname === ROUTES.paymentSuccess;
  const [order, setOrder] = useState<BillingOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const customerSession = loadCustomerSession();

  useEffect(() => {
    if (!customerSession?.token || !orderNumber) {
      navigate(ROUTES.dashboard, { replace: true });
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    void fetchBillingOrder(orderNumber, customerSession.token)
      .then((nextOrder) => {
        if (isMounted) {
          setOrder(nextOrder);
        }
      })
      .catch(() => {
        if (isMounted) {
          toast.error("The order summary could not be loaded.");
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
  }, [customerSession?.token, navigate, orderNumber]);

  const productContent = getBillingProductContent(order?.product?.slug ?? "hrms");

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={isSuccess ? "Payment Successful | Altroz" : "Payment Failed | Altroz"}
        description={
          isSuccess
            ? "Review the activated Altroz subscription, renewal date and invoice details."
            : "Review the failed Altroz payment attempt and retry the checkout."
        }
        canonicalPath={isSuccess ? ROUTES.paymentSuccess : ROUTES.paymentFailed}
      />
      <TopNavbar />
      <MainNavbar />

      <main className="hero-gradient min-h-[calc(100vh-160px)] py-14 sm:py-16 lg:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-4xl space-y-6">
            <Card className="border-border/80 bg-white shadow-float">
              <CardContent className="flex flex-col items-center gap-5 p-8 text-center sm:p-10">
                <div
                  className={`grid h-20 w-20 place-items-center rounded-full ${
                    isSuccess ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {isSuccess ? <CheckCircle2 className="h-10 w-10" /> : <XCircle className="h-10 w-10" />}
                </div>
                <div>
                  <Badge className={isSuccess ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}>
                    {isSuccess ? "Payment successful" : "Payment failed"}
                  </Badge>
                  <h1 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">
                    {isSuccess ? "Subscription activated" : "Subscription not activated"}
                  </h1>
                  <p className="mt-4 text-base leading-8 text-ink-soft sm:text-lg">
                    {isSuccess
                      ? `Your ${order?.product?.name ?? productContent.productLabel} ${order?.plan?.name ?? ""} plan is now active.`
                      : "The order is still available for retry, and no active subscription was created for this payment attempt."}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/80 bg-white shadow-float">
              <CardHeader>
                <CardTitle className="text-2xl font-black text-ink">Order details</CardTitle>
                <CardDescription className="mt-1 text-sm text-ink-soft">
                  Product, plan, amount, payment reference and renewal information from the shared billing flow.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="rounded-2xl border border-border bg-surface/40 p-6 text-sm text-ink-soft">
                    Loading order details...
                  </div>
                ) : order ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-border bg-surface/30 p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Order ID</div>
                      <div className="mt-2 text-lg font-black text-ink">{order.orderNumber}</div>
                    </div>
                    <div className="rounded-2xl border border-border bg-surface/30 p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Transaction ID</div>
                      <div className="mt-2 text-lg font-black text-ink">{order.payment?.gatewayTransactionId ?? "—"}</div>
                    </div>
                    <div className="rounded-2xl border border-border bg-surface/30 p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Product</div>
                      <div className="mt-2 text-lg font-black text-ink">{order.product?.name}</div>
                    </div>
                    <div className="rounded-2xl border border-border bg-surface/30 p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Plan</div>
                      <div className="mt-2 text-lg font-black text-ink">{order.plan?.name}</div>
                    </div>
                    <div className="rounded-2xl border border-border bg-surface/30 p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Amount paid</div>
                      <div className="mt-2 text-lg font-black text-ink">{formatCurrency(order.totalAmount)}</div>
                    </div>
                    <div className="rounded-2xl border border-border bg-surface/30 p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Billing cycle</div>
                      <div className="mt-2 text-lg font-black text-ink">{order.billingCycleLabel}</div>
                    </div>

                    {order.selectedAddons.length ? (
                      <div className="rounded-2xl border border-border bg-surface/30 p-4 md:col-span-2">
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Add-ons</div>
                        <div className="mt-3 space-y-3">
                          {order.selectedAddons.map((addon) => (
                            <div key={`${order.orderNumber}-${addon.addonId}`} className="flex items-center justify-between gap-3 text-sm">
                              <span className="text-ink-soft">
                                {addon.name} x {addon.quantity}
                              </span>
                              <span className="font-semibold text-ink">{formatCurrency(addon.totalPrice)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {order.subscription ? (
                      <div className="rounded-2xl border border-border bg-surface/30 p-4 md:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-3">
                          <div>
                            <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Subscription start</div>
                            <div className="mt-2 text-lg font-black text-ink">{formatDate(order.subscription.startDate)}</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Subscription expiry</div>
                            <div className="mt-2 text-lg font-black text-ink">{formatDate(order.subscription.endDate)}</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Next renewal</div>
                            <div className="mt-2 text-lg font-black text-ink">{formatDate(order.subscription.renewalDate)}</div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-border bg-surface/40 p-6 text-sm text-ink-soft">
                    No order details are available.
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-border/80 bg-white shadow-float">
              <CardHeader>
                <CardTitle className="text-2xl font-black text-ink">Next steps</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                {isSuccess ? (
                  <>
                    <Link to={ROUTES.dashboard} className="btn-primary">
                      Go to dashboard
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a href={productContent.openProductHref} className="btn-outline">
                      Open {productContent.shortLabel}
                    </a>
                    <Button type="button" variant="outline" onClick={() => order && downloadInvoice(order)}>
                      <Download className="h-4 w-4" />
                      Download invoice
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      to={
                        order
                          ? `/checkout/${order.product?.slug ?? "hrms"}?${new URLSearchParams({
                              plan: String(order.plan?.id ?? ""),
                              billing: order.billingCycle,
                              mode: "login",
                            }).toString()}`
                          : ROUTES.hrmsPricing
                      }
                      className="btn-primary"
                    >
                      <RefreshCcw className="h-4 w-4" />
                      Try again
                    </Link>
                    <Link to={order ? `/checkout/${order.product?.slug ?? "hrms"}` : ROUTES.hrmsPricing} className="btn-outline">
                      Return to checkout
                    </Link>
                    <Link to={ROUTES.dashboard} className="btn-outline">
                      Go to dashboard
                    </Link>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
