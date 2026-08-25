// seo/awardsSchema.js
//
// Builds Schema.org Article JSON-LD from the AWARDS array.
//
// Schema.org has no dedicated "Award" type. The two real options are:
//  1. Organization.award (plain text) — thin, no room for narrative/images
//  2. Article — since each entry has a title, summary, and written body
//     paragraphs, it genuinely reads as editorial content, which is
//     the better fit here and lets images/category come through too.
//
// NOTE on dates: `year` in this data is a bare number (2026, 2024),
// not a real date. Article's `datePublished` expects a full date, so
// rather than fabricate a fake month/day, this uses `copyrightYear`
// instead, which is meant for year-only precision. If a real
// publish/award date becomes available later, switch to datePublished.

/**
 * Builds an array of Article schema objects from the AWARDS array.
 *
 * @param {Array} awards - the AWARDS array
 * @returns {Array} array of Article schema objects, ready to pass
 *   individually to your JsonLd component
 */
export function buildAwardsSchema(awards) {
  return awards
    .filter((a) => a.title) // sanity guard
    .map((a) => {
      const bodyText = a.body?.map((b) => b.text).filter(Boolean).join(" ");
      const allImages = [
        a.heroImage,
        ...(a.inlineImages?.map((img) => img.src) || []),
      ].filter(Boolean);

      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: a.title,
        description: a.summary,
        articleBody: bodyText,
        image: allImages.length ? allImages : undefined,
        copyrightYear: a.year,
        about: a.category,
        locationCreated: a.location?.trim() || undefined,
        author: {
          "@type": "Organization",
          name: "AbyBaby Events",
          url: "https://abybabyevents.com",
        },
        publisher: {
          "@type": "Organization",
          name: "AbyBaby Events",
          url: "https://abybabyevents.com",
        },
      };
    });
}