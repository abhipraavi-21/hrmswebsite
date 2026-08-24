import { listVideos } from "../../services/video.service.js";
import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const listPublicVideos = asyncHandler(async (_request, response) => {
  response.json(successResponse("Videos fetched successfully", await listVideos({ publishedOnly: true })));
});
