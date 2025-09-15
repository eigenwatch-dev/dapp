/* eslint-disable @typescript-eslint/no-explicit-any */

const makeQueryKey = (key: string) => (params?: any) =>
  [key, JSON.stringify(params || {})];

export const QUERY_KEYS = {
  getOperators: makeQueryKey("getOperators"),
  getOperatorById: makeQueryKey("getOperatorById"),
  getOperatorVolatility: makeQueryKey("getOperatorVolatility"),
  getOperatorConcentration: makeQueryKey("getOperatorConcentration"),
};
