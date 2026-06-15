"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import EstimateForm from "@/components/features/estimate/EstimateForm";
import { motion } from "motion/react";

export default function EstimatePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full bg-brand-dark pt-32 md:pt-40 pb-16 px-4 overflow-hidden">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        className="w-full max-w-2xl mx-auto"
      >
        <motion.button
          type="button"
          onClick={() => router.push("/services")}
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{
            y: -2,
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.95,
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
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ willChange: "transform" }}
        >
          <EstimateForm />
        </motion.div>
      </motion.div>
    </main>
  );
}
