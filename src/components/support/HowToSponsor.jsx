import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HowToSponsor = () => {
  const containerRef = useRef(null);
  const steps = [
    {
      title: "Submit Interest",
      detail: "Share your focus and preferred support mode.",
    },
    {
      title: "Alignment Call",
      detail: "Scope impact areas, timing, and deliverables.",
    },
    {
      title: "MoU / Agreement",
      detail: "Confirm terms, recognition, and approvals.",
    },
    {
      title: "Delivery / Payment",
      detail: "Funds transfer or in‑kind logistics.",
    },
    {
      title: "Acknowledgment",
      detail: "We implement and share visible outcomes.",
    },
  ];

  useGSAP(
    () => {
      // Animate header
      gsap.fromTo(
        ".how-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".how-header",
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate steps in batch
      const items = gsap.utils.toArray(".how-step-item");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Animate connector lines in batch
      const lines = gsap.utils.toArray(".how-line");
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { opacity: 0, scaleX: 0 },
          {
            opacity: 0.4,
            scaleX: 1,
            duration: 0.5,
            ease: "power1.out",
            scrollTrigger: {
              trigger: line,
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
      <h2 className="how-header opacity-0 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 text-center">
        How to Sponsor
      </h2>

      <div className="lg:hidden space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {steps.slice(0, 3).map((s, idx) => (
            <div
              key={s.title}
              className="how-step-item opacity-0 rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-orange-500/40 hover:bg-white/10 hover:shadow-[0_0_18px_rgba(255,140,0,0.18)]"
            >
              <div className="ui-text text-[10px] sm:text-xs text-gray-300 mb-1 sm:mb-2">
                Step {idx + 1}
              </div>
              <p className="text-white font-semibold text-base sm:text-lg">
                {s.title}
              </p>
              <p className="text-gray-300 text-xs sm:text-sm mt-1">
                {s.detail}
              </p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 justify-items-stretch">
          {steps.slice(3).map((s, idx) => (
            <div
              key={s.title}
              className="how-step-item opacity-0 rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-orange-500/40 hover:bg-white/10 hover:shadow-[0_0_18px_rgba(255,140,0,0.18)]"
            >
              <div className="ui-text text-[10px] sm:text-xs text-gray-300 mb-1 sm:mb-2">
                Step {idx + 4}
              </div>
              <p className="text-white font-semibold text-base sm:text-lg">
                {s.title}
              </p>
              <p className="text-gray-300 text-xs sm:text-sm mt-1">
                {s.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="flex items-center justify-center max-w-6xl mx-auto">
          {steps.map((s, idx) => (
            <React.Fragment key={s.title}>
              <div className="how-step-item opacity-0 flex flex-col items-center text-center min-w-[160px] lg:min-w-[180px] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03]">
                <div className="ui-text w-16 h-16 lg:w-20 lg:h-20 text-2xl lg:text-4xl rounded-full border border-orange-500/60 bg-orange-500/10 text-white flex items-center justify-center mb-2">
                  {idx + 1}
                </div>
                <div className="text-white font-semibold text-sm lg:text-base">
                  {s.title}
                </div>
                <div className="text-gray-300 text-xs lg:text-sm max-w-[200px] lg:max-w-[240px]">
                  {s.detail}
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div className="how-line opacity-0 h-px mx-3 lg:mx-6 w-16 lg:w-24 xl:w-32 bg-gradient-to-r from-white/10 via-white/40 to-white/10 origin-left" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToSponsor;
