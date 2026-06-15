# Requirements Document

## Introduction

This document defines the requirements for adding Framer Motion scroll-triggered and page-load entry animations to static section components on the Resendiz Landscaping Next.js website. The feature introduces a central animation variants module and applies coordinated fade-up stagger animations to eight components, while leaving five components with existing complex animations entirely untouched. The goal is a cohesive, premium feel in which every section reveals itself as it enters the viewport using only opacity and y transforms with a canonical easing curve.

## Glossary

- **Animation_Variants_Module**: The file `src/lib/animation-variants.ts` — the single source of truth for all animation timing, easing, and variant definitions.
- **AnimationVariants**: A TypeScript type containing a `container` Variants object (stagger gate) and an `item` Variants object (opacity + y transform).
- **ViewportConfig**: A frozen config object `{ once: true, margin: "-50px" }` passed to every `whileInView` call.
- **FadeUpVariantsOptions**: Optional parameter bag for `makeFadeUpVariants` controlling duration, y offset, staggerChildren, and delayChildren.
- **makeFadeUpVariants**: A pure function exported from the Animation_Variants_Module that returns an `AnimationVariants` pair.
- **heroVariants**: A named export from the Animation_Variants_Module pre-configured for HeroSection's page-load animation.
- **defaultViewport**: A named export from the Animation_Variants_Module equal to `{ once: true, margin: "-50px" }`.
- **Canonical_Easing**: The cubic-bezier tuple `[0.25, 1, 0.5, 1]` used in all item transition definitions.
- **whileInView**: The Framer Motion prop that triggers animation when an element enters the viewport via IntersectionObserver.
- **Excluded_Components**: The five files that must not be modified: `PortfolioList.tsx`, `ProjectCard.tsx`, `ProjectsGallerySection.tsx`, `ComparisonSlider.tsx`, `FullScreenMenu.tsx`.
- **Animated_Components**: The eight components that receive animation: `HeroSection`, `ServicesPreviewSection`, `TestimonialsSection`, `ServiceAreasSection`, `IntroductionSection`, `ServicesIncludeSection`, `ContactCtaSection`, `Footer`.

---

## Requirements

### Requirement 1: Animation Variants Module

**User Story:** As a developer, I want a central animation variants module, so that all animated components share consistent timing, easing, and transform values without duplication.

#### Acceptance Criteria

1. THE Animation_Variants_Module SHALL export a `makeFadeUpVariants` function that accepts an optional `FadeUpVariantsOptions` argument and returns an `AnimationVariants` object containing a `container` Variants object and an `item` Variants object.
2. WHEN `makeFadeUpVariants` is called without arguments, THE Animation_Variants_Module SHALL return an `AnimationVariants` where `item.visible.transition.duration` is `0.65`, `item.hidden.y` is `30`, `container.visible.transition.staggerChildren` is `0.12`, and `container.visible.transition.delayChildren` is `0`.
3. FOR ALL calls to `makeFadeUpVariants` with any valid `FadeUpVariantsOptions`, THE Animation_Variants_Module SHALL produce an `item` variant where `item.visible.transition.ease` equals `[0.25, 1, 0.5, 1]`.
4. FOR ALL calls to `makeFadeUpVariants` with any valid `FadeUpVariantsOptions`, THE Animation_Variants_Module SHALL produce variants where `container.hidden.opacity` is `0`, `container.visible.opacity` is `1`, `item.hidden.opacity` is `0`, `item.visible.opacity` is `1`, and `item.visible.y` is `0`.
5. FOR ALL calls to `makeFadeUpVariants` with any valid `FadeUpVariantsOptions`, THE Animation_Variants_Module SHALL produce an `item` variant where `item.hidden.y` is a positive number and animated properties are limited to `opacity` and `y` — no `x`, `scale`, `rotate`, `skew`, or CSS filter properties shall appear in any variant.
6. THE Animation_Variants_Module SHALL export a `heroVariants` constant pre-configured with `staggerChildren: 0.18`, `delayChildren: 0.2`, and `item` y offset of `24` for use with `initial/animate` (page-load, not scroll).
7. THE Animation_Variants_Module SHALL export a `defaultViewport` constant equal to `{ once: true, margin: "-50px" }` for use in all `whileInView` calls.

---

### Requirement 2: HeroSection Page-Load Animation

**User Story:** As a site visitor, I want the hero section content to cascade in on page load, so that the page feels polished and immediately engaging when it first appears.

#### Acceptance Criteria

1. WHEN `HeroSection` mounts in the browser, THE HeroSection SHALL animate its `h1`, tagline `div`, and CTA buttons `div` into view using `initial="hidden"` and `animate="visible"` with `heroVariants`.
2. THE HeroSection SHALL use `"use client"` as its first directive to satisfy the React Server Component boundary requirement for Framer Motion.
3. THE HeroSection SHALL NOT apply any `motion.*` wrapper with an `initial="hidden"` state to the background `Image` element or the absolute-positioned overlay `div`.
4. WHEN the three animated children of `HeroSection` are rendered, THE HeroSection SHALL stagger them with a delay of `0.18s` between children and an initial `delayChildren` of `0.2s`.

---

### Requirement 3: ServicesPreviewSection Scroll Animation

**User Story:** As a site visitor, I want the service preview cards to fade up into view as I scroll to them, so that the section feels dynamic rather than static.

#### Acceptance Criteria

