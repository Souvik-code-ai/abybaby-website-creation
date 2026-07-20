import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import MediaGrid from "../../components/ui/MediaGrid";
import MediaLightbox from "../../components/ui/MediaLightBox";
import GridCell from "../../components/ui/GridCell";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  BarChart2,
  HelpCircle,
  Play,
  X,
  Grid,
  Film,
  Image,
  Heart,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import logo from "../../assets/images/logo.jpg";
import Portfolio from "../../assets/pdf/ABYBABY BROCHURE.pdf";
// ── Static data ───────────────────────────────────────────────────────────────
import { ArrowRight } from "lucide-react";
import {
  STATS,
  CAROUSEL_ITEMS,
  SERVICES,
  REELS_DATA,
  IMAGES_DATA,
} from "../../../public/profile/profile";

// Posts = all images + all reels combined
const POSTS_DATA = [...IMAGES_DATA, ...REELS_DATA];

const VISIBLE = 3;

//?/ ── Lightbox ──────────────────────────────────────────────────────────────────

// ── Grid cell ─────────────────────────────────────────────────────────────────

export function ProfileView({ onNavigate }) {
  const [offset, setOffset] = useState(0);
  const canPrev = offset > 0;
  const canNext = offset + VISIBLE < CAROUSEL_ITEMS.length;
  const visible = CAROUSEL_ITEMS.slice(offset, offset + VISIBLE);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // use "auto" for instant jump
    });
  }, []);
  function handlePdf() {
    console.log("pdf done");
  }
  function handlePdfDownload() {
    console.log("dwn pdf done");
  }
  return (
    <div className="flex flex-col pb-12 px-4 pt-4 w-[100%] min-[1160px]:mx-50 min-[770px]:mx-16 mx-0">
      {/* ── Hero ── */}
      <Link
        to={"/"}
        onClick={() => {
          console.log("Return back clicked");
          console.log("onNavigate is:", onNavigate);
          onNavigate("home");
        }}
        className="mt-0 flex items-center gap-2 font-base flex-row justify-start cursor-pointer px-2 text-[#579F63]"
      >
        <ArrowLeft size={16} />
        Return back
      </Link>
      <div className="flex flex-col center items-start">
        <div className="flex flex-row items-center py-10 px-4 gap-5 justify-center">
          <div className="rounded-full flex items-center justify-center mb-4 md:h-24 md:w-24 h-12 w-16 bg-lime-600">
            <img src={logo} alt="logo" />
          </div>
          <div className="flex flex-col justify-center items-start gap-0.5">
            <h1 className="lg:text-3xl md:text-2xl text-xl font-[family-name:var(--font-family-body)] text-[color:var(--foreground)]">
              Abybaby Events
            </h1>
            <p className="text-[13px] text-[color:var(--muted-foreground)]">
              Award-winning event & brand experience agency
            </p>
            <div className="flex gap-3">
              {STATS.map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="font-semibold text-[color:var(--accent)] font-[family-name:var(--font-family-body)] text-xs">
                    {value}
                  </span>
                  <span className="text-xs text-[color:var(--muted-foreground)]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-row justify-center items-between w-full gap-3 cursor-pointer">
          <a
            href={Portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[45%] rounded-md py-3 flex items-center justify-center md:gap-2 transition-opacity gap-1 cursor-pointer bg-[linear-gradient(135deg,_#579F63_0%,_#7CFC58_100%)] text-white text-[13px] font-semibold"
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            onClick={handlePdf}
          >
            <ExternalLink size={14} className="sm:block hidden" />
            View Portfolio
          </a>
          <a
            href={Portfolio}
            download="ABYBABY BROCHURE.pdf"
            className="w-[45%] rounded-md py-3 flex items-center justify-center md:gap-2 transition-opacity cursor-pointer gap-1 bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] text-[color:var(--accent)] text-[13px] font-semibold"
            onClick={handlePdfDownload}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <Download size={14} className="sm:block hidden" />
            Download Portfolio
          </a>
        </div>
      </div>

      {/* ── Featured Work carousel ── */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-sans text-[15px] font-bold text-[color:var(--foreground)]">
            Featured Work
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setOffset((o) => Math.max(0, o - 1))}
              disabled={!canPrev}
              className={`flex items-center justify-center rounded-full border border-border w-[30px] h-[30px] bg-[color:var(--background)] ${
                canPrev ? "opacity-100" : "opacity-30"
              }`}
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() =>
                setOffset((o) =>
                  Math.min(CAROUSEL_ITEMS.length - VISIBLE, o + 1),
                )
              }
              disabled={!canNext}
              className={`flex items-center justify-center rounded-full border border-border w-[30px] h-[30px] bg-[color:var(--background)] ${
                canNext ? "opacity-100" : "opacity-30"
              }`}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="flex gap-3 overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl overflow-hidden shrink-0 flex-1 min-w-0"
              >
                <div className="aspect-[16/10] relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-3 items-center bg-[linear-gradient(to_top,rgba(0,0,0,0.55)_0%,transparent_60%)]">
                    <span className="text-white/70 text-[10px]">
                      {item.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Services + About ── */}
      <div className="flex gap-6 px-4 mb-8">
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          <h2 className="font-sans text-[15px] font-bold text-[color:var(--foreground)] mb-1">
            Our Services
          </h2>
          {SERVICES.map(({ id, emoji, title, description, services }) => (
            <details
              key={id}
              className="rounded-xl p-3 bg-[color-mix(in_srgb,var(--accent)_4%,var(--background))] group"
            >
              <summary className="flex items-start gap-3 cursor-pointer list-none">
                <span className="text-xl shrink-0">{emoji}</span>

                <div className="flex-1">
                  <h3 className="text-[13px] font-semibold text-[color:var(--foreground)] font-sans">
                    {title}
                  </h3>

                  <p className="text-[11px] text-[color:var(--muted-foreground)] leading-[1.5] mt-1">
                    {description}
                  </p>
                </div>

                <svg
                  className="w-4 h-4 mt-1 transition-transform duration-300 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>

              <ul className="mt-4 ml-8 space-y-2">
                {services.map((service) => (
                  <li
                    key={service}
                    className="text-xs text-[color:var(--muted-foreground)] flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)] "></span>
                    {service}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>

      {/* ── Media grid (Posts / Reels / Images) ── */}
      <MediaGrid />
      <footer className="pt-2 pb-6 flex flex-col justify-center items-center ">
        <div className="flex flex-col items-center py-8 gap-2">
          <div className="rounded-full flex items-center justify-center w-12 h-12 bg-[linear-gradient(135deg,#65A30D_0%,#A3E635_100%)]">
            <img src={logo} alt="" />
          </div>

          <p className="text-[13px] text-[#8e8e93] text-center">
            You've explored all profile contents.
          </p>
          <Link
            to={"/"}
            onClick={() => onNavigate("casestudies")}
            className="mt-0 flex items-center gap-2 font-base flex-row justify-center cursor-pointer text-[#579F63]"
          >
            Explore More
            <ArrowRight size={16} />
          </Link>
        </div>
      </footer>
    </div>
  );
}
