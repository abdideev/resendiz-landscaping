"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/types/gallery";

interface LightboxProps {
  images: readonly GalleryImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (currentIndex === null) return;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [currentIndex, onClose, onNext, onPrev]);

  if (currentIndex === null || !mounted) return null;

  const image = images[currentIndex];

  const modalContent = (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-24 right-4 md:top-28 md:right-6 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
      >
        <X className="w-7 h-7" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
        className="absolute left-2 md:left-6 z-20 p-2 text-white/80 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
      </button>

      <div
        className="relative z-10 w-full max-w-4xl max-h-[80vh] aspect-[4/3]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          className="object-contain"
        />
        {image.caption && (
          <p className="absolute -bottom-8 left-0 right-0 text-center text-white/80 text-sm">
            {image.caption}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
        className="absolute right-2 md:right-6 z-20 p-2 text-white/80 hover:text-white transition-colors"
      >
        <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
      </button>
    </div>
  );

  return createPortal(modalContent, document.body);
}
