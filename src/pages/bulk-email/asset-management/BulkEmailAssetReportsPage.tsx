"use client";

import type { ComponentType } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  Filter,
  PieChart,
  ShieldCheck,
  TrendingUp,
  Wrench,
  Building2,
  Layers3,
  FileText,
  Search,
  CalendarDays,
  MapPinned,
  Users,
  Package,
} from "lucide-react";
import AssetManagementNavbar from "@/components/site/AssetManagementNavbar";
import Footer from "@/components/site/Footer";
import PageSEO from "@/components/site/PageSEO";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { ROUTES } from "@/routes/routeConfig.js";
import { PageShell, SectionHeading } from "./shared";

type CardData = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  benefit?: string;
};

type Faq = {
  q: string;
  a: string;
};

const heroMetrics = [
  { label: "Asset Value", value: "$1.2M" },
  { label: "Utilization Rate", value: "84%" },
  { label: "Maintenance Backlog", value: "18" },
  { label: "Compliance Status", value: "Ready" },
];

const valueStrip = [
  {
    title: "Operational Visibility",
    description: "See every asset, everywhere, in real time.",
    icon: Search,
  },
  {
    title: "Audit Readiness",
    description: "Every action is logged automatically for quicker audits.",
    icon: ShieldCheck,
  },
  {
    title: "Maintenance Intelligence",
    description: "Spot failures before they happen with maintenance KPIs.",
    icon: Wrench,
  },
  {
    title: "Data-Driven Decisions",
    description: "Translate raw asset data into executive action.",
    icon: BarChart3,
  },
];

const capabilityCards: CardData[] = [
  {
    title: "Executive Dashboard",
    description:
      "A single-screen summary combining total asset value, utilization rate, maintenance backlog and compliance status.",
    icon: BarChart3,
  },
  {
    title: "Asset Analytics Charts",
    description:
      "Trend charts showing asset acquisition, depreciation and lifecycle stage over time.",
    icon: TrendingUp,
  },
  {
    title: "Maintenance KPI Cards",
    description:
      "Compact metrics for MTTR, open work orders, preventive versus reactive ratio and maintenance cost per asset.",
    icon: Wrench,
  },
  {
    title: "Department Comparison",
    description:
      "Side-by-side charts comparing asset count, downtime and spend across departments.",
    icon: Building2,
  },
  {
    title: "Branch Performance",
    description:
      "A location-aware dashboard ranking branches by utilization, uptime and maintenance responsiveness.",
    icon: MapPinned,
  },
  {
    title: "Warranty Status Cards",
    description:
      "Color-coded cards for active, expiring soon and expired warranties.",
    icon: ShieldCheck,
  },
  {
    title: "Repair Timeline",
    description:
      "A horizontal timeline of service history for root-cause analysis of recurring failures.",
    icon: Clock3,
  },
  {
    title: "Asset Distribution",
    description:
      "A donut or treemap view showing distribution by category, age or condition.",
    icon: PieChart,
  },
  {
    title: "Business Intelligence",
    description:
      "A drill-down dashboard blending financial, operational and compliance metrics.",
    icon: Layers3,
  },
  {
    title: "Interactive Filters",
    description:
      "Persistent filters for branch, department, date range, asset type and status.",
    icon: Filter,
  },
];

const trustCards: CardData[] = [
  {
    title: "Built on Real Expertise",
    description:
      "Developed with input from operations, maintenance and finance practitioners managing multi-branch asset portfolios.",
    icon: Users,
  },
  {
    title: "Data Governance & Security",
    description:
      "All asset and maintenance data is encrypted in transit and at rest, with role-based access and logged report generation.",
    icon: ShieldCheck,
  },
  {
    title: "Proven Across Industries",
    description:
      "Used by manufacturing, retail and healthcare teams to standardize reporting across departments and locations.",
    icon: Building2,
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Connect your inventory",
    description:
      "Import existing asset records via CSV, ERP integration or manual entry so everything is centralized.",
  },
  {
    step: "02",
    title: "Set up departments and branches",
    description:
      "Organize assets by department, branch and category so reports can be segmented automatically.",
  },
  {
    step: "03",
    title: "Configure maintenance and warranty rules",
    description:
      "Define schedules, warranty periods and alert thresholds so risks are flagged early.",
  },
  {
    step: "04",
    title: "Select or build your report view",
    description:
      "Choose pre-built templates or build a custom report using interactive filters.",
  },
  {
    step: "05",
    title: "Review real-time dashboards",
    description:
      "Monitor health, utilization and cost trends as data updates automatically.",
  },
  {
    step: "06",
    title: "Export audit-ready reports",
    description:
      "Generate timestamped PDF or Excel reports with a full change history for audits and reviews.",
  },
];

