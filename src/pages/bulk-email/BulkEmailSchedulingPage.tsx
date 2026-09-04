import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Factory,
  FileText,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  MailCheck,
  Megaphone,
  ShieldCheck,
  ShoppingBag,
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

const whyScheduleCards: Card[] = [
  {
    title: "Plan in advance",
    description: "Prepare your campaign early and release it when timing matters most.",
    icon: CalendarClock,
  },
  {
    title: "Avoid manual sending",
    description: "Remove the need to sit and press send at the last minute.",
    icon: Clock3,
  },
  {
    title: "Reach important dates",
    description: "Deliver festival greetings, reminders and updates at the right moment.",
    icon: CheckCircle2,
  },
  {
    title: "Organise communication",
    description: "Keep multiple emails aligned with your communication calendar.",
    icon: Workflow,
  },
  {
    title: "Reduce pressure",
    description: "Let the platform handle delivery while your team focuses on content.",
    icon: Sparkles,
  },
  {
    title: "Improve consistency",
    description: "Maintain a predictable workflow across repeated campaigns.",
    icon: LayoutDashboard,
  },
  {
    title: "Support every team",
    description: "Useful for HR, marketing, education and operations teams.",
    icon: Users,
  },
  {
    title: "Keep visibility",
    description: "See scheduled jobs, queue position and delivery state in one place.",
    icon: MailCheck,
  },
];

const schedulingFeatures: Card[] = [
  {
    title: "Set Date & Time",
    description: "Choose the exact delivery moment for every scheduled broadcast.",
    icon: CalendarClock,
  },
  {
    title: "Broadcast Queue",
    description: "Store campaigns safely until their send time arrives.",
    icon: Workflow,
  },
  {
    title: "Scheduled Jobs",
    description: "Review campaigns that are queued and waiting to go out.",
    icon: LayoutDashboard,
  },
  {
    title: "Automated Delivery",
    description: "Send campaigns automatically without manual action.",
    icon: MailCheck,
  },
  {
    title: "Delivery Tracking",
    description: "Monitor the status after the campaign leaves the queue.",
    icon: CheckCircle2,
  },
  {
    title: "Campaign History",
    description: "Keep a record of scheduled sends for future review.",
    icon: FileText,
  },
  {
    title: "Queue Visibility",
    description: "See campaigns move from draft to queue to sent.",
    icon: Clock3,
  },
  {
    title: "Business Reporting",
    description: "Use the dashboard for planning, review and follow-up.",
    icon: ShieldCheck,
  },
];

const schedulingSteps: Step[] = [
  {
    step: "Step 1",
    title: "Create Email Campaign",
    description: "Start by creating a new email broadcast inside Altroz Bulk Email.",
  },
  {
    step: "Step 2",
    title: "Upload Email Content",
    description: "Upload the email file and any documents or attachments that need to go out.",
  },
  {
    step: "Step 3",
    title: "Select Date & Time",
    description: "Choose the exact delivery date and time based on your communication plan.",
  },
  {
    step: "Step 4",
    title: "Campaign Added to Queue",
    description: "The campaign moves into the broadcast queue as a scheduled job.",
  },
  {
    step: "Step 5",
    title: "Email Sent Automatically",
    description: "At the selected time, the campaign is delivered without manual action.",
  },
  {
    step: "Step 6",
    title: "Track Delivery Status",
    description: "Review delivery tracking and reports once the campaign has been sent.",
  },
];

const businessBenefits: Card[] = [
  {
    title: "Better Planning",
    description: "Prepare communication before the delivery date arrives.",
    icon: CalendarClock,
  },
  {
    title: "Less Manual Work",
    description: "Save time by automating the actual sending process.",
    icon: Clock3,
  },
  {
    title: "Higher Control",
    description: "Keep full control over when each campaign goes out.",
    icon: ShieldCheck,
  },
  {
    title: "Clear Visibility",
    description: "Know exactly what is waiting, what is live and what has been sent.",
    icon: Workflow,
  },
  {
    title: "Organised Queue",
    description: "Manage upcoming campaigns in a tidy broadcast queue.",
    icon: LayoutDashboard,
  },
  {
    title: "Reliable Delivery",
    description: "Deliver scheduled messages at the planned time.",
    icon: CheckCircle2,
  },
  {
    title: "Team Efficiency",
    description: "Help teams focus on content instead of sending logistics.",
    icon: Sparkles,
  },
  {
    title: "Useful Reporting",
    description: "Review past sends for follow-up and internal planning.",
    icon: FileText,
  },
];

