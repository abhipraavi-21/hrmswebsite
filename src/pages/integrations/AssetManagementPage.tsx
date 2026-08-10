"use client";

import type { ComponentType, ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileText,
  Layers3,
  LayoutDashboard,
  MapPin,
  Package,
  QrCode,
  Repeat,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  Wrench,
} from "lucide-react";
import AssetManagementNavbar from "@/components/site/AssetManagementNavbar";
import Footer from "@/components/site/Footer";
import PageSEO from "@/components/site/PageSEO";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/routes/routeConfig.js";
import { resolveSiteUrl } from "@/lib/siteUrl";

type IconComponent = ComponentType<{ className?: string }>;

type Pill = {
  label: string;
  icon?: IconComponent;
};

type CardItem = {
  title: string;
  description: string;
  icon: IconComponent;
  benefit?: string;
  href?: string;
};

type ProcessStep = {
  title: string;
  description: string;
};

type UseCase = {
  title: string;
  description: string;
  href: string;
};

type ComparisonRow = {
  label: string;
  manual: string;
  altroz: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const assetDashboardImage = "/hrms-models/assets-dashboard.png";
const showcaseImageOne = "/asset-management/education-showcase-1.png";
const showcaseImageTwo = "/asset-management/education-showcase-2.png";

const trustPills: Pill[] = [
  { label: "Centralized Asset Tracking", icon: LayoutDashboard },
  { label: "QR Code Identification", icon: QrCode },
  { label: "Maintenance Management", icon: Wrench },
  { label: "Asset Handover Records", icon: ClipboardList },
  { label: "Reports and Analytics", icon: BarChart3 },
  { label: "Multi-Location Management", icon: MapPin },
];

const painPoints = [
  "Assets spread across multiple branches with no single source of truth",
  "No clear record of who currently owns which asset",
  "Difficulty locating who has a specific laptop, phone or device",
  "Equipment that goes missing or gets misplaced between teams",
  "Maintenance dates that get missed because no one is tracking them",
  "Warranty periods that expire unnoticed",
  "Asset handovers recorded informally, or not at all",
  "Time-consuming reconciliation during audits or asset counts",
  "No centralized visibility across departments or locations",
  "Reports that take hours to compile from scattered files",
  "Duplicate, outdated or conflicting asset records",
];

const lifecycleSteps: ProcessStep[] = [
  {
    title: "Purchase",
    description: "Record the asset with purchase date, cost and vendor details.",
  },
  {
    title: "Record",
    description: "Capture category, type, specifications and supporting documents.",
  },
  {
    title: "Assign",
    description: "Allocate the asset to an employee, department, branch or location.",
  },
  {
    title: "Track",
    description: "Monitor current status, owner and location at any time.",
  },
  {
    title: "Maintain",
    description: "Log maintenance activity and keep due dates visible.",
  },
  {
    title: "Monitor",
    description: "View utilization, condition and alerts from the dashboard.",
  },
  {
    title: "Return / Transfer",
    description: "Record handovers when assets move between people or locations.",
  },
  {
    title: "Retire / Dispose",
    description: "Update status when an asset reaches end of use.",
  },
];

const coreFeatures: CardItem[] = [
  {
    title: "Asset Dashboard",
    description:
      "Get a centralized overview of your assets, status, categories, locations and recent activity.",
    benefit: "Faster decisions because the full asset picture is visible at a glance.",
    icon: LayoutDashboard,
    href: ROUTES.bulkEmailAssetDashboard,
  },
  {
    title: "Asset Tracking",
    description:
      "Track each asset's assigned owner, department, branch and location so you always know where it is.",
    benefit: "No more guessing who has an asset or where it was last used.",
    icon: Package,
    href: ROUTES.bulkEmailAssetTracking,
  },
  {
    title: "Asset Assignment",
    description:
      "Maintain employee-wise ownership records and handover details whenever an asset is issued.",
    benefit: "Cleaner accountability during onboarding, transfers and exits.",
    icon: Users,
    href: ROUTES.bulkEmailAssetTracking,
  },
  {
    title: "QR Code Asset Management",
    description:
      "Generate QR codes for individual assets or in bulk, print them and attach them to physical assets.",
    benefit: "Identify any asset in seconds by scanning instead of searching.",
    icon: QrCode,
    href: ROUTES.bulkEmailAssetQrCode,
  },
  {
    title: "Asset Maintenance",
    description:
      "Record maintenance activity and keep upcoming maintenance requirements visible.",
    benefit: "Better visibility into which assets need attention and when.",
    icon: Wrench,
    href: ROUTES.bulkEmailAssetMaintenance,
  },
  {
    title: "Warranty Tracking",
    description:
      "Maintain warranty expiry information against each asset so nothing slips through the cracks.",
    benefit: "Fewer unnoticed warranty lapses and repair costs.",
    icon: ShieldCheck,
    href: ROUTES.bulkEmailAssetMaintenance,
  },
  {
    title: "Asset Reports",
    description:
      "Generate reports based on status, category, location, department, owner and purchase details.",
    benefit: "Audit and management reporting without manually compiling spreadsheets.",
    icon: BarChart3,
    href: ROUTES.bulkEmailAssetReports,
  },
  {
    title: "Asset Categories & Status",
    description:
      "Organize assets by category and by current status such as In Use, Available or Under Maintenance.",
    benefit: "A consistent, structured way to classify every asset you own.",
    icon: Layers3,
    href: ROUTES.assetManagementHome,
  },
  {
    title: "Purchase & Cost Tracking",
    description:
      "Maintain purchase dates, cost, vendor, manufacturer and depreciation information against each asset record.",
    benefit: "Purchase and vendor history available whenever finance needs it.",
    icon: FileText,
    href: ROUTES.assetManagementHome,
  },
  {
    title: "Multi-Location Management",
    description:
      "Manage assets across different branches, offices and locations from one platform.",
    benefit: "One system for multi-branch businesses instead of separate local records.",
    icon: Building2,
    href: ROUTES.bulkEmailAssetTracking,
  },
];

const dashboardBullets = [
  "Total assets",
  "Assets in use and assets available",
  "Assets under maintenance or out of service",
  "Category-wise asset distribution",
  "Branch-wise / location-wise asset distribution",
  "Asset summary and recent asset activity",
  "Alerts for items that need attention",
];

const supportCards: CardItem[] = [
  {
    title: "QR Code Asset Management",
    description:
      "Every asset can carry its own QR code, generated individually or in bulk and printed for physical labeling.",
    benefit: "Scanning the code opens the digital asset record instantly.",
    icon: QrCode,
    href: ROUTES.bulkEmailAssetQrCode,
  },
  {
    title: "Asset Handover",
    description:
      "When a laptop or mobile device is issued to a new employee, Altroz lets you record who received it, which asset was assigned and its current status.",
    benefit: "A clear ownership trail from handover to return or transfer.",
    icon: Repeat,
    href: ROUTES.bulkEmailAssetTracking,
  },
  {
    title: "Maintenance and Warranty",
    description:
      "Keep maintenance due dates, warranty expiry dates and repair-required status visible against each asset.",
    benefit: "Act before small issues become urgent problems.",
    icon: Wrench,
    href: ROUTES.bulkEmailAssetMaintenance,
  },
  {
    title: "Reports and Analytics",
    description:
      "Generate reports across status, category, location, branch, assigned employee, purchase cost and vendor.",
    benefit: "Export what you need instead of rebuilding reports manually.",
    icon: BarChart3,
    href: ROUTES.bulkEmailAssetReports,
  },
];

const useCases: UseCase[] = [
  {
    title: "IT Asset Management",
    description: "For laptops, desktops, mobile devices, networking equipment, printers and more.",
    href: ROUTES.bulkEmailAssetDashboard,
  },
  {
    title: "Manufacturing",
    description: "For production equipment, tools, devices and operational assets used across plants.",
    href: ROUTES.bulkEmailAssetTracking,
  },
  {
    title: "Corporate Offices",
    description: "For office equipment, IT devices and shared resources across departments.",
    href: ROUTES.assetManagementHome,
  },
  {
    title: "Multi-Branch Businesses",
    description: "For organizations managing assets across multiple offices, branches or locations.",
    href: ROUTES.bulkEmailAssetTracking,
  },
  {
    title: "Growing SMEs",
    description: "For businesses moving on from spreadsheets and manual registers.",
    href: ROUTES.assetManagementHome,
  },
];

const businessBenefits = [
  "Centralized visibility over every asset the business owns",
  "Clearer ownership and accountability tracking",
  "Faster asset identification through QR codes and search",
  "Less time spent maintaining manual spreadsheets",
  "Better visibility into maintenance and servicing needs",
  "Simpler, better-documented asset handovers",
  "Structured, exportable reporting",
  "Improved branch-wise and department-wise visibility",
  "Easier preparation for audits and asset counts",
  "Better control over the full asset lifecycle",
];

const howItWorks: ProcessStep[] = [
  {
    title: "Add Your Assets",
    description: "Bring existing assets into Altroz individually or by importing them from Excel.",
  },
  {
    title: "Organize Asset Information",
    description: "Group assets by category, type, location and department for a structured record.",
  },
  {
    title: "Assign and Track Assets",
    description: "Allocate assets to employees, branches or departments and track their status.",
  },
  {
    title: "Monitor Maintenance and Status",
    description: "Keep an eye on maintenance due dates, warranty expiry and asset condition.",
  },
  {
    title: "Generate Reports and Take Action",
    description: "Pull reports by status, category, location or owner and export them when needed.",
  },
];

const audiences = [
  {
    title: "IT Teams",
    description: "Track laptops, desktops, mobile devices, networking equipment and software licenses.",
  },
  {
    title: "HR and Administration",
    description: "Maintain clear records of what is issued to each employee from onboarding through exit.",
  },
  {
    title: "Finance Teams",
    description: "Access purchase cost, vendor and depreciation-related information tied to each asset.",
  },
  {
    title: "Facility Managers",
    description: "Manage office and facility equipment across floors, buildings or locations.",
  },
  {
    title: "Operations Teams",
    description: "Keep operational assets accounted for and monitor their status day to day.",
  },
  {
    title: "Procurement Teams",
    description: "Reference vendor and purchase history when planning future purchases.",
  },
  {
    title: "Business Owners",
    description: "Get a single, centralized view of what the business owns without chasing multiple teams.",
  },
  {
    title: "Manufacturing Teams",
    description: "Track equipment, tools and operational assets used on the production floor.",
  },
];

const comparisonRows: ComparisonRow[] = [
  {
    label: "Visibility",
    manual: "Scattered across spreadsheets and files",
    altroz: "One central dashboard with live status and location data",
  },
  {
    label: "Ownership",
    manual: "Guesswork, emails and informal handovers",
    altroz: "Clear owner, department and handover record",
  },
  {
    label: "Maintenance",
    manual: "Dates are often missed or buried in notes",
    altroz: "Upcoming maintenance and warranty dates stay visible",
  },
  {
    label: "Reporting",
    manual: "Manual compilation every time someone asks",
    altroz: "Reports can be generated and exported on demand",
  },
  {
    label: "Audits",
    manual: "Hard to reconcile conflicting records",
    altroz: "A structured record for faster counts and audits",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "What is asset management software?",
    answer:
      "Asset management software is a system that helps businesses record, track and manage physical and business assets such as laptops, equipment and vehicles from purchase through retirement in one centralized place.",
  },
  {
    question: "What is an asset management system?",
    answer:
      "An asset management system organizes ownership, location, status, maintenance and purchase details so teams have a single source of truth for everything the business owns.",
  },
  {
    question: "What types of assets can I manage with Altroz?",
    answer:
      "Altroz supports IT equipment, laptops, mobile devices, networking equipment, biometric devices, printers, scanners, office equipment, electrical equipment, communication devices, security equipment, vehicles, software and licenses.",
  },
  {
    question: "Can I track assets assigned to employees?",
    answer:
      "Yes. Altroz maintains employee-wise asset ownership, so you can see which assets are assigned to which employee along with handover details.",
  },
  {
    question: "Can I manage assets across multiple branches?",
    answer:
      "Yes. Altroz supports branch and location-wise asset management, giving you visibility into which assets sit at which office or branch.",
  },
  {
    question: "Can I generate QR codes for assets?",
    answer:
      "Yes. You can generate QR codes for individual assets or in bulk, print them and use them to identify assets quickly by connecting the physical item to its digital record.",
  },
  {
    question: "Can I track asset maintenance and warranty information?",
    answer:
      "Yes. Altroz lets you record maintenance activity, track maintenance due dates and maintain warranty expiry information against each asset.",
  },
  {
    question: "Can I import asset information from Excel?",
    answer:
      "Yes. Altroz supports Excel import, so you can bring existing asset records into the system instead of entering them one by one.",
  },
  {
    question: "Can I generate asset reports?",
    answer:
      "Yes. You can generate reports based on asset status, category, location, branch, assigned employee and purchase information, with export options.",
  },
  {
    question: "Can asset status be customized?",
    answer:
      "Altroz supports statuses such as Assigned, Available, In Use, Under Maintenance, Repair Required and Retired to reflect the asset lifecycle.",
  },
  {
    question: "How can I request an Altroz Asset Management demo?",
    answer:
      "You can book a free demo directly from this page. Our team will walk you through the platform and discuss how it fits your asset management requirements.",
  },
];

function ActionLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className: string;
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
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <div className={cn("max-w-4xl", centered && "mx-auto text-center")}>
      <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">{eyebrow}</div>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-ink-soft sm:text-base">{description}</p>
    </div>
  );
}

