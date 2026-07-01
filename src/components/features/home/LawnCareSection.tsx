"use client";

import { motion } from "motion/react";
import { makeFadeUpVariants, defaultViewport } from "@/lib/animation-variants";
import DomeGallery from "@/components/ui/DomeGallery";

const LAWN_IMAGES = [
  {
    src: "https://vsvwckoszrikdlnbixdi.supabase.co/storage/v1/object/public/portfolio/fall-cleanup-shrub-trimming-taylorstown/fall-cleanup-shrub-trimming-after.webp",
    alt: "Fall cleanup and shrub trimming after service",
  },
  {
    src: "https://vsvwckoszrikdlnbixdi.supabase.co/storage/v1/object/public/portfolio/fall-cleanup-shrub-trimming-taylorstown/clean-planting-beds-leaves-removal.webp",
    alt: "Clean planting beds and leaves removal",
  },
  {
    src: "https://vsvwckoszrikdlnbixdi.supabase.co/storage/v1/object/public/portfolio/gravel-drainage-installation-waterford/gravel-drainage-before-installation.webp",
    alt: "Gravel drainage before installation",
  },
  {
    src: "https://vsvwckoszrikdlnbixdi.supabase.co/storage/v1/object/public/portfolio/leaf-removal-fall-cleanup-lucketts/leaf-removal-fall-cleanup-lucketts-main.webp",
    alt: "Leaf removal and fall cleanup main project",
  },
  {
    src: "https://vsvwckoszrikdlnbixdi.supabase.co/storage/v1/object/public/portfolio/mulch-installation-taylorstown/mulch-installation-process-03.webp",
    alt: "Mulch installation process step three",
  },
  {
    src: "https://vsvwckoszrikdlnbixdi.supabase.co/storage/v1/object/public/portfolio/pool-landscape-renovation-sod-round-hill/pool-renovation-work-process.webp",
    alt: "Pool landscape renovation and sod work process",
  },
  {
    src: "https://vsvwckoszrikdlnbixdi.supabase.co/storage/v1/object/public/portfolio/premium-leaf-mulch-installation-leesburg-va/premium-leaf-mulch-installation-leesburg-va-02.webp",
    alt: "Premium leaf mulch installation in Leesburg VA step two",
  },
];

const { container, item } = makeFadeUpVariants({ staggerChildren: 0.12 });

export function LawnCareSection() {
  return (
    <section
      id="lawn-care"
      className="w-full bg-background py-24 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 lg:items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-1 w-full h-[380px] md:h-[480px] lg:h-[580px] rounded-sm overflow-hidden"
        >
          <DomeGallery
            images={LAWN_IMAGES}
            fit={0.6}
            minRadius={280}
            maxVerticalRotationDeg={10}
            segments={22}
            dragDampening={0}
            grayscale={false}
            overlayBlurColor="#F5F6F0"
            imageBorderRadius="14px"
            openedImageBorderRadius="14px"
            openedImageWidth="320px"
            openedImageHeight="240px"
          />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="order-1 lg:order-2 flex flex-col gap-0"
        >
          <motion.p
            variants={item}
            className="text-brand-gold font-sans font-medium uppercase tracking-[0.2em] text-sm md:text-base mb-4"
          >
            Lawn Services
          </motion.p>

          <motion.h2
            variants={item}
            className="text-brand-green text-5xl lg:text-6xl font-serif leading-tight mb-6"
          >
            Expert Mowing &amp; Lawn Care
          </motion.h2>

          <motion.p
            variants={item}
            className="text-gray-600 text-base leading-7 font-sans"
          >
            A perfectly cut lawn is the foundation of every beautiful property.
            We deliver consistent, detail‑oriented mowing services tailored to
            the unique needs of each estate across Northern Virginia.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
