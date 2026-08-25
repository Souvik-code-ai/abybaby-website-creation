// seo/servicesSchema.js
//
// Builds Schema.org Service JSON-LD from the SERVICES array.
// This is the strongest schema fit in this file — each entry already
// has a title, description, and a list of concrete sub-services,
// which maps directly onto Service schema's required/recommended
// fields.
//
// NOTE on the rest of this file's data (for context, not handled here):
// - REELS_DATA would map to VideoObject, but Google requires
//   `uploadDate` for VideoObject rich-result eligibility, and this
//   data doesn't have it — skip until that field exists.
// - IMAGES_DATA / CAROUSEL_ITEMS / STATS don't have a clean,
//   worthwhile Schema.org type for this use case — left unmarked.

/**
 * Builds an array of Service schema objects from the SERVICES array.
 *
 * @param {Array} services - the SERVICES array
 * @returns {Array} array of Service schema objects, ready to pass
 *   individually to your JsonLd component
 */
export function buildProfileSchema(services) {
  return services
    .filter((s) => s.title) // basic sanity guard
    .map((s) => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.title,
      description: s.description,
      serviceType: s.services?.join(", "),
      provider: {
        "@type": "Organization",
        name: "AbyBaby Events",
        url: "https://abybabyevents.com",
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      hasOfferCatalog: s.services?.length
        ? {
            "@type": "OfferCatalog",
            name: s.title,
            itemListElement: s.services.map((item) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: item,
              },
            })),
          }
        : undefined,
    }));
}