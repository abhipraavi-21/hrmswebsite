import { apiClient } from "./apiClient";
import type { PublicApiResponse, PublicCmsPage, PublicResourceSummary } from "./cmsTypes";
import { getSeedResourcePageFallback, getSeedResourcesFallback, withSeedFallback } from "./seedFallback";

export async function fetchResources() {
  return withSeedFallback(async () => {
    const response = await apiClient.get<PublicApiResponse<PublicResourceSummary[]>>(
      "/public/resources",
    );
    return response.data.data;
  }, () => getSeedResourcesFallback());
}

export async function fetchResourcePage(slug: string) {
  return withSeedFallback(async () => {
    const response = await apiClient.get<PublicApiResponse<PublicCmsPage>>(
      `/public/resources/${slug}`,
    );
    return response.data.data;
  }, () => getSeedResourcePageFallback(slug));
}
