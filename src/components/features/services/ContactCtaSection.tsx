import Image from "next/image";
import Link from "next/link";
import { CONTACT_CTA } from "@/constants/cta";

export function ContactCtaSection() {
  const {
    title,
    description,
    buttonLabel,
    buttonHref,
    backgroundImage,
    backgroundAlt,
  } = CONTACT_CTA;

  return (
    <section
      id="contact-cta"
      className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden"
    >
      {/* Imagen de fondo */}
      <Image
        src={backgroundImage}
        alt={backgroundAlt}
        fill
        sizes="100vw"
        className="object-cover"
        priority={false}
      />

      {/* Overlay oscuro para legibilidad del texto */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
            {title}
          </h2>

          <p className="text-base md:text-lg text-white/90 mb-10 leading-relaxed">
            {description}
          </p>

          <Link
            href={buttonHref}
            className="
              inline-block bg-brand-gold text-white
              px-8 py-4 font-semibold tracking-wider uppercase text-sm
              transition-all duration-300
              hover:bg-brand-gold-light hover:shadow-lg hover:-translate-y-0.5
            "
          >
            {buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
