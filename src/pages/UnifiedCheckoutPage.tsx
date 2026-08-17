import { isAxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  LockKeyhole,
  ReceiptText,
  Sparkles,
  UserRound,
  UserRoundPlus,
} from "lucide-react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import AssetManagementNavbar from "@/components/site/AssetManagementNavbar";
import BulkEmailNavbar from "@/components/site/BulkEmailNavbar";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getBillingProductContent } from "@/data/billingContent";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/routes/routeConfig.js";
import {
  fetchCustomerProductDashboard,
  completeBillingPayment,
  createBillingIntent,
  createBillingOrder,
  fetchBillingProduct,
  previewBillingCheckout,
  type BillingAddon,
  type BillingCheckoutLifecycle,
  type BillingCycle,
  type BillingCheckoutGatewaySession,
  type BillingPlan,
  type BillingProduct,
  type BillingSubscription,
  type CheckoutBillingDetails,
  type CheckoutPreview,
} from "@/services/billingService";
import {
  loginCustomerAccount,
  registerCustomerAccount,
  type CustomerAuthSession,
} from "@/services/customerAccountAuthService";
import {
  clearCustomerSession,
  loadCustomerSession,
  saveCustomerSession,
} from "@/services/customerSessionStorage";

type CheckoutMode = "login" | "register";
type CheckoutLifecycleMode = "standard" | "addon";

type CheckoutFormState = CheckoutBillingDetails & {
  username: string;
  password: string;
  notes: string;
  couponCode: string;
  paymentMethod: "upi" | "card" | "bank-transfer";
};

type RazorpaySuccessResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayFailureResponse = {
  error?: {
    description?: string;
    metadata?: {
      order_id?: string;
      payment_id?: string;
    };
  };
};

type RazorpayCheckoutOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpaySuccessResponse) => void | Promise<void>;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  modal?: {
    ondismiss?: () => void;
  };
  theme?: {
    color: string;
  };
};

type RazorpayCheckoutInstance = {
  open: () => void;
  on: (event: "payment.failed", handler: (response: RazorpayFailureResponse) => void) => void;
};

type BillingAddonMetadata = {
  pricingSummary?: string;
  minimumLabel?: string;
  details?: string[];
  quantityLabel?: string;
  minimumQuantity?: number;
  defaultQuantity?: number;
  defaultToEmployeeCount?: boolean;
  showQuantityInput?: boolean;
  usesEmployeeCount?: boolean;
  includedQuantity?: number;
  chargeableQuantity?: number;
  selectedQuantity?: number;
  stepQuantity?: number;
  calculationMode?: string;
  [key: string]: unknown;
};

type AddonSelectionState = {
  selected: boolean;
  quantity: number;
  autoQuantity?: boolean;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayCheckoutInstance;
  }
}

const DEFAULT_COUNTRY = "India";
const HRMS_DEFAULT_EMPLOYEE_COUNT = 20;
const HRMS_BILLING_CYCLE_OPTIONS: Array<{
  value: BillingCycle;
  label: string;
  description: string;
}> = [
  {
    value: "annual",
    label: "1 Year",
    description: "12 months. No default discount.",
  },
  {
    value: "biennial",
    label: "2 Years",
    description: "24 months. 10% default discount.",
  },
  {
    value: "triennial",
    label: "3 Years",
    description: "36 months. 20% default discount.",
  },
];
let razorpayScriptPromise: Promise<void> | null = null;

function loadRazorpayScript() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Razorpay is only available in the browser."));
  }

  if (window.Razorpay) {
    return Promise.resolve();
  }

  if (razorpayScriptPromise) {
    return razorpayScriptPromise;
  }

  razorpayScriptPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Razorpay checkout could not be loaded.")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Razorpay checkout could not be loaded."));
    document.body.appendChild(script);
  }).catch((error) => {
    razorpayScriptPromise = null;
    throw error;
  });

  return razorpayScriptPromise;
}

function formatCurrency(value: number) {
  const normalizedValue = Number.isFinite(value) ? value : 0;
  const hasDecimals = Math.abs(normalizedValue % 1) > 0.001;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(normalizedValue);
}

function formatDate(value?: string | Date | null) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function resolveMode(value: string | null): CheckoutMode {
  return value === "login" ? "login" : "register";
}

function resolveCheckoutLifecycle(
  value: string | null,
  productSlug: string,
): CheckoutLifecycleMode {
  return value === "addon" && isHrmsCheckout(productSlug) ? "addon" : "standard";
}

function isHrmsCheckout(productSlug: string) {
  return productSlug === "hrms";
}

function getBillingCycleOptions(productSlug: string) {
  if (isHrmsCheckout(productSlug)) {
    return HRMS_BILLING_CYCLE_OPTIONS;
  }

  return [
    {
      value: "monthly" as BillingCycle,
      label: "Monthly",
      description: "Renews every month.",
    },
    {
      value: "semiannual" as BillingCycle,
      label: "6 Months",
      description: "Renews every 6 months.",
    },
    {
      value: "annual" as BillingCycle,
      label: "1 Year",
      description: "Renews once per year.",
    },
  ];
}

function resolveBillingCycle(value: string | null, productSlug: string): BillingCycle {
  const normalizedValue = value?.trim().toLowerCase();

  if (
    normalizedValue === "triennial" ||
    normalizedValue === "3year" ||
    normalizedValue === "3years" ||
    normalizedValue === "three-year" ||
    normalizedValue === "three-years"
  ) {
    return "triennial";
  }

  if (
    normalizedValue === "biennial" ||
    normalizedValue === "2year" ||
    normalizedValue === "2years" ||
    normalizedValue === "two-year" ||
    normalizedValue === "two-years"
  ) {
    return "biennial";
  }

  if (
    normalizedValue === "annual" ||
    normalizedValue === "yearly" ||
    normalizedValue === "year" ||
    normalizedValue === "1year" ||
    normalizedValue === "1-year"
  ) {
    return "annual";
  }

  if (
    normalizedValue === "semiannual" ||
    normalizedValue === "semi-annual" ||
    normalizedValue === "half-yearly" ||
    normalizedValue === "halfyearly" ||
    normalizedValue === "6-month" ||
    normalizedValue === "6-months"
  ) {
    return "semiannual";
  }

  if (isHrmsCheckout(productSlug)) {
    return "annual";
  }

  return "monthly";
}

function normalizePlanLookupValue(value: string | number | null | undefined) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function getLegacyPlanAliases(value: string | null) {
  const normalizedValue = normalizePlanLookupValue(value);

  if (normalizedValue === "basic") {
    return ["basic", "starter"];
  }

  if (normalizedValue === "premium") {
    return ["premium", "enterprise"];
  }

  return normalizedValue ? [normalizedValue] : [];
}

function resolvePlanFromParam(product: BillingProduct | null, value: string | null) {
  const plans = product?.plans ?? [];
  const numericPlanId = Number(value);

  if (Number.isInteger(numericPlanId) && numericPlanId > 0) {
    const plan = plans.find((entry) => entry.id === numericPlanId);

    if (plan) {
      return plan;
    }
  }

  const aliases = getLegacyPlanAliases(value);

  return (
    plans.find((plan) => {
      const candidates = [plan.slug, plan.code, plan.name, plan.id].map(normalizePlanLookupValue);

      return aliases.some((alias) => candidates.includes(alias));
    }) ??
    plans[0] ??
    null
  );
}

function resolveEmployeeCount(value: string | null, productSlug: string) {
  const employeeCount = Number.parseInt(value ?? "", 10);

  if (Number.isFinite(employeeCount) && employeeCount > 0) {
    return employeeCount;
  }

  return isHrmsCheckout(productSlug) ? HRMS_DEFAULT_EMPLOYEE_COUNT : 0;
}

function getAddonMetadata(addon: { metadata?: Record<string, unknown> | undefined }) {
  const metadata = addon.metadata;

  return metadata && typeof metadata === "object" && !Array.isArray(metadata)
    ? (metadata as BillingAddonMetadata)
    : {};
}

function getAddonMetadataNumber(metadata: BillingAddonMetadata, key: string, fallback = 0) {
  const parsedValue = Number(metadata[key]);
  return Number.isFinite(parsedValue) ? parsedValue : fallback;
}

function getAddonDefaultQuantity(addon: BillingAddon, employeeCount: number) {
  const metadata = getAddonMetadata(addon);
  const minimumQuantity = Math.max(
    1,
    Math.round(getAddonMetadataNumber(metadata, "minimumQuantity", 1)),
  );

  if (metadata.defaultToEmployeeCount) {
    return Math.max(minimumQuantity, employeeCount || HRMS_DEFAULT_EMPLOYEE_COUNT);
  }

  const defaultQuantity = Math.max(
    minimumQuantity,
    Math.round(getAddonMetadataNumber(metadata, "defaultQuantity", minimumQuantity)),
  );

  return defaultQuantity;
}

function normalizeAddonQuantityValue(addon: BillingAddon, quantity: number, employeeCount: number) {
  const metadata = getAddonMetadata(addon);
  const minimumQuantity = Math.max(
    1,
    Math.round(getAddonMetadataNumber(metadata, "minimumQuantity", 1)),
  );
  const fallbackQuantity = getAddonDefaultQuantity(addon, employeeCount);
  const normalizedQuantity = Number.isFinite(quantity) ? Math.max(0, Math.round(quantity)) : 0;

  return Math.max(minimumQuantity, normalizedQuantity || fallbackQuantity);
}

