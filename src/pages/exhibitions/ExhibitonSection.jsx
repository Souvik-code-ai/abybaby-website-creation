// import { motion, AnimatePresence } from "motion/react";
// import image1 from "../../assets/images/drumtao/dt3.webp";
// import image5 from "../../assets/images/mia/mia 2.webp";
// import image7 from "../../assets/images/drumtao/dt7.webp";
// import image6 from "../../assets/images/arun/arun8.webp";
// import image9 from "../../assets/images/arun/arun4.webp";
// import image2 from "../../assets/images/mia/mia2.webp";
// import logo from "../../assets/images/logo.jpg";
// import { useState, useEffect, useRef, useCallback } from "react";
// import { ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";
// import { EXHIBITIONS_ALL } from "../../../public/exhibition/exhibition";

// // ── Skeleton for a single exhibition card ────────────────────────────────────
// function ExhibitionCardSkeleton() {
//   return (
//     <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-[#f0f0f5]">
//       <div className="w-full h-[220px] bg-gray-200 animate-pulse" />
//       <div className="p-4">
//         <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse mb-4" />
//         <div className="flex items-center justify-between mb-3">
//           <div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
//           <div className="h-3 w-10 rounded bg-gray-200 animate-pulse" />
//         </div>
//         <div className="flex items-center justify-between">
//           <div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
//           <div className="h-3 w-10 rounded bg-gray-200 animate-pulse" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export function ExhibitionSection({ onNavigate }) {
//   const [selectedExhibition, setSelectedExhibition] = useState(null);
//   const [hoveredProject, setHoveredProject] = useState(null);
//   const [visibleCount, setVisibleCount] = useState(3);
//   const [isLoading, setIsLoading] = useState(false);
//   const sentinelRef = useRef(null);
//   const [viewportHeight, setViewportHeight] = useState(
//     typeof window !== "undefined" ? window.innerHeight : 0,
//   );
//   // ── Full data pool ── add more entries here to extend the list

//   const visibleExhibitions = EXHIBITIONS_ALL.slice(0, visibleCount);
//   const hasMore = visibleCount < EXHIBITIONS_ALL.length;

//   // Load 3 more cards with a short delay for smoothness
//   const loadMore = useCallback(() => {
//     if (isLoading || !hasMore) return;
//     setIsLoading(true);
//     setTimeout(() => {
//       setVisibleCount((prev) => Math.min(prev + 3, EXHIBITIONS_ALL.length));
//       setIsLoading(false);
//     }, 600);
//   }, [isLoading, hasMore]);

//   // Watch the sentinel div — fire loadMore when it enters the viewport
//   useEffect(() => {
//     const sentinel = sentinelRef.current;
//     if (!sentinel) return;
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) loadMore();
//       },
//       { rootMargin: "200px" },
//     );
//     observer.observe(sentinel);
//     return () => observer.disconnect();
//   }, [loadMore]);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);
//   useEffect(() => {
//     if (selectedExhibition) {
//       const scrollY = window.scrollY;
//       document.body.style.position = "fixed";
//       document.body.style.top = `-${scrollY}px`;
//       document.body.style.left = "0";
//       document.body.style.right = "0";

//       return () => {
//         document.body.style.position = "";
//         document.body.style.top = "";
//         document.body.style.left = "";
//         document.body.style.right = "";
//         window.scrollTo(0, scrollY);
//       };
//     }
//   }, [selectedExhibition]);
//   useEffect(() => {
//     const vv = window.visualViewport;
//     if (!vv) return;
//     const updateHeight = () => setViewportHeight(vv.height);
//     updateHeight();
//     vv.addEventListener("resize", updateHeight);
//     return () => vv.removeEventListener("resize", updateHeight);
//   }, []);
//   return (
//     <div className="w-full min-h-screen bg-background min-[1160px]:mx-20 min-[770px]:mx-16 mx-0">
//       {/* Heading */}
//       <div className="sticky top-0 z-10 px-4 pt-4 pb-3 bg-[color:var(--color-background,_#fff)]">
//         <h1 className="font-semibold text-gray-900 font-sans lg:text-3xl md:text-2xl text-xl tracking-[-0.01em]">
//           Exhibitions
//         </h1>
//         <p className="text-gray-500 mt-0.5 text-[13px]">
//           Showcasing our exhibition excellence and achievements
//         </p>
//       </div>

