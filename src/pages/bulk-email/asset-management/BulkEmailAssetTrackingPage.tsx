"use client";

import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  Factory,
  Laptop,
  Layers3,
  MapPinned,
  Package,
  QrCode,
  RotateCcw,
  Search,
  ShieldCheck,
  Smartphone,
  ClipboardList,
  Users,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { ComponentType } from "react";
import AssetManagementNavbar from "@/components/site/AssetManagementNavbar";
import Footer from "@/components/site/Footer";
import PageSEO from "@/components/site/PageSEO";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { ROUTES } from "@/routes/routeConfig.js";
import { cn } from "@/lib/utils";
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
  { label: "Assets Tracked", value: "12,480" },
  { label: "Assigned Assets", value: "9,824" },
  { label: "Under Maintenance", value: "146" },
  { label: "Available Assets", value: "2,154" },
];

const lifecycleSteps = [
  "Purchase",
  "Registration",
  "Assignment",
  "Transfer",
  "Maintenance",
  "Reporting",
  "Retirement",
];

const challengeCards: CardData[] = [
  {
    title: "Lost Assets",
    description: "Assets go missing when there is no central record of where they are or who holds them.",
    icon: AlertTriangle,
  },
  {
    title: "Unknown Ownership",
    description: "Teams cannot easily tell which employee, department or branch is responsible.",
    icon: Users,
  },
  {
    title: "Manual Registers",
    description: "Paper logs and spreadsheets take time to update and quickly become outdated.",
    icon: FileText,
  },
  {
    title: "No Transfer History",
    description: "Movements between people or branches are forgotten when they are not recorded.",
    icon: RotateCcw,
  },
  {
    title: "Duplicate Purchases",
    description: "Businesses buy items again because they cannot see unused assets elsewhere.",
    icon: Package,
  },
  {
    title: "Poor Accountability",
    description: "Without clear assignment records, damage and loss are harder to trace.",
    icon: ShieldCheck,
  },
  {
    title: "Delayed Maintenance",
    description: "Service schedules and warranty dates are often tracked separately or not at all.",
    icon: Wrench,
  },
  {
    title: "Limited Visibility",
    description: "Management lacks a real-time picture of how assets are distributed and used.",
    icon: BarChart3,
  },
];

const featureCards: CardData[] = [
  {
    title: "Asset Assignment",
    description: "Assign any asset to a specific employee and create a clear, traceable record.",
    icon: Users,
    benefit: "Removes confusion over who is responsible.",
  },
  {
    title: "Employee Assignment",
    description: "Link assets directly to employee profiles for instant visibility into holdings.",
    icon: Laptop,
    benefit: "Simplifies onboarding, offboarding and recovery.",
  },
  {
    title: "Department Tracking",
    description: "Group and monitor assets by department for accurate planning and budgeting.",
    icon: Building2,
    benefit: "Helps teams manage their own resources.",
  },
  {
    title: "Branch Tracking",
    description: "Track assets across multiple sites from one centralised dashboard.",
    icon: MapPinned,
    benefit: "Gives multi-location businesses one view.",
  },
  {
    title: "Asset Status",
    description: "See whether assets are available, assigned, under maintenance or retired.",
    icon: Clock3,
    benefit: "Supports faster procurement and reallocation.",
  },
  {
    title: "QR Code Tracking",
    description: "Generate a unique QR code for every asset and scan it to open the record instantly.",
    icon: QrCode,
    benefit: "Speeds up verification and reduces typing.",
  },
  {
    title: "Movement History",
    description: "Maintain a timestamped log of assignments, transfers and status changes.",
    icon: RotateCcw,
    benefit: "Creates an audit-ready trail.",
  },
  {
    title: "Asset Transfers",
    description: "Move assets between people, departments or branches while updating records automatically.",
    icon: ArrowRight,
    benefit: "Keeps records accurate as the business changes.",
  },
  {
    title: "Search & Filters",
    description: "Find any asset quickly by category, status, department, branch or employee.",
    icon: Search,
    benefit: "Saves time during audits and daily work.",
  },
  {
    title: "Live Dashboard Updates",
    description: "View live counts and summaries of assets, assignments and statuses in one dashboard.",
    icon: BarChart3,
    benefit: "Gives managers a current picture of utilisation.",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Register Asset",
    description:
      "Add the new asset to the system with category, type, purchase date and value.",
  },
  {
    step: "02",
    title: "Generate QR Code",
    description:
      "Create and print a QR code so the asset can be scanned and identified instantly.",
  },
  {
    step: "03",
    title: "Assign Asset",
    description:
      "Allocate the item to an employee, department or branch and record the owner.",
  },
  {
    step: "04",
    title: "Track Location & Status",
    description:
      "Keep the current location and status visible on the dashboard at all times.",
  },
  {
    step: "05",
    title: "Record Transfers",
    description:
      "Update the record when the asset changes hands, moves branches or is reassigned.",
  },
  {
    step: "06",
    title: "Monitor Maintenance",
    description:
      "Track service status and warranty details so planned maintenance stays on schedule.",
  },
  {
    step: "07",
    title: "Generate Reports",
    description:
      "Summarise utilisation, movement and status data for management review and audits.",
  },
];

