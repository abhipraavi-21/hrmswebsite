import { apiClient } from "./apiClient";
import type { PublicApiResponse, PublicBlogGroup, PublicBlogPost } from "./cmsTypes";
import { getSeedBlogPostFallback, getSeedBlogPostsFallback, withSeedFallback } from "./seedFallback";

export async function fetchPublicBlogPosts(blogGroup?: PublicBlogGroup) {
  return withSeedFallback(async () => {
    const endpoint = blogGroup
      ? `/public/${blogGroup}/blog-posts`
      : "/public/blog-posts";
    const response = await apiClient.get<PublicApiResponse<PublicBlogPost[]>>(endpoint);
    return response.data.data;
  }, () => getSeedBlogPostsFallback(blogGroup));
}

export async function fetchPublicBlogPost(slug: string, blogGroup?: PublicBlogGroup) {
  return withSeedFallback(async () => {
    const response = await apiClient.get<PublicApiResponse<PublicBlogPost>>(
      blogGroup
        ? `/public/${blogGroup}/blog-posts/${slug}`
        : `/public/blog-posts/${slug}`,
    );
    return response.data.data;
  }, () => getSeedBlogPostFallback(slug));
}
