import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Coins,
  Crown,
  Info,
  Sparkles,
  Users,
} from "lucide-react";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import TopNavbar from "@/components/site/TopNavbar";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type BillingTerm = {
  value: "1" | "2" | "3";
  label: string;
  years: number;
  savings: number;
  badge?: string;
};

type PricingPlan = {
  name: string;
  pricePerEmployee: number;
  blurb: string;
  icon: ReactNode;
  accent: string;
  featured?: boolean;
  usage: string[];
  features: string[];
  includedCount: number;
  ctaLabel: string;
};

const billingTerms: BillingTerm[] = [
  { value: "1", label: "1 Year", years: 1, savings: 0 },
  { value: "2", label: "2 Years", years: 2, savings: 10 },
  { value: "3", label: "3 Years", years: 3, savings: 15, badge: "Best" },
];

const employeePresets = [5, 10, 25, 50, 100, 200];

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    pricePerEmployee: 50,
    blurb: "A simple launch plan for smaller teams that need fast setup and essential HR coverage.",
    icon: <BadgeCheck className="h-5 w-5" />,
    accent: "bg-primary-soft text-primary",
    featured: true,
    usage: ["3 users", "5 employees", "10 GB storage"],
    features: [
      "Core HR and attendance",
      "Employee self-service portal",
      "Leave requests and approvals",
      "Email support and onboarding guidance",
    ],
    includedCount: 48,
    ctaLabel: "View all features",
  },
  {
    name: "Attendance",
    pricePerEmployee: 25,
    blurb: "A practical plan for teams that want attendance-led visibility with room to grow.",
    icon: <Users className="h-5 w-5" />,
    accent: "bg-[#ecfdf3] text-success",
    usage: ["10 users", "Unlimited employees", "50 GB storage"],
    features: [
      "Attendance tracking and shift visibility",
      "Mobile access for employees",
      "Basic reports and exports",
      "Approvals for routine requests",
    ],
    includedCount: 24,
    ctaLabel: "View all features",
  },
  {
    name: "Professional",
    pricePerEmployee: 142,
    blurb:
      "Built for larger teams that need deeper workflows, tighter control, and more reporting.",
    icon: <Crown className="h-5 w-5" />,
    accent: "bg-surface text-ink",
    usage: ["15 users", "Unlimited employees", "100 GB storage"],
    features: [
      "Advanced approvals and policy controls",
      "Payroll and workforce workflows",
      "Analytics and management reporting",
      "Priority implementation support",
    ],
    includedCount: 63,
    ctaLabel: "View all features",
  },
];

const pricingHighlights = [
  {
    title: "No credit card",
    desc: "Start your trial without upfront payment friction.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Per employee pricing",
    desc: "Scale by workforce size instead of a one-size-fits-all package.",
    icon: <Coins className="h-5 w-5" />,
  },
  {
    title: "7-day free trial",
    desc: "Test the product before you commit to a plan.",
    icon: <Crown className="h-5 w-5" />,
  },
  {
    title: "Free onboarding",
    desc: "Get implementation help included with your rollout.",
    icon: <Users className="h-5 w-5" />,
  },
];

