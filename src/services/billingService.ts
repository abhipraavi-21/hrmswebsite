import { apiClient } from "./apiClient";
import type { PublicApiResponse } from "./cmsTypes";

export type BillingCycle = "monthly" | "semiannual" | "annual" | "biennial" | "triennial";
export type BillingCheckoutLifecycle = "new" | "renewal" | "upgrade" | "addon";

export type BillingFeature = {
  id: number;
  code: string;
  name: string;
  description?: string | null;
  value?: string | null;
  enabled: boolean;
  displayOrder: number;
};

export type BillingLimit = {
  id: number;
  code: string;
  name: string;
  value: number;
  unit?: string | null;
  isUnlimited: boolean;
};

export type BillingPlan = {
  id: number;
  productId: number;
  name: string;
  code: string;
  slug: string;
  description?: string | null;
  currency: string;
  isPopular: boolean;
  status: string;
  displayOrder: number;
  pricingModel?: "flat" | "per_employee";
  monthlyRate?: number | null;
  cycleDiscounts?: Partial<Record<BillingCycle, number>>;
  monthlyPrice: number;
  semiannualPrice: number;
  annualPrice: number;
  features: BillingFeature[];
  limits: BillingLimit[];
};

export type BillingAddon = {
  id: number;
  productId: number;
  name: string;
  code: string;
  description?: string | null;
  pricingType: string;
  currency: string;
  status: string;
  displayOrder: number;
  monthlyPrice?: number | null;
  semiannualPrice?: number | null;
  annualPrice?: number | null;
  unitPrice?: number | null;
  metadata?: Record<string, unknown>;
};

export type BillingProduct = {
  id: number;
  name: string;
  code: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  status: string;
  displayOrder: number;
  plans: BillingPlan[];
  addons: BillingAddon[];
};

export type CheckoutAddonSelection = {
  addonId: number;
  quantity?: number;
};

export type CheckoutPreview = {
  product: BillingProduct;
  selectedPlan: BillingPlan;
  selectedAddons: Array<{
    addonId: number;
    code: string;
    name: string;
    pricingType: string;
    quantity: number;
    unitPrice: number;
    rawTotalPrice?: number;
    billingCycleDiscountAmount?: number;
    totalPrice: number;
    metadata?: Record<string, unknown>;
  }>;
  pricing: {
    billingCycle: BillingCycle;
    billingCycleLabel: string;
    billingCycleMonths: number;
    currency: string;
    pricingModel?: "flat" | "per_employee";
    employeeCount?: number | null;
    currentEmployeeCount?: number | null;
    targetEmployeeCount?: number | null;
    additionalEmployeeCount?: number | null;
    ratePerEmployee?: number | null;
    baseAmountBeforeCycleDiscount?: number;
    addonAmountBeforeCycleDiscount?: number;
    recurringAddonAmountBeforeCycleDiscount?: number;
    subscriptionAmountBeforeCycleDiscount?: number;
    billingCycleDiscountPercent?: number;
    billingCycleDiscountAmount?: number;
    baseAmount: number;
    addonAmount: number;
    setupChargeAmount?: number;
    subtotalAmount: number;
    discountAmount: number;
    taxAmount: number;
    totalAmount: number;
    taxRate: number;
    taxName: string;
    isTaxInclusive: boolean;
    nextRenewalDate: string;
    upgradeContext?: {
      mode: string;
      remainingDays: number;
      remainingRatio: number;
      currentSubscriptionStart?: string | null;
      currentSubscriptionEnd?: string | null;
      currentEmployeeCount?: number | null;
      targetEmployeeCount?: number | null;
      additionalEmployeeCount?: number | null;
    } | null;
  };
  coupon?: {
    code: string;
    description?: string | null;
    discountType: string;
    discountValue: number;
  } | null;
};

export type CheckoutIntentResponse = {
  intentToken: string;
  expiresAt: string;
  preview: CheckoutPreview;
};

export type BillingCheckoutGatewaySession = {
  provider: "razorpay";
  keyId: string;
  orderId: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
};

