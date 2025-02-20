import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../appConstant";
import { LoginResponse, SignupResponse } from "../pages/auth/model/login";

export interface LoginRequest {
  email: string;
  password: string;
}
export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  weight: number;
  age: number;
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
  signUp: async (signUpRequest: SignUpRequest) => {
    try {
      const response: AxiosResponse<SignupResponse> = await axios.post(
        BASE_URL + "/signup",
        signUpRequest,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
