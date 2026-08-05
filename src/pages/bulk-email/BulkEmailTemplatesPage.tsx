import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  LayoutDashboard,
  MailCheck,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  CalendarClock,
  Gauge,
  Clock3,
  Factory,
  GraduationCap,
  HeartPulse,
  ShoppingBag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Footer from "@/components/site/Footer";
import BulkEmailNavbar from "@/components/site/BulkEmailNavbar";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import PageSEO from "@/components/site/PageSEO";
import { ROUTES } from "@/routes/routeConfig.js";
import { cn } from "@/lib/utils";

type Card = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type Stat = {
  label: string;
  value: string;
  note: string;
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

type AnimatedTitleProps = {
  as?: "h1" | "h2";
  className?: string;
  children: string;
};

function AnimatedTitle({ as = "h2", className, children }: AnimatedTitleProps) {
  const Component = as;
  const words = children.split(/\s+/).filter(Boolean);

  return (
    <Component className={cn("bulk-email-animated-title mx-auto font-bold leading-[1.04] tracking-[-0.03em]", className)}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={cn("inline-block", index % 2 === 0 ? "text-[#1d4ed8]" : "text-[#b45309]")}
          style={{
            animation: "bulkEmailTemplateWordRise 0.55s ease-out both",
            animationDelay: `${index * 60}ms`,
            marginRight: index < words.length - 1 ? "0.35em" : 0,
          }}
        >
          {word}
        </span>
      ))}
    </Component>
  );
}

const heroStats: Stat[] = [
  { label: "Ready Templates", value: "24", note: "Built for business campaigns" },
  { label: "Custom HTML", value: "100%", note: "Upload your own design" },
  { label: "Reusable Blocks", value: "12", note: "Sections you can re-use" },
  { label: "Teams Covered", value: "5+", note: "HR, marketing and more" },
];

const templateBenefits: Card[] = [
  {
    title: "Brand Consistency",
    description: "Keep headers, buttons and email layouts aligned across every campaign.",
    icon: ShieldCheck,
  },
  {
    title: "Faster Campaign Creation",
    description: "Start from a ready structure instead of building every email from scratch.",
    icon: Clock3,
  },
  {
    title: "Responsive Layouts",
    description: "Use templates that work cleanly on desktop and mobile screens.",
    icon: LayoutDashboard,
  },
  {
    title: "HTML Upload Support",
    description: "Bring in your own HTML email designs when you want full creative control.",
    icon: FileText,
  },
  {
    title: "Reusable Blocks",
    description: "Save common sections for calls to action, highlights and closing notes.",
    icon: Workflow,
  },
  {
    title: "Safer Delivery Flow",
    description: "Use a structured format that helps teams send organised, polished messages.",
    icon: MailCheck,
  },
];

const templateLibrary: Card[] = [
  {
    title: "Announcement Template",
    description: "For policy updates, internal notices and company-wide communication.",
    icon: Megaphone,
  },
  {
    title: "Newsletter Template",
    description: "For recurring updates, summaries and monthly communication.",
    icon: FileText,
  },
  {
    title: "Reminder Template",
    description: "For event reminders, due dates and scheduled follow-ups.",
    icon: CalendarClock,
  },
  {
    title: "HR Template",
    description: "For onboarding, employee notices and workplace communication.",
    icon: Users,
  },
  {
    title: "Marketing Template",
    description: "For promotions, launches and audience-focused campaigns.",
    icon: Sparkles,
  },
  {
    title: "Education Template",
    description: "For circulars, exam notices and admissions updates.",
    icon: GraduationCap,
  },
];

const templateSteps: Step[] = [
  {
    step: "Step 1",
    title: "Choose Template",
    description: "Pick a template from the library or start with a blank layout.",
  },
  {
    step: "Step 2",
    title: "Add Content",
    description: "Fill in the subject, body text, attachments and call-to-action blocks.",
  },
  {
    step: "Step 3",
    title: "Brand It",
    description: "Match buttons, headers and highlighted sections to your business style.",
  },
  {
    step: "Step 4",
    title: "Preview & Check",
    description: "Review the layout before using it in a live campaign.",
  },
  {
    step: "Step 5",
    title: "Save and Reuse",
    description: "Store the template for future broadcasts and faster campaign creation.",
  },
];

