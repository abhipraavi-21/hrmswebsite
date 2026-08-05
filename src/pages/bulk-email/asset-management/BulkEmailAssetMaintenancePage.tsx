"use client";

import type { ComponentType } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Factory,
  FileText,
  Laptop,
  Layers3,
  MapPinned,
  Package,
  Search,
  ShieldCheck,
  TrendingUp,
  Users,
  Wrench,
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
  { label: "Assets Under Maintenance", value: "146" },
  { label: "Pending Services", value: "312" },
  { label: "Warranty Expiring Soon", value: "84" },
  { label: "Completed This Month", value: "1,248" },
];

const quickLinks = [
  { label: "Asset Dashboard", href: ROUTES.bulkEmailAssetDashboard },
  { label: "Asset Management", href: ROUTES.bulkEmailAssetManagement },
  { label: "Asset Tracking", href: ROUTES.bulkEmailAssetTracking },
  { label: "QR Code Asset Management", href: ROUTES.bulkEmailAssetQrCode },
  { label: "Asset Reports", href: ROUTES.bulkEmailAssetReports },
  { label: "Pricing", href: ROUTES.pricing },
  { label: "Book Demo", href: ROUTES.bookDemo },
  { label: "About Us", href: ROUTES.about },
  { label: "Help Center", href: ROUTES.support },
  { label: "FAQs", href: ROUTES.faq },
  { label: "Contact Us", href: ROUTES.contact },
];

const challengeCards: CardData[] = [
  {
    title: "Missed Maintenance",
    description: "Manual tracking makes scheduled service dates easy to forget.",
    icon: CalendarDays,
  },
  {
    title: "Unexpected Downtime",
    description: "Assets are more likely to fail without warning when service is not planned.",
    icon: AlertTriangle,
  },
  {
    title: "Lost Service Records",
    description: "Paper logs and disconnected spreadsheets are easy to misplace.",
    icon: FileText,
  },
  {
    title: "Expired Warranties",
    description: "Businesses miss the chance to claim free repairs or replacements.",
    icon: ShieldCheck,
  },
  {
    title: "Manual Registers",
    description: "Paper or spreadsheet-based registers are slow to update and search.",
    icon: Layers3,
  },
  {
    title: "Unplanned Repairs",
    description: "Repairs happen only after a failure, which is usually more expensive.",
    icon: Wrench,
  },
  {
    title: "No Maintenance History",
    description: "Without a central record, repeated faults are difficult to spot.",
    icon: Clock3,
  },
  {
    title: "Poor Visibility",
    description: "Management does not get a real-time view of asset health across the business.",
    icon: BarChart3,
  },
];

const featureCards: CardData[] = [
  {
    title: "Maintenance Scheduling",
    description: "Plan maintenance activities for each asset in advance based on the frequency your business requires.",
    icon: CalendarDays,
    benefit: "Maintenance is less likely to be missed.",
  },
  {
    title: "Maintenance Records",
    description: "Maintain a complete centralized log of every maintenance activity performed on an asset.",
    icon: FileText,
    benefit: "Teams get one source of truth for history.",
  },
  {
    title: "Repair History",
    description: "Record every repair carried out on an asset and review how often attention was needed.",
    icon: Wrench,
    benefit: "Makes repair-versus-replace decisions easier.",
  },
  {
    title: "Warranty Tracking",
    description: "Store warranty coverage, vendor information and expiry dates in one place.",
    icon: ShieldCheck,
    benefit: "Helps teams claim support before expiry.",
  },
  {
    title: "Warranty Expiry Monitoring",
    description: "Keep visibility on upcoming warranty expiry dates across all registered assets.",
    icon: AlertTriangle,
    benefit: "Reduces the chance of missing a warranty window.",
  },
  {
    title: "Service Records",
    description: "Log every service activity performed on an asset along with relevant details.",
    icon: CheckCircle2,
    benefit: "Builds a reliable service history.",
  },
  {
    title: "Asset Status",
    description: "View whether assets are active, under maintenance or out of service.",
    icon: BarChart3,
    benefit: "Gives real-time operational visibility.",
  },
  {
    title: "Vendor Information",
    description: "Maintain vendor and service provider details linked to maintenance activity.",
    icon: Factory,
    benefit: "Makes it faster to reach the right vendor.",
  },
  {
    title: "Maintenance Reports",
    description: "Generate reports on maintenance activity, repair frequency and service history.",
    icon: FileText,
    benefit: "Supports better planning and management review.",
  },
  {
    title: "Maintenance Analytics",
    description: "Review maintenance trends and patterns to understand asset health across the organisation.",
    icon: TrendingUp,
    benefit: "Helps teams make data-backed decisions.",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Register Asset",
    description:
      "Add the asset into the system with its basic details, category and type.",
  },
  {
    step: "02",
    title: "Add Warranty & Purchase Details",
    description:
      "Record purchase information along with the vendor and warranty coverage period.",
  },
  {
    step: "03",
    title: "Create Maintenance Schedule",
    description:
      "Set up a maintenance schedule based on how often the asset needs service.",
  },
  {
    step: "04",
    title: "Perform Maintenance",
    description:
      "Carry out the scheduled maintenance activity and complete the planned inspection or repair.",
  },
  {
    step: "05",
    title: "Update Service & Repair Records",
    description:
      "Log the completed maintenance activity, along with any repairs carried out, into the system.",
  },
  {
    step: "06",
    title: "Review Maintenance History",
    description:
      "Check the complete maintenance and repair history whenever you need to make a decision.",
  },
  {
    step: "07",
    title: "Generate Reports",
    description:
      "Create maintenance reports to review activity across assets, branches and departments.",
  },
];

