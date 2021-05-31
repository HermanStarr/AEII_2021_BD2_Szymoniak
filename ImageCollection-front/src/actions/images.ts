import {PaginatedResult, ImageThumbResponse} from "../model/dto";
import axios from "axios";

export const getImagesWithCriteria = async (criteria: string): Promise<PaginatedResult<ImageThumbResponse>> => {
  const response = await axios.get("http://localhost:8080/api/images?" + criteria);
  return response.data;
};

export const getImages = async (): Promise<PaginatedResult<ImageThumbResponse>> => {
  const response = await axios.get("http://localhost:8080/api/images");
  return response.data;
};