import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Coins,
  Crown,
  Info,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link, createSearchParams } from "react-router-dom";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import {
  PRICING_FEATURE_SECTION_TYPE,
  PricingFeatureComparisonSection,
} from "@/components/site/PricingFeatureComparisonSection";
import TopNavbar from "@/components/site/TopNavbar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { usePublicContent } from "@/hooks/usePublicContent";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/routes/routeConfig.js";
import { getSectionItems } from "@/services/cmsHelpers";
import type { PublicCmsItem, PublicCmsSection, PublicPricingPage } from "@/services/cmsTypes";
import { fetchPricingPage } from "@/services/pricingService";
import { getSeedPricingPageFallback } from "@/services/seedFallback";

type PricingPlanCard = {
  name: string;
  slug: string;
  price: number;
  accent: string;
  icon: ReactNode;
  summary: string;
  bullets: string[];
};

const MIN_EMPLOYEES = 0;
const MAX_EMPLOYEES = 3000;
const EMPLOYEE_TICKS = [0, 500, 1000, 2000, 3000];

const fallbackPlans: PricingPlanCard[] = [
  {
    name: "Basic",
    slug: "basic",
    price: 21,
    accent: "bg-primary-soft text-primary",
    icon: <BadgeCheck className="h-5 w-5" />,
    summary:
      "Core employee records, attendance, leave, team actions, reporting and admin controls for teams that want a compact starting point.",
    bullets: [
      "Employee management and directory tools",
      "Attendance, leave and reporting essentials",
      "Administration and organization setup",
    ],
  },
  {
    name: "Professional",
    slug: "professional",
    price: 36,
    accent: "bg-[#ecfdf3] text-success",
    icon: <ShieldCheck className="h-5 w-5" />,
    summary:
      "A broader operational plan with recruitment, documents, payroll, compliance, assets and performance modules.",
    bullets: [
      "Everything in Basic plus deeper workflows",
      "Recruitment, documents and payroll coverage",
      "Compliance, assets and performance features",
    ],
  },
  {
    name: "Premium",
    slug: "premium",
    price: 53,
    accent: "bg-surface text-ink",
    icon: <Crown className="h-5 w-5" />,
    summary:
      "The widest coverage in the sheet, including premium attendance, extra reporting depth and the fullest feature set.",
    bullets: [
      "Everything in Professional",
      "Shift management and salary history",
      "Broader reporting and advanced coverage",
    ],
  },
];

const fallbackHeroItems = [
  {
    title: "Basic",
    value: "₹21 / employee / month",
    desc: "Entry pricing for core HR, attendance and leave.",
    icon: <BadgeCheck className="h-4 w-4" />,
  },
  {
    title: "Professional",
    value: "₹36 / employee / month",
    desc: "Expanded coverage for recruiting, payroll and compliance.",
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  {
    title: "Premium",
    value: "₹53 / employee / month",
    desc: "Full-suite coverage for the broadest rollout.",
    icon: <Crown className="h-4 w-4" />,
  },
  {
    title: "Optional add-ons",
    value: "Geo tracking, integrations and custom work",
    desc: "Extra capabilities can be layered on as needed.",
    icon: <Coins className="h-4 w-4" />,
  },
];

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);
}

function normalizeEmployeeCount(value: number) {
  return Math.min(
    MAX_EMPLOYEES,
    Math.max(MIN_EMPLOYEES, Number.isFinite(value) ? Math.round(value) : 0),
  );
}

function getRecommendedPlan(employeeCount: number) {
  if (employeeCount < 75) {
    return "Basic";
  }

  if (employeeCount < 250) {
    return "Professional";
  }

  return "Premium";
}

function getPlanIcon(name: string, size: "sm" | "md" = "md") {
  const className = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  if (name === "Basic") {
    return <BadgeCheck className={className} />;
  }

  if (name === "Professional") {
    return <ShieldCheck className={className} />;
  }

  if (name === "Premium") {
    return <Crown className={className} />;
  }

  return <Coins className={className} />;
}

function buildPlans(page: PublicPricingPage | null | undefined): PricingPlanCard[] {
  if (!page?.plans?.length) {
    return fallbackPlans;
  }

  return page.plans
    .filter((plan) => plan.isActive)
    .sort((left, right) => left.displayOrder - right.displayOrder)
    .map((plan, index) => {
      const fallback = fallbackPlans[index] ?? fallbackPlans[fallbackPlans.length - 1];

      return {
        name: plan.name,
        slug: plan.slug,
        price: plan.monthlyPrice,
        accent: typeof plan.settings?.accent === "string" ? plan.settings.accent : fallback.accent,
        icon: getPlanIcon(plan.name),
        summary: plan.shortDescription ?? fallback.summary,
        bullets: plan.features
          .slice()
          .sort((left, right) => left.displayOrder - right.displayOrder)
          .map((feature) => feature.featureText)
          .slice(0, 3),
      };
    });
}

