import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Users,
  LogOut,
} from "lucide-react";
import TopNavbar from "@/components/site/TopNavbar";
import MainNavbar from "@/components/site/MainNavbar";
import Footer from "@/components/site/Footer";
import { modelScreenshots } from "@/lib/modelScreenshots";

const heroMetrics = [
  { label: "Speed", value: "Faster offboarding flow" },
  { label: "Control", value: "Clearance and approvals" },
  { label: "Recovery", value: "Assets, data, and docs" },
];

const challengeCards = [
  {
    title: "Offboarding delays",
    desc: "When resignation steps are manual, handoffs stretch out and the process becomes harder to track.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Missed clearances",
    desc: "IT, admin, HR, and finance can lose visibility if exit tasks are managed in too many places.",
    icon: <PackageCheck className="h-5 w-5" />,
  },
  {
    title: "Asset recovery risk",
    desc: "Laptops, badges, and access items need a simple trail so nothing is forgotten at exit time.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Documentation gaps",
    desc: "Final letters, exit interviews, and relieving documents should be easy to manage and archive.",
    icon: <FileText className="h-5 w-5" />,
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Capture resignation",
    desc: "Record the exit request and move it into a structured offboarding workflow.",
  },
  {
    step: "02",
    title: "Plan clearance",
    desc: "Notify the right teams so admin, IT, and HR can prepare their exit tasks.",
  },
  {
    step: "03",
    title: "Recover assets",
    desc: "Track laptops, badges, access cards, and other company items that need return.",
  },
  {
    step: "04",
    title: "Complete documents",
    desc: "Prepare final letters, checks, and exit records without last-minute confusion.",
  },
  {
    step: "05",
    title: "Close the record",
    desc: "Finalize the employee exit with a clean log for future reference and audits.",
  },
];

const roleCards = [
  {
    title: "For HR",
    bullets: [
      "Keep resignation and clearance steps visible",
      "Track what is done, pending, or blocked",
      "Maintain a cleaner exit record for every employee",
    ],
  },
  {
    title: "For IT and Admin",
    bullets: [
      "See the assets or access items that need recovery",
      "Handle clearance steps in a predictable order",
      "Reduce missed handoffs and follow-ups",
    ],
  },
  {
    title: "For Managers",
    bullets: [
      "Stay informed about team exits and replacement planning",
      "See completion status without chasing multiple teams",
      "Help close offboarding smoothly and consistently",
    ],
  },
];

const guardrails = [
  "Track resignation, notice, and exit dates in one place",
  "Keep asset return and access removal visible",
  "Ensure final documents are completed in order",
  "Maintain a clean audit trail for offboarding",
];

const faqs = [
  {
    q: "What is exit management software?",
    a: "It helps HR teams manage resignations, clearances, asset recovery, and final documentation in one workflow.",
  },
  {
    q: "Why does a business need it?",
    a: "It reduces offboarding delays, prevents missed steps, and makes employee exits easier to track.",
  },
  {
    q: "Can it help with asset recovery?",
    a: "Yes. You can track return items like laptops, badges, and access cards as part of the process.",
  },
  {
    q: "Does it support audits?",
    a: "Yes. A structured offboarding trail helps HR and compliance teams review completion later.",
  },
  {
    q: "Is it useful for multi-team exits?",
    a: "Yes. A guided workflow makes it easier for HR, IT, and admin to work from the same record.",
  },
];

