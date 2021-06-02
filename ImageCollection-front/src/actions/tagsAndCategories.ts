import {CategoryResponse, TagResponse} from "../model/dto";
import axios from "axios";

export const getTags = async (criteria: string): Promise<TagResponse[]> => {
    const response = await axios.get("http://localhost:8080/api/tags?search=" + criteria + ',');
    return response.data;
}

export const getCategories = async (criteria: string): Promise<CategoryResponse[]> => {
    const response = await axios.get("http://localhost:8080/api/categories?search=" + criteria + ',');
    return response.data;
}