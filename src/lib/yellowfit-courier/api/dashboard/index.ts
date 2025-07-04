import { apiCall, axiosExternalInstance } from '../BaseUrl';
import { API_ENDPOINTS } from '../ApiEndpoints';
import type {
 Root as OrderDetailResponse,
 Daum as OrderSummaryResponse,
} from '@/interfaces/Dashboard';

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

export const getOrderDetailApi = async (
 tanggal?: string
): Promise<OrderDetailResponse> => {
 try {
  const token = localStorage.getItem('token');
  if (!token) {
   throw new Error('No authentication token found');
  }

  const query = tanggal ? `?tanggal=${encodeURIComponent(tanggal)}` : '';
  const response = await axiosExternalInstance.get<OrderDetailResponse>(
   `${API_ENDPOINTS.V2_ORDER_DETAIL}${query}`,
   {
    headers: {
     Authorization: `Bearer ${token}`,
     Accept: 'application/json',
    },
   }
  );

  console.log('response order detail:', response.data);
  return response.data;
 } catch (error: unknown) {
  console.error('Order detail error:', error);
  throw new Error(
   (error as { response?: { data?: { message?: string } } })?.response?.data
    ?.message ||
    (error as Error)?.message ||
    'Failed to fetch order detail'
  );
 }
};

export const getOrderSummaryApi = async (
 tanggal: string
): Promise<OrderSummaryResponse> => {
 try {
  const token = localStorage.getItem('token');
  if (!token) {
   throw new Error('No authentication token found');
  }
  const response = await fetch(
   `/api/order-summary?tanggal=${encodeURIComponent(tanggal)}`,
   {
    method: 'GET',
    headers: {
     Accept: 'application/json',
     Authorization: `Bearer ${token}`,
    },
   }
  );
  const data = await response.json();
  console.log('Order summary response:', data);

  if (!response.ok) {
   throw new Error(data.error || 'Failed to fetch order summary');
  }
  return data;
 } catch (error: unknown) {
  console.error('Order summary error:', error);
  throw new Error((error as Error)?.message || 'Failed to fetch order summary');
 }
};

export const getOrderStatus = (sts_kirim: string, kurirdmd?: string | null) => {
 if (sts_kirim === '1') {
  return {
   status: 'Selesai',
   bgColor: 'bg-green-200',
   textColor: 'text-green-700',
  };
 } else if (sts_kirim === '0' && kurirdmd != null) {
  return {
   status: 'Dalam Pengantaran',
   bgColor: 'bg-orange-200',
   textColor: 'text-orange-700',
  };
 } else if (sts_kirim === '0' && kurirdmd == null) {
  return {
   status: 'Belum Pickup',
   bgColor: 'bg-gray-200',
   textColor: 'text-gray-600',
  };
 } else {
  return {
   status: 'Status Tidak Diketahui',
   bgColor: 'bg-gray-400',
   textColor: 'text-gray-800',
  };
 }
};

export type { Daum as OrderDetailItem } from '@/interfaces/Dashboard';
