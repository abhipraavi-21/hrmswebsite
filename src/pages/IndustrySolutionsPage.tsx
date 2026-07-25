import { useEffect } from "react";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  Construction,
  Factory,
  GraduationCap,
  HeartPulse,
  Hotel,
  Laptop,
  MapPin,
  ShoppingBag,
  Sparkles,
  Truck,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import TopNavbar from "@/components/site/TopNavbar";

const industryCards = [
  {
    title: "Manufacturing",
    icon: Factory,
    desc: "Shift-heavy operations, overtime visibility, and payroll-ready attendance records.",
  },
  {
    title: "IT and Software",
    icon: Laptop,
    desc: "Flexible schedules, hybrid teams, self-service requests, and performance workflows.",
  },
  {
    title: "Healthcare and Hospitals",
    icon: HeartPulse,
    desc: "Round-the-clock staffing, department attendance, and shift planning support.",
  },
  {
    title: "Construction",
    icon: Construction,
    desc: "Project-site attendance, contract workers, and location-based workforce records.",
  },
  {
    title: "Retail",
    icon: ShoppingBag,
    desc: "Branch-wise attendance, shift coverage, and store-level workforce visibility.",
  },
  {
    title: "Education",
    icon: GraduationCap,
    desc: "Teaching and non-teaching staff records, campus reporting, and leave planning.",
  },
  {
    title: "Logistics and Transport",
    icon: Truck,
    desc: "Mobile workforce management across hubs, warehouses, and field teams.",
  },
  {
    title: "Facility Management",
    icon: Building2,
    desc: "Client-site shifts, attendance tracking, and location-wise workforce coordination.",
  },
  {
    title: "Hospitality",
    icon: Hotel,
    desc: "24x7 rosters, department schedules, and smoother daily workforce operations.",
  },
];

const capabilityPills = [
  { icon: Workflow, label: "Shift Management" },
  { icon: CalendarDays, label: "Attendance Tracking" },
  { icon: Wallet, label: "Payroll Processing" },
  { icon: Users, label: "Employee Records" },
  { icon: MapPin, label: "Multi-Location Management" },
  { icon: BarChart3, label: "Reports and Analytics" },
];

const benefits = [
  "Helps reduce manual HR work",
  "Supports attendance visibility",
  "Simplifies payroll preparation",
  "Centralizes employee records",
  "Supports multi-location workforce management",
  "Improves shift planning",
];

export default function IndustrySolutionsPage() {
  useEffect(() => {
    const previousTitle = document.title;
    const description =
      "Explore industry-specific HRMS solutions for manufacturing, IT, healthcare, construction, retail, education, logistics, facility management, and hospitality with Altroz HRMS.";
    const head = document.head;

    document.title = "Industry-Wise HRMS Solutions in Pune | Altroz HRMS";

    let meta = head.querySelector<HTMLMetaElement>('meta[name="description"]');
    const createdMeta = !meta;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      head.appendChild(meta);
    }
    meta.content = description;

    let canonical = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const createdCanonical = !canonical;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      head.appendChild(canonical);
    }
    canonical.href = new URL("/industry-solutions", window.location.origin).href;

    return () => {
      document.title = previousTitle;
      if (createdMeta) meta?.remove();
      if (createdCanonical) canonical?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-success/10 blur-3xl" />

          <div className="container-x grid gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:py-12">
            <div className="lg:pt-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Industry-Wise HRMS Solutions
              </span>

              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
                HRMS Software Designed for Every Industry
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
                Altroz HRMS helps businesses manage attendance, payroll, leave, employee records,
                recruitment, compliance, and workforce reporting from one centralized platform.
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-ink-soft">
                From startups and SMEs to large enterprises, Altroz HRMS can be configured to fit
                different workforce structures, locations, shifts, and operating requirements.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href="/company/book-demo" className="btn-primary">
                  Book Free Demo
                </a>
                <a href="#industries" className="btn-outline">
                  Explore Industries
                </a>
              </div>
            </div>

            <div className="lg:self-start lg:pt-2">
              <div className="soft-card relative overflow-hidden p-4 sm:p-5">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 popup-blue-band" />
                <div className="grid gap-4 sm:grid-cols-2">
                  {industryCards.slice(0, 4).map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-border bg-white p-4 shadow-card"
                      >
                        <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                          <Icon className="h-4 w-4 text-primary" />
                          {item.title}
                        </div>
                        <p className="mt-2 text-xs leading-5 text-ink-soft">{item.desc}</p>
                      </div>
                    );
                  })}
                  <div className="rounded-2xl border border-border bg-surface p-4 sm:col-span-2">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                      Central workforce dashboard
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {[
                        { label: "Attendance", value: "Configured" },
                        { label: "Shifts", value: "Managed" },
                        { label: "Reports", value: "Available" },
                      ].map((metric) => (
                        <div key={metric.label} className="rounded-xl bg-white p-3 shadow-sm">
                          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                            {metric.label}
                          </div>
                          <div className="mt-1 text-sm font-bold text-ink">{metric.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {industryCards.slice(4, 8).map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-border bg-white p-4 shadow-card"
                      >
                        <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                          <Icon className="h-4 w-4 text-primary" />
                          {item.title}
                        </div>
                        <p className="mt-2 text-xs leading-5 text-ink-soft">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-white">
          <div className="container-x py-5">
            <div className="flex gap-3 overflow-x-auto pb-1">
              {capabilityPills.map((item) => {
                const Icon = item.icon;
                return (
                  <span
                    key={item.label}
                    className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm font-medium text-ink shadow-sm"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {item.label}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        <section id="industries" className="py-16 lg:py-20">
          <div className="container-x">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                Industry-specific workflows
              </span>
              <h2 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">
                Industry-focused HRMS that adapts to the way teams actually work
              </h2>
              <p className="mt-4 text-base leading-7 text-ink-soft">
                Different industries need different workforce structures. Altroz HRMS helps
                organizations configure attendance, shifts, leave, employee records, and reporting
                according to their business model.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {industryCards.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="soft-card p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-lg font-bold text-ink">
                        <Icon className="h-5 w-5 text-primary" />
                        {item.title}
                      </div>
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-ink-soft">{item.desc}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
                      <CheckCircle2 className="h-4 w-4" />
                      Built for industry-specific operations
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-surface/50 lg:py-20">
          <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-bold text-ink sm:text-4xl">
                Why industry-specific HRMS matters
              </h2>
              <p className="mt-4 text-sm leading-7 text-ink-soft">
                Manufacturing may need rotational shifts and overtime visibility. IT may need
                flexible schedules and self-service. Hospitals, retail, construction, logistics, and
                hospitality each have their own workforce rhythm.
              </p>
            </div>

            <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
              {benefits.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-border bg-white p-4 shadow-card"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <div className="text-sm font-medium text-ink">{item}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-[#0a4fda] p-8 text-center text-white md:p-12">
              <div className="absolute -right-16 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-16 left-0 h-56 w-56 rounded-full bg-success/20 blur-3xl" />
              <div className="relative">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Find the right HRMS solution for your industry
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
                  Simplify attendance, payroll, leave, employee records, shifts, reporting, and
                  workforce management with Altroz HRMS.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <a
                    href="/company/book-demo"
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft"
                  >
                    Book Your Free Demo Today
                  </a>
                  <a
                    href="/company/contact-us"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    Talk to Our HRMS Expert
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
