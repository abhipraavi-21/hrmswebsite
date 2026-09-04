"use client";

import { type ComponentType } from "react";
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
  QrCode,
  Search,
  ShieldCheck,
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
import { PageShell, SectionHeading } from "./shared";

type IconType = ComponentType<{ className?: string }>;

type CardData = {
  title: string;
  description: string;
  icon: IconType;
  benefit?: string;
};

type Step = {
  step: string;
  title: string;
  description: string;
};

type Faq = {
  q: string;
  a: string;
};

const heroMetrics = [
  { label: "Total Assets", value: "12,480" },
  { label: "Assigned Assets", value: "9,824" },
  { label: "Under Maintenance", value: "146" },
  { label: "Warranty Renewals", value: "312" },
];

const challengeCards: CardData[] = [
  {
    title: "Lost Laptops",
    description:
      "Without a central record of who has which laptop, devices can go missing during transfers, remote work or relocations.",
    icon: AlertTriangle,
  },
  {
    title: "Unknown Ownership",
    description:
      "When assignment records are scattered across emails and spreadsheets, teams cannot quickly confirm who holds an asset.",
    icon: Users,
  },
  {
    title: "Manual Registers",
    description:
      "Paper logs and spreadsheet registers need constant manual updates and quickly fall behind reality as the business grows.",
    icon: FileText,
  },
  {
    title: "No Warranty Tracking",
    description:
      "If warranty dates are tracked separately, businesses often pay for repairs that should have been covered.",
    icon: ShieldCheck,
  },
  {
    title: "Missing Purchase Records",
    description:
      "Invoices, vendor details and purchase dates stored in separate folders make asset verification much harder later.",
    icon: ClipboardList,
  },
  {
    title: "Difficult IT Audits",
    description:
      "Preparing for internal or external audits becomes slow when asset data is incomplete or spread across multiple sources.",
    icon: Search,
  },
  {
    title: "Asset Misallocation",
    description:
      "Without visibility into idle or underused equipment, teams may purchase new assets while usable devices sit elsewhere.",
    icon: Package,
  },
  {
    title: "Poor Branch Visibility",
    description:
      "Multi-location teams need one central view of where assets are held, who is using them and what condition they are in.",
    icon: MapPinned,
  },
];

const helpCards: CardData[] = [
  {
    title: "Centralized IT Inventory",
    description:
      "Register laptops, desktops, servers, monitors, printers, routers, switches and other hardware in one organised inventory.",
    icon: Package,
    benefit: "IT teams always know exactly what the organisation owns.",
  },
  {
    title: "Employee Asset Assignment",
    description:
      "Assign assets to individual employees and keep a clear, searchable record of who is responsible for each device.",
    icon: Users,
    benefit: "Improves accountability and recovery during exits or transfers.",
  },
  {
    title: "Department Asset Tracking",
    description:
      "View and organise IT assets by department so managers can understand how resources are distributed across teams.",
    icon: Building2,
    benefit: "Supports budgeting and fair allocation of IT resources.",
  },
  {
    title: "Branch-wise Visibility",
    description:
      "See assets organised by branch or office location from one central dashboard.",
    icon: MapPinned,
    benefit: "Helps multi-location businesses manage inventory without site visits.",
  },
  {
    title: "QR Code Identification",
    description:
      "Generate and print QR codes for assets and scan them to open the correct record instantly.",
    icon: QrCode,
    benefit: "Speeds up audits, handovers and day-to-day lookups.",
  },
  {
    title: "Maintenance Records",
    description:
      "Log servicing and repair activity against each asset to build a complete service history over time.",
    icon: Wrench,
    benefit: "Helps teams plan preventive maintenance and replacements.",
  },
  {
    title: "Warranty Tracking",
    description:
      "Store warranty details for every asset so support teams can check coverage at a glance.",
    icon: ShieldCheck,
    benefit: "Reduces unnecessary repair costs and missed claims.",
  },
  {
    title: "Purchase Information",
    description:
      "Capture purchase date, cost and related details for accurate financial and lifecycle tracking.",
    icon: ClipboardList,
    benefit: "Improves budgeting, depreciation and reporting accuracy.",
  },
  {
    title: "Vendor Management",
    description:
      "Keep vendor details against each asset so procurement and IT teams can reach the right supplier quickly.",
    icon: Factory,
    benefit: "Speeds up repairs, replacements and repeat purchases.",
  },
  {
    title: "Reports and Analytics",
    description:
      "Generate reports on counts, assignments, categories and status using built-in search and filter tools.",
    icon: BarChart3,
    benefit: "Saves hours of manual reporting before reviews and audits.",
  },
];

