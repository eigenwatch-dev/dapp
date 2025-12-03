"use client";

import {
  getRiskAssessment,
  getConcentrationMetrics,
  getVolatilityMetrics,
} from "@/actions/operator-risk";
import { QUERY_KEYS } from "@/lib/queryKey";
import { ConcentrationType, VolatilityMetricType } from "@/types/risk.types";
import { useQuery } from "@tanstack/react-query";

// ==================== RISK & ANALYTICS ====================

export const useRiskAssessment = (
  id: string,
  date?: string,
  enabled = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.operatorRisk(id, date),
    queryFn: () => getRiskAssessment(id, date),
    enabled: enabled && !!id,
    select: (data) => data.data?.data,
  });
};

export const useConcentrationMetrics = (
  id: string,
  concentrationType: ConcentrationType = "delegation",
  date?: string,
  enabled = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.operatorConcentration(id, { concentrationType, date }),
    queryFn: () => getConcentrationMetrics(id, concentrationType, date),
    enabled: enabled && !!id,
  });
};

export const useVolatilityMetrics = (
  id: string,
  metricType: VolatilityMetricType = "tvs",
  date?: string,
  enabled = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.operatorVolatility(id, { metricType, date }),
    queryFn: () => getVolatilityMetrics(id, metricType, date),
    enabled: enabled && !!id,
  });
};
