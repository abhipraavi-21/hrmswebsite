"use client";

import type { ComponentType, ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  CircleDot,
  ClipboardList,
  Factory,
  FileText,
  GraduationCap,
  Handshake,
  HeartPulse,
  Laptop2,
  LayoutDashboard,
  Lightbulb,
  MapPinned,
  Package,
  PackageCheck,
  QrCode,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  Truck,
  Users,
  Workflow,
  Wrench,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AssetManagementNavbar from "@/components/site/AssetManagementNavbar";
import Footer from "@/components/site/Footer";
import PageSEO from "@/components/site/PageSEO";
import { resolveSiteUrl } from "@/lib/siteUrl";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { ROUTES } from "@/routes/routeConfig.js";
import { cn } from "@/lib/utils";

type Icon = ComponentType<{ className?: string }>;

type CardData = {
  title: string;
  description: string;
  icon: Icon;
  href?: string;
  note?: string;
};

type ValueData = {
  title: string;
  description: string;
  practical: string;
  icon: Icon;
};

type Faq = {
  q: string;
  a: string;
};

type InfoRow = {
  label: string;
  value: string;
};

const pageTitle = "About Us - Altroz Asset Management | Altroz Technologies";
const pageDescription =
  "Learn about Altroz Technologies Pvt. Ltd. and Altroz Asset Management - a centralised platform for asset registration, tracking, maintenance, warranty and reporting.";

const quickLinks = [
  { label: "Asset Management", href: ROUTES.assetManagementHome },
  { label: "Asset Tracking", href: ROUTES.bulkEmailAssetTracking },
  { label: "QR Codes", href: ROUTES.bulkEmailAssetQrCode },
  { label: "Maintenance", href: ROUTES.bulkEmailAssetMaintenance },
  { label: "Reports", href: ROUTES.bulkEmailAssetReports },
  { label: "Pricing", href: ROUTES.assetManagementPricing },
  { label: "FAQs", href: ROUTES.assetManagementFaq },
  { label: "Contact", href: ROUTES.assetManagementContact },
];

const heroStats = [
  { label: "Asset Register", value: "Centralised" },
  { label: "Identification", value: "QR Ready" },
  { label: "Maintenance", value: "Tracked" },
  { label: "Reports", value: "Visible" },
];

const heroHighlights: CardData[] = [
  {
    title: "Register",
    description: "Create organised records for physical business assets.",
    icon: Package,
  },
  {
    title: "Assign",
    description: "Keep asset ownership clear across people, teams and branches.",
    icon: Users,
  },
  {
    title: "Maintain",
    description: "Record service activity, warranty status and asset history.",
    icon: Wrench,
  },
];

const challengeItems = [
  "Spreadsheet-based asset records that are hard to keep updated and easy to lose track of",
  "Manual asset registers that depend on individual employees remembering to update them",
  "Difficulty knowing exactly who currently holds or is responsible for an asset",
  "Confusion during asset transfers between employees, departments or branches",
  "Maintenance records scattered across emails, paper files and individual systems",
  "Warranty information that is difficult to monitor, leading to missed claims",
  "Audits that take far longer than they should because records are incomplete or outdated",
  "Limited visibility into assets across different departments",
  "Limited visibility into assets across different branch locations",
  "Reporting that takes significant manual effort and is often outdated by the time it is ready",
];

const approachCards: CardData[] = [
  {
    title: "Simple",
    description:
      "The platform is designed to be understood quickly, without lengthy training or technical expertise.",
    icon: CircleDot,
  },
  {
    title: "Centralised",
    description:
      "Asset registration, assignment, maintenance, warranty and history live in one place.",
    icon: LayoutDashboard,
  },
  {
    title: "Practical",
    description:
      "Features are built around real asset management workflows, not abstract functionality.",
    icon: ClipboardList,
  },
  {
    title: "Scalable",
    description:
      "The platform supports businesses as their asset base, departments and branches grow.",
    icon: PackageCheck,
  },
  {
    title: "Business-focused",
    description:
      "Every feature is evaluated against whether it genuinely helps a business manage assets better.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Easy to adopt",
    description: "Teams should be able to start using the platform without a steep learning curve.",
    icon: Users,
  },
];

const missionCards: CardData[] = [
  {
    title: "Our Mission",
    description:
      "Help businesses simplify how they manage physical assets, improve visibility across departments and branches, reduce manual administrative work, support better accountability and make more informed operational decisions using accurate centralised asset data.",
    icon: Target,
  },
  {
    title: "Our Vision",
    description:
      "Create a digital-first future where businesses no longer rely on spreadsheets and manual registers to track what they own, with technology that keeps improving as their needs evolve.",
    icon: Sparkles,
  },
];

const valueCards: ValueData[] = [
  {
    title: "Customer First",
    description: "We design around real business needs, not assumptions.",
    practical: "Features are shaped by how businesses actually manage assets.",
    icon: Users,
  },
  {
    title: "Simplicity",
    description: "Software should be easy to understand and use.",
    practical: "Teams can adopt the platform without lengthy training.",
    icon: CircleDot,
  },
  {
    title: "Transparency",
    description: "We communicate clearly about what our product does and does not do.",
    practical: "No exaggerated claims - just accurate information.",
    icon: MessageIcon,
  },
  {
    title: "Reliability",
    description: "Businesses depend on accurate asset records.",
    practical: "We build a platform teams can rely on for day-to-day use.",
    icon: BadgeCheck,
  },
  {
    title: "Continuous Improvement",
    description: "We keep refining the platform based on how businesses actually use it.",
    practical: "Ongoing updates are aimed at real operational needs.",
    icon: Lightbulb,
  },
  {
    title: "Business Practicality",
    description: "Every feature must solve a genuine asset management problem.",
    practical: "We avoid unnecessary complexity for its own sake.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Security & Responsibility",
    description: "We take the handling of business data seriously.",
    practical: "Responsible data practices are a foundation of how we operate.",
    icon: ShieldCheck,
  },
  {
    title: "Long-Term Partnership",
    description: "We aim to support businesses well beyond initial setup.",
    practical: "Ongoing support grows with your asset management needs.",
    icon: Handshake,
  },
];

const lifecycleSteps: CardData[] = [
  {
    title: "Asset Registration",
    description: "Create the first digital record for each asset with clear ownership details.",
    icon: FileText,
    href: ROUTES.assetManagementHome,
  },
  {
    title: "Asset Assignment",
    description: "Assign assets to an employee, department or branch so accountability is visible.",
    icon: Users,
    href: ROUTES.assetManagementHome,
  },
  {
    title: "QR Code Asset Identification",
    description: "Use QR codes for faster lookup, verification and asset identification.",
    icon: QrCode,
    href: ROUTES.bulkEmailAssetQrCode,
  },
  {
    title: "Asset Tracking",
    description: "Track where assets are, who holds them and how they move over time.",
    icon: MapPinned,
    href: ROUTES.bulkEmailAssetTracking,
  },
  {
    title: "Asset Maintenance",
    description: "Record maintenance activity so service history is easier to review.",
    icon: Wrench,
    href: ROUTES.bulkEmailAssetMaintenance,
  },
  {
    title: "Warranty Tracking",
    description: "Monitor warranty information and timelines alongside each asset record.",
    icon: ShieldCheck,
    href: ROUTES.bulkEmailAssetMaintenance,
  },
  {
    title: "Asset History",
    description: "Keep a full trail of assignment, movement, maintenance and status changes.",
    icon: Workflow,
    href: ROUTES.bulkEmailAssetDashboard,
  },
  {
    title: "Asset Reports & Dashboard Analytics",
    description: "Use dashboard views and reports for audits, reviews and decisions.",
    icon: BarChart3,
    href: ROUTES.bulkEmailAssetReports,
  },
];

const industryCards: CardData[] = [
  {
    title: "Manufacturing",
    description: "Designed for tracking machinery, tools and equipment across production floors.",
    icon: Factory,
  },
  {
    title: "IT & Technology",
    description: "Suitable for managing laptops, servers and IT hardware assigned to employees.",
    icon: Laptop2,
  },
  {
    title: "Healthcare",
    description: "Can support tracking of medical equipment and facility assets.",
    icon: HeartPulse,
  },
  {
    title: "Education",
    description: "Suitable for managing institutional assets across campuses and departments.",
    icon: GraduationCap,
  },
  {
    title: "Retail",
    description: "Can support tracking of store equipment and fixtures across locations.",
    icon: Store,
  },
  {
    title: "Construction",
    description: "Designed for tracking tools and equipment across project sites.",
    icon: Truck,
  },
  {
    title: "Corporate Offices",
    description: "Suitable for managing IT equipment, furniture and office assets.",
    icon: Building2,
  },
  {
    title: "Warehousing",
    description: "Can support tracking of equipment and inventory-handling assets.",
    icon: PackageCheck,
  },
  {
    title: "Government Organisations",
    description: "Suitable for departments needing structured, auditable asset records.",
    icon: BadgeCheck,
  },
  {
    title: "SMEs",
    description: "Designed to be simple enough for smaller teams to adopt quickly.",
    icon: Target,
  },
  {
    title: "Large Enterprises",
    description: "Built to scale across multiple departments and branch locations.",
    icon: BriefcaseBusiness,
  },
];

const technologyPrinciples = [
  "Reduce unnecessary manual processes involved in tracking assets",
  "Keep asset information organised in one accessible place",
  "Make important information easier to find when it is needed",
  "Give teams better visibility into what the business owns and where it is",
  "Support accountability by making asset ownership and history clear",
  "Make reporting easier and less time-consuming",
  "Help businesses scale their asset management processes as they grow",
];

const reasonCards: CardData[] = [
  {
    title: "Centralised Asset Information",
    description: "All asset data in one platform instead of scattered spreadsheets.",
    icon: LayoutDashboard,
  },
  {
    title: "Asset Visibility",
    description: "A clear, current view of what assets exist and where they are.",
    icon: Search,
  },
  {
    title: "QR Code Identification",
    description: "Quick asset lookup and verification using QR codes.",
    icon: QrCode,
  },
  {
    title: "Maintenance Management",
    description: "Structured tracking of asset maintenance activities.",
    icon: Wrench,
  },
  {
    title: "Warranty Tracking",
    description: "Easier monitoring of warranty status and timelines.",
    icon: ShieldCheck,
  },
  {
    title: "Asset History",
    description: "A complete record of an asset's assignments and activity over time.",
    icon: Workflow,
  },
  {
    title: "Reports & Analytics",
    description: "Dashboard-based reporting that reduces manual compilation work.",
    icon: BarChart3,
  },
  {
    title: "Department & Branch Management",
    description: "Asset visibility organised across departments and branch locations.",
    icon: Building2,
  },
];

const customerFocusItems = [
  "Understanding your business requirements before recommending how to use the platform",
  "Keeping the product experience simple so teams can adopt it without disruption",
  "Being responsive when businesses need support or have questions",
  "Continuously improving the product based on real usage and feedback",
  "Supporting practical, workable implementation rather than a one-size-fits-all rollout",
  "Building long-term relationships that continue well beyond initial setup",
];

const companyInfo: InfoRow[] = [
  { label: "Company Name", value: "Altroz Technologies Pvt. Ltd." },
  { label: "Product", value: "Altroz Asset Management" },
  { label: "Industry", value: "Enterprise SaaS / Business Software" },
  { label: "Website", value: "To be verified" },
  { label: "Head Office", value: "To be verified" },
  { label: "Email", value: "To be verified" },
  { label: "Phone", value: "To be verified" },
  { label: "Founded", value: "To be added only if verified" },
  { label: "Leadership", value: "To be added only if verified" },
];

const faqItems: Faq[] = [
  {
    q: "What is Altroz Technologies Pvt. Ltd.?",
    a: "Altroz Technologies Pvt. Ltd. is a business technology company that builds practical software for operational challenges businesses face. Its flagship product is Altroz Asset Management, an enterprise asset management platform.",
  },
  {
    q: "What is Altroz Asset Management?",
    a: "Altroz Asset Management is a centralised software platform that helps businesses register, assign, track, maintain and report on their physical assets - replacing manual registers and spreadsheets with one organised digital system.",
  },
  {
    q: "What does Altroz Asset Management help businesses manage?",
    a: "The platform supports asset registration, asset assignment, asset tracking, QR code asset identification, maintenance scheduling, warranty tracking, asset history and reporting through a central dashboard.",
  },
  {
    q: "Who can use Altroz Asset Management?",
    a: "The platform is designed for business owners, operations and facility managers, IT teams, finance and procurement teams, and administration teams across a range of industries.",
  },
  {
    q: "Is Altroz Asset Management suitable for small businesses?",
    a: "Yes. The platform is built to be simple to adopt, which makes it suitable for smaller teams that want organised asset records without a steep learning curve.",
  },
  {
    q: "Can enterprises use Altroz Asset Management?",
    a: "Yes. The platform is designed to scale across multiple departments and branch locations, which makes it suitable for larger organisations as well.",
  },
  {
    q: "Can businesses manage assets across departments?",
    a: "Yes. Altroz Asset Management includes department-level organisation, so asset visibility can be maintained across different teams within a business.",
  },
  {
    q: "Can businesses manage assets across branches?",
    a: "Yes. The platform supports branch management, allowing businesses with multiple locations to track assets by branch.",
  },
  {
    q: "Does Altroz Asset Management support QR Code asset management?",
    a: "Yes. Assets can be identified using QR codes, making it faster to look up and verify asset details.",
  },
  {
    q: "Can businesses track asset maintenance?",
    a: "Yes. The platform includes asset maintenance tracking, so maintenance activity can be recorded and monitored over time.",
  },
  {
    q: "Can businesses manage warranty information?",
    a: "Yes. Warranty tracking is built into the platform, helping businesses monitor warranty timelines for their assets.",
  },
  {
    q: "Can businesses generate asset reports?",
    a: "Yes. Altroz Asset Management includes reporting and dashboard analytics, giving businesses a centralised view of their asset data.",
  },
  {
    q: "How can I learn more about Altroz Asset Management?",
    a: "You can explore the Asset Management product page for a detailed look at platform features, or reach out through the Contact Us page for specific questions.",
  },
  {
    q: "How can I request a demo?",
    a: "You can request a demo using the Book a Demo option on this page or on the product page, where the team can walk you through the platform.",
  },
  {
    q: "How can I contact Altroz Technologies?",
    a: "You can get in touch through the Contact Us page. Direct email and phone information should be added only after the verified contact details are confirmed.",
  },
];

function MessageIcon({ className }: { className?: string }) {
  return <FileText className={className} />;
}

function MaybeLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
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
  center = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  center?: boolean;
}) {
  return (
    <ScrollReveal
      variant="fade-up"
      className={cn(center ? "mx-auto max-w-4xl text-center" : "max-w-4xl")}
    >
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

function IconCard({ card, index = 0 }: { card: CardData; index?: number }) {
  const Icon = card.icon;

  return (
    <ScrollReveal variant="fade-up" delay={index * 40}>
      <article className="soft-card group h-full p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-float">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-[#14b8a6]/14 text-primary shadow-sm transition-transform duration-300 group-hover:scale-105">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
        <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
        {card.href ? (
          <MaybeLink
            href={card.href}
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary"
          >
            Explore
            <ArrowRight className="h-4 w-4" />
          </MaybeLink>
        ) : null}
        {card.note ? <p className="mt-3 text-xs leading-5 text-ink-soft">{card.note}</p> : null}
      </article>
    </ScrollReveal>
  );
}

function AboutDashboardMock() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="dashboard-glow left-1/2 top-10 -translate-x-1/2" />
      <div className="soft-card relative overflow-hidden rounded-[2rem] border border-border bg-white/95 p-5 shadow-float">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-[#14b8a6]/14 text-primary shadow-sm">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
              Altroz Asset Management
            </div>
            <div className="mt-1 text-lg font-semibold text-ink">
              Register, track, maintain and report in one place
            </div>
          </div>
          <div className="ml-auto rounded-full bg-primary/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            Live
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] bg-gradient-to-br from-primary/6 via-white to-[#14b8a6]/8 p-5">
          <div className="flex flex-wrap gap-2">
            {["Assets", "QR Codes", "Tracking", "Maintenance", "Reports"].map((item) => (
              <span
                key={item}
                className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#0f766e]">
              Asset lifecycle
            </div>
            <div className="mt-2 text-sm font-semibold text-ink">
              From registration to reporting, every asset keeps a clear history.
            </div>
            <div className="mt-4 grid gap-2">
              {["Register", "Assign", "Identify", "Track", "Maintain", "Report"].map(
                (item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-surface/70 p-3 text-sm text-ink"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              ["Branch visibility", "Clear"],
              ["Warranty status", "Tracked"],
              ["Audit records", "Ready"],
              ["Maintenance history", "Stored"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0f766e]">
                  {label}
                </div>
                <div className="mt-1 text-lg font-black text-ink">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutUsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: resolveSiteUrl(ROUTES.home),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About Us",
        item: resolveSiteUrl(ROUTES.about),
      },
    ],
  };

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Altroz Asset Management",
    url: resolveSiteUrl(ROUTES.about),
    description: pageDescription,
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Altroz Asset Management",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: resolveSiteUrl(ROUTES.assetManagementHome),
      publisher: {
        "@type": "Organization",
        name: "Altroz Technologies Pvt. Ltd.",
        url: resolveSiteUrl(ROUTES.home),
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(11,92,255,0.08),_transparent_36%),linear-gradient(180deg,_#ffffff_0%,_#f7fbff_100%)]">
      <PageSEO
        title={pageTitle}
        description={pageDescription}
        canonicalPath={ROUTES.about}
        ogTitle="About Altroz Asset Management"
        ogDescription="Altroz Technologies Pvt. Ltd. builds Altroz Asset Management - a centralised platform to register, track, maintain and report on business assets."
      />

      <AssetManagementNavbar />

      <main className="overflow-x-hidden">
        <section className="relative overflow-hidden py-14 sm:py-16 lg:py-20">
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-[#14b8a6]/12 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />

          <div className="site-container">
            <div className="mx-auto max-w-5xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-xs font-extrabold tracking-[0.22em] text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                About Altroz Asset Management
              </span>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Building Smarter Ways to Manage Business Assets
              </h1>
              <p className="mx-auto mt-5 max-w-4xl text-base leading-7 text-ink-soft sm:text-lg">
                Altroz Technologies Pvt. Ltd. builds business software that helps organisations run
                more efficiently, and Altroz Asset Management is our platform for one specific
                challenge: keeping track of everything a business owns. From equipment and IT
                hardware to furniture and machinery, Altroz Asset Management gives teams a single,
                centralised place to register, assign, track, maintain and report on physical
                assets.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Link to={ROUTES.bookDemo} className="btn-primary">
                  Book a Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to={ROUTES.assetManagementHome} className="btn-outline">
                  Explore Asset Management
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {quickLinks.map((item) => (
                  <MaybeLink
                    key={item.label}
                    href={item.href}
                    className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-ink-soft shadow-sm transition hover:border-primary/30 hover:text-primary"
                  >
                    {item.label}
                  </MaybeLink>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
              <ScrollReveal variant="fade-up" className="text-center lg:text-left">
                <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-primary sm:text-3xl lg:mx-0">
                  A practical platform for asset registration, assignment, tracking, maintenance and
                  reporting
                </h2>

                <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg lg:mx-0">
                  Businesses accumulate computers, machinery, tools, furniture, vehicles and more
                  over time. Altroz Asset Management was built to bring that information into one
                  organised digital system instead of leaving it spread across spreadsheets, paper
                  registers and individual departments.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {heroHighlights.map((item) => {
                    const Icon = item.icon;

                    return (
                      <article
                        key={item.title}
                        className="soft-card flex h-full flex-col p-4 text-left"
                      >
                        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-[#14b8a6]/14 text-primary shadow-sm">
                          <Icon className="h-5 w-5" />
                        </span>
                        <h3 className="mt-4 text-base font-semibold text-ink">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
                      </article>
                    );
                  })}
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-4">
                  {heroStats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-border bg-white p-4 shadow-sm"
                    >
                      <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                        {item.label}
                      </div>
                      <div className="mt-1 text-base font-black text-ink">{item.value}</div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal variant="scale" className="relative">
                <AboutDashboardMock />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Who We Are"
              title="Altroz Technologies builds practical software for everyday operational challenges"
              description="Our flagship product, Altroz Asset Management, is an enterprise asset management platform designed to help organisations organise, track, maintain, monitor and report on physical business assets."
              center
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <ScrollReveal variant="fade-up" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Our Focus
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  One centralised platform instead of scattered records
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-7 text-ink-soft">
                  <p>
                    Altroz Technologies Pvt. Ltd. is a business technology company focused on
                    building practical software for everyday operational challenges.
                  </p>
                  <p>
                    Altroz Asset Management helps organisations bring asset information into one
                    centralised digital platform, so teams can see who holds what, where it is
                    located, when it needs maintenance and what history is attached to it.
                  </p>
                  <p>
                    Additional verified company background can be added here once confirmed by the
                    Altroz team.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Why It Matters
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  Asset visibility gets harder as a business grows
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  The challenge is not just owning assets. It is knowing what exists, who is
                  responsible for it, where it is being used, whether it needs service and whether
                  the record is audit-ready.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "Clear asset ownership and accountability",
                    "Better visibility across departments and branches",
                    "Maintenance and warranty information in context",
                    "Reports that reduce manual compilation work",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-xl bg-white p-3 text-sm font-medium text-ink shadow-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {item}
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Why We Built It"
              title="Altroz Asset Management was built to replace manual asset confusion"
              description="Most organisations still manage assets through spreadsheets, manual registers and disconnected records. That starts to break down as assets, departments, branches and employees grow."
              center
            />

            <StaggerReveal step={35} className="mt-8 grid gap-3 md:grid-cols-2">
              {challengeItems.map((item, index) => (
                <article key={item} className="soft-card flex items-start gap-3 p-4">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-black text-primary">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-ink-soft">{item}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="A Simpler Approach"
              title="Business software should make work easier, not add complexity"
              description="This belief shapes how Altroz Asset Management is planned, designed and improved."
              center
            />

            <StaggerReveal step={40} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {approachCards.map((card, index) => (
                <IconCard key={card.title} card={card} index={index} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="mission" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Mission & Vision"
              title="We want asset management to be digital-first by default"
              description="Our mission and vision focus on clarity, accountability and practical workflows that grow alongside the businesses we serve."
              center
            />

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {missionCards.map((card, index) => {
                const Icon = card.icon;

                return (
                  <ScrollReveal key={card.title} variant="fade-up" delay={index * 60}>
                    <article className="soft-card h-full p-6">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-[#14b8a6]/14 text-primary shadow-sm">
                        <Icon className="h-6 w-6" />
                      </span>
                      <h3 className="mt-5 text-2xl font-bold text-ink">{card.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-ink-soft">{card.description}</p>
                    </article>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="values" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Our Core Values"
              title="The principles behind the product and the partnership"
              description="These values guide how we build Altroz Asset Management and how we work with businesses that use it."
              center
            />

            <StaggerReveal step={35} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {valueCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article key={card.title} className="soft-card h-full p-5">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-[#14b8a6]/14 text-primary shadow-sm">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                    <p className="mt-3 rounded-2xl bg-primary-soft/60 p-3 text-xs font-medium leading-5 text-ink-soft">
                      Practical meaning: {card.practical}
                    </p>
                  </article>
                );
              })}
            </StaggerReveal>
          </div>
        </section>

        <section id="asset-lifecycle" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="What We Help Businesses Manage"
              title="The full asset lifecycle in one centralised platform"
              description="An asset is registered, assigned, identified, tracked, maintained, monitored for warranty status and reviewed through reports whenever needed."
              center
            />

            <StaggerReveal step={40} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {lifecycleSteps.map((card, index) => (
                <IconCard key={card.title} card={card} index={index} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="who-we-serve" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Who We Serve"
              title="Built for organisations that need structured asset records"
              description="Altroz Asset Management is designed to support teams across industries, using careful wording where a use case is suitable rather than claimed as a verified customer story."
              center
            />

            <StaggerReveal step={35} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {industryCards.map((card, index) => (
                <IconCard key={card.title} card={card} index={index} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Technology Should Make Business Simpler"
              title="The product philosophy is practical, visible and accountable"
              description="Altroz Asset Management is shaped around reducing manual effort and giving teams the information they need when they need it."
              center
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <ScrollReveal variant="fade-up" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Simpler Operations
                </div>
                <div className="mt-5 space-y-3">
                  {technologyPrinciples.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl bg-white p-4 text-sm font-medium leading-6 text-ink shadow-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" className="grid gap-4 md:grid-cols-2">
                {reasonCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <article key={card.title} className="soft-card h-full p-5">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-[#14b8a6]/14 text-primary shadow-sm">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                    </article>
                  );
                })}
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Built Around Your Business"
              title="Implementation should start with how your business actually works"
              description="Every customer relationship begins with understanding the current asset management process and where it creates friction."
              center
            />

            <StaggerReveal step={40} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {customerFocusItems.map((item, index) => (
                <article key={item} className="soft-card h-full p-5">
                  <span className="rounded-full bg-primary-soft px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                    Focus {index + 1}
                  </span>
                  <p className="mt-4 text-sm font-medium leading-7 text-ink-soft">{item}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section scroll-mt-24">
          <div className="site-container">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <ScrollReveal variant="fade-up" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Company Information
                </div>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">
                  Altroz Technologies Pvt. Ltd.
                </h2>
                <div className="mt-5 divide-y divide-border overflow-hidden rounded-[1.5rem] border border-border bg-white">
                  {companyInfo.map((row) => (
                    <div key={row.label} className="grid gap-1 p-4 sm:grid-cols-[11rem_1fr]">
                      <dt className="text-xs font-black uppercase tracking-[0.18em] text-primary">
                        {row.label}
                      </dt>
                      <dd className="text-sm font-medium text-ink-soft">{row.value}</dd>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Trust Section
                </div>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">
                  Practical technology, honest communication and continuous improvement
                </h2>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  Technology is only valuable when it solves a real business problem. That is the
                  standard we hold Altroz Asset Management to - not a list of features, but whether
                  it genuinely makes asset management easier, clearer and more reliable for the
                  businesses that use it.
                </p>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  Verified trust elements such as certifications, partnerships or customer figures
                  can be added once available. No unverified statistics, awards, ratings or
                  testimonials are included here.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="Common questions about Altroz Asset Management"
              description="A short answer to the questions businesses ask most often about the company and the asset management platform."
              center
            />

            <div className="mx-auto mt-8 max-w-4xl">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item) => (
                  <AccordionItem key={item.q} value={item.q} className="soft-card px-5">
                    <AccordionTrigger className="py-5 text-left text-base font-semibold text-ink hover:no-underline [&>svg]:text-primary">
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

        <section className="section">
          <div className="site-container">
            <div className="soft-card overflow-hidden rounded-[2.25rem] border border-primary/15 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.18),_transparent_34%),linear-gradient(135deg,_#071a35_0%,_#0b5cff_100%)] p-8 text-white shadow-float sm:p-10">
              <div className="mx-auto max-w-4xl text-center">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-white/75">
                  Ready to Simplify Your Asset Management?
                </div>
                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                  Explore how Altroz Asset Management can fit into your workflow
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/80">
                  From registration and tracking to maintenance and reporting, book a demo to see
                  the platform in action or explore the asset management product page to learn more.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    to={ROUTES.bookDemo}
                    className="btn-primary justify-center bg-white text-primary hover:bg-white/90"
                  >
                    Book a Demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to={ROUTES.assetManagementHome}
                    className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-full border border-white/35 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
                  >
                    Explore Asset Management
                  </Link>
                  <Link
                    to={ROUTES.assetManagementContact}
                    className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-full border border-white/35 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Link
        to={ROUTES.bookDemo}
        className="fixed bottom-5 right-5 z-40 hidden rounded-full bg-primary px-5 py-3 text-sm font-black text-white shadow-[0_18px_45px_rgba(11,92,255,0.28)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
      >
        Book Demo
      </Link>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Footer />
    </div>
  );
}

export default AboutUsPage;
