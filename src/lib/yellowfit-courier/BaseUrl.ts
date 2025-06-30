
export const BASE_URL = process.env.COURIER_API_URL;
export const API_ENDPOINTS = {
  SIGNIN: '/auth/signin',
  OTP: '/auth/otp',
  DASHBOARD: '/dashboard',
  PICKUP: '/pickup',
  PICKUP_DETAIL: (id: string) => `/pickup/${id}`,
  PROFILE: '/profile',
} as const;

// Fetch API configuration
export const fetchApi = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const url = `${BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  return fetch(url, defaultOptions);
};

export const apiCall = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetchApi(endpoint, options);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};
