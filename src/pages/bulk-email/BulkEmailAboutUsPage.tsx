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
import BulkEmailNavbar from "@/components/site/BulkEmailNavbar";
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

const pageTitle = "About Altroz Bulk Email | Business Email Platform by Altroz Technologies";
const pageDescription =
  "Learn about Altroz Bulk Email, a business communication platform by Altroz Technologies Pvt. Ltd. Discover our mission, vision and approach to professional business communication.";

const quickLinks = [
  { label: "Home", href: ROUTES.bulkEmail },
  { label: "Email Broadcast", href: ROUTES.bulkEmailBroadcast },
  { label: "Templates", href: ROUTES.bulkEmailTemplates },
  { label: "Analytics", href: ROUTES.bulkEmailAnalytics },
  { label: "Scheduling", href: ROUTES.bulkEmailScheduling },
  { label: "SMTP", href: ROUTES.bulkEmailSmtp },
  { label: "HR Communication", href: ROUTES.bulkEmailHrCommunication },
  { label: "Marketing", href: ROUTES.bulkEmailMarketing },
  { label: "Education", href: ROUTES.bulkEmailEducation },
  { label: "Pricing", href: ROUTES.bulkEmailPricing },
  { label: "Book Free Demo", href: ROUTES.bookDemo },
  { label: "Contact Sales", href: ROUTES.bulkEmailContact },
  { label: "Learn", href: ROUTES.bulkEmailLearn },
];

const heroStats = [
  { label: "Modern Business Communication", value: "Built for growing businesses" },
  { label: "Single Centralised System", value: "Campaigns, templates and analytics together" },
  { label: "Built for Growth", value: "Supports small teams and enterprises" },
];

const heroHighlights: CardData[] = [
  {
    title: "Email Broadcasting",
    description: "Send professional email campaigns through a single, centralised system.",
    icon: LayoutDashboard,
  },
  {
    title: "Campaign Scheduling",
    description: "Plan communication in advance and schedule emails for the right time.",
    icon: Workflow,
  },
  {
    title: "Delivery Analytics",
    description: "Track delivery reports and understand how campaigns are performing.",
    icon: BarChart3,
  },
];

const challengeItems = [
  "Businesses often manage email communication through disconnected tools, manual processes or basic email accounts that were never built for organised, large-scale communication.",
  "This leads to inconsistent messaging, limited visibility into what was sent and no clear way to track how communication is performing.",
  "Altroz Bulk Email was created to bring broadcasting, scheduling, templates and reporting together in one place.",
];

const approachCards: CardData[] = [
  {
    title: "Customer First",
    description: "Every feature is built around a simple question: does this make communication easier for the businesses using it?",
    icon: CircleDot,
  },
  {
    title: "Simple Technology",
    description: "Powerful software should be easy to use, even for teams without a technical background.",
    icon: LayoutDashboard,
  },
  {
    title: "Business Productivity",
    description: "Centralised broadcasting, scheduling and templates help teams work faster with less manual repetition.",
    icon: ClipboardList,
  },
  {
    title: "Continuous Innovation",
    description: "The platform keeps evolving based on real usage and business requirements.",
    icon: PackageCheck,
  },
  {
    title: "Security",
    description: "Secure infrastructure helps organisations send business emails with confidence.",
    icon: Laptop2,
  },
  {
    title: "Reliability",
    description: "Consistent, dependable email delivery is central to how the platform is built.",
    icon: Workflow,
  },
  {
    title: "Transparency",
    description: "We are clear about what the platform does and how it works.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Long-Term Relationships",
    description: "We see every business using Altroz Bulk Email as a long-term partner.",
    icon: Handshake,
  },
];

const missionCards: CardData[] = [
  {
    title: "Our Mission",
    description:
      "Our mission is to simplify communication, support professional delivery and give teams the structure to plan and manage email campaigns in an organised way.",
    icon: Target,
  },
  {
    title: "Our Vision",
    description:
      "Our vision is to support the way businesses communicate in a digital-first world by building communication solutions that help organisations of every size communicate more efficiently.",
    icon: Sparkles,
  },
];

