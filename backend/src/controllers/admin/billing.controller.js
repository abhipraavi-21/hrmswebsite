import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  getAdminBillingOverview,
  listAdminCustomers,
  listAdminInvoices,
  listAdminPayments,
  listAdminProducts,
  listAdminSubscriptions,
  listAdminTaxSettings,
  updateAdminAddon,
  updateAdminPlan,
  updateAdminProduct,
  updateAdminTaxSetting,
} from "../../services/billing.service.js";

export const getOverview = asyncHandler(async (_request, response) => {
  response.json(successResponse("Billing overview fetched successfully", await getAdminBillingOverview()));
});

export const listCustomers = asyncHandler(async (_request, response) => {
  response.json(successResponse("Billing customers fetched successfully", await listAdminCustomers()));
});

export const listProducts = asyncHandler(async (_request, response) => {
  response.json(successResponse("Billing products fetched successfully", await listAdminProducts()));
});

export const updateProduct = asyncHandler(async (request, response) => {
  response.json(
    successResponse(
      "Billing product updated successfully",
      await updateAdminProduct(request.params.productId, request.body),
    ),
  );
});

export const updatePlan = asyncHandler(async (request, response) => {
  response.json(
    successResponse("Plan updated successfully", await updateAdminPlan(request.params.planId, request.body)),
  );
});

export const updateAddon = asyncHandler(async (request, response) => {
  response.json(
    successResponse(
      "Add-on updated successfully",
      await updateAdminAddon(request.params.addonId, request.body),
    ),
  );
});

export const listSubscriptions = asyncHandler(async (_request, response) => {
  response.json(successResponse("Billing subscriptions fetched successfully", await listAdminSubscriptions()));
});

export const listPayments = asyncHandler(async (_request, response) => {
  response.json(successResponse("Billing payments fetched successfully", await listAdminPayments()));
});

export const listInvoices = asyncHandler(async (_request, response) => {
  response.json(successResponse("Billing invoices fetched successfully", await listAdminInvoices()));
});

export const listTaxSettings = asyncHandler(async (_request, response) => {
  response.json(successResponse("Tax settings fetched successfully", await listAdminTaxSettings()));
});

export const updateTaxSetting = asyncHandler(async (request, response) => {
  response.json(
    successResponse(
      "Tax setting updated successfully",
      await updateAdminTaxSetting(request.params.taxSettingId, request.body),
    ),
  );
});
