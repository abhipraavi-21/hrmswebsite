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
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
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

const pageTitle = "About Altroz HR | HR Software Company for Employee, Attendance & Payroll Management";
const pageDescription =
  "Learn about Altroz HR, an HR technology platform by Altroz Technologies Pvt. Ltd. Discover our mission, vision and complete HR software solutions for businesses.";

const quickLinks = [
  { label: "Home", href: ROUTES.hrmsHome },
  { label: "Features / Products", href: ROUTES.hrmsHome },
  { label: "Employee Management", href: ROUTES.coreHR },
  { label: "Attendance Management", href: ROUTES.attendanceManagement },
  { label: "Payroll Management", href: ROUTES.payroll },
  { label: "Leave Management", href: ROUTES.leaveManagement },
  { label: "Recruitment", href: ROUTES.recruitment },
  { label: "Performance Management", href: ROUTES.performance },
  { label: "Pricing", href: ROUTES.hrmsPricing },
  { label: "Book a Demo", href: ROUTES.bookDemo },
  { label: "Contact Us", href: ROUTES.hrmsContact },
  { label: "Learn", href: ROUTES.hrmsLearn },
];

const heroStats = [
  { label: "Modern HR Platform", value: "Single cloud-based system for people processes" },
  { label: "Simplified Workforce Management", value: "Attendance, leave, payroll and performance together" },
  { label: "Built for Growing Businesses", value: "Supports startups, SMEs and enterprises" },
];

const heroHighlights: CardData[] = [
  {
    title: "Modern HR Platform",
    description: "A single, cloud-based system to manage your people processes from hiring to exit.",
    icon: Users,
  },
  {
    title: "Simplified Workforce Management",
    description: "Bring attendance, leave, payroll and performance together in one place.",
    icon: BadgeCheck,
  },
  {
    title: "Built for Growing Businesses",
    description: "Designed to support startups, SMEs and enterprises as their teams grow.",
    icon: ClipboardList,
  },
];

const challengeItems = [
  "Manual attendance registers, paper leave forms, disconnected payroll sheets and email-based approvals still take up too much time in many businesses.",
  "Altroz HR was created because HR teams needed a simpler way to manage everyday workforce operations in one connected platform.",
  "HR technology should make work simpler for HR teams and employees alike, not add another layer of complexity.",
];

const approachCards: CardData[] = [
  {
    title: "Simple Interface",
    description: "An easy-to-use platform that does not require lengthy training to get started.",
    icon: CircleDot,
  },
  {
    title: "Cloud-Based Platform",
    description: "Access your HR data securely from anywhere, without relying on local systems.",
    icon: LayoutDashboard,
  },
  {
    title: "Centralised HR Operations",
    description: "Manage employee data, attendance, payroll and more from a single platform.",
    icon: ClipboardList,
  },
  {
    title: "Automation",
    description: "Reduce manual, repetitive HR tasks through built-in automation and workflows.",
    icon: PackageCheck,
  },
  {
    title: "Mobile Accessibility",
    description: "Employees and managers can use the mobile HR app to stay connected on the go.",
    icon: Laptop2,
  },
  {
    title: "Approval Workflows",
    description: "Set up structured approval workflows for leave, reimbursement and other requests.",
    icon: Workflow,
  },
  {
    title: "Scalable Solution",
    description: "Built to support businesses as their teams and HR needs grow.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Reliable Support",
    description: "Our team is available to support businesses using the Altroz HR platform.",
    icon: Handshake,
  },
];

const missionCards: CardData[] = [
  {
    title: "Our Mission",
    description:
      "Our mission is to simplify HR operations for businesses of every size. We do this by reducing manual, repetitive work through automation, bringing workforce data together in one system, and giving HR teams the tools they need to focus on people rather than paperwork.",
    icon: Target,
  },
  {
    title: "Our Vision",
    description:
      "We see HR technology moving towards more connected, digital-first workplaces, where routine HR tasks are automated and HR teams have clear, real-time visibility into their workforce. Our vision is to keep building Altroz HR as a platform that supports this shift and helps businesses adapt as their needs evolve.",
    icon: Sparkles,
  },
];

