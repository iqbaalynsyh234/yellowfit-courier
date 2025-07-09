import { NextRequest, NextResponse } from 'next/server';
import { HistoryItem } from '@/interfaces/History';

export async function GET(request: NextRequest) {
 try {
  const { searchParams } = new URL(request.url);
  const tanggal = searchParams.get('tanggal');
  const page = searchParams.get('page') || '1';
  const token = request.headers.get('authorization');

  if (!tanggal) {
   return NextResponse.json({ error: 'Tanggal is required' }, { status: 400 });
  }
  if (!token) {
   return NextResponse.json(
    { error: 'No authentication token found' },
    { status: 401 }
   );
  }

  const apiUrl = `https://api.yellowfitkitchen.com/api/v2/order/detail?tanggal=${encodeURIComponent(
   tanggal
  )}&page=${page}`;

  const response = await fetch(apiUrl, {
   method: 'GET',
   headers: {
    Accept: 'application/json',
    Authorization: token,
   },
  });

  const data = await response.json();

  if (!response.ok) {
   return NextResponse.json(
    { error: data.message || 'Failed to fetch order detail' },
    { status: response.status }
   );
  }

  // Filter hanya data dengan sts_kirim === "1" dan recalculate pagination
  const completedOrders = data.data.data.filter(
   (item: HistoryItem) => item.sts_kirim === '1'
  );
  const totalCompletedOrders = completedOrders.length;
  const perPage = 20;
  const totalPages = Math.ceil(totalCompletedOrders / perPage);
  const currentPage = parseInt(page);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedOrders = completedOrders.slice(startIndex, endIndex);

  const filteredResponse = {
   ...data,
   data: {
    ...data.data,
    data: paginatedOrders,
    total: totalCompletedOrders,
    last_page: totalPages,
    from: startIndex + 1,
    to: Math.min(endIndex, totalCompletedOrders),
    per_page: perPage,
   },
  };

  return NextResponse.json(filteredResponse);
 } catch (error: Error | unknown) {
  console.error('Proxy order detail error:', error);
  return NextResponse.json(
   { error: error instanceof Error ? error.message : 'Internal server error' },
   { status: 500 }
  );
 }
}
