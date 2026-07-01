import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoPlay, IoRefresh, IoCamera } from "react-icons/io5";
import Drone3DCanvas from "./Drone3DCanvas";

export const getCategoryForPartName = (name, drone) => {
  if (!name || !drone || !drone.partMappings) return null;
  const nameLower = name.toLowerCase();
  for (const mapping of drone.partMappings) {
    if (mapping.keywords.some((kw) => nameLower.includes(kw))) {
      return mapping.id;
    }
  }
  return null;
};

const Drone3DModal = ({ isOpen, onClose, drone }) => {
  const [explosionFactor, setExplosionFactor] = useState(0);
  const [cameraPreset, setCameraPreset] = useState(null);

  // Hovered part category (shared bi-directionally)
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [rawHoveredPart, setRawHoveredPart] = useState(null);

  // Track the active category to show in the description box (default to first one)
  const [activeDescriptionCategory, setActiveDescriptionCategory] = useState(
    drone.partCategories?.[0]?.id || null,
  );

  // Disable background scrolling while the modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Reset explosion factor and active category when modal is opened/closed
  useEffect(() => {
    if (isOpen) {
      setExplosionFactor(0);
      setActiveDescriptionCategory(drone.partCategories?.[0]?.id || null);
      setHoveredCategory(null);
      setRawHoveredPart(null);
    }
  }, [isOpen, drone]);

  // Set hovered category when canvas hovers a specific part
  useEffect(() => {
    const cat = getCategoryForPartName(rawHoveredPart, drone);
    setHoveredCategory(cat);
    if (cat) {
      setActiveDescriptionCategory(cat);
    }
  }, [rawHoveredPart, drone]);

  if (!isOpen) return null;

  // Dynamically resolve the local URL for the 3D model asset
  const modelUrl = drone.modelFileName
    ? new URL(`../../assets/3d-drones/${drone.modelFileName}`, import.meta.url).href
    : null;

  // Active category text to display in side details panel
  const activeCategoryDetail = (drone.partCategories || []).find(
    (c) => c.id === activeDescriptionCategory,
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 overflow-hidden">
        {/* Backdrop Blur Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window (75% height) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.25, 0.25, 0, 1] }}
          className="relative z-10 w-full h-full md:h-[75vh] max-w-5xl bg-gray-950/80 border border-gray-800 md:rounded-3xl flex flex-col md:flex-row overflow-hidden shadow-2xl shadow-orange-500/5 backdrop-blur-2xl"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-30 p-2 text-gray-400 hover:text-white bg-gray-900/60 hover:bg-orange-500/20 border border-gray-800 hover:border-orange-500/40 rounded-full transition-all duration-300 shadow-md cursor-pointer"
          >
            <IoClose size={24} />
          </button>

          {/* 3D Canvas Area */}
          <div className="relative flex-1 h-3/5 md:h-full bg-gradient-to-br from-black to-gray-950">
            {/* Bottom Bar HUD (Presets on Left, Explode button on Right) */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-auto">
              {/* Presets HUD */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCameraPreset("iso")}
                  className="px-3 py-2 text-xs font-medium bg-gray-900/75 border border-gray-800 hover:border-orange-500 text-gray-300 hover:text-white rounded-lg transition-all duration-300 cursor-pointer shadow-md flex items-center gap-1.5"
                  title="Isometric View"
                >
                  <IoCamera /> Iso
                </button>
                <button
                  type="button"
                  onClick={() => setCameraPreset("top")}
                  className="px-3 py-2 text-xs font-medium bg-gray-900/75 border border-gray-800 hover:border-orange-500 text-gray-300 hover:text-white rounded-lg transition-all duration-300 cursor-pointer shadow-md flex items-center gap-1.5"
                  title="Top View"
                >
                  <IoCamera /> Top
                </button>
                <button
                  type="button"
                  onClick={() => setCameraPreset("front")}
                  className="px-3 py-2 text-xs font-medium bg-gray-900/75 border border-gray-800 hover:border-orange-500 text-gray-300 hover:text-white rounded-lg transition-all duration-300 cursor-pointer shadow-md flex items-center gap-1.5"
                  title="Front View"
                >
                  <IoCamera /> Front
                </button>
                <button
                  type="button"
                  onClick={() => setCameraPreset("side")}
                  className="px-3 py-2 text-xs font-medium bg-gray-900/75 border border-gray-800 hover:border-orange-500 text-gray-300 hover:text-white rounded-lg transition-all duration-300 cursor-pointer shadow-md flex items-center gap-1.5"
                  title="Side View"
                >
                  <IoCamera /> Side
                </button>
              </div>

              {/* Explode Toggle */}
              {drone.allowExplode !== false && (
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setExplosionFactor((prev) => (prev > 0 ? 0 : 0.25));
                    }}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 border transition-all duration-300 cursor-pointer shadow-md ${
                      explosionFactor > 0 ?
                        "bg-orange-500/15 border-orange-500 text-orange-400 hover:bg-orange-500/25"
                      : "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
                    }`}
                  >
                    {explosionFactor > 0 ?
                      <>
                        <IoRefresh size={14} /> Assemble Model
                      </>
                    : <>
                        <IoPlay size={14} /> Explode View
                      </>
                    }
                  </button>
                </div>
              )}
            </div>

            {/* Model Canvas */}
            <Drone3DCanvas
              drone={drone}
              modelUrl={modelUrl}
              explosionFactor={explosionFactor}
              hoveredPart={hoveredCategory}
              setHoveredPart={setRawHoveredPart}
              cameraPreset={cameraPreset}
              setCameraPreset={setCameraPreset}
            />
          </div>

          {/* Control Panel / Sidebar Area */}
          <div className="w-full md:w-96 h-2/5 md:h-full border-t md:border-t-0 md:border-l border-gray-800 bg-gray-950/90 flex flex-col justify-between overflow-y-auto">
            {/* Header info */}
            <div className="p-5 md:p-6 border-b border-gray-900">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-wide">
                {drone.name}
              </h2>
              <p className="font-body text-xs text-orange-400 font-medium mt-1">
                {drone.type} Drone • Exploded Component Analysis
              </p>
            </div>

            {/* Content & Control details */}
            <div className="p-5 md:p-6 flex-1 flex flex-col gap-6 select-none justify-between">
              {/* Part list breakdown (Max 5 rows, then scroll) */}
              <div className="space-y-2 flex-1 min-h-0 flex flex-col">
                <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest border-b border-gray-900 pb-1">
                  Components List
                </div>
                {/* Max height of 204px confines the grid list to maximum 5 rows, triggering local scrollbar */}
                <div className="grid grid-cols-2 gap-1.5 max-h-[204px] overflow-y-auto shrink-0 pr-1 py-1">
                  {(drone.partCategories || []).map((cat) => {
                    const isHovered = hoveredCategory === cat.id;
                    const isActive = activeDescriptionCategory === cat.id;

                    let btnStyle =
                      "bg-gray-900/50 border-gray-900 text-gray-400 hover:text-white hover:border-gray-800";
                    if (isHovered) {
                      btnStyle =
                        "bg-orange-500/15 border-orange-500/60 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.15)]";
                    } else if (isActive) {
                      btnStyle =
                        "bg-orange-500/5 border-orange-500/30 text-orange-300/90";
                    }

                    return (
                      <button
                        key={cat.id}
                        onMouseEnter={() => {
                          setHoveredCategory(cat.id);
                          setActiveDescriptionCategory(cat.id);
                        }}
                        onMouseLeave={() => setHoveredCategory(null)}
                        className={`px-2.5 h-9 text-[11px] font-medium text-left rounded-lg border transition-all cursor-pointer flex items-center min-w-0 w-full ${btnStyle}`}
                      >
                        <span className="truncate w-full">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Interactive Description HUD (Stably locked at bottom below all options) */}
              <div className="h-32 bg-gray-900/35 border border-gray-900/60 rounded-2xl p-4 relative overflow-hidden backdrop-blur-sm flex flex-col justify-center">
                <div className="absolute inset-0 bg-radial-gradient opacity-10 pointer-events-none" />
                <AnimatePresence mode="wait">
                  {activeCategoryDetail && (
                    <motion.div
                      key={activeCategoryDetail.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="relative z-10 space-y-1.5"
                    >
                      <h3 className="font-display text-xs font-bold text-orange-400 tracking-wider uppercase">
                        {activeCategoryDetail.label}
                      </h3>
                      <p className="font-body text-xs text-gray-300 leading-relaxed">
                        {activeCategoryDetail.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 md:p-5 bg-gray-950 border-t border-gray-900 text-center">
              <span className="text-[10px] font-display text-gray-500 uppercase tracking-wider">
                DJS Phoenix © 2026
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Drone3DModal;
