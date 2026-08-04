# Altroz HR Admin and SEO Panel UAT Checklist

Date: August 4, 2026

## 0. API Sync Preparation

- Run the frontend: `npm run dev`
- Run the API server: `npm run server`
- Confirm the health check opens: `http://127.0.0.1:3001/api/health`
- Important:
  The MySQL-backed admin workspace snapshot is created or refreshed from the admin panel after login.
  For a fresh database, log in to `/admin/login` once before validating public-site updates.

## Access

- Open `http://localhost:8080/admin/login`
- Login with any seeded admin email and password `Altroz@123`
- Recommended accounts:
  - `sara@altrozhr.com` for super admin
  - `avni@altrozhr.com` for SEO manager
  - `nisha@altrozhr.com` for client admin

## 1. Global SEO Panel

- Open `/admin/seo`
- Select any record
- Edit and save:
  - SEO title
  - Meta title
  - Meta description
  - Slug
  - Canonical URL
  - Focus keyword
  - Secondary keywords
  - Semantic keywords
  - Long-tail keywords
  - LSI keywords
  - NLP keywords
  - Related entities
  - Publish date
  - Reading time
  - Author
  - Robots
- Refresh the page and confirm values persist

## 2. Social SEO

- In `/admin/seo`, edit:
  - Open Graph title, description, image
  - Twitter title, description, image
  - LinkedIn title, description, image
  - WhatsApp title, description, image
- Confirm the preview cards update visually

## 3. Schema and AI SEO

- Edit and save:
  - Schema types
  - Schema JSON-LD
  - Search intent
  - Content intent
  - Primary entity
  - AI summary
  - AI overview
  - ChatGPT summary
  - Gemini summary
  - People Also Ask
  - Related searches
- Confirm AI SEO Suggestions section updates meaningfully

## 4. Home Page SEO

- Select the Home page record in `/admin/seo`
- Edit and save:
  - Hero SEO
  - Feature section SEO
  - Book Demo CTA label
  - Internal links
  - Performance optimization notes

## 5. Pricing Page SEO

- Open `/admin/pages`
- Select `Pricing`
- Edit content and save
- Open `/admin/seo`
- Select the `/pricing` SEO record
- Edit and save:
  - Pricing keywords
  - Comparison table highlights
  - Conversion tracking notes

## 6. Learn Resources

- Open `/admin/learn`
- Create a new resource
- Edit and save resource fields
- Delete a resource
- In `/admin/seo`, select a Learn record and test:
  - Topic clusters
  - Difficulty level
  - Download PDF URL
  - Video support URL
  - Related learn links
  - Related blog links
  - Related FAQ links

## 7. Compliance Guides

- Open `/admin/compliance-guides`
- Create a new guide
- Edit and save guide fields
- Delete a guide
- In `/admin/seo`, select a Compliance record and test:
  - Applicable state or country
  - Law type
  - Version label
  - Download PDF URL
  - Related blog links
  - Related learn links
  - Related FAQ links

## 8. Blog Management

- Open `/admin/blogs`
- Create a new blog
- Edit and save:
  - Blog title
  - Slug
  - Category
  - Author
  - Featured image
  - Featured image alt
  - Sections
  - FAQs
  - Related links
  - CTA fields
- Delete a blog

## 9. Detailed Blog SEO

- In `/admin/seo`, select a blog record
- Edit and save:
  - Readability score
  - Keyword density
  - H1-H4 outline
  - Word count
  - Image count
  - Video count
  - Table count
  - FAQ count
  - Internal links count
  - External links count
  - Broken links count
  - TOC enabled
  - WebP ready
  - CTA modes
  - Views
  - CTR
  - Avg time on page
  - Scroll depth
  - Demo conversions
- Confirm preview cards still render

## 10. FAQ Management

- Open `/admin/faqs`
- Create a new FAQ item
- Edit and save
- Delete a FAQ item
- In `/admin/seo`, select a FAQ record and test:
  - FAQ category
  - FAQ tags
  - Search option enabled
  - Accordion enabled
  - Related FAQ links
  - Related blog links
  - Related product links

## 11. SEO Dashboard Signals

- In `/admin/seo`, confirm the dashboard cards show:
  - Overall SEO score
  - Technical SEO score
  - Missing meta
  - Schema coverage
  - Missing alt text
  - Noindex pages
  - Page speed
  - Core Web Vitals

## 12. Technical SEO

- Open `/admin/redirect-manager`
- Add a single redirect
- Import redirects in bulk using multiline input
- Toggle redirect status
- Open `/admin/sitemap-manager`
- Regenerate sitemap
- Confirm HTML sitemap button is visible
- Confirm canonical management panel is visible
- Confirm integrations panel is visible
- Edit and save `robots.txt`

## 13. Bulk SEO Tools

- Open `/admin/seo`
- Test:
  - Bulk meta update
  - Bulk schema update
  - Bulk robots update
  - Bulk alt text
  - CSV export
  - CSV import
- Sample CSV:

```csv
slug,metaTitle,metaDescription,focusKeyword,schemaTypes,robots,canonicalUrl
/pricing,HRMS Pricing Plans,Compare plans and ROI,HRMS pricing,Product|Offer|FAQPage,index|follow,https://hrmswebsite-gamma.vercel.app/pricing
```

## 14. Media SEO

- Open `/admin/media-library`
- Upload at least one file
- Select an asset
- Edit and save:
  - Alt text
  - Title
  - Caption
  - Description
  - Usage
- Copy the asset URL

## 15. Version History

- Make a few SEO edits
- Return to `/admin/seo`
- Confirm Version History shows recent save or import actions

## 16. Data Persistence

- After any edit, refresh the browser
- Confirm the admin data still persists
- If needed, clear browser local storage keys to reset:
  - `altroz-admin-store`
  - `altroz-admin-session`
  - `altroz-admin-session-temporary`
  - `altroz-admin-theme`

## 17. Build Verification

- Run:

```powershell
npm run build
```

- Confirm the production build passes
