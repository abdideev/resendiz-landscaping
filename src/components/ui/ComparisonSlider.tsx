"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeftRight } from "lucide-react";
import { motion } from "framer-motion";
import { ComparisonSliderProps } from "@/types/comparison-slider";
import { useComparisonSlider } from "@/hooks/useComparisonSlider";

export function ComparisonSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before",
  afterAlt = "After",
  initialPosition = 50,
  autoAnimate = false,
  animateFrom = 20,
  animateTo = 80,
  animateDuration = 3,
  animateDelay = 800,
  dragSpeed = 0.06,
}: ComparisonSliderProps) {
  
  // Consumimos toda la lógica de custom hook
  const { containerRef, clipPath, dividerLeft, handlers } = useComparisonSlider({
    initialPosition,
    autoAnimate,
    animateFrom,
    animateTo,
    animateDuration,
    animateDelay,
    dragSpeed,
  });

  return (
    <div
      ref={containerRef}
      className="
        relative overflow-hidden rounded-xs select-none cursor-ew-resize
        w-full h-85
        sm:h-105
        md:h-125
        lg:h-150
      "
      {...handlers}
    >
      {/* After — fondo completo */}
      <Image
        src={afterImage}
        alt={afterAlt}
        fill
        priority
        className="object-cover pointer-events-none"
      />

      {/* Before — recortada por el slider */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ clipPath }}
      >
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Labels */}
      <span className="absolute top-6 left-6 bg-black text-white text-xs font-sans tracking-widest px-3 py-1 uppercase rounded-sm z-20 pointer-events-none ">
        Before
      </span>
      <span className="absolute top-6 right-6 bg-brand-green text-white text-xs font-sans tracking-widest px-3 py-1 uppercase rounded-sm z-20 pointer-events-none ">
        After
      </span>

      {/* Línea divisora + handle */}
      <motion.div
        className="absolute top-0 bottom-0 w-0.5 bg-brand-gold-light z-30 pointer-events-none"
        style={{ left: dividerLeft }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-brand-gold-light rounded-lg flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <ArrowLeftRight className="w-5 h-5 text-brand-green" strokeWidth={2.5} />
        </motion.div>
      </motion.div>
    </div>
  );
}