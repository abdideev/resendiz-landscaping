"use client";

import { use } from "react";
import { useRouter, notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { ComparisonSlider } from "@/components/ui/ComparisonSlider";
import { PORTFOLIO_PROJECTS } from "@/constants/portfolio";
import { ProjectsGallerySection } from "@/components/features/portfolio/ProjectsGallerySection";

export default function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  const { id } = use(params);

  const project = PORTFOLIO_PROJECTS.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.button
          type="button"
          onClick={() => router.push("/portfolio")}
          whileHover={{
            y: -2,
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.95,
          }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 24,
          }}
          style={{ willChange: "transform" }}
          className="inline-flex items-center gap-2 mb-12 text-xs font-semibold tracking-widest uppercase text-brand-black pb-1 transition-colors relative group hover:text-brand-gold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />

          <span className="group-hover:after:w-full after:w-0 after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:bg-brand-gold-light after:transition-all after:duration-300 after:ease-in-out">
            Go Back
          </span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="text-center mb-12"
        >
          <p className="text-brand-gold font-sans font-medium uppercase tracking-[0.2em] leading-3 text-sm mb-4">
            TRANSFORMATIONS
          </p>

          <h1 className="text-5xl md:text-6xl font-serif text-brand-green mb-2">
            {project.title}
          </h1>

          <p className="text-gray-500 font-sans font-light">
            {project.service}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{
          scale: 1.12,
          opacity: 0,
          y: 20,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.2,
        }}
        className="w-full px-4 sm:px-8 lg:px-0 max-w-275 mx-auto mb-24 shadow-2xl"
        style={{ willChange: "transform" }}
      >
        <ComparisonSlider
          beforeImage={project.beforeImage}
          afterImage={project.afterImage}
          autoAnimate={true}
          animateDelay={800}
          animateDuration={5}
        />
      </motion.div>

      <motion.div
        id="gallery-section"
        initial={{
          opacity: 0,
          y: 80,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="max-w-6xl mx-auto px-6 md:px-12"
      >
        <ProjectsGallerySection images={project.gallery} />
      </motion.div>
    </main>
  );
}
