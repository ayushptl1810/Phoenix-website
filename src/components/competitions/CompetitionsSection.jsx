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

// Get accent color based on status
function getAccentColor(status) {
  return status === "completed"
    ? { hue: 120, saturation: 90 }
    : { hue: 200, saturation: 90 }; // green for completed, blue for upcoming
}

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
            Plans for
            <span className="block text-3xl md:text-3xl text-[#ff8c00] font-bold mt-2">
              2024-2025
            </span>
          </h2>
          <p className="font-body text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing our journey through innovation challenges and
            technological breakthroughs
          </p>

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
          {competitions.map((competition, index) => {
            const accentColor = getAccentColor(competition.status);

            const CompetitionCard = () => {
              return (
                <motion.div
                  key={competition.id}
                  className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-orange-500/60 transition-all hover:shadow-2xl hover:shadow-orange-500/30 min-h-56 md:min-h-64 p-4 w-full"
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35 }}
                  whileHover={{ y: -4 }}
                >
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px]"
                    style={{
                      background: `linear-gradient(180deg, hsla(${
                        accentColor.hue
                      },${accentColor.saturation}%,60%,0.9), hsla(${
                        (accentColor.hue + 25) % 360
                      },${accentColor.saturation}%,60%,0.9))`,
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
                          {competition.name}
                        </div>
                        <div className="ui-text text-xs md:text-sm text-neutral-400 mt-0.5">
                          {competition.date}
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 flex items-center gap-2 ui-text">
                      <span
                        className="ui-text inline-block text-[10px] md:text-xs tracking-wide px-2.5 py-0.5 rounded-full text-white"
                        style={{
                          background: `linear-gradient(90deg, hsla(${
                            accentColor.hue
                          },90%,50%,0.9), hsla(${
                            (accentColor.hue + 30) % 360
                          },90%,55%,0.9))`,
                        }}
                      >
                        {competition.category}
                      </span>
                      <span className="ui-text inline-block text-[10px] md:text-xs tracking-wide px-2.5 py-0.5 rounded-full border border-neutral-700 text-neutral-300">
                        {competition.status}
                      </span>
                    </div>
                    <p className="font-body text-[15px] md:text-base text-neutral-200 leading-7">
                      {competition.description}
                    </p>

                    {/* Achievement Badge for Completed */}
                    {competition.achievement && (
                      <div className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-full">
                        <GiLaurelCrown className="w-4 h-4 text-green-400" />
                        <span className="font-ui font-bold text-green-400 text-sm">
                          {competition.achievement}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Subtle neon edge on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 group-hover:ring-1 ring-orange-400/50 transition-all" />
                </motion.div>
              );
            };

            return <CompetitionCard key={competition.id} />;
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default CompetitionsSection;
