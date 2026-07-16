import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  DoorOpen,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import TopNavbar from "@/components/site/TopNavbar";
import MainNavbar from "@/components/site/MainNavbar";
import Footer from "@/components/site/Footer";

const heroMetrics = [
  { label: "Check-in", value: "Faster front-desk flow" },
  { label: "Security", value: "Visitor approvals and logs" },
  { label: "Visibility", value: "Hosts notified in real time" },
];

const challengeCards = [
  {
    title: "Reception bottlenecks",
    desc: "Manual logs and repeated questions slow down the front desk when traffic picks up.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Security blind spots",
    desc: "Without a proper register and approval trail, it is harder to know who is on site and why.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Delayed host awareness",
    desc: "Visitors can wait too long if hosts are not alerted quickly when guests arrive.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Weak audit trail",
    desc: "Paper logs make it harder to review who entered, when they arrived, and who approved them.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Pre-register",
    desc: "Hosts can create expected visitor entries before the guest reaches the front desk.",
  },
  {
    step: "02",
    title: "Approve",
    desc: "Security or reception can review the visit details and allow entry with confidence.",
  },
  {
    step: "03",
    title: "Check in",
    desc: "Capture arrival time, visitor details, and badge information in one clean flow.",
  },
  {
    step: "04",
    title: "Notify",
    desc: "Alert the host instantly so the visitor does not wait longer than needed.",
  },
  {
    step: "05",
    title: "Check out",
    desc: "Record departure, close the visit, and keep a complete log for later review.",
  },
];

const roleCards = [
  {
    title: "For Reception",
    bullets: [
      "Handle visitor entries quickly with less manual work",
      "See who the host is and why the guest is visiting",
      "Print or assign badges with a clearer workflow",
    ],
  },
  {
    title: "For Security Teams",
    bullets: [
      "Maintain an accurate site-entry record",
      "Track approvals and visitor movement with ease",
      "Use logs for audit and compliance checks",
    ],
  },
  {
    title: "For Hosts",
    bullets: [
      "Know when a visitor arrives without chasing front-desk updates",
      "Pre-register guests before meetings",
      "Stay informed about arrivals and departures",
    ],
  },
];

const guardrails = [
  "Track visitor names, companies, and host details",
  "Keep a visible approval and check-in trail",
  "Reduce manual front-desk handling during peak hours",
  "Make audits and compliance reviews easier",
];

const faqs = [
  {
    q: "What does visitor management software do?",
    a: "It helps reception and security teams register, approve, track, and log visitors with a clean digital workflow.",
  },
  {
    q: "Why do businesses need it?",
    a: "It improves front-desk efficiency, strengthens site security, and gives the business a better visitor record.",
  },
  {
    q: "Can hosts pre-register visitors?",
    a: "Yes. Visitors can be pre-registered so the arrival flow starts from an approved, known entry.",
  },
  {
    q: "Does it help with audits?",
    a: "Yes. Digital visitor logs make it easier to review entries, exits, and approvals later on.",
  },
  {
    q: "Is it suitable for multi-site operations?",
    a: "Yes. A consistent visitor process helps teams keep the same standard across locations.",
  },
];

