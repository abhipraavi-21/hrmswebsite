import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  CalendarDays,
  Clock3,
  FileSpreadsheet,
  Globe,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import TopNavbar from "@/components/site/TopNavbar";
import MainNavbar from "@/components/site/MainNavbar";
import Footer from "@/components/site/Footer";
import { modelScreenshots } from "@/lib/modelScreenshots";

const heroImage = modelScreenshots.leaveDashboard;
const overviewImage = modelScreenshots.workforceDashboard;
const policyImage = "https://www.datocms-assets.com/40521/1705411395-leave-policies.png";
const essImage = "https://www.datocms-assets.com/40521/1705410950-leave-ess.png";
const leaveMgmtImage = "https://www.datocms-assets.com/40521/1705411327-leave-management.png";
const analyticsImage = modelScreenshots.employeeReport;
const g2Logo = "https://www.datocms-assets.com/40521/1703066650-g2_logo_red_rgb.png";
const heroDashboardFrameClass =
  "relative mx-auto max-w-5xl overflow-hidden rounded-[2.25rem] border border-border bg-white p-3 shadow-float sm:p-4";
const dashboardFrameClass =
  "relative mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] border border-border bg-white shadow-float";
const dashboardImageClass = "block h-auto w-full object-contain bg-white";

const heroMetrics = [
  { label: "Save", value: "time and effort" },
  { label: "Administer", value: "uniform leave policy" },
  { label: "Ensure", value: "accurate leave accounting" },
  { label: "Deliver", value: "employee experience" },
  { label: "Reduce", value: "unnecessary expense" },
  { label: "Improve", value: "employer brand image" },
];

const efficiencyCards = [
  {
    title: "Save time",
    icon: <Clock3 className="h-5 w-5" />,
    desc: "Automate leave flow so HR teams spend less time chasing approvals and balance updates.",
  },
  {
    title: "Create consistency",
    icon: <BadgeCheck className="h-5 w-5" />,
    desc: "Apply a uniform leave policy across teams while still allowing role-specific rules.",
  },
  {
    title: "Keep accounting clean",
    icon: <FileSpreadsheet className="h-5 w-5" />,
    desc: "Make leave accounting and payroll inputs more reliable with fewer manual corrections.",
  },
  {
    title: "Improve experience",
    icon: <Users className="h-5 w-5" />,
    desc: "Let employees view balances, apply quickly, and track requests on their own.",
  },
  {
    title: "Support compliance",
    icon: <Globe className="h-5 w-5" />,
    desc: "Keep holiday lists and leave records organized for better governance and reporting.",
  },
  {
    title: "Visibility for managers",
    icon: <BarChart3 className="h-5 w-5" />,
    desc: "Give leaders a better view of leave patterns, exceptions, and team availability.",
  },
];

const policyHighlights = [
  "50+ configurable parameters for leave policy design",
  "Multiple leave schemes for different employee groups",
  "Unlimited leave types and leave transactions",
  "Leave grants, accounting, and rule enforcement handled automatically",
];

const leaveAutomation = [
  "Streamlined monthly payroll inputs",
  "One-click leave year-end processing",
  "Carry forward leave balances",
  "Grant leave automatically",
  "Leave encashment support",
];

const essPoints = [
  "Employees apply for leave from web or mobile",
  "Leave tracker shows balances and transactions",
  "Manager view shows team leave patterns",
  "Workflow escalations keep the system responsive",
  "Email alerts and notifications keep everyone informed",
];

const compliancePoints = [
  "Detailed records and reports aligned with government rules",
  "Custom holiday lists for diverse workforces",
];

const analyticsPoints = [
  "Curb revenue leakage",
  "Monitor employee wellness",
  "Encourage time off to prevent burnout",
];

const testimonialCards = [
  {
    name: "Supriya I.",
    role: "HR Lead",
    image: "https://www.datocms-assets.com/40521/1704782857-supriya-i.jpeg",
    quote:
      "The leave flow is easier to manage when policies, balances, and approvals live in the same place.",
  },
  {
    name: "Kshirabdhy T.",
    role: "Operations Manager",
    image: "https://www.datocms-assets.com/40521/1704866493-kshirabdhy-tanaya-m.webp",
    quote:
      "Managers get a much clearer view of leave patterns, and employees can complete requests without friction.",
  },
];

