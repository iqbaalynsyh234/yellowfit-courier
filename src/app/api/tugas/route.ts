import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { BASE_URL } from '@/lib/yellowfit-courier/api/BaseUrl';
import { API_ENDPOINTS } from '@/lib/yellowfit-courier/api/ApiEndpoints';

export async function GET() {
 try {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const response = await fetch(`${BASE_URL}${API_ENDPOINTS.TUGAS}`, {
   method: 'GET',
   headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token.value}`,
   },
  });

  if (!response.ok) {
   throw new Error('Failed to fetch tasks');
  }

  const data = await response.json();
  return NextResponse.json(data);
 } catch (error) {
  console.error('Error in tugas route:', error);
  return NextResponse.json(
   { message: 'Internal Server Error' },
   { status: 500 }
  );
 }
}
