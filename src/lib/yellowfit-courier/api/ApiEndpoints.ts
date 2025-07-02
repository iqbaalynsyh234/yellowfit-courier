export const API_ENDPOINTS = {
  SIGNIN: '/auth/signin',
  OTP: '/auth/otp',
  DASHBOARD: '/dashboard',
  PICKUP_DETAIL: (id: string) => `/pickup/${id}`,
  PROFILE: '/mobile/profile',
  V2_ORDER: '/v2/order',
  LOGIN: '/mobile/login',
  ORDER_SUMMARY: '/order/summary',
  LOGOUT: '/mobile/logout',
} as const;
