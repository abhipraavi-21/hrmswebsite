import { apiClient } from "./apiClient";
import type { PublicApiResponse, PublicCmsPage } from "./cmsTypes";

export async function fetchPageByKey(pageKey: string) {
  const response = await apiClient.get<PublicApiResponse<PublicCmsPage>>(`/public/pages/${pageKey}`);
  return response.data.data;
}

export async function fetchHrmsPage() {
  const response = await apiClient.get<PublicApiResponse<PublicCmsPage>>("/public/hrms");
  return response.data.data;
}
