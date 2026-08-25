// seo/videoSchema.js
//
// Builds Schema.org VideoObject JSON-LD from the REELS_DATA array.
//
// Same pattern as eventSchema.js: only entries with a real, valid
// `uploadDate` are included, since Google requires it for VideoObject
// rich-result eligibility. As of now, REELS_DATA has no reliable
// uploadDate available — filesystem dates were identical across all
// files (a bulk-copy artifact, not real publish dates), and the video
// files aren't tracked in git history either. So this file is
// code-complete but will produce an EMPTY array until real dates are
// added to the data by whoever manages video publishing.
//
// Once real uploadDate values exist in REELS_DATA, this activates
// automatically — no code changes needed here.

/**
 * Basic validation — must be a non-empty string in YYYY-MM-DD format.
 * Doesn't try to guess or reconstruct a date; only accepts one that's
 * actually been filled in correctly.
 */
function isValidISODate(value) {
  if (!value || typeof value !== "string") return false;
  return /^\d{4}-\d{2}-\d{2}$/.test(value.trim());
}

/**
 * Builds an array of VideoObject schema objects from REELS_DATA.
 * Filters out any entry missing a real, correctly formatted
 * `uploadDate` — rather than emitting invalid/fabricated schema.
 *
 * @param {Array} reels - the REELS_DATA array
 * @returns {Array} array of VideoObject schema objects, ready to pass
 *   individually to your JsonLd component. Empty until real dates exist.
 */
export function buildVideoSchema(reels) {
  return reels
    .filter((r) => r.type === "reel" && r.src)
    .filter((r) => isValidISODate(r.uploadDate))
    .map((r) => ({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: r.caption || "AbyBaby Events video",
      description: r.caption || "AbyBaby Events video",
      contentUrl: r.src,
      thumbnailUrl: r.poster ? [r.poster] : undefined,
      uploadDate: r.uploadDate,
      publisher: {
        "@type": "Organization",
        name: "AbyBaby Events",
        url: "https://abybabyevents.com",
      },
    }));
}