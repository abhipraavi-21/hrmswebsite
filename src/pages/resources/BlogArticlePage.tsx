"use client";

import { useMemo } from "react";
import { ArrowLeft, ArrowRight, Building2, CalendarDays, Clock3, Mail, Phone } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import AssetManagementNavbar from "@/components/site/AssetManagementNavbar";
import BulkEmailNavbar from "@/components/site/BulkEmailNavbar";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { resolveSiteUrl } from "@/lib/siteUrl";
import { cn } from "@/lib/utils";
import { usePublicContent } from "@/hooks/usePublicContent";
import { isExternalHref, ROUTES } from "@/routes/routeConfig.js";
import { fetchPublicBlogPost } from "@/services/blogService";
import { getSeedBlogPostFallback } from "@/services/seedFallback";
import {
  BLOG_GROUP_PAGE_CONTENT,
  FALLBACK_BLOG_IMAGE,
  formatBlogDate,
  resolveBlogGroupFromPath,
  resolveBlogListingPath,
  resolveBlogPostPath,
  stripHtmlToText,
} from "./blogUtils";

function BlogChrome({ blogGroup }: { blogGroup: ReturnType<typeof resolveBlogGroupFromPath> }) {
  if (blogGroup === "bulk-email") {
    return <BulkEmailNavbar />;
  }

  if (blogGroup === "asset-management") {
    return <AssetManagementNavbar />;
  }

  return (
    <>
      <TopNavbar />
      <MainNavbar />
    </>
  );
}

function SafeRichText({
  html,
  className,
}: {
  html?: string | null;
  className: string;
}) {
  if (!html) {
    return null;
  }

  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function RelatedLinkItem({
  href,
  label,
  description,
}: {
  href: string;
  label: string;
  description?: string | null;
}) {
  const content = (
    <>
      <div className="text-base font-semibold text-ink">{label}</div>
      {description ? <p className="mt-2 text-sm leading-7 text-ink-soft">{description}</p> : null}
      <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary">
        Read more <ArrowRight className="h-4 w-4" />
      </span>
    </>
  );

  const className =
    "block rounded-[1.25rem] border border-border bg-surface/30 p-5 transition-colors hover:border-primary/25 hover:bg-white";

  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link to={href} className={className}>
      {content}
    </Link>
  );
}

function getBlogDemoRoute(blogGroup: ReturnType<typeof resolveBlogGroupFromPath>) {
  if (blogGroup === "bulk-email") {
    return ROUTES.bulkEmailBookDemo;
  }

  if (blogGroup === "asset-management") {
    return ROUTES.assetManagementBookDemo;
  }

  return ROUTES.bookDemo;
}

