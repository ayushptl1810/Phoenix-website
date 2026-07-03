import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HiSparkles } from "react-icons/hi2";

const SupportHero = ({ data }) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.1 }
      );
      tl.fromTo(
        ".hero-title",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4"
      );
      tl.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );
      tl.fromTo(
        ".hero-actions",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.5"
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative overflow-hidden">
      <div className="absolute inset-0"></div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-5xl py-12 sm:py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="hero-badge opacity-0 inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/10 border border-white/30 rounded-full mb-4 sm:mb-6">
            <HiSparkles className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
            <span className="font-ui text-xs sm:text-sm text-white font-bold">
              Partner With Us
            </span>
          </div>
          <h1 className="hero-title opacity-0 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent leading-[1.1]">
            {data.title}
          </h1>
          <p className="hero-subtitle opacity-0 font-body text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed px-4">
            {data.subtitle}
          </p>
          <div className="hero-actions opacity-0 mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            {data.primaryCta && (
              <a
                href={data.primaryCta.href}
                target={data.primaryCta.target}
                rel={
                  data.primaryCta.target === "_blank"
                    ? "noopener noreferrer"
                    : undefined
                }
                className="ui-text inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm border border-orange-500 bg-orange-500/10 text-white hover:bg-orange-500/20 active:scale-95 transition-all duration-300 hover:scale-105"
              >
                {data.primaryCta.label}
              </a>
            )}
            {data.secondaryCta && (
              <a
                href={data.secondaryCta.href}
                target={data.secondaryCta.target}
                rel={
                  data.secondaryCta.target === "_blank"
                    ? "noopener noreferrer"
                    : undefined
                }
                className="ui-text inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm border border-white/30 bg-white/5 text-white hover:bg-white/10 active:scale-95 transition-all duration-300 hover:scale-105"
              >
                {data.secondaryCta.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportHero;
