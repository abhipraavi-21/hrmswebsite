import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, MinusCircle, Sparkles } from "lucide-react";
import { Link, createSearchParams, useLocation } from "react-router-dom";
import BulkEmailNavbar from "@/components/site/BulkEmailNavbar";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import PricingAccessSection from "@/components/site/PricingAccessSection";
import TopNavbar from "@/components/site/TopNavbar";
import AssetManagementNavbar from "@/components/site/AssetManagementNavbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { BILLING_PRODUCT_CONTENT, getBillingProductContent } from "@/data/billingContent";
import { ROUTES } from "@/routes/routeConfig.js";
import {
  fetchBillingProduct,
  type BillingCycle,
  type BillingPlan,
  type BillingProduct,
} from "@/services/billingService";

type PricingDisplayCycle = "monthly" | "annual";

const legacyHrmsPlans = [
  {
    name: "Basic",
    slug: "basic",
    monthlyPrice: 21,
    annualPrice: 252,
    description: "Core HR, attendance, leave and administration for compact teams.",
  },
  {
    name: "Professional",
    slug: "professional",
    monthlyPrice: 36,
    annualPrice: 432,
    description: "Broader HR operations with payroll, documents, compliance and assets.",
  },
  {
    name: "Premium",
    slug: "premium",
    monthlyPrice: 53,
    annualPrice: 636,
    description: "Full coverage for larger rollouts and advanced operational needs.",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function resolvePricingProductSlug(pathname: string) {
  if (pathname.startsWith(ROUTES.bulkEmailPricing)) {
    return "bulk-email";
  }

  if (pathname.startsWith(ROUTES.assetManagementPricing)) {
    return "asset-management";
  }

  return "hrms";
}

function getCheckoutHref(
  productSlug: string,
  planId: number,
  billingCycle: BillingCycle,
  mode: "login" | "register",
) {
  return `/checkout/${productSlug}?${createSearchParams({
    plan: String(planId),
    billing: billingCycle,
    mode,
  })}`;
}

function getHrmsPurchaseHref(
  planSlug: string,
  billingCycle: BillingCycle,
  mode: "login" | "register",
) {
  return `${ROUTES.hrmsPricingPurchase}?${createSearchParams({
    plan: planSlug,
    employees: "25",
    billing: billingCycle === "annual" ? "yearly" : "monthly",
    mode,
  })}`;
}

function getPlanCheckoutHref(
  productSlug: string,
  plan: BillingPlan | null,
  billingCycle: BillingCycle,
  mode: "login" | "register",
) {
  if (!plan) {
    return productSlug === "hrms" ? ROUTES.hrmsPricingPurchase : `/checkout/${productSlug}`;
  }

  return productSlug === "hrms"
    ? getHrmsPurchaseHref(plan.slug, billingCycle, mode)
    : getCheckoutHref(productSlug, plan.id, billingCycle, mode);
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

function getDisplayPrice(plan: BillingPlan, cycle: PricingDisplayCycle) {
  return cycle === "annual" ? plan.annualPrice : plan.monthlyPrice;
}

function getFeatureRows(product: BillingProduct | null) {
  if (!product) {
    return [];
  }

  const featureMap = new Map<
    string,
    {
      code: string;
      label: string;
      values: Record<number, string | boolean>;
    }
  >();

  for (const plan of product.plans) {
    for (const feature of plan.features) {
      const existing = featureMap.get(feature.code) ?? {
        code: feature.code,
        label: feature.name,
        values: {},
      };

      existing.values[plan.id] = feature.enabled;
      featureMap.set(feature.code, existing);
    }

    for (const limit of plan.limits) {
      const key = `limit:${limit.code}`;
      const existing = featureMap.get(key) ?? {
        code: key,
        label: limit.name,
        values: {},
      };

      existing.values[plan.id] = limit.isUnlimited
        ? "Unlimited"
        : `${limit.value}${limit.unit ? ` ${limit.unit}` : ""}`;
      featureMap.set(key, existing);
    }
  }

  return [...featureMap.values()];
}

function normalizeHrmsProduct(product: BillingProduct | null, productSlug: string) {
  if (!product || productSlug !== "hrms") {
    return product;
  }

  return {
    ...product,
    plans: product.plans.map((plan, index) => {
      const legacyPlan = legacyHrmsPlans[index] ?? legacyHrmsPlans[legacyHrmsPlans.length - 1];

      return {
        ...plan,
        name: legacyPlan.name,
        slug: legacyPlan.slug,
        description: legacyPlan.description,
        monthlyPrice: legacyPlan.monthlyPrice,
        annualPrice: legacyPlan.annualPrice,
      };
    }),
  };
}

function StatusCell({ value }: { value?: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Included
      </span>
    ) : (
      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
        <MinusCircle className="h-3.5 w-3.5" />
        Not included
      </span>
    );
  }

  return <span className="text-sm font-semibold text-ink">{value ?? "—"}</span>;
}

export default function PricingPage() {
  const location = useLocation();
  const productSlug = resolvePricingProductSlug(location.pathname);
  const productContent = getBillingProductContent(productSlug);
  const ProductIcon = productContent.icon;
  const [displayCycle, setDisplayCycle] = useState<PricingDisplayCycle>("monthly");
  const [product, setProduct] = useState<BillingProduct | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setSelectedPlanId(nextProduct.plans[0]?.id ?? null);
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setError(
          "The pricing catalog could not be loaded. Start the backend and refresh the page.",
        );
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

  const displayProduct = useMemo(
    () => normalizeHrmsProduct(product, productSlug),
    [product, productSlug],
  );
  const activePlans = useMemo(
    () =>
      (displayProduct?.plans ?? [])
        .filter((plan) => plan.status === "active")
        .sort((left, right) => left.displayOrder - right.displayOrder),
    [displayProduct?.plans],
  );
  const selectedPlan =
    activePlans.find((plan) => plan.id === selectedPlanId) ?? activePlans[0] ?? null;
  const comparisonRows = useMemo(() => getFeatureRows(displayProduct), [displayProduct]);
  const checkoutBillingCycle: BillingCycle = displayCycle === "annual" ? "annual" : "monthly";
  const loginHref = getPlanCheckoutHref(productSlug, selectedPlan, checkoutBillingCycle, "login");
  const registerHref = getPlanCheckoutHref(
    productSlug,
    selectedPlan,
    checkoutBillingCycle,
    "register",
  );

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={`${productContent.productLabel} Pricing | Altroz`}
        description={productContent.heroDescription}
        canonicalPath={
          productSlug === "bulk-email"
            ? ROUTES.bulkEmailPricing
            : productSlug === "asset-management"
              ? ROUTES.assetManagementPricing
              : ROUTES.hrmsPricing
        }
      />
      {renderChrome(productContent.navVariant)}

      <main className="overflow-x-hidden">
        <section className="hero-gradient relative overflow-hidden py-14 sm:py-16 lg:py-20">
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 top-12 h-72 w-72 rounded-full bg-success/10 blur-3xl" />
          <div className="container-x grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <Badge className="border-primary/20 bg-primary-soft px-4 py-2 text-primary shadow-sm">
                <Sparkles className="mr-2 h-4 w-4" />
                {productContent.heroEyebrow}
              </Badge>
              <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                {productContent.heroTitle}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-ink-soft sm:text-lg">
                {productContent.heroDescription}
              </p>

              <div className="mt-7 space-y-3">
                {productContent.heroBullets.map((bullet) => (
                  <div
                    key={bullet}
                    className="flex items-start gap-3 rounded-2xl bg-white/80 px-4 py-3 shadow-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span className="text-sm leading-7 text-ink">{bullet}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to={getPlanCheckoutHref(productSlug, selectedPlan, "monthly", "register")}
                  className="btn-primary"
                >
                  Start free checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to={productContent.contactHref} className="btn-outline">
                  Talk to sales
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border bg-white p-6 shadow-float">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Shared pricing structure
                  </div>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-ink">
                    One reusable flow, product-specific plans
                  </h2>
                </div>
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <ProductIcon className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-border bg-surface/40 p-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  {(
                    [
                      {
                        value: "monthly",
                        label: "Monthly",
                        description: "Best for shorter billing cycles.",
                      },
                      {
                        value: "annual",
                        label: "Annual",
                        description: "See the yearly subscription amount here.",
                      },
                    ] as const
                  ).map((cycle) => {
                    const isSelected = displayCycle === cycle.value;

                    return (
                      <button
                        key={cycle.value}
                        type="button"
                        onClick={() => setDisplayCycle(cycle.value)}
                        className={`rounded-[1.25rem] border p-4 text-left transition-all ${
                          isSelected
                            ? "border-primary bg-white shadow-sm ring-1 ring-primary/10"
                            : "border-transparent bg-transparent hover:border-primary/20 hover:bg-white"
                        }`}
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

              <div className="mt-4 rounded-2xl border border-dashed border-primary/25 bg-primary-soft/20 p-4 text-sm leading-7 text-ink-soft">
                6-month billing is also available during checkout, along with server-side GST,
                add-on and renewal calculations.
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <div className="container-x">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                Pricing cards
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Same structure, tailored plans
              </h2>
              <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">
                All three product lines now use the same pricing layout while keeping
                product-specific plan names, limits and add-ons.
              </p>
            </div>

            {isLoading ? (
              <div className="mt-10 rounded-[2rem] border border-border bg-white p-10 text-center text-sm text-ink-soft shadow-float">
                Loading pricing plans...
              </div>
            ) : error ? (
              <div className="mt-10 rounded-[2rem] border border-border bg-white p-10 text-center text-sm text-rose-600 shadow-float">
                {error}
              </div>
            ) : (
              <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
                {activePlans.map((plan) => {
                  const isSelected = selectedPlan?.id === plan.id;
                  const price = getDisplayPrice(plan, displayCycle);

                  return (
                    <article
                      key={plan.id}
                      className={`relative flex h-full flex-col rounded-[2rem] border p-6 shadow-sm transition-all ${
                        isSelected
                          ? "border-primary bg-primary-soft/40 ring-1 ring-primary/10"
                          : "border-border bg-white"
                      }`}
                    >
                      {plan.isPopular ? (
                        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white shadow-sm">
                          Popular
                        </Badge>
                      ) : null}

                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                            {plan.name}
                          </div>
                          <div className="mt-3 text-4xl font-black tracking-tight text-ink">
                            {formatCurrency(price)}
                          </div>
                          <div className="mt-1 text-sm text-ink-soft">
                            {displayCycle === "annual" ? "per year" : "per month"}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedPlanId(plan.id)}
                          className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                            isSelected
                              ? "border-primary bg-primary text-white"
                              : "border-border bg-white text-ink"
                          }`}
                        >
                          {isSelected ? "Selected" : "Choose"}
                        </button>
                      </div>

                      <p className="mt-4 text-sm leading-7 text-ink-soft">{plan.description}</p>

                      <div className="mt-5 grid gap-2">
                        {plan.features.slice(0, 5).map((feature) => (
                          <div
                            key={feature.id}
                            className="flex items-start gap-3 rounded-2xl bg-surface/45 p-3"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                            <span className="text-sm leading-6 text-ink">{feature.name}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 grid gap-2">
                        {plan.limits.slice(0, 3).map((limit) => (
                          <div
                            key={limit.id}
                            className="flex items-center justify-between rounded-2xl bg-white p-3 shadow-sm"
                          >
                            <span className="text-sm text-ink-soft">{limit.name}</span>
                            <span className="text-sm font-semibold text-ink">
                              {limit.isUnlimited
                                ? "Unlimited"
                                : `${limit.value}${limit.unit ? ` ${limit.unit}` : ""}`}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Link
                        to={getPlanCheckoutHref(
                          productSlug,
                          plan,
                          checkoutBillingCycle,
                          "register",
                        )}
                        className="btn-primary mt-6 justify-center"
                      >
                        Choose {plan.name}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {!isLoading && !error && displayProduct ? (
          <section className="bg-surface py-14 sm:py-16 lg:py-20">
            <div className="container-x">
              <div className="max-w-3xl">
                <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                  Feature comparison
                </div>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                  {productContent.comparisonTitle}
                </h2>
                <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">
                  {productContent.comparisonDescription}
                </p>
              </div>

              <div className="mt-10 overflow-hidden rounded-[2rem] border border-border bg-white shadow-float">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-slate-950 text-left text-white">
                      <tr>
                        <th className="px-5 py-4 font-black uppercase tracking-[0.14em]">
                          Capability
                        </th>
                        {activePlans.map((plan) => (
                          <th
                            key={plan.id}
                            className="px-5 py-4 font-black uppercase tracking-[0.14em]"
                          >
                            {plan.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {comparisonRows.map((row) => (
                        <tr key={row.code} className="align-top">
                          <td className="px-5 py-4 font-semibold text-ink">{row.label}</td>
                          {activePlans.map((plan) => (
                            <td key={plan.id} className="px-5 py-4 text-ink-soft">
                              <StatusCell value={row.values[plan.id]} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {!isLoading && !error && displayProduct ? (
          <section className="py-14 sm:py-16 lg:py-20">
            <div className="container-x">
              <div className="max-w-3xl">
                <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                  Add-ons
                </div>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                  {productContent.addonTitle}
                </h2>
                <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">
                  {productContent.addonDescription}
                </p>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {displayProduct.addons.map((addon) => {
                  const cyclePrice =
                    displayCycle === "annual"
                      ? (addon.annualPrice ?? addon.unitPrice ?? addon.monthlyPrice ?? 0)
                      : (addon.monthlyPrice ?? addon.unitPrice ?? 0);

                  return (
                    <article
                      key={addon.id}
                      className="rounded-[1.75rem] border border-border bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                            {addon.pricingType.replaceAll("_", " ")}
                          </div>
                          <h3 className="mt-2 text-xl font-black text-ink">{addon.name}</h3>
                        </div>
                        <Badge className="border-primary/20 bg-primary-soft text-primary">
                          {cyclePrice ? formatCurrency(cyclePrice) : "Included"}
                        </Badge>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-ink-soft">{addon.description}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        <PricingAccessSection
          productLabel={productContent.productLabel}
          loginHref={loginHref}
          registerHref={registerHref}
          note={`${productContent.productLabel} uses the same access-first pricing structure as the other Altroz products. Existing buyers log in, while new buyers register first and continue into the same checkout.`}
        />

        <section className="bg-surface py-14 sm:py-16 lg:py-20">
          <div className="container-x">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">FAQs</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Common billing and renewal questions
              </h2>
              <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">
                The pricing experience is shared across products, so the answers below focus on how
                subscriptions, payments and renewals now work together.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-4xl">
              <Accordion type="single" collapsible className="space-y-3">
                {productContent.faqItems.map((faq, index) => (
                  <AccordionItem
                    key={faq.question}
                    value={`${productSlug}-${index}`}
                    className="overflow-hidden rounded-[1.5rem] border border-border bg-white px-5 shadow-card"
                  >
                    <AccordionTrigger className="py-5 text-left text-base font-semibold text-ink hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-7 text-ink-soft">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="hero-gradient py-14 sm:py-16 lg:py-20">
          <div className="container-x">
            <div className="rounded-[2rem] border border-border bg-white p-8 shadow-float md:p-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Final step
                  </div>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                    {productContent.ctaTitle}
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-ink-soft">
                    {productContent.ctaDescription}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Link
                    to={getPlanCheckoutHref(
                      productSlug,
                      selectedPlan,
                      checkoutBillingCycle,
                      "register",
                    )}
                    className="btn-primary"
                  >
                    Continue to checkout
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to={productContent.contactHref} className="btn-outline">
                    Contact us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export const BILLING_PRODUCT_LABELS = Object.values(BILLING_PRODUCT_CONTENT).map(
  (entry) => entry.productLabel,
);
