// ==================== STRATEGY TYPES ====================

import { Allocation } from "./allocation.types";
import { Delegator } from "./delegator.types";

export type StrategySortBy = "tvs" | "utilization" | "encumbered";

export interface StrategyListParams {
  min_tvs?: number;
  max_tvs?: number;
  min_utilization?: number;
  max_utilization?: number;
  sort_by?: StrategySortBy;
}

export interface Strategy {
  id: string;
  address: string;
  name: string;
  symbol: string;
  tvs: number;
  utilizationRate: number;
  encumbered: number;
  delegatorCount: number;
}

export interface StrategyDetail extends Strategy {
  allocations: Allocation[];
  topDelegators: Delegator[];
}
