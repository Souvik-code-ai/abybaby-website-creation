// import { useEffect, useRef, useState } from "react";
// import { ArrowLeft, ArrowRight, Clock, MapPin, Users } from "lucide-react";
// import { motion, AnimatePresence } from "motion/react";
// import { Link } from "react-router-dom";
// import { CASE_STUDIES } from "../../../public/caseStudy/casestudy";
// import SidebarCarousel from "../../components/ui/SidebarCarousel";

// // ── Skeleton image wrapper — shows a pulsing block until the image loads ──────
// function SkeletonImage({ src, alt, className, wrapperClassName }) {
//   const [loaded, setLoaded] = useState(false);

//   return (
//     <div className={`relative ${wrapperClassName ?? ""}`}>
//       {!loaded && (
//         <div className="absolute inset-0 bg-gray-200 animate-pulse" />
//       )}
//       <img
//         src={src}
//         alt={alt}
//         onLoad={() => setLoaded(true)}
//         className={`${className} transition-opacity duration-300 ${
//           loaded ? "opacity-100" : "opacity-0"
//         }`}
//       />
//     </div>
//   );
// }

// // ── Skeleton for the whole main content column (title, hero, summary, body) ──
// function CaseStudySkeleton() {
//   return (
//     <div className="flex flex-col gap-4">
//       <div>
//         <div className="h-3 w-24 rounded bg-gray-200 animate-pulse mb-2" />
//         <div className="h-5 w-3/4 rounded bg-gray-200 animate-pulse mb-3" />
//         <div className="flex gap-4">
//           <div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
//           <div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
//           <div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
//         </div>
//       </div>

//       <div className="rounded-xl overflow-hidden w-full aspect-video bg-gray-200 animate-pulse" />

//       <div className="rounded-xl p-4 bg-gray-100">
//         <div className="h-3 w-full rounded bg-gray-200 animate-pulse mb-2" />
//         <div className="h-3 w-5/6 rounded bg-gray-200 animate-pulse" />
//       </div>

//       <div className="flex flex-col gap-4">
//         {[0, 1].map((i) => (
//           <div key={i}>
//             <div className="h-3 w-full rounded bg-gray-200 animate-pulse mb-1.5" />
//             <div className="h-3 w-4/5 rounded bg-gray-200 animate-pulse mb-2" />
//             <div className="w-full aspect-video rounded-xl bg-gray-200 animate-pulse" />
//           </div>
//         ))}
//       </div>

//       <div>
//         <div className="h-3 w-16 rounded bg-gray-200 animate-pulse mb-2" />
//         <div className="grid grid-cols-3 gap-1.5">
//           {[0, 1, 2].map((i) => (
//             <div
//               key={i}
//               className="w-full aspect-[4/3] rounded-xl bg-gray-200 animate-pulse"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export function CaseStudiesView({ onNavigate }) {
//   const [activeId, setActiveId] = useState(1);
//   const study = CASE_STUDIES.find((s) => s.id === activeId);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [activeId]);

//   return (
//     <div className="flex flex-col pb-12 px-4 pt-4 w-[100%] min-[1160px]:mx-50 min-[770px]:mx-16 mx-0">
//       {/* Back button */}
//       <Link
//         to="/"
//         onClick={() => onNavigate("home")}
//         className="mt-0 flex items-center gap-2 font-base flex-row justify-start cursor-pointer px-0 mb-2 text-[#579F63]  min-[1160px]:-ml-26 min-[770px]:-ml-10"
//       >
//         <ArrowLeft size={16} />
//         Return back
//       </Link>

//       {/* Page label */}
//       <div className="px-0 mb-2 min-[1160px]:-ml-26 min-[770px]:-ml-10">
//         <div className="inline-block rounded-full bg-[rgba(87,159,99,0.12)] text-[#3d7a4a] text-[11px] font-semibold px-3 py-[3px]">
//           Case Studies
//         </div>
//       </div>

//       {/* Two-column layout on desktop, stacked on mobile */}
//       <div className="flex flex-col min-[770px]:flex-row gap-10">
//         {/* ── LEFT: Main content ── */}
//         <div className="flex flex-col px-4 flex-1 min-w-0 min-[1160px]:-ml-29 min-[770px]:-ml-10">
//           {!study ? (
//             <CaseStudySkeleton />
//           ) : (
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeId}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.28 }}
//                 className="flex flex-col gap-4"
//               >
//                 {/* Category + Title */}
//                 <div>
//                   <div className="text-[11px] font-semibold text-[#579F63] uppercase tracking-[0.06em] mb-1.5">
//                     {study.category}
//                   </div>
//                   <h1 className="font-[family-name:var(--font-family-body)] text-[color:var(--foreground)] text-[18px] font-bold leading-[1.3] m-0 mb-[10px]">
//                     {study.title}
//                   </h1>