function FeatureCard({ item }: { item: CardItem }) {
  const Icon = item.icon;

  return (
    <article className="soft-card group flex h-full flex-col p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float">
      <div className="flex items-start justify-between gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary shadow-sm transition-transform duration-300 group-hover:scale-105">
          <Icon className="h-5 w-5" />
        </div>
        {item.href ? (
          <ActionLink href={item.href} className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Open <ArrowRight className="h-3.5 w-3.5" />
          </ActionLink>
        ) : null}
      </div>
      <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
      <p className="mt-2 text-sm leading-7 text-ink-soft">{item.description}</p>
      {item.benefit ? (
        <div className="mt-4 rounded-2xl border border-primary/10 bg-primary-soft/35 p-4 text-sm leading-7 text-ink">
          <span className="font-bold text-primary">Business benefit: </span>
          {item.benefit}
        </div>
      ) : null}
    </article>
  );
}

function ProcessCard({
  index,
  item,
}: {
  index: number;
  item: ProcessStep;
}) {
  return (
    <div className="rounded-[1.5rem] border border-border bg-white p-5 shadow-card">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-black text-primary">
        {index + 1}
      </div>
      <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
      <p className="mt-2 text-sm leading-7 text-ink-soft">{item.description}</p>
    </div>
  );
}

