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
import LocationMap from "../components/about_page/LocationMap";
import { achievements as achievementsData } from "../components/achievements/competitionData";

import {
  aboutHero,
  storyParagraphs,
  departments,
  stats,
} from "../components/about_page/aboutData";

const About = () => {
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
    <div className="min-h-screen bg-black text-white">
      <Navbar currentPage="About" />

      <div>
        <AboutHero
          title={aboutHero.title}
          subtitle={aboutHero.subtitle}
          imageSrc={aboutHero.image}
          tags={["Mechanical", "Electronics", "Coding", "Marketing"]}
        />
      </div>

      <div>
        <OurStory paragraphs={storyParagraphs} />
      </div>

      <div>
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
      </div>

      <div>
        <StatsCounter items={computedStats} />
      </div>

      <div>
        <LocationMap />
      </div>
    </div>
  );
};

export default About;
