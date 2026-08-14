import { z } from "zod";

const usernameSchema = z
  .string()
  .trim()
  .min(3)
  .max(80)
  .regex(
    /^[a-zA-Z0-9._-]+$/,
    "Username can use letters, numbers, dots, underscores and hyphens only.",
  );

const passwordSchema = z.string().min(6).max(120);

export const customerRegisterSchema = z.object({
  companyName: z.string().trim().min(2).max(160),
  contactName: z.string().trim().min(2).max(160),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7).max(20).optional().nullable(),
  username: usernameSchema,
  password: passwordSchema,
});

export const customerLoginSchema = z.object({
  username: z.string().trim().min(3).max(120),
  password: passwordSchema,
});
