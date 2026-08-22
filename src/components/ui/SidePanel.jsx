import { useState } from "react";
import FullscreenModal from "./FullScreenModal";
import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Phone,
  Mail,
  MapPin,
  Recycle,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Building2,
  ExternalLink,
} from "lucide-react";
import logo from "../../assets/images/download.webp";

import { LOCATIONS } from "../../../public/presence/presence";
export default function SidePanel({ setOpen, onNavigate }) {
  function getMapSrc(lat, lng, zoom = 13) {
    return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
  }

  const [selectedId, setSelectedId] = useState(1);
  // inside SidePanel, add this state
  const [flipped, setFlipped] = useState(false);
  const [fullscreenLoc, setFullscreenLoc] = useState(null);
  const [carouselOffset, setCarouselOffset] = useState(0);
  const [mapKey, setMapKey] = useState(1);

  const trackRef = useRef(null);
  const outerRef = useRef(null);

  const selectedLoc = LOCATIONS.find((l) => l.id === selectedId);

  const getMaxOffset = () => {
    if (!trackRef.current || !outerRef.current) return 0;
    return Math.max(
      0,
      trackRef.current.scrollWidth - outerRef.current.clientWidth + 32,
    );
  };

  const scrollCarousel = (dir) => {
    setCarouselOffset((prev) =>
      Math.max(0, Math.min(getMaxOffset(), prev + dir * 240)),
    );
  };

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${carouselOffset}px)`;
    }
  }, [carouselOffset]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && !fullscreenLoc) {
        setOpen(false);
        onNavigate("Home");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setOpen, fullscreenLoc, onNavigate]);

  const selectLocation = (id) => {
    if (id === selectedId) return;
    setSelectedId(id);
    setMapKey(id); // triggers AnimatePresence remount → scale animation

    const btn = document.getElementById(`locbtn-${id}`);
    if (btn && outerRef.current && trackRef.current) {
      const btnLeft = btn.offsetLeft;
      const btnRight = btnLeft + btn.offsetWidth;
      const viewLeft = carouselOffset;
      const viewRight = carouselOffset + outerRef.current.clientWidth - 32;
      let newOffset = carouselOffset;
      if (btnLeft < viewLeft) newOffset = Math.max(0, btnLeft - 16);
      else if (btnRight > viewRight) newOffset = btnLeft - 16;
      newOffset = Math.max(0, Math.min(getMaxOffset(), newOffset));
      setCarouselOffset(newOffset);
    }
  };

  const openMaps = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${selectedLoc.lat},${selectedLoc.lng}`,
      "_blank",
    );
  };

  const atStart = carouselOffset <= 0;
  const atEnd = carouselOffset >= getMaxOffset();
  const [active, setActive] = useState(null);

  const toggle = (type) => setActive((prev) => (prev === type ? null : type));
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-black/40 z-40"
      />

      {/* Slide-in panel */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 h-full z-50 flex flex-col bg-background border-r border-border ${
          window.innerWidth < 640 ? "w-screen" : "w-[400px]"
        }`}
      >
        <div className="flex flex-row justify-center items-center ">
          <div className=" perspective-[1000px] w-[370px] h-[290px] m-6">
            <div
              className={`relative h-full w-full duration-700 [transform-style:preserve-3d] transition-transform ${
                flipped ? "[transform:rotateY(180deg)]" : "" // ✅ flipped state controls rotation
              }`}
            >
              {/* Front */}
              <div
                className="
        absolute
        inset-0
        bg-white
        rounded-2xl
        shadow-lg
        [backface-visibility:hidden]
        overflow-hidden
      "
              >
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white shadow-md border border-lime-200 flex items-center justify-center hover:bg-gray-100 transition-all cursor-pointer z-50"
                >
                  <X size={20} className="text-gray-700" />
                </button>
                {/* Top-left Accent */}
                <div className="absolute top-0 left-0">
                  <div className="w-16 h-16 bg-lime-600 clip-triangle"></div>
                  <div className="absolute top-0 left-6 w-16 h-16 bg-lime-400 clip-triangle"></div>
                </div>
                {/* <button
            onClick={() => setOpen(false)}
            className="mt-0.5 w-8 h-8 rounded-full flex items-center justify-center border border-border hover:bg-secondary transition-colors flex-shrink-0 cursor-pointer "
          >
            <X size={15} />
          </button> */}

                {/* Logo */}
                <div className="absolute top-5 right-5 text-right">
                  <img src={logo} alt="logo" className="h-12 ml-auto w-12" />
                </div>

                {/* Name Section */}
                <div className="pt-16 px-4">
                  <h2 className="text-xl font-bold text-gray-900 font-sans">
                    GET IN TOUCH
                  </h2>

                  <div className="mt-2 w-56 h-[2px] bg-lime-600"></div>
                </div>

                {/* Contact Section */}
                <div className="grid grid-cols-1 gap-y-4 px-4 mt-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-700" />
                    <div className="flex flex-col text-xs">
                      <span>+91 9830974955 </span>
                      <span>+91 9830832000</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-green-700 " />
                    <div className="flex flex-col text-xs">
                      <span>sucheta@abybaby.co.in</span>
                      <span> shaw.vijay@abybaby.co.in</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 ">
                    <MapPin className="w-4 h-4 text-green-700 mt-0.5" />
                    <span className="text-xs">
                      4B,Rani Bhabani Road,Kalighat,Kolkata 700026
                    </span>
                  </div>
                </div>

                {/* Bottom Logos */}
                {/* <div className="absolute bottom-7 left-0 right-0 flex justify-center gap-4 px-6">
            <img src={partner1} className="h-6" />
            <img src={partner2} className="h-6" />
            <img src={partner3} className="h-6" />
            <img src={partner4} className="h-6" />
          </div> */}

                {/* Bottom Tricolor Stripes */}
                <div className="absolute bottom-0 left-0 w-full">
                  <div className="h-[3px] bg-lime-400"></div>
                  <div className="h-[3px] bg-white"></div>
                  <div className="h-[3px] bg-lime-600"></div>
                </div>

                {/* Bottom-right Accent */}
                <div className="absolute bottom-0 right-0">
                  <div className="w-20 h-20 border-b-[20px] border-r-[20px] border-lime-600 border-l-transparent border-t-transparent"></div>
                </div>
                <button
                  onClick={() => setFlipped(true)}
                  className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white shadow-md border border-lime-200 flex items-center justify-center hover:bg-gray-100 transition-all cursor-pointer z-50"
                >
                  <Recycle size={20} className="text-gray-700" />
                </button>
              </div>

              {/* Back */}
              <div
                className="
        absolute
        inset-0
        rounded-md
        bg-lime-600
        text-white
        flex flex-col items-center justify-center
        [transform:rotateY(180deg)]
        [backface-visibility:hidden]
      "
              >
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white shadow-md border border-lime-200 flex items-center justify-center hover:bg-gray-100 transition-all cursor-pointer z-50"
                >
                  <X size={20} className="text-gray-700" />
                </button>
                <img src={logo} className="h-16 mb-4 rounded-full" />

                <h3 className="text-xl font-bold font-sans">
                  ABYBABY EVENTS PVT LTD
                </h3>
                <button
                  onClick={() => setFlipped(false)}
                  className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white shadow-md border border-lime-200 flex items-center justify-center hover:bg-gray-100 transition-all cursor-pointer z-50"
                >
                  <Recycle size={20} className="text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="
        absolute
        top-44
        left-1/2
        -translate-x-1/2
        z-50
        w-[90%]
        max-w-[320px]
      "
            >
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl border">
                {/* Magazine Cover */}
                <div className=" relative">
                  <button
                    onClick={() => setActive(null)}
                    className="absolute right-3 top-3 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-black cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5">
                  {active === "address" && (
                    <>
                      <p className="text-xs uppercase tracking-widest text-[#48752C] font-semibold">
                        Head Office
                      </p>

                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        6B, Janak Rd, Lake Market,
                        <br />
                        Kalighat,
                        <br />
                        Kolkata - 700029
                        <br />
                        West Bengal
                      </p>
                    </>
                  )}

                  {active === "email" && (
                    <>
                      <p className="text-xs uppercase tracking-widest text-[#48752C] font-semibold">
                        Email Us
                      </p>

                      <div className="mt-3 space-y-2">
                        <a
                          href="mailto:sucheta@abybaby.co.in"
                          className="block text-sm text-gray-600 hover:text-[#48752C]"
                        >
                          sucheta@abybaby.co.in
                        </a>

                        <a
                          href="mailto:shaw.vijay@abybaby.co.in"
                          className="block text-sm text-gray-600 hover:text-[#48752C]"
                        >
                          shaw.vijay@abybaby.co.in
                        </a>
                      </div>
                    </>
                  )}

                  {active === "phone" && (
                    <>
                      <p className="text-xs uppercase tracking-widest text-[#48752C] font-semibold">
                        Call Us
                      </p>

                      <div className="mt-3 space-y-2">
                        <a
                          href="tel:+919830832000"
                          className="block text-sm text-gray-600 hover:text-[#48752C]"
                        >
                          +91 98308 32000
                        </a>

                        <a
                          href="tel:+919830974955"
                          className="block text-sm text-gray-600 hover:text-[#48752C]"
                        >
                          +91 98309 74955
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          {/* Horizontal Carousel */}
          <div className="relative flex-shrink-0 border-b border-border py-3 bg-background">
            <button
              onClick={() => scrollCarousel(-1)}
              disabled={atStart}
              className={`absolute left-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full border border-border bg-background flex items-center justify-center text-foreground  cursor-pointer hover:border-primary hover:text-primary transition-all ${
                atStart ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <ChevronLeft size={14} />
            </button>

            <div ref={outerRef} className="overflow-hidden">
              <div
                ref={trackRef}
                className="flex gap-2 px-4 transition-transform duration-300 will-change-transform"
              >
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    id={`locbtn-${loc.id}`}
                    onClick={() => selectLocation(loc.id)}
                    className={`flex-shrink-0 flex flex-col overflow-hidden items-center gap-1 h-15 w-20 rounded-xl border transition-all duration-300 ${
                      selectedId === loc.id
                        ? "bg-[#2C7048] border-[#2C7048] text-white shadow-md"
                        : "border-gray-200 bg-white text-gray-700 hover:border-[#2C7048] hover:bg-[#f4faf6] hover:text-[#2C7048]"
                    }`}
                  >
                    <img
                      src={loc.locationsImage}
                      alt=""
                      className="h-full w-full"
                    />
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => scrollCarousel(1)}
              disabled={atEnd}
              className={`absolute right-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full border border-border bg-background flex items-center justify-center cursor-pointer text-foreground  hover:border-primary hover:text-primary transition-all ${
                atEnd ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Animated Map */}
          <div className="px-4 pt-4 pb-2 flex-shrink-0">
            <div className="relative rounded-2xl overflow-hidden bg-muted h-52">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mapKey}
                  initial={{ scale: 0.88, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.06, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  <iframe
                    src={getMapSrc(selectedLoc.lat, selectedLoc.lng)}
                    className="w-full h-full border-none pointer-events-none"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Fullscreen hint overlay */}
              <button
                onClick={() => setFullscreenLoc(selectedLoc)}
                className="absolute bottom-2 right-2 z-10 flex items-center gap-1 bg-black/60 hover:bg-black/80 text-white text-[10px] px-2 py-1 rounded-lg transition-colors"
              >
                <Maximize2 size={10} /> Full screen
              </button>
            </div>
          </div>

          {/* Selected location info */}
          <div className="px-4 pb-4 flex-shrink-0">
            <div className="bg-secondary border border-border rounded-2xl px-4 py-3 flex items-start gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Building2 size={14} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-tight">
                  {selectedLoc.city}
                </p>
                <p className="text-[10px] text-primary font-medium mb-1">
                  {selectedLoc.state}
                </p>
                <div className="flex items-start gap-1">
                  <MapPin
                    size={11}
                    className="text-muted-foreground flex-shrink-0 mt-0.5"
                  />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {selectedLoc.address}
                  </p>
                </div>
              </div>
              <button
                onClick={openMaps}
                className="flex items-center gap-1 text-[10px] px-2.5 py-1.5 rounded-lg border border-border bg-background hover:bg-primary/10 hover:border-primary hover:text-primary transition-all flex-shrink-0"
              >
                <ExternalLink size={10} /> Maps
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Map Modal */}
      {fullscreenLoc && (
        <FullscreenModal
          loc={fullscreenLoc}
          onClose={() => setFullscreenLoc(null)}
        />
      )}
    </>
  );
}
