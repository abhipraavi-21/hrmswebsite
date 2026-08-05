"use client";

import type { ComponentType, ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  CheckCircle2,
  ClipboardList,
  Cpu,
  Factory,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Layers3,
  LibraryBig,
  MapPinned,
  Package,
  QrCode,
  ScanSearch,
  ShieldCheck,
  Smartphone,
  Sparkles,
  SquareKanban,
  TrendingUp,
  Truck,
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

const overviewBullets = [
  "Schools, colleges and universities often own thousands of assets across classrooms, labs, libraries and offices.",
  "Paper registers and spreadsheets are difficult to update, search and verify during audits.",
  "A centralized system gives administrators, IT teams and facility managers one reliable source of truth.",
];

const challengeCards: CardData[] = [
  {
    title: "Missing Classroom Equipment",
    description: "Projectors, smart boards and digital panels move between rooms and are hard to locate without tracking.",
    icon: ScanSearch,
  },
  {
    title: "Lost IT Devices",
    description: "Laptops, desktops and staff devices are often assigned informally and not always returned properly.",
    icon: Smartphone,
  },
  {
    title: "Manual Asset Registers",
    description: "Paper or spreadsheet registers are updated inconsistently and become hard to search across campuses.",
    icon: FileText,
  },
  {
    title: "Laboratory Tracking Issues",
    description: "Science and medical laboratory instruments need careful handling, calibration and usage records.",
    icon: Wrench,
  },
  {
    title: "Library Asset Management Challenges",
    description: "Library equipment is often managed separately, making it difficult to see the full campus picture.",
    icon: LibraryBig,
  },
  {
    title: "Maintenance Delays",
    description: "Without reminders, equipment like ACs, generators and lab devices are often maintained reactively.",
    icon: Wrench,
  },
  {
    title: "Warranty Tracking Problems",
    description: "Warranty documents for computers and equipment are misplaced, leading to avoidable repair costs.",
    icon: ShieldCheck,
  },
  {
    title: "Campus Audit Difficulties",
    description: "Physical verification becomes time-consuming when records are scattered across departments and formats.",
    icon: ClipboardList,
  },
];

const capabilityCards: CardData[] = [
  {
    title: "Centralized Campus Asset Register",
    description:
      "Record all classroom, laboratory, library, IT and campus assets in one digital register organized by type and department.",
    icon: ClipboardList,
    benefit: "One reliable source of truth replaces separate registers.",
  },
  {
    title: "QR Code Asset Identification",
    description:
      "Tag every asset with a unique QR Code and scan it for instant details instead of manually checking records.",
    icon: QrCode,
    benefit: "Staff can identify and verify assets quickly across campus.",
  },
  {
    title: "Department & Campus Assignment",
    description:
      "Assign assets to classrooms, departments, laboratories or campus branches so ownership and location stay clear.",
    icon: MapPinned,
    benefit: "Institutions always know which unit is responsible for each item.",
  },
  {
    title: "Laboratory Equipment Management",
    description:
      "Maintain purchase, vendor, repair and usage history for laboratory instruments in a structured way.",
    icon: Factory,
    benefit: "Lab managers get better control over sensitive equipment.",
  },
  {
    title: "Library Asset Tracking",
    description:
      "Track library computers, scanners and audio-visual devices alongside other campus assets.",
    icon: LibraryBig,
    benefit: "Library managers gain better visibility into equipment condition.",
  },
  {
    title: "Maintenance Scheduling",
    description:
      "Log maintenance and repair activities for assets like air conditioners, generators and lab devices.",
    icon: Wrench,
    benefit: "Teams can plan servicing proactively instead of reacting to breakdowns.",
  },
  {
    title: "Warranty Monitoring",
    description:
      "Store warranty information with each asset so coverage can be checked before repair costs are approved.",
    icon: ShieldCheck,
    benefit: "Institutions avoid paying for repairs that should be covered.",
  },
  {
    title: "Vendor & Purchase Records",
    description:
      "Link purchase information and vendor details to each asset for a complete procurement history.",
    icon: FileText,
    benefit: "Finance and procurement teams can review records quickly.",
  },
  {
    title: "Campus Reports",
    description:
      "Generate reports filtered by category, department, campus or asset status to support leadership reviews and audits.",
    icon: BarChart3,
    benefit: "Reports are ready when internal or external audits arrive.",
  },
  {
    title: "Dashboard Analytics",
    description:
      "See asset counts, categories and status across departments and campuses in a visual dashboard.",
    icon: LayoutDashboard,
    benefit: "Administrators get a real-time overview without manual compilation.",
  },
];

const lifecycleSteps: StepData[] = [
  {
    step: "01",
    title: "Purchase Asset",
    description: "The institution purchases a desktop, projector or laboratory instrument from an approved vendor.",
  },
  {
    step: "02",
    title: "Register Asset",
    description: "The asset is added to the register with category, purchase information and vendor details.",
  },
  {
    step: "03",
    title: "Generate QR Code",
    description: "A unique QR Code is generated for the asset individually or in bulk for large purchases.",
  },
  {
    step: "04",
    title: "Assign Classroom / Department / Laboratory",
    description: "The asset is assigned to the right classroom, department, lab or campus branch.",
  },
  {
    step: "05",
    title: "Daily Usage",
    description: "The asset is used in day-to-day academic or administrative work such as lessons or lab sessions.",
  },
  {
    step: "06",
    title: "Maintenance & Repairs",
    description: "Routine maintenance and repair activity is logged to build a complete service history.",
  },
  {
    step: "07",
    title: "Warranty Tracking",
    description: "Warranty details are monitored so repair decisions can be made with full coverage visibility.",
  },
  {
    step: "08",
    title: "Transfer Between Departments",
    description: "If an asset moves, the transfer is recorded and the assignment is updated immediately.",
  },
  {
    step: "09",
    title: "Reports",
    description: "Reports are generated to review asset status, distribution and history for audits or reviews.",
  },
  {
    step: "10",
    title: "Replacement or Disposal",
    description: "When an asset reaches the end of its life, its history supports informed disposal or replacement.",
  },
];

const benefitCards = [
  "Complete Campus Asset Visibility",
  "Improved Accountability",
  "Organized Asset Documentation",
  "Simplified Audits",
  "Better Maintenance Planning",
  "Reduced Asset Loss",
  "Department-wise Asset Visibility",
  "Centralized Asset Inventory",
];

const useCaseCards: CardData[] = [
  {
    title: "Computer Lab Management",
    description:
      "Register desktops and laptops in a lab, assign them to the room or department and track maintenance history over time.",
    icon: Cpu,
  },
  {
    title: "Smart Classroom Tracking",
    description:
      "Track projectors, smart boards and digital panels assigned to classrooms, with QR Codes for quick identification.",
    icon: SquareKanban,
  },
  {
    title: "Laboratory Equipment Management",
    description:
      "Maintain organised records of science, engineering and medical laboratory equipment, including repair history.",
    icon: Factory,
  },
  {
    title: "Library Equipment Tracking",
    description:
      "Track library computers, scanners and audio-visual equipment alongside other library assets in one system.",
    icon: LibraryBig,
  },
  {
    title: "Sports Equipment Management",
    description:
      "Register sports equipment and musical instruments used across the institution and assign them to the right activity.",
    icon: Package,
  },
  {
    title: "Office Asset Management",
    description:
      "Manage administrative office assets such as furniture, printers and staff devices used by non-teaching staff.",
    icon: Building2,
  },
  {
    title: "Hostel Asset Management",
    description:
      "Track furniture, appliances and equipment allocated to hostel facilities with block-wise assignment.",
    icon: Building2,
  },
  {
    title: "Faculty Device Management",
    description:
      "Maintain records of laptops and devices issued to teaching and non-teaching staff, including return history.",
    icon: Users,
  },
  {
    title: "Campus Infrastructure Tracking",
    description:
      "Track infrastructure assets such as air conditioners, generators, UPS systems and networking equipment.",
    icon: Truck,
  },
  {
    title: "Multi-Campus Asset Management",
    description:
      "Assign and track assets separately by campus while maintaining one centralized register.",
    icon: Layers3,
  },
];

const screenCards: CardData[] = [
  {
    title: "Campus Dashboard",
    description: "A summary view of total assets, categories and status across departments and campuses.",
    icon: BarChart3,
    benefit: "Leadership gets a quick, real-time overview.",
  },
  {
    title: "Asset Register",
    description: "A searchable, filterable list of all registered assets with category and assignment details.",
    icon: ClipboardList,
    benefit: "Makes it easy to locate any asset within seconds.",
  },
  {
    title: "QR Code Generator",
    description: "A screen for generating individual or bulk QR Codes for new or existing assets.",
    icon: QrCode,
    benefit: "Speeds up tagging for large batches of equipment.",
  },
  {
    title: "Department Assignment",
    description: "An interface to assign or reassign assets to departments, classrooms or campus branches.",
    icon: MapPinned,
    benefit: "Keeps ownership records accurate as assets move.",
  },
  {
    title: "Maintenance Records",
    description: "A log of maintenance and repair activities recorded against each asset.",
    icon: Wrench,
    benefit: "Helps facility managers track recurring issues.",
  },
  {
    title: "Warranty Details",
    description: "A record of warranty information linked to individual assets.",
    icon: ShieldCheck,
    benefit: "Allows staff to verify coverage before repair costs are approved.",
  },
  {
    title: "Reports",
    description: "A reporting screen to generate asset reports by category, department or campus.",
    icon: BarChart3,
    benefit: "Supports faster and more organised audits.",
  },
  {
    title: "Analytics Dashboard",
    description: "A visual analytics view summarising asset distribution and trends.",
    icon: TrendingUp,
    benefit: "Helps administrators make informed allocation decisions.",
  },
];

const showcaseImages = [
  {
    src: "/asset-management/education-showcase-1.png",
    alt: "Educational institution team collaborating on planning and organization",
    label: "Visual 01",
    title: "Structured collaboration for campus planning",
    description: "Use this image to show how teams coordinate around asset planning, ownership and reporting.",
  },
  {
    src: "/asset-management/education-showcase-2.png",
    alt: "Team discussing organization management in a modern office setting",
    label: "Visual 02",
    title: "A broader view of organization management",
    description: "Use this larger landscape image as a strong secondary visual for the educational institution page.",
  },
];

const reasonCards: CardData[] = [
  {
    title: "Simple Asset Registration",
    description:
      "Add assets quickly with clear categories and types designed around real educational environments.",
    icon: ClipboardList,
  },
  {
    title: "QR Code Tracking",
    description:
      "Individual and bulk QR Code generation, printing and scanning makes identification fast and reliable.",
    icon: QrCode,
  },
  {
    title: "Maintenance Records",
    description:
      "Every maintenance and repair activity is logged against the relevant asset, building complete service history.",
    icon: Wrench,
  },
  {
    title: "Warranty Tracking",
    description:
      "Warranty information is stored alongside each asset, helping institutions avoid unnecessary repair costs.",
    icon: ShieldCheck,
  },
  {
    title: "Department & Campus Visibility",
    description:
      "Assets can be viewed and filtered by department or campus branch for single or multi-location institutions.",
    icon: MapPinned,
  },
  {
    title: "Comprehensive Reports",
    description:
      "Built-in reporting and search tools help institutions generate the information they need for audits and reviews.",
    icon: BarChart3,
  },
  {
    title: "Business-Friendly Dashboard",
    description:
      "A clear dashboard presents asset data in a way that is easy for non-technical staff to understand.",
    icon: LayoutDashboard,
  },
  {
    title: "Easy Adoption",
    description:
      "The platform is designed around familiar educational asset categories so staff can adopt it quickly.",
    icon: CheckCircle2,
  },
];

const faqItems: FaqData[] = [
  {
    q: "What is educational asset management?",
    a: "Educational asset management is the process of recording, tracking and maintaining all physical assets owned by a school, college or university using a centralized system instead of manual registers.",
  },
  {
    q: "Can schools manage classroom assets with Altroz Asset Management?",
    a: "Yes. Schools can register classroom assets such as projectors, smart boards, digital panels and furniture, assign them to classrooms and track maintenance history.",
  },
  {
    q: "Can colleges manage laboratory equipment?",
    a: "Yes. Colleges can register science, engineering and medical laboratory equipment with purchase details, vendor information and repair history.",
  },
  {
    q: "Can universities generate QR Codes for their assets?",
    a: "Yes. Universities can generate QR Codes individually or in bulk for assets such as computers, laboratory instruments and furniture, and print them for physical tagging.",
  },
  {
    q: "Can educational institutions manage maintenance records?",
    a: "Yes. Institutions can log maintenance and repair activities against each asset, creating a complete service history that supports better planning.",
  },
  {
    q: "Can I track assets department-wise?",
    a: "Yes. Assets can be assigned to specific departments, classrooms or laboratories, giving administrators visibility into who holds which assets.",
  },
  {
    q: "Can I generate campus asset reports?",
    a: "Yes. Altroz Asset Management allows institutions to generate reports filtered by asset category, department, campus or status.",
  },
  {
    q: "Can I manage multiple campuses within one system?",
    a: "Yes. Institutions with more than one campus or branch can assign and track assets separately by campus while maintaining one central register.",
  },
  {
    q: "Can I monitor warranty details for equipment?",
    a: "Yes. Warranty information can be recorded against each asset to help verify coverage before repair or replacement costs are approved.",
  },
  {
    q: "Who should use educational asset management software?",
    a: "School owners, principals, college and university administrators, campus managers, IT administrators, lab managers, library managers and procurement and finance teams can all benefit.",
  },
  {
    q: "How does QR Code scanning help with asset audits?",
    a: "During an audit, staff can scan an asset's QR Code to instantly view its registered details instead of manually searching a paper register.",
  },
  {
    q: "Can library equipment be tracked separately from other assets?",
    a: "Yes. Library equipment can be registered under its own category while remaining part of the same centralized system.",
  },
  {
    q: "Does Altroz Asset Management support IT asset tracking?",
    a: "Yes. IT assets such as desktops, laptops, printers, networking equipment and biometric devices can be registered, assigned and tracked.",
  },
  {
    q: "Can furniture and office assets be tracked as well?",
    a: "Yes. Classroom furniture, office furniture and general office assets can be registered and assigned to departments or locations.",
  },
  {
    q: "Is it possible to track vehicles such as school buses?",
    a: "Yes. Vehicles such as school buses or college vehicles can be registered as assets with purchase and vendor information.",
  },
  {
    q: "How does asset assignment work in Altroz Asset Management?",
    a: "Assets can be assigned to a department, classroom, laboratory or campus branch, and the assignment can be updated whenever an asset is transferred.",
  },
  {
    q: "What happens when an asset is transferred between departments?",
    a: "When an asset moves, its assignment record is updated to reflect the new department or location so ownership stays accurate.",
  },
  {
    q: "Can institutions search for a specific asset quickly?",
    a: "Yes. Search and filter tools let staff locate a specific asset by category, department, campus or other recorded details within seconds.",
  },
  {
    q: "Does the platform store purchase and vendor information?",
    a: "Yes. Purchase information and vendor details can be recorded against each asset, creating a complete procurement history.",
  },
  {
    q: "Can training institutes and coaching centres use this software?",
    a: "Yes. Training institutes, coaching centres and vocational institutes can use Altroz Asset Management to track training equipment, classroom assets and office assets.",
  },
  {
    q: "Is bulk QR Code generation available for large asset batches?",
    a: "Yes. Institutions can generate QR Codes in bulk, which is useful when tagging newly purchased assets such as computers for a new lab.",
  },
  {
    q: "Can Altroz Asset Management help reduce asset loss?",
    a: "Yes. Clear assignment records and QR Code identification make it easier to trace the location and custodian of assets, which helps reduce untracked losses.",
  },
  {
    q: "What kind of reports can educational institutions generate?",
    a: "Institutions can generate reports covering asset categories, department-wise distribution, campus-wise distribution and overall asset status.",
  },
  {
    q: "Does the dashboard provide analytics on asset distribution?",
    a: "Yes. The dashboard includes analytics that summarise how assets are distributed across categories, departments and campuses.",
  },
  {
    q: "How does Altroz Asset Management simplify annual audits?",
    a: "By centralizing records, enabling QR Code scanning and providing ready-to-use reports, the platform reduces the manual effort required for annual audits.",
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

function EducationDashboardMock() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="dashboard-glow left-1/2 top-10 -translate-x-1/2" />
      <div className="soft-card relative overflow-hidden rounded-[2rem] border border-border bg-white/95 p-5 shadow-float">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-success/12 text-primary shadow-sm">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
              Campus Dashboard
            </div>
            <div className="mt-1 text-lg font-semibold text-ink">
              Classroom, lab and campus assets in one view
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
                ["Departments Covered", "12"],
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
                    Campus snapshot
                  </div>
                  <h3 className="mt-1 text-base font-semibold text-ink">
                    Classrooms, labs, library and offices in one dashboard
                  </h3>
                </div>
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-4 grid gap-2">
                {["Classroom equipment", "Laboratory devices", "Library assets", "Campus infrastructure"].map(
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

function VisualCard({
  src,
  alt,
  label,
  title,
  description,
}: {
  src: string;
  alt: string;
  label: string;
  title: string;
  description: string;
}) {
  return (
    <article className="soft-card overflow-hidden p-4">
      <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-sm">
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
      <div className="mt-4">
        <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">{label}</div>
        <h3 className="mt-2 text-xl font-bold tracking-tight text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-ink-soft">{description}</p>
      </div>
    </article>
  );
}

export default function BulkEmailAssetReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Educational Institution Asset Management Software | Altroz Asset Management"
        description="Manage classroom equipment, laboratory devices, IT assets, furniture and campus infrastructure from one centralized platform. Explore Altroz Asset Management and book a free demo."
        canonicalPath={ROUTES.bulkEmailAssetReports}
      />

      <AssetManagementNavbar />

      <PageShell>
        <section className="hero-gradient relative overflow-hidden pt-12 pb-16">
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 top-16 h-72 w-72 rounded-full bg-success/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />

          <div className="site-container">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-4xl text-center">
                <ScrollReveal variant="fade-up">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-gradient-to-r from-white via-[#eff6ff] to-[#f0fdf4] px-4 py-2 text-xs font-extrabold tracking-normal text-primary shadow-sm">
                    <Sparkles className="h-3.5 w-3.5" />
                    CLOUD-BASED ASSET MANAGEMENT FOR SCHOOLS, COLLEGES & UNIVERSITIES
                  </div>

                  <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl lg:text-[4.15rem]">
                    Manage Every Campus Asset from One Centralized Platform
                  </h1>

                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
                    Educational Institution Asset Management Software Built for Modern Campuses
                  </h2>

                  <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg">
                    Track classroom equipment, laboratory devices, IT assets, library resources, furniture,
                    and campus infrastructure with complete visibility. Altroz Asset Management gives school
                    owners, principals, campus managers, IT administrators, and procurement teams a single,
                    organized system to register, assign, maintain, and report on every asset across one or
                    multiple campuses, replacing scattered spreadsheets and manual asset registers with a
                    structured, cloud-based platform.
                  </p>
                </ScrollReveal>
              </div>

              <div className="mt-10 grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
                <ScrollReveal variant="fade-up" className="text-center lg:text-left">
                  <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                    <Link to={ROUTES.bookDemo} className="btn-primary">
                      Book Free Demo
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a href="#features" className="btn-outline">
                      Explore Features
                    </a>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-ink-soft lg:justify-start">
                    <Link to={ROUTES.home} className="font-semibold text-primary hover:underline">
                      Home
                    </Link>
                    <span>/</span>
                    <span className="font-semibold text-success">Educational Institutions</span>
                  </div>

                  <ul className="mx-auto mt-5 max-w-3xl space-y-3 text-left text-sm leading-6 text-ink-soft lg:mx-0">
                    {[
                      "A single, searchable digital record of every classroom, laboratory, library and campus asset.",
                      "Faster identification of assets using QR Code scanning instead of manual registers.",
                      "Clear visibility into which department, classroom or campus an asset is assigned to.",
                      "Organized maintenance and warranty records that reduce last-minute repair delays.",
                      "Simplified internal and external audits with ready-to-use asset reports.",
                      "Better planning for asset replacement, budgeting and procurement decisions.",
                    ].map((bullet) => (
                      <li key={bullet} className="flex gap-3 rounded-2xl bg-white/75 px-4 py-3 shadow-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>

                <ScrollReveal variant="scale" className="relative">
                  <EducationDashboardMock />
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        <section className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="What is Educational Asset Management?"
              title="A structured way to track every physical resource owned by an institution"
              description="Educational asset management gives schools, colleges, universities and training centres one reliable source of truth for all campus assets."
              center
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <ScrollReveal variant="fade-up" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Understanding the concept
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  One digital record for classrooms, labs, libraries and campus facilities
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  Educational asset management is the process of recording, organizing, tracking and
                  maintaining every physical resource owned by a school, college, university, coaching
                  institute or training centre, from computer lab systems and laboratory instruments to
                  furniture, vehicles and campus infrastructure.
                </p>
                <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Why institutions need centralization
                  </div>
                  <BulletList
                    items={[
                      "Large institutions own thousands of assets across classrooms, labs, libraries and offices.",
                      "Without a central system, it is hard to know what exists, where it is and who is responsible.",
                      "Managers need quicker answers during audits, maintenance planning and procurement reviews.",
                      "A unified register supports better decisions and less manual effort.",
                    ]}
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Centralized Visibility
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  One cloud system gives everyone a clearer view of campus assets
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  A centralized platform brings classroom equipment, laboratory devices, IT assets,
                  library resources and campus infrastructure into a searchable dashboard. Administrators,
                  IT teams and facility managers can see the current status of each item without digging
                  through paper registers.
                </p>
                <BulletList
                  items={[
                    "Searchable digital records replace scattered spreadsheets and paper files.",
                    "QR Code scanning helps staff verify equipment instantly.",
                    "Department, classroom and campus assignment stay visible at all times.",
                    "Maintenance and warranty records remain attached to each asset.",
                  ]}
                />
              </ScrollReveal>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {overviewBullets.map((item) => (
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
              eyebrow="Common Challenges"
              title="Manual record keeping creates recurring problems across campuses"
              description="These are the issues educational institutions commonly face when assets are managed through paper or spreadsheets."
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
              title="The platform covers the daily workflows educational teams need"
              description="Each capability below addresses a practical need for schools, colleges, universities and training centres."
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
              eyebrow="Asset Lifecycle"
              title="Every educational asset moves through a clear lifecycle"
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
              title="Centralized campus asset data improves operations and accountability"
              description="These are the practical outcomes institutions gain when asset records are managed in one system."
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
                    This outcome follows naturally when the campus register is used as the single source of truth.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Educational Use Cases"
              title="The same platform supports every major campus workflow"
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
              eyebrow="Product Screens"
              title="The screen set covers registration, tracking, maintenance and reporting"
              description="Each screen helps a different kind of manager review the same asset data with the right emphasis."
              center
            />

            <div className="mt-8 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
              {showcaseImages.map((card) => (
                <ScrollReveal key={card.label} variant="fade-up">
                  <VisualCard {...card} />
                </ScrollReveal>
              ))}
            </div>

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
              title="The platform is built for educational institutions that need control and clarity"
              description="These strengths make the system practical for schools, colleges and universities of different sizes."
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
              title="Quick answers to common questions about educational asset management"
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
                    Simplify Asset Management Across Your Educational Institution
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-ink-soft">
                    Manage classroom equipment, laboratories, IT devices, furniture, campus infrastructure
                    and educational assets from one centralized platform. Improve visibility, simplify
                    maintenance and support better decision-making with Altroz Asset Management.
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
