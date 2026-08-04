"use client";

import { useState } from "react";
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
  Laptop2,
  Package,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/site/Footer";
import ManagedContentShowcase from "@/components/site/ManagedContentShowcase";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ROUTES } from "@/routes/routeConfig.js";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { usePublishedContent } from "@/site/PublicSiteDataContext";
import { faqPopularSearches, faqQuickLinks, faqSections } from "./faqData";

const pageTitle = "Altroz HR FAQs | Knowledge Base and Frequently Asked Questions";
const pageDescription =
  "Everything HR Managers, Business Owners, Startups, SMEs, Enterprises, Payroll Executives, Recruiters, and Operations Teams need to know about Altroz HR - the complete HR software for modern businesses.";

const totalQuestions = faqSections.reduce((sum, section) => sum + section.items.length, 0);

const sectionIconMap: Record<string, ReactNode> = {
  "General HR Software": <BookOpen className="h-5 w-5" />,
  "Employee Management": <Users className="h-5 w-5" />,
  "Attendance Management": <CalendarDays className="h-5 w-5" />,
  "Leave Management": <ClipboardList className="h-5 w-5" />,
  "Payroll Management": <Wallet className="h-5 w-5" />,
  Recruitment: <Search className="h-5 w-5" />,
  "Performance Management": <Target className="h-5 w-5" />,
  "Employee Self Service (ESS)": <Laptop2 className="h-5 w-5" />,
  "Asset Management": <Package className="h-5 w-5" />,
  "HR Automation": <Workflow className="h-5 w-5" />,
  "HR Analytics": <ChartColumn className="h-5 w-5" />,
  Compliance: <ShieldCheck className="h-5 w-5" />,
  "Employee Lifecycle & Exit Management": <DoorOpen className="h-5 w-5" />,
  "Implementation & Security": <Building2 className="h-5 w-5" />,
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getSectionIcon(title: string) {
  return sectionIconMap[title] ?? <Sparkles className="h-5 w-5" />;
}

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

export default function FaqPage() {
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState(faqSections[0]?.title ?? "");
  const managedFaqCollections = usePublishedContent("FAQ");
  const normalizedQuery = query.trim().toLowerCase();
  const activeSectionData =
    faqSections.find((section) => section.title === activeSection) ?? faqSections[0] ?? null;

  const visibleItems = activeSectionData
    ? activeSectionData.items.filter((item) => {
        if (!normalizedQuery) return true;

        const haystack = `${item.q} ${item.a}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      })
    : [];

  const visibleQuestions = visibleItems.length;

  function handleSectionSelect(sectionTitle: string) {
    setActiveSection(sectionTitle);
  }

  const origin = typeof window !== "undefined" ? window.location.origin : "https://www.altrozhr.com";
  const faqUrl = new URL(ROUTES.faq, origin).href;

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
        name: "FAQ",
        item: faqUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqSections.flatMap((section) =>
      section.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    ),
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(11,92,255,0.08),_transparent_36%),linear-gradient(180deg,_#ffffff_0%,_#f7fbff_100%)]">
      <PageSEO
        title={pageTitle}
        description={pageDescription}
        canonicalPath={ROUTES.faq}
        ogTitle="Altroz HR FAQs | Knowledge Base and Frequently Asked Questions"
        ogDescription={pageDescription}
      />
      <TopNavbar />
      <MainNavbar />

      <main className="overflow-x-hidden">
        <section className="py-14 sm:py-16 lg:py-20">
          <div className="site-container">
            <ScrollReveal className="mx-auto max-w-5xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-extrabold tracking-normal text-primary shadow-sm">
                <CircleHelp className="h-4 w-4" />
                Knowledge Base
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                How can we help you today?
              </h1>
              <p className="mx-auto mt-5 max-w-4xl text-lg leading-8 text-ink-soft sm:text-xl">
                Search our knowledge base or browse FAQs by category to get quick, clear answers
                about Altroz HR.
              </p>

              <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
                <label className="flex h-12 flex-1 items-center gap-3 rounded-full border border-border bg-white px-4 shadow-sm transition-shadow focus-within:shadow-[0_18px_40px_rgba(11,92,255,0.12)]">
                  <Search className="h-4 w-4 shrink-0 text-primary" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search FAQs — e.g. 'leave approval', 'payroll', 'GPS attendance'..."
                    aria-label="Search FAQs"
                    className="w-full border-0 bg-transparent p-0 text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none focus:ring-0"
                  />
                </label>
                <a href="#faq-sections" className="btn-primary justify-center sm:w-auto">
                  Browse Categories
                </a>
              </div>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <div className="rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm">
                  {faqSections.length} categories
                </div>
                <div className="rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm">
                  {totalQuestions} FAQs
                </div>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {faqPopularSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setQuery(item)}
                    className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-ink-soft shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <ManagedContentShowcase
          eyebrow="Admin Managed FAQ Collections"
          title="Published FAQ collections from the admin panel"
          description="The FAQ manager can update these collections in the admin workspace, and the public help center will surface the latest approved or published groups here."
          records={managedFaqCollections}
        />

        <section id="faq-sections" className="pb-16 sm:pb-20 lg:pb-24">
          <div className="site-container">
            <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start">
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <ScrollReveal className="soft-card p-5 transition-all duration-300">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                      Category Navigation
                    </div>
                    <h2 className="mt-2 text-xl font-black tracking-tight text-ink">Pick a topic</h2>
                    <p className="mt-2 text-sm leading-7 text-ink-soft">
                      Keep this list open while the right side updates to the topic you select.
                    </p>
                  </div>

                  <nav className="mt-5 space-y-2">
                    {faqSections.map((section) => {
                      const isActive = activeSection === section.title;
                      return (
                        <button
                          key={section.title}
                          type="button"
                          onClick={() => handleSectionSelect(section.title)}
                          className={`flex w-full items-center justify-between gap-3 rounded-2xl border bg-white px-4 py-3 text-left text-sm transition-all hover:border-primary/25 hover:text-primary ${
                            isActive
                              ? "border-primary/30 bg-primary-soft/50 shadow-[0_10px_24px_rgba(11,92,255,0.10)]"
                              : "border-border"
                          }`}
                        >
                          <span className="line-clamp-2 font-medium text-ink">{section.title}</span>
                          <span className="shrink-0 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-bold text-primary">
                            {section.items.length}
                          </span>
                        </button>
                      );
                    })}
                  </nav>
                </ScrollReveal>
              </aside>

              <div className="space-y-6">
                <ScrollReveal className="rounded-[2rem] border border-border bg-white p-5 shadow-float sm:p-6">
                  <div className="flex flex-col gap-3 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                        {activeSectionData ? "Selected Topic" : "FAQ Topics"}
                      </div>
                      <h2 className="mt-2 text-2xl font-black tracking-tight text-ink sm:text-3xl">
                        {activeSectionData?.title ?? "Browse FAQs"}
                      </h2>
                    </div>
                    <p className="max-w-2xl text-sm leading-7 text-ink-soft">
                      {normalizedQuery
                        ? `Showing ${visibleQuestions} matched FAQ${visibleQuestions === 1 ? "" : "s"} in this topic.`
                        : "The left side stays visible so you can switch topics while reading the FAQs on the right."}
                    </p>
                  </div>
                </ScrollReveal>

                {activeSectionData ? (
                  visibleItems.length > 0 ? (
                    <ScrollReveal className="soft-card p-5 sm:p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-start gap-4">
                          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                            {getSectionIcon(activeSectionData.title)}
                          </div>
                          <div>
                            <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                              {visibleItems.length} FAQ{visibleItems.length === 1 ? "" : "s"}
                            </div>
                            <h3 className="mt-2 text-2xl font-black tracking-tight text-ink">
                              {activeSectionData.title}
                            </h3>
                          </div>
                        </div>

                        <div className="rounded-full border border-border bg-surface/50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
                          Active topic
                        </div>
                      </div>

                      <div className="mt-6">
                        <Accordion type="single" collapsible className="space-y-3">
                          {visibleItems.map((item) => (
                            <AccordionItem
                              key={item.q}
                              value={item.q}
                              className="overflow-hidden rounded-[1.35rem] border border-border bg-white px-4"
                            >
                              <AccordionTrigger className="py-5 text-left text-base font-semibold text-ink hover:no-underline [&>svg]:text-primary">
                                {item.q}
                              </AccordionTrigger>
                              <AccordionContent className="pb-5 text-sm leading-7 text-ink-soft">
                                {item.a}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    </ScrollReveal>
                  ) : (
                    <ScrollReveal className="rounded-[2rem] border border-border bg-white p-8 text-center shadow-float">
                      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
                        <Search className="h-6 w-6" />
                      </div>
                      <h3 className="mt-5 text-2xl font-black tracking-tight text-ink">No matches found</h3>
                      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-ink-soft">
                        Try a different keyword, or clear the search to see every question in this
                        category.
                      </p>
                      <button
                        type="button"
                        onClick={() => setQuery("")}
                        className="btn-outline mt-6"
                      >
                        Clear Search
                      </button>
                    </ScrollReveal>
                  )
                ) : null}

                <ScrollReveal className="rounded-[2rem] border border-border bg-white p-6 shadow-float sm:p-8">
                  <div className="mx-auto max-w-5xl text-center">
                    <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                      Still have questions?
                    </div>
                    <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                      Our HR experts are here to help you choose the right modules for your business.
                    </h2>
                    <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-ink-soft">
                      Explore the right resources, compare topics, and jump into the pages that fit
                      your next step best.
                    </p>

                    <div className="mx-auto mt-8 grid w-full max-w-4xl gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      <Link to={ROUTES.bookDemo} className="btn-primary justify-center">
                        Book a Free Demo
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      {faqQuickLinks.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="btn-outline justify-center px-4 py-2 text-sm"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Footer />
    </div>
  );
}
