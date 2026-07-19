import { useState, useRef, useCallback, useEffect } from "react";
import { IMAGES_DATA, REELS_DATA } from "../../../public/profile/profile";
import MediaLightbox from "./MediaLightBox";
import { AnimatePresence, motion } from "motion/react";
import GridCell from "./GridCell";
import { Grid, Film, Image } from "lucide-react";
export default function MediaGrid() {
  const [activeTab, setActiveTab] = useState("posts");
  const [lightboxItems, setLightboxItems] = useState(null);
  const [lightboxStart, setLightboxStart] = useState(0);
  const POSTS_DATA = [...IMAGES_DATA, ...REELS_DATA];
  // Infinite scroll state — only used for "images" tab
  const [visibleImageCount, setVisibleImageCount] = useState(6);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const sentinelRef = useRef(null);

  const hasMoreImages = visibleImageCount < IMAGES_DATA.length;

  const loadMoreImages = useCallback(() => {
    if (isLoadingImages || !hasMoreImages) return;
    setIsLoadingImages(true);
    setTimeout(() => {
      setVisibleImageCount((prev) => Math.min(prev + 6, IMAGES_DATA.length));
      setIsLoadingImages(false);
    }, 500);
  }, [isLoadingImages, hasMoreImages]);

  // Re-attach observer whenever tab switches to "images" or more items load
  useEffect(() => {
    if (activeTab !== "images") return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMoreImages();
      },
      { rootMargin: "200px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [activeTab, loadMoreImages]);

  // Reset image count when switching away from images tab and back
  useEffect(() => {
    if (activeTab === "images") setVisibleImageCount(6);
  }, [activeTab]);

  const tabData = {
    posts: POSTS_DATA,
    reels: REELS_DATA,
    images: IMAGES_DATA.slice(0, visibleImageCount), // sliced for images tab
  };

  const items = tabData[activeTab];

  const lightboxPool =
    activeTab === "images" ? IMAGES_DATA : tabData[activeTab];

  const openLightbox = (index) => {
    setLightboxStart(index);
    setLightboxItems(lightboxPool);
  };

  const TABS = [
    { key: "posts", icon: <Grid size={16} />, label: "Posts" },
    { key: "reels", icon: <Film size={16} />, label: "Reels" },
    { key: "images", icon: <Image size={16} />, label: "Images" },
  ];

  return (
    <>
      {/* Tab row */}
      <div className="flex mb-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-[11px] bg-transparent border-none cursor-pointer text-[13px] transition-all duration-150 border-b-2 ${
              activeTab === tab.key
                ? "border-[#579F63] text-[#579F63] font-bold"
                : "border-transparent text-[#8e8e93] font-normal"
            }`}
          >
            {tab.icon}
          </button>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className="grid grid-cols-3 gap-[3px] px-0 pb-2"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              // Only animate newly loaded images, not the initial batch or other tabs
              initial={
                activeTab === "images" && i >= visibleImageCount - 6
                  ? { opacity: 0, scale: 0.95 }
                  : false
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: (i % 6) * 0.04 }}
            >
              <GridCell item={item} onClick={() => openLightbox(i)} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ── Infinite scroll sentinel & spinner (images tab only) ── */}
      {activeTab === "images" && (
        <div
          ref={sentinelRef}
          className="flex justify-center items-center py-4"
        >
          {isLoadingImages && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-6 h-6 rounded-full border-2 border-gray-200 border-t-[#579F63] animate-spin [animation-duration:0.7s]" />
              <p className="text-[11px] text-[#aaa]">Loading more…</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </motion.div>
          )}
          {!hasMoreImages && !isLoadingImages && (
            <p className="text-[11px] text-[#c0c0c0]"></p>
          )}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItems && (
          <MediaLightbox
            items={lightboxItems}
            startIndex={lightboxStart}
            onClose={() => setLightboxItems(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
