import {ApiResponse, LoginRequest, SignUpRequest, UserResponse} from "../model/dto";
import axios from "axios";


export const loginUser = async (data: LoginRequest): Promise<ApiResponse<string>> => {
  const response = await axios.post(
    "http://localhost:8080/api/auth/login", data,
  );
  return response.data;
};

export const registerUser = async (data: SignUpRequest): Promise<ApiResponse<string>> => {
  const response = await axios.post(
    "http://localhost:8080/api/auth/signup", data,
  );
  return response.data;
};

export const getUserData = async (token: String): Promise<UserResponse> => {
  const response = await axios.get(
    "http://localhost:8080/api/auth/userData", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  return response.data;
};