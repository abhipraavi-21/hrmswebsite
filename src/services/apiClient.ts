import axios from "axios";

export const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL?.trim() ||
    (import.meta.env.PROD ? "/api" : "http://localhost:5000/api"),
  timeout: 10000,
});
