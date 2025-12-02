// "use server";

// import { handleApiAction } from "@/lib/handleApiAction";
// import { PaginatedResponse } from "@/types/apiResponse.types";
// import {
//   CreateBusiness,
//   UpdateBusinessStage1,
//   UpdateBusinessStage2,
//   UpdateBusinessStage3,
//   UpdateBusinessStage4,
//   UpdateBusinessStage5,
//   Business,
// } from "@/types/business.types";

// export const createBusiness = async (body: CreateBusiness) =>
//   handleApiAction<Business>({
//     endpoint: "/businesses",
//     body,
//     successMessage: "Business created successfully",
//   });

// export const getUserBusinesses = async () =>
//   handleApiAction<PaginatedResponse<Business>>({
//     endpoint: "/businesses/user/all",
//     method: "get",
//   });

// export const getBusiness = async (id: string) =>
//   handleApiAction<Business>({
//     endpoint: `/businesses/${id}`,
//     method: "get",
//   });

// export const updateBusinessStage1 = async (
//   id: string,
//   body: UpdateBusinessStage1
// ) =>
//   handleApiAction<Business>({
//     endpoint: `/businesses/${id}/stage/basic-info`,
//     method: "patch",
//     body,
//     successMessage: "Basic information updated successfully",
//   });

// export const updateBusinessStage2 = async (
//   id: string,
//   body: UpdateBusinessStage2
// ) =>
//   handleApiAction<Business>({
//     endpoint: `/businesses/${id}/stage/business-info`,
//     method: "patch",
//     body,
//     successMessage: "Business information updated successfully",
//   });

// export const updateBusinessStage3 = async (
//   id: string,
//   body: UpdateBusinessStage3
// ) =>
//   handleApiAction<Business>({
//     endpoint: `/businesses/${id}/stage/technical-info`,
//     method: "patch",
//     body,
//     successMessage: "Technical information updated successfully",
//   });

// export const updateBusinessStage4 = async (
//   id: string,
//   body: UpdateBusinessStage4
// ) =>
//   handleApiAction<Business>({
//     endpoint: `/businesses/${id}/stage/compliance-security`,
//     method: "patch",
//     body,
//     successMessage: "Compliance and security updated successfully",
//   });

// export const updateBusinessStage5 = async (
//   id: string,
//   body: UpdateBusinessStage5
// ) =>
//   handleApiAction<Business>({
//     endpoint: `/businesses/${id}/stage/services-offered`,
//     method: "patch",
//     body,
//     successMessage: "Services information updated successfully",
//   });

// export const submitBusinessForApproval = async (id: string) =>
//   handleApiAction<Business>({
//     endpoint: `/businesses/${id}/submit`,
//     successMessage: "Business submitted for approval successfully",
//   });
