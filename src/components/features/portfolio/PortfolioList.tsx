"use client";

import {
  PORTFOLIO_PROJECTS,
  PORTFOLIO_VISIBLE_COUNT,
} from "@/constants/portfolio";
import { ProjectCard } from "@/components/features/portfolio/ProjectCard";
import { usePortfolioPagination } from "@/hooks/usePortfolioPagination";
import { motion, Variants, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SCROLL_TARGET_ID = "portfolio";

const headerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.25, 1, 0.5, 1] },
  },
};

const pageContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.1 },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.25, 1, 0.5, 1] },
  },
};

export function PortfolioList() {
  const { page, pageCount, visibleItems, canGoNext, canGoPrev, next, prev } =
    usePortfolioPagination(PORTFOLIO_PROJECTS, PORTFOLIO_VISIBLE_COUNT, {
      scrollTargetId: SCROLL_TARGET_ID,
    });

  const currentPageNumber = page + 1;

  return (
    <section
      id={SCROLL_TARGET_ID}
      className="relative w-full py-16 px-4 md:px-8 lg:px-12 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto text-center mb-4"
        >
          <motion.p
            variants={headerItemVariants}
            className="text-brand-gold font-sans font-medium uppercase tracking-[0.2em] leading-3 text-sm md:text-base"
          >
            OUR WORK
          </motion.p>
          <motion.h2
            variants={headerItemVariants}
            className="text-6xl md:text-8xl font-serif mb-6 text-brand-green"
          >
            Portfolio
          </motion.h2>
          <motion.div
            variants={headerItemVariants}
            className="w-32 h-px bg-gray-300 my-16 justify-center mx-auto"
          />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            variants={pageContainerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="flex flex-col gap-8"
          >
            {visibleItems.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                cardVariants={cardItemVariants}
                fromPage={currentPageNumber}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {pageCount > 1 && (
          <div className="flex items-center justify-center gap-6 mt-4">
            <button
              type="button"
              onClick={prev}
              disabled={!canGoPrev}
              aria-label="Proyectos anteriores"
              className="flex items-center gap-2 px-6 py-3 font-sans text-sm tracking-widest uppercase border border-brand-green text-brand-green transition-colors duration-200 hover:bg-brand-green hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Atrás
            </button>

            <span className="font-sans text-sm text-gray-500 tabular-nums">
              {currentPageNumber} / {pageCount}
            </span>

            <button
              type="button"
              onClick={next}
              disabled={!canGoNext}
              aria-label="Siguientes proyectos"
              className="flex items-center gap-2 px-6 py-3 font-sans text-sm tracking-widest uppercase bg-brand-green text-white transition-colors duration-200 hover:bg-[#0c3d28] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              Siguiente
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
