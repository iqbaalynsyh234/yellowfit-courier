import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = request.headers.get('authorization');
  const barcode = searchParams.get('barcode');
  if (!barcode) {
    return NextResponse.json({ error: 'barcode is required' }, { status: 400 });
  }
  if (!token) {
    return NextResponse.json({ error: 'No authentication token found' }, { status: 401 });
  }
  const apiUrl = `https://api.yellowfitkitchen.com/api/v2/order/detail/find-one?barcode=${encodeURIComponent(barcode)}`;
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': token,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    return NextResponse.json(
      { error: data.message || 'Failed to fetch order detail' },
      { status: response.status }
    );
  }
  return NextResponse.json(data);
}
