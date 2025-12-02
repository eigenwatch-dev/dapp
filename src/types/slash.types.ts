// ==================== SLASHING TYPES ====================

export interface SlashingIncidents {
  incidents: SlashingIncident[];
  totalSlashed: number;
}

export interface SlashingIncident {
  id: string;
  timestamp: string;
  avsId: string;
  avsName: string;
  amounts: SlashedAmount[];
  reason?: string;
  txHash: string;
}

export interface SlashedAmount {
  strategyId: string;
  strategyName: string;
  amount: number;
}
