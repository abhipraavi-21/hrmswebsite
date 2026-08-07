"use client";

import { ArrowRight, Clock3, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { usePublicContent } from "@/hooks/usePublicContent";
import { getSection } from "@/services/cmsHelpers";
import { fetchPublicBlogPosts } from "@/services/blogService";
import { fetchPageByKey } from "@/services/pageService";
import type { PublicBlogPost } from "@/services/cmsTypes";
import {
  BLOG_GROUP_PAGE_CONTENT,
  FALLBACK_BLOG_IMAGE,
  resolveBlogGroupFromPath,
  resolveBlogPostPath,
} from "./blogUtils";

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

function FeedCard({
  post,
  pathname,
  isFeatured,
}: {
  post: PublicBlogPost;
  pathname: string;
  isFeatured: boolean;
}) {
  return (
    <Link
      to={resolveBlogPostPath(post.blogGroup, post.slug, pathname)}
      className="group block h-full overflow-hidden rounded-[1.4rem] border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-float"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[linear-gradient(180deg,_rgba(11,92,255,0.08),_rgba(18,185,122,0.08))]">
        <img
          src={post.coverImageUrl ?? FALLBACK_BLOG_IMAGE}
          alt={post.coverImageAlt ?? post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-primary/15 bg-white/90 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-primary shadow-sm">
          {isFeatured ? "Featured guide" : post.category}
        </div>
      </div>

      <div className="flex h-full flex-col px-6 py-6 sm:px-7 sm:py-7">
        <div className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-primary">
          {post.blogGroup.replace("-", " ")}
        </div>
        <h3 className="mt-4 text-[1.15rem] font-medium leading-[1.5] tracking-tight text-ink sm:text-[1.35rem]">
          {post.title}
        </h3>

        <SafeRichText
          html={post.descriptionHtml}
          className="mt-4 text-sm leading-7 text-ink-soft [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_p]:m-0"
        />

        <div className="mt-6 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-ink-soft">
            <Clock3 className="h-4 w-4 text-primary" />
            {post.readingTimeLabel ?? "Read now"}
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
  const location = useLocation();
  const blogGroup = resolveBlogGroupFromPath(location.pathname);
  const pageCopy = BLOG_GROUP_PAGE_CONTENT[blogGroup];
  const { data: remotePage } = usePublicContent(() => fetchPageByKey(pageCopy.pageKey), [pageCopy.pageKey]);
  const { data, error, loading } = usePublicContent(
    () => fetchPublicBlogPosts(blogGroup),
    [blogGroup],
  );

  const posts = data ?? [];
  const featuredPost = posts[0] ?? null;
  const storySection =
    pageCopy.storySectionKeys
      .map((sectionKey) => getSection(remotePage, sectionKey))
      .find(Boolean) ?? null;
  const storyEyebrow = storySection?.subheading ?? "Latest stories";
  const storyTitle = storySection?.heading ?? "Browse the story feed";
  const storyDescription =
    storySection?.description ??
    "Published posts from the admin panel appear here automatically. Draft posts stay hidden until you switch them to Published and save.";
  const seoTitle = remotePage?.metaTitle ?? pageCopy.pageTitle;
  const seoDescription = remotePage?.metaDescription ?? pageCopy.pageDescription;
  const seoImage = remotePage?.ogImage ?? featuredPost?.coverImageUrl ?? undefined;
  const seoImageAlt = remotePage?.ogImage
    ? (remotePage.ogImageAlt ?? storyTitle)
    : (featuredPost?.coverImageAlt ?? featuredPost?.title ?? undefined);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(11,92,255,0.09),_transparent_34%),linear-gradient(180deg,_#ffffff_0%,_#f6fbff_100%)]">
      <PageSEO
        title={seoTitle}
        description={seoDescription}
        canonicalPath={location.pathname}
        ogTitle={remotePage?.ogTitle ?? seoTitle}
        ogDescription={remotePage?.ogDescription ?? seoDescription}
        image={seoImage}
        imageAlt={seoImageAlt}
      />
      <TopNavbar />
      <MainNavbar />

      <main className="overflow-x-hidden">
        <section className="section py-14 sm:py-16 lg:py-20">
          <div className="site-container">
            <ScrollReveal className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-primary shadow-sm">
                <Sparkles className="h-4 w-4" />
                {storyEyebrow}
              </span>
              <h2 className="mt-5 text-3xl font-black tracking-tight text-ink sm:text-4xl lg:text-5xl">
                {storyTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg">
                {storyDescription}
              </p>
            </ScrollReveal>

            <div className="mt-10">
              {loading ? (
                <div className="soft-card p-8 text-center">
                  <div className="text-lg font-bold text-ink">Loading blog posts...</div>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">
                    We&apos;re pulling the latest published articles from the live CMS feed.
                  </p>
                </div>
              ) : error ? (
                <div className="soft-card p-8 text-center">
                  <div className="text-lg font-bold text-ink">We couldn&apos;t load the live story feed</div>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">{error}</p>
                </div>
              ) : posts.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {posts.map((post, index) => (
                    <FeedCard
                      key={post.id}
                      post={post}
                      pathname={location.pathname}
                      isFeatured={index === 0}
                    />
                  ))}
                </div>
              ) : (
                <div className="soft-card p-8 text-center">
                  <div className="text-lg font-bold text-ink">{pageCopy.emptyTitle}</div>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">{pageCopy.emptyDescription}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
