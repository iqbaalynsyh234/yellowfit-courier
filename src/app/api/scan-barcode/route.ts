import { NextResponse } from 'next/server';
import { EXTERNAL_API_URL } from '@/lib/yellowfit-courier/api/BaseUrl';

export async function POST(request: Request) {
 try {
  const { searchParams } = new URL(request.url);
  const barcode = searchParams.get('barcode');
  const token = request.headers.get('Authorization');

  if (!barcode) {
   return NextResponse.json({ error: 'Barcode is required' }, { status: 400 });
  }

  if (!token) {
   return NextResponse.json(
    { error: 'Authorization token is required' },
    { status: 401 }
   );
  }

  const response = await fetch(
   `${EXTERNAL_API_URL}/api/v2/order/detail/scan?barcode=${barcode}`,
   {
    method: 'POST',
    headers: {
     Authorization: token,
     Accept: 'application/json',
    },
   }
  );

  const data = await response.json();

  if (!response.ok) {
   return NextResponse.json(
    { error: data.message || 'Failed to scan barcode' },
    { status: response.status }
   );
  }

  return NextResponse.json(data);
 } catch (error) {
  console.error('Scan error:', error);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
 }
}
