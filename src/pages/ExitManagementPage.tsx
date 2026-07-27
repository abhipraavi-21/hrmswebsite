import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  LogOut,
  PackageCheck,
  Printer,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ROUTES } from "@/routes/routeConfig.js";
import { modelScreenshots } from "@/lib/modelScreenshots";

const heroMetrics = [
  { label: "Record type", value: "Resignations + terminations" },
  { label: "Tracking", value: "Notice period and LWD" },
  { label: "Control", value: "Search, filters, print" },
];

const heroHighlights = [
  "Record employee resignations in one structured flow",
  "Track notice periods and last working days clearly",
  "Keep exit records searchable, filterable and printable",
  "Maintain one place for resignation and termination details",
];

const manualPainPoints = [
  {
    title: "Inconsistent records",
    desc: "Different people note resignation details in different formats, which makes exits hard to compare.",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Slow notice tracking",
    desc: "Without a central record, HR has to monitor each last working day separately and manually.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Separate exit handling",
    desc: "Termination cases often end up in a different process, which creates confusion and extra work.",
    icon: <LogOut className="h-5 w-5" />,
  },
  {
    title: "Hard-to-find archives",
    desc: "Old exit records are difficult to search or filter when teams need a quick reference later.",
    icon: <Search className="h-5 w-5" />,
  },
];

const featureCards = [
  {
    title: "Employee Resignation",
    summary: "Start the exit process by creating a new resignation record for the employee.",
    how: "HR opens the New Resignation record, selects the employee, and enters the relevant resignation details.",
    benefit:
      "Every resignation is recorded in a structured, consistent format from day one instead of being tracked informally.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Resignation Date",
    summary: "Capture the exact date the employee submitted the resignation.",
    how: "HR enters the resignation date while creating the resignation record.",
    benefit:
      "A clear, recorded resignation date removes confusion and gives HR an accurate starting point for the exit process.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Last Working Day",
    summary: "Keep the end of notice period visible and current.",
    how: "HR enters or updates the last working day as the notice period is confirmed or changes.",
    benefit:
      "Teams always know exactly when an employee's exit will be effective, helping with planning and handovers.",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Employee Selection",
    summary: "Link every exit record to the correct employee.",
    how: "HR selects the employee from the existing employee list when creating a resignation or termination record.",
    benefit:
      "Every exit record stays connected to the correct employee, avoiding mismatched or duplicate entries.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Branch",
    summary: "Record the branch or location the employee belongs to.",
    how: "Branch details are captured as part of the resignation or exit record.",
    benefit:
      "Businesses with multiple locations can identify which branch an exit belongs to at a glance.",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "Department",
    summary: "Track the department tied to each resignation or termination.",
    how: "Department is captured within the resignation or exit record and can also be used as a filter.",
    benefit:
      "HR can quickly see how many exits are happening in a particular department and review exits department-wise.",
    icon: <PackageCheck className="h-5 w-5" />,
  },
  {
    title: "Description",
    summary: "Add notes and context to the exit record itself.",
    how: "HR types in the description while creating or updating the resignation record.",
    benefit:
      "Important context stays attached to the record instead of being stored separately in another file.",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Status",
    summary: "Show the current stage of an employee's exit.",
    how: "Status is set and updated on the resignation record and can be used to filter records.",
    benefit:
      "HR can quickly identify which exits are pending, in progress, or completed by checking the status.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Termination",
    summary: "Manage resignation and termination inside the same system.",
    how: "HR creates an Employee Termination record with the relevant details for that employee.",
    benefit:
      "Termination cases are documented in the same system as resignations, keeping all exit types organised together.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Supervisor, Details, Search, Filters and Print",
    summary: "Support the full record lifecycle from review to output.",
    how: "Supervisor details, termination details, search, filters and print options are used to manage and review exit records.",
    benefit:
      "HR gets one place to find, narrow down, and print exit records without digging through long lists or paper files.",
    icon: <Printer className="h-5 w-5" />,
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Employee submits resignation",
    desc: "The process begins when an employee decides to resign from the organisation.",
  },
  {
    step: "02",
    title: "HR records resignation",
    desc: "HR creates a New Resignation record and captures the employee, resignation date, branch, department and description.",
  },
  {
    step: "03",
    title: "Notice period is tracked",
    desc: "Once the resignation is recorded, HR tracks the notice period against the recorded resignation date.",
  },
  {
    step: "04",
    title: "Last working day is managed",
    desc: "HR updates the Last Working Day field as the notice period progresses or is finalised.",
  },
  {
    step: "05",
    title: "Termination details are added if needed",
    desc: "For cases involving termination, HR records the Employee Termination details, including supervisor and termination details.",
  },
  {
    step: "06",
    title: "Exit record is completed",
    desc: "The resignation or termination information comes together as a completed Employee Exit Record that HR can search, filter and print.",
  },
];