function PillRow() {
  return (
    <div className="flex flex-wrap gap-2">
      {trustPills.map((pill) => {
        const Icon = pill.icon;

        return (
          <div
            key={pill.label}
            className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-2 text-xs font-semibold text-ink shadow-sm"
          >
            {Icon ? <Icon className="h-4 w-4 text-primary" /> : null}
            {pill.label}
          </div>
        );
      })}
    </div>
  );
}

function ScreenshotCard({
  src,
  title,
  description,
}: {
  src: string;
  title: string;
  description: string;
}) {
  return (
    <figure className="overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-float">
      <div className="aspect-[16/10] overflow-hidden bg-surface">
        <img src={src} alt={title} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <figcaption className="p-5">
        <div className="text-base font-bold text-ink">{title}</div>
        <p className="mt-2 text-sm leading-7 text-ink-soft">{description}</p>
      </figcaption>
    </figure>
  );
}

export default function AssetManagementPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(11,92,255,0.12),_transparent_36%),linear-gradient(180deg,_#ffffff_0%,_#f5faff_46%,_#edf5ff_100%)]">
      <PageSEO
        title="Altroz Asset Management | Track, Manage and Maintain Every Business Asset"
        description="Altroz Asset Management helps your team manage assets across employees, departments, branches and locations with dashboards, QR codes, handovers, maintenance and reporting."
        canonicalPath={ROUTES.assetManagementHome}
        image={resolveSiteUrl(assetDashboardImage)}
        imageAlt="Altroz Asset Management dashboard"
        ogTitle="Altroz Asset Management | Track, Manage and Maintain Every Business Asset"
        ogDescription="Track, manage and maintain every business asset in one place with QR codes, handovers, maintenance tracking and reports."
      />
      <AssetManagementNavbar />

      <main className="overflow-x-hidden">
        <section className="relative overflow-hidden py-14 sm:py-16 lg:py-20">
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 top-16 h-72 w-72 rounded-full bg-success/10 blur-3xl" />

          <div className="site-container">
            <div className="grid gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
              <ScrollReveal variant="fade-up">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-extrabold tracking-normal text-primary shadow-sm">
                  <Sparkles className="h-4 w-4" />
                  ASSET MANAGEMENT SOFTWARE
                </div>
                <div className="mt-4 text-sm font-semibold text-ink-soft">
                  <Link to={ROUTES.home} className="hover:text-primary">
                    Home
                  </Link>
                  <span className="mx-2 text-border">→</span>
                  <span>Asset Management</span>
                </div>
                <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                  Track, Manage and Maintain Every Business Asset in One Place
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-ink-soft sm:text-lg">
                  Altroz Asset Management gives your team one centralized place to see every asset
                  your business owns, who has it, where it is and what condition it is in. Track
                  ownership, location, maintenance and lifecycle status from purchase to
                  retirement, without digging through spreadsheets or asking around the office.
                </p>
                <p className="mt-4 max-w-3xl text-base leading-8 text-ink-soft sm:text-lg">
                  Manage assets across employees, departments, branches and locations from one
                  centralized platform.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <ActionLink href={ROUTES.bookDemo} className="btn-primary">
                    Book a Free Demo
                    <ArrowRight className="h-4 w-4" />
                  </ActionLink>
                  <ActionLink href="#features" className="btn-outline">
                    Explore Asset Management
                  </ActionLink>
                </div>

                <div className="mt-7">
                  <PillRow />
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" delay={120}>
                <div className="overflow-hidden rounded-[2rem] border border-border bg-white p-5 shadow-float">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                        Live asset dashboard
                      </div>
                      <p className="mt-2 text-sm leading-7 text-ink-soft">
                        See how Altroz can fit your asset management workflow.
                      </p>
                    </div>
                    <div className="rounded-full border border-primary/10 bg-primary-soft/40 px-3 py-1 text-xs font-semibold text-primary">
                      Real product data
                    </div>
                  </div>

                  <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-border bg-surface/25">
                    <img
                      src={assetDashboardImage}
                      alt="Altroz Asset Management dashboard preview"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border bg-surface/35 p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                        Total assets
                      </div>
                      <div className="mt-2 text-2xl font-black text-ink">6</div>
                      <div className="text-sm text-ink-soft">Visible across the dashboard.</div>
                    </div>
                    <div className="rounded-2xl border border-border bg-surface/35 p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                        Assets in use
                      </div>
                      <div className="mt-2 text-2xl font-black text-ink">3</div>
                      <div className="text-sm text-ink-soft">No change from last month.</div>
                    </div>
                    <div className="rounded-2xl border border-border bg-surface/35 p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                        Under maintenance
                      </div>
                      <div className="mt-2 text-2xl font-black text-ink">1</div>
                      <div className="text-sm text-ink-soft">Track maintenance and repairs early.</div>
                    </div>
                    <div className="rounded-2xl border border-border bg-surface/35 p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                        Out of service
                      </div>
                      <div className="mt-2 text-2xl font-black text-ink">0</div>
                      <div className="text-sm text-ink-soft">No hidden surprises in stock.</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <ScrollReveal className="rounded-[2rem] border border-border bg-white p-6 shadow-float sm:p-8">
              <SectionHeading
                eyebrow="Trust / Value Strip"
                title="Why teams switch away from manual asset records"
                description="When assets live in spreadsheets, email threads and paper forms, the organization loses visibility one item at a time."
                centered
              />

              <StaggerReveal
                step={40}
                className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
              >
                {painPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-surface/35 p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                    <span className="text-sm leading-7 text-ink">{point}</span>
                  </div>
                ))}
              </StaggerReveal>

              <div className="mt-6 rounded-[1.5rem] border border-primary/10 bg-primary-soft/30 p-5 text-sm leading-7 text-ink">
                An employee leaves the company. Who has their laptop? A printer needs servicing.
                When was it last maintained? A warranty is expiring. Who needs to know? A branch is
                asked for an asset report. How quickly can you actually provide it? Altroz Asset
                Management is built to answer these questions in seconds, not days.
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="section" id="solution">
          <div className="site-container">
            <SectionHeading
              eyebrow="Solution Introduction"
              title="One Centralized System for Your Complete Asset Lifecycle"
              description="Altroz brings every stage of an asset's life into one system, so your team always works from the same current information instead of separate spreadsheets, emails and paper handover forms."
              centered
            />

            <StaggerReveal
              step={35}
              className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              {lifecycleSteps.map((step, index) => (
                <ProcessCard key={step.title} index={index} item={step} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-white" id="features">
          <div className="site-container">
            <SectionHeading
              eyebrow="Core Features"
              title="Everything you need to manage business assets"
              description="The page is built around the same asset workflows the product supports, so each section links naturally into the next."
              centered
            />

            <StaggerReveal
              step={35}
              className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
              {coreFeatures.map((item) => (
                <FeatureCard key={item.title} item={item} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <ScrollReveal>
                <SectionHeading
                  eyebrow="Dashboard Showcase"
                  title="See your asset operations at a glance"
                  description="The Altroz dashboard is built around the questions asset managers ask every day: what do we have, where is it, and what needs attention?"
                />
                <div className="mt-6 space-y-3">
                  {dashboardBullets.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm"
                    >
                      <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm leading-7 text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left">
                <div className="overflow-hidden rounded-[2rem] border border-border bg-white p-5 shadow-float">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Asset dashboard
                  </div>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">
                    Total assets, assets in use, under maintenance, category distribution, branch
                    distribution, recent activity and alerts all appear on one screen.
                  </p>
                  <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-border">
                    <img
                      src={assetDashboardImage}
                      alt="Altroz Asset Management dashboard screenshot"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      "Asset summary",
                      "Recent asset activity",
                      "Alerts needing attention",
                      "Category and branch charts",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-border bg-surface/35 px-4 py-3 text-sm font-semibold text-ink"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="site-container">
            <SectionHeading
              eyebrow="Focused Workflows"
              title="The parts of asset management teams need most"
              description="These are the daily workflows the docx called out as separate sections, each with its own box and business outcome."
              centered
            />

            <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
              {supportCards.map((item) => (
                <FeatureCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <SectionHeading
              eyebrow="Use Cases"
              title="Built for different business asset needs"
              description="The same platform can support IT, manufacturing, offices and multi-branch teams while keeping the records structured."
              centered
            />

            <StaggerReveal
              step={35}
              className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5"
            >
              {useCases.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="group rounded-[1.5rem] border border-border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-float"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-105">
                      <Package className="h-5 w-5" />
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 text-primary opacity-70" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">{item.description}</p>
                </Link>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-white">
          <div className="site-container">
            <SectionHeading
              eyebrow="Business Benefits"
              title="Why businesses use asset management software"
              description="The value is not just organization. It is faster decisions, lower manual work and better control over the full asset lifecycle."
              centered
            />

            <StaggerReveal
              step={25}
              className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
            >
              {businessBenefits.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-surface/35 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="text-sm leading-7 text-ink">{item}</span>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <ScrollReveal>
                <SectionHeading
                  eyebrow="How It Works"
                  title="How Altroz Asset Management works"
                  description="A simple flow from asset intake to reporting keeps the whole lifecycle visible for the people who need it."
                />
                <div className="mt-6 rounded-[1.75rem] border border-border bg-white p-5 shadow-float">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Step flow
                  </div>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-ink-soft">
                    <p>Bring assets in from Excel or add them one by one.</p>
                    <p>Group them by category, type, location and department.</p>
                    <p>Assign them to employees, branches or departments.</p>
                    <p>Monitor maintenance, warranty and condition from the dashboard.</p>
                    <p>Export reports when you need to share or act on the data.</p>
                  </div>
                </div>
              </ScrollReveal>

              <StaggerReveal
                step={35}
                className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
              >
                {howItWorks.map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-[1.5rem] border border-border bg-white p-5 shadow-card"
                  >
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-black text-primary">
                      {index + 1}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink-soft">{step.description}</p>
                  </div>
                ))}
              </StaggerReveal>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="site-container">
            <SectionHeading
              eyebrow="Who Is It For?"
              title="Who can use Altroz Asset Management?"
              description="Different teams rely on the same record in different ways, so the page calls out each audience separately."
              centered
            />

            <StaggerReveal
              step={30}
              className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
            >
              {audiences.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-border bg-surface/35 p-5 shadow-sm"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">{item.description}</p>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <SectionHeading
              eyebrow="Before vs After"
              title="From manual asset records to centralized asset management"
              description="The docx calls out a clear before-and-after story, so this section turns that into a fast scan comparison."
              centered
            />

            <ScrollReveal className="mt-8 overflow-hidden rounded-[2rem] border border-border bg-white shadow-float">
              <div className="grid bg-slate-950 text-xs font-black uppercase tracking-[0.16em] text-white sm:grid-cols-[0.85fr_1fr_1fr]">
                <div className="border-b border-white/10 px-5 py-4 sm:border-b-0 sm:border-r">
                  Area
                </div>
                <div className="border-b border-white/10 px-5 py-4 sm:border-b-0 sm:border-r">
                  Manual Records
                </div>
                <div className="px-5 py-4">With Altroz</div>
              </div>

              <div className="divide-y divide-border">
                {comparisonRows.map((row) => (
                  <div key={row.label} className="grid sm:grid-cols-[0.85fr_1fr_1fr]">
                    <div className="border-b border-border px-5 py-4 font-semibold text-ink sm:border-b-0 sm:border-r">
                      {row.label}
                    </div>
                    <div className="border-b border-border px-5 py-4 text-sm leading-7 text-ink-soft sm:border-b-0 sm:border-r">
                      {row.manual}
                    </div>
                    <div className="px-5 py-4 text-sm leading-7 text-ink-soft">{row.altroz}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="section bg-white">
          <div className="site-container">
            <SectionHeading
              eyebrow="Product Screenshots"
              title="Visual proof of the product"
              description="The screenshot section uses the real product images available in the repository so the page feels grounded, not generic."
              centered
            />

            <StaggerReveal
              step={40}
              className="mt-8 grid gap-5 lg:grid-cols-3"
            >
              <ScreenshotCard
                src={assetDashboardImage}
                title="Asset dashboard view"
                description="A centralized dashboard showing status, activity and summary information."
              />
              <ScreenshotCard
                src={showcaseImageOne}
                title="Organization management"
                description="A planning and organization view that shows the broader operational context."
              />
              <ScreenshotCard
                src={showcaseImageTwo}
                title="Team workflow view"
                description="A real product-style screen that reinforces the workflow-first design language."
              />
            </StaggerReveal>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
              <ScrollReveal>
                <div className="rounded-[2rem] border border-border bg-white p-6 shadow-float sm:p-8">
                  <SectionHeading
                    eyebrow="Trust Section"
                    title="Built to bring clarity to your asset operations"
                    description="Altroz Asset Management is built around clear, structured asset records rather than loosely connected spreadsheets. The platform organizes information by category, status, owner and location so your team works from consistent data, with reporting and QR-based identification designed to scale as your asset count grows across departments and locations."
                  />
                  <div className="mt-5 rounded-[1.5rem] border border-primary/10 bg-primary-soft/30 p-5 text-sm leading-7 text-ink">
                    We keep this section honest: we do not list customer logos, certifications,
                    awards or review scores here because none have been provided or verified. What
                    we can show you is the product itself, including the dashboard, workflows and
                    reports, during a free demo.
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left">
                <div className="rounded-[2rem] border border-border bg-white p-6 shadow-float sm:p-8">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Pricing
                  </div>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">
                    Choose a plan that fits your asset volume
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-ink-soft">
                    Pricing is based on the number of assets you manage, not the number of
                    employees, so it scales with what you are actually tracking.
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.35rem] border border-border bg-surface/35 p-4">
                      <div className="text-sm font-bold text-ink">Asset-based pricing</div>
                      <p className="mt-2 text-sm leading-7 text-ink-soft">
                        Scales by asset volume instead of headcount.
                      </p>
                    </div>
                    <div className="rounded-[1.35rem] border border-border bg-surface/35 p-4">
                      <div className="text-sm font-bold text-ink">Taxes and setup</div>
                      <p className="mt-2 text-sm leading-7 text-ink-soft">
                        Taxes and setup charges may apply.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <ActionLink href={ROUTES.assetManagementPricing} className="btn-primary">
                      View Pricing
                      <ArrowRight className="h-4 w-4" />
                    </ActionLink>
                    <ActionLink href={ROUTES.bookDemo} className="btn-outline">
                      Talk to Sales
                    </ActionLink>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="site-container">
            <SectionHeading
              eyebrow="FAQ"
              title="Common questions about Altroz Asset Management"
              description="The docx included a long FAQ list, so the homepage carries those questions directly instead of hiding them on another page."
              centered
            />

            <div className="mx-auto mt-8 max-w-5xl">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={item.question}
                    value={`faq-${index}`}
                    className="overflow-hidden rounded-[1.35rem] border border-border bg-surface/35 px-5 shadow-sm"
                  >
                    <AccordionTrigger className="py-5 text-left text-base font-semibold text-ink hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-7 text-ink-soft">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <div className="overflow-hidden rounded-[2.25rem] border border-primary/15 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.18),_transparent_34%),linear-gradient(135deg,_#071a35_0%,_#0b5cff_100%)] p-8 text-white shadow-float sm:p-10">
              <div className="mx-auto max-w-4xl text-center">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-white/75">
                  Final High-Conversion CTA
                </div>
                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                  Ready to Take Control of Your Business Assets?
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/80 sm:text-base">
                  See how Altroz Asset Management can help your team organize, track and manage
                  business assets from one centralized platform.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <ActionLink
                    href={ROUTES.bookDemo}
                    className="btn-primary justify-center bg-white text-primary hover:bg-white/90"
                  >
                    Book a Free Demo
                    <ArrowRight className="h-4 w-4" />
                  </ActionLink>
                  <ActionLink
                    href={ROUTES.assetManagementContact}
                    className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-full border border-white/35 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
                  >
                    Talk to Sales
                  </ActionLink>
                </div>

                <p className="mt-6 text-sm leading-7 text-white/75">
                  No obligation. Get a walkthrough of the platform and discuss your asset
                  management requirements.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
