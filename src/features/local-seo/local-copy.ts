import type {
    FAQItem,
    FAQSectionContent,
    LocalSeoLinkCard,
    LocalizedText,
    ResolvedFAQSectionContent,
    ResolvedLocalSeoLinkCard,
    SupportedSeoLocale,
} from './types';

function localized(en: string, sr: string): LocalizedText {
    return { en, sr };
}

function resolveText(value: LocalizedText, locale: SupportedSeoLocale) {
    return value[locale] ?? value.en;
}

function resolveFaqItems(items: FAQItem[], locale: SupportedSeoLocale) {
    return items.map((item) => ({
        question: resolveText(item.question, locale),
        answer: resolveText(item.answer, locale),
    }));
}

const residentialLinks: LocalSeoLinkCard[] = [
    {
        slug: 'bar',
        title: localized('Bar', 'Bar'),
        description: localized('Custom kitchens, wardrobes and apartment furnishing close to the workshop.', 'Kuhinje po mjeri, plakari i opremanje apartmana blizu radionice.'),
    },
    {
        slug: 'podgorica',
        title: localized('Podgorica', 'Podgorica'),
        description: localized('Custom kitchens and full apartment packages for the capital and new developments.', 'Kuhinje po mjeri i kompletni paketi za stanove u glavnom gradu i novogradnji.'),
    },
    {
        slug: 'budva',
        title: localized('Budva', 'Budva'),
        description: localized('Apartment fit-outs for rental properties, compact layouts and seasonal turnovers.', 'Opremanje apartmana za izdavanje, kompaktne osnove i sezonske smjene gostiju.'),
    },
    {
        slug: 'cijena',
        title: localized('Pricing & lead time', 'Cijena i rokovi'),
        description: localized('What affects the price of a custom kitchen, wardrobe or apartment package in Montenegro.', 'Šta utiče na cijenu kuhinje po mjeri, plakara ili kompletnog paketa za apartman u Crnoj Gori.'),
    },
];

const residentialFaqSection: FAQSectionContent = {
    title: localized('Residential fit-out FAQ', 'Pitanja o opremanju stanova i apartmana'),
    intro: localized('This block covers the recurring questions around price, lead time, measurements and installation in Montenegro.', 'Ovdje su kratki odgovori na pitanja koja se najčešće javljaju oko cijene, roka, mjerenja i montaže u Crnoj Gori.'),
    items: [
        {
            question: localized('How do you calculate the price of a custom kitchen or wardrobe?', 'Kako računate cijenu kuhinje po mjeri ili plakara?'),
            answer: localized('We estimate from the floor plan, dimensions, materials, fronts, hardware, worktops and installation scope. The fastest way is to send a plan or marked-up PDF.', 'Procjena zavisi od osnove, dimenzija, materijala, frontova, okova, radne ploče i obima montaže. Najbrže je da pošaljete osnovu ili označen PDF.'),
        },
        {
            question: localized('Can you work with apartments on the coast and in Podgorica?', 'Radite li stanove na primorju i u Podgorici?'),
            answer: localized('Yes. The workshop is in Sutomore, and we organise measurement, delivery and installation across Bar, Budva, Podgorica and nearby locations.', 'Da. Radionica je u Sutomoru, a mjerenje, isporuku i montažu organizujemo za Bar, Budvu, Podgoricu i okolinu.'),
        },
        {
            question: localized('What is the usual lead time for apartment furnishing?', 'Koliki je tipičan rok za opremanje apartmana?'),
            answer: localized('Most apartment packages land in the 3-6 week range after measurements and material confirmation. Larger or more custom packages can take longer.', 'Većina apartmanskih paketa je u rasponu 3-6 sedmica nakon mjerenja i potvrde materijala. Veći ili složeniji paketi mogu tražiti više vremena.'),
        },
        {
            question: localized('Do you only make apartments or can you also do HoReCa and B2B?', 'Radite li samo stanove ili i HoReCa / B2B?'),
            answer: localized('Residential is the main direction. We also take selected HoReCa and B2B briefs when the task, drawings and schedule are already clear.', 'Stanovi i apartmani su glavni pravac. Uzimamo i odabrane HoReCa i B2B projekte kada su zadatak, crteži i rok već jasno definisani.'),
        },
    ],
};

const workshopFaqSection: FAQSectionContent = {
    title: localized('Workshop FAQ', 'Pitanja o radionici i proizvodnji'),
    intro: localized('A compact FAQ for production, measurements, materials and coordination before an apartment or B2B order starts.', 'Kratka FAQ sekcija o proizvodnji, mjerenju, materijalima i koordinaciji prije početka stambenog ili B2B posla.'),
    items: [
        {
            question: localized('What do you need to prepare an estimate?', 'Šta vam treba za procjenu cijene?'),
            answer: localized('A floor plan, room measurements, inspirational references or a DWG / PDF set is enough to start. Then we align materials and installation scope.', 'Za početak su dovoljni osnova prostora, mjere, referentne slike ili DWG / PDF crteži. Nakon toga usklađujemo materijale i obim montaže.'),
        },
        {
            question: localized('Which materials do you work with most often?', 'Sa kojim materijalima najčešće radite?'),
            answer: localized('Mostly lacquered MDF, veneer, compact tops, stone-look tops and durable board materials for apartment, villa and selected public interiors.', 'Najčešće radimo lakirani MDF, furnir, kompakt ploče, radne ploče sa izgledom kamena i postojane pločaste materijale za stanove, vile i odabrane javne enterijere.'),
        },
        {
            question: localized('Can production and installation be coordinated from one workshop?', 'Može li proizvodnja i montaža da se vodi iz jedne radionice?'),
            answer: localized('Yes. Measurement, cutting, assembly, packing, delivery and installation are coordinated from the same team in Sutomore, Bar.', 'Da. Mjerenje, rezanje, sklapanje, pakovanje, isporuka i montaža koordiniraju se iz istog tima u Sutomoru, Bar.'),
        },
        {
            question: localized('Do you work from technical drawings only?', 'Radite li samo po tehničkim crtežima?'),
            answer: localized('Not only. Technical drawings speed things up, but we can also start from a floor plan, developer brochure or a measured apartment.', 'Ne samo po tehničkim crtežima. Oni ubrzavaju posao, ali možemo krenuti i od osnove, developerske brošure ili izmjerenog stana.'),
        },
    ],
};

function resolveSection(content: FAQSectionContent, locale: SupportedSeoLocale): ResolvedFAQSectionContent {
    return {
        title: resolveText(content.title, locale),
        intro: resolveText(content.intro, locale),
        items: resolveFaqItems(content.items, locale),
    };
}

export function getResidentialLocalLinks(locale: SupportedSeoLocale): ResolvedLocalSeoLinkCard[] {
    return residentialLinks.map((item) => ({
        slug: item.slug,
        title: resolveText(item.title, locale),
        description: resolveText(item.description, locale),
    }));
}

export function getResidentialFaqSection(locale: SupportedSeoLocale) {
    return resolveSection(residentialFaqSection, locale);
}

export function getWorkshopFaqSection(locale: SupportedSeoLocale) {
    return resolveSection(workshopFaqSection, locale);
}

export function getResidentialLocalLinksHeading(locale: SupportedSeoLocale) {
    return {
        title: resolveText(localized('Cities and pricing', 'Gradovi i cijena'), locale),
        intro: resolveText(localized('These pages target the main residential GEO queries we want to own in Montenegro first.', 'Ove stranice ciljaju glavne GEO upite za stanove i apartmane koje želimo da pokrijemo prvo u Crnoj Gori.'), locale),
    };
}
