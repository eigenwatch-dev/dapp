/* eslint-disable @typescript-eslint/no-explicit-any */

const makeQueryKey = (key: string) => (params?: any) =>
  params ? [key, params] : [key];

export const QUERY_KEYS = {
  // ==================== OPERATORS ====================
  operators: makeQueryKey("operators"),
  operator: (id: string) => ["operator", id],
  operatorStats: (id: string) => ["operator", id, "stats"],
  operatorActivity: (id: string, params?: any) => [
    "operator",
    id,
    "activity",
    params,
  ],
  operatorStrategies: (id: string, params?: any) => [
    "operator",
    id,
    "strategies",
    params,
  ],
  operatorStrategy: (operatorId: string, strategyId: string) => [
    "operator",
    operatorId,
    "strategy",
    strategyId,
  ],
  operatorStrategyHistory: (
    operatorId: string,
    strategyId: string,
    params?: any
  ) => ["operator", operatorId, "strategy", strategyId, "history", params],
  operatorAVS: (id: string, params?: any) => ["operator", id, "avs", params],
  operatorAVSDetail: (operatorId: string, avsId: string) => [
    "operator",
    operatorId,
    "avs",
    avsId,
  ],
  operatorAVSHistory: (operatorId: string, avsId: string) => [
    "operator",
    operatorId,
    "avs",
    avsId,
    "history",
  ],
  operatorAVSTimeline: (operatorId: string, avsId: string, params?: any) => [
    "operator",
    operatorId,
    "avs",
    avsId,
    "timeline",
    params,
  ],
  operatorCommission: (id: string) => ["operator", id, "commission"],
  operatorCommissionHistory: (id: string, params?: any) => [
    "operator",
    id,
    "commission",
    "history",
    params,
  ],
  operatorDelegators: (id: string, params?: any) => [
    "operator",
    id,
    "delegators",
    params,
  ],
  operatorDelegator: (operatorId: string, stakerId: string) => [
    "operator",
    operatorId,
    "delegator",
    stakerId,
  ],
  operatorDelegatorShares: (
    operatorId: string,
    stakerId: string,
    params?: any
  ) => ["operator", operatorId, "delegator", stakerId, "shares", params],
  operatorDelegationHistory: (id: string, params?: any) => [
    "operator",
    id,
    "delegation-history",
    params,
  ],
  operatorAllocations: (id: string) => ["operator", id, "allocations"],
  operatorAllocationsDetailed: (id: string, params?: any) => [
    "operator",
    id,
    "allocations",
    "detailed",
    params,
  ],
  operatorAllocationHistory: (id: string, params?: any) => [
    "operator",
    id,
    "allocation-history",
    params,
  ],
  operatorRisk: (id: string, date?: string) => ["operator", id, "risk", date],
  operatorConcentration: (id: string, params?: any) => [
    "operator",
    id,
    "concentration",
    params,
  ],
  operatorVolatility: (id: string, params?: any) => [
    "operator",
    id,
    "volatility",
    params,
  ],
  operatorSnapshots: (id: string, params?: any) => [
    "operator",
    id,
    "snapshots",
    params,
  ],
  operatorSlashing: (id: string) => ["operator", id, "slashing"],
  operatorRankings: (id: string, date?: string) => [
    "operator",
    id,
    "rankings",
    date,
  ],
  operatorVsNetwork: (id: string, date?: string) => [
    "operator",
    id,
    "vs-network",
    date,
  ],

  // ==================== COMPARISON ====================
  compareOperators: (operatorIds: string[]) => [
    "compare",
    "operators",
    operatorIds.sort().join(","),
  ],

  // ==================== SEARCH ====================
  globalSearch: (params: any) => ["search", params],
  leaderboard: (params: any) => ["leaderboard", params],
  trending: (params?: any) => ["trending", params],
  recentActivity: (params?: any) => ["recent-activity", params],

  // ==================== NETWORK ====================
  networkStats: makeQueryKey("network-stats"),
  networkDistribution: (params: any) => ["network-distribution", params],
  networkHistory: (params: any) => ["network-history", params],

  // ==================== HEALTH ====================
  health: makeQueryKey("health"),
  healthDatabase: makeQueryKey("health-database"),
  healthRedis: makeQueryKey("health-redis"),
};
