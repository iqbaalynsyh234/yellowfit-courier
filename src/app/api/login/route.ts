import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
 try {
  const body = await request.json();

  const response = await fetch(
   'https://api.yellowfitkitchen.com/api/mobile/login',
   {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
     Accept: 'application/json',
     'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(body),
   }
  );

  const data = await response.json();

  if (!response.ok) {
   return NextResponse.json(
    { error: data.message || 'Login failed' },
    { status: response.status }
   );
  }

  // Pass through the complete response including any expire_time
  return NextResponse.json({
   ...data,
   expire_time:
    data.expire_time ||
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  });
 } catch (error: unknown) {
  console.error('Proxy login error:', error);
  const errorMessage =
   error instanceof Error ? error.message : 'Internal server error';
  return NextResponse.json({ error: errorMessage }, { status: 500 });
 }
}
