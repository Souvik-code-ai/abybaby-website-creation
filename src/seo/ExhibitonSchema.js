// seo/exhibitionSchema.js
//
// Builds Schema.org Service JSON-LD from the EXHIBITIONS_ALL data array.
//
// NOTE: Exhibition entries have no date, location, or status fields —
// they read as a portfolio of exhibition/activation services delivered,
// not scheduled events people can attend. That means `Event` schema
// (which requires startDate + location to be eligible) does NOT apply
// here. `Service` is the correct type: it describes an offering
// ("we design and run exhibition booths/activations like this one"),
// not a specific dated happening.
//
// If dates/locations are added to this data later, some entries might
// become genuine `Event`s instead — re-evaluate at that point rather
// than force-fitting Event schema onto data that doesn't support it.

/**
 * Builds an array of Service schema objects from EXHIBITIONS_ALL.
 *
 * @param {Array} exhibitions - the EXHIBITIONS_ALL array
 * @returns {Array} array of Service schema objects, ready to pass
 *   individually to your JsonLd component
 */
export function buildExhibitionSchema(exhibitions) {
  return exhibitions
    .filter((ex) => ex.name) // basic sanity guard, skip anything malformed
    .map((ex) => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: ex.name,
      description: buildDescription(ex),
      serviceType: "Exhibition & Brand Activation",
      provider: {
        "@type": "Organization",
        name: "AbyBaby Events",
        url: "https://abybabyevents.com",
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      image: ex.image ? [ex.image] : undefined,
    }));
}

/**
 * Builds a short description from booth size, attendance, and features,
 * since these entries don't have a written `description` field like
 * some of your EVENTS entries do.
 */
function buildDescription(ex) {
  const parts = [];

  if (ex.boothSize) parts.push(`${ex.boothSize} exhibition space`);
  if (ex.attendance) parts.push(`${ex.attendance} attendees engaged`);
  if (ex.features?.length) {
    parts.push(`featuring ${ex.features.slice(0, 3).join(", ")}`);
  }

  return parts.length
    ? `${ex.name} — ${parts.join(", ")}.`
    : ex.name;
}