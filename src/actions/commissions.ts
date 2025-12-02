/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { handleApiAction } from "@/lib/handleApiAction";
import {
  CommissionOverview,
  CommissionHistoryParams,
  CommissionHistory,
} from "@/types/commission.types";

// ==================== COMMISSION ====================

export const getOperatorCommission = async (id: string) =>
  handleApiAction<CommissionOverview>({
    endpoint: `/api/v1/operators/${id}/commission`,
    method: "get",
  });

export const getCommissionHistory = async (
  id: string,
  params?: CommissionHistoryParams
) => {
  const queryString = params
    ? `?${new URLSearchParams(params as any).toString()}`
    : "";
  return handleApiAction<CommissionHistory>({
    endpoint: `/api/v1/operators/${id}/commission/history${queryString}`,
    method: "get",
  });
};
