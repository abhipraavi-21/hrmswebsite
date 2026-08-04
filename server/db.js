import "./loadEnv.js";
import fs from "fs";
import mysql from "mysql2/promise";

import { blogSeed } from "./seed/blogSeed.js";

const MYSQL_HOST = process.env.MYSQL_HOST || "127.0.0.1";
const MYSQL_PORT = Number(process.env.MYSQL_PORT || 3306);
const MYSQL_USER = process.env.MYSQL_USER || "root";
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "";
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "hrms";
const MYSQL_ENABLE_SSL =
  process.env.MYSQL_ENABLE_SSL === "true" || process.env.TIDB_ENABLE_SSL === "true";
const MYSQL_CA_PATH = process.env.MYSQL_CA_PATH || process.env.TIDB_CA_PATH || "";

let pool;

function getDatabaseSslConfig() {
  if (!MYSQL_ENABLE_SSL) {
    return undefined;
  }

  return {
    minVersion: "TLSv1.2",
    ca: MYSQL_CA_PATH ? fs.readFileSync(MYSQL_CA_PATH) : undefined,
  };
}

function stringifyJson(value) {
  return JSON.stringify(value ?? []);
}

function parseJson(value, fallback) {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function parseStoredSnapshot(value) {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function buildDefaultPublicSiteState() {
  return {
    content: [],
    seo: [],
    siteSettings: {
      companyName: "Altroz HR",
      supportEmail: "",
      salesEmail: "",
      defaultMetaDescription: "",
      canonicalBaseUrl: "",
      autoSave: false,
      darkModeDefault: false,
    },
    redirects: [],
    robotsTxt: "",
    sitemap: {
      status: "Needs review",
      lastGenerated: "",
      includedPages: 0,
      includedBlogs: 0,
      includedResources: 0,
      priorityMode: "Balanced",
      changeFrequency: "Weekly",
    },
    updatedAt: "",
  };
}

function isPublicWorkflowStatus(status) {
  return status === "Published" || status === "Approved";
}

function isPublicContentRecord(record) {
  if (!record || typeof record !== "object") {
    return false;
  }

  if (record.type === "Blog") {
    return record.status === "Published";
  }

  if (record.type === "Page") {
    return isPublicWorkflowStatus(record.status);
  }

  return isPublicWorkflowStatus(record.status);
}

export function buildPublicSiteState(adminState) {
  const fallback = buildDefaultPublicSiteState();

  if (!adminState || typeof adminState !== "object") {
    return fallback;
  }

  const content = Array.isArray(adminState.content)
    ? adminState.content.filter(isPublicContentRecord)
    : [];
  const contentById = new Map(content.map((item) => [item.id, item]));
  const seo = Array.isArray(adminState.seo)
    ? adminState.seo.filter((item) => {
        if (!item || typeof item !== "object" || typeof item.slug !== "string") {
          return false;
        }

        const linkedContent = contentById.get(item.entityId);
        if (linkedContent) {
          return true;
        }

        return item.entityType === "Page";
      })
    : [];

  return {
    content,
    seo,
    siteSettings:
      adminState.siteSettings && typeof adminState.siteSettings === "object"
        ? adminState.siteSettings
        : fallback.siteSettings,
    redirects: Array.isArray(adminState.redirects)
      ? adminState.redirects.filter((item) => item?.active)
      : [],
    robotsTxt: typeof adminState.robotsTxt === "string" ? adminState.robotsTxt : "",
    sitemap:
      adminState.sitemap && typeof adminState.sitemap === "object"
        ? adminState.sitemap
        : fallback.sitemap,
    updatedAt:
      Array.isArray(adminState.activities) && adminState.activities[0]?.dateTime
        ? adminState.activities[0].dateTime
        : "",
  };
}

export function mapRowToBlog(row) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    href: `/resources/blog/${row.slug}`,
    category: row.category,
    author: row.author,
    description: row.short_description,
    featuredImage: row.featured_image,
    featuredImageAlt: row.featured_image_alt,
    publishDate: row.publish_date
      ? new Date(row.publish_date).toISOString().slice(0, 10)
      : "",
    updatedDate: row.updated_date
      ? new Date(row.updated_date).toISOString().slice(0, 19).replace("T", " ")
      : "",
    readingTime: row.reading_time,
    tags: parseJson(row.tags, []),
    heroSummary: row.hero_summary,
    heroPoints: parseJson(row.hero_points, []),
    quickAnswer: row.quick_answer,
    keyTakeaways: parseJson(row.key_takeaways, []),
    sections: parseJson(row.sections, []),
    faqs: parseJson(row.faqs, []),
    relatedLinks: parseJson(row.related_links, []),
    status: row.status,
    focusKeyword: row.focus_keyword,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    canonicalUrl: row.canonical_url,
    ogTitle: row.og_title,
    ogDescription: row.og_description,
    ogImage: row.og_image,
    schemaData: JSON.stringify(parseJson(row.schema_data, {}), null, 2),
    schemaEnabled: Boolean(row.schema_enabled),
    searchIntent: row.search_intent,
    primaryEntity: row.primary_entity,
    aiSummary: row.ai_summary,
  };
}