//                   {/* Meta row */}
//                   <div className="flex flex-wrap gap-4">
//                     {[
//                       { icon: <MapPin size={11} />, label: study.location },
//                       { icon: <Clock size={11} />, label: study.year },
//                       { icon: <Users size={11} />, label: study.guests },
//                     ].map(({ icon, label }) => (
//                       <div
//                         key={label}
//                         className="flex items-center gap-1 text-[11px] text-[color:var(--muted-foreground)]"
//                       >
//                         <span className="text-[#579F63]">{icon}</span>
//                         {label}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Hero image */}
//                 <SkeletonImage
//                   src={study.heroImage}
//                   alt={study.title}
//                   wrapperClassName="rounded-xl overflow-hidden w-full aspect-auto"
//                   className="h-full w-full object-cover block"
//                 />

//                 {/* Summary */}
//                 <div className="rounded-xl p-4 bg-[rgba(87,159,99,0.05)] border-[0.5px] border-[rgba(87,159,99,0.25)]">
//                   <p className="text-[13px] font-medium text-[color:var(--foreground)] leading-[1.65] m-0">
//                     {study.summary}
//                   </p>
//                 </div>

//                 {/* Body paragraphs with inline images */}
//                 <div className="flex flex-col gap-4">
//                   {study.body.map((block, i) => (
//                     <div key={i}>
//                       <p className="text-[13px] text-[color:var(--muted-foreground)] leading-[1.8] m-0 mb-[10px]">
//                         {block.text}
//                       </p>
//                       {block.image && (
//                         <div className="rounded-xl overflow-hidden mb-1">
//                           <SkeletonImage
//                             src={block.image}
//                             alt={block.imageCaption ?? ""}
//                             wrapperClassName="w-full aspect-video"
//                             className="w-full aspect-video object-cover block"
//                           />
//                           {block.imageCaption && (
//                             <div className="text-[11px] text-[color:var(--muted-foreground)] pt-1.5 px-1 pb-0 italic">
//                               {block.imageCaption}
//                             </div>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Inline photo grid */}
//                 <div>
//                   <div className="text-[11px] font-semibold text-[#579F63] uppercase tracking-[0.06em] mb-2">
//                     Gallery
//                   </div>
//                   <div className="grid grid-cols-3 gap-1.5">
//                     {study.inlineImages.map((img, i) => (
//                       <div key={i} className="rounded-xl overflow-hidden">
//                         <SkeletonImage
//                           src={img.src}
//                           alt={img.caption}
//                           wrapperClassName="w-full aspect-[4/3]"
//                           className="w-full aspect-[4/3] object-cover block"
//                         />
//                         <div className="text-[10px] text-[color:var(--muted-foreground)] pt-1 px-0.5 pb-0 text-center">
//                           {img.caption}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           )}
//         </div>

//         {/* ── RIGHT (desktop) / BELOW (mobile): Sidebar carousel ── */}
//         <div className="w-full min-[770px]:w-[180px] min-[770px]:shrink-0 px-4 min-[770px]:px-0 mt-2 min-[770px]:mt-0">
//           <SidebarCarousel
//             studies={CASE_STUDIES}
//             activeId={activeId}
//             onSelect={setActiveId}
//           />
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="pt-8 pb-2 flex flex-col justify-center items-start px-4 flex-wrap">
//         <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center">
//           {[
//             { title: "Home", link: "home", path: "/" },
//             { title: "About", link: "about", path: "/about" },
//             { title: "Profile", link: "profile", path: "/profile" },
//             {
//               title: "Privacy Policy",
//               link: "privacypolicy",
//               path: "/privacypolicy",
//             },
//             {
//               title: "Data Privacy ",
//               link: "dataprivacy",
//               path: "/dataprivacy",
//             },
//             { title: "Terms & Conditions ", link: "terms", path: "/terms" },
//           ].map((item) => (
//             <Link
//               to={item.path}
//               key={item.title}
//               onClick={() => onNavigate(item.link)}
//               className="text-[11px] text-[color:var(--muted-foreground)] no-underline font-[family-name:var(--font-family-body)] transition-colors duration-150 cursor-pointer"
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.color = "var(--foreground)")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.color = "var(--muted-foreground)")
//               }
//             >
//               {item.title}
//             </Link>
//           ))}
//         </div>
//         <div className="flex flex-row items-center min-[770px]:justify-start w-full justify-center">
//           <p className="text-[11px] text-[color:var(--muted-foreground)] opacity-60 mt-3 font-[family-name:var(--font-family-body)] ">
//             © 2026 Abybaby Events. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }
// import { useEffect, useRef, useState } from "react";
// import { ArrowLeft, ArrowRight, Clock, MapPin, Users } from "lucide-react";
// import { motion, AnimatePresence } from "motion/react";
// import { Link } from "react-router-dom";
// import { CASE_STUDIES } from "../../../public/caseStudy/casestudy";
// import SidebarCarousel from "../../components/ui/SidebarCarousel";

