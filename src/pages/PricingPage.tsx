import { ArrowRight, BadgeCheck, CheckCircle2, Coins, Crown, Sparkles, Users } from "lucide-react";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import TopNavbar from "@/components/site/TopNavbar";

const plans = [
  {
    name: "Starter",
    price: "Talk to sales",
    blurb: "For smaller teams that want a clean HRMS foundation and fast rollout.",
    features: [
      "Core HR, attendance, and leave",
      "Employee self-service portal",
      "Standard reporting and exports",
      "Email support and onboarding guidance",
    ],
    accent: "bg-primary-soft text-primary",
  },
  {
    name: "Growth",
    price: "Custom quote",
    blurb: "For growing teams that need workflows, visibility, and tighter control.",
    features: [
      "Everything in Starter",
      "Payroll, performance, and workforce management",
      "Advanced approvals and policy controls",
      "Priority implementation support",
    ],
    accent: "bg-[#ecfdf3] text-success",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom quote",
    blurb: "For larger orgs that need scale, governance, and multi-team rollout support.",
    features: [
      "Everything in Growth",
      "Custom integrations and rollout planning",
      "Dedicated success and training support",
      "Security, audit, and admin alignment",
    ],
    accent: "bg-surface text-ink",
  },
];

const pricingHighlights = [
  {
    title: "One platform, many modules",
    desc: "Pick the HRMS modules you need now and extend later without changing systems.",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: "Clear rollout path",
    desc: "Start with the essentials, then add payroll, performance, and operations as needed.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Custom fit for teams",
    desc: "Pricing is shaped by module mix, employee count, and implementation scope.",
    icon: <Coins className="h-5 w-5" />,
  },
];

const faqs = [
  {
    q: "Is pricing fixed?",
    a: "No. Pricing is typically customized based on the modules you need, company size, and rollout complexity.",
  },
  {
    q: "Can we start small and expand later?",
    a: "Yes. The platform is designed so teams can start with core HR features and add more modules over time.",
  },
  {
    q: "Do you support implementation help?",
    a: "Yes. Larger plans can include guided setup, training, and deployment support depending on scope.",
  },
];

export default function PricingPage() {
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
                Flexible pricing for teams that want HRMS to grow with them
              </h1>
              <p className="mt-4 max-w-xl text-base text-ink-soft">
                Choose the right module mix for your team, then scale into payroll, performance,
                workforce, and integrations when you are ready.
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
                  { label: "Billing", value: "module-based" },
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
                          Built for the modules you actually need
                        </div>
                      </div>
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white">
                        <Crown className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {[
                        "Core HR starter bundle",
                        "Payroll and workforce add-ons",
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
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Plans</span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Simple tiers that let teams start where they are
              </h2>
              <p className="mt-3 text-ink-soft">
                The exact quote depends on modules, users, and rollout needs, but this gives a clear
                structure for buyers to understand the options.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {plans.map((plan) => (
                <article
                  key={plan.name}
                  className={`soft-card p-6 ${plan.featured ? "border-primary/35 shadow-pop" : ""}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-primary">
                        {plan.name}
                      </div>
                      <h3 className="mt-2 text-2xl font-bold text-ink">{plan.price}</h3>
                    </div>
                    <div className={`grid h-10 w-10 place-items-center rounded-xl ${plan.accent}`}>
                      <BadgeCheck className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-ink-soft">{plan.blurb}</p>
                  <div className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3 rounded-xl bg-surface p-3"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                        <span className="text-sm text-ink">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <a href="/company/book-demo" className="btn-primary mt-6 w-full">
                    Get a quote <ArrowRight className="h-4 w-4" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
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
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-white p-3">
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
      </main>

      <Footer />
    </div>
  );
}