function blogToInsertValues(blog) {
  return [
    blog.title,
    blog.slug,
    blog.category,
    blog.author,
    blog.description,
    blog.featuredImage,
    blog.featuredImageAlt,
    blog.publishDate || null,
    blog.updatedDate || new Date().toISOString().slice(0, 19).replace("T", " "),
    blog.readingTime,
    stringifyJson(blog.tags),
    blog.heroSummary,
    stringifyJson(blog.heroPoints),
    blog.quickAnswer,
    stringifyJson(blog.keyTakeaways),
    stringifyJson(blog.sections),
    stringifyJson(blog.faqs),
    stringifyJson(blog.relatedLinks),
    blog.status,
    blog.focusKeyword,
    blog.metaTitle,
    blog.metaDescription,
    blog.canonicalUrl,
    blog.ogTitle,
    blog.ogDescription,
    blog.ogImage,
    JSON.stringify(blog.schemaData ?? {}),
    blog.schemaEnabled ? 1 : 0,
    blog.searchIntent,
    blog.primaryEntity,
    blog.aiSummary,
  ];
}

export async function initializeDatabase() {
  const ssl = getDatabaseSslConfig();
  const adminConnection = await mysql.createConnection({
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    ssl,
  });

  try {
    await adminConnection.query(
      `CREATE DATABASE IF NOT EXISTS \`${MYSQL_DATABASE}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
  } catch (error) {
    console.warn(
      `Skipping database creation for "${MYSQL_DATABASE}". Ensure it already exists if your database user cannot create databases.`,
      error instanceof Error ? error.message : error,
    );
  }
  await adminConnection.end();

  pool = mysql.createPool({
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    ssl,
    waitForConnections: true,
    connectionLimit: 10,
  });

  await pool.query(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      category VARCHAR(120) NOT NULL,
      author VARCHAR(180) NOT NULL,
      short_description TEXT NOT NULL,
      featured_image VARCHAR(500) NULL,
      featured_image_alt VARCHAR(255) NULL,
      publish_date DATE NULL,
      updated_date DATETIME NOT NULL,
      reading_time VARCHAR(50) NOT NULL,
      tags JSON NULL,
      hero_summary TEXT NULL,
      hero_points JSON NULL,
      quick_answer TEXT NULL,
      key_takeaways JSON NULL,
      sections JSON NULL,
      faqs JSON NULL,
      related_links JSON NULL,
      status ENUM('Draft', 'In Review', 'Approved', 'Published', 'Scheduled', 'Archived') NOT NULL DEFAULT 'Draft',
      focus_keyword VARCHAR(180) NULL,
      meta_title VARCHAR(255) NULL,
      meta_description TEXT NULL,
      canonical_url VARCHAR(500) NULL,
      og_title VARCHAR(255) NULL,
      og_description TEXT NULL,
      og_image VARCHAR(500) NULL,
      schema_data JSON NULL,
      schema_enabled BOOLEAN NOT NULL DEFAULT TRUE,
      search_intent VARCHAR(180) NULL,
      primary_entity VARCHAR(180) NULL,
      ai_summary TEXT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_workspace_state (
      id TINYINT UNSIGNED PRIMARY KEY,
      snapshot LONGTEXT NOT NULL,
      modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  const [countRows] = await pool.query(
    "SELECT COUNT(*) AS count FROM blog_posts WHERE deleted_at IS NULL",
  );

  if (countRows[0].count === 0) {
    for (const blog of blogSeed) {
      await pool.query(
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
        blogToInsertValues(blog),
      );
    }
  }

  return pool;
}

export function getPool() {
  if (!pool) {
    throw new Error("Database pool has not been initialized.");
  }

  return pool;
}

export async function getAdminWorkspaceState() {
  const currentPool = getPool();
  const [rows] = await currentPool.query(
    "SELECT snapshot FROM admin_workspace_state WHERE id = 1 LIMIT 1",
  );

  return parseStoredSnapshot(rows[0]?.snapshot ?? "");
}

export async function saveAdminWorkspaceState(state) {
  const currentPool = getPool();
  const snapshot = JSON.stringify(state ?? {});

  await currentPool.query(
    `
      INSERT INTO admin_workspace_state (id, snapshot)
      VALUES (1, ?)
      ON DUPLICATE KEY UPDATE snapshot = VALUES(snapshot)
    `,
    [snapshot],
  );

  return state;
}
