// ==================== hooks/useNetwork.ts ====================
"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getNetworkStats,
  getNetworkDistribution,
  getNetworkHistory,
} from "@/actions/network";
import { QUERY_KEYS } from "@/lib/queryKey";
import {
  NetworkDistributionParams,
  NetworkHistoryParams,
} from "@/types/network.types";

export const useNetworkStats = (enabled = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.networkStats(),
    queryFn: () => getNetworkStats(),
    enabled,
  });
};

export const useNetworkDistribution = (
  params: NetworkDistributionParams,
  enabled = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.networkDistribution(params),
    queryFn: () => getNetworkDistribution(params),
    enabled: enabled && !!params.metric,
  });
};

export const useNetworkHistory = (
  params: NetworkHistoryParams,
  enabled = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.networkHistory(params),
    queryFn: () => getNetworkHistory(params),
    enabled: enabled && !!params.date_from && !!params.date_to,
  });
};
