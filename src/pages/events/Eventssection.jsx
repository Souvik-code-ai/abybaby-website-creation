import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import logo from "../../assets/images/logo.jpg";
import { EVENTS } from "../../../public/events/events";
import { Link } from "react-router-dom";
import EventHoverPanel from "../../components/ui/EventHoverPanel";
import ProgressItem from "../../components/ui/ProgressItem";
import EventHighlights from "../../components/ui/EventHighlights";

function EventCard({ event, showType, onHover, onLeave, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm cursor-pointer"
      onMouseEnter={() => onHover?.(event)}
      onMouseLeave={() => onLeave?.()}
      onClick={() => onClick?.(event)}
    >
      {/* Image */}
      <div className="relative">
        <img
          src={event.image}
          alt={event.name}
          className="w-full object-cover h-[200px]"
        />
        {showType && (
          <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-linear-to-r from-lime-800 to-lime-600  text-[11px] text-white ">
            {event.type}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 leading-snug line-clamp-1 font-sans text-[15px]">
          {event.name}
        </h3>

        <div className="mt-3 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-gray-500 text-[13px]">
            <MapPin size={13} className="text-lime-600 flex-0" />
            {event.location}
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-[13px]">
            <Users size={13} className="text-lime-600 flex-0" />
            {event.attendees.toLocaleString()} Attendance
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState({ label }) {
  return (
    <div className="flex flex-col items-center py-16 gap-3">
      <div className="rounded-full flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#d4456a] to-[#f9a8c9]">
        <Calendar size={22} color="#fff" />
      </div>
      <p className="text-gray-500 text-center text-[14px]">
        No {label} events at the moment.
      </p>
    </div>
  );
}
const ITEMS_PER_PAGE = 2;
// ── Root export ───────────────────────────────────────────────────────────────
export function EventsSection({ onNavigate }) {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); // ✅ tracks which card's modal is open
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE); // ✅ tracks how many to show
  const observerInstanceRef = useRef(null);
  const TABS = [
    { key: "upcoming", label: "Upcoming" },
    { key: "expired", label: "Past events" },
  ];

  const [activeTab, setActiveTab] = useState("upcoming");
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeTab]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // use "auto" for instant jump
    });
  }, []);
  const upcoming = EVENTS.filter((e) => e.status === "upcoming");
  const expired = EVENTS.filter((e) => e.status === "expired");

  // ✅ Callback ref instead of useRef + useEffect([activeTab]).
  // AnimatePresence (mode="wait") unmounts the previous tab's loader div
  // (firing this with node=null) before the new tab's loader div mounts
  // (firing this again with the new node). A plain useEffect tied to
  // [activeTab] can run *before* that new node exists, silently skipping
  // observer.observe() and leaving infinite scroll permanently broken
  // until the tab is changed again. A callback ref can't race like that —
  // it only ever fires when the DOM node itself actually mounts/unmounts.
  const loaderRef = useCallback((node) => {
    if (observerInstanceRef.current) {
      observerInstanceRef.current.disconnect();
      observerInstanceRef.current = null;
    }

    if (!node) return;

    observerInstanceRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );

    observerInstanceRef.current.observe(node);
  }, []);

  const currentList = activeTab === "upcoming" ? upcoming : expired;
  const visibleEvents = currentList.slice(0, visibleCount); // ✅ sliced list
  const hasMore = visibleCount < currentList.length;
  return (
    <div className="w-full min-h-screen bg-background min-[1160px]:mx-20 min-[770px]:mx-16 mx-0">
      {/* Page header — matches ProfileView / other section headings */}
      <div className="sticky top-0 z-10 px-4 pt-4 pb-3 bg-[var(--color-background,#fff)]">
        <h1 className="font-semibold text-gray-900 font-sans lg:text-3xl md:text-2xl text-xl var(--font-family-body) tracking-[-0.01em]">
          Events
        </h1>
        <p className="text-gray-500 mt-0.5 text-[13px]">
          Explore our latest events and achievements
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mt-3">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-1.5 rounded-full transition-all text-sm md:font-medium font-sm ${activeTab === tab.key ? "bg-[#2C7048] text-white border-none" : "bg-transparent text-[#8e8e93] border border-[#e5e5ea]"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="px-2 py-5"
        >
          {(activeTab === "upcoming" || activeTab === "expired") &&
            (visibleEvents.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-2">
                  {visibleEvents.map(
                    (
                      event, // ✅ visibleEvents instead of full list
                    ) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        showType={activeTab === "upcoming"}
                        onHover={setHoveredEvent}
                        onLeave={() => setHoveredEvent(null)}
                        onClick={setSelectedEvent} // ✅ opens the modal for this event
                      />
                    ),
                  )}
                </div>
                {hasMore ? (
                  <div ref={loaderRef} className="flex justify-center py-6">
                    <div className="w-6 h-6 rounded-full border-2 border-lime-600 border-t-transparent animate-spin" />
                  </div>
                ) : (
                  <p className="text-center text-gray-400 text-sm py-6"></p>
                )}
                <EventHoverPanel hoveredEvent={hoveredEvent} />
              </>
            ) : (
              <EmptyState
                label={activeTab === "upcoming" ? "upcoming" : "past"}
              />
            ))}
        </motion.div>
      </AnimatePresence>

      {/* ── Full-screen event modal — mirrors ExhibitionSection's modal ── */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md sm:p-6 p-0 w-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="relative max-w-6xl w-screen sm:h-[85vh] overflow-hidden sm:rounded-3xl h-[100vh]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedEvent.modalImage || selectedEvent.image}
                alt={selectedEvent.name}
                className="w-full h-full sm:object-cover object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Title */}
              <div className="absolute sm:top-8 sm:left-8 left-4 top-[90vh]">
                <div className="sm:backdrop-blur-lg sm:bg-black/40 sm:border border-white/10 rounded-2xl sm:px-6 sm:py-4 bg-none border-0">
                  <h2 className="text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] sm:text-3xl font-bold font-sans text-xl">
                    {selectedEvent.name}
                  </h2>
                </div>
              </div>

              {/* Location + Attendance chips */}
              <div className="absolute md:top-8 sm:left-2/3 flex gap-4 sm:top-40 left-4 min-[375]:top-[88vh] top-[94vh]">
                <div className="sm:bg-black/40 backdrop-blur-md sm:border border-white/10 rounded-xl sm:px-5 sm:py-3 sm:flex-col flex flex-row gap-1 items-center px-0 border-0 bg-none">
                  <p className="text-white/70 text-xs drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    Location
                  </p>
                  <p className="text-white sm:font-semibold font-light text-xs drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    {selectedEvent.location}
                  </p>
                </div>
                <div className="sm:bg-black/40 backdrop-blur-md sm:border border-white/10 rounded-xl sm:px-5 sm:py-3 sm:flex-col flex flex-row gap-1 items-center px-0 border-0 bg-none">
                  <p className="text-white/70 text-xs drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    Attendance
                  </p>
                  <p className="text-white sm:font-semibold font-light text-xs drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    {selectedEvent.attendees?.toLocaleString?.() ??
                      selectedEvent.attendees}
                  </p>
                </div>
              </div>

              {/* Highlights / features */}
              {selectedEvent.features?.length > 0 && (
                <div className="absolute bottom-8 md:left-8 max-w-md left-3.5 hidden sm:block">
                  <div className="bg-black/40 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                    <h3 className="text-white font-semibold mb-4 font-sans">
                      Event Highlights
                    </h3>
                    <div className="space-y-3">
                      {selectedEvent.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3 text-white/90"
                        >
                          <span className="text-lime-400">●</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-3 right-3 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md text-white cursor-pointer hover:bg-black/80"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* End-of-section footer — same as feed */}
      <div className="flex flex-col items-center py-8 gap-2">
        <div className="rounded-full flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#d4456a] to-[#f9a8c9]">
          <img src={logo} alt="" />
        </div>
        <p className="text-[13px] text-[#8e8e93] text-center">
          You've seen all recent events.
          <br />
        </p>
        <Link
          to={"/digital"}
          className="mt-0 flex items-center gap-2 font-base flex-row justify-center cursor-pointer text-[#579F63]"
        >
          Explore More
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
