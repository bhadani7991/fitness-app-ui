import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../appConstant";
import { LoginResponse } from "../pages/auth/model/login";

export interface LoginRequest {
  email: string;
  password: string;
}

export const login = async (
  loginRequest: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      BASE_URL + "/login",
      loginRequest,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error while logging in");
  }
};