const valueCards: ValueData[] = [
  {
    title: "Customer First",
    description: "We build Altroz HR around the real, everyday needs of HR teams and business owners.",
    practical: "Features are shaped by how teams actually run HR operations.",
    icon: Users,
  },
  {
    title: "Innovation",
    description: "We keep improving our platform to reflect how modern HR teams work today.",
    practical: "Product updates follow the way businesses actually use HR software.",
    icon: Lightbulb,
  },
  {
    title: "Simplicity",
    description: "We believe HR software should be easy to understand and easy to use, without unnecessary complexity.",
    practical: "Teams can adopt the platform without lengthy training.",
    icon: CircleDot,
  },
  {
    title: "Transparency",
    description: "We aim to be clear and honest about what our platform can do, and how it works.",
    practical: "No exaggerated claims - just accurate information.",
    icon: MessageIcon,
  },
  {
    title: "Security",
    description: "We take the protection of workforce and employee data seriously across our platform.",
    practical: "Responsible data handling is part of the product foundation.",
    icon: ShieldCheck,
  },
  {
    title: "Continuous Improvement",
    description: "We regularly refine Altroz HR based on how businesses actually use it.",
    practical: "Ongoing updates are aimed at real operational needs.",
    icon: Lightbulb,
  },
  {
    title: "Reliability",
    description: "We aim to build a platform that HR teams can depend on for their daily operations.",
    practical: "We build a platform teams can rely on for day-to-day use.",
    icon: BadgeCheck,
  },
  {
    title: "Collaboration",
    description: "We work closely with the businesses using Altroz HR to understand their needs better.",
    practical: "Ongoing support grows with your HR management needs.",
    icon: BriefcaseBusiness,
  },
];

const lifecycleSteps: CardData[] = [
  {
    title: "Employee Management",
    description: "Maintain complete employee records and information in one organised, centralised system.",
    icon: FileText,
    href: ROUTES.coreHR,
  },
  {
    title: "Attendance Management",
    description: "Track attendance accurately, including GPS attendance, geo tracking and geo fencing for field and on-site teams.",
    icon: Users,
    href: ROUTES.attendanceManagement,
  },
  {
    title: "Payroll Management",
    description: "Manage payroll processing in a structured, systematic way linked to attendance and leave data.",
    icon: Wallet,
    href: ROUTES.payroll,
  },
  {
    title: "Leave Management",
    description: "Simplify leave applications, approvals and balances for employees and managers.",
    icon: CheckCircle2,
    href: ROUTES.leaveManagement,
  },
  {
    title: "Recruitment",
    description: "Manage your hiring process within the same platform used for the rest of the employee lifecycle.",
    icon: BriefcaseBusiness,
    href: ROUTES.recruitment,
  },
  {
    title: "Performance Management",
    description: "Track and manage employee performance in a structured, ongoing way.",
    icon: Target,
    href: ROUTES.performance,
  },
  {
    title: "Employee Self Service",
    description: "Let employees access their own information, apply for leave, and raise requests directly.",
    icon: Workflow,
    href: ROUTES.employeeSelfService,
  },
  {
    title: "Asset Management",
    description: "Keep track of company assets issued to employees throughout their tenure.",
    icon: PackageCheck,
    href: ROUTES.assetManagement,
  },
  {
    title: "HR Automation",
    description: "Automate repetitive HR tasks and approval workflows to save time.",
    icon: BarChart3,
    href: ROUTES.automation,
  },
  {
    title: "HR Analytics",
    description: "Get visibility into workforce data to support better, informed HR decisions.",
    icon: Search,
    href: ROUTES.analytics,
  },
  {
    title: "Workforce Management",
    description: "Manage your workforce operations from a single, connected platform.",
    icon: BriefcaseBusiness,
    href: ROUTES.workforce,
  },
  {
    title: "Employee Lifecycle & Exit Management",
    description: "Manage employee transitions, including promotions, transfers and exit management, in one place.",
    icon: Workflow,
    href: ROUTES.exitManagement,
  },
];

