"use client";

import type { ComponentType } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  FileText,
  Factory,
  Laptop,
  Layers3,
  MapPinned,
  Package,
  QrCode,
  RotateCcw,
  ScanSearch,
  Search,
  ShieldCheck,
  Smartphone,
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
  { label: "QR Codes Generated", value: "12,480" },
  { label: "Assets Scanned", value: "9,824" },
  { label: "Bulk Labels", value: "2,154" },
  { label: "Audit Checks", value: "146" },
];

const quickLinks = [
  { label: "Asset Dashboard", href: ROUTES.bulkEmailAssetDashboard },
  { label: "Asset Management", href: ROUTES.bulkEmailAssetManagement },
  { label: "Asset Tracking", href: ROUTES.bulkEmailAssetTracking },
  { label: "Asset Maintenance", href: ROUTES.bulkEmailAssetMaintenance },
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
    title: "Manual Asset Identification",
    description: "Without a unique identity, staff rely on memory, guesswork or serial numbers.",
    icon: Search,
  },
  {
    title: "Time-Consuming Audits",
    description: "Audits slow down when teams must physically check and cross-verify every item.",
    icon: ScanSearch,
  },
  {
    title: "Wrong Asset Allocation",
    description: "If the asset is not linked to a person or department, ownership becomes unclear.",
    icon: Users,
  },
  {
    title: "Duplicate Asset Records",
    description: "Manual entry across registers increases the chance of duplicate or conflicting records.",
    icon: FileText,
  },
  {
    title: "Paper-Based Registers",
    description: "Paper logs are hard to search, easy to lose and impossible to update in real time.",
    icon: BookOpenIcon,
  },
  {
    title: "Slow Maintenance Verification",
    description: "Teams waste time hunting through files when maintenance history is not linked.",
    icon: Wrench,
  },
  {
    title: "Difficulty Finding Details",
    description: "Purchase, warranty and vendor data often live in separate places and waste time.",
    icon: Search,
  },
  {
    title: "Human Errors",
    description: "Manual entry makes it easy to introduce typing mistakes, missed updates and inconsistencies.",
    icon: ShieldCheck,
  },
];

const featureCards: CardData[] = [
  {
    title: "QR Code Generation",
    description: "Create a unique QR Code for every registered asset.",
    icon: QrCode,
    benefit: "Every asset gets a permanent digital identity.",
  },
  {
    title: "Bulk QR Code Generation",
    description: "Generate QR Codes for hundreds or thousands of assets together.",
    icon: Layers3,
    benefit: "Saves significant time for large inventories.",
  },
  {
    title: "Bulk QR Printing",
    description: "Print multiple QR labels in one action for quick rollout.",
    icon: FileText,
    benefit: "Keeps the labelling process consistent.",
  },
  {
    title: "QR Code Scanning",
    description: "Scan a QR Code with a mobile device to open the asset record instantly.",
    icon: Smartphone,
    benefit: "Reduces lookup time from minutes to seconds.",
  },
  {
    title: "Asset Identification",
    description: "Every scan reveals the exact asset identity, including category and type.",
    icon: Package,
    benefit: "Removes confusion when assets look alike.",
  },
  {
    title: "Asset Assignment",
    description: "Link each asset to the right employee, department or branch.",
    icon: Users,
    benefit: "Improves accountability for every item.",
  },
  {
    title: "Employee & Department Mapping",
    description: "Show who is using the asset directly after the QR scan.",
    icon: Building2,
    benefit: "Simplifies audits and movement tracking.",
  },
  {
    title: "Branch Mapping",
    description: "Map assets to specific business branches or locations.",
    icon: MapPinned,
    benefit: "Supports multi-location visibility.",
  },
  {
    title: "Instant Asset Details",
    description: "Display status, category and specifications on scan.",
    icon: BarChart3,
    benefit: "Cuts down on spreadsheet searching.",
  },
  {
    title: "Asset History",
    description: "View the full journey of assignments, status changes and maintenance.",
    icon: RotateCcw,
    benefit: "Provides a transparent audit trail.",
  },
  {
    title: "Search & Filters",
    description: "Find assets by category, type, status, branch or department.",
    icon: Search,
    benefit: "Locates items without scrolling an entire inventory.",
  },
  {
    title: "Reports Integration",
    description: "Generate reports directly from QR-linked asset data.",
    icon: FileText,
    benefit: "Gives management ready-to-use insights.",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Register Asset",
    description:
      "Add the asset to Altroz Asset Management with category, type, purchase information and vendor details.",
  },
  {
    step: "02",
    title: "Generate QR Code",
    description: "Create a unique QR Code that permanently links the physical item to its digital record.",
  },
  {
    step: "03",
    title: "Print & Attach QR Label",
    description:
      "Print the QR Code as a label, individually or in bulk, and attach it to the asset.",
  },
  {
    step: "04",
    title: "Scan QR Code",
    description:
      "Any authorised employee can scan the QR Code using a mobile device whenever they need to verify the asset.",
  },
  {
    step: "05",
    title: "View Complete Asset Information",
    description:
      "The scan opens the asset profile with category, assignment, purchase details, warranty and maintenance records.",
  },
  {
    step: "06",
    title: "Update Status or Maintenance",
    description:
      "Teams can change status, reassign the item or log maintenance directly after scanning.",
  },
  {
    step: "07",
    title: "Generate Reports",
    description:
      "QR-based activity flows directly into reports for management review and audits.",
  },
];

