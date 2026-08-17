import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  completeOrderPayment,
  createCheckoutIntent,
  createCheckoutOrder,
  getBillingProductCatalog,
  getCustomerBillingDashboard,
  getCustomerProductDashboard,
  getOrderForCustomer,
  listBillingProducts,
  listCustomerPayments,
  previewCheckout,
} from "../../services/billing.service.js";

export const listProducts = asyncHandler(async (_request, response) => {
  response.json(successResponse("Billing products fetched successfully", await listBillingProducts()));
});

export const getProduct = asyncHandler(async (request, response) => {
  response.json(
    successResponse(
      "Billing product fetched successfully",
      await getBillingProductCatalog(request.params.productSlug),
    ),
  );
});

export const previewOrder = asyncHandler(async (request, response) => {
  response.json(
    successResponse(
      "Checkout preview calculated successfully",
      await previewCheckout(request.body, request.customerAccount ?? null),
    ),
  );
});

export const createIntent = asyncHandler(async (request, response) => {
  response.status(201).json(
    successResponse(
      "Checkout intent created successfully",
      await createCheckoutIntent(request.body, request.customerAccount ?? null),
    ),
  );
});

export const createOrder = asyncHandler(async (request, response) => {
  response.status(201).json(
    successResponse(
      "Checkout order created successfully",
      await createCheckoutOrder(request.body, request.customerAccount),
    ),
  );
});

export const payOrder = asyncHandler(async (request, response) => {
  response.status(201).json(
    successResponse(
      "Payment processed successfully",
      await completeOrderPayment(request.body, request.customerAccount),
    ),
  );
});

export const getOrder = asyncHandler(async (request, response) => {
  response.json(
    successResponse(
      "Order fetched successfully",
      await getOrderForCustomer(request.params.orderNumber, request.customerAccount),
    ),
  );
});

export const getDashboard = asyncHandler(async (request, response) => {
  response.json(
    successResponse(
      "Billing dashboard fetched successfully",
      await getCustomerBillingDashboard(request.customerAccount),
    ),
  );
});

export const getProductDashboard = asyncHandler(async (request, response) => {
  response.json(
    successResponse(
      "Product dashboard fetched successfully",
      await getCustomerProductDashboard(request.customerAccount, request.params.productSlug),
    ),
  );
});

export const getPayments = asyncHandler(async (request, response) => {
  response.json(
    successResponse(
      "Billing payments fetched successfully",
      await listCustomerPayments(request.customerAccount, request.query.productSlug ?? null),
    ),
  );
});
