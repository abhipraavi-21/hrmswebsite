import { apiClient } from "./apiClient";
import type { PublicApiResponse, PublicBlogGroup, PublicBlogPost } from "./cmsTypes";

export async function fetchPublicBlogPosts(blogGroup?: PublicBlogGroup) {
  const response = await apiClient.get<PublicApiResponse<PublicBlogPost[]>>("/public/blog-posts", {
    params: blogGroup ? { blogGroup } : undefined,
  });
  return response.data.data;
}

export async function fetchPublicBlogPost(slug: string) {
  const response = await apiClient.get<PublicApiResponse<PublicBlogPost>>(`/public/blog-posts/${slug}`);
  return response.data.data;
}
