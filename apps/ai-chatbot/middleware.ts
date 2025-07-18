import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from './app/lib/utils/supabase/middleware';
import { createClient } from './app/lib/utils/supabase/server';

const isAuthenticated =  async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  
  return data.user !== null && !error;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authenticated = await isAuthenticated();

  if (
    pathname === "/" 
    || pathname === '/success_authenticated' 
    || ((pathname === '/login' || pathname === '/signup') && authenticated)
    || (pathname.includes('/chat/') && !authenticated)
  ) {
    const url = new URL('/home', request.url);
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