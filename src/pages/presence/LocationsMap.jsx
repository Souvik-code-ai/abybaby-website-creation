import { useState, useRef, useEffect } from "react";
import { X, Mail, Phone } from "lucide-react";
import mapImage from "../../assets/images/location/locationMap.webp";
import { LOCATIONS } from "../../../public/presence/presence";

const PROJECTION = {
  xPxMin: 111,
  xPxMax: 2497,
  yPxMin: 20,
  yPxMax: 2605,
  lonMin: 68.0,
  lonMax: 97.5,
  latMax: 37.0,
  latMin: 8.0,
  imageSize: 2626,
};

function latLngToPercent(lat, lng) {
  const {
    xPxMin,
    xPxMax,
    yPxMin,
    yPxMax,
    lonMin,
    lonMax,
    latMax,
    latMin,
    imageSize,
  } = PROJECTION;

  const xPx = xPxMin + ((lng - lonMin) * (xPxMax - xPxMin)) / (lonMax - lonMin);
  const yPx = yPxMin + ((latMax - lat) * (yPxMax - yPxMin)) / (latMax - latMin);

  return {
    left: (xPx / imageSize) * 100,
    top: (yPx / imageSize) * 100,
  };
}

export function LocationsMap({ activeId: activeIdProp, onSelect } = {}) {
  const [internalActiveId, setInternalActiveId] = useState(null);
  const isControlled = activeIdProp !== undefined;
  const activeId = isControlled ? activeIdProp : internalActiveId;
  const setActiveId = onSelect ?? setInternalActiveId;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const mapWrapRef = useRef(null);
  const [mapRect, setMapRect] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const el = mapWrapRef.current;
    if (!el) return;

    const update = () => {
      setMapRect({ top: el.offsetTop, height: el.offsetHeight });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const activeLoc = LOCATIONS.find((l) => l.id === activeId);
  const activeTopPx =
    activeLoc && mapRect.height
      ? mapRect.top + (activeLoc.top / 100) * mapRect.height
      : 0;

  const activeIndex = LOCATIONS.findIndex((l) => l.id === activeId);

  const goNext = () => {
    const next = (activeIndex + 1) % LOCATIONS.length;
    setActiveId(LOCATIONS[next].id);
  };
  const goPrev = () => {
    const prev = (activeIndex - 1 + LOCATIONS.length) % LOCATIONS.length;
    setActiveId(LOCATIONS[prev].id);
  };

  // Swipe detection for the mobile story-style modal
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 40) return; // ignore small movements/taps
    if (dx < 0)
      goNext(); // swiped left -> next
    else goPrev(); // swiped right -> prev
  };

  return (
    <div className="relative w-full">
      {/* Inner wrapper: the actual map, capped at 720px and centered */}
      <div
        ref={mapWrapRef}
        className="relative w-full max-w-[720px] mx-auto select-none"
      >
        <img
          src={mapImage}
          alt="AbyBaby pan-India presence"
          className="w-full h-auto pointer-events-none"
          draggable={false}
        />

        {LOCATIONS.map((loc) => {
          const { left, top } = loc;
          const isActive = activeId === loc.id;

          return (
            <div
              key={loc.id}
              className="absolute z-[9999]"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => {
                if (!isMobile) setActiveId(loc.id);
              }}
              onClick={() => {
                if (isMobile) setActiveId(loc.id);
              }}
            >
              <div
                className={`w-7 h-7 rounded-full cursor-pointer rotate-y-90 transition-colors ${
                  isActive ? "bg-red-500/70" : "bg-red-500/40"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Desktop hover card */}
      {activeLoc && (
        <div
          className="
            hidden md:block
            absolute
            left-[-20vw]
            w-56
            bg-white
            rounded-lg
            shadow-lg
            border
            border-[#579F63]/20
            px-3
            py-2
            z-[10000]
            
          "
          style={{
            top: `${activeTopPx}px`,
            transform: "translateY(-50%)",
          }}
          onMouseEnter={() => setActiveId(activeLoc.id)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveId(null);
            }}
            className="absolute top-1 right-1 rounded-full p-0 transition"
          >
            <X size={14} className="text-gray-500 p-0.5 cursor-pointer" />
          </button>

          <img
            src={activeLoc.locationsImage}
            alt=""
            className="aspect-auto object-cover rounded-md mb-1"
          />

          <div className="flex flex-col items-start">
            <p className="font-semibold text-xs text-[#579F63]">
              {activeLoc.city}
            </p>
            <p className="text-xs text-gray-500">{activeLoc.state}</p>
            {activeLoc.address && (
              <p className="text-[11px] text-gray-400 mt-1 leading-snug">
                {activeLoc.address}
              </p>
            )}

            {activeLoc.contactNumber?.map((num, i) => (
              <div
                key={`num-${i}`}
                className="flex items-center gap-1.5 mt-1.5"
              >
                <Phone size={12} className="text-[#579F63] shrink-0" />
                <a
                  href={`tel:${num}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-[11px] text-gray-500 hover:text-[#579F63] truncate"
                >
                  {num}
                </a>
              </div>
            ))}

            {activeLoc.contactEmail?.map((email, i) => (
              <div
                key={`email-${i}`}
                className="flex items-center gap-1.5 mt-1"
              >
                <Mail size={12} className="text-[#579F63] shrink-0" />
                <a
                  href={`mailto:${email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-[11px] text-gray-500 hover:text-[#579F63] truncate"
                >
                  {email}
                </a>
              </div>
            ))}

            <button
              onClick={() =>
                window.open(
                  `https://www.google.com/maps?q=${activeLoc.lat},${activeLoc.lng}`,
                  "_blank",
                )
              }
              className="mt-2 w-full text-[11px] font-semibold text-white bg-[#579F63] rounded-md py-1.5 px-2 hover:bg-[#4a8a55] transition-colors cursor-pointer"
            >
              Go to Google Map
            </button>
          </div>
        </div>
      )}

      {/* Mobile story-viewer style modal */}
      {isMobile && activeLoc && (
        <div
          className="md:hidden fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 px-4"
          onClick={() => setActiveId(null)}
        >
          <div
            className="relative w-full max-w-[340px] bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Segmented progress bar, like Instagram stories */}
            <div className="flex gap-1 px-3 pt-3">
              {LOCATIONS.map((loc) => (
                <div
                  key={loc.id}
                  className="h-1 flex-1 rounded-full bg-gray-200 overflow-hidden"
                >
                  <div
                    className={`h-full rounded-full bg-[#579F63] transition-all ${
                      loc.id === activeLoc.id ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveId(null)}
              className="absolute top-6 right-3 z-10 rounded-full bg-black/30 p-1"
            >
              <X size={16} className="text-white" />
            </button>

            <img
              src={activeLoc.locationsImage}
              alt=""
              className="w-full h-50 object-cover mt-3"
            />

            <div className="flex flex-col items-start px-4 py-3">
              <p className="font-semibold text-sm text-[#579F63]">
                {activeLoc.city}
              </p>
              <p className="text-xs text-gray-500">{activeLoc.state}</p>
              {activeLoc.address && (
                <p className="text-xs text-gray-400 mt-1 leading-snug">
                  {activeLoc.address}
                </p>
              )}

              {activeLoc.contactNumber?.map((num, i) => (
                <div
                  key={`m-num-${i}`}
                  className="flex items-center gap-1.5 mt-2"
                >
                  <Phone size={13} className="text-[#579F63] shrink-0" />
                  <a href={`tel:${num}`} className="text-xs text-gray-600">
                    {num}
                  </a>
                </div>
              ))}

              {activeLoc.contactEmail?.map((email, i) => (
                <div
                  key={`m-email-${i}`}
                  className="flex items-center gap-1.5 mt-1"
                >
                  <Mail size={13} className="text-[#579F63] shrink-0" />
                  <a href={`mailto:${email}`} className="text-xs text-gray-600">
                    {email}
                  </a>
                </div>
              ))}

              <button
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps?q=${activeLoc.lat},${activeLoc.lng}`,
                    "_blank",
                  )
                }
                className="mt-3 w-full text-xs font-semibold text-white bg-[#579F63] rounded-md py-2 px-2"
              >
                Go to Google Map
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
