import { apiClient } from "./apiClient";
import type { PublicApiResponse, PublicCmsPage, PublicResourceSummary } from "./cmsTypes";

export async function fetchResources() {
  const response = await apiClient.get<PublicApiResponse<PublicResourceSummary[]>>("/public/resources");
  return response.data.data;
}

export async function fetchResourcePage(slug: string) {
  const response = await apiClient.get<PublicApiResponse<PublicCmsPage>>(`/public/resources/${slug}`);
  return response.data.data;
}