export default function ExitManagementPage() {
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
                Exit Management
              </span>
              <h1 className="mt-4 max-w-xl text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
                Make resignations and offboarding easier to track, clear, and complete
              </h1>
              <p className="mt-4 max-w-xl text-base text-ink-soft">
                Manage exit requests, clearances, asset recovery, and final paperwork in a single
                flow so offboarding stays organized from notice to closure.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/company/book-demo" className="btn-primary">
                  Book a demo
                </a>
                <a href="#workflow" className="btn-outline">
                  See the exit flow
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
                    "Capture resignation and notice dates",
                    "Track clearances across teams",
                    "Recover assets and revoke access",
                    "Close the exit with final documentation",
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
                    Exit outcomes
                  </div>
                  <div className="rounded-full bg-[#ecfdf3] px-3 py-1 text-xs font-semibold text-success">
                    Cleaner closeout
                  </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "HR", value: "Structured offboarding" },
                    { label: "IT", value: "Access and device recovery" },
                    { label: "Admin", value: "Better clearance tracking" },
                    { label: "Audit", value: "Complete record trail" },
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
                  <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface">
                    <img
                      src={modelScreenshots.resignations}
                      alt="Resignations management dashboard preview"
                      className="block h-auto w-full object-contain bg-white"
                      loading="eager"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[
                      { label: "Resignation", value: "Notice dates in view" },
                      { label: "Clearance", value: "Teams tracked together" },
                      { label: "Closure", value: "Final records complete" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl bg-surface p-4">
                        <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                          {item.label}
                        </div>
                        <div className="mt-1 text-sm font-semibold text-ink">{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
                    <div className="rounded-[1.5rem] border border-border bg-white p-5 shadow-card">
                      <div className="flex items-center gap-3">
                        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                          <LogOut className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                            Exit tracker
                          </div>
                          <div className="text-lg font-bold text-ink">Offboarding status</div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-ink-soft">
                        A clearer handoff for HR, IT, and admin teams as the employee exits.
                      </p>

                      <div className="mt-5 rounded-2xl border border-border bg-surface p-4">
                        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                          Clearance focus
                        </div>
                        <div className="mt-4 grid gap-3">
                          {[
                            "HR confirms resignation details and final dates",
                            "IT removes access and tracks device return",
                            "Admin closes badges, documents, and records",
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

                      <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {[
                          { label: "Pending", value: "02" },
                          { label: "Recovered", value: "06" },
                          { label: "Closed", value: "14" },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="flex min-h-24 flex-col items-center justify-center rounded-2xl bg-primary-soft p-4 text-center"
                          >
                            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] leading-tight text-primary break-words">
                              {item.label}
                            </div>
                            <div className="mt-2 text-lg font-bold leading-none text-ink">
                              {item.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.5rem] border border-border bg-surface p-5">
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                        Status steps
                      </div>
                      <div className="mt-4 space-y-3">
                        {["Resign", "Clear", "Recover", "Document", "Close"].map((step, index) => (
                          <div
                            key={step}
                            className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3"
                          >
                            <div className="grid h-8 w-8 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                              0{index + 1}
                            </div>
                            <div className="text-sm font-semibold text-ink">{step}</div>
                          </div>
                        ))}
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
            <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:items-stretch">
              <div className="soft-card p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Why it matters
                </span>
                <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                  Offboarding is smoother when every clearance step is visible
                </h2>
                <p className="mt-3 text-ink-soft">
                  This section uses a more process-board style so the exit page feels different from
                  the rest of the site while staying aligned with the design system.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "Track what is cleared, pending, and blocked",
                    "Keep asset recovery and access removal visible",
                    "Make final paperwork easier to complete on time",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                      <span className="text-sm text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {challengeCards.map((card, index) => (
                  <article
                    key={card.title}
                    className={`rounded-[1.5rem] border border-border bg-white p-6 shadow-card ${index === 0 ? "sm:col-span-2" : ""}`}
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
                Exit flow
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                A guided offboarding sequence that helps teams close cleanly
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                This structure keeps the workflow readable on desktop and compact on smaller
                screens.
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
                  HR, IT, and managers each get a clearer offboarding process
                </h2>
                <p className="mt-3 text-ink-soft">
                  The section now feels more like a management board than a standard card grid.
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
                Questions teams ask before digitizing exit management
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
                Exit management that keeps offboarding organized and complete
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                This dedicated page gives Exit Management its own destination with the same aligned
                product-page treatment.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Track the full offboarding lifecycle",
                  "Recover assets and access cleanly",
                  "Close exits with accurate documentation",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3">
                <a href="/company/book-demo" className="btn-primary justify-center">
                  See exit demo
                </a>
                <a href="/products/visitor-management" className="btn-outline justify-center">
                  Go to visitor management
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
