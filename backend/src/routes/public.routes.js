import { Router } from "express";
import customerAuthRoutes from "./public/customer-auth.routes.js";
import billingRoutes from "./public/billing.routes.js";
import { resolveCustomerAuth } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { publicEnquirySchema } from "../validators/contact.validators.js";
import { publicSubscriptionPurchaseSchema } from "../validators/subscription.validators.js";
import {
  getContact,
  getProductContact,
  getProductHome,
  getProductPage,
  getProductPricing,
  getProductResource,
  getProductResources,
  getPage,
  getPricing,
  getResource,
  getResources,
  submitContactEnquiry,
} from "../controllers/public/content.controller.js";
import { getPublicPost, listPublicPosts } from "../controllers/public/blog.controller.js";
import { listPublicVideos } from "../controllers/public/videos.controller.js";
import { submitSubscriptionPurchase } from "../controllers/public/subscription.controller.js";

const router = Router();

router.use("/customer-auth", customerAuthRoutes);
router.use("/billing", billingRoutes);
router.get("/pages/:pageKey", getPage);
router.get("/blog-posts", listPublicPosts);
router.get("/blog-posts/:slug", getPublicPost);
router.get("/videos", listPublicVideos);
router.get("/resources", getResources);
router.get("/resources/:slug", getResource);
router.get("/pricing", getPricing);
router.get("/contact", getContact);
router.post("/contact-enquiries", validateRequest(publicEnquirySchema), submitContactEnquiry);
router.post(
  "/subscription-purchases",
  resolveCustomerAuth,
  validateRequest(publicSubscriptionPurchaseSchema),
  submitSubscriptionPurchase,
);

router.get("/:product", getProductHome);
router.get("/:product/pages/:pageKey", getProductPage);
router.get("/:product/blog-posts", listPublicPosts);
router.get("/:product/blog-posts/:slug", getPublicPost);
router.get("/:product/resources", getProductResources);
router.get("/:product/resources/:slug", getProductResource);
router.get("/:product/pricing", getProductPricing);
router.get("/:product/contact", getProductContact);

export default router;
