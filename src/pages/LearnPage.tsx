import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  MailCheck,
  Megaphone,
  NotebookPen,
  Search,
  Play,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Users,
  Workflow,
  Wallet,
  Layers3,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Footer from "@/components/site/Footer";
import BulkEmailNavbar from "@/components/site/BulkEmailNavbar";
import ManagedContentShowcase from "@/components/site/ManagedContentShowcase";
import PageSEO from "@/components/site/PageSEO";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { ROUTES } from "@/routes/routeConfig.js";
import { usePublicContentRecord, usePublishedContent } from "@/site/PublicSiteDataContext";
import { cn } from "@/lib/utils";

type FeatureCard = {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
};

type GuideCard = {
  title: string;
  description: string;
  readingTime: string;
  category: string;
  difficulty: string;
  href: string;
};

type TopicCard = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
};

type PathStep = {
  step: string;
  title: string;
  description: string;
  href: string;
};

type AudienceCard = {
  title: string;
  description: string;
  icon: ReactNode;
};

type ResourceCard = {
  title: string;
  description: string;
  note: string;
  icon: ReactNode;
};

type ReasonCard = {
  title: string;
  description: string;
  icon: ReactNode;
};

type FaqItem = {
  question: string;
  answer: string;
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
      className={cn("bulk-email-animated-title font-black leading-[1.02] tracking-[-0.04em]", className)}
      aria-label={children}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={cn("inline-block", index % 2 === 0 ? "text-[#1d4ed8]" : "text-[#b45309]")}
          style={{
            animation: "learnWordRise 0.55s ease-out both",
            animationDelay: `${index * 60}ms`,
            marginRight: index < words.length - 1 ? "0.3em" : 0,
          }}
        >
          {word}
        </span>
      ))}
    </Component>
  );
}

