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
        <StatsCounter items={stats} />
      </motion.div>
    </motion.div>
  );
};

export default About;
