import jwt from "jsonwebtoken";
import env from "../config/env.js";
import { models } from "../config/database.js";
import { AppError } from "../utils/AppError.js";
import { getCustomerAccountById } from "../services/customerAuth.service.js";

function getBearerToken(request) {
  return request.headers.authorization?.startsWith("Bearer ")
    ? request.headers.authorization.slice(7)
    : null;
}

export async function requireAdminAuth(request, _response, next) {
  const bearerToken = getBearerToken(request);
  const token = bearerToken ?? request.cookies.adminToken;

  if (!token) {
    return next(new AppError("Authentication required", 401));
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    const admin = await models.Admin.findByPk(payload.sub, {
      attributes: { exclude: ["password_hash"] },
    });

    if (!admin || !admin.is_active) {
      throw new AppError("Your session is no longer valid", 401);
    }

    request.admin = admin;
    request.adminToken = token;
    next();
  } catch (error) {
    next(new AppError("Invalid or expired session", 401));
  }
}

export async function requireCustomerAuth(request, _response, next) {
  const token = getBearerToken(request);

  if (!token) {
    return next(new AppError("Customer authentication required", 401));
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);

    if (payload.role !== "customer") {
      throw new AppError("Invalid or expired customer session", 401);
    }

    request.customerAccount = await getCustomerAccountById(payload.sub);
    request.customerToken = token;
    next();
  } catch (error) {
    next(new AppError("Invalid or expired customer session", 401));
  }
}

export async function resolveCustomerAuth(request, _response, next) {
  const token = getBearerToken(request);

  if (!token) {
    return next();
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);

    if (payload.role !== "customer") {
      throw new AppError("Invalid or expired customer session", 401);
    }

    request.customerAccount = await getCustomerAccountById(payload.sub);
    request.customerToken = token;
    next();
  } catch (error) {
    next(new AppError("Invalid or expired customer session", 401));
  }
}
