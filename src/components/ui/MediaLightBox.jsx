// import { useState, useEffect, useRef } from "react";
// import { motion } from "motion/react";
// import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";
// import { Play, Pause, Volume2, VolumeX } from "lucide-react";
// import { MessageCircle } from "lucide-react";
// import { AnimatePresence } from "motion/react";
// export default function MediaLightbox({ items, startIndex, onClose }) {
//   const [idx, setIdx] = useState(startIndex);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [isMuted, setIsMuted] = useState(true);
//   useEffect(() => {
//     if (item.type === "reel" && videoRef.current) {
//       videoRef.current.currentTime = 0;
//       videoRef.current.muted = isMuted;

//       videoRef.current
//         .play()
//         .then(() => {
//           setIsPlaying(true);
//         })
//         .catch(() => {});
//     }
//   }, [idx]);
//   const videoRef = useRef(null);
//   const item = items[idx];
//   const togglePlay = () => {
//     if (!videoRef.current) return;

//     if (videoRef.current.paused) {
//       videoRef.current.play();
//       setIsPlaying(true);
//     } else {
//       videoRef.current.pause();
//       setIsPlaying(false);
//     }
//   };
//   const toggleMute = () => {
//     if (!videoRef.current) return;

//     videoRef.current.muted = !videoRef.current.muted;
//     setIsMuted(videoRef.current.muted);
//   };
//   const prev = () => setIdx((i) => Math.max(0, i - 1));
//   const next = () => setIdx((i) => Math.min(items.length - 1, i + 1));

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.18 }}
//       className="fixed inset-0 z-[9999] bg-black/[0.99] flex items-center justify-center"
//       onClick={(e) => e.target === e.currentTarget && onClose()}
//     >
//       {/* Close */}
//       <button
//         onClick={onClose}
//         aria-label="Close"
//         className="absolute top-[18px] left-[18px] w-10 h-10 rounded-full bg-white/[0.12] border border-white/20 flex items-center justify-center cursor-pointer text-white z-10"
//       >
//         <X size={18} />
//       </button>

//       {/* Category badge */}
//       <div className="bg-linear-to-r from-lime-800 via-lime-600 to-lime-400 text-white absolute top-[18px] right-[18px] z-10 rounded-[20px] px-[14px] py-1 text-[11px] font-bold tracking-[0.03em]">
//         {item.category}
//       </div>

//       {/* Prev */}
//       {idx > 0 && (
//         <button
//           onClick={prev}
//           aria-label="Previous"
//           className="absolute left-[18px] top-1/2 -translate-y-1/2 z-10 w-[42px] h-[42px] rounded-full bg-white/[0.12] border border-white/20 flex items-center justify-center cursor-pointer text-white"
//         >
//           <ChevronLeft size={20} />
//         </button>
//       )}

//       {/* Next */}
//       {idx < items.length - 1 && (
//         <button
//           onClick={next}
//           aria-label="Next"
//           className="absolute right-[18px] top-1/2 -translate-y-1/2 z-10 w-[42px] h-[42px] rounded-full bg-white/[0.12] border border-white/20 flex items-center justify-center cursor-pointer text-white"
//         >
//           <ChevronRight size={20} />
//         </button>
//       )}

//       {/* Media */}
//       <div
//         className={`relative rounded-xl overflow-hidden bg-[#111] ${
//           item.type === "reel"
//             ? "w-[min(88vw,360px)] aspect-[9/16]"
//             : "w-[min(88vw,520px)] aspect-square"
//         }`}
//       >
//         <AnimatePresence mode="wait">
//           {item.type === "reel" ? (
//             <motion.video
//               ref={videoRef}
//               key={item.id}
//               src={item.src}
//               autoPlay
//               playsInline
//               loop
//               muted={isMuted}
//               className="w-full h-full object-cover"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.18 }}
//               onPlay={() => setIsPlaying(true)}
//               onPause={() => setIsPlaying(false)}
//               onVolumeChange={() => setIsMuted(videoRef.current?.muted)}
//             />
//           ) : (
//             <motion.img
//               key={item.id}
//               src={item.src}
//               alt={item.caption}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.18 }}
//               className="w-full h-full object-cover"
//             />
//           )}
//         </AnimatePresence>

//         {/* Reel play icon */}
//         {item.type === "reel" && (
//           <div className="absolute bottom-18 right-4 flex gap-3 z-20">
//             <button
//               onClick={togglePlay}
//               className="w-10 h-10 rounded-full bg-black/55 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition"
//             >
//               {isPlaying ? (
//                 <Pause size={18} />
//               ) : (
//                 <Play size={18} fill="white" />
//               )}
//             </button>

//             <button
//               onClick={toggleMute}
//               className="w-10 h-10 rounded-full bg-black/55 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition"
//             >
//               {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
//             </button>
//           </div>
//         )}

//         {/* Bottom gradient */}
//         <div className="absolute bottom-0 left-0 right-0 h-[42%] bg-[linear-gradient(to_top,rgba(0,0,0,0.82),transparent)] pointer-events-none" />

//         {/* Caption + stats */}
//         <div className="absolute bottom-4 left-[14px] right-[14px] z-5">
//           <p className="m-0 text-[13px] text-white leading-[1.5] font-normal">
//             {item.caption}
//           </p>
//         </div>

