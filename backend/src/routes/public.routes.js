import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest.js";
import { publicEnquirySchema } from "../validators/contact.validators.js";
import {
  getContact,
  getPage,
  getHrms,
  getPricing,
  getResource,
  getResources,
  submitContactEnquiry,
} from "../controllers/public/content.controller.js";
import { getPublicPost, listPublicPosts } from "../controllers/public/blog.controller.js";

const router = Router();

router.get("/pages/:pageKey", getPage);
router.get("/blog-posts", listPublicPosts);
router.get("/blog-posts/:slug", getPublicPost);
router.get("/hrms", getHrms);
router.get("/resources", getResources);
router.get("/resources/:slug", getResource);
router.get("/pricing", getPricing);
router.get("/contact", getContact);
router.post("/contact-enquiries", validateRequest(publicEnquirySchema), submitContactEnquiry);

export default router;
