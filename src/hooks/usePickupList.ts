import { useState, useEffect } from 'react';
import { getPickupListApi } from '@/lib/yellowfit-courier/api/pickup';
import { PickupItem } from '@/interfaces/Pickup';

export function usePickupList(tanggal: string, token: string) {
  const [pickupData, setPickupData] = useState<PickupItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getPickupListApi(
          tanggal,
          token
        );
        if (response.code === 200 && response.status === 'success') {
          setPickupData(Array.isArray(response.data?.data) ? response.data.data : []);
        } else {
          setError('Failed to fetch pickup data');
        }
      } catch (err) {
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };
    if (tanggal && token) fetchData();
  }, [tanggal, token]);

  return { pickupData, loading, error };
}
