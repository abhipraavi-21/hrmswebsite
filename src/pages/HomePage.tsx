import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BadgeCheck,
  CheckCircle2,
  Layers3,
  Mail,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import TopNavbar from "@/components/site/TopNavbar";
import Footer from "@/components/site/Footer";
import PageSEO from "@/components/site/PageSEO";
import { ROUTES } from "@/routes/routeConfig.js";

const productCards = [
  {
    title: "HRMS",
    eyebrow: "Workforce operations",
    description:
      "Manage attendance, payroll, leave, employee records, approvals, and reporting in one connected platform.",
    href: ROUTES.hrmsHome,
    bullets: ["Attendance and shift workflows", "Payroll and compliance journeys", "Employee self-service and reports"],
  },
  {
    title: "Bulk Email",
    eyebrow: "Communication workflows",
    description:
      "Plan campaigns, manage contacts, build templates, and track email performance from a separate workspace.",
    href: ROUTES.bulkEmailCampaigns,
    bullets: ["Campaigns, templates, and contacts", "Automation and segmentation", "Analytics for send performance"],
  },
];

const featureCards = [
  {
    icon: <Layers3 className="h-5 w-5" />,
    title: "Separate product paths",
    description:
      "Altroz keeps HRMS and Bulk Email in their own experiences so the right users land in the right workspace.",
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: "Clear navigation",
    description:
      "The top switcher and product links make it easy to move between products without mixing content.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Structured experience",
    description:
      "Each section follows the same design language, so the site feels consistent while staying distinct.",
  },
  {
    icon: <BadgeCheck className="h-5 w-5" />,
    title: "Modern brand feel",
    description:
      "Soft gradients, balanced spacing, and concise copy keep the Altroz homepage polished and clear.",
  },
];

