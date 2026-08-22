import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.webp";
import { DIGITAL_PROJECTS_ALL } from "../../../public/digital/digital";

export function DigitalSection({ onNavigate }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sentinelRef = useRef(null);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0,
  );

  // ── Full data pool — add more entries here to extend the list

  const visibleProjects = DIGITAL_PROJECTS_ALL.slice(0, visibleCount);
  const hasMore = visibleCount < DIGITAL_PROJECTS_ALL.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(prev + 3, DIGITAL_PROJECTS_ALL.length),
      );
      setIsLoading(false);
    }, 600);
  }, [isLoading, hasMore]);

  // Watch sentinel div — fires loadMore when it enters the viewport
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

  // Lock body scroll while the modal is open, restoring scroll position on close
  useEffect(() => {
    if (selectedProject) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [selectedProject]);

  // Track visual viewport height so the modal sizes correctly on mobile
  // (keyboard open/close, browser chrome collapsing, etc.)
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

  // ── Modal gallery navigation ──
  const goPrevImage = () => {
    if (!selectedProject) return;
    setCurrentImage((prev) =>
      prev === 0 ? selectedProject.modalImage.length - 1 : prev - 1,
    );
  };

  const goNextImage = () => {
    if (!selectedProject) return;
    setCurrentImage((prev) =>
      prev === selectedProject.modalImage.length - 1 ? 0 : prev + 1,
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
    if (dx < 0) goNextImage();
    else goPrevImage();
  };

  return (
    <>
      <div className="w-full min-h-screen bg-background min-[1160px]:mx-20 min-[770px]:mx-16 mx-0">
        {/* Header */}
        <div className="sticky top-0 z-10 px-4 pt-4 pb-4 bg-[color:var(--color-background,_#fff)]">
          <h1 className="font-semibold text-gray-900 font-sans lg:text-3xl md:text-2xl text-xl tracking-[-0.01em]">
            Digital Solutions
          </h1>
          <p className="text-gray-500 mt-1 text-[13px]">
            Showcasing digital campaigns, websites, analytics and engagement
            solutions.
          </p>
        </div>

        {/* Cards */}
        <div className="px-2 py-5">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-5 ">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={
                  index >= visibleCount - 3 ? { opacity: 0, y: 20 } : false
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: (index % 3) * 0.08 }}
                whileHover={{ y: -3 }}
                onClick={() => {
                  setSelectedProject(project);
                  setCurrentImage(0);
                }}
                className="overflow-hidden rounded-2xl bg-white shadow-sm cursor-pointer border border-[#f0f0f5] min-h-[350px] "
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full object-cover transition-transform duration-500 hover:scale-105  h-full "
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Infinite scroll sentinel & spinner ── */}
        {hasMore && (
          <div
            ref={sentinelRef}
            className="flex justify-center items-center py-8"
          >
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-7 h-7 rounded-full border-2 border-gray-200 border-t-lime-500 animate-spin [animation-duration:0.7s]" />
                <p className="text-xs text-[#aaa]">Loading more…</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </motion.div>
            )}
          </div>
        )}

        {/* Footer — only shown once all cards are loaded */}
        {!hasMore && (
          <div className="flex flex-col items-center py-8 gap-2">
            <div className="rounded-full flex items-center justify-center w-12 h-12 bg-[linear-gradient(135deg,#65A30D_0%,#A3E635_100%)]">
              <img src={logo} alt="Krishivikas logo " loading="lazy"/>
            </div>
            <p className="text-[13px] text-[#8e8e93] text-center">
              You've explored all digital projects.
            </p>
            <Link
              to="/exhibition"
              onClick={() => onNavigate("exhibition")}
              className="mt-0 flex items-center gap-2 font-base flex-row justify-center cursor-pointer text-[#579F63]"
            >
              Explore More
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>

      {/* Modal — carousel like ActivationSection */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md sm:p-6 p-0 w-screen h-[100svh]"
            style={{ height: viewportHeight }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="relative max-w-6xl w-screen sm:h-[85vh] overflow-hidden sm:rounded-3xl h-[100svh] isolate bg-black/95"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={selectedProject.modalImage[currentImage]}
                  alt={selectedProject.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Arrow prev — desktop only, only when multiple images */}
              {!isMobile && selectedProject.modalImage.length > 1 && (
                <button
                  onClick={goPrevImage}
                  className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 sm:w-14 sm:h-14 rounded-full z-50 bg-black/40 backdrop-blur-md text-white text-3xl items-center justify-center hover:bg-black/60 transition cursor-pointer"
                >
                  ❮
                </button>
              )}

              {/* Arrow next — desktop only, only when multiple images */}
              {!isMobile && selectedProject.modalImage.length > 1 && (
                <button
                  onClick={goNextImage}
                  className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-50 sm:w-14 sm:h-14 rounded-full bg-black/40 backdrop-blur-md text-white text-3xl items-center justify-center hover:bg-black/60 transition cursor-pointer"
                >
                  ❯
                </button>
              )}

              {/* Title */}
              <div className="absolute sm:top-8 sm:left-8 sm:right-auto left-4 right-4 bottom-20 sm:bottom-auto">
                <div className="sm:backdrop-blur-lg sm:bg-white/10 sm:border border-white/20 rounded-2xl sm:px-6 sm:py-4 bg-none border-0">
                  <h2 className="text-white sm:text-3xl font-bold font-sans text-xl">
                    {selectedProject.name}
                  </h2>
                </div>
              </div>

              {selectedProject.engagement && (
                <div className="absolute md:top-8 sm:left-2/3 flex gap-4 sm:top-40 left-4 right-4 bottom-8 sm:bottom-auto">
                  <div className="sm:bg-white/10 backdrop-blur-md sm:border border-white/20 rounded-xl sm:px-5 sm:py-3 sm:flex-col flex flex-row gap-1 items-center px-0 border-0 bg-none">
                    <p className="text-white/70 text-xs">Engagement</p>
                    <p className="text-white sm:font-semibold font-light text-xs">
                      {selectedProject.engagement}
                    </p>
                  </div>
                </div>
              )}

              {selectedProject.services && (
                <div className="absolute bottom-8 md:left-8 max-w-md left-3.5 hidden sm:block">
                  <div className="bg-black/40 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                    <h3 className="text-white font-semibold mb-4 font-sans">
                      Services Delivered
                    </h3>
                    <div className="space-y-2">
                      {selectedProject.services.map((service) => (
                        <div
                          key={service}
                          className="flex items-center gap-2 text-white/90 text-xs"
                        >
                          <span className="text-lime-400 text-xs">●</span>
                          {service}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Dots — only when multiple images */}
              {selectedProject.modalImage.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-50">
                  {selectedProject.modalImage.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`transition-all rounded-full ${
                        currentImage === index
                          ? "w-8 h-3 bg-white"
                          : "w-3 h-3 bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Thumbnail strip — desktop only, only when multiple images */}
              {selectedProject.modalImage.length > 1 && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 md:flex gap-3 hidden">
                  {selectedProject.modalImage.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`overflow-hidden rounded-lg border-2 ${
                        currentImage === index
                          ? "border-white"
                          : "border-white/30"
                      }`}
                    >
                      <img
                        src={image}
                        alt={selectedProject.name}
                        className="w-20 h-14 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md text-white cursor-pointer hover:bg-black/80"
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
