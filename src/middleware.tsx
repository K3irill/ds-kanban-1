import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { cookies } = request;

  // Получение токен
  const token = cookies.get('ACCESS_TOKEN');

  // если токена нет, делаем редирект на логин
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Применяется middleware только к пути, начинающимся с /projects/
export const config = {
  matcher: '/projects/:path*',
};
