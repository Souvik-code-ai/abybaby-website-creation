import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import JsonLd from "../../components/JsonLd";
import { buildBreadcrumbSchema } from "../../seo/breadcrumbSchema";
import logo from "../../assets/images/logo.webp";
import email from "../../assets/images/email.webp";
import addressLogo from "../../assets/images/address_logo.webp";
import phone from "../../assets/images/phone.webp";
import { Globe, Recycle } from "lucide-react";
import { buildLocationsSchema } from "../../seo/locationsSchema";
import { LOCATIONS } from "../../../public/presence/presence";
import { Link } from "react-router-dom";


import {
  MapPin,
  Building2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  X,
  Phone,
  Mail,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { LocationsMap } from "./LocationsMap";
// ---------- FullscreenModal ----------

import FullscreenModal from "../../components/ui/FullScreenModal";

// ---------- SidePanel ----------

import SidePanel from "../../components/ui/SidePanel";

// ---------- PresenceSection ----------

export function PresenceSection({ onNavigate, open, setOpen }) {
  const [activeId, setActiveId] = useState(null);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
const locationSchemas = buildLocationsSchema(LOCATIONS);
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([
              { name: "Presence", url: "https://abybabyevents.com/presence" }
            ])} />
      {locationSchemas.map((schema, i) => (
  <JsonLd key={i} data={schema} />
))}  
    <div className="flex flex-col pb-12 px-4 pt-4 w-[100%] min-[1160px]:mx-50 min-[770px]:mx-16 mx-0 ">
      {/* Back button */}
      <Link
        to="/"
        className="mt-0 flex items-center gap-2 font-base flex-row justify-start cursor-pointer px-2 text-[#579F63]"
      >
        <ArrowLeft size={16} />
        Return back
      </Link>

      {/* Hero */}
      <div className="flex flex-col items-start px-4 pt-4 pb-6">
        <div className="inline-block rounded-full mb-3 bg-[rgba(87,159,99,0.12)] text-[#3d7a4a] text-[11px] font-semibold px-3 py-[3px]">
          Our Presence
        </div>
        <h1 className="font-[family-name:var(--font-family-body)] text-[color:var(--foreground)] text-[22px] font-bold m-0 mb-3 leading-[1.3]">
          A pan-India footprint,{" "}
          <span className="text-[#579F63]">built to serve every market</span>
        </h1>
        <p className="text-sm text-[color:var(--muted-foreground)] max-w-[560px]">
          From concerts and MICE & conferences to BTL activation, exhibitions,
          and digital campaigns — our teams operate close to the ground in every
          region we serve.
        </p>
      </div>

      {/* Map Display*/}
      <div className="px-4 ">
        <LocationsMap activeId={activeId} onSelect={setActiveId} />
      </div>
      <div className="flex flex-col items-center py-8 gap-2">
        <div className="rounded-full flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#d4456a] to-[#f9a8c9]">
          <img src={logo} alt="Krishivikas Logo" loading="lazy"/>
        </div>
        <p className="text-[13px] text-[#8e8e93] text-center">
          You've seen all recent presence.
          <br />
        </p>
        <Link
          to={"/profile"}
          className="mt-0 flex items-center gap-2 font-base flex-row justify-center cursor-pointer text-[#579F63]"
        >
          Explore More
          <ArrowRight size={16} />
        </Link>
      </div>
      {/*here is a large gap at the end of presence section why? */}
      {/* Location cards */}
    </div>
    </>
  );
}
//
