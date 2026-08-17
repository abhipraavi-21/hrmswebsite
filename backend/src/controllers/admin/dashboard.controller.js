import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getDashboardSummary } from "../../services/dashboard.service.js";

export const getDashboard = asyncHandler(async (_request, response) => {
  response.json(successResponse("Dashboard summary fetched successfully", await getDashboardSummary()));
});