const benefitCards = [
  "Reduced Downtime",
  "Longer Asset Life",
  "Better Planning",
  "Improved Accountability",
  "Organised Service Records",
  "Simplified Warranty Tracking",
  "Lower Administrative Effort",
  "Improved Operational Efficiency",
];

const industryCards: CardData[] = [
  {
    title: "Manufacturing",
    description: "Schedule preventive maintenance for machinery and monitor downtime risk.",
    icon: Factory,
  },
  {
    title: "Healthcare",
    description: "Maintain service records for medical devices and track warranty status.",
    icon: Building2,
  },
  {
    title: "IT Companies",
    description: "Track maintenance history for servers, networking equipment and hardware assets.",
    icon: Laptop,
  },
  {
    title: "Educational Institutions",
    description: "Manage maintenance for lab equipment, computers, furniture and infrastructure.",
    icon: Users,
  },
  {
    title: "Retail",
    description: "Track maintenance for refrigeration units, POS systems and store fixtures.",
    icon: Package,
  },
  {
    title: "Warehouses",
    description: "Schedule service for forklifts, conveyors and handling equipment.",
    icon: Layers3,
  },
  {
    title: "Construction",
    description: "Track maintenance schedules and repair history for heavy equipment and machinery.",
    icon: Wrench,
  },
  {
    title: "Hospitality",
    description: "Manage maintenance for kitchen equipment, HVAC systems and infrastructure.",
    icon: Building2,
  },
  {
    title: "Corporate Offices",
    description: "Track maintenance for IT equipment, furniture and facility assets.",
    icon: Users,
  },
  {
    title: "Government Organizations",
    description: "Keep organized maintenance records for equipment and infrastructure across offices.",
    icon: ShieldCheck,
  },
];

const screenCards: CardData[] = [
  {
    title: "Maintenance Dashboard",
    description: "A central view showing upcoming maintenance, pending services and asset health.",
    icon: BarChart3,
    benefit: "Quick, real-time snapshot of maintenance status.",
  },
  {
    title: "Maintenance Schedule",
    description: "A calendar or list view of all scheduled maintenance activities.",
    icon: CalendarDays,
    benefit: "Helps teams plan ahead and avoid missed schedules.",
  },
  {
    title: "Repair History",
    description: "A detailed log of every repair carried out on an asset.",
    icon: Wrench,
    benefit: "Supports repair-versus-replace decisions.",
  },
  {
    title: "Warranty Details",
    description: "A record of warranty coverage, vendor information and expiry dates.",
    icon: ShieldCheck,
    benefit: "Makes warranty checks quick and simple.",
  },
  {
    title: "Service Records",
    description: "A complete history of service activities performed on each asset.",
    icon: FileText,
    benefit: "Provides a reliable audit trail for review.",
  },
  {
    title: "Maintenance Reports",
    description: "Reports summarising maintenance activity across assets, departments and branches.",
    icon: FileText,
    benefit: "Helps leadership review maintenance performance.",
  },
  {
    title: "Asset Details",
    description: "A single view showing asset category, type, status, assignment and maintenance history.",
    icon: Search,
    benefit: "Removes the need to check multiple registers.",
  },
  {
    title: "Maintenance Analytics",
    description: "Visual summaries of maintenance trends such as repair frequency and schedule adherence.",
    icon: TrendingUp,
    benefit: "Supports data-backed planning and staffing.",
  },
];

