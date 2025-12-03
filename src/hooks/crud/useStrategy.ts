"use client";

import {
  getOperatorStrategies,
  getOperatorStrategyDetail,
  getStrategyTVSHistory,
} from "@/actions/strategies";
import { QUERY_KEYS } from "@/lib/queryKey";
import { StrategyTVSHistoryParams } from "@/types/daily_snapshots.types";
import { StrategyListParams } from "@/types/strategy.types";
import { useQuery } from "@tanstack/react-query";

// ==================== STRATEGIES ====================

export const useOperatorStrategies = (
  id: string,
  params?: StrategyListParams,
  enabled = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.operatorStrategies(id, params),
    queryFn: () => getOperatorStrategies(id, params),
    enabled: enabled && !!id,
    select: (data) => data.data?.data,
  });
};

export const useOperatorStrategyDetail = (
  operatorId: string,
  strategyId: string,
  enabled = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.operatorStrategy(operatorId, strategyId),
    queryFn: () => getOperatorStrategyDetail(operatorId, strategyId),
    enabled: enabled && !!operatorId && !!strategyId,
  });
};

export const useStrategyTVSHistory = (
  operatorId: string,
  strategyId: string,
  params: StrategyTVSHistoryParams,
  enabled = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.operatorStrategyHistory(
      operatorId,
      strategyId,
      params
    ),
    queryFn: () => getStrategyTVSHistory(operatorId, strategyId, params),
    enabled:
      enabled &&
      !!operatorId &&
      !!strategyId &&
      !!params.date_from &&
      !!params.date_to,
  });
};