const benefits = [
  {
    title: "Centralised Exit Records",
    desc: "All resignation and termination records are kept in one system, giving HR a single organised place to manage exits.",
  },
  {
    title: "Simplified Resignation Process",
    desc: "Recording a resignation with employee, date and department details takes just a few steps.",
  },
  {
    title: "Notice Period Tracking",
    desc: "Resignation Date and Last Working Day fields let HR keep clear track of every employee's notice period.",
  },
  {
    title: "Better Employee Record Management",
    desc: "Branch, Department, Description and Status fields keep every exit record complete and well organised.",
  },
  {
    title: "Reduced Manual Work",
    desc: "Search and Filters make it easy to find and review exit records without wasting time searching through files.",
  },
  {
    title: "Improved HR Efficiency",
    desc: "HR spends less time managing records and more time supporting employees when exits live in one system.",
  },
];

const industries = [
  {
    title: "Manufacturing",
    desc: "Track resignations and terminations by branch and department across multiple locations.",
  },
  {
    title: "IT Companies",
    desc: "Record resignation dates and keep last working days updated as projects are handed over.",
  },
  {
    title: "Healthcare",
    desc: "Maintain accurate exit records for staff across departments with filters for easier review.",
  },
  {
    title: "Education",
    desc: "Keep staff resignations organised by department and branch across the academic year.",
  },
  {
    title: "Retail",
    desc: "Track which branch and department each resignation belongs to in a multi-location environment.",
  },
  {
    title: "Construction",
    desc: "Record terminations with supervisor and termination details for site-based teams.",
  },
  {
    title: "Hospitality",
    desc: "Use Search and Filters to quickly review resignation and exit status as staff changes happen.",
  },
  {
    title: "Professional Services",
    desc: "Maintain a searchable and printable record of every employee exit for internal reference.",
  },
];

const faqs = [
  {
    q: "What is Exit Management Software?",
    a: "It is a system used by HR teams to record and track employee resignations and terminations, including resignation dates, last working days and exit records.",
  },
  {
    q: "How do I record an employee resignation in Altroz HR?",
    a: "HR can create a New Resignation record by selecting the employee and entering the resignation date, last working day, branch, department and description.",
  },
  {
    q: "Can I track an employee's last working day?",
    a: "Yes. The Last Working Day field in Altroz HR lets HR record and update the date on which an employee's notice period ends.",
  },
  {
    q: "Does Altroz HR support employee termination records?",
    a: "Yes. Altroz HR includes an Employee Termination feature where HR can record supervisor details and termination details for terminated employees.",
  },
  {
    q: "Can I filter exit records by department or status?",
    a: "Yes. Altroz HR provides filters for Resignation Date, Effective Date, Department and Status, so HR can view records by these criteria.",
  },
  {
    q: "Can I search for a specific exit record?",
    a: "Yes. The Search function allows HR to quickly find a specific resignation or termination record.",
  },
  {
    q: "Can exit records be printed?",
    a: "Yes. Altroz HR includes a Print option so HR can print resignation, termination or exit records when required.",
  },
  {
    q: "Does Altroz HR track resignations by branch?",
    a: "Yes. Every resignation record includes a Branch field, so exits can be identified by location.",
  },
  {
    q: "Is this suitable for businesses with multiple departments?",
    a: "Yes. Department is a core field in every resignation and exit record, and it can also be used as a filter to review exits by department.",
  },
  {
    q: "Who can use Altroz HR Exit Management Software?",
    a: "It is suitable for HR managers, HR teams and admin teams across industries such as manufacturing, IT, healthcare, education, retail, construction, hospitality and professional services.",
  },
];

function FeatureIcon({ icon }: { icon: ReactNode }) {
  return (
    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
      {icon}
    </div>
  );
}

