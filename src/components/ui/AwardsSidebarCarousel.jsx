// import { useState, useRef, useEffect } from "react";
// import { Trophy } from "lucide-react";
// export default function AwardsSidebarCarousel({ awards, activeId, onSelect }) {
//   const [paused, setPaused] = useState(false);
//   const [offset, setOffset] = useState(0);
//   const rafRef = useRef(null);
//   const lastTimeRef = useRef(null);
//   const CARD_HEIGHT = 168;
//   const SPEED = 50;

//   const others = awards.filter((a) => a.id !== activeId);
//   const items = [...others, ...others];

//   useEffect(() => {
//     setOffset(0);
//     lastTimeRef.current = null;
//   }, [activeId]);

//   useEffect(() => {
//     if (paused) {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//       return;
//     }
//     const loop = (ts) => {
//       if (lastTimeRef.current === null) lastTimeRef.current = ts;
//       const delta = ts - lastTimeRef.current;
//       lastTimeRef.current = ts;
//       setOffset((prev) => {
//         const next = prev + (SPEED * delta) / 1000;
//         return next >= others.length * CARD_HEIGHT ? 0 : next;
//       });
//       rafRef.current = requestAnimationFrame(loop);
//     };
//     rafRef.current = requestAnimationFrame(loop);
//     return () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, [paused, others.length]);

//   return (
//     <div
//       className="fixed top-5 w-[280px] self-start"
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//     >
//       <div className="overflow-hidden h-screen relative">
//         {/* Fade masks */}
//         <div className="absolute top-0 left-0 right-0 h-9 bg-[linear-gradient(to_bottom,var(--background),transparent)] z-2 pointer-events-none" />
//         <div className="absolute bottom-0 left-0 right-0 h-9 bg-[linear-gradient(to_top,var(--background),transparent)] z-[2] pointer-events-none" />
//         {/* Scrolling strip */}
//         <div
//           className={`flex flex-col gap-3 will-change-transform -translate-y-[${offset}px]`}
//         >
//           {items.map((award, i) => (
//             <button
//               key={`${award.id}-${i}`}
//               onClick={() => onSelect(award.id)}
//               className={`text-left rounded-xl overflow-hidden w-full bg-[color:var(--background)] shrink-0 cursor-pointer border-[0.5px] ${
//                 award.id === activeId
//                   ? "border-[rgba(87,159,99,0.55)]"
//                   : "border-[rgba(87,159,99,0.2)]"
//               }`}
//             >
//               <div className="aspect-video overflow-hidden">
//                 <img
//                   src={award.heroImage}
//                   alt={award.title}
//                   className="w-full h-full block object-cover"
//                 />
//               </div>
//               <div className="px-[10px] py-2">
//                 <div className="text-[10px] font-semibold text-[#579F63] uppercase tracking-[0.05em] mb-[3px]">
//                   {award.year}
//                 </div>
//                 <div className="text-[11px] font-semibold text-[color:var(--foreground)] leading-[1.4] line-clamp-2">
//                   {award.title}
//                 </div>
//                 <div className="text-[10px] text-[color:var(--muted-foreground)] mt-1 flex items-center gap-1">
//                   <Trophy size={9} />
//                   {award.issuedBy}
//                 </div>
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useRef, useEffect } from "react";
import { Trophy } from "lucide-react";

export default function AwardsSidebarCarousel({ awards, activeId, onSelect }) {
  const [paused, setPaused] = useState(false);
  const [offset, setOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 770,
  );

  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);

  // Desktop: vertical strip, cards stacked top→bottom, scrolling upward
  const DESKTOP_CARD_HEIGHT = 168;
  // Mobile: horizontal strip, cards side-by-side, scrolling right→left
  const MOBILE_CARD_WIDTH = 212; // card(200px) + gap(12px)
  const SPEED = 50; // px per second

  const others = awards.filter((a) => a.id !== activeId);
  const items = [...others, ...others];

  // Track viewport width so we can switch layout/animation direction responsively
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 769px)");
    const handler = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    setOffset(0);
    lastTimeRef.current = null;
  }, [activeId, isMobile]);

  useEffect(() => {
    if (paused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const cardSize = isMobile ? MOBILE_CARD_WIDTH : DESKTOP_CARD_HEIGHT;

    const loop = (ts) => {
      if (lastTimeRef.current === null) lastTimeRef.current = ts;
      const delta = ts - lastTimeRef.current;
      lastTimeRef.current = ts;
      setOffset((prev) => {
        const next = prev + (SPEED * delta) / 1000;
        return next >= others.length * cardSize ? 0 : next;
      });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused, others.length, isMobile]);

  const Card = ({ award }) => (
    <button
      onClick={() => onSelect(award.id)}
      className={`text-left rounded-xl overflow-hidden bg-[color:var(--background)] shrink-0 cursor-pointer border-[0.5px] ${
        isMobile ? "w-[200px]" : "w-full"
      } ${
        award.id === activeId
          ? "border-[rgba(87,159,99,0.55)]"
          : "border-[rgba(87,159,99,0.2)]"
      }`}
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={award.heroImage}
          alt={award.title}
          className="w-full h-full block object-cover"
        />
      </div>
      <div className="px-[10px] py-2">
        <div className="text-[10px] font-semibold text-[#579F63] uppercase tracking-[0.05em] mb-[3px]">
          {award.year}
        </div>
        <div className="text-[11px] font-semibold text-[color:var(--foreground)] leading-[1.4] line-clamp-1">
          {award.title}
        </div>
        <div className="text-[10px] text-[color:var(--muted-foreground)] mt-1 flex items-center gap-1">
          <Trophy size={9} />
          {award.issuedBy}
        </div>
      </div>
    </button>
  );

  if (isMobile) {
    return (
      <div className="relative w-full">
        <div className="overflow-hidden w-full h-[190px] relative">
          {/* Fade masks left & right */}
          <div className="absolute top-0 bottom-0 left-0 w-9 bg-[linear-gradient(to_right,var(--background),transparent)] z-[2] pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-9 bg-[linear-gradient(to_left,var(--background),transparent)] z-[2] pointer-events-none" />

          {/* Scrolling strip, moves right → left */}
          <div
            className="flex flex-row gap-3 will-change-transform h-full"
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {items.map((award, i) => (
              <Card award={award} key={`${award.id}-${i}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed top-5 w-[280px] self-start"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden h-screen relative">
        {/* Fade masks */}
        <div className="absolute top-0 left-0 right-0 h-9 bg-[linear-gradient(to_bottom,var(--background),transparent)] z-[2] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-9 bg-[linear-gradient(to_top,var(--background),transparent)] z-[2] pointer-events-none" />

        {/* Scrolling strip, moves bottom → top */}
        <div
          className="flex flex-col gap-3 will-change-transform"
          style={{ transform: `translateY(-${offset}px)` }}
        >
          {items.map((award, i) => (
            <Card award={award} key={`${award.id}-${i}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
