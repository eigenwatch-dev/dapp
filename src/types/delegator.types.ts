// ==================== DELEGATOR TYPES ====================

import { SortOrder } from "./operator.types";

export type DelegatorStatus = "active" | "inactive" | "all";
export type DelegatorSortBy = "shares" | "delegation_date";

export interface DelegatorListParams {
  limit?: number;
  offset?: number;
  status?: DelegatorStatus;
  min_shares?: number;
  max_shares?: number;
  sort_by?: DelegatorSortBy;
  sort_order?: SortOrder;
}

export interface Delegator {
  id: string;
  address: string;
  shares: number;
  status: "active" | "inactive";
  delegationDate: string;
  undelegationDate?: string;
}

export interface DelegatorDetail extends Delegator {
  strategiesBreakdown: StrategyShares[];
  totalValue: number;
}

export interface StrategyShares {
  strategyId: string;
  strategyName: string;
  shares: number;
}

export type DelegationEventType =
  | "delegated"
  | "undelegated"
  | "force_undelegated"
  | "all";

export interface DelegationHistoryParams {
  limit?: number;
  offset?: number;
  event_type?: DelegationEventType;
  date_from?: string;
  date_to?: string;
}

export interface DelegationHistory {
  events: DelegationEvent[];
}

export interface DelegationEvent {
  type: DelegationEventType;
  stakerId: string;
  shares: number;
  timestamp: string;
  txHash: string;
}
