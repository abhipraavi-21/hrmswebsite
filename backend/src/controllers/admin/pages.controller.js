import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  createSection,
  createSectionItem,
  deleteSection,
  deleteSectionItem,
  getPageById,
  getSectionById,
  listAdminPages,
  reorderSectionItems,
  reorderSections,
  restorePageFromSeed,
  updatePage,
  updateSection,
  updateSectionItem,
} from "../../services/cms.service.js";
import { logActivity } from "../../services/activity.service.js";
import { serializePage, serializeSection } from "../../utils/serializeCms.js";

export const listPages = asyncHandler(async (_request, response) => {
  response.json(successResponse("Pages fetched successfully", await listAdminPages()));
});

export const getPage = asyncHandler(async (request, response) => {
  const page = await getPageById(request.params.id);
  response.json(successResponse("Page fetched successfully", serializePage(page)));
});

export const updatePageDetails = asyncHandler(async (request, response) => {
  const page = await updatePage(request.params.id, request.body);

  await logActivity({
    adminId: request.admin.id,
    action: "page_update",
    entityType: "page",
    entityId: request.params.id,
    description: `Updated page ${page.pageName}`,
    newValues: page,
    ipAddress: request.ip,
  });

  response.json(successResponse("Page updated successfully", page));
});

export const listSections = asyncHandler(async (request, response) => {
  const page = await getPageById(request.params.pageId);
  response.json(successResponse("Sections fetched successfully", serializePage(page).sections));
});

export const addSection = asyncHandler(async (request, response) => {
  const section = await createSection(request.params.pageId, request.body);

  await logActivity({
    adminId: request.admin.id,
    action: "section_create",
    entityType: "page_section",
    entityId: section.id,
    description: `Created section ${section.internalName}`,
    newValues: section,
    ipAddress: request.ip,
  });

  response.status(201).json(successResponse("Section added successfully", section));
});

export const getSection = asyncHandler(async (request, response) => {
  const section = await getSectionById(request.params.id);
  response.json(successResponse("Section fetched successfully", serializeSection(section)));
});

export const editSection = asyncHandler(async (request, response) => {
  const section = await updateSection(request.params.id, request.body);
  response.json(successResponse("Section updated successfully", section));
});

export const removeSection = asyncHandler(async (request, response) => {
  await deleteSection(request.params.id);
  response.json(successResponse("Section deleted successfully"));
});

export const reorderPageSections = asyncHandler(async (request, response) => {
  await reorderSections(request.body.items);
  response.json(successResponse("Sections reordered successfully"));
});

export const addSectionItem = asyncHandler(async (request, response) => {
  const item = await createSectionItem(request.params.sectionId, request.body);
  response.status(201).json(successResponse("Section item added successfully", item));
});

export const editSectionItem = asyncHandler(async (request, response) => {
  const item = await updateSectionItem(request.params.id, request.body);
  response.json(successResponse("Section item updated successfully", item));
});

export const removeSectionItem = asyncHandler(async (request, response) => {
  await deleteSectionItem(request.params.id);
  response.json(successResponse("Section item deleted successfully"));
});

export const reorderItems = asyncHandler(async (request, response) => {
  await reorderSectionItems(request.body.items);
  response.json(successResponse("Section items reordered successfully"));
});

export const restorePage = asyncHandler(async (request, response) => {
  const page = await restorePageFromSeed(request.params.id);
  response.json(successResponse("Original seeded content restored successfully", page));
});
