export const API_ENDPOINTS = {
  SIGNIN: '/auth/signin',
  OTP: '/auth/otp',
  DASHBOARD: '/dashboard',
  PICKUP_DETAIL: (id: string) => `/pickup/${id}`,
  PROFILE: '/profile',
  V2_ORDER: '/v2/order',
  LOGIN: '/mobile/login',
} as const;
