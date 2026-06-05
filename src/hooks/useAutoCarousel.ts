import { useEffect, useState } from "react";

interface UseAutoCarouselOptions {
  itemCount: number;
  intervalMs?: number;
  paused?: boolean;
}

export function useAutoCarousel({
  itemCount,
  intervalMs = 3000,
  paused = false,
}: UseAutoCarouselOptions) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (paused || itemCount <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % itemCount);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [itemCount, intervalMs, paused]);

  return { activeIndex, setActiveIndex };
}
