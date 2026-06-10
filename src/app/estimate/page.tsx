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
          className="inline-flex items-center gap-2 mb-6 text-xs font-semibold tracking-widest uppercase text-black border-b border-black/70 pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>

        {/* El formulario, ya sin el Go Back adentro */}
        <EstimateForm />
      </div>
    </main>
  );
}
