import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { mapLegacyLocalePathname } from './i18n/locale-config';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const legacyPathname = mapLegacyLocalePathname(request.nextUrl.pathname);

  if (legacyPathname) {
    const url = request.nextUrl.clone();
    url.pathname = legacyPathname;
    return NextResponse.redirect(url, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en|sr)/:path*']
};
