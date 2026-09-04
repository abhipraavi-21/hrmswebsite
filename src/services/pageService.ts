import { apiClient } from "./apiClient";
import type { PublicApiResponse, PublicCmsPage } from "./cmsTypes";
import { getSeedPageFallback, withSeedFallback } from "./seedFallback";

export type ProductNamespace = "hrms" | "bulk-email" | "asset-management";

export async function fetchPageByKey(
  pageKey: string,
  product: ProductNamespace = "hrms",
) {
  return withSeedFallback(async () => {
    const response = await apiClient.get<PublicApiResponse<PublicCmsPage>>(
      `/public/${product}/pages/${pageKey}`,
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
