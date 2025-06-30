export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/pages/dashboard',
  PICKUP: '/pages/pickup',
  PICKUP_DETAIL: (id: string) => `/pages/pickup/detail/${id}`,
  HISTORY: '/pages/history',
  PROFILE: '/pages/profile',
} as const; 