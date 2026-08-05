import { Router } from "express";
import {
  addSection,
  addSectionItem,
  editSection,
  editSectionItem,
  getPage,
  getSection,
  listPages,
  listSections,
  removeSection,
  removeSectionItem,
  reorderItems,
  reorderPageSections,
  restorePage,
  updatePageDetails,
} from "../../controllers/admin/pages.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { pageUpdateSchema, reorderSchema, sectionItemSchema, sectionSchema } from "../../validators/cms.validators.js";

const router = Router();

router.get("/", listPages);
router.get("/:id", getPage);
router.put("/:id", validateRequest(pageUpdateSchema), updatePageDetails);
router.post("/:id/restore", restorePage);
router.get("/:pageId/sections", listSections);
router.post("/:pageId/sections", validateRequest(sectionSchema), addSection);

router.get("/sections/:id", getSection);
router.put("/sections/:id", validateRequest(sectionSchema), editSection);
router.delete("/sections/:id", removeSection);
router.patch("/sections/reorder", validateRequest(reorderSchema), reorderPageSections);

router.post("/sections/:sectionId/items", validateRequest(sectionItemSchema), addSectionItem);
router.put("/section-items/:id", validateRequest(sectionItemSchema), editSectionItem);
router.delete("/section-items/:id", removeSectionItem);
router.patch("/section-items/reorder", validateRequest(reorderSchema), reorderItems);

export default router;
