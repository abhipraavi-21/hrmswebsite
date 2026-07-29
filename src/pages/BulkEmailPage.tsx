import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BadgeCheck,
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
  MessageSquareMore,
  Send,
  ServerCog,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  ShoppingBag,
  Users,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Footer from "@/components/site/Footer";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import BulkEmailNavbar from "@/components/site/BulkEmailNavbar";
import PageSEO from "@/components/site/PageSEO";
import { ROUTES } from "@/routes/routeConfig.js";
import { cn } from "@/lib/utils";

type IconCard = {
  id?: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

type HeroValue = {
  label: string;
  value: string;
  description: string;
};

type Step = {
  step: string;
  title: string;
  description: string;
};

type FaqItem = {
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
    <Component
      className={cn(
        "bulk-email-animated-title mx-auto text-balance font-bold tracking-[-0.03em] leading-[1.02]",
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

const heroValues: HeroValue[] = [
  {
    label: "What it does",
    value: "Bulk email broadcasting, scheduling and delivery tracking from one dashboard",
    description: "One workspace for campaigns, queue visibility and campaign history.",
  },
  {
    label: "Who it is for",
    value: "Business owners, SMEs, enterprises, HR and marketing teams, institutes and organisations",
    description: "Built for teams that need structured communication at scale.",
  },
  {
    label: "Business value",
    value: "Centralized control, better visibility and organized business communication",
    description: "Keep every broadcast easy to manage, monitor and review.",
  },
];

const trustedCards: IconCard[] = [
  {
    icon: Send,
    title: "Bulk Email Campaigns",
    description:
      "Create and send bulk email campaigns to your entire contact base in a single, organized broadcast.",
  },
  {
    icon: CalendarClock,
    title: "Campaign Scheduling",
    description:
      "Plan campaigns in advance and let Altroz Bulk Email send them automatically at the scheduled time.",
  },
  {
    icon: MailCheck,
    title: "Delivery Tracking",
    description:
      "Follow every broadcast from queue to inbox with real-time email status and delivery tracking.",
  },
  {
    icon: FileText,
    title: "Email Templates",
    description:
      "Use ready email templates or upload your own HTML email design for a consistent brand look.",
  },
  {
    icon: ServerCog,
    title: "SMTP Support",
    description:
      "Connect your own SMTP through simple sender email configuration for dependable email delivery.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Understand how each campaign performed with clear, easy-to-read email analytics and reports.",
  },
];

const whyChooseCards: IconCard[] = [
  {
    icon: Layers3,
    title: "Easy Campaign Management",
    description:
      "Manage every bulk email campaign - draft, scheduled or sent - from one organized screen.",
  },
  {
    icon: LayoutDashboard,
    title: "Centralized Dashboard",
    description:
      "View campaign activity, subscription usage and recent broadcasts together in one place.",
  },
  {
    icon: Send,
    title: "Fast Bulk Email Broadcasting",
    description:
      "Broadcast emails to large contact lists efficiently through a structured broadcast queue.",
  },
  {
    icon: CalendarClock,
    title: "Schedule Campaigns",
    description:
      "Set the exact date and time for a campaign so messages reach the inbox at the right moment.",
  },
  {
    icon: MailCheck,
    title: "Delivery Tracking",
    description:
      "Know exactly what happened to every email with status and delivery reports when needed.",
  },
  {
    icon: Sparkles,
    title: "Simple User Interface",
    description:
      "A clean, uncluttered interface that business users can learn quickly without technical training.",
  },
  {
    icon: FileText,
    title: "Reusable Email Templates",
    description:
      "Save time on every campaign by reusing email templates or uploading your own HTML content.",
  },
  {
    icon: BadgeCheck,
    title: "Business-Focused Platform",
    description:
      "Built around HR updates, marketing broadcasts and institutional notices - not just marketing-only use cases.",
  },
];

const overviewCards: IconCard[] = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    description:
      "The dashboard gives you a single view of recent broadcasts, subscription usage and campaign activity.",
  },
  {
    icon: Layers3,
    title: "Campaigns",
    description:
      "The campaigns workspace is where every bulk email broadcast is created, organized and reviewed.",
  },
  {
    icon: CalendarClock,
    title: "Scheduling",
    description:
      "Email scheduling lets you decide exactly when a campaign should go out for your audience.",
  },
  {
    icon: BarChart3,
    title: "Reports",
    description:
      "Delivery reports and email status give a clear picture of how each broadcast performed.",
  },
  {
    icon: FileText,
    title: "Templates",
    description:
      "Choose from email templates or upload your own HTML email so every campaign stays on brand.",
  },
  {
    icon: ServerCog,
    title: "SMTP",
    description:
      "SMTP configuration and sender email configuration connect the outgoing mail server you control.",
  },
];

const steps: Step[] = [
  {
    step: "Step 1",
    title: "Create Campaign",
    description:
      "Start a new bulk email campaign from the dashboard and give it a name your team will recognize later.",
  },
  {
    step: "Step 2",
    title: "Upload Email Content",
    description:
      "Add your message using a ready email template, or upload your own HTML email design and attachments.",
  },
  {
    step: "Step 3",
    title: "Schedule or Send",
    description:
      "Choose to broadcast the campaign immediately or queue it for a future date and time.",
  },
  {
    step: "Step 4",
    title: "Track Delivery",
    description:
      "Follow the broadcast queue and monitor email status as the campaign moves toward delivery.",
  },
  {
    step: "Step 5",
    title: "Review Reports",
    description:
      "Check delivery reports and email analytics to understand how the campaign performed.",
  },
];

const coreFeatures: IconCard[] = [
  {
    icon: Send,
    title: "Bulk Email Broadcasting",
    description:
      "Send a single email out to a large list of recipients in one organized broadcast.",
  },
  {
    icon: Layers3,
    title: "Campaign Management",
    description:
      "Create, organize and review every campaign, with full campaign history available for reference.",
  },
  {
    icon: CalendarClock,
    title: "Email Scheduling",
    description:
      "Set a future date and time for a campaign to be sent automatically.",
  },
  {
    icon: FileText,
    title: "Templates",
    description:
      "Use built-in email templates or upload your own HTML email design.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    description:
      "A central screen summarising campaign activity, recent broadcasts and subscription usage.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Review email analytics for each campaign you have sent and improve future campaigns.",
  },
  {
    icon: ServerCog,
    title: "SMTP Configuration",
    description:
      "Configure your own SMTP and sender email settings for outgoing campaigns.",
  },
  {
    icon: MailCheck,
    title: "Delivery Reports",
    description:
      "Detailed reports on email status and delivery outcomes for every broadcast.",
  },
];

const experienceCards = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    description:
      "Shows the overall account summary, recent broadcasts and subscription usage the moment a user logs in.",
    accent: "from-primary/10 via-white to-[#d97706]/10",
  },
  {
    icon: Layers3,
    title: "Campaign Management",
    description:
      "Shows the list of campaigns with status so teams can see what has been created, scheduled or sent.",
    accent: "from-[#d97706]/10 via-white to-primary/10",
  },
  {
    icon: Send,
    title: "Broadcast Queue",
    description:
      "Shows campaigns currently queued for sending, giving visibility into what is going out and when.",
    accent: "from-primary/10 via-white to-surface",
  },
  {
    icon: BarChart3,
    title: "Reports",
    description:
      "Shows delivery reports and email status for completed campaigns, broadcast by broadcast.",
    accent: "from-surface via-white to-primary/10",
  },
  {
    icon: FileText,
    title: "Templates",
    description:
      "Shows the template library, including uploaded HTML email designs available for reuse.",
    accent: "from-[#d97706]/10 via-white to-surface",
  },
  {
    icon: Gauge,
    title: "Subscription Usage",
    description:
      "Shows how much of the current plan's sending capacity has been used, helping teams plan ahead.",
    accent: "from-primary/10 via-white to-[#d97706]/10",
  },
];