const faqItems: Faq[] = [
  {
    q: "What is asset reporting and why does it matter for growing businesses?",
    a: "Asset reporting is the structured process of tracking, analyzing and presenting data about a company's physical and digital assets, including location, condition, maintenance history, warranty status and lifecycle cost. Organized reporting gives leadership real-time visibility into what the business owns, how it's performing and where money is being lost to downtime, loss or poor maintenance planning.",
  },
  {
    q: "How does Altroz Asset Management help with audit readiness?",
    a: "Altroz automatically logs every asset transaction, including assignment, transfer, repair, disposal and depreciation, with timestamps and user attribution. This creates a continuous, exportable audit trail so finance and compliance teams can respond to audits in minutes instead of weeks.",
  },
  {
    q: "Can I compare asset performance across departments or branches?",
    a: "Yes. Altroz includes department comparison and branch performance dashboards that benchmark utilization, maintenance cost and downtime side by side.",
  },
  {
    q: "Does the platform track warranty and repair timelines automatically?",
    a: "Yes. Altroz monitors warranty expiry dates and repair history for every asset and surfaces at-risk items through warranty status cards and repair timeline visualizations.",
  },
  {
    q: "Is the reporting suitable for non-technical business stakeholders?",
    a: "Yes. Reports are presented through executive dashboards, KPI cards and plain-language summaries designed for finance, operations and leadership audiences.",
  },
  {
    q: "How secure is the data behind these reports?",
    a: "Asset and maintenance data is encrypted in transit and at rest, access is role-based and every report generation and export is logged.",
  },
  {
    q: "Can reports be filtered or customized for specific use cases?",
    a: "Yes. Interactive filters let users slice data by branch, department, asset category, date range or status.",
  },
  {
    q: "How is Altroz different from spreadsheet-based asset tracking?",
    a: "Spreadsheets are manually updated and error-prone. Altroz continuously syncs asset data into live dashboards and automated reports, removing manual reconciliation and reducing outdated or conflicting records.",
  },
  {
    q: "What business outcomes can I expect from better asset reporting?",
    a: "Organizations typically see reduced maintenance costs through predictive insight, faster audit and compliance cycles, improved asset utilization and better capital planning based on accurate lifecycle and depreciation data.",
  },
  {
    q: "How do I get started with Altroz Asset Management reporting?",
    a: "You can book a personalized demo where our team walks through your current workflows and shows how Altroz dashboards, KPI tracking and audit trails would apply to your organisation.",
  },
];

function ReportingDashboardMock() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="dashboard-glow left-1/2 top-10 -translate-x-1/2" />
      <div className="soft-card relative overflow-hidden rounded-[2rem] border border-border bg-white/95 p-5 shadow-float">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-success/12 text-primary shadow-sm">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
              Executive Dashboard
            </div>
            <div className="mt-1 text-lg font-semibold text-ink">
              Reporting and analytics in one view
            </div>
          </div>
          <div className="ml-auto rounded-full bg-primary-soft px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            Live
          </div>
        </div>

        <div className="mt-5 grid gap-4">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-primary/6 via-white to-success/6 p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {heroMetrics.map((item) => (
                <div key={item.label} className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                    {item.label}
                  </div>
                  <div className="mt-1 text-2xl font-black tracking-tight text-ink">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-success">
                    Filters
                  </div>
                  <h3 className="mt-1 text-base font-semibold text-ink">
                    Branch, department, date range and asset type
                  </h3>
                </div>
                <Filter className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-4 grid gap-2">
                {[
                  "Branch: All locations",
                  "Department: Finance",
                  "Date range: This quarter",
                  "Status: Maintenance backlog",
                ].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl bg-surface/70 p-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                      {String(index + 1)}
                    </span>
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item} className="flex items-start gap-3 rounded-2xl bg-surface/45 p-3">
          <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
          <span className="text-sm leading-6 text-ink">{item}</span>
        </div>
      ))}
    </div>
  );
}

