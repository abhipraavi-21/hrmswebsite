"use client";

import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  ChartColumn,
  CircleHelp,
  ClipboardList,
  DoorOpen,
  Factory,
  Laptop2,
  MapPinned,
  Package,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Wallet,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { usePublicContent } from "@/hooks/usePublicContent";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ROUTES } from "@/routes/routeConfig.js";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { getSection } from "@/services/cmsHelpers";
import { fetchResourcePage } from "@/services/resourceService";

const pageTitle = "HR Blog | Practical HR Articles & Software Insights - Altroz HR";
const pageDescription =
  "Read practical HR articles on attendance, payroll, leave, recruitment and performance management. Simple, actionable HR insights from Altroz HR.";

type HighlightCard = {
  title: string;
  description: string;
  icon: ReactNode;
  tag: string;
};

type CategoryCard = {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
};

type TopicChip = {
  label: string;
};

type FaqItem = {
  q: string;
  a: string;
};

const highlightCards: HighlightCard[] = [
  {
    title: "Latest Articles",
    description:
      "Fresh HR insights, product updates and workforce trends, published regularly for Indian businesses.",
    icon: <CalendarDays className="h-5 w-5" />,
    tag: "Fresh updates",
  },
  {
    title: "Expert HR Insights",
    description:
      "Practical knowledge on compliance, payroll, attendance and performance management, written in simple language.",
    icon: <Sparkles className="h-5 w-5" />,
    tag: "Simple guidance",
  },
  {
    title: "Practical Business Guides",
    description:
      "Step-by-step guides that help HR teams and founders solve everyday people-management challenges.",
    icon: <TrendingUp className="h-5 w-5" />,
    tag: "Actionable advice",
  },
];


const categoryCards: CategoryCard[] = [
  {
    title: "What is HRMS?",
    description:
      "A complete guide to HRMS for Indian businesses, with clear explanations of the core modules, benefits, implementation steps, and the difference between manual HR and software-driven HR.",
    icon: <BookOpen className="h-5 w-5" />,
    href: `${ROUTES.blog}/what-is-hrms`,
  },
  {
    title: "Attendance Management",
    description: "Guides on attendance tracking, GPS attendance, geo-fencing and shift management.",
    icon: <CalendarDays className="h-5 w-5" />,
    href: ROUTES.attendanceManagement,
  },
  {
    title: "Payroll",
    description: "Practical articles on payroll processing, salary structuring and payroll compliance.",
    icon: <Wallet className="h-5 w-5" />,
    href: ROUTES.payroll,
  },
  {
    title: "Leave Management",
    description: "Insights on leave policies, approvals and leave tracking for growing teams.",
    icon: <ClipboardList className="h-5 w-5" />,
    href: ROUTES.leaveManagement,
  },
  {
    title: "Recruitment",
    description: "Hiring guides, screening tips and recruitment workflow best practices.",
    icon: <Search className="h-5 w-5" />,
    href: ROUTES.recruitment,
  },
  {
    title: "Performance Management",
    description: "Articles on performance reviews, goal setting and employee growth.",
    icon: <Target className="h-5 w-5" />,
    href: ROUTES.performance,
  },
  {
    title: "Employee Self Service",
    description: "How ESS portals reduce HR workload and improve employee experience.",
    icon: <Laptop2 className="h-5 w-5" />,
    href: ROUTES.employeeSelfService,
  },
  {
    title: "Asset Management",
    description: "Guides on tracking company assets issued to employees.",
    icon: <Package className="h-5 w-5" />,
    href: ROUTES.assetManagement,
  },
  {
    title: "HR Automation",
    description: "Articles on automating repetitive HR tasks and approval workflows.",
    icon: <Workflow className="h-5 w-5" />,
    href: ROUTES.automation,
  },
  {
    title: "HR Analytics",
    description: "Insights on using HR data and reports to make better people decisions.",
    icon: <ChartColumn className="h-5 w-5" />,
    href: ROUTES.analytics,
  },
  {
    title: "Workforce Management",
    description: "Practical articles on scheduling, shift planning and workforce visibility.",
    icon: <Building2 className="h-5 w-5" />,
    href: ROUTES.workforce,
  },
  {
    title: "Employee Lifecycle",
    description: "Guides covering onboarding, transfers, promotions and exit management.",
    icon: <DoorOpen className="h-5 w-5" />,
    href: ROUTES.exitManagement,
  },
  {
    title: "Compliance",
    description: "Articles on labour law compliance and statutory HR requirements in India.",
    icon: <ShieldCheck className="h-5 w-5" />,
    href: ROUTES.complianceGuides,
  },
  {
    title: "HR Technology",
    description: "Insights on modern HR technology trends and digital transformation.",
    icon: <Sparkles className="h-5 w-5" />,
    href: ROUTES.learn,
  },
  {
    title: "Industry Insights",
    description: "Sector-specific HR articles for different types of Indian businesses.",
    icon: <Factory className="h-5 w-5" />,
    href: ROUTES.industrySolutions,
  },
  {
    title: "Remote Workforce",
    description: "Guides on managing remote and hybrid teams effectively.",
    icon: <MapPinned className="h-5 w-5" />,
    href: ROUTES.workforce,
  },
];

