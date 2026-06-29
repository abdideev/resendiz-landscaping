"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { GalleryImage } from "@/types/gallery";

interface LightboxProps {
  images: readonly GalleryImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  /** Texto que aparece como marca de agua. Por defecto: "© Resendiz Landscaping" */
  watermarkText?: string;
}

/** Bloquea el menú contextual del navegador (click derecho / pulsación larga) */
function blockContextMenu(e: React.MouseEvent | React.TouchEvent) {
  e.preventDefault();
}

export function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  watermarkText = "© Resendiz Landscaping",
}: LightboxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      className="fixed inset-0 z-[999999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Close Button */}
      <motion.button
        type="button"
        onClick={onClose}
        aria-label="Close"
        whileHover={{ scale: 1.08, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="absolute top-6 right-6 md:top-8 md:right-8 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
      >
        <X className="w-7 h-7 md:w-8 md:h-8" />
      </motion.button>

      {/* Previous Button */}
      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
        whileHover={{ scale: 1.12, x: -4 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute top-1/2 -translate-y-1/2 left-2 md:left-6 z-20 p-2 text-white/50 hover:text-white"
      >
        <ChevronLeft className="w-10 h-10 md:w-12 md:h-12" />
      </motion.button>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={image.src}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full"
            onContextMenu={blockContextMenu}
            onTouchStart={(e) => {
              const timer = setTimeout(() => e.preventDefault(), 500);
              const clear = () => clearTimeout(timer);
              e.currentTarget.addEventListener("touchend", clear, {
                once: true,
              });
              e.currentTarget.addEventListener("touchmove", clear, {
                once: true,
              });
            }}
            style={{ userSelect: "none", WebkitUserSelect: "none" }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 90vw"
              className="object-contain"
              draggable={false}
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none overflow-hidden"
              style={{ userSelect: "none", WebkitUserSelect: "none" }}
            >
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern
                    id="wm-lightbox"
                    x="0"
                    y="0"
                    width="220"
                    height="100"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(-30)"
                  >
                    <text
                      x="10"
                      y="60"
                      fontFamily="Georgia, serif"
                      fontSize="13"
                      fontWeight="500"
                      letterSpacing="2"
                      fill="white"
                      fillOpacity="0.18"
                    >
                      {watermarkText}
                    </text>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#wm-lightbox)" />
              </svg>
            </div>
          </motion.div>
        </AnimatePresence>

        {image.caption && (
          <motion.p
            key={image.caption}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-white/90 font-sans text-sm md:text-sm tracking-widest mt-6 text-center"
          >
            {image.caption}
          </motion.p>
        )}
      </motion.div>

      {/* Next Button */}
      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
        whileHover={{ scale: 1.12, x: 4 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute top-1/2 -translate-y-1/2 right-2 md:right-6 z-20 p-2 text-white/50 hover:text-white"
      >
        <ChevronRight className="w-10 h-10 md:w-12 md:h-12" />
      </motion.button>
    </div>
  );

  return createPortal(modalContent, document.body);
}
