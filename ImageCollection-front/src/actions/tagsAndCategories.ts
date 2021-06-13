import {ApiResponse, CategoryResponse, TagResponse} from "../model/dto";
import axios from "axios";

export const getTags = async (criteria: string): Promise<TagResponse[]> => {
    const response = await axios.get("http://localhost:8080/api/tags?search=" + criteria + ',');
    return response.data;
}

export const getCategories = async (criteria: string): Promise<CategoryResponse[]> => {
    const response = await axios.get("http://localhost:8080/api/categories?search=" + criteria + ',');
    return response.data;
}

export const addCategory = async (data: CategoryResponse, icon: File): Promise<ApiResponse<string>> => {
    const formData = new FormData();
    formData.append('input', new Blob([JSON.stringify(data)], {
        type: "application/json"
    }));
    formData.append('icon', icon);
    const response = await axios.post("http://localhost:8080/api/categories", formData);
    return response.data;
};