function getHeroItems(heroSection: PublicCmsSection | null | undefined) {
  const items = heroSection?.items?.length ? heroSection.items : [];

  if (!items.length) {
    return fallbackHeroItems;
  }

  return items.map((item) => ({
    title: item.title ?? "",
    value: item.subtitle ?? "",
    desc: item.description ?? "",
    icon: getPlanIcon(item.title ?? "", "sm"),
  }));
}

function getSectionByKey(page: PublicPricingPage | null | undefined, sectionKey: string) {
  return page?.sections.find((section) => section.sectionKey === sectionKey) ?? null;
}

function PricingMiniCard({
  plan,
  employeeCount,
}: {
  plan: PricingPlanCard;
  employeeCount: number;
}) {
  const total = plan.price * employeeCount;

  return (
    <article className="soft-card relative flex h-full min-h-[420px] flex-col overflow-hidden p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
            {plan.name}
          </div>
          <h3 className="mt-2 text-4xl font-black tracking-tight text-ink">
            ₹{formatNumber(total)}
          </h3>
          <p className="mt-1 text-sm text-ink-soft">for {employeeCount} employees / month</p>
        </div>
        <div className={cn("grid h-11 w-11 place-items-center rounded-2xl", plan.accent)}>
          {plan.icon}
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-ink-soft">{plan.summary}</p>

      <div className="mt-5 space-y-2">
        {plan.bullets.map((bullet) => (
          <div key={bullet} className="flex items-start gap-3 rounded-2xl bg-surface/45 p-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span className="text-sm leading-6 text-ink">{bullet}</span>
          </div>
        ))}
      </div>

      <a href="#feature-comparison" className="btn-outline mt-auto w-full justify-center">
        Know more
      </a>
    </article>
  );
}

