import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  FileSpreadsheet,
  ReceiptText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import TopNavbar from "@/components/site/TopNavbar";
import MainNavbar from "@/components/site/MainNavbar";
import Footer from "@/components/site/Footer";

const heroMetrics = [
  { label: "Policy", value: "Rules before submission" },
  { label: "Speed", value: "Faster approvals and payouts" },
  { label: "Control", value: "Audit-friendly workflow" },
];

const challengeCards = [
  {
    title: "Policy blind spots",
    desc: "Claims that do not match policy create avoidable back-and-forth and unnecessary spending.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Approval bottlenecks",
    desc: "Manual reviews and clarification emails slow reimbursements and make the process harder to trust.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Payment chaos",
    desc: "Receipts, checks, and payout files become messy when finance has to stitch together too many steps.",
    icon: <ReceiptText className="h-5 w-5" />,
  },
  {
    title: "Fraud risk",
    desc: "Duplicate, inflated, or unsupported claims are easier to catch when the workflow is structured end to end.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Submit",
    desc: "Employees capture expenses from mobile, scan receipts, and submit details quickly.",
  },
  {
    step: "02",
    title: "Approve",
    desc: "Managers review the policy context, entitlement limits, and receipts before deciding.",
  },
  {
    step: "03",
    title: "Control",
    desc: "HR and finance keep rules, exceptions, and approval chains visible in one place.",
  },
  {
    step: "04",
    title: "Process",
    desc: "Approved claims can move into batch payouts or finance-ready output with less manual work.",
  },
  {
    step: "05",
    title: "Monitor",
    desc: "Track status, deadlines, and open items so nothing gets lost in email follow-ups.",
  },
];

const roleCards = [
  {
    title: "For HR and Finance",
    bullets: [
      "Define and enforce expense policies with clear rules",
      "Monitor requests, batch approvals, and payouts in real time",
      "Keep audit records clean for compliance and reporting",
      "Reduce manual follow-ups during month-end processing",
    ],
  },
  {
    title: "For Team Managers",
    bullets: [
      "Approve or reject expense claims on the go",
      "See receipts, categories, and limits before deciding",
      "Make faster decisions with more context and less chasing",
      "Keep approvals moving even when traveling",
    ],
  },
  {
    title: "For Employees",
    bullets: [
      "Submit claims from mobile with minimal friction",
      "Scan receipts and save drafts before final submission",
      "Check expense status and entitlement visibility anytime",
      "Capture travel and client-meeting costs while on the move",
    ],
  },
];

const faqItems = [
  {
    q: "What is expense management software?",
    a: "It is a digital workflow for submitting, approving, processing, and tracking employee expenses with policy checks built in.",
  },
  {
    q: "Why does a business need it?",
    a: "It reduces delays, policy violations, and manual errors while giving employees, managers, and finance teams a clearer view of spend.",
  },
  {
    q: "Can policies be customized?",
    a: "Yes. You can define rules by role, department, location, category, approval path, and entitlement limits.",
  },
  {
    q: "How does it help finance teams?",
    a: "Finance can batch approved items, export clean output, and keep a better audit trail without stitching together spreadsheets.",
  },
  {
    q: "Is it useful for field teams?",
    a: "Yes. Mobile-first submission and receipt capture make it practical for sales, travel, and on-the-go employees.",
  },
];

const guardrails = [
  "Show entitlement limits before a claim is submitted",
  "Keep approval status visible across every step",
  "Batch payouts after approval instead of handling each claim manually",
  "Retain a clean trail for finance reviews and audits",
];

