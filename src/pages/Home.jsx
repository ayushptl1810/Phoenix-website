import React from "react";
import { motion } from "framer-motion";
import HeroBackground from "../components/hero/HeroBackground";
import HeroContent from "../components/hero/HeroContent";
import AboutTeam from "../components/about/AboutTeam";
import CompetitionsSection from "../components/competitions/CompetitionsSection";

const Home = () => {
  // Animation variants for page sections
  const sectionVariants = {
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

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen">
        <HeroBackground />
        <HeroContent />
      </section>

      {/* About Team Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <AboutTeam />
      </motion.section>

      {/* Competitions Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <CompetitionsSection />
      </motion.section>
    </div>
  );
};

export default Home;