//       {/* Exhibition Cards */}
//       <div className="px-2 py-5">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {visibleExhibitions.map((exhibition, index) => (
//             <motion.div
//               key={exhibition.id}
//               // Newly loaded cards fade + slide up; existing cards skip animation
//               initial={
//                 index >= visibleCount - 3 ? { opacity: 0, y: 20 } : false
//               }
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.35, delay: (index % 3) * 0.08 }}
//               whileHover={{ y: -3 }}
//               onClick={() => setSelectedExhibition(exhibition)}
//               onMouseEnter={() => setHoveredProject(exhibition)}
//               onMouseLeave={() => setHoveredProject(null)}
//               className="overflow-hidden rounded-2xl bg-white shadow-sm cursor-pointer border border-[#f0f0f5]"
//             >
//               <div className="relative">
//                 <img
//                   src={exhibition.image}
//                   alt={exhibition.name}
//                   className="w-full object-cover transition-transform duration-500 hover:scale-105 h-[220px]"
//                 />
//               </div>
//               <div className="p-4">
//                 <h3 className="font-semibold text-gray-900 leading-snug font-sans txet-[15px]">
//                   {exhibition.name}
//                 </h3>
//                 <div className="mt-3 flex items-center justify-between text-gray-500">
//                   <span className="text-[13px]">Attendance</span>
//                   <span className="text-lime-500 font-semibold text-[13px]">
//                     {exhibition.attendance}
//                   </span>
//                 </div>
//                 <div className="mt-3 flex items-center justify-between text-gray-500">
//                   <span className="text-[13px]">Booth Size</span>
//                   <span className="text-lime-500 text-[13px] font-semibold">
//                     {exhibition.boothSize}
//                   </span>
//                 </div>
//               </div>
//             </motion.div>
//           ))}

//           {/* ── Skeleton cards while loading more ── */}
//           {isLoading &&
//             Array.from({ length: 3 }).map((_, i) => (
//               <ExhibitionCardSkeleton key={`skeleton-${i}`} />
//             ))}
//         </div>

//         {/* Desktop hover preview panel */}
//         <div className="hidden xl:block w-64 2xl:w-100 fixed flex-shrink-0 right-[10vw] top-[15vh]">
//           <AnimatePresence mode="wait">
//             {hoveredProject && (
//               <motion.div
//                 key={hoveredProject.id}
//                 initial={{ opacity: 0, x: 10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 10 }}
//                 transition={{ duration: 0.2 }}
//                 className="rounded-2xl bg-white border border-gray-100 p-5"
//               >
//                 <img
//                   src={hoveredProject.modalImage}
//                   alt={hoveredProject.name}
//                   className="w-full rounded-xl object-cover mb-4 aspect-auto"
//                 />
//                 <h3 className="font-semibold text-gray-900 font-sans text-sm mb-3">
//                   {hoveredProject.name}
//                 </h3>
//                 <div className="flex gap-2 mb-4">
//                   <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
//                     <p className="text-xs text-gray-400 mb-1">Attendance</p>
//                     <p className="text-xs font-semibold text-gray-800">
//                       {hoveredProject.attendance}
//                     </p>
//                   </div>
//                   <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
//                     <p className="text-xs text-gray-400 mb-1">Booth Size</p>
//                     <p className="text-xs font-semibold text-gray-800">
//                       {hoveredProject.boothSize}
//                     </p>
//                   </div>
//                 </div>
//                 {/* <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">
//                   Services
//                 </p>
//                 <div className="space-y-2">
//                   {hoveredProject.features.map((service) => (
//                     <div
//                       key={service}
//                       className="flex items-center gap-2 text-sm text-gray-700"
//                     >
//                       <span className="w-1.5 h-1.5 rounded-full bg-lime-400 flex-shrink-0" />
//                       {service}
//                     </div>
//                   ))}
//                 </div> */}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* ── Infinite scroll sentinel ── */}
//       {hasMore && <div ref={sentinelRef} className="h-2" />}

