/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { QUERY_KEYS } from "@/utils/queryKey";
import useCustomQuery from "../custom/useCustomQuery";
import {
  getOperators,
  getOperatorById,
  getOperatorVolatility,
  getOperatorConcentration,
} from "@/actions/operator-risk";

// Hook: Get all operators with pagination and filtering
export const useOperators = (params?: any) => {
  return useCustomQuery({
    queryKey: QUERY_KEYS.getOperators(params),
    queryFn: () => getOperators(params),
    params,
  });
};

// Hook: Get detailed risk data for a specific operator
export const useOperatorById = (operatorId: string) => {
  return useCustomQuery({
    queryKey: QUERY_KEYS.getOperatorById(operatorId),
    queryFn: () => getOperatorById(operatorId),
    params: operatorId,
    enabled: !!operatorId,
  });
};

// Hook: Get volatility metrics for an operator
export const useOperatorVolatility = (operatorId: string) => {
  return useCustomQuery({
    queryKey: QUERY_KEYS.getOperatorVolatility(operatorId),
    queryFn: () => getOperatorVolatility(operatorId),
    params: operatorId,
    enabled: !!operatorId,
  });
};

// Hook: Get concentration metrics for an operator
export const useOperatorConcentration = (operatorId: string) => {
  return useCustomQuery({
    queryKey: QUERY_KEYS.getOperatorConcentration(operatorId),
    queryFn: () => getOperatorConcentration(operatorId),
    params: operatorId,
    enabled: !!operatorId,
  });
};
