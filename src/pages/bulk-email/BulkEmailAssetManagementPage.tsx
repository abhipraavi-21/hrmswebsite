"use client";

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
  Factory,
  FileText,
  Laptop,
  Layers3,
  MapPinned,
  Package,
  Search,
  ShieldCheck,
  Clock3,
  RotateCcw,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AssetManagementNavbar from "@/components/site/AssetManagementNavbar";
import Footer from "@/components/site/Footer";
import PageSEO from "@/components/site/PageSEO";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { ROUTES } from "@/routes/routeConfig.js";
import { cn } from "@/lib/utils";

type CardData = {
  title: string;
  description: string;
  icon: ReactNode;
  benefit?: string;
};

type Faq = {
  q: string;
  a: string;
};

type Step = {
  step: string;
  title: string;
  description: string;
};

function MaybeLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  center?: boolean;
}) {
  return (
    <ScrollReveal variant="fade-up" className={cn(center ? "mx-auto max-w-4xl text-center" : "max-w-4xl")}>
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-primary shadow-sm">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-base leading-7 text-ink-soft">{description}</p>
    </ScrollReveal>
  );
}

function AssetDashboardMock() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="dashboard-glow left-1/2 top-10 -translate-x-1/2" />
      <div className="soft-card relative overflow-hidden rounded-[2rem] border border-border bg-white/95 p-5 shadow-float">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-success/12 text-primary shadow-sm">
            <Package className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
              Asset Dashboard
            </div>
            <div className="mt-1 text-lg font-semibold text-ink">
              Real-time asset visibility in one screen
            </div>
          </div>
          <div className="ml-auto rounded-full bg-primary-soft px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            Live
          </div>
        </div>

        <div className="mt-5 grid gap-4">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-primary/6 via-white to-success/6 p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Total Assets", "12,480"],
                ["Assigned Assets", "9,824"],
                ["Available Assets", "2,154"],
                ["Under Maintenance", "146"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                    {label}
                  </div>
                  <div className="mt-1 text-2xl font-black tracking-tight text-ink">{value}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-success">
                    Dashboard snapshot
                  </div>
                  <h3 className="mt-1 text-base font-semibold text-ink">
                    Track assets, maintenance and ownership at a glance
                  </h3>
                </div>
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-4 space-y-3">
                {[
                  ["Utilization", "84%", "w-[84%]"],
                  ["Maintenance load", "16%", "w-[16%]"],
                  ["Warranty coverage", "73%", "w-[73%]"],
                ].map(([label, value, width]) => (
                  <div key={label}>
                    <div className="flex items-center justify-between text-xs font-semibold text-ink-soft">
                      <span>{label}</span>
                      <span>{value}</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-surface">
                      <div className={cn("h-2 rounded-full bg-gradient-to-r from-primary to-success", width)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.25rem] border border-border bg-white p-4 shadow-sm">
              <div className="text-sm font-semibold text-ink">Recent Activity</div>
              <div className="mt-3 space-y-2">
                {[
                  "New laptop assigned to IT team",
                  "Office projector returned to store",
                  "Maintenance logged for printer set",
                ].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl bg-surface/70 p-3 text-sm text-ink">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.25rem] border border-border bg-white p-4 shadow-sm">
              <div className="text-sm font-semibold text-ink">Alerts</div>
              <div className="mt-3 space-y-2">
                {[
                  ["Maintenance due", "4"],
                  ["Warranty expiring", "12"],
                  ["Out of service", "7"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-xl bg-white p-3 text-sm shadow-sm">
                    <span className="font-medium text-ink">{label}</span>
                    <span className="rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-success">
                      {value}
                    </span>
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

const heroMetrics = [
  { label: "Assets tracked", value: "12,480" },
  { label: "Assigned today", value: "348" },
  { label: "Maintenance due", value: "146" },
];

const quickLinks = [
  { label: "Asset Management", href: "#overview" },
  { label: "Asset Tracking", href: "#lifecycle" },
  { label: "QR Code Asset Management", href: "#features" },
  { label: "Asset Maintenance", href: "#reports" },
  { label: "Asset Reports", href: "#reports" },
  { label: "Pricing", href: ROUTES.pricing },
  { label: "Book Demo", href: ROUTES.bookDemo },
  { label: "About Us", href: ROUTES.about },
  { label: "Contact Us", href: ROUTES.contact },
  { label: "Help Center", href: ROUTES.support },
  { label: "FAQs", href: ROUTES.faq },
];

const overviewCards: CardData[] = [
  {
    title: "Centralized register",
    description: "Record laptops, monitors, tools, furniture and field equipment in one searchable workspace.",
    icon: Package,
    benefit: "Decision-makers can view every asset from one place.",
  },
  {
    title: "Clear ownership",
    description: "See which employee, branch and department currently holds each item without manual follow-up.",
    icon: Users,
    benefit: "Ownership stays visible across the organisation.",
  },
  {
    title: "Issue and return flows",
    description: "Track handover, return, transfer and recovery actions with a simple digital trail.",
    icon: RotateCcw,
    benefit: "Reduce confusion during assignments and exits.",
  },
  {
    title: "Service visibility",
    description: "Keep servicing, warranty and repair timelines visible before assets slip out of service.",
    icon: Wrench,
    benefit: "Spot service needs before downtime starts.",
  },
];

const needCards: CardData[] = [
  {
    title: "Centralized Asset Visibility",
    description: "Keep every asset type on one screen instead of scattered spreadsheets or registers.",
    icon: Package,
    benefit: "One screen replaces multiple manual lists.",
  },
  {
    title: "Faster Decision Making",
    description: "Use live numbers on total, assigned and available assets to act quickly.",
    icon: TrendingUp,
    benefit: "Managers do not wait for manual reports.",
  },
  {
    title: "Real-Time Asset Monitoring",
    description: "See changes as assets are added, assigned, moved or serviced.",
    icon: Clock3,
    benefit: "Asset data stays current throughout the day.",
  },
  {
    title: "Operational Transparency",
    description: "Understand how assets are distributed across branches, departments and categories.",
    icon: Building2,
    benefit: "Leadership gets a clear operational picture.",
  },
  {
    title: "Maintenance Awareness",
    description: "Highlight assets that need servicing so teams can stay ahead of failures.",
    icon: Wrench,
    benefit: "Reduce unplanned downtime and repair delays.",
  },
  {
    title: "Business Insights",
    description: "Track utilization and distribution patterns to support better planning.",
    icon: BarChart3,
    benefit: "Procurement decisions become more informed.",
  },
  {
    title: "Department-Level Visibility",
    description: "See exactly what each department owns and is responsible for.",
    icon: ClipboardList,
    benefit: "Department heads can review their assigned assets.",
  },
  {
    title: "Improved Asset Utilization",
    description: "Use available assets fully before buying more equipment.",
    icon: Search,
    benefit: "Idle assets can be reused where needed.",
  },
];

const widgetCards: CardData[] = [
  { title: "Total Assets", description: "Shows the complete count of all registered assets.", icon: Package, benefit: "Leadership gets an instant snapshot." },
  { title: "Assigned Assets", description: "Displays assets currently allocated to employees or teams.", icon: Users, benefit: "Track accountability with clarity." },
  { title: "Available Assets", description: "Shows assets ready to be allocated when needed.", icon: Laptop, benefit: "Reuse inventory before buying more." },
  { title: "Under Maintenance", description: "Lists assets currently undergoing repair or servicing.", icon: Wrench, benefit: "Plan around temporary unavailability." },
  { title: "Out of Service", description: "Highlights assets that are no longer operational.", icon: AlertTriangle, benefit: "Make replacement or disposal decisions." },
  { title: "Asset Categories", description: "Breaks assets into categories like IT, machinery and furniture.", icon: Layers3, benefit: "Analyse by category or type." },
  { title: "Branch Overview", description: "Shows how assets are distributed across locations.", icon: MapPinned, benefit: "Compare branches side by side." },
  { title: "Department Overview", description: "Displays asset distribution across departments.", icon: Building2, benefit: "Department heads can review ownership." },
  { title: "Recent Activities", description: "Shows the latest asset additions, assignments and updates.", icon: Clock3, benefit: "Keep teams updated without manual checking." },
  { title: "Maintenance Alerts", description: "Notifies teams about assets due for servicing.", icon: Wrench, benefit: "Avoid unexpected breakdowns." },
  { title: "Warranty Alerts", description: "Displays assets with warranties nearing expiry.", icon: ShieldCheck, benefit: "Claim support or renew on time." },
  { title: "Reports Summary", description: "Provides quick access to asset reports from the dashboard.", icon: BarChart3, benefit: "Save time by surfacing report data early." },
];

const insightCards: CardData[] = [
  { title: "Asset Utilization", description: "See how efficiently existing assets are being used.", icon: TrendingUp },
  { title: "Maintenance Trends", description: "Spot recurring servicing patterns over time.", icon: Wrench },
  { title: "Asset Distribution", description: "Understand category, branch and department balance.", icon: Layers3 },
  { title: "Asset Growth", description: "Track how the asset base changes over months or years.", icon: BarChart3 },
  { title: "Branch Performance", description: "Compare asset activity across locations.", icon: Building2 },
  { title: "Department Performance", description: "Review how teams use the assets assigned to them.", icon: ClipboardList },
  { title: "Warranty Monitoring", description: "Keep warranty timelines in view across all assets.", icon: ShieldCheck },
  { title: "Operational Performance", description: "Combine status, maintenance and utilization into one picture.", icon: CheckCircle2 },
];

const stepCards: Step[] = [
  {
    step: "01",
    title: "Assets are added",
    description: "New assets are recorded with relevant details such as name, category and purchase information.",
  },
  {
    step: "02",
    title: "Assets are categorized",
    description: "Each asset is grouped into the correct type for easier identification and reporting.",
  },
  {
    step: "03",
    title: "Assets are assigned",
    description: "Assets are allocated to employees, departments or branches based on business needs.",
  },
  {
    step: "04",
    title: "Dashboard updates automatically",
    description: "As soon as an asset changes, the dashboard reflects the update in real time.",
  },
  {
    step: "05",
    title: "Managers monitor status",
    description: "Teams review asset status, maintenance needs and warranty timelines from the dashboard.",
  },
  {
    step: "06",
    title: "Reports drive action",
    description: "Reporting data supports maintenance planning, procurement and resource allocation.",
  },
];

const benefitCards = [
  "Better visibility",
  "Quick decision making",
  "Reduced manual tracking",
  "Improved productivity",
  "Centralized operations",
  "Efficient asset planning",
  "Reduced downtime",
  "Business growth support",
];

const industryCards: CardData[] = [
  {
    title: "Manufacturing",
    description: "Track machinery status, maintenance schedules and equipment allocation across production lines.",
    icon: Factory,
  },
  {
    title: "IT Companies",
    description: "Monitor laptops, servers and network equipment with warranty timelines.",
    icon: Laptop,
  },
  {
    title: "Healthcare",
    description: "Track medical equipment availability, maintenance status and department-wise allocation.",
    icon: Building2,
  },
  {
    title: "Educational Institutions",
    description: "Monitor lab equipment, computers and furniture across campuses and departments.",
    icon: Users,
  },
  {
    title: "Retail",
    description: "Track store equipment, fixtures and devices across multiple outlets.",
    icon: Package,
  },
  {
    title: "Warehouses",
    description: "Monitor handling equipment, storage assets and maintenance needs in real time.",
    icon: Layers3,
  },
  {
    title: "Construction",
    description: "Track machinery and tools deployed across project sites.",
    icon: Wrench,
  },
  {
    title: "Corporate Offices",
    description: "Manage IT equipment, furniture and facility assets across departments and floors.",
    icon: Building2,
  },
  {
    title: "Government Organizations",
    description: "Maintain transparent, centralized asset records across offices and locations.",
    icon: ShieldCheck,
  },
];

const screenCards: CardData[] = [
  { title: "Main Dashboard", description: "Shows total, assigned, available and maintenance status at a glance.", icon: BarChart3, benefit: "Instant operational snapshot." },
  { title: "Asset Summary", description: "Consolidated summary of asset categories, types and overall status.", icon: Layers3, benefit: "Clear grouping and organisation." },
  { title: "Maintenance Overview", description: "Dedicated view for assets currently under maintenance and alerts.", icon: Wrench, benefit: "Plan servicing proactively." },
  { title: "Recent Activities", description: "Live feed of additions, assignments and updates.", icon: Clock3, benefit: "See day-to-day changes without manual follow-up." },
  { title: "Reports Widget", description: "Quick access to asset reports directly from the dashboard.", icon: FileText, benefit: "Save time on reporting." },
  { title: "Branch Dashboard", description: "Branch-specific view showing asset distribution and status.", icon: Building2, benefit: "Compare locations with ease." },
  { title: "Department Dashboard", description: "Department-specific view showing assigned and used assets.", icon: ClipboardList, benefit: "Keep teams accountable." },
];

const faqItems: Faq[] = [
  {
    q: "What is an Asset Dashboard?",
    a: "An Asset Dashboard is a centralized screen inside Altroz Asset Management that displays total assets, assigned assets, available assets and maintenance status in one place.",
  },
  {
    q: "Why is an Asset Dashboard important for businesses?",
    a: "It removes the need to check multiple registers or spreadsheets and gives real-time visibility into asset status, allocation and performance.",
  },
  {
    q: "Can I monitor all company assets from the dashboard?",
    a: "Yes. The dashboard shows an overview of all registered company assets, including category, status and assignment details.",
  },
  {
    q: "Can I view department-wise assets?",
    a: "Yes. The dashboard provides a department-wise overview so managers can see which assets are assigned to each department.",
  },
  {
    q: "Can I monitor maintenance from the dashboard?",
    a: "Yes. The dashboard includes maintenance alerts and an under-maintenance overview for assets that need servicing.",
  },
  {
    q: "Can I track asset warranties?",
    a: "Yes. Warranty alerts notify teams about assets whose warranties are expiring soon or have already expired.",
  },
  {
    q: "Can I monitor branch-wise assets?",
    a: "Yes. The branch overview widget shows how assets are distributed across different branches or locations.",
  },
  {
    q: "How does the dashboard improve productivity?",
    a: "By centralizing asset information and updating automatically, the dashboard reduces manual tracking and helps teams focus on core work.",
  },
  {
    q: "Can I generate reports from the dashboard?",
    a: "Yes. The reports summary widget provides quick access to asset-related reports directly from the dashboard.",
  },
  {
    q: "Who should use the Asset Dashboard?",
    a: "Business owners, operations managers, facility managers, IT managers, asset managers, finance managers and procurement teams can all benefit.",
  },
  {
    q: "Is the dashboard suitable for small businesses as well as large enterprises?",
    a: "Yes. It is designed to support both SMEs and large enterprises as the number of assets, branches and departments grows.",
  },
  {
    q: "Does the dashboard show available assets?",
    a: "Yes. The available assets widget shows how many assets are unassigned and ready to be allocated.",
  },
  {
    q: "Can I see out-of-service assets on the dashboard?",
    a: "Yes. Out-of-service assets are shown separately so managers can plan replacement or disposal decisions.",
  },
  {
    q: "Does the dashboard show recent asset activity?",
    a: "Yes. The recent activity feed displays the latest asset additions, assignments and status changes.",
  },
  {
    q: "Can the dashboard help with asset planning?",
    a: "Yes. Insights such as utilization and asset growth help businesses plan future procurement more accurately.",
  },
  {
    q: "Does the dashboard support multiple industries?",
    a: "Yes. It is used across industries such as manufacturing, healthcare, education, retail, warehousing, construction and corporate offices.",
  },
  {
    q: "Can I view asset categories on the dashboard?",
    a: "Yes. The asset categories widget breaks down assets by category and type for easier analysis.",
  },
  {
    q: "Does the dashboard update automatically?",
    a: "Yes. The dashboard updates automatically whenever an asset is added, assigned, moved or serviced.",
  },
  {
    q: "Can the dashboard help reduce asset downtime?",
    a: "Yes. Maintenance and warranty alerts help teams act in time and reduce unexpected downtime.",
  },
  {
    q: "How do I get started with the Asset Dashboard?",
    a: "You can book a free demo with the Altroz Asset Management team to see how the dashboard works for your business.",
  },
];

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

export default function BulkEmailAssetManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Asset Management Dashboard | Altroz Asset Management"
        description="Get complete visibility into your business assets with the Asset Dashboard in Altroz Asset Management. Monitor status, maintenance and performance in one place."
        canonicalPath={ROUTES.bulkEmailAssetManagement}
      />

      <AssetManagementNavbar />

      <main className="overflow-x-hidden">
        <section id="overview" className="hero-gradient relative overflow-hidden pt-10 pb-14 scroll-mt-24 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20">
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 top-10 h-72 w-72 rounded-full bg-success/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />

          <div className="site-container">
            <div className="mx-auto max-w-5xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-xs font-extrabold tracking-[0.22em] text-primary shadow-sm">
                <Package className="h-3.5 w-3.5" />
                Enterprise Asset Management Software
              </span>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Asset Management Dashboard - Monitor Every Business Asset from One Smart Screen
              </h1>
              <p className="mx-auto mt-5 max-w-4xl text-base leading-7 text-ink-soft sm:text-lg">
                Gain complete visibility into your asset operations and make faster business decisions.
                The Asset Dashboard inside Altroz Asset Management gives businesses one centralized
                screen to monitor, analyze and manage every asset they own.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Link to={ROUTES.bookDemo} className="btn-primary">
                  Book Free Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#features" className="btn-outline">
                  Explore Features
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {quickLinks.map((item) => (
                  <MaybeLink
                    key={item.label}
                    href={item.href}
                    className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-ink-soft shadow-sm transition hover:border-primary/30 hover:text-primary"
                  >
                    {item.label}
                  </MaybeLink>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
              <ScrollReveal variant="fade-up" className="text-center lg:text-left">
                <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-primary sm:text-3xl lg:mx-0">
                  Complete visibility for assets, maintenance, branches and departments
                </h2>
                <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg lg:mx-0">
                  Use a dashboard that keeps ownership, service status and distribution clear at a
                  glance. Instead of waiting on manual reports, managers can review live asset data,
                  compare locations and act on issues faster.
                </p>
                <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg lg:mx-0">
                  Whether you are tracking office equipment, field tools or specialized machinery, the
                  dashboard helps your team stay organized, reduce manual work and make more confident
                  decisions.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {heroMetrics.map((item) => (
                    <article key={item.label} className="soft-card flex h-full flex-col p-4 text-left">
                      <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                        {item.label}
                      </div>
                      <div className="mt-2 text-2xl font-black tracking-tight text-ink">{item.value}</div>
                    </article>
                  ))}
                </div>

                <div className="mt-7 rounded-[1.5rem] border border-primary/15 bg-gradient-to-br from-primary/6 via-white to-success/6 p-5 text-left">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    What this dashboard helps with
                  </div>
                  <BulletList
                    items={[
                      "Reduce loss with visible ownership",
                      "Cut manual follow-up during employee exits",
                      "Spot maintenance and warranty issues earlier",
                    ]}
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal variant="scale" className="relative self-start">
                <AssetDashboardMock />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="What Is an Asset Dashboard?"
              title="A centralized screen for asset status, location and maintenance condition"
              description="Instead of maintaining separate spreadsheets for each branch or department, businesses can see everything in real time from one easy-to-read view."
              center
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.03fr_0.97fr] lg:items-start">
              <ScrollReveal variant="fade-up" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Why this matters
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  Clarity helps businesses make faster, better decisions
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  As organisations grow and acquire more equipment, devices and machinery, it becomes
                  difficult to track where each asset is, who is using it and whether it needs
                  servicing. A dashboard solves that by organizing asset data logically and presenting
                  it visually.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    "Centralized dashboards improve visibility across branches.",
                    "Decision-makers can plan purchases with current data.",
                    "Maintenance needs are easier to spot in advance.",
                    "Teams spend less time asking for manual updates.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-white p-3 shadow-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                      <span className="text-sm leading-6 text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  How decision-makers benefit
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  The right data, at the right time, in one place
                </h3>
                <BulletList
                  items={[
                    "Business owners can compare asset distribution across locations.",
                    "Operations teams can plan procurement and allocation confidently.",
                    "Finance teams can approve maintenance and replacements with clarity.",
                    "Managers can review live status instead of outdated records.",
                  ]}
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="features" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Why Businesses Need It"
              title="A centralized dashboard solves the most common asset tracking problems"
              description="These benefits explain how the dashboard addresses the everyday challenges that grow with the business."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {needCards.map((card) => (
                <article key={card.title} className="soft-card flex h-full flex-col p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary shadow-sm">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                  <div className="mt-4 rounded-2xl bg-surface/70 p-3 text-sm font-medium text-ink">
                    {card.benefit}
                  </div>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Dashboard Widgets"
              title="Every widget gives one specific slice of asset information"
              description="Together, these widgets form a complete operational picture of the business."
              center
            />

            <StaggerReveal step={35} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {widgetCards.map((card) => (
                <article key={card.title} className="soft-card h-full p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-success/12 text-primary shadow-sm">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                  <div className="mt-4 rounded-2xl bg-white p-3 text-sm font-medium text-ink shadow-sm">
                    Business benefit: {card.benefit}
                  </div>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Dashboard Insights"
              title="Beyond current numbers, the dashboard highlights important usage patterns"
              description="Analytical insights help businesses understand how assets are used, maintained and distributed over time."
              center
            />

            <StaggerReveal step={35} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {insightCards.map((card) => (
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

        <section id="lifecycle" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="How the Dashboard Works"
              title="A simple workflow keeps asset information accurate and up to date"
              description="The dashboard follows a logical flow from asset creation to reporting and action."
              center
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {stepCards.map((item) => (
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
              eyebrow="Business Benefits"
              title="The dashboard improves visibility, speed and day-to-day control"
              description="These outcomes are the practical reasons teams adopt a centralized asset dashboard."
              center
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {benefitCards.map((item) => (
                <article key={item} className="soft-card h-full p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-success/12 text-primary shadow-sm">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{item}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">
                    This outcome follows naturally when the dashboard is used as the single source of truth.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Industry Use Cases"
              title="The dashboard is useful across many industries"
              description="Each industry has different asset-management needs, but the need for visibility and control is the same."
              center
            />

            <StaggerReveal step={35} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {industryCards.map((card) => (
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

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Dashboard Screens"
              title="These screen types show the dashboard in different useful views"
              description="Each screen helps a different kind of manager review the same asset data with the right emphasis."
              center
            />

            <StaggerReveal step={35} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {screenCards.map((card) => (
                <article key={card.title} className="soft-card h-full p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-success/12 text-primary shadow-sm">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                  <div className="mt-4 rounded-2xl bg-white p-3 text-sm font-medium text-ink shadow-sm">
                    Business value: {card.benefit}
                  </div>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="reports" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Asset Reports & Maintenance"
              title="Reporting tools that help teams stay accountable"
              description="The dashboard surfaces asset summary, history, maintenance and audit information without making teams hunt through spreadsheets."
              center
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <ScrollReveal variant="fade-up" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Report summary
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  Core reports are available from the dashboard itself
                </h3>
                <div className="mt-5 space-y-3">
                  {[
                    "Asset Summary gives a quick count of total, assigned, available and retired items.",
                    "Asset History keeps a record of issue, return, handover and maintenance activity.",
                    "Maintenance Report highlights the queue of items due for servicing or repair.",
                    "Audit Trail keeps change history visible for accountability and review.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-surface/45 p-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                      <span className="text-sm leading-6 text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    title: "Asset Summary",
                    description: "A simple count of total, assigned, available and retired items.",
                  },
                  {
                    title: "Asset History",
                    description: "A log for issue, return, handover and maintenance activity.",
                  },
                  {
                    title: "Maintenance Report",
                    description: "A queue of items due for servicing or already under repair.",
                  },
                  {
                    title: "Audit Trail",
                    description: "A record of changes that keeps the asset register audit friendly.",
                  },
                ].map((card) => (
                  <article key={card.title} className="soft-card flex h-full flex-col p-5">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-ink">{card.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink-soft">{card.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="Common questions about Altroz Asset Management"
              description="A concise answer set for the questions businesses ask most often."
              center
            />

            <div className="mx-auto mt-8 max-w-4xl">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item) => (
                  <AccordionItem key={item.q} value={item.q} className="soft-card px-5">
                    <AccordionTrigger className="py-5 text-left text-base font-semibold text-ink hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-7 text-ink-soft">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section id="cta" className="hero-gradient py-14 scroll-mt-24 sm:py-16 lg:py-20">
          <div className="site-container">
            <div className="rounded-[2rem] border border-border bg-white p-8 shadow-float md:p-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                    Next step
                  </div>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                    Take Control of Every Asset with One Powerful Dashboard
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-ink-soft">
                    Gain complete visibility into your assets, monitor maintenance, analyze
                    performance and make informed business decisions with the Asset Dashboard in Altroz
                    Asset Management.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Link to={ROUTES.bookDemo} className="btn-primary">
                    Book Free Demo
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
      </main>

      <Footer />
    </div>
  );
}
