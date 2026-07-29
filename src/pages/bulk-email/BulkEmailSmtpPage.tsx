import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Factory,
  FileText,
  Gauge,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  MailCheck,
  Megaphone,
  ServerCog,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
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
            animation: "bulkEmailSmtpWordRise 0.55s ease-out both",
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
  { label: "SMTP Ready", value: "100%", note: "Sending setup configured" },
  { label: "Sender Controls", value: "6", note: "Host, port, auth and TLS" },
  { label: "Delivery Tracking", value: "Live", note: "Monitor outgoing mail" },
  { label: "Templates Connected", value: "24", note: "Works with reusable designs" },
];

const smtpBenefits: Card[] = [
  {
    title: "Reliable Sending",
    description: "Configure your outgoing mail server for dependable business delivery.",
    icon: ServerCog,
  },
  {
    title: "Sender Identity Control",
    description: "Keep sender email, host and authentication settings under your control.",
    icon: ShieldCheck,
  },
  {
    title: "Queue Visibility",
    description: "See what is waiting, what is live and what has already been sent.",
    icon: Workflow,
  },
  {
    title: "Structured Delivery",
    description: "Use a clear SMTP workflow that helps teams send campaigns confidently.",
    icon: MailCheck,
  },
  {
    title: "Status Reporting",
    description: "Review delivery outcomes and campaign status from one place.",
    icon: FileText,
  },
  {
    title: "Business Scale",
    description: "Support growing communication needs as your mailing volume increases.",
    icon: TrendingUp,
  },
];

const smtpFeatures: Card[] = [
  {
    title: "Server Settings",
    description: "Add host, port and encryption settings for your SMTP connection.",
    icon: ServerCog,
  },
  {
    title: "Authentication",
    description: "Secure your connection with proper sender authentication details.",
    icon: ShieldCheck,
  },
  {
    title: "Sender Email",
    description: "Use the sender identity that your business wants recipients to see.",
    icon: MailCheck,
  },
  {
    title: "TLS / SSL",
    description: "Protect outbound mail traffic with secure connection settings.",
    icon: Clock3,
  },
  {
    title: "Campaign Queue",
    description: "Keep outgoing mail organised in a structured broadcast queue.",
    icon: LayoutDashboard,
  },
  {
    title: "Delivery Reports",
    description: "Check delivery and status details after your campaigns are sent.",
    icon: FileText,
  },
  {
    title: "Template Support",
    description: "Send SMTP-driven campaigns using reusable email templates.",
    icon: Sparkles,
  },
  {
    title: "Performance Insights",
    description: "Review campaign trends and delivery outcomes for future planning.",
    icon: Gauge,
  },
];

const smtpSteps: Step[] = [
  {
    step: "Step 1",
    title: "Enter SMTP Details",
    description: "Add host, port and sender settings for your email server connection.",
  },
  {
    step: "Step 2",
    title: "Authenticate Sender",
    description: "Use the right credentials and secure connection settings for your setup.",
  },
  {
    step: "Step 3",
    title: "Connect Campaigns",
    description: "Link your campaign workflow so outgoing messages use the SMTP setup.",
  },
  {
    step: "Step 4",
    title: "Send or Schedule",
    description: "Launch immediately or schedule messages through the broadcast queue.",
  },
  {
    step: "Step 5",
    title: "Monitor Delivery",
    description: "Track email status and delivery results from the dashboard.",
  },
];

const previewCards = [
  {
    title: "Connection Panel",
    description: "Shows host, port, TLS and authentication controls in one setup area.",
    chips: ["Host", "Port", "TLS"],
  },
  {
    title: "Queue View",
    description: "Displays outgoing campaigns waiting to be sent through SMTP.",
    chips: ["Queue", "Live", "Scheduled"],
  },
  {
    title: "Delivery Report",
    description: "Summarises sent status and delivery results after sending.",
    chips: ["Sent", "Delivery", "Report"],
  },
];

