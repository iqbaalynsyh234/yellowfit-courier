import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { BASE_URL } from '@/lib/yellowfit-courier/api/BaseUrl';
import { API_ENDPOINTS } from '@/lib/yellowfit-courier/api/ApiEndpoints';

export async function POST(request: Request) {
 try {
  const cookieStore = await cookies();
  const authHeader = request.headers.get('Authorization');

  let token = cookieStore.get('token');

  // If no cookie token but we have Authorization header, use that
  if (!token && authHeader?.startsWith('Bearer ')) {
   const tokenValue = authHeader.split('Bearer ')[1];
   token = { name: 'token', value: tokenValue };
  }

  if (!token) {
   console.error(
    'API Route: No token found in cookies or Authorization header'
   );
   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  console.log('API Route: Token found:', token.value.substring(0, 10) + '...');

  const body = await request.json();
  const { tanggal } = body;

  if (!tanggal) {
   console.error('API Route: Tanggal is missing from request body');
   return NextResponse.json(
    { message: 'Tanggal is required' },
    { status: 400 }
   );
  }

  console.log('API Route: Request body:', body);

  // Construct URL with query parameters
  const queryParams = new URLSearchParams({ tanggal });
  const apiUrl = `${BASE_URL}${API_ENDPOINTS.TUGAS}?${queryParams}`;
  console.log('API Route: Making external API request to:', apiUrl);
  console.log('API Route: Request params:', { tanggal });

  const response = await fetch(apiUrl, {
   method: 'GET',
   headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token.value}`,
   },
  });

  console.log('API Route: External API response status:', response.status);

  const responseText = await response.text();
  console.log('API Route: Raw response:', responseText);

  let data;
  try {
   data = responseText ? JSON.parse(responseText) : null;
   console.log('API Route: Parsed response data:', data);
  } catch (e) {
   console.error('API Route: Failed to parse response as JSON:', e);
   console.error('API Route: Raw response was:', responseText);
   return NextResponse.json(
    { message: 'Invalid response from external API' },
    { status: 500 }
   );
  }

  if (!response.ok) {
   console.error('API Route: External API error:', data);
   return NextResponse.json(data || { message: 'External API error' }, {
    status: response.status,
   });
  }

  return NextResponse.json(data);
 } catch (error: Error | unknown) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;

  console.error('API Route: Unhandled error:', error);
  console.error('API Route: Error stack:', errorStack);

  return NextResponse.json(
   { message: 'Internal Server Error', error: errorMessage },
   { status: 500 }
  );
 }
}
