/* eslint-disable @typescript-eslint/no-explicit-any */
export default function handleError(error: any) {
  // console.log("Some error occured:", error);

  const safeResponse = error?.response
    ? {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers,
        url: error.config?.url,
        method: error.config?.method,
      }
    : error?.message || "Unknown error";

  console.log("Some error occurred:", JSON.stringify(safeResponse, null, 2));

  const message =
    error.response?.data?.data?.errorDescription ||
    error.response?.data?.message ||
    error.message ||
    "Something went wrong";
  return {
    message,
    success: false,
    data: error.response?.data,
  };
}

export function handleSuccess(data: any, message?: string) {
  return {
    success: true,
    data: data,
    message,
  };
}
