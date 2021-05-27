import {ApiResponse, ImageRequest, PaginatedResult, TileImageResponse} from "../model/dto";
import axios from "axios";

export const getImagesWithCriteria = async (criteria: string): Promise<PaginatedResult<TileImageResponse>> => {
  const response = await axios.get("http://localhost:8080/api/images?" + criteria);
  return response.data;
};

export const getImages = async (): Promise<PaginatedResult<TileImageResponse>> => {
  const response = await axios.get("http://localhost:8080/api/images");
  return response.data;
};

export const addImage = async (data: ImageRequest, image: File): Promise<ApiResponse<string>> => {
  const formData = new FormData();

  // formData.append("input", JSON.stringify(data));
  formData.append('input', new Blob([JSON.stringify(data)], {
    type: "application/json"
  }));
  formData.append('image', image);
  console.log(image)
  const response = await fetch(
    "http://localhost:8080/api/images", {body: formData, method: 'post'}
  );

  return response as any;
};

export const editImage = async (imageId: number, data: ImageRequest): Promise<ApiResponse<string>> => {
  const response = await axios.put(
    `http://localhost:8080/api/images/${imageId}`, data,
  );
  return response.data;
};