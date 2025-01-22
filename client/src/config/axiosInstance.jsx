import axios from "axios";

// Create axios instance
export const axiosInstance = axios.create({
  method: '',
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  withCredentials: true,
  data: null,
 headers: {}
});