function PricingCalculator({
  employeeCount,
  onEmployeeCountChange,
  plans,
}: {
  employeeCount: number;
  onEmployeeCountChange: (count: number) => void;
  plans: PricingPlanCard[];
}) {
  const recommendedPlan = getRecommendedPlan(employeeCount);
  const totals = useMemo(
    () => plans.map((plan) => ({ ...plan, total: plan.price * employeeCount })),
    [employeeCount, plans],
  );

  const updateCount = (value: number) => onEmployeeCountChange(normalizeEmployeeCount(value));

  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-primary shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Instant estimate
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-ink sm:text-4xl">
            Estimate pricing by team size
          </h2>
          <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">
            Slide the employee count to see how Basic, Professional and Premium scale on your
            pricing page using the same plan prices from Altroz HRMS.
          </p>
        </div>

        <div className="mt-10 rounded-[2rem] border border-primary/15 bg-white p-4 shadow-float sm:p-6">
          <div className="rounded-[1.65rem] border border-primary/15 bg-gradient-to-br from-[#eff6ff] via-white to-[#f8fbff] p-5 sm:p-6">
            <div className="grid gap-5 lg:grid-cols-[auto_1fr_auto] lg:items-center">
              <div className="hidden rounded-2xl border border-primary/20 bg-white px-4 py-3 text-sm font-semibold text-ink-soft shadow-sm lg:inline-flex lg:items-center lg:gap-2">
                Slide
                <ArrowRight className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-5">
                <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:flex-wrap">
                  <span className="text-lg font-medium text-ink-soft sm:text-2xl">
                    Get instant estimate for
                  </span>
                  <Input
                    type="number"
                    min={MIN_EMPLOYEES}
                    max={MAX_EMPLOYEES}
                    inputMode="numeric"
                    value={employeeCount}
                    onChange={(event) =>
                      updateCount(Number.parseInt(event.currentTarget.value || "0", 10))
                    }
                    className="h-12 w-28 border-primary/20 bg-white text-center text-2xl font-black text-ink shadow-sm focus-visible:ring-primary"
                  />
                  <span className="text-lg font-medium text-ink-soft sm:text-2xl">employees</span>
                </div>

                <div className="mx-auto w-full max-w-5xl">
                  <Slider
                    value={[employeeCount]}
                    min={MIN_EMPLOYEES}
                    max={MAX_EMPLOYEES}
                    step={1}
                    onValueChange={([value]) => updateCount(value)}
                    className="[&_[role=slider]]:border-primary [&_[role=slider]]:bg-white [&_[role=slider]]:shadow-sm"
                  />
                  <div className="mt-3 grid grid-cols-5 text-xs font-semibold text-primary/80">
                    {EMPLOYEE_TICKS.map((tick) => (
                      <span
                        key={tick}
                        className={cn(
                          "text-left",
                          tick === 3000
                            ? "text-right"
                            : tick === 1000 || tick === 2000
                              ? "text-center"
                              : "",
                        )}
                      >
                        {tick === 3000 ? "3000+" : tick}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Badge className="justify-self-center border-primary/20 bg-primary text-white shadow-sm lg:justify-self-end">
                Recommended: {recommendedPlan}
              </Badge>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3 lg:gap-5">
            {totals.map((plan) => {
              const isRecommended = plan.name === recommendedPlan;

              return (
                <article
                  key={plan.name}
                  className={cn(
                    "relative flex h-full min-h-[270px] flex-col rounded-[1.5rem] border p-5 shadow-sm transition-all lg:p-6",
                    isRecommended
                      ? "border-primary bg-primary-soft/40 ring-1 ring-primary/10"
                      : "border-border bg-white",
                  )}
                >
                  {isRecommended ? (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 border-primary/20 bg-primary text-white shadow-sm">
                      Recommended
                    </Badge>
                  ) : null}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                        {plan.name}
                      </div>
                      <div className="mt-2 text-4xl font-black tracking-tight text-ink">
                        ₹{formatNumber(plan.price)}
                      </div>
                      <div className="mt-1 text-sm text-ink-soft">per employee / month</div>
                    </div>
                    <div
                      className={cn("grid h-11 w-11 place-items-center rounded-2xl", plan.accent)}
                    >
                      {plan.icon}
                    </div>
                  </div>

                  <div className="mt-5 border-t border-border pt-4 text-sm leading-6 text-ink-soft">
                    <div className="flex items-center justify-between gap-3 py-1">
                      <span>Rate / employee</span>
                      <span className="font-semibold text-ink">₹{formatNumber(plan.price)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3 py-1">
                      <span>Employees</span>
                      <span className="font-semibold text-ink">{employeeCount}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3 py-1">
                      <span>Estimated total</span>
                      <span className="font-semibold text-ink">₹{formatNumber(plan.total)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3 py-1">
                      <span>Best for</span>
                      <span className="font-semibold text-ink">
                        {plan.name === "Basic"
                          ? "Smaller teams"
                          : plan.name === "Professional"
                            ? "Growing teams"
                            : "Larger rollouts"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex justify-center">
                    <Link
                      to={`${ROUTES.hrmsPricingPurchase}?${createSearchParams({
                        plan: plan.slug,
                        employees: String(employeeCount),
                        billing: "monthly",
                      })}`}
                      className="inline-flex min-w-40 items-center justify-center rounded-full border border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                    >
                      Purchase Now
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HrmsPricingPage() {
  const [employeeCount, setEmployeeCount] = useState(100);
  const seedPricingPage = useMemo(() => getSeedPricingPageFallback(), []);
  const { data: pricingPage } = usePublicContent(fetchPricingPage, [], seedPricingPage);
  const heroSection = getSectionByKey(pricingPage, "pricing-hero");
  const featureSections = useMemo(
    () =>
      (pricingPage?.sections ?? [])
        .filter((section) => section.sectionType === PRICING_FEATURE_SECTION_TYPE)
        .sort((left, right) => left.displayOrder - right.displayOrder),
    [pricingPage?.sections],
  );
  const plans = useMemo(() => buildPlans(pricingPage), [pricingPage]);
  const heroItems = useMemo(() => getHeroItems(heroSection), [heroSection]);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={pricingPage?.metaTitle ?? "Pricing Plans | Altroz HRMS"}
        description={
          pricingPage?.metaDescription ??
          "Compare the Altroz HRMS pricing plans in detail. See Basic, Professional and Premium pricing, feature coverage, and optional add-ons."
        }
        canonicalPath={ROUTES.hrmsPricing}
        image={pricingPage?.ogImage ?? undefined}
        imageAlt={pricingPage?.ogImageAlt ?? undefined}
        ogTitle={pricingPage?.ogTitle ?? pricingPage?.metaTitle ?? "Pricing Plans | Altroz HRMS"}
        ogDescription={
          pricingPage?.ogDescription ??
          pricingPage?.metaDescription ??
          "Compare the Altroz HRMS pricing plans in detail. See Basic, Professional and Premium pricing, feature coverage, and optional add-ons."
        }
      />
      <TopNavbar />
      <MainNavbar />

      <main className="overflow-x-hidden">
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 top-12 h-72 w-72 rounded-full bg-success/10 blur-3xl" />
          <div className="container-x grid gap-10 py-5 sm:py-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-extrabold tracking-normal text-primary shadow-sm">
                <Sparkles className="h-4 w-4" />
                {heroSection?.subheading ?? "Pricing sheet"}
              </div>
              <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                {heroSection?.heading ?? "Altroz HRMS Pricing Plans"}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
                {heroSection?.description ??
                  "Feature comparison for Basic (₹21), Professional (₹36), Premium (₹53) and add-ons, rebuilt as a clear pricing page with plan cards and sectioned feature comparisons."}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={heroSection?.buttonLink ?? ROUTES.bookDemo} className="btn-primary">
                  {heroSection?.buttonText ?? "Request a demo"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to={
                    (heroSection?.settings?.secondaryButtonLink as string | undefined) ??
                    ROUTES.hrmsContact
                  }
                  className="btn-outline"
                >
                  {(heroSection?.settings?.secondaryButtonText as string | undefined) ??
                    "Talk to sales"}
                </Link>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {heroItems.map((item) => (
                  <div
                    key={item.title}
                    className="soft-card flex h-full flex-col gap-2 p-3.5 sm:p-4"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                      {item.icon}
                      {item.title}
                    </div>
                    <div className="text-base font-bold text-ink">{item.value}</div>
                    <p className="text-sm leading-5 text-ink-soft">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/10 via-transparent to-success/10 blur-2xl" />
              <div className="relative rounded-xl border border-border bg-white p-5 shadow-float">
                <div className="grid gap-4 md:grid-cols-3">
                  {plans.map((plan) => (
                    <div
                      key={plan.name}
                      className="rounded-xl border border-border bg-white p-4 shadow-sm"
                    >
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                        {plan.name}
                      </div>
                      <div className="mt-2 text-2xl font-black text-ink">
                        ₹{formatNumber(plan.price)}
                      </div>
                      <div className="mt-1 text-sm text-ink-soft">per employee / month</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-border bg-surface/40 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                        Comparison focus
                      </div>
                      <h2 className="mt-2 text-2xl font-black tracking-tight text-ink">
                        Section cards for each pricing feature group
                      </h2>
                    </div>
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white">
                      <Info className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      "Employee management",
                      "Attendance and leave",
                      "Recruitment and documents",
                      "Payroll, compliance and reports",
                      "Assets, performance and administration",
                      "Optional add-ons and integrations",
                    ].map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3 rounded-2xl bg-white p-3"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                        <span className="text-sm leading-6 text-ink">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PricingCalculator
          employeeCount={employeeCount}
          onEmployeeCountChange={setEmployeeCount}
          plans={plans}
        />

        <section className="py-14 sm:py-16 lg:py-20">
          <div className="container-x">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                Plan cards
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Three pricing plans, presented clearly
              </h2>
              <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">
                The plans below summarize the pricing sheet before the feature sections break the
                coverage down module by module.
              </p>
            </div>

            <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
              {plans.map((plan) => (
                <PricingMiniCard key={plan.name} plan={plan} employeeCount={employeeCount} />
              ))}
            </div>
          </div>
        </section>

        <section id="feature-comparison" className="bg-surface py-14 sm:py-16 lg:py-20">
          <div className="container-x">
            <div className="max-w-3xl">
              <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                Feature comparison
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Section cards for the pricing features
              </h2>
              <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">
                Every major module from the sheet is grouped into a dedicated card so the plan
                differences are easy to scan, compare and present on desktop or mobile.
              </p>
            </div>

            <div className="mt-10 space-y-5">
              {featureSections.map((section) => (
                <PricingFeatureComparisonSection key={section.id} section={section} />
              ))}
            </div>
          </div>
        </section>

        <section className="hero-gradient py-14 sm:py-16 lg:py-20">
          <div className="container-x">
            <div className="rounded-[2rem] border border-border bg-white p-8 shadow-float md:p-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                    Next step
                  </div>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                    Want a tailored walkthrough of your pricing and ROI numbers?
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-ink-soft">
                    The page now includes the pricing table and add-ons, giving a clear view of the
                    plan structure before you request a tailored walkthrough.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Link to={ROUTES.bookDemo} className="btn-primary">
                    Request a demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to={ROUTES.hrmsContact} className="btn-outline">
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
