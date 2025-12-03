// ==================== COMMISSION TYPES ====================

export type CommissionType = "pi" | "avs" | "operator_set";

export interface CommissionOverview {
  pi_commission: number;
  avs_commissions: CommissionByAVS[];
  operator_set_commissions: CommissionByOperatorSet[];
}

export interface CommissionByAVS {
  avsId: string;
  avsName: string;
  commission: number;
}

export interface CommissionByOperatorSet {
  operatorSetId: string;
  operatorSetName: string;
  commission: number;
}

export interface CommissionHistoryParams {
  commission_type?: CommissionType;
  avs_id?: string;
  date_from?: string;
  date_to?: string;
}

export interface CommissionHistory {
  changes: CommissionChange[];
}

export interface CommissionChange {
  type: CommissionType;
  oldRate: number;
  newRate: number;
  timestamp: string;
  effectBlock: number;
  avsId?: string;
  operatorSetId?: string;
}
