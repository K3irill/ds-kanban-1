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

// Применяется только к маршрутам, начинающимся с /projects/
export const config = {
  matcher: '/projects/:path*',
};

// на будущее
// const redirectToLogin = (request: NextRequest) =>
//   NextResponse.redirect(new URL('/404', request.url));
