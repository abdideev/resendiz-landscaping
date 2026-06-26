import { Suspense } from "react";
import { PortfolioList } from "@/components/features/portfolio/PortfolioList";

export default function Portfolio() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <Suspense fallback={null}>
        <PortfolioList />
      </Suspense>
    </main>
  );
}