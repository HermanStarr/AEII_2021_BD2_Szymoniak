import {PaginatedResult, TileImageResponse, ImageThumbRespone} from "../model/dto";
import axios from "axios";

export const getImagesWithCriteria = async (criteria: string): Promise<PaginatedResult<TileImageResponse>> => {
  const response = await axios.get("http://localhost:8080/api/images?" + criteria);
  return response.data;
};

export const getImagesFromDb = async (): Promise<PaginatedResult<TileImageResponse>> => {
  const response = await axios.get("http://localhost:8080/api/images");
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
