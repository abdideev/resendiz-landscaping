"use client";

import Link from "next/link";
import { X } from "lucide-react";

const navLinks = [
  { label: "HOME", href: "/#home" },
  { label: "SERVICES", href: "/services" },
  { label: "PORTFOLIO", href: "/#portfolio" },
  { label: "REVIEWS", href: "/#reviews" },
  { label: "AREAS", href: "/#areas" },
];

const socialLinks = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@resendizlandscaping2?_r=1&_t=ZP-96mXubVkAAh",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1EAesmBzX2/?mibextid=wwXIfr",
  },
  {
    label: "Nextdoor",
    href: "https://nextdoor.com/page/resendiz-landscaping-leesburg-va?share_platform=3&utm_campaign=1780110639176&share_action_id=c919d3b5-74ef-4816-9651-43a3c8ad3b61",
  },
];

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-black/80 backdrop-blur-md transition-opacity duration-500 ease-in-out ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={onClose}
        aria-label="Close navigation menu"
        className="absolute top-8 right-6 md:right-12 text-white hover:text-brand-gold-light p-2 transition-colors focus:outline-none"
      >
        <X size={40} strokeWidth={1} />
      </button>

      <nav className="flex flex-col items-center w-full mt-[-5vh]">
        <ul className="flex flex-col items-center gap-2 md:gap-2 list-none">
          {navLinks.map((link, i) => (
            <li key={link.href} className="overflow-hidden">
              <Link
                href={link.href}
                replace
                onClick={onClose}
                className="relative inline-block pb-2 font-serif text-5xl md:text-7xl text-white/80 hover:text-white tracking-normal uppercase transition-all duration-300 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:bg-brand-gold-light after:w-0 hover:after:w-full after:transition-all after:duration-300 after:ease-in-out"
                style={{
                  transform: isOpen ? "translateY(0)" : "translateY(100%)",
                  transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.05}s`,
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div
          className="absolute bottom-12 flex flex-col items-center gap-4 transition-opacity duration-700 delay-300"
          style={{ opacity: isOpen ? 1 : 0 }}
        >
          <div className="flex gap-4 md:gap-6 text-brand-gold-light font-serif text-2xl md:text-2xl">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-light transition-all duration-300 hover:scale-110 inline-block"
              >
                {social.label}
              </Link>
            ))}
          </div>

          <a
            href="tel:+15719197885"
            className="text-brand-gold-light hover:text-gold-light font-serif text-3xl md:text-3xl font-bold tracking-normal leading-[48px] transition-all duration-300 hover:scale-110 inline-block mt-2"
          >
            571-919-7885
          </a>
        </div>
      </nav>
    </div>
  );
}
