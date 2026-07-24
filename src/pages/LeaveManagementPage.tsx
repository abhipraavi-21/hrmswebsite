import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileSpreadsheet,
  FileText,
  Globe,
  Repeat2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";
import TopNavbar from "@/components/site/TopNavbar";
import MainNavbar from "@/components/site/MainNavbar";
import Footer from "@/components/site/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ROUTES } from "@/routes/routeConfig.js";

const pageContainerClass = "mx-auto w-[min(1360px,calc(100%-24px))]";

const heroHighlights = [
  {
    title: "Built for Indian Payroll & Compliance",
    desc: "Leave rules, financial year cycles and statutory leave types configured the way Indian businesses actually work.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Real-Time Leave Balances",
    desc: "Every approval instantly updates leave balances, so there is no year-end reconciliation surprise.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Works on Web & Mobile",
    desc: "Employees and managers can apply, approve and track leave from the office, factory floor or field.",
    icon: <Smartphone className="h-5 w-5" />,
  },
];

const painPoints = [
  {
    title: "Approval Delays",
    desc: "Requests sit pending when a manager is travelling or away from the desk.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Leave Balance Confusion",
    desc: "Employees apply without knowing the exact balance left in their account.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Payroll Errors",
    desc: "Leave that is not recorded correctly turns into salary corrections later.",
    icon: <FileSpreadsheet className="h-5 w-5" />,
  },
  {
    title: "Policy Compliance",
    desc: "Carry forward, encashment and entitlements get applied inconsistently.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Employee Dissatisfaction",
    desc: "Missing approvals and unclear balances create avoidable friction.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Fragmented Records",
    desc: "There is no single source of truth for audits, appraisals, or compliance reviews.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
];

const businessBenefits = [
  {
    title: "Save time",
    desc: "Automate leave flow so HR teams spend less time chasing approvals and balance updates.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Create consistency",
    desc: "Apply a uniform leave policy across teams while still allowing role-specific rules.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Keep accounting clean",
    desc: "Make leave accounting and payroll inputs more reliable with fewer manual corrections.",
    icon: <FileSpreadsheet className="h-5 w-5" />,
  },
  {
    title: "Improve experience",
    desc: "Let employees view balances, apply quickly, and track requests on their own.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Support compliance",
    desc: "Keep holiday lists and leave records organized for better governance and reporting.",
    icon: <Globe className="h-5 w-5" />,
  },
  {
    title: "Visibility for managers",
    desc: "Give leaders a better view of leave patterns, exceptions, and team availability.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
];

const coreFeatures = [
  {
    title: "Leave Types",
    desc: "Configure unlimited leave types for casual, sick, earned, comp-off, maternity, paternity, bereavement and custom policies.",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Leave Policies",
    desc: "Set eligibility, accrual, carry forward and encashment rules for each leave type and employee group.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Leave Approval Workflow",
    desc: "Build single-level or multi-level approval chains so requests move from employee to manager to HR.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Leave Balance Tracking",
    desc: "Update balances the moment a request is approved so everyone sees the same accurate number.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Holiday Calendar",
    desc: "Maintain company-wide or location-wise holiday calendars so requests automatically account for holidays.",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Comp-Off Management",
    desc: "Track compensatory offs earned for weekends, holidays or extra hours with expiry rules.",
    icon: <Repeat2 className="h-5 w-5" />,
  },
  {
    title: "Leave Encashment",
    desc: "Calculate unused earned leave encashment at year-end, resignation or on request.",
    icon: <FileSpreadsheet className="h-5 w-5" />,
  },
  {
    title: "Carry Forward",
    desc: "Automatically carry forward eligible unused leave into the next cycle with your policy cap.",
    icon: <ArrowRight className="h-5 w-5" />,
  },
  {
    title: "Half-Day Leave",
    desc: "Allow first-half and second-half requests with balance deductions in half-day units.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Sandwich Leave",
    desc: "Apply sandwich leave rules so holidays and weekends are counted according to company policy.",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Shift-wise & Branch-wise Rules",
    desc: "Support different leave policies, approval paths and holiday calendars for shifts and locations.",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "Role-based Permissions",
    desc: "Control exactly what employees, managers, HR and admins can view, edit or approve.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

const operationsCards = [
  {
    title: "Leave Notifications",
    desc: "Automated alerts keep everyone updated when requests are raised, approved, rejected or adjusted.",
    icon: <Bell className="h-5 w-5" />,
  },
  {
    title: "Leave Reports",
    desc: "Generate leave reports by employee, department or date range in a few clicks.",
    icon: <FileSpreadsheet className="h-5 w-5" />,
  },
  {
    title: "Audit Logs",
    desc: "Every leave action is time-stamped and logged for a complete, tamper-proof trail.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Employee Self Service",
    desc: "Employees apply for leave, check balances and view history without raising a ticket with HR.",
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    title: "Manager Dashboard",
    desc: "Managers see team leave requests, upcoming absences and approval history in one place.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "HR Dashboard",
    desc: "HR gets a company-wide view of leave trends, pending approvals and exceptions across branches.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
];

const workflowSteps = [
  "Employee Request",
  "Manager Approval",
  "HR Verification",
  "Leave Balance Update",
  "Calendar Update",
  "Notifications",
  "Reports",
  "Payroll Sync",
];

const essPoints = [
  "Employees apply for leave from web or mobile",
  "Leave tracker shows balances and transactions",
  "Manager view shows team leave patterns",
  "Workflow escalations keep the system responsive",
  "Email alerts and notifications keep everyone informed",
];

const leaveTypes = [
  "Casual Leave",
  "Sick Leave",
  "Earned Leave",
  "Comp Off",
  "Maternity Leave",
  "Paternity Leave",
  "Bereavement Leave",
  "Custom Leave Types",
];

const reportCards = [
  {
    title: "Employee Reports",
    desc: "A complete leave summary for any individual employee, useful for appraisals and reviews.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Department Reports",
    desc: "Compare leave patterns across departments to spot teams that may be understaffed.",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "Leave Trends",
    desc: "Identify seasonal spikes, frequent short-notice leave or repeat patterns worth reviewing.",
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    title: "Monthly Reports",
    desc: "Generate a ready-to-review monthly summary for management meetings.",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Leave Balance Reports",
    desc: "See leave balances across the company for planning and encashment calculations.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Audit Reports",
    desc: "Review a full audit trail of every leave action for internal or statutory checks.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Compliance Reports",
    desc: "Map reports to statutory leave requirements to demonstrate policy compliance when needed.",
    icon: <Globe className="h-5 w-5" />,
  },
  {
    title: "Custom Reports",
    desc: "Filter reports by leave type, date range, department or branch based on your needs.",
    icon: <FileSpreadsheet className="h-5 w-5" />,
  },
];

const industryCards = [
  {
    title: "Manufacturing",
    desc: "Shift-wise leave rules and comp-off tracking for rotating factory schedules.",
  },
  {
    title: "IT Companies",
    desc: "Clear visibility into who is available for sprint and resource planning.",
  },
  {
    title: "Healthcare",
    desc: "Real-time leave visibility helps maintain safe 24x7 shift coverage.",
  },
  {
    title: "Education",
    desc: "Configure academic calendars and term-based holidays easily.",
  },
  {
    title: "Construction",
    desc: "Field and site staff can apply for leave from mobile.",
  },
  {
    title: "Retail",
    desc: "Multi-branch policies help managers plan staffing around footfall.",
  },
  {
    title: "Logistics",
    desc: "Leave visibility across depots and branches improves route planning.",
  },
  {
    title: "Hospitality",
    desc: "Shift-based and branch-wise rules suit round-the-clock operations.",
  },
  {
    title: "Professional Services",
    desc: "Client-facing teams can plan coverage around project handovers.",
  },
  {
    title: "Startups",
    desc: "A lightweight leave system that scales as headcount grows.",
  },
];

const faqItems = [
  {
    question: "What is leave management software?",
    answer:
      "Leave management software is an online system that helps businesses manage employee leave requests, approvals, balances and policies in one place. It replaces manual registers and spreadsheets with a digital leave management system where employees apply for leave, managers approve it, and HR tracks balances and compliance automatically.",
  },
  {
    question: "How does an online leave management system work?",
    answer:
      "Employees submit leave requests through a web portal or mobile app. The request is routed to the manager for approval, and once approved, the system updates the employee's leave balance, reflects the leave on the holiday calendar, and syncs the data with payroll.",
  },
  {
    question: "What is a leave approval workflow?",
    answer:
      "A leave approval workflow is the sequence a leave request follows from submission to final approval. In Altroz HR, this typically moves from employee request to manager approval, HR verification, and then automatic leave balance and payroll updates.",
  },
  {
    question: "Can employees track their leave balance in real time?",
    answer:
      "Yes. Leave balances update automatically the moment a request is approved. Employees can log into the ESS leave portal or mobile app to check their exact available balance by leave type at any time.",
  },
  {
    question: "Does the software support different leave types like sick leave and earned leave?",
    answer:
      "Yes. Altroz HR supports common leave types including casual leave, sick leave, earned leave, comp-off, maternity leave, paternity leave and bereavement leave, along with custom leave categories your company needs.",
  },
  {
    question: "Can leave policies differ by department or branch?",
    answer:
      "Yes. Altroz HR allows department-wise and branch-wise leave policy management, so different teams or locations can follow their own rules, approval hierarchies and holiday calendars.",
  },
  {
    question: "How does leave management software help with payroll accuracy?",
    answer:
      "Leave management software reduces payroll errors by syncing approved leave data directly with payroll. Every approved leave request updates the employee record instantly, so salary processing reflects accurate leave data.",
  },
  {
    question: "Is there a mobile app for applying and approving leave?",
    answer:
      "Yes. Altroz HR includes a mobile experience alongside the web portal, so employees can apply for leave and managers can approve requests from anywhere.",
  },
];

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

function TileCard({
  title,
  desc,
  icon,
  compact = false,
}: {
  title: string;
  desc: string;
  icon: ReactNode;
  compact?: boolean;
}) {
  return (
    <article className={`soft-card h-full ${compact ? "p-4" : "p-6"}`}>
      <div className={`grid ${compact ? "h-10 w-10" : "h-11 w-11"} place-items-center rounded-xl bg-primary-soft text-primary`}>
        {icon}
      </div>
      <h3 className={`mt-4 font-bold text-ink ${compact ? "text-base" : "text-lg"}`}>{title}</h3>
      <p className={`mt-2 text-sm leading-6 text-ink-soft ${compact ? "text-[0.92rem]" : ""}`}>{desc}</p>
    </article>
  );
}

export default function LeaveManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden !pt-0 !pb-10">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className={`${pageContainerClass} py-6 lg:py-8`}>
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  Leave Management System
                </span>
                <h1 className="mt-4 text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
                  Leave management that makes leave simple, fair and fast
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
                  Altroz HR gives your team an online leave management system that replaces
                  registers, Excel sheets and endless follow-up emails with one clean dashboard.
                  Employees apply for leave in a few taps, managers approve on the go, and HR
                  always has accurate, real-time leave balances.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to={ROUTES.bookDemo} className="btn-primary">
                    Book Free Demo
                  </Link>
                  <a href="#workflow" className="btn-outline">
                    View leave workflow
                  </a>
                </div>
              </div>

              <div className="soft-card p-6 md:p-7">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  At a glance
                </div>
                <h2 className="mt-2 text-2xl font-bold text-ink">
                  One flow for leave, approvals, balances and payroll
                </h2>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  Every leave action lives inside a single auditable system so HR, managers and
                  employees stay aligned without manual follow-up.
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    "Employees apply from web or mobile",
                    "Managers approve from anywhere",
                    "Balances update in real time",
                    "Approved leave syncs with payroll",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                      <span className="text-sm text-ink">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl bg-primary/5 p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">
                    No more
                  </div>
                  <p className="mt-2 text-sm text-ink-soft">
                    Registers, spreadsheets, WhatsApp messages and month-end payroll rework.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {heroHighlights.map((item) => (
                <TileCard key={item.title} {...item} compact />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className={pageContainerClass}>
            <SectionHeading
              eyebrow="What it is"
              title="Leave management software keeps requests, balances and policies in one place"
              description="Instead of paper registers, WhatsApp messages or scattered spreadsheets, every leave request, approval and balance update happens inside a single auditable system."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-12">
              <div className="soft-card p-6 lg:col-span-5">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Why businesses need it
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">
                  Manual leave tracking is where small errors turn into monthly rework
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  As a company grows beyond a handful of employees, leave management stops being a
                  simple admin task and becomes a real operational risk. Automation keeps the
                  process consistent, visible and easy to audit.
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    "One accurate source of leave data for HR, managers and employees",
                    "Faster approvals even when managers are travelling or remote",
                    "Fewer payroll errors caused by leave that was taken but never recorded",
                    "Clear audit trail for internal and statutory compliance checks",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                      <span className="text-sm text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {painPoints.map((item) => (
                    <TileCard key={item.title} {...item} compact />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {businessBenefits.map((item) => (
                <TileCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-16">
          <div className={pageContainerClass}>
            <SectionHeading
              eyebrow="Core features"
              title="The controls your leave policy actually needs"
              description="Altroz HR handles the way leave works in Indian businesses, with multiple leave types, department-specific rules, shift patterns and everything in between."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {coreFeatures.map((item) => (
                <TileCard key={item.title} {...item} />
              ))}
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {operationsCards.map((item) => (
                <TileCard key={item.title} {...item} compact />
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="py-16">
          <div className={pageContainerClass}>
            <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <SectionHeading
                  eyebrow="Workflow and self service"
                  title="Every request follows a clean approval flow"
                  description="The leave approval process stays visible from the moment an employee submits a request until the data lands in payroll."
                />

                <div className="mt-6 rounded-3xl border border-border bg-white p-6 shadow-card">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">
                    Employee self service
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-ink">
                    Give employees a self-service leave experience that reduces questions
                  </h3>
                  <div className="mt-4 space-y-3">
                    {essPoints.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-xl bg-surface px-4 py-3"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                        <span className="text-sm text-ink">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {workflowSteps.map((step, index) => (
                    <div key={step} className="soft-card p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary">
                          {index + 1}
                        </div>
                        <ArrowRight className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="mt-4 text-base font-bold text-ink">{step}</h3>
                      <p className="mt-2 text-sm text-ink-soft">
                        {step === "Employee Request" &&
                          "The employee selects leave type, dates and reason from the web or mobile app."}
                        {step === "Manager Approval" &&
                          "The reporting manager receives an instant notification and approves or rejects the request."}
                        {step === "HR Verification" &&
                          "HR reviews the approved request against policy where special eligibility rules apply."}
                        {step === "Leave Balance Update" &&
                          "The employee's leave balance updates automatically with no manual entry required."}
                        {step === "Calendar Update" &&
                          "The approved leave appears on the team and holiday calendar for planning."}
                        {step === "Notifications" &&
                          "The employee, manager and HR all get notified the moment the status changes."}
                        {step === "Reports" &&
                          "The request becomes part of leave reports available to HR and management instantly."}
                        {step === "Payroll Sync" &&
                          "Approved leave syncs with payroll so salary processing reflects the correct data."}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16">
          <div className={pageContainerClass}>
            <SectionHeading
              eyebrow="Leave types"
              title="The leave policies Indian businesses use most"
              description="Altroz HR comes with the common leave types your organisation needs and lets you add custom rules on top."
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {leaveTypes.map((item) => (
                <div key={item} className="soft-card p-4">
                  <div className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm font-medium text-ink">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className={pageContainerClass}>
            <SectionHeading
              eyebrow="Reports and analytics"
              title="Leave data only helps when you can see it clearly"
              description="Altroz HR turns raw leave records into reports HR and management can actually act on."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {reportCards.map((item) => (
                <TileCard key={item.title} {...item} compact />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-16">
          <div className={pageContainerClass}>
            <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <SectionHeading
                  eyebrow="Business fit"
                  title="Leave management software for every kind of team"
                  description="Leave patterns look different across industries, so the system needs to adapt to how each business actually works."
                />
              </div>
              <div className="lg:col-span-7">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                  {industryCards.map((item) => (
                    <article key={item.title} className="soft-card h-full p-4">
                      <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft text-primary">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <h3 className="mt-3 text-sm font-bold text-ink">{item.title}</h3>
                      <p className="mt-2 text-xs leading-5 text-ink-soft">{item.desc}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className={pageContainerClass}>
            <SectionHeading
              eyebrow="Frequently asked questions"
              title="Common leave management questions, answered clearly"
              description="A few quick answers to help your team understand how the leave workflow works."
            />

            <div className="mt-10">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={item.question}
                    value={`faq-${index}`}
                    className="rounded-2xl border border-border bg-white px-4 shadow-card"
                  >
                    <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-sm leading-6 text-ink-soft">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="mt-10 soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">
                    Ready to explore
                  </div>
                  <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                    Put a cleaner leave process under your HR operations
                  </h2>
                  <p className="mt-3 max-w-2xl text-ink-soft">
                    This page keeps the reference page's product story and turns it into a clear,
                    structured implementation for your app.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                  <a href="#workflow" className="btn-outline">
                    Review workflow
                  </a>
                  <Link to={ROUTES.contact} className="btn-primary">
                    Contact sales
                  </Link>
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
