/* eslint-disable @typescript-eslint/no-explicit-any */
// ==================== actions/search.ts ====================
"use server";

import { handleApiAction } from "@/lib/handleApiAction";
import {
  SearchParams,
  SearchResults,
  LeaderboardParams,
  LeaderboardEntry,
  TrendingParams,
  TrendingOperator,
  RecentActivityParams,
  RecentActivityOperator,
} from "@/types/api.types";

export const globalSearch = async (params: SearchParams) => {
  const queryString = `?${new URLSearchParams(params as any).toString()}`;
  return handleApiAction<SearchResults>({
    endpoint: `/api/v1/search${queryString}`,
    method: "get",
  });
};

export const getLeaderboard = async (params: LeaderboardParams) => {
  const queryString = `?${new URLSearchParams(params as any).toString()}`;
  return handleApiAction<LeaderboardEntry[]>({
    endpoint: `/api/v1/search/leaderboard${queryString}`,
    method: "get",
  });
};

export const getTrending = async (params?: TrendingParams) => {
  const queryString = params
    ? `?${new URLSearchParams(params as any).toString()}`
    : "";
  return handleApiAction<TrendingOperator[]>({
    endpoint: `/api/v1/search/trending${queryString}`,
    method: "get",
  });
};

export const getRecentActivity = async (params?: RecentActivityParams) => {
  const queryString = params
    ? `?${new URLSearchParams(params as any).toString()}`
    : "";
  return handleApiAction<RecentActivityOperator[]>({
    endpoint: `/api/v1/search/recent-activity${queryString}`,
    method: "get",
  });
};
