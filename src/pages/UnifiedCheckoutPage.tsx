import { isAxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  LockKeyhole,
  ReceiptText,
  ShieldAlert,
  Sparkles,
  UserRound,
  UserRoundPlus,
} from "lucide-react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import AssetManagementNavbar from "@/components/site/AssetManagementNavbar";
import BulkEmailNavbar from "@/components/site/BulkEmailNavbar";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getBillingProductContent } from "@/data/billingContent";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/routes/routeConfig.js";
import {
  completeBillingPayment,
  createBillingIntent,
  createBillingOrder,
  fetchBillingProduct,
  previewBillingCheckout,
  type BillingAddon,
  type BillingCycle,
  type BillingPlan,
  type BillingProduct,
  type CheckoutBillingDetails,
  type CheckoutPreview,
} from "@/services/billingService";
import {
  loginCustomerAccount,
  registerCustomerAccount,
  type CustomerAuthSession,
} from "@/services/customerAccountAuthService";
import {
  clearCustomerSession,
  loadCustomerSession,
  saveCustomerSession,
} from "@/services/customerSessionStorage";

type CheckoutMode = "login" | "register";

type CheckoutFormState = CheckoutBillingDetails & {
  username: string;
  password: string;
  notes: string;
  couponCode: string;
  paymentMethod: "upi" | "card" | "bank-transfer";
};

const DEFAULT_COUNTRY = "India";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value?: string | Date | null) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function resolveMode(value: string | null): CheckoutMode {
  return value === "login" ? "login" : "register";
}

function resolveBillingCycle(value: string | null): BillingCycle {
  const normalizedValue = value?.trim().toLowerCase();

  if (normalizedValue === "annual" || normalizedValue === "yearly" || normalizedValue === "year") {
    return "annual";
  }

  if (
    normalizedValue === "semiannual" ||
    normalizedValue === "semi-annual" ||
    normalizedValue === "half-yearly" ||
    normalizedValue === "halfyearly" ||
    normalizedValue === "6-month" ||
    normalizedValue === "6-months"
  ) {
    return "semiannual";
  }

  return "monthly";
}

function normalizePlanLookupValue(value: string | number | null | undefined) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function getLegacyPlanAliases(value: string | null) {
  const normalizedValue = normalizePlanLookupValue(value);

  if (normalizedValue === "basic") {
    return ["basic", "starter"];
  }

  if (normalizedValue === "premium") {
    return ["premium", "enterprise"];
  }

  return normalizedValue ? [normalizedValue] : [];
}

function resolvePlanFromParam(product: BillingProduct | null, value: string | null) {
  const plans = product?.plans ?? [];
  const numericPlanId = Number(value);

  if (Number.isInteger(numericPlanId) && numericPlanId > 0) {
    const plan = plans.find((entry) => entry.id === numericPlanId);

    if (plan) {
      return plan;
    }
  }

  const aliases = getLegacyPlanAliases(value);

  return (
    plans.find((plan) => {
      const candidates = [plan.slug, plan.code, plan.name, plan.id].map(normalizePlanLookupValue);

      return aliases.some((alias) => candidates.includes(alias));
    }) ??
    plans[0] ??
    null
  );
}

function resolveEmployeeCount(value: string | null) {
  const employeeCount = Number.parseInt(value ?? "", 10);

  return Number.isFinite(employeeCount) && employeeCount > 0 ? employeeCount : 0;
}

function buildAddonSelectionState(product: BillingProduct | null) {
  const nextState: Record<number, { selected: boolean; quantity: number }> = {};

  for (const addon of product?.addons ?? []) {
    nextState[addon.id] = {
      selected: false,
      quantity: 1,
    };
  }

  return nextState;
}

function getAddonSelections(
  selectionState: Record<number, { selected: boolean; quantity: number }>,
) {
  return Object.entries(selectionState)
    .filter(([, entry]) => entry.selected)
    .map(([addonId, entry]) => ({
      addonId: Number(addonId),
      quantity: entry.quantity,
    }));
}

function renderChrome(navVariant: "default" | "bulkEmail" | "assetManagement") {
  if (navVariant === "bulkEmail") {
    return <BulkEmailNavbar />;
  }

  if (navVariant === "assetManagement") {
    return <AssetManagementNavbar />;
  }

  return (
    <>
      <TopNavbar />
      <MainNavbar />
    </>
  );
}

function getPricingHref(productSlug: string) {
  if (productSlug === "bulk-email") {
    return ROUTES.bulkEmailPricing;
  }

  if (productSlug === "asset-management") {
    return ROUTES.assetManagementPricing;
  }

  return ROUTES.hrmsPricing;
}

