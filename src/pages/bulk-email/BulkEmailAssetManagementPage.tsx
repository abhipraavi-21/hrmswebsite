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
  { label: "Total Assets", value: "12,480" },
  { label: "Assigned Assets", value: "9,824" },
  { label: "Under Maintenance", value: "146" },
  { label: "Warranty Renewals", value: "312" },
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

const lifecycleSteps: Step[] = [
  {
    step: "01",
    title: "Asset Purchase",
    description: "Record the vendor, cost and purchase date so every asset starts with an accurate foundation.",
  },
  {
    step: "02",
    title: "Asset Registration",
    description: "Enter the asset with category, type, images and documents to create a single source of truth.",
  },
  {
    step: "03",
    title: "Asset Assignment",
    description: "Assign the asset to an employee, department or branch with a clear ownership trail.",
  },
  {
    step: "04",
    title: "Daily Usage",
    description: "Monitor how the asset is used in day-to-day operations and keep the status visible.",
  },
  {
    step: "05",
    title: "Maintenance",
    description: "Log servicing, inspections and repairs so the asset stays reliable for longer.",
  },
  {
    step: "06",
    title: "Transfer",
    description: "Move assets between employees, departments or branches while preserving the handover record.",
  },
  {
    step: "07",
    title: "Warranty Tracking",
    description: "Keep warranty periods visible so claims and replacements happen on time.",
  },
  {
    step: "08",
    title: "Reporting",
    description: "Use asset reports to support audits, budgeting and management decisions.",
  },
  {
    step: "09",
    title: "Retirement or Disposal",
    description: "Formally retire or dispose of assets once they reach the end of their useful life.",
  },
];

const needCards: CardData[] = [
  {
    title: "Centralized Asset Inventory",
    description: "Store all asset records in one secure, searchable system instead of scattered spreadsheets.",
    icon: Package,
    benefit: "All asset data lives in one consistent register.",
  },
  {
    title: "Better Asset Visibility",
    description: "See what assets exist, where they are and who holds them without asking multiple teams.",
    icon: TrendingUp,
    benefit: "Management gets a live operational picture.",
  },
  {
    title: "Reduced Asset Loss",
    description: "Clear ownership records make it far less likely that assets go missing or stay forgotten.",
    icon: AlertTriangle,
    benefit: "Lost or untracked assets become easier to prevent.",
  },
  {
    title: "Improved Accountability",
    description: "Link every asset to a responsible employee or department for better care and return.",
    icon: ClipboardList,
    benefit: "Ownership stays visible at all times.",
  },
  {
    title: "Organised Asset Records",
    description: "Replace inconsistent spreadsheets with categorised, well-documented records.",
    icon: FileText,
    benefit: "Teams can review structured records quickly.",
  },
  {
    title: "Faster Asset Search",
    description: "Use search, filters or QR codes to locate any asset in seconds.",
    icon: Search,
    benefit: "Manual register checks are no longer required.",
  },
  {
    title: "Simplified Audits",
    description: "Digital records and QR verification make physical asset counts faster and more accurate.",
    icon: BarChart3,
    benefit: "Audits become easier to complete and review.",
  },
  {
    title: "Business Growth Support",
    description: "Scale asset management smoothly as branches, categories and inventory continue to grow.",
    icon: Building2,
    benefit: "The system grows with the business.",
  },
];

