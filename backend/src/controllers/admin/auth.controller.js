import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  authenticateAdmin,
  changeAdminPassword,
  createAuthToken,
  updateAdminProfile,
} from "../../services/auth.service.js";
import { logActivity } from "../../services/activity.service.js";

function serializeAdmin(admin) {
  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    isActive: admin.is_active,
    lastLoginAt: admin.last_login_at,
  };
}

export const login = asyncHandler(async (request, response) => {
  const admin = await authenticateAdmin(request.body.email, request.body.password);
  const token = createAuthToken(admin);

  response.cookie("adminToken", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: request.body.rememberMe ? 30 * 24 * 60 * 60 * 1000 : undefined,
  });

  await logActivity({
    adminId: admin.id,
    action: "login",
    entityType: "admin",
    entityId: admin.id,
    description: "Admin logged in",
    ipAddress: request.ip,
  });

  response.json(
    successResponse("Login successful", {
      token,
      admin: serializeAdmin(admin),
    }),
  );
});

export const logout = asyncHandler(async (request, response) => {
  response.clearCookie("adminToken");

  await logActivity({
    adminId: request.admin?.id,
    action: "logout",
    entityType: "admin",
    entityId: request.admin?.id ?? "unknown",
    description: "Admin logged out",
    ipAddress: request.ip,
  });

  response.json(successResponse("Logout successful"));
});

export const profile = asyncHandler(async (request, response) => {
  response.json(successResponse("Profile fetched successfully", serializeAdmin(request.admin)));
});

export const updateProfile = asyncHandler(async (request, response) => {
  const admin = await updateAdminProfile(request.admin.id, request.body);

  await logActivity({
    adminId: request.admin.id,
    action: "profile_update",
    entityType: "admin",
    entityId: admin.id,
    description: "Admin profile updated",
    newValues: { name: admin.name, email: admin.email },
    ipAddress: request.ip,
  });

  response.json(successResponse("Profile updated successfully", serializeAdmin(admin)));
});

export const updatePassword = asyncHandler(async (request, response) => {
  await changeAdminPassword(
    request.admin.id,
    request.body.currentPassword,
    request.body.newPassword,
  );

  await logActivity({
    adminId: request.admin.id,
    action: "password_change",
    entityType: "admin",
    entityId: request.admin.id,
    description: "Admin password updated",
    ipAddress: request.ip,
  });

  response.json(successResponse("Password updated successfully"));
});
