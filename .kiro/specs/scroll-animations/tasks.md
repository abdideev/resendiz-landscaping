# Implementation Plan: Scroll & Entry Animations

## Overview

Add Framer Motion (`motion/react` v12) entry and scroll-triggered animations to 8 static section components on the Resendiz Landscaping landing page. The implementation starts with a central `animation-variants.ts` module, then modifies each component in dependency order (central module first, then components in parallel, then build verification last). Five components with existing complex animations are never touched.

## Task Dependency Graph

```json
{
  "waves": [
    { "wave": 1, "tasks": ["1"] },
    { "wave": 2, "tasks": ["2", "3", "4", "5", "6", "7", "8", "9"] },
    { "wave": 3, "tasks": ["10"] }
  ]
}
```

Tasks 2–9 all depend on Task 1. Task 10 depends on Tasks 2–9.

## Tasks

- [x] 1. Create animation-variants.ts module
  - Create `src/lib/animation-variants.ts` with the `FadeUpVariantsOptions` interface, `AnimationVariants` type, and `makeFadeUpVariants` function
  - Export `heroVariants` constant: container with `staggerChildren: 0.18, delayChildren: 0.2`; item with `hidden: { opacity: 0, y: 24 }` and `visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } }`
  - Export `defaultViewport` constant: `{ once: true, margin: "-50px" } as const`
  - Ensure `makeFadeUpVariants` defaults: `duration: 0.65`, `y: 30`, `staggerChildren: 0.12`, `delayChildren: 0`
  - Ensure `item.visible.transition.ease` is always `[0.25, 1, 0.5, 1]` regardless of options
  - Ensure container and item variants only use `opacity` and `y` — no `x`, `scale`, `rotate`, `skew`, or filter properties
  - **Requirements**: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7

- [ ] 2. Animate HeroSection (page-load cascade)
  - Depends on: Task 1
  - Add `"use client"` as the very first line of `src/components/features/home/HeroSection.tsx`
  - Import `motion` from `"motion/react"` and `heroVariants` from `@/lib/animation-variants`
  - Wrap `<div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto mt-16 md:mt-24">` with `<motion.div variants={heroVariants.container} initial="hidden" animate="visible">`
  - Wrap `<h1 className="...">` with `<motion.h1 variants={heroVariants.item} className="...">`
  - Wrap the tagline `<div className="flex items-center gap-4 ...">` with `<motion.div variants={heroVariants.item} className="...">`
  - Wrap the CTA buttons `<div className="flex flex-col items-center ...">` with `<motion.div variants={heroVariants.item} className="...">`
  - Leave the background `<Image>` and `<div className="absolute inset-0 bg-black/50 backdrop-blur-[0.8px]">` overlay completely untouched
  - Preserve all existing `className` strings byte-for-byte
  - **Requirements**: 2.1, 2.2, 2.3, 2.4, 11.1, 11.3, 11.4

- [ ] 3. Animate ServicesPreviewSection (scroll stagger)
  - Depends on: Task 1
  - Add `"use client"` as the very first line of `src/components/features/home/ServicesPreviewSection.tsx`
  - Import `motion` from `"motion/react"` and `makeFadeUpVariants`, `defaultViewport` from `@/lib/animation-variants`
  - Create `const { container, item } = makeFadeUpVariants({ staggerChildren: 0.15 })` at module scope
  - Create `const MotionLink = motion.create(Link)` to preserve Next.js Link semantics
  - Change `<section className="...">` to `<motion.section variants={container} initial="hidden" whileInView="visible" viewport={defaultViewport} className="...">`
  - Replace the first `<Link href="/services" className="...">` with `<MotionLink variants={item} href="/services" className="...">`
  - Replace the second `<Link href="portfolio" className="...">` with `<MotionLink variants={item} href="portfolio" className="...">`
  - Preserve all existing `className` strings byte-for-byte
  - **Requirements**: 3.1, 3.2, 3.3, 11.1, 11.2, 11.3, 11.4

- [ ] 4. Animate TestimonialsSection (heading fade-up only)
  - Depends on: Task 1
  - Add `"use client"` as the very first line of `src/components/features/home/TestimonialsSection.tsx` if not already present
  - Import `motion` from `"motion/react"` and `makeFadeUpVariants`, `defaultViewport` from `@/lib/animation-variants`
  - Create `const { item } = makeFadeUpVariants()` at module scope
  - Change `<h3 className="text-brand-gold ...">` to `<motion.h3 variants={item} initial="hidden" whileInView="visible" viewport={defaultViewport} className="text-brand-gold ...">` keeping the `className` byte-for-byte identical
  - Leave both `<Marquee>` components, `ReviewCard`, and all other elements completely untouched
  - **Requirements**: 4.1, 4.2, 11.1, 11.2, 11.3, 11.4

