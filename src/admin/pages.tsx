import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { z } from "zod";
import {
  AlertCircle,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Copy,
  ExternalLink,
  Filter,
  FolderKanban,
  Globe2,
  ImagePlus,
  Link2,
  MailCheck,
  Plus,
  Search,
  Send,
  Sparkles,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { adminDemoPassword, adminHeroChecklist } from "@/admin/config";
import { AdminMetricCard, AdminSection } from "@/admin/components/AdminShell";
import { useAdminStore, useAverageSeoScore, useContentByType } from "@/admin/store";
import {
  PageManagedSectionsEditor,
  resolveManagedPageData,
  supportsManagedPageEditor,
} from "@/admin/PageManagedSectionsEditor";
import type {
  AdminStore,
  ContentRecord,
  ContentType,
  LeadRecord,
  NewsletterSubscriber,
  RedirectRecord,
  SeoRecord,
  SubscriberStatus,
  WorkflowStatus,
} from "@/admin/types";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/routes/routeConfig.js";

const workflowStatuses: WorkflowStatus[] = [
  "Draft",
  "In Review",
  "Approved",
  "Published",
  "Scheduled",
  "Archived",
];

const leadStatuses = [
  "New",
  "Contacted",
  "Qualified",
  "Demo scheduled",
  "Converted",
  "Not interested",
  "Closed",
] as const;

const subscriberStatuses = ["Active", "Unsubscribed", "Bounced", "Blocked"] as const;

const seoFormSchema = z.object({
  seoTitle: z.string().min(30, "Aim for at least 30 characters.").max(70, "Keep under 70 characters."),
  metaTitle: z.string().min(20, "Meta title is too short.").max(70, "Meta title is too long."),
  metaDescription: z
    .string()
    .min(80, "Meta description is too short.")
    .max(180, "Meta description is too long."),
  slug: z.string().min(1, "Slug is required."),
  canonicalUrl: z.string().url("Canonical URL must be valid."),
  focusKeyword: z.string().min(2, "Focus keyword is required."),
  publishDate: z.string(),
  readingTime: z.string(),
  secondaryKeywords: z.string(),
  longTailKeywords: z.string(),
  semanticKeywords: z.string(),
  lsiKeywords: z.string(),
  nlpKeywords: z.string(),
  relatedEntities: z.string(),
  peopleAlsoAsk: z.string(),
  relatedSearches: z.string(),
  author: z.string().min(2, "Author is required."),
  robots: z.enum(["index, follow", "noindex, follow", "index, nofollow", "noindex, nofollow"]),
  ogTitle: z.string().min(10).max(70),
  ogDescription: z.string().min(30).max(160),
  ogImage: z.union([z.literal(""), z.string().url("Open Graph image must be a valid URL.")]),
  twitterTitle: z.string().min(10).max(70),
  twitterDescription: z.string().min(30).max(160),
  twitterImage: z.union([z.literal(""), z.string().url("Twitter image must be a valid URL.")]),
  linkedInTitle: z.string(),
  linkedInDescription: z.string(),
  linkedInImage: z.union([z.literal(""), z.string().url("LinkedIn image must be a valid URL.")]),
  whatsAppTitle: z.string(),
  whatsAppDescription: z.string(),
  whatsAppImage: z.union([z.literal(""), z.string().url("WhatsApp image must be a valid URL.")]),
  schemaTypes: z.string(),
  schemaEnabled: z.boolean().default(true),
  schemaJson: z.string().min(2, "Schema JSON-LD is required."),
  searchIntent: z.string().min(2, "Search intent is required."),
  contentIntent: z.string().min(2, "Content intent is required."),
  primaryEntity: z.string().min(2, "Primary entity is required."),
  aiSummary: z.string().min(20, "Add a short AI summary."),
  aiOverview: z.string(),
  chatgptSummary: z.string(),
  geminiSummary: z.string(),
  topicClusters: z.string(),
  difficultyLevel: z.string(),
  relatedLearn: z.string(),
  relatedBlog: z.string(),
  relatedFaq: z.string(),
  relatedProduct: z.string(),
  internalLinks: z.string(),
  downloadAssetUrl: z.union([z.literal(""), z.string().url("Download asset URL must be a valid URL.")]),
  downloadPdfUrl: z.union([z.literal(""), z.string().url("Download PDF URL must be a valid URL.")]),
  videoSupportUrl: z.union([z.literal(""), z.string().url("Video support URL must be a valid URL.")]),
  applicableRegion: z.string(),
  lawType: z.string(),
  versionLabel: z.string(),
  faqCategory: z.string(),
  faqTags: z.string(),
  searchOptionEnabled: z.boolean().default(true),
  accordionEnabled: z.boolean().default(true),
  heroSeoNotes: z.string(),
  featureSectionSeo: z.string(),
  bookDemoCtaLabel: z.string(),
  performanceNotes: z.string(),
  pricingKeywords: z.string(),
  comparisonTableHighlights: z.string(),
  conversionTrackingNotes: z.string(),
  readabilityScore: z.coerce.number().min(0).max(100),
  keywordDensity: z.string(),
  headingOutline: z.string(),
  tocEnabled: z.boolean().default(true),
  wordCount: z.coerce.number().min(0),
  imageCount: z.coerce.number().min(0),
  videoCount: z.coerce.number().min(0),
  tableCount: z.coerce.number().min(0),
  faqCount: z.coerce.number().min(0),
  internalLinkCount: z.coerce.number().min(0),
  externalLinkCount: z.coerce.number().min(0),
  brokenLinkCount: z.coerce.number().min(0),
  webpReady: z.boolean().default(false),
  ctaModes: z.string(),
  views: z.coerce.number().min(0),
  ctr: z.string(),
  avgTimeOnPage: z.string(),
  scrollDepth: z.string(),
  demoConversions: z.coerce.number().min(0),
});

const contentFormSchema = z.object({
  title: z.string().min(2, "Title is required."),
  slug: z.string().min(1, "Slug is required."),
  category: z.string(),
  author: z.string(),
  summary: z.string().min(20, "Summary should explain the page clearly."),
  focusKeyword: z.string().min(2, "Focus keyword is required."),
  owner: z.string().min(2, "Owner is required."),
  readingTime: z.string().min(2, "Reading time is required."),
  sections: z.coerce.number().min(1, "At least one section is required."),
  seoScore: z.coerce.number().min(0).max(100),
  trafficShare: z.coerce.number().min(0).max(100),
  status: z.enum(["Draft", "In Review", "Approved", "Published", "Scheduled", "Archived"]),
  publishedAt: z.string(),
  tags: z.string(),
  featuredImage: z.union([z.literal(""), z.string().url("Featured image must be a valid URL.")]),
  featuredImageAlt: z.string(),
  heroTitle: z.string(),
  heroDescription: z.string(),
  ctaTitle: z.string(),
  ctaDescription: z.string(),
  ctaButtonText: z.string(),
  ctaButtonUrl: z.union([z.literal(""), z.string().url("CTA button URL must be valid.")]),
});

const loginSchema = z.object({
  email: z.string().email("Enter a valid work email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  remember: z.boolean().default(true),
});

const redirectSchema = z.object({
  sourceUrl: z.string().min(1, "Source URL is required."),
  destinationUrl: z.string().min(1, "Destination URL is required."),
  type: z.enum(["301", "302"]),
});

const mediaFormSchema = z.object({
  altText: z.string().min(2, "Alt text is required."),
  title: z.string().min(2, "Title is required."),
  caption: z.string().min(2, "Caption is required."),
  description: z.string().min(2, "Description is required."),
  usage: z.string().min(2, "Usage is required."),
});

type SeoEditorValues = z.infer<typeof seoFormSchema>;

const settingsSchema = z.object({
  companyName: z.string().min(2),
  supportEmail: z.string().email(),
  salesEmail: z.string().email(),
  defaultMetaDescription: z.string().min(70).max(180),
  canonicalBaseUrl: z.string().url(),
  autoSave: z.boolean().default(false),
  darkModeDefault: z.boolean().default(false),
});

function useUnsavedChangesWarning(enabled: boolean) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [enabled]);
}

function getStatusTone(status: string) {
  if (status === "Published" || status === "Connected" || status === "Qualified" || status === "Converted" || status === "Active") {
    return "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300";
  }
  if (status === "In Review" || status === "Scheduled" || status === "Demo scheduled") {
    return "bg-amber-500/12 text-amber-700 dark:text-amber-300";
  }
  if (status === "Archived" || status === "Disabled" || status === "Error" || status === "Blocked") {
    return "bg-rose-500/12 text-rose-700 dark:text-rose-300";
  }
  return "bg-blue-500/12 text-blue-700 dark:text-blue-300";
}

