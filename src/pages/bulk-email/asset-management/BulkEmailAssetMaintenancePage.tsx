"use client";

import type { ComponentType } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Factory,
  FileText,
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
import { PageShell, SectionHeading } from "./shared";

type IconType = ComponentType<{ className?: string }>;

type CardData = {
  title: string;
  description: string;
  icon: IconType;
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
  { label: "Medical & Non-Medical Assets", value: "18,420" },
  { label: "Departments Covered", value: "42" },
  { label: "Assets Under Maintenance", value: "146" },
  { label: "Warranty Expiring Soon", value: "84" },
];

const quickLinks = [
  { label: "Home", href: ROUTES.home },
  { label: "Asset Dashboard", href: ROUTES.bulkEmailAssetDashboard },
  { label: "Asset Management", href: ROUTES.bulkEmailAssetManagement },
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
  "Track MRI machines, patient monitors, beds, printers, furniture and IT equipment from one place.",
  "Tag assets with QR Codes for fast identification and floor-level visibility.",
  "Manage department allocation, maintenance, warranty, vendor and purchase records centrally.",
];

const healthcareSummaryBullets = [
  "Hospitals rely on hundreds or thousands of assets across ICU, radiology, operation theatres, laboratories and wards.",
  "Paper registers and disconnected spreadsheets make it hard to know what exists, where it is and when it was last serviced.",
  "A centralised system gives administrators, biomedical engineers and finance teams one reliable source of truth.",
];

const challengeCards: CardData[] = [
  {
    title: "Missing Medical Equipment",
    description: "Portable assets move between wards and departments, so teams lose time searching for equipment.",
    icon: AlertTriangle,
  },
  {
    title: "Unknown Equipment Location",
    description: "If assets are not linked to a location or department, staff cannot quickly find them during urgent moments.",
    icon: MapPinned,
  },
  {
    title: "Manual Asset Registers",
    description: "Registers, spreadsheets and paper files are slow to update and difficult to search during an audit.",
    icon: FileText,
  },
  {
    title: "Delayed Maintenance",
    description: "Without a service schedule, maintenance slips and equipment is more likely to fail at critical times.",
    icon: Wrench,
  },
  {
    title: "Expired Warranties",
    description: "Hospitals keep paying for repairs that should have been covered because expiry dates were not tracked.",
    icon: ShieldCheck,
  },
  {
    title: "Lost Service History",
    description: "When maintenance records live in separate files and emails, the true equipment history gets fragmented.",
    icon: Clock3,
  },
  {
    title: "Department Allocation Challenges",
    description: "Large hospitals struggle to know which assets belong to which department or branch.",
    icon: Building2,
  },
  {
    title: "Poor Asset Visibility",
    description: "Leadership lacks one consolidated view of all assets across departments and locations.",
    icon: BarChart3,
  },
];

const capabilityCards: CardData[] = [
  {
    title: "Centralised Medical Asset Register",
    description:
      "Create one digital register for every medical and non-medical asset, organised by category and asset type.",
    icon: ClipboardList,
    benefit: "Teams work from one accurate source of truth instead of scattered records.",
  },
  {
    title: "QR Code Equipment Identification",
    description:
      "Generate unique QR Codes for each asset so staff can scan equipment and open its record instantly.",
    icon: QrCode,
    benefit: "Physical verification becomes much faster on the hospital floor.",
  },
  {
    title: "Department-wise Asset Allocation",
    description:
      "Assign assets to departments and branches so ICU, radiology, laboratory and wards stay organised.",
    icon: MapPinned,
    benefit: "Improves accountability and simplifies branch-wise planning.",
  },
  {
    title: "Maintenance Management",
    description:
      "Log service schedules and maintenance activities against every asset for better biomedical coordination.",
    icon: Wrench,
    benefit: "Reduces missed servicing and supports higher equipment uptime.",
  },
  {
    title: "Warranty Tracking",
    description:
      "Store warranty coverage and expiry details so teams can check support status before approving repairs.",
    icon: ShieldCheck,
    benefit: "Helps avoid unnecessary repair spending.",
  },
  {
    title: "Repair History",
    description:
      "Keep a complete repair history for each asset so teams can see issues, visits and service outcomes together.",
    icon: Clock3,
    benefit: "Makes repair-versus-replace decisions easier.",
  },
  {
    title: "Vendor & Purchase Records",
    description:
      "Store vendor details and purchase information with the asset record for easy procurement lookups.",
    icon: FileText,
    benefit: "Finance and procurement teams can retrieve history quickly during reviews.",
  },
  {
    title: "Hospital Dashboard",
    description:
      "See a real-time overview of assets across departments and branches from one centralised dashboard.",
    icon: BarChart3,
    benefit: "Saves time by removing the need to compile data from multiple sources.",
  },
  {
    title: "Asset Reports",
    description:
      "Generate reports for categories, departments, branches and maintenance activity whenever leadership needs them.",
    icon: Search,
    benefit: "Makes audits and management reviews faster and more accurate.",
  },
  {
    title: "Analytics",
    description:
      "Review asset distribution and utilisation trends to support procurement, budgeting and planning decisions.",
    icon: TrendingUp,
    benefit: "Transforms asset records into decision-ready insight.",
  },
];

