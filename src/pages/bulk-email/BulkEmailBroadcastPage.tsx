import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Factory,
  FileText,
  Gauge,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  Layers3,
  MailCheck,
  Megaphone,
  Send,
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
import { ScrollReveal } from "@/components/site/ScrollReveal";
import PageSEO from "@/components/site/PageSEO";
import { ROUTES } from "@/routes/routeConfig.js";

type Card = {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
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

const heroStats = [
  { label: "Campaigns Sent", value: "1,248", note: "Broadcast history", icon: Send },
  { label: "Delivery Rate", value: "99.2%", note: "Delivery tracking", icon: MailCheck },
  { label: "Recipients Reached", value: "320K+", note: "Large list distribution", icon: Users },
  { label: "Queue Visibility", value: "Live", note: "Plan and review", icon: Workflow },
];

const whatIsCards: Card[] = [
  {
    title: "What email broadcasting is",
    description:
      "Email broadcasting sends one message to a large group of recipients at the same time, instead of sending each email individually.",
    icon: Megaphone,
  },
  {
    title: "How Altroz Bulk Email helps",
    description:
      "Create a campaign, add your message and recipients, then send it immediately or schedule it for later from one platform.",
    icon: LayoutDashboard,
  },
  {
    title: "Why businesses use it",
    description:
      "Teams use broadcasting for announcements, updates, offers and notices when the same accurate message must reach many people quickly.",
    icon: Users,
  },
];

const manualBenefits = [
  "Saves significant time compared to sending emails one by one",
  "Reduces the chance of errors or missed recipients",
  "Keeps a record of every campaign in one place",
  "Provides visibility into delivery status",
  "Allows scheduling so communication can be planned in advance",
];

const whyChooseCards: Card[] = [
  {
    title: "Easy Campaign Management",
    description:
      "Manage every broadcast, draft or scheduled job from one organised screen.",
    icon: Layers3,
  },
  {
    title: "Centralised Dashboard",
    description:
      "See campaign activity, subscription usage and recent broadcasts together.",
    icon: LayoutDashboard,
  },
  {
    title: "Fast Bulk Broadcasting",
    description:
      "Broadcast emails to large contact lists efficiently through a structured queue.",
    icon: Send,
  },
  {
    title: "Schedule Campaigns",
    description:
      "Set a date and time so messages reach the inbox at the right moment.",
    icon: CalendarClock,
  },
  {
    title: "Delivery Tracking",
    description:
      "See what happened to every email with live status and delivery reports.",
    icon: MailCheck,
  },
  {
    title: "Reusable Templates",
    description:
      "Save time by using templates or uploading your own HTML email design.",
    icon: FileText,
    href: ROUTES.bulkEmailTemplates,
  },
  {
    title: "Analytics and Reports",
    description:
      "Review campaign performance and use delivery data to improve future sends.",
    icon: BarChart3,
    href: ROUTES.bulkEmailAnalytics,
  },
  {
    title: "SMTP Ready",
    description:
      "Configure SMTP and sender email settings for dependable business delivery.",
    icon: ServerCog,
    href: ROUTES.bulkEmailSmtp,
  },
];

const keyFeatureCards: Card[] = [
  {
    title: "Bulk Email Broadcasting",
    description:
      "Send a single email out to a large list of recipients in one organised broadcast.",
    icon: Send,
  },
  {
    title: "Campaign Management",
    description:
      "Create, organise and review every campaign, with campaign history available for reference.",
    icon: Layers3,
  },
  {
    title: "Email Scheduling",
    description:
      "Set a future date and time for a campaign to be sent automatically.",
    icon: CalendarClock,
    href: ROUTES.bulkEmailScheduling,
  },
  {
    title: "Templates",
    description:
      "Use built-in email templates or upload your own HTML email design.",
    icon: FileText,
    href: ROUTES.bulkEmailTemplates,
  },
  {
    title: "Dashboard",
    description:
      "A central screen summarising campaign activity, recent broadcasts and subscription usage.",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    description:
      "Review email analytics for each campaign and improve future broadcasts.",
    icon: BarChart3,
    href: ROUTES.bulkEmailAnalytics,
  },
  {
    title: "SMTP Configuration",
    description:
      "Configure your own SMTP and sender email settings for outgoing campaigns.",
    icon: ServerCog,
    href: ROUTES.bulkEmailSmtp,
  },
  {
    title: "Delivery Reports",
    description:
      "Detailed reports on email status and delivery outcomes for every broadcast.",
    icon: MailCheck,
  },
];

const steps: Step[] = [
  {
    step: "Step 1",
    title: "Create Campaign",
    description:
      "Start by creating a new email broadcast campaign inside Altroz Bulk Email and define the purpose.",
  },
  {
    step: "Step 2",
    title: "Upload Email Content",
    description:
      "Add your subject line, message and recipient file to build the audience for the broadcast.",
  },
  {
    step: "Step 3",
    title: "Attach Files",
    description:
      "Upload brochures, documents or notices if you need to include attachments with the email.",
  },
  {
    step: "Step 4",
    title: "Schedule or Send",
    description:
      "Choose to send the broadcast now or schedule it for a specific date and time.",
  },
  {
    step: "Step 5",
    title: "Track Delivery",
    description:
      "Monitor delivery status directly from the dashboard as the broadcast moves out.",
  },
  {
    step: "Step 6",
    title: "Review Reports",
    description:
      "Check delivery reports and analytics to understand campaign performance and plan future broadcasts.",
  },
];

const businessBenefits: Card[] = [
  { title: "Time Saving", description: "Send to large lists without repeating the same work manually.", icon: Clock3 },
  { title: "Fewer Errors", description: "Reduce the risk of missed recipients or inconsistent messages.", icon: CheckCircle2 },
  { title: "Better Visibility", description: "See what is drafted, queued, scheduled and sent.", icon: ShieldCheck },
  { title: "Organised Records", description: "Keep campaign history in one place for future reference.", icon: FileText },
  { title: "Clear Planning", description: "Schedule communication around business calendars and events.", icon: CalendarClock },
  { title: "Accountability", description: "Track delivery status and review the result of every broadcast.", icon: MailCheck },
  { title: "Scalable Communication", description: "Handle larger communication needs as the business grows.", icon: TrendingUp },
  { title: "Reliable Delivery", description: "Use SMTP support and status tracking for dependable sends.", icon: ServerCog },
];

const screenCards = [
  {
    title: "Dashboard",
    description:
      "The dashboard gives a consolidated view of broadcasting activity, recent campaigns and usage.",
    value: "Overview",
  },
  {
    title: "Campaign List",
    description:
      "The campaign list shows every email broadcast you created, along with its current status.",
    value: "Status",
  },
  {
    title: "Broadcast Creation",
    description:
      "The broadcast creation screen guides you through subject lines, content, recipients and attachments.",
    value: "Create",
  },
  {
    title: "Delivery Status",
    description:
      "The delivery status screen shows how each broadcast is progressing after it is sent.",
    value: "Track",
  },
  {
    title: "Reports",
    description:
      "The reports screen presents delivery reports and email analytics for completed campaigns.",
    value: "Review",
  },
];

const useCases: Card[] = [
  {
    title: "HR Communication",
    description:
      "HR teams send policy updates, onboarding information and company-wide announcements.",
    icon: Users,
  },
  {
    title: "Marketing Campaigns",
    description:
      "Marketing teams plan, schedule and review campaigns to see how each broadcast performed.",
    icon: Megaphone,
  },
  {
    title: "Education",
    description:
      "Educational institutes broadcast circulars, admission updates and event notices.",
    icon: GraduationCap,
  },
  {
    title: "Healthcare",
    description:
      "Healthcare organisations send appointment reminders, health advisories and administrative updates.",
    icon: HeartPulse,
  },
  {
    title: "Manufacturing",
    description:
      "Manufacturing companies share supplier updates, internal bulletins and business notices.",
    icon: Factory,
  },
  {
    title: "Retail",
    description:
      "Retail businesses broadcast offers, updates and customer communication using templates and scheduling.",
    icon: ShoppingBag,
  },
];

const faqs: Faq[] = [
  {
    q: "What is bulk email broadcasting?",
    a: "Bulk email broadcasting is the process of sending the same email message to a large group of recipients at once instead of sending individual emails one by one.",
  },
  {
    q: "How does email broadcasting work?",
    a: "You create a campaign, add the email content, upload the recipient list, attach files if needed, and then send or schedule the broadcast. The platform handles delivery and reports.",
  },
  {
    q: "Who should use bulk email software?",
    a: "Bulk email software is useful for HR teams, marketing teams, educational institutes, healthcare organisations, manufacturing companies, retail businesses and any organisation that regularly communicates with large groups.",
  },
  {
    q: "Can I schedule email broadcasts?",
    a: "Yes. Altroz Bulk Email allows you to schedule broadcasts for a future date and time so you can plan communication in advance.",
  },
  {
    q: "Can I upload attachments?",
    a: "Yes. You can upload brochures, documents or notices along with your email broadcast.",
  },
  {
    q: "How can I track email delivery?",
    a: "Altroz Bulk Email provides delivery tracking and delivery reports so you can see the status of your broadcasts after they are sent.",
  },
  {
    q: "Does Altroz Bulk Email support SMTP?",
    a: "Yes. SMTP configuration is available so businesses can set up their own sending infrastructure inside the platform.",
  },
  {
    q: "Can I view campaign history?",
    a: "Yes. Campaign history is available so you can review previous email broadcasts whenever required.",
  },
  {
    q: "Can I manage multiple broadcasts?",
    a: "Yes. Campaign management lets you organise and manage multiple email broadcasts from a single dashboard.",
  },
  {
    q: "Is email broadcasting suitable for internal communication?",
    a: "Yes. Many organisations use broadcasting for internal communication such as company announcements, HR updates and policy notices.",
  },
  {
    q: "What is a broadcast queue?",
    a: "The broadcast queue shows email broadcasts that are scheduled or pending delivery, giving you a clear view of upcoming campaigns.",
  },
  {
    q: "Can I configure my sender email address?",
    a: "Yes. Sender email configuration lets your broadcasts go out from an address associated with your business.",
  },
  {
    q: "What kind of reports are available?",
    a: "Altroz Bulk Email provides delivery reports and email analytics so you can see how campaigns performed after sending.",
  },
  {
    q: "Is there a limit on how many emails I can send?",
    a: "Sending limits depend on your subscription plan, and usage details are visible in the platform.",
  },
  {
    q: "How do I get started with Altroz Bulk Email?",
    a: "Book a free demo and our team will walk you through the platform and show how broadcasting fits your communication process.",
  },
];

export default function BulkEmailBroadcastPage() {
  return (
    <div className="bulk-email-theme min-h-screen bg-gradient-to-b from-white via-[#f6faff] to-[#fff7ef]">
      <PageSEO
        title="Bulk Email Broadcast Software | Altroz Bulk Email"
        description="Altroz Bulk Email offers bulk email broadcast software to create, schedule and track business email campaigns. Book a free demo today."
        canonicalPath={ROUTES.bulkEmailBroadcast}
      />
      <BulkEmailNavbar />

      <main className="overflow-hidden">
        <section className="hero-gradient relative overflow-hidden pt-8 sm:pt-10 lg:pt-12">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="site-container">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <ScrollReveal variant="fade-up">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-xs font-extrabold tracking-normal text-primary shadow-sm">
                    <Sparkles className="h-3.5 w-3.5" />
                    Trusted Business Email Broadcasting Platform
                  </span>
                </ScrollReveal>

                <ScrollReveal variant="fade-up" delay={60}>
                  <h1 className="mt-4 max-w-3xl text-balance text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[4.1rem]">
                    Bulk Email Broadcast Software for Business Communication
                  </h1>
                </ScrollReveal>

                <ScrollReveal variant="fade-up" delay={120}>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
                    Send business emails to thousands in just a few clicks. Altroz Bulk Email helps
                    businesses create, schedule and manage broadcasts from one platform while giving
                    you complete visibility into delivery and performance.
                  </p>
                </ScrollReveal>

                <ScrollReveal variant="fade-up" delay={180}>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to={ROUTES.bulkEmailBookDemo} className="btn-primary">
                      Book Free Demo
                    </Link>
                    <a href="#features" className="btn-outline">
                      View Features
                    </a>
                  </div>
                </ScrollReveal>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {heroStats.map((stat, index) => (
                    <ScrollReveal
                      key={stat.label}
                      variant="fade-up"
                      delay={220 + index * 35}
                      className="h-full"
                    >
                      <article className="soft-card flex h-full min-h-[8.5rem] flex-col p-3.5">
                        <div>
                          <div className="max-w-[14ch] text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                            {stat.label}
                          </div>
                          <div className="mt-1 text-[1.85rem] font-bold leading-none tracking-tight text-ink">
                            {stat.value}
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-ink-soft">{stat.note}</p>
                      </article>
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6">
                <BroadcastHeroMock />
              </div>
            </div>
          </div>
        </section>

        <section id="what-is" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeader
              eyebrow="What is Email Broadcasting?"
              title="Reach many recipients with one clear, consistent message"
              description="Broadcasting lets you send one email message to a large group at the same time, without the manual effort of individual sends."
            />

            <div className="grid gap-4 lg:grid-cols-3">
              {whatIsCards.map((card) => (
                <InfoCard key={card.title} card={card} />
              ))}
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <ScrollReveal variant="fade-up">
                <article className="soft-card h-full p-5">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    Benefits Over Manual Email Sending
                  </div>
                  <ul className="mt-4 space-y-3">
                    {manualBenefits.map((item) => (
                      <li key={item} className="flex items-start gap-3 rounded-2xl bg-surface px-4 py-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                        <span className="text-sm leading-6 text-ink">{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={60}>
                <article className="soft-card h-full p-5">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    Suggested Flow
                  </div>
                  <div className="mt-4 grid gap-3">
                    {[
                      "Create campaign",
                      "Add content and recipients",
                      "Send now or schedule later",
                      "Track delivery and review results",
                    ].map((item, index) => (
                      <div key={item} className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3">
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-primary text-white">
                          {index + 1}
                        </div>
                        <div className="text-sm font-semibold text-ink">{item}</div>
                      </div>
                    ))}
                  </div>
                </article>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="why-choose" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeader
              eyebrow="Why Choose Altroz Bulk Email for Email Broadcasting?"
              title="Built to make business communication simple, organised and reliable"
              description="This section keeps the page dense with practical reasons businesses use the platform for broadcasting."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {whyChooseCards.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 30}>
                  <FeatureCard card={card} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeader
              eyebrow="Key Features"
              title="Everything a team needs for effective email broadcasting"
              description="A compact feature grid that links the core broadcasting workflow to the related product areas."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {keyFeatureCards.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 30}>
                  <FeatureCard card={card} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeader
              eyebrow="How Email Broadcasting Works"
              title="A simple six-step process from creation to reporting"
              description="The workflow follows the same sequence business teams use every day inside Altroz Bulk Email."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {steps.map((step, index) => (
                <ScrollReveal key={step.step} variant="fade-up" delay={index * 30}>
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
                    {index < steps.length - 1 ? (
                      <ArrowRight className="mt-4 hidden h-4 w-4 text-primary/70 lg:block" />
                    ) : null}
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="benefits" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeader
              eyebrow="Business Benefits"
              title="Why email broadcasting helps day-to-day operations"
              description="Result-focused cards that show the practical value of moving broadcast work into one platform."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {businessBenefits.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 25}>
                  <FeatureCard card={card} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="screens" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeader
              eyebrow="Product Screens"
              title="Suggested screenshots for the email broadcasting experience"
              description="These panels are designed to mirror product screens while staying lightweight and clear."
            />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {screenCards.map((screen, index) => (
                <ScrollReveal key={screen.title} variant="scale" delay={index * 35}>
                  <article className="overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-float">
                    <div className="border-b border-border bg-gradient-to-br from-primary/5 via-white to-success/5 p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                          <LayoutDashboard className="h-4 w-4 text-primary" />
                          {screen.title}
                        </div>
                        <span className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                          Live
                        </span>
                      </div>

                      <div className="mt-4 rounded-[1.25rem] border border-white/70 bg-white/90 p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                            {screen.title}
                          </div>
                          <BarChart3 className="h-4 w-4 text-primary" />
                        </div>
                        <div className="mt-4 grid gap-2">
                          <div className="h-3 w-3/4 rounded-full bg-primary/15" />
                          <div className="h-3 w-5/6 rounded-full bg-primary/10" />
                          <div className="h-3 w-2/3 rounded-full bg-success/15" />
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {[screen.value, "Broadcast", "Queue"].map((chip) => (
                            <span
                              key={`${screen.title}-${chip}`}
                              className="rounded-full bg-surface px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-sm leading-6 text-ink-soft">{screen.description}</p>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="use-cases" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeader
              eyebrow="Who Can Use Email Broadcasting?"
              title="Designed for teams that send planned communication every day"
              description="The page stays compact by using a dense, scan-friendly card layout."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {useCases.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 30}>
                  <FeatureCard card={card} badge="Use case" />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section scroll-mt-24">
          <div className="site-container grid gap-6 lg:grid-cols-12 lg:items-start">
            <ScrollReveal variant="fade-up" className="lg:col-span-4">
              <div className="section-heading text-left">
                <span className="eyebrow text-xs font-bold uppercase tracking-wider text-primary">
                  Frequently Asked Questions
                </span>
                <h2 className="text-3xl font-bold text-ink md:text-4xl">
                  Clear answers for teams reviewing email broadcasting
                </h2>
                <p className="text-ink-soft">
                  Helpful answers that keep the page practical without adding visual clutter.
                </p>
              </div>

              <div className="soft-card mt-5 p-5">
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  Need a tailored setup?
                </div>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  Bring your communication goals to a live demo and we can walk through the
                  broadcast flow, scheduling, delivery tracking and reporting together.
                </p>
                <div className="button-group mt-5">
                  <Link to={ROUTES.bulkEmailBookDemo} className="btn-primary">
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

        <section id="cta" className="cta-section bg-white scroll-mt-24">
          <div className="site-container">
            <ScrollReveal
              variant="scale"
              className="cta-box relative overflow-hidden bg-gradient-to-br from-primary to-[#0a4fda] text-center"
            >
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-success/30 blur-3xl" />
              <div className="relative">
                <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white md:text-5xl">
                  Ready to send business emails more efficiently?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-white/80">
                  Altroz Bulk Email simplifies email broadcasting for businesses of every size,
                  from creating and scheduling campaigns to tracking delivery and reviewing reports,
                  all from one platform.
                </p>
                <div className="button-group mt-7 justify-center">
                  <Link
                    to={ROUTES.bulkEmailBookDemo}
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
      <span className="eyebrow text-xs font-bold uppercase tracking-wider text-primary">{eyebrow}</span>
      <h2 className="text-3xl font-bold text-ink md:text-4xl">{title}</h2>
      <p className="text-ink-soft">{description}</p>
    </ScrollReveal>
  );
}

function InfoCard({ card }: { card: Card }) {
  const content = (
    <article className="soft-card h-full p-5">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
        <card.icon className="h-5 w-5" />
      </span>
      <div className="mt-4 text-lg font-semibold text-ink">{card.title}</div>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
      {card.href ? (
        <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      ) : null}
    </article>
  );

  return card.href ? (
    <Link to={card.href} className="group block">
      {content}
    </Link>
  ) : (
    <ScrollReveal variant="fade-up">{content}</ScrollReveal>
  );
}

function FeatureCard({ card, badge }: { card: Card; badge?: string }) {
  const body = (
    <article className="soft-card group h-full p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float">
      <div className="flex items-center justify-between gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-105">
          <card.icon className="h-5 w-5" />
        </span>
        {badge ? (
          <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-primary shadow-sm">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="mt-4 text-base font-semibold text-ink">{card.title}</div>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
      {card.href ? (
        <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      ) : null}
    </article>
  );

  return card.href ? <Link to={card.href} className="group block h-full">{body}</Link> : body;
}

function BroadcastHeroMock() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="pointer-events-none absolute -top-5 left-4 hidden rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-primary shadow-pop float-slow md:block">
        Broadcast Ready
      </div>
      <div className="pointer-events-none absolute -right-3 top-24 hidden rounded-full bg-success px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-pop float-slow md:block">
        Delivery Live
      </div>
      <div className="pointer-events-none absolute -bottom-6 left-20 hidden rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-primary shadow-pop float-slow md:block">
        Queue Updated
      </div>

      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white shadow-float">
        <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <div className="ml-auto text-xs font-medium text-ink-soft">Altroz Bulk Email Broadcast</div>
        </div>

        <div className="grid gap-4 p-5">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-primary/5 via-white to-success/5 p-5">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Broadcast Overview
            </div>
            <div className="mt-2 text-2xl font-bold tracking-tight text-ink">
              Send business messages at scale with confidence
            </div>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              Create campaigns, attach files, add recipients and launch broadcasts from one
              organised workspace.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Drafts", value: "12" },
                { label: "Scheduled", value: "04" },
                { label: "Sent Today", value: "18" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-white p-3 shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                    {item.label}
                  </div>
                  <div className="mt-1 text-lg font-bold text-ink">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="soft-card p-4">
              <div className="flex items-center justify-between text-sm font-semibold text-ink">
                <span>Delivery Rate</span>
                <span className="text-success">99.2%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-surface">
                <div className="h-2 w-[99%] rounded-full bg-gradient-to-r from-primary to-success" />
              </div>
            </div>
            <div className="soft-card p-4">
              <div className="flex items-center justify-between text-sm font-semibold text-ink">
                <span>Subscription Use</span>
                <span className="text-primary">42%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-surface">
                <div className="h-2 w-[42%] rounded-full bg-gradient-to-r from-primary to-primary/60" />
              </div>
            </div>
          </div>

          <div className="soft-card p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  Broadcast Queue
                </div>
                <div className="mt-1 text-sm font-semibold text-ink">Queued and scheduled sends</div>
              </div>
              <Gauge className="h-5 w-5 text-primary" />
            </div>

            <div className="mt-4 space-y-3">
              {[
                { title: "HR Policy Update", tone: "bg-primary/10 text-primary" },
                { title: "Monthly Newsletter", tone: "bg-success/10 text-success" },
                { title: "Event Reminder", tone: "bg-surface text-ink-soft" },
              ].map((item) => (
                <div key={item.title} className="flex items-center justify-between rounded-2xl bg-white px-3 py-2 shadow-sm">
                  <div className="text-sm font-medium text-ink">{item.title}</div>
                  <span className={`${item.tone} rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em]`}>
                    Live
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
