import { useEffect } from "react";
import type { ReactNode } from "react";
import {
  BadgeCheck,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  Globe,
  MapPin,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";

import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import TopNavbar from "@/components/site/TopNavbar";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ROUTES } from "@/routes/routeConfig.js";
import { modelScreenshots } from "@/lib/modelScreenshots";
import { cn } from "@/lib/utils";

type CardItem = {
  title: string;
  desc: string;
  icon: ReactNode;
};

type FeatureCard = {
  title: string;
  desc: string;
  icon: ReactNode;
};

type WorkflowStep = {
  step: string;
  title: string;
  desc: string;
};

type FaqItem = {
  q: string;
  a: string;
};

const heroHighlights: CardItem[] = [
  {
    title: "Automated HR Workflows",
    desc: "Everyday HR tasks like attendance tracking, leave approvals, and document generation run automatically.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Centralized Operations",
    desc: "Employee data, attendance, leave, payroll, and assets are all managed from a single platform.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Reduce Manual Work",
    desc: "Approvals, reminders, and notifications happen automatically, cutting down manual follow-ups.",
    icon: <Clock3 className="h-5 w-5" />,
  },
];

const importanceCards: CardItem[] = [
  {
    title: "Reduce manual paperwork",
    desc: "Replace repetitive forms, follow-ups, and manual tracking with structured workflows.",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Save valuable HR time",
    desc: "Let the system handle routine tasks so HR can focus on people and planning.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Improve payroll accuracy",
    desc: "Automated salary, deduction, and compliance flows help reduce avoidable errors.",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    title: "Speed up approvals",
    desc: "Route leave, attendance, expense, and document requests to the right reviewers faster.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Track attendance in real time",
    desc: "Keep attendance and shift activity visible as people move through the day.",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    title: "Maintain accurate records",
    desc: "Centralize employee data so records stay consistent across modules and workflows.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Improve statutory compliance",
    desc: "Keep statutory reports and records organized for easier review and follow-up.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Make faster decisions",
    desc: "Use up-to-date HR information and reports to support operational decisions quickly.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
];

const automationFeatures: FeatureCard[] = [
  {
    title: "Employee Management Automation",
    desc: "Employee profiles, records, and information are organized automatically in one place.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Attendance Automation",
    desc: "Employee attendance is tracked and recorded automatically, reducing manual register work.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Leave Automation",
    desc: "Leave requests, balances, and records are managed automatically in a structured flow.",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Payroll Automation",
    desc: "Payroll processing uses attendance and leave data already captured in the system.",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    title: "Recruitment Automation",
    desc: "Candidate information and recruitment records are organized automatically for the hiring team.",
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
  {
    title: "Performance Automation",
    desc: "Employee performance records and reviews are tracked and organized automatically.",
    icon: <Target className="h-5 w-5" />,
  },
  {
    title: "Asset Management Automation",
    desc: "Company assets assigned to employees are tracked automatically, without manual registers.",
    icon: <Globe className="h-5 w-5" />,
  },
  {
    title: "Employee Self Service Automation",
    desc: "Employees can access their own information and raise requests directly through self-service.",
    icon: <UserRound className="h-5 w-5" />,
  },
  {
    title: "Exit Management Automation",
    desc: "Exit formalities and related records are managed through an organized, automated process.",
    icon: <FileCheck2 className="h-5 w-5" />,
  },
  {
    title: "Document Generation Automation",
    desc: "HR documents are generated automatically from existing employee data.",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Approval Workflow Automation",
    desc: "Requests move automatically through the correct approval process.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Notification Automation",
    desc: "Employees and HR teams receive automatic notifications and reminders.",
    icon: <Bell className="h-5 w-5" />,
  },
];

const workflowSteps: WorkflowStep[] = [
  {
    step: "1",
    title: "Employee Added",
    desc: "A new employee is added to the system, and their profile becomes the base for every process that follows.",
  },
  {
    step: "2",
    title: "Attendance Managed",
    desc: "The employee's attendance is recorded and managed automatically within the system.",
  },
  {
    step: "3",
    title: "Leave Requests",
    desc: "Leave requests are raised and tracked digitally, with balances updated automatically.",
  },
  {
    step: "4",
    title: "Approval Process",
    desc: "Requests such as leave move through a defined approval workflow without manual follow-ups.",
  },
  {
    step: "5",
    title: "Payroll Processing",
    desc: "Payroll is processed using the attendance and leave data already captured in the system.",
  },
  {
    step: "6",
    title: "Document Generation",
    desc: "Required HR documents are generated automatically using the employee's existing records.",
  },
  {
    step: "7",
    title: "Employee Self Service",
    desc: "Employees access their information, requests, and documents directly through self-service.",
  },
  {
    step: "8",
    title: "HR Reports",
    desc: "HR reports are compiled automatically from the data captured across the platform.",
  },
];

const dashboardCards: CardItem[] = [
  {
    title: "Employee Records",
    desc: "Access organized employee profiles and information in one place.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Attendance",
    desc: "Track employee attendance without maintaining manual registers.",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    title: "Leave",
    desc: "Monitor leave requests and balances across the organization.",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Payroll",
    desc: "Keep payroll data organized and connected to attendance and leave.",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    title: "Assets",
    desc: "Track company assets assigned to employees.",
    icon: <Globe className="h-5 w-5" />,
  },
  {
    title: "Approvals",
    desc: "View pending and completed approvals across departments.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Notifications",
    desc: "Stay updated on important HR alerts and reminders.",
    icon: <Bell className="h-5 w-5" />,
  },
  {
    title: "Reports",
    desc: "Access HR reports generated from existing employee data.",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Department Activities",
    desc: "Get visibility into HR activity across teams and departments.",
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
];

const benefitCards: CardItem[] = [
  {
    title: "Save Time",
    desc: "Automated processes reduce the hours HR teams spend on repetitive manual tasks.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Reduce Manual Work",
    desc: "Routine data entry and paperwork are minimized, letting HR teams focus on employees.",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Improve Productivity",
    desc: "With HR operations automated, teams can complete more work in less time.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Reduce Errors",
    desc: "Automated calculations for attendance, leave, and payroll reduce manual mistakes.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Better Employee Experience",
    desc: "Employees get faster responses to requests through self-service and automated approvals.",
    icon: <UserRound className="h-5 w-5" />,
  },
  {
    title: "Paperless HR",
    desc: "Digital records and document generation reduce dependence on physical paperwork.",
    icon: <FileCheck2 className="h-5 w-5" />,
  },
  {
    title: "Faster Decisions",
    desc: "Organized, up-to-date HR data helps teams respond and decide faster.",
    icon: <Target className="h-5 w-5" />,
  },
  {
    title: "Organized HR Operations",
    desc: "Every HR process is structured and connected instead of scattered across tools.",
    icon: <Workflow className="h-5 w-5" />,
  },
];

const whyChoosePoints = [
  "Easy to Use",
  "Centralized HR Platform",
  "Simple Implementation",
  "Secure Employee Information",
  "Role-Based Access",
  "Automated Daily Operations",
  "Scalable for Growing Businesses",
  "Reliable Support",
];

const faqItems: FaqItem[] = [
  {
    q: "What is HR Automation Software?",
    a: "HR Automation Software is a digital platform that manages HR processes such as employee records, attendance, leave, payroll, and approvals automatically, instead of handling them manually through spreadsheets and paperwork.",
  },
  {
    q: "Why is HR Automation important?",
    a: "HR Automation is important because it reduces manual work, saves time, improves accuracy, and helps HR teams manage growing businesses without relying on scattered files and processes.",
  },
  {
    q: "How does HR Automation reduce manual work?",
    a: "HR Automation reduces manual work by handling repetitive tasks like attendance tracking, leave calculations, approvals, and document generation automatically within the system.",
  },
  {
    q: "Can HR Automation simplify attendance?",
    a: "Yes. With Altroz HRMS, employee attendance is tracked and managed automatically, removing the need for manual attendance registers.",
  },
  {
    q: "Can HR Automation automate payroll?",
    a: "Yes. Altroz HRMS automates payroll processing using attendance and leave data already captured in the system.",
  },
  {
    q: "Can HR Automation manage approvals?",
    a: "Yes. Requests such as leave move through an automated approval workflow, so HR teams do not need to follow up manually.",
  },
  {
    q: "Can HR Automation generate documents?",
    a: "Yes. Altroz HRMS generates HR documents automatically using existing employee data, saving time compared to drafting them manually.",
  },
  {
    q: "Is HR Automation suitable for SMEs?",
    a: "Yes. Altroz HRMS is built to be easy to use and simple to implement, making it a practical fit for small and medium-sized businesses.",
  },
  {
    q: "Can employees access HR services online?",
    a: "Yes. Through Employee Self Service, employees can access their information and raise requests directly, without depending on HR for every task.",
  },
  {
    q: "Why choose Altroz HR Automation?",
    a: "Altroz HRMS offers a centralized, easy-to-use platform that automates everyday HR operations, from employee management to exit, with secure, role-based access and reliable support.",
  },
];

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const previousTitle = document.title;
    const existingMeta = document.querySelector('meta[name="description"]');
    const previousDescription = existingMeta?.getAttribute("content");
    let metaTag = existingMeta as HTMLMetaElement | null;

    document.title = title;

    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.name = "description";
      document.head.appendChild(metaTag);
    }

    metaTag.content = description;

    return () => {
      document.title = previousTitle;

      if (metaTag) {
        if (previousDescription !== null && previousDescription !== undefined) {
          metaTag.content = previousDescription;
        } else {
          metaTag.remove();
        }
      }
    };
  }, [title, description]);
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
    <div className={cn(center ? "mx-auto max-w-3xl text-center" : "max-w-3xl")}>
      <span className="text-xs font-bold uppercase tracking-wider text-primary">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
      <p className={cn("mt-3 text-ink-soft", center && "mx-auto max-w-2xl")}>{description}</p>
    </div>
  );
}

