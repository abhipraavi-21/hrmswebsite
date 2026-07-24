import { useEffect } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
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
  UserRound,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import TopNavbar from "@/components/site/TopNavbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { modelScreenshots } from "@/lib/modelScreenshots";

type FeatureCard = {
  title: string;
  desc: string;
  icon: ReactNode;
  bullets: string[];
  image?: string;
  alt?: string;
};

type BenefitCard = {
  title: string;
  desc: string;
  icon: ReactNode;
};

type DashboardCard = {
  title: string;
  value: string;
  desc: string;
  icon: ReactNode;
};

const heroStats = [
  { label: "Automate", value: "HR tasks end to end" },
  { label: "Reduce", value: "manual follow-ups" },
  { label: "Improve", value: "workforce visibility" },
];

const importanceCards: BenefitCard[] = [
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
    title: "Attendance Automation",
    desc: "Automatically capture and manage employee attendance using connected attendance systems, mobile check-ins, web check-ins, or supported attendance methods.",
    icon: <Clock3 className="h-5 w-5" />,
    bullets: [
      "Real-time attendance tracking",
      "Shift management",
      "Late arrival monitoring",
      "Overtime calculation",
      "Attendance regularization workflows",
      "Automated attendance reports",
    ],
    image: modelScreenshots.attendanceDashboard,
    alt: "Attendance dashboard preview",
  },
  {
    title: "Payroll Automation",
    desc: "Process employee salaries accurately using automated payroll calculations, deductions, allowances, and statutory rules.",
    icon: <Wallet className="h-5 w-5" />,
    bullets: [
      "Automated salary calculation",
      "Tax and deduction management",
      "PF, ESIC, and TDS processing",
      "Payslip generation",
      "Monthly payroll reports",
      "Payroll summary and comparison",
    ],
    image: modelScreenshots.payrollDashboard,
    alt: "Payroll dashboard preview",
  },
  {
    title: "Leave Management Automation",
    desc: "Digitize the complete employee leave process from application and approval to leave balance calculation and reporting.",
    icon: <CalendarDays className="h-5 w-5" />,
    bullets: [
      "Online leave applications",
      "Multi-level approval workflow",
      "Automatic leave balance updates",
      "Holiday calendar",
      "Configurable leave policies",
      "Leave utilization reports",
    ],
    image: modelScreenshots.leaveDashboard,
    alt: "Leave management dashboard preview",
  },
  {
    title: "Employee Record Automation",
    desc: "Maintain centralized and secure digital employee records that are easy to access, update, and manage.",
    icon: <Users className="h-5 w-5" />,
    bullets: [
      "Employee profiles",
      "Document management",
      "Digital onboarding records",
      "Employment history",
      "Employee document storage",
      "Centralized employee database",
    ],
    image: modelScreenshots.coreHrTable,
    alt: "Employee record management preview",
  },
  {
    title: "Recruitment Workflow Automation",
    desc: "Simplify recruitment activities from candidate tracking and interview scheduling to selection and employee onboarding.",
    icon: <BriefcaseBusiness className="h-5 w-5" />,
    bullets: [
      "Candidate management",
      "Resume database",
      "Interview scheduling",
      "Candidate status tracking",
      "Offer process management",
      "Recruitment reports",
    ],
    image: modelScreenshots.employeeReport,
    alt: "Recruitment workflow preview",
  },
  {
    title: "Approval Workflow Automation",
    desc: "Reduce delays by creating structured approval processes for important employee and HR requests.",
    icon: <Workflow className="h-5 w-5" />,
    bullets: [
      "Leave requests",
      "Attendance regularization",
      "Expense claims",
      "Asset requests",
      "Employee onboarding",
      "HR document approvals",
    ],
  },
  {
    title: "Notification and Reminder Automation",
    desc: "Keep employees, managers, and HR teams informed with automated alerts, reminders, and status updates.",
    icon: <Bell className="h-5 w-5" />,
    bullets: [
      "Leave request updates",
      "Attendance reminders",
      "Payroll notifications",
      "Birthday reminders",
      "Work anniversary reminders",
      "Policy and announcement updates",
    ],
  },
  {
    title: "Compliance Automation",
    desc: "Reduce compliance risks by automating statutory calculations, report generation, and record maintenance.",
    icon: <FileCheck2 className="h-5 w-5" />,
    bullets: [
      "PF reports",
      "ESIC reports",
      "Professional Tax",
      "TDS management",
      "Statutory compliance tracking",
      "Audit-ready records",
    ],
  },
];

const workflowSteps = [
  "Employee submits a request or attendance record",
  "The system validates the information",
  "The request is sent to the appropriate manager",
  "The manager reviews and approves it",
  "Records and balances are updated automatically",
  "Employees and HR receive notifications",
  "Reports are updated in real time",
];

