import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { mapLegacyLocalePathname } from './i18n/locale-config';

const intlMiddleware = createMiddleware(routing);
const canonicalHost = 'www.artidom.art';

export default function middleware(request: NextRequest) {
  const hostname = (request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? request.nextUrl.hostname)
    .split(':')[0];

  if (hostname === 'artidom.art') {
    const url = request.nextUrl.clone();
    url.hostname = canonicalHost;
    return NextResponse.redirect(url, 308);
  }

  const legacyPathname = mapLegacyLocalePathname(request.nextUrl.pathname);

  if (legacyPathname) {
    const url = request.nextUrl.clone();
    url.pathname = legacyPathname;
    return NextResponse.redirect(url, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
