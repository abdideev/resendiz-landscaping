import { HeroSection } from "@/components/features/home/HeroSection";
import { ServicesPreviewSection } from "@/components/features/home/ServicesPreviewSection";
function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <HeroSection />
      <ServicesPreviewSection />
    </main>
  );
}

export default Home;