// // ── Skeleton image wrapper — shows a pulsing block until the image loads ──────
// function SkeletonImage({ src, alt, className, wrapperClassName }) {
//   const [loaded, setLoaded] = useState(false);

//   return (
//     <div className={`relative ${wrapperClassName ?? ""}`}>
//       {!loaded && (
//         <div className="absolute inset-0 bg-gray-200 animate-pulse" />
//       )}
//       <img
//         src={src}
//         alt={alt}
//         onLoad={() => setLoaded(true)}
//         className={`${className} transition-opacity duration-300 ${
//           loaded ? "opacity-100" : "opacity-0"
//         }`}
//       />
//     </div>
//   );
// }

// // ── Skeleton for the whole main content column (title, hero, summary, body) ──
// function CaseStudySkeleton() {
//   return (
//     <div className="flex flex-col gap-4">
//       <div>
//         <div className="h-3 w-24 rounded bg-gray-200 animate-pulse mb-2" />
//         <div className="h-5 w-3/4 rounded bg-gray-200 animate-pulse mb-3" />
//         <div className="flex gap-4">
//           <div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
//           <div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
//           <div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
//         </div>
//       </div>

//       <div className="rounded-xl overflow-hidden w-full aspect-video bg-gray-200 animate-pulse" />

//       <div className="rounded-xl p-4 bg-gray-100">
//         <div className="h-3 w-full rounded bg-gray-200 animate-pulse mb-2" />
//         <div className="h-3 w-5/6 rounded bg-gray-200 animate-pulse" />
//       </div>

//       <div className="flex flex-col gap-4">
//         {[0, 1].map((i) => (
//           <div key={i}>
//             <div className="h-3 w-full rounded bg-gray-200 animate-pulse mb-1.5" />
//             <div className="h-3 w-4/5 rounded bg-gray-200 animate-pulse mb-2" />
//             <div className="w-full aspect-video rounded-xl bg-gray-200 animate-pulse" />
//           </div>
//         ))}
//       </div>

//       <div>
//         <div className="h-3 w-16 rounded bg-gray-200 animate-pulse mb-2" />
//         <div className="grid grid-cols-3 gap-1.5">
//           {[0, 1, 2].map((i) => (
//             <div
//               key={i}
//               className="w-full aspect-[4/3] rounded-xl bg-gray-200 animate-pulse"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export function CaseStudiesView({ onNavigate }) {
//   const [activeId, setActiveId] = useState(1);
//   const [galleryIndex, setGalleryIndex] = useState(null); // null = closed, number = open at that index
//   const study = CASE_STUDIES.find((s) => s.id === activeId);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [activeId]);

//   // Close the gallery modal if the user switches case studies while it's open
//   useEffect(() => {
//     setGalleryIndex(null);
//   }, [activeId]);

//   const goPrevGalleryImage = () => {
//     if (galleryIndex === null || !study) return;
//     setGalleryIndex((prev) =>
//       prev === 0 ? study.inlineImages.length - 1 : prev - 1,
//     );
//   };

//   const goNextGalleryImage = () => {
//     if (galleryIndex === null || !study) return;
//     setGalleryIndex((prev) =>
//       prev === study.inlineImages.length - 1 ? 0 : prev + 1,
//     );
//   };

//   // Swipe navigation for the gallery modal on mobile
//   const touchStartX = useRef(0);
//   const handleGalleryTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//   };
//   const handleGalleryTouchEnd = (e) => {
//     const dx = e.changedTouches[0].clientX - touchStartX.current;
//     if (Math.abs(dx) < 40) return;
//     if (dx < 0) goNextGalleryImage();
//     else goPrevGalleryImage();
//   };