function StatusBadge({ value }: { value: string }) {
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-medium", getStatusTone(value))}>{value}</span>;
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[24px] border border-dashed border-border px-6 py-12 text-center">
      <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-muted text-muted-foreground">
        <FolderKanban className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export function AdminLoginPage() {
  const navigate = useNavigate();
  const { login, store } = useAdminStore();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@altrozhr.com",
      password: adminDemoPassword,
      remember: true,
    },
  });

  return (
    <div className="grid min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(11,92,255,0.14),transparent_24%),linear-gradient(180deg,#f8fbff_0%,#eef3fb_100%)] px-4 py-8 dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_20%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.2fr_0.95fr]">
        <div className="rounded-[36px] border border-white/60 bg-white/85 p-8 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Altroz HRMS admin
          </span>
          <h1 className="mt-5 max-w-xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Build and manage the public HRMS frontend from one control panel.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
            This admin workspace is now wired into the same Vite frontend, so we can shape page content,
            SEO metadata, campaigns, leads, and technical SEO operations without splitting the visual system.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {adminHeroChecklist.map((item) => (
              <div key={item} className="rounded-[24px] border border-border/70 bg-background/80 p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="text-sm leading-7 text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[36px] border border-white/60 bg-white/90 p-8 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Sign in</h2>
              <p className="mt-1 text-sm text-muted-foreground">Use the single admin account to manage the full frontend and SEO workspace.</p>
            </div>
            <div className="rounded-2xl bg-emerald-500/10 px-3 py-2 text-right text-xs font-medium text-emerald-700 dark:text-emerald-300">
              Demo password
              <div className="text-sm text-foreground">{adminDemoPassword}</div>
            </div>
          </div>

          <form
            className="mt-8 space-y-4"
            onSubmit={form.handleSubmit(async (values) => {
              const success = await login(values.email, values.password, values.remember);
              if (success) {
                navigate(ROUTES.adminDashboard);
              }
            })}
          >
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foreground">Work email</span>
              <Input {...form.register("email")} className="h-12 rounded-2xl" />
              <FormError message={form.formState.errors.email?.message} />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foreground">Password</span>
              <Input type="password" {...form.register("password")} className="h-12 rounded-2xl" />
              <FormError message={form.formState.errors.password?.message} />
            </label>

            <label className="flex items-center gap-3 rounded-2xl border border-border/70 px-4 py-3 text-sm">
              <input type="checkbox" {...form.register("remember")} className="h-4 w-4 rounded border-border" />
              Keep this session signed in on this device
            </label>

            <Button type="submit" className="h-12 w-full rounded-2xl text-sm" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Signing in..." : "Open admin panel"}
            </Button>
          </form>

          <div className="mt-8 rounded-[24px] border border-border/70 bg-muted/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Admin account</p>
            <div className="mt-3 space-y-2">
              {store.users.slice(0, 1).map((user) => (
                <div key={user.id} className="flex items-center justify-between rounded-2xl bg-background/80 px-3 py-2 text-sm">
                  <span>
                    <span className="font-medium text-foreground">{user.name}</span>
                    <span className="ml-2 text-muted-foreground">{user.email}</span>
                  </span>
                  <StatusBadge value={user.role} />
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              This single login has full access to pages, SEO, blogs, learn resources, compliance guides, FAQs, media, leads, technical SEO, integrations, and settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminDashboardPage() {
  const { counts, sessionUser, store } = useAdminStore();
  const averageSeoScore = useAverageSeoScore();

  if (sessionUser?.role === "Client Admin") {
    return <ClientAdminDashboard store={store} averageSeoScore={averageSeoScore} />;
  }

  const publishedContent = store.content.filter((item) => item.status === "Published").length;
  const draftContent = store.content.filter((item) => item.status === "Draft").length;
  const missingSchema = store.seo.filter((item) => !item.schemaTypes.length).length;
  const technicalIssues = store.brokenLinks.filter((item) => item.fixStatus !== "Resolved").length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard title="Content inventory" value={store.content.length} meta={`${publishedContent} published / ${draftContent} drafts`} />
        <AdminMetricCard title="Overall SEO score" value={`${averageSeoScore}/100`} meta={`${missingSchema} pages missing schema coverage`} accent="green" />
        <AdminMetricCard title="Open lead queue" value={counts.demoRequests + counts.contactEnquiries} meta={`${counts.demoRequests} demos and ${counts.contactEnquiries} contacts`} accent="amber" />
        <AdminMetricCard title="Technical SEO issues" value={technicalIssues} meta={`${store.redirects.filter((item) => !item.active).length} inactive redirects`} accent="rose" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <AdminSection
          title="Demand and publishing trend"
          description="Demo requests, organic traffic, and publishing velocity pulled from the admin store."
        >
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={store.analytics}>
                <defs>
                  <linearGradient id="trafficFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#0b5cff" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#0b5cff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.22)" />
                <XAxis dataKey="month" stroke="currentColor" tick={{ fill: "currentColor", opacity: 0.65 }} />
                <YAxis yAxisId="left" stroke="currentColor" tick={{ fill: "currentColor", opacity: 0.65 }} />
                <YAxis yAxisId="right" orientation="right" stroke="currentColor" tick={{ fill: "currentColor", opacity: 0.65 }} />
                <Tooltip />
                <Area yAxisId="left" type="monotone" dataKey="organicTraffic" stroke="#0b5cff" fill="url(#trafficFill)" strokeWidth={3} />
                <Bar yAxisId="right" dataKey="demoRequests" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={32} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </AdminSection>

        <AdminSection title="Device distribution" description="Traffic split for recent public-site sessions.">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={store.devices}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={72}
                  outerRadius={108}
                  paddingAngle={4}
                >
                  {store.devices.map((entry, index) => (
                    <Cell key={entry.name} fill={["#0b5cff", "#10b981", "#f59e0b"][index % 3]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {store.devices.map((device) => (
              <div key={device.name} className="rounded-2xl border border-border/70 bg-muted/30 p-4 text-center">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{device.name}</p>
                <p className="mt-2 text-2xl font-semibold">{device.value}%</p>
              </div>
            ))}
          </div>
        </AdminSection>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AdminSection title="Top performing pages" description="High-intent pages ranked by sessions and conversions.">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page</TableHead>
                <TableHead>Visits</TableHead>
                <TableHead>Conversions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {store.topPages.map((page) => (
                <TableRow key={page.title}>
                  <TableCell className="font-medium">{page.title}</TableCell>
                  <TableCell>{page.visits.toLocaleString()}</TableCell>
                  <TableCell>{page.conversions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AdminSection>

        <AdminSection title="Recent admin activity" description="Latest changes across content, SEO, and lead operations.">
          <div className="space-y-3">
            {store.activities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="rounded-2xl border border-border/70 bg-muted/25 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {activity.user} · {activity.action}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                  <StatusBadge value={activity.module} />
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">{activity.dateTime}</p>
              </div>
            ))}
          </div>
        </AdminSection>
      </div>
    </div>
  );
}

function ClientAdminDashboard({
  store,
  averageSeoScore,
}: {
  store: AdminStore;
  averageSeoScore: number;
}) {
  const blogs = store.content.filter((item) => item.type === "Blog");
  const faqs = store.content.filter((item) => item.type === "FAQ");
  const learnResources = store.content.filter((item) => item.type === "Learn Resource");
  const complianceGuides = store.content.filter((item) => item.type === "Compliance Guide");
  const publishedBlogs = blogs.filter((item) => item.status === "Published").length;
  const draftBlogs = blogs.filter(
    (item) => item.status === "Draft" || item.status === "In Review",
  ).length;
  const activeFaqs = faqs.filter(
    (item) => item.status === "Published" || item.status === "Approved",
  ).length;
  const recentlyUpdated = [...store.content]
    .filter((item) => item.type !== "Page")
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
    .slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <AdminMetricCard
          title="Total blogs"
          value={blogs.length}
          meta={`${publishedBlogs} published / ${draftBlogs} in draft or review`}
        />
        <AdminMetricCard
          title="Total FAQs"
          value={faqs.length}
          meta={`${activeFaqs} active on the public site`}
          accent="green"
        />
        <AdminMetricCard
          title="Learn resources"
          value={learnResources.length}
          meta="Editable resource content"
          accent="amber"
        />
        <AdminMetricCard
          title="Compliance guides"
          value={complianceGuides.length}
          meta="Guides and updates"
          accent="rose"
        />
        <AdminMetricCard
          title="SEO average"
          value={`${averageSeoScore}/100`}
          meta={`${store.seo.length} editable SEO records`}
          accent="green"
        />
        <AdminMetricCard
          title="Recent activities"
          value={store.activities.length}
          meta="Client admin activity feed"
          accent="blue"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <AdminSection
          title="Recently updated content"
          description="The latest editable items across blogs, FAQs, learn resources, and compliance guides."
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentlyUpdated.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>
                    <StatusBadge value={item.status} />
                  </TableCell>
                  <TableCell>{item.updatedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AdminSection>

        <AdminSection
          title="Editorial snapshot"
          description="A quick view of how content is distributed in the client workspace."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <DetailChip label="Published blogs" value={`${publishedBlogs}`} />
            <DetailChip label="Draft blogs" value={`${draftBlogs}`} />
            <DetailChip label="Active FAQs" value={`${activeFaqs}`} />
            <DetailChip label="SEO records" value={`${store.seo.length}`} />
          </div>
          <div className="mt-5 space-y-3">
            {[
              { label: "Blogs", value: blogs.length },
              { label: "FAQs", value: faqs.length },
              { label: "Learn", value: learnResources.length },
              { label: "Compliance", value: complianceGuides.length },
            ].map((row) => (
              <div key={row.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>{row.label}</span>
                  <span>{row.value}</span>
                </div>
                <div className="h-3 rounded-full bg-muted">
                  <div
                    className="h-3 rounded-full bg-primary"
                    style={{ width: `${Math.min(100, row.value * 18)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </AdminSection>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AdminSection
          title="Top content by visits"
          description="The public pages drawing the most attention right now."
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page</TableHead>
                <TableHead>Visits</TableHead>
                <TableHead>Conversions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {store.topPages.map((page) => (
                <TableRow key={page.title}>
                  <TableCell className="font-medium">{page.title}</TableCell>
                  <TableCell>{page.visits.toLocaleString()}</TableCell>
                  <TableCell>{page.conversions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AdminSection>

        <AdminSection
          title="Recent client activities"
          description="The latest edits, publishes, and SEO changes recorded in this workspace."
        >
          <div className="space-y-3">
            {store.activities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="rounded-2xl border border-border/70 bg-muted/25 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {activity.user} - {activity.action}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                  <StatusBadge value={activity.module} />
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {activity.dateTime}
                </p>
              </div>
            ))}
          </div>
        </AdminSection>
      </div>
    </div>
  );
}

export function AdminWebsiteContentPage() {
  const { store } = useAdminStore();

  const grouped = useMemo(
    () => ({
      Pages: store.content.filter((item) => item.type === "Page"),
      Blogs: store.content.filter((item) => item.type === "Blog"),
      "Learn Resources": store.content.filter((item) => item.type === "Learn Resource"),
      "Compliance Guides": store.content.filter((item) => item.type === "Compliance Guide"),
      FAQs: store.content.filter((item) => item.type === "FAQ"),
    }),
    [store.content],
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {Object.entries(grouped).map(([label, items], index) => (
          <AdminMetricCard
            key={label}
            title={label}
            value={items.length}
            meta={`${items.filter((item) => item.status === "Published").length} live`}
            accent={["blue", "green", "amber", "rose", "blue"][index % 5] as "blue" | "green" | "amber" | "rose"}
          />
        ))}
      </div>

      <AdminSection title="Publishing workflow" description="Content waiting in each stage of the editorial and SEO pipeline.">
        <div className="grid gap-4 xl:grid-cols-4">
          {["Draft", "In Review", "Approved", "Published"].map((status) => {
            const items = store.content.filter((item) => item.status === status);
            return (
              <div key={status} className="rounded-[24px] border border-border/70 bg-muted/25 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{status}</p>
                    <p className="text-xs text-muted-foreground">{items.length} items</p>
                  </div>
                  <StatusBadge value={status} />
                </div>
                <div className="space-y-3">
                  {items.length ? (
                    items.slice(0, 4).map((item) => (
                      <div key={item.id} className="rounded-2xl bg-background p-3 shadow-sm">
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{item.type} · {item.owner}</p>
                      </div>
                    ))
                  ) : (
                    <p className="rounded-2xl border border-dashed border-border px-3 py-8 text-center text-sm text-muted-foreground">
                      No items here.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </AdminSection>
    </div>
  );
}

export function AdminContentWorkspacePage({ type }: { type: ContentType }) {
  const records = useContentByType(type);
  const { sessionUser, createContentRecord, deleteContentRecord, updateContentRecord } = useAdminStore();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedId, setSelectedId] = useState(records[0]?.id ?? "");
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [managedPageData, setManagedPageData] = useState(() =>
    resolveManagedPageData(records[0]?.slug ?? "", records[0]?.pageData),
  );
  const [managedPageSnapshot, setManagedPageSnapshot] = useState("null");
  const draftRecord = useMemo(
    () => buildEmptyContentRecord(type, sessionUser?.name ?? "Admin"),
    [sessionUser?.name, type],
  );

  useEffect(() => {
    if (isCreatingNew) {
      return;
    }

    if (!selectedId && records.length) {
      setSelectedId(records[0]?.id ?? "");
    }
    if (!records.length && selectedId) {
      setSelectedId("");
    }
  }, [isCreatingNew, records, selectedId]);

  const filtered = useMemo(() => {
    return records.filter((item) => {
      const matchesQuery = `${item.title} ${item.slug} ${item.owner} ${item.focusKeyword}`.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, records, statusFilter]);

  const selected = isCreatingNew
    ? draftRecord
    : filtered.find((item) => item.id === selectedId) ??
      records.find((item) => item.id === selectedId) ??
      filtered[0] ??
      records[0];
  const isBlog = type === "Blog";
  const form = useForm<z.infer<typeof contentFormSchema>>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: contentRecordToForm(selected),
  });

  useEffect(() => {
    form.reset(contentRecordToForm(selected));
  }, [form, selected]);

  useEffect(() => {
    const nextManagedPageData =
      type === "Page" && selected ? resolveManagedPageData(selected.slug, selected.pageData) : undefined;

    setManagedPageData(nextManagedPageData);
    setManagedPageSnapshot(JSON.stringify(nextManagedPageData ?? null));
  }, [selected?.id, selected?.pageData, selected?.slug, type]);

  const hasManagedPageEditor = Boolean(selected && type === "Page" && supportsManagedPageEditor(selected.slug));
  const hasManagedPageChanges =
    hasManagedPageEditor && JSON.stringify(managedPageData ?? null) !== managedPageSnapshot;
  const hasUnsavedChanges = form.formState.isDirty || hasManagedPageChanges;

  useUnsavedChangesWarning(hasUnsavedChanges);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard title={`${type} items`} value={records.length} meta={`${records.filter((item) => item.status === "Published").length} published`} />
        <AdminMetricCard title="In review" value={records.filter((item) => item.status === "In Review").length} meta="Needs editor approval" accent="amber" />
        <AdminMetricCard title="Scheduled" value={records.filter((item) => item.status === "Scheduled").length} meta="Future releases in queue" accent="green" />
        <AdminMetricCard title="Average SEO" value={`${Math.round(records.reduce((sum, item) => sum + item.seoScore, 0) / Math.max(records.length, 1))}/100`} meta="Current content health" accent="blue" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <AdminSection
          title={`${type} workspace`}
          description={getContentWorkspaceDescription(type)}
          actions={
            <div className="flex flex-wrap gap-2">
              <div className="relative min-w-[200px]">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={query} onChange={(event) => setQuery(event.target.value)} className="h-10 rounded-xl pl-9" placeholder={`Search ${type.toLowerCase()}s`} />
              </div>
              <div className="relative">
                <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="h-10 rounded-xl border border-border bg-background pl-9 pr-10 text-sm"
                >
                  <option>All</option>
                  {workflowStatuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </div>
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={() => {
                  setIsCreatingNew(true);
                  setQuery("");
                  setStatusFilter("All");
                  form.reset(contentRecordToForm(draftRecord));
                }}
              >
                <Plus className="h-4 w-4" />
                New {getContentActionLabel(type)}
              </Button>
            </div>
          }
        >
          {filtered.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>SEO</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((item) => (
                  <TableRow
                    key={item.id}
                    className="cursor-pointer"
                    onClick={() => {
                      setIsCreatingNew(false);
                      setSelectedId(item.id);
                    }}
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.slug}</p>
                      </div>
                    </TableCell>
                    <TableCell><StatusBadge value={item.status} /></TableCell>
                    <TableCell>{item.seoScore}/100</TableCell>
                    <TableCell>{item.owner}</TableCell>
                    <TableCell>{item.updatedAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyState title={`No ${type.toLowerCase()}s match this filter`} description="Try clearing the search term or switching to another publishing status." />
          )}
        </AdminSection>

        <AdminSection
          title={isCreatingNew ? `Create ${type}` : selected ? `Edit ${selected.title}` : `${type} details`}
          description={
            isCreatingNew
              ? `Add a new ${type.toLowerCase()} with publish-ready content and linked SEO defaults.`
              : selected
                ? "Update content, publishing, and frontend CTA fields."
                : selected?.summary
          }
          actions={
            selected ? (
              <div className="flex flex-wrap items-center gap-2">
                {!isCreatingNew ? (
                  <Button
                    type="button"
                    variant="destructive"
                    className="rounded-xl"
                    onClick={() => {
                      if (!window.confirm(`Delete "${selected.title}"? This will also remove its SEO entry.`)) {
                        return;
                      }

                      deleteContentRecord(selected.id);
                      setSelectedId("");
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                ) : null}
                <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  {isCreatingNew ? "New draft" : hasUnsavedChanges ? "Unsaved changes" : "All changes saved"}
                </div>
              </div>
            ) : null
          }
        >
          {selected ? (
            <form
              className="space-y-5"
              onSubmit={form.handleSubmit((values) => {
                const payload = {
                  type,
                  title: values.title,
                  slug: values.slug,
                  category: values.category || undefined,
                  author: values.author || undefined,
                  summary: values.summary,
                  focusKeyword: values.focusKeyword,
                  owner: values.owner,
                  readingTime: values.readingTime,
                  sections: values.sections,
                  seoScore: values.seoScore,
                  trafficShare: values.trafficShare,
                  status: values.status,
                  publishedAt: values.publishedAt || undefined,
                  tags: values.tags
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
                  featuredImage: values.featuredImage || undefined,
                  featuredImageAlt: values.featuredImageAlt || undefined,
                  heroTitle: values.heroTitle,
                  heroDescription: values.heroDescription,
                  ctaTitle: values.ctaTitle,
                  ctaDescription: values.ctaDescription,
                  ctaButtonText: values.ctaButtonText,
                  ctaButtonUrl: values.ctaButtonUrl || undefined,
                  pageData: hasManagedPageEditor ? managedPageData : undefined,
                };

                if (isCreatingNew) {
                  const createdId = createContentRecord(payload);
                  setIsCreatingNew(false);
                  setSelectedId(createdId);
                  return;
                }

                updateContentRecord(selected.id, payload);
              })}
            >
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge value={selected.status} />
                <StatusBadge value={`${selected.seoScore}/100 SEO`} />
                <StatusBadge value={`${selected.trafficShare}% traffic share`} />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Title" error={form.formState.errors.title?.message}>
                  <Input {...form.register("title")} className="rounded-xl" />
                </Field>
                <Field label="Slug" error={form.formState.errors.slug?.message}>
                  <Input {...form.register("slug")} className="rounded-xl" />
                </Field>
              </div>

              {isBlog ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Category" error={form.formState.errors.category?.message}>
                    <Input {...form.register("category")} className="rounded-xl" placeholder="SEO, Payroll, HR Software" />
                  </Field>
                  <Field label="Author" error={form.formState.errors.author?.message}>
                    <Input {...form.register("author")} className="rounded-xl" placeholder="Editorial author name" />
                  </Field>
                </div>
              ) : null}

              <Field label="Summary" error={form.formState.errors.summary?.message}>
                <Textarea {...form.register("summary")} rows={4} className="rounded-2xl" />
              </Field>

              {isBlog ? (
                <div className="rounded-[24px] border border-border/70 bg-muted/20 p-4">
                  <p className="text-sm font-semibold text-foreground">Blog card fields</p>
                  <div className="mt-4 grid gap-4">
                    <Field label="Featured image URL" error={form.formState.errors.featuredImage?.message}>
                      <Input
                        {...form.register("featuredImage")}
                        className="rounded-xl"
                        placeholder="https://... or /blog/cover.svg"
                      />
                    </Field>
                    <Field label="Featured image alt text" error={form.formState.errors.featuredImageAlt?.message}>
                      <Input
                        {...form.register("featuredImageAlt")}
                        className="rounded-xl"
                        placeholder="Describe the cover image"
                      />
                    </Field>
                  </div>
                </div>
              ) : null}

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Focus keyword" error={form.formState.errors.focusKeyword?.message}>
                  <Input {...form.register("focusKeyword")} className="rounded-xl" />
                </Field>
                <Field label="Owner" error={form.formState.errors.owner?.message}>
                  <Input {...form.register("owner")} className="rounded-xl" />
                </Field>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Field label="Reading time" error={form.formState.errors.readingTime?.message}>
                  <Input {...form.register("readingTime")} className="rounded-xl" />
                </Field>
                <Field label="Sections" error={form.formState.errors.sections?.message}>
                  <Input type="number" {...form.register("sections")} className="rounded-xl" />
                </Field>
                <Field label="SEO score" error={form.formState.errors.seoScore?.message}>
                  <Input type="number" {...form.register("seoScore")} className="rounded-xl" />
                </Field>
                <Field label="Traffic share %" error={form.formState.errors.trafficShare?.message}>
                  <Input type="number" {...form.register("trafficShare")} className="rounded-xl" />
                </Field>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Publish date" error={form.formState.errors.publishedAt?.message}>
                  <Input {...form.register("publishedAt")} className="rounded-xl" placeholder="2026-08-04" />
                </Field>
                <Field label="Workflow status" error={form.formState.errors.status?.message}>
                  <select {...form.register("status")} className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm">
                    {workflowStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Tags" error={form.formState.errors.tags?.message}>
                <Input {...form.register("tags")} className="rounded-xl" placeholder="Hero, CTA, Pricing teaser" />
              </Field>

              <div className="rounded-[24px] border border-border/70 bg-muted/20 p-4">
                <p className="text-sm font-semibold text-foreground">Hero section</p>
                <div className="mt-4 grid gap-4">
                  <Field label="Hero title" error={form.formState.errors.heroTitle?.message}>
                    <Input {...form.register("heroTitle")} className="rounded-xl" />
                  </Field>
                  <Field label="Hero description" error={form.formState.errors.heroDescription?.message}>
                    <Textarea {...form.register("heroDescription")} rows={3} className="rounded-2xl" />
                  </Field>
                </div>
              </div>

              <div className="rounded-[24px] border border-border/70 bg-muted/20 p-4">
                <p className="text-sm font-semibold text-foreground">CTA block</p>
                <div className="mt-4 grid gap-4">
                  <Field label="CTA title" error={form.formState.errors.ctaTitle?.message}>
                    <Input {...form.register("ctaTitle")} className="rounded-xl" />
                  </Field>
                  <Field label="CTA description" error={form.formState.errors.ctaDescription?.message}>
                    <Textarea {...form.register("ctaDescription")} rows={3} className="rounded-2xl" />
                  </Field>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="CTA button text" error={form.formState.errors.ctaButtonText?.message}>
                      <Input {...form.register("ctaButtonText")} className="rounded-xl" />
                    </Field>
                    <Field label="CTA button URL" error={form.formState.errors.ctaButtonUrl?.message}>
                      <Input {...form.register("ctaButtonUrl")} className="rounded-xl" placeholder="https://..." />
                    </Field>
                  </div>
                </div>
              </div>

              {hasManagedPageEditor ? (
                <div className="rounded-[24px] border border-border/70 bg-muted/20 p-4">
                  <p className="text-sm font-semibold text-foreground">Structured page sections</p>
                  <p className="mt-1 text-xs leading-6 text-muted-foreground">
                    Edit the direct frontend content blocks for this page without JSON.
                  </p>
                  <div className="mt-4">
                    <PageManagedSectionsEditor
                      slug={selected.slug}
                      value={managedPageData}
                      onChange={setManagedPageData}
                    />
                  </div>
                </div>
              ) : null}

              <Button type="submit" className="rounded-xl">Save content fields</Button>
            </form>
          ) : (
            <EmptyState title="Select a record" description="Choose a row from the table to review publishing and SEO details." />
          )}
        </AdminSection>
      </div>
    </div>
  );
}

function LegacyAdminSeoPage() {
  const { store, updateSeoRecord } = useAdminStore();
  const [selectedId, setSelectedId] = useState(store.seo[0]?.id ?? "");
  const selected = store.seo.find((item) => item.id === selectedId) ?? store.seo[0];

  const form = useForm<z.infer<typeof seoFormSchema>>({
    resolver: zodResolver(seoFormSchema),
    defaultValues: seoRecordToForm(selected),
  });

  useEffect(() => {
    form.reset(seoRecordToForm(selected));
  }, [form, selected]);

  useUnsavedChangesWarning(form.formState.isDirty);

  return (
    <div className="grid gap-6 xl:grid-cols-[0.92fr_1.18fr]">
      <AdminSection title="SEO records" description="Choose a page or content item to edit metadata, social previews, and robots settings.">
        <div className="space-y-3">
          {store.seo.map((record) => (
            <button
              key={record.id}
              type="button"
              onClick={() => setSelectedId(record.id)}
              className={cn(
                "w-full rounded-[24px] border px-4 py-4 text-left transition",
                selected?.id === record.id ? "border-primary bg-primary/5 shadow-sm" : "border-border/70 hover:bg-muted/40",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-foreground">{record.metaTitle}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{record.slug}</p>
                </div>
                <StatusBadge value={`${record.overallScore}/100`} />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {record.schemaTypes.map((schema) => (
                  <span key={schema} className="rounded-full bg-muted px-3 py-1 text-[11px] font-medium text-muted-foreground">{schema}</span>
                ))}
              </div>
              {record.warnings.length ? (
                <p className="mt-3 text-xs text-amber-600 dark:text-amber-300">{record.warnings[0]}</p>
              ) : null}
            </button>
          ))}
        </div>
      </AdminSection>

      <AdminSection
        title="SEO form"
        description="Front-end validation follows recommended lengths and URL checks."
        actions={
          <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            {form.formState.isDirty ? "Unsaved changes" : "All changes saved"}
          </div>
        }
      >
        {selected ? (
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit((values) => {
              updateSeoRecord(selected.id, {
                seoTitle: values.seoTitle,
                metaTitle: values.metaTitle,
                metaDescription: values.metaDescription,
                canonicalUrl: values.canonicalUrl,
                focusKeyword: values.focusKeyword,
                secondaryKeywords: values.secondaryKeywords.split(",").map((item) => item.trim()).filter(Boolean),
                robots: values.robots,
                ogTitle: values.ogTitle,
                ogDescription: values.ogDescription,
              });
            })}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="SEO title" error={form.formState.errors.seoTitle?.message}>
                <Input {...form.register("seoTitle")} className="rounded-xl" />
              </Field>
              <Field label="Meta title" error={form.formState.errors.metaTitle?.message}>
                <Input {...form.register("metaTitle")} className="rounded-xl" />
              </Field>
            </div>

            <Field label="Meta description" error={form.formState.errors.metaDescription?.message}>
              <Textarea {...form.register("metaDescription")} rows={4} className="rounded-2xl" />
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Canonical URL" error={form.formState.errors.canonicalUrl?.message}>
                <Input {...form.register("canonicalUrl")} className="rounded-xl" />
              </Field>
              <Field label="Focus keyword" error={form.formState.errors.focusKeyword?.message}>
                <Input {...form.register("focusKeyword")} className="rounded-xl" />
              </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Secondary keywords" error={form.formState.errors.secondaryKeywords?.message}>
                <Input {...form.register("secondaryKeywords")} className="rounded-xl" />
              </Field>
              <Field label="Robots" error={form.formState.errors.robots?.message}>
                <select {...form.register("robots")} className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm">
                  <option value="index, follow">index, follow</option>
                  <option value="noindex, follow">noindex, follow</option>
                  <option value="index, nofollow">index, nofollow</option>
                  <option value="noindex, nofollow">noindex, nofollow</option>
                </select>
              </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Open Graph title" error={form.formState.errors.ogTitle?.message}>
                <Input {...form.register("ogTitle")} className="rounded-xl" />
              </Field>
              <Field label="Open Graph description" error={form.formState.errors.ogDescription?.message}>
                <Input {...form.register("ogDescription")} className="rounded-xl" />
              </Field>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <PreviewCard
                title="Google preview"
                eyebrow={form.watch("canonicalUrl")}
                heading={form.watch("metaTitle")}
                description={form.watch("metaDescription")}
              />
              <PreviewCard
                title="Social preview"
                eyebrow="Open Graph"
                heading={form.watch("ogTitle")}
                description={form.watch("ogDescription")}
              />
            </div>

            <div className="rounded-[24px] border border-amber-500/20 bg-amber-500/8 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-300">
                <AlertCircle className="h-4 w-4" />
                Current warnings
              </div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {selected.warnings.map((warning) => (
                  <li key={warning}>• {warning}</li>
                ))}
              </ul>
            </div>

            <Button type="submit" className="rounded-xl">Save SEO settings</Button>
          </form>
        ) : (
          <EmptyState title="No SEO records found" description="Add a page or content item to start managing metadata and schema." />
        )}
      </AdminSection>
    </div>
  );
}

export function AdminSeoPageLegacy() {
  const { store, updateSeoRecord } = useAdminStore();
  const [selectedId, setSelectedId] = useState(store.seo[0]?.id ?? "");
  const selected = store.seo.find((item) => item.id === selectedId) ?? store.seo[0];

  const form = useForm<z.infer<typeof seoFormSchema>>({
    resolver: zodResolver(seoFormSchema),
    defaultValues: buildSeoEditorDefaults(selected),
  });

  useEffect(() => {
    form.reset(buildSeoEditorDefaults(selected));
  }, [form, selected]);

  useUnsavedChangesWarning(form.formState.isDirty);

  return (
    <div className="grid gap-6 xl:grid-cols-[0.92fr_1.18fr]">
      <AdminSection title="SEO records" description="Choose a page or content item to edit metadata, social previews, schema, and AI SEO notes.">
        <div className="space-y-3">
          {store.seo.map((record) => (
            <button
              key={record.id}
              type="button"
              onClick={() => setSelectedId(record.id)}
              className={cn(
                "w-full rounded-[24px] border px-4 py-4 text-left transition",
                selected?.id === record.id ? "border-primary bg-primary/5 shadow-sm" : "border-border/70 hover:bg-muted/40",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-foreground">{record.metaTitle}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{record.slug}</p>
                </div>
                <StatusBadge value={`${record.overallScore}/100`} />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {record.schemaTypes.map((schema) => (
                  <span key={schema} className="rounded-full bg-muted px-3 py-1 text-[11px] font-medium text-muted-foreground">
                    {schema}
                  </span>
                ))}
              </div>
              {record.warnings.length ? (
                <p className="mt-3 text-xs text-amber-600 dark:text-amber-300">{record.warnings[0]}</p>
              ) : null}
            </button>
          ))}
        </div>
      </AdminSection>

      <AdminSection
        title="SEO form"
        description="Every major SEO field is editable here, including schema JSON-LD and social cards."
        actions={
          <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            {form.formState.isDirty ? "Unsaved changes" : "All changes saved"}
          </div>
        }
      >
        {selected ? (
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit((values) => {
              updateSeoRecord(selected.id, {
                seoTitle: values.seoTitle,
                metaTitle: values.metaTitle,
                metaDescription: values.metaDescription,
                slug: values.slug,
                canonicalUrl: values.canonicalUrl,
                focusKeyword: values.focusKeyword,
                secondaryKeywords: values.secondaryKeywords.split(",").map((item) => item.trim()).filter(Boolean),
                semanticKeywords: values.semanticKeywords.split(",").map((item) => item.trim()).filter(Boolean),
                author: values.author,
                robots: values.robots,
                ogTitle: values.ogTitle,
                ogDescription: values.ogDescription,
                ogImage: values.ogImage || undefined,
                twitterTitle: values.twitterTitle,
                twitterDescription: values.twitterDescription,
                schemaTypes: values.schemaTypes.split(",").map((item) => item.trim()).filter(Boolean),
                schemaEnabled: values.schemaEnabled,
                schemaJson: values.schemaJson,
                searchIntent: values.searchIntent,
                primaryEntity: values.primaryEntity,
                aiSummary: values.aiSummary,
              });
            })}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="SEO title" error={form.formState.errors.seoTitle?.message}>
                <Input {...form.register("seoTitle")} className="rounded-xl" />
              </Field>
              <Field label="Meta title" error={form.formState.errors.metaTitle?.message}>
                <Input {...form.register("metaTitle")} className="rounded-xl" />
              </Field>
            </div>

            <Field label="Meta description" error={form.formState.errors.metaDescription?.message}>
              <Textarea {...form.register("metaDescription")} rows={4} className="rounded-2xl" />
            </Field>

            <div className="grid gap-4 md:grid-cols-3">
              <Field label="SEO slug" error={form.formState.errors.slug?.message}>
                <Input {...form.register("slug")} className="rounded-xl" />
              </Field>
              <Field label="Canonical URL" error={form.formState.errors.canonicalUrl?.message}>
                <Input {...form.register("canonicalUrl")} className="rounded-xl" />
              </Field>
              <Field label="Focus keyword" error={form.formState.errors.focusKeyword?.message}>
                <Input {...form.register("focusKeyword")} className="rounded-xl" />
              </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Secondary keywords" error={form.formState.errors.secondaryKeywords?.message}>
                <Input {...form.register("secondaryKeywords")} className="rounded-xl" />
              </Field>
              <Field label="Semantic keywords" error={form.formState.errors.semanticKeywords?.message}>
                <Input {...form.register("semanticKeywords")} className="rounded-xl" />
              </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Author" error={form.formState.errors.author?.message}>
                <Input {...form.register("author")} className="rounded-xl" />
              </Field>
              <Field label="Robots" error={form.formState.errors.robots?.message}>
                <select {...form.register("robots")} className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm">
                  <option value="index, follow">index, follow</option>
                  <option value="noindex, follow">noindex, follow</option>
                  <option value="index, nofollow">index, nofollow</option>
                  <option value="noindex, nofollow">noindex, nofollow</option>
                </select>
              </Field>
            </div>

            <div className="rounded-[24px] border border-border/70 bg-muted/20 p-4">
              <p className="text-sm font-semibold text-foreground">Social SEO</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field label="Open Graph title" error={form.formState.errors.ogTitle?.message}>
                  <Input {...form.register("ogTitle")} className="rounded-xl" />
                </Field>
                <Field label="Open Graph description" error={form.formState.errors.ogDescription?.message}>
                  <Input {...form.register("ogDescription")} className="rounded-xl" />
                </Field>
                <Field label="Open Graph image URL" error={form.formState.errors.ogImage?.message}>
                  <Input {...form.register("ogImage")} className="rounded-xl" placeholder="https://..." />
                </Field>
                <Field label="Twitter title" error={form.formState.errors.twitterTitle?.message}>
                  <Input {...form.register("twitterTitle")} className="rounded-xl" />
                </Field>
                <Field label="Twitter description" error={form.formState.errors.twitterDescription?.message}>
                  <Textarea {...form.register("twitterDescription")} rows={3} className="rounded-2xl" />
                </Field>
              </div>
            </div>

            <div className="rounded-[24px] border border-border/70 bg-muted/20 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-foreground">Schema and AI SEO</p>
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input type="checkbox" {...form.register("schemaEnabled")} className="h-4 w-4 rounded border-border" />
                  Schema enabled
                </label>
              </div>
              <div className="mt-4 grid gap-4">
                <Field label="Schema types" error={form.formState.errors.schemaTypes?.message}>
                  <Input {...form.register("schemaTypes")} className="rounded-xl" placeholder="Organization, SoftwareApplication, FAQPage" />
                </Field>
                <Field label="Schema JSON-LD" error={form.formState.errors.schemaJson?.message}>
                  <Textarea {...form.register("schemaJson")} rows={8} className="rounded-2xl font-mono text-xs" />
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
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <PreviewCard
                title="Google preview"
                eyebrow={form.watch("canonicalUrl")}
                heading={form.watch("metaTitle")}
                description={form.watch("metaDescription")}
              />
              <PreviewCard
                title="Social preview"
                eyebrow={form.watch("ogImage") || "Open Graph"}
                heading={form.watch("twitterTitle")}
                description={form.watch("twitterDescription")}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <DetailChip label="Overall score" value={`${selected.overallScore}/100`} />
              <DetailChip label="Technical score" value={`${selected.technicalScore}/100`} />
              <DetailChip label="Content score" value={`${selected.contentScore}/100`} />
              <DetailChip label="AI SEO score" value={`${selected.aiScore}/100`} />
            </div>

            <div className="rounded-[24px] border border-amber-500/20 bg-amber-500/8 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-300">
                <AlertCircle className="h-4 w-4" />
                Current warnings
              </div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {selected.warnings.map((warning) => (
                  <li key={warning}>• {warning}</li>
                ))}
              </ul>
            </div>

            <Button type="submit" className="rounded-xl">Save SEO settings</Button>
          </form>
        ) : (
          <EmptyState title="No SEO records found" description="Add a page or content item to start managing metadata and schema." />
        )}
      </AdminSection>
    </div>
  );
}

export function AdminSeoPage() {
  const {
    store,
    updateSeoRecord,
    updateContentRecord,
    importSeoRows,
    bulkFillFeaturedAltText,
  } = useAdminStore();
  const averageSeoScore = useAverageSeoScore();
  const [selectedId, setSelectedId] = useState(store.seo[0]?.id ?? "");
  const [bulkTarget, setBulkTarget] = useState<"All" | ContentType>("All");
  const [bulkMetaPrefix, setBulkMetaPrefix] = useState("");
  const [bulkMetaSuffix, setBulkMetaSuffix] = useState("");
  const [bulkSchemaType, setBulkSchemaType] = useState("FAQPage");
  const [bulkRobots, setBulkRobots] = useState<SeoRecord["robots"]>("index, follow");
  const [csvImportValue, setCsvImportValue] = useState("");
  const [lastAutoSavedAt, setLastAutoSavedAt] = useState("");
  const selected = store.seo.find((item) => item.id === selectedId) ?? store.seo[0];
  const linkedContent = store.content.find((item) => item.id === selected?.entityId);

  const form = useForm<SeoEditorValues>({
    resolver: zodResolver(seoFormSchema),
    mode: "onChange",
    defaultValues: buildSeoEditorDefaults(selected, linkedContent),
  });
  const watchedSeoValues = form.watch();

  useEffect(() => {
    form.reset(buildSeoEditorDefaults(selected, linkedContent));
  }, [form, linkedContent, selected]);

  useUnsavedChangesWarning(form.formState.isDirty);

  const averageAiScore = Math.round(
    store.seo.reduce((sum, item) => sum + item.aiScore, 0) / Math.max(store.seo.length, 1),
  );
  const averageContentScore = Math.round(
    store.seo.reduce((sum, item) => sum + item.contentScore, 0) / Math.max(store.seo.length, 1),
  );
  const isHomePage = selected?.entityType === "Page" && selected.slug === "/";
  const isPricingPage = selected?.entityType === "Page" && selected.slug === "/pricing";
  const isLearnResource = selected?.entityType === "Learn Resource";
  const isComplianceGuide = selected?.entityType === "Compliance Guide";
  const isBlog = selected?.entityType === "Blog";
  const isFaq = selected?.entityType === "FAQ";
  const filteredRecords =
    bulkTarget === "All" ? store.seo : store.seo.filter((item) => item.entityType === bulkTarget);
  const averageTechnicalScore = Math.round(
    store.seo.reduce((sum, item) => sum + item.technicalScore, 0) / Math.max(store.seo.length, 1),
  );
  const missingMetaCount = store.seo.filter(
    (item) => !item.metaTitle.trim() || !item.metaDescription.trim(),
  ).length;
  const missingSchemaCount = store.seo.filter(
    (item) => !item.schemaEnabled || !item.schemaJson?.trim(),
  ).length;
  const missingAltTextCount = store.content.filter(
    (item) => item.featuredImage && !item.featuredImageAlt?.trim(),
  ).length;
  const duplicateMetaCount =
    store.seo.map((item) => item.metaTitle.trim()).filter(Boolean).length -
    new Set(store.seo.map((item) => item.metaTitle.trim()).filter(Boolean)).size;
  const duplicateTitleCount =
    store.seo.map((item) => item.seoTitle.trim()).filter(Boolean).length -
    new Set(store.seo.map((item) => item.seoTitle.trim()).filter(Boolean)).size;
  const missingHeadingCount = store.seo.filter(
    (item) => item.entityType === "Blog" && !item.headingOutline?.trim(),
  ).length;
  const noindexCount = store.seo.filter((item) => item.robots.startsWith("noindex")).length;
  const indexedCount = store.seo.length - noindexCount;
  const selectedWarnings = Array.from(
    new Set([
      ...(selected?.warnings ?? []),
      ...(!selected?.schemaEnabled || !selected?.schemaJson?.trim() ? ["Schema coverage is incomplete."] : []),
      ...(linkedContent?.featuredImage && !linkedContent.featuredImageAlt?.trim()
        ? ["Featured image alt text is missing."]
        : []),
    ]),
  );
  const seoVersionHistory = store.activities.filter((item) => item.module === "SEO").slice(0, 8);
  const formStatusLabel = store.siteSettings.autoSave
    ? form.formState.isDirty
      ? "Autosave pending"
      : lastAutoSavedAt
        ? `Autosaved ${lastAutoSavedAt}`
        : "Autosave ready"
    : form.formState.isDirty
      ? "Unsaved changes"
      : "All changes saved";

  const persistSeoValues = useCallback(
    (values: SeoEditorValues, source: "manual" | "autosave" = "manual") => {
      if (!selected) {
        return;
      }

      const silent = source === "autosave";
      updateSeoRecord(
        selected.id,
        {
          seoTitle: values.seoTitle,
          metaTitle: values.metaTitle,
          metaDescription: values.metaDescription,
          slug: values.slug,
          canonicalUrl: values.canonicalUrl,
          focusKeyword: values.focusKeyword,
          publishDate: values.publishDate,
          readingTime: values.readingTime,
          secondaryKeywords: splitCsvValues(values.secondaryKeywords),
          longTailKeywords: splitCsvValues(values.longTailKeywords),
          semanticKeywords: splitCsvValues(values.semanticKeywords),
          lsiKeywords: splitCsvValues(values.lsiKeywords),
          nlpKeywords: splitCsvValues(values.nlpKeywords),
          relatedEntities: splitCsvValues(values.relatedEntities),
          peopleAlsoAsk: splitLineValues(values.peopleAlsoAsk),
          relatedSearches: splitLineValues(values.relatedSearches),
          author: values.author,
          robots: values.robots,
          ogTitle: values.ogTitle,
          ogDescription: values.ogDescription,
          ogImage: values.ogImage || undefined,
          twitterTitle: values.twitterTitle,
          twitterDescription: values.twitterDescription,
          twitterImage: values.twitterImage || undefined,
          linkedInTitle: values.linkedInTitle,
          linkedInDescription: values.linkedInDescription,
          linkedInImage: values.linkedInImage || undefined,
          whatsAppTitle: values.whatsAppTitle,
          whatsAppDescription: values.whatsAppDescription,
          whatsAppImage: values.whatsAppImage || undefined,
          schemaTypes: splitCsvValues(values.schemaTypes),
          schemaEnabled: values.schemaEnabled,
          schemaJson: values.schemaJson,
          searchIntent: values.searchIntent,
          contentIntent: values.contentIntent,
          primaryEntity: values.primaryEntity,
          aiSummary: values.aiSummary,
          aiOverview: values.aiOverview,
          chatgptSummary: values.chatgptSummary,
          geminiSummary: values.geminiSummary,
          topicClusters: splitCsvValues(values.topicClusters),
          difficultyLevel: values.difficultyLevel as SeoRecord["difficultyLevel"],
          relatedLearn: splitLineValues(values.relatedLearn),
          relatedBlog: splitLineValues(values.relatedBlog),
          relatedFaq: splitLineValues(values.relatedFaq),
          relatedProduct: splitLineValues(values.relatedProduct),
          internalLinks: splitLineValues(values.internalLinks),
          downloadAssetUrl: values.downloadAssetUrl || undefined,
          downloadPdfUrl: values.downloadPdfUrl || undefined,
          videoSupportUrl: values.videoSupportUrl || undefined,
          applicableRegion: values.applicableRegion,
          lawType: values.lawType,
          versionLabel: values.versionLabel,
          faqCategory: values.faqCategory,
          faqTags: splitCsvValues(values.faqTags),
          searchOptionEnabled: values.searchOptionEnabled,
          accordionEnabled: values.accordionEnabled,
          heroSeoNotes: values.heroSeoNotes,
          featureSectionSeo: values.featureSectionSeo,
          bookDemoCtaLabel: values.bookDemoCtaLabel,
          performanceNotes: values.performanceNotes,
          pricingKeywords: splitCsvValues(values.pricingKeywords),
          comparisonTableHighlights: values.comparisonTableHighlights,
          conversionTrackingNotes: values.conversionTrackingNotes,
          readabilityScore: values.readabilityScore,
          keywordDensity: values.keywordDensity,
          headingOutline: values.headingOutline,
          tocEnabled: values.tocEnabled,
          wordCount: values.wordCount,
          imageCount: values.imageCount,
          videoCount: values.videoCount,
          tableCount: values.tableCount,
          faqCount: values.faqCount,
          internalLinkCount: values.internalLinkCount,
          externalLinkCount: values.externalLinkCount,
          brokenLinkCount: values.brokenLinkCount,
          webpReady: values.webpReady,
          ctaModes: splitCsvValues(values.ctaModes),
          views: values.views,
          ctr: values.ctr,
          avgTimeOnPage: values.avgTimeOnPage,
          scrollDepth: values.scrollDepth,
          demoConversions: values.demoConversions,
        },
        {
          silent,
          action: silent ? "Autosave" : "Update",
          activityDescription: silent
            ? `Autosaved SEO settings for ${selected.entityType.toLowerCase()} "${selected.slug}".`
            : undefined,
        },
      );

      if (linkedContent) {
        updateContentRecord(
          linkedContent.id,
          {
            author: values.author,
            publishedAt: values.publishDate || undefined,
            readingTime: values.readingTime,
            ctaButtonText: values.bookDemoCtaLabel || undefined,
          },
          {
            silent,
            action: silent ? "Autosave" : "Update",
            activityDescription: silent
              ? `Autosaved editable fields for "${linkedContent.title}".`
              : undefined,
          },
        );
      }
    },
    [linkedContent, selected, updateContentRecord, updateSeoRecord],
  );

  useEffect(() => {
    setLastAutoSavedAt("");
  }, [selected?.id]);

  useEffect(() => {
    if (!store.siteSettings.autoSave || !selected || !form.formState.isDirty) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void form.trigger().then((isValid) => {
        if (!isValid) {
          return;
        }

        persistSeoValues(form.getValues(), "autosave");
        setLastAutoSavedAt(
          new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        );
      });
    }, 1200);

    return () => window.clearTimeout(timeoutId);
  }, [
    form,
    form.formState.isDirty,
    persistSeoValues,
    selected,
    store.siteSettings.autoSave,
    watchedSeoValues,
  ]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard title="Overall SEO score" value={`${averageSeoScore}/100`} meta="Average across all SEO records" accent="green" />
        <AdminMetricCard title="Technical SEO score" value={`${averageTechnicalScore}/100`} meta={`${store.brokenLinks.length} broken links open`} accent="blue" />
        <AdminMetricCard title="AI SEO score" value={`${averageAiScore}/100`} meta="AI summary, entity, and intent coverage" accent="green" />
        <AdminMetricCard title="Content score" value={`${averageContentScore}/100`} meta="Readability and optimization average" accent="blue" />
        <AdminMetricCard title="Missing meta" value={missingMetaCount} meta={`${duplicateMetaCount} duplicate meta titles`} accent="amber" />
        <AdminMetricCard title="Missing H1-H4" value={missingHeadingCount} meta="Blog outlines still needed" accent="amber" />
        <AdminMetricCard title="Missing alt text" value={missingAltTextCount} meta="Featured images needing SEO text" accent="rose" />
        <AdminMetricCard title="Schema coverage" value={`${store.seo.length - missingSchemaCount}/${store.seo.length}`} meta={`${missingSchemaCount} records missing schema`} accent="green" />
        <AdminMetricCard title="Broken links" value={store.brokenLinks.length} meta="Queued for cleanup" accent="rose" />
        <AdminMetricCard title="Duplicate titles" value={duplicateTitleCount} meta={`${duplicateMetaCount} duplicate meta titles`} accent="amber" />
        <AdminMetricCard title="Index status" value={`${indexedCount}/${store.seo.length}`} meta={`${noindexCount} noindex records`} accent="green" />
        <AdminMetricCard title="Sitemap status" value={store.sitemap.status} meta={`Generated ${store.sitemap.lastGenerated}`} accent="blue" />
        <AdminMetricCard title="Page speed" value="87" meta="Panel-ready score snapshot" accent="blue" />
        <AdminMetricCard title="Core Web Vitals" value="Good" meta={`${store.sitemap.status} sitemap status`} accent="green" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.18fr]">
        <AdminSection
          title="SEO records"
          description="Choose a page or content item to edit metadata, social previews, schema, AI SEO, and page-specific requirements."
          actions={
            <select
              value={bulkTarget}
              onChange={(event) => setBulkTarget(event.target.value as "All" | ContentType)}
              className="h-10 rounded-xl border border-border bg-background px-3 text-sm"
            >
              <option value="All">All records</option>
              <option value="Page">Pages</option>
              <option value="Blog">Blogs</option>
              <option value="Learn Resource">Learn resources</option>
              <option value="Compliance Guide">Compliance guides</option>
              <option value="FAQ">FAQs</option>
            </select>
          }
        >
          <div className="space-y-3">
            {filteredRecords.map((record) => (
              <button
                key={record.id}
                type="button"
                onClick={() => setSelectedId(record.id)}
                className={cn(
                  "w-full rounded-[24px] border px-4 py-4 text-left transition",
                  selected?.id === record.id ? "border-primary bg-primary/5 shadow-sm" : "border-border/70 hover:bg-muted/40",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-foreground">{record.metaTitle}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{record.slug}</p>
                  </div>
                  <StatusBadge value={`${record.overallScore}/100`} />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
                    {record.entityType}
                  </span>
                  {record.schemaTypes.map((schema) => (
                    <span key={schema} className="rounded-full bg-muted px-3 py-1 text-[11px] font-medium text-muted-foreground">
                      {schema}
                    </span>
                  ))}
                </div>
                {record.warnings.length ? (
                  <p className="mt-3 text-xs text-amber-600 dark:text-amber-300">{record.warnings[0]}</p>
                ) : null}
              </button>
            ))}
          </div>
        </AdminSection>

        <div className="space-y-6">
          <AdminSection
            title="SEO form"
            description="This panel now covers the client SRS: global SEO, social SEO, schema, AI SEO, page-specific fields, and detailed blog or FAQ controls."
            actions={
              <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                {formStatusLabel}
              </div>
            }
          >
            {selected ? (
              <form
                className="space-y-5"
                onSubmit={form.handleSubmit((values) => persistSeoValues(values, "manual"))}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge value={selected.entityType} />
                  <StatusBadge value={`${selected.overallScore}/100 overall`} />
                  <StatusBadge value={`Updated ${linkedContent?.updatedAt ?? selected.lastUpdated}`} />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="SEO title" error={form.formState.errors.seoTitle?.message}>
                    <Input {...form.register("seoTitle")} className="rounded-xl" />
                  </Field>
                  <Field label="Meta title" error={form.formState.errors.metaTitle?.message}>
                    <Input {...form.register("metaTitle")} className="rounded-xl" />
                  </Field>
                </div>

                <Field label="Meta description" error={form.formState.errors.metaDescription?.message}>
                  <Textarea {...form.register("metaDescription")} rows={4} className="rounded-2xl" />
                </Field>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <Field label="SEO slug" error={form.formState.errors.slug?.message}>
                    <Input {...form.register("slug")} className="rounded-xl" />
                  </Field>
                  <Field label="Canonical URL" error={form.formState.errors.canonicalUrl?.message}>
                    <Input {...form.register("canonicalUrl")} className="rounded-xl" />
                  </Field>
                  <Field label="Focus keyword" error={form.formState.errors.focusKeyword?.message}>
                    <Input {...form.register("focusKeyword")} className="rounded-xl" />
                  </Field>
                  <Field label="Publish date" error={form.formState.errors.publishDate?.message}>
                    <Input {...form.register("publishDate")} className="rounded-xl" placeholder="2026-08-04" />
                  </Field>
                  <Field label="Reading time" error={form.formState.errors.readingTime?.message}>
                    <Input {...form.register("readingTime")} className="rounded-xl" placeholder="8 min read" />
                  </Field>
                  <Field label="Author" error={form.formState.errors.author?.message}>
                    <Input {...form.register("author")} className="rounded-xl" />
                  </Field>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Robots" error={form.formState.errors.robots?.message}>
                    <select {...form.register("robots")} className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm">
                      <option value="index, follow">index, follow</option>
                      <option value="noindex, follow">noindex, follow</option>
                      <option value="index, nofollow">index, nofollow</option>
                      <option value="noindex, nofollow">noindex, nofollow</option>
                    </select>
                  </Field>
                  <div className="rounded-[20px] border border-border/70 bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
                    Last updated
                    <div className="mt-1 font-medium text-foreground">{linkedContent?.updatedAt ?? selected.lastUpdated}</div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-border/70 bg-muted/20 p-4">
                  <p className="text-sm font-semibold text-foreground">Keyword strategy</p>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <Field label="Secondary keywords" error={form.formState.errors.secondaryKeywords?.message}>
                      <Input {...form.register("secondaryKeywords")} className="rounded-xl" />
                    </Field>
                    <Field label="Long-tail keywords" error={form.formState.errors.longTailKeywords?.message}>
                      <Input {...form.register("longTailKeywords")} className="rounded-xl" />
                    </Field>
                    <Field label="Semantic keywords" error={form.formState.errors.semanticKeywords?.message}>
                      <Input {...form.register("semanticKeywords")} className="rounded-xl" />
                    </Field>
                    <Field label="LSI keywords" error={form.formState.errors.lsiKeywords?.message}>
                      <Input {...form.register("lsiKeywords")} className="rounded-xl" />
                    </Field>
                    <Field label="NLP keywords" error={form.formState.errors.nlpKeywords?.message}>
                      <Input {...form.register("nlpKeywords")} className="rounded-xl" />
                    </Field>
                    <Field label="Related entities" error={form.formState.errors.relatedEntities?.message}>
                      <Input {...form.register("relatedEntities")} className="rounded-xl" />
                    </Field>
                  </div>
                </div>

                <div className="rounded-[24px] border border-border/70 bg-muted/20 p-4">
                  <p className="text-sm font-semibold text-foreground">Social SEO</p>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <Field label="Open Graph title" error={form.formState.errors.ogTitle?.message}>
                      <Input {...form.register("ogTitle")} className="rounded-xl" />
                    </Field>
                    <Field label="Open Graph description" error={form.formState.errors.ogDescription?.message}>
                      <Input {...form.register("ogDescription")} className="rounded-xl" />
                    </Field>
                    <Field label="Open Graph image URL" error={form.formState.errors.ogImage?.message}>
                      <Input {...form.register("ogImage")} className="rounded-xl" placeholder="https://..." />
                    </Field>
                    <Field label="Twitter title" error={form.formState.errors.twitterTitle?.message}>
                      <Input {...form.register("twitterTitle")} className="rounded-xl" />
                    </Field>
                    <Field label="Twitter description" error={form.formState.errors.twitterDescription?.message}>
                      <Textarea {...form.register("twitterDescription")} rows={3} className="rounded-2xl" />
                    </Field>
                    <Field label="Twitter image URL" error={form.formState.errors.twitterImage?.message}>
                      <Input {...form.register("twitterImage")} className="rounded-xl" placeholder="https://..." />
                    </Field>
                    <Field label="LinkedIn title" error={form.formState.errors.linkedInTitle?.message}>
                      <Input {...form.register("linkedInTitle")} className="rounded-xl" />
                    </Field>
                    <Field label="LinkedIn description" error={form.formState.errors.linkedInDescription?.message}>
                      <Textarea {...form.register("linkedInDescription")} rows={3} className="rounded-2xl" />
                    </Field>
                    <Field label="LinkedIn image URL" error={form.formState.errors.linkedInImage?.message}>
                      <Input {...form.register("linkedInImage")} className="rounded-xl" placeholder="https://..." />
                    </Field>
                    <Field label="WhatsApp title" error={form.formState.errors.whatsAppTitle?.message}>
                      <Input {...form.register("whatsAppTitle")} className="rounded-xl" />
                    </Field>
                    <Field label="WhatsApp description" error={form.formState.errors.whatsAppDescription?.message}>
                      <Textarea {...form.register("whatsAppDescription")} rows={3} className="rounded-2xl" />
                    </Field>
                    <Field label="WhatsApp image URL" error={form.formState.errors.whatsAppImage?.message}>
                      <Input {...form.register("whatsAppImage")} className="rounded-xl" placeholder="https://..." />
                    </Field>
                  </div>
                </div>

                <div className="rounded-[24px] border border-border/70 bg-muted/20 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-foreground">Schema and AI SEO</p>
                    <label className="flex items-center gap-2 text-sm text-muted-foreground">
                      <input type="checkbox" {...form.register("schemaEnabled")} className="h-4 w-4 rounded border-border" />
                      Schema enabled
                    </label>
                  </div>
                  <div className="mt-4 grid gap-4">
                    <Field label="Schema types" error={form.formState.errors.schemaTypes?.message}>
                      <Input {...form.register("schemaTypes")} className="rounded-xl" placeholder="Organization, SoftwareApplication, FAQPage" />
                    </Field>
                    <Field label="Schema JSON-LD" error={form.formState.errors.schemaJson?.message}>
                      <Textarea {...form.register("schemaJson")} rows={8} className="rounded-2xl font-mono text-xs" />
                    </Field>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Search intent" error={form.formState.errors.searchIntent?.message}>
                        <Input {...form.register("searchIntent")} className="rounded-xl" />
                      </Field>
                      <Field label="Content intent" error={form.formState.errors.contentIntent?.message}>
                        <Input {...form.register("contentIntent")} className="rounded-xl" />
                      </Field>
                      <Field label="Primary entity" error={form.formState.errors.primaryEntity?.message}>
                        <Input {...form.register("primaryEntity")} className="rounded-xl" />
                      </Field>
                      <Field label="People Also Ask" error={form.formState.errors.peopleAlsoAsk?.message}>
                        <Textarea {...form.register("peopleAlsoAsk")} rows={4} className="rounded-2xl" placeholder="One question per line" />
                      </Field>
                    </div>
                    <Field label="Related searches" error={form.formState.errors.relatedSearches?.message}>
                      <Textarea {...form.register("relatedSearches")} rows={3} className="rounded-2xl" placeholder="One search phrase per line" />
                    </Field>
                    <Field label="AI summary" error={form.formState.errors.aiSummary?.message}>
                      <Textarea {...form.register("aiSummary")} rows={4} className="rounded-2xl" />
                    </Field>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="AI overview" error={form.formState.errors.aiOverview?.message}>
                        <Textarea {...form.register("aiOverview")} rows={4} className="rounded-2xl" />
                      </Field>
                      <Field label="ChatGPT summary" error={form.formState.errors.chatgptSummary?.message}>
                        <Textarea {...form.register("chatgptSummary")} rows={4} className="rounded-2xl" />
                      </Field>
                    </div>
                    <Field label="Gemini summary" error={form.formState.errors.geminiSummary?.message}>
                      <Textarea {...form.register("geminiSummary")} rows={4} className="rounded-2xl" />
                    </Field>
                  </div>
                </div>

                {(isHomePage || isPricingPage || isLearnResource || isComplianceGuide || isFaq || isBlog) ? (
                  <div className="rounded-[24px] border border-border/70 bg-muted/20 p-4">
                    <p className="text-sm font-semibold text-foreground">SRS module-specific SEO</p>
                    <div className="mt-4 grid gap-4">
                      {isHomePage ? (
                        <>
                          <Field label="Hero SEO" error={form.formState.errors.heroSeoNotes?.message}>
                            <Textarea {...form.register("heroSeoNotes")} rows={3} className="rounded-2xl" />
                          </Field>
                          <Field label="Feature section SEO" error={form.formState.errors.featureSectionSeo?.message}>
                            <Textarea {...form.register("featureSectionSeo")} rows={3} className="rounded-2xl" />
                          </Field>
                          <Field label="Book Demo CTA label" error={form.formState.errors.bookDemoCtaLabel?.message}>
                            <Input {...form.register("bookDemoCtaLabel")} className="rounded-xl" />
                          </Field>
                          <Field label="Performance optimization notes" error={form.formState.errors.performanceNotes?.message}>
                            <Textarea {...form.register("performanceNotes")} rows={3} className="rounded-2xl" />
                          </Field>
                        </>
                      ) : null}
                      {isPricingPage ? (
                        <>
                          <Field label="Pricing keywords" error={form.formState.errors.pricingKeywords?.message}>
                            <Input {...form.register("pricingKeywords")} className="rounded-xl" />
                          </Field>
                          <Field label="Comparison table highlights" error={form.formState.errors.comparisonTableHighlights?.message}>
                            <Textarea {...form.register("comparisonTableHighlights")} rows={4} className="rounded-2xl" />
                          </Field>
                          <Field label="Conversion tracking notes" error={form.formState.errors.conversionTrackingNotes?.message}>
                            <Textarea {...form.register("conversionTrackingNotes")} rows={3} className="rounded-2xl" />
                          </Field>
                        </>
                      ) : null}
                      {isLearnResource ? (
                        <>
                          <Field label="Topic clusters" error={form.formState.errors.topicClusters?.message}>
                            <Input {...form.register("topicClusters")} className="rounded-xl" />
                          </Field>
                          <Field label="Difficulty level" error={form.formState.errors.difficultyLevel?.message}>
                            <select {...form.register("difficultyLevel")} className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm">
                              <option>Beginner</option>
                              <option>Intermediate</option>
                              <option>Advanced</option>
                            </select>
                          </Field>
                          <Field label="Download PDF URL" error={form.formState.errors.downloadPdfUrl?.message}>
                            <Input {...form.register("downloadPdfUrl")} className="rounded-xl" placeholder="https://..." />
                          </Field>
                          <Field label="Video support URL" error={form.formState.errors.videoSupportUrl?.message}>
                            <Input {...form.register("videoSupportUrl")} className="rounded-xl" placeholder="https://..." />
                          </Field>
                        </>
                      ) : null}
                      {isComplianceGuide ? (
                        <>
                          <Field label="Applicable state or country" error={form.formState.errors.applicableRegion?.message}>
                            <Input {...form.register("applicableRegion")} className="rounded-xl" />
                          </Field>
                          <Field label="Law type" error={form.formState.errors.lawType?.message}>
                            <Input {...form.register("lawType")} className="rounded-xl" />
                          </Field>
                          <Field label="Version label" error={form.formState.errors.versionLabel?.message}>
                            <Input {...form.register("versionLabel")} className="rounded-xl" />
                          </Field>
                        </>
                      ) : null}
                      {isFaq ? (
                        <>
                          <Field label="FAQ category" error={form.formState.errors.faqCategory?.message}>
                            <Input {...form.register("faqCategory")} className="rounded-xl" />
                          </Field>
                          <Field label="FAQ tags" error={form.formState.errors.faqTags?.message}>
                            <Input {...form.register("faqTags")} className="rounded-xl" />
                          </Field>
                          <div className="grid gap-4 md:grid-cols-2">
                            <label className="flex items-center gap-3 rounded-[20px] border border-border/70 bg-background px-4 py-3 text-sm text-foreground">
                              <input type="checkbox" {...form.register("searchOptionEnabled")} className="h-4 w-4 rounded border-border" />
                              Search option enabled
                            </label>
                            <label className="flex items-center gap-3 rounded-[20px] border border-border/70 bg-background px-4 py-3 text-sm text-foreground">
                              <input type="checkbox" {...form.register("accordionEnabled")} className="h-4 w-4 rounded border-border" />
                              Accordion enabled
                            </label>
                          </div>
                        </>
                      ) : null}
                      {isBlog ? (
                        <>
                          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            <Field label="Readability score" error={form.formState.errors.readabilityScore?.message}>
                              <Input type="number" {...form.register("readabilityScore")} className="rounded-xl" />
                            </Field>
                            <Field label="Keyword density" error={form.formState.errors.keywordDensity?.message}>
                              <Input {...form.register("keywordDensity")} className="rounded-xl" />
                            </Field>
                            <Field label="Word count" error={form.formState.errors.wordCount?.message}>
                              <Input type="number" {...form.register("wordCount")} className="rounded-xl" />
                            </Field>
                            <Field label="Demo conversions" error={form.formState.errors.demoConversions?.message}>
                              <Input type="number" {...form.register("demoConversions")} className="rounded-xl" />
                            </Field>
                          </div>
                          <Field label="H1-H4 outline" error={form.formState.errors.headingOutline?.message}>
                            <Textarea {...form.register("headingOutline")} rows={4} className="rounded-2xl" placeholder={"H1: ...\nH2: ...\nH3: ..."} />
                          </Field>
                        </>
                      ) : null}
                      <Field label="Internal links" error={form.formState.errors.internalLinks?.message}>
                        <Textarea {...form.register("internalLinks")} rows={4} className="rounded-2xl" placeholder="One internal link per line" />
                      </Field>
                    </div>
                  </div>
                ) : null}

                {(isLearnResource || isComplianceGuide || isFaq || isBlog) ? (
                  <div className="rounded-[24px] border border-border/70 bg-muted/20 p-4">
                    <p className="text-sm font-semibold text-foreground">Related content and support assets</p>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <Field label="Related learn" error={form.formState.errors.relatedLearn?.message}>
                        <Textarea {...form.register("relatedLearn")} rows={3} className="rounded-2xl" placeholder="One related learn URL or title per line" />
                      </Field>
                      <Field label="Related blog" error={form.formState.errors.relatedBlog?.message}>
                        <Textarea {...form.register("relatedBlog")} rows={3} className="rounded-2xl" placeholder="One related blog URL or title per line" />
                      </Field>
                      <Field label="Related FAQ" error={form.formState.errors.relatedFaq?.message}>
                        <Textarea {...form.register("relatedFaq")} rows={3} className="rounded-2xl" placeholder="One related FAQ URL or title per line" />
                      </Field>
                      <Field label="Related product" error={form.formState.errors.relatedProduct?.message}>
                        <Textarea {...form.register("relatedProduct")} rows={3} className="rounded-2xl" placeholder="One related product page per line" />
                      </Field>
                      <Field label="Download asset URL" error={form.formState.errors.downloadAssetUrl?.message}>
                        <Input {...form.register("downloadAssetUrl")} className="rounded-xl" placeholder="https://..." />
                      </Field>
                      <Field label="Download PDF URL" error={form.formState.errors.downloadPdfUrl?.message}>
                        <Input {...form.register("downloadPdfUrl")} className="rounded-xl" placeholder="https://..." />
                      </Field>
                      <Field label="Video support URL" error={form.formState.errors.videoSupportUrl?.message}>
                        <Input {...form.register("videoSupportUrl")} className="rounded-xl" placeholder="https://..." />
                      </Field>
                    </div>
                  </div>
                ) : null}

                {isBlog ? (
                  <div className="rounded-[24px] border border-border/70 bg-muted/20 p-4">
                    <p className="text-sm font-semibold text-foreground">Blog analytics, CTA, and media SEO</p>
                    <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <Field label="Image count" error={form.formState.errors.imageCount?.message}>
                        <Input type="number" {...form.register("imageCount")} className="rounded-xl" />
                      </Field>
                      <Field label="Video count" error={form.formState.errors.videoCount?.message}>
                        <Input type="number" {...form.register("videoCount")} className="rounded-xl" />
                      </Field>
                      <Field label="Table count" error={form.formState.errors.tableCount?.message}>
                        <Input type="number" {...form.register("tableCount")} className="rounded-xl" />
                      </Field>
                      <Field label="FAQ count" error={form.formState.errors.faqCount?.message}>
                        <Input type="number" {...form.register("faqCount")} className="rounded-xl" />
                      </Field>
                      <Field label="Internal link count" error={form.formState.errors.internalLinkCount?.message}>
                        <Input type="number" {...form.register("internalLinkCount")} className="rounded-xl" />
                      </Field>
                      <Field label="External link count" error={form.formState.errors.externalLinkCount?.message}>
                        <Input type="number" {...form.register("externalLinkCount")} className="rounded-xl" />
                      </Field>
                      <Field label="Broken link count" error={form.formState.errors.brokenLinkCount?.message}>
                        <Input type="number" {...form.register("brokenLinkCount")} className="rounded-xl" />
                      </Field>
                      <Field label="Views" error={form.formState.errors.views?.message}>
                        <Input type="number" {...form.register("views")} className="rounded-xl" />
                      </Field>
                      <Field label="CTR" error={form.formState.errors.ctr?.message}>
                        <Input {...form.register("ctr")} className="rounded-xl" placeholder="4.8%" />
                      </Field>
                      <Field label="Average time on page" error={form.formState.errors.avgTimeOnPage?.message}>
                        <Input {...form.register("avgTimeOnPage")} className="rounded-xl" placeholder="03:12" />
                      </Field>
                      <Field label="Scroll depth" error={form.formState.errors.scrollDepth?.message}>
                        <Input {...form.register("scrollDepth")} className="rounded-xl" placeholder="78%" />
                      </Field>
                      <Field label="CTA modes" error={form.formState.errors.ctaModes?.message}>
                        <Input {...form.register("ctaModes")} className="rounded-xl" placeholder="Book Demo, Contact Sales, Download Guide, Newsletter" />
                      </Field>
                    </div>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <label className="flex items-center gap-3 rounded-[20px] border border-border/70 bg-background px-4 py-3 text-sm text-foreground">
                        <input type="checkbox" {...form.register("tocEnabled")} className="h-4 w-4 rounded border-border" />
                        Table of contents enabled
                      </label>
                      <label className="flex items-center gap-3 rounded-[20px] border border-border/70 bg-background px-4 py-3 text-sm text-foreground">
                        <input type="checkbox" {...form.register("webpReady")} className="h-4 w-4 rounded border-border" />
                        WebP asset ready
                      </label>
                    </div>
                  </div>
                ) : null}

                <div className="grid gap-4 xl:grid-cols-2">
                  <PreviewCard title="Google preview" eyebrow={form.watch("canonicalUrl")} heading={form.watch("metaTitle")} description={form.watch("metaDescription")} />
                  <PreviewCard title="Mobile preview" eyebrow="Google mobile" heading={form.watch("metaTitle")} description={form.watch("metaDescription")} />
                  <PreviewCard title="Desktop preview" eyebrow="Google desktop" heading={form.watch("seoTitle")} description={form.watch("metaDescription")} />
                  <PreviewCard title="Facebook preview" eyebrow={form.watch("ogImage") || "Facebook"} heading={form.watch("ogTitle")} description={form.watch("ogDescription")} />
                  <PreviewCard title="Twitter preview" eyebrow={form.watch("twitterImage") || "Twitter"} heading={form.watch("twitterTitle")} description={form.watch("twitterDescription")} />
                  <PreviewCard title="LinkedIn preview" eyebrow={form.watch("linkedInImage") || "LinkedIn"} heading={form.watch("linkedInTitle")} description={form.watch("linkedInDescription")} />
                  <PreviewCard title="WhatsApp preview" eyebrow={form.watch("whatsAppImage") || "WhatsApp"} heading={form.watch("whatsAppTitle")} description={form.watch("whatsAppDescription")} />
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <DetailChip label="Overall score" value={`${selected.overallScore}/100`} />
                  <DetailChip label="Technical score" value={`${selected.technicalScore}/100`} />
                  <DetailChip label="Content score" value={`${selected.contentScore}/100`} />
                  <DetailChip label="AI SEO score" value={`${selected.aiScore}/100`} />
                </div>

                <div className="rounded-[24px] border border-amber-500/20 bg-amber-500/8 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-300">
                    <AlertCircle className="h-4 w-4" />
                    Current warnings
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {selectedWarnings.map((warning) => (
                      <li key={warning}>- {warning}</li>
                    ))}
                  </ul>
                </div>

                <Button type="submit" className="rounded-xl">Save SEO settings</Button>
              </form>
            ) : (
              <EmptyState title="No SEO records found" description="Add a page or content item to start managing metadata and schema." />
            )}
          </AdminSection>

          <AdminSection
            title="Bulk SEO & developer tools"
            description="Bulk meta, schema, alt text, import/export CSV, autosave visibility, and version-friendly workflows."
          >
            <div className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Field label="Bulk target">
                  <select
                    value={bulkTarget}
                    onChange={(event) => setBulkTarget(event.target.value as "All" | ContentType)}
                    className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm"
                  >
                    <option value="All">All SEO records</option>
                    <option value="Page">Pages</option>
                    <option value="Blog">Blogs</option>
                    <option value="Learn Resource">Learn resources</option>
                    <option value="Compliance Guide">Compliance guides</option>
                    <option value="FAQ">FAQs</option>
                  </select>
                </Field>
                <Field label="Meta prefix">
                  <Input value={bulkMetaPrefix} onChange={(event) => setBulkMetaPrefix(event.target.value)} className="rounded-xl" placeholder="Altroz HR |" />
                </Field>
                <Field label="Meta suffix">
                  <Input value={bulkMetaSuffix} onChange={(event) => setBulkMetaSuffix(event.target.value)} className="rounded-xl" placeholder="| Altroz HR" />
                </Field>
                <div className="rounded-[20px] border border-border/70 bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
                  Target records
                  <div className="mt-1 font-medium text-foreground">{filteredRecords.length}</div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Field label="Bulk schema type">
                  <Input value={bulkSchemaType} onChange={(event) => setBulkSchemaType(event.target.value)} className="rounded-xl" />
                </Field>
                <Field label="Bulk robots">
                  <select
                    value={bulkRobots}
                    onChange={(event) => setBulkRobots(event.target.value as SeoRecord["robots"])}
                    className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm"
                  >
                    <option value="index, follow">index, follow</option>
                    <option value="noindex, follow">noindex, follow</option>
                    <option value="index, nofollow">index, nofollow</option>
                    <option value="noindex, nofollow">noindex, nofollow</option>
                  </select>
                </Field>
                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 w-full rounded-xl"
                    onClick={() => {
                      filteredRecords.forEach((record) => {
                        updateSeoRecord(record.id, {
                          metaTitle: [bulkMetaPrefix, record.metaTitle, bulkMetaSuffix].filter(Boolean).join(" ").replace(/\s+/g, " ").trim(),
                          seoTitle: [bulkMetaPrefix, record.seoTitle, bulkMetaSuffix].filter(Boolean).join(" ").replace(/\s+/g, " ").trim(),
                        });
                      });
                    }}
                  >
                    Apply bulk meta
                  </Button>
                </div>
                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 w-full rounded-xl"
                    onClick={() => {
                      filteredRecords.forEach((record) => {
                        updateSeoRecord(record.id, {
                          schemaTypes: Array.from(new Set([...record.schemaTypes, bulkSchemaType].filter(Boolean))),
                          robots: bulkRobots,
                        });
                      });
                    }}
                  >
                    Apply schema & robots
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="outline" className="rounded-xl" onClick={bulkFillFeaturedAltText}>
                  Bulk alt text
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl"
                  onClick={() =>
                    downloadTextFile(
                      `altroz-seo-export-${bulkTarget.toLowerCase().replace(/\s+/g, "-")}.csv`,
                      buildSeoCsvExport(filteredRecords),
                      "text/csv;charset=utf-8;",
                    )
                  }
                >
                  Export CSV
                </Button>
                <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  Autosave {store.siteSettings.autoSave ? "enabled" : "disabled"} in settings
                </div>
              </div>

              <Field label="Import CSV">
                <Textarea
                  value={csvImportValue}
                  onChange={(event) => setCsvImportValue(event.target.value)}
                  rows={8}
                  className="rounded-2xl font-mono text-xs"
                  placeholder={"slug,metaTitle,metaDescription,focusKeyword,schemaTypes,robots,canonicalUrl\n/pricing,HRMS Pricing Plans,Compare plans,HRMS pricing,Product|Offer|FAQPage,index|follow,https://hrmswebsite-gamma.vercel.app/pricing"}
                />
              </Field>
              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  className="rounded-xl"
                  onClick={() => importSeoRows(parseSeoCsvImport(csvImportValue))}
                >
                  Apply CSV import
                </Button>
                <p className="text-sm text-muted-foreground">
                  Supported columns: slug, metaTitle, metaDescription, focusKeyword, schemaTypes, robots, canonicalUrl.
                </p>
              </div>
            </div>
          </AdminSection>

          <AdminSection title="AI SEO suggestions" description="Actionable recommendations generated from the current record state and the client SRS fields.">
            <div className="space-y-3">
              {buildAiSeoSuggestions(selected, linkedContent).map((suggestion, index) => (
                <div key={`${suggestion}-${index}`} className="rounded-[24px] border border-border/70 bg-muted/20 p-4">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <p className="text-sm leading-7 text-foreground">{suggestion}</p>
                  </div>
                </div>
              ))}
            </div>
          </AdminSection>

          <AdminSection title="Version history" description="Recent SEO saves and imports for review.">
            <div className="space-y-3">
              {seoVersionHistory.length ? (
                seoVersionHistory.map((activity) => (
                  <div key={activity.id} className="rounded-[24px] border border-border/70 bg-muted/20 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">{activity.user} - {activity.action}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{activity.description}</p>
                      </div>
                      <StatusBadge value={activity.module} />
                    </div>
                    <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">{activity.dateTime}</p>
                  </div>
                ))
              ) : (
                <EmptyState title="No version history yet" description="SEO saves, imports, and bulk updates will appear here." />
              )}
            </div>
          </AdminSection>
        </div>
      </div>
    </div>
  );
}

export function AdminMediaPage() {
  const { addMediaAssets, store, updateMediaAsset } = useAdminStore();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(store.media[0]?.id ?? "");
  const filtered = useMemo(
    () => store.media.filter((item) => `${item.name} ${item.altText} ${item.usage}`.toLowerCase().includes(query.toLowerCase())),
    [query, store.media],
  );
  const selectedAsset =
    filtered.find((item) => item.id === selectedId) ??
    store.media.find((item) => item.id === selectedId) ??
    filtered[0] ??
    store.media[0];
  const form = useForm<z.infer<typeof mediaFormSchema>>({
    resolver: zodResolver(mediaFormSchema),
    defaultValues: {
      altText: selectedAsset?.altText ?? "",
      title: selectedAsset?.title ?? "",
      caption: selectedAsset?.caption ?? "",
      description: selectedAsset?.description ?? "",
      usage: selectedAsset?.usage ?? "",
    },
  });

  useEffect(() => {
    if (!filtered.find((item) => item.id === selectedId)) {
      setSelectedId(filtered[0]?.id ?? store.media[0]?.id ?? "");
    }
  }, [filtered, selectedId, store.media]);

  useEffect(() => {
    form.reset({
      altText: selectedAsset?.altText ?? "",
      title: selectedAsset?.title ?? "",
      caption: selectedAsset?.caption ?? "",
      description: selectedAsset?.description ?? "",
      usage: selectedAsset?.usage ?? "",
    });
  }, [form, selectedAsset]);

  const dropzone = useDropzone({
    onDrop: addMediaAssets,
    multiple: true,
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard title="Media assets" value={store.media.length} meta="Images, PDFs, videos and docs" />
        <AdminMetricCard title="Images" value={store.media.filter((item) => item.type === "Image").length} meta="Image SEO library" accent="green" />
        <AdminMetricCard title="PDFs" value={store.media.filter((item) => item.type === "PDF").length} meta="Downloadable assets" accent="amber" />
        <AdminMetricCard
          title="WebP ready"
          value={store.media.filter((item) => item.mimeType === "image/webp" || item.name.toLowerCase().endsWith(".webp")).length}
          meta="Assets already optimized for web"
          accent="blue"
        />
      </div>

      <AdminSection
        title="Media library"
        description="Upload and organize public-site assets with metadata, usage notes, and future CDN readiness."
        actions={<Input value={query} onChange={(event) => setQuery(event.target.value)} className="max-w-xs rounded-xl" placeholder="Search assets" />}
      >
        <div
          {...dropzone.getRootProps()}
          className={cn(
            "grid min-h-[220px] place-items-center rounded-[28px] border border-dashed border-primary/30 bg-primary/5 p-8 text-center transition",
            dropzone.isDragActive && "border-primary bg-primary/10",
          )}
        >
          <input {...dropzone.getInputProps()} />
          <div>
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-3xl bg-primary/10 text-primary">
              {dropzone.isDragActive ? <UploadCloud className="h-8 w-8" /> : <ImagePlus className="h-8 w-8" />}
            </div>
            <h3 className="text-xl font-semibold text-foreground">Drop files here or click to upload</h3>
            <p className="mt-2 text-sm text-muted-foreground">Images, PDFs, documents, videos, and social preview cards are supported.</p>
          </div>
        </div>
      </AdminSection>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <AdminSection title="Asset list" description="Select any asset to edit image SEO and usage metadata.">
          <div className="space-y-3">
            {filtered.map((asset) => (
              <button
                key={asset.id}
                type="button"
                onClick={() => setSelectedId(asset.id)}
                className={cn(
                  "w-full rounded-[24px] border px-4 py-4 text-left transition",
                  selectedAsset?.id === asset.id ? "border-primary bg-primary/5 shadow-sm" : "border-border/70 hover:bg-muted/40",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-foreground">{asset.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{asset.usage}</p>
                  </div>
                  <StatusBadge value={asset.type} />
                </div>
                <div className="mt-3 grid gap-2 text-sm">
                  <DetailChip label="Size" value={asset.sizeLabel} />
                  <DetailChip label="Dimensions" value={asset.dimensions} />
                  <DetailChip label="WebP" value={asset.mimeType === "image/webp" || asset.name.toLowerCase().endsWith(".webp") ? "Yes" : "No"} />
                </div>
              </button>
            ))}
          </div>
        </AdminSection>

        <AdminSection
          title={selectedAsset ? `Edit ${selectedAsset.name}` : "Asset details"}
          description="Alt text, title, caption, description, and usage are editable for client-friendly image SEO management."
        >
          {selectedAsset ? (
            <form
              className="space-y-5"
              onSubmit={form.handleSubmit((values) => {
                updateMediaAsset(selectedAsset.id, values);
              })}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="aspect-[16/10] rounded-[20px] border border-border/70 bg-muted/35" />
                <div className="grid gap-2 text-sm">
                  <DetailChip label="Type" value={selectedAsset.type} />
                  <DetailChip label="Size" value={selectedAsset.sizeLabel} />
                  <DetailChip label="Dimensions" value={selectedAsset.dimensions} />
                  <DetailChip label="Uploaded" value={selectedAsset.uploadedAt} />
                  <DetailChip label="Uploaded by" value={selectedAsset.uploadedBy} />
                  <DetailChip
                    label="WebP ready"
                    value={selectedAsset.mimeType === "image/webp" || selectedAsset.name.toLowerCase().endsWith(".webp") ? "Yes" : "No"}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Alt text" error={form.formState.errors.altText?.message}>
                  <Input {...form.register("altText")} className="rounded-xl" />
                </Field>
                <Field label="Title" error={form.formState.errors.title?.message}>
                  <Input {...form.register("title")} className="rounded-xl" />
                </Field>
              </div>

              <Field label="Caption" error={form.formState.errors.caption?.message}>
                <Input {...form.register("caption")} className="rounded-xl" />
              </Field>

              <Field label="Description" error={form.formState.errors.description?.message}>
                <Textarea {...form.register("description")} rows={4} className="rounded-2xl" />
              </Field>

              <Field label="Usage" error={form.formState.errors.usage?.message}>
                <Input {...form.register("usage")} className="rounded-xl" />
              </Field>

              <div className="flex flex-wrap gap-3">
                <Button type="submit" className="rounded-xl">Save asset metadata</Button>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => navigator.clipboard.writeText(selectedAsset.url)}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy file URL
                </Button>
              </div>
            </form>
          ) : (
            <EmptyState title="No assets found" description="Upload or search assets to start editing metadata." />
          )}
        </AdminSection>
      </div>
    </div>
  );
}

export function AdminInboxPage({ mode }: { mode: "demo" | "contact" | "newsletter" }) {
  const { store, updateCampaignStatus, updateLeadAssignee, updateLeadStatus, updateSubscriberStatus } = useAdminStore();

  if (mode === "newsletter") {
    return (
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <AdminSection title="Newsletter subscribers" description="Track subscription health and audience quality.">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last campaign</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {store.newsletterSubscribers.map((subscriber) => (
                <TableRow key={subscriber.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{subscriber.name}</p>
                      <p className="text-xs text-muted-foreground">{subscriber.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{subscriber.source}</TableCell>
                  <TableCell>
                    <select
                      value={subscriber.status}
                      onChange={(event) => updateSubscriberStatus(subscriber.id, event.target.value as SubscriberStatus)}
                      className="rounded-xl border border-border bg-background px-3 py-2 text-sm"
                    >
                      {subscriberStatuses.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell>{subscriber.lastCampaign}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AdminSection>

        <AdminSection title="Campaign queue" description="Drafts, schedules, and recent send performance.">
          <div className="space-y-4">
            {store.emailCampaigns.map((campaign) => (
              <div key={campaign.id} className="rounded-[24px] border border-border/70 bg-muted/20 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-foreground">{campaign.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{campaign.subject}</p>
                  </div>
                  <StatusBadge value={campaign.status} />
                </div>
                <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
                  <p>Audience: {campaign.audience}</p>
                  <p>Scheduled: {campaign.scheduledFor}</p>
                  <p>Sent/Open/Clicks: {campaign.sentCount} / {campaign.openCount} / {campaign.clickCount}</p>
                </div>
                <select
                  value={campaign.status}
                  onChange={(event) => updateCampaignStatus(campaign.id, event.target.value as typeof campaign.status)}
                  className="mt-4 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm"
                >
                  {["Draft", "Scheduled", "Sending", "Sent"].map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </AdminSection>
      </div>
    );
  }

  const records = store.leads.filter((lead) => lead.kind === (mode === "demo" ? "Demo Request" : "Contact Enquiry"));

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <AdminSection title={mode === "demo" ? "Demo requests" : "Contact enquiries"} description="Update lead status, ownership, and next actions from one inbox.">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lead</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.company} · {lead.email}</p>
                  </div>
                </TableCell>
                <TableCell>{lead.source}</TableCell>
                <TableCell>
                  <select
                    value={lead.status}
                    onChange={(event) => updateLeadStatus(lead.id, event.target.value as LeadRecord["status"])}
                    className="rounded-xl border border-border bg-background px-3 py-2 text-sm"
                  >
                    {leadStatuses.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </TableCell>
                <TableCell>
                  <select
                    value={lead.assignedTo}
                    onChange={(event) => updateLeadAssignee(lead.id, event.target.value)}
                    className="rounded-xl border border-border bg-background px-3 py-2 text-sm"
                  >
                    {["Unassigned", ...store.users.map((user) => user.name)].map((name) => (
                      <option key={name}>{name}</option>
                    ))}
                  </select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AdminSection>

      <AdminSection title="Lead notes" description="Use these details during follow-up and qualification.">
        <div className="space-y-4">
          {records.map((lead) => (
            <div key={lead.id} className="rounded-[24px] border border-border/70 bg-muted/20 p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium">{lead.name}</p>
                <StatusBadge value={lead.status} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{lead.message}</p>
              <div className="mt-3 grid gap-2 text-sm">
                <DetailChip label="Product" value={lead.product} />
                <DetailChip label="UTM" value={`${lead.utmSource} · ${lead.utmCampaign}`} />
              </div>
            </div>
          ))}
        </div>
      </AdminSection>
    </div>
  );
}

export function AdminBulkEmailPage() {
  const { store } = useAdminStore();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard title="Campaigns" value={store.emailCampaigns.length} meta="Draft, scheduled, and sent" />
        <AdminMetricCard title="Subscribers" value={store.newsletterSubscribers.length} meta="Current audience pool" accent="green" />
        <AdminMetricCard title="Scheduled sends" value={store.emailCampaigns.filter((item) => item.status === "Scheduled").length} meta="Upcoming campaigns" accent="amber" />
        <AdminMetricCard title="Average opens" value="50%" meta="Across recent sent campaigns" accent="blue" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AdminSection title="Campaign pipeline" description="Move from draft to scheduled to sent without losing the editorial context.">
          <div className="grid gap-4 xl:grid-cols-3">
            {["Draft", "Scheduled", "Sent"].map((status) => (
              <div key={status} className="rounded-[24px] border border-border/70 bg-muted/20 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-medium text-foreground">{status}</p>
                  <StatusBadge value={status} />
                </div>
                <div className="space-y-3">
                  {store.emailCampaigns
                    .filter((campaign) => campaign.status === status)
                    .map((campaign) => (
                      <div key={campaign.id} className="rounded-2xl bg-background p-3 shadow-sm">
                        <p className="font-medium">{campaign.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{campaign.subject}</p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </AdminSection>

        <AdminSection title="Audience workflow" description="Keep campaigns connected to newsletter and lead acquisition modules.">
          <div className="space-y-4">
            <WorkflowBullet icon={Send} label="Send test emails before campaigns go live" />
            <WorkflowBullet icon={MailCheck} label="Segment audiences using newsletter status and lead source" />
            <WorkflowBullet icon={CalendarDays} label="Schedule campaigns alongside blog and guide publication dates" />
            <WorkflowBullet icon={ArrowUpRight} label="Track clicks back to pricing, demo, and support journeys" />
          </div>
        </AdminSection>
      </div>
    </div>
  );
}

export function AdminTechnicalSeoPage({ defaultTab }: { defaultTab: "redirects" | "sitemap" }) {
  const {
    addRedirect,
    addRedirectBatch,
    regenerateSitemap,
    restoreRobotsDefault,
    saveRobotsTxt,
    store,
    toggleRedirect,
  } = useAdminStore();
  const [robotsValue, setRobotsValue] = useState(store.robotsTxt);
  const [bulkRedirectValue, setBulkRedirectValue] = useState("");
  const redirectForm = useForm<z.infer<typeof redirectSchema>>({
    resolver: zodResolver(redirectSchema),
    defaultValues: {
      sourceUrl: "",
      destinationUrl: "",
      type: "301",
    },
  });

  useEffect(() => {
    setRobotsValue(store.robotsTxt);
  }, [store.robotsTxt]);

  useUnsavedChangesWarning(robotsValue !== store.robotsTxt);

  return (
    <AdminSection title="Technical SEO management" description="Manage redirects, sitemap generation, robots rules, and broken-link cleanup in one place.">
      <Tabs defaultValue={defaultTab} className="space-y-5">
        <TabsList className="h-auto flex-wrap rounded-2xl">
          <TabsTrigger value="redirects" className="rounded-xl">Redirects</TabsTrigger>
          <TabsTrigger value="sitemap" className="rounded-xl">Sitemap</TabsTrigger>
          <TabsTrigger value="robots" className="rounded-xl">robots.txt</TabsTrigger>
          <TabsTrigger value="broken-links" className="rounded-xl">Broken links</TabsTrigger>
        </TabsList>

        <TabsContent value="redirects" className="space-y-6">
          <form
            className="grid gap-4 rounded-[24px] border border-border/70 bg-muted/20 p-4 md:grid-cols-4"
            onSubmit={redirectForm.handleSubmit((values) => {
              addRedirect({
                sourceUrl: values.sourceUrl,
                destinationUrl: values.destinationUrl,
                type: Number(values.type) as RedirectRecord["type"],
                active: true,
              });
              redirectForm.reset();
            })}
          >
            <Field label="Source URL" error={redirectForm.formState.errors.sourceUrl?.message}>
              <Input {...redirectForm.register("sourceUrl")} className="rounded-xl" placeholder="/old-page" />
            </Field>
            <Field label="Destination URL" error={redirectForm.formState.errors.destinationUrl?.message}>
              <Input {...redirectForm.register("destinationUrl")} className="rounded-xl" placeholder="/new-page" />
            </Field>
            <Field label="Redirect type" error={redirectForm.formState.errors.type?.message}>
              <select {...redirectForm.register("type")} className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm">
                <option value="301">301 permanent</option>
                <option value="302">302 temporary</option>
              </select>
            </Field>
            <div className="flex items-end">
              <Button type="submit" className="h-10 w-full rounded-xl">Add redirect</Button>
            </div>
          </form>

          <div className="rounded-[24px] border border-border/70 bg-muted/20 p-4">
            <p className="text-sm font-semibold text-foreground">Bulk redirect import</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add one redirect per line in the format `/old-url,/new-url,301`
            </p>
            <Textarea
              value={bulkRedirectValue}
              onChange={(event) => setBulkRedirectValue(event.target.value)}
              rows={6}
              className="mt-4 rounded-2xl font-mono text-xs"
              placeholder={"/old-page,/new-page,301\n/old-blog,/resources/blog/new-blog,302"}
            />
            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                type="button"
                className="rounded-xl"
                onClick={() => {
                  const redirects = parseBulkRedirectLines(bulkRedirectValue);
                  addRedirectBatch(redirects);
                  if (redirects.length) {
                    setBulkRedirectValue("");
                  }
                }}
              >
                Import redirects
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Hits</TableHead>
                <TableHead>State</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {store.redirects.map((redirect) => (
                <TableRow key={redirect.id}>
                  <TableCell>{redirect.sourceUrl}</TableCell>
                  <TableCell>{redirect.destinationUrl}</TableCell>
                  <TableCell>{redirect.type}</TableCell>
                  <TableCell>{redirect.hits}</TableCell>
                  <TableCell>
                    <button type="button" onClick={() => toggleRedirect(redirect.id)}>
                      <StatusBadge value={redirect.active ? "Active" : "Paused"} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="sitemap" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <AdminMetricCard title="Status" value={store.sitemap.status} meta={`Last generated ${store.sitemap.lastGenerated}`} />
            <AdminMetricCard title="Pages" value={store.sitemap.includedPages} meta="Included in XML sitemap" accent="green" />
            <AdminMetricCard title="Blogs" value={store.sitemap.includedBlogs} meta="Included in XML sitemap" accent="amber" />
            <AdminMetricCard title="Resources" value={store.sitemap.includedResources} meta="Learn + compliance + FAQ" accent="blue" />
            <AdminMetricCard title="HTML sitemap" value="Ready" meta="/sitemap available for crawlers" accent="green" />
            <AdminMetricCard title="Canonicals" value={store.seo.length} meta="Managed from SEO panel" accent="blue" />
            <AdminMetricCard title="Page speed" value="87" meta="Snapshot for SEO review" accent="amber" />
            <AdminMetricCard title="CWV status" value="Good" meta="LCP, CLS and INP under review" accent="green" />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button className="rounded-xl" onClick={regenerateSitemap}>
              <Globe2 className="mr-2 h-4 w-4" />
              Regenerate sitemap
            </Button>
            <Button variant="outline" className="rounded-xl">
              <ExternalLink className="mr-2 h-4 w-4" />
              Download XML
            </Button>
            <Button variant="outline" className="rounded-xl">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open HTML sitemap
            </Button>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-[24px] border border-border/70 bg-muted/20 p-4">
              <p className="text-sm font-semibold text-foreground">Canonical management</p>
              <div className="mt-4 space-y-3">
                {store.seo.slice(0, 6).map((record) => (
                  <div key={record.id} className="rounded-2xl bg-background p-3">
                    <p className="text-sm font-medium text-foreground">{record.slug}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{record.canonicalUrl}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-border/70 bg-muted/20 p-4">
              <p className="text-sm font-semibold text-foreground">Search and analytics integrations</p>
              <div className="mt-4 space-y-3">
                {store.integrations.map((integration) => (
                  <div key={integration.id} className="rounded-2xl bg-background p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-foreground">{integration.label}</p>
                      <StatusBadge value={integration.status} />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{integration.helper}: {integration.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="robots" className="space-y-4">
          <Textarea value={robotsValue} onChange={(event) => setRobotsValue(event.target.value)} rows={10} className="rounded-[24px]" />
          <div className="flex flex-wrap gap-3">
            <Button className="rounded-xl" onClick={() => saveRobotsTxt(robotsValue)}>Save robots.txt</Button>
            <Button variant="outline" className="rounded-xl" onClick={restoreRobotsDefault}>Restore default</Button>
          </div>
        </TabsContent>

        <TabsContent value="broken-links">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source page</TableHead>
                <TableHead>Broken URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fix</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {store.brokenLinks.map((link) => (
                <TableRow key={link.id}>
                  <TableCell>{link.sourcePage}</TableCell>
                  <TableCell>{link.brokenUrl}</TableCell>
                  <TableCell>{link.httpStatus}</TableCell>
                  <TableCell><StatusBadge value={link.fixStatus} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </AdminSection>
  );
}

export function AdminAnalyticsPage() {
  const { store } = useAdminStore();

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <AdminSection title="Organic growth trend" description="Traffic and publishing output from the frontend-integrated admin store.">
        <div className="h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={store.analytics}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.22)" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="organicTraffic" fill="#0b5cff" radius={[8, 8, 0, 0]} />
              <Bar dataKey="pagesPublished" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </AdminSection>

      <AdminSection title="SEO score distribution" description="How content is distributed across current score bands.">
        <div className="space-y-4">
          {store.seoDistribution.map((band) => (
            <div key={band.label}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>{band.label}</span>
                <span>{band.count}</span>
              </div>
              <div className="h-3 rounded-full bg-muted">
                <div className="h-3 rounded-full bg-primary" style={{ width: `${Math.min(100, band.count * 8)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </AdminSection>
    </div>
  );
}

export function AdminIntegrationsPage() {
  const { store, updateIntegration } = useAdminStore();

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {store.integrations.map((integration) => (
        <AdminSection key={integration.id} title={integration.label} description={integration.helper}>
          <div className="space-y-4">
            <div className="rounded-2xl border border-border/70 bg-muted/20 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Saved value</p>
              <p className="mt-2 text-sm font-medium text-foreground">{integration.value}</p>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-border/70 px-4 py-3">
              <span className="text-sm font-medium">Status</span>
              <StatusBadge value={integration.status} />
            </div>
            <label className="flex items-center justify-between rounded-2xl border border-border/70 px-4 py-3 text-sm">
              Enable integration
              <input
                type="checkbox"
                checked={integration.enabled}
                onChange={(event) =>
                  updateIntegration(integration.id, {
                    enabled: event.target.checked,
                    status: event.target.checked ? "Connected" : "Not configured",
                  })
                }
                className="h-4 w-4 rounded border-border"
              />
            </label>
            <p className="text-xs text-muted-foreground">Last synchronized: {integration.lastSync}</p>
          </div>
        </AdminSection>
      ))}
    </div>
  );
}

export function AdminUsersPage() {
  const { store, updateUserStatus } = useAdminStore();

  return (
    <AdminSection title="User management" description="Role-aware access for super admins, admins, SEO, writers, and editors.">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last login</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {store.users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 font-semibold text-primary">{user.avatar}</div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell><StatusBadge value={user.role} /></TableCell>
              <TableCell>
                <select
                  value={user.status}
                  onChange={(event) => updateUserStatus(user.id, event.target.value as typeof user.status)}
                  className="rounded-xl border border-border bg-background px-3 py-2 text-sm"
                >
                  {["Active", "Pending", "Disabled"].map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </TableCell>
              <TableCell>{user.lastLogin}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminSection>
  );
}

export function AdminActivityPage() {
  const { store } = useAdminStore();
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => store.activities.filter((item) => `${item.user} ${item.action} ${item.module} ${item.description}`.toLowerCase().includes(query.toLowerCase())),
    [query, store.activities],
  );

  return (
    <AdminSection
      title="Activity logs"
      description="Searchable audit trail across authentication, publishing, SEO, and lead actions."
      actions={<Input value={query} onChange={(event) => setQuery(event.target.value)} className="max-w-xs rounded-xl" placeholder="Search logs" />}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Module</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell>{activity.user}</TableCell>
              <TableCell>{activity.action}</TableCell>
              <TableCell>{activity.module}</TableCell>
              <TableCell>{activity.description}</TableCell>
              <TableCell>{activity.dateTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminSection>
  );
}

export function AdminSettingsPage() {
  const { store, updateSiteSettings } = useAdminStore();
  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: store.siteSettings,
  });

  useEffect(() => {
    form.reset(store.siteSettings);
  }, [form, store.siteSettings]);

  useUnsavedChangesWarning(form.formState.isDirty);

  return (
    <AdminSection
      title="Settings"
      description="Default SEO, contact routing, and workspace preferences for the public site and admin experience."
      actions={<div className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{store.siteSettings.autoSave ? "Autosave enabled" : "Manual save mode"}</div>}
    >
      <form
        className="space-y-5"
        onSubmit={form.handleSubmit((values) => {
          updateSiteSettings(values);
        })}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Company name" error={form.formState.errors.companyName?.message}>
            <Input {...form.register("companyName")} className="rounded-xl" />
          </Field>
          <Field label="Support email" error={form.formState.errors.supportEmail?.message}>
            <Input {...form.register("supportEmail")} className="rounded-xl" />
          </Field>
          <Field label="Sales email" error={form.formState.errors.salesEmail?.message}>
            <Input {...form.register("salesEmail")} className="rounded-xl" />
          </Field>
          <Field label="Canonical base URL" error={form.formState.errors.canonicalBaseUrl?.message}>
            <Input {...form.register("canonicalBaseUrl")} className="rounded-xl" />
          </Field>
        </div>
        <Field label="Default meta description" error={form.formState.errors.defaultMetaDescription?.message}>
          <Textarea {...form.register("defaultMetaDescription")} rows={4} className="rounded-2xl" />
        </Field>
        <div className="grid gap-3 md:grid-cols-2">
          <label className="flex items-center justify-between rounded-2xl border border-border/70 px-4 py-3 text-sm">
            Enable autosave
            <input type="checkbox" {...form.register("autoSave")} className="h-4 w-4 rounded border-border" />
          </label>
          <label className="flex items-center justify-between rounded-2xl border border-border/70 px-4 py-3 text-sm">
            Default dark mode
            <input type="checkbox" {...form.register("darkModeDefault")} className="h-4 w-4 rounded border-border" />
          </label>
        </div>
        <Button type="submit" className="rounded-xl">Save settings</Button>
      </form>
    </AdminSection>
  );
}

function buildEmptyContentRecord(type: ContentType, owner: string): ContentRecord {
  const slugByType: Record<ContentType, string> = {
    Page: "/new-page",
    Blog: "/resources/blog/new-blog",
    "Learn Resource": "/resources/learn/new-resource",
    "Compliance Guide": "/resources/compliance-guides/new-guide",
    FAQ: "/resources/faq/new-faq",
  };

  return {
    id: `draft-${type.toLowerCase().replace(/\s+/g, "-")}`,
    type,
    title: "",
    slug: slugByType[type],
    status: "Draft",
    owner,
    updatedAt: "2026-08-04 12:30",
    publishedAt: "",
    summary: "",
    focusKeyword: "",
    seoScore: 70,
    trafficShare: 0,
    readingTime: "5 min",
    sections: 3,
    tags: [],
    category: "",
    author: owner,
    featuredImage: "",
    featuredImageAlt: "",
    heroTitle: "",
    heroDescription: "",
    ctaTitle: "Book a demo",
    ctaDescription: "Talk to our team about your workflow, content, and SEO goals.",
    ctaButtonText: "Schedule demo",
    ctaButtonUrl: "",
  };
}

function getContentActionLabel(type: ContentType) {
  switch (type) {
    case "Compliance Guide":
      return "guide";
    case "Learn Resource":
      return "resource";
    default:
      return type.toLowerCase();
  }
}

function getContentWorkspaceDescription(type: ContentType) {
  switch (type) {
    case "Page":
      return "Manage website pages like Home, Pricing, and Contact with add, edit, and delete controls.";
    case "Learn Resource":
      return "Add, edit, and retire learning resources without leaving the admin workspace.";
    case "Compliance Guide":
      return "Maintain compliance guides with full create, edit, and delete controls for your client team.";
    case "FAQ":
      return "Keep FAQ content current with quick create, edit, and delete actions.";
    default:
      return "Filter, review status, and keep publishing momentum moving.";
  }
}

function contentRecordToForm(record?: ContentRecord) {
  return {
    title: record?.title ?? "",
    slug: record?.slug ?? "",
    category: record?.category ?? "",
    author: record?.author ?? record?.owner ?? "",
    summary: record?.summary ?? "",
    focusKeyword: record?.focusKeyword ?? "",
    owner: record?.owner ?? "",
    readingTime: record?.readingTime ?? "",
    sections: record?.sections ?? 1,
    seoScore: record?.seoScore ?? 0,
    trafficShare: record?.trafficShare ?? 0,
    status: record?.status ?? "Draft",
    publishedAt: record?.publishedAt ?? "",
    tags: record?.tags.join(", ") ?? "",
    featuredImage: record?.featuredImage ?? "",
    featuredImageAlt: record?.featuredImageAlt ?? "",
    heroTitle: record?.heroTitle ?? record?.title ?? "",
    heroDescription: record?.heroDescription ?? record?.summary ?? "",
    ctaTitle: record?.ctaTitle ?? "Book a demo",
    ctaDescription: record?.ctaDescription ?? "Talk to our team about your workflow and SEO goals.",
    ctaButtonText: record?.ctaButtonText ?? "Schedule demo",
    ctaButtonUrl: record?.ctaButtonUrl ?? "",
  };
}

function joinCsvValues(values?: string[]) {
  return values?.join(", ") ?? "";
}

function joinLineValues(values?: string[]) {
  return values?.join("\n") ?? "";
}

function splitCsvValues(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitLineValues(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function csvEscape(value: string | number | undefined) {
  const text = String(value ?? "");
  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function buildSeoCsvExport(records: SeoRecord[]) {
  const headers = [
    "slug",
    "metaTitle",
    "metaDescription",
    "focusKeyword",
    "schemaTypes",
    "robots",
    "canonicalUrl",
  ];
  const rows = records.map((record) =>
    [
      record.slug,
      record.metaTitle,
      record.metaDescription,
      record.focusKeyword,
      record.schemaTypes.join("|"),
      record.robots,
      record.canonicalUrl,
    ]
      .map(csvEscape)
      .join(","),
  );

  return [headers.join(","), ...rows].join("\n");
}

function downloadTextFile(filename: string, content: string, mimeType: string) {
  if (typeof window === "undefined") {
    return;
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function parseCsvLine(line: string) {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];

    if (character === '"') {
      if (inQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (character === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += character;
  }

  values.push(current.trim());
  return values;
}

function parseSeoCsvImport(csvValue: string) {
  const lines = csvValue
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return [];
  }

  const headers = parseCsvLine(lines[0]);

  return lines.slice(1).map((line) => {
    const columns = parseCsvLine(line);
    const row = Object.fromEntries(headers.map((header, index) => [header, columns[index] ?? ""])) as Record<string, string>;
    const robotsValue = row.robots.replace(/\|/g, ", ").trim();

    return {
      slug: row.slug,
      metaTitle: row.metaTitle || undefined,
      metaDescription: row.metaDescription || undefined,
      focusKeyword: row.focusKeyword || undefined,
      schemaTypes: row.schemaTypes ? row.schemaTypes.split("|").map((item) => item.trim()).filter(Boolean) : undefined,
      robots:
        robotsValue === "index, follow" ||
        robotsValue === "noindex, follow" ||
        robotsValue === "index, nofollow" ||
        robotsValue === "noindex, nofollow"
          ? (robotsValue as SeoRecord["robots"])
          : undefined,
      canonicalUrl: row.canonicalUrl || undefined,
    };
  });
}

function parseBulkRedirectLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [sourceUrl = "", destinationUrl = "", type = "301"] = line.split(",").map((item) => item.trim());
      return {
        sourceUrl,
        destinationUrl,
        type: type === "302" ? 302 : 301,
        active: true,
      } as Omit<RedirectRecord, "id" | "createdAt" | "lastAccessed" | "hits">;
    })
    .filter((item) => item.sourceUrl && item.destinationUrl);
}

function buildAiSeoSuggestions(record?: SeoRecord, linkedContent?: ContentRecord) {
  if (!record) {
    return ["Select an SEO record to see AI-assisted recommendations."];
  }

  const suggestions: string[] = [];

  if (!record.schemaEnabled || !record.schemaJson?.trim()) {
    suggestions.push("Enable schema and add JSON-LD so search engines and AI answers can classify this page more reliably.");
  }
  if (!record.semanticKeywords?.length) {
    suggestions.push("Add semantic keywords to strengthen topical relevance beyond the focus keyword.");
  }
  if (!record.longTailKeywords?.length) {
    suggestions.push("Include long-tail keywords to capture more specific search intent and lower-competition queries.");
  }
  if (!record.peopleAlsoAsk?.length) {
    suggestions.push("Populate People Also Ask questions to improve AI answer coverage and FAQ-style visibility.");
  }
  if (linkedContent?.featuredImage && !linkedContent.featuredImageAlt?.trim()) {
    suggestions.push("Add featured image alt text so image SEO and accessibility are not left incomplete.");
  }
  if (record.entityType === "Blog" && !record.headingOutline?.trim()) {
    suggestions.push("Add the H1-H4 outline for this blog so heading structure and content optimization are trackable.");
  }
  if (record.entityType === "Learn Resource" && !record.videoSupportUrl && !record.downloadPdfUrl) {
    suggestions.push("For learn content, attach either a PDF or video support URL to improve resource completeness.");
  }
  if (record.entityType === "Compliance Guide" && !record.applicableRegion?.trim()) {
    suggestions.push("Add the applicable state or country so compliance guidance is clearer and more useful.");
  }
  if (record.entityType === "Page" && record.slug === "/pricing" && !record.pricingKeywords?.length) {
    suggestions.push("Add pricing keywords and comparison highlights so the pricing page targets higher-intent conversion queries.");
  }
  if (!record.aiOverview?.trim() || !record.chatgptSummary?.trim() || !record.geminiSummary?.trim()) {
    suggestions.push("Complete the AI Overview, ChatGPT summary, and Gemini summary fields for better generative-search readiness.");
  }

  if (!suggestions.length) {
    suggestions.push("This record has strong SEO coverage. Focus next on refreshing internal links, preview assets, and performance notes.");
  }

  return suggestions;
}

function buildSeoEditorDefaults(record?: SeoRecord, linkedContent?: ContentRecord) {
  const schemaTypes = record?.schemaTypes.join(", ") ?? "";
  return {
    seoTitle: record?.seoTitle ?? "",
    metaTitle: record?.metaTitle ?? "",
    metaDescription: record?.metaDescription ?? "",
    slug: record?.slug ?? "",
    canonicalUrl: record?.canonicalUrl ?? "",
    focusKeyword: record?.focusKeyword ?? "",
    publishDate: record?.publishDate ?? linkedContent?.publishedAt ?? "",
    readingTime: record?.readingTime ?? linkedContent?.readingTime ?? "",
    secondaryKeywords: joinCsvValues(record?.secondaryKeywords),
    longTailKeywords: joinCsvValues(record?.longTailKeywords),
    semanticKeywords: joinCsvValues(record?.semanticKeywords),
    lsiKeywords: joinCsvValues(record?.lsiKeywords),
    nlpKeywords: joinCsvValues(record?.nlpKeywords),
    relatedEntities: joinCsvValues(record?.relatedEntities),
    peopleAlsoAsk: joinLineValues(record?.peopleAlsoAsk),
    relatedSearches: joinLineValues(record?.relatedSearches),
    author: record?.author ?? linkedContent?.author ?? linkedContent?.owner ?? "Altroz HR Team",
    robots: record?.robots ?? "index, follow",
    ogTitle: record?.ogTitle ?? record?.metaTitle ?? "",
    ogDescription: record?.ogDescription ?? record?.metaDescription ?? "",
    ogImage: record?.ogImage ?? "",
    twitterImage: record?.twitterImage ?? record?.ogImage ?? "",
    twitterTitle: record?.twitterTitle ?? record?.ogTitle ?? record?.metaTitle ?? "",
    twitterDescription: record?.twitterDescription ?? record?.ogDescription ?? record?.metaDescription ?? "",
    linkedInTitle: record?.linkedInTitle ?? record?.ogTitle ?? record?.metaTitle ?? "",
    linkedInDescription: record?.linkedInDescription ?? record?.ogDescription ?? record?.metaDescription ?? "",
    linkedInImage: record?.linkedInImage ?? record?.ogImage ?? "",
    whatsAppTitle: record?.whatsAppTitle ?? record?.ogTitle ?? record?.metaTitle ?? "",
    whatsAppDescription: record?.whatsAppDescription ?? record?.ogDescription ?? record?.metaDescription ?? "",
    whatsAppImage: record?.whatsAppImage ?? record?.ogImage ?? "",
    schemaTypes,
    schemaEnabled: record?.schemaEnabled ?? true,
    schemaJson:
      record?.schemaJson ??
      JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": record?.schemaTypes[0] ?? "WebPage",
          name: record?.metaTitle ?? record?.seoTitle ?? "",
          url: record?.canonicalUrl ?? "",
        },
        null,
        2,
      ),
    searchIntent: record?.searchIntent ?? "Commercial investigation",
    contentIntent: record?.contentIntent ?? "Conversion",
    primaryEntity: record?.primaryEntity ?? record?.focusKeyword ?? "",
    aiSummary: record?.aiSummary ?? record?.metaDescription ?? "",
    aiOverview: record?.aiOverview ?? "",
    chatgptSummary: record?.chatgptSummary ?? "",
    geminiSummary: record?.geminiSummary ?? "",
    topicClusters: joinCsvValues(record?.topicClusters),
    difficultyLevel: record?.difficultyLevel ?? "Intermediate",
    relatedLearn: joinLineValues(record?.relatedLearn),
    relatedBlog: joinLineValues(record?.relatedBlog),
    relatedFaq: joinLineValues(record?.relatedFaq),
    relatedProduct: joinLineValues(record?.relatedProduct),
    internalLinks: joinLineValues(record?.internalLinks),
    downloadAssetUrl: record?.downloadAssetUrl ?? "",
    downloadPdfUrl: record?.downloadPdfUrl ?? "",
    videoSupportUrl: record?.videoSupportUrl ?? "",
    applicableRegion: record?.applicableRegion ?? "",
    lawType: record?.lawType ?? "",
    versionLabel: record?.versionLabel ?? "",
    faqCategory: record?.faqCategory ?? "",
    faqTags: joinCsvValues(record?.faqTags),
    searchOptionEnabled: record?.searchOptionEnabled ?? true,
    accordionEnabled: record?.accordionEnabled ?? true,
    heroSeoNotes: record?.heroSeoNotes ?? "",
    featureSectionSeo: record?.featureSectionSeo ?? "",
    bookDemoCtaLabel: record?.bookDemoCtaLabel ?? linkedContent?.ctaButtonText ?? "Book a demo",
    performanceNotes: record?.performanceNotes ?? "",
    pricingKeywords: joinCsvValues(record?.pricingKeywords),
    comparisonTableHighlights: record?.comparisonTableHighlights ?? "",
    conversionTrackingNotes: record?.conversionTrackingNotes ?? "",
    readabilityScore: record?.readabilityScore ?? 78,
    keywordDensity: record?.keywordDensity ?? "1.8%",
    headingOutline: record?.headingOutline ?? "",
    tocEnabled: record?.tocEnabled ?? true,
    wordCount: record?.wordCount ?? 0,
    imageCount: record?.imageCount ?? 0,
    videoCount: record?.videoCount ?? 0,
    tableCount: record?.tableCount ?? 0,
    faqCount: record?.faqCount ?? 0,
    internalLinkCount: record?.internalLinkCount ?? 0,
    externalLinkCount: record?.externalLinkCount ?? 0,
    brokenLinkCount: record?.brokenLinkCount ?? 0,
    webpReady: record?.webpReady ?? false,
    ctaModes: joinCsvValues(record?.ctaModes),
    views: record?.views ?? 0,
    ctr: record?.ctr ?? "",
    avgTimeOnPage: record?.avgTimeOnPage ?? "",
    scrollDepth: record?.scrollDepth ?? "",
    demoConversions: record?.demoConversions ?? 0,
  };
}

function seoRecordToForm(record?: SeoRecord) {
  return {
    seoTitle: record?.seoTitle ?? "",
    metaTitle: record?.metaTitle ?? "",
    metaDescription: record?.metaDescription ?? "",
    slug: record?.slug ?? "",
    canonicalUrl: record?.canonicalUrl ?? "",
    focusKeyword: record?.focusKeyword ?? "",
    secondaryKeywords: record?.secondaryKeywords.join(", ") ?? "",
    semanticKeywords: record?.semanticKeywords?.join(", ") ?? "",
    author: record?.author ?? "Altroz HR Team",
    robots: record?.robots ?? "index, follow",
    ogTitle: record?.ogTitle ?? "",
    ogDescription: record?.ogDescription ?? "",
    ogImage: record?.ogImage ?? "",
    twitterTitle: record?.twitterTitle ?? record?.ogTitle ?? record?.metaTitle ?? "",
    twitterDescription: record?.twitterDescription ?? record?.ogDescription ?? record?.metaDescription ?? "",
    schemaTypes: record?.schemaTypes.join(", ") ?? "",
    schemaEnabled: record?.schemaEnabled ?? true,
    schemaJson: record?.schemaJson ?? "",
    searchIntent: record?.searchIntent ?? "Commercial investigation",
    primaryEntity: record?.primaryEntity ?? record?.focusKeyword ?? "",
    aiSummary: record?.aiSummary ?? record?.metaDescription ?? "",
  };
}

function WorkflowBullet({ icon: Icon, label }: { icon: typeof Send; label: string }) {
  return (
    <div className="flex items-start gap-3 rounded-[24px] border border-border/70 bg-muted/20 p-4">
      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm leading-7 text-foreground">{label}</p>
    </div>
  );
}

function PreviewCard({
  title,
  eyebrow,
  heading,
  description,
}: {
  title: string;
  eyebrow: string;
  heading: string;
  description: string;
}) {
  return (
    <div className="rounded-[24px] border border-border/70 bg-muted/20 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{title}</p>
      <div className="mt-4 rounded-[20px] border border-border/70 bg-background p-4">
        <p className="text-xs text-emerald-700 dark:text-emerald-300">{eyebrow}</p>
        <p className="mt-1 text-lg font-semibold text-blue-700 dark:text-blue-300">{heading}</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function DetailChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-muted/20 px-4 py-3">
      <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
      <FormError message={error} />
    </label>
  );
}

function FormError({ message }: { message?: string }) {
  return message ? <p className="text-xs text-rose-600 dark:text-rose-300">{message}</p> : null;
}
