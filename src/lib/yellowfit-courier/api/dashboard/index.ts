import { apiCall, API_ENDPOINTS } from '../../BaseUrl';

export interface DashboardStats {
  totalPickups: number;
  completedPickups: number;
  pendingPickups: number;
  todayPickups: number;
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data?: {
    stats: DashboardStats;
    recentPickups: Array<{
      id: string;
      barcode: string;
      status: string;
      pickupTime: string;
    }>;
  };
}

export const getDashboardDataApi = async (): Promise<DashboardResponse> => {
  return apiCall<DashboardResponse>(API_ENDPOINTS.DASHBOARD, {
    method: 'GET',
  });
}; 