const screenCards = [
  {
    title: "Template Builder",
    description: "A clean workspace for building and editing email layouts.",
    chips: ["Blocks", "Layout", "Preview"],
  },
  {
    title: "HTML Upload",
    description: "Bring in custom HTML email designs from your own brand kit.",
    chips: ["Upload", "Code", "Brand"],
  },
  {
    title: "Saved Templates",
    description: "Store reusable designs so future sends stay consistent.",
    chips: ["Saved", "Ready", "Reusable"],
  },
];

const useCases: Card[] = [
  {
    title: "HR Teams",
    description: "Use templates for onboarding, policy changes and employee communication.",
    icon: Users,
  },
  {
    title: "Marketing Teams",
    description: "Build branded campaigns that stay visually consistent across sends.",
    icon: Megaphone,
  },
  {
    title: "Education",
    description: "Send admission notices, circulars and event updates in a standard format.",
    icon: GraduationCap,
  },
  {
    title: "Healthcare",
    description: "Share appointment reminders and notices using reliable message layouts.",
    icon: HeartPulse,
  },
  {
    title: "Manufacturing",
    description: "Distribute supplier updates and internal notices with repeatable templates.",
    icon: Factory,
  },
  {
    title: "Retail",
    description: "Prepare promotional and transactional emails with consistent styling.",
    icon: ShoppingBag,
  },
];

const faqs: Faq[] = [
  {
    q: "What is a bulk email template?",
    a: "A bulk email template is a reusable email layout that helps teams create consistent campaigns faster.",
  },
  {
    q: "Can I upload my own HTML template?",
    a: "Yes. Altroz Bulk Email supports custom HTML email uploads for teams that want full design control.",
  },
  {
    q: "Can templates be reused?",
    a: "Yes. You can save templates and reuse them for future campaigns without rebuilding the layout.",
  },
  {
    q: "Are templates useful for HR and marketing?",
    a: "Yes. Templates work well for HR updates, marketing campaigns, education notices and more.",
  },
  {
    q: "Do templates support attachments?",
    a: "Yes. You can include attachments as part of your email workflow when needed.",
  },
  {
    q: "Do templates help with mobile layout?",
    a: "Yes. Responsive template structure helps emails stay readable on smaller screens.",
  },
];

