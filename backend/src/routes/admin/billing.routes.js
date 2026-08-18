import { Router } from "express";
import {
  getOverview,
  listCustomers,
  listInvoices,
  listPayments,
  listProducts,
  listSubscriptions,
  listTaxSettings,
  updateAddon,
  updatePlan,
  updateProduct,
  updateTaxSetting,
} from "../../controllers/admin/billing.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import {
  updateAddonSchema,
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

export default router;
