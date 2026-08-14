import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  createSubscriptionPurchase,
  previewSubscriptionPurchaseCoupon,
} from "../../services/subscriptionPurchase.service.js";

export const submitSubscriptionPurchase = asyncHandler(async (request, response) => {
  const purchase = await createSubscriptionPurchase(request.body, request.customerAccount ?? null);
  response
    .status(201)
    .json(successResponse("Subscription purchase recorded successfully", purchase));
});

export const validateSubscriptionPurchaseCoupon = asyncHandler(async (request, response) => {
  const coupon = await previewSubscriptionPurchaseCoupon(
    request.body,
    request.customerAccount ?? null,
  );
  response.json(successResponse("Coupon validated successfully", coupon));
});
