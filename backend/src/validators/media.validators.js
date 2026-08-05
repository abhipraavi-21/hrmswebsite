import { z } from "zod";

export const mediaUpdateSchema = z.object({
  altText: z.string().max(255),
});