const lifecycleSteps: Step[] = [
  {
    step: "01",
    title: "Purchase",
    description: "The organisation buys a new IT asset and receives the invoice and vendor details.",
  },
  {
    step: "02",
    title: "Asset Registration",
    description: "The asset is entered with category, type, purchase information and vendor details.",
  },
  {
    step: "03",
    title: "QR Code Generation",
    description: "A unique QR code is generated so the asset can be identified instantly at any point in its lifecycle.",
  },
  {
    step: "04",
    title: "Employee Assignment",
    description: "The asset is assigned to an employee, department or branch with a clear ownership record.",
  },
  {
    step: "05",
    title: "Daily Usage",
    description: "The asset is used in day-to-day operations while its status remains visible on the dashboard.",
  },
  {
    step: "06",
    title: "Maintenance",
    description: "Any servicing, repairs or upkeep are logged against the asset to preserve a full history.",
  },
  {
    step: "07",
    title: "Warranty Tracking",
    description: "Warranty details stay visible throughout the asset life so teams know when coverage is active.",
  },
  {
    step: "08",
    title: "Transfer",
    description: "If the asset moves to a new person, department or branch, the assignment is updated immediately.",
  },
  {
    step: "09",
    title: "Reports",
    description: "Managers can pull reports on status, assignment history and maintenance records for audits or reviews.",
  },
  {
    step: "10",
    title: "Retirement",
    description: "When the asset reaches end of life, it is marked retired while preserving its full history.",
  },
];

const benefitCards: CardData[] = [
  {
    title: "Complete Asset Visibility",
    description: "See every IT asset, where it is and who is using it from one centralized dashboard.",
    icon: TrendingUp,
  },
  {
    title: "Reduced Asset Loss",
    description: "Clear assignment records and QR identification make missing assets far easier to prevent.",
    icon: AlertTriangle,
  },
  {
    title: "Improved Accountability",
    description: "When every asset is linked to a named employee, department or branch, responsibility is unambiguous.",
    icon: ClipboardList,
  },
  {
    title: "Simplified Audits",
    description: "Searchable digital records and QR scanning replace manual counting and speed up audits.",
    icon: BarChart3,
  },
  {
    title: "Better Maintenance Planning",
    description: "A documented maintenance history helps IT teams plan servicing proactively instead of reactively.",
    icon: Wrench,
  },
  {
    title: "Organized Documentation",
    description: "Purchase, vendor and warranty records stay attached to the asset instead of scattered across folders.",
    icon: FileText,
  },
  {
    title: "Centralized IT Inventory",
    description: "All assets, across categories and locations, live in one system with real-time status.",
    icon: Package,
  },
  {
    title: "Scalable Operations",
    description: "The same platform scales with the organisation as employees, departments and branches grow.",
    icon: Layers3,
  },
];

const audienceCards: CardData[] = [
  {
    title: "Corporate Offices",
    description: "Track laptops, desktops and networking equipment issued to employees across departments.",
    icon: Building2,
  },
  {
    title: "IT Companies",
    description: "Manage development machines, servers and peripheral devices with organised categories and records.",
    icon: Laptop,
  },
  {
    title: "BPOs",
    description: "Keep visibility over desktops, headsets and networking equipment across large teams and shifts.",
    icon: Users,
  },
  {
    title: "Educational Institutions",
    description: "Track computer lab equipment, projectors and networking devices across classrooms and offices.",
    icon: Factory,
  },
  {
    title: "Hospitals",
    description: "Maintain records of desktops, scanners and networking equipment across departments.",
    icon: ShieldCheck,
  },
  {
    title: "Banks",
    description: "Track branch-wise IT equipment such as desktops, printers and networking devices with accountability.",
    icon: MapPinned,
  },
  {
    title: "Manufacturing",
    description: "Manage IT assets used on plant floors and in administrative offices with clear records.",
    icon: Factory,
  },
  {
    title: "Government Offices",
    description: "Keep organised, auditable records of IT equipment issued across departments and offices.",
    icon: ClipboardList,
  },
  {
    title: "Retail Chains",
    description: "Track POS-related IT equipment, desktops and networking devices across multiple store locations.",
    icon: Package,
  },
  {
    title: "Logistics Companies",
    description: "Manage barcode scanners, mobile devices and networking equipment across warehouses and branches.",
    icon: Layers3,
  },
];

