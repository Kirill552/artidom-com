export interface CatalogItem {
    slug: string;
    category: 'kitchens' | 'storage' | 'bespoke';
    name: { en: string; de: string; sr: string };
    material: string;
    origin: string;
    dimensions: string;
    finishOptions: string[];
    leadTime: string;
    coverImage: string;
    images: string[];
    description: { en: string; de: string; sr: string };
}

export const catalogItems: CatalogItem[] = [
    {
        slug: 'oak-kitchen-unit',
        category: 'kitchens',
        name: { en: 'Kitchen Unit — Oak / Stone', de: 'Küchenblock — Eiche / Stein', sr: 'Kuhinjski blok — hrast / kamen' },
        material: 'Austrian Oak',
        origin: 'Austria',
        dimensions: 'Custom to floor plan',
        finishOptions: ['Natural oil', 'White lacquer', 'Matte lacquer'],
        leadTime: '4–6 weeks',
        coverImage: '/images/catalog/placeholder.jpg',
        images: [],
        description: {
            en: 'Solid oak kitchen unit. Dimensions cut to your floor plan. Available with stone or laminate countertop.',
            de: 'Küchenblock aus massiver Eiche. Maße nach Grundriss. Mit Stein- oder Laminatarbeitsplatte.',
            sr: 'Kuhinjski blok od masivnog hrasta. Dimenzije po osnovi. Sa kamenom ili laminatnom radnom pločom.',
        },
    },
];

export function getCatalogItem(slug: string) {
    return catalogItems.find((i) => i.slug === slug);
}

export function getCatalogByCategory(category?: string) {
    if (!category || category === 'all') return catalogItems;
    return catalogItems.filter((i) => i.category === category);
}
