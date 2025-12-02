// ==================== NETWORK TYPES ====================

export interface NetworkStats {
  totalOperators: number;
  activeOperators: number;
  totalTVS: number;
  totalDelegators: number;
  totalAVS: number;
  averageCommission: number;
  medianCommission: number;
  timestamp: string;
}

export type DistributionMetric = "tvs" | "delegators" | "avs_count";

export interface NetworkDistributionParams {
  metric: DistributionMetric;
  date?: string;
}

export interface NetworkDistribution {
  metric: DistributionMetric;
  mean: number;
  median: number;
  mode: number;
  stdDev: number;
  percentiles: {
    p10: number;
    p25: number;
    p50: number;
    p75: number;
    p90: number;
    p95: number;
    p99: number;
  };
  histogram: HistogramBucket[];
  date: string;
}

export interface HistogramBucket {
  min: number;
  max: number;
  count: number;
  percentage: number;
}

export interface NetworkHistoryParams {
  date_from: string;
  date_to: string;
  metrics?: string[];
}

export interface NetworkHistory {
  data: NetworkHistoryPoint[];
}

export interface NetworkHistoryPoint {
  date: string;
  totalOperators: number;
  activeOperators: number;
  totalTVS: number;
  totalDelegators: number;
  totalAVS: number;
  averageCommission: number;
}
