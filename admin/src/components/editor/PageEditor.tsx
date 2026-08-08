import { ArrowDown, ArrowUp, Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { pageService } from "../../services/cmsService";
import type { CmsItem, CmsPage, CmsSection } from "../../types/cms";
import { ImageUploadField } from "./ImageUploadField";

type Props = {
  page: CmsPage;
  onReload: () => Promise<void>;
};

const ADVANCED_SECTION_SETTING_KEYS = new Set([
  "calculatorMin",
  "calculatorMax",
  "calculatorTicks",
  "defaultEmployeeCount",
]);

const ADVANCED_ITEM_EXTRA_KEYS = new Set(["accent"]);
const NUMBER_LIST_KEYS = new Set(["calculatorTicks"]);
const NUMBER_KEYS = new Set(["calculatorMin", "calculatorMax", "defaultEmployeeCount"]);
const PRICING_PAGE_KEYS = new Set(["pricing", "bulk-email-pricing", "asset-management-pricing"]);
const PRICING_FEATURE_SECTION_TYPE = "pricing_feature_comparison";
const PRICING_FEATURE_ITEM_TYPE = "pricing_feature_row";
const DEFAULT_PRICING_COLUMNS = ["Basic", "Professional", "Premium"];

type PricingFeatureState = "included" | "notIncluded" | "limited" | "optional" | "addon";

const PRICING_FEATURE_STATE_OPTIONS: Array<{ value: PricingFeatureState; label: string }> = [
  { value: "included", label: "Included" },
  { value: "notIncluded", label: "Not included" },
  { value: "limited", label: "Limited" },
  { value: "optional", label: "Optional" },
  { value: "addon", label: "Add On" },
];

const FIELD_LABEL_OVERRIDES: Record<string, string> = {
  badgeText: "Badge text",
  titlePrefix: "Headline first part",
  titleHighlight: "Headline highlighted word",
  titleSuffix: "Headline after highlighted word",
  titleLineTwo: "Headline second line",
  trustItems: "Trust points",
  floatingBadge: "Floating badge text",
  secondaryButtonText: "Second button text",
  secondaryButtonLink: "Second button link",
  secondaryDescription: "Secondary description",
  secondaryHeading: "Secondary heading",
  chips: "Chips / small points",
  heroBullets: "Hero bullet points",
  popularSearches: "Popular searches",
  features: "Bullet points",
  tag: "Tag",
  readingTime: "Reading time",
  category: "Category",
  difficulty: "Difficulty",
  audience: "Audience",
  calculatorMin: "Calculator minimum",
  calculatorMax: "Calculator maximum",
  calculatorTicks: "Calculator steps",
  defaultEmployeeCount: "Default employee count",
  planColumns: "Plan columns",
  headers: "Table headers",
  values: "Table row values",
};

const createBlankSection = (): Partial<CmsSection> => ({
  sectionKey: "new-section",
  sectionType: "custom",
  internalName: "New Section",
  heading: "",
  subheading: "",
  description: "",
  imageUrl: "",
  imageAlt: "",
  backgroundImageUrl: "",
  backgroundImageAlt: "",
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
  imageAlt: "",
  buttonText: "",
  buttonLink: "",
  extraData: {},
  displayOrder: 0,
  isActive: true,
});

const createBlankPricingFeatureRow = (displayOrder = 0): Partial<CmsItem> => ({
  itemType: PRICING_FEATURE_ITEM_TYPE,
  title: "New feature",
  subtitle: "",
  description: "",
  icon: "",
  imageUrl: "",
  imageAlt: "",
  buttonText: "",
  buttonLink: "",
  extraData: Object.fromEntries(
    DEFAULT_PRICING_COLUMNS.map((column) => [normalizePricingColumnKey(column), "included"]),
  ),
  displayOrder,
  isActive: true,
});

function sortByDisplayOrder<T extends { displayOrder: number }>(items: T[]) {
  return [...items].sort((a, b) => a.displayOrder - b.displayOrder);
}

function formatFieldLabel(value: string) {
  if (FIELD_LABEL_OVERRIDES[value]) {
    return FIELD_LABEL_OVERRIDES[value];
  }

  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function isDefined(value: unknown) {
  return value !== undefined && value !== null;
}

function isPricingFeatureState(value: unknown): value is PricingFeatureState {
  return PRICING_FEATURE_STATE_OPTIONS.some((option) => option.value === value);
}

function normalizePricingColumnKey(value: string) {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "column"
  );
}

function getPricingPlanColumns(section: CmsSection) {
  const columns = section.settings?.planColumns;

  if (!Array.isArray(columns)) {
    return DEFAULT_PRICING_COLUMNS;
  }

  const normalizedColumns = columns.filter(
    (column): column is string => typeof column === "string" && column.trim().length > 0,
  );

  return normalizedColumns.length ? normalizedColumns : DEFAULT_PRICING_COLUMNS;
}

function normalizePricingFeatureItem(item: CmsItem, columns: string[]) {
  const nextExtraData = { ...(item.extraData ?? {}) };

  for (const column of columns) {
    const key = normalizePricingColumnKey(column);
    nextExtraData[key] = isPricingFeatureState(nextExtraData[key])
      ? nextExtraData[key]
      : "included";
  }

  return {
    ...item,
    itemType: PRICING_FEATURE_ITEM_TYPE,
    extraData: nextExtraData,
  };
}

function getRecordEntries(
  record: Record<string, unknown> | undefined,
  advancedKeys: Set<string>,
  variant: "main" | "advanced",
) {
  return Object.entries(record ?? {}).filter(([key, value]) =>
    variant === "advanced"
      ? advancedKeys.has(key) && isDefined(value)
      : !advancedKeys.has(key) && isDefined(value),
  );
}

function buildHeroHeadline(section: CmsSection) {
  const titlePrefix =
    typeof section.settings?.titlePrefix === "string" ? section.settings.titlePrefix : "";
  const titleHighlight =
    typeof section.settings?.titleHighlight === "string" ? section.settings.titleHighlight : "";
  const titleSuffix =
    typeof section.settings?.titleSuffix === "string" ? section.settings.titleSuffix : "";
  const titleLineTwo =
    typeof section.settings?.titleLineTwo === "string" ? section.settings.titleLineTwo : "";

  const firstLine = [titlePrefix, [titleHighlight, titleSuffix].join("")].join(" ").trim();

  return [firstLine, titleLineTwo].filter(Boolean).join(" ").trim();
}

function getSectionCardTitle(section: CmsSection) {
  if (section.sectionType === "hero") {
    return buildHeroHeadline(section) || section.heading || section.internalName;
  }

  return section.heading || section.internalName;
}

function getSectionSettingsTitle(section: CmsSection) {
  if (section.sectionType === "hero") {
    return "Hero headline and extra text";
  }

  if (section.sectionType === PRICING_FEATURE_SECTION_TYPE) {
    return "Pricing comparison columns";
  }

  if (section.sectionType === "logo_strip") {
    return "Carousel heading and settings";
  }

  return "Extra visible section fields";
}

function getItemExtrasTitle(item: CmsItem) {
  if (item.itemType === "logo") {
    return "Logo details";
  }

  return "Extra visible item fields";
}

export function PageEditor({ page, onReload }: Props) {
  const isPricingPage = PRICING_PAGE_KEYS.has(page.pageKey);
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
    ogImageAlt: page.ogImageAlt ?? "",
    status: page.status,
    indexable: page.indexable,
  });

  useEffect(() => {
    setMetaState({
      pageName: page.pageName,
      slug: page.slug,
      metaTitle: page.metaTitle,
      metaDescription: page.metaDescription,
      metaKeywords: page.metaKeywords ?? "",
      canonicalUrl: page.canonicalUrl ?? "",
      ogTitle: page.ogTitle ?? "",
      ogDescription: page.ogDescription ?? "",
      ogImage: page.ogImage ?? "",
      ogImageAlt: page.ogImageAlt ?? "",
      status: page.status,
      indexable: page.indexable,
    });
  }, [page]);

  const orderedSections = useMemo(() => sortByDisplayOrder(page.sections), [page.sections]);

  const savePage = async () => {
    await pageService.update(page.id, metaState);
    toast.success("Page details updated");
    await onReload();
  };

  const addSection = async () => {
    await pageService.createSection(page.id, {
      ...createBlankSection(),
      displayOrder: page.sections.length,
    });
    toast.success("New section added");
    await onReload();
  };

  const addPricingFeatureSection = async () => {
    const sectionNumber =
      page.sections.filter((section) => section.sectionType === PRICING_FEATURE_SECTION_TYPE)
        .length + 1;

    const createdSection = await pageService.createSection(page.id, {
      sectionKey: `${page.pageKey}-feature-section-${Date.now()}`,
      sectionType: PRICING_FEATURE_SECTION_TYPE,
      internalName: `Feature Section ${sectionNumber}`,
      heading: "New Feature Section",
      subheading: "Feature Section",
      description: "Add the feature rows and plan availability for this pricing section.",
      settings: { planColumns: DEFAULT_PRICING_COLUMNS },
      displayOrder: page.sections.length,
      isActive: true,
      isRequired: false,
    });

    await pageService.createItem(createdSection.id, createBlankPricingFeatureRow(0));

    toast.success("Pricing feature section added");
    await onReload();
  };

  const restorePage = async () => {
    await pageService.restore(page.id);
    toast.success("Starter content restored");
    await onReload();
  };

  const moveSection = async (sectionId: number, direction: -1 | 1) => {
    const currentIndex = orderedSections.findIndex((section) => section.id === sectionId);
    const nextIndex = currentIndex + direction;

    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= orderedSections.length) {
      return;
    }

    const reordered = [...orderedSections];
    const [movedSection] = reordered.splice(currentIndex, 1);
    reordered.splice(nextIndex, 0, movedSection);

    await pageService.reorderSections(
      reordered.map((section, index) => ({ id: section.id, displayOrder: index })),
    );
    toast.success("Section order updated");
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
      ...(section.sectionType === PRICING_FEATURE_SECTION_TYPE
        ? createBlankPricingFeatureRow(section.items.length)
        : createBlankItem()),
      displayOrder: section.items.length,
    });
    toast.success(
      section.sectionType === PRICING_FEATURE_SECTION_TYPE ? "Feature row added" : "New item added",
    );
    await onReload();
  };

  const moveItem = async (section: CmsSection, itemId: number, direction: -1 | 1) => {
    const orderedItems = sortByDisplayOrder(section.items);
    const currentIndex = orderedItems.findIndex((item) => item.id === itemId);
    const nextIndex = currentIndex + direction;

    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= orderedItems.length) {
      return;
    }

    const reordered = [...orderedItems];
    const [movedItem] = reordered.splice(currentIndex, 1);
    reordered.splice(nextIndex, 0, movedItem);

    await pageService.reorderItems(
      reordered.map((item, index) => ({ id: item.id, displayOrder: index })),
    );
    toast.success("Item order updated");
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
            <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
              Page Basics
            </div>
            <h2 className="mt-2 text-2xl font-semibold">{page.pageName}</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Keep this simple for your client. Only the page name and page URL are shown first.
            </p>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => void restorePage()} className="btn-secondary">
              <RotateCcw className="h-4 w-4" />
              Restore Starter Content
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
            <input
              value={metaState.pageName}
              onChange={(event) =>
                setMetaState((current) => ({ ...current, pageName: event.target.value }))
              }
            />
          </label>
          <label className="field">
            <span>Page URL</span>
            <input
              value={metaState.slug}
              onChange={(event) =>
                setMetaState((current) => ({ ...current, slug: event.target.value }))
              }
            />
          </label>
          <label className="field md:col-span-2">
            <span>Meta title</span>
            <input
              value={metaState.metaTitle}
              onChange={(event) =>
                setMetaState((current) => ({ ...current, metaTitle: event.target.value }))
              }
            />
          </label>
          <label className="field md:col-span-2">
            <span>Meta description</span>
            <textarea
              rows={4}
              value={metaState.metaDescription}
              onChange={(event) =>
                setMetaState((current) => ({
                  ...current,
                  metaDescription: event.target.value,
                }))
              }
            />
          </label>
          <label className="field md:col-span-2">
            <span>SEO keywords</span>
            <input
              value={metaState.metaKeywords ?? ""}
              onChange={(event) =>
                setMetaState((current) => ({
                  ...current,
                  metaKeywords: event.target.value,
                }))
              }
            />
          </label>
        </div>

        <details className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Advanced SEO tags
          </summary>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="field">
              <span>Canonical URL</span>
              <input
                value={metaState.canonicalUrl ?? ""}
                onChange={(event) =>
                  setMetaState((current) => ({
                    ...current,
                    canonicalUrl: event.target.value,
                  }))
                }
              />
            </label>
            <label className="field">
              <span>OG title</span>
              <input
                value={metaState.ogTitle ?? ""}
                onChange={(event) =>
                  setMetaState((current) => ({ ...current, ogTitle: event.target.value }))
                }
              />
            </label>
            <ImageUploadField
              label="OG image"
              value={metaState.ogImage ?? ""}
              onChange={(value) => setMetaState((current) => ({ ...current, ogImage: value }))}
              altText={metaState.ogImageAlt ?? ""}
              onAltTextChange={(value) =>
                setMetaState((current) => ({ ...current, ogImageAlt: value }))
              }
            />
            <label className="field md:col-span-2">
              <span>OG description</span>
              <textarea
                rows={3}
                value={metaState.ogDescription ?? ""}
                onChange={(event) =>
                  setMetaState((current) => ({
                    ...current,
                    ogDescription: event.target.value,
                  }))
                }
              />
            </label>
          </div>
        </details>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
              Frontend Sections
            </div>
            <h2 className="mt-2 text-2xl font-semibold">Edit visible website content</h2>
            <p className="mt-2 max-w-3xl text-sm text-slate-500">
              These are the blocks shown on the frontend. Edit the heading, subtitle, text, images,
              logos, buttons and list items directly from here.
            </p>
          </div>
          {isPricingPage ? (
            <button
              type="button"
              onClick={() => void addPricingFeatureSection()}
              className="btn-primary"
            >
              <Plus className="h-4 w-4" />
              Add Feature Section
            </button>
          ) : null}
        </div>

        <div className="mt-6 space-y-6">
          {orderedSections.map((section, index) => (
            <SectionCard
              key={section.id}
              section={section}
              canMoveUp={index > 0}
              canMoveDown={index < orderedSections.length - 1}
              onMoveUp={() => moveSection(section.id, -1)}
              onMoveDown={() => moveSection(section.id, 1)}
              onSave={saveSection}
              onDelete={deleteSection}
              onAddItem={addItem}
              onMoveItem={moveItem}
              onSaveItem={saveItem}
              onDeleteItem={deleteItem}
              onAddPricingFeatureSection={isPricingPage ? addPricingFeatureSection : undefined}
            />
          ))}

          {isPricingPage ? (
            <div className="rounded-3xl border border-dashed border-blue-300 bg-blue-50/60 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
                    New pricing table
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-slate-950">
                    Add another feature section
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Creates a new comparison card with Basic, Professional and Premium columns.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void addPricingFeatureSection()}
                  className="btn-primary"
                >
                  <Plus className="h-4 w-4" />
                  Add New Feature Section
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <details className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Advanced page structure
          </summary>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="max-w-2xl text-sm text-slate-500">
              Use this only if you need to create a brand-new custom section. Most clients will not
              need this.
            </p>
            <button type="button" onClick={() => void addSection()} className="btn-secondary">
              <Plus className="h-4 w-4" />
              Add Section
            </button>
          </div>
        </details>
      </section>
    </div>
  );
}

