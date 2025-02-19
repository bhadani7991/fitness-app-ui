import axios, { AxiosError } from "axios";

enum AxiosErrorEnum {
  ERR_NETWORK = "ERR_NETWORK",
  ERR_BAD_REQUEST = "ERR_BAD_REQUEST",
}

export type AppError = {
  errorMessage: string;
  isLoginExpired: boolean;
  code?: string;
};

function getAxiosError(error: unknown): AppError {
  const axiosError = error as AxiosError;
  let errorMessage = "";
  let isLoginExpired = false;
  let code = axiosError.code;

  if (axios.isAxiosError(axiosError)) {
    // Axios Error Handling
    if (axiosError.code === AxiosErrorEnum.ERR_NETWORK) {
      errorMessage = "No server response";
    } else if (axiosError.code === AxiosErrorEnum.ERR_BAD_REQUEST) {
      errorMessage = "Bad Request";
    } else if (axiosError.code === "403" || axiosError.code === "401") {
      errorMessage = "Session Expired. Please login again";
      isLoginExpired = true;
    } else if (axiosError.code === "400") {
      errorMessage = "Bad Request";
    } else {
      errorMessage = axiosError.message || "An API error occurred";
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    // Handle string errors
    errorMessage = error;
  } else {
    errorMessage = "An unexpected error occurred."; // Catch-all
  }
  return { errorMessage, isLoginExpired, code };
}
export default getAxiosError;
