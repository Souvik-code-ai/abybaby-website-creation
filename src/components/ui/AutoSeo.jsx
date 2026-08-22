import { useLocation } from "react-router-dom";
import { Seo } from "./Seo";
import { SEO_CONFIG } from "../seoConfig";

export function AutoSeo() {
  const { pathname } = useLocation();
  const config = SEO_CONFIG[pathname];

  // No entry for this path — surfaces missing SEO config during dev/testing
  // instead of silently reusing whatever the previous page set.
  if (!config) {
    if (import.meta.env.DEV) {
      console.warn(`[AutoSeo] No SEO config found for path: ${pathname}`);
    }
    return null;
  }

  return (
    <Seo
      path={pathname}
      title={config.title}
      description={config.description}
      noindex={config.noindex}
    />
  );
}