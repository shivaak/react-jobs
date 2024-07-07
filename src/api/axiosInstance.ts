import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // Use the proxy prefix
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
