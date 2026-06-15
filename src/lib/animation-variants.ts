import { Variants } from "motion/react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FadeUpVariantsOptions {
  /** Transition duration in seconds. Default: 0.65 */
  duration?: number;
  /** Initial y offset (positive = starts below). Default: 30 */
  y?: number;
  /** Stagger delay between children in seconds. Default: 0.12 */
  staggerChildren?: number;
  /** Delay before first child animates in seconds. Default: 0 */
  delayChildren?: number;
}

export type AnimationVariants = {
  container: Variants; // opacity-only stagger gate
  item: Variants;      // opacity + y transform
};

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * Returns a container + item Variants pair for whileInView stagger animations.
 *
 * Invariants:
 *  - item.visible.transition.ease is always [0.25, 1, 0.5, 1] — no override
 *  - Animated properties are limited to opacity and y only
 */
export function makeFadeUpVariants(
  options?: FadeUpVariantsOptions
): AnimationVariants {
  const duration = options?.duration ?? 1.0;
  const yOffset = options?.y ?? 40;
  const stagger = options?.staggerChildren ?? 0.35;
  const delay = options?.delayChildren ?? 0.1;

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return { container, item };
}

// ---------------------------------------------------------------------------
// Pre-built constants
// ---------------------------------------------------------------------------

/**
 * Variants for HeroSection's page-load animation.
 * Use with `initial="hidden" animate="visible"` (not whileInView).
 * Stagger: 0.18s, delayChildren: 0.2s, item y: 24, duration: 0.7.
 */
export const heroVariants: AnimationVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  },
};

/**
 * Viewport config for all whileInView calls.
 * once: true  — animations never replay on scroll-up
 * margin: "-50px" — trigger fires 50 px before the element edge
 */
export const defaultViewport = { once: true, amount: 0.25 } as const;
