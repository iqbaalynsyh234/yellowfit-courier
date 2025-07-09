import { API_ENDPOINTS } from '../ApiEndpoints';
import { BASE_URL } from '../BaseUrl';
import { TugasApiResponse } from '@/interfaces/Tugas';

export const getTugasList = async (
 page: number = 20
): Promise<TugasApiResponse> => {
 try {
  const token =
   typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (!token) {
   throw new Error('No authentication token found');
  }

  const today = new Date();
  const tanggal = today.toISOString().split('T')[0];

  const queryParams = new URLSearchParams({
   tanggal,
   page: page.toString(),
  });
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

  return responseData;
 } catch (error) {
  console.error('Error fetching tugas list:', error);
  throw error;
 }
};
