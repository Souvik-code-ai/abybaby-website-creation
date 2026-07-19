import { useState, useRef, useCallback } from "react";
import { useMotionValue, AnimatePresence, motion } from "motion/react";
import StoryCircle from "./StoryCircle";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { animate } from "motion/react";
export default function DesktopCarousel({ clients, onStoryClick, onDismiss }) {
  const VISIBLE_DESKTOP = 6;
  const ITEM_W = 72;
  const ITEM_GAP = 18;
  const [offset, setOffset] = useState(0);
  const x = useMotionValue(0);
  const dragStartX = useRef(0);
  const canPrev = offset > 0;
  const canNext = offset + VISIBLE_DESKTOP < clients.length;
  const itemStride = ITEM_W + ITEM_GAP;

  const slideTo = useCallback(
    (newOffset) => {
      setOffset(newOffset);
      animate(x, -newOffset * itemStride, {
        type: "spring",
        stiffness: 220,
        damping: 26,
      });
    },
    [x, itemStride],
  );

  return (
    <div className="flex items-center justify-center py-4 ">
      <div
        className={`relative flex items-center w-[${VISIBLE_DESKTOP * itemStride - ITEM_GAP}px]`}
      >
        {/* Prev */}
        <AnimatePresence>
          {canPrev && (
            <motion.button
              key="prev"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              onClick={() => slideTo(Math.max(0, offset - 1))}
              className="absolute z-10 flex items-center justify-center rounded-full bg-white cursor-pointer w-7 h-7 -left-[14px] top-[calc(50%-16px)] -translate-y-1/2 shadow-[0_1px_6px_rgba(0,0,0,0.15)] border-[0.5px] border-[#e0e0e0]"
              aria-label="Previous"
            >
              <ChevronLeft size={14} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Track */}
        <div className="overflow-hidden w-full py-0.5">
          <motion.div
            className={`flex gap-[${ITEM_GAP}px]`}
            style={{ x }}
            drag="x"
            dragConstraints={{
              left: -(clients.length - VISIBLE_DESKTOP) * itemStride,
              right: 0,
            }}
            dragElastic={0.08}
            onDragStart={(_, info) => {
              dragStartX.current = info.point.x;
            }}
            onDragEnd={(_, info) => {
              const dx = info.offset.x;
              if (dx < -40 && canNext) slideTo(offset + 1);
              else if (dx > 40 && canPrev) slideTo(offset - 1);
              else slideTo(offset);
            }}
          >
            {clients.map((client) => (
              <StoryCircle
                key={client.id}
                client={client}
                onClick={() => onStoryClick(client)}
                onDismiss={onDismiss}
              />
            ))}
          </motion.div>
        </div>

        {/* Next */}
        <AnimatePresence>
          {canNext && (
            <motion.button
              key="next"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              onClick={() =>
                slideTo(Math.min(clients.length - VISIBLE_DESKTOP, offset + 1))
              }
              className="absolute z-10 flex items-center justify-center rounded-full bg-white cursor-pointer w-7 h-7 -right-[14px] top-[calc(50%-16px)] -translate-y-1/2 shadow-[0_1px_6px_rgba(0,0,0,0.15)] border-[0.5px] border-[#e0e0e0]"
              aria-label="Next"
            >
              <ChevronRight size={14} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
