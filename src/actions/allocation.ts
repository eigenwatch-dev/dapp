/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { handleApiAction } from "@/lib/handleApiAction";
import {
  AllocationsOverview,
  DetailedAllocationParams,
  Allocation,
} from "@/types/allocation.types";
import {
  AllocationHistoryParams,
  AllocationHistoryData,
} from "@/types/daily_snapshots.types";

// ==================== ALLOCATIONS ====================

export const getAllocationsOverview = async (id: string) =>
  handleApiAction<AllocationsOverview>({
    endpoint: `/api/v1/operators/${id}/allocations`,
    method: "get",
  });

export const getDetailedAllocations = async (
  id: string,
  params?: DetailedAllocationParams
) => {
  const queryString = params
    ? `?${new URLSearchParams(params as any).toString()}`
    : "";
  return handleApiAction<Allocation[]>({
    endpoint: `/api/v1/operators/${id}/allocations/detailed${queryString}`,
    method: "get",
  });
};

export const getAllocationHistory = async (
  id: string,
  params: AllocationHistoryParams
) => {
  const queryString = `?${new URLSearchParams(params as any).toString()}`;
  return handleApiAction<AllocationHistoryData>({
    endpoint: `/api/v1/operators/${id}/allocations/history${queryString}`,
    method: "get",
  });
};
