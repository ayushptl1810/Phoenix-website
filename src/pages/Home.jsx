import React from "react";
import HeroBackground from "../components/hero/HeroBackground.jsx";
import HeroContent from "../components/hero/HeroContent.jsx";
import AboutTeam from "../components/about/AboutTeam.jsx";
import CompetitionSection from "../components/competitions/CompetitionsSection.jsx";

const Home = () => {
  return (
    <>
      <HeroBackground />
      <HeroContent />
      <AboutTeam />
      <CompetitionSection />
    </>
  );
};

export default Home;
