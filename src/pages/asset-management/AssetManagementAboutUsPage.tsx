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
  Smartphone,
  Store,
  Target,
  Truck,
  Users,
  Workflow,
  Wrench,
  Wallet,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from "@/components/site/Footer";
import AssetManagementNavbar from "@/components/site/AssetManagementNavbar";
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

const pageTitle = "About Altroz Asset Management | Business Asset Platform by Altroz Technologies";
const pageDescription =
  "Learn about Altroz Asset Management, a business asset platform by Altroz Technologies Pvt. Ltd. Discover our mission, vision and approach to organised asset control.";

const quickLinks = [
  { label: "Home", href: ROUTES.assetManagementHome },
  { label: "Asset Management", href: ROUTES.assetManagement },
  { label: "Asset Tracking", href: `${ROUTES.assetManagement}#asset-tracking` },
  { label: "QR Code Asset Management", href: `${ROUTES.assetManagement}#qr-code-asset-management` },
  { label: "Asset Maintenance", href: `${ROUTES.assetManagement}#asset-maintenance` },
  { label: "Asset Reports", href: `${ROUTES.assetManagement}#asset-reports` },
  { label: "Pricing", href: ROUTES.assetManagementPricing },
  { label: "Book a Demo", href: ROUTES.assetManagementBookDemo },
  { label: "Contact Us", href: ROUTES.assetManagementContact },
  { label: "Learn", href: ROUTES.assetManagementLearn },
  { label: "Blog", href: ROUTES.assetManagementBlog },
  { label: "FAQs", href: ROUTES.assetManagementFaq },
];

const heroStats = [
  { label: "Centralised Asset Records", value: "One place for assets, owners and locations" },
  { label: "QR Code Visibility", value: "Fast lookup across departments and branches" },
  { label: "Built for Growth", value: "Designed for SMEs and larger organisations" },
];

const heroHighlights: CardData[] = [
  {
    title: "Centralised Registry",
    description: "Keep every business asset in one organised digital system.",
    icon: LayoutDashboard,
  },
  {
    title: "QR Code Identification",
    description: "Assign QR codes to assets so teams can verify records instantly.",
    icon: QrCode,
  },
  {
    title: "Maintenance and Reporting",
    description: "Track maintenance, warranty and reporting from a single dashboard.",
    icon: BarChart3,
  },
];

const challengeItems = [
  "Spreadsheets and paper registers are easy to lose track of and hard to keep current as the business grows.",
  "Teams often need to know who has an asset, where it is, and when it needs maintenance or replacement.",
  "Altroz Asset Management was created to bring registration, assignment, tracking and reporting into one platform.",
];

const approachCards: CardData[] = [
  {
    title: "Simple",
    description: "The platform is designed to be understood quickly, without lengthy training or technical expertise.",
    icon: CircleDot,
  },
  {
    title: "Centralised",
    description: "Asset information lives in one place instead of scattered across files and departments.",
    icon: LayoutDashboard,
  },
  {
    title: "Practical",
    description: "Features are built around real asset management workflows, not abstract functionality.",
    icon: ClipboardList,
  },
  {
    title: "Scalable",
    description: "The platform is designed to support businesses as their asset base, departments and branches grow.",
    icon: PackageCheck,
  },
  {
    title: "Business-Focused",
    description: "Every feature is evaluated against a simple question: does this genuinely help a business manage assets better?",
    icon: BriefcaseBusiness,
  },
  {
    title: "Easy Adoption",
    description: "Teams should be able to start using the platform without a steep learning curve.",
    icon: Laptop2,
  },
  {
    title: "Security & Responsibility",
    description: "We take the handling of business data seriously and build with responsible data practices in mind.",
    icon: ShieldCheck,
  },
  {
    title: "Long-Term Partnership",
    description: "We aim to support businesses well beyond initial setup.",
    icon: Handshake,
  },
];

