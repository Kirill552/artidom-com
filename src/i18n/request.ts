import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  const currentLocale = locale || routing.defaultLocale;
  const finalLocale = routing.locales.includes(currentLocale as any) 
    ? currentLocale 
    : routing.defaultLocale;

  return {
    locale: finalLocale,
    messages: (await import(`../messages/${finalLocale}.json`)).default
  };
});
