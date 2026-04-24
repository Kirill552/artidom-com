const businessId = "https://artidom.art/#localbusiness";
const websiteId = "https://artidom.art/#website";
const logoUrl = "https://artidom.art/web-app-manifest-512x512.png";

const serviceNames = {
  en: [
    "Custom kitchens in Montenegro",
    "Custom furniture and furniture maker services",
    "Apartment furnishing packages",
    "Built-in wardrobes and storage walls",
    "Kitchen pricing and project estimates",
    "HoReCa counters and B2B joinery",
  ],
  sr: [
    "Kuhinje po mjeri u Crnoj Gori",
    "Namještaj po mjeri i izrada namještaja",
    "Opremanje apartmana i stanova",
    "Ugradni plakari i odlaganje",
    "Cijena kuhinje po mjeri i procjena projekta",
    "Pultovi po mjeri i B2B stolarija",
  ],
  ru: [
    "Кухни на заказ в Черногории",
    "Мебель на заказ и производство мебели",
    "Меблировка квартир и апартаментов",
    "Шкафы-купе и встроенное хранение",
    "Стоимость кухни на заказ и расчет проекта",
    "Барные стойки и B2B столярные изделия",
  ],
} as const;

function getLocaleKey(locale: string): keyof typeof serviceNames {
  return locale === "ru" || locale === "sr" ? locale : "en";
}

export const getSchemaData = (locale: string) => {
  const localeKey = getLocaleKey(locale);

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Artidom DOO",
    "legalName": "Artidom DOO",
    "alternateName": "ARTIDOM",
    "image": "https://artidom.art/og/home.png",
    "logo": logoUrl,
    "@id": businessId,
    "url": "https://artidom.art",
    "email": "artidom96@gmail.com",
    "telephone": "+38268247350",
    "taxID": "03505464",
    "currenciesAccepted": "EUR",
    "paymentAccepted": "Cash, Bank transfer",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Zaljevo bb",
      "postalCode": "85000",
      "addressLocality": "Bar",
      "addressCountry": "ME"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 42.0649384,
      "longitude": 19.1172821
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "name": "Alena",
        "contactType": "customer support",
        "telephone": "+38268247350",
        "email": "artidom96@gmail.com",
        "areaServed": "ME",
        "availableLanguage": ["sr", "en", "ru"]
      },
      {
        "@type": "ContactPoint",
        "name": "Vladimir",
        "contactType": "sales",
        "telephone": "+38268282371",
        "areaServed": "ME",
        "availableLanguage": ["sr", "en", "ru"]
      }
    ],
    "areaServed": [
      {
        "@type": "Country",
        "name": "Montenegro"
      },
      {
        "@type": "City",
        "name": "Bar"
      },
      {
        "@type": "City",
        "name": "Podgorica"
      },
      {
        "@type": "City",
        "name": "Budva"
      },
      {
        "@type": "City",
        "name": "Tivat"
      },
      {
        "@type": "City",
        "name": "Kotor"
      },
      {
        "@type": "City",
        "name": "Herceg Novi"
      },
      {
        "@type": "City",
        "name": "Ulcinj"
      },
      {
        "@type": "City",
        "name": "Nikšić"
      },
      {
        "@type": "City",
        "name": "Cetinje"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 42.0649384,
        "longitude": 19.1172821
      },
      "geoRadius": "150000"
    },
    "priceRange": "€€",
    "knowsAbout": serviceNames[localeKey],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": localeKey === "ru" ? "Мебель на заказ" : localeKey === "sr" ? "Namještaj po mjeri" : "Custom furniture",
      "itemListElement": serviceNames[localeKey].map((name) => ({
        "@type": "Offer",
        "areaServed": "Montenegro",
        "priceCurrency": "EUR",
        "itemOffered": {
          "@type": "Service",
          "name": name,
          "provider": { "@id": businessId }
        }
      }))
    },
    "sameAs": [
      "https://www.facebook.com/artidom.ru/",
      "https://www.instagram.com/artidom.me/",
      "https://maps.google.com/?cid=15428388142012942100"
    ],
    "description": locale === 'en'
      ? "Custom kitchens, wardrobes and apartment furnishing in Montenegro. Workshop in Zaljevo, Bar with selected HoReCa and B2B fit-outs."
      : locale === 'ru'
      ? "Кухни, шкафы и мебель на заказ в Черногории. Собственное производство в Залево (Бар). Жилые проекты и B2B."
      : "Kuhinje po mjeri, plakari i izrada namještaja po mjeri za apartmane u Crnoj Gori. Radionica u Zaljevu, Bar i odabrani HoReCa i B2B projekti."
  };
};

export function getWebSiteSchema(locale = 'sr') {
  const localeKey = getLocaleKey(locale);

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    "name": "ARTIDOM",
    "alternateName": "Artidom DOO",
    "url": "https://artidom.art",
    "inLanguage": ["en", "sr", "ru"],
    "publisher": { "@id": businessId },
    "about": { "@id": businessId },
    "keywords": serviceNames[localeKey].join(", "),
    "hasPart": [
      "https://artidom.art/sr/solutions/residential",
      "https://artidom.art/en/solutions/residential",
      "https://artidom.art/ru/solutions/residential",
      "https://artidom.art/sr/workshop",
      "https://artidom.art/sr/catalog",
      "https://artidom.art/sr/projects"
    ]
  };
}
