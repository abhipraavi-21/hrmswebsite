import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Laptop,
  Package,
  QrCode,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Tag,
  Wrench,
} from "lucide-react";
import TopNavbar from "@/components/site/TopNavbar";
import MainNavbar from "@/components/site/MainNavbar";
import Footer from "@/components/site/Footer";
import PageSEO from "@/components/site/PageSEO";
import { ROUTES } from "@/routes/routeConfig.js";
import { modelScreenshots } from "@/lib/modelScreenshots";

const heroMetrics = [
  { label: "Visibility", value: "See every asset in one place" },
  { label: "Control", value: "Issue, return, and approve" },
  { label: "Confidence", value: "Audit-ready histories" },
];

const heroHighlights = [
  "Centralised asset register",
  "Employee asset allocation",
  "Maintenance and warranty alerts",
  "QR codes and bulk import",
];

const whatItIsPoints = [
  {
    title: "One register for everything",
    desc: "Record laptops, desktops, furniture, tools, vehicles, and field equipment in a single searchable system.",
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: "Replace scattered manual tracking",
    desc: "Move away from Excel sheets, WhatsApp messages, and paper handover forms that are easy to lose.",
    icon: <ClipboardCheck className="h-5 w-5" />,
  },
  {
    title: "Keep ownership visible",
    desc: "See who has what, where it is located, and which department or branch it belongs to.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Plan maintenance earlier",
    desc: "Use due-date and warranty alerts to keep assets in service and avoid last-minute breakdowns.",
    icon: <Wrench className="h-5 w-5" />,
  },
];

const featureGroups = [
  {
    title: "Asset Registration, Categories and Types",
    intro:
      "Create a structured asset register with clear metadata so records stay searchable as the asset base grows.",
    icon: <Tag className="h-5 w-5" />,
    bullets: [
      "Add asset name, category, type, branch, location, and current status",
      "Group items into categories such as IT Equipment, Furniture, or Vehicles",
      "Track statuses like Available, In Use, Pending Setup, Under Maintenance, and Retired",
    ],
  },
  {
    title: "Assignment, Ownership and Location",
    intro:
      "Give every asset a visible owner and deployment location so handoffs stay traceable.",
    icon: <Laptop className="h-5 w-5" />,
    bullets: [
      "Assign assets directly to employees with a traceable ownership history",
      "Map assets to branch and department for better distribution visibility",
      "Record the current asset location for faster lookup and support",
    ],
  },
  {
    title: "Issue, Return, Handover and Recovery",
    intro:
      "Use a clear workflow for moving assets in and out of employee possession without losing the trail.",
    icon: <RotateCcw className="h-5 w-5" />,
    bullets: [
      "Log issue and return actions digitally instead of using paper slips",
      "Record handovers when one employee gives the asset to another",
      "Track pending recoveries during transfers or employee exits",
    ],
  },
  {
    title: "Maintenance and Alerts",
    intro:
      "Stay ahead of servicing and warranty timelines so assets do not quietly fall out of service.",
    icon: <Wrench className="h-5 w-5" />,
    bullets: [
      "Mark assets under maintenance and log servicing events",
      "Get maintenance due alerts before scheduled servicing slips",
      "See out-of-service items and warranty expiry notifications in time",
    ],
  },
  {
    title: "QR Codes and Bulk Import",
    intro:
      "Speed up onboarding and asset identification with QR codes and migration tools.",
    icon: <QrCode className="h-5 w-5" />,
    bullets: [
      "Generate a unique QR code for each registered asset",
      "Print QR codes in bulk for new equipment and office moves",
      "Import existing asset registers from Excel in bulk",
    ],
  },
  {
    title: "Search, Reports and Access Control",
    intro:
      "Find records quickly, report on the asset base, and keep sensitive data limited to the right roles.",
    icon: <BarChart3 className="h-5 w-5" />,
    bullets: [
      "Search and filter by branch, owner, category, type, or status",
      "Generate reports on status, branch, category, owner, and maintenance activity",
      "Use activity logs and role-based access for audit-ready control",
    ],
  },
];

