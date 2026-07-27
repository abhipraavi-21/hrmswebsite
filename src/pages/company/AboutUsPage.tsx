"use client";

import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  CircleDot,
  Clock3,
  Construction,
  Factory,
  FileText,
  Fingerprint,
  GraduationCap,
  Handshake,
  HeartPulse,
  Hotel,
  Laptop2,
  LayoutDashboard,
  Lightbulb,
  LockKeyhole,
  MessageSquare,
  PackageCheck,
  Search,
  ShieldCheck,
  Smartphone,
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

type CardData = {
  title: string;
  description: string;
  icon: ReactNode;
  tone?: string;
};

type MissionCard = {
  title: string;
  description: string;
  icon: ReactNode;
  tone: string;
  points: string[];
};

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

const pageTitle = "About Altroz HR | HR Software Company for Employee, Attendance & Payroll Management";
const pageDescription =
  "Learn about Altroz HR, an HR technology platform by Altroz Technologies Pvt. Ltd. Discover our mission, vision and complete HR software solutions for businesses.";

const heroHighlights: CardData[] = [
  {
    title: "Modern HR Platform",
    description: "A single cloud-based system to manage people processes from hiring to exit.",
    icon: <LayoutDashboard className="h-5 w-5" />,
    tone: "from-[#eff6ff] to-white",
  },
  {
    title: "Simplified Workforce Management",
    description: "Bring attendance, leave, payroll and performance together in one place.",
    icon: <Workflow className="h-5 w-5" />,
    tone: "from-[#f0fdf4] to-white",
  },
  {
    title: "Built for Growing Businesses",
    description: "Designed to support startups, SMEs and enterprises as teams expand.",
    icon: <Target className="h-5 w-5" />,
    tone: "from-[#fff7ed] to-white",
  },
];

const heroStats = [
  { label: "Core focus", value: "Practical HR automation" },
  { label: "Platform style", value: "Centralised and connected" },
  { label: "Primary outcome", value: "Less manual HR work" },
];

const whoWeArePoints = [
  "Altroz HR is an HR software platform developed by Altroz Technologies Pvt. Ltd. We build HR technology that helps businesses manage their workforce more efficiently.",
  "Many HR teams still spend a large part of their day on repetitive tasks such as tracking attendance, chasing approvals, preparing payroll inputs and maintaining employee records across multiple files.",
  "Altroz HR is built for business owners, HR managers and teams across industries who want a practical, easy-to-use platform for everyday HR operations without unnecessary complexity.",
];

