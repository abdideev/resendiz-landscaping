"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ArrowLeftRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  /** Posición inicial del slider (0–100). Default: 50 */
  initialPosition?: number;
  /** Oscila automáticamente entre animateFrom y animateTo. Default: false */
  autoAnimate?: boolean;
  /** Límite izquierdo de la animación automática en %. Default: 20 */
  animateFrom?: number;
  /** Límite derecho de la animación automática en %. Default: 80 */
  animateTo?: number;
  /** Duración en segundos de cada tramo de la animación. Default: 3 */
  animateDuration?: number;
  /** Pausa en ms antes de que arranque (o reanude) la animación automática. Default: 800 */
  animateDelay?: number;
  /** Suavidad del arrastre manual en segundos. 0 = instantáneo. Default: 0.06 */
  dragSpeed?: number;
}

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
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Guarda la animación activa para poder cancelarla en cualquier momento
  const activeAnim = useRef<ReturnType<typeof animate> | null>(null);
  // Guarda el timer del delay para limpiarlo si el usuario vuelve a arrastrar
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Dirección actual del loop: true = yendo hacia animateTo, false = hacia animateFrom
  const goingTo = useRef(true);

  const position = useMotionValue(initialPosition);
  const clipPath = useTransform(position, (v) => `inset(0 ${100 - v}% 0 0)`);
  const dividerLeft = useTransform(position, (v) => `calc(${v}% - 1px)`);

  // Lanza un tramo de la animación y, al terminar, encadena el siguiente
  const runNextStep = useCallback(() => {
    if (isDragging.current) return;

    const target = goingTo.current ? animateTo : animateFrom;

    // Calcula duración proporcional a la distancia restante
    // para que no haya saltos de velocidad al reanudar desde el medio
    const current = position.get();
    const total = Math.abs(animateTo - animateFrom);
    const remaining = Math.abs(target - current);
    const duration = total > 0 ? (remaining / total) * animateDuration : animateDuration;

    activeAnim.current = animate(position, target, {
      duration,
      ease: "easeInOut",
      onComplete: () => {
        if (isDragging.current) return;
        // Cambia dirección y encadena el siguiente tramo
        goingTo.current = !goingTo.current;
        runNextStep();
      },
    });
  }, [animateFrom, animateTo, animateDuration, position]);

  // Cancela la animación y el timer de resume activos
  const cancelAll = useCallback(() => {
    activeAnim.current?.stop();
    activeAnim.current = null;
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  }, []);

  // Reanuda después del delay — usado al soltar el drag
  const scheduleResume = useCallback(() => {
    cancelAll();
    resumeTimer.current = setTimeout(() => {
      if (!isDragging.current) runNextStep();
    }, animateDelay);
  }, [animateDelay, cancelAll, runNextStep]);

  // Arranca el loop automático al montar
  useEffect(() => {
    if (!autoAnimate) return;
    resumeTimer.current = setTimeout(runNextStep, animateDelay);
    return () => cancelAll();
  }, [autoAnimate, animateDelay, runNextStep, cancelAll]);

  // — Pointer handlers —
  const getPercent = useCallback((clientX: number): number => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return 50;
    return Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      isDragging.current = true;
      // Cancela la animación automática y cualquier timer de resume pendiente
      cancelAll();
      position.set(getPercent(e.clientX));
    },
    [cancelAll, getPercent, position]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging.current) return;
      animate(position, getPercent(e.clientX), {
        duration: dragSpeed,
        ease: "linear",
      });
    },
    [dragSpeed, getPercent, position]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.releasePointerCapture(e.pointerId);
      isDragging.current = false;
      // Retoma la animación automática después del delay
      if (autoAnimate) scheduleResume();
    },
    [autoAnimate, scheduleResume]
  );

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
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
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