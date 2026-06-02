import type { Metadata } from "next";
import { Jost, Scheherazade_New } from "next/font/google";
import "./globals.css";

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
      className={`${jost.variable} ${scheherazade.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
