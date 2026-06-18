"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { heroVariants } from "@/lib/animation-variants";

export function HeroSection() {
  const MotionLink = motion.create(Link);

  return (
    <section
      id="home"
      className="relative h-screen min-h-[600px] w-full flex items-center justify-center text-center px-4 overflow-hidden"
    >
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
        style={{ willChange: "transform" }}
      >
        <Image
          src="/images/hero-background2.webp"
          alt="Premium Landscaping in Loudoun County"
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/50 backdrop-blur-[0.8px]" />
      </motion.div>

      <motion.div
        variants={heroVariants.container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center max-w-5xl mx-auto mt-16 md:mt-24"
      >
        <motion.h1
          variants={heroVariants.item}
          className="text-white font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight mb-6 drop-shadow-lg"
        >
          Premium Landscaping Services
          <br />
          in Loudoun County, VA
        </motion.h1>

        <motion.div
          variants={heroVariants.item}
          className="flex items-center gap-4 text-white text-lg md:text-3xl font-serif mb-12 drop-shadow-md"
        >
          <span>design</span>
          <span className="text-brand-gold-light">|</span>
          <span>build</span>
          <span className="text-brand-gold-light">|</span>
          <span>maintain</span>
        </motion.div>

        <motion.div
          variants={heroVariants.item}
          className="flex flex-col items-center justify-center gap-4 w-full"
        >
          <MotionLink
            href="/estimate"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
            style={{ willChange: "transform" }}
            className="flex items-center justify-center w-[260px] md:w-[280px] bg-brand-gold hover:bg-brand-gold-light text-white font-sans text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase py-3.5 md:py-4 transition-colors duration-200 rounded-xs"
          >
            Contact
          </MotionLink>
          <MotionLink
            href="tel:+15719197885"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
            style={{ willChange: "transform" }}
            className="flex items-center justify-center w-[260px] md:w-[280px] bg-[#072A1B] hover:bg-[#0A3D27] text-white font-sans text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase py-3.5 md:py-4 transition-colors duration-200 rounded-xs"
          >
            Call Now
          </MotionLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
