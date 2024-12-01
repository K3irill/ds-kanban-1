// middleware.ts
import { NextResponse, NextRequest } from 'next/server';

function middleware(request: NextRequest) {
  console.log('Request URL:', request.url);
  console.log('Request Headers:', request.headers);

  // Ваша логика middleware
  const response = NextResponse.next();

  console.log('Response Status:', response.status);
  console.log('Response Headers:', response.headers);

  return response;
}
export default middleware;
