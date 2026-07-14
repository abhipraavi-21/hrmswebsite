import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import TopNavbar from "@/components/site/TopNavbar";
import { modelScreenshots } from "@/lib/modelScreenshots";

const heroImage = modelScreenshots.workforceDashboard;
const heroImageMobile = modelScreenshots.workforceDashboard;
const tabImages = [
  {
    title: "Cutting Edge Yet Easy-To-Use",
    heading: "Zero clutter, 100% user-friendly",
    description:
      "Give teams ready-to-use time capture methods and employee self-service options through a simple, intuitive interface.",
    image: modelScreenshots.attendanceDashboard,
    quote:
      "We drive great employee experience by empowering them with an intuitive interface and seamless self-serve options.",
    person: "Rachel Thomas, Chief People Officer",
    badge: "QX_GG",
  },
  {
    title: "AI-Enabled Decision Making",
    heading: "Make faster and smarter decisions",
    description:
      "Use AI-driven nudges, insights, and custom dashboards to support planning and day-to-day workforce decisions.",
    image: modelScreenshots.performanceEvaluations,
    quote:
      "With AI-driven attendance and time-off analysis the system significantly aids our managers in tracking and planning.",
    person: "Senior HR specialist at an online jewellery brand",
    badge: "AI",
  },
  {
    title: "Highly Configurable and Scalable",
    heading: "Configure complex rules in minutes",
    description:
      "Adapt workforce management to your operating model and scale the setup as the business expands across locations.",
    image: modelScreenshots.assetsDashboard,
    quote:
      "We needed a system that could adapt to our unique operating model and harmonize across multiple geographies. Darwinbox has provided exactly that.",
    person: "Cezary Kuziemski, Head of People",
    badge: "CX",
  },
];

const capabilityCards = [
  {
    icon: <Clock3 className="h-5 w-5" />,
    title: "Shift planning",
    desc: "Plan schedules with enough structure to keep operations moving without overcomplicating the workflow.",
  },
  {
    icon: <CalendarDays className="h-5 w-5" />,
    title: "Attendance and leave",
    desc: "Bring attendance, time-off, and approvals together so data stays consistent across the workforce flow.",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Multi-location support",
    desc: "Handle distributed, shift-based, and frontline teams while keeping policies centered and visible.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Policy automation",
    desc: "Apply location-specific rules for working hours, overtime thresholds, rest periods, and leave policies.",
  },
];

const faqItems = [
  {
    q: "What is workforce management (WFM)?",
    a: "WFM software helps organizations plan, schedule, track, and optimize employee work across shifts, sites, and roles. It usually combines shift scheduling, attendance capture, leave handling, overtime monitoring, and workforce analytics.",
  },
  {
    q: "What are the key functions of workforce management software?",
    a: "The core functions are scheduling, attendance tracking, leave policy management, overtime control, approvals, and visibility into workforce availability. Mobile and web access make it easier for employees and managers to interact with the system.",
  },
  {
    q: "How do workforce management solutions improve productivity?",
    a: "They reduce manual scheduling work, give leaders real-time visibility, and help employees self-serve routine tasks like checking shifts or requesting leave. That frees HR teams and improves operational efficiency.",
  },
  {
    q: "What should enterprises consider when choosing a WFM platform?",
    a: "Look for scalability, multi-location support, compliance controls, mobile capture, and native integration with core HR and payroll so data flows cleanly across the system.",
  },
  {
    q: "How does Darwinbox Workforce Management compare to legacy HR systems?",
    a: "It unifies scheduling, attendance, leave, and payroll inputs in one cloud platform instead of pushing teams to reconcile separate tools and spreadsheets.",
  },
  {
    q: "Can Darwinbox handle multi-location, shift-based, and deskless workforces?",
    a: "Yes. The platform is built for distributed and frontline teams with configurable shift patterns, mobile access, and centralized visibility across regions.",
  },
  {
    q: "Does Darwinbox integrate with payroll and time & attendance systems?",
    a: "Yes. Attendance, overtime, leave, and schedules flow into payroll and time & attendance processes so teams do less manual reconciliation.",
  },
  {
    q: "How does Darwinbox ensure labor law compliance across regions?",
    a: "It lets organizations define location-specific rules for working hours, overtime, rest periods, and leave, then applies them consistently in scheduling and attendance workflows.",
  },
  {
    q: "How long does it take to implement workforce management in Darwinbox?",
    a: "Implementation depends on workforce size and complexity, but it usually includes scheduling rules, capture methods, leave policies, and approval workflows. Many teams roll it out in phases.",
  },
  {
    q: "How is Darwinbox Workforce Management priced for large enterprises?",
    a: "Pricing typically follows a per-employee-per-month model and can be deployed on its own or alongside other HR modules.",
  },
];

