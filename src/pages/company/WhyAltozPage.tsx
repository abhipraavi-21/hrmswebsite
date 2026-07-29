"use client";

import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Factory,
  FileText,
  Fingerprint,
  GraduationCap,
  Handshake,
  HeartPulse,
  Laptop2,
  LayoutDashboard,
  Lightbulb,
  LockKeyhole,
  MessageSquare,
  PackageCheck,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  Target,
  Truck,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ROUTES } from "@/routes/routeConfig.js";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

type FeatureCard = {
  title: string;
  description: string;
  icon: ReactNode;
};

const pageTitle = "Why Choose Altroz HR | Cloud-Based HR Software for Growing Businesses";
const pageDescription =
  "Discover why growing businesses choose Altroz HR, a cloud HR platform for employee management, attendance, leave and payroll. Book a free demo today.";

const heroStats = [
  { label: "Built for", value: "Growing businesses" },
  { label: "Platform type", value: "Cloud-based HR software" },
  { label: "Primary outcome", value: "Less manual HR work" },
];

const painPoints = [
  "Attendance challenges - tracking in/out times manually across locations is time-consuming and error-prone.",
  "Payroll errors - calculating salaries, deductions and reimbursements by hand increases the chance of mistakes.",
  "Scattered employee data - records spread across files, folders and emails make information hard to find when needed most.",
  "Approval delays - leave, expense and other requests can sit pending for days without a clear workflow.",
  "Document management issues - offer letters, appraisal letters and HR documents are prepared manually again and again.",
  "Employee communication gaps - without a central platform, employees often do not have visibility into their own HR information.",
];

const strengths: FeatureCard[] = [
  {
    title: "Simple User Experience",
    description: "A clean, intuitive interface that HR teams and employees can start using with minimal training.",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: "Cloud-Based Access",
    description: "Access employee data, attendance and payroll information securely over the cloud.",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Centralized Employee Data",
    description: "All employee information from personal details to employment history stays in one organised system.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Smart Attendance Tracking",
    description: "GPS Attendance, Geo Tracking and Geo Fencing help record attendance accurately for field and multi-location teams.",
    icon: <Fingerprint className="h-5 w-5" />,
  },
  {
    title: "Automated Payroll Support",
    description: "Payroll works with attendance and leave data to reduce manual calculation effort.",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    title: "Flexible Approval Workflows",
    description: "Leave, reimbursement and other requests move through clear, structured approval steps.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Mobile Accessibility",
    description: "Employees can mark attendance, apply for leave and check HR updates from their phone.",
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    title: "Real-Time HR Insights",
    description: "HR Analytics helps teams view trends and patterns as they happen.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Scalable for Growth",
    description: "The platform grows with the business as more employees, teams and locations are added.",
    icon: <PackageCheck className="h-5 w-5" />,
  },
  {
    title: "Reliable Customer Support",
    description: "Businesses are supported through onboarding, training and everyday usage questions.",
    icon: <Handshake className="h-5 w-5" />,
  },
];