function SectionCard({
  section,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onSave,
  onDelete,
  onAddItem,
  onMoveItem,
  onSaveItem,
  onDeleteItem,
  onAddPricingFeatureSection,
}: {
  section: CmsSection;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => Promise<void> | void;
  onMoveDown: () => Promise<void> | void;
  onSave: (section: CmsSection) => Promise<void>;
  onDelete: (section: CmsSection) => Promise<void>;
  onAddItem: (section: CmsSection) => Promise<void>;
  onMoveItem: (section: CmsSection, itemId: number, direction: -1 | 1) => Promise<void>;
  onSaveItem: (item: CmsItem) => Promise<void>;
  onDeleteItem: (item: CmsItem) => Promise<void>;
  onAddPricingFeatureSection?: () => Promise<void> | void;
}) {
  const [draft, setDraft] = useState(section);

  useEffect(() => {
    setDraft(section);
  }, [section]);

  const forceVisible = draft.sectionKey === "new-section";
  const isPricingFeatureSection = draft.sectionType === PRICING_FEATURE_SECTION_TYPE;
  const orderedItems = useMemo(() => sortByDisplayOrder(draft.items), [draft.items]);
  const contentSettings = getRecordEntries(draft.settings, ADVANCED_SECTION_SETTING_KEYS, "main");
  const advancedSettings = getRecordEntries(
    draft.settings,
    ADVANCED_SECTION_SETTING_KEYS,
    "advanced",
  );
  const showHeading = forceVisible || isDefined(draft.heading);
  const showSubtitle = forceVisible || isDefined(draft.subheading);
  const showDescription = forceVisible || isDefined(draft.description);
  const showButtons = forceVisible || isDefined(draft.buttonText) || isDefined(draft.buttonLink);
  const showSectionImages =
    forceVisible || isDefined(draft.imageUrl) || isDefined(draft.backgroundImageUrl);
  const addItemLabel = isPricingFeatureSection
    ? "Add Feature Row"
    : draft.sectionType === "logo_strip"
      ? "Add Logo"
      : "Add Item";
  const itemsHeading = isPricingFeatureSection
    ? "Feature rows in this section"
    : draft.sectionType === "logo_strip"
      ? "Logos in this carousel"
      : "Items inside this section";
  const itemsDescription = isPricingFeatureSection
    ? "Add feature names and choose whether each plan includes them."
    : draft.sectionType === "logo_strip"
      ? "Add, replace or delete logos shown in the frontend carousel."
      : "Use this for cards, logos, bullets and repeatable content blocks.";
  const pricingColumns = isPricingFeatureSection ? getPricingPlanColumns(draft) : [];

  return (
    <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Section
          </div>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">
            {getSectionCardTitle(draft)}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {draft.internalName}
            {draft.sectionKey ? ` · ${draft.sectionKey}` : ""}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void onMoveUp()}
            className="btn-secondary"
            disabled={!canMoveUp}
          >
            <ArrowUp className="h-4 w-4" />
            Move Up
          </button>
          <button
            type="button"
            onClick={() => void onMoveDown()}
            className="btn-secondary"
            disabled={!canMoveDown}
          >
            <ArrowDown className="h-4 w-4" />
            Move Down
          </button>
          <button type="button" onClick={() => void onSave(draft)} className="btn-primary">
            <Save className="h-4 w-4" />
            Save Section
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {showHeading ? (
          <label className="field md:col-span-2">
            <span>Heading</span>
            <input
              value={draft.heading ?? ""}
              onChange={(event) =>
                setDraft((current) => ({ ...current, heading: event.target.value }))
              }
            />
          </label>
        ) : null}

        {showSubtitle ? (
          <label className="field md:col-span-2">
            <span>Subtitle</span>
            <input
              value={draft.subheading ?? ""}
              onChange={(event) =>
                setDraft((current) => ({ ...current, subheading: event.target.value }))
              }
            />
          </label>
        ) : null}

        {showDescription ? (
          <label className="field md:col-span-2">
            <span>Description</span>
            <textarea
              rows={4}
              value={draft.description ?? ""}
              onChange={(event) =>
                setDraft((current) => ({ ...current, description: event.target.value }))
              }
            />
          </label>
        ) : null}
      </div>

      {contentSettings.length ? (
        <RecordFieldEditor
          title={getSectionSettingsTitle(draft)}
          entries={contentSettings}
          onChange={(key, value) =>
            setDraft((current) => ({
              ...current,
              settings: { ...(current.settings ?? {}), [key]: value },
            }))
          }
        />
      ) : null}

      {showButtons || showSectionImages ? (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {showButtons ? (
            <>
              <label className="field">
                <span>Button text</span>
                <input
                  value={draft.buttonText ?? ""}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, buttonText: event.target.value }))
                  }
                />
              </label>
              <label className="field">
                <span>Button link</span>
                <input
                  value={draft.buttonLink ?? ""}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, buttonLink: event.target.value }))
                  }
                />
              </label>
            </>
          ) : null}

          {showSectionImages ? (
            <>
              <ImageUploadField
                label="Section image"
                value={draft.imageUrl ?? ""}
                onChange={(value) => setDraft((current) => ({ ...current, imageUrl: value }))}
                altText={draft.imageAlt ?? ""}
                onAltTextChange={(value) =>
                  setDraft((current) => ({ ...current, imageAlt: value }))
                }
              />
              <ImageUploadField
                label="Background image"
                value={draft.backgroundImageUrl ?? ""}
                onChange={(value) =>
                  setDraft((current) => ({ ...current, backgroundImageUrl: value }))
                }
                altText={draft.backgroundImageAlt ?? ""}
                onAltTextChange={(value) =>
                  setDraft((current) => ({ ...current, backgroundImageAlt: value }))
                }
              />
            </>
          ) : null}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-slate-900">{itemsHeading}</div>
          <div className="text-sm text-slate-500">{itemsDescription}</div>
        </div>
        <div className="flex flex-wrap gap-2">
          {isPricingFeatureSection && onAddPricingFeatureSection ? (
            <button
              type="button"
              onClick={() => void onAddPricingFeatureSection()}
              className="btn-primary"
            >
              <Plus className="h-4 w-4" />
              Add New Feature Section
            </button>
          ) : null}
          <button type="button" onClick={() => void onAddItem(draft)} className="btn-secondary">
            <Plus className="h-4 w-4" />
            {addItemLabel}
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {orderedItems.map((item, index) =>
          isPricingFeatureSection ? (
            <PricingFeatureRowCard
              key={item.id}
              item={item}
              planColumns={pricingColumns}
              canMoveUp={index > 0}
              canMoveDown={index < orderedItems.length - 1}
              onMoveUp={() => onMoveItem(draft, item.id, -1)}
              onMoveDown={() => onMoveItem(draft, item.id, 1)}
              onSave={onSaveItem}
              onDelete={onDeleteItem}
            />
          ) : (
            <ItemCard
              key={item.id}
              item={item}
              canMoveUp={index > 0}
              canMoveDown={index < orderedItems.length - 1}
              onMoveUp={() => onMoveItem(draft, item.id, -1)}
              onMoveDown={() => onMoveItem(draft, item.id, 1)}
              onSave={onSaveItem}
              onDelete={onDeleteItem}
            />
          ),
        )}
      </div>

      {advancedSettings.length || !draft.isRequired ? (
        <details className="mt-5 rounded-3xl border border-slate-200 bg-white p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Advanced section options
          </summary>

          {advancedSettings.length ? (
            <RecordFieldEditor
              title="Interactive settings"
              entries={advancedSettings}
              onChange={(key, value) =>
                setDraft((current) => ({
                  ...current,
                  settings: { ...(current.settings ?? {}), [key]: value },
                }))
              }
            />
          ) : null}

          {!draft.isRequired ? (
            <div className="mt-4">
              <button type="button" onClick={() => void onDelete(draft)} className="btn-danger">
                <Trash2 className="h-4 w-4" />
                Delete Section
              </button>
            </div>
          ) : null}
        </details>
      ) : null}
    </article>
  );
}

