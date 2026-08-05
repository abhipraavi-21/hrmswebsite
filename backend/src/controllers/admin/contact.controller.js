import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  bulkUpdateEnquiries,
  deleteEnquiry,
  exportEnquiriesCsv,
  getContactSettings,
  getEnquiryById,
  listEnquiries,
  serializeEnquiry,
  updateContactSettings,
  updateEnquiryNotes,
  updateEnquiryStatus,
} from "../../services/contact.service.js";

export const getSettings = asyncHandler(async (_request, response) => {
  response.json(successResponse("Contact settings fetched successfully", await getContactSettings()));
});

export const saveSettings = asyncHandler(async (request, response) => {
  response.json(successResponse("Contact settings updated successfully", await updateContactSettings(request.body)));
});

export const getEnquiries = asyncHandler(async (request, response) => {
  const data = await listEnquiries({
    search: request.query.search,
    status: request.query.status,
    dateFrom: request.query.dateFrom,
    dateTo: request.query.dateTo,
    page: Number(request.query.page || 1),
    limit: Number(request.query.limit || 20),
  });

  response.json(successResponse("Contact enquiries fetched successfully", data));
});

export const getEnquiry = asyncHandler(async (request, response) => {
  response.json(successResponse("Contact enquiry fetched successfully", serializeEnquiry(await getEnquiryById(request.params.id))));
});

export const saveEnquiryStatus = asyncHandler(async (request, response) => {
  response.json(successResponse("Enquiry status updated successfully", serializeEnquiry(await updateEnquiryStatus(request.params.id, request.body.status))));
});

export const saveEnquiryNotes = asyncHandler(async (request, response) => {
  response.json(successResponse("Enquiry notes updated successfully", serializeEnquiry(await updateEnquiryNotes(request.params.id, request.body.adminNotes))));
});

export const removeEnquiry = asyncHandler(async (request, response) => {
  await deleteEnquiry(request.params.id);
  response.json(successResponse("Enquiry deleted successfully"));
});

export const saveBulkStatus = asyncHandler(async (request, response) => {
  await bulkUpdateEnquiries(request.body.ids, request.body.status);
  response.json(successResponse("Enquiries updated successfully"));
});

export const exportEnquiries = asyncHandler(async (request, response) => {
  const csv = await exportEnquiriesCsv(request.query);

  response.setHeader("Content-Type", "text/csv");
  response.setHeader("Content-Disposition", "attachment; filename=enquiries.csv");
  response.send(csv);
});