const lifecycleSteps = [
  {
    step: "01",
    title: "Register Asset",
    desc: "Add the asset with category, type, branch, and location details.",
  },
  {
    step: "02",
    title: "Assign Asset",
    desc: "Allocate the asset to an employee and update the status to In Use.",
  },
  {
    step: "03",
    title: "Track Usage",
    desc: "Keep the owner, location, and status visible on the dashboard.",
  },
  {
    step: "04",
    title: "Maintenance",
    desc: "Mark the asset under maintenance and raise due alerts in advance.",
  },
  {
    step: "05",
    title: "Issue / Return",
    desc: "Move assets between Available and In Use as they are issued or returned.",
  },
  {
    step: "06",
    title: "Transfer",
    desc: "Record handovers so ownership history stays complete.",
  },
  {
    step: "07",
    title: "Recover",
    desc: "Follow up on pending recoveries during transfers or exits.",
  },
  {
    step: "08",
    title: "Retire Asset",
    desc: "Mark unusable assets retired while keeping the record for audit purposes.",
  },
];

const dashboardStats = [
  { label: "Total Assets", value: "Complete asset count" },
  { label: "Assets In Use", value: "Currently assigned assets" },
  { label: "Available Assets", value: "Ready to allocate" },
  { label: "Under Maintenance", value: "Items in repair or servicing" },
  { label: "Out Of Service", value: "Unusable assets awaiting action" },
  { label: "Asset Summary", value: "Status overview at a glance" },
  { label: "Asset Trend", value: "Movement over time" },
  { label: "Recent Assets", value: "Latest additions or updates" },
  { label: "Alerts", value: "Maintenance and warranty reminders" },
];

const reportCards = [
  {
    title: "Asset Reports",
    desc: "A consolidated view of assets with current status, owner, branch, and category.",
  },
  {
    title: "Asset History",
    desc: "A full record of assignment, transfer, return, and maintenance events.",
  },
  {
    title: "Status Report",
    desc: "A breakdown of assets by Available, In Use, Pending Setup, Under Maintenance, and Retired.",
  },
  {
    title: "Branch Report",
    desc: "Distribution of assets across office locations for planning and support.",
  },
  {
    title: "Category Report",
    desc: "A view of asset distribution across categories and types for budgeting.",
  },
  {
    title: "Owner Report",
    desc: "A clear view of which employee currently holds each asset.",
  },
  {
    title: "Maintenance Report",
    desc: "A log of serviced assets along with due and completed maintenance items.",
  },
  {
    title: "Asset Audit Report",
    desc: "An audit-ready export built from the activity log and audit trail.",
  },
];

const businessBenefits = [
  "Reduce asset loss with clearer ownership records",
  "See every asset, owner, and location from one dashboard",
  "Assign equipment in minutes instead of using manual paperwork",
  "Track pending recoveries during transfers and exits",
  "Improve accountability with named issue, return, and handover events",
  "Plan servicing before assets go out of service",
  "Keep audit-ready records whenever they are needed",
  "Spend less time searching spreadsheets and more time working",
];

const industries = [
  { title: "Manufacturing", desc: "Track tools, machinery accessories, and equipment across shop floors." },
  { title: "IT Companies", desc: "Manage laptops, monitors, and peripherals across employees and teams." },
  { title: "Healthcare", desc: "Keep track of equipment and devices across departments and facilities." },
  { title: "Education", desc: "Manage lab equipment, computers, and furniture across campuses." },
  { title: "Retail", desc: "Track POS devices, furniture, and store equipment across outlets." },
  { title: "Construction", desc: "Track tools and equipment as they move across sites and project teams." },
  { title: "Hospitality", desc: "Manage equipment and furniture across properties, departments, and shifts." },
  { title: "Logistics", desc: "Track handheld devices, vehicles-related equipment, and warehouse assets." },
  { title: "Professional Services", desc: "Maintain a clean register for laptops, devices, and office equipment." },
  { title: "Startups", desc: "Start with a structured asset register from day one as headcount grows." },
];

