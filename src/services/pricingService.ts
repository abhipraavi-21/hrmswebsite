import { apiClient } from "./apiClient";
import type { PublicApiResponse, PublicPricingPage } from "./cmsTypes";
import type { ProductNamespace } from "./pageService";
import { getSeedPricingPageFallback, withSeedFallback } from "./seedFallback";

export async function fetchPricingPage(product: ProductNamespace = "hrms") {
  return withSeedFallback(async () => {
    const endpoint = product === "hrms" ? "/public/pricing" : `/public/${product}/pricing`;
    const response = await apiClient.get<PublicApiResponse<PublicPricingPage>>(endpoint);
    return response.data.data;
  }, () => getSeedPricingPageFallback());
}
