import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { achievements as defaultAchievements } from "./competitionData";
import TimelineCard from "./TimelineCard";

const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [trackHeightPx, setTrackHeightPx] = useState(0);

  // Normalize achievements (supports nested arrays) and build sections
  const resolvedData = useMemo(() => {
    if (Array.isArray(data) && data.length > 0) return data;
    const source = Array.isArray(defaultAchievements)
      ? defaultAchievements
      : [];
    const flat = source.some((entry) => Array.isArray(entry))
      ? source.flat(Infinity)
      : source;

    let globalIndex = 0; // Track global index across all cards

    return (flat || []).filter(Boolean).map((group) => ({
      title: String(group.year),
      count: (group.achievements || []).length,
      content: (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-x-12 gap-y-12">
            {(group.achievements || []).map((a, idx) => {
              const currentGlobalIndex = globalIndex++;
              return (
                <TimelineCard key={a.id} item={a} index={currentGlobalIndex} />
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
      }
    };
    measure();
    const t = setTimeout(measure, 100);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [resolvedData]);

  // Scroll progress bound to the overall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 70%"],
  });

  const heightTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, trackHeightPx]
  );
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full" ref={containerRef}>
      <div ref={ref} className="relative max-w-8xl mx-auto pb-16 md:pb-20">
        {resolvedData.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-28 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-20 items-center top-28 self-start max-w-xs lg:max-w-sm md:w-full">
              {/* Node + ripple */}
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-transparent flex items-center justify-center">
                {/* Vibrant gradient ring */}
                <div className="relative">
                  <div className="w-6 h-6 rounded-full p-[2px] bg-gradient-to-br from-orange-400 via-fuchsia-500 to-cyan-400">
                    <div className="w-full h-full rounded-full bg-neutral-900" />
                  </div>
                  {/* Inner glowing core */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-orange-400 to-rose-400 shadow-[0_0_18px_rgba(255,100,50,0.7)]" />
                  </div>
                  {/* Soft halo */}
                  <div className="absolute -inset-2 rounded-full bg-orange-400/20 blur-md" />
                </div>
                {/* Ripple animation */}
                <motion.span
                  initial={{ scale: 0.7, opacity: 0 }}
                  whileInView={{
                    scale: [0.8, 1.3, 1.7],
                    opacity: [0.35, 0.18, 0],
                  }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400/30 to-rose-400/30 blur-md"
                />
              </div>
              {/* Year title with subtle glow */}
              <div className="relative">
                <div className="pointer-events-none absolute -inset-2 rounded-full bg-orange-500/10 blur-lg" />
                <h3 className="hidden md:block relative font-display text-xl md:pl-20 md:text-5xl font-bold text-neutral-400">
                  {item.title}
                </h3>
                <div className="hidden font-ui md:block md:pl-20 mt-1 text-lg text-neutral-500">
                  {item.count}{" "}
                  {item.count === 1 ? "achievement" : "achievements"}
                </div>
              </div>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              {/* Connector from spine to content */}
              <motion.div
                initial={{ width: 0, opacity: 0.6 }}
                whileInView={{ width: "3rem", opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute -left-12 top-6 h-px w-12 bg-gradient-to-r from-transparent via-orange-400 to-transparent"
              />
              <h3 className="md:hidden block font-display text-2xl text-left font-bold text-neutral-400">
                {item.title}
              </h3>
              <div className="md:hidden mb-4 ui-text text-xs text-neutral-500">
                {item.count} {item.count === 1 ? "achievement" : "achievements"}
              </div>
              {item.content}
            </div>
          </div>
        ))}

        {/* Vertical track with scroll-linked progress */}
        <div
          style={{ height: trackHeightPx + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent via-neutral-700 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-orange-500 via-orange-400 to-transparent rounded-full"
          />
        </div>
        {/* Spine aura */}
        <div className="pointer-events-none absolute left-8 -translate-x-1/2 top-0 bottom-0 w-24 bg-orange-500/10 blur-3xl" />
      </div>
    </div>
  );
};

export default Timeline;