const benefitCards = [
  "Complete Asset Visibility",
  "Better Accountability",
  "Faster Asset Search",
  "Improved Productivity",
  "Reduced Asset Loss",
  "Simplified Audits",
  "Accurate Asset Records",
  "Better Decision Making",
];

const industryCards: CardData[] = [
  {
    title: "Manufacturing",
    description: "Track machinery, tools and equipment across production floors and shifts.",
    icon: Factory,
  },
  {
    title: "Healthcare",
    description: "Monitor medical devices, IT assets and equipment across departments.",
    icon: Building2,
  },
  {
    title: "IT Companies",
    description: "Track laptops, monitors and networking equipment assigned to employees.",
    icon: Laptop,
  },
  {
    title: "Educational Institutions",
    description: "Monitor lab equipment, computers and furniture across campuses.",
    icon: Users,
  },
  {
    title: "Retail",
    description: "Track point-of-sale devices, fixtures and store equipment across outlets.",
    icon: Package,
  },
  {
    title: "Warehouses",
    description: "Maintain visibility over handling equipment, racks and tools.",
    icon: Layers3,
  },
  {
    title: "Construction",
    description: "Track tools and equipment moving between project sites.",
    icon: Wrench,
  },
  {
    title: "Hospitality",
    description: "Manage furniture, kitchen equipment and electronics across properties.",
    icon: Building2,
  },
  {
    title: "Corporate Offices",
    description: "Track laptops, furniture and office equipment across departments.",
    icon: ClipboardList,
  },
  {
    title: "Government Organisations",
    description: "Maintain auditable asset records across offices and departments.",
    icon: ShieldCheck,
  },
];

const screenCards: CardData[] = [
  {
    title: "Asset Tracking List",
    description: "A consolidated list view of all registered assets with category, status and owner.",
    icon: BarChart3,
    benefit: "Quick sortable overview of the inventory.",
  },
  {
    title: "Assignment Screen",
    description: "Assign an asset to an employee, department or branch in a few steps.",
    icon: Users,
    benefit: "Reduces time needed for onboarding.",
  },
  {
    title: "Transfer History",
    description: "A timestamped record of every transfer an asset has undergone.",
    icon: RotateCcw,
    benefit: "Provides a clear audit trail.",
  },
  {
    title: "QR Code Scanner",
    description: "Scan a QR code to pull up the asset's full record instantly.",
    icon: QrCode,
    benefit: "Speeds up physical verification.",
  },
  {
    title: "Branch Tracking",
    description: "Group and display assets by branch location.",
    icon: MapPinned,
    benefit: "Helps multi-location businesses manage assets consistently.",
  },
  {
    title: "Department Tracking",
    description: "Group assets by department for easier budgeting and planning.",
    icon: Building2,
    benefit: "Gives department heads visibility into equipment.",
  },
  {
    title: "Activity Timeline",
    description: "A chronological feed of assignments, transfers and status changes.",
    icon: Clock3,
    benefit: "Keeps managers informed in real time.",
  },
  {
    title: "Reports Screen",
    description: "A reporting interface that summarises counts, status and utilisation.",
    icon: FileText,
    benefit: "Supports planning and resource decisions.",
  },
];

const whyChooseCards: CardData[] = [
  {
    title: "Centralized Tracking",
    description: "Assignment, location, status and history are visible from one cloud platform.",
    icon: ShieldCheck,
  },
  {
    title: "Easy Assignment",
    description: "Assign assets in a few clicks and reduce administrative overhead.",
    icon: Users,
  },
  {
    title: "QR Code Integration",
    description: "Every asset can carry a scannable QR code for fast verification.",
    icon: QrCode,
  },
  {
    title: "Movement History",
    description: "A complete timestamped log gives businesses transparent ownership history.",
    icon: RotateCcw,
  },
  {
    title: "Department & Branch Tracking",
    description: "Assets can be organised and monitored by department and branch.",
    icon: MapPinned,
  },
  {
    title: "Maintenance Visibility",
    description: "Track service and warranty details alongside each asset record.",
    icon: Wrench,
  },
  {
    title: "Powerful Reports",
    description: "Reports and analytics give management a clear view of asset utilisation.",
    icon: BarChart3,
  },
  {
    title: "Business Ready Platform",
    description: "Designed for SMEs and large enterprises alike, adapting to the business structure.",
    icon: Building2,
  },
];

