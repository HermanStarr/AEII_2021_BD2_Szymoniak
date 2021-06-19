import {ApiResponse, PaginatedResult, UserPublicResponse} from "../model/dto";
import axios from "axios";
import FileSaver from "file-saver";

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

export const getPdfExport = async (id: string, filename: string): Promise<any> => {
  return requestFile({
    url: `http://localhost:8080/api/users/${id}/export`,
    method: 'GET',
  }, filename);


};

function prepareHeaders() {
  return new Headers({
    'Content-Type': 'application/json',
  });
}

type RequestOptions = {
  url: string;
  method: string;
  body?: string;
  minDuration?: number;
  credentials?: RequestCredentials;
  csvName?: string;
  resolveJsonPromise?: boolean;
}

const requestFile = (options: RequestOptions, filename: string) => {
  // wysyłanie zapytań typu application/json

  const headers = prepareHeaders();
  const defaults = { headers };
  const finalOptions = { ...defaults, ...options };
  // moment uruchomienia zapytania
  const startTime = Date.now();
  return fetch(options.url, finalOptions)
    // możliwość zapewnienia minimalnej długości trwania zapytania
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      response.blob()
        .then((blob) => {
          FileSaver.saveAs(blob, filename);
          return Promise.resolve();
        });
      return Promise.resolve();
    });
};

