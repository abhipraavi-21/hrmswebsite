import cors from "cors";
import express from "express";

import {
  buildPublicSiteState,
  getAdminWorkspaceState,
  getPool,
  initializeDatabase,
  mapRowToBlog,
  saveAdminWorkspaceState,
} from "./db.js";

const PORT = Number(process.env.PORT || process.env.API_PORT || 3001);
const BLOG_ADMIN_ROLES = [
  "Super Admin",
  "Admin",
  "Client Admin",
  "SEO Manager",
  "Content Writer",
  "Editor",
];
const statusValues = [
  "Draft",
  "In Review",
  "Approved",
  "Published",
  "Scheduled",
  "Archived",
];

function permissionDenied(res) {
  return res.status(403).json({
    success: false,
    message: "You do not have permission to perform this action.",
  });
}

function requireBlogAdmin(req, res, next) {
  const role = req.header("x-admin-role");

  if (!role || !BLOG_ADMIN_ROLES.includes(role)) {
    return permissionDenied(res);
  }

  req.adminRole = role;
  return next();
}

function safeJsonParse(value, fallback, label) {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    throw new Error(`Invalid JSON in ${label}.`);
  }
}

function normalizeText(value) {
  return `${value ?? ""}`.trim();
}

function sanitizeBlogPayload(body) {
  const sections = typeof body.sections === "string"
    ? safeJsonParse(body.sections, [], "sections")
    : body.sections ?? [];
  const faqs = typeof body.faqs === "string" ? safeJsonParse(body.faqs, [], "faqs") : body.faqs ?? [];
  const relatedLinks = typeof body.relatedLinks === "string"
    ? safeJsonParse(body.relatedLinks, [], "related links")
    : body.relatedLinks ?? [];
  const schemaValue = typeof body.schemaData === "string"
    ? safeJsonParse(body.schemaData, {}, "schema data")
    : body.schemaData ?? {};

  const payload = {
    title: normalizeText(body.title),
    slug: normalizeText(body.slug),
    category: normalizeText(body.category),
    author: normalizeText(body.author),
    description: normalizeText(body.description),
    featuredImage: normalizeText(body.featuredImage),
    featuredImageAlt: normalizeText(body.featuredImageAlt),
    publishDate: normalizeText(body.publishDate),
    updatedDate:
      normalizeText(body.updatedDate) || new Date().toISOString().slice(0, 19).replace("T", " "),
    readingTime: normalizeText(body.readingTime),
    tags: Array.isArray(body.tags)
      ? body.tags.map((item) => normalizeText(item)).filter(Boolean)
      : `${body.tags ?? ""}`
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
    heroSummary: normalizeText(body.heroSummary),
    heroPoints: Array.isArray(body.heroPoints)
      ? body.heroPoints.map((item) => normalizeText(item)).filter(Boolean)
      : `${body.heroPoints ?? ""}`
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
    quickAnswer: normalizeText(body.quickAnswer),
    keyTakeaways: Array.isArray(body.keyTakeaways)
      ? body.keyTakeaways.map((item) => normalizeText(item)).filter(Boolean)
      : `${body.keyTakeaways ?? ""}`
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
    sections,
    faqs,
    relatedLinks,
    status: normalizeText(body.status),
    focusKeyword: normalizeText(body.focusKeyword),
    metaTitle: normalizeText(body.metaTitle),
    metaDescription: normalizeText(body.metaDescription),
    canonicalUrl: normalizeText(body.canonicalUrl),
    ogTitle: normalizeText(body.ogTitle),
    ogDescription: normalizeText(body.ogDescription),
    ogImage: normalizeText(body.ogImage),
    schemaData: schemaValue,
    schemaEnabled: Boolean(body.schemaEnabled),
    searchIntent: normalizeText(body.searchIntent),
    primaryEntity: normalizeText(body.primaryEntity),
    aiSummary: normalizeText(body.aiSummary),
  };

  if (!payload.title || !payload.slug || !payload.category || !payload.author) {
    throw new Error("Title, slug, category, and author are required.");
  }

  if (!payload.description || !payload.readingTime || !payload.metaTitle || !payload.metaDescription) {
    throw new Error("Description, reading time, meta title, and meta description are required.");
  }

  if (!statusValues.includes(payload.status)) {
    throw new Error("Invalid workflow status.");
  }

  return payload;
}

