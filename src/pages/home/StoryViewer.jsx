import { useEffect, useState, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
} from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Volume2, VolumeX } from "lucide-react";
import AdjacentCard from "../../components/ui/AdjacentCard";

const MAIN_WIDTH = 300;
const MAIN_HEIGHT = 500;
const ADJ_SCALE = 0.42;
const ADJ_WIDTH = 340 * ADJ_SCALE;
const GAP = 12; // matches tailwind's gap-3 (0.75rem)
const MOBILE_GAP = 16; // gap between full-size cards while swiping on mobile

// swipe tuning — tweak to taste
const SWIPE_OFFSET_THRESHOLD = 80; // px dragged before we commit to a switch
const SWIPE_VELOCITY_THRESHOLD = 500; // px/s flick speed that also commits

function getAdjacentOffset(rank) {
  // rank 0 = the card closest to the main card, rank 1 = the next one out, etc.
  return MAIN_WIDTH / 2 + GAP + ADJ_WIDTH / 2 + rank * (ADJ_WIDTH + GAP);
}

function useIsMobile(breakpoint = 640) {
  // 640px === tailwind's `sm`
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false,
  );
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

// ── Static, non-interactive full-size preview card ──────────────
// Used for the neighboring client that peeks in edge-to-edge while
// the user is mid-swipe on mobile. No progress bar / tap zones / video
// autoplay — it becomes "real" the moment the swipe commits and it
// turns into the active client.
function FullPreviewCard({ client }) {
  const story = client?.stories?.[0];
  if (!story) return null;
  const isVideo = story.type === "video";

  return (
    <div
      className="relative overflow-hidden flex flex-col bg-black shrink-0"
      style={{ width: MAIN_WIDTH, height: MAIN_HEIGHT }}
    >
      {isVideo ? (
        <video
          src={story.url}
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <img
          src={story.url}
          alt={client.name}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      )}

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.4)_0%,transparent_30%,rgba(0,0,0,0.3)_100%)]" />

      <div className="absolute top-8 left-3 right-3 flex items-center gap-2 z-10">
        <div className="rounded-full flex items-center justify-center overflow-hidden bg-white border-white border-2 h-[34px] w-[34px]">
          <img src={client.initials} alt="" />
        </div>
        <div>
          <div className="text-white text-[13px] font-semibold">
            {client.name}
          </div>
          <div className="text-white/70 text-[11px]">{client.category}</div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 z-10">
        <span className="bg-gradient-to-r from-lime-800 to-lime-600 text-white rounded-2xl px-2 py-1 text-xs">
          {client.location}
        </span>
      </div>
    </div>
  );
}