const benefits = [
  {
    title: "Faster Asset Identification",
    description: "Employees identify any asset within seconds instead of searching manually.",
  },
  {
    title: "Reduced Manual Work",
    description: "QR Codes reduce the effort involved in paper-based or spreadsheet records.",
  },
  {
    title: "Improved Accuracy",
    description: "Data is pulled from the centralised system after each scan, reducing errors.",
  },
  {
    title: "Simplified Audits",
    description: "Auditors can scan each item to confirm identity, status and assignment quickly.",
  },
  {
    title: "Quick Maintenance Verification",
    description: "Service history is immediately visible before scheduling the next action.",
  },
  {
    title: "Better Asset Accountability",
    description: "Employee, department and branch ownership stays clear at all times.",
  },
  {
    title: "Centralized Asset Records",
    description: "All asset information lives in one cloud platform accessible from anywhere.",
  },
  {
    title: "Improved Operational Efficiency",
    description: "Teams spend less time on admin and more time on actual work.",
  },
];

const industryCards: CardData[] = [
  {
    title: "Manufacturing",
    description: "Label machinery, tools and equipment for shop-floor identification and maintenance tracking.",
    icon: Factory,
  },
  {
    title: "Healthcare",
    description: "Identify medical equipment, track assignment across departments and keep service records current.",
    icon: Building2,
  },
  {
    title: "IT Companies",
    description: "Tag laptops, servers and networking equipment to simplify employee and department audits.",
    icon: Laptop,
  },
  {
    title: "Educational Institutions",
    description: "Label lab equipment, computers and furniture across campuses and classrooms.",
    icon: Users,
  },
  {
    title: "Retail",
    description: "Track store equipment, fixtures and electronic devices across multiple outlets.",
    icon: Package,
  },
  {
    title: "Warehouses",
    description: "Attach QR Codes to equipment, racks and handling machinery for quick audits.",
    icon: Layers3,
  },
  {
    title: "Construction",
    description: "Track tools and machinery across sites and locations.",
    icon: Wrench,
  },
  {
    title: "Hospitality",
    description: "Keep records for furniture, appliances and equipment across properties.",
    icon: Building2,
  },
  {
    title: "Corporate Offices",
    description: "Tag laptops, furniture and office equipment with scannable labels.",
    icon: ClipboardListIcon,
  },
  {
    title: "Government Organizations",
    description: "Maintain transparent, centralised asset records for audits and compliance.",
    icon: ShieldCheck,
  },
];

