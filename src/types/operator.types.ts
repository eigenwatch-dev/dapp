/* eslint-disable @typescript-eslint/no-explicit-any */

// ==================== OPERATOR TYPES ====================

export type OperatorStatus = "active" | "inactive" | "all";
export type SortOrder = "asc" | "desc";
export type OperatorSortBy =
  | "tvs"
  | "delegator_count"
  | "avs_count"
  | "operational_days"
  | "risk_score";

export interface OperatorListParams {
  limit?: number;
  offset?: number;
  status?: OperatorStatus;
  min_tvs?: number;
  max_tvs?: number;
  min_delegators?: number;
  max_delegators?: number;
  min_avs_count?: number;
  max_avs_count?: number;
  has_been_slashed?: boolean;
  is_permissioned?: boolean;
  search?: string;
  sort_by?: OperatorSortBy;
  sort_order?: SortOrder;
}

export interface Operator {
  id: string;
  address: string;
  name?: string;
  logo?: string;
  website?: string;
  description?: string;
  totalTVS: number;
  delegatorCount: number;
  avsCount: number;
  operationalDays: number;
  riskScore?: number;
  isActive: boolean;
  hasBeenSlashed: boolean;
  isPermissioned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OperatorStats {
  totalTVS: number;
  delegatorCount: number;
  avsCount: number;
  operatorSetCount: number;
  commission: {
    pi: number;
    avs: number;
    operatorSet: number;
  };
  utilization: {
    total: number;
    encumbered: number;
    available: number;
  };
}

export type ActivityType =
  | "registration"
  | "delegation"
  | "allocation"
  | "commission"
  | "metadata"
  | "slashing";

export interface ActivityParams {
  activity_types?: ActivityType[];
  limit?: number;
  offset?: number;
}

export interface Activity {
  id: string;
  type: ActivityType;
  timestamp: string;
  description: string;
  txHash?: string;
  blockNumber?: number;
  metadata?: Record<string, any>;
}

// ==================== COMPARISON TYPES ====================

export interface CompareOperatorsRequest {
  operator_ids: string[];
  metrics?: string[];
}

export interface CompareOperatorsResponse {
  operators: OperatorComparison[];
  metrics: string[];
}

export interface OperatorComparison {
  operatorId: string;
  name: string;
  metrics: Record<string, number | string>;
}

export interface OperatorRankings {
  operatorId: string;
  rankings: Record<string, PercentileRank>;
  date: string;
}

export interface PercentileRank {
  value: number;
  percentile: number;
  rank: number;
  totalOperators: number;
}

export interface NetworkComparison {
  operator: Record<string, number>;
  networkMean: Record<string, number>;
  networkMedian: Record<string, number>;
  percentile: Record<string, number>;
  date: string;
}
