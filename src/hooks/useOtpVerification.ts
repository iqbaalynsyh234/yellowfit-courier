import { useState } from 'react';
import { validateOtpApi } from '@/lib/yellowfit-courier/api/otp/validate';

export function useOtpVerification() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyOtp = async (phone: string, otp: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await validateOtpApi({ phone, otp });
      setLoading(false);
      return data;
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Terjadi kesalahan, coba lagi!');
      return null;
    }
  };

  return { verifyOtp, loading, error, setError };
} 