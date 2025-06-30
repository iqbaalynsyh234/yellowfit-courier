import { apiCall, API_ENDPOINTS } from '../../BaseUrl';

export interface PickupRequest {
  barcode: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface PickupResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    barcode: string;
    status: string;
    pickupTime: string;
  };
}

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

export const createPickupApi = async (pickupData: PickupRequest): Promise<PickupResponse> => {
  return apiCall<PickupResponse>(API_ENDPOINTS.PICKUP, {
    method: 'POST',
    body: JSON.stringify(pickupData),
  });
};

export const getPickupDetailApi = async (id: string): Promise<PickupDetailResponse> => {
  return apiCall<PickupDetailResponse>(API_ENDPOINTS.PICKUP_DETAIL(id), {
    method: 'GET',
  });
}; 