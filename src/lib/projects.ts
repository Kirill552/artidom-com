export interface Project {
    slug: string;
    sector: 'horeca' | 'education' | 'workspace' | 'residential';
    country: 'ME' | 'RU';
    title: { en: string; sr: string; ru: string };
    location: string;
    year: number;
    coverImage: string;
    images: string[];
    description: { en: string; sr: string; ru: string };
}

export const projects: Project[] = [
    {
        slug: 'warm-minimal-apartment',
        country: 'ME',
        sector: 'residential',
        title: {
            en: 'Warm Minimal Apartment',
            sr: 'Topli minimalistički apartman',
            ru: 'Тёплая минималистичная квартира',
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
            ru: 'Меблировка квартиры в Баре: кухня на заказ, встроенное хранение, тёплые дубовые текстуры и деликатное освещение. Аккуратный пакет для жизни или краткосрочной аренды.',
        },
    },
    {
        slug: 'compact-apartment-kitchen-storage',
        country: 'ME',
        sector: 'residential',
        title: {
            en: 'Compact Apartment Kitchen & Storage',
            sr: 'Kompaktni apartman: kuhinja i odlaganje',
            ru: 'Компактная квартира: кухня и хранение',
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
            ru: 'Меблировка компактной квартиры на побережье Черногории: кухонная линия, прихожая, шкафы и встроенные элементы — каждая стена задействована.',
        },
    },
    {
        slug: 'graphite-apartment-kitchen',
        country: 'ME',
        sector: 'residential',
        title: {
            en: 'Graphite Apartment Kitchen',
            sr: 'Grafitna kuhinja za apartman',
            ru: 'Графитовая кухня для квартиры',
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
            ru: 'Кухня на заказ для квартиры в Будве: графитовые фасады, встроенная техника, подгонка от стены до стены и продуманное хранение для жизни или аренды.',
        },
    },
    {
        slug: 'residential-joinery-details',
        country: 'ME',
        sector: 'residential',
        title: {
            en: 'Residential Joinery Details',
            sr: 'Detalji stambene stolarije',
            ru: 'Детали жилой столярки',
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
            ru: 'Избранные детали столярки для квартир и вилл: шкафы, обрамление кроватей, встроенные ниши и компактные элементы по планировке интерьера.',
        },
    },
    {
        slug: 'horeca-counter-collection',
        country: 'ME',
        sector: 'horeca',
        title: {
            en: 'HoReCa Counter Collection',
            sr: 'Kolekcija HoReCa pultova',
            ru: 'Коллекция HoReCa стоек',
        },
        location: 'Selected Balkans Projects',
        year: 2024,
        coverImage: '/images/projects/horeca-counters/02.webp',
        images: [
            '/images/projects/horeca-counters/02.webp',
            '/images/projects/horeca-counters/01.webp',
            '/images/projects/horeca-counters/02.webp',
            '/images/projects/horeca-counters/06.webp',
        ],
        description: {
            en: 'Selected restaurant, kiosk and service-counter joinery for HoReCa formats. Useful when a brand needs a custom front, a working back counter and durable materials.',
            sr: 'Izabrani restoranski, kioski i uslužni pultovi za HoReCa formate. Prikaz kada brendu trebaju prilagođen front, radni dio iza pulta i postojani materijali.',
            ru: 'Избранные ресторанные, киосковые и сервисные стойки для HoReCa форматов. Когда бренду нужен фасад на заказ, рабочая зона за стойкой и прочные материалы.',
        },
    },
    {
        slug: 'international-school-montenegro',
        country: 'ME',
        sector: 'education',
        title: {
            en: 'International School Montenegro',
            sr: 'Međunarodna škola Crna Gora',
            ru: 'Международная школа в Черногории',
        },
        location: 'Montenegro',
        year: 2024,
        coverImage: '/images/projects/school/photo_5267340135563465942_y.jpg',
        images: [
            '/images/projects/school/photo_5267340135563465942_y.jpg',
            '/images/projects/school/photo_5267340135563465940_y.jpg',
            '/images/projects/school/photo_5267340135563465944_y.jpg',
            '/images/projects/school/photo_5267340135563465941_y.jpg',
            '/images/projects/school/photo_5267340135563465938_y.jpg',
            '/images/projects/school/photo_5267340135563465934_y.jpg',
        ],
        description: {
            en: 'Educational facility in Montenegro. Custom classroom storage, reception joinery and staff-room furniture produced and installed to the project schedule.',
            sr: 'Obrazovni objekat u Crnoj Gori. Namještaj po mjeri za učionice, recepciju i prostorije za osoblje proizveden i montiran po dinamici projekta.',
            ru: 'Образовательное учреждение в Черногории. Мебель для классов, ресепшн и учительских — производство и монтаж по графику проекта.',
        },
    },
    {
        slug: 'chicko-restaurant',
        country: 'RU',
        sector: 'horeca',
        title: {
            en: 'CHICKO Corn-Dog Restaurant',
            sr: 'Restoran CHICKO',
            ru: 'Ресторан CHICKO',
        },
        location: 'Stavropol, Russia',
        year: 2024,
        coverImage: '/images/projects/chicko-restaurant/01.webp',
        images: [
            '/images/projects/chicko-restaurant/01.webp',
            '/images/projects/chicko-restaurant/02.webp',
            '/images/projects/chicko-restaurant/03.webp',
            '/images/projects/chicko-restaurant/04.webp',
            '/images/projects/chicko-restaurant/05.webp',
        ],
        description: {
            en: 'Full interior joinery for a Korean corn-dog restaurant: bar counter with planter, communal tables, service stations and terrace seating.',
            sr: 'Kompletna stolarija enterijera za restoran: barski pult sa zelilom, zajednički stolovi, servisne stanice i sedišta na terasi.',
            ru: 'Столярка интерьера под ключ для ресторана корн-догов: барная стойка с кашпо, общие столы, станции самообслуживания и посадка на террасе.',
        },
    },
    {
        slug: 'hochupuri-moscow',
        country: 'RU',
        sector: 'horeca',
        title: {
            en: 'Hochupuri Georgian Restaurant',
            sr: 'Gruzijski restoran Hočupuri',
            ru: 'Грузинский ресторан Хочупури',
        },
        location: 'Moscow, Russia',
        year: 2023,
        coverImage: '/images/projects/hochupuri-moscow/01.webp',
        images: [
            '/images/projects/hochupuri-moscow/01.webp',
            '/images/projects/hochupuri-moscow/02.webp',
            '/images/projects/hochupuri-moscow/03.webp',
            '/images/projects/hochupuri-moscow/04.webp',
            '/images/projects/hochupuri-moscow/05.webp',
        ],
        description: {
            en: 'Carved bar front, qvevri-inspired wooden screens, dining-hall banquettes and behind-bar shelving for a Georgian restaurant in Moscow.',
            sr: 'Rezbareni barski front, drvene pregrade po uzoru na kvevri, klupe u sali i police iza bara za gruzijski restoran u Moskvi.',
            ru: 'Резной фасад бара, деревянные экраны по мотивам квеври, банкетки зала и застолье за баром для грузинского ресторана в Москве.',
        },
    },
    {
        slug: 'atlantik-hotel-bar',
        country: 'RU',
        sector: 'horeca',
        title: {
            en: 'Hotel Bars & Reception Counters',
            sr: 'Hotelski barovi i recepcije',
            ru: 'Бары отелей и стойки ресепшн',
        },
        location: 'Selected projects, Russia',
        year: 2021,
        coverImage: '/images/projects/atlantik-hotel-bar/01.webp',
        images: [
            '/images/projects/atlantik-hotel-bar/01.webp',
            '/images/projects/atlantik-hotel-bar/02.webp',
            '/images/projects/atlantik-hotel-bar/03.webp',
            '/images/projects/atlantik-hotel-bar/04.webp',
        ],
        description: {
            en: 'Hotel bar with LED-lit backbar shelving and a series of reception and service counters for hospitality clients.',
            sr: 'Hotelski bar sa LED osvetljenim policama i serija recepcijskih i uslužnih pultova za hotelske klijente.',
            ru: 'Бар отеля с LED-подсветкой застолья и серия ресепшн- и сервисных стоек для гостиничных клиентов.',
        },
    },
    {
        slug: 'school-canteen',
        country: 'RU',
        sector: 'education',
        title: {
            en: 'School Canteen & Recreation Zones',
            sr: 'Školska menza i rekreativne zone',
            ru: 'Школьная столовая и зоны отдыха',
        },
        location: 'School campus, Russia',
        year: 2023,
        coverImage: '/images/projects/school-canteen/01.webp',
        images: [
            '/images/projects/school-canteen/01.webp',
            '/images/projects/school-canteen/02.webp',
            '/images/projects/school-canteen/03.webp',
            '/images/projects/school-canteen/04.webp',
            '/images/projects/school-canteen/05.webp',
        ],
        description: {
            en: 'Canteen banquette seating with backlit perforated panels, serving-line joinery, lockers and recreation furniture for a school campus.',
            sr: 'Klupe menze sa perforisanim panelima sa pozadinskim osvetljenjem, salterska stolarija, ormarići i nameštaj za rekreaciju.',
            ru: 'Банкетки столовой с перфорированными панелями с подсветкой, раздаточная линия, шкафчики и мебель рекреаций для школьного кампуса.',
        },
    },
    {
        slug: 'wall-panels-hall',
        country: 'RU',
        sector: 'workspace',
        title: {
            en: 'Event Hall Wall Panels',
            sr: 'Zidni paneli za event salu',
            ru: 'Стеновые панели для зала мероприятий',
        },
        location: 'Event hall, Russia',
        year: 2019,
        coverImage: '/images/projects/wall-panels-hall/01.webp',
        images: [
            '/images/projects/wall-panels-hall/01.webp',
            '/images/projects/wall-panels-hall/02.webp',
            '/images/projects/wall-panels-hall/03.webp',
        ],
        description: {
            en: 'Full-height wooden wall panels and lobby joinery for a public event hall.',
            sr: 'Drveni zidni paneli u punoj visini i stolarija hola za javnu salu.',
            ru: 'Деревянные стеновые панели в полный рост и столярка фойе для общественного зала.',
        },
    },
    {
        slug: 'chaiburg-kiosk',
        country: 'RU',
        sector: 'horeca',
        title: {
            en: 'Chaiburg Mall Kiosk',
            sr: 'Kiosk Čajburg u tržnom centru',
            ru: 'Киоск Чайбург в ТЦ',
        },
        location: 'Shopping mall, Russia',
        year: 2019,
        coverImage: '/images/projects/chaiburg-kiosk/01.webp',
        images: [
            '/images/projects/chaiburg-kiosk/01.webp',
            '/images/projects/chaiburg-kiosk/02.webp',
        ],
        description: {
            en: 'Island tea kiosk for a shopping mall: display counter, lighting and seating-zone joinery.',
            sr: 'Ostrvski kiosk za čaj u tržnom centru: vitrina, osvetljenje i stolarija sedeće zone.',
            ru: 'Островной чайный киоск для торгового центра: витрина, свет и столярка зоны посадки.',
        },
    },
    {
        slug: 'burger-king-ekaterinburg',
        country: 'RU',
        sector: 'horeca',
        title: {
            en: 'Burger King Restaurants, Ekaterinburg',
            sr: 'Restorani Burger King, Ekaterinburg',
            ru: 'Рестораны Burger King, Екатеринбург',
        },
        location: 'Ekaterinburg, Russia',
        year: 2004,
        coverImage: '/images/projects/burger-king-ekaterinburg/01.webp',
        images: [
            '/images/projects/burger-king-ekaterinburg/01.webp',
            '/images/projects/burger-king-ekaterinburg/02.webp',
        ],
        description: {
            en: 'Series of Burger King restaurant fit-outs in Ekaterinburg: service counters, tables and booth seating. Archive project from the 2000s.',
            sr: 'Serija opremanja restorana Burger King u Ekaterinburgu: pultovi, stolovi i klupe. Arhivski projekat iz 2000-ih.',
            ru: 'Серия ресторанов Burger King в Екатеринбурге: стойки, столы и буты. Архивный проект 2000-х.',
        },
    },
    {
        slug: 'library-display-cabinet',
        country: 'RU',
        sector: 'residential',
        title: {
            en: 'Library Display Cabinet',
            sr: 'Vitrina za biblioteku',
            ru: 'Витрина для библиотеки',
        },
        location: 'Russia',
        year: 2025,
        coverImage: '/images/projects/library-display-cabinet/01.webp',
        images: [
            '/images/projects/library-display-cabinet/01.webp',
            '/images/projects/library-display-cabinet/02.webp',
            '/images/projects/library-display-cabinet/03.webp',
            '/images/projects/library-display-cabinet/04.webp',
        ],
        description: {
            en: 'Full-height display cabinet with brass-framed glass shelving and integrated LED lighting, built for a private living-room library.',
            sr: 'Vitrina u punoj visini sa staklenim policama u mesinganom ramu i integrisanim LED osvetljenjem za privatnu kućnu biblioteku.',
            ru: 'Витрина в полный рост со стеклянными полками в латунной раме и встроенной LED-подсветкой для домашней библиотеки.',
        },
    },
];

