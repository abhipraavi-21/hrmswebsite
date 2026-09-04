import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { billingAdminService } from "../../services/cmsService";
import type {
  BillingAdminProduct,
  BillingCatalogAddon,
  BillingCatalogPlan,
  BillingTaxSetting,
} from "../../types/cms";

function formatCurrency(value?: number | null) {
  if (value === null || value === undefined) {
    return "—";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function BillingCatalogPage() {
  const [products, setProducts] = useState<BillingAdminProduct[]>([]);
  const [taxes, setTaxes] = useState<BillingTaxSetting[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  useEffect(() => {
    void Promise.all([billingAdminService.listProducts(), billingAdminService.listTaxes()]).then(
      ([nextProducts, nextTaxes]) => {
        setProducts(nextProducts);
        setTaxes(nextTaxes);
        setSelectedProductId(nextProducts[0]?.id ?? null);
      },
    );
  }, []);

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId) ?? products[0] ?? null,
    [products, selectedProductId],
  );

  const updateProductState = (nextProduct: BillingAdminProduct) => {
    setProducts((current) => current.map((product) => (product.id === nextProduct.id ? nextProduct : product)));
  };

  const updatePlanState = (nextPlan: BillingCatalogPlan) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === nextPlan.productId
          ? {
              ...product,
              plans: product.plans.map((plan) => (plan.id === nextPlan.id ? nextPlan : plan)),
            }
          : product,
      ),
    );
  };

  const updateAddonState = (nextAddon: BillingCatalogAddon) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === nextAddon.productId
          ? {
              ...product,
              addons: product.addons.map((addon) => (addon.id === nextAddon.id ? nextAddon : addon)),
            }
          : product,
      ),
    );
  };

  const updateTaxState = (nextTax: BillingTaxSetting) => {
    setTaxes((current) => current.map((tax) => (tax.id === nextTax.id ? nextTax : tax)));
  };

  const saveProduct = async (product: BillingAdminProduct) => {
    try {
      const updated = await billingAdminService.updateProduct(product.id, {
        name: product.name,
        description: product.description,
        icon: product.icon,
        status: product.status,
        displayOrder: product.displayOrder,
      });
      updateProductState(updated);
      toast.success("Product updated.");
    } catch {
      toast.error("Unable to update the product.");
    }
  };

  const savePlan = async (plan: BillingCatalogPlan) => {
    try {
      const updated = await billingAdminService.updatePlan(plan.id, {
        name: plan.name,
        description: plan.description,
        monthlyPrice: plan.monthlyPrice,
        annualPrice: plan.annualPrice,
        currency: plan.currency,
        status: plan.status,
        isPopular: plan.isPopular,
        displayOrder: plan.displayOrder,
      });
      updatePlanState(updated);
      toast.success("Plan updated.");
    } catch {
      toast.error("Unable to update the plan.");
    }
  };

  const saveAddon = async (addon: BillingCatalogAddon) => {
    try {
      const updated = await billingAdminService.updateAddon(addon.id, {
        name: addon.name,
        description: addon.description,
        pricingType: addon.pricingType,
        monthlyPrice: addon.monthlyPrice,
        annualPrice: addon.annualPrice,
        unitPrice: addon.unitPrice,
        currency: addon.currency,
        status: addon.status,
        displayOrder: addon.displayOrder,
        metadata: addon.metadata,
      });
      updateAddonState(updated);
      toast.success("Add-on updated.");
    } catch {
      toast.error("Unable to update the add-on.");
    }
  };

  const saveTax = async (tax: BillingTaxSetting) => {
    try {
      const updated = await billingAdminService.updateTax(tax.id, tax);
      updateTaxState(updated);
      toast.success("Tax setting updated.");
    } catch {
      toast.error("Unable to update the tax setting.");
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
          Products, Plans, Add-ons & Taxes
        </div>
        <h1 className="mt-2 text-3xl font-semibold">Shared subscription catalog</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
          Manage the reusable catalog that drives pricing, checkout and renewals for HRMS, Bulk Email and Asset Management.
        </p>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap gap-3">
          {products.map((product) => {
            const isSelected = selectedProduct?.id === product.id;

            return (
              <button
                key={product.id}
                type="button"
                onClick={() => setSelectedProductId(product.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isSelected
                    ? "bg-sky-500 text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300"
                }`}
              >
                {product.name}
              </button>
            );
          })}
        </div>
      </section>

      {selectedProduct ? (
        <section className="space-y-6">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Product</div>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <label className="field">
                <span>Name</span>
                <input
                  value={selectedProduct.name}
                  onChange={(event) =>
                    updateProductState({
                      ...selectedProduct,
                      name: event.target.value,
                    })
                  }
                />
              </label>
              <label className="field">
                <span>Status</span>
                <select
                  value={selectedProduct.status}
                  onChange={(event) =>
                    updateProductState({
                      ...selectedProduct,
                      status: event.target.value,
                    })
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </label>
              <label className="field lg:col-span-2">
                <span>Description</span>
                <textarea
                  value={selectedProduct.description ?? ""}
                  onChange={(event) =>
                    updateProductState({
                      ...selectedProduct,
                      description: event.target.value,
                    })
                  }
                  rows={3}
                />
              </label>
            </div>
            <div className="mt-4">
              <button type="button" className="btn-primary" onClick={() => void saveProduct(selectedProduct)}>
                Save Product
              </button>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Plans</div>
            <div className="mt-4 space-y-4">
              {selectedProduct.plans.map((plan) => (
                <div key={plan.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <label className="field">
                      <span>Plan Name</span>
                      <input
                        value={plan.name}
                        onChange={(event) =>
                          updatePlanState({
                            ...plan,
                            name: event.target.value,
                          })
                        }
                      />
                    </label>
                    <label className="field">
                      <span>Status</span>
                      <select
                        value={plan.status}
                        onChange={(event) =>
                          updatePlanState({
                            ...plan,
                            status: event.target.value,
                          })
                        }
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </label>
                    <label className="field lg:col-span-2">
                      <span>Description</span>
                      <textarea
                        value={plan.description ?? ""}
                        onChange={(event) =>
                          updatePlanState({
                            ...plan,
                            description: event.target.value,
                          })
                        }
                        rows={2}
                      />
                    </label>
                    <label className="field">
                      <span>Monthly Price</span>
                      <input
                        type="number"
                        value={plan.monthlyPrice}
                        onChange={(event) =>
                          updatePlanState({
                            ...plan,
                            monthlyPrice: Number(event.target.value || 0),
                          })
                        }
                      />
                    </label>
                    <label className="field">
                      <span>Annual Price</span>
                      <input
                        type="number"
                        value={plan.annualPrice}
                        onChange={(event) =>
                          updatePlanState({
                            ...plan,
                            annualPrice: Number(event.target.value || 0),
                          })
                        }
                      />
                    </label>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span>Features: {plan.features.length}</span>
                    <span>Limits: {plan.limits.length}</span>
                    <span>Monthly preview: {formatCurrency(plan.monthlyPrice)}</span>
                    <span>Annual preview: {formatCurrency(plan.annualPrice)}</span>
                  </div>

                  <div className="mt-4">
                    <button type="button" className="btn-primary" onClick={() => void savePlan(plan)}>
                      Save Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Add-ons</div>
            <div className="mt-4 space-y-4">
              {selectedProduct.addons.map((addon) => (
                <div key={addon.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <label className="field">
                      <span>Add-on Name</span>
                      <input
                        value={addon.name}
                        onChange={(event) =>
                          updateAddonState({
                            ...addon,
                            name: event.target.value,
                          })
                        }
                      />
                    </label>
                    <label className="field">
                      <span>Status</span>
                      <select
                        value={addon.status}
                        onChange={(event) =>
                          updateAddonState({
                            ...addon,
                            status: event.target.value,
                          })
                        }
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </label>
                    <label className="field lg:col-span-2">
                      <span>Description</span>
                      <textarea
                        value={addon.description ?? ""}
                        onChange={(event) =>
                          updateAddonState({
                            ...addon,
                            description: event.target.value,
                          })
                        }
                        rows={2}
                      />
                    </label>
                    <label className="field">
                      <span>Monthly Price</span>
                      <input
                        type="number"
                        value={addon.monthlyPrice ?? 0}
                        onChange={(event) =>
                          updateAddonState({
                            ...addon,
                            monthlyPrice: Number(event.target.value || 0),
                          })
                        }
                      />
                    </label>
                    <label className="field">
                      <span>Annual Price</span>
                      <input
                        type="number"
                        value={addon.annualPrice ?? 0}
                        onChange={(event) =>
                          updateAddonState({
                            ...addon,
                            annualPrice: Number(event.target.value || 0),
                          })
                        }
                      />
                    </label>
                    <label className="field">
                      <span>Unit Price</span>
                      <input
                        type="number"
                        value={addon.unitPrice ?? 0}
                        onChange={(event) =>
                          updateAddonState({
                            ...addon,
                            unitPrice: Number(event.target.value || 0),
                          })
                        }
                      />
                    </label>
                    <label className="field">
                      <span>Pricing Type</span>
                      <input value={addon.pricingType} readOnly />
                    </label>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span>Monthly preview: {formatCurrency(addon.monthlyPrice)}</span>
                    <span>Annual preview: {formatCurrency(addon.annualPrice)}</span>
                    <span>Unit preview: {formatCurrency(addon.unitPrice)}</span>
                  </div>

                  <div className="mt-4">
                    <button type="button" className="btn-primary" onClick={() => void saveAddon(addon)}>
                      Save Add-on
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
      ) : null}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Taxes</div>
        <div className="mt-4 space-y-4">
          {taxes.map((tax) => (
            <div key={tax.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="grid gap-4 lg:grid-cols-2">
                <label className="field">
                  <span>Tax Name</span>
                  <input
                    value={tax.taxName}
                    onChange={(event) =>
                      updateTaxState({
                        ...tax,
                        taxName: event.target.value,
                      })
                    }
                  />
                </label>
                <label className="field">
                  <span>Tax Rate (%)</span>
                  <input
                    type="number"
                    value={tax.taxRate}
                    onChange={(event) =>
                      updateTaxState({
                        ...tax,
                        taxRate: Number(event.target.value || 0),
                      })
                    }
                  />
                </label>
                <label className="field">
                  <span>GSTIN</span>
                  <input
                    value={tax.gstin ?? ""}
                    onChange={(event) =>
                      updateTaxState({
                        ...tax,
                        gstin: event.target.value,
                      })
                    }
                  />
                </label>
                <label className="field">
                  <span>SAC</span>
                  <input
                    value={tax.sac ?? ""}
                    onChange={(event) =>
                      updateTaxState({
                        ...tax,
                        sac: event.target.value,
                      })
                    }
                  />
                </label>
                <label className="field">
                  <span>Enabled</span>
                  <select
                    value={String(tax.isEnabled)}
                    onChange={(event) =>
                      updateTaxState({
                        ...tax,
                        isEnabled: event.target.value === "true",
                      })
                    }
                  >
                    <option value="true">Enabled</option>
                    <option value="false">Disabled</option>
                  </select>
                </label>
                <label className="field">
                  <span>Inclusive</span>
                  <select
                    value={String(tax.isInclusive)}
                    onChange={(event) =>
                      updateTaxState({
                        ...tax,
                        isInclusive: event.target.value === "true",
                      })
                    }
                  >
                    <option value="false">Exclusive</option>
                    <option value="true">Inclusive</option>
                  </select>
                </label>
              </div>
              <div className="mt-4">
                <button type="button" className="btn-primary" onClick={() => void saveTax(tax)}>
                  Save Tax Setting
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
