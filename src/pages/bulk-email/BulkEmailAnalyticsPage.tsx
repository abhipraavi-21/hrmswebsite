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
  HeartPulse,
  GraduationCap,
  LayoutDashboard,
  MailCheck,
  Megaphone,
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

const heroStats: Stat[] = [
  { label: "Delivery Rate", value: "99.2%", note: "Live delivery monitoring", icon: MailCheck },
  { label: "Campaigns Sent", value: "1,248", note: "Complete broadcast history", icon: BarChart3 },
  { label: "Reports Generated", value: "324", note: "Ready for internal review", icon: FileText },
  { label: "Subscription Usage", value: "68%", note: "Capacity visible at a glance", icon: Gauge },
];

const whatIsCards: Card[] = [
  {
    title: "What email analytics is",
    description:
      "Email analytics tracks what happens after an email campaign is sent, including delivery status, campaign activity and report history.",
    icon: BarChart3,
  },
  {
    title: "Why businesses need it",
    description:
      "Sending an email is only the first step. Teams need visibility into who received it, what is still pending and how the campaign performed overall.",
    icon: Users,
  },
  {
    title: "How Altroz helps",
    description:
      "Altroz Bulk Email brings campaign performance, delivery status and reporting into one organised analytics dashboard for quicker review.",
    icon: LayoutDashboard,
  },
];

const whyMattersCards: Card[] = [
  {
    title: "Campaign Visibility",
    description: "See every campaign from launch through completion without relying on assumptions.",
    icon: LayoutDashboard,
  },
  {
    title: "Performance Monitoring",
    description: "Track how each broadcast is progressing so teams always know the current state.",
    icon: TrendingUp,
  },
  {
    title: "Delivery Insights",
    description: "Understand delivery status so you can see how messages are reaching your audience.",
    icon: MailCheck,
  },
  {
    title: "Business Reporting",
    description: "Access organised reports that make communication performance easier to review.",
    icon: FileText,
  },
  {
    title: "Email Status Tracking",
    description: "Track sent, scheduled, ongoing and cancelled jobs from one place.",
    icon: Clock3,
  },
  {
    title: "Historical Reports",
    description: "Refer back to campaign history whenever you need to review or compare past activity.",
    icon: BarChart3,
  },
  {
    title: "Campaign Monitoring",
    description: "Keep an eye on active jobs so nothing gets missed during a busy send schedule.",
    icon: Workflow,
  },
  {
    title: "Data-Driven Decisions",
    description: "Use actual campaign data to guide future email communication decisions.",
    icon: Sparkles,
  },
];

const dashboardWidgets: Array<{ title: string; description: string; badge: string; icon: LucideIcon }> = [
  {
    title: "Campaign Summary",
    description: "A quick snapshot of overall campaign activity.",
    badge: "Overview",
    icon: LayoutDashboard,
  },
  {
    title: "Broadcast Activity",
    description: "A record of campaigns that were sent out and when.",
    badge: "Activity",
    icon: Megaphone,
  },
  {
    title: "Scheduled Jobs",
    description: "Upcoming email campaigns arranged in advance.",
    badge: "Planned",
    icon: CalendarClock,
  },
  {
    title: "Sent Jobs",
    description: "Completed campaigns recorded for quick confirmation.",
    badge: "Completed",
    icon: MailCheck,
  },
  {
    title: "Ongoing Jobs",
    description: "Current campaigns that are still in progress.",
    badge: "Live",
    icon: TrendingUp,
  },
  {
    title: "Cancelled Jobs",
    description: "Cancelled campaigns kept in the history for transparency.",
    badge: "History",
    icon: ShieldCheck,
  },
  {
    title: "Subscription Usage",
    description: "See how much of the email plan has already been used.",
    badge: "Usage",
    icon: Gauge,
  },
  {
    title: "Recent Broadcasts",
    description: "A list of the latest campaigns sent from the platform.",
    badge: "Recent",
    icon: Clock3,
  },
];

const analyticsFeatures: Card[] = [
  {
    title: "Campaign Reports",
    description: "Organised reports that summarise how each email campaign performed.",
    icon: FileText,
  },
  {
    title: "Delivery Reports",
    description: "Reports that show delivery status for emails sent in a campaign.",
    icon: MailCheck,
  },
  {
    title: "Email Status",
    description: "A real-time view of whether a campaign is sent, scheduled, ongoing or cancelled.",
    icon: Clock3,
  },
  {
    title: "Campaign History",
    description: "A searchable record of past email campaigns for future reference.",
    icon: LayoutDashboard,
  },
  {
    title: "Dashboard Overview",
    description: "A consolidated view of campaign and delivery data on a single screen.",
    icon: BarChart3,
  },
  {
    title: "Recent Broadcasts",
    description: "A running list of the latest campaigns sent through Altroz Bulk Email.",
    icon: Megaphone,
  },
  {
    title: "Subscription Monitoring",
    description: "A clear view of usage so teams can plan campaigns within available limits.",
    icon: Gauge,
  },
  {
    title: "Performance Insights",
    description: "Insights drawn from campaign data to support better communication decisions.",
    icon: TrendingUp,
  },
];