- [ ] 5. Animate ServiceAreasSection (two-column stagger)
  - Depends on: Task 1
  - Add `"use client"` as the very first line of `src/components/features/home/ServiceAreasSection.tsx`
  - Import `motion` from `"motion/react"` and `makeFadeUpVariants`, `defaultViewport` from `@/lib/animation-variants`
  - Create `const { container: leftContainer, item: leftItem } = makeFadeUpVariants({ staggerChildren: 0.12 })` for the left column
  - Create `const { item: rightItem } = makeFadeUpVariants({ delayChildren: 0.1 })` for the right card
  - Wrap `<div className="flex-1 flex flex-col gap-6">` with `<motion.div variants={leftContainer} initial="hidden" whileInView="visible" viewport={defaultViewport} className="flex-1 flex flex-col gap-6">`
  - Inside the left column, wrap `<h3 className="...">`, `<h2 className="...">`, and `<p className="...">` each with `<motion.div variants={leftItem}>`
  - Wrap `<div className="w-full max-w-[520px] justify-self-end ...">` with `<motion.div variants={rightItem} initial="hidden" whileInView="visible" viewport={defaultViewport} className="w-full max-w-[520px] justify-self-end ...">`
  - Preserve all existing `className` strings byte-for-byte
  - **Requirements**: 5.1, 5.2, 11.1, 11.2, 11.3, 11.4

- [ ] 6. Animate IntroductionSection (multi-zone stagger)
  - Depends on: Task 1
  - Add `"use client"` as the very first line of `src/components/features/services/IntroductionSection.tsx`
  - Import `motion` from `"motion/react"` and `makeFadeUpVariants`, `defaultViewport` from `@/lib/animation-variants`
  - Create at module scope:
    - `const { container: headerContainer, item: headerItem } = makeFadeUpVariants({ staggerChildren: 0.12 })`
    - `const { item } = makeFadeUpVariants()`
    - `const { container: cardContainer } = makeFadeUpVariants({ staggerChildren: 0.15 })`
  - Wrap `<div className="max-w-5xl mx-auto text-center">` with `<motion.div variants={headerContainer} initial="hidden" whileInView="visible" viewport={defaultViewport} className="max-w-5xl mx-auto text-center">`
  - Change `<p className="text-brand-gold ...">` to `<motion.p variants={headerItem} className="text-brand-gold ...">`
  - Change `<h2 className="text-brand-green ...">` to `<motion.h2 variants={headerItem} className="text-brand-green ...">`
  - Wrap `<div className="max-w-2xl w-full h-px bg-gray-300 my-10 md:my-16 mx-auto">` (the divider) with `<motion.div variants={headerItem} className="...">`
  - Wrap the image column `<div className="relative w-full aspect-[4/3] ...">` with `<motion.div variants={item} initial="hidden" whileInView="visible" viewport={defaultViewport}>`
  - Wrap the text column `<div className="flex flex-col justify-center gap-6 md:gap-10">` with `<motion.div variants={item} initial="hidden" whileInView="visible" viewport={defaultViewport}>`
  - Wrap the TaskCard grid `<div className="pt-20 md:pt-36 grid grid-cols-1 md:grid-cols-3 ...">` with `<motion.div variants={cardContainer} initial="hidden" whileInView="visible" viewport={defaultViewport} className="...">`
  - Inside the TaskCard grid, wrap each `<TaskCard key={task.id} task={task} />` with `<motion.div variants={item} key={task.id}>` — `TaskCard` component itself is NOT modified
  - Preserve all existing `className` strings byte-for-byte
  - **Requirements**: 6.1, 6.2, 6.3, 11.1, 11.2, 11.3, 11.4

- [ ] 7. Animate ServicesIncludeSection (single grid fade-up)
  - Depends on: Task 1
  - Verify `"use client"` is the first line of `src/components/features/services/ServicesIncludeSection.tsx` (it already has `"use client"`)
  - Import `motion` from `"motion/react"` and `makeFadeUpVariants`, `defaultViewport` from `@/lib/animation-variants`
  - Create `const { item } = makeFadeUpVariants()` at module scope
  - Change `<div className="grid grid-cols-1 md:grid-cols-2 rounded-none overflow-hidden shadow-xl" onMouseEnter={...} onMouseLeave={...}>` to `<motion.div variants={item} initial="hidden" whileInView="visible" viewport={defaultViewport} className="grid grid-cols-1 md:grid-cols-2 rounded-none overflow-hidden shadow-xl" onMouseEnter={...} onMouseLeave={...}>`
  - The `onMouseEnter={() => setIsPaused(true)}` and `onMouseLeave={() => setIsPaused(false)}` handlers must remain on the same element
  - All inner content is untouched; preserve all `className` strings byte-for-byte
  - **Requirements**: 7.1, 7.2, 11.1, 11.2, 11.3, 11.4

