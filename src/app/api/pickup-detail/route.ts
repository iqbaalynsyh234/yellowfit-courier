import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
 const searchParams = request.nextUrl.searchParams;
 const generate_code = searchParams.get('generate_code');
 const tanggal = searchParams.get('tanggal');
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

 const apiUrl = `https://api.yellowfitkitchen.com/api/v2/order/detail?generate_code=${encodeURIComponent(
  generate_code
 )}&tanggal=${encodeURIComponent(tanggal)}`;
 const response = await fetch(apiUrl, {
  method: 'GET',
  headers: {
   Accept: 'application/json',
   Authorization: token,
  },
 });

 const data = await response.json();
 return NextResponse.json(data, { status: response.status });
}