const faqs = [
  {
    q: "What is Asset Management Software?",
    a: "It is a system used to register, assign, track, and maintain company assets from one central platform instead of using manual spreadsheets and paper records.",
  },
  {
    q: "How is Altroz HR different from tracking assets on Excel?",
    a: "Altroz HR gives you a live asset register, defined workflows, alerts, and an audit trail that spreadsheets cannot maintain reliably as the asset count grows.",
  },
  {
    q: "Can I assign assets directly to employees?",
    a: "Yes. Employee Asset Allocation lets you assign an asset to a specific employee and track ownership until it is returned, transferred, or retired.",
  },
  {
    q: "Does the software track asset location and branch?",
    a: "Yes. Every asset can be mapped to a branch, department, and location so teams know where each item is placed.",
  },
  {
    q: "What happens when an employee is transferred or exits?",
    a: "Asset Handover and Asset Recovery features let you transfer assets or flag pending recoveries so nothing is missed during exits.",
  },
  {
    q: "How does maintenance tracking work?",
    a: "You can mark an asset under maintenance, and the system raises maintenance due alerts so servicing can be planned in advance.",
  },
  {
    q: "Does Altroz HR track warranty expiry?",
    a: "Yes. Warranty expiry alerts notify your team before an asset's warranty runs out so you can act while the asset is still covered.",
  },
  {
    q: "Can I import my existing asset data?",
    a: "Yes. Excel import and bulk import let you bring your existing asset register into the system without manual re-entry.",
  },
  {
    q: "Does the system support QR codes for assets?",
    a: "Yes. Each asset can have a unique QR code, and you can generate and print codes in bulk.",
  },
  {
    q: "What reports can I generate?",
    a: "You can generate asset reports, asset history, status reports, branch reports, category reports, owner reports, maintenance reports, and asset audit reports.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-3xl`}>
      <span className="text-xs font-bold uppercase tracking-wider text-primary">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
      <p className="mt-3 text-ink-soft">{description}</p>
    </div>
  );
}

