import { apiClient } from "./apiClient";
import type { PublicApiResponse, PublicPricingPage } from "./cmsTypes";

export async function fetchPricingPage() {
  const response = await apiClient.get<PublicApiResponse<PublicPricingPage>>("/public/pricing");
  return response.data.data;
}
