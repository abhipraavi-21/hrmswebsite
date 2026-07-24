import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Mail, TrendingUp, Users, Wallet } from "lucide-react";
import { ROUTES } from "@/routes/routeConfig.js";
import AnimatedCounter from "./AnimatedCounter";
import { ScrollReveal } from "./ScrollReveal";

export default function DashboardShowcase() {
  const dashboardSections = [
    { label: "Overview", href: ROUTES.analytics },
    { label: "Attendance", href: ROUTES.attendanceManagement },
    { label: "Payroll", href: ROUTES.payroll },
    { label: "Employees", href: ROUTES.coreHR },
    { label: "Leaves", href: ROUTES.leaveManagement },
    { label: "Campaigns", href: ROUTES.bulkEmailCampaigns },
    { label: "Reports", href: ROUTES.reports },
  ];

  const dashboardStats = [
    {
      icon: <Clock />,
      label: "Present",
      value: 248,
      href: ROUTES.attendanceManagement,
      tone: "primary" as const,
      helper: "Open attendance",
    },
    {
      icon: <Users />,
      label: "Total",
      value: 312,
      href: ROUTES.coreHR,
      tone: "primary" as const,
      helper: "View employees",
    },
    {
      icon: <Wallet />,
      label: "Payroll",
      value: 18.4,
      prefix: "₹",
      suffix: "L",
      href: ROUTES.payroll,
      tone: "success" as const,
      helper: "Run payroll",
    },
    {
      icon: <Mail />,
      label: "Sent",
      value: 42.3,
      suffix: "K",
      href: ROUTES.bulkEmailAnalytics,
      tone: "success" as const,
      helper: "Track campaigns",
    },
  ];

  return (
    <section id="integrations" className="section bg-white scroll-mt-24">
      <div className="site-container">
        <ScrollReveal variant="fade-up" className="section-heading">
          <span className="eyebrow text-xs font-bold uppercase tracking-wider text-primary">
            Live Dashboard
          </span>
          <h2 className="text-3xl font-bold text-ink md:text-4xl">One dashboard. Total clarity.</h2>
          <p className="text-ink-soft">
            Click any module to drill into attendance, payroll, reports, or campaigns in real time.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="scale" delay={120} className="relative mt-8">
          <div className="absolute inset-0 -m-4 rounded-3xl hero-gradient" />
          <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-float">
            <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <div className="ml-auto hidden items-center gap-2 text-xs text-ink-soft md:flex">
                <span>Interactive digital dashboard</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-12">
              <div className="space-y-1.5 md:col-span-3">
                {dashboardSections.map((item, index) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${
                      index === 0
                        ? "bg-primary-soft font-semibold text-primary"
                        : "text-ink-soft hover:bg-surface hover:text-ink"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" /> {item.label}
                  </Link>
                ))}
              </div>

              <div className="space-y-4 md:col-span-9">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {dashboardStats.map((stat) => (
                    <MiniStat
                      key={stat.label}
                      icon={stat.icon}
                      label={stat.label}
                      value={stat.value}
                      href={stat.href}
                      helper={stat.helper}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      tone={stat.tone}
                    />
                  ))}
                </div>

                <Link
                  to={ROUTES.attendanceManagement}
                  className="block rounded-xl border border-border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md md:p-5"
                  aria-label="Open attendance trend dashboard"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-ink">Attendance Trend</div>
                    <span className="flex items-center gap-1 text-xs text-success">
                      <TrendingUp className="h-3 w-3" /> +4.2%
                    </span>
                  </div>
                  <div className="mt-4 flex h-32 items-end gap-1.5 sm:h-36 md:h-40">
                    {[40, 65, 50, 75, 60, 85, 70, 90, 78, 95, 82, 88].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-md bg-gradient-to-t from-primary/60 to-primary"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3 text-xs text-ink-soft">
                    <span className="rounded-full bg-surface px-3 py-1">Live attendance data</span>
                    <span className="rounded-full bg-surface px-3 py-1">Weekly dashboard view</span>
                    <span className="rounded-full bg-surface px-3 py-1">Manager-ready summary</span>
                    <span className="rounded-full bg-primary-soft px-3 py-1 font-medium text-primary">
                      Tap to open
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <Link
              to={ROUTES.attendanceManagement}
              className="absolute -left-6 top-1/3 block soft-card p-3 float-slow transition-transform hover:-translate-y-1"
            >
              <div className="text-xs text-ink-soft">Late arrivals today</div>
              <div className="text-lg font-bold text-ink">
                <AnimatedCounter value={7} />
              </div>
            </Link>
            <Link
              to={ROUTES.bulkEmailAnalytics}
              className="absolute -right-6 bottom-12 block soft-card p-3 float-slow transition-transform hover:-translate-y-1"
            >
              <div className="text-xs text-ink-soft">Email delivery rate</div>
              <div className="text-lg font-bold text-success">
                <AnimatedCounter value={99.2} decimals={1} suffix="%" />
              </div>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function MiniStat({
  icon,
  label,
  value,
  href,
  helper,
  prefix = "",
  suffix = "",
  tone,
}: {
  icon: ReactNode;
  label: string;
  value: number;
  href: string;
  helper: string;
  prefix?: string;
  suffix?: string;
  tone: "primary" | "success";
}) {
  return (
    <Link
      to={href}
      className="group rounded-xl border border-border p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div
        className={`grid h-8 w-8 place-items-center rounded-md ${
          tone === "primary" ? "bg-primary-soft text-primary" : "bg-[#dcfce7] text-success"
        } [&>svg]:h-4 [&>svg]:w-4`}
      >
        {icon}
      </div>
      <div className="mt-2 text-xs text-ink-soft">{label}</div>
      <div className="text-lg font-bold text-ink">
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} decimals={suffix ? 1 : 0} />
      </div>
      <div className="mt-1 text-[11px] text-primary opacity-0 transition-opacity group-hover:opacity-100">
        {helper}
      </div>
    </Link>
  );
}
