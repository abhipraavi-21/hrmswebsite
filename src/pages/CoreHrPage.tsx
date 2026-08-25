import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  Building2,
  CheckCircle2,
  CircleGauge,
  CalendarDays,
  Download,
  FileText,
  Globe,
  Filter,
  Menu,
  ScanText,
  Search,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
  Users,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import TopNavbar from "@/components/site/TopNavbar";
import MainNavbar from "@/components/site/MainNavbar";
import Footer from "@/components/site/Footer";
import { ROUTES } from "@/routes/routeConfig.js";

const heroImages = {
  sapien:
    "https://a-us.storyblok.com/f/1019507/1728x972/638c6764cb/darwinbox-sapien-video-thumbnail.webp",
};

const capabilityImages = {
  organization: "/core-hr/organization-illustration.png",
  profiles: "/core-hr/profiles-illustration.png",
  workflow: "/core-hr/workflow-illustration.png",
  compliance: "/core-hr/compliance-illustration.png",
  extensibility: "/core-hr/extensibility-illustration.png",
  analytics: "/core-hr/analytics-illustration.png",
};

const capabilityCards = [
  {
    title: "Organization management",
    desc: "Shape reporting lines, units, locations, and ownership rules in one place so the org chart stays dependable as the company grows.",
    image: capabilityImages.organization,
    alt: "Organization management",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "Unified employee profiles",
    desc: "Keep each person's profile, job history, identifiers, documents, and employment data connected instead of scattered across tools.",
    image: capabilityImages.profiles,
    alt: "Unified employee profiles",
    icon: <ScanText className="h-5 w-5" />,
  },
  {
    title: "No-code workflow automation",
    desc: "Turn routine HR actions into guided flows for onboarding, changes, approvals, and handoffs without writing custom code.",
    image: capabilityImages.workflow,
    alt: "No-code HR workflow automation",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Global compliance and security",
    desc: "Apply role-based access, policy guardrails, and audit trails so sensitive people data stays protected across regions.",
    image: capabilityImages.compliance,
    alt: "Global Compliance & Security",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Extensibility ecosystem",
    desc: "Connect Core HR to the rest of your stack through APIs, integrations, and configuration-friendly extensions.",
    image: capabilityImages.extensibility,
    alt: "Extensibility & Ecosystem",
    icon: <CircleGauge className="h-5 w-5" />,
  },
  {
    title: "Reports and visual analytics",
    desc: "Turn trusted workforce data into dashboards and reporting views that help leaders make faster decisions.",
    image: capabilityImages.analytics,
    alt: "Reports & Visual Analytics",
    icon: <BarChart3 className="h-5 w-5" />,
  },
];

const guidingCards = [
  {
    title: "Designed for real complexity",
    desc: "Model the way the business actually runs, with structures that support multiple business units, geographies, and worker types.",
    image:
      "https://a-us.storyblok.com/f/1019507/624x484/a3a2dd872b/how-enterprises-actually-work.svg",
  },
  {
    title: "Global core, local precision",
    desc: "Keep a single HR backbone while adapting policies and data handling for local operating requirements.",
    image: "https://a-us.storyblok.com/f/1019507/624x484/862a5e1501/localized-context.svg",
  },
  {
    title: "Move fast without fragmentation",
    desc: "Reduce manual handoffs and duplicate data entry so teams can adapt quickly while keeping control.",
    image: "https://a-us.storyblok.com/f/1019507/624x484/f7ec8d6322/move-fast-without-it.svg",
  },
  {
    title: "Natively unified end-to-end",
    desc: "Let Core HR sit at the center of payroll, talent, and operations instead of acting like a disconnected registry.",
    image:
      "https://a-us.storyblok.com/f/1019507/624x484/33042357e6/natively-unified-end-to-end.svg",
  },
];

const pageContainerClass = "mx-auto w-[min(1360px,calc(100%-24px))]";

