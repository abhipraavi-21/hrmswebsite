import { z } from "zod";

const blogTableSchema = z
  .object({
    headers: z.array(z.string()).optional(),
    rows: z.array(z.array(z.string())).optional(),
  })
  .optional()
  .nullable();

const blogSectionSchema = z.object({
  id: z.string().optional().nullable(),
  title: z.string().min(1),
  bodyHtml: z.string().optional().nullable(),
  bullets: z.array(z.string()).optional(),
  table: blogTableSchema,
});

const blogFaqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

const blogRelatedLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  description: z.string().optional().nullable(),
});

export const blogPostSchema = z.object({
  title: z.string().min(2),
  slug: z.string().optional().nullable(),
  blogGroup: z.enum(["hrms", "bulk-email", "asset-management"]).optional(),
  category: z.string().min(2),
  readingTimeLabel: z.string().optional().nullable(),
  descriptionHtml: z.string().optional().nullable(),
  metaTitle: z.string().min(2),
  metaDescription: z.string().min(10),
  heroSummaryHtml: z.string().optional().nullable(),
  quickAnswerHtml: z.string().optional().nullable(),
  heroPoints: z.array(z.string()).optional(),
  keyTakeaways: z.array(z.string()).optional(),
  sections: z.array(blogSectionSchema).optional(),
  faqs: z.array(blogFaqSchema).optional(),
  relatedLinks: z.array(blogRelatedLinkSchema).optional(),
  coverImageUrl: z.string().optional().nullable(),
  coverImageAlt: z.string().max(255).optional().nullable(),
  status: z.enum(["draft", "published"]).optional(),
  displayOrder: z.number().int().optional(),
  publishedAt: z.string().optional().nullable().or(z.literal("")),
});