function PricingFeatureRowCard({
  item,
  planColumns,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onSave,
  onDelete,
}: {
  item: CmsItem;
  planColumns: string[];
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => Promise<void> | void;
  onMoveDown: () => Promise<void> | void;
  onSave: (item: CmsItem) => Promise<void>;
  onDelete: (item: CmsItem) => Promise<void>;
}) {
  const [draft, setDraft] = useState(normalizePricingFeatureItem(item, planColumns));

  useEffect(() => {
    setDraft(normalizePricingFeatureItem(item, planColumns));
  }, [item, planColumns]);

  const updateStatus = (column: string, value: PricingFeatureState) => {
    const key = normalizePricingColumnKey(column);

    setDraft((current) => ({
      ...current,
      extraData: {
        ...(current.extraData ?? {}),
        [key]: value,
      },
    }));
  };

  const getStatus = (column: string) => {
    const value = draft.extraData?.[normalizePricingColumnKey(column)];
    return isPricingFeatureState(value) ? value : "included";
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-slate-900">{draft.title || "New feature"}</div>
          <div className="text-xs text-slate-500">Pricing feature row</div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void onMoveUp()}
            className="btn-secondary"
            disabled={!canMoveUp}
          >
            <ArrowUp className="h-4 w-4" />
            Up
          </button>
          <button
            type="button"
            onClick={() => void onMoveDown()}
            className="btn-secondary"
            disabled={!canMoveDown}
          >
            <ArrowDown className="h-4 w-4" />
            Down
          </button>
          <button type="button" onClick={() => void onDelete(draft)} className="btn-danger">
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
          <button
            type="button"
            onClick={() => void onSave(normalizePricingFeatureItem(draft, planColumns))}
            className="btn-secondary"
          >
            <Save className="h-4 w-4" />
            Save Row
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="field md:col-span-2">
          <span>Feature name</span>
          <input
            value={draft.title ?? ""}
            onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
          />
        </label>

        <label className="field md:col-span-2">
          <span>Feature note</span>
          <input
            value={draft.description ?? ""}
            onChange={(event) =>
              setDraft((current) => ({ ...current, description: event.target.value }))
            }
          />
        </label>

        {planColumns.map((column) => (
          <label key={column} className="field">
            <span>{column}</span>
            <select
              value={getStatus(column)}
              onChange={(event) => updateStatus(column, event.target.value as PricingFeatureState)}
            >
              {PRICING_FEATURE_STATE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </div>
  );
}

function ItemCard({
  item,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onSave,
  onDelete,
}: {
  item: CmsItem;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => Promise<void> | void;
  onMoveDown: () => Promise<void> | void;
  onSave: (item: CmsItem) => Promise<void>;
  onDelete: (item: CmsItem) => Promise<void>;
}) {
  const [draft, setDraft] = useState(item);

  useEffect(() => {
    setDraft(item);
  }, [item]);

  const forceVisible = draft.title === "" && draft.subtitle === "" && draft.description === "";
  const showTitle = forceVisible || isDefined(draft.title);
  const showSubtitle = forceVisible || isDefined(draft.subtitle);
  const showDescription = forceVisible || isDefined(draft.description);
  const showIcon = forceVisible || isDefined(draft.icon);
  const showImage = forceVisible || isDefined(draft.imageUrl) || draft.itemType === "logo";
  const showButtons = forceVisible || isDefined(draft.buttonText) || isDefined(draft.buttonLink);
  const contentExtras = getRecordEntries(draft.extraData, ADVANCED_ITEM_EXTRA_KEYS, "main");
  const advancedExtras = getRecordEntries(draft.extraData, ADVANCED_ITEM_EXTRA_KEYS, "advanced");
  const itemLabel =
    draft.itemType === "logo" ? draft.title || "Logo" : draft.title || draft.subtitle || "New item";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-slate-900">{itemLabel}</div>
          <div className="text-xs text-slate-500">{draft.itemType}</div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void onMoveUp()}
            className="btn-secondary"
            disabled={!canMoveUp}
          >
            <ArrowUp className="h-4 w-4" />
            Up
          </button>
          <button
            type="button"
            onClick={() => void onMoveDown()}
            className="btn-secondary"
            disabled={!canMoveDown}
          >
            <ArrowDown className="h-4 w-4" />
            Down
          </button>
          <button type="button" onClick={() => void onDelete(draft)} className="btn-danger">
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
          <button type="button" onClick={() => void onSave(draft)} className="btn-secondary">
            <Save className="h-4 w-4" />
            Save Item
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {showTitle ? (
          <label className="field">
            <span>{draft.itemType === "logo" ? "Logo name" : "Title"}</span>
            <input
              value={draft.title ?? ""}
              onChange={(event) =>
                setDraft((current) => ({ ...current, title: event.target.value }))
              }
            />
          </label>
        ) : null}

        {showSubtitle ? (
          <label className="field">
            <span>Subtitle</span>
            <input
              value={draft.subtitle ?? ""}
              onChange={(event) =>
                setDraft((current) => ({ ...current, subtitle: event.target.value }))
              }
            />
          </label>
        ) : null}

        {showDescription ? (
          <label className="field md:col-span-2">
            <span>Description</span>
            <textarea
              rows={3}
              value={draft.description ?? ""}
              onChange={(event) =>
                setDraft((current) => ({ ...current, description: event.target.value }))
              }
            />
          </label>
        ) : null}

        {showIcon ? (
          <label className="field">
            <span>Icon name</span>
            <input
              value={draft.icon ?? ""}
              onChange={(event) =>
                setDraft((current) => ({ ...current, icon: event.target.value }))
              }
            />
          </label>
        ) : null}

        {showImage ? (
          <ImageUploadField
            label={draft.itemType === "logo" ? "Logo image" : "Item image"}
            value={draft.imageUrl ?? ""}
            onChange={(value) => setDraft((current) => ({ ...current, imageUrl: value }))}
            altText={draft.imageAlt ?? ""}
            onAltTextChange={(value) => setDraft((current) => ({ ...current, imageAlt: value }))}
          />
        ) : null}

        {showButtons ? (
          <>
            <label className="field">
              <span>Button text</span>
              <input
                value={draft.buttonText ?? ""}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, buttonText: event.target.value }))
                }
              />
            </label>
            <label className="field">
              <span>Button link</span>
              <input
                value={draft.buttonLink ?? ""}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, buttonLink: event.target.value }))
                }
              />
            </label>
          </>
        ) : null}
      </div>

      {contentExtras.length ? (
        <RecordFieldEditor
          title={getItemExtrasTitle(draft)}
          entries={contentExtras}
          onChange={(key, value) =>
            setDraft((current) => ({
              ...current,
              extraData: { ...(current.extraData ?? {}), [key]: value },
            }))
          }
        />
      ) : null}

      {advancedExtras.length ? (
        <details className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Advanced item options
          </summary>

          <RecordFieldEditor
            title="Appearance settings"
            entries={advancedExtras}
            onChange={(key, value) =>
              setDraft((current) => ({
                ...current,
                extraData: { ...(current.extraData ?? {}), [key]: value },
              }))
            }
          />
        </details>
      ) : null}
    </div>
  );
}

