import { Router } from "express";
import { login, logout, profile, updatePassword, updateProfile } from "../../controllers/admin/auth.controller.js";
import { requireAdminAuth } from "../../middleware/auth.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { changePasswordSchema, loginSchema, profileSchema } from "../../validators/auth.validators.js";

const router = Router();

router.post("/login", validateRequest(loginSchema), login);
router.post("/logout", requireAdminAuth, logout);
router.get("/profile", requireAdminAuth, profile);
router.put("/profile", requireAdminAuth, validateRequest(profileSchema), updateProfile);
router.put(
  "/change-password",
  requireAdminAuth,
  validateRequest(changePasswordSchema),
  updatePassword,
);

export default router;
