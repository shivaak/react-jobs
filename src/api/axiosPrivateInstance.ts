// axiosPrivateInstance.ts
import axios from "axios";

const axiosPrivateInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosPrivateInstance;