const industryCards: CardData[] = [
  {
    title: "Manufacturing",
    description: "Manage shift-based attendance and large workforce records efficiently.",
    icon: Factory,
  },
  {
    title: "Healthcare",
    description: "Handle attendance, shift schedules and employee records for healthcare staff.",
    icon: HeartPulse,
  },
  {
    title: "Construction",
    description: "Track on-site attendance with GPS attendance and geo fencing for field teams.",
    icon: Truck,
  },
  {
    title: "Retail",
    description: "Manage attendance, leave and payroll across multiple store locations.",
    icon: Store,
  },
  {
    title: "Education",
    description: "Maintain staff records, attendance and leave management for institutions.",
    icon: GraduationCap,
  },
  {
    title: "Hospitality",
    description: "Manage flexible shifts and workforce attendance for hospitality teams.",
    icon: Building2,
  },
  {
    title: "Logistics",
    description: "Track field and on-site staff using GPS attendance and geo tracking.",
    icon: PackageCheck,
  },
  {
    title: "IT & Software",
    description: "Support employee self service and performance management for office-based teams.",
    icon: Laptop2,
  },
  {
    title: "Facility Management",
    description: "Manage distributed on-site staff attendance and workforce records.",
    icon: BadgeCheck,
  },
];

const technologyPrinciples = [
  "Reduce unnecessary manual HR processes through automation",
  "Bring workforce data together in one system",
  "Give HR teams the tools they need to focus on people rather than paperwork",
  "Support a more efficient HR function that helps a business run smoothly",
  "Help the business adapt as its needs evolve",
  "Provide clear, real-time visibility into the workforce",
  "Support steady, long-term business growth",
];

const reasonCards: CardData[] = [
  {
    title: "Simple Interface",
    description: "An easy-to-use platform that does not require lengthy training to get started.",
    icon: LayoutDashboard,
  },
  {
    title: "Cloud-Based Platform",
    description: "Access your HR data securely from anywhere, without relying on local systems.",
    icon: Laptop2,
  },
  {
    title: "Centralised HR Operations",
    description: "Manage employee data, attendance, payroll and more from a single platform.",
    icon: LayoutDashboard,
  },
  {
    title: "Automation",
    description: "Reduce manual, repetitive HR tasks through built-in automation and workflows.",
    icon: Workflow,
  },
  {
    title: "Mobile Accessibility",
    description: "Employees and managers can use the mobile HR app to stay connected on the go.",
    icon: Smartphone,
  },
  {
    title: "Approval Workflows",
    description: "Set up structured approval workflows for leave, reimbursement and other requests.",
    icon: CheckCircle2,
  },
  {
    title: "Scalable Solution",
    description: "Built to support businesses as their teams and HR needs grow.",
    icon: PackageCheck,
  },
  {
    title: "Reliable Support",
    description: "Our team is available to support businesses using the Altroz HR platform.",
    icon: Handshake,
  },
];

const customerFocusItems = [
  "We are committed to supporting the businesses that use Altroz HR by focusing on customer success.",
  "We listen to feedback and use it to improve the platform continuously.",
  "We aim to provide reliable support to our customers.",
  "We keep innovating so Altroz HR stays useful as HR needs evolve.",
  "Our goal is to build long-term partnerships with the businesses that trust us with their HR operations.",
];

const companyInfo: InfoRow[] = [
  { label: "Company Name", value: "Altroz Technologies Pvt. Ltd." },
  { label: "Product", value: "Altroz HR" },
  { label: "Industry", value: "HR Software / Workforce Management Software" },
  { label: "Website", value: "To be verified" },
  { label: "Head Office", value: "To be verified" },
  { label: "Email", value: "To be verified" },
  { label: "Phone", value: "To be verified" },
  { label: "Founded", value: "To be added only if verified" },
  { label: "Leadership", value: "To be added only if verified" },
];

