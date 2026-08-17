import { Router } from "express";
import { login, register } from "../../controllers/public/customer-auth.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import {
  customerLoginSchema,
  customerRegisterSchema,
} from "../../validators/customer-auth.validators.js";

const router = Router();

router.post("/register", validateRequest(customerRegisterSchema), register);
router.post("/login", validateRequest(customerLoginSchema), login);

export default router;
