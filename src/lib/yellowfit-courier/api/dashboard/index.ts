import { apiCall, axiosExternalInstance } from '../BaseUrl';
import { API_ENDPOINTS } from '../ApiEndpoints';
import { OrderSummaryRequest, OrderSummaryResponse } from '../../../../interfaces/OrderSummary';

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

export const getOrderSummaryApi = async (tanggal: string): Promise<OrderSummaryResponse> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await fetch(`/api/order-summary?tanggal=${encodeURIComponent(tanggal)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log('Order summary response:', data);
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch order summary');
    }
    return data;
  } catch (error: any) {
    console.error('Order summary error:', error);
    throw new Error(error.message || 'Failed to fetch order summary');
  }
}; 