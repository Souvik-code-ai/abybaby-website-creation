// seo/eventSchema.js
//
// Builds Schema.org Event JSON-LD from the EVENTS data array.
// Only events that are genuinely upcoming AND have a real, parseable
// date are included — Google requires a valid startDate, and marking
// up expired or "TBD" events as Event schema violates their guidelines
// (and can trigger Search Console warnings / lost eligibility).

/**
 * Attempts to convert a raw date string into ISO format (YYYY-MM-DD).
 * Your current EVENTS data has inconsistent formats ("12 Oct 2026",
 * "2nd dec", "TBD") — this handles the parseable ones and safely
 * returns null for anything it can't confidently convert, rather than
 * emitting an invalid date into the schema.
 */
function toISODate(rawDate) {
  if (!rawDate || rawDate.trim().toUpperCase() === "TBD") return null;

  const parsed = new Date(rawDate);
  if (isNaN(parsed.getTime())) return null;

  return parsed.toISOString().split("T")[0];
}

/**
 * Builds an array of Event schema objects from your EVENTS data.
 * Filters out:
 *  - status === "expired"  (Google doesn't want past events marked
 *    up as scheduled/upcoming)
 *  - events with no real date (e.g. "TBD", "2nd dec" with no year)
 *
 * @param {Array} events - the EVENTS array
 * @returns {Array} array of valid Event schema objects, ready to
 *   pass individually to your JsonLd component
 */
export function buildEventSchema(events) {
  return events
    .filter((e) => e.status !== "expired")
    .map((e) => {
      const startDate = toISODate(e.date);
      if (!startDate) return null; // skip anything without a real date

      return {
        "@context": "https://schema.org",
        "@type": "Event",
        name: e.name,
        startDate,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: e.location,
          address: {
            "@type": "PostalAddress",
            addressLocality: e.location,
            addressCountry: "IN",
          },
        },
        image: e.image ? [e.image] : undefined,
        description: e.description || e.name,
        organizer: {
          "@type": "Organization",
          name: "AbyBaby Events",
          url: "https://abybabyevents.com",
        },
      };
    })
    .filter(Boolean); // drop the nulls from events with no valid date
}