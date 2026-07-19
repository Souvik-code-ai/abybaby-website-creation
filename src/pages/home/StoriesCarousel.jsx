import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const VISIBLE_DESKTOP = 6;
const ITEM_W = 72;
const ITEM_GAP = 18;
const STORY_DURATION_MS = 4000;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ─── Segmented Ring ───────────────────────────────────────────────────────────

import SegmentedRing from "../../components/ui/SegmentedRing";

// ─── Story Circle ─────────────────────────────────────────────────────────────

import StoryCircle from "../../components/ui/StoryCircle";

import { StoryViewer } from "./StoryViewer";

// ─── Desktop Carousel ─────────────────────────────────────────────────────────

import DesktopCarousel from "../../components/ui/DesktopCarousel";

// ─── Mobile Carousel ──────────────────────────────────────────────────────────

import MobileCarousel from "../../components/ui/MobileCarousel";
// ─── Main Export ──────────────────────────────────────────────────────────────

export function StoriesCarousel({
  clients: initialClients,
  onStoryClick,
  onStorySeen,
}) {
  const [clients, setClients] = useState(initialClients ?? []);
  const [activeClient, setActiveClient] = useState(null);
  const isMobile = useIsMobile();
  useEffect(() => {
    if (!initialClients) return;
    setClients((prev) =>
      initialClients.map((incoming) => {
        const existing = prev.find((c) => c.id === incoming.id);
        return existing
          ? { ...incoming, seen: existing.seen || incoming.seen }
          : incoming;
      }),
    );
  }, [initialClients]);
  const handleStoryClick = (client) => {
    setActiveClient(client);
    onStoryClick?.(client.id);
  };

  const handleSeen = (id) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, seen: true } : c)),
    );
    onStorySeen?.(id);
  };

  return (
    <>
      {isMobile ? (
        <MobileCarousel
          clients={clients}
          onStoryClick={handleStoryClick}
          onDismiss={handleSeen}
        />
      ) : (
        <DesktopCarousel
          clients={clients}
          onStoryClick={handleStoryClick}
          onDismiss={handleSeen}
        />
      )}

      <AnimatePresence>
        {activeClient && (
          <StoryViewer
            client={activeClient}
            onClose={() => setActiveClient(null)}
            onSeen={handleSeen}
          />
        )}
      </AnimatePresence>
    </>
  );
}
