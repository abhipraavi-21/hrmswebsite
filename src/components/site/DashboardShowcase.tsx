import type { ReactNode } from "react";
import { Users, Clock, Wallet, Mail, TrendingUp, CheckCircle2 } from "lucide-react";

export default function DashboardShowcase() {
  return (
    <section id="integrations" className="section bg-white scroll-mt-24">
      <div className="site-container">
        <div className="section-heading">
          <span className="eyebrow text-xs font-bold uppercase tracking-wider text-primary">
            Live Dashboard
          </span>
          <h2 className="text-3xl font-bold text-ink md:text-4xl">One dashboard. Total clarity.</h2>
          <p className="text-ink-soft">
            Get a complete view of your workforce and campaigns in real time.
          </p>
        </div>

        <div className="relative mt-8">
          <div className="absolute inset-0 -m-4 rounded-3xl hero-gradient" />
          <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-float">
            <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <div className="ml-3 text-xs text-ink-soft">app.peoplepulse.in/dashboard</div>
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-12">
              <div className="space-y-1.5 md:col-span-3">
                {[
                  "Overview",
                  "Attendance",
                  "Payroll",
                  "Employees",
                  "Leaves",
                  "Campaigns",
                  "Reports",
                ].map((it, i) => (
                  <div
                    key={it}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                      i === 0
                        ? "bg-primary-soft font-semibold text-primary"
                        : "text-ink-soft hover:bg-surface"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" /> {it}
                  </div>
                ))}
              </div>

              <div className="space-y-4 md:col-span-9">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  <MiniStat icon={<Clock />} label="Present" value="248" tone="primary" />
                  <MiniStat icon={<Users />} label="Total" value="312" tone="primary" />
                  <MiniStat icon={<Wallet />} label="Payroll" value="₹18.4L" tone="success" />
                  <MiniStat icon={<Mail />} label="Sent" value="42.3K" tone="success" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-border p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-ink">Attendance Trend</div>
                      <span className="flex items-center gap-1 text-xs text-success">
                        <TrendingUp className="h-3 w-3" /> +4.2%
                      </span>
                    </div>
                    <div className="mt-4 flex h-28 items-end gap-1.5">
                      {[40, 65, 50, 75, 60, 85, 70, 90, 78, 95, 82, 88].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-md bg-gradient-to-t from-primary/60 to-primary"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-border p-4">
                    <div className="text-sm font-semibold text-ink">Recent Campaigns</div>
                    <div className="mt-3 space-y-2.5">
                      {[
                        { name: "Spring Sale 2025", rate: "42%" },
                        { name: "Product Launch", rate: "38%" },
                        { name: "Newsletter #14", rate: "29%" },
                      ].map((c) => (
                        <div key={c.name} className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-ink">
                            <CheckCircle2 className="h-4 w-4 text-success" /> {c.name}
                          </span>
                          <span className="text-ink-soft">{c.rate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="absolute -left-6 top-1/3 soft-card p-3 float-slow">
              <div className="text-xs text-ink-soft">Late arrivals today</div>
              <div className="text-lg font-bold text-ink">7</div>
            </div>
            <div className="absolute -right-6 bottom-12 soft-card p-3 float-slow">
              <div className="text-xs text-ink-soft">Email delivery rate</div>
              <div className="text-lg font-bold text-success">99.2%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({
  icon,
  label,
  value,
  tone,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  tone: "primary" | "success";
}) {
  return (
    <div className="rounded-xl border border-border p-3">
      <div
        className={`grid h-8 w-8 place-items-center rounded-md ${
          tone === "primary" ? "bg-primary-soft text-primary" : "bg-[#dcfce7] text-success"
        } [&>svg]:h-4 [&>svg]:w-4`}
      >
        {icon}
      </div>
      <div className="mt-2 text-xs text-ink-soft">{label}</div>
      <div className="text-lg font-bold text-ink">{value}</div>
    </div>
  );
}
