import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Canonical = () => {
  const location = useLocation();

  useEffect(() => {
    const baseUrl = "https://abybabyevents.com";

    let canonical = document.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute(
      "href",
      `${baseUrl}${location.pathname}`
    );
  }, [location.pathname]);

  return null;
};

export default Canonical;