export default function ExitManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Exit Management Software for Employee Resignation & Termination Tracking | Altroz HR"
        description="Altroz HR Exit Management Software helps HR teams record employee resignations, track notice periods and last working days, and maintain searchable exit records. Book a free demo."
        canonicalPath={ROUTES.exitManagement}
      />
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden scroll-mt-24 !pt-0 !pb-6">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x grid gap-10 py-0 pt-1 lg:grid-cols-12 lg:items-start lg:py-0 lg:pt-2">
            <ScrollReveal variant="fade-up" className="lg:col-span-6 self-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Employee Exit Management
              </span>

              <h1 className="mt-4 max-w-xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Exit Management Software for simplified employee resignation, notice period and
                exit record tracking
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-ink-soft sm:text-lg">
                Altroz HR Exit Management Software helps HR teams record employee resignations,
                track notice periods and last working days, and maintain a clean, searchable
                record of every employee exit. It replaces scattered spreadsheets and paper files
                with one organised place to manage resignation and termination details.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href={ROUTES.bookDemo} className="btn-primary">
                  Book a Free Demo
                </a>
                <a href={ROUTES.hrmsHome} className="btn-outline">
                  Explore Altroz HR
                </a>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {heroMetrics.map((item) => (
                  <div key={item.label} className="soft-card h-full p-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                      {item.label}
                    </div>
                    <div className="mt-2 text-sm font-semibold leading-6 text-ink">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 max-w-xl rounded-[1.5rem] border border-border bg-white/80 p-5 shadow-card backdrop-blur-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  What this page covers
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {heroHighlights.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-3.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                      <span className="text-sm leading-6 text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={100} className="lg:col-span-6 self-start">
              <div className="relative mx-auto max-w-2xl">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-5 shadow-float">
                  <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface">
                    <img
                      src={modelScreenshots.resignations}
                      alt="Altroz HR exit management dashboard preview"
                      className="block h-auto w-full bg-white object-contain"
                      loading="eager"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[
                      { label: "Resignation", value: "Structured from day one" },
                      { label: "Notice period", value: "Last working day visible" },
                      { label: "Exit record", value: "Search, filter, print" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl bg-surface p-4">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                          {item.label}
                        </div>
                        <div className="mt-1.5 text-sm font-semibold leading-6 text-ink">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
                    <div className="rounded-[1.5rem] border border-border bg-white p-5 shadow-card">
                      <div className="flex items-center gap-3">
                        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                          <LogOut className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                            Exit tracker
                          </div>
                          <div className="text-lg font-bold text-ink">Offboarding status</div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-ink-soft">
                        A clear handoff for HR, IT and admin teams as the employee exits the
                        organisation.
                      </p>

                      <div className="mt-5 rounded-2xl border border-border bg-surface p-4">
                        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                          Clearance focus
                        </div>
                        <div className="mt-4 space-y-3">
                          {[
                            "HR confirms resignation details and final dates",
                            "IT removes access and tracks device return",
                            "Admin closes badges, documents and records",
                          ].map((item) => (
                            <div
                              key={item}
                              className="flex items-start gap-3 rounded-xl bg-white p-3"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                              <span className="text-sm leading-6 text-ink">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[1.5rem] border border-border bg-surface p-5">
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                        Exit flow
                      </div>
                      <div className="mt-4 space-y-3">
                        {["Resign", "Track", "Update", "Search", "Print"].map((step, index) => (
                          <div
                            key={step}
                            className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3"
                          >
                            <div className="grid h-8 w-8 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                              0{index + 1}
                            </div>
                            <div className="text-sm font-semibold text-ink">{step}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 rounded-2xl border border-border bg-white p-4">
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                          Searchable outputs
                        </div>
                        <div className="mt-3 space-y-2">
                          {["Resignation Date", "Effective Date", "Department", "Status"].map(
                            (item) => (
                              <div key={item} className="rounded-xl bg-surface px-3 py-2 text-sm text-ink">
                                {item}
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="section">
          <div className="container-x grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <ScrollReveal variant="fade-up" className="soft-card self-start p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                What it solves
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Exit management becomes easier when resignations and terminations live in one
                place
              </h2>
              <p className="mt-4 text-ink-soft">
                Exit Management Software helps HR and admin teams record and track an employee's
                exit journey, starting from the day a resignation is submitted to the day the exit
                record is completed. For businesses that still track resignations on paper or in
                spreadsheets, this process is often slow, inconsistent and hard to track across
                departments and branches.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Keep resignation details in one consistent format",
                  "Know who has resigned, from which department and since when",
                  "Avoid late updates to resignation dates and last working days",
                  "Search and print past exit records without digging through files",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm leading-6 text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <StaggerReveal step={85} className="grid gap-5 md:grid-cols-2">
              {manualPainPoints.map((card, index) => (
                <article
                  key={card.title}
                  className={`rounded-[1.5rem] border border-border bg-white p-6 shadow-card ${
                    index === 0 ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <FeatureIcon icon={card.icon} />
                    <div>
                      <h3 className="text-lg font-bold text-ink">{card.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{card.desc}</p>
                    </div>
                  </div>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="features" className="bg-surface py-16 lg:py-20">
          <div className="container-x">
            <ScrollReveal variant="fade-up" className="section-heading">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Core features
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Core features of Altroz HR Exit Management Software
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-ink-soft">
                The page content is structured around the same fields and actions described in the
                sheet so each feature is easy to scan, compare and understand.
              </p>
            </ScrollReveal>

            <StaggerReveal step={80} className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featureCards.map((feature) => (
                <article
                  key={feature.title}
                  className="flex h-full flex-col rounded-[1.5rem] border border-border bg-white p-6 shadow-card"
                >
                  <div className="flex items-start gap-4">
                    <FeatureIcon icon={feature.icon} />
                    <div>
                      <h3 className="text-xl font-bold text-ink">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{feature.summary}</p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <div className="rounded-2xl bg-surface p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        How it works
                      </div>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{feature.how}</p>
                    </div>
                    <div className="rounded-2xl bg-primary-soft p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        Business benefit
                      </div>
                      <p className="mt-2 text-sm leading-6 text-ink">{feature.benefit}</p>
                    </div>
                  </div>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="workflow" className="py-16 lg:py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-start">
            <ScrollReveal variant="fade-up" className="soft-card self-start p-6 lg:sticky lg:top-24 lg:col-span-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Exit workflow
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                A guided offboarding sequence that keeps every step visible
              </h2>
              <p className="mt-4 text-ink-soft">
                Altroz HR follows a simple, step-by-step workflow to manage every employee exit
                from start to finish.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Track resignation, notice and exit dates in one place",
                  "Keep asset return and access removal visible",
                  "Ensure final documents are completed in order",
                  "Maintain a clean audit trail for offboarding",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm leading-6 text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <StaggerReveal step={80} className="grid gap-4 md:grid-cols-2 lg:col-span-8">
              {workflowSteps.map((item, index) => (
                <article
                  key={item.step}
                  className={`relative overflow-hidden rounded-[1.5rem] border border-border bg-white p-5 shadow-card ${
                    index === 0 ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-success/60" />
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-base font-bold text-primary">
                      {item.step}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                        {index < workflowSteps.length - 1 ? (
                          <ArrowRight className="hidden h-4 w-4 shrink-0 text-ink-soft md:block" />
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{item.desc}</p>
                    </div>
                  </div>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="bg-surface py-16 lg:py-20">
          <div className="container-x">
            <ScrollReveal variant="fade-up" className="section-heading">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Business value
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Business benefits of Altroz HR Exit Management Software
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-ink-soft">
                With resignation and termination details in one system, HR teams spend less time
                managing records and more time supporting employees.
              </p>
            </ScrollReveal>

            <StaggerReveal step={75} className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {benefits.map((benefit) => (
                <article
                  key={benefit.title}
                  className="rounded-[1.5rem] border border-border bg-white p-6 shadow-card"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-ink">{benefit.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{benefit.desc}</p>
                    </div>
                  </div>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x">
            <ScrollReveal variant="fade-up" className="section-heading">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Use cases
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">Industry use cases</h2>
              <p className="mx-auto mt-4 max-w-3xl text-ink-soft">
                The same exit-management workflow adapts well across industries that need clear
                handoffs, searchable records and branch-wise visibility.
              </p>
            </ScrollReveal>

            <StaggerReveal step={70} className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {industries.map((industry) => (
                <article
                  key={industry.title}
                  className="rounded-[1.5rem] border border-border bg-white p-6 shadow-card"
                >
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-ink">{industry.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{industry.desc}</p>
                    </div>
                  </div>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="bg-surface py-16 lg:py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-start">
            <ScrollReveal variant="fade-up" className="soft-card p-6 lg:col-span-7 lg:self-start">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                FAQ
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Frequently asked questions
              </h2>
              <div className="mt-6 rounded-[1.5rem] border border-border bg-white px-4">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((item, index) => (
                    <AccordionItem key={item.q} value={`item-${index + 1}`}>
                      <AccordionTrigger className="py-5 text-left text-base font-semibold text-ink hover:no-underline">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="pr-10 text-sm leading-6 text-ink-soft">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={120} className="soft-card p-6 lg:col-span-5 lg:self-start">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Final summary
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Manage employee exits the simple way with Altroz HR
              </h2>
              <p className="mt-4 text-ink-soft">
                Bring resignation records, notice period tracking and exit records into one
                organised system. Altroz HR Exit Management Software helps your HR team record,
                search, filter and print employee exit details without the manual effort.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Track the full offboarding lifecycle",
                  "Recover assets and access cleanly",
                  "Close exits with accurate documentation",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm leading-6 text-ink">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3">
                <a href={ROUTES.bookDemo} className="btn-primary justify-center">
                  Book a Free Demo
                </a>
                <a href={ROUTES.documentGeneration} className="btn-outline justify-center">
                  View document generation
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
