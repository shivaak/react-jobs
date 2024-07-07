import { ErrorResponse, Login, UserData } from "../types";
import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";

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
    if (isAxiosError(error)) {
      throw error.response?.data as ErrorResponse;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

const isAxiosError = (error: unknown): error is AxiosError<ErrorResponse> => {
  return (
    (error as AxiosError).isAxiosError !== undefined &&
    (error as AxiosError).response?.data !== undefined
  );
};
