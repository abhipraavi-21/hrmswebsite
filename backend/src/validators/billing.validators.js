import { z } from "zod";

const billingCycleSchema = z.enum(["monthly", "semiannual", "annual"]);

const addonSelectionSchema = z.object({
  addonId: z.coerce.number().int().positive(),
  quantity: z.coerce.number().positive().optional(),
});

const nullableString = z.string().max(255).optional().nullable();

export const checkoutPreviewSchema = z.object({
  productSlug: z.string().min(2).max(160),
  planId: z.coerce.number().int().positive(),
  billingCycle: billingCycleSchema,
  addonSelections: z.array(addonSelectionSchema).optional(),
  couponCode: z.string().max(80).optional().nullable(),
});

export const checkoutIntentSchema = checkoutPreviewSchema.extend({
  sourceRoute: z.string().max(255).optional().nullable(),
});

export const checkoutOrderSchema = z.object({
  intentToken: z.string().min(12).max(255),
  productSlug: z.string().min(2).max(160),
  lifecycleType: z.enum(["new", "renewal", "upgrade", "addon"]).optional(),
  gatewayProvider: z.string().max(40).optional().nullable(),
  sourceRoute: z.string().max(255).optional().nullable(),
  couponCode: z.string().max(80).optional().nullable(),
  notes: z.string().max(4000).optional().nullable(),
  billingDetails: z
    .object({
      companyName: nullableString,
      contactName: nullableString,
      email: z.string().email().optional().nullable(),
      phone: z.string().max(40).optional().nullable(),
      gstin: z.string().max(40).optional().nullable(),
      addressLine1: nullableString,
      addressLine2: nullableString,
      city: z.string().max(120).optional().nullable(),
      state: z.string().max(120).optional().nullable(),
      country: z.string().max(120).optional().nullable(),
      postalCode: z.string().max(20).optional().nullable(),
      employeeCount: z.coerce.number().int().nonnegative().optional().nullable(),
    })
    .optional(),
});

export const completePaymentSchema = z.object({
  orderNumber: z.string().min(8).max(120),
  outcome: z.enum(["success", "failed"]),
  paymentMethod: z.string().max(40).optional().nullable(),
  gatewayProvider: z.string().max(40).optional().nullable(),
  gatewayTransactionId: z.string().max(120).optional().nullable(),
  gatewayPaymentId: z.string().max(120).optional().nullable(),
  failureReason: z.string().max(255).optional().nullable(),
});

export const updateProductSchema = z.object({
  name: z.string().min(2).max(160).optional(),
  description: z.string().max(5000).optional().nullable(),
  icon: z.string().max(80).optional().nullable(),
  status: z.enum(["active", "inactive"]).optional(),
  displayOrder: z.coerce.number().int().min(0).optional(),
});

export const updatePlanSchema = z.object({
  name: z.string().min(2).max(160).optional(),
  description: z.string().max(5000).optional().nullable(),
  monthlyPrice: z.coerce.number().nonnegative().optional(),
  annualPrice: z.coerce.number().nonnegative().optional().nullable(),
  currency: z.string().max(10).optional(),
  status: z.enum(["active", "inactive"]).optional(),
  isPopular: z.boolean().optional(),
  displayOrder: z.coerce.number().int().min(0).optional(),
});

export const updateAddonSchema = z.object({
  name: z.string().min(2).max(160).optional(),
  description: z.string().max(5000).optional().nullable(),
  pricingType: z
    .enum([
      "FLAT_MONTHLY",
      "FLAT_YEARLY",
      "PER_EMPLOYEE",
      "PER_USER",
      "PER_ASSET",
      "PER_EMAIL_CREDIT",
      "PER_LOCATION",
      "ONE_TIME",
    ])
    .optional(),
  monthlyPrice: z.coerce.number().nonnegative().optional().nullable(),
  annualPrice: z.coerce.number().nonnegative().optional().nullable(),
  unitPrice: z.coerce.number().nonnegative().optional().nullable(),
  currency: z.string().max(10).optional(),
  status: z.enum(["active", "inactive"]).optional(),
  displayOrder: z.coerce.number().int().min(0).optional(),
  metadata: z.record(z.any()).optional().nullable(),
});

export const updateTaxSettingSchema = z.object({
  taxName: z.string().min(2).max(80).optional(),
  taxRate: z.coerce.number().min(0).max(100).optional(),
  gstin: z.string().max(40).optional().nullable(),
  sac: z.string().max(40).optional().nullable(),
  isEnabled: z.boolean().optional(),
  isInclusive: z.boolean().optional(),
});

const couponStatusSchema = z.enum(["active", "inactive"]);
const couponDiscountTypeSchema = z.enum(["percent", "fixed"]);
const couponAmountScopeSchema = z.enum(["plan_only", "addons_only", "plan_and_addons"]);
const couponBillingCycleSchema = z.enum(["monthly", "semiannual", "annual"]);
const couponLifecycleSchema = z.enum(["new", "renewal", "upgrade"]);

const couponBaseSchema = z.object({
  code: z.string().min(2).max(80).optional(),
  name: z.string().min(2).max(160).optional(),
  description: z.string().max(4000).optional().nullable(),
  discountType: couponDiscountTypeSchema.optional(),
  discountValue: z.coerce.number().positive().optional(),
  maximumDiscount: z.coerce.number().nonnegative().optional().nullable(),
  minimumOrderAmount: z.coerce.number().nonnegative().optional().nullable(),
  startsAt: z.string().datetime().optional().nullable(),
  endsAt: z.string().datetime().optional().nullable(),
  totalUsageLimit: z.coerce.number().int().positive().optional().nullable(),
  usageLimitPerCustomer: z.coerce.number().int().positive().optional().nullable(),
  newCustomersOnly: z.boolean().optional(),
  appliesToAmount: couponAmountScopeSchema.optional(),
  billingCycles: z.array(couponBillingCycleSchema).min(1).optional(),
  lifecycleTypes: z.array(couponLifecycleSchema).min(1).optional(),
  productIds: z.array(z.coerce.number().int().positive()).optional(),
  planIds: z.array(z.coerce.number().int().positive()).optional(),
  status: couponStatusSchema.optional(),
});

export const createCouponSchema = couponBaseSchema.extend({
  code: z.string().min(2).max(80),
  name: z.string().min(2).max(160),
  discountType: couponDiscountTypeSchema,
  discountValue: z.coerce.number().positive(),
});

export const updateCouponSchema = couponBaseSchema;

export const couponListQuerySchema = z.object({
  search: z.string().max(120).optional(),
  status: z.enum(["active", "inactive", "expired"]).optional(),
});
