import { useEffect, useMemo, useState } from "react";
import { isAxiosError } from "axios";
import { billingAdminService } from "../../services/cmsService";
import type { BillingAdminProduct, BillingCoupon } from "../../types/cms";

type CouponFormState = {
  code: string;
  name: string;
  description: string;
  discountType: "percent" | "fixed";
  discountValue: number;
  maximumDiscount: string;
  minimumOrderAmount: string;
  startsAt: string;
  endsAt: string;
  totalUsageLimit: string;
  usageLimitPerCustomer: string;
  appliesToAmount: "plan_only" | "addons_only" | "plan_and_addons";
  status: "active" | "inactive";
  newCustomersOnly: boolean;
  productIds: number[];
  planIds: number[];
  billingCycles: string[];
  lifecycleTypes: string[];
};

const emptyForm: CouponFormState = {
  code: "",
  name: "",
  description: "",
  discountType: "percent",
  discountValue: 10,
  maximumDiscount: "",
  minimumOrderAmount: "",
  startsAt: "",
  endsAt: "",
  totalUsageLimit: "",
  usageLimitPerCustomer: "",
  appliesToAmount: "plan_and_addons",
  status: "active",
  newCustomersOnly: false,
  productIds: [] as number[],
  planIds: [] as number[],
  billingCycles: ["monthly", "semiannual", "annual"],
  lifecycleTypes: ["new", "renewal", "upgrade"],
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value?: string | null) {
  if (!value) {
    return "No limit";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function toDateInput(value?: string | null) {
  if (!value) {
    return "";
  }

  return new Date(value).toISOString().slice(0, 10);
}

function fromDateInput(value: string) {
  return value ? new Date(`${value}T00:00:00`).toISOString() : null;
}

function getDiscountLabel(coupon: BillingCoupon) {
  const base =
    coupon.discountType === "percent"
      ? `${coupon.discountValue}%`
      : `${formatCurrency(coupon.discountValue)} OFF`;

  return coupon.maximumDiscount ? `${base} Max ${formatCurrency(coupon.maximumDiscount)}` : base;
}

function getAdminErrorMessage(error: unknown, fallback: string) {
  if (isAxiosError(error)) {
    const message = error.response?.data?.message;
    const firstError = error.response?.data?.errors?.[0]?.message;

    if (typeof message === "string") {
      return message;
    }

    if (typeof firstError === "string") {
      return firstError;
    }
  }

  return error instanceof Error ? error.message : fallback;
}

export function BillingCouponsPage() {
  const [coupons, setCoupons] = useState<BillingCoupon[]>([]);
  const [products, setProducts] = useState<BillingAdminProduct[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [editingCoupon, setEditingCoupon] = useState<BillingCoupon | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState<string | null>(null);

  const selectedProductPlans = useMemo(() => {
    const selectedProductIds = new Set(form.productIds);
    return products
      .flatMap((product) => product.plans)
      .filter((plan) => !selectedProductIds.size || selectedProductIds.has(plan.productId));
  }, [form.productIds, products]);

  const loadCoupons = async () => {
    const [couponList, productList] = await Promise.all([
      billingAdminService.listCoupons({ search: search || undefined, status: status || undefined }),
      billingAdminService.listProducts(),
    ]);
    setCoupons(couponList);
    setProducts(productList);
  };

  useEffect(() => {
    void loadCoupons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateForm = (key: string, value: unknown) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const toggleArrayValue = (key: "productIds" | "planIds", value: number) => {
    setForm((current) => {
      const values = current[key];
      return {
        ...current,
        [key]: values.includes(value)
          ? values.filter((item) => item !== value)
          : [...values, value],
      };
    });
  };

  const toggleStringValue = (key: "billingCycles" | "lifecycleTypes", value: string) => {
    setForm((current) => {
      const values = current[key];
      return {
        ...current,
        [key]: values.includes(value)
          ? values.filter((item) => item !== value)
          : [...values, value],
      };
    });
  };

  const startEdit = (coupon: BillingCoupon) => {
    setEditingCoupon(coupon);
    setForm({
      code: coupon.code,
      name: coupon.name,
      description: coupon.description ?? "",
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      maximumDiscount: coupon.maximumDiscount?.toString() ?? "",
      minimumOrderAmount: coupon.minimumOrderAmount?.toString() ?? "",
      startsAt: toDateInput(coupon.startsAt),
      endsAt: toDateInput(coupon.endsAt),
      totalUsageLimit: coupon.totalUsageLimit?.toString() ?? "",
      usageLimitPerCustomer: coupon.usageLimitPerCustomer?.toString() ?? "",
      appliesToAmount: coupon.appliesToAmount,
      status: coupon.status,
      newCustomersOnly: coupon.newCustomersOnly,
      productIds: coupon.products.map((product) => product.id),
      planIds: coupon.plans.map((plan) => plan.id),
      billingCycles: [
        coupon.monthlyAllowed ? "monthly" : null,
        coupon.semiannualAllowed ? "semiannual" : null,
        coupon.annualAllowed ? "annual" : null,
      ].filter(Boolean) as string[],
      lifecycleTypes: [
        coupon.newSubscriptionAllowed ? "new" : null,
        coupon.renewalAllowed ? "renewal" : null,
        coupon.upgradeAllowed ? "upgrade" : null,
      ].filter(Boolean) as string[],
    });
  };

  const resetForm = () => {
    setEditingCoupon(null);
    setForm(emptyForm);
  };

  const saveCoupon = async () => {
    setMessage(null);

    const payload = {
      code: form.code.trim().toUpperCase(),
      name: form.name.trim(),
      description: form.description.trim() || null,
      discountType: form.discountType,
      discountValue: Number(form.discountValue),
      maximumDiscount: form.maximumDiscount ? Number(form.maximumDiscount) : null,
      minimumOrderAmount: form.minimumOrderAmount ? Number(form.minimumOrderAmount) : null,
      startsAt: fromDateInput(form.startsAt),
      endsAt: fromDateInput(form.endsAt),
      totalUsageLimit: form.totalUsageLimit ? Number(form.totalUsageLimit) : null,
      usageLimitPerCustomer: form.usageLimitPerCustomer ? Number(form.usageLimitPerCustomer) : null,
      appliesToAmount: form.appliesToAmount,
      status: form.status,
      newCustomersOnly: form.newCustomersOnly,
      productIds: form.productIds,
      planIds: form.planIds,
      billingCycles: form.billingCycles,
      lifecycleTypes: form.lifecycleTypes,
    };

    try {
      if (editingCoupon) {
        await billingAdminService.updateCoupon(editingCoupon.id, payload);
      } else {
        await billingAdminService.createCoupon(payload);
      }

      setMessage("Coupon saved successfully.");
      resetForm();
      await loadCoupons();
    } catch (error) {
      setMessage(getAdminErrorMessage(error, "Unable to save coupon."));
      await loadCoupons();
    }
  };

  const deleteCoupon = async (coupon: BillingCoupon) => {
    if (!window.confirm(`Delete ${coupon.code}? Used coupons should be deactivated instead.`)) {
      return;
    }

    await billingAdminService.deleteCoupon(coupon.id);
    await loadCoupons();
  };

  const toggleStatus = async (coupon: BillingCoupon) => {
    await billingAdminService.updateCoupon(coupon.id, {
      status: coupon.status === "active" ? "inactive" : "active",
    });
    await loadCoupons();
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
          Billing
        </div>
        <h1 className="mt-2 text-3xl font-semibold">Coupons</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
          Create and manage coupon codes for products, plans, billing cycles and subscription
          lifecycle types.
        </p>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">{editingCoupon ? "Edit coupon" : "Create coupon"}</h2>
        {message ? <div className="mt-3 rounded-2xl bg-slate-50 p-3 text-sm">{message}</div> : null}

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm">
            <span className="font-medium">Coupon Code</span>
            <input
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              value={form.code}
              onChange={(event) => updateForm("code", event.target.value.toUpperCase())}
              placeholder="WELCOME20"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-medium">Coupon Name</span>
            <input
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              value={form.name}
              onChange={(event) => updateForm("name", event.target.value)}
              placeholder="Welcome Discount"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-medium">Status</span>
            <select
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              value={form.status}
              onChange={(event) => updateForm("status", event.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>
          <label className="space-y-2 text-sm md:col-span-3">
            <span className="font-medium">Description</span>
            <textarea
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              value={form.description}
              onChange={(event) => updateForm("description", event.target.value)}
              placeholder="20% discount for new customers"
            />
          </label>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <label className="space-y-2 text-sm">
            <span className="font-medium">Discount Type</span>
            <select
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              value={form.discountType}
              onChange={(event) => updateForm("discountType", event.target.value)}
            >
              <option value="percent">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-medium">Discount Value</span>
            <input
              type="number"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              value={form.discountValue}
              onChange={(event) => updateForm("discountValue", Number(event.target.value))}
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-medium">Maximum Discount</span>
            <input
              type="number"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              value={form.maximumDiscount}
              onChange={(event) => updateForm("maximumDiscount", event.target.value)}
              placeholder="Optional"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-medium">Minimum Order</span>
            <input
              type="number"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              value={form.minimumOrderAmount}
              onChange={(event) => updateForm("minimumOrderAmount", event.target.value)}
              placeholder="Optional"
            />
          </label>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <label className="space-y-2 text-sm">
            <span className="font-medium">Valid From</span>
            <input
              type="date"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              value={form.startsAt}
              onChange={(event) => updateForm("startsAt", event.target.value)}
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-medium">Valid Until</span>
            <input
              type="date"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              value={form.endsAt}
              onChange={(event) => updateForm("endsAt", event.target.value)}
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-medium">Total Usage</span>
            <input
              type="number"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              value={form.totalUsageLimit}
              onChange={(event) => updateForm("totalUsageLimit", event.target.value)}
              placeholder="Unlimited"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-medium">Per Customer</span>
            <input
              type="number"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              value={form.usageLimitPerCustomer}
              onChange={(event) => updateForm("usageLimitPerCustomer", event.target.value)}
              placeholder="Unlimited"
            />
          </label>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-4">
            <div className="font-medium">Products</div>
            <label className="mt-3 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.productIds.length === 0}
                onChange={() => updateForm("productIds", [])}
              />
              Apply to all products
            </label>
            {products.map((product) => (
              <label key={product.id} className="mt-3 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.productIds.includes(product.id)}
                  onChange={() => toggleArrayValue("productIds", product.id)}
                />
                {product.name}
              </label>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-200 p-4">
            <div className="font-medium">Plans</div>
            <label className="mt-3 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.planIds.length === 0}
                onChange={() => updateForm("planIds", [])}
              />
              All plans
            </label>
            {selectedProductPlans.map((plan) => (
              <label key={plan.id} className="mt-3 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.planIds.includes(plan.id)}
                  onChange={() => toggleArrayValue("planIds", plan.id)}
                />
                {plan.name}
              </label>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-200 p-4">
            <div className="font-medium">Applicability</div>
            <select
              className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              value={form.appliesToAmount}
              onChange={(event) => updateForm("appliesToAmount", event.target.value)}
            >
              <option value="plan_only">Plan Price Only</option>
              <option value="addons_only">Add-ons Only</option>
              <option value="plan_and_addons">Plan + Add-ons</option>
            </select>
            {["monthly", "semiannual", "annual"].map((cycle) => (
              <label key={cycle} className="mt-3 flex items-center gap-2 text-sm capitalize">
                <input
                  type="checkbox"
                  checked={form.billingCycles.includes(cycle)}
                  onChange={() => toggleStringValue("billingCycles", cycle)}
                />
                {cycle}
              </label>
            ))}
            {["new", "renewal", "upgrade"].map((type) => (
              <label key={type} className="mt-3 flex items-center gap-2 text-sm capitalize">
                <input
                  type="checkbox"
                  checked={form.lifecycleTypes.includes(type)}
                  onChange={() => toggleStringValue("lifecycleTypes", type)}
                />
                {type}
              </label>
            ))}
            <label className="mt-3 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.newCustomersOnly}
                onChange={(event) => updateForm("newCustomersOnly", event.target.checked)}
              />
              New customers only
            </label>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => void saveCoupon()}
            className="rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white"
          >
            Save Coupon
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold"
          >
            Cancel
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold">Coupon list</h2>
          <div className="flex flex-wrap gap-3">
            <input
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search coupon"
            />
            <select
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="">All statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="expired">Expired</option>
            </select>
            <button
              type="button"
              onClick={() => void loadCoupons()}
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold"
            >
              Search
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium">Code</th>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Discount</th>
                <th className="px-6 py-3 font-medium">Products</th>
                <th className="px-6 py-3 font-medium">Usage</th>
                <th className="px-6 py-3 font-medium">Start Date</th>
                <th className="px-6 py-3 font-medium">Expiry Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="align-top">
                  <td className="px-6 py-4 font-semibold text-slate-900">{coupon.code}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{coupon.name}</div>
                    <div className="mt-1 max-w-xs text-slate-500">{coupon.description}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-900">{getDiscountLabel(coupon)}</td>
                  <td className="px-6 py-4 text-slate-500">
                    {coupon.products.length
                      ? coupon.products.map((product) => product.name).join(", ")
                      : "All"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">
                      {coupon.usageCount} / {coupon.totalUsageLimit ?? "Unlimited"}
                    </div>
                    <div className="mt-1 text-slate-500">
                      Discount: {formatCurrency(coupon.analytics.totalDiscountGiven)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{formatDate(coupon.startsAt)}</td>
                  <td className="px-6 py-4 text-slate-500">{formatDate(coupon.endsAt)}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-700">
                      {coupon.computedStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        className="font-semibold text-sky-600"
                        type="button"
                        onClick={() => startEdit(coupon)}
                      >
                        Edit
                      </button>
                      <button
                        className="font-semibold text-slate-600"
                        type="button"
                        onClick={() => void toggleStatus(coupon)}
                      >
                        {coupon.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        className="font-semibold text-rose-600"
                        type="button"
                        onClick={() => void deleteCoupon(coupon)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