const screenCards = [
  {
    title: "Scheduling Screen",
    description: "Pick the delivery date and time before the campaign enters the queue.",
    chips: ["Date", "Time", "Queue"],
  },
  {
    title: "Dashboard",
    description: "View scheduled, ongoing and sent jobs from one compact dashboard.",
    chips: ["Overview", "Live", "Summary"],
  },
  {
    title: "Scheduled Jobs",
    description: "See campaigns that are planned and waiting to be delivered.",
    chips: ["Queued", "Planned", "Pending"],
  },
  {
    title: "Campaign Queue",
    description: "Track the order and timing of emails waiting for delivery.",
    chips: ["Order", "Queue", "Timing"],
  },
  {
    title: "Campaign History",
    description: "Keep a visible record of campaigns that have already been sent.",
    chips: ["History", "Sent", "Record"],
  },
  {
    title: "Delivery Status",
    description: "Review delivery tracking and report results after the send completes.",
    chips: ["Status", "Reports", "Delivery"],
  },
];

const useCases: Card[] = [
  {
    title: "HR Teams",
    description: "Send policy updates, reminders and internal notices at a planned time.",
    icon: Users,
  },
  {
    title: "Marketing Teams",
    description: "Schedule launch announcements, promos and seasonal emails ahead of time.",
    icon: Megaphone,
  },
  {
    title: "Educational Institutes",
    description: "Plan timetable notices, exam updates and student communication in advance.",
    icon: GraduationCap,
  },
  {
    title: "Healthcare",
    description: "Queue reminders and notices so they reach people at the right moment.",
    icon: HeartPulse,
  },
  {
    title: "Manufacturing",
    description: "Schedule shift notices, policy updates and plant communication with ease.",
    icon: Factory,
  },
  {
    title: "Retail",
    description: "Time offers and product messages to match the intended campaign window.",
    icon: ShoppingBag,
  },
];

const faqs: Faq[] = [
  {
    q: "What is email scheduling?",
    a: "It is the ability to set a future date and time for an email campaign so it sends automatically.",
  },
  {
    q: "How does scheduled email broadcasting work?",
    a: "Create the campaign, choose a send time, add it to the queue and let the system deliver it automatically.",
  },
  {
    q: "Can I schedule campaigns in advance?",
    a: "Yes. You can prepare a campaign early and decide exactly when it should go out.",
  },
  {
    q: "Can I edit a scheduled campaign?",
    a: "Yes. Campaigns still in the queue can be reviewed and managed before the delivery time.",
  },
  {
    q: "Can I monitor scheduled jobs?",
    a: "Yes. Scheduled Jobs on the dashboard shows queued campaigns and their planned times.",
  },
  {
    q: "Can I track delivery after a campaign is sent?",
    a: "Yes. Delivery tracking and delivery reports show the outcome after the scheduled send completes.",
  },
  {
    q: "How does scheduling improve communication?",
    a: "It separates preparation from delivery, which makes communication easier to plan and manage.",
  },
  {
    q: "Can multiple campaigns be scheduled?",
    a: "Yes. Multiple campaigns can be arranged at different times and handled together in the queue.",
  },
  {
    q: "Is scheduling useful for small businesses?",
    a: "Yes. Any team that sends planned communication can benefit from scheduling, even small teams.",
  },
  {
    q: "How do I get started with Altroz Bulk Email scheduling?",
    a: "Book a free demo to see campaign creation, scheduling, queue management and delivery tracking together.",
  },
];