function DemoSidebar({
  blogGroup,
}: {
  blogGroup: ReturnType<typeof resolveBlogGroupFromPath>;
}) {
  const employeeOptions = ["1-10", "11-25", "26-50", "51-100", "101-250", "251-500", "500+"];
  const demoRoute = getBlogDemoRoute(blogGroup);

  return (
    <aside className="xl:sticky xl:top-24 self-start">
      <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-float">
        <div className="border-b border-border bg-[linear-gradient(180deg,_rgba(30,79,209,0.10),_rgba(14,165,165,0.06))] p-6">
          <div className="text-xs font-bold uppercase tracking-[0.28em] text-primary">Book a demo</div>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-ink">
            Schedule Your Free Demo Today
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink-soft">
            See how Altroz HR can handle HRMS, attendance, payroll, and reporting in one system.
          </p>
        </div>

        <div className="p-6">
          <form className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-ink-soft">Full Name *</label>
              <Input
                placeholder="Enter your full name"
                className="h-11 rounded-none border-0 border-b border-border px-0 shadow-none focus-visible:ring-0"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-ink-soft">Email Address *</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                <Input
                  type="email"
                  placeholder="name@company.com"
                  className="h-11 rounded-none border-0 border-b border-border px-0 pl-7 shadow-none focus-visible:ring-0"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-ink-soft">Phone Number *</label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                <Input
                  type="tel"
                  placeholder="Enter phone number"
                  className="h-11 rounded-none border-0 border-b border-border px-0 pl-7 shadow-none focus-visible:ring-0"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-ink-soft">Number of Employees *</label>
              <Select defaultValue="11-25">
                <SelectTrigger className="h-11 rounded-none border-0 border-b border-border px-0 shadow-none focus:ring-0">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  {employeeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-ink-soft">Company Name *</label>
              <div className="relative">
                <Building2 className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                <Input
                  placeholder="Enter company name"
                  className="h-11 rounded-none border-0 border-b border-border px-0 pl-7 shadow-none focus-visible:ring-0"
                />
              </div>
            </div>

            <div className="pt-2">
              <Link to={demoRoute} className="btn-primary w-full justify-center">
                Get My Free Demo!
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-surface/35 p-4 text-xs leading-6 text-ink-soft">
              We will contact you with a tailored walkthrough based on your team size and HR priorities.
            </div>
          </form>
        </div>
      </div>
    </aside>
  );
}

function ArticleState({
  title,
  description,
  blogPath,
  blogGroup,
}: {
  title: string;
  description: string;
  blogPath: string;
  blogGroup: ReturnType<typeof resolveBlogGroupFromPath>;
}) {
  const demoRoute = getBlogDemoRoute(blogGroup);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f8fbff_0%,_#ffffff_100%)]">
      <BlogChrome blogGroup={blogGroup} />

      <main className="overflow-x-hidden">
        <section className="py-16 sm:py-20">
          <div className="site-container max-w-4xl">
            <div className="rounded-[2rem] border border-border bg-white p-8 shadow-float sm:p-10">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                Blog article
              </div>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                {title}
              </h1>
              <p className="mt-4 text-base leading-8 text-ink-soft">{description}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={blogPath} className="btn-outline">
                  <ArrowLeft className="h-4 w-4" />
                  Back to blog
                </Link>
                <Link to={demoRoute} className="btn-primary">
                  Book a demo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function BlogArticlePage() {
  const { slug } = useParams();
  const location = useLocation();
  const fallbackGroup = resolveBlogGroupFromPath(location.pathname);
  const fallbackBlogPath = resolveBlogListingPath(fallbackGroup, location.pathname);
  const seedPost = useMemo(() => (slug ? getSeedBlogPostFallback(slug) : null), [slug]);
  const { data: post, error, loading } = usePublicContent(
    () => (slug ? fetchPublicBlogPost(slug, fallbackGroup) : Promise.resolve(null)),
    [slug, fallbackGroup],
    seedPost,
  );

  if (!slug) {
    return (
      <ArticleState
        title="Blog article not found"
        description="This article URL is incomplete."
        blogPath={fallbackBlogPath}
        blogGroup={fallbackGroup}
      />
    );
  }

  if (loading) {
    return (
      <ArticleState
        title="Loading blog article..."
        description="We are fetching the latest published version of this article."
        blogPath={fallbackBlogPath}
        blogGroup={fallbackGroup}
      />
    );
  }

  const resolvedPost = post ?? seedPost;

  if (!resolvedPost) {
    return (
      <ArticleState
        title="This blog post is not available yet"
        description={
          error ??
          "If you just created this article in the admin panel, switch its status to Published and save it before opening the public page."
        }
        blogPath={fallbackBlogPath}
        blogGroup={fallbackGroup}
      />
    );
  }

  const pageCopy = BLOG_GROUP_PAGE_CONTENT[resolvedPost.blogGroup];
  const canonicalPath = resolveBlogPostPath(
    resolvedPost.blogGroup,
    resolvedPost.slug,
    location.pathname,
  );
  const blogPath = resolveBlogListingPath(resolvedPost.blogGroup, location.pathname);
  const publishedDate = formatBlogDate(resolvedPost.publishedAt);
  const descriptionText = stripHtmlToText(resolvedPost.descriptionHtml) || resolvedPost.metaDescription;
  const breadcrumbItems = [
    { label: "Home", href: ROUTES.home },
    { label: pageCopy.badge, href: blogPath },
    { label: resolvedPost.title, href: canonicalPath },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: resolvedPost.title,
    description: descriptionText || resolvedPost.metaDescription,
    articleSection: resolvedPost.category,
    mainEntityOfPage: resolveSiteUrl(canonicalPath),
    datePublished: resolvedPost.publishedAt ?? undefined,
    dateModified: resolvedPost.updatedAt ?? resolvedPost.publishedAt ?? undefined,
    author: {
      "@type": "Organization",
      name: "Altroz HR Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Altroz HR",
    },
    keywords: [resolvedPost.category, ...resolvedPost.heroPoints].join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: resolveSiteUrl(item.href),
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: resolvedPost.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtmlToText(item.answer),
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f8fbff_0%,_#ffffff_100%)]">
      <PageSEO
        title={resolvedPost.metaTitle || `${resolvedPost.title} | Altroz HR Blog`}
        description={resolvedPost.metaDescription}
        canonicalPath={canonicalPath}
        image={resolvedPost.coverImageUrl ?? undefined}
        imageAlt={resolvedPost.coverImageAlt ?? resolvedPost.title}
        ogTitle={resolvedPost.metaTitle || resolvedPost.title}
        ogDescription={resolvedPost.metaDescription}
      />
      <BlogChrome blogGroup={resolvedPost.blogGroup} />

      <main className="overflow-x-hidden">
        <section className="py-10 sm:py-12 lg:py-14">
          <div className="site-container max-w-7xl">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start">
              <div>
                <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-ink-soft">
                  <Link to={blogPath} className="font-medium text-primary transition-colors hover:text-primary/80">
                    {pageCopy.badge}
                  </Link>
                  <span>/</span>
                  <span className="truncate">{resolvedPost.title}</span>
                </div>

                <article className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-float">
                  <div className="px-6 py-8 sm:px-10 sm:py-10">
                    <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                      Blog
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-soft">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        {publishedDate}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Clock3 className="h-4 w-4 text-primary" />
                        {resolvedPost.readingTimeLabel ?? "Read now"}
                      </span>
                      <span className="rounded-full border border-primary/15 bg-primary-soft/35 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        {resolvedPost.category}
                      </span>
                    </div>

                    <h1 className="mt-6 text-3xl font-black tracking-tight text-ink sm:text-4xl lg:text-[2.8rem] lg:leading-tight">
                      {resolvedPost.title}
                    </h1>

                    <SafeRichText
                      html={resolvedPost.descriptionHtml}
                      className="mt-5 max-w-4xl text-base leading-8 text-ink-soft sm:text-lg [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_p]:m-0 [&_p+*]:mt-4"
                    />
                  </div>

                  <div className="px-6 sm:px-10">
                    <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface/30">
                      <img
                        src={resolvedPost.coverImageUrl ?? FALLBACK_BLOG_IMAGE}
                        alt={resolvedPost.coverImageAlt ?? resolvedPost.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="px-6 py-8 sm:px-10 sm:py-10">
                    <div className="mx-auto max-w-4xl">
                      <SafeRichText
                        html={resolvedPost.heroSummaryHtml}
                        className="text-base leading-8 text-ink-soft sm:text-lg [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:tracking-tight [&_h2]:text-ink [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-ink [&_p]:m-0 [&_p+*]:mt-5"
                      />

                      {resolvedPost.quickAnswerHtml ? (
                        <section className="mt-8 rounded-[1.5rem] border border-primary/15 bg-primary-soft/25 p-6">
                          <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                            Quick Answer
                          </div>
                          <SafeRichText
                            html={resolvedPost.quickAnswerHtml}
                            className="mt-4 text-base leading-8 text-ink-soft [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_p]:m-0 [&_p+*]:mt-4"
                          />
                        </section>
                      ) : null}

                      {resolvedPost.sections.length > 0 ? (
                        <section className="mt-8 rounded-[1.5rem] border border-border bg-surface/25 p-6">
                          <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                            Table of Contents
                          </div>
                          <ol className="mt-4 space-y-3 text-sm leading-7 text-ink-soft">
                            {resolvedPost.sections.map((section, index) => (
                              <li key={section.id}>
                                <a
                                  href={`#${section.id}`}
                                  className="inline-flex items-start gap-3 transition-colors hover:text-primary"
                                >
                                  <span className="font-semibold text-primary">{index + 1}.</span>
                                  <span>{section.title}</span>
                                </a>
                              </li>
                            ))}
                          </ol>
                        </section>
                      ) : null}

                      {resolvedPost.sections.length > 0 ? (
                        <div className="mt-10 space-y-10">
                          {resolvedPost.sections.map((section, index) => (
                            <section
                              key={section.id}
                              id={section.id}
                              className={cn(
                                "scroll-mt-28",
                                index > 0 ? "border-t border-border pt-10" : "",
                              )}
                            >
                              <h2 className="text-2xl font-black tracking-tight text-ink sm:text-3xl">
                                {section.title}
                              </h2>

                              <SafeRichText
                                html={section.bodyHtml}
                                className="mt-5 text-base leading-8 text-ink-soft [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-ink [&_p]:m-0 [&_p+*]:mt-5"
                              />

                              {section.bullets.length > 0 ? (
                                <ul className="mt-6 space-y-3 text-base leading-8 text-ink-soft">
                                  {section.bullets.map((bullet) => (
                                    <li key={bullet} className="flex gap-3">
                                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-primary" />
                                      <span>{bullet}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : null}

                              {section.table ? (
                                <div className="mt-6 overflow-x-auto rounded-[1.25rem] border border-border">
                                  <table className="min-w-full border-collapse text-left text-sm">
                                    <thead className="bg-surface/60">
                                      <tr>
                                        {section.table.headers.map((header) => (
                                          <th
                                            key={header}
                                            className="border-b border-border px-4 py-3 font-semibold text-ink"
                                          >
                                            {header}
                                          </th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {section.table.rows.map((row, rowIndex) => (
                                        <tr key={`${section.id}-${rowIndex}`}>
                                          {row.map((cell, cellIndex) => (
                                            <td
                                              key={`${section.id}-${rowIndex}-${cellIndex}`}
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
                            </section>
                          ))}
                        </div>
                      ) : null}

                      {resolvedPost.faqs.length > 0 ? (
                        <section className="mt-10 border-t border-border pt-10">
                          <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                            Frequently Asked Questions
                          </div>
                          <h2 className="mt-4 text-2xl font-black tracking-tight text-ink sm:text-3xl">
                            Common questions about this topic
                          </h2>

                          <div className="mt-6 space-y-4">
                            {resolvedPost.faqs.map((item) => (
                              <div
                                key={item.question}
                                className="rounded-[1.25rem] border border-border bg-surface/25 p-5"
                              >
                                <h3 className="text-lg font-bold text-ink">{item.question}</h3>
                                <SafeRichText
                                  html={item.answer}
                                  className="mt-3 text-base leading-8 text-ink-soft [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_p]:m-0 [&_p+*]:mt-4"
                                />
                              </div>
                            ))}
                          </div>
                        </section>
                      ) : null}

                      {resolvedPost.relatedLinks.length > 0 ? (
                        <section className="mt-10 border-t border-border pt-10">
                          <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                            Related Links
                          </div>
                          <h2 className="mt-4 text-2xl font-black tracking-tight text-ink sm:text-3xl">
                            Continue reading
                          </h2>
                          <div className="mt-6 grid gap-4 md:grid-cols-2">
                            {resolvedPost.relatedLinks.map((link) => (
                              <RelatedLinkItem
                                key={`${link.label}-${link.href}`}
                                href={link.href}
                                label={link.label}
                                description={link.description}
                              />
                            ))}
                          </div>
                        </section>
                      ) : null}

                      <section className="mt-10 rounded-[1.5rem] border border-primary/15 bg-[linear-gradient(180deg,_rgba(30,79,209,0.06),_rgba(14,165,165,0.04))] p-6 sm:p-8">
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                          Next Step
                        </div>
                        <h2 className="mt-4 text-2xl font-black tracking-tight text-ink sm:text-3xl">
                          Want a walkthrough of the same workflows in Altroz HR?
                        </h2>
                        <p className="mt-4 max-w-3xl text-base leading-8 text-ink-soft">
                          Explore the product, book a demo, or go back to the blog for more practical
                          HR and operations guides.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                          <Link to={pageCopy.primaryCtaHref} className="btn-primary">
                            {pageCopy.primaryCtaLabel}
                          </Link>
                          <Link to={getBlogDemoRoute(resolvedPost.blogGroup)} className="btn-outline">
                            Book a demo
                          </Link>
                          <Link to={blogPath} className="btn-outline">
                            <ArrowLeft className="h-4 w-4" />
                            Back to blog
                          </Link>
                        </div>
                      </section>
                    </div>
                  </div>
                </article>
              </div>

              <DemoSidebar blogGroup={resolvedPost.blogGroup} />
            </div>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {resolvedPost.faqs.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <Footer />
    </div>
  );
}
