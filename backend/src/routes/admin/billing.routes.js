import { Router } from "express";
import {
  getOverview,
  createCoupon,
  deleteCoupon,
  getCoupon,
  listCustomers,
  listCoupons,
  listInvoices,
  listPayments,
  listProducts,
  listSubscriptions,
  listTaxSettings,
  updateAddon,
  updateCoupon,
  updatePlan,
  updateProduct,
  updateTaxSetting,
} from "../../controllers/admin/billing.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import {
  couponListQuerySchema,
  createCouponSchema,
  updateAddonSchema,
  updateCouponSchema,
  updatePlanSchema,
  updateProductSchema,
  updateTaxSettingSchema,
} from "../../validators/billing.validators.js";

const router = Router();

router.get("/overview", getOverview);
router.get("/customers", listCustomers);
router.get("/products", listProducts);
router.put("/products/:productId", validateRequest(updateProductSchema), updateProduct);
router.put("/plans/:planId", validateRequest(updatePlanSchema), updatePlan);
router.put("/addons/:addonId", validateRequest(updateAddonSchema), updateAddon);
router.get("/subscriptions", listSubscriptions);
router.get("/payments", listPayments);
router.get("/invoices", listInvoices);
router.get("/taxes", listTaxSettings);
router.put("/taxes/:taxSettingId", validateRequest(updateTaxSettingSchema), updateTaxSetting);
router.get("/coupons", validateRequest(couponListQuerySchema, "query"), listCoupons);
router.post("/coupons", validateRequest(createCouponSchema), createCoupon);
router.get("/coupons/:couponId", getCoupon);
router.put("/coupons/:couponId", validateRequest(updateCouponSchema), updateCoupon);
router.delete("/coupons/:couponId", deleteCoupon);

export default router;
