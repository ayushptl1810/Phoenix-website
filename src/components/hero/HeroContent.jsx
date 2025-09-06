import React from "react";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const HeroContent = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const badgeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
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

  const buttonVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
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

  const buttonVariantsRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
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

  const socialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.main
      className="relative min-h-screen flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Team Name - Hero Title */}
        <motion.h1
          className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 leading-none tracking-tight"
          variants={titleVariants}
        >
          <motion.span className="block" variants={titleVariants}>
            DJS
          </motion.span>
          <motion.span className="block text-accent" variants={titleVariants}>
            PHOENIX
          </motion.span>
        </motion.h1>

        {/* Slogan/Tagline */}
        <motion.p
          className="font-body text-xl md:text-2xl lg:text-3xl text-white mb-8 max-w-4xl mx-auto leading-relaxed"
          variants={titleVariants}
        >
          Where music meets innovation, and every beat tells a story
        </motion.p>

        {/* Established Date - Redesigned with enhanced animations */}
        <motion.div
          className="mb-12 flex items-center justify-center"
          variants={badgeVariants}
        >
          <motion.div
            className="relative group"
            whileHover="hover"
            variants={badgeVariants}
          >
            <div className="relative bg-black/20 border border-white/30 rounded-full px-6 py-3">
              <div className="flex items-center space-x-3">
                <motion.div
                  className="w-2 h-2 bg-[#ff8c00] rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                ></motion.div>
                <span className="font-ui font-bold text-white text-lg tracking-wide">
                  Est. 2017
                </span>
                <motion.div
                  className="w-2 h-2 bg-[#ff8c00] rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <motion.button
            className="px-8 py-4 border-2 border-[#ff8c00] bg-[#ff8c00] text-black font-ui font-bold text-lg rounded-lg transition-all duration-300 hover:bg-transparent hover:text-[#ff8c00] cursor-pointer"
            variants={buttonVariants}
            whileHover="hover"
          >
            Explore Our Work
          </motion.button>

          <Link to="/team">
            <motion.button
              className="px-8 py-4 border-2 border-white text-white font-ui font-bold text-lg rounded-lg transition-all duration-300 hover:bg-white hover:text-black cursor-pointer"
              variants={buttonVariantsRight}
              whileHover="hover"
            >
              Meet The Team
            </motion.button>
          </Link>
        </div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center items-center gap-6 text-white/70"
          variants={socialVariants}
        >
          <motion.a
            href="mailto:djsphoenixteam@gmail.com"
            className="hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <MdEmail className="w-8 h-8" />
          </motion.a>
          <motion.a
            href="https://www.instagram.com/djs_phoenix/"
            className="hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ duration: 0.2 }}
          >
            <FaInstagram className="w-8 h-8" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/company/djs-phoenix"
            className="hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <FaLinkedin className="w-8 h-8" />
          </motion.a>
        </motion.div>
      </div>
    </motion.main>
  );
};

export default HeroContent;
