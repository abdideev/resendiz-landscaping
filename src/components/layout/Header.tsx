"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { Menu } from "lucide-react";
import Image from "next/image";
import { FullScreenMenu } from "./FullScreenMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-24 transition-all duration-500 ease-in-out ${
          scrolled ? " backdrop-blur-sm shadow-lg" : "bg-transparent"
        }`}
      >
        <Link href="/" className="relative z-50 focus:outline-none">
          <Image
            src="/images/resendiz-landscaping-logo.webp"
            alt="Resendiz Landscaping"
            width={400}
            height={160}
            priority
            className="w-auto h-12 md:h-16 object-contain drop-shadow-md"
          />
        </Link>

        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          className="text-white bg-brand-gold rounded-sm p-2 transition-transform hover:scale-105 focus:outline-none"
        >
          <Menu size={32} strokeWidth={2} />
        </button>
      </header>
      <FullScreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
