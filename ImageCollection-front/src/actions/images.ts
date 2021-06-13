import {ApiResponse, ImageThumbResponse, ImageRequest, PaginatedResult, ImageResponse} from "../model/dto";
import axios from "axios";

export const getImagesWithCriteria = async (criteria: string): Promise<PaginatedResult<ImageThumbResponse>> => {
  const response = await axios.get("http://localhost:8080/api/images?" + criteria);
  return response.data;
};

export const getImages = async (): Promise<PaginatedResult<ImageThumbResponse>> => {
  const response = await axios.get("http://localhost:8080/api/images");
  return response.data;
};

export const getImage = async (imageId: number): Promise<ImageResponse> => {
  const response = await axios.get(`http://localhost:8080/api/images/${imageId}`);
  return response.data;
}

export const addImage = async (data: ImageRequest, image: File): Promise<ApiResponse<string>> => {

  const formData = new FormData();
  formData.append('input', new Blob([JSON.stringify(data)], {
    type: "application/json"
  }));
  formData.append('image', image);
  const response = await axios.post("http://localhost:8080/api/images", formData);
  return response.data;
};

export const editImage = async (imageId: number, data: ImageRequest): Promise<ApiResponse<string>> => {
  const response = await axios.put(
    `http://localhost:8080/api/images/${imageId}`, data,
  );
  return response.data;
};

export const deleteImage = async (imageId: number): Promise<ApiResponse<string>> => {
  const response = await axios.delete(
    `http://localhost:8080/api/images/${imageId}`,
  );
  return response.data;
}