import { API_ENDPOINTS } from '../ApiEndpoints';
import { BASE_URL } from '../BaseUrl';

export interface TugasResponse {
 id: number;
 sesi: string;
 label: string;
 kode: string;
 customer: string;
 alamat: string;
 tanggal: string;
}

export const getTugasList = async (): Promise<TugasResponse[]> => {
 try {
  const response = await fetch(`${BASE_URL}${API_ENDPOINTS.TUGAS}`, {
   method: 'GET',
   headers: {
    'Content-Type': 'application/json',
   },
   credentials: 'include',
  });

  if (!response.ok) {
   throw new Error('Failed to fetch tugas list');
  }

  const data = await response.json();
  return data;
 } catch (error) {
  console.error('Error fetching tugas list:', error);
  throw error;
 }
};
