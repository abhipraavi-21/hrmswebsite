import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  authenticateCustomerAccount,
  createCustomerAuthToken,
  registerCustomerAccount,
  serializeCustomerAccount,
} from "../../services/customerAuth.service.js";

export const register = asyncHandler(async (request, response) => {
  const account = await registerCustomerAccount(request.body);
  const token = createCustomerAuthToken(account);

  response.status(201).json(
    successResponse("Registration successful", {
      token,
      account: serializeCustomerAccount(account),
    }),
  );
});

export const login = asyncHandler(async (request, response) => {
  const account = await authenticateCustomerAccount(request.body.username, request.body.password);
  const token = createCustomerAuthToken(account);

  response.json(
    successResponse("Login successful", {
      token,
      account: serializeCustomerAccount(account),
    }),
  );
});
