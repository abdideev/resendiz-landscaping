"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { TaskCard } from "@/components/ui/TaskCard";
import { TASK_PILLARS } from "@/constants/tasks";
import { makeFadeUpVariants, defaultViewport } from "@/lib/animation-variants";

const { container: headerContainer, item: headerItem } = makeFadeUpVariants({ staggerChildren: 0.12 });
const { item } = makeFadeUpVariants();
const { container: cardContainer } = makeFadeUpVariants({ staggerChildren: 0.15 });

export function IntroductionSection() {
  return (
    <section
      id="services"
      className="relative w-full py-16 px-4 md:px-8 lg:px-12"
    >
      <motion.div variants={headerContainer} initial="hidden" whileInView="visible" viewport={defaultViewport} className="max-w-5xl mx-auto text-center">
        <motion.p variants={headerItem} className="text-brand-gold font-sans font-medium uppercase tracking-[0.2em] text-sm md:text-base">
          OUR EXPERTISE
        </motion.p>
        <motion.h2 variants={headerItem} className="text-brand-green text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif mb-6">
          Services
        </motion.h2>
        <motion.div variants={headerItem} className="max-w-2xl w-full h-px bg-gray-300 my-10 md:my-16 mx-auto" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-full mx-auto text-left">
          <motion.div variants={item} initial="hidden" whileInView="visible" viewport={defaultViewport}>
            <div className="relative w-full aspect-[4/3] rounded-none overflow-hidden shadow-lg">
              <Image
                src="/images/services.webp"
                alt="Landscaping services preview"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>
          <motion.div variants={item} initial="hidden" whileInView="visible" viewport={defaultViewport}>
            <div className="flex flex-col justify-center gap-6 md:gap-10">
              <p className="font-serif text-2xl md:text-4xl font-normal leading-tight text-[#003527] text-bg-black">
                Providing a{" "}
                <span className="font-bold text-brand-green">
                  full range of services
                </span>{" "}
                means that we see the project{" "}
                <span className="font-bold text-brand-green">
                  all the way through
                </span>
              </p>
              <p className="text-base md:text-lg font-serif text-neutral-700">
                From the initial concept to scheduled maintenance as it matures,
                our comprehensive approach enables you, the customer, to relax and
                enjoy the process while we handle every aspect of the project.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div variants={cardContainer} initial="hidden" whileInView="visible" viewport={defaultViewport} className="pt-20 md:pt-36 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 justify-items-center">
          {TASK_PILLARS.map((task) => (
            <motion.div variants={item} key={task.id}>
              <TaskCard key={task.id} task={task} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