const trendingTopics: TopicChip[] = [
  { label: "HRMS" },
  { label: "Payroll" },
  { label: "Attendance" },
  { label: "Leave" },
  { label: "Recruitment" },
  { label: "Performance" },
  { label: "Employee Engagement" },
  { label: "Remote Work" },
  { label: "Automation" },
  { label: "Analytics" },
  { label: "Compliance" },
  { label: "AI in HR" },
  { label: "Hybrid Workforce" },
  { label: "Mobile HR" },
];

const faqItems: FaqItem[] = [
  {
    q: "Why should businesses read HR blogs?",
    a: "HR blogs help business owners and HR teams stay updated on best practices, compliance changes and practical ways to manage people better.",
  },
  {
    q: "What topics does the Altroz HR blog cover?",
    a: "The blog covers attendance, payroll, leave, recruitment, performance, employee management, compliance and HR technology topics.",
  },
  {
    q: "How often is the blog updated?",
    a: "The page is designed to scale to regular publishing, so new articles and practical guides can be added as the library grows.",
  },
  {
    q: "Can I move from blog articles to product pages?",
    a: "Yes. The blog is meant to educate first and then guide readers toward relevant Altroz HR pages when they want to explore solutions.",
  },
];

const origin = typeof window !== "undefined" ? window.location.origin : "https://www.altrozhr.com";
const blogUrl = new URL(ROUTES.blog, origin).href;

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Altroz HR Blog",
  url: blogUrl,
  description:
    "Practical HR articles, software insights and workforce management best practices from Altroz HR.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: new URL(ROUTES.home, origin).href,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: blogUrl,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <ScrollReveal className="mx-auto max-w-3xl text-center">
      <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">{eyebrow}</div>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">{description}</p>
    </ScrollReveal>
  );
}

