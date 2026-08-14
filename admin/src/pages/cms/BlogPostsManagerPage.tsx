import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ExternalLink,
  ImageOff,
  PencilLine,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ImageUploadField } from "../../components/editor/ImageUploadField";
import {
  BLOG_GROUPS,
  type BlogGroupConfig,
  getBlogAdminRoute,
  getBlogGroupConfig,
  isBlogGroup,
} from "../../data/blogGroups";
import { blogPostService, pageService } from "../../services/cmsService";
import type {
  BlogFaq,
  BlogGroup,
  BlogPost,
  BlogRelatedLink,
  BlogSection,
  CmsPage,
  CmsSection,
} from "../../types/cms";

function getErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response &&
    typeof error.response.data === "object" &&
    error.response.data !== null &&
    "message" in error.response.data &&
    typeof error.response.data.message === "string"
  ) {
    const responseData = error.response.data as {
      message: string;
      errors?: Array<{ message?: string }>;
    };
    const firstErrorMessage = responseData.errors?.find((item) => typeof item.message === "string")?.message;

    return firstErrorMessage ? `${responseData.message}: ${firstErrorMessage}` : responseData.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong while managing blog posts.";
}

function slugifyDraftValue(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createBlankBlogPost(
  blogGroup: BlogGroup,
  displayOrder: number,
  existingPosts: BlogPost[],
): Partial<BlogPost> {
  const group = getBlogGroupConfig(blogGroup);
  const usedSlugs = new Set(existingPosts.map((post) => post.slug));
  let title = "New Blog Post";
  let slug = slugifyDraftValue(title);
  let suffix = 2;

  while (usedSlugs.has(slug)) {
    title = `New Blog Post ${suffix}`;
    slug = slugifyDraftValue(title);
    suffix += 1;
  }

  return {
    title,
    slug,
    blogGroup,
    category: group.defaultCategory,
    readingTimeLabel: "5 min read",
    descriptionHtml:
      "<p>Write a short blog listing description here. You can add a hyperlink like <a href=\"https://example.com\" target=\"_blank\" rel=\"noopener noreferrer\">this</a>.</p>",
    metaTitle: `${title} | ${group.pageLabel}`,
    metaDescription: "Write a short SEO description for this blog post here.",
    heroSummaryHtml: "<p>Write the hero summary for the blog post here.</p>",
    quickAnswerHtml: "<p>Write the quick answer for the blog post here.</p>",
    heroPoints: ["Add hero point"],
    keyTakeaways: ["Add key takeaway"],
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        bodyHtml: "<p>Write the first blog section here.</p>",
        bullets: [],
        table: null,
      },
    ],
    faqs: [
      {
        question: "Add a common question",
        answer: "Add a clear answer.",
      },
    ],
    relatedLinks: [
      {
        label: "Related page",
        href: group.blogPath,
        description: "Add a related link description.",
      },
    ],
    coverImageUrl: "",
    coverImageAlt: "",
    status: "draft",
    displayOrder,
    publishedAt: "",
  };
}

function createBlankSection(): BlogSection {
  return {
    id: "new-section",
    title: "New Section",
    bodyHtml: "<p>Write section content here.</p>",
    bullets: [],
    table: null,
  };
}

function createBlankFaq(): BlogFaq {
  return {
    question: "New FAQ question",
    answer: "New FAQ answer",
  };
}

function createBlankRelatedLink(): BlogRelatedLink {
  return {
    label: "New related link",
    href: "/resources/blog",
    description: "Short explanation for this related link.",
  };
}

function toDateTimeLocal(value?: string | null) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const offset = date.getTimezoneOffset();
  const normalized = new Date(date.getTime() - offset * 60_000);
  return normalized.toISOString().slice(0, 16);
}

