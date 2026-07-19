import { useState, useRef } from "react";
import { feedPosts } from "../../../public/home/home";
import { useCallback, useEffect } from "react";
import { FeedCard } from "./FeedCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
const FEED_PAGE_SIZE = 3;
export default function FeedWithInfiniteScroll({ onNavigate, logo }) {
  const [visibleCount, setVisibleCount] = useState(FEED_PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef(null);

  const visiblePosts = feedPosts.slice(0, visibleCount);
  const hasMore = visibleCount < feedPosts.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(prev + FEED_PAGE_SIZE, feedPosts.length),
      );
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
      { rootMargin: "300px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="flex flex-col gap-4 px-4 pt-4">
      {visiblePosts.map((post) => (
        <FeedCard key={post.id} post={post} />
      ))}
      {/* ── Sentinel + spinner ── */}
      {hasMore && (
        <div
          ref={sentinelRef}
          className="flex flex-col items-center py-6 gap-2"
        >
          {isLoading && (
            <>
              {/* Skeleton cards while loading */}
              {Array.from({ length: FEED_PAGE_SIZE }).map((_, i) => (
                <div
                  key={i}
                  className="max-w-[460px] rounded-2xl overflow-hidden bg-white border border-[#f0f0f5]"
                >
                  {/* Header skeleton */}
                  <div className="flex items-center gap-3 p-3">
                    <div className="rounded-full shrink-0 w-[42px] h-[42px] bg-[#f0f0f5] animate-pulse" />
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="h-3 w-2/5 rounded-md bg-[#f0f0f5] animate-pulse" />
                      <div className="h-2.5 w-1/4 rounded-md bg-[#f5f5f7] animate-pulse [animation-delay:0.2s]" />
                    </div>
                  </div>
                  {/* Image skeleton */}
                  <div className="aspect-square bg-[#f5f5f7] animate-pulse [animation-delay:0.1s]" />
                  {/* Caption skeleton */}
                  <div className="p-3 flex flex-col gap-2">
                    <div className="h-[11px] w-4/5 rounded-md bg-[#f0f0f5] animate-pulse" />
                    <div className="h-[11px] w-[55%] rounded-md bg-[#f5f5f7] animate-pulse [animation-delay:0.15s]" />
                  </div>
                </div>
              ))}
              <style>{`
                @keyframes pulse {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0.45; }
                }
              `}</style>
            </>
          )}
        </div>
      )}
      {/* ── End-of-feed footer ── */}
      {!hasMore && (
        <div className="flex flex-col items-center py-8 gap-2">
          <div className="rounded-full flex items-center justify-center w-12 h-12 bg-[linear-gradient(135deg,#d4456a_0%,#f9a8c9_100%)]">
            <img src={logo} alt="" />
          </div>
          <p className="text-[13px] text-[#8e8e93] text-center">
            You've seen all feeds.
          </p>
          <Link
            to={"/events"}
            onClick={() => onNavigate("events")}
            className="mt-0 flex items-center gap-2 font-base flex-row justify-center cursor-pointer text-[#579F63]"
          >
            Explore More
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}
