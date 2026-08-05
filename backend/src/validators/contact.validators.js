import { z } from "zod";

export const contactSettingsSchema = z.object({
  pageTitle: z.string().optional().nullable(),
  pageSubtitle: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  phonePrimary: z.string().optional().nullable(),
  phoneSecondary: z.string().optional().nullable(),
  emailPrimary: z.string().optional().nullable(),
  emailSecondary: z.string().optional().nullable(),
  businessHours: z.string().optional().nullable(),
  mapEmbedUrl: z.string().optional().nullable(),
  formHeading: z.string().optional().nullable(),
  formDescription: z.string().optional().nullable(),
  submitButtonText: z.string().optional().nullable(),
  successMessage: z.string().optional().nullable(),
  errorMessage: z.string().optional().nullable(),
  socialLinks: z.array(z.any()).optional(),
  settings: z.record(z.any()).optional(),
});

export const publicEnquirySchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7).max(20).optional().nullable(),
  companyName: z.string().optional().nullable(),
  subject: z.string().optional().nullable(),
  message: z.string().min(10),
  sourcePage: z.string().optional().nullable(),
  extraData: z.record(z.any()).optional(),
});

export const enquiryStatusSchema = z.object({
  status: z.enum(["new", "read", "in_progress", "replied", "closed", "spam"]),
});

export const enquiryNotesSchema = z.object({
  adminNotes: z.string().max(5000),
});

export const enquiryBulkStatusSchema = z.object({
  ids: z.array(z.number().int().positive()).min(1),
  status: z.enum(["new", "read", "in_progress", "replied", "closed", "spam"]),
});
