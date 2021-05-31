import {ApiResponse} from "../model/dto";
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
