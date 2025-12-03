/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { handleApiAction } from "@/lib/handleApiAction";
import {
  DailySnapshotsParams,
  DailySnapshot,
} from "@/types/daily_snapshots.types";
import {
  OperatorListParams,
  Operator,
  OperatorStats,
  ActivityParams,
  Activity,
  CompareOperatorsRequest,
  CompareOperatorsResponse,
  OperatorRankings,
  NetworkComparison,
  OperatorDetail,
} from "@/types/operator.types";
import { SlashingIncidents } from "@/types/slash.types";

// ==================== OPERATORS ====================

export const getOperators = async (params?: OperatorListParams) => {
  const queryString = params
    ? `?${new URLSearchParams(params as any).toString()}`
    : "";
  return handleApiAction<Operator[]>({
    endpoint: `/api/v1/operators${queryString}`,
    method: "get",
  });
};

export const getOperator = async (id: string) =>
  handleApiAction<OperatorDetail>({
    endpoint: `/api/v1/operators/${id}`,
    method: "get",
  });

export const getOperatorStats = async (id: string) =>
  handleApiAction<OperatorStats>({
    endpoint: `/api/v1/operators/${id}/stats`,
    method: "get",
  });

export const getOperatorActivity = async (
  id: string,
  params?: ActivityParams
) => {
  const queryString = params
    ? `?${new URLSearchParams(params as any).toString()}`
    : "";
  return handleApiAction<Activity[]>({
    endpoint: `/api/v1/operators/${id}/activity${queryString}`,
    method: "get",
  });
};

// ==================== SNAPSHOTS ====================

export const getDailySnapshots = async (
  id: string,
  params: DailySnapshotsParams
) => {
  const queryString = `?${new URLSearchParams(params as any).toString()}`;
  return handleApiAction<DailySnapshot[]>({
    endpoint: `/api/v1/operators/${id}/snapshots/daily${queryString}`,
    method: "get",
  });
};

// ==================== SLASHING ====================

export const getSlashingIncidents = async (id: string) =>
  handleApiAction<SlashingIncidents>({
    endpoint: `/api/v1/operators/${id}/slashing`,
    method: "get",
  });

// ==================== COMPARISON ====================

export const compareOperators = async (body: CompareOperatorsRequest) =>
  handleApiAction<CompareOperatorsResponse>({
    endpoint: `/api/v1/operators/compare`,
    method: "post",
    body,
  });

export const getOperatorRankings = async (id: string, date?: string) => {
  const queryString = date ? `?date=${date}` : "";
  return handleApiAction<OperatorRankings>({
    endpoint: `/api/v1/operators/${id}/rankings${queryString}`,
    method: "get",
  });
};

export const compareOperatorToNetwork = async (id: string, date?: string) => {
  const queryString = date ? `?date=${date}` : "";
  return handleApiAction<NetworkComparison>({
    endpoint: `/api/v1/operators/${id}/vs-network${queryString}`,
    method: "get",
  });
};
