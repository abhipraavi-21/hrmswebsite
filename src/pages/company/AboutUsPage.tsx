"use client";

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  CircleDot,
  ClipboardList,
  Factory,
  FileText,
  GraduationCap,
  Handshake,
  HeartPulse,
  Hotel,
  Laptop2,
  LayoutDashboard,
  Lightbulb,
  LockKeyhole,
  MailCheck,
  Megaphone,
  MessageSquare,
  PackageCheck,
  Search,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Store,
  Target,
  Truck,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Footer from "@/components/site/Footer";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import MainNavbar from "@/components/site/MainNavbar";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { ROUTES } from "@/routes/routeConfig.js";
import { cn } from "@/lib/utils";

type CardData = {
  title: string;
  description: string;
  icon: ReactNode;
  href?: string;
};

type MissionCard = {
  title: string;
  description: string;
  icon: ReactNode;
  points: string[];
};

type Faq = {
  q: string;
  a: string;
};

function MaybeLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  center?: boolean;
}) {
  return (
    <ScrollReveal
      variant="fade-up"
      className={cn(center ? "mx-auto max-w-4xl text-center" : "max-w-4xl")}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-[#1d4ed8]/20 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-[#1d4ed8] shadow-sm">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-base leading-7 text-ink-soft">{description}</p>
    </ScrollReveal>
  );
}

function AboutDashboardMock() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="dashboard-glow left-1/2 top-10 -translate-x-1/2" />
      <div className="soft-card relative overflow-hidden rounded-[2rem] border border-border bg-white/95 p-5 shadow-float">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#b45309]">
              Altroz Bulk Email Dashboard
            </div>
            <div className="mt-1 text-lg font-semibold text-ink">
              Campaigns, templates and analytics in one place
            </div>
          </div>
          <div className="ml-auto rounded-full bg-[#1d4ed8]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1d4ed8]">
            Live
          </div>
        </div>

        <div className="mt-5 grid gap-4">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-[#1d4ed8]/6 via-white to-[#d97706]/6 p-5">
            <div className="flex flex-wrap gap-2">
              {["Broadcast", "Templates", "Scheduling", "SMTP", "Analytics"].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1d4ed8] shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#b45309]">
                What the dashboard shows
              </div>
              <div className="mt-2 text-sm font-semibold text-ink">
                Campaign performance, delivery status and scheduling visibility
              </div>
              <p className="mt-2 text-sm leading-6 text-ink-soft">
                Plan campaigns, organise templates, connect SMTP and review delivery results from a
                single centralised workspace.
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                ["Campaigns", "124"],
                ["Templates", "36"],
                ["Deliveries", "98%"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#b45309]">
                    {label}
                  </div>
                  <div className="mt-1 text-lg font-black text-ink">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.25rem] border border-border bg-white p-4 shadow-sm">
              <div className="text-sm font-semibold text-ink">Communication Workflow</div>
              <div className="mt-3 space-y-2">
                {["Compose", "Schedule", "Send", "Track"].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-surface/70 p-3 text-sm text-ink"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#1d4ed8]/10 text-xs font-bold text-[#1d4ed8]">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.25rem] border border-border bg-white p-4 shadow-sm">
              <div className="text-sm font-semibold text-ink">Delivery Snapshot</div>
              <div className="mt-3 space-y-2">
                {[
                  ["Broadcast ready", "Live"],
                  ["Parent update", "Queued"],
                  ["Campaign review", "Ready"],
                ].map(([title, status]) => (
                  <div
                    key={title}
                    className="flex items-center justify-between rounded-xl bg-white p-3 text-sm shadow-sm"
                  >
                    <span className="font-medium text-ink">{title}</span>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em]",
                        status === "Live"
                          ? "bg-[#1d4ed8]/10 text-[#1d4ed8]"
                          : status === "Ready"
                            ? "bg-[#d97706]/10 text-[#b45309]"
                            : "bg-surface text-ink-soft",
                      )}
                    >
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const quickLinks: CardData[] = [
  {
    title: "Email Broadcast",
    description: "Create and send business campaigns from one central place.",
    icon: <MailCheck className="h-5 w-5" />,
    href: ROUTES.bulkEmailBroadcast,
  },
  {
    title: "Templates",
    description: "Use ready-made email layouts that keep communication professional.",
    icon: <FileText className="h-5 w-5" />,
    href: ROUTES.bulkEmailTemplates,
  },
  {
    title: "Analytics",
    description: "Track opens, delivery and campaign performance clearly.",
    icon: <BarChart3 className="h-5 w-5" />,
    href: ROUTES.bulkEmailAnalytics,
  },
  {
    title: "Scheduling",
    description: "Plan campaigns in advance and send at the right time.",
    icon: <CalendarDays className="h-5 w-5" />,
    href: ROUTES.bulkEmailScheduling,
  },
  {
    title: "SMTP",
    description: "Connect the delivery setup that fits your business requirements.",
    icon: <Workflow className="h-5 w-5" />,
    href: ROUTES.bulkEmailSmtp,
  },
  {
    title: "Learn",
    description: "Explore helpful guides for better business communication.",
    icon: <GraduationCap className="h-5 w-5" />,
    href: ROUTES.learn,
  },
];

const storySteps = [
  {
    title: "Email remains essential",
    description:
      "Business communication now happens across many channels, but email continues to be the most trusted and professional way to reach customers, employees and partners.",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "Scattered tools create friction",
    description:
      "Many teams still depend on disconnected inboxes, manual processes and basic email accounts that were never built for large-scale communication.",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Centralised workflows help",
    description:
      "Broadcasting, scheduling, templates, analytics and SMTP together give teams a cleaner way to manage every stage of communication.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Altroz Bulk Email was built for that need",
    description:
      "Altroz Technologies created the platform to help businesses communicate in a structured, dependable and professional way.",
    icon: <Sparkles className="h-5 w-5" />,
  },
];

const missionCards: MissionCard[] = [
  {
    title: "Our Mission",
    description: "Simplify how businesses plan and send professional email communication.",
    icon: <Target className="h-5 w-5" />,
    points: [
      "Helping teams reduce manual work",
      "Supporting dependable email delivery",
      "Keeping campaigns organised and measurable",
      "Making the platform easy to adopt",
    ],
  },
  {
    title: "Our Vision",
    description:
      "Support the way businesses communicate in a digital-first world with a flexible, scalable platform.",
    icon: <Sparkles className="h-5 w-5" />,
    points: [
      "Help organisations of every size communicate better",
      "Continue improving as communication needs evolve",
      "Build long-term trust through practical innovation",
      "Make business email communication simpler",
    ],
  },
  {
    title: "Our Purpose",
    description:
      "Replace disconnected tools and repeated manual steps with one reliable communication system.",
    icon: <Handshake className="h-5 w-5" />,
    points: [
      "Bring email work into one place",
      "Reduce repeated effort and confusion",
      "Make planning and tracking easier",
      "Support teams with clearer workflows",
    ],
  },
];

const beliefCards: CardData[] = [
  {
    title: "Customer First",
    description: "Our product decisions are guided by real business communication needs.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Simple Technology",
    description: "Powerful software should still be easy for teams to use every day.",
    icon: <CircleDot className="h-5 w-5" />,
  },
  {
    title: "Business Productivity",
    description: "Organised broadcasting and scheduling help teams save time and move faster.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Continuous Innovation",
    description: "The platform evolves as communication needs and user feedback evolve.",
    icon: <Lightbulb className="h-5 w-5" />,
  },
  {
    title: "Security",
    description: "Business communication data should be handled with care and responsibility.",
    icon: <LockKeyhole className="h-5 w-5" />,
  },
  {
    title: "Reliability",
    description: "Teams need a platform they can depend on for important, time-sensitive messages.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Transparency",
    description: "We aim to be clear about what the platform does and how it works.",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "Long-Term Relationships",
    description: "We see every customer as a partner we grow with over time.",
    icon: <Handshake className="h-5 w-5" />,
  },
];

const valueCards: CardData[] = [
  {
    title: "Easy Campaign Management",
    description: "Create, organise and manage email campaigns without technical complexity.",
    icon: <MailCheck className="h-5 w-5" />,
  },
  {
    title: "Centralised Dashboard",
    description: "View and manage all email activity in one place.",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Professional Templates",
    description: "Keep a consistent look across customer, employee and partner communication.",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Campaign Scheduling",
    description: "Plan communication in advance and send messages when they matter most.",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Email Analytics",
    description: "Understand performance and improve future communication decisions.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "SMTP Configuration",
    description: "Connect your preferred SMTP setup to fit your business needs.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Delivery Reports",
    description: "See the status of your campaigns and maintain accountability.",
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
  {
    title: "Business-Ready Platform",
    description: "Built to support growing teams and larger enterprises alike.",
    icon: <PackageCheck className="h-5 w-5" />,
  },
];

const audienceCards: CardData[] = [
  {
    title: "Business Owners",
    description: "Send professional updates, offers and announcements with confidence.",
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
  {
    title: "Marketing Teams",
    description: "Plan campaigns with templates, scheduling and analytics.",
    icon: <Megaphone className="h-5 w-5" />,
  },
  {
    title: "HR Departments",
    description: "Communicate policy updates, announcements and employee information.",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "Educational Institutions",
    description: "Share circulars, updates and notices with a centralised system.",
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    title: "Healthcare Organisations",
    description: "Send reminders and structured communication professionally.",
    icon: <HeartPulse className="h-5 w-5" />,
  },
  {
    title: "Manufacturing Companies",
    description: "Coordinate communication across teams, vendors and clients.",
    icon: <Factory className="h-5 w-5" />,
  },
  {
    title: "Retail Businesses",
    description: "Reach customers with offers and updates while staying consistent.",
    icon: <Store className="h-5 w-5" />,
  },
  {
    title: "Corporate Offices",
    description: "Manage internal and external communication through one platform.",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "SMEs",
    description: "Access enterprise-style email communication without extra complexity.",
    icon: <Target className="h-5 w-5" />,
  },
  {
    title: "Enterprises",
    description: "Scale communication across departments with a dependable platform.",
    icon: <Truck className="h-5 w-5" />,
  },
];

const philosophyCards: CardData[] = [
  {
    title: "Simple to Use",
    description: "Clear navigation and intuitive workflows reduce the learning curve.",
    icon: <CircleDot className="h-5 w-5" />,
  },
  {
    title: "Professional",
    description: "Templates, delivery and reporting are built to reflect well on the brand.",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: "Reliable",
    description: "Communication tools should work consistently every day.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Scalable",
    description: "The platform is designed to grow with a business.",
    icon: <PackageCheck className="h-5 w-5" />,
  },
  {
    title: "Secure",
    description: "Sensitive communication must be protected and managed carefully.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Business Focused",
    description: "Every feature is designed around real business communication needs.",
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
  {
    title: "Modern Cloud Platform",
    description: "Manage communication from anywhere without local infrastructure limits.",
    icon: <Laptop2 className="h-5 w-5" />,
  },
  {
    title: "Easy Adoption",
    description: "Teams can begin using Altroz Bulk Email with minimal setup friction.",
    icon: <Users className="h-5 w-5" />,
  },
];

const communicationCards: CardData[] = [
  {
    title: "Employee Communication",
    description: "Organised internal updates help teams stay informed and connected.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Customer Communication",
    description: "Timely, professional emails build trust and keep customers informed.",
    icon: <MailCheck className="h-5 w-5" />,
  },
  {
    title: "Marketing Communication",
    description: "Well-planned campaigns help you reach the right audience consistently.",
    icon: <Megaphone className="h-5 w-5" />,
  },
  {
    title: "Business Branding",
    description: "Consistent email communication strengthens how your brand is perceived.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

const faqItems: Faq[] = [
  {
    q: "Who is Altroz Technologies?",
    a: "Altroz Technologies Pvt. Ltd. is an enterprise SaaS company focused on practical cloud-based tools for business automation and communication.",
  },
  {
    q: "What is Altroz Bulk Email?",
    a: "Altroz Bulk Email is a business communication platform for sending professional email campaigns through broadcasting, scheduling, templates, analytics and SMTP integration.",
  },
  {
    q: "Who should use Altroz Bulk Email?",
    a: "Any organisation that communicates with customers, employees or stakeholders through email can use it, including businesses, institutions and service organisations.",
  },
  {
    q: "Why was Altroz Bulk Email created?",
    a: "It was created to replace scattered, manual email work with a centralised and professional way to manage communication.",
  },
  {
    q: "What industries use this platform?",
    a: "Businesses across marketing, HR, education, healthcare, manufacturing, retail and corporate operations can use the platform.",
  },
  {
    q: "Can small businesses use it?",
    a: "Yes. The platform is designed to be simple enough for small and growing businesses to use without dedicated technical resources.",
  },
  {
    q: "Can enterprises use it?",
    a: "Yes. The platform is built to support larger organisations with multiple teams and departments.",
  },
  {
    q: "Does Altroz Bulk Email support scheduling?",
    a: "Yes. Teams can plan communication in advance and schedule campaigns for the right time.",
  },
  {
    q: "Does the platform provide analytics?",
    a: "Yes. Reporting and analytics help teams understand how campaigns are performing.",
  },
  {
    q: "Can I use my own SMTP setup?",
    a: "Yes. The platform supports SMTP configuration so businesses can connect their preferred delivery setup.",
  },
];

function AboutUsPage() {
  return (
    <div className="about-us-theme min-h-screen bg-background">
      <PageSEO
        title="About Altroz Bulk Email | Business Email Platform by Altroz Technologies"
        description="Learn about Altroz Bulk Email, a business email platform by Altroz Technologies Pvt. Ltd. Discover our mission, vision, values and approach to professional business communication."
        canonicalPath={ROUTES.about}
      />

      <TopNavbar />
      <MainNavbar />

      <main className="overflow-x-hidden">
        <section className="hero-gradient relative overflow-hidden py-14 sm:py-16 lg:py-20">
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#1d4ed8]/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-[#d97706]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#1d4ed8]/8 blur-3xl" />

          <div className="site-container">
            <div className="mx-auto max-w-5xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#1d4ed8]/20 bg-white px-4 py-2 text-xs font-extrabold tracking-[0.22em] text-[#1d4ed8] shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                About Altroz Bulk Email
              </span>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Modern Business Communication, Built for Growing Businesses
              </h1>
              <p className="mx-auto mt-5 max-w-4xl text-base leading-7 text-ink-soft sm:text-lg">
                Altroz Bulk Email is a business communication platform built by Altroz Technologies
                Pvt. Ltd. to help organisations send professional email campaigns through a single,
                centralised system. From campaign scheduling and templates to analytics and SMTP
                integration, the platform is designed to make business email communication simple,
                organised and dependable.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Link to={ROUTES.bookDemo} className="btn-primary">
                  Book Free Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#what-we-believe" className="btn-outline">
                  Explore Features
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {[
                  [ROUTES.bulkEmailBroadcast, "Broadcast"],
                  [ROUTES.bulkEmailTemplates, "Templates"],
                  [ROUTES.bulkEmailAnalytics, "Analytics"],
                  [ROUTES.bulkEmailScheduling, "Scheduling"],
                  [ROUTES.bulkEmailSmtp, "SMTP"],
                  [ROUTES.learn, "Learn"],
                  [ROUTES.contact, "Contact"],
                ].map(([href, label]) => (
                  <MaybeLink
                    key={label}
                    href={href}
                    className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-ink-soft shadow-sm transition hover:border-[#1d4ed8]/30 hover:text-[#1d4ed8]"
                  >
                    {label}
                  </MaybeLink>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
              <ScrollReveal variant="fade-up" className="text-center lg:text-left">
                <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-[#1d4ed8] sm:text-3xl lg:mx-0">
                  One platform for broadcasting, scheduling, templates, analytics and SMTP
                </h2>

                <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg lg:mx-0">
                  Businesses choose Altroz Bulk Email because it brings together the essentials of
                  professional communication in one place. Teams can plan campaigns, keep messaging
                  consistent and understand how every email performs without juggling disconnected
                  tools.
                </p>

                <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg lg:mx-0">
                  Whether you are sending customer updates, employee communication or campaign
                  announcements, Altroz Bulk Email gives your team a dependable way to manage it all
                  from a single dashboard.
                </p>

                <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  <Link to={ROUTES.bookDemo} className="btn-primary">
                    Book Free Demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to={ROUTES.bulkEmail} className="btn-outline">
                    Explore Platform
                  </Link>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      title: "Centralised",
                      description: "One workspace for campaigns, templates and reports.",
                      icon: <LayoutDashboard className="h-5 w-5" />,
                    },
                    {
                      title: "Professional",
                      description: "Consistent email communication that supports your brand.",
                      icon: <Sparkles className="h-5 w-5" />,
                    },
                    {
                      title: "Reliable",
                      description: "Designed to support time-sensitive business communication.",
                      icon: <BadgeCheck className="h-5 w-5" />,
                    },
                  ].map((item) => (
                    <article key={item.title} className="soft-card flex h-full flex-col p-4 text-left">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                        {item.icon}
                      </span>
                      <h3 className="mt-4 text-base font-semibold text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
                    </article>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal variant="scale" className="relative">
                <AboutDashboardMock />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Who We Are"
              title="Altroz Technologies builds practical business communication tools"
              description="Altroz Technologies Pvt. Ltd. is an enterprise SaaS company focused on cloud-based tools for business automation and communication."
              center
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <ScrollReveal variant="fade-up" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#b45309]">
                  Who We Are
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  Built for teams that want structured, dependable communication
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-7 text-ink-soft">
                  <p>
                    Altroz Technologies Pvt. Ltd. is an enterprise SaaS company focused on building
                    practical, cloud-based tools for business automation and communication. Altroz
                    Bulk Email is one of the products built by the company, created specifically to
                    help organisations manage their email communication in a structured and
                    professional way.
                  </p>
                  <p>
                    Altroz Bulk Email brings together email broadcasting, campaign scheduling,
                    ready-to-use templates, delivery analytics and SMTP configuration in one
                    platform. Instead of managing business emails across scattered tools and manual
                    processes, teams can plan, send and track communication from a single dashboard.
                  </p>
                  <p>
                    The platform is built for businesses of every size, from small and growing teams
                    to larger enterprises that need a reliable way to reach customers, employees and
                    stakeholders through email.
                  </p>
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-[#1d4ed8]/15 bg-gradient-to-br from-[#eff6ff] via-white to-[#fff7ef] p-5">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#b45309]">
                    What this platform combines
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      "Email broadcasting",
                      "Campaign scheduling",
                      "Professional templates",
                      "Delivery analytics",
                      "SMTP configuration",
                      "Single dashboard visibility",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 rounded-2xl bg-white p-3 text-sm font-medium text-ink shadow-sm"
                      >
                        <CheckCircle2 className="h-4 w-4 text-[#d97706]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#b45309]">
                  Why this matters
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  Modern teams need one central place to communicate professionally
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  Business email still plays a key role in how organisations communicate with
                  customers, employees and partners. Altroz Bulk Email helps keep that communication
                  clear, organised and easy to manage by reducing the friction of multiple tools and
                  manual follow-ups.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "Campaigns stay easier to plan and review.",
                    "Templates help maintain a consistent brand voice.",
                    "Analytics give teams better visibility into results.",
                    "SMTP integration supports flexible delivery setups.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-xl bg-white p-3 text-sm font-medium text-ink shadow-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#1d4ed8]" />
                      {item}
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Our Story"
              title="Altroz Bulk Email was created to solve a common communication gap"
              description="The platform was built because many businesses needed a more structured way to handle professional email communication."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {storySteps.map((item, index) => (
                <article key={item.title} className="soft-card h-full p-5">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                      {item.icon}
                    </span>
                    <span className="rounded-full bg-[#1d4ed8]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#1d4ed8]">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="mission" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Mission, Vision, Purpose"
              title="We want to make business email communication easier to manage"
              description="These three ideas shape how we build, improve and support Altroz Bulk Email."
              center
            />

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {missionCards.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 60}>
                  <article className="soft-card h-full p-6">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                        {card.icon}
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-ink">{card.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-ink-soft">{card.description}</p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3">
                      {card.points.map((point) => (
                        <div
                          key={point}
                          className="flex items-center gap-2 rounded-xl bg-surface/70 p-3 text-sm font-medium text-ink"
                        >
                          <CheckCircle2 className="h-4 w-4 text-[#d97706]" />
                          {point}
                        </div>
                      ))}
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="what-we-believe" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="What We Believe"
              title="A clear set of values guides the way we build the product"
              description="These principles shape the experience, the support and the long-term direction of Altroz Bulk Email."
              center
            />

            <StaggerReveal step={40} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {beliefCards.map((card) => (
                <article key={card.title} className="soft-card h-full p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                    {card.icon}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="why-businesses-choose" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Why Businesses Choose Altroz Bulk Email"
              title="The platform is built around practical business communication needs"
              description="Teams choose it because it is organised, professional and easy to work with on a daily basis."
              center
            />

            <StaggerReveal step={40} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {valueCards.map((card) => (
                <article key={card.title} className="soft-card h-full p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                    {card.icon}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="who-we-help" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Who We Help"
              title="Altroz Bulk Email supports a wide range of organisations and teams"
              description="The platform is useful anywhere organised, professional email communication matters."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {audienceCards.map((card) => (
                <article key={card.title} className="soft-card h-full p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                    {card.icon}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="product-philosophy" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Our Product Philosophy"
              title="Every product decision starts with clarity, simplicity and trust"
              description="We want the platform to feel easy to adopt while still supporting serious business communication needs."
              center
            />

            <StaggerReveal step={40} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {philosophyCards.map((card) => (
                <article key={card.title} className="soft-card h-full p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                    {card.icon}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="why-communication-matters" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Why Communication Matters"
              title="Clear communication shapes how a business operates"
              description="It affects how customers perceive a brand, how employees stay informed and how smoothly operations run."
              center
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1fr] lg:items-start">
              <div className="grid gap-4">
                {communicationCards.map((card, index) => (
                  <ScrollReveal key={card.title} variant="fade-up" delay={index * 45}>
                    <article className="soft-card h-full p-5">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                        {card.icon}
                      </span>
                      <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                    </article>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal variant="fade-left" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#b45309]">
                  Business Communication Impact
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  The right email platform can improve both clarity and efficiency
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  Consistent professional communication reflects well on a business every time a
                  message reaches an inbox. When teams have the right platform, they spend less time
                  on manual follow-ups and more time on actual work.
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    "Employee updates stay organised and easy to follow.",
                    "Customer communication remains timely and professional.",
                    "Campaigns become easier to plan, send and measure.",
                    "Brand communication stays consistent across departments.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-xl bg-white p-3 text-sm font-medium text-ink shadow-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#d97706]" />
                      {item}
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="Common questions about Altroz Bulk Email"
              description="A short answer to the questions businesses ask most often."
              center
            />

            <div className="mx-auto mt-8 max-w-4xl">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item) => (
                  <AccordionItem key={item.q} value={item.q} className="soft-card px-5">
                    <AccordionTrigger className="py-5 text-left text-base font-semibold text-ink hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-7 text-ink-soft">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="site-container">
            <div className="soft-card overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#b45309]">
                    Let’s Build Better Business Communication Together
                  </div>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                    Altroz Bulk Email helps businesses communicate more efficiently
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
                    Whether you are a growing business or a larger enterprise, Altroz Bulk Email
                    gives your team a structured way to manage professional email communication from
                    one dependable platform.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to={ROUTES.bookDemo} className="btn-primary">
                      Book Free Demo
                    </Link>
                    <Link to={ROUTES.contact} className="btn-outline">
                      Contact Sales
                    </Link>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Professional broadcasting",
                    "Email templates",
                    "Campaign scheduling",
                    "SMTP integration",
                    "Delivery reports",
                    "Analytics visibility",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-2xl bg-white p-4 text-sm font-semibold text-ink shadow-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#1d4ed8]" />
                      {item}
                    </div>
                  ))}
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

export default AboutUsPage;
