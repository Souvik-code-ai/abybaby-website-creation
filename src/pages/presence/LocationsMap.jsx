import { useState, useRef, useEffect } from "react";
import { X, Mail, User } from "lucide-react";
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

  const mapWrapRef = useRef(null);
  const [mapRect, setMapRect] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const el = mapWrapRef.current;
    if (!el) return;

    const update = () => {
      // Position of the map wrapper relative to its offsetParent (the outer relative div)
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

  return (
    // Outer wrapper: full width, this is the positioning context for the side cards
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
              onMouseEnter={() => setActiveId(loc.id)}
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

      {/* Left white-space card: image + address */}
      {/* Left white-space card: image + address */}
      {activeLoc && (
        <div
          className="
      hidden md:block
      absolute
      left-[-20vw]
      w-48
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
            <X size={14} className="text-gray-500 p-0.5" />
          </button>

          <img
            src={activeLoc.locationsImage}
            alt=""
            className="max-h-20 w-full object-cover rounded-md mb-1"
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

      {/* Right white-space card: contact info */}
      {activeLoc &&
        (activeLoc.contactName ||
          activeLoc.contactEmail ||
          activeLoc.contactPost) && (
          <div
            className="
              hidden md:block
              absolute
           
              w-48
              bg-white
              rounded-lg
              shadow-lg
              border
              border-[#579F63]/20
              px-3
              py-2
              z-[10000]
              right-[-20vw] top-[-10vh]
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
              <X size={14} className="text-gray-500 p-0.5" />
            </button>
            {activeLoc.contactName && (
              <div className="flex items-center gap-1.5 mb-1">
                <User size={12} className="text-[#579F63] shrink-0" />
                <p className="text-xs font-semibold text-gray-700">
                  {activeLoc.contactName}
                </p>
              </div>
            )}
            {activeLoc.contactPost && (
              <p className="text-[11px] text-gray-400 mb-1 pl-[18px]">
                {activeLoc.contactPost}
              </p>
            )}
            {activeLoc.contactEmail && (
              <div className="flex items-center gap-1.5">
                <Mail size={12} className="text-[#579F63] shrink-0" />
                <a
                  href={`mailto:${activeLoc.contactEmail}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-[11px] text-gray-500 hover:text-[#579F63] truncate"
                >
                  {activeLoc.contactEmail}
                </a>
              </div>
            )}
          </div>
        )}
    </div>
  );
}
