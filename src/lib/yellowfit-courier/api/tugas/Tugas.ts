import { API_ENDPOINTS } from '../ApiEndpoints';
import { BASE_URL } from '../BaseUrl';
import { TugasResponse, TugasApiResponse } from '@/interfaces/Tugas';

export const getTugasList = async (): Promise<TugasResponse[]> => {
 try {
  const token =
   typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (!token) {
   throw new Error('No authentication token found');
  }

  const today = new Date();
  const tanggal = today.toISOString().split('T')[0];

  const queryParams = new URLSearchParams({ tanggal });
  const apiUrl = `${BASE_URL}${API_ENDPOINTS.TUGAS}?${queryParams}`;

  const response = await fetch(apiUrl, {
   method: 'GET',
   headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
   },
  });

  const responseData: TugasApiResponse = await response.json();

  if (!response.ok) {
   throw new Error(responseData.status || 'Failed to fetch tugas list');
  }

  return responseData.data?.data || [];
 } catch (error) {
  console.error('Error fetching tugas list:', error);
  throw error;
 }
};
