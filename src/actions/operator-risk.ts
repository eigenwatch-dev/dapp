"use server";

import { handleApiAction } from "@/lib/handleApiAction";
import {
  RiskAssessment,
  ConcentrationType,
  ConcentrationMetrics,
  VolatilityMetricType,
  VolatilityMetrics,
} from "@/types/risk.types";

// ==================== RISK & ANALYTICS ====================

export const getRiskAssessment = async (id: string, date?: string) => {
  const queryString = date ? `?date=${date}` : "";
  return handleApiAction<RiskAssessment>({
    endpoint: `/api/v1/operators/${id}/risk${queryString}`,
    method: "get",
  });
};

export const getConcentrationMetrics = async (
  id: string,
  concentrationType: ConcentrationType = "delegation",
  date?: string
) => {
  const params = new URLSearchParams({ concentration_type: concentrationType });
  if (date) params.append("date", date);
  return handleApiAction<ConcentrationMetrics>({
    endpoint: `/api/v1/operators/${id}/concentration?${params.toString()}`,
    method: "get",
  });
};

export const getVolatilityMetrics = async (
  id: string,
  metricType: VolatilityMetricType = "tvs",
  date?: string
) => {
  const params = new URLSearchParams({ metric_type: metricType });
  if (date) params.append("date", date);
  return handleApiAction<VolatilityMetrics>({
    endpoint: `/api/v1/operators/${id}/volatility?${params.toString()}`,
    method: "get",
  });
};
