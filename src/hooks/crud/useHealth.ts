// ==================== hooks/useHealth.ts ====================
"use client";

import { useQuery } from "@tanstack/react-query";
import {
  checkHealth,
  checkDatabaseHealth,
  checkRedisHealth,
} from "@/actions/health";
import { QUERY_KEYS } from "@/lib/queryKey";

export const useHealth = (enabled = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.health(),
    queryFn: () => checkHealth(),
    enabled,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useDatabaseHealth = (enabled = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.healthDatabase(),
    queryFn: () => checkDatabaseHealth(),
    enabled,
    refetchInterval: 30000,
  });
};

export const useRedisHealth = (enabled = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.healthRedis(),
    queryFn: () => checkRedisHealth(),
    enabled,
    refetchInterval: 30000,
  });
};
