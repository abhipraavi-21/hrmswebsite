import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  Clock3,
  FileText,
  Gauge,
  GraduationCap,
  LayoutDashboard,
  MailCheck,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Footer from "@/components/site/Footer";
import BulkEmailNavbar from "@/components/site/BulkEmailNavbar";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import PageSEO from "@/components/site/PageSEO";
import { ROUTES } from "@/routes/routeConfig.js";
import { cn } from "@/lib/utils";

const bulkEmailPrimaryCta =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[#f4c430] px-5 py-3 text-sm font-bold text-[#111827] transition-transform hover:-translate-y-0.5 hover:bg-[#e0b61f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9a900]/35";
const bulkEmailSecondaryCta =
  "inline-flex items-center justify-center gap-2 rounded-full border border-[#d9a900] bg-[#fff9e6] px-5 py-3 text-sm font-bold text-[#111827] transition-transform hover:-translate-y-0.5 hover:bg-[#fff4cc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9a900]/25";

type Stat = {
  label: string;
  value: string;
  note: string;
  icon: LucideIcon;
};

type Card = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type Step = {
  step: string;
  title: string;
  description: string;
};

type Faq = {
  q: string;
  a: string;
};

type VisualMetric = {
  label: string;
  value: string;
};

type QueueItem = {
  title: string;
  status: string;
};

type SolutionPageData = {
  pageTitle: string;
  canonicalPath: string;
  eyebrow: string;
  title: string;
  lead: string;
  heroCtaLabel: string;
  heroSummaryLabel: string;
  heroSummaryTitle: string;
  heroSummaryDescription: string;
  heroStats: Stat[];
  introCards: Card[];
  featuresEyebrow: string;
  featuresTitle: string;
  featuresDescription: string;
  featureCards: Card[];
  stepsEyebrow: string;
  stepsTitle: string;
  stepsDescription: string;
  workflowSteps: Step[];
  useCasesEyebrow: string;
  useCasesTitle: string;
  useCasesDescription: string;
  useCaseCards: Card[];
  faqEyebrow: string;
  faqTitle: string;
  faqDescription: string;
  faqs: Faq[];
  ctaTitle: string;
  ctaDescription: string;
  visualLabel: string;
  visualTitle: string;
  visualDescription: string;
  visualMetrics: VisualMetric[];
  queueTitle: string;
  queueItems: QueueItem[];
};

export default function BulkEmailSolutionPage({
  pageTitle,
  canonicalPath,
  eyebrow,
  title,
  lead,
  heroCtaLabel,
  heroSummaryLabel,
  heroSummaryTitle,
  heroSummaryDescription,
  heroStats,
  introCards,
  featuresEyebrow,
  featuresTitle,
  featuresDescription,
  featureCards,
  stepsEyebrow,
  stepsTitle,
  stepsDescription,
  workflowSteps,
  useCasesEyebrow,
  useCasesTitle,
  useCasesDescription,
  useCaseCards,
  faqEyebrow,
  faqTitle,
  faqDescription,
  faqs,
  ctaTitle,
  ctaDescription,
  visualLabel,
  visualTitle,
  visualDescription,
  visualMetrics,
  queueTitle,
  queueItems,
}: SolutionPageData) {
  return (
    <div className="bulk-email-theme min-h-screen bg-gradient-to-b from-white via-[#f6faff] to-[#fff7ef]">
      <PageSEO
        title={pageTitle}
        description={lead}
        canonicalPath={canonicalPath}
      />
      <style>{`
        @keyframes bulkEmailWordRise {
          0%,
          100% {
            opacity: 1;
            transform: translateY(0);
          }

          50% {
            opacity: 0.92;
            transform: translateY(-1px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bulk-email-animated-title span {
            animation: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
      <BulkEmailNavbar />

      <main className="overflow-hidden">
        <section className="hero-gradient relative overflow-hidden pt-8 sm:pt-10 lg:pt-12">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-[#1d4ed8]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-[#d97706]/10 blur-3xl" />

          <div className="site-container">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <ScrollReveal variant="fade-up" className="lg:col-span-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#1d4ed8]/20 bg-gradient-to-r from-white via-[#eff6ff] to-[#fffbf4] px-4 py-2 text-xs font-extrabold tracking-normal text-[#1d4ed8] shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  {eyebrow}
                </span>

                <AnimatedTitle
                  as="h1"
                  className="mt-4 max-w-3xl text-4xl leading-[1.02] sm:text-5xl lg:text-[4.05rem]"
                >
                  {title}
                </AnimatedTitle>

                <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
                  {lead}
                </p>

                <div className="soft-card mt-6 p-5 bg-gradient-to-br from-[#1d4ed8]/5 via-white to-[#d97706]/8">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#b45309]">
                    {heroSummaryLabel}
                  </div>
                  <div className="mt-2 text-lg font-semibold tracking-tight text-ink">
                    {heroSummaryTitle}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">
                    {heroSummaryDescription}
                  </p>
                </div>

                <div className="button-group mt-6 justify-start">
                  <Link to={ROUTES.bookDemo} className={bulkEmailPrimaryCta}>
                    Book Free Demo
                  </Link>
                  <a href="#features" className={bulkEmailSecondaryCta}>
                    {heroCtaLabel}
                  </a>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {introCards.map((card, index) => (
                    <ScrollReveal
                      key={card.title}
                      variant="fade-up"
                      delay={80 + index * 50}
                      className="soft-card h-full bg-gradient-to-br from-white via-white to-[#fff7ef] p-4"
                    >
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/10 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                        <card.icon className="h-5 w-5" />
                      </span>
                      <div className="mt-4 text-sm font-semibold text-ink">{card.title}</div>
                      <p className="mt-2 text-xs leading-5 text-ink-soft">{card.description}</p>
                    </ScrollReveal>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" delay={100} className="lg:col-span-6">
                <SolutionHeroMock
                  label={visualLabel}
                  title={visualTitle}
                  description={visualDescription}
                  metrics={visualMetrics}
                  queueTitle={queueTitle}
                  queueItems={queueItems}
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeader
              eyebrow={featuresEyebrow}
              title={featuresTitle}
              description={featuresDescription}
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {featureCards.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 30}>
                  <article className="soft-card group h-full bg-gradient-to-br from-white via-white to-[#fff7ef] p-5 transition-transform duration-300 hover:-translate-y-1">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/10 via-white to-[#d97706]/14 text-[#1d4ed8] transition-transform duration-300 group-hover:scale-105">
                      <card.icon className="h-5 w-5" />
                    </span>
                    <div className="mt-4 text-base font-semibold text-ink">{card.title}</div>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1d4ed8]">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeader
              eyebrow={stepsEyebrow}
              title={stepsTitle}
              description={stepsDescription}
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {workflowSteps.map((step, index) => (
                <ScrollReveal key={step.step} variant="fade-up" delay={index * 35}>
                  <article className="soft-card relative h-full p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-primary-soft px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                        {step.step}
                      </span>
                      <span className="hidden rounded-full bg-surface px-2 py-1 text-[10px] font-semibold text-ink-soft lg:inline-flex">
                        {index + 1}/6
                      </span>
                    </div>
                    <div className="mt-4 text-base font-semibold text-ink">{step.title}</div>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{step.description}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeader
              eyebrow={useCasesEyebrow}
              title={useCasesTitle}
              description={useCasesDescription}
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {useCaseCards.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 30}>
                  <article className="soft-card group h-full bg-gradient-to-br from-white via-white to-[#fff7ef] p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float">
                    <div className="flex items-center justify-between gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/10 via-white to-[#d97706]/14 text-[#1d4ed8] transition-transform duration-300 group-hover:scale-105">
                        <card.icon className="h-5 w-5" />
                      </span>
                      <span className="rounded-full bg-gradient-to-r from-white via-[#eff6ff] to-[#fffbf4] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#b45309] shadow-sm">
                        Use case
                      </span>
                    </div>
                    <div className="mt-4 text-base font-semibold text-ink">{card.title}</div>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container grid gap-6 lg:grid-cols-12 lg:items-start">
            <ScrollReveal variant="fade-up" className="lg:col-span-4">
              <div className="section-heading text-left">
                <span className="eyebrow text-xs font-bold uppercase tracking-wider text-primary">
                  {faqEyebrow}
                </span>
                <h2 className="text-3xl font-bold text-ink md:text-4xl">{faqTitle}</h2>
                <p className="text-ink-soft">{faqDescription}</p>
              </div>

              <div className="soft-card mt-5 p-5">
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  Need a tailored setup?
                </div>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  {ctaDescription}
                </p>
                <div className="button-group mt-5">
                  <Link to={ROUTES.bookDemo} className={bulkEmailPrimaryCta}>
                    Book Free Demo
                  </Link>
                  <Link to={ROUTES.bulkEmailContact} className="btn-ghost">
                    Contact Sales
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={80} className="lg:col-span-8">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={faq.q}
                    value={`faq-${index}`}
                    className="overflow-hidden rounded-[1.25rem] border border-border bg-white px-4 shadow-card"
                  >
                    <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink no-underline hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pt-0 text-sm leading-6 text-ink-soft">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          </div>
        </section>

        <section className="cta-section bg-white scroll-mt-24">
          <div className="site-container">
            <ScrollReveal
              variant="scale"
              className="cta-box relative overflow-hidden bg-gradient-to-br from-[#1d4ed8] to-[#d97706] text-center"
            >
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#d97706]/18 blur-3xl" />
              <div className="relative">
                <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white md:text-5xl">
                  {ctaTitle}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-white/80">{ctaDescription}</p>
                <div className="button-group mt-7 justify-center">
                  <Link
                    to={ROUTES.bookDemo}
                    className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary-soft"
                  >
                    Book Free Demo
                  </Link>
                  <Link
                    to={ROUTES.bulkEmailContact}
                    className="inline-flex items-center rounded-lg border border-white/25 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <ScrollReveal variant="fade-up" className="section-heading text-left">
      <span className="eyebrow text-xs font-bold uppercase tracking-wider text-[#b45309]">{eyebrow}</span>
      <AnimatedTitle as="h2" className="text-3xl md:text-4xl">
        {title}
      </AnimatedTitle>
      <p className="text-ink-soft">{description}</p>
    </ScrollReveal>
  );
}

function AnimatedTitle({
  as = "h2",
  className,
  children,
}: {
  as?: "h1" | "h2";
  className?: string;
  children: string;
}) {
  const Component = as;
  const words = children.split(/\s+/).filter(Boolean);

  return (
    <Component
      className={cn(
        "bulk-email-animated-title mx-auto text-balance font-bold tracking-[-0.03em] leading-[1.02]",
        as === "h1" ? "text-ink" : "text-ink",
        className,
      )}
      aria-label={children}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={cn(
            "inline-block",
            index % 2 === 0 ? "text-[#1d4ed8]" : "text-[#b45309]",
          )}
          style={{
            animation: "bulkEmailWordRise 0.55s ease-out both",
            animationDelay: `${index * 70}ms`,
            marginRight: index < words.length - 1 ? "0.35em" : 0,
          }}
        >
          {word}
        </span>
      ))}
    </Component>
  );
}

function SolutionHeroMock({
  label,
  title,
  description,
  metrics,
  queueTitle,
  queueItems,
}: {
  label: string;
  title: string;
  description: string;
  metrics: VisualMetric[];
  queueTitle: string;
  queueItems: QueueItem[];
}) {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="pointer-events-none absolute -top-5 left-4 hidden rounded-full bg-gradient-to-r from-white via-[#eff6ff] to-[#fff7ef] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1d4ed8] shadow-pop float-slow md:block">
        {label}
      </div>
      <div className="pointer-events-none absolute -right-3 top-24 hidden rounded-full bg-[#d97706] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-pop float-slow md:block">
        {queueTitle}
      </div>
      <div className="pointer-events-none absolute -bottom-6 left-20 hidden rounded-full bg-gradient-to-r from-white via-[#fffbf4] to-[#eff6ff] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#b45309] shadow-pop float-slow md:block">
        {metrics[metrics.length - 1]?.label ?? "Live"}
      </div>

      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white shadow-float">
        <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <div className="ml-auto text-xs font-medium text-ink-soft">Altroz Bulk Email Dashboard</div>
        </div>

        <div className="grid gap-4 p-5">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-[#1d4ed8]/5 via-white to-[#d97706]/8 p-5">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#b45309]">
              {label}
            </div>
            <div className="mt-2 text-2xl font-bold tracking-tight text-ink">{title}</div>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{description}</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {metrics.map((item) => (
                <div key={item.label} className="rounded-2xl bg-white p-3 shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#b45309]">
                    {item.label}
                  </div>
                  <div className="mt-1 text-lg font-bold text-ink">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="soft-card bg-gradient-to-br from-white via-white to-[#fff7ef] p-4">
              <div className="flex items-center justify-between text-sm font-semibold text-ink">
                <span>Delivery Rate</span>
                <span className="text-[#b45309]">99.2%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-surface">
                <div className="h-2 w-[99%] rounded-full bg-gradient-to-r from-primary to-[#d97706]" />
              </div>
            </div>
            <div className="soft-card bg-gradient-to-br from-white via-white to-[#eff6ff] p-4">
              <div className="flex items-center justify-between text-sm font-semibold text-ink">
                <span>Subscription Use</span>
                <span className="text-[#1d4ed8]">42%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-surface">
                <div className="h-2 w-[42%] rounded-full bg-gradient-to-r from-primary to-primary/60" />
              </div>
            </div>
          </div>

          <div className="soft-card bg-gradient-to-br from-white via-white to-[#fff7ef] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#b45309]">
                  {queueTitle}
                </div>
                <div className="mt-1 text-sm font-semibold text-ink">Queued and scheduled sends</div>
              </div>
              <Gauge className="h-5 w-5 text-[#b45309]" />
            </div>

            <div className="mt-4 space-y-3">
              {queueItems.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-white via-white to-[#f8fbff] px-3 py-2 shadow-sm"
                >
                  <div className="text-sm font-medium text-ink">{item.title}</div>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em]",
                      item.status === "Live"
                        ? "bg-gradient-to-r from-[#eff6ff] to-[#fff7ef] text-[#1d4ed8]"
                        : item.status === "Ready"
                          ? "bg-[#d97706]/10 text-[#b45309]"
                          : "bg-surface text-ink-soft",
                    )}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
