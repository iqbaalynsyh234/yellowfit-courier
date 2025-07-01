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
