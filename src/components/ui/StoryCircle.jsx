import { motion, AnimatePresence } from "motion/react";
import SegmentedRing from "./SegmentedRing";
import { X } from "lucide-react";
export default function StoryCircle({ client, onClick, onDismiss }) {
  const total = client.stories?.length ?? 1;
  const ITEM_W = 72;

  return (
    <div
      className={`flex flex-col items-center gap-1.5 shrink-0 relative w-[${ITEM_W}px]`}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.93 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={onClick}
        className="flex flex-col items-center gap-1.5 bg-transparent border-0 cursor-pointer p-0 w-full"
        aria-label={`View ${client.name}'s stories`}
      >
        <div className="relative w-16 h-16">
          <SegmentedRing total={total} seen={client.seen} size={64} />
          {/* White gap */}
          <div className="absolute rounded-full inset-[3px] border-[2.5px] border-white" />
          {/* Avatar */}
          <div
            className={`absolute rounded-full flex items-center justify-center overflow-hidden inset-[7px] transition-[filter] duration-200 bg-[${client.bgColor}] ${client.seen ? "filter grayscale-[0.3] opacity-70" : ""}`}
          >
            <img src={client.initials} alt={client.name} />
          </div>

          {/* X dismiss button — top-right of avatar */}
          <AnimatePresence>
            {/* {!client.seen && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDismiss(client.id);
                }}
                aria-label={`Dismiss ${client.name}'s story`}
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#8e8e93] border-2 border-white flex items-center justify-center cursor-pointer p-0 z-10"
              >
                <X size={8} color="white" strokeWidth={3} />
              </motion.button>
            )} */}
          </AnimatePresence>
        </div>

        <span
          className={`truncate w-full text-center text-[11px] leading-[1.3] transition-[color,font-weight] duration-200 ${
            client.seen
              ? "font-normal text-[#8e8e93]"
              : "font-medium text-[#1a1a1a]"
          }`}
        >
          {client.name}
        </span>
      </motion.div>
    </div>
  );
}