//       {/* Modal */}
//       <AnimatePresence>
//         {selectedExhibition && (
//           <motion.div
//             className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md sm:p-6 p-0  w-screen h-[100svh]"
//             style={{ height: viewportHeight }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setSelectedExhibition(null)}
//           >
//             <motion.div
//               className="relative max-w-6xl w-screen sm:h-[85vh] overflow-hidden sm:rounded-3xl h-[100svh] isolate bg-black/95"
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.9 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <img
//                 src={selectedExhibition.modalImage}
//                 alt={selectedExhibition.name}
//                 className={`w-full h-full object-contain`}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
//               <div className="absolute sm:top-8 sm:left-8 left-4 top-[90vh]">
//                 <div className="sm:backdrop-blur-lg sm:bg-white/10 sm:border border-white/20 rounded-2xl sm:px-6 sm:py-4 bg-none border-0 ">
//                   <h2 className="text-white sm:text-3xl font-bold font-sans text-xl">
//                     {selectedExhibition.name}
//                   </h2>
//                 </div>
//               </div>
//               <div className="absolute md:top-8 sm:left-2/3 flex gap-4 sm:top-40  left-4 min-[375]:top-[88vh]  top-[94vh]">
//                 <div className="sm:bg-white/10 backdrop-blur-md sm:border border-white/20 rounded-xl sm:px-5 sm:py-3 sm:flex-col flex flex-row gap-1 items-center px-0 border-0 bg-none">
//                   <p className="text-white/70 text-xs">Booth Size:</p>
//                   <p className="text-white sm:font-semibold font-light text-xs">
//                     {selectedExhibition.boothSize}
//                   </p>
//                 </div>
//                 <div className="sm:bg-white/10 backdrop-blur-md sm:border border-white/20 rounded-xl sm:px-5 sm:py-3 sm:flex-col flex flex-row gap-1 items-center px-0 border-0 bg-none">
//                   <p className="text-white/70 text-xs">Attendance</p>
//                   <p className="text-white sm:font-semibold font-light text-xs">
//                     {selectedExhibition.attendance}
//                   </p>
//                 </div>
//               </div>
//               {/* <div className="absolute bottom-8 md:left-8 max-w-md left-3.5 hidden sm:block">
//                 <div className="bg-black/40 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
//                   <h3 className="text-white font-semibold mb-4 font-sans">
//                     Exhibition Highlights
//                   </h3>
//                   <div className="space-y-2 ">
//                     {selectedExhibition.features.map((feature) => (
//                       <div
//                         key={feature}
//                         className="flex items-center gap-2 text-white/90 text-xs"
//                       >
//                         <span className="text-lime-400 text-xs">●</span>
//                         {feature}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div> */}
//               <button
//                 onClick={() => setSelectedExhibition(null)}
//                 className="absolute top-3 right-3 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md text-white cursor-pointer hover:bg-black/80"
//               >
//                 ✕
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Footer — only shown once all cards are loaded */}
//       {!hasMore && (
//         <div className="flex flex-col items-center py-8 gap-2">
//           <div className="rounded-full flex items-center justify-center w-12 h-12 bg-[linear-gradient(135deg,#d4456a_0%,#f9a8c9_100%)]">
//             <img src={logo} alt="" />
//           </div>
//           <p className="text-[13px] text-[#8e8e93] text-center">
//             You've seen all exhibitions.
//           </p>
//           <Link
//             to={"/activation"}
//             onClick={() => onNavigate("activation")}
//             className="mt-0 flex items-center gap-2 font-base flex-row justify-center cursor-pointer text-[#579F63]"
//           >
//             Explore More
//             <ArrowRight size={16} />
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }
import { motion, AnimatePresence } from "motion/react";
import logo from "../../assets/images/logo.webp";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { EXHIBITIONS_ALL } from "../../../public/exhibition/exhibition";
import JsonLd from "../../components/JsonLd";
import { buildBreadcrumbSchema } from "../../seo/breadcrumbSchema";
import { buildExhibitionSchema } from "../../seo/ExhibitonSchema";
// ── Skeleton for a single exhibition card ────────────────────────────────────
function ExhibitionCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-[#f0f0f5]">
      <div className="w-full h-[220px] bg-gray-200 animate-pulse" />
      <div className="p-4">
        <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse mb-4" />
        <div className="flex items-center justify-between mb-3">
          <div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
          <div className="h-3 w-10 rounded bg-gray-200 animate-pulse" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
          <div className="h-3 w-10 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function ExhibitionSection({ onNavigate }) {
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sentinelRef = useRef(null);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0,
  );

  const visibleExhibitions = EXHIBITIONS_ALL.slice(0, visibleCount);
  const hasMore = visibleCount < EXHIBITIONS_ALL.length;

  // Load 3 more cards with a short delay for smoothness
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 3, EXHIBITIONS_ALL.length));
      setIsLoading(false);
    }, 600);
  }, [isLoading, hasMore]);

  // Watch the sentinel div — fire loadMore when it enters the viewport
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

  useEffect(() => {
    if (selectedExhibition) {
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
  }, [selectedExhibition]);

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
const exhibitionSchemas = buildExhibitionSchema(EXHIBITIONS_ALL);
  // ── Modal gallery navigation ──────────────────────────────────────────────
  const goPrevImage = () => {
    if (!selectedExhibition) return;
    setCurrentImage((prev) =>
      prev === 0 ? selectedExhibition.modalImage.length - 1 : prev - 1,
    );
  };

  const goNextImage = () => {
    if (!selectedExhibition) return;
    setCurrentImage((prev) =>
      prev === selectedExhibition.modalImage.length - 1 ? 0 : prev + 1,
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
        <JsonLd data={buildBreadcrumbSchema([
          { name: "Exhibitons", url: "https://abybabyevents.com/exhibition" }
        ])} />
                {exhibitionSchemas.map((schema, i) => (
          <JsonLd key={i} data={schema} />
        ))}
    <div className="w-full min-h-screen bg-background min-[1160px]:mx-20 min-[770px]:mx-16 mx-0">
      {/* Heading */}
      <div className="sticky top-0 z-10 px-4 pt-4 pb-3 bg-[color:var(--color-background,_#fff)]">
        <h1 className="font-semibold text-gray-900 font-sans lg:text-3xl md:text-2xl text-xl tracking-[-0.01em]">
          Exhibitions
        </h1>
        <p className="text-gray-500 mt-0.5 text-[13px]">
          Showcasing our exhibition excellence and achievements
        </p>
      </div>

      {/* Exhibition Cards */}
      <div className="px-2 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleExhibitions.map((exhibition, index) => (
            <motion.div
              key={exhibition.id}
              // Newly loaded cards fade + slide up; existing cards skip animation
              initial={
                index >= visibleCount - 3 ? { opacity: 0, y: 20 } : false
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: (index % 3) * 0.08 }}
              whileHover={{ y: -3 }}
              onClick={() => {
                setSelectedExhibition(exhibition);
                setCurrentImage(0);
              }}
              onMouseEnter={() => setHoveredProject(exhibition)}
              onMouseLeave={() => setHoveredProject(null)}
              className="overflow-hidden rounded-2xl bg-white shadow-sm cursor-pointer border border-[#f0f0f5]"
            >
              <div className="relative">
                <img
                  src={exhibition.image}
                  alt={exhibition.name}
                  className="w-full object-cover transition-transform duration-500 hover:scale-105 h-[220px]"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 leading-snug font-sans txet-[15px]">
                  {exhibition.name}
                </h3>
                <div className="mt-3 flex items-center justify-between text-gray-500">
                  <span className="text-[13px]">Attendance</span>
                  <span className="text-lime-500 font-semibold text-[13px]">
                    {exhibition.attendance}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-gray-500">
                  <span className="text-[13px]">Booth Size</span>
                  <span className="text-lime-500 text-[13px] font-semibold">
                    {exhibition.boothSize}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* ── Skeleton cards while loading more ── */}
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <ExhibitionCardSkeleton key={`skeleton-${i}`} />
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
                className="rounded-2xl bg-white border border-gray-100 p-5"
              >
                <img
                  src={hoveredProject.modalImage[0]}
                  alt={hoveredProject.name}
                  className="w-full rounded-xl object-cover mb-4 aspect-auto"
                />
                <h3 className="font-semibold text-gray-900 font-sans text-sm mb-3">
                  {hoveredProject.name}
                </h3>
                <div className="flex gap-2 mb-4">
                  <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400 mb-1">Attendance</p>
                    <p className="text-xs font-semibold text-gray-800">
                      {hoveredProject.attendance}
                    </p>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400 mb-1">Booth Size</p>
                    <p className="text-xs font-semibold text-gray-800">
                      {hoveredProject.boothSize}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Infinite scroll sentinel ── */}
      {hasMore && <div ref={sentinelRef} className="h-2" />}

      {/* Modal */}
      <AnimatePresence>
        {selectedExhibition && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md sm:p-6 p-0  w-screen h-[100svh]"
            style={{ height: viewportHeight }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedExhibition(null)}
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
                  src={selectedExhibition.modalImage[currentImage]}
                  alt={selectedExhibition.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Arrow prev — desktop only, only when multiple images */}
              {!isMobile && selectedExhibition.modalImage.length > 1 && (
                <button
                  onClick={goPrevImage}
                  className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 sm:w-14 sm:h-14 rounded-full z-50 bg-black/40 backdrop-blur-md text-white text-3xl items-center justify-center hover:bg-black/60 transition cursor-pointer"
                >
                  ❮
                </button>
              )}

              {/* Arrow next — desktop only, only when multiple images */}
              {!isMobile && selectedExhibition.modalImage.length > 1 && (
                <button
                  onClick={goNextImage}
                  className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-50 sm:w-14 sm:h-14 rounded-full bg-black/40 backdrop-blur-md text-white text-3xl items-center justify-center hover:bg-black/60 transition cursor-pointer"
                >
                  ❯
                </button>
              )}

              {/* Desktop: title + booth/attendance in one aligned row */}
              <div className="absolute top-8 left-8 right-8 hidden sm:flex sm:items-center sm:justify-between gap-4">
                {/* Title */}
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl px-6 py-4">
                  <h2 className="text-white text-3xl font-bold font-sans">
                    {selectedExhibition.name}
                  </h2>
                </div>

                {/* Booth size / attendance */}
                <div className="flex gap-4">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-3 flex flex-col items-center">
                    <p className="text-white/70 text-xs">Booth Size:</p>
                    <p className="text-white font-semibold text-xs">
                      {selectedExhibition.boothSize}
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-3 flex flex-col items-center">
                    <p className="text-white/70 text-xs">Attendance</p>
                    <p className="text-white font-semibold text-xs">
                      {selectedExhibition.attendance}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile: unchanged stack from before */}
              <div className="sm:hidden absolute inset-x-0 bottom-0 flex flex-col gap-3 px-4 pb-6 pt-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div>
                  <h2 className="text-white text-xl font-bold font-sans">
                    {selectedExhibition.name}
                  </h2>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-row gap-1 items-center">
                    <p className="text-white/70 text-xs">Booth Size:</p>
                    <p className="text-white font-light text-xs">
                      {selectedExhibition.boothSize}
                    </p>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <p className="text-white/70 text-xs">Attendance</p>
                    <p className="text-white font-light text-xs">
                      {selectedExhibition.attendance}
                    </p>
                  </div>
                </div>
                {selectedExhibition.modalImage.length > 1 && (
                  <div className="flex justify-center gap-3">
                    {selectedExhibition.modalImage.map((_, index) => (
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
              </div>

              <button
                onClick={() => setSelectedExhibition(null)}
                className="absolute top-3 right-3 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md text-white cursor-pointer hover:bg-black/80"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer — only shown once all cards are loaded */}
      {!hasMore && (
        <div className="flex flex-col items-center py-8 gap-2">
          <div className="rounded-full flex items-center justify-center w-12 h-12 bg-[linear-gradient(135deg,#d4456a_0%,#f9a8c9_100%)]">
            <img src={logo} alt="Krishivikas Logo" loading="lazy"/>
          </div>
          <p className="text-[13px] text-[#8e8e93] text-center">
            You've seen all exhibitions.
          </p>
          <Link
            to={"/activation"}
            onClick={() => onNavigate("activation")}
            className="mt-0 flex items-center gap-2 font-base flex-row justify-center cursor-pointer text-[#579F63]"
          >
            Explore More
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
    </>
  );
}
