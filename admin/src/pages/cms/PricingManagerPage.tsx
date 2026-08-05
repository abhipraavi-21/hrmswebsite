import { Copy, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { pricingService } from "../../services/cmsService";
import type { PricingFeature, PricingPlan } from "../../types/cms";

const blankPlan: Partial<PricingPlan> = {
  name: "New Plan",
  slug: "new-plan",
  currency: "INR",
  monthlyPrice: 0,
  shortDescription: "",
  billingLabel: "per employee / month",
  buttonText: "Know more",
  buttonLink: "#feature-comparison",
  isPopular: false,
  isActive: true,
  displayOrder: 0,
};

export function PricingManagerPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);

  const reload = async () => setPlans(await pricingService.list());

  useEffect(() => {
    void reload();
  }, []);

  const createPlan = async () => {
    await pricingService.create({
      ...blankPlan,
      displayOrder: plans.length,
    });
    toast.success("Pricing plan created");
    await reload();
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Pricing</div>
            <h1 className="mt-2 text-3xl font-semibold">Pricing plans</h1>
          </div>
          <button type="button" onClick={() => void createPlan()} className="btn-primary">
            <Plus className="h-4 w-4" />
            Add Plan
          </button>
        </div>
      </section>

      <div className="space-y-4">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onReload={reload} />
        ))}
      </div>
    </div>
  );
}

function PlanCard({ plan, onReload }: { plan: PricingPlan; onReload: () => Promise<void> }) {
  const [draft, setDraft] = useState(plan);

  const savePlan = async () => {
    await pricingService.update(draft.id, draft);
    toast.success("Pricing plan updated");
    await onReload();
  };

  const deletePlan = async () => {
    if (!window.confirm(`Delete pricing plan "${draft.name}"?`)) {
      return;
    }

    await pricingService.remove(draft.id);
    toast.success("Pricing plan deleted");
    await onReload();
  };

  const duplicatePlan = async () => {
    await pricingService.duplicate(draft.id);
    toast.success("Pricing plan duplicated");
    await onReload();
  };

  const addFeature = async () => {
    await pricingService.createFeature(draft.id, {
      featureText: "New feature",
      isIncluded: true,
      displayOrder: draft.features.length,
    });
    toast.success("Feature added");
    await onReload();
  };

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">{draft.slug}</div>
          <h2 className="mt-2 text-2xl font-semibold">{draft.name}</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => void duplicatePlan()} className="btn-secondary">
            <Copy className="h-4 w-4" />
            Duplicate
          </button>
          <button type="button" onClick={() => void savePlan()} className="btn-primary">
            <Save className="h-4 w-4" />
            Save
          </button>
          <button type="button" onClick={() => void deletePlan()} className="btn-danger">
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="field">
          <span>Name</span>
          <input value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} />
        </label>
        <label className="field">
          <span>Slug</span>
          <input value={draft.slug} onChange={(event) => setDraft((current) => ({ ...current, slug: event.target.value }))} />
        </label>
        <label className="field">
          <span>Monthly price</span>
          <input type="number" value={draft.monthlyPrice} onChange={(event) => setDraft((current) => ({ ...current, monthlyPrice: Number(event.target.value) }))} />
        </label>
        <label className="field">
          <span>Display order</span>
          <input type="number" value={draft.displayOrder} onChange={(event) => setDraft((current) => ({ ...current, displayOrder: Number(event.target.value) }))} />
        </label>
        <label className="field md:col-span-2">
          <span>Short description</span>
          <textarea rows={3} value={draft.shortDescription ?? ""} onChange={(event) => setDraft((current) => ({ ...current, shortDescription: event.target.value }))} />
        </label>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold">Features</div>
          <button type="button" onClick={() => void addFeature()} className="btn-secondary">
            <Plus className="h-4 w-4" />
            Add Feature
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {draft.features.map((feature) => (
            <FeatureRow key={feature.id} feature={feature} onReload={onReload} />
          ))}
        </div>
      </div>
    </article>
  );
}

function FeatureRow({ feature, onReload }: { feature: PricingFeature; onReload: () => Promise<void> }) {
  const [draft, setDraft] = useState(feature);

  const saveFeature = async () => {
    await pricingService.updateFeature(draft.id, draft);
    toast.success("Feature updated");
    await onReload();
  };

  const deleteFeature = async () => {
    await pricingService.removeFeature(draft.id);
    toast.success("Feature deleted");
    await onReload();
  };

  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 p-3 md:grid-cols-[1fr_auto_auto]">
      <input className="field-input" value={draft.featureText} onChange={(event) => setDraft((current) => ({ ...current, featureText: event.target.value }))} />
      <button type="button" onClick={() => void saveFeature()} className="btn-secondary">Save</button>
      <button type="button" onClick={() => void deleteFeature()} className="btn-danger">Delete</button>
    </div>
  );
}