function buildAddonSelectionState(
  product: BillingProduct | null,
  employeeCount: number,
  currentState: Record<number, AddonSelectionState> = {},
) {
  const nextState: Record<number, AddonSelectionState> = {};

  for (const addon of product?.addons ?? []) {
    const metadata = getAddonMetadata(addon);
    const previousState = currentState[addon.id];
    const autoQuantity = previousState?.autoQuantity ?? Boolean(metadata.defaultToEmployeeCount);
    const defaultQuantity = getAddonDefaultQuantity(addon, employeeCount);

    nextState[addon.id] = {
      selected: previousState?.selected ?? false,
      quantity: autoQuantity
        ? defaultQuantity
        : normalizeAddonQuantityValue(addon, previousState?.quantity ?? defaultQuantity, employeeCount),
      autoQuantity,
    };
  }

  return nextState;
}

function getSubscriptionEmployeeCount(subscription: BillingSubscription | null) {
  const employeeCount = Number(subscription?.company?.employeeCount ?? 0);
  return Number.isFinite(employeeCount) ? Math.max(0, Math.round(employeeCount)) : 0;
}

function getSubscriptionAddonQuantityMap(subscription: BillingSubscription | null) {
  return (subscription?.addons ?? []).reduce<Record<number, number>>((result, addonEntry) => {
    if (addonEntry.status !== "active" || !addonEntry.addon?.id) {
      return result;
    }

    result[addonEntry.addon.id] = Math.max(0, Math.round(Number(addonEntry.quantity) || 0));
    return result;
  }, {});
}

function buildUpgradeAddonSelectionState(
  product: BillingProduct | null,
  employeeCount: number,
  subscription: BillingSubscription | null,
  currentState: Record<number, AddonSelectionState> = {},
) {
  const nextState = buildAddonSelectionState(product, employeeCount, currentState);

  for (const addonEntry of subscription?.addons ?? []) {
    if (addonEntry.status !== "active" || !addonEntry.addon?.id) {
      continue;
    }

    const catalogAddon = product?.addons.find((addon) => addon.id === addonEntry.addon?.id);
    const addonMetadata = catalogAddon ? getAddonMetadata(catalogAddon) : {};
    const lockedQuantity = Math.max(0, Math.round(Number(addonEntry.quantity) || 0));
    const shouldFollowEmployeeCount =
      Boolean(addonMetadata.usesEmployeeCount) ||
      (Boolean(addonMetadata.defaultToEmployeeCount) && !Boolean(addonMetadata.showQuantityInput));

    nextState[addonEntry.addon.id] = {
      selected: true,
      quantity: shouldFollowEmployeeCount
        ? Math.max(lockedQuantity, employeeCount)
        : Math.max(lockedQuantity, nextState[addonEntry.addon.id]?.quantity ?? lockedQuantity),
      autoQuantity: shouldFollowEmployeeCount,
    };
  }

  return nextState;
}

function getAddonSelections(
  selectionState: Record<number, AddonSelectionState>,
) {
  return Object.entries(selectionState)
    .filter(([, entry]) => entry.selected)
    .map(([addonId, entry]) => ({
      addonId: Number(addonId),
      quantity: entry.quantity,
    }));
}

function renderChrome(navVariant: "default" | "bulkEmail" | "assetManagement") {
  if (navVariant === "bulkEmail") {
    return <BulkEmailNavbar />;
  }

  if (navVariant === "assetManagement") {
    return <AssetManagementNavbar />;
  }

  return (
    <>
      <TopNavbar />
      <MainNavbar />
    </>
  );
}

function getPricingHref(productSlug: string) {
  if (productSlug === "bulk-email") {
    return ROUTES.bulkEmailPricing;
  }

  if (productSlug === "asset-management") {
    return ROUTES.assetManagementPricing;
  }

  return ROUTES.hrmsPricing;
}

function usesQuantity(addon: BillingAddon, productSlug: string) {
  const metadata = getAddonMetadata(addon);

  if (typeof metadata.showQuantityInput === "boolean") {
    return metadata.showQuantityInput;
  }

  if (isHrmsCheckout(productSlug) && addon.pricingType === "PER_EMPLOYEE") {
    return false;
  }

  return !addon.pricingType.startsWith("FLAT_") && addon.pricingType !== "ONE_TIME";
}

function getAddonPriceSummary(addon: BillingAddon, billingCycle: BillingCycle, productSlug: string) {
  const metadata = getAddonMetadata(addon);

  if (typeof metadata.pricingSummary === "string" && metadata.pricingSummary.trim().length > 0) {
    return metadata.pricingSummary;
  }

  const usesEmployeeAddonPricing =
    isHrmsCheckout(productSlug) && addon.pricingType === "PER_EMPLOYEE";
  const displayPrice =
    usesEmployeeAddonPricing
      ? (addon.unitPrice ?? addon.monthlyPrice ?? 0)
      : billingCycle === "annual"
        ? (addon.annualPrice ?? addon.unitPrice ?? addon.monthlyPrice ?? 0)
        : billingCycle === "semiannual"
          ? (addon.semiannualPrice ?? addon.unitPrice ?? addon.monthlyPrice ?? 0)
          : (addon.monthlyPrice ?? addon.unitPrice ?? 0);

  return usesEmployeeAddonPricing
    ? `${formatCurrency(displayPrice)} / employee / month`
    : formatCurrency(displayPrice);
}

function getAddonQuantityLabel(addon: BillingAddon) {
  const metadata = getAddonMetadata(addon);
  return typeof metadata.quantityLabel === "string" && metadata.quantityLabel.trim().length > 0
    ? metadata.quantityLabel
    : "Qty";
}

function getAddonMinimumLabel(addon: BillingAddon) {
  const metadata = getAddonMetadata(addon);
  return typeof metadata.minimumLabel === "string" && metadata.minimumLabel.trim().length > 0
    ? metadata.minimumLabel
    : null;
}

function getAddonDetails(addon: BillingAddon) {
  const metadata = getAddonMetadata(addon);
  return Array.isArray(metadata.details)
    ? metadata.details.filter((detail): detail is string => typeof detail === "string" && detail.trim().length > 0)
    : [];
}

function formatSelectedAddonLabel(
  addonLine: CheckoutPreview["selectedAddons"][number],
  productSlug: string,
) {
  const metadata = getAddonMetadata({ metadata: addonLine.metadata });
  const quantityLabel =
    typeof metadata.quantityLabel === "string" && metadata.quantityLabel.trim().length > 0
      ? metadata.quantityLabel.toLowerCase()
      : "qty";

  if (isHrmsCheckout(productSlug) && metadata.usesEmployeeCount) {
    return `${addonLine.name} (${formatCurrency(addonLine.unitPrice)} / employee / month, ${addonLine.quantity} ${quantityLabel})`;
  }

  if (Number(metadata.targetQuantity ?? 0) > 0) {
    const currentQuantity = Number(metadata.currentQuantity ?? 0);
    const targetQuantity = Number(metadata.targetQuantity ?? addonLine.quantity);
    const billedQuantity = Number(metadata.billedQuantity ?? 0);

    if (currentQuantity > 0) {
      return `${addonLine.name} (current ${currentQuantity} ${quantityLabel}, target ${targetQuantity} ${quantityLabel}, +${billedQuantity} billed)`;
    }
  }

  if (metadata.calculationMode === "one_time_after_included") {
    const billedQuantity = Number(metadata.chargeableQuantity ?? 0);
    return `${addonLine.name} (${addonLine.quantity} ${quantityLabel}, ${billedQuantity} billed)`;
  }

  return `${addonLine.name} (${addonLine.quantity} ${quantityLabel})`;
}

function mapSessionToForm(
  session: CustomerAuthSession,
  current: CheckoutFormState,
): CheckoutFormState {
  return {
    ...current,
    companyName: session.account.companyName,
    contactName: session.account.contactName,
    email: session.account.email,
    phone: session.account.phone ?? "",
    username: session.account.username,
    password: "",
  };
}

