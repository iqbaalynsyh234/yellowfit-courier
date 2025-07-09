import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
 try {
  const searchParams = request.nextUrl.searchParams;
  const generate_code = searchParams.get('generate_code');
  const tanggal = searchParams.get('tanggal');
  const page = searchParams.get('page') || '1';
  const token = request.headers.get('authorization');

  if (!generate_code || !tanggal) {
   return NextResponse.json(
    { error: 'generate_code and tanggal are required' },
    { status: 400 }
   );
  }
  if (!token) {
   return NextResponse.json(
    { error: 'No authentication token found' },
    { status: 401 }
   );
  }

  const queryParams = new URLSearchParams({
   generate_code: generate_code,
   tanggal: tanggal,
   page: page,
  });

  const apiUrl = `https://api.yellowfitkitchen.com/api/v2/order/detail?${queryParams.toString()}`;
  const response = await fetch(apiUrl, {
   method: 'GET',
   headers: {
    Accept: 'application/json',
    Authorization: token,
   },
  });

  const data = await response.json();
  if (!response.ok) {
   throw new Error(data.message || 'Failed to fetch pickup detail');
  }

  return NextResponse.json(data);
 } catch (error: unknown) {
  console.error('Pickup detail API error:', error);
  const errorMessage =
   error instanceof Error ? error.message : 'Internal server error';
  return NextResponse.json({ error: errorMessage }, { status: 500 });
 }
}
