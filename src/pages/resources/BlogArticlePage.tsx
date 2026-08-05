"use client";

import { ArrowRight, Building2, ChevronRight, Clock3, Mail, Phone } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    <section id={id} className="rounded-[1.5rem] border border-border bg-white p-6 shadow-sm sm:p-8">
      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Article section</div>
      <h2 className="mt-4 text-2xl font-black tracking-tight text-ink sm:text-3xl">{title}</h2>
      <div className="mt-5 space-y-5 text-base leading-8 text-ink-soft">
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
                    <td key={`${row[0]}-${index}`} className="border-b border-border px-4 py-3 text-ink-soft">
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

function DemoSidebar() {
  const employeeOptions = ["1-10", "11-25", "26-50", "51-100", "101-250", "251-500", "500+"];

  return (
    <aside className="xl:sticky xl:top-24 self-start">
      <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-float">
        <div className="border-b border-border bg-[linear-gradient(180deg,_rgba(11,92,255,0.10),_rgba(18,185,122,0.06))] p-6">
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

export default function BlogArticlePage() {
  const { slug } = useParams();
  const post = slug ? getBlogPostBySlug(slug) : null;

  if (!post) {
    return <Navigate to={ROUTES.blog} replace />;
  }

  const canonicalPath = post.href;
  const publishedDate = "August 5, 2026";
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
          <div className="site-container max-w-7xl">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start">
              <div className="space-y-8">
                <article className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-float">
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-ink-soft">
                      <span>{publishedDate}</span>
                      <span className="text-border">-</span>
                      <span>{post.category}</span>
                      <span className="text-border">-</span>
                      <span>~24 min read</span>
                    </div>
                    <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight text-ink sm:text-4xl lg:text-[2.7rem] lg:leading-tight">
                      {post.title}
                    </h1>
                    <p className="mt-4 max-w-4xl text-base leading-8 text-ink-soft sm:text-lg">
                      {post.description}
                    </p>
                  </div>

                  <div className="px-6 sm:px-8">
                    <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface/30">
                      <img
                        src={post.coverImage ?? "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000"}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <p className="max-w-4xl text-base leading-8 text-ink-soft sm:text-lg">
                      {post.heroSummary}
                    </p>

                    <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
                      <div className="soft-card self-start p-5">
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                          Quick answer
                        </div>
                        <p className="mt-3 text-sm leading-7 text-ink-soft">{post.quickAnswer}</p>
                      </div>

                      <div className="soft-card self-start p-5">
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                          Key takeaways
                        </div>
                        <ul className="mt-3 space-y-3 text-sm leading-7 text-ink-soft">
                          {post.keyTakeaways.slice(0, 4).map((takeaway) => (
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
                      <Link to={ROUTES.blog} className="btn-outline">
                        Back to Blog
                      </Link>
                    </div>

                    <div className="mt-6 rounded-[1.35rem] border border-border bg-surface/35 p-4">
                      <div className="text-sm font-bold text-ink">On this page</div>
                      <nav className="mt-3 flex flex-wrap gap-2">
                        {post.sections.map((section) => (
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
                  </div>
                </article>

                <div className="space-y-6">
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
                </div>

                <section className="rounded-[1.75rem] border border-border bg-white p-6 shadow-float sm:p-8">
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
                </section>

                <section className="rounded-[1.75rem] border border-border bg-white p-6 shadow-float sm:p-8">
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
                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                          Open topic <ArrowRight className="h-4 w-4" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Footer />
    </div>
  );
}