function LearningDashboardMock() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="dashboard-glow left-1/2 top-10 -translate-x-1/2" />
      <div className="soft-card relative overflow-hidden rounded-[2rem] border border-border bg-white/95 p-5 shadow-float">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#b45309]">
              Learning Dashboard
            </div>
            <div className="mt-1 text-lg font-semibold text-ink">Structured learning, simple navigation</div>
          </div>
          <div className="ml-auto rounded-full bg-[#1d4ed8]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1d4ed8]">
            Free
          </div>
        </div>

        <div className="mt-5 grid gap-4">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-[#1d4ed8]/6 via-white to-[#d97706]/6 p-5">
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-3 shadow-sm">
              <Search className="h-4 w-4 text-[#1d4ed8]" />
              <span className="text-sm text-ink-soft">Search guides, topics, SMTP, templates, analytics...</span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#b45309]">
                  Getting Started
                </div>
                <div className="mt-1 text-lg font-semibold text-ink">40% complete</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#1d4ed8]">Roadmap</div>
                <div className="mt-1 text-sm font-medium text-ink-soft">7 learning steps</div>
              </div>
            </div>

            <div className="mt-3 h-2 rounded-full bg-surface">
              <div className="h-2 w-[40%] rounded-full bg-gradient-to-r from-[#1d4ed8] to-[#d97706]" />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Email Broadcasting", icon: Megaphone },
              { title: "SMTP", icon: Workflow },
              { title: "Templates", icon: NotebookPen },
              { title: "Analytics", icon: BarChart3 },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[1.25rem] border border-border bg-white p-4 shadow-sm"
              >
                <item.icon className="h-5 w-5 text-[#1d4ed8]" />
                <div className="mt-3 text-sm font-semibold text-ink">{item.title}</div>
                <div className="mt-1 text-xs leading-5 text-ink-soft">
                  Practical guides and product tutorials.
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["What is Bulk Email?", "Beginner Guide"],
              ["Campaign Planning", "6 min read"],
              ["Email Analytics", "Intermediate"],
              ["Email Best Practices", "Free resource"],
            ].map(([title, meta]) => (
              <div key={title} className="rounded-[1.25rem] border border-border bg-white p-4 shadow-sm">
                <div className="text-sm font-semibold text-ink">{title}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-[#b45309]">
                  {meta}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const heroHighlights: FeatureCard[] = [
  {
    title: "Free Learning Hub",
    description: "Everything on this page is free to read and built for practical use.",
    icon: <Sparkles className="h-5 w-5" />,
    href: "#featured-guides",
  },
  {
    title: "Plain Language",
    description: "Email communication concepts are explained simply, without heavy jargon.",
    icon: <Lightbulb className="h-5 w-5" />,
    href: "#why-learn",
  },
  {
    title: "Built for Growth",
    description: "Start with the basics and move up to analytics, scheduling and SMTP.",
    icon: <Workflow className="h-5 w-5" />,
    href: "#learning-path",
  },
];

const featuredGuides: GuideCard[] = [
  {
    title: "What is Bulk Email?",
    description: "Learn how bulk email works, why it matters and where it fits in a business communication strategy.",
    readingTime: "5 min",
    category: "Getting Started",
    difficulty: "Beginner",
    href: ROUTES.bulkEmail,
  },
  {
    title: "Campaign Planning",
    description: "Understand how to define a goal, choose an audience and prepare a campaign before sending.",
    readingTime: "6 min",
    category: "Campaigns",
    difficulty: "Beginner",
    href: ROUTES.bulkEmailBroadcast,
  },
  {
    title: "Email Templates",
    description: "See how reusable layouts help you maintain a professional look across every message.",
    readingTime: "7 min",
    category: "Templates",
    difficulty: "Beginner",
    href: ROUTES.bulkEmailTemplates,
  },
  {
    title: "SMTP Configuration",
    description: "Get a simple grounding in SMTP, the delivery technology behind every outgoing email.",
    readingTime: "6 min",
    category: "Delivery",
    difficulty: "Intermediate",
    href: ROUTES.bulkEmailSmtp,
  },
  {
    title: "Scheduling Campaigns",
    description: "Learn how scheduling works so your email goes out at the most suitable time.",
    readingTime: "6 min",
    category: "Scheduling",
    difficulty: "Beginner",
    href: ROUTES.bulkEmailScheduling,
  },
  {
    title: "Email Analytics",
    description: "Read opens, clicks and delivery data so you can improve future campaigns with confidence.",
    readingTime: "7 min",
    category: "Analytics",
    difficulty: "Intermediate",
    href: ROUTES.bulkEmailAnalytics,
  },
  {
    title: "HR Communication",
    description: "See how email works for onboarding, policy updates and employee announcements.",
    readingTime: "6 min",
    category: "Use Cases",
    difficulty: "Beginner",
    href: ROUTES.bulkEmailHrCommunication,
  },
  {
    title: "Email Best Practices",
    description: "Pick up practical do's and don'ts that help your emails stay professional and compliant.",
    readingTime: "8 min",
    category: "Best Practices",
    difficulty: "Beginner",
    href: "#resource-library",
  },
];

const learnCards: FeatureCard[] = [
  {
    title: "Email Broadcasting",
    description: "Understand how one message is sent to a large group of recipients and used for updates, newsletters and announcements.",
    icon: <Megaphone className="h-5 w-5" />,
    href: ROUTES.bulkEmailBroadcast,
  },
  {
    title: "Campaign Planning",
    description: "Learn how to plan from goal-setting to audience selection so every campaign has a clear purpose.",
    icon: <ClipboardList className="h-5 w-5" />,
    href: ROUTES.bulkEmailBroadcast,
  },
  {
    title: "Email Templates",
    description: "Discover how reusable layouts help you keep every message consistent and professional.",
    icon: <NotebookPen className="h-5 w-5" />,
    href: ROUTES.bulkEmailTemplates,
  },
  {
    title: "SMTP Configuration",
    description: "Get a simple explanation of the sending technology that actually delivers your email.",
    icon: <Workflow className="h-5 w-5" />,
    href: ROUTES.bulkEmailSmtp,
  },
  {
    title: "Email Analytics",
    description: "Learn to read opens, clicks and delivery data so you can improve future campaigns.",
    icon: <BarChart3 className="h-5 w-5" />,
    href: ROUTES.bulkEmailAnalytics,
  },
  {
    title: "Business Communication",
    description: "Explore how tone, structure and professionalism shape the way people perceive your organisation.",
    icon: <MailCheck className="h-5 w-5" />,
    href: ROUTES.bulkEmailMarketing,
  },
  {
    title: "Delivery Reports",
    description: "Understand what happens after you hit send and how to check whether email reached the inbox.",
    icon: <FileText className="h-5 w-5" />,
    href: ROUTES.bulkEmailAnalytics,
  },
  {
    title: "Email Best Practices",
    description: "Pick up practical do's and don'ts that help your emails look professional and stay compliant.",
    icon: <CheckCircle2 className="h-5 w-5" />,
    href: "#resource-library",
  },
];

const learningPaths: PathStep[] = [
  {
    step: "01",
    title: "Getting Started",
    description: "Understand the basics of business email communication and where bulk email fits in.",
    href: "#featured-guides",
  },
  {
    step: "02",
    title: "Create Campaign",
    description: "Define a goal, choose an audience and structure your message before you send anything.",
    href: ROUTES.bulkEmailBroadcast,
  },
  {
    step: "03",
    title: "Email Templates",
    description: "Explore reusable layouts so your emails look consistent and on-brand every time.",
    href: ROUTES.bulkEmailTemplates,
  },
  {
    step: "04",
    title: "Schedule Campaign",
    description: "Set emails to go out automatically at the most suitable time for your audience.",
    href: ROUTES.bulkEmailScheduling,
  },
  {
    step: "05",
    title: "SMTP Configuration",
    description: "Get a simple grounding in delivery infrastructure so troubleshooting feels easier.",
    href: ROUTES.bulkEmailSmtp,
  },
  {
    step: "06",
    title: "Track Analytics",
    description: "Learn to read opens, clicks and delivery reports to understand campaign response.",
    href: ROUTES.bulkEmailAnalytics,
  },
  {
    step: "07",
    title: "Improve Future Campaigns",
    description: "Use what you learned to refine subject lines, timing and content for the next send.",
    href: "#why-learn",
  },
];

const popularTopics: TopicCard[] = [
  { title: "Bulk Email", description: "Sending one message to many recipients in a responsible, professional way.", href: "#featured-guides", icon: <Megaphone className="h-5 w-5" /> },
  { title: "Email Marketing", description: "Using email to promote products, services or updates to an interested audience.", href: ROUTES.bulkEmailMarketing, icon: <MailCheck className="h-5 w-5" /> },
  { title: "Internal Communication", description: "Keeping employees informed through structured email updates.", href: ROUTES.bulkEmailHrCommunication, icon: <Users className="h-5 w-5" /> },
  { title: "HR Communication", description: "Using email for onboarding, policy updates and employee announcements.", href: ROUTES.bulkEmailHrCommunication, icon: <ClipboardList className="h-5 w-5" /> },
  { title: "Marketing Communication", description: "Crafting promotional messages that still feel clear and useful.", href: ROUTES.bulkEmailMarketing, icon: <Sparkles className="h-5 w-5" /> },
  { title: "Education Communication", description: "Keeping students, parents and staff informed through timely updates.", href: ROUTES.bulkEmailEducation, icon: <GraduationCap className="h-5 w-5" /> },
  { title: "Campaign Planning", description: "Structuring a campaign around a clear audience and measurable goal.", href: ROUTES.bulkEmailBroadcast, icon: <ClipboardList className="h-5 w-5" /> },
  { title: "Delivery Reports", description: "Checking whether your messages actually reached the inbox.", href: ROUTES.bulkEmailAnalytics, icon: <FileText className="h-5 w-5" /> },
  { title: "SMTP", description: "The delivery technology behind every email that leaves your business.", href: ROUTES.bulkEmailSmtp, icon: <Workflow className="h-5 w-5" /> },
  { title: "Email Analytics", description: "Understanding how your audience is engaging with what you send.", href: ROUTES.bulkEmailAnalytics, icon: <BarChart3 className="h-5 w-5" /> },
];

const audienceCards: AudienceCard[] = [
  {
    title: "Business Owners",
    description: "Learn how consistent email communication supports trust and growth without needing to manage every detail yourself.",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    title: "Marketing Teams",
    description: "Understand how to plan campaigns, write strong subject lines and read performance data.",
    icon: <Megaphone className="h-5 w-5" />,
  },
  {
    title: "HR Teams",
    description: "Discover how to use email for onboarding, policy communication and employee engagement.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Sales Teams",
    description: "See how planned email communication supports follow-ups, outreach and relationship building.",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "IT Teams",
    description: "Get a simple grounding in SMTP, delivery infrastructure and analytics to support the wider organisation.",
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    title: "Educational Institutions",
    description: "Learn how schools, colleges and training teams keep students and parents informed.",
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    title: "Healthcare Organisations",
    description: "Understand how to communicate reminders, updates and general information clearly and professionally.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Corporate Offices",
    description: "Learn how structured communication improves coordination across departments and locations.",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
];

const resourceLibrary: ResourceCard[] = [
  {
    title: "Beginner Guides",
    description: "Foundational articles for anyone new to business email communication and bulk email.",
    note: "Start here if you are learning from zero.",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Best Practices",
    description: "Practical do's and don'ts for writing, sending and managing professional emails.",
    note: "Helpful when you want to improve quality.",
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
  {
    title: "Industry Guides",
    description: "Sector-specific guidance for education, healthcare, HR, marketing and corporate use cases.",
    note: "Useful for role-specific learning.",
    icon: <Layers3 className="h-5 w-5" />,
  },
  {
    title: "Product Tutorials",
    description: "Step-by-step walkthroughs on using core email features effectively.",
    note: "Connect learning to the product interface.",
    icon: <NotebookPen className="h-5 w-5" />,
  },
  {
    title: "FAQs",
    description: "Quick, clear answers to the most common questions about business email communication.",
    note: "Great for quick clarification.",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Video Tutorials",
    description: "Short visual walkthroughs of key concepts and features.",
    note: "Coming soon.",
    icon: <Play className="h-5 w-5" />,
  },
  {
    title: "Downloadable Checklists",
    description: "Printable checklists to help you plan and review your campaigns.",
    note: "Coming soon.",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "Email Strategy Resources",
    description: "Guidance on building a longer-term email communication strategy for your organisation.",
    note: "For teams thinking beyond a single send.",
    icon: <Workflow className="h-5 w-5" />,
  },
];

const whyCards: ReasonCard[] = [
  {
    title: "Practical Knowledge",
    description: "Every guide focuses on real business scenarios so the learning is useful immediately.",
    icon: <Lightbulb className="h-5 w-5" />,
  },
  {
    title: "Easy Language",
    description: "Concepts like SMTP and analytics are explained simply, without unnecessary jargon.",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Business Examples",
    description: "Guides use realistic situations to make concepts easier to remember and apply.",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "Modern Email Practices",
    description: "Content reflects current, responsible approaches to business email communication.",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: "Industry Focused",
    description: "Coverage spans education, healthcare, HR, marketing and corporate use cases.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Actionable Learning",
    description: "Each guide helps you take a clear next step instead of just reading and forgetting.",
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
  {
    title: "Professional Guidance",
    description: "Content is written and reviewed with the product and deliverability team in mind.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Continuous Updates",
    description: "The hub is designed to grow over time with new guides, topics and resources.",
    icon: <Workflow className="h-5 w-5" />,
  },
];

const faqItems: FaqItem[] = [
  {
    question: "What can I learn in this hub?",
    answer:
      "You can learn the basics and practical details of business email communication, including bulk email, campaign planning, SMTP, templates, scheduling and analytics.",
  },
  {
    question: "Who is this learning page for?",
    answer:
      "It is useful for business owners, marketing and sales teams, HR professionals, IT administrators and any organisation that manages email communication.",
  },
  {
    question: "Is the learning content free?",
    answer:
      "Yes. The guides, articles and resources on this page are free to read and are meant to help visitors learn without sign-up friction.",
  },
  {
    question: "Do I need technical knowledge to understand the guides?",
    answer:
      "No. The content is written in simple language so non-technical readers can understand topics like SMTP, delivery reports and analytics.",
  },
  {
    question: "Where should a complete beginner start?",
    answer:
      "Start with the beginner learning cards and the learning path. That gives you a gentle progression from basics to more advanced topics.",
  },
  {
    question: "Can businesses really improve communication using email?",
    answer:
      "Yes. Email remains one of the most direct and reliable ways to reach customers, employees and partners when it is planned well.",
  },
  {
    question: "What is SMTP in simple words?",
    answer:
      "SMTP is the technology that sends your email from your system to the recipient's inbox. Think of it as the delivery system behind outgoing email.",
  },
  {
    question: "How do email campaigns work?",
    answer:
      "A campaign usually starts with a goal, followed by audience selection, writing, scheduling, sending and then reviewing performance data.",
  },
  {
    question: "How do I schedule emails in advance?",
    answer:
      "Scheduling lets you prepare an email now and set it to be sent automatically at a later date and time.",
  },
  {
    question: "What are email analytics and why do they matter?",
    answer:
      "Analytics show how recipients responded, including opens, clicks and delivery results. That helps you improve the next campaign.",
  },
  {
    question: "What is the difference between a regular email and a bulk email?",
    answer:
      "A regular email is usually sent to one person or a small group. A bulk email is sent to many recipients at once through a structured sending process.",
  },
  {
    question: "What is email broadcasting?",
    answer:
      "Email broadcasting is the process of sending one message, such as a newsletter or announcement, to many recipients at the same time.",
  },
  {
    question: "How do I write a good subject line?",
    answer:
      "A good subject line is short, clear and accurate. It should quickly tell the reader what the message is about.",
  },
  {
    question: "What are email templates and why should I use them?",
    answer:
      "Templates are reusable layouts that save time, keep emails on-brand and make your communication feel consistent.",
  },
  {
    question: "How often should a business send emails?",
    answer:
      "There is no fixed number. The best approach is to send relevant messages with a consistent and predictable rhythm.",
  },
  {
    question: "What is a delivery report and why is it important?",
    answer:
      "A delivery report shows whether an email reached the inbox, bounced or failed. It helps you spot issues quickly.",
  },
  {
    question: "How can HR teams use email communication effectively?",
    answer:
      "HR teams can use email for onboarding, policy updates, announcements and other internal communication that needs clarity and consistency.",
  },
  {
    question: "How can educational institutions use bulk email?",
    answer:
      "Schools, colleges and training institutes can use bulk email to share admissions updates, exam schedules, events and other notices.",
  },
  {
    question: "What email best practices should every business follow?",
    answer:
      "Keep subject lines clear, stay relevant, use professional templates, avoid misleading claims and review analytics to improve future sends.",
  },
  {
    question: "How do I get started with Altroz Bulk Email after learning the basics?",
    answer:
      "Once you are comfortable with the basics, explore the product pages, then book a free demo to see how the workflows fit your organisation.",
  },
];

const heroBullets = [
  "Explore practical guides on bulk email, SMTP, templates, scheduling and analytics.",
  "Learn in plain language with real business examples and clear next steps.",
  "Move from beginner concepts to confident campaign management at your own pace.",
];

export default function LearnPage() {
  const managedLearnResources = usePublishedContent("Learn Resource");
  const learnPageContent = usePublicContentRecord(ROUTES.learn, "Page");
  const learnHeroTitle =
    learnPageContent?.heroTitle ??
    "Learn Business Email Communication, Bulk Email & Campaign Management";
  const learnHeroDescription =
    learnPageContent?.heroDescription ??
    "Whether you are sending your first email campaign or managing communication for an entire organisation, this learning hub helps you understand business email the simple way. Explore practical guides on email broadcasting, campaign planning, SMTP, templates, scheduling and analytics.";
  const learnHeroSummary =
    learnPageContent?.summary ??
    "The content is written in plain language and grounded in real business examples so you can communicate better before you even open a piece of software.";
  const learnCtaTitle =
    learnPageContent?.ctaTitle ?? "Start Learning Business Email Communication Today";
  const learnCtaDescription =
    learnPageContent?.ctaDescription ??
    "Explore expert guides, practical tutorials and best practices to improve business communication with Altroz Bulk Email.";
  const learnCtaButtonText = learnPageContent?.ctaButtonText ?? "Start Learning";

  return (
    <div className="bulk-email-theme min-h-screen bg-gradient-to-b from-white via-[#f6faff] to-[#fff7ef]">
      <PageSEO
        title="Email Communication Guide | Learn Bulk Email, Campaigns & SMTP | Altroz Bulk Email"
        description="Explore a free learning hub for business email communication, bulk email, campaign planning, SMTP, templates, scheduling and analytics."
        canonicalPath={ROUTES.learn}
      />
      <style>{`
        @keyframes learnWordRise {
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
        <section className="hero-gradient learn-hero relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-[#1d4ed8]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-[#d97706]/10 blur-3xl" />

          <div className="site-container">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
                <ScrollReveal variant="fade-up" className="text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#1d4ed8]/20 bg-gradient-to-r from-white via-[#eff6ff] to-[#fff7ef] px-4 py-2 text-xs font-extrabold tracking-normal text-[#1d4ed8] shadow-sm">
                    <Sparkles className="h-3.5 w-3.5" />
                    Free Learning Hub
                  </div>

                  <AnimatedTitle
                    as="h1"
                    className="mx-auto mt-4 max-w-6xl text-4xl sm:text-5xl lg:mx-0 lg:text-[4.15rem]"
                  >
                    {learnHeroTitle}
                  </AnimatedTitle>

                  <h2 className="mx-auto mt-4 max-w-4xl text-2xl font-semibold tracking-tight text-[#1d4ed8] sm:text-3xl lg:mx-0">
                    Everything You Need to Master Professional Email Communication
                  </h2>

                  <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg lg:mx-0">
                    {learnHeroDescription}
                  </p>

                  <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg lg:mx-0">
                    {learnHeroSummary}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                    <Link to={ROUTES.bulkEmailBroadcast} className="btn-primary">
                      {learnCtaButtonText}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a href="#featured-guides" className="btn-outline">
                      Explore Articles
                    </a>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-ink-soft lg:justify-start">
                    <Link to={ROUTES.home} className="font-semibold text-[#1d4ed8] hover:underline">
                      Home
                    </Link>
                    <span>/</span>
                    <span className="font-semibold text-[#b45309]">Learn</span>
                  </div>

                  <ul className="mx-auto mt-5 max-w-3xl space-y-3 text-left text-sm leading-6 text-ink-soft lg:mx-0">
                    {heroBullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 rounded-2xl bg-white/75 px-4 py-3 shadow-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#d97706]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {heroHighlights.map((card, index) => (
                      <ScrollReveal key={card.title} variant="fade-up" delay={70 + index * 40}>
                        <MaybeLink
                          href={card.href}
                          className="soft-card flex h-full flex-col p-4 text-left transition-transform duration-300 hover:-translate-y-1"
                        >
                          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                            {card.icon}
                          </span>
                          <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                        </MaybeLink>
                      </ScrollReveal>
                    ))}
                  </div>
                </ScrollReveal>

                <ScrollReveal variant="scale" className="relative">
                  <LearningDashboardMock />
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        <ManagedContentShowcase
          eyebrow="Admin Managed Learn Resources"
          title="Published resources from the learning control panel"
          description="These cards are fed by the admin and SEO panel, so approved or published learning resources can appear on the public frontend without manual code edits."
          records={managedLearnResources}
        />

        <section id="featured-guides" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Featured Learning Guides"
              title="Start with the guides most people need first"
              description="These are the easiest entry points for someone new to business email communication or bulk email workflows."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {featuredGuides.map((guide) => (
                <MaybeLink
                  key={guide.title}
                  href={guide.href}
                  className="soft-card group flex h-full flex-col p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float"
                >
                  <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#b45309]">
                    <span>{guide.readingTime}</span>
                    <span>•</span>
                    <span>{guide.category}</span>
                    <span>•</span>
                    <span>{guide.difficulty}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{guide.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{guide.description}</p>
                  <div className="mt-auto pt-5 text-sm font-semibold text-[#1d4ed8]">
                    Read guide
                    <ArrowRight className="ml-1 inline-block h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </MaybeLink>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="what-you-can-learn" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="What You Can Learn"
              title="Eight core topics that build real email communication confidence"
              description="This section introduces the main learning themes covered across the hub and its linked resources."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {learnCards.map((card) => (
                <MaybeLink
                  key={card.title}
                  href={card.href}
                  className="soft-card group flex h-full flex-col p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm transition-transform duration-300 group-hover:scale-105">
                    {card.icon}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                </MaybeLink>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="learning-path" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Learning Path"
              title="A simple roadmap from beginner to confident campaign manager"
              description="Follow the path in order or jump to the step that matches your current stage."
              center
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {learningPaths.map((step, index) => (
                <ScrollReveal key={step.step} variant="fade-up" delay={index * 40}>
                  <MaybeLink
                    href={step.href}
                    className="soft-card relative flex h-full flex-col p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-gradient-to-r from-[#1d4ed8]/12 via-white to-[#d97706]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1d4ed8]">
                        {step.step}
                      </span>
                      <span className="rounded-full bg-surface px-2 py-1 text-[10px] font-semibold text-ink-soft">
                        {index + 1}/7
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{step.description}</p>
                    <div className="mt-auto pt-5 text-sm font-semibold text-[#1d4ed8]">
                      Explore step
                      <ArrowRight className="ml-1 inline-block h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </MaybeLink>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Popular Topics"
              title="Jump straight to the areas you care about most"
              description="These topic chips make it easy to scan, browse and move into the right guide quickly."
              center
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {popularTopics.map((topic, index) => (
                <ScrollReveal key={topic.title} variant="fade-up" delay={index * 30}>
                  <MaybeLink
                    href={topic.href}
                    className="soft-card group flex h-full flex-col p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] transition-transform duration-300 group-hover:scale-105">
                      {topic.icon}
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-ink">{topic.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{topic.description}</p>
                  </MaybeLink>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="who-should-learn" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Who Should Learn?"
              title="A hub for anyone who touches business email communication"
              description="Whether you are a solo founder or an enterprise team member, the hub gives you relevant starting points."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {audienceCards.map((card) => (
                <article key={card.title} className="soft-card group flex h-full flex-col p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] transition-transform duration-300 group-hover:scale-105">
                    {card.icon}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="resource-library" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Resource Library"
              title="Choose the learning format that suits you best"
              description="The library mixes beginner content, tutorials and future resources so the hub can grow with the audience."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {resourceLibrary.map((card, index) => (
                <article
                  key={card.title}
                  className="soft-card group flex h-full flex-col p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] transition-transform duration-300 group-hover:scale-105">
                    {card.icon}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                  <div className="mt-auto pt-4 text-xs font-bold uppercase tracking-[0.22em] text-[#b45309]">
                    {card.note}
                  </div>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="why-learn" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Why Learn with Altroz Bulk Email?"
              title="Learning content that is simple, practical and built for real teams"
              description="The hub is designed to help readers understand concepts quickly and then apply them in real work."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {whyCards.map((card) => (
                <article key={card.title} className="soft-card flex h-full flex-col p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8]">
                    {card.icon}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-white scroll-mt-24">
          <div className="site-container grid gap-6 lg:grid-cols-12 lg:items-start">
            <ScrollReveal variant="fade-up" className="lg:col-span-4">
              <SectionHeading
                eyebrow="Frequently Asked Questions"
                title="Quick answers for learners and search readers"
                description="These answers cover the page structure, the learning topics and how to move from learning into action."
              />

              <div className="soft-card mt-5 p-5">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#b45309]">
                  Ready to begin?
                </div>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  Start with the featured guides, then move through the learning path and product pages
                  as your confidence grows.
                </p>
                <div className="button-group mt-5">
                  <Link to={ROUTES.bulkEmailBroadcast} className="btn-primary">
                    Explore Articles
                  </Link>
                  <Link to={ROUTES.bookDemo} className="btn-outline">
                    Book Free Demo
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={80} className="lg:col-span-8">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={item.question}
                    value={`faq-${index}`}
                    className="overflow-hidden rounded-[1.25rem] border border-border bg-white px-4 shadow-card"
                  >
                    <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink no-underline hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pt-0 text-sm leading-6 text-ink-soft">
                      {item.answer}
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
                  {learnCtaTitle}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-white/80">
                  {learnCtaDescription}
                </p>
                <div className="button-group mt-7 justify-center">
                  <Link
                    to={ROUTES.bulkEmailBroadcast}
                    className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-[#1d4ed8] transition-colors hover:bg-[#fffbf4]"
                  >
                    {learnCtaButtonText}
                  </Link>
                  <Link
                    to={ROUTES.bookDemo}
                    className="inline-flex items-center rounded-lg border border-white/25 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    Book Free Demo
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
