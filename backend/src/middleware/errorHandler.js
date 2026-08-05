import { ZodError } from "zod";
import { ValidationError } from "sequelize";
import { AppError } from "../utils/AppError.js";
import { errorResponse } from "../utils/apiResponse.js";

export function errorHandler(error, _request, response, _next) {
  if (error instanceof ZodError) {
    return response.status(400).json(
      errorResponse("Validation failed", error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }))),
    );
  }

  if (error instanceof ValidationError) {
    return response.status(400).json(
      errorResponse(
        "Validation failed",
        error.errors.map((item) => ({
          path: item.path,
          message: item.message,
        })),
      ),
    );
  }

  if (error instanceof AppError) {
    return response.status(error.statusCode).json(errorResponse(error.message, error.errors));
  }

  console.error(error);

  return response.status(500).json(errorResponse("Unable to process request"));
}
