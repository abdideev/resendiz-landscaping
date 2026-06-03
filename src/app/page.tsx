import { HeroSection } from "@/components/features/home/HeroSection";
import { ServicesPreviewSection } from "@/components/features/home/ServicesPreviewSection";
import { TestimonialSection } from "@/components/features/home/TestimonialsSection";
function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <HeroSection />
      <ServicesPreviewSection />
      <TestimonialSection />
      
    </main>
  );
}

export default Home;
