import type {
    FAQItem,
    LocalizedText,
    ResidentialLocalPageContent,
    ResolvedResidentialLocalPageContent,
    SupportedSeoLocale,
} from './types';

function localized(en: string, sr: string): LocalizedText {
    return { en, sr };
}

function resolveText(value: LocalizedText, locale: SupportedSeoLocale) {
    return value[locale] ?? value.en;
}

function cityFaqs(cityEn: string, citySr: string): FAQItem[] {
    return [
        {
            question: localized(`Do you measure and install in ${cityEn}?`, `Radite li mjerenje i montažu za ${citySr}?`),
            answer: localized(`Yes. We organise measurement, delivery and installation for apartments, villas and selected public interiors in ${cityEn}.`, `Da. Organizujemo mjerenje, isporuku i montažu za stanove, vile i odabrane javne enterijere u ${citySr}.`),
        },
        {
            question: localized(`Can you work from a floor plan before the apartment is finished in ${cityEn}?`, `Možete li raditi iz osnove prije završetka stana u ${citySr}?`),
            answer: localized('Yes. A floor plan, developer layout or marked-up PDF is enough to start the estimate, then we confirm dimensions on site.', 'Da. Za početak su dovoljni osnova, plan developera ili označen PDF, a konačne mjere potvrđujemo na objektu.'),
        },
        {
            question: localized('What affects the final price the most?', 'Šta najviše utiče na konačnu cijenu?'),
            answer: localized('Dimensions, front material, hardware, worktops, wall conditions and installation access usually drive the estimate the most.', 'Na procjenu najviše utiču dimenzije, materijal frontova, okovi, radna ploča, stanje zidova i pristup za montažu.'),
        },
        {
            question: localized('Do you handle only apartments?', 'Radite li samo apartmane?'),
            answer: localized('Residential is the main offer, but selected HoReCa and B2B briefs are possible when the task and schedule are already technical and clear.', 'Stanovi i apartmani su glavni fokus, ali su mogući i odabrani HoReCa i B2B poslovi kada je zadatak tehnički jasan i rok usklađen.'),
        },
    ];
}

const pricingFaqs: FAQItem[] = [
    {
        question: localized('How much does a custom kitchen cost in Montenegro?', 'Koliko košta kuhinja po mjeri u Crnoj Gori?'),
        answer: localized('There is no honest flat rate without dimensions and materials. The fastest route is to send a plan, target finish and appliance list for an estimate.', 'Ne postoji poštena paušalna cijena bez dimenzija i materijala. Najbrže je da pošaljete osnovu, željeni finiš i spisak tehnike za procjenu.'),
    },
    {
        question: localized('What changes the price the most?', 'Šta najviše mijenja cijenu?'),
        answer: localized('Length and height of the composition, front material, hardware brand, worktop type, integrated appliances and installation complexity.', 'Dužina i visina kompozicije, materijal frontova, marka okova, tip radne ploče, ugradna tehnika i složenost montaže.'),
    },
    {
        question: localized('Can you price a full apartment package?', 'Možete li procijeniti kompletan paket za apartman?'),
        answer: localized('Yes. Kitchens, wardrobes, entry storage, bathroom joinery and TV walls can be estimated as one package from the same workshop.', 'Da. Kuhinje, plakari, ulazno odlaganje, kupatilski elementi i TV zidovi mogu se procijeniti kao jedan paket iz iste radionice.'),
    },
    {
        question: localized('What is the usual lead time after approval?', 'Koliki je tipičan rok nakon odobrenja?'),
        answer: localized('For most apartment jobs the working range is about 3-6 weeks after measurements, materials and details are confirmed.', 'Za većinu apartmanskih poslova tipičan raspon je oko 3-6 sedmica nakon potvrde mjera, materijala i detalja.'),
    },
];