export default function VisitorManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden scroll-mt-24">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x grid gap-10 py-12 lg:grid-cols-12 lg:items-start lg:py-14">
            <div className="lg:col-span-6 self-start fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Visitor Management
              </span>
              <h1 className="mt-4 max-w-xl text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
                Make front-desk check-ins faster, safer, and easier to track
              </h1>
              <p className="mt-4 max-w-xl text-base text-ink-soft">
                Keep visitor approvals, reception tasks, host notifications, and check-out logs in
                one place so office entry feels organized instead of manual.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/company/book-demo" className="btn-primary">
                  Book a demo
                </a>
                <a href="#workflow" className="btn-outline">
                  See the visitor flow
                </a>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {heroMetrics.map((item) => (
                  <div key={item.label} className="soft-card p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {item.label}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-ink">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 max-w-xl rounded-[1.5rem] border border-border bg-white/80 p-5 shadow-card backdrop-blur-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  What this page covers
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Pre-register visitors before they arrive",
                    "Check guests in with a clear host trail",
                    "Notify hosts instantly on arrival",
                    "Keep a clean check-out record",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                      <span className="text-sm text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 max-w-xl rounded-[1.5rem] border border-border bg-white/80 p-5 shadow-card backdrop-blur-sm">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    Visitor outcomes
                  </div>
                  <div className="rounded-full bg-[#ecfdf3] px-3 py-1 text-xs font-semibold text-success">
                    Better control
                  </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "Reception", value: "Less manual handling" },
                    { label: "Security", value: "Stronger site logs" },
                    { label: "Hosts", value: "Faster awareness" },
                    { label: "Audit", value: "Cleaner records" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl bg-surface p-4">
                      <div className="text-sm font-semibold text-ink">{item.label}</div>
                      <div className="mt-1 text-xs text-ink-soft">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 self-start">
              <div className="relative mx-auto max-w-2xl">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-5 shadow-float">
                  <div className="rounded-[1.5rem] border border-border bg-surface p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                          Visitor desk
                        </div>
                        <div className="mt-1 text-lg font-bold text-ink">
                          Pre-register, approve, check in, and notify
                        </div>
                      </div>
                      <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-success shadow-sm">
                        Live log
                      </div>
                    </div>

                    <div className="mt-5 space-y-3">
                      {[
                        {
                          label: "Expected",
                          value: "Approved before arrival",
                          tone: "bg-primary-soft text-primary",
                        },
                        {
                          label: "Arrived",
                          value: "Front desk check-in captured",
                          tone: "bg-[#ecfdf3] text-success",
                        },
                        {
                          label: "Departed",
                          value: "Checkout and closure complete",
                          tone: "bg-white text-ink",
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-2xl border border-border bg-white p-4 shadow-card"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="text-sm font-bold text-ink">{item.label}</div>
                              <div className="text-xs text-ink-soft">{item.value}</div>
                            </div>
                            <div
                              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${item.tone}`}
                            >
                              Live
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
                    <div className="rounded-[1.5rem] border border-border bg-white p-5 shadow-card">
                      <div className="flex items-center gap-3">
                        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                          <DoorOpen className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                            Front-desk view
                          </div>
                          <div className="text-lg font-bold text-ink">Visitor check-in</div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-ink-soft">
                        A clean check-in flow with better visitor tracking and less manual re-entry.
                      </p>

                      <div className="mt-5 rounded-2xl border border-border bg-surface p-4">
                        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                          Desk summary
                        </div>
                        <div className="mt-4 grid gap-3">
                          {[
                            "Badge issued at the front desk",
                            "Host notified as soon as arrival is marked",
                            "Entry and exit logged in one place",
                          ].map((item) => (
                            <div
                              key={item}
                              className="flex items-start gap-3 rounded-xl bg-white p-3"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                              <span className="text-sm text-ink">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[1.5rem] border border-border bg-surface p-5">
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                        Status steps
                      </div>
                      <div className="mt-4 space-y-3">
                        {["Pre-register", "Approve", "Check in", "Notify", "Check out"].map(
                          (step, index) => (
                            <div
                              key={step}
                              className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3"
                            >
                              <div className="grid h-8 w-8 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                                0{index + 1}
                              </div>
                              <div className="text-sm font-semibold text-ink">{step}</div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-stretch">
              <div className="soft-card p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Why it matters
                </span>
                <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                  Visitor handling works best when the front desk feels calm and controlled
                </h2>
                <p className="mt-3 text-ink-soft">
                  This section uses a more editorial layout so the visitor page feels different from
                  the other product pages while keeping the same content focus.
                </p>

                <div className="mt-6 rounded-[1.5rem] bg-surface p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    Front-desk snapshot
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      "Approvals before arrival reduce interruptions",
                      "Hosts know who is coming without extra calls",
                      "Security gets a cleaner entry and exit log",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-xl bg-white p-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                        <span className="text-sm text-ink">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Guests", value: "Tracked" },
                    { label: "Hosts", value: "Notified" },
                    { label: "Logs", value: "Archived" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl bg-primary-soft p-4 text-center">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary whitespace-nowrap">
                        {item.label}
                      </div>
                      <div className="mt-2 text-sm font-bold leading-none text-ink">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {challengeCards.map((card, index) => (
                  <article
                    key={card.title}
                    className={`soft-card p-6 ${index === 0 ? "sm:col-span-2" : ""}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                        {card.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-ink">{card.title}</h3>
                        <p className="mt-2 text-sm text-ink-soft">{card.desc}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="workflow" className="bg-surface py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="soft-card p-6 lg:sticky lg:top-24 lg:col-span-4 self-start">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Visitor flow
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                A simple front-desk sequence that keeps arrivals under control
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                This layout keeps the workflow readable on desktop and stacked cleanly on mobile.
              </p>

              <div className="mt-6 space-y-3">
                {guardrails.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid gap-4 md:grid-cols-2">
                {workflowSteps.map((item, index) => (
                  <article
                    key={item.step}
                    className={`relative overflow-hidden rounded-[1.5rem] border border-border bg-white p-5 shadow-card ${
                      index === 0 ? "md:col-span-2" : ""
                    }`}
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-success/60" />
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-base font-bold text-primary">
                        {item.step}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h4 className="text-lg font-bold text-ink">{item.title}</h4>
                          {index < workflowSteps.length - 1 ? (
                            <ArrowRight className="hidden h-4 w-4 text-ink-soft md:block" />
                          ) : null}
                        </div>
                        <p className="mt-2 text-sm leading-6 text-ink-soft">{item.desc}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="soft-card p-6 md:p-8">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Role-based value
                </span>
                <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                  Reception, security, and hosts each get a cleaner experience
                </h2>
                <p className="mt-3 text-ink-soft">
                  The page keeps the same content, but the section design is now more distinct and
                  lighter to scan.
                </p>
              </div>

              <div className="mt-8 grid gap-5 lg:grid-cols-3">
                {roleCards.map((role, index) => (
                  <article
                    key={role.title}
                    className={`rounded-[1.5rem] border border-border bg-white p-6 shadow-card ${index === 1 ? "md:-translate-y-2" : ""}`}
                  >
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                      <Users className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{role.title}</h3>
                    <div className="mt-4 space-y-3">
                      {role.bullets.map((bullet) => (
                        <div
                          key={bullet}
                          className="flex items-start gap-3 rounded-xl bg-surface p-3"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                          <span className="text-sm text-ink">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="soft-card p-6 lg:col-span-7 lg:self-start">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">FAQ</div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                Questions teams ask before digitizing visitor management
              </h3>
              <div className="mt-6 space-y-4">
                {faqs.map((item) => (
                  <div key={item.q} className="rounded-2xl border border-border bg-white p-4">
                    <div className="text-base font-bold text-ink">{item.q}</div>
                    <p className="mt-2 text-sm text-ink-soft">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="soft-card p-6 lg:col-span-5 lg:self-start">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Final summary
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                A visitor page that feels organized instead of ad hoc
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                This dedicated page gives Visitor Management a clear destination with better
                alignment and original content.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Reduce front-desk friction during busy hours",
                  "Keep visitor records easy to review",
                  "Improve host visibility and site control",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3">
                <a href="/company/book-demo" className="btn-primary justify-center">
                  See visitor demo
                </a>
                <a href="/products/exit-management" className="btn-outline justify-center">
                  Go to exit management
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