export function getProject(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}

export function getProjectImageAlt(project: Project, locale: string, index: number) {
    const localeKey = (locale === 'sr' || locale === 'ru' ? locale : 'en') as 'en' | 'sr' | 'ru';
    const title = project.title[localeKey];
    const location = project.location;

    if (project.sector === 'residential') {
        if (localeKey === 'ru') {
            return `${title}: кухня на заказ, шкафы и меблировка квартиры в ${location}, фото ${index + 1}`;
        }

        if (localeKey === 'sr') {
            return `${title}: kuhinja po mjeri, plakari i opremanje apartmana u ${location}, fotografija ${index + 1}`;
        }

        return `${title}: custom kitchen, wardrobes and apartment furnishing in ${location}, photo ${index + 1}`;
    }

    if (localeKey === 'ru') {
        return `${title}: мебель на заказ ARTIDOM в ${location}, фото ${index + 1}`;
    }

    if (localeKey === 'sr') {
        return `${title}: namještaj po mjeri ARTIDOM u ${location}, fotografija ${index + 1}`;
    }

    return `${title}: custom furniture by ARTIDOM in ${location}, photo ${index + 1}`;
}

export function getProjectsByLocale(locale: string) {
    return projects.map((p) => ({
        ...p,
        title: p.title[locale as 'en' | 'sr' | 'ru'] ?? p.title.en,
        description: p.description[locale as 'en' | 'sr' | 'ru'] ?? p.description.en,
    }));
}