export default function BulkEmailAssetReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Asset Reporting & Analytics Software | Altroz Asset Management"
        description="Turn asset data into real-time dashboards, maintenance KPIs and audit-ready reports. See how Altroz Asset Management gives you total operational visibility."
        canonicalPath={ROUTES.bulkEmailAssetReports}
      />

      <AssetManagementNavbar />

      <PageShell>
        <section className="hero-gradient relative overflow-hidden pt-12 pb-16">
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 top-16 h-72 w-72 rounded-full bg-success/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />

          <div className="site-container">
            <div className="mx-auto max-w-5xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-xs font-extrabold tracking-[0.22em] text-primary shadow-sm">
                <BarChart3 className="h-3.5 w-3.5" />
                Asset Reporting & Analytics
              </span>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Enterprise Asset Reporting and Analytics Built for Audit-Ready Operations
              </h1>
              <p className="mx-auto mt-5 max-w-4xl text-base leading-7 text-ink-soft sm:text-lg">
                Turn scattered asset data into real-time dashboards, maintenance insights and audit-ready
                reports so every decision is backed by evidence, not guesswork.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Link to={ROUTES.bookDemo} className="btn-primary">
                  Book a Free Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#features" className="btn-outline">
                  Explore Reporting Features
                </a>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {heroMetrics.map((item) => (
                <article key={item.label} className="soft-card p-5 text-left">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    {item.label}
                  </div>
                  <div className="mt-2 text-2xl font-black tracking-tight text-ink">{item.value}</div>
                </article>
              ))}
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <ScrollReveal variant="fade-up" className="text-center lg:text-left">
                <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-primary sm:text-3xl lg:mx-0">
                  Real-time dashboards turn asset data into evidence-backed decisions
                </h2>
                <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg lg:mx-0">
                  Executive dashboards, maintenance KPIs and audit-ready reports help teams spot
                  bottlenecks, compare locations and monitor compliance without digging through
                  spreadsheets.
                </p>
                <div className="mt-7 rounded-[1.5rem] border border-primary/15 bg-gradient-to-br from-primary/6 via-white to-success/6 p-5 text-left">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Value proposition
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {valueStrip.map((item) => (
                      <div key={item.title} className="soft-card p-4">
                        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary-soft text-primary shadow-sm">
                          <item.icon className="h-5 w-5" />
                        </span>
                        <h3 className="mt-3 text-sm font-semibold text-ink">{item.title}</h3>
                        <p className="mt-2 text-xs leading-6 text-ink-soft">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="scale" className="relative self-start">
                <ReportingDashboardMock />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Core Reporting Capabilities"
              title="The platform includes the reporting widgets leadership actually uses"
              description="Each capability maps to a practical dashboard or visualization for day-to-day decision-making."
              center
            />

            <StaggerReveal step={35} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {capabilityCards.map((card) => (
                <article key={card.title} className="soft-card h-full p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-success/12 text-primary shadow-sm">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Why Businesses Trust Altroz"
              title="The reporting layer is built around real operations, security and adoption"
              description="These trust signals matter when teams use reporting data for audits, budgets and leadership reviews."
              center
            />

            <StaggerReveal step={35} className="mt-8 grid gap-4 md:grid-cols-3">
              {trustCards.map((card) => (
                <article key={card.title} className="soft-card h-full p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary shadow-sm">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="How It Works"
              title="An audit-ready report in six straightforward steps"
              description="The flow keeps asset data centralized, segmented and ready for export."
              center
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {howItWorks.map((item) => (
                <article key={item.step} className="soft-card h-full p-5">
                  <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                    Step {item.step}
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="Common questions about asset reporting and analytics"
              description="A concise answer set for the questions businesses ask most often."
              center
            />

            <div className="mx-auto mt-8 max-w-4xl">
              <div className="space-y-3">
                {faqItems.map((item) => (
                  <details key={item.q} className="soft-card px-5">
                    <summary className="cursor-pointer list-none py-5 text-left text-base font-semibold text-ink">
                      {item.q}
                    </summary>
                    <p className="pb-5 text-sm leading-7 text-ink-soft">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="hero-gradient py-14 scroll-mt-24 sm:py-16 lg:py-20">
          <div className="site-container">
            <div className="rounded-[2rem] border border-border bg-white p-8 shadow-float md:p-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                    Final CTA
                  </div>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                    See Your Asset Data Come to Life
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-ink-soft">
                    Book a personalised demo and discover how Altroz turns your asset records into real-time
                    dashboards, maintenance insight and audit-ready reporting in under 30 minutes.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Link to={ROUTES.bookDemo} className="btn-primary">
                    Book Your Free Demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to={ROUTES.contact} className="btn-outline">
                    Talk to Our Experts
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageShell>

      <Footer />
    </div>
  );
}
