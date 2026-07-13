import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock3,
  Gauge,
  MailCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import TopNavbar from "@/components/site/TopNavbar";
import MainNavbar from "@/components/site/MainNavbar";
import Footer from "@/components/site/Footer";

const heroMetrics = [
  { label: "Speed", value: "Shorten the hiring cycle" },
  { label: "Quality", value: "Find stronger matches faster" },
  { label: "Visibility", value: "Track every stage in one place" },
];

const challengeCards = [
  {
    title: "Too much manual work",
    desc: "Posting jobs, sorting applicants, and coordinating interviews can eat up the HR team’s time.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Vacancies stay open too long",
    desc: "Slow hiring reduces team productivity and keeps projects waiting on the right candidate.",
    icon: <Gauge className="h-5 w-5" />,
  },
  {
    title: "Risk of inconsistent hiring",
    desc: "Without a structured workflow, shortlisting and selection can become uneven across roles.",
    icon: <Target className="h-5 w-5" />,
  },
  {
    title: "Candidate experience slips",
    desc: "Long response times and unclear steps can push strong candidates toward other employers.",
    icon: <MailCheck className="h-5 w-5" />,
  },
];

const flowSteps = [
  {
    step: "01",
    title: "Setup",
    desc: "Create job posts, define hiring stages, and prepare the right team for the role.",
  },
  {
    step: "02",
    title: "Source",
    desc: "Bring applicants in from job postings and external channels without juggling spreadsheets.",
  },
  {
    step: "03",
    title: "Screen",
    desc: "Use skill-based filtering and AI-assisted review to focus on stronger fits sooner.",
  },
  {
    step: "04",
    title: "Engage",
    desc: "Keep communication flowing with candidates and interviewers through one shared process.",
  },
  {
    step: "05",
    title: "Hire",
    desc: "Move the right people forward to offer and onboarding with less friction.",
  },
  {
    step: "06",
    title: "Report",
    desc: "Measure progress, bottlenecks, and hiring outcomes so decisions stay data driven.",
  },
];

const roleCards = [
  {
    title: "For Recruiters",
    points: [
      "Automate repetitive screening and coordination tasks",
      "Focus on strategic sourcing instead of admin follow-up",
      "Use analytics to make faster, more informed decisions",
    ],
  },
  {
    title: "For Hiring Managers",
    points: [
      "Review candidates with more context and less back-and-forth",
      "Keep requisitions moving so openings do not stall",
      "See the hiring flow clearly from shortlist to offer",
    ],
  },
  {
    title: "For Candidates",
    points: [
      "Experience a smoother, more professional hiring journey",
      "Get faster updates and clearer communication",
      "Move through the process without repeated manual follow-up",
    ],
  },
];

