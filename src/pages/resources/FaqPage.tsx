"use client";

import { useEffect, useMemo, useState } from "react";
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
  QrCode,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import BulkEmailNavbar from "@/components/site/BulkEmailNavbar";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import { resolveSiteUrl } from "@/lib/siteUrl";
import TopNavbar from "@/components/site/TopNavbar";
import { usePublicContent } from "@/hooks/usePublicContent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ROUTES } from "@/routes/routeConfig.js";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { faqPopularSearches, faqQuickLinks, faqSections } from "./faqData";
import { getSection, getSectionItems } from "@/services/cmsHelpers";
import { fetchPageByKey } from "@/services/pageService";
import { getSeedPageFallback } from "@/services/seedFallback";
import type { PublicCmsPage } from "@/services/cmsTypes";
import { cn } from "@/lib/utils";

const DEFAULT_PAGE_TITLE = "Altroz HR FAQs | Knowledge Base and Frequently Asked Questions";
const DEFAULT_PAGE_DESCRIPTION =
  "Everything HR Managers, Business Owners, Startups, SMEs, Enterprises, Payroll Executives, Recruiters, and Operations Teams need to know about Altroz HR - the complete HR software for modern businesses.";
const DEFAULT_HERO_DESCRIPTION =
  "Search our knowledge base or browse FAQs by category to get quick, clear answers about Altroz HR.";
const DEFAULT_SEARCH_PLACEHOLDER =
  "Search FAQs - e.g. 'leave approval', 'payroll', 'GPS attendance'...";
const DEFAULT_CTA_HEADING =
  "Our HR experts are here to help you choose the right modules for your business.";
const DEFAULT_CTA_DESCRIPTION =
  "Explore the right resources, compare topics, and jump into the pages that fit your next step best.";

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
  "General Asset Management FAQs": <BookOpen className="h-5 w-5" />,
  "Altroz Asset Management FAQs": <Package className="h-5 w-5" />,
  "Asset Tracking FAQs": <Search className="h-5 w-5" />,
  "QR Code Asset Management FAQs": <QrCode className="h-5 w-5" />,
  "Asset Maintenance FAQs": <Workflow className="h-5 w-5" />,
  "Asset Reports FAQs": <ChartColumn className="h-5 w-5" />,
  "Asset Dashboard FAQs": <Building2 className="h-5 w-5" />,
  "IT Asset Management FAQs": <Laptop2 className="h-5 w-5" />,
  "Manufacturing Asset Management FAQs": <Building2 className="h-5 w-5" />,
  "Asset Assignment FAQs": <Users className="h-5 w-5" />,
  "Warranty & Service FAQs": <ShieldCheck className="h-5 w-5" />,
  "Security & Access FAQs": <ShieldCheck className="h-5 w-5" />,
  "Implementation & Support FAQs": <Workflow className="h-5 w-5" />,
  "Pricing & Demo FAQs": <Wallet className="h-5 w-5" />,
};

type FaqEntry = {
  q: string;
  a: string;
};

type FaqSectionView = {
  title: string;
  description?: string;
  items: FaqEntry[];
  ctaText?: string | null;
  ctaLink?: string | null;
};

type QuickLink = {
  label: string;
  href: string;
};

type FaqPageConfig = {
  pageKey: string;
  canonicalPath: string;
  fallbackPopularSearches: string[];
  fallbackQuickLinks: QuickLink[];
};

const FALLBACK_FAQ_SECTIONS: FaqSectionView[] = faqSections.map((section) => ({
  title: section.title,
  items: section.items,
}));

const FAQ_PAGE_CONFIGS: Record<
  "default" | "hrms" | "bulkEmail" | "assetManagement",
  FaqPageConfig
> = {
  default: {
    pageKey: "hrms-resource-faq",
    canonicalPath: ROUTES.hrmsFaq,
    fallbackPopularSearches: faqPopularSearches,
    fallbackQuickLinks: faqQuickLinks,
  },
  hrms: {
    pageKey: "hrms-resource-faq",
    canonicalPath: ROUTES.hrmsFaq,
    fallbackPopularSearches: faqPopularSearches,
    fallbackQuickLinks: faqQuickLinks,
  },
  bulkEmail: {
    pageKey: "bulk-email-resource-faq",
    canonicalPath: ROUTES.bulkEmailFaq,
    fallbackPopularSearches: [
      "What is bulk email?",
      "How does SMTP work?",
      "Can I schedule campaigns?",
    ],
    fallbackQuickLinks: [
      { label: "Learn", href: ROUTES.bulkEmailLearn },
      { label: "Blog", href: ROUTES.bulkEmailBlog },
      { label: "FAQs", href: ROUTES.bulkEmailFaq },
      { label: "Help Center", href: ROUTES.support },
    ],
  },
  assetManagement: {
    pageKey: "asset-management-resource-faq",
    canonicalPath: ROUTES.assetManagementFaq,
    fallbackPopularSearches: [
      "What is an asset register?",
      "How do handovers work?",
      "Can I track maintenance?",
    ],
    fallbackQuickLinks: [
      { label: "Learn", href: ROUTES.assetManagementLearn },
      { label: "Blog", href: ROUTES.assetManagementBlog },
      { label: "FAQs", href: ROUTES.assetManagementFaq },
      { label: "Help Center", href: ROUTES.support },
    ],
  },
};