export default function AssetManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Asset Management Software for Businesses | Altroz HR"
        description="Manage company assets with Altroz HR Asset Management Software. Track allocation, issue-return, maintenance, warranty, reports, QR codes, and audit-ready records."
        canonicalPath={ROUTES.assetManagement}
      />
      <TopNavbar />
      <MainNavbar />

      <main>
        <section id="asset-management" className="hero-gradient relative overflow-hidden scroll-mt-24">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x py-12 lg:py-16">
            <div className="mx-auto max-w-4xl text-center fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Asset Management Software
              </span>
              <h1 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
                Asset Management Software to track, allocate, and manage company assets
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-ink-soft">
                Altroz HR Asset Management Software helps businesses register, assign, track, and
                maintain every company asset from one central dashboard.
              </p>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5 self-start fade-up">
                <p className="max-w-xl text-base leading-7 text-ink-soft">
                  Replace scattered spreadsheets and manual registers with a single, reliable
                  asset system that your HR, Admin, and IT teams can actually trust.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to={ROUTES.bookDemo} className="btn-primary">
                    Book a Free Demo
                  </Link>
                  <Link to={`${ROUTES.assetManagement}#features`} className="btn-outline">
                    Explore Asset Management Features
                  </Link>
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

                <div className="mt-6 rounded-[1.5rem] border border-border bg-white/80 p-5 shadow-card backdrop-blur-sm">
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    What this page covers
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {heroHighlights.map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                        <span className="text-sm leading-6 text-ink">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 self-start">
              <div className="relative mx-auto max-w-3xl">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-5 shadow-float">
                  <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                    <div className="rounded-[1.5rem] border border-border bg-surface p-4 md:p-5">
                      <div className="overflow-hidden rounded-[1.25rem] border border-border bg-white shadow-card">
                        <img
                          src={modelScreenshots.assetsDashboard}
                          alt="Asset dashboard preview"
                          className="block h-auto w-full object-cover"
                          loading="eager"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        {[
                          { label: "Total assets", value: "All items in one register" },
                          { label: "Assets in use", value: "Assigned and active items" },
                          { label: "Maintenance", value: "Items due for service" },
                        ].map((item) => (
                          <div key={item.label} className="rounded-2xl bg-white p-4 shadow-card">
                            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                              {item.label}
                            </div>
                            <div className="mt-1 text-sm font-semibold text-ink">{item.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <div className="rounded-[1.5rem] border border-border bg-white p-5 shadow-card">
                        <div className="flex items-center gap-3">
                          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                            <Package className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                              Centralised register
                            </div>
                            <div className="text-lg font-bold text-ink">Inventory view</div>
                          </div>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-ink-soft">
                          See every asset with a clear owner and lifecycle state in one searchable
                          system.
                        </p>
                      </div>

                      <div className="rounded-[1.5rem] border border-border bg-white p-5 shadow-card">
                        <div className="flex items-center gap-3">
                          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#ecfdf3] text-success">
                            <ShieldCheck className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                              Accountability
                            </div>
                            <div className="text-lg font-bold text-ink">Ownership trail</div>
                          </div>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-ink-soft">
                          Keep issue, return, and handover actions tied to approvals and locations.
                        </p>
                      </div>

                      <div className="rounded-[1.5rem] border border-border bg-surface p-5">
                        <div className="flex items-center gap-3">
                          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-primary shadow-card">
                            <BarChart3 className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                              Audit ready
                            </div>
                            <div className="text-lg font-bold text-ink">Live status and trend view</div>
                          </div>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-ink-soft">
                          Monitor ageing, repair, recovery, and asset movement signals before they
                          slip.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="What it is"
              title="What is Asset Management Software?"
              description="Asset Management Software helps organisations record, assign, track, and maintain the physical assets they own from one central platform."
              centered
            />

            <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-4">
                <div className="rounded-[1.5rem] border border-border bg-surface p-5">
                  <p className="text-sm leading-7 text-ink-soft">
                    Instead of maintaining asset details across multiple Excel sheets, WhatsApp
                    messages, and paper handover forms, Altroz HR gives you one asset register that
                    every department can rely on.
                  </p>
                  <p className="mt-4 text-sm leading-7 text-ink-soft">
                    Businesses also get structured workflows for issue, return, handover, and
                    recovery, plus timely alerts for maintenance and warranty expiry.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-8 grid gap-5 md:grid-cols-2">
              {whatItIsPoints.map((item) => (
                <article key={item.title} className="soft-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{item.desc}</p>
                    </div>
                  </div>
                </article>
              ))}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Core features"
              title="Core features of Altroz HR Asset Management"
              description="Every feature below is part of the Altroz HR Asset Management module and is organized to mirror the way teams actually work."
              centered
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {featureGroups.map((item) => (
                <article key={item.title} className="soft-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{item.intro}</p>
                      <div className="mt-4 space-y-3">
                        {item.bullets.map((bullet) => (
                          <div
                            key={bullet}
                            className="flex items-start gap-3 rounded-xl border border-border bg-white p-3"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                            <span className="text-sm leading-6 text-ink">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="soft-card p-6 lg:sticky lg:top-24 lg:col-span-4 self-start">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Asset lifecycle workflow
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                A simple lifecycle that keeps assets moving through the right stages
              </h3>
              <p className="mt-3 text-sm leading-6 text-ink-soft">
                The workflow keeps the asset-management flow easy to scan while giving every team
                a predictable process to follow.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Every stage stays visible to the right people",
                  "Ownership and location remain attached to the record",
                  "Recovery and retirement steps stay audit friendly",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm leading-6 text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid gap-4 md:grid-cols-2">
                {lifecycleSteps.map((item, index) => (
                  <article
                    key={item.step}
                    className="relative overflow-hidden rounded-[1.5rem] border border-border bg-white p-5 shadow-card"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-success/60" />
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-base font-bold text-primary">
                        {item.step}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h4 className="text-lg font-bold text-ink">{item.title}</h4>
                          {index < lifecycleSteps.length - 1 ? (
                            <ArrowRight className="hidden h-4 w-4 text-ink-soft md:block" />
                          ) : null}
                        </div>
                        <p className="mt-2 text-sm leading-6 text-ink-soft">{item.desc}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="Asset dashboard"
                title="A real-time snapshot of your entire asset base"
                description="The Altroz HR Asset Dashboard shows the key numbers and trends the moment you log in, without digging through separate sheets or files."
              />

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {dashboardStats.slice(3).map((item) => (
                  <div key={item.label} className="soft-card p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {item.label}
                    </div>
                    <div className="mt-2 text-sm leading-6 text-ink">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 grid gap-5">
              <div className="grid gap-3 md:grid-cols-3">
                {dashboardStats.slice(0, 3).map((item) => (
                  <div key={item.label} className="soft-card p-5">
                    <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {item.label}
                    </div>
                    <div className="mt-2 text-sm leading-6 text-ink">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-[2rem] border border-border bg-white p-4 shadow-float">
                <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface">
                  <img
                    src={modelScreenshots.assetsDashboard}
                    alt="Asset dashboard preview"
                    className="block h-auto w-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Reports and analytics"
              title="Reports and analytics built for planning, audits, and decisions"
              description="Altroz HR turns asset data into reports that HR, Admin, Finance, and IT teams can use for planning and review."
              centered
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {reportCards.map((item) => (
                <article key={item.title} className="soft-card p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Business benefits"
              title="Business benefits of Altroz HR Asset Management"
              description="The platform helps teams work with fewer losses, clearer ownership, and a cleaner audit trail."
              centered
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {businessBenefits.map((item) => (
                <div key={item} className="soft-card flex items-start gap-3 p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="text-sm leading-6 text-ink">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Industries we support"
              title="Asset management for a wide range of businesses"
              description="Manufacturing, IT, healthcare, retail, education, logistics, and startups can all use the same structured asset flow."
              centered
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {industries.map((item) => (
                <article key={item.title} className="soft-card p-6">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="soft-card p-6 lg:col-span-7 lg:self-start">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Frequently asked questions
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                The questions teams usually ask before choosing asset management software
              </h3>
              <div className="mt-6 grid gap-4">
                {faqs.map((item) => (
                  <div key={item.q} className="rounded-2xl border border-border bg-white p-4">
                    <div className="text-base font-bold text-ink">{item.q}</div>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="soft-card p-6 lg:col-span-5 lg:self-start">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Final summary
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                Bring all your company assets under one system
              </h3>
              <p className="mt-3 text-sm leading-6 text-ink-soft">
                Stop chasing spreadsheets and paper handover slips. Altroz HR gives HR, Admin, and
                IT teams a single reliable view of every company asset.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Register", value: "One inventory" },
                  { label: "Track", value: "Clear ownership" },
                  { label: "Recover", value: "Cleaner handoffs" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-border bg-surface p-4 text-center"
                  >
                    <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {item.label}
                    </div>
                    <div className="mt-1 text-sm font-bold text-ink">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                {[
                  "See every asset, owner, and location from one dashboard",
                  "Use maintenance and warranty alerts to stay ahead",
                  "Generate reports and audit logs whenever you need them",
                  "Keep asset workflows aligned across HR, Admin, and IT",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm leading-6 text-ink">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3">
                <Link to={ROUTES.bookDemo} className="btn-primary justify-center">
                  Book a Free Demo
                </Link>
                <Link to={ROUTES.contact} className="btn-outline justify-center">
                  Talk to Our Team
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
