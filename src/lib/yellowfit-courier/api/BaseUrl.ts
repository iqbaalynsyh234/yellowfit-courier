import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_ENDPOINTS } from './ApiEndpoints';

export const BASE_URL = 'https://api.yellowfitkitchen.com';
export const MOCK_BASE_URL = process.env.NEXT_PUBLIC_MOCK_BASE_URL;
export const NEXT_PUBLIC_PROD_URL = process.env.NEXT_PUBLIC_PROD_URL || '';
export const EXTERNAL_API_URL = process.env.NEXT_PUBLIC_EXTERNAL_API_URL || 'https://api.yellowfitkitchen.com';

const axiosInstance = axios.create({
 baseURL: BASE_URL,
 headers: {
  'Content-Type': 'application/json',
 },
});

axiosInstance.interceptors.request.use(
 (config) => {
  if (typeof window !== 'undefined') {
   const token = localStorage.getItem('token');
   if (token) {
    config.headers.Authorization = `Bearer ${token}`;
   }
  }
  return config;
 },
 (error) => {
  return Promise.reject(error);
 }
);

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

const getCsrfToken = async (): Promise<string> => {
 const possibleEndpoints = [
  '/csrf-cookie',
  '/sanctum/csrf-cookie',
  '/api/csrf-cookie',
  '/csrf-token',
 ];

 for (const endpoint of possibleEndpoints) {
  try {
   const response = await fetch(`https://api.yellowfitkitchen.com${endpoint}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
     Accept: 'application/json',
    },
   });

   if (response.ok) {
    if (typeof document !== 'undefined') {
     const cookies = document.cookie.split(';');
     const csrfCookie = cookies.find(
      (cookie) =>
       cookie.trim().startsWith('XSRF-TOKEN=') ||
       cookie.trim().startsWith('csrf_token=') ||
       cookie.trim().startsWith('_token=')
     );

     if (csrfCookie) {
      return decodeURIComponent(csrfCookie.split('=')[1]);
     }
    }

    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
     const csrfMatch = setCookieHeader.match(
      /(XSRF-TOKEN|csrf_token|_token)=([^;]+)/
     );
     if (csrfMatch) {
      return decodeURIComponent(csrfMatch[2]);
     }
    }
   }
  } catch (error) {
   console.log(`Failed to get CSRF from ${endpoint}:`, error);
   continue;
  }
 }

 throw new Error('CSRF token not found from any endpoint');
};

export const axiosExternalInstance = axios.create({
 baseURL: EXTERNAL_API_URL,
 headers: {
  'Content-Type': 'application/json',
  Accept: 'application/json',
 },
 withCredentials: true,
 timeout: 10000,
});

axiosExternalInstance.interceptors.request.use(
 async (config) => {
  if (
   ['post', 'put', 'delete', 'patch'].includes(
    config.method?.toLowerCase() || ''
   )
  ) {
   try {
    const csrfToken = await getCsrfToken();
    config.headers['X-CSRF-TOKEN'] = csrfToken;
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
   } catch (error) {
    console.error('Failed to get CSRF token:', error);
    throw error;
   }
  }
  // Only access localStorage in the browser
  if (typeof window !== 'undefined') {
   const token = localStorage.getItem('token');
   if (token) {
    config.headers.Authorization = `Bearer ${token}`;
   }
  }
  return config;
 },
 (error) => {
  return Promise.reject(error);
 }
);

axiosExternalInstance.interceptors.response.use(
 (response: AxiosResponse) => {
  return response;
 },
 (error) => {
  if (error.response?.status === 401) {
   localStorage.removeItem('token');
  }
  return Promise.reject(error);
 }
);
export const logoutApi = async () => {
 const token = localStorage.getItem('token');
 if (!token) throw new Error('No authentication token found');
 const response = await fetch(
  `${
   process.env.NEXT_PUBLIC_EXTERNAL_API_URL ||
   'https://api.yellowfitkitchen.com/api'
  }${API_ENDPOINTS.LOGOUT}`,
  {
   method: 'POST',
   headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
   },
  }
 );
 if (!response.ok) {
  const data = await response.json();
  throw new Error(data.message || 'Logout failed');
 }
 return true;
};

export default axiosInstance;
