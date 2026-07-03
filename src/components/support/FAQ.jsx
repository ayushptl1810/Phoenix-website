import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQ = ({ items }) => {
  const [open, setOpen] = useState(null);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Animate header
      gsap.fromTo(
        ".faq-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq-header",
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate FAQ list boxes in batch
      const qas = gsap.utils.toArray(".faq-item");
      qas.forEach((item) => {
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
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="container mx-auto px-4 sm:px-6 max-w-5xl py-8 sm:py-12"
    >
      <h2 className="faq-header opacity-0 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 text-center">
        FAQ
      </h2>
      <div className="max-w-3xl mx-auto space-y-3">
        {items.map((qa, idx) => {
          const isOpen = open === idx;
          return (
            <div
              key={qa.q}
              className={`faq-item opacity-0 rounded-xl border border-white/15 bg-white/5 p-0 overflow-hidden transition-all duration-300 hover:border-orange-500/40 ${
                isOpen ? "border-orange-500/40" : ""
              }`}
            >
              <button
                className="w-full text-left px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between transition-all duration-200 cursor-pointer active:scale-[0.99]"
                onClick={() => setOpen(isOpen ? null : idx)}
                aria-expanded={isOpen}
              >
                <span className="text-white font-medium text-sm sm:text-base pr-2">
                  {qa.q}
                </span>
                <span
                  className={`text-gray-300 transition-transform duration-300 text-lg sm:text-xl ${
                    isOpen ? "rotate-45" : "rotate-0"
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 sm:px-5 pb-3 sm:pb-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                    {qa.a}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
