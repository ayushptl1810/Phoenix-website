import React from "react";
import {
  FaTrophy,
  FaCalendarAlt,
  FaRocket,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import { GiLaurelCrown } from "react-icons/gi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CompetitionsSection = () => {
  const competitions = [
    {
      id: 1,
      name: "NIDAR",
      status: "upcoming",
      date: "November 2025",
      description:
        "Hosted by the Ministry of Electronics and Information Technology (MeitY) and Drone Federation India (DFI) under the SwaYaan initiative.",
      category: "Disaster Management",
      icon: FaRocket,
    },
    {
      id: 2,
      name: "SAE Aerothon",
      status: "upcoming",
      date: "November 2025",
      description:
        "SAEINDIA's flagship event supporting the Indian government's mission to make India a UAS/Drone hub by 2030 under the AatmaNirbhar Bharat Abhiyan",
      category: "Surveillance and Disaster Management",
      icon: FaRocket,
    },
    {
      id: 3,
      name: "ISRO IROC 2025",
      status: "completed",
      date: "August 2025",
      description:
        "Indian Space Research Organisation's Innovation Challenge for safe spot detection on the Martian surface",
      category: "Space Technology",
      icon: FaTrophy,
      achievement: "Finalist",
    },
    {
      id: 4,
      name: "Drone Dexterity 2025",
      status: "completed",
      date: "March 2025",
      description: "Obstacle avoidance and racing competition",
      category: "Racing",
      icon: FaTrophy,
      achievement: "2nd Place",
    },
  ];

  const completedCount = competitions.filter(
    (c) => c.status === "completed"
  ).length;
  const totalCount = competitions.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.8,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="min-h-screen bg-black relative overflow-hidden">
      {/* Removed orange background accents; BeamsBackground provides ambient visuals */}
      <div className="absolute inset-0 opacity-0"></div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Header */}
        <motion.div className="text-center mb-8" variants={headerVariants}>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            This Year's
            <span className="text-[#ff8c00]"> Competitions</span>
          </h2>
          <p className="font-body text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing our journey through innovation challenges and
            technological breakthroughs
          </p>

          {/* Progress Indicator */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Progress</span>
              <span>
                {completedCount}/{totalCount} Completed
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full origin-left"
                style={{ width: `${progressPercentage}%` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  delay: 0.5,
                }}
              ></motion.div>
            </div>
          </div>

          <motion.div
            className="mt-6 flex justify-center"
            variants={buttonVariants}
          >
            <Link
              to="/achievements"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/30 bg-black/20 backdrop-blur-md text-white hover:border-[#ff8c00] hover:bg-[#ff8c00]/10 transition-all duration-300 text-lg font-ui font-bold tracking-wide"
            >
              <div className="w-2 h-2 bg-[#ff8c00] rounded-full animate-pulse"></div>
              View Achievements
              <div className="w-2 h-2 bg-[#ff8c00] rounded-full animate-pulse"></div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Competitions Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {competitions.map((competition, index) => (
            <motion.div
              key={competition.id}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ${
                competition.status === "completed"
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border-green-500/50 hover:border-green-400/70 hover:shadow-xl hover:shadow-green-500/20"
                  : "bg-gradient-to-br from-gray-800 to-gray-900 border-blue-500/50 hover:border-blue-400/70 hover:shadow-xl hover:shadow-blue-500/20"
              }`}
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Status Badge */}
              <motion.div
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-ui font-bold ${
                  competition.status === "completed"
                    ? "bg-green-500/30 text-green-300 border border-green-400/50"
                    : "bg-blue-500/30 text-blue-300 border border-blue-400/50"
                }`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {competition.status === "completed" ? (
                  <span className="flex items-center space-x-1">
                    <FaCheckCircle className="w-3 h-3" />
                    <span>Completed</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-1">
                    <FaClock className="w-3 h-3" />
                    <span>Upcoming</span>
                  </span>
                )}
              </motion.div>

              {/* Subtle glow effect */}
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  competition.status === "completed"
                    ? "bg-gradient-to-br from-green-500/5 to-transparent"
                    : "bg-gradient-to-br from-blue-500/5 to-transparent"
                }`}
              ></div>

              {/* Content */}
              <div className="relative p-8 z-10">
                <motion.div
                  className="flex items-start space-x-4 mb-4"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                      competition.status === "completed"
                        ? "bg-green-500/30 text-green-300"
                        : "bg-blue-500/30 text-blue-300"
                    }`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <competition.icon className="w-6 h-6" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-bold text-white mb-2">
                      {competition.name}
                    </h3>
                    <div className="flex items-center space-x-3 text-sm text-gray-400 mb-3">
                      <FaCalendarAlt className="w-4 h-4" />
                      <span>{competition.date}</span>
                      <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                      <span>{competition.category}</span>
                    </div>
                  </div>
                </motion.div>

                <p className="font-body text-gray-300 mb-4 leading-relaxed">
                  {competition.description}
                </p>

                {/* Achievement Badge for Completed */}
                {competition.achievement && (
                  <motion.div
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <GiLaurelCrown className="w-4 h-4 text-green-400" />
                    <span className="font-ui font-bold text-green-400 text-sm">
                      {competition.achievement}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Enhanced Hover Glow Effect */}
              <motion.div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  competition.status === "completed"
                    ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10"
                    : "bg-gradient-to-r from-blue-500/10 to-indigo-500/10"
                }`}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CompetitionsSection;
