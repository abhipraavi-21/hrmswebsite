import { Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { pageService } from "../../services/cmsService";
import type { CmsItem, CmsPage, CmsSection } from "../../types/cms";

type Props = {
  page: CmsPage;
  onReload: () => Promise<void>;
};

const createBlankSection = (): Partial<CmsSection> => ({
  sectionKey: "new-section",
  sectionType: "custom",
  internalName: "New Section",
  heading: "",
  subheading: "",
  description: "",
  imageUrl: "",
  backgroundImageUrl: "",
  buttonText: "",
  buttonLink: "",
  settings: {},
  displayOrder: 0,
  isActive: true,
  isRequired: false,
});

const createBlankItem = (): Partial<CmsItem> => ({
  itemType: "card",
  title: "",
  subtitle: "",
  description: "",
  icon: "",
  imageUrl: "",
  buttonText: "",
  buttonLink: "",
  extraData: {},
  displayOrder: 0,
  isActive: true,
});

export function PageEditor({ page, onReload }: Props) {
  const [metaState, setMetaState] = useState({
    pageName: page.pageName,
    slug: page.slug,
    metaTitle: page.metaTitle,
    metaDescription: page.metaDescription,
    metaKeywords: page.metaKeywords ?? "",
    canonicalUrl: page.canonicalUrl ?? "",
    ogTitle: page.ogTitle ?? "",
    ogDescription: page.ogDescription ?? "",
    ogImage: page.ogImage ?? "",
    status: page.status,
    indexable: page.indexable,
  });

  const orderedSections = useMemo(
    () => [...page.sections].sort((a, b) => a.displayOrder - b.displayOrder),
    [page.sections],
  );

  const savePage = async () => {
    await pageService.update(page.id, metaState);
    toast.success("Page metadata updated");
    await onReload();
  };

  const addSection = async () => {
    await pageService.createSection(page.id, {
      ...createBlankSection(),
      displayOrder: page.sections.length,
    });
    toast.success("Section added");
    await onReload();
  };

  const restorePage = async () => {
    await pageService.restore(page.id);
    toast.success("Seeded content restored");
    await onReload();
  };

  const saveSection = async (section: CmsSection) => {
    await pageService.updateSection(section.id, section);
    toast.success("Section updated");
    await onReload();
  };

  const deleteSection = async (section: CmsSection) => {
    if (!window.confirm(`Delete section "${section.internalName}"?`)) {
      return;
    }

    await pageService.deleteSection(section.id);
    toast.success("Section deleted");
    await onReload();
  };

  const addItem = async (section: CmsSection) => {
    await pageService.createItem(section.id, {
      ...createBlankItem(),
      displayOrder: section.items.length,
    });
    toast.success("Item added");
    await onReload();
  };

  const saveItem = async (item: CmsItem) => {
    await pageService.updateItem(item.id, item);
    toast.success("Item updated");
    await onReload();
  };

  const deleteItem = async (item: CmsItem) => {
    if (!window.confirm(`Delete item "${item.title || item.itemType}"?`)) {
      return;
    }

    await pageService.deleteItem(item.id);
    toast.success("Item deleted");
    await onReload();
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Page Meta</div>
            <h2 className="mt-2 text-2xl font-semibold">{page.pageName}</h2>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => void restorePage()} className="btn-secondary">
              <RotateCcw className="h-4 w-4" />
              Restore Seed
            </button>
            <button type="button" onClick={() => void savePage()} className="btn-primary">
              <Save className="h-4 w-4" />
              Save Page
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="field">
            <span>Page name</span>
            <input value={metaState.pageName} onChange={(event) => setMetaState((current) => ({ ...current, pageName: event.target.value }))} />
          </label>
          <label className="field">
            <span>Slug</span>
            <input value={metaState.slug} onChange={(event) => setMetaState((current) => ({ ...current, slug: event.target.value }))} />
          </label>
          <label className="field md:col-span-2">
            <span>Meta title</span>
            <input value={metaState.metaTitle} onChange={(event) => setMetaState((current) => ({ ...current, metaTitle: event.target.value }))} />
          </label>
          <label className="field md:col-span-2">
            <span>Meta description</span>
            <textarea rows={4} value={metaState.metaDescription} onChange={(event) => setMetaState((current) => ({ ...current, metaDescription: event.target.value }))} />
          </label>
          <label className="field">
            <span>Meta keywords</span>
            <input value={metaState.metaKeywords ?? ""} onChange={(event) => setMetaState((current) => ({ ...current, metaKeywords: event.target.value }))} />
          </label>
          <label className="field">
            <span>Canonical URL</span>
            <input value={metaState.canonicalUrl ?? ""} onChange={(event) => setMetaState((current) => ({ ...current, canonicalUrl: event.target.value }))} />
          </label>
          <label className="field">
            <span>OG title</span>
            <input value={metaState.ogTitle ?? ""} onChange={(event) => setMetaState((current) => ({ ...current, ogTitle: event.target.value }))} />
          </label>
          <label className="field">
            <span>OG image</span>
            <input value={metaState.ogImage ?? ""} onChange={(event) => setMetaState((current) => ({ ...current, ogImage: event.target.value }))} />
          </label>
          <label className="field md:col-span-2">
            <span>OG description</span>
            <textarea rows={3} value={metaState.ogDescription ?? ""} onChange={(event) => setMetaState((current) => ({ ...current, ogDescription: event.target.value }))} />
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Sections</div>
            <h2 className="mt-2 text-2xl font-semibold">Structured content</h2>
          </div>
          <button type="button" onClick={() => void addSection()} className="btn-primary">
            <Plus className="h-4 w-4" />
            Add Section
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {orderedSections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              onSave={saveSection}
              onDelete={deleteSection}
              onAddItem={addItem}
              onSaveItem={saveItem}
              onDeleteItem={deleteItem}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionCard({
  section,
  onSave,
  onDelete,
  onAddItem,
  onSaveItem,
  onDeleteItem,
}: {
  section: CmsSection;
  onSave: (section: CmsSection) => Promise<void>;
  onDelete: (section: CmsSection) => Promise<void>;
  onAddItem: (section: CmsSection) => Promise<void>;
  onSaveItem: (item: CmsItem) => Promise<void>;
  onDeleteItem: (item: CmsItem) => Promise<void>;
}) {
  const [draft, setDraft] = useState(section);

  return (
    <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-slate-900">{draft.internalName}</div>
          <div className="text-xs text-slate-500">{draft.sectionType}</div>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => void onAddItem(draft)} className="btn-secondary">
            <Plus className="h-4 w-4" />
            Add Item
          </button>
          <button type="button" onClick={() => void onSave(draft)} className="btn-primary">
            <Save className="h-4 w-4" />
            Save Section
          </button>
          {!draft.isRequired ? (
            <button type="button" onClick={() => void onDelete(draft)} className="btn-danger">
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="field">
          <span>Section key</span>
          <input value={draft.sectionKey} onChange={(event) => setDraft((current) => ({ ...current, sectionKey: event.target.value }))} />
        </label>
        <label className="field">
          <span>Internal name</span>
          <input value={draft.internalName} onChange={(event) => setDraft((current) => ({ ...current, internalName: event.target.value }))} />
        </label>
        <label className="field">
          <span>Section type</span>
          <input value={draft.sectionType} onChange={(event) => setDraft((current) => ({ ...current, sectionType: event.target.value }))} />
        </label>
        <label className="field">
          <span>Display order</span>
          <input type="number" value={draft.displayOrder} onChange={(event) => setDraft((current) => ({ ...current, displayOrder: Number(event.target.value) }))} />
        </label>
        <label className="field md:col-span-2">
          <span>Heading</span>
          <input value={draft.heading ?? ""} onChange={(event) => setDraft((current) => ({ ...current, heading: event.target.value }))} />
        </label>
        <label className="field md:col-span-2">
          <span>Subheading</span>
          <input value={draft.subheading ?? ""} onChange={(event) => setDraft((current) => ({ ...current, subheading: event.target.value }))} />
        </label>
        <label className="field md:col-span-2">
          <span>Description</span>
          <textarea rows={4} value={draft.description ?? ""} onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))} />
        </label>
        <label className="field">
          <span>Button text</span>
          <input value={draft.buttonText ?? ""} onChange={(event) => setDraft((current) => ({ ...current, buttonText: event.target.value }))} />
        </label>
        <label className="field">
          <span>Button link</span>
          <input value={draft.buttonLink ?? ""} onChange={(event) => setDraft((current) => ({ ...current, buttonLink: event.target.value }))} />
        </label>
      </div>

      <div className="mt-5 space-y-4">
        {draft.items
          .slice()
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((item) => (
            <ItemCard key={item.id} item={item} onSave={onSaveItem} onDelete={onDeleteItem} />
          ))}
      </div>
    </article>
  );
}

function ItemCard({
  item,
  onSave,
  onDelete,
}: {
  item: CmsItem;
  onSave: (item: CmsItem) => Promise<void>;
  onDelete: (item: CmsItem) => Promise<void>;
}) {
  const [draft, setDraft] = useState(item);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-semibold">{draft.title || draft.itemType}</div>
        <div className="flex gap-3">
          <button type="button" onClick={() => void onSave(draft)} className="btn-secondary">
            <Save className="h-4 w-4" />
            Save Item
          </button>
          <button type="button" onClick={() => void onDelete(draft)} className="btn-danger">
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="field">
          <span>Item type</span>
          <input value={draft.itemType} onChange={(event) => setDraft((current) => ({ ...current, itemType: event.target.value }))} />
        </label>
        <label className="field">
          <span>Display order</span>
          <input type="number" value={draft.displayOrder} onChange={(event) => setDraft((current) => ({ ...current, displayOrder: Number(event.target.value) }))} />
        </label>
        <label className="field">
          <span>Title</span>
          <input value={draft.title ?? ""} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} />
        </label>
        <label className="field">
          <span>Subtitle</span>
          <input value={draft.subtitle ?? ""} onChange={(event) => setDraft((current) => ({ ...current, subtitle: event.target.value }))} />
        </label>
        <label className="field md:col-span-2">
          <span>Description</span>
          <textarea rows={3} value={draft.description ?? ""} onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))} />
        </label>
        <label className="field">
          <span>Icon</span>
          <input value={draft.icon ?? ""} onChange={(event) => setDraft((current) => ({ ...current, icon: event.target.value }))} />
        </label>
        <label className="field">
          <span>Image URL</span>
          <input value={draft.imageUrl ?? ""} onChange={(event) => setDraft((current) => ({ ...current, imageUrl: event.target.value }))} />
        </label>
        <label className="field">
          <span>Button text</span>
          <input value={draft.buttonText ?? ""} onChange={(event) => setDraft((current) => ({ ...current, buttonText: event.target.value }))} />
        </label>
        <label className="field">
          <span>Button link</span>
          <input value={draft.buttonLink ?? ""} onChange={(event) => setDraft((current) => ({ ...current, buttonLink: event.target.value }))} />
        </label>
      </div>
    </div>
  );
}
