export interface Project {
    slug: string;
    sector: 'horeca' | 'education' | 'workspace' | 'residential';
    title: { en: string; sr: string };
    location: string;
    year: number;
    sqm: number;
    units?: number;
    coverImage: string;
    images: string[];
    description: { en: string; sr: string };
}

export const projects: Project[] = [
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
            '/images/projects/school/photo_5267340135563465940_y.jpg',
            '/images/projects/school/photo_5267340135563465942_y.jpg',
        ],
        description: {
            en: '1,200 sqm educational facility in Montenegro. Custom classroom storage units, reception desk, staff room furniture. All pieces cut to floor plan dimensions.',
            sr: '1.200 m² obrazovna ustanova u Crnoj Gori. Namještaj po mjeri za učionice, recepcija, prostorija za osoblje.',
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