const widgetCards: CardData[] = [
  {
    title: "Asset Registration",
    description: "Register every asset with full details including name, category, type, purchase date and cost.",
    icon: Package,
    benefit: "Creates a single, accurate source of truth.",
  },
  {
    title: "Asset Categories & Types",
    description: "Organise assets into logical groups such as IT Equipment, Machinery, Furniture or Vehicles.",
    icon: Layers3,
    benefit: "Assets stay easy to search, filter and report on.",
  },
  {
    title: "Asset Assignment & Ownership",
    description: "Assign assets to employees, departments or branches and maintain a clear ownership record.",
    icon: Users,
    benefit: "Responsibility remains visible from issue to return.",
  },
  {
    title: "Branch Management",
    description: "Manage assets separately across multiple business locations from one central platform.",
    icon: MapPinned,
    benefit: "Multi-location businesses get branch-level clarity.",
  },
  {
    title: "Department Management",
    description: "Organise assets by department such as Finance, HR, IT or Operations.",
    icon: Building2,
    benefit: "Departments can review their own resources clearly.",
  },
  {
    title: "Vendor & Manufacturer Details",
    description: "Record vendor and manufacturer information against each asset for easy follow-up.",
    icon: Factory,
    benefit: "Warranty claims and reordering become simpler.",
  },
  {
    title: "Purchase Information",
    description: "Capture purchase date, cost, invoice reference and related procurement details.",
    icon: FileText,
    benefit: "Financial reporting and depreciation stay aligned.",
  },
  {
    title: "Asset Images",
    description: "Attach clear photographs to each asset record for easier physical identification.",
    icon: Laptop,
    benefit: "Verification during handover becomes faster.",
  },
  {
    title: "Documents",
    description: "Upload invoices, warranty cards, manuals and other asset documents in one place.",
    icon: FileText,
    benefit: "Supporting paperwork stays organized and accessible.",
  },
  {
    title: "Status Tracking",
    description: "Track whether an asset is active, assigned, under maintenance or retired.",
    icon: Clock3,
    benefit: "Teams always know the current condition of each item.",
  },
  {
    title: "Asset History",
    description: "Maintain a timeline of assignments, transfers and maintenance events for every asset.",
    icon: ShieldCheck,
    benefit: "Audits get a complete and reliable history.",
  },
  {
    title: "QR Code Integration",
    description: "Generate and print QR codes for physical assets, including bulk QR generation.",
    icon: Search,
    benefit: "Instant lookup is possible with a quick scan.",
  },
];

const stepCards: Step[] = [
  {
    step: "01",
    title: "Register Asset",
    description: "Add the asset to the system with category, type, images, documents and purchase details.",
  },
  {
    step: "02",
    title: "Assign Category",
    description: "Place the asset under the correct category and type so it fits naturally into the organisation.",
  },
  {
    step: "03",
    title: "Attach QR Code",
    description: "Generate and print a QR code so the asset can be identified and verified instantly.",
  },
  {
    step: "04",
    title: "Assign Employee or Department",
    description: "Allocate the asset to the employee, department or branch responsible for it.",
  },
  {
    step: "05",
    title: "Monitor Asset Status",
    description: "Track whether the asset is active, in use, under maintenance or retired at any given time.",
  },
  {
    step: "06",
    title: "Track Maintenance",
    description: "Log repairs, servicing and warranty details so the asset stays in good working condition.",
  },
  {
    step: "07",
    title: "Generate Reports",
    description: "Produce reports on inventory, assignments and maintenance for management and audits.",
  },
];

const benefitCards = [
  "Improved Productivity",
  "Better Decision Making",
  "Reduced Manual Work",
  "Complete Asset Visibility",
  "Improved Compliance",
  "Lower Administrative Effort",
  "Organised Documentation",
  "Scalable Operations",
];