const screenCards: CardData[] = [
  {
    title: "QR Code Generator",
    description: "Create a unique QR Code for an individual asset after registration.",
    icon: QrCode,
    benefit: "Permanent digital identity from day one.",
  },
  {
    title: "Bulk QR Generator",
    description: "Generate QR Codes for multiple assets in a single action.",
    icon: Layers3,
    benefit: "Digitises large inventories faster.",
  },
  {
    title: "QR Print Screen",
    description: "Print QR labels individually or in bulk for attachment to assets.",
    icon: FileText,
    benefit: "Keeps labelling organised and consistent.",
  },
  {
    title: "Asset Scanner",
    description: "Scan a QR Code on mobile and retrieve asset details instantly.",
    icon: Smartphone,
    benefit: "Field staff can access records without a desktop.",
  },
  {
    title: "Asset Details",
    description: "A full profile with category, type, status, purchase information and specifications.",
    icon: BarChart3,
    benefit: "Single source of truth for every asset.",
  },
  {
    title: "Assignment Screen",
    description: "Assign or reassign an asset to an employee, department or branch.",
    icon: Users,
    benefit: "Improves accountability and ownership clarity.",
  },
  {
    title: "Maintenance History",
    description: "A timeline of maintenance activities recorded against an asset.",
    icon: Wrench,
    benefit: "Helps teams make informed maintenance decisions.",
  },
  {
    title: "Reports",
    description: "Structured reports summarise asset data for management.",
    icon: FileText,
    benefit: "Management gets asset insights without manual prep.",
  },
];

const whyChooseCards: CardData[] = [
  {
    title: "Easy QR Code Generation",
    description: "Create unique QR Codes in a few steps without technical expertise.",
    icon: QrCode,
  },
  {
    title: "Bulk QR Printing",
    description: "Print labels for large asset volumes quickly and consistently.",
    icon: FileText,
  },
  {
    title: "Simple Asset Identification",
    description: "Every asset becomes instantly identifiable through a quick scan.",
    icon: Search,
  },
  {
    title: "Centralized Records",
    description: "All asset information sits on one cloud platform for authorised users.",
    icon: ShieldCheck,
  },
  {
    title: "Employee & Department Assignment",
    description: "Link assets to the right people and teams and keep it updated through the QR record.",
    icon: Users,
  },
  {
    title: "Maintenance History",
    description: "Keep every maintenance activity searchable and tied to the asset.",
    icon: Wrench,
  },
  {
    title: "Powerful Reports",
    description: "Generate reports directly from asset data to support decisions.",
    icon: BarChart3,
  },
  {
    title: "Business Ready Platform",
    description: "Built for SMEs and enterprises across multiple industries.",
    icon: Building2,
  },
];

