export type CatalogLocale = 'en' | 'sr' | 'ru';
export type CatalogCategory = 'kitchens' | 'storage' | 'bespoke';

export interface LocalizedText {
    en: string;
    sr: string;
    ru: string;
}

export interface CatalogItem {
    slug: string;
    category: CatalogCategory;
    name: LocalizedText;
    material: LocalizedText;
    origin: LocalizedText;
    dimensions: LocalizedText;
    finishOptions: LocalizedText[];
    leadTime: LocalizedText;
    coverImage: string;
    images: string[];
    description: LocalizedText;
}

function localized(en: string, sr: string, ru: string): LocalizedText {
    return { en, sr, ru };
}

export function getCatalogLocaleValue(value: LocalizedText, locale: string) {
    return value[locale as CatalogLocale] ?? value.en;
}

export const catalogItems: CatalogItem[] = [
    {
        slug: 'custom-apartment-kitchen',
        category: 'kitchens',
        name: localized('Custom Apartment Kitchen', 'Kuhinja po mjeri za apartman', 'Кухня на заказ для квартиры'),
        material: localized('Lacquered MDF + compact worktop', 'Lakirani MDF + kompakt radna ploča', 'Лакированный МДФ + столешница из компакта'),
        origin: localized('EU boards and fittings', 'EU pločasti materijal i okovi', 'Европейские плиты и фурнитура'),
        dimensions: localized('Made to the floor plan', 'Po osnovi prostora', 'По плану помещения'),
        finishOptions: [
            localized('Graphite matte', 'Grafit mat', 'Графит матовый'),
            localized('Warm oak', 'Topli hrast', 'Тёплый дуб'),
            localized('Stone-look worktop', 'Radna ploča sa izgledom kamena', 'Столешница под камень'),
        ],
        leadTime: localized('4-6 weeks', '4-6 sedmica', '4–6 недель'),
        coverImage: '/images/projects/beige-apartment-kitchen/01.jpg',
        images: [
            '/images/projects/beige-apartment-kitchen/01.jpg',
            '/images/projects/beige-apartment-kitchen/02.jpg',
            '/images/projects/beige-apartment-kitchen/06.jpg',
            '/images/projects/graphite-kitchen/01.jpg',
            '/images/projects/extra-kitchens/white-minimal.jpg',
            '/images/projects/extra-kitchens/laminate-light.jpg',
        ],
        description: localized(
            'A fitted kitchen for apartments and holiday rentals in Montenegro. Built around the real wall geometry with integrated appliances, upper storage and a compact working zone.',
            'Kuhinja po mjeri za stanove i apartmane za izdavanje u Crnoj Gori. Radimo po realnoj geometriji zida, sa ugradnom tehnikom, gornjim elementima i kompaktnom radnom zonom.',
            'Кухня на заказ для квартир и арендного жилья в Черногории. Изготавливается по реальной геометрии стен со встроенной техникой, верхними шкафами и компактной рабочей зоной.',
        ),
    },
    {
        slug: 'warm-oak-kitchen-wall',
        category: 'kitchens',
        name: localized('Warm Oak Kitchen Wall', 'Kuhinjski zid u toplom hrastu', 'Кухонная стенка в тёплом дубе'),
        material: localized('Oak veneer + lacquered MDF', 'Hrastov furnir + lakirani MDF', 'Шпон дуба + лакированный МДФ'),
        origin: localized('Bar workshop + EU suppliers', 'Radionica Bar + EU dobavljači', 'Цех в Баре + европейские поставщики'),
        dimensions: localized('Made to the apartment layout', 'Po rasporedu apartmana', 'По планировке квартиры'),
        finishOptions: [
            localized('Natural oak', 'Prirodni hrast', 'Натуральный дуб'),
            localized('Soft beige lacquer', 'Nježna bež lak obrada', 'Мягкий бежевый лак'),
            localized('Integrated LED details', 'Integrisana LED rasvjeta', 'Встроенная LED-подсветка'),
        ],
        leadTime: localized('4-6 weeks', '4-6 sedmica', '4–6 недель'),
        coverImage: '/images/projects/bar-counter-kitchen/01.jpg',
        images: [
            '/images/projects/bar-counter-kitchen/01.jpg',
            '/images/projects/bar-counter-kitchen/02.jpg',
            '/images/projects/warm-minimal-apartment/01.jpg',
            '/images/projects/extra-kitchens/oak-classic.jpg',
            '/images/projects/extra-kitchens/open-plan-oak.jpg',
        ],
        description: localized(
            'A softer residential kitchen composition with tall units, open shelving and hidden storage. Suitable for premium apartments, villas and furnished rental properties.',
            'Mirnija stambena kuhinjska kompozicija sa visokim elementima, otvorenim policama i skrivenim odlaganjem. Pogodna za kvalitetne apartmane, vile i uređene nekretnine za izdavanje.',
            'Спокойная кухонная композиция с высокими шкафами, открытыми полками и скрытым хранением. Подходит для квартир, вилл и меблированного арендного жилья.',
        ),
    },
    {
        slug: 'built-in-wardrobe-system',
        category: 'storage',
        name: localized('Built-in Wardrobe System', 'Sistem ugradnih plakara', 'Встроенная система шкафов'),
        material: localized('Lacquered MDF / veneer fronts', 'Lakirani MDF / furnirani frontovi', 'Лакированный МДФ / фасады из шпона'),
        origin: localized('Made in Bar, Montenegro', 'Proizvedeno u Baru, Crna Gora', 'Производство в Баре, Черногория'),
        dimensions: localized('Wall-to-wall or full-height', 'Od zida do zida ili puna visina', 'От стены до стены или в полную высоту'),
        finishOptions: [
            localized('Matte lacquer', 'Mat lak', 'Матовый лак'),
            localized('Oak veneer', 'Hrastov furnir', 'Шпон дуба'),
            localized('Hidden handles', 'Skriveni rukohvati', 'Скрытые ручки'),
        ],
        leadTime: localized('3-5 weeks', '3-5 sedmica', '3–5 недель'),
        coverImage: '/images/projects/display-wardrobe/01.jpg',
        images: [
            '/images/projects/display-wardrobe/01.jpg',
            '/images/projects/compact-apartment/06.jpg',
            '/images/projects/compact-apartment/05.jpg',
            '/images/projects/residential-details/03.jpg',
        ],
        description: localized(
            'Wardrobes and full-height storage walls sized to the room. A practical option for compact apartments, bedrooms and narrow circulation zones.',
            'Plakari i skladišni zidovi pune visine rađeni po mjeri prostora. Praktično rješenje za kompaktne apartmane, spavaće sobe i uske komunikacije.',
            'Шкафы и стенки хранения в полную высоту по размерам комнаты. Практичное решение для компактных квартир, спален и узких коридоров.',
        ),
    },
    {
        slug: 'entry-storage-wall',
        category: 'storage',
        name: localized('Entry Storage Wall', 'Ulazni zid za odlaganje', 'Стенка хранения в прихожей'),
        material: localized('MDF + durable laminate finish', 'MDF + postojana laminat obrada', 'МДФ + износостойкий ламинат'),
        origin: localized('Bar workshop production', 'Izrada u radionici u Baru', 'Производство в цеху в Баре'),
        dimensions: localized('Built to the entry zone', 'Po mjeri ulazne zone', 'По размерам прихожей'),
        finishOptions: [
            localized('Closed shoe cabinets', 'Zatvoreni ormari za obuću', 'Закрытые обувницы'),
            localized('Bench niche', 'Niša sa klupom', 'Ниша с банкеткой'),
            localized('Utility tall cabinet', 'Visoki servisni ormar', 'Высокий хозяйственный шкаф'),
        ],
        leadTime: localized('3-5 weeks', '3-5 sedmica', '3–5 недель'),
        coverImage: '/images/projects/hallway-wardrobe/01.jpg',
        images: [
            '/images/projects/hallway-wardrobe/01.jpg',
            '/images/projects/hallway-wardrobe/02.jpg',
            '/images/projects/compact-apartment/04.jpg',
            '/images/projects/compact-apartment/01.jpg',
        ],
        description: localized(
            'An entry storage wall that combines hanging space, closed shoe storage and utility cabinets in one built-in block. Useful for apartment furnishing packages.',
            'Ulazni zid za odlaganje koji spaja vješanje, zatvoreno odlaganje obuće i servisne ormariće u jedan ugradni blok. Pogodno za kompletno opremanje apartmana.',
            'Встроенная стенка в прихожей: вешалки, закрытые обувницы и хозяйственные шкафы в одном блоке. Удобное решение для пакетной меблировки квартиры.',
        ),
    },
    {
        slug: 'service-counter-joinery',
        category: 'bespoke',
        name: localized('Service Counter Joinery', 'Pultovi po mjeri', 'Барные стойки на заказ'),
        material: localized('Lacquered MDF + branded front cladding', 'Lakirani MDF + brendirana obloga fronta', 'Лакированный МДФ + брендированная облицовка'),
        origin: localized('Bar workshop + project coordination', 'Radionica Bar + projektna koordinacija', 'Цех в Баре + координация проекта'),
        dimensions: localized('Built to the concept and workflow', 'Po konceptu i radnom toku', 'По концепции и логике работы заведения'),
        finishOptions: [
            localized('Illuminated front', 'Osvijetljeni front', 'Подсвеченный фасад'),
            localized('Stone or compact top', 'Kamena ili kompakt ploča', 'Каменная или компакт-столешница'),
            localized('Integrated back counter', 'Integrisani radni pult iza fronta', 'Встроенная рабочая зона за стойкой'),
        ],
        leadTime: localized('5-7 weeks', '5-7 sedmica', '5–7 недель'),
        coverImage: '/images/projects/horeca-counters/01.webp',
        images: [
            '/images/projects/horeca-counters/01.webp',
            '/images/projects/horeca-counters/02.webp',
            '/images/projects/horeca-counters/03.webp',
            '/images/projects/horeca-counters/04.webp',
            '/images/projects/horeca-counters/05.webp',
            '/images/projects/horeca-counters/06.webp',
        ],
        description: localized(
            'Custom counters and front-of-house joinery for restaurants, cafes, kiosks and branded service points. A secondary offer for selected HoReCa and B2B projects.',
            'Pultovi i front-of-house elementi po mjeri za restorane, kafiće, kioske i brendirane prodajne tačke. Sekundarna usluga za odabrane HoReCa i B2B projekte.',
            'Стойки и фасадные элементы на заказ для ресторанов, кафе, киосков и брендированных точек обслуживания. Дополнительное направление для избранных HoReCa и B2B проектов.',
        ),
    },
];

export function getCatalogItem(slug: string) {
    return catalogItems.find((item) => item.slug === slug);
}

export function getCatalogByCategory(category?: string) {
    if (!category || category === 'all') {
        return catalogItems;
    }

    return catalogItems.filter((item) => item.category === category);
}
