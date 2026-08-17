import { Router } from "express";
import { getSubscription, listSubscriptions } from "../../controllers/admin/subscription.controller.js";

const router = Router();

router.get("/", listSubscriptions);
router.get("/:id", getSubscription);

export default router;
