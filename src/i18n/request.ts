import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { isAppLocale } from './locale-config';

const messageImports = {
  en: () => import('../messages/en.json'),
  sr: () => import('../messages/sr.json'),
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !isAppLocale(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await messageImports[locale as keyof typeof messageImports]()).default
  };
});
