import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  // Проверка, существует ли кукис
  console.log(token);
  if (!token) {
    // Если кукиса нет, перенаправляем на страницу входа
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Если кукис существует, продолжаем обработку запроса
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/about/:path*',
};
