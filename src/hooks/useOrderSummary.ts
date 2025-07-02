import { useState, useEffect } from 'react';
import { getOrderSummaryApi } from '@/lib/yellowfit-courier/api/dashboard';
import { OrderSummaryResponse } from '@/interfaces/OrderSummary';
import { format } from 'date-fns';

export const useOrderSummary = (tanggal?: string) => {
  const [data, setData] = useState<OrderSummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const dateToUse = tanggal || format(new Date(), 'yyyy-MM-dd');
        const result = await getOrderSummaryApi(dateToUse);
        setData(result);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch order summary');
        console.error('Order summary error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tanggal]);

  return { data, loading, error };
}; 