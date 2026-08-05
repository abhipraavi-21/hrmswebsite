import { z } from "zod";

export const pricingPlanSchema = z.object({
  name: z.string().min(2),
  slug: z.string().optional(),
  shortDescription: z.string().optional().nullable(),
  currency: z.string().default("INR"),
  monthlyPrice: z.number().min(0),
  yearlyPrice: z.number().min(0).optional().nullable(),
  originalPrice: z.number().min(0).optional().nullable(),
  billingLabel: z.string().optional().nullable(),
  badgeText: z.string().optional().nullable(),
  buttonText: z.string().optional().nullable(),
  buttonLink: z.string().optional().nullable(),
  isPopular: z.boolean().optional(),
  isActive: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
  settings: z.record(z.any()).optional(),
});

export const pricingFeatureSchema = z.object({
  featureText: z.string().min(2),
  isIncluded: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
  category: z.string().optional().nullable(),
});