const dashboardCards: DashboardCard[] = [
  {
    title: "Attendance status",
    value: "Live",
    desc: "Track check-ins, shifts, and attendance flow.",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    title: "Payroll progress",
    value: "On track",
    desc: "Monitor monthly payroll preparation and review.",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    title: "Pending leave approvals",
    value: "12",
    desc: "See requests waiting on manager action.",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Recruitment pipeline",
    value: "Open",
    desc: "Review active candidates and interview stages.",
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
  {
    title: "Employee records",
    value: "Centralized",
    desc: "Keep profiles, documents, and history in one place.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Compliance status",
    value: "Ready",
    desc: "Stay organized with reports and audit records.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Pending requests",
    value: "08",
    desc: "Watch open tasks and approvals across teams.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Department overview",
    value: "All teams",
    desc: "Get a quick snapshot of workforce activity.",
    icon: <Globe className="h-5 w-5" />,
  },
];

const benefitCards: BenefitCard[] = [
  {
    title: "Save Time",
    desc: "Automate repetitive HR activities and reduce the administrative workload of the HR team.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Increase Productivity",
    desc: "Allow HR professionals to focus on employee engagement, workforce planning, and strategic initiatives.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Reduce Human Errors",
    desc: "Improve accuracy across attendance, payroll, leave, employee records, and approvals.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Faster Decision-Making",
    desc: "Access current HR data and reports to make informed business decisions quickly.",
    icon: <ArrowRight className="h-5 w-5" />,
  },
  {
    title: "Improve Employee Experience",
    desc: "Provide employees with faster approvals, clear notifications, and self-service access to HR information.",
    icon: <UserRound className="h-5 w-5" />,
  },
  {
    title: "Strengthen Compliance",
    desc: "Maintain accurate records and generate structured reports for statutory and internal compliance requirements.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

const selfServicePoints = [
  "View attendance records",
  "Apply for leave",
  "Check leave balances",
  "Download payslips",
  "View personal information",
  "Submit attendance correction requests",
  "Receive notifications",
  "Track request status",
];

const whyChoosePoints = [
  "End-to-End HR Process Automation",
  "Centralized Employee Management",
  "Automated Attendance and Payroll",
  "Configurable Approval Workflows",
  "Employee Self-Service Portal",
  "Real-Time Reports and Dashboards",
  "Secure Role-Based Access",
  "Mobile-Friendly Interface",
  "Scalable for Growing Businesses",
  "Simplified HR Operations",
];

const industries = [
  "Information Technology",
  "Manufacturing",
  "Healthcare",
  "Education",
  "Retail",
  "Hospitality",
  "Logistics",
  "Construction",
  "Banking and Finance",
  "Startups and SMEs",
];

const faqItems = [
  {
    q: "What is HR Automation?",
    a: "HR Automation uses software to automate repetitive HR activities such as attendance tracking, payroll processing, leave management, employee records, approvals, notifications, and reporting.",
  },
  {
    q: "Which HR processes can be automated?",
    a: "Altroz HRMS can help automate attendance, payroll, leave management, employee records, recruitment workflows, approvals, notifications, and HR reporting based on the modules enabled for the organization.",
  },
  {
    q: "Is HR Automation suitable for small businesses?",
    a: "Yes. HR Automation can help startups, small businesses, SMEs, and large organizations reduce manual work and improve HR efficiency.",
  },
  {
    q: "Can employees access HR services themselves?",
    a: "Employees can use available self-service features to view attendance, apply for leave, download payslips, check balances, and track requests.",
  },
  {
    q: "How does HR Automation reduce errors?",
    a: "Automation reduces repeated manual data entry and applies defined rules and workflows consistently across HR processes.",
  },
  {
    q: "Is employee data secure?",
    a: "Altroz HRMS should use the security and access-control features already implemented in the product. No unsupported security claims are added here.",
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
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <span className="text-xs font-bold uppercase tracking-wider text-primary">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
      <p className="mt-3 text-ink-soft">{description}</p>
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="soft-card p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-primary">{label}</div>
      <div className="mt-1 text-sm font-semibold text-ink">{value}</div>
    </div>
  );
}

function BenefitTile({ title, desc, icon }: BenefitCard) {
  return (
    <article className="soft-card p-6">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-ink-soft">{desc}</p>
    </article>
  );
}

function FeatureModuleCard({ feature }: { feature: FeatureCard }) {
  return (
    <article className="soft-card overflow-hidden p-0">
      <div className={`grid gap-0 ${feature.image ? "lg:grid-cols-12 lg:items-stretch" : ""}`}>
        <div
          className={`flex flex-col justify-center p-6 lg:p-7 ${feature.image ? "lg:col-span-7" : ""}`}
        >
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
            {feature.icon}
          </div>
          <h3 className="mt-4 text-2xl font-bold text-ink">{feature.title}</h3>
          <p className="mt-3 text-sm text-ink-soft">{feature.desc}</p>

          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {feature.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 rounded-xl bg-surface p-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span className="text-sm text-ink">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {feature.image ? (
          <div className="bg-surface p-3 lg:col-span-5 lg:flex lg:h-full lg:items-start lg:p-4">
            <div className="w-full overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-sm">
              <img
                src={feature.image}
                alt={feature.alt ?? feature.title}
                className="block h-auto w-full object-contain bg-white"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function HrAutomationPage() {
  usePageMeta(
    "HR Automation Software in Pune | Altroz HRMS",
    "Automate attendance, payroll, leave, employee records, approvals, recruitment, notifications, and HR reporting with Altroz HRMS HR Automation software.",
  );

  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x grid gap-10 py-12 lg:grid-cols-12 lg:items-center lg:py-16">
            <div className="lg:col-span-6 fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                HR Process Automation
              </span>
              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Automate HR Processes and Boost Workforce Efficiency
              </h1>
              <p className="mt-4 max-w-xl text-base text-ink-soft">
                Simplify your daily HR operations with Altroz HRMS HR Automation. Automate
                attendance tracking, payroll processing, leave management, employee records,
                recruitment workflows, approvals, notifications, and compliance from one centralized
                platform.
              </p>
              <p className="mt-4 max-w-xl text-base text-ink-soft">
                Reduce manual work, eliminate repetitive tasks, and empower your HR team to focus on
                employee engagement, workforce development, and business growth.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/company/book-demo" className="btn-primary">
                  Book Free Demo
                </a>
                <a href="/company/contact-us" className="btn-outline">
                  Talk to an Expert
                </a>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {heroStats.map((item) => (
                  <StatPill key={item.label} label={item.label} value={item.value} />
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-2xl">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
                <div className="relative grid gap-4 rounded-[2rem] border border-border bg-white p-5 shadow-float">
                  <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface">
                    <img
                      src={modelScreenshots.workforceDashboard}
                      alt="HR automation dashboard preview"
                      className="block h-auto w-full object-contain bg-white"
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
                      <p className="mt-3 text-sm text-ink-soft">
                        Manage requests, approvals, alerts, and updates from a single workflow.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#ecfdf3] p-5">
                      <div className="flex items-center gap-2 text-sm font-semibold text-success">
                        <Download className="h-4 w-4" />
                        Reporting ready
                      </div>
                      <p className="mt-3 text-sm text-ink-soft">
                        Keep reports organized for reviews and exports in Excel or PDF.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Automation basics"
                title="What is HR Automation?"
                description="HR Automation is the process of using software to streamline and automate routine HR tasks such as attendance tracking, payroll processing, leave approvals, employee record management, recruitment workflows, notifications, and HR reporting."
              />
              <p className="mt-4 max-w-2xl text-ink-soft">
                Instead of relying on manual processes, paperwork, and Excel sheets, Altroz HRMS
                automates repetitive activities, helping organizations save time, reduce errors, and
                improve operational efficiency.
              </p>
              <p className="mt-4 max-w-2xl text-ink-soft">
                By digitizing HR operations, businesses can provide a better employee experience
                while allowing HR professionals to focus on talent development and organizational
                growth.
              </p>
            </div>

            <div className="lg:col-span-6">
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
                      <span className="text-sm text-ink">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-dashed border-primary/25 bg-primary-soft/40 p-4 text-sm text-ink-soft">
                  Use this layer to keep attendance, payroll, leave, employee records, and approvals
                  moving cleanly across teams.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Why it matters"
              title="Why HR Automation Is Important"
              description="Managing HR operations manually can be time-consuming, inefficient, and prone to human error. As organizations grow, managing attendance, payroll, employee data, leave requests, approvals, and compliance becomes increasingly complex."
            />
            <p className="mt-4 max-w-3xl text-ink-soft">
              Altroz HRMS simplifies these processes through centralized automation, helping HR
              teams work faster, improve accuracy, and make informed decisions using real-time
              workforce data.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {importanceCards.map((card) => (
                <BenefitTile key={card.title} {...card} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Feature set"
              title="Key HR Automation Features"
              description="Create responsive feature cards for the modules that carry the day-to-day HR workload."
            />

            <div className="mt-10 grid gap-5 xl:grid-cols-2">
              {automationFeatures.map((feature) => (
                <FeatureModuleCard key={feature.title} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Workflow"
              title="Simplify the Complete HR Workflow"
              description="Show how Altroz HRMS automates HR activities from request submission to reporting."
            />

            <div className="mt-10 hidden md:block">
              <ol className="grid gap-4 md:grid-cols-7">
                {workflowSteps.map((step, index) => (
                  <li key={step} className="relative">
                    {index < workflowSteps.length - 1 ? (
                      <div className="absolute left-[calc(50%+2rem)] top-7 hidden h-0.5 w-[calc(100%-4rem)] bg-primary/20 md:block" />
                    ) : null}
                    <div className="soft-card relative h-full p-4 text-center">
                      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-base font-bold text-white">
                        {index + 1}
                      </div>
                      <p className="mt-3 text-sm font-medium text-ink">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-10 grid gap-4 md:hidden">
              {workflowSteps.map((step, index) => (
                <div key={step} className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="soft-card flex-1 p-4">
                    <p className="text-sm font-medium text-ink">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Dashboard"
                title="Manage Automated HR Activities from One Dashboard"
                description="Monitor important HR processes from one centralized dashboard. View workforce information, pending requests, attendance status, payroll progress, recruitment activities, employee records, and compliance updates."
              />
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
            </div>

            <div className="lg:col-span-7">
              <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {dashboardCards.map((card) => (
                  <article
                    key={card.title}
                    className="flex h-full min-h-[12.5rem] flex-col rounded-2xl border border-border bg-white p-5 shadow-card"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                        {card.icon}
                      </div>
                      <div className="text-right text-xl font-bold leading-none text-ink">
                        {card.value}
                      </div>
                    </div>
                    <div className="mt-5 flex flex-1 flex-col">
                      <h3 className="text-base font-semibold text-ink">{card.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{card.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Benefits"
              title="Benefits of HR Automation"
              description="Automation helps the team work faster while improving consistency across routine HR tasks."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {benefitCards.map((card) => (
                <BenefitTile key={card.title} {...card} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Employee self-service"
                title="Empower Employees with Self-Service"
                description="Allow employees to access important HR services without depending on the HR team for every request."
              />

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {selfServicePoints.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[2rem] border border-border bg-white p-5 shadow-float">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface">
                    <img
                      src={modelScreenshots.coreHrTable}
                      alt="Employee self-service dashboard preview"
                      className="h-full w-full object-contain bg-white"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="rounded-[1.5rem] bg-primary-soft/30 p-5">
                    <div className="text-xs font-bold uppercase tracking-wider text-primary">
                      Self-service portal
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-ink">
                      Keep routine employee requests moving without manual intervention
                    </h3>
                    <div className="mt-5 space-y-3">
                      {[
                        "Attendance updates",
                        "Leave requests",
                        "Payslip access",
                        "Profile details",
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-3 rounded-xl bg-white p-3">
                          <BadgeCheck className="h-4 w-4 text-primary" />
                          <span className="text-sm text-ink">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Why Altroz"
                title="Why Choose Altroz HRMS for HR Automation?"
                description="Use smart automation and connected workflows to keep everyday HR processes simple and consistent."
              />

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {whyChoosePoints.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border bg-white p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm font-medium text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Smart automation
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">
                  Built for growing teams that need cleaner HR operations
                </h3>
                <p className="mt-3 text-sm text-ink-soft">
                  The page stays focused on practical workflow automation, employee service, and
                  reporting rather than unsupported technical claims.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "Centralized employee management",
                    "Configurable approval workflows",
                    "Real-time reports and dashboards",
                    "Mobile-friendly interface",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-xl bg-surface p-3">
                      <Workflow className="h-4 w-4 text-primary" />
                      <span className="text-sm text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Industries"
              title="HR Automation for Every Industry"
              description="Altroz HRMS supports organizations across different industries by simplifying workforce management and daily HR operations."
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
              {industries.map((industry) => (
                <div
                  key={industry}
                  className="soft-card flex items-center justify-between gap-3 px-4 py-4"
                >
                  <div className="text-sm font-semibold text-ink">{industry}</div>
                  <Globe className="h-4 w-4 text-primary" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20" id="faq">
          <div className="container-x grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Questions"
                title="Frequently Asked Questions"
                description="An accessible accordion keeps answers easy to scan, expand, and revisit."
              />
            </div>

            <div className="lg:col-span-7">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item) => (
                  <AccordionItem
                    key={item.q}
                    value={item.q}
                    className="rounded-2xl border border-border bg-white px-4"
                  >
                    <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink no-underline hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-sm leading-6 text-ink-soft">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">
                    Final step
                  </div>
                  <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                    Automate Your HR Operations with Altroz HRMS
                  </h2>
                  <p className="mt-3 max-w-2xl text-ink-soft">
                    Transform the way you manage your workforce with efficient HR Automation. Reduce
                    manual work, improve accuracy, simplify employee services, and empower your HR
                    team with one centralized platform.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                  <a href="/company/book-demo" className="btn-primary">
                    Book Your Free Demo Today
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
