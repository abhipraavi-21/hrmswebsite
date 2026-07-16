import {
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  FileText,
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
import { modelScreenshots } from "@/lib/modelScreenshots";

const heroImage = modelScreenshots.payrollDashboard;
const payrollCycleImage = "https://www.datocms-assets.com/40521/1705950176-payroll-1.png";
const complianceImage = modelScreenshots.salaryReport;
const paydayImage = "https://www.datocms-assets.com/40521/1705584690-smooth-payday.png";
const essImage = "https://www.datocms-assets.com/40521/1705584760-ess.png";
const analyticsImage = modelScreenshots.employeeReport;
const g2Logo = "https://www.datocms-assets.com/40521/1703066650-g2_logo_red_rgb.png";

const heroMetrics = [
  { label: "Target", value: "On-time payouts" },
  { label: "Claim", value: "80% less admin" },
  { label: "Reliability", value: "99.5% uptime" },
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
  "Payslips",
  "Full and final settlement",
  "Loans",
  "Bank transfers",
  "Flexible benefits",
  "Arrears",
  "Reimbursements",
  "Accounts journal entries",
];

const compliancePoints = [
  "Provident fund calculations with ECR output",
  "ESI computations with challans",
  "Professional tax rules by state",
  "TDS calculations and eTDS returns",
  "Form 24Q generation with automated FVU checks",
  "Digitally signed Form 16 and 12BA documents",
  "Bonus calculation and reporting",
  "Labour welfare fund deductions",
];

const paydayPoints = [
  "Direct salary transfer from inside the app",
  "Electronic bank transfer formats for major banks",
  "Batch-wise and bank-wise payment release",
  "Cash and cheque payment status tracking",
];

const essPoints = [
  "Reimbursement claims with policy checks",
  "Online submissions for declarations and proofs",
  "Payslip, Form 16, and statement access",
  "Workflows and help desk support for employees",
];

const reportPoints = [
  "MIS and reconciliation reports",
  "Statutory compliance reports",
  "Payroll statement builder",
  "Ad hoc queries with QueryBuilder",
];

const testimonials = [
  {
    name: "Praveen D.",
    role: "HR Manager",
    image: "https://www.datocms-assets.com/40521/1704780053-praveen-d.jpeg",
    quote:
      "Payroll becomes easier to trust when the calculation flow, compliance checks, and employee views all sit together.",
  },
  {
    name: "Suzanna T.",
    role: "People Ops Lead",
    image: "https://www.datocms-assets.com/40521/1704779814-suzanna-t.jpeg",
    quote:
      "We can see what is happening at each step of the pay cycle without chasing separate spreadsheets or exports.",
  },
];

const detailCards = [
  {
    icon: <CircleDollarSign className="h-5 w-5" />,
    title: "Salary structure control",
    desc: "Model fixed, variable, and allowance-based salaries without spreadsheet sprawl.",
  },
  {
    icon: <SplitSquareVertical className="h-5 w-5" />,
    title: "Configurable payroll engine",
    desc: "Set rules for employee groups and complex pay scenarios without rework every month.",
  },
  {
    icon: <Landmark className="h-5 w-5" />,
    title: "Bank release support",
    desc: "Push salary batches in bank-friendly formats and keep release status visible.",
  },
  {
    icon: <FileCheck2 className="h-5 w-5" />,
    title: "Statutory output",
    desc: "Generate reports, forms, and deduction data payroll teams rely on for compliance.",
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
            <div className="mx-auto max-w-3xl text-center fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Payroll Management
              </span>
              <h1 className="mt-3 text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Faster payroll runs with accurate payouts and less month-end pressure
              </h1>
              <p className="mt-3 text-base text-ink-soft">
                Keep salary calculation, compliance, disbursement, and employee visibility in one
                clean flow so payroll teams can work with more confidence.
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <a href="/company/book-demo" className="btn-primary">
                  Explore payroll
                </a>
                <a href="#payroll-flow" className="btn-outline">
                  See the payroll cycle
                </a>
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

            <div className="relative mt-10 overflow-hidden lg:left-1/2 lg:right-1/2 lg:w-screen lg:-ml-[50vw] lg:-mr-[50vw]">
              <div className="absolute -inset-x-8 -top-4 h-72 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
              <div className="relative h-screen min-h-[100svh] overflow-hidden bg-white shadow-float">
                <img
                  src={heroImage}
                  alt="Payroll management overview"
                  className="absolute inset-0 block h-full w-full object-contain object-center bg-white p-4 sm:p-6"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
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
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Payroll foundation
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                A payroll engine that handles the full cycle
              </h2>
              <p className="mt-3 text-ink-soft">
                The source page frames payroll as a complete system, not just a payslip calculator.
                This version keeps that idea and presents it in fresh wording.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {detailCards.map((item) => (
                <article key={item.title} className="soft-card p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="payroll-flow" className="bg-surface py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="soft-card overflow-hidden lg:col-span-5">
              <img
                src={payrollCycleImage}
                alt="Payroll processing cycle"
                className="h-full w-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="soft-card p-6 lg:col-span-7">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Payroll processing
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                Keep the processing steps visible from calculation to settlement
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                Support the end-to-end flow with a configurable engine that can handle salary
                components, reimbursements, and final pay events.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {payrollCycle.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm font-medium text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="relative overflow-hidden lg:left-1/2 lg:right-1/2 lg:w-screen lg:-ml-[50vw] lg:-mr-[50vw]">
              <div className="absolute -inset-x-8 -top-4 h-72 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
              <div className="relative h-screen min-h-[100svh] overflow-hidden bg-white shadow-float">
                <img
                  src={complianceImage}
                  alt="Statutory compliance"
                  className="absolute inset-0 block h-full w-full object-contain object-center bg-white p-4 sm:p-6"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Statutory compliance
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">
                  Compliance handling that removes a lot of manual tracking
                </h3>
                <p className="mt-3 text-sm text-ink-soft">
                  Payroll teams need rules for PF, ESI, PT, TDS, bonus, and labour welfare to stay
                  current. This page keeps that full coverage in view.
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="grid gap-3 sm:grid-cols-2">
                  {compliancePoints.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                      <FileText className="mt-0.5 h-4 w-4 text-primary" />
                      <span className="text-sm text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="soft-card overflow-hidden lg:col-span-5">
              <img
                src={paydayImage}
                alt="Smooth payday"
                className="h-full w-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="soft-card p-6 lg:col-span-7">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Smooth payday
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                Send salaries without turning pay day into a fire drill
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                Direct salary release, bank-format support, and payment status tracking help teams
                move money with less stress and more predictability.
              </p>

              <div className="mt-6 space-y-3">
                {paydayPoints.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border p-3"
                  >
                    <Wallet className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12">
            <div className="soft-card p-6 lg:col-span-7">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Employee self service
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                Make payroll information easier for employees to understand
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                The source page positions ESS as a way to reduce payroll admin and improve the
                employee experience. We keep the same idea with original phrasing.
              </p>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {essPoints.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="soft-card overflow-hidden lg:col-span-5">
              <img
                src={essImage}
                alt="Employee self service portal"
                className="h-full w-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        <section className="bg-surface py-12">
          <div className="container-x">
            <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-border bg-white shadow-float">
              <img
                src={analyticsImage}
                alt="Payroll reports and analytics"
                className="block h-auto w-full object-contain object-center bg-white p-3 sm:p-4 md:p-6"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Reports and analytics
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">
                  Turn payroll data into reports teams can actually use
                </h3>
                <p className="mt-3 text-sm text-ink-soft">
                  Add ready-made MIS views, compliance reporting, and ad hoc queries so finance and
                  HR can make faster decisions with the same data set.
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
                Customer proof
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Payroll teams want accuracy, transparency, and less rework
              </h2>
              <p className="mt-3 text-ink-soft">
                The reference page finishes with strong trust signals. Here we keep the same
                structure using original copy and the same visual cues.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-card">
              <img src={g2Logo} alt="G2 logo" className="h-10 w-auto" />
              <div>
                <div className="text-sm font-semibold text-ink">
                  Payroll software trusted by growing teams
                </div>
                <div className="text-xs text-ink-soft">
                  A familiar review badge used as a trust marker.
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {testimonials.map((testimonial) => (
                <article key={testimonial.name} className="soft-card p-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-14 w-14 rounded-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="text-base font-semibold text-ink">{testimonial.name}</div>
                      <div className="text-sm text-ink-soft">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-ink-soft">{testimonial.quote}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">
                    Ready to move
                  </div>
                  <h3 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                    Keep payroll accurate, compliant, and easy to run every month
                  </h3>
                  <p className="mt-3 max-w-2xl text-ink-soft">
                    We translated the reference page into a fresh page for your project, while
                    keeping the same core message and useful payroll capabilities.
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
                  <a href="#payroll-flow" className="btn-outline">
                    Review flow
                  </a>
                  <a href="/company/contact-us" className="btn-primary">
                    Contact sales
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
