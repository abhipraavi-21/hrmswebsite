import { apiClient } from "./apiClient";
import type { PublicApiResponse, PublicContactPage } from "./cmsTypes";

export async function fetchContactPage() {
  const response = await apiClient.get<PublicApiResponse<PublicContactPage>>("/public/contact");
  return response.data.data;
}

export async function submitContactEnquiry(payload: Record<string, unknown>) {
  const response = await apiClient.post<PublicApiResponse<{ id: number }>>(
    "/public/contact-enquiries",
    payload,
  );
  return response.data.data;
}