const whyChooseCards: CardData[] = [
  {
    title: "Easy Maintenance Scheduling",
    description: "Set up and manage maintenance schedules without manual registers or reminders.",
    icon: CalendarDays,
  },
  {
    title: "Complete Service History",
    description: "Every service and repair activity is recorded against the asset.",
    icon: FileText,
  },
  {
    title: "Warranty Tracking",
    description: "Keep warranty details and expiry dates organized in one place.",
    icon: ShieldCheck,
  },
  {
    title: "Maintenance Reports",
    description: "Generate reports across assets, branches and departments.",
    icon: BarChart3,
  },
  {
    title: "Asset Visibility",
    description: "Get a clear, real-time view of asset status and maintenance activity.",
    icon: Search,
  },
  {
    title: "Centralized Dashboard",
    description: "Manage maintenance, repairs, warranty and service records from one platform.",
    icon: Layers3,
  },
  {
    title: "Simple User Interface",
    description: "A clean interface designed for quick adoption by maintenance teams.",
    icon: Users,
  },
  {
    title: "Business Ready Platform",
    description: "Built to support businesses of different sizes and industries.",
    icon: Building2,
  },
];

const faqItems: Faq[] = [
  {
    q: "What is asset maintenance software?",
    a: "Asset maintenance software is a platform that helps businesses plan, schedule and record maintenance activities for their assets, including repairs, servicing and warranty tracking, from one centralised system.",
  },
  {
    q: "How does maintenance scheduling work in Altroz Asset Management?",
    a: "You can set up a maintenance schedule for each asset based on the frequency it requires. The system keeps the schedule organised so teams know what needs attention and when.",
  },
  {
    q: "Can I track repair history for my assets?",
    a: "Yes. Altroz Asset Management allows you to record and review the repair history of every asset, including details of past repairs.",
  },
  {
    q: "Can I manage warranty information for my assets?",
    a: "Yes. You can store warranty coverage details, vendor information and expiry dates for each asset in one place.",
  },
  {
    q: "Can I record service history for my assets?",
    a: "Yes. Every service activity performed on an asset can be logged, building a complete service record over time.",
  },
  {
    q: "Can I review maintenance records anytime?",
    a: "Yes. Maintenance records are stored centrally and can be reviewed whenever needed without searching through paper registers.",
  },
  {
    q: "How does organized maintenance improve asset life?",
    a: "Regular maintenance helps identify and address minor issues before they lead to bigger faults, which helps assets stay in working condition for longer.",
  },
  {
    q: "Can I generate maintenance reports?",
    a: "Yes. Altroz Asset Management allows you to generate reports on maintenance activity across assets, branches and departments.",
  },
  {
    q: "Who should use asset maintenance software?",
    a: "Any business that relies on physical assets, such as manufacturing units, healthcare facilities, educational institutions, retail businesses, warehouses and corporate offices, can benefit from organized asset maintenance.",
  },
  {
    q: "What is the difference between preventive and reactive maintenance?",
    a: "Preventive maintenance is planned in advance based on schedule or usage, while reactive maintenance happens only after an asset breaks down. Preventive maintenance generally helps reduce unplanned downtime.",
  },
  {
    q: "Can maintenance be tracked across multiple branches?",
    a: "Yes. The platform supports branch and department management, so maintenance activity can be tracked separately across different locations.",
  },
  {
    q: "Does the software send warranty expiry alerts?",
    a: "Yes. Altroz Asset Management provides warranty expiry monitoring so teams stay informed before warranty coverage ends.",
  },
  {
    q: "Can I see the current status of an asset?",
    a: "Yes. Each asset has a status field such as active, under maintenance or out of service, so teams can see its condition at a glance.",
  },
  {
    q: "Is vendor information linked to maintenance records?",
    a: "Yes. You can maintain vendor and service provider details connected to an asset's maintenance and repair activity.",
  },
  {
    q: "Can I categorize assets by type for maintenance purposes?",
    a: "Yes. Assets can be organised by category and type, making it easier to manage maintenance across similar equipment.",
  },
  {
    q: "Does the platform support search and filters for maintenance data?",
    a: "Yes. Search and filter options are available so teams can quickly find specific assets, schedules or maintenance records.",
  },
  {
    q: "Can maintenance data help with repair-versus-replace decisions?",
    a: "Yes. Reviewing an asset's full maintenance history makes it easier to judge whether continued repair or replacement is the better option.",
  },
  {
    q: "Is this software suitable for small businesses as well as large enterprises?",
    a: "Yes. Altroz Asset Management is designed to support businesses of different sizes, from SMEs to large enterprises managing assets across branches.",
  },
  {
    q: "Can I assign assets to specific employees or departments?",
    a: "Yes. Asset assignment features allow you to track which employee or department an asset is allocated to, alongside its maintenance information.",
  },
  {
    q: "How is maintenance data organized within the platform?",
    a: "Maintenance data is organised by asset, with linked information such as schedules, service records, repair history and warranty details available from the asset profile.",
  },
  {
    q: "Can I track purchase information along with maintenance data?",
    a: "Yes. Purchase information, including vendor and purchase details, can be recorded and linked to maintenance and warranty records.",
  },
  {
    q: "Does the platform provide analytics on maintenance trends?",
    a: "Yes. Maintenance analytics help you understand patterns such as how often assets need repair, supporting more informed planning.",
  },
  {
    q: "Can maintenance records support internal audits?",
    a: "Yes. Since every maintenance and service activity is documented and stored centrally, records can be reviewed easily during internal audits.",
  },
  {
    q: "How does centralized maintenance tracking reduce administrative work?",
    a: "Instead of updating multiple paper registers or spreadsheets, teams can manage all maintenance-related information from a single dashboard, which reduces duplicate effort.",
  },
  {
    q: "How do I get started with Altroz Asset Management?",
    a: "You can book a free demo with our team to see how the Asset Maintenance module works and how it can be set up for your organisation's assets.",
  },
];

