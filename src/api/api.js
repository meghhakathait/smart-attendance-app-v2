import axios from "axios";

const backendBaseUrl = process.meta.enve.API_URL;
export const api = axios.create({
  baseURL: backendBaseUrl,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("saatoken");
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});