//   // Keyboard navigation (Esc to close, arrows to move)
//   useEffect(() => {
//     if (galleryIndex === null) return;
//     const handler = (e) => {
//       if (e.key === "Escape") setGalleryIndex(null);
//       if (e.key === "ArrowRight") goNextGalleryImage();
//       if (e.key === "ArrowLeft") goPrevGalleryImage();
//     };
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, [galleryIndex, study]);

//   // Lock body scroll while the gallery modal is open
//   useEffect(() => {
//     if (galleryIndex !== null) {
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
//   }, [galleryIndex]);

//   return (
//     <div className="flex flex-col pb-12 px-4 pt-4 w-[100%] min-[1160px]:mx-50 min-[770px]:mx-16 mx-0">
//       {/* Back button */}
//       <Link
//         to="/"
//         onClick={() => onNavigate("home")}
//         className="mt-0 flex items-center gap-2 font-base flex-row justify-start cursor-pointer px-0 mb-2 text-[#579F63]  min-[1160px]:-ml-26 min-[770px]:-ml-10"
//       >
//         <ArrowLeft size={16} />
//         Return back
//       </Link>

//       {/* Page label */}
//       <div className="px-0 mb-2 min-[1160px]:-ml-26 min-[770px]:-ml-10">
//         <div className="inline-block rounded-full bg-[rgba(87,159,99,0.12)] text-[#3d7a4a] text-[11px] font-semibold px-3 py-[3px]">
//           Case Studies
//         </div>
//       </div>

//       {/* Two-column layout on desktop, stacked on mobile */}
//       <div className="flex flex-col min-[770px]:flex-row gap-10">
//         {/* ── LEFT: Main content ── */}
//         <div className="flex flex-col px-4 flex-1 min-w-0 min-[1160px]:-ml-29 min-[770px]:-ml-10">
//           {!study ? (
//             <CaseStudySkeleton />
//           ) : (
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeId}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.28 }}
//                 className="flex flex-col gap-4"
//               >
//                 {/* Category + Title */}
//                 <div>
//                   <div className="text-[11px] font-semibold text-[#579F63] uppercase tracking-[0.06em] mb-1.5">
//                     {study.category}
//                   </div>
//                   <h1 className="font-[family-name:var(--font-family-body)] text-[color:var(--foreground)] text-[18px] font-bold leading-[1.3] m-0 mb-[10px]">
//                     {study.title}
//                   </h1>

//                   {/* Meta row */}
//                   <div className="flex flex-wrap gap-4">
//                     {[
//                       { icon: <MapPin size={11} />, label: study.location },
//                       { icon: <Clock size={11} />, label: study.year },
//                       { icon: <Users size={11} />, label: study.guests },
//                     ].map(({ icon, label }) => (
//                       <div
//                         key={label}
//                         className="flex items-center gap-1 text-[11px] text-[color:var(--muted-foreground)]"
//                       >
//                         <span className="text-[#579F63]">{icon}</span>
//                         {label}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Hero image */}
//                 <SkeletonImage
//                   src={study.heroImage}
//                   alt={study.title}
//                   wrapperClassName="rounded-xl overflow-hidden w-full aspect-auto"
//                   className="h-full w-full object-cover block"
//                 />

//                 {/* Summary */}
//                 <div className="rounded-xl p-4 bg-[rgba(87,159,99,0.05)] border-[0.5px] border-[rgba(87,159,99,0.25)]">
//                   <p className="text-[13px] font-medium text-[color:var(--foreground)] leading-[1.65] m-0">
//                     {study.summary}
//                   </p>
//                 </div>

