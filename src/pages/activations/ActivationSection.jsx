import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import logo from "../../assets/images/logo.jpg";
import miaCover from "../../assets/images/mia/mia3.webp";
import mallCover from "../../assets/images/zira/zira1.webp";
import rallyCover from "../../assets/images/drumtao/dt6.webp";
import tataCover from "../../assets/images/arun/aarun1.webp";
import mia1 from "../../assets/images/mia/mia 1.webp";
import mia2 from "../../assets/images/mia/mia2.webp";
import mia3 from "../../assets/images/mia/mia3.webp";
import mia4 from "../../assets/images/mia/mia 2.webp";
import mall1 from "../../assets/images/zira/zira2.webp";
import mall2 from "../../assets/images/zira/zira3.webp";
import mall3 from "../../assets/images/zira/zira4.webp";
import mall4 from "../../assets/images/zira/zira1.webp";
import rally1 from "../../assets/images/drumtao/dt2.webp";
import rally2 from "../../assets/images/drumtao/dt3.webp";
import rally3 from "../../assets/images/drumtao/dt4.webp";
import rally4 from "../../assets/images/drumtao/dt5.webp";
import rally5 from "../../assets/images/drumtao/dt6.webp";
import rally6 from "../../assets/images/drumtao/dt7.webp";
import tata1 from "../../assets/images/arun/arun2.webp";
import tata2 from "../../assets/images/arun/arun3.webp";
import tata3 from "../../assets/images/arun/arun4.webp";
import tata4 from "../../assets/images/arun/arun5.webp";
import tata5 from "../../assets/images/arun/arun6.webp";
import tata6 from "../../assets/images/arun/arun7.webp";
import { ACTIVATIONS_ALL } from "../../../public/activations/activations";
import { Link } from "react-router-dom";

