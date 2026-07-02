import React, { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaRocket, FaAward, FaTrophy } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import teamPhoto from "../../assets/team.jpeg";

gsap.registerPlugin(ScrollTrigger);

const AboutTeam = () => {
  const containerRef = useRef(null);
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const photoRef = useRef(null);

  const onEnter = (refEl) => {
    gsap.to(refEl, {
      boxShadow: "0 25px 60px -20px rgba(255, 140, 0, 0.25)",
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const onLeave = (refEl) => {
    gsap.to(refEl, {
      boxShadow: "none",
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  useGSAP(
    () => {
      // 1. Header slide/fade from top
      gsap.fromTo(
        ".about-team-header",
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: ".about-team-header",
            start: "top 95%",
            end: "top 65%",
            scrub: 1,
          },
        },
      );

      // 2. CTA button scale/fade
      gsap.fromTo(
        ".about-team-cta",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: ".about-team-cta",
            start: "top 95%",
            end: "top 65%",
            scrub: 1,
          },
        },
      );

      // 3. Mission block: slide in from left
      gsap.fromTo(
        ".about-team-mission",
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: ".about-team-mission",
            start: "top 90%",
            end: "top 55%",
            scrub: 1,
          },
        },
      );

      // 4. Photo block: slide in from right
      gsap.fromTo(
        ".about-team-photo",
        { opacity: 0, x: 100, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          scrollTrigger: {
            trigger: ".about-team-photo",
            start: "top 90%",
            end: "top 50%",
            scrub: 1,
          },
        },
      );

      // 5. Vision block: slide in from left
      gsap.fromTo(
        ".about-team-vision",
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: ".about-team-vision",
            start: "top 90%",
            end: "top 55%",
            scrub: 1,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section className="min-h-screen bg-black relative overflow-hidden py-8">
      <div className="absolute inset-0 bg-black" />
      <div
        ref={containerRef}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6"
      >
        {/* Header Section */}
        <div className="mb-10 sm:mb-14 about-team-header opacity-0">
          <h1
            className="font-display font-bold text-white leading-none tracking-tighter mb-4"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)" }}
          >
            Meet <span style={{ color: "#ff8c00" }}>DJS Phoenix</span>
          </h1>
          <p
            className="font-body text-neutral-400 max-w-lg"
            style={{
              fontSize: "clamp(0.9rem, 1.3vw, 1.1rem)",
              lineHeight: 1.65,
            }}
          >
            A passionate team of students pushing the boundaries of aerial
            robotics and autonomous systems.
          </p>
        </div>

        {/* Main Content Grid: Mission | Image (row-span-2) / Vision */}
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 items-start mb-12 sm:mb-16">
          {/* Mission (row 1, col 1) */}
          <div className="about-team-mission opacity-0">
            <div
              ref={missionRef}
              className="bg-white/[0.02] backdrop-blur-xl border rounded-2xl p-6 sm:p-8 flex flex-col transition-[border-color] duration-300"
              style={{ border: "1px solid rgba(255, 140, 0, 0.45)" }}
              onMouseEnter={() => onEnter(missionRef.current)}
              onMouseLeave={() => onLeave(missionRef.current)}
            >
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-[#ff8c00]/20 rounded-xl flex items-center justify-center">
                  <FaRocket className="w-5 sm:w-6 h-5 sm:h-6 text-[#ff8c00]" />
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                  Our Mission
                </h2>
              </div>
              <p className="font-body text-base sm:text-lg text-gray-300 leading-relaxed">
                We are a student-led drone team from DJ Sanghvi College of
                Engineering, Mumbai. We design, build and race UAVs — applying
                flight control, perception and systems engineering to real-world
                challenges in racing, mapping and research.
              </p>
            </div>
          </div>

          {/* Image (col 2, spans both rows on lg+) */}
          <div className="relative self-stretch h-full flex items-center justify-center lg:row-span-2 order-first lg:order-none about-team-photo opacity-0">
            <div
              ref={photoRef}
              className="relative overflow-hidden rounded-2xl border bg-white/[0.02] backdrop-blur-xl transition-[border-color] duration-300 mx-auto w-full"
              style={{ border: "1px solid rgba(255, 140, 0, 0.45)" }}
              onMouseEnter={() => onEnter(photoRef.current)}
              onMouseLeave={() => onLeave(photoRef.current)}
            >
              <img
                src={teamPhoto}
                alt="DJS Phoenix Team"
                className="h-64 sm:h-80 lg:h-110 w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>

            {/* Achievement Badge */}
            <div
              className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-black/90 backdrop-blur-md rounded-xl p-3 sm:p-4 shadow-lg transition-transform duration-300 hover:scale-105"
              style={{ border: "1px solid rgba(255, 140, 0, 0.45)" }}
            >
              <div className="flex items-center gap-2 mb-1">
                <FaTrophy className="w-3 sm:w-4 h-3 sm:h-4 text-[#ff8c00]" />
                <h4 className="font-ui font-bold text-white text-xs sm:text-sm">
                  Latest Achievement
                </h4>
              </div>
              <p className="font-ui font-bold text-[#ff8c00] text-xs sm:text-sm">
                ISRO IROC 2025 Finalists
              </p>
            </div>
          </div>

          {/* Vision (row 2, col 1) */}
          <div className="about-team-vision opacity-0">
            <div
              ref={visionRef}
              className="bg-white/[0.02] backdrop-blur-xl border rounded-2xl p-6 sm:p-8 flex flex-col transition-[border-color] duration-300"
              style={{ border: "1px solid rgba(255, 140, 0, 0.45)" }}
              onMouseEnter={() => onEnter(visionRef.current)}
              onMouseLeave={() => onLeave(visionRef.current)}
            >
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-[#ff8c00]/20 rounded-xl flex items-center justify-center">
                  <FaAward className="w-5 sm:w-6 h-5 sm:h-6 text-[#ff8c00]" />
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                  Our Vision
                </h2>
              </div>
              <p className="font-body text-base sm:text-lg text-gray-300 leading-relaxed">
                Our vision is to achieve success nationally and internationally,
                putting our college on the world map. We pursue this by
                mentoring new recruits, and competing openly—raising the bar for
                safety, reliability and performance in UAV systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