const faqItems: Faq[] = [
  {
    q: "What is QR Code Asset Management?",
    a: "QR Code Asset Management is a method of tracking and managing physical business assets by assigning each asset a unique QR Code. When the code is scanned, it instantly displays the asset's details from a centralised digital platform.",
  },
  {
    q: "How do QR Codes help manage assets?",
    a: "QR Codes act as a digital identity for each asset. Instead of manually searching a register or spreadsheet, employees simply scan the code to view category, assignment, status and history.",
  },
  {
    q: "Can I generate QR Codes in bulk?",
    a: "Yes. Altroz Asset Management supports bulk QR Code generation so businesses can create codes for many assets together.",
  },
  {
    q: "Can I print QR labels?",
    a: "Yes. The platform supports both individual and bulk QR label printing so labels can be attached as soon as assets are registered.",
  },
  {
    q: "Can I scan QR Codes using a mobile device?",
    a: "Yes. Assets can be scanned using a mobile device through the QR Code scanning interface.",
  },
  {
    q: "What information is linked to a QR Code?",
    a: "A QR Code is linked to the asset's category, type, status, assignment, purchase information, vendor details, warranty information and maintenance history.",
  },
  {
    q: "Can QR Codes be used for maintenance records?",
    a: "Yes. Scanning an asset's QR Code gives access to its maintenance history so teams can verify past service activity.",
  },
  {
    q: "Can I assign QR-coded assets to employees?",
    a: "Yes. Assets can be assigned to employees, departments or branches and accessed through the QR Code record.",
  },
  {
    q: "Can QR Codes simplify audits?",
    a: "Yes. During an audit, staff can scan each QR Code to instantly verify identity, status and assignment.",
  },
  {
    q: "Who should use QR Code Asset Management?",
    a: "Any business that manages physical assets, including manufacturing, healthcare, education, retail, warehouses, construction, corporate offices and government organizations, can benefit.",
  },
  {
    q: "Is QR Code Asset Management suitable for small businesses?",
    a: "Yes. It scales well for SMEs and for larger organisations managing thousands of assets across multiple locations.",
  },
  {
    q: "How is QR Code Asset Management different from manual asset registers?",
    a: "Unlike manual registers, QR Code Asset Management allows instant identification and real-time access through a simple scan.",
  },
  {
    q: "Do I need special hardware to scan QR Codes?",
    a: "No. A standard mobile device with a camera is enough to scan QR Codes through Altroz Asset Management.",
  },
  {
    q: "Can QR Codes help reduce duplicate asset records?",
    a: "Yes. Since every asset is registered once and receives a unique QR Code, duplicate records are reduced.",
  },
  {
    q: "Can I search for assets within the platform?",
    a: "Yes. Search and filter options let you find assets by category, type, status, branch or department.",
  },
  {
    q: "Can QR Codes be attached to any type of asset?",
    a: "Yes. QR Code labels can be generated for equipment, machinery, furniture and electronic devices.",
  },
  {
    q: "Does the platform store purchase and vendor details?",
    a: "Yes. Purchase and vendor information can be recorded against each asset and accessed through its QR Code.",
  },
  {
    q: "Can I track an asset's complete history?",
    a: "Yes. The platform maintains a detailed asset history, including assignments, status changes and maintenance records.",
  },
  {
    q: "Can assets be mapped to specific branches?",
    a: "Yes. Assets can be mapped to branches for centralised, location-wise visibility.",
  },
  {
    q: "What happens if an asset's QR label is damaged?",
    a: "If a QR label is damaged, a new label can be generated and printed again for the same asset record.",
  },
  {
    q: "Can reports be generated from QR-linked asset data?",
    a: "Yes. Reports can be generated directly from data collected through registration, scanning and updates.",
  },
  {
    q: "Is QR Code Asset Management useful for internal audits?",
    a: "Yes. QR Codes make internal audits faster and more accurate by allowing auditors to verify each asset with a scan.",
  },
  {
    q: "Can multiple departments use the same platform?",
    a: "Yes. Assets can be mapped to different departments, giving each team visibility into the items assigned to them.",
  },
  {
    q: "How does QR Code Asset Management improve accountability?",
    a: "By linking each asset to a specific employee, department or branch, the platform makes responsibility clear at all times.",
  },
  {
    q: "How do I get started with QR Code Asset Management?",
    a: "You can get started by booking a free demo with Altroz Asset Management, where the team will walk you through setup and QR generation.",
  },
];

function BookOpenIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 6.5C4 5.12 5.12 4 6.5 4H20v15.5H6.5C5.12 19.5 4 18.38 4 17V6.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M4 6.5C4 5.12 5.12 4 6.5 4H10v15.5H6.5C5.12 19.5 4 18.38 4 17V6.5Z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ClipboardListIcon({ className }: { className?: string }) {
  return <FileText className={className} aria-hidden="true" />;
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

function QrAssetMock() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="dashboard-glow left-1/2 top-10 -translate-x-1/2" />
      <div className="soft-card relative overflow-hidden rounded-[2rem] border border-border bg-white/95 p-5 shadow-float">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-success/12 text-primary shadow-sm">
            <QrCode className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
              QR Asset Scanner
            </div>
            <div className="mt-1 text-lg font-semibold text-ink">
              Scan label to open the full asset profile
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
                ["Generated", "12,480"],
                ["Printed", "11,904"],
                ["Scanned", "9,824"],
                ["Assigned", "8,901"],
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
                    Scan result
                  </div>
                  <h3 className="mt-1 text-base font-semibold text-ink">
                    Instant access to status, assignment and history
                  </h3>
                </div>
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-4 grid gap-2">
                {[
                  "Asset identity",
                  "Current owner",
                  "Location and branch",
                  "Maintenance history",
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

export default function BulkEmailAssetQrCodePage() {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="QR Code Asset Management Software | Altroz Asset Mgmt"
        description="Identify, assign and track every business asset using QR Codes. Generate, print and scan QR labels with Altroz Asset Management."
        canonicalPath={ROUTES.bulkEmailAssetQrCode}
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
                <Package className="h-3.5 w-3.5" />
                QR Code Asset Management
              </span>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Identify Every Asset Instantly with Smart QR Code Labels
              </h1>
              <p className="mx-auto mt-5 max-w-4xl text-base leading-7 text-ink-soft sm:text-lg">
                Altroz Asset Management helps businesses organise, assign, verify and manage physical
                assets using QR Codes from one centralised cloud platform. Generate unique QR Codes,
                print labels in bulk and scan any asset with a mobile device to instantly view its
                complete details, assignment and history.
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
                  QR labels connect physical assets to live digital records
                </h2>
                <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg lg:mx-0">
                  QR Codes bridge the gap between physical assets and digital information. Instead of
                  reading tags with limited text, a quick scan opens the full record with category,
                  assignment, status, purchase details, warranty and maintenance history.
                </p>
                <div className="mt-7 rounded-[1.5rem] border border-primary/15 bg-gradient-to-br from-primary/6 via-white to-success/6 p-5 text-left">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    QR Label Journey
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {["Asset tag", "QR label", "Mobile scan", "Digital profile"].map((item, index) => (
                      <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                          {String(index + 1)}
                        </span>
                        <span className="text-sm text-ink">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="scale" className="relative self-start">
                <QrAssetMock />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="What is QR Code Asset Management?"
              title="A digital identity that links each physical asset to a live central record"
              description="The QR code becomes the asset's digital identity, helping teams verify details from a mobile scan instead of searching spreadsheets."
              center
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
              <ScrollReveal variant="fade-up" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Understanding the concept
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  QR Codes make assets searchable, scannable and always up to date
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  QR Code Asset Management is the practice of identifying, organising and tracking
                  physical business assets by assigning each asset a unique QR Code that instantly
                  retrieves the asset's complete information from a centralised digital platform.
                </p>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  A QR Code bridges the gap between a physical item and the live digital record. As
                  assignments, status or maintenance details change, the central record stays current.
                </p>
                <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Why businesses use QR Codes
                  </div>
                  <BulletList
                    items={[
                      "Instead of manual searches, teams scan the code to see the asset record.",
                      "Facility managers can check warranty or maintenance status in seconds.",
                      "IT teams can confirm which employee a laptop is assigned to immediately.",
                      "The record stays accurate even as assignments and status change.",
                    ]}
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Centralised visibility
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  QR labels improve identification, audits and operational control
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  Compared to manual asset labelling, QR Code labelling connects each asset directly to a
                  digital record that can be updated in real time.
                </p>
                <BulletList
                  items={[
                    "Removes the need to manually search through paper or spreadsheets",
                    "Keeps asset information accurate after every change",
                    "Makes audits and handovers faster and easier",
                    "Improves visibility across the organisation",
                  ]}
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Challenges Without QR Codes"
              title="Manual identification creates avoidable confusion and delays"
              description="The absence of QR labels and a central system makes recurring tracking problems much harder to avoid."
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
              eyebrow="Core QR Code Features"
              title="The platform includes the full set of QR-based asset capabilities"
              description="These features simplify how businesses identify, assign and manage physical assets."
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
              eyebrow="How QR Code Asset Management Works"
              title="A simple workflow takes an asset from registration to reporting"
              description="The workflow keeps every QR-linked asset connected to the same live record."
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
              title="QR-based tracking improves speed, accuracy and accountability"
              description="These are the measurable outcomes teams get when QR labels become part of the workflow."
              center
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {benefits.map((item) => (
                <article key={item.title} className="soft-card h-full p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-success/12 text-primary shadow-sm">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Industry Use Cases"
              title="QR Code Asset Management adapts to different industries"
              description="The same QR-based workflow works well across many business environments."
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
              eyebrow="Product Screens"
              title="These screens show how QR Asset Management works in the platform"
              description="Each screen captures one part of the QR workflow, from creation to reporting."
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
              title="The platform is built for easy QR tracking at scale"
              description="These strengths make the system practical for both growing teams and larger enterprises."
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
              title="Common questions about QR Code Asset Management"
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
                    Manage Every Asset Smarter with QR Codes
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-ink-soft">
                    Generate, print, scan and manage QR Code labels for your business assets. Improve asset
                    visibility, simplify audits and keep accurate records with Altroz Asset Management.
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
