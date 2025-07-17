import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from './app/lib/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/success_authenticated') {
    const params = new URL(request.url).searchParams;
    const url = new URL('/chat', request.url);
    return NextResponse.redirect(url);
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    '/success_authenticated',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}