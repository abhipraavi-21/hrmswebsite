"use client";

import { BookOpen, CalendarDays, Clock3, ChevronRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { ROUTES } from "@/routes/routeConfig.js";
import { getBlogPostBySlug } from "@/data/blogPosts";

function SectionCard({
  title,
  id,
  paragraphs,
  bullets,
  table,
}: {
  title: string;
  id: string;
  paragraphs: string[];
  bullets?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
}) {
  return (
    <section id={id}>
      <ScrollReveal className="rounded-[1.75rem] border border-border bg-white p-7 shadow-float sm:p-9">
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Article section</div>
        <h2 className="mt-4 text-2xl font-black tracking-tight text-ink sm:text-3xl">{title}</h2>
        <div className="mt-6 space-y-5 text-base leading-8 text-ink-soft">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {bullets && bullets.length > 0 ? (
          <ul className="mt-7 space-y-4 text-sm leading-7 text-ink-soft">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {table ? (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-primary-soft/30">
                <tr>
                  {table.headers.map((header) => (
                    <th key={header} className="border-b border-border px-4 py-3 font-bold text-ink">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td
                        key={`${row[0]}-${index}`}
                        className="border-b border-border px-4 py-3 text-ink-soft"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </ScrollReveal>
    </section>
  );
}

export default function BlogArticlePage() {
  const { slug } = useParams();
  const post = slug ? getBlogPostBySlug(slug) : null;

  if (!post) {
    return <Navigate to={ROUTES.blog} replace />;
  }

  const canonicalPath = post.href;
  const breadcrumbUrl = [
    { label: "Home", href: ROUTES.home },
    { label: "Blog", href: ROUTES.blog },
    { label: post.title, href: post.href },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    articleSection: post.category,
    mainEntityOfPage: new URL(post.href, window.location.origin).href,
    author: {
      "@type": "Organization",
      name: "Altroz HR Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Altroz HR",
    },
    keywords: post.heroPoints.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbUrl.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: new URL(item.href, window.location.origin).href,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(11,92,255,0.08),_transparent_34%),linear-gradient(180deg,_#ffffff_0%,_#f7fbff_100%)]">
      <PageSEO
        title={`${post.title} | Altroz HR Blog`}
        description={post.description}
        canonicalPath={canonicalPath}
        ogTitle={post.title}
        ogDescription={post.description}
      />
      <TopNavbar />
      <MainNavbar />

      <main className="overflow-x-hidden">
        <section className="py-10 sm:py-12 lg:py-14">
          <div className="site-container max-w-4xl">
            <ScrollReveal className="flex flex-col items-center space-y-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-primary shadow-sm">
                <BookOpen className="h-4 w-4" />
                {post.category}
              </div>
              <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-8 text-ink-soft sm:text-xl">
                {post.description}
              </p>
              <p className="mx-auto max-w-3xl text-base leading-7 text-ink-soft">{post.heroSummary}</p>

              <div className="flex flex-wrap justify-center gap-3 text-sm text-ink-soft">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 shadow-sm">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  Updated 2026
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 shadow-sm">
                  <Clock3 className="h-4 w-4 text-primary" />
                  Reading time: ~24 minutes
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <Link to={ROUTES.blog} className="btn-primary">
                  Back to Blog
                </Link>
                <Link to={ROUTES.bookDemo} className="btn-outline">
                  Book Free Demo
                </Link>
              </div>

              <div className="soft-card mx-auto max-w-3xl p-6 text-left sm:p-7">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Quick Answer
                </div>
                <p className="mt-3 text-base leading-7 text-ink-soft">{post.quickAnswer}</p>
              </div>

              <div className="mx-auto w-full max-w-3xl rounded-[1.5rem] border border-border bg-white p-5 text-left shadow-sm">
                <div className="text-sm font-bold text-ink">On this page</div>
                <nav className="mt-3 flex flex-wrap justify-center gap-3">
                  {post.sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/35 px-4 py-2 text-sm text-ink-soft transition-colors hover:border-primary/25 hover:text-primary"
                    >
                      <ChevronRight className="h-4 w-4 shrink-0" />
                      <span>{section.title}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-10 sm:py-12 lg:py-16">
          <div className="site-container max-w-4xl space-y-14 sm:space-y-16 lg:space-y-20">
            <StaggerReveal step={120}>
              {post.sections.map((section) => (
                <SectionCard
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  paragraphs={section.paragraphs}
                  bullets={section.bullets}
                  table={section.table}
                />
              ))}
            </StaggerReveal>

            <ScrollReveal className="rounded-[1.75rem] border border-border bg-white p-7 shadow-float sm:p-9">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                Frequently Asked Questions
              </div>
              <h2 className="mt-4 text-2xl font-black tracking-tight text-ink sm:text-3xl">
                Common questions about HRMS
              </h2>
              <Accordion type="single" collapsible className="mt-6 space-y-3">
                {post.faqs.map((item) => (
                  <AccordionItem
                    key={item.q}
                    value={item.q}
                    className="overflow-hidden rounded-[1.35rem] border border-border bg-surface/35 px-4 py-0"
                  >
                    <AccordionTrigger className="py-5 text-left text-base font-semibold text-ink hover:no-underline">
                      {item.q}
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

        <section className="pb-14 sm:pb-16 lg:pb-20">
          <div className="site-container">
            <ScrollReveal className="rounded-[1.75rem] border border-border bg-white p-7 shadow-float sm:p-9">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Related links
                  </div>
                  <h2 className="mt-4 text-2xl font-black tracking-tight text-ink sm:text-3xl">
                    Keep exploring related HR topics
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-ink-soft">
                    These pages connect the HRMS guide to the product areas it depends on most.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link to={ROUTES.hrmsHome} className="btn-primary">
                    Explore HR Solutions
                  </Link>
                  <Link to={ROUTES.contact} className="btn-outline">
                    Contact Us
                  </Link>
                </div>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {post.relatedLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="rounded-2xl border border-border bg-surface/35 p-5 transition-shadow hover:shadow-sm"
                  >
                    <div className="text-sm font-bold text-ink">{link.label}</div>
                    <p className="mt-1 text-sm leading-6 text-ink-soft">{link.description}</p>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Footer />
    </div>
  );
}
