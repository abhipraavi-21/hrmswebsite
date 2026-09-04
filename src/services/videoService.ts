import { apiClient } from "./apiClient";
import type { PublicApiResponse, PublicResourceVideo } from "./cmsTypes";
import { withSeedFallback } from "./seedFallback";

export const fallbackResourceVideos: PublicResourceVideo[] = [
  {
    id: 1,
    label: "Featured video",
    title:
      "Leave Management Software: Simplify Employee Leave Approvals | Altroz HR | #leavemanagement #hrms",
    description: "Play this video directly on the page.",
    thumbnailUrl: "https://i.ytimg.com/vi/gYLKTRQ1Hwo/hqdefault.jpg",
    thumbnailAlt:
      "Leave Management Software: Simplify Employee Leave Approvals | Altroz HR | #leavemanagement #hrms",
    videoSource: "youtube",
    videoUrl: "https://www.youtube.com/watch?v=gYLKTRQ1Hwo",
    videoId: "gYLKTRQ1Hwo",
    status: "published",
    displayOrder: 0,
    publishedAt: null,
  },
  {
    id: 2,
    label: "Featured video",
    title: "Update tenant configuration",
    description: "Play this video directly on the page.",
    thumbnailUrl: "https://i.ytimg.com/vi/nkFBzliqulI/hqdefault.jpg",
    thumbnailAlt: "Update tenant configuration",
    videoSource: "youtube",
    videoUrl: "https://www.youtube.com/watch?v=nkFBzliqulI",
    videoId: "nkFBzliqulI",
    status: "published",
    displayOrder: 1,
    publishedAt: null,
  },
];

export async function fetchPublicVideos() {
  return withSeedFallback(async () => {
    const response = await apiClient.get<PublicApiResponse<PublicResourceVideo[]>>(
      "/public/videos",
    );
    return response.data.data;
  }, () => fallbackResourceVideos);
}
