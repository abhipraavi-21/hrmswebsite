"use client";

import { BookOpen, CalendarDays, ChevronRight, Clock3, UserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { fetchPublicBlog, fetchPublicBlogs, type BlogRecord } from "@/lib/blogApi";
import { ROUTES } from "@/routes/routeConfig.js";

function formatDate(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? value
    : parsed.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
}

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
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
          Article section
        </div>
        <h2 className="mt-4 text-2xl font-black tracking-tight text-ink sm:text-3xl">{title}</h2>
        <div className="mt-6 space-y-5 text-base leading-8 text-ink-soft">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {bullets?.length ? (
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
  const [post, setPost] = useState<BlogRecord | null>(null);
  const [allPosts, setAllPosts] = useState<BlogRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }

    let mounted = true;

    async function loadPost() {
      try {
        const [blogPost, posts] = await Promise.all([fetchPublicBlog(slug), fetchPublicBlogs()]);
        if (mounted) {
          setPost(blogPost);
          setAllPosts(posts);
          setError("");
          setNotFound(false);
        }
      } catch (requestError) {
        if (mounted) {
          const message =
            requestError instanceof Error ? requestError.message : "Unable to load the article.";
          if (/not found/i.test(message)) {
            setNotFound(true);
          } else {
            setError(message);
          }
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadPost();

    return () => {
      mounted = false;
    };
  }, [slug]);

  const adjacent = useMemo(() => {
    if (!post) {
      return { previous: null, next: null };
    }

    const index = allPosts.findIndex((item) => item.slug === post.slug);
    return {
      previous: index >= 0 ? allPosts[index + 1] ?? null : null,
      next: index >= 0 ? allPosts[index - 1] ?? null : null,
    };
  }, [allPosts, post]);

  if (notFound) {
    return <Navigate to={ROUTES.blog} replace />;
  }

  if (isLoading || !post) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(11,92,255,0.08),_transparent_34%),linear-gradient(180deg,_#ffffff_0%,_#f7fbff_100%)]">
        <TopNavbar />
        <MainNavbar />
        <main className="site-container py-20">
          <div className="rounded-[2rem] border border-border bg-white p-10 text-center shadow-float">
            <h1 className="text-2xl font-bold text-ink">
              {error ? "Article unavailable" : "Loading article..."}
            </h1>
            <p className="mt-3 text-sm leading-7 text-ink-soft">
              {error || "Fetching the latest published article data from MySQL."}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
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
    headline: post.metaTitle || post.title,
    description: post.description,
    articleSection: post.category,
    datePublished: post.publishDate,
    dateModified: post.updatedDate,
    image: post.featuredImage,
    mainEntityOfPage: new URL(post.href, window.location.origin).href,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Altroz HR",
    },
    keywords: post.tags.join(", "),
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
        title={`${post.metaTitle || post.title} | Altroz HR Blog`}
        description={post.ogDescription || post.description}
        canonicalPath={canonicalPath}
        ogTitle={post.ogTitle || post.title}
        ogDescription={post.ogDescription || post.description}
      />
      <TopNavbar />
      <MainNavbar />

      <main className="overflow-x-hidden">
        <section className="py-10 sm:py-12 lg:py-14">
          <div className="site-container max-w-5xl">
            <ScrollReveal className="space-y-8">
              <div className="flex flex-wrap items-center gap-3 text-sm text-ink-soft">
                <Link to={ROUTES.blog} className="inline-flex items-center gap-2 font-medium text-primary">
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  Back to Blog
                </Link>
                <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  {post.category}
                </span>
              </div>

              <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-float">
                  <div className="aspect-[16/11] overflow-hidden bg-slate-100">
                    <img
                      src={post.featuredImage}
                      alt={post.featuredImageAlt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div>
                  <h1 className="text-4xl font-black tracking-tight text-ink sm:text-5xl">
                    {post.title}
                  </h1>
                  <p className="mt-5 text-lg leading-8 text-ink-soft">{post.description}</p>
                  <p className="mt-5 text-base leading-7 text-ink-soft">{post.heroSummary}</p>

                  <div className="mt-6 flex flex-wrap gap-3 text-sm text-ink-soft">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 shadow-sm">
                      <UserRound className="h-4 w-4 text-primary" />
                      {post.author}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 shadow-sm">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      Published {formatDate(post.publishDate)}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 shadow-sm">
                      <Clock3 className="h-4 w-4 text-primary" />
                      {post.readingTime}
                    </span>
                  </div>

                  <div className="mt-4 text-sm text-ink-soft">
                    Last updated on {formatDate(post.updatedDate)}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-surface/35 px-3 py-1 text-xs font-medium text-ink-soft"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="soft-card p-6 text-left">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Quick answer
                  </div>
                  <p className="mt-3 text-base leading-7 text-ink-soft">{post.quickAnswer}</p>
                </div>

                <div className="rounded-[1.5rem] border border-border bg-white p-5 shadow-sm">
                  <div className="text-sm font-bold text-ink">On this page</div>
                  <nav className="mt-3 flex flex-wrap gap-3">
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
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-10 sm:py-12 lg:py-16">
          <div className="site-container max-w-4xl space-y-14 sm:space-y-16 lg:space-y-20">
            <ScrollReveal className="rounded-[1.75rem] border border-border bg-white p-7 shadow-float sm:p-9">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                Key takeaways
              </div>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-ink-soft">
                {post.keyTakeaways.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <StaggerReveal step={110}>
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
                Frequently asked questions
              </div>
              <h2 className="mt-4 text-2xl font-black tracking-tight text-ink sm:text-3xl">
                Common questions about this topic
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
                    These pages connect the article to relevant product, guide, and conversion
                    journeys across the Altroz HR site.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link to={ROUTES.hrmsHome} className="btn-primary">
                    Explore HR Solutions
                  </Link>
                  <Link to={ROUTES.bookDemo} className="btn-outline">
                    Book Free Demo
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

        {adjacent.previous || adjacent.next ? (
          <section className="pb-16">
            <div className="site-container">
              <ScrollReveal className="rounded-[2rem] border border-border bg-white p-6 shadow-float sm:p-8">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Continue reading
                </div>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                  Previous and next articles
                </h2>
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  {adjacent.previous ? (
                    <Link
                      to={adjacent.previous.href}
                      className="rounded-[1.5rem] border border-border bg-surface/35 p-5 transition-shadow hover:shadow-sm"
                    >
                      <div className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                        Previous article
                      </div>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                        <BookOpen className="h-3.5 w-3.5" />
                        {adjacent.previous.category}
                      </div>
                      <h3 className="mt-4 text-xl font-bold text-ink">{adjacent.previous.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-ink-soft">
                        {adjacent.previous.description}
                      </p>
                    </Link>
                  ) : (
                    <div />
                  )}

                  {adjacent.next ? (
                    <Link
                      to={adjacent.next.href}
                      className="rounded-[1.5rem] border border-border bg-surface/35 p-5 transition-shadow hover:shadow-sm"
                    >
                      <div className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                        Next article
                      </div>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                        <BookOpen className="h-3.5 w-3.5" />
                        {adjacent.next.category}
                      </div>
                      <h3 className="mt-4 text-xl font-bold text-ink">{adjacent.next.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-ink-soft">{adjacent.next.description}</p>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </ScrollReveal>
            </div>
          </section>
        ) : null}
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
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