const analyticsSteps: Step[] = [
  {
    step: "Step 1",
    title: "Launch Email Campaign",
    description: "Create and send your email campaign through Altroz Bulk Email.",
  },
  {
    step: "Step 2",
    title: "Monitor Broadcast Activity",
    description: "Watch the campaign as it moves through the sending process.",
  },
  {
    step: "Step 3",
    title: "Track Delivery Status",
    description: "Review delivery status to understand how the campaign is reaching recipients.",
  },
  {
    step: "Step 4",
    title: "Review Reports",
    description: "Check the campaign and delivery reports generated for the broadcast.",
  },
  {
    step: "Step 5",
    title: "Analyse Performance",
    description: "Use the dashboard data to understand how the campaign performed.",
  },
  {
    step: "Step 6",
    title: "Improve Future Communication",
    description: "Apply these insights to plan and improve future email campaigns.",
  },
];

const businessBenefits: Card[] = [
  {
    title: "Better Decision Making",
    description: "Use real campaign and delivery data instead of assumptions.",
    icon: Sparkles,
  },
  {
    title: "Campaign Transparency",
    description: "Get a clear view of how every campaign is performing.",
    icon: ShieldCheck,
  },
  {
    title: "Easy Monitoring",
    description: "Track ongoing, scheduled and completed campaigns in one place.",
    icon: Workflow,
  },
  {
    title: "Historical Insights",
    description: "Look back at past campaign data whenever you need to review or plan.",
    icon: LayoutDashboard,
  },
  {
    title: "Business Visibility",
    description: "Give managers a clean picture of email communication performance.",
    icon: Users,
  },
  {
    title: "Performance Tracking",
    description: "Follow campaign progress at every stage, from scheduling to delivery.",
    icon: TrendingUp,
  },
  {
    title: "Operational Efficiency",
    description: "Reduce manual checking by using one organised dashboard.",
    icon: Clock3,
  },
  {
    title: "Organised Reporting",
    description: "Keep all campaign and delivery reports structured and easy to access.",
    icon: FileText,
  },
];

const screenCards = [
  {
    title: "Dashboard",
    description: "Main overview screen with campaign summary, broadcast activity and usage.",
    chips: ["Overview", "Summary", "Usage"],
  },
  {
    title: "Email Broadcast Activity",
    description: "Activity log that records broadcasts sent through the platform.",
    chips: ["Activity", "Timeline", "Records"],
  },
  {
    title: "Delivery Reports",
    description: "Delivery status reports for completed campaigns.",
    chips: ["Delivery", "Status", "Reports"],
  },
  {
    title: "Campaign Status",
    description: "Current campaign state, including sent, scheduled, ongoing or cancelled.",
    chips: ["Sent", "Scheduled", "Live"],
  },
  {
    title: "Subscription Usage",
    description: "A quick view of how much of the current email subscription has been used.",
    chips: ["Usage", "Capacity", "Planning"],
  },
  {
    title: "Recent Broadcasts",
    description: "The most recently sent campaigns in one compact list.",
    chips: ["Recent", "Broadcasts", "History"],
  },
];

const useCases: Card[] = [
  {
    title: "HR Teams",
    description:
      "HR teams send policy updates and employee communication regularly, then confirm delivery and keep campaign history on hand.",
    icon: Users,
  },
  {
    title: "Marketing Teams",
    description:
      "Marketing teams run multiple campaigns and use analytics to review performance and plan the next send.",
    icon: Megaphone,
  },
  {
    title: "Educational Institutes",
    description:
      "Institutes send updates to students, parents and staff and need clear tracking for every communication.",
    icon: GraduationCap,
  },
  {
    title: "Healthcare",
    description:
      "Healthcare organisations use delivery reports and status tracking for appointment reminders and notices.",
    icon: HeartPulse,
  },
  {
    title: "Manufacturing",
    description:
      "Manufacturing companies use campaign history and reporting to keep communication organised.",
    icon: Factory,
  },
  {
    title: "Retail",
    description:
      "Retail businesses send promotional and transactional emails and review how their communication performs.",
    icon: ShoppingBag,
  },
  {
    title: "Corporate Communication",
    description:
      "Businesses of all sizes use analytics to monitor internal and external email activity in one place.",
    icon: FileText,
  },
];

