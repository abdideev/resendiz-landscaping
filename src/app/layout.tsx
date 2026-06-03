import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Jost, Scheherazade_New, Geist, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({variable:'--font-inter'});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const scheherazade = Scheherazade_New({
  variable: "--font-scheherazade",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Resendiz Landscaping LLC | Premium Lawn Care in VA",
  description:
    "Professional landscaping, mulch, lawn maintenance, and cleanups in Northern Virginia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", jost.variable, scheherazade.variable, inter.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col font-sans bg-[var(--background)] text-[var(--foreground)]">
        
        <div className="relative z-[99999] isolate">
          <Header />
        </div>

        <div className="relative z-0">
          {children}
        </div>

      </body>
    </html>
  );
}
