/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { handleApiAction } from "@/lib/handleApiAction";
import {
  StrategyTVSHistoryParams,
  StrategyTVSHistory,
} from "@/types/daily_snapshots.types";
import {
  StrategyListParams,
  Strategy,
  StrategyDetail,
} from "@/types/strategy.types";

// ==================== STRATEGIES ====================

export const getOperatorStrategies = async (
  id: string,
  params?: StrategyListParams
) => {
  const queryString = params
    ? `?${new URLSearchParams(params as any).toString()}`
    : "";
  return handleApiAction<{ strategies: Strategy[] }>({
    endpoint: `/api/v1/operators/${id}/strategies${queryString}`,
    method: "get",
  });
};

export const getOperatorStrategyDetail = async (
  operatorId: string,
  strategyId: string
) =>
  handleApiAction<StrategyDetail>({
    endpoint: `/api/v1/operators/${operatorId}/strategies/${strategyId}`,
    method: "get",
  });

export const getStrategyTVSHistory = async (
  operatorId: string,
  strategyId: string,
  params: StrategyTVSHistoryParams
) => {
  const queryString = `?${new URLSearchParams(params as any).toString()}`;
  return handleApiAction<StrategyTVSHistory>({
    endpoint: `/api/v1/operators/${operatorId}/strategies/${strategyId}/history${queryString}`,
    method: "get",
  });
};
