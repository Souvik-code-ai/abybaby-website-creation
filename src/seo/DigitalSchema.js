// seo/digitalSchema.js
//
// Builds Schema.org Service JSON-LD from the DIGITAL_PROJECTS_ALL array.
//
// Same reasoning as exhibitionSchema.js: these entries have no date or
// location, so `Event` schema doesn't apply. They read as a portfolio
// of digital marketing / creative work delivered, so `Service` is the
// correct type.
//
// NOTE: this data is sparser than EVENTS or EXHIBITIONS_ALL — just
// `name` and images, no boothSize/attendance/features to build a rich
// description from. The description below is intentionally generic;
// if more detail (what the project actually involved — social media,
// web design, campaign type, etc.) gets added to this data later,
// update buildDescription to use it instead of the generic fallback.

/**
 * Builds an array of Service schema objects from DIGITAL_PROJECTS_ALL.
 *
 * @param {Array} projects - the DIGITAL_PROJECTS_ALL array
 * @returns {Array} array of Service schema objects, ready to pass
 *   individually to your JsonLd component
 */
export function buildDigitalSchema(projects) {
  return projects
    .filter((p) => p.name) // basic sanity guard
    .map((p) => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: p.name,
      description: `${p.name} — a digital marketing and creative project delivered by AbyBaby Events.`,
      serviceType: "Digital Marketing & Creative Services",
      provider: {
        "@type": "Organization",
        name: "AbyBaby Events",
        url: "https://abybabyevents.com",
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      image: p.image ? [p.image] : undefined,
    }));
}