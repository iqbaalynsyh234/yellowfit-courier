import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const BASE_URL = process.env.YELLOWFIT_COURIER_API_DEV;
export const MOCK_BASE_URL = process.env.NEXT_PUBLIC_MOCK_BASE_URL;
export const NEXT_PUBLIC_PROD_URL = process.env.NEXT_PUBLIC_PROD_URL || '';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;  
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data; 
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

// Generic API call function using axios
export const apiCall = async <T>(
  endpoint: string,
  options?: AxiosRequestConfig
): Promise<T> => {
  try {
    const data = await axiosInstance({
      url: endpoint,
      ...options,
    });
    return data as T;
  } catch (error) {
    throw error;
  }
};

export default axiosInstance;