export default function UnifiedCheckoutPage() {
  const navigate = useNavigate();
  const { productSlug = "hrms" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const productContent = getBillingProductContent(productSlug);
  const checkoutLifecycle = resolveCheckoutLifecycle(searchParams.get("lifecycle"), productSlug);
  const isAddonLifecycle = checkoutLifecycle === "addon";
  const [product, setProduct] = useState<BillingProduct | null>(null);
  const [preview, setPreview] = useState<CheckoutPreview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [isUpgradeSubscriptionLoading, setIsUpgradeSubscriptionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [upgradeSubscriptionError, setUpgradeSubscriptionError] = useState<string | null>(null);
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);
  const [customerSession, setCustomerSession] = useState<CustomerAuthSession | null>(() =>
    loadCustomerSession(),
  );
  const [upgradeSubscription, setUpgradeSubscription] = useState<BillingSubscription | null>(null);
  const [addonSelections, setAddonSelections] = useState<Record<number, AddonSelectionState>>({});
  const [form, setForm] = useState<CheckoutFormState>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    gstin: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: DEFAULT_COUNTRY,
    postalCode: "",
    employeeCount: resolveEmployeeCount(searchParams.get("employees"), productSlug),
    notes: "",
    couponCode: "",
    paymentMethod: "upi",
  });

  const billingCycle = resolveBillingCycle(searchParams.get("billing"), productSlug);
  const mode = isAddonLifecycle ? "login" : resolveMode(searchParams.get("mode"));
  const selectedPlan = resolvePlanFromParam(product, searchParams.get("plan"));
  const selectedAddonCount = getAddonSelections(addonSelections).length;
  const billingCycleOptions = useMemo(() => getBillingCycleOptions(productSlug), [productSlug]);
  const activeAddonQuantityMap = useMemo(
    () => getSubscriptionAddonQuantityMap(upgradeSubscription),
    [upgradeSubscription],
  );
  const minimumEmployeeCount = useMemo(
    () => (isAddonLifecycle ? getSubscriptionEmployeeCount(upgradeSubscription) : 1),
    [isAddonLifecycle, upgradeSubscription],
  );
  const billingLifecycleType: BillingCheckoutLifecycle | undefined = isAddonLifecycle
    ? "addon"
    : undefined;

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setError(null);

    void fetchBillingProduct(productSlug)
        .then((nextProduct) => {
          if (!isMounted) {
            return;
          }

          setProduct(nextProduct);
          setAddonSelections((current) =>
            buildAddonSelectionState(nextProduct, form.employeeCount ?? HRMS_DEFAULT_EMPLOYEE_COUNT, current),
          );
        })
      .catch(() => {
        if (isMounted) {
          setError(
            "The product checkout catalog could not be loaded. Start the backend and refresh the page.",
          );
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [productSlug]);

  useEffect(() => {
    if (!product) {
      return;
    }

    setAddonSelections((current) =>
      isAddonLifecycle
        ? buildUpgradeAddonSelectionState(
            product,
            Math.max(minimumEmployeeCount, form.employeeCount ?? HRMS_DEFAULT_EMPLOYEE_COUNT),
            upgradeSubscription,
            current,
          )
        : buildAddonSelectionState(
            product,
            form.employeeCount ?? HRMS_DEFAULT_EMPLOYEE_COUNT,
            current,
          ),
    );
  }, [form.employeeCount, isAddonLifecycle, minimumEmployeeCount, product, upgradeSubscription]);

  useEffect(() => {
    if (!isAddonLifecycle) {
      setUpgradeSubscription(null);
      setUpgradeSubscriptionError(null);
      setIsUpgradeSubscriptionLoading(false);
      return;
    }

    if (!customerSession?.token) {
      setUpgradeSubscription(null);
      setUpgradeSubscriptionError(null);
      setIsUpgradeSubscriptionLoading(false);
      return;
    }

    let isMounted = true;
    setIsUpgradeSubscriptionLoading(true);
    setUpgradeSubscriptionError(null);

    void fetchCustomerProductDashboard(productSlug, customerSession.token)
      .then((nextSubscription) => {
        if (isMounted) {
          setUpgradeSubscription(nextSubscription);
        }
      })
      .catch((requestError) => {
        if (!isMounted) {
          return;
        }

        setUpgradeSubscription(null);

        if (isAxiosError(requestError)) {
          const message =
            (typeof requestError.response?.data?.message === "string" &&
              requestError.response.data.message) ||
            (typeof requestError.response?.data?.error === "string" &&
              requestError.response.data.error) ||
            null;

          setUpgradeSubscriptionError(
            message ?? "An active HRMS subscription is required before add-ons can be upgraded.",
          );
          return;
        }

        setUpgradeSubscriptionError(
          "An active HRMS subscription is required before add-ons can be upgraded.",
        );
      })
      .finally(() => {
        if (isMounted) {
          setIsUpgradeSubscriptionLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [customerSession?.token, isAddonLifecycle, productSlug]);

  useEffect(() => {
    if (!isAddonLifecycle || !product || !upgradeSubscription) {
      return;
    }

    const subscriptionEmployeeCount = getSubscriptionEmployeeCount(upgradeSubscription);
    const requestedEmployeeCount = resolveEmployeeCount(searchParams.get("employees"), productSlug);
    const nextEmployeeCount = Math.max(subscriptionEmployeeCount, requestedEmployeeCount);

    setForm((current) => ({
      ...current,
      companyName: current.companyName || upgradeSubscription.company?.name || "",
      contactName: current.contactName || customerSession?.account.contactName || "",
      email: current.email || customerSession?.account.email || "",
      phone: current.phone || customerSession?.account.phone || "",
      gstin: current.gstin || upgradeSubscription.company?.gstin || "",
      addressLine1: current.addressLine1 || "",
      addressLine2: current.addressLine2 || "",
      city: current.city || upgradeSubscription.company?.city || "",
      state: current.state || upgradeSubscription.company?.state || "",
      country: current.country || upgradeSubscription.company?.country || DEFAULT_COUNTRY,
      postalCode: current.postalCode || upgradeSubscription.company?.postalCode || "",
      employeeCount: Math.max(subscriptionEmployeeCount, Number(current.employeeCount) || nextEmployeeCount),
    }));
    setAddonSelections((current) =>
      buildUpgradeAddonSelectionState(product, nextEmployeeCount, upgradeSubscription, current),
    );

    const nextParams = new URLSearchParams(searchParams);

    if (upgradeSubscription.plan?.id) {
      nextParams.set("plan", String(upgradeSubscription.plan.id));
    }

    nextParams.set("billing", upgradeSubscription.billingCycle);
    nextParams.set("mode", "login");
    nextParams.set("lifecycle", "addon");
    nextParams.set("employees", String(nextEmployeeCount));

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [
    customerSession,
    isAddonLifecycle,
    product,
    productSlug,
    searchParams,
    setSearchParams,
    upgradeSubscription,
  ]);

  useEffect(() => {
    if (!product || !selectedPlan) {
      return;
    }

    const currentPlanParam = searchParams.get("plan");
    const currentBillingParam = searchParams.get("billing");
    const currentModeParam = searchParams.get("mode");
    const currentLifecycleParam = searchParams.get("lifecycle");
    const shouldNormalizePlan = currentPlanParam !== String(selectedPlan.id);
    const shouldNormalizeBilling = currentBillingParam !== billingCycle;
    const shouldNormalizeMode = currentModeParam !== mode;
    const shouldNormalizeLifecycle = isAddonLifecycle
      ? currentLifecycleParam !== "addon"
      : currentLifecycleParam === "addon";

    if (
      !shouldNormalizePlan &&
      !shouldNormalizeBilling &&
      !shouldNormalizeMode &&
      !shouldNormalizeLifecycle
    ) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("plan", String(selectedPlan.id));
    nextParams.set("billing", billingCycle);
    nextParams.set("mode", mode);

    if (isAddonLifecycle) {
      nextParams.set("lifecycle", "addon");
    } else {
      nextParams.delete("lifecycle");
    }

    setSearchParams(nextParams, { replace: true });
  }, [billingCycle, isAddonLifecycle, mode, product, searchParams, selectedPlan, setSearchParams]);

  useEffect(() => {
    if (!customerSession) {
      return;
    }

    setForm((current) => mapSessionToForm(customerSession, current));
  }, [customerSession]);

  useEffect(() => {
    if (!selectedPlan) {
      setPreview(null);
      return;
    }

    if (isAddonLifecycle && (!customerSession?.token || !upgradeSubscription)) {
      setPreview(null);
      setIsPreviewLoading(false);
      return;
    }

    let isMounted = true;
    setIsPreviewLoading(true);

    void previewBillingCheckout(
      {
        productSlug,
        planId: selectedPlan.id,
        billingCycle,
        employeeCount: Number(form.employeeCount) || 0,
        addonSelections: getAddonSelections(addonSelections),
        couponCode: appliedCouponCode,
        lifecycleType: billingLifecycleType,
      },
      customerSession?.token,
    )
      .then((nextPreview) => {
        if (isMounted) {
          setPreview(nextPreview);
        }
      })
      .catch(() => {
        if (isMounted) {
          setPreview(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsPreviewLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [
    addonSelections,
    appliedCouponCode,
    billingCycle,
    billingLifecycleType,
    customerSession?.token,
    form.employeeCount,
    isAddonLifecycle,
    productSlug,
    selectedPlan,
    upgradeSubscription,
  ]);

  const updateSearchParam = (
    updates: Partial<Record<"plan" | "billing" | "mode" | "lifecycle", string>>,
  ) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      nextParams.set(key, value);
    });

    setSearchParams(nextParams, { replace: true });
  };

  const updateForm = <K extends keyof CheckoutFormState>(key: K, value: CheckoutFormState[K]) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const toggleAddon = (addon: BillingAddon) => {
    const lockedQuantity = activeAddonQuantityMap[addon.id] ?? 0;

    if (isAddonLifecycle && lockedQuantity > 0) {
      return;
    }

    const defaultQuantity = getAddonDefaultQuantity(
      addon,
      Math.max(minimumEmployeeCount, form.employeeCount ?? HRMS_DEFAULT_EMPLOYEE_COUNT),
    );
    const metadata = getAddonMetadata(addon);

    setAddonSelections((current) => ({
      ...current,
      [addon.id]: {
        selected: !current[addon.id]?.selected,
        quantity: Math.max(
          lockedQuantity,
          current[addon.id]?.autoQuantity || !current[addon.id]?.quantity
            ? defaultQuantity
            : current[addon.id].quantity,
        ),
        autoQuantity: current[addon.id]?.autoQuantity ?? Boolean(metadata.defaultToEmployeeCount),
      },
    }));
  };

  const updateAddonQuantity = (addon: BillingAddon, quantity: number) => {
    const lockedQuantity = activeAddonQuantityMap[addon.id] ?? 0;

    setAddonSelections((current) => ({
      ...current,
      [addon.id]: {
        ...current[addon.id],
        selected: true,
        quantity: Math.max(
          lockedQuantity,
          normalizeAddonQuantityValue(
            addon,
            quantity,
            Math.max(minimumEmployeeCount, form.employeeCount ?? HRMS_DEFAULT_EMPLOYEE_COUNT),
          ),
        ),
        autoQuantity: false,
      },
    }));
  };

  const validateRegister = () => {
    if (!form.companyName?.trim()) {
      toast.error("Enter the company name before continuing.");
      return false;
    }

    if (!form.contactName?.trim()) {
      toast.error("Enter the billing contact before continuing.");
      return false;
    }

    if (!form.email?.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("Enter a valid billing email address.");
      return false;
    }

    if (!form.username.trim()) {
      toast.error("Choose a username for the new account.");
      return false;
    }

    if (form.password.trim().length < 6) {
      toast.error("Enter a password with at least 6 characters.");
      return false;
    }

    return true;
  };

  const validateLogin = () => {
    if (!form.username.trim()) {
      toast.error("Enter the username to continue.");
      return false;
    }

    if (!form.password.trim()) {
      toast.error("Enter the password to continue.");
      return false;
    }

    return true;
  };

  const handleAuthenticate = async () => {
    if (customerSession) {
      return customerSession;
    }

    setIsAuthenticating(true);

    try {
      let session: CustomerAuthSession;

      if (mode === "login") {
        if (!validateLogin()) {
          return null;
        }

        session = await loginCustomerAccount({
          username: form.username.trim(),
          password: form.password,
        });
        toast.success("Login successful. Continue with checkout.");
      } else {
        if (!validateRegister()) {
          return null;
        }

        session = await registerCustomerAccount({
          companyName: form.companyName?.trim() ?? "",
          contactName: form.contactName?.trim() ?? "",
          email: form.email?.trim() ?? "",
          phone: form.phone?.trim() || null,
          username: form.username.trim(),
          password: form.password,
        });
        toast.success("Registration successful. Continue with checkout.");
      }

      saveCustomerSession(session);
      setCustomerSession(session);
      setForm((current) => mapSessionToForm(session, current));
      return session;
    } catch (requestError) {
      if (isAxiosError(requestError)) {
        const message =
          (typeof requestError.response?.data?.message === "string" &&
            requestError.response.data.message) ||
          (typeof requestError.response?.data?.error === "string" &&
            requestError.response.data.error) ||
          null;

        toast.error(message ?? "Unable to continue right now.");
      } else {
        toast.error("Unable to continue right now.");
      }

      return null;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleApplyCoupon = async () => {
    const nextCouponCode = form.couponCode.trim().toUpperCase();

    if (!nextCouponCode) {
      setAppliedCouponCode(null);
      toast.success("Coupon removed from the order summary.");
      return;
    }

    if (!selectedPlan) {
      toast.error("Select a plan before applying a coupon.");
      return;
    }

    try {
      const nextPreview = await previewBillingCheckout(
        {
          productSlug,
          planId: selectedPlan.id,
          billingCycle,
          employeeCount: Number(form.employeeCount) || 0,
          addonSelections: getAddonSelections(addonSelections),
          couponCode: nextCouponCode,
          lifecycleType: billingLifecycleType,
        },
        customerSession?.token,
      );

      setAppliedCouponCode(nextCouponCode);
      setPreview(nextPreview);
      toast.success("Coupon applied successfully.");
    } catch (requestError) {
      if (isAxiosError(requestError)) {
        const message =
          (typeof requestError.response?.data?.message === "string" &&
            requestError.response.data.message) ||
          (typeof requestError.response?.data?.error === "string" &&
            requestError.response.data.error) ||
          null;

        toast.error(message ?? "Coupon could not be applied.");
      } else {
        toast.error("Coupon could not be applied.");
      }
    }
  };

  const handleUseDifferentAccount = () => {
    clearCustomerSession();
    setCustomerSession(null);
    toast.success("Customer session cleared for this browser.");
  };

  const handlePayment = async () => {
    if (!selectedPlan || !preview) {
      toast.error("Select a plan and wait for the summary before paying.");
      return;
    }

    if (isHrmsCheckout(productSlug) && (Number(form.employeeCount) || 0) < 1) {
      toast.error("Enter the employee count before continuing to payment.");
      return;
    }

    if (isAddonLifecycle && !customerSession) {
      toast.error("Login to the customer account before upgrading add-ons.");
      return;
    }

    if (isAddonLifecycle && !upgradeSubscription) {
      toast.error(
        upgradeSubscriptionError ??
          "An active HRMS subscription is required before add-ons can be upgraded.",
      );
      return;
    }

    if (isAddonLifecycle && preview.pricing.totalAmount <= 0) {
      toast.error("Increase employees or add-on quantities to create an upgrade payment.");
      return;
    }

    const activeSession = await handleAuthenticate();

    if (!activeSession) {
      return;
    }

    setIsSubmittingPayment(true);
    let shouldResetSubmittingState = true;

    try {
      const intent = await createBillingIntent(
        {
          productSlug,
          planId: selectedPlan.id,
          billingCycle,
          employeeCount: Number(form.employeeCount) || 0,
          addonSelections: getAddonSelections(addonSelections),
          couponCode: appliedCouponCode,
          sourceRoute: `/checkout/${productSlug}`,
          lifecycleType: billingLifecycleType,
        },
        activeSession.token,
      );

      const orderResponse = await createBillingOrder(
        {
          intentToken: intent.intentToken,
          productSlug,
          lifecycleType: billingLifecycleType,
          gatewayProvider: "razorpay",
          sourceRoute: `/checkout/${productSlug}`,
          notes: form.notes.trim() || null,
          billingDetails: {
            companyName: form.companyName?.trim() || null,
            contactName: form.contactName?.trim() || null,
            email: form.email?.trim() || null,
            phone: form.phone?.trim() || null,
            gstin: form.gstin?.trim() || null,
            addressLine1: form.addressLine1?.trim() || null,
            addressLine2: form.addressLine2?.trim() || null,
            city: form.city?.trim() || null,
            state: form.state?.trim() || null,
            country: form.country?.trim() || null,
            postalCode: form.postalCode?.trim() || null,
            employeeCount: Number(form.employeeCount) || 0,
          },
        },
        activeSession.token,
      );

      const paymentGateway: BillingCheckoutGatewaySession | null | undefined =
        orderResponse.paymentGateway;

      if (!paymentGateway || paymentGateway.provider !== "razorpay") {
        throw new Error("Razorpay checkout details were not returned by the server.");
      }

      await loadRazorpayScript();

      if (!window.Razorpay) {
        throw new Error("Razorpay checkout is not available in this browser.");
      }

      let paymentSettled = false;
      const openPaymentStatusPage = (route: string, orderNumber: string) => {
        navigate(
          `${route}?${new URLSearchParams({
            order: orderNumber,
          }).toString()}`,
        );
      };

      const razorpay = new window.Razorpay({
        key: paymentGateway.keyId,
        amount: paymentGateway.amount,
        currency: paymentGateway.currency,
        name: paymentGateway.name,
        description: paymentGateway.description,
        order_id: paymentGateway.orderId,
        prefill: {
          name: form.contactName?.trim() || customerSession?.account.contactName || undefined,
          email: form.email?.trim() || customerSession?.account.email || undefined,
          contact: form.phone?.trim() || customerSession?.account.phone || undefined,
        },
        notes: {
          orderNumber: orderResponse.order.orderNumber,
          product: productContent.productLabel,
        },
        modal: {
          ondismiss: () => {
            if (paymentSettled) {
              return;
            }

            setIsSubmittingPayment(false);
            toast.message("Razorpay checkout was closed before the payment finished.");
          },
        },
        theme: {
          color: "#2563eb",
        },
        handler: async (razorpayResponse) => {
          paymentSettled = true;

          try {
            const paymentResponse = await completeBillingPayment(
              {
                orderNumber: orderResponse.order.orderNumber,
                outcome: "success",
                paymentMethod: form.paymentMethod,
                gatewayProvider: "razorpay",
                gatewayOrderId: razorpayResponse.razorpay_order_id,
                gatewayTransactionId: razorpayResponse.razorpay_payment_id,
                gatewayPaymentId: razorpayResponse.razorpay_payment_id,
                gatewaySignature: razorpayResponse.razorpay_signature,
              },
              activeSession.token,
            );

            openPaymentStatusPage(ROUTES.paymentSuccess, paymentResponse.order.orderNumber);
          } catch (requestError) {
            if (isAxiosError(requestError)) {
              const message =
                (typeof requestError.response?.data?.message === "string" &&
                  requestError.response.data.message) ||
                (typeof requestError.response?.data?.error === "string" &&
                  requestError.response.data.error) ||
                null;

              toast.error(message ?? "The payment was captured, but the checkout could not be finalized.");
            } else {
              toast.error("The payment was captured, but the checkout could not be finalized.");
            }
          } finally {
            setIsSubmittingPayment(false);
          }
        },
      });

      razorpay.on("payment.failed", async (failureResponse) => {
        paymentSettled = true;

        try {
          const paymentResponse = await completeBillingPayment(
            {
              orderNumber: orderResponse.order.orderNumber,
              outcome: "failed",
              paymentMethod: form.paymentMethod,
              gatewayProvider: "razorpay",
              gatewayOrderId:
                failureResponse.error?.metadata?.order_id ?? paymentGateway.orderId,
              gatewayTransactionId: failureResponse.error?.metadata?.payment_id ?? null,
              gatewayPaymentId: failureResponse.error?.metadata?.payment_id ?? null,
              failureReason:
                failureResponse.error?.description ?? "Razorpay reported a failed payment.",
            },
            activeSession.token,
          );

          openPaymentStatusPage(ROUTES.paymentFailed, paymentResponse.order.orderNumber);
        } catch (requestError) {
          if (isAxiosError(requestError)) {
            const message =
              (typeof requestError.response?.data?.message === "string" &&
                requestError.response.data.message) ||
              (typeof requestError.response?.data?.error === "string" &&
                requestError.response.data.error) ||
              null;

            toast.error(message ?? "The failed payment could not be recorded.");
          } else {
            toast.error("The failed payment could not be recorded.");
          }
        } finally {
          setIsSubmittingPayment(false);
        }
      });

      razorpay.open();
      shouldResetSubmittingState = false;
    } catch (requestError) {
      if (isAxiosError(requestError)) {
        const message =
          (typeof requestError.response?.data?.message === "string" &&
            requestError.response.data.message) ||
          (typeof requestError.response?.data?.error === "string" &&
            requestError.response.data.error) ||
          null;

        toast.error(message ?? "Unable to process the checkout right now.");
      } else {
        toast.error(
          requestError instanceof Error
            ? requestError.message
            : "Unable to process the checkout right now.",
        );
      }
    } finally {
      if (shouldResetSubmittingState) {
        setIsSubmittingPayment(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={`${productContent.productLabel} Checkout | Altroz`}
        description={`Complete the ${productContent.productLabel} plan selection, add-ons, GST and payment flow using the shared Altroz checkout architecture.`}
        canonicalPath={`/checkout/${productSlug}`}
      />
      {renderChrome(productContent.navVariant)}

      <main className="overflow-x-hidden">
        <section className="hero-gradient relative overflow-hidden py-10 sm:py-14 lg:py-16">
          <div className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 top-12 h-64 w-64 rounded-full bg-success/10 blur-3xl" />

          <div className="container-x">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="border-primary/20 bg-primary-soft px-4 py-2 text-primary shadow-sm">
                Shared checkout
              </Badge>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">
                {productContent.productLabel} subscription checkout
              </h1>
              <p className="mt-4 text-base leading-8 text-ink-soft sm:text-lg">
                Keep login, registration, add-ons, taxes, payment status, activation and renewals
                aligned under one reusable flow.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="container-x grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card className="border-border/80 bg-white shadow-float">
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl font-black text-ink">
                      Configure your order
                    </CardTitle>
                    <CardDescription className="mt-1 text-sm text-ink-soft">
                      {isAddonLifecycle
                        ? "Log in to the active customer account, increase employees or add-on quantities, then pay only the upgrade amount for the remaining subscription term."
                        : isHrmsCheckout(productSlug)
                        ? "Switch plans, choose a 1 to 3 year billing term with built-in discounts, then authenticate and pay."
                        : "Switch plans, choose monthly or longer billing, add product-specific extras, then authenticate and pay."}
                    </CardDescription>
                  </div>
                  <Link to={getPricingHref(productSlug)} className="btn-outline">
                    <ArrowLeft className="h-4 w-4" />
                    Back to pricing
                  </Link>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {isLoading ? (
                  <div className="rounded-[1.5rem] border border-border bg-surface/40 p-6 text-sm text-ink-soft">
                    Loading checkout catalog...
                  </div>
                ) : error ? (
                  <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
                    {error}
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                          Access step
                        </div>
                        <h2 className="mt-2 text-xl font-black text-ink">
                          {isAddonLifecycle
                            ? "Login to upgrade the active subscription"
                            : mode === "login"
                              ? "Login to continue"
                              : "Register to continue"}
                        </h2>
                        <p className="mt-2 text-sm leading-7 text-ink-soft">
                          {isAddonLifecycle
                            ? "Use the existing customer account. After login, the checkout loads the active HRMS subscription and lets you increase employees, assets, applicants or other add-ons."
                            : "Existing users authenticate with username and password only. New users create the account first, then continue with the same shared checkout."}
                        </p>
                      </div>

                      <div className="grid gap-3 rounded-[1.5rem] border border-border bg-surface/40 p-3 sm:grid-cols-2">
                        {(
                          isAddonLifecycle
                            ? [
                                {
                                  value: "login",
                                  title: "Existing user",
                                  description:
                                    "Login to load the current subscription before upgrading quantities.",
                                  icon: LockKeyhole,
                                },
                              ]
                            : [
                                {
                                  value: "login",
                                  title: "Existing user",
                                  description: "Only username and password are required here.",
                                  icon: LockKeyhole,
                                },
                                {
                                  value: "register",
                                  title: "New user",
                                  description: "Create the account first, then continue to payment.",
                                  icon: UserRoundPlus,
                                },
                              ]
                        ).map((option) => {
                          const isSelected = mode === option.value;

                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => updateSearchParam({ mode: option.value })}
                              className={cn(
                                "rounded-[1.25rem] border p-4 text-left transition-all",
                                isSelected
                                  ? "border-primary bg-white shadow-sm ring-1 ring-primary/10"
                                  : "border-transparent bg-transparent hover:border-primary/20 hover:bg-white",
                              )}
                            >
                              <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                                <option.icon className="h-4 w-4 text-primary" />
                                {option.title}
                              </div>
                              <div className="mt-2 text-xs leading-6 text-ink-soft">
                                {option.description}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {customerSession ? (
                        <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-4">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">
                                Authenticated account
                              </div>
                              <p className="mt-2 text-sm leading-7 text-emerald-800">
                                Logged in as {customerSession.account.username}. This customer
                                session will receive the {productContent.productLabel} order and
                                renewal records.
                              </p>
                              {isAddonLifecycle ? (
                                <p className="mt-2 text-sm leading-7 text-emerald-800">
                                  The checkout will use this account&apos;s active subscription to
                                  calculate only the added amount for the remaining term.
                                </p>
                              ) : null}
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleUseDifferentAccount}
                            >
                              Use different account
                            </Button>
                          </div>
                        </div>
                      ) : null}

                      {isAddonLifecycle && isUpgradeSubscriptionLoading ? (
                        <div className="rounded-[1.5rem] border border-border bg-surface/40 p-4 text-sm text-ink-soft">
                          Loading the current HRMS subscription for this account...
                        </div>
                      ) : null}

                      {isAddonLifecycle && upgradeSubscriptionError ? (
                        <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                          {upgradeSubscriptionError}
                        </div>
                      ) : mode === "login" ? (
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="checkout-login-username">Username</Label>
                            <Input
                              id="checkout-login-username"
                              value={form.username}
                              onChange={(event) => updateForm("username", event.target.value)}
                              placeholder="Enter username"
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="checkout-login-password">Password</Label>
                            <Input
                              id="checkout-login-password"
                              type="password"
                              value={form.password}
                              onChange={(event) => updateForm("password", event.target.value)}
                              placeholder="Enter password"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="checkout-company-name">Company name</Label>
                            <Input
                              id="checkout-company-name"
                              value={form.companyName ?? ""}
                              onChange={(event) => updateForm("companyName", event.target.value)}
                              placeholder="Your company name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="checkout-contact-name">Billing contact</Label>
                            <Input
                              id="checkout-contact-name"
                              value={form.contactName ?? ""}
                              onChange={(event) => updateForm("contactName", event.target.value)}
                              placeholder="Full name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="checkout-phone">Phone number</Label>
                            <Input
                              id="checkout-phone"
                              value={form.phone ?? ""}
                              onChange={(event) => updateForm("phone", event.target.value)}
                              placeholder="+91 98765 43210"
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="checkout-email">Billing email</Label>
                            <Input
                              id="checkout-email"
                              type="email"
                              value={form.email ?? ""}
                              onChange={(event) => updateForm("email", event.target.value)}
                              placeholder="billing@company.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="checkout-register-username">Username</Label>
                            <Input
                              id="checkout-register-username"
                              value={form.username}
                              onChange={(event) => updateForm("username", event.target.value)}
                              placeholder="Choose a username"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="checkout-register-password">Password</Label>
                            <Input
                              id="checkout-register-password"
                              type="password"
                              value={form.password}
                              onChange={(event) => updateForm("password", event.target.value)}
                              placeholder="Create a password"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {isHrmsCheckout(productSlug) ? (
                      <div className="space-y-4">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                            Team size
                          </div>
                          <h2 className="mt-2 text-xl font-black text-ink">
                            {isAddonLifecycle
                              ? "Increase employee count if this account needs more seats"
                              : "Select the number of employees first"}
                          </h2>
                          <p className="mt-2 text-sm leading-7 text-ink-soft">
                            {isAddonLifecycle
                              ? "Use the final employee total here. The checkout compares it with the current subscription and bills only the additional amount for the remaining term."
                              : "Plan rates, add-ons, setup charges and the final payable amount all use this employee count."}
                          </p>
                        </div>

                        <div className="rounded-[1.5rem] border border-border bg-surface/40 p-5">
                          <div className="grid gap-4 sm:grid-cols-[minmax(0,220px)_1fr] sm:items-end">
                            <div className="space-y-2">
                              <Label htmlFor="checkout-team-size">Employees</Label>
                              <Input
                                id="checkout-team-size"
                                type="number"
                                min={minimumEmployeeCount}
                                value={String(form.employeeCount ?? HRMS_DEFAULT_EMPLOYEE_COUNT)}
                                onChange={(event) =>
                                  updateForm("employeeCount", Math.max(
                                    minimumEmployeeCount,
                                    Number.parseInt(event.target.value || "0", 10) || 0,
                                  ))
                                }
                                placeholder={String(HRMS_DEFAULT_EMPLOYEE_COUNT)}
                              />
                            </div>
                            <div className="rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm leading-7 text-ink-soft">
                              {isAddonLifecycle
                                ? `Current subscription count: ${minimumEmployeeCount} employees. Enter the new total, not only the extra seats.`
                                : "Example flow: employees x plan rate x subscription months, then term discount, then one-time setup, then coupon discount."}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                          Plan selection
                        </div>
                        <h2 className="mt-2 text-xl font-black text-ink">
                          {isAddonLifecycle
                            ? "The upgrade uses your current active plan"
                            : "Choose the plan you want to activate"}
                        </h2>
                        {isAddonLifecycle ? (
                          <p className="mt-2 text-sm leading-7 text-ink-soft">
                            Plan changes still use the standard purchase or renewal flow. This
                            screen only adds more capacity to the active subscription.
                          </p>
                        ) : null}
                      </div>

                      <div className="grid gap-3 lg:grid-cols-3">
                        {(product?.plans ?? []).map((plan) => {
                          const isSelected = selectedPlan?.id === plan.id;
                          const isPlanLocked =
                            isAddonLifecycle && upgradeSubscription?.plan?.id !== plan.id;
                          const usesEmployeePricing =
                            plan.pricingModel === "per_employee" && typeof plan.monthlyRate === "number";
                          const cyclePrice =
                            billingCycle === "annual"
                              ? plan.annualPrice
                              : billingCycle === "biennial"
                                ? plan.annualPrice * 2
                                : billingCycle === "triennial"
                                  ? plan.annualPrice * 3
                              : billingCycle === "semiannual"
                                ? plan.semiannualPrice
                                : plan.monthlyPrice;

                          return (
                            <button
                              key={plan.id}
                              type="button"
                              aria-pressed={isSelected}
                              disabled={isPlanLocked}
                              onClick={() =>
                                updateSearchParam({
                                  plan: String(plan.id),
                                })
                              }
                              className={cn(
                                "rounded-[1.5rem] border p-5 text-left shadow-sm transition-all disabled:cursor-not-allowed disabled:opacity-60",
                                isSelected
                                  ? "border-primary bg-primary-soft/40 ring-1 ring-primary/10"
                                  : "border-border bg-white hover:border-primary/30",
                              )}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                                  {plan.name}
                                </div>
                                {isSelected ? (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                    Selected
                                  </span>
                                ) : null}
                              </div>
                              <div className="mt-3 text-3xl font-black text-ink">
                                {formatCurrency(usesEmployeePricing ? plan.monthlyRate : cyclePrice)}
                              </div>
                              <div className="mt-1 text-sm text-ink-soft">
                                {usesEmployeePricing
                                  ? "per employee / month"
                                  : billingCycle === "annual"
                                    ? "for 1 year"
                                    : billingCycle === "biennial"
                                      ? "for 2 years"
                                      : billingCycle === "triennial"
                                        ? "for 3 years"
                                        : billingCycle === "semiannual"
                                          ? "for 6 months"
                                          : "for 1 month"}
                              </div>
                              {usesEmployeePricing ? (
                                <div className="mt-2 text-xs leading-6 text-ink-soft">
                                  Final total updates from your employee count and the selected
                                  term discount.
                                </div>
                              ) : null}
                              <p className="mt-3 text-sm leading-7 text-ink-soft">
                                {plan.description}
                              </p>
                              {isPlanLocked ? (
                                <div className="mt-3 text-xs leading-6 text-ink-soft">
                                  Upgrade add-ons on the current plan first. Switch plans with a
                                  separate renewal or upgrade checkout.
                                </div>
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                          Billing cycle
                        </div>
                        <h2 className="mt-2 text-xl font-black text-ink">
                          {isAddonLifecycle
                            ? "The upgrade keeps the current renewal timeline"
                            : "Set the renewal timeline"}
                        </h2>
                      </div>

                      <div
                        className={cn(
                          "grid gap-3",
                          billingCycleOptions.length > 3 ? "sm:grid-cols-2 xl:grid-cols-4" : "sm:grid-cols-3",
                        )}
                      >
                        {billingCycleOptions.map((cycle) => {
                          const isSelected = billingCycle === cycle.value;
                          const isCycleLocked =
                            isAddonLifecycle && upgradeSubscription?.billingCycle !== cycle.value;

                          return (
                            <button
                              key={cycle.value}
                              type="button"
                              disabled={isCycleLocked}
                              onClick={() =>
                                updateSearchParam({
                                  billing: cycle.value,
                                })
                              }
                              className={cn(
                                "rounded-[1.5rem] border p-4 text-left shadow-sm transition-all disabled:cursor-not-allowed disabled:opacity-60",
                                isSelected
                                  ? "border-primary bg-white ring-1 ring-primary/10"
                                  : "border-border bg-surface/40 hover:border-primary/30 hover:bg-white",
                              )}
                            >
                              <div className="text-sm font-semibold text-ink">{cycle.label}</div>
                              <div className="mt-1 text-xs leading-6 text-ink-soft">
                                {cycle.description}
                              </div>
                              {isCycleLocked ? (
                                <div className="mt-2 text-[11px] leading-5 text-ink-soft">
                                  Renewal stays on the current term during add-on upgrades.
                                </div>
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                            Add-ons
                          </div>
                          <h2 className="mt-2 text-xl font-black text-ink">
                            {isAddonLifecycle
                              ? `Increase or add more extras for ${productContent.shortLabel}`
                              : `Optional extras for ${productContent.shortLabel}`}
                          </h2>
                          {isAddonLifecycle ? (
                            <p className="mt-2 text-sm leading-7 text-ink-soft">
                              Existing add-ons stay selected. Enter the new final total for assets,
                              applicants or users when you need more than the current subscription
                              already includes.
                            </p>
                          ) : null}
                        </div>
                        <Badge className="border-primary/20 bg-primary-soft text-primary">
                          {selectedAddonCount} selected
                        </Badge>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        {(product?.addons ?? []).map((addon) => {
                          const addonMetadata = getAddonMetadata(addon);
                          const addonDetails = getAddonDetails(addon);
                          const minimumLabel = getAddonMinimumLabel(addon);
                          const quantityLabel = getAddonQuantityLabel(addon);
                          const state = addonSelections[addon.id] ?? {
                            selected: false,
                            quantity: getAddonDefaultQuantity(
                              addon,
                              form.employeeCount ?? HRMS_DEFAULT_EMPLOYEE_COUNT,
                            ),
                          };
                          const lockedQuantity = activeAddonQuantityMap[addon.id] ?? 0;
                          const isLockedAddon = isAddonLifecycle && lockedQuantity > 0;
                          const priceSummary = getAddonPriceSummary(addon, billingCycle, productSlug);
                          const quantityInputMin = Math.max(
                            1,
                            Math.round(getAddonMetadataNumber(addonMetadata, "minimumQuantity", 1)),
                          );
                          const effectiveQuantityInputMin = Math.max(
                            quantityInputMin,
                            lockedQuantity,
                          );

                          return (
                            <div
                              key={addon.id}
                              className={cn(
                                "rounded-[1.5rem] border p-4 shadow-sm transition-all",
                                state.selected
                                  ? "border-primary bg-primary-soft/40 ring-1 ring-primary/10"
                                  : "border-border bg-white",
                              )}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                                    {addon.pricingType.replaceAll("_", " ")}
                                  </div>
                                  <div className="mt-2 text-lg font-black text-ink">
                                    {addon.name}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => toggleAddon(addon)}
                                  disabled={isLockedAddon}
                                  className={cn(
                                    "rounded-full border px-3 py-1 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-70",
                                    state.selected
                                      ? "border-primary bg-primary text-white"
                                      : "border-border bg-white text-ink",
                                  )}
                                >
                                  {isLockedAddon ? "Current" : state.selected ? "Added" : "Add"}
                                </button>
                              </div>

                              <p className="mt-3 text-sm leading-7 text-ink-soft">
                                {addon.description}
                              </p>
                              {isLockedAddon ? (
                                <div className="mt-3 rounded-2xl border border-primary/15 bg-white px-3 py-2 text-xs leading-6 text-ink-soft">
                                  Current quantity: {lockedQuantity} {quantityLabel.toLowerCase()}.
                                  Enter a higher final total if you need to expand this add-on.
                                </div>
                              ) : null}
                              <div className="mt-4 space-y-3">
                                <div className="rounded-2xl border border-primary/15 bg-primary-soft/25 p-3">
                                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                                    Pricing
                                  </div>
                                  <div className="mt-2 text-sm font-semibold text-ink">
                                    {priceSummary}
                                  </div>
                                </div>

                                {minimumLabel ? (
                                  <div className="rounded-2xl border border-border bg-surface/40 p-3">
                                    <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                                      Minimum / Included
                                    </div>
                                    <div className="mt-2 text-sm font-semibold text-ink">
                                      {minimumLabel}
                                    </div>
                                  </div>
                                ) : null}

                                {addonDetails.length ? (
                                  <div className="space-y-2">
                                    {addonDetails.map((detail) => (
                                      <div
                                        key={detail}
                                        className="rounded-2xl bg-surface/35 px-3 py-2 text-xs leading-6 text-ink-soft"
                                      >
                                        {detail}
                                      </div>
                                    ))}
                                  </div>
                                ) : null}

                                {usesQuantity(addon, productSlug) ? (
                                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-white px-3 py-3">
                                    <div>
                                      <Label
                                        htmlFor={`addon-${addon.id}-quantity`}
                                        className="text-xs font-bold uppercase tracking-[0.18em] text-primary"
                                      >
                                        {quantityLabel}
                                      </Label>
                                      <div className="mt-1 text-xs leading-6 text-ink-soft">
                                        Update the {quantityLabel.toLowerCase()} count used in the
                                        add-on calculation.
                                      </div>
                                    </div>
                                    <Input
                                      id={`addon-${addon.id}-quantity`}
                                      type="number"
                                      min={effectiveQuantityInputMin}
                                      className="h-10 w-28"
                                      value={state.quantity}
                                      onChange={(event) =>
                                        updateAddonQuantity(
                                          addon,
                                          Number.parseInt(event.target.value || "0", 10) || 0,
                                        )
                                      }
                                    />
                                  </div>
                                ) : (
                                  <div className="rounded-2xl border border-border bg-white px-3 py-3 text-xs leading-6 text-ink-soft">
                                    Final charges use the selected employee count and subscription
                                    term.
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                          Billing details
                        </div>
                        <h2 className="mt-2 text-xl font-black text-ink">
                          Details that flow into admin and invoices
                        </h2>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="checkout-company-name-billing">Company name</Label>
                          <Input
                            id="checkout-company-name-billing"
                            value={form.companyName ?? ""}
                            onChange={(event) => updateForm("companyName", event.target.value)}
                            placeholder="Company or legal entity name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="checkout-contact-name-billing">Billing contact</Label>
                          <Input
                            id="checkout-contact-name-billing"
                            value={form.contactName ?? ""}
                            onChange={(event) => updateForm("contactName", event.target.value)}
                            placeholder="Billing contact name"
                          />
                        </div>
                        {isHrmsCheckout(productSlug) ? (
                          <div className="space-y-2 rounded-[1.25rem] border border-primary/15 bg-primary-soft/20 p-4 sm:col-span-2">
                            <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                              Employee count in use
                            </div>
                            <div className="text-lg font-black text-ink">
                              {form.employeeCount ?? HRMS_DEFAULT_EMPLOYEE_COUNT} employees
                            </div>
                            <p className="text-sm leading-7 text-ink-soft">
                              HRMS plan charges, add-ons, setup charges and coupon totals all use
                              the employee count selected above.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Label htmlFor="checkout-employee-count">Employee count</Label>
                            <Input
                              id="checkout-employee-count"
                              type="number"
                              min={0}
                              value={String(form.employeeCount ?? 0)}
                              onChange={(event) =>
                                updateForm(
                                  "employeeCount",
                                  Number.parseInt(event.target.value || "0", 10) || 0,
                                )
                              }
                              placeholder="0"
                            />
                          </div>
                        )}
                        <div className="space-y-2">
                          <Label htmlFor="checkout-gstin">GSTIN</Label>
                          <Input
                            id="checkout-gstin"
                            value={form.gstin ?? ""}
                            onChange={(event) => updateForm("gstin", event.target.value)}
                            placeholder="GST number if available"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="checkout-postal-code">PIN / postal code</Label>
                          <Input
                            id="checkout-postal-code"
                            value={form.postalCode ?? ""}
                            onChange={(event) => updateForm("postalCode", event.target.value)}
                            placeholder="PIN code"
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="checkout-address-line-1">Address line 1</Label>
                          <Input
                            id="checkout-address-line-1"
                            value={form.addressLine1 ?? ""}
                            onChange={(event) => updateForm("addressLine1", event.target.value)}
                            placeholder="Street, building or office address"
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="checkout-address-line-2">Address line 2</Label>
                          <Input
                            id="checkout-address-line-2"
                            value={form.addressLine2 ?? ""}
                            onChange={(event) => updateForm("addressLine2", event.target.value)}
                            placeholder="Additional address information"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="checkout-city">City</Label>
                          <Input
                            id="checkout-city"
                            value={form.city ?? ""}
                            onChange={(event) => updateForm("city", event.target.value)}
                            placeholder="City"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="checkout-state">State</Label>
                          <Input
                            id="checkout-state"
                            value={form.state ?? ""}
                            onChange={(event) => updateForm("state", event.target.value)}
                            placeholder="State"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="checkout-country">Country</Label>
                          <Input
                            id="checkout-country"
                            value={form.country ?? DEFAULT_COUNTRY}
                            onChange={(event) => updateForm("country", event.target.value)}
                            placeholder="Country"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="checkout-billing-phone">Billing phone</Label>
                          <Input
                            id="checkout-billing-phone"
                            value={form.phone ?? ""}
                            onChange={(event) => updateForm("phone", event.target.value)}
                            placeholder="Billing phone"
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="checkout-billing-email-alt">Billing email</Label>
                          <Input
                            id="checkout-billing-email-alt"
                            type="email"
                            value={form.email ?? ""}
                            onChange={(event) => updateForm("email", event.target.value)}
                            placeholder="billing@company.com"
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="checkout-coupon">Coupon code</Label>
                          <div className="flex gap-3">
                            <Input
                              id="checkout-coupon"
                              value={form.couponCode}
                              onChange={(event) => updateForm("couponCode", event.target.value)}
                              placeholder="Enter coupon code"
                            />
                            <Button type="button" variant="outline" onClick={handleApplyCoupon}>
                              Apply
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="checkout-notes">Notes for onboarding or billing</Label>
                          <Textarea
                            id="checkout-notes"
                            value={form.notes}
                            onChange={(event) => updateForm("notes", event.target.value)}
                            placeholder="Add onboarding notes, PO references or billing remarks"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                          Payment method
                        </div>
                        <h2 className="mt-2 text-xl font-black text-ink">
                          Choose how this payment is recorded
                        </h2>
                      </div>

                      <div className="grid gap-3 md:grid-cols-3">
                        {[
                          {
                            value: "upi",
                            label: "UPI",
                            description: "Fast online settlement.",
                          },
                          {
                            value: "card",
                            label: "Card",
                            description: "Standard card-based checkout.",
                          },
                          {
                            value: "bank-transfer",
                            label: "Bank Transfer",
                            description: "For finance-led settlements.",
                          },
                        ].map((method) => {
                          const isSelected = form.paymentMethod === method.value;

                          return (
                            <button
                              key={method.value}
                              type="button"
                              onClick={() => updateForm("paymentMethod", method.value)}
                              className={cn(
                                "rounded-[1.5rem] border p-4 text-left shadow-sm transition-all",
                                isSelected
                                  ? "border-primary bg-white ring-1 ring-primary/10"
                                  : "border-border bg-surface/40 hover:border-primary/30 hover:bg-white",
                              )}
                            >
                              <div className="text-sm font-semibold text-ink">{method.label}</div>
                              <div className="mt-1 text-xs leading-6 text-ink-soft">
                                {method.description}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-sm text-ink-soft">
                        {customerSession
                          ? `Authenticated as ${customerSession.account.username}.`
                          : isAddonLifecycle
                            ? "Login with the existing account before the upgrade amount is calculated."
                            : mode === "login"
                            ? "Login with username and password before payment."
                            : "Register the account before payment is recorded."}
                      </span>
                      <div className="flex flex-wrap gap-3">
                        {!customerSession ? (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => void handleAuthenticate()}
                            disabled={isAuthenticating}
                          >
                            {isAuthenticating
                              ? "Please wait..."
                              : isAddonLifecycle
                                ? "Login and load subscription"
                                : mode === "login"
                                ? "Login and continue"
                                : "Register and continue"}
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        ) : null}

                        <Button
                          type="button"
                          onClick={() => void handlePayment()}
                          disabled={
                            isSubmittingPayment ||
                            isAuthenticating ||
                            !selectedPlan ||
                            isPreviewLoading ||
                            (isAddonLifecycle &&
                              (isUpgradeSubscriptionLoading ||
                                !customerSession ||
                                !upgradeSubscription ||
                                (preview?.pricing.totalAmount ?? 0) <= 0)) ||
                            (isHrmsCheckout(productSlug) && (Number(form.employeeCount) || 0) < 1)
                          }
                        >
                          {isSubmittingPayment
                            ? "Opening Razorpay..."
                            : isAddonLifecycle
                              ? "Pay upgrade with Razorpay"
                              : "Pay with Razorpay"}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-border/80 bg-white shadow-float">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl font-black text-ink">Order summary</CardTitle>
                      <CardDescription className="mt-1 text-sm text-ink-soft">
                        {isAddonLifecycle
                          ? "The backend compares your active subscription with the new employee and add-on totals, then bills only the added amount for the remaining term."
                          : isHrmsCheckout(productSlug)
                          ? "The backend calculates plan charges, add-ons, duration discount, setup charges, coupon discount and the final payable amount in one flow."
                          : "Prices, add-ons, coupons, GST and the total payable amount are calculated by the backend."}
                      </CardDescription>
                    </div>
                    <Badge className="border-primary/20 bg-primary-soft text-primary">
                      {preview?.pricing.billingCycleLabel ?? "Loading"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {selectedPlan ? (
                    <div className="rounded-2xl border border-border bg-surface/30 p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                        Selected plan
                      </div>
                      <div className="mt-2 text-2xl font-black text-ink">{selectedPlan.name}</div>
                      <p className="mt-2 text-sm text-ink-soft">{selectedPlan.description}</p>
                    </div>
                  ) : null}

                  {isPreviewLoading ? (
                    <div className="rounded-2xl border border-border bg-surface/30 p-4 text-sm text-ink-soft">
                      Recalculating the summary...
                    </div>
                  ) : preview ? (
                    <>
                      {preview.pricing.upgradeContext ? (
                        <div className="rounded-2xl border border-primary/20 bg-primary-soft/20 p-4 text-sm leading-7 text-ink-soft">
                          Remaining term:{" "}
                          <span className="font-semibold text-ink">
                            {preview.pricing.upgradeContext.remainingDays} days
                          </span>
                          . Current employees:{" "}
                          <span className="font-semibold text-ink">
                            {preview.pricing.upgradeContext.currentEmployeeCount ?? 0}
                          </span>
                          . New total after this payment:{" "}
                          <span className="font-semibold text-ink">
                            {preview.pricing.upgradeContext.targetEmployeeCount ?? 0}
                          </span>
                          .
                        </div>
                      ) : null}

                      <div className="space-y-3 text-sm text-ink-soft">
                        {isHrmsCheckout(productSlug) &&
                        preview.pricing.pricingModel === "per_employee" ? (
                          <>
                            <div className="flex items-center justify-between gap-3">
                              <span>Rate / employee / month</span>
                              <span className="font-semibold text-ink">
                                {formatCurrency(preview.pricing.ratePerEmployee ?? 0)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                              <span>Employees</span>
                              <span className="font-semibold text-ink">
                                {preview.pricing.employeeCount ?? 0}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                              <span>
                                {preview.pricing.upgradeContext
                                  ? "Additional plan cost for the remaining term"
                                  : `Plan cost for ${preview.pricing.billingCycleLabel.toLowerCase()}`}
                              </span>
                              <span className="font-semibold text-ink">
                                {formatCurrency(
                                  preview.pricing.baseAmountBeforeCycleDiscount ??
                                    preview.pricing.baseAmount,
                                )}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                              <span>
                                {preview.pricing.upgradeContext
                                  ? "Additional add-ons for the remaining term"
                                  : `Add-ons for ${preview.pricing.billingCycleLabel.toLowerCase()}`}
                              </span>
                              <span className="font-semibold text-ink">
                                {formatCurrency(
                                  preview.pricing.addonAmountBeforeCycleDiscount ??
                                    preview.pricing.addonAmount,
                                )}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                              <span>
                                {preview.pricing.upgradeContext
                                  ? "Recurring upgrade amount before term discount"
                                  : "Subscription amount before duration discount"}
                              </span>
                              <span className="font-semibold text-ink">
                                {formatCurrency(
                                  preview.pricing.subscriptionAmountBeforeCycleDiscount ??
                                    (preview.pricing.baseAmountBeforeCycleDiscount ??
                                      preview.pricing.baseAmount) +
                                      (preview.pricing.addonAmountBeforeCycleDiscount ??
                                        preview.pricing.addonAmount),
                                )}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                              <span>
                                {preview.pricing.billingCycleLabel} discount (
                                {preview.pricing.billingCycleDiscountPercent ?? 0}%)
                              </span>
                              <span className="font-semibold text-ink">
                                -{" "}
                                {formatCurrency(preview.pricing.billingCycleDiscountAmount ?? 0)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                              <span>Subscription after duration discount</span>
                              <span className="font-semibold text-ink">
                                {formatCurrency(
                                  preview.pricing.baseAmount + preview.pricing.addonAmount,
                                )}
                              </span>
                            </div>
                            {(preview.pricing.setupChargeAmount ?? 0) > 0 ||
                            !preview.pricing.upgradeContext ? (
                              <div className="flex items-center justify-between gap-3">
                                <span>One-time setup charges</span>
                                <span className="font-semibold text-ink">
                                  {formatCurrency(preview.pricing.setupChargeAmount ?? 0)}
                                </span>
                              </div>
                            ) : null}
                            <div className="flex items-center justify-between gap-3">
                              <span>
                                {preview.pricing.upgradeContext
                                  ? "Subtotal before coupon"
                                  : "Subtotal after setup"}
                              </span>
                              <span className="font-semibold text-ink">
                                {formatCurrency(preview.pricing.subtotalAmount)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                              <span>
                                Coupon discount
                                {preview.coupon?.code ? ` (${preview.coupon.code})` : ""}
                              </span>
                              <span className="font-semibold text-ink">
                                - {formatCurrency(preview.pricing.discountAmount)}
                              </span>
                            </div>
                            {preview.pricing.taxRate > 0 || preview.pricing.taxAmount > 0 ? (
                              <div className="flex items-center justify-between gap-3">
                                <span>
                                  {preview.pricing.taxName} ({preview.pricing.taxRate}%)
                                </span>
                                <span className="font-semibold text-ink">
                                  {formatCurrency(preview.pricing.taxAmount)}
                                </span>
                              </div>
                            ) : null}
                            <div className="flex items-center justify-between gap-3 border-t border-border pt-3 text-base">
                              <span className="font-semibold text-ink">
                                {preview.pricing.upgradeContext
                                  ? "Upgrade payable now"
                                  : "Final payable amount"}
                              </span>
                              <span className="font-black text-ink">
                                {formatCurrency(preview.pricing.totalAmount)}
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center justify-between gap-3">
                              <span className="inline-flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-primary" />
                                Base plan
                              </span>
                              <span className="font-semibold text-ink">
                                {formatCurrency(preview.pricing.baseAmount)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                              <span className="inline-flex items-center gap-2">
                                <ReceiptText className="h-4 w-4 text-primary" />
                                Add-ons
                              </span>
                              <span className="font-semibold text-ink">
                                {formatCurrency(preview.pricing.addonAmount)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                              <span>Subtotal</span>
                              <span className="font-semibold text-ink">
                                {formatCurrency(preview.pricing.subtotalAmount)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                              <span>Coupon discount</span>
                              <span className="font-semibold text-ink">
                                - {formatCurrency(preview.pricing.discountAmount)}
                              </span>
                            </div>
                            {preview.pricing.taxRate > 0 || preview.pricing.taxAmount > 0 ? (
                              <div className="flex items-center justify-between gap-3">
                                <span>
                                  {preview.pricing.taxName} ({preview.pricing.taxRate}%)
                                </span>
                                <span className="font-semibold text-ink">
                                  {formatCurrency(preview.pricing.taxAmount)}
                                </span>
                              </div>
                            ) : null}
                            <div className="flex items-center justify-between gap-3 border-t border-border pt-3 text-base">
                              <span className="font-semibold text-ink">Total payable</span>
                              <span className="font-black text-ink">
                                {formatCurrency(preview.pricing.totalAmount)}
                              </span>
                            </div>
                          </>
                        )}
                      </div>

                      {preview.selectedAddons.length ? (
                        <div className="rounded-2xl border border-border bg-surface/30 p-4">
                          <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                            Selected add-ons
                          </div>
                          <div className="mt-3 space-y-3">
                            {preview.selectedAddons.map((addonLine) => (
                              <div
                                key={addonLine.addonId}
                                className="flex items-center justify-between gap-3 text-sm"
                              >
                                <span className="text-ink-soft">
                                  {formatSelectedAddonLabel(addonLine, productSlug)}
                                </span>
                                <span className="font-semibold text-ink">
                                  {formatCurrency(addonLine.totalPrice)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      <div className="rounded-2xl border border-dashed border-primary/25 bg-primary-soft/20 p-4 text-sm leading-7 text-ink-soft">
                        {preview.pricing.upgradeContext ? "Renewal stays on: " : "Renewal preview: "}
                        <span className="font-semibold text-ink">
                          {formatDate(preview.pricing.nextRenewalDate)}
                        </span>
                        . This same date is what the admin subscription table will use after payment
                        succeeds.
                      </div>
                    </>
                  ) : (
                    <div className="rounded-2xl border border-border bg-surface/30 p-4 text-sm text-ink-soft">
                      Choose a plan to load the live summary.
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-border/80 bg-white shadow-float">
                <CardHeader>
                  <CardTitle className="text-2xl font-black text-ink">What gets saved</CardTitle>
                  <CardDescription className="mt-1 text-sm text-ink-soft">
                    Every successful payment creates reusable records for customers, subscriptions,
                    payments and invoices.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  {(
                    isHrmsCheckout(productSlug)
                      ? [
                          "Product, plan, employee count and subscription term",
                          "Setup charges, add-ons, coupon discounts and final payable amount",
                          "Company, billing contact and invoice address details",
                          "Renewal date for the selected 1 year, 2 year or 3 year term",
                          "Payment, invoice and subscription records for admin",
                        ]
                      : [
                          "Product, plan and billing cycle",
                          "Subtotal, add-ons, coupon discounts and final payable amount",
                          "Company, billing contact and address details",
                          "Independent renewal date for the selected cycle",
                          "Payment, invoice and subscription records for admin",
                        ]
                  ).map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl bg-surface/40 p-3"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                      <span className="text-sm leading-6 text-ink">{item}</span>
                    </div>
                  ))}

                  <div className="rounded-2xl border border-dashed border-border p-4 text-sm leading-7 text-ink-soft">
                    Razorpay handles the live payment window, while this checkout stores the order,
                    payment, invoice and subscription records after the payment is verified.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
