export type SupportedSeoLocale = 'en' | 'sr' | 'ru';

export interface LocalizedText {
    en: string;
    sr: string;
    ru: string;
}

export interface FAQItem {
    question: LocalizedText;
    answer: LocalizedText;
}

export interface ResolvedFAQItem {
    question: string;
    answer: string;
}

export interface ResidentialLocalPageContent {
    slug: string;
    image: string;
    areaServed: LocalizedText;
    metaTitle: LocalizedText;
    metaDescription: LocalizedText;
    label: LocalizedText;
    title: LocalizedText;
    intro: LocalizedText;
    focusTitle: LocalizedText;
    focusItems: LocalizedText[];
    processTitle: LocalizedText;
    processItems: LocalizedText[];
    note: LocalizedText;
    cta: LocalizedText;
    faqs: FAQItem[];
}

export interface ResolvedResidentialLocalPageContent {
    slug: string;
    image: string;
    areaServed: string;
    metaTitle: string;
    metaDescription: string;
    label: string;
    title: string;
    intro: string;
    focusTitle: string;
    focusItems: string[];
    processTitle: string;
    processItems: string[];
    note: string;
    cta: string;
    faqs: ResolvedFAQItem[];
}

export interface LocalSeoLinkCard {
    slug: string;
    title: LocalizedText;
    description: LocalizedText;
}

export interface ResolvedLocalSeoLinkCard {
    slug: string;
    title: string;
    description: string;
}

export interface FAQSectionContent {
    title: LocalizedText;
    intro: LocalizedText;
    items: FAQItem[];
}

export interface ResolvedFAQSectionContent {
    title: string;
    intro: string;
    items: ResolvedFAQItem[];
}
