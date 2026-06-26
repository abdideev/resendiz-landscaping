"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "motion/react";
import { PortfolioItem } from "@/types/portfolio";

interface ProjectCardProps {
  project: PortfolioItem;
  cardVariants: Variants;
  /** Página actual del listado (1-indexed), para poder volver al mismo lugar */
  fromPage?: number;
}

const textContentVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const MotionLink = motion.create(Link);

export function ProjectCard({ project, cardVariants, fromPage }: ProjectCardProps) {
  const href =
    fromPage && fromPage > 1
      ? `/portfolio/${project.id}?from=${fromPage}`
      : `/portfolio/${project.id}`;

  return (
    <MotionLink
      key={project.id}
      href={href}
      variants={cardVariants}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ willChange: "transform" }}
      className="relative w-full h-80 md:h-85 overflow-hidden group cursor-pointer block rounded-xs border-neutral-200 shadow-lg"
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        priority
        quality={75}
        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col md:flex-row justify-between md:items-end gap-6">
        <motion.div variants={textContentVariants}>
          <h3 className="text-white font-serif text-3xl md:text-4xl">
            {project.title}
          </h3>
          <p className="text-white/80 font-sans font-light mt-2">
            {project.service}
          </p>
        </motion.div>

        <motion.div
          variants={textContentVariants}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          style={{ willChange: "transform" }}
          className="bg-[#072A1B] text-white px-6 py-3 font-sans text-sm tracking-widest uppercase self-start md:self-auto cursor-pointer transition-colors duration-200 hover:bg-[#0c3d28]"
        >
          VIEW PROJECT →
        </motion.div>
      </div>
    </MotionLink>
  );
}