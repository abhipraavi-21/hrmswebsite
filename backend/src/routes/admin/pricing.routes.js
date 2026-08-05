import { Router } from "express";
import {
  addPlanFeature,
  copyPlan,
  createPlan,
  getPlan,
  listPlans,
  removePlan,
  removePlanFeature,
  reorderPlanFeatures,
  reorderPlans,
  updatePlan,
  updatePlanFeature,
} from "../../controllers/admin/pricing.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { reorderSchema } from "../../validators/cms.validators.js";
import { pricingFeatureSchema, pricingPlanSchema } from "../../validators/pricing.validators.js";

const router = Router();

router.get("/", listPlans);
router.post("/", validateRequest(pricingPlanSchema), createPlan);
router.get("/:id", getPlan);
router.put("/:id", validateRequest(pricingPlanSchema), updatePlan);
router.delete("/:id", removePlan);
router.post("/:id/duplicate", copyPlan);
router.patch("/reorder", validateRequest(reorderSchema), reorderPlans);

router.post("/:planId/features", validateRequest(pricingFeatureSchema), addPlanFeature);
router.put("/features/:id", validateRequest(pricingFeatureSchema), updatePlanFeature);
router.delete("/features/:id", removePlanFeature);
router.patch("/features/reorder", validateRequest(reorderSchema), reorderPlanFeatures);

export default router;