// ✅ default `clients = []` so .findIndex never runs on undefined
export function StoryViewer({ clients = [], activeClientId, onClose, onSeen }) {
  const [currentClientId, setCurrentClientId] = useState(activeClientId);
  const [storyIndex, setStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const isMobile = useIsMobile();

  // ── swipe state ──────────────────────────────────────────────
  const dragX = useMotionValue(0);
  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const currentIndex = clients.findIndex((c) => c.id === currentClientId);
  const currentClient = clients[currentIndex];
  // ✅ optional chaining so these never throw even if currentClient is missing
  const totalStories = currentClient?.stories?.length ?? 0;
  const story = currentClient?.stories?.[storyIndex];
  const isVideo = story?.type === "video";

  const goNext = useCallback(() => {
    if (storyIndex < totalStories - 1) {
      setStoryIndex((i) => i + 1);
      setProgress(0);
    } else if (currentIndex < clients.length - 1) {
      setCurrentClientId(clients[currentIndex + 1].id);
      setStoryIndex(0);
      setProgress(0);
    } else {
      onClose();
    }
  }, [storyIndex, totalStories, currentIndex, clients, onClose]);

  const goPrev = useCallback(() => {
    if (storyIndex > 0) {
      setStoryIndex((i) => i - 1);
      setProgress(0);
    } else if (currentIndex > 0) {
      setCurrentClientId(clients[currentIndex - 1].id);
      setStoryIndex(0);
      setProgress(0);
    }
  }, [storyIndex, currentIndex, clients]);

  // ── switch directly to the next/prev *client* (used by swipe) ──
  const goNextClient = useCallback(() => {
    if (currentIndex < clients.length - 1) {
      setCurrentClientId(clients[currentIndex + 1].id);
      setStoryIndex(0);
      setProgress(0);
      return true;
    }
    return false;
  }, [currentIndex, clients]);

  const goPrevClient = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentClientId(clients[currentIndex - 1].id);
      setStoryIndex(0);
      setProgress(0);
      return true;
    }
    return false;
  }, [currentIndex, clients]);

  // ✅ Mark the currently-open client as seen the moment it becomes active
  useEffect(() => {
    if (currentClientId) {
      onSeen?.(currentClientId);
    }
  }, [currentClientId, onSeen]);

  useEffect(() => {
    if (!isVideo || !videoRef.current) return;

    const video = videoRef.current;

    const updateProgress = () => {
      if (!video.duration) return;
      if (isDraggingRef.current) return;
      setProgress((video.currentTime / video.duration) * 100);
    };

    const handleEnded = () => {
      if (isDraggingRef.current) return;
      goNext();
    };

    video.currentTime = 0;
    video.play().catch(() => {});

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("ended", handleEnded);
    };
  }, [storyIndex, currentClientId, isVideo, goNext]);

  useEffect(() => {
    if (isVideo) return;

    setProgress(0);

    const interval = setInterval(() => {
      if (isDraggingRef.current) return; // ⏸ pause auto-advance while swiping
      setProgress((p) => {
        if (p >= 100) return 100;
        return p + 2.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [storyIndex, currentClientId, isVideo]);

  useEffect(() => {
    if (isVideo) return;

    if (progress >= 100) {
      goNext();
      setProgress(0);
    }
  }, [progress, goNext, isVideo]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, goNext, goPrev]);

  // ── drag handlers (mobile swipe between clients) ────────────────
  const handleDragStart = () => {
    isDraggingRef.current = true;
    setIsDragging(true);
  };

  const handleDragEnd = (_e, info) => {
    const { offset, velocity } = info;
    const committedLeft =
      offset.x < -SWIPE_OFFSET_THRESHOLD || velocity.x < -SWIPE_VELOCITY_THRESHOLD;
    const committedRight =
      offset.x > SWIPE_OFFSET_THRESHOLD || velocity.x > SWIPE_VELOCITY_THRESHOLD;

    if (committedLeft) goNextClient();
    else if (committedRight) goPrevClient();

    // Snap back to center. Whether or not we switched, the new/current
    // client is centered at x=0, so this always resolves to a clean snap.
    animate(dragX, 0, { type: "spring", stiffness: 400, damping: 40 });

    isDraggingRef.current = false;
    setIsDragging(false);
  };

  // ✅ single guard, placed AFTER every hook has run — safe to bail out now
  if (!clients.length || !currentClient || !story) return null;

  // Desktop: small stacked peek cards, up to 2 each side.
  const prevClients = clients.slice(
    Math.max(0, currentIndex - 2),
    currentIndex,
  );
  const nextClients = clients.slice(currentIndex + 1, currentIndex + 3);

  // Mobile: only the immediate neighbor each side, rendered full-size.
  const mobilePrevClient = currentIndex > 0 ? clients[currentIndex - 1] : null;
  const mobileNextClient =
    currentIndex < clients.length - 1 ? clients[currentIndex + 1] : null;

  // ── The interactive main card, shared by both mobile & desktop layouts ──
  const mainCard = (
    <motion.div
      layoutId={`story-${currentClient.id}`}
      className="relative sm:rounded-2xl overflow-hidden flex flex-col bg-black shrink-0 rounded-none"
      style={{ width: MAIN_WIDTH, height: MAIN_HEIGHT }}
    >
      {/* Progress bars */}
      <div className="absolute top-3 left-3 right-3 flex gap-1 z-10">
        {currentClient.stories.map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-full overflow-hidden h-0.5 bg-white/35"
          >
            <div
              className="h-full rounded-full bg-white transition-none"
              style={{
                width:
                  i < storyIndex ? "100%" : i === storyIndex ? `${progress}%` : "0%",
              }}
            />
          </div>
        ))}
      </div>

      {/* Header overlay */}
      <div className="absolute top-8 left-3 right-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="rounded-full flex items-center justify-center overflow-hidden bg-white border-white border-2 h-[34px] w-[34px]">
            <img src={currentClient.initials} alt="" />
          </div>
          <div>
            <div className="text-white text-[13px] font-semibold">
              {currentClient.name}
            </div>
            <div className="text-white/70 text-[11px]">
              {currentClient.category}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isVideo && (
            <button
              onClick={() => setMuted((m) => !m)}
              className="text-white cursor-pointer"
            >
              {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          )}

          <button onClick={onClose} className="text-white cursor-pointer">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Story media */}
      {isVideo ? (
        <video
          ref={videoRef}
          src={story.url}
          autoPlay
          muted={muted}
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <img
          src={story.url}
          alt={currentClient.name}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.4)_0%,transparent_30%,rgba(0,0,0,0.3)_100%)]" />

      {/* Location caption */}
      {story.caption && (
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <p className="text-white text-sm text-center">{story.caption}</p>
        </div>
      )}
      <div className="absolute bottom-4 left-4 z-10">
        <span className="bg-gradient-to-r from-lime-800 to-lime-600 text-white rounded-2xl px-2 py-1 text-xs">
          {currentClient.location}
        </span>
      </div>

      {/* Tap areas — disabled mid-drag so a swipe doesn't also fire a tap */}
      {!isDragging && (
        <div className="absolute inset-0 flex">
          <div className="flex-1 cursor-pointer" onClick={goPrev} />
          <div className="flex-1 cursor-pointer" onClick={goNext} />
        </div>
      )}
    </motion.div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black"
        onClick={onClose}
      >
        {isMobile ? (
          // ── Mobile: edge-to-edge drag track, full-size neighbor cards ──
          <motion.div
            className="absolute inset-0 flex items-center justify-center touch-pan-y"
            onClick={(e) => e.stopPropagation()}
            drag="x"
            style={{ x: dragX }}
            dragElastic={0.5}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div
              className="relative"
              style={{ width: MAIN_WIDTH, height: MAIN_HEIGHT }}
            >
              {mobilePrevClient && (
                <div
                  className="absolute top-0"
                  style={{ left: -(MAIN_WIDTH + MOBILE_GAP) }}
                >
                  <FullPreviewCard client={mobilePrevClient} />
                </div>
              )}

              {mainCard}

              {mobileNextClient && (
                <div
                  className="absolute top-0"
                  style={{ left: MAIN_WIDTH + MOBILE_GAP }}
                >
                  <FullPreviewCard client={mobileNextClient} />
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          // ── Desktop: unchanged small stacked peek cards ──
          <div className="absolute inset-0" onClick={(e) => e.stopPropagation()}>
            {/* Prev adjacent cards (closest to main card = rank 0) */}
            {prevClients.map((client, j) => {
              const rank = prevClients.length - 1 - j;
              const offset = getAdjacentOffset(rank);
              return (
                <div
                  key={client.id}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `calc(50% - ${offset}px)` }}
                >
                  <AdjacentCard
                    client={client}
                    scale={ADJ_SCALE}
                    opacity={0.4}
                    onClick={() => {
                      setCurrentClientId(client.id);
                      setStoryIndex(0);
                      setProgress(0);
                    }}
                  />
                </div>
              );
            })}

            {/* Main story card — always exactly centered */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {mainCard}
            </div>

            {/* Next adjacent cards (closest to main card = rank 0) */}
            {nextClients.map((client, j) => {
              const offset = getAdjacentOffset(j);
              return (
                <div
                  key={client.id}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `calc(50% + ${offset}px)` }}
                >
                  <AdjacentCard
                    client={client}
                    scale={ADJ_SCALE}
                    opacity={0.4}
                    onClick={() => {
                      setCurrentClientId(client.id);
                      setStoryIndex(0);
                      setProgress(0);
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Side navigation — desktop/tablet only, hidden below `sm` */}
        {currentIndex > 0 && (
          <button
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 items-center justify-center rounded-full w-10 h-10 bg-white/15 text-white"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
          >
            <ChevronLeft size={20} />
          </button>
        )}
        {currentIndex < clients.length - 1 && (
          <button
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 items-center justify-center rounded-full w-10 h-10 bg-white/15 text-white"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
          >
            <ChevronRight size={20} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}