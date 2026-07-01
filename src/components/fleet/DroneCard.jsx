import React from "react";
import { motion } from "framer-motion";
import { IoCubeOutline } from "react-icons/io5";

const DroneCard = ({ drone, index, onOpen3D }) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border transition-all bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/30"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.25, 0, 1],
        delay: 0.6 + index * 0.15,
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.1, ease: "easeOut" },
      }}
      style={{
        transition: "transform 0.1s ease-out",
      }}
    >
      {/* Media */}
      <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
        {drone.image ?
          <>
            <img
              src={drone.image}
              alt={drone.name}
              className="w-full h-full object-cover object-center saturate-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
          </>
        : <div className="w-full h-full bg-gray-900/80 border-b border-white/10 flex items-center justify-center">
            <div className="text-center">
              <div className="ui-text inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-[11px] bg-yellow-500/15 border border-yellow-400/40 text-yellow-200 mb-2">
                WIP
              </div>
              <div className="font-body text-gray-400 text-xs sm:text-sm font-medium">
                Building in progress
              </div>
            </div>
          </div>
        }
        {drone.wip && drone.image && (
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 ui-text px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] bg-yellow-500/20 border border-yellow-400/50 text-yellow-200">
            WIP
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug truncate">
              {drone.name}
            </h3>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {drone.has3DModel && (
              <button
                type="button"
                onClick={onOpen3D}
                className="ui-text inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-semibold border border-orange-500 bg-orange-500/10 text-orange-400 hover:bg-orange-500 hover:text-white transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(249,115,22,0.15)] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]"
              >
                <IoCubeOutline size={15} />
                <span>3D View</span>
              </button>
            )}
            <span className="ui-text text-xs font-medium px-3 py-1.5 sm:py-2 rounded-full border border-white/20 bg-white/10 text-gray-200">
              {drone.type}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DroneCard;
