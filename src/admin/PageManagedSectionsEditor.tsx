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
}: {
  value: ManagedSectionCopy;
  onChange: (nextValue: ManagedSectionCopy) => void;
}) {
  return (
    <div className="grid gap-4">
      <InputField
        label="Eyebrow"
        value={value.eyebrow}
        onChange={(eyebrow) => onChange({ ...value, eyebrow })}
      />
      <InputField
        label="Section title"
        value={value.title}
        onChange={(title) => onChange({ ...value, title })}
      />
      <TextareaField
        label="Section description"
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

  return (
    <Panel title={options.title} description={options.description}>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="rounded-2xl border border-border bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="text-sm font-semibold text-foreground">Item {index + 1}</div>
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
                label="Title"
                value={item.title}
                onChange={(title) =>
                  onChange(items.map((entry) => (entry.id === item.id ? { ...entry, title } : entry)))
                }
              />
              <TextareaField
                label="Description"
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
      <Panel title="Hero support content" description="Control the badge, subtitle, and overview block for the home hero.">
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

      <Panel title="Section copy" description="Edit headings and descriptions for the home page sections.">
        <div className="space-y-4">
          <SectionCopyEditor
            value={value.productsSection}
            onChange={(productsSection) => onChange({ ...value, productsSection })}
          />
          <SectionCopyEditor
            value={value.strengthsSection}
            onChange={(strengthsSection) => onChange({ ...value, strengthsSection })}
          />
          <SectionCopyEditor
            value={value.ecosystemSection}
            onChange={(ecosystemSection) => onChange({ ...value, ecosystemSection })}
          />
          <SectionCopyEditor
            value={value.industriesSection}
            onChange={(industriesSection) => onChange({ ...value, industriesSection })}
          />
          <SectionCopyEditor
            value={value.workflowsSection}
            onChange={(workflowsSection) => onChange({ ...value, workflowsSection })}
          />
          <SectionCopyEditor
            value={value.benefitsSection}
            onChange={(benefitsSection) => onChange({ ...value, benefitsSection })}
          />
          <SectionCopyEditor
            value={value.faqSection}
            onChange={(faqSection) => onChange({ ...value, faqSection })}
          />
          <InputField
            label="CTA eyebrow"
            value={value.ctaEyebrow}
            onChange={(ctaEyebrow) => onChange({ ...value, ctaEyebrow })}
          />
        </div>
      </Panel>

      <CardListEditor
        items={value.productCards}
        onChange={(productCards) => onChange({ ...value, productCards })}
        options={{
          title: "Product cards",
          description: "Update the product card content shown in the home page products grid.",
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

      <CardListEditor
        items={value.strengths}
        onChange={(strengths) => onChange({ ...value, strengths })}
        options={{
          title: "Strength cards",
          description: "Manage the business strength cards shown below the products section.",
          createItem: () => ({
            id: createId("home-strength"),
            title: "New strength",
            description: "Strength description",
          }),
        }}
      />

      <CardListEditor
        items={value.ecosystemCards}
        onChange={(ecosystemCards) => onChange({ ...value, ecosystemCards })}
        options={{
          title: "Ecosystem cards",
          description: "Edit the connected ecosystem labels and descriptions.",
          createItem: () => ({
            id: createId("home-ecosystem"),
            title: "New ecosystem item",
            description: "Ecosystem description",
          }),
        }}
      />

      <CardListEditor
        items={value.industries}
        onChange={(industries) => onChange({ ...value, industries })}
        options={{
          title: "Industry cards",
          description: "Add, edit, or remove industry cards on the home page.",
          createItem: () => ({
            id: createId("home-industry"),
            title: "New industry",
            description: "Industry description",
          }),
        }}
      />

      <WorkflowListEditor
        items={value.workflows}
        onChange={(workflows) => onChange({ ...value, workflows })}
      />

      <CardListEditor
        items={value.benefits}
        onChange={(benefits) => onChange({ ...value, benefits })}
        options={{
          title: "Benefit cards",
          description: "Edit the benefit cards shown above the FAQ section.",
          createItem: () => ({
            id: createId("home-benefit"),
            title: "New benefit",
            description: "Benefit description",
          }),
        }}
      />

      <FaqListEditor items={value.faqs} onChange={(faqs) => onChange({ ...value, faqs })} />
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
      <Panel title="Hero support content" description="Control the pricing badge and the comparison-focus panel in the hero area.">
        <div className="grid gap-4">
          <InputField
            label="Hero badge"
            value={value.heroBadge}
            onChange={(heroBadge) => onChange({ ...value, heroBadge })}
          />
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

      <Panel title="Section copy" description="Manage the headings and descriptions for each pricing section.">
        <div className="space-y-4">
          <SectionCopyEditor
            value={value.calculatorSection}
            onChange={(calculatorSection) => onChange({ ...value, calculatorSection })}
          />
          <SectionCopyEditor
            value={value.planCardsSection}
            onChange={(planCardsSection) => onChange({ ...value, planCardsSection })}
          />
          <SectionCopyEditor
            value={value.featureComparisonSection}
            onChange={(featureComparisonSection) => onChange({ ...value, featureComparisonSection })}
          />
          <SectionCopyEditor
            value={value.addOnsSection}
            onChange={(addOnsSection) => onChange({ ...value, addOnsSection })}
          />
          <InputField
            label="CTA eyebrow"
            value={value.ctaEyebrow}
            onChange={(ctaEyebrow) => onChange({ ...value, ctaEyebrow })}
          />
        </div>
      </Panel>

      <CardListEditor
        items={value.highlights}
        onChange={(highlights) => onChange({ ...value, highlights })}
        options={{
          title: "Pricing highlights",
          description: "Edit the small pricing summary cards shown in the hero area.",
          showValue: true,
          createItem: () => ({
            id: createId("pricing-highlight"),
            title: "New highlight",
            value: "Value",
            description: "Highlight description",
          }),
        }}
      />

      <PlanCardListEditor items={value.planCards} onChange={(planCards) => onChange({ ...value, planCards })} />

      <FeatureGroupListEditor
        items={value.featureGroups}
        onChange={(featureGroups) => onChange({ ...value, featureGroups })}
      />

      <CardListEditor
        items={value.addOns}
        onChange={(addOns) => onChange({ ...value, addOns })}
        options={{
          title: "Add-on cards",
          description: "Manage add-on titles, descriptions, notes, and optional links.",
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
      <Panel title="Hero support content" description="Manage the contact hero badge, quick links, and CTA eyebrow.">
        <div className="grid gap-4">
          <InputField
            label="Hero badge"
            value={value.heroBadge}
            onChange={(heroBadge) => onChange({ ...value, heroBadge })}
          />
          <InputField
            label="CTA eyebrow"
            value={value.ctaEyebrow}
            onChange={(ctaEyebrow) => onChange({ ...value, ctaEyebrow })}
          />
        </div>
      </Panel>

      <Panel title="Section copy" description="Control the quick-contact and form section headings and descriptions.">
        <div className="space-y-4">
          <SectionCopyEditor
            value={value.quickContactSection}
            onChange={(quickContactSection) => onChange({ ...value, quickContactSection })}
          />
          <SectionCopyEditor
            value={value.formSection}
            onChange={(formSection) => onChange({ ...value, formSection })}
          />
        </div>
      </Panel>

      <CardListEditor
        items={value.heroPaths}
        onChange={(heroPaths) => onChange({ ...value, heroPaths })}
        options={{
          title: "Hero path cards",
          description: "Edit the three quick action cards shown in the hero section.",
          showHref: true,
          createItem: () => ({
            id: createId("contact-path"),
            title: "New path",
            description: "Path description",
            href: "/contact",
          }),
        }}
      />

      <CardListEditor
        items={value.quickContactMethods}
        onChange={(quickContactMethods) => onChange({ ...value, quickContactMethods })}
        options={{
          title: "Quick contact cards",
          description: "Add, edit, or remove verified quick-contact cards.",
          showHref: true,
          createItem: () => ({
            id: createId("contact-method"),
            title: "New contact method",
            description: "Contact description",
            href: "/contact",
          }),
        }}
      />
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
