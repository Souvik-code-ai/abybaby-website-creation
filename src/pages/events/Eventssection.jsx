import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, MapPin, Users, ArrowRight, X, Send } from "lucide-react";
import logo from "../../assets/images/logo.webp";
import { EVENTS } from "../../../public/events/events";
import { Link } from "react-router-dom";
import EventHoverPanel from "../../components/ui/EventHoverPanel";
import ProgressItem from "../../components/ui/ProgressItem";
import EventHighlights from "../../components/ui/EventHighlights";

// ── Skeleton for a single event card while its image loads ──────────────────
function EventCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm">
      <div className="w-full h-[200px] bg-gray-200 animate-pulse" />
      <div className="p-4">
        <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse mb-3" />
        <div className="flex flex-col gap-2">
          <div className="h-3 w-1/2 rounded bg-gray-200 animate-pulse" />
          <div className="h-3 w-2/5 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function EventCard({ event, showType, onHover, onLeave, onClick }) {
  const [imgLoaded, setImgLoaded] = useState(false);

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
        {!imgLoaded && (
          <div className="absolute inset-0 w-full h-[200px] bg-gray-200 animate-pulse" />
        )}
        <img
          src={event.image}
          alt={event.name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full object-cover h-[200px] transition-opacity duration-300 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
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
          {event.status === "upcoming"
            ? event.name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
            : event.name}
        </h3>

        <div className="mt-3 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-gray-500 text-[13px]">
            <MapPin size={13} className="text-lime-600 flex-0 " />
            {event?.location}
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-[13px]">
            <Users size={13} className="text-lime-600 flex-0" />
            {event?.attendees.toLocaleString()} Attendance
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

// ── Registration form modal ─────────────────────────────────────────────────
// import { useState } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { X, Send } from "lucide-react";

function RegistrationModal({ event, onClose }) {
  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: digitsOnly }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!formData.email.includes("@")) {
      nextErrors.email = "Enter a valid email with an @.";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      nextErrors.phone = "Phone number must be exactly 10 digits.";
    }

    if (!formData.purpose.trim()) {
      nextErrors.purpose = "Please share your purpose.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose?.();
    setFormData({ name: "", email: "", phone: "", purpose: "" });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude, longitude);
        try {
          await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "text/plain",
            },
            body: JSON.stringify({
              ...formData,
              eventName: event?.name || "",
              latitude,
              longitude,
            }),
          });

          setSubmitting(false);
          setSubmitted(true);
          setTimeout(resetAndClose, 2000);
        } catch (error) {
          console.error(error);
          setSubmitting(false);
          setErrors((prev) => ({
            ...prev,
            purpose: "Something went wrong. Please try again shortly.",
          }));
        }
      },
      (error) => {
        console.error("Location Error:", error);

        setSubmitting(false);

        let message = "Unable to get your location.";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Please allow location permission to submit the form.";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            message = "Location request timed out. Please try again.";
            break;
        }

        setErrors((prev) => ({
          ...prev,
          purpose: message,
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  };

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={resetAndClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 28, stiffness: 380 }}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden w-[320px] border border-black/8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-br from-[#579F63] to-[#7CFC58]">
          <div>
            <div className="font-sans text-white text-lg">Let's Connect</div>
            <div className="text-white/80 text-xs">
              We'll respond within 2 hours
            </div>
          </div>
          <button
            onClick={resetAndClose}
            type="button"
            aria-label="Close registration form"
          >
            <X size={18} className="text-white" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center gap-3 py-10 px-6"
            >
              <div className="rounded-full flex items-center justify-center h-14 w-14 bg-[#579F63]/10">
                <Send size={22} className="text-[#579F63]" />
              </div>
              <div className="text-base font-semibold text-[#1a1a1a]">
                Message Sent!
              </div>
              <div className="text-[13px] text-[#8e8e93] text-center">
                Our team will get back to you soon.
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              noValidate
              className="px-5 py-4 flex flex-col gap-3"
            >
              <div className="flex flex-col gap-1">
                <input
                  id="reg-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className={`w-full rounded-xl px-4 outline-none h-[42px] bg-[#f5f5f7] text-sm border ${
                    errors.name ? "border-red-400" : "border-transparent"
                  }`}
                />
                {errors.name && (
                  <span className="text-[12px] text-red-500 px-1">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={`w-full rounded-xl px-4 outline-none h-[42px] bg-[#f5f5f7] text-sm border ${
                    errors.email ? "border-red-400" : "border-transparent"
                  }`}
                />
                {errors.email && (
                  <span className="text-[12px] text-red-500 px-1">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <input
                  id="reg-phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className={`w-full rounded-xl px-4 outline-none h-[42px] bg-[#f5f5f7] text-sm border ${
                    errors.phone ? "border-red-400" : "border-transparent"
                  }`}
                />
                {errors.phone && (
                  <span className="text-[12px] text-red-500 px-1">
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <textarea
                  id="reg-purpose"
                  name="purpose"
                  rows={3}
                  value={formData.purpose}
                  onChange={handleChange}
                  placeholder="Purpose"
                  className={`w-full rounded-xl px-4 py-3 outline-none resize-none bg-[#f5f5f7] text-sm border h-[90px] ${
                    errors.purpose ? "border-red-400" : "border-transparent"
                  }`}
                />
                {errors.purpose && (
                  <span className="text-[12px] text-red-500 px-1">
                    {errors.purpose}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl py-3 flex items-center justify-center gap-2 transition-opacity bg-gradient-to-br from-[#579F63] to-[#7CFC58] text-white font-semibold text-[15px] disabled:opacity-60"
              >
                <Send size={16} />
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

const ITEMS_PER_PAGE = 4;
// ── Root export ───────────────────────────────────────────────────────────────
export function EventsSection({ onNavigate }) {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); // ✅ tracks which card's modal is open
  const [showRegistration, setShowRegistration] = useState(false); // ✅ tracks registration form modal
  const [modalImgLoaded, setModalImgLoaded] = useState(false); // ✅ tracks the full-screen modal hero image load
  const [currentImage, setCurrentImage] = useState(0);
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
  }, [activeTab]);
  const upcoming = EVENTS.filter((e) => e.status === "upcoming");
  const expired = EVENTS.filter((e) => e.status === "expired");

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

  // Close the registration modal automatically if the parent event modal closes
  const closeEventModal = () => {
    setSelectedEvent(null);
    setShowRegistration(false);
  };

  // Reset the modal image load state whenever a new event is opened
  useEffect(() => {
    setModalImgLoaded(false);
  }, [selectedEvent]);

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
              className={`px-4 py-1.5 rounded-full transition-all text-sm md:font-medium font-sm ${activeTab === tab.key ? "bg-linear-to-r from-lime-600 to-lime-400 text-white border-none" : "bg-transparent text-[#8e8e93] border border-[#e5e5ea]"} hover:from-lime-800 hover:to-lime-600`}
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
                    ) => {
                      return (
                        <EventCard
                          key={event.id}
                          event={event}
                          showType={activeTab}
                          onHover={setHoveredEvent}
                          onLeave={() => setHoveredEvent(null)}
                          onClick={setSelectedEvent} // ✅ opens the modal for this event
                        />
                      );
                    },
                  )}
                </div>
                {hasMore ? (
                  <div
                    ref={loaderRef}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-2 mt-2"
                  >
                    {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                      <EventCardSkeleton key={`skeleton-${i}`} />
                    ))}
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
            onClick={closeEventModal}
          >
            <motion.div
              className="relative max-w-6xl w-screen sm:h-[85vh] overflow-hidden sm:rounded-3xl h-[100vh]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Skeleton — shown until the modal hero image loads ── */}
              {!modalImgLoaded && (
                <div className="absolute inset-0 bg-gray-300 animate-pulse" />
              )}

              <img
                src={selectedEvent.modalImage || selectedEvent.image}
                alt={selectedEvent.name}
                onLoad={() => setModalImgLoaded(true)}
                className={`w-full h-full sm:object-contain object-contain transition-opacity duration-300 ${
                  modalImgLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
              {/* <motion.img
                key={currentImage}
                src={selectedEvent.modalImage[currentImage]}
                alt={selectedEvent.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 w-full h-full object-contain"
              /> */}

              {/* Rest of modal content only shown once the hero image is ready */}
              {modalImgLoaded && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Title — stacked with the mobile Register button for upcoming events */}
                  <div className="absolute sm:top-8 sm:left-8 left-4 right-4 sm:right-auto top-[88vh] flex flex-col gap-1.5 sm:block">
                    <div className="sm:backdrop-blur-lg sm:bg-black/20 sm:border border-white/10 rounded-2xl sm:px-6 sm:py-2 bg-none border-0">
                      <h2 className="text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] sm:text-2xl sm:font-bold font-sans text-xl line-clamp-1 font-medium">
                        {selectedEvent.status === "upcoming"
                          ? selectedEvent.name
                              .toLowerCase()
                              .replace(/\b\w/g, (c) => c.toUpperCase())
                          : selectedEvent.name}
                      </h2>
                    </div>

                    {/* ✅ Call to action — mobile only, stacked below the title for upcoming events */}
                    {selectedEvent.status === "upcoming" && (
                      <button
                        onClick={() => setShowRegistration(true)}
                        className="sm:hidden px-5 py-3 rounded-full bg-linear-to-r from-lime-800 to-lime-600 text-white text-sm font-medium cursor-pointer w-fit"
                      >
                        Call Now
                      </button>
                    )}
                  </div>

                  {/* Location + Attendance chips — hidden on mobile for upcoming events */}
                  <div
                    className={`absolute md:top-8 sm:left-2/3 flex gap-4 sm:top-40  left-4 min-[375]:top-[88vh]  top-[94vh] sm:flex  ${
                      selectedEvent.status === "upcoming" ? "hidden" : "flex"
                    }`}
                  >
                    <div className="sm:bg-black/20 backdrop-blur-md sm:border border-white/10 rounded-xl sm:px-5 sm:py-3 sm:flex-col flex flex-row gap-0 items-center px-0 border-0 bg-none">
                      <p className="text-white/70 text-xs drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        Location
                      </p>
                      <p className="text-white sm:font-semibold font-light text-xs drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] line-clamp-1">
                        {selectedEvent.location}
                      </p>
                    </div>
                    <div className="sm:bg-black/20 backdrop-blur-md sm:border border-white/10 rounded-xl sm:px-5 sm:py-3 sm:flex-col flex flex-row gap-0 items-center px-0 border-0 bg-none">
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
                  {/* Highlights / description — conditional per event type */}
                  {(selectedEvent.features?.length > 0 ||
                    (selectedEvent.status === "upcoming" &&
                      selectedEvent?.description)) && (
                    <div
                      className={`absolute bottom-6 md:left-8 left-3.5 right-3.5 md:right-8 hidden sm:block ${
                        selectedEvent.status === "upcoming"
                          ? "max-w-md lg:max-w-2xl xl:max-w-4xl 2xl:max-w-[68rem]"
                          : "max-w-md"
                      }`}
                    >
                      <div className="bg-black/20 backdrop-blur-lg border border-white/20 rounded-2xl p-4 relative">
                        {/* ✅ Call-to-action — top-right corner of this box, upcoming events only */}
                        {selectedEvent.status === "upcoming" && (
                          <button
                            onClick={() => setShowRegistration(true)}
                            className="absolute top-3 right-4 px-5 py-2 rounded-full bg-linear-to-r from-lime-800 to-lime-600 text-white text-xs font-medium cursor-pointer hover:bg-[#245c3a] z-10"
                          >
                            Call Now
                          </button>
                        )}

                        {/* Feature bullets — any event that has them */}
                        {selectedEvent.features?.length > 0 && (
                          <>
                            <h3 className="text-white font-semibold mb-4 font-sans pr-32">
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
                          </>
                        )}

                        {/* Description — upcoming events only, expired events never show this */}
                        {selectedEvent.status === "upcoming" &&
                          selectedEvent?.description && (
                            <>
                              <h3 className="text-white font-semibold mb-2 font-sans pr-32">
                                About the Event
                              </h3>
                              <p className="text-white/80 text-xs leading-tight sm:block hidden  text-justify">
                                {selectedEvent.description}
                              </p>
                            </>
                          )}
                      </div>
                    </div>
                  )}
                </>
              )}

              <button
                onClick={closeEventModal}
                className="absolute top-3 right-3 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md text-white cursor-pointer hover:bg-black/80"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Registration form modal ── */}
      <AnimatePresence>
        {showRegistration && selectedEvent && (
          <RegistrationModal
            event={selectedEvent}
            onClose={() => setShowRegistration(false)}
          />
        )}
      </AnimatePresence>

      {/* End-of-section footer — same as feed */}
      <div className="flex flex-col items-center py-8 gap-2">
        <div className="rounded-full flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#d4456a] to-[#f9a8c9]">
          <img src={logo} alt="Krishivikas Logo" loading="lazy"/>
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
