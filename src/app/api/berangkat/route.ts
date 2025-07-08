import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
 try {
  const token = request.headers.get('authorization');
  if (!token) {
   return NextResponse.json(
    { error: 'No authentication token found' },
    { status: 401 }
   );
  }

  const { searchParams } = new URL(request.url);
  const generate_code = searchParams.get('generate_code');
  const tanggal = searchParams.get('tanggal');

  if (!generate_code || !tanggal) {
   return NextResponse.json(
    { error: 'Generate code and tanggal are required' },
    { status: 400 }
   );
  }

  const apiUrl = `https://api.yellowfitkitchen.com/api/v2/order/detail/berangkat?generate_code=${encodeURIComponent(
   generate_code
  )}&tanggal=${encodeURIComponent(tanggal)}`;

  console.log('Calling API:', apiUrl); // Debug log

  const response = await fetch(apiUrl, {
   method: 'GET',
   headers: {
    Accept: 'application/json',
    Authorization: token,
   },
  });

  if (!response.ok) {
   const errorText = await response.text();
   console.error('API Error Response:', errorText); // Debug log
   try {
    const errorJson = JSON.parse(errorText);
    return NextResponse.json(
     { error: errorJson.message || 'Failed to process berangkat' },
     { status: response.status }
    );
   } catch {
    return NextResponse.json(
     { error: 'Failed to process berangkat' },
     { status: response.status }
    );
   }
  }

  const data = await response.json();
  return NextResponse.json(data);
 } catch (error: Error | unknown) {
  console.error('Berangkat error:', error); // Debug log
  return NextResponse.json(
   { error: error instanceof Error ? error.message : 'Internal server error' },
   { status: 500 }
  );
 }
}
 