function usesQuantity(addon: BillingAddon) {
  return !addon.pricingType.startsWith("FLAT_") && addon.pricingType !== "ONE_TIME";
}

function mapSessionToForm(
  session: CustomerAuthSession,
  current: CheckoutFormState,
): CheckoutFormState {
  return {
    ...current,
    companyName: session.account.companyName,
    contactName: session.account.contactName,
    email: session.account.email,
    phone: session.account.phone ?? "",
    username: session.account.username,
    password: "",
  };
}

export default function UnifiedCheckoutPage() {
  const navigate = useNavigate();
  const { productSlug = "hrms" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const productContent = getBillingProductContent(productSlug);
  const [product, setProduct] = useState<BillingProduct | null>(null);
  const [preview, setPreview] = useState<CheckoutPreview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);
  const [customerSession, setCustomerSession] = useState<CustomerAuthSession | null>(() =>
    loadCustomerSession(),
  );
  const [addonSelections, setAddonSelections] = useState<
    Record<number, { selected: boolean; quantity: number }>
  >({});
  const [form, setForm] = useState<CheckoutFormState>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    gstin: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: DEFAULT_COUNTRY,
    postalCode: "",
    employeeCount: resolveEmployeeCount(searchParams.get("employees")),
    notes: "",
    couponCode: "",
    paymentMethod: "upi",
  });

  const billingCycle = resolveBillingCycle(searchParams.get("billing"));
  const mode = resolveMode(searchParams.get("mode"));
  const selectedPlan = resolvePlanFromParam(product, searchParams.get("plan"));
  const selectedAddonCount = getAddonSelections(addonSelections).length;

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setError(null);

    void fetchBillingProduct(productSlug)
      .then((nextProduct) => {
        if (!isMounted) {
          return;
        }

        setProduct(nextProduct);
        setAddonSelections(buildAddonSelectionState(nextProduct));
      })
      .catch(() => {
        if (isMounted) {
          setError(
            "The product checkout catalog could not be loaded. Start the backend and refresh the page.",
          );
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
  }, [productSlug]);

  useEffect(() => {
    if (!product || !selectedPlan) {
      return;
    }

    const currentPlanParam = searchParams.get("plan");
    const currentBillingParam = searchParams.get("billing");
    const currentModeParam = searchParams.get("mode");
    const shouldNormalizePlan = currentPlanParam !== String(selectedPlan.id);
    const shouldNormalizeBilling = currentBillingParam !== billingCycle;
    const shouldNormalizeMode = currentModeParam !== mode;

    if (!shouldNormalizePlan && !shouldNormalizeBilling && !shouldNormalizeMode) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("plan", String(selectedPlan.id));
    nextParams.set("billing", billingCycle);
    nextParams.set("mode", mode);
    setSearchParams(nextParams, { replace: true });
  }, [billingCycle, mode, product, searchParams, selectedPlan, setSearchParams]);

  useEffect(() => {
    if (!customerSession) {
      return;
    }

    setForm((current) => mapSessionToForm(customerSession, current));
  }, [customerSession]);

  useEffect(() => {
    if (!selectedPlan) {
      setPreview(null);
      return;
    }

    let isMounted = true;
    setIsPreviewLoading(true);

    void previewBillingCheckout({
      productSlug,
      planId: selectedPlan.id,
      billingCycle,
      addonSelections: getAddonSelections(addonSelections),
      couponCode: appliedCouponCode,
    })
      .then((nextPreview) => {
        if (isMounted) {
          setPreview(nextPreview);
        }
      })
      .catch(() => {
        if (isMounted) {
          setPreview(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsPreviewLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [addonSelections, appliedCouponCode, billingCycle, productSlug, selectedPlan]);

  const updateSearchParam = (updates: Partial<Record<"plan" | "billing" | "mode", string>>) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      nextParams.set(key, value);
    });

    setSearchParams(nextParams, { replace: true });
  };

  const updateForm = <K extends keyof CheckoutFormState>(key: K, value: CheckoutFormState[K]) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const toggleAddon = (addonId: number) => {
    setAddonSelections((current) => ({
      ...current,
      [addonId]: {
        ...current[addonId],
        selected: !current[addonId]?.selected,
      },
    }));
  };

  const updateAddonQuantity = (addonId: number, quantity: number) => {
    setAddonSelections((current) => ({
      ...current,
      [addonId]: {
        ...current[addonId],
        selected: true,
        quantity: Math.max(1, Math.round(quantity)),
      },
    }));
  };

  const validateRegister = () => {
    if (!form.companyName?.trim()) {
      toast.error("Enter the company name before continuing.");
      return false;
    }

    if (!form.contactName?.trim()) {
      toast.error("Enter the billing contact before continuing.");
      return false;
    }

    if (!form.email?.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("Enter a valid billing email address.");
      return false;
    }

    if (!form.username.trim()) {
      toast.error("Choose a username for the new account.");
      return false;
    }

    if (form.password.trim().length < 6) {
      toast.error("Enter a password with at least 6 characters.");
      return false;
    }

    return true;
  };

  const validateLogin = () => {
    if (!form.username.trim()) {
      toast.error("Enter the username to continue.");
      return false;
    }

    if (!form.password.trim()) {
      toast.error("Enter the password to continue.");
      return false;
    }

    return true;
  };

  const handleAuthenticate = async () => {
    if (customerSession) {
      return customerSession;
    }

    setIsAuthenticating(true);

    try {
      let session: CustomerAuthSession;

      if (mode === "login") {
        if (!validateLogin()) {
          return null;
        }

        session = await loginCustomerAccount({
          username: form.username.trim(),
          password: form.password,
        });
        toast.success("Login successful. Continue with checkout.");
      } else {
        if (!validateRegister()) {
          return null;
        }

        session = await registerCustomerAccount({
          companyName: form.companyName?.trim() ?? "",
          contactName: form.contactName?.trim() ?? "",
          email: form.email?.trim() ?? "",
          phone: form.phone?.trim() || null,
          username: form.username.trim(),
          password: form.password,
        });
        toast.success("Registration successful. Continue with checkout.");
      }

      saveCustomerSession(session);
      setCustomerSession(session);
      setForm((current) => mapSessionToForm(session, current));
      return session;
    } catch (requestError) {
      if (isAxiosError(requestError)) {
        const message =
          (typeof requestError.response?.data?.message === "string" &&
            requestError.response.data.message) ||
          (typeof requestError.response?.data?.error === "string" &&
            requestError.response.data.error) ||
          null;

        toast.error(message ?? "Unable to continue right now.");
      } else {
        toast.error("Unable to continue right now.");
      }

      return null;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleApplyCoupon = async () => {
    const nextCouponCode = form.couponCode.trim().toUpperCase();

    if (!nextCouponCode) {
      setAppliedCouponCode(null);
      toast.success("Coupon removed from the order summary.");
      return;
    }

    if (!selectedPlan) {
      toast.error("Select a plan before applying a coupon.");
      return;
    }

    try {
      const nextPreview = await previewBillingCheckout({
        productSlug,
        planId: selectedPlan.id,
        billingCycle,
        addonSelections: getAddonSelections(addonSelections),
        couponCode: nextCouponCode,
      });

      setAppliedCouponCode(nextCouponCode);
      setPreview(nextPreview);
      toast.success("Coupon applied successfully.");
    } catch (requestError) {
      if (isAxiosError(requestError)) {
        const message =
          (typeof requestError.response?.data?.message === "string" &&
            requestError.response.data.message) ||
          (typeof requestError.response?.data?.error === "string" &&
            requestError.response.data.error) ||
          null;

        toast.error(message ?? "Coupon could not be applied.");
      } else {
        toast.error("Coupon could not be applied.");
      }
    }
  };

  const handleUseDifferentAccount = () => {
    clearCustomerSession();
    setCustomerSession(null);
    toast.success("Customer session cleared for this browser.");
  };

  const handlePayment = async (outcome: "success" | "failed") => {
    if (!selectedPlan || !preview) {
      toast.error("Select a plan and wait for the summary before paying.");
      return;
    }

    const activeSession = await handleAuthenticate();

    if (!activeSession) {
      return;
    }

    setIsSubmittingPayment(true);

    try {
      const intent = await createBillingIntent(
        {
          productSlug,
          planId: selectedPlan.id,
          billingCycle,
          addonSelections: getAddonSelections(addonSelections),
          couponCode: appliedCouponCode,
          sourceRoute: `/checkout/${productSlug}`,
        },
        activeSession.token,
      );

      const orderResponse = await createBillingOrder(
        {
          intentToken: intent.intentToken,
          productSlug,
          sourceRoute: `/checkout/${productSlug}`,
          notes: form.notes.trim() || null,
          billingDetails: {
            companyName: form.companyName?.trim() || null,
            contactName: form.contactName?.trim() || null,
            email: form.email?.trim() || null,
            phone: form.phone?.trim() || null,
            gstin: form.gstin?.trim() || null,
            addressLine1: form.addressLine1?.trim() || null,
            addressLine2: form.addressLine2?.trim() || null,
            city: form.city?.trim() || null,
            state: form.state?.trim() || null,
            country: form.country?.trim() || null,
            postalCode: form.postalCode?.trim() || null,
            employeeCount: Number(form.employeeCount) || 0,
          },
        },
        activeSession.token,
      );

      const paymentResponse = await completeBillingPayment(
        {
          orderNumber: orderResponse.order.orderNumber,
          outcome,
          paymentMethod: form.paymentMethod,
          gatewayProvider: "sandbox",
          failureReason: outcome === "failed" ? "Sandbox failure requested from checkout." : null,
        },
        activeSession.token,
      );

      navigate(
        `${outcome === "success" ? ROUTES.paymentSuccess : ROUTES.paymentFailed}?${new URLSearchParams(
          {
            order: paymentResponse.order.orderNumber,
          },
        ).toString()}`,
      );
    } catch (requestError) {
      if (isAxiosError(requestError)) {
        const message =
          (typeof requestError.response?.data?.message === "string" &&
            requestError.response.data.message) ||
          (typeof requestError.response?.data?.error === "string" &&
            requestError.response.data.error) ||
          null;

        toast.error(message ?? "Unable to process the checkout right now.");
      } else {
        toast.error("Unable to process the checkout right now.");
      }
    } finally {
      setIsSubmittingPayment(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={`${productContent.productLabel} Checkout | Altroz`}
        description={`Complete the ${productContent.productLabel} plan selection, add-ons, GST and payment flow using the shared Altroz checkout architecture.`}
        canonicalPath={`/checkout/${productSlug}`}
      />
      {renderChrome(productContent.navVariant)}

      <main className="overflow-x-hidden">
        <section className="hero-gradient relative overflow-hidden py-10 sm:py-14 lg:py-16">
          <div className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 top-12 h-64 w-64 rounded-full bg-success/10 blur-3xl" />

          <div className="container-x">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="border-primary/20 bg-primary-soft px-4 py-2 text-primary shadow-sm">
                Shared checkout
              </Badge>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">
                {productContent.productLabel} subscription checkout
              </h1>
              <p className="mt-4 text-base leading-8 text-ink-soft sm:text-lg">
                Keep login, registration, add-ons, taxes, payment status, activation and renewals
                aligned under one reusable flow.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="container-x grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card className="border-border/80 bg-white shadow-float">
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl font-black text-ink">
                      Configure your order
                    </CardTitle>
                    <CardDescription className="mt-1 text-sm text-ink-soft">
                      Switch plans, choose monthly or longer billing, add product-specific extras,
                      then authenticate and pay.
                    </CardDescription>
                  </div>
                  <Link to={getPricingHref(productSlug)} className="btn-outline">
                    <ArrowLeft className="h-4 w-4" />
                    Back to pricing
                  </Link>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {isLoading ? (
                  <div className="rounded-[1.5rem] border border-border bg-surface/40 p-6 text-sm text-ink-soft">
                    Loading checkout catalog...
                  </div>
                ) : error ? (
                  <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
                    {error}
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                          Plan selection
                        </div>
                        <h2 className="mt-2 text-xl font-black text-ink">
                          Choose the plan you want to activate
                        </h2>
                      </div>

                      <div className="grid gap-3 lg:grid-cols-3">
                        {(product?.plans ?? []).map((plan) => {
                          const isSelected = selectedPlan?.id === plan.id;
                          const cyclePrice =
                            billingCycle === "annual"
                              ? plan.annualPrice
                              : billingCycle === "semiannual"
                                ? plan.semiannualPrice
                                : plan.monthlyPrice;

                          return (
                            <button
                              key={plan.id}
                              type="button"
                              aria-pressed={isSelected}
                              onClick={() =>
                                updateSearchParam({
                                  plan: String(plan.id),
                                })
                              }
                              className={cn(
                                "rounded-[1.5rem] border p-5 text-left shadow-sm transition-all",
                                isSelected
                                  ? "border-primary bg-primary-soft/40 ring-1 ring-primary/10"
                                  : "border-border bg-white hover:border-primary/30",
                              )}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                                  {plan.name}
                                </div>
                                {isSelected ? (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                    Selected
                                  </span>
                                ) : null}
                              </div>
                              <div className="mt-3 text-3xl font-black text-ink">
                                {formatCurrency(cyclePrice)}
                              </div>
                              <div className="mt-1 text-sm text-ink-soft">
                                {billingCycle === "annual"
                                  ? "for 1 year"
                                  : billingCycle === "semiannual"
                                    ? "for 6 months"
                                    : "for 1 month"}
                              </div>
                              <p className="mt-3 text-sm leading-7 text-ink-soft">
                                {plan.description}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                          Billing cycle
                        </div>
                        <h2 className="mt-2 text-xl font-black text-ink">
                          Set the renewal timeline
                        </h2>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3">
                        {[
                          {
                            value: "monthly",
                            label: "Monthly",
                            description: "Renews every month.",
                          },
                          {
                            value: "semiannual",
                            label: "6 Months",
                            description: "Renews every 6 months.",
                          },
                          {
                            value: "annual",
                            label: "1 Year",
                            description: "Renews once per year.",
                          },
                        ].map((cycle) => {
                          const isSelected = billingCycle === cycle.value;

                          return (
                            <button
                              key={cycle.value}
                              type="button"
                              onClick={() =>
                                updateSearchParam({
                                  billing: cycle.value,
                                })
                              }
                              className={cn(
                                "rounded-[1.5rem] border p-4 text-left shadow-sm transition-all",
                                isSelected
                                  ? "border-primary bg-white ring-1 ring-primary/10"
                                  : "border-border bg-surface/40 hover:border-primary/30 hover:bg-white",
                              )}
                            >
                              <div className="text-sm font-semibold text-ink">{cycle.label}</div>
                              <div className="mt-1 text-xs leading-6 text-ink-soft">
                                {cycle.description}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                            Add-ons
                          </div>
                          <h2 className="mt-2 text-xl font-black text-ink">
                            Optional extras for {productContent.shortLabel}
                          </h2>
                        </div>
                        <Badge className="border-primary/20 bg-primary-soft text-primary">
                          {selectedAddonCount} selected
                        </Badge>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        {(product?.addons ?? []).map((addon) => {
                          const state = addonSelections[addon.id] ?? {
                            selected: false,
                            quantity: 1,
                          };
                          const displayPrice =
                            billingCycle === "annual"
                              ? (addon.annualPrice ?? addon.unitPrice ?? addon.monthlyPrice ?? 0)
                              : billingCycle === "semiannual"
                                ? (addon.semiannualPrice ??
                                  addon.unitPrice ??
                                  addon.monthlyPrice ??
                                  0)
                                : (addon.monthlyPrice ?? addon.unitPrice ?? 0);

                          return (
                            <div
                              key={addon.id}
                              className={cn(
                                "rounded-[1.5rem] border p-4 shadow-sm transition-all",
                                state.selected
                                  ? "border-primary bg-primary-soft/40 ring-1 ring-primary/10"
                                  : "border-border bg-white",
                              )}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                                    {addon.pricingType.replaceAll("_", " ")}
                                  </div>
                                  <div className="mt-2 text-lg font-black text-ink">
                                    {addon.name}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => toggleAddon(addon.id)}
                                  className={cn(
                                    "rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
                                    state.selected
                                      ? "border-primary bg-primary text-white"
                                      : "border-border bg-white text-ink",
                                  )}
                                >
                                  {state.selected ? "Added" : "Add"}
                                </button>
                              </div>

                              <p className="mt-3 text-sm leading-7 text-ink-soft">
                                {addon.description}
                              </p>
                              <div className="mt-4 flex items-center justify-between gap-3">
                                <div className="text-sm font-semibold text-ink">
                                  {formatCurrency(displayPrice)}
                                </div>
                                {usesQuantity(addon) ? (
                                  <div className="flex items-center gap-2">
                                    <Label
                                      htmlFor={`addon-${addon.id}-quantity`}
                                      className="text-xs text-ink-soft"
                                    >
                                      Qty
                                    </Label>
                                    <Input
                                      id={`addon-${addon.id}-quantity`}
                                      type="number"
                                      min={1}
                                      className="h-10 w-24"
                                      value={state.quantity}
                                      onChange={(event) =>
                                        updateAddonQuantity(
                                          addon.id,
                                          Number.parseInt(event.target.value || "1", 10) || 1,
                                        )
                                      }
                                    />
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                          Access step
                        </div>
                        <h2 className="mt-2 text-xl font-black text-ink">
                          {mode === "login" ? "Login to continue" : "Register to continue"}
                        </h2>
                        <p className="mt-2 text-sm leading-7 text-ink-soft">
                          Existing users authenticate with username and password only. New users
                          create the account first, then continue with the same shared checkout.
                        </p>
                      </div>

                      <div className="grid gap-3 rounded-[1.5rem] border border-border bg-surface/40 p-3 sm:grid-cols-2">
                        {[
                          {
                            value: "login",
                            title: "Existing user",
                            description: "Only username and password are required here.",
                            icon: LockKeyhole,
                          },
                          {
                            value: "register",
                            title: "New user",
                            description: "Create the account first, then continue to payment.",
                            icon: UserRoundPlus,
                          },
                        ].map((option) => {
                          const isSelected = mode === option.value;

                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => updateSearchParam({ mode: option.value })}
                              className={cn(
                                "rounded-[1.25rem] border p-4 text-left transition-all",
                                isSelected
                                  ? "border-primary bg-white shadow-sm ring-1 ring-primary/10"
                                  : "border-transparent bg-transparent hover:border-primary/20 hover:bg-white",
                              )}
                            >
                              <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                                <option.icon className="h-4 w-4 text-primary" />
                                {option.title}
                              </div>
                              <div className="mt-2 text-xs leading-6 text-ink-soft">
                                {option.description}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {customerSession ? (
                        <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-4">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">
                                Authenticated account
                              </div>
                              <p className="mt-2 text-sm leading-7 text-emerald-800">
                                Logged in as {customerSession.account.username}. This customer
                                session will receive the {productContent.productLabel} order and
                                renewal records.
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleUseDifferentAccount}
                            >
                              Use different account
                            </Button>
                          </div>
                        </div>
                      ) : mode === "login" ? (
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="checkout-login-username">Username</Label>
                            <Input
                              id="checkout-login-username"
                              value={form.username}
                              onChange={(event) => updateForm("username", event.target.value)}
                              placeholder="Enter username"
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="checkout-login-password">Password</Label>
                            <Input
                              id="checkout-login-password"
                              type="password"
                              value={form.password}
                              onChange={(event) => updateForm("password", event.target.value)}
                              placeholder="Enter password"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="checkout-company-name">Company name</Label>
                            <Input
                              id="checkout-company-name"
                              value={form.companyName ?? ""}
                              onChange={(event) => updateForm("companyName", event.target.value)}
                              placeholder="Your company name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="checkout-contact-name">Billing contact</Label>
                            <Input
                              id="checkout-contact-name"
                              value={form.contactName ?? ""}
                              onChange={(event) => updateForm("contactName", event.target.value)}
                              placeholder="Full name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="checkout-phone">Phone number</Label>
                            <Input
                              id="checkout-phone"
                              value={form.phone ?? ""}
                              onChange={(event) => updateForm("phone", event.target.value)}
                              placeholder="+91 98765 43210"
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="checkout-email">Billing email</Label>
                            <Input
                              id="checkout-email"
                              type="email"
                              value={form.email ?? ""}
                              onChange={(event) => updateForm("email", event.target.value)}
                              placeholder="billing@company.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="checkout-register-username">Username</Label>
                            <Input
                              id="checkout-register-username"
                              value={form.username}
                              onChange={(event) => updateForm("username", event.target.value)}
                              placeholder="Choose a username"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="checkout-register-password">Password</Label>
                            <Input
                              id="checkout-register-password"
                              type="password"
                              value={form.password}
                              onChange={(event) => updateForm("password", event.target.value)}
                              placeholder="Create a password"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                          Billing details
                        </div>
                        <h2 className="mt-2 text-xl font-black text-ink">
                          Details that flow into admin and invoices
                        </h2>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="checkout-company-name-billing">Company name</Label>
                          <Input
                            id="checkout-company-name-billing"
                            value={form.companyName ?? ""}
                            onChange={(event) => updateForm("companyName", event.target.value)}
                            placeholder="Company or legal entity name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="checkout-contact-name-billing">Billing contact</Label>
                          <Input
                            id="checkout-contact-name-billing"
                            value={form.contactName ?? ""}
                            onChange={(event) => updateForm("contactName", event.target.value)}
                            placeholder="Billing contact name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="checkout-employee-count">Employee count</Label>
                          <Input
                            id="checkout-employee-count"
                            type="number"
                            min={0}
                            value={String(form.employeeCount ?? 0)}
                            onChange={(event) =>
                              updateForm(
                                "employeeCount",
                                Number.parseInt(event.target.value || "0", 10) || 0,
                              )
                            }
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="checkout-gstin">GSTIN</Label>
                          <Input
                            id="checkout-gstin"
                            value={form.gstin ?? ""}
                            onChange={(event) => updateForm("gstin", event.target.value)}
                            placeholder="GST number if available"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="checkout-postal-code">PIN / postal code</Label>
                          <Input
                            id="checkout-postal-code"
                            value={form.postalCode ?? ""}
                            onChange={(event) => updateForm("postalCode", event.target.value)}
                            placeholder="PIN code"
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="checkout-address-line-1">Address line 1</Label>
                          <Input
                            id="checkout-address-line-1"
                            value={form.addressLine1 ?? ""}
                            onChange={(event) => updateForm("addressLine1", event.target.value)}
                            placeholder="Street, building or office address"
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="checkout-address-line-2">Address line 2</Label>
                          <Input
                            id="checkout-address-line-2"
                            value={form.addressLine2 ?? ""}
                            onChange={(event) => updateForm("addressLine2", event.target.value)}
                            placeholder="Additional address information"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="checkout-city">City</Label>
                          <Input
                            id="checkout-city"
                            value={form.city ?? ""}
                            onChange={(event) => updateForm("city", event.target.value)}
                            placeholder="City"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="checkout-state">State</Label>
                          <Input
                            id="checkout-state"
                            value={form.state ?? ""}
                            onChange={(event) => updateForm("state", event.target.value)}
                            placeholder="State"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="checkout-country">Country</Label>
                          <Input
                            id="checkout-country"
                            value={form.country ?? DEFAULT_COUNTRY}
                            onChange={(event) => updateForm("country", event.target.value)}
                            placeholder="Country"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="checkout-billing-phone">Billing phone</Label>
                          <Input
                            id="checkout-billing-phone"
                            value={form.phone ?? ""}
                            onChange={(event) => updateForm("phone", event.target.value)}
                            placeholder="Billing phone"
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="checkout-billing-email-alt">Billing email</Label>
                          <Input
                            id="checkout-billing-email-alt"
                            type="email"
                            value={form.email ?? ""}
                            onChange={(event) => updateForm("email", event.target.value)}
                            placeholder="billing@company.com"
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="checkout-coupon">Coupon code</Label>
                          <div className="flex gap-3">
                            <Input
                              id="checkout-coupon"
                              value={form.couponCode}
                              onChange={(event) => updateForm("couponCode", event.target.value)}
                              placeholder="Enter coupon code"
                            />
                            <Button type="button" variant="outline" onClick={handleApplyCoupon}>
                              Apply
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="checkout-notes">Notes for onboarding or billing</Label>
                          <Textarea
                            id="checkout-notes"
                            value={form.notes}
                            onChange={(event) => updateForm("notes", event.target.value)}
                            placeholder="Add onboarding notes, PO references or billing remarks"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                          Payment method
                        </div>
                        <h2 className="mt-2 text-xl font-black text-ink">
                          Choose how this payment is recorded
                        </h2>
                      </div>

                      <div className="grid gap-3 md:grid-cols-3">
                        {[
                          {
                            value: "upi",
                            label: "UPI",
                            description: "Fast online settlement.",
                          },
                          {
                            value: "card",
                            label: "Card",
                            description: "Standard card-based checkout.",
                          },
                          {
                            value: "bank-transfer",
                            label: "Bank Transfer",
                            description: "For finance-led settlements.",
                          },
                        ].map((method) => {
                          const isSelected = form.paymentMethod === method.value;

                          return (
                            <button
                              key={method.value}
                              type="button"
                              onClick={() => updateForm("paymentMethod", method.value)}
                              className={cn(
                                "rounded-[1.5rem] border p-4 text-left shadow-sm transition-all",
                                isSelected
                                  ? "border-primary bg-white ring-1 ring-primary/10"
                                  : "border-border bg-surface/40 hover:border-primary/30 hover:bg-white",
                              )}
                            >
                              <div className="text-sm font-semibold text-ink">{method.label}</div>
                              <div className="mt-1 text-xs leading-6 text-ink-soft">
                                {method.description}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-sm text-ink-soft">
                        {customerSession
                          ? `Authenticated as ${customerSession.account.username}.`
                          : mode === "login"
                            ? "Login with username and password before payment."
                            : "Register the account before payment is recorded."}
                      </span>
                      <div className="flex flex-wrap gap-3">
                        {!customerSession ? (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => void handleAuthenticate()}
                            disabled={isAuthenticating}
                          >
                            {isAuthenticating
                              ? "Please wait..."
                              : mode === "login"
                                ? "Login and continue"
                                : "Register and continue"}
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        ) : null}

                        <Button
                          type="button"
                          onClick={() => void handlePayment("success")}
                          disabled={
                            isSubmittingPayment ||
                            isAuthenticating ||
                            !selectedPlan ||
                            isPreviewLoading
                          }
                        >
                          {isSubmittingPayment ? "Processing..." : "Pay now"}
                          <ArrowRight className="h-4 w-4" />
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => void handlePayment("failed")}
                          disabled={
                            isSubmittingPayment ||
                            isAuthenticating ||
                            !selectedPlan ||
                            isPreviewLoading
                          }
                        >
                          <ShieldAlert className="h-4 w-4" />
                          Simulate failed payment
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-border/80 bg-white shadow-float">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl font-black text-ink">Order summary</CardTitle>
                      <CardDescription className="mt-1 text-sm text-ink-soft">
                        Prices, coupons, GST and the total payable amount are calculated by the
                        backend.
                      </CardDescription>
                    </div>
                    <Badge className="border-primary/20 bg-primary-soft text-primary">
                      {preview?.pricing.billingCycleLabel ?? "Loading"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {selectedPlan ? (
                    <div className="rounded-2xl border border-border bg-surface/30 p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                        Selected plan
                      </div>
                      <div className="mt-2 text-2xl font-black text-ink">{selectedPlan.name}</div>
                      <p className="mt-2 text-sm text-ink-soft">{selectedPlan.description}</p>
                    </div>
                  ) : null}

                  {isPreviewLoading ? (
                    <div className="rounded-2xl border border-border bg-surface/30 p-4 text-sm text-ink-soft">
                      Recalculating the summary...
                    </div>
                  ) : preview ? (
                    <>
                      <div className="space-y-3 text-sm text-ink-soft">
                        <div className="flex items-center justify-between gap-3">
                          <span className="inline-flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            Base plan
                          </span>
                          <span className="font-semibold text-ink">
                            {formatCurrency(preview.pricing.baseAmount)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="inline-flex items-center gap-2">
                            <ReceiptText className="h-4 w-4 text-primary" />
                            Add-ons
                          </span>
                          <span className="font-semibold text-ink">
                            {formatCurrency(preview.pricing.addonAmount)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span>Subtotal</span>
                          <span className="font-semibold text-ink">
                            {formatCurrency(preview.pricing.subtotalAmount)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span>Discount</span>
                          <span className="font-semibold text-ink">
                            - {formatCurrency(preview.pricing.discountAmount)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span>
                            {preview.pricing.taxName} ({preview.pricing.taxRate}%)
                          </span>
                          <span className="font-semibold text-ink">
                            {formatCurrency(preview.pricing.taxAmount)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3 border-t border-border pt-3 text-base">
                          <span className="font-semibold text-ink">Total payable</span>
                          <span className="font-black text-ink">
                            {formatCurrency(preview.pricing.totalAmount)}
                          </span>
                        </div>
                      </div>

                      {preview.selectedAddons.length ? (
                        <div className="rounded-2xl border border-border bg-surface/30 p-4">
                          <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                            Selected add-ons
                          </div>
                          <div className="mt-3 space-y-3">
                            {preview.selectedAddons.map((addonLine) => (
                              <div
                                key={addonLine.addonId}
                                className="flex items-center justify-between gap-3 text-sm"
                              >
                                <span className="text-ink-soft">
                                  {addonLine.name} x {addonLine.quantity}
                                </span>
                                <span className="font-semibold text-ink">
                                  {formatCurrency(addonLine.totalPrice)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      <div className="rounded-2xl border border-dashed border-primary/25 bg-primary-soft/20 p-4 text-sm leading-7 text-ink-soft">
                        Renewal preview:{" "}
                        <span className="font-semibold text-ink">
                          {formatDate(preview.pricing.nextRenewalDate)}
                        </span>
                        . This same date is what the admin subscription table will use after payment
                        succeeds.
                      </div>
                    </>
                  ) : (
                    <div className="rounded-2xl border border-border bg-surface/30 p-4 text-sm text-ink-soft">
                      Choose a plan to load the live summary.
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-border/80 bg-white shadow-float">
                <CardHeader>
                  <CardTitle className="text-2xl font-black text-ink">What gets saved</CardTitle>
                  <CardDescription className="mt-1 text-sm text-ink-soft">
                    Every successful payment creates reusable records for customers, subscriptions,
                    payments and invoices.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  {[
                    "Product, plan and billing cycle",
                    "GST, subtotal, add-ons and final payable amount",
                    "Company, billing contact and address details",
                    "Independent renewal date for the selected cycle",
                    "Payment, invoice and subscription records for admin",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl bg-surface/40 p-3"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                      <span className="text-sm leading-6 text-ink">{item}</span>
                    </div>
                  ))}

                  <div className="rounded-2xl border border-dashed border-border p-4 text-sm leading-7 text-ink-soft">
                    Sandbox note: use <span className="font-semibold text-ink">Pay now</span> to
                    activate the subscription or{" "}
                    <span className="font-semibold text-ink">Simulate failed payment</span> to
                    verify the failure screen and retry flow locally.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
