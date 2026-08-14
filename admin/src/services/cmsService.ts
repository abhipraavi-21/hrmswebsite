import { api } from "./api";
import type {
  AdminUser,
  ApiResponse,
  BlogGroup,
  CmsPage,
  CmsPageSummary,
  CmsSection,
  BlogPost,
  BillingAdminCustomer,
  BillingAdminInvoice,
  BillingAdminPayment,
  BillingAdminProduct,
  BillingAdminSubscription,
  BillingOverview,
  BillingTaxSetting,
  DashboardSummary,
  MediaItem,
  PricingFeature,
  PricingPlan,
  ResourceSummary,
  SubscriptionPurchase,
} from "../types/cms";

const unwrap = async <T>(promise: Promise<{ data: ApiResponse<T> }>) => {
  const response = await promise;
  return response.data.data;
};

export const authService = {
  login: (payload: { email: string; password: string; rememberMe: boolean }) =>
    unwrap<{ token: string; admin: AdminUser }>(api.post("/admin/auth/login", payload)),
  logout: () => unwrap(api.post("/admin/auth/logout")),
  profile: () => unwrap<AdminUser>(api.get("/admin/auth/profile")),
  updateProfile: (payload: { name: string; email: string }) =>
    unwrap<AdminUser>(api.put("/admin/auth/profile", payload)),
  changePassword: (payload: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => unwrap(api.put("/admin/auth/change-password", payload)),
};

export const dashboardService = {
  getSummary: () => unwrap<DashboardSummary>(api.get("/admin/dashboard")),
};

export const subscriptionService = {
  list: () => unwrap<SubscriptionPurchase[]>(api.get("/admin/subscriptions")),
  get: (id: number | string) => unwrap<SubscriptionPurchase>(api.get(`/admin/subscriptions/${id}`)),
};

export const pageService = {
  list: () => unwrap<CmsPageSummary[]>(api.get("/admin/pages")),
  get: (id: number | string) => unwrap<CmsPage>(api.get(`/admin/pages/${id}`)),
  update: (id: number | string, payload: Partial<CmsPage>) =>
    unwrap<CmsPage>(api.put(`/admin/pages/${id}`, payload)),
  restore: (id: number | string) => unwrap<CmsPage>(api.post(`/admin/pages/${id}/restore`)),
  createSection: (pageId: number | string, payload: Partial<CmsSection>) =>
    unwrap<CmsSection>(api.post(`/admin/pages/${pageId}/sections`, payload)),
  updateSection: (sectionId: number | string, payload: Partial<CmsSection>) =>
    unwrap<CmsSection>(api.put(`/admin/pages/sections/${sectionId}`, payload)),
  deleteSection: (sectionId: number | string) => unwrap(api.delete(`/admin/pages/sections/${sectionId}`)),
  reorderSections: (items: Array<{ id: number; displayOrder: number }>) =>
    unwrap(api.patch("/admin/pages/sections/reorder", { items })),
  createItem: (sectionId: number | string, payload: Partial<CmsSection["items"][number]>) =>
    unwrap(api.post(`/admin/pages/sections/${sectionId}/items`, payload)),
  updateItem: (itemId: number | string, payload: Partial<CmsSection["items"][number]>) =>
    unwrap(api.put(`/admin/pages/section-items/${itemId}`, payload)),
  deleteItem: (itemId: number | string) => unwrap(api.delete(`/admin/pages/section-items/${itemId}`)),
  reorderItems: (items: Array<{ id: number; displayOrder: number }>) =>
    unwrap(api.patch("/admin/pages/section-items/reorder", { items })),
};

export const resourcesService = {
  list: () => unwrap<ResourceSummary[]>(api.get("/admin/resources")),
};

export const pricingService = {
  list: () => unwrap<PricingPlan[]>(api.get("/admin/pricing-plans")),
  create: (payload: Partial<PricingPlan>) =>
    unwrap<PricingPlan>(api.post("/admin/pricing-plans", payload)),
  update: (id: number | string, payload: Partial<PricingPlan>) =>
    unwrap<PricingPlan>(api.put(`/admin/pricing-plans/${id}`, payload)),
  remove: (id: number | string) => unwrap(api.delete(`/admin/pricing-plans/${id}`)),
  duplicate: (id: number | string) => unwrap<PricingPlan>(api.post(`/admin/pricing-plans/${id}/duplicate`)),
  createFeature: (planId: number | string, payload: Partial<PricingFeature>) =>
    unwrap<PricingFeature>(api.post(`/admin/pricing-plans/${planId}/features`, payload)),
  updateFeature: (id: number | string, payload: Partial<PricingFeature>) =>
    unwrap<PricingFeature>(api.put(`/admin/pricing-plans/features/${id}`, payload)),
  removeFeature: (id: number | string) => unwrap(api.delete(`/admin/pricing-plans/features/${id}`)),
};

export const blogPostService = {
  list: (blogGroup?: BlogGroup) =>
    unwrap<BlogPost[]>(
      api.get("/admin/blog-posts", {
        params: blogGroup ? { blogGroup } : undefined,
      }),
    ),
  get: (id: number | string) => unwrap<BlogPost>(api.get(`/admin/blog-posts/${id}`)),
  create: (payload: Partial<BlogPost>) => unwrap<BlogPost>(api.post("/admin/blog-posts", payload)),
  update: (id: number | string, payload: Partial<BlogPost>) =>
    unwrap<BlogPost>(api.put(`/admin/blog-posts/${id}`, payload)),
  remove: (id: number | string) => unwrap(api.delete(`/admin/blog-posts/${id}`)),
};

export const mediaService = {
  list: () => unwrap<MediaItem[]>(api.get("/admin/media")),
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return unwrap<MediaItem>(
      api.post("/admin/media/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    );
  },
  update: (id: number | string, payload: { altText: string }) =>
    unwrap<MediaItem>(api.put(`/admin/media/${id}`, payload)),
  remove: (id: number | string) => unwrap(api.delete(`/admin/media/${id}`)),
};

export const billingAdminService = {
  getOverview: () => unwrap<BillingOverview>(api.get("/admin/billing/overview")),
  listCustomers: () => unwrap<BillingAdminCustomer[]>(api.get("/admin/billing/customers")),
  listProducts: () => unwrap<BillingAdminProduct[]>(api.get("/admin/billing/products")),
  updateProduct: (id: number | string, payload: Partial<BillingAdminProduct>) =>
    unwrap<BillingAdminProduct>(api.put(`/admin/billing/products/${id}`, payload)),
  updatePlan: (id: number | string, payload: Partial<BillingAdminProduct["plans"][number]>) =>
    unwrap<BillingAdminProduct["plans"][number]>(api.put(`/admin/billing/plans/${id}`, payload)),
  updateAddon: (id: number | string, payload: Partial<BillingAdminProduct["addons"][number]>) =>
    unwrap<BillingAdminProduct["addons"][number]>(api.put(`/admin/billing/addons/${id}`, payload)),
  listSubscriptions: () =>
    unwrap<BillingAdminSubscription[]>(api.get("/admin/billing/subscriptions")),
  listPayments: () => unwrap<BillingAdminPayment[]>(api.get("/admin/billing/payments")),
  listInvoices: () => unwrap<BillingAdminInvoice[]>(api.get("/admin/billing/invoices")),
  listTaxes: () => unwrap<BillingTaxSetting[]>(api.get("/admin/billing/taxes")),
  updateTax: (id: number | string, payload: Partial<BillingTaxSetting>) =>
    unwrap<BillingTaxSetting>(api.put(`/admin/billing/taxes/${id}`, payload)),
};