//                 {/* Body paragraphs with inline images */}
//                 <div className="flex flex-col gap-4">
//                   {study.body.map((block, i) => (
//                     <div key={i}>
//                       <p className="text-[13px] text-[color:var(--muted-foreground)] leading-[1.8] m-0 mb-[10px]">
//                         {block.text}
//                       </p>
//                       {block.image && (
//                         <div className="rounded-xl overflow-hidden mb-1">
//                           <SkeletonImage
//                             src={block.image}
//                             alt={block.imageCaption ?? ""}
//                             wrapperClassName="w-full aspect-video"
//                             className="w-full aspect-video object-cover block"
//                           />
//                           {block.imageCaption && (
//                             <div className="text-[11px] text-[color:var(--muted-foreground)] pt-1.5 px-1 pb-0 italic">
//                               {block.imageCaption}
//                             </div>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Inline photo grid */}
//                 <div>
//                   <div className="text-[11px] font-semibold text-[#579F63] uppercase tracking-[0.06em] mb-2">
//                     Gallery
//                   </div>
//                   <div className="grid grid-cols-3 gap-1.5">
//                     {study.inlineImages.map((img, i) => (
//                       <div
//                         key={i}
//                         className="rounded-xl overflow-hidden cursor-pointer"
//                         onClick={() => setGalleryIndex(i)}
//                       >
//                         <SkeletonImage
//                           src={img.src}
//                           alt={img.caption}
//                           wrapperClassName="w-full aspect-[4/3]"
//                           className="w-full aspect-[4/3] object-cover block transition-transform duration-300 hover:scale-105"
//                         />
//                         <div className="text-[10px] text-[color:var(--muted-foreground)] pt-1 px-0.5 pb-0 text-center">
//                           {img.caption}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           )}
//         </div>

//         {/* ── RIGHT (desktop) / BELOW (mobile): Sidebar carousel ── */}
//         <div className="w-full min-[770px]:w-[180px] min-[770px]:shrink-0 px-4 min-[770px]:px-0 mt-2 min-[770px]:mt-0">
//           <SidebarCarousel
//             studies={CASE_STUDIES}
//             activeId={activeId}
//             onSelect={setActiveId}
//           />
//         </div>
//       </div>

//       {/* ── Gallery lightbox modal ── */}
//       <AnimatePresence>
//         {galleryIndex !== null && study && (
//           <motion.div
//             className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-0 sm:p-6 w-screen h-[100svh]"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setGalleryIndex(null)}
//           >
//             <motion.div
//               className="relative w-full max-w-5xl sm:h-[85vh] h-[100svh] overflow-hidden sm:rounded-3xl rounded-none"
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               onClick={(e) => e.stopPropagation()}
//               onTouchStart={handleGalleryTouchStart}
//               onTouchEnd={handleGalleryTouchEnd}
//             >
//               <AnimatePresence mode="wait">
//                 <motion.img
//                   key={galleryIndex}
//                   src={study.inlineImages[galleryIndex].src}
//                   alt={study.inlineImages[galleryIndex].caption}
//                   initial={{ opacity: 0, scale: 1.05 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="absolute inset-0 w-full h-full object-contain bg-black"
//                 />
//               </AnimatePresence>

//               {/* Caption */}
//               {study.inlineImages[galleryIndex].caption && (
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-10 pb-4 px-4">
//                   <p className="text-white text-[13px] text-center">
//                     {study.inlineImages[galleryIndex].caption}
//                   </p>
//                 </div>
//               )}

//               {/* Prev / next arrows — only when there's more than one image */}
//               {study.inlineImages.length > 1 && (
//                 <>
//                   <button
//                     onClick={goPrevGalleryImage}
//                     className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full z-50 bg-black/40 backdrop-blur-md text-white text-3xl items-center justify-center hover:bg-black/60 transition cursor-pointer"
//                   >
//                     ❮
//                   </button>
//                   <button
//                     onClick={goNextGalleryImage}
//                     className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full z-50 bg-black/40 backdrop-blur-md text-white text-3xl items-center justify-center hover:bg-black/60 transition cursor-pointer"
//                   >
//                     ❯
//                   </button>

//                   {/* Dots */}
//                   <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
//                     {study.inlineImages.map((_, i) => (
//                       <button
//                         key={i}
//                         onClick={() => setGalleryIndex(i)}
//                         className={`transition-all rounded-full ${
//                           galleryIndex === i
//                             ? "w-6 h-2 bg-white"
//                             : "w-2 h-2 bg-white/40"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 </>
//               )}

