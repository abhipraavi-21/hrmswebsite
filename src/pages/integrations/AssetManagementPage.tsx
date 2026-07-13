import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Laptop,
  Package,
  QrCode,
  RotateCcw,
  ScanLine,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Tag,
  Truck,
  Wrench,
} from "lucide-react";
import TopNavbar from "@/components/site/TopNavbar";
import MainNavbar from "@/components/site/MainNavbar";
import Footer from "@/components/site/Footer";

const heroMetrics = [
  { label: "Visibility", value: "See every asset in one place" },
  { label: "Control", value: "Issue, return, and approve" },
  { label: "Confidence", value: "Audit-ready histories" },
];

const capabilityCards = [
  {
    icon: <QrCode className="h-5 w-5" />,
    title: "Tag and register",
    desc: "Create unique records for laptops, scanners, cards, and other company property.",
  },
  {
    icon: <ClipboardCheck className="h-5 w-5" />,
    title: "Issue and return",
    desc: "Track who has the item, when it was handed over, and when it comes back.",
  },
  {
    icon: <RotateCcw className="h-5 w-5" />,
    title: "Maintenance and refresh",
    desc: "Capture repairs, lifecycle milestones, and replacement cycles before assets drift.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Ownership and accountability",
    desc: "Keep a clear trail of approvals, assignees, and current location.",
  },
  {
    icon: <Smartphone className="h-5 w-5" />,
    title: "Field visibility",
    desc: "Support assets that move with employees, sites, or traveling teams.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Reports and audits",
    desc: "Generate summaries for inventory health, ageing assets, and open actions.",
  },
];

type AssetRow = {
  name: string;
  owner: string;
  location: string;
  status: string;
  icon: React.ReactNode;
  statusClass: string;
};

const assetRows: AssetRow[] = [
  {
    name: "MacBook Pro 14",
    owner: "Anika / Product",
    location: "HQ - Design",
    status: "In use",
    icon: <Laptop className="h-5 w-5" />,
    statusClass: "bg-primary-soft text-primary",
  },
  {
    name: "Zebra scanner",
    owner: "Ravi / Operations",
    location: "Front Desk",
    status: "Checked out",
    icon: <ScanLine className="h-5 w-5" />,
    statusClass: "bg-[#ecfdf3] text-success",
  },
  {
    name: "Access card batch",
    owner: "Security Desk",
    location: "Main Office",
    status: "Pending issue",
    icon: <Tag className="h-5 w-5" />,
    statusClass: "bg-surface text-ink",
  },
  {
    name: "Wireless printer",
    owner: "Shared pool",
    location: "2nd Floor",
    status: "Needs service",
    icon: <Wrench className="h-5 w-5" />,
    statusClass: "bg-[#fff7ed] text-[#c2410c]",
  },
];

const lifecycleSteps = [
  {
    step: "01",
    title: "Register",
    desc: "Record every asset once with an ID, category, and ownership policy.",
  },
  {
    step: "02",
    title: "Assign",
    desc: "Hand the item to a person, team, or location with a clear approval trail.",
  },
  {
    step: "03",
    title: "Maintain",
    desc: "Track repairs, renewals, and service dates so downtime stays low.",
  },
  {
    step: "04",
    title: "Recover",
    desc: "Return, reissue, or retire assets with a logged handback and audit trail.",
  },
];

const controlPoints = [
  "See which assets are active, due back, or in repair at a glance",
  "Keep location and assignee data aligned as employees move roles",
  "Spot ageing assets before they become a support problem",
  "Support office, field, and shared equipment workflows cleanly",
];

