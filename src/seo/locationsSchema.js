// seo/locationsSchema.js
//
// Builds Schema.org LocalBusiness JSON-LD — one entry per branch
// office in LOCATIONS. This is different from your existing
// localBusinessSchema.js (which represents the single primary/HQ
// listing) — this represents each individual city presence, linked
// back to the parent organization via `parentOrganization`, which is
// Google's recommended pattern for multi-location businesses.
//
// This data is a strong fit: every entry already has a real address,
// coordinates, and contact info — no missing-field issues like the
// Event/VideoObject cases.

/**
 * Builds an array of LocalBusiness schema objects, one per location.
 *
 * @param {Array} locations - the LOCATIONS array
 * @returns {Array} array of LocalBusiness schema objects, ready to
 *   pass individually to your JsonLd component
 */
export function buildLocationsSchema(locations) {
  return locations
    .filter((loc) => loc.city && loc.address) // sanity guard
    .map((loc) => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: `AbyBaby Events — ${loc.city}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: loc.address,
        addressLocality: loc.city,
        addressRegion: loc.state,
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: loc.lat,
        longitude: loc.lng,
      },
      telephone: loc.contactNumber?.[0],
      email: loc.contactEmail?.[0],
      image: loc.locationsImage ? [loc.locationsImage] : undefined,
      parentOrganization: {
        "@type": "Organization",
        name: "AbyBaby Events",
        url: "https://abybabyevents.com",
      },
    }));
}