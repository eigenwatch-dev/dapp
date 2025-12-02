// ==================== SNAPSHOT TYPES ====================

export interface DailySnapshotsParams {
  date_from: string;
  date_to: string;
  metrics?: string[];
}

export interface DailySnapshot {
  date: string;
  tvs: number;
  delegatorCount: number;
  avsCount: number;
  operatorSetCount: number;
  utilizationRate: number;
}

export interface StrategyTVSHistoryParams {
  date_from: string;
  date_to: string;
}

export interface StrategyTVSHistory {
  data: StrategyTVSPoint[];
}

export interface StrategyTVSPoint {
  date: string;
  tvs: number;
  utilizationRate: number;
  encumbered: number;
}

export interface DelegatorSharesHistoryParams {
  date_from?: string;
  date_to?: string;
  strategy_id?: string;
}

export interface DelegatorSharesHistory {
  data: DelegatorSharesPoint[];
}

export interface DelegatorSharesPoint {
  date: string;
  strategyId: string;
  strategyName: string;
  shares: number;
}

export interface AVSTimelineParams {
  date_from: string;
  date_to: string;
}

export interface AVSTimeline {
  data: AVSTimelinePoint[];
}

export interface AVSTimelinePoint {
  date: string;
  isRegistered: boolean;
  operatorSetCount: number;
}

export interface AllocationHistoryParams {
  date_from: string;
  date_to: string;
  operator_set_id?: string;
  strategy_id?: string;
}

export interface AllocationHistoryData {
  data: AllocationHistoryPoint[];
}

export interface AllocationHistoryPoint {
  date: string;
  magnitude: number;
  operatorSetId: string;
  strategyId: string;
}
