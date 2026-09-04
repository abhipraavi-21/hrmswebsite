"use client";

import type { ComponentType, ReactNode } from "react";
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
import { PageShell, SectionHeading } from "./asset-management/shared";

type CardData = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  benefit?: string;
};

type StepData = {
  step: string;
  title: string;
  description: string;
};

type FaqData = {
  q: string;
  a: string;
};

const heroMetrics = [
  { label: "Manufacturing Assets", value: "18,420" },
  { label: "Departments Covered", value: "42" },
  { label: "Assets Under Maintenance", value: "146" },
  { label: "Warranty Expiring Soon", value: "84" },
];

const quickLinks = [
  { label: "Asset Dashboard", href: ROUTES.bulkEmailAssetDashboard },
  { label: "Asset Tracking", href: ROUTES.bulkEmailAssetTracking },
  { label: "QR Code Asset Management", href: ROUTES.bulkEmailAssetQrCode },
  { label: "Asset Maintenance", href: ROUTES.bulkEmailAssetMaintenance },
  { label: "Asset Reports", href: ROUTES.bulkEmailAssetReports },
  { label: "Pricing", href: ROUTES.assetManagementPricing },
  { label: "Book Demo", href: ROUTES.assetManagementBookDemo },
  { label: "About Us", href: ROUTES.bulkEmailAbout },
  { label: "Help Center", href: ROUTES.support },
  { label: "FAQs", href: ROUTES.assetManagementFaq },
  { label: "Contact Us", href: ROUTES.assetManagementContact },
];

const introBullets = [
  "Track CNC machines, forklifts, tools, safety equipment and factory assets from one place.",
  "Tag assets with QR Codes for quick shop-floor identification and verification.",
  "Manage department assignment, maintenance, warranty, vendor and purchase records centrally.",
];

const overviewBullets = [
  "Manufacturing plants often own hundreds of assets spread across production, quality, maintenance and warehouse functions.",
  "Paper registers and spreadsheets are hard to update and difficult to search during maintenance planning or audits.",
  "A centralized system gives plant managers, maintenance teams and auditors one reliable source of truth.",
];

const challengeCards: CardData[] = [
  {
    title: "Lost Equipment",
    description: "Small tools, dies and portable equipment go missing when there is no clear usage record.",
    icon: AlertTriangle,
  },
  {
    title: "Unknown Asset Ownership",
    description: "When assets move between departments, it becomes hard to know who is responsible right now.",
    icon: Users,
  },
  {
    title: "Missing Warranty Records",
    description: "Warranty documents are often scattered across files and emails, making claims harder to manage.",
    icon: ShieldCheck,
  },
  {
    title: "Maintenance Delays",
    description: "Without a central log, service intervals are missed and production stoppages happen more often.",
    icon: Wrench,
  },
  {
    title: "Manual Registers",
    description: "Physical notebooks and spreadsheets are slow to update and hard to search in urgent situations.",
    icon: FileText,
  },
  {
    title: "Asset Misallocation",
    description: "Departments sometimes buy duplicate equipment because they cannot see what is already available.",
    icon: ClipboardList,
  },
  {
    title: "Equipment Downtime",
    description: "When repair history is fragmented, diagnosing a machine issue takes longer than it should.",
    icon: Clock3,
  },
  {
    title: "Poor Factory Visibility",
    description: "Leaders lack one live view of all assets across machines, tools, safety and warehouse equipment.",
    icon: BarChart3,
  },
];

