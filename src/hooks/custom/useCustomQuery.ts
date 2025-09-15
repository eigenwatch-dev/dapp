/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import useQueryError from "../store/useQueryError";

interface CustomQueryOptions<TData = any, TParams = any> {
  queryKey: string | string[];
  queryFn: (params?: TParams) => Promise<TData>;
  params?: TParams;
  enabled?: boolean;
}

export default function useCustomQuery<TData = any, TParams = any>({
  queryKey,
  queryFn,
  params,
  enabled = true,
}: CustomQueryOptions<TData, TParams>) {
  const router = useRouter();
  const { addError, errors } = useQueryError();

  const query = useQuery({
    queryKey: Array.isArray(queryKey)
      ? [...queryKey, params]
      : [queryKey, params],
    queryFn: () => queryFn(params),
    retry: (failureCount, error) => {
      // Don't retry on authentication errors
      if (error?.message?.includes?.("expired token")) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    enabled,
    select: (data: any) => data,
    refetchOnWindowFocus: false, // Prevent unnecessary refetches
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  } satisfies UseQueryOptions);

  // Handle success/error states with useEffect
  useEffect(() => {
    if (query.data && !query.data.success) {
      const errorMessage = query.data.errorDescription || query.data.message;

      if (errorMessage && !errors.includes(errorMessage)) {
        addError(errorMessage);
      }

      if (
        typeof errorMessage === "string" &&
        errorMessage.includes("expired token")
      ) {
        toast.error("Session expired. Please login again.");
        router.push("/login");
      }
    }
  }, [query.data, addError, errors, router]);

  useEffect(() => {
    if (query.error) {
      console.error("Query error", query.error);

      // Handle specific error types
      if (query.error?.message?.includes?.("expired token")) {
        toast.error("Session expired. Please login again.");
        router.push("/login");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  }, [query.error, router]);

  return { ...query, data: query.data?.data };
}
