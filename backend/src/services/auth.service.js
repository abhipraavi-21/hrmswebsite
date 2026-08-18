import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../config/env.js";
import { models } from "../config/database.js";
import { AppError } from "../utils/AppError.js";

export function createAuthToken(admin) {
  return jwt.sign(
    {
      email: admin.email,
      role: admin.role,
    },
    env.JWT_SECRET,
    {
      subject: String(admin.id),
      expiresIn: env.JWT_EXPIRES_IN,
    },
  );
}

export async function authenticateAdmin(email, password) {
  const admin = await models.Admin.findOne({
    where: { email },
  });

  if (!admin || !admin.is_active) {
    throw new AppError("Invalid email or password", 401);
  }

  const passwordMatches = await bcrypt.compare(password, admin.password_hash);

  if (!passwordMatches) {
    throw new AppError("Invalid email or password", 401);
  }

  await admin.update({ last_login_at: new Date() });

  return admin;
}

export async function updateAdminProfile(adminId, payload) {
  const admin = await models.Admin.findByPk(adminId);

  if (!admin) {
    throw new AppError("Admin not found", 404);
  }

  await admin.update({
    name: payload.name ?? admin.name,
    email: payload.email ?? admin.email,
  });

  return admin;
}

export async function changeAdminPassword(adminId, currentPassword, newPassword) {
  const admin = await models.Admin.findByPk(adminId);

  if (!admin) {
    throw new AppError("Admin not found", 404);
  }

  const passwordMatches = await bcrypt.compare(currentPassword, admin.password_hash);

  if (!passwordMatches) {
    throw new AppError("Current password is incorrect", 400);
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await admin.update({ password_hash: passwordHash });

  return admin;
}
