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
  Factory,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Layers3,
  Lightbulb,
  ListChecks,
  MapPinned,
  Package,
  QrCode,
  Search,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Users,
  Wallet,
  Workflow,
  Wrench,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AssetManagementNavbar from "@/components/site/AssetManagementNavbar";
import Footer from "@/components/site/Footer";
import PageSEO from "@/components/site/PageSEO";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { ROUTES } from "@/routes/routeConfig.js";
import { PageShell, SectionHeading } from "./bulk-email/asset-management/shared";

type CardData = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  href?: string;
  note?: string;
};

type RoadmapStep = {
  step: string;
  title: string;
  description: string;
  href: string;
};

type TopicData = {
  title: string;
  description: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

type FaqItem = {
  question: string;
  answer: string;
};

function MaybeLink({
  href,
  className,
  children,
}: {
  href?: string;
  className?: string;
  children: ReactNode;
}) {
  if (!href) {
    return <>{children}</>;
  }

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

const heroHighlights = [
  {
    title: "Free Learning Hub",
    description: "Everything on this page is free to read and designed for practical use.",
    icon: Sparkles,
  },
  {
    title: "Plain Language",
    description: "Asset management concepts are explained clearly without heavy jargon.",
    icon: Lightbulb,
  },
  {
    title: "Enterprise Focus",
    description: "Content is written for teams managing assets across departments and branches.",
    icon: Workflow,
  },
];

const whatYouCanLearn: CardData[] = [
  {
    title: "Asset Management Basics",
    description:
      "Understand what business asset management means, why organisations track fixed assets and how a central system replaces scattered spreadsheets.",
    icon: BookOpen,
  },
  {
    title: "Asset Tracking",
    description:
      "Learn how businesses track location, condition and usage in real time, and how tracking reduces loss, misplacement and idle assets.",
    icon: Search,
  },
  {
    title: "QR Code Asset Management",
    description:
      "Discover how QR code labels are generated and attached so anyone can scan an asset and instantly view details, history and status.",
    icon: QrCode,
  },
  {
    title: "Asset Maintenance",
    description:
      "Understand preventive and reactive maintenance, how schedules are planned and why timely servicing extends asset life.",
    icon: Wrench,
  },
  {
    title: "Asset Reports",
    description:
      "Learn how reports help finance, operations and audit teams understand value, utilisation, depreciation and branch distribution.",
    icon: BarChart3,
  },
  {
    title: "Asset Lifecycle",
    description:
      "Explore the journey of a business asset from procurement and registration to assignment, usage, maintenance and retirement.",
    icon: Workflow,
  },
  {
    title: "Asset Inventory",
    description:
      "Learn how to build and maintain an accurate inventory, categorise assets logically and keep records updated as things move.",
    icon: ClipboardList,
  },
  {
    title: "Warranty Management",
    description:
      "Understand how to track warranty dates, avoid missed claim windows and plan replacements or renewals before expiry.",
    icon: ShieldCheck,
  },
  {
    title: "Audit Readiness",
    description:
      "Learn how organised asset records and digital trails make internal and external audits faster, smoother and less stressful.",
    icon: FileText,
  },
  {
    title: "Asset Best Practices",
    description:
      "Explore proven habits, from tagging conventions to regular reconciliation, that keep asset data reliable over time.",
    icon: CheckCircle2,
  },
];

const learningRoadmap: RoadmapStep[] = [
  {
    step: "01",
    title: "Understand Asset Management",
    description:
      "Begin by learning what counts as a business asset, why tracking matters and what a good process delivers.",
    href: "#what-you-can-learn",
  },
  {
    step: "02",
    title: "Create Asset Register",
    description:
      "Build a central register that records category, purchase date, value and assigned location for every asset.",
    href: ROUTES.bulkEmailAssetManagement,
  },
  {
    step: "03",
    title: "Assign Assets",
    description:
      "Allocate assets to employees, departments or locations so ownership and accountability stay clear.",
    href: ROUTES.bulkEmailAssetTracking,
  },
  {
    step: "04",
    title: "Generate QR Codes",
    description:
      "Attach a unique QR code to each asset so it can be identified and updated instantly with a simple scan.",
    href: ROUTES.bulkEmailAssetQrCode,
  },
  {
    step: "05",
    title: "Track Assets",
    description:
      "Monitor location, movement and status continuously instead of relying on periodic manual checks.",
    href: ROUTES.bulkEmailAssetTracking,
  },
  {
    step: "06",
    title: "Maintain Assets",
    description:
      "Set up maintenance schedules and log service history to keep assets in working condition for longer.",
    href: ROUTES.bulkEmailAssetMaintenance,
  },
  {
    step: "07",
    title: "Generate Reports",
    description:
      "Use asset data to produce reports on utilisation, value and condition that support planning and budgeting.",
    href: ROUTES.bulkEmailAssetReports,
  },
  {
    step: "08",
    title: "Improve Business Operations",
    description:
      "Apply the insights from tracking and reporting to reduce losses, cut unnecessary purchases and run operations more efficiently.",
    href: ROUTES.bookDemo,
  },
];

const popularTopics: TopicData[] = [
  {
    title: "Asset Management",
    description: "The discipline of recording, tracking and maintaining business assets throughout their useful life.",
    href: ROUTES.bulkEmailAssetManagement,
    icon: Package,
  },
  {
    title: "Asset Tracking",
    description: "Monitoring where assets are and who is using them at any given time.",
    href: ROUTES.bulkEmailAssetTracking,
    icon: MapPinned,
  },
  {
    title: "QR Codes",
    description: "A scannable way to identify assets instantly using a smartphone camera.",
    href: ROUTES.bulkEmailAssetQrCode,
    icon: QrCode,
  },
  {
    title: "Maintenance",
    description: "Planned and unplanned servicing activities that keep assets functional.",
    href: ROUTES.bulkEmailAssetMaintenance,
    icon: Wrench,
  },
  {
    title: "Warranty",
    description: "Coverage periods that teams must track and act on before expiry.",
    href: ROUTES.bulkEmailAssetMaintenance,
    icon: ShieldCheck,
  },
  {
    title: "Reports",
    description: "Structured summaries of asset data used for decision-making.",
    href: ROUTES.bulkEmailAssetReports,
    icon: BarChart3,
  },
  {
    title: "Asset Inventory",
    description: "The complete, categorised list of everything a business owns and uses.",
    href: "#what-you-can-learn",
    icon: ClipboardList,
  },
  {
    title: "Departments",
    description: "Organisational units that assets are commonly assigned and grouped by.",
    href: ROUTES.bulkEmailAssetDashboard,
    icon: Building2,
  },
  {
    title: "Branches",
    description: "Physical office or site locations where assets are deployed.",
    href: ROUTES.bulkEmailAssetTracking,
    icon: Layers3,
  },
  {
    title: "Asset Audits",
    description: "Periodic verification exercises that confirm recorded assets still exist and are in the expected condition.",
    href: ROUTES.complianceGuides,
    icon: FileText,
  },
  {
    title: "Compliance",
    description: "Meeting internal policy and external regulatory expectations around asset documentation.",
    href: ROUTES.complianceGuides,
    icon: CheckCircle2,
  },
  {
    title: "Asset Lifecycle",
    description: "The full journey of an asset from purchase to disposal.",
    href: "#learning-path",
    icon: Workflow,
  },
];

const industryCards: CardData[] = [
  {
    title: "IT Companies",
    description:
      "Track laptops, servers, monitors and peripherals across employees and offices, and manage hardware refresh cycles.",
    icon: Smartphone,
  },
  {
    title: "Manufacturing",
    description:
      "Track machinery, tools and production equipment, and see how maintenance scheduling reduces production downtime.",
    icon: Factory,
  },
  {
    title: "Healthcare",
    description:
      "Track medical equipment, ensure timely calibration and servicing and maintain audit-ready equipment records.",
    icon: ShieldCheck,
  },
  {
    title: "Education",
    description:
      "Manage lab equipment, computers, furniture and library assets across campuses and departments.",
    icon: GraduationCap,
  },
  {
    title: "Retail",
    description:
      "Track store fixtures, point-of-sale equipment and assets distributed across multiple outlet locations.",
    icon: Wallet,
  },
  {
    title: "Construction",
    description:
      "Track tools and equipment that move frequently between project sites, and reduce equipment loss.",
    icon: Wrench,
  },
  {
    title: "Warehousing",
    description:
      "Track material handling equipment, racks and machinery while keeping utilisation data accurate.",
    icon: Layers3,
  },
  {
    title: "Corporate Offices",
    description:
      "Manage IT hardware, furniture and office equipment across departments and floors.",
    icon: LayoutDashboard,
  },
  {
    title: "Government",
    description:
      "Use structured asset registers to support transparency, accountability and audit compliance.",
    icon: ClipboardList,
  },
  {
    title: "Hospitality",
    description:
      "Track equipment, furniture and appliances across properties and departments.",
    icon: Building2,
  },
];

const resourceLibrary: CardData[] = [
  {
    title: "Beginner Guides",
    description: "Simple, jargon-free articles for teams starting to formalise their asset management process.",
    icon: BookOpen,
  },
  {
    title: "Advanced Guides",
    description: "In-depth articles for teams refining reporting, reconciliation and multi-location processes.",
    icon: Layers3,
  },
  {
    title: "Industry Guides",
    description: "Sector-focused guides that explain how asset management applies to specific industries.",
    icon: Factory,
  },
  {
    title: "Asset Templates",
    description: "Ready-to-use formats for structuring asset registers, categories and tagging conventions.",
    icon: ClipboardList,
  },
  {
    title: "Asset Checklists",
    description: "Practical checklists for asset registration, assignment and periodic verification.",
    icon: ListChecks,
  },
  {
    title: "Maintenance Checklists",
    description: "Checklists that help teams plan and track preventive maintenance activities.",
    icon: Wrench,
  },
  {
    title: "Audit Preparation Guides",
    description: "Guides that walk through organising documentation and records ahead of an audit.",
    icon: FileText,
  },
  {
    title: "Implementation Guides",
    description: "Step-by-step resources for rolling out a structured asset management process across teams.",
    icon: Workflow,
  },
  {
    title: "Frequently Asked Questions",
    description: "Answers to common questions businesses have about asset management and tracking.",
    icon: CheckCircle2,
  },
  {
    title: "Video Tutorials",
    description: "Short visual walkthroughs of core asset management workflows.",
    icon: Sparkles,
    note: "Coming soon",
  },
  {
    title: "Download Center",
    description: "Downloadable templates, checklists and reference documents.",
    icon: FileText,
    note: "Coming soon",
  },
];

const whyLearnCards: CardData[] = [
  {
    title: "Practical Business Knowledge",
    description:
      "Content is written around real business scenarios rather than abstract theory, so it is easy to apply immediately.",
    icon: Lightbulb,
  },
  {
    title: "Easy-to-Understand Content",
    description:
      "Guides are written in simple, plain language so that any team member can follow along.",
    icon: BookOpen,
  },
  {
    title: "Real Business Examples",
    description:
      "Concepts are explained using everyday examples such as tracking laptops, machinery or office furniture.",
    icon: Package,
  },
  {
    title: "Industry Best Practices",
    description:
      "Guides reflect sensible practices for keeping asset records accurate and useful.",
    icon: CheckCircle2,
  },
  {
    title: "Modern Asset Management Methods",
    description:
      "Learn how digital tools such as QR codes and centralized registers replace manual, error-prone processes.",
    icon: QrCode,
  },
  {
    title: "Continuously Updated Resources",
    description:
      "The learning center is expanded over time as new guides and topics are added.",
    icon: Workflow,
  },
  {
    title: "Actionable Guidance",
    description:
      "Every guide is designed to help you take a concrete next step, not just read passively.",
    icon: Sparkles,
  },
  {
    title: "Enterprise Focus",
    description:
      "Content is written with the needs of operations, finance, IT and admin teams in growing organisations in mind.",
    icon: Building2,
  },
];

const faqItems: FaqItem[] = [
  {
    question: "What is this Learning Center?",
    answer:
      "The Altroz Asset Management Learning Center is a free educational resource hub where businesses can learn about asset management, asset tracking, QR code asset management, maintenance, reporting and related best practices.",
  },
  {
    question: "Who should use these resources?",
    answer:
      "These resources are useful for business owners, operations managers, asset managers, facility managers, IT managers, warehouse managers, admin teams, procurement teams and finance teams across industries.",
  },
  {
    question: "Are the guides free?",
    answer:
      "Yes, all guides, checklists and educational articles in the Learning Center are free to read and use.",
  },
  {
    question: "Where should beginners start?",
    answer:
      "Beginners should start with the Getting Started content and the What is Asset Management? guide before moving on to asset tracking and QR code management topics.",
  },
  {
    question: "What is Asset Management?",
    answer:
      "Asset management is the process of recording, tracking, maintaining and reporting on the physical items a business owns and uses throughout their useful life.",
  },
  {
    question: "What is Asset Tracking?",
    answer:
      "Asset tracking is the ongoing process of monitoring where an asset is located, who is using it and what condition it is in so the business always knows its status.",
  },
  {
    question: "What are QR Code Assets?",
    answer:
      "QR code assets are physical assets with a unique QR code label attached, allowing anyone to scan the code with a smartphone and instantly view the asset details, history and current status.",
  },
  {
    question: "How do I manage asset maintenance?",
    answer:
      "Asset maintenance is managed by setting a schedule for regular servicing, logging each maintenance activity against the asset record and tracking upcoming due dates.",
  },
  {
    question: "How do reports improve decision making?",
    answer:
      "Asset reports summarise utilisation, value and location data, which helps management understand how assets are performing and where budgets should be focused.",
  },
  {
    question: "Can I learn industry-specific practices?",
    answer:
      "Yes, the Learning Center includes industry-specific guidance for IT, manufacturing, healthcare, education, retail, construction and government teams.",
  },
  {
    question: "What is an asset register?",
    answer:
      "An asset register is a structured record of every asset a business owns, including category, purchase date, assigned location and current status.",
  },
  {
    question: "Why do businesses need a formal asset management process?",
    answer:
      "A formal process reduces asset loss, avoids duplicate purchases, keeps maintenance on schedule and makes financial and audit reporting far more reliable than manual tracking.",
  },
  {
    question: "What is the difference between asset tracking and inventory management?",
    answer:
      "Asset tracking focuses on monitoring location and status over time, while inventory management typically deals with stock quantities of consumable or resale items.",
  },
  {
    question: "How often should assets be audited?",
    answer:
      "Most organisations conduct asset verification regularly, such as quarterly or annually, though the right frequency depends on the size and nature of the asset base.",
  },
  {
    question: "What details should be recorded for each asset?",
    answer:
      "Common details include asset name, category, purchase date, value, assigned location or custodian, condition and warranty information.",
  },
  {
    question: "How does QR code scanning update asset records?",
    answer:
      "When a QR code is scanned, the linked asset record can be viewed or updated instantly, keeping location and status information current without manual entry.",
  },
  {
    question: "What is preventive maintenance?",
    answer:
      "Preventive maintenance is scheduled servicing carried out before a fault occurs, intended to reduce breakdowns and extend the useful life of equipment.",
  },
  {
    question: "How can small businesses benefit from asset management?",
    answer:
      "Small businesses benefit by avoiding unnecessary repurchases, keeping better track of shared equipment and having organised records ready for tax or compliance purposes.",
  },
  {
    question: "Do I need special hardware to use QR code asset management?",
    answer:
      "No special hardware is required in most cases, since QR codes can usually be scanned using a standard smartphone camera.",
  },
  {
    question: "How do I get started with Altroz Asset Management?",
    answer:
      "You can start by exploring the beginner guides in this Learning Center, and when you are ready, book a free demo to see how the platform supports your asset management process.",
  },
];

function LearnSectionCard({
  title,
  description,
  icon: Icon,
  href,
  note,
}: CardData) {
  const content = (
    <>
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-success/12 text-primary shadow-sm transition-transform duration-300 group-hover:scale-105">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{description}</p>
      {note ? (
        <div className="mt-auto pt-4 text-xs font-bold uppercase tracking-[0.22em] text-success">
          {note}
        </div>
      ) : null}
    </>
  );

  const baseClass =
    "soft-card group flex h-full flex-col p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float";

  if (href) {
    return (
      <MaybeLink href={href} className={baseClass}>
        {content}
      </MaybeLink>
    );
  }

  return <article className={baseClass}>{content}</article>;
}

function DashboardMock() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="dashboard-glow left-1/2 top-10 -translate-x-1/2" />
      <div className="soft-card relative overflow-hidden rounded-[2rem] border border-border bg-white/95 p-5 shadow-float">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-success/12 text-primary shadow-sm">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
              Learning Dashboard
            </div>
            <div className="mt-1 text-lg font-semibold text-ink">Structured learning, simple navigation</div>
          </div>
          <div className="ml-auto rounded-full bg-primary-soft px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            Free
          </div>
        </div>

        <div className="mt-5 grid gap-4">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-primary/6 via-white to-success/6 p-5">
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-3 shadow-sm">
              <Search className="h-4 w-4 text-primary" />
              <span className="text-sm text-ink-soft">
                Search guides, topics, QR codes, maintenance, reports...
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { title: "Asset Basics", icon: BookOpen },
                { title: "Tracking", icon: MapPinned },
                { title: "QR Codes", icon: QrCode },
                { title: "Reports", icon: BarChart3 },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.25rem] border border-border bg-white p-4 shadow-sm">
                  <item.icon className="h-5 w-5 text-primary" />
                  <div className="mt-3 text-sm font-semibold text-ink">{item.title}</div>
                  <div className="mt-1 text-xs leading-5 text-ink-soft">
                    Practical guides and product tutorials.
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["What is Asset Management?", "Beginner Guide"],
              ["How QR Codes Work", "6 min read"],
              ["Maintenance Schedules", "Intermediate"],
              ["Audit Readiness", "Free resource"],
            ].map(([title, meta]) => (
              <div key={title} className="rounded-[1.25rem] border border-border bg-white p-4 shadow-sm">
                <div className="text-sm font-semibold text-ink">{title}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-primary">{meta}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Asset Management Learning Center | Guides & Resources | Altroz Asset Management"
        description="Explore the Altroz Asset Management Learning Center for free guides on asset management, asset tracking, QR code assets, maintenance and reporting."
        canonicalPath={ROUTES.learn}
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
                    Asset Management Learning Center
                  </div>

                  <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl lg:text-[4.15rem]">
                    Learn Everything About Asset Management, Asset Tracking, and QR Code Asset Management
                  </h1>

                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
                    Master Modern Asset Management for Your Business
                  </h2>

                  <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg">
                    Explore free, practical guides on asset management, asset tracking, QR code asset
                    management, maintenance and reporting. Whether you are just getting started or refining
                    an existing process, the Altroz Asset Management Learning Center helps you build
                    stronger asset management practices across your organisation.
                  </p>
                </ScrollReveal>
              </div>

              <div className="mt-12 grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
                <ScrollReveal variant="fade-up" className="text-center lg:text-left">
                  <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                    <a href="#what-you-can-learn" className="btn-primary">
                      Start Learning
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a href="#resource-library" className="btn-outline">
                      Explore Resources
                    </a>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-ink-soft lg:justify-start">
                    <Link to={ROUTES.home} className="font-semibold text-primary hover:underline">
                      Home
                    </Link>
                    <span>/</span>
                    <span className="font-semibold text-success">Learn</span>
                  </div>

                  <ul className="mx-auto mt-5 max-w-3xl space-y-3 text-left text-sm leading-6 text-ink-soft lg:mx-0">
                    {[
                      "Free educational content for every stage of your asset management journey.",
                      "Simple explanations written for operations, finance, IT and admin teams.",
                      "Practical learning built around real business use cases and asset workflows.",
                    ].map((bullet) => (
                      <li key={bullet} className="flex gap-3 rounded-2xl bg-white/75 px-4 py-3 shadow-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {heroHighlights.map((card, index) => (
                      <ScrollReveal key={card.title} variant="fade-up" delay={70 + index * 40}>
                        <article className="soft-card flex h-full flex-col p-4 text-left">
                          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-success/12 text-primary shadow-sm">
                            <card.icon className="h-5 w-5" />
                          </span>
                          <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                        </article>
                      </ScrollReveal>
                    ))}
                  </div>
                </ScrollReveal>

                <ScrollReveal variant="scale" className="relative">
                  <DashboardMock />
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        <section id="what-you-can-learn" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="What You Can Learn"
              title="Ten core topics that build real asset management confidence"
              description="This section introduces the main learning themes covered across the Learning Center and its linked resources."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {whatYouCanLearn.map((card) => (
                <LearnSectionCard key={card.title} {...card} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="learning-path" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Learning Roadmap"
              title="A simple roadmap from beginner to confident asset manager"
              description="Follow the path in order or jump to the step that matches your current stage."
              center
            />

            <div className="mx-auto mt-8 max-w-4xl space-y-4">
              {learningRoadmap.map((step, index) => (
                <ScrollReveal key={step.step} variant="fade-up" delay={index * 40}>
                  <MaybeLink
                    href={step.href}
                    className="soft-card group flex h-full flex-col gap-4 p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float md:flex-row md:items-start md:gap-5"
                  >
                    <div className="flex items-center gap-3 md:w-48 md:shrink-0">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-success/12 text-sm font-black text-primary shadow-sm">
                        {step.step}
                      </span>
                      <span className="rounded-full bg-primary-soft px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                        {index + 1}/8
                      </span>
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-xl font-bold text-ink">{step.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-ink-soft">{step.description}</p>
                    </div>
                  </MaybeLink>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Popular Topics"
              title="Jump straight to the areas you care about most"
              description="These topic cards make it easy to scan, browse and move into the right guide quickly."
              center
            />

            <StaggerReveal step={30} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {popularTopics.map((topic) => (
                <MaybeLink
                  key={topic.title}
                  href={topic.href}
                  className="soft-card group flex h-full flex-col p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-success/12 text-primary shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <topic.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{topic.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{topic.description}</p>
                </MaybeLink>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="industry-learning" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Industry Learning"
              title="Learn how asset management applies across different industries"
              description="Each industry has different asset management needs, but the need for visibility and control is the same."
              center
            />

            <StaggerReveal step={35} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {industryCards.map((card) => (
                <LearnSectionCard key={card.title} {...card} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="resource-library" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Resource Library"
              title="Choose the learning format that suits you best"
              description="The library mixes beginner content, templates, checklists and future resources so the hub can grow with the audience."
              center
            />

            <StaggerReveal step={35} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {resourceLibrary.map((card) => (
                <LearnSectionCard key={card.title} {...card} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="why-learn" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Why Learn with Altroz?"
              title="Learning content that is simple, practical and built for real teams"
              description="The hub is designed to help readers understand concepts quickly and then apply them in real work."
              center
            />

            <StaggerReveal step={35} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {whyLearnCards.map((card) => (
                <LearnSectionCard key={card.title} {...card} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="Quick answers for learners and search readers"
              description="These answers cover the page structure, the learning topics and how to move from learning into action."
              center
            />

            <div className="mx-auto mt-8 max-w-5xl">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={item.question}
                    value={`faq-${index}`}
                    className="overflow-hidden rounded-[1.25rem] border border-border bg-white px-5 shadow-card"
                  >
                    <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pt-0 text-sm leading-7 text-ink-soft">
                      {item.answer}
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
                  <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">Final CTA</div>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                    Start Learning Smarter Asset Management Today
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-ink-soft">
                    Explore expert guides, best practices, implementation resources and educational content
                    to improve asset management across your organisation with Altroz Asset Management.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <a href="#resource-library" className="btn-primary">
                    Explore Guides
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link to={ROUTES.bookDemo} className="btn-outline">
                    Book Free Demo
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