//               <button
//                 onClick={() => setGalleryIndex(null)}
//                 className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md text-white text-xl flex items-center justify-center cursor-pointer hover:bg-black/80 z-50"
//               >
//                 ✕
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Footer */}
//       <footer className="pt-8 pb-2 flex flex-col justify-center items-start px-4 flex-wrap">
//         <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center">
//           {[
//             { title: "Home", link: "home", path: "/" },
//             { title: "About", link: "about", path: "/about" },
//             { title: "Profile", link: "profile", path: "/profile" },
//             {
//               title: "Privacy Policy",
//               link: "privacypolicy",
//               path: "/privacypolicy",
//             },
//             {
//               title: "Data Privacy ",
//               link: "dataprivacy",
//               path: "/dataprivacy",
//             },
//             { title: "Terms & Conditions ", link: "terms", path: "/terms" },
//           ].map((item) => (
//             <Link
//               to={item.path}
//               key={item.title}
//               onClick={() => onNavigate(item.link)}
//               className="text-[11px] text-[color:var(--muted-foreground)] no-underline font-[family-name:var(--font-family-body)] transition-colors duration-150 cursor-pointer"
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.color = "var(--foreground)")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.color = "var(--muted-foreground)")
//               }
//             >
//               {item.title}
//             </Link>
//           ))}
//         </div>
//         <div className="flex flex-row items-center min-[770px]:justify-start w-full justify-center">
//           <p className="text-[11px] text-[color:var(--muted-foreground)] opacity-60 mt-3 font-[family-name:var(--font-family-body)] ">
//             © 2026 Abybaby Events. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  MapPin,
  Users,
  Play,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { CASE_STUDIES } from "../../../public/caseStudy/casestudy";
