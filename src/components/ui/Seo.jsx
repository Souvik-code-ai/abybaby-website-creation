import { Helmet } from "react-helmet-async";

const SITE_URL = "https://abybabyevents.com";

export function Seo({ path, title, description, noindex = false }) {
  const canonicalUrl = `${SITE_URL}${path}`;

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <link rel="canonical" href={canonicalUrl} />
      )}
    </Helmet>
  );
}