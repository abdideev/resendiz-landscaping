import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Jost, Scheherazade_New, Geist, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({ variable: "--font-inter" });

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
  metadataBase: new URL("https://www.resendiz-landscaping.com"),
  title: {
    default: "Resendiz Landscaping | Premium Lawn Care in VA",
    template: "%s | Resendiz Landscaping LLC",
  },
  description:
    "Professional landscaping, mulch, lawn maintenance, and cleanups in Northern Virginia.",

  keywords: [
    "landscaping",
    "lawn care",
    "mulch",
    "lawn maintenance",
    "Northern Virginia",
    "VA",
    "cleanups",
  ],

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.resendiz-landscaping.com/",
    title: "Resendiz Landscaping LLC | Premium Lawn Care in VA",
    description:
      "Professional landscaping, mulch, lawn maintenance, and cleanups in Northern Virginia.",
    siteName: "Resendiz Landscaping LLC",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Resendiz Landscaping LLC Services",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Resendiz Landscaping LLC | Premium Lawn Care in VA",
    description:
      "Professional landscaping, mulch, lawn maintenance, and cleanups in Northern Virginia.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        jost.variable,
        scheherazade.variable,
        inter.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="min-h-full flex flex-col font-sans bg-[var(--background)] text-[var(--foreground)]">
        <div className="relative z-[99999] isolate">
          <Header />
        </div>

        <main className="relative z-0 flex-1 flex flex-col">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
