import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  getSubscriptionPurchaseById,
  listSubscriptionPurchases,
} from "../../services/subscriptionPurchase.service.js";

export const listSubscriptions = asyncHandler(async (_request, response) => {
  response.json(successResponse("Subscriptions fetched successfully", await listSubscriptionPurchases()));
});

export const getSubscription = asyncHandler(async (request, response) => {
  response.json(successResponse("Subscription fetched successfully", await getSubscriptionPurchaseById(request.params.id)));
});
