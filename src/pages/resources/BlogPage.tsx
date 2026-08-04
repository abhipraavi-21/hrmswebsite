"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpen, CalendarDays, Clock3, Search, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { fetchPublicBlogs, type BlogRecord } from "@/lib/blogApi";
import { ROUTES } from "@/routes/routeConfig.js";
import { usePublicContentRecord } from "@/site/PublicSiteDataContext";

const pageTitle = "HR Blog | Practical HR Articles & Software Insights - Altroz HR";
const pageDescription =
  "Read practical HR articles on HRMS, payroll, SEO, compliance, and workforce operations from Altroz HR.";

const faqItems = [
  {
    q: "Can blog fields be managed from the admin panel?",
    a: "Yes. Blog title, category, author, excerpt, featured image, reading time, status, and SEO fields now map to the admin workspace and the MySQL-backed blog API.",
  },
  {
    q: "Does the blog page support publish and unpublish behavior?",
    a: "Yes. Only published blog entries are returned by the public blog API and shown on this page.",
  },
  {
    q: "What fields are shown on the blog cards?",
    a: "Each article card includes the featured image, category, author, publish date, read time, tags, title, and short description.",
  },
];

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

function BlogCard({ post }: { post: BlogRecord }) {
  return (
    <Link
      to={post.href}
      className="group overflow-hidden rounded-[2rem] border border-border bg-white shadow-float transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={post.featuredImage}
          alt={post.featuredImageAlt}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          <span>{post.category}</span>
          <span className="text-ink-soft/60">/</span>
          <span>{formatDate(post.publishDate)}</span>
        </div>
        <h2 className="mt-4 text-2xl font-black tracking-tight text-ink transition-colors group-hover:text-primary">
          {post.title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">{post.description}</p>

        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-ink-soft">
          <span className="inline-flex items-center gap-2">
            <UserRound className="h-4 w-4 text-primary" />
            {post.author}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-primary" />
            {post.readingTime}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-surface/45 px-3 py-1 text-xs font-medium text-ink-soft"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Read article
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [posts, setPosts] = useState<BlogRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const blogPageContent = usePublicContentRecord(ROUTES.blog, "Page");
  const blogHeroTitle =
    blogPageContent?.heroTitle ?? "Practical HR, payroll, SEO, and compliance articles for growing teams";
  const blogHeroDescription =
    blogPageContent?.heroDescription ??
    "This blog feed now loads from the MySQL-backed blog API, with featured images, publish dates, author names, read-time metadata, and editable SEO fields.";
  const blogSummary =
    blogPageContent?.summary ??
    "Review admin-managed blog articles and keep the public content feed current without manual code edits.";
  const blogCtaTitle = blogPageContent?.ctaTitle ?? "Stay close to practical HR ideas";
  const blogCtaDescription =
    blogPageContent?.ctaDescription ??
    "Get new blog posts, resource updates, and practical workflow ideas without digging through a long content archive.";
  const blogCtaButtonText = blogPageContent?.ctaButtonText ?? "Book Free Demo";

  useEffect(() => {
    let mounted = true;

    async function loadBlogs() {
      try {
        const response = await fetchPublicBlogs();
        if (mounted) {
          setPosts(response);
          setError("");
        }
      } catch (requestError) {
        if (mounted) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load blog articles right now.",
          );
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadBlogs();

    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((post) => post.category)))],
    [posts],
  );
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesQuery = `${post.title} ${post.description} ${post.author} ${post.tags.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, posts, query]);

  const featuredPost = filteredPosts[0] ?? posts[0];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(11,92,255,0.08),_transparent_32%),linear-gradient(180deg,_#ffffff_0%,_#f7fbff_100%)]">
      <PageSEO
        title={pageTitle}
        description={pageDescription}
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
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-extrabold text-primary shadow-sm">
                <BookOpen className="h-4 w-4" />
                {blogPageContent?.title ?? "Altroz HR Blog"}
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                {blogHeroTitle}
              </h1>
              <p className="mx-auto mt-5 max-w-4xl text-lg leading-8 text-ink-soft sm:text-xl">
                {blogHeroDescription}
              </p>
              <p className="mx-auto mt-3 max-w-4xl text-sm leading-7 text-ink-soft">
                {blogSummary}
              </p>

              <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-[1fr_auto]">
                <label className="flex h-12 items-center gap-3 rounded-full border border-border bg-white px-4 shadow-sm transition-shadow focus-within:shadow-[0_18px_40px_rgba(11,92,255,0.12)]">
                  <Search className="h-4 w-4 shrink-0 text-primary" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search HR articles, guides, and topics..."
                    aria-label="Search HR articles, guides, and topics"
                    className="w-full border-0 bg-transparent p-0 text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none focus:ring-0"
                  />
                </label>
                <Link to={ROUTES.bookDemo} className="btn-primary justify-center">
                  {blogCtaButtonText}
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      activeCategory === category
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-white text-ink-soft hover:border-primary/30 hover:text-primary"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {featuredPost ? (
          <section className="pb-10">
            <div className="site-container">
              <ScrollReveal className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-float">
                <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="aspect-[16/11] overflow-hidden bg-slate-100">
                    <img
                      src={featuredPost.featuredImage}
                      alt={featuredPost.featuredImageAlt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-7 sm:p-9">
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                      Featured article
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-ink-soft">
                      <span className="rounded-full bg-primary-soft px-3 py-1 font-semibold text-primary">
                        {featuredPost.category}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        {formatDate(featuredPost.publishDate)}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Clock3 className="h-4 w-4 text-primary" />
                        {featuredPost.readingTime}
                      </span>
                    </div>
                    <h2 className="mt-5 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                      {featuredPost.title}
                    </h2>
                    <p className="mt-4 text-base leading-7 text-ink-soft">
                      {featuredPost.description}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink-soft">
                      <UserRound className="h-4 w-4 text-primary" />
                      {featuredPost.author}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {featuredPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-surface/45 px-3 py-1 text-xs font-medium text-ink-soft"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-8">
                      <Link to={featuredPost.href} className="btn-primary">
                        Read featured article
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        ) : null}

        <section className="py-10 sm:py-12 lg:py-16">
          <div className="site-container">
            <ScrollReveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  All articles
                </div>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                  Browse the latest articles
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-ink-soft">
                This feed reflects the structured blog fields you asked for: category, author,
                publish date, read time, image, excerpt, and editable SEO coverage.
              </p>
            </ScrollReveal>

            {isLoading ? (
              <ScrollReveal className="mt-10 rounded-[2rem] border border-border bg-white p-10 text-center shadow-sm">
                <h3 className="text-xl font-bold text-ink">Loading articles...</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  Pulling the latest published blog posts from MySQL.
                </p>
              </ScrollReveal>
            ) : error ? (
              <ScrollReveal className="mt-10 rounded-[2rem] border border-dashed border-rose-200 bg-white p-10 text-center shadow-sm">
                <h3 className="text-xl font-bold text-ink">Blog feed unavailable</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{error}</p>
              </ScrollReveal>
            ) : filteredPosts.length ? (
              <StaggerReveal className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3" step={70}>
                {filteredPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </StaggerReveal>
            ) : (
              <ScrollReveal className="mt-10 rounded-[2rem] border border-dashed border-border bg-white p-10 text-center shadow-sm">
                <h3 className="text-xl font-bold text-ink">No matching articles found</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  Try another keyword or switch back to the full category list.
                </p>
              </ScrollReveal>
            )}
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <div className="site-container">
            <ScrollReveal className="rounded-[2rem] border border-border bg-white p-6 shadow-float sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Subscribe to updates
                  </div>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                    {blogCtaTitle}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
                    {blogCtaDescription}
                  </p>
                </div>

                <form
                  className="rounded-[1.75rem] border border-border bg-surface/35 p-5 sm:p-6"
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
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-16 lg:pb-20">
          <div className="site-container">
            <ScrollReveal className="mx-auto max-w-5xl rounded-[2rem] border border-border bg-white p-4 shadow-float sm:p-6">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                Frequently asked questions
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Questions about the blog structure
              </h2>

              <Accordion type="single" collapsible className="mt-8 space-y-3">
                {faqItems.map((item) => (
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
      </main>

      <Footer />
    </div>
  );
}
