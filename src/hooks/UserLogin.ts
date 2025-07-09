import { useState } from 'react';
import { signinApi } from '@/lib/yellowfit-courier/api/signin';

export const useUserLogin = () => {
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

 const login = async (phone: string) => {
  try {
   setLoading(true);
   setError(null);
   const response = await signinApi({ phone });
   return response;
  } catch (err) {
   const errorMessage = err instanceof Error ? err.message : 'Login failed';
   setError(errorMessage);
   return { success: false, message: errorMessage };
  } finally {
   setLoading(false);
  }
 };

 return { login, loading, error, setError };
};
