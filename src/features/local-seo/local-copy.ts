import type {
    FAQItem,
    FAQSectionContent,
    LocalSeoLinkCard,
    LocalizedText,
    ResolvedFAQSectionContent,
    ResolvedLocalSeoLinkCard,
    SupportedSeoLocale,
} from './types';

function localized(en: string, sr: string, ru: string): LocalizedText {
    return { en, sr, ru };
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
        title: localized('Bar', 'Bar', 'Бар'),
        description: localized('Custom kitchens, wardrobes and apartment furnishing close to the workshop.', 'Kuhinje po mjeri, plakari i opremanje apartmana blizu radionice.', 'Кухни на заказ, шкафы и меблировка квартир рядом с цехом.'),
    },
    {
        slug: 'podgorica',
        title: localized('Podgorica', 'Podgorica', 'Подгорица'),
        description: localized('Custom kitchens and full apartment packages for the capital and new developments.', 'Kuhinje po mjeri i kompletni paketi za stanove u glavnom gradu i novogradnji.', 'Кухни на заказ и полные пакеты меблировки для столицы и новостроек.'),
    },
    {
        slug: 'budva',
        title: localized('Budva', 'Budva', 'Будва'),
        description: localized('Apartment fit-outs for rental properties, compact layouts and seasonal turnovers.', 'Opremanje apartmana za izdavanje, kompaktne osnove i sezonske smjene gostiju.', 'Меблировка арендных квартир, компактные планировки и сезонная ротация.'),
    },
    {
        slug: 'cijena',
        title: localized('Estimate & timing', 'Procjena i rokovi', 'Расчёт и сроки'),
        description: localized('What affects the price of a custom kitchen, wardrobe or apartment package in Montenegro.', 'Šta utiče na cijenu kuhinje po mjeri, plakara ili kompletnog paketa za apartman u Crnoj Gori.', 'Что влияет на стоимость кухни на заказ, шкафов или пакета меблировки в Черногории.'),
    },
];

const residentialFaqSection: FAQSectionContent = {
    title: localized('Residential fit-out FAQ', 'Pitanja o opremanju stanova i apartmana', 'Частые вопросы о меблировке квартир'),
    intro: localized('This block covers the recurring questions around price, lead time, measurements and installation in Montenegro.', 'Ovdje su kratki odgovori na pitanja koja se najčešće javljaju oko cijene, roka, mjerenja i montaže u Crnoj Gori.', 'Ответы на частые вопросы о стоимости, сроках, замерах и установке в Черногории.'),
    items: [
        {
            question: localized('How do you calculate the price of a custom kitchen or wardrobe?', 'Kako računate cijenu kuhinje po mjeri ili plakara?', 'Как рассчитывается стоимость кухни или шкафа на заказ?'),
            answer: localized('We estimate from the floor plan, dimensions, materials, fronts, hardware, worktops and installation scope. The fastest way is to send a plan or marked-up PDF.', 'Procjena zavisi od osnove, dimenzija, materijala, frontova, okova, radne ploče i obima montaže. Najbrže je da pošaljete osnovu ili označen PDF.', 'Расчёт зависит от плана, размеров, материалов, фасадов, фурнитуры, столешницы и объёма монтажа. Быстрее всего — прислать план или размеченный PDF.'),
        },
        {
            question: localized('Can you work with apartments on the coast and in Podgorica?', 'Radite li stanove na primorju i u Podgorici?', 'Работаете ли вы с квартирами на побережье и в Подгорице?'),
            answer: localized('Yes. The workshop is in Zaljevo, Bar, and we organise measurement, delivery and installation across Bar, Budva, Podgorica and nearby locations.', 'Da. Radionica je u Zaljevu, Bar, a mjerenje, isporuku i montažu organizujemo za Bar, Budvu, Podgoricu i okolinu.', 'Да. Цех в Залево (Бар), а замер, доставку и монтаж организуем в Баре, Будве, Подгорице и окрестностях.'),
        },
        {
            question: localized('What affects timing for apartment furnishing?', 'Šta utiče na rok opremanja apartmana?', 'Что влияет на срок меблировки квартиры?'),
            answer: localized('Timing depends on measurements, material confirmation, project scope and installation access. Larger or more custom packages can take longer.', 'Rok zavisi od mjerenja, potvrde materijala, obima projekta i pristupa za montažu. Veći ili složeniji paketi mogu tražiti više vremena.', 'Срок зависит от замера, согласования материалов, объёма проекта и доступа для монтажа. Сложные проекты могут занять больше.'),
        },
        {
            question: localized('What is included in an apartment furnishing package?', 'Šta ulazi u paket opremanja apartmana?', 'Что входит в пакет меблировки квартиры?'),
            answer: localized('A typical package combines a custom kitchen, wardrobes, entry storage, bathroom joinery and TV wall. The exact scope is built from the floor plan and rental or private-use brief.', 'Tipičan paket spaja kuhinju po mjeri, plakare, ulazno odlaganje, kupatilske elemente i TV zid. Tačan obim se formira prema osnovi prostora i načinu korišćenja.', 'Обычный пакет включает кухню на заказ, шкафы, прихожую, мебель для ванной и ТВ-зону. Точный состав собираем по плану квартиры и сценарию использования.'),
        },
        {
            question: localized('Can you make custom wardrobes as a separate order?', 'Možete li napraviti plakare po mjeri kao poseban posao?', 'Можно заказать только шкафы на заказ?'),
            answer: localized('Yes. Built-in wardrobes, sliding wardrobes and full-height storage walls can be ordered separately or as part of a full apartment package.', 'Da. Ugradni plakari, klizni plakari i skladišni zidovi pune visine mogu se naručiti posebno ili u okviru kompletnog apartmanskog paketa.', 'Да. Встроенные шкафы, шкафы-купе и стенки хранения можно заказать отдельно или в составе полной меблировки квартиры.'),
        },
        {
            question: localized('Do you only make apartments or can you also do HoReCa and B2B?', 'Radite li samo stanove ili i HoReCa / B2B?', 'Вы работаете только с квартирами или берёте HoReCa / B2B?'),
            answer: localized('Residential is the main direction. We also take selected HoReCa and B2B briefs when the task, drawings, budget and logistics can be aligned.', 'Stanovi i apartmani su glavni pravac. Uzimamo i odabrane HoReCa i B2B projekte kada zadatak, crteži, budžet i logistika mogu da se usklade.', 'Квартиры — основное направление. Берём избранные HoReCa и B2B заказы, когда задачу, чертежи, бюджет и логистику можно согласовать.'),
        },
    ],
};

