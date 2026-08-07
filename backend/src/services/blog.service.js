import { Op } from "sequelize";
import { models } from "../config/database.js";
import env from "../config/env.js";
import { AppError } from "../utils/AppError.js";
import { sanitizeRichText } from "../middleware/sanitizeRequest.js";
import { slugify } from "../utils/slugify.js";
import { blogSeedPosts, getBlogSeedPostBySlug } from "../../../shared/blog/index.js";

const BLOG_GROUPS = new Set(["hrms", "bulk-email", "asset-management"]);
const BLOG_GROUP_PATHS = {
  hrms: "/hrms/resources/blog",
  "bulk-email": "/bulk-email/resources/blog",
  "asset-management": "/asset-management/resources/blog",
};

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function paragraphToHtml(paragraph) {
  const normalized = normalizeText(paragraph);
  return normalized ? `<p>${normalized}</p>` : "";
}

function paragraphsToHtml(paragraphs = []) {
  if (!Array.isArray(paragraphs)) {
    return null;
  }

  const html = paragraphs.map((paragraph) => paragraphToHtml(paragraph)).filter(Boolean).join("");
  return html || null;
}

function normalizeBlogGroup(value, fallback = "hrms") {
  return BLOG_GROUPS.has(value) ? value : fallback;
}

async function findExistingBlogPostBySlug(slug, currentId = null) {
  if (!slug) {
    return null;
  }

  return models.BlogPost.findOne({
    where: {
      slug,
      ...(currentId ? { id: { [Op.ne]: currentId } } : {}),
    },
    attributes: ["id"],
    paranoid: false,
  });
}

async function buildUniqueBlogSlug(baseSlug) {
  const normalizedBaseSlug = slugify(baseSlug) || `blog-post-${Date.now()}`;
  let candidateSlug = normalizedBaseSlug;
  let suffix = 2;

  while (await findExistingBlogPostBySlug(candidateSlug)) {
    candidateSlug = `${normalizedBaseSlug}-${suffix}`;
    suffix += 1;
  }

  return candidateSlug;
}

function sanitizeStringList(values = []) {
  if (!Array.isArray(values)) {
    return [];
  }

  return values
    .map((value) => normalizeText(value))
    .filter(Boolean);
}

function sanitizeOptionalRichText(value) {
  const normalized = normalizeText(value);
  return normalized ? sanitizeRichText(normalized) : null;
}

function sanitizeTable(table) {
  if (!table || typeof table !== "object") {
    return null;
  }

  const headers = sanitizeStringList(table.headers);
  const rows = Array.isArray(table.rows)
    ? table.rows
        .map((row) =>
          Array.isArray(row)
            ? row.map((cell) => normalizeText(cell))
            : [],
        )
        .filter((row) => row.some(Boolean))
    : [];

  if (!headers.length && !rows.length) {
    return null;
  }

  return { headers, rows };
}

function sanitizeSections(sections = []) {
  if (!Array.isArray(sections)) {
    return [];
  }

  return sections
    .map((section, index) => {
      const title = normalizeText(section?.title);

      if (!title) {
        return null;
      }

      return {
        id: normalizeText(section.id) || slugify(title) || `section-${index + 1}`,
        title,
        bodyHtml: sanitizeOptionalRichText(section.bodyHtml),
        bullets: sanitizeStringList(section.bullets),
        table: sanitizeTable(section.table),
      };
    })
    .filter(Boolean);
}

function sanitizeFaqs(faqs = []) {
  if (!Array.isArray(faqs)) {
    return [];
  }

  return faqs
    .map((faq) => {
      const question = normalizeText(faq?.question);
      const answer = sanitizeOptionalRichText(faq?.answer);

      if (!question || !answer) {
        return null;
      }

      return {
        question,
        answer,
      };
    })
    .filter(Boolean);
}

function sanitizeRelatedLinks(links = []) {
  if (!Array.isArray(links)) {
    return [];
  }

  return links
    .map((link) => {
      const label = normalizeText(link?.label);
      const href = normalizeText(link?.href);

      if (!label || !href) {
        return null;
      }

      return {
        label,
        href,
        description: normalizeText(link?.description) || null,
      };
    })
    .filter(Boolean);
}