export default function WorkforceManagementPage() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = tabImages[activeTab];

  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x py-12 lg:py-16">
            <div className="mx-auto max-w-3xl text-center fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Workforce Management
              </span>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Simplify scheduling, tracking, and approvals
              </h1>
              <p className="mt-4 text-base text-ink-soft">
                Plan, deploy, and optimize your workforce across regions and business units with
                shift planning, demand-aware rostering, attendance tracking, overtime management,
                policy automation, and payroll-ready workforce data.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href="/company/book-demo" className="btn-primary">
                  Schedule a demo
                </a>
                <a href="#why-wfm" className="btn-outline">
                  Explore WFM
                </a>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Plan", value: "smarter shifts" },
                { label: "Track", value: "real-time attendance" },
                { label: "Approve", value: "with less manual work" },
              ].map((item) => (
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
              <div className="flex h-[92vh] items-center overflow-hidden bg-white sm:h-[96vh]">
                <picture className="block h-full w-full">
                  <source media="(max-width: 767px)" srcSet={heroImageMobile} />
                  <img
                    src={heroImage}
                    alt="Workforce management dashboard preview"
                    className="block h-full w-full origin-top scale-[1.58] transform-gpu rounded-none object-cover bg-white sm:scale-[1.68] lg:scale-[1.82]"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                </picture>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Workforce value
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Designed to reduce clutter, complexity, and confusion
              </h2>
              <p className="mt-3 text-ink-soft">
                This page keeps the same major ideas as the source: easier scheduling, stronger
                employee experience, better compliance, and smoother decisions for managers.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {capabilityCards.map((card) => (
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

        <section id="why-wfm" className="bg-surface py-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Why choose Darwinbox for WFM?
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Remove clutter, complexity, and confusion from workforce management
              </h2>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="soft-card p-3">
                  <div className="grid gap-2">
                    {tabImages.map((item, index) => {
                      const isActive = index === activeTab;
                      return (
                        <button
                          key={item.title}
                          type="button"
                          onClick={() => setActiveTab(index)}
                          className={`rounded-2xl border px-4 py-3 text-left transition-colors ${
                            isActive
                              ? "border-primary bg-primary-soft text-primary"
                              : "border-border bg-white text-ink hover:border-primary/35"
                          }`}
                        >
                          <div className="text-xs font-bold uppercase tracking-wider">
                            {item.title}
                          </div>
                          <div className="mt-1 text-sm text-ink-soft">{item.heading}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <article className="soft-card overflow-hidden p-0">
                  <div className="grid gap-0 lg:grid-cols-2">
                    <div className="bg-white">
                      <img
                        src={tab.image}
                        alt={tab.title}
                        className="block h-auto w-full object-contain bg-white"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                        <div className="rounded-full bg-primary-soft px-2 py-1 text-[10px] font-bold">
                          {tab.badge}
                        </div>
                        {tab.title}
                      </div>
                      <h3 className="mt-4 text-2xl font-bold text-ink">{tab.heading}</h3>
                      <p className="mt-3 text-sm text-ink-soft">{tab.description}</p>

                      <div className="mt-6 rounded-2xl border border-border bg-surface p-4">
                        <p className="text-sm font-medium text-ink">"{tab.quote}"</p>
                        <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-primary">
                          {tab.person}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12">
            <div className="soft-card p-6 lg:col-span-8">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                What WFM includes
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                Core controls that keep workforce operations connected
              </h3>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  "Shift scheduling across locations and roles",
                  "Attendance capture through mobile, web, and devices",
                  "Leave and absence management in the same flow",
                  "Overtime monitoring with policy guardrails",
                  "Manager approvals with visible status updates",
                  "Payroll-ready workforce data without manual cleanup",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="soft-card p-6 lg:col-span-4">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Interactive demo
              </div>
              <div className="mt-2 text-2xl font-bold text-ink">
                Try Time & Attendance in real time
              </div>
              <p className="mt-3 text-sm text-ink-soft">
                The source page points visitors to an interactive product tour. This version keeps
                that same intent with a cleaner in-app CTA.
              </p>

              <div className="mt-6 rounded-2xl bg-primary-soft p-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-white">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink">Product tour</div>
                    <div className="text-xs text-ink-soft">See workforce workflows in action.</div>
                  </div>
                </div>
              </div>

              <a href="/company/book-demo" className="btn-primary mt-6 w-full">
                Explore demo <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">FAQs</span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Common questions about workforce management
              </h2>
              <p className="mt-3 text-ink-soft">
                These questions mirror the source page’s FAQ section and keep the key facts intact.
              </p>
            </div>

            <div className="mt-10 grid gap-4">
              {faqItems.map((item) => (
                <details key={item.q} className="soft-card p-5 group">
                  <summary className="cursor-pointer list-none text-base font-bold text-ink">
                    <span>{item.q}</span>
                  </summary>
                  <p className="mt-3 text-sm text-ink-soft">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
