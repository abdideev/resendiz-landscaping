import { IntroductionSection } from "@/components/features/services/IntroductionSection";
import { ServicesIncludeSection } from "@/components/features/services/ServicesIncludeSection";
import { ContactCtaSection } from "@/components/features/services/ContactCtaSection";

export default function Services() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <IntroductionSection />
      <ServicesIncludeSection />
      <ContactCtaSection />
    </main>
  );
}