const workshopFaqSection: FAQSectionContent = {
    title: localized('Workshop FAQ', 'Pitanja o radionici i proizvodnji', 'Вопросы о цехе и производстве'),
    intro: localized('A compact FAQ for production, measurements, materials and coordination before an apartment or B2B order starts.', 'Kratka FAQ sekcija o proizvodnji, mjerenju, materijalima i koordinaciji prije početka stambenog ili B2B posla.', 'Короткие ответы о производстве, замерах, материалах и координации до начала заказа.'),
    items: [
        {
            question: localized('What do you need to prepare an estimate?', 'Šta vam treba za procjenu cijene?', 'Что нужно для расчёта стоимости?'),
            answer: localized('A floor plan, room measurements, inspirational references or a DWG / PDF set is enough to start. Then we align materials and installation scope.', 'Za početak su dovoljni osnova prostora, mjere, referentne slike ili DWG / PDF crteži. Nakon toga usklađujemo materijale i obim montaže.', 'Для начала хватит плана помещения, замеров, референсов или DWG / PDF. Затем согласуем материалы и объём монтажа.'),
        },
        {
            question: localized('Which materials do you work with most often?', 'Sa kojim materijalima najčešće radite?', 'С какими материалами вы работаете чаще всего?'),
            answer: localized('Mostly laminated board (LDSP) and lacquered MDF. Veneer and pricier finishes on request. Worktops: postforming, acrylic stone, quartz.', 'Najčešće iverica (LSDP) i lakirani MDF. Furnir i skuplje obrade na zahtjev. Radne ploče: postforming, akrilni kamen, kvarc.', 'Чаще всего — ЛДСП и лакированный МДФ. Шпон и более дорогие отделки — по запросу. Столешницы: постформинг, акриловый камень, кварц.'),
        },
        {
            question: localized('Is production handled from the Bar workshop?', 'Vodi li se proizvodnja iz radionice u Baru?', 'Производство ведётся из цеха в Баре?'),
            answer: localized('Yes. Production preparation, assembly, finishing and installation coordination are handled from the Zaljevo workshop.', 'Da. Priprema proizvodnje, sklapanje, završna obrada i koordinacija montaže vode se iz radionice u Zaljevu.', 'Да. Подготовка производства, сборка, отделка и координация монтажа идут из цеха в Залево.'),
        },
        {
            question: localized('Can production and installation be coordinated from one workshop?', 'Može li proizvodnja i montaža da se vodi iz jedne radionice?', 'Можно ли вести производство и монтаж из одного цеха?'),
            answer: localized('Yes. Measurement, production preparation, delivery and installation are coordinated by the same team in Zaljevo, Bar.', 'Da. Mjerenje, priprema proizvodnje, isporuka i montaža koordiniraju se iz istog tima u Zaljevu, Bar.', 'Да. Замер, подготовку производства, доставку и монтаж координирует одна команда в Залево (Бар).'),
        },
        {
            question: localized('Do you work from technical drawings only?', 'Radite li samo po tehničkim crtežima?', 'Работаете только по техническим чертежам?'),
            answer: localized('Not only. We make the design and technical drawings ourselves when needed: a floor plan, measurements or photos of the room are enough to start.', 'Ne samo. Projekt i tehničke crteže radimo i sami po potrebi: za početak su dovoljni osnova, mjere ili fotografije prostora.', 'Не только. Проект и чертежи делаем сами при необходимости: для старта хватит плана, замеров или фото помещения.'),
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
        title: resolveText(localized('Cities and estimates', 'Gradovi i procjena', 'Города и расчёт'), locale),
        intro: resolveText(localized('These pages target the main residential GEO queries we want to own in Montenegro first.', 'Ove stranice ciljaju glavne GEO upite za stanove i apartmane koje želimo da pokrijemo prvo u Crnoj Gori.', 'Страницы по основным ГЕО-запросам для жилой мебели в Черногории.'), locale),
    };
}