const missionCards: CardData[] = [
  {
    title: "Our Mission",
    description:
      "Our mission is to help businesses simplify how they manage their physical assets. We aim to improve visibility across departments and branches, reduce manual administrative work, support better asset accountability, and help organisations make more informed operational decisions using accurate, centralised asset data.",
    icon: Target,
  },
  {
    title: "Our Vision",
    description:
      "We see a future where asset management is digital-first by default, with simplified workflows and technology that grows alongside the business. Our vision is to help organisations move toward smarter, more visible business operations and continue improving as their needs evolve.",
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
    icon: Lightbulb,
  },
  {
    title: "Transparency",
    description: "We communicate clearly about what our product does and does not do.",
    practical: "No exaggerated claims - just accurate information.",
    icon: FileText,
  },
  {
    title: "Reliability",
    description: "Businesses depend on accurate asset records.",
    practical: "We build a platform teams can consistently rely on for day-to-day use.",
    icon: BadgeCheck,
  },
  {
    title: "Continuous Improvement",
    description: "We keep refining the platform based on how businesses actually use it.",
    practical: "Ongoing updates aimed at real operational needs.",
    icon: Workflow,
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
    practical: "Responsible data practices are part of how we operate.",
    icon: ShieldCheck,
  },
  {
    title: "Long-Term Partnership",
    description: "We aim to support businesses well beyond initial setup.",
    practical: "Ongoing support as your asset management needs grow.",
    icon: Handshake,
  },
];

const managementAreas: CardData[] = [
  { title: "Asset Registration", description: "Record every asset in a structured digital system.", icon: FileText, href: ROUTES.assetManagement },
  { title: "Asset Assignment", description: "Keep track of which employee, department or branch holds each asset.", icon: Users, href: ROUTES.assetManagement },
  { title: "QR Code Asset Identification", description: "Use QR codes for fast lookup and verification.", icon: QrCode, href: ROUTES.assetManagement },
  { title: "Asset Tracking", description: "Monitor the location and status of assets across the business.", icon: MapPinned, href: ROUTES.assetManagement },
  { title: "Asset Maintenance", description: "Schedule and record maintenance activity over time.", icon: Wrench, href: ROUTES.assetManagement },
  { title: "Warranty Tracking", description: "Track warranty timelines and claim windows.", icon: Wallet, href: ROUTES.assetManagement },
  { title: "Asset History", description: "Keep a full record of transfers, changes and activity.", icon: Workflow, href: ROUTES.assetManagement },
  { title: "Asset Reports & Dashboard Analytics", description: "Review asset data and reporting from a central dashboard.", icon: BarChart3, href: ROUTES.assetManagement },
];

const industryCards: CardData[] = [
  { title: "Manufacturing", description: "Track machinery, tools and production equipment.", icon: Factory },
  { title: "IT & Technology", description: "Manage laptops, servers and office hardware.", icon: Laptop2 },
  { title: "Healthcare", description: "Support medical equipment and facility assets.", icon: HeartPulse },
  { title: "Education", description: "Organise assets across campuses and departments.", icon: GraduationCap },
  { title: "Retail", description: "Track store equipment and fixtures across locations.", icon: Store },
  { title: "Construction", description: "Track tools and equipment across project sites.", icon: Truck },
  { title: "Corporate Offices", description: "Manage IT equipment, furniture and office assets.", icon: Building2 },
  { title: "Warehousing", description: "Support equipment and inventory-handling assets.", icon: Package },
  { title: "Government Organisations", description: "Maintain structured, auditable asset records.", icon: BadgeCheck },
  { title: "SMEs", description: "Keep asset records simple enough for smaller teams to adopt quickly.", icon: BriefcaseBusiness },
  { title: "Large Enterprises", description: "Scale across multiple departments and branch locations.", icon: Laptop2 },
];

const whyConsiderCards: CardData[] = [
  { title: "Centralised Asset Information", description: "All asset data in one platform instead of scattered spreadsheets.", icon: LayoutDashboard },
  { title: "Asset Visibility", description: "A clear, current view of what assets exist and where they are.", icon: Search },
  { title: "QR Code Identification", description: "Quick asset lookup and verification using QR codes.", icon: QrCode },
  { title: "Maintenance Management", description: "Structured tracking of asset maintenance activities.", icon: Wrench },
  { title: "Warranty Tracking", description: "Easier monitoring of warranty status and timelines.", icon: Wallet },
  { title: "Asset History", description: "A complete record of assignments and activity over time.", icon: Workflow },
  { title: "Reports & Analytics", description: "Dashboard-based reporting that reduces manual work.", icon: BarChart3 },
  { title: "Department & Branch Management", description: "Asset visibility organised across teams and locations.", icon: Building2 },
];

