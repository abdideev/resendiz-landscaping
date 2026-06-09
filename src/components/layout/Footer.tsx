import Image from "next/image";
import Link from "next/link";

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

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Areas", href: "/#areas" },
];

export function Footer() {
  return (
    <footer className="w-full bg-bg-black py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-12 lg:gap-12 lg:items-center">
        {/* Columna Izquierda */}
        <div className="flex flex-col gap-6 order-1 lg:order-1 items-start">
          <Link href="/" className="relative z-50 focus:outline-none">
            <Image
              src="/images/resendiz-landscaping-logo.webp"
              alt="Resendiz Landscaping"
              width={400}
              height={160}
              priority
              className="w-auto h-16 md:h-20 object-contain drop-shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </Link>
          <div className="flex flex-col gap-4 mt-2">
            <a
              href="tel:+15719197885"
              className="text-white/90 text-sm font-normal font-sans tracking-wide hover:text-brand-gold-light transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer inline-block"
            >
              571-919-7885
            </a>
            <p className="text-white/90 text-sm font-normal font-sans tracking-wide leading-relaxed">
              Available Hours <br />
              Monday-Saturday 08:00 AM - 17:00 PM
            </p>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="flex flex-row justify-start lg:justify-end gap-16 md:gap-24 order-2 lg:order-3 w-full">
          <div className="flex flex-col gap-6">
            <h3 className="text-brand-gold-light font-serif font-bold text-xl tracking-wide leading-4 uppercase">
              EXPLORE
            </h3>
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    replace
                    className="text-white text-sm font-sans font-normal tracking-wider hover:text-brand-gold-light transition-all duration-300 ease-in-out hover:scale-105 uppercase inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-brand-gold-light font-serif font-bold text-xl tracking-wide leading-4 uppercase">
              FOLLOW US
            </h3>
            <ul className="flex flex-col gap-4">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-sm font-sans font-normal tracking-wider hover:text-brand-gold-light transition-all duration-300 ease-in-out hover:scale-105 uppercase inline-block"
                  >
                    {social.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Columna Central */}
        <div className="flex flex-col lg:flex-row justify-start lg:justify-center text-left lg:text-center order-3 lg:order-2 w-full pt-8 lg:pt-0 border-t border-white/10 lg:border-none mt-2 lg:mt-0">
          <p className="text-brand-gold-light text-sm font-light font-sans tracking-wide leading-relaxed">
            © 2026 Resendiz Landscaping LLC <br className="block lg:hidden" />
            <span className="hidden lg:inline"> · </span>
            Powered by A&I Software.
          </p>
        </div>
      </div>
    </footer>
  );
}
