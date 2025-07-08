import { API_ENDPOINTS } from '../ApiEndpoints';
import { axiosExternalInstance } from '../BaseUrl';

interface ApiError {
 response?: {
  data?: {
   message?: string;
  };
 };
 message: string;
}

export interface OtpRequest {
 phone: string;
 otp: string;
}

export interface OtpResponse {
 success: boolean;
 message: string;
 data?: {
  token?: string;
  user?: {
   id: string;
   name: string;
   phone: string;
  };
 };
}

export const verifyOtpApi = async (
 otpData: OtpRequest
): Promise<OtpResponse> => {
 try {
  const response = await axiosExternalInstance.post(
   API_ENDPOINTS.VALIDATE_OTP,
   otpData
  );
  return response.data;
 } catch (error: unknown) {
  console.error('OTP verification error:', error);
  const err = error as ApiError;
  const errorMessage =
   err.response?.data?.message || err.message || 'OTP verification failed';
  return {
   success: false,
   message: errorMessage,
  };
 }
};

export const validateOtpApi = async ({
 phone,
 otp,
}: {
 phone: string;
 otp: string;
}) => {
 try {
  const response = await fetch('/api/validate-otp', {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify({ phone, otp }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'OTP validation failed');
  return data;
 } catch (error: unknown) {
  const err = error as ApiError;
  return {
   success: false,
   message: err.message || 'OTP validation failed',
  };
 }
};
