import { ErrorResponse, Login, UserData } from "../types";
import axiosInstance from "../api/axiosInstance";
import axios, { AxiosError } from "axios";
import axiosPrivateInstance from "../api/axiosPrivateInstance";

export const registerUser = async (userData: UserData) => {
  try {
    const response = await axiosInstance.post("/users/register", userData);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error.response?.data as ErrorResponse;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const login = async (request: Login) => {
  try {
    const response = await axiosInstance.post("/auth/login", request);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The server responded with a status code outside the range of 2xx
        throw new Error(
          error.response.data?.errorMessage || "No response from server"
        );
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error("Server is unreachable. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error("An error occurred while setting up the request");
      }
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const logout = async () => {
  try {
    await axiosPrivateInstance.post("/auth/logout");
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.errorMessage);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const refreshToken = async () => {
  try {
    console.log("Calling Refreshing token Api...");
    const response = await axiosInstance.get("/auth/refresh");
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.errorMessage);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

const isAxiosError = (error: unknown): error is AxiosError<ErrorResponse> => {
  return axios.isAxiosError(error) && error.response?.data !== undefined;
};
