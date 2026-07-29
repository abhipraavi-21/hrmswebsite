import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  Laptop,
  Package,
  QrCode,
  RotateCcw,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import Footer from "@/components/site/Footer";
import PageSEO from "@/components/site/PageSEO";
import AssetManagementNavbar from "@/components/site/AssetManagementNavbar";
import { ROUTES } from "@/routes/routeConfig.js";

const heroMetrics = [
  { label: "Assets tracked", value: "12,480" },
  { label: "Assigned today", value: "348" },
  { label: "Maintenance due", value: "146" },
];

const overviewCards = [
  {
    title: "Centralised register",
    description:
      "Record laptops, monitors, tools, furniture and field equipment in one searchable workspace.",
    icon: Package,
  },
  {
    title: "Clear ownership",
    description:
      "See which employee, branch and department currently holds each item without manual follow-up.",
    icon: ShieldCheck,
  },
  {
    title: "Issue and return flows",
    description:
      "Track handover, return, transfer and recovery actions with a simple digital trail.",
    icon: RotateCcw,
  },
  {
    title: "Service visibility",
    description:
      "Keep servicing, warranty and repair timelines visible before assets slip out of service.",
    icon: Wrench,
  },
];

const lifecycleSteps = [
  "Register item with category, type, branch and location",
  "Assign the asset to an employee or department",
  "Track active use and current owner on the dashboard",
  "Log maintenance, warranty and repair events",
  "Recover assets during exits or transfers",
  "Retire or replace assets with a full history intact",
];

const reportCards = [
  {
    title: "Asset Summary",
    description: "A simple count of total, assigned, available and retired items.",
  },
  {
    title: "Asset History",
    description: "An event log for issue, return, handover and maintenance activity.",
  },
  {
    title: "Maintenance Report",
    description: "A queue of items due for servicing or already under repair.",
  },
  {
    title: "Audit Trail",
    description: "A record of changes that keeps the asset register audit friendly.",
  },
];

export default function BulkEmailAssetManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Asset Management | Altroz"
        description="Manage company assets with a separate Asset Management workspace inside Altroz. Track issue, return, maintenance and ownership from one dashboard."
        canonicalPath={ROUTES.bulkEmailAssetManagement}
      />

      <AssetManagementNavbar />

      <main className="overflow-x-hidden">
        <section
          id="overview"
          className="hero-gradient relative overflow-hidden pt-8 scroll-mt-24 sm:pt-10 lg:pt-12"
        >
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 top-10 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="container-x grid gap-10 py-8 sm:py-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-extrabold tracking-normal text-primary shadow-sm">
                <Package className="h-4 w-4" />
                Asset workspace
              </div>

              <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Asset Management Built for Clear Ownership
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
                Keep laptops, tools, furniture and field equipment organised in one workspace with
                issue, return, maintenance and audit visibility built in.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={ROUTES.bookDemo} className="btn-primary">
                  Book Free Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#features" className="btn-outline">
                  Explore features
                </a>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {heroMetrics.map((item) => (
                  <div key={item.label} className="soft-card p-4">
                    <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                      {item.label}
                    </div>
                    <div className="mt-2 text-2xl font-black tracking-tight text-ink">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/10 via-transparent to-emerald-400/10 blur-2xl" />
              <div className="relative rounded-[1.75rem] border border-border bg-white p-5 shadow-float">
                <div className="grid gap-4 sm:grid-cols-3">
                  {heroMetrics.map((item) => (
                    <div key={item.label} className="soft-card p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                        {item.label}
                      </div>
                      <div className="mt-2 text-3xl font-black tracking-tight text-ink">{item.value}</div>
                      <div className="mt-1 text-sm text-ink-soft">Current dashboard snapshot</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-[1.5rem] border border-border bg-surface/40 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                        Operations
                      </div>
                      <h2 className="mt-2 text-2xl font-black tracking-tight text-ink">
                        Track every asset without messy spreadsheets
                      </h2>
                    </div>
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white">
                      <BarChart3 className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      "Issue and return history",
                      "Maintenance reminders",
                      "Ownership and location visibility",
                      "Audit-ready reporting",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl bg-white p-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                        <span className="text-sm leading-6 text-ink">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-14 scroll-mt-24 sm:py-16 lg:py-20">
          <div className="container-x">
            <div className="max-w-3xl">
              <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                Features
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Everything a clean asset workspace needs
              </h2>
              <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">
                A practical asset register should be easy to scan, easy to update and easy to
                report on. These cards keep the page focused and useful.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {overviewCards.map((card) => (
                <article key={card.title} className="soft-card flex h-full flex-col p-5 sm:p-6">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="lifecycle" className="bg-surface py-14 scroll-mt-24 sm:py-16 lg:py-20">
          <div className="container-x">
            <div className="max-w-3xl">
              <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                Lifecycle
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                A simple lifecycle from register to retirement
              </h2>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {lifecycleSteps.map((step, index) => (
                <article key={step} className="soft-card p-5 sm:p-6">
                  <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                    Step {index + 1}
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-ink">{step}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">
                    Keep each asset moving through one visible process instead of separate manual
                    logs.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="reports" className="py-14 scroll-mt-24 sm:py-16 lg:py-20">
          <div className="container-x">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                  Reports
                </div>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                  Reports that help teams stay accountable
                </h2>
                <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">
                  Use clear reports for audits, servicing, ownership checks and branch-level
                  planning.
                </p>

                <div className="mt-6 rounded-[1.75rem] border border-border bg-white p-6 shadow-float">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Benefits
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      "Reduce loss with visible ownership",
                      "Cut manual follow-up during employee exits",
                      "Spot maintenance and warranty issues earlier",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl bg-surface/45 p-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                        <span className="text-sm leading-6 text-ink">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {reportCards.map((card) => (
                  <article key={card.title} className="soft-card flex h-full flex-col p-5 sm:p-6">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                      <Clock3 className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-ink">{card.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink-soft">{card.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="hero-gradient py-14 scroll-mt-24 sm:py-16 lg:py-20">
          <div className="container-x">
            <div className="rounded-[2rem] border border-border bg-white p-8 shadow-float md:p-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                    Next step
                  </div>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                    Bring asset ownership into one clear workspace
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-ink-soft">
                    Keep your asset register, maintenance, returns and audit history in one
                    organised page built to work like the other Altroz product workspaces.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Link to={ROUTES.bookDemo} className="btn-primary">
                    Book Free Demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to={ROUTES.contact} className="btn-outline">
                    Contact Sales
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
