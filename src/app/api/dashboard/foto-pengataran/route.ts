import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
 const token = request.headers.get('authorization');
 if (!token) {
  return NextResponse.json(
   { error: 'No authentication token found' },
   { status: 401 }
  );
 }

 let body;
 try {
  body = await request.json();
 } catch {
  return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
 }
 const apiUrl =
  'https://api.yellowfitkitchen.com/api/v2/order/detail/foto-pengantaran';
 const response = await fetch(apiUrl, {
  method: 'POST',
  headers: {
   Accept: 'application/json',
   'Content-Type': 'application/json',
   Authorization: token,
  },
  body: JSON.stringify(body),
 });

 const data = await response.json();
 if (!response.ok) {
  return NextResponse.json(
   { error: data.message || 'Failed to upload delivery photo' },
   { status: response.status }
  );
 }
 return NextResponse.json(data);
}
