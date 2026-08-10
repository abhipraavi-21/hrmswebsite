import { apiClient } from "./apiClient";
import type { PublicApiResponse, PublicPricingPage } from "./cmsTypes";
import { getSeedPricingPageFallback, withSeedFallback } from "./seedFallback";

export async function fetchPricingPage() {
  return withSeedFallback(async () => {
    const response = await apiClient.get<PublicApiResponse<PublicPricingPage>>("/public/pricing");
    return response.data.data;
  }, () => getSeedPricingPageFallback());
}