function parsePublishedAt(value, status) {
  const normalized = normalizeText(value);

  if (!normalized) {
    return status === "published" ? new Date() : null;
  }

  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function extractReadingTimeLabel(seedPost) {
  const explicitValue = normalizeText(seedPost.readingTimeLabel);

  if (explicitValue) {
    return explicitValue;
  }

  const match = normalizeText(seedPost.meta).match(/Reading time:\s*([^|]+)/i);
  return match?.[1]?.trim() ?? null;
}

function mapSeedBlogPostToPayload(seedPost, index = 0) {
  return {
    title: seedPost.title,
    slug: seedPost.slug,
    blogGroup: normalizeBlogGroup(seedPost.blogGroup, "hrms"),
    category: seedPost.category,
    readingTimeLabel: extractReadingTimeLabel(seedPost),
    descriptionHtml: paragraphsToHtml([seedPost.description]),
    metaTitle: seedPost.metaTitle ?? seedPost.title,
    metaDescription: seedPost.metaDescription ?? seedPost.description,
    heroSummaryHtml: paragraphsToHtml([seedPost.heroSummary]),
    quickAnswerHtml: paragraphsToHtml([seedPost.quickAnswer]),
    heroPoints: seedPost.heroPoints ?? [],
    keyTakeaways: seedPost.keyTakeaways ?? [],
    sections: (seedPost.sections ?? []).map((section) => ({
      id: section.id,
      title: section.title,
      bodyHtml: paragraphsToHtml(section.paragraphs ?? []),
      bullets: section.bullets ?? [],
      table: section.table ?? null,
    })),
    faqs: (seedPost.faqs ?? []).map((faq) => ({
      question: faq.q,
      answer: faq.a,
    })),
    relatedLinks: (seedPost.relatedLinks ?? []).map((link) => ({
      label: link.label,
      href: link.href,
      description: link.description,
    })),
    coverImageUrl: seedPost.coverImage ?? null,
    coverImageAlt: seedPost.coverImageAlt ?? null,
    status: seedPost.status ?? "published",
    displayOrder: seedPost.displayOrder ?? index,
    publishedAt: seedPost.publishedAt ?? null,
  };
}

async function createSeedBlogPost(seedPost, index = 0) {
  await models.BlogPost.create(normalizeBlogPayload(mapSeedBlogPostToPayload(seedPost, index)));
}

async function ensureAllSeedBlogPostsExist() {
  const existingPosts = await models.BlogPost.findAll({
    attributes: ["slug"],
  });
  const existingSlugs = new Set(existingPosts.map((post) => post.slug));

  for (const [index, seedPost] of blogSeedPosts.entries()) {
    if (!existingSlugs.has(seedPost.slug)) {
      await createSeedBlogPost(seedPost, index);
      existingSlugs.add(seedPost.slug);
    }
  }
}

async function ensureSeedBlogPostExists(slug) {
  const existingPost = await models.BlogPost.findOne({
    where: { slug },
    attributes: ["id"],
  });

  if (existingPost) {
    return;
  }

  const seedPost = getBlogSeedPostBySlug(slug);

  if (seedPost) {
    const seedIndex = blogSeedPosts.findIndex((post) => post.slug === slug);
    await createSeedBlogPost(seedPost, seedIndex >= 0 ? seedIndex : 0);
  }
}

export function serializeBlogPost(post) {
  const blogGroup = normalizeBlogGroup(post.blog_group, "hrms");
  const href = `${BLOG_GROUP_PATHS[blogGroup]}/${post.slug}`;

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    href,
    publicUrl: new URL(href, env.FRONTEND_URL).href,
    blogGroup,
    category: post.category,
    readingTimeLabel: post.reading_time_label,
    descriptionHtml: post.description_html,
    metaTitle: post.meta_title,
    metaDescription: post.meta_description,
    heroSummaryHtml: post.hero_summary_html,
    quickAnswerHtml: post.quick_answer_html,
    heroPoints: post.hero_points_json ?? [],
    keyTakeaways: post.key_takeaways_json ?? [],
    sections: post.sections_json ?? [],
    faqs: post.faqs_json ?? [],
    relatedLinks: post.related_links_json ?? [],
    coverImageUrl: post.cover_image_url,
    coverImageAlt: post.cover_image_alt,
    status: post.status,
    displayOrder: post.display_order,
    publishedAt: post.published_at ? post.published_at.toISOString() : null,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
}

export async function listBlogPosts({ publishedOnly = false, blogGroup } = {}) {
  await ensureAllSeedBlogPostsExist();

  const normalizedGroup = normalizeBlogGroup(blogGroup, "");
  const posts = await models.BlogPost.findAll({
    where: {
      ...(publishedOnly ? { status: "published" } : {}),
      ...(normalizedGroup ? { blog_group: normalizedGroup } : {}),
    },
    order: [
      ["display_order", "ASC"],
      ["published_at", "DESC"],
      ["updated_at", "DESC"],
    ],
  });

  return posts.map(serializeBlogPost);
}

export async function getBlogPostById(id) {
  const post = await models.BlogPost.findByPk(id);

  if (!post) {
    throw new AppError("Blog post not found", 404);
  }

  return post;
}

export async function getBlogPostBySlug(slug, { publishedOnly = false } = {}) {
  await ensureSeedBlogPostExists(slug);

  const post = await models.BlogPost.findOne({
    where: {
      slug,
      ...(publishedOnly ? { status: "published" } : {}),
    },
  });

  if (!post) {
    throw new AppError("Blog post not found", 404);
  }

  return post;
}

function normalizeBlogPayload(payload = {}, currentPost = null) {
  const status = payload.status ?? currentPost?.status ?? "draft";
  const blogGroup = normalizeBlogGroup(payload.blogGroup, currentPost?.blog_group ?? "hrms");

  return {
    title: payload.title ?? currentPost?.title ?? "",
    slug: payload.slug
      ? slugify(payload.slug)
      : currentPost?.slug ?? slugify(payload.title ?? currentPost?.title ?? ""),
    blog_group: blogGroup,
    category: payload.category ?? currentPost?.category ?? "General",
    reading_time_label: normalizeText(payload.readingTimeLabel) || null,
    description_html: sanitizeOptionalRichText(payload.descriptionHtml),
    meta_title: payload.metaTitle ?? currentPost?.meta_title ?? "",
    meta_description: payload.metaDescription ?? currentPost?.meta_description ?? "",
    hero_summary_html: sanitizeOptionalRichText(payload.heroSummaryHtml),
    quick_answer_html: sanitizeOptionalRichText(payload.quickAnswerHtml),
    hero_points_json: sanitizeStringList(payload.heroPoints),
    key_takeaways_json: sanitizeStringList(payload.keyTakeaways),
    sections_json: sanitizeSections(payload.sections),
    faqs_json: sanitizeFaqs(payload.faqs),
    related_links_json: sanitizeRelatedLinks(payload.relatedLinks),
    cover_image_url: normalizeText(payload.coverImageUrl) || null,
    cover_image_alt: normalizeText(payload.coverImageAlt) || null,
    status,
    display_order: payload.displayOrder ?? currentPost?.display_order ?? 0,
    published_at:
      parsePublishedAt(payload.publishedAt, status) ??
      currentPost?.published_at ??
      null,
  };
}

export async function createBlogPost(payload) {
  const normalizedPayload = normalizeBlogPayload(payload);
  normalizedPayload.slug = await buildUniqueBlogSlug(normalizedPayload.slug);

  const post = await models.BlogPost.create(normalizedPayload);
  return serializeBlogPost(await getBlogPostById(post.id));
}

export async function updateBlogPost(id, payload) {
  const post = await getBlogPostById(id);
  const normalizedPayload = normalizeBlogPayload(payload, post);
  const existingPostWithSlug = await findExistingBlogPostBySlug(normalizedPayload.slug, post.id);

  if (existingPostWithSlug) {
    throw new AppError(`Another blog post already uses the slug "${normalizedPayload.slug}"`, 400, [
      {
        path: "slug",
        message: "Slug must be unique",
      },
    ]);
  }

  await post.update(normalizedPayload);
  return serializeBlogPost(await getBlogPostById(id));
}

export async function deleteBlogPost(id) {
  const post = await getBlogPostById(id);
  await post.destroy();
}
