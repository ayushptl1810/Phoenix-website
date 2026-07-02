import React from "react";
import HeroBackground from "../components/hero/HeroBackground";
import HeroContent from "../components/hero/HeroContent";
import AboutTeam from "../components/about/AboutTeam";
import CompetitionsSection from "../components/competitions/CompetitionsSection";
import Navbar from "../components/common/Navbar";

const Home = () => {

  return (
    <div className="bg-black">
      <Navbar currentPage="Home" />
      {/* Hero Section */}
      <section className="relative min-h-screen">
        <HeroBackground />
        <HeroContent />
      </section>

      {/* About Team Section */}
      <AboutTeam />

      {/* Competitions Section */}
      <CompetitionsSection />
    </div>
  );
};

export default Home;