// ── Skeleton for a single activation card ────────────────────────────────────
function ActivationCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm">
      <div className="w-full h-[240px] bg-gray-200 animate-pulse" />
      <div className="p-4">
        <div className="h-5 w-2/3 rounded bg-gray-200 animate-pulse mb-4" />
        <div className="flex items-center justify-between">
          <div className="h-3 w-24 rounded bg-gray-200 animate-pulse" />
          <div className="h-3 w-12 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function ActivationSection({ onNavigate }) {
  const [selectedActivation, setSelectedActivation] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sentinelRef = useRef(null);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0,
  );

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const updateHeight = () => setViewportHeight(vv.height);
    updateHeight();
    vv.addEventListener("resize", updateHeight);
    return () => vv.removeEventListener("resize", updateHeight);
  }, []);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const visibleActivations = ACTIVATIONS_ALL.slice(0, visibleCount);
  const hasMore = visibleCount < ACTIVATIONS_ALL.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 4, ACTIVATIONS_ALL.length));
      setIsLoading(false);
    }, 600);
  }, [isLoading, hasMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { rootMargin: "200px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goPrevImage = () => {
    if (!selectedActivation) return;
    setCurrentImage((prev) =>
      prev === 0 ? selectedActivation.gallery.length - 1 : prev - 1,
    );
  };

  const goNextImage = () => {
    if (!selectedActivation) return;
    setCurrentImage((prev) =>
      prev === selectedActivation.gallery.length - 1 ? 0 : prev + 1,
    );
  };

  // ── Swipe navigation for the modal gallery on mobile ──
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 40) return; // ignore small movements/taps
    if (dx < 0)
      goNextImage(); // swiped left -> next
    else goPrevImage(); // swiped right -> prev
  };

  return (
    <>
      <div className="w-full min-h-screen bg-background min-[1160px]:mx-20 min-[770px]:mx-16 mx-0">
        {/* Heading */}
        <div className="sticky top-0 z-10 px-4 pt-4 pb-3 bg-[color:var(--color-background,_#fff)]">
          <h1 className="font-semibold text-gray-900 font-sans lg:text-3xl md:text-2xl text-xl tracking-[-0.01em]">
            Activations
          </h1>
          <p className="text-gray-500 mt-0.5 text-[13px]">
            Creating immersive brand experiences and audience engagement
            campaigns
          </p>
        </div>

        {/* Cards */}
        <div className="px-2 py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleActivations.map((item, index) => (
              <motion.div
                key={item.id}
                initial={
                  index >= visibleCount - 4 ? { opacity: 0, y: 20 } : false
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: (index % 4) * 0.07 }}
                whileHover={{ y: -3 }}
                onClick={() => {
                  setSelectedActivation(item);
                  setCurrentImage(0);
                }}
                onMouseEnter={() => setHoveredProject(item)}
                onMouseLeave={() => setHoveredProject(null)}
                className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm cursor-pointer "
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full object-cover transition-transform duration-500 hover:scale-105 h-[240px]"
                  />
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-linear-to-r from-lime-800 via-lime-600 to-lime-500  text-white">
                    {item.type}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 leading-snug font-sans md:text-xl text-sm">
                    {item.title}
                  </h3>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-gray-500 text-[13px]">
                      Audiance Reach
                    </span>
                    <span className="text-lime-500 text-sm  font-semibold">
                      {item.audience}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* ── Skeleton cards while loading more ── */}
            {isLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <ActivationCardSkeleton key={`skeleton-${i}`} />
              ))}
          </div>

          {/* Desktop hover preview panel */}
          <div className="hidden xl:block w-64 2xl:w-100 fixed flex-shrink-0 right-[10vw] top-[15vh]">
            <AnimatePresence mode="wait">
              {hoveredProject && (
                <motion.div
                  key={hoveredProject.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl bg-white border border-gray-100 p-5 border-"
                >
                  <img
                    src={hoveredProject.image}
                    alt={hoveredProject.title}
                    className="w-full rounded-xl object-cover mb-4 h-[150px]"
                  />
                  <h3 className="font-semibold text-gray-900 font-sans text-sm mb-3">
                    {hoveredProject.title}
                  </h3>
                  <div className="flex gap-2 mb-4">
                    <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                      <p className="text-xs text-gray-400 mb-1">
                        Audiance Reach
                      </p>
                      <p className="text-xs font-semibold text-gray-800">
                        {hoveredProject.audience}
                      </p>
                    </div>
                  </div>
                  {/* <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">
                    Highlights
                  </p>
                  <div className="space-y-2">
                    {hoveredProject.highlights.map((h) => (
                      <div
                        key={h}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-lime-400 flex-shrink-0" />
                        {h}
                      </div>
                    ))}
                  </div> */}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Infinite scroll sentinel ── */}
        {hasMore && <div ref={sentinelRef} className="h-2" />}

        {/* Footer — only shown once all cards are loaded */}
        {!hasMore && (
          <div className="flex flex-col items-center py-8 gap-2">
            <div className="rounded-full flex items-center justify-center w-12 h-12 bg-[linear-gradient(135deg,#d4456a_0%,#f9a8c9_100%)]">
              <img src={logo} alt="" />
            </div>
            <p className="text-[13px] text-[#8e8e93] text-center">
              You've seen all activations.
            </p>
            <Link
              to={"/profile"}
              onClick={() => onNavigate("profile")}
              className="mt-0 flex items-center gap-2 font-base flex-row justify-center cursor-pointer text-[#579F63]"
            >
              Explore More
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedActivation && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center sm:p-4 w-screen p-0 h-[100svh]"
            style={{ height: viewportHeight }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedActivation(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative w-full max-w-7xl sm:h-[85vh] overflow-hidden sm:rounded-3xl h-[100svh] rounded-none "
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={selectedActivation.gallery[currentImage]}
                  alt={selectedActivation.title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />

              {/* Arrow prev — desktop only */}
              {!isMobile && (
                <button
                  onClick={goPrevImage}
                  className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 sm:w-14 sm:h-14 rounded-full z-50 bg-black/40 backdrop-blur-md text-white text-3xl items-center justify-center hover:bg-black/60 transition h-10 w-10 cursor-pointer"
                >
                  ❮
                </button>
              )}

              {/* Arrow next — desktop only */}
              {!isMobile && (
                <button
                  onClick={goNextImage}
                  className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-50 sm:w-14 sm:h-14 rounded-full bg-black/40 backdrop-blur-md text-white text-3xl items-center justify-center hover:bg-black/60 transition h-10 w-10 cursor-pointer"
                >
                  ❯
                </button>
              )}

              <div className="absolute sm:top-8 sm:left-8 left-4 bottom-8 sm:bottom-auto sm:backdrop-blur-xl sm:bg-white/10 sm:border sm:border-white/20 rounded-2xl sm:px-6 py-4 px-0">
                <span className="text-xs bg-lime-600 px-3 py-1 rounded-full text-white hidden sm:inline-block">
                  {selectedActivation.type}
                </span>
                <h2 className="text-white md:text-3xl sm:font-bold mt-3 font-sans text-md font-semibold">
                  {selectedActivation.title}
                </h2>
              </div>
              <div
                className="absolute left-4 bottom-4 flex flex-row   items-start
                md:top-8 md:right-8
                sm:top-45 sm:right-20 sm:left-auto sm:bottom-auto
                sm:flex-col sm:items-center
                sm:backdrop-blur-xl sm:bg-white/10
                sm:border sm:border-white/20
                rounded-2xl sm:px-6 py-4 px-0"
              >
                <p className="text-white sm:text-sm text-xs">Audiance Reach:</p>
                <h3 className="text-white md:text-3xl font-bold font-sans sm:text-xl text-xs">
                  {selectedActivation.audience}
                </h3>
              </div>
              {/* <div className="absolute bottom-6 md:right-10 w-[280px] backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 right-1 hidden sm:block">
                <h4 className="text-white font-semibold mb-4 font-sans">
                  Activation Highlights
                </h4>
                <div className="space-y-1">
                  {selectedActivation.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-center gap-2 text-white text-xs"
                    >
                      <span className="w-1 h-1 rounded-full bg-lime-400 text-xs " />
                      {highlight}
                    </div>
                  ))}
                </div>
              </div> */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                {selectedActivation.gallery.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`transition-all rounded-full ${currentImage === index ? "w-8 h-3 bg-white" : "w-3 h-3 bg-white/40"}`}
                  />
                ))}
              </div>
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 md:flex gap-3 hidden">
                {selectedActivation.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`overflow-hidden rounded-lg border-2 ${currentImage === index ? "border-white" : "border-white/30"}`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-20 h-14 object-cover"
                    />
                  </button>
                ))}
              </div>
              <button
                onClick={() => setSelectedActivation(null)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md text-white text-xl flex items-center justify-center cursor-pointer hover:bg-black/80"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
