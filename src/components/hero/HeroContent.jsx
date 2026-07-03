import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const HeroContent = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Create entrance animation timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Container fade in
      tl.to(containerRef.current, { opacity: 1, duration: 0.4 });

      // 2. Title slide in from left/right
      tl.fromTo(
        ".hero-title-left",
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 1.0, ease: "power4.out" },
        "-=0.2",
      );
      tl.fromTo(
        ".hero-title-right",
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1.0, ease: "power4.out" },
        "-=0.8",
      );

      // 3. Tagline slide up
      tl.fromTo(
        ".hero-tagline",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6",
      );

      // 4. Badge scale in
      tl.fromTo(
        ".hero-badge",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6 },
        "-=0.5",
      );

      // 5. Buttons slide up from bottom together (no conflict, no snap)
      tl.fromTo(
        [".hero-btn-left", ".hero-btn-right"],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4",
      );

      // 6. Social icons slide up together
      tl.fromTo(
        ".hero-social-link",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          onComplete: () => {
            gsap.utils
              .toArray(".hero-btn-left, .hero-btn-right")
              .forEach((el) => {
                el.classList.add("hero-btn-transition");
              });
            gsap.utils.toArray(".hero-social-link").forEach((el) => {
              el.classList.add("hero-social-transition");
            });
          },
        },
        "-=0.6",
      );

      // 7. Ambient pulsing dots
      gsap.fromTo(
        ".hero-dot-1",
        { scale: 1 },
        { scale: 1.3, duration: 1, yoyo: true, repeat: -1, ease: "sine.inOut" },
      );
      gsap.fromTo(
        ".hero-dot-2",
        { scale: 1 },
        {
          scale: 1.3,
          duration: 1,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: 0.5,
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <>
      <style>{`
        .hero-btn-transition {
          transition: background-color 300ms, border-color 300ms, filter 300ms, box-shadow 300ms, transform 200ms !important;
        }
        .hero-social-transition {
          transition: transform 200ms, color 200ms !important;
        }
      `}</style>
      <main
        ref={containerRef}
        className="relative z-10 min-h-screen flex items-center justify-center opacity-0 transform-gpu overflow-x-hidden"
      >
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto">
          {/* Team Name - Hero Title */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-bold text-white mb-4 sm:mb-6 leading-none tracking-tight">
            <span className="block hero-title-left opacity-0">DJS</span>
            <span className="block text-accent hero-title-right opacity-0">
              PHOENIX
            </span>
          </h1>

          {/* Slogan/Tagline */}
          <p className="font-body text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-2 hero-tagline opacity-0">
            Where music meets innovation, and every beat tells a story
          </p>

          {/* Established Date - Redesigned with enhanced animations */}
          <div className="mb-8 sm:mb-12 flex items-center justify-center hero-badge opacity-0">
            <div className="relative group hover:scale-105 active:scale-95 transition-transform duration-200 ease-out">
              <div className="relative bg-black/20 border border-white/30 rounded-full px-4 sm:px-6 py-2 sm:py-3">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#ff8c00] rounded-full hero-dot-1" />
                  <span className="font-ui font-bold text-white text-sm sm:text-lg tracking-wide">
                    Est. 2017
                  </span>
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#ff8c00] rounded-full hero-dot-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
            <Link to="/fleet">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#ff8c00] bg-[#ff8c00] text-black font-ui font-bold text-base sm:text-lg rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-orange-500/20 hover:scale-105 active:scale-95 cursor-pointer hero-btn-left opacity-0 transform-gpu">
                View our fleet
              </button>
            </Link>

            <Link to="/about">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 bg-gray-300 text-black font-ui font-bold text-base sm:text-lg rounded-lg hover:bg-white hover:text-black hover:scale-105 active:scale-95 cursor-pointer hero-btn-right opacity-0 transform-gpu">
                About Us
              </button>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center items-center gap-4 sm:gap-6 text-white/70">
            <a
              href="mailto:djsphoenixteam@gmail.com"
              className="hover:text-white hover:scale-110 hover:rotate-6 hero-social-link opacity-0"
            >
              <MdEmail className="w-6 h-6 sm:w-8 sm:h-8" />
            </a>
            <a
              href="https://www.instagram.com/djs_phoenix/"
              className="hover:text-white hover:scale-110 hover:-rotate-6 hero-social-link opacity-0"
            >
              <FaInstagram className="w-6 h-6 sm:w-8 sm:h-8" />
            </a>
            <a
              href="https://www.linkedin.com/company/djs-phoenix"
              className="hover:text-white hover:scale-110 hover:rotate-6 hero-social-link opacity-0"
            >
              <FaLinkedin className="w-6 h-6 sm:w-8 sm:h-8" />
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default HeroContent;
