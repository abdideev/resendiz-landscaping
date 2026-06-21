"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { SERVICES_INCLUDE } from "@/constants/services-include";
import { useAutoCarousel } from "@/hooks/useAutoCarousel";
import { makeFadeUpVariants, defaultViewport } from "@/lib/animation-variants";

const { item } = makeFadeUpVariants();

export function ServicesIncludeSection() {
  const [isPaused, setIsPaused] = useState(false);

  const { activeIndex, setActiveIndex } = useAutoCarousel({
    itemCount: SERVICES_INCLUDE.length,
    intervalMs: 2500,
    paused: isPaused,
  });

  const activeService = SERVICES_INCLUDE[activeIndex];

  return (
    <section
      id="services-include"
      className="relative w-full py-20 px-4 md:px-8 lg:px-12 bg-brand-cream"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 md:grid-cols-2 rounded-none overflow-hidden shadow-xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Lado izquierdo: lista de servicios */}
          <div className="bg-[#1B1B1B] p-8 md:p-14 flex flex-col justify-center">
            <h2 className="text-2xl md:text-5xl font-serif text-[#D4AF37] mb-6 md:mb-8">
              Our Services Include
            </h2>

            <ul className="space-y-2 md:space-y-3">
              {SERVICES_INCLUDE.map((service, index) => {
                const isActive = index === activeIndex;

                return (
                  <li key={service.id}>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`
                        text-left font-serif text-lg md:text-2xl
                        pl-0 md:pl-16
                        transition-all duration-500 ease-out
                        ${
                          isActive
                            ? "text-[#D4AF37] md:translate-x-2"
                            : "text-white/70 hover:text-white"
                        }
                      `}
                    >
                      {service.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative aspect-square md:aspect-auto md:min-h-[480px]">
            {SERVICES_INCLUDE.map((service, index) => (
              <Image
                key={service.id}
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="100vw"
                className={`
                  object-cover transition-opacity duration-700 ease-in-out
                  ${index === activeIndex ? "opacity-100" : "opacity-0"}
                `}
                priority={index === 0}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
