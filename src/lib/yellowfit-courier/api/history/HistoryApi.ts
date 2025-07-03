import { Root, Daum } from '@/interfaces/Dashboard';

export const getOrderHistoryApi = async (tanggal?: string): Promise<Root> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authentication token found');
  const query = tanggal ? `?tanggal=${encodeURIComponent(tanggal)}` : '';
  const response = await fetch(`/api/history${query}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to fetch order history');
  // filter data selesai
  return {
    ...data,
    data: {
      ...data.data,
      data: data.data.data.filter((item: Daum) => item.sts_kirim === '1'),
    },
  };
};

// Fetch detail pengiriman by barcode/id
export const getOrderHistoryDetailApi = async (barcode: string | number) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authentication token found');
  const response = await fetch(`/api/history/find-one?barcode=${barcode}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });
  const data = await response.json();
  // console.log(data);
  if (!response.ok) throw new Error(data.error || 'Failed to fetch order detail');
  return data;
};
