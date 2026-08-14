import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getContactSettings, createEnquiry } from "../../services/contact.service.js";
import { listPricingPlans } from "../../services/pricing.service.js";
import { getPageByKey, getPageBySlug, listResources } from "../../services/cms.service.js";
import { serializePage } from "../../utils/serializeCms.js";

export const getPage = asyncHandler(async (request, response) => {
  response.json(successResponse("Content fetched successfully", serializePage(await getPageByKey(request.params.pageKey, { publishedOnly: true }))));
});

export const getHrms = asyncHandler(async (_request, response) => {
  response.json(successResponse("Content fetched successfully", serializePage(await getPageByKey("hrms", { publishedOnly: true }))));
});

export const getResources = asyncHandler(async (_request, response) => {
  response.json(successResponse("Content fetched successfully", await listResources({ publishedOnly: true })));
});

export const getResource = asyncHandler(async (request, response) => {
  response.json(successResponse("Content fetched successfully", serializePage(await getPageBySlug(request.params.slug, { publishedOnly: true }))));
});

export const getPricing = asyncHandler(async (_request, response) => {
  const page = serializePage(await getPageByKey("pricing", { publishedOnly: true }));
  const plans = await listPricingPlans({ activeOnly: true });
  response.json(successResponse("Content fetched successfully", { ...page, plans }));
});

export const getContact = asyncHandler(async (_request, response) => {
  const page = serializePage(await getPageByKey("contact-us", { publishedOnly: true }));
  const settings = await getContactSettings();
  response.json(successResponse("Content fetched successfully", { ...page, settings }));
});

export const submitContactEnquiry = asyncHandler(async (request, response) => {
  const enquiry = await createEnquiry(request.body, request.ip);
  response.status(201).json(successResponse("Enquiry submitted successfully", { id: enquiry.id }));
});