function getInsertValues(blog) {
  return [
    blog.title,
    blog.slug,
    blog.category,
    blog.author,
    blog.description,
    blog.featuredImage,
    blog.featuredImageAlt,
    blog.publishDate || null,
    blog.updatedDate,
    blog.readingTime,
    JSON.stringify(blog.tags),
    blog.heroSummary,
    JSON.stringify(blog.heroPoints),
    blog.quickAnswer,
    JSON.stringify(blog.keyTakeaways),
    JSON.stringify(blog.sections),
    JSON.stringify(blog.faqs),
    JSON.stringify(blog.relatedLinks),
    blog.status,
    blog.focusKeyword,
    blog.metaTitle,
    blog.metaDescription,
    blog.canonicalUrl,
    blog.ogTitle,
    blog.ogDescription,
    blog.ogImage,
    JSON.stringify(blog.schemaData),
    blog.schemaEnabled ? 1 : 0,
    blog.searchIntent,
    blog.primaryEntity,
    blog.aiSummary,
  ];
}

function getUpdateValues(blog) {
  return [
    blog.title,
    blog.slug,
    blog.category,
    blog.author,
    blog.description,
    blog.featuredImage,
    blog.featuredImageAlt,
    blog.publishDate || null,
    blog.updatedDate,
    blog.readingTime,
    JSON.stringify(blog.tags),
    blog.heroSummary,
    JSON.stringify(blog.heroPoints),
    blog.quickAnswer,
    JSON.stringify(blog.keyTakeaways),
    JSON.stringify(blog.sections),
    JSON.stringify(blog.faqs),
    JSON.stringify(blog.relatedLinks),
    blog.status,
    blog.focusKeyword,
    blog.metaTitle,
    blog.metaDescription,
    blog.canonicalUrl,
    blog.ogTitle,
    blog.ogDescription,
    blog.ogImage,
    JSON.stringify(blog.schemaData),
    blog.schemaEnabled ? 1 : 0,
    blog.searchIntent,
    blog.primaryEntity,
    blog.aiSummary,
  ];
}

async function findBlogById(id) {
  const pool = getPool();
  const [rows] = await pool.query(
    "SELECT * FROM blog_posts WHERE id = ? AND deleted_at IS NULL LIMIT 1",
    [id],
  );

  return rows[0] ?? null;
}

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (_req, res) => {
  res.type("html").send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>HRMS API</title>
        <style>
          body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #f4f7fb;
            color: #14213d;
          }
          main {
            max-width: 720px;
            margin: 64px auto;
            background: #ffffff;
            border-radius: 20px;
            padding: 32px;
            box-shadow: 0 20px 60px rgba(20, 33, 61, 0.12);
          }
          h1 {
            margin-top: 0;
            font-size: 2rem;
          }
          p {
            line-height: 1.6;
          }
          ul {
            padding-left: 20px;
          }
          li {
            margin-bottom: 12px;
          }
          a {
            color: #1d4ed8;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .tag {
            display: inline-block;
            margin-bottom: 16px;
            padding: 6px 12px;
            border-radius: 999px;
            background: #dbeafe;
            color: #1d4ed8;
            font-size: 0.875rem;
            font-weight: 700;
            letter-spacing: 0.02em;
          }
        </style>
      </head>
      <body>
        <main>
          <span class="tag">Service Active</span>
          <h1>HRMS backend is running.</h1>
          <p>
            This Render service powers the admin panel, SEO panel, blogs, and public site state.
            The frontend should be opened from your Vercel website, while this URL is used for API access.
          </p>
          <ul>
            <li><a href="/api/health">/api/health</a> for health check</li>
            <li><a href="/api/site/state">/api/site/state</a> for public site data</li>
            <li><a href="/api/blogs">/api/blogs</a> for published blog data</li>
          </ul>
        </main>
      </body>
    </html>
  `);
});

app.get("/api/health", async (_req, res) => {
  res.json({
    success: true,
    message: "Blog API is healthy.",
  });
});

app.get("/api/site/state", async (_req, res) => {
  const workspaceState = await getAdminWorkspaceState();

  res.json({
    success: true,
    data: buildPublicSiteState(workspaceState),
  });
});

app.get("/api/admin/state", requireBlogAdmin, async (_req, res) => {
  const workspaceState = await getAdminWorkspaceState();

  res.json({
    success: true,
    data: workspaceState,
  });
});

app.put("/api/admin/state", requireBlogAdmin, async (req, res) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({
      success: false,
      message: "A valid admin workspace payload is required.",
    });
  }

  const nextState = await saveAdminWorkspaceState(req.body);

  return res.json({
    success: true,
    data: nextState,
  });
});

app.get("/api/blogs", async (_req, res) => {
  const pool = getPool();
  const [rows] = await pool.query(
    `
      SELECT *
      FROM blog_posts
      WHERE deleted_at IS NULL AND status = 'Published'
      ORDER BY COALESCE(publish_date, DATE(updated_date)) DESC, id DESC
    `,
  );

  res.json({
    success: true,
    data: rows.map(mapRowToBlog),
  });
});

app.get("/api/blogs/:slug", async (req, res) => {
  const pool = getPool();
  const [rows] = await pool.query(
    `
      SELECT *
      FROM blog_posts
      WHERE deleted_at IS NULL AND status = 'Published' AND slug = ?
      LIMIT 1
    `,
    [req.params.slug],
  );

  if (!rows.length) {
    return res.status(404).json({
      success: false,
      message: "Blog not found.",
    });
  }

  return res.json({
    success: true,
    data: mapRowToBlog(rows[0]),
  });
});

app.get("/api/admin/blogs", requireBlogAdmin, async (_req, res) => {
  const pool = getPool();
  const [rows] = await pool.query(
    `
      SELECT *
      FROM blog_posts
      WHERE deleted_at IS NULL
      ORDER BY COALESCE(publish_date, DATE(updated_date)) DESC, id DESC
    `,
  );

  res.json({
    success: true,
    data: rows.map(mapRowToBlog),
  });
});

app.post("/api/admin/blogs", requireBlogAdmin, async (req, res) => {
  try {
    const pool = getPool();
    const blog = sanitizeBlogPayload(req.body);
    const [result] = await pool.query(
      `
        INSERT INTO blog_posts (
          title, slug, category, author, short_description, featured_image, featured_image_alt,
          publish_date, updated_date, reading_time, tags, hero_summary, hero_points, quick_answer,
          key_takeaways, sections, faqs, related_links, status, focus_keyword, meta_title,
          meta_description, canonical_url, og_title, og_description, og_image, schema_data,
          schema_enabled, search_intent, primary_entity, ai_summary
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      getInsertValues(blog),
    );

    const created = await findBlogById(result.insertId);
    return res.status(201).json({
      success: true,
      data: mapRowToBlog(created),
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Unable to create blog.",
    });
  }
});

