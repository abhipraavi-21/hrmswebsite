import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  cloneManagedPageData,
  getDefaultManagedPageData,
  type ContactPageData,
  type HomePageData,
  type ManagedCardItem,
  type ManagedFaqItem,
  type ManagedFeatureGroup,
  type ManagedFeatureRow,
  type ManagedPageData,
  type ManagedPlanCard,
  type ManagedPricingState,
  type ManagedSectionCopy,
  type ManagedWorkflowItem,
  type PricingPageData,
} from "./pageData";

type PageManagedSectionsEditorProps = {
  slug: string;
  value?: ManagedPageData;
  onChange: (nextValue: ManagedPageData | undefined) => void;
};

type CardListEditorOptions = {
  title: string;
  description: string;
  itemName?: string;
  titleLabel?: string;
  descriptionLabel?: string;
  noteLabel?: string;
  bulletsLabel?: string;
  showHref?: boolean;
  showValue?: boolean;
  showCtaLabel?: boolean;
  createItem: () => ManagedCardItem;
};

const pricingStateOptions: { label: string; value: ManagedPricingState }[] = [
  { label: "Included", value: "included" },
  { label: "Not included", value: "notIncluded" },
  { label: "Limited", value: "limited" },
  { label: "Optional", value: "optional" },
  { label: "Add-on", value: "addon" },
];

export function supportsManagedPageEditor(slug: string) {
  return Boolean(getDefaultManagedPageData(slug));
}