function MaintenanceDashboardMock() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="dashboard-glow left-1/2 top-10 -translate-x-1/2" />
      <div className="soft-card relative overflow-hidden rounded-[2rem] border border-border bg-white/95 p-5 shadow-float">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-success/12 text-primary shadow-sm">
            <CalendarDays className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
              Maintenance Dashboard
            </div>
            <div className="mt-1 text-lg font-semibold text-ink">
              Schedule, service and warranty status at a glance
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
                ["Assets Under Maintenance", "146"],
                ["Pending Services", "312"],
                ["Warranty Expiring Soon", "84"],
                ["Completed This Month", "1,248"],
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
                    Upcoming schedule
                  </div>
                  <h3 className="mt-1 text-base font-semibold text-ink">
                    Preventive maintenance and service alerts
                  </h3>
                </div>
                <Clock3 className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-4 grid gap-2">
                {[
                  "Warehouse forklift - service due",
                  "Printer fleet - warranty review",
                  "Office HVAC - inspection scheduled",
                  "IT servers - maintenance due soon",
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

export default function BulkEmailAssetMaintenancePage() {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Asset Maintenance Software | Altroz Asset Management"
        description="Manage preventive maintenance, repair history, warranty tracking and service records from one platform. Reduce downtime with Altroz Asset Management."
        canonicalPath={ROUTES.bulkEmailAssetMaintenance}
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
                <Wrench className="h-3.5 w-3.5" />
                Asset Maintenance Module
              </span>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Keep Every Business Asset Operating at Its Best
              </h1>
              <p className="mx-auto mt-5 max-w-4xl text-base leading-7 text-ink-soft sm:text-lg">
                Manage maintenance, repairs, warranty and service records from one platform. Altroz Asset
                Management helps businesses organize preventive maintenance, track repair and service
                history, monitor warranty status and keep every asset audit-ready.
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
                  <Link
                    key={item.label}
                    to={item.href}
                    className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-ink-soft shadow-sm transition hover:border-primary/30 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
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
                  One dashboard keeps service, warranty and repair history in view
                </h2>
                <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg lg:mx-0">
                  Instead of scattered registers and spreadsheets, maintenance teams get one centralized
                  dashboard to plan, execute and review maintenance activity across branches and departments.
                </p>
                <div className="mt-7 rounded-[1.5rem] border border-primary/15 bg-gradient-to-br from-primary/6 via-white to-success/6 p-5 text-left">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Maintenance focus
                  </div>
                  <BulletList
                    items={[
                      "Plan preventive maintenance before faults occur",
                      "Track warranty and service records centrally",
                      "Reduce the risk of downtime and disruption",
                    ]}
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal variant="scale" className="relative self-start">
                <MaintenanceDashboardMock />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="What is Asset Maintenance?"
              title="Maintenance keeps physical assets reliable throughout their useful life"
              description="Asset maintenance is the ongoing process of inspecting, servicing and repairing business assets so they continue to function reliably."
              center
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
              <ScrollReveal variant="fade-up" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Understanding the concept
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  Routine servicing helps prevent failures before they interrupt work
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  Asset maintenance is the ongoing process of inspecting, servicing and repairing business
                  assets such as machinery, IT equipment, vehicles, furniture and facility infrastructure
                  so they continue to function reliably throughout their useful life.
                </p>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  For organisations that depend on physical assets to run daily operations, maintenance is
                  not optional. An asset that is not maintained on schedule is more likely to break down,
                  disrupt operations and shorten its useful life.
                </p>
                <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Why maintenance matters
                  </div>
                  <BulletList
                    items={[
                      "Well-maintained assets perform more consistently and fail less often.",
                      "Organised maintenance gives businesses better visibility into asset condition.",
                      "Teams can plan replacements and budgets with more confidence.",
                      "Service records support audits, vendors and insurance claims.",
                    ]}
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Reactive vs Preventive
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  Preventive maintenance is easier to plan than emergency repairs
                </h3>
                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                      Reactive Maintenance
                    </div>
                    <p className="mt-2 text-sm leading-7 text-ink-soft">
                      Repairs happen only after an asset breaks down or stops working, which is often
                      costlier and causes unplanned downtime.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-success">
                      Preventive Maintenance
                    </div>
                    <p className="mt-2 text-sm leading-7 text-ink-soft">
                      Maintenance is scheduled in advance so assets are inspected and serviced before
                      faults occur, reducing the chance of sudden failure.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Challenges Without Software"
              title="Manual maintenance tracking creates recurring operational problems"
              description="These are the issues teams commonly face when maintenance is managed through paper or separate spreadsheets."
              center
            />

            <StaggerReveal step={40} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {challengeCards.map((card) => (
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

        <section id="features" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Core Maintenance Features"
              title="The platform includes the maintenance tools teams need every day"
              description="Each feature supports a specific part of preventive maintenance, service history or warranty control."
              center
            />

            <StaggerReveal step={35} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {featureCards.map((card) => (
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
              eyebrow="How Asset Maintenance Works"
              title="A simple workflow keeps maintenance activity organised from start to finish"
              description="The maintenance process stays structured from asset registration to final reporting."
              center
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {workflowSteps.map((item) => (
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

        <section className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Business Benefits"
              title="Organized maintenance improves uptime, planning and accountability"
              description="These outcomes are the practical reasons teams adopt a centralized maintenance platform."
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
                    This outcome follows naturally when maintenance is recorded centrally and reviewed regularly.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Industry Use Cases"
              title="Asset maintenance supports businesses across many industries"
              description="Each industry has different service needs, but the need for reliability is the same."
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

        <section className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Maintenance Screens"
              title="The screen set covers scheduling, history, reports and asset status"
              description="Each screen below represents a real part of the maintenance workflow."
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

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Why Choose Altroz Asset Management?"
              title="The platform is built for maintenance teams that need control and clarity"
              description="These strengths make the system practical for businesses that want to reduce downtime and keep records organized."
              center
            />

            <StaggerReveal step={35} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {whyChooseCards.map((card) => (
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

        <section id="faq" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="Common questions about asset maintenance software"
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
                    Keep Your Business Assets Running Efficiently
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-ink-soft">
                    Plan maintenance, record repairs, monitor warranties and maintain complete service
                    history with Altroz Asset Management. Reduce downtime and improve operational
                    efficiency through organized asset maintenance.
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
      </PageShell>

      <Footer />
    </div>
  );
}
