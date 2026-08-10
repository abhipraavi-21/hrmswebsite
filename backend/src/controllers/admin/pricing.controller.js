import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  createPricingFeature,
  createPricingPlan,
  deletePricingFeature,
  deletePricingPlan,
  duplicatePricingPlan,
  getPricingPlan,
  listPricingPlans,
  reorderPricingFeatures,
  reorderPricingPlans,
  serializePlan,
  updatePricingFeature,
  updatePricingPlan,
} from "../../services/pricing.service.js";

export const listPlans = asyncHandler(async (_request, response) => {
  response.json(successResponse("Pricing plans fetched successfully", await listPricingPlans()));
});

export const createPlan = asyncHandler(async (request, response) => {
  response.status(201).json(successResponse("Pricing plan created successfully", await createPricingPlan(request.body)));
});

export const getPlan = asyncHandler(async (request, response) => {
  response.json(successResponse("Pricing plan fetched successfully", serializePlan(await getPricingPlan(request.params.id))));
});

export const updatePlan = asyncHandler(async (request, response) => {
  response.json(successResponse("Pricing plan updated successfully", await updatePricingPlan(request.params.id, request.body)));
});

export const removePlan = asyncHandler(async (request, response) => {
  await deletePricingPlan(request.params.id);
  response.json(successResponse("Pricing plan deleted successfully"));
});

export const copyPlan = asyncHandler(async (request, response) => {
  response.json(successResponse("Pricing plan duplicated successfully", await duplicatePricingPlan(request.params.id)));
});

export const reorderPlans = asyncHandler(async (request, response) => {
  await reorderPricingPlans(request.body.items);
  response.json(successResponse("Pricing plans reordered successfully"));
});

export const addPlanFeature = asyncHandler(async (request, response) => {
  response.status(201).json(successResponse("Pricing feature created successfully", await createPricingFeature(request.params.planId, request.body)));
});

export const updatePlanFeature = asyncHandler(async (request, response) => {
  response.json(successResponse("Pricing feature updated successfully", await updatePricingFeature(request.params.id, request.body)));
});

export const removePlanFeature = asyncHandler(async (request, response) => {
  await deletePricingFeature(request.params.id);
  response.json(successResponse("Pricing feature deleted successfully"));
});

export const reorderPlanFeatures = asyncHandler(async (request, response) => {
  await reorderPricingFeatures(request.body.items);
  response.json(successResponse("Pricing features reordered successfully"));
});
