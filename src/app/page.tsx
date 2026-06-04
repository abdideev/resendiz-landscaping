import { HeroSection } from "@/components/features/home/HeroSection";
import { ServicesPreviewSection } from "@/components/features/home/ServicesPreviewSection";
import { TestimonialSection } from "@/components/features/home/TestimonialsSection";
import { ServiceAreasSection } from "@/components/features/home/ServiceAreasSection";
import { IntroductionSection } from "@/components/features/services/IntroductionSection";

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <HeroSection />
      <ServicesPreviewSection />
      <TestimonialSection />
      <ServiceAreasSection />
      <IntroductionSection />
    </main>
  );
}

export default Home;
