import {ApiResponse, LoginRequest, SignUpRequest} from "../model/dto";
import axios from "axios";


export const loginUser = async (data: LoginRequest): Promise<ApiResponse> => {
  const response = await axios.post(
    "http://localhost:8080/api/auth/login", data,
  );
  return response.data;
};

export const registerUser = async (data: SignUpRequest): Promise<ApiResponse> => {
  const response = await axios.post(
    "http://localhost:8080/api/auth/signup", data,
  );
  return response.data;
};