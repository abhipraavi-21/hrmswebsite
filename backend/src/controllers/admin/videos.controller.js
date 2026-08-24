import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createVideo, deleteVideo, getVideoById, listVideos, serializeVideo, updateVideo } from "../../services/video.service.js";

export const listVideoItems = asyncHandler(async (_request, response) => {
  response.json(successResponse("Videos fetched successfully", await listVideos()));
});

export const createVideoItem = asyncHandler(async (request, response) => {
  response.status(201).json(successResponse("Video created successfully", await createVideo(request.body)));
});

export const getVideoItem = asyncHandler(async (request, response) => {
  response.json(successResponse("Video fetched successfully", serializeVideo(await getVideoById(request.params.id))));
});

export const updateVideoItem = asyncHandler(async (request, response) => {
  response.json(successResponse("Video updated successfully", await updateVideo(request.params.id, request.body)));
});

export const removeVideoItem = asyncHandler(async (request, response) => {
  await deleteVideo(request.params.id);
  response.json(successResponse("Video deleted successfully"));
});