const lifecycleSteps = [
  {
    title: "Employee Records",
    description:
      "Every employee profile, document and role detail is set up once through Employee Management and used across the platform.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Attendance Management",
    description:
      "Attendance Management with GPS Attendance, Geo Tracking and Geo Fencing helps record attendance accurately for field and multi-location teams.",
    icon: <Fingerprint className="h-5 w-5" />,
  },
  {
    title: "Payroll Management",
    description:
      "Payroll Management works alongside attendance and leave data to support accurate and timely salary processing.",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    title: "Flexible Approval Workflows",
    description:
      "Approval Workflow supports leave, reimbursement and other requests with clear, structured approval steps.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Mobile Accessibility",
    description:
      "The Mobile HR App lets employees mark attendance, apply for leave and access HR updates from their phone.",
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    title: "Real-Time HR Insights",
    description:
      "HR Analytics brings together workforce data so HR teams can view trends and patterns as they happen.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
];

const businessFitCards: FeatureCard[] = [
  {
    title: "Startups",
    description: "Simple setup and easy adoption for teams putting HR processes in place for the first time.",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: "SMEs",
    description: "A practical way for growing businesses to organise employee data, attendance and payroll.",
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
  {
    title: "Large Enterprises",
    description: "Scales for larger organisations with more complex workforce requirements and locations.",
    icon: <BuildingIcon />,
  },
  {
    title: "Multi-Location Teams",
    description: "Useful for organisations running across offices, sites and distributed teams.",
    icon: <Store className="h-5 w-5" />,
  },
];

const implementationSteps = [
  "Easy onboarding - the platform is designed to be simple to set up for HR teams and employees alike.",
  "Guided implementation - the Altroz HR team supports businesses through the initial setup process.",
  "Training support - HR teams and employees are guided on how to use key features effectively.",
  "Data migration assistance - support is available to help bring existing employee data into the platform.",
  "Continuous product improvements - Altroz HR is regularly refined based on real business usage and feedback.",
];

const securityPoints = [
  "Role-Based Access - users see only the information relevant to their role and permissions.",
  "Secure Employee Records - employee data is stored and managed within a secure, cloud-based environment.",
  "Approval Controls - sensitive requests go through the right levels of review.",
  "Cloud-Based Accessibility - authorised users can securely access the platform from anywhere, on any device.",
  "Data Privacy Practices - employee information is handled with care in line with responsible data-management practices.",
];

const faqItems = [
  {
    q: "Why choose Altroz HR?",
    a: "Altroz HR brings employee management, attendance, leave, payroll and workforce data together on one simple, cloud-based platform, helping businesses reduce manual HR work and improve accuracy.",
  },
  {
    q: "Who can use Altroz HR?",
    a: "Altroz HR is designed for businesses of all sizes, from startups and small businesses to large, multi-location enterprises.",
  },
  {
    q: "Is Altroz HR suitable for SMEs?",
    a: "Yes. Altroz HR is built to be simple to adopt, making it well-suited for small and medium-sized businesses looking to organise their HR processes.",
  },
  {
    q: "Can large businesses use Altroz HR?",
    a: "Yes. With Workforce Management and HR Analytics, Altroz HR is designed to scale for larger organisations with more complex workforce needs.",
  },
  {
    q: "How does Altroz HR simplify HR operations?",
    a: "By centralising employee records, attendance, leave, payroll and approvals in one platform, Altroz HR reduces duplicate work and manual follow-up across HR processes.",
  },
  {
    q: "Can employees access the software on mobile?",
    a: "Yes. The Mobile HR App allows employees to mark attendance, apply for leave and access HR updates from their phone.",
  },
  {
    q: "Does Altroz HR support attendance tracking for field employees?",
    a: "Yes. GPS Attendance, Geo Tracking and Geo Fencing help record attendance accurately for employees working outside a fixed office.",
  },
  {
    q: "Can Altroz HR handle payroll processing?",
    a: "Yes. Payroll Management works alongside attendance and leave data to support accurate and timely salary processing.",
  },
  {
    q: "Does Altroz HR support multiple business locations?",
    a: "Yes. Altroz HR is designed to support businesses operating across multiple offices, sites or locations.",
  },
  {
    q: "What HR processes can be automated with Altroz HR?",
    a: "Altroz HR supports HR Automation across areas such as attendance, leave approvals, document generation and employee lifecycle events.",
  },
  {
    q: "Is employee data secure on Altroz HR?",
    a: "Altroz HR uses Role-Based Access and secure cloud-based storage to help protect employee and business data.",
  },
  {
    q: "How can I see Altroz HR in action?",
    a: "You can book a free demo with the Altroz HR team to see how the platform works for your business.",
  },
];

const relatedModules = [
  { label: "Employee Management", href: ROUTES.coreHR },
  { label: "Attendance Management", href: ROUTES.attendanceManagement },
  { label: "Payroll Management", href: ROUTES.payroll },
  { label: "Leave Management", href: ROUTES.leaveManagement },
  { label: "Recruitment", href: ROUTES.recruitment },
  { label: "Performance Management", href: ROUTES.performance },
  { label: "Employee Self Service", href: ROUTES.employeeSelfService },
  { label: "Asset Management", href: ROUTES.assetManagement },
  { label: "HR Automation", href: ROUTES.automation },
  { label: "HR Analytics", href: ROUTES.analytics },
  { label: "Employee Lifecycle", href: `${ROUTES.businessApps}#employee-lifecycle` },
  { label: "Workforce Management", href: ROUTES.workforce },
  { label: "Exit Management", href: ROUTES.exitManagement },
  { label: "Pricing", href: ROUTES.pricing },
  { label: "Book Free Demo", href: ROUTES.bookDemo },
  { label: "About Us", href: ROUTES.about },
];

function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <div className="text-xs font-bold uppercase tracking-[0.28em] text-primary">{eyebrow}</div>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">{description}</p>
    </div>
  );
}

function BuildingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 20v-8h6v8" />
      <path d="M7 8h.01M7 12h.01M7 16h.01M17 8h.01M17 12h.01" />
    </svg>
  );
}

export default function WhyAltozPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(11,92,255,0.1),_transparent_35%),linear-gradient(180deg,_#ffffff_0%,_#f7fbff_100%)]">
      <PageSEO title={pageTitle} description={pageDescription} canonicalPath={ROUTES.whyAltroz} />
      <TopNavbar />
      <MainNavbar />

      <main className="overflow-x-hidden">
        <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full bg-success/10 blur-3xl" />

          <div className="site-container grid gap-10 lg:grid-cols-12 lg:items-center">
            <ScrollReveal className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-extrabold tracking-normal text-primary shadow-sm">
                <Sparkles className="h-4 w-4" />
                Modern Cloud HR Platform
              </div>

              <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Why Businesses Choose Altroz HR to Simplify Workforce Management
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-soft">
                Altroz HR brings employee management, attendance, leave, payroll, performance and
                workforce records together on one simple, cloud-based platform. Built for growing
                businesses, it helps HR teams move away from scattered spreadsheets and manual
                paperwork and gives every employee an easy way to stay connected to their HR
                information anytime, anywhere.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link to={ROUTES.bookDemo} className="btn-primary">
                  Book Free Demo
                </Link>
                <a href="#why-choose" className="btn-outline">
                  Explore Features
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {heroStats.map((item) => (
                  <div key={item.label} className="soft-card p-4">
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                      {item.label}
                    </div>
                    <div className="mt-2 text-sm font-semibold leading-6 text-ink">{item.value}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal className="lg:col-span-5">
              <div className="soft-card relative overflow-hidden p-6">
                <div className="pointer-events-none absolute -right-20 top-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[1.4rem] border border-border bg-[#f2f6fc] p-4">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                      <LayoutDashboard className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-ink">Built for Growing Businesses</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">
                      Scales from a handful of employees to large multi-location workforces.
                    </p>
                  </div>

                  <div className="rounded-[1.4rem] border border-border bg-[#f2f6fc] p-4">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                      <Clock3 className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-ink">Modern Cloud HR Platform</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">
                      Access employee data, attendance, leave and payroll securely from anywhere.
                    </p>
                  </div>

                  <div className="rounded-[1.4rem] border border-border bg-[#f2f6fc] p-4">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-ink">Simple &amp; Scalable</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">
                      Easy to use for HR teams and employees, without a steep learning curve.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="site-container grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="The Problem"
                title="The case for modern HR software"
                description="Many businesses still manage HR through spreadsheets, paper registers and scattered communication channels. As teams grow, the process becomes harder to sustain."
              />

              <div className="mt-6 grid gap-3">
                {painPoints.map((point) => (
                  <div key={point} className="soft-card flex items-start gap-3 p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <p className="text-sm leading-7 text-ink-soft">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="soft-card h-full p-6 sm:p-7">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  How a centralized HR platform helps
                </div>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  A centralized HR platform like Altroz HR brings employee records, attendance,
                  leave, payroll and documentation into one connected system. This reduces
                  repetitive manual work, minimizes errors and gives both HR teams and employees a
                  single reliable place to manage day-to-day HR activities.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {[
                    {
                      title: "Less manual follow-up",
                      desc: "Remove unnecessary back-and-forth across emails and spreadsheets.",
                      icon: <Clock3 className="h-5 w-5" />,
                    },
                    {
                      title: "Cleaner employee records",
                      desc: "Keep the whole workforce record in one organised system.",
                      icon: <Users className="h-5 w-5" />,
                    },
                    {
                      title: "Better payroll accuracy",
                      desc: "Use linked attendance and leave data to support payroll.",
                      icon: <Wallet className="h-5 w-5" />,
                    },
                    {
                      title: "Faster decisions",
                      desc: "Structured workflows help teams act without delay.",
                      icon: <Workflow className="h-5 w-5" />,
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-[1.35rem] border border-border bg-surface/40 p-4">
                      <div className="flex items-start gap-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-ink">{item.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-ink-soft">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-20" id="why-choose">
          <div className="site-container">
            <SectionHeading
              eyebrow="Why Choose Altroz HR"
              title="Ten core strengths that matter to growing teams"
              description="Altroz HR is designed around practical strengths that reduce manual work and improve visibility."
              align="center"
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {strengths.map((item, index) => (
                <div key={item.title} className={cn("soft-card h-full p-5", index < 2 && "xl:col-span-2")}>
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="mx-auto max-w-4xl rounded-[1.75rem] border border-primary/15 bg-white p-5 shadow-card">
                <div className="grid gap-3 sm:grid-cols-3">
                  {heroStats.map((item) => (
                    <div key={item.label} className="rounded-2xl bg-surface/50 p-4 text-center">
                      <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
                        {item.label}
                      </div>
                      <div className="mt-2 text-sm font-semibold text-ink">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="site-container">
            <SectionHeading
              eyebrow="How It Works"
              title="One connected flow across the employee lifecycle"
              description="Altroz HR is organised around a simple flow so information created at one stage is available at the next without duplicate data entry."
              align="center"
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {lifecycleSteps.map((step) => (
                <div key={step.title} className="soft-card h-full p-5">
                  <div className="flex items-start gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-ink">{step.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-ink-soft">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <div className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Connected modules
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {relatedModules.slice(0, 10).map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="rounded-full border border-border bg-white px-3 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:border-primary/30 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  More modules
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {relatedModules.slice(10).map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="rounded-full border border-border bg-white px-3 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:border-primary/30 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-20">
          <div className="site-container">
            <SectionHeading
              eyebrow="Who It Fits"
              title="Designed for businesses of all sizes"
              description="Altroz HR is a practical fit for startups, SMEs and larger organisations with multi-location workforce needs."
              align="center"
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {businessFitCards.map((card) => (
                <div key={card.title} className="soft-card h-full p-5">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                    {card.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="site-container grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Implementation"
                title="A straightforward getting-started experience"
                description="Getting started with Altroz HR is designed to be straightforward, with support available at every stage."
              />

              <div className="mt-6 space-y-3">
                {implementationSteps.map((point) => (
                  <div key={point} className="soft-card flex items-start gap-3 p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span className="text-sm leading-7 text-ink-soft">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="soft-card h-full p-6 sm:p-7">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Security and reliability
                </div>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  Altroz HR is built with the security of employee and business data as a core
                  consideration.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {securityPoints.map((point) => (
                    <div key={point} className="rounded-[1.35rem] border border-border bg-surface/40 p-4">
                      <div className="flex items-start gap-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        <p className="text-sm leading-6 text-ink-soft">{point}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-20">
          <div className="site-container">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="Questions businesses ask before choosing Altroz HR"
              description="Answers to the most common questions about the platform and its HR workflows."
              align="center"
            />

            <div className="mx-auto mt-8 max-w-4xl">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item) => (
                  <AccordionItem
                    key={item.q}
                    value={item.q}
                    className="overflow-hidden rounded-2xl border border-border bg-white px-5 shadow-card"
                  >
                    <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink no-underline hover:no-underline [&>svg]:text-primary">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-sm leading-7 text-ink-soft">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="site-container">
            <div className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 left-0 h-56 w-56 rounded-full bg-success/10 blur-3xl" />

              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Final CTA
                  </div>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                    Ready to simplify your HR operations?
                  </h2>
                  <p className="mt-4 max-w-2xl text-ink-soft">
                    See how Altroz HR can help your business bring employee management,
                    attendance, leave, payroll and workforce data together on one simple, reliable
                    platform.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to={ROUTES.bookDemo} className="btn-primary">
                      Book Free Demo
                    </Link>
                    <Link to={ROUTES.pricing} className="btn-outline">
                      Explore Pricing
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { title: "Attendance", desc: "GPS, geo tracking and shifts", icon: <Clock3 className="h-4 w-4" /> },
                      { title: "Payroll", desc: "Linked and accurate", icon: <Wallet className="h-4 w-4" /> },
                      { title: "Leave", desc: "Clear workflows", icon: <CalendarDays className="h-4 w-4" /> },
                      { title: "Analytics", desc: "Real-time insights", icon: <BarChart3 className="h-4 w-4" /> },
                      { title: "Mobile", desc: "On-the-go access", icon: <Smartphone className="h-4 w-4" /> },
                      { title: "Support", desc: "Help when needed", icon: <Handshake className="h-4 w-4" /> },
                    ].map((item, index) => (
                      <div
                        key={item.title}
                        className={cn(
                          "rounded-[1.35rem] border border-border p-4 shadow-card",
                          index % 2 === 0 ? "bg-primary-soft/30" : "bg-white",
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-ink">{item.title}</div>
                            <div className="mt-1 text-xs leading-5 text-ink-soft">{item.desc}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