const faqs: Faq[] = [
  {
    q: "What is email analytics?",
    a: "Email analytics tracks how your campaigns perform after sending, including delivery status, campaign activity and history.",
  },
  {
    q: "Why are email reports important?",
    a: "Reports give businesses a clear record of how campaigns performed, which is useful for review and planning.",
  },
  {
    q: "How do analytics improve campaigns?",
    a: "Analytics gives teams visibility into delivery and activity, helping them make more informed decisions.",
  },
  {
    q: "Can I track campaign status?",
    a: "Yes. Altroz Bulk Email tracks sent, scheduled, ongoing and cancelled campaigns from one dashboard.",
  },
  {
    q: "Can I monitor delivery reports?",
    a: "Yes. Delivery reports are available on the dashboard so you can review campaign delivery results.",
  },
  {
    q: "Can I view campaign history?",
    a: "Yes. Campaign history is maintained so you can refer back to past broadcasts whenever required.",
  },
  {
    q: "How does the analytics dashboard work?",
    a: "The dashboard brings together campaign summary, broadcast activity, job status and subscription usage in one view.",
  },
  {
    q: "Can I monitor scheduled jobs?",
    a: "Yes. Scheduled jobs are listed on the dashboard so you know what is planned ahead.",
  },
  {
    q: "Can I review previous broadcasts?",
    a: "Yes. The Recent Broadcasts section shows the latest campaigns sent through the platform.",
  },
  {
    q: "How do analytics help businesses?",
    a: "Analytics helps teams move from assumption-based communication to data-driven communication.",
  },
  {
    q: "Is email analytics only for marketing teams?",
    a: "No. HR, marketing, operations and corporate communication teams can all use it effectively.",
  },
  {
    q: "Does Altroz Bulk Email show ongoing campaign activity?",
    a: "Yes. Ongoing jobs are tracked on the dashboard so you can see what is currently in progress.",
  },
  {
    q: "Can I check how much of my email subscription I have used?",
    a: "Yes. Subscription usage is shown on the dashboard so you can plan campaigns accordingly.",
  },
  {
    q: "Are cancelled campaigns also tracked?",
    a: "Yes. Cancelled jobs are recorded so your campaign history remains complete.",
  },
  {
    q: "Do I need technical knowledge to use the analytics dashboard?",
    a: "No. The dashboard is designed to be simple and easy for business teams to review.",
  },
];

