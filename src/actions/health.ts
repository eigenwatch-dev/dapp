// ==================== actions/health.ts ====================
"use server";

import { handleApiAction } from "@/lib/handleApiAction";
import { HealthStatus } from "@/types/api.types";

export const checkHealth = async () =>
  handleApiAction<HealthStatus>({
    endpoint: `/api/v1/health`,
    method: "get",
  });

export const checkDatabaseHealth = async () =>
  handleApiAction<HealthStatus>({
    endpoint: `/api/v1/health/database`,
    method: "get",
  });

export const checkRedisHealth = async () =>
  handleApiAction<HealthStatus>({
    endpoint: `/api/v1/health/redis`,
    method: "get",
  });