export function resolveManagedPageData(slug: string, value?: ManagedPageData) {
  const defaultValue = getDefaultManagedPageData(slug);

  if (!defaultValue && !value) {
    return undefined;
  }

  const resolved = cloneManagedPageData(value ?? {});

  if (defaultValue?.home && !resolved.home) {
    resolved.home = cloneManagedPageData(defaultValue.home);
  }
  if (defaultValue?.pricing && !resolved.pricing) {
    resolved.pricing = cloneManagedPageData(defaultValue.pricing);
  }
  if (defaultValue?.contact && !resolved.contact) {
    resolved.contact = cloneManagedPageData(defaultValue.contact);
  }

  return resolved;
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function joinLineValues(values?: string[]) {
  return values?.join("\n") ?? "";
}

function splitLineValues(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function Panel({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[24px] border border-border/70 bg-muted/20 p-4">
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-xs leading-6 text-muted-foreground">{description}</p>
      </div>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string | number;
  onChange: (nextValue: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block space-y-2 text-sm">
      <span className="font-medium text-foreground">{label}</span>
      <Input
        value={String(value ?? "")}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="rounded-xl"
      />
    </label>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  rows = 4,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (nextValue: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="block space-y-2 text-sm">
      <span className="font-medium text-foreground">{label}</span>
      <Textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="rounded-2xl"
      />
    </label>
  );
}

function SectionCopyEditor({
  value,
  onChange,
  eyebrowLabel = "Section eyebrow",
  titleLabel = "Section title",
  descriptionLabel = "Section description",
}: {
  value: ManagedSectionCopy;
  onChange: (nextValue: ManagedSectionCopy) => void;
  eyebrowLabel?: string;
  titleLabel?: string;
  descriptionLabel?: string;
}) {
  return (
    <div className="grid gap-4">
      <InputField
        label={eyebrowLabel}
        value={value.eyebrow}
        onChange={(eyebrow) => onChange({ ...value, eyebrow })}
      />
      <InputField
        label={titleLabel}
        value={value.title}
        onChange={(title) => onChange({ ...value, title })}
      />
      <TextareaField
        label={descriptionLabel}
        value={value.description}
        onChange={(description) => onChange({ ...value, description })}
      />
    </div>
  );
}

function StringListEditor({
  title,
  description,
  items,
  onChange,
  addLabel,
  placeholder,
}: {
  title: string;
  description: string;
  items: string[];
  onChange: (nextValue: string[]) => void;
  addLabel: string;
  placeholder: string;
}) {
  return (
    <Panel title={title} description={description}>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={`${item}-${index}`} className="flex gap-3">
            <Input
              value={item}
              onChange={(event) =>
                onChange(items.map((entry, entryIndex) => (entryIndex === index ? event.target.value : entry)))
              }
              placeholder={placeholder}
              className="rounded-xl"
            />
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              onClick={() => onChange(items.filter((_, entryIndex) => entryIndex !== index))}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        className="rounded-xl"
        onClick={() => onChange([...items, ""])}
      >
        <Plus className="h-4 w-4" />
        {addLabel}
      </Button>
    </Panel>
  );
}

function CardListEditor({
  items,
  onChange,
  options,
}: {
  items: ManagedCardItem[];
  onChange: (nextValue: ManagedCardItem[]) => void;
  options: CardListEditorOptions;
}) {
  const noteLabel = options.noteLabel ?? "Short label";
  const titleLabel = options.titleLabel ?? "Title";
  const descriptionLabel = options.descriptionLabel ?? "Description";
  const itemName = options.itemName ?? "Item";

  return (
    <Panel title={options.title} description={options.description}>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="rounded-2xl border border-border bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="text-sm font-semibold text-foreground">{itemName} {index + 1}</div>
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={() => onChange(items.filter((entry) => entry.id !== item.id))}
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </Button>
            </div>

            <div className="mt-4 grid gap-4">
              <InputField
                label={titleLabel}
                value={item.title}
                onChange={(title) =>
                  onChange(items.map((entry) => (entry.id === item.id ? { ...entry, title } : entry)))
                }
              />
              <TextareaField
                label={descriptionLabel}
                value={item.description}
                onChange={(description) =>
                  onChange(items.map((entry) => (entry.id === item.id ? { ...entry, description } : entry)))
                }
              />
              <InputField
                label={noteLabel}
                value={item.note ?? ""}
                onChange={(note) =>
                  onChange(items.map((entry) => (entry.id === item.id ? { ...entry, note } : entry)))
                }
              />
              {options.showHref ? (
                <InputField
                  label="Link URL"
                  value={item.href ?? ""}
                  onChange={(href) =>
                    onChange(items.map((entry) => (entry.id === item.id ? { ...entry, href } : entry)))
                  }
                  placeholder="/pricing or https://..."
                />
              ) : null}
              {options.showCtaLabel ? (
                <InputField
                  label="CTA label"
                  value={item.ctaLabel ?? ""}
                  onChange={(ctaLabel) =>
                    onChange(items.map((entry) => (entry.id === item.id ? { ...entry, ctaLabel } : entry)))
                  }
                />
              ) : null}
              {options.showValue ? (
                <InputField
                  label="Value"
                  value={item.value ?? ""}
                  onChange={(value) =>
                    onChange(items.map((entry) => (entry.id === item.id ? { ...entry, value } : entry)))
                  }
                />
              ) : null}
              {options.bulletsLabel ? (
                <TextareaField
                  label={options.bulletsLabel}
                  value={joinLineValues(item.bullets)}
                  onChange={(nextValue) =>
                    onChange(
                      items.map((entry) =>
                        entry.id === item.id ? { ...entry, bullets: splitLineValues(nextValue) } : entry,
                      ),
                    )
                  }
                  rows={5}
                  placeholder="One line per item"
                />
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        className="rounded-xl"
        onClick={() => onChange([...items, options.createItem()])}
      >
        <Plus className="h-4 w-4" />
        Add item
      </Button>
    </Panel>
  );
}

function SectionCopyPanel({
  title,
  description,
  value,
  onChange,
}: {
  title: string;
  description: string;
  value: ManagedSectionCopy;
  onChange: (nextValue: ManagedSectionCopy) => void;
}) {
  return (
    <Panel title={title} description={description}>
      <SectionCopyEditor
        value={value}
        onChange={onChange}
        eyebrowLabel="Eyebrow text"
        titleLabel="Frontend heading"
        descriptionLabel="Frontend description"
      />
    </Panel>
  );
}

function WorkflowListEditor({
  items,
  onChange,
}: {
  items: ManagedWorkflowItem[];
  onChange: (nextValue: ManagedWorkflowItem[]) => void;
}) {
  return (
    <Panel title="Workflow examples" description="Edit the workflow cards and the step-by-step lists shown on the home page.">
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="rounded-2xl border border-border bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="text-sm font-semibold text-foreground">Workflow {index + 1}</div>
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={() => onChange(items.filter((entry) => entry.id !== item.id))}
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </Button>
            </div>

            <div className="mt-4 space-y-4">
              <InputField
                label="Workflow title"
                value={item.title}
                onChange={(title) =>
                  onChange(items.map((entry) => (entry.id === item.id ? { ...entry, title } : entry)))
                }
              />
              <TextareaField
                label="Workflow steps"
                value={joinLineValues(item.steps)}
                onChange={(nextValue) =>
                  onChange(
                    items.map((entry) =>
                      entry.id === item.id ? { ...entry, steps: splitLineValues(nextValue) } : entry,
                    ),
                  )
                }
                rows={6}
                placeholder="One line per step"
              />
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        className="rounded-xl"
        onClick={() =>
          onChange([
            ...items,
            { id: createId("workflow"), title: "New workflow", steps: ["Step 1", "Step 2"] },
          ])
        }
      >
        <Plus className="h-4 w-4" />
        Add workflow
      </Button>
    </Panel>
  );
}

function FaqListEditor({
  items,
  onChange,
}: {
  items: ManagedFaqItem[];
  onChange: (nextValue: ManagedFaqItem[]) => void;
}) {
  return (
    <Panel title="FAQ items" description="Manage the questions and answers shown on the page.">
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="rounded-2xl border border-border bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="text-sm font-semibold text-foreground">FAQ {index + 1}</div>
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={() => onChange(items.filter((entry) => entry.id !== item.id))}
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </Button>
            </div>

            <div className="mt-4 space-y-4">
              <InputField
                label="Question"
                value={item.question}
                onChange={(question) =>
                  onChange(items.map((entry) => (entry.id === item.id ? { ...entry, question } : entry)))
                }
              />
              <TextareaField
                label="Answer"
                value={item.answer}
                onChange={(answer) =>
                  onChange(items.map((entry) => (entry.id === item.id ? { ...entry, answer } : entry)))
                }
              />
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        className="rounded-xl"
        onClick={() =>
          onChange([
            ...items,
            { id: createId("faq"), question: "New question", answer: "New answer" },
          ])
        }
      >
        <Plus className="h-4 w-4" />
        Add FAQ
      </Button>
    </Panel>
  );
}

function PlanCardListEditor({
  items,
  onChange,
}: {
  items: ManagedPlanCard[];
  onChange: (nextValue: ManagedPlanCard[]) => void;
}) {
  return (
    <Panel title="Plan cards" description="Update plan names, prices, summaries, and bullet lists for the pricing cards.">
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="rounded-2xl border border-border bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="text-sm font-semibold text-foreground">Plan {index + 1}</div>
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={() => onChange(items.filter((entry) => entry.id !== item.id))}
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </Button>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <InputField
                label="Plan name"
                value={item.name}
                onChange={(name) =>
                  onChange(items.map((entry) => (entry.id === item.id ? { ...entry, name } : entry)))
                }
              />
              <InputField
                label="Price per employee"
                value={item.price}
                onChange={(price) =>
                  onChange(
                    items.map((entry) =>
                      entry.id === item.id ? { ...entry, price: Number.parseInt(price || "0", 10) || 0 } : entry,
                    ),
                  )
                }
              />
            </div>
            <div className="mt-4 space-y-4">
              <TextareaField
                label="Summary"
                value={item.summary}
                onChange={(summary) =>
                  onChange(items.map((entry) => (entry.id === item.id ? { ...entry, summary } : entry)))
                }
              />
              <TextareaField
                label="Bullet points"
                value={joinLineValues(item.bullets)}
                onChange={(nextValue) =>
                  onChange(
                    items.map((entry) =>
                      entry.id === item.id ? { ...entry, bullets: splitLineValues(nextValue) } : entry,
                    ),
                  )
                }
                rows={5}
                placeholder="One line per bullet"
              />
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        className="rounded-xl"
        onClick={() =>
          onChange([
            ...items,
            {
              id: createId("plan"),
              name: "New plan",
              price: 0,
              summary: "Plan summary",
              bullets: ["Feature 1", "Feature 2"],
            },
          ])
        }
      >
        <Plus className="h-4 w-4" />
        Add plan
      </Button>
    </Panel>
  );
}

function FeatureGroupListEditor({
  items,
  onChange,
}: {
  items: ManagedFeatureGroup[];
  onChange: (nextValue: ManagedFeatureGroup[]) => void;
}) {
  function updateRow(
    groupId: string,
    rowId: string,
    updater: (row: ManagedFeatureRow) => ManagedFeatureRow,
  ) {
    onChange(
      items.map((group) =>
        group.id === groupId
          ? {
              ...group,
              rows: group.rows.map((row) => (row.id === rowId ? updater(row) : row)),
            }
          : group,
      ),
    );
  }

  return (
    <Panel
      title="Feature comparison groups"
      description="Edit the sectioned comparison table for pricing plans, including add, edit, and delete controls."
    >
      <div className="space-y-4">
        {items.map((group, groupIndex) => (
          <div key={group.id} className="rounded-2xl border border-border bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="text-sm font-semibold text-foreground">Group {groupIndex + 1}</div>
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={() => onChange(items.filter((entry) => entry.id !== group.id))}
              >
                <Trash2 className="h-4 w-4" />
                Remove group
              </Button>
            </div>

            <div className="mt-4 space-y-4">
              <InputField
                label="Group title"
                value={group.title}
                onChange={(title) =>
                  onChange(items.map((entry) => (entry.id === group.id ? { ...entry, title } : entry)))
                }
              />
              <TextareaField
                label="Group description"
                value={group.description}
                onChange={(description) =>
                  onChange(items.map((entry) => (entry.id === group.id ? { ...entry, description } : entry)))
                }
              />

              <div className="space-y-3">
                {group.rows.map((row, rowIndex) => (
                  <div key={row.id} className="rounded-2xl border border-border/70 bg-muted/20 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-sm font-semibold text-foreground">Feature {rowIndex + 1}</div>
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-xl"
                        onClick={() =>
                          onChange(
                            items.map((entry) =>
                              entry.id === group.id
                                ? { ...entry, rows: entry.rows.filter((feature) => feature.id !== row.id) }
                                : entry,
                            ),
                          )
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </Button>
                    </div>

                    <div className="mt-4 grid gap-4">
                      <InputField
                        label="Feature label"
                        value={row.label}
                        onChange={(label) => updateRow(group.id, row.id, (currentRow) => ({ ...currentRow, label }))}
                      />
                      <TextareaField
                        label="Row note"
                        value={row.note ?? ""}
                        onChange={(note) => updateRow(group.id, row.id, (currentRow) => ({ ...currentRow, note }))}
                        rows={3}
                      />
                      <div className="grid gap-4 md:grid-cols-3">
                        {(["basic", "professional", "premium"] as const).map((column) => (
                          <label key={column} className="block space-y-2 text-sm">
                            <span className="font-medium capitalize text-foreground">{column}</span>
                            <select
                              value={row[column]}
                              onChange={(event) =>
                                updateRow(group.id, row.id, (currentRow) => ({
                                  ...currentRow,
                                  [column]: event.target.value as ManagedPricingState,
                                }))
                              }
                              className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm"
                            >
                              {pricingStateOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={() =>
                  onChange(
                    items.map((entry) =>
                      entry.id === group.id
                        ? {
                            ...entry,
                            rows: [
                              ...entry.rows,
                              {
                                id: createId("feature"),
                                label: "New feature",
                                basic: "included",
                                professional: "included",
                                premium: "included",
                                note: "",
                              },
                            ],
                          }
                        : entry,
                    ),
                  )
                }
              >
                <Plus className="h-4 w-4" />
                Add feature row
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        className="rounded-xl"
        onClick={() =>
          onChange([
            ...items,
            {
              id: createId("group"),
              title: "New group",
              description: "Describe this comparison group.",
              rows: [
                {
                  id: createId("feature"),
                  label: "New feature",
                  basic: "included",
                  professional: "included",
                  premium: "included",
                  note: "",
                },
              ],
            },
          ])
        }
      >
        <Plus className="h-4 w-4" />
        Add feature group
      </Button>
    </Panel>
  );
}

function HomePageEditor({
  value,
  onChange,
}: {
  value: HomePageData;
  onChange: (nextValue: HomePageData) => void;
}) {
  return (
    <div className="space-y-4">
      <Panel
        title="1. Hero top area"
        description="These fields match the top home banner before the product sections start."
      >
        <div className="grid gap-4">
          <InputField
            label="Hero badge"
            value={value.heroBadge}
            onChange={(heroBadge) => onChange({ ...value, heroBadge })}
          />
          <InputField
            label="Hero subtitle"
            value={value.heroSubtitle}
            onChange={(heroSubtitle) => onChange({ ...value, heroSubtitle })}
          />
        </div>
      </Panel>

      <Panel
        title="2. Business at a glance card"
        description="This controls the overview card shown beside the hero illustration."
      >
        <div className="grid gap-4">
          <InputField
            label="Overview title"
            value={value.overviewTitle}
            onChange={(overviewTitle) => onChange({ ...value, overviewTitle })}
          />
          <TextareaField
            label="Overview description"
            value={value.overviewDescription}
            onChange={(overviewDescription) => onChange({ ...value, overviewDescription })}
          />
        </div>
      </Panel>

      <SectionCopyPanel
        title="3. Products section heading"
        description="This is the heading block above the three product cards."
        value={value.productsSection}
        onChange={(productsSection) => onChange({ ...value, productsSection })}
      />

      <CardListEditor
        items={value.productCards}
        onChange={(productCards) => onChange({ ...value, productCards })}
        options={{
          title: "4. Product cards"
          ,
          description: "Edit the three frontend product cards exactly as they appear in the products grid.",
          itemName: "Product card",
          titleLabel: "Card title",
          descriptionLabel: "Card description",
          noteLabel: "Eyebrow",
          bulletsLabel: "Feature chips",
          showHref: true,
          createItem: () => ({
            id: createId("home-product"),
            title: "New product",
            description: "Product description",
            note: "Product eyebrow",
            href: "/",
            bullets: ["Feature 1", "Feature 2", "Feature 3"],
          }),
        }}
      />

      <SectionCopyPanel
        title="5. Why businesses choose Altroz"
        description="Heading block for the business strengths section."
        value={value.strengthsSection}
        onChange={(strengthsSection) => onChange({ ...value, strengthsSection })}
      />

      <CardListEditor
        items={value.strengths}
        onChange={(strengths) => onChange({ ...value, strengths })}
        options={{
          title: "6. Strength cards",
          description: "These cards match the strength items shown under the heading above.",
          itemName: "Strength card",
          titleLabel: "Card title",
          descriptionLabel: "Card description",
          createItem: () => ({
            id: createId("home-strength"),
            title: "New strength",
            description: "Strength description",
          }),
        }}
      />

      <SectionCopyPanel
        title="7. Altroz ecosystem section"
        description="Heading block above the connected ecosystem cards."
        value={value.ecosystemSection}
        onChange={(ecosystemSection) => onChange({ ...value, ecosystemSection })}
      />

      <CardListEditor
        items={value.ecosystemCards}
        onChange={(ecosystemCards) => onChange({ ...value, ecosystemCards })}
        options={{
          title: "8. Ecosystem cards",
          description: "Edit the connected brand and product cards in the ecosystem section.",
          itemName: "Ecosystem card",
          titleLabel: "Card title",
          descriptionLabel: "Card description",
          createItem: () => ({
            id: createId("home-ecosystem"),
            title: "New ecosystem item",
            description: "Ecosystem description",
          }),
        }}
      />

      <SectionCopyPanel
        title="9. Industries section"
        description="Heading block above the industries grid."
        value={value.industriesSection}
        onChange={(industriesSection) => onChange({ ...value, industriesSection })}
      />

      <CardListEditor
        items={value.industries}
        onChange={(industries) => onChange({ ...value, industries })}
        options={{
          title: "10. Industry cards",
          description: "These cards match the industries shown on the homepage.",
          itemName: "Industry card",
          titleLabel: "Card title",
          descriptionLabel: "Card description",
          createItem: () => ({
            id: createId("home-industry"),
            title: "New industry",
            description: "Industry description",
          }),
        }}
      />

      <SectionCopyPanel
        title="11. Connected workflows section"
        description="Heading block above the workflow examples."
        value={value.workflowsSection}
        onChange={(workflowsSection) => onChange({ ...value, workflowsSection })}
      />

      <WorkflowListEditor
        items={value.workflows}
        onChange={(workflows) => onChange({ ...value, workflows })}
      />

      <SectionCopyPanel
        title="12. Business benefits section"
        description="Heading block above the business benefits cards."
        value={value.benefitsSection}
        onChange={(benefitsSection) => onChange({ ...value, benefitsSection })}
      />

      <CardListEditor
        items={value.benefits}
        onChange={(benefits) => onChange({ ...value, benefits })}
        options={{
          title: "13. Benefit cards",
          description: "Edit the benefit cards shown just before the FAQ section.",
          itemName: "Benefit card",
          titleLabel: "Card title",
          descriptionLabel: "Card description",
          createItem: () => ({
            id: createId("home-benefit"),
            title: "New benefit",
            description: "Benefit description",
          }),
        }}
      />

      <SectionCopyPanel
        title="14. FAQ section heading"
        description="Heading block above the homepage FAQs."
        value={value.faqSection}
        onChange={(faqSection) => onChange({ ...value, faqSection })}
      />

      <FaqListEditor items={value.faqs} onChange={(faqs) => onChange({ ...value, faqs })} />

      <Panel
        title="15. Final CTA eyebrow"
        description="Small label shown above the final call-to-action block near the bottom of the page."
      >
        <InputField
          label="CTA eyebrow"
          value={value.ctaEyebrow}
          onChange={(ctaEyebrow) => onChange({ ...value, ctaEyebrow })}
        />
      </Panel>
    </div>
  );
}

function PricingPageEditor({
  value,
  onChange,
}: {
  value: PricingPageData;
  onChange: (nextValue: PricingPageData) => void;
}) {
  return (
    <div className="space-y-4">
      <Panel
        title="1. Hero top area"
        description="These fields match the first pricing hero block on the frontend."
      >
        <div className="grid gap-4">
          <InputField
            label="Hero badge"
            value={value.heroBadge}
            onChange={(heroBadge) => onChange({ ...value, heroBadge })}
          />
        </div>
      </Panel>

      <Panel
        title="2. Comparison focus card"
        description="This card appears inside the hero area beside the plan price boxes."
      >
        <div className="grid gap-4">
          <InputField
            label="Comparison focus title"
            value={value.comparisonFocusTitle}
            onChange={(comparisonFocusTitle) => onChange({ ...value, comparisonFocusTitle })}
          />
          <TextareaField
            label="Comparison focus description"
            value={value.comparisonFocusDescription}
            onChange={(comparisonFocusDescription) =>
              onChange({ ...value, comparisonFocusDescription })
            }
          />
        </div>
      </Panel>

      <StringListEditor
        title="Comparison focus bullets"
        description="Edit the short comparison focus bullet list shown in the hero panel."
        items={value.comparisonFocusItems}
        onChange={(comparisonFocusItems) => onChange({ ...value, comparisonFocusItems })}
        addLabel="Add bullet"
        placeholder="Employee management"
      />

      <CardListEditor
        items={value.highlights}
        onChange={(highlights) => onChange({ ...value, highlights })}
        options={{
          title: "4. Hero pricing highlights",
          description: "These are the small highlight cards shown below the hero buttons.",
          itemName: "Highlight card",
          titleLabel: "Highlight title",
          descriptionLabel: "Highlight description",
          showValue: true,
          createItem: () => ({
            id: createId("pricing-highlight"),
            title: "New highlight",
            value: "Value",
            description: "Highlight description",
          }),
        }}
      />

      <SectionCopyPanel
        title="5. Pricing calculator section"
        description="Heading block above the employee count pricing calculator."
        value={value.calculatorSection}
        onChange={(calculatorSection) => onChange({ ...value, calculatorSection })}
      />

      <SectionCopyPanel
        title="6. Plan cards section heading"
        description="Heading block above the three plan cards."
        value={value.planCardsSection}
        onChange={(planCardsSection) => onChange({ ...value, planCardsSection })}
      />

      <PlanCardListEditor
        items={value.planCards}
        onChange={(planCards) => onChange({ ...value, planCards })}
      />

      <SectionCopyPanel
        title="7. Feature comparison section heading"
        description="Heading block above the plan comparison table cards."
        value={value.featureComparisonSection}
        onChange={(featureComparisonSection) => onChange({ ...value, featureComparisonSection })}
      />

      <FeatureGroupListEditor
        items={value.featureGroups}
        onChange={(featureGroups) => onChange({ ...value, featureGroups })}
      />

      <SectionCopyPanel
        title="8. Add-ons section heading"
        description="Heading block above the add-on cards."
        value={value.addOnsSection}
        onChange={(addOnsSection) => onChange({ ...value, addOnsSection })}
      />

      <CardListEditor
        items={value.addOns}
        onChange={(addOns) => onChange({ ...value, addOns })}
        options={{
          title: "9. Add-on cards",
          description: "These cards match the optional add-on cards shown near the bottom of the pricing page.",
          itemName: "Add-on card",
          titleLabel: "Add-on title",
          descriptionLabel: "Add-on description",
          noteLabel: "Pricing note",
          showHref: true,
          showCtaLabel: true,
          createItem: () => ({
            id: createId("pricing-addon"),
            title: "New add-on",
            description: "Add-on description",
            note: "Add-on note",
            href: "",
            ctaLabel: "Learn more",
          }),
        }}
      />

      <Panel
        title="10. Final CTA eyebrow"
        description="Small label shown above the final pricing call-to-action block."
      >
        <InputField
          label="CTA eyebrow"
          value={value.ctaEyebrow}
          onChange={(ctaEyebrow) => onChange({ ...value, ctaEyebrow })}
        />
      </Panel>
    </div>
  );
}

function ContactPageEditor({
  value,
  onChange,
}: {
  value: ContactPageData;
  onChange: (nextValue: ContactPageData) => void;
}) {
  return (
    <div className="space-y-4">
      <Panel
        title="1. Hero top area"
        description="These fields match the top contact hero area on the frontend."
      >
        <div className="grid gap-4">
          <InputField
            label="Hero badge"
            value={value.heroBadge}
            onChange={(heroBadge) => onChange({ ...value, heroBadge })}
          />
        </div>
      </Panel>

      <CardListEditor
        items={value.heroPaths}
        onChange={(heroPaths) => onChange({ ...value, heroPaths })}
        options={{
          title: "2. Hero quick action cards",
          description: "These are the cards shown on the right side of the contact hero section.",
          itemName: "Quick action card",
          titleLabel: "Card title",
          descriptionLabel: "Card description",
          showHref: true,
          createItem: () => ({
            id: createId("contact-path"),
            title: "New path",
            description: "Path description",
            href: "/contact",
          }),
        }}
      />

      <SectionCopyPanel
        title="3. Quick contact section heading"
        description="Heading block above the quick contact method cards."
        value={value.quickContactSection}
        onChange={(quickContactSection) => onChange({ ...value, quickContactSection })}
      />

      <CardListEditor
        items={value.quickContactMethods}
        onChange={(quickContactMethods) => onChange({ ...value, quickContactMethods })}
        options={{
          title: "4. Quick contact cards",
          description: "These cards match the quick-contact cards shown below the hero section.",
          itemName: "Contact card",
          titleLabel: "Card title",
          descriptionLabel: "Card description",
          showHref: true,
          createItem: () => ({
            id: createId("contact-method"),
            title: "New contact method",
            description: "Contact description",
            href: "/contact",
          }),
        }}
      />

      <SectionCopyPanel
        title="5. Contact form section heading"
        description="Heading block above the enquiry form."
        value={value.formSection}
        onChange={(formSection) => onChange({ ...value, formSection })}
      />

      <Panel
        title="6. Final CTA eyebrow"
        description="Small label shown above the final CTA area on the contact page."
      >
        <InputField
          label="CTA eyebrow"
          value={value.ctaEyebrow}
          onChange={(ctaEyebrow) => onChange({ ...value, ctaEyebrow })}
        />
      </Panel>
    </div>
  );
}

export function PageManagedSectionsEditor({
  slug,
  value,
  onChange,
}: PageManagedSectionsEditorProps) {
  const resolvedValue = resolveManagedPageData(slug, value);

  if (!resolvedValue) {
    return null;
  }

  if (resolvedValue.home) {
    return (
      <HomePageEditor
        value={resolvedValue.home}
        onChange={(home) => onChange({ ...resolvedValue, home })}
      />
    );
  }

  if (resolvedValue.pricing) {
    return (
      <PricingPageEditor
        value={resolvedValue.pricing}
        onChange={(pricing) => onChange({ ...resolvedValue, pricing })}
      />
    );
  }

  if (resolvedValue.contact) {
    return (
      <ContactPageEditor
        value={resolvedValue.contact}
        onChange={(contact) => onChange({ ...resolvedValue, contact })}
      />
    );
  }

  return null;
}
