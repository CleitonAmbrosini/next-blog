import { NextResponse, type NextRequest } from 'next/server';
import { verifyJwt } from './lib/login/manage-login';

export async function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname.startsWith('/admin/login');
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');
  const isGetRequest = request.method === 'GET';

  const shouldBeAuth = isAdminPage && !isLoginPage;
  const shouldRedirect = shouldBeAuth && isGetRequest;

  if (!shouldRedirect) return NextResponse.next();

  const jwtSession = request.cookies.get(
    process.env.LOGIN_COOKIE_NAME || 'loginSession',
  )?.value;
  const isAuth = await verifyJwt(jwtSession);

  if (!isAuth) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
