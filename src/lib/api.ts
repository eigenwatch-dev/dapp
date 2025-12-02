"use server";
import { getAccessToken } from "@/actions/util";
import axios from "axios";

const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
});

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
