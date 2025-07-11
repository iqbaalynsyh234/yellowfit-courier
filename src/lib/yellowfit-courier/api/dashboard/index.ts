import { apiCall } from '../BaseUrl';
import { API_ENDPOINTS } from '../ApiEndpoints';
import type {
 Root as OrderDetailResponse,
 Daum as OrderSummaryResponse,
 ScanResponse,
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
 tanggal?: string,
 page: number = 1
): Promise<OrderDetailResponse> => {
 try {
  const token = localStorage.getItem('token');
  if (!token) {
   throw new Error('No authentication token found');
  }

  const queryParams = new URLSearchParams();
  if (tanggal) queryParams.append('tanggal', tanggal);
  queryParams.append('page', page.toString());

  const response = await fetch(`/api/dashboard?${queryParams.toString()}`, {
   method: 'GET',
   headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
   },
  });

  const data = await response.json();
  if (!response.ok) {
   throw new Error(data.error || 'Failed to fetch order detail');
  }

  return data;
 } catch (error: unknown) {
  console.error('Order detail error:', error);
  throw new Error(
   (error as { message?: string })?.message || 'Failed to fetch order detail'
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
   bgColor: 'bg-emerald-200',
   textColor: 'text-emerald-700',
  };
 } else if (sts_kirim === '0' && kurirdmd != null) {
  return {
   status: 'Dalam Pengantaran',
   bgColor: 'bg-yellow-200',
   textColor: 'text-yellow-700',
  };
 } else if (sts_kirim === '0' && kurirdmd == null) {
  return {
   status: 'Belum Pickup',
   bgColor: 'bg-red-200',
   textColor: 'text-red-700',
  };
 } else {
  return {
   status: 'Status Tidak Diketahui',
   bgColor: 'bg-gray-200',
   textColor: 'text-gray-700',
  };
 }
};

export type { Daum as OrderDetailItem } from '@/interfaces/Dashboard';

export const setDeliveryData = async (formData: FormData) => {
 try {
  const token = localStorage.getItem('token');
  if (!token) {
   throw new Error('No authentication token found');
  }

  const response = await fetch('/api/set-data', {
   method: 'POST',
   headers: {
    Authorization: `Bearer ${token}`,
   },
   body: formData,
  });

  if (!response.ok) {
   const errorData = await response.json();
   throw new Error(errorData.message || 'Failed to upload data');
  }

  return await response.json();
 } catch (error) {
  console.error('Set delivery data error:', error);
  throw error;
 }
};

export const scanBarcode = async (barcode: string): Promise<ScanResponse> => {
 try {
  const token = localStorage.getItem('token');
  if (!token) {
   throw new Error('No authentication token found');
  }

  const response = await fetch(
   `/api/scan-barcode?barcode=${encodeURIComponent(barcode)}`,
   {
    method: 'POST',
    headers: {
     Authorization: `Bearer ${token}`,
     Accept: 'application/json',
    },
   }
  );

  const data = await response.json();

  if (!response.ok) {
   throw new Error(data.error || 'Failed to scan barcode');
  }

  return data;
 } catch (error: unknown) {
  console.error('Scan error:', error);
  if ((error as { message?: string })?.message?.includes('not found')) {
   throw new Error('Barcode tidak ditemukan');
  }
  throw new Error((error as Error)?.message || 'Failed to scan barcode');
 }
};
