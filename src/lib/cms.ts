const CMS_URL = process.env.PAYLOAD_CMS_URL ?? '';

export interface Post {
    id: string;
    slug: string;
    title: string;
    coverImage?: { url: string };
    tag: 'horeca' | 'materials' | 'projects' | 'industry';
    publishedAt: string;
    body: string;
    seoTitle?: string;
    seoDescription?: string;
}

// Статические fallback-данные пока нет CMS
const fallbackPostsEn: Post[] = [
    {
        id: '1',
        slug: 'kitchen-materials-coastal-montenegro',
        title: 'Which Kitchen Materials Actually Work on the Montenegro Coast',
        tag: 'materials',
        publishedAt: '2026-03-01T10:00:00Z',
        seoTitle: 'Kitchen Materials for Coastal Montenegro — What Works and What Doesn\'t',
        seoDescription: 'Practical guide to choosing kitchen worktops, fronts and hardware that hold up in Montenegro\'s coastal humidity. From a workshop in Bar.',
        body: `
<p>Salt air, summer humidity above 80%, and winter condensation on cold walls. If you buy an apartment on the Montenegrin coast and order a kitchen without thinking about these conditions, expect swollen edges, peeling laminate and rusty hinges within two seasons.</p>

<p>We build kitchens in Bar and install them from Ulcinj to Kotor. Here is what we have learned over 25 years about materials that survive — and those that don't.</p>

<h2>Worktops: compact laminate beats everything</h2>
<p>Natural stone looks beautiful but absorbs oil and lemon juice. Cheap post-formed tops delaminate where water pools near the sink. Compact laminate (12 mm HPL) handles moisture, heat and scratching without special care. We use it on 80% of coastal kitchen projects — the cost is moderate, and replacement after 10+ years is straightforward.</p>

<h2>Fronts: lacquered MDF or solid laminate</h2>
<p>Film-wrapped MDF is the cheapest option and the first to fail on the coast. The PVC film lifts at corners when humidity swings between 40% and 85%. Lacquered MDF with proper edge sealing holds up well. For higher budgets, solid-colour laminate fronts need no edge banding at all — moisture has nowhere to enter.</p>

<h2>Hardware: only stainless or coated</h2>
<p>Standard zinc-plated hinges corrode in 18 months near the sea. We spec Blum or Hettich hinges with nickel-plated or stainless bodies. The price difference per kitchen is around €40–60 — negligible compared to replacing a full set of hinges later.</p>

<h2>The back wall problem</h2>
<p>Many kitchens in new Montenegrin buildings sit against exterior walls with poor insulation. Condensation forms behind upper cabinets in winter. We leave a 15 mm ventilation gap and recommend a glass or compact-laminate backsplash instead of painted plaster that will mould within one season.</p>

<h2>What this means for your budget</h2>
<p>A coastal-ready kitchen costs roughly 15–20% more than an identical layout using basic materials. That premium pays for itself by avoiding repairs in year two or three. If you are furnishing an apartment for rental, the math is simple — a guest complaint about a swollen cabinet door costs more than the upgrade.</p>

<p>We produce kitchens in our workshop in Sutomore (Bar municipality) and install across the coast. If you want to discuss materials for a specific apartment, send us the floor plan — we will suggest a layout and quote within a few days.</p>
`,
    },
    {
        id: '2',
        slug: 'furnishing-rental-apartment-montenegro',
        title: 'Furnishing a Rental Apartment in Montenegro: What Owners Get Wrong',
        tag: 'projects',
        publishedAt: '2026-02-20T10:00:00Z',
        seoTitle: 'Furnishing a Rental Apartment in Montenegro — Practical Guide for Owners',
        seoDescription: 'Common mistakes when furnishing apartments for Airbnb and long-term rental in Montenegro. Kitchen, storage and durability tips from a local workshop.',
        body: `
<p>Montenegro has over 30,000 apartments listed on Booking and Airbnb. Most are furnished the same way: IKEA-style flat-packs from Podgorica, a cheap kitchen with no storage, and a wardrobe that barely fits winter bedding. Guests notice. Ratings drop. Owners wonder why.</p>

<p>We furnish apartments for owners along the Bar–Budva–Tivat coast. Here are the mistakes we see repeatedly and what works better.</p>

<h2>Mistake 1: buying furniture before measuring</h2>
<p>Standard 60 cm base cabinets don't fit a 2.4 m kitchen wall without awkward fillers. Montenegrin apartments — especially in older buildings — have irregular walls, pipes in odd places, and ceiling heights that vary by 3–5 cm across a room. Custom-built furniture costs 20–30% more than flat-pack, but uses every centimetre. In a 35 m² studio, that difference is the storage space for an ironing board, vacuum, and suitcase rack that guests actually need.</p>

<h2>Mistake 2: no entry storage</h2>
<p>Guests arrive with suitcases, shoes and wet jackets. Without an entry wardrobe or shoe cabinet, these items end up on the floor of the bedroom. A built-in entry wall — 40 cm deep, floor to ceiling — solves this with hanging space, shoe storage and a shelf for keys and chargers. We install these as a single unit that bolts to the wall in under two hours.</p>

<h2>Mistake 3: the wrong kitchen worktop</h2>
<p>Guests are not as careful as owners. Hot pans go directly on the surface, red wine sits overnight, and cleaning happens with whatever is under the sink. Cheap melamine tops stain and swell. Compact laminate or solid-surface worktops handle the abuse and clean up with a sponge. The extra €200–300 saves a replacement cycle every two years.</p>

<h2>Mistake 4: ignoring the balcony</h2>
<p>A furnished balcony with a small table and two chairs gets mentioned in 40% of positive reviews for coastal apartments. Yet most owners leave the balcony empty or put out a plastic chair from the supermarket. A compact folding table and weather-resistant seating costs under €150 and directly affects your listing photos and rating.</p>

<h2>What a practical furnishing package looks like</h2>
<p>For a typical two-room apartment (45–55 m²), we supply: kitchen with integrated appliances, entry storage wall, bedroom wardrobe, and bathroom vanity. Production takes 4–6 weeks, installation is one day. The owner gets a single invoice, a single warranty, and furniture built to the actual walls — not to a catalogue drawing.</p>

<p>If you own an apartment on the Montenegrin coast and want to discuss furnishing, send us the floor plan and photos. We will suggest what makes sense for your layout and rental goals.</p>
`,
    },
];

