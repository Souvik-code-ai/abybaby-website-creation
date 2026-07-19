import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import logo from "../../../public/assets/images/download.jpg";
import email from "../../../public/assets/images/email.webp";
import addressLogo from "../../../public/assets/images/address_logo.jpg";
import phone from "../../../public/assets/images/phone.webp";
import { Globe, Recycle } from "lucide-react";
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
} from "lucide-react";
import { LocationsMap } from "./LocationsMap";
// ---------- FullscreenModal ----------

import FullscreenModal from "../../components/ui/FullScreenModal";

// ---------- SidePanel ----------

import SidePanel from "../../components/ui/SidePanel";

// ---------- PresenceSection ----------

export function PresenceSection({ onNavigate, open, setOpen }) {
  const [activeId, setActiveId] = useState(null);
  return (
    <div className="flex flex-col pb-12 px-4 pt-4 w-[100%] min-[1160px]:mx-50 min-[770px]:mx-16 mx-0">
      {/* Back button */}
      <Link
        to="/"
        className="mt-0 flex items-center gap-2 font-base flex-row justify-start cursor-pointer px-2 text-[#579F63]"
      >
        <ArrowLeft size={16} />
        Return back
      </Link>

      {/* Hero */}
      <div className="flex flex-col items-start px-4 pt-8 pb-6">
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
      <div className="px-4 mb-10  ">
        <LocationsMap activeId={activeId} onSelect={setActiveId} />
      </div>

      {/* Location cards */}
    </div>
  );
}
