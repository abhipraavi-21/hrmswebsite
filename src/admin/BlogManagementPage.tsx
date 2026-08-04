import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLink, Plus, RefreshCw, Search, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { AdminMetricCard, AdminSection } from "@/admin/components/AdminShell";
import { useAdminStore } from "@/admin/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  createAdminBlog,
  createEmptyBlogRecord,
  deleteAdminBlog,
  fetchAdminBlogs,
  type BlogFaq,
  type BlogRecord,
  type BlogRelatedLink,
  type BlogSection,
  type BlogStatus,
  updateAdminBlog,
} from "@/lib/blogApi";
import { cn } from "@/lib/utils";

const statusOptions: BlogStatus[] = [
  "Draft",
  "In Review",
  "Approved",
  "Published",
  "Scheduled",
  "Archived",
];

const blogSectionFormSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(2, "Section title is required."),
  paragraphsText: z.string().optional(),
  bulletsText: z.string().optional(),
  tableHeaders: z.string().optional(),
  tableRows: z.string().optional(),
}).refine(
  (value) =>
    [value.paragraphsText, value.bulletsText, value.tableHeaders, value.tableRows].some((item) =>
      item?.trim(),
    ),
  {
    message: "Add paragraphs, bullets, or table data for this section.",
    path: ["paragraphsText"],
  },
);

const blogFaqFormSchema = z.object({
  q: z.string().min(2, "Question is required."),
  a: z.string().min(2, "Answer is required."),
});

const blogRelatedLinkFormSchema = z.object({
  label: z.string().min(2, "Link label is required."),
  href: z.string().min(2, "Link URL is required."),
  description: z.string().min(2, "Link description is required."),
});

const blogFormSchema = z.object({
  title: z.string().min(2, "Title is required."),
  slug: z.string().min(2, "Slug is required."),
  category: z.string().min(2, "Category is required."),
  author: z.string().min(2, "Author is required."),
  description: z.string().min(20, "Short description is required."),
  featuredImage: z.string().min(1, "Featured image URL is required."),
  featuredImageAlt: z.string().min(2, "Featured image alt text is required."),
  publishDate: z.string().min(4, "Publish date is required."),
  updatedDate: z.string().min(4, "Updated date is required."),
  readingTime: z.string().min(2, "Reading time is required."),
  tags: z.string(),
  heroSummary: z.string().min(20, "Hero summary is required."),
  heroPoints: z.string(),
  quickAnswer: z.string().min(20, "Quick answer is required."),
  keyTakeaways: z.string(),
  sections: z.array(blogSectionFormSchema).min(1, "Add at least one section."),
  faqs: z.array(blogFaqFormSchema),
  relatedLinks: z.array(blogRelatedLinkFormSchema),
  status: z.enum(["Draft", "In Review", "Approved", "Published", "Scheduled", "Archived"]),
  focusKeyword: z.string().min(2, "Focus keyword is required."),
  metaTitle: z.string().min(10, "Meta title is required."),
  metaDescription: z.string().min(30, "Meta description is required."),
  canonicalUrl: z.string().min(4, "Canonical URL is required."),
  ogTitle: z.string().min(2, "OG title is required."),
  ogDescription: z.string().min(20, "OG description is required."),
  ogImage: z.string().min(1, "OG image is required."),
  schemaType: z.string().min(2, "Schema type is required."),
  schemaEnabled: z.boolean(),
  searchIntent: z.string().min(2, "Search intent is required."),
  primaryEntity: z.string().min(2, "Primary entity is required."),
  aiSummary: z.string().min(20, "AI summary is required."),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

function getStatusTone(status: string) {
  if (status === "Published" || status === "Approved") {
    return "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300";
  }
  if (status === "In Review" || status === "Scheduled") {
    return "bg-amber-500/12 text-amber-700 dark:text-amber-300";
  }
  if (status === "Archived") {
    return "bg-rose-500/12 text-rose-700 dark:text-rose-300";
  }
  return "bg-blue-500/12 text-blue-700 dark:text-blue-300";
}

function StatusBadge({ value }: { value: string }) {
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-medium", getStatusTone(value))}>
      {value}
    </span>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium text-foreground">{label}</span>
      {children}
      {error ? <span className="text-xs text-rose-500">{error}</span> : null}
    </label>
  );
}

function createSectionId(seed?: string) {
  const safeSeed = (seed || "section")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32);

  return `${safeSeed || "section"}-${Math.random().toString(36).slice(2, 8)}`;
}

function splitLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitParagraphs(value: string) {
  return value
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitPipeRow(value: string) {
  return value
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}

function createEmptySectionFormValue() {
  return {
    id: createSectionId(),
    title: "",
    paragraphsText: "",
    bulletsText: "",
    tableHeaders: "",
    tableRows: "",
  };
}

function createSectionFormValue(section: BlogSection) {
  return {
    id: section.id || createSectionId(section.title),
    title: section.title,
    paragraphsText: section.paragraphs.join("\n\n"),
    bulletsText: section.bullets?.join("\n") ?? "",
    tableHeaders: section.table?.headers.join(" | ") ?? "",
    tableRows: section.table?.rows.map((row) => row.join(" | ")).join("\n") ?? "",
  };
}

function createSchemaPreviewType(schemaData: string) {
  try {
    const parsed = JSON.parse(schemaData) as Record<string, unknown>;
    const typeValue = parsed?.["@type"];
    if (Array.isArray(typeValue)) {
      return typeValue.join(", ");
    }
    if (typeof typeValue === "string" && typeValue.trim()) {
      return typeValue;
    }
  } catch {
    return "BlogPosting";
  }

  return "BlogPosting";
}

function blogToForm(blog: BlogRecord): BlogFormValues {
  return {
    title: blog.title,
    slug: blog.slug,
    category: blog.category,
    author: blog.author,
    description: blog.description,
    featuredImage: blog.featuredImage,
    featuredImageAlt: blog.featuredImageAlt,
    publishDate: blog.publishDate,
    updatedDate: blog.updatedDate,
    readingTime: blog.readingTime,
    tags: blog.tags.join(", "),
    heroSummary: blog.heroSummary,
    heroPoints: blog.heroPoints.join("\n"),
    quickAnswer: blog.quickAnswer,
    keyTakeaways: blog.keyTakeaways.join("\n"),
    sections: blog.sections.length ? blog.sections.map(createSectionFormValue) : [createEmptySectionFormValue()],
    faqs: blog.faqs,
    relatedLinks: blog.relatedLinks,
    status: blog.status,
    focusKeyword: blog.focusKeyword,
    metaTitle: blog.metaTitle,
    metaDescription: blog.metaDescription,
    canonicalUrl:
      blog.canonicalUrl || `http://localhost:8080/resources/blog/${blog.slug || "your-slug"}`,
    ogTitle: blog.ogTitle,
    ogDescription: blog.ogDescription,
    ogImage: blog.ogImage,
    schemaType: createSchemaPreviewType(blog.schemaData),
    schemaEnabled: blog.schemaEnabled,
    searchIntent: blog.searchIntent,
    primaryEntity: blog.primaryEntity,
    aiSummary: blog.aiSummary,
  };
}

function parseSchemaBase(schemaData?: string) {
  try {
    const parsed = schemaData ? JSON.parse(schemaData) : {};
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}

function buildSchemaData(values: BlogFormValues, existingSchemaData?: string) {
  const schemaTypes = values.schemaType
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const baseSchema = parseSchemaBase(existingSchemaData);
  const schema: Record<string, unknown> = {
    ...baseSchema,
    "@context": "https://schema.org",
    "@type": schemaTypes.length > 1 ? schemaTypes : (schemaTypes[0] ?? "BlogPosting"),
    headline: values.metaTitle || values.title,
    name: values.metaTitle || values.title,
    description: values.metaDescription || values.description,
    url: values.canonicalUrl,
    mainEntityOfPage: values.canonicalUrl,
    datePublished: values.publishDate,
    dateModified: values.updatedDate,
    articleSection: values.category,
    about: values.primaryEntity,
    abstract: values.aiSummary,
    keywords: values.tags
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .join(", "),
  };

  if (values.ogImage || values.featuredImage) {
    schema.image = values.ogImage || values.featuredImage;
  }

  if (values.author.trim()) {
    schema.author = {
      "@type": "Person",
      name: values.author.trim(),
    };
  }

  const faqEntries = values.faqs
    .filter((faq) => faq.q.trim() && faq.a.trim())
    .map((faq) => ({
      "@type": "Question",
      name: faq.q.trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a.trim(),
      },
    }));

  if (faqEntries.length) {
    schema.mainEntity = faqEntries;
  }

  return JSON.stringify(schema, null, 2);
}

function formToPayload(values: BlogFormValues, existingSchemaData?: string) {
  return {
    title: values.title,
    slug: values.slug,
    category: values.category,
    author: values.author,
    description: values.description,
    featuredImage: values.featuredImage,
    featuredImageAlt: values.featuredImageAlt,
    publishDate: values.publishDate,
    updatedDate: values.updatedDate,
    readingTime: values.readingTime,
    tags: values.tags
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    heroSummary: values.heroSummary,
    heroPoints: values.heroPoints
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
    quickAnswer: values.quickAnswer,
    keyTakeaways: values.keyTakeaways
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
    sections: values.sections.map((section) => {
      const tableHeaders = splitPipeRow(section.tableHeaders || "");
      const tableRows = splitLines(section.tableRows || "").map(splitPipeRow);
      const hasTable = tableHeaders.length > 0 || tableRows.length > 0;

      return {
        id: section.id || createSectionId(section.title),
        title: section.title,
        paragraphs: splitParagraphs(section.paragraphsText || ""),
        bullets: splitLines(section.bulletsText || ""),
        table: hasTable
          ? {
              headers: tableHeaders,
              rows: tableRows,
            }
          : undefined,
      };
    }),
    faqs: values.faqs
      .filter((faq) => faq.q.trim() || faq.a.trim())
      .map((faq) => ({
        q: faq.q.trim(),
        a: faq.a.trim(),
      })),
    relatedLinks: values.relatedLinks
      .filter((link) => link.label.trim() || link.href.trim() || link.description.trim())
      .map((link) => ({
        label: link.label.trim(),
        href: link.href.trim(),
        description: link.description.trim(),
      })),
    status: values.status,
    focusKeyword: values.focusKeyword,
    metaTitle: values.metaTitle,
    metaDescription: values.metaDescription,
    canonicalUrl: values.canonicalUrl,
    ogTitle: values.ogTitle,
    ogDescription: values.ogDescription,
    ogImage: values.ogImage,
    schemaData: buildSchemaData(values, existingSchemaData),
    schemaEnabled: values.schemaEnabled,
    searchIntent: values.searchIntent,
    primaryEntity: values.primaryEntity,
    aiSummary: values.aiSummary,
  };
}

export default function AdminBlogManagementPage() {
  const { sessionUser } = useAdminStore();
  const [blogs, setBlogs] = useState<BlogRecord[]>([]);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof blogFormSchema>>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: blogToForm(createEmptyBlogRecord()),
  });
  const sectionsFieldArray = useFieldArray({
    control: form.control,
    name: "sections",
    keyName: "fieldKey",
  });
  const faqsFieldArray = useFieldArray({
    control: form.control,
    name: "faqs",
    keyName: "fieldKey",
  });
  const relatedLinksFieldArray = useFieldArray({
    control: form.control,
    name: "relatedLinks",
    keyName: "fieldKey",
  });

  const selectedBlog = useMemo(() => {
    if (isCreatingNew) {
      return createEmptyBlogRecord();
    }

    return blogs.find((blog) => blog.id === selectedId) ?? blogs[0] ?? createEmptyBlogRecord();
  }, [blogs, isCreatingNew, selectedId]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) =>
      `${blog.title} ${blog.category} ${blog.author} ${blog.slug}`.toLowerCase().includes(query.toLowerCase()),
    );
  }, [blogs, query]);

  async function loadBlogs() {
    if (!sessionUser) {
      return;
    }

    setIsLoading(true);
    try {
      const nextBlogs = await fetchAdminBlogs(sessionUser.role);
      setBlogs(nextBlogs);
      setSelectedId((current) => current ?? nextBlogs[0]?.id ?? null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to load blogs.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadBlogs();
  }, [sessionUser]);

  useEffect(() => {
    form.reset(blogToForm(selectedBlog));
  }, [form, selectedBlog]);

  const publishedCount = blogs.filter((blog) => blog.status === "Published").length;
  const draftCount = blogs.filter(
    (blog) => blog.status === "Draft" || blog.status === "In Review",
  ).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard title="Total blogs" value={blogs.length} meta={`${publishedCount} published`} />
        <AdminMetricCard title="Draft or review" value={draftCount} meta="Needs editorial action" accent="amber" />
        <AdminMetricCard
          title="SEO ready"
          value={blogs.filter((blog) => blog.metaTitle && blog.metaDescription && blog.schemaEnabled).length}
          meta="Meta and schema configured"
          accent="green"
        />
        <AdminMetricCard title="Authors" value={new Set(blogs.map((blog) => blog.author)).size} meta="Unique contributors" accent="blue" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <AdminSection
          title="Blog records"
          description="Create, edit, publish, or delete MySQL-backed blog posts from this panel."
          actions={
            <div className="flex flex-wrap gap-2">
              <div className="relative min-w-[220px]">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="h-10 rounded-xl pl-9"
                  placeholder="Search blog records"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={() => {
                  setIsCreatingNew(true);
                  setSelectedId(null);
                  form.reset(blogToForm(createEmptyBlogRecord()));
                }}
              >
                <Plus className="h-4 w-4" />
                New blog
              </Button>
              <Button type="button" variant="outline" className="rounded-xl" onClick={loadBlogs}>
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          }
        >
          {isLoading ? (
            <div className="rounded-[24px] border border-dashed border-border px-6 py-12 text-center text-sm text-muted-foreground">
              Loading blog data from MySQL...
            </div>
          ) : filteredBlogs.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBlogs.map((blog) => (
                  <TableRow
                    key={blog.id}
                    className="cursor-pointer"
                    onClick={() => {
                      setIsCreatingNew(false);
                      setSelectedId(blog.id ?? null);
                    }}
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{blog.title}</p>
                        <p className="text-xs text-muted-foreground">{blog.slug}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge value={blog.status} />
                    </TableCell>
                    <TableCell>{blog.author}</TableCell>
                    <TableCell>{blog.publishDate || blog.updatedDate.slice(0, 10)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="rounded-[24px] border border-dashed border-border px-6 py-12 text-center text-sm text-muted-foreground">
              No blogs found for this search.
            </div>
          )}
        </AdminSection>

        <AdminSection
          title={isCreatingNew ? "Create blog" : `Edit ${selectedBlog.title || "blog"}`}
          description="These fields map directly to the public blog listing, article page, and SEO metadata."
          actions={
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={() => {
                  const slug = form.getValues("slug");
                  if (!slug) {
                    toast.error("Save a slug first so preview has a route.");
                    return;
                  }
                  window.open(`/resources/blog/${slug}`, "_blank", "noopener,noreferrer");
                }}
              >
                <ExternalLink className="h-4 w-4" />
                Preview
              </Button>
              {!isCreatingNew && selectedBlog.id ? (
                <Button
                  type="button"
                  variant="destructive"
                  className="rounded-xl"
                  onClick={async () => {
                    if (!sessionUser || !selectedBlog.id) {
                      return;
                    }

                    if (!window.confirm(`Delete "${selectedBlog.title}"?`)) {
                      return;
                    }

                    try {
                      await deleteAdminBlog(sessionUser.role, selectedBlog.id);
                      toast.success("Blog deleted.");
                      setIsCreatingNew(false);
                      setSelectedId(null);
                      await loadBlogs();
                    } catch (error) {
                      toast.error(error instanceof Error ? error.message : "Unable to delete blog.");
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              ) : null}
            </div>
          }
        >
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit(async (values) => {
              if (!sessionUser) {
                return;
              }

              try {
                const payload = formToPayload(values, selectedBlog.schemaData);
                if (isCreatingNew || !selectedBlog.id) {
                  const created = await createAdminBlog(sessionUser.role, payload);
                  toast.success("Blog created.");
                  setIsCreatingNew(false);
                  setSelectedId(created.id ?? null);
                } else {
                  const updated = await updateAdminBlog(sessionUser.role, selectedBlog.id, payload);
                  toast.success("Blog updated.");
                  setSelectedId(updated.id ?? null);
                }

                await loadBlogs();
              } catch (error) {
                toast.error(error instanceof Error ? error.message : "Unable to save blog.");
              }
            })}
          >
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge value={form.watch("status")} />
              {selectedBlog.publishDate ? <StatusBadge value={selectedBlog.publishDate} /> : null}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Blog title" error={form.formState.errors.title?.message}>
                <Input {...form.register("title")} className="rounded-xl" />
              </Field>
              <Field label="URL slug" error={form.formState.errors.slug?.message}>
                <Input {...form.register("slug")} className="rounded-xl" placeholder="what-is-hrms" />
              </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Category" error={form.formState.errors.category?.message}>
                <Input {...form.register("category")} className="rounded-xl" />
              </Field>
              <Field label="Author" error={form.formState.errors.author?.message}>
                <Input {...form.register("author")} className="rounded-xl" />
              </Field>
            </div>

            <Field label="Short description" error={form.formState.errors.description?.message}>
              <Textarea {...form.register("description")} rows={4} className="rounded-2xl" />
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Featured image URL" error={form.formState.errors.featuredImage?.message}>
                <Input {...form.register("featuredImage")} className="rounded-xl" placeholder="/blog/cover.svg" />
              </Field>
              <Field label="Featured image alt text" error={form.formState.errors.featuredImageAlt?.message}>
                <Input {...form.register("featuredImageAlt")} className="rounded-xl" />
              </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Field label="Publish date" error={form.formState.errors.publishDate?.message}>
                <Input {...form.register("publishDate")} className="rounded-xl" placeholder="2026-08-04" />
              </Field>
              <Field label="Updated date" error={form.formState.errors.updatedDate?.message}>
                <Input {...form.register("updatedDate")} className="rounded-xl" placeholder="2026-08-04 12:30:00" />
              </Field>
              <Field label="Reading time" error={form.formState.errors.readingTime?.message}>
                <Input {...form.register("readingTime")} className="rounded-xl" placeholder="5 min read" />
              </Field>
              <Field label="Status" error={form.formState.errors.status?.message}>
                <select
                  {...form.register("status")}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Tags (comma separated)" error={form.formState.errors.tags?.message}>
              <Input {...form.register("tags")} className="rounded-xl" />
            </Field>

            <Field label="Hero summary" error={form.formState.errors.heroSummary?.message}>
              <Textarea {...form.register("heroSummary")} rows={4} className="rounded-2xl" />
            </Field>

            <Field label="Hero points (one per line)" error={form.formState.errors.heroPoints?.message}>
              <Textarea {...form.register("heroPoints")} rows={4} className="rounded-2xl" />
            </Field>

            <Field label="Quick answer" error={form.formState.errors.quickAnswer?.message}>
              <Textarea {...form.register("quickAnswer")} rows={4} className="rounded-2xl" />
            </Field>

            <Field label="Key takeaways (one per line)" error={form.formState.errors.keyTakeaways?.message}>
              <Textarea {...form.register("keyTakeaways")} rows={4} className="rounded-2xl" />
            </Field>

            <div className="rounded-[24px] border border-border/70 bg-muted/20 p-4">
              <p className="text-sm font-semibold text-foreground">Main content and supporting blocks</p>
              <div className="mt-4 grid gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-foreground">Sections</p>
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-xl"
                      onClick={() => sectionsFieldArray.append(createEmptySectionFormValue())}
                    >
                      <Plus className="h-4 w-4" />
                      Add section
                    </Button>
                  </div>
                  {typeof form.formState.errors.sections?.message === "string" ? (
                    <p className="text-xs text-rose-500">{form.formState.errors.sections.message}</p>
                  ) : null}
                  <div className="space-y-4">
                    {sectionsFieldArray.fields.map((field, index) => (
                      <div key={field.fieldKey} className="rounded-[24px] border border-border/70 bg-background p-4">
                        <input type="hidden" {...form.register(`sections.${index}.id`)} />
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-foreground">Section {index + 1}</p>
                          <Button
                            type="button"
                            variant="ghost"
                            className="rounded-xl text-rose-500 hover:text-rose-600"
                            onClick={() => sectionsFieldArray.remove(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                        <div className="mt-4 grid gap-4">
                          <Field label="Section title" error={form.formState.errors.sections?.[index]?.title?.message}>
                            <Input {...form.register(`sections.${index}.title`)} className="rounded-xl" />
                          </Field>
                          <Field
                            label="Paragraphs"
                            error={form.formState.errors.sections?.[index]?.paragraphsText?.message}
                          >
                            <Textarea
                              {...form.register(`sections.${index}.paragraphsText`)}
                              rows={6}
                              className="rounded-2xl"
                              placeholder="Separate paragraphs with a blank line."
                            />
                          </Field>
                          <Field label="Bullet points" error={form.formState.errors.sections?.[index]?.bulletsText?.message}>
                            <Textarea
                              {...form.register(`sections.${index}.bulletsText`)}
                              rows={4}
                              className="rounded-2xl"
                              placeholder="One bullet per line"
                            />
                          </Field>
                          <div className="grid gap-4 md:grid-cols-2">
                            <Field label="Table headers" error={form.formState.errors.sections?.[index]?.tableHeaders?.message}>
                              <Input
                                {...form.register(`sections.${index}.tableHeaders`)}
                                className="rounded-xl"
                                placeholder="Column 1 | Column 2 | Column 3"
                              />
                            </Field>
                            <Field label="Table rows" error={form.formState.errors.sections?.[index]?.tableRows?.message}>
                              <Textarea
                                {...form.register(`sections.${index}.tableRows`)}
                                rows={4}
                                className="rounded-2xl"
                                placeholder="One row per line, columns separated with |"
                              />
                            </Field>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-foreground">FAQs</p>
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-xl"
                      onClick={() => faqsFieldArray.append({ q: "", a: "" })}
                    >
                      <Plus className="h-4 w-4" />
                      Add FAQ
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {faqsFieldArray.fields.length ? (
                      faqsFieldArray.fields.map((field, index) => (
                        <div key={field.fieldKey} className="rounded-[24px] border border-border/70 bg-background p-4">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-semibold text-foreground">FAQ {index + 1}</p>
                            <Button
                              type="button"
                              variant="ghost"
                              className="rounded-xl text-rose-500 hover:text-rose-600"
                              onClick={() => faqsFieldArray.remove(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                              Remove
                            </Button>
                          </div>
                          <div className="mt-4 grid gap-4">
                            <Field label="Question" error={form.formState.errors.faqs?.[index]?.q?.message}>
                              <Input {...form.register(`faqs.${index}.q`)} className="rounded-xl" />
                            </Field>
                            <Field label="Answer" error={form.formState.errors.faqs?.[index]?.a?.message}>
                              <Textarea {...form.register(`faqs.${index}.a`)} rows={4} className="rounded-2xl" />
                            </Field>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-[20px] border border-dashed border-border px-4 py-5 text-sm text-muted-foreground">
                        No FAQs yet. Use “Add FAQ” when this article needs question-answer content.
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-foreground">Related links</p>
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-xl"
                      onClick={() => relatedLinksFieldArray.append({ label: "", href: "", description: "" })}
                    >
                      <Plus className="h-4 w-4" />
                      Add link
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {relatedLinksFieldArray.fields.length ? (
                      relatedLinksFieldArray.fields.map((field, index) => (
                        <div key={field.fieldKey} className="rounded-[24px] border border-border/70 bg-background p-4">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-semibold text-foreground">Link {index + 1}</p>
                            <Button
                              type="button"
                              variant="ghost"
                              className="rounded-xl text-rose-500 hover:text-rose-600"
                              onClick={() => relatedLinksFieldArray.remove(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                              Remove
                            </Button>
                          </div>
                          <div className="mt-4 grid gap-4">
                            <div className="grid gap-4 md:grid-cols-2">
                              <Field label="Link label" error={form.formState.errors.relatedLinks?.[index]?.label?.message}>
                                <Input {...form.register(`relatedLinks.${index}.label`)} className="rounded-xl" />
                              </Field>
                              <Field label="URL" error={form.formState.errors.relatedLinks?.[index]?.href?.message}>
                                <Input
                                  {...form.register(`relatedLinks.${index}.href`)}
                                  className="rounded-xl"
                                  placeholder="/resources/blog/your-link"
                                />
                              </Field>
                            </div>
                            <Field
                              label="Short description"
                              error={form.formState.errors.relatedLinks?.[index]?.description?.message}
                            >
                              <Textarea
                                {...form.register(`relatedLinks.${index}.description`)}
                                rows={3}
                                className="rounded-2xl"
                              />
                            </Field>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-[20px] border border-dashed border-border px-4 py-5 text-sm text-muted-foreground">
                        No related links yet. Add internal links here when you want article cross-linking.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-border/70 bg-muted/20 p-4">
              <p className="text-sm font-semibold text-foreground">SEO fields</p>
              <div className="mt-4 grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Focus keyword" error={form.formState.errors.focusKeyword?.message}>
                    <Input {...form.register("focusKeyword")} className="rounded-xl" />
                  </Field>
                  <Field label="Meta title" error={form.formState.errors.metaTitle?.message}>
                    <Input {...form.register("metaTitle")} className="rounded-xl" />
                  </Field>
                </div>
                <Field label="Meta description" error={form.formState.errors.metaDescription?.message}>
                  <Textarea {...form.register("metaDescription")} rows={4} className="rounded-2xl" />
                </Field>
                <Field label="Canonical URL" error={form.formState.errors.canonicalUrl?.message}>
                  <Input {...form.register("canonicalUrl")} className="rounded-xl" />
                </Field>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Open Graph title" error={form.formState.errors.ogTitle?.message}>
                    <Input {...form.register("ogTitle")} className="rounded-xl" />
                  </Field>
                  <Field label="Open Graph image" error={form.formState.errors.ogImage?.message}>
                    <Input {...form.register("ogImage")} className="rounded-xl" />
                  </Field>
                </div>
                <Field label="Open Graph description" error={form.formState.errors.ogDescription?.message}>
                  <Textarea {...form.register("ogDescription")} rows={4} className="rounded-2xl" />
                </Field>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Search intent" error={form.formState.errors.searchIntent?.message}>
                    <Input {...form.register("searchIntent")} className="rounded-xl" />
                  </Field>
                  <Field label="Primary entity" error={form.formState.errors.primaryEntity?.message}>
                    <Input {...form.register("primaryEntity")} className="rounded-xl" />
                  </Field>
                </div>
                <Field label="AI summary" error={form.formState.errors.aiSummary?.message}>
                  <Textarea {...form.register("aiSummary")} rows={4} className="rounded-2xl" />
                </Field>
                <Field label="Schema type" error={form.formState.errors.schemaType?.message}>
                  <Input
                    {...form.register("schemaType")}
                    className="rounded-xl"
                    placeholder="BlogPosting"
                  />
                </Field>
                <div className="rounded-[20px] border border-dashed border-border bg-background/80 px-4 py-4 text-sm text-muted-foreground">
                  Schema JSON-LD is generated automatically from the SEO fields, author, dates, and FAQs when this blog is saved.
                </div>
                <label className="flex items-center justify-between rounded-2xl border border-border/70 px-4 py-3 text-sm">
                  Schema enabled
                  <input type="checkbox" {...form.register("schemaEnabled")} className="h-4 w-4 rounded border-border" />
                </label>
              </div>
            </div>

            <Button type="submit" className="rounded-xl">
              {isCreatingNew ? "Create blog" : "Save blog changes"}
            </Button>
          </form>
        </AdminSection>
      </div>
    </div>
  );
}
