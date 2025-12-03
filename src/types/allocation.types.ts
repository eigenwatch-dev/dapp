// ==================== ALLOCATION TYPES ====================

import { SortOrder } from "./operator.types";

export interface AllocationsOverview {
  by_avs: AllocationByAVS[];
  by_strategy: AllocationByStrategy[];
  total_allocations: number;
  total_encumbered_magnitude: number;
}

export interface AllocationByAVS {
  avsId: string;
  avsName: string;
  totalMagnitude: number;
  strategies: number;
}

export interface AllocationByStrategy {
  strategyId: string;
  strategyName: string;
  totalMagnitude: number;
  avsCount: number;
}

export type AllocationSortBy = "magnitude" | "effect_block" | "allocated_at";

export interface DetailedAllocationParams {
  limit?: number;
  offset?: number;
  avs_id?: string;
  strategy_id?: string;
  min_magnitude?: number;
  max_magnitude?: number;
  sort_by?: AllocationSortBy;
  sort_order?: SortOrder;
}

export interface Allocation {
  id: string;
  operatorSetId: string;
  strategyId: string;
  magnitude: number;
  effectBlock: number;
  allocatedAt: string;
  avsId: string;
  avsName: string;
  strategyName: string;
}