const capabilityCards: CardData[] = [
  {
    title: "Centralized Factory Asset Register",
    description:
      "Create one digital record for each machine, tool and piece of equipment with category, type and purchase details.",
    icon: ClipboardList,
    benefit: "Teams stop relying on scattered registers and spreadsheets.",
  },
  {
    title: "QR Code Equipment Identification",
    description:
      "Generate and print unique QR Codes so equipment can be identified instantly on the shop floor.",
    icon: Search,
    benefit: "Operators and maintenance staff can open the correct profile in seconds.",
  },
  {
    title: "Equipment Assignment",
    description:
      "Assign assets to specific employees or departments and keep the ownership trail clear as equipment moves.",
    icon: Users,
    benefit: "Accountability becomes much easier to maintain.",
  },
  {
    title: "Department-wise Assets",
    description:
      "Organize equipment by production, quality, maintenance or warehouse teams for better visibility.",
    icon: Building2,
    benefit: "Plant managers can see which equipment belongs where.",
  },
  {
    title: "Plant-wise Asset Visibility",
    description:
      "Track assets across branches or factories from a single dashboard for a consolidated view.",
    icon: MapPinned,
    benefit: "Leadership can review all locations without switching systems.",
  },
  {
    title: "Maintenance Records",
    description:
      "Log every service, inspection and repair against the asset to build a reliable maintenance history.",
    icon: Wrench,
    benefit: "Future servicing can be planned more effectively.",
  },
  {
    title: "Warranty Tracking",
    description:
      "Store warranty details directly with the asset record so coverage status is always visible.",
    icon: ShieldCheck,
    benefit: "Teams can confirm coverage before approving repairs.",
  },
  {
    title: "Purchase Records",
    description:
      "Keep purchase date, cost and related documentation attached to the asset for budgeting and planning.",
    icon: FileText,
    benefit: "Finance and procurement teams get accurate records.",
  },
  {
    title: "Vendor Management",
    description:
      "Store vendor information alongside each asset so the right supplier is always easy to find.",
    icon: Factory,
    benefit: "Repair and warranty coordination becomes faster.",
  },
  {
    title: "Reports Dashboard",
    description:
      "Use reports and analytics to review equipment status, assignments and maintenance activity across the plant.",
    icon: BarChart3,
    benefit: "Audits and management reviews become easier to complete.",
  },
];

const lifecycleSteps: StepData[] = [
  {
    step: "01",
    title: "Purchase Equipment",
    description: "The factory procures a machine, tool or piece of equipment with vendor and warranty details.",
  },
  {
    step: "02",
    title: "Register Asset",
    description: "The asset is entered with category, type, specifications and purchase information.",
  },
  {
    step: "03",
    title: "Generate QR Code",
    description: "A unique QR Code is printed so the asset can be identified instantly on the shop floor.",
  },
  {
    step: "04",
    title: "Assign Department",
    description: "The asset is assigned to the correct department or branch for clear ownership.",
  },
  {
    step: "05",
    title: "Production Usage",
    description: "The equipment enters daily production, packaging, quality or warehouse operations.",
  },
  {
    step: "06",
    title: "Maintenance",
    description: "Scheduled and unscheduled maintenance events are logged for the asset.",
  },
  {
    step: "07",
    title: "Repair History",
    description: "Repairs, part replacements and breakdown resolutions are stored as part of the asset record.",
  },
  {
    step: "08",
    title: "Warranty Tracking",
    description: "Warranty status remains visible throughout the asset life so coverage can be used on time.",
  },
  {
    step: "09",
    title: "Asset Reports",
    description: "Reports help teams review cost, maintenance activity and lifecycle planning data.",
  },
  {
    step: "10",
    title: "Replacement / Disposal",
    description: "When the asset reaches end of life, its full history supports replacement or disposal decisions.",
  },
];

const benefitCards = [
  "Better Factory Visibility",
  "Reduced Asset Loss",
  "Organized Equipment Records",
  "Simplified Audits",
  "Improved Maintenance Planning",
  "Quick Equipment Identification",
  "Centralized Asset Information",
  "Higher Operational Efficiency",
];

