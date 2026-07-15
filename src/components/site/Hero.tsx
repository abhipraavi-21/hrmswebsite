import {
  Clock,
  Wallet,
  Users,
  Mail,
  CalendarDays,
  BarChart3,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Star,
} from "lucide-react";

export default function Hero() {
  return (
    <section id="demo" className="hero-gradient relative overflow-hidden scroll-mt-24">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

      <div className="container-x py-8 md:py-10 lg:py-12 grid lg:grid-cols-12 gap-8 lg:gap-10 items-center min-h-[calc(100vh-7rem)]">
        {/* LEFT */}
        <div className="lg:col-span-6 fade-up">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-primary/20 text-primary text-xs font-semibold shadow-sm">
            <Sparkles className="h-3.5 w-3.5" /> All-in-one cloud platform
          </span>

          <h1 className="mt-4 text-[2rem] sm:text-4xl lg:text-[2.85rem] xl:text-5xl font-bold text-ink leading-[1.08]">
            Complete{" "}
            <span className="relative inline-block">
              <span className="relative z-10">HRMS</span>
              <span className="absolute inset-x-0 bottom-1 h-2.5 bg-success/25 -z-0 rounded" />
            </span>
            , Payroll &{" "}
            <span className="bg-gradient-to-r from-primary to-[#0a4fda] bg-clip-text text-transparent">
              Bulk Email
            </span>{" "}
            Platform for Growing Teams
          </h1>

          <p className="mt-3 text-sm md:text-base text-ink-soft max-w-xl">
            Manage employees, attendance, payroll, leaves and marketing campaigns from one powerful
            cloud platform.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a href="/company/book-demo" className="btn-success">
              Book Free Demo
            </a>
            <a href="#solutions" className="btn-outline">
              Explore Features
            </a>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-soft">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-success" /> Free 14-day trial
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-success" /> No credit card
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-[#f59e0b] fill-[#f59e0b]" /> 4.8 / 5 by 2,400+ teams
            </span>
          </div>
        </div>

        {/* RIGHT — compact dashboard mosaic */}
        <div className="lg:col-span-6 relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary/15 via-transparent to-success/15 rounded-3xl blur-2xl" />

          <div className="relative grid grid-cols-6 gap-3">
            {/* Big featured card */}
            <div className="col-span-6 sm:col-span-4 soft-card p-4 float-slow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-white">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-ink-soft">Attendance Today</div>
                    <div className="text-xl font-bold text-ink leading-none">
                      248 <span className="text-xs font-medium text-success">/ 312</span>
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-success bg-[#dcfce7] px-2 py-0.5 rounded-full">
                  +4.2%
                </span>
              </div>
              <div className="mt-3 flex items-end gap-1 h-12">
                {[40, 60, 50, 72, 58, 80, 68, 88, 75, 92, 80, 95].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-primary/50 to-primary"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Payroll */}
            <div
              className="col-span-6 sm:col-span-2 soft-card p-3 float-slow"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#dcfce7] text-success">
                <Wallet className="h-4 w-4" />
              </div>
              <div className="mt-2 text-[11px] text-ink-soft">Payroll</div>
              <div className="text-lg font-bold text-ink leading-tight">₹18.4L</div>
              <div className="text-[10px] text-success flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> processed
              </div>
            </div>

            {/* Employees */}
            <div
              className="col-span-3 sm:col-span-2 soft-card p-3 float-slow"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="flex items-center justify-between">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-[10px] text-success">+8</span>
              </div>
              <div className="mt-1 text-[11px] text-ink-soft">Employees</div>
              <div className="text-lg font-bold text-ink leading-tight">312</div>
              <div className="flex -space-x-1.5 mt-1">
                {["#0b5cff", "#16a34a", "#f59e0b", "#ef4444"].map((c, i) => (
                  <span
                    key={i}
                    className="h-5 w-5 rounded-full border-2 border-white"
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>

            {/* Email campaign */}
            <div
              className="col-span-3 sm:col-span-2 soft-card p-3 float-slow"
              style={{ animationDelay: "1.2s" }}
            >
              <div className="flex items-center justify-between">
                <Mail className="h-4 w-4 text-success" />
                <ArrowUpRight className="h-3 w-3 text-ink-soft" />
              </div>
              <div className="mt-1 text-[11px] text-ink-soft">Campaign</div>
              <div className="text-lg font-bold text-ink leading-tight">42.3K</div>
              <div className="mt-1 h-1.5 rounded-full bg-surface overflow-hidden">
                <div className="h-full w-[38%] bg-success rounded-full" />
              </div>
              <div className="text-[10px] text-ink-soft mt-0.5">38% open rate</div>
            </div>

            {/* Leave + Reports row */}
            <div className="col-span-3 soft-card p-3 float-slow" style={{ animationDelay: "1.6s" }}>
              <div className="flex items-center justify-between">
                <CalendarDays className="h-4 w-4 text-primary" />
                <TrendingDown className="h-3 w-3 text-destructive" />
              </div>
              <div className="mt-1 text-[11px] text-ink-soft">Leave Requests</div>
              <div className="text-lg font-bold text-ink leading-tight">
                14 <span className="text-[10px] font-medium text-ink-soft">· 6 pending</span>
              </div>
            </div>

            <div className="col-span-3 soft-card p-3 float-slow" style={{ animationDelay: "2s" }}>
              <div className="flex items-center justify-between">
                <BarChart3 className="h-4 w-4 text-success" />
                <span className="text-[10px] text-success">auto</span>
              </div>
              <div className="mt-1 text-[11px] text-ink-soft">Monthly Reports</div>
              <div className="text-lg font-bold text-ink leading-tight">28</div>
            </div>
          </div>

          {/* Floating badge */}
          <div className="hidden md:flex absolute -left-3 top-6 items-center gap-2 bg-white rounded-full pl-1.5 pr-3 py-1.5 shadow-pop border border-border float-slow">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-success text-white text-[10px] font-bold">
              ✓
            </span>
            <span className="text-xs font-semibold text-ink">Payroll run complete</span>
          </div>
        </div>
      </div>
    </section>
  );
}
