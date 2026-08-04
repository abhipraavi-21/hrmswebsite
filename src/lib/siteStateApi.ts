import type { AdminStore } from "@/admin/types";

export type PublicSiteState = Pick<
  AdminStore,
  "content" | "seo" | "siteSettings" | "redirects" | "robotsTxt" | "sitemap"
> & {
  updatedAt?: string;
};

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !payload.success || payload.data === undefined) {
    throw new Error(payload.message || "Site state request failed.");
  }

  return payload.data;
}

export async function fetchAdminWorkspace(role: string) {
  return request<AdminStore | null>("/api/admin/state", {
    headers: {
      "x-admin-role": role,
    },
  });
}

export async function saveAdminWorkspace(role: string, store: AdminStore) {
  return request<AdminStore>("/api/admin/state", {
    method: "PUT",
    headers: {
      "x-admin-role": role,
    },
    body: JSON.stringify(store),
  });
}

export async function fetchPublicSiteState() {
  return request<PublicSiteState>("/api/site/state");
}