const useCases: IconCard[] = [
  {
    id: "hr-communication",
    icon: Users,
    title: "HR Communication",
    description:
      "HR teams use Altroz Bulk Email to send policy updates, onboarding information and company-wide announcements.",
  },
  {
    id: "marketing",
    icon: Megaphone,
    title: "Marketing Campaigns",
    description:
      "Marketing teams plan and schedule campaigns, use templates and review analytics to see how each broadcast performed.",
  },
  {
    id: "education",
    icon: GraduationCap,
    title: "Education",
    description:
      "Educational institutes broadcast circulars, admission updates and event notices to students, parents and staff.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    description:
      "Healthcare organizations send appointment reminders, health advisories and administrative updates with confidence.",
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description:
      "Manufacturing companies use scheduled campaigns to share supplier updates, internal bulletins and business notices.",
  },
  {
    icon: ShoppingBag,
    title: "Retail",
    description:
      "Retail businesses broadcast offers, updates and customer communication using reusable templates and scheduling.",
  },
];

const valueCards: IconCard[] = [
  {
    icon: Clock3,
    title: "Easy Setup",
    description:
      "Get started quickly with straightforward sender email and SMTP configuration.",
  },
  {
    icon: Workflow,
    title: "Simple Navigation",
    description:
      "Find campaigns, templates and reports without a learning curve.",
  },
  {
    icon: CheckCircle2,
    title: "Campaign Visibility",
    description:
      "See the status of every campaign from draft to delivery in one place.",
  },
  {
    icon: MessageSquareMore,
    title: "Better Communication",
    description:
      "Keep business messaging organized, timely and consistent.",
  },
  {
    icon: Send,
    title: "Organized Broadcasts",
    description:
      "Manage the broadcast queue clearly, so nothing is sent by mistake or missed.",
  },
  {
    icon: MailCheck,
    title: "Delivery Monitoring",
    description:
      "Stay informed with real-time email status and delivery reports.",
  },
  {
    icon: ShieldCheck,
    title: "Business Ready",
    description:
      "Built for real business communication needs, not just marketing sends.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Platform",
    description:
      "Supports growing communication needs as campaign volume increases.",
  },
];

