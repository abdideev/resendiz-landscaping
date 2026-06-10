"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import EstimateForm from "@/components/features/estimate/EstimateForm";

export default function EstimatePage() {
  const router = useRouter();
  return (
    <main className="min-h-screen w-full bg-brand-dark pt-32 md:pt-40 pb-16 px-4">
      <div className="w-full max-w-2xl mx-auto">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 mb-6 text-xs font-semibold tracking-widest uppercase text-black pb-1 transition-colors relative group hover:text-brand-gold cursor-pointer"
        >
       
          <ArrowLeft className="w-4 h-4" />

          <span className="group-hover:after:w-full after:w-0 after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:bg-brand-gold-light after:transition-all after:duration-300 after:ease-in-out">
            Go Back
          </span>
        </button>

        {/* El formulario, ya sin el Go Back adentro */}
        <EstimateForm />
      </div>
    </main>
  );
}
