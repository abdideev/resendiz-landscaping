import { useEffect, useRef, useCallback } from "react";
import { useMotionValue, animate, useTransform } from "framer-motion";

interface UseComparisonSliderArgs {
  initialPosition: number;
  autoAnimate: boolean;
  animateFrom: number;
  animateTo: number;
  animateDuration: number;
  animateDelay: number;
  dragSpeed: number;
}

export function useComparisonSlider({
  initialPosition,
  autoAnimate,
  animateFrom,
  animateTo,
  animateDuration,
  animateDelay,
  dragSpeed,
}: UseComparisonSliderArgs) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const activeAnim = useRef<ReturnType<typeof animate> | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const goingTo = useRef(true);

  const position = useMotionValue(initialPosition);
  const clipPath = useTransform(position, (v) => `inset(0 ${100 - v}% 0 0)`);
  const dividerLeft = useTransform(position, (v) => `calc(${v}% - 1px)`);

  const runNextStep = useCallback(() => {
    if (isDragging.current) return;

    const target = goingTo.current ? animateTo : animateFrom;
    const current = position.get();
    const total = Math.abs(animateTo - animateFrom);
    const remaining = Math.abs(target - current);
    const duration = total > 0 ? (remaining / total) * animateDuration : animateDuration;

    activeAnim.current = animate(position, target, {
      duration,
      ease: "easeInOut",
      onComplete: () => {
        if (isDragging.current) return;
        goingTo.current = !goingTo.current;
        runNextStep();
      },
    });
  }, [animateFrom, animateTo, animateDuration, position]);

  const cancelAll = useCallback(() => {
    activeAnim.current?.stop();
    activeAnim.current = null;
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  }, []);

  const scheduleResume = useCallback(() => {
    cancelAll();
    resumeTimer.current = setTimeout(() => {
      if (!isDragging.current) runNextStep();
    }, animateDelay);
  }, [animateDelay, cancelAll, runNextStep]);

  useEffect(() => {
    if (!autoAnimate) return;
    resumeTimer.current = setTimeout(runNextStep, animateDelay);
    return () => cancelAll();
  }, [autoAnimate, animateDelay, runNextStep, cancelAll]);

  const getPercent = useCallback((clientX: number): number => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return 50;
    return Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      isDragging.current = true;
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
      if (autoAnimate) scheduleResume();
    },
    [autoAnimate, scheduleResume]
  );

  return {
    containerRef,
    clipPath,
    dividerLeft,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerLeave: onPointerUp,
    },
  };
}