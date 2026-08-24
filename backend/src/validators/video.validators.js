import { z } from "zod";

export const videoSchema = z
  .object({
    title: z.string().min(2),
    label: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    videoSource: z.enum(["youtube", "upload", "external"]).optional(),
    videoUrl: z.string().min(1),
    videoId: z.string().optional().nullable(),
    thumbnailUrl: z.string().optional().nullable(),
    thumbnailAlt: z.string().max(255).optional().nullable(),
    status: z.enum(["draft", "published"]).optional(),
    displayOrder: z.number().int().optional(),
    publishedAt: z.string().optional().nullable().or(z.literal("")),
  })
  .refine(
    (payload) => {
      const source = payload.videoSource ?? "youtube";
      return source !== "youtube" || Boolean(payload.videoUrl || payload.videoId);
    },
    {
      path: ["videoUrl"],
      message: "YouTube videos require a YouTube URL or video ID",
    },
  );
