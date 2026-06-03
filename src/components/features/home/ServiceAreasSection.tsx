import { MapPin } from "lucide-react";

export function ServiceAreasSection() {
  const areas = [
    "Leesburg",
    "Waterford",
    "Lovettsville",
    "Purcellville",
    "Hamilton",
  ];

  return (
    <section
      id="areas"
      className="w-full bg-background py-32 px-6 md:px-12 lg:px-16"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Contenido izquierdo */}
        <div className="flex-1 flex flex-col gap-6">
          <h3 className="text-brand-gold font-sans font-medium uppercase tracking-[0.2em] leading-3 text-sm md:text-base">
            Where We Serve
          </h3>
          <h2 className="text-brand-green text-5xl lg:text-6xl font-serif leading-[52px]">
            Proudly Serving Northern Virginia
          </h2>

          <p className="text-gray-600 text-base leading-6 font-sans">
            We bring premium landscaping craftsmanship to estates and luxury 
            residences across Loudoun County&apos;s most prestigious
            communities.
          </p>
        </div>

        {/* Contenido derecho */}
        <div className="w-full max-w-[520px] justify-self-end bg-white rounded-sm border border-gray-100 p-10 shadow-md">
          {areas.map((area, index) => {
            return (
              <div key={area}>
                <div className="flex items-center gap-4 py-5">
                  <MapPin
                    className="w-5 h-5 text-brand-gold-light flex-shrink-0"
                    strokeWidth={2}
                  />
                  <h2 className="text-black text-3xl font-medium font-serif transition-all duration-300 hover:scale-105 cursor-default">
                    {area}
                  </h2>
                </div>

                {index !== areas.length - 1 && (
                  <div className="ml-8 border-b border-brand-gold/20" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