const useCaseCards: CardData[] = [
  {
    title: "Employee Laptop Management",
    description:
      "Register each laptop, assign it to a specific employee and track status, warranty and maintenance from one record.",
    icon: Laptop,
  },
  {
    title: "Server Inventory",
    description:
      "Register servers with specifications, purchase information and maintenance history for a complete record.",
    icon: Package,
  },
  {
    title: "Networking Equipment Tracking",
    description:
      "Log routers, switches, firewalls and access points with location, assignment and maintenance history.",
    icon: QrCode,
  },
  {
    title: "Printer Management",
    description:
      "Track printers and scanners by department and branch, with service records for each maintenance event.",
    icon: FileText,
  },
  {
    title: "Projector Tracking",
    description:
      "Monitor projectors used in meeting rooms, classrooms or training spaces with assignment and maintenance details.",
    icon: FileText,
  },
  {
    title: "Mobile Device Management",
    description:
      "Register company-issued phones and tablets with a clear record of who is using them and when.",
    icon: TrendingUp,
  },
  {
    title: "Branch-wise IT Assets",
    description:
      "View assets grouped by branch so head office has a consolidated picture without site visits.",
    icon: MapPinned,
  },
  {
    title: "Department-wise IT Assets",
    description:
      "Group and review equipment by department to understand distribution and future budget requirements.",
    icon: Building2,
  },
  {
    title: "New Employee Allocation",
    description:
      "Assign laptops, monitors and peripherals during onboarding and record the allocation against the employee profile.",
    icon: Users,
  },
  {
    title: "Employee Exit Collection",
    description:
      "Use the assigned-asset list to collect all equipment before the exit is completed.",
    icon: ClipboardList,
  },
];

const reasonCards: CardData[] = [
  {
    title: "Easy Asset Registration",
    description: "Add new IT assets quickly with organised categories and asset types.",
    icon: FileText,
  },
  {
    title: "QR Code Tracking",
    description: "Generate, print and scan QR codes for individual assets or in bulk.",
    icon: QrCode,
  },
  {
    title: "Simple Dashboard View",
    description: "See assigned, maintenance and in-store assets from one clear dashboard.",
    icon: BarChart3,
  },
  {
    title: "Maintenance Tracking",
    description: "Log and review maintenance activity for every asset over its life cycle.",
    icon: Wrench,
  },
  {
    title: "Warranty Monitoring",
    description: "Keep warranty information visible so coverage status is easy to check.",
    icon: ShieldCheck,
  },
  {
    title: "Department and Branch Visibility",
    description: "See how IT assets are distributed across departments and branches.",
    icon: MapPinned,
  },
  {
    title: "Comprehensive Reports",
    description: "Use search, filters and reporting tools to generate the data managers need.",
    icon: Search,
  },
  {
    title: "Business Ready Platform",
    description: "Built to support organisations from growing SMEs to large enterprises with multiple branches.",
    icon: CheckCircle2,
  },
];

