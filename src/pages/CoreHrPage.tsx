import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  CircleGauge,
  FileText,
  Globe,
  Lock,
  ScanText,
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
  desktop: modelScreenshots.coreHrTable,
  mobile: modelScreenshots.coreHrTable,
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

const highlights = [
  { label: "System of record", value: "Employee and org data" },
  { label: "Workflow layer", value: "Approvals and automation" },
  { label: "Global ready", value: "Multi-country governance" },
];

export default function CoreHrPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x py-12 lg:py-16">
            <div className="mx-auto max-w-4xl text-center fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Global HR Core
              </span>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-ink sm:text-5xl">
                One Core HR foundation for people data, workflows, and global control
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base text-ink-soft">
                Keep employee records, org structures, approval flows, and reporting in a single
                system so HR can stay accurate as the business expands into new markets.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href="/company/book-demo" className="btn-primary">
                  Book a demo
                </a>
                <a href="#capabilities" className="btn-outline">
                  Explore core capabilities
                </a>
              </div>
            </div>

            <div className="relative mx-auto mt-10 max-w-7xl">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2.25rem] border border-border bg-white p-4 shadow-float sm:p-5">
                <div className="overflow-hidden rounded-[1.75rem] border border-border bg-surface">
                  <div className="aspect-[3/1] w-full bg-white p-2 sm:p-3">
                    <img
                      src={heroImages.desktop}
                      alt="Darwinbox Core HR dashboard hero"
                      className="hidden h-full w-full object-contain bg-white md:block lg:object-cover lg:object-top"
                    />
                    <img
                      src={heroImages.mobile}
                      alt="Darwinbox Core HR mobile hero"
                      className="h-full w-full object-contain bg-white md:hidden"
                    />
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-primary/5 p-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                      <Users className="h-4 w-4" />
                      System of record
                    </div>
                    <p className="mt-3 text-sm text-ink-soft">
                      Keep employee details, job history, and structure aligned across every HR
                      touchpoint.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#ecfdf3] p-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-success">
                      <Lock className="h-4 w-4" />
                      Guardrails built in
                    </div>
                    <p className="mt-3 text-sm text-ink-soft">
                      Make sensitive data available only to the right people with clear permissions
                      and trails.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-primary-soft p-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                      <Workflow className="h-4 w-4" />
                      Action layer
                    </div>
                    <p className="mt-3 text-sm text-ink-soft">
                      Move updates, approvals, and exceptions through guided workflows instead of
                      manual chase-ups.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {highlights.map((item) => (
                    <div key={item.label} className="soft-card p-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {item.label}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-ink">{item.value}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    "Central source of truth",
                    "No-code HR orchestration",
                    "Secure self-service updates",
                  ].map((item) => (
                    <div
                      key={item}
                      className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm font-medium text-ink shadow-card"
                    >
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="capabilities" className="py-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Core capabilities
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                The pieces that make the HR core useful every day
              </h2>
              <p className="mt-3 text-ink-soft">
                This version keeps the same product themes from the reference page, but the copy is
                rewritten for this app and organized into a cleaner, more flexible layout.
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
              <div className="soft-card p-5 lg:col-span-4 lg:self-start">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  AI-ready visuals
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">
                  Add a proper AI image story under the core capabilities
                </h3>
                <p className="mt-3 text-sm text-ink-soft">
                  This visual block uses a real project asset so the section feels more grounded,
                  more modern, and less like a placeholder illustration strip.
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    "AI-assisted capture that feels product-first",
                    "Real dashboard visuals instead of generic stock art",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                      <BadgeCheck className="mt-0.5 h-4 w-4 text-success" />
                      <span className="text-sm text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 lg:col-span-8 sm:grid-cols-2">
                <article className="soft-card overflow-hidden p-0">
                  <div className="aspect-[624/484] bg-white">
                    <img
                      src={modelScreenshots.demoFormAi}
                      alt="AI-generated HRMS dashboard illustration"
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </article>

                <article className="soft-card overflow-hidden p-0">
                  <div className="aspect-[624/484] bg-surface">
                    <img
                      src={modelScreenshots.coreHrTable}
                      alt="Core HR data table preview"
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </article>
              </div>
            </div>

            <div className="mt-10 overflow-hidden rounded-[2.5rem] border border-border bg-white shadow-float">
              <div className="overflow-hidden border-b border-border bg-surface">
                <div className="aspect-[18/7] w-full bg-white">
                  <img
                    src={modelScreenshots.generatedDocuments}
                    alt="Generated documents dashboard preview"
                    className="h-full w-full object-contain object-top bg-white lg:object-cover lg:object-top"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="grid gap-6 p-6 lg:grid-cols-12">
                <div className="soft-card p-6 lg:col-span-7">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-primary">
                        What it covers
                      </div>
                      <h3 className="mt-1 text-2xl font-bold text-ink">
                        A practical set of Core HR controls for global teams
                      </h3>
                    </div>
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-success text-white">
                      <BadgeCheck className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      "Employee master data that stays consistent across the organization",
                      "Document storage with traceable record updates and approvals",
                      "Role-based access that matches how different teams operate",
                      "Regional policy handling for distributed and multi-country orgs",
                      "Self-service updates that reduce repetitive HR admin work",
                      "Reporting-ready data that flows into analytics and planning",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                        <div className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-white">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-sm font-medium text-ink">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="soft-card overflow-hidden lg:col-span-5">
                  <div className="p-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-primary">
                      Document records
                    </div>
                    <div className="mt-2 text-2xl font-bold text-ink">
                      A single HR core that connects records, actions, and insights
                    </div>
                    <p className="mt-3 text-sm text-ink-soft">
                      Core HR works best when documents, approvals, and change history stay tied to
                      the employee record. That is the story this page is built around.
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
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="guiding-principles" className="bg-surface py-20">
          <div className="container-x">
            <div className="max-w-2xl">
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
          <div className="container-x grid gap-6 lg:grid-cols-12">
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
          <div className="container-x">
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
