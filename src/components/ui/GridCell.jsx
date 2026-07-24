import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Heart, MessageCircle } from "lucide-react";

export default function GridCell({ item, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    setIsTouch(mq.matches);
    const handler = (e) => setIsTouch(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <motion.div
      whileHover={isTouch ? undefined : { scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onHoverStart={isTouch ? undefined : () => setHovered(true)}
      onHoverEnd={isTouch ? undefined : () => setHovered(false)}
      onClick={onClick}
      className={`relative rounded-none overflow-hidden cursor-pointer bg-[#f5f5f7] aspect-square`}
    >
      {item.type === "reel" ? (
        <video
          src={item.src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          // No native `controls` — this is a preview thumbnail only.
          // pointer-events-none guarantees every tap/click on the tile
          // always reaches the wrapping div's onClick above.
          className="w-full h-full object-cover bg-black pointer-events-none "
        />
      ) : (
        <img
          src={item.src}
          alt={item.caption}
          className="w-full h-full object-cover block"
        />
      )}

      {/* Reel badge */}
      {item.type === "reel" && (
        <div className="absolute top-[7px] right-[7px] bg-black/55 rounded-md py-[3px] px-1.5 flex items-center gap-[3px] pointer-events-none">
          <Play size={10} fill="#fff" stroke="none" />
        </div>
      )}

      {/* Hover overlay — desktop only, see isTouch above */}
      <AnimatePresence>
        {hovered && !isTouch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/48 flex flex-col items-center justify-center gap-2 pointer-events-none"
          >
            <div className="flex gap-5">
              <span className="text-white text-sm font-bold flex items-center gap-[5px]">
                <Heart size={16} fill="#fff" stroke="none" />
                {item.likes.toLocaleString()}
              </span>
              <span className="text-white text-sm font-bold flex items-center gap-[5px]">
                <MessageCircle size={16} fill="#fff" stroke="none" />
                {item.comments}
              </span>
            </div>
            <p className="text-[11px] text-white/80 text-center px-[10px] leading-[1.4] max-w-[120px] line-clamp-2">
              {item.caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
