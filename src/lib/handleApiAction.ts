/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import api from "@/lib/api";
import { handleSuccess, handleError } from "@/lib/utils";
// import { ApiResponse } from "@/types/apiResponse.types";

interface ApiActionOptions {
  endpoint: string;
  method?: "get" | "post" | "put" | "patch" | "delete";
  body?: any;
  successMessage?: string;
  setCookieOnToken?: boolean;
}

export async function handleApiAction({
  endpoint,
  method = "post",
  body,
  successMessage,
}: ApiActionOptions) {
  try {
    const response =
      method === "get"
        ? await api.get(endpoint)
        : await api[method](endpoint, body);

    // const data: ApiResponse<T> = response.data;
    const data = response.data;

    console.log(`API Response for ${endpoint}:`, data);

    if (!data.success) {
      return handleError(data.error, true);
    }

    return handleSuccess(data, successMessage);
  } catch (error: any) {
    return handleError(error);
  }
}
