export type BlogStatus =
  | "Draft"
  | "In Review"
  | "Approved"
  | "Published"
  | "Scheduled"
  | "Archived";

export type BlogTable = {
  headers: string[];
  rows: string[][];
};

export type BlogSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  table?: BlogTable;
};

export type BlogFaq = {
  q: string;
  a: string;
};

export type BlogRelatedLink = {
  label: string;
  href: string;
  description: string;
};

export type BlogRecord = {
  id?: number;
  title: string;
  slug: string;
  href: string;
  category: string;
  author: string;
  description: string;
  featuredImage: string;
  featuredImageAlt: string;
  publishDate: string;
  updatedDate: string;
  readingTime: string;
  tags: string[];
  heroSummary: string;
  heroPoints: string[];
  quickAnswer: string;
  keyTakeaways: string[];
  sections: BlogSection[];
  faqs: BlogFaq[];
  relatedLinks: BlogRelatedLink[];
  status: BlogStatus;
  focusKeyword: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  schemaData: string;
  schemaEnabled: boolean;
  searchIntent: string;
  primaryEntity: string;
  aiSummary: string;
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
    throw new Error(payload.message || "Blog API request failed.");
  }

  return payload.data;
}

export function createEmptyBlogRecord(): BlogRecord {
  return {
    title: "",
    slug: "",
    href: "",
    category: "Blog",
    author: "",
    description: "",
    featuredImage: "",
    featuredImageAlt: "",
    publishDate: "2026-08-04",
    updatedDate: "2026-08-04 12:30:00",
    readingTime: "5 min read",
    tags: [],
    heroSummary: "",
    heroPoints: [],
    quickAnswer: "",
    keyTakeaways: [],
    sections: [],
    faqs: [],
    relatedLinks: [],
    status: "Draft",
    focusKeyword: "",
    metaTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    schemaData: JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
      },
      null,
      2,
    ),
    schemaEnabled: true,
    searchIntent: "Informational",
    primaryEntity: "",
    aiSummary: "",
  };
}

export async function fetchPublicBlogs() {
  return request<BlogRecord[]>("/api/blogs");
}

export async function fetchPublicBlog(slug: string) {
  return request<BlogRecord>(`/api/blogs/${slug}`);
}

export async function fetchAdminBlogs(role: string) {
  return request<BlogRecord[]>("/api/admin/blogs", {
    headers: {
      "x-admin-role": role,
    },
  });
}

export async function createAdminBlog(role: string, blog: Partial<BlogRecord>) {
  return request<BlogRecord>("/api/admin/blogs", {
    method: "POST",
    headers: {
      "x-admin-role": role,
    },
    body: JSON.stringify(blog),
  });
}

export async function updateAdminBlog(role: string, id: number, blog: Partial<BlogRecord>) {
  return request<BlogRecord>(`/api/admin/blogs/${id}`, {
    method: "PUT",
    headers: {
      "x-admin-role": role,
    },
    body: JSON.stringify(blog),
  });
}

export async function deleteAdminBlog(role: string, id: number) {
  return request<{ message?: string }>(`/api/admin/blogs/${id}`, {
    method: "DELETE",
    headers: {
      "x-admin-role": role,
    },
  });
}

export async function updateAdminBlogStatus(role: string, id: number, status: BlogStatus) {
  return request<BlogRecord>(`/api/admin/blogs/${id}/status`, {
    method: "PATCH",
    headers: {
      "x-admin-role": role,
    },
    body: JSON.stringify({ status }),
  });
}