export default function BulkEmailSchedulingPage() {
  return (
    <div className="bulk-email-theme min-h-screen bg-gradient-to-b from-white via-[#f6faff] to-[#fff7ef]">
      <PageSEO
        title="Email Scheduling Software | Altroz Bulk Email"
        description="Schedule email campaigns in advance with Altroz Bulk Email. Plan delivery time, manage the queue and track delivery from one dashboard."
        canonicalPath={ROUTES.bulkEmailScheduling}
      />
      <BulkEmailNavbar />

      <main className="overflow-hidden">
        <section className="hero-gradient relative overflow-hidden pt-8 sm:pt-10 lg:pt-12">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="site-container">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <ScrollReveal variant="fade-up">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-xs font-extrabold tracking-normal text-primary shadow-sm">
                    <Sparkles className="h-3.5 w-3.5" />
                    Smarter Email Campaign Planning
                  </span>
                </ScrollReveal>

                <ScrollReveal variant="fade-up" delay={60}>
                  <h1 className="mt-4 max-w-3xl text-balance text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[4.05rem]">
                    Email Scheduling Software for Smarter Business Communication
                  </h1>
                </ScrollReveal>

                <ScrollReveal variant="fade-up" delay={120}>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
                    Business communication runs on timing. With Altroz Bulk Email, you can create
                    your campaign once, choose the date and time you want it to go out, and move
                    on with your day. Your campaign waits safely in the broadcast queue and is
                    sent automatically at the scheduled time.
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

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {[
                    {
                      title: "Save time",
                      text: "Schedule once and remove manual last-minute sending.",
                    },
                    {
                      title: "Plan ahead",
                      text: "Build the communication calendar around important dates.",
                    },
                    {
                      title: "Send automatically",
                      text: "Let the queue handle delivery at the selected time.",
                    },
                  ].map((item, index) => (
                    <ScrollReveal key={item.title} variant="fade-up" delay={220 + index * 40}>
                      <div className="soft-card h-full p-4">
                        <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                          {item.title}
                        </div>
                        <p className="mt-2 text-sm leading-6 text-ink-soft">{item.text}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

                <ScrollReveal variant="fade-up" delay={280}>
                  <div className="mt-5 soft-card p-5">
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                      Hero Visual Direction
                    </div>
                    <p className="mt-3 text-sm leading-6 text-ink-soft">
                      Show the Altroz Bulk Email scheduling screen inside a laptop mockup beside
                      a floating status card that highlights a scheduled campaign, date and time.
                      The goal is to make planning, queue visibility and automated delivery clear
                      at a glance.
                    </p>
                  </div>
                </ScrollReveal>
              </div>

              <div className="lg:col-span-6">
                <SchedulingHeroMock />
              </div>
            </div>
          </div>
        </section>

        <section id="what-is" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeader
              eyebrow="What is Email Scheduling?"
              title="Prepare campaigns once and send them at the exact time you choose"
              description="Scheduling lets teams create a campaign in advance, set a delivery time and let the platform handle the send automatically."
            />

            <div className="grid gap-4 lg:grid-cols-3">
              <InfoCard
                title="Email scheduling"
                description="Prepare a campaign in advance and choose a future date and time so it sends automatically instead of manually."
                icon={CalendarClock}
              />
              <InfoCard
                title="Why businesses schedule emails"
                description="Teams often plan festival greetings, policy updates, fee reminders and product announcements ahead of time."
                icon={Clock3}
              />
              <InfoCard
                title="How scheduled campaigns work"
                description="The campaign is created, a delivery time is selected, it enters the broadcast queue, and it is sent automatically when time arrives."
                icon={Workflow}
              />
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <ScrollReveal variant="fade-up" delay={80}>
                <article className="soft-card h-full p-5">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    Benefits of Planning Email Communication in Advance
                  </div>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">
                    Planning emails in advance means a team is not dependent on someone being
                    available at a specific hour. Multiple campaigns can be prepared together and
                    released in the right order for HR, marketing or educational communication.
                  </p>
                </article>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={120}>
                <article className="soft-card h-full p-5">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    A Simple Example
                  </div>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">
                    A retail team can prepare a festive-season campaign a week earlier, upload the
                    content and schedule it for 9:00 AM on the event day. The message waits in the
                    queue and goes out automatically, without anyone needing to remember to click
                    send.
                  </p>
                </article>
              </ScrollReveal>
            </div>

            <ScrollReveal variant="fade-up" delay={160}>
              <div className="mt-5 soft-card p-5">
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  Suggested Visual
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-4">
                  {["Create Campaign", "Set Date & Time", "Added to Queue", "Sent Automatically"].map(
                    (item, index) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3"
                      >
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-primary text-white">
                          {index + 1}
                        </div>
                        <div className="text-sm font-semibold text-ink">{item}</div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="why-schedule" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeader
              eyebrow="Why Schedule Email Campaigns?"
              title="Eight practical reasons teams plan campaigns in advance"
              description="The cards stay compact so the page remains visually dense and easy to scan."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {whyScheduleCards.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 25}>
                  <article className="soft-card group h-full p-5 transition-transform duration-300 hover:-translate-y-1">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-105">
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

        <section id="features" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeader
              eyebrow="Scheduling Features"
              title="The core controls that keep campaigns organised"
              description="Each card shows how the platform supports planning, queue management and delivery tracking."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {schedulingFeatures.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 30}>
                  <article className="soft-card group h-full p-5 transition-transform duration-300 hover:-translate-y-1">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-105">
                      <card.icon className="h-5 w-5" />
                    </span>
                    <div className="mt-4 text-base font-semibold text-ink">{card.title}</div>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeader
              eyebrow="How Email Scheduling Works"
              title="A simple six-step flow from creation to delivery"
              description="The process is laid out clearly so the full scheduling journey is easy to follow."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {schedulingSteps.map((step, index) => (
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

        <section id="benefits" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeader
              eyebrow="Business Benefits"
              title="Why scheduled email campaigns help day-to-day operations"
              description="These benefits keep the page dense while making the business value easy to understand."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {businessBenefits.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 30}>
                  <article className="soft-card group h-full p-5 transition-transform duration-300 hover:-translate-y-1">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-105">
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

        <section id="screens" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeader
              eyebrow="Product Screens"
              title="Suggested product screenshots that accompany the scheduling flow"
              description="The cards keep the page visually rich while staying lightweight and clear."
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
                          <CalendarClock className="h-4 w-4 text-primary" />
                        </div>
                        <div className="mt-4 grid gap-2">
                          <div className="h-3 w-3/4 rounded-full bg-primary/15" />
                          <div className="h-3 w-5/6 rounded-full bg-primary/10" />
                          <div className="h-3 w-2/3 rounded-full bg-success/15" />
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {screen.chips.map((chip) => (
                            <span
                              key={chip}
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
              eyebrow="Business Use Cases"
              title="How scheduled email campaigns support different types of organisations"
              description="The card layout stays compact so the section remains easy to scan."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {useCases.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 30}>
                  <article className="soft-card group h-full p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float">
                    <div className="flex items-center justify-between gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-105">
                        <card.icon className="h-5 w-5" />
                      </span>
                      <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-primary shadow-sm">
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

        <section id="faq" className="section scroll-mt-24">
          <div className="site-container grid gap-6 lg:grid-cols-12 lg:items-start">
            <ScrollReveal variant="fade-up" className="lg:col-span-4">
              <div className="section-heading text-left">
                <span className="eyebrow text-xs font-bold uppercase tracking-wider text-primary">
                  Frequently Asked Questions
                </span>
                <h2 className="text-3xl font-bold text-ink md:text-4xl">
                  Clear answers for teams reviewing email scheduling
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
                  Bring your scheduling goals to a live demo and we can walk through queue
                  management, campaign timing and delivery tracking together.
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
                  Plan and schedule business emails with confidence
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-white/80">
                  Altroz Bulk Email brings campaign creation, scheduling, the broadcast queue and
                  delivery tracking into one organised platform.
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

function InfoCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <ScrollReveal variant="fade-up">
      <article className="soft-card h-full p-5">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <div className="mt-4 text-lg font-semibold text-ink">{title}</div>
        <p className="mt-2 text-sm leading-6 text-ink-soft">{description}</p>
      </article>
    </ScrollReveal>
  );
}

function SchedulingHeroMock() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="pointer-events-none absolute -top-5 left-4 hidden rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-primary shadow-pop float-slow md:block">
        Campaign Scheduled
      </div>
      <div className="pointer-events-none absolute -right-3 top-24 hidden rounded-full bg-success px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-pop float-slow md:block">
        Delivery Queue Live
      </div>
      <div className="pointer-events-none absolute -bottom-6 left-20 hidden rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-primary shadow-pop float-slow md:block">
        Auto Send Enabled
      </div>

      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white shadow-float">
        <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <div className="ml-auto text-xs font-medium text-ink-soft">Altroz Bulk Email Scheduling</div>
        </div>

        <div className="grid gap-4 p-5">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-primary/5 via-white to-success/5 p-5">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Scheduled Campaign
            </div>
            <div className="mt-2 text-2xl font-bold tracking-tight text-ink">
              Plan delivery with date and time control
            </div>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              Create once, schedule once and let the broadcast queue handle the send.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Date", value: "29 Jul" },
                { label: "Time", value: "09:00 AM" },
                { label: "Status", value: "Queued" },
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
              <div className="flex items-center justify-between gap-2 text-sm font-semibold text-ink">
                <span>Queue Position</span>
                <span className="text-success">02</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-surface">
                <div className="h-2 w-[56%] rounded-full bg-gradient-to-r from-primary to-success" />
              </div>
            </div>
            <div className="soft-card p-4">
              <div className="flex items-center justify-between gap-2 text-sm font-semibold text-ink">
                <span>Delivery Status</span>
                <span className="text-primary">Live</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-surface">
                <div className="h-2 w-[78%] rounded-full bg-gradient-to-r from-primary to-primary/70" />
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                Broadcast Queue
              </div>
              <CalendarClock className="h-4 w-4 text-primary" />
            </div>

            <div className="mt-4 space-y-2">
              {[
                { title: "HR Policy Update", status: "Queued" },
                { title: "Monthly Newsletter", status: "Queued" },
                { title: "Event Reminder", status: "Scheduled" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-2xl bg-surface px-3 py-2"
                >
                  <span className="text-sm font-medium text-ink">{item.title}</span>
                  <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
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
