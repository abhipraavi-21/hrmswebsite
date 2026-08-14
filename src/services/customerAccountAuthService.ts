import { apiClient } from "./apiClient";
import type { PublicApiResponse } from "./cmsTypes";

export type CustomerAccount = {
  id: number;
  username: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string | null;
  isActive: boolean;
  lastLoginAt?: string | null;
};

export type CustomerAuthSession = {
  token: string;
  account: CustomerAccount;
};

export type CustomerRegisterRequest = {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string | null;
  username: string;
  password: string;
};

export type CustomerLoginRequest = {
  username: string;
  password: string;
};

export async function registerCustomerAccount(payload: CustomerRegisterRequest) {
  const response = await apiClient.post<PublicApiResponse<CustomerAuthSession>>(
    "/public/customer-auth/register",
    payload,
  );

  return response.data.data;
}

export async function loginCustomerAccount(payload: CustomerLoginRequest) {
  const response = await apiClient.post<PublicApiResponse<CustomerAuthSession>>(
    "/public/customer-auth/login",
    payload,
  );

  return response.data.data;
}
