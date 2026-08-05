import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  createResource,
  deleteResource,
  listResources,
  reorderResources,
  updateResource,
} from "../../services/cms.service.js";

export const listResourcePages = asyncHandler(async (_request, response) => {
  response.json(successResponse("Resources fetched successfully", await listResources()));
});

export const createResourcePage = asyncHandler(async (request, response) => {
  const resource = await createResource(request.body);
  response.status(201).json(successResponse("Resource created successfully", resource));
});

export const getResourcePage = asyncHandler(async (request, response) => {
  const resources = await listResources();
  const item = resources.find((resource) => String(resource.id) === request.params.id);
  response.json(successResponse("Resource fetched successfully", item));
});

export const updateResourcePage = asyncHandler(async (request, response) => {
  const resource = await updateResource(request.params.id, request.body);
  response.json(successResponse("Resource updated successfully", resource));
});

export const removeResourcePage = asyncHandler(async (request, response) => {
  await deleteResource(request.params.id);
  response.json(successResponse("Resource deleted successfully"));
});

export const reorderResourcePages = asyncHandler(async (request, response) => {
  await reorderResources(request.body.items);
  response.json(successResponse("Resources reordered successfully"));
});