function IconCard({
  title,
  desc,
  icon,
  className,
  titleClassName = "text-lg",
}: CardItem & { className?: string; titleClassName?: string }) {
  return (
    <article className={cn("soft-card h-full p-5", className)}>
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className={cn("font-bold leading-6 text-ink", titleClassName)}>{title}</h3>
          <p className="mt-2 text-sm leading-6 text-ink-soft">{desc}</p>
        </div>
      </div>
    </article>
  );
}

function WorkflowStepCard({ step, title, desc }: WorkflowStep) {
  return (
    <article className="soft-card h-full p-5">
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-base font-bold text-primary">
          {step}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-bold leading-6 text-ink">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-ink-soft">{desc}</p>
        </div>
      </div>
    </article>
  );
}

function FaqItemCard({ q, a }: FaqItem) {
  return (
    <AccordionItem value={q} className="rounded-2xl border border-border bg-white px-4">
      <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink hover:no-underline">
        {q}
      </AccordionTrigger>
      <AccordionContent className="pb-4 text-sm leading-6 text-ink-soft">{a}</AccordionContent>
    </AccordionItem>
  );
}

export default function HrAutomationPage() {
  usePageMeta(
    "HR Automation Software | Automate HR Operations with Altroz HRMS",
    "Automate attendance, leave, payroll, recruitment, and more with Altroz HRMS. Manage your entire workforce from one centralized HR automation platform.",
  );

  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x py-4 lg:py-6">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <ScrollReveal variant="fade-up" className="lg:col-span-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  HR Process Automation
                </span>

                <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                  HR Automation Software That Simplifies Every HR Task
                </h1>

                <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft sm:text-lg">
                  Altroz HRMS brings every HR process onto one automated platform. From employee
                  onboarding to payroll and exit, manual paperwork is replaced with organized,
                  automated workflows that save time and reduce errors for growing businesses.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={ROUTES.bookDemo} className="btn-primary">
                    Book Free Demo
                  </a>
                  <a href={ROUTES.contact} className="btn-outline">
                    Request Demo
                  </a>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {heroHighlights.map((item) => (
                    <IconCard
                      key={item.title}
                      title={item.title}
                      desc={item.desc}
                      icon={item.icon}
                      className="p-4"
                      titleClassName="text-base"
                    />
                  ))}
                </div>

                <p className="mt-4 text-sm font-medium text-ink-soft">
                  Trusted by growing businesses to automate everyday HR operations.
                </p>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" delay={100} className="lg:col-span-6">
                <div className="relative mx-auto max-w-2xl">
                  <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
                  <div className="relative grid gap-4 rounded-[2rem] border border-border bg-white p-5 shadow-float">
                    <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface">
                      <img
                        src={modelScreenshots.workforceDashboard}
                        alt="HR automation dashboard preview"
                        className="block h-auto w-full bg-white object-contain"
                        loading="eager"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl bg-primary/5 p-5">
                        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                          <Workflow className="h-4 w-4" />
                          Workflow automation
                        </div>
                        <p className="mt-3 text-sm leading-6 text-ink-soft">
                          Manage requests, approvals, alerts, and updates from a single workflow.
                        </p>
                      </div>

                      <div className="rounded-2xl bg-[#ecfdf3] p-5">
                        <div className="flex items-center gap-2 text-sm font-semibold text-success">
                          <Download className="h-4 w-4" />
                          Reporting ready
                        </div>
                        <p className="mt-3 text-sm leading-6 text-ink-soft">
                          Keep reports organized for reviews and exports in Excel or PDF.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-center">
            <ScrollReveal variant="fade-up" className="lg:col-span-6">
              <SectionHeading
                eyebrow="Automation basics"
                title="What is HR Automation?"
                description="HR Automation is the process of using software to streamline and automate routine HR tasks such as attendance tracking, payroll processing, leave approvals, employee record management, recruitment workflows, notifications, and HR reporting."
              />

              <p className="mt-4 max-w-2xl text-ink-soft">
                Instead of relying on manual processes, paperwork, and Excel sheets, Altroz HRMS
                automates repetitive activities, helping organizations save time, reduce errors,
                and improve operational efficiency.
              </p>
              <p className="mt-4 max-w-2xl text-ink-soft">
                By digitizing HR operations, businesses can provide a better employee experience
                while allowing HR professionals to focus on talent development and organizational
                growth.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={120} className="lg:col-span-6">
              <div className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Automation flow
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">
                  A simple workflow that removes repetitive HR handoffs
                </h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "Request capture",
                    "Validation rules",
                    "Manager approval",
                    "Auto-updated records",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                      <BadgeCheck className="mt-0.5 h-4 w-4 text-primary" />
                      <span className="text-sm leading-6 text-ink">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-dashed border-primary/25 bg-primary-soft/40 p-4 text-sm leading-6 text-ink-soft">
                  Use this layer to keep attendance, payroll, leave, employee records, and
                  approvals moving cleanly across teams.
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="bg-surface py-16 lg:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Why it matters"
              title="Why HR Automation Is Important"
              description="Managing HR operations manually can be time-consuming, inefficient, and prone to human error. As organizations grow, managing attendance, payroll, employee data, leave requests, approvals, and compliance becomes increasingly complex."
              center
            />
            <p className="mx-auto mt-4 max-w-3xl text-center text-ink-soft">
              Altroz HRMS simplifies these processes through centralized automation, helping HR
              teams work faster, improve accuracy, and make informed decisions using real-time
              workforce data.
            </p>

            <StaggerReveal step={60} className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {importanceCards.map((card) => (
                <IconCard
                  key={card.title}
                  title={card.title}
                  desc={card.desc}
                  icon={card.icon}
                  titleClassName="text-lg"
                />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Automation across every HR process"
              title="One Platform. Every HR Process, Automated."
              description="Altroz HRMS automates HR operations across every stage of the employee lifecycle."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {automationFeatures.map((feature) => (
                <IconCard
                  key={feature.title}
                  title={feature.title}
                  desc={feature.desc}
                  icon={feature.icon}
                  titleClassName="text-lg"
                />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="bg-surface py-16 lg:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="How HR automation works"
              title="From Employee Addition to HR Reports, in One Connected Flow"
              description="Here is how Altroz HRMS automates the HR process from start to finish."
              center
            />

            <StaggerReveal step={40} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {workflowSteps.map((item) => (
                <WorkflowStepCard key={item.step} {...item} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <ScrollReveal variant="fade-up" className="lg:col-span-5">
              <SectionHeading
                eyebrow="Dashboard"
                title="Manage Automated HR Activities from One Dashboard"
                description="Monitor important HR processes from one centralized dashboard. View workforce information, pending requests, attendance status, payroll progress, recruitment activities, employee records, and compliance updates."
              />
              <p className="mt-4 max-w-2xl text-ink-soft">
                Altroz HRMS gives HR teams a centralized platform to monitor day-to-day HR
                operations without switching between multiple files and tools.
              </p>

              <div className="mt-6 rounded-3xl border border-primary/20 bg-white p-6 shadow-float">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Export note
                </div>
                <p className="mt-2 text-lg font-semibold text-ink">
                  Generate detailed reports and export available data in Excel or PDF format.
                </p>
                <div className="mt-5 flex items-center gap-3 rounded-2xl bg-primary-soft/50 p-4 text-sm text-ink">
                  <Download className="h-5 w-5 text-primary" />
                  Keep automated records easy to review and share.
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={120} className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {dashboardCards.map((card) => (
                  <IconCard
                    key={card.title}
                    title={card.title}
                    desc={card.desc}
                    icon={card.icon}
                    className="p-4"
                    titleClassName="text-base"
                  />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="bg-surface py-16 lg:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Benefits"
              title="Benefits of HR Automation"
              description="Automation helps the team work faster while improving consistency across routine HR tasks."
              center
            />

            <StaggerReveal step={55} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {benefitCards.map((card) => (
                <IconCard
                  key={card.title}
                  title={card.title}
                  desc={card.desc}
                  icon={card.icon}
                  titleClassName="text-lg"
                />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <ScrollReveal variant="fade-up" className="lg:col-span-7">
              <SectionHeading
                eyebrow="Why Altroz"
                title="Why Choose Altroz HR Automation?"
                description="Built to simplify HR operations for growing businesses."
              />

              <div className="mt-6 space-y-4 text-sm leading-7 text-ink-soft">
                <p>
                  Altroz HRMS is designed to make HR automation genuinely usable for growing teams,
                  not just feature-heavy on paper. Here is what sets it apart.
                </p>
                <p>
                  A simple, intuitive interface means HR teams and employees can use the system
                  without a steep learning curve.
                </p>
                <p>
                  Employee management, attendance, leave, payroll, and more are managed from a
                  single, connected platform that keeps everyday operations organized.
                </p>
                <p>
                  Altroz HRMS is designed for straightforward setup, so businesses can start
                  automating HR operations quickly.
                </p>
                <p>
                  As your team grows, Altroz HRMS scales with you, without adding manual HR
                  workload.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={120} className="lg:col-span-5">
              <div className="soft-card h-full p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Practical advantages
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">
                  What businesses get from Altroz HR Automation
                </h3>
                <div className="mt-6 grid gap-3">
                  {whyChoosePoints.map((item) => (
                    <div key={item} className="soft-card flex items-start gap-3 p-4">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span className="text-sm leading-6 text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="faq" className="bg-surface py-16 lg:py-20 scroll-mt-24">
          <div className="container-x">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="Common questions about HR Automation and HRMS"
              description="Short answers to help teams understand how automation works across everyday HR operations."
              center
            />

            <div className="mx-auto mt-8 max-w-4xl">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item) => (
                  <FaqItemCard key={item.q} {...item} />
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x">
            <div className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">
                    Final CTA
                  </div>
                  <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                    Ready to Automate Your HR Operations?
                  </h2>
                  <p className="mt-3 max-w-2xl text-ink-soft">
                    See how Altroz HRMS can simplify your everyday HR work, from employee
                    management to payroll and exit, all from one centralized platform. Book a
                    free demo and see HR automation in action.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                  <a href={ROUTES.bookDemo} className="btn-primary">
                    Book Free Demo
                  </a>
                  <a href={ROUTES.contact} className="btn-outline">
                    Request Demo
                  </a>
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
