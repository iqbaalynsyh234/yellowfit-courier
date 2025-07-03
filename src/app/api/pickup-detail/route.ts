import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { generate_code, tanggal } = await request.json();
  const token = request.headers.get('authorization');

  if (!generate_code || !tanggal) {
    return NextResponse.json({ error: 'generate_code and tanggal are required' }, { status: 400 });
  }
  if (!token) {
    return NextResponse.json({ error: 'No authentication token found' }, { status: 401 });
  }

  const apiUrl = 'https://api.yellowfitkitchen.com/api/v2/order/detail';
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify({ generate_code, tanggal }),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
