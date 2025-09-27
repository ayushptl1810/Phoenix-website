import React from "react";
import { motion } from "framer-motion";
import Timeline from "../components/achievements/Timeline";
import Navbar from "../components/common/Navbar";

const Achievements = () => {
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
      {/* Top Nav */}
      <Navbar currentPage="Achievements" />

      {/* Hero Header */}
      <motion.div
        className="relative overflow-hidden"
        variants={sectionVariants}
      >
        {/* Removed orange gradient overlay to rely on BeamsBackground */}
        <div className="absolute inset-0"></div>
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="text-center">
            <motion.h1
              className="font-display text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent leading-[1.1] pb-1"
              variants={heroVariants}
            >
              Our Journey of Success
            </motion.h1>
            <motion.p
              className="font-body text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              variants={heroVariants}
            >
              From our humble beginnings to becoming a force to reckon with in
              the drone racing world. Every competition, every challenge, every
              victory has shaped who we are today.
            </motion.p>
          </div>
        </div>

        {/* Removed floating orange glow elements */}
      </motion.div>

      {/* Main Timeline */}
      <motion.main
        className="container mx-auto px-6"
        variants={sectionVariants}
      >
        <Timeline />
      </motion.main>

      {/* Footer is now global via <SiteFooter /> in App.jsx */}
    </motion.div>
  );
};

export default Achievements;
