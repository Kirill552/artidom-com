'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { METRIKA_ID } from '@/lib/analytics';

/** Отправляет hit в Яндекс.Метрику при SPA-переходах (Next.js client navigation) */
export default function YandexMetrikaHit() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (typeof window.ym !== 'function') return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    window.ym(METRIKA_ID, 'hit', url);
  }, [pathname, searchParams]);

  return null;
}