const lifecycleSteps: StepData[] = [
  {
    step: "01",
    title: "Purchase Medical Equipment",
    description: "The hospital purchases new equipment such as a patient monitor or laboratory instrument.",
  },
  {
    step: "02",
    title: "Register Asset",
    description: "The equipment is added to Altroz Asset Management with category, type and purchase details.",
  },
  {
    step: "03",
    title: "Generate QR Code",
    description: "A unique QR Code is generated and printed for physical tagging on the asset.",
  },
  {
    step: "04",
    title: "Assign Department",
    description: "The asset is assigned to the correct department or branch, such as ICU, radiology or laboratory.",
  },
  {
    step: "05",
    title: "Daily Clinical Usage",
    description: "Staff use the equipment in routine clinical or diagnostic operations.",
  },
  {
    step: "06",
    title: "Maintenance & Service",
    description: "Scheduled and unscheduled maintenance activity is recorded to keep the asset working well.",
  },
  {
    step: "07",
    title: "Warranty Monitoring",
    description: "Warranty status stays visible so repair decisions can be made with full coverage context.",
  },
  {
    step: "08",
    title: "Department Transfer",
    description: "When equipment moves, the allocation is updated so the current location stays accurate.",
  },
  {
    step: "09",
    title: "Reporting",
    description: "Asset data flows into reports used for audits, budgeting and leadership review.",
  },
  {
    step: "10",
    title: "Replacement or Disposal",
    description: "When an asset reaches end of life, its full history supports informed replacement or disposal.",
  },
];

const benefitCards = [
  {
    title: "Complete Asset Visibility",
    description: "Get a clear view of every medical and non-medical asset across departments and branches.",
    icon: Search,
  },
  {
    title: "Improved Equipment Accountability",
    description: "Link assets to specific departments so responsibility is easy to understand.",
    icon: ClipboardList,
  },
  {
    title: "Organised Maintenance Records",
    description: "Keep maintenance and repair activity together so service planning becomes easier.",
    icon: Wrench,
  },
  {
    title: "Simplified Audits",
    description: "Centralised records help internal and regulatory audits move faster with fewer discrepancies.",
    icon: BarChart3,
  },
  {
    title: "Centralised Asset Inventory",
    description: "Replace multiple files and spreadsheets with one dependable inventory system.",
    icon: Layers3,
  },
  {
    title: "Better Department Coordination",
    description: "Biomedical, clinical and facility teams can coordinate equipment usage and transfers more easily.",
    icon: Building2,
  },
  {
    title: "Improved Operational Efficiency",
    description: "Staff spend less time searching for equipment and more time supporting patient care.",
    icon: TrendingUp,
  },
  {
    title: "Organised Documentation",
    description: "Purchase, vendor, warranty and service records stay attached to the same asset profile.",
    icon: FileText,
  },
];

const useCaseCards: CardData[] = [
  {
    title: "Medical Equipment Tracking",
    description: "Track ventilators, defibrillators and monitors across the hospital with department-wise visibility.",
    icon: Package,
  },
  {
    title: "Laboratory Equipment Management",
    description: "Maintain records for laboratory and diagnostic instruments, including service and calibration history.",
    icon: Factory,
  },
  {
    title: "ICU Equipment Tracking",
    description: "Keep critical ICU assets such as ventilators and infusion pumps visible for quick decisions.",
    icon: Building2,
  },
  {
    title: "Radiology Asset Management",
    description: "Manage MRI, CT and X-ray equipment with complete purchase, warranty and service information.",
    icon: Search,
  },
  {
    title: "Operation Theatre Equipment",
    description: "Maintain accurate OT equipment records so readiness checks are faster and more reliable.",
    icon: Wrench,
  },
  {
    title: "Hospital Bed Management",
    description: "Track beds across wards and departments to understand allocation and availability.",
    icon: ClipboardList,
  },
  {
    title: "Biomedical Equipment Records",
    description: "Keep structured records for biomedical equipment, service history and vendor information.",
    icon: FileText,
  },
  {
    title: "Ambulance Equipment Management",
    description: "Track ambulance-mounted equipment such as oxygen concentrators and monitoring devices.",
    icon: Package,
  },
  {
    title: "Department-wise Asset Tracking",
    description: "Review assets department by department to understand distribution across the hospital.",
    icon: MapPinned,
  },
  {
    title: "Multi-Hospital Asset Management",
    description: "Manage assets across multiple locations from one centralised healthcare platform.",
    icon: Layers3,
  },
];