const pages: ResidentialLocalPageContent[] = [
    {
        slug: 'bar',
        image: '/images/projects/warm-minimal-apartment/cover.webp',
        areaServed: localized('Bar', 'Bar'),
        metaTitle: localized('Custom furniture and kitchens in Bar, Montenegro', 'Namještaj po mjeri i kuhinje po mjeri u Baru'),
        metaDescription: localized('ARTIDOM makes custom kitchens, wardrobes and apartment furniture in Bar and Sutomore. Local measurement, delivery and installation from the workshop.', 'ARTIDOM radi kuhinje po mjeri, plakare i opremanje apartmana u Baru i Sutomoru. Lokalno mjerenje, isporuka i montaža iz radionice.'),
        label: localized('Bar, Montenegro', 'Bar, Crna Gora'),
        title: localized('Custom kitchens and apartment furniture in Bar', 'Kuhinje po mjeri i namještaj za apartmane u Baru'),
        intro: localized('Bar is the shortest route from the workshop to the apartment. This page targets owners, investors and rental properties that need a kitchen, wardrobes or a full furnishing package without extra logistics.', 'Bar je najkraća veza između radionice i objekta. Stranica cilja vlasnike, investitore i apartmane za izdavanje kojima trebaju kuhinja po mjeri, plakari ili kompletan paket bez dodatne logistike.'),
        focusTitle: localized('What clients in Bar usually order', 'Šta klijenti u Baru najčešće traže'),
        focusItems: [
            localized('Custom kitchens for apartments and villas', 'Kuhinje po mjeri za stanove i vile'),
            localized('Wardrobes, entry storage and bedroom joinery', 'Plakare, ulazno odlaganje i spavaće elemente'),
            localized('Complete apartment furnishing for rental properties', 'Kompletno opremanje apartmana za izdavanje'),
        ],
        processTitle: localized('How we work in Bar', 'Kako radimo za Bar'),
        processItems: [
            localized('Estimate from floor plan or apartment measurements', 'Procjena iz osnove ili izmjerenog prostora'),
            localized('Material and hardware alignment before production', 'Usklađivanje materijala i okova prije proizvodnje'),
            localized('Short delivery chain from Sutomore to site', 'Kratak lanac isporuke od Sutomora do objekta'),
        ],
        note: localized('The workshop is in Sutomore, so Bar jobs are the easiest to coordinate for repeated site visits, corrections and final installation.', 'Radionica je u Sutomoru, pa su poslovi u Baru najjednostavniji za koordinaciju, dodatna mjerenja i završnu montažu.'),
        cta: localized('Request an estimate in Bar', 'Zatražite procjenu za Bar'),
        faqs: cityFaqs('Bar', 'Bar'),
    },
    {
        slug: 'podgorica',
        image: '/images/projects/graphite-kitchen/01.jpg',
        areaServed: localized('Podgorica', 'Podgorica'),
        metaTitle: localized('Custom kitchens and apartment furnishing in Podgorica', 'Kuhinje po mjeri i opremanje stanova u Podgorici'),
        metaDescription: localized('ARTIDOM works with Podgorica apartments, new developments and villas: custom kitchens, wardrobes and full furnishing packages with installation.', 'ARTIDOM radi stanove, novogradnju i vile u Podgorici: kuhinje po mjeri, plakare i kompletno opremanje sa montažom.'),
        label: localized('Podgorica, Montenegro', 'Podgorica, Crna Gora'),
        title: localized('Custom kitchens and apartment packages in Podgorica', 'Kuhinje po mjeri i paketi za stanove u Podgorici'),
        intro: localized('Podgorica has the strongest mix of permanent housing, new-build apartments and investor briefs. The page targets clients who need one workshop to handle kitchens, wardrobes and practical built-ins for the whole apartment.', 'Podgorica ima najjači miks stalnog stanovanja, novogradnje i investitorskih upita. Stranica cilja klijente kojima treba jedna radionica za kuhinju, plakare i praktične ugradne elemente za cio stan.'),
        focusTitle: localized('What we usually make for Podgorica clients', 'Šta najčešće radimo za klijente u Podgorici'),
        focusItems: [
            localized('Custom kitchens for new apartments and family homes', 'Kuhinje po mjeri za novogradnju i porodične stanove'),
            localized('Built-in wardrobes and full-height storage walls', 'Ugradne plakare i skladišne zidove pune visine'),
            localized('Apartment packages that combine kitchen, bathroom and entry joinery', 'Pakete koji spajaju kuhinju, kupatilo i ulazno odlaganje'),
        ],
        processTitle: localized('How we handle Podgorica projects', 'Kako vodimo projekte za Podgoricu'),
        processItems: [
            localized('Estimate from a floor plan before handover when needed', 'Procjena iz osnove i prije primopredaje kada treba'),
            localized('Measurement and installation scheduling around building access', 'Mjerenje i montaža usklađeni sa pristupom zgradi'),
            localized('One material language across the whole apartment package', 'Jedan jezik materijala kroz cio apartmanski paket'),
        ],
        note: localized('For Podgorica, the advantage is not speed alone but full package coordination: fewer suppliers, cleaner handover and a more consistent finish language.', 'Za Podgoricu prednost nije samo brzina nego i koordinacija cijelog paketa: manje dobavljača, čistija primopredaja i ujednačeniji finiši.'),
        cta: localized('Request an estimate in Podgorica', 'Zatražite procjenu za Podgoricu'),
        faqs: cityFaqs('Podgorica', 'Podgoricu'),
    },
    {
        slug: 'budva',
        image: '/images/projects/compact-apartment/04.jpg',
        areaServed: localized('Budva', 'Budva'),
        metaTitle: localized('Custom furniture and apartment fit-out in Budva', 'Namještaj po mjeri i opremanje apartmana u Budvi'),
        metaDescription: localized('ARTIDOM furnishes Budva apartments and rental properties with custom kitchens, wardrobes and built-in storage made in Sutomore, Bar.', 'ARTIDOM oprema apartmane i stanove za izdavanje u Budvi: kuhinje po mjeri, plakari i ugradno odlaganje iz radionice u Sutomoru, Bar.'),
        label: localized('Budva, Montenegro', 'Budva, Crna Gora'),
        title: localized('Custom furniture for Budva apartments and rentals', 'Namještaj po mjeri za apartmane i najam u Budvi'),
        intro: localized('Budva asks for compact layouts, rental durability and fast turnarounds between fit-out decisions and guest-ready use. This page is aimed at owners, operators and developers who need practical apartment joinery.', 'Budva traži kompaktne osnove, postojane materijale za najam i brze odluke između opremanja i spremnosti za goste. Stranica je za vlasnike, operatere i investitore kojima treba praktična apartmanska stolarija.'),
        focusTitle: localized('What Budva apartments usually need', 'Šta apartmani u Budvi najčešće traže'),
        focusItems: [
            localized('Space-saving kitchens for short-stay and holiday properties', 'Kompaktne kuhinje za kratkoročni i sezonski najam'),
            localized('Wardrobes, shoe storage and durable entry joinery', 'Plakare, cipelare i postojano ulazno odlaganje'),
            localized('Simple furnishing packages that are easy to maintain', 'Jednostavne pakete opremanja koji se lako održavaju'),
        ],
        processTitle: localized('How we structure a Budva brief', 'Kako postavljamo posao za Budvu'),
        processItems: [
            localized('Focus on durable fronts, easy cleaning and useful storage', 'Fokus na postojane fronte, lako čišćenje i korisno odlaganje'),
            localized('Plan around seasonal occupancy and access windows', 'Planiranje prema sezoni i terminima pristupa objektu'),
            localized('Build around the real apartment geometry to save every wall', 'Izrada po stvarnoj geometriji da svaki zid radi svoj posao'),
        ],
        note: localized('The strongest Budva angle is not luxury language. It is apartment logic: fit, storage, durability and clean installation for rental turnover.', 'Najjači ugao za Budvu nije luksuzni ton. To je logika apartmana: uklapanje, odlaganje, postojanost i čista montaža za smjenu gostiju.'),
        cta: localized('Request an estimate in Budva', 'Zatražite procjenu za Budvu'),
        faqs: cityFaqs('Budva', 'Budvu'),
    },
    {
        slug: 'cijena',
        image: '/images/projects/warm-minimal-apartment/01.jpg',
        areaServed: localized('Montenegro', 'Crna Gora'),
        metaTitle: localized('Custom kitchen pricing and lead time in Montenegro', 'Cijena kuhinja po mjeri i rok izrade u Crnoj Gori'),
        metaDescription: localized('What affects the price of custom kitchens, wardrobes and apartment furnishing in Montenegro: materials, hardware, worktops, dimensions and installation.', 'Šta utiče na cijenu kuhinja po mjeri, plakara i opremanja apartmana u Crnoj Gori: materijali, okovi, radne ploče, dimenzije i montaža.'),
        label: localized('Pricing in Montenegro', 'Cijena u Crnoj Gori'),
        title: localized('What shapes the price of custom furniture in Montenegro', 'Šta oblikuje cijenu namještaja po mjeri u Crnoj Gori'),
        intro: localized('Searches around custom kitchens often end in one question: cijena. This page explains what really changes the estimate, how to send a usable brief and what usually happens after approval.', 'Pretrage za kuhinje po mjeri često se završe jednim pitanjem: cijena. Ova stranica objašnjava šta zaista mijenja procjenu, kako da pošaljete upotrebljiv upit i šta se dešava nakon odobrenja.'),
        focusTitle: localized('What usually changes the estimate', 'Šta najčešće mijenja procjenu'),
        focusItems: [
            localized('Overall dimensions, room geometry and wall conditions', 'Ukupne dimenzije, geometrija prostora i stanje zidova'),
            localized('Front finish, hardware brand and worktop choice', 'Finiš frontova, marka okova i izbor radne ploče'),
            localized('Installation scope, appliance integration and transport access', 'Obim montaže, ugradna tehnika i pristup za transport'),
        ],
        processTitle: localized('How to get a faster estimate', 'Kako do brže procjene'),
        processItems: [
            localized('Send a floor plan or a marked-up PDF', 'Pošaljite osnovu ili označen PDF'),
            localized('Add target finish references and appliance list', 'Dodajte referentne finiše i spisak tehnike'),
            localized('Note the city and whether installation is included', 'Napišite grad i da li je montaža uključena'),
        ],
        note: localized('A useful pricing page is not a fake price list. It is clarity about what we need to estimate and what usually moves the number up or down.', 'Dobra stranica o cijeni nije lažni cjenovnik. To je jasno objašnjenje šta nam treba za procjenu i šta najčešće pomjera broj gore ili dolje.'),
        cta: localized('Request a pricing estimate', 'Zatražite procjenu cijene'),
        faqs: pricingFaqs,
    },
];

export const residentialLocalPageSlugs = pages.map((page) => page.slug);

export function getResidentialLocalPage(slug: string) {
    return pages.find((page) => page.slug === slug);
}

export function resolveResidentialLocalPage(page: ResidentialLocalPageContent, locale: SupportedSeoLocale): ResolvedResidentialLocalPageContent {
    return {
        slug: page.slug,
        image: page.image,
        areaServed: resolveText(page.areaServed, locale),
        metaTitle: resolveText(page.metaTitle, locale),
        metaDescription: resolveText(page.metaDescription, locale),
        label: resolveText(page.label, locale),
        title: resolveText(page.title, locale),
        intro: resolveText(page.intro, locale),
        focusTitle: resolveText(page.focusTitle, locale),
        focusItems: page.focusItems.map((item) => resolveText(item, locale)),
        processTitle: resolveText(page.processTitle, locale),
        processItems: page.processItems.map((item) => resolveText(item, locale)),
        note: resolveText(page.note, locale),
        cta: resolveText(page.cta, locale),
        faqs: page.faqs.map((faq) => ({
            question: resolveText(faq.question, locale),
            answer: resolveText(faq.answer, locale),
        })),
    };
}
