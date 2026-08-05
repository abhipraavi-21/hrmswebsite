"use client";

import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Clock3,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { modelScreenshots } from "@/lib/modelScreenshots";
import { blogPosts } from "@/data/blogPosts";
import { ROUTES } from "@/routes/routeConfig.js";

type BlogFeedItem = {
  label: string;
  title: string;
  description: string;
  meta: string;
  href: string;
  image: string;
  tags: string[];
  ctaLabel: string;
  reverse?: boolean;
};

const featuredPost = blogPosts[0];

const blogFeedItems: BlogFeedItem[] = [
  {
    label: "Featured guide",
    title: featuredPost.title,
    description: featuredPost.description,
    meta: "4 min read",
    href: featuredPost.href,
    image: featuredPost.coverImage ?? modelScreenshots.workforceDashboard,
    tags: ["HRMS overview", "Employee data", "One source of truth"],
    ctaLabel: "Read guide",
  },
];

function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="soft-card flex items-center gap-4 p-4 sm:p-5">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold text-ink">{value}</div>
        <div className="text-xs font-medium uppercase tracking-[0.22em] text-ink-soft">{label}</div>
      </div>
    </div>
  );
}

function FeedCard({ item }: { item: BlogFeedItem }) {
  return (
    <Link
      to={item.href}
      className="group block h-full overflow-hidden rounded-[1.4rem] border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-float"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[linear-gradient(180deg,_rgba(11,92,255,0.08),_rgba(18,185,122,0.08))]">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-primary/15 bg-white/90 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-primary shadow-sm">
          Altroz HR
        </div>
      </div>

      <div className="flex h-full flex-col px-6 py-6 sm:px-7 sm:py-7">
        <div className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-primary">{item.label}</div>
        <h3 className="mt-4 text-[1.15rem] font-medium leading-[1.5] tracking-tight text-ink sm:text-[1.35rem]">
          {item.title}
        </h3>

        <div className="mt-6 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-ink-soft">
            <Clock3 className="h-4 w-4 text-primary" />
            {item.meta}
          </span>
          <span className="inline-flex items-center gap-1 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-primary">
            Read <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const [query, setQuery] = useState("");

  const filteredItems = blogFeedItems.filter((item) => {
    if (!query.trim()) {
      return true;
    }

    const haystack = [item.label, item.title, item.description, item.meta, item.tags.join(" ")]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query.trim().toLowerCase());
  });

  const quickReads = featuredPost.relatedLinks.slice(0, 4);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(11,92,255,0.09),_transparent_34%),linear-gradient(180deg,_#ffffff_0%,_#f6fbff_100%)]">
      <PageSEO
        title="HRMS Blog | Altroz HR"
        description={featuredPost.description}
        canonicalPath={ROUTES.blog}
        ogTitle="HRMS Blog | Altroz HR"
        ogDescription={featuredPost.description}
      />
      <TopNavbar />
      <MainNavbar />

      <main className="overflow-x-hidden">
        <section className="hero-gradient relative overflow-hidden pt-10 sm:pt-12 lg:pt-16">
          <div className="site-container">
            <ScrollReveal className="mx-auto max-w-5xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-primary shadow-sm">
                <BookOpen className="h-4 w-4" />
                HRMS Blog
              </div>

              <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Learn everything about HR operations, attendance, payroll, and automation
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-ink-soft sm:text-xl">
                A clean editorial layout for your HRMS content, with practical guides, product links, and
                the same blue-green colour theme used across the rest of the site.
              </p>
            </ScrollReveal>

            <StaggerReveal step={80} className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard icon={<Target className="h-5 w-5" />} label="Featured guide" value="1 article" />
              <StatCard icon={<Sparkles className="h-5 w-5" />} label="Topic cards" value="3 stories" />
              <StatCard icon={<ShieldCheck className="h-5 w-5" />} label="HR theme" value="Blue + green" />
              <StatCard icon={<CalendarDays className="h-5 w-5" />} label="Updated" value="2026" />
            </StaggerReveal>

            <ScrollReveal variant="scale" delay={80} className="mx-auto mt-8 max-w-3xl">
              <div className="rounded-[1.5rem] border border-border bg-white p-3 shadow-float">
                <div className="flex items-center gap-3 rounded-[1.2rem] border border-border bg-surface/35 px-4 py-3">
                  <Search className="h-5 w-5 shrink-0 text-primary" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search HRMS guides, payroll, attendance, leave, reports..."
                    aria-label="Search blog topics"
                    className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft/70"
                  />
                  {query ? (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-ink-soft transition-colors hover:border-primary/20 hover:text-primary"
                    >
                      Clear
                    </button>
                  ) : null}
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
              <ScrollReveal variant="fade-up">
                <div className="soft-card flex h-full flex-col p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-primary">
                      Featured article
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-ink-soft">
                      <Clock3 className="h-3.5 w-3.5" />
                      ~24 min read
                    </span>
                  </div>

                  <h2 className="mt-5 max-w-2xl text-3xl font-black tracking-tight text-ink sm:text-4xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-ink-soft">{featuredPost.heroSummary}</p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {featuredPost.heroPoints.slice(0, 4).map((point) => (
                      <div key={point} className="soft-card flex items-start gap-3 p-4">
                        <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                          <ChevronRight className="h-4 w-4" />
                        </div>
                        <span className="text-sm leading-6 text-ink-soft">{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link to={featuredPost.href} className="btn-primary">
                      Read full guide
                    </Link>
                    <Link to={ROUTES.attendanceManagement} className="btn-outline">
                      Explore attendance
                    </Link>
                    <Link to={ROUTES.complianceGuides} className="btn-outline">
                      Compliance guides
                    </Link>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" delay={120}>
                <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-white p-5 shadow-float">
                  <div className="rounded-[1.65rem] bg-[linear-gradient(180deg,_rgba(11,92,255,0.12),_rgba(18,185,122,0.10))] p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-primary">
                          Learning dashboard
                        </div>
                        <p className="mt-2 text-sm font-semibold text-ink">
                          Structured learning, simple navigation
                        </p>
                      </div>
                      <div className="rounded-full border border-primary/15 bg-white px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-primary">
                        HRMS
                      </div>
                    </div>

                    <div className="mt-4 overflow-hidden rounded-[1.35rem] border border-border bg-white shadow-sm">
                      <img
                        src={modelScreenshots.workforceDashboard}
                        alt="HRMS dashboard preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="soft-card p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                        Attendance
                      </div>
                      <div className="mt-1 text-sm font-semibold text-ink">Track time, shifts, and approvals</div>
                    </div>
                    <div className="soft-card p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                        Payroll
                      </div>
                      <div className="mt-1 text-sm font-semibold text-ink">Connect clean inputs to salary runs</div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-[1.35rem] border border-border bg-surface/35 p-4">
                    <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Quick answer</div>
                    <p className="mt-2 text-sm leading-7 text-ink-soft">{featuredPost.quickAnswer}</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section py-14 sm:py-16 lg:py-20">
          <div className="site-container">
            <ScrollReveal className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-primary shadow-sm">
                <Sparkles className="h-4 w-4" />
                Latest stories
              </span>
              <h2 className="mt-5 text-3xl font-black tracking-tight text-ink sm:text-4xl lg:text-5xl">
                Browse the HRMS story feed
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg">
                A stacked card layout keeps the page easy to scan on mobile while still giving each topic enough
                space to feel like a proper editorial feature.
              </p>
            </ScrollReveal>

            <div className="mt-10">
              {filteredItems.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredItems.map((item) => (
                    <FeedCard key={item.title} item={item} />
                  ))}
                </div>
              ) : (
                <div className="soft-card p-8 text-center">
                  <div className="text-lg font-bold text-ink">No matching stories found</div>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">
                    Try a broader search term like HRMS, guide, or workflow.
                  </p>
                  <button type="button" onClick={() => setQuery("")} className="btn-primary mt-5">
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="pb-14 sm:pb-16 lg:pb-20">
          <div className="site-container">
            <div className="rounded-[2rem] border border-border bg-white p-6 shadow-float sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Continue exploring
                  </div>
                  <h2 className="mt-4 text-2xl font-black tracking-tight text-ink sm:text-3xl">
                    Related HR topics connected to this blog
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-ink-soft">
                    These links keep the blog landing page useful and connect readers back to the product areas
                    that support the HRMS workflow.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link to={ROUTES.hrmsHome} className="btn-primary">
                    Explore HRMS
                  </Link>
                  <Link to={ROUTES.bookDemo} className="btn-outline">
                    Book a demo
                  </Link>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {quickReads.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="rounded-[1.35rem] border border-border bg-surface/35 p-5 transition-shadow hover:shadow-sm"
                  >
                    <div className="text-sm font-bold text-ink">{link.label}</div>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{link.description}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Open topic <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
