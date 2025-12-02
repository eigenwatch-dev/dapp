/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import api from "@/lib/api";
import { setAuthCookie } from "@/actions/util";
import { handleSuccess, handleError } from "@/lib/utils";
import { ApiResponse } from "@/types/apiResponse.types";

interface ApiActionOptions {
  endpoint: string;
  method?: "get" | "post" | "put" | "patch" | "delete";
  body?: any;
  successMessage?: string;
  setCookieOnToken?: boolean;
}

export async function handleApiAction<T = any>({
  endpoint,
  method = "post",
  body,
  successMessage,
  setCookieOnToken = false,
}: ApiActionOptions) {
  try {
    const response =
      method === "get"
        ? await api.get(endpoint)
        : await api[method](endpoint, body);

    const data: ApiResponse<T> = response.data;

    console.log(`API Response for ${endpoint}:`, data);

    if (setCookieOnToken && (data.data as any)?.token) {
      await setAuthCookie((data.data as any)?.token);
    }

    if (!data.success) {
      return handleError(data.error, true);
    }

    return handleSuccess<T>(data, successMessage);
  } catch (error: any) {
    return handleError(error);
  }
}
