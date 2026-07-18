import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { defaultLocale, isAppLocale, type AppLocale } from '@/i18n/locale-config';
import WorkshopProof from '@/components/WorkshopProof';
import Veil from '@/components/motion/Veil';
import { getPageMetadata } from '@/lib/seo/page-metadata';
import { getHowToSchema, getFaqPageSchema, getSpeakableSchema } from '@/lib/seo/local-page-schema';
import FaqSection from '@/components/FaqSection';
import HeroSection from '@/features/home-v2/HeroSection';
import FeaturedCase from '@/features/home-v2/FeaturedCase';
import SectorIndex from '@/features/home-v2/SectorIndex';
import ProcessScene from '@/features/home-v2/ProcessScene';
import PricingSection from '@/features/home-v2/PricingSection';
import CtaSection from '@/features/home-v2/CtaSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const appLocale = isAppLocale(locale) ? locale : defaultLocale;

  return getPageMetadata({ locale: appLocale, namespace: 'Index' });
}

export default async function IndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Index');
  const localeKey: AppLocale = isAppLocale(locale) ? locale : defaultLocale;

  const faqT = await getTranslations('FAQ');
  const faqItems = faqT.raw('items') as Array<{ question: string; answer: string }>;
  const faqSchema = getFaqPageSchema(faqItems);

  const howToSchema = getHowToSchema(
    t('process.title'),
    localeKey === 'sr'
      ? 'Kako naručiti namještaj po mjeri u Crnoj Gori — od brifa do montaže'
      : 'How to order custom furniture in Montenegro — from brief to installation',
    ['step1', 'step2', 'step3', 'step4'].map((s) => ({
      name: t(`process.${s}`),
      text: t(`process.${s}_text`),
    })),
  );
  const speakableSchema = getSpeakableSchema(`https://artidom.art/${localeKey}`);

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
    <Veil />
    <main>
      <HeroSection />
      <WorkshopProof variant="default" />
      <FeaturedCase locale={localeKey} />
      <SectorIndex />
      <ProcessScene />
      <PricingSection />
      <div className="rv container">
        <FaqSection title={faqT('title')} items={faqItems} />
      </div>
      <CtaSection />
    </main>
    </>
  );
}
