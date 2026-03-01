import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  let finalLocale = locale;
  if (!routing.locales.includes(locale as any)) {
    finalLocale = routing.defaultLocale;
  }

  return {
    locale: finalLocale,
    messages: (await import(`../messages/${finalLocale}.json`)).default
  };
});
