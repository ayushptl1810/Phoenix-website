import React from "react";
import Timeline from "../components/achievements/Timeline";
import Navbar from "../components/common/Navbar";
import BeamsBackground from "../components/common/BeamsBackground";

const Achievements = () => {
  return (
    <div className="min-h-screen bg-black text-white bg-grid-mask bg-noise-mask">
      {/* Ambient beams */}
      <BeamsBackground intensity="medium" />
      {/* Top Nav */}
      <Navbar currentPage="Achievements" />

      {/* Hero Header */}
      <div className="relative overflow-hidden">
        {/* Removed orange gradient overlay to rely on BeamsBackground */}
        <div className="absolute inset-0"></div>
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="font-display text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent leading-[1.1] pb-1">
              Our Journey of Success
            </h1>
            <p className="font-body text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              From our humble beginnings to becoming a force to reckon with in
              the drone racing world. Every competition, every challenge, every
              victory has shaped who we are today.
            </p>
          </div>
        </div>

        {/* Removed floating orange glow elements */}
      </div>

      {/* Main Timeline */}
      <main className="container mx-auto px-6">
        <Timeline />
      </main>

      {/* Footer is now global via <SiteFooter /> in App.jsx */}
    </div>
  );
};

export default Achievements;