function fromDateTimeLocal(value: string) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function stripHtmlToText(value?: string | null) {
  return (value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatPublishedLabel(value?: string | null) {
  if (!value) {
    return "Not published yet";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Invalid publish date";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getBlogPreviewText(post: Pick<BlogPost, "descriptionHtml" | "heroSummaryHtml">) {
  const text = stripHtmlToText(post.descriptionHtml ?? post.heroSummaryHtml ?? "");

  if (!text) {
    return "No summary added yet. Open the editor to add listing copy for this blog post.";
  }

  return text.length > 180 ? `${text.slice(0, 177)}...` : text;
}

function getStatusBadgeClass(status: BlogPost["status"]) {
  return status === "published"
    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
    : "border-amber-200 bg-amber-50 text-amber-700";
}

export function BlogPostsManagerPage() {
  const { blogGroup } = useParams();

  if (!blogGroup) {
    return <BlogGroupOverview />;
  }

  if (!isBlogGroup(blogGroup)) {
    return <Navigate to="/blog-posts" replace />;
  }

  const group = getBlogGroupConfig(blogGroup);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const reload = async () => {
    try {
      setPosts(await blogPostService.list(blogGroup));
      setLoadError(null);
    } catch (error) {
      setPosts([]);
      setLoadError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void reload();
  }, [blogGroup]);

  useEffect(() => {
    setSelectedPostId(null);
  }, [blogGroup]);

  useEffect(() => {
    if (selectedPostId !== null && !posts.some((post) => post.id === selectedPostId)) {
      setSelectedPostId(null);
    }
  }, [posts, selectedPostId]);

  const selectedPost = posts.find((post) => post.id === selectedPostId) ?? null;

  const createPost = async () => {
    try {
      const createdPost = await blogPostService.create(createBlankBlogPost(blogGroup, posts.length, posts));
      setSelectedPostId(createdPost.id);
      toast.success(`${group.pageLabel} post created`);
      await reload();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const removePost = async (post: Pick<BlogPost, "id" | "title">) => {
    if (!window.confirm(`Delete blog post "${post.title}"?`)) {
      return;
    }

    try {
      await blogPostService.remove(post.id);
      if (selectedPostId === post.id) {
        setSelectedPostId(null);
      }
      toast.success("Blog post deleted");
      await reload();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Link to="/blog-posts" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900">
              <ArrowLeft className="h-4 w-4" />
              All Blog Pages
            </Link>
            <div className="mt-4 text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
              {group.pageLabel}
            </div>
            <h1 className="mt-2 text-3xl font-semibold">Manage {group.shortLabel.toLowerCase()} blog articles</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-500">
              {group.description} Add new blogs with title, slug, linked description content, article
              sections, FAQs, related links, meta title, and meta description.
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.22em] text-sky-600">
              Public page path: {group.blogPath}
            </p>
          </div>
          <button type="button" onClick={() => void createPost()} className="btn-primary">
            <Plus className="h-4 w-4" />
            Add New Blog
          </button>
        </div>
      </section>

      <BlogLandingPageEditor group={group} />

      {loadError ? (
        <section className="rounded-3xl border border-amber-200 bg-amber-50/60 p-6 text-sm text-amber-900 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-700">
            Blog API Issue
          </div>
          <p className="mt-2">{loadError}</p>
        </section>
      ) : null}

      {isLoading ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
          Loading blog posts...
        </section>
      ) : null}

      {!isLoading && posts.length ? (
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-5">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Existing Blogs
              </div>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">
                {posts.length} {posts.length === 1 ? "article" : "articles"} on {group.pageLabel}
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Use the row actions to edit one blog at a time. Draft posts stay hidden from the
                public site until you publish and save them.
              </p>
            </div>

            {selectedPost ? (
              <button
                type="button"
                onClick={() => setSelectedPostId(null)}
                className="btn-secondary"
              >
                <X className="h-4 w-4" />
                Close Editor
              </button>
            ) : null}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50/80">
                <tr className="text-left text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  <th className="px-6 py-4">Featured Image</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Published</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {posts.map((post) => (
                  <BlogPostListRow
                    key={post.id}
                    post={post}
                    isSelected={selectedPostId === post.id}
                    onEdit={() => setSelectedPostId(post.id)}
                    onDelete={() => void removePost(post)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {!isLoading && !loadError && !posts.length ? (
        <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
          No blog posts yet on the <span className="font-semibold text-slate-700">{group.pageLabel}</span>.
          Use <span className="font-semibold text-slate-700">Add New Blog</span> to create the first article.
        </section>
      ) : null}

      {!isLoading && !loadError && posts.length ? (
        selectedPost ? (
          <BlogPostEditor
            key={selectedPost.id}
            activeBlogGroup={blogGroup}
            post={selectedPost}
            onReload={reload}
            onDelete={removePost}
            onClose={() => setSelectedPostId(null)}
          />
        ) : (
          <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
            Select a blog row above to edit its content, SEO, sections, FAQs, and related links.
          </section>
        )
      ) : null}
    </div>
  );
}

function BlogLandingPageEditor({ group }: { group: BlogGroupConfig }) {
  const [page, setPage] = useState<CmsPage | null>(null);
  const [storiesDraft, setStoriesDraft] = useState<CmsSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadPage = async () => {
    setIsLoading(true);

    try {
      const loadedPage = await pageService.get(group.pageKey);
      const storiesSection =
        loadedPage.sections.find((section) => section.sectionKey === group.landingStorySectionKey) ?? null;

      setPage(loadedPage);
      setStoriesDraft(storiesSection);
      setLoadError(null);
    } catch (error) {
      setPage(null);
      setStoriesDraft(null);
      setLoadError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadPage();
  }, [group.pageKey]);

  const saveSections = async () => {
    if (!storiesDraft) {
      toast.error("The Latest stories section is missing for this page.");
      return;
    }

    setIsSaving(true);

    try {
      await pageService.updateSection(storiesDraft.id, storiesDraft);
      toast.success("Frontend blog section updated");
      await loadPage();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
            Frontend Sections
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            Edit the live {group.pageLabel} layout
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-500">
            This field group controls the exact section currently shown on the public blog page:
            the <span className="font-semibold text-slate-700">Latest stories</span> intro above the live post cards.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link to={`/pages/${group.pageKey}`} className="btn-secondary">
            Open Full Page Editor
          </Link>
          <button type="button" onClick={() => void saveSections()} className="btn-primary" disabled={isSaving || isLoading}>
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Frontend Sections"}
          </button>
        </div>
      </div>

      {loadError ? (
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {loadError}
        </div>
      ) : null}

      {isLoading ? (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
          Loading frontend section editor...
        </div>
      ) : null}

      {!isLoading && storiesDraft ? (
        <div className="mt-6">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Latest Stories Section
            </div>
            <div className="mt-4 grid gap-4">
              <label className="field">
                <span>Section label</span>
                <input
                  value={storiesDraft.subheading ?? ""}
                  onChange={(event) =>
                    setStoriesDraft((current) =>
                      current ? { ...current, subheading: event.target.value } : current,
                    )
                  }
                />
              </label>
              <label className="field">
                <span>Section title</span>
                <input
                  value={storiesDraft.heading ?? ""}
                  onChange={(event) =>
                    setStoriesDraft((current) =>
                      current ? { ...current, heading: event.target.value } : current,
                    )
                  }
                />
              </label>
              <label className="field">
                <span>Description</span>
                <textarea
                  rows={5}
                  value={storiesDraft.description ?? ""}
                  onChange={(event) =>
                    setStoriesDraft((current) =>
                      current ? { ...current, description: event.target.value } : current,
                    )
                  }
                />
              </label>
            </div>
          </div>
        </div>
      ) : null}

      {page ? (
        <p className="mt-5 text-xs uppercase tracking-[0.2em] text-sky-600">
          Connected CMS page key: {page.pageKey}
        </p>
      ) : null}
    </section>
  );
}

function BlogGroupOverview() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
          Blog Pages
        </div>
        <h1 className="mt-2 text-3xl font-semibold">Choose a blog page to manage</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-500">
          The admin now has separate blog managers for HRMS, Bulk Email, and Asset Management so each
          frontend blog section can keep its own articles, descriptions, and SEO content.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {BLOG_GROUPS.map((group) => (
          <article key={group.key} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-sky-50 text-sky-600">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              {group.shortLabel}
            </div>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">{group.label}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">{group.description}</p>
            <p className="mt-4 break-all text-xs font-medium uppercase tracking-[0.2em] text-sky-600">
              {group.blogPath}
            </p>
            <Link to={getBlogAdminRoute(group.key)} className="btn-primary mt-5">
              Open Blog Manager
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

function BlogPostListRow({
  post,
  isSelected,
  onEdit,
  onDelete,
}: {
  post: BlogPost;
  isSelected: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const publicBlogUrl = post.publicUrl ?? post.href;
  const group = getBlogGroupConfig(post.blogGroup);

  return (
    <tr className={isSelected ? "bg-sky-50/50" : "hover:bg-slate-50/60"}>
      <td className="px-6 py-5 align-top">
        <div className="grid h-18 w-18 place-items-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
          {post.coverImageUrl ? (
            <img
              src={post.coverImageUrl}
              alt={post.coverImageAlt ?? post.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="grid gap-1 text-center text-slate-400">
              <ImageOff className="mx-auto h-5 w-5" />
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em]">
                {group.shortLabel}
              </span>
            </div>
          )}
        </div>
      </td>

      <td className="px-6 py-5 align-top">
        <div className="max-w-xl">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-xl font-semibold text-slate-900">{post.title}</div>
            {isSelected ? (
              <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-sky-700">
                Editing
              </span>
            ) : null}
          </div>
          <div className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            {post.slug}
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-500">{getBlogPreviewText(post)}</p>
        </div>
      </td>

      <td className="px-6 py-5 align-top">
        <div className="text-sm font-medium text-slate-900">{post.category}</div>
        <div className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">{group.shortLabel}</div>
      </td>

      <td className="px-6 py-5 align-top">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-900">
          <CalendarDays className="h-4 w-4 text-slate-400" />
          {formatPublishedLabel(post.publishedAt)}
        </div>
      </td>

      <td className="px-6 py-5 align-top">
        <span
          className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold capitalize ${getStatusBadgeClass(post.status)}`}
        >
          {post.status}
        </span>
      </td>

      <td className="px-6 py-5 align-top">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onEdit}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border transition ${
              isSelected
                ? "border-sky-200 bg-sky-50 text-sky-700"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
            title="Edit blog"
            aria-label="Edit blog"
          >
            <PencilLine className="h-4 w-4" />
          </button>

          {post.status === "published" ? (
            <a
              href={publicBlogUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
              title="Open public blog"
              aria-label="Open public blog"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : (
            <button
              type="button"
              className="inline-flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-300"
              title="Publish and save this post first to open it on the public site."
              disabled
              aria-label="Open public blog disabled"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onDelete}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 text-rose-600 transition hover:bg-rose-100"
            title="Delete blog"
            aria-label="Delete blog"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

function BlogPostEditor({
  activeBlogGroup,
  post,
  onReload,
  onDelete,
  onClose,
}: {
  activeBlogGroup: BlogGroup;
  post: BlogPost;
  onReload: () => Promise<void>;
  onDelete: (post: Pick<BlogPost, "id" | "title">) => Promise<void>;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<BlogPost>(post);
  const publicBlogUrl = draft.publicUrl ?? draft.href;

  useEffect(() => {
    setDraft(post);
  }, [post]);

  const savePost = async () => {
    try {
      await blogPostService.update(draft.id, {
        ...draft,
        publishedAt: fromDateTimeLocal(toDateTimeLocal(draft.publishedAt)),
      });
      toast.success("Blog post saved");
      await onReload();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <article
      id={`blog-editor-${draft.id}`}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
            Editing Selected Blog
          </div>
          <h2 className="mt-2 text-2xl font-semibold">{draft.title}</h2>
          <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            <span>{draft.slug}</span>
            <span>{getBlogGroupConfig(draft.blogGroup ?? activeBlogGroup).shortLabel}</span>
            <span>{draft.status}</span>
            <span>{draft.readingTimeLabel || "Reading time"}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={onClose} className="btn-secondary">
            <X className="h-4 w-4" />
            Close
          </button>
          {draft.status === "published" ? (
            <a
              href={publicBlogUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              <ExternalLink className="h-4 w-4" />
              Open Blog
            </a>
          ) : (
            <button
              type="button"
              className="btn-secondary cursor-not-allowed opacity-60"
              title="Publish and save this post to open it on the public site."
              disabled
            >
              <ExternalLink className="h-4 w-4" />
              Open Blog
            </button>
          )}
          <button type="button" onClick={() => void savePost()} className="btn-primary">
            <Save className="h-4 w-4" />
            Save Blog
          </button>
          <button type="button" onClick={() => void onDelete(draft)} className="btn-danger">
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="field">
          <span>Blog title</span>
          <input
            value={draft.title}
            onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
          />
        </label>
        <label className="field">
          <span>Slug</span>
          <input
            value={draft.slug}
            onChange={(event) => setDraft((current) => ({ ...current, slug: event.target.value }))}
          />
        </label>
        <label className="field">
          <span>Blog page</span>
          <select
            value={draft.blogGroup ?? activeBlogGroup}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                blogGroup: event.target.value as BlogGroup,
              }))
            }
          >
            {BLOG_GROUPS.map((group) => (
              <option key={group.key} value={group.key}>
                {group.label}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Category</span>
          <input
            value={draft.category}
            onChange={(event) =>
              setDraft((current) => ({ ...current, category: event.target.value }))
            }
          />
        </label>
        <label className="field">
          <span>Reading time</span>
          <input
            value={draft.readingTimeLabel ?? ""}
            onChange={(event) =>
              setDraft((current) => ({ ...current, readingTimeLabel: event.target.value }))
            }
          />
        </label>
        <label className="field">
          <span>Display order</span>
          <input
            type="number"
            value={draft.displayOrder}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                displayOrder: Number(event.target.value),
              }))
            }
          />
        </label>
        <label className="field">
          <span>Status</span>
          <select
            value={draft.status}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                status: event.target.value as BlogPost["status"],
              }))
            }
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <span className="text-xs text-slate-500">
            Draft posts stay in admin only. Switch to Published and save to show them on the public site.
          </span>
        </label>
        <label className="field">
          <span>Publish date</span>
          <input
            type="datetime-local"
            value={toDateTimeLocal(draft.publishedAt)}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                publishedAt: fromDateTimeLocal(event.target.value),
              }))
            }
          />
        </label>
        <ImageUploadField
          label="Cover image"
          value={draft.coverImageUrl ?? ""}
          onChange={(value) =>
            setDraft((current) => ({ ...current, coverImageUrl: value }))
          }
          altText={draft.coverImageAlt ?? ""}
          onAltTextChange={(value) =>
            setDraft((current) => ({ ...current, coverImageAlt: value }))
          }
        />
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <div className="text-sm font-semibold text-slate-900">SEO metadata</div>
        <div className="mt-4 grid gap-4">
          <label className="field">
            <span>Meta title</span>
            <input
              value={draft.metaTitle}
              onChange={(event) =>
                setDraft((current) => ({ ...current, metaTitle: event.target.value }))
              }
            />
          </label>
          <label className="field">
            <span>Meta description</span>
            <textarea
              rows={3}
              value={draft.metaDescription}
              onChange={(event) =>
                setDraft((current) => ({ ...current, metaDescription: event.target.value }))
              }
            />
          </label>
        </div>
      </div>

      <HtmlField
        label="Blog listing description"
        helper="HTML links are supported. Example: <a href=&quot;https://example.com&quot; target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;>Read more</a>"
        value={draft.descriptionHtml ?? ""}
        onChange={(value) => setDraft((current) => ({ ...current, descriptionHtml: value }))}
      />

      <HtmlField
        label="Hero summary"
        helper="This appears near the top of the article page."
        value={draft.heroSummaryHtml ?? ""}
        onChange={(value) => setDraft((current) => ({ ...current, heroSummaryHtml: value }))}
      />

      <HtmlField
        label="Quick answer"
        helper="Short answer block shown near the top of the article."
        value={draft.quickAnswerHtml ?? ""}
        onChange={(value) => setDraft((current) => ({ ...current, quickAnswerHtml: value }))}
      />

      <StringListEditor
        title="Hero points"
        values={draft.heroPoints}
        onChange={(values) => setDraft((current) => ({ ...current, heroPoints: values }))}
      />

      <StringListEditor
        title="Key takeaways"
        values={draft.keyTakeaways}
        onChange={(values) => setDraft((current) => ({ ...current, keyTakeaways: values }))}
      />

      <SectionsEditor
        sections={draft.sections}
        onChange={(sections) => setDraft((current) => ({ ...current, sections }))}
      />

      <FaqEditor
        faqs={draft.faqs}
        onChange={(faqs) => setDraft((current) => ({ ...current, faqs }))}
      />

      <RelatedLinksEditor
        links={draft.relatedLinks}
        onChange={(relatedLinks) => setDraft((current) => ({ ...current, relatedLinks }))}
      />
    </article>
  );
}

function HtmlField({
  label,
  helper,
  value,
  onChange,
}: {
  label: string;
  helper: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <label className="field">
        <span>{label}</span>
        <textarea rows={5} value={value} onChange={(event) => onChange(event.target.value)} />
      </label>
      <p className="mt-3 text-xs leading-6 text-slate-500">{helper}</p>
    </div>
  );
}

function StringListEditor({
  title,
  values,
  onChange,
}: {
  title: string;
  values: string[];
  onChange: (values: string[]) => void;
}) {
  const updateValue = (index: number, nextValue: string) => {
    const nextValues = [...values];
    nextValues[index] = nextValue;
    onChange(nextValues);
  };

  return (
    <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <button type="button" onClick={() => onChange([...values, "New item"])} className="btn-secondary">
          <Plus className="h-4 w-4" />
          Add Item
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {values.map((value, index) => (
          <div key={`${title}-${index}`} className="grid gap-3 md:grid-cols-[1fr_auto]">
            <input
              className="field-input"
              value={value}
              onChange={(event) => updateValue(index, event.target.value)}
            />
            <button
              type="button"
              onClick={() => onChange(values.filter((_, itemIndex) => itemIndex !== index))}
              className="btn-danger"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionsEditor({
  sections,
  onChange,
}: {
  sections: BlogSection[];
  onChange: (sections: BlogSection[]) => void;
}) {
  const updateSection = (index: number, nextValue: BlogSection) => {
    const nextSections = [...sections];
    nextSections[index] = nextValue;
    onChange(nextSections);
  };

  return (
    <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-slate-900">Article sections</div>
          <p className="mt-1 text-xs leading-6 text-slate-500">
            Build the article like the current blog structure: section title, anchor id, rich body,
            bullet points, and optional comparison table.
          </p>
        </div>
        <button type="button" onClick={() => onChange([...sections, createBlankSection()])} className="btn-secondary">
          <Plus className="h-4 w-4" />
          Add Section
        </button>
      </div>

      <div className="mt-5 space-y-4">
        {sections.map((section, index) => (
          <div key={`${section.id}-${index}`} className="rounded-3xl border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm font-semibold text-slate-900">{section.title}</div>
              <button
                type="button"
                onClick={() => onChange(sections.filter((_, itemIndex) => itemIndex !== index))}
                className="btn-danger"
              >
                Delete
              </button>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="field">
                <span>Section title</span>
                <input
                  value={section.title}
                  onChange={(event) =>
                    updateSection(index, { ...section, title: event.target.value })
                  }
                />
              </label>
              <label className="field">
                <span>Anchor id</span>
                <input
                  value={section.id}
                  onChange={(event) =>
                    updateSection(index, { ...section, id: event.target.value })
                  }
                />
              </label>
            </div>

            <label className="field mt-4">
              <span>Section body HTML</span>
              <textarea
                rows={6}
                value={section.bodyHtml ?? ""}
                onChange={(event) =>
                  updateSection(index, { ...section, bodyHtml: event.target.value })
                }
              />
            </label>

            <StringListEditor
              title="Section bullet points"
              values={section.bullets}
              onChange={(bullets) => updateSection(index, { ...section, bullets })}
            />

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-900">Optional table</div>
              <div className="mt-4 grid gap-4">
                <label className="field">
                  <span>Headers (one per line)</span>
                  <textarea
                    rows={3}
                    value={(section.table?.headers ?? []).join("\n")}
                    onChange={(event) =>
                      updateSection(index, {
                        ...section,
                        table: {
                          headers: event.target.value
                            .split("\n")
                            .map((item) => item.trim())
                            .filter(Boolean),
                          rows: section.table?.rows ?? [],
                        },
                      })
                    }
                  />
                </label>
                <label className="field">
                  <span>Rows (one row per line, use | between columns)</span>
                  <textarea
                    rows={5}
                    value={(section.table?.rows ?? []).map((row) => row.join(" | ")).join("\n")}
                    onChange={(event) =>
                      updateSection(index, {
                        ...section,
                        table: {
                          headers: section.table?.headers ?? [],
                          rows: event.target.value
                            .split("\n")
                            .map((row) =>
                              row
                                .split("|")
                                .map((cell) => cell.trim())
                                .filter(Boolean),
                            )
                            .filter((row) => row.length),
                        },
                      })
                    }
                  />
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FaqEditor({
  faqs,
  onChange,
}: {
  faqs: BlogFaq[];
  onChange: (faqs: BlogFaq[]) => void;
}) {
  const updateFaq = (index: number, nextValue: BlogFaq) => {
    const nextFaqs = [...faqs];
    nextFaqs[index] = nextValue;
    onChange(nextFaqs);
  };

  return (
    <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-semibold text-slate-900">FAQs</div>
        <button type="button" onClick={() => onChange([...faqs, createBlankFaq()])} className="btn-secondary">
          <Plus className="h-4 w-4" />
          Add FAQ
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {faqs.map((faq, index) => (
          <div key={`${faq.question}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => onChange(faqs.filter((_, itemIndex) => itemIndex !== index))}
                className="btn-danger"
              >
                Delete
              </button>
            </div>
            <label className="field mt-2">
              <span>Question</span>
              <input
                value={faq.question}
                onChange={(event) =>
                  updateFaq(index, { ...faq, question: event.target.value })
                }
              />
            </label>
            <label className="field mt-4">
              <span>Answer</span>
              <textarea
                rows={3}
                value={faq.answer}
                onChange={(event) => updateFaq(index, { ...faq, answer: event.target.value })}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

function RelatedLinksEditor({
  links,
  onChange,
}: {
  links: BlogRelatedLink[];
  onChange: (links: BlogRelatedLink[]) => void;
}) {
  const updateLink = (index: number, nextValue: BlogRelatedLink) => {
    const nextLinks = [...links];
    nextLinks[index] = nextValue;
    onChange(nextLinks);
  };

  return (
    <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-semibold text-slate-900">Related links</div>
        <button type="button" onClick={() => onChange([...links, createBlankRelatedLink()])} className="btn-secondary">
          <Plus className="h-4 w-4" />
          Add Related Link
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {links.map((link, index) => (
          <div key={`${link.label}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => onChange(links.filter((_, itemIndex) => itemIndex !== index))}
                className="btn-danger"
              >
                Delete
              </button>
            </div>
            <div className="mt-2 grid gap-4 md:grid-cols-2">
              <label className="field">
                <span>Label</span>
                <input
                  value={link.label}
                  onChange={(event) =>
                    updateLink(index, { ...link, label: event.target.value })
                  }
                />
              </label>
              <label className="field">
                <span>Href</span>
                <input
                  value={link.href}
                  onChange={(event) =>
                    updateLink(index, { ...link, href: event.target.value })
                  }
                />
              </label>
            </div>
            <label className="field mt-4">
              <span>Description</span>
              <textarea
                rows={3}
                value={link.description ?? ""}
                onChange={(event) =>
                  updateLink(index, { ...link, description: event.target.value })
                }
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
