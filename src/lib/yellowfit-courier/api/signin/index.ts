import { API_ENDPOINTS } from '../ApiEndpoints';
import { apiCall } from '../BaseUrl';
import { SigninRequest, SigninResponse } from '@/interfaces/Signin';

export const signinApi = async (credentials: SigninRequest): Promise<SigninResponse> => {
  return apiCall<SigninResponse>(API_ENDPOINTS.SIGNIN, {
    method: 'POST',
    data: credentials,
  });
};
