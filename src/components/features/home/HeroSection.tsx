import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative h-screen min-h-[600px] w-full flex items-center justify-center text-center px-4 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-background2.webp"
          alt="Premium Landscaping in Loudoun County"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[0.8px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto mt-16 md:mt-24">
        <h1 className="text-white font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight mb-6 drop-shadow-lg">
          Premium Landscaping Services
          <br />
          in Loudoun County, VA
        </h1>

        <div className="flex items-center gap-4 text-white text-lg md:text-3xl font-serif mb-12 drop-shadow-md">
          <span>design</span>
          <span className="text-brand-gold-light">|</span>
          <span>build</span>
          <span className="text-brand-gold-light">|</span>
          <span>maintain</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <Link
            href="#services"
            className="flex items-center justify-center w-[260px] md:w-[280px] bg-[#7A5A12] hover:bg-[#916B16] text-white font-sans text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase py-3.5 md:py-4 transition-all duration-300 hover:scale-105 rounded-xs"
          >
            Contact
          </Link>
          <Link
            href="#"
            className="flex items-center justify-center w-[260px] md:w-[280px] bg-[#072A1B] hover:bg-[#0A3D27] text-white font-sans text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase py-3.5 md:py-4 transition-all duration-300 hover:scale-105 rounded-xs"
          >
            Call Now
          </Link>
        </div>
      </div>
    </section>
  );
}
