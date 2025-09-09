import React from "react";
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
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar currentPage="About" />

      <AboutHero
        title={aboutHero.title}
        subtitle={aboutHero.subtitle}
        imageSrc={aboutHero.image}
        tags={["Mechanical", "Electronics", "Coding", "Marketing"]}
      />

      <OurStory paragraphs={storyParagraphs} />
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

      <StatsCounter items={stats} />
    </div>
  );
};

export default About;