const useCases: Card[] = [
  {
    title: "HR Teams",
    description: "Send policy updates and internal messages through a controlled sender setup.",
    icon: Users,
  },
  {
    title: "Marketing Teams",
    description: "Run brand campaigns with a verified SMTP connection and reusable templates.",
    icon: Megaphone,
  },
  {
    title: "Education",
    description: "Deliver notices, admissions updates and circulars through managed sending.",
    icon: GraduationCap,
  },
  {
    title: "Healthcare",
    description: "Send appointment reminders and notices using dependable delivery settings.",
    icon: HeartPulse,
  },
  {
    title: "Manufacturing",
    description: "Share supplier updates and notices with a structured mail flow.",
    icon: Factory,
  },
  {
    title: "Retail",
    description: "Send offers and updates with control over sender configuration and delivery.",
    icon: ShoppingBag,
  },
];

const faqs: Faq[] = [
  {
    q: "What is SMTP in Altroz Bulk Email?",
    a: "SMTP is the sending setup that connects your outgoing mail server so campaigns are delivered through a controlled sender identity.",
  },
  {
    q: "Why do businesses configure SMTP?",
    a: "Businesses configure SMTP to keep control over outgoing mail settings, sender identity and delivery flow.",
  },
  {
    q: "Can I use my own sender email?",
    a: "Yes. You can use your own sender email and connect it to the SMTP settings in the platform.",
  },
  {
    q: "Does SMTP work with templates?",
    a: "Yes. SMTP sending works with reusable templates and custom HTML email layouts.",
  },
  {
    q: "Can I track delivery after sending?",
    a: "Yes. Delivery tracking and reports help you review what happened after the campaign leaves the queue.",
  },
  {
    q: "Is SMTP useful for multiple teams?",
    a: "Yes. HR, marketing, education, healthcare and operations teams can all use it effectively.",
  },
];