const dashboards = [
  {
    title: "HRMS command center",
    description: "Track attendance, employees, and workflow status from one clean operational view.",
    stats: [
      { label: "Attendance", value: "92%" },
      { label: "Approvals", value: "14" },
      { label: "Active staff", value: "248" },
    ],
    bars: [
      { label: "Check-ins", value: 92 },
      { label: "Leave usage", value: 67 },
      { label: "Shift coverage", value: 81 },
    ],
  },
  {
    title: "Payroll insights",
    description: "See salary cycles, compliance status, and disbursement readiness in one layout.",
    stats: [
      { label: "Payroll ready", value: "100%" },
      { label: "Compliance", value: "Live" },
      { label: "Payslips", value: "Generated" },
    ],
    bars: [
      { label: "Payroll run", value: 96 },
      { label: "Statutory filings", value: 88 },
      { label: "Bank release", value: 91 },
    ],
  },
  {
    title: "Bulk Email performance",
    description: "Monitor campaigns, sends, and engagement without mixing data into HR screens.",
    stats: [
      { label: "Open rate", value: "38%" },
      { label: "Campaigns", value: "8" },
      { label: "Audience", value: "12.4k" },
    ],
    bars: [
      { label: "Delivery", value: 95 },
      { label: "Open rate", value: 74 },
      { label: "Clicks", value: 61 },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Altroz | Business Software for HRMS and Bulk Email"
        description="Altroz presents separate product experiences for HRMS and Bulk Email, with a clean homepage that introduces the brand and guides visitors to the right workspace."
        canonicalPath="/"
      />
      <TopNavbar />

      <main>
        <section className="home-hero hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x pt-0 pb-6 lg:pt-0 lg:pb-8">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  Altroz Technology Platform
                </span>
                <h1 className="mt-1 max-w-3xl text-balance text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[4.2rem]">
                  A clean Altroz homepage with separate product experiences
                </h1>
                <p className="mt-2 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
                  Altroz gives visitors a simple, branded starting point with the right route to
                  HRMS or Bulk Email. The homepage stays focused on the company, while each
                  product keeps its own information and navigation.
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Link to={ROUTES.hrmsHome} className="btn-primary">
                    Open HRMS
                  </Link>
                  <Link to={ROUTES.bulkEmailCampaigns} className="btn-outline">
                    Open Bulk Email
                  </Link>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    "Altroz brand-first homepage",
                    "Separate product navigation",
                    "Clean and modern layout",
                  ].map((item) => (
                    <div key={item} className="soft-card px-4 py-3 text-sm font-medium text-ink">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-primary/10 via-transparent to-success/10 blur-2xl" />
                <div className="relative grid gap-4 rounded-[2rem] border border-border bg-white p-5 shadow-float lg:mt-0">
                  <div className="rounded-[1.4rem] bg-surface p-5">
                    <div className="text-xs font-bold uppercase tracking-wider text-primary">
                      Platform overview
                    </div>
                    <div className="mt-2 text-2xl font-bold text-ink">Altroz at a glance</div>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">
                      A single brand entry point that sends visitors into the right product
                      experience without mixing modules together.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="soft-card p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <CheckCircle2 className="h-4 w-4" />
                        HRMS
                      </div>
                      <p className="mt-2 text-sm text-ink-soft">
                        Workforce workflows, attendance, payroll, and reporting.
                      </p>
                    </div>
                    <div className="soft-card p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <Mail className="h-4 w-4" />
                        Bulk Email
                      </div>
                      <p className="mt-2 text-sm text-ink-soft">
                        Campaigns, lists, templates, and performance tracking.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-primary-soft p-4 text-center">
                      <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Brand
                      </div>
                      <div className="mt-1 text-sm font-semibold text-ink">Altroz</div>
                    </div>
                    <div className="rounded-2xl bg-primary-soft p-4 text-center">
                      <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Products
                      </div>
                      <div className="mt-1 text-sm font-semibold text-ink">HRMS + Email</div>
                    </div>
                    <div className="rounded-2xl bg-primary-soft p-4 text-center">
                      <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Layout
                      </div>
                      <div className="mt-1 text-sm font-semibold text-ink">Separate pages</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                What Altroz offers
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Two product experiences, one consistent Altroz brand
              </h2>
              <p className="mt-3 text-ink-soft">
                Visitors can start on the Altroz homepage, then move into the exact product they
                need without seeing the wrong content first.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-5xl gap-5 lg:grid-cols-2">
              {productCards.map((card) => (
                <article key={card.title} className="soft-card flex h-full flex-col p-6 md:p-7">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">
                    {card.eyebrow}
                  </div>
                  <h3 className="mt-2 text-2xl font-bold text-ink">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">{card.description}</p>

                  <div className="mt-5 space-y-2">
                    {card.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-2 text-sm text-ink-soft">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Link to={card.href} className="btn-outline inline-flex">
                      View {card.title}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Digital dashboards
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Clean dashboard views for every Altroz product
              </h2>
              <p className="mt-3 text-ink-soft">
                Give each product its own digital dashboard so visitors can instantly understand
                the right workflow and performance snapshot.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {dashboards.map((card) => (
                <article key={card.title} className="soft-card flex h-full flex-col overflow-hidden p-6">
                  <div className="rounded-[1.4rem] border border-border/70 bg-gradient-to-br from-primary/10 to-white p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-primary">
                          Digital dashboard
                        </div>
                        <h3 className="mt-2 text-xl font-bold text-ink">{card.title}</h3>
                      </div>
                      <div className="grid h-11 w-11 place-items-center rounded-xl bg-white text-primary shadow-sm">
                        <BarChart3 className="h-5 w-5" />
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-ink-soft">{card.description}</p>

                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {card.stats.map((stat) => (
                        <div key={stat.label} className="rounded-2xl bg-white/90 p-3 text-center">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                            {stat.label}
                          </div>
                          <div className="mt-1 text-sm font-semibold text-ink">{stat.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 space-y-3 rounded-2xl bg-white/70 p-4">
                      {card.bars.map((bar) => (
                        <div key={bar.label}>
                          <div className="flex items-center justify-between text-xs font-semibold text-ink">
                            <span>{bar.label}</span>
                            <span>{bar.value}%</span>
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-white">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${bar.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Why this homepage works
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Keep the Altroz entry page simple, attractive, and easy to route
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {featureCards.map((card) => (
                <article key={card.title} className="soft-card p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                    {card.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <div className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Ready to move
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                    Start on the Altroz homepage, then move into the right product
                  </h2>
                  <p className="mt-3 max-w-2xl text-ink-soft">
                    This layout keeps Altroz as the main brand experience while preserving clear
                    entry points for HRMS and Bulk Email.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                  <Link to={ROUTES.contact} className="btn-outline">
                    Contact Sales
                  </Link>
                  <Link to={ROUTES.bookDemo} className="btn-primary">
                    Book Free Demo
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
