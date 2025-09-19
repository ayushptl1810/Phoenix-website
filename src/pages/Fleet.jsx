import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/common/Navbar";
import BeamsBackground from "../components/common/BeamsBackground";
import FleetGrid from "../components/fleet/FleetGrid";

const Fleet = () => {
  // Single multi-select across statuses and types
  const [selectedFilters, setSelectedFilters] = useState(new Set());

  const allChips = useMemo(
    () => [
      { key: "Current", group: "status" },
      { key: "Retired", group: "status" },
      { key: "Racing", group: "type" },
      { key: "Surveillance", group: "type" },
      { key: "Package Delivery", group: "type" },
      { key: "Recon", group: "type" },
    ],
    []
  );

  const toggleFilter = (key) => {
    setSelectedFilters((prev) => {
      const next = new Set(prev);
      if (key === "__all__") return new Set();
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // Standardized animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-black text-white bg-grid-mask bg-noise-mask"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <BeamsBackground intensity="medium" />
      <Navbar currentPage="Fleet" />

      {/* Hero */}
      <motion.section
        className="relative overflow-hidden"
        variants={sectionVariants}
      >
        <div className="absolute inset-0" />
        <div className="relative z-10 container mx-auto px-6 py-16">
          <div className="text-center">
            <motion.h1
              className="font-display text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent leading-[1.1]"
              variants={heroVariants}
            >
              Our Fleet
            </motion.h1>
            <motion.p
              className="font-body text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
              variants={heroVariants}
            >
              Two current drones and five retired builds. Purpose-built for
              racing, mapping and research.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Filters */}
      <motion.section
        className="container mx-auto px-6"
        variants={sectionVariants}
      >
        <div className="flex flex-wrap items-center justify-center gap-3 ui-text mb-8">
          <motion.button
            onClick={() => toggleFilter("__all__")}
            className={`px-3 py-1 rounded-full text-sm border transition-colors ${
              selectedFilters.size === 0
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-gray-800 text-gray-300 border-gray-700 hover:text-white hover:border-orange-500/70"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All
          </motion.button>
          {allChips.map((chip) => {
            const active = selectedFilters.has(chip.key);
            return (
              <motion.button
                key={chip.key}
                onClick={() => toggleFilter(chip.key)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  active
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-gray-800 text-gray-300 border-gray-700 hover:text-white hover:border-orange-500/70"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {chip.key}
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      {/* Grid */}
      <motion.main
        id="fleet-grid"
        className="container mx-auto px-6 pb-16"
        variants={sectionVariants}
      >
        <FleetGrid
          filters={{
            statuses: [
              ...["Current", "Retired"].filter((k) => selectedFilters.has(k)),
            ],
            types: [
              ...["Racing", "Surveillance"].filter((k) =>
                selectedFilters.has(k)
              ),
            ],
          }}
        />
      </motion.main>
    </motion.div>
  );
};

export default Fleet;
