import { useState, useRef, useCallback, useEffect } from "react";
export default function StoryViewer({ client, onClose, onSeen }) {
  const [storyIdx, setStoryIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const videoRef = useRef(null);
  const total = client.stories.length;
  const STORY_DURATION_MS = 4000;
  const currentStory = client.stories[storyIdx]; // NEW
  const isVideo = currentStory.type === "video";
  const startTimer = useCallback(
    (idx) => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (client.stories[idx].type === "video") return;
      setProgress(0);
      const step = (50 / STORY_DURATION_MS) * 100;
      timerRef.current = setInterval(() => {
        setProgress((p) => {
          if (p + step >= 100) {
            clearInterval(timerRef.current);
            if (idx < total - 1) {
              setTimeout(() => setStoryIdx(idx + 1), 150);
            }
            return 100;
          }
          return p + step;
        });
      }, 50);
    },
    [total],
  );

  useEffect(() => {
    startTimer(storyIdx);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [storyIdx, startTimer]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && storyIdx < total - 1)
        setStoryIdx((i) => i + 1);
      if (e.key === "ArrowLeft" && storyIdx > 0) setStoryIdx((i) => i - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [storyIdx, total, onClose]);

  return <></>;
}
