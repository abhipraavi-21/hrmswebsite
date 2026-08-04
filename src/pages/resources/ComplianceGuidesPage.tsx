"use client";

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Factory,
  FileText,
  GraduationCap,
  HeartPulse,
  Landmark,
  Laptop2,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  Truck,
  Users,
  Wallet,
  Workflow,
  Presentation,
} from "lucide-react";
import Footer from "@/components/site/Footer";
import ManagedContentShowcase from "@/components/site/ManagedContentShowcase";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/routes/routeConfig.js";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { usePublicContentRecord, usePublishedContent } from "@/site/PublicSiteDataContext";

const pageTitle = "HR Compliance Guide India | PF, ESIC, Payroll & Labour Law | Altroz HR";
const pageDescription =
  "Learn HR compliance in India with Altroz HR's compliance guides. Explore PF, ESIC, professional tax, gratuity, payroll and labour law basics in simple language.";

type CardItem = {
  title: string;
  description: string;
  icon: ReactNode;
  href?: string;
  cta?: string;
};

type FaqItem = {
  q: string;
  a: string;
};

const heroHighlights: CardItem[] = [
  {
    title: "PF & ESIC",
    description: "Understand the common statutory deductions and related record keeping.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Payroll Compliance",
    description: "See how attendance, deductions and payroll records stay aligned.",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    title: "Employee Documents",
    description: "Keep forms, letters and records organized across the employee lifecycle.",
    icon: <FileText className="h-5 w-5" />,
  },
];

