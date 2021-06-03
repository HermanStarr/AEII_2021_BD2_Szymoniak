import {ApiResponse, PaginatedResult, UserPublicResponse, UserRequest} from "../model/dto";
import axios from "axios";

export const editUserIcon = async (data: UserRequest, icon: File): Promise<ApiResponse<string>> => {
  const formData = new FormData();
  formData.append('input', new Blob([JSON.stringify(data)], {
    type: "application/json"
  }));
  formData.append('icon', icon);
  const response = await axios.put("http://localhost:8080/api/auth/changeIcon", formData);
  return response.data;
};

export const editUserPassword = async (newPassword: string, oldPassword: string): Promise<ApiResponse<string>> => {
  const formData = new FormData();
  formData.append('newPassword', newPassword);
  formData.append('oldPassword', oldPassword);

  const response = await axios.put("http://localhost:8080/api/auth/changePassword", formData);
  return response.data;
};

export const getUsers = async (criteria: string): Promise<PaginatedResult<UserPublicResponse>> => {
  const response = await axios.get("http://localhost:8080/api/auth?" + criteria);
  return response.data;
};

export const getUser = async (nickname: string): Promise<UserPublicResponse> => {
  const response = await axios.get(`http://localhost:8080/api/auth/${nickname}`);
  return response.data;
};