//         {/* Dot counter */}
//         <div className="absolute top-[14px] left-0 right-0 flex justify-center gap-[5px] z-[5]">
//           {items.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setIdx(i)}
//               className={`h-1.5 rounded-[3px] border-none cursor-pointer p-0 transition-[width] duration-200 ${
//                 i === idx ? "w-[18px] bg-white" : "w-1.5 bg-white/40"
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// }
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Link2,
  Check,
} from "lucide-react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { AnimatePresence } from "motion/react";

export default function MediaLightbox({ items, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [likedIds, setLikedIds] = useState({});
  const [justCopied, setJustCopied] = useState(false);
  const copyTimeoutRef = useRef(null);

  const videoRef = useRef(null);
  const item = items[idx];

  useEffect(() => {
    if (item.type === "reel" && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = isMuted;

      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {});
    }
    // reset the "copied" state whenever the active item changes
    setJustCopied(false);
  }, [idx]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleLike = () => {
    setLikedIds((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
  };

  const copyLink = async () => {
    const link = item.src || window.location.href;

    try {
      await navigator.clipboard.writeText(link);
    } catch {
      // fallback for environments without clipboard permission
      const textarea = document.createElement("textarea");
      textarea.value = link;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
      } catch {}
      document.body.removeChild(textarea);
    }

    setJustCopied(true);
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => setJustCopied(false), 1600);
  };

  const prev = () => setIdx((i) => Math.max(0, i - 1));
  const next = () => setIdx((i) => Math.min(items.length - 1, i + 1));

  const isLiked = !!likedIds[item.id];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[9999] bg-black/[0.99] flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-[18px] left-[18px] w-10 h-10 rounded-full bg-white/[0.12] border border-white/20 flex items-center justify-center cursor-pointer text-white z-10"
      >
        <X size={18} />
      </button>

      {/* Category badge */}
      <div className="bg-linear-to-r from-lime-800 via-lime-600 to-lime-400 text-white absolute top-[18px] right-[18px] z-10 rounded-[20px] px-[14px] py-1 text-[11px] font-bold tracking-[0.03em]">
        {item.category}
      </div>

      {/* Prev */}
      {idx > 0 && (
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-[18px] top-1/2 -translate-y-1/2 z-10 w-[42px] h-[42px] rounded-full bg-white/[0.12] border border-white/20 flex items-center justify-center cursor-pointer text-white"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Next */}
      {idx < items.length - 1 && (
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-[18px] top-1/2 -translate-y-1/2 z-10 w-[42px] h-[42px] rounded-full bg-white/[0.12] border border-white/20 flex items-center justify-center cursor-pointer text-white"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Media */}
      <div
        className={`relative rounded-xl overflow-hidden bg-[#111] ${
          item.type === "reel"
            ? "w-[min(88vw,360px)] aspect-[9/16]"
            : "w-[min(88vw,520px)] aspect-square"
        }`}
      >
        <AnimatePresence mode="wait">
          {item.type === "reel" ? (
            <motion.video
              ref={videoRef}
              key={item.id}
              src={item.src}
              autoPlay
              playsInline
              loop
              muted={isMuted}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onVolumeChange={() => setIsMuted(videoRef.current?.muted)}
            />
          ) : (
            <motion.img
              key={item.id}
              src={item.src}
              alt={item.caption}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="w-full h-full object-cover"
            />
          )}
        </AnimatePresence>

        {/* Reel play/mute controls */}
        {item.type === "reel" && (
          <div className="absolute bottom-32 right-4 flex gap-3 z-20 flex-col">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-black/55 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition"
            >
              {isPlaying ? (
                <Pause size={18} />
              ) : (
                <Play size={18} fill="white" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className="w-10 h-10 rounded-full bg-black/55 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
        )}

        {/* Like + copy link actions */}
        <div className="absolute bottom-4 right-[14px] flex flex-col items-center gap-3 z-20">
          <button
            onClick={toggleLike}
            aria-label={isLiked ? "Unlike" : "Like"}
            className="w-10 h-10 rounded-full bg-black/55 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition"
          >
            <Heart
              size={18}
              className={isLiked ? "text-red-500" : "text-white"}
              fill={isLiked ? "currentColor" : "none"}
            />
          </button>

          <div className="relative">
            <button
              onClick={copyLink}
              aria-label="Copy link"
              className="w-10 h-10 rounded-full bg-black/55 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition"
            >
              {justCopied ? <Check size={18} /> : <Link2 size={18} />}
            </button>

            <AnimatePresence>
              {justCopied && (
                <motion.div
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-[46px] top-1/2 -translate-y-1/2 whitespace-nowrap bg-black/75 text-white text-[11px] font-medium px-2.5 py-1 rounded-md pointer-events-none"
                >
                  Link copied
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[42%] bg-[linear-gradient(to_top,rgba(0,0,0,0.82),transparent)] pointer-events-none" />

        {/* Caption + stats */}
        <div className="absolute bottom-4 left-[14px] right-[64px] z-5">
          <p className="m-0 text-[13px] text-white leading-[1.5] font-normal">
            {item.caption}
          </p>
        </div>

        {/* Dot counter */}
        <div className="absolute top-[14px] left-0 right-0 flex justify-center gap-[5px] z-[5]">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-[3px] border-none cursor-pointer p-0 transition-[width] duration-200 ${
                i === idx ? "w-[18px] bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
