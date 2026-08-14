import { apiClient } from "./apiClient";
import type { PublicApiResponse } from "./cmsTypes";

export type BillingCycle = "monthly" | "half-yearly" | "yearly";

export type SubscriptionPurchaseRequest = {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string | null;
  planSlug: string;
  employeeCount: number;
  billingCycle: BillingCycle;
  paymentMethod?: string | null;
  couponCode?: string | null;
  notes?: string | null;
  sourcePage?: string | null;
  extraData?: Record<string, unknown>;
};

export type SubscriptionCouponValidationRequest = {
  couponCode: string;
  planSlug: string;
  employeeCount: number;
  billingCycle: BillingCycle;
  selectedAddOns?: Array<{ id: string }>;
};

export type SubscriptionCouponValidation = {
  code: string;
  name: string;
  description?: string | null;
  discountType: "percent" | "fixed";
  discountValue: number;
  maximumDiscount?: number | null;
  appliesToAmount: "plan_only" | "addons_only" | "plan_and_addons";
  discountAmount: number;
  taxableAmount: number;
  gstAmount: number;
  totalAmount: number;
};

export type SubscriptionPurchase = {
  id: number;
  referenceCode: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string | null;
  planSlug: string;
  planName: string;
  employeeCount: number;
  billingCycle: BillingCycle;
  billingCycleLabel: string;
  billingCycleMonths: number;
  paymentMethod?: string | null;
  pricePerEmployee: number;
  subtotalAmount: number;
  gstRate: number;
  gstAmount: number;
  totalAmount: number;
  currency: string;
  paymentStatus: "paid" | "pending" | "failed" | "refunded";
  subscriptionStatus: "active" | "pending" | "expired" | "cancelled";
  sourcePage?: string | null;
  notes?: string | null;
  purchasedAt: string;
  renewalDueAt: string;
  daysUntilRenewal: number;
  extraData?: Record<string, unknown>;
};

export async function submitSubscriptionPurchase(
  payload: SubscriptionPurchaseRequest,
  authToken?: string | null,
) {
  const response = await apiClient.post<PublicApiResponse<SubscriptionPurchase>>(
    "/public/subscription-purchases",
    payload,
    authToken
      ? {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      : undefined,
  );

  return response.data.data;
}

export async function validateSubscriptionCoupon(
  payload: SubscriptionCouponValidationRequest,
  authToken?: string | null,
) {
  const response = await apiClient.post<PublicApiResponse<SubscriptionCouponValidation>>(
    "/public/subscription-purchases/coupons/validate",
    payload,
    authToken
      ? {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      : undefined,
  );

  return response.data.data;
}