const valueCards: ValueData[] = [
  {
    title: "Customer First",
    description: "Every feature is measured against whether it makes business communication easier.",
    practical: "Customer needs guide the product decisions.",
    icon: Users,
  },
  {
    title: "Simple Technology",
    description: "We believe powerful software should not feel complicated.",
    practical: "Teams of any technical skill level can use it comfortably.",
    icon: Lightbulb,
  },
  {
    title: "Business Productivity",
    description: "The platform is built to save time and reduce repeated manual work.",
    practical: "Centralised email broadcasting and scheduling help teams work faster.",
    icon: CircleDot,
  },
  {
    title: "Continuous Innovation",
    description: "Business communication needs evolve, and so does the product.",
    practical: "Refinements are based on real usage and business requirements.",
    icon: MessageIcon,
  },
  {
    title: "Security",
    description: "We take the protection of business communication seriously.",
    practical: "Altroz Bulk Email is built with secure infrastructure.",
    icon: ShieldCheck,
  },
  {
    title: "Reliability",
    description: "Consistent, dependable email delivery is central to how we build.",
    practical: "Businesses rely on Altroz Bulk Email for time-sensitive communication.",
    icon: BadgeCheck,
  },
  {
    title: "Transparency",
    description: "We believe in being clear about what the platform does and how it works.",
    practical: "Businesses can make informed decisions about their communication tools.",
    icon: MessageIcon,
  },
  {
    title: "Long-Term Relationships",
    description: "We support businesses as their communication needs grow.",
    practical: "We aim to support your communication needs as you grow.",
    icon: Handshake,
  },
];

const lifecycleSteps: CardData[] = [
  {
    title: "Email Broadcast",
    description: "Create and send campaigns from a central dashboard.",
    icon: FileText,
    href: ROUTES.bulkEmailBroadcast,
  },
  {
    title: "Campaign Scheduling",
    description: "Plan email communication in advance and release it at the right time.",
    icon: Workflow,
    href: ROUTES.bulkEmailScheduling,
  },
  {
    title: "Templates",
    description: "Use ready-to-customise templates to maintain a consistent, professional look.",
    icon: LayoutDashboard,
    href: ROUTES.bulkEmailTemplates,
  },
  {
    title: "Email Analytics",
    description: "Understand how your emails are performing with clear reporting.",
    icon: BarChart3,
    href: ROUTES.bulkEmailAnalytics,
  },
  {
    title: "SMTP Configuration",
    description: "Connect your preferred SMTP setup to send emails through infrastructure that fits your business.",
    icon: Laptop2,
    href: ROUTES.bulkEmailSmtp,
  },
  {
    title: "Delivery Reports",
    description: "Track campaign status with detailed delivery reports for visibility and accountability.",
    icon: Search,
    href: ROUTES.bulkEmailAnalytics,
  },
  {
    title: "HR Communication",
    description: "Communicate policy updates, announcements and internal information in an organised way.",
    icon: Users,
    href: ROUTES.bulkEmailHrCommunication,
  },
  {
    title: "Marketing Communication",
    description: "Plan and manage campaigns that support marketing goals.",
    icon: BriefcaseBusiness,
    href: ROUTES.bulkEmailMarketing,
  },
  {
    title: "Education Communication",
    description: "Share circulars, updates and announcements through a centralised system.",
    icon: GraduationCap,
    href: ROUTES.bulkEmailEducation,
  },
  {
    title: "Customer Communication",
    description: "Reach customers with offers, updates and announcements while keeping communication professional.",
    icon: Store,
    href: ROUTES.bulkEmailBroadcast,
  },
  {
    title: "Business Ready Platform",
    description: "Built to support the communication needs of growing businesses and enterprises alike.",
    icon: PackageCheck,
    href: ROUTES.bulkEmail,
  },
  {
    title: "Professional Delivery",
    description: "Support dependable email delivery that businesses can rely on for important communication.",
    icon: ShieldCheck,
    href: ROUTES.bulkEmailSmtp,
  },
];

const industryCards: CardData[] = [
  {
    title: "Business Owners",
    description: "Send professional updates, offers and announcements to customers and stakeholders.",
    icon: Factory,
  },
  {
    title: "Marketing Teams",
    description: "Plan and manage campaigns with scheduling, templates and analytics.",
    icon: BriefcaseBusiness,
  },
  {
    title: "HR Departments",
    description: "Communicate policy updates, announcements and internal information in an organised way.",
    icon: Users,
  },
  {
    title: "Educational Institutions",
    description: "Share circulars, updates and announcements with students, parents and staff.",
    icon: GraduationCap,
  },
  {
    title: "Healthcare Organisations",
    description: "Send appointment reminders, health updates and organisational communication.",
    icon: HeartPulse,
  },
  {
    title: "Manufacturing Companies",
    description: "Coordinate communication across departments, vendors and clients.",
    icon: Factory,
  },
  {
    title: "Retail Businesses",
    description: "Reach customers with offers, updates and announcements.",
    icon: Store,
  },
  {
    title: "Corporate Offices",
    description: "Manage internal and external communication needs through one platform.",
    icon: Building2,
  },
  {
    title: "SMEs",
    description: "Access enterprise-style email communication tools without needing a large technical team.",
    icon: PackageCheck,
  },
  {
    title: "Enterprises",
    description: "Support communication across large teams and departments with a scalable platform.",
    icon: Laptop2,
  },
];