const industryCards: CardData[] = [
  {
    title: "Manufacturing",
    description: "Track machinery, tools and equipment across production units and reduce downtime from untracked repairs.",
    icon: Factory,
  },
  {
    title: "Healthcare",
    description: "Maintain accurate records of medical equipment, monitor maintenance and warranty status, and keep critical devices accounted for.",
    icon: Building2,
  },
  {
    title: "Education",
    description: "Manage IT equipment, lab instruments, furniture and library assets across campuses and classrooms.",
    icon: Users,
  },
  {
    title: "IT Companies",
    description: "Track laptops, servers, networking equipment and peripherals assigned to employees and projects.",
    icon: Laptop,
  },
  {
    title: "Retail",
    description: "Monitor store equipment, POS devices, fixtures and fittings across multiple outlets.",
    icon: Package,
  },
  {
    title: "Warehousing",
    description: "Keep visibility over handling equipment, racks, vehicles and tools used across warehouse operations.",
    icon: Layers3,
  },
  {
    title: "Construction",
    description: "Track tools, heavy equipment and machinery as they move between project sites.",
    icon: Wrench,
  },
  {
    title: "Hospitality",
    description: "Manage furniture, kitchen equipment, electronics and maintenance schedules across hotel or restaurant properties.",
    icon: Building2,
  },
  {
    title: "Government Organisations",
    description: "Maintain transparent, auditable asset registers across departments and offices in line with compliance requirements.",
    icon: ShieldCheck,
  },
];

const screenCards: CardData[] = [
  {
    title: "Asset List",
    description: "A consolidated view of all registered assets with filters for category, status, branch and department.",
    icon: BarChart3,
    benefit: "Find and review any asset in seconds.",
  },
  {
    title: "Asset Details",
    description: "A detailed record for each asset including images, documents, purchase information and history.",
    icon: FileText,
    benefit: "One screen shows the full asset context.",
  },
  {
    title: "Asset Registration",
    description: "A guided form for adding new assets with category, type and purchase details.",
    icon: Package,
    benefit: "Ensures every asset is entered consistently.",
  },
  {
    title: "QR Code Screen",
    description: "A screen for generating, printing and managing QR codes, including bulk generation.",
    icon: Search,
    benefit: "Assets can be identified instantly by scan.",
  },
  {
    title: "Asset Assignment",
    description: "A screen to assign or reassign assets to employees, departments or branches.",
    icon: Users,
    benefit: "Ownership records stay accurate as assets move.",
  },
  {
    title: "Maintenance Records",
    description: "A log of all maintenance and repair activities carried out on an asset.",
    icon: Wrench,
    benefit: "Teams can plan servicing proactively.",
  },
  {
    title: "Branch Management",
    description: "A view to manage and compare asset data across multiple business locations.",
    icon: MapPinned,
    benefit: "Multi-branch businesses get a central picture.",
  },
  {
    title: "Department Management",
    description: "A screen to organise and monitor assets by department.",
    icon: ClipboardList,
    benefit: "Department heads can manage their own resources effectively.",
  },
  {
    title: "Reports",
    description: "Configurable reports covering inventory, assignments, maintenance and status.",
    icon: BarChart3,
    benefit: "Management gets the data needed for planning and audits.",
  },
];

