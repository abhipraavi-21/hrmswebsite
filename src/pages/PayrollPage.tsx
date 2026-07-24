import {
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  Landmark,
  ShieldCheck,
  Sparkles,
  SplitSquareVertical,
  UserRound,
  Wallet,
} from "lucide-react";
import Footer from "@/components/site/Footer";
import TopNavbar from "@/components/site/TopNavbar";
import MainNavbar from "@/components/site/MainNavbar";

const heroMetrics = [
  { label: "Salary Processing", value: "Accurate payroll every month" },
  { label: "Automation", value: "Automated payroll calculations" },
  { label: "Compliance", value: "Supports statutory payroll compliance" },
];

const highlightCards = [
  {
    title: "Speed",
    icon: <Clock3 className="h-5 w-5" />,
    desc: "Keep payroll cycles moving without month-end drag.",
  },
  {
    title: "Trust",
    icon: <UserRound className="h-5 w-5" />,
    desc: "Give employees clearer salary information through self-service.",
  },
  {
    title: "Accuracy",
    icon: <BadgeCheck className="h-5 w-5" />,
    desc: "Calculate pay with consistent rules, checks, and filings.",
  },
  {
    title: "Reliability",
    icon: <ShieldCheck className="h-5 w-5" />,
    desc: "Reduce payroll stress with a steady, predictable workflow.",
  },
];

const payrollCycle = [
  {
    title: "Payslip Generation",
    desc: "Automatically generate professional salary payslips for every payroll cycle.",
  },
  {
    title: "Full and final settlement",
    desc: "Close exits cleanly with final pay calculations and settlement checks.",
  },
  {
    title: "Loan Management",
    desc: "Manage employee loans and automatically deduct installments from monthly payroll.",
  },
  {
    title: "Bank Transfer Files",
    desc: "Generate bank transfer files for quick and secure employee salary payments.",
  },
  {
    title: "Salary Components",
    desc: "Configure earnings, allowances, deductions, incentives, bonuses, and reimbursements.",
  },
  {
    title: "Arrear Management",
    desc: "Automatically calculate salary arrears and include them in payroll processing.",
  },
  {
    title: "Expense Reimbursements",
    desc: "Process approved employee reimbursement claims along with monthly payroll.",
  },
  {
    title: "Accounting Entries",
    desc: "Generate payroll journal entries for easy accounting and financial reconciliation.",
  },
];

const compliancePoints = [
  {
    title: "Provident Fund (PF) Management",
    desc: "Automatically calculate PF contributions and generate ECR files for statutory compliance.",
  },
  {
    title: "ESI Calculation",
    desc: "Calculate employee and employer ESI contributions with ready-to-file reports.",
  },
  {
    title: "Professional Tax (PT)",
    desc: "Support state-wise Professional Tax calculations based on applicable rules.",
  },
  {
    title: "TDS Management",
    desc: "Calculate tax deductions accurately and simplify TDS return preparation.",
  },
  {
    title: "Form 24Q Reports",
    desc: "Generate payroll tax reports required for quarterly TDS filing.",
  },
  {
    title: "Form 16 & Salary Tax Documents",
    desc: "Generate employee tax documents for easy distribution and record keeping.",
  },
  {
    title: "Bonus Calculation",
    desc: "Automatically calculate statutory and company bonus as per payroll rules.",
  },
  {
    title: "Labour Welfare Fund (LWF)",
    desc: "Manage Labour Welfare Fund deductions according to state-specific requirements.",
  },
];

const paydayPoints = [
  {
    title: "Bulk Salary Processing",
    desc: "Process salaries for all employees in a single payroll cycle.",
  },
  {
    title: "Bank Transfer File Generation",
    desc: "Generate bank-compatible salary transfer files for faster processing.",
  },
  {
    title: "Multi-Bank Salary Payments",
    desc: "Support salary disbursement across multiple banks with ease.",
  },
  {
    title: "Salary Payment Tracking",
    desc: "Monitor salary payment status and maintain complete payroll records.",
  },
];

const essPoints = [
  {
    title: "Reimbursement Management",
    desc: "Submit and track reimbursement claims online.",
  },
  {
    title: "Investment Declaration",
    desc: "Upload tax declarations and supporting documents digitally.",
  },
  {
    title: "Payslips & Form 16",
    desc: "Download salary slips, Form 16, and payroll statements anytime.",
  },
  {
    title: "Payroll Requests",
    desc: "Raise payroll-related requests and track their approval status.",
  },
];

const reportPoints = [
  "Payroll MIS Reports",
  "Compliance Reports",
  "Salary Reports",
  "Custom Payroll Reports",
];