const faqs: FaqItem[] = [
  {
    q: "What is bulk email software?",
    a: "Bulk email software is a platform that lets a business create, send and manage email campaigns to a large group of recipients at once, instead of sending messages individually.",
  },
  {
    q: "How does Altroz Bulk Email work?",
    a: "You create a campaign, add your content using a template or your own HTML email, then send it immediately or schedule it. Altroz Bulk Email then broadcasts the email and lets you track delivery through reports.",
  },
  {
    q: "Can I schedule campaigns in advance?",
    a: "Yes. Email scheduling lets you set a future date and time, and the campaign is sent automatically through the broadcast queue.",
  },
  {
    q: "Can I upload my own HTML email templates?",
    a: "Yes. You can upload your own HTML email design or use the ready templates available on the platform.",
  },
  {
    q: "Can I attach files to a campaign?",
    a: "Yes. Altroz Bulk Email supports uploading attachments as part of your email campaign.",
  },
  {
    q: "How does SMTP configuration work in Altroz Bulk Email?",
    a: "You connect your outgoing mail server through SMTP configuration and set up your sender email so campaigns are sent through a setup your business controls.",
  },
  {
    q: "How do I track email delivery?",
    a: "Every campaign includes delivery tracking, so you can view email status and delivery reports for each broadcast.",
  },
  {
    q: "Can businesses manage multiple campaigns at once?",
    a: "Yes. The campaign management workspace lets you organise multiple campaigns and review complete campaign history.",
  },
  {
    q: "Is Altroz Bulk Email suitable for HR communication?",
    a: "Yes. HR teams use it to broadcast policy updates, onboarding details and company announcements to employees.",
  },
  {
    q: "Can I see how many emails I have sent on my plan?",
    a: "Yes. The dashboard displays subscription usage, so you always know how much sending capacity you have used.",
  },
  {
    q: "Does Altroz Bulk Email provide campaign analytics?",
    a: "Yes. Email analytics are available for each campaign, helping you understand how your broadcasts performed.",
  },
  {
    q: "Who can use Altroz Bulk Email?",
    a: "Business owners, SMEs, enterprises, HR and marketing teams, educational institutes, healthcare organisations, manufacturing companies, government organisations, IT companies and retail businesses can all use the platform for organised email communication.",
  },
];

