import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { achievements as defaultAchievements } from "./competitionData";
import TimelineCard from "./TimelineCard";

gsap.registerPlugin(ScrollTrigger);

const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [trackHeightPx, setTrackHeightPx] = useState(0);

  // Normalize achievements (supports nested arrays) and build sections
  const resolvedData = useMemo(() => {
    if (Array.isArray(data) && data.length > 0) return data.reverse();
    const source = Array.isArray(defaultAchievements)
      ? defaultAchievements
      : [];
    const flat = source.some((entry) => Array.isArray(entry))
      ? source.flat(Infinity)
      : source;

    let globalIndex = 0; // Track global index across all cards

    return (flat || [])
      .filter(Boolean)
      .reverse()
      .map((group) => ({
        title: String(group.year),
        count: (group.achievements || []).length,
        content: (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-x-6 sm:gap-x-8 lg:gap-x-12 gap-y-6 sm:gap-y-8 lg:gap-y-12">
              {(group.achievements || []).map((a, idx) => {
                const currentGlobalIndex = globalIndex++;
                return (
                  <TimelineCard
                    key={a.id}
                    item={a}
                    index={currentGlobalIndex}
                  />
                );
              })}
            </div>
          </div>
        ),
      }));
  }, [data, defaultAchievements]);

  // Measure track container height for the vertical progress
  useEffect(() => {
    const measure = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setTrackHeightPx(rect.height);
        // Refresh ScrollTrigger to recalculate exact offset heights
        ScrollTrigger.refresh();
      }
    };
    measure();
    const t = setTimeout(measure, 150);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [resolvedData]);

  // Scroll progress and section-based animations in GSAP
  useGSAP(
    () => {
      if (trackHeightPx === 0) return;

      // 1. Scroll-linked timeline track progression
      gsap.fromTo(
        ".timeline-progress-bar",
        { height: 0, opacity: 0 },
        {
          height: trackHeightPx,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 20%",
            end: "bottom 70%",
            scrub: 0.1,
          },
        }
      );

      // 2. Section entrance animations (connector line & node ripples)
      const sections = gsap.utils.toArray(".timeline-section");
      sections.forEach((sec) => {
        const connector = sec.querySelector(".timeline-connector");
        const ripple = sec.querySelector(".timeline-ripple");

        if (connector) {
          gsap.fromTo(
            connector,
            { width: 0, opacity: 0.3 },
            {
              width: "2rem",
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sec,
                start: "top 95%",
                end: "top 60%",
                scrub: 0.2,
              },
            }
          );
        }

        if (ripple) {
          gsap.fromTo(
            ripple,
            { scale: 0.6, opacity: 0.4 },
            {
              scale: 1.8,
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: sec,
                start: "top 95%",
                end: "top 60%",
                scrub: 0.2,
              },
            }
          );
        }
      });

      // 3. Staggered card entrance ScrollTriggers in batch
      const cards = gsap.utils.toArray(".achievement-card-item");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 98%",
              end: "top 65%",
              scrub: 0.3,
            },
          }
        );
      });
    },
    { dependencies: [trackHeightPx, resolvedData], scope: containerRef }
  );

  return (
    <div className="w-full" ref={containerRef}>
      <div ref={ref} className="relative max-w-8xl mx-auto pb-16 md:pb-20">
        {resolvedData.map((item, index) => (
          <div
            key={index}
            className="timeline-section flex justify-start pt-8 sm:pt-10 md:pt-28 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-20 items-center top-20 sm:top-28 self-start max-w-xs lg:max-w-sm md:w-full">
              {/* Node + ripple */}
              <div className="h-8 sm:h-10 absolute left-2 sm:left-3 md:left-3 w-8 sm:w-10 rounded-full bg-transparent flex items-center justify-center">
                {/* Vibrant gradient ring */}
                <div className="relative">
                  <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full p-[2px] bg-gradient-to-br from-orange-400 via-fuchsia-500 to-cyan-400">
                    <div className="w-full h-full rounded-full bg-neutral-900" />
                  </div>
                  {/* Inner glowing core */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-gradient-to-br from-orange-400 to-rose-400 shadow-[0_0_18px_rgba(255,100,50,0.7)]" />
                  </div>
                  {/* Soft halo */}
                  <div className="absolute -inset-1 sm:-inset-2 rounded-full bg-orange-400/20 blur-md" />
                </div>
                {/* Ripple animation */}
                <span className="timeline-ripple absolute inset-0 rounded-full bg-gradient-to-br from-orange-400/30 to-rose-400/30 blur-md opacity-0 scale-50" />
              </div>
              
              {/* Year title with subtle glow */}
              <div className="relative">
                <div className="pointer-events-none absolute -inset-1 sm:-inset-2 rounded-full bg-orange-500/10 blur-lg" />
                <h3 className="hidden md:block relative font-display text-lg md:pl-16 lg:pl-20 md:text-4xl lg:text-5xl font-bold text-neutral-400">
                  {item.title}
                </h3>
                <div className="hidden font-ui md:block md:pl-16 lg:pl-20 mt-1 text-base lg:text-lg text-neutral-500">
                  {item.count}{" "}
                  {item.count === 1 ? "achievement" : "achievements"}
                </div>
              </div>
            </div>

            <div className="relative pl-16 sm:pl-20 pr-2 sm:pr-4 md:pl-4 w-full">
              {/* Connector from spine to content */}
              <div className="timeline-connector absolute -left-8 sm:-left-12 top-4 sm:top-6 h-px w-0 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-30" />
              
              <h3 className="md:hidden block font-display text-xl sm:text-2xl text-left font-bold text-neutral-400">
                {item.title}
              </h3>
              <div className="md:hidden mb-3 sm:mb-4 ui-text text-xs text-neutral-500">
                {item.count} {item.count === 1 ? "achievement" : "achievements"}
              </div>
              {item.content}
            </div>
          </div>
        ))}

        {/* Vertical track with scroll-linked progress */}
        <div
          style={{ height: trackHeightPx + "px" }}
          className="absolute md:left-8 left-6 sm:left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent via-neutral-700 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <div className="timeline-progress-bar absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-orange-500 via-orange-400 to-transparent rounded-full opacity-0" />
        </div>
        
        {/* Spine aura */}
        <div className="pointer-events-none absolute left-6 sm:left-8 -translate-x-1/2 top-0 bottom-0 w-16 sm:w-24 bg-orange-500/10 blur-3xl" />
      </div>
    </div>
  );
};

export default Timeline;