export default function BulkEmailAnalyticsPage() {
  return (
    <div className="bulk-email-theme min-h-screen bg-gradient-to-b from-white via-[#f6faff] to-[#fff7ef]">
      <PageSEO
        title="Email Analytics Software | Altroz Bulk Email"
        description="Track email campaign performance with Altroz Bulk Email Analytics. Monitor delivery status, broadcast activity and reports on one dashboard."
        canonicalPath={ROUTES.bulkEmailAnalytics}
      />
      <BulkEmailNavbar />

      <main className="overflow-hidden">
        <section className="hero-gradient relative overflow-hidden pt-8 sm:pt-10 lg:pt-12">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="site-container">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <ScrollReveal variant="fade-up" className="lg:col-span-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-xs font-extrabold tracking-normal text-primary shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  Email Analytics
                </span>

                <h1 className="mt-4 max-w-3xl text-balance text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[4.1rem]">
                  Email Analytics Software to Track, Monitor and Improve Every Email Campaign
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
                  Turn every campaign into a business insight. Altroz Bulk Email brings campaign
                  performance, delivery status and reporting together on one analytics dashboard.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to={ROUTES.bookDemo} className="btn-primary">
                    Book Free Demo
                  </Link>
                  <a href="#dashboard" className="btn-outline">
                    View Dashboard
                  </a>
                </div>

                <div className="mt-6 grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {heroStats.map((stat, index) => (
                    <ScrollReveal
                      key={stat.label}
                      variant="fade-up"
                      delay={80 + index * 50}
                      className="h-full"
                    >
                      <article className="soft-card flex h-full min-h-[11.5rem] flex-col p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-h-10">
                            <div className="max-w-[10ch] text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                            {stat.label}
                            </div>
                            <div className="mt-1 text-2xl font-bold tracking-tight text-ink">
                              {stat.value}
                            </div>
                          </div>
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                            <stat.icon className="h-5 w-5" />
                          </span>
                        </div>
                        <p className="mt-auto pt-3 text-sm leading-6 text-ink-soft">{stat.note}</p>
                      </article>
                    </ScrollReveal>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" delay={120} className="lg:col-span-6">
                <AnalyticsHeroMock />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="what-is" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeader
              eyebrow="What is Email Analytics?"
              title="See what happened after every email was sent"
              description="The platform helps teams understand delivery status, campaign activity and report history from one organised place."
            />

            <div className="grid gap-4 lg:grid-cols-3">
              {whatIsCards.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 45}>
                  <article className="soft-card h-full p-5">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                      <card.icon className="h-5 w-5" />
                    </span>
                    <div className="mt-4 text-lg font-semibold text-ink">{card.title}</div>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {[
                "Send Campaign",
                "Track Delivery",
                "Review Report",
              ].map((item, index) => (
                <ScrollReveal key={item} variant="fade-up" delay={180 + index * 40}>
                  <div className="soft-card flex items-center gap-3 p-4">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-white">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-ink">{item}</div>
                      <p className="text-sm text-ink-soft">
                        {index === 0
                          ? "Launch a campaign and start collecting activity."
                          : index === 1
                            ? "Watch the sending process and confirm delivery."
                            : "Use the report to plan the next communication step."}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="why" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeader
              eyebrow="Why Email Analytics Matters"
              title="Visibility, monitoring and reporting without guesswork"
              description="Eight practical reasons businesses keep their communication inside one analytics view."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {whyMattersCards.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 35}>
                  <article className="soft-card group h-full p-5 transition-transform duration-300 hover:-translate-y-1">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-105">
                      <card.icon className="h-5 w-5" />
                    </span>
                    <div className="mt-4 text-base font-semibold text-ink">{card.title}</div>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Business benefit
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="dashboard" className="section scroll-mt-24">
          <div className="site-container">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
              <ScrollReveal variant="fade-up" className="lg:col-span-4">
                <div className="section-heading text-left">
                  <span className="eyebrow text-xs font-bold uppercase tracking-wider text-primary">
                    Analytics Dashboard
                  </span>
                  <h2 className="text-3xl font-bold text-ink md:text-4xl">
                    One dashboard for campaign summary, activity and usage
                  </h2>
                  <p className="text-ink-soft">
                    The analytics dashboard pulls campaign summary, broadcast activity and
                    subscription usage into one organised view.
                  </p>
                </div>

                <div className="soft-card mt-5 p-5">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    Dashboard at a glance
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      "Campaign Summary",
                      "Email Broadcast Activity",
                      "Scheduled Jobs",
                      "Sent Jobs",
                      "Ongoing Jobs",
                      "Cancelled Jobs",
                      "Subscription Usage",
                      "Recent Broadcasts",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 rounded-2xl bg-surface px-3 py-2 text-sm font-medium text-ink">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={80} className="lg:col-span-8">
                <div className="grid gap-4 md:grid-cols-2">
                  {dashboardWidgets.map((widget, index) => (
                    <article
                      key={widget.title}
                      className={cn(
                        "soft-card group h-full p-5 transition-transform duration-300 hover:-translate-y-1",
                        index === 0 && "md:col-span-2",
                        index === dashboardWidgets.length - 1 && "md:col-span-2 md:mx-auto md:w-full md:max-w-[34rem]",
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary-soft text-primary">
                            <widget.icon className="h-5 w-5" />
                          </span>
                          <div>
                            <div className="text-base font-semibold text-ink">{widget.title}</div>
                            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                              {widget.badge}
                            </div>
                          </div>
                        </div>
                        <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-primary shadow-sm">
                          Live
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-ink-soft">{widget.description}</p>
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        <div className="rounded-2xl bg-surface p-3 text-center">
                          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                            View
                          </div>
                          <div className="mt-1 text-sm font-semibold text-ink">Ready</div>
                        </div>
                        <div className="rounded-2xl bg-surface p-3 text-center">
                          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                            Status
                          </div>
                          <div className="mt-1 text-sm font-semibold text-ink">Visible</div>
                        </div>
                        <div className="rounded-2xl bg-surface p-3 text-center">
                          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                            Reports
                          </div>
                          <div className="mt-1 text-sm font-semibold text-ink">Updated</div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="features" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeader
              eyebrow="Analytics Features"
              title="The feature set that makes reporting easy to review"
              description="Each feature card explains what the analytics surface does and why it helps business teams."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {analyticsFeatures.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 35}>
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

        <section id="how-it-works" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeader
              eyebrow="How Analytics Works"
              title="A six-step workflow from sending to improving"
              description="The process keeps reporting clear, so teams can review what happened and use that insight for the next campaign."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {analyticsSteps.map((step, index) => (
                <ScrollReveal key={step.step} variant="fade-up" delay={index * 35}>
                  <article className="soft-card relative h-full p-5">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-primary-soft px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                        {step.step}
                      </span>
                      <span className="hidden rounded-full bg-surface px-2 py-1 text-[10px] font-semibold text-ink-soft lg:inline-flex">
                        {index + 1}/6
                      </span>
                    </div>
                    <div className="mt-4 text-base font-semibold text-ink">{step.title}</div>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{step.description}</p>
                    {index < analyticsSteps.length - 1 ? (
                      <ArrowRight className="mt-4 hidden h-4 w-4 text-primary/70 lg:block" />
                    ) : null}
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="benefits" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeader
              eyebrow="Business Benefits"
              title="Practical outcomes businesses get from clearer analytics"
              description="This section keeps the page dense and readable with short, card-led explanations."
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

        <section id="screens" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeader
              eyebrow="Product Screens"
              title="Representative screens that mirror the live analytics experience"
              description="The doc asked for product screens; these panels keep the page visually rich while staying lightweight and clear."
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
              title="How different teams use email analytics every day"
              description="The cards stay compact so the section remains visually dense and easy to scan."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {useCases.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 35}>
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
                  Clear answers for teams reviewing email analytics
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
                  Bring your reporting goals to a live demo and we can walk through the dashboard,
                  delivery tracking and campaign review flow.
                </p>
                <div className="button-group mt-5">
                  <Link to={ROUTES.bookDemo} className="btn-primary">
                    Book Free Demo
                  </Link>
                  <Link to={ROUTES.bulkEmailContact} className="btn-ghost">
                    Contact Sales
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={80} className="self-start lg:col-span-8 lg:-mt-1">
              <Accordion type="single" collapsible className="space-y-3 lg:pt-0.5">
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
                  Make better decisions with email analytics
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-white/80">
                  Altroz Bulk Email Analytics helps businesses monitor campaigns, review delivery
                  performance and access organised reports from one dashboard.
                </p>
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
      <span className="eyebrow text-xs font-bold uppercase tracking-wider text-primary">{eyebrow}</span>
      <h2 className="text-3xl font-bold text-ink md:text-4xl">{title}</h2>
      <p className="text-ink-soft">{description}</p>
    </ScrollReveal>
  );
}

function AnalyticsHeroMock() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="pointer-events-none absolute -top-5 left-4 hidden rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-primary shadow-pop float-slow md:block">
        Campaign Summary
      </div>
      <div className="pointer-events-none absolute -right-3 top-24 hidden rounded-full bg-success px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-pop float-slow md:block">
        Delivery Tracking Live
      </div>
      <div className="pointer-events-none absolute -bottom-6 left-20 hidden rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-primary shadow-pop float-slow md:block">
        Recent Broadcasts
      </div>

      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white shadow-float">
        <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <div className="ml-auto text-xs font-medium text-ink-soft">Altroz Bulk Email Dashboard</div>
        </div>

        <div className="grid gap-4 p-5">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-primary/5 via-white to-success/5 p-5">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Analytics Dashboard
            </div>
            <div className="mt-2 text-2xl font-bold tracking-tight text-ink">
              Monitor campaign performance in one place
            </div>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              Track delivery status, broadcast activity, scheduled jobs and recent reports without
              switching screens.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Scheduled", value: "04" },
                { label: "Sent Today", value: "18" },
                { label: "Cancelled", value: "02" },
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
                <span>Delivery Rate</span>
                <span className="text-success">99.2%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-surface">
                <div className="h-2 w-[99%] rounded-full bg-gradient-to-r from-primary to-success" />
              </div>
            </div>
            <div className="soft-card p-4">
              <div className="flex items-center justify-between gap-2 text-sm font-semibold text-ink">
                <span>Subscription Use</span>
                <span className="text-primary">68%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-surface">
                <div className="h-2 w-[68%] rounded-full bg-gradient-to-r from-primary to-primary/70" />
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                Broadcast Queue
              </div>
              <BarChart3 className="h-4 w-4 text-primary" />
            </div>

            <div className="mt-4 space-y-2">
              {[
                { title: "HR Policy Update", status: "Live" },
                { title: "Monthly Newsletter", status: "Live" },
                { title: "Event Reminder", status: "Queued" },
              ].map((item) => (
                <div key={item.title} className="flex items-center justify-between rounded-2xl bg-surface px-3 py-2">
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
