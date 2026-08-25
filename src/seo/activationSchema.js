// seo/activationsSchema.js
//
// Builds Schema.org Service JSON-LD from the ACTIVATIONS_ALL array.
// Same reasoning as exhibitionSchema.js and digitalSchema.js: no
// date or location fields, so `Event` schema doesn't apply. These
// are brand activation services delivered — `Service` fits, and this
// data has good material (`type`, `audience`, `highlights`) to build
// a real description from, unlike the sparser digital projects data.

/**
 * Builds an array of Service schema objects from ACTIVATIONS_ALL.
 *
 * @param {Array} activations - the ACTIVATIONS_ALL array
 * @returns {Array} array of Service schema objects, ready to pass
 *   individually to your JsonLd component
 */
export function buildActivationsSchema(activations) {
  return activations
    .filter((a) => a.title) // sanity guard
    .map((a) => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: a.title,
      description: buildDescription(a),
      serviceType: a.type?.trim() || "Brand Activation",
      provider: {
        "@type": "Organization",
        name: "AbyBaby Events",
        url: "https://abybabyevents.com",
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      image: a.image ? [a.image] : undefined,
    }));
}

function buildDescription(a) {
  const parts = [];

  if (a.type) parts.push(`a ${a.type.trim().toLowerCase()}`);
  if (a.audience) parts.push(`reaching ${a.audience} people`);
  if (a.highlights?.length) {
    parts.push(`featuring ${a.highlights.slice(0, 3).join(", ")}`);
  }

  return parts.length
    ? `${a.title} — ${parts.join(", ")}.`
    : a.title;
}