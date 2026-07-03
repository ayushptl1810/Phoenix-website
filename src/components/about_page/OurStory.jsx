import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const OurStory = ({ paragraphs = [] }) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // 1. Header scroll trigger
      gsap.fromTo(
        ".our-story-header",
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: ".our-story-header",
            start: "top 95%",
            end: "top 70%",
            scrub: 1,
          },
        }
      );

      // 2. Paragraphs stagger / scroll reveal
      const items = gsap.utils.toArray(".our-story-p");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              end: "top 65%",
              scrub: 1,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-12 sm:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="our-story-header opacity-0 mb-10 sm:mb-12">
          <h2
            className="font-display font-bold text-white leading-none tracking-tighter mb-4"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}
          >
            Our Story
          </h2>
          <p
            className="font-body text-neutral-400 max-w-lg"
            style={{
              fontSize: "clamp(0.9rem, 1.3vw, 1.1rem)",
              lineHeight: 1.65,
            }}
          >
            The journey behind our passion and persistence.
          </p>
        </div>

        {/* Paragraphs */}
        <div className="space-y-6 sm:space-y-8 max-w-4xl">
          {paragraphs.map((text, idx) => (
            <p
              key={idx}
              className="our-story-p opacity-0 font-body text-base sm:text-lg text-gray-300 leading-relaxed text-left"
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStory;
