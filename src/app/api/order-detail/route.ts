import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { EXTERNAL_API_URL } from '@/lib/yellowfit-courier/api/BaseUrl';
import { API_ENDPOINTS } from '@/lib/yellowfit-courier/api/ApiEndpoints';

export async function GET(request: Request) {
 try {
  const { searchParams } = new URL(request.url);
  const tanggal = searchParams.get('tanggal');
  const generate_code = searchParams.get('generate_code');
  const customer = searchParams.get('customer');
  const barcode = searchParams.get('barcode');
  const sts_kirim = searchParams.get('sts_kirim');

  // Get token from localStorage in client-side code
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const response = await fetch(`${EXTERNAL_API_URL}${API_ENDPOINTS.TUGAS}`, {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token.value}`,
   },
   body: JSON.stringify({
    tanggal: tanggal || '',
    ...(generate_code && { generate_code }),
    ...(customer && { customer }),
    ...(barcode && { barcode: Number(barcode) }),
    ...(sts_kirim && { sts_kirim }),
   }),
  });

  if (!response.ok) {
   const errorData = await response.json().catch(() => ({}));
   return NextResponse.json(
    { message: errorData.message || 'Failed to fetch order detail' },
    { status: response.status }
   );
  }

  const data = await response.json();
  return NextResponse.json(data);
 } catch (error) {
  console.error('Error in order detail route:', error);
  return NextResponse.json(
   { message: 'Internal Server Error' },
   { status: 500 }
  );
 }
}
