export const API_ENDPOINTS = {
 SIGNIN: '/api/v2/auth/login',
 VALIDATE_OTP: '/api/v2/auth/validate-otp',
 DASHBOARD: '/api/v2/dashboard',
 PICKUP: '/api/v2/pickup',
 PICKUP_DETAIL: (id: string) => `/api/v2/pickup/detail/${id}`,
 HISTORY: '/api/v2/history',
 TUGAS: '/api/v2/order/detail/tugas',
 FOTO_PENGIRIMAN: '/api/v2/dashboard/foto-pengiriman',
 ORDER_SUMMARY: '/api/v2/order/summary',
 LOGOUT: '/api/v2/auth/logout',
 V2_ORDER_DETAIL: '/api/v2/order/detail',
};
