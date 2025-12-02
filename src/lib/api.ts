"use server";
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

export default api;
