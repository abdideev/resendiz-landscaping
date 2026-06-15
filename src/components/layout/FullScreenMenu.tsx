"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "SERVICES", href: "/services" },
  { label: "PORTFOLIO", href: "/portfolio" },
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 1.04,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.02,
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-black/80 backdrop-blur-md"
        >
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            aria-label="Close navigation menu"
            initial={{
              opacity: 0,
              rotate: -90,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            whileHover={{
              rotate: 90,
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.9,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
            className="absolute top-8 right-6 md:right-12 text-white hover:text-brand-gold-light p-2 focus:outline-none"
          >
            <X size={40} strokeWidth={1} />
          </motion.button>

          <nav className="flex flex-col items-center w-full mt-[-5vh]">
            <ul className="flex flex-col items-center gap-2 list-none">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{
                    opacity: 0,
                    y: 80,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.15 + i * 0.06,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <motion.div
                    whileHover={{
                      x: 6,
                      scale: 1.015,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                  >
                    <Link
                      href={link.href}
                      replace
                      onClick={onClose}
                      className="relative inline-block pb-2 font-serif text-5xl md:text-7xl text-white/80 hover:text-white uppercase transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:bg-brand-gold-light after:w-0 hover:after:w-full after:transition-all after:duration-300"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.55,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute bottom-12 flex flex-col items-center gap-4"
            >
              <div className="flex gap-4 md:gap-6 text-brand-gold-light font-serif text-2xl">
                {socialLinks.map((social) => (
                  <motion.div
                    key={social.label}
                    whileHover={{
                      y: -3,
                      scale: 1.08,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="tel:+15719197885"
                whileHover={{
                  y: -3,
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="text-brand-gold-light font-serif text-3xl font-bold tracking-normal leading-[48px] mt-2"
              >
                571-919-7885
              </motion.a>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
