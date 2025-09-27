import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/common/Navbar";
import FleetGrid from "../components/fleet/FleetGrid";

const Fleet = () => {
  // Year-based filter
  const [selectedYear, setSelectedYear] = useState("2024-2025");

  const yearOptions = [
    { key: "pre-2024", label: "Pre-2024" },
    { key: "2024-2025", label: "2024-2025" },
  ];

  // Standardized animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4, // Increased to account for App-level transition
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

      {/* Year Filter Tabs */}
      <motion.section
        className="container mx-auto px-6"
        variants={sectionVariants}
      >
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-800/50 rounded-xl p-1 border border-gray-700/50">
            {yearOptions.map((year) => {
              const isActive = selectedYear === year.key;
              return (
                <motion.button
                  key={year.key}
                  onClick={() => setSelectedYear(year.key)}
                  className={`relative px-6 py-3 text-sm font-medium transition-all duration-300 rounded-lg cursor-pointer ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-orange-500 rounded-lg shadow-lg"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  )}
                  <span className="relative z-10">{year.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Grid */}
      <main id="fleet-grid" className="container mx-auto px-6 pb-16">
        <FleetGrid selectedYear={selectedYear} />
      </main>
    </motion.div>
  );
};

export default Fleet;
