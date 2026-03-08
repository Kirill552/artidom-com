export const getSchemaData = (locale: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Artidom DOO",
    "legalName": "Artidom DOO",
    "alternateName": "ARTIDOM",
    "image": "https://artidom.art/api/og",
    "@id": "https://artidom.art",
    "url": "https://artidom.art",
    "email": "director@a-96.ru",
    "telephone": "+38268282371",
    "taxID": "03505464",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Mirošica 2, Sutomore",
      "postalCode": "85000",
      "addressLocality": "Bar",
      "addressCountry": "ME"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 42.0931,
      "longitude": 19.1003
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "telephone": "+38268282371",
      "email": "director@a-96.ru",
      "areaServed": "ME",
      "availableLanguage": ["sr", "en", "ru"]
    },
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
      }
    ],
    "sameAs": [],
    "description": locale === 'en'
      ? "Custom kitchens, wardrobes and apartment furnishing in Montenegro. Workshop in Sutomore, Bar with selected HoReCa and B2B fit-outs."
      : locale === 'ru'
      ? "Кухни, шкафы и мебель на заказ в Черногории. Собственное производство в Суторморе (Бар). Жилые проекты и B2B."
      : "Kuhinje po mjeri, plakari i izrada namještaja po mjeri za apartmane u Crnoj Gori. Radionica u Sutomoru, Bar i odabrani HoReCa i B2B projekti."
  };
};

export const getProjectSchema = (locale: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Project",
    "name": locale === 'en' ? "International School Montenegro Furnishing" : "Opremanje Internacionalne škole Crna Gora",
    "description": "1,200 sqm comprehensive educational facility furnishing project.",
    "location": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Montenegro",
        "addressCountry": "ME"
      }
    },
    "author": {
      "@type": "Organization",
      "name": "ARTIDOM"
    }
  };
};