const faqItems: Faq[] = [
  {
    q: "What is asset tracking software?",
    a: "Asset tracking software is a digital system that records and monitors a business's assets throughout their lifecycle, including ownership, location, status and movement history.",
  },
  {
    q: "How does asset tracking work?",
    a: "It works by registering each asset in the system, assigning it a unique identity, and recording every assignment, transfer and status update as it happens.",
  },
  {
    q: "Can I assign assets to employees?",
    a: "Yes. Altroz Asset Management allows you to assign any asset to a specific employee, creating a clear and traceable ownership record.",
  },
  {
    q: "Can I track branch-wise assets?",
    a: "Yes. Assets can be grouped and monitored by branch, giving multi-location businesses a consolidated view of what exists at each site.",
  },
  {
    q: "Can I track department-wise assets?",
    a: "Yes. Department tracking lets you see which assets belong to which department, supporting better budgeting and planning.",
  },
  {
    q: "Can I use QR codes for asset tracking?",
    a: "Yes. Every asset can have a unique QR code generated for it, which can be scanned to instantly access its full record.",
  },
  {
    q: "Can I monitor asset movement?",
    a: "Yes. Every transfer between employees, departments or branches is logged with a timestamp, creating a movement history for each asset.",
  },
  {
    q: "Can I track maintenance status?",
    a: "Yes. The platform tracks maintenance status alongside warranty details so teams can stay on top of service schedules.",
  },
  {
    q: "Can I search for assets instantly?",
    a: "Yes. Search and filter tools let you find assets by category, status, department, branch or employee within seconds.",
  },
  {
    q: "Who should use asset tracking software?",
    a: "Any business that owns physical assets, from small teams with a handful of laptops to large enterprises with equipment across branches, can benefit.",
  },
  {
    q: "What types of assets can be tracked?",
    a: "Businesses commonly track IT equipment, furniture, machinery, tools and other fixed assets, organised by category and type.",
  },
  {
    q: "Is Altroz Asset Management suitable for small businesses?",
    a: "Yes. The platform is built to scale, so both SMEs and large enterprises can use it to bring structure to their asset records.",
  },
  {
    q: "Can multiple branches use the same platform?",
    a: "Yes. Branch tracking allows businesses with several locations to manage all their assets from one centralised dashboard.",
  },
  {
    q: "How is asset ownership recorded?",
    a: "Ownership is recorded through the assignment feature, which links an asset to a specific employee, department or branch at any given time.",
  },
  {
    q: "What happens when an asset is transferred?",
    a: "When an asset is transferred, its ownership and location records are updated, and the transfer is added to the asset's movement history.",
  },
  {
    q: "Can I see the current status of any asset?",
    a: "Yes. Every asset has a status field such as available, assigned, under maintenance or retired.",
  },
  {
    q: "Does the platform generate reports?",
    a: "Yes. Built-in reports and analytics summarise asset counts, assignment status and utilisation across the organisation.",
  },
  {
    q: "Is the data updated in real time?",
    a: "Yes. The dashboard reflects assignments, transfers and status changes as soon as they are recorded in the system.",
  },
  {
    q: "Can asset tracking help during audits?",
    a: "Yes. Because every action is logged with a timestamp, teams can pull up an accurate, audit-ready history for any asset.",
  },
  {
    q: "How do I get started with Altroz Asset Management?",
    a: "You can book a free demo with our team, who will walk you through the platform and help you understand how it fits your business needs.",
  },
];

