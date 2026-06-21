import { useState, useCallback } from "react";
import { GALLERY_IMAGES, GALLERY_VISIBLE_COUNT } from "@/constants/gallery";

export function useGallery() {
  const total = GALLERY_IMAGES.length;
  const hasArrows = total > GALLERY_VISIBLE_COUNT;
  const maxStart = Math.max(0, total - GALLERY_VISIBLE_COUNT);

  const [startIndex, setStartIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const next = useCallback(() => {
    setStartIndex((prev) => Math.min(prev + 1, maxStart));
  }, [maxStart]);

  const prev = useCallback(() => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const canGoNext = startIndex < maxStart;
  const canGoPrev = startIndex > 0;

  // ---- Lightbox ----
  const openLightbox = useCallback(
    (index: number) => setLightboxIndex(index),
    [],
  );
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const lightboxNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % total));
  }, [total]);
  const lightboxPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + total) % total,
    );
  }, [total]);

  return {
    startIndex,
    hasArrows,
    canGoNext,
    canGoPrev,
    next,
    prev,
    lightboxIndex,
    openLightbox,
    closeLightbox,
    lightboxNext,
    lightboxPrev,
  };
}