const faqs = [
  {
    q: "How does the calculator work?",
    a: "Choose a billing term and employee count, then each plan updates its monthly and multi-year total based on the selected values.",
  },
  {
    q: "Do multi-year terms include a discount?",
    a: "Yes. The calculator shows a 10% discount for 2 years and a 15% discount for 3 years, similar to the pattern in the recording.",
  },
  {
    q: "Can we start small and grow later?",
    a: "Yes. The layout is built so smaller teams can begin with Starter and move to larger plans as their workforce grows.",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function getPlanTotals(plan: PricingPlan, employeeCount: number, term: BillingTerm) {
  const monthlyTotal = plan.pricePerEmployee * employeeCount;
  const preDiscountTotal = monthlyTotal * 12 * term.years;
  const savings = (preDiscountTotal * term.savings) / 100;
  const finalTotal = preDiscountTotal - savings;

  return {
    monthlyTotal,
    preDiscountTotal,
    savings,
    finalTotal,
  };
}

function PricingCard({
  plan,
  employeeCount,
  term,
}: {
  plan: PricingPlan;
  employeeCount: number;
  term: BillingTerm;
}) {
  const totals = getPlanTotals(plan, employeeCount, term);

  return (
    <article
      className={`soft-card relative flex h-full flex-col overflow-hidden p-6 ${
        plan.featured ? "border-primary/35 shadow-pop" : ""
      }`}
    >
      {plan.featured ? (
        <div className="-mt-1 mb-4 inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-sm">
          Recommended
        </div>
      ) : null}

      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-primary">{plan.name}</div>
          <h3 className="mt-2 text-2xl font-bold text-ink">
            ₹{formatCurrency(plan.pricePerEmployee)}
          </h3>
          <p className="mt-1 text-sm text-ink-soft">/ employee / month</p>
        </div>
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${plan.accent}`}>
          {plan.icon}
        </div>
      </div>

      <p className="mt-3 text-sm text-ink-soft">{plan.blurb}</p>

      <div className="mt-4 rounded-2xl bg-surface p-4">
        <div className="flex items-baseline justify-between gap-3">
          <div className="text-sm font-medium text-ink-soft">Selected term total</div>
          <div className="text-sm font-semibold text-ink">
            {employeeCount} {employeeCount === 1 ? "employee" : "employees"}
          </div>
        </div>
        <div className="mt-2 text-3xl font-bold text-ink">₹{formatCurrency(totals.finalTotal)}</div>
        <p className="mt-1 text-sm text-ink-soft">
          ₹{formatCurrency(totals.preDiscountTotal)} before savings for {term.label.toLowerCase()}
        </p>
      </div>

      <div className="mt-4 rounded-2xl bg-[#ecfdf3] p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-success">
              You Save
            </div>
            <div className="mt-1 text-2xl font-bold text-success">{term.savings}%</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-medium text-ink-soft line-through">
              ₹{formatCurrency(totals.preDiscountTotal)}
            </div>
            <div className="text-lg font-bold text-success">₹{formatCurrency(totals.savings)}</div>
          </div>
        </div>
      </div>

      <details className="group mt-4 rounded-2xl border border-border bg-white p-4">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-ink">
          <span className="inline-flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            How is this calculated?
          </span>
          <span className="text-ink-soft transition-transform duration-200 group-open:rotate-180">
            ▾
          </span>
        </summary>
        <div className="mt-3 space-y-2 text-sm text-ink-soft">
          <div>
            Monthly base = ₹{plan.pricePerEmployee} x {employeeCount} employees
          </div>
          <div>Term base = monthly base x 12 months x {term.years} years</div>
          <div>
            Discount = {term.savings}% for {term.label.toLowerCase()}
          </div>
          <div>Final estimate = ₹{formatCurrency(totals.finalTotal)}</div>
        </div>
      </details>

      <div className="mt-4 space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-primary">Usage limits</div>
        <div className="flex flex-wrap gap-2">
          {plan.usage.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-ink"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <div className="text-xs font-bold uppercase tracking-wider text-primary">Features</div>
          <div className="text-sm font-semibold text-primary">{plan.includedCount} included</div>
        </div>
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-start gap-3 rounded-xl bg-surface p-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
            <span className="text-sm text-ink">{feature}</span>
          </div>
        ))}
      </div>

      <a href="/company/book-demo" className="btn-outline mt-6 w-full">
        {plan.ctaLabel} <ArrowRight className="h-4 w-4" />
      </a>
    </article>
  );
}

export default function PricingPage() {
  const [billingTermValue, setBillingTermValue] = useState<BillingTerm["value"]>("2");
  const [employeeCount, setEmployeeCount] = useState(25);

  const selectedTerm =
    billingTerms.find((term) => term.value === billingTermValue) ?? billingTerms[1];

  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x grid gap-10 py-12 lg:grid-cols-12 lg:items-center lg:py-16">
            <div className="lg:col-span-6 fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Pricing
              </span>
              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Transparent pricing for teams that want the calculator to do the heavy lifting
              </h1>
              <p className="mt-4 max-w-xl text-base text-ink-soft">
                Pick a subscription term, choose your team size, and see live per-employee pricing
                for every plan. The layout follows the calculator flow shown in the recording.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/company/book-demo" className="btn-primary">
                  Request pricing
                </a>
                <a href="/company/contact-us" className="btn-outline">
                  Talk to sales
                </a>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Setup", value: "guided rollout" },
                  { label: "Billing", value: "per employee" },
                  { label: "Support", value: "implementation help" },
                ].map((item) => (
                  <div key={item.label} className="soft-card p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {item.label}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-ink">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-2xl">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-5 shadow-float">
                  <div className="grid gap-4 sm:grid-cols-3">
                    {pricingHighlights.map((item) => (
                      <div key={item.title} className="rounded-2xl bg-surface p-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                          {item.icon}
                          {item.title}
                        </div>
                        <p className="mt-2 text-sm text-ink-soft">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-[1.5rem] border border-border bg-primary-soft/40 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-primary">
                          Commercial model
                        </div>
                        <div className="mt-2 text-2xl font-bold text-ink">
                          Built around the workforce size you actually need
                        </div>
                      </div>
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white">
                        <Crown className="h-6 w-6" />
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {[
                        "Core HR starter bundle",
                        "Attendance and payroll add-ons",
                        "Integration support on request",
                        "Scalable enterprise rollout",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-3 rounded-xl bg-white p-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                          <span className="text-sm text-ink">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Calculator
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Choose your billing term and team size
              </h2>
              <p className="mt-3 text-ink-soft">
                This calculator mirrors the reference flow: term selector, employee slider, quick
                size chips, and then live pricing cards below.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
              <div className="soft-card flex h-full flex-col p-6 lg:col-span-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <Users className="h-4 w-4" />
                  Subscription duration
                </div>

                <div className="mt-4 flex justify-center">
                  <Tabs
                    value={billingTermValue}
                    onValueChange={(value) => setBillingTermValue(value as BillingTerm["value"])}
                  >
                    <TabsList className="relative grid h-auto w-full max-w-md grid-cols-3 gap-1.5 rounded-2xl bg-surface p-1.5">
                      {billingTerms.map((term) => (
                        <div key={term.value} className="relative">
                          <TabsTrigger
                            value={term.value}
                            className="relative w-full rounded-xl px-4 py-2.5 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-ink data-[state=active]:shadow-sm"
                          >
                            {term.label}
                          </TabsTrigger>
                          {term.badge ? (
                            <span className="absolute -right-2 -top-2 rounded-full bg-[#8b5cf6] px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                              {term.badge}
                            </span>
                          ) : null}
                        </div>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>

                <p className="mt-3 text-center text-sm text-ink-soft">
                  Choose your subscription duration
                </p>

                <div className="mt-6 rounded-[1.5rem] border border-border bg-white p-5 shadow-card">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                      <Users className="h-4 w-4 text-primary" />
                      How many employees do you have?
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="min-w-20 rounded-xl border-2 border-primary px-4 py-2 text-center text-lg font-bold text-primary">
                        {employeeCount}
                      </div>
                      <span className="text-sm text-ink-soft">employees</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Slider
                      value={[employeeCount]}
                      min={1}
                      max={500}
                      step={1}
                      onValueChange={(value) => {
                        const nextValue = value[0];
                        if (typeof nextValue === "number") {
                          setEmployeeCount(nextValue);
                        }
                      }}
                    />
                    <div className="mt-2 flex justify-between px-1 text-[11px] font-medium text-ink-soft">
                      <span>1</span>
                      <span>50</span>
                      <span>100</span>
                      <span>250</span>
                      <span>500+</span>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-3">
                    {employeePresets.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setEmployeeCount(preset)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                          employeeCount === preset
                            ? "border-primary bg-primary text-white shadow-sm"
                            : "border-border bg-white text-ink hover:border-primary/35 hover:bg-primary-soft"
                        }`}
                      >
                        {preset} employees
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-primary/15 bg-primary-soft/70 p-4 text-center text-sm text-primary">
                    Prices update live based on your team size. Larger teams can qualify for volume
                    discounts.
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "Selected term", value: selectedTerm.label },
                    {
                      label: "Estimated discount",
                      value: selectedTerm.savings ? `${selectedTerm.savings}%` : "No discount",
                    },
                  ].map((item) => (
                    <div key={item.label} className="soft-card p-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {item.label}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-ink">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {pricingPlans.map((plan) => (
                    <PricingCard
                      key={plan.name}
                      plan={plan}
                      employeeCount={employeeCount}
                      term={selectedTerm}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <div className="grid gap-6 lg:grid-cols-4">
              {[
                {
                  title: "No Credit Card",
                  desc: "Start your trial without payment details.",
                },
                {
                  title: "Cancel Anytime",
                  desc: "Keep the commitment flexible while you evaluate.",
                },
                {
                  title: "7-Day Free Trial",
                  desc: "Let your team test the features before purchase.",
                },
                {
                  title: "Free Onboarding",
                  desc: "Reduce rollout effort with guided setup support.",
                },
              ].map((item) => (
                <div key={item.title} className="soft-card p-6 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                    <BadgeCheck className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12">
            <div className="soft-card p-6 lg:col-span-5">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Pricing notes
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">What shapes the final quote</h3>
              <div className="mt-6 space-y-3">
                {[
                  "Number of active employees",
                  "Modules you want to enable",
                  "Implementation and migration support",
                  "Integration and custom workflow needs",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="soft-card p-6 lg:col-span-7">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">FAQ</div>
              <h3 className="mt-2 text-2xl font-bold text-ink">Common questions about pricing</h3>
              <div className="mt-6 space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.q} className="rounded-2xl border border-border p-4">
                    <div className="text-base font-bold text-ink">{faq.q}</div>
                    <p className="mt-2 text-sm text-ink-soft">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="hero-gradient py-20">
          <div className="container-x text-center">
            <h2 className="text-3xl font-bold text-ink sm:text-4xl">
              Start free today, then upgrade only when you are ready
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-ink-soft">
              Try the features for 7 days, compare the calculator results across terms, and move
              into a plan once the numbers make sense for your team.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="/company/book-demo" className="btn-primary">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/company/contact-us" className="btn-outline">
                Talk to Sales
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