1. WHEN `ServicesPreviewSection` enters the viewport, THE ServicesPreviewSection SHALL trigger a `whileInView` animation using `defaultViewport` on the `<section>` wrapper as the stagger container.
2. THE ServicesPreviewSection SHALL wrap each `<Link>` card using `motion.create(Link)` to preserve Next.js `<Link>` semantics while applying the `item` variant.
3. THE ServicesPreviewSection SHALL stagger the two card animations with a `staggerChildren` delay of `0.15s`.

---

### Requirement 4: TestimonialsSection Scroll Animation

**User Story:** As a site visitor, I want the testimonials section heading to fade up as I scroll to it, so that the content reveals gracefully without disrupting the continuous Marquee scroll.

#### Acceptance Criteria

1. WHEN `TestimonialsSection` enters the viewport, THE TestimonialsSection SHALL animate only the heading `<h3>` element using a `motion.h3` with the `item` variant.
2. THE TestimonialsSection SHALL NOT wrap the `<Marquee>` component or any of its children with any `motion.*` element that could interfere with its internal animation loop.

---

### Requirement 5: ServiceAreasSection Scroll Animation

**User Story:** As a site visitor, I want the service areas content to reveal in two coordinated columns as I scroll to that section, so that the layout feels intentional and layered.

#### Acceptance Criteria

1. WHEN `ServiceAreasSection` enters the viewport, THE ServiceAreasSection SHALL animate using two separate `motion.div` stagger containers — one for the left text column and one for the right areas card — rather than a single shared stagger gate.
2. THE ServiceAreasSection SHALL stagger the four children of the left text column independently, and animate the right card as a single fade-up item with a slight delay.

---

### Requirement 6: IntroductionSection Scroll Animation

**User Story:** As a site visitor, I want the introduction section to reveal in layered groups as I scroll to it, so that the badge, headings, images, and service cards each draw attention in sequence.

#### Acceptance Criteria

1. WHEN `IntroductionSection` enters the viewport, THE IntroductionSection SHALL animate the section badge `<p>`, heading `<h2>`, and divider `<div>` as a staggered group of three items.
2. WHEN `IntroductionSection` enters the viewport, THE IntroductionSection SHALL animate the image column and the text column each as individual `motion.div` items.
3. WHEN `IntroductionSection` renders `TaskCard` instances, THE IntroductionSection SHALL wrap each `TaskCard` in a `motion.div variants={item}` with `staggerChildren: 0.15`, and THE `TaskCard` component itself SHALL remain a plain (non-motion) component.

---

### Requirement 7: ServicesIncludeSection Scroll Animation

**User Story:** As a site visitor, I want the services grid to fade into view as I scroll to it, so that the detailed service list appears purposefully rather than abruptly.

#### Acceptance Criteria

1. WHEN `ServicesIncludeSection` enters the viewport, THE ServicesIncludeSection SHALL animate the outer grid container (`rounded-none overflow-hidden shadow-xl` div) as a single fade-up item using `whileInView` with `defaultViewport`.
2. THE ServicesIncludeSection SHALL preserve all existing `onMouseEnter` and `onMouseLeave` event handlers on the grid container without modification.

---

### Requirement 8: ContactCtaSection Scroll Animation

**User Story:** As a site visitor, I want the call-to-action section content to stagger in as I scroll to it, so that the heading, description, and link feel like a purposeful reveal.

#### Acceptance Criteria

1. WHEN `ContactCtaSection` enters the viewport, THE ContactCtaSection SHALL animate its `<h2>`, `<p>`, and CTA `<Link>` as three staggered items using `whileInView` with `defaultViewport`.
2. THE ContactCtaSection SHALL use `"use client"` as its first directive.
3. THE ContactCtaSection SHALL NOT apply any `motion.*` wrapper with an `initial="hidden"` state to the background `Image` element or the absolute-positioned overlay `div`.

---

### Requirement 9: Footer Scroll Animation

**User Story:** As a site visitor, I want the footer columns to subtly stagger in as the footer enters the viewport, so that the page ending feels polished rather than abrupt.

#### Acceptance Criteria

1. WHEN the `Footer` enters the viewport, THE Footer SHALL animate its left column, right column group, and center copyright as three staggered items using `whileInView` with `defaultViewport`.
2. THE Footer SHALL use `"use client"` as its first directive.
3. THE Footer SHALL stagger the three column items with a `staggerChildren` delay of `0.1s`.

---

### Requirement 10: Excluded Component Immutability

**User Story:** As a developer, I want components with existing complex animations to remain completely untouched, so that their carefully crafted behavior is not accidentally disrupted.

#### Acceptance Criteria

1. THE system SHALL make zero changes to `PortfolioList.tsx`, `ProjectCard.tsx`, `ProjectsGallerySection.tsx`, `ComparisonSlider.tsx`, and `FullScreenMenu.tsx` — these files must be byte-for-byte identical before and after the implementation.

---

### Requirement 11: Implementation Consistency Invariants

**User Story:** As a developer, I want all animated components to follow consistent conventions for imports, directives, and class names, so that the codebase is maintainable and predictable.

#### Acceptance Criteria

1. FOR ALL new `motion` imports added to modified files, THE system SHALL import from `"motion/react"` — existing `"framer-motion"` imports in excluded files SHALL remain untouched.
2. FOR ALL `whileInView` calls across all Animated_Components, THE system SHALL pass `viewport={defaultViewport}` where `defaultViewport.once` is `true` and `defaultViewport.margin` is `"-50px"`.
3. FOR ALL modified components, THE system SHALL preserve every `className` string on every DOM element byte-for-byte — only the element tag may change (e.g., `div` → `motion.div`).
4. WHEN any component file imports from `"motion/react"` and uses `motion.*` elements, THE system SHALL ensure that file has `"use client"` as its first line.