const technologyPrinciples = [
  "Simple to Use",
  "The platform is designed with clear navigation and intuitive workflows so teams can start using it without a steep learning curve.",
  "Professional",
  "Every part of the platform, from templates to reporting, is built to reflect professionally on the businesses that use it.",
  "Reliable",
  "Businesses depend on their communication tools working consistently, and reliability is a core design principle.",
  "Scalable",
  "Whether communication needs are small or large, the platform is designed to grow alongside the business.",
  "Secure",
  "Business communication often includes sensitive information, and security is built into the design.",
  "Business Focused",
  "Every feature is designed with real business communication needs in mind, not technical capability for its own sake.",
  "Modern Cloud Platform",
  "Being cloud-based means businesses can manage communication from anywhere, without local infrastructure.",
  "Easy Adoption",
  "Onboarding is straightforward so teams can begin using Altroz Bulk Email with minimal setup time.",
];

const reasonCards: CardData[] = [
  {
    title: "Easy Campaign Management",
    description: "Create, organise and manage email campaigns from a single interface.",
    icon: LayoutDashboard,
  },
  {
    title: "Centralised Dashboard",
    description: "View and manage all business email activity in one place.",
    icon: Laptop2,
  },
  {
    title: "Professional Templates",
    description: "Use ready-to-customise templates to keep a consistent, professional look.",
    icon: ClipboardList,
  },
  {
    title: "Campaign Scheduling",
    description: "Plan communication in advance and send at the right time.",
    icon: Workflow,
  },
  {
    title: "Email Analytics",
    description: "Understand how emails are performing with clear reporting.",
    icon: Smartphone,
  },
  {
    title: "SMTP Configuration",
    description: "Connect your preferred SMTP setup to fit your business requirements.",
    icon: CheckCircle2,
  },
  {
    title: "Delivery Reports",
    description: "Track campaign delivery for better visibility and accountability.",
    icon: BarChart3,
  },
  {
    title: "Business Ready Platform",
    description: "Built to support the communication needs of growing businesses and enterprises.",
    icon: Handshake,
  },
];

const customerFocusItems = [
  "We focus on customer success and support the businesses that use Altroz Bulk Email.",
  "We listen to feedback and use it to improve the platform continuously.",
  "We aim to provide reliable support to our customers.",
  "We keep innovating so Altroz Bulk Email stays useful as communication needs evolve.",
  "Our goal is to build long-term partnerships with the businesses that trust us with their communication.",
];

const companyInfo: InfoRow[] = [
  { label: "Company Name", value: "Altroz Technologies Pvt. Ltd." },
  { label: "Product", value: "Altroz Bulk Email" },
  { label: "Industry", value: "Business Email Communication Platform" },
  { label: "Website", value: "To be verified" },
  { label: "Head Office", value: "To be verified" },
  { label: "Email", value: "To be verified" },
  { label: "Phone", value: "To be verified" },
  { label: "Founded", value: "To be added only if verified" },
  { label: "Leadership", value: "To be added only if verified" },
];