function resolveFaqPageConfig(pathname: string) {
  if (pathname.startsWith(ROUTES.bulkEmailFaq)) {
    return FAQ_PAGE_CONFIGS.bulkEmail;
  }

  if (pathname.startsWith(ROUTES.assetManagementFaq)) {
    return FAQ_PAGE_CONFIGS.assetManagement;
  }

  if (pathname.startsWith(ROUTES.hrmsFaq)) {
    return FAQ_PAGE_CONFIGS.hrms;
  }

  return FAQ_PAGE_CONFIGS.default;
}

function buildCmsFaqSections(page: PublicCmsPage | null | undefined): FaqSectionView[] {
  return (
    page?.sections
      .filter((section) => section.sectionType === "faq")
      .map((section) => ({
        title:
          section.heading?.trim() ||
          section.internalName?.trim() ||
          section.subheading?.trim() ||
          "Frequently Asked Questions",
        description: section.description?.trim() || "",
        ctaText: section.buttonText ?? null,
        ctaLink: section.buttonLink ?? null,
        items: getSectionItems(section, "faq")
          .map((item) => ({
            q: item.title?.trim() || "",
            a: item.description?.trim() || "",
          }))
          .filter((item) => item.q && item.a),
      }))
      .filter((section) => section.items.length > 0) ?? []
  );
}

function getStringArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const items = value.filter(
    (item): item is string => typeof item === "string" && item.trim().length > 0,
  );
  return items.length > 0 ? items : fallback;
}

function getSectionIcon(title: string) {
  return sectionIconMap[title] ?? <Sparkles className="h-5 w-5" />;
}

function ActionLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  if (!href || href.startsWith("#")) {
    return (
      <a href={href || "#"} className={className}>
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

export default function FaqPage() {
  const location = useLocation();
  const pageConfig = resolveFaqPageConfig(location.pathname);
  const isBulkEmailFaq = location.pathname.startsWith(ROUTES.bulkEmailFaq);
  const seedContent = useMemo(() => getSeedPageFallback(pageConfig.pageKey), [pageConfig.pageKey]);
  const { data: remoteContent } = usePublicContent(
    () => fetchPageByKey(pageConfig.pageKey),
    [pageConfig.pageKey],
    seedContent,
  );
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState("");

  const heroSection = getSection(remoteContent, "hero") ?? getSection(remoteContent, "faq-hero");
  const quickLinksSection = getSection(remoteContent, "faq-quick-links");
  const finalCtaSection = getSection(remoteContent, "faq-final-cta");
  const cmsFaqSections = useMemo(() => buildCmsFaqSections(remoteContent), [remoteContent]);
  const effectiveSections = useMemo(() => {
    if (cmsFaqSections.length > 0) {
      return cmsFaqSections;
    }

    return pageConfig.pageKey === FAQ_PAGE_CONFIGS.default.pageKey ? FALLBACK_FAQ_SECTIONS : [];
  }, [cmsFaqSections, pageConfig.pageKey]);
  const activeSectionData =
    effectiveSections.find((section) => section.title === activeSection) ??
    effectiveSections[0] ??
    null;
  const normalizedQuery = query.trim().toLowerCase();
  const visibleItems = activeSectionData
    ? activeSectionData.items.filter((item) => {
        if (!normalizedQuery) {
          return true;
        }

        const haystack = `${item.q} ${item.a}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      })
    : [];
  const visibleQuestions = visibleItems.length;
  const totalQuestions = effectiveSections.reduce((sum, section) => sum + section.items.length, 0);
  const totalCategories = effectiveSections.length;
  const popularSearches = getStringArray(
    heroSection?.settings?.popularSearches,
    pageConfig.fallbackPopularSearches,
  );
  const quickLinks =
    getSectionItems(quickLinksSection, "quick_link")
      .map((item) => ({
        label: item.title?.trim() || "",
        href: item.buttonLink?.trim() || "",
      }))
      .filter((item) => item.label && item.href) ?? [];
  const heroBadgeText = heroSection?.subheading ?? "Knowledge Base";
  const heroTitle = heroSection?.heading ?? "How can we help you today?";
  const heroDescription = heroSection?.description ?? DEFAULT_HERO_DESCRIPTION;
  const heroSearchPlaceholder =
    typeof heroSection?.settings?.placeholderText === "string"
      ? heroSection.settings.placeholderText
      : DEFAULT_SEARCH_PLACEHOLDER;
  const heroButtonText = heroSection?.buttonText ?? "Browse Categories";
  const heroButtonLink = heroSection?.buttonLink ?? "#faq-sections";
  const heroSecondaryButtonText =
    typeof heroSection?.settings?.secondaryButtonText === "string"
      ? heroSection.settings.secondaryButtonText
      : "";
  const heroSecondaryButtonLink =
    typeof heroSection?.settings?.secondaryButtonLink === "string"
      ? heroSection.settings.secondaryButtonLink
      : ROUTES.assetManagementHome;
  const ctaHeading = quickLinksSection?.heading ?? DEFAULT_CTA_HEADING;
  const ctaDescription = quickLinksSection?.description ?? DEFAULT_CTA_DESCRIPTION;
  const ctaButtonText =
    quickLinksSection?.buttonText ?? activeSectionData?.ctaText ?? "Book a Free Demo";
  const ctaButtonLink =
    quickLinksSection?.buttonLink ?? activeSectionData?.ctaLink ?? ROUTES.bookDemo;
  const finalCtaSecondaryButtonText =
    typeof finalCtaSection?.settings?.secondaryButtonText === "string"
      ? finalCtaSection.settings.secondaryButtonText
      : "";
  const finalCtaSecondaryButtonLink =
    typeof finalCtaSection?.settings?.secondaryButtonLink === "string"
      ? finalCtaSection.settings.secondaryButtonLink
      : ROUTES.assetManagementContact;
  const seoTitle = remoteContent?.metaTitle ?? DEFAULT_PAGE_TITLE;
  const seoDescription = remoteContent?.metaDescription ?? DEFAULT_PAGE_DESCRIPTION;
  const seoOgTitle = remoteContent?.ogTitle ?? seoTitle;
  const seoOgDescription = remoteContent?.ogDescription ?? seoDescription;
  const faqUrl = resolveSiteUrl(remoteContent?.canonicalUrl ?? pageConfig.canonicalPath);

  useEffect(() => {
    const firstSectionTitle = effectiveSections[0]?.title ?? "";

    if (!firstSectionTitle) {
      setActiveSection("");
      return;
    }

    if (!effectiveSections.some((section) => section.title === activeSection)) {
      setActiveSection(firstSectionTitle);
    }
  }, [effectiveSections, activeSection]);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: resolveSiteUrl(ROUTES.home),
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
    mainEntity: effectiveSections.flatMap((section) =>
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
    <div
      className={cn(
        "min-h-screen",
        isBulkEmailFaq
          ? "bulk-email-theme bg-gradient-to-b from-white via-[#f6faff] to-[#fff7ef]"
          : "asset-management-theme asset-management-theme-shell",
      )}
    >
      <PageSEO
        title={seoTitle}
        description={seoDescription}
        canonicalPath={remoteContent?.canonicalUrl ?? pageConfig.canonicalPath}
        ogTitle={seoOgTitle}
        ogDescription={seoOgDescription}
        image={remoteContent?.ogImage ?? undefined}
        imageAlt={remoteContent?.ogImageAlt ?? undefined}
      />
      {isBulkEmailFaq ? (
        <BulkEmailNavbar />
      ) : (
        <>
          <TopNavbar />
          <MainNavbar />
        </>
      )}

      <main className="overflow-x-hidden">
        <section className="py-14 sm:py-16 lg:py-20">
          <div className="site-container">
            <ScrollReveal className="mx-auto max-w-5xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-extrabold tracking-normal text-primary shadow-sm">
                <CircleHelp className="h-4 w-4" />
                {heroBadgeText}
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                {heroTitle}
              </h1>
              <p className="mx-auto mt-5 max-w-4xl text-lg leading-8 text-ink-soft sm:text-xl">
                {heroDescription}
              </p>

              <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
                <label className="flex h-12 flex-1 items-center gap-3 rounded-full border border-border bg-white px-4 shadow-sm transition-shadow focus-within:shadow-[0_18px_40px_rgba(30,79,209,0.12)]">
                  <Search className="h-4 w-4 shrink-0 text-primary" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={heroSearchPlaceholder}
                    aria-label="Search FAQs"
                    className="w-full border-0 bg-transparent p-0 text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none focus:ring-0"
                  />
                </label>
                <ActionLink href={heroButtonLink} className="btn-primary justify-center sm:w-auto">
                  {heroButtonText}
                </ActionLink>
                {heroSecondaryButtonText ? (
                  <ActionLink
                    href={heroSecondaryButtonLink}
                    className="btn-outline justify-center sm:w-auto"
                  >
                    {heroSecondaryButtonText}
                  </ActionLink>
                ) : null}
              </div>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <div className="rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm">
                  {totalCategories} categories
                </div>
                <div className="rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm">
                  {totalQuestions} FAQs
                </div>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {popularSearches.map((item) => (
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

        <section id="faq-sections" className="pb-16 sm:pb-20 lg:pb-24">
          <div className="site-container">
            <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start">
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <ScrollReveal className="soft-card p-5 transition-all duration-300">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                      Category Navigation
                    </div>
                    <h2 className="mt-2 text-xl font-black tracking-tight text-ink">
                      Pick a topic
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-ink-soft">
                      Keep this list open while the right side updates to the topic you select.
                    </p>
                  </div>

                  <nav className="mt-5 space-y-2">
                    {effectiveSections.map((section) => {
                      const isActive = activeSection === section.title;

                      return (
                        <button
                          key={section.title}
                          type="button"
                          onClick={() => setActiveSection(section.title)}
                          className={`flex w-full items-center justify-between gap-3 rounded-2xl border bg-white px-4 py-3 text-left text-sm transition-all hover:border-primary/25 hover:text-primary ${
                            isActive
                              ? "border-primary/30 bg-primary-soft/50 shadow-[0_10px_24px_rgba(30,79,209,0.10)]"
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
                      {activeSectionData?.description ? (
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-soft">
                          {activeSectionData.description}
                        </p>
                      ) : null}
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

                      {activeSectionData.ctaText && activeSectionData.ctaLink ? (
                        <div className="mt-6 flex justify-end">
                          <ActionLink
                            href={activeSectionData.ctaLink}
                            className="btn-outline justify-center"
                          >
                            {activeSectionData.ctaText}
                            <ArrowRight className="h-4 w-4" />
                          </ActionLink>
                        </div>
                      ) : null}
                    </ScrollReveal>
                  ) : (
                    <ScrollReveal className="rounded-[2rem] border border-border bg-white p-8 text-center shadow-float">
                      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
                        <Search className="h-6 w-6" />
                      </div>
                      <h3 className="mt-5 text-2xl font-black tracking-tight text-ink">
                        No matches found
                      </h3>
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
                ) : (
                  <ScrollReveal className="rounded-[2rem] border border-border bg-white p-8 text-center shadow-float">
                    <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
                      <CircleHelp className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-2xl font-black tracking-tight text-ink">
                      No FAQ topics are available yet
                    </h3>
                    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-ink-soft">
                      Add at least one FAQ section with question items in the admin panel to publish
                      this page content.
                    </p>
                  </ScrollReveal>
                )}

                <ScrollReveal className="rounded-[2rem] border border-border bg-white p-6 shadow-float sm:p-8">
                  <div className="mx-auto max-w-5xl text-center">
                    <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                      Still have questions?
                    </div>
                    <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                      {ctaHeading}
                    </h2>
                    <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-ink-soft">
                      {ctaDescription}
                    </p>

                    <div className="mx-auto mt-8 grid w-full max-w-4xl gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      <ActionLink href={ctaButtonLink} className="btn-primary justify-center">
                        {ctaButtonText}
                        <ArrowRight className="h-4 w-4" />
                      </ActionLink>
                      {(quickLinks.length > 0 ? quickLinks : pageConfig.fallbackQuickLinks).map(
                        (item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            className="btn-outline justify-center px-4 py-2 text-sm"
                          >
                            {item.label}
                          </Link>
                        ),
                      )}
                    </div>
                  </div>
                </ScrollReveal>

                {finalCtaSection ? (
                  <ScrollReveal className="asset-management-cta-panel overflow-hidden rounded-[2.25rem] border border-primary/15 p-8 text-white shadow-float sm:p-10">
                    <div className="mx-auto max-w-4xl text-center">
                      {finalCtaSection.subheading ? (
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-white/75">
                          {finalCtaSection.subheading}
                        </div>
                      ) : null}
                      <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                        {finalCtaSection.heading}
                      </h2>
                      {finalCtaSection.description ? (
                        <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/80">
                          {finalCtaSection.description}
                        </p>
                      ) : null}

                      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <ActionLink
                          href={finalCtaSection.buttonLink ?? ROUTES.bookDemo}
                          className="btn-primary justify-center bg-white text-primary hover:bg-white/90"
                        >
                          {finalCtaSection.buttonText ?? "Book a Demo"}
                          <ArrowRight className="h-4 w-4" />
                        </ActionLink>
                        {finalCtaSecondaryButtonText ? (
                          <ActionLink
                            href={finalCtaSecondaryButtonLink}
                            className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-full border border-white/35 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
                          >
                            {finalCtaSecondaryButtonText}
                          </ActionLink>
                        ) : null}
                      </div>
                    </div>
                  </ScrollReveal>
                ) : null}
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
