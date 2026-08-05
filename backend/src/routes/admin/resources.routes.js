import { Router } from "express";
import {
  createResourcePage,
  getResourcePage,
  listResourcePages,
  removeResourcePage,
  reorderResourcePages,
  updateResourcePage,
} from "../../controllers/admin/resources.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { reorderSchema, resourceSchema } from "../../validators/cms.validators.js";

const router = Router();

router.get("/", listResourcePages);
router.post("/", validateRequest(resourceSchema), createResourcePage);
router.get("/:id", getResourcePage);
router.put("/:id", validateRequest(resourceSchema), updateResourcePage);
router.delete("/:id", removeResourcePage);
router.patch("/reorder", validateRequest(reorderSchema), reorderResourcePages);

export default router;
