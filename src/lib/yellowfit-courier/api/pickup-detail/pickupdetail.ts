import { PickupDetailResponse } from '@/interfaces/PickupDetail';

const Tugas = {
 getTugasList: async (tanggal: string, token: string): Promise<any> => {
  const query = tanggal ? `?tanggal=${encodeURIComponent(tanggal)}` : '';
  const response = await fetch(`/api/tugas${query}`, {
   method: 'GET',
   headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
   },
  });
  return await response.json();
 },
};

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
