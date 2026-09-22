import axios from "axios";

export const api = axios.create({
  baseURL: "https://smart-attendance-app-backend-77kh.onrender.com/api",
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
