export interface SigninRequest {
  phone: string;  
}
export interface SigninResponse {
  success: boolean;
  message: string;
  data?: {
    token?: string;
    otp_token?: string;
    user?: {
      id: string;
      name: string;
      phone: string;  
    };
  };
}