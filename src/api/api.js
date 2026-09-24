import axios from "axios";

const backendBaseUrl = import.meta.env.VITE_API_URL || 
"https://smart-attendance-app-backend-77kh.onrender.com" ;
export const api = axios.create({
  baseURL: backendBaseUrl,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("saatoken");
  if (token && token !== "undefined") {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});
