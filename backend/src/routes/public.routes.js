import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest.js";
import { publicEnquirySchema } from "../validators/contact.validators.js";
import {
  getContact,
  getHrms,
  getPage,
  getPricing,
  getResource,
  getResources,
  submitContactEnquiry,
} from "../controllers/public/content.controller.js";

const router = Router();

router.get("/pages/:pageKey", getPage);
router.get("/hrms", getHrms);
router.get("/resources", getResources);
router.get("/resources/:slug", getResource);
router.get("/pricing", getPricing);
router.get("/contact", getContact);
router.post("/contact-enquiries", validateRequest(publicEnquirySchema), submitContactEnquiry);

export default router;
