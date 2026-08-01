import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  MessageCircle,
  Link2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Volume2,
  VolumeX,
} from "lucide-react";
import { toast } from "sonner";
import { CommentModal } from "../common/CommentModal";
import { PostViewer } from "../../components/ui/Postviewer";

export function FeedCard({ post }) {
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [captionExpanded, setCaptionExpanded] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [commentOpen, setCommentOpen] = useState(false);
  const [showMiniProfile, setShowMiniProfile] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [inViewport, setInViewport] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const touchStartX = useRef(0);
  const justSwiped = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
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

  const multipleImages = post.media.length > 1;
  const currentMedia = post.media[imageIndex];

  // ── Track whether this card is visible in the viewport ──
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInViewport(entry.isIntersecting);
      },
      {
        threshold: 0.6, // card is considered "in view" once 60% visible
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // ── Play / pause video based on viewport visibility ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video || currentMedia.type !== "video") return;

    // Never autoplay while the fullscreen viewer is open —
    // PostViewer handles playback in that context.
    if (viewerOpen) {
      video.pause();
      return;
    }

    if (inViewport) {
      video.currentTime = 0; // always restart from the beginning on entry
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inViewport, viewerOpen, currentMedia.type, imageIndex]);

  const handleCopy = () => {
    navigator.clipboard.writeText(post.projectUrl).catch(() => {});
    toast.success("Thanks to show interest!", { duration: 2000 });
  };

  // ── Swipe navigation for mobile (image carousel within the card) ──
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    justSwiped.current = false;
  };
  const handleTouchEnd = (e) => {
    if (!multipleImages) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 40) return; // ignore small movements/taps
    justSwiped.current = true;
    if (dx < 0 && imageIndex < post.media.length - 1) {
      setImageIndex((i) => i + 1); // swiped left -> next
    } else if (dx > 0 && imageIndex > 0) {
      setImageIndex((i) => i - 1); // swiped right -> prev
    }
  };

  return (
    <>
      <article
        ref={containerRef}
        className="bg-white rounded-2xl overflow-hidden w-full max-w-[500px] mx-auto"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-0 py-3 relative"
          onMouseEnter={() => setShowMiniProfile(true)}
          onMouseLeave={() => setShowMiniProfile(false)}
        >
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="rounded-full flex items-center justify-center shrink-0 overflow-hidden w-[42px] h-[42px]">
              <img
                src={post.client?.initials}
                alt=""
                className="rounded-full"
              />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#1a1a1a] line-clamp-1">
                {post.name}
              </div>
              <div className="flex items-center gap-1 text-[#8e8e93] text-xs">
                <MapPin size={11} />
                <span>{post.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Media — click opens fullscreen viewer */}
        <div
          className="relative overflow-hidden rounded-md cursor-pointer bg-[#f5f5f7] aspect-square"
          onDoubleClick={handleDoubleClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() => {
            // Don't open the fullscreen viewer right after a swipe gesture
            if (justSwiped.current) {
              justSwiped.current = false;
              return;
            }
            if (videoRef.current) {
              videoRef.current.pause();
            }
            setViewerOpen(true);
          }}
        >
          <AnimatePresence mode="wait">
            {currentMedia.type === "video" ? (
              <motion.video
                ref={videoRef}
                key={imageIndex}
                src={currentMedia.url}
                poster={currentMedia.poster}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                muted={muted}
                loop
                playsInline
                // no `autoPlay` — playback is now fully controlled by the
                // viewport-visibility effect above
              />
            ) : (
              <motion.img
                key={imageIndex}
                src={currentMedia.url}
                alt={post.caption.slice(0, 40)}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            )}
          </AnimatePresence>
          {currentMedia.type === "video" && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMuted((prev) => !prev);
              }}
              className="absolute bottom-3 right-3 z-10 rounded-full flex items-center justify-center w-8 h-8 bg-[rgba(0,0,0,0.45)] backdrop-blur-[6px] text-white"
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          )}
          {/* Category tag overlay */}
          {post?.category && (
            <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-linear-to-r from-lime-800 to-lime-600 text-white backdrop-blur-[6px] text-[11px] font-semibold tracking-[0.02em]">
              {post?.category}
            </div>
          )}

          <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-full flex items-center gap-1.5 opacity-0 group-hover:opacity-100 bg-[rgba(0,0,0,0.45)] backdrop-blur-[6px] text-[11px] text-white" />

          {/* Double-tap heart */}
          <AnimatePresence>
            {showHeart && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1.4, opacity: 1 }}
                exit={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <Heart
                  size={80}
                  fill="#fff"
                  stroke="none"
                  className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Media navigation — desktop only */}
          {multipleImages && (
            <>
              {!isMobile && imageIndex > 0 && (
                <button
                  className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 rounded-full items-center justify-center w-7 h-7 bg-white/85 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageIndex((i) => i - 1);
                  }}
                >
                  <ChevronLeft size={14} />
                </button>
              )}
              {!isMobile && imageIndex < post.media.length - 1 && (
                <button
                  className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 rounded-full items-center justify-center w-7 h-7 bg-[rgba(255,255,255,0.85)] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageIndex((i) => i + 1);
                  }}
                >
                  <ChevronRight size={14} />
                </button>
              )}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                {post.media.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-200 h-[6px] ${
                      i === imageIndex
                        ? "w-[18px] bg-white"
                        : "w-[6px] bg-[rgba(255,255,255,0.5)]"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="px-0 pt-3 pb-1 flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleLike}
            className={`flex items-center gap-1.5 ${liked ? "text-[#d4456a]" : "text-[#1a1a1a]"}`}
          >
            <motion.div
              animate={{ scale: liked ? [1, 1.4, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart
                size={24}
                fill={liked ? "#d4456a" : "none"}
                strokeWidth={liked ? 0 : 1.8}
                className="hover:scale-110 cursor-pointer"
              />
            </motion.div>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleCopy}
            className="text-[#1a1a1a]"
          >
            <Link2
              size={22}
              strokeWidth={1.8}
              className="cursor-pointer hover:scale-110"
            />
          </motion.button>
        </div>

        {/* Caption */}
        <div className="px-0 pb-4">
          {/* <span className="text-sm font-semibold mr-1.5">{post.name}</span> */}
          <span
            className={`text-sm text-[#1a1a1a] ${captionExpanded ? "line-clamp-none overflow-visible text-justify" : "line-clamp-2 overflow-hidden text-justify"}`}
          >
            {post?.caption}
          </span>
          {!captionExpanded ? (
            <button
              onClick={() => setCaptionExpanded(true)}
              className="text-[13px] text-[var(--muted-foreground)] font-[var(--font-family-body)] bg-none border-none p-0 cursor-pointer mt-0.2"
            >
              read more
            </button>
          ) : (
            <button
              onClick={() => setCaptionExpanded(false)}
              className="text-[13px] text-[var(--muted-foreground)] font-[var(--font-family-body)] bg-none border-none p-0 cursor-pointer mt-0.5 block"
            >
              read less
            </button>
          )}
        </div>
      </article>

      {/* Fullscreen viewer */}
      <AnimatePresence>
        {viewerOpen && (
          <PostViewer post={post} onClose={() => setViewerOpen(false)} />
        )}
      </AnimatePresence>

      <CommentModal
        isOpen={commentOpen}
        onClose={() => setCommentOpen(false)}
        comments={post.comments}
        postTitle={post.client.name}
      />
    </>
  );
}
