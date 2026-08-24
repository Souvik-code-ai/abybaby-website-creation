 export function buildBreadcrumbSchema(pathSegments) {
     return { "@context": "https://schema.org",
         "@type": "BreadcrumbList", 
         "itemListElement": [ { "@type": "ListItem",
             "position": 1, "name": "Home", 
             "item": "https://abybabyevents.com/" }, 
             ...pathSegments.map((seg, i) => ({ 
                "@type": "ListItem", "position": i + 2, 
                "name": seg.name, "item": seg.url })) ] }; }