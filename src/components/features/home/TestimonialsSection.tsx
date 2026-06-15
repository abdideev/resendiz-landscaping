"use client";

import { motion } from "motion/react";
import { makeFadeUpVariants, defaultViewport } from "@/lib/animation-variants";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { TESTIMONIALS as testimonials } from "@/constants/testimonials";
import { User } from "lucide-react";

const { item } = makeFadeUpVariants();

const review = testimonials;
const firstRow = testimonials.slice(0, testimonials.length / 2);
const secondRow = testimonials.slice(testimonials.length / 2);

const ReviewCard = ({
  id,
  name,
  location,
  body,
}: {
  id: string;
  name: string;
  location: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-[292.59px] w-[280px] md:w-[362px] cursor-pointer overflow-hidden rounded-sm border p-6 md:p-8 bg-white border-[#D9D9D9] shadow-xs",
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-gold border border-gray-200">
          <User size={18} className="text-white" />
        </div>

        <div className="flex flex-col">
          <figcaption className="text-base font-bold text-black leading-6 font-inter">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-gray-500 leading-5 font-inter">
            {location}
          </p>
        </div>
      </div>
      <blockquote className="mt-6 md:mt-8 text-md font-serif text-gray-700 leading-relaxed">
        {body}
      </blockquote>
      <div className="w-12 h-[1px] bg-gray-200 mt-4" />
    </figure>
  );
};

export function TestimonialSection() {
  return (
    <section
      id="reviews"
      className="w-full bg-background py-20 md:py-32 px-4 md:px-12 flex flex-col items-center"
    >
      <motion.h3
        variants={item}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="text-brand-gold font-sans font-medium tracking-[2.40px] leading-3 uppercase text-sm md:text-base mb-12 md:mb-16 text-center"
      >
        Client Testimonials
      </motion.h3>
      <motion.div
        initial={{
          opacity: 0,
          y: 60,
          scale: 0.98,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={defaultViewport}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative flex w-full flex-col items-center justify-center overflow-hidden"
      >
        <Marquee pauseOnHover className="[--duration:50s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:50s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </Marquee>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-8 md:w-48 bg-gradient-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-8 md:w-48 bg-gradient-to-l"></div>
      </motion.div>
    </section>
  );
}