const industryCards: CardData[] = [
  {
    title: "Manufacturing",
    description: "Track machinery, tools and production equipment across plant floors and shifts.",
    icon: Factory,
  },
  {
    title: "Healthcare",
    description: "Maintain accurate records of medical equipment, maintenance and warranty status.",
    icon: Building2,
  },
  {
    title: "Education",
    description: "Manage lab instruments, IT equipment, furniture and library assets across campuses.",
    icon: Users,
  },
  {
    title: "IT Companies",
    description: "Track laptops, servers, networking equipment and peripherals assigned to employees.",
    icon: Laptop,
  },
  {
    title: "Retail",
    description: "Monitor store fixtures, POS devices and other outlet equipment across locations.",
    icon: Package,
  },
  {
    title: "Warehousing",
    description: "Keep visibility over handling equipment, racks and tools used in dispatch operations.",
    icon: Layers3,
  },
  {
    title: "Construction",
    description: "Track tools, heavy equipment and machinery as they move between sites.",
    icon: Wrench,
  },
  {
    title: "Hospitality",
    description: "Manage furniture, kitchen equipment and electronics across properties.",
    icon: Building2,
  },
  {
    title: "Government Organisations",
    description: "Maintain auditable asset registers across offices and departments.",
    icon: ShieldCheck,
  },
];

const screenCards: CardData[] = [
  {
    title: "Asset List",
    description: "A consolidated view of assets with filters for category, status, branch and department.",
    icon: BarChart3,
    benefit: "Find and review any asset in seconds.",
  },
  {
    title: "Asset Details",
    description: "A detailed record showing images, documents, purchase information and history.",
    icon: FileText,
    benefit: "One screen shows the full asset context.",
  },
  {
    title: "Asset Registration",
    description: "A guided form for adding new assets with category, type and purchase details.",
    icon: ClipboardList,
    benefit: "Every asset is entered consistently.",
  },
  {
    title: "QR Code Screen",
    description: "A screen for generating, printing and managing QR Codes, including bulk generation.",
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
    description: "A log of all maintenance and repair activity carried out on an asset.",
    icon: Wrench,
    benefit: "Teams can plan servicing proactively.",
  },
  {
    title: "Branch Management",
    description: "A view to manage and compare asset data across multiple locations.",
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
    benefit: "Managers can review data quickly for audits and planning.",
  },
];

const reasonCards: CardData[] = [
  {
    title: "Easy Asset Registration",
    description: "Add new manufacturing assets quickly with organised categories and asset types.",
    icon: ClipboardList,
  },
  {
    title: "QR Code Tracking",
    description: "Generate, print and scan QR Codes for individual assets or in bulk.",
    icon: Search,
  },
  {
    title: "Simple Dashboard View",
    description: "See assigned, maintenance and in-store assets from one clear dashboard.",
    icon: BarChart3,
  },
  {
    title: "Maintenance Tracking",
    description: "Log and review maintenance activity for every asset over its lifecycle.",
    icon: Wrench,
  },
  {
    title: "Warranty Monitoring",
    description: "Keep warranty information visible so coverage status is always easy to check.",
    icon: ShieldCheck,
  },
  {
    title: "Department and Branch Visibility",
    description: "See how assets are distributed across departments and branches.",
    icon: MapPinned,
  },
  {
    title: "Comprehensive Reports",
    description: "Use search, filters and reporting tools to generate the data managers need.",
    icon: Search,
  },
  {
    title: "Business Ready Platform",
    description: "Built to support organizations from growing SMEs to large enterprises with multiple branches.",
    icon: CheckCircle2,
  },
];

