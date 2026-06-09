import Image from "next/image";
import Link from "next/link";

export function ServicesPreviewSection() {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 bg-background h-[80vh] min-h-[600px] md:h-[600px]">
      <Link
        href="/services"
        className="relative group overflow-hidden h-full flex items-center justify-center cursor-pointer"
        aria-label="Navigate to our services"
      >
        <Image
          src="/images/bg-services1.webp"
          alt="Our Landscaping Services"
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          quality={75}
        />
        <div className="absolute inset-0 bg-black/60 transition-colors duration-500 group-hover:bg-black/30 backdrop-blur-[0.8px]" />

        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-white font-serif text-5xl md:text-6xl tracking-wide pb-2 drop-shadow-lg after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:bg-brand-gold-light after:w-0 group-hover:after:w-full after:transition-all after:duration-300 after:ease-in-out">
            Our Services
          </h2>
        </div>
      </Link>

      <Link
        href="portfolio"
        className="relative group overflow-hidden h-full flex items-center justify-center cursor-pointer"
        aria-label="Navigate to our portfolio"
      >
        <Image
          src="/images/bg-projects1.webp"
          alt="View Our Landscaping Projects"
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          quality={75}
        />
        <div className="absolute inset-0 bg-black/60 transition-colors duration-500 group-hover:bg-black/30 backdrop-blur-[0.8px]" />

        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-white font-serif text-5xl md:text-6xl tracking-wide pb-2 drop-shadow-lg after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:bg-brand-gold-light after:w-0 group-hover:after:w-full after:transition-all after:duration-300 after:ease-in-out">
            View Projects
          </h2>
        </div>
      </Link>
    </section>
  );
}
