import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
 try {
  const searchParams = request.nextUrl.searchParams;
  const tanggal = searchParams.get('tanggal');
  const page = searchParams.get('page') || '1';

  const token = request.headers.get('authorization')?.split(' ')[1];
  if (!token) {
   throw new Error('No authentication token provided');
  }

  const response = await fetch(
   `https://api.yellowfitkitchen.com/api/v2/order/detail?tanggal=${tanggal}&page=${page}`,
   {
    headers: {
     Accept: 'application/json',
     Authorization: `Bearer ${token}`,
    },
   }
  );

  const data = await response.json();
  if (!response.ok) {
   throw new Error(data.message || 'Failed to fetch dashboard data');
  }

  return NextResponse.json(data);
 } catch (error: unknown) {
  console.error('Dashboard API error:', error);
  const errorMessage =
   error instanceof Error ? error.message : 'Internal server error';
  return NextResponse.json({ error: errorMessage }, { status: 500 });
 }
}