const faqItems: Faq[] = [
  {
    q: "What is asset management software?",
    a: "Asset management software is a digital platform that helps businesses register, organise, assign, track and maintain their physical assets throughout their lifecycle, replacing manual spreadsheets and registers with a centralised, searchable system.",
  },
  {
    q: "How does asset management work?",
    a: "It works by recording each asset with its details, assigning it to an owner such as an employee, department or branch, tracking its status and maintenance over time, and generating reports that give management complete visibility into asset usage and condition.",
  },
  {
    q: "Can I manage assets across multiple branches?",
    a: "Yes. Altroz Asset Management includes branch management, allowing businesses to organise and monitor assets separately for each location while still viewing consolidated data from one central dashboard.",
  },
  {
    q: "Can I assign assets to employees?",
    a: "Yes. Assets can be assigned to individual employees, departments or branches, and the system maintains a clear record of current and past ownership.",
  },
  {
    q: "Can I upload documents against an asset?",
    a: "Yes. Invoices, warranty cards, manuals and other supporting documents can be uploaded and stored alongside each asset record for easy reference.",
  },
  {
    q: "Can I attach QR codes to assets?",
    a: "Yes. The platform supports QR code generation, bulk QR generation and QR printing, allowing assets to be identified and verified instantly by scanning.",
  },
  {
    q: "Can I manage maintenance for my assets?",
    a: "Yes. Maintenance tracking allows businesses to log servicing, repairs and inspection history for every asset, helping teams stay ahead of potential breakdowns.",
  },
  {
    q: "Can I track warranties?",
    a: "Yes. Warranty tracking helps businesses monitor warranty periods so that repairs or replacements can be claimed within the valid timeframe.",
  },
  {
    q: "Can I generate reports on my assets?",
    a: "Yes. The platform provides reports and a dashboard covering asset inventory, assignments, status and maintenance, supporting audits and management decision-making.",
  },
  {
    q: "Who should use asset management software?",
    a: "Any organisation that owns physical assets, including manufacturing units, healthcare facilities, educational institutions, IT companies, retail chains, warehouses, construction firms and government offices, can benefit from structured asset management.",
  },
  {
    q: "What types of assets can be managed on the platform?",
    a: "Businesses can manage a wide range of physical assets including IT equipment, machinery, furniture, vehicles, tools and other fixed assets, organised by category and type.",
  },
  {
    q: "Is Altroz Asset Management suitable for small businesses as well as large enterprises?",
    a: "Yes. The platform is designed to scale, so small and medium businesses can start with simple asset tracking, while larger enterprises can manage assets across multiple branches and departments.",
  },
  {
    q: "How is this different from maintaining assets in Excel?",
    a: "Unlike spreadsheets, which are prone to outdated entries and version confusion, Altroz Asset Management provides a live, centralised system with real-time updates, QR-based verification and structured reporting.",
  },
  {
    q: "Can departments track their own assets separately?",
    a: "Yes. Department management allows each department to view and manage the assets assigned to it, while management retains an organisation-wide view.",
  },
  {
    q: "Does the platform support bulk import of existing asset data?",
    a: "Yes. Bulk import allows businesses to migrate their existing asset records into the platform without registering each asset manually one by one.",
  },
  {
    q: "Can I see the complete history of an asset?",
    a: "Yes. Each asset maintains a history of its assignments, transfers and maintenance events, giving a complete and auditable timeline.",
  },
  {
    q: "What happens when an asset is transferred between employees or branches?",
    a: "The system records asset transfers and handovers, updating ownership while preserving the previous assignment history for accountability.",
  },
  {
    q: "Can I track the current status of an asset?",
    a: "Yes. Asset status tracking shows whether an asset is active, assigned, under maintenance or retired, giving real-time visibility into its condition and availability.",
  },
  {
    q: "Does the platform help during audits?",
    a: "Yes. Centralised, categorised records combined with QR-based physical verification make asset audits faster, more accurate and less disruptive to daily operations.",
  },
  {
    q: "Can I attach images to an asset record?",
    a: "Yes. Asset images can be attached to each record, helping teams visually identify and verify assets during checks or handovers.",
  },
  {
    q: "How does asset management help reduce costs?",
    a: "By preventing duplicate purchases, avoiding missed warranty claims and enabling timely maintenance, businesses can reduce unnecessary spending and extend the useful life of existing assets.",
  },
  {
    q: "Can I record vendor and manufacturer details for an asset?",
    a: "Yes. Vendor and manufacturer information can be recorded against each asset, which is useful for reordering, warranty claims and vendor evaluation.",
  },
  {
    q: "Is asset management only for IT equipment?",
    a: "No. Asset management covers all types of physical business assets, including machinery, furniture, tools and vehicles, not just IT equipment.",
  },
  {
    q: "How does depreciation tracking work?",
    a: "Depreciation tracking uses purchase information such as cost and purchase date to help businesses monitor the reducing value of an asset over its useful life for financial reporting purposes.",
  },
  {
    q: "How do I get started with Altroz Asset Management?",
    a: "You can book a free demo with the Altroz Technologies team, who will walk you through the platform and help you understand how it fits your organisation's asset management needs.",
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
        title="Asset Management Software | Altroz Asset Management"
        description="Register, assign, track and maintain business assets from one platform. Altroz Asset Management gives complete visibility across branches and departments."
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
                Asset Management Software to Track, Organise and Monitor Every Business Asset
              </h1>
              <p className="mx-auto mt-5 max-w-4xl text-base leading-7 text-ink-soft sm:text-lg">
                Manage every business asset from one centralised platform. Altroz Asset Management helps
                businesses register, organise, assign, monitor and maintain physical assets across
                branches and departments with accurate, real-time data.
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
                  platform helps your team stay organised, reduce manual work and make more confident
                  decisions.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
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
                    What this platform helps with
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
              eyebrow="What is Asset Management?"
              title="Understanding the process behind better visibility and control"
              description="Asset management helps businesses register, organise, assign, monitor and maintain physical assets throughout their useful life."
              center
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
              <ScrollReveal variant="fade-up" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Understanding Asset Management
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  A structured way to track the physical assets your business owns
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  Asset management is the structured process of registering, organising, tracking and
                  maintaining the physical assets a business owns, such as laptops, machinery, tools,
                  furniture, vehicles and equipment, throughout their working life.
                </p>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  It ensures every asset is accounted for, correctly assigned, properly maintained and
                  easy to locate whenever it is needed.
                </p>

                <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Common challenges with manual tracking
                  </div>
                  <div className="mt-3">
                    <BulletList
                      items={[
                        "Outdated records kept in scattered spreadsheets that are rarely updated on time.",
                        "Unclear ownership with no clear record of which employee or department holds an asset.",
                        "Duplicate purchases when one branch already has assets another branch needs.",
                        "Missed maintenance because warranty and service dates are not tracked well.",
                        "Difficult audits when physical verification becomes time-consuming and error-prone.",
                      ]}
                    />
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Cloud-Based Visibility
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  One central system improves visibility, accountability and efficiency
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  A cloud-based asset management platform like Altroz Asset Management centralises all
                  asset information in one place. Every asset is registered once, categorised correctly
                  and made searchable across branches and departments.
                </p>
                <BulletList
                  items={[
                    "Teams can see asset status, assignment history, maintenance records and documents instantly.",
                    "Management no longer depends on outdated spreadsheets or manual follow-ups.",
                    "The platform improves accountability and reduces the risk of asset loss.",
                    "Real-time visibility makes it easier to understand how organisational resources are used.",
                  ]}
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="lifecycle" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Complete Asset Lifecycle"
              title="Every business asset moves through a defined lifecycle"
              description="Understanding the lifecycle helps businesses plan better, control costs and extend the useful life of their assets."
              center
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {lifecycleSteps.map((item) => (
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

        <section id="features" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Core Asset Management Features"
              title="The platform includes the practical tools teams use every day"
              description="Every feature below is part of the Altroz Asset Management module and is organised to mirror the way teams actually work."
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
              eyebrow="Why Businesses Need Asset Management Software"
              title="The most common asset tracking problems all point back to visibility"
              description="These outcomes explain why businesses move away from spreadsheets and choose a centralized system."
              center
            />

            <StaggerReveal step={35} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {needCards.map((card) => (
                <article key={card.title} className="soft-card h-full p-5">
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
              eyebrow="How Altroz Asset Management Works"
              title="A simple workflow keeps asset information accurate and up to date"
              description="From registration to reporting, the system follows a clear sequence that keeps every change visible."
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
              title="The platform improves visibility, speed and day-to-day control"
              description="These outcomes are the practical reasons teams adopt a centralized asset platform."
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
              eyebrow="Industry Solutions"
              title="The platform is useful across many industries"
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
              eyebrow="Asset Screens"
              title="The screen set covers registration, tracking, maintenance and reporting"
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
                    Take Complete Control of Your Business Assets
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-ink-soft">
                    Manage your organisation's assets from procurement to retirement using one
                    centralised platform. Improve visibility, simplify operations and make informed
                    decisions with Altroz Asset Management.
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
