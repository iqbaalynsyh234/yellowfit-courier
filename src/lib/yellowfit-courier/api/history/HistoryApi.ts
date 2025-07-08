import { HistoryResponse, ScanResponse } from '@/interfaces/History';

export const scanBarcode = async (barcode: string): Promise<ScanResponse> => {
 const token = localStorage.getItem('token');
 if (!token) throw new Error('No authentication token found');

 const response = await fetch('/api/v2/order/detail/scan', {
  method: 'POST',
  headers: {
   Authorization: `Bearer ${token}`,
   'Content-Type': 'application/json',
   Accept: 'application/json',
  },
  body: JSON.stringify({ barcode }),
 });

 const data = await response.json();
 if (!response.ok) {
  throw new Error(data.message || 'Failed to scan barcode');
 }
 return data;
};

export const getOrderHistoryApi = async (
 tanggal?: string
): Promise<HistoryResponse> => {
 const token = localStorage.getItem('token');
 if (!token) throw new Error('No authentication token found');
 const query = tanggal ? `?tanggal=${encodeURIComponent(tanggal)}` : '';
 const response = await fetch(`/api/history${query}`, {
  headers: {
   Authorization: `Bearer ${token}`,
   Accept: 'application/json',
  },
 });
 const data = await response.json();
 if (!response.ok)
  throw new Error(data.error || 'Failed to fetch order history');
 return data;
};

// Fetch detail pengiriman by barcode/id
export const getOrderHistoryDetailApi = async (barcode: string | number) => {
 const token = localStorage.getItem('token');
 if (!token) throw new Error('No authentication token found');
 const response = await fetch(`/api/history/find-one?barcode=${barcode}`, {
  headers: {
   Authorization: `Bearer ${token}`,
   Accept: 'application/json',
  },
 });
 const data = await response.json();
 // console.log(data);
 if (!response.ok)
  throw new Error(data.error || 'Failed to fetch order detail');
 return data;
};
