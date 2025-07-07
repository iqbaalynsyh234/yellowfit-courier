import { NextRequest, NextResponse } from 'next/server';
import { EXTERNAL_API_URL } from '@/lib/yellowfit-courier/api/BaseUrl';
import { API_ENDPOINTS } from '@/lib/yellowfit-courier/api/ApiEndpoints';

export async function POST(request: NextRequest) {
 try {
  const token = request.headers.get('authorization');
  if (!token) {
   return NextResponse.json(
    { error: 'No authentication token found' },
    { status: 401 }
   );
  }

  const formData = await request.formData();

  // Validate required fields
  const requiredFields = [
   'generate_code',
   'barcode',
   'penerima',
   'gambar',
   'tanggal',
   'latitude',
   'longitude',
  ];
  for (const field of requiredFields) {
   if (!formData.get(field)) {
    return NextResponse.json(
     { error: `${field} is required` },
     { status: 400 }
    );
   }
  }

  const response = await fetch(`${EXTERNAL_API_URL}${API_ENDPOINTS.SET_DATA}`, {
   method: 'POST',
   headers: {
    Authorization: token,
   },
   body: formData,
  });

  if (!response.ok) {
   const errorData = await response.json();
   return NextResponse.json(
    { error: errorData.message || 'Failed to upload data' },
    { status: response.status }
   );
  }

  const data = await response.json();
  return NextResponse.json(data);
 } catch (error) {
  console.error('Set data error:', error);
  return NextResponse.json(
   { error: error instanceof Error ? error.message : 'Internal server error' },
   { status: 500 }
  );
 }
}
