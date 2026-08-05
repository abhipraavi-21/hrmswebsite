import { Router } from "express";
import {
  exportEnquiries,
  getEnquiries,
  getEnquiry,
  getSettings,
  removeEnquiry,
  saveBulkStatus,
  saveEnquiryNotes,
  saveEnquiryStatus,
  saveSettings,
} from "../../controllers/admin/contact.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import {
  contactSettingsSchema,
  enquiryBulkStatusSchema,
  enquiryNotesSchema,
  enquiryStatusSchema,
} from "../../validators/contact.validators.js";

const router = Router();

router.get("/settings", getSettings);
router.put("/settings", validateRequest(contactSettingsSchema), saveSettings);

router.get("/enquiries", getEnquiries);
router.get("/enquiries/export", exportEnquiries);
router.get("/enquiries/:id", getEnquiry);
router.patch("/enquiries/:id/status", validateRequest(enquiryStatusSchema), saveEnquiryStatus);
router.patch("/enquiries/:id/notes", validateRequest(enquiryNotesSchema), saveEnquiryNotes);
router.delete("/enquiries/:id", removeEnquiry);
router.post("/enquiries/bulk-status", validateRequest(enquiryBulkStatusSchema), saveBulkStatus);

export default router;