export type BillingOrder = {
  id: number;
  orderNumber: string;
  customerAccountId: number;
  companyId: number;
  product: {
    id: number;
    name: string;
    code: string;
    slug: string;
  } | null;
  plan: {
    id: number;
    name: string;
    code: string;
    slug: string;
  } | null;
  company?: {
    id: number;
    name: string;
    gstin?: string | null;
  } | null;
  subscriptionId?: number | null;
  lifecycleType: string;
  billingCycle: BillingCycle;
  billingCycleLabel: string;
  billingCycleMonths: number;
  currency: string;
  baseAmount: number;
  addonAmount: number;
  setupChargeAmount?: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  gatewayProvider: string;
  gatewayOrderId?: string | null;
  status: string;
  couponCode?: string | null;
  selectedAddons: Array<{
    addonId: number;
    code: string;
    name: string;
    pricingType: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  payment?: BillingPayment | null;
  invoice?: BillingInvoice | null;
  subscription?: BillingSubscription | null;
};

export type CreateBillingOrderResponse = {
  order: BillingOrder;
  preview: CheckoutPreview;
  paymentGateway?: BillingCheckoutGatewaySession | null;
};

export type BillingPayment = {
  id: number;
  paymentNumber: string;
  orderId: number;
  customerAccountId: number;
  companyId: number;
  productId: number;
  subscriptionId?: number | null;
  gatewayProvider: string;
  gatewayTransactionId?: string | null;
  gatewayPaymentId?: string | null;
  amount: number;
  currency: string;
  status: string;
  failureReason?: string | null;
  paidAt?: string | null;
  rawResponse?: Record<string, unknown> | null;
  createdAt: string;
};

export type BillingInvoice = {
  id: number;
  invoiceNumber: string;
  orderId: number;
  subscriptionId?: number | null;
  customerAccountId: number;
  companyId: number;
  productId: number;
  planId: number;
  billingPeriodStart: string;
  billingPeriodEnd: string;
  subtotalAmount: number;
  addonAmount: number;
  setupChargeAmount?: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  status: string;
  lineItems: Array<Record<string, unknown>>;
  issuedAt: string;
};

export type BillingSubscription = {
  id: number;
  subscriptionNumber: string;
  customerAccountId: number;
  companyId: number;
  product: {
    id: number;
    name: string;
    code: string;
    slug: string;
    icon?: string | null;
  } | null;
  plan: BillingPlan | null;
  billingCycle: BillingCycle;
  billingCycleLabel: string;
  billingCycleMonths: number;
  startDate: string;
  endDate: string;
  renewalDate: string;
  status: string;
  autoRenew: boolean;
  company?: {
    id: number;
    name: string;
    gstin?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    postalCode?: string | null;
    employeeCount?: number | null;
  } | null;
  amounts: {
    basePrice: number;
    addonTotal: number;
    setupChargeAmount?: number;
    discountAmount: number;
    taxAmount: number;
    totalAmount: number;
  };
  addons: Array<{
    id: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    startDate: string;
    endDate?: string | null;
    status: string;
    addon: BillingAddon | null;
  }>;
  usage: Array<{
    id: number;
    metricCode: string;
    usedValue: number;
    limitValue: number;
    remainingValue: number;
    periodStart: string;
    periodEnd: string;
  }>;
  entitlements: {
    features: Array<{
      code: string;
      name: string;
      description?: string | null;
      value?: unknown;
      source: string;
    }>;
    limits: Array<{
      code: string;
      name: string;
      value: number;
      unit?: string | null;
      isUnlimited: boolean;
      source: string;
    }>;
  };
};

export type CustomerBillingDashboard = {
  account: {
    id: number;
    username: string;
    companyId?: number | null;
    companyName: string;
    contactName: string;
    email: string;
    phone?: string | null;
  };
  summary: {
    activeSubscriptions: number;
    totalSpent: number;
    renewalsDueSoon: number;
    invoiceCount: number;
  };
  products: BillingSubscription[];
  payments: Array<{
    id: number;
    paymentNumber: string;
    orderNumber?: string | null;
    product?: {
      id: number;
      name: string;
      slug: string;
    } | null;
    amount: number;
    currency: string;
    status: string;
    paidAt?: string | null;
    createdAt: string;
  }>;
  invoices: Array<{
    id: number;
    invoiceNumber: string;
    product?: {
      id: number;
      name: string;
      slug: string;
    } | null;
    plan?: {
      id: number;
      name: string;
      slug: string;
    } | null;
    totalAmount: number;
    currency: string;
    status: string;
    issuedAt: string;
  }>;
};

export type CheckoutBillingDetails = {
  companyName?: string | null;
  contactName?: string | null;
  email?: string | null;
  phone?: string | null;
  gstin?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postalCode?: string | null;
  employeeCount?: number | null;
};

type ApiConfig = {
  headers?: Record<string, string>;
};

function withAuthToken(authToken?: string | null): ApiConfig | undefined {
  if (!authToken) {
    return undefined;
  }

  return {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
}

export async function fetchBillingProducts() {
  const response = await apiClient.get<PublicApiResponse<BillingProduct[]>>("/public/billing/products");
  return response.data.data;
}

export async function fetchBillingProduct(productSlug: string) {
  const response = await apiClient.get<PublicApiResponse<BillingProduct>>(
    `/public/billing/products/${productSlug}`,
  );
  return response.data.data;
}

export async function previewBillingCheckout(payload: {
  productSlug: string;
  planId: number;
  billingCycle: BillingCycle;
  employeeCount?: number | null;
  addonSelections?: CheckoutAddonSelection[];
  couponCode?: string | null;
  lifecycleType?: BillingCheckoutLifecycle;
}, authToken?: string | null) {
  const response = await apiClient.post<PublicApiResponse<CheckoutPreview>>(
    "/public/billing/checkout/preview",
    payload,
    withAuthToken(authToken),
  );

  return response.data.data;
}

export async function createBillingIntent(
  payload: {
    productSlug: string;
    planId: number;
    billingCycle: BillingCycle;
    employeeCount?: number | null;
    addonSelections?: CheckoutAddonSelection[];
    couponCode?: string | null;
    sourceRoute?: string | null;
    lifecycleType?: BillingCheckoutLifecycle;
  },
  authToken?: string | null,
) {
  const response = await apiClient.post<PublicApiResponse<CheckoutIntentResponse>>(
    "/public/billing/checkout/intents",
    payload,
    withAuthToken(authToken),
  );

  return response.data.data;
}

export async function createBillingOrder(
  payload: {
    intentToken: string;
    productSlug: string;
    lifecycleType?: BillingCheckoutLifecycle;
    gatewayProvider?: string | null;
    sourceRoute?: string | null;
    couponCode?: string | null;
    notes?: string | null;
    billingDetails?: CheckoutBillingDetails;
  },
  authToken: string,
) {
  const response = await apiClient.post<PublicApiResponse<CreateBillingOrderResponse>>(
    "/public/billing/checkout/orders",
    payload,
    withAuthToken(authToken),
  );

  return response.data.data;
}

export async function completeBillingPayment(
  payload: {
    orderNumber: string;
    outcome: "success" | "failed";
    paymentMethod?: string | null;
    gatewayProvider?: string | null;
    gatewayOrderId?: string | null;
    gatewayTransactionId?: string | null;
    gatewayPaymentId?: string | null;
    gatewaySignature?: string | null;
    failureReason?: string | null;
  },
  authToken: string,
) {
  const response = await apiClient.post<
    PublicApiResponse<{
      order: BillingOrder;
      payment: BillingPayment;
      subscription?: BillingSubscription | null;
      invoice?: BillingInvoice | null;
    }>
  >("/public/billing/checkout/payments", payload, withAuthToken(authToken));

  return response.data.data;
}

export async function fetchBillingOrder(orderNumber: string, authToken: string) {
  const response = await apiClient.get<PublicApiResponse<BillingOrder>>(
    `/public/billing/orders/${orderNumber}`,
    withAuthToken(authToken),
  );
  return response.data.data;
}

export async function fetchCustomerBillingDashboard(authToken: string) {
  const response = await apiClient.get<PublicApiResponse<CustomerBillingDashboard>>(
    "/public/billing/me/dashboard",
    withAuthToken(authToken),
  );
  return response.data.data;
}

export async function fetchCustomerProductDashboard(productSlug: string, authToken: string) {
  const response = await apiClient.get<PublicApiResponse<BillingSubscription>>(
    `/public/billing/me/dashboard/${productSlug}`,
    withAuthToken(authToken),
  );
  return response.data.data;
}

export async function fetchCustomerBillingPayments(authToken: string, productSlug?: string | null) {
  const response = await apiClient.get<
    PublicApiResponse<
      Array<{
        id: number;
        paymentNumber: string;
        orderNumber?: string | null;
        product?: {
          id: number;
          name: string;
          slug: string;
        } | null;
        amount: number;
        currency: string;
        status: string;
        paidAt?: string | null;
        createdAt: string;
      }>
    >
  >("/public/billing/me/payments", {
    ...withAuthToken(authToken),
    params: productSlug ? { productSlug } : undefined,
  });

  return response.data.data;
}
