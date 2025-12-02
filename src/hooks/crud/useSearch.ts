// ==================== hooks/useSearch.ts ====================
"use client";

import { useQuery } from "@tanstack/react-query";
import {
  globalSearch,
  getLeaderboard,
  getTrending,
  getRecentActivity,
} from "@/actions/search";
import {
  SearchParams,
  LeaderboardParams,
  TrendingParams,
  RecentActivityParams,
} from "@/types/api.types";
import { QUERY_KEYS } from "@/lib/queryKey";

export const useGlobalSearch = (params: SearchParams, enabled = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.globalSearch(params),
    queryFn: () => globalSearch(params),
    enabled: enabled && !!params.query,
  });
};

export const useLeaderboard = (params: LeaderboardParams, enabled = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.leaderboard(params),
    queryFn: () => getLeaderboard(params),
    enabled: enabled && !!params.metric,
  });
};

export const useTrending = (params?: TrendingParams, enabled = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.trending(params),
    queryFn: () => getTrending(params),
    enabled,
  });
};

export const useRecentActivity = (
  params?: RecentActivityParams,
  enabled = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.recentActivity(params),
    queryFn: () => getRecentActivity(params),
    enabled,
  });
};
