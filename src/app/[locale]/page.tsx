import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default function IndexPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = useTranslations('Index');

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', color: '#7a826e' }}>
        {t('hero.label')}
      </p>
      <h1 style={{ fontSize: '3rem', margin: '1rem 0' }}>{t('hero.title')}</h1>
      <p style={{ maxWidth: '600px', lineHeight: '1.6', opacity: 0.8 }}>
        {t('hero.description')}
      </p>
      <button style={{ 
        marginTop: '2rem', 
        padding: '1rem 2rem', 
        background: '#7a826e', 
        color: 'white', 
        border: 'none', 
        cursor: 'pointer' 
      }}>
        {t('hero.cta')}
      </button>

      <section style={{ marginTop: '4rem' }}>
        <h2>{t('cases.school.title')}</h2>
        <p>{t('cases.school.description')}</p>
      </section>
    </main>
  );
}