const features = [
  {
    title: "AI-powered shortlisting",
    desc: "Filter candidates by skills and relevance to speed up the first review step.",
    icon: <Bot className="h-5 w-5" />,
  },
  {
    title: "Lisa pre-screening bot",
    desc: "Use an AI assistant to reduce repetitive screening work and pre-qualify applicants.",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: "Centralized inbox",
    desc: "Keep candidate communication, recruiter notes, and updates in a shared space.",
    icon: <MailCheck className="h-5 w-5" />,
  },
  {
    title: "Calendar integrations",
    desc: "Coordinate interviews with Outlook and Gmail calendar support.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Offer management",
    desc: "Move selected candidates cleanly from interview success to offer stage.",
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
  {
    title: "Reporting and insights",
    desc: "Track hiring progress and improve decisions with useful recruiting data.",
    icon: <Users className="h-5 w-5" />,
  },
];

const faqItems = [
  {
    q: "What is greytHR Recruit?",
    a: "It is a cloud-based recruitment system that helps manage the hiring process from job posting to offer management in one place.",
  },
  {
    q: "How is ATS different from recruitment software?",
    a: "An ATS tracks candidates through the hiring lifecycle, while recruitment software usually includes the ATS plus sourcing, communication, offers, and reporting.",
  },
  {
    q: "What are the benefits of recruitment software?",
    a: "It reduces manual effort, improves candidate experience, centralizes resumes, and gives HR better visibility into hiring outcomes.",
  },
  {
    q: "How does AI help recruiting?",
    a: "AI can help automate screening, speed up matching, and reduce repetitive tasks so recruiters can focus on high-value decisions.",
  },
  {
    q: "What should teams look for in an ATS?",
    a: "Look for candidate sourcing, screening, interview scheduling, engagement, offer management, integrations, and reporting.",
  },
];

export default function RecruitmentPage() {
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
                Recruitment (ATS)
              </span>
              <h1 className="mt-4 max-w-xl text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
                Hire faster with a recruitment flow that keeps sourcing, screening, and interviews in
                one place
              </h1>
              <p className="mt-4 max-w-xl text-base text-ink-soft">
                Manage jobs, candidates, and offers without bouncing between tools. This page keeps
                the hiring journey structured, visible, and easier for every role involved.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/company/book-demo" className="btn-primary">
                  Get Recruit
                </a>
                <a href="#workflow" className="btn-outline">
                  See the hiring flow
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
                  What this ATS handles
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Post jobs and manage openings",
                    "Screen candidates with AI support",
                    "Schedule interviews without chaos",
                    "Track offers and hiring progress",
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
                    Recruitment outcomes
                  </div>
                  <div className="rounded-full bg-[#ecfdf3] px-3 py-1 text-xs font-semibold text-success">
                    Better control
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    { title: "Pipeline view", value: "Track every candidate stage" },
                    { title: "Team alignment", value: "Keep recruiters and managers synced" },
                    { title: "Fast follow-up", value: "Reduce lag between steps" },
                    { title: "Hiring insight", value: "Spot bottlenecks early" },
                  ].map((item) => (
                    <div key={item.title} className="rounded-xl bg-surface p-4">
                      <div className="text-sm font-semibold text-ink">{item.title}</div>
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
                  <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
                    <div className="rounded-[1.5rem] border border-border bg-surface p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                            Hiring cockpit
                          </div>
                          <div className="mt-1 text-lg font-bold text-ink">
                            Setup, source, screen, engage, hire, report
                          </div>
                        </div>
                        <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-success shadow-sm">
                          3X faster
                        </div>
                      </div>

                      <div className="mt-5 space-y-3">
                        {[
                          { label: "Jobs", value: "Create roles and publish openings", tone: "bg-primary-soft text-primary" },
                          { label: "Candidates", value: "Centralize profiles and progress", tone: "bg-[#ecfdf3] text-success" },
                          { label: "Offers", value: "Move from shortlist to hire", tone: "bg-white text-ink" },
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
                            <Bot className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                              AI support
                            </div>
                            <div className="text-lg font-bold text-ink">Smarter screening</div>
                          </div>
                        </div>
                        <p className="mt-4 text-sm text-ink-soft">
                          Use skill-based shortlisting and pre-screening to reduce manual effort.
                        </p>
                      </div>

                      <div className="rounded-[1.5rem] border border-border bg-surface p-5">
                        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                          Hiring stages
                        </div>
                        <div className="mt-4 space-y-3">
                          {["Source", "Screen", "Engage", "Hire"].map((step, index) => (
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
                Hiring challenges
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Recruitment becomes easier when the biggest bottlenecks are removed
              </h2>
              <p className="mt-3 text-ink-soft">
                This section mirrors the source page's problem framing, but in a cleaner original
                layout for your site.
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
                Unified hiring flow
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                A step-by-step ATS structure that keeps the team moving
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                The flow is designed to be easy to scan on desktop and stacked cleanly on mobile.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 rounded-xl bg-surface p-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                  <span className="text-sm text-ink">Centralize hiring tasks and reduce manual work.</span>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-surface p-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                  <span className="text-sm text-ink">Keep recruiters and hiring managers aligned.</span>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-surface p-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                  <span className="text-sm text-ink">Use reporting to find delays and improve hiring speed.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid gap-4 md:grid-cols-2">
                {flowSteps.map((item, index) => (
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
                          {index < flowSteps.length - 1 ? (
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
                Benefits by role
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Each team gets value from the same recruitment system
              </h2>
              <p className="mt-3 text-ink-soft">
                Recruiters, hiring managers, and candidates each see a smoother hiring experience.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {roleCards.map((role, index) => (
                <article
                  key={role.title}
                  className={`soft-card p-6 ${index === 1 ? "md:-translate-y-2" : ""}`}
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{role.title}</h3>
                  <div className="mt-4 space-y-3">
                    {role.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-3 rounded-xl border border-border p-3"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                        <span className="text-sm text-ink">{point}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Key features
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                A recruitment toolkit that covers the full hiring journey
              </h2>
              <p className="mt-3 text-ink-soft">
                These are the core capabilities surfaced from the reference page, reorganized into
                a cleaner card layout.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {features.map((item) => (
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

        <section className="py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="soft-card p-6 lg:col-span-7 lg:self-start">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">FAQ</div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                The questions hiring teams usually ask before choosing recruitment software
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
                Recruitment software that keeps the whole hiring journey under control
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                This dedicated page gives Recruitment (ATS) a real destination with a structured
                layout, clear flow, and original copy.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Cycle", value: "Shorter" },
                  { label: "Match", value: "Stronger" },
                  { label: "Control", value: "Cleaner" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-border bg-surface p-4 text-center">
                    <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {item.label}
                    </div>
                    <div className="mt-1 text-sm font-bold text-ink">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                {[
                  "Reduce manual screening and coordination work",
                  "Keep hiring managers and recruiters on the same page",
                  "Track offers, interviews, and candidate progress in one place",
                  "Use reporting to spot delays before they slow hiring down",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3">
                <a href="/company/book-demo" className="btn-primary justify-center">
                  See AI hiring demo
                </a>
                <a href="/products/expense-management" className="btn-outline justify-center">
                  Back to expense management
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
