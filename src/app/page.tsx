import { HeroSection } from "@/components/features/home/HeroSection";
import { ServicesPreviewSection } from "@/components/features/home/ServicesPreviewSection";
import { TestimonialSection } from "@/components/features/home/TestimonialsSection";
import { ServiceAreasSection } from "@/components/features/home/ServiceAreasSection";
import { LawnCareSection } from "@/components/features/home/LawnCareSection";

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <HeroSection />
      <ServicesPreviewSection />
      <TestimonialSection />
      <LawnCareSection />
      <ServiceAreasSection />
    </main>
  );
}

export default Home;
