/* eslint-disable @typescript-eslint/no-explicit-any */
// ==================== BASE TYPES ====================

export interface AppApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  message?: string;
  error?: any;
  errorCode?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  meta: {
    request_id: string;
    timestamp: string;
    execution_time_ms: number;
  };
  pagination?: {
    total: number;
    limit: number;
    offset: number;
    has_more: boolean;
    next_offset: number;
  };
}

// ==================== SEARCH TYPES ====================

export type EntityType = "operators" | "avs" | "stakers";

export interface SearchParams {
  query: string;
  entity_types?: EntityType[];
  limit?: number;
}

export interface SearchResults {
  operators: SearchResult[];
  avs: SearchResult[];
  stakers: SearchResult[];
  total: number;
}

export interface SearchResult {
  id: string;
  type: EntityType;
  name: string;
  address: string;
  metadata?: Record<string, any>;
}

export type LeaderboardMetric =
  | "tvs"
  | "delegators"
  | "avs_count"
  | "operational_days"
  | "risk_score";

export interface LeaderboardParams {
  metric: LeaderboardMetric;
  limit?: number;
  date?: string;
}

export interface LeaderboardEntry {
  rank: number;
  operatorId: string;
  name: string;
  value: number;
  address: string;
}

export type TrendTimeframe = "7d" | "30d" | "90d";
export type TrendMetric = "tvs_growth" | "delegator_growth" | "avs_growth";

export interface TrendingParams {
  timeframe?: TrendTimeframe;
  metric?: TrendMetric;
  limit?: number;
}

export interface TrendingOperator {
  operatorId: string;
  name: string;
  growthRate: number;
  currentValue: number;
  previousValue: number;
}

export type RecentActivityType =
  | "registration"
  | "allocation"
  | "commission"
  | "metadata";

export interface RecentActivityParams {
  activity_types?: RecentActivityType[];
  hours?: number;
  limit?: number;
}

export interface RecentActivityOperator {
  operatorId: string;
  name: string;
  lastActivityType: RecentActivityType;
  lastActivityTime: string;
  activityCount: number;
}

// ==================== HEALTH CHECK TYPES ====================

export interface HealthStatus {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  checks: HealthCheck[];
}

export interface HealthCheck {
  name: string;
  status: "up" | "down";
  responseTime?: number;
  message?: string;
}
