import { Router } from "express";
import publicRoutes from "./public.routes.js";
import adminAuthRoutes from "./admin/auth.routes.js";
import adminPagesRoutes from "./admin/pages.routes.js";
import adminResourcesRoutes from "./admin/resources.routes.js";
import adminPricingRoutes from "./admin/pricing.routes.js";
import adminMediaRoutes from "./admin/media.routes.js";
import adminDashboardRoutes from "./admin/dashboard.routes.js";
import { requireAdminAuth } from "../middleware/auth.js";

const router = Router();

router.use("/public", publicRoutes);
router.use("/admin/auth", adminAuthRoutes);
router.use("/admin/dashboard", requireAdminAuth, adminDashboardRoutes);
router.use("/admin/pages", requireAdminAuth, adminPagesRoutes);
router.use("/admin/resources", requireAdminAuth, adminResourcesRoutes);
router.use("/admin/pricing-plans", requireAdminAuth, adminPricingRoutes);
router.use("/admin/media", requireAdminAuth, adminMediaRoutes);

export default router;
