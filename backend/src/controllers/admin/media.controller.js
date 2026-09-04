import env from "../../config/env.js";
import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createMedia, deleteMedia, listMedia, updateMedia } from "../../services/media.service.js";

export const getMedia = asyncHandler(async (_request, response) => {
  response.json(successResponse("Media fetched successfully", await listMedia()));
});

export const uploadMedia = asyncHandler(async (request, response) => {
  response.status(201).json(
    successResponse(
      "Media uploaded successfully",
      await createMedia(request.file, request.admin.id, env.APP_URL),
    ),
  );
});

export const updateMediaItem = asyncHandler(async (request, response) => {
  response.json(successResponse("Media updated successfully", await updateMedia(request.params.id, request.body)));
});

export const removeMediaItem = asyncHandler(async (request, response) => {
  await deleteMedia(request.params.id);
  response.json(successResponse("Media deleted successfully"));
});
