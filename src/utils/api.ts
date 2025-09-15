"use server";
import axios from "axios";

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:8000";
const API_KEY = process.env.API_KEY || "apikey";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
});

// Not needed for now. May never need it
// TODO: Remove this or uncomment when value confirmed
// api.interceptors.request.use(async (config) => {
//   const token = await getAccessToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