const faqItems: FaqData[] = [
  {
    q: "What is Manufacturing Asset Management?",
    a: "Manufacturing Asset Management is the process of tracking and organizing every physical asset used in a factory, including production machines, tools, warehouse equipment, safety equipment and quality inspection instruments, from purchase to retirement. It covers asset details, assignments, maintenance, warranty tracking and reporting.",
  },
  {
    q: "Can I manage factory equipment using Altroz Asset Management?",
    a: "Yes. Altroz Asset Management is built for production machines, factory tools, warehouse equipment, quality instruments and safety equipment. Each item can be registered, tagged with a QR Code, assigned and tracked from one platform.",
  },
  {
    q: "Can I manage machinery such as CNC and hydraulic machines?",
    a: "Yes. Production machinery such as CNC machines, hydraulic machines and injection moulding machines can be registered with full details, tagged with QR Codes and tracked through their maintenance history.",
  },
  {
    q: "Can I generate QR Codes for factory assets?",
    a: "Yes. Altroz Asset Management supports individual and bulk QR Code generation, printing and scanning for manufacturing assets.",
  },
  {
    q: "Can I track tools like dies and moulds?",
    a: "Yes. Dies, moulds, power tools and hand tools can be registered as individual assets with department assignment and QR Code tagging.",
  },
  {
    q: "Can I track safety equipment?",
    a: "Yes. Safety equipment can be registered and tracked alongside other factory assets, with department assignment and maintenance records where needed.",
  },
  {
    q: "Can I record repair history for machines?",
    a: "Yes. Repair history is tracked as part of maintenance, so each machine keeps a documented record of repairs, part replacements and breakdown resolutions.",
  },
  {
    q: "How is manufacturing asset management different from a spreadsheet?",
    a: "A spreadsheet can store basic information, but it cannot provide a structured lifecycle, QR Code identification, maintenance history, warranty tracking or centralized search the way a dedicated platform can.",
  },
  {
    q: "Can I track warehouse equipment like forklifts and pallet trucks?",
    a: "Yes. Warehouse equipment such as forklifts and pallet trucks can be tracked alongside production assets with purchase, maintenance and assignment records.",
  },
  {
    q: "Does the platform support vendor information for assets?",
    a: "Yes. Vendor information can be stored with each asset so procurement and maintenance teams can quickly find the right supplier.",
  },
  {
    q: "Can I search for a specific asset quickly?",
    a: "Yes. Search tools help users locate assets by name, category, department or other recorded details in seconds.",
  },
  {
    q: "Can I filter assets by department or category?",
    a: "Yes. Filters let users narrow the asset list by department, branch or asset category for faster reviews and audits.",
  },
  {
    q: "Is manufacturing asset management useful for quality equipment?",
    a: "Yes. Quality inspection and testing equipment can be registered and tracked centrally, which helps with internal reviews and audits.",
  },
  {
    q: "Can I track office and IT assets along with factory machines?",
    a: "Yes. Industrial computers, networking equipment and office assets can be tracked alongside machinery in the same platform.",
  },
  {
    q: "How does this help reduce equipment downtime?",
    a: "Having maintenance and repair history in one place helps teams diagnose issues faster, confirm warranty coverage and respond more efficiently to breakdowns.",
  },
  {
    q: "Can small and medium manufacturing units use this platform?",
    a: "Yes. The platform works for manufacturing businesses of different sizes, including SMEs that want to move away from manual registers and spreadsheets.",
  },
  {
    q: "How does asset management help during factory audits?",
    a: "Centralized records make it easier to verify equipment ownership, location and service history during internal or statutory audits.",
  },
  {
    q: "Can I track assets by department?",
    a: "Yes. Assets can be assigned to departments so plant managers know which equipment belongs to production, quality, maintenance or warehouse teams.",
  },
  {
    q: "Can I manage assets across multiple factories?",
    a: "Yes. Assets can be tracked across branches or locations from one central dashboard for a consolidated view.",
  },
  {
    q: "Does the platform help with warranty claims?",
    a: "Yes. Warranty details are stored with the asset record, so teams can check coverage before raising repair requests or claims.",
  },
  {
    q: "Can I generate reports for management reviews?",
    a: "Yes. The reporting tools help managers review inventory, assignments, maintenance and asset status for audits and planning.",
  },
  {
    q: "What kind of assets can be managed?",
    a: "Manufacturing businesses can track machines, tools, warehouse equipment, safety equipment, quality instruments, office assets and more.",
  },
  {
    q: "Does the platform support asset history tracking?",
    a: "Yes. Each asset keeps a timeline of assignments, transfers, maintenance and repairs.",
  },
  {
    q: "How do I get started with Altroz Asset Management?",
    a: "The best way to get started is to book a free demo so the team can walk you through asset registration, QR tagging and reporting.",
  },
];

