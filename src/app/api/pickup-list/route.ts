import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tanggal = searchParams.get('tanggal');
  const token = request.headers.get('authorization');

  if (!tanggal) {
    return NextResponse.json({ error: 'Tanggal is required' }, { status: 400 });
  }
  if (!token) {
    return NextResponse.json({ error: 'No authentication token found' }, { status: 401 });
  }

  const apiUrl = `https://api.yellowfitkitchen.com/api/v2/order?tanggal=${encodeURIComponent(tanggal)}`;
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': token,
    },
  });

  const data = await response.json();
  console.log(data);
  
  return NextResponse.json(data, { status: response.status });
}