const fallbackPostsSr: Post[] = [
    {
        id: '1',
        slug: 'materijali-za-kuhinju-primorje',
        title: 'Koji materijali za kuhinju zaista izdržavaju na crnogorskom primorju',
        tag: 'materials',
        publishedAt: '2026-03-01T10:00:00Z',
        seoTitle: 'Materijali za kuhinju na primorju Crne Gore — šta traje, a šta ne',
        seoDescription: 'Praktičan vodič za izbor radnih ploča, frontova i okova za kuhinje na crnogorskoj obali. Iz radionice u Baru.',
        body: `
<p>Slani vazduh, ljetnja vlažnost iznad 80% i zimska kondenzacija na hladnim zidovima. Ako kupite stan na crnogorskom primorju i naručite kuhinju bez razmišljanja o ovim uslovima, očekujte natečene ivice, ljuštenje laminata i zarđale šarke u roku od dvije sezone.</p>

<p>Pravimo kuhinje u Baru i ugrađujemo ih od Ulcinja do Kotora. Evo šta smo naučili za 25 godina o materijalima koji opstaju — i onima koji ne opstaju.</p>

<h2>Radne ploče: kompakt laminat pobjeđuje sve</h2>
<p>Prirodni kamen izgleda lijepo, ali upija ulje i limunov sok. Jeftine postforming ploče se raslojavaju tamo gdje se voda zadržava kod sudopere. Kompakt laminat (12 mm HPL) podnosi vlagu, toplotu i grebanje bez posebnog održavanja. Koristimo ga na 80% projekata primorskih kuhinja — cijena je umjerena, a zamjena nakon 10+ godina je jednostavna.</p>

<h2>Frontovi: lakirani MDF ili puni laminat</h2>
<p>MDF obložen folijom je najjeftinija opcija i prva koja zakaže na primorju. PVC folija se podiže na uglovima kada vlažnost varira između 40% i 85%. Lakirani MDF sa pravilno zabrtvljenim ivicama dobro se drži. Za veće budžete, frontovi od punog laminata uopšte ne trebaju kantovanje — vlaga nema kuda da uđe.</p>

<h2>Okovi: samo nehrđajući ili presvučeni</h2>
<p>Standardne cinkom prevučene šarke korodiraju za 18 mjeseci blizu mora. Mi specificiramo Blum ili Hettich šarke sa niklovanim ili nehrđajućim tijelima. Razlika u cijeni po kuhinji je oko 40–60 € — zanemarljivo u poređenju sa zamjenom kompletnog seta šarki kasnije.</p>

<h2>Problem zadnjeg zida</h2>
<p>Mnoge kuhinje u novim crnogorskim zgradama stoje uz spoljašnje zidove sa lošom izolacijom. Kondenzacija se formira iza gornjih elemenata zimi. Ostavljamo 15 mm ventilacioni razmak i preporučujemo staklenu ili kompakt-laminatnu zidnu oblogu umjesto obojenog maltera koji će se upliješniti za jednu sezonu.</p>

<h2>Šta to znači za vaš budžet</h2>
<p>Kuhinja spremna za primorje košta otprilike 15–20% više od identičnog rasporeda sa osnovnim materijalima. Ta razlika se isplati tako što izbjegavate popravke u drugoj ili trećoj godini. Ako opremete stan za izdavanje, matematika je jednostavna — žalba gosta na natečena vratašca ormara košta više od nadogradnje.</p>

<p>Proizvodimo kuhinje u našoj radionici u Sutomoru (opština Bar) i ugrađujemo duž obale. Ako želite da razgovaramo o materijalima za konkretan stan, pošaljite nam tlocrt — predložićemo raspored i ponudu u roku od nekoliko dana.</p>
`,
    },
    {
        id: '2',
        slug: 'opremanje-apartmana-za-izdavanje',
        title: 'Opremanje apartmana za izdavanje u Crnoj Gori: greške koje vlasnici prave',
        tag: 'projects',
        publishedAt: '2026-02-20T10:00:00Z',
        seoTitle: 'Opremanje apartmana za izdavanje u Crnoj Gori — praktičan vodič za vlasnike',
        seoDescription: 'Najčešće greške pri opremanju apartmana za Airbnb i dugoročno izdavanje u Crnoj Gori. Savjeti za kuhinju, odlaganje i izdržljivost iz lokalne radionice.',
        body: `
<p>Crna Gora ima preko 30.000 apartmana na Booking-u i Airbnb-u. Većina je opremljena na isti način: flat-pack namještaj iz Podgorice, jeftina kuhinja bez odlaganja i plakar u koji jedva stane zimska posteljina. Gosti to primijete. Ocjene padaju. Vlasnici se pitaju zašto.</p>

<p>Opremamo apartmane za vlasnike duž obale Bar–Budva–Tivat. Evo grešaka koje stalno viđamo i šta bolje funkcioniše.</p>

<h2>Greška 1: kupovina namještaja prije mjerenja</h2>
<p>Standardni elementi od 60 cm ne staju na zid kuhinje od 2,4 m bez nezgodnih ispuna. Crnogorski stanovi — posebno u starijim zgradama — imaju nepravilne zidove, cijevi na čudnim mjestima i visine plafona koje variraju za 3–5 cm u prostoriji. Namještaj po mjeri košta 20–30% više od gotovog, ali koristi svaki centimetar. U studiju od 35 m², ta razlika je prostor za dasku za peglanje, usisivač i stalak za kofer koji gostima zaista trebaju.</p>

<h2>Greška 2: nema ulaznog odlaganja</h2>
<p>Gosti dolaze sa koferima, cipelama i mokrim jaknama. Bez ulaznog plakara ili ormara za cipele, te stvari završe na podu spavaće sobe. Ugradni ulazni zid — dubine 40 cm, od poda do plafona — rješava ovo sa prostorom za vješanje, odlaganjem cipela i policom za ključeve i punjače. Ugrađujemo ih kao jednu cjelinu koja se pričvrsti za zid za manje od dva sata.</p>

<h2>Greška 3: pogrešna radna ploča kuhinje</h2>
<p>Gosti nisu pažljivi kao vlasnici. Vreli lonci idu direktno na površinu, crno vino stoji preko noći, a čišćenje se radi sa čime god je pod sudoperom. Jeftine melaminske ploče se mrljaju i bubre. Kompakt laminat ili solid-surface ploče podnose zloupotrebu i čiste se sundjerom. Dodatnih 200–300 € štedi ciklus zamjene svake dvije godine.</p>

<h2>Greška 4: ignorisanje balkona</h2>
<p>Namješten balkon sa malim stolom i dvije stolice pominje se u 40% pozitivnih recenzija za primorske apartmane. Ipak, većina vlasnika ostavlja balkon praznim ili stavi plastičnu stolicu iz marketa. Kompaktan sklopivi sto i vremenski otporna sjedišta koštaju ispod 150 € i direktno utiču na fotografije oglasa i ocjenu.</p>

<h2>Kako izgleda praktičan paket opremanja</h2>
<p>Za tipičan dvosoban stan (45–55 m²) isporučujemo: kuhinju sa integrisanim aparatima, ulazni zid za odlaganje, plakar u spavaćoj sobi i kupatilski element. Proizvodnja traje 4–6 sedmica, ugradnja je jedan dan. Vlasnik dobija jednu fakturu, jednu garanciju i namještaj izrađen po stvarnim zidovima — ne po kataloški crtežu.</p>

<p>Ako posjedujete stan na crnogorskom primorju i želite da razgovaramo o opremanju, pošaljite nam tlocrt i fotografije. Predložićemo šta ima smisla za vaš raspored i ciljeve izdavanja.</p>
`,
    },
];

const fallbackByLocale: Record<string, Post[]> = {
    en: fallbackPostsEn,
    sr: fallbackPostsSr,
};

export async function getPosts(locale: string): Promise<Post[]> {
    const fallback = fallbackByLocale[locale] ?? fallbackPostsEn;
    if (!CMS_URL) return fallback;
    try {
        const res = await fetch(
            `${CMS_URL}/api/posts?locale=${locale}&sort=-publishedAt&limit=20`,
            { next: { revalidate: 60 } }
        );
        const data = await res.json();
        return data.docs ?? [];
    } catch {
        return fallback;
    }
}

export async function getPost(slug: string, locale: string): Promise<Post | null> {
    const fallback = fallbackByLocale[locale] ?? fallbackPostsEn;
    if (!CMS_URL) return fallback.find(p => p.slug === slug) ?? null;
    try {
        const res = await fetch(
            `${CMS_URL}/api/posts?where[slug][equals]=${slug}&locale=${locale}`,
            { next: { revalidate: 60 } }
        );
        const data = await res.json();
        return data.docs?.[0] ?? null;
    } catch {
        return fallback.find(p => p.slug === slug) ?? null;
    }
}
