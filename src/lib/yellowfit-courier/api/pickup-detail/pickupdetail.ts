import { PickupDetailResponse } from '@/interfaces/PickupDetail';

export interface PickupDetailRequest {
 generate_code: string;
 tanggal: string;
}

export async function getPickupDetailByGenerateCode(
 generate_code: string,
 tanggal: string,
 token: string
): Promise<PickupDetailResponse> {
 const query = `?generate_code=${encodeURIComponent(
  generate_code
 )}&tanggal=${encodeURIComponent(tanggal)}`;
 const response = await fetch(`/api/pickup-detail${query}`, {
  method: 'GET',
  headers: {
   Accept: 'application/json',
   Authorization: `Bearer ${token}`,
  },
 });
 return await response.json();
}
