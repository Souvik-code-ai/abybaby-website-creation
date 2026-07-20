import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import { DIGITAL_PROJECTS_ALL } from "../../../public/digital/digital";
export function DigitalSection({ onNavigate }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef(null);

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
                // Newly loaded cards fade + slide up; existing cards skip re-animation
                initial={
                  index >= visibleCount - 3 ? { opacity: 0, y: 20 } : false
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: (index % 3) * 0.08 }}
                whileHover={{ y: -3 }}
                onClick={() => setSelectedProject(project)}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                className="overflow-hidden rounded-2xl bg-white shadow-sm cursor-pointer border border-[#f0f0f5] min-h-[350px] "
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full object-cover transition-transform duration-500 hover:scale-105  h-full "
                  />
                </div>
                {/* <div className="p-4">
                  <h3 className="font-semibold text-gray-900 leading-snug line-clamp-1 font-sans text-[15px]">
                    {project.name}
                  </h3>
                </div> */}
              </motion.div>
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
                  className="rounded-2xl bg-white  border border-[#f0f0f5]"
                >
                  <img
                    src={hoveredProject.image}
                    alt={hoveredProject.name}
                    className="w-full rounded-xl object-cover  h-[350px]"
                  />
                </motion.div>
              )}
            </AnimatePresence>
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
              <img src={logo} alt="" />
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

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl h-[80vh] overflow-hidden rounded-3xl"
            >
              <img
                src={selectedProject.modalImage}
                alt={selectedProject.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute top-8 left-8">
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl px-6 py-4">
                  <h2 className="text-white text-xl md:text-3xl md:font-bold font-sans font-medium">
                    {selectedProject.name}
                  </h2>
                </div>
              </div>
              <div className="absolute md:top-8 right-8 top-40"></div>
              <div className="absolute md:bottom-8 left-8 bottom-84">
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-5 flex flex-col justify-center items-center">
                  <h4 className="text-white/70 text-sm">Engagement</h4>
                  <p className="text-white md:text-3xl font-bold text-sm">
                    {selectedProject.engagement}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-8 md:right-8 w-[320px] right-1">
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6">
                  <h4 className="text-white font-semibold mb-4">
                    Services Delivered
                  </h4>
                  <div className="space-y-3">
                    {selectedProject.services.map((service) => (
                      <div
                        key={service}
                        className="flex items-center gap-3 text-white/90"
                      >
                        <span className="w-2 h-2 rounded-full bg-lime-400" />
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/50 text-white text-xl hover:bg-black/70"
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
