"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { CONTACT_CTA } from "@/constants/cta";
import { makeFadeUpVariants, defaultViewport } from "@/lib/animation-variants";

const MotionLink = motion.create(Link);
const { container, item } = makeFadeUpVariants({ staggerChildren: 0.15 });

export function ContactCtaSection() {
  const {
    title,
    description,
    buttonLabel,
    buttonHref,
    backgroundImage,
    backgroundAlt,
  } = CONTACT_CTA;

  return (
    <section
      id="contact-cta"
      className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden"
    >
      {/* Imagen de fondo */}
      <Image
        src={backgroundImage}
        alt={backgroundAlt}
        fill
        sizes="100vw"
        className="object-cover"
        priority={false}
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="max-w-xl"
        >
          <motion.h2
            variants={item}
            className="text-2xl sm:text-3xl md:text-5xl font-serif text-white mb-6 leading-tight"
          >
            {title}
          </motion.h2>

          <motion.p
            variants={item}
            className="text-base md:text-lg text-white/90 mb-10 leading-relaxed"
          >
            {description}
          </motion.p>

          <MotionLink
            variants={item}
            href={buttonHref}
            className="
              inline-block w-full sm:w-auto text-center
              bg-brand-gold text-white
              px-8 py-4 font-semibold tracking-wider uppercase text-sm
              transition-all duration-300
              hover:bg-brand-gold-light hover:shadow-lg hover:-translate-y-0.5
            "
          >
            {buttonLabel}
          </MotionLink>
        </motion.div>
      </div>
    </section>
  );
}