const customerFocusItems = [
  "We understand how your business actually manages its assets today and where the current process creates friction.",
  "We keep the product experience simple so teams can adopt it without disruption.",
  "We are responsive when businesses need support or have questions.",
  "We improve the product based on real usage and feedback.",
  "We support practical implementation rather than a one-size-fits-all rollout.",
  "We build long-term relationships that continue well beyond initial setup.",
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
    a: "Altroz Asset Management is a centralised software platform that helps businesses register, assign, track, maintain and report on their physical assets, replacing manual registers and spreadsheets with one organised digital system.",
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
    a: "You can request a demo using the Book a Demo option on this page or on the product page, where our team can walk you through the platform.",
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
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-[#1E4FD1]/14 text-primary shadow-sm transition-transform duration-300 group-hover:scale-105">
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
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-[#1E4FD1]/14 text-primary shadow-sm">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
              Altroz Asset Management
            </div>
            <div className="mt-1 text-lg font-semibold text-ink">
              Manage assets, ownership and maintenance in one place
            </div>
          </div>
          <div className="ml-auto rounded-full bg-primary/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            Live
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] bg-gradient-to-br from-primary/6 via-white to-[#1E4FD1]/8 p-5">
          <div className="flex flex-wrap gap-2">
            {["Assets", "QR Codes", "Maintenance", "Warranty", "Reports"].map((item) => (
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
              Asset workflow
            </div>
            <div className="mt-2 text-sm font-semibold text-ink">
              From registration to reporting, every asset record stays connected.
            </div>
            <div className="mt-4 grid gap-2">
              {["Register Asset", "Assign Owner", "Scan QR Code", "Track Location", "Schedule Maintenance", "Review Reports"].map(
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
              ["Asset records", "Centralised"],
              ["QR identification", "Fast"],
              ["Maintenance logs", "Structured"],
              ["Reporting", "Visible"],
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

function AssetManagementAboutUsPage() {
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
        name: "About Asset Management",
        item: resolveSiteUrl(ROUTES.assetManagementAbout),
      },
    ],
  };

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Altroz Asset Management",
    url: resolveSiteUrl(ROUTES.assetManagementAbout),
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
    <div className="asset-management-theme min-h-screen bg-gradient-to-b from-white via-[#f4fcfa] to-[#eef5ff]">
      <PageSEO
        title={pageTitle}
        description={pageDescription}
        canonicalPath={ROUTES.assetManagementAbout}
        ogTitle="About Altroz Asset Management"
        ogDescription="Altroz Technologies Pvt. Ltd. builds Altroz Asset Management - a centralised platform for registering, tracking, maintaining and reporting on business assets."
      />

      <AssetManagementNavbar />

      <main className="overflow-x-hidden">
        <section className="relative overflow-hidden py-14 sm:py-16 lg:py-20">
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-[#1E4FD1]/12 blur-3xl" />
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
                centralised place to register, assign, track, maintain and report on their
                physical assets.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Link to={ROUTES.assetManagementBookDemo} className="btn-primary">
                  Book Free Demo
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
                <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:mx-0">
                  A single, cloud-based system to manage assets from registration to reporting
                </h2>

                <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg lg:mx-0">
                  Bring registration, assignment, QR identification, tracking, maintenance,
                  warranty monitoring and reporting together in one place. Altroz Asset Management
                  is designed to support businesses of every size as their asset base grows.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {heroHighlights.map((item) => {
                    const Icon = item.icon;

                    return (
                      <article
                        key={item.title}
                        className="soft-card flex h-full flex-col p-4 text-left"
                      >
                        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-[#1E4FD1]/14 text-primary shadow-sm">
                          <Icon className="h-5 w-5" />
                        </span>
                        <h3 className="mt-4 text-base font-semibold text-ink">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
                      </article>
                    );
                  })}
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
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
              title="Altroz Technologies builds practical software for everyday business challenges"
              description="Altroz Asset Management is an enterprise asset management platform designed to help organisations organise, track, maintain, monitor and report on their physical business assets."
              center
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <ScrollReveal variant="fade-up" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Who We Are
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  Altroz Asset Management is built to help businesses manage their assets more
                  efficiently
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-7 text-ink-soft">
                  <p>
                    Altroz Asset Management is a business software platform developed by Altroz
                    Technologies Pvt. Ltd. We build practical tools that help organisations move
                    away from scattered spreadsheets, paper registers and disconnected records.
                  </p>
                  <p>
                    Businesses accumulate assets over time - computers, machinery, tools, furniture,
                    vehicles and more. Keeping accurate records of who holds what, where it is
                    located, and when it needs maintenance becomes more complex as a business grows.
                  </p>
                  <p>
                    Altroz Asset Management was built to address this problem by bringing asset
                    information into one centralised, digital platform instead of leaving it spread
                    across spreadsheets, paper registers and individual departments.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Why We Built It
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  Altroz Asset Management was created to solve everyday asset control problems
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  Most organisations still manage assets through spreadsheets, manual registers and
                  disconnected records. This approach works when a business is small, but it starts
                  to break down as the number of assets, departments, branches and employees grows.
                </p>

                <div className="mt-6 space-y-3">
                  {challengeItems.map((item) => (
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
              eyebrow="A Simpler Approach"
              title="We believe business software should make work easier, not more complicated"
              description="This shapes how we build Altroz Asset Management and how we think about every feature we add."
              center
            />

            <StaggerReveal step={35} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {approachCards.map((card, index) => (
                <IconCard key={card.title} card={card} index={index} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Our Mission"
              title="Helping businesses simplify how they manage their physical assets"
              description="We aim to improve visibility, reduce manual administration, support better accountability and help organisations make informed decisions using centralised asset data."
              center
            />

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {missionCards.map((card, index) => {
                const Icon = card.icon;

                return (
                  <ScrollReveal key={card.title} variant="fade-up" delay={index * 60}>
                    <article className="soft-card h-full p-6">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-[#1E4FD1]/14 text-primary shadow-sm">
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
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-[#1E4FD1]/14 text-primary shadow-sm">
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
              title="Altroz Asset Management brings the full asset lifecycle into a single platform"
              description="Registration, assignment, QR identification, tracking, maintenance, warranty monitoring and reporting all stay connected."
              center
            />

            <StaggerReveal step={40} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {managementAreas.map((card, index) => (
                <IconCard key={card.title} card={card} index={index} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="who-we-serve" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Who We Serve"
              title="Altroz Asset Management is designed to support organisations across a range of industries"
              description="Manufacturing, IT, healthcare, education, retail, construction, corporate offices, warehousing, government organisations, SMEs and large enterprises."
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
              eyebrow="Why Businesses Consider Altroz Asset Management"
              title="Simple, cloud-based and built around real asset workflows"
              description="A practical platform that helps teams reduce manual work, stay organised and support growing businesses."
              center
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <ScrollReveal variant="fade-up" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Simpler Operations
                </div>
                <div className="mt-5 space-y-3">
                  {whyConsiderCards.map((card) => (
                    <div
                      key={card.title}
                      className="flex items-start gap-3 rounded-2xl bg-white p-4 text-sm font-medium leading-6 text-ink shadow-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>
                        <span className="font-semibold text-ink">{card.title}: </span>
                        {card.description}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" className="grid gap-4 md:grid-cols-2">
                {whyConsiderCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <article key={card.title} className="soft-card h-full p-5">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 via-white to-[#1E4FD1]/14 text-primary shadow-sm">
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
              title="We focus on how your organisation actually manages assets today"
              description="From understanding your needs to ongoing support, our approach is built around practical implementation and long-term partnership."
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
              description="A short answer to the questions businesses ask most often about Altroz Asset Management."
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
            <div className="soft-card overflow-hidden rounded-[2.25rem] border border-primary/15 bg-[radial-gradient(circle_at_top_left,_rgba(11,122,122,0.18),_transparent_34%),linear-gradient(135deg,_#071a35_0%,_#1E4FD1_100%)] p-8 text-white shadow-float sm:p-10">
              <div className="mx-auto max-w-4xl text-center">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-white/75">
                  Ready to Simplify Your Asset Management?
                </div>
                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                  Explore how Altroz Asset Management can fit into your business workflow
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/80">
                  Book a demo to see the platform in action, or explore the asset management
                  product page to learn more about registration, tracking, maintenance and
                  reporting.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    to={ROUTES.assetManagementBookDemo}
                    className="btn-primary justify-center bg-white text-primary hover:bg-white/90"
                  >
                    Book Free Demo
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
        to={ROUTES.assetManagementBookDemo}
        className="fixed bottom-5 right-5 z-40 hidden rounded-full bg-primary px-5 py-3 text-sm font-black text-white shadow-[0_18px_45px_rgba(30,79,209,0.28)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
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

export default AssetManagementAboutUsPage;
