import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SponsorsStrip = ({ heading, note, logos = [], sizeOverrides = {} }) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Animate header
      gsap.fromTo(
        ".sponsors-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".sponsors-header",
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate logo boxes in batch
      const logoItems = gsap.utils.toArray(".sponsor-logo-item");
      logoItems.forEach((logo) => {
        gsap.fromTo(
          logo,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: logo,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="container mx-auto px-4 sm:px-6 max-w-5xl py-8 sm:py-12"
    >
      <div className="sponsors-header opacity-0 text-center mb-4 sm:mb-6">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          {heading}
        </h2>
        {note && (
          <p className="text-sm sm:text-base text-gray-300 mt-2 px-4">{note}</p>
        )}
      </div>
      {logos.length >= 5 && logos.length <= 6 ? (
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {logos.slice(0, 3).map((logo) => {
              const scale = logo.scale || sizeOverrides[logo.alt] || 1;
              return (
                <div
                  key={logo.alt}
                  className="sponsor-logo-item opacity-0 rounded-xl border border-white/15 bg-white/5 p-3 sm:p-4 flex items-center justify-center transition-all duration-300 hover:border-orange-500/40 hover:bg-white/10 min-w-[140px] sm:min-w-[200px] hover:-translate-y-2 hover:scale-[1.03]"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-auto object-contain filter grayscale invert opacity-80 hover:opacity-100 transition"
                    style={{
                      maxHeight: "2.5rem",
                      transform: `scale(${scale})`,
                      filter: logo.brightness
                        ? `grayscale(1) invert(1) brightness(${logo.brightness})`
                        : undefined,
                    }}
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {logos.slice(3).map((logo) => {
              const scale = logo.scale || sizeOverrides[logo.alt] || 1;
              return (
                <div
                  key={logo.alt}
                  className="sponsor-logo-item opacity-0 rounded-xl border border-white/15 bg-white/5 p-3 sm:p-4 flex items-center justify-center transition-all duration-300 hover:border-orange-500/40 hover:bg-white/10 min-w-[140px] sm:min-w-[200px] hover:-translate-y-2 hover:scale-[1.03]"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-auto object-contain filter grayscale invert opacity-80 hover:opacity-100 transition"
                    style={{
                      maxHeight: "2.5rem",
                      transform: `scale(${scale})`,
                      filter: logo.brightness
                        ? `grayscale(1) invert(1) brightness(${logo.brightness})`
                        : undefined,
                    }}
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 items-center justify-items-center">
          {logos.map((logo) => {
            const scale = logo.scale || sizeOverrides[logo.alt] || 1;
            return (
              <div
                key={logo.alt}
                className="sponsor-logo-item opacity-0 rounded-xl border border-white/15 bg-white/5 p-3 sm:p-4 flex items-center justify-center transition-all duration-300 hover:border-orange-500/40 hover:bg-white/10 w-full hover:-translate-y-2 hover:scale-[1.03]"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="w-auto object-contain filter grayscale invert opacity-80 hover:opacity-100 transition"
                  style={{
                    maxHeight: "2.5rem",
                    transform: `scale(${scale})`,
                    filter: logo.brightness
                      ? `grayscale(1) invert(1) brightness(${logo.brightness})`
                      : undefined,
                  }}
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default SponsorsStrip;