const reasonCards: CardData[] = [
  {
    title: "Easy Asset Registration",
    description: "Add new healthcare assets quickly with clear categories and asset types.",
    icon: ClipboardList,
  },
  {
    title: "QR Code Tracking",
    description: "Generate, print and scan QR Codes for individual assets or in bulk.",
    icon: QrCode,
  },
  {
    title: "Maintenance Records",
    description: "Record servicing and repair activity systematically for every asset.",
    icon: Wrench,
  },
  {
    title: "Warranty Monitoring",
    description: "Track warranty details for each asset so support status is always visible.",
    icon: ShieldCheck,
  },
  {
    title: "Department Visibility",
    description: "See how assets are distributed across departments and branches at a glance.",
    icon: MapPinned,
  },
  {
    title: "Powerful Reports",
    description: "Use built-in reporting to prepare for audits and management reviews with accurate data.",
    icon: BarChart3,
  },
  {
    title: "Centralised Dashboard",
    description: "Bring all hospital asset data into one view for faster decisions.",
    icon: Layers3,
  },
  {
    title: "Easy Adoption",
    description: "A simple interface helps staff and administrators get started without a steep learning curve.",
    icon: Users,
  },
];

const faqItems: FaqData[] = [
  {
    q: "What is healthcare asset management?",
    a: "Healthcare asset management is the process of tracking, organising and maintaining medical and non-medical assets used by hospitals, clinics and laboratories, including registration, department allocation, maintenance and reporting.",
  },
  {
    q: "Why do hospitals need healthcare asset management software?",
    a: "Hospitals manage many devices, instruments and facility assets across multiple departments. Software centralises this information so equipment is easier to locate, maintain and audit.",
  },
  {
    q: "Can I manage hospital equipment using Altroz Asset Management?",
    a: "Yes. Altroz Asset Management lets hospitals register, categorise and track medical and non-medical equipment such as monitors, beds, laboratory instruments and office assets.",
  },
  {
    q: "Can I track medical devices with this platform?",
    a: "Yes. Medical devices can be registered with category and type details, assigned to departments and tracked through QR Codes for quick identification.",
  },
  {
    q: "Can I generate QR Codes for hospital assets?",
    a: "Yes. Altroz Asset Management supports QR Code generation for individual assets and bulk QR creation for larger inventories, along with QR printing and scanning.",
  },
  {
    q: "Can I maintain service and repair records?",
    a: "Yes. Maintenance activity and repair history can be recorded against each asset so teams always have a clear service trail.",
  },
  {
    q: "Can I monitor equipment warranties?",
    a: "Yes. Warranty details can be tracked for every asset, helping hospitals avoid unnecessary repair costs on covered equipment.",
  },
  {
    q: "Can I generate department-wise asset reports?",
    a: "Yes. Reports can be created by department, branch, category and asset type to support audits and management reviews.",
  },
  {
    q: "Can I manage assets across multiple hospital branches?",
    a: "Yes. Healthcare chains with several locations can manage all branches from one centralised platform.",
  },
  {
    q: "Who should use healthcare asset management software?",
    a: "Hospital administrators, biomedical engineers, facility managers, IT managers, procurement teams and finance teams can all benefit from this software.",
  },
  {
    q: "Is this software suitable for diagnostic centres and laboratories?",
    a: "Yes. Diagnostic centres and pathology laboratories can use Altroz Asset Management to track diagnostic instruments, maintenance and warranty details.",
  },
  {
    q: "Can nursing homes and blood banks use this platform?",
    a: "Yes. Any healthcare facility with medical and non-medical assets can use the platform to manage equipment records.",
  },
  {
    q: "How does QR Code asset identification work?",
    a: "Each asset gets a unique QR Code. Scanning it with a mobile device opens the asset details stored in the system.",
  },
  {
    q: "Can I assign assets to specific departments?",
    a: "Yes. Assets can be assigned to departments such as ICU, radiology, laboratory or general wards for clear accountability.",
  },
  {
    q: "Can equipment be transferred between departments?",
    a: "Yes. When equipment moves from one department or branch to another, the assignment can be updated to reflect the current location.",
  },
  {
    q: "Does the platform help during hospital audits?",
    a: "Yes. Centralised asset records and reports make it easier to prepare accurate information for internal or regulatory audits.",
  },
  {
    q: "Can I track non-medical assets as well?",
    a: "Yes. Along with medical equipment, you can track items such as computers, printers, networking devices and furniture.",
  },
  {
    q: "Can I record vendor and purchase information?",
    a: "Yes. Vendor details and purchase information can be stored against each asset for organised procurement history.",
  },
  {
    q: "Does the platform provide a dashboard view of all assets?",
    a: "Yes. A centralised dashboard gives administrators a real-time overview of assets across categories, departments and branches.",
  },
  {
    q: "Can I search and filter assets easily?",
    a: "Yes. Search and filter tools help users find assets by category, department, branch or other recorded details.",
  },
  {
    q: "Is bulk QR Code generation available for large equipment inventories?",
    a: "Yes. Bulk QR Code generation is available and is especially useful during initial setup or large-scale inventory tagging.",
  },
  {
    q: "Can Altroz Asset Management help reduce missing equipment issues?",
    a: "Yes. Department allocation and QR Code identification improve visibility and reduce the chance of misplaced equipment.",
  },
  {
    q: "Does the software support analytics on asset data?",
    a: "Yes. Built-in analytics help hospital leadership understand asset distribution and activity patterns for better planning.",
  },
  {
    q: "Is training required to use Altroz Asset Management?",
    a: "The platform is designed to be intuitive, so hospital staff and administrators can adopt it with minimal training.",
  },
  {
    q: "How can I get started with Altroz Asset Management?",
    a: "Healthcare organisations can book a free demo with Altroz Technologies to see how the platform fits their hospital, clinic or laboratory.",
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

function HealthcareAssetDashboardMock() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="dashboard-glow left-1/2 top-10 -translate-x-1/2" />
      <div className="soft-card relative overflow-hidden rounded-[2rem] border border-border bg-white/95 p-5 shadow-float">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-success/12 text-primary shadow-sm">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
              Healthcare Dashboard
            </div>
            <div className="mt-1 text-lg font-semibold text-ink">
              Equipment, maintenance and warranty status at a glance
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
                ["Assets Registered", "18,420"],
                ["Departments Covered", "42"],
                ["Maintenance Due", "146"],
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
                    ICU, radiology, laboratory and wards in one view
                  </h3>
                </div>
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-4 grid gap-2">
                {["ICU equipment status", "Radiology service schedule", "Lab calibration record", "Ward bed allocation"].map(
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

function SectionCard({
  title,
  description,
  icon: Icon,
  benefit,
}: CardData) {
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

export default function BulkEmailAssetMaintenancePage() {
  return (
    <div className="asset-management-theme asset-management-theme-shell min-h-screen">
      <PageSEO
        title="Healthcare Asset Management Software | Altroz Asset Management"
        description="Manage medical equipment, hospital assets and facility resources from one platform. QR Code tracking, maintenance and warranty management for healthcare teams."
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
                <Building2 className="h-3.5 w-3.5" />
                Healthcare Asset Management Software
              </span>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Manage Every Healthcare Asset from One Centralized Platform
              </h1>
              <p className="mx-auto mt-5 max-w-4xl text-base leading-7 text-ink-soft sm:text-lg">
                Track medical equipment, hospital assets and facility resources with complete visibility.
                Altroz Asset Management helps hospitals, clinics, diagnostic centres and healthcare chains
                register, track and maintain assets from a single centralised platform.
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
                <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:mx-0">
                  One platform keeps medical, facility and IT assets visible across the hospital
                </h2>
                <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg lg:mx-0">
                  Instead of scattered registers and spreadsheets, healthcare teams get one central place
                  to plan maintenance, monitor warranty status, allocate departments and review asset
                  history across branches and facilities.
                </p>
                <div className="mt-7 rounded-[1.5rem] border border-primary/15 bg-gradient-to-br from-primary/6 via-white to-success/6 p-5 text-left">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Healthcare focus
                  </div>
                  <BulletList items={introBullets} />
                </div>
              </ScrollReveal>

              <ScrollReveal variant="scale" className="relative self-start">
                <HealthcareAssetDashboardMock />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="What Is Healthcare Asset Management?"
              title="Hospitals need one system for registering, tracking and maintaining every asset"
              description="Healthcare asset management is the practice of organising medical and non-medical assets so they stay visible, serviceable and ready for use."
              center
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <ScrollReveal variant="fade-up" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Understanding the concept
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  A central record for every asset a healthcare organisation depends on
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  Healthcare asset management covers the registration, organisation, tracking and
                  maintenance of every asset used by a hospital, clinic, laboratory or healthcare chain.
                  It includes high-value medical devices such as MRI machines, CT scanners and ventilators,
                  as well as everyday assets such as computers, printers and furniture.
                </p>
                <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Why this matters
                  </div>
                  <BulletList
                    items={[
                      "Hospitals need fast visibility into where each asset is located and who is using it.",
                      "Maintenance schedules must stay visible to avoid failures during patient care.",
                      "Vendor, warranty and purchase records need to stay connected to the same asset.",
                      "Accurate records make audits and budgeting easier across departments and branches.",
                    ]}
                  />
                </div>
              </ScrollReveal>

              <div className="grid gap-5">
                <ScrollReveal variant="fade-left" className="soft-card p-6">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Why hospitals need centralised management
                  </div>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                    Multi-specialty hospitals cannot rely on disconnected department records
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-ink-soft">
                    Assets move across ICU, radiology, operation theatres, laboratories and general wards.
                    Without a centralised system, each department ends up maintaining its own informal
                    records, which makes it hard for administrators to get a hospital-wide view.
                  </p>
                </ScrollReveal>

                <ScrollReveal variant="fade-left" className="soft-card p-6">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-success">
                    Benefits of digital asset management
                  </div>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                    One digital platform gives every team a reliable source of truth
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-ink-soft">
                    Altroz Asset Management brings every asset record into one place. Each asset can be
                    registered once, tagged with a QR Code, assigned to a department and tracked through
                    its lifecycle so administrators, biomedical engineers and finance teams can work from
                    the same record.
                  </p>
                </ScrollReveal>
              </div>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {healthcareSummaryBullets.map((item) => (
                <article key={item} className="soft-card p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary shadow-sm">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-sm leading-7 text-ink-soft">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Common Healthcare Asset Challenges"
              title="Manual record keeping creates recurring problems in hospitals"
              description="These are the issues healthcare teams commonly face when assets are managed through paper or spreadsheets."
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
              eyebrow="How Altroz Helps"
              title="The platform covers the daily workflows healthcare teams need"
              description="Each capability below addresses a practical need for hospitals, clinics and healthcare chains."
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
              eyebrow="Healthcare Asset Lifecycle"
              title="Every asset moves through a clear lifecycle from purchase to disposal"
              description="Altroz Asset Management supports each stage so the complete history remains visible throughout the asset life."
              center
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
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
              title="Centralised healthcare asset data improves operations and accountability"
              description="These are the practical outcomes hospitals gain when asset records are managed in one system."
              center
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {benefitCards.map((card) => (
                <article key={card.title} className="soft-card h-full p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-success/12 text-primary shadow-sm">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Healthcare Use Cases"
              title="The same platform supports every major hospital workflow"
              description="Different departments need different asset views, but the core requirement is always visibility and control."
              center
            />

            <StaggerReveal step={35} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {useCaseCards.map((card) => (
                <SectionCard key={card.title} {...card} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Why Choose Altroz Asset Management?"
              title="The platform is built for healthcare teams that need control and clarity"
              description="These strengths make the system practical for hospitals, clinics and healthcare chains of different sizes."
              center
            />

            <StaggerReveal step={35} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {reasonCards.map((card) => (
                <SectionCard key={card.title} {...card} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="Quick answers to common questions about healthcare asset management"
              description="Use the answers below to help visitors understand the platform, its coverage and its day-to-day value."
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

        <section className="hero-gradient py-14 scroll-mt-24 sm:py-16 lg:py-20">
          <div className="site-container">
            <div className="rounded-[2rem] border border-border bg-white p-8 shadow-float md:p-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                    Final CTA
                  </div>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                    Simplify Healthcare Asset Management
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-ink-soft">
                    Track medical equipment, laboratory assets, hospital infrastructure and healthcare
                    resources from one centralised platform. Improve visibility, maintenance planning and
                    operational efficiency with Altroz Asset Management.
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
