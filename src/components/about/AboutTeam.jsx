import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { FaUsers, FaTrophy, FaRocket, FaAward } from "react-icons/fa";
import { PiDroneFill } from "react-icons/pi";
import { HiSparkles } from "react-icons/hi2";
import teamPhoto from "../../assets/team.jpeg";

const AboutTeam = () => {
  const [stats, setStats] = useState({
    members: 0,
    competitions: 0,
    participated: 0,
  });

  const targetStats = {
    members: 40,
    competitions: 8,
    participated: 15,
  };

  const statsRef = useRef(null);
  const isInView = useInView(statsRef, {
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (isInView) {
      const duration = 1200;
      const interval = 40;
      const steps = duration / interval;

      const timer = setInterval(() => {
        setStats((prev) => {
          const newStats = {};
          let allComplete = true;

          Object.keys(targetStats).forEach((key) => {
            const target = targetStats[key];
            const current = prev[key];
            const increment = target / steps;

            if (current < target) {
              newStats[key] = Math.min(current + increment, target);
              allComplete = false;
            } else {
              newStats[key] = target;
            }
          });

          if (allComplete) {
            clearInterval(timer);
          }

          return { ...prev, ...newStats };
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
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

  const photoVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  const statsCardVariants = {
    hidden: { opacity: 0, y: 12, scale: 1 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  return (
    <section className="min-h-screen py-16">
      <motion.div
        className="max-w-7xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header Section */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff8c00]/10 border border-[#ff8c00]/30 rounded-full mb-6">
            <HiSparkles className="w-4 h-4 text-[#ff8c00]" />
            <span className="font-ui text-sm text-[#ff8c00] font-bold">
              About Our Team
            </span>
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
            Meet
            <span className="block text-[#ff8c00]">DJS Phoenix</span>
          </h1>
          <p className="font-body text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A passionate team of students pushing the boundaries of aerial
            robotics and autonomous systems.
          </p>
        </motion.div>

        {/* Main Content Grid: Mission | Image (row-span-2) / Vision */}
        <div className="grid gap-12 lg:grid-cols-2 items-start mb-16">
          {/* Mission (row 1, col 1) */}
          <motion.div variants={textVariants}>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 transition-colors duration-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#ff8c00]/20 rounded-xl flex items-center justify-center">
                  <FaRocket className="w-6 h-6 text-[#ff8c00]" />
                </div>
                <h2 className="font-display text-2xl font-bold text-white">
                  Our Mission
                </h2>
              </div>
              <p className="font-body text-lg text-gray-300 leading-relaxed">
                We are a student-led drone team from DJ Sanghvi College of
                Engineering, Mumbai. We design, build and race UAVs — applying
                flight control, perception and systems engineering to real-world
                challenges in racing, mapping and research.
              </p>
            </div>
          </motion.div>

          {/* Image (col 2, spans both rows on lg+) */}
          <motion.div
            className="relative self-stretch h-full flex items-center justify-center lg:row-span-2"
            variants={photoVariants}
          >
            <div className="relative overflow-hidden rounded-xl shadow-xl mx-auto">
              <img
                src={teamPhoto}
                alt="DJS Phoenix Team"
                className="h-110 w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>
            <motion.div
              className="absolute -bottom-4 -right-4 bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <FaTrophy className="w-4 h-4 text-[#ff8c00]" />
                <h4 className="font-ui font-bold text-white text-sm">
                  Latest Achievement
                </h4>
              </div>
              <p className="font-ui font-bold text-[#ff8c00] text-sm">
                ISRO IROC 2025 Finalists
              </p>
            </motion.div>
          </motion.div>

          {/* Vision (row 2, col 1) */}
          <motion.div variants={textVariants}>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 transition-colors duration-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#ff8c00]/20 rounded-xl flex items-center justify-center">
                  <FaAward className="w-6 h-6 text-[#ff8c00]" />
                </div>
                <h2 className="font-display text-2xl font-bold text-white">
                  Our Vision
                </h2>
              </div>
              <p className="font-body text-lg text-gray-300 leading-relaxed">
                Our vision is to achieve success nationally and internationally,
                putting our college on the world map. We pursue this by
                mentoring new recruits, and competing openly—raising the bar for
                safety, reliability and performance in UAV systems.
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA Button (below grid) */}
        <motion.div variants={itemVariants} className="mb-16">
          <Link to="/team">
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-[#ff8c00] to-orange-600 text-white font-ui font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#ff8c00]/25"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Meet Our Team</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-[#ff8c00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </Link>
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          className="space-y-8"
          ref={statsRef}
          variants={itemVariants}
        >
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-4">
              Our Impact in Numbers
            </h2>
            <p className="font-body text-lg text-gray-400 max-w-2xl mx-auto">
              These numbers represent our commitment to excellence and
              continuous growth in the field of drone technology.
            </p>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Members */}
            <motion.div
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center transform-gpu will-change-transform transition-transform duration-100 ease-out hover:scale-[1.03] hover:shadow-md hover:shadow-white/5 hover:border-orange-500"
              variants={statsCardVariants}
            >
              <div className="w-14 h-14 bg-[#ff8c00] rounded-xl flex items-center justify-center mx-auto mb-4">
                <FaUsers className="w-6 h-6 text-white" />
              </div>
              <div className="font-ui font-bold text-4xl text-white mb-2">
                {Math.round(stats.members)}+
              </div>
              <div className="font-body text-gray-400 font-medium">
                Dedicated Team Members
              </div>
            </motion.div>

            {/* Competitions Won */}
            <motion.div
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center transform-gpu will-change-transform transition-transform duration-100 ease-out hover:scale-[1.03] hover:shadow-md hover:shadow-white/5 hover:border-orange-500"
              variants={statsCardVariants}
            >
              <div className="w-14 h-14 bg-[#ff8c00] rounded-xl flex items-center justify-center mx-auto mb-4">
                <FaTrophy className="w-6 h-6 text-white" />
              </div>
              <div className="font-ui font-bold text-4xl text-white mb-2">
                {Math.round(stats.competitions)}
              </div>
              <div className="font-body text-gray-400 font-medium">
                Competitions Won
              </div>
            </motion.div>

            {/* Events Participated */}
            <motion.div
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center transform-gpu will-change-transform transition-transform duration-100 ease-out hover:scale-[1.03] hover:shadow-md hover:shadow-white/5 hover:border-orange-500"
              variants={statsCardVariants}
            >
              <div className="w-14 h-14 bg-[#ff8c00] rounded-xl flex items-center justify-center mx-auto mb-4">
                <PiDroneFill className="w-6 h-6 text-white" />
              </div>
              <div className="font-ui font-bold text-4xl text-white mb-2">
                {Math.round(stats.participated)}+
              </div>
              <div className="font-body text-gray-400 font-medium">
                Events Participated
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutTeam;
