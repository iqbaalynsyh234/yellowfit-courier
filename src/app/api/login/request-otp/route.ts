import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await fetch('https://api.yellowfitkitchen.com/api/mobile/login/request-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Request OTP failed' },
        { status: response.status }
      );
    }
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Proxy request-otp error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