const faqItems: Faq[] = [
  {
    q: "What is IT Asset Management?",
    a: "IT Asset Management is the process of tracking and managing an organisation's IT equipment from purchase through retirement, including who is using each asset and its current status.",
  },
  {
    q: "What assets can be managed with Altroz Asset Management?",
    a: "Altroz Asset Management is designed to track laptops, desktops, servers, monitors, printers, scanners, routers, switches, firewalls, access points, storage devices, mobile phones, tablets, barcode scanners, projectors, UPS systems and other peripheral devices.",
  },
  {
    q: "Can I assign laptops to employees?",
    a: "Yes. Laptops and other IT assets can be assigned to individual employees, with the assignment recorded and visible on the asset profile.",
  },
  {
    q: "Can I manage servers using this platform?",
    a: "Yes. Servers can be registered as IT assets along with purchase information, maintenance records and current status.",
  },
  {
    q: "Can I use QR Codes to track assets?",
    a: "Yes. Altroz Asset Management supports QR code generation for individual assets as well as bulk QR generation, printing and scanning for fast identification.",
  },
  {
    q: "Can I monitor warranty status for my assets?",
    a: "Yes. Warranty details can be recorded against each asset so IT and procurement teams can see coverage status at any time.",
  },
  {
    q: "Can I generate reports on IT assets?",
    a: "Yes. The platform provides reports and analytics along with search and filter tools to review asset data by category, status, department or branch.",
  },
  {
    q: "How does IT Asset Management improve audits?",
    a: "By keeping asset records, assignments and history centralized and searchable, IT teams can verify asset counts and status quickly instead of relying on manual counting or scattered spreadsheets.",
  },
  {
    q: "Can I track assets across multiple branches?",
    a: "Yes. Assets can be organised by branch, giving a consolidated branch-wise view from a single dashboard.",
  },
  {
    q: "Who should use IT Asset Management Software?",
    a: "Any organisation that issues or maintains IT equipment, including corporate offices, IT companies, BPOs, educational institutions, hospitals, banks, manufacturing units, government offices, retail chains and logistics companies, can benefit from IT Asset Management Software.",
  },
  {
    q: "Can I track assets by department?",
    a: "Yes. Assets can be grouped and viewed by department, helping managers understand how equipment is distributed across teams.",
  },
  {
    q: "Does the platform maintain a history for each asset?",
    a: "Yes. Each asset record maintains a history that reflects changes such as assignment updates and maintenance activity over time.",
  },
  {
    q: "Can I record vendor information for an asset?",
    a: "Yes. Vendor information can be stored against each asset, making it easier to reach the correct supplier for servicing or repurchase.",
  },
  {
    q: "Can I record purchase details such as date and cost?",
    a: "Yes. Purchase information, including purchase date and related details, can be recorded against each asset for financial and lifecycle tracking.",
  },
  {
    q: "Is Altroz Asset Management suitable for small businesses?",
    a: "Yes. The platform is built to support organisations of different sizes, including growing SMEs that are moving away from spreadsheets and manual registers.",
  },
  {
    q: "Is Altroz Asset Management suitable for large enterprises?",
    a: "Yes. The platform supports department-wise and branch-wise organisation of assets, which is well suited to large enterprises with multiple locations and teams.",
  },
  {
    q: "Can software licenses be tracked in the system?",
    a: "Software license tracking is supported where applicable within the platform's asset categories; speak with the Altroz team to confirm the exact scope for your organisation.",
  },
  {
    q: "How do I search for a specific IT asset?",
    a: "The platform includes search and filter tools that allow IT admins to quickly locate a specific asset by category, assignment, status or other recorded details.",
  },
  {
    q: "What happens to an asset's record when it is reassigned?",
    a: "When an asset is reassigned to a new employee, department or branch, the assignment is updated and reflected in the asset's history.",
  },
  {
    q: "Can I see which assets are currently under maintenance?",
    a: "Yes. Asset status, including whether a device is currently under maintenance, is visible on the dashboard and in individual asset records.",
  },
  {
    q: "How does QR code scanning help during an audit?",
    a: "Scanning an asset's QR code instantly brings up its recorded details, allowing an auditor to verify the asset against its digital record without manual lookup.",
  },
  {
    q: "Can I categorise assets by type?",
    a: "Yes. Assets can be organised using asset categories and asset types, keeping the inventory structured as it grows.",
  },
  {
    q: "Does the platform help with new employee onboarding?",
    a: "Yes. When a new employee joins, the assets allocated to them can be assigned and recorded against their profile.",
  },
  {
    q: "Does the platform help during employee exits?",
    a: "Yes. IT admins can refer to an employee's assigned asset list to confirm that all issued equipment has been collected before the exit is completed.",
  },
  {
    q: "How can I get started with Altroz Asset Management?",
    a: "You can book a free demo with the Altroz Technologies team to see how the platform can be configured for your organisation's IT asset inventory.",
  },
];

function DashboardMock() {
  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="dashboard-glow left-1/2 top-10 -translate-x-1/2" />
      <div className="soft-card relative overflow-hidden rounded-[2rem] border border-border bg-white/95 p-5 shadow-float">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-success/12 text-primary shadow-sm">
            <Package className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">IT Asset Dashboard</div>
            <div className="mt-1 text-lg font-semibold text-ink">Real-time asset visibility in one screen</div>
          </div>
          <div className="ml-auto rounded-full bg-primary-soft px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            Live
          </div>
        </div>

        <div className="mt-5 grid gap-4">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-primary/6 via-white to-success/6 p-5">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {heroMetrics.map((item) => (
                <div key={item.label} className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">{item.label}</div>
                  <div className="mt-1 text-2xl font-black tracking-tight text-ink">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr,0.85fr]">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-success">Recent Activity</div>
                    <h3 className="mt-1 text-base font-semibold text-ink">
                      Track assignments, transfers and maintenance updates as they happen
                    </h3>
                  </div>
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    "New laptop assigned to the IT team",
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

              <div className="grid gap-4">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="text-sm font-semibold text-ink">Category Breakdown</div>
                  <div className="mt-4 space-y-3">
                    {[
                      ["Laptops", "42", "w-[84%]"],
                      ["Desktops", "25", "w-[63%]"],
                      ["Networking", "18", "w-[45%]"],
                      ["Peripherals", "15", "w-[38%]"],
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

                <div className="rounded-2xl bg-white p-4 shadow-sm">
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
      </div>
    </div>
  );
}

