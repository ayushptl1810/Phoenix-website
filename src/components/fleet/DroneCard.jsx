import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DroneCard = ({ drone }) => {
  const [expanded, setExpanded] = useState(false);
  const isCurrent = drone.status === "current";

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl border transition-all bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-orange-400/70 hover:shadow-xl hover:shadow-orange-500/20`}
      whileHover={{ y: -6 }}
    >
      {/* Media */}
      <div className="relative h-56 md:h-64 w-full overflow-hidden">
        {drone.image ? (
          <>
            <img
              src={drone.image}
              alt={drone.name}
              className={
                "w-full h-full object-cover object-center saturate-100"
              }
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/35 to-transparent`}
            />
          </>
        ) : (
          <div className="w-full h-full bg-gray-900/80 border-b border-white/10 flex items-center justify-center">
            <div className="text-center">
              <div className="ui-text inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] bg-yellow-500/15 border border-yellow-400/40 text-yellow-200 mb-2">
                WIP
              </div>
              <div className="font-body text-gray-400 text-sm">
                Image coming soon
              </div>
            </div>
          </div>
        )}
        {drone.wip && drone.image && (
          <div className="absolute top-3 left-3 ui-text px-2.5 py-1 rounded-full text-[11px] bg-yellow-500/20 border border-yellow-400/50 text-yellow-200">
            WIP
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-white leading-snug">
              {drone.name}
            </h3>
            <div className="ui-text text-xs text-gray-300 mt-1">
              {isCurrent ? "Current" : "Retired"} • {drone.type}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className={`ui-text inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-sm border transition-all
              ${
                expanded
                  ? "border-orange-500 bg-orange-500/10 text-white shadow-[0_0_20px_rgba(255,140,0,0.2)]"
                  : "border-white/30 bg-white/10 text-gray-100 hover:border-orange-500 hover:bg-orange-500/10"
              }
            `}
          >
            <span>{expanded ? "Hide specs" : "View specs"}</span>
            <span
              className={`transition-transform duration-300 ${
                expanded ? "rotate-180" : "rotate-0"
              }`}
              aria-hidden
            >
              ▾
            </span>
          </button>
        </div>

        {/* Expandable specs */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mt-4 pt-4 border-t border-white/10"
            >
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-300 font-body">
                {Object.entries(drone.specs || {}).map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="text-gray-400 capitalize">
                      {k.replace(/([A-Z])/g, " $1").toLowerCase()}
                    </span>
                    <span className="text-white">{v}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DroneCard;
