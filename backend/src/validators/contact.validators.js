import { z } from "zod";

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
