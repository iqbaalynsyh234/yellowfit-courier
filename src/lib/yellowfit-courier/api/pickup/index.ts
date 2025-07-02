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
  params?: PickupRequest,
  token?: string
): Promise<PickupApiResponse> => {
  const tanggal = params?.tanggal || '';
  const query = tanggal ? `?tanggal=${encodeURIComponent(tanggal)}` : '';
  return axiosExternalInstance.get<PickupApiResponse>(
    `${API_ENDPOINTS.V2_ORDER}${query}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }
  ).then(res => res.data);
};

export const getPickupDetailApi = async (id: string): Promise<PickupDetailResponse> => {
  return apiCall<PickupDetailResponse>(API_ENDPOINTS.PICKUP_DETAIL(id), {
    method: 'GET',
  });
};
