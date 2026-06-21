"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY_VISIBLE_COUNT } from "@/constants/gallery";
import { useGallery } from "@/hooks/useGallery";
import { Lightbox } from "@/components/ui/Lightbox";
import type { GalleryImage } from "@/types/gallery";

interface ProjectsGallerySectionProps {
  images: readonly GalleryImage[];
}

export function ProjectsGallerySection({
  images,
}: ProjectsGallerySectionProps) {
  const {
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
  } = useGallery(images);

  const cardWidthPercent = 100 / GALLERY_VISIBLE_COUNT;
  const offsetPercent = startIndex * cardWidthPercent;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-16">
      <div className="relative">
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${offsetPercent}%` }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            {images.map((image, index) => (
              <div
                key={image.id}
                className="shrink-0 px-2"
                style={{ width: `${cardWidthPercent}%` }}
              >
                <button
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="group relative aspect-square w-full overflow-hidden rounded-md cursor-pointer"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </button>
              </div>
            ))}
          </motion.div>
        </div>

        {hasArrows && (
          <button
            type="button"
            onClick={prev}
            disabled={!canGoPrev}
            aria-label="Previous photos"
            className="absolute left-2 md:-left-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-gold text-white shadow-lg transition-all hover:bg-brand-gold-light hover:scale-110 disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        )}
        {hasArrows && (
          <button
            type="button"
            onClick={next}
            disabled={!canGoNext}
            aria-label="Next photos"
            className="absolute right-2 md:-right-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-gold text-white shadow-lg transition-all hover:bg-brand-gold-light hover:scale-110 disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        )}
      </div>

      <Lightbox
        images={images}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onNext={lightboxNext}
        onPrev={lightboxPrev}
      />
    </div>
  );
}