function RecordFieldEditor({
  title,
  entries,
  onChange,
}: {
  title: string;
  entries: Array<[string, unknown]>;
  onChange: (key: string, value: unknown) => void;
}) {
  return (
    <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-4">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {entries.map(([key, value]) => {
          if (Array.isArray(value)) {
            return (
              <div key={key} className="md:col-span-2">
                <ListFieldEditor
                  fieldKey={key}
                  label={formatFieldLabel(key)}
                  values={value}
                  onChange={(nextValue) => onChange(key, nextValue)}
                />
              </div>
            );
          }

          if (typeof value === "number") {
            return (
              <label key={key} className="field">
                <span>{formatFieldLabel(key)}</span>
                <input
                  type="number"
                  value={value}
                  onChange={(event) => onChange(key, Number(event.target.value))}
                />
              </label>
            );
          }

          if (typeof value === "boolean") {
            return (
              <label key={key} className="field">
                <span>{formatFieldLabel(key)}</span>
                <select
                  value={value ? "true" : "false"}
                  onChange={(event) => onChange(key, event.target.value === "true")}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>
            );
          }

          const stringValue = typeof value === "string" ? value : JSON.stringify(value ?? "");
          const useTextarea = stringValue.length > 120;

          return (
            <label key={key} className={`field ${useTextarea ? "md:col-span-2" : ""}`}>
              <span>{formatFieldLabel(key)}</span>
              {useTextarea ? (
                <textarea
                  rows={4}
                  value={stringValue}
                  onChange={(event) => onChange(key, event.target.value)}
                />
              ) : (
                <input
                  value={stringValue}
                  onChange={(event) => onChange(key, event.target.value)}
                />
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}

function ListFieldEditor({
  fieldKey,
  label,
  values,
  onChange,
}: {
  fieldKey: string;
  label: string;
  values: unknown[];
  onChange: (values: unknown[]) => void;
}) {
  const isNumberList =
    NUMBER_LIST_KEYS.has(fieldKey) || values.every((entry) => typeof entry === "number");

  const updateItem = (index: number, nextValue: string) => {
    const nextItems = [...values];
    nextItems[index] = isNumberList ? Number(nextValue) : nextValue;
    onChange(nextItems);
  };

  const removeItem = (index: number) => {
    onChange(values.filter((_, itemIndex) => itemIndex !== index));
  };

  const addItem = () => {
    onChange([...values, isNumberList ? 0 : ""]);
  };

  return (
    <div className="field">
      <div className="flex items-center justify-between gap-3">
        <span>{label}</span>
        <button type="button" onClick={addItem} className="btn-secondary">
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>

      <div className="space-y-3">
        {values.length ? (
          values.map((value, index) => (
            <div key={`${fieldKey}-${index}`} className="flex items-center gap-3">
              <input
                type={isNumberList || NUMBER_KEYS.has(fieldKey) ? "number" : "text"}
                value={String(value ?? "")}
                className="field-input"
                onChange={(event) => updateItem(index, event.target.value)}
              />
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 transition hover:text-rose-700"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-400">
            No items added yet.
          </div>
        )}
      </div>
    </div>
  );
}
