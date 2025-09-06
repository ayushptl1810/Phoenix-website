import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Derive a stable hue from category without hardcoding
function getCategoryHue(category) {
  if (!category) return 30; // fallback to orange-ish hue
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = (hash << 5) - hash + category.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 360;
}

const TimelineCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const hue = getCategoryHue(item.category);

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 2 - 1; // -1..1
    const py = (y / rect.height) * 2 - 1;
    const rotateX = -(py * 3);
    const rotateY = px * 3;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
  };

  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.25) }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-orange-500/60 transition-all hover:shadow-2xl hover:shadow-orange-500/30 min-h-56 md:min-h-64 p-4 w-full"
    >
      {/* Subtle top highlight for depth */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/5 to-transparent" />
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{
          background: `linear-gradient(180deg, hsla(${hue},90%,60%,0.9), hsla(${
            (hue + 25) % 360
          },90%,60%,0.9))`,
        }}
      />

      {/* Shine sweep */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -inset-x-24 -inset-y-10 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-7">
        <div className="flex items-center gap-4 md:gap-5 mb-4">
          <div>
            <div className="font-display text-xl md:text-2xl font-bold text-white leading-snug">
              {item.title}
            </div>
            <div className="ui-text text-xs md:text-sm text-neutral-400 mt-0.5">
              {item.date}
            </div>
          </div>
        </div>
        <div className="mb-3 flex items-center gap-2 ui-text">
          <span
            className="ui-text inline-block text-[10px] md:text-xs tracking-wide px-2.5 py-0.5 rounded-full text-white"
            style={{
              background: `linear-gradient(90deg, hsla(${hue},90%,50%,0.9), hsla(${
                (hue + 30) % 360
              },90%,55%,0.9))`,
            }}
          >
            {item.category}
          </span>
          {item.status && (
            <span className="ui-text inline-block text-[10px] md:text-xs tracking-wide px-2.5 py-0.5 rounded-full border border-neutral-700 text-neutral-300">
              {item.status}
            </span>
          )}
        </div>
        <p className="font-body text-[15px] md:text-base text-neutral-200 leading-7">
          {item.description}
        </p>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mt-3 pt-3 border-t border-neutral-700"
            >
              <div className="text-xs text-neutral-300 flex flex-wrap gap-4">
                {item.category && (
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: `hsl(${hue},90%,55%)` }}
                    />
                    Category:{" "}
                    <span className="font-semibold">{item.category}</span>
                  </span>
                )}
                {item.status && (
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: `hsl(${(hue + 25) % 360},90%,55%)`,
                      }}
                    />
                    Status: <span className="font-semibold">{item.status}</span>
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle neon edge on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 group-hover:ring-1 ring-orange-400/50 transition-all" />
    </motion.div>
  );
};

export default TimelineCard;
