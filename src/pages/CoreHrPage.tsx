import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  CircleGauge,
  Download,
  FileText,
  Globe,
  Filter,
  ScanText,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import TopNavbar from "@/components/site/TopNavbar";
import MainNavbar from "@/components/site/MainNavbar";
import Footer from "@/components/site/Footer";
import { modelScreenshots } from "@/lib/modelScreenshots";

const heroImages = {
  desktop: modelScreenshots.workforceDashboard,
  mobile: modelScreenshots.workforceDashboard,
  sapien:
    "https://a-us.storyblok.com/f/1019507/1728x972/638c6764cb/darwinbox-sapien-video-thumbnail.webp",
};

const capabilityImages = {
  organization:
    "https://images.pexels.com/photos/7693734/pexels-photo-7693734.jpeg?cs=srgb&dl=pexels-yankrukov-7693734.jpg&fm=jpg",
  profiles:
    "https://images.pexels.com/photos/7989139/pexels-photo-7989139.jpeg?cs=srgb&dl=pexels-mikhail-nilov-7989139.jpg&fm=jpg",
  workflow:
    "https://images.pexels.com/photos/7213548/pexels-photo-7213548.jpeg?cs=srgb&dl=pexels-ivan-s-7213548.jpg&fm=jpg",
  compliance:
    "https://images.pexels.com/photos/7640478/pexels-photo-7640478.jpeg?cs=srgb&dl=pexels-yankrukov-7640478.jpg&fm=jpg",
  extensibility:
    "https://images.pexels.com/photos/4623365/pexels-photo-4623365.jpeg?cs=srgb&dl=pexels-ketut-subiyanto-4623365.jpg&fm=jpg",
  analytics:
    "https://images.pexels.com/photos/8117466/pexels-photo-8117466.jpeg?cs=srgb&dl=pexels-ivan-s-8117466.jpg&fm=jpg",
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

      <main>
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

            <div className="relative mx-auto mt-5 max-w-6xl overflow-hidden rounded-[2.25rem] border border-border bg-white shadow-float">
              <div className="relative h-[22rem] overflow-hidden bg-white sm:h-[24rem] lg:h-[26rem]">
                <img
                  src={heroImages.desktop}
                  alt="Darwinbox Core HR dashboard hero"
                  className="hidden h-full w-full object-cover object-top bg-white p-2 md:block lg:p-2"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <img
                  src={heroImages.mobile}
                  alt="Darwinbox Core HR mobile hero"
                  className="h-full w-full object-cover object-top bg-white p-2 md:hidden"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>
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
                  <div className="aspect-[624/484] overflow-hidden bg-surface">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
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

        <section id="cta" className="py-20">
          <div className={pageContainerClass}>
            <div className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">
                    Ready to explore
                  </div>
                  <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                    Put a stronger Core HR foundation under your people operations
                  </h2>
                  <p className="mt-3 max-w-2xl text-ink-soft">
                    This page now carries the same product themes as the source page, but the
                    wording, structure, and implementation are original to your site.
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
                  <a href="#guiding-principles" className="btn-outline">
                    Review sections
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