export default function BulkEmailAssetDashboardPage() {
  return (
    <div className="asset-management-theme asset-management-theme-shell min-h-screen">
      <PageSEO
        title="IT Asset Management Dashboard | Altroz Asset Management"
        description="Track, assign, maintain and monitor IT equipment from one centralized dashboard with QR code tracking, warranty records and reports."
        canonicalPath={ROUTES.bulkEmailAssetDashboard}
      />

      <AssetManagementNavbar />

      <PageShell>
        <section className="hero-gradient relative overflow-hidden pt-12 pb-16">
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 top-16 h-72 w-72 rounded-full bg-success/10 blur-3xl" />

          <div className="site-container">
            <div className="grid items-center gap-10 lg:grid-cols-[1.02fr,0.98fr]">
              <ScrollReveal variant="fade-up" className="mx-auto max-w-3xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-xs font-extrabold tracking-[0.22em] text-primary shadow-sm">
                  <Package className="h-3.5 w-3.5" />
                  Enterprise IT Asset Management Software
                </span>

                <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                  Manage Every IT Asset from One Centralized Platform
                </h1>

                <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg">
                  Track, assign, maintain and monitor IT equipment with complete visibility. Altroz Asset
                  Management helps teams replace scattered spreadsheets and manual registers with organised digital
                  records, QR identification, maintenance history and warranty visibility across every department
                  and branch.
                </p>

                <div className="mx-auto mt-6 grid max-w-3xl gap-3 sm:grid-cols-3">
                  {[
                    "Centralized IT inventory",
                    "QR code identification",
                    "Warranty and maintenance tracking",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/80 p-3 shadow-sm">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium text-ink">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                  <Link to={ROUTES.assetManagementBookDemo} className="btn-primary">
                    Book Free Demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to={ROUTES.bulkEmailAssetManagement} className="btn-outline">
                    Explore Features
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left">
                <DashboardMock />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section" id="what-is-itam">
          <div className="site-container">
            <SectionHeading
              eyebrow="What is IT Asset Management?"
              title="Track hardware, ownership, maintenance and lifecycle details in one system"
              description="IT Asset Management is the practice of tracking and managing an organisation's IT equipment from the day it is purchased to the day it is retired."
              center
            />

            <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
              <article className="soft-card p-6">
                <h3 className="text-xl font-bold text-ink">Why organisations need IT Asset Management</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  IT assets represent a significant investment for any business. Left untracked, this investment is
                  exposed to loss, misuse, duplicate purchases and poor accountability. A structured IT Asset
                  Management approach gives IT managers, finance teams and business owners a clear, real-time picture
                  of what the organisation owns, who is responsible for each asset and what condition it is in.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    "Know who has which device",
                    "See warranty and maintenance status",
                    "Reduce duplicate purchases",
                    "Prepare faster for audits",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-surface/50 p-4">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                      <span className="text-sm leading-6 text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </article>

              <div className="grid gap-4">
                <article className="soft-card p-6">
                  <h3 className="text-lg font-bold text-ink">Centralized record keeping</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">
                    A single platform keeps asset records organised and searchable, instead of scattered across emails
                    and spreadsheets.
                  </p>
                </article>
                <article className="soft-card p-6">
                  <h3 className="text-lg font-bold text-ink">Built for growth</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">
                    As your organisation grows, the same system scales across departments and branches without extra
                    manual effort.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white" id="challenges">
          <div className="site-container">
            <SectionHeading
              eyebrow="Common IT Asset Management Challenges"
              title="The problems that appear once asset inventory starts to grow"
              description="Most organisations face the same recurring issues when IT inventory is tracked in spreadsheets or manual registers."
              center
            />

            <StaggerReveal step={40} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {challengeCards.map((card) => (
                <article key={card.title} className="soft-card p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary shadow-sm">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section" id="how-altroz-helps">
          <div className="site-container">
            <SectionHeading
              eyebrow="How Altroz Asset Management Helps"
              title="A full set of IT asset tracking capabilities in one centralized platform"
              description="Each capability below maps directly to the workflows IT teams use every day, from registration to reporting."
              center
            />

            <StaggerReveal step={40} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {helpCards.map((card) => (
                <article key={card.title} className="soft-card p-5">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary shadow-sm">
                      <card.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-ink">{card.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-ink-soft">{card.description}</p>
                    </div>
                  </div>
                  {card.benefit ? (
                    <div className="mt-4 rounded-2xl bg-surface/60 p-4 text-sm leading-6 text-ink">
                      <span className="font-semibold text-primary">Business benefit:</span> {card.benefit}
                    </div>
                  ) : null}
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-white" id="lifecycle">
          <div className="site-container">
            <SectionHeading
              eyebrow="IT Asset Lifecycle"
              title="From purchase to retirement, every stage stays visible"
              description="Altroz Asset Management is built around the complete lifecycle of an IT asset so teams can follow the record from the first entry to the final retirement."
              center
            />

            <StaggerReveal step={30} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {lifecycleSteps.map((step) => (
                <article key={step.step} className="soft-card p-5">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">{step.step}</div>
                  <h3 className="mt-3 text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">{step.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section" id="benefits">
          <div className="site-container">
            <SectionHeading
              eyebrow="Business Benefits"
              title="What teams gain when IT asset data is centralized"
              description="The platform improves visibility, accountability and operational efficiency while reducing the manual effort needed to manage assets."
              center
            />

            <StaggerReveal step={30} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {benefitCards.map((card) => (
                <article key={card.title} className="soft-card p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary shadow-sm">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-white" id="audience">
          <div className="site-container">
            <SectionHeading
              eyebrow="Who Can Use This Solution?"
              title="Built for any organisation that issues, manages or maintains IT equipment"
              description="Altroz Asset Management works across a wide range of sectors that need structured asset control."
              center
            />

            <StaggerReveal step={24} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {audienceCards.map((card) => (
                <article key={card.title} className="soft-card p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary shadow-sm">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section" id="use-cases">
          <div className="site-container">
            <SectionHeading
              eyebrow="Real Business Use Cases"
              title="Practical ways teams use the platform every day"
              description="These examples show how the same core system supports different asset types, workflows and departments."
              center
            />

            <StaggerReveal step={24} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {useCaseCards.map((card) => (
                <article key={card.title} className="soft-card p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary shadow-sm">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-white" id="why-choose">
          <div className="site-container">
            <SectionHeading
              eyebrow="Why Choose Altroz Asset Management?"
              title="The dashboard, tracking and reporting tools work together as one system"
              description="This solution is designed to keep records clear, searchable and ready for growth."
              center
            />

            <StaggerReveal step={30} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {reasonCards.map((card) => (
                <article key={card.title} className="soft-card p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary shadow-sm">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="site-container">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="Quick answers to the most common questions about IT Asset Management"
              description="Use the questions below to help visitors understand the platform, its coverage and how it supports day-to-day operations."
              center
            />

            <div className="mx-auto mt-8 max-w-5xl">
              <Accordion type="single" collapsible className="grid gap-3">
                {faqItems.map((faq, index) => (
                  <AccordionItem
                    key={faq.q}
                    value={`faq-${index}`}
                    className="soft-card border-0 px-5 shadow-sm"
                  >
                    <AccordionTrigger className="text-left text-base font-semibold text-ink hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-7 text-ink-soft">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="site-container">
            <div className="soft-card relative overflow-hidden border border-border bg-gradient-to-br from-primary/5 via-white to-success/5 p-8">
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -left-12 bottom-0 h-36 w-36 rounded-full bg-success/10 blur-3xl" />

              <div className="relative grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-primary shadow-sm">
                    Trust and support
                  </span>
                  <h2 className="mt-4 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                    Simplify IT Asset Management Across Your Organisation
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
                    Track laptops, desktops, servers, networking equipment and other IT assets from one centralized
                    platform. Improve visibility, accountability, maintenance and operational efficiency with Altroz
                    Asset Management.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to={ROUTES.assetManagementBookDemo} className="btn-primary">
                      Book Free Demo
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link to={ROUTES.assetManagementContact} className="btn-outline">
                      Contact Our Team
                    </Link>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  {[
                    "Secure and organized asset records",
                    "Built for audits, maintenance and handovers",
                    "Scales from SMEs to large enterprise teams",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/80 p-4 shadow-sm">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                      <span className="text-sm leading-6 text-ink">{item}</span>
                    </div>
                  ))}
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
