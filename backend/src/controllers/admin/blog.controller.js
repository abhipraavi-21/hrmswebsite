import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  createBlogPost,
  deleteBlogPost,
  getBlogPostById,
  listBlogPosts,
  serializeBlogPost,
  updateBlogPost,
} from "../../services/blog.service.js";

export const listPosts = asyncHandler(async (_request, response) => {
  response.json(
    successResponse(
      "Blog posts fetched successfully",
      await listBlogPosts({ blogGroup: _request.query.blogGroup }),
    ),
  );
});

export const createPost = asyncHandler(async (request, response) => {
  response.status(201).json(successResponse("Blog post created successfully", await createBlogPost(request.body)));
});

export const getPost = asyncHandler(async (request, response) => {
  response.json(successResponse("Blog post fetched successfully", serializeBlogPost(await getBlogPostById(request.params.id))));
});

export const updatePost = asyncHandler(async (request, response) => {
  response.json(successResponse("Blog post updated successfully", await updateBlogPost(request.params.id, request.body)));
});

export const removePost = asyncHandler(async (request, response) => {
  await deleteBlogPost(request.params.id);
  response.json(successResponse("Blog post deleted successfully"));
});
