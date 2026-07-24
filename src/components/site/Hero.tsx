import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock,
  Mail,
  Sparkles,
  Star,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import { ScrollReveal } from "./ScrollReveal";
import { ROUTES } from "@/routes/routeConfig.js";

export default function Hero() {
  return (
    <section id="demo" className="hero-section hero-gradient relative overflow-hidden scroll-mt-24">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

      <div className="site-container grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="hero-content lg:col-span-6">
          <ScrollReveal variant="fade-up" delay={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
              <Sparkles className="h-3.5 w-3.5" /> All-in-one cloud platform
            </span>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={100}>
            <h1 className="mt-4 max-w-3xl text-balance text-[2rem] font-bold leading-[1.08] text-ink sm:text-4xl lg:text-[2.85rem] xl:text-5xl">
              Complete{" "}
              <span className="relative inline-block">
                <span className="relative z-10">HRMS</span>
                <span className="absolute inset-x-0 bottom-1 -z-0 h-2.5 rounded bg-success/25" />
              </span>
              , Payroll & Attendance
              <span className="block">Platform for Growing Teams</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={190}>
            <p className="mt-3 max-w-xl text-sm text-ink-soft md:text-base">
              Manage employees, attendance, payroll and leaves from one powerful cloud platform.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={280}>
            <div className="button-group mt-5">
              <Link to={ROUTES.bookDemo} className="btn-success">
                Book Free Demo
              </Link>
              <Link to="/#features" className="btn-outline">
                Explore Features
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={360}>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-soft">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-success" /> Free 7-day trial
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-success" /> No credit card
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" /> 4.8 / 5 by Google Reviews
              </span>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal variant="fade-right" delay={520} className="lg:col-span-6">
          <div className="relative">
            <div className="dashboard-glow hidden md:block" style={{ right: "-4rem", top: "-2rem" }} />
            <div
              className="dashboard-glow hidden md:block"
              style={{
                left: "-5rem",
                bottom: "-4rem",
                width: "320px",
                height: "320px",
                animationDelay: "800ms",
              }}
            />

            <div className="hero-dashboard relative grid grid-cols-6 gap-3">
              <Link
                to={ROUTES.attendanceManagement}
                aria-label="Open Attendance Management page"
                className="group col-span-6 block cursor-pointer rounded-2xl p-4 shadow-lg transition-transform duration-200 hover:-translate-y-0.5 sm:col-span-4 soft-card hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-white">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-ink-soft">Attendance Management</div>
                      <div className="text-xl leading-none font-bold text-ink">
                        <AnimatedCounter value={248} />{" "}
                        <span className="text-xs font-medium text-success">
                          / <AnimatedCounter value={312} />
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#dcfce7] px-2 py-0.5 text-[11px] font-semibold text-success">
                    +4.2%
                  </span>
                </div>
                <div className="mt-3 flex h-12 items-end gap-1">
                  {[40, 60, 50, 72, 58, 80, 68, 88, 75, 92, 80, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-primary/50 to-primary"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </Link>

              <Link
                to={ROUTES.payroll}
                aria-label="Open Payroll page"
                className="group col-span-6 block cursor-pointer rounded-2xl p-3 shadow-lg transition-transform duration-200 hover:-translate-y-0.5 sm:col-span-2 soft-card hover:shadow-lg"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#dcfce7] text-success">
                  <Wallet className="h-4 w-4" />
                </div>
                <div className="mt-2 text-[11px] text-ink-soft">Payroll</div>
                <div className="text-lg font-bold leading-tight text-ink">
                  ₹<AnimatedCounter value={18.4} decimals={1} suffix="L" />
                </div>
                <div className="flex items-center gap-1 text-[10px] text-success">
                  <TrendingUp className="h-3 w-3" /> processed
                </div>
              </Link>

              <Link
                to={ROUTES.coreHR}
                aria-label="Open Core HR page"
                className="group col-span-3 block cursor-pointer rounded-2xl p-3 shadow-lg transition-transform duration-200 hover:-translate-y-0.5 sm:col-span-2 soft-card hover:shadow-lg"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="flex items-center justify-between">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-[10px] text-success">+8</span>
                </div>
                <div className="mt-1 text-[11px] text-ink-soft">Employees</div>
                <div className="text-lg font-bold leading-tight text-ink">
                  <AnimatedCounter value={312} />
                </div>
                <div className="mt-1 flex -space-x-1.5">
                  {["#0b5cff", "#16a34a", "#f59e0b", "#ef4444"].map((c, i) => (
                    <span
                      key={i}
                      className="h-5 w-5 rounded-full border-2 border-white"
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </Link>

              <Link
                to={ROUTES.automation}
                aria-label="Open HR Automation page"
                className="group col-span-3 block cursor-pointer rounded-2xl p-3 shadow-lg transition-transform duration-200 hover:-translate-y-0.5 sm:col-span-2 soft-card hover:shadow-lg"
                style={{ animationDelay: "1.2s" }}
              >
                <div className="flex items-center justify-between">
                  <Mail className="h-4 w-4 text-success" />
                  <ArrowUpRight className="h-3 w-3 text-ink-soft" />
                </div>
                <div className="mt-1 text-[11px] text-ink-soft">Campaign</div>
                <div className="text-lg font-bold leading-tight text-ink">
                  <AnimatedCounter value={42.3} decimals={1} suffix="K" />
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface">
                  <div className="h-full w-[38%] rounded-full bg-success" />
                </div>
                <div className="mt-0.5 text-[10px] text-ink-soft">38% open rate</div>
              </Link>

              <Link
                to={ROUTES.leaveManagement}
                aria-label="Open Leave Management page"
                className="group col-span-3 block cursor-pointer rounded-2xl p-3 shadow-lg transition-transform duration-200 hover:-translate-y-0.5 soft-card hover:shadow-lg"
                style={{ animationDelay: "1.6s" }}
              >
                <div className="flex items-center justify-between">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <TrendingDown className="h-3 w-3 text-destructive" />
                </div>
                <div className="mt-1 text-[11px] text-ink-soft">Leave Requests</div>
                <div className="text-lg font-bold leading-tight text-ink">
                  <AnimatedCounter value={14} />{" "}
                  <span className="text-[10px] font-medium text-ink-soft">· 6 pending</span>
                </div>
              </Link>

              <Link
                to={ROUTES.reports}
                aria-label="Open HR Reports page"
                className="group col-span-3 block cursor-pointer rounded-2xl p-3 shadow-lg transition-transform duration-200 hover:-translate-y-0.5 soft-card hover:shadow-lg"
                style={{ animationDelay: "2s" }}
              >
                <div className="flex items-center justify-between">
                  <BarChart3 className="h-4 w-4 text-success" />
                  <span className="text-[10px] text-success">auto</span>
                </div>
                <div className="mt-1 text-[11px] text-ink-soft">Monthly Reports</div>
                <div className="text-lg font-bold leading-tight text-ink">
                  <AnimatedCounter value={28} />
                </div>
              </Link>
            </div>
          </div>

          <div className="pointer-events-none absolute -left-3 top-6 hidden items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 shadow-pop md:flex">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-success text-[10px] font-bold text-white">
              ✓
            </span>
            <span className="text-xs font-semibold text-ink">Payroll run complete</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