const manualVsDigital: CardData[] = [
  {
    title: "Manual Processes",
    description: "Spreadsheets, registers, physical documents, email approvals and disconnected systems.",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Digital HR",
    description: "Centralised employee records, structured workflows, attendance, payroll, approvals and reports.",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
];

const storySteps = [
  {
    title: "Manual HR becomes difficult",
    description:
      "As teams and responsibilities grow, spreadsheets, registers and repeated follow-ups become harder to manage.",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "A single workforce system is needed",
    description:
      "Businesses need one place for employee data, attendance, leave, approvals, payroll and reports.",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Altroz HR is created",
    description:
      "Altroz Technologies builds an HRMS focused on practical workflows, clarity and easy day-to-day use.",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: "The platform keeps improving",
    description:
      "Employee records, attendance, payroll, leave, recruitment, performance, assets, expenses and exits become easier to organise.",
    icon: <Workflow className="h-5 w-5" />,
  },
];

const missionCards: MissionCard[] = [
  {
    title: "Our Mission",
    description:
      "Our mission is to simplify HR operations through reliable, practical and easy-to-use HRMS solutions.",
    icon: <Target className="h-5 w-5" />,
    tone: "from-[#eff6ff] to-white",
    points: [
      "Reduce manual HR work",
      "Improve process accuracy",
      "Save administrative time",
      "Simplify payroll and attendance",
      "Support better workforce decisions",
    ],
  },
  {
    title: "Our Vision",
    description:
      "Our vision is to become a trusted HRMS solution provider by delivering flexible, secure, scalable and user-friendly HR technology.",
    icon: <Sparkles className="h-5 w-5" />,
    tone: "from-[#f0fdf4] to-white",
    points: [
      "Support organisations across industries",
      "Help teams modernise HR operations",
      "Adapt to growing workforce needs",
      "Improve employee experiences",
      "Keep HR data visible and organised",
    ],
  },
  {
    title: "Our Purpose",
    description:
      "Our purpose is to make workforce management simpler by replacing disconnected spreadsheets, manual registers and repeated data entry.",
    icon: <Handshake className="h-5 w-5" />,
    tone: "from-[#fff7ed] to-white",
    points: [
      "Bring HR work into one place",
      "Reduce repeated data entry",
      "Make approvals easier to follow",
      "Help teams work with more clarity",
      "Support growing businesses better",
    ],
  },
];

const coreValues: CardData[] = [
  {
    title: "Customer First",
    description:
      "We focus on understanding real business challenges and creating practical solutions that support daily HR operations.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Innovation",
    description:
      "We look for better ways to simplify attendance, payroll, leave, employee management, reporting and approvals.",
    icon: <Lightbulb className="h-5 w-5" />,
  },
  {
    title: "Trust",
    description:
      "Successful business relationships are built through transparency, accountability, clear communication and reliable service.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Simplicity",
    description: "Technology should make work easier, not more complicated.",
    icon: <CircleDot className="h-5 w-5" />,
  },
  {
    title: "Transparency",
    description: "We aim to be clear and honest about what our platform can do and how it works.",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "Security",
    description:
      "Employee and business information should be handled responsibly through controlled access and centralised data management.",
    icon: <LockKeyhole className="h-5 w-5" />,
  },
  {
    title: "Reliability",
    description: "We aim to build a platform that HR teams can depend on for their daily operations.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Collaboration",
    description:
      "We work closely with the businesses using Altroz HR to understand their needs better.",
    icon: <Handshake className="h-5 w-5" />,
  },
];

const serviceCards: CardData[] = [
  {
    title: "Employee Management",
    description:
      "Maintain complete employee records and information in one organised, centralised system.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Attendance Management",
    description:
      "Track attendance accurately, including GPS attendance, geo tracking and geo fencing for field and on-site teams.",
    icon: <Fingerprint className="h-5 w-5" />,
  },
  {
    title: "Payroll Management",
    description:
      "Manage payroll processing in a structured, systematic way linked to attendance and leave data.",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    title: "Leave Management",
    description:
      "Set up structured leave tracking and approvals so requests are easier to manage.",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Performance Management",
    description:
      "Organise reviews, goals and appraisal discussions in one clear workflow.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Recruitment",
    description:
      "Support hiring with a clearer flow for openings, applications and onboarding handoff.",
    icon: <Search className="h-5 w-5" />,
  },
  {
    title: "Mobile Accessibility",
    description:
      "Employees and managers can use the mobile HR app to stay connected on the go.",
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    title: "Approval Workflows",
    description:
      "Set up structured approval workflows for leave, reimbursement and other requests.",
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
  {
    title: "Scalable Solution",
    description:
      "Built to support businesses as their teams and HR needs grow.",
    icon: <PackageCheck className="h-5 w-5" />,
  },
  {
    title: "Reliable Support",
    description:
      "Our team is available to support businesses using the Altroz HR platform.",
    icon: <Handshake className="h-5 w-5" />,
  },
];

const industries: CardData[] = [
  {
    title: "Manufacturing",
    description: "Manage shift-based attendance and large workforce records efficiently.",
    icon: <Factory className="h-5 w-5" />,
  },
  {
    title: "Healthcare",
    description: "Handle attendance, shift schedules and employee records for healthcare staff.",
    icon: <HeartPulse className="h-5 w-5" />,
  },
  {
    title: "Construction",
    description: "Track on-site attendance with GPS attendance and geo fencing for field teams.",
    icon: <Construction className="h-5 w-5" />,
  },
  {
    title: "Retail",
    description: "Manage attendance, leave and payroll across multiple store locations.",
    icon: <Store className="h-5 w-5" />,
  },
  {
    title: "Education",
    description: "Maintain staff records, attendance and leave management for institutions.",
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    title: "Hospitality",
    description: "Manage flexible shifts and workforce attendance for hospitality teams.",
    icon: <Hotel className="h-5 w-5" />,
  },
  {
    title: "Logistics",
    description: "Track field and on-site staff using GPS attendance and geo tracking.",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    title: "IT & Software",
    description: "Support employee self service and performance management for office-based teams.",
    icon: <Laptop2 className="h-5 w-5" />,
  },
  {
    title: "Facility Management",
    description: "Manage distributed on-site staff attendance and workforce records.",
    icon: <Building2 className="h-5 w-5" />,
  },
];

const commitmentPoints = [
  "We focus on customer success and long-term support.",
  "We listen to feedback and keep improving the platform.",
  "We aim to build relationships that grow with your business.",
];

const faqItems = [
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

function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <div className="text-xs font-bold uppercase tracking-[0.28em] text-primary">{eyebrow}</div>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">{description}</p>
    </div>
  );
}

function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(11,92,255,0.09),_transparent_32%),linear-gradient(180deg,_#ffffff_0%,_#f7fbff_100%)]">
      <PageSEO
        title={pageTitle}
        description={pageDescription}
        canonicalPath={ROUTES.about}
      />
      <TopNavbar />
      <MainNavbar />

      <main className="overflow-x-hidden">
        <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-success/10 blur-3xl" />

          <div className="site-container grid gap-10 lg:grid-cols-12 lg:items-center">
            <ScrollReveal className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary shadow-sm">
                <Sparkles className="h-4 w-4" />
                About Altroz HR
              </div>

              <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Empowering Businesses with Smarter HR Management
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-soft">
                Simplify employee management, attendance, payroll, leave and workforce operations
                with a modern HR platform designed to help businesses work smarter, improve
                productivity and grow with confidence.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link to={ROUTES.bookDemo} className="btn-primary">
                  Book Free Demo
                </Link>
                <a href="#what-we-do" className="btn-outline">
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
              <div className="soft-card relative overflow-hidden p-5 sm:p-6">
                <div className="pointer-events-none absolute -right-16 top-0 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />
                <div className="space-y-4">
                  {heroHighlights.map((item, index) => (
                    <div
                      key={item.title}
                      className={cn(
                        "rounded-[1.4rem] border border-border p-4 shadow-sm",
                        "bg-gradient-to-br",
                        item.tone,
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="text-base font-bold text-ink">{item.title}</div>
                          <p className="mt-1 text-sm leading-6 text-ink-soft">{item.description}</p>
                        </div>
                      </div>

                      {index === 0 ? (
                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                          <div className="rounded-2xl bg-white/80 p-3 shadow-sm">
                            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                              Access
                            </div>
                            <div className="mt-1 text-sm font-semibold text-ink">Cloud-based</div>
                          </div>
                          <div className="rounded-2xl bg-white/80 p-3 shadow-sm">
                            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                              Workflow
                            </div>
                            <div className="mt-1 text-sm font-semibold text-ink">Connected modules</div>
                          </div>
                          <div className="rounded-2xl bg-white/80 p-3 shadow-sm">
                            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                              Output
                            </div>
                            <div className="mt-1 text-sm font-semibold text-ink">Clean reports</div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="site-container">
            <SectionHeading
              eyebrow="Who We Are"
              title="Altroz HR is built for practical, everyday workforce management"
              description="Altroz HR is an HR software platform developed by Altroz Technologies Pvt. Ltd. We build HR technology that helps businesses manage their workforce more efficiently."
              align="center"
            />

            <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-6">
                <div className="space-y-4">
                {whoWeArePoints.map((point) => (
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
                    Why teams need one system
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {manualVsDigital.map((card) => (
                      <div
                        key={card.title}
                        className="rounded-[1.35rem] border border-border bg-surface/40 p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                            {card.icon}
                          </div>
                          <div>
                            <div className="text-base font-bold text-ink">{card.title}</div>
                            <p className="mt-1 text-sm leading-6 text-ink-soft">{card.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-[1.5rem] border border-primary/15 bg-primary-soft/35 p-4">
                    <p className="text-sm leading-7 text-ink-soft">
                      Altroz HR brings these scattered processes into one connected platform where
                      employee data, attendance, leave, payroll and performance information live in
                      one place and are easier to access and act on.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-20">
          <div className="site-container">
            <SectionHeading
              eyebrow="Our Story"
              title="From manual processes to one connected platform"
              description="Altroz HR was created because HR teams needed a simpler way to manage everyday workforce operations."
              align="center"
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {storySteps.map((step, index) => (
                <div key={step.title} className="soft-card h-full p-5">
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                      {step.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
                        Step {index + 1}
                      </div>
                      <h3 className="mt-1 text-lg font-bold text-ink">{step.title}</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-ink-soft">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="site-container">
            <SectionHeading
              eyebrow="Mission, Vision & Purpose"
              title="What guides Altroz HR"
              description="Our mission and vision are focused on simplifying HR operations for growing businesses."
              align="center"
            />

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {missionCards.map((card) => (
                <article key={card.title} className="soft-card h-full overflow-hidden p-0">
                  <div className={cn("bg-gradient-to-br p-6", card.tone)}>
                    <div className="flex items-start gap-3">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                        {card.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-ink">{card.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-ink-soft">{card.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 p-6">
                    {card.points.map((point) => (
                      <div key={point} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span className="text-sm leading-6 text-ink-soft">{point}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-20" id="core-values">
          <div className="site-container">
            <SectionHeading
              eyebrow="Core Values"
              title="The principles behind the product"
              description="These values guide how we design, build and support Altroz HR."
              align="center"
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {coreValues.map((value) => (
                <div key={value.title} className="soft-card h-full p-5">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                    {value.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{value.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20" id="what-we-do">
          <div className="site-container">
            <SectionHeading
              eyebrow="What We Do"
              title="The core modules businesses use every day"
              description="Altroz HR brings together the core modules a business needs to manage its workforce, all within one platform."
              align="center"
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {serviceCards.map((card) => (
                <div key={card.title} className="soft-card h-full p-5">
                  <div className="flex items-start gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-ink">{card.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-ink-soft">{card.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-20" id="who-we-serve">
          <div className="site-container">
            <SectionHeading
              eyebrow="Who We Serve"
              title="Built for businesses across industries"
              description="Altroz HR is designed to support HR operations across a range of industries."
              align="center"
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {industries.map((industry) => (
                <div key={industry.title} className="soft-card h-full p-5">
                  <div className="flex items-start gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                      {industry.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-ink">{industry.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-ink-soft">{industry.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="site-container grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Our Commitment"
                title="Support that evolves with your business"
                description="We are committed to supporting the businesses that use Altroz HR by focusing on customer success, listening to feedback and continuously improving our platform."
              />

              <div className="mt-6 space-y-3">
                {commitmentPoints.map((point) => (
                  <div key={point} className="soft-card flex items-start gap-3 p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span className="text-sm leading-7 text-ink-soft">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="soft-card h-full overflow-hidden p-6 sm:p-7">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Customer partnership
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-soft">
                  Our goal is to build long-term partnerships with the businesses that trust us
                  with their HR operations. We keep refining the platform so it stays useful as HR
                  needs evolve.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      title: "Understand need",
                      desc: "Listen first and configure around real workflows.",
                      icon: <Search className="h-4 w-4" />,
                    },
                    {
                      title: "Support adoption",
                      desc: "Help teams start using the platform with confidence.",
                      icon: <Handshake className="h-4 w-4" />,
                    },
                    {
                      title: "Keep improving",
                      desc: "Refine the product using feedback and practical use.",
                      icon: <RefreshIcon className="h-4 w-4" />,
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-[1.35rem] border border-border bg-surface/40 p-4">
                      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                        {item.icon}
                      </div>
                      <h3 className="mt-4 text-base font-bold text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{item.desc}</p>
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
              title="Common questions about Altroz HR"
              description="Answers to the most common questions about the platform, supported teams and use cases."
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
              <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 left-0 h-64 w-64 rounded-full bg-success/10 blur-3xl" />

              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Ready to Get Started
                  </div>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                    Ready to transform your HR operations?
                  </h2>
                  <p className="mt-4 max-w-2xl text-ink-soft">
                    See how Altroz HR can help simplify employee management, attendance, payroll
                    and more for your business.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to={ROUTES.bookDemo} className="btn-primary">
                      Book Free Demo
                    </Link>
                    <Link to={ROUTES.contact} className="btn-outline">
                      Contact Our Team
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { title: "Attendance", desc: "Track time and shifts", icon: <Clock3 className="h-4 w-4" /> },
                      { title: "Payroll", desc: "Link data cleanly", icon: <Wallet className="h-4 w-4" /> },
                      { title: "Leave", desc: "Simplify approvals", icon: <CalendarDays className="h-4 w-4" /> },
                      { title: "Reports", desc: "See workforce data", icon: <BarChart3 className="h-4 w-4" /> },
                      { title: "Mobile", desc: "Use on the go", icon: <Smartphone className="h-4 w-4" /> },
                      { title: "Support", desc: "Get help when needed", icon: <Handshake className="h-4 w-4" /> },
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

function Sparkles({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3l1.9 5.7L20 10.6l-5.1 2.3L12 18l-2.9-5.1L4 10.6l6.1-1.9L12 3Z" />
      <path d="M5 3v4" />
      <path d="M3 5h4" />
      <path d="M19 17v4" />
      <path d="M17 19h4" />
    </svg>
  );
}

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 12a9 9 0 0 1 15.73-5.86" />
      <path d="M21 4v6h-6" />
      <path d="M21 12a9 9 0 0 1-15.73 5.86" />
      <path d="M3 20v-6h6" />
    </svg>
  );
}

export default AboutUsPage;
