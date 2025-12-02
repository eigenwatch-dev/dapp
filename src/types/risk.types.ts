// ==================== RISK & ANALYTICS TYPES ====================

export interface RiskAssessment {
  overallScore: number;
  components: {
    concentrationRisk: number;
    volatilityRisk: number;
    slashingHistory: number;
    operationalStability: number;
  };
  metrics: {
    delegationHHI: number;
    tvsVolatility30d: number;
    slashingCount: number;
    uptimePercentage: number;
  };
  assessmentDate: string;
}

export type ConcentrationType =
  | "delegation"
  | "allocation_by_avs"
  | "allocation_by_strategy";

export interface ConcentrationMetrics {
  type: ConcentrationType;
  hhi: number;
  giniCoefficient: number;
  percentiles: {
    p50: number;
    p75: number;
    p90: number;
    p95: number;
    p99: number;
  };
  topNConcentration: {
    top5: number;
    top10: number;
    top20: number;
  };
  date: string;
}

export type VolatilityMetricType = "tvs" | "delegators" | "avs_count";

export interface VolatilityMetrics {
  metricType: VolatilityMetricType;
  volatility7d: number;
  volatility30d: number;
  volatility90d: number;
  trend: "increasing" | "decreasing" | "stable";
  date: string;
}
