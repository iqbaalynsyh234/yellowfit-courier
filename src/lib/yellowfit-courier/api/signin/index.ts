import { apiCall, API_ENDPOINTS } from '../BaseUrl';

export interface SigninRequest {
  email: string;
  password: string;
}

export interface SigninResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}

export const signinApi = async (credentials: SigninRequest): Promise<SigninResponse> => {
  return apiCall<SigninResponse>(API_ENDPOINTS.SIGNIN, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}; 