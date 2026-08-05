import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Trophy, Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RegistrationModal } from "./RegistrationModal";
export default function EventCard({ event, onNavigate }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const handleClick = () => {
    navigate("/events");
    onNavigate?.("events"); // optional chaining in case it's undefined; match your other sections' naming convention
  };
  const handleCallNow = (e) => {
    e.stopPropagation(); // don't trigger the card's own navigate
    setShowRegistration(true);
  };
  return (
    <motion.div
      layout
      onClick={handleClick}
      onHoverStart={() => setExpanded(true)}
      onHoverEnd={() => setExpanded(false)}
      className="rounded-2xl overflow-hidden cursor-pointer bg-[var(--background)] "
    >
      {/* Expanded image */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="relative aspect-video bg-[var(--muted)]">
              <img
                src={event.eventImage}
                alt={event.eventName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-end p-3 bg-gradient-to-t from-black/55 via-transparent to-transparent [background-position:0_0] bg-[linear-gradient(to_top,rgba(0,0,0,0.55)_0%,transparent_60%)]">
                <span className="px-2 py-0.5 rounded-full bg-white/18 text-white text-[11px] backdrop-blur-[4px]  font-medium">
                  {event.eventType}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card body */}
      <div className="pt-3 pb-4 px-0">
        <div className="flex items-center gap-3 mb-3">
          <div className="rounded-full flex items-center justify-center shrink-0 overflow-hidden w-8 h-8 text-[10px] font-bold ">
            <img src={event.clientlogo} alt="" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="truncate text-[13px] font-semibold text-[var(--foreground)] ">
              {event.eventName}
            </div>
            <div className="flex items-center gap-1 mt-0.5 text-[11px] text-[var(--muted-foreground)] font-[var(--font-family-body)]">
              <MapPin size={10} />
              <span className="truncate">{event.location}</span>
            </div>
          </div>
        </div>

        {/* Expanded details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-3"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-1 text-[11px] text-[var(--accent)] font-semibold ">
                  <Calendar size={11} />
                  <span>{event.daysRemaining} days left</span>
                </div>
                <div className="flex items-center gap-1  text-[11px] text-[var(--muted-foreground)] font-[var(--font-family-body)]">
                  <Users size={11} />
                  <span>{event.attendance.toLocaleString()} attending</span>
                </div>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] leading-[1.55] font-[var(--font-family-body)] text-justify">
                {event.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={expanded ? handleCallNow : undefined}
          className={`w-full rounded-xl py-2 transition-all text-xs font-semibold  ${expanded ? "bg-[var(--accent)] text-[var(--accent-foreground)]" : "bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] text-[var(--accent)]"}`}
        >
          {expanded ? "Call Now" : "Visit Event"}
        </button>
        <RegistrationModal
          open={showRegistration}
          onClose={() => setShowRegistration(false)}
          eventName={event.eventName}
        />
      </div>
    </motion.div>
  );
}