const faqItems: Faq[] = [
  {
    q: "What is Altroz HR?",
    a: "Altroz HR is an HR software platform by Altroz Technologies Pvt. Ltd. that helps businesses manage employee data, attendance, payroll, leave and other HR operations from one place.",
  },
  {
    q: "Who can use Altroz HR?",
    a: "Altroz HR is designed for business owners, HR managers and HR teams in startups, SMEs and larger enterprises who want to simplify their HR operations.",
  },
  {
    q: "What industries use Altroz HR?",
    a: "Altroz HR supports businesses across industries such as manufacturing, healthcare, construction, retail, education, hospitality, logistics, IT and facility management.",
  },
  {
    q: "How does Altroz HR simplify HR operations?",
    a: "Altroz HR brings employee management, attendance, payroll, leave and other HR processes into one connected platform, reducing the need for manual, scattered processes.",
  },
  {
    q: "Can startups use Altroz HR?",
    a: "Yes. Altroz HR is built to support businesses of different sizes, including startups that are setting up their HR processes for the first time.",
  },
  {
    q: "Does Altroz HR support attendance tracking for field employees?",
    a: "Yes. Altroz HR includes GPS attendance, geo tracking and geo fencing features to help track attendance for field and on-site staff.",
  },
  {
    q: "Is Altroz HR a cloud-based platform?",
    a: "Yes. Altroz HR is a cloud-based HR platform, which means HR data can be accessed securely without relying on local systems.",
  },
  {
    q: "Does Altroz HR have a mobile app?",
    a: "Yes. Altroz HR offers a mobile HR app so employees and managers can access HR functions on the go.",
  },
  {
    q: "What HR processes does Altroz HR cover?",
    a: "Altroz HR covers employee management, attendance, payroll, leave, recruitment, performance management, employee self service, asset management and more.",
  },
  {
    q: "How can a business get started with Altroz HR?",
    a: "Businesses can book a free demo to see how Altroz HR works and understand how it fits their specific HR requirements.",
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
              Altroz HR
            </div>
            <div className="mt-1 text-lg font-semibold text-ink">
              Manage employee data, attendance and payroll in one place
            </div>
          </div>
          <div className="ml-auto rounded-full bg-primary/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            Live
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] bg-gradient-to-br from-primary/6 via-white to-[#14b8a6]/8 p-5">
          <div className="flex flex-wrap gap-2">
            {["Employees", "Attendance", "Leave", "Payroll", "Reports"].map((item) => (
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
              HR workflow
            </div>
            <div className="mt-2 text-sm font-semibold text-ink">
              From employee onboarding to reporting, every HR process stays connected.
            </div>
            <div className="mt-4 grid gap-2">
              {["Onboard", "Track Attendance", "Manage Leave", "Process Payroll", "Review Performance", "Report"].map(
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
              ["Employee records", "Centralised"],
              ["Attendance visibility", "Clear"],
              ["Leave approvals", "Streamlined"],
              ["Payroll inputs", "Organised"],
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
    name: "About Altroz HR",
    url: resolveSiteUrl(ROUTES.about),
    description: pageDescription,
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Altroz HR",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: resolveSiteUrl(ROUTES.hrmsHome),
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
        ogTitle="About Altroz HR"
        ogDescription="Altroz Technologies Pvt. Ltd. builds Altroz HR - a centralised platform to manage employee records, attendance, leave, payroll and reporting."
      />

      <TopNavbar />
      <MainNavbar />

      <main className="overflow-x-hidden">
        <section className="relative overflow-hidden py-14 sm:py-16 lg:py-20">
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-[#14b8a6]/12 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />

          <div className="site-container">
            <div className="mx-auto max-w-5xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-xs font-extrabold tracking-[0.22em] text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                About Altroz HR
              </span>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Empowering Businesses with Smarter HR Management
              </h1>
              <p className="mx-auto mt-5 max-w-4xl text-base leading-7 text-ink-soft sm:text-lg">
                Simplify employee management, attendance, payroll, leave and workforce operations
                with a modern HR platform designed to help businesses work smarter, improve
                productivity and grow with confidence.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Link to={ROUTES.bookDemo} className="btn-primary">
                  Book Free Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to={ROUTES.hrmsHome} className="btn-outline">
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
                  A single, cloud-based system to manage your people processes from hiring to exit
                </h2>

                <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg lg:mx-0">
                  Bring attendance, leave, payroll and performance together in one place. Altroz
                  HR is designed to support startups, SMEs and enterprises as their teams grow.
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
              title="Altroz Technologies builds practical software for everyday operational challenges"
              description="Our flagship product, Altroz HR, is an enterprise HRMS platform designed to help organisations manage employee records, attendance, leave, payroll and reporting."
              center
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <ScrollReveal variant="fade-up" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Who We Are
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  Altroz HR is built to help businesses manage their workforce more efficiently
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-7 text-ink-soft">
                  <p>
                    Altroz HR is an HR software platform developed by Altroz Technologies Pvt. Ltd.
                    We build HR technology that helps businesses manage their workforce more
                    efficiently, replacing scattered spreadsheets, paperwork and manual approvals
                    with a single, organised digital system.
                  </p>
                  <p>
                    Many HR teams still spend a large part of their day on repetitive tasks -
                    tracking attendance manually, chasing leave approvals, preparing payroll inputs
                    and maintaining employee records across multiple files. This slows down HR
                    teams and makes it harder for growing businesses to scale smoothly.
                  </p>
                  <p>
                    Altroz HR is built for business owners, HR managers and teams across
                    industries who want a practical, easy-to-use platform to handle their day-to-
                    day HR operations - from employee management and attendance to payroll, leave,
                    recruitment and performance - without unnecessary complexity.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Our Story
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  Altroz HR was created because HR teams needed a simpler way to manage everyday
                  workforce operations
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  Manual attendance registers, paper leave forms, disconnected payroll sheets and
                  email-based approvals are still common in many businesses. These processes take
                  up time that HR teams could otherwise spend on more meaningful, people-focused
                  work.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "The idea behind Altroz HR was to bring these scattered processes into one connected platform",
                    "Employee data, attendance, leave, payroll and performance information live in one place",
                    "HR technology should make work simpler for HR teams and employees alike, not add another layer of complexity",
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
              title="Altroz HR was created because HR teams needed a simpler way to manage everyday workforce operations"
              description="Manual attendance registers, paper leave forms, disconnected payroll sheets and email-based approvals are still common in many businesses."
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
              title="Our mission is to simplify HR operations for businesses of every size"
              description="We do this by reducing manual, repetitive work through automation, bringing workforce data together in one system, and giving HR teams the tools they need to focus on people rather than paperwork."
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
              title="We see HR technology moving towards more connected, digital-first workplaces"
              description="Our vision is to keep building Altroz HR as a platform that supports this shift and helps businesses adapt as their needs evolve."
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
              description="These values guide how we build Altroz HR and how we work with businesses that use it."
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
              title="Altroz HR brings together the core modules a business needs to manage its workforce"
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
              title="Altroz HR is designed to support HR operations across a range of industries"
              description="Manufacturing, healthcare, construction, retail, education, hospitality, logistics, IT and facility management."
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
              eyebrow="Why Businesses Choose Altroz HR"
              title="Simple, cloud-based and built around real HR workflows"
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
              title="We are committed to supporting the businesses that use Altroz HR"
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
                  standard we hold Altroz HR to - not a list of features, but whether it genuinely
                  makes HR management easier, clearer and more reliable for the
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
              title="Common questions about Altroz HR"
              description="A short answer to the questions businesses ask most often about Altroz HR."
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
                  Ready to Transform Your HR Operations?
                </div>
                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                  See how Altroz HR can help simplify employee management, attendance, payroll and
                  more for your business
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/80">
                  Book a free demo to see how Altroz HR works and understand how it fits your
                  specific HR requirements.
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
                    to={ROUTES.hrmsHome}
                    className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-full border border-white/35 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
                  >
                    Explore Features
                  </Link>
                  <Link
                    to={ROUTES.hrmsContact}
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
