/* eslint-disable @typescript-eslint/no-explicit-any */
// ==================== actions/network.ts ====================
"use server";

import { handleApiAction } from "@/lib/handleApiAction";
import {
  NetworkStats,
  NetworkDistributionParams,
  NetworkDistribution,
  NetworkHistoryParams,
  NetworkHistory,
} from "@/types/network.types";

export const getNetworkStats = async () =>
  handleApiAction<NetworkStats>({
    endpoint: `/api/v1/network/stats`,
    method: "get",
  });

export const getNetworkDistribution = async (
  params: NetworkDistributionParams
) => {
  const queryString = `?${new URLSearchParams(params as any).toString()}`;
  return handleApiAction<NetworkDistribution>({
    endpoint: `/api/v1/network/distribution${queryString}`,
    method: "get",
  });
};

export const getNetworkHistory = async (params: NetworkHistoryParams) => {
  const queryString = `?${new URLSearchParams(params as any).toString()}`;
  return handleApiAction<NetworkHistory>({
    endpoint: `/api/v1/network/history${queryString}`,
    method: "get",
  });
};
