import {
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  MessageSquareMore,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  ShieldCheck,
} from "lucide-react";
import TopNavbar from "@/components/site/TopNavbar";
import MainNavbar from "@/components/site/MainNavbar";
import Footer from "@/components/site/Footer";
import { modelScreenshots } from "@/lib/modelScreenshots";

const heroMetrics = [
  { label: "Focus", value: "Goals aligned to business priorities" },
  { label: "Rhythm", value: "Continuous check-ins and coaching" },
  { label: "Confidence", value: "Review-ready evidence and insights" },
];

const capabilityCards = [
  {
    icon: <Target className="h-5 w-5" />,
    title: "Goal setting and OKRs",
    desc: "Turn strategy into measurable objectives that teams can actually track and discuss.",
  },
  {
    icon: <MessageSquareMore className="h-5 w-5" />,
    title: "Continuous feedback",
    desc: "Capture coaching, recognition, and course correction while work is still moving.",
  },
  {
    icon: <ClipboardCheck className="h-5 w-5" />,
    title: "Structured reviews",
    desc: "Run self-reviews, manager reviews, and shared review cycles from one workflow.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Calibration and fairness",
    desc: "Compare evidence across teams so ratings and outcomes stay more consistent.",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Development planning",
    desc: "Convert review outcomes into growth plans, next steps, and follow-up actions.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Analytics and visibility",
    desc: "Track completion rates, trends, distributions, and participation at a glance.",
  },
];

const cycleSteps = [
  {
    step: "01",
    title: "Plan",
    desc: "Set goals, expectations, and success measures before the cycle begins.",
  },
  {
    step: "02",
    title: "Check in",
    desc: "Keep conversations active with feedback, notes, and progress updates.",
  },
  {
    step: "03",
    title: "Review",
    desc: "Gather self-assessments, manager input, and supporting evidence in one place.",
  },
  {
    step: "04",
    title: "Grow",
    desc: "Turn outcomes into development actions, coaching plans, and visibility for leaders.",
  },
];

const outcomes = [
  {
    title: "Better alignment",
    desc: "Tie every employee objective back to the work the business actually cares about.",
  },
  {
    title: "More consistent reviews",
    desc: "Use a shared structure that makes review quality less dependent on each manager.",
  },
  {
    title: "Clearer talent decisions",
    desc: "Bring evidence, ratings, and history into one view for promotions and planning.",
  },
];

const reviewSignals = [
  "Manager and employee conversations stay visible across the cycle",
  "Review completion progress can be monitored by HR in real time",
  "Calibration views help leaders compare decisions with more context",
  "Development actions remain attached to the review outcome",
];

export default function PerformanceManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x grid gap-10 py-12 lg:grid-cols-12 lg:items-center lg:py-16">
            <div className="lg:col-span-6 fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Performance Management
              </span>
              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Make performance management a repeatable habit, not a once-a-year event
              </h1>
              <p className="mt-4 max-w-xl text-base text-ink-soft">
                Keep goals, feedback, reviews, and development connected so managers and employees
                always know what matters, what has changed, and what comes next.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/company/book-demo" className="btn-primary">
                  Book a demo
                </a>
                <a href="#cycle" className="btn-outline">
                  Explore the performance cycle
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
                  <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface">
                    <img
                      src={modelScreenshots.performanceEvaluations}
                      alt="Performance management dashboard preview"
                      className="block h-auto w-full object-contain bg-white"
                      loading="eager"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Core capabilities
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Everything the performance cycle needs in one clean flow
              </h2>
              <p className="mt-3 text-ink-soft">
                The page structure is inspired by the reference, but the copy and visual treatment
                are original and aligned to the rest of your site.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {capabilityCards.map((item) => (
                <article key={item.title} className="soft-card p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="cycle" className="bg-surface py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12">
            <div className="soft-card p-6 lg:col-span-7">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Review cycle
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                A simple sequence that managers can follow without extra training
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                The strongest performance tools reduce friction. This layout emphasizes a
                predictable cycle so teams know what to do at each stage.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {cycleSteps.map((item) => (
                  <div key={item.step} className="rounded-2xl border border-border bg-white p-4">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                      {item.step}
                    </div>
                    <h4 className="mt-2 text-base font-bold text-ink">{item.title}</h4>
                    <p className="mt-2 text-sm text-ink-soft">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="soft-card p-6 lg:col-span-5">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Review signals
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                Give HR and leaders the context they need to act quickly
              </h3>
              <div className="mt-6 space-y-3">
                {reviewSignals.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="soft-card p-6 lg:col-span-5">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  What changes
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">
                  A better process produces cleaner decisions and less review fatigue
                </h3>
                <p className="mt-3 text-sm text-ink-soft">
                  The page should feel balanced on desktop and mobile, so the content uses the same
                  container widths, spacing, and section rhythm as the rest of the site.
                </p>
              </div>

              <div className="grid gap-5 lg:col-span-7 md:grid-cols-3">
                {outcomes.map((item) => (
                  <article key={item.title} className="soft-card p-6">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <h4 className="mt-4 text-lg font-bold text-ink">{item.title}</h4>
                    <p className="mt-2 text-sm text-ink-soft">{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <div className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-10 top-6 h-28 w-28 rounded-full bg-primary/8 blur-3xl" />
              <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Ready to build
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                    A performance management page that fits the rest of your site
                  </h2>
                  <p className="mt-3 max-w-2xl text-ink-soft">
                    This separate page gives the Performance Management menu item its own dedicated
                    destination, with clean alignment, consistent spacing, and a structure that
                    works well on all screens.
                  </p>
                </div>

                <div className="grid gap-3">
                  <a href="/company/book-demo" className="btn-primary justify-center">
                    Talk to us
                  </a>
                  <a href="/" className="btn-outline justify-center">
                    Back to home
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
