/* eslint-disable @typescript-eslint/no-explicit-any */

const makeQueryKey = (key: string) => (params?: any) =>
  [key, JSON.stringify(params || {})];

export const QUERY_KEYS = {
  // Authentication
  authProfile: makeQueryKey("auth_profile"),
  authRefresh: makeQueryKey("auth_refresh"),

  // Users
  getAllUsers: makeQueryKey("get_all_users"),
  getUserById: makeQueryKey("get_user_by_id"),

  // Businesses
  getAllBusinesses: makeQueryKey("get_all_businesses"),
  getUserBusinesses: makeQueryKey("get_user_businesses"),
  getBusinessById: makeQueryKey("get_business_by_id"),
};