const complianceBasics: CardItem[] = [
  {
    title: "What Compliance Means",
    description:
      "HR compliance is the practice of keeping HR processes, employee records and payroll aligned with the relevant rules and policies that apply to your business.",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "Why It Matters",
    description:
      "Good compliance practices help teams stay organized, reduce confusion and create a more transparent workplace as the business grows.",
    icon: <Target className="h-5 w-5" />,
  },
  {
    title: "Common Challenges",
    description:
      "Manual tracking, disconnected records and inconsistent processes make it harder for HR teams to stay on top of everyday responsibilities.",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: "Risks of Manual Tracking",
    description:
      "Spreadsheets, emails and paper files can lead to duplicate records, delays and difficulty retrieving information when it is needed later.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

const complianceCategories: CardItem[] = [
  {
    title: "PF & ESIC",
    description: "Learn the basics of employee contribution records and benefit-related tracking.",
    icon: <ShieldCheck className="h-5 w-5" />,
    href: ROUTES.payroll,
    cta: "Open payroll guide",
  },
  {
    title: "Professional Tax",
    description: "See how state-linked tax records and deductions fit into payroll work.",
    icon: <Wallet className="h-5 w-5" />,
    href: ROUTES.payroll,
    cta: "Open payroll guide",
  },
  {
    title: "Gratuity & Bonus",
    description: "Understand long-service benefits and year-end statutory considerations.",
    icon: <BadgeCheck className="h-5 w-5" />,
    href: ROUTES.payroll,
    cta: "Open payroll guide",
  },
  {
    title: "Minimum Wages",
    description: "Keep wage-related records aligned with the rules that apply in your location.",
    icon: <Landmark className="h-5 w-5" />,
    href: ROUTES.payroll,
    cta: "Open payroll guide",
  },
  {
    title: "Employee Records",
    description: "Store profiles, letters and job details in a central place that is easy to review.",
    icon: <Users className="h-5 w-5" />,
    href: ROUTES.coreHR,
    cta: "Open employee guide",
  },
  {
    title: "Attendance & Leave",
    description: "Keep time tracking, leave policies and approvals aligned with payroll data.",
    icon: <CalendarDays className="h-5 w-5" />,
    href: ROUTES.attendanceManagement,
    cta: "Open attendance guide",
  },
  {
    title: "Employee Documents",
    description: "Make offer letters, IDs and policy acknowledgements easier to organize.",
    icon: <FileText className="h-5 w-5" />,
    href: ROUTES.documentGeneration,
    cta: "Open document guide",
  },
  {
    title: "HR Reports",
    description: "Review workforce information in a structured way when you need visibility.",
    icon: <BookOpen className="h-5 w-5" />,
    href: ROUTES.reports,
    cta: "Open reports",
  },
  {
    title: "Workforce Visibility",
    description: "Track location, shifts and team movement with clearer operational oversight.",
    icon: <MapPinned className="h-5 w-5" />,
    href: ROUTES.workforce,
    cta: "Open workforce guide",
  },
  {
    title: "HR Automation",
    description: "See how automation can help reduce repetitive admin tasks and manual follow-up.",
    icon: <Workflow className="h-5 w-5" />,
    href: ROUTES.automation,
    cta: "Open automation guide",
  },
];

const complianceChecklist: CardItem[] = [
  {
    title: "Employee master data",
    description: "Keep names, roles, departments and joining details updated and easy to retrieve.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Attendance logs",
    description: "Maintain accurate attendance records that support salary and process checks.",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Leave records",
    description: "Track leave applications, balances and approvals in a consistent format.",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "Payroll registers",
    description: "Store pay-related records, deductions and summaries in one organized flow.",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    title: "Policy acknowledgements",
    description: "Keep proof that important HR policies were shared and acknowledged where needed.",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Employment letters",
    description: "Retain offer letters, confirmations and other key employee documents centrally.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Exit records",
    description: "Keep notice period, handover and final settlement information properly filed.",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "Audit trail",
    description: "Make it easier to review what changed, when it changed and who updated it.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

const processCards: CardItem[] = [
  {
    title: "Recruitment",
    description:
      "Candidate records and hiring documents create a structured foundation for the employee lifecycle.",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Employee Onboarding",
    description:
      "Collect the right documents early so employee setup is cleaner and rework is reduced later.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Attendance",
    description:
      "Consistent attendance tracking supports payroll accuracy and clear records across teams.",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Leave",
    description:
      "A clear leave process helps employees and managers understand balances and approvals.",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "Payroll",
    description:
      "Payroll is closely tied to statutory deductions, making organized records especially important.",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    title: "Performance",
    description:
      "Documented reviews and feedback support fairer decisions and clearer employee records.",
    icon: <Target className="h-5 w-5" />,
  },
  {
    title: "Asset Management",
    description:
      "Tracking company assets issued to employees supports accountability throughout employment.",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Employee Documents",
    description:
      "Centralized document storage helps teams retrieve records quickly when they need them.",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Employee Exit",
    description:
      "A structured exit process helps close the lifecycle smoothly with the right documentation.",
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
  {
    title: "HR Reports",
    description:
      "Regular reporting gives visibility into workforce data and helps teams make better decisions.",
    icon: <BookOpen className="h-5 w-5" />,
  },
];

const industryGuides: CardItem[] = [
  {
    title: "Manufacturing",
    description:
      "Shift-based operations often need tighter attendance, overtime and workforce records.",
    icon: <Factory className="h-5 w-5" />,
  },
  {
    title: "Healthcare",
    description:
      "Hospitals and clinics usually need careful staffing, shift coverage and document control.",
    icon: <HeartPulse className="h-5 w-5" />,
  },
  {
    title: "Retail",
    description:
      "Branch-level teams need consistent records across locations and changing schedules.",
    icon: <Store className="h-5 w-5" />,
  },
  {
    title: "IT and Software",
    description:
      "Flexible teams often benefit from self-service, documents and clear approvals.",
    icon: <Laptop2 className="h-5 w-5" />,
  },
  {
    title: "Construction",
    description:
      "Field staff, site movement and mobile attendance create different record keeping needs.",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    title: "Education",
    description:
      "Teaching and non-teaching teams often need separate records, policies and payroll handling.",
    icon: <Presentation className="h-5 w-5" />,
  },
];

const bestPractices: CardItem[] = [
  {
    title: "Keep records current",
    description: "Update employee and payroll data regularly instead of waiting until month-end.",
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
  {
    title: "Align attendance and payroll",
    description: "Lock the input records first so payroll is built on clean, verified data.",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Use plain-language policies",
    description: "Make HR policies easy for employees to read and managers to apply consistently.",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "Centralize documents",
    description: "Store forms, letters and acknowledgements in one place for easier retrieval.",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Review rules regularly",
    description: "Check internal policies and state-specific requirements as your business changes.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Use role-based access",
    description: "Limit access so people only see the records they need for their role.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Maintain an audit trail",
    description: "Keep a clear history of key changes for smoother internal review later.",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Plan for growth",
    description: "Build processes that can scale as headcount, branches and workflows expand.",
    icon: <Building2 className="h-5 w-5" />,
  },
];

const trustCards: CardItem[] = [
  {
    title: "Simple Language",
    description: "The guides explain compliance topics without unnecessary jargon.",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: "Practical Examples",
    description: "Ideas are framed around real HR situations, not abstract theory alone.",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "India-Focused",
    description: "The page focuses on common HR and payroll topics relevant to Indian teams.",
    icon: <Landmark className="h-5 w-5" />,
  },
  {
    title: "Updated Guides",
    description: "The library can grow as HR practices, policies and processes evolve.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Actionable Content",
    description: "Each guide is meant to help you take the next step more confidently.",
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
  {
    title: "HR Process Focus",
    description: "The content connects compliance ideas to attendance, payroll and records.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Built for Growing Teams",
    description: "Useful for small, medium and expanding teams that need structure.",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "Easy Navigation",
    description: "Topics are grouped so you can move from broad guidance to specific workflows.",
    icon: <BookOpen className="h-5 w-5" />,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "What is HR compliance?",
    a: "HR compliance refers to organizing HR practices, employee records and payroll processes in line with applicable statutory and regulatory expectations in India.",
  },
  {
    q: "Why is HR compliance important?",
    a: "It helps organizations stay organized, build trust with employees and reduce administrative confusion as they grow.",
  },
  {
    q: "What is statutory compliance in HR?",
    a: "Statutory compliance generally refers to the regulatory requirements employers commonly work with, such as PF, ESIC and professional tax.",
  },
  {
    q: "What is PF?",
    a: "PF, or Provident Fund, is a long-term savings contribution associated with employment in India.",
  },
  {
    q: "What is ESIC?",
    a: "ESIC, or Employees' State Insurance, is generally associated with employee health and social security benefits.",
  },
  {
    q: "What is Professional Tax?",
    a: "Professional tax is a state-level tax that generally applies to salaried employees and professionals in certain Indian states.",
  },
  {
    q: "What is Gratuity?",
    a: "Gratuity is generally understood as a long-term benefit paid to employees who complete a certain period of continuous service.",
  },
  {
    q: "What is the Bonus Act?",
    a: "The Bonus Act is generally associated with statutory bonus payments made to eligible employees in India.",
  },
  {
    q: "Why are employee records important?",
    a: "Accurate employee records support smoother HR processes, from onboarding through to exit, and make information easy to retrieve when needed.",
  },
  {
    q: "How can HR software support compliance processes?",
    a: "HR software can help organize employee data, automate attendance and payroll workflows and centralize documentation.",
  },
  {
    q: "What is the Shops and Establishments Act?",
    a: "It generally relates to the registration and regulation of shops and commercial establishments in a given state.",
  },
  {
    q: "What is Minimum Wages compliance?",
    a: "It generally refers to paying employees in line with wage standards set by the relevant state or central authority.",
  },
  {
    q: "Does Altroz HR provide legal advice?",
    a: "No. The compliance guides are educational resources and do not constitute legal, tax or professional advice.",
  },
  {
    q: "Is HR compliance the same across all Indian states?",
    a: "Not always. Several compliance areas, such as professional tax and minimum wages, can vary by state.",
  },
  {
    q: "Where can I learn more about HR compliance?",
    a: "You can explore the full library of compliance guides on this page, or book a free demo to see how Altroz HR supports everyday HR processes.",
  },
];

const quickLinks = [
  { label: "Employee Management", href: ROUTES.coreHR },
  { label: "Attendance Management", href: ROUTES.attendanceManagement },
  { label: "Leave Management", href: ROUTES.leaveManagement },
  { label: "Payroll Management", href: ROUTES.payroll },
  { label: "Document Generation", href: ROUTES.documentGeneration },
  { label: "HR Reports & Analytics", href: ROUTES.reports },
  { label: "Employee Lifecycle", href: ROUTES.coreHR },
  { label: "Workforce Management", href: ROUTES.workforce },
];

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
    <ScrollReveal variant="fade-up" className={center ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}>
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-7 text-ink-soft">{description}</p>
    </ScrollReveal>
  );
}

function Card({
  title,
  description,
  icon,
  href,
  cta,
}: CardItem) {
  const inner = (
    <>
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{description}</p>
      {(cta || href) && (
        <div className="mt-auto pt-5 text-sm font-semibold text-primary">
          {cta ?? "Read more"}
          <ArrowRight className="ml-1 inline-block h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      )}
    </>
  );

  const className =
    "group flex h-full flex-col rounded-[1.5rem] border border-border bg-white p-5 shadow-card transition-transform duration-200 hover:-translate-y-0.5";

  if (href) {
    return (
      <Link to={href} className={className}>
        {inner}
      </Link>
    );
  }

  return <article className={className}>{inner}</article>;
}

function ProcessCard({ title, description, icon }: CardItem) {
  return (
    <article className="soft-card flex h-full flex-col p-5">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{description}</p>
    </article>
  );
}

function SmartLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export default function ComplianceGuidesPage() {
  const canonicalPath =
    typeof window !== "undefined" ? window.location.pathname : ROUTES.complianceGuides;
  const managedComplianceGuides = usePublishedContent("Compliance Guide");
  const compliancePageContent = usePublicContentRecord(ROUTES.complianceGuides, "Page");
  const complianceHeroTitle =
    compliancePageContent?.heroTitle ?? "HR Compliance Guide for Indian Businesses";
  const complianceHeroDescription =
    compliancePageContent?.heroDescription ??
    "Understanding HR compliance in India does not have to be complicated. From Provident Fund and ESIC to payroll compliance and employee documentation, Altroz HR brings together simple, practical guides that help HR teams, payroll executives and business owners manage everyday HR work with more confidence.";
  const complianceHeroSummary =
    compliancePageContent?.summary ??
    "Explore the guide library to build stronger processes, clearer records and a more organized compliance workflow.";
  const complianceCtaTitle =
    compliancePageContent?.ctaTitle ?? "Simplify HR compliance with Altroz HR";
  const complianceCtaDescription =
    compliancePageContent?.ctaDescription ??
    "Explore the growing library of HR compliance guides, or see how Altroz HR helps teams stay organized across attendance, leave, payroll and documentation.";
  const complianceCtaButtonText =
    compliancePageContent?.ctaButtonText ?? "Explore HR Guides";

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={pageTitle}
        description={pageDescription}
        canonicalPath={canonicalPath}
        ogTitle="HR Compliance Guide for Indian Businesses | Altroz HR"
        ogDescription="A simple, practical HR compliance knowledge hub covering PF, ESIC, payroll, gratuity, bonus and labour law basics by Altroz HR."
      />
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="page-banner hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="site-container">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <div className="flex justify-center lg:justify-start">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-extrabold tracking-normal text-primary shadow-sm">
                    <Sparkles className="h-4 w-4" />
                    {compliancePageContent?.title ?? "HR Compliance Made Simple"}
                  </span>
                </div>
                <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
                  {complianceHeroTitle}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
                  {complianceHeroDescription}
                </p>
                <p className="mt-4 max-w-xl text-sm leading-6 text-ink-soft">
                  {complianceHeroSummary}
                </p>

                <div className="button-group mt-6">
                  <Button asChild className="h-11 rounded-full bg-primary px-6 font-semibold text-white">
                    <a href="#compliance-categories">{compliancePageContent?.ctaButtonText ?? "Explore Compliance Guides"}</a>
                  </Button>
                  <Button asChild variant="outline" className="h-11 rounded-full px-6 font-semibold">
                    <Link to={ROUTES.bookDemo}>Book a Free Demo</Link>
                  </Button>
                </div>

                <div className="mt-6 flex flex-wrap gap-3 text-xs text-ink-soft">
                  <div className="rounded-full border border-border bg-white px-3 py-2 shadow-sm">
                    PF and ESIC guidance
                  </div>
                  <div className="rounded-full border border-border bg-white px-3 py-2 shadow-sm">
                    Payroll and records
                  </div>
                  <div className="rounded-full border border-border bg-white px-3 py-2 shadow-sm">
                    Educational only
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="soft-card overflow-hidden p-6 md:p-8">
                  <div className="rounded-[1.75rem] border border-border bg-surface p-5 shadow-card">
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                          Compliance Overview
                        </div>
                        <h2 className="mt-2 text-2xl font-bold text-ink">
                          What this guide library focuses on
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-ink-soft">
                          The content is designed to help teams understand the basic ideas behind
                          HR compliance and how those ideas connect to records, payroll and process.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {[
                        "Statutory basics in simple language",
                        "Records, forms and audit readiness",
                        "Payroll and attendance alignment",
                        "Practical HR process checklists",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-sm"
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span className="text-sm text-ink">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      {[
                        { value: "PF", label: "Common topic" },
                        { value: "ESIC", label: "Common topic" },
                        { value: "Payroll", label: "Common topic" },
                      ].map((item) => (
                        <div key={item.label} className="soft-card p-4">
                          <div className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                            {item.value}
                          </div>
                          <div className="mt-1 text-sm text-ink-soft">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <StaggerReveal step={70} className="mt-8 grid gap-4 md:grid-cols-3">
              {heroHighlights.map((item) => (
                <Card key={item.title} {...item} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <ManagedContentShowcase
          eyebrow="Admin Managed Compliance Guides"
          title="Published compliance records from the admin panel"
          description="The compliance team can manage these entries in the admin workspace, and the public frontend will surface the latest approved or published guide summaries here."
          records={managedComplianceGuides}
        />

        <section className="section">
          <div className="site-container">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-6">
                <SectionHeading
                  eyebrow="What is HR Compliance?"
                  title="Keep HR practices, records and payroll aligned with the rules that apply to your business"
                  description="HR compliance means keeping employee records, payroll processing and workplace policies organized so they remain consistent with the statutory and regulatory expectations relevant to your organization."
                />
                <div className="mt-5 space-y-4 text-base leading-7 text-ink-soft">
                  <p>
                    Good compliance practices help build trust between employers and employees,
                    reduce administrative confusion and support smoother business operations.
                  </p>
                  <p>
                    For growing businesses, staying organized around statutory HR concepts such as
                    PF, ESIC, professional tax, gratuity and bonus becomes an important part of
                    scaling responsibly.
                  </p>
                  <p>
                    Altroz HR helps organizations bring structure to everyday HR work by organizing
                    employee records, automating attendance and payroll workflows and centralizing
                    documents.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6">
                <StaggerReveal step={60} className="grid gap-4 sm:grid-cols-2">
                  {complianceBasics.map((item) => (
                    <Card key={item.title} {...item} />
                  ))}
                </StaggerReveal>
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-border bg-white p-4 text-center text-sm leading-6 text-ink-soft shadow-sm">
              This content is for general educational purposes only and does not constitute legal,
              tax or professional advice. Compliance requirements can vary by state, industry and
              organization.
            </div>
          </div>
        </section>

        <section id="compliance-categories" className="section bg-surface">
          <div className="site-container">
            <SectionHeading
              eyebrow="Explore Compliance Categories"
              title="Browse the compliance topics Indian HR and payroll teams commonly encounter"
              description="Each card opens a related Altroz HR page so visitors can move from compliance concepts into the workflows that support them."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {complianceCategories.map((item) => (
                <Card key={item.title} {...item} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <SectionHeading
              eyebrow="Compliance Checklist"
              title="A practical checklist of records HR teams commonly maintain"
              description="Use this section as a quick reminder of the documents and records that often matter in everyday compliance-related work."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {complianceChecklist.map((item) => (
                <Card key={item.title} {...item} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-surface">
          <div className="site-container">
            <SectionHeading
              eyebrow="Compliance Across Every HR Process"
              title="Compliance shows up across the full employee journey, not just in payroll"
              description="From recruitment to exit, a more structured process gives HR teams a better base for record keeping and review."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {processCards.map((item) => (
                <ProcessCard key={item.title} {...item} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <SectionHeading
              eyebrow="Industry Compliance Guides"
              title="Different industries need different compliance habits and record structures"
              description="The examples below show how the same HR platform can support different business contexts in a practical way."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {industryGuides.map((item) => (
                <Card key={item.title} {...item} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-surface">
          <div className="site-container">
            <SectionHeading
              eyebrow="HR Compliance Best Practices"
              title="Simple habits that make compliance work easier to manage"
              description="These best practices keep the page useful for teams that want clear, practical actions they can apply right away."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {bestPractices.map((item) => (
                <Card key={item.title} {...item} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <SectionHeading
              eyebrow="Why Learn Compliance with Altroz HR?"
              title="A practical, dependable way to understand compliance without extra complexity"
              description="The learning content is designed to feel useful for HR teams, payroll staff and business owners who want structure without jargon."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {trustCards.map((item) => (
                <Card key={item.title} {...item} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-surface">
          <div className="site-container">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="Quick answers to the most common compliance questions"
              description="These FAQs keep the guide easy to scan for people who want a quick understanding before reading more."
              center
            />

            <div className="mx-auto mt-8 max-w-4xl space-y-3">
              {faqItems.map((item) => (
                <Accordion
                  key={item.q}
                  type="single"
                  collapsible
                  className="rounded-2xl border border-border bg-white px-5 shadow-card"
                >
                  <AccordionItem value={item.q} className="border-0">
                    <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink no-underline hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pt-1">
                      <p className="text-sm leading-7 text-ink-soft">{item.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <div className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-8 top-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 left-6 h-28 w-28 rounded-full bg-success/10 blur-3xl" />

              <div className="relative grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    {compliancePageContent?.focusKeyword ?? "Final CTA"}
                  </div>
                  <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">
                    {complianceCtaTitle}
                  </h2>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
                    {complianceCtaDescription}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {quickLinks.map((link) => (
                      <SmartLink
                        key={link.label}
                        href={link.href}
                        className="rounded-full border border-border bg-white px-3 py-2 text-sm font-medium text-ink shadow-sm transition-colors hover:bg-primary-soft hover:text-primary"
                      >
                        {link.label}
                      </SmartLink>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="button-group lg:justify-end">
                    <Button asChild className="h-11 rounded-full bg-primary px-6 font-semibold text-white">
                      <Link to={ROUTES.learn}>{complianceCtaButtonText}</Link>
                    </Button>
                    <Button asChild variant="outline" className="h-11 rounded-full px-6 font-semibold">
                      <Link to={ROUTES.bookDemo}>Book Free Demo</Link>
                    </Button>
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
