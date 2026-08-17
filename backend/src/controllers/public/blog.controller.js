import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  getBlogPostBySlug,
  listBlogPosts,
  serializeBlogPost,
} from "../../services/blog.service.js";

export const listPublicPosts = asyncHandler(async (_request, response) => {
  response.json(
    successResponse(
      "Blog posts fetched successfully",
      await listBlogPosts({
        publishedOnly: true,
        blogGroup: _request.query.blogGroup,
      }),
    ),
  );
});

export const getPublicPost = asyncHandler(async (request, response) => {
  response.json(successResponse("Blog post fetched successfully", serializeBlogPost(await getBlogPostBySlug(request.params.slug, { publishedOnly: true }))));
});