export default function AssetManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section
          id="asset-management"
          className="hero-gradient relative overflow-hidden scroll-mt-24"
        >
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x grid gap-10 py-12 lg:grid-cols-12 lg:items-start lg:py-16">
            <div className="lg:col-span-6 fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Asset Management
              </span>
              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Track, assign, and recover company assets without spreadsheet guesswork
              </h1>
              <p className="mt-4 max-w-xl text-base text-ink-soft">
                Keep laptops, scanners, access cards, printers, and shared equipment tied to a
                person, place, and status so ownership stays visible from issue to return.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/company/book-demo" className="btn-primary">
                  Book a demo
                </a>
                <a href="#workflow" className="btn-outline">
                  See the asset workflow
                </a>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {heroMetrics.map((item) => (
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
                    <div className="rounded-2xl bg-primary-soft p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <Package className="h-4 w-4" />
                        Inventory view
                      </div>
                      <p className="mt-2 text-sm text-ink-soft">
                        See every asset with a clear owner and lifecycle state.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#ecfdf3] p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-success">
                        <ShieldCheck className="h-4 w-4" />
                        Accountability
                      </div>
                      <p className="mt-2 text-sm text-ink-soft">
                        Keep issue and return actions tied to approvals and locations.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-surface p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <BarChart3 className="h-4 w-4" />
                        Audit ready
                      </div>
                      <p className="mt-2 text-sm text-ink-soft">
                        Monitor aging, repair, and recovery signals before they slip.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-[1.5rem] border border-border bg-surface p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                          Asset board
                        </div>
                        <div className="mt-1 text-lg font-bold text-ink">
                          A clean snapshot of who has what
                        </div>
                      </div>
                      <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-success shadow-sm">
                        Updated live
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3">
                      {assetRows.map((row) => (
                        <div
                          key={row.name}
                          className="rounded-2xl border border-border bg-white p-4 shadow-card"
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                                {row.icon}
                              </div>
                              <div>
                                <div className="text-sm font-bold text-ink">{row.name}</div>
                                <div className="text-xs text-ink-soft">
                                  {row.owner} | {row.location}
                                </div>
                              </div>
                            </div>
                            <div
                              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${row.statusClass}`}
                            >
                              {row.status}
                            </div>
                          </div>
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
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                What it covers
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                The pieces that make asset tracking useful every day
              </h2>
              <p className="mt-3 text-ink-soft">
                The layout stays consistent with the rest of the site, but the story now focuses on
                asset ownership, movement, and control instead of generic integration language.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {capabilityCards.map((item) => (
                <article key={item.title} className="soft-card p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="bg-surface py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12">
            <div className="soft-card p-6 lg:col-span-7">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Lifecycle workflow
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                A simple lifecycle that keeps assets moving through the right stages
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                These steps make the page feel balanced on desktop and mobile while keeping the
                asset-management flow easy to scan.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {lifecycleSteps.map((item) => (
                  <div key={item.step} className="rounded-2xl border border-border bg-white p-4">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                      {item.step}
                    </div>
                    <h4 className="mt-2 text-base font-bold text-ink">{item.title}</h4>
                    <p className="mt-2 text-sm text-ink-soft">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="soft-card p-6 lg:col-span-5">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Operational control
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                Keep location, owner, and service status aligned
              </h3>
              <div className="mt-6 space-y-3">
                {controlPoints.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="soft-card p-6 lg:col-span-5">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Why this matters
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">
                  Better visibility means fewer losses and cleaner handoffs
                </h3>
                <p className="mt-3 text-sm text-ink-soft">
                  The page stays aligned by using the same max width, card spacing, and section
                  rhythm as the rest of the app.
                </p>
              </div>

              <div className="grid gap-5 lg:col-span-7 md:grid-cols-3">
                {[
                  {
                    title: "Reduce loss",
                    desc: "Know where critical equipment is before it disappears into a drawer.",
                    icon: <Package className="h-5 w-5" />,
                  },
                  {
                    title: "Speed up handoff",
                    desc: "Issue or recover equipment with a clear, documented flow.",
                    icon: <Truck className="h-5 w-5" />,
                  },
                  {
                    title: "Spot repairs early",
                    desc: "Mark items for maintenance before they interrupt daily work.",
                    icon: <Wrench className="h-5 w-5" />,
                  },
                ].map((item) => (
                  <article key={item.title} className="soft-card p-6">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                      {item.icon}
                    </div>
                    <h4 className="mt-4 text-lg font-bold text-ink">{item.title}</h4>
                    <p className="mt-2 text-sm text-ink-soft">{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <div className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-10 top-6 h-28 w-28 rounded-full bg-primary/8 blur-3xl" />
              <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Ready to use
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                    A dedicated Asset Management page that feels part of the same system
                  </h2>
                  <p className="mt-3 max-w-2xl text-ink-soft">
                    This page now carries the asset-management story, the visuals match the title,
                    and the anchor on the URL will land users on the right section.
                  </p>
                </div>

                <div className="grid gap-3">
                  <a href="/company/book-demo" className="btn-primary justify-center">
                    Talk to us
                  </a>
                  <a href="/pricing" className="btn-outline justify-center">
                    Back to pricing
                  </a>
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
