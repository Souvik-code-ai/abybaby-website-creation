import { EVENTS } from "../../../public/events/events";
import ProgressItem from "./ProgressItem";
import { motion } from "motion/react";
export default function EventHighlights() {
  const featured = EVENTS.slice(0, 4);

  return (
    <div className="grid lg:grid-cols-2 gap-10 items-start">
      {/* Metrics */}
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-gray-900 font-sans text-[18px]">
            Event performance
          </h2>
          <p className="text-gray-500 mt-1 font-sans text-[13px]">
            Aggregated across all managed events
          </p>
        </div>

        {/* Stat pills */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Events managed", value: "120+" },
            { label: "Total attendees", value: "48K" },
            { label: "Cities covered", value: "22" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-3 text-center bg-lime-100 border border-[#f5e0e7]"
            >
              <p className="font-bold text-lime-600 text-[20px]">
                {stat.value}
              </p>
              <p className="text-gray-500 leading-tight mt-0.5 text-[11px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-5">
          <ProgressItem title="Client satisfaction" value={95} />
          <ProgressItem title="On-time delivery" value={92} />
          <ProgressItem title="Repeat clients" value={88} />
        </div>
      </div>

      {/* Gallery */}
      <div>
        <div className="mb-4">
          <h2 className="font-semibold text-gray-900 font-sans text-[18px]">
            Gallery
          </h2>
          <p className="text-gray-500 mt-1 font-sans text-[13px]">
            Moments from our events
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {featured.map((event) => (
            <motion.div
              key={event.id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="relative overflow-hidden rounded-xl group aspect-[4/3]"
            >
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <p className="absolute bottom-0 left-0 right-0 p-2.5 text-white font-medium leading-tight line-clamp-2 text-[12px]">
                {event.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
