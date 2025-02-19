import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../appConstant";
import { LoginResponse } from "../pages/auth/model/login";

export interface LoginRequest {
  email: string;
  password: string;
}
export const loginServiceAgent = {
  login: async (loginRequest: LoginRequest) => {
    try {
      const response: AxiosResponse<LoginResponse> = await axios.post(
        BASE_URL + "/login",
        loginRequest,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
