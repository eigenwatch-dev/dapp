"use client";

import {
  getOperators,
  getOperator,
  getOperatorStats,
  getOperatorActivity,
  getDailySnapshots,
  getSlashingIncidents,
  compareOperators,
  getOperatorRankings,
  compareOperatorToNetwork,
} from "@/actions/operators";
import { QUERY_KEYS } from "@/lib/queryKey";
import { DailySnapshotsParams } from "@/types/daily_snapshots.types";
import {
  OperatorListParams,
  ActivityParams,
  CompareOperatorsRequest,
} from "@/types/operator.types";
import { useQuery, useMutation } from "@tanstack/react-query";

// ==================== OPERATORS ====================

export const useOperators = (params?: OperatorListParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.operators(params),
    queryFn: () => getOperators(params),
    select: (data) => data.data,
  });
};

export const useOperator = (id: string, enabled = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.operator(id),
    queryFn: () => getOperator(id),
    enabled: enabled && !!id,
    select: (data) => data.data?.data,
  });
};

export const useOperatorStats = (id: string, enabled = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.operatorStats(id),
    queryFn: () => getOperatorStats(id),
    enabled: enabled && !!id,
    select: (data) => data.data?.data,
  });
};

export const useOperatorActivity = (
  id: string,
  params?: ActivityParams,
  enabled = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.operatorActivity(id, params),
    queryFn: () => getOperatorActivity(id, params),
    enabled: enabled && !!id,
  });
};

// ==================== SNAPSHOTS ====================

export const useDailySnapshots = (
  id: string,
  params: DailySnapshotsParams,
  enabled = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.operatorSnapshots(id, params),
    queryFn: () => getDailySnapshots(id, params),
    enabled: enabled && !!id && !!params.date_from && !!params.date_to,
    select: (data) => data.data?.data,
  });
};

// ==================== SLASHING ====================

export const useSlashingIncidents = (id: string, enabled = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.operatorSlashing(id),
    queryFn: () => getSlashingIncidents(id),
    enabled: enabled && !!id,
  });
};

// ==================== COMPARISON ====================

export const useCompareOperators = () => {
  return useMutation({
    mutationFn: (body: CompareOperatorsRequest) => compareOperators(body),
  });
};

export const useOperatorRankings = (
  id: string,
  date?: string,
  enabled = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.operatorRankings(id, date),
    queryFn: () => getOperatorRankings(id, date),
    enabled: enabled && !!id,
  });
};

export const useCompareOperatorToNetwork = (
  id: string,
  date?: string,
  enabled = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.operatorVsNetwork(id, date),
    queryFn: () => compareOperatorToNetwork(id, date),
    enabled: enabled && !!id,
  });
};
