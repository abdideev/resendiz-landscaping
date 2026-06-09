"use client";

import { PORTFOLIO_PROJECTS } from "@/constants/portfolio";
import { ProjectCard } from "@/components/features/portfolio/ProjectCard";
import { motion, Variants } from "motion/react";

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.25, 1, 0.5, 1],
      delayChildren: 0.25,
      staggerChildren: 0.1,
    },
  },
};

export function PortfolioList() {
  return (
    <section
      id="portfolio"
      className="relative w-full py-16 px-4 md:px-8 lg:px-12 overflow-hidden"
    >
      <motion.div
        variants={cardContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto flex flex-col gap-8"
      >
        <motion.div
          variants={cardItemVariants}
          className="max-w-5xl mx-auto text-center mb-4"
        >
          <p className="text-brand-gold font-sans font-medium uppercase tracking-[0.2em] leading-3 text-sm md:text-base">
            OUR WORK
          </p>
          <h2 className="text-6xl md:text-8xl font-serif mb-6 text-brand-green">
            Portfolio
          </h2>
          <div className="w-32 h-px bg-gray-300 my-16 justify-center mx-auto" />
        </motion.div>

        {PORTFOLIO_PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            cardVariants={cardItemVariants}
          />
        ))}

      </motion.div>
    </section>
  );
}
