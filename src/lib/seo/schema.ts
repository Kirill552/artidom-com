export const getSchemaData = (locale: string) => {
  const isEn = locale === 'en';
  
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ARTIDOM",
    "image": "https://artidom.art/og-image.jpg",
    "@id": "https://artidom.art",
    "url": "https://artidom.art",
    "telephone": "+382...", 
    "address": {
      "@type": "PostalAddress",
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
    "sameAs": [],
    "description": isEn
      ? "Custom kitchens, wardrobes and apartment furnishing in Montenegro. Workshop in Bar with selected HoReCa and B2B fit-outs."
      : "Kuhinje po mjeri, plakari i opremanje apartmana u Crnoj Gori. Radionica u Baru i odabrani HoReCa i B2B projekti.",
    "parentOrganization": {
      "@type": "Organization",
      "name": "ARTIDOM Group",
      "foundingDate": "2001"
    }
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
