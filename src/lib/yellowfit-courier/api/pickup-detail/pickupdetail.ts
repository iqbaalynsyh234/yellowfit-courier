import { PickupDetailResponse } from '@/interfaces/PickupDetail';

export interface PickupDetailRequest {
 generate_code: string;
 tanggal: string;
 page?: number;
}

export async function getPickupDetailByGenerateCode(
 generate_code: string,
 tanggal: string,
 token: string,
 page: number = 1
 ): Promise<PickupDetailResponse> {
 const queryParams = new URLSearchParams({
  generate_code: generate_code,
  tanggal: tanggal,
  page: page.toString(),
 });

 const response = await fetch(`/api/pickup-detail?${queryParams.toString()}`, {
  method: 'GET',
  headers: {
   Accept: 'application/json',
   Authorization: `Bearer ${token}`,
  },
 });

 if (!response.ok) {
  const errorData = await response.json();
  throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
 }

 return await response.json();
}
