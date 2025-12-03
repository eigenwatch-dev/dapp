// ==================== RISK & ANALYTICS TYPES ====================

export interface RiskAssessment {
  assessment_date: string;
  risk_score: string;
  risk_level: string;
  confidence_score: string;
  component_scores: {
    performance_score: string;
    economic_score: string;
    network_position_score: string;
  };
  key_metrics: {
    delegation_hhi: string;
    delegation_volatility_30d: string;
    growth_rate_30d: string;
    size_percentile: string;
    slashing_event_count: number;
    operational_days: number;
  };
  flags: {
    is_active: boolean;
    has_been_slashed: boolean;
    has_sufficient_data: boolean;
  };
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
