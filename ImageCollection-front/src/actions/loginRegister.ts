import {ApiResponse, LoginRequest, SignUpRequest, UserResponse} from "../model/dto";
import axios from "axios";


export const loginUser = async (data: LoginRequest): Promise<ApiResponse<string>> => {
  const response = await axios.post(
    "http://localhost:8080/api/auth/login", data,
  );
  return response.data;
};

export const registerUser = async (data: SignUpRequest): Promise<ApiResponse<string>> => {
  const response = await axios.post(
    "http://localhost:8080/api/auth/signup", data,
  );
  return response.data;
};

export const getUserData = async (token: String): Promise<UserResponse> => {
  const response = await axios.get(
    "http://localhost:8080/api/auth/userData", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const getUsersList = async() : Promise<UserResponse[]> => {
  const response = await axios.get("http://localhost:8080/api/auth/userList", {
    headers: {
      'Authorization': `Bearer  eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdHJpbmciLCJpYXQiOjE2MjIzMDM5MjgsImV4cCI6MTYyMjM5MDMyOH0.BYSVMocPPilBhiVNnJbWD2OslEtuBf6fooen_-MDV_9Hyreos2Tc4SJ4ja3yPn6xgNvqt0UoRdWRJghA6JzqRA`
    }
  });
  return response.data;
}

  export const getUserById = async(id: number) : Promise<UserResponse> => {
    const response = await axios.get("http://localhost:8080/api/auth/userById", {
      params: id,
      headers: {
        'Authorization': `Bearer  eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdHJpbmciLCJpYXQiOjE2MjIzMDM5MjgsImV4cCI6MTYyMjM5MDMyOH0.BYSVMocPPilBhiVNnJbWD2OslEtuBf6fooen_-MDV_9Hyreos2Tc4SJ4ja3yPn6xgNvqt0UoRdWRJghA6JzqRA`
      }
    });
    return response.data;
  }
export const getUserByNickname = async(nickname: string) : Promise<UserResponse> => {
  const response = await axios.get("http://localhost:8080/api/auth/userByNickname", {
    params: nickname,
    headers: {
      'Authorization': `Bearer  eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdHJpbmciLCJpYXQiOjE2MjIzMDM5MjgsImV4cCI6MTYyMjM5MDMyOH0.BYSVMocPPilBhiVNnJbWD2OslEtuBf6fooen_-MDV_9Hyreos2Tc4SJ4ja3yPn6xgNvqt0UoRdWRJghA6JzqRA`
    }
  });
  return response.data;
}