const testimonials = [
  {
    heading: "Accurate Payroll Processing",
    name: "Praveen D.",
    role: "HR Manager",
    image: "https://www.datocms-assets.com/40521/1704780053-praveen-d.jpeg",
    quote:
      "Automatically calculate salaries, deductions, overtime, bonuses, and reimbursements with fewer manual errors.",
  },
  {
    heading: "Save Time Every Payroll Cycle",
    name: "Suzanna T.",
    role: "People Ops Lead",
    image: "https://www.datocms-assets.com/40521/1704779814-suzanna-t.jpeg",
    quote:
      "Reduce payroll processing time with automated calculations, approvals, statutory reports, and salary disbursement.",
  },
];

const detailCards = [
  {
    icon: <CircleDollarSign className="h-5 w-5" />,
    title: "Salary Structure Management",
    desc: "Create flexible salary structures with earnings, deductions, allowances, reimbursements, and salary components based on your company's payroll policies.",
  },
  {
    icon: <SplitSquareVertical className="h-5 w-5" />,
    title: "Automated Payroll Processing",
    desc: "Automatically calculate salaries using payroll rules, attendance, leave, overtime, deductions, and employee salary structures.",
  },
  {
    icon: <Landmark className="h-5 w-5" />,
    title: "Salary Disbursement",
    desc: "Generate bank transfer files and process employee salary payments quickly with payroll-ready reports.",
  },
  {
    icon: <FileCheck2 className="h-5 w-5" />,
    title: "Statutory Compliance",
    desc: "Manage statutory deductions such as PF, ESI, Professional Tax, TDS, and other payroll compliance requirements with accurate payroll records.",
  },
];