const faqItems: Faq[] = [
  {
    q: "Who is Altroz Technologies?",
    a: "Altroz Technologies Pvt. Ltd. is a company focused on building enterprise SaaS and business automation solutions, including Altroz Bulk Email.",
  },
  {
    q: "What is Altroz Bulk Email?",
    a: "Altroz Bulk Email is a business communication platform that helps organisations send professional email campaigns through centralised broadcasting, scheduling, templates, analytics and SMTP integration.",
  },
  {
    q: "Who should use Altroz Bulk Email?",
    a: "Any organisation that needs to communicate with customers, employees or stakeholders through email can use Altroz Bulk Email.",
  },
  {
    q: "Why was Altroz Bulk Email created?",
    a: "Altroz Bulk Email was created to help businesses move away from scattered, manual email communication and towards an organised, centralised, professional way of sending business emails.",
  },
  {
    q: "What industries use this platform?",
    a: "Altroz Bulk Email is used across industries including business services, marketing, HR, education, healthcare, manufacturing, retail and corporate offices.",
  },
  {
    q: "Can small businesses use it?",
    a: "Yes. Altroz Bulk Email is designed to be simple enough for small and growing businesses to use without dedicated technical resources.",
  },
  {
    q: "Can enterprises use it?",
    a: "Yes. The platform is built to support the communication needs of larger enterprises with multiple teams and departments.",
  },
  {
    q: "Does Altroz Bulk Email support campaign scheduling?",
    a: "Yes. Businesses can plan their email communication in advance and schedule campaigns to be sent at the appropriate time.",
  },
  {
    q: "Does the platform provide email analytics?",
    a: "Yes. Altroz Bulk Email provides reporting and analytics so businesses can understand how their email campaigns are performing.",
  },
  {
    q: "Can I use my own SMTP setup?",
    a: "Yes. Altroz Bulk Email supports SMTP configuration so businesses can send emails through infrastructure that suits their requirements.",
  },
  {
    q: "Are professional email templates available?",
    a: "Yes. The platform provides templates that businesses can customise to maintain a consistent, professional appearance in their communication.",
  },
  {
    q: "Is Altroz Bulk Email a cloud-based platform?",
    a: "Yes. Altroz Bulk Email is a cloud-based business communication platform, allowing teams to manage email activity from anywhere.",
  },
  {
    q: "How do I request a demo?",
    a: "You can request a demo of Altroz Bulk Email by using the Book Free Demo option available on this page.",
  },
  {
    q: "Where can I learn more?",
    a: "You can learn more about Altroz Bulk Email through the Features, Learn and Help Center sections linked on this website.",
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
              Altroz Bulk Email
            </div>
            <div className="mt-1 text-lg font-semibold text-ink">
              Manage campaigns, templates and delivery tracking in one place
            </div>
          </div>
          <div className="ml-auto rounded-full bg-primary/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            Live
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] bg-gradient-to-br from-primary/6 via-white to-[#14b8a6]/8 p-5">
          <div className="flex flex-wrap gap-2">
            {["Campaigns", "Templates", "SMTP", "Analytics", "Reports"].map((item) => (
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
              Email workflow
            </div>
            <div className="mt-2 text-sm font-semibold text-ink">
              From campaign setup to delivery reports, every communication step stays connected.
            </div>
            <div className="mt-4 grid gap-2">
              {["Create Campaign", "Choose Template", "Schedule Send", "Configure SMTP", "Review Analytics", "Track Delivery"].map(
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
              ["Campaign management", "Centralised"],
              ["Template library", "Ready to use"],
              ["Analytics view", "Clear"],
              ["SMTP setup", "Flexible"],
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
        name: "About Bulk Email",
        item: resolveSiteUrl(ROUTES.bulkEmailAbout),
      },
    ],
  };

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Altroz Bulk Email",
    url: resolveSiteUrl(ROUTES.bulkEmailAbout),
    description: pageDescription,
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Altroz Bulk Email",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: resolveSiteUrl(ROUTES.bulkEmail),
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
    <div className="bulk-email-theme min-h-screen bg-gradient-to-b from-white via-[#f6faff] to-[#fff7ef]">
      <PageSEO
        title={pageTitle}
        description={pageDescription}
        canonicalPath={ROUTES.bulkEmailAbout}
        ogTitle="About Altroz Bulk Email"
        ogDescription="Altroz Technologies Pvt. Ltd. builds Altroz Bulk Email - a centralised platform for professional business email communication."
      />

      <BulkEmailNavbar />

      <main className="overflow-x-hidden">
        <section className="relative overflow-hidden py-14 sm:py-16 lg:py-20">
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-[#14b8a6]/12 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />

          <div className="site-container">
            <div className="mx-auto max-w-5xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-xs font-extrabold tracking-[0.22em] text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                About Altroz Bulk Email
              </span>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Modern Business Communication, Built for Growing Businesses
              </h1>
              <p className="mx-auto mt-5 max-w-4xl text-base leading-7 text-ink-soft sm:text-lg">
                Altroz Bulk Email is a business communication platform built by Altroz
                Technologies Pvt. Ltd. to help organisations send professional email campaigns
                through a single, centralised system. From campaign scheduling and templates to
                analytics and SMTP integration, the platform is designed to make business email
                communication simple, organised and dependable.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Link to={ROUTES.bookDemo} className="btn-primary">
                  Book Free Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to={ROUTES.bulkEmail} className="btn-outline">
                  Explore Features
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
                  A single, cloud-based system to manage email communication from campaign
                  creation to delivery
                </h2>

                <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg lg:mx-0">
                  Bring broadcasting, scheduling, templates, analytics and SMTP configuration
                  together in one place. Altroz Bulk Email is designed to support businesses of
                  every size as their communication needs grow.
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
              title="Altroz Technologies builds practical software for everyday business communication challenges"
              description="Our flagship product, Altroz Bulk Email, is a business email platform designed to help organisations manage campaigns, templates, analytics and SMTP configuration."
              center
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <ScrollReveal variant="fade-up" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Who We Are
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  Altroz Bulk Email is built to help businesses communicate more efficiently
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-7 text-ink-soft">
                  <p>
                    Altroz Bulk Email is a business communication platform developed by Altroz
                    Technologies Pvt. Ltd. We build email tools that help businesses send
                    professional campaigns through a single, organised digital system.
                  </p>
                  <p>
                    Many teams still manage communication through disconnected tools, basic email
                    accounts or manual processes. That leads to inconsistent messaging, limited
                    visibility and more time spent coordinating simple communication tasks.
                  </p>
                  <p>
                    Altroz Bulk Email is built for business owners, marketing teams, HR
                    departments, educators and growing organisations that need a practical,
                    easy-to-use platform for broadcasting, scheduling and tracking email
                    communication.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Our Story
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  Altroz Bulk Email was created because businesses needed a simpler way to manage
                  everyday communication
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  Email remains one of the most trusted channels for business communication, but it
                  is often managed through disconnected tools and manual workflows. Teams need a
                  single platform that keeps broadcasting, scheduling, templates and reporting in
                  one place.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "The idea behind Altroz Bulk Email was to bring these scattered communication steps into one connected platform",
                    "Campaigns, scheduling, templates, analytics and SMTP details stay organised in one place",
                    "Business communication should be simple, dependable and professional for every team",
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
              eyebrow="Our Story"
              title="Altroz Bulk Email was created because businesses needed a simpler way to manage everyday communication"
              description="Manual email processes, disconnected tools and inconsistent communication make it harder for teams to stay organised."
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
              eyebrow="Our Mission"
              title="Our mission is to simplify business communication for organisations of every size"
              description="We do this by reducing manual, repetitive work, bringing communication data together in one system, and giving teams the tools they need to focus on meaningful outreach rather than paperwork."
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
              eyebrow="Our Vision"
              title="We see business communication moving toward more connected, digital-first workflows"
              description="Our vision is to keep building Altroz Bulk Email as a platform that supports this shift and helps organisations adapt as their needs evolve."
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
              description="These values guide how we build Altroz Bulk Email and how we work with businesses that use it."
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
              eyebrow="What We Do"
              title="Altroz Bulk Email brings together the core tools a business needs to manage its email communication"
              description="All within one platform."
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
              title="Altroz Bulk Email is designed to support communication across a range of industries"
              description="Marketing, HR, education, healthcare, manufacturing, retail, corporate offices, SMEs and enterprises."
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
              eyebrow="Why Businesses Choose Altroz Bulk Email"
              title="Simple, cloud-based and built around real communication workflows"
              description="A practical platform that helps teams reduce manual work, stay organised and support growing businesses."
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
              eyebrow="Our Commitment"
              title="We are committed to supporting the businesses that use Altroz Bulk Email"
              description="We focus on customer success, listen to feedback and continuously improve the platform."
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
                  standard we hold Altroz Bulk Email to - not a list of features, but whether it genuinely
                  makes business communication easier, clearer and more reliable for the
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
              title="Common questions about Altroz Bulk Email"
              description="A short answer to the questions businesses ask most often about Altroz Bulk Email."
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
                  Ready to Transform Your Business Communication?
                </div>
                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                  See how Altroz Bulk Email can help simplify campaign management, scheduling,
                  analytics and more for your business
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/80">
                  Book a free demo to see how Altroz Bulk Email works and understand how it fits
                  your business communication requirements.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    to={ROUTES.bookDemo}
                    className="btn-primary justify-center bg-white text-primary hover:bg-white/90"
                  >
                    Book Free Demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to={ROUTES.bulkEmail}
                    className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-full border border-white/35 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
                  >
                    Explore Features
                  </Link>
                  <Link
                    to={ROUTES.bulkEmailContact}
                    className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-full border border-white/35 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
                  >
                    Contact Sales
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
