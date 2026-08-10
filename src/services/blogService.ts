import { apiClient } from "./apiClient";
import type { PublicApiResponse, PublicBlogGroup, PublicBlogPost } from "./cmsTypes";
import { getSeedBlogPostFallback, getSeedBlogPostsFallback, withSeedFallback } from "./seedFallback";

export async function fetchPublicBlogPosts(blogGroup?: PublicBlogGroup) {
  return withSeedFallback(async () => {
    const response = await apiClient.get<PublicApiResponse<PublicBlogPost[]>>("/public/blog-posts", {
      params: blogGroup ? { blogGroup } : undefined,
    });
    return response.data.data;
  }, () => getSeedBlogPostsFallback(blogGroup));
}

export async function fetchPublicBlogPost(slug: string) {
  return withSeedFallback(async () => {
    const response = await apiClient.get<PublicApiResponse<PublicBlogPost>>(
      `/public/blog-posts/${slug}`,
    );
    return response.data.data;
  }, () => getSeedBlogPostFallback(slug));
}
