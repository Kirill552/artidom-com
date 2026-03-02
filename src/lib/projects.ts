export interface Project {
    slug: string;
    sector: 'horeca' | 'education' | 'workspace' | 'residential';
    title: { en: string; sr: string };
    location: string;
    year: number;
    sqm?: number;
    units?: number;
    coverImage: string;
    images: string[];
    description: { en: string; sr: string };
}

export const projects: Project[] = [
    {
        slug: 'warm-minimal-apartment',
        sector: 'residential',
        title: {
            en: 'Warm Minimal Apartment',
            sr: 'Topli minimalistički apartman',
        },
        location: 'Bar, Montenegro',
        year: 2025,
        coverImage: '/images/projects/warm-minimal-apartment/cover.webp',
        images: [
            '/images/projects/warm-minimal-apartment/cover.webp',
            '/images/projects/warm-minimal-apartment/01.jpg',
            '/images/projects/warm-minimal-apartment/02.jpg',
            '/images/projects/warm-minimal-apartment/03.jpg',
            '/images/projects/warm-minimal-apartment/04.jpg',
            '/images/projects/warm-minimal-apartment/05.jpg',
            '/images/projects/warm-minimal-apartment/06.jpg',
        ],
        description: {
            en: 'Apartment furnishing in Bar with a custom kitchen, integrated storage, warm oak textures and discreet lighting. A clean residential package for private living or short-stay rental.',
            sr: 'Opremanje apartmana u Baru sa kuhinjom po mjeri, integrisanim odlaganjem, toplim hrastovim tonovima i diskretnom rasvjetom. Čist stambeni paket za privatno stanovanje ili najam.',
        },
    },
    {
        slug: 'compact-apartment-kitchen-storage',
        sector: 'residential',
        title: {
            en: 'Compact Apartment Kitchen & Storage',
            sr: 'Kompaktni apartman: kuhinja i odlaganje',
        },
        location: 'Montenegro Coast',
        year: 2025,
        coverImage: '/images/projects/compact-apartment/04.jpg',
        images: [
            '/images/projects/compact-apartment/04.jpg',
            '/images/projects/compact-apartment/01.jpg',
            '/images/projects/compact-apartment/02.jpg',
            '/images/projects/compact-apartment/03.jpg',
            '/images/projects/compact-apartment/05.jpg',
            '/images/projects/compact-apartment/06.jpg',
            '/images/projects/compact-apartment/07.jpg',
            '/images/projects/compact-apartment/08.jpg',
        ],
        description: {
            en: 'Small-footprint apartment furnishing for the Montenegro coast: kitchen line, entry storage, wardrobes and built-in joinery that use every wall with purpose.',
            sr: 'Opremanje malog apartmana na crnogorskom primorju: kuhinja, ulazno odlaganje, plakari i ugradni elementi koji koriste svaki zid sa razlogom.',
        },
    },
    {
        slug: 'graphite-apartment-kitchen',
        sector: 'residential',
        title: {
            en: 'Graphite Apartment Kitchen',
            sr: 'Grafitna kuhinja za apartman',
        },
        location: 'Budva, Montenegro',
        year: 2025,
        coverImage: '/images/projects/graphite-kitchen/01.jpg',
        images: [
            '/images/projects/graphite-kitchen/01.jpg',
            '/images/projects/graphite-kitchen/02.jpg',
            '/images/projects/graphite-kitchen/03.jpg',
        ],
        description: {
            en: 'Custom kitchen for a Budva apartment with graphite fronts, integrated appliances, wall-to-wall fitting and compact storage planning for daily use or rental.',
            sr: 'Kuhinja po mjeri za apartman u Budvi sa grafitnim frontovima, ugradnom tehnikom, uklapanjem od zida do zida i pažljivo planiranim odlaganjem za svakodnevnu upotrebu ili najam.',
        },
    },
    {
        slug: 'residential-joinery-details',
        sector: 'residential',
        title: {
            en: 'Residential Joinery Details',
            sr: 'Detalji stambene stolarije',
        },
        location: 'Montenegro',
        year: 2025,
        coverImage: '/images/projects/residential-details/02.jpg',
        images: [
            '/images/projects/residential-details/02.jpg',
            '/images/projects/residential-details/01.jpg',
            '/images/projects/residential-details/03.jpg',
        ],
        description: {
            en: 'Selected apartment and villa joinery details: wardrobes, bed surrounds, integrated niches and compact built-in elements produced to the interior layout.',
            sr: 'Izabrani detalji stambene i vilske stolarije: plakari, uzglavlja, integrisane niše i kompaktni ugradni elementi izrađeni po rasporedu enterijera.',
        },
    },
    {
        slug: 'horeca-counter-collection',
        sector: 'horeca',
        title: {
            en: 'HoReCa Counter Collection',
            sr: 'Kolekcija HoReCa pultova',
        },
        location: 'Selected Balkans Projects',
        year: 2024,
        coverImage: '/images/projects/horeca-counters/04.jpg',
        images: [
            '/images/projects/horeca-counters/04.jpg',
            '/images/projects/horeca-counters/01.jpg',
            '/images/projects/horeca-counters/02.jpg',
            '/images/projects/horeca-counters/03.jpg',
            '/images/projects/horeca-counters/05.jpg',
        ],
        description: {
            en: 'Selected restaurant, kiosk and service-counter joinery for HoReCa formats. Useful when a brand needs a custom front, a working back counter and durable materials.',
            sr: 'Izabrani restoranski, kioski i uslužni pultovi za HoReCa formate. Prikaz kada brendu trebaju prilagođen front, radni dio iza pulta i postojani materijali.',
        },
    },
    {
        slug: 'international-school-montenegro',
        sector: 'education',
        title: {
            en: 'International School Montenegro',
            sr: 'Međunarodna škola Crna Gora',
        },
        location: 'Montenegro',
        year: 2024,
        sqm: 1200,
        units: 40,
        coverImage: '/images/projects/school/photo_5267340135563465942_y.jpg',
        images: [
            '/images/projects/school/photo_5267340135563465942_y.jpg',
            '/images/projects/school/photo_5267340135563465940_y.jpg',
        ],
        description: {
            en: '1,200 sqm educational facility in Montenegro. Custom classroom storage, reception joinery and staff-room furniture produced and installed to the project schedule.',
            sr: 'Obrazovni objekat od 1.200 m² u Crnoj Gori. Namještaj po mjeri za učionice, recepciju i prostorije za osoblje proizveden i montiran po dinamici projekta.',
        },
    },
];

export function getProject(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}

export function getProjectsByLocale(locale: string) {
    return projects.map((p) => ({
        ...p,
        title: p.title[locale as 'en' | 'sr'] ?? p.title.en,
        description: p.description[locale as 'en' | 'sr'] ?? p.description.en,
    }));
}
