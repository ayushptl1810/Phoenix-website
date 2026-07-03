import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Timeline from "../components/achievements/Timeline";
import Navbar from "../components/common/Navbar";

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const containerRef = useRef(null);

  // Force ScrollTrigger refresh on mount to resolve early trigger calculations
  useEffect(() => {
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
    return () => clearTimeout(t);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".achievements-title",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1 }
      );
      tl.fromTo(
        ".achievements-desc",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );
      tl.fromTo(
        ".achievements-timeline",
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.5"
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white bg-grid-mask bg-noise-mask"
    >
      {/* Top Nav */}
      <Navbar currentPage="Achievements" />

      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="text-center">
            <h1 className="achievements-title opacity-0 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent leading-[1.1] pb-1">
              Our Journey of Success
            </h1>
            <p className="achievements-desc opacity-0 font-body text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              From our humble beginnings to becoming a force to reckon with in
              the drone racing world. Every competition, every challenge, every
              victory has shaped who we are today.
            </p>
          </div>
        </div>
      </div>

      {/* Main Timeline */}
      <main className="achievements-timeline opacity-0 container mx-auto px-4 sm:px-6">
        <Timeline />
      </main>
    </div>
  );
};

export default Achievements;
