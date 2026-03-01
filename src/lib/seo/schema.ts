export const getSchemaData = (locale: string) => {
  const isEn = locale === 'en';
  const isDe = locale === 'de';
  
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ARTIDOM",
    "image": "https://artidom.com/og-image.jpg",
    "@id": "https://artidom.com",
    "url": "https://artidom.com",
    "telephone": "+382...", 
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Budva",
      "addressCountry": "ME"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 42.2911,
      "longitude": 18.8403
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
      ? "Bespoke furniture manufacturing and turnkey interior furnishing in Montenegro. 25 years of woodworking expertise."
      : isDe 
        ? "Maßgefertigte Möbelproduktion und schlüsselfertige Inneneinrichtung in Montenegro. 25 Jahre Erfahrung in der Holzbearbeitung."
        : "Proizvodnja namještaja po mjeri i opremanje enterijera u Crnoj Gori. 25 godina iskustva u drvnoj industriji.",
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
    "name": locale === 'en' ? "International School Montenegro Furnishing" : "Internationale Schule Montenegro Möblierung",
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