export default function BulkEmailTemplatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f6faff] to-[#fffbf4]">
      <PageSEO
        title="Bulk Email Templates | Altroz"
        description="Altroz Bulk Email templates help businesses create branded email campaigns faster with reusable layouts, HTML upload support and clean campaign structure."
        canonicalPath={ROUTES.bulkEmailTemplates}
      />
      <style>{`
        @keyframes bulkEmailTemplateWordRise {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
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
            <ScrollReveal variant="fade-up" className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1d4ed8]/20 bg-gradient-to-r from-white via-[#eff6ff] to-[#fffbf4] px-4 py-2 text-xs font-extrabold tracking-normal text-[#1d4ed8] shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Trusted Business Email Template Library
              </div>

              <AnimatedTitle as="h1" className="mx-auto mt-4 max-w-4xl text-4xl sm:text-5xl lg:text-[4.15rem]">
                Bulk Email Templates Built for Faster Brand-Consistent Campaigns
              </AnimatedTitle>

              <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg">
                Create polished campaigns faster with reusable email layouts, HTML upload support
                and structured blocks that keep every message on brand.
              </p>

              <div className="button-group mt-7 justify-center">
                <Link to={ROUTES.bookDemo} className="btn-primary">
                  Book Free Demo
                </Link>
                <a href="#library" className="btn-outline">
                  Explore Templates
                </a>
              </div>
            </ScrollReveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {heroStats.map((stat, index) => (
                <ScrollReveal key={stat.label} variant="fade-up" delay={80 + index * 45}>
                  <article className="soft-card h-full p-5">
                    <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#b45309]">
                      {stat.label}
                    </div>
                    <div className="mt-3 text-3xl font-bold tracking-tight text-ink">{stat.value}</div>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{stat.note}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="what-templates-do" className="section scroll-mt-24">
          <div className="site-container">
            <ScrollReveal variant="fade-up" className="section-heading">
              <span className="eyebrow text-xs font-bold uppercase tracking-wider text-[#b45309]">
                What Templates Do
              </span>
              <AnimatedTitle as="h2" className="text-3xl md:text-4xl">
                The template system keeps campaigns structured, fast and reusable
              </AnimatedTitle>
              <p className="text-ink-soft">
                Templates give teams a repeatable way to build emails without losing layout quality
                or brand consistency.
              </p>
            </ScrollReveal>

            <StaggerReveal step={60} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {templateBenefits.map((card) => (
                <FeatureCard key={card.title} card={card} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="library" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <ScrollReveal variant="fade-up" className="section-heading text-left">
              <span className="eyebrow text-xs font-bold uppercase tracking-wider text-[#b45309]">
                Template Library
              </span>
              <AnimatedTitle as="h2" className="mx-0 text-3xl md:text-4xl">
                Ready-to-use template types for the campaigns your teams send most
              </AnimatedTitle>
              <p className="text-ink-soft">
                Use a clean template base for common business communication and adapt it as needed.
              </p>
            </ScrollReveal>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {templateLibrary.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 45}>
                  <article className="soft-card group h-full p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <card.icon className="h-5 w-5" />
                    </span>
                    <div className="mt-4 text-base font-semibold text-ink">{card.title}</div>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="section scroll-mt-24">
          <div className="site-container">
            <ScrollReveal variant="fade-up" className="section-heading">
              <span className="eyebrow text-xs font-bold uppercase tracking-wider text-[#b45309]">
                How It Works
              </span>
              <AnimatedTitle as="h2" className="text-3xl md:text-4xl">
                From template selection to saved campaign in five simple steps
              </AnimatedTitle>
              <p className="text-ink-soft">
                A quick workflow that helps business users build consistent email campaigns without friction.
              </p>
            </ScrollReveal>

            <div className="grid gap-4 lg:grid-cols-5">
              {templateSteps.map((step, index) => (
                <ScrollReveal key={step.step} variant="fade-up" delay={index * 55}>
                  <article className="soft-card relative h-full p-5">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-gradient-to-r from-[#1d4ed8]/12 via-white to-[#d97706]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1d4ed8]">
                        {step.step}
                      </span>
                      <span className="hidden rounded-full bg-surface px-2 py-1 text-[10px] font-semibold text-ink-soft lg:inline-flex">
                        {index + 1}/5
                      </span>
                    </div>
                    <div className="mt-4 text-base font-semibold text-ink">{step.title}</div>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{step.description}</p>
                    {index < templateSteps.length - 1 ? (
                      <ArrowRight className="mt-4 hidden h-4 w-4 text-primary/70 lg:block" />
                    ) : null}
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="preview" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <ScrollReveal variant="fade-up" className="section-heading text-left">
              <span className="eyebrow text-xs font-bold uppercase tracking-wider text-[#b45309]">
                Template Preview
              </span>
              <AnimatedTitle as="h2" className="mx-0 text-3xl md:text-4xl">
                A clean preview of what a template looks like inside the workflow
              </AnimatedTitle>
              <p className="text-ink-soft">
                These preview panels show how templates can stay polished, readable and campaign-ready.
              </p>
            </ScrollReveal>

            <div className="grid gap-5 xl:grid-cols-12 xl:items-start">
              <ScrollReveal variant="scale" className="xl:col-span-7">
                <article className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-card">
                  <div className="border-b border-border bg-surface px-5 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#b45309]">
                          Template Preview
                        </div>
                        <div className="mt-1 text-lg font-semibold text-ink">Brand campaign email</div>
                      </div>
                      <div className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1d4ed8] shadow-sm">
                        Live View
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 p-5 md:grid-cols-2">
                    <div className="rounded-[1.5rem] bg-gradient-to-br from-[#1d4ed8]/5 via-white to-[#d97706]/5 p-5">
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#1d4ed8]">
                        Header Area
                      </div>
                      <div className="mt-3 text-2xl font-bold tracking-tight text-ink">
                        Clean design for announcements and updates
                      </div>
                      <div className="mt-3 h-2 w-5/6 rounded-full bg-primary/10" />
                      <div className="mt-2 h-2 w-3/4 rounded-full bg-[#d97706]/10" />
                      <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
                        <div className="text-sm font-semibold text-ink">CTA button</div>
                        <div className="mt-2 inline-flex rounded-lg bg-[#1d4ed8] px-4 py-2 text-sm font-semibold text-white">
                          Read More
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {screenCards.map((screen) => (
                        <div key={screen.title} className="rounded-[1.5rem] border border-border bg-white p-4 shadow-sm">
                          <div className="text-sm font-semibold text-ink">{screen.title}</div>
                          <p className="mt-2 text-sm leading-6 text-ink-soft">{screen.description}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {screen.chips.map((chip) => (
                              <span
                                key={chip}
                                className="rounded-full bg-[#1d4ed8]/8 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1d4ed8]"
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" delay={90} className="xl:col-span-5">
                <div className="soft-card sticky top-24 p-6">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#b45309]">
                    Why it matters
                  </div>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                    Templates make bulk email easier to manage and easier to reuse
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">
                    Teams can create once, reuse often and keep message quality aligned across campaigns.
                  </p>

                  <div className="mt-5 space-y-3">
                    {[
                      "Faster campaign setup",
                      "Consistent brand styling",
                      "Reusable layouts",
                      "HTML upload support",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 rounded-xl bg-white p-3 text-sm font-medium text-ink shadow-sm">
                        <CheckCircle2 className="h-4 w-4 text-[#d97706]" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="button-group mt-6">
                    <Link to={ROUTES.bookDemo} className="btn-primary">
                      Book Free Demo
                    </Link>
                    <Link to={ROUTES.bulkEmailBroadcast} className="btn-ghost">
                      View Broadcast
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="use-cases" className="section scroll-mt-24">
          <div className="site-container">
            <ScrollReveal variant="fade-up" className="section-heading">
              <span className="eyebrow text-xs font-bold uppercase tracking-wider text-[#b45309]">
                Business Use Cases
              </span>
              <AnimatedTitle as="h2" className="text-3xl md:text-4xl">
                Different teams use templates in different ways
              </AnimatedTitle>
              <p className="text-ink-soft">
                Built for organisations that need repeatable communication with a polished presentation.
              </p>
            </ScrollReveal>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {useCases.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 45}>
                  <article className="soft-card group h-full p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <card.icon className="h-5 w-5" />
                    </span>
                    <div className="mt-4 text-base font-semibold text-ink">{card.title}</div>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section bg-white scroll-mt-24">
          <div className="site-container grid gap-6 lg:grid-cols-12 lg:items-start">
            <ScrollReveal variant="fade-up" className="lg:col-span-8">
              <div className="section-heading text-left">
                <span className="eyebrow text-xs font-bold uppercase tracking-wider text-[#b45309]">
                  Frequently Asked Questions
                </span>
                <AnimatedTitle as="h2" className="mx-0 text-3xl md:text-4xl">
                  Answers to common template questions
                </AnimatedTitle>
                <p className="text-ink-soft">
                  Clear answers that help teams understand how to use the template workflow.
                </p>
              </div>

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

            <ScrollReveal variant="fade-left" delay={100} className="lg:col-span-4">
              <div className="soft-card sticky top-24 p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#b45309]">
                  Need a tailored setup?
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  We can show you the best template structure for your team
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  Bring your brand styles, email goals and campaign flow to a live demo.
                </p>

                <div className="mt-5 space-y-3">
                  {["Brand headers", "Reusable blocks", "HTML upload", "Campaign preview"].map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-xl bg-white p-3 text-sm font-medium text-ink shadow-sm">
                      <CheckCircle2 className="h-4 w-4 text-[#d97706]" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="button-group mt-6">
                  <Link to={ROUTES.bookDemo} className="btn-primary">
                    Book Free Demo
                  </Link>
                  <Link to={ROUTES.bulkEmail} className="btn-ghost">
                    Back to Bulk Email
                  </Link>
                </div>
              </div>
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
                  Ready to build cleaner campaigns with reusable email templates?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-white/80">
                  Keep your business emails organised, on brand and quick to launch with Altroz Bulk Email templates.
                </p>
                <div className="button-group mt-7 justify-center">
                  <Link
                    to={ROUTES.bookDemo}
                    className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-[#1d4ed8] transition-colors hover:bg-[#fffbf4]"
                  >
                    Book Free Demo
                  </Link>
                  <a
                    href="#library"
                    className="inline-flex items-center rounded-lg border border-white/25 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    View Templates
                  </a>
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

function FeatureCard({ card }: { card: Card }) {
  return (
    <article className="group h-full rounded-[1.5rem] border border-border bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-float">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm transition-transform duration-300 group-hover:scale-105">
        <card.icon className="h-5 w-5" />
      </span>
      <div className="mt-4 text-base font-semibold text-ink">{card.title}</div>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
    </article>
  );
}
