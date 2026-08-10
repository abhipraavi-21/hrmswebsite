import { apiClient } from "./apiClient";
import type { PublicApiResponse, PublicCmsPage } from "./cmsTypes";
import { getSeedPageFallback, withSeedFallback } from "./seedFallback";

export async function fetchPageByKey(pageKey: string) {
  return withSeedFallback(async () => {
    const response = await apiClient.get<PublicApiResponse<PublicCmsPage>>(
      `/public/pages/${pageKey}`,
    );
    return response.data.data;
  }, () => getSeedPageFallback(pageKey));
}

export async function fetchHrmsPage() {
  return withSeedFallback(async () => {
    const response = await apiClient.get<PublicApiResponse<PublicCmsPage>>("/public/hrms");
    return response.data.data;
  }, () => getSeedPageFallback("hrms"));
}
