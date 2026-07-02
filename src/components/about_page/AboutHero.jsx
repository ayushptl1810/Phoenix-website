import React, { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const AboutHero = ({ title, subtitle, imageSrc, tags = [] }) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate text elements with a tight organic stagger, then safely add CSS hover transitions
      tl.fromTo(
        [
          ".about-hero-title",
          ".about-hero-subtitle",
          ".about-hero-btn",
          ".about-hero-pill",
        ],
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.06,
          onComplete: () => {
            gsap.utils.toArray(".about-hero-btn").forEach((el) => {
              el.classList.add("transition-all", "duration-300");
            });
          },
        },
        0
      );

      tl.fromTo(
        ".about-hero-image-container",
        { opacity: 0, scale: 0.98, y: 25 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8 },
        0.1
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative py-12 sm:py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center">
          <div className="text-center lg:text-left">
            {/* Title */}
            <h1 className="about-hero-title opacity-0 font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 leading-none tracking-tighter">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="about-hero-subtitle opacity-0 font-display text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-orange-400 via-orange-200 to-white bg-clip-text text-transparent tracking-wide mb-6 sm:mb-8 leading-snug">
              {subtitle}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 sm:gap-4 mb-8">
              <Link to="/team" className="w-full sm:w-auto">
                <button className="about-hero-btn opacity-0 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#ff8c00] bg-[#ff8c00] text-black font-ui font-bold text-base rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-orange-500/20 hover:scale-105 active:scale-95 cursor-pointer">
                  Meet the Team
                </button>
              </Link>
              <Link to="/achievements" className="w-full sm:w-auto">
                <button className="about-hero-btn opacity-0 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 bg-gray-300 text-black font-ui font-bold text-base rounded-lg hover:bg-white hover:text-black hover:scale-105 active:scale-95 cursor-pointer">
                  Our Achievements
                </button>
              </Link>
            </div>

            {/* Tags list */}
            {Array.isArray(tags) && tags.length > 0 && (
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="about-hero-pill opacity-0 px-3 py-1.5 rounded-full text-xs font-ui bg-white/5 border border-white/10 text-gray-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right Image Container */}
          <div className="about-hero-image-container opacity-0 relative order-first lg:order-none">
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-2xl">
              <img
                src={imageSrc}
                alt="About hero"
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[420px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
