import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import {
  getBlogPostBySlug,
  listBlogPosts,
  serializeBlogPost,
} from "../../services/blog.service.js";

const BLOG_GROUPS = new Set(["hrms", "bulk-email", "asset-management"]);

function getRequestedBlogGroup(request) {
  const blogGroup = request.params.product ?? request.query.blogGroup;

  if (request.params.product && !BLOG_GROUPS.has(blogGroup)) {
    throw new AppError("Unknown product namespace", 404);
  }

  return blogGroup;
}

export const listPublicPosts = asyncHandler(async (request, response) => {
  response.json(
    successResponse(
      "Blog posts fetched successfully",
      await listBlogPosts({
        publishedOnly: true,
        blogGroup: getRequestedBlogGroup(request),
      }),
    ),
  );
});

export const getPublicPost = asyncHandler(async (request, response) => {
  const post = serializeBlogPost(
    await getBlogPostBySlug(request.params.slug, { publishedOnly: true }),
  );
  const product = request.params.product;

  if (product && (!BLOG_GROUPS.has(product) || post.blogGroup !== product)) {
    throw new AppError("Blog post does not belong to this product namespace", 404);
  }

  response.json(successResponse("Blog post fetched successfully", post));
});
