import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { FaUsers, FaTrophy } from "react-icons/fa";
import { PiDroneFill } from "react-icons/pi";
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
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const interval = 50;
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const photoVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="min-h-screen bg-gray-900 py-16">
      <motion.div
        className="max-w-7xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Team Description */}
          <motion.div className="space-y-8" variants={textVariants}>
            <div className="space-y-4">
              <h2 className="font-display text-3xl font-bold text-white">
                Our
                <span className="text-[#ff8c00]"> Mission</span>
              </h2>
              <p className="font-body text-lg text-gray-300 leading-relaxed">
                DJS Phoenix is a student-led drone innovation team dedicated to
                pushing the boundaries of aerial robotics. We combine
                cutting-edge technology with creative problem-solving to tackle
                real-world challenges in agriculture, environmental monitoring,
                and autonomous systems.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-display text-2xl font-semibold text-white">
                Vision
              </h3>
              <p className="font-body text-lg text-gray-300 leading-relaxed">
                To become a leading force in drone technology innovation,
                fostering the next generation of aerospace engineers and
                creating solutions that make a positive impact on society and
                the environment.
              </p>
            </div>

            {/* Key Stats - Professional Design */}
            <div className="space-y-6" ref={statsRef}>
              <h3 className="font-display text-2xl font-semibold text-white">
                Team Highlights
              </h3>

              {/* Clean Stats Layout - Horizontal */}
              <div className="grid grid-cols-3 gap-4">
                {/* Team Size */}
                <motion.div
                  className="text-center p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg hover:border-[#ff8c00]/30 hover:shadow-lg transition-all duration-200"
                  variants={statsVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-10 h-10 bg-[#ff8c00]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FaUsers className="w-5 h-5 text-[#ff8c00]" />
                  </div>
                  <div className="font-ui font-bold text-2xl text-white mb-1">
                    {Math.round(stats.members)}+
                  </div>
                  <div className="font-body text-sm text-gray-400">
                    Team Members
                  </div>
                </motion.div>

                {/* Competitions Won */}
                <motion.div
                  className="text-center p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg hover:border-[#ff8c00]/30 hover:shadow-lg transition-all duration-200"
                  variants={statsVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-10 h-10 bg-[#ff8c00]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FaTrophy className="w-5 h-5 text-[#ff8c00]" />
                  </div>
                  <div className="font-ui font-bold text-2xl text-white mb-1">
                    {Math.round(stats.competitions)}
                  </div>
                  <div className="font-body text-sm text-gray-400">
                    Competitions Won
                  </div>
                </motion.div>

                {/* Participated In */}
                <motion.div
                  className="text-center p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg hover:border-[#ff8c00]/30 hover:shadow-lg transition-all duration-200"
                  variants={statsVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-10 h-10 bg-[#ff8c00]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <PiDroneFill className="w-5 h-5 text-[#ff8c00]" />
                  </div>
                  <div className="font-ui font-bold text-2xl text-white mb-1">
                    {Math.round(stats.participated)}+
                  </div>
                  <div className="font-body text-sm text-gray-400">
                    Participated In
                  </div>
                </motion.div>
              </div>
            </div>

            {/* CTA Button */}
            <motion.div className="pt-2" variants={itemVariants}>
              <Link to="/team">
                <button className="px-8 py-4 bg-[#ff8c00] text-white font-ui font-bold text-lg rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#ff8c00]/25">
                  Learn More About Our Team
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Team Photo & Visual Elements */}
          <motion.div className="relative" variants={photoVariants}>
            {/* Team Photo */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={teamPhoto}
                alt="DJS Phoenix Team"
                className="w-full h-auto object-cover"
              />

              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#ff8c00]/10 to-transparent pointer-events-none"></div>
            </div>

            {/* Floating Achievement Badge */}
            <motion.div
              className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg border border-gray-200"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <PiDroneFill className="w-8 h-8 text-[#ff8c00]" />
            </motion.div>

            {/* Stats Card */}
            <motion.div
              className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg border border-gray-200 max-w-xs"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h4 className="font-ui font-bold text-gray-900 mb-2 text-sm">
                Latest Achievement
              </h4>
              <p className="font-ui font-bold text-[#ff8c00] text-sm">
                ISRO IROC 2025 Finalists
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutTeam;
