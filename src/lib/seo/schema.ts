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
    "email": "artidom96@gmail.com",
    "telephone": "+38269256978",
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
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "name": "Veronika",
        "contactType": "customer support",
        "telephone": "+38269256978",
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
      },
      {
        "@type": "City",
        "name": "Sutomore"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 42.0931,
        "longitude": 19.1003
      },
      "geoRadius": "150000"
    },
    "priceRange": "€€",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Custom furniture",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom kitchens"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Wardrobes and built-in storage"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Apartment furnishing packages"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "HoReCa and B2B joinery"
          }
        }
      ]
    },
    "sameAs": ["https://www.facebook.com/artidom.ru/"],
    "description": locale === 'en'
      ? "Custom kitchens, wardrobes and apartment furnishing in Montenegro. Workshop in Sutomore, Bar with selected HoReCa and B2B fit-outs."
      : locale === 'ru'
      ? "Кухни, шкафы и мебель на заказ в Черногории. Собственное производство в Суторморе (Бар). Жилые проекты и B2B."
      : "Kuhinje po mjeri, plakari i izrada namještaja po mjeri za apartmane u Crnoj Gori. Radionica u Sutomoru, Bar i odabrani HoReCa i B2B projekti."
  };
};