function BulletList({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item} className="flex items-start gap-3 rounded-2xl bg-surface/50 p-3">
          <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
          <span className="text-sm leading-6 text-ink">{item}</span>
        </div>
      ))}
    </div>
  );
}

function ManufacturingDashboardMock() {
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
              Manufacturing Dashboard
            </div>
            <div className="mt-1 text-lg font-semibold text-ink">
              Track machinery, tools and maintenance at a glance
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
                ["Total Assets", "18,420"],
                ["Assigned Assets", "13,804"],
                ["Under Maintenance", "146"],
                ["Warranty Expiring Soon", "84"],
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
                    Department snapshot
                  </div>
                  <h3 className="mt-1 text-base font-semibold text-ink">
                    Production, quality, maintenance and warehouse in one view
                  </h3>
                </div>
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-4 grid gap-2">
                {["Production machine status", "Quality equipment schedule", "Warehouse asset register", "Safety equipment checks"].map(
                  (item, index) => (
                    <div key={item} className="flex items-center gap-3 rounded-xl bg-surface/70 p-3">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                        {String(index + 1)}
                      </span>
                      <span className="text-sm text-ink">{item}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionCard({ title, description, icon: Icon, benefit }: CardData) {
  return (
    <article className="soft-card h-full p-5">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-success/12 text-primary shadow-sm">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{description}</p>
      {benefit ? (
        <div className="mt-4 rounded-2xl bg-white p-3 text-sm font-medium text-ink shadow-sm">
          Business benefit: {benefit}
        </div>
      ) : null}
    </article>
  );
}

export default function BulkEmailAssetManagementPage() {
  return (
    <div className="asset-management-theme asset-management-theme-shell min-h-screen">
      <PageSEO
        title="Manufacturing Asset Management Software | Altroz Asset Management"
        description="Track machinery, factory tools and warehouse assets from one platform. QR code tracking, maintenance records and warranty management for manufacturing teams."
        canonicalPath={ROUTES.bulkEmailAssetManagement}
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
                <Factory className="h-3.5 w-3.5" />
                Enterprise Asset Management Software
              </span>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Manage Every Manufacturing Asset from One Centralized Platform
              </h1>
              <p className="mx-auto mt-5 max-w-4xl text-base leading-7 text-ink-soft sm:text-lg">
                Track machinery, production equipment, factory tools and industrial assets with complete
                visibility. Altroz Asset Management helps manufacturing businesses replace manual
                registers and spreadsheets with organized, searchable digital records.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Link to={ROUTES.assetManagementBookDemo} className="btn-primary">
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
                  Complete visibility for assets, maintenance, branches and departments
                </h2>
                <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg lg:mx-0">
                  Use one dashboard to keep ownership, service status and distribution clear at a glance.
                  Instead of waiting on manual reports, managers can review live asset data, compare
                  locations and act on issues faster.
                </p>
                <div className="mt-7 rounded-[1.5rem] border border-primary/15 bg-gradient-to-br from-primary/6 via-white to-success/6 p-5 text-left">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    What this platform helps with
                  </div>
                  <BulletList items={introBullets} />
                </div>
              </ScrollReveal>

              <ScrollReveal variant="scale" className="relative self-start">
                <ManufacturingDashboardMock />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="What Is Asset Management?"
              title="A structured way to track the physical assets your business owns"
              description="Asset management helps businesses register, organise, assign, monitor and maintain physical assets throughout their useful life."
              center
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
              <ScrollReveal variant="fade-up" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Understanding the concept
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  A system that keeps every factory asset searchable and accountable
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  Manufacturing asset management is the structured process of registering, organizing,
                  tracking and maintaining physical assets such as laptops, machinery, tools, furniture,
                  vehicles and industrial equipment throughout their working life.
                </p>
                <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Common challenges with manual tracking
                  </div>
                  <BulletList
                    items={[
                      "Outdated records scattered across spreadsheets that are rarely updated on time.",
                      "Unclear ownership with no easy record of which employee or department holds an asset.",
                      "Duplicate purchases when one department cannot see what another already has.",
                      "Missed maintenance because service and warranty dates are not tracked well.",
                      "Difficult audits when verification becomes time-consuming and error-prone.",
                    ]}
                  />
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
                  asset information in one place. Every asset is registered once, categorized correctly
                  and made searchable across branches and departments.
                </p>
                <BulletList
                  items={[
                    "Teams can see asset status, assignment history, maintenance records and documents instantly.",
                    "Management no longer depends on outdated spreadsheets or manual follow-ups.",
                    "The platform improves accountability and reduces the risk of asset loss.",
                    "Real-time visibility makes it easier to understand how organizational resources are used.",
                  ]}
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Manufacturing Challenges"
              title="Manual methods create recurring problems on the shop floor"
              description="These are the issues manufacturing teams commonly face when asset records are fragmented."
              center
            />

            <StaggerReveal step={40} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {challengeCards.map((card) => (
                <SectionCard key={card.title} {...card} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="features" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Core Asset Management Features"
              title="The platform includes the practical tools teams use every day"
              description="Every feature below mirrors how manufacturing teams actually work."
              center
            />

            <StaggerReveal step={35} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {capabilityCards.map((card) => (
                <SectionCard key={card.title} {...card} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Manufacturing Asset Lifecycle"
              title="Every asset moves through a defined lifecycle"
              description="Understanding the lifecycle helps businesses plan better, control costs and extend the useful life of assets."
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

        <section className="section scroll-mt-24">
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

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Manufacturing Use Cases"
              title="The platform is useful across many industrial workflows"
              description="Each manufacturing area has different asset-management needs, but the need for visibility and control is the same."
              center
            />

            <StaggerReveal step={35} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {industryCards.map((card) => (
                <SectionCard key={card.title} {...card} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Asset Screens"
              title="The screen set covers registration, tracking, maintenance and reporting"
              description="Each screen helps a different kind of manager review the same asset data with the right emphasis."
              center
            />

            <StaggerReveal step={35} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {screenCards.map((card) => (
                <SectionCard key={card.title} {...card} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Why Choose Altroz Asset Management?"
              title="The platform is built for factories that need control and clarity"
              description="These strengths make the system practical for manufacturing businesses of different sizes."
              center
            />

            <StaggerReveal step={35} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {reasonCards.map((card) => (
                <SectionCard key={card.title} {...card} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="Common questions about manufacturing asset management"
              description="Use the answers below to help visitors understand the platform, its coverage and its day-to-day value."
              center
            />

            <div className="mx-auto mt-8 max-w-5xl">
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

        <section className="hero-gradient py-14 scroll-mt-24 sm:py-16 lg:py-20">
          <div className="site-container">
            <div className="rounded-[2rem] border border-border bg-white p-8 shadow-float md:p-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                    Final CTA
                  </div>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                    Simplify Manufacturing Asset Management
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-ink-soft">
                    Track every manufacturing asset from procurement to retirement using one centralized
                    platform. Improve visibility, organize maintenance, simplify audits and manage factory
                    equipment more efficiently with Altroz Asset Management.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Link to={ROUTES.assetManagementBookDemo} className="btn-primary">
                    Book Free Demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to={ROUTES.assetManagementContact} className="btn-outline">
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
