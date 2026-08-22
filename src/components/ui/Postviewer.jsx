import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Heart,
  MessageCircle,
  Link2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Maximize2,
} from "lucide-react";
import { toast } from "sonner";

export function PostViewer({ post, onClose }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showHeart, setShowHeart] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [captionExpanded, setCaptionExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);

  const isVideo = (src) => /\.(mp4|webm|ogg|mov)(\?|$)/i.test(src);

  const currentMedia = post.media[imageIndex];
  const currentSrc = currentMedia.url;
  const isCurrentVideo = currentMedia.type === "video";
  const multipleMedia = post.media.length > 1;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && imageIndex > 0) setImageIndex((i) => i - 1);
      if (e.key === "ArrowRight" && imageIndex < post.media.length - 1)
        setImageIndex((i) => i + 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [imageIndex, onClose, post.media.length]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleLike = () => {
    setLiked((prev) => {
      setLikeCount((c) => (prev ? c - 1 : c + 1));
      return !prev;
    });
    if (!liked) {
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 900);
    }
  };

  const handleDoubleClick = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount((c) => c + 1);
    }
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 900);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(post.projectUrl).catch(() => {});
    toast.success("Project link copied!", { duration: 2000 });
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying((p) => !p);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
    }
    setMuted((m) => !m);
  };

  // ── Swipe navigation for mobile (story-viewer style) ──
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (!multipleMedia) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 40) return; // ignore small movements/taps
    if (dx < 0 && imageIndex < post.media.length - 1) {
      setImageIndex((i) => i + 1); // swiped left -> next
    } else if (dx > 0 && imageIndex > 0) {
      setImageIndex((i) => i - 1); // swiped right -> prev
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed  inset-0 z-[9999] bg-black flex items-center justify-center "
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* ── Close button — top left ── */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/12 border border-white/20 flex items-center justify-center cursor-pointer text-white"
        >
          <X size={20} strokeWidth={2} />
        </motion.button>

        {/* ── Arrow prev — desktop only ── */}
        <AnimatePresence>
          {!isMobile && multipleMedia && imageIndex > 0 && (
            <motion.button
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setImageIndex((i) => i - 1)}
              aria-label="Previous"
              className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/14 border border-white/20 items-center justify-center cursor-pointer text-white"
            >
              <ChevronLeft size={22} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* ── Arrow next — desktop only ── */}
        <AnimatePresence>
          {!isMobile && multipleMedia && imageIndex < post.media.length - 1 && (
            <motion.button
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setImageIndex((i) => i + 1)}
              aria-label="Next"
              className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/14 border border-white/20 items-center justify-center cursor-pointer text-white"
            >
              <ChevronRight size={22} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* ── Media ── */}
        <div
          className="relative w-[min(90vw,560px)] aspect-square rounded-[18px] overflow-hidden"
          onDoubleClick={handleDoubleClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            {isCurrentVideo ? (
              <motion.video
                key={currentSrc}
                ref={videoRef}
                src={currentSrc}
                autoPlay
                loop
                muted={muted}
                playsInline
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 w-full h-full object-contain"
              />
            ) : (
              <motion.img
                key={currentSrc}
                src={currentSrc}
                alt={post.caption.slice(0, 40)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </AnimatePresence>

          {/* Double-tap heart */}
          <AnimatePresence>
            {showHeart && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1.4, opacity: 1 }}
                exit={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <Heart size={90} fill="#fff" stroke="none" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dot indicators */}
          {multipleMedia && (
            <div className="absolute bottom-[80px] left-0 right-0 flex justify-center gap-1.5 z-[4]">
              {post.media.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImageIndex(i)}
                  className={`h-1.5 rounded-[3px] border-none cursor-pointer p-0 transition-[width] duration-200 ${i === imageIndex ? "w-5 bg-white" : "w-1.5 bg-white/45"}`}
                />
              ))}
            </div>
          )}

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-black/82 to-transparent pointer-events-none z-[3]" />

          {/* ── Bottom left: logo + name + type ── */}
          <div className="fixed sm:absolute bottom-4 left-4 z-[5] flex items-center sm:gap-2.5 gap-1.5">
            {/* Avatar */}
            <div
              className={`overflow-hidden w-[42px] h-[42px] rounded-full flex items-center justify-center flex-shrink-0 border-2 border-white/30 bg-[${post.client.bgColor}]`}
            >
              <img
                src={post.client.initials}
                alt={post.name}
                className="w-full h-full"
              />
            </div>

            {/* Name + type */}
            <div>
              <p className="m-0 text-sm sm:font-bold text-white leading-tight [text-shadow:0_1px_4px_rgba(0,0,0,0.5)] line-clamp-1 font-medium">
                {post.name}
              </p>
              <p className="m-0 text-xs text-white/72 flex items-center gap-[3px]">
                <MapPin
                  size={11}
                  className="flex-shrink-0 text-[#f9a8c9] sm:block hidden"
                />
                {post.location} · {post.client.category}
              </p>
            </div>
          </div>

          {/* ── Bottom right: media action buttons ── */}
          <div className="absolute bottom-4 right-4 z-[5] flex flex-col items-center gap-3.5">
            {/* Like */}
            <motion.button
              whileTap={{ scale: 0.82 }}
              onClick={handleLike}
              aria-label="Like"
              className="bg-none border-none cursor-pointer p-0 flex flex-col items-center gap-[3px]"
            >
              <motion.div
                animate={{ scale: liked ? [1, 1.4, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  size={28}
                  fill={liked ? "#d4456a" : "none"}
                  stroke={liked ? "#d4456a" : "#fff"}
                  strokeWidth={liked ? 0 : 2}
                />
              </motion.div>
              <span className="text-[11px] text-white leading-none">
                {likeCount}
              </span>
            </motion.button>

            {/* Copy link */}
            <motion.button
              whileTap={{ scale: 0.82 }}
              onClick={handleCopy}
              aria-label="Copy link"
              className="bg-none border-none cursor-pointer p-0"
            >
              <Link2 size={26} stroke="#fff" strokeWidth={2} />
            </motion.button>

            {/* Video controls — shown only for video */}
            {isCurrentVideo && (
              <>
                <motion.button
                  whileTap={{ scale: 0.82 }}
                  onClick={togglePlay}
                  aria-label={playing ? "Pause" : "Play"}
                  className="bg-none border-none cursor-pointer p-0"
                >
                  {playing ? (
                    <Pause size={26} stroke="#fff" strokeWidth={2} />
                  ) : (
                    <Play size={26} stroke="#fff" strokeWidth={2} />
                  )}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.82 }}
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute" : "Mute"}
                  className="bg-none border-none cursor-pointer p-0"
                >
                  {muted ? (
                    <VolumeX size={26} stroke="#fff" strokeWidth={2} />
                  ) : (
                    <Volume2 size={26} stroke="#fff" strokeWidth={2} />
                  )}
                </motion.button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
