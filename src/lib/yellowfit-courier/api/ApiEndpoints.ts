export const API_ENDPOINTS = {
  SIGNIN: '/auth/signin',
  OTP: '/auth/otp',
  DASHBOARD: '/dashboard',
  PICKUP: '/pickup',
  PICKUP_DETAIL: (id: string) => `/pickup/${id}`,
  PROFILE: '/profile',
} as const;