import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createSubscriptionPurchase } from "../../services/subscriptionPurchase.service.js";

export const submitSubscriptionPurchase = asyncHandler(async (request, response) => {
  const purchase = await createSubscriptionPurchase(request.body, request.customerAccount ?? null);
  response.status(201).json(successResponse("Subscription purchase recorded successfully", purchase));
});