export default function CoreHrPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <MainNavbar />

      <main className="pb-10 md:pb-24">
        <section
          className="hero-gradient relative overflow-hidden !pt-0 !pb-8"
          style={{ display: "block", minHeight: "auto" }}
        >
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className={`${pageContainerClass} py-0 lg:py-2`}>
            <div className="mx-auto max-w-5xl px-4 pt-2 pb-4 text-center sm:px-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-sm font-extrabold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Global HR Core
              </span>
              <h1 className="mt-1 text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Everything You Need to Manage HR Efficiently
              </h1>
              <p className="mx-auto mt-1 max-w-4xl text-base text-ink-soft">
                Simplify everyday HR tasks with powerful modules designed for growing businesses.
              </p>

              <div className="mt-3 flex flex-wrap justify-center gap-3">
                <a href="/company/book-demo" className="btn-primary">
                  Book Free Demo
                </a>
                <a href="#capabilities" className="btn-outline">
                  Explore Features
                </a>
              </div>
            </div>

            <div className="relative mx-auto mt-5 max-w-6xl">
              <CoreHrDigitalDashboardPreview />
            </div>
          </div>
        </section>

        <section id="capabilities" className="py-20">
          <div className={pageContainerClass}>
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Core capabilities
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Everything You Need to Manage HR Efficiently
              </h2>
              <p className="mt-3 text-ink-soft">
                Simplify everyday HR tasks with powerful modules designed for growing businesses.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {capabilityCards.map((item) => (
                <article key={item.title} className="soft-card overflow-hidden p-0">
                  <div className="aspect-[624/484] overflow-hidden bg-gradient-to-br from-surface via-white to-primary-soft/30">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="h-full w-full object-contain p-5 transition-transform duration-500 hover:scale-[1.02]"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                      {item.icon}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm text-ink-soft">{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-start">
              <div className="soft-card p-5 lg:col-span-3 lg:self-start">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Smart automation
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">
                  Smart HR Automation That Saves Time
                </h3>
                <p className="mt-3 text-sm text-ink-soft">
                  Automate repetitive HR tasks, reduce manual work, and access important employee
                  information quickly.
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    "Faster workflows with fewer manual steps",
                    "Quick access to employee data and actions",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                      <BadgeCheck className="mt-0.5 h-4 w-4 text-success" />
                      <span className="text-sm text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 lg:col-span-9">
                <CoreHrDigitalTablePreview />
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
              <div className="soft-card p-6 lg:col-span-5">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Document records
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">
                  A single HR core that connects records, actions, and insights
                </h3>
                <p className="mt-3 text-sm text-ink-soft">
                  Core HR works best when documents, approvals, and change history stay tied to the
                  employee record. That is the story this page is built around.
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    "Consistent employee records across every business unit",
                    "Permissions and approvals that match real operating structures",
                    "Audit-friendly change history for sensitive HR updates",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-border p-3"
                    >
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm text-ink">{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#guiding-principles"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all hover:gap-2"
                >
                  See the wider platform story <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="lg:col-span-7">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="soft-card p-5">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                      <BadgeCheck className="h-5 w-5" />
                    </div>
                    <h4 className="mt-4 text-lg font-bold text-ink">Clean record ownership</h4>
                    <p className="mt-2 text-sm text-ink-soft">
                      Employee data, job history, and attachments stay linked to one governed
                      profile instead of being scattered across separate files.
                    </p>
                  </div>

                  <div className="soft-card p-5">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#ecfdf3] text-success">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <h4 className="mt-4 text-lg font-bold text-ink">Access by role</h4>
                    <p className="mt-2 text-sm text-ink-soft">
                      The right team members can view or update the right records without exposing
                      sensitive information to everyone.
                    </p>
                  </div>

                  <div className="soft-card p-5">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                      <Workflow className="h-5 w-5" />
                    </div>
                    <h4 className="mt-4 text-lg font-bold text-ink">Approval friendly</h4>
                    <p className="mt-2 text-sm text-ink-soft">
                      Updates, changes, and exceptions can move through structured approval flows
                      instead of ad hoc follow-ups.
                    </p>
                  </div>

                  <div className="soft-card p-5">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-surface text-ink">
                      <Users className="h-5 w-5" />
                    </div>
                    <h4 className="mt-4 text-lg font-bold text-ink">Reporting-ready data</h4>
                    <p className="mt-2 text-sm text-ink-soft">
                      Core HR information stays organized so it can support analytics, exports, and
                      everyday workforce planning.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="guiding-principles" className="bg-surface py-20">
          <div className={pageContainerClass}>
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Built for real complexity
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                The working model behind a modern Core HR system
              </h2>
              <p className="mt-3 text-ink-soft">
                These cards echo the ideas on the source page, but each one is rewritten to fit the
                tone and structure of this project.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {guidingCards.map((item) => (
                <article key={item.title} className="soft-card overflow-hidden p-0">
                  <div className="aspect-[624/484] bg-white">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm text-ink-soft">{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className={`${pageContainerClass} grid gap-6 lg:grid-cols-12`}>
            <div className="soft-card overflow-hidden lg:col-span-7">
              <div className="grid gap-0 md:grid-cols-2">
                <div className="p-6 md:p-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">
                    Sapien platform layer
                  </div>
                  <h3 className="mt-2 text-2xl font-bold text-ink">
                    A cohesive experience that stays scalable as the HR stack grows
                  </h3>
                  <p className="mt-3 text-sm text-ink-soft">
                    The reference page leans on the idea of a cohesive platform. Here, we keep that
                    same product message but retell it in original language.
                  </p>
                  <div className="mt-6 space-y-3">
                    {[
                      "One interaction model across records, workflows, and reporting",
                      "A design that supports both global governance and local flexibility",
                      "A cleaner path from data entry to insight generation",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-xl bg-surface p-3">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span className="text-sm text-ink">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative min-h-[280px] bg-[#0f172a] p-4 md:p-0">
                  <img
                    src={heroImages.sapien}
                    alt="Sapien platform preview"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                    <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
                      Cohesive, scalable, future-ready
                    </div>
                    <div className="mt-1 text-sm text-white/90">
                      The visual language is inspired by Darwinbox's platform story, but the page
                      copy and composition are tailored for this app.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="soft-card p-6 lg:col-span-5">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Why teams care
              </div>
              <div className="mt-2 text-2xl font-bold text-ink">
                Core HR should reduce complexity, not add another layer of it
              </div>
              <div className="mt-6 grid gap-4">
                {[
                  {
                    icon: <ShieldCheck className="h-5 w-5" />,
                    title: "Governed access",
                    desc: "Limit visibility by role so sensitive employee information is always handled carefully.",
                  },
                  {
                    icon: <Workflow className="h-5 w-5" />,
                    title: "Operational flow",
                    desc: "Move requests through approvals and lifecycle steps without manual routing.",
                  },
                  {
                    icon: <Globe className="h-5 w-5" />,
                    title: "Global consistency",
                    desc: "Keep the same data model intact while local rules adapt to each region.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-2xl border border-border p-4"
                  >
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-ink">{item.title}</div>
                      <p className="mt-1 text-sm text-ink-soft">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div id="cta" className="scroll-mt-24">
          <div className="mx-auto mt-6 w-full max-w-sm px-3 md:fixed md:bottom-8 md:left-1/2 md:z-50 md:mt-0 md:w-fit md:max-w-[calc(100%-24px)] md:-translate-x-1/2 md:px-0">
            <div className="relative w-full overflow-hidden rounded-[1.25rem] border border-border bg-gradient-to-r from-[#eff6ff] via-white to-[#eefdf3] px-3 py-3 shadow-float backdrop-blur-md md:w-auto md:px-3 md:py-2.5">
              <div className="pointer-events-none absolute -left-6 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -right-6 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-success/15 blur-3xl" />
              <div className="relative flex flex-col items-stretch gap-2 text-center sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:text-left md:gap-x-2">
                <h2 className="text-sm font-bold leading-snug tracking-tight text-ink sm:text-base md:text-lg">
                  Manage Your Workforce Smarter.
                </h2>
                <ArrowRight className="hidden h-3.5 w-3.5 shrink-0 text-primary sm:block md:h-4 md:w-4" />
                <Link
                  to={ROUTES.bookDemo}
                  className="btn-primary w-full whitespace-nowrap px-3 py-2 text-xs sm:w-auto md:px-3.5 md:py-1.5"
                >
                  Book Free Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

type CoreHrDigitalRow = {
  employeeId: string;
  name: string;
  branch: string;
  employment: string;
  department: string;
  role: string;
  email: string;
  access: string;
};

const coreHrDigitalRows: CoreHrDigitalRow[] = [
  {
    employeeId: "Demo1",
    name: "Nandkishore Phalke",
    branch: "Pune",
    employment: "Full Time",
    department: "IT",
    role: "Manager",
    email: "nandkishore.phalke@demo.com",
    access: "MANAGERL1",
  },
  {
    employeeId: "Demo2",
    name: "Pratiksha Pawar",
    branch: "Pune",
    employment: "Full Time",
    department: "IT",
    role: "Staff",
    email: "pratiksha.pawar@demo.com",
    access: "ALLEMPLOYEE",
  },
  {
    employeeId: "Demo3",
    name: "Shraddha Jadhav",
    branch: "Pune",
    employment: "Full Time",
    department: "IT",
    role: "Staff",
    email: "shraddha.jadhav@demo.com",
    access: "HR",
  },
  {
    employeeId: "Demo4",
    name: "Pravin More",
    branch: "Pune",
    employment: "Full Time",
    department: "OPS",
    role: "Manager",
    email: "nalawadenisha14@gmail.com",
    access: "PAYROLLAPPROVER",
  },
  {
    employeeId: "Demo5",
    name: "Kishore Kumar",
    branch: "Bangalore",
    employment: "Part Time",
    department: "IT",
    role: "Manager",
    email: "kishore.kumar@demo.com",
    access: "MANAGERL1",
  },
  {
    employeeId: "Demo6",
    name: "Trupti Rane",
    branch: "Mumbai",
    employment: "Intern",
    department: "IT",
    role: "Staff",
    email: "trupti.rane@demo.com",
    access: "WORKFORCE",
  },
];

function CoreHrDigitalDashboardPreview() {
  const quickStats = [
    { label: "Active Profiles", value: "248", tone: "primary" as const, href: "#capabilities" },
    { label: "Departments", value: "12", tone: "violet" as const, href: "#guiding-principles" },
    { label: "Pending Approvals", value: "8", tone: "amber" as const, href: "#cta" },
    { label: "Policy Alerts", value: "3", tone: "success" as const, href: "#guiding-principles" },
  ];

  const orgUnits = [
    ["Corporate", 84],
    ["Operations", 62],
    ["Sales", 46],
    ["Support", 28],
  ] as const;

  const updateFeed = [
    { name: "Profile sync", detail: "22 records updated from import", time: "2m ago" },
    { name: "Approval flow", detail: "Policy change routed to HR", time: "8m ago" },
    { name: "Access review", detail: "Manager permissions refreshed", time: "14m ago" },
  ] as const;

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border bg-white text-ink shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
      <div className="flex items-center justify-between border-b border-border bg-surface/70 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary-soft text-sm font-black text-primary">
            C
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              Core HR live console
            </div>
            <div className="text-sm font-semibold text-ink">
              Employee records and governance
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm text-ink-soft md:flex">
          <Search className="h-4 w-4" />
          <span>Search employee...</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-white text-ink-soft shadow-sm"
            aria-label="Open notifications"
          >
            <Bell className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-white text-ink-soft shadow-sm lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="hidden items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm text-ink-soft lg:flex">
            <div className="grid h-6 w-6 place-items-center rounded-full bg-primary text-[10px] font-bold text-white">
              A
            </div>
            <span className="font-medium text-ink">HRMSDemo Admin</span>
            <SlidersHorizontal className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="grid min-h-[520px] lg:grid-cols-[220px_1fr]">
        <aside className="border-b border-border bg-[#f8fbff] p-4 lg:border-b-0 lg:border-r">
          <div className="rounded-full border border-border bg-white px-3 py-2 text-sm text-ink-soft">
            Search...
          </div>

          <div className="mt-4 space-y-1">
            {[
              { label: "Organization", active: true },
              { label: "Profiles", active: false },
              { label: "Workflows", active: false },
              { label: "Security", active: false },
              { label: "Analytics", active: false },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold ${
                  item.active
                    ? "bg-primary-soft text-primary ring-1 ring-primary/10"
                    : "text-ink-soft hover:bg-white"
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs opacity-50">›</span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[1.25rem] border border-border bg-white p-4 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Organization health
            </div>
            <div className="mt-3 flex items-end justify-between gap-3">
              <div>
                <div className="text-3xl font-black tracking-tight text-ink">92%</div>
                <div className="text-xs text-ink-soft">Profile completeness</div>
              </div>
              <div className="h-16 w-16 rounded-full bg-[conic-gradient(#3b82f6_0deg_332deg,#dbeafe_332deg_360deg)] p-2">
                <div className="h-full w-full rounded-full bg-white" />
              </div>
            </div>
          </div>
        </aside>

        <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.08),_transparent_32%),linear-gradient(180deg,#f8fbff_0%,#ffffff_34%,#ffffff_100%)] p-4 sm:p-5">
          <div className="pointer-events-none absolute -right-12 top-6 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-success/10 blur-3xl" />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                Live dashboard
              </div>
              <h3 className="mt-1 text-2xl font-black tracking-tight text-ink">Executive</h3>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm text-ink-soft shadow-sm">
              <CalendarDays className="h-4 w-4" />
              Today, 7 Jul 2026
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {quickStats.map((stat) => (
              <Link
                key={stat.label}
                to={stat.href}
                className="group rounded-[1.4rem] border border-border bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
                    {stat.label}
                  </div>
                  <span className="text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Open
                  </span>
                </div>
                <div className="mt-2 text-3xl font-black tracking-tight text-ink">{stat.value}</div>
                <div
                  className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    stat.tone === "primary"
                      ? "bg-primary-soft text-primary"
                      : stat.tone === "violet"
                        ? "bg-violet-100 text-violet-700"
                        : stat.tone === "amber"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-[#ecfdf3] text-success"
                  }`}
                >
                  Live sync
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-4 grid gap-3 xl:grid-cols-[1.05fr_0.95fr]">
            <Link
              to="#guiding-principles"
              className="group rounded-[1.5rem] border border-border bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-ink">Org structure</h4>
                  <p className="text-sm text-ink-soft">Reporting depth across the company</p>
                </div>
                <span className="rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                  View all
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {orgUnits.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[92px_1fr_44px] items-center gap-3">
                    <div className="text-xs font-semibold text-ink-soft">{label}</div>
                    <div className="h-3 rounded-full bg-slate-100">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-primary/70 via-primary to-success shadow-[0_0_14px_rgba(59,130,246,0.20)]"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <div className="text-right text-xs font-semibold text-ink-soft">{value}</div>
                  </div>
                ))}
              </div>
            </Link>

            <Link
              to="#cta"
              className="group rounded-[1.5rem] border border-border bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <h4 className="text-lg font-bold text-ink">Change log</h4>
              <p className="text-sm text-ink-soft">Recent updates to employee records</p>

              <div className="mt-4 space-y-3">
                {updateFeed.map((item) => (
                  <div key={item.name} className="rounded-2xl border border-border bg-surface p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold text-ink">{item.name}</div>
                      <span className="text-xs text-ink-soft">{item.time}</span>
                    </div>
                    <div className="mt-1 text-sm text-ink-soft">{item.detail}</div>
                  </div>
                ))}
              </div>
            </Link>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            <Link
              to="/products/workforce-management"
              className="group rounded-[1.5rem] border border-border bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-ink">Workflow queue</h4>
                  <p className="text-sm text-ink-soft">Items waiting for action</p>
                </div>
                <Workflow className="h-4 w-4 text-primary" />
              </div>
              <div className="mt-4 space-y-3">
                {["Onboarding", "Job changes", "Approvals"].map((label, index) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3"
                  >
                    <span className="text-sm text-ink">{label}</span>
                    <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                      {index + 1} pending
                    </span>
                  </div>
                ))}
              </div>
            </Link>

            <Link
              to="/products/core-hr#capabilities"
              className="group rounded-[1.5rem] border border-border bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-ink">Compliance</h4>
                  <p className="text-sm text-ink-soft">Policy coverage and access</p>
                </div>
                <ShieldCheck className="h-4 w-4 text-success" />
              </div>
              <div className="mt-4 space-y-3">
                {["Role-based access", "Audit trail", "Approval history"].map((label) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3"
                  >
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-sm text-ink">{label}</span>
                  </div>
                ))}
              </div>
            </Link>

            <Link
              to="/products/core-hr#guiding-principles"
              className="group rounded-[1.5rem] border border-border bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-ink">Reports</h4>
                  <p className="text-sm text-ink-soft">Export-ready employee data</p>
                </div>
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[44, 62, 56].map((height, index) => (
                  <div key={index} className="flex h-24 items-end">
                    <div
                      className="w-full rounded-t-2xl bg-gradient-to-t from-primary/70 to-success"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoreHrDigitalTablePreview() {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-float">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface/80 px-4 py-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Digital records
          </div>
          <div className="mt-1 text-sm font-semibold text-ink">Core HR employee grid</div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#ecfdf3] px-3 py-1.5 text-xs font-semibold text-success">
            <span className="h-2 w-2 rounded-full bg-success" />
            Live sync
          </span>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft shadow-sm transition-colors hover:bg-surface"
          >
            <Search className="h-3.5 w-3.5" />
            Search
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft shadow-sm transition-colors hover:bg-surface"
          >
            <Filter className="h-3.5 w-3.5" />
            Filter
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft shadow-sm transition-colors hover:bg-surface"
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-hidden pr-6 lg:pr-8">
        <div className="w-full">
          <div
            className="grid border-b border-border bg-surface/70 text-[10px] font-bold uppercase tracking-[0.16em] text-primary lg:text-[11px]"
            style={{ gridTemplateColumns: "56px 92px minmax(0,1.15fr) 90px 96px 72px 96px minmax(0,1.15fr) 112px" }}
          >
            {["#", "Employee ID", "Name", "Branch", "Employment", "Dept", "Role", "Email", "Access"].map(
              (header) => (
                <div key={header} className="px-3 py-3 lg:px-4">
                  {header}
                </div>
              ),
            )}
          </div>

          <div>
            {coreHrDigitalRows.map((row, index) => (
              <div
                key={row.employeeId}
                className={`grid items-center transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-[#fbfdff]"
                } hover:bg-primary-soft/35`}
                style={{ gridTemplateColumns: "56px 92px minmax(0,1.15fr) 90px 96px 72px 96px minmax(0,1.15fr) 112px" }}
              >
                <div className="px-3 py-3 lg:px-4">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="px-3 py-3 text-sm font-semibold text-ink-soft lg:px-4">{row.employeeId}</div>
                <div className="min-w-0 px-3 py-3 lg:px-4">
                  <div className="truncate text-sm font-semibold text-primary">{row.name}</div>
                  <div className="truncate text-xs text-ink-soft">Employee profile</div>
                </div>
                <div className="px-3 py-3 text-sm text-ink lg:px-4">{row.branch}</div>
                <div className="px-3 py-3 lg:px-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getEmploymentTone(
                      row.employment,
                    )}`}
                  >
                    {row.employment}
                  </span>
                </div>
                <div className="px-3 py-3 text-sm text-ink lg:px-4">{row.department}</div>
                <div className="px-3 py-3 lg:px-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getRoleTone(
                      row.role,
                    )}`}
                  >
                    {row.role}
                  </span>
                </div>
                <div className="min-w-0 px-3 py-3 lg:px-4">
                  <div className="truncate text-sm text-ink-soft">{row.email}</div>
                </div>
                <div className="min-w-0 px-3 py-3 lg:px-4">
                  <span className="flex w-full items-center justify-center overflow-hidden rounded-full bg-[#ecfdf3] px-2.5 py-1 text-[11px] font-semibold text-success whitespace-nowrap text-ellipsis lg:px-3 lg:text-xs">
                    {row.access}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-white px-4 py-3 text-xs text-ink-soft">
        <span>{coreHrDigitalRows.length} employee records displayed</span>
        <div className="flex flex-wrap gap-2">
          {["Active", "Inactive", "Onboarding"].map((label) => (
            <span key={label} className="rounded-full bg-surface px-3 py-1.5">
              {label}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function getEmploymentTone(value: string) {
  const normalized = value.toLowerCase();

  if (normalized.includes("full")) {
    return "bg-primary-soft text-primary";
  }

  if (normalized.includes("part")) {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-[#ecfdf3] text-success";
}

function getRoleTone(value: string) {
  const normalized = value.toLowerCase();

  if (normalized.includes("manager")) {
    return "bg-[#eff6ff] text-primary";
  }

  if (normalized.includes("director")) {
    return "bg-[#f3e8ff] text-[#7c3aed]";
  }

  if (normalized.includes("supervisor")) {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-surface text-ink-soft";
}