app.put("/api/admin/blogs/:id", requireBlogAdmin, async (req, res) => {
  try {
    const pool = getPool();
    const blog = sanitizeBlogPayload(req.body);
    await pool.query(
      `
        UPDATE blog_posts
        SET
          title = ?, slug = ?, category = ?, author = ?, short_description = ?, featured_image = ?,
          featured_image_alt = ?, publish_date = ?, updated_date = ?, reading_time = ?, tags = ?,
          hero_summary = ?, hero_points = ?, quick_answer = ?, key_takeaways = ?, sections = ?,
          faqs = ?, related_links = ?, status = ?, focus_keyword = ?, meta_title = ?,
          meta_description = ?, canonical_url = ?, og_title = ?, og_description = ?, og_image = ?,
          schema_data = ?, schema_enabled = ?, search_intent = ?, primary_entity = ?, ai_summary = ?
        WHERE id = ? AND deleted_at IS NULL
      `,
      [...getUpdateValues(blog), req.params.id],
    );

    const updated = await findBlogById(req.params.id);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    return res.json({
      success: true,
      data: mapRowToBlog(updated),
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Unable to update blog.",
    });
  }
});

app.patch("/api/admin/blogs/:id/status", requireBlogAdmin, async (req, res) => {
  const status = normalizeText(req.body.status);
  if (!statusValues.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid workflow status.",
    });
  }

  const pool = getPool();
  await pool.query(
    "UPDATE blog_posts SET status = ?, updated_date = ? WHERE id = ? AND deleted_at IS NULL",
    [status, new Date().toISOString().slice(0, 19).replace("T", " "), req.params.id],
  );

  const updated = await findBlogById(req.params.id);
  if (!updated) {
    return res.status(404).json({
      success: false,
      message: "Blog not found.",
    });
  }

  return res.json({
    success: true,
    data: mapRowToBlog(updated),
  });
});

app.delete("/api/admin/blogs/:id", requireBlogAdmin, async (req, res) => {
  const pool = getPool();
  await pool.query(
    "UPDATE blog_posts SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL",
    [req.params.id],
  );

  return res.json({
    success: true,
    data: {
      message: "Blog deleted successfully.",
    },
  });
});

async function start() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(
        `Blog API running on http://127.0.0.1:${PORT} using MySQL database "${process.env.MYSQL_DATABASE || "hrms"}".`,
      );
    });
  } catch (error) {
    console.error("Failed to start the blog API.", error);
    process.exit(1);
  }
}

start();
