import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/common/Navbar";
import AboutHero from "../components/about_page/AboutHero";
import OurStory from "../components/about_page/OurStory";
import DepartmentShowcase from "../components/about_page/DepartmentShowcase";
import codingImg from "../assets/Department/coding.jpeg";
import electronicsImg from "../assets/Department/elex.png";
import mechImg from "../assets/Department/mech.png";
import marketingImg from "../assets/Department/marketing.png";
import StatsCounter from "../components/about_page/StatsCounter";
import LocationMap from "../components/about_page/LocationMap";
import { achievements as achievementsData } from "../components/achievements/competitionData";

import {
  aboutHero,
  storyParagraphs,
  departments,
  stats,
} from "../components/about_page/aboutData";

const About = () => {
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

  // Compute Events Participated dynamically = total achievements - 1 (exclude Team Founded)
  const totalAchievements = (
    Array.isArray(achievementsData) ? achievementsData.flat(Infinity) : []
  )
    .filter((entry) => Array.isArray(entry.achievements))
    .reduce((sum, entry) => sum + (entry.achievements?.length || 0), 0);
  const eventsParticipated = Math.max(0, totalAchievements - 1);

  const computedStats = stats.map((s) =>
    s.label === "Events Participated" ? { ...s, target: eventsParticipated } : s
  );

  return (
    <motion.div
      className="min-h-screen bg-black text-white"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <Navbar currentPage="About" />

      <motion.div variants={sectionVariants}>
        <AboutHero
          title={aboutHero.title}
          subtitle={aboutHero.subtitle}
          imageSrc={aboutHero.image}
          tags={["Mechanical", "Electronics", "Coding", "Marketing"]}
        />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <OurStory paragraphs={storyParagraphs} />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <DepartmentShowcase
          items={departments.map((d) => ({
            title: d.title,
            description: d.description,
            iconKey: d.iconKey,
            image:
              d.title === "Coding"
                ? codingImg
                : d.title === "Electronics"
                ? electronicsImg
                : d.title === "Mechanical"
                ? mechImg
                : marketingImg,
          }))}
        />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <StatsCounter items={computedStats} />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <LocationMap />
      </motion.div>
    </motion.div>
  );
};

export default About;
