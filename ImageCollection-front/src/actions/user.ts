import {ApiResponse, PaginatedResult, UserPublicResponse} from "../model/dto";
import axios from "axios";

export const editUserIcon = async (icon: File, password: string): Promise<ApiResponse<string>> => {
  const formData = new FormData();
  formData.append('password', password);
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
  const response = await axios.get("http://localhost:8080/api/users?" + criteria);
  return response.data;
};

export const getUser = async (nickname: string): Promise<UserPublicResponse> => {
  const response = await axios.get(`http://localhost:8080/api/users/${nickname}`);
  return response.data;
};

export const getPdfExport = async (id: string): Promise<any> => {
  const response = await axios.get(`http://localhost:8080/api/users/${id}/export`);
  return response.data;
};
