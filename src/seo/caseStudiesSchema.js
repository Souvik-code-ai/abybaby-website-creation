// seo/caseStudiesSchema.js
//
// Builds Schema.org Article JSON-LD from the CASE_STUDIES array.
// Same reasoning as awardsSchema.js: no dedicated "case study" type
// in Schema.org, and this content is genuinely narrative/editorial
// (title, summary, written body paragraphs) — Article fits well.
//
// Differences from awardsSchema.js:
//  - `client` is mapped via `mentions`, referencing the client as an
//    Organization — a reasonable way to represent "this article is
//    about work done for X" without overclaiming a formal partnership.
//  - One entry (Sonpur Mela) has an inline video. It's included as a
//    `video` property, but note: it does NOT have an `uploadDate`,
//    which Google requires for VideoObject rich-result eligibility
//    (same issue flagged for REELS_DATA earlier). It's still valid,
//    useful markup describing the video within the article — it just
//    won't independently qualify for video-specific rich results
//    until a real upload date is added.
//  - `year` here is still just a bare string/number, not a real date
//    — same as AWARDS, so `copyrightYear` is used instead of a
//    fabricated `datePublished`.

/**
 * Builds an array of Article schema objects from CASE_STUDIES.
 *
 * @param {Array} caseStudies - the CASE_STUDIES array
 * @returns {Array} array of Article schema objects, ready to pass
 *   individually to your JsonLd component
 */
export function buildCaseStudiesSchema(caseStudies) {
  return caseStudies
    .filter((c) => c.title) // sanity guard
    .map((c) => {
      const bodyText = c.body?.map((b) => b.text).filter(Boolean).join(" ");

      const imageEntries = c.inlineImages?.filter((img) => img.type !== "video") || [];
      const videoEntries = c.inlineImages?.filter((img) => img.type === "video") || [];

      const allImages = [
        c.heroImage,
        ...imageEntries.map((img) => img.src),
      ].filter(Boolean);

      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: c.title,
        description: c.summary,
        articleBody: bodyText,
        image: allImages.length ? allImages : undefined,
        copyrightYear: c.year,
        about: c.category,
        locationCreated: c.location?.trim() || undefined,
        mentions: c.client
          ? {
              "@type": "Organization",
              name: c.client,
            }
          : undefined,
        video: videoEntries.length
          ? videoEntries.map((v) => ({
              "@type": "VideoObject",
              name: v.caption || c.title,
              contentUrl: v.src,
              thumbnailUrl: v.poster,
              // uploadDate intentionally omitted — not available in the
              // data. Add it once known; without it this video won't
              // independently qualify for Google's video rich results.
            }))
          : undefined,
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