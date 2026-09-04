import { Router } from "express";
import {
  createIntent,
  createOrder,
  getDashboard,
  getOrder,
  getPayments,
  getProduct,
  getProductDashboard,
  listProducts,
  payOrder,
  previewOrder,
} from "../../controllers/public/billing.controller.js";
import { requireCustomerAuth, resolveCustomerAuth } from "../../middleware/auth.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import {
  checkoutIntentSchema,
  checkoutOrderSchema,
  checkoutPreviewSchema,
  completePaymentSchema,
} from "../../validators/billing.validators.js";

const router = Router();

router.get("/products", listProducts);
router.get("/products/:productSlug", getProduct);
router.post("/checkout/preview", resolveCustomerAuth, validateRequest(checkoutPreviewSchema), previewOrder);
router.post("/checkout/intents", resolveCustomerAuth, validateRequest(checkoutIntentSchema), createIntent);
router.post("/checkout/orders", requireCustomerAuth, validateRequest(checkoutOrderSchema), createOrder);
router.post("/checkout/payments", requireCustomerAuth, validateRequest(completePaymentSchema), payOrder);
router.get("/orders/:orderNumber", requireCustomerAuth, getOrder);
router.get("/me/dashboard", requireCustomerAuth, getDashboard);
router.get("/me/dashboard/:productSlug", requireCustomerAuth, getProductDashboard);
router.get("/me/payments", requireCustomerAuth, getPayments);

export default router;