import SidebarCarousel from "../../components/ui/SidebarCarousel";
import JsonLd from "../../components/JsonLd";
import { buildBreadcrumbSchema } from "../../seo/breadcrumbSchema";
// ── Skeleton image wrapper — shows a pulsing block until the image loads ──────
function SkeletonImage({ src, alt, className, wrapperClassName }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${wrapperClassName ?? ""}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

// ── Skeleton for the whole main content column (title, hero, summary, body) ──
function CaseStudySkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="h-3 w-24 rounded bg-gray-200 animate-pulse mb-2" />
        <div className="h-5 w-3/4 rounded bg-gray-200 animate-pulse mb-3" />
        <div className="flex gap-4">
          <div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
          <div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
          <div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>

      <div className="rounded-xl overflow-hidden w-full aspect-video bg-gray-200 animate-pulse" />

      <div className="rounded-xl p-4 bg-gray-100">
        <div className="h-3 w-full rounded bg-gray-200 animate-pulse mb-2" />
        <div className="h-3 w-5/6 rounded bg-gray-200 animate-pulse" />
      </div>

      <div className="flex flex-col gap-4">
        {[0, 1].map((i) => (
          <div key={i}>
            <div className="h-3 w-full rounded bg-gray-200 animate-pulse mb-1.5" />
            <div className="h-3 w-4/5 rounded bg-gray-200 animate-pulse mb-2" />
            <div className="w-full aspect-video rounded-xl bg-gray-200 animate-pulse" />
          </div>
        ))}
      </div>

      <div>
        <div className="h-3 w-16 rounded bg-gray-200 animate-pulse mb-2" />
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-full aspect-[4/3] rounded-xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function CaseStudiesView({ onNavigate }) {
  const [activeId, setActiveId] = useState(1);
  const [galleryIndex, setGalleryIndex] = useState(null); // null = closed, number = open at that index
  const study = CASE_STUDIES.find((s) => s.id === activeId);
  const modalVideoRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeId]);

  // Close the gallery modal if the user switches case studies while it's open
  useEffect(() => {
    setGalleryIndex(null);
  }, [activeId]);

  const goPrevGalleryImage = () => {
    if (galleryIndex === null || !study) return;
    setGalleryIndex((prev) =>
      prev === 0 ? study.inlineImages.length - 1 : prev - 1,
    );
  };

  const goNextGalleryImage = () => {
    if (galleryIndex === null || !study) return;
    setGalleryIndex((prev) =>
      prev === study.inlineImages.length - 1 ? 0 : prev + 1,
    );
  };

  // Swipe navigation for the gallery modal on mobile
  const touchStartX = useRef(0);
  const handleGalleryTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleGalleryTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) goNextGalleryImage();
    else goPrevGalleryImage();
  };

  // Keyboard navigation (Esc to close, arrows to move)
  useEffect(() => {
    if (galleryIndex === null) return;
    const handler = (e) => {
      if (e.key === "Escape") setGalleryIndex(null);
      if (e.key === "ArrowRight") goNextGalleryImage();
      if (e.key === "ArrowLeft") goPrevGalleryImage();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [galleryIndex, study]);

  // Lock body scroll while the gallery modal is open
  useEffect(() => {
    if (galleryIndex !== null) {
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
  }, [galleryIndex]);

  // Autoplay/pause the modal video whenever the active gallery item changes
  useEffect(() => {
    const video = modalVideoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
    return () => video.pause();
  }, [galleryIndex]);

  const activeGalleryItem =
    galleryIndex !== null && study ? study.inlineImages[galleryIndex] : null;

  return (
    <>
         <JsonLd data={buildBreadcrumbSchema([
                  { name: "Case Studies", url: "https://abybabyevents.com/casestudies" }
                ])} />
    <div className="flex flex-col pb-12 px-4 pt-4 w-[100%] min-[1160px]:mx-50 min-[770px]:mx-16 mx-0">
      {/* Back button */}
      <Link
        to="/"
        onClick={() => onNavigate("home")}
        className="mt-0 flex items-center gap-2 font-base flex-row justify-start cursor-pointer px-0 mb-2 text-[#579F63]  min-[1160px]:-ml-26 min-[770px]:-ml-10"
      >
        <ArrowLeft size={16} />
        Return back
      </Link>

      {/* Page label */}
      <div className="px-0 mb-2 min-[1160px]:-ml-26 min-[770px]:-ml-10">
        <div className="inline-block rounded-full bg-[rgba(87,159,99,0.12)] text-[#3d7a4a] text-[11px] font-semibold px-3 py-[3px]">
          Case Studies
        </div>
      </div>

      {/* Two-column layout on desktop, stacked on mobile */}
      <div className="flex flex-col min-[770px]:flex-row gap-10">
        {/* ── LEFT: Main content ── */}
        <div className="flex flex-col px-4 flex-1 min-w-0 min-[1160px]:-ml-29 min-[770px]:-ml-10">
          {!study ? (
            <CaseStudySkeleton />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
                className="flex flex-col gap-4"
              >
                {/* Category + Title */}
                <div>
                  <div className="text-[11px] font-semibold text-[#579F63] uppercase tracking-[0.06em] mb-1.5">
                    {study.category}
                  </div>
                  <h1 className="font-[family-name:var(--font-family-body)] text-[color:var(--foreground)] text-[18px] font-bold leading-[1.3] m-0 mb-[10px]">
                    {study.title}
                  </h1>

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-4">
                    {[
                      { icon: <MapPin size={11} />, label: study.location },
                      { icon: <Clock size={11} />, label: study.year },
                      { icon: <Users size={11} />, label: study.guests },
                    ].map(({ icon, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-1 text-[11px] text-[color:var(--muted-foreground)]"
                      >
                        <span className="text-[#579F63]">{icon}</span>
                        {label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hero image */}
                <SkeletonImage
                  src={study.heroImage}
                  alt={study.title}
                  wrapperClassName="rounded-xl overflow-hidden w-full aspect-auto"
                  className="h-full w-full object-cover block"
                />

                {/* Summary */}
                <div className="rounded-xl p-4 bg-[rgba(87,159,99,0.05)] border-[0.5px] border-[rgba(87,159,99,0.25)]">
                  <p className="text-[13px] font-medium text-[color:var(--foreground)] leading-[1.65] m-0">
                    {study.summary}
                  </p>
                </div>

                {/* Body paragraphs with inline images */}
                <div className="flex flex-col gap-4">
                  {study.body.map((block, i) => (
                    <div key={i}>
                      <p className="text-[13px] text-[color:var(--muted-foreground)] leading-[1.8] m-0 mb-[10px]">
                        {block.text}
                      </p>
                      {block.image && (
                        <div className="rounded-xl overflow-hidden mb-1">
                          <SkeletonImage
                            src={block.image}
                            alt={block.imageCaption ?? ""}
                            wrapperClassName="w-full aspect-video"
                            className="w-full aspect-video object-cover block"
                          />
                          {block.imageCaption && (
                            <div className="text-[11px] text-[color:var(--muted-foreground)] pt-1.5 px-1 pb-0 italic">
                              {block.imageCaption}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Inline photo/video grid */}
                <div>
                  <div className="text-[11px] font-semibold text-[#579F63] uppercase tracking-[0.06em] mb-2">
                    Gallery
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {study.inlineImages.map((item, i) => {
                      const isVideo = item.type === "video";
                      // videos use their poster as the grid thumbnail; images use src directly
                      const thumbSrc = isVideo ? item.poster : item.src;

                      return (
                        <div
                          key={i}
                          className="rounded-xl overflow-hidden cursor-pointer relative"
                          onClick={() => setGalleryIndex(i)}
                        >
                          <SkeletonImage
                            src={thumbSrc}
                            alt={item.caption}
                            wrapperClassName="w-full aspect-[4/3]"
                            className="w-full aspect-[4/3] object-cover block transition-transform duration-300 hover:scale-105"
                          />

                          {/* Play badge overlay — video items only */}
                          {isVideo && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                              <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                                <Play
                                  size={14}
                                  fill="#fff"
                                  className="text-white ml-0.5"
                                />
                              </div>
                            </div>
                          )}

                          <div className="text-[10px] text-[color:var(--muted-foreground)] pt-1 px-0.5 pb-0 text-center">
                            {item.caption}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* ── RIGHT (desktop) / BELOW (mobile): Sidebar carousel ── */}
        <div className="w-full min-[770px]:w-[180px] min-[770px]:shrink-0 px-4 min-[770px]:px-0 mt-2 min-[770px]:mt-0">
          <SidebarCarousel
            studies={CASE_STUDIES}
            activeId={activeId}
            onSelect={setActiveId}
          />
        </div>
      </div>

      {/* ── Gallery lightbox modal (image or video) ── */}
      <AnimatePresence>
        {activeGalleryItem && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-0 sm:p-6 w-screen h-[100svh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setGalleryIndex(null)}
          >
            <motion.div
              className="relative w-full max-w-5xl sm:h-[85vh] h-[100svh] overflow-hidden sm:rounded-3xl rounded-none bg-black"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleGalleryTouchStart}
              onTouchEnd={handleGalleryTouchEnd}
            >
              <AnimatePresence mode="wait">
                {activeGalleryItem.type === "video" ? (
                  <motion.video
                    key={galleryIndex}
                    ref={modalVideoRef}
                    src={activeGalleryItem.src}
                    poster={activeGalleryItem.poster}
                    controls
                    playsInline
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full object-contain bg-black"
                  />
                ) : (
                  <motion.img
                    key={galleryIndex}
                    src={activeGalleryItem.src}
                    alt={activeGalleryItem.caption}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full object-contain bg-black"
                  />
                )}
              </AnimatePresence>

              {/* Caption */}
              {activeGalleryItem.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-10 pb-4 px-4 pointer-events-none">
                  <p className="text-white text-[13px] text-center">
                    {activeGalleryItem.caption}
                  </p>
                </div>
              )}

              {/* Prev / next arrows — only when there's more than one item */}
              {study.inlineImages.length > 1 && (
                <>
                  <button
                    onClick={goPrevGalleryImage}
                    className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full z-50 bg-black/40 backdrop-blur-md text-white text-3xl items-center justify-center hover:bg-black/60 transition cursor-pointer"
                  >
                    ❮
                  </button>
                  <button
                    onClick={goNextGalleryImage}
                    className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full z-50 bg-black/40 backdrop-blur-md text-white text-3xl items-center justify-center hover:bg-black/60 transition cursor-pointer"
                  >
                    ❯
                  </button>

                  {/* Dots */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
                    {study.inlineImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setGalleryIndex(i)}
                        className={`transition-all rounded-full ${
                          galleryIndex === i
                            ? "w-6 h-2 bg-white"
                            : "w-2 h-2 bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              <button
                onClick={() => setGalleryIndex(null)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md text-white text-xl flex items-center justify-center cursor-pointer hover:bg-black/80 z-50"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="pt-8 pb-2 flex flex-col justify-center items-start px-4 flex-wrap">
        <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center">
          {[
            { title: "Home", link: "home", path: "/" },
            { title: "About", link: "about", path: "/about" },
            { title: "Profile", link: "profile", path: "/profile" },
            {
              title: "Privacy Policy",
              link: "privacypolicy",
              path: "/privacypolicy",
            },
            {
              title: "Data Privacy ",
              link: "dataprivacy",
              path: "/dataprivacy",
            },
            { title: "Terms & Conditions ", link: "terms", path: "/terms" },
          ].map((item) => (
            <Link
              to={item.path}
              key={item.title}
              onClick={() => onNavigate(item.link)}
              className="text-[11px] text-[color:var(--muted-foreground)] no-underline font-[family-name:var(--font-family-body)] transition-colors duration-150 cursor-pointer"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--foreground)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--muted-foreground)")
              }
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="flex flex-row items-center min-[770px]:justify-start w-full justify-center">
          <p className="text-[11px] text-[color:var(--muted-foreground)] opacity-60 mt-3 font-[family-name:var(--font-family-body)] ">
            © 2026 Abybaby Events. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
    </>
  );
}
