import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tanggal = searchParams.get('tanggal');
    const authorization = request.headers.get('authorization');
    
    if (!tanggal) {
      return NextResponse.json({ error: 'Tanggal parameter is required' }, { status: 400 });
    }
    
    if (!authorization) {
      return NextResponse.json({ error: 'Authorization header is required' }, { status: 401 });
    }
    
    const response = await fetch(`https://api.yellowfitkitchen.com/api/order/summary?tanggal=${encodeURIComponent(tanggal)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': authorization,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Order summary request failed' }, { status: response.status });
    }
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
} 