export default function BulkEmailSmtpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f6faff] to-[#fffbf4]">
      <PageSEO
        title="Bulk Email SMTP | Altroz"
        description="Altroz Bulk Email SMTP helps businesses configure sender settings, manage delivery and send campaigns through a controlled email server setup."
        canonicalPath={ROUTES.bulkEmailSmtp}
      />
      <style>{`
        @keyframes bulkEmailSmtpWordRise {
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
                Trusted SMTP Configuration for Business Email
              </div>

              <AnimatedTitle as="h1" className="mx-auto mt-4 max-w-4xl text-4xl sm:text-5xl lg:text-[4.15rem]">
                SMTP Setup Built for Reliable Business Email Delivery
              </AnimatedTitle>

              <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg">
                Connect your outgoing mail server, manage sender identity and keep every campaign
                delivery flow organised inside Altroz Bulk Email.
              </p>

              <div className="button-group mt-7 justify-center">
                <Link to={ROUTES.bookDemo} className="btn-primary">
                  Book Free Demo
                </Link>
                <a href="#setup" className="btn-outline">
                  View Setup
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

        <section id="smtp-benefits" className="section scroll-mt-24">
          <div className="site-container">
            <ScrollReveal variant="fade-up" className="section-heading">
              <span className="eyebrow text-xs font-bold uppercase tracking-wider text-[#b45309]">
                Why SMTP Matters
              </span>
              <AnimatedTitle as="h2" className="text-3xl md:text-4xl">
                SMTP gives your bulk email workflow the sending control it needs
              </AnimatedTitle>
              <p className="text-ink-soft">
                A controlled sending setup helps businesses manage delivery, sender identity and campaign reliability.
              </p>
            </ScrollReveal>

            <StaggerReveal step={60} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {smtpBenefits.map((card) => (
                <FeatureCard key={card.title} card={card} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="setup" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <ScrollReveal variant="fade-up" className="section-heading text-left">
              <span className="eyebrow text-xs font-bold uppercase tracking-wider text-[#b45309]">
                Setup Details
              </span>
              <AnimatedTitle as="h2" className="mx-0 text-3xl md:text-4xl">
                The SMTP workflow is straightforward and easy for business teams to follow
              </AnimatedTitle>
              <p className="text-ink-soft">
                Each step keeps configuration clear so the sending process stays predictable.
              </p>
            </ScrollReveal>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {smtpFeatures.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 40}>
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
                From server setup to delivery tracking in five simple steps
              </AnimatedTitle>
              <p className="text-ink-soft">
                A clear workflow that helps teams connect SMTP and send campaigns with confidence.
              </p>
            </ScrollReveal>

            <div className="grid gap-4 lg:grid-cols-5">
              {smtpSteps.map((step, index) => (
                <ScrollReveal key={step.step} variant="fade-up" delay={index * 50}>
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
                    {index < smtpSteps.length - 1 ? (
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
                SMTP Preview
              </span>
              <AnimatedTitle as="h2" className="mx-0 text-3xl md:text-4xl">
                A clear view of SMTP configuration and delivery status
              </AnimatedTitle>
              <p className="text-ink-soft">
                The preview panel shows the kind of structured control teams get inside the product.
              </p>
            </ScrollReveal>

            <div className="grid gap-5 xl:grid-cols-12 xl:items-start">
              <ScrollReveal variant="scale" className="xl:col-span-7">
                <article className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-card">
                  <div className="border-b border-border bg-surface px-5 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#b45309]">
                          SMTP Dashboard
                        </div>
                        <div className="mt-1 text-lg font-semibold text-ink">Sender and server setup</div>
                      </div>
                      <div className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1d4ed8] shadow-sm">
                        Connected
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 p-5 md:grid-cols-2">
                    <div className="rounded-[1.5rem] bg-gradient-to-br from-[#1d4ed8]/5 via-white to-[#d97706]/5 p-5">
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#1d4ed8]">
                        Connection Details
                      </div>
                      <div className="mt-3 space-y-3 text-sm text-ink-soft">
                        <div className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm">
                          <span>Host</span>
                          <span className="font-semibold text-ink">smtp.company.com</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm">
                          <span>Port</span>
                          <span className="font-semibold text-ink">587</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm">
                          <span>Encryption</span>
                          <span className="font-semibold text-ink">TLS</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm">
                          <span>Authentication</span>
                          <span className="font-semibold text-ink">Enabled</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {previewCards.map((card) => (
                        <div key={card.title} className="rounded-[1.5rem] border border-border bg-white p-4 shadow-sm">
                          <div className="text-sm font-semibold text-ink">{card.title}</div>
                          <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {card.chips.map((chip) => (
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
                    SMTP keeps outgoing email controlled, secure and trackable
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">
                    Businesses can manage sender identity and delivery flow while keeping reporting in one place.
                  </p>

                  <div className="mt-5 space-y-3">
                    {[
                      "Controlled sender settings",
                      "Secure delivery flow",
                      "Queue visibility",
                      "Delivery reports",
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
                Teams use SMTP to keep important business email reliable
              </AnimatedTitle>
              <p className="text-ink-soft">
                Built for organisations that need predictable sending and easy review after delivery.
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
                  Answers to the most common SMTP questions
                </AnimatedTitle>
                <p className="text-ink-soft">
                  Clear answers that help visitors understand how SMTP fits into the bulk email workflow.
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
                  We can help you configure SMTP for your team
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  Bring your server details, sender identity and workflow goals to a live demo.
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    "SMTP host and port",
                    "Sender email setup",
                    "TLS / SSL settings",
                    "Delivery tracking",
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
                  <Link to={ROUTES.bulkEmailTemplates} className="btn-ghost">
                    View Templates
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
                  Ready to configure SMTP for reliable business delivery?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-white/80">
                  Keep sender setup, delivery tracking and campaign workflow inside one clean bulk email platform.
                </p>
                <div className="button-group mt-7 justify-center">
                  <Link
                    to={ROUTES.bookDemo}
                    className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-[#1d4ed8] transition-colors hover:bg-[#fffbf4]"
                  >
                    Book Free Demo
                  </Link>
                  <a
                    href="#smtp-benefits"
                    className="inline-flex items-center rounded-lg border border-white/25 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    View Benefits
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
