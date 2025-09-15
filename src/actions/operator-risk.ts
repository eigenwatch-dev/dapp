/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import api from "@/utils/api";
import handleError, { handleSuccess } from "@/utils/handleResponse";

// Get all operators with pagination and filtering
// TODO: Update params typing
export const getOperators = async (params?: any) => {
  try {
    const { data } = await api.get("/api/risk/operators", { params });
    return handleSuccess(data, "Fetched operators successfully.");
  } catch (error: any) {
    return handleError(error);
  }
};

// Get detailed risk data for a specific operator
export const getOperatorById = async (operatorId: string) => {
  try {
    const { data } = await api.get(`/api/risk/operators/${operatorId}`);
    return handleSuccess(data, "Fetched operator details successfully.");
  } catch (error: any) {
    return handleError(error);
  }
};

// Get volatility metrics for an operator
export const getOperatorVolatility = async (operatorId: string) => {
  try {
    const { data } = await api.get(
      `/api/risk/operators/${operatorId}/volatility`
    );
    return handleSuccess(data, "Fetched operator volatility successfully.");
  } catch (error: any) {
    return handleError(error);
  }
};

// Get concentration metrics for an operator
export const getOperatorConcentration = async (operatorId: string) => {
  try {
    const { data } = await api.get(
      `/api/risk/operators/${operatorId}/concentration`
    );
    return handleSuccess(data, "Fetched operator concentration successfully.");
  } catch (error: any) {
    return handleError(error);
  }
};