export default function LeaveManagementPage() {
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
                Leave Management System
              </span>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Leave management that saves time, improves control, and feels easy to use
              </h1>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href="/company/book-demo" className="btn-primary">
                  Explore now
                </a>
                <a href="#policy" className="btn-outline">
                  View leave policy flow
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

            <div className="relative mx-auto mt-10 max-w-7xl">
              <div className="absolute -inset-x-8 -top-4 h-72 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
              <div className={heroDashboardFrameClass}>
                <img
                  src={heroImage}
                  alt="Leave management overview"
                  className="block h-auto w-full object-contain bg-white"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Efficient leave management
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Leave operations become simpler when the rules are built in
              </h2>
              <p className="mt-3 text-ink-soft">
                This page mirrors the reference flow with original wording, focusing on practical
                outcomes for HR teams, employees, and managers.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {efficiencyCards.map((card) => (
                <article key={card.title} className="soft-card p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                    {card.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{card.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="policy" className="bg-surface py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12">
            <div className="soft-card overflow-hidden lg:col-span-5">
              <img
                src={policyImage}
                alt="Leave policies"
                className="h-full w-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="soft-card p-6 lg:col-span-7">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Multiple policies and needs
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                One leave management solution for different teams and locations
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                Build leave logic around employee groups, locations, and policy types while keeping
                the experience consistent for everyone.
              </p>

              <div className="mt-6 space-y-3">
                {policyHighlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border p-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="relative mx-auto mt-10 max-w-7xl">
              <div className="absolute -inset-x-8 -top-4 h-72 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
              <div className={dashboardFrameClass}>
                <img
                  src={overviewImage}
                  alt="Leave dashboard"
                  className={dashboardImageClass}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-transparent" />
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {leaveAutomation.map((item) => (
                <div key={item} className="soft-card p-4">
                  <div className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12">
            <div className="soft-card overflow-hidden lg:col-span-5">
              <img
                src={essImage}
                alt="Employee self service leave"
                className="h-full w-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="soft-card p-6 lg:col-span-7">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                No mess, no stress
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                Give employees a self-service leave experience that reduces questions
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                The ESS experience helps employees manage leave independently while keeping managers
                and HR informed.
              </p>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {essPoints.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="relative mx-auto mt-10 max-w-7xl">
              <div className="absolute -inset-x-8 -top-4 h-72 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
              <div className={dashboardFrameClass}>
                <img
                  src={leaveMgmtImage}
                  alt="Leave management"
                  className={dashboardImageClass}
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
                  Keep leave records and holiday structures aligned with policy
                </h3>
              </div>

              <div className="lg:col-span-7">
                <div className="grid gap-3 md:grid-cols-2">
                  {compliancePoints.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                      <BadgeCheck className="mt-0.5 h-4 w-4 text-success" />
                      <span className="text-sm text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <div className="relative mx-auto mt-10 max-w-7xl">
              <div className="absolute -inset-x-8 -top-4 h-72 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
              <div className={dashboardFrameClass}>
                <img
                  src={analyticsImage}
                  alt="Leave analytics"
                  className={dashboardImageClass}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Dashboards, reports and analytics
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">
                  Use leave data to find patterns that matter to the business
                </h3>
                <p className="mt-3 text-sm text-ink-soft">
                  Leave analytics can surface signals that support productivity, wellbeing, and
                  operational planning.
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="grid gap-4 md:grid-cols-3">
                  {analyticsPoints.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-border bg-white p-4 shadow-card"
                    >
                      <BarChart3 className="mt-0.5 h-4 w-4 text-primary" />
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
            <div className="relative mx-auto mt-10 max-w-7xl">
              <div className="absolute -inset-x-8 -top-4 h-72 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
              <div className={dashboardFrameClass}>
                <img
                  src={heroImage}
                  alt="Leave management overview"
                  className={dashboardImageClass}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-transparent" />
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Customer proof
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">
                  HR teams want clarity, fewer follow-ups, and better leave visibility
                </h3>
              </div>

              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-card">
                  <img src={g2Logo} alt="G2 logo" className="h-10 w-auto" />
                  <div>
                    <div className="text-sm font-semibold text-ink">
                      Leave management trusted by growing teams
                    </div>
                    <div className="text-xs text-ink-soft">
                      A trust marker inspired by the source page.
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {testimonialCards.map((testimonial) => (
                    <article
                      key={testimonial.name}
                      className="rounded-2xl border border-border p-4"
                    >
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
                      <p className="mt-3 text-sm text-ink-soft">{testimonial.quote}</p>
                    </article>
                  ))}
                </div>
              </div>
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
                    Ready to explore
                  </div>
                  <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                    Put a cleaner leave process under your HR operations
                  </h2>
                  <p className="mt-3 max-w-2xl text-ink-soft">
                    This new page keeps the reference page’s product story and turns it into an
                    original implementation for your app.
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
                  <a href="#policy" className="btn-outline">
                    Review policies
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
