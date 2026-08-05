import jwt from "jsonwebtoken";
import env from "../config/env.js";
import { models } from "../config/database.js";
import { AppError } from "../utils/AppError.js";

export async function requireAdminAuth(request, _response, next) {
  const bearerToken = request.headers.authorization?.startsWith("Bearer ")
    ? request.headers.authorization.slice(7)
    : null;
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