export default function PayrollPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x py-8 lg:py-10">
            <div className="mx-auto max-w-5xl text-center fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Payroll Management Software
              </span>
              <h1 className="mx-auto mt-3 max-w-5xl text-balance text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[4.1rem]">
                <span className="block">Payroll Management Software for</span>
                <span className="block">Accurate and Automated Salary Processing</span>
              </h1>
              <p className="mt-3 text-base text-ink-soft">
                Simplify salary processing with automated payroll calculations, statutory
                compliance, salary disbursement, payslip generation, and payroll reports. Altroz
                HR helps businesses process payroll accurately while reducing manual effort and
                month-end workload.
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button type="button" className="btn-primary">
                  Explore Payroll Features
                </button>
                <button type="button" className="btn-outline">
                  Book Free Demo
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {heroMetrics.map((item) => (
                <div key={item.label} className="soft-card p-4 text-center">
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {item.label}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-ink">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-border bg-white p-6 shadow-float">
              <div className="absolute -inset-x-8 -top-4 h-72 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
              <div className="relative grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[1.5rem] bg-surface p-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">
                    Payroll dashboard summary
                  </div>
                  <h2 className="mt-2 text-2xl font-bold text-ink">
                    Live payroll, compliance, and report workflow
                  </h2>
                  <p className="mt-3 text-sm text-ink-soft">
                    This page now shows the payroll story in text only, with no dashboard image or
                    click-through panel.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  {heroMetrics.map((item) => (
                    <div key={item.label} className="soft-card p-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {item.label}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-ink">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-4">
              {highlightCards.map((card) => (
                <div key={card.title} className="soft-card p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    {card.icon}
                    {card.title}
                  </div>
                  <p className="mt-2 text-sm text-ink-soft">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                PAYROLL MANAGEMENT
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Simplify Every Step of Payroll Management
              </h2>
              <p className="mt-3 text-ink-soft">
                Manage the complete payroll process from salary structures and payroll
                calculations to statutory compliance, bank transfers, payslip generation, and
                payroll reports. Altroz HR helps businesses process payroll accurately and
                efficiently every month.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:items-stretch">
              {detailCards.map((item) => (
                <article key={item.title} className="soft-card flex h-full flex-col p-6">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 min-h-[3.5rem] text-lg font-bold leading-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-ink-soft">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="payroll-flow" className="bg-surface py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-stretch">
            <div className="soft-card p-6 lg:col-span-5 lg:self-stretch">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Payroll cycle
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">The full payroll flow, without an image</h3>
              <p className="mt-3 text-sm text-ink-soft">
                Salary calculation, payslips, loans, bank files, reimbursements, arrears, and
                accounting entries are all described in the copy below.
              </p>
              <div className="mt-5 space-y-2 text-sm text-ink-soft">
                <p>- Salary structures and components</p>
                <p>- Automated payroll processing</p>
                <p>- Salary disbursement and bank transfer files</p>
              </div>
            </div>

            <div className="soft-card flex h-full flex-col p-6 lg:col-span-7 lg:self-stretch">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Payroll features
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                Everything You Need to Process Payroll Efficiently
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                Process payroll with built-in tools for salary calculations, payslips,
                reimbursements, loans, settlements, bank transfers, and statutory compliance.
                Altroz HR helps businesses manage the complete payroll cycle from calculation to
                salary disbursement.
              </p>

              <div className="mt-6 grid flex-1 content-start gap-4 md:grid-cols-2">
                {payrollCycle.map((item) => (
                  <article
                    key={item.title}
                    className="soft-card flex h-full items-start gap-3 p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <div>
                      <div className="text-sm font-semibold text-ink">{item.title}</div>
                      <p className="mt-1 text-sm leading-6 text-ink-soft">{item.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="rounded-[2rem] border border-border bg-white p-6 shadow-float">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Payroll compliance
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                Stay Payroll Compliant with Automated Statutory Calculations
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                Altroz HR automates statutory payroll calculations and compliance reports,
                helping businesses stay compliant with PF, ESI, PT, TDS, bonus, and other labour
                regulations while reducing manual work and calculation errors.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {compliancePoints.map((item) => (
                  <div key={typeof item === "string" ? item : item.title} className="rounded-xl bg-surface p-4">
                    <div className="text-sm font-semibold text-ink">
                      {typeof item === "string" ? item : item.title}
                    </div>
                    <p className="mt-1 text-sm leading-6 text-ink-soft">
                      {typeof item === "string" ? "" : item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <div className="mx-auto max-w-5xl soft-card p-6 md:p-8">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Payroll disbursement
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                Process Salary Payments Quickly and Securely
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                Release employee salaries securely with bank-ready payment files, bulk salary
                transfers, payment tracking, and automated payroll processing. Manage every
                salary disbursement from one centralized payroll platform.
              </p>

              <div className="mt-6 space-y-3">
                {paydayPoints.map((item) => (
                  <div
                    key={typeof item === "string" ? item : item.title}
                    className="flex items-start gap-3 rounded-xl border border-border p-3"
                  >
                    <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {typeof item === "string" ? (
                      <span className="text-sm text-ink">{item}</span>
                    ) : (
                      <div>
                        <div className="text-sm font-semibold text-ink">{item.title}</div>
                        <p className="mt-1 text-sm leading-6 text-ink-soft">{item.desc}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="mx-auto max-w-5xl soft-card p-6 md:p-8">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Employee self service (ESS)
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                Give Employees Easy Access to Payroll Information
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                Altroz HR Employee Self Service (ESS) lets employees securely access payslips,
                salary details, tax documents, reimbursement information, and payroll requests
                anytime from web or mobile, reducing HR workload and improving employee
                experience.
              </p>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {essPoints.map((item) => (
                  <div
                    key={typeof item === "string" ? item : item.title}
                    className="flex items-start gap-3 rounded-xl bg-surface p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    {typeof item === "string" ? (
                      <span className="text-sm text-ink">{item}</span>
                    ) : (
                      <div>
                        <div className="text-sm font-semibold text-ink">{item.title}</div>
                        <p className="mt-1 text-sm leading-6 text-ink-soft">{item.desc}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Payroll reports
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">
                  Generate Payroll Reports with Real-Time Insights
                </h3>
                <p className="mt-3 text-sm text-ink-soft">
                  Create detailed payroll reports with salary summaries, compliance reports, tax
                  reports, and employee payroll insights. Get the information you need to make
                  faster payroll and HR decisions.
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="grid gap-4 md:grid-cols-2">
                  {reportPoints.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-border bg-white p-4 shadow-card"
                    >
                      <BarChart3 className="mt-0.5 h-4 w-4 text-success" />
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
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Business Benefits
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Everything You Need for Modern Payroll Management
              </h2>
              <p className="mt-3 text-ink-soft">
                Automate payroll from salary calculation to employee payments using one secure
                and easy-to-use platform.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-white px-4 py-3 shadow-card">
              <div className="text-sm font-semibold text-ink">
                Payroll software trusted by growing teams
              </div>
              <div className="text-xs text-ink-soft">
                A familiar review badge used as a trust marker, now shown without the logo image.
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 md:items-stretch">
              {testimonials.map((testimonial) => (
                <article key={testimonial.name} className="soft-card flex h-full flex-col p-6">
                  {"heading" in testimonial && (
                    <div className="text-xs font-bold uppercase tracking-wider text-primary">
                      {testimonial.heading}
                    </div>
                  )}
                  <p className="mt-4 flex-1 text-sm leading-6 text-ink-soft">
                    {testimonial.quote}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">
                    GET STARTED
                  </div>
                  <h3 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                    Simplify Payroll Management with Altroz HR
                  </h3>
                  <p className="mt-3 max-w-2xl text-ink-soft">
                    Automate salary processing, statutory compliance, payroll reports, employee
                    self-service, and salary disbursement with one powerful Payroll Management
                    Software. Book a free demo and see how Altroz HR simplifies payroll for your
                    business.
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
                  <button type="button" className="btn-outline">
                    Book Free Demo
                  </button>
                  <button type="button" className="btn-primary">
                    Start Free Trial
                  </button>
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
