import { z } from "zod";

const billingCycleSchema = z.enum(["monthly", "half-yearly", "yearly"]);

export const publicSubscriptionPurchaseSchema = z.object({
  companyName: z.string().min(2).max(160),
  contactName: z.string().min(2).max(160),
  email: z.string().email(),
  phone: z.string().min(7).max(20).optional().nullable(),
  planSlug: z.string().min(2).max(160),
  employeeCount: z.coerce.number().int().min(1).max(10000),
  billingCycle: billingCycleSchema,
  paymentMethod: z.string().min(2).max(40).optional().nullable(),
  notes: z.string().max(4000).optional().nullable(),
  sourcePage: z.string().max(160).optional().nullable(),
  extraData: z.record(z.any()).optional(),
});
