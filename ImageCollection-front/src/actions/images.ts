import {ApiResponse, ImageRequest, PaginatedResult, TileImageResponse,ImageThumbRespone} from "../model/dto";
import axios from "axios";

export const getImagesWithCriteria = async (criteria: string): Promise<PaginatedResult<TileImageResponse>> => {
  const response = await axios.get("http://localhost:8080/api/images?" + criteria);
  return response.data;
};

export const getImagesFromDb = async (): Promise<PaginatedResult<TileImageResponse>> => {
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
  const response = await axios.post("http://localhost:8080/api/images", formData);
  return response.data;
};

export const editImage = async (imageId: number, data: ImageRequest): Promise<ApiResponse<string>> => {
  const response = await axios.put(
    `http://localhost:8080/api/images/${imageId}`, data,
  );
  return response.data;
};

export const getUserImageThumbs = async(userId : number): Promise<PaginatedResult<ImageThumbRespone>> => {
  const response = await axios.get("http://localhost:8080/api/images", {params: userId,
    headers: {
      'Authorization': `Bearer  eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdHJpbmciLCJpYXQiOjE2MjIzMDk5NjUsImV4cCI6MTYyMjM5NjM2NX0.INHTrbZbCmkYvW5X6_6ommBPLn2ql2Z_cbbeA50xQhAwek6a6nPkJli0stgrxylONxgISKy7l3BefgRBzmeLzA`

    }
    });

  return response.data;
}
