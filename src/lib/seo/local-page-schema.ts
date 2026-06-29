interface FAQSchemaItem {
    question: string;
    answer: string;
}

interface ServiceSchemaOptions {
    title: string;
    description: string;
    areaServed: string;
    image: string;
    path: string;
    locale: 'en' | 'sr' | 'ru';
}

interface CatalogProductSchemaOptions {
    name: string;
    description: string;
    material: string;
    dimensions: string;
    leadTime: string;
    category: string;
    images: string[];
    path: string;
    locale: 'en' | 'sr' | 'ru';
}

interface ProjectSchemaOptions {
    title: string;
    description: string;
    sector: string;
    location: string;
    year: number;
    images: string[];
    path: string;
    locale: 'en' | 'sr' | 'ru';
}

interface ArticleSchemaOptions {
    title: string;
    description: string;
    image?: string;
    publishedAt: string;
    path: string;
    locale: 'en' | 'sr' | 'ru';
    tag: string;
}

const businessId = 'https://artidom.art/#localbusiness';

function absoluteUrl(pathOrUrl: string) {
    return pathOrUrl.startsWith('http') ? pathOrUrl : `https://artidom.art${pathOrUrl}`;
}

export function getFaqPageSchema(items: FAQSchemaItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };
}

interface HowToStep {
    name: string;
    text: string;
}

export function getHowToSchema(name: string, description: string, steps: HowToStep[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name,
        description,
        step: steps.map((s, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: s.name,
            text: s.text,
        })),
    };
}

interface BreadcrumbItem {
    name: string;
    url: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export function getSpeakableSchema(url: string, cssSelectors: string[] = ['h1', '[data-speakable]']) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        url,
        speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: cssSelectors,
        },
    };
}

export function getServiceSchema({ title, description, areaServed, image, path, locale }: ServiceSchemaOptions) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: title,
        serviceType: title,
        description,
        url: `https://artidom.art/${locale}${path}`,
        image: image.startsWith('http') ? image : `https://artidom.art${image}`,
        category: 'Custom furniture and joinery',
        serviceOutput: locale === 'ru'
            ? 'Кухни, шкафы, системы хранения и меблировка квартир по размерам помещения'
            : locale === 'sr'
                ? 'Kuhinje, plakari, odlaganje i opremanje apartmana po mjeri prostora'
                : 'Custom kitchens, wardrobes, storage and apartment furnishing built to the floor plan',
        areaServed: {
            '@type': areaServed === 'Montenegro' || areaServed === 'Crna Gora' || areaServed === 'Черногория' ? 'Country' : 'City',
            name: areaServed,
        },
        provider: {
            '@id': businessId,
        },
    };
}

export function getCatalogProductSchema(options: CatalogProductSchemaOptions) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: options.name,
        description: options.description,
        image: options.images.map(absoluteUrl),
        category: options.category,
        material: options.material,
        brand: {
            '@type': 'Brand',
            name: 'ARTIDOM',
        },
        manufacturer: {
            '@id': businessId,
        },
        additionalProperty: [
            { '@type': 'PropertyValue', name: 'Dimensions', value: options.dimensions },
            { '@type': 'PropertyValue', name: 'Lead time', value: options.leadTime },
            { '@type': 'PropertyValue', name: 'Made in', value: 'Bar, Montenegro' },
        ],
    };
}

export function getProjectCreativeWorkSchema(options: ProjectSchemaOptions) {
    return {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: options.title,
        description: options.description,
        image: options.images.map(absoluteUrl),
        url: `https://artidom.art/${options.locale}${options.path}`,
        creator: { '@id': businessId },
        provider: { '@id': businessId },
        dateCreated: String(options.year),
        contentLocation: {
            '@type': 'Place',
            name: options.location,
            address: options.location,
        },
        about: [
            options.sector,
            'custom furniture Montenegro',
            'apartment furnishing Montenegro',
            'made-to-measure joinery',
        ],
    };
}

export function getArticleSchema(options: ArticleSchemaOptions) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: options.title,
        description: options.description,
        image: options.image ? [absoluteUrl(options.image)] : ['https://artidom.art/og/home.png'],
        datePublished: options.publishedAt,
        dateModified: options.publishedAt,
        inLanguage: options.locale,
        articleSection: options.tag,
        mainEntityOfPage: `https://artidom.art/${options.locale}${options.path}`,
        author: {
            '@type': 'Organization',
            name: 'ARTIDOM',
            url: 'https://artidom.art',
        },
        publisher: {
            '@id': businessId,
        },
    };
}
