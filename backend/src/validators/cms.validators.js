import { z } from "zod";

export const pageUpdateSchema = z.object({
  pageName: z.string().min(2),
  slug: z.string().min(1),
  metaTitle: z.string().min(2),
  metaDescription: z.string().min(10),
  metaKeywords: z.string().optional().nullable(),
  canonicalUrl: z.string().url().optional().nullable().or(z.literal("")),
  ogTitle: z.string().optional().nullable(),
  ogDescription: z.string().optional().nullable(),
  ogImage: z.string().optional().nullable(),
  indexable: z.boolean().optional(),
  status: z.enum(["draft", "published"]).optional(),
});

export const sectionSchema = z.object({
  sectionKey: z.string().min(1),
  sectionType: z.string().min(1),
  internalName: z.string().min(1),
  heading: z.string().optional().nullable(),
  subheading: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  backgroundImageUrl: z.string().optional().nullable(),
  buttonText: z.string().optional().nullable(),
  buttonLink: z.string().optional().nullable(),
  settings: z.record(z.any()).optional(),
  displayOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
  isRequired: z.boolean().optional(),
});

export const sectionItemSchema = z.object({
  itemType: z.string().min(1),
  title: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  buttonText: z.string().optional().nullable(),
  buttonLink: z.string().optional().nullable(),
  extraData: z.record(z.any()).optional(),
  displayOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

export const reorderSchema = z.object({
  items: z.array(
    z.object({
      id: z.number().int().positive(),
      displayOrder: z.number().int().optional(),
    }),
  ),
});

export const resourceSchema = z.object({
  pageKey: z.string().optional(),
  pageName: z.string().min(2),
  resourceName: z.string().min(2),
  slug: z.string().min(1),
  shortDescription: z.string().optional().nullable(),
  featuredImage: z.string().optional().nullable(),
  metaTitle: z.string().min(2),
  metaDescription: z.string().min(10),
  metaKeywords: z.string().optional().nullable(),
  canonicalUrl: z.string().url().optional().nullable().or(z.literal("")),
  ogTitle: z.string().optional().nullable(),
  ogDescription: z.string().optional().nullable(),
  ogImage: z.string().optional().nullable(),
  indexable: z.boolean().optional(),
  status: z.enum(["draft", "published"]).optional(),
  displayOrder: z.number().int().optional(),
});
