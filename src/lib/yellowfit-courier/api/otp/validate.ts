import { API_ENDPOINTS } from '../ApiEndpoints';
import { axiosExternalInstance } from '../BaseUrl';

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
 } catch (error: any) {
  console.error('OTP verification error:', error);
  const errorMessage =
   error.response?.data?.message || error.message || 'OTP verification failed';
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
 } catch (error: any) {
  return {
   success: false,
   message: error.message || 'OTP validation failed',
  };
 }
};
