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
    locale: 'en' | 'sr';
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

export function getServiceSchema({ title, description, areaServed, image, path, locale }: ServiceSchemaOptions) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: title,
        serviceType: title,
        description,
        url: `https://artidom.art/${locale}${path}`,
        image: image.startsWith('http') ? image : `https://artidom.art${image}`,
        areaServed: {
            '@type': areaServed === 'Montenegro' || areaServed === 'Crna Gora' ? 'Country' : 'City',
            name: areaServed,
        },
        provider: {
            '@type': 'LocalBusiness',
            name: 'Artidom DOO',
            url: 'https://artidom.art',
            telephone: '+38268282371',
            email: 'director@a-96.ru',
        },
    };
}
