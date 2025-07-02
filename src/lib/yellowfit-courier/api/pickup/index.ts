import { apiCall, axiosExternalInstance } from '../BaseUrl';
import { API_ENDPOINTS } from '../ApiEndpoints';
import { PickupApiResponse, PickupRequest } from '../../../../interfaces/Pickup';

export interface PickupDetailResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    barcode: string;
    status: string;
    pickupTime: string;
    deliveryAddress: string;
  customerName: string;
    customerPhone: string;
  };
}

export const getPickupListApi = async (
  tanggal: string,
  token: string
): Promise<PickupApiResponse> => {
  const query = tanggal ? `?tanggal=${encodeURIComponent(tanggal)}` : '';
  const response = await fetch(`/api/pickup-list${query}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return await response.json();
};

export const getPickupDetailApi = async (id: string): Promise<PickupDetailResponse> => {
  return apiCall<PickupDetailResponse>(API_ENDPOINTS.PICKUP_DETAIL(id), {
    method: 'GET',
  });
};
