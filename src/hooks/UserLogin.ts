import { useState } from 'react';
import { signinApi } from '@/lib/yellowfit-courier/api/signin/index';

export function useUserLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (phone: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await signinApi({ phone });
      setLoading(false);
      
      // Store token if provided in the response
      if (data && data.data?.token) {
        localStorage.setItem('token', data.data.token);
      }
      
      return data;
    } catch (err: any) {
      setLoading(false);
      if (err.message) {
        setError(err.message);
      } else {
        setError('Terjadi kesalahan, coba lagi!');
      }
      return null;
    }
  };

  return { login, loading, error, setError };
}
