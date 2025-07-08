import { NextResponse } from 'next/server';
import { API_ENDPOINTS } from '@/lib/yellowfit-courier/api/ApiEndpoints';
import { axiosExternalInstance } from '@/lib/yellowfit-courier/api/BaseUrl';
import { headers } from 'next/headers';

export async function POST(request: Request) {
 try {
  const headersList = await headers();
  const token = headersList.get('authorization');

  if (!token) {
   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { barcode } = body;

  if (!barcode) {
   return NextResponse.json(
    { message: 'Barcode is required' },
    { status: 400 }
   );
  }

  const response = await axiosExternalInstance.post(
   API_ENDPOINTS.SCAN_BARCODE,
   { barcode },
   {
    headers: {
     Authorization: token,
     'Content-Type': 'application/json',
     Accept: 'application/json',
    },
   }
  );

  return NextResponse.json(response.data);
 } catch (error: any) {
  console.error('Scan error:', error.response?.data || error.message);

  // If it's an error from the external API, forward its response
  if (error.response?.data) {
   return NextResponse.json(error.response.data, {
    status: error.response.status,
   });
  }

  return NextResponse.json(
   { message: 'Failed to scan barcode' },
   { status: 500 }
  );
 }
}