function AssetTrackingMock() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="dashboard-glow left-1/2 top-10 -translate-x-1/2" />
      <div className="soft-card relative overflow-hidden rounded-[2rem] border border-border bg-white/95 p-5 shadow-float">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-success/12 text-primary shadow-sm">
            <QrCode className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">Asset Tracking</div>
            <div className="mt-1 text-lg font-semibold text-ink">
              Know where every asset is, who uses it and what changed
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
                ["Assigned", "9,824"],
                ["Available", "2,154"],
                ["Under Maintenance", "146"],
                ["Retired", "356"],
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
                    Movement timeline
                  </div>
                  <h3 className="mt-1 text-base font-semibold text-ink">
                    Purchase to retirement, all in one history
                  </h3>
                </div>
                <RotateCcw className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-4 grid gap-2">
                {lifecycleSteps.map((item, index) => (
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

export default function BulkEmailAssetTrackingPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Asset Tracking Software | Altroz Asset Management"
        description="Track business assets in real time with Altroz Asset Management. Assign, transfer and monitor assets by employee, department and branch using QR codes."
        canonicalPath={ROUTES.bulkEmailAssetTracking}
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
                Trusted Asset Management Platform for Growing Businesses
              </span>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Track Every Business Asset with Complete Visibility
              </h1>
              <p className="mx-auto mt-5 max-w-4xl text-base leading-7 text-ink-soft sm:text-lg">
                Know where every asset is, who is using it and its current status. Altroz Asset Management
                gives businesses one centralized cloud platform to monitor, assign, transfer and track every
                asset from the day it is purchased to the day it is retired.
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
                  An asset record that stays accurate as assets move through the business
                </h2>
                <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg lg:mx-0">
                  Instead of maintaining scattered spreadsheets or manual registers, teams can see the
                  exact location, owner, department, branch and status of any asset in a few clicks.
                </p>
                <div className="mt-7 rounded-[1.5rem] border border-primary/15 bg-gradient-to-br from-primary/6 via-white to-success/6 p-5 text-left">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Tracking stages
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {lifecycleSteps.map((item, index) => (
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
                <AssetTrackingMock />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="What is Asset Tracking?"
              title="Understanding the process of monitoring assets throughout their working life"
              description="Asset tracking answers three questions at any time: what the business owns, where the assets are and who is responsible for them."
              center
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
              <ScrollReveal variant="fade-up" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Understanding Asset Tracking
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  A record that follows the asset from purchase to retirement
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  Asset tracking is the process of recording and monitoring a business asset throughout
                  its working life, from the moment it is purchased to every employee, department or
                  branch it is assigned to, and finally to the day it is retired or disposed of.
                </p>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  For example, when a company issues a laptop to a new employee, the tracking record can
                  show who received it, which department they belong to and the date of assignment.
                </p>
                <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Why businesses need it
                  </div>
                  <div className="mt-3">
                    <BulletList
                      items={[
                        "A growing business owns more laptops, furniture, machinery and tools over time.",
                        "Without structure, it is hard to know exactly how many assets exist and where they are.",
                        "Duplicate purchases, lost items and accountability disputes become more common.",
                        "A centralized system removes guesswork and keeps records current.",
                      ]}
                    />
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Digital Tracking Improves Control
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  Live records replace scattered spreadsheets and manual registers
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  A digital asset tracking system like Altroz Asset Management replaces manual registers
                  with a searchable record. Every assignment, transfer and status change is logged
                  automatically with a timestamp.
                </p>
                <BulletList
                  items={[
                    "Reduces time spent searching for assets",
                    "Improves accountability across teams",
                    "Supports purchasing and utilisation decisions",
                    "Keeps the full history available for review",
                  ]}
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Challenges Without Tracking"
              title="Manual methods create recurring problems for growing businesses"
              description="These are the day-to-day issues businesses tend to run into when asset records are fragmented."
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
              eyebrow="Key Asset Tracking Features"
              title="The platform brings together the core capabilities businesses need to track assets accurately"
              description="Each feature below mirrors how teams actually work on the ground."
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
                  {card.benefit ? (
                    <div className="mt-4 rounded-2xl bg-white p-3 text-sm font-medium text-ink shadow-sm">
                      Business benefit: {card.benefit}
                    </div>
                  ) : null}
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="How Asset Tracking Works"
              title="A simple workflow keeps asset information accurate and up to date"
              description="The process stays clear from the day an item is registered until the day it is retired."
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
                    This outcome follows naturally when asset tracking is used as the single source of truth.
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
              title="Asset tracking supports a wide range of industries"
              description="Each industry has its own asset management needs, but the need for visibility and control is the same."
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
              eyebrow="Asset Tracking Screens"
              title="The screen set covers every everyday tracking action"
              description="These screens represent the core views users need when working with asset data."
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
              title="The platform is built for reliable tracking across businesses of any size"
              description="These product strengths are what make the system practical for SMEs and enterprises alike."
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
              title="Common questions about Altroz Asset Management"
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
                    Track Every Business Asset with Confidence
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-ink-soft">
                    Monitor asset ownership, assignments, transfers, maintenance and movement from one
                    centralized platform. Improve visibility, accountability and operational efficiency with
                    Altroz Asset Management.
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
