/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { handleApiAction } from "@/lib/handleApiAction";
import {
  DelegatorSharesHistoryParams,
  DelegatorSharesHistory,
} from "@/types/daily_snapshots.types";
import {
  DelegatorListParams,
  Delegator,
  DelegatorDetail,
  DelegationHistoryParams,
  DelegationHistory,
} from "@/types/delegator.types";

// ==================== DELEGATORS ====================

export const getOperatorDelegators = async (
  id: string,
  params?: DelegatorListParams
) => {
  const queryString = params
    ? `?${new URLSearchParams(params as any).toString()}`
    : "";
  return handleApiAction<Delegator[]>({
    endpoint: `/api/v1/operators/${id}/delegators${queryString}`,
    method: "get",
  });
};

export const getDelegatorDetail = async (
  operatorId: string,
  stakerId: string
) =>
  handleApiAction<DelegatorDetail>({
    endpoint: `/api/v1/operators/${operatorId}/delegators/${stakerId}`,
    method: "get",
  });

export const getDelegationHistory = async (
  id: string,
  params?: DelegationHistoryParams
) => {
  const queryString = params
    ? `?${new URLSearchParams(params as any).toString()}`
    : "";
  return handleApiAction<DelegationHistory>({
    endpoint: `/api/v1/operators/${id}/delegators/history${queryString}`,
    method: "get",
  });
};

export const getDelegatorSharesHistory = async (
  operatorId: string,
  stakerId: string,
  params?: DelegatorSharesHistoryParams
) => {
  const queryString = params
    ? `?${new URLSearchParams(params as any).toString()}`
    : "";
  return handleApiAction<DelegatorSharesHistory>({
    endpoint: `/api/v1/operators/${operatorId}/delegators/${stakerId}/shares/history${queryString}`,
    method: "get",
  });
};