- [ ] 8. Animate ContactCtaSection (scroll stagger)
  - Depends on: Task 1
  - Add `"use client"` as the very first line of `src/components/features/services/ContactCtaSection.tsx`
  - Import `motion` from `"motion/react"` and `makeFadeUpVariants`, `defaultViewport` from `@/lib/animation-variants`
  - Create `const MotionLink = motion.create(Link)` to preserve Next.js Link semantics for the CTA
  - Create `const { container, item } = makeFadeUpVariants({ staggerChildren: 0.15 })` at module scope
  - Wrap `<div className="max-w-xl">` with `<motion.div variants={container} initial="hidden" whileInView="visible" viewport={defaultViewport} className="max-w-xl">`
  - Change `<h2 className="text-2xl sm:text-3xl md:text-5xl ...">` to `<motion.h2 variants={item} className="...">`
  - Change `<p className="text-base md:text-lg ...">` to `<motion.p variants={item} className="...">`
  - Replace `<Link href={buttonHref} className="...">` with `<MotionLink variants={item} href={buttonHref} className="...">`
  - Leave the background `<Image>` and `<div className="absolute inset-0 bg-black/50">` overlay completely untouched
  - Preserve all existing `className` strings byte-for-byte
  - **Requirements**: 8.1, 8.2, 8.3, 11.1, 11.2, 11.3, 11.4

- [ ] 9. Animate Footer (scroll stagger)
  - Depends on: Task 1
  - Add `"use client"` as the very first line of `src/components/layout/Footer.tsx`
  - Import `motion` from `"motion/react"` and `makeFadeUpVariants`, `defaultViewport` from `@/lib/animation-variants`
  - Create `const { container, item } = makeFadeUpVariants({ staggerChildren: 0.1 })` at module scope
  - Change `<footer className="w-full bg-bg-black py-16 px-6 md:px-12">` to `<motion.footer variants={container} initial="hidden" whileInView="visible" viewport={defaultViewport} className="w-full bg-bg-black py-16 px-6 md:px-12">`
  - Wrap the left column `<div className="flex flex-col gap-6 order-1 lg:order-1 items-start">` with `<motion.div variants={item} className="...">`
  - Wrap the right column group `<div className="flex flex-row justify-start lg:justify-end gap-16 md:gap-24 order-2 lg:order-3 w-full">` with `<motion.div variants={item} className="...">`
  - Wrap the center copyright `<div className="flex flex-col lg:flex-row justify-start lg:justify-center text-left lg:text-center order-3 lg:order-2 w-full pt-8 lg:pt-0 border-t border-white/10 lg:border-none mt-2 lg:mt-0">` with `<motion.div variants={item} className="...">`
  - Preserve all existing `className` strings byte-for-byte
  - **Requirements**: 9.1, 9.2, 9.3, 11.1, 11.2, 11.3, 11.4

- [ ] 10. Verify build and excluded component immutability
  - Depends on: Tasks 2, 3, 4, 5, 6, 7, 8, 9
  - Run `bun run build` and confirm zero TypeScript errors and zero ESLint errors
  - Confirm `PortfolioList.tsx`, `ProjectCard.tsx`, `ProjectsGallerySection.tsx`, `ComparisonSlider.tsx`, and `FullScreenMenu.tsx` have zero diffs — they must be byte-for-byte identical to the originals
  - Confirm all new `motion` imports across modified files use `"motion/react"` (not `"framer-motion"`)
  - Confirm all modified files that use `motion.*` elements have `"use client"` as their first line
  - **Requirements**: 10.1, 11.1, 11.2, 11.3, 11.4

## Notes

- `motion` v12 is already installed — no new packages needed
- Import source for all new motion code is always `"motion/react"`, never `"framer-motion"`
- `ProjectsGallerySection.tsx` already uses `"framer-motion"` — that import is left untouched
- Tasks 2–9 are independent of each other and can be executed in any order or in parallel after Task 1 completes
- The excluded components (`PortfolioList`, `ProjectCard`, `ProjectsGallerySection`, `ComparisonSlider`, `FullScreenMenu`) are never opened or modified
