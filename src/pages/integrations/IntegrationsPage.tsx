import { Link } from "react-router-dom";
import {
  ArrowRight,
  Cable,
  CreditCard,
  Database,
  Fingerprint,
  Laptop2,
  MessageSquareMore,
  Palette,
  PlugZap,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import TopNavbar from "@/components/site/TopNavbar";
import PageSEO from "@/components/site/PageSEO";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { ROUTES } from "@/routes/routeConfig.js";

const categories = [
  "Biometric devices",
  "Attendance machines",
  "Accounting software",
  "Payroll systems",
  "Business applications",
  "APIs",
  "Employee data import",
  "Email and notification tools",
];

const integrationCards = [
  {
    title: "Biometric Integration",
    desc: "Connect attendance hardware and sync records into the attendance workflow.",
    icon: <Fingerprint className="h-5 w-5" />,
    href: `${ROUTES.attendanceManagement}#attendance-features`,
  },
  {
    title: "Accounting Integration",
    desc: "Move payroll and finance data into accounting with less manual cleanup.",
    icon: <CreditCard className="h-5 w-5" />,
    href: ROUTES.accounting,
  },
  {
    title: "Payroll Integration",
    desc: "Keep salary, deductions, and approvals aligned with payroll-ready records.",
    icon: <Wallet className="h-5 w-5" />,
    href: ROUTES.payroll,
  },
  {
    title: "Business App Integration",
    desc: "Send alerts, updates, and approvals into the tools your teams already use.",
    icon: <MessageSquareMore className="h-5 w-5" />,
    href: ROUTES.businessApps,
  },
  {
    title: "API Integration",
    desc: "Use API-driven workflows for structured data movement and automation.",
    icon: <PlugZap className="h-5 w-5" />,
    href: ROUTES.devicesApi,
  },
  {
    title: "Attendance Device Integration",
    desc: "Connect scanners and devices to keep attendance capture consistent across locations.",
    icon: <ScanLine className="h-5 w-5" />,
    href: ROUTES.attendance,
  },
];

const supportingTiles = [
  {
    title: "Employee data import",
    desc: "Bring records in from clean, reviewable sources before going live.",
    icon: <Database className="h-5 w-5" />,
  },
  {
    title: "Notification tools",
    desc: "Trigger alerts and reminders without copying updates by hand.",
    icon: <MessageSquareMore className="h-5 w-5" />,
  },
  {
    title: "Device sync",
    desc: "Keep local capture devices and cloud records aligned.",
    icon: <Cable className="h-5 w-5" />,
  },
  {
    title: "Secure transfer",
    desc: "Move operational data with role-based controls in place.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Connect Altroz HRMS with Your Business Tools"
        description="Explore how Altroz HRMS connects attendance devices, accounting tools, payroll workflows, business apps, and APIs."
        canonicalPath={ROUTES.integrations}
      />
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden py-20">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="site-container grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Integrations hub
              </span>
              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Connect Altroz HRMS with Your Business Tools
              </h1>
              <p className="mt-4 max-w-xl text-base text-ink-soft">
                Keep attendance capture, payroll handoff, accounting sync, business app alerts, and
                API-driven data movement aligned without forcing teams into unrelated workflows.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={ROUTES.bookDemo} className="btn-primary">
                  Book Free Demo
                </Link>
                <Link to={ROUTES.contact} className="btn-outline">
                  Talk to Our Expert
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-[2rem] border border-border bg-white p-5 shadow-float">
                <div className="grid gap-3 sm:grid-cols-2">
                  {supportingTiles.map((tile) => (
                    <div key={tile.title} className="soft-card p-4">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                        {tile.icon}
                      </div>
                      <div className="mt-4 text-sm font-semibold text-ink">{tile.title}</div>
                      <p className="mt-2 text-sm text-ink-soft">{tile.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="site-container">
            <ScrollReveal variant="fade-up" className="section-heading text-left">
              <span className="eyebrow text-xs font-bold uppercase tracking-wider text-primary">
                Integration categories
              </span>
              <h2 className="text-3xl font-bold text-ink sm:text-4xl">
                The systems Altroz HRMS can connect with
              </h2>
              <p className="text-ink-soft">
                Keep connected workflows focused on the tools and data streams that matter to HR,
                payroll, finance, and operations.
              </p>
            </ScrollReveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {categories.map((item) => (
                <div key={item} className="soft-card flex items-center justify-between gap-3 p-4">
                  <span className="text-sm font-semibold text-ink">{item}</span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-surface">
          <div className="site-container">
            <ScrollReveal variant="fade-up" className="section-heading text-left">
              <span className="eyebrow text-xs font-bold uppercase tracking-wider text-primary">
                Integration cards
              </span>
              <h2 className="text-3xl font-bold text-ink sm:text-4xl">
                Explore the most relevant connected workflows
              </h2>
            </ScrollReveal>

            <StaggerReveal step={80} className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {integrationCards.map((card) => (
                <Link
                  key={card.title}
                  to={card.href}
                  className="content-card soft-card group block h-full"
                >
                  <div className="flex h-full flex-col">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                      {card.icon}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{card.title}</h3>
                    <p className="mt-2 text-sm text-ink-soft">{card.desc}</p>
                    <div className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </StaggerReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
