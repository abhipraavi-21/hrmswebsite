"use client";

import { useMemo } from "react";
import { ArrowRight, Building2, ChevronRight, Clock3, Mail, Phone } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import BulkEmailNavbar from "@/components/site/BulkEmailNavbar";
import AssetManagementNavbar from "@/components/site/AssetManagementNavbar";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import { resolveSiteUrl } from "@/lib/siteUrl";
import TopNavbar from "@/components/site/TopNavbar";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePublicContent } from "@/hooks/usePublicContent";
import { fetchPublicBlogPost } from "@/services/blogService";
import { getSeedBlogPostFallback } from "@/services/seedFallback";
import { isExternalHref, ROUTES } from "@/routes/routeConfig.js";
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

function SectionCard({
  title,
  id,
  bodyHtml,
  bullets,
  table,
}: {
  title: string;
  id: string;
  bodyHtml?: string | null;
  bullets?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  } | null;
}) {
  return (
    <section id={id} className="rounded-[1.5rem] border border-border bg-white p-6 shadow-sm sm:p-8">
      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Article section</div>
      <h2 className="mt-4 text-2xl font-black tracking-tight text-ink sm:text-3xl">{title}</h2>

      <SafeRichText
        html={bodyHtml}
        className="mt-5 space-y-5 text-base leading-8 text-ink-soft [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_p]:m-0 [&_p+*]:mt-5"
      />

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
              {table.rows.map((row, rowIndex) => (
                <tr key={`${row[0] ?? "row"}-${rowIndex}`}>
                  {row.map((cell, index) => (
                    <td key={`${rowIndex}-${index}`} className="border-b border-border px-4 py-3 text-ink-soft">
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
  );
}

function RelatedLinkCard({
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
      <div className="text-sm font-bold text-ink">{label}</div>
      <p className="mt-1 text-sm leading-6 text-ink-soft">{description}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
        Open topic <ArrowRight className="h-4 w-4" />
      </span>
    </>
  );

  const className =
    "rounded-2xl border border-border bg-surface/35 p-5 transition-shadow hover:shadow-sm";

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

function DemoSidebar() {
  const employeeOptions = ["1-10", "11-25", "26-50", "51-100", "101-250", "251-500", "500+"];

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
              <Link to={ROUTES.bookDemo} className="btn-primary w-full justify-center">
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
  const pageClassName = cn(
    "min-h-screen",
    blogGroup === "bulk-email"
      ? "bulk-email-theme bg-gradient-to-b from-white via-[#f6faff] to-[#fff7ef]"
      : "asset-management-theme asset-management-theme-shell",
  );

  return (
    <div className={pageClassName}>
      <BlogChrome blogGroup={blogGroup} />

      <main className="overflow-x-hidden">
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="site-container max-w-5xl">
            <div className="rounded-[2rem] border border-border bg-white p-8 text-center shadow-float sm:p-10">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Blog article</div>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-ink sm:text-4xl">{title}</h1>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-ink-soft">{description}</p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to={blogPath} className="btn-primary">
                  Back to blog
                </Link>
                <Link to={ROUTES.bookDemo} className="btn-outline">
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
  const fallbackPageCopy = BLOG_GROUP_PAGE_CONTENT[fallbackGroup];
  const fallbackBlogPath = resolveBlogListingPath(fallbackGroup, location.pathname);
  const seedPost = useMemo(() => (slug ? getSeedBlogPostFallback(slug) : null), [slug]);
  const { data: post, error, loading } = usePublicContent(
    () => (slug ? fetchPublicBlogPost(slug) : Promise.resolve(null)),
    [slug],
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
        description="We&apos;re fetching the latest published version of this article from the live CMS feed."
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
  const canonicalPath = resolveBlogPostPath(resolvedPost.blogGroup, resolvedPost.slug, location.pathname);
  const blogPath = resolveBlogListingPath(resolvedPost.blogGroup, location.pathname);
  const publishedDate = formatBlogDate(resolvedPost.publishedAt);
  const descriptionText = stripHtmlToText(resolvedPost.descriptionHtml) || resolvedPost.metaDescription;
  const heroSummaryText = stripHtmlToText(resolvedPost.heroSummaryHtml);
  const breadcrumbUrl = [
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
    itemListElement: breadcrumbUrl.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: resolveSiteUrl(item.href),
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtmlToText(item.answer),
      },
    })),
  };

  return (
    <div
      className={cn(
        "min-h-screen",
        resolvedPost.blogGroup === "bulk-email"
          ? "bulk-email-theme bg-gradient-to-b from-white via-[#f6faff] to-[#fff7ef]"
          : "asset-management-theme asset-management-theme-shell",
      )}
    >
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
              <div className="space-y-8">
                <article className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-float">
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-ink-soft">
                      <span>{publishedDate}</span>
                      <span className="text-border">-</span>
                      <span>{resolvedPost.category}</span>
                      <span className="text-border">-</span>
                      <span>{resolvedPost.readingTimeLabel ?? "Read now"}</span>
                    </div>
                    <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight text-ink sm:text-4xl lg:text-[2.7rem] lg:leading-tight">
                      {resolvedPost.title}
                    </h1>

                    <SafeRichText
                      html={resolvedPost.descriptionHtml}
                      className="mt-4 max-w-4xl text-base leading-8 text-ink-soft sm:text-lg [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_p]:m-0"
                    />
                  </div>

                  <div className="px-6 sm:px-8">
                    <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface/30">
                      <img
                        src={resolvedPost.coverImageUrl ?? FALLBACK_BLOG_IMAGE}
                        alt={resolvedPost.coverImageAlt ?? resolvedPost.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <SafeRichText
                      html={resolvedPost.heroSummaryHtml}
                      className="max-w-4xl text-base leading-8 text-ink-soft sm:text-lg [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_p]:m-0"
                    />

                    <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
                      <div className="soft-card self-start p-5">
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                          Quick answer
                        </div>
                        <SafeRichText
                          html={resolvedPost.quickAnswerHtml}
                          className="mt-3 text-sm leading-7 text-ink-soft [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_p]:m-0"
                        />
                      </div>

                      <div className="soft-card self-start p-5">
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                          Key takeaways
                        </div>
                        <ul className="mt-3 space-y-3 text-sm leading-7 text-ink-soft">
                          {resolvedPost.keyTakeaways.slice(0, 4).map((takeaway) => (
                            <li key={takeaway} className="flex gap-3">
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                              <span>{takeaway}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link to={ROUTES.bookDemo} className="btn-primary">
                        Book Free Demo
                      </Link>
                      <Link to={blogPath} className="btn-outline">
                        Back to Blog
                      </Link>
                    </div>

                    {resolvedPost.sections.length > 0 ? (
                      <div className="mt-6 rounded-[1.35rem] border border-border bg-surface/35 p-4">
                        <div className="text-sm font-bold text-ink">On this page</div>
                        <nav className="mt-3 flex flex-wrap gap-2">
                          {resolvedPost.sections.map((section) => (
                            <a
                              key={section.id}
                              href={`#${section.id}`}
                              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm text-ink-soft transition-colors hover:border-primary/25 hover:text-primary"
                            >
                              <ChevronRight className="h-4 w-4 shrink-0" />
                              <span>{section.title}</span>
                            </a>
                          ))}
                        </nav>
                      </div>
                    ) : null}
                  </div>
                </article>

                {resolvedPost.sections.length > 0 ? (
                  <div className="space-y-6">
                    {resolvedPost.sections.map((section) => (
                      <SectionCard
                        key={section.id}
                        id={section.id}
                        title={section.title}
                        bodyHtml={section.bodyHtml}
                        bullets={section.bullets}
                        table={section.table}
                      />
                    ))}
                  </div>
                ) : null}

                {resolvedPost.faqs.length > 0 ? (
                  <section className="rounded-[1.75rem] border border-border bg-white p-6 shadow-float sm:p-8">
                    <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                      Frequently Asked Questions
                    </div>
                    <h2 className="mt-4 text-2xl font-black tracking-tight text-ink sm:text-3xl">
                      Common questions about this topic
                    </h2>
                    <Accordion type="single" collapsible className="mt-6 space-y-3">
                      {resolvedPost.faqs.map((item) => (
                        <AccordionItem
                          key={item.question}
                          value={item.question}
                          className="overflow-hidden rounded-[1.35rem] border border-border bg-surface/35 px-4 py-0"
                        >
                          <AccordionTrigger className="py-5 text-left text-base font-semibold text-ink hover:no-underline">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="pb-5">
                            <SafeRichText
                              html={item.answer}
                              className="text-sm leading-7 text-ink-soft [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_p]:m-0"
                            />
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </section>
                ) : null}

                {resolvedPost.relatedLinks.length > 0 ? (
                  <section className="rounded-[1.75rem] border border-border bg-white p-6 shadow-float sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                      <div className="max-w-2xl">
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                          Related links
                        </div>
                        <h2 className="mt-4 text-2xl font-black tracking-tight text-ink sm:text-3xl">
                          Keep exploring related topics
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-ink-soft">
                          These links connect the article to the product areas and guides it depends on most.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Link to={pageCopy.primaryCtaHref} className="btn-primary">
                          {pageCopy.primaryCtaLabel}
                        </Link>
                        <Link to={ROUTES.contact} className="btn-outline">
                          Contact Us
                        </Link>
                      </div>
                    </div>

                    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                      {resolvedPost.relatedLinks.map((link) => (
                        <RelatedLinkCard
                          key={`${link.label}-${link.href}`}
                          href={link.href}
                          label={link.label}
                          description={link.description}
                        />
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>

              <DemoSidebar />
            </div>
          </div>
        </section>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {resolvedPost.faqs.length > 0 ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      ) : null}

      <Footer />
    </div>
  );
}
