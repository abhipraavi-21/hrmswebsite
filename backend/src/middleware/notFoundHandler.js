import { errorResponse } from "../utils/apiResponse.js";

export function notFoundHandler(_request, response) {
  response.status(404).json(errorResponse("Route not found"));
}