export default function BulkEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f6faff] to-[#fff7ef]">
      <PageSEO
        title="Bulk Email Software for Business Campaigns | Altroz"
        description="Altroz Bulk Email helps businesses send, schedule and track email campaigns from one dashboard. Book a free demo to see it in action."
        canonicalPath={ROUTES.bulkEmail}
      />
      <style>{`
        @keyframes bulkEmailWordRise {
          0%,
          100% {
            opacity: 1;
            transform: translateY(0);
          }

          50% {
            opacity: 0.9;
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
        <section id="email-broadcast" className="hero-gradient relative overflow-hidden pt-8 sm:pt-10 lg:pt-12">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-[#1d4ed8]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-[#d97706]/10 blur-3xl" />

          <div className="site-container">
            <ScrollReveal variant="fade-up" className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1d4ed8]/20 bg-gradient-to-r from-white via-[#eff6ff] to-[#fffbf4] px-4 py-2 text-xs font-extrabold tracking-normal text-[#1d4ed8] shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Trusted Business Email Broadcasting Platform
              </div>

              <AnimatedTitle
                as="h1"
                className="mx-auto mt-4 max-w-4xl text-4xl leading-[1.02] sm:text-5xl lg:text-[4.15rem]"
              >
                Bulk Email Software Built for Reliable Business Communication
              </AnimatedTitle>
            </ScrollReveal>

            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start">
              <ScrollReveal variant="fade-up" className="lg:col-span-7">
                <p className="max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
                  Send, schedule and track every business email from one simple dashboard. Altroz
                  Bulk Email is an enterprise bulk email broadcasting platform that helps
                  businesses send large volumes of email campaigns without losing control or
                  visibility.
                </p>

              <div className="button-group mt-6 justify-center lg:justify-start">
                <Link to={ROUTES.bookDemo} className="btn-primary">
                  Book Free Demo
                </Link>
                <a href="#features" className="btn-outline">
                  View Features
                </a>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {heroValues.map((item, index) => (
                  <ScrollReveal
                    key={item.label}
                    variant="fade-up"
                    delay={80 + index * 60}
                    className="soft-card p-4"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                      {item.label}
                    </div>
                    <div className="mt-2 text-sm font-semibold leading-6 text-ink">
                      {item.value}
                    </div>
                    <p className="mt-2 text-xs leading-5 text-ink-soft">{item.description}</p>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={80} className="lg:col-span-5">
              <BulkEmailHeroMock />
            </ScrollReveal>
          </div>
          </div>
        </section>

        <section id="trusted" className="section scroll-mt-24">
          <div className="site-container">
            <ScrollReveal variant="fade-up" className="section-heading">
              <span className="eyebrow text-xs font-bold uppercase tracking-wider text-[#b45309]">
                Trusted Business Communication Platform
              </span>
              <AnimatedTitle as="h2" className="text-3xl md:text-4xl">
                A premium snapshot of what businesses get with Altroz Bulk Email
              </AnimatedTitle>
              <p className="text-ink-soft">
                A clean, organized toolkit for campaigns, scheduling, templates, delivery and
                reporting.
              </p>
            </ScrollReveal>

            <StaggerReveal
              step={70}
              className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
            >
              {trustedCards.map((card) => (
                <IconCardItem key={card.title} item={card} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="why" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <ScrollReveal variant="fade-up" className="section-heading">
              <span className="eyebrow text-xs font-bold uppercase tracking-wider text-[#b45309]">
                Why Choose Altroz Bulk Email
              </span>
              <AnimatedTitle as="h2" className="text-3xl md:text-4xl">
                The platform teams choose when they need clarity, control and scale
              </AnimatedTitle>
              <p className="text-ink-soft">
                Eight practical reasons businesses keep their communication in one place.
              </p>
            </ScrollReveal>

            <StaggerReveal step={60} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {whyChooseCards.map((card) => (
                <IconCardItem key={card.title} item={card} compact />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="overview" className="section scroll-mt-24">
          <div className="site-container">
            <ScrollReveal variant="fade-up" className="section-heading text-left">
              <span className="eyebrow text-xs font-bold uppercase tracking-wider text-[#b45309]">
                Product Overview
              </span>
              <AnimatedTitle as="h2" className="mx-0 text-3xl md:text-4xl">
                A closer look at the platform workspaces inside Altroz Bulk Email
              </AnimatedTitle>
              <p className="text-ink-soft">
                The product is organised around the major workflows users touch every day.
              </p>
            </ScrollReveal>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {overviewCards.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 50}>
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

        <section id="scheduling" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <ScrollReveal variant="fade-up" className="section-heading">
              <span className="eyebrow text-xs font-bold uppercase tracking-wider text-[#b45309]">
                How It Works
              </span>
              <AnimatedTitle as="h2" className="text-3xl md:text-4xl">
                From idea to delivery in five clear steps
              </AnimatedTitle>
              <p className="text-ink-soft">
                A simple workflow that keeps every broadcast easy to create, send and review.
              </p>
            </ScrollReveal>

            <div className="grid gap-4 lg:grid-cols-5">
              {steps.map((step, index) => (
                <ScrollReveal key={step.step} variant="fade-up" delay={index * 60}>
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
                    {index < steps.length - 1 ? (
                      <ArrowRight className="mt-4 hidden h-4 w-4 text-primary/70 lg:block" />
                    ) : null}
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="templates" className="section scroll-mt-24">
          <div className="site-container">
            <ScrollReveal variant="fade-up" className="section-heading">
              <span className="eyebrow text-xs font-bold uppercase tracking-wider text-[#b45309]">
                Core Features
              </span>
              <AnimatedTitle as="h2" className="text-3xl md:text-4xl">
                The complete feature set of Altroz Bulk Email
              </AnimatedTitle>
              <p className="text-ink-soft">
                Premium feature cards that explain what each part of the product does and why it
                matters.
              </p>
            </ScrollReveal>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {coreFeatures.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 50}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-float">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <card.icon className="h-5 w-5" />
                    </span>
                    <div className="mt-4 text-base font-semibold text-ink">{card.title}</div>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#1d4ed8]">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="analytics" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <ScrollReveal variant="fade-up" className="section-heading text-left">
              <span className="eyebrow text-xs font-bold uppercase tracking-wider text-[#b45309]">
                Real Product Experience
              </span>
              <AnimatedTitle as="h2" className="mx-0 text-3xl md:text-4xl">
                Screenshot-style previews of the live platform experience
              </AnimatedTitle>
              <p className="text-ink-soft">
                These panels are designed to feel like real application views while keeping the
                page visually polished.
              </p>
            </ScrollReveal>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {experienceCards.map((card, index) => (
                <ScrollReveal key={card.title} variant="scale" delay={index * 45}>
                  <article className="overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-float">
                    <div className={cn("border-b border-border/70 bg-gradient-to-br p-5", card.accent)}>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                          <card.icon className="h-4 w-4 text-primary" />
                          {card.title}
                        </div>
                        <span className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#b45309]">
                          Live
                        </span>
                      </div>

                      <div className="mt-4 rounded-[1.25rem] border border-white/70 bg-white/90 p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#b45309]">
                            {card.title}
                          </div>
                          <Gauge className="h-4 w-4 text-primary" />
                        </div>

                        <div className="mt-4 grid gap-2">
                          <div className="h-3 w-3/4 rounded-full bg-primary/15" />
                          <div className="h-3 w-5/6 rounded-full bg-primary/10" />
                          <div className="h-3 w-2/3 rounded-full bg-[#d97706]/10" />
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-2">
                          <div className="rounded-2xl bg-surface p-3 text-center">
                            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b45309]">
                              Queue
                            </div>
                            <div className="mt-1 text-sm font-semibold text-ink">Updated</div>
                          </div>
                          <div className="rounded-2xl bg-surface p-3 text-center">
                            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b45309]">
                              Status
                            </div>
                            <div className="mt-1 text-sm font-semibold text-ink">Visible</div>
                          </div>
                          <div className="rounded-2xl bg-surface p-3 text-center">
                            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b45309]">
                              Reports
                            </div>
                            <div className="mt-1 text-sm font-semibold text-ink">Ready</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-sm leading-6 text-ink-soft">{card.description}</p>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
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
                How different industries use Altroz Bulk Email every day
              </AnimatedTitle>
              <p className="text-ink-soft">
                Purpose-built examples for teams that need organized communication across multiple
                workflows.
              </p>
            </ScrollReveal>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {useCases.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 50}>
                  <article id={card.id} className="soft-card group h-full p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-float">
                    <div className="flex items-center justify-between gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm transition-transform duration-300 group-hover:scale-105">
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

        <section id="love" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <ScrollReveal variant="fade-up" className="section-heading text-left">
              <span className="eyebrow text-xs font-bold uppercase tracking-wider text-[#b45309]">
                Why Businesses Love It
              </span>
              <AnimatedTitle as="h2" className="mx-0 text-3xl md:text-4xl">
                Everyday benefits that make the platform easy to keep using
              </AnimatedTitle>
              <p className="text-ink-soft">
                The value cards reinforce the practical experience of using the platform.
              </p>
            </ScrollReveal>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {valueCards.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 45}>
                  <article className="soft-card group h-full p-5 transition-transform duration-300 hover:-translate-y-1">
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

        <section id="smtp" className="section scroll-mt-24">
          <div className="site-container grid gap-6 lg:grid-cols-12 lg:items-start">
            <ScrollReveal variant="fade-up" className="lg:col-span-8">
              <div className="section-heading text-left">
              <span className="eyebrow text-xs font-bold uppercase tracking-wider text-[#b45309]">
                Frequently Asked Questions
              </span>
                <AnimatedTitle as="h2" className="mx-0 text-3xl md:text-4xl">
                  Answers to the most common bulk email questions
                </AnimatedTitle>
                <p className="text-ink-soft">
                  Clear, direct answers that help visitors understand how the platform works.
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
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#b45309]">
                  Need a tailored setup?
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  Let us show you the right bulk email workflow
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  Bring your sender setup, SMTP flow, templates and campaign goals to a live demo.
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    "Campaign scheduling",
                    "Template uploads",
                    "Delivery tracking",
                    "Subscription usage",
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
                  <Link to={ROUTES.contact} className="btn-ghost">
                    Contact Sales
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="trial" className="cta-section bg-white scroll-mt-24">
          <div className="site-container">
            <ScrollReveal
              variant="scale"
              className="cta-box relative overflow-hidden bg-gradient-to-br from-[#1d4ed8] to-[#d97706] text-center"
            >
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#d97706]/18 blur-3xl" />
              <div className="relative">
                <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white md:text-5xl">
                  Ready to Simplify Your Business Email Communication?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-white/80">
                  Bring every bulk email campaign, schedule and delivery report into one
                  centralised dashboard. See how Altroz Bulk Email fits your business
                  communication needs.
                </p>
                <div className="button-group mt-7 justify-center">
                  <Link
                    to={ROUTES.bookDemo}
                    className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary-soft"
                  >
                    Book Free Demo
                  </Link>
                  <a
                    href="#trusted"
                    className="inline-flex items-center rounded-lg border border-white/25 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    View Features
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

function IconCardItem({ item, compact = false }: { item: IconCard; compact?: boolean }) {
  return (
    <article
      className={cn(
        "group h-full rounded-[1.5rem] border border-border bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-float",
        compact && "p-4",
      )}
    >
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm transition-transform duration-300 group-hover:scale-105">
        <item.icon className="h-5 w-5" />
      </span>
      <div className="mt-4 text-base font-semibold text-ink">{item.title}</div>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
    </article>
  );
}

function BulkEmailHeroMock() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="pointer-events-none absolute -top-5 left-4 hidden rounded-full bg-gradient-to-r from-white via-[#eff6ff] to-[#fff7ed] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1d4ed8] shadow-pop float-slow md:block">
        Campaign Scheduled
      </div>
      <div className="pointer-events-none absolute -right-3 top-24 hidden rounded-full bg-[#d97706] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-pop float-slow md:block">
        Delivery Tracking Live
      </div>
      <div className="pointer-events-none absolute -bottom-6 left-20 hidden rounded-full bg-gradient-to-r from-white via-[#fffbf4] to-[#eff6ff] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#b45309] shadow-pop float-slow md:block">
        Broadcast Queue Updated
      </div>

      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white shadow-float">
        <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <div className="ml-auto text-xs font-medium text-ink-soft">Altroz Bulk Email Dashboard</div>
        </div>

        <div className="grid gap-4 p-5">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-primary/5 via-white to-[#d97706]/5 p-5">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#b45309]">
              Campaign Summary
            </div>
            <div className="mt-2 text-2xl font-bold tracking-tight text-ink">
              Send, schedule and track every campaign
            </div>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              A clean workspace for draft, scheduled and sent broadcasts.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Drafts", value: "12" },
                { label: "Scheduled", value: "04" },
                { label: "Sent Today", value: "18" },
              ].map((item) => (
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
            <div className="soft-card p-4">
              <div className="flex items-center justify-between text-sm font-semibold text-ink">
                <span>Delivery Rate</span>
                <span className="text-[#b45309]">99.2%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-surface">
                <div className="h-2 w-[99%] rounded-full bg-gradient-to-r from-primary to-[#d97706]" />
              </div>
            </div>
            <div className="soft-card p-4">
              <div className="flex items-center justify-between text-sm font-semibold text-ink">
                <span>Subscription Use</span>
                <span className="text-[#1d4ed8]">42%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-surface">
                <div className="h-2 w-[42%] rounded-full bg-gradient-to-r from-primary to-primary/60" />
              </div>
            </div>
          </div>

          <div className="soft-card p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#b45309]">
                  Broadcast Queue
                </div>
                <div className="mt-1 text-sm font-semibold text-ink">Queued and scheduled sends</div>
              </div>
              <Gauge className="h-5 w-5 text-[#b45309]" />
            </div>

            <div className="mt-4 space-y-3">
              {[
                { title: "HR Policy Update", tone: "bg-gradient-to-r from-[#1d4ed8]/10 via-white to-[#d97706]/10 text-[#1d4ed8]" },
                { title: "Monthly Newsletter", tone: "bg-[#d97706]/10 text-[#b45309]" },
                { title: "Event Reminder", tone: "bg-surface text-ink-soft" },
              ].map((item) => (
                <div key={item.title} className="flex items-center justify-between rounded-2xl bg-white px-3 py-2 shadow-sm">
                  <div className="text-sm font-medium text-ink">{item.title}</div>
                  <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em]", item.tone)}>
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