export default function BlogPage() {
  const { data: remoteContent } = usePublicContent(() => fetchResourcePage("blog"));
  const heroSection = getSection(remoteContent, "blog-hero");
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(11,92,255,0.08),_transparent_34%),linear-gradient(180deg,_#ffffff_0%,_#f7fbff_100%)]">
      <PageSEO
        title={remoteContent?.metaTitle ?? pageTitle}
        description={remoteContent?.metaDescription ?? pageDescription}
        canonicalPath={ROUTES.blog}
        ogTitle="HR Blog - Practical Insights & Software Guides | Altroz HR"
        ogDescription={pageDescription}
      />
      <TopNavbar />
      <MainNavbar />

      <main className="overflow-x-hidden">
        <section className="py-14 sm:py-16 lg:py-20">
          <div className="site-container">
            <ScrollReveal className="mx-auto max-w-5xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-extrabold tracking-normal text-primary shadow-sm">
                <BookOpen className="h-4 w-4" />
                {heroSection?.subheading ?? "HR Blog by Altroz HR"}
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                {heroSection?.heading ??
                  "HR Blog - Practical Insights, Software Guides & Workforce Best Practices"}
              </h1>
              <p className="mx-auto mt-5 max-w-4xl text-lg leading-8 text-ink-soft sm:text-xl">
                {heroSection?.description ??
                  "Explore simple, practical articles on attendance, payroll, leave, recruitment, performance, and HR automation. Written for Indian businesses, startups, and growing teams who want to build better workplaces with the right HR knowledge and the right HR software."}
              </p>

              <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
                <label className="flex h-12 flex-1 items-center gap-3 rounded-full border border-border bg-white px-4 shadow-sm transition-shadow focus-within:shadow-[0_18px_40px_rgba(11,92,255,0.12)]">
                  <Search className="h-4 w-4 shrink-0 text-primary" />
                  <input
                    type="search"
                    placeholder="Search HR articles, guides and topics..."
                    aria-label="Search HR articles, guides and topics"
                    className="w-full border-0 bg-transparent p-0 text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none focus:ring-0"
                  />
                </label>
                <a href="#categories" className="btn-primary justify-center sm:w-auto">
                  Browse Articles
                </a>
              </div>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link to={ROUTES.bookDemo} className="btn-outline">
                  Book Free Demo
                </Link>
                <a href="#subscribe" className="btn-outline">
                  Subscribe to Updates
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-4">
          <div className="site-container">
            <ScrollReveal className="rounded-[2rem] border border-border bg-white/90 p-5 shadow-float sm:p-6">
              <div className="flex flex-col gap-3 text-center sm:text-left lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Highlight Cards
                  </div>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-ink sm:text-3xl">
                    Latest articles and practical guides
                  </h2>
                </div>
                <p className="max-w-2xl text-sm leading-7 text-ink-soft">
                  Fresh HR insights, product updates and business-friendly guidance, organised so
                  readers can quickly find the right topic and move naturally to the right Altroz
                  HR solution.
                </p>
              </div>

              <StaggerReveal className="mt-6 grid gap-4 md:grid-cols-3" step={90}>
                {highlightCards.map((card) => (
                  <article
                    key={card.title}
                    className="soft-card flex h-full min-h-[12rem] flex-col p-6 transition-transform duration-200 hover:-translate-y-1"
                  >
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                      {card.icon}
                    </div>
                    <div className="mt-5 text-[0.74rem] font-bold uppercase tracking-[0.24em] text-primary">
                      {card.tag}
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-ink">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-ink-soft">{card.description}</p>
                  </article>
                ))}
              </StaggerReveal>
            </ScrollReveal>
          </div>
        </section>

        <section id="categories" className="py-14 sm:py-16 lg:py-20">
          <div className="site-container">
            <SectionHeading
              eyebrow="Browse by Topics"
              title="Featured article and category cards built for easy blog navigation"
              description="The first card spotlights the new HRMS guide, and the remaining cards help readers jump into related HR topics quickly."
            />

            <StaggerReveal className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" step={55}>
              {categoryCards.map((card) => (
                card.href.startsWith("#") ? (
                  <a
                    key={card.title}
                    href={card.href}
                    className="group soft-card flex h-full min-h-[15.25rem] flex-col p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-float"
                  >
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary transition-transform duration-200 group-hover:scale-105">
                      {card.icon}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-ink-soft">{card.description}</p>
                    <div className="mt-auto pt-5">
                      <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-transform duration-200 group-hover:translate-x-0.5">
                        View Article
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </a>
                ) : (
                  <Link
                    key={card.title}
                    to={card.href}
                    className="group soft-card flex h-full min-h-[15.25rem] flex-col p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-float"
                  >
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary transition-transform duration-200 group-hover:scale-105">
                      {card.icon}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-ink-soft">{card.description}</p>
                    <div className="mt-auto pt-5">
                      <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-transform duration-200 group-hover:translate-x-0.5">
                        {card.title === "What is HRMS?" ? "Read Full Article" : "View Articles"}
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                )
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <div className="site-container">
            <SectionHeading
              eyebrow="Trending Topics"
              title="Quick topic chips for faster browsing"
              description="These chips keep the page scannable and help readers jump to the subjects they want most."
            />

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {trendingTopics.map((topic) => (
                <span
                  key={topic.label}
                  className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm transition-colors hover:border-primary/25 hover:text-primary"
                >
                  {topic.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="subscribe" className="py-14 sm:py-16 lg:py-20">
          <div className="site-container">
            <ScrollReveal className="rounded-[2rem] border border-border bg-white p-6 shadow-float sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Subscribe to Updates
                  </div>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                    Stay Updated with the Latest HR Insights
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
                    Subscribe to get practical HR articles, industry updates and product insights
                    delivered straight to your inbox.
                  </p>

                  <div className="mt-6 space-y-3 text-sm text-ink-soft">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                      <span>Latest HR news</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                      <span>New articles as soon as they are published</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                      <span>Industry updates</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                      <span>Product insights from Altroz HR</span>
                    </div>
                  </div>
                </div>

                <form
                  className="soft-card p-5 sm:p-6"
                  onSubmit={(event) => {
                    event.preventDefault();
                  }}
                >
                  <label className="block text-sm font-semibold text-ink">
                    Email Subscription Form
                  </label>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      aria-label="Enter your email address"
                      className="h-12 flex-1 rounded-full border border-border bg-white px-4 text-sm text-ink outline-none transition-shadow placeholder:text-ink-soft/70 focus:border-primary/30 focus:shadow-[0_12px_30px_rgba(11,92,255,0.12)]"
                    />
                    <button type="submit" className="btn-primary justify-center sm:px-5">
                      Subscribe Now
                    </button>
                  </div>
                  <p className="mt-4 text-xs leading-6 text-ink-soft">
                    Stay informed with educational HR content, not clutter. You can use the blog
                    to learn first and then explore the right solution pages when needed.
                  </p>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <div className="site-container">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="Questions readers ask before using the blog"
              description="Quick answers about the blog structure, article topics, publishing rhythm and how the page connects to Altroz HR product pages."
            />

            <ScrollReveal className="mx-auto mt-10 max-w-5xl rounded-[2rem] border border-border bg-white p-4 shadow-float sm:p-6">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item) => (
                  <AccordionItem
                    key={item.q}
                    value={item.q}
                    className="overflow-hidden rounded-[1.35rem] border border-border bg-surface/35 px-4 py-0"
                  >
                    <AccordionTrigger className="py-5 text-left text-base font-semibold text-ink hover:no-underline">
                      <span className="inline-flex items-center gap-3">
                        <CircleHelp className="h-5 w-5 text-primary" />
                        {item.q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-7 text-ink-soft">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <div className="site-container">
            <ScrollReveal className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Final CTA
                  </div>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                    Ready to Simplify HR for Your Business?
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-ink-soft">
                    Explore how Altroz HR can help you manage attendance, payroll, leave,
                    recruitment and performance - all from one simple platform.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Link to={ROUTES.hrmsHome} className="btn-primary">
                    Explore HR Solutions
                  </Link>
                  <Link to={ROUTES.bookDemo} className="btn-outline">
                    Book Free Demo
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Footer />
    </div>
  );
}