export default function ExpenseManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section
          id="expense-management"
          className="hero-gradient relative overflow-hidden scroll-mt-24"
        >
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x grid gap-10 py-12 lg:grid-cols-12 lg:items-center lg:py-16">
            <div className="lg:col-span-6 fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Expense Management
              </span>
              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Track employee expenses with less manual effort and more policy control
              </h1>
              <p className="mt-4 max-w-xl text-base text-ink-soft">
                Build a cleaner expense flow for mobile submissions, approvals, payouts, and audit
                records so employees, managers, and finance stay aligned.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/company/book-demo" className="btn-primary">
                  Book a demo
                </a>
                <a href="#workflow" className="btn-outline">
                  Explore the expense flow
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
            </div>

            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-2xl">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-5 shadow-float">
                  <div className="grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
                    <div className="rounded-[1.5rem] border border-border bg-surface p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                            Expense cockpit
                          </div>
                          <div className="mt-1 text-lg font-bold text-ink">
                            Submission, approval, and payout in one flow
                          </div>
                        </div>
                        <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-success shadow-sm">
                          Policy aware
                        </div>
                      </div>

                      <div className="mt-5 space-y-3">
                        {[
                          {
                            label: "Drafts",
                            value: "Receipts captured, waiting to submit",
                            tone: "bg-primary-soft text-primary",
                          },
                          {
                            label: "Approvals",
                            value: "Manager review with policy context",
                            tone: "bg-[#ecfdf3] text-success",
                          },
                          {
                            label: "Payouts",
                            value: "Ready for batch processing",
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

                    <div className="grid gap-4">
                      <div className="rounded-[1.5rem] border border-border bg-white p-5 shadow-card">
                        <div className="flex items-center gap-3">
                          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                            <ReceiptText className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                              Expense status
                            </div>
                            <div className="text-lg font-bold text-ink">Review ready</div>
                          </div>
                        </div>
                        <p className="mt-4 text-sm text-ink-soft">
                          A compact command center for policy checks, approvals, and finance-ready
                          output.
                        </p>
                      </div>

                      <div className="rounded-[1.5rem] border border-border bg-surface p-5">
                        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                          Process flow
                        </div>
                        <div className="mt-4 space-y-3">
                          {["Submit", "Approve", "Process", "Monitor"].map((step, index) => (
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
          </div>
        </section>

        <section className="py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Why teams need it
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                The problems that appear when expense handling is left too manual
              </h2>
              <p className="mt-3 text-ink-soft">
                This layout keeps the story focused on policy, approvals, payouts, and fraud control
                while giving each point enough space to breathe.
              </p>
            </div>

            <div className="lg:col-span-8 grid gap-5 md:grid-cols-2">
              {challengeCards.map((card, index) => (
                <article
                  key={card.title}
                  className={`soft-card p-6 ${index === 0 ? "md:col-span-2" : ""}`}
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
        </section>

        <section id="workflow" className="bg-surface py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="soft-card p-6 lg:sticky lg:top-24 lg:col-span-4 self-start">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Expense workflow
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                A cleaner sequence that feels more like a guided process
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                Instead of a flat row of cards, this layout turns the flow into a clearer narrative
                with a summary panel and connected step cards.
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
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Role-based value
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                One layout, three very different views of the same process
              </h2>
              <p className="mt-3 text-ink-soft">
                The content is split by audience so the page stays practical for each team.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {roleCards.map((role, index) => (
                <article
                  key={role.title}
                  className={`soft-card p-6 ${index === 1 ? "md:-translate-y-2" : ""}`}
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                    <FileSpreadsheet className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{role.title}</h3>
                  <div className="mt-4 space-y-3">
                    {role.bullets.map((bullet) => (
                      <div
                        key={bullet}
                        className="flex items-start gap-3 rounded-xl border border-border p-3"
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
        </section>

        <section className="bg-surface py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="soft-card p-6 lg:col-span-7 lg:self-start">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">FAQ</div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                The questions teams usually ask before rolling expense software out
              </h3>
              <div className="mt-6 space-y-4">
                {faqItems.map((item) => (
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
                Expense tracking that feels organized instead of scattered
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                This dedicated page keeps expense submissions, approvals, payouts, and compliance in
                one original, easy-to-read product page.
              </p>

              <div className="mt-6 grid gap-3">
                <a href="/company/book-demo" className="btn-primary justify-center">
                  Take the expense demo
                </a>
                <a href="/products/leave-management" className="btn-outline justify-center">
                  Back to leave management
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-8 pb-16">
          <div className="container-x">
            <div className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">
                    Ready to use
                  </div>
                  <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                    A dedicated expense page that fits the rest of the product site
                  </h2>
                  <p className="mt-3 max-w-2xl text-ink-soft">
                    This page is restored so your Expense Management menu item can land on a real
                    page again instead of an empty anchor.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <a href="/company/contact-us" className="btn-outline">
                    Contact sales
                  </a>
                  <a href="/company/book-demo" className="btn-primary">
                    Request